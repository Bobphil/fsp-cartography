const test=require('node:test');
const assert=require('node:assert/strict');

const {
  validateRepairSequence,
  sequenceRepair,
  auditCapabilityTradeoffs,
  auditExitVoiceAppeal,
  auditRepairReversibility,
  auditMultiGenerationReopen
}=require('../../dist/research/revision9.js');

const {
  repairSequence,
  policyTradeoffs,
  noLossTradeoffs,
  participantArchitecture,
  constrainedArchitecture,
  reopenRules
}=require('../../dist/research/revision9Fixtures.js');

test('repair sequence validates ordered dependencies',()=>{
  assert.deepEqual(validateRepairSequence(repairSequence),[]);
});

test('repair sequence executes only steps whose preconditions are met',()=>{
  const steps=sequenceRepair(repairSequence,['repair-window-open']);
  assert.deepEqual(
    steps.map(x=>x.stepId),
    ['step-1-evidence','step-2-voice','step-3-policy','step-4-authority']
  );
});

test('repair sequence remains non-recommending',()=>{
  assert.equal(repairSequence.recommendation,null);
});

test('irreversible repair step may not carry rollback conditions',()=>{
  const bad=structuredClone(repairSequence);
  bad.steps[3].rollbackConditions=['fake rollback'];
  assert.ok(
    validateRepairSequence(bad)
      .includes('step-4-authority:irreversible-step-has-rollback-conditions')
  );
});

test('capability tradeoff audit preserves gains and losses by group',()=>{
  const audit=auditCapabilityTradeoffs('step-3-policy',policyTradeoffs);
  assert.ok(audit.groupsWithGains.includes('later-participants'));
  assert.ok(audit.groupsWithLosses.includes('review-staff'));
  assert.equal(audit.distributionalConflict,true);
  assert.equal(audit.aggregateNetScore,null);
});

test('distributional conflict cannot be hidden behind aggregate score',()=>{
  const audit=auditCapabilityTradeoffs('step-3-policy',policyTradeoffs);
  assert.equal(audit.aggregateNetScore,null);
  assert.equal(audit.paretoImprovement,false);
});

test('no-loss tradeoff can be marked limited Pareto improvement',()=>{
  const audit=auditCapabilityTradeoffs('step-2-voice',noLossTradeoffs);
  assert.equal(audit.paretoImprovement,true);
  assert.equal(audit.distributionalConflict,false);
});

test('unknown capability effects block Pareto classification',()=>{
  const withUnknown=structuredClone(noLossTradeoffs);
  withUnknown[1].after='UNKNOWN';
  withUnknown[1].unknowns=['future workload unknown'];
  const audit=auditCapabilityTradeoffs('step-x',withUnknown);
  assert.equal(audit.paretoImprovement,false);
  assert.ok(audit.groupsWithUnknowns.includes('review-staff'));
});

test('participant architecture has meaningful exit voice and appeal',()=>{
  const audit=auditExitVoiceAppeal(participantArchitecture);
  assert.equal(audit.meaningfulExit,true);
  assert.equal(audit.meaningfulVoice,true);
  assert.equal(audit.meaningfulAppeal,true);
  assert.deepEqual(audit.failures,[]);
});

test('formal exit is not meaningful when costs are prohibitive',()=>{
  const audit=auditExitVoiceAppeal(constrainedArchitecture);
  assert.equal(audit.meaningfulExit,false);
  assert.ok(audit.failures.includes('exit-not-meaningful'));
});

test('appeal is not meaningful when review is not independent',()=>{
  const audit=auditExitVoiceAppeal(constrainedArchitecture);
  assert.equal(audit.meaningfulAppeal,false);
  assert.ok(audit.failures.includes('appeal-not-meaningful'));
});

test('reversible step supports experimentation when rollback conditions are active',()=>{
  const step=repairSequence.steps[2];
  const audit=auditRepairReversibility(step,{
    activeRollbackConditions:['prior-policy-version-retained'],
    irreversibleConsequences:[]
  });
  assert.equal(audit.rollbackCurrentlyAvailable,true);
  assert.equal(audit.reversibilitySupportsExperimentation,true);
  assert.equal(audit.irreversibilityRequiresHigherEvidenceBurden,false);
});

test('reversible label is insufficient when rollback conditions are unavailable',()=>{
  const step=repairSequence.steps[2];
  const audit=auditRepairReversibility(step,{
    activeRollbackConditions:[],
    irreversibleConsequences:[]
  });
  assert.equal(audit.rollbackCurrentlyAvailable,false);
  assert.equal(audit.reversibilitySupportsExperimentation,false);
});

test('irreversible authority repair requires higher evidence burden',()=>{
  const step=repairSequence.steps[3];
  const audit=auditRepairReversibility(step,{
    activeRollbackConditions:[],
    irreversibleConsequences:['authority structure cannot be restored without major institutional disruption']
  });
  assert.equal(audit.reversible,false);
  assert.equal(audit.irreversibilityRequiresHigherEvidenceBurden,true);
});

test('multi-generation reopen continuity passes when every generation is covered',()=>{
  const audit=auditMultiGenerationReopen(reopenRules,[1,2,3,4]);
  assert.equal(audit.reopenContinuity,true);
  assert.deepEqual(audit.missingGenerations,[]);
  assert.equal(audit.laterGenerationCanChallengeInheritedRepair,true);
  assert.equal(audit.firstGenerationApprovalBindsFutureGenerations,false);
});

test('missing generation breaks reopen continuity',()=>{
  const audit=auditMultiGenerationReopen(
    reopenRules.filter(x=>x.generation!==3),
    [1,2,3,4]
  );
  assert.equal(audit.reopenContinuity,false);
  assert.ok(audit.missingGenerations.includes(3));
});

test('reopen continuity requires evidence capability and minority review',()=>{
  const broken=structuredClone(reopenRules);
  broken[2].capabilityReviewRequired=false;
  const audit=auditMultiGenerationReopen(broken,[1,2,3,4]);
  assert.equal(audit.reopenContinuity,false);
});

test('first-generation approval never binds future generations',()=>{
  const audit=auditMultiGenerationReopen(reopenRules,[1,2,3,4]);
  assert.equal(audit.firstGenerationApprovalBindsFutureGenerations,false);
});
