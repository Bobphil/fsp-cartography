const test=require('node:test');
const assert=require('node:assert/strict');

const {
  generatePerturbation,
  generateOutOfSampleSuite,
  buildAuxiliaryNetwork,
  ablateAuxiliaryNode,
  assessFalseEquivalence
}=require('../../dist/research/translation4.js');

const {
  outOfSampleSpecs,
  auxiliaryDependencyMap,
  getBaseline
}=require('../../dist/research/translation4Fixtures.js');

const {
  assessUnderdeterminationRobustness
}=require('../../dist/research/translation3.js');

test('out-of-sample suite is deterministic and complete',()=>{
  const baseline=getBaseline();
  const first=generateOutOfSampleSuite(baseline,outOfSampleSpecs);
  const second=generateOutOfSampleSuite(baseline,outOfSampleSpecs);
  assert.deepEqual(first,second);
  assert.equal(first.length,outOfSampleSpecs.length);
});

test('duplicate perturbation ids are rejected',()=>{
  const baseline=getBaseline();
  assert.throws(
    ()=>generateOutOfSampleSuite(baseline,[outOfSampleSpecs[0],outOfSampleSpecs[0]]),
    /Duplicate perturbation id/
  );
});

test('shared evidence perturbation updates every PRF empirical commitment',()=>{
  const baseline=getBaseline();
  const generated=generatePerturbation(baseline,outOfSampleSpecs[0]).snapshot;
  assert.ok(generated.taskStructures.every(
    s=>s.empiricalCommitments.includes('sediment concentration rises after heavy rainfall')
  ));
});

test('PRF-specific evidence perturbs only the targeted PRF task structure',()=>{
  const baseline=getBaseline();
  const generated=generatePerturbation(baseline,outOfSampleSpecs[1]).snapshot;
  const changed=generated.taskStructures.filter(
    s=>s.empiricalCommitments.includes('community testimony identifies seasonal fish spawning dependence')
  ).map(s=>s.prfId);
  assert.deepEqual(changed,['C']);
});

test('out-of-sample shared evidence can preserve A-C underdetermination',()=>{
  const baseline=getBaseline();
  const generated=generatePerturbation(baseline,outOfSampleSpecs[0]).snapshot;
  const result=assessUnderdeterminationRobustness(baseline,generated,'A','C');
  assert.equal(result.after.candidateResult,'UNDERDETERMINATION_SUPPORTED');
});

test('PRF-specific evidence breaks A-C task equivalence',()=>{
  const baseline=getBaseline();
  const generated=generatePerturbation(baseline,outOfSampleSpecs[1]).snapshot;
  const result=assessUnderdeterminationRobustness(baseline,generated,'A','C');
  assert.equal(result.result,'BROKEN_BY_TASK_RELEVANT_DIFFERENCE');
});

test('auxiliary-only perturbation forces reopen rather than false robustness',()=>{
  const baseline=getBaseline();
  const generated=generatePerturbation(baseline,outOfSampleSpecs[3]).snapshot;
  const result=assessUnderdeterminationRobustness(baseline,generated,'A','C');
  assert.equal(result.result,'REOPEN_AUXILIARIES');
});

test('auxiliary network exposes all declared assumptions',()=>{
  const baseline=getBaseline();
  const network=buildAuxiliaryNetwork(baseline);
  const expected=baseline.auxiliaryAssumptions.reduce((n,g)=>n+g.assumptions.length,0);
  assert.equal(network.nodes.length,expected);
  assert.ok(network.edges.length>0);
});

test('ablation identifies sensitive ecological calibration support',()=>{
  const baseline=getBaseline();
  const result=ablateAuxiliaryNode(
    baseline,
    'A:aux:0',
    auxiliaryDependencyMap
  );
  assert.equal(result.sensitive,true);
  assert.ok(result.changedStructures.includes('empiricalCommitments'));
  assert.ok(result.changedStructures.includes('licensedActions'));
});

test('ablation keeps PRF identity local to the affected auxiliary node',()=>{
  const baseline=getBaseline();
  const result=ablateAuxiliaryNode(
    baseline,
    'C:aux:1',
    auxiliaryDependencyMap
  );
  assert.deepEqual(result.affectedPrfIds,['C']);
});

test('unknown auxiliary node is rejected',()=>{
  const baseline=getBaseline();
  assert.throws(
    ()=>ablateAuxiliaryNode(baseline,'Z:aux:99',auxiliaryDependencyMap),
    /Unknown auxiliary node/
  );
});

test('same action with different auxiliaries is flagged as false equivalence',()=>{
  const baseline=getBaseline();
  const a=baseline.taskStructures.find(x=>x.prfId==='A');
  const c=baseline.taskStructures.find(x=>x.prfId==='C');
  const aAux=baseline.auxiliaryAssumptions.find(x=>x.prfId==='A').assumptions;
  const cAux=baseline.auxiliaryAssumptions.find(x=>x.prfId==='C').assumptions;

  const result=assessFalseEquivalence(
    a,c,aAux,cAux,
    ['scientific naturalism as ontology'],
    ['kinship with land','more-than-human standing']
  );
  assert.equal(result.surfaceActionsMatch,true);
  assert.equal(result.falseEquivalenceDetected,true);
  assert.ok(result.reasons.includes('same actions, different auxiliary support'));
});

test('matching surface actions do not hide different predicted consequences',()=>{
  const baseline=getBaseline();
  const a=structuredClone(baseline.taskStructures.find(x=>x.prfId==='A'));
  const c=structuredClone(baseline.taskStructures.find(x=>x.prfId==='C'));
  c.predictedConsequences=[...c.predictedConsequences,'ceremonial harm persists without ecological damage'];

  const result=assessFalseEquivalence(
    a,c,
    ['shared auxiliary'],
    ['shared auxiliary'],
    [],
    []
  );
  assert.equal(result.surfaceActionsMatch,true);
  assert.equal(result.predictedConsequencesMatch,false);
  assert.equal(result.falseEquivalenceDetected,true);
});

test('true local equivalence is not falsely flagged',()=>{
  const baseline=getBaseline();
  const a=structuredClone(baseline.taskStructures.find(x=>x.prfId==='A'));
  const b=structuredClone(a);
  b.prfId='X';

  const result=assessFalseEquivalence(
    a,b,
    ['same auxiliary'],
    ['same auxiliary'],
    ['same remainder'],
    ['same remainder']
  );
  assert.equal(result.falseEquivalenceDetected,false);
});
