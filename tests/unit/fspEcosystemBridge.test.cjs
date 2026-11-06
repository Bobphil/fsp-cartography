const test=require('node:test');
const assert=require('node:assert/strict');
const {
  ECOSYSTEM_CONSTITUTION,
  ENVIRONMENT_PROFILES,
  NEPTUNE_VULCAN_PROBE_BINDINGS,
  applicableClaimCeiling,
  canonicalFingerprint,
  canonicalObject,
  projectCanonicalObject,
  projectionDriftAudit,
  returnFromProjection,
  validateBridge
}=require('../../dist/research/fspEcosystemBridge.js');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');

function token(environment){
  return {
    environment,
    originId:'test-origin',
    originLabel:'Test origin',
    depthOrMode:'INSPECT',
    context:['ecosystem-regression']
  };
}

test('ecosystem bridge defines five projection environments',()=>{
  assert.deepEqual(
    ENVIRONMENT_PROFILES.map(x=>x.environment),
    ['ENCYCLOPEDIA','CLASSROOM','VR','APPLICATION','RESEARCH']
  );
});

test('ecosystem constitution freezes projection nonmutation and human return',()=>{
  assert.ok(ECOSYSTEM_CONSTITUTION.some(x=>x.includes('semantic multiplicity')));
  assert.ok(ECOSYSTEM_CONSTITUTION.some(x=>x.includes('may not silently change canonical identity')));
  assert.ok(ECOSYSTEM_CONSTITUTION.some(x=>x.includes('human-authored judgment')));
});

test('all five Neptune/Vulcan probe bindings validate',()=>{
  const result=validateBridge(NEPTUNE_VULCAN_PROBE_BINDINGS,FIVE_CASE_ATLAS);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
});

test('all five environments project exactly the same canonical probe fingerprint',()=>{
  const projections=NEPTUNE_VULCAN_PROBE_BINDINGS.map(b=>
    projectCanonicalObject(b,FIVE_CASE_ATLAS,token(b.environment))
  );
  const audit=projectionDriftAudit(projections);
  assert.equal(audit.passes,true,JSON.stringify(audit.failures));
  assert.equal(audit.fingerprints.length,1);
});

test('projection payloads are clones and cannot mutate canonical Atlas history',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS[0];
  const projected=projectCanonicalObject(binding,FIVE_CASE_ATLAS,token(binding.environment));
  const before=JSON.stringify(canonicalObject(binding.canonical,FIVE_CASE_ATLAS));
  projected.payload.vary.push('ILLEGAL PROJECTION MUTATION');
  const after=JSON.stringify(canonicalObject(binding.canonical,FIVE_CASE_ATLAS));
  assert.equal(after,before);
});

test('projection keeps canonical probe claim ceiling across presentation environments',()=>{
  const expected=applicableClaimCeiling(
    {kind:'PROBE',caseId:'NEPTUNE-VULCAN',objectId:'NV-PROBE-VULCAN'},
    FIVE_CASE_ATLAS
  );
  for(const binding of NEPTUNE_VULCAN_PROBE_BINDINGS){
    const p=projectCanonicalObject(binding,FIVE_CASE_ATLAS,token(binding.environment));
    assert.deepEqual(p.claimCeiling,expected);
  }
});

test('environment-specific metadata does not affect canonical fingerprint',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS[2];
  const a=projectCanonicalObject(binding,FIVE_CASE_ATLAS,token('VR'));
  const custom={...binding,addedMetadata:[...binding.addedMetadata,'headset-model','comfort-setting']};
  const b=projectCanonicalObject(custom,FIVE_CASE_ATLAS,token('VR'));
  assert.equal(a.canonicalFingerprint,b.canonicalFingerprint);
});

test('return token round-trips without semantic substitution',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS[1];
  const origin=token('CLASSROOM');
  origin.originId='class-session-7';
  origin.context=['lesson:revision-targets','student-authored-output'];
  const p=projectCanonicalObject(binding,FIVE_CASE_ATLAS,origin);
  assert.deepEqual(returnFromProjection(p),origin);
});

test('return token environment must match projection environment',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS[2];
  assert.throws(
    ()=>projectCanonicalObject(binding,FIVE_CASE_ATLAS,token('CLASSROOM')),
    /environment mismatch/
  );
});

test('application binding explicitly blocks inherited authorization',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==='APPLICATION');
  assert.match(binding.claimCeilingPolicy,/No societal recommendation or authorization/);
  assert.match(binding.returnContract,/actual domain problem/);
});

test('VR binding distinguishes immersion from evidential standing',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==='VR');
  assert.match(binding.claimCeilingPolicy,/Immersive salience may not increase evidential/);
  assert.ok(binding.addedMetadata.includes('simulation-status marker'));
});

test('classroom binding returns to learner authorship rather than system closure',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==='CLASSROOM');
  assert.match(binding.returnContract,/student-authored claim/);
});

test('research binding evaluates projection rather than certifying ontology',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==='RESEARCH');
  assert.match(binding.claimCeilingPolicy,/not the truth or uniqueness of FSP/);
});

test('canonical fingerprint is stable for repeated resolution',()=>{
  const ref={kind:'PROBE',caseId:'NEPTUNE-VULCAN',objectId:'NV-PROBE-VULCAN'};
  assert.equal(
    canonicalFingerprint(ref,FIVE_CASE_ATLAS),
    canonicalFingerprint(ref,FIVE_CASE_ATLAS)
  );
});
