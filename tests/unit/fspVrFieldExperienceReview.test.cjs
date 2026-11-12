const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  MAATHAI_FIELD_1_EXPERIENCE_REVIEW,
  FIELD_LIKE_THRESHOLD,
  validateFieldExperienceReview,
  fieldExperienceGap
}=require('../../dist/research/fspVrFieldExperienceReview.js');

const root=path.join(__dirname,'../..');

test('field experience review is internally consistent and intentionally fails field-like threshold',()=>{
  const r=validateFieldExperienceReview();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.equal(MAATHAI_FIELD_1_EXPERIENCE_REVIEW.total,5);
  assert.equal(MAATHAI_FIELD_1_EXPERIENCE_REVIEW.maximum,16);
  assert.equal(MAATHAI_FIELD_1_EXPERIENCE_REVIEW.passesFieldThreshold,false);
  assert.equal(MAATHAI_FIELD_1_EXPERIENCE_REVIEW.classification,'EARLY_FIELD');
});

test('continuous temporal expansion remains the largest experiential deficit',()=>{
  const score=MAATHAI_FIELD_1_EXPERIENCE_REVIEW.scores.find(s=>s.criterion==='CONTINUOUS_TEMPORAL_EXPANSION');
  assert.equal(score.score,0);
  assert.match(score.finding,/visibility filters/i);
});

test('near-field decomposition is only partial because Freeze does not spatially deepen the local field',()=>{
  const score=MAATHAI_FIELD_1_EXPERIENCE_REVIEW.scores.find(s=>s.criterion==='NEAR_FIELD_DECOMPOSITION');
  assert.equal(score.score,1);
  assert.match(score.finding,/does not yet spatially deepen/i);
});

test('contingency and gates remain more representational than spatial',()=>{
  const contingency=MAATHAI_FIELD_1_EXPERIENCE_REVIEW.scores.find(s=>s.criterion==='CONTINGENCY_GROWTH');
  const gate=MAATHAI_FIELD_1_EXPERIENCE_REVIEW.scores.find(s=>s.criterion==='GATE_AS_THRESHOLD');
  assert.equal(contingency.score,1);
  assert.equal(gate.score,1);
  assert.ok(contingency.evidence.some(x=>/side panel/i.test(x)));
  assert.ok(gate.evidence.some(x=>/do not yet interrupt or branch/i.test(x)));
});

test('prototype currently lacks persistent trace and situated multi-path comparison',()=>{
  const trace=MAATHAI_FIELD_1_EXPERIENCE_REVIEW.scores.find(s=>s.criterion==='PERSISTENCE_TRACE');
  const comparison=MAATHAI_FIELD_1_EXPERIENCE_REVIEW.scores.find(s=>s.criterion==='SITUATED_COMPARISON');
  assert.equal(trace.score,0);
  assert.equal(comparison.score,0);
});

test('field-like threshold is deliberately demanding',()=>{
  assert.equal(FIELD_LIKE_THRESHOLD.minimumTotal,12);
  assert.equal(FIELD_LIKE_THRESHOLD.requiredMinimums.CONTINUOUS_TEMPORAL_EXPANSION,2);
  assert.equal(FIELD_LIKE_THRESHOLD.requiredMinimums.NEAR_FIELD_DECOMPOSITION,2);
  assert.equal(FIELD_LIKE_THRESHOLD.requiredMinimums.CONTINGENCY_GROWTH,2);
  assert.equal(FIELD_LIKE_THRESHOLD.requiredMinimums.GATE_AS_THRESHOLD,2);
});

test('gap analysis points directly toward FIELD-2 experience work',()=>{
  const gaps=fieldExperienceGap();
  assert.ok(gaps.some(g=>g.criterion==='CONTINUOUS_TEMPORAL_EXPANSION'&&g.gap===2));
  assert.ok(gaps.some(g=>g.criterion==='PERSISTENCE_TRACE'));
  assert.ok(gaps.some(g=>g.criterion==='SITUATED_COMPARISON'));
  assert.equal(MAATHAI_FIELD_1_EXPERIENCE_REVIEW.nextBuild,'FSP-VR-MAATHAI-FIELD-2');
});

test('current renderer confirms the diagram-like behaviors identified in the review',()=>{
  const app=fs.readFileSync(path.join(root,'prototypes/maathai-field-1/app.js'),'utf8');
  assert.match(app,/opacity:active\?1:\.14/);
  assert.match(app,/pointer-events/);
  assert.match(app,/var selected=null/);
  assert.doesNotMatch(app,/pinnedPaths/);
  assert.doesNotMatch(app,/traceHistory/);
});
