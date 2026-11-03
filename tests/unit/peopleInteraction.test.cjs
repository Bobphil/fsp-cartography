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

test('People control adds exactly one SELF_PRF and refuses a second self', () => {
  const controller = new InteractionController(createInitialState('people-self'), new RecordingPersistence());
  controller.addSelf('Me');
  const s = controller.getState();
  assert.equal(s.nodes.filter(n=>n.nodeType==='SELF_PRF').length,1);
  assert.equal(s.nodes.find(n=>n.nodeType==='SELF_PRF').label,'Me');
  assert.throws(()=>controller.addSelf('Another me'),/already has a self representation/);
});

test('adding another person creates MY_MAP_OF_OTHER rather than a person-as-world claim', () => {
  const controller = new InteractionController(createInitialState('people-other'), new RecordingPersistence());
  controller.addOther('Mother');
  const other = controller.getState().nodes[0];
  assert.equal(other.nodeType,'MY_MAP_OF_OTHER');
  assert.equal(other.label,'Mother');
  assert.equal(other.createdBy,'USER');
});

test('People claim control preserves OTHER_REPORT provenance', () => {
  const controller = new InteractionController(createInitialState('people-report'), new RecordingPersistence());
  controller.addOther('Mother');
  const other = controller.getState().nodes[0];
  controller.addPersonClaim(other.id,'I do not want you taking on huge debt.','OTHER_REPORT');
  const claim = controller.getState().claims[0];
  assert.equal(claim.subjectId,other.id);
  assert.equal(claim.claimType,'OTHER_REPORT');
  assert.equal(claim.verification,'UNVERIFIED');
});

test('People claim control preserves USER_INFERENCE provenance separately from report', () => {
  const controller = new InteractionController(createInitialState('people-inference'), new RecordingPersistence());
  controller.addOther('Mother');
  const other = controller.getState().nodes[0];
  controller.addPersonClaim(other.id,'Mom wants me to become a nurse.','USER_INFERENCE');
  const claim = controller.getState().claims[0];
  assert.equal(claim.claimType,'USER_INFERENCE');
  assert.notEqual(claim.claimType,'OTHER_REPORT');
});

test('People claim control refuses to target SELF_PRF', () => {
  const controller = new InteractionController(createInitialState('people-target'), new RecordingPersistence());
  controller.addSelf('Me');
  const self = controller.getState().nodes[0];
  assert.throws(
    ()=>controller.addPersonClaim(self.id,'I think this about myself.','USER_INFERENCE'),
    /must target MY_MAP_OF_OTHER/
  );
});

test('People presenter keeps map-of-other and claim provenance visible', () => {
  const controller = new InteractionController(createInitialState('people-present'), new RecordingPersistence());
  controller.addOther('Mother');
  const other = controller.getState().nodes[0];
  controller.addPersonClaim(other.id,'I do not want you taking on huge debt.','OTHER_REPORT');
  controller.addPersonClaim(other.id,'Mom wants me to become a nurse.','USER_INFERENCE');
  controller.navigate('PEOPLE');

  const vm = presentView(controller.getState());
  const people = vm.sections.find(x=>x.title==='People in this map');
  const claims = vm.sections.find(x=>x.title==='Claims about people');

  assert.equal(people.items[0].detail,'My map of this person');
  assert.equal(claims.items[0].detail,'Reported by this person');
  assert.match(claims.items[0].meta,/OTHER_REPORT/);
  assert.equal(claims.items[1].detail,'My inference about this person');
  assert.match(claims.items[1].meta,/USER_INFERENCE/);
});
