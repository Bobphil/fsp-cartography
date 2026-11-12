const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  FIELD2_MODE_GEOMETRY,
  INITIAL_FIELD2_STATE,
  pinPath,
  selectPathWithTrace,
  setTemporalMode,
  expandGate,
  requirementCheckpoints,
  firstBlockingCheckpoint,
  comparisonRows,
  traceVisibility,
  validateField2Experience
}=require('../../dist/research/maathaiField2Experience.js');

const {
  MAATHAI_FIELD_2_EXPERIENCE_REVIEW,
  validateField2ExperienceReview
}=require('../../dist/research/fspVrField2ExperienceReview.js');

const root=path.join(__dirname,'../..');
const proto=path.join(root,'prototypes/maathai-field-2');

test('FIELD-2 experience model passes geometry and persistence invariants',()=>{
  const r=validateField2Experience();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('Freeze deepens the present while Accelerate widens the field',()=>{
  assert.ok(FIELD2_MODE_GEOMETRY.FREEZE.viewScale>FIELD2_MODE_GEOMETRY.NORMAL.viewScale);
  assert.ok(FIELD2_MODE_GEOMETRY.FREEZE.nearFieldScale>FIELD2_MODE_GEOMETRY.NORMAL.nearFieldScale);
  assert.ok(FIELD2_MODE_GEOMETRY.ACCELERATE.viewScale<FIELD2_MODE_GEOMETRY.NORMAL.viewScale);
  assert.equal(FIELD2_MODE_GEOMETRY.FREEZE.maxDepth,1);
  assert.equal(FIELD2_MODE_GEOMETRY.ACCELERATE.maxDepth,4);
});

test('requirements become ordered path-borne checkpoints',()=>{
  const cps=requirementCheckpoints('P-ADVOCATE');
  assert.ok(cps.length>=4);
  assert.ok(cps.every((c,i)=>i===0||c.fraction>cps[i-1].fraction));
  assert.ok(cps.some(c=>c.status==='PRESENT'));
  assert.ok(cps.some(c=>c.status==='ABSENT'));
  assert.ok(cps.some(c=>c.status==='UNKNOWN'));
});

test('first blocking checkpoint creates a meaningful threshold',()=>{
  const b=firstBlockingCheckpoint('P-ADVOCATE');
  assert.ok(b);
  assert.ok(['ABSENT','UNKNOWN','PARTIAL'].includes(b.status));
});

test('pinned and traced paths persist when temporal horizon contracts',()=>{
  let s=INITIAL_FIELD2_STATE;
  s=selectPathWithTrace(s,'P-ADVOCATE');
  s=pinPath(s,'P-ADVOCATE');
  s=setTemporalMode(s,'FREEZE');
  const v=traceVisibility(s,'P-ADVOCATE');
  assert.equal(v.visible,false);
  assert.equal(v.pinned,true);
  assert.equal(v.traced,true);
  assert.equal(v.ghosted,true);
});

test('up to three pinned paths form a simultaneous comparison field',()=>{
  let s=INITIAL_FIELD2_STATE;
  s=pinPath(s,'P-RESEARCH');
  s=pinPath(s,'P-EXPERIMENT');
  s=pinPath(s,'P-ADVOCATE');
  const rows=comparisonRows(s);
  assert.equal(rows.length,3);
  assert.ok(rows.some(r=>r.pathId==='P-RESEARCH'));
  assert.ok(rows.some(r=>r.pathId==='P-ADVOCATE'));
  assert.ok(rows.find(r=>r.pathId==='P-ADVOCATE').burden>rows.find(r=>r.pathId==='P-RESEARCH').burden);
});

test('expanded gate state is reversible and projection-local',()=>{
  let s=INITIAL_FIELD2_STATE;
  s=expandGate(s,'P-ADVOCATE');
  assert.equal(s.expandedGatePathId,'P-ADVOCATE');
  s=expandGate(s,null);
  assert.equal(s.expandedGatePathId,null);
});

test('FIELD-2 non-deployed renderer implements temporal breathing rather than DOM replacement',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  const html=fs.readFileSync(path.join(proto,'index.html'),'utf8');
  assert.match(html,/Temporal breathing/);
  assert.match(app,/fieldRoot\.setAttribute\("transform","scale\("/);
  assert.match(app,/nearG\.setAttribute\("transform","scale\("/);
  assert.match(html,/transition:transform 900ms ease,opacity 900ms ease/);
  assert.doesNotMatch(app,/svg\.innerHTML\s*=\s*""/);
});

test('FIELD-2 renderer carries requirement beads and physically truncates expanded gates',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.match(app,/requirement-bead/);
  assert.match(app,/firstBlocking/);
  assert.match(app,/ref\.line\.setAttribute\("x2",stop\.x\)/);
  assert.match(app,/ref\.line\.setAttribute\("y2",stop\.y\)/);
});

test('FIELD-2 renderer retains trace history and comparative pinning',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.match(app,/traceHistory/);
  assert.match(app,/pinnedPathIds/);
  assert.match(app,/slice\(-3\)/);
  assert.match(app,/Comparative field/);
  assert.match(app,/ghost/);
});

test('FIELD-2 experience review reaches field-like code-behavior threshold without claiming human validation',()=>{
  const r=validateField2ExperienceReview();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.equal(MAATHAI_FIELD_2_EXPERIENCE_REVIEW.total,15);
  assert.equal(MAATHAI_FIELD_2_EXPERIENCE_REVIEW.classification,'FIELD_LIKE');
  assert.equal(MAATHAI_FIELD_2_EXPERIENCE_REVIEW.passesFieldThreshold,true);
});

test('FIELD-2 remains non-deployed and has a deterministic compiler',()=>{
  assert.equal(proto.includes(path.join('site',path.sep)),false);
  const html=fs.readFileSync(path.join(proto,'index.html'),'utf8');
  const script=fs.readFileSync(path.join(root,'scripts/build-maathai-field2-prototype.cjs'),'utf8');
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  assert.match(html,/NON-DEPLOYED FIELD-2/);
  assert.match(script,/MAATHAI_1976_VISUAL_FIELD/);
  assert.match(script,/MAATHAI_1976_FIELD_PROJECTION/);
  assert.equal(pkg.scripts['prototype:maathai-field2'],'npm run build && node scripts/build-maathai-field2-prototype.cjs');
});
