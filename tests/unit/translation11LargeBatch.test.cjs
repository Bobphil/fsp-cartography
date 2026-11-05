const test=require('node:test');
const assert=require('node:assert/strict');

const {
  buildLargeStratifiedSample,
  makeHumanCoderTrialPacket,
  benchmarkQueryLatencyDistribution,
  importedFromExtracted,
  evaluateScaleUpRegression
}=require('../../dist/research/translation11.js');

const {
  largeBatchExtracted
}=require('../../dist/research/translation11Fixtures.js');

const {
  HUMAN_CODER_PROTOCOL_V1
}=require('../../dist/research/translation10.js');

test('committed large batch contains 30 external nodesets',()=>{
  assert.equal(largeBatchExtracted.length,30);
});

test('large batch is exactly stratified 10 RA 10 CA 10 MA',()=>{
  const counts=largeBatchExtracted.reduce((a,x)=>{
    a[x.relationType]=(a[x.relationType]??0)+1;
    return a;
  },{});
  assert.deepEqual(counts,{RA:10,CA:10,MA:10});
});

test('large batch includes both external corpora',()=>{
  assert.deepEqual(
    new Set(largeBatchExtracted.map(x=>x.raw.corpusId)),
    new Set(['kosciuszko00219','otway00219'])
  );
});

test('committed sample preserves real MA corpus imbalance rather than hiding it',()=>{
  const ma=largeBatchExtracted.filter(x=>x.relationType==='MA');
  const counts=ma.reduce((a,x)=>{
    a[x.raw.corpusId]=(a[x.raw.corpusId]??0)+1;
    return a;
  },{});
  assert.equal(counts.kosciuszko00219,7);
  assert.equal(counts.otway00219,3);
});

test('large stratified sample builder reproduces relation targets deterministically',()=>{
  const result=buildLargeStratifiedSample(largeBatchExtracted,10);
  assert.equal(result.selected.length,30);
  assert.deepEqual(result.countsByRelation,{RA:10,CA:10,MA:10});
  assert.deepEqual(result.shortfalls,[]);
});

test('large sample builder reports shortfall instead of fabricating missing relation cases',()=>{
  const onlyRA=largeBatchExtracted.filter(x=>x.relationType==='RA');
  const result=buildLargeStratifiedSample(onlyRA,2);
  assert.ok(result.shortfalls.includes('CA:0/2'));
  assert.ok(result.shortfalls.includes('MA:0/2'));
});

test('human coder packet is generated from raw external nodesets with blank coding fields',()=>{
  const packet=makeHumanCoderTrialPacket(largeBatchExtracted,2);
  assert.equal(packet.items.length,6);
  assert.equal(packet.protocolVersion,'FSP-AIF-CODER-1.0');
  assert.equal(packet.protocolFrozen,true);
  assert.equal(packet.humanValidationStatus,'PENDING');
  for(const item of packet.items){
    assert.ok(item.rawNodes.length>0);
    assert.ok(item.rawEdges.length>0);
    assert.equal(item.codingFields.targetNode,'');
    assert.equal(item.codingFields.task,'');
    assert.equal(item.codingFields.claimCeiling,'');
    assert.equal(item.codingFields.standing,'');
    assert.equal(item.codingFields.remainder,'');
    assert.equal(item.codingFields.reopenCondition,'');
  }
});

test('human coder packet samples all three relation types',()=>{
  const packet=makeHumanCoderTrialPacket(largeBatchExtracted,2);
  assert.deepEqual(
    new Set(packet.items.map(x=>x.relationType)),
    new Set(['RA','CA','MA'])
  );
});

test('human coder packet preserves original source identities',()=>{
  const packet=makeHumanCoderTrialPacket(largeBatchExtracted,1);
  for(const item of packet.items){
    const source=largeBatchExtracted.find(
      x=>x.raw.corpusId===item.corpusId && x.relationNodeId===item.relationNodeId
    );
    assert.ok(source);
    assert.equal(item.itemId,`${item.corpusId}::${item.relationNodeId}`);
  }
});

