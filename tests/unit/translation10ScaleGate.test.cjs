const test=require('node:test');
const assert=require('node:assert/strict');

const {
  extractRelationCenteredNodesets,
  stratifiedRelationSample,
  HUMAN_CODER_PROTOCOL_V1,
  validateHumanCoderProtocol,
  benchmarkAuditQueries,
  evaluateScaleUpGate
}=require('../../dist/research/translation10.js');

const {
  kosciuszkoRawDocument,
  otwayRawDocument
}=require('../../dist/research/translation10Fixtures.js');

const {batchNodesets,sampleCodingA,sampleCodingB}=require('../../dist/research/translation9Fixtures.js');
const {compareAugmentationCodings,auditBatch,auditCorpusFailures}=require('../../dist/research/translation9.js');

test('automatic extractor recovers RA CA and MA from kosciuszko raw document',()=>{
  const extracted=extractRelationCenteredNodesets(kosciuszkoRawDocument);
  assert.deepEqual(new Set(extracted.map(x=>x.relationType)),new Set(['RA','CA','MA']));
  assert.ok(extracted.some(x=>x.relationNodeId==='610187'));
  assert.ok(extracted.some(x=>x.relationNodeId==='610206'));
  assert.ok(extracted.some(x=>x.relationNodeId==='610454'));
});

test('automatic extractor recovers RA CA and MA from otway raw document',()=>{
  const extracted=extractRelationCenteredNodesets(otwayRawDocument);
  assert.deepEqual(new Set(extracted.map(x=>x.relationType)),new Set(['RA','CA','MA']));
  assert.ok(extracted.some(x=>x.relationNodeId==='1201647_164813044708340528'));
  assert.ok(extracted.some(x=>x.relationNodeId==='1032_164813044708340528'));
  assert.ok(extracted.some(x=>x.relationNodeId==='702_164813044708340528'));
});

test('automatic extraction is deterministic',()=>{
  const a=extractRelationCenteredNodesets(otwayRawDocument);
  const b=extractRelationCenteredNodesets(otwayRawDocument);
  assert.deepEqual(a,b);
});

test('extracted nodesets preserve original relation node IDs and connected edge IDs',()=>{
  const extracted=extractRelationCenteredNodesets(kosciuszkoRawDocument);
  const ma=extracted.find(x=>x.relationNodeId==='610454');
  assert.equal(ma.raw.nodes.some(x=>x.nodeID==='610454'),true);
  assert.ok(ma.raw.edges.some(x=>x.edgeID==='790254'));
  assert.ok(ma.raw.edges.some(x=>x.edgeID==='790255'));
});

test('stratified sampling selects one nodeset per RA CA MA stratum',()=>{
  const extracted=[
    ...extractRelationCenteredNodesets(kosciuszkoRawDocument),
    ...extractRelationCenteredNodesets(otwayRawDocument)
  ];
  const sample=stratifiedRelationSample(extracted,1);
  assert.equal(sample.selected.length,3);
  assert.deepEqual(new Set(sample.selected.map(x=>x.relationType)),new Set(['RA','CA','MA']));
  assert.deepEqual(sample.missingTypes,[]);
});

test('stratified sampling reports relation shortfall rather than substituting',()=>{
  const extracted=extractRelationCenteredNodesets(kosciuszkoRawDocument,['RA','CA']);
  const sample=stratifiedRelationSample(extracted,1);
  assert.ok(sample.missingTypes.includes('MA'));
  assert.equal(sample.selected.some(x=>x.relationType==='MA'),false);
});

test('stratified sampler rejects zero sample size',()=>{
  const extracted=extractRelationCenteredNodesets(kosciuszkoRawDocument);
  assert.throws(()=>stratifiedRelationSample(extracted,0),/>= 1/);
});

test('human coder protocol is frozen and validates cleanly',()=>{
  assert.equal(HUMAN_CODER_PROTOCOL_V1.frozen,true);
  assert.equal(HUMAN_CODER_PROTOCOL_V1.coderIndependenceRequired,true);
  assert.equal(HUMAN_CODER_PROTOCOL_V1.revealOtherCoderBeforeSubmission,false);
  assert.deepEqual(validateHumanCoderProtocol(HUMAN_CODER_PROTOCOL_V1),[]);
});

test('human coder protocol protects source IDs and disagreement',()=>{
  assert.ok(HUMAN_CODER_PROTOCOL_V1.forbiddenShortcuts.includes('rewrite original AIF node IDs'));
  assert.ok(HUMAN_CODER_PROTOCOL_V1.forbiddenShortcuts.includes('erase disagreement to improve agreement score'));
  assert.ok(HUMAN_CODER_PROTOCOL_V1.requiredFields.includes('remainder'));
  assert.ok(HUMAN_CODER_PROTOCOL_V1.requiredFields.includes('claim ceiling'));
});

