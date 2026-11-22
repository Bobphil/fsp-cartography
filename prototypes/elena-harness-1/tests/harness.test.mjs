import test from 'node:test';
import assert from 'node:assert/strict';
import { STATES } from '../src/states.js';
import { initialState, reducer } from '../src/reducer.js';
import { checkInvariants } from '../src/invariants.js';

test('twelve frozen fixtures exist in canonical order', () => {
  assert.equal(STATES.length, 12);
  assert.deepEqual(STATES.map(s => s.n), [1,2,3,4,5,6,7,8,9,10,11,12]);
});

test('all first eleven states have a next state and last is terminal', () => {
  STATES.slice(0,11).forEach(s => assert.ok(s.next));
  assert.equal(STATES[11].next, null);
});

test('reducer advances deterministically through all twelve states', () => {
  let s = initialState();
  const visited = [s.stateId];
  for (let i=0;i<11;i++) { s = reducer(s,{type:'ADVANCE'}); visited.push(s.stateId); }
  assert.equal(new Set(visited).size, 12);
  assert.equal(s.stateId, 'S12_REOPEN');
});

test('sedation cannot be licensed from the score/threshold pathway', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S8_AUTHORIZATION'});
  s = reducer(s,{type:'LICENSE_ACTION',action:'sedation'});
  assert.equal(s.licensedActions.includes('sedation'), false);
  assert.deepEqual(checkInvariants(s), []);
});

test('monitoring and transfer may be licensed', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S8_AUTHORIZATION'});
  s = reducer(s,{type:'LICENSE_ACTION',action:'monitoring'});
  s = reducer(s,{type:'LICENSE_ACTION',action:'transfer'});
  assert.deepEqual(s.licensedActions.sort(), ['monitoring','transfer']);
});

test('Fit/Misfit cannot validly precede Authorial Return', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S9_AUTHORIAL_RETURN'});
  s = reducer(s,{type:'SET_FIT',value:'fit'});
  assert.ok(checkInvariants(s).some(x => x.startsWith('I-AR')));
});

test('Fit/Misfit is valid after Authorial Return', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S9_AUTHORIAL_RETURN'});
  s = reducer(s,{type:'AUTHORIAL_RETURN'});
  s = reducer(s,{type:'SET_FIT',value:'partial_fit'});
  s = reducer(s,{type:'QUALIFY',text:'No automatic sedation authorization'});
  assert.deepEqual(checkInvariants(s), []);
});

test('Return stages remain explicit and do not auto-progress', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S11_RETURN'});
  s = reducer(s,{type:'SET_RETURN_STAGE',stage:'presence'});
  assert.equal(s.returnStage, 'presence');
  assert.notEqual(s.returnStage, 'uptake');
});

test('recomposition requires selective recovery set', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S12_REOPEN'});
  s = reducer(s,{type:'RECOMPOSE'});
  assert.ok(checkInvariants(s).some(x => x.startsWith('I-REOPEN')));
});

test('recomposition succeeds after required selective recovery', () => {
  let s = initialState();
  s = reducer(s,{type:'GOTO',stateId:'S12_REOPEN'});
  for (const item of ['corrected_lab_value','model_contribution','independent_clinical_evidence','authorization_rationale','consequence']) {
    s = reducer(s,{type:'REOPEN_SELECT',item,selected:true});
  }
  s = reducer(s,{type:'RECOMPOSE'});
  assert.deepEqual(checkInvariants(s), []);
  assert.equal(s.recomposed, true);
});

test('standing is never represented as a scalar in frozen fixtures', async () => {
  const txt = JSON.stringify(STATES);
  assert.equal(txt.includes('standingScore'), false);
  assert.equal(txt.includes('influenceScore'), false);
});
