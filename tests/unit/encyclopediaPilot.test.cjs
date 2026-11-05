const test=require('node:test');
const assert=require('node:assert/strict');
const {ENCYCLOPEDIA_PILOT}=require('../../dist/research/encyclopediaPilotConfig.js');
const {routeForSectionCase}=require('../../dist/research/encyclopediaReaderShell.js');

test('Pages pilot is bound to the frozen CH1.2 Neptune/Vulcan route',()=>{
  assert.equal(ENCYCLOPEDIA_PILOT.sectionId,'CH1.2');
  assert.equal(ENCYCLOPEDIA_PILOT.caseId,'NEPTUNE-VULCAN');
  const route=routeForSectionCase(ENCYCLOPEDIA_PILOT.sectionId,ENCYCLOPEDIA_PILOT.caseId);
  assert.equal(route.targets.length,5);
  assert.deepEqual(
    route.targets.map(t=>[t.kind,t.targetId]),
    [
      ['TRANSITION','NV0-NV1'],
      ['TRANSITION','NV1-NV2'],
      ['TRANSITION','NV3-NV4'],
      ['PROBE','NV-PROBE-VULCAN'],
      ['CASE_CLAIM_CEILING','NEPTUNE-VULCAN']
    ]
  );
});

test('Pages pilot prose states the bounded no-universal-rule conclusion',()=>{
  assert.match(ENCYCLOPEDIA_PILOT.prose,/does not support the stronger claim/);
  assert.match(ENCYCLOPEDIA_PILOT.prose,/context-free rule/);
});
