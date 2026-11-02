const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { reducer } = require('../../dist/kernel/reducer.js');

test('reducer is deterministic and does not mutate its input', () => {
  const s = createInitialState('determinism');
  const before = structuredClone(s);
  const action = { type:'TITLE_SET', title:'A bounded map' };
  const a = reducer(s, action);
  const b = reducer(s, action);
  assert.deepEqual(a, b);
  assert.deepEqual(s, before);
  assert.equal(a.updatedAt, s.updatedAt);
  assert.equal(a.version, 1);
});

test('missing-target edits are exact no-ops', () => {
  const s = createInitialState('missing');
  assert.equal(reducer(s,{type:'CLAIM_RECLASSIFY',claimId:'missing',claimType:'OBSERVATION'}), s);
  assert.equal(reducer(s,{type:'PATH_ACCEPT',pathId:'missing'}), s);
  assert.equal(reducer(s,{type:'CONSTRAINT_SET_STATUS',constraintId:'missing',epistemicStatus:'VERIFIED',rigidity:'HARD_CURRENTLY'}), s);
});

test('rejected Coach semantic keys cannot re-enter as pending proposals', () => {
  let s = createInitialState('coach-hardening');
  s = reducer(s,{type:'TASK_SET',payload:{id:'task1',status:'FORMED',text:'Explore',origin:'USER',privacy:'PRIVATE'}});
  s = reducer(s,{type:'COACH_RECORD_ADD',payload:{id:'c1',semanticKey:'KEY',trigger:'T',proposal:'P'}});
  s = reducer(s,{type:'COACH_PROPOSAL_REJECT',coachRecordId:'c1',taskId:'task1'});
  const next = reducer(s,{type:'COACH_RECORD_ADD',payload:{id:'c2',semanticKey:'KEY',trigger:'T2',proposal:'P2'}});
  assert.equal(next, s);
  assert.equal(next.coachRecords.length,1);
});

test('course projection preserves the private original and requires a distinct id', () => {
  let s = createInitialState('projection');
  s = reducer(s,{type:'CLAIM_ADD',payload:{id:'p1',subjectId:'self',text:'private',claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false}});
  const privateBefore = structuredClone(s.claims[0]);
  const next = reducer(s,{type:'PRIVACY_PROJECT_TO_COURSE',sourceObjectType:'CLAIM',sourceObjectId:'p1',projected:{id:'c1',subjectId:'self',text:'abstracted',claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'COURSE',archived:false}});
  assert.deepEqual(next.claims.find(x=>x.id==='p1'), privateBefore);
  assert.equal(next.claims.find(x=>x.id==='c1').privacy,'COURSE');
  assert.throws(()=>reducer(s,{type:'PRIVACY_PROJECT_TO_COURSE',sourceObjectType:'CLAIM',sourceObjectId:'p1',projected:{...privateBefore,privacy:'COURSE'}}),/distinct object id/);
});

test('course projection rejects missing sources and non-course destinations', () => {
  const s = createInitialState('projection-errors');
  const projected = {id:'c1',subjectId:'self',text:'x',claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'COURSE',archived:false};
  assert.throws(()=>reducer(s,{type:'PRIVACY_PROJECT_TO_COURSE',sourceObjectType:'CLAIM',sourceObjectId:'missing',projected}),/not found/);
  assert.throws(()=>reducer(s,{type:'PRIVACY_PROJECT_TO_COURSE',sourceObjectType:'CLAIM',sourceObjectId:'missing',projected:{...projected,privacy:'PRIVATE'}}),/COURSE privacy/);
});

test('navigation changes only the current view and is idempotent on the active view', () => {
  const s = createInitialState('nav');
  const next = reducer(s,{type:'NAVIGATE',view:'PEOPLE'});
  assert.equal(next.currentView,'PEOPLE');
  assert.equal(next.version,s.version);
  assert.equal(reducer(next,{type:'NAVIGATE',view:'PEOPLE'}),next);
});
