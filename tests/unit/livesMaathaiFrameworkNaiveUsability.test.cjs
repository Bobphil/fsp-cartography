const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.join(__dirname,'../..');
const app=()=>fs.readFileSync(path.join(root,'prototypes/lives-maathai-vr/app.js'),'utf8');
const spec=()=>fs.readFileSync(path.join(root,'FSP-LIVES-USABILITY-1.md'),'utf8');

test('framework-naive orientation defines all seven distinctions in plain language',()=>{
  const s=app();
  for(const phrase of [
    'Where we are in the life',
    'What we can say now',
    'Where that statement comes from',
    'What became newly possible',
    'What you are not being shown yet',
    'What might carry to another situation',
    'What you take away'
  ]) assert.match(s,new RegExp(phrase));
});

test('timeline uses bounded-period language rather than requiring state vocabulary',()=>{
  const s=app();
  assert.match(s,/Choose a period/);
  assert.match(s,/one bounded historical situation/);
  assert.match(s,/not Maathai as a whole/);
});

test('supported statements and sources are presented as different interface objects',()=>{
  const s=app();
  assert.match(s,/Supported statements/);
  assert.match(s,/Where those statements come from/);
  assert.match(s,/Sources/);
  assert.match(s,/Maathai speaking or writing/);
  assert.match(s,/Document from the time/);
  assert.match(s,/Later historical or institutional source/);
});

test('capability change is explained as newly reachable action rather than framework jargon',()=>{
  const s=app();
  assert.match(s,/What became newly possible/);
  assert.match(spec(),/reachable action/);
});

test('hidden future explains the purpose of withholding later outcomes',()=>{
  const s=app();
  assert.match(s,/What you are not being shown yet/);
  assert.match(s,/prevent later success from making earlier choices look inevitable/);
  assert.match(s,/Hidden future/);
});

test('portability is introduced as structural transfer rather than copying a tactic',()=>{
  const s=app();
  assert.match(s,/What might carry to another situation/);
  assert.match(s,/A structural lesson, not a recipe/);
  assert.match(s,/What should not be copied from the case/);
});

test('Return is learner-authored and requires difference uncertainty and a forward question',()=>{
  const s=app();
  assert.match(s,/What you take away — in your own words/);
  assert.match(s,/What structural relation did you notice/);
  assert.match(s,/What is importantly different in another context/);
  assert.match(s,/What remains uncertain/);
  assert.match(s,/What question would you carry forward/);
});

test('plain-language patch preserves person and phenomenology firewalls',()=>{
  const s=app();
  assert.match(s,/not Maathai as a whole/);
  assert.match(s,/cannot give you Maathai's exact first-person experience/);
});

test('usability specification explicitly distinguishes design pass from human evidence',()=>{
  const s=spec();
  assert.match(s,/design-level usability pass, not evidence from real users/i);
  assert.match(s,/Run a small observed browser test/i);
});
