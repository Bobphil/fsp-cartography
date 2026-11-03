const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { reducer } = require('../../dist/kernel/reducer.js');
const { InteractionController } = require('../../dist/interaction/controller.js');

class RecordingPersistence {
  save(){}
  load(){ return null; }
  clear(){}
}

test('HSF Journey A: kernel data shape supports stable multi-region placement at creation', () => {
  let s = createInitialState('hsf-a');
  s = reducer(s, {
    type:'NODE_ADD',
    payload:{
      id:'history',
      nodeType:'MY_MAP_OF_OTHER',
      label:'Family employment history',
      relevance:['current decision'],
      hsf:['H','S'],
      privacy:'PRIVATE',
      createdBy:'USER',
      archived:false
    }
  });
  assert.deepEqual(s.nodes[0].hsf,['H','S']);
});

test('HSF gate detects add-time UI limitation: current interaction controls hard-code S', () => {
  const controller = new InteractionController(createInitialState('hsf-ui'), new RecordingPersistence());
  controller.addOther('Mother');
  controller.addInstitution('College');
  const s = controller.getState();
  assert.deepEqual(s.nodes[0].hsf,['S']);
  assert.deepEqual(s.nodes[1].hsf,['S']);
});

test('HSF Journey B: MapChange prose cannot reclassify an existing claim from S to H+S', () => {
  let s = createInitialState('hsf-b');
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'tuition',subjectId:'self',text:'Tuition is too expensive.',
    claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false
  }});
  s = reducer(s,{type:'MAP_CHANGE_ADD',payload:{
    id:'mc1',
    before:'Tuition concern treated as only situated',
    after:'Family debt history is also relevant',
    trigger:'new historical context',
    confirmedByUser:true,
    privacy:'PRIVATE'
  }});
  assert.deepEqual(s.claims[0].hsf,['S']);
  assert.equal(s.mapChanges.length,1);
});

test('HSF Journey C: unsupported HSF_SET action leaves S state unchanged', () => {
  let s = createInitialState('hsf-c');
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'program',subjectId:'college',text:'The college does not offer the program.',
    claimType:'SOURCE_DERIVED',verification:'VERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false
  }});
  const before = s;
  const after = reducer(s,{type:'HSF_SET',targetType:'CLAIM',targetId:'program',regions:['S','F']});
  assert.equal(after,before);
  assert.deepEqual(after.claims[0].hsf,['S']);
});

test('HSF Journey D: Return and REOPEN do not withdraw forward relevance from the continuing claim', () => {
  let s = createInitialState('hsf-d');
  s = reducer(s,{type:'TASK_SET',payload:{
    id:'task',status:'FORMED',text:'What paths remain open?',origin:'USER',privacy:'PRIVATE'
  }});
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'future-claim',subjectId:'self',text:'This option remains open next year.',
    claimType:'USER_INFERENCE',verification:'UNVERIFIED',hsf:['S','F'],privacy:'PRIVATE',archived:false
  }});
  s = reducer(s,{type:'REOPEN_ADD',payload:{
    id:'reopen1',targetType:'CLAIM',targetId:'future-claim',
    condition:'New verified eligibility information',status:'OPEN',privacy:'PRIVATE'
  }});
  s = reducer(s,{type:'RETURN_ADD',payload:{
    id:'return1',returnType:'NARROW',
    currentJudgment:'The forward relevance should be reconsidered.',
    nextActionIds:[],reopenId:'reopen1',privacy:'PRIVATE'
  }});
  assert.deepEqual(s.claims[0].hsf,['S','F']);
});

test('HSF workaround audit: duplicating an object changes identity rather than reclassifying it', () => {
  let s = createInitialState('hsf-duplicate');
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'same-claim-v1',subjectId:'self',text:'Tuition is too expensive.',
    claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false
  }});
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'same-claim-v2',subjectId:'self',text:'Tuition is too expensive.',
    claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['H','S'],privacy:'PRIVATE',archived:false
  }});
  assert.equal(s.claims.length,2);
  assert.notEqual(s.claims[0].id,s.claims[1].id);
});

test('HSF gate classification: repeatable reclassification need is a model failure, not only a UI failure', () => {
  const findings = {
    dataShapeSupportsMultipleRegions:true,
    interactionCanChooseRegionsAtCreation:false,
    reducerCanReclassifyExistingNode:false,
    reducerCanReclassifyExistingClaim:false,
    proseWorkaroundsChangeMachineState:false
  };

  const classification =
    findings.dataShapeSupportsMultipleRegions &&
    (!findings.reducerCanReclassifyExistingNode || !findings.reducerCanReclassifyExistingClaim)
      ? 'MODEL_FAIL'
      : findings.interactionCanChooseRegionsAtCreation
        ? 'PASS'
        : 'UI_FAIL_MODEL_PASS';

  assert.equal(classification,'MODEL_FAIL');
});
