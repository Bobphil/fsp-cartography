const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const {
  HORIZON_PERCEPTION_PILOT_VERSION,
  HORIZON_PERCEPTION_TARGET,
  HORIZON_PERCEPTION_COHORT_SIZE,
  participantTotal,
  participantPasses,
  cohortSummary,
  validateParticipant,
  classifyInterpretation
}=require('../../dist/research/horizonPerceptionPilot.js');

const root=path.join(__dirname,'../..');
const proto=path.join(root,'prototypes/horizon-perception-pilot-1');

test('pilot version target and cohort size are frozen',()=>{
  assert.equal(HORIZON_PERCEPTION_PILOT_VERSION,'1.0');
  assert.equal(HORIZON_PERCEPTION_TARGET,'FSP-VR-MAATHAI-FIELD-3');
  assert.equal(HORIZON_PERCEPTION_COHORT_SIZE,5);
});

test('participant scoring is five distinctions on a 0-2 scale',()=>{
  const p={participantCode:'P01',pilotVersion:'1.0',priorFspExposure:false,scores:{D1:2,D2:2,D3:2,D4:1,D5:1},errors:[],transferChoice:'B'};
  assert.equal(participantTotal(p),8);
  assert.equal(participantPasses(p),true);
  assert.equal(validateParticipant(p).passes,true);
});

test('strong horizon interpretation requires preserved time probability contingency and attentional distinctions',()=>{
  const p={participantCode:'P01',pilotVersion:'1.0',priorFspExposure:false,scores:{D1:2,D2:2,D3:2,D4:2,D5:2},errors:[],transferChoice:'B'};
  assert.equal(classifyInterpretation(p),'P1_STRONG_HORIZON_INTERPRETATION');
});

test('temporal-nearness error is classified separately from probability-recommendation error',()=>{
  const time={participantCode:'P01',pilotVersion:'1.0',priorFspExposure:false,scores:{D1:2,D2:0,D3:2,D4:2,D5:1},errors:['HP-TIME-NEAR'],transferChoice:'B'};
  const prob={participantCode:'P02',pilotVersion:'1.0',priorFspExposure:false,scores:{D1:2,D2:2,D3:0,D4:2,D5:1},errors:['HP-PROB-UP'],transferChoice:'B'};
  assert.equal(classifyInterpretation(time),'P3_TEMPORAL_NEARNESS_ERROR');
  assert.equal(classifyInterpretation(prob),'P4_PROBABILITY_OR_RECOMMENDATION_ERROR');
});

test('five-person cohort passes only with four high scorers and bounded semantic errors',()=>{
  const good=i=>({participantCode:'P0'+i,pilotVersion:'1.0',priorFspExposure:false,scores:{D1:2,D2:2,D3:2,D4:2,D5:1},errors:[],transferChoice:'B'});
  const rows=[good(1),good(2),good(3),good(4),{participantCode:'P05',pilotVersion:'1.0',priorFspExposure:false,scores:{D1:1,D2:1,D3:1,D4:1,D5:1},errors:['HP-TIME-NEAR'],transferChoice:'A'}];
  const s=cohortSummary(rows);
  assert.equal(s.n,5);
  assert.equal(s.passes,4);
  assert.equal(s.temporalNearErrors,1);
  assert.equal(s.fullCohortPass,true);
});

test('stop rule fires on two temporal or probability errors or three panel dependencies',()=>{
  const base=i=>({participantCode:'P0'+i,pilotVersion:'1.0',priorFspExposure:false,scores:{D1:2,D2:2,D3:2,D4:2,D5:2},errors:[],transferChoice:'B'});
  const a=base(1),b=base(2);a.errors=['HP-TIME-NEAR'];b.errors=['HP-TIME-NEAR'];
  assert.equal(cohortSummary([a,b]).stopEarly,true);
  const c=base(3),d=base(4),e=base(5);c.errors=['HP-PANEL-DEPENDENCE'];d.errors=['HP-PANEL-DEPENDENCE'];e.errors=['HP-PANEL-DEPENDENCE'];
  assert.equal(cohortSummary([c,d,e]).stopEarly,true);
});

test('participant shell freezes orientation and exact four-phase sequence around FIELD-3',()=>{
  const html=fs.readFileSync(path.join(proto,'index.html'),'utf8');
  assert.match(html,/Horizon Perception Pilot 1\.0/);
  assert.match(html,/You are testing the interface, not being tested/);
  assert.match(html,/Some are available sooner; others require more things to change first/);
  assert.match(html,/What possibilities seem available from here\?/);
  assert.match(html,/What changed\?/);
  assert.match(html,/Why does this possibility seem farther away/);
  assert.match(html,/What happened to the advocacy possibility\?/);
  assert.match(html,/\.\.\/maathai-field-3\/index\.html/);
});

test('observer page contains D1-D5 transfer check and frozen follow-up wording',()=>{
  const html=fs.readFileSync(path.join(proto,'observer.html'),'utf8');
  assert.match(html,/D1 · Distant possibility remains identifiable/);
  assert.match(html,/D5 · Retained marker = present attentional availability/);
  assert.match(html,/Is it now more likely, less likely, or unchanged\?/);
  assert.match(html,/Which is most like the retained advocacy marker\?/);
  assert.match(html,/Pilot version/);
  assert.match(html,/value="1\.0" readonly/);
});

test('observer capture is local-only and includes all semantic error codes',()=>{
  const js=fs.readFileSync(path.join(proto,'observer.js'),'utf8');
  for(const code of ['HP-TIME-NEAR','HP-PROB-UP','HP-FEAS-UP','HP-RECOMMEND','HP-DESTINY','HP-CONTINGENCY-LOSS','HP-IDENTITY-LOSS','HP-ATTN-FAIL','HP-PANEL-DEPENDENCE']) assert.match(js,new RegExp(code));
  assert.match(js,/localStorage/);
  const html=fs.readFileSync(path.join(proto,'observer.html'),'utf8');
  assert.match(html,/Export CSV/);
  assert.doesNotMatch(js,/fetch\(/);
  assert.doesNotMatch(js,/XMLHttpRequest/);
});

test('pilot remains non-deployed',()=>{
  assert.equal(proto.includes(path.join('site',path.sep)),false);
});
