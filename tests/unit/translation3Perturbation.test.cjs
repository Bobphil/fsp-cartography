const test=require('node:test');
const assert=require('node:assert/strict');

const {
  compareAuxiliaryAssumptions,
  compareRemainder,
  assessEvidenceChange,
  assessUnderdeterminationRobustness
}=require('../../dist/research/translation3.js');

const {
  forestBaselineSnapshot,
  forestConvergentEvidenceSnapshot,
  forestDivergentConsequenceSnapshot,
  forestAuxiliaryOnlySnapshot
}=require('../../dist/research/forestPerturbations.js');

test('baseline auxiliary assumptions can differ despite task-equivalent signatures',()=>{
  const result=compareAuxiliaryAssumptions('A','C',forestBaselineSnapshot);
  assert.equal(result.identical,false);
  assert.ok(result.leftOnly.length>0);
  assert.ok(result.rightOnly.length>0);
});

test('convergent evidence perturbation records added public evidence',()=>{
  const result=assessEvidenceChange(forestBaselineSnapshot,forestConvergentEvidenceSnapshot);
  assert.ok(result.addedEvidence.includes('spring nitrate spike observed downstream after test clearing'));
  assert.equal(result.removedEvidence.length,0);
});

test('convergent evidence changes all PRF task structures in parallel',()=>{
  const result=assessEvidenceChange(forestBaselineSnapshot,forestConvergentEvidenceSnapshot);
  assert.deepEqual(new Set(result.changedPrfs),new Set(['A','B','C','D']));
});

test('candidate underdetermination remains robust when task signatures change together and support is stable',()=>{
  const result=assessUnderdeterminationRobustness(
    forestBaselineSnapshot,
    forestConvergentEvidenceSnapshot,
    'A','C'
  );
  assert.equal(result.before.candidateResult,'UNDERDETERMINATION_SUPPORTED');
  assert.equal(result.after.candidateResult,'UNDERDETERMINATION_SUPPORTED');
  assert.equal(result.result,'ROBUST_UNDER_PERTURBATION');
  assert.equal(result.evidenceChanged,true);
});

test('new task-relevant consequence breaks the candidate result',()=>{
  const result=assessUnderdeterminationRobustness(
    forestBaselineSnapshot,
    forestDivergentConsequenceSnapshot,
    'A','C'
  );
  assert.equal(result.before.candidateResult,'UNDERDETERMINATION_SUPPORTED');
  assert.equal(result.after.candidateResult,'NOT_ESTABLISHED');
  assert.equal(result.result,'BROKEN_BY_TASK_RELEVANT_DIFFERENCE');
});

test('divergent sacred-spring consequence changes C but not A',()=>{
  const result=assessEvidenceChange(forestBaselineSnapshot,forestDivergentConsequenceSnapshot);
  assert.ok(result.changedPrfs.includes('C'));
  assert.ok(!result.changedPrfs.includes('A'));
});

test('translation remainder can grow under new evidence',()=>{
  const delta=compareRemainder(
    forestBaselineSnapshot,
    forestDivergentConsequenceSnapshot,
    'C','A'
  );
  assert.equal(delta.changed,true);
  assert.ok(delta.added.includes('non-substitutable sacred-spring relation'));
});

test('translation remainder remains directional under perturbation',()=>{
  const cToA=compareRemainder(
    forestBaselineSnapshot,
    forestDivergentConsequenceSnapshot,
    'C','A'
  );
  const aToC=compareRemainder(
    forestBaselineSnapshot,
    forestDivergentConsequenceSnapshot,
    'A','C'
  );
  assert.notDeepEqual(cToA.added,aToC.added);
});

test('auxiliary-only perturbation leaves current task signature unchanged',()=>{
  const result=assessEvidenceChange(forestBaselineSnapshot,forestAuxiliaryOnlySnapshot);
  assert.equal(result.changedPrfs.length,0);
  const aux=compareAuxiliaryAssumptions('A','C',forestAuxiliaryOnlySnapshot);
  assert.ok(aux.leftOnly.includes('local calibration is uncertain'));
});

test('auxiliary-only change with remainder growth triggers reopen',()=>{
  const result=assessUnderdeterminationRobustness(
    forestBaselineSnapshot,
    forestAuxiliaryOnlySnapshot,
    'A','C'
  );
  assert.equal(result.before.candidateResult,'UNDERDETERMINATION_SUPPORTED');
  assert.equal(result.after.candidateResult,'UNDERDETERMINATION_SUPPORTED');
  assert.equal(result.auxiliaryAssumptionsDiverged,true);
  assert.equal(result.remainderChanged,true);
  assert.equal(result.result,'REOPEN_AUXILIARIES');
});

test('robust result never licenses ontological uniqueness',()=>{
  const result=assessUnderdeterminationRobustness(
    forestBaselineSnapshot,
    forestConvergentEvidenceSnapshot,
    'A','D'
  );
  assert.equal(result.after.ontologicalUniquenessLicensed,false);
});

test('non-established baseline is not retroactively promoted',()=>{
  const result=assessUnderdeterminationRobustness(
    forestDivergentConsequenceSnapshot,
    forestConvergentEvidenceSnapshot,
    'A','C'
  );
  assert.equal(result.result,'NOT_PREVIOUSLY_ESTABLISHED');
});
