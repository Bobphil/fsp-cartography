const test=require('node:test');
const assert=require('node:assert/strict');
const {PUBLIC_ARCHITECTURE}=require('../../dist/research/encyclopediaPublicArchitecture.js');
const {routeFromHash}=require('../../dist/research/encyclopediaPublicShell.js');

test('public shell architecture has five primary index entrances',()=>{
  assert.deepEqual(PUBLIC_ARCHITECTURE.home.primaryEntrances,['CHAPTER','CASE','CONCEPT','TOOL','COMPARISON']);
});

test('only Neptune/Vulcan is currently designated as the complete public vertical slice',()=>{
  const nv=PUBLIC_ARCHITECTURE.cases.find(x=>x.caseId==='NEPTUNE-VULCAN');
  assert.ok(nv);
  assert.ok(nv.chapterIds.includes('CH1-DUHEM-QUINE'));
});

test('public chapter index contains CH1.2 as a stable section target',()=>{
  const ch1=PUBLIC_ARCHITECTURE.chapters.find(x=>x.chapterId==='CH1-DUHEM-QUINE');
  assert.ok(ch1.sectionIds.includes('CH1.2'));
});

test('public indexes expose concepts tools and comparisons without state identifiers',()=>{
  for(const item of [...PUBLIC_ARCHITECTURE.concepts,...PUBLIC_ARCHITECTURE.tools,...PUBLIC_ARCHITECTURE.comparisons]){
    assert.equal(Object.prototype.hasOwnProperty.call(item,'stateIds'),false);
    assert.equal(Object.prototype.hasOwnProperty.call(item,'transitionIds'),false);
  }
});

test('public shell content keeps comparison grammar bounded',()=>{
  assert.ok(PUBLIC_ARCHITECTURE.constitutionalRules.includes('Shared comparison grammar does not imply historical sameness.'));
  assert.ok(PUBLIC_ARCHITECTURE.constitutionalRules.includes('No public presentation may exceed the applicable canonical claim ceiling.'));
});

test('governance and research routes are available without changing existing route identities',()=>{
  assert.deepEqual(routeFromHash('#/governance'),{kind:'GOVERNANCE'});
  assert.deepEqual(routeFromHash('#/research'),{kind:'RESEARCH'});
  assert.deepEqual(routeFromHash('#/reader/CH1.2/NEPTUNE-VULCAN'),{kind:'READER',sectionId:'CH1.2',caseId:'NEPTUNE-VULCAN'});
});


test('deployed public reader exposes long-form full-stack orientation and four human apertures',()=>{
  const fs=require('node:fs');
  const path=require('node:path');
  const source=fs.readFileSync(path.join(__dirname,'../../src/research/encyclopediaProd3Browser.ts'),'utf8');
  for(const phrase of [
    'FSP-FULL-STACK-ESSAY',
    'Why We Need a Full-Stack Philosophy',
    'EXPERIENCE → INQUIRE → DECOMPRESS → LEARN → COMPARE → ACT → RETURN',
    'Medicine & Public Health',
    'Science Across Disciplines',
    'Art, Culture & Interpretation',
    'Maathai & Shared Action',
    'COOPERATION ≠ CONVERGENCE',
    'human problem → case → extended critical thinking → translation → cooperation → capability / authorization → consequence → Return → optional formal depth'
  ]) assert.ok(source.includes(phrase),phrase);
});

test('all four full-stack public apertures have deeper routes and Return',()=>{
  const fs=require('node:fs');
  const path=require('node:path');
  const source=fs.readFileSync(path.join(__dirname,'../../src/research/encyclopediaProd3Browser.ts'),'utf8');
  for(const phrase of [
    'FSP-JTS-FLNH',
    'SCI-ATLAS',
    'FSP-AESTHETICS-CULTURAL-APERTURE',
    'FSP-MAATHAI-APERTURE',
    'Return to Full-Stack Essay',
    'Translation Governance',
    'Joint Task Spaces',
    'Open Maathai Lives pilot'
  ]) assert.ok(source.includes(phrase),phrase);
});
