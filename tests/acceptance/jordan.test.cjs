const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');

test('Jordan acceptance journey permits unformed task, sparse future field and investigation without recommendation', () => {
  let s = createInitialState('jordan');
  s = apply(s,
    { type:'TASK_SET', payload:{ id:'task_jordan', status:'UNFORMED', text:'education/work', origin:'USER', privacy:'PRIVATE' }},
    { type:'NODE_ADD', payload:{ id:'jordan', nodeType:'SELF_PRF', label:'Jordan', relevance:['orientation'], hsf:['S'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'NODE_ADD', payload:{ id:'brother', nodeType:'MY_MAP_OF_OTHER', label:'Brother', relevance:['history','information'], hsf:['H'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'CLAIM_ADD', payload:{ id:'brother_report', subjectId:'brother', text:'College was a waste of time for me.', claimType:'OTHER_REPORT', verification:'UNVERIFIED', hsf:['H'], privacy:'PRIVATE', archived:false }},
    { type:'ACTION_ADD', payload:{ id:'explore1', actionType:'INFORMATION_GENERATING', text:'Visit a technical program', status:'PLANNED', privacy:'PRIVATE' }},
    { type:'ACTION_ADD', payload:{ id:'explore2', actionType:'INFORMATION_GENERATING', text:'Talk with career services about short credentials and transfer routes', status:'PLANNED', privacy:'PRIVATE' }},
    { type:'RETURN_ADD', payload:{ id:'ret_jordan', returnType:'INVESTIGATE', whatBecameClearer:'I still do not know what career I want, but I know what I want to explore next.', nextActionIds:['explore1','explore2'], privacy:'PRIVATE' }}
  );
  assert.equal(s.task.status,'UNFORMED');
  assert.equal(s.paths.length,0);
  assert.equal(s.returns[0].returnType,'INVESTIGATE');
  assert.ok(!s.claims.some(c=>/should become|best career|fit/i.test(c.text)));
});
