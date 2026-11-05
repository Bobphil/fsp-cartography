const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditBatch,
  compareAugmentationCodings,
  queryScaling,
  compressionRetentionCurve,
  auditCorpusFailures
}=require('../../dist/research/translation9.js');

const {
  batchNodesets,
  sampleCodingA,
  sampleCodingB
}=require('../../dist/research/translation9Fixtures.js');

test('batch contains six nodesets across two corpora',()=>{
  const audit=auditBatch(batchNodesets);
  assert.equal(audit.nodesetCount,6);
  assert.equal(audit.corpusCount,2);
});

test('batch preserves source IDs and has zero dangling edges',()=>{
  const audit=auditBatch(batchNodesets);
  assert.equal(audit.allIdsPreserved,true);
  assert.equal(audit.danglingEdgeCount,0);
});

test('repeated source nodes across local subgraphs do not count as identity conflict when type and text match',()=>{
  const audit=auditBatch(batchNodesets);
  assert.deepEqual(audit.conflictingIdentityKeys,[]);
});

test('conflicting reuse of same corpus-scoped node identity is detected',()=>{
  const bad=structuredClone(batchNodesets);
  bad[2].imported.raw.nodes[0].text='conflicting replacement text';
  const audit=auditBatch(bad);
  assert.ok(audit.conflictingIdentityKeys.includes('kosciuszko00219::610196'));
});

test('sampled augmentation coders achieve full structural agreement',()=>{
  const result=compareAugmentationCodings(sampleCodingA,sampleCodingB);
  assert.equal(result.passesStructuralAgreement,true);
  assert.equal(result.targetNodeAgreement,1);
  assert.equal(result.taskAgreement,1);
  assert.equal(result.claimCeilingAgreement,1);
});

test('sampled coding disagreement in remainder is visible without forcing native structural failure',()=>{
  const altered=structuredClone(sampleCodingB);
  altered.augmentations[0].remainder=['different interpretation'];
  const result=compareAugmentationCodings(sampleCodingA,altered);
  assert.equal(result.passesStructuralAgreement,true);
  assert.ok(result.remainderAgreement<1);
});

test('nodeset mismatch is rejected for sampled coding comparison',()=>{
  const altered={...sampleCodingB,nodesetId:'other'};
  assert.throws(
    ()=>compareAugmentationCodings(sampleCodingA,altered),
    /Nodeset mismatch/
  );
});

test('RA query scaling remains monotonic as RA-containing nodesets are added',()=>{
  const points=queryScaling(batchNodesets,{kind:'RELATION_TYPE',relationType:'RA'});
  for(let i=1;i<points.length;i++){
    assert.ok(points[i].matches>=points[i-1].matches);
  }
  assert.ok(points.at(-1).matches>=4);
});

test('standing query scales with augmented batch size',()=>{
  const points=queryScaling(batchNodesets,{kind:'HAS_STANDING'});
  assert.ok(points.at(-1).matches>points[0].matches);
});

test('FULL compression has complete query retention',()=>{
  const curve=compressionRetentionCurve(batchNodesets,['FULL']);
  assert.equal(curve[0].retention,1);
});

test('RAW_ONLY has lower retention than FULL',()=>{
  const curve=compressionRetentionCurve(batchNodesets,['FULL','RAW_ONLY']);
  const full=curve.find(x=>x.profile==='FULL');
  const raw=curve.find(x=>x.profile==='RAW_ONLY');
  assert.ok(raw.retention<full.retention);
});

test('single-field ablations retain more query capacity than RAW_ONLY',()=>{
  const curve=compressionRetentionCurve(
    batchNodesets,
    ['RAW_ONLY','NO_REMAINDER','NO_STANDING','NO_CLAIM_CEILING','NO_REOPEN']
  );
  const raw=curve.find(x=>x.profile==='RAW_ONLY');
  for(const point of curve.filter(x=>x.profile!=='RAW_ONLY')){
    assert.ok(point.retention>raw.retention);
  }
});

test('compression-retention curve shows selective nonzero loss for every governance ablation',()=>{
  const curve=compressionRetentionCurve(
    batchNodesets,
    ['NO_REMAINDER','NO_STANDING','NO_CLAIM_CEILING','NO_REOPEN']
  );
  for(const point of curve){
    assert.ok(point.retention<1);
    assert.ok(point.retention>0);
  }
});

test('corpus-level failure audit passes healthy batch',()=>{
  const result=auditCorpusFailures(batchNodesets,[
    {name:'ra',query:{kind:'RELATION_TYPE',relationType:'RA'}},
    {name:'ca',query:{kind:'RELATION_TYPE',relationType:'CA'}},
    {name:'standing',query:{kind:'HAS_STANDING'}},
    {name:'remainder',query:{kind:'HAS_REMAINDER'}},
    {name:'claim-ceiling',query:{kind:'HAS_CLAIM_CEILING'}},
    {name:'reopen',query:{kind:'REOPENABLE'}}
  ]);
  assert.equal(result.passes,true);
  assert.deepEqual(result.queryFailures,[]);
  assert.deepEqual(result.conflictingIdentityKeys,[]);
});

test('corpus-level failure audit reports missing required query family',()=>{
  const result=auditCorpusFailures(batchNodesets,[
    {name:'ma',query:{kind:'RELATION_TYPE',relationType:'MA'}}
  ]);
  assert.equal(result.passes,false);
  assert.ok(result.queryFailures.includes('ma'));
});

test('nodeset without augmentation is surfaced but does not automatically fail native-query integrity',()=>{
  const altered=structuredClone(batchNodesets);
  altered[0].imported.augmentations=[];
  const result=auditCorpusFailures(altered,[
    {name:'ca',query:{kind:'RELATION_TYPE',relationType:'CA'}}
  ]);
  assert.ok(result.nodesetsWithoutAugmentation.includes('kos-ca-610187'));
  assert.equal(result.passes,true);
});
