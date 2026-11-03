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

function controllerWithTask(id='return-base'){
  const controller = new InteractionController(createInitialState(id), new RecordingPersistence());
  controller.setTask('FORMED','Which path should I investigate next?');
  return controller;
}

test('Return control creates bounded return, output card, and optional REOPEN', () => {
  const controller = controllerWithTask('return-bundle');
  controller.addInquiryAction('Meet a healthcare adviser');
  const actionId = controller.getState().actions[0].id;

  controller.addBoundedReturn(
    'INVESTIGATE',
    'Healthcare remains a serious direction.',
    'Choosing what to investigate next, not a final career.',
    'I still lack direct occupational experience.',
    [actionId],
    'After direct occupational exposure',
    'I am not choosing a final profession.'
  );

  const s = controller.getState();
  assert.equal(s.reopenItems.length,1);
  assert.equal(s.returns.length,1);
  assert.equal(s.outputCards.length,1);
  assert.equal(s.returns[0].reopenId,s.reopenItems[0].id);
  assert.equal(s.outputCards[0].returnId,s.returns[0].id);
  assert.deepEqual(s.returns[0].nextActionIds,[actionId]);
  assert.deepEqual(s.outputCards[0].nextActions,['Meet a healthcare adviser']);
  assert.equal(s.outputCards[0].claimCeiling,'Choosing what to investigate next, not a final career.');
  assert.equal(s.outputCards[0].reopenCondition,'After direct occupational exposure');
});

test('Return control requires current judgment and claim ceiling', () => {
  const controller = controllerWithTask('return-required');
  assert.throws(
    ()=>controller.addBoundedReturn('JUDGMENT','','A bounded claim','',[]),
    /Current judgment is required/
  );
  assert.throws(
    ()=>controller.addBoundedReturn('JUDGMENT','Current view','','',[]),
    /Claim ceiling is required/
  );
});

test('Return control links only existing next actions', () => {
  const controller = controllerWithTask('return-actions');
  assert.throws(
    ()=>controller.addBoundedReturn('INVESTIGATE','Current view','Only a provisional investigation judgment','',['missing']),
    /next actions must already exist/
  );
});

test('REOPEN condition requires a task or orientation target', () => {
  const controller = new InteractionController(createInitialState('return-no-task'), new RecordingPersistence());
  assert.throws(
    ()=>controller.addBoundedReturn('UNRESOLVED','Still unresolved','No final conclusion','',[],'When new evidence arrives'),
    /task or orientation is required/
  );
});

test('Return without REOPEN remains current rather than being represented as final closure', () => {
  const controller = controllerWithTask('return-no-reopen');
  controller.addBoundedReturn(
    'JUDGMENT',
    'This is my best current judgment.',
    'This judgment applies only to the decision now before me.',
    'Some uncertainty remains.',
    []
  );
  const s = controller.getState();
  assert.equal(s.reopenItems.length,0);
  assert.equal(s.returns[0].reopenId,undefined);
  assert.equal(s.outputCards[0].reopenCondition,undefined);
});

test('Return presenter exposes uncertainty, claim ceiling, and REOPEN explicitly', () => {
  const controller = controllerWithTask('return-present');
  controller.addInquiryAction('Check verified tuition information');
  const actionId = controller.getState().actions[0].id;
  controller.addBoundedReturn(
    'INVESTIGATE',
    'I should investigate the lower-cost route next.',
    'This is a next-investigation judgment, not a final educational choice.',
    'Actual aid eligibility is still unknown.',
    [actionId],
    'After verified financial-aid information',
    'I am not claiming this route is best overall.'
  );
  controller.navigate('RETURN');

  const vm = presentView(controller.getState());
  const returns = vm.sections.find(x=>x.title==='Authorial return');
  const cards = vm.sections.find(x=>x.title==='Output cards');

  assert.match(returns.items[0].detail,/Remaining uncertainty:/);
  assert.match(returns.items[0].detail,/Not claiming:/);
  assert.match(returns.items[0].meta,/reopenable/);
  assert.match(cards.items[0].detail,/Claim ceiling:/);
  assert.match(cards.items[0].meta,/Next actions:/);
  assert.match(cards.items[0].meta,/REOPEN when:/);
});
