const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

function loadSource(){
  return fs.readFileSync(path.join(__dirname,'../../src/research/fspResearchEnvironment.ts'),'utf8');
}
function loadSpec(){
  return fs.readFileSync(path.join(__dirname,'../../FSP-RESEARCH-ENVIRONMENT-1.md'),'utf8');
}

test('Phase 1 registry has exactly seven first-wave regions and unique stable IDs',()=>{
  const src=loadSource();
  const ids=[
    "GOVERNANCE_TRANSLATION",
    "SITUATED_AGENCY_TRANSFORMATION",
    "MIND_PERCEPTION_PHENOMENOLOGY",
    "INTELLIGENCE_ACROSS_SCALES",
    "SCIENCE_MODELS_INTEROPERABILITY",
    "INSTITUTIONS_POWER_COORDINATION",
    "COMPLETION_HORIZON"
  ];
  for(const id of ids) assert.match(src,new RegExp('id:"'+id+'"'));
  assert.equal(new Set(ids).size,7);
});

test('all Phase 1 regions remain non-deployed with owner references and claim ceilings',()=>{
  const src=loadSource();
  assert.ok((src.match(/publicReady:false/g)||[]).length>=7);
  assert.ok((src.match(/ownerRefs:\[/g)||[]).length>=7);
  assert.ok((src.match(/claimCeiling:/g)||[]).length>=7);
  assert.match(loadSpec(),/No-Deployment Rule/);
});

test('Agency Mind Intelligence is a nexus rather than an eighth research region',()=>{
  const src=loadSource();
  assert.match(src,/notARegion:true/);
  assert.match(src,/AGENCY != INTELLIGENCE/);
  assert.match(src,/INTELLIGENCE != CONSCIOUSNESS/);
  assert.match(src,/CAPABILITY != MORAL_STANDING/);
});

test('Lives public contract preserves hindsight provenance person firewall and optional Life Navigation',()=>{
  const src=loadSource();
  assert.match(src,/LATER_SIGNIFICANCE != EARLIER_FORESIGHT/);
  assert.match(src,/BIOGRAPHICAL_DOSSIER != PERSON/);
  assert.match(src,/DIRECT_STATEMENT/);
  assert.match(src,/BIOGRAPHER_INTERPRETATION/);
  assert.match(src,/EXEMPLAR_AS_MIRROR != EXEMPLAR_AS_TEMPLATE/);
  assert.match(src,/lifeNavigationOptional:true/);
});

test('orientation grammar remains prose-first and recoverable',()=>{
  const src=loadSource();
  for(const item of ["OPENING_PROBLEM","EXISTING_MAPS","TRANSLATION_BURDENS","FSP_CONTRIBUTION","CLAIM_CEILING","RESEARCH_FRONTIER","DEEPER_ROUTES"]){
    assert.match(src,new RegExp(item));
  }
  assert.match(loadSpec(),/read as an essay, not a reference sheet/i);
});

test('canonical owner regression fails closed on duplicate ownership and hidden provenance',()=>{
  const src=loadSource();
  for(const rule of [
    "REGION_MUST_NOT_DEFINE_OWNED_CONCEPT",
    "ORIENTATION_MUST_NOT_STRENGTHEN_CANONICAL_CLAIM",
    "PROJECTION_MUST_NOT_INVENT_EVIDENCE",
    "REGION_MUST_NOT_REPLACE_CLAIM_LEVEL_PROVENANCE",
    "PUBLIC_SUMMARY_MUST_PRESERVE_CLAIM_CEILING",
    "ROUTE_MUST_PRESERVE_DECISION_RELEVANT_REMAINDER"
  ]) assert.match(src,new RegExp(rule));
});
