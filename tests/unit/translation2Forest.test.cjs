const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildPairwiseTranslationMatrix,
  assessUnderdeterminationCandidate,
  negotiateSharedTask,
  assessInstitutionalPower,
  assessMultiPartyRepair
} = require('../../dist/research/translation2.js');

const {
  forestPrfs,
  forestTranslationAttempts,
  forestTaskRelevantStructures,
  forestTaskNegotiation,
  forestInstitution,
  forestAgencyBefore,
  forestAgencyRepair,
  forestBadRepair
} = require('../../dist/research/forestCase.js');

test('four PRFs generate a complete 12-edge directed translation matrix', () => {
  const matrix=buildPairwiseTranslationMatrix(forestPrfs,forestTranslationAttempts);
  assert.equal(matrix.complete,true);
  assert.equal(matrix.directedResults.length,12);
  assert.deepEqual(matrix.missingDirectedPairs,[]);
});

test('directed matrix preserves asymmetric translation remainder', () => {
  const matrix=buildPairwiseTranslationMatrix(forestPrfs,forestTranslationAttempts);
  const cToA=matrix.directedResults.find(x=>x.sourcePrfId==='C' && x.targetPrfId==='A');
  const aToC=matrix.directedResults.find(x=>x.sourcePrfId==='A' && x.targetPrfId==='C');
  assert.notDeepEqual(cToA.assessment.remainder,aToC.assessment.remainder);
});

test('matrix contains structural and task-only translations without requiring convergence', () => {
  const matrix=buildPairwiseTranslationMatrix(forestPrfs,forestTranslationAttempts);
  const levels=new Set(matrix.directedResults.map(x=>x.assessment.level));
  assert.ok(levels.has('STRUCTURAL'));
  assert.ok(levels.has('TASK_ONLY'));
  assert.ok(matrix.directedResults.every(x=>x.assessment.requiresOntologicalConvergence===false));
});

test('missing directed translation is reported instead of silently inferred', () => {
  const matrix=buildPairwiseTranslationMatrix(forestPrfs,forestTranslationAttempts.slice(1));
  assert.equal(matrix.complete,false);
  assert.ok(matrix.missingDirectedPairs.includes('A->B'));
});

test('candidate underdetermination result is supported for divergent ontologies with the same task signature', () => {
  const a=forestTaskRelevantStructures.find(x=>x.prfId==='A');
  const c=forestTaskRelevantStructures.find(x=>x.prfId==='C');
  const result=assessUnderdeterminationCandidate(a,c);
  assert.equal(result.sameTask,true);
  assert.equal(result.ontologicallyNonIdentical,true);
  assert.equal(result.taskRelevantStructureEquivalent,true);
  assert.equal(result.candidateResult,'UNDERDETERMINATION_SUPPORTED');
  assert.equal(result.ontologicalUniquenessLicensed,false);
});

test('candidate theorem is not established when one task-relevant consequence differs', () => {
  const a=forestTaskRelevantStructures.find(x=>x.prfId==='A');
  const c=structuredClone(forestTaskRelevantStructures.find(x=>x.prfId==='C'));
  c.predictedConsequences=[...c.predictedConsequences,'sacred relation is damaged by any commercial extraction'];
  const result=assessUnderdeterminationCandidate(a,c);
  assert.equal(result.taskRelevantStructureEquivalent,false);
  assert.equal(result.candidateResult,'NOT_ESTABLISHED');
});

test('first forest task is rejected and second is negotiated into cooperation', () => {
  const result=negotiateSharedTask(['A','B','C','D'],forestTaskNegotiation);
  assert.equal(result.rounds,2);
  assert.equal(result.rejectedTasks[0],'Maximize economic value from the forest');
  assert.match(result.acceptedTask,/Protect the watershed/);
  assert.equal(result.cooperationResult,'COOPERATION_POSSIBLE');
});

test('negotiation returns no accepted task if every round fails', () => {
  const result=negotiateSharedTask(['A','B','C','D'],[forestTaskNegotiation[0]]);
  assert.equal(result.acceptedTask,null);
  assert.equal(result.cooperationResult,'NO_SHARED_TASK');
});

test('institutional audit separates concentrated power from formal coordination', () => {
  const result=assessInstitutionalPower(forestInstitution);
  assert.ok(result.severelyAffectedPrfs.includes('C'));
  assert.ok(result.concentrationFlags.includes('BOARD_CHAIR:agenda+decision'));
  assert.ok(result.concentrationFlags.includes('BOARD_CHAIR:information+decision'));
});

test('institutional audit does not mark every participant severe', () => {
  const result=assessInstitutionalPower(forestInstitution);
  assert.notEqual(result.dominationRiskByPrf.B,'SEVERE');
});

test('capability-preserving forest repair improves participants without worsening any', () => {
  const result=assessMultiPartyRepair(forestAgencyBefore,forestAgencyRepair);
  assert.equal(result.passes,true);
  assert.equal(result.worsenedPrfs.length,0);
  assert.ok(result.improvedPrfs.includes('C'));
  assert.ok(result.improvedPrfs.includes('A'));
  assert.ok(result.improvedPrfs.includes('D'));
});

test('repair that centralizes interpretation or removes appeal fails multi-party test', () => {
  const result=assessMultiPartyRepair(forestAgencyBefore,forestBadRepair);
  assert.equal(result.passes,false);
  assert.ok(result.worsenedPrfs.length>0);
});

test('relational and religious ontological remainders remain explicit after task agreement', () => {
  const matrix=buildPairwiseTranslationMatrix(forestPrfs,forestTranslationAttempts);
  const cToB=matrix.directedResults.find(x=>x.sourcePrfId==='C' && x.targetPrfId==='B');
  const dToA=matrix.directedResults.find(x=>x.sourcePrfId==='D' && x.targetPrfId==='A');
  assert.ok(cToB.assessment.remainder.includes('ancestral relation'));
  assert.ok(dToA.assessment.remainder.includes('created-order ontology'));
});

test('property framework is represented with a bounded claim ceiling rather than treated as unlimited use', () => {
  const b=forestPrfs.find(x=>x.id==='B');
  assert.match(b.claims[0].claimCeiling,/does not establish unlimited use/);
});
