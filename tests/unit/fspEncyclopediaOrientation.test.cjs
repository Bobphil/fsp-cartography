const test=require('node:test');
const assert=require('node:assert/strict');
const {
  FSP_PUBLIC_ORIENTATION,
  validateFspPublicOrientation
}=require('../../dist/research/fspEncyclopediaOrientation.js');

test('public FSP orientation validates',()=>{
  const r=validateFspPublicOrientation();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('orientation begins from a human inquiry problem rather than formalism',()=>{
  assert.match(FSP_PUBLIC_ORIENTATION.originProblem.join(' '),/Human inquiry rarely happens only at the level of arguments or theories/);
  assert.doesNotMatch(FSP_PUBLIC_ORIENTATION.originProblem.join(' '),/state vector|reducer|relation graph/i);
});

test('full-stack metaphor does not become universal ontology',()=>{
  const text=FSP_PUBLIC_ORIENTATION.fullStackMeaning.join(' ');
  assert.match(text,/not a universal ontology/i);
  assert.match(text,/Ethics, science, history, logic, aesthetics/);
});

test('orientation preserves four constitutional commitments',()=>{
  assert.deepEqual(FSP_PUBLIC_ORIENTATION.constitutionalCommitments.map(x=>x.title),[
    'Authorial Capability','Cognitive Prosthesis','Translational Governance','Return to Lived Doing'
  ]);
});

test('governing firewalls are public and ordinary-language readable',()=>{
  for(const x of ['Map ≠ World ≠ Person','Generate ≠ Recommend ≠ Authorize','Possibility ≠ prediction','Historical explanation ≠ present justification']){
    assert.ok(FSP_PUBLIC_ORIENTATION.governingDistinctions.includes(x),x);
  }
});

test('inquiry arc ends in Authorial Return and REOPEN',()=>{
  assert.deepEqual(FSP_PUBLIC_ORIENTATION.inquiryArc,[
    'Lived Doing','Inquiry','Representation','Revision','Bounded Judgment','Authorial Return','REOPEN'
  ]);
});

test('orientation states what FSP is not',()=>{
  const text=FSP_PUBLIC_ORIENTATION.notClaims.join(' ');
  assert.match(text,/not another ethical theory/i);
  assert.match(text,/not a universal philosophy-of-science theory/i);
  assert.match(text,/not a single decision procedure/i);
  assert.match(text,/not a vocabulary students must master/i);
});

test('no-framework-prerequisite boundary remains explicit',()=>{
  const text=FSP_PUBLIC_ORIENTATION.noPrerequisiteBoundary.join(' ');
  assert.match(text,/without first learning FSP/i);
  assert.match(text,/domain-native inquiry remains primary/i);
});

test('orientation contains a direct reader question about prerequisite status',()=>{
  assert.ok(FSP_PUBLIC_ORIENTATION.sections.some(x=>x.title==='Do I need to learn FSP before using this Encyclopedia?'));
});
