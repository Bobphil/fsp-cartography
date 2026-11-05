const test=require('node:test');
const assert=require('node:assert/strict');

const {
  HUMAN_FIDELITY_PROTOCOL_1,
  JOURNEY_INTERVIEW,
  auditSessionProtocol,
  participantOutcome,
  auditHumanEvidenceGate,
  protocolReady
}=require('../../dist/research/humanFidelity1.js');

const {
  syntheticExcellentRecords,
  modelExcellentRecords,
  insufficientRealRecords,
  passingRealRecords,
  mixedRealRecords,
  failingRealRecords,
  ineligibleRealRecord
}=require('../../dist/research/humanFidelity1Fixtures.js');

test('human-fidelity protocol is execution-ready',()=>{
  assert.equal(protocolReady(HUMAN_FIDELITY_PROTOCOL_1),true);
  assert.equal(HUMAN_FIDELITY_PROTOCOL_1.minimumParticipants,5);
});

test('journey interview contains eight non-leading questions',()=>{
  assert.equal(JOURNEY_INTERVIEW.length,8);
  assert.ok(JOURNEY_INTERVIEW.every(q=>q.leading===false));
});

test('journey interview covers continuity language recognition form-filling authorship and missing context',()=>{
  const purposes=JOURNEY_INTERVIEW.map(q=>q.purpose);
  assert.ok(purposes.includes('lived continuity'));
  assert.ok(purposes.includes('language fidelity'));
  assert.ok(purposes.includes('local recognition'));
  assert.ok(purposes.includes('architectural self-location'));
  assert.ok(purposes.includes('diachronic recognition'));
  assert.ok(purposes.includes('questionnaire failure detection'));
  assert.ok(purposes.includes('authorial return'));
  assert.ok(purposes.includes('omission detection'));
});

test('perfect synthetic records never become human evidence',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    syntheticExcellentRecords
  );
  assert.equal(gate.status,'PENDING');
  assert.equal(gate.eligibleParticipantCount,0);
  assert.equal(gate.excludedSessionIds.length,5);
});

test('perfect model simulations never become human evidence',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    modelExcellentRecords
  );
  assert.equal(gate.status,'PENDING');
  assert.equal(gate.eligibleParticipantCount,0);
});

test('no records leaves human evidence gate pending',()=>{
  const gate=auditHumanEvidenceGate(HUMAN_FIDELITY_PROTOCOL_1,[]);
  assert.equal(gate.status,'PENDING');
  assert.equal(gate.eligibleParticipantCount,0);
});

test('real participant sample below minimum is insufficient',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    insufficientRealRecords
  );
  assert.equal(gate.status,'INSUFFICIENT');
  assert.equal(gate.eligibleParticipantCount,2);
});

test('clean five-participant artificial gate scenario can reach PASS',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    passingRealRecords
  );
  assert.equal(gate.status,'PASS');
  assert.equal(gate.eligibleParticipantCount,5);
  assert.equal(gate.recognitionCoverage.thereIAmAffirmed,5);
  assert.equal(gate.recognitionCoverage.hereIAmAffirmed,5);
  assert.equal(gate.recognitionCoverage.iSeeMeAffirmed,5);
  assert.equal(gate.formFillingConcernCount,0);
  assert.equal(gate.authorshipConcernCount,0);
  assert.equal(gate.continuityConcernCount,0);
});

test('single adverse participant remains visible and yields MIXED rather than being erased',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    mixedRealRecords
  );
  assert.equal(gate.status,'MIXED');
  assert.equal(gate.eligibleParticipantCount,5);
  assert.ok(gate.participantOutcomes.some(o=>
    o.recognitionKindsRejected.includes('I_SEE_ME') || o.formFillingConcern
  ));
  assert.equal(gate.adverseCasesPreserved,true);
});

test('majority adverse human-fidelity concerns yield FAIL',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    failingRealRecords
  );
  assert.equal(gate.status,'FAIL');
  assert.ok(gate.formFillingConcernCount>=3);
  assert.ok(gate.authorshipConcernCount>=3);
  assert.ok(gate.continuityConcernCount>=3);
});

