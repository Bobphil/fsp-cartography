const test=require('node:test');
const assert=require('node:assert/strict');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');
const {buildRelationGraph}=require('../../dist/research/fspRelationGraph.js');
const {compileNeptuneVulcanClassroomPackage,validateClassroomPackage,CLASSROOM_CONSTITUTION}=require('../../dist/research/fspClassBridge.js');
const {compileNeptuneVulcanVrPackage,validateVrPackage,VR_CONSTITUTION}=require('../../dist/research/fspVrBridge.js');

const graph=buildRelationGraph(FIVE_CASE_ATLAS);
const classroom=compileNeptuneVulcanClassroomPackage(FIVE_CASE_ATLAS,graph);
const vr=compileNeptuneVulcanVrPackage(FIVE_CASE_ATLAS,graph);

test('paired bridges preserve the same canonical fingerprint and claim ceiling',()=>{
  assert.equal(classroom.projection.canonical.fingerprint,vr.projection.canonical.fingerprint);
  assert.deepEqual(classroom.projection.canonical.claimCeiling,vr.projection.canonical.claimCeiling);
});

test('classroom package validates with four consequential moves and student-authored output card',()=>{
  const result=validateClassroomPackage(classroom);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
  assert.equal(classroom.workbook.moves.length,4);
  assert.ok(classroom.outputCard.fields.every(f=>f.author==='STUDENT'));
});

test('classroom constitution keeps journal handoff separate from bounded output card',()=>{
  assert.ok(CLASSROOM_CONSTITUTION.some(x=>x.includes('Journal handoff')));
  assert.match(classroom.journalHandoff.rule,/must not replace or retroactively edit/);
});

test('VR package validates scene replay scaffold fade and debrief',()=>{
  const result=validateVrPackage(vr);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
  assert.ok(vr.scene.replay.enabled);
  assert.equal(vr.scene.scaffoldFade.length,3);
  assert.equal(vr.debrief.mode,'NON_IMMERSIVE');
});

test('VR constitution blocks spatial and immersive semantic inflation',()=>{
  assert.ok(VR_CONSTITUTION.some(x=>x.includes('Spatial arrangement')));
  assert.ok(VR_CONSTITUTION.some(x=>x.includes('Controlled probes remain visibly marked')));
});

test('classroom and VR express different human tasks without semantic drift',()=>{
  assert.equal(classroom.projection.environment,'CLASSROOM');
  assert.equal(vr.projection.environment,'VR');
  assert.notDeepEqual(classroom.projection.transforms,vr.projection.transforms);
  assert.equal(classroom.projection.canonical.fingerprint,vr.projection.canonical.fingerprint);
});

test('classroom output and VR debrief both terminate in human-authored REOPEN',()=>{
  assert.ok(classroom.outputCard.fields.some(f=>f.fieldId==='reopen' && f.required));
  assert.ok(vr.debrief.fields.some(f=>f.fieldId==='reopenCondition' && f.required));
  assert.match(classroom.returnRule,/student/);
  assert.match(vr.returnRule,/participant/);
});

test('VR replay changes tempo not history',()=>{
  assert.match(vr.scene.replay.rule,/not canonical sequence, provenance, or claim strength/);
});

test('scaffold fading removes assistance rather than canonical constraints',()=>{
  const independent=vr.scene.scaffoldFade.find(x=>x.label==='Independent');
  assert.ok(independent.visibleSupports.includes('persistent simulation status'));
  assert.ok(VR_CONSTITUTION.some(x=>x.includes('Scaffold fading removes assistance, not canonical constraints')));
});

test('classroom workbook preserves probe/history and shared-strategy firewalls',()=>{
  const firewalls=classroom.workbook.moves.map(m=>m.firewall).join(' ');
  assert.match(firewalls,/Probe result ≠ historical fact/);
  assert.match(firewalls,/Shared strategy ≠ guaranteed success/);
});
