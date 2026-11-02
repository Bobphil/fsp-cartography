const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');

test('Maya acceptance journey preserves provenance, unranked paths, bounded return and private output', () => {
  let s = createInitialState('maya');
  s = apply(s,
    { type:'TASK_SET', payload:{ id:'task_maya', status:'FORMED', text:'Which healthcare paths should I investigate before making a larger educational commitment?', origin:'USER_CONFIRMED', privacy:'PRIVATE' }},
    { type:'NODE_ADD', payload:{ id:'maya', nodeType:'SELF_PRF', label:'Maya', relevance:['decision-maker'], hsf:['S'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'NODE_ADD', payload:{ id:'mother', nodeType:'MY_MAP_OF_OTHER', label:'Mother', relevance:['family','affected'], hsf:['H','S','F'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'CLAIM_ADD', payload:{ id:'c_inference', subjectId:'mother', text:'Mom wants me to become a nurse.', claimType:'USER_INFERENCE', verification:'UNVERIFIED', hsf:['S'], privacy:'PRIVATE', archived:false }},
    { type:'CLAIM_ADD', payload:{ id:'c_report', subjectId:'mother', text:"I don't want you spending ten years in school and ending up with huge debt.", claimType:'OTHER_REPORT', verification:'UNVERIFIED', hsf:['S'], privacy:'PRIVATE', archived:false }},
    { type:'NODE_ADD', payload:{ id:'college', nodeType:'INSTITUTION', label:'Harbor Community College', relevance:['pathway','information'], hsf:['S','F'], privacy:'PRIVATE', createdBy:'USER', archived:false }},
    { type:'PATH_ADD', payload:{ id:'physician', name:'Physician', status:'EXPLORATORY', requirements:[], unknowns:['actual cost'], constraintIds:[], nextActionIds:[], privacy:'PRIVATE', origin:'USER', acceptedIntoMap:true }},
    { type:'PATH_ADD', payload:{ id:'nursing', name:'Registered Nurse', status:'EXPLORATORY', requirements:[], unknowns:[], constraintIds:[], nextActionIds:[], privacy:'PRIVATE', origin:'USER', acceptedIntoMap:true }},
    { type:'PATH_ADD', payload:{ id:'pa', name:'Physician Assistant', status:'EXPLORATORY', requirements:[], unknowns:[], constraintIds:[], nextActionIds:[], privacy:'PRIVATE', origin:'SYSTEM_CANDIDATE', acceptedIntoMap:false }},
    { type:'PATH_ACCEPT', pathId:'pa' },
    { type:'PATH_ADD', payload:{ id:'rt', name:'Respiratory Therapist', status:'EXPLORATORY', requirements:[], unknowns:[], constraintIds:[], nextActionIds:[], privacy:'PRIVATE', origin:'SYSTEM_CANDIDATE', acceptedIntoMap:false }},
    { type:'PATH_ACCEPT', pathId:'rt' },
    { type:'CONSTRAINT_ADD', payload:{ id:'cost', text:'Medical school is financially impossible', epistemicStatus:'ASSUMED', rigidity:'UNKNOWN', scope:'physician path', targetPathIds:['physician'], privacy:'PRIVATE' }},
    { type:'CONSTRAINT_SET_STATUS', constraintId:'cost', epistemicStatus:'UNKNOWN', rigidity:'UNKNOWN' },
    { type:'SHARED_TASK_SET', payload:{ id:'shared1', participantIds:['maya','mother'], status:'CONFIRMED', text:'Clarify actual training and financial concerns', outsideScope:['Agreement on final profession'], privacy:'PRIVATE' }},
    { type:'ACTION_ADD', payload:{ id:'a1', actionType:'INFORMATION_GENERATING', text:'Meet a healthcare adviser', status:'PLANNED', privacy:'PRIVATE' }},
    { type:'ACTION_ADD', payload:{ id:'a2', actionType:'INFORMATION_GENERATING', text:'Shadow or interview two healthcare professionals', status:'PLANNED', privacy:'PRIVATE' }},
    { type:'REOPEN_ADD', payload:{ id:'r1', targetType:'TASK', targetId:'task_maya', condition:'After direct occupational exposure or verified financial information', status:'OPEN', privacy:'PRIVATE' }},
    { type:'RETURN_ADD', payload:{ id:'ret1', returnType:'INVESTIGATE', whatBecameClearer:'I need direct experience of healthcare work before choosing a profession.', currentJudgment:'Healthcare remains a serious direction.', notClaiming:'I am not choosing a final profession.', nextActionIds:['a1','a2'], reopenId:'r1', privacy:'PRIVATE' }},
    { type:'OUTPUT_CARD_ADD', payload:{ id:'out1', returnId:'ret1', taskText:'Which healthcare paths should I investigate?', importantChange:'Inference about mother separated from her direct report.', currentJudgment:'Healthcare remains a serious direction.', nextActions:['Meet adviser','Shadow/interview professionals'], claimCeiling:'Choosing what to investigate next, not a final career.', reopenCondition:'After direct experience or verified financial information', privacy:'PRIVATE', sourceObjectIds:['ret1'] }}
  );
  assert.equal(s.claims.find(c=>c.id==='c_inference').claimType,'USER_INFERENCE');
  assert.equal(s.claims.find(c=>c.id==='c_report').claimType,'OTHER_REPORT');
  assert.ok(s.paths.filter(p=>p.acceptedIntoMap).length > 2);
  assert.equal(s.constraints.find(c=>c.id==='cost').epistemicStatus,'UNKNOWN');
  assert.equal(s.returns[0].returnType,'INVESTIGATE');
  assert.equal(s.outputCards[0].privacy,'PRIVATE');
  assert.equal(s.sharedTasks[0].outsideScope[0],'Agreement on final profession');
});
