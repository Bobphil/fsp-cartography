const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { InteractionController } = require('../../dist/interaction/controller.js');
const { presentView } = require('../../dist/interaction/presenter.js');

class RecordingPersistence {
  constructor(){ this.saved=[]; }
  save(state){ this.saved.push(JSON.parse(JSON.stringify(state))); }
  load(){ return null; }
  clear(){}
}

test('add self supports H+S placement', () => {
  const c = new InteractionController(createInitialState('self-hsf'), new RecordingPersistence());
  c.addSelf('Me',['S','H']);
  assert.deepEqual(c.getState().nodes[0].hsf,['H','S']);
});

test('add other supports S+F placement', () => {
  const c = new InteractionController(createInitialState('other-hsf'), new RecordingPersistence());
  c.addOther('Mother',['F','S']);
  assert.deepEqual(c.getState().nodes[0].hsf,['S','F']);
});

test('add institution supports H+S+F placement', () => {
  const c = new InteractionController(createInitialState('institution-hsf'), new RecordingPersistence());
  c.addInstitution('College',['F','H','S']);
  assert.deepEqual(c.getState().nodes[0].hsf,['H','S','F']);
});

test('person claim supports selectable HSF placement', () => {
  const c = new InteractionController(createInitialState('claim-hsf'), new RecordingPersistence());
  c.addOther('Mother');
  const id=c.getState().nodes[0].id;
  c.addPersonClaim(id,'She reported this.','OTHER_REPORT',['H','S']);
  assert.deepEqual(c.getState().claims[0].hsf,['H','S']);
});

test('setHSF reassigns the same node without changing identity', () => {
  const c = new InteractionController(createInitialState('set-hsf'), new RecordingPersistence());
  c.addOther('Mother',['S']);
  const before=structuredClone(c.getState().nodes[0]);
  c.setHSF('NODE',before.id,['F','S']);
  const after=c.getState().nodes[0];
  assert.equal(after.id,before.id);
  assert.equal(after.label,before.label);
  assert.deepEqual(after.hsf,['S','F']);
});

test('creation and reassignment reject no HSF selection', () => {
  const c = new InteractionController(createInitialState('empty-hsf'), new RecordingPersistence());
  assert.throws(()=>c.addOther('Mother',[]),/at least one region/);
  c.addOther('Mother',['S']);
  const id=c.getState().nodes[0].id;
  assert.throws(()=>c.setHSF('NODE',id,[]),/at least one region/);
});

test('HSF presenter shows current regions for nodes and claims', () => {
  const c = new InteractionController(createInitialState('present-hsf'), new RecordingPersistence());
  c.addOther('Mother',['H','S']);
  const id=c.getState().nodes[0].id;
  c.addPersonClaim(id,'She reported this.','OTHER_REPORT',['S','F']);
  c.navigate('HSF');
  const vm=presentView(c.getState());
  const section=vm.sections.find(x=>x.title==='H/S/F-bearing objects');
  assert.match(section.items[0].detail,/H\+S/);
  assert.match(section.items[1].detail,/S\+F/);
});

test('HSF presenter preserves relevance-not-intrinsic-time and F firewall wording', () => {
  const c = new InteractionController(createInitialState('wording-hsf'), new RecordingPersistence());
  c.addOther('Mother',['F']);
  c.navigate('HSF');
  const vm=presentView(c.getState());
  const section=vm.sections[0];
  assert.match(section.items[0].meta,/relevance in this inquiry/);
  assert.match(section.items[0].meta,/not intrinsic temporal location/);
});
