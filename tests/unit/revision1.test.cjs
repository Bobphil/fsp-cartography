const test=require('node:test');
const assert=require('node:assert/strict');

const {
  applyRevision,
  auditRevisionCandidate,
  buildRevisionFrontier,
  REVISION_CHOICE_CLAIM_CEILING
}=require('../../dist/research/revision1.js');

const {
  uranusBaseline,
  neptuneAuxiliaryRepair,
  uranusFrameworkReplacement,
  mercuryBaseline,
  vulcanAuxiliaryRepair,
  relativityFrameworkRevision,
  claimCeilingContraction
}=require('../../dist/research/revision1Fixtures.js');

test('auxiliary revision changes only auxiliary dimension',()=>{
  const result=applyRevision(uranusBaseline,neptuneAuxiliaryRepair);
  assert.deepEqual(result.changedDimensions,['AUXILIARY']);
  assert.ok(result.after.auxiliaries.includes('an additional unknown gravitating planet may perturb Uranus'));
  assert.ok(result.after.frameworkCommitments.includes('Newtonian celestial mechanics'));
});

test('framework revision changes framework dimension',()=>{
  const result=applyRevision(mercuryBaseline,relativityFrameworkRevision);
  assert.deepEqual(result.changedDimensions,['FRAMEWORK']);
  assert.ok(result.after.frameworkCommitments.includes('relativistic gravitational framework'));
});

test('claim-ceiling contraction is representable without theory change',()=>{
  const result=applyRevision(mercuryBaseline,claimCeilingContraction);
  assert.deepEqual(result.changedDimensions,['CLAIM_CEILING']);
  assert.match(result.after.claimCeiling,/not a uniquely correct revision target/);
  assert.deepEqual(result.after.frameworkCommitments,mercuryBaseline.frameworkCommitments);
});

test('Neptune auxiliary repair can be low-mutilation and empirically supported',()=>{
  const application=applyRevision(uranusBaseline,neptuneAuxiliaryRepair);
  const audit=auditRevisionCandidate(application,{
    unresolvedAnomalies:[],
    empiricalStatus:'SUPPORTED',
    explanatoryGain:['new planet prediction accounts for Uranus anomaly']
  });
  assert.equal(audit.target,'AUXILIARY');
  assert.equal(audit.empiricalStatus,'SUPPORTED');
  assert.equal(audit.unresolvedAnomalyCount,0);
  assert.ok(audit.minimalMutilationScore>0.8);
});

test('Vulcan auxiliary repair can remain low-mutilation while empirically failing',()=>{
  const application=applyRevision(mercuryBaseline,vulcanAuxiliaryRepair);
  const audit=auditRevisionCandidate(application,{
    unresolvedAnomalies:['Mercury perihelion discrepancy'],
    empiricalStatus:'FAILED',
    newLiabilities:['predicted intra-Mercurial planet not successfully established']
  });
  assert.equal(audit.target,'AUXILIARY');
  assert.equal(audit.empiricalStatus,'FAILED');
  assert.equal(audit.unresolvedAnomalyCount,1);
  assert.ok(audit.minimalMutilationScore>0.8);
});

test('minimal mutilation does not imply empirical support',()=>{
  const vulcan=auditRevisionCandidate(
    applyRevision(mercuryBaseline,vulcanAuxiliaryRepair),
    {unresolvedAnomalies:['Mercury perihelion discrepancy'],empiricalStatus:'FAILED'}
  );
  const relativity=auditRevisionCandidate(
    applyRevision(mercuryBaseline,relativityFrameworkRevision),
    {
      unresolvedAnomalies:[],
      empiricalStatus:'SUPPORTED',
      explanatoryGain:['explains Mercury perihelion within revised gravitational framework']
    }
  );
  assert.ok(vulcan.minimalMutilationScore>relativity.minimalMutilationScore);
  assert.equal(vulcan.empiricalStatus,'FAILED');
  assert.equal(relativity.empiricalStatus,'SUPPORTED');
});

