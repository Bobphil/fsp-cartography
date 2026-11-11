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


test('phenomenal Doing is the inquiry origin without first-person infallibility',()=>{
  const text=FSP_PUBLIC_ORIENTATION.phenomenalDoing.join(' ');
  assert.match(text,/Phenomenal Doing/);
  assert.match(text,/not a guarantee that the first interpretation is correct/i);
  assert.match(text,/phenomenology-first in entry and return/i);
});

test('existential questions are legitimate full-stack inquiries without universal answers',()=>{
  const text=FSP_PUBLIC_ORIENTATION.existentialInquiry.join(' ');
  assert.match(text,/Why am I here\?/);
  assert.match(text,/What is the meaning of my life\?/);
  assert.match(text,/What am I\?/);
  assert.match(text,/Authorial Return/);
});

test('human-centered inquiry relation does not become human-centered cosmology',()=>{
  const text=FSP_PUBLIC_ORIENTATION.humanCenteredInquiryRelation.join(' ');
  assert.match(text,/center of the inquiry relation/i);
  assert.match(text,/does not mean human-centered cosmology/i);
  assert.match(text,/Map ≠ World ≠ Person/);
});

test('explanation and meaning remain constitutionally distinct',()=>{
  assert.ok(FSP_PUBLIC_ORIENTATION.explanationMeaningFirewall.includes(
    "Explanation of the conditions that produced a person ≠ authorship of that person's meaning."
  ));
  assert.ok(FSP_PUBLIC_ORIENTATION.explanationMeaningFirewall.includes(
    "Causal location in a system ≠ existential location within a life."
  ));
});

test('complexity comparator preserves world-generative inquiry-generative and authorial layers',()=>{
  const text=FSP_PUBLIC_ORIENTATION.complexityComparatorBoundary.join(' ');
  assert.match(text,/complexity science/i);
  assert.match(text,/world-generative/i);
  assert.match(text,/inquiry-generative/i);
  assert.match(text,/authorial/i);
  assert.match(text,/without becoming one/i);
});

test('orientation now exposes phenomenal existential explanation and complexity sections',()=>{
  const ids=new Set(FSP_PUBLIC_ORIENTATION.sections.map(x=>x.id));
  for(const id of ['PHENOMENAL-DOING','EXISTENTIAL-INQUIRY','HUMAN-CENTER','EXPLANATION-MEANING','COMPLEXITY-COMPARATOR']) assert.ok(ids.has(id),id);
});

test('orientation distinguishes present governance architecture from completion horizon',()=>{
  assert.ok(FSP_PUBLIC_ORIENTATION.presentStatus.some(x=>/translational and governance architecture/i.test(x)));
  assert.ok(FSP_PUBLIC_ORIENTATION.presentStatus.some(x=>/not presently a complete/i.test(x)));
  assert.ok(FSP_PUBLIC_ORIENTATION.completionHorizon.some(x=>/successor/i.test(x)));
  assert.match(FSP_PUBLIC_ORIENTATION.successorPrinciple,/not to the permanent survival/i);
});
