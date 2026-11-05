const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditEvidenceAsymmetry,
  auditAuthorityPower,
  preserveMinorityReport,
  auditLegitimateNonconvergence
}=require('../../dist/research/revision4.js');

const {
  symmetricPersistentDisagreement,
  evidenceAsymmetryState,
  powerDistortedState,
  lostMinorityState
}=require('../../dist/research/revision4Fixtures.js');

test('symmetric persistent disagreement is legitimate pending inquiry',()=>{
  const audit=auditLegitimateNonconvergence(symmetricPersistentDisagreement);
  assert.equal(audit.result,'LEGITIMATE_PENDING_INQUIRY');
  assert.equal(audit.evidenceAsymmetry.materiallyAsymmetric,false);
  assert.deepEqual(audit.standingFailures,[]);
  assert.equal(audit.reopenAvailable,true);
});

test('majority convergence never authorizes truth',()=>{
  const audit=auditLegitimateNonconvergence(symmetricPersistentDisagreement);
  assert.equal(audit.majorityConvergenceAuthorizesTruth,false);
});

test('minority dissent never authorizes truth',()=>{
  const audit=auditLegitimateNonconvergence(symmetricPersistentDisagreement);
  assert.equal(audit.dissentAuthorizesTruth,false);
});

test('minority report preservation retains provenance and marks preserved',()=>{
  const report=preserveMinorityReport({
    reportId:'r',
    memberIds:['b','a','a'],
    preferredCandidateIds:['y','x'],
    claims:['claim'],
    evidenceIds:['e2','e1','e1'],
    reasons:['reason'],
    unresolvedQuestions:['q'],
    requestedReopenConditions:['reopen'],
    preserved:false
  });
  assert.deepEqual(report.memberIds,['a','b']);
  assert.deepEqual(report.evidenceIds,['e1','e2']);
  assert.equal(report.preserved,true);
});

test('evidence asymmetry is detected when one member is blocked',()=>{
  const audit=auditEvidenceAsymmetry(evidenceAsymmetryState.evidenceAccess);
  assert.equal(audit.materiallyAsymmetric,true);
  assert.ok(audit.blockedMembers.includes('m3'));
  assert.ok(audit.asymmetricEvidenceIds.includes('e1'));
});

test('blocked interpretive contestability is independently visible',()=>{
  const audit=auditEvidenceAsymmetry(evidenceAsymmetryState.evidenceAccess);
  assert.ok(audit.interpretationContestabilityFailures.includes('m3::e1'));
});

test('persistent disagreement under evidence asymmetry is distorted',()=>{
  const audit=auditLegitimateNonconvergence(evidenceAsymmetryState);
  assert.equal(audit.result,'DISTORTED_BY_ASYMMETRY');
});

test('procedural authority alone does not create power distortion',()=>{
  const audit=auditAuthorityPower(symmetricPersistentDisagreement.influences);
  assert.deepEqual(audit.proceduralAuthorityActors,['methods-chair']);
  assert.equal(audit.distortionRisk,'LOW');
});

test('practical power is distinct from epistemic authority',()=>{
  const audit=auditAuthorityPower(powerDistortedState.influences);
  assert.ok(audit.practicalPowerActors.includes('director'));
  assert.equal(audit.epistemicAuthorityActors.includes('director'),false);
});

test('practical power presented as technical expertise under uncontestable conditions is severe distortion',()=>{
  const audit=auditAuthorityPower(powerDistortedState.influences);
  assert.ok(audit.powerPresentedAsEpistemicAuthority.includes('director'));
  assert.ok(audit.uncontestableInfluence.includes('director'));
  assert.equal(audit.distortionRisk,'SEVERE');
});

test('power-distorted disagreement is not legitimate nonconvergence',()=>{
  const audit=auditLegitimateNonconvergence(powerDistortedState);
  assert.equal(audit.result,'DISTORTED_BY_POWER');
  assert.ok(audit.standingFailures.includes('m3'));
});

test('lost minority report makes governance insufficient',()=>{
  const audit=auditLegitimateNonconvergence(lostMinorityState);
  assert.equal(audit.result,'INSUFFICIENTLY_GOVERNED');
  assert.ok(audit.lostMinorityReports.includes('minority-1'));
});

test('persistent pluralism is legitimate when unresolved questions and reopen requests are exhausted but fair conditions remain',()=>{
  const state=structuredClone(symmetricPersistentDisagreement);
  state.minorityReports[0].unresolvedQuestions=[];
  state.minorityReports[0].requestedReopenConditions=[];
  const audit=auditLegitimateNonconvergence(state);
  assert.equal(audit.result,'LEGITIMATE_PERSISTENT_PLURALISM');
});

test('denied reopenability prevents clean legitimate pluralism',()=>{
  const state=structuredClone(symmetricPersistentDisagreement);
  state.standing[2].canRequestReopen=false;
  const audit=auditLegitimateNonconvergence(state);
  assert.equal(audit.result,'DISTORTED_BY_ASYMMETRY');
  assert.equal(audit.reopenAvailable,false);
});

test('majority candidate may exist while minority report remains preserved',()=>{
  const audit=auditLegitimateNonconvergence(symmetricPersistentDisagreement);
  assert.equal(symmetricPersistentDisagreement.majorityCandidateId,'framework-a');
  assert.ok(audit.preservedMinorityReports.includes('minority-1'));
});
