const test=require('node:test');
const assert=require('node:assert/strict');
const {
  NEPTUNE_VULCAN_NARRATIVE,
  apertureForChapter,
  milestoneForState,
  recoverInquiryContext,
  validateInquiryNarrative
}=require('../../dist/research/fspInquiryNarrative.js');

test('Neptune/Vulcan narrative spine validates',()=>{
  const r=validateInquiryNarrative(NEPTUNE_VULCAN_NARRATIVE);
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('narrative spine carries a continuous whole-case story rather than fragments',()=>{
  assert.ok(NEPTUNE_VULCAN_NARRATIVE.narrativeParagraphs.length>=6);
  assert.match(NEPTUNE_VULCAN_NARRATIVE.narrativeParagraphs.join(' '),/1846/);
  assert.match(NEPTUNE_VULCAN_NARRATIVE.narrativeParagraphs.join(' '),/1859/);
  assert.match(NEPTUNE_VULCAN_NARRATIVE.narrativeParagraphs.join(' '),/1915/);
});

test('all four chapters are apertures onto the same inquiry spine',()=>{
  const ids=NEPTUNE_VULCAN_NARRATIVE.apertures.map(a=>a.chapterId);
  assert.deepEqual(ids,['CH1-DUHEM-QUINE','CH2-KUHN-MEANING','CH3-THOUGHT-EXPERIMENTS','CH4-DIACHRONIC-FORMALISM']);
});

test('temporal milestones anchor formal states without identifying dates with states',()=>{
  assert.ok(milestoneForState('NEPTUNE-VULCAN','NV2').some(m=>m.start==='1845' && m.end==='1846'));
  assert.ok(milestoneForState('NEPTUNE-VULCAN','NV3').some(m=>m.start==='1859'));
  assert.ok(NEPTUNE_VULCAN_NARRATIVE.firewalls.some(x=>x.includes('Historical chronology ≠ canonical state identity')));
});

test('context recovery answers whole temporal local and FSP questions',()=>{
  const c=recoverInquiryContext({caseId:'NEPTUNE-VULCAN',chapterId:'CH1-DUHEM-QUINE',sectionId:'CH1.2',stateId:'NV3'});
  assert.match(c.wholeProblem,/what should investigators revise/i);
  assert.match(c.temporalLocation,/1859/);
  assert.match(c.localProblem,/Neptune auxiliary repair/);
  assert.match(c.fspContribution,/revision target|auxiliary/i);
  assert.equal(c.wholeInquiryHref,'#/narrative/NEPTUNE-VULCAN');
});

test('chapter 4 explicitly treats formal order as anchored but nonidentical to history',()=>{
  const a=apertureForChapter('NEPTUNE-VULCAN','CH4-DIACHRONIC-FORMALISM');
  assert.match(a.chapterQuestion,/formalize changing inquiry/i);
  assert.match(a.wholeInquiryConnection,/not identical with calendar time/i);
});

test('whole-part return includes both local and whole inquiry recovery',()=>{
  assert.match(NEPTUNE_VULCAN_NARRATIVE.returnPolicy.localReturn,/exact chapter sentence/i);
  assert.match(NEPTUNE_VULCAN_NARRATIVE.returnPolicy.wholeInquiryReturn,/case narrative spine/i);
  assert.match(NEPTUNE_VULCAN_NARRATIVE.returnPolicy.rule,/both exact local return and recovery of the whole inquiry context/i);
});

test('narrative sources support chronology with explicit source identities',()=>{
  const ids=new Set(NEPTUNE_VULCAN_NARRATIVE.sources.map(s=>s.sourceId));
  for(const id of ['NASA-NEPTUNE-HISTORY','NASA-NEPTUNE-FACT','APS-MERCURY-2018','NASA-GR-CENTENNIAL']) assert.ok(ids.has(id));
  for(const m of NEPTUNE_VULCAN_NARRATIVE.milestones) for(const id of m.sourceIds) assert.ok(ids.has(id));
});
