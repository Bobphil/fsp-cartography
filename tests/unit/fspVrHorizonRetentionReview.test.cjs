const test=require('node:test');
const assert=require('node:assert/strict');

const {
  MAATHAI_FIELD_2_HORIZON_REVIEW,
  HORIZON_RETENTION_THRESHOLD,
  validateHorizonRetentionReview,
  horizonRetentionGaps,
  frozenEndpointRadius,
  isFrozenEndpointClipped
}=require('../../dist/research/fspVrHorizonRetentionReview.js');

test('FIELD-2 horizon-retention review is internally consistent and intentionally fails',()=>{
  const r=validateHorizonRetentionReview();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.equal(MAATHAI_FIELD_2_HORIZON_REVIEW.total,8);
  assert.equal(MAATHAI_FIELD_2_HORIZON_REVIEW.maximum,16);
  assert.equal(MAATHAI_FIELD_2_HORIZON_REVIEW.passes,false);
  assert.equal(MAATHAI_FIELD_2_HORIZON_REVIEW.classification,'WEAK_HORIZON_RETENTION');
});

test('fixed review sequence is Accelerate inspect expand gate pin Freeze',()=>{
  assert.deepEqual(MAATHAI_FIELD_2_HORIZON_REVIEW.sequence,[
    'NORMAL','ACCELERATE','INSPECT:P-ADVOCATE','EXPAND_GATE:P-ADVOCATE','PIN:P-ADVOCATE','FREEZE'
  ]);
});

test('Freeze can geometrically clip the depth-4 advocacy endpoint',()=>{
  assert.equal(frozenEndpointRadius(),576.2);
  assert.equal(isFrozenEndpointClipped(),true);
});

test('perceptual-field criterion fails despite renderer-state persistence',()=>{
  const score=MAATHAI_FIELD_2_HORIZON_REVIEW.scores.find(s=>s.criterion==='INSIDE_PERCEPTUAL_FIELD');
  assert.equal(score.score,0);
  assert.match(score.finding,/clipped/i);
});

test('retained contingency is only partially legible because it is not compressed into the frozen horizon',()=>{
  const score=MAATHAI_FIELD_2_HORIZON_REVIEW.scores.find(s=>s.criterion==='CONDITIONALLY_LEGIBLE');
  assert.equal(score.score,1);
  assert.match(score.finding,/does not compress/i);
});

test('non-prediction firewall remains fully preserved',()=>{
  const score=MAATHAI_FIELD_2_HORIZON_REVIEW.scores.find(s=>s.criterion==='NON_PREDICTIVE');
  assert.equal(score.score,2);
});

test('horizon-retention threshold requires spatial legibility and in-view retention',()=>{
  assert.equal(HORIZON_RETENTION_THRESHOLD.minimumTotal,12);
  assert.equal(HORIZON_RETENTION_THRESHOLD.requiredMinimums.CONDITIONALLY_LEGIBLE,2);
  assert.equal(HORIZON_RETENTION_THRESHOLD.requiredMinimums.INSIDE_PERCEPTUAL_FIELD,2);
  assert.equal(HORIZON_RETENTION_THRESHOLD.requiredMinimums.DISTINCT_FROM_CURRENT_REACHABILITY,2);
});

test('gap analysis routes directly to FIELD-3 geometry work',()=>{
  const gaps=horizonRetentionGaps();
  assert.ok(gaps.some(g=>g.criterion==='INSIDE_PERCEPTUAL_FIELD'&&g.gap===2));
  assert.ok(gaps.some(g=>g.criterion==='CONDITIONALLY_LEGIBLE'));
  assert.ok(gaps.some(g=>g.criterion==='DISTINCT_FROM_CURRENT_REACHABILITY'));
  assert.equal(MAATHAI_FIELD_2_HORIZON_REVIEW.nextBuild,'FSP-VR-MAATHAI-FIELD-3');
});
