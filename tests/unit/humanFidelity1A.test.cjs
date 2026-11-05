const test=require('node:test');
const assert=require('node:assert/strict');

const {
  PACKET_VERSION,
  FACILITATOR_CHECKPOINTS,
  createBlankParticipantRecord,
  auditConsent,
  codingSheetComplete,
  runTrialExecution,
  firstLiveSessionReady
}=require('../../dist/research/humanFidelity1A.js');

const {
  syntheticExcellentRecords,
  passingRealRecords
}=require('../../dist/research/humanFidelity1Fixtures.js');

test('packet version is frozen',()=>{
  assert.equal(PACKET_VERSION,'FSP-HUMAN-FIDELITY-1A.0');
});

test('facilitator checkpoints cover full session flow',()=>{
  const phases=new Set(FACILITATOR_CHECKPOINTS.map(x=>x.phase));
  for(const phase of ['BEFORE','START','DURING','RETURN','RECOGNITION','FORM_PROBE','INTERVIEW','CLOSE']){
    assert.ok(phases.has(phase),`missing facilitator phase ${phase}`);
  }
});

test('every facilitator checkpoint contains an instruction',()=>{
  assert.ok(FACILITATOR_CHECKPOINTS.every(x=>x.instruction.trim()));
});

test('facilitator checkpoints contain explicit prohibited moves',()=>{
  assert.ok(FACILITATOR_CHECKPOINTS.every(x=>x.prohibitedMove?.trim()));
});

test('blank participant record contains all seven view fields',()=>{
  const record=createBlankParticipantRecord('session-1','participant-1');
  for(const view of ['START','PEOPLE','INSTITUTION','HSF','CONNECTIONS','INVESTIGATE','RETURN']){
    assert.ok(Object.prototype.hasOwnProperty.call(record.viewNotes,view));
  }
});

test('blank participant record contains all three recognition fields',()=>{
  const record=createBlankParticipantRecord('session-1','participant-1');
  assert.ok(Object.prototype.hasOwnProperty.call(record.recognitionNotes,'THERE_I_AM'));
  assert.ok(Object.prototype.hasOwnProperty.call(record.recognitionNotes,'YES_HERE_I_AM'));
  assert.ok(Object.prototype.hasOwnProperty.call(record.recognitionNotes,'I_SEE_ME'));
});

test('blank participant record includes all frozen interview questions',()=>{
  const record=createBlankParticipantRecord('session-1','participant-1');
  assert.equal(Object.keys(record.interviewNotes).length,8);
});

test('consent audit fails incomplete consent',()=>{
  const record=createBlankParticipantRecord('session-1','participant-1');
  const failures=auditConsent(record.consent);
  assert.ok(failures.includes('voluntary-participation-not-confirmed'));
  assert.ok(failures.includes('data-use-not-explained'));
  assert.ok(failures.includes('consent-not-confirmed'));
});

test('consent audit passes fully completed consent',()=>{
  const record=createBlankParticipantRecord('session-1','participant-1');
  Object.assign(record.consent,{
    voluntaryParticipation:true,
    ownLivedCase:true,
    noSensitiveDisclosureRequired:true,
    maySkip:true,
    mayWithdraw:true,
    dataUseExplained:true,
    questionsAnswered:true,
    consentConfirmed:true
  });
  assert.deepEqual(auditConsent(record.consent),[]);
});

test('coding sheet complete requires clean non-leading coding conditions',()=>{
  assert.equal(codingSheetComplete({
    sessionId:'s1',
    source:'SYNTHETIC',
    consentConfirmed:true,
    ownLivedCase:true,
    completedJourney:true,
    withdrew:false,
    recognitionResponses:{
      THERE_I_AM:'YES',
      YES_HERE_I_AM:'PARTLY',
      I_SEE_ME:'NOT_SURE'
    },
    recognitionVerbatimPresent:true,
    feltLikeForm:'PARTLY',
    authorshipConcern:false,
    continuityConcern:false,
    sparseViewsPermitted:true,
    researchVocabularyPrimed:false,
    systemClaimedRecognition:false,
    facilitatorLedConclusion:false,
    codingComplete:true
  }),true);
});

test('coding sheet incomplete if recognition was system-claimed',()=>{
  assert.equal(codingSheetComplete({
    sessionId:'s1',
    source:'SYNTHETIC',
    consentConfirmed:true,
    ownLivedCase:true,
    completedJourney:true,
    withdrew:false,
    recognitionResponses:{
      THERE_I_AM:'YES',
      YES_HERE_I_AM:'YES',
      I_SEE_ME:'YES'
    },
    recognitionVerbatimPresent:true,
    feltLikeForm:'NO',
    authorshipConcern:false,
    continuityConcern:false,
    sparseViewsPermitted:true,
    researchVocabularyPrimed:false,
    systemClaimedRecognition:true,
    facilitatorLedConclusion:false,
    codingComplete:true
  }),false);
});

test('synthetic trial run executes end to end without becoming human evidence',()=>{
  const trial=runTrialExecution(syntheticExcellentRecords[0],{
    consentFlowCompleted:true,
    facilitatorFlowCompleted:true,
    participantRecordCompleted:true,
    codingCompleted:true
  });
  assert.equal(trial.executionPass,true);
  assert.equal(trial.eligibleHumanEvidenceCount,0);
  assert.equal(trial.humanEvidenceStatus,'PENDING');
  assert.equal(trial.countsAsHumanEvidence,false);
  assert.deepEqual(trial.executionFailures,[]);
});

test('trial run fails if packet coding is incomplete',()=>{
  const trial=runTrialExecution(syntheticExcellentRecords[0],{
    consentFlowCompleted:true,
    facilitatorFlowCompleted:true,
    participantRecordCompleted:true,
    codingCompleted:false
  });
  assert.equal(trial.executionPass,false);
  assert.ok(trial.executionFailures.includes('coding-incomplete'));
});

test('trial-run executor refuses real participant records',()=>{
  assert.throws(
    ()=>runTrialExecution(passingRealRecords[0],{
      consentFlowCompleted:true,
      facilitatorFlowCompleted:true,
      participantRecordCompleted:true,
      codingCompleted:true
    }),
    /must not fabricate or consume real-participant evidence/
  );
});

test('first live session readiness is operational not evidential',()=>{
  const readiness=firstLiveSessionReady();
  assert.equal(readiness.ready,true);
  assert.equal(readiness.packetVersion,'FSP-HUMAN-FIDELITY-1A.0');
  assert.match(readiness.boundary,/does not constitute institutional ethics approval/i);
  assert.match(readiness.boundary,/human evidence/i);
});

test('readiness checklist includes packet, coding, interview, gate, and dry-run firewall',()=>{
  const checks=firstLiveSessionReady().checks;
  for(const expected of [
    'consent-script-present',
    'facilitator-script-present',
    'participant-record-template-present',
    'coding-sheet-present',
    'journey-interview-frozen',
    'human-evidence-gate-present',
    'dry-run-does-not-count-as-human-evidence'
  ]){
    assert.ok(checks.includes(expected));
  }
});
