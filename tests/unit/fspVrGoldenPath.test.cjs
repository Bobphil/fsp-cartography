const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  GOLDEN_PATH_STAGES,
  INITIAL_GOLDEN_PATH_STATE,
  stageById,
  setScaffoldLevel,
  performOperation,
  advanceGoldenPath,
  promptForStage,
  experientialContractComplete,
  validateGoldenPath
}=require('../../dist/research/fspVrGoldenPath.js');

const root=path.join(__dirname,'../..');
const proto=path.join(root,'prototypes/golden-path-1');

test('golden path contains twelve ordered stages from pedagogical zero to life-lottery handoff',()=>{
  const v=validateGoldenPath();
  assert.equal(v.passes,true,JSON.stringify(v.failures));
  assert.equal(GOLDEN_PATH_STAGES.length,12);
  assert.equal(GOLDEN_PATH_STAGES[0].id,'GP0_ZERO');
  assert.equal(GOLDEN_PATH_STAGES[GOLDEN_PATH_STAGES.length-1].id,'GP11_LIFE_LOTTERY_HANDOFF');
});

test('every stage satisfies seven-part experiential-operation contract',()=>{
  for(const s of GOLDEN_PATH_STAGES) assert.equal(experientialContractComplete(s),true,s.id);
});

test('expectation failure supports scaffold fading from explicit to independent',()=>{
  let s={...INITIAL_GOLDEN_PATH_STATE,stageId:'GP4_EXPECTATION_FAILURE'};
  s=setScaffoldLevel(s,3); assert.equal(promptForStage(s),'Freeze?');
  s=setScaffoldLevel(s,2); assert.equal(promptForStage(s),'⏸');
  s=setScaffoldLevel(s,1); assert.equal(promptForStage(s),null);
  s=setScaffoldLevel(s,0); assert.equal(promptForStage(s),null);
});

test('state records acquired and spontaneous operations',()=>{
  let s=INITIAL_GOLDEN_PATH_STATE;
  s=performOperation(s,'TURN_RELOCATE');
  s=performOperation(s,'FREEZE_EXPAND',true);
  assert.ok(s.acquiredOperations.includes('TURN_RELOCATE'));
  assert.ok(s.acquiredOperations.includes('FREEZE_EXPAND'));
  assert.ok(s.spontaneousOperations.includes('FREEZE_EXPAND'));
  assert.equal(s.freezeUsed,true);
});

test('trace reopen evidence and ceiling operations produce distinct state flags',()=>{
  let s={...INITIAL_GOLDEN_PATH_STATE,stageId:'GP5_FREEZE_TRACE'};
  s=performOperation(s,'TRACE_BACKWARD'); assert.equal(s.tracesInspected,true);
  s={...s,stageId:'GP6_REOPEN'}; s=performOperation(s,'OPEN_DRILL_DOWN'); assert.equal(s.reopened,true);
  s={...s,stageId:'GP8_EVIDENCE'}; s=performOperation(s,'PLACE_SIDE_BY_SIDE'); assert.equal(s.evidenceCompared,true);
  s={...s,stageId:'GP9_CLAIM_CEILING'}; s=performOperation(s,'HIT_BOUNDARY'); assert.equal(s.ceilingEncountered,true);
});

test('advance preserves acquired operations into handoff',()=>{
  let s=INITIAL_GOLDEN_PATH_STATE;
  s=performOperation(s,'FREEZE_EXPAND');
  while(s.stageId!=='GP11_LIFE_LOTTERY_HANDOFF') s=advanceGoldenPath(s);
  assert.equal(s.handoffReady,true);
  assert.ok(s.acquiredOperations.includes('FREEZE_EXPAND'));
});

test('faded transfer has no explicit prompt or procedural instruction',()=>{
  const s=stageById('GP10_FADED_TRANSFER');
  assert.equal(s.scaffoldLevel,0);
  assert.equal(s.prompt,null);
  assert.equal(s.explicitProcedure,false);
  assert.ok(s.operation.includes('FREEZE_EXPAND'));
  assert.ok(s.operation.includes('OPEN_DRILL_DOWN'));
  assert.ok(s.operation.includes('PLACE_SIDE_BY_SIDE'));
  assert.ok(s.operation.includes('HIT_BOUNDARY'));
});

test('claim ceiling stage encodes evidential-limit rather than censorship interpretation',()=>{
  const s=stageById('GP9_CLAIM_CEILING');
  assert.match(s.contract.misunderstandingCheck,/evidential limit rather than censorship/);
  assert.ok(s.firewalls.includes('evidence licenses only so much'));
});

test('browser prototype contains all core experiential scenes',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  for(const phrase of [
    'Something happens.',
    'Try acting.',
    'Not everything is yours to command.',
    'You can signal. You cannot command.',
    'The pattern fails.',
    'Hold the moment open.',
    'Reopen the failed expectation.',
    'Watch what they do.',
    'Observation',
    'Extend claim',
    'A new case.',
    'Every human Doing develops somewhere.'
  ]) assert.ok(app.includes(phrase),phrase);
});

test('browser transfer stage contains available operations but no instructional prompt',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.ok(app.includes('GP10_FADED_TRANSFER'));
  assert.ok(app.includes('FREEZE_EXPAND'));
  assert.ok(app.includes('OPEN_DRILL_DOWN'));
  assert.ok(app.includes('PLACE_SIDE_BY_SIDE'));
  assert.ok(app.includes('HIT_BOUNDARY'));
  assert.ok(app.includes('No instruction is given'));
});

test('prototype data are compiler-generated from typed model and remains non-deployed',()=>{
  const script=fs.readFileSync(path.join(root,'scripts/build-golden-path-prototype.cjs'),'utf8');
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  assert.match(script,/GOLDEN_PATH_STAGES/);
  assert.equal(pkg.scripts['prototype:golden-path'],'npm run build && node scripts/build-golden-path-prototype.cjs');
  assert.equal(proto.includes(path.join('site',path.sep)),false);
});

test('life-lottery handoff preserves starting-condition firewall',()=>{
  const s=stageById('GP11_LIFE_LOTTERY_HANDOFF');
  assert.ok(s.firewalls.includes('starting condition ≠ destiny'));
  assert.match(s.contract.change,/Life-Lottery/);
});
