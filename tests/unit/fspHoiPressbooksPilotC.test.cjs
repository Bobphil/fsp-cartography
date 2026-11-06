const test=require('node:test');
const assert=require('node:assert/strict');
const {
  CH8_INSERTION_ANCHOR,
  CH8_PILOT,
  validateChapter8Pilot
}=require('../../dist/research/fspHoiPressbooksPilotC.js');

test('Chapter 8 pilot validates',()=>{
  const r=validateChapter8Pilot();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('Chapter 8 pilot uses exact locked opening seam',()=>{
  assert.match(CH8_INSERTION_ANCHOR,/causal inference, induction, necessary connection, personal identity, and morality/);
  assert.match(CH8_INSERTION_ANCHOR,/parts of the machinery by which human inquiry continues\.$/);
  assert.match(CH8_PILOT.insertionRule,/1\. The task inherited from Locke and Berkeley/);
});

test('Chapter 8 patch carries both optional Encyclopedia links',()=>{
  assert.equal(CH8_PILOT.expectedOptionalLinks.length,2);
  assert.match(CH8_PILOT.patchHtml,/NEPTUNE-VULCAN/);
  assert.match(CH8_PILOT.patchHtml,/DESI-2024-2026/);
  assert.match(CH8_PILOT.patchHtml,/You do not need these links to complete the chapter/);
});

test('Chapter 8 strong Later Reopening blocks retrospective teleology',()=>{
  assert.match(CH8_PILOT.patchHtml,/Later reopening/);
  assert.match(CH8_PILOT.patchHtml,/not a claim that the historical thinker anticipated or predicted the later inquiry/i);
  assert.match(CH8_PILOT.patchHtml,/Hume/);
});

test('Chapter 8 SUPER link is present in escaped HTML form',()=>{
  assert.match(CH8_PILOT.patchHtml,/#node=ch08&amp;tab=inquire/);
});

test('Chapter 8 rollback is marker-bounded and preserves original Hume content',()=>{
  assert.match(CH8_PILOT.rollbackRule,/ch08:START/);
  assert.match(CH8_PILOT.rollbackRule,/ch08:END/);
  assert.match(CH8_PILOT.rollbackRule,/Leave the full original Hume chapter/);
});

test('Chapter 8 acceptance checks protect current Pressbooks functionality',()=>{
  const joined=CH8_PILOT.acceptanceChecks.join(' ');
  assert.match(joined,/Table of Contents/);
  assert.match(joined,/Previous\/next/);
  assert.match(joined,/citations and footnotes/);
  assert.match(joined,/mobile/i);
  assert.match(joined,/print\/PDF export/);
  assert.match(joined,/explicitly optional/);
});

test('Chapter 8 optional links have distinct roles',()=>{
  const roles=CH8_PILOT.expectedOptionalLinks.map(x=>x.role);
  assert.equal(new Set(roles).size,2);
  assert.match(roles[0],/prediction, revision pressure, and bounded inference/i);
  assert.match(roles[1],/live frontier/i);
});
