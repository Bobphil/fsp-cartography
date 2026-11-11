const test=require('node:test');
const assert=require('node:assert/strict');
const {FOUR_MOVE_GOVERNANCE,fourMove,validateFourMoveGovernance}=require('../../dist/research/fourMoveGovernance.js');

test('four-move governance validates and preserves exact move order',()=>{
  const r=validateFourMoveGovernance();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.deepEqual(FOUR_MOVE_GOVERNANCE.moves.map(x=>x.id),['PORTABILITY','CEILING','AUTHORIZATION','RETURN']);
});

test('remainder is cross-cutting rather than a fifth sequential move',()=>{
  assert.equal(FOUR_MOVE_GOVERNANCE.moves.some(x=>x.id==='REMAINDER'),false);
  assert.match(FOUR_MOVE_GOVERNANCE.remainderInvariant.rule,/cross-cutting/i);
});

test('public labels preserve distinct governance questions',()=>{
  assert.match(fourMove('PORTABILITY').publicLabel,/hold here/i);
  assert.match(fourMove('CEILING').publicLabel,/justify/i);
  assert.match(fourMove('AUTHORIZATION').publicLabel,/Who may act/i);
  assert.match(fourMove('RETURN').publicLabel,/reopen/i);
});
