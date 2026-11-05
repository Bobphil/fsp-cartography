const test=require('node:test');
const assert=require('node:assert/strict');

const {
  enterCaseFromProse,
  exploreFullCase,
  openClaimCeiling,
  openTarget,
  openTimeline,
  provenanceSourceIds,
  resolveSelection,
  returnToProse,
  reverseChapterConnections,
  routeForSectionCase
}=require('../../dist/research/encyclopediaReaderShell.js');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');

function enter(sectionId,caseId){
  return enterCaseFromProse(sectionId,caseId,`${sectionId}-anchor`,321,`route:${sectionId}`);
}

test('J1 Neptune/Vulcan: prose -> card -> timeline -> transition -> probe -> source -> ceiling -> exact prose return',()=>{
  let s=enter('CH1.2','NEPTUNE-VULCAN');
  assert.equal(s.view,'CASE_CARD');
  s=openTimeline(s);
  s=openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','NV0-NV1');
  s=openTarget(s,FIVE_CASE_ATLAS,'PROBE','NV-PROBE-VULCAN');
  const sourceId=provenanceSourceIds(s,FIVE_CASE_ATLAS)[0];
  assert.ok(sourceId);
  s=openTarget(s,FIVE_CASE_ATLAS,'SOURCE',sourceId);
  s=openClaimCeiling(s,FIVE_CASE_ATLAS);
  const origin=returnToProse(s);
  assert.equal(origin.sectionId,'CH1.2');
  assert.equal(origin.anchorId,'CH1.2-anchor');
  assert.equal(origin.scrollPosition,321);
});

test('J2 Foucault route preserves certified experiment/probe/source path',()=>{
  let s=enter('CH1.3','FOUCAULT-LIGHT-SPEED');
  s=openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','F0-F1');
  s=openTarget(s,FIVE_CASE_ATLAS,'PROBE','F-PROBE-1');
  s=openTarget(s,FIVE_CASE_ATLAS,'SOURCE','FOUCAULT-SEP');
  s=openClaimCeiling(s,FIVE_CASE_ATLAS);
  assert.equal(resolveSelection(s,FIVE_CASE_ATLAS).caseId,'FOUCAULT-LIGHT-SPEED');
  assert.equal(returnToProse(s).sectionId,'CH1.3');
});

test('J3 Relativity meaning-change journey reaches RE0-RE1 provenance and ceiling',()=>{
  let s=enter('CH2.2','NEWTON-EINSTEIN');
  s=openTarget(s,FIVE_CASE_ATLAS,'STATE','RE0');
  s=openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','RE0-RE1');
  const sourceId=provenanceSourceIds(s,FIVE_CASE_ATLAS)[0];
  s=openTarget(s,FIVE_CASE_ATLAS,'SOURCE',sourceId);
  s=openClaimCeiling(s,FIVE_CASE_ATLAS);
  assert.equal(returnToProse(s).sectionId,'CH2.2');
});

test('J4 Elevator probe keeps controlled revision distinct from historical transition',()=>{
  let s=enter('CH3.3','NEWTON-EINSTEIN');
  s=openTarget(s,FIVE_CASE_ATLAS,'STATE','RE2');
  s=openTarget(s,FIVE_CASE_ATLAS,'PROBE','RE-PROBE-ELEVATOR');
  const probe=resolveSelection(s,FIVE_CASE_ATLAS);
  assert.deepEqual(probe.holdFixed,['local observed free-fall behavior']);
  assert.ok(probe.remainder.some(x=>x.includes('tidal')));
  const sourceId=provenanceSourceIds(s,FIVE_CASE_ATLAS)[0];
  assert.ok(sourceId);
  s=openTarget(s,FIVE_CASE_ATLAS,'SOURCE',sourceId);
  s=openClaimCeiling(s,FIVE_CASE_ATLAS);
  assert.equal(returnToProse(s).sectionId,'CH3.3');
});

test('J5 DESI journey preserves the 2024 -> 2025 -> 2026 live revision frontier',()=>{
  let s=enter('CH4.9','DESI-2024-2026');
  for(const stateId of ['D0','D1','D2']) s=openTarget(s,FIVE_CASE_ATLAS,'STATE',stateId);
  s=exploreFullCase(s);
  s=openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','D1-D2');
  const sourceId=provenanceSourceIds(s,FIVE_CASE_ATLAS).find(x=>x==='DESI-2026');
  assert.equal(sourceId,'DESI-2026');
  s=openTarget(s,FIVE_CASE_ATLAS,'SOURCE',sourceId);
  s=openClaimCeiling(s,FIVE_CASE_ATLAS);
  const ceiling=resolveSelection(s,FIVE_CASE_ATLAS);
  assert.ok(ceiling.reopenConditions.some(x=>x.includes('new DESI data release')));
  assert.equal(returnToProse(s).sectionId,'CH4.9');
});

