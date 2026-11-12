const test=require('node:test');
const assert=require('node:assert/strict');

const {
  MAATHAI_DOSSIER,
  compilePublicLivesRoute,
  historicalView,
  recoverProvenance,
  capabilityChange,
  validatePortabilitySubmission
}=require('../../dist/research/livesPublicRouteModel.js');

const {
  MAATHAI_VR_HARNESS,
  hindsightLeakage,
  provenanceRecovery,
  capabilityComprehension,
  portabilityInflationCheck,
  validateReturnArtifact,
  offReturnCheck,
  validateMaathaiVrHarness
}=require('../../dist/research/maathaiVrPrototype.js');

test('canonical Maathai dossier validates and compiles into public Lives common shell',()=>{
  const route=compilePublicLivesRoute(MAATHAI_DOSSIER);
  assert.equal(route.canonicalOwner,'FSP-LIVES-IN-TRANSFORMATION-PILOT-1');
  assert.deepEqual(route.commonShell,[
    'PERSON','STATES','TRANSITIONS','SOURCES','CAPABILITY_CONSTRAINT','HISTORICAL_RETURN','PORTABILITY'
  ]);
  assert.ok(route.activeModules.includes('INTENDED_ACTUAL'));
  assert.ok(route.activeModules.includes('FAILED_PLAN'));
  assert.ok(route.activeModules.includes('AUTHORIZATION_STANDING'));
  assert.ok(route.activeModules.includes('INSTITUTIONAL_ROLE'));
  assert.ok(!route.activeModules.includes('TEXT_CONCEPT_DEVELOPMENT'));
  assert.ok(!route.activeModules.includes('STRATEGY_REVISION'));
});

test('historical view hides later Maathai claims from earlier states',()=>{
  const route=compilePublicLivesRoute(MAATHAI_DOSSIER);
  const early=historicalView(route,'M-A');
  const visible=new Set(early.visibleClaims.map(c=>c.claimId));
  assert.ok(visible.has('M-C1'));
  assert.ok(!visible.has('M-C5'));
  assert.ok(!visible.has('M-C6'));
  assert.ok(early.hiddenClaimIds.includes('M-C5'));
  assert.ok(early.hiddenClaimIds.includes('M-C6'));
});

test('hindsight leakage regression passes for all historical VR scenes',()=>{
  const result=hindsightLeakage(MAATHAI_VR_HARNESS);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
});

test('provenance recovery returns source records for every revealed claim',()=>{
  const result=provenanceRecovery(MAATHAI_VR_HARNESS);
  assert.equal(result.passes,true,JSON.stringify(result.failures));

  const route=MAATHAI_VR_HARNESS.route;
  const p=recoverProvenance(route,'M-C2');
  assert.ok(p.sources.length>=2);
  assert.ok(p.sources.some(s=>s.sourceId==='WM-S02'));
  assert.ok(p.sources.some(s=>s.sourceId==='WM-S03'));
});

test('capability-change comprehension exposes gained capability and new constraint structure',()=>{
  const result=capabilityComprehension(MAATHAI_VR_HARNESS);
  assert.equal(result.passes,true);
  assert.ok(result.firstTransitionGains.includes('grassroots organization'));
  assert.ok(result.secondTransitionConstraints.includes('state repression risk'));

  const route=MAATHAI_VR_HARNESS.route;
  const delta=capabilityChange(route,'M-T2');
  assert.equal(delta.historicalReturnStateId,'M-C');
});

test('bounded portability submission passes when it preserves difference ceiling and reversibility',()=>{
  const submission={
    structuralRelation:'A bounded practical task can sometimes build capability and expose deeper constraints.',
    contextualSimilarity:'Both situations involve a small task that may build coordination capacity.',
    contextualDifference:'My context has different institutions, risks, resources, and no comparable political history.',
    nonPortableFeature:'Tree planting and confrontation with Kenyan state institutions do not automatically transfer.',
    claimCeiling:'The case supports a structural hypothesis, not a prediction or recommendation.',
    reversibleTest:'Try one small low-risk collaborative task and inspect what new capability or constraint appears.'
  };
  const result=portabilityInflationCheck(MAATHAI_VR_HARNESS,submission);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
});

test('portability inflation rejects exemplar imitation and recommendation output',()=>{
  const bad={
    structuralRelation:'I should do what Maathai did because it worked.',
    contextualSimilarity:'I care about change too.',
    contextualDifference:'',
    nonPortableFeature:'',
    claimCeiling:'',
    reversibleTest:'',
    recommendation:'Follow Maathai and persist until the institution changes.'
  };
  const result=validatePortabilitySubmission(MAATHAI_VR_HARNESS.route,bad);
  assert.equal(result.passes,false);
  assert.ok(result.failures.includes('recommendation-inflation'));
  assert.ok(result.failures.includes('missing-contextual-difference'));
  assert.ok(result.failures.includes('missing-nonportable-feature'));
});

test('return artifact requires learner-authored structural insight difference remainder and question',()=>{
  const good={
    structuralRelation:'Repeated bounded action can sometimes reveal constraints that were not visible at the start.',
    evidenceClaimId:'M-C4',
    contextualDifference:'My institution permits forms of participation that were constrained in this historical case.',
    remainder:'I do not know whether repeated action would expose the same kind of institutional problem in my setting.',
    carryForwardQuestion:'What small reversible action would reveal whether this structural relation applies here?'
  };
  assert.equal(validateReturnArtifact(good).passes,true);

  const bad={
    structuralRelation:'I should be like Maathai.',
    evidenceClaimId:'',
    contextualDifference:'',
    remainder:'',
    carryForwardQuestion:'What must I do to imitate her?'
  };
  const result=validateReturnArtifact(bad);
  assert.equal(result.passes,false);
  assert.ok(result.failures.includes('recommendation-inflation'));
});

test('OFF follows Authorial Return and Life Navigation remains optional',()=>{
  const result=offReturnCheck(MAATHAI_VR_HARNESS);
  assert.equal(result.passes,true);
  assert.equal(MAATHAI_VR_HARNESS.lifeNavigationOptional,true);
  assert.equal(MAATHAI_VR_HARNESS.exitAllowed,true);
});

test('Maathai VR harness blocks Aristotle and Mandela topology leakage',()=>{
  assert.ok(MAATHAI_VR_HARNESS.disabledModules.includes('TEXT_CONCEPT_DEVELOPMENT'));
  assert.ok(MAATHAI_VR_HARNESS.disabledModules.includes('STRATEGY_REVISION'));
  assert.ok(!MAATHAI_VR_HARNESS.activeModules.includes('TEXT_CONCEPT_DEVELOPMENT'));
  assert.ok(!MAATHAI_VR_HARNESS.activeModules.includes('STRATEGY_REVISION'));
});

test('complete executable Maathai VR harness passes constitutional validation',()=>{
  const result=validateMaathaiVrHarness(MAATHAI_VR_HARNESS);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
});
