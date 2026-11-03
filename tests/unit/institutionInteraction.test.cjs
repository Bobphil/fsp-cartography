const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { InteractionController } = require('../../dist/interaction/controller.js');
const { presentView } = require('../../dist/interaction/presenter.js');

class RecordingPersistence {
  constructor(){ this.saved = []; }
  save(state){ this.saved.push(JSON.parse(JSON.stringify(state))); }
  load(){ return null; }
  clear(){}
}

test('Institution control creates INSTITUTION rather than person node', () => {
  const controller = new InteractionController(createInitialState('institution-node'), new RecordingPersistence());
  controller.addInstitution('Harbor Community College');
  const node = controller.getState().nodes[0];
  assert.equal(node.nodeType,'INSTITUTION');
  assert.equal(node.label,'Harbor Community College');
  assert.notEqual(node.nodeType,'MY_MAP_OF_OTHER');
  assert.notEqual(node.nodeType,'SELF_PRF');
});

test('Institution control rejects blank institution labels', () => {
  const controller = new InteractionController(createInitialState('institution-blank'), new RecordingPersistence());
  assert.throws(()=>controller.addInstitution('   '),/institution label is required/i);
});

test('Constraint control preserves verification and rigidity independently', () => {
  const controller = new InteractionController(createInitialState('constraint-independent'), new RecordingPersistence());
  controller.addConstraint('Program not offered','VERIFIED','MODIFIABLE','current institution');
  const c = controller.getState().constraints[0];
  assert.equal(c.epistemicStatus,'VERIFIED');
  assert.equal(c.rigidity,'MODIFIABLE');
  assert.equal(c.scope,'current institution');
});

test('Constraint control permits assumed yet hard-currently without collapsing the dimensions', () => {
  const controller = new InteractionController(createInitialState('constraint-cross'), new RecordingPersistence());
  controller.addConstraint('Funding may end','ASSUMED','HARD_CURRENTLY','current funding source');
  const c = controller.getState().constraints[0];
  assert.equal(c.epistemicStatus,'ASSUMED');
  assert.equal(c.rigidity,'HARD_CURRENTLY');
});

test('Constraint control requires both text and scope', () => {
  const controller = new InteractionController(createInitialState('constraint-required'), new RecordingPersistence());
  assert.throws(()=>controller.addConstraint('','UNKNOWN','UNKNOWN','current institution'),/Constraint text is required/);
  assert.throws(()=>controller.addConstraint('Program unavailable','UNKNOWN','UNKNOWN','   '),/Constraint scope is required/);
});

test('Institution presenter labels verification, rigidity, and scope separately', () => {
  const controller = new InteractionController(createInitialState('institution-present'), new RecordingPersistence());
  controller.addInstitution('Harbor Community College');
  controller.addConstraint('Program not offered','VERIFIED','HARD_CURRENTLY','current institution');
  controller.navigate('INSTITUTION');

  const vm = presentView(controller.getState());
  const institutions = vm.sections.find(x=>x.title==='Institutions');
  const constraints = vm.sections.find(x=>x.title==='Constraints');

  assert.equal(institutions.items[0].heading,'Harbor Community College');
  assert.match(constraints.items[0].detail,/Verification: VERIFIED/);
  assert.match(constraints.items[0].detail,/Rigidity: HARD CURRENTLY/);
  assert.equal(constraints.items[0].meta,'Scope: current institution');
});
