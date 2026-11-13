const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  DEVELOPMENTAL_STAGES,
  DEVELOPMENTAL_EVIDENCE,
  stageById,
  evidenceForStage,
  validateDevelopmentalEntry
}=require('../../dist/research/fspVrDevelopmentalEntry.js');

const root=path.join(__dirname,'../..');
const proto=path.join(root,'prototypes/developmental-entry-1');

test('developmental entry sequence is complete and internally consistent',()=>{
  const r=validateDevelopmentalEntry();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
  assert.equal(DEVELOPMENTAL_STAGES.length,13);
  assert.equal(DEVELOPMENTAL_STAGES[0].id,'D0_PEDAGOGICAL_ZERO');
  assert.equal(DEVELOPMENTAL_STAGES.at(-1).id,'D12_LIFE_LOTTERY_HANDOFF');
});

test('learner encounters experience before most FSP vocabulary is revealed',()=>{
  assert.deepEqual(stageById('D0_PEDAGOGICAL_ZERO').vocabularyReveal,[]);
  assert.deepEqual(stageById('D1_CONTROL').vocabularyReveal,[]);
  assert.ok(stageById('D2_RESISTANCE').vocabularyReveal.includes('capability'));
  assert.ok(stageById('D8_EVIDENCE_INSPECTION').vocabularyReveal.includes('claim ceiling'));
});

test('minimal Doing sequence separates control influence other agency and uncertainty',()=>{
  assert.ok(stageById('D2_RESISTANCE').newlyAvailableDistinctions.includes('controlled/uncontrolled'));
  assert.ok(stageById('D3_OTHER_AGENT').newlyAvailableDistinctions.includes('self/other'));
  assert.ok(stageById('D4_DEPENDENCY').firewalls.includes('influence ≠ control'));
  assert.ok(stageById('D5_EXPECTATION').firewalls.includes('regularity ≠ necessity'));
});

test('social evaluation stage includes original and replication-sensitive evidence',()=>{
  const ev=evidenceForStage('D6_HELPER_HINDERER');
  assert.deepEqual(ev.map(x=>x.id),['DEV-S01','DEV-S02','DEV-S03']);
  assert.ok(ev.some(x=>/multi-lab/i.test(x.replicationStatus)));
  assert.ok(ev.every(x=>x.claimCeiling.length>20));
});

test('similarity stage does not convert early preference into moral authorization',()=>{
  const s=stageById('D7_SIMILARITY_DIFFERENCE');
  assert.ok(s.firewalls.includes('similarity preference ≠ legitimate exclusion'));
  assert.ok(s.firewalls.includes('preference ≠ justification'));
  assert.deepEqual(s.evidenceIds,['DEV-S04','DEV-S05']);
});

test('evidence inspection separates observation interpretation alternatives replication and ceiling',()=>{
  for(const e of DEVELOPMENTAL_EVIDENCE){
    assert.ok(e.observation);
    assert.ok(e.interpretation);
    assert.ok(e.alternatives.length>0);
    assert.ok(e.replicationStatus);
    assert.ok(e.claimCeiling);
  }
});

test('proto-normative stage preserves social approval versus moral justification firewall',()=>{
  const s=stageById('D9_PROTO_NORMATIVE');
  assert.ok(s.firewalls.some(x=>x==='social approval ≠ moral justification'));
  assert.ok(s.firewalls.some(x=>/predisposition ≠ norm ≠ reason ≠ justification ≠ authorization/.test(x)));
});

test('cultural formation avoids biology and culture totalization',()=>{
  const s=stageById('D10_CULTURAL_FORMATION');
  assert.ok(s.firewalls.includes('biology ≠ destiny'));
  assert.ok(s.firewalls.includes('culture ≠ total explanation'));
  assert.ok(s.firewalls.includes('person ≠ dossier'));
});

test('developmental sequence hands off to life lottery through situated agency',()=>{
  const s=stageById('D12_LIFE_LOTTERY_HANDOFF');
  assert.ok(s.learnerExperience.includes('You do not choose where you begin'));
  assert.ok(s.vocabularyReveal.includes('situated agency'));
  assert.ok(s.firewalls.includes('starting condition ≠ destiny'));
});

test('browser prototype is non-deployed and sparse early sequence is present',()=>{
  const html=fs.readFileSync(path.join(proto,'index.html'),'utf8');
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.equal(proto.includes(path.join('site',path.sep)),false);
  assert.match(html,/NON-DEPLOYED/);
  assert.match(app,/Something happens/);
  assert.match(app,/Try acting/);
  assert.match(app,/Not everything follows/);
  assert.match(app,/Something else acts/);
  assert.match(app,/You can signal\. You cannot command/);
  assert.match(app,/Every human Doing develops somewhere/);
});

test('browser evidence layer exposes replication and claim ceilings only where evidence exists',()=>{
  const app=fs.readFileSync(path.join(proto,'app.js'),'utf8');
  assert.match(app,/Observation/);
  assert.match(app,/Interpretation/);
  assert.match(app,/Alternatives/);
  assert.match(app,/Replication/);
  assert.match(app,/Claim ceiling/);
  assert.match(app,/inspect-evidence/);
});

test('prototype data are compiler-generated from typed developmental model',()=>{
  const script=fs.readFileSync(path.join(root,'scripts/build-developmental-entry-prototype.cjs'),'utf8');
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  assert.match(script,/DEVELOPMENTAL_STAGES/);
  assert.match(script,/DEVELOPMENTAL_EVIDENCE/);
  assert.equal(pkg.scripts['prototype:developmental-entry'],'npm run build && node scripts/build-developmental-entry-prototype.cjs');
});
