const test=require('node:test');
const assert=require('node:assert/strict');

const {
  compareRevisionMoments,
  recordEvidenceReweighting
}=require('../../dist/research/revision3Dynamics.js');

const {
  assessCommunityConvergence,
  buildCommunityRevisionState
}=require('../../dist/research/revision3Community.js');

const {
  mercuryMomentEarly,
  mercuryMomentLater,
  earlyCommunity,
  laterCommunity
}=require('../../dist/research/revision3Fixtures.js');

test('later revision moment must be temporally later',()=>{
  assert.throws(
    ()=>compareRevisionMoments(mercuryMomentLater,mercuryMomentEarly),
    /greater ordinal/
  );
});

test('moment comparison detects added discriminatory evidence',()=>{
  const d=compareRevisionMoments(mercuryMomentEarly,mercuryMomentLater);
  assert.ok(d.addedEvidence.includes('Vulcan searches fail to establish the proposed planet'));
  assert.ok(d.addedEvidence.includes('relativistic prediction accounts for Mercury perihelion'));
});

test('Vulcan evidence assessment worsens over time',()=>{
  const d=compareRevisionMoments(mercuryMomentEarly,mercuryMomentLater);
  const change=d.reasonChanges.find(
    x=>x.candidateId==='add-vulcan-like-planet' && x.reason==='EVIDENCE_FIT'
  );
  assert.equal(change.before,'UNRESOLVED');
  assert.equal(change.after,'STRONGLY_COUNTS_AGAINST');
});

test('relativity evidence and fecundity strengthen over time',()=>{
  const d=compareRevisionMoments(mercuryMomentEarly,mercuryMomentLater);
  assert.ok(d.reasonChanges.some(x=>
    x.candidateId==='replace-newtonian-with-relativistic-gravity' &&
    x.reason==='EVIDENCE_FIT' &&
    x.after==='STRONGLY_FAVORS'
  ));
  assert.ok(d.reasonChanges.some(x=>
    x.candidateId==='replace-newtonian-with-relativistic-gravity' &&
    x.reason==='FECUNDITY' &&
    x.after==='STRONGLY_FAVORS'
  ));
});

test('reason dynamics never produce hidden utility score',()=>{
  const d=compareRevisionMoments(mercuryMomentEarly,mercuryMomentLater);
  assert.equal(d.hiddenUtilityScore,null);
});

test('conservative evaluator can reweight evidence without numeric weight',()=>{
  const record=recordEvidenceReweighting(
    'conservative',
    'EVIDENCE_FIT',
    'MEDIUM',
    'HIGH',
    ['Vulcan searches fail to establish the proposed planet'],
    'failed auxiliary repair increases the salience of discriminatory evidence'
  );
  assert.equal(record.numericWeight,null);
  assert.equal(record.previousSalience,'MEDIUM');
  assert.equal(record.newSalience,'HIGH');
});

test('evidence reweighting requires explicit trigger and justification',()=>{
  assert.throws(
    ()=>recordEvidenceReweighting(
      'e','EVIDENCE_FIT','LOW','HIGH',[],'because'
    ),
    /trigger evidence required/
  );
  assert.throws(
    ()=>recordEvidenceReweighting(
      'e','EVIDENCE_FIT','LOW','HIGH',['new evidence'],''
    ),
    /justification required/
  );
});

test('early community exhibits practical convergence without theory-choice convergence',()=>{
  const c=assessCommunityConvergence(earlyCommunity);
  assert.equal(c.kind,'PRACTICAL_CONVERGENCE_ONLY');
  assert.ok(c.sharedActions.includes('collect further perihelion evidence'));
  assert.equal(c.sharedPreferredCandidateId,undefined);
  assert.equal(c.forcedConsensus,false);
});

test('later community converges on choice while preserving reason pluralism',()=>{
  const c=assessCommunityConvergence(laterCommunity);
  assert.equal(c.kind,'CHOICE_CONVERGENCE_WITH_REASON_PLURALISM');
  assert.equal(c.sharedPreferredCandidateId,'replace-newtonian-with-relativistic-gravity');
  assert.equal(c.forcedConsensus,false);
});

test('full convergence requires exact represented reason agreement',()=>{
  const same=laterCommunity.map(x=>({
    ...structuredClone(x),
    statedReasons:['EVIDENCE_FIT','EXPLANATORY_POWER']
  }));
  const c=assessCommunityConvergence(same);
  assert.equal(c.kind,'FULL_CONVERGENCE');
});

test('same reasons can coexist with choice divergence',()=>{
  const judgments=[
    {
      memberId:'a',evaluatorId:'a',liveCandidateIds:['x','y'],
      preferredCandidateId:'x',actionCommitments:[],
      statedReasons:['EVIDENCE_FIT','COHERENCE']
    },
    {
      memberId:'b',evaluatorId:'b',liveCandidateIds:['x','y'],
      preferredCandidateId:'y',actionCommitments:[],
      statedReasons:['EVIDENCE_FIT','COHERENCE']
    }
  ];
  const c=assessCommunityConvergence(judgments);
  assert.equal(c.kind,'REASON_CONVERGENCE_WITH_CHOICE_DIVERGENCE');
});

test('community nonconvergence remains a legitimate output',()=>{
  const judgments=[
    {
      memberId:'a',evaluatorId:'a',liveCandidateIds:['x'],
      preferredCandidateId:'x',actionCommitments:['a1'],
      statedReasons:['EVIDENCE_FIT']
    },
    {
      memberId:'b',evaluatorId:'b',liveCandidateIds:['y'],
      preferredCandidateId:'y',actionCommitments:['b1'],
      statedReasons:['CONSERVATISM']
    }
  ];
  const c=assessCommunityConvergence(judgments);
  assert.equal(c.kind,'NONCONVERGENCE');
  assert.equal(c.forcedConsensus,false);
});

test('community convergence requires at least two judgments',()=>{
  assert.throws(
    ()=>assessCommunityConvergence([earlyCommunity[0]]),
    /at least two/
  );
});

test('community revision state preserves member judgments and convergence separately',()=>{
  const state=buildCommunityRevisionState('astronomy-community','early',earlyCommunity);
  assert.equal(state.memberJudgments.length,2);
  assert.equal(state.convergence.kind,'PRACTICAL_CONVERGENCE_ONLY');
});
