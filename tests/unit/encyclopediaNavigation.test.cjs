const test=require('node:test');
const assert=require('node:assert/strict');

const {
  CHAPTER_SECTIONS,
  NAVIGATION_BINDINGS,
  validateNavigation,
  targetsForSection,
  sectionsForAtlasTarget,
  chapterNavigation,
  navigationCoverage
}=require('../../dist/research/encyclopediaNavigation.js');

const {
  FIVE_CASE_ATLAS
}=require('../../dist/research/fiveCaseAtlasFixtures.js');

test('navigation covers all four canonical chapters',()=>{
  const chapters=new Set(CHAPTER_SECTIONS.map(s=>s.chapterId));
  assert.deepEqual(
    [...chapters].sort(),
    [
      'CH1-DUHEM-QUINE',
      'CH2-KUHN-MEANING',
      'CH3-THOUGHT-EXPERIMENTS',
      'CH4-DIACHRONIC-FORMALISM'
    ].sort()
  );
});

test('every chapter section has a binding',()=>{
  const bound=new Set(NAVIGATION_BINDINGS.map(b=>b.sectionId));
  for(const section of CHAPTER_SECTIONS){
    assert.ok(bound.has(section.sectionId),`unbound section ${section.sectionId}`);
  }
});

test('every binding has at least one target',()=>{
  assert.ok(NAVIGATION_BINDINGS.every(b=>b.targets.length>0));
});

test('all navigation targets resolve against the canonical atlas',()=>{
  const audit=validateNavigation(FIVE_CASE_ATLAS);
  assert.equal(audit.passes,true,audit.failures.join(', '));
});

test('chapter one Neptune/Vulcan section routes to success failure and claim ceiling',()=>{
  const targets=targetsForSection('CH1.2');
  assert.ok(targets.some(t=>t.kind==='TRANSITION' && t.targetId==='NV0-NV1'));
  assert.ok(targets.some(t=>t.kind==='TRANSITION' && t.targetId==='NV1-NV2'));
  assert.ok(targets.some(t=>t.kind==='TRANSITION' && t.targetId==='NV3-NV4'));
  assert.ok(targets.some(t=>t.kind==='CASE_CLAIM_CEILING'));
});

test('Foucault narrative routes include experiment transition probe and source',()=>{
  const targets=targetsForSection('CH1.3');
  assert.ok(targets.some(t=>t.kind==='TRANSITION' && t.targetId==='F0-F1'));
  assert.ok(targets.some(t=>t.kind==='PROBE' && t.targetId==='F-PROBE-1'));
  assert.ok(targets.some(t=>t.kind==='SOURCE' && t.targetId==='FOUCAULT-SEP'));
});

test('Galileo routes include standing/power transition',()=>{
  const targets=targetsForSection('CH1.4');
  assert.ok(targets.some(t=>t.targetId==='G1-G2'));
  assert.ok(targets.some(t=>t.targetId==='G2-G3'));
});

test('DESI routes preserve full 2024 to 2026 diachronic sequence',()=>{
  const targets=targetsForSection('CH4.9');
  assert.ok(targets.some(t=>t.kind==='STATE' && t.targetId==='D0'));
  assert.ok(targets.some(t=>t.kind==='STATE' && t.targetId==='D1'));
  assert.ok(targets.some(t=>t.kind==='STATE' && t.targetId==='D2'));
});

test('thought-experiment chapter routes primarily to controlled probes',()=>{
  const chapter=chapterNavigation('CH3-THOUGHT-EXPERIMENTS');
  const kinds=chapter.flatMap(x=>x.targets.map(t=>t.kind));
  assert.ok(kinds.filter(k=>k==='PROBE').length>=8);
});

test('chapter four claim-ceiling section routes to all five case ceilings',()=>{
  const targets=targetsForSection('CH4.11');
  assert.equal(targets.filter(t=>t.kind==='CASE_CLAIM_CEILING').length,5);
  assert.equal(new Set(targets.map(t=>t.caseId)).size,5);
});

test('reverse navigation finds chapter uses for a canonical transition',()=>{
  const hits=sectionsForAtlasTarget('NEWTON-EINSTEIN','TRANSITION','RE0-RE1');
  assert.ok(hits.length>=3);
  assert.ok(hits.some(h=>h.chapterId==='CH2-KUHN-MEANING'));
  assert.ok(hits.some(h=>h.chapterId==='CH4-DIACHRONIC-FORMALISM'));
});

test('reverse navigation finds DESI D1-D2 narrative uses',()=>{
  const hits=sectionsForAtlasTarget('DESI-2024-2026','TRANSITION','D1-D2');
  assert.ok(hits.some(h=>h.sectionId==='CH1.5'));
  assert.ok(hits.some(h=>h.sectionId==='CH4.2'));
  assert.ok(hits.some(h=>h.sectionId==='CH4.5'));
});

test('chapter navigation returns sections in canonical source order',()=>{
  const ch1=chapterNavigation('CH1-DUHEM-QUINE');
  assert.deepEqual(ch1.map(x=>x.section.sectionId),['CH1.1','CH1.2','CH1.3','CH1.4','CH1.5']);
});

test('coverage reports all sections as bound',()=>{
  const c=navigationCoverage();
  assert.equal(c.chapterCount,4);
  assert.equal(c.sectionCount,c.boundSectionCount);
  assert.ok(c.targetCount>c.sectionCount);
  assert.ok(c.reverseNavigableTargetCount>20);
});

test('invalid state target is detected',()=>{
  const original=NAVIGATION_BINDINGS[0].targets[0].targetId;
  NAVIGATION_BINDINGS[0].targets[0].targetId='DOES-NOT-EXIST';
  const audit=validateNavigation(FIVE_CASE_ATLAS);
  NAVIGATION_BINDINGS[0].targets[0].targetId=original;
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.some(x=>x.includes('missing-state')));
});

test('unknown case target is detected',()=>{
  const original=NAVIGATION_BINDINGS[0].targets[0].caseId;
  NAVIGATION_BINDINGS[0].targets[0].caseId='UNKNOWN-CASE';
  const audit=validateNavigation(FIVE_CASE_ATLAS);
  NAVIGATION_BINDINGS[0].targets[0].caseId=original;
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.some(x=>x.includes('unknown-case')));
});
