const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditTestimonialDistortion,
  auditHermeneuticalDistortion,
  applyStandingRepair,
  validateCounterPublicEvidence,
  auditContestabilityRepair,
  auditRevisionReentry
}=require('../../dist/research/revision5.js');

const {
  credibilityDeficitTestimony,
  credibilityExcessTestimony,
  hermeneuticalGapRecord,
  partialUnderstandingRecord,
  standingRepair,
  counterPublicEvidence,
  cleanReentryCandidate,
  remainderReentryCandidate,
  blockedRetaliationCandidate,
  blockedProvenanceCandidate
}=require('../../dist/research/revision5Fixtures.js');

test('credibility deficit with prejudice indicators is flagged as possible testimonial injustice',()=>{
  const audit=auditTestimonialDistortion(credibilityDeficitTestimony);
  assert.equal(audit.possibleTestimonialInjustice,true);
  assert.equal(audit.credibilityDistorted,true);
  assert.ok(audit.prejudiceIndicators.length>0);
});

test('testimonial audit preserves claim ceiling and does not infer truth',()=>{
  const audit=auditTestimonialDistortion(credibilityDeficitTestimony);
  assert.match(audit.claimCeiling,/does not by itself determine the truth/);
});

test('credibility excess can be represented without becoming testimonial injustice',()=>{
  const audit=auditTestimonialDistortion(credibilityExcessTestimony);
  assert.equal(audit.possibleCredibilityExcess,true);
  assert.equal(audit.possibleTestimonialInjustice,false);
});

test('lack of opportunity to respond is separately visible as procedural deficit',()=>{
  const audit=auditTestimonialDistortion(credibilityDeficitTestimony);
  assert.ok(audit.proceduralDeficits.includes('no-opportunity-to-respond'));
});

test('hermeneutical gap plus exclusion is flagged as possible hermeneutical injustice',()=>{
  const audit=auditHermeneuticalDistortion(hermeneuticalGapRecord);
  assert.equal(audit.interpretiveGap,true);
  assert.equal(audit.exclusionFromMeaningMaking,true);
  assert.equal(audit.possibleHermeneuticalInjustice,true);
});

test('interpretive gap without exclusion does not automatically become hermeneutical injustice',()=>{
  const audit=auditHermeneuticalDistortion(partialUnderstandingRecord);
  assert.equal(audit.interpretiveGap,true);
  assert.equal(audit.exclusionFromMeaningMaking,false);
  assert.equal(audit.possibleHermeneuticalInjustice,false);
});

test('standing repair restores testimony concept formation contestability and safer participation',()=>{
  const restored=applyStandingRepair(standingRepair);
  assert.ok(restored.includes('testimony-submission'));
  assert.ok(restored.includes('concept-proposal'));
  assert.ok(restored.includes('interpretive-contestability'));
  assert.ok(restored.includes('safer-participation'));
});

test('counter-public evidence validates only when provenance and challenge capacity are visible',()=>{
  assert.deepEqual(validateCounterPublicEvidence(counterPublicEvidence),[]);
});

test('counter-public evidence is never auto-privileged',()=>{
  assert.equal(counterPublicEvidence.autoPrivileged,false);
});

test('missing provenance blocks counter-public evidence validation',()=>{
  const bad=structuredClone(counterPublicEvidence);
  bad.provenanceVisible=false;
  assert.ok(validateCounterPublicEvidence(bad).includes('provenance-not-visible'));
});

test('contestability repair can restore credibility and interpretive challenge separately',()=>{
  const restored=auditContestabilityRepair({
    memberId:'m3',
    canChallengeCredibilityAssessment:true,
    canChallengeInterpretiveResource:true,
    canAddCounterEvidence:false,
    canRequestIndependentReview:true,
    canRequestReopen:true
  });
  assert.ok(restored.includes('credibility-contestability'));
  assert.ok(restored.includes('interpretive-resource-contestability'));
  assert.equal(restored.includes('counter-evidence-entry'),false);
});

test('clean repaired perspective may reenter revision frontier',()=>{
  const audit=auditRevisionReentry(cleanReentryCandidate);
  assert.equal(audit.status,'REENTER');
  assert.equal(audit.reentryAuthorizesTruth,false);
  assert.equal(audit.counterPublicEvidenceAutoPrivileged,false);
});

test('reentry may occur with explicit interpretive remainder',()=>{
  const audit=auditRevisionReentry(remainderReentryCandidate);
  assert.equal(audit.status,'REENTER_WITH_REMAINDER');
});

test('unresolved retaliation blocks revision reentry',()=>{
  const audit=auditRevisionReentry(blockedRetaliationCandidate);
  assert.equal(audit.status,'BLOCKED_UNRESOLVED_DISTORTION');
});

test('invisible provenance blocks revision reentry',()=>{
  const audit=auditRevisionReentry(blockedProvenanceCandidate);
  assert.equal(audit.status,'BLOCKED_PROVENANCE');
});

test('unrestored standing blocks before later reentry checks',()=>{
  const candidate={...structuredClone(cleanReentryCandidate),standingRestored:false};
  const audit=auditRevisionReentry(candidate);
  assert.equal(audit.status,'BLOCKED_STANDING');
});

test('unrestored contestability blocks reentry',()=>{
  const candidate={...structuredClone(cleanReentryCandidate),contestabilityRestored:false};
  const audit=auditRevisionReentry(candidate);
  assert.equal(audit.status,'BLOCKED_CONTESTABILITY');
});