test('human coder trial packet rejects nonpositive per-relation request',()=>{
  assert.throws(
    ()=>makeHumanCoderTrialPacket(largeBatchExtracted,0,HUMAN_CODER_PROTOCOL_V1),
    />= 1/
  );
});

test('latency distribution executes requested workload and recovers native matches',()=>{
  const corpora=importedFromExtracted(largeBatchExtracted);
  const queries=[
    {kind:'RELATION_TYPE',relationType:'RA'},
    {kind:'RELATION_TYPE',relationType:'CA'},
    {kind:'RELATION_TYPE',relationType:'MA'}
  ];
  const result=benchmarkQueryLatencyDistribution(corpora,queries,30);
  assert.equal(result.queryExecutions,90);
  assert.ok(result.totalMatches>0);
  assert.ok(result.meanMs>=0);
  assert.ok(result.p50Ms>=0);
  assert.ok(result.p95Ms>=result.p50Ms);
  assert.ok(result.maxMs>=result.p95Ms);
});

test('latency distribution rejects nonpositive iteration count',()=>{
  assert.throws(
    ()=>benchmarkQueryLatencyDistribution(
      importedFromExtracted(largeBatchExtracted),
      [{kind:'RELATION_TYPE',relationType:'RA'}],
      0
    ),
    />= 1/
  );
});

test('large batch regression passes infrastructure while human coding remains pending',()=>{
  const corpora=importedFromExtracted(largeBatchExtracted);
  const latency=benchmarkQueryLatencyDistribution(
    corpora,
    [
      {kind:'RELATION_TYPE',relationType:'RA'},
      {kind:'RELATION_TYPE',relationType:'CA'},
      {kind:'RELATION_TYPE',relationType:'MA'}
    ],
    30
  );
  const result=evaluateScaleUpRegression(
    6,
    largeBatchExtracted,
    latency,
    25,
    [
      {name:'ra',query:{kind:'RELATION_TYPE',relationType:'RA'}},
      {name:'ca',query:{kind:'RELATION_TYPE',relationType:'CA'}},
      {name:'ma',query:{kind:'RELATION_TYPE',relationType:'MA'}}
    ]
  );
  assert.equal(result.infrastructureStatus,'PASS');
  assert.equal(result.humanCodingStatus,'PENDING');
  assert.deepEqual(result.failures,[]);
  assert.equal(result.largeBatchNodesets,30);
  assert.equal(result.sourceCorpusCount,2);
});

test('large batch regression fails when scale does not exceed baseline',()=>{
  const latency={
    queryExecutions:1,elapsedMs:1,meanMs:1,p50Ms:1,p95Ms:1,maxMs:1,totalMatches:1
  };
  const result=evaluateScaleUpRegression(
    30,
    largeBatchExtracted,
    latency,
    25,
    []
  );
  assert.equal(result.infrastructureStatus,'FAIL');
  assert.ok(result.failures.includes('no-scale-increase'));
});

test('large batch regression fails if p95 latency exceeds threshold',()=>{
  const latency={
    queryExecutions:1,elapsedMs:30,meanMs:30,p50Ms:30,p95Ms:30,maxMs:30,totalMatches:1
  };
  const result=evaluateScaleUpRegression(
    6,
    largeBatchExtracted,
    latency,
    25,
    []
  );
  assert.equal(result.infrastructureStatus,'FAIL');
  assert.ok(result.failures.includes('p95-latency-above-threshold'));
});

test('large batch regression fails when one native relation family disappears',()=>{
  const withoutMA=largeBatchExtracted.filter(x=>x.relationType!=='MA');
  const latency={
    queryExecutions:1,elapsedMs:1,meanMs:1,p50Ms:1,p95Ms:1,maxMs:1,totalMatches:1
  };
  const result=evaluateScaleUpRegression(
    6,
    withoutMA,
    latency,
    25,
    [{name:'ma',query:{kind:'RELATION_TYPE',relationType:'MA'}}]
  );
  assert.equal(result.infrastructureStatus,'FAIL');
  assert.ok(result.failures.includes('large-batch-below-30'));
  assert.ok(result.failures.includes('missing-relation-MA'));
  assert.ok(result.failures.includes('native-query-failure'));
});
