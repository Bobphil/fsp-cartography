const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditTemporaryFloorException,
  auditSunsetReview,
  auditNonIdealAuthorization,
  auditRestorationToNormalGovernance
}=require('../../dist/research/revision11.js');

const {
  emergencyCondition,
  legitimateTemporaryException,
  lessRestrictiveAlternativeException,
  noResidualCapabilityException,
  validSunsetRule,
  weakSunsetRule,
  constrainedAuthorization,
  missingProxyAuthorization,
  restorationPlan,
  independentAppealFloor
}=require('../../dist/research/revision11Fixtures.js');

test('temporary floor exception can pass only under bounded emergency conditions',()=>{
  const audit=auditTemporaryFloorException(
    emergencyCondition,
    independentAppealFloor,
    legitimateTemporaryException
  );
  assert.equal(audit.status,'PERMITTED_TEMPORARY_EXCEPTION');
  assert.equal(audit.exceptionCreatesNewFloor,false);
  assert.equal(audit.exceptionAuthorizesPermanentChange,false);
});

test('ordinary governance sufficiency blocks emergency exception',()=>{
  const emergency=structuredClone(emergencyCondition);
  emergency.ordinaryGovernanceInsufficient=false;
  const audit=auditTemporaryFloorException(
    emergency,
    independentAppealFloor,
    legitimateTemporaryException
  );
  assert.equal(audit.status,'BLOCKED_NO_EMERGENCY');
});

test('missing necessity rationale blocks exception',()=>{
  const exception=structuredClone(legitimateTemporaryException);
  exception.necessityRationale=[];
  const audit=auditTemporaryFloorException(
    emergencyCondition,
    independentAppealFloor,
    exception
  );
  assert.equal(audit.status,'BLOCKED_NO_NECESSITY');
});

test('less restrictive alternative blocks exception',()=>{
  const audit=auditTemporaryFloorException(
    emergencyCondition,
    independentAppealFloor,
    lessRestrictiveAlternativeException
  );
  assert.equal(audit.status,'BLOCKED_LESS_RESTRICTIVE_ALTERNATIVE');
});

test('exception cannot erase residual protected capability',()=>{
  const audit=auditTemporaryFloorException(
    emergencyCondition,
    independentAppealFloor,
    noResidualCapabilityException
  );
  assert.equal(audit.status,'BLOCKED_NO_RESIDUAL_CAPABILITY');
});

test('invalid sunset blocks exception',()=>{
  const exception=structuredClone(legitimateTemporaryException);
  exception.sunsetOrdinal=exception.startOrdinal;
  const audit=auditTemporaryFloorException(
    emergencyCondition,
    independentAppealFloor,
    exception
  );
  assert.equal(audit.status,'BLOCKED_NO_SUNSET');
});

test('independent review and minority report are required under emergency',()=>{
  const exception=structuredClone(legitimateTemporaryException);
  exception.independentReviewRequired=false;
  const audit=auditTemporaryFloorException(
    emergencyCondition,
    independentAppealFloor,
    exception
  );
  assert.equal(audit.status,'BLOCKED_NO_REVIEW');
});

test('valid sunset architecture blocks silent self-renewal',()=>{
  const audit=auditSunsetReview(legitimateTemporaryException,validSunsetRule);
  assert.equal(audit.reviewScheduleValid,true);
  assert.equal(audit.automaticExpiration,true);
  assert.equal(audit.selfRenewalBlocked,true);
  assert.equal(audit.newEvidenceRequiredForRenewal,true);
  assert.equal(audit.independentReviewRequiredForRenewal,true);
  assert.deepEqual(audit.failures,[]);
});

test('weak sunset architecture exposes renewal failures',()=>{
  const audit=auditSunsetReview(legitimateTemporaryException,weakSunsetRule);
  assert.ok(audit.failures.includes('expiration-not-automatic'));
  assert.ok(audit.failures.includes('renewal-can-self-authorize'));
  assert.ok(audit.failures.includes('renewal-does-not-require-new-evidence'));
  assert.ok(audit.failures.includes('renewal-lacks-independent-review'));
});

test('non-ideal authorization may use proxy standing for genuinely unavailable group',()=>{
  const audit=auditNonIdealAuthorization(constrainedAuthorization);
  assert.equal(audit.status,'TEMPORARILY_AUTHORIZED_UNDER_CONSTRAINT');
  assert.equal(audit.temporaryAuthorizationOnly,true);
  assert.equal(audit.normalAuthorizationPresumed,false);
  assert.equal(audit.retrospectiveReviewRequired,true);
});

test('missing proxy standing blocks emergency authorization',()=>{
  const audit=auditNonIdealAuthorization(missingProxyAuthorization);
  assert.equal(audit.status,'BLOCKED_UNREPRESENTED_AFFECTED_GROUP');
});

test('severe coercion still blocks authorization under emergency',()=>{
  const input=structuredClone(constrainedAuthorization);
  input.parties[0].coercionRisk='SEVERE';
  const audit=auditNonIdealAuthorization(input);
  assert.equal(audit.status,'BLOCKED_COERCION');
});

test('invisible emergency evidence blocks non-ideal authorization',()=>{
  const input=structuredClone(constrainedAuthorization);
  input.emergencyEvidenceVisible=false;
  const audit=auditNonIdealAuthorization(input);
  assert.equal(audit.status,'BLOCKED_NO_EMERGENCY_EVIDENCE');
});

test('independent review remains required in non-ideal authorization',()=>{
  const input=structuredClone(constrainedAuthorization);
  input.independentReviewerPresent=false;
  const audit=auditNonIdealAuthorization(input);
  assert.equal(audit.status,'BLOCKED_NO_INDEPENDENT_REVIEW');
});

test('restoration succeeds only after normal conditions and exception termination',()=>{
  const audit=auditRestorationToNormalGovernance(restorationPlan,{
    currentOrdinal:28,
    completedSteps:[...restorationPlan.restorationSteps],
    restoredNormalConditions:[...restorationPlan.targetNormalGovernanceConditions],
    activeExceptionIds:[]
  });
  assert.equal(audit.status,'RESTORED_TO_NORMAL_GOVERNANCE');
  assert.equal(audit.restorationReopenAvailable,true);
  assert.equal(audit.emergencyPersistenceJustifiesContinuation,false);
});

test('restoration can remain in progress before deadline',()=>{
  const audit=auditRestorationToNormalGovernance(restorationPlan,{
    currentOrdinal:24,
    completedSteps:['restore ordinary standing panel'],
    restoredNormalConditions:['ordinary independent appeal restored'],
    activeExceptionIds:['exception-review-delay']
  });
  assert.equal(audit.status,'RESTORATION_IN_PROGRESS');
});

test('temporary emergency regime persisting past deadline is flagged as normalized exception',()=>{
  const audit=auditRestorationToNormalGovernance(restorationPlan,{
    currentOrdinal:31,
    completedSteps:['publish emergency decisions'],
    restoredNormalConditions:[],
    activeExceptionIds:['exception-review-delay']
  });
  assert.equal(audit.status,'EXCEPTION_NORMALIZED');
  assert.equal(audit.emergencyPersistenceJustifiesContinuation,false);
});

test('incomplete restoration after deadline without active exception is failed restoration',()=>{
  const audit=auditRestorationToNormalGovernance(restorationPlan,{
    currentOrdinal:31,
    completedSteps:['publish emergency decisions'],
    restoredNormalConditions:['ordinary independent appeal restored'],
    activeExceptionIds:[]
  });
  assert.equal(audit.status,'FAILED_RESTORATION');
});
