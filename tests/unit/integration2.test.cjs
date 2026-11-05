const test=require('node:test');
const assert=require('node:assert/strict');

const {
  BASE_GRAMMAR,
  deriveCompressionDepth,
  buildCompressionPlan,
  auditCognitiveLoad,
  buildJourneyCompression,
  compressionDictionary
}=require('../../dist/research/integration2.js');

const { humanVocabularyLeaks }=require('../../dist/research/integration1.js');

const VIEWS=['START','PEOPLE','INSTITUTION','HSF','CONNECTIONS','INVESTIGATE','RETURN'];

test('every view has a small base grammar',()=>{
  for(const view of VIEWS){
    assert.ok(BASE_GRAMMAR[view].length>=1);
    assert.ok(BASE_GRAMMAR[view].length<=2);
  }
});

test('base mode exposes no revision-derived prompts',()=>{
  for(const view of VIEWS){
    const plan=buildCompressionPlan(view,[]);
    assert.equal(plan.depth,'BASE');
    assert.ok(plan.prompts.every(p=>p.source==='BASE_GRAMMAR'));
    assert.equal(auditCognitiveLoad(plan).passes,true);
  }
});

test('base prompt budget is at most two',()=>{
  for(const view of VIEWS){
    const plan=buildCompressionPlan(view,[]);
    assert.equal(plan.promptBudget,2);
    assert.ok(plan.prompts.length<=2);
  }
});

test('ordinary pressure promotes to PRESSURE depth',()=>{
  assert.equal(deriveCompressionDepth(['EVIDENCE_CONFLICT']),'PRESSURE');
  assert.equal(deriveCompressionDepth(['POWER_AUTHORITY_TENSION']),'PRESSURE');
});

test('deeper structural pressure promotes to DEEP depth',()=>{
  assert.equal(deriveCompressionDepth(['INTERPRETIVE_GAP']),'DEEP');
  assert.equal(deriveCompressionDepth(['HISTORICAL_INHERITANCE']),'DEEP');
  assert.equal(deriveCompressionDepth(['EMERGENCY']),'DEEP');
});

test('Maya-style investigate pressure adds at most one compressed prompt',()=>{
  const plan=buildCompressionPlan(
    'INVESTIGATE',
    ['MULTIPLE_LIVE_PATHS','EVIDENCE_CONFLICT']
  );
  assert.equal(plan.depth,'PRESSURE');
  assert.ok(plan.prompts.length<=3);
  assert.equal(plan.prompts.filter(p=>p.source==='REVISION_COMPRESSION').length<=1,true);
  assert.equal(auditCognitiveLoad(plan).passes,true);
});

test('Leila-style power pressure exposes ordinary-language power question without jargon',()=>{
  const plan=buildCompressionPlan(
    'CONNECTIONS',
    ['POWER_AUTHORITY_TENSION']
  );
  assert.equal(plan.depth,'PRESSURE');
  const texts=plan.prompts.map(p=>p.text);
  assert.ok(texts.some(t=>/expertise|formal authority|impose consequences/i.test(t)));
  assert.deepEqual(humanVocabularyLeaks(texts),[]);
  assert.equal(auditCognitiveLoad(plan).passes,true);
});

test('Jordan-style sparse journey stays base when no pressure signals exist',()=>{
  const journey=buildJourneyCompression({});
  for(const view of VIEWS){
    assert.equal(journey[view].depth,'BASE');
    assert.equal(auditCognitiveLoad(journey[view]).passes,true);
  }
});

test('deep interpretive pressure may expose rare prompt but never more than one',()=>{
  const plan=buildCompressionPlan(
    'INVESTIGATE',
    ['INTERPRETIVE_GAP','VOCABULARY_CONFLICT']
  );
  assert.equal(plan.depth,'DEEP');
  assert.ok(plan.prompts.length<=4);
  assert.ok(plan.prompts.filter(p=>p.exposure==='RARE').length<=1);
  assert.equal(auditCognitiveLoad(plan).passes,true);
});

