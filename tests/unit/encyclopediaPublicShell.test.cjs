const test=require('node:test');
const assert=require('node:assert/strict');
const {PUBLIC_ARCHITECTURE}=require('../../dist/research/encyclopediaPublicArchitecture.js');

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
