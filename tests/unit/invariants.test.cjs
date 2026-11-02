const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { validateInvariants, assertInvariants } = require('../../dist/kernel/invariants.js');

const self = id => ({id,nodeType:'SELF_PRF',label:id,relevance:[],hsf:['S'],privacy:'PRIVATE',createdBy:'USER',archived:false});

test('clean initial state satisfies invariants', () => {
  assert.deepEqual(validateInvariants(createInitialState('clean')),[]);
});

test('duplicate ids across typed collections are rejected', () => {
  const s = createInitialState('dup');
  s.nodes.push(self('same'));
  s.claims.push({id:'same',subjectId:'same',text:'x',claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false});
  assert.match(validateInvariants(s).join('\n'),/Duplicate id same/);
});

test('map may contain at most one SELF_PRF', () => {
  const s = createInitialState('self');
  s.nodes.push(self('self1'),self('self2'));
  assert.match(validateInvariants(s).join('\n'),/at most one SELF_PRF/);
});

test('privacy and rejected-Coach integrity violations are surfaced by assertInvariants', () => {
  const s = createInitialState('integrity');
  s.claims.push(
    {id:'same',subjectId:'x',text:'private',claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'PRIVATE',archived:false},
    {id:'same',subjectId:'x',text:'course',claimType:'SELF_REPORT',verification:'UNVERIFIED',hsf:['S'],privacy:'COURSE',archived:false}
  );
  s.rejectedInterpretations.push({id:'r1',taskId:'t',semanticKey:'K',originalProposal:'p',doNotReuse:true});
  s.coachRecords.push({id:'c1',semanticKey:'K',trigger:'t',proposal:'p2',disposition:'PENDING'});
  assert.throws(()=>assertInvariants(s),/PRIVATE and COURSE|Rejected coach key/);
});
