const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { reducer } = require('../../dist/kernel/reducer.js');
const { VIEW_ORDER, VIEW_CONTRACTS, buildShellViewModel } = require('../../dist/shell/contract.js');

test('seven-view shell contract is complete, ordered, navigable and carries explicit empty states', () => {
  assert.deepEqual(VIEW_ORDER,['START','PEOPLE','INSTITUTION','HSF','CONNECTIONS','INVESTIGATE','RETURN']);
  assert.equal(Object.keys(VIEW_CONTRACTS).length,7);
  for (const id of VIEW_ORDER) {
    assert.equal(VIEW_CONTRACTS[id].id,id);
    assert.ok(VIEW_CONTRACTS[id].purpose.length>0);
    assert.ok(VIEW_CONTRACTS[id].emptyState.length>0);
    assert.ok(VIEW_CONTRACTS[id].carries.length>0);
  }

  let s = createInitialState('shell');
  for (const id of VIEW_ORDER) {
    s = reducer(s,{type:'NAVIGATE',view:id});
    const vm = buildShellViewModel(s);
    assert.equal(vm.current.id,id);
    assert.equal(vm.navigation.filter(x=>x.active).length,1);
  }
});
