const test=require('node:test');
const assert=require('node:assert/strict');

const {
  assessCrossDomainReplication
}=require('../../dist/research/translation5.js');
const {
  projectToCEA,
  auditComparatorLoss
}=require('../../dist/research/ceaComparator.js');
const {
  challengePrimitiveMinimality
}=require('../../dist/research/minimality.js');
const {
  buildPublicationArchitecture
}=require('../../dist/research/publicationArchitecture.js');

const {historyDomain}=require('../../dist/research/historyCase.js');
const {painDomain}=require('../../dist/research/painCase.js');
const {
  forestPrfs,
  forestTranslationAttempts,
  forestTaskRelevantStructures
}=require('../../dist/research/forestCase.js');

const forestDomain={
  id:'forest',
  label:'Contested forest governance',
  nativeTopology:['ecological system','property regime','relational place','religious stewardship','land-use institution'],
  prfs:forestPrfs,
  translationAttempts:forestTranslationAttempts,
  taskStructures:forestTaskRelevantStructures,
  requiredPrimitives:[
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','STANDING','REMAINDER','AUXILIARY','AGENCY'
  ]
};

const requiredCapabilities=[
  'task-boundedness','evidence-provenance','licensing','context-sensitivity',
  'claim-restraint','ontological-pluralism','standing','loss-tracking',
  'auxiliary-sensitivity','anti-domination'
];

test('history comparator has a complete directed translation matrix',()=>{
  const result=assessCrossDomainReplication([historyDomain]);
  assert.equal(result.completeMatrices['galileo-history'],true);
});

test('three domains replicate the current primitive set',()=>{
  const result=assessCrossDomainReplication([forestDomain,painDomain,historyDomain]);
  assert.equal(result.replicated,true);
  assert.equal(result.domainIds.length,3);
  assert.equal(result.sharedPrimitives.length,10);
});

test('third-domain replication preserves distinct native topology',()=>{
  assert.notDeepEqual(historyDomain.nativeTopology,forestDomain.nativeTopology);
  assert.notDeepEqual(historyDomain.nativeTopology,painDomain.nativeTopology);
});

test('history claim ceilings preserve archival incompleteness',()=>{
  const archival=historyDomain.prfs.find(x=>x.id==='A');
  assert.match(archival.claims[0].claimCeiling,/does not recover Galileo's complete inner experience/);
});

test('history-of-science PRF rejects simple science-versus-religion reduction',()=>{
  const science=historyDomain.prfs.find(x=>x.id==='S');
  assert.match(science.claims[0].claimCeiling,/does not reduce the trial to a simple science-versus-religion story/);
});

test('public-memory PRF blocks retrospective projection',()=>{
  const publicMemory=historyDomain.prfs.find(x=>x.id==='P');
  assert.match(publicMemory.claims[0].claimCeiling,/does not authorize projecting modern categories uncritically backward/);
});

test('CEA comparator preserves claim evidence and action',()=>{
  const projections=projectToCEA(historyDomain);
  assert.equal(projections.length,4);
  for(const p of projections){
    assert.ok(p.cea.claim.length>0);
    assert.ok(p.cea.evidence.length>0);
    assert.ok(p.cea.action.length>0);
  }
});

test('CEA comparator systematically loses FSP governance structure',()=>{
  const projections=projectToCEA(historyDomain);
  for(const p of projections){
    const audit=auditComparatorLoss(historyDomain,p);
    assert.equal(audit.materiallyLost,true);
    assert.ok(audit.lost.includes('warrant'));
    assert.ok(audit.lost.includes('claim ceiling'));
    assert.ok(audit.lost.includes('standing'));
    assert.ok(audit.lost.includes('directed translation remainder'));
  }
});

test('CEA loss is not domain-specific to history',()=>{
  const painProjection=projectToCEA(painDomain)[0];
  const painLoss=auditComparatorLoss(painDomain,painProjection);
  const historyProjection=projectToCEA(historyDomain)[0];
  const historyLoss=auditComparatorLoss(historyDomain,historyProjection);
  assert.equal(painLoss.materiallyLost,true);
  assert.equal(historyLoss.materiallyLost,true);
});

test('full primitive set is lossless for tested capability set',()=>{
  const all=[
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','STANDING','REMAINDER','AUXILIARY','AGENCY'
  ];
  const result=challengePrimitiveMinimality(all,requiredCapabilities);
  assert.equal(result.minimalityStatus,'LOSSLESS_FOR_TESTED_CAPABILITIES');
  assert.equal(result.lostCapabilities.length,0);
});

test('CEA-like primitive subset is too lossy',()=>{
  const result=challengePrimitiveMinimality(['EVIDENCE'],requiredCapabilities);
  assert.equal(result.minimalityStatus,'TOO_LOSSY');
  assert.ok(result.lostCapabilities.includes('standing'));
  assert.ok(result.lostCapabilities.includes('loss-tracking'));
});

test('removing standing and agency loses anti-domination capability',()=>{
  const retained=[
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','REMAINDER','AUXILIARY'
  ];
  const result=challengePrimitiveMinimality(retained,requiredCapabilities);
  assert.ok(result.lostCapabilities.includes('standing'));
  assert.ok(result.lostCapabilities.includes('anti-domination'));
});

test('removing remainder loses loss-tracking while preserving many other capabilities',()=>{
  const retained=[
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','STANDING','AUXILIARY','AGENCY'
  ];
  const result=challengePrimitiveMinimality(retained,requiredCapabilities);
  assert.ok(result.lostCapabilities.includes('loss-tracking'));
  assert.ok(result.preservedCapabilities.includes('ontological-pluralism'));
});

test('publication architecture reaches three-domain comparator ceiling',()=>{
  const replication=assessCrossDomainReplication([forestDomain,painDomain,historyDomain]);
  const projections=projectToCEA(historyDomain);
  const comparatorLoss=projections.some(p=>auditComparatorLoss(historyDomain,p).materiallyLost);
  const full=challengePrimitiveMinimality([
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','STANDING','REMAINDER','AUXILIARY','AGENCY'
  ],requiredCapabilities);
  const architecture=buildPublicationArchitecture(
    replication.domainIds.length,
    comparatorLoss,
    full.lostCapabilities.length===0
  );
  assert.equal(architecture.claimCeiling,'THREE-DOMAIN REPLICATION WITH COMPARATOR DELTA');
  assert.ok(architecture.formalPaper.includes('comparator loss analysis'));
  assert.ok(architecture.vrProgram.includes('scaffold fading and return to lived Doing'));
});
