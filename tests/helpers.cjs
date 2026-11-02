const { createInitialState } = require('../dist/kernel/defaults.js');
const { reducer } = require('../dist/kernel/reducer.js');
const { assertInvariants } = require('../dist/kernel/invariants.js');

function apply(state, ...actions) {
  let s = state;
  for (const action of actions) {
    s = reducer(s, action);
    assertInvariants(s);
  }
  return s;
}
module.exports = { createInitialState, apply };
