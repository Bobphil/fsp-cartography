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
    'What could now be done that could not be done before?',
    'What you are not being shown yet',
    'What pattern might apply somewhere else?',
    'What you take away'
  ]) assert.ok(s.includes(phrase),phrase);
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
  assert.match(s,/Why this source matters here/);
});

test('capability change is explained as newly reachable action and not automatically progress',()=>{
  const s=app();
  assert.ok(s.includes('What could now be done that could not be done before?'));
  assert.match(s,/New capability can also bring new costs or constraints/);
  assert.match(spec(),/reachable action/);
});

test('hidden future explains the purpose of withholding later outcomes',()=>{
  const s=app();
  assert.match(s,/What you are not being shown yet/);
  assert.match(s,/prevent later success from making earlier choices look inevitable/);
  assert.match(s,/Hidden future/);
});

test('portability is introduced as a pattern to test rather than copying a tactic',()=>{
  const s=app();
  assert.ok(s.includes('What pattern might apply somewhere else?'));
  assert.match(s,/A pattern to test, not a recipe to copy/);
  assert.match(s,/FSP deeper label: structural relation/);
  assert.match(s,/What should not be copied from the case/);
});

test('Return is learner-authored and requires difference uncertainty and a forward question',()=>{
  const s=app();
  assert.match(s,/What you take away — in your own words/);
  assert.match(s,/There is no single correct takeaway/);
  assert.ok(s.includes('What pattern did you notice that might matter somewhere else?'));
  assert.match(s,/What is importantly different in another context/);
  assert.match(s,/What remains uncertain/);
  assert.match(s,/What question would you carry forward/);
});

test('plain-language patch preserves person and phenomenology firewalls',()=>{
  const s=app();
  assert.match(s,/not Maathai as a whole/);
  assert.ok(s.includes("cannot give you Maathai\\'s exact first-person experience") || s.includes("cannot give you Maathai's exact first-person experience"));
});

test('usability specification explicitly distinguishes design pass from human evidence',()=>{
  const s=spec();
  assert.match(s,/design-level usability pass, not evidence from real users/i);
  assert.match(s,/Run a small observed browser test/i);
});