test('J6 Chapter 4.11 compares all five canonical case ceilings without merging them',()=>{
  const caseIds=['FOUCAULT-LIGHT-SPEED','NEPTUNE-VULCAN','GALILEO-COPERNICAN','NEWTON-EINSTEIN','DESI-2024-2026'];
  const ceilings=caseIds.map(caseId=>{
    let s=enter('CH4.11',caseId);
    s=openClaimCeiling(s,FIVE_CASE_ATLAS);
    const c=resolveSelection(s,FIVE_CASE_ATLAS);
    assert.equal(returnToProse(s).sectionId,'CH4.11');
    return c.caseClaimCeiling.join(' ');
  });
  assert.equal(new Set(ceilings).size,5);
});

test('F1 prose cannot manufacture a semantic route absent from the certified map',()=>{
  assert.throws(()=>routeForSectionCase('CH1.2','GALILEO-COPERNIC'),/case not routed/);
});

test('F2 resolved probe is cloned so counterfactual manipulation cannot mutate canonical Atlas history',()=>{
  let s=enter('CH3.3','NEWTON-EINSTEIN');
  s=openTarget(s,FIVE_CASE_ATLAS,'PROBE','RE-PROBE-ELEVATOR');
  const probe=resolveSelection(s,FIVE_CASE_ATLAS);
  probe.vary.push('ILLEGAL MUTATION');
  const canonical=FIVE_CASE_ATLAS.find(d=>d.caseId==='NEWTON-EINSTEIN')
    .controlledRevisionProbes.find(p=>p.probeId==='RE-PROBE-ELEVATOR');
  assert.equal(canonical.vary.includes('ILLEGAL MUTATION'),false);
});

test('F3 exact return token preserves anchor scroll and route context rather than chapter-top fallback',()=>{
  const s=enter('CH1.3','FOUCAULT-LIGHT-SPEED');
  const origin=returnToProse(s);
  assert.deepEqual(origin,{
    chapterId:'CH1-DUHEM-QUINE',
    sectionId:'CH1.3',
    anchorId:'CH1.3-anchor',
    scrollPosition:321,
    routeContext:'route:CH1.3'
  });
});

test('F4 unrelated source is rejected inside a contextual aperture',()=>{
  let s=enter('CH1.3','FOUCAULT-LIGHT-SPEED');
  s=openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','F0-F1');
  assert.throws(
    ()=>openTarget(s,FIVE_CASE_ATLAS,'SOURCE','DUHEM-SEP'),
    /outside contextual aperture/
  );
});

test('F5 contextual aperture rejects a canonical state that was not certified for the prose section',()=>{
  const s=enter('CH1.2','NEPTUNE-VULCAN');
  assert.throws(
    ()=>openTarget(s,FIVE_CASE_ATLAS,'STATE','NV2'),
    /outside contextual aperture/
  );
});

test('F6 reverse lookup does not invent chapter uses for an unknown target',()=>{
  const hits=reverseChapterConnections('NEWTON-EINSTEIN','TRANSITION','NOT-A-TRANSITION');
  assert.deepEqual(hits,[]);
});

test('F7 explicit full-case exploration permits canonical inspection without contaminating stored contextual route',()=>{
  let s=enter('CH1.2','NEPTUNE-VULCAN');
  const before=s.contextualTargets.map(t=>`${t.kind}|${t.targetId}`);
  s=exploreFullCase(s);
  s=openTarget(s,FIVE_CASE_ATLAS,'STATE','NV2');
  const after=s.contextualTargets.map(t=>`${t.kind}|${t.targetId}`);
  assert.deepEqual(after,before);
  assert.equal(returnToProse(s).sectionId,'CH1.2');
});

test('F8 unknown section and unknown canonical target fail closed',()=>{
  assert.throws(()=>enter('CH9.9','NEPTUNE-VULCAN'),/unknown section/);
  const s=enter('CH1.2','NEPTUNE-VULCAN');
  assert.throws(
    ()=>openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','DOES-NOT-EXIST'),
    /unknown canonical target/
  );
});
