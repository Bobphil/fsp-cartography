const test=require('node:test');
const assert=require('node:assert/strict');

const {
  validateCaseDossier,
  transitionVector,
  dominantChangedDimensions,
  compareAtlasCases,
  sourceCoverage,
  atlasClaimCeiling
}=require('../../dist/research/fiveCaseAtlas.js');

const {
  FIVE_CASE_ATLAS,
  foucaultDossier,
  neptuneVulcanDossier,
  galileoDossier,
  relativityDossier,
  desiDossier
}=require('../../dist/research/fiveCaseAtlasFixtures.js');

test('atlas contains exactly five canonical dossiers',()=>{
  assert.equal(FIVE_CASE_ATLAS.length,5);
  assert.deepEqual(
    new Set(FIVE_CASE_ATLAS.map(d=>d.caseId)).size,
    5
  );
});

test('all five dossiers pass canonical validation',()=>{
  for(const dossier of FIVE_CASE_ATLAS){
    const audit=validateCaseDossier(dossier);
    assert.equal(audit.passes,true,`${dossier.caseId}: ${audit.failures.join(', ')}`);
  }
});

test('every dossier has at least one controlled revision probe',()=>{
  assert.ok(FIVE_CASE_ATLAS.every(d=>d.controlledRevisionProbes.length>=1));
});

test('every dossier has explicit claim ceiling may-not-infer and reopen conditions',()=>{
  for(const d of FIVE_CASE_ATLAS){
    assert.ok(d.caseClaimCeiling.length>0);
    assert.ok(d.mayNotInfer.length>0);
    assert.ok(d.reopenConditions.length>0);
  }
});

test('all source ledger entries are used by states or transitions',()=>{
  for(const d of FIVE_CASE_ATLAS){
    assert.deepEqual(sourceCoverage(d).unusedSourceIds,[]);
  }
});

test('Foucault transition vector includes evidence and claim-ceiling change',()=>{
  const v=transitionVector(foucaultDossier.transitions[0]);
  assert.equal(v.E,true);
  assert.equal(v.GAMMA,true);
  assert.equal(v.F,false);
});

test('Foucault preserves discrimination while blocking ontological uniqueness',()=>{
  assert.ok(foucaultDossier.caseClaimCeiling.some(x=>/without logically establishing one unique final ontology/i.test(x)));
  assert.ok(foucaultDossier.mayNotInfer.some(x=>/all alternative ontologies impossible/i.test(x)));
});

test('Neptune/Vulcan dossier includes both successful auxiliary repair and later framework revision',()=>{
  assert.ok(neptuneVulcanDossier.transitions.some(t=>t.changedDimensions.includes('A')));
  assert.ok(neptuneVulcanDossier.transitions.some(t=>t.changedDimensions.includes('F')));
  assert.ok(neptuneVulcanDossier.states.some(s=>s.periodLabel.includes('Neptune')));
  assert.ok(neptuneVulcanDossier.states.some(s=>s.periodLabel.includes('Vulcan')));
});

test('Neptune and Vulcan block a universal auxiliary-first rule',()=>{
  assert.ok(neptuneVulcanDossier.mayNotInfer.some(x=>/auxiliary repair is always rationally prior/i.test(x)));
});

test('Galileo dossier explicitly represents standing and power transitions',()=>{
  const dims=new Set(galileoDossier.transitions.flatMap(t=>t.changedDimensions));
  assert.ok(dims.has('S'));
  assert.ok(dims.has('P'));
  assert.ok(dims.has('M'));
});

test('Galileo claim ceiling separates institutional settlement from epistemic demonstration',()=>{
  const final=galileoDossier.states.at(-1);
  assert.ok(final.claimCeiling.some(x=>/not an epistemic demonstration/i.test(x)));
});

