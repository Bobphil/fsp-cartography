const test=require('node:test');
const assert=require('node:assert/strict');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');
const {
  enterCaseFromProse,
  openTimeline
}=require('../../dist/research/encyclopediaReaderShell.js');
const {
  buildReaderPanel
}=require('../../dist/research/encyclopediaReaderPresentation.js');
const {ENCYCLOPEDIA_PILOT}=require('../../dist/research/encyclopediaPilotConfig.js');

test('home-first journey remains anchored in CH1.2 Neptune/Vulcan',()=>{
  assert.equal(ENCYCLOPEDIA_PILOT.sectionId,'CH1.2');
  assert.equal(ENCYCLOPEDIA_PILOT.caseId,'NEPTUNE-VULCAN');
});

test('pilot prose preserves multiple paragraphs for public reading density',()=>{
  const blocks=ENCYCLOPEDIA_PILOT.prose.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  assert.ok(blocks.length>=5);
});

test('case card has one primary guided path plus claim ceiling and return',()=>{
  const s=enterCaseFromProse('CH1.2','NEPTUNE-VULCAN','anchor',0,'usability');
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  const kinds=m.actions.map(x=>x.kind);
  assert.deepEqual(kinds,['TIMELINE','CASE_CLAIM_CEILING','RETURN']);
  assert.equal(m.actions.filter(x=>x.primary).length>=1,true);
  assert.ok(m.sections.some(x=>x.heading==='Suggested path'));
});

test('timeline explains how to read routed versus disabled material',()=>{
  const s=openTimeline(enterCaseFromProse('CH1.2','NEPTUNE-VULCAN','anchor',0,'usability'));
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.ok(m.sections.some(x=>x.heading==='How to use this timeline'));
  assert.ok(m.actions.some(x=>x.kind==='FULL_CASE'));
});

test('first-reader interface keeps claim ceiling reachable before full-case expansion',()=>{
  const s=enterCaseFromProse('CH1.2','NEPTUNE-VULCAN','anchor',0,'usability');
  const m=buildReaderPanel(s,FIVE_CASE_ATLAS);
  assert.ok(m.actions.some(x=>x.kind==='CASE_CLAIM_CEILING'));
  assert.equal(s.fullCaseExploration,false);
});
