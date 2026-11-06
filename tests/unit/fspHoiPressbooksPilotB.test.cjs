const test=require('node:test');
const assert=require('node:assert/strict');
const {
  CH4_INSERTION_ANCHOR,
  BRIDGE_C_INSERTION_ANCHOR,
  CH4_BRIDGE_C_PILOT,
  validateChapter4BridgeCPilot
}=require('../../dist/research/fspHoiPressbooksPilotB.js');

test('Chapter 4 / Bridge C pilot validates',()=>{
  const r=validateChapter4BridgeCPilot();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('Chapter 4 pilot uses locked opening seam',()=>{
  assert.match(CH4_INSERTION_ANCHOR,/both faith and reason, and later for law\.$/);
  assert.match(CH4_BRIDGE_C_PILOT.chapterInsertionRule,/Augustine: inquiry after certainty has become a problem/);
});

test('Bridge C pilot uses embedded seam and blocks duplicate page creation',()=>{
  assert.match(BRIDGE_C_INSERTION_ANCHOR,/continuity of transmission does not imply identity of meaning/);
  assert.match(CH4_BRIDGE_C_PILOT.bridgeInsertionRule,/A book cannot influence a later thinker if nobody can read it/);
  assert.match(CH4_BRIDGE_C_PILOT.bridgeInsertionRule,/Do not create a second Pressbooks page/);
});

test('Chapter 4 and Bridge C remain same-page resources',()=>{
  assert.equal(CH4_BRIDGE_C_PILOT.pressbooksUrl,'https://pressbooks.pub/whatmaywecarryforward/chapter/reason-inside-an-inherited-world/');
});

test('both patches are independently marker-bounded',()=>{
  assert.match(CH4_BRIDGE_C_PILOT.chapterPatchHtml,/ch04:START/);
  assert.match(CH4_BRIDGE_C_PILOT.chapterPatchHtml,/ch04:END/);
  assert.match(CH4_BRIDGE_C_PILOT.bridgePatchHtml,/intC:START/);
  assert.match(CH4_BRIDGE_C_PILOT.bridgePatchHtml,/intC:END/);
});

test('Bridge C keeps its documented-transmission semantics',()=>{
  assert.match(CH4_BRIDGE_C_PILOT.bridgePatchHtml,/documented transmission and transformation/i);
  assert.match(CH4_BRIDGE_C_PILOT.bridgePatchHtml,/not merely a pedagogical comparison/i);
});

test('pilot acceptance checks protect shared-page functionality',()=>{
  const joined=CH4_BRIDGE_C_PILOT.acceptanceChecks.join(' ');
  assert.match(joined,/share exactly one Pressbooks URL/);
  assert.match(joined,/Previous\/next/);
  assert.match(joined,/citations and footnotes/);
  assert.match(joined,/print\/PDF export/);
  assert.match(joined,/mobile/i);
});

test('rollback cannot remove original Bridge C',()=>{
  assert.match(CH4_BRIDGE_C_PILOT.rollbackRule,/Never delete, move, or duplicate the original Bridge C text/);
});
