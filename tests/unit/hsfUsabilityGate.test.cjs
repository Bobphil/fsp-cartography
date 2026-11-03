const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createInitialState } = require('../helpers.cjs');
const { reducer } = require('../../dist/kernel/reducer.js');
const { InteractionController } = require('../../dist/interaction/controller.js');

class RecordingPersistence {
  save(){}
  load(){ return null; }
  clear(){}
}

test('HSF Journey A remains supported: multi-region placement at creation', () => {
  const controller = new InteractionController(createInitialState('hsf-a'), new RecordingPersistence());
  controller.addOther('Family employment history',['H','S']);
  assert.deepEqual(controller.getState().nodes[0].hsf,['H','S']);
});

test('HSF add-time UI limitation identified by the gate is now repaired', () => {
  const controller = new InteractionController(createInitialState('hsf-ui'), new RecordingPersistence());
  controller.addOther('Mother',['S','F']);
  controller.addInstitution('College',['H','S','F']);
  const s = controller.getState();
  assert.deepEqual(s.nodes[0].hsf,['S','F']);
  assert.deepEqual(s.nodes[1].hsf,['H','S','F']);
});

test('HSF Journey B: MapChange prose alone still does not mutate HSF state', () => {
  let s = createInitialState('hsf-b');
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'tuition',subjectId:'self',text:'Tuition is too expensive.',
    claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false
  }});
  s = reducer(s,{type:'MAP_CHANGE_ADD',payload:{
    id:'mc1',before:'Situated only',after:'Historical relevance disclosed',
    trigger:'new historical context',confirmedByUser:true,privacy:'PRIVATE'
  }});
  assert.deepEqual(s.claims[0].hsf,['S']);
});

test('HSF Journey C is repaired by explicit HSF_SET on the continuing claim', () => {
  let s = createInitialState('hsf-c');
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'program',subjectId:'college',text:'The college does not offer the program.',
    claimType:'SOURCE_DERIVED',verification:'VERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false
  }});
  const after = reducer(s,{type:'HSF_SET',targetType:'CLAIM',targetId:'program',regions:['S','F']});
  assert.deepEqual(after.claims[0].hsf,['S','F']);
  assert.equal(after.claims[0].id,'program');
});

test('HSF Journey D is repaired without deleting or duplicating the continuing claim', () => {
  let s = createInitialState('hsf-d');
  s = reducer(s,{type:'CLAIM_ADD',payload:{
    id:'future-claim',subjectId:'self',text:'This option remains open next year.',
    claimType:'USER_INFERENCE',verification:'UNVERIFIED',hsf:['S','F'],privacy:'PRIVATE',archived:false
  }});
  const after = reducer(s,{type:'HSF_SET',targetType:'CLAIM',targetId:'future-claim',regions:['S']});
  assert.equal(after.claims.length,1);
  assert.equal(after.claims[0].id,'future-claim');
  assert.deepEqual(after.claims[0].hsf,['S']);
});

test('HSF workaround audit still records duplication as identity failure', () => {
  const doc = fs.readFileSync('HSF-USABILITY-GATE-1.md','utf8');
  assert.match(doc,/Duplicate the object with a new ID/);
  assert.match(doc,/Breaks identity continuity/);
});

test('HSF gate historical classification remains recorded while implementation repairs it', () => {
  const doc = fs.readFileSync('HSF-USABILITY-GATE-1.md','utf8');
  assert.match(doc,/MODEL FAIL, with an additional UI-level failure/);
  const controller = new InteractionController(createInitialState('repair'), new RecordingPersistence());
  controller.addOther('Mother',['H','S']);
  const id = controller.getState().nodes[0].id;
  controller.setHSF('NODE',id,['S','F']);
  assert.deepEqual(controller.getState().nodes[0].hsf,['S','F']);
});
