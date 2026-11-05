const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditLivedContinuity,
  auditRecognition,
  auditFormFillingRisk,
  auditHumanFidelityPrototype,
  recognitionPrompt
}=require('../../dist/research/integration3.js');

const {
  mayaJourney,
  leilaJourney,
  jordanJourney,
  recognitionRecords,
  architectureOnlyRecognitionRecords,
  lowFormRisk,
  highFormRisk
}=require('../../dist/research/integration3Fixtures.js');

test('Maya lived journey preserves continuity across all seven views',()=>{
  const audit=auditLivedContinuity(mayaJourney);
  assert.equal(audit.allViewsPresent,true);
  assert.equal(audit.taskLanguagePreserved,true);
  assert.deepEqual(audit.anchorsLost,[]);
  assert.deepEqual(audit.anchorsOverwrittenBySystem,[]);
  assert.equal(audit.unresolvedQuestionsCarried,true);
  assert.equal(audit.returnReconnectsToJourney,true);
  assert.equal(audit.passes,true);
});

test('Leila lived journey preserves continuity and authorship language',()=>{
  const audit=auditLivedContinuity(leilaJourney);
  assert.equal(audit.passes,true);
  assert.deepEqual(audit.anchorsLost,[]);
  assert.deepEqual(audit.anchorsOverwrittenBySystem,[]);
});

test('Jordan sparse journey can pass without fabricated structure',()=>{
  const audit=auditLivedContinuity(jordanJourney);
  assert.equal(audit.passes,true);
  assert.equal(audit.allViewsPresent,true);
});

test('losing a user-language anchor fails lived continuity',()=>{
  const broken=structuredClone(mayaJourney);
  broken.moments.find(m=>m.view==='INSTITUTION').userLanguageRetained=[];
  const audit=auditLivedContinuity(broken);
  assert.equal(audit.passes,false);
  assert.ok(audit.anchorsLost.includes('maya-debt'));
});

test('silent system rewording of user anchor fails continuity',()=>{
  const broken=structuredClone(leilaJourney);
  broken.anchors[0].systemRewording='Parental financial coercion condition';
  const audit=auditLivedContinuity(broken);
  assert.equal(audit.passes,false);
  assert.ok(audit.anchorsOverwrittenBySystem.includes('leila-funding'));
});

test('unanswered questions must survive into Return',()=>{
  const broken=structuredClone(mayaJourney);
  broken.moments.find(m=>m.view==='RETURN').unansweredQuestions=[];
  broken.returnLanguage='Healthcare remains a serious direction.';
  const audit=auditLivedContinuity(broken);
  assert.equal(audit.unresolvedQuestionsCarried,false);
  assert.equal(audit.passes,false);
});

test('recognition prompts are invitations rather than system assertions',()=>{
  assert.match(recognitionPrompt('THERE_I_AM'),/Does this/i);
  assert.match(recognitionPrompt('YES_HERE_I_AM'),/Does the larger map/i);
  assert.match(recognitionPrompt('I_SEE_ME'),/do you recognize/i);
});

test('explicit user-reported recognition can populate all three recognition kinds',()=>{
  const audit=auditRecognition(recognitionRecords);
  assert.equal(audit.systemMayClaimRecognition,false);
  assert.deepEqual(audit.missingKinds,[]);
  assert.equal(audit.passesArchitecture,true);
  assert.equal(audit.humanRecognitionValidated,true);
});

test('architecture-only recognition opportunity never counts as actual human recognition',()=>{
  const audit=auditRecognition(architectureOnlyRecognitionRecords);
  assert.equal(audit.passesArchitecture,true);
  assert.equal(audit.humanRecognitionValidated,false);
  assert.equal(audit.userReportedKinds.length,0);
  assert.equal(audit.missingKinds.length,3);
});

test('recognition marked USER_REPORTED without user text fails architecture audit',()=>{
  const broken=structuredClone(recognitionRecords);
  broken[0].userText='';
  const audit=auditRecognition(broken);
  assert.equal(audit.passesArchitecture,false);
});

test('low form-filling signals pass anti-form gate',()=>{
  const audit=auditFormFillingRisk(lowFormRisk);
  assert.equal(audit.risk,'LOW');
  assert.equal(audit.passes,true);
  assert.ok(audit.protectiveFeatures.includes('skip-supported'));
  assert.ok(audit.protectiveFeatures.includes('authorial-return-preserved'));
});

test('high questionnaire-like behavior is detected as high risk',()=>{
  const audit=auditFormFillingRisk(highFormRisk);
  assert.equal(audit.risk,'HIGH');
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.includes('forced-view-completion'));
  assert.ok(audit.failures.includes('system-authored-judgment'));
  assert.ok(audit.failures.includes('empty-state-fabrication'));
});

test('repeated entry alone raises form-filling risk',()=>{
  const signals=structuredClone(lowFormRisk);
  signals.repeatedEntryCount=1;
  const audit=auditFormFillingRisk(signals);
  assert.equal(audit.risk,'ELEVATED');
  assert.ok(audit.failures.includes('repeated-entry-required'));
});

test('detached generic prompts raise form-filling risk',()=>{
  const signals=structuredClone(lowFormRisk);
  signals.genericPromptCount=7;
  signals.promptsDetachedFromCurrentLanguage=3;
  const audit=auditFormFillingRisk(signals);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.includes('too-many-generic-prompts'));
  assert.ok(audit.failures.includes('prompts-detached-from-user-language'));
});

test('structural human-fidelity prototype can pass while human validation stays pending',()=>{
  const audit=auditHumanFidelityPrototype(
    mayaJourney,
    architectureOnlyRecognitionRecords,
    lowFormRisk
  );
  assert.equal(audit.architecturePass,true);
  assert.equal(audit.humanValidationStatus,'PENDING');
  assert.equal(audit.recognition.humanRecognitionValidated,false);
  assert.match(audit.claimCeiling,/does not establish that actual users/i);
});

test('prototype fails when form-filling risk is high',()=>{
  const audit=auditHumanFidelityPrototype(
    mayaJourney,
    architectureOnlyRecognitionRecords,
    highFormRisk
  );
  assert.equal(audit.architecturePass,false);
});

test('prototype fails when lived continuity is broken',()=>{
  const broken=structuredClone(jordanJourney);
  broken.moments=broken.moments.filter(m=>m.view!=='INSTITUTION');
  const audit=auditHumanFidelityPrototype(
    broken,
    architectureOnlyRecognitionRecords,
    lowFormRisk
  );
  assert.equal(audit.architecturePass,false);
});

test('integration-2 compression plans remain within budgets throughout Maya journey',()=>{
  for(const moment of mayaJourney.moments){
    assert.ok(moment.compression.prompts.length<=moment.compression.promptBudget);
  }
});

test('integration-2 compression plans remain within budgets throughout Leila journey',()=>{
  for(const moment of leilaJourney.moments){
    assert.ok(moment.compression.prompts.length<=moment.compression.promptBudget);
  }
});

test('Jordan journey remains BASE throughout the sparse prototype',()=>{
  for(const moment of jordanJourney.moments){
    assert.equal(moment.compression.depth,'BASE');
  }
});
