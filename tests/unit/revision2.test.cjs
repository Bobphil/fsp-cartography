const test=require('node:test');
const assert=require('node:assert/strict');

const {
  buildTradeoffMatrix,
  compareByGoodSense,
  auditPathDependence,
  NON_ALGORITHMIC_CHOICE_BOUNDARY
}=require('../../dist/research/revision2.js');

const {
  neptuneReasonProfile,
  vulcanReasonProfile,
  relativityReasonProfile,
  cautiousEmpiricist,
  conservativeResearcher,
  mercuryPathContext
}=require('../../dist/research/revision2Fixtures.js');

const {
  applyRevision,
  auditRevisionCandidate
}=require('../../dist/research/revision1.js');

const {
  mercuryBaseline,
  vulcanAuxiliaryRepair,
  relativityFrameworkRevision
}=require('../../dist/research/revision1Fixtures.js');

test('tradeoff matrix includes all three candidates and seven reasons',()=>{
  const m=buildTradeoffMatrix([neptuneReasonProfile,vulcanReasonProfile,relativityReasonProfile]);
  assert.equal(m.candidates.length,3);
  assert.equal(m.reasons.length,7);
  assert.equal(m.recommendation,null);
});

test('relativity is not allowed to dominate simply because it wins on evidence',()=>{
  const m=buildTradeoffMatrix([vulcanReasonProfile,relativityReasonProfile]);
  const rel=m.dominance.find(x=>x.candidateId==='replace-newtonian-with-relativistic-gravity');
  assert.equal(rel.dominates.includes('add-vulcan-like-planet'),false);
});

test('Vulcan remains conservative while evidence counts strongly against it',()=>{
  assert.equal(vulcanReasonProfile.assessments.CONSERVATISM,'STRONGLY_FAVORS');
  assert.equal(vulcanReasonProfile.assessments.EVIDENCE_FIT,'STRONGLY_COUNTS_AGAINST');
});

test('relativity exhibits real virtue conflict',()=>{
  assert.equal(relativityReasonProfile.assessments.EVIDENCE_FIT,'STRONGLY_FAVORS');
  assert.equal(relativityReasonProfile.assessments.CONSERVATISM,'STRONGLY_COUNTS_AGAINST');
  assert.equal(relativityReasonProfile.assessments.FECUNDITY,'STRONGLY_FAVORS');
});

test('good-sense profiles can make different reasons salient without changing candidate facts',()=>{
  const a=compareByGoodSense(relativityReasonProfile,cautiousEmpiricist);
  const b=compareByGoodSense(relativityReasonProfile,conservativeResearcher);
  assert.notDeepEqual(a.salientReasons,b.salientReasons);
  assert.equal(a.candidateId,b.candidateId);
});

test('good-sense comparison preserves unresolved verdict possibility',()=>{
  const unresolved=structuredClone(neptuneReasonProfile);
  unresolved.assessments.EVIDENCE_FIT='UNRESOLVED';
  unresolved.assessments.COERENCE='UNRESOLVED';
  const result=compareByGoodSense(unresolved,cautiousEmpiricist);
  assert.ok(['UNDERDETERMINED','WEAKENED','LIVE','REJECTED'].includes(result.verdict));
});

test('path-dependence audit enforces formation-justification firewall',()=>{
  const candidate=auditRevisionCandidate(
    applyRevision(mercuryBaseline,vulcanAuxiliaryRepair),
    {unresolvedAnomalies:['Mercury perihelion discrepancy'],empiricalStatus:'FAILED'}
  );
  const audit=auditPathDependence(mercuryPathContext,candidate,{
    inheritedSupports:['Newtonian celestial mechanics'],
    inheritedCosts:['researchers trained in Newtonian celestial mechanics'],
    epistemicallyRelevant:[],
    merelyHistorical:['researchers trained in Newtonian celestial mechanics']
  });
  assert.match(audit.formationJustificationFirewall,/does not by itself justify/);
});

test('path-dependence audit rejects items not present in context',()=>{
  const candidate=auditRevisionCandidate(
    applyRevision(mercuryBaseline,relativityFrameworkRevision),
    {unresolvedAnomalies:[],empiricalStatus:'SUPPORTED'}
  );
  assert.throws(()=>auditPathDependence(mercuryPathContext,candidate,{
    inheritedSupports:['invented item'],
    inheritedCosts:[],
    epistemicallyRelevant:[],
    merelyHistorical:[]
  }),/not present in context/);
});

test('non-algorithmic boundary forbids universal weighted sum',()=>{
  assert.ok(NON_ALGORITHMIC_CHOICE_BOUNDARY.mayNotCompute.some(x=>/universal weighted sum/.test(x)));
  assert.equal(NON_ALGORITHMIC_CHOICE_BOUNDARY.recommendation,null);
});

test('non-algorithmic boundary permits comparison of path dependence',()=>{
  assert.ok(NON_ALGORITHMIC_CHOICE_BOUNDARY.mayCompare.includes('path-dependent costs and affordances'));
});

test('empty tradeoff matrix is rejected',()=>{
  assert.throws(()=>buildTradeoffMatrix([]),/at least one reason profile required/);
});
