const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditCompensationBoundary,
  auditBurdenShift,
  auditRepairLegitimacy,
  auditMultiPartyAuthorization
}=require('../../dist/research/revision10.js');

const {
  protectedFloors,
  compensableBoundary,
  floorBreachBoundary,
  unresolvedBoundary,
  legitimateBurdenShift,
  illegitimateBurdenShift,
  pluralAuthorization,
  conditionalAuthorization,
  coercedAuthorization,
  makeLegitimacyInput
}=require('../../dist/research/revision10Fixtures.js');

test('ordinary administrative burden can remain compensable',()=>{
  const audit=auditCompensationBoundary(compensableBoundary,protectedFloors);
  assert.equal(audit.status,'COMPENSABLE');
});

test('protected capability floor converts otherwise compensable loss to non-compensable',()=>{
  const audit=auditCompensationBoundary(floorBreachBoundary,protectedFloors);
  assert.equal(audit.status,'NON_COMPENSABLE');
  assert.ok(audit.reasons.includes('loss crosses a protected capability floor'));
});

test('protected floors are explicitly non-waivable',()=>{
  assert.ok(protectedFloors.every(f=>f.waivable===false));
});

test('legitimate burden shift requires meaningful consent exit voice and appeal',()=>{
  const audit=auditBurdenShift(legitimateBurdenShift);
  assert.equal(audit.burdenShiftLegitimate,true);
  assert.deepEqual(audit.unconsentedShifts,[]);
  assert.deepEqual(audit.protectedFloorRisks,[]);
});

test('burden shift onto group without standing conditions is illegitimate',()=>{
  const audit=auditBurdenShift(illegitimateBurdenShift);
  assert.equal(audit.burdenShiftLegitimate,false);
  assert.ok(audit.unconsentedShifts.includes('burden-future-access'));
});

test('protected-floor risk independently blocks burden legitimacy',()=>{
  const audit=auditBurdenShift(illegitimateBurdenShift);
  assert.ok(audit.protectedFloorRisks.includes('burden-future-access'));
});

test('repair legitimacy blocks protected-floor breach before aggregate benefit reasoning',()=>{
  const floorAudit=auditCompensationBoundary(floorBreachBoundary,protectedFloors);
  const burdenAudit=auditBurdenShift(legitimateBurdenShift);
  const result=auditRepairLegitimacy(
    makeLegitimacyInput(burdenAudit,[floorAudit,compensableBoundary])
  );
  assert.equal(result.status,'BLOCKED_PROTECTED_FLOOR');
  assert.equal(result.majorityApprovalSufficient,false);
  assert.equal(result.legitimacyAuthorizesTruth,false);
});

test('repair legitimacy blocks illegitimate burden shifting',()=>{
  const burdenAudit=auditBurdenShift(illegitimateBurdenShift);
  const result=auditRepairLegitimacy(
    makeLegitimacyInput(burdenAudit,[compensableBoundary])
  );
  assert.equal(result.status,'BLOCKED_BURDEN_SHIFT');
});

test('repair legitimacy remains unresolved when compensation boundary remains unresolved',()=>{
  const burdenAudit=auditBurdenShift(legitimateBurdenShift);
  const result=auditRepairLegitimacy(
    makeLegitimacyInput(burdenAudit,[unresolvedBoundary])
  );
  assert.equal(result.status,'UNRESOLVED');
});

test('repair legitimacy can pass with reopen when floors burdens and governance conditions pass',()=>{
  const burdenAudit=auditBurdenShift(legitimateBurdenShift);
  const result=auditRepairLegitimacy(
    makeLegitimacyInput(burdenAudit,[compensableBoundary])
  );
  assert.equal(result.status,'LEGITIMATE_WITH_REOPEN');
  assert.equal(result.legitimacyAuthorizesTruth,false);
});

test('governance failure blocks otherwise acceptable repair',()=>{
  const burdenAudit=auditBurdenShift(legitimateBurdenShift);
  const input=makeLegitimacyInput(burdenAudit,[compensableBoundary]);
  input.appealIndependent=false;
  const result=auditRepairLegitimacy(input);
  assert.equal(result.status,'BLOCKED_GOVERNANCE');
  assert.ok(result.governanceFailures.includes('appeal-not-independent'));
});

test('multi-party authorization can succeed without convergent reasons',()=>{
  const audit=auditMultiPartyAuthorization(
    pluralAuthorization,
    ['later-participants','future-participants','review-staff','origin-contributors']
  );
  assert.equal(audit.status,'AUTHORIZED_WITHOUT_CONVERGENCE');
  assert.equal(audit.unanimous,true);
  assert.equal(audit.convergentReasons,false);
  assert.equal(audit.authorizationWithoutConvergence,true);
});

test('conditional authorization preserves plural agreement without forcing unanimity of reasons',()=>{
  const audit=auditMultiPartyAuthorization(
    conditionalAuthorization,
    ['later-participants','future-participants','review-staff','origin-contributors']
  );
  assert.equal(audit.status,'AUTHORIZED_CONDITIONALLY');
  assert.ok(audit.conditionalParties.includes('origin-contributors-party'));
  assert.equal(audit.authorizationWithoutConvergence,true);
});

test('severe coercion blocks authorization even when assent is recorded',()=>{
  const audit=auditMultiPartyAuthorization(
    coercedAuthorization,
    ['later-participants','future-participants','review-staff','origin-contributors']
  );
  assert.equal(audit.status,'BLOCKED_COERCION');
  assert.ok(audit.coercedAuthorizations.includes('origin-contributors-party'));
});

test('missing affected group blocks authorization',()=>{
  const audit=auditMultiPartyAuthorization(
    pluralAuthorization,
    ['later-participants','future-participants','review-staff','origin-contributors','missing-group']
  );
  assert.equal(audit.status,'BLOCKED_MISSING_STANDING');
  assert.equal(audit.allAffectedGroupsRepresented,false);
});

test('inadequate standing blocks authorization',()=>{
  const parties=structuredClone(pluralAuthorization);
  parties[0].standingAdequate=false;
  const audit=auditMultiPartyAuthorization(
    parties,
    ['later-participants','future-participants','review-staff','origin-contributors']
  );
  assert.equal(audit.status,'BLOCKED_MISSING_STANDING');
});

test('objection blocks authorization rather than being averaged away',()=>{
  const parties=structuredClone(pluralAuthorization);
  parties[1].authorization='OBJECT';
  const audit=auditMultiPartyAuthorization(
    parties,
    ['later-participants','future-participants','review-staff','origin-contributors']
  );
  assert.equal(audit.status,'NOT_AUTHORIZED');
  assert.ok(audit.objectingParties.includes('review-staff-party'));
});

test('authorization audit requires at least two parties',()=>{
  assert.throws(
    ()=>auditMultiPartyAuthorization([pluralAuthorization[0]],['later-participants']),
    /at least two parties required/
  );
});
