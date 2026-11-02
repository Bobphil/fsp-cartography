const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');
const { canEmit } = require('../../dist/coach/deterministicTriggers.js');

test('rejected Coach interpretation stays suppressed', () => {
  let s = createInitialState('coach');
  s = apply(s,
    { type:'TASK_SET', payload:{ id:'task1', status:'FORMED', text:'Explore a path', origin:'USER', privacy:'PRIVATE' }},
    { type:'COACH_RECORD_ADD', payload:{ id:'coach1', semanticKey:'MOTHER_FINANCIAL_OPPOSITION', trigger:'INTERPRETIVE_CANDIDATE', proposal:'Your mother may be opposing this primarily for financial reasons.' }},
    { type:'COACH_PROPOSAL_REJECT', coachRecordId:'coach1', taskId:'task1', userCorrection:'That was practical advice, not opposition.' }
  );
  assert.equal(canEmit(s,'MOTHER_FINANCIAL_OPPOSITION'),false);
  assert.equal(s.coachRecords[0].disposition,'REJECTED');
  assert.equal(s.rejectedInterpretations[0].doNotReuse,true);
});
