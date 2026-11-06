const test=require('node:test');
const assert=require('node:assert/strict');
const {
  NEWTON_EINSTEIN_NARRATIVE,
  GALILEO_NARRATIVE,
  NEPTUNE_VULCAN_NARRATIVE,
  narrativeForCase,
  apertureForChapter,
  milestoneForState,
  recoverInquiryContext,
  validateInquiryNarrative
}=require('../../dist/research/fspInquiryNarrative.js');

test('Newton-Einstein narrative spine validates against the common contract',()=>{
  const r=validateInquiryNarrative(NEWTON_EINSTEIN_NARRATIVE);
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('three certified spines instantiate different inquiry topologies',()=>{
  assert.equal(new Set([
    NEPTUNE_VULCAN_NARRATIVE.caseId,
    GALILEO_NARRATIVE.caseId,
    NEWTON_EINSTEIN_NARRATIVE.caseId
  ]).size,3);
  assert.notDeepEqual(NEWTON_EINSTEIN_NARRATIVE.milestones,GALILEO_NARRATIVE.milestones);
  assert.notDeepEqual(NEWTON_EINSTEIN_NARRATIVE.milestones,NEPTUNE_VULCAN_NARRATIVE.milestones);
});

test('Newton-Einstein whole story preserves conceptual discontinuity and bounded empirical continuity',()=>{
  const whole=NEWTON_EINSTEIN_NARRATIVE.narrativeParagraphs.join(' ');
  assert.match(whole,/inferential roles changed/i);
  assert.match(whole,/Newtonian calculations remain extraordinarily accurate and useful/i);
  assert.match(whole,/not therefore sealed into incomparable worlds/i);
});

test('Newton-Einstein chronology anchors 1905, 1907-1911, 1915, and 1919+',()=>{
  assert.ok(NEWTON_EINSTEIN_NARRATIVE.milestones.some(m=>m.start==='1905'));
  assert.ok(NEWTON_EINSTEIN_NARRATIVE.milestones.some(m=>m.start==='1907' && m.end==='1911'));
  assert.ok(NEWTON_EINSTEIN_NARRATIVE.milestones.some(m=>m.start==='1915'));
  assert.ok(NEWTON_EINSTEIN_NARRATIVE.milestones.some(m=>m.start==='1919'));
});

test('RE1 temporal recovery anchors special relativity rather than later GR success',()=>{
  const hits=milestoneForState('NEWTON-EINSTEIN','RE1');
  assert.ok(hits.some(m=>m.start==='1905'));
  assert.equal(hits.some(m=>m.start==='1915'),false);
});

test('chapter 2 aperture blocks same-word identity and total incomparability',()=>{
  const a=apertureForChapter('NEWTON-EINSTEIN','CH2-KUHN-MEANING');
  assert.match(a.chapterQuestion,/change theoretical role/i);
  assert.ok(a.whatFspAdds.some(x=>/semantic-version/i.test(x)));
  assert.ok(a.whatFspAdds.some(x=>/total empirical incomparability/i.test(x)));
});

test('chapter 3 aperture makes local equivalence bounded',()=>{
  const a=apertureForChapter('NEWTON-EINSTEIN','CH3-THOUGHT-EXPERIMENTS');
  assert.match(a.currentFocus,/simultaneity and elevator probes/i);
  assert.ok(a.whatFspAdds.some(x=>/locality and tidal remainder/i.test(x)));
});

test('chapter 4 aperture tracks gain loss and preservation separately',()=>{
  const a=apertureForChapter('NEWTON-EINSTEIN','CH4-DIACHRONIC-FORMALISM');
  assert.match(a.currentFocus,/preserved low-velocity, weak-field, and local structures/i);
  assert.ok(a.whatFspAdds.some(x=>/gain\/loss\/preservation separately/i.test(x)));
});

test('Newton-Einstein firewalls preserve conceptual change without theoretical erasure',()=>{
  const f=NEWTON_EINSTEIN_NARRATIVE.firewalls.join(' ');
  assert.match(f,/Later theory ≠ simple deletion of earlier theory/);
  assert.match(f,/Preserved empirical success ≠ unchanged conceptual meaning/);
  assert.match(f,/Conceptual discontinuity ≠ total incomparability/);
  assert.match(f,/Approximation or limiting recovery ≠ global theoretical identity/);
  assert.match(f,/Local equivalence ≠ global ontological identity/);
});

test('Newton-Einstein context recovery returns both change and preservation',()=>{
  const c=recoverInquiryContext({
    caseId:'NEWTON-EINSTEIN',
    chapterId:'CH4-DIACHRONIC-FORMALISM',
    sectionId:'CH4.9',
    stateId:'RE2'
  });
  assert.match(c.wholeProblem,/reorganize space, time, motion, gravity/i);
  assert.match(c.temporalLocation,/1907/);
  assert.match(c.localProblem,/changed meanings|preserved low-velocity/i);
  assert.match(c.fspContribution,/preservation|equivalence|continuity/i);
  assert.equal(c.wholeInquiryHref,'#/narrative/NEWTON-EINSTEIN');
});

test('narrative registry supports three certified narrative spines',()=>{
  assert.equal(narrativeForCase('NEPTUNE-VULCAN').caseId,'NEPTUNE-VULCAN');
  assert.equal(narrativeForCase('GALILEO-COPERNICAN').caseId,'GALILEO-COPERNICAN');
  assert.equal(narrativeForCase('NEWTON-EINSTEIN').caseId,'NEWTON-EINSTEIN');
});
