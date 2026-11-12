const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.join(__dirname,'../..');
const pilot=path.join(root,'site/pilot/lives-maathai');

test('pilot participant surface is staged under site but not linked from Encyclopedia home',()=>{
  const index=fs.readFileSync(path.join(pilot,'index.html'),'utf8');
  const home=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
  assert.match(index,/noindex,nofollow/);
  assert.match(index,/FSP-LIVES-USABILITY-PILOT-1\.0/);
  assert.doesNotMatch(home,/pilot\/lives-maathai/);
});

test('participant staging bundle is a frozen copy of the reviewed non-deployed prototype',()=>{
  const stagedApp=fs.readFileSync(path.join(pilot,'app.js'),'utf8');
  const protoApp=fs.readFileSync(path.join(root,'prototypes/lives-maathai-vr/app.js'),'utf8');
  const stagedData=fs.readFileSync(path.join(pilot,'data.js'),'utf8');
  const protoData=fs.readFileSync(path.join(root,'prototypes/lives-maathai-vr/data.js'),'utf8');
  assert.equal(stagedApp,protoApp);
  assert.equal(stagedData,protoData);
});

test('observer view uses the frozen seven-question protocol and thresholds',()=>{
  const html=fs.readFileSync(path.join(pilot,'observer.html'),'utf8');
  const js=fs.readFileSync(path.join(pilot,'observer.js'),'utf8');
  assert.match(html,/4 of 5/);
  assert.match(html,/At least 5 of 7 distinctions/);
  assert.match(js,/Where in Maathai's life are you looking right now/);
  assert.match(js,/What is one thing the page says we can support at this point/);
  assert.match(js,/What could be done later that could not be done before/);
  assert.match(js,/Why does the site hide some later facts/);
  assert.match(js,/Is there any pattern from this case that might matter somewhere else/);
  assert.match(js,/Is there one correct takeaway/);
});

test('observer data stays local until explicit CSV export',()=>{
  const js=fs.readFileSync(path.join(pilot,'observer.js'),'utf8');
  assert.match(js,/localStorage/);
  assert.match(js,/fspLivesPilotSessions/);
  assert.match(js,/text\/csv/);
  assert.doesNotMatch(js,/fetch\s*\(/);
  assert.doesNotMatch(js,/XMLHttpRequest/);
});

test('pilot manifest freezes baseline and restart rule',()=>{
  const m=JSON.parse(fs.readFileSync(path.join(pilot,'manifest.json'),'utf8'));
  assert.equal(m.baselineId,'FSP-LIVES-USABILITY-PILOT-1.0');
  assert.match(m.status,/FROZEN/);
  assert.match(m.freezeRule,/Do not change participant-facing wording during participants 1-5/);
  assert.equal(m.navigation,'unlinked from main Encyclopedia');
});
