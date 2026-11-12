const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  FIELD3_HORIZON_RADIUS,
  FIELD3_VIEWBOX_HALF_WIDTH,
  FIELD3_HORIZON_MARKER_RADIUS,
  compressContingencies,
  horizonTraceGeometry,
  horizonMarkerInsideViewport,
  minimumModeForDepth,
  reenterPinnedHorizon,
  retainedHorizonPaths,
  validateField3Geometry
}=require('../../dist/research/maathaiField3Experience.js');

const {
  INITIAL_FIELD2_STATE,
  pinPath,
  setTemporalMode
}=require('../../dist/research/maathaiField2Experience.js');

const {
  MAATHAI_FIELD_3_HORIZON_REVIEW,
  validateField3HorizonReview
}=require('../../dist/research/fspVrField3HorizonReview.js');

const root=path.join(__dirname,'../..');
const proto=path.join(root,'prototypes/maathai-field-3');

test('FIELD-3 dual-scale geometry passes retained-horizon invariants',()=>{
  const r=validateField3Geometry();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('retained marker is guaranteed inside perceptual field',()=>{
  assert.equal(FIELD3_HORIZON_RADIUS,385);
  assert.equal(FIELD3_HORIZON_MARKER_RADIUS,24);
  assert.equal(FIELD3_VIEWBOX_HALF_WIDTH,560);
  assert.equal(horizonMarkerInsideViewport(),true);
  assert.ok(FIELD3_HORIZON_RADIUS+FIELD3_HORIZON_MARKER_RADIUS<FIELD3_VIEWBOX_HALF_WIDTH);
});

test('advocacy contingency chain compresses to decisive representative checkpoints',()=>{
  const c=compressContingencies('P-ADVOCATE');
  assert.ok(c.length>=3&&c.length<=4);
  assert.ok(c.some(x=>x.status==='PRESENT'));
  assert.ok(c.some(x=>x.status==='ABSENT'));
  assert.ok(c.some(x=>x.status==='UNKNOWN'));
});

test('horizon trace preserves original depth while using bounded marker geometry',()=>{
  const g=horizonTraceGeometry('P-ADVOCATE',0.5);
  assert.equal(g.originalTemporalDepth,4);
  assert.equal(g.markerRadius,FIELD3_HORIZON_RADIUS);
  assert.ok(Math.hypot(g.markerX,g.markerY)<=FIELD3_HORIZON_RADIUS+1e-9);
});

test('Freeze converts pinned distant path into retained-horizon membership',()=>{
  let s=INITIAL_FIELD2_STATE;
  s=pinPath(s,'P-ADVOCATE');
  s=setTemporalMode(s,'FREEZE');
  const retained=retainedHorizonPaths(s);
  assert.equal(retained.length,1);
  assert.equal(retained[0].pathId,'P-ADVOCATE');
});

test('selecting retained depth-4 future re-enters Accelerate without losing pin',()=>{
  let s=INITIAL_FIELD2_STATE;
  s=pinPath(s,'P-ADVOCATE');
  s=setTemporalMode(s,'FREEZE');
  const next=reenterPinnedHorizon(s,'P-ADVOCATE');
  assert.equal(next.temporalMode,'ACCELERATE');
  assert.ok(next.pinnedPathIds.includes('P-ADVOCATE'));
  assert.equal(next.selectedPathId,'P-ADVOCATE');
  assert.equal(minimumModeForDepth(4),'ACCELERATE');
});

test('FIELD-3 renderer uses separate present and horizon layers',()=>{
  const html=fs.readFileSync(path.join(proto,'index.html'),'utf8');
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.match(html,/present-root/);
  assert.match(html,/horizon-root/);
  assert.match(html,/retained future horizon/);
  assert.match(app,/renderHorizon/);
  assert.match(app,/HORIZON_R=385/);
  assert.match(app,/beyond current reach/);
});

test('out-of-range pinned path is suppressed in present layer and redrawn as horizon tether',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.match(app,/ref\.g\.style\.opacity=inRange\?"1":"\.04"/);
  assert.match(app,/horizon-tether/);
  assert.match(app,/state\.pinnedPathIds\.filter\(function\(id\)\{return !visible\(id\)\}\)/);
});

test('horizon marker supports re-entry instead of passive graph persistence',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.match(app,/function reenter\(id\)/);
  assert.match(app,/state\.temporalMode=minimumMode\(id\)/);
  assert.match(app,/g\.onclick=function\(\)\{reenter\(id\)\}/);
});

test('FIELD-3 horizon-retention review reaches threshold',()=>{
  const r=validateField3HorizonReview();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.equal(MAATHAI_FIELD_3_HORIZON_REVIEW.total,16);
  assert.equal(MAATHAI_FIELD_3_HORIZON_REVIEW.classification,'HORIZON_RETAINING');
  assert.equal(MAATHAI_FIELD_3_HORIZON_REVIEW.passes,true);
});

test('FIELD-3 remains non-deployed and deterministic',()=>{
  assert.equal(proto.includes(path.join('site',path.sep)),false);
  const html=fs.readFileSync(path.join(proto,'index.html'),'utf8');
  const script=fs.readFileSync(path.join(root,'scripts/build-maathai-field3-prototype.cjs'),'utf8');
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  assert.match(html,/NON-DEPLOYED FIELD-3/);
  assert.match(script,/MAATHAI_1976_VISUAL_FIELD/);
  assert.match(script,/MAATHAI_1976_FIELD_PROJECTION/);
  assert.equal(pkg.scripts['prototype:maathai-field3'],'npm run build && node scripts/build-maathai-field3-prototype.cjs');
});
