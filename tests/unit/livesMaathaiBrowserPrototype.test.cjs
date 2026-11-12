const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.join(__dirname,'../..');
const protoDir=path.join(root,'prototypes/lives-maathai-vr');

function loadPrototypeData(){
  const code=fs.readFileSync(path.join(protoDir,'data.js'),'utf8');
  const context={window:{}};
  vm.runInNewContext(code,context);
  return context.window.FSP_LIVES_MAATHAI_PROTOTYPE;
}
function appSource(){return fs.readFileSync(path.join(protoDir,'app.js'),'utf8')}

test('prototype lives outside deployed site tree and is explicitly marked non-deployed',()=>{
  assert.equal(protoDir.includes(path.join('site',path.sep)),false);
  const html=fs.readFileSync(path.join(protoDir,'index.html'),'utf8');
  assert.match(html,/noindex,nofollow/);
  assert.match(appSource(),/NON-DEPLOYED/);
});

test('prototype is compiled from canonical Lives and VR projection owners',()=>{
  const p=loadPrototypeData();
  assert.equal(p.generatedFrom.dossier,'FSP-LIVES-IN-TRANSFORMATION-PILOT-1');
  assert.equal(p.generatedFrom.publicRoute,'FSP-LIVES-PUBLIC-ROUTE-1');
  assert.equal(p.generatedFrom.vrProjection,'FSP-VR-MAATHAI-2.0-PROJECTION-1');
  assert.equal(p.route.canonicalOwner,'FSP-LIVES-IN-TRANSFORMATION-PILOT-1');
  assert.equal(p.vr.canonicalOwner,'FSP-LIVES-IN-TRANSFORMATION-PILOT-1');
});

test('Lives route exposes topology-sensitive Maathai modules without Aristotle or Mandela leakage',()=>{
  const p=loadPrototypeData();
  assert.ok(p.route.activeModules.includes('INTENDED_ACTUAL'));
  assert.ok(p.route.activeModules.includes('AUTHORIZATION_STANDING'));
  assert.ok(p.route.activeModules.includes('INSTITUTIONAL_ROLE'));
  assert.ok(!p.route.activeModules.includes('TEXT_CONCEPT_DEVELOPMENT'));
  assert.ok(!p.route.activeModules.includes('STRATEGY_REVISION'));
  assert.ok(p.vr.disabledModules.includes('TEXT_CONCEPT_DEVELOPMENT'));
  assert.ok(p.vr.disabledModules.includes('STRATEGY_REVISION'));
});

test('early browser states preserve hidden-future behavior',()=>{
  const p=loadPrototypeData();
  const early=p.vr.scenes.find(s=>s.sceneId==='SITUATED_ENTRY');
  assert.deepEqual(early.revealClaimIds,['M-C1']);
  assert.ok(early.hiddenClaimIds.includes('M-C5'));
  assert.ok(early.hiddenClaimIds.includes('M-C6'));
  const reveal=p.vr.scenes.find(s=>s.sceneId==='HISTORICAL_REVEAL');
  assert.ok(reveal.revealClaimIds.includes('M-C2'));
  assert.ok(reveal.hiddenClaimIds.includes('M-C4'));
});

test('browser prototype provides plain-language provenance and capability-change content',()=>{
  const p=loadPrototypeData();
  const app=appSource();
  assert.match(app,/Supported statements/);
  assert.match(app,/Where those statements come from/);
  assert.match(app,/What became newly possible/);
  assert.match(app,/New limits that now matter/);
  const c=p.route.deep.claims.find(x=>x.claimId==='M-C2');
  assert.deepEqual(c.sourceIds,['WM-S02','WM-S03']);
});

test('VR browser sequence ends with Authorial Return then OFF',()=>{
  const p=loadPrototypeData();
  const ids=p.vr.scenes.map(s=>s.sceneId);
  assert.equal(ids.at(-2),'AUTHORIAL_RETURN');
  assert.equal(ids.at(-1),'OFF');
  assert.equal(p.vr.exitAllowed,true);
  assert.equal(p.vr.lifeNavigationOptional,true);
});

test('browser return UI requires relation difference uncertainty and carry-forward question',()=>{
  const app=appSource();
  assert.match(app,/What structural relation did you notice/);
  assert.match(app,/What is importantly different in another context/);
  assert.match(app,/What remains uncertain/);
  assert.match(app,/What question would you carry forward/);
  assert.match(app,/YOUR RETURN IS BOUNDED ENOUGH/);
  assert.match(app,/No personal recommendation has been generated/);
});

test('local prototype build command regenerates data from compiled research models',()=>{
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  assert.equal(pkg.scripts['prototype:lives'],'npm run build && node scripts/build-lives-maathai-prototype.cjs');
  const compiler=fs.readFileSync(path.join(root,'scripts/build-lives-maathai-prototype.cjs'),'utf8');
  assert.match(compiler,/compilePublicLivesRoute/);
  assert.match(compiler,/MAATHAI_VR_HARNESS/);
  assert.match(compiler,/prototypes\/lives-maathai-vr\/data\.js/);
});
