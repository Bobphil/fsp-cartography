const test=require('node:test');
const assert=require('node:assert/strict');
const {
  CH5_INSERTION_ANCHOR,
  CH5_PILOT,
  validateChapter5Pilot
}=require('../../dist/research/fspHoiPressbooksPilotA.js');

test('Chapter 5 pilot validates',()=>{
  const r=validateChapter5Pilot();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('Chapter 5 pilot uses exact locked-manuscript seam',()=>{
  assert.match(CH5_INSERTION_ANCHOR,/Part I asked how philosophical examination/);
  assert.match(CH5_INSERTION_ANCHOR,/whether inherited methods and authorities must themselves be rebuilt\.$/);
  assert.match(CH5_PILOT.insertionRule,/before the horizontal rule/);
});

test('Chapter 5 patch includes all pilot-risk surfaces',()=>{
  assert.match(CH5_PILOT.patchHtml,/Where this chapter fits/);
  assert.match(CH5_PILOT.patchHtml,/Later reopening/);
  assert.match(CH5_PILOT.patchHtml,/GALILEO-COPERNICAN/);
  assert.match(CH5_PILOT.patchHtml,/#node=ch05&tab=inquire/);
});

test('Chapter 5 rollback is marker-bounded and original prose preserving',()=>{
  assert.match(CH5_PILOT.rollbackRule,/ch05:START/);
  assert.match(CH5_PILOT.rollbackRule,/ch05:END/);
  assert.match(CH5_PILOT.rollbackRule,/original Chapter 5 content untouched/);
});

test('Chapter 5 acceptance checks protect current Pressbooks functionality',()=>{
  const joined=CH5_PILOT.acceptanceChecks.join(' ');
  assert.match(joined,/Table of Contents/);
  assert.match(joined,/Previous\/next/);
  assert.match(joined,/citations and footnotes/);
  assert.match(joined,/mobile/);
  assert.match(joined,/print\/PDF export/);
});
