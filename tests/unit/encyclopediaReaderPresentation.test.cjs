const test=require('node:test');
const assert=require('node:assert/strict');
const {
  buildProsePanel,
  buildReaderPanel
}=require('../../dist/research/encyclopediaReaderPresentation.js');
const {
  enterCaseFromProse,
  openTimeline,
  openTarget,
  openClaimCeiling,
  exploreFullCase
}=require('../../dist/research/encyclopediaReaderShell.js');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');

const enter=(sectionId,caseId)=>enterCaseFromProse(sectionId,caseId,'anchor',10,'test');

test('interface prose model presents chapter section and case connection',()=>{
  const m=buildProsePanel('CH1.2','NEPTUNE-VULCAN',FIVE_CASE_ATLAS);
  assert.equal(m.sectionId,'CH1.2');
  assert.match(m.inspectLabel,/Neptune/);
});

test('case card exposes ordinary-language relevance before formal detail',()=>{
  const s=enter('CH1.2','NEPTUNE-VULCAN');
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(m.view,'CASE_CARD');
  assert.ok(m.sections.some(x=>x.heading==='Why this case matters'));
  assert.ok(m.actions.some(x=>x.kind==='TIMELINE'));
});

test('timeline orders canonical states and marks chapter aperture',()=>{
  const s=openTimeline(enter('CH4.9','DESI-2024-2026'));
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.deepEqual(m.timeline.nodes.map(x=>x.stateId),['D0','D1','D2']);
  assert.ok(m.timeline.nodes.every(x=>x.contextual));
});

test('state view presents claims evidence warrant remainder and ceiling',()=>{
  let s=enter('CH4.9','DESI-2024-2026');
  s=openTarget(s,FIVE_CASE_ATLAS,'STATE','D1');
  const headings=buildReaderPanel(s,FIVE_CASE_ATLAS).sections.map(x=>x.heading);
  assert.deepEqual(headings,[
    'What is being claimed','Evidence in view','What carries the inference','Still open','Current claim ceiling'
  ]);
});

test('transition view visibly distinguishes preservation gain loss and unresolved remainder',()=>{
  let s=enter('CH2.2','NEWTON-EINSTEIN');
  s=openTarget(s,FIVE_CASE_ATLAS,'TRANSITION','RE0-RE1');
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(m.view,'TRANSITION_DETAIL');
  assert.ok(m.sections.some(x=>x.heading==='What was preserved'));
  assert.ok(m.sections.some(x=>x.heading==='What remains unresolved'));
});

test('probe view contains counterfactual firewall notice and bounded fields',()=>{
  let s=enter('CH3.3','NEWTON-EINSTEIN');
  s=openTarget(s,FIVE_CASE_ATLAS,'PROBE','RE-PROBE-ELEVATOR');
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.match(m.notice,/not automatically a historical fact/);
  assert.ok(m.sections.some(x=>x.heading==='Hold fixed'));
  assert.ok(m.sections.some(x=>x.heading==='Vary'));
});

test('source view shows source support and location',()=>{
  let s=enter('CH1.3','FOUCAULT-LIGHT-SPEED');
  s=openTarget(s,FIVE_CASE_ATLAS,'SOURCE','FOUCAULT-SEP');
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(m.view,'SOURCE_LEDGER');
  assert.ok(m.sections.some(x=>x.heading==='This source supports'));
  assert.ok(m.sections.some(x=>x.heading==='Source location'));
});

test('claim ceiling view makes blocked inferences and REOPEN conditions first-class',()=>{
  let s=enter('CH4.9','DESI-2024-2026');
  s=openClaimCeiling(s,FIVE_CASE_ATLAS);
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(m.view,'CLAIM_CEILING');
  assert.ok(m.sections.some(x=>x.heading==='May not infer'));
  assert.ok(m.sections.some(x=>x.heading==='REOPEN if'));
});

test('every deep interface view retains visible return-to-reading action',()=>{
  let s=enter('CH3.3','NEWTON-EINSTEIN');
  for(const next of [
    ()=>openTimeline(s),
    ()=>openTarget(s,FIVE_CASE_ATLAS,'STATE','RE2'),
    ()=>openTarget(s,FIVE_CASE_ATLAS,'PROBE','RE-PROBE-ELEVATOR'),
    ()=>openClaimCeiling(s,FIVE_CASE_ATLAS)
  ]){
    s=next();
    const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
    assert.ok(m.actions.some(x=>x.kind==='RETURN'));
  }
});

test('contextual timeline visually distinguishes routed and unrouted states',()=>{
  let s=openTimeline(enter('CH2.2','NEWTON-EINSTEIN'));
  let m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(m.timeline.nodes.find(x=>x.stateId==='RE0').contextual,true);
  assert.equal(m.timeline.nodes.find(x=>x.stateId==='RE3').contextual,false);
  s=exploreFullCase(s);
  m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(m.timeline.nodes.find(x=>x.stateId==='RE3').contextual,false);
  assert.equal(s.fullCaseExploration,true);
});

test('case card defers full-case exploration until the timeline',()=>{
  const s=enter('CH1.2','NEPTUNE-VULCAN');
  const card=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(card.actions.some(x=>x.kind==='FULL_CASE'),false);
  assert.equal(s.fullCaseExploration,false);
  const timeline=buildReaderPanel(openTimeline(s),FIVE_CASE_ATLAS);
  assert.ok(timeline.actions.some(x=>x.kind==='FULL_CASE'));
});

test('reader presentation never changes the canonical Atlas objects',()=>{
  let s=enter('CH4.9','DESI-2024-2026');
  const before=JSON.stringify(FIVE_CASE_ATLAS);
  s=openTarget(s,FIVE_CASE_ATLAS,'STATE','D2');
  buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.equal(JSON.stringify(FIVE_CASE_ATLAS),before);
});