test('research vocabulary priming makes a real session ineligible',()=>{
  const audit=auditSessionProtocol(
    HUMAN_FIDELITY_PROTOCOL_1,
    ineligibleRealRecord.session
  );
  assert.equal(audit.eligibleHumanEvidence,false);
  assert.ok(audit.failures.includes('research-vocabulary-priming'));
  assert.ok(audit.failures.includes('system-claimed-recognition'));
});

test('withdrawn participant is excluded from evidence',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.session.sessionId='withdrawn';
  record.session.withdrew=true;
  const audit=auditSessionProtocol(
    HUMAN_FIDELITY_PROTOCOL_1,
    record.session
  );
  assert.equal(audit.eligibleHumanEvidence,false);
  assert.ok(audit.failures.includes('participant-withdrew'));
});

test('facilitator-led conclusion invalidates protocol eligibility',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.session.sessionId='led';
  record.session.facilitatorLedConclusion=true;
  const audit=auditSessionProtocol(
    HUMAN_FIDELITY_PROTOCOL_1,
    record.session
  );
  assert.equal(audit.eligibleHumanEvidence,false);
  assert.ok(audit.failures.includes('facilitator-led-conclusion'));
});

test('recognition affirmation requires participant verbatim',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.recognition[0].verbatim='';
  const outcome=participantOutcome(HUMAN_FIDELITY_PROTOCOL_1,record);
  assert.ok(!outcome.recognitionKindsAffirmed.includes('THERE_I_AM'));
});

test('NO recognition response is preserved as rejection',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.recognition[1].response='NO';
  record.recognition[1].verbatim='The larger map made the situation more abstract.';
  const outcome=participantOutcome(HUMAN_FIDELITY_PROTOCOL_1,record);
  assert.ok(outcome.recognitionKindsRejected.includes('YES_HERE_I_AM'));
});

test('PARTLY counts as bounded affirmation when verbatim is present',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.recognition[2].response='PARTLY';
  record.recognition[2].verbatim='I noticed some change, but not as much as the prompt suggests.';
  const outcome=participantOutcome(HUMAN_FIDELITY_PROTOCOL_1,record);
  assert.ok(outcome.recognitionKindsAffirmed.includes('I_SEE_ME'));
});

test('form-filling concern preserves multiple participant indicators',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.formFilling.feltLikeForm='YES';
  record.formFilling.repeatedSelfUnnecessarily=true;
  const outcome=participantOutcome(HUMAN_FIDELITY_PROTOCOL_1,record);
  assert.equal(outcome.formFillingConcern,true);
});

test('system-decided-for-me response creates authorship concern',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.formFilling.systemSeemedToDecideForMe=true;
  const outcome=participantOutcome(HUMAN_FIDELITY_PROTOCOL_1,record);
  assert.equal(outcome.authorshipConcern,true);
});

test('loss of own words or same-situation continuity creates continuity concern',()=>{
  const record=structuredClone(passingRealRecords[0]);
  record.interview.ownWordsPreserved='NO';
  const outcome=participantOutcome(HUMAN_FIDELITY_PROTOCOL_1,record);
  assert.equal(outcome.continuityConcern,true);
});

test('gate reports human-evidence-only for eligible records',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    passingRealRecords
  );
  assert.equal(gate.humanEvidenceOnly,true);
});

test('synthetic plus real records do not inflate eligible participant count',()=>{
  const gate=auditHumanEvidenceGate(
    HUMAN_FIDELITY_PROTOCOL_1,
    [...passingRealRecords,...syntheticExcellentRecords]
  );
  assert.equal(gate.eligibleParticipantCount,5);
  assert.equal(gate.excludedSessionIds.length,5);
  assert.equal(gate.status,'PASS');
});

test('current repository evidence state is PENDING when no live records are supplied',()=>{
  const gate=auditHumanEvidenceGate(HUMAN_FIDELITY_PROTOCOL_1,[]);
  assert.equal(gate.status,'PENDING');
  assert.match(gate.claimCeiling,/does not establish general psychological efficacy/i);
});