test('Newton to Einstein dossier includes meaning ontology framework and remainder change',()=>{
  const dims=new Set(relativityDossier.transitions.flatMap(t=>t.changedDimensions));
  for(const d of ['M','O','F','R']){
    assert.ok(dims.has(d),`missing ${d}`);
  }
});

test('relativity dossier preserves limiting continuity without identity',()=>{
  assert.ok(relativityDossier.caseClaimCeiling.some(x=>/preserved limiting structure/i.test(x)));
  assert.ok(relativityDossier.controlledRevisionProbes.some(p=>/Local task equivalence does not entail global ontological identity/i.test(p.claimCeiling)));
});

test('DESI dossier has ordered 2024 2025 2026 inquiry states',()=>{
  assert.deepEqual(
    desiDossier.states.map(s=>s.periodLabel),
    [
      'DESI Year 1 results — April 2024',
      'DESI DR2 / three-year results — March 2025',
      'DR2 Lyman-alpha full-shape result — July 2026'
    ]
  );
});

test('DESI 2026 does not erase earlier evidence history',()=>{
  const t=desiDossier.transitions.find(x=>x.transitionId==='D1-D2');
  assert.ok(t.preserved.some(x=>/earlier combined-data results remain in evidence history/i.test(x)));
});

test('DESI claim ceiling remains open rather than declaring discovery',()=>{
  assert.ok(desiDossier.mayNotInfer.some(x=>/2025 results discovered evolving dark energy/i.test(x)));
  assert.ok(desiDossier.reopenConditions.some(x=>/new DESI data release/i.test(x)));
});

test('all five cases expose distinct ordered transition topologies rather than one flattened history',()=>{
  const signatures=FIVE_CASE_ATLAS.map(d=>
    d.transitions
      .map(t=>[...t.changedDimensions].sort().join('+'))
      .join(' -> ')
  );
  assert.equal(new Set(signatures).size,5);
});

test('shared dimension coverage does not imply identical revision topology',()=>{
  const neptuneUnion=[...new Set(neptuneVulcanDossier.transitions.flatMap(t=>t.changedDimensions))].sort();
  const relativityUnion=[...new Set(relativityDossier.transitions.flatMap(t=>t.changedDimensions))].sort();
  assert.deepEqual(neptuneUnion,relativityUnion);
  const neptuneSequence=neptuneVulcanDossier.transitions.map(t=>[...t.changedDimensions].sort().join('+'));
  const relativitySequence=relativityDossier.transitions.map(t=>[...t.changedDimensions].sort().join('+'));
  assert.notDeepEqual(neptuneSequence,relativitySequence);
});

test('comparison table returns one row per case',()=>{
  const rows=compareAtlasCases(FIVE_CASE_ATLAS);
  assert.equal(rows.length,5);
  assert.ok(rows.every(r=>r.stateCount>=2));
  assert.ok(rows.every(r=>r.transitionCount>=1));
  assert.ok(rows.every(r=>r.probeCount>=1));
});

test('dominant dimensions are computed from actual transition frequencies',()=>{
  for(const d of FIVE_CASE_ATLAS){
    assert.ok(dominantChangedDimensions(d).length>=1);
  }
});

test('atlas-level claim ceiling rejects uniqueness and exhaustiveness claims',()=>{
  const ceiling=atlasClaimCeiling(FIVE_CASE_ATLAS);
  assert.match(ceiling,/does not prove/i);
  assert.match(ceiling,/unique/i);
  assert.match(ceiling,/exhaustive/i);
});

test('invalid dossier is detected rather than silently normalized',()=>{
  const broken=structuredClone(foucaultDossier);
  broken.states[1].claimCeiling=[];
  const audit=validateCaseDossier(broken);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.some(x=>x.includes('missing-claim-ceiling')));
});

test('unknown transition source is detected',()=>{
  const broken=structuredClone(galileoDossier);
  broken.transitions[0].sourceIds.push('UNKNOWN-SOURCE');
  const audit=validateCaseDossier(broken);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.some(x=>x.includes('unknown-source')));
});
