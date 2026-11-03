const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const spec = fs.readFileSync('HSF-CHANGE-SPEC-1.md','utf8');

test('HSF change spec limits targets to NODE and CLAIM', () => {
  assert.match(spec,/targetType: "NODE" \| "CLAIM"/);
  assert.match(spec,/Not eligible in this amendment:/);
  assert.match(spec,/PathState/);
});

test('HSF change spec requires non-empty region sets', () => {
  assert.match(spec,/must contain at least one valid H\/S\/F region/);
  assert.match(spec,/\[\][\s\S]{0,20}is invalid/);
});

test('HSF change spec defines duplicate normalization and canonical H,S,F order', () => {
  assert.match(spec,/normalize duplicates away/);
  assert.match(spec,/Canonical stored order/);
  assert.match(spec,/H, S, F/);
});

test('HSF change spec chooses exact no-op for unknown targets', () => {
  assert.match(spec,/Unknown target IDs are exact no-ops/);
  assert.match(spec,/version must not bump/);
});

test('HSF change spec freezes preservation of non-HSF fields', () => {
  assert.match(spec,/Only `hsf` may change/);
  assert.match(spec,/`verification`/);
  assert.match(spec,/`privacy`/);
});

test('HSF change spec requires add-time and later reassignment interaction design', () => {
  assert.match(spec,/Interaction design — add-time placement/);
  assert.match(spec,/Interaction design — later reassignment/);
  assert.match(spec,/Where is this relevant in your map\?/);
});

test('HSF change spec keeps F separate from prediction and recommendation', () => {
  assert.match(spec,/future event will occur/);
  assert.match(spec,/never say "move this into the future"/);
  assert.match(spec,/ranking/);
  assert.match(spec,/recommendation/);
  assert.match(spec,/prediction/);
});

test('HSF change spec protects the 64-test baseline', () => {
  assert.match(spec,/All existing 64 tests remain the protected floor/);
});
