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

function controllerWithTwoNodes(id='connections-base'){
  const controller = new InteractionController(createInitialState(id), new RecordingPersistence());
  controller.addSelf('Me');
  controller.addOther('Father');
  return controller;
}

test('connection control preserves PRACTICAL_POWER as distinct from AUTHORITY', () => {
  const controller = controllerWithTwoNodes('power');
  const [me,father] = controller.getState().nodes;
  controller.addConnection(father.id,me.id,'PRACTICAL_POWER','Controls current tuition contribution');
  const c = controller.getState().connections[0];
  assert.equal(c.connectionType,'PRACTICAL_POWER');
  assert.notEqual(c.connectionType,'AUTHORITY');
  assert.equal(c.status,'USER_CONFIRMED');
});

test('connection control can record AUTHORITY independently of practical power', () => {
  const controller = controllerWithTwoNodes('authority');
  const [me,father] = controller.getState().nodes;
  controller.addConnection(father.id,me.id,'AUTHORITY','Has formal decision authority in this domain');
  const c = controller.getState().connections[0];
  assert.equal(c.connectionType,'AUTHORITY');
  assert.notEqual(c.connectionType,'PRACTICAL_POWER');
});

test('connection control refuses missing endpoints rather than inventing nodes', () => {
  const controller = controllerWithTwoNodes('missing-endpoint');
  const [me] = controller.getState().nodes;
  assert.throws(()=>controller.addConnection('missing',me.id,'AFFECTS'),/source must already exist/);
  assert.throws(()=>controller.addConnection(me.id,'missing','AFFECTS'),/target must already exist/);
});

test('shared-task control accepts NONE_IDENTIFIED with no manufactured task text', () => {
  const controller = controllerWithTwoNodes('none-shared');
  const ids = controller.getState().nodes.map(n=>n.id);
  controller.setSharedTask('NONE_IDENTIFIED',ids);
  const s = controller.getState().sharedTasks[0];
  assert.equal(s.status,'NONE_IDENTIFIED');
  assert.equal(s.text,undefined);
  assert.deepEqual(s.participantIds,ids);
});

test('shared-task control supports confirmed task with explicit outside scope', () => {
  const controller = controllerWithTwoNodes('confirmed-shared');
  const ids = controller.getState().nodes.map(n=>n.id);
  controller.setSharedTask(
    'CONFIRMED',
    ids,
    'Clarify actual financial options',
    ['Agreement on final profession']
  );
  const s = controller.getState().sharedTasks[0];
  assert.equal(s.status,'CONFIRMED');
  assert.equal(s.text,'Clarify actual financial options');
  assert.deepEqual(s.outsideScope,['Agreement on final profession']);
});

test('shared-task control rejects unknown participants', () => {
  const controller = controllerWithTwoNodes('shared-invalid');
  assert.throws(()=>controller.setSharedTask('POSSIBLE_UNCONFIRMED',['missing'],'Maybe coordinate'),/participants must already exist/);
});

test('Connections presenter keeps relation type and no-shared-task status visible', () => {
  const controller = controllerWithTwoNodes('connections-present');
  const [me,father] = controller.getState().nodes;
  controller.addConnection(father.id,me.id,'PRACTICAL_POWER','Controls current tuition contribution');
  controller.setSharedTask('NONE_IDENTIFIED',[me.id,father.id]);
  controller.navigate('CONNECTIONS');

  const vm = presentView(controller.getState());
  const connections = vm.sections.find(x=>x.title==='Connections');
  const shared = vm.sections.find(x=>x.title==='Shared task');

  assert.match(connections.items[0].detail,/PRACTICAL POWER/);
  assert.equal(shared.items[0].heading,'No shared task identified');
  assert.match(shared.items[0].detail,/NONE IDENTIFIED/);
});
