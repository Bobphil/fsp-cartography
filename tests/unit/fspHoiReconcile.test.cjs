const test=require('node:test');
const assert=require('node:assert/strict');
const {
  HOI_RECONCILE_PLAN,
  HOI_CHAPTERS,
  HOI_MODES,
  HOI_NO_FSP_COURSE,
  chapterReconciliation,
  validateHoiReconciliation,
  noFspCourseAudit
}=require('../../dist/research/fspHoiReconcile.js');

test('HOI reconciliation validates against locked fourteen-chapter architecture',()=>{
  const r=validateHoiReconciliation();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.equal(HOI_CHAPTERS.length,14);
});

test('historical developmental spine is preserved exactly',()=>{
  assert.deepEqual(HOI_RECONCILE_PLAN.globalSpine,[
    'inherited world','live problem','situated inquiry','public artifact',
    'uptake and contest','sediment','changed later task','reopening'
  ]);
});

test('every chapter has whole-inquiry recovery and disciplinary development',()=>{
  for(const c of HOI_CHAPTERS){
    assert.ok(c.disciplinaryQuestion.length>30,c.nodeId);
    assert.ok(c.developmentalMove.length>20,c.nodeId);
    for(const key of ['inheritedWorld','liveProblem','situatedInquiry','publicArtifact','uptakeAndContest','sediment','changedLaterTask','reopening']){
      assert.ok(c.wholeInquiryRecovery[key].length>20,`${c.nodeId}:${key}`);
    }
  }
});

test('No-FSP-Course regression passes',()=>{
  const r=noFspCourseAudit();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.match(HOI_NO_FSP_COURSE.studentPrerequisite,/No prior FSP knowledge/);
  assert.match(HOI_NO_FSP_COURSE.successCriterion,/without defining FSP/);
});

test('formal ecosystem machinery is prohibited as student prerequisite',()=>{
  for(const term of ['FSP state vector','relation graph','canonical fingerprint','projection profile','reducer','invariant suite']){
    assert.ok(HOI_NO_FSP_COURSE.forbiddenPrerequisiteTerms.includes(term),term);
  }
});

test('student-facing compression stays ordinary-language and discipline-facing',()=>{
  const joined=HOI_CHAPTERS.flatMap(c=>c.studentFacingCompression).join(' ');
  assert.doesNotMatch(joined,/canonical fingerprint|projection profile|state vector|reducer/i);
  assert.match(joined,/What has|carry|reopening|map|history|inquiry/i);
});

test('three page modes remain distinct and cannot collapse into one worksheet',()=>{
  assert.deepEqual(HOI_MODES.map(m=>m.mode),['HISTORICAL_CHAPTER','HISTORICAL_INTERVENTION','CONTEMPORARY_LAB']);
  for(const m of HOI_MODES) assert.ok(m.prohibitedCollapse.length>30);
  assert.match(HOI_MODES[0].prohibitedCollapse,/one FSP worksheet/i);
  assert.match(HOI_MODES[2].prohibitedCollapse,/precursors/i);
});

test('chapter 4 preserves typed historical transmission rather than comparison-as-genealogy',()=>{
  const c=chapterReconciliation(4);
  assert.match(c.temporalAnchor,/documented historical transmission arrow/i);
  assert.ok(c.preserve.includes('Historical Bridge C'));
});

test('chapter 5 links Galileo as optional early-modern depth not prerequisite',()=>{
  const c=chapterReconciliation(5);
  const g=c.encyclopediaLinks.find(x=>x.href==='#/narrative/GALILEO-COPERNICAN');
  assert.ok(g);
  assert.equal(g.required,false);
});

test('chapter 8 preserves Hume while later science remains a reopening',()=>{
  const c=chapterReconciliation(8);
  assert.match(c.temporalAnchor,/Later reopening/);
  assert.match(c.noFspRequirement,/Hume/);
  assert.ok(c.encyclopediaLinks.some(x=>x.href==='#/narrative/NEPTUNE-VULCAN'));
});

test('chapter 12 pragmatism is not rewritten as secret destination of contemporary labs',()=>{
  const c=chapterReconciliation(12);
  assert.match(c.temporalAnchor,/not the destination/i);
  assert.ok(c.preserve.includes('all-laboratory Later reopening'));
});

test('chapter 14 remains hinge rather than meta-laboratory or FSP introduction',()=>{
  const c=chapterReconciliation(14);
  assert.ok(c.preserve.includes('hinge role'));
  assert.ok(c.preserve.includes('not a meta-laboratory'));
  assert.match(c.noFspRequirement,/without learning formal FSP machinery/i);
});

test('Encyclopedia links are optional by default',()=>{
  const links=HOI_CHAPTERS.flatMap(c=>c.encyclopediaLinks);
  assert.ok(links.length>0);
  assert.equal(links.some(x=>x.required),false);
});

test('reconciliation governance preserves historical prose first',()=>{
  const g=HOI_RECONCILE_PLAN.governance.join(' ');
  assert.match(g,/Historical prose comes first/);
  assert.match(g,/do not globally rewrite Chapters 1–13/i);
  assert.match(g,/Later reopening identifies genuine conceptual reuse/i);
});
