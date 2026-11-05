const test=require('node:test');
const assert=require('node:assert/strict');

const {
  validateSedimentationNetwork,
  auditConceptCoevolution,
  auditPolicyPracticeFeedback,
  auditHistoricalLockIn,
  evaluateRepairWindow,
  auditCrossGenerationalCapability
}=require('../../dist/research/revision8.js');

const {
  institutionalNetwork,
  feedbackLoop,
  repairWindow,
  capabilityRecords,
  conceptGenealogies
}=require('../../dist/research/revision8Fixtures.js');

test('sedimentation network has no dangling edges',()=>{
  assert.deepEqual(validateSedimentationNetwork(institutionalNetwork),[]);
});

test('network validator detects dangling edges',()=>{
  const bad=structuredClone(institutionalNetwork);
  bad.edges.push({
    edgeId:'bad',
    fromNodeId:'missing',
    toNodeId:'policy-review',
    type:'ENCODES',
    rationale:'bad edge'
  });
  assert.ok(validateSedimentationNetwork(bad).includes('bad:dangling-edge'));
});

test('multiple concepts can coevolve through shared institutions',()=>{
  const audit=auditConceptCoevolution(
    conceptGenealogies,
    ['review-office','institution'],
    ['shared vocabulary may narrow origin meanings'],
    ['both concepts shift toward procedural review language']
  );
  assert.equal(audit.conceptIds.length,2);
  assert.equal(audit.mutuallyReinforcing,true);
});

test('coevolution requires at least two concept genealogies',()=>{
  assert.throws(
    ()=>auditConceptCoevolution([conceptGenealogies[0]],[],[],[]),
    /at least two/
  );
});

test('policy practice feedback validates known network nodes',()=>{
  const audit=auditPolicyPracticeFeedback(institutionalNetwork,feedbackLoop);
  assert.equal(audit.policyShapesPractice,true);
  assert.equal(audit.practiceFeedsPolicy,true);
  assert.ok(audit.amplification.length>0);
});

test('policy practice feedback rejects unknown nodes',()=>{
  const bad=structuredClone(feedbackLoop);
  bad.practiceNodeId='missing';
  assert.throws(
    ()=>auditPolicyPracticeFeedback(institutionalNetwork,bad),
    /unknown node/
  );
});

test('historical lock-in detects switching costs reinforcing loops and suppressed alternatives',()=>{
  const audit=auditHistoricalLockIn(institutionalNetwork,{
    switchingCosts:[
      'staff retraining',
      'software workflow replacement'
    ],
    reinforcingLoops:[
      'policy-practice-training loop',
      'practice-policy feedback'
    ],
    alternativesSuppressed:[
      'nonstandard complaint vocabulary'
    ]
  });
  assert.equal(audit.pathDependencePresent,true);
  assert.equal(audit.lockInStrength,'HIGH');
  assert.equal(audit.lockInJustifiesContinuation,false);
});

test('lock-in is not inferred when no path-dependence indicators are supplied',()=>{
  const audit=auditHistoricalLockIn(institutionalNetwork,{
    switchingCosts:[],
    reinforcingLoops:[],
    alternativesSuppressed:[]
  });
  assert.equal(audit.pathDependencePresent,false);
  assert.equal(audit.lockInStrength,'LOW');
  assert.equal(audit.lockInJustifiesContinuation,false);
});

test('repair window opens only when all opening conditions are active',()=>{
  const result=evaluateRepairWindow(repairWindow,{
    activeConditions:[
      'scheduled-review-active',
      'new-evidence-available',
      'affected-participants-have-standing'
    ],
    blockedConditions:[]
  });
  assert.equal(result.windowOpen,true);
  assert.equal(result.repairMandatory,false);
});

test('repair window remains closed if an opening condition is missing',()=>{
  const result=evaluateRepairWindow(repairWindow,{
    activeConditions:[
      'scheduled-review-active',
      'new-evidence-available'
    ],
    blockedConditions:[]
  });
  assert.equal(result.windowOpen,false);
});

test('repair window closes under severe retaliation risk',()=>{
  const result=evaluateRepairWindow(repairWindow,{
    activeConditions:[
      'scheduled-review-active',
      'new-evidence-available',
      'affected-participants-have-standing'
    ],
    blockedConditions:['retaliation-risk-severe']
  });
  assert.equal(result.windowOpen,false);
});

test('capability audit detects expansion mixed effects and later constraint',()=>{
  const audit=auditCrossGenerationalCapability(
    'effective-voice',
    capabilityRecords
  );
  assert.deepEqual(audit.expansionGenerations,[1,2]);
  assert.deepEqual(audit.mixedGenerations,[3]);
  assert.deepEqual(audit.constraintGenerations,[4]);
  assert.equal(audit.intergenerationalAsymmetry,true);
});

test('historical benefit never justifies current burden',()=>{
  const audit=auditCrossGenerationalCapability(
    'effective-voice',
    capabilityRecords
  );
  assert.equal(audit.historicalBenefitJustifiesCurrentBurden,false);
  assert.match(audit.currentRepairQuestion,/preserve warranted inherited benefits/);
});

test('capability audit rejects missing capability records',()=>{
  assert.throws(
    ()=>auditCrossGenerationalCapability('missing',capabilityRecords),
    /no capability records/
  );
});

test('cross-generational audit preserves inherited network provenance',()=>{
  const audit=auditCrossGenerationalCapability(
    'effective-voice',
    capabilityRecords
  );
  const later=audit.records.find(r=>r.generation===4);
  assert.ok(later.inheritedFromNodeIds.includes('policy-review'));
  assert.ok(later.inheritedFromNodeIds.includes('resource-training'));
});
