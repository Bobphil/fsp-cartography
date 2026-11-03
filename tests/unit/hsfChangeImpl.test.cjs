const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { reducer } = require('../../dist/kernel/reducer.js');
const { validateInvariants } = require('../../dist/kernel/invariants.js');
const { normalizeHSFRegions } = require('../../dist/kernel/hsf.js');

function addNode(state, id='n1', hsf=['S']) {
  return reducer(state,{type:'NODE_ADD',payload:{
    id,nodeType:'MY_MAP_OF_OTHER',label:'Person',relevance:['task'],hsf,
    privacy:'PRIVATE',createdBy:'USER',archived:false
  }});
}

function addClaim(state, id='c1', hsf=['S']) {
  return reducer(state,{type:'CLAIM_ADD',payload:{
    id,subjectId:'n1',text:'Claim text',claimType:'USER_INFERENCE',
    verification:'UNVERIFIED',hsf,privacy:'PRIVATE',archived:false
  }});
}

test('HSF normalizer canonicalizes duplicates to H,S,F order', () => {
  assert.deepEqual(normalizeHSFRegions(['S','H','S']),['H','S']);
  assert.deepEqual(normalizeHSFRegions(['F','H']),['H','F']);
  assert.deepEqual(normalizeHSFRegions(['S','F','H']),['H','S','F']);
});

test('HSF normalizer rejects empty and invalid runtime regions', () => {
  assert.throws(()=>normalizeHSFRegions([]),/at least one region/);
  assert.throws(()=>normalizeHSFRegions(['S','X']),/Invalid H\/S\/F region/);
});

test('HSF_SET changes node S to H+S and preserves every non-HSF field', () => {
  let s = addNode(createInitialState('node-preserve'));
  const before = structuredClone(s.nodes[0]);
  const next = reducer(s,{type:'HSF_SET',targetType:'NODE',targetId:'n1',regions:['S','H','S']});
  assert.deepEqual(next.nodes[0].hsf,['H','S']);
  const after = {...next.nodes[0]}; delete after.hsf;
  const expected = {...before}; delete expected.hsf;
  assert.deepEqual(after,expected);
});

test('HSF_SET changes claim S to S+F and preserves every non-HSF field', () => {
  let s = addNode(createInitialState('claim-preserve'));
  s = addClaim(s);
  const before = structuredClone(s.claims[0]);
  const next = reducer(s,{type:'HSF_SET',targetType:'CLAIM',targetId:'c1',regions:['F','S']});
  assert.deepEqual(next.claims[0].hsf,['S','F']);
  const after = {...next.claims[0]}; delete after.hsf;
  const expected = {...before}; delete expected.hsf;
  assert.deepEqual(after,expected);
});

test('HSF_SET can withdraw forward relevance from S+F back to S', () => {
  let s = addNode(createInitialState('withdraw'));
  s = addClaim(s,'c1',['S','F']);
  const next = reducer(s,{type:'HSF_SET',targetType:'CLAIM',targetId:'c1',regions:['S']});
  assert.deepEqual(next.claims[0].hsf,['S']);
});

test('HSF_SET permits H+S+F and adds no predictive fields', () => {
  let s = addNode(createInitialState('all-regions'));
  const next = reducer(s,{type:'HSF_SET',targetType:'NODE',targetId:'n1',regions:['F','S','H']});
  assert.deepEqual(next.nodes[0].hsf,['H','S','F']);
  assert.equal('probability' in next.nodes[0],false);
  assert.equal('recommendation' in next.nodes[0],false);
  assert.equal('prediction' in next.nodes[0],false);
});

test('HSF_SET unknown targets are exact no-ops', () => {
  const s = createInitialState('unknown');
  assert.equal(reducer(s,{type:'HSF_SET',targetType:'NODE',targetId:'missing',regions:['S']}),s);
  assert.equal(reducer(s,{type:'HSF_SET',targetType:'CLAIM',targetId:'missing',regions:['S']}),s);
});

test('HSF_SET same-value normalized assignment is an exact no-op', () => {
  let s = addNode(createInitialState('same'));
  const next = reducer(s,{type:'HSF_SET',targetType:'NODE',targetId:'n1',regions:['S','S']});
  assert.equal(next,s);
});

test('HSF invariants reject empty, duplicate, invalid, and noncanonical arrays', () => {
  const cases = [
    [],
    ['S','S'],
    ['S','H'],
    ['X']
  ];
  for (const hsf of cases) {
    const s = createInitialState('bad-'+hsf.join(''));
    s.nodes.push({
      id:'n',nodeType:'MY_MAP_OF_OTHER',label:'x',relevance:[],
      hsf,privacy:'PRIVATE',createdBy:'USER',archived:false
    });
    assert.match(validateInvariants(s).join('\n'),/canonical H,S,F order/);
  }
});

test('HSF invariants accept canonical non-empty node and claim arrays', () => {
  let s = createInitialState('good');
  s = addNode(s,'n1',['H','S']);
  s = addClaim(s,'c1',['S','F']);
  assert.deepEqual(validateInvariants(s),[]);
});
