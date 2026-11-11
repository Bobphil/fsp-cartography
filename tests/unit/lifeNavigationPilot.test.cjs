const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const m=require('../../dist/research/lifeNavigationModel.js');

test('blank life-navigation record fails closed until core pilot fields are present',()=>{
  const r=m.blankLifeNavigationRecord();
  const v=m.pilotReadiness(r);
  assert.equal(v.passes,false);
  assert.ok(v.failures.length>=5);
  assert.equal(v.safeguards.selfAuthorship,true);
  assert.equal(v.safeguards.privacyChoice,true);
  assert.equal(v.safeguards.domainAuthorityBoundary,true);
});

test('demo record reaches low-stakes pilot review readiness',()=>{
  const r=m.demoLifeNavigationRecord();
  const v=m.pilotReadiness(r);
  assert.equal(v.passes,true,JSON.stringify(v.failures));
  assert.match(m.summarizeLifeNavigation(r),/HERE/);
  assert.match(m.summarizeLifeNavigation(r),/REMAINDER/);
  assert.match(m.summarizeLifeNavigation(r),/future is revisable/i);
});

test('static pilot page preserves student authorship and privacy firewalls',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../../site/life-navigation.html'),'utf8');
  assert.match(html,/The student is the author/);
  assert.match(html,/Nothing here requires sensitive personal disclosure/);
  assert.match(html,/Imagined coherence ≠ future feasibility/);
  assert.match(html,/Elapsed time ≠ transformation/);
  assert.match(html,/I want ≠ I may impose/);
  assert.match(html,/Achievable ≠ worth achieving/);
  assert.match(html,/READY FOR LOW-STAKES PILOT REVIEW/);
  assert.match(html,/local browser storage only/);
});
