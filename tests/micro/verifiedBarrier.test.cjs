const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');

test('verified institutional barrier stays verified through unrelated changes', () => {
  let s = createInitialState('barrier');
  s = apply(s,
    { type:'CONSTRAINT_ADD', payload:{ id:'barrier1', text:'College does not offer the program', epistemicStatus:'VERIFIED', rigidity:'HARD_CURRENTLY', scope:'current institution', targetPathIds:['p1'], privacy:'PRIVATE' }},
    { type:'TITLE_SET', title:'Verified barrier test' },
    { type:'NAVIGATE', view:'RETURN' }
  );
  const c = s.constraints[0];
  assert.equal(c.epistemicStatus,'VERIFIED');
  assert.equal(c.rigidity,'HARD_CURRENTLY');
  assert.equal(c.scope,'current institution');
});
