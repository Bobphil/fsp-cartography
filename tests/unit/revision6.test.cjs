const test=require('node:test');
const assert=require('node:assert/strict');

const {
  validateConceptRecord,
  auditResourceCompetition,
  auditConceptCapture,
  auditSharedLanguage
}=require('../../dist/research/revision6.js');

const {
  counterPublicConcept,
  dominantConcept,
  sharedBridgeConcept,
  partialTranslation,
  structuralTranslation,
  noAdequateTranslation,
  counterResource,
  dominantResource,
  sharedResource,
  healthyAdoption,
  capturedAdoption
}=require('../../dist/research/revision6Fixtures.js');

test('valid concept record preserves provenance and contributors',()=>{
  assert.deepEqual(validateConceptRecord(counterPublicConcept),[]);
});

test('missing provenance invalidates concept record',()=>{
  const bad=structuredClone(counterPublicConcept);
  bad.provenanceVisible=false;
  assert.ok(validateConceptRecord(bad).includes('provenance-not-visible'));
});

test('resource competition preserves multiple vocabularies without selecting a winner',()=>{
  const audit=auditResourceCompetition(
    [counterResource,dominantResource],
    [counterPublicConcept,dominantConcept],
    [partialTranslation]
  );
  assert.equal(audit.winner,null);
  assert.ok(audit.translationBridges.includes('tr-partial'));
  assert.ok(audit.unresolvedRemainders.length>0);
});

test('no adequate translation is represented as incompatibility rather than forced bridge',()=>{
  const audit=auditResourceCompetition(
    [counterResource,dominantResource],
    [counterPublicConcept,dominantConcept],
    [noAdequateTranslation]
  );
  assert.ok(audit.incompatibleConcepts.includes('concept-counter<->concept-dominant'));
});

test('unknown concepts in resource sets are rejected',()=>{
  const bad=structuredClone(counterResource);
  bad.conceptIds=['missing'];
  assert.throws(()=>auditResourceCompetition(
    [bad,dominantResource],
    [counterPublicConcept,dominantConcept],
    []
  ),/unknown concept/);
});

test('healthy institutional adoption is not concept capture',()=>{
  const audit=auditConceptCapture(counterPublicConcept,healthyAdoption);
  assert.equal(audit.definitionShifted,false);
  assert.equal(audit.provenanceErased,false);
  assert.equal(audit.contributorsDisplaced,false);
  assert.equal(audit.contestabilityReduced,false);
  assert.equal(audit.possibleCapture,false);
  assert.equal(audit.possibleCooption,false);
});

test('semantic change alone is insufficient for co-option',()=>{
  const adoption=structuredClone(healthyAdoption);
  adoption.adoptedDefinition='modified but still provenance-preserving definition';
  const audit=auditConceptCapture(counterPublicConcept,adoption);
  assert.equal(audit.definitionShifted,true);
  assert.equal(audit.possibleCapture,false);
  assert.equal(audit.possibleCooption,false);
});

test('captured adoption detects semantic shift plus provenance and contestability loss',()=>{
  const audit=auditConceptCapture(counterPublicConcept,capturedAdoption);
  assert.equal(audit.labelRetained,true);
  assert.equal(audit.definitionShifted,true);
  assert.equal(audit.provenanceErased,true);
  assert.equal(audit.contributorsDisplaced,true);
  assert.equal(audit.contestabilityReduced,true);
  assert.equal(audit.possibleCapture,true);
  assert.equal(audit.possibleCooption,true);
});

test('concept capture audit does not claim wrongful intent',()=>{
  const audit=auditConceptCapture(counterPublicConcept,capturedAdoption);
  assert.match(audit.claimCeiling,/does not prove wrongful co-option/);
});

test('shared structural bridge can support coordination with lexical pluralism',()=>{
  const capture=auditConceptCapture(counterPublicConcept,healthyAdoption);
  const audit=auditSharedLanguage(
    [counterPublicConcept,sharedBridgeConcept],
    [structuralTranslation],
    ['revise complaint intake','preserve provenance'],
    [capture]
  );
  assert.equal(audit.status,'PRACTICAL_COORDINATION_WITH_LEXICAL_PLURALISM');
  assert.equal(audit.requiresSingleVocabulary,false);
  assert.equal(audit.oneVocabularyAuthorizesTruth,false);
});

test('partial translation without coordinated action remains a partial bridge',()=>{
  const audit=auditSharedLanguage(
    [counterPublicConcept,dominantConcept],
    [partialTranslation],
    [],
    []
  );
  assert.equal(audit.status,'PARTIAL_TRANSLATION_BRIDGE');
});

test('failed translation without shared action can remain lexical nonconvergence',()=>{
  const audit=auditSharedLanguage(
    [counterPublicConcept,dominantConcept],
    [noAdequateTranslation],
    [],
    []
  );
  assert.equal(audit.status,'IRREDUCIBLE_LEXICAL_NONCONVERGENCE');
});

test('failed translation can coexist with practical coordination',()=>{
  const audit=auditSharedLanguage(
    [counterPublicConcept,dominantConcept],
    [noAdequateTranslation],
    ['collect evidence jointly'],
    []
  );
  assert.equal(audit.status,'PRACTICAL_COORDINATION_WITH_LEXICAL_PLURALISM');
});

test('captured institutional adoption distorts apparent shared-language convergence',()=>{
  const capture=auditConceptCapture(counterPublicConcept,capturedAdoption);
  const audit=auditSharedLanguage(
    [counterPublicConcept],
    [],
    ['institution adopts label'],
    [capture]
  );
  assert.equal(audit.status,'DISTORTED_BY_CONCEPT_CAPTURE');
});

test('shared language convergence never authorizes truth',()=>{
  const full={
    ...structuredClone(structuralTranslation),
    translationId:'tr-full',
    status:'FULL_LOCAL',
    lostFeatures:[],
    remainder:[]
  };
  const audit=auditSharedLanguage(
    [counterPublicConcept,sharedBridgeConcept],
    [full],
    [],
    []
  );
  assert.equal(audit.status,'SHARED_LANGUAGE_CONVERGENCE');
  assert.equal(audit.oneVocabularyAuthorizesTruth,false);
});

test('concept translation preserves explicit remainder',()=>{
  assert.ok(structuralTranslation.remainder.includes('origin-community history remains only partially represented'));
});

test('concept adoption must target the source concept being audited',()=>{
  const bad=structuredClone(healthyAdoption);
  bad.conceptId='other';
  assert.throws(()=>auditConceptCapture(counterPublicConcept,bad),/concept mismatch/);
});
