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

test('Investigate path control creates a user possibility without ranking metadata', () => {
  const controller = new InteractionController(createInitialState('investigate-path'), new RecordingPersistence());
  controller.addPath('Registered Nurse','EXPLORATORY',['actual tuition cost'],[]);
  const p = controller.getState().paths[0];
  assert.equal(p.origin,'USER');
  assert.equal(p.acceptedIntoMap,true);
  assert.equal(p.status,'EXPLORATORY');
  assert.deepEqual(p.unknowns,['actual tuition cost']);
  assert.ok(!('score' in p));
  assert.ok(!('rank' in p));
  assert.ok(!('probability' in p));
});

test('Investigate path control links only existing constraints', () => {
  const controller = new InteractionController(createInitialState('investigate-constraints'), new RecordingPersistence());
  controller.addConstraint('Program not offered','VERIFIED','HARD_CURRENTLY','current institution');
  const constraintId = controller.getState().constraints[0].id;
  controller.addPath('Respiratory Therapist','CONDITIONAL',[],[constraintId]);
  assert.deepEqual(controller.getState().paths[0].constraintIds,[constraintId]);
  assert.throws(
    ()=>controller.addPath('Another path','EXPLORATORY',[],['missing']),
    /constraints must already exist/
  );
});

test('Investigate path control trims and preserves multiple unknowns', () => {
  const controller = new InteractionController(createInitialState('investigate-unknowns'), new RecordingPersistence());
  controller.addPath('Physician Assistant','EXPLORATORY',[' actual cost ',' shadowing access ',''],[]);
  assert.deepEqual(controller.getState().paths[0].unknowns,['actual cost','shadowing access']);
});

test('Investigate path control requires a path name', () => {
  const controller = new InteractionController(createInitialState('investigate-name'), new RecordingPersistence());
  assert.throws(()=>controller.addPath('   ','EXPLORATORY',[],[]),/Path name is required/);
});

test('Investigate next action is information-generating rather than commitment', () => {
  const controller = new InteractionController(createInitialState('investigate-action'), new RecordingPersistence());
  controller.addInquiryAction('Interview two healthcare professionals');
  const a = controller.getState().actions[0];
  assert.equal(a.actionType,'INFORMATION_GENERATING');
  assert.equal(a.status,'PLANNED');
  assert.notEqual(a.actionType,'COMMITMENT');
});

test('Investigate next action requires text', () => {
  const controller = new InteractionController(createInitialState('investigate-action-required'), new RecordingPersistence());
  assert.throws(()=>controller.addInquiryAction('   '),/Inquiry action text is required/);
});

test('Investigate presenter makes possibility and inquiry firewalls visible', () => {
  const controller = new InteractionController(createInitialState('investigate-present'), new RecordingPersistence());
  controller.addPath('Nursing','EXPLORATORY',['actual cost'],[]);
  controller.addInquiryAction('Meet a healthcare adviser');
  controller.navigate('INVESTIGATE');

  const vm = presentView(controller.getState());
  const paths = vm.sections.find(x=>x.title==='Paths');
  const actions = vm.sections.find(x=>x.title==='Next inquiry actions');

  assert.match(paths.items[0].detail,/Possibility status/);
  assert.match(paths.items[0].meta,/not recommendation or prediction/);
  assert.match(paths.items[0].meta,/Unknowns: actual cost/);
  assert.equal(actions.items[0].detail,'Information-generating action');
  assert.match(actions.items[0].meta,/not commit to a path/);
});
