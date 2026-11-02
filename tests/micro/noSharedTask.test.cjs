const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');

test('no shared task is a valid persistent state and does not block return', () => {
  let s = createInitialState('shared');
  s = apply(s,
    { type:'SHARED_TASK_SET', payload:{ id:'st1', participantIds:['me','uncle'], status:'NONE_IDENTIFIED', outsideScope:[], privacy:'PRIVATE' }},
    { type:'RETURN_ADD', payload:{ id:'ret', returnType:'UNRESOLVED', whatBecameClearer:'Agreement is not required for this decision.', nextActionIds:[], privacy:'PRIVATE' }}
  );
  assert.equal(s.sharedTasks[0].status,'NONE_IDENTIFIED');
  assert.equal(s.returns[0].returnType,'UNRESOLVED');
});