test('invalid human coder protocol is detected',()=>{
  const broken={
    ...HUMAN_CODER_PROTOCOL_V1,
    frozen:false,
    coderIndependenceRequired:false,
    revealOtherCoderBeforeSubmission:true,
    requiredFields:['task'],
    forbiddenShortcuts:[]
  };
  const failures=validateHumanCoderProtocol(broken);
  assert.ok(failures.includes('protocol-not-frozen'));
  assert.ok(failures.includes('independence-not-required'));
  assert.ok(failures.includes('premature-coder-reveal'));
  assert.ok(failures.includes('source-id-protection-missing'));
});

test('query benchmark executes requested query count and returns matches',()=>{
  const corpora=batchNodesets.map(x=>x.imported);
  const queries=[
    {kind:'RELATION_TYPE',relationType:'RA'},
    {kind:'RELATION_TYPE',relationType:'CA'},
    {kind:'HAS_STANDING'},
    {kind:'HAS_REMAINDER'}
  ];
  const result=benchmarkAuditQueries(corpora,queries,25);
  assert.equal(result.totalExecutions,100);
  assert.equal(result.queryCount,4);
  assert.ok(result.totalMatches>0);
  assert.ok(result.meanMsPerExecution>=0);
});

test('query benchmark rejects nonpositive iterations',()=>{
  assert.throws(
    ()=>benchmarkAuditQueries(batchNodesets.map(x=>x.imported),[{kind:'HAS_STANDING'}],0),
    />= 1/
  );
});

test('scale-up gate passes current healthy fixture state',()=>{
  const batchAudit=auditBatch(batchNodesets);
  const coding=compareAugmentationCodings(sampleCodingA,sampleCodingB);
  const bench=benchmarkAuditQueries(
    batchNodesets.map(x=>x.imported),
    [
      {kind:'RELATION_TYPE',relationType:'RA'},
      {kind:'RELATION_TYPE',relationType:'CA'},
      {kind:'HAS_STANDING'}
    ],
    20
  );
  const corpusAudit=auditCorpusFailures(batchNodesets,[
    {name:'ra',query:{kind:'RELATION_TYPE',relationType:'RA'}},
    {name:'ca',query:{kind:'RELATION_TYPE',relationType:'CA'}},
    {name:'standing',query:{kind:'HAS_STANDING'}}
  ]);
  const autoExtracted=[
    ...extractRelationCenteredNodesets(kosciuszkoRawDocument),
    ...extractRelationCenteredNodesets(otwayRawDocument)
  ];
  const result=evaluateScaleUpGate({
    extractedCount:autoExtracted.length,
    relationTypesCovered:[...new Set(autoExtracted.map(x=>x.relationType))],
    idsPreserved:batchAudit.allIdsPreserved,
    danglingEdges:batchAudit.danglingEdgeCount,
    coderProtocolFrozen:HUMAN_CODER_PROTOCOL_V1.frozen,
    structuralCodingAgreement:Math.min(
      coding.targetNodeAgreement,
      coding.taskAgreement,
      coding.claimCeilingAgreement
    ),
    meanQueryMs:bench.meanMsPerExecution,
    requiredQueryFailures:corpusAudit.queryFailures.length
  });
  assert.equal(result.passes,true);
  assert.deepEqual(result.failures,[]);
});

test('scale-up gate fails when MA coverage is absent',()=>{
  const result=evaluateScaleUpGate({
    extractedCount:6,
    relationTypesCovered:['RA','CA'],
    idsPreserved:true,
    danglingEdges:0,
    coderProtocolFrozen:true,
    structuralCodingAgreement:1,
    meanQueryMs:1,
    requiredQueryFailures:0
  });
  assert.equal(result.passes,false);
  assert.ok(result.failures.includes('missing-relation-MA'));
});

test('scale-up gate fails provenance coding performance and query faults independently',()=>{
  const result=evaluateScaleUpGate({
    extractedCount:6,
    relationTypesCovered:['RA','CA','MA'],
    idsPreserved:false,
    danglingEdges:2,
    coderProtocolFrozen:false,
    structuralCodingAgreement:0.5,
    meanQueryMs:30,
    requiredQueryFailures:2
  });
  assert.equal(result.passes,false);
  assert.ok(result.failures.includes('source-id-preservation-failed'));
  assert.ok(result.failures.includes('dangling-edges-present'));
  assert.ok(result.failures.includes('coder-protocol-not-frozen'));
  assert.ok(result.failures.includes('coding-agreement-below-threshold'));
  assert.ok(result.failures.includes('query-performance-above-threshold'));
  assert.ok(result.failures.includes('required-query-failures'));
});

test('scale-up gate rejects insufficient extracted nodesets even with otherwise healthy metrics',()=>{
  const result=evaluateScaleUpGate({
    extractedCount:5,
    relationTypesCovered:['RA','CA','MA'],
    idsPreserved:true,
    danglingEdges:0,
    coderProtocolFrozen:true,
    structuralCodingAgreement:1,
    meanQueryMs:1,
    requiredQueryFailures:0
  });
  assert.equal(result.passes,false);
  assert.ok(result.failures.includes('insufficient-extracted-nodesets'));
});
