const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { InteractionController } = require('../../dist/interaction/controller.js');
const { presentView } = require('../../dist/interaction/presenter.js');

class RecordingPersistence {
  constructor(){ this.saved = []; this.loaded = null; }
  save(state){ this.saved.push(JSON.parse(JSON.stringify(state))); }
  load(){ return this.loaded; }
  clear(){}
}

test('interaction controller dispatches existing actions and persists changed state', () => {
  const persistence = new RecordingPersistence();
  const controller = new InteractionController(createInitialState('ui'), persistence);

  controller.setTitle('My map');
  controller.setDefaultPrivacy('TEMP_SESSION');
  controller.setTask('FORMED','  What should I investigate?  ');

  const s = controller.getState();
  assert.equal(s.title,'My map');
  assert.equal(s.defaultPrivacy,'TEMP_SESSION');
  assert.equal(s.task.text,'What should I investigate?');
  assert.equal(s.task.privacy,'TEMP_SESSION');
  assert.equal(s.task.origin,'USER');
  assert.equal(persistence.saved.length,3);
});

test('interaction controller navigation does not alter kernel version', () => {
  const persistence = new RecordingPersistence();
  const controller = new InteractionController(createInitialState('nav-ui'), persistence);
  controller.navigate('PEOPLE');
  assert.equal(controller.getState().currentView,'PEOPLE');
  assert.equal(controller.getState().version,0);
});

test('presenter exposes no-shared-task as a valid human-facing state', () => {
  const s = createInitialState('shared-ui');
  s.currentView = 'CONNECTIONS';
  s.sharedTasks.push({id:'st',participantIds:[],status:'NONE_IDENTIFIED',outsideScope:[],privacy:'PRIVATE'});
  const vm = presentView(s);
  const shared = vm.sections.find(x=>x.title==='Shared task');
  assert.equal(shared.items[0].heading,'No shared task identified');
});

test('presenter supplies a view model for all seven frozen views', () => {
  const s = createInitialState('all-views');
  const ids = ['START','PEOPLE','INSTITUTION','HSF','CONNECTIONS','INVESTIGATE','RETURN'];
  for (const id of ids) {
    s.currentView = id;
    const vm = presentView(s);
    assert.equal(vm.id,id);
    assert.ok(vm.purpose.length>0);
    assert.ok(vm.sections.length>0);
  }
});