test('deep mode may expose translation compression without formal vocabulary',()=>{
  const plan=buildCompressionPlan(
    'INVESTIGATE',
    ['VOCABULARY_CONFLICT']
  );
  const texts=plan.prompts.map(p=>p.text);
  assert.ok(texts.some(t=>/carries across|did not carry across/i.test(t)));
  assert.deepEqual(humanVocabularyLeaks(texts),[]);
});

test('emergency pressure does not exceed deep prompt budget',()=>{
  const plan=buildCompressionPlan(
    'INSTITUTION',
    ['EMERGENCY','DISTRIBUTIONAL_CONFLICT','LOCK_IN']
  );
  assert.equal(plan.depth,'DEEP');
  assert.ok(plan.prompts.length<=4);
  assert.ok(plan.prompts.filter(p=>p.exposure==='RARE').length<=1);
  assert.equal(auditCognitiveLoad(plan).passes,true);
});

test('suppressed triggered capabilities remain explicit for later disclosure',()=>{
  const plan=buildCompressionPlan(
    'INVESTIGATE',
    ['MULTIPLE_LIVE_PATHS','EVIDENCE_CONFLICT','REPAIR_WINDOW','DISTRIBUTIONAL_CONFLICT','IRREVERSIBILITY']
  );
  assert.ok(plan.suppressedCapabilityIds.length>0);
  assert.ok(plan.prompts.length<=plan.promptBudget);
});

test('compression dictionary preserves formal and ordinary layers side by side',()=>{
  const dictionary=compressionDictionary();
  assert.ok(dictionary.length>20);
  assert.ok(dictionary.every(x=>x.formal.trim() && x.ordinary.trim()));
  assert.ok(dictionary.some(x=>x.formal==='revision target' && /need to change/i.test(x.ordinary)));
});

test('ordinary-language dictionary contains no defined research vocabulary leaks',()=>{
  const dictionary=compressionDictionary();
  const leaks=humanVocabularyLeaks(dictionary.map(x=>x.ordinary));
  assert.deepEqual(leaks,[]);
});

test('cognitive-load audit detects prompt-budget overflow',()=>{
  const plan=buildCompressionPlan('INVESTIGATE',[]);
  plan.prompts.push({
    promptId:'extra',
    view:'INVESTIGATE',
    text:'Extra ordinary prompt',
    source:'BASE_GRAMMAR',
    exposure:'FULL',
    depth:'BASE',
    rationale:'test'
  });
  const audit=auditCognitiveLoad(plan);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.includes('prompt-budget-exceeded'));
});

test('cognitive-load audit detects research vocabulary leakage',()=>{
  const plan=buildCompressionPlan('INVESTIGATE',[]);
  plan.prompts[0].text='Use the minimal-mutilation audit.';
  plan.researchVocabularyLeaks=humanVocabularyLeaks(plan.prompts.map(p=>p.text));
  const audit=auditCognitiveLoad(plan);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.includes('research-vocabulary-leak'));
});

test('rare prompt before DEEP mode fails cognitive-load gate',()=>{
  const plan=buildCompressionPlan('INVESTIGATE',[], 'PRESSURE');
  plan.prompts.push({
    promptId:'rare-test',
    view:'INVESTIGATE',
    text:'Do the available words fail to capture something important?',
    source:'REVISION_COMPRESSION',
    capabilityId:'r5-hermeneutical',
    exposure:'RARE',
    depth:'DEEP',
    rationale:'test'
  });
  const audit=auditCognitiveLoad(plan);
  assert.equal(audit.passes,false);
  assert.ok(audit.failures.includes('rare-prompt-before-deep-pressure'));
});

test('framework challenge appears only under deep disclosure',()=>{
  const plan=buildCompressionPlan('RETURN',['FRAMEWORK_CHALLENGE']);
  assert.equal(plan.depth,'DEEP');
  assert.ok(plan.prompts.some(p=>/framework.*rules|rules.*reconsidered/i.test(p.text)));
  assert.equal(auditCognitiveLoad(plan).passes,true);
});
