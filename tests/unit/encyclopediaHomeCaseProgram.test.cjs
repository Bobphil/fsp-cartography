const test=require('node:test');
const assert=require('node:assert/strict');
const {PUBLIC_ARCHITECTURE}=require('../../dist/research/encyclopediaPublicArchitecture.js');
const {INQUIRY_NARRATIVES}=require('../../dist/research/fspInquiryNarrative.js');

test('five-case public program remains complete',()=>{
  assert.deepEqual(
    PUBLIC_ARCHITECTURE.cases.map(c=>c.caseId),
    ['FOUCAULT-LIGHT-SPEED','NEPTUNE-VULCAN','GALILEO-COPERNICAN','NEWTON-EINSTEIN','DESI-2024-2026']
  );
});

test('three completed whole-inquiry narratives are registered',()=>{
  assert.deepEqual(
    Object.keys(INQUIRY_NARRATIVES).sort(),
    ['GALILEO-COPERNICAN','NEPTUNE-VULCAN','NEWTON-EINSTEIN'].sort()
  );
});

test('each public case declares a distinct inquiry question and why-it-matters rationale',()=>{
  for(const c of PUBLIC_ARCHITECTURE.cases){
    assert.ok(c.publicQuestion.length>20,c.caseId);
    assert.ok(c.whyItMatters.length>20,c.caseId);
  }
  assert.equal(new Set(PUBLIC_ARCHITECTURE.cases.map(c=>c.publicQuestion)).size,5);
});

test('Neptune/Vulcan remains a recommended full vertical slice without being the only narrative spine',()=>{
  assert.ok(INQUIRY_NARRATIVES['NEPTUNE-VULCAN']);
  assert.ok(INQUIRY_NARRATIVES['GALILEO-COPERNICAN']);
  assert.ok(INQUIRY_NARRATIVES['NEWTON-EINSTEIN']);
  assert.equal(Object.keys(INQUIRY_NARRATIVES).length,3);
});