test('revision frontier reports least-mutilating and supported candidates separately',()=>{
  const vulcan=auditRevisionCandidate(
    applyRevision(mercuryBaseline,vulcanAuxiliaryRepair),
    {unresolvedAnomalies:['Mercury perihelion discrepancy'],empiricalStatus:'FAILED'}
  );
  const relativity=auditRevisionCandidate(
    applyRevision(mercuryBaseline,relativityFrameworkRevision),
    {unresolvedAnomalies:[],empiricalStatus:'SUPPORTED'}
  );
  const ceiling=auditRevisionCandidate(
    applyRevision(mercuryBaseline,claimCeilingContraction),
    {unresolvedAnomalies:['Mercury perihelion discrepancy'],empiricalStatus:'UNRESOLVED'}
  );
  const frontier=buildRevisionFrontier([vulcan,relativity,ceiling]);
  assert.ok(frontier.leastMutilatingCandidateIds.includes('contract-mercury-claim-ceiling'));
  assert.ok(frontier.empiricallySupportedCandidateIds.includes('replace-newtonian-with-relativistic-gravity'));
  assert.ok(frontier.failedCandidateIds.includes('add-vulcan-like-planet'));
  assert.equal(frontier.recommendation,null);
});

test('revision frontier refuses recommendation even when one candidate is supported',()=>{
  const neptune=auditRevisionCandidate(
    applyRevision(uranusBaseline,neptuneAuxiliaryRepair),
    {unresolvedAnomalies:[],empiricalStatus:'SUPPORTED'}
  );
  const replacement=auditRevisionCandidate(
    applyRevision(uranusBaseline,uranusFrameworkReplacement),
    {unresolvedAnomalies:['Uranus orbit discrepancy'],empiricalStatus:'UNRESOLVED'}
  );
  const frontier=buildRevisionFrontier([neptune,replacement]);
  assert.equal(frontier.recommendation,null);
  assert.match(frontier.claimCeiling,/may not infer a uniquely rational revision/);
});

test('empty revision frontier is rejected',()=>{
  assert.throws(()=>buildRevisionFrontier([]),/at least one candidate required/);
});

test('revision-choice ceiling prohibits minimal-mutilation decision rule',()=>{
  assert.ok(
    REVISION_CHOICE_CLAIM_CEILING.mayNotSay.includes(
      'the least mutilating candidate is therefore rationally mandatory'
    )
  );
});

test('revision-choice ceiling permits comparative evidential statements',()=>{
  assert.ok(
    REVISION_CHOICE_CLAIM_CEILING.maySay.includes(
      'this candidate is better supported by the represented evidence'
    )
  );
});

test('successful Neptune repair does not authorize ontological promotion',()=>{
  const frontier=buildRevisionFrontier([
    auditRevisionCandidate(
      applyRevision(uranusBaseline,neptuneAuxiliaryRepair),
      {unresolvedAnomalies:[],empiricalStatus:'SUPPORTED'}
    )
  ]);
  assert.equal(frontier.recommendation,null);
  assert.ok(
    REVISION_CHOICE_CLAIM_CEILING.mayNotSay.includes(
      'successful auxiliary repair proves the retained framework true'
    )
  );
});

test('failed Vulcan repair does not force immediate framework replacement',()=>{
  assert.ok(
    REVISION_CHOICE_CLAIM_CEILING.mayNotSay.includes(
      'failed auxiliary repair proves immediate framework replacement is mandatory'
    )
  );
});

test('revision operations preserve untouched dimensions',()=>{
  const result=applyRevision(uranusBaseline,neptuneAuxiliaryRepair);
  assert.deepEqual(result.after.warrants,uranusBaseline.warrants);
  assert.deepEqual(result.after.background,uranusBaseline.background);
  assert.equal(result.after.task,uranusBaseline.task);
  assert.equal(result.after.claimCeiling,uranusBaseline.claimCeiling);
});

test('task replacement requires explicit replacement text',()=>{
  assert.throws(
    ()=>applyRevision(uranusBaseline,{
      id:'bad-task',
      target:'TASK',
      reason:'invalid'
    }),
    /replaceText required/
  );
});
