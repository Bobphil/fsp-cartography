const test=require('node:test');
const assert=require('node:assert/strict');

const {
  auditProtocolFidelity,
  compareHumanCoders,
  auditAdjudicationFirewall,
  evaluatePostHumanScaleGate
}=require('../../dist/research/translation12.js');

const base=(coderId,itemId,overrides={})=>({
  coderId,
  packetVersion:'FSP-AIF-HUMAN-TRIAL-1.0',
  protocolVersion:'FSP-AIF-CODER-1.0',
  itemId,
  targetNode:'node-1',
  task:'assess bounded inference',
  claimCeiling:'supports only the represented inference',
  standing:['information node'],
  remainder:['warrant not explicit'],
  reopenCondition:'reopen if linked evidence changes',
  ...overrides
});

test('protocol fidelity passes complete records',()=>{
  const audits=auditProtocolFidelity(
    [base('A','item-1'),base('A','item-2')],
    'FSP-AIF-HUMAN-TRIAL-1.0',
    'FSP-AIF-CODER-1.0'
  );
  assert.equal(audits.length,1);
  assert.equal(audits[0].passes,true);
});

test('protocol fidelity detects version and required-field failures',()=>{
  const audits=auditProtocolFidelity(
    [base('A','item-1',{
      packetVersion:'wrong',
      task:'',
      standing:[],
      reopenCondition:''
    })],
    'FSP-AIF-HUMAN-TRIAL-1.0',
    'FSP-AIF-CODER-1.0'
  );
  assert.equal(audits[0].passes,false);
  assert.ok(audits[0].failures.some(x=>/packet-version-mismatch/.test(x)));
  assert.ok(audits[0].failures.some(x=>/missing-task/.test(x)));
  assert.ok(audits[0].failures.some(x=>/missing-standing/.test(x)));
});

test('human coder comparison separates structural and interpretive agreement',()=>{
  const left=[base('A','item-1'),base('A','item-2')];
  const right=[
    base('B','item-1',{remainder:['different remainder']}),
    base('B','item-2',{standing:['different standing']})
  ];
  const audit=compareHumanCoders(left,right);
  assert.equal(audit.structuralAgreement,1);
  assert.ok(audit.interpretiveAgreement<1);
  assert.equal(audit.passesStructuralThreshold,true);
});

test('human coder comparison fails structural threshold when task coding diverges widely',()=>{
  const left=[base('A','item-1'),base('A','item-2')];
  const right=[
    base('B','item-1',{targetNode:'other',task:'different',claimCeiling:'different'}),
    base('B','item-2',{targetNode:'other',task:'different',claimCeiling:'different'})
  ];
  const audit=compareHumanCoders(left,right);
  assert.equal(audit.passesStructuralThreshold,false);
  assert.ok(audit.structuralAgreement<0.8);
});

test('missing items prevent structural pass',()=>{
  const left=[base('A','item-1'),base('A','item-2')];
  const right=[base('B','item-1')];
  const audit=compareHumanCoders(left,right);
  assert.equal(audit.passesStructuralThreshold,false);
  assert.ok(audit.missingItems.includes('item-2'));
});

test('adjudication firewall passes when originals are preserved and reason is explicit',()=>{
  const originals=[base('A','item-1'),base('B','item-1',{remainder:['different']})];
  const audit=auditAdjudicationFirewall(originals,[{
    itemId:'item-1',
    field:'remainder',
    coderValues:[
      {coderId:'A',value:['warrant not explicit']},
      {coderId:'B',value:['different']}
    ],
    adjudicatedValue:['both remainders retained as bounded alternatives'],
    adjudicatorId:'ADJ-1',
    reason:'coders identify distinct unresolved losses',
    preservesOriginalRecords:true
  }]);
  assert.equal(audit.passes,true);
});

test('adjudication firewall rejects destructive overwrite',()=>{
  const originals=[base('A','item-1'),base('B','item-1')];
  const audit=auditAdjudicationFirewall(originals,[{
    itemId:'item-1',
    field:'task',
    coderValues:[
      {coderId:'A',value:'a'},
      {coderId:'B',value:'b'}
    ],
    adjudicatedValue:'c',
    adjudicatorId:'ADJ-1',
    reason:'merge',
    preservesOriginalRecords:false
  }]);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.some(x=>/original-records-not-preserved/.test(x)));
});

test('post-human scale gate remains pending before real trial execution',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:true,
    completedIndependentCoders:0,
    protocolFidelityPass:false,
    structuralAgreement:0,
    adjudicationFirewallPass:false,
    unresolvedCriticalDisagreements:0,
    humanTrialExecuted:false
  });
  assert.equal(gate.status,'PENDING');
  assert.ok(gate.pendingReasons.includes('human-trial-not-executed'));
  assert.ok(gate.pendingReasons.includes('fewer-than-two-independent-coders'));
});

test('post-human gate cannot pass with only one coder',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:true,
    completedIndependentCoders:1,
    protocolFidelityPass:true,
    structuralAgreement:1,
    adjudicationFirewallPass:true,
    unresolvedCriticalDisagreements:0,
    humanTrialExecuted:true
  });
  assert.equal(gate.status,'PENDING');
});

test('post-human gate passes only after completed two-coder human evidence and safeguards',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:true,
    completedIndependentCoders:2,
    protocolFidelityPass:true,
    structuralAgreement:0.85,
    adjudicationFirewallPass:true,
    unresolvedCriticalDisagreements:0,
    humanTrialExecuted:true
  });
  assert.equal(gate.status,'PASS');
  assert.deepEqual(gate.failures,[]);
  assert.deepEqual(gate.pendingReasons,[]);
});

test('post-human gate fails completed trial below structural threshold',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:true,
    completedIndependentCoders:2,
    protocolFidelityPass:true,
    structuralAgreement:0.79,
    adjudicationFirewallPass:true,
    unresolvedCriticalDisagreements:0,
    humanTrialExecuted:true
  });
  assert.equal(gate.status,'FAIL');
  assert.ok(gate.failures.includes('structural-agreement-below-0.80'));
});

test('post-human gate fails when completed trial violates adjudication firewall',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:true,
    completedIndependentCoders:2,
    protocolFidelityPass:true,
    structuralAgreement:0.9,
    adjudicationFirewallPass:false,
    unresolvedCriticalDisagreements:0,
    humanTrialExecuted:true
  });
  assert.equal(gate.status,'FAIL');
  assert.ok(gate.failures.includes('adjudication-firewall-failed'));
});

test('post-human gate fails unresolved critical disagreement',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:true,
    completedIndependentCoders:2,
    protocolFidelityPass:true,
    structuralAgreement:0.9,
    adjudicationFirewallPass:true,
    unresolvedCriticalDisagreements:1,
    humanTrialExecuted:true
  });
  assert.equal(gate.status,'FAIL');
  assert.ok(gate.failures.includes('critical-disagreements-unresolved'));
});

test('infrastructure regression blocks post-human pass even with strong human metrics',()=>{
  const gate=evaluatePostHumanScaleGate({
    infrastructurePass:false,
    completedIndependentCoders:2,
    protocolFidelityPass:true,
    structuralAgreement:1,
    adjudicationFirewallPass:true,
    unresolvedCriticalDisagreements:0,
    humanTrialExecuted:true
  });
  assert.equal(gate.status,'FAIL');
  assert.ok(gate.failures.includes('infrastructure-not-passed'));
});
