const test=require('node:test');
const assert=require('node:assert/strict');
const {
  PROJECTION_PROFILES,
  NEPTUNE_VULCAN_PROFILE_EXAMPLES,
  compileAllNeptuneVulcanPackages,
  compileProjectionPackage,
  profileFor,
  validateProjectionPackage,
  validateProjectionProfiles
}=require('../../dist/research/fspProjectionProfiles.js');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');
const {NEPTUNE_VULCAN_PROBE_BINDINGS}=require('../../dist/research/fspEcosystemBridge.js');
const {buildRelationGraph}=require('../../dist/research/fspRelationGraph.js');

const graph=buildRelationGraph(FIVE_CASE_ATLAS);

test('five production profiles validate as one-per-environment',()=>{
  const result=validateProjectionProfiles();
  assert.equal(result.passes,true,JSON.stringify(result.failures));
  assert.equal(PROJECTION_PROFILES.length,5);
});

test('all profiles protect claim ceiling and require canonical fingerprint retention',()=>{
  for(const p of PROJECTION_PROFILES){
    assert.ok(p.forbiddenMutations.includes('claim ceiling'));
    assert.ok(p.completionCriteria.some(x=>x.includes('canonical fingerprint retained')));
  }
});

test('each profile has explicit expose hide transform add return and relation policies',()=>{
  for(const p of PROJECTION_PROFILES){
    assert.ok(p.expose.length>0);
    assert.ok(p.transform.length>0);
    assert.ok(p.hideByDefault.length>0);
    assert.ok(p.requiredAdditions.length>0);
    assert.ok(p.allowedRelationTypes.length>0);
    assert.ok(p.requiredReturnFields.length>0);
  }
});

test('all five Neptune/Vulcan production packages compile and validate',()=>{
  const packages=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph);
  assert.equal(packages.length,5);
  for(const pkg of packages){
    const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment===pkg.environment);
    const result=validateProjectionPackage(pkg,binding,FIVE_CASE_ATLAS,graph);
    assert.equal(result.passes,true,`${pkg.environment}: ${JSON.stringify(result.failures)}`);
  }
});

test('all production packages retain one canonical fingerprint and claim ceiling',()=>{
  const packages=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph);
  assert.equal(new Set(packages.map(x=>x.canonical.fingerprint)).size,1);
  assert.equal(new Set(packages.map(x=>JSON.stringify(x.canonical.claimCeiling))).size,1);
});

test('classroom package exposes learner return requirements',()=>{
  const pkg=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph).find(x=>x.environment==='CLASSROOM');
  assert.deepEqual(pkg.return.requiredFields,['studentClaim','studentReason','remainingUncertainty','reopenCondition']);
  assert.match(pkg.return.artifactType,/learner-authored/);
  assert.ok(pkg.statusMarkers.includes('student-authored-versus-system-supplied'));
});

test('VR package requires simulation status debrief and semantic-spatial firewall',()=>{
  const pkg=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph).find(x=>x.environment==='VR');
  assert.equal(pkg.additions.simulationStatus,'controlled revision space — not historical actuality');
  assert.ok(pkg.additions.debriefSchema);
  assert.ok(pkg.statusMarkers.includes('spatial-relation-versus-semantic-relation'));
  assert.match(pkg.return.artifactType,/non-immersive/);
});

test('application package cannot inherit authorization from historical case',()=>{
  const pkg=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph).find(x=>x.environment==='APPLICATION');
  assert.match(pkg.additions.permissionsModel,/no recommendation or authorization inherited/);
  assert.ok(pkg.statusMarkers.includes('recommendation-versus-authorization'));
  assert.ok(pkg.governance.forbiddenMutations.includes('domain authority'));
});

test('research package requires failure criteria and cannot certify ontology',()=>{
  const pkg=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph).find(x=>x.environment==='RESEARCH');
  assert.ok(pkg.additions.failureCriteria);
  assert.ok(pkg.governance.completionCriteria.some(x=>x.includes('result cannot certify ontology')));
});

test('compiler rejects missing required environment additions',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==='VR');
  const token={environment:'VR',originId:'x',originLabel:'x',depthOrMode:'IMMERSIVE',context:[]};
  assert.throws(
    ()=>compileProjectionPackage(binding,FIVE_CASE_ATLAS,graph,token,{},NEPTUNE_VULCAN_PROFILE_EXAMPLES.VR.statusMarkers),
    /missing required additions/
  );
});

test('compiler rejects missing required status markers',()=>{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==='APPLICATION');
  const token={environment:'APPLICATION',originId:'x',originLabel:'x',depthOrMode:'DOMAIN-BOUND',context:[]};
  assert.throws(
    ()=>compileProjectionPackage(binding,FIVE_CASE_ATLAS,graph,token,NEPTUNE_VULCAN_PROFILE_EXAMPLES.APPLICATION.additions,[]),
    /missing required status markers/
  );
});

test('package relation context is restricted by environment profile',()=>{
  const packages=compileAllNeptuneVulcanPackages(FIVE_CASE_ATLAS,graph);
  for(const pkg of packages){
    const profile=profileFor(pkg.environment);
    assert.deepEqual(pkg.relationContext.allowedRelationTypes,profile.allowedRelationTypes);
  }
});

test('hidden facets remain distinct from visible facets',()=>{
  for(const p of PROJECTION_PROFILES){
    assert.equal(p.expose.some(x=>p.hideByDefault.includes(x)),false);
  }
});
