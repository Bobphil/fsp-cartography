const test = require('node:test');
const assert = require('node:assert/strict');

const {
  assessTranslation,
  assessCooperation,
  assessAgency,
  assessRepair
} = require('../../dist/research/translation.js');

test('full local translation does not require ontological convergence', () => {
  const result=assessTranslation({
    sourcePrfId:'A',targetPrfId:'B',task:'measure stream pollution',
    correspondences:[{sourceElement:'measured nitrate',targetElement:'measured nitrate',relation:'DIRECT'}],
    preserved:['nitrate measurement','sampling date'],remainder:[],distortions:[]
  });
  assert.equal(result.level,'FULL_LOCAL');
  assert.equal(result.locallyAdequate,true);
  assert.equal(result.requiresOntologicalConvergence,false);
});

test('structural translation preserves relation while leaving remainder visible', () => {
  const result=assessTranslation({
    sourcePrfId:'C',targetPrfId:'A',task:'protect forest watershed',
    correspondences:[{sourceElement:'obligation to living watershed',targetElement:'constraint against destructive use',relation:'STRUCTURAL'}],
    preserved:['constraint against destructive use'],
    remainder:['kinship relation to place'],
    distortions:[]
  });
  assert.equal(result.level,'STRUCTURAL');
  assert.deepEqual(result.remainder,['kinship relation to place']);
});

test('task-only translation permits practical overlap without conceptual identity', () => {
  const result=assessTranslation({
    sourcePrfId:'D',targetPrfId:'B',task:'prevent irreversible watershed damage',
    correspondences:[{sourceElement:'stewardship limit',targetElement:'land-use restriction',relation:'TASK_EQUIVALENT'}],
    preserved:['avoid irreversible watershed damage'],
    remainder:['sacred stewardship grounding'],
    distortions:[]
  });
  assert.equal(result.level,'TASK_ONLY');
});

test('translation failure is representable', () => {
  const result=assessTranslation({
    sourcePrfId:'C',targetPrfId:'B',task:'define sacred status of ancestral land',
    correspondences:[],preserved:[],
    remainder:['ancestral relation','sacred standing of place'],
    distortions:['translated solely as willingness-to-pay']
  });
  assert.equal(result.level,'FAILURE');
  assert.equal(result.locallyAdequate,false);
});

test('translation may be asymmetric', () => {
  const cToA=assessTranslation({
    sourcePrfId:'C',targetPrfId:'A',task:'watershed protection',
    correspondences:[{sourceElement:'land relation',targetElement:'ecological stewardship constraint',relation:'STRUCTURAL'}],
    preserved:['stewardship constraint'],remainder:['kinship'],distortions:[]
  });
  const aToC=assessTranslation({
    sourcePrfId:'A',targetPrfId:'C',task:'watershed protection',
    correspondences:[{sourceElement:'species viability threshold',targetElement:'condition of continued life',relation:'STRUCTURAL'}],
    preserved:['species viability threshold'],remainder:[],distortions:[]
  });
  assert.notDeepEqual(cToA.remainder,aToC.remainder);
});

test('cooperation is possible without ontological convergence when all accept a bounded task', () => {
  const result=assessCooperation({
    task:'prevent irreversible watershed damage while negotiating land use',
    participantPrfIds:['A','B','C','D'],
    acceptedBy:['A','B','C','D'],
    rejectedBy:[],
    compatibleActions:['temporary moratorium','joint evidence review'],
    incompatibleActions:['immediate clear-cutting']
  });
  assert.equal(result.result,'COOPERATION_POSSIBLE');
  assert.equal(result.ontologicalConvergenceRequired,false);
});

test('shared-task rejection does not get converted into cooperation', () => {
  const result=assessCooperation({
    task:'maximize economic value from forest',
    participantPrfIds:['A','B','C','D'],
    acceptedBy:['B'],
    rejectedBy:['A','C','D'],
    compatibleActions:['survey timber'],
    incompatibleActions:[]
  });
  assert.equal(result.result,'NO_SHARED_TASK');
});

test('partial practical alignment without universal task acceptance remains coordination only', () => {
  const result=assessCooperation({
    task:'pause irreversible action for seven days',
    participantPrfIds:['A','B','C','D'],
    acceptedBy:['A','B','C'],
    rejectedBy:[],
    compatibleActions:['temporary pause'],
    incompatibleActions:[]
  });
  assert.equal(result.result,'COORDINATION_ONLY');
});

test('agency audit flags severe risk when multiple dimensions are blocked', () => {
  const result=assessAgency({
    informationAccess:'BLOCKED',
    interpretiveContestability:'BLOCKED',
    optionVisibility:'CONSTRAINED',
    standingToParticipate:'CONSTRAINED',
    reopenability:'OPEN',
    materialCapability:'CONSTRAINED'
  });
  assert.equal(result.dominationRisk,'SEVERE');
  assert.deepEqual(result.blockedDimensions.sort(),['informationAccess','interpretiveContestability'].sort());
});

test('agency audit is diagnostic rather than equating all constraint with domination', () => {
  const result=assessAgency({
    informationAccess:'OPEN',
    interpretiveContestability:'OPEN',
    optionVisibility:'CONSTRAINED',
    standingToParticipate:'OPEN',
    reopenability:'OPEN',
    materialCapability:'OPEN'
  });
  assert.equal(result.dominationRisk,'LOW');
});

test('repair passes when it improves agency without worsening another dimension', () => {
  const before={
    informationAccess:'BLOCKED',
    interpretiveContestability:'CONSTRAINED',
    optionVisibility:'OPEN',
    standingToParticipate:'CONSTRAINED',
    reopenability:'BLOCKED',
    materialCapability:'CONSTRAINED'
  };
  const result=assessRepair(before,{
    description:'open records and create appeal route',
    changes:{informationAccess:'OPEN',reopenability:'OPEN'}
  });
  assert.equal(result.preservesAgencyOrImproves,true);
  assert.ok(result.improvedDimensions.includes('informationAccess'));
  assert.ok(result.improvedDimensions.includes('reopenability'));
});

test('repair fails minimal test when improvement is bought by worsening another agency dimension', () => {
  const before={
    informationAccess:'CONSTRAINED',
    interpretiveContestability:'OPEN',
    optionVisibility:'OPEN',
    standingToParticipate:'OPEN',
    reopenability:'CONSTRAINED',
    materialCapability:'OPEN'
  };
  const result=assessRepair(before,{
    description:'centralize decision for speed',
    changes:{informationAccess:'OPEN',interpretiveContestability:'BLOCKED'}
  });
  assert.equal(result.preservesAgencyOrImproves,false);
  assert.ok(result.worsenedDimensions.includes('interpretiveContestability'));
});
