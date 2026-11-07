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

test('human information-transformation arc runs from lived noticing through consequence and return',()=>{
  assert.deepEqual(FSP_PUBLIC_ORIENTATION.inquiryArc,[
    'Lived Doing','Noticing','Attention','Mapping','Inquiry','Representation','Evidence & Interpretation','Revision',
    'Possibility','Judgment','Authorization','Action','Consequence','Authorial Return','Changed Lived Doing','REOPEN'
  ]);
  assert.deepEqual(FSP_PUBLIC_ORIENTATION.humanInformationArc,FSP_PUBLIC_ORIENTATION.inquiryArc);
});

test('full-stack has architectural computer-science inheritance rather than metaphor only',()=>{
  const text=[...FSP_PUBLIC_ORIENTATION.fullStackMeaning,...FSP_PUBLIC_ORIENTATION.architecturalInheritance].join(' ');
  assert.match(text,/computer science/i);
  assert.match(text,/full-stack computing/i);
  assert.match(text,/layers, interfaces, dependencies, and downstream/i);
});

test('anti-reduction firewall blocks computational theory of the person',()=>{
  const text=FSP_PUBLIC_ORIENTATION.antiReductionFirewall.join(' ');
  assert.match(text,/not exhausted by computation/i);
  assert.match(text,/embodiment/i);
  assert.match(text,/meaning/i);
  assert.match(text,/agency/i);
  assert.match(text,/authorship/i);
  assert.match(text,/Shared architectural grammar does not imply shared domain ontology/);
});

test('public arc is compressed presentation, not semantic replacement',()=>{
  assert.deepEqual(FSP_PUBLIC_ORIENTATION.publicInquiryArc,[
    'Lived Doing','Noticing','Inquiry','Representation','Revision','Judgment','Action','Consequence','Authorial Return','REOPEN'
  ]);
  for(const step of FSP_PUBLIC_ORIENTATION.publicInquiryArc) assert.ok(FSP_PUBLIC_ORIENTATION.humanInformationArc.includes(step),step);
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
