const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');

test('Leila acceptance journey preserves practical power, real constraint and no manufactured shared task', () => {
  let s = createInitialState('leila');
  s = apply(s,
    { type:'TASK_SET', payload:{ id:'task_leila', status:'FORMED', text:'What educational paths remain open if I pursue art/design?', origin:'USER', privacy:'PRIVATE' }},
    { type:'NODE_ADD', payload:{ id:'leila', nodeType:'SELF_PRF', label:'Leila', relevance:['decision-maker'], hsf:['S','F'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'NODE_ADD', payload:{ id:'father', nodeType:'MY_MAP_OF_OTHER', label:'Father', relevance:['family','funding'], hsf:['S','F'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'CLAIM_ADD', payload:{ id:'father_report', subjectId:'father', text:'I will stop paying tuition if you leave nursing.', claimType:'OTHER_REPORT', verification:'VERIFIED', hsf:['S','F'], privacy:'PRIVATE', archived:false }},
    { type:'CONNECTION_ADD', payload:{ id:'power', sourceId:'father', targetId:'leila', connectionType:'PRACTICAL_POWER', note:'Controls current tuition contribution', status:'USER_CONFIRMED', privacy:'PRIVATE' }},
    { type:'CONSTRAINT_ADD', payload:{ id:'funding', text:'Current family tuition contribution ends if nursing is left', epistemicStatus:'VERIFIED', rigidity:'HARD_CURRENTLY', scope:'current funding source only', targetPathIds:[], privacy:'PRIVATE' }},
    { type:'SHARED_TASK_SET', payload:{ id:'no_shared', participantIds:['leila','father'], status:'NONE_IDENTIFIED', outsideScope:[], privacy:'PRIVATE' }},
    { type:'ACTION_ADD', payload:{ id:'finance', actionType:'INFORMATION_GENERATING', text:'Investigate alternative financing and part-time routes', status:'PLANNED', privacy:'PRIVATE' }},
    { type:'RETURN_ADD', payload:{ id:'ret_leila', returnType:'UNRESOLVED', whatBecameClearer:'The funding condition is a real constraint on the current route, not authority over my career.', nextActionIds:['finance'], remainingUncertainty:'Whether an alternative route is viable', privacy:'PRIVATE' }}
  );
  assert.ok(s.connections.some(c=>c.connectionType==='PRACTICAL_POWER'));
  assert.ok(!s.connections.some(c=>c.connectionType==='AUTHORITY' && c.sourceId==='father'));
  assert.equal(s.constraints[0].epistemicStatus,'VERIFIED');
  assert.equal(s.constraints[0].rigidity,'HARD_CURRENTLY');
  assert.equal(s.sharedTasks[0].status,'NONE_IDENTIFIED');
  assert.equal(s.returns[0].returnType,'UNRESOLVED');
});
