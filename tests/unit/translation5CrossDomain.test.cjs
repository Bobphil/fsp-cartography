const test=require('node:test');
const assert=require('node:assert/strict');

const {
  assessCrossDomainReplication,
  auditPrimitiveAblation,
  assessPublicationClaimCeiling
}=require('../../dist/research/translation5.js');

const {
  painDomain,
  translation5Ablations
}=require('../../dist/research/painCase.js');

const {
  forestPrfs,
  forestTranslationAttempts,
  forestTaskRelevantStructures
}=require('../../dist/research/forestCase.js');

const forestDomain={
  id:'forest',
  label:'Contested forest governance',
  nativeTopology:[
    'ecological system',
    'property regime',
    'relational place',
    'religious stewardship',
    'land-use institution'
  ],
  prfs:forestPrfs,
  translationAttempts:forestTranslationAttempts,
  taskStructures:forestTaskRelevantStructures,
  requiredPrimitives:[
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','STANDING','REMAINDER','AUXILIARY','AGENCY'
  ]
};

test('persistent-pain comparator has a complete 12-edge directed matrix',()=>{
  const result=assessCrossDomainReplication([painDomain]);
  assert.equal(result.completeMatrices['persistent-pain'],true);
});

test('forest and persistent-pain cases replicate the same core primitive set',()=>{
  const result=assessCrossDomainReplication([forestDomain,painDomain]);
  assert.equal(result.replicated,true);
  assert.deepEqual(
    new Set(result.sharedPrimitives),
    new Set([
      'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
      'ONTOLOGY','STANDING','REMAINDER','AUXILIARY','AGENCY'
    ])
  );
});

test('cross-domain replication does not require native topology identity',()=>{
  assert.notDeepEqual(forestDomain.nativeTopology,painDomain.nativeTopology);
  const result=assessCrossDomainReplication([forestDomain,painDomain]);
  assert.equal(result.replicated,true);
});

test('pain comparator preserves patient first-person standing without mechanism overclaim',()=>{
  const patient=painDomain.prfs.find(x=>x.id==='P');
  assert.match(patient.claims[0].claimCeiling,/does not by itself establish a unique mechanism/);
  assert.ok(patient.claims[0].standing.includes('primary experiencer'));
});

test('pain comparator separates insurer power from clinical truth',()=>{
  const insurer=painDomain.prfs.find(x=>x.id==='I');
  assert.match(insurer.claims[0].claimCeiling,/does not settle what the patient's pain is/);
});

test('pain comparator preserves cultural-spiritual meaning without universalizing its metaphysics',()=>{
  const spiritual=painDomain.prfs.find(x=>x.id==='S');
  assert.match(spiritual.claims[0].claimCeiling,/does not establish that others share its metaphysics/);
});

test('every declared primitive has at least one non-redundant ablation loss',()=>{
  const primitives=[
    'TASK','EVIDENCE','WARRANT','BACKGROUND','CLAIM_CEILING',
    'ONTOLOGY','STANDING','REMAINDER','AUXILIARY','AGENCY'
  ];
  for(const primitive of primitives){
    const result=auditPrimitiveAblation(primitive,translation5Ablations);
    assert.equal(result.materiallyNecessary,true,primitive);
    assert.ok(result.necessaryFor.length>0,primitive);
  }
});

test('standing ablation exposes anti-domination loss',()=>{
  const result=auditPrimitiveAblation('STANDING',translation5Ablations);
  assert.ok(result.necessaryFor.includes('standing'));
  assert.ok(result.necessaryFor.includes('anti-domination'));
});

test('remainder ablation exposes loss tracking and ontological-pluralism cost',()=>{
  const result=auditPrimitiveAblation('REMAINDER',translation5Ablations);
  assert.ok(result.necessaryFor.includes('loss-tracking'));
  assert.ok(result.necessaryFor.includes('ontological-pluralism'));
});

test('auxiliary ablation is distinct from evidence ablation',()=>{
  const aux=auditPrimitiveAblation('AUXILIARY',translation5Ablations);
  const evidence=auditPrimitiveAblation('EVIDENCE',translation5Ablations);
  assert.notDeepEqual(aux.necessaryFor,evidence.necessaryFor);
  assert.ok(aux.necessaryFor.includes('auxiliary-sensitivity'));
  assert.ok(evidence.necessaryFor.includes('evidence-provenance'));
});

test('publication ceiling rises to cross-domain replication but no further',()=>{
  const replication=assessCrossDomainReplication([forestDomain,painDomain]);
  const audits=translation5Ablations.map(
    x=>auditPrimitiveAblation(x.primitive,translation5Ablations)
  );
  const result=assessPublicationClaimCeiling(replication,audits);
  assert.equal(result.ceiling,'CROSS_DOMAIN_REPLICATION');
  assert.ok(result.allowedClaims.some(x=>/replicated across two/.test(x)));
  assert.ok(result.prohibitedClaims.includes('All human PRFs are mutually translatable.'));
  assert.ok(result.prohibitedClaims.includes('The formalism proves the Duhem-Quine thesis.'));
});

test('without cross-domain replication publication ceiling falls back to single-case only',()=>{
  const replication=assessCrossDomainReplication([forestDomain]);
  const result=assessPublicationClaimCeiling(replication,[]);
  assert.equal(result.ceiling,'SINGLE_CASE_ONLY');
});

test('complete translation matrices are required for replication',()=>{
  const brokenPain={
    ...painDomain,
    translationAttempts:painDomain.translationAttempts.slice(1)
  };
  const result=assessCrossDomainReplication([forestDomain,brokenPain]);
  assert.equal(result.replicated,false);
  assert.equal(result.completeMatrices['persistent-pain'],false);
});

test('domain-specific primitive differences remain visible rather than normalized away',()=>{
  const modifiedPain={
    ...painDomain,
    requiredPrimitives:painDomain.requiredPrimitives.filter(x=>x!=='AUXILIARY')
  };
  const result=assessCrossDomainReplication([forestDomain,modifiedPain]);
  assert.ok(result.domainSpecificPrimitives['forest'].includes('AUXILIARY'));
});
