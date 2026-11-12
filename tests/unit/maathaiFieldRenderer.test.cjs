const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  MAATHAI_1976_FIELD_PROJECTION,
  temporalProjectionForPath,
  gateDecomposition,
  temporalLensProfile,
  visiblePathsForTemporalMode,
  contingencyBurden,
  radialPosition,
  validateMaathaiFieldProjection
}=require('../../dist/research/maathaiFieldRenderer.js');

const root=path.join(__dirname,'../..');

test('Maathai field renderer projection passes temporal and gate invariants',()=>{
  const r=validateMaathaiFieldProjection();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('temporal distance spans immediate through structurally distant possibilities',()=>{
  const depths=MAATHAI_1976_FIELD_PROJECTION.pathProjection.map(p=>p.temporalDepth);
  assert.ok(depths.includes(1));
  assert.ok(depths.includes(2));
  assert.ok(depths.includes(3));
  assert.ok(depths.includes(4));
});

test('near paths require fewer structural changes than distant advocacy path',()=>{
  const research=temporalProjectionForPath('P-RESEARCH');
  const advocacy=temporalProjectionForPath('P-ADVOCATE');
  assert.ok(research.temporalDepth<advocacy.temporalDepth);
  assert.ok(advocacy.requirements.some(r=>r.status==='ABSENT'));
  assert.ok(advocacy.requirements.some(r=>r.status==='UNKNOWN'));
});

test('gate decomposition distinguishes present partial absent and unknown conditions',()=>{
  const d=gateDecomposition('P-ADVOCATE');
  assert.ok(d.present.length>0);
  assert.ok(d.partial.length>0);
  assert.ok(d.absent.length>0);
  assert.ok(d.unknown.length>0);
  assert.ok(d.absent.some(r=>r.kind==='AUTHORITY'));
});

test('radial geometry moves possibilities outward with temporal depth',()=>{
  const a=radialPosition('P-RESEARCH',0,1);
  const b=radialPosition('P-ADVOCATE',0,1);
  assert.ok(b.radius>a.radius);
});

test('temporal lens expands horizon in ordered Freeze Slow Normal Accelerate modes',()=>{
  assert.equal(temporalLensProfile('FREEZE').maxDepth,1);
  assert.equal(temporalLensProfile('SLOW').maxDepth,2);
  assert.equal(temporalLensProfile('NORMAL').maxDepth,3);
  assert.equal(temporalLensProfile('ACCELERATE').maxDepth,4);
  assert.ok(visiblePathsForTemporalMode('FREEZE').every(p=>p.temporalDepth===1));
  assert.ok(visiblePathsForTemporalMode('SLOW').some(p=>p.temporalDepth===2));
  assert.ok(!visiblePathsForTemporalMode('SLOW').some(p=>p.temporalDepth===3));
  assert.ok(visiblePathsForTemporalMode('ACCELERATE').some(p=>p.pathId==='P-ADVOCATE'));
});

test('distant possibilities expose larger unresolved contingency stacks without becoming probabilities',()=>{
  const near=contingencyBurden('P-RESEARCH');
  const distant=contingencyBurden('P-ADVOCATE');
  assert.ok(distant.unresolvedCount>near.unresolvedCount);
  assert.ok(distant.burden>near.burden);
  assert.ok(distant.unresolved.some(r=>r.status==='ABSENT'));
  assert.ok(distant.unresolved.some(r=>r.status==='UNKNOWN'));
});

test('non-deployed SVG prototype exists outside site tree',()=>{
  const dir=path.join(root,'prototypes/maathai-field-1');
  assert.equal(dir.includes(path.join('site',path.sep)),false);
  const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
  const app=fs.readFileSync(path.join(dir,'app.js'),'utf8');
  assert.match(html,/NON-DEPLOYED/);
  assert.match(html,/Distance means more must change first/);
  assert.match(html,/Freeze/);
  assert.match(html,/Slow/);
  assert.match(html,/Accelerate/);
  assert.match(app,/window\.FSP_MAATHAI_FIELD_1/);
  assert.match(app,/What is already present \/ still needed/);
  assert.match(app,/visibleByTime/);
  assert.match(app,/Contingency stack/);
});

test('renderer offers gate decomposition provenance remainder scaffold fading and Return',()=>{
  const app=fs.readFileSync(path.join(root,'prototypes/maathai-field-1/app.js'),'utf8');
  const html=fs.readFileSync(path.join(root,'prototypes/maathai-field-1/index.html'),'utf8');
  assert.match(app,/What must become present before this path can open further/);
  assert.match(html,/Provenance/);
  assert.match(app,/selectRemainder/);
  assert.match(html,/Scaffold 3/);
  assert.match(html,/There is no single correct takeaway/);
});

test('build script derives data from compiled visual scene and renderer projection',()=>{
  const script=fs.readFileSync(path.join(root,'scripts/build-maathai-field-prototype.cjs'),'utf8');
  assert.match(script,/MAATHAI_1976_VISUAL_FIELD/);
  assert.match(script,/MAATHAI_1976_FIELD_PROJECTION/);
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  assert.equal(pkg.scripts['prototype:maathai-field'],'npm run build && node scripts/build-maathai-field-prototype.cjs');
});
