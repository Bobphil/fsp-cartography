const test=require('node:test');
const assert=require('node:assert/strict');

const {
  validateGenealogy,
  auditSemanticDrift,
  auditCrossGenerationTranslation,
  auditFormationJustification,
  auditHistoricalReopen
}=require('../../dist/research/revision7.js');

const {
  interpretiveExclusionGenealogy,
  originToPolicyTranslation,
  originToTrainingTranslation,
  falseFriendTranslation
}=require('../../dist/research/revision7Fixtures.js');

test('genealogy validates ordered versions and sedimentation links',()=>{
  assert.deepEqual(validateGenealogy(interpretiveExclusionGenealogy),[]);
});

test('semantic drift detects definition scope and contrast changes',()=>{
  const audit=auditSemanticDrift(interpretiveExclusionGenealogy);
  assert.equal(audit.definitionDrift,true);
  assert.equal(audit.scopeDrift,true);
  assert.equal(audit.contrastDrift,true);
});

test('semantic drift detects provenance and contestability loss',()=>{
  const audit=auditSemanticDrift(interpretiveExclusionGenealogy);
  assert.equal(audit.provenanceLoss,true);
  assert.equal(audit.contestabilityLoss,true);
});

test('semantic drift preserves accumulated omissions and additions',()=>{
  const audit=auditSemanticDrift(interpretiveExclusionGenealogy);
  assert.ok(audit.accumulatedOmissions.includes('power'));
  assert.ok(audit.accumulatedAdditions.includes('general communication training'));
});

test('historical persistence never establishes justification',()=>{
  const audit=auditSemanticDrift(interpretiveExclusionGenealogy);
  assert.equal(audit.justificationStatus,'NOT_ESTABLISHED_BY_PERSISTENCE');
});

test('origin to policy is continuity with remainder',()=>{
  const result=auditCrossGenerationTranslation(
    originToPolicyTranslation,
    interpretiveExclusionGenealogy
  );
  assert.equal(result.status,'CONTINUITY_WITH_REMAINDER');
  assert.equal(result.backProjectionRisk,false);
});

test('origin to training is partial inheritance with back-projection risk',()=>{
  const result=auditCrossGenerationTranslation(
    originToTrainingTranslation,
    interpretiveExclusionGenealogy
  );
  assert.equal(result.status,'PARTIAL_INHERITANCE');
  assert.equal(result.backProjectionRisk,true);
});

test('later meaning projected backward is a false friend',()=>{
  const result=auditCrossGenerationTranslation(
    falseFriendTranslation,
    interpretiveExclusionGenealogy
  );
  assert.equal(result.status,'FALSE_FRIEND');
  assert.equal(result.backProjectionRisk,true);
});

test('cross-generation translation rejects unknown versions',()=>{
  const bad=structuredClone(originToPolicyTranslation);
  bad.toVersionId='missing';
  assert.throws(
    ()=>auditCrossGenerationTranslation(bad,interpretiveExclusionGenealogy),
    /unknown version/
  );
});

test('formation audit separates persistence from independent justification',()=>{
  const audit=auditFormationJustification('concept-counter',{
    persistenceEvidence:[
      'policy use persisted',
      'training curriculum retained the label'
    ],
    formationExplanations:[
      'institutional policy adoption',
      'curricular sedimentation'
    ],
    independentJustifications:[
      'current evidence supports auditing category-fit failures'
    ],
    currentContestations:[
      'current scope may be too broad'
    ]
  });
  assert.equal(audit.formationExplainsPersistence,true);
  assert.equal(audit.persistenceJustifiesCurrentUse,false);
  assert.equal(audit.independentJustificationRequired,true);
});

test('formation without independent reasons does not justify current use',()=>{
  const audit=auditFormationJustification('concept-counter',{
    persistenceEvidence:['textbook repetition'],
    formationExplanations:['curricular inheritance'],
    independentJustifications:[],
    currentContestations:[]
  });
  assert.match(audit.conclusion,/do not justify current use/);
});

test('historical reopen triggers on drift provenance and contestability loss',()=>{
  const audit=auditHistoricalReopen(
    interpretiveExclusionGenealogy,
    [originToPolicyTranslation,originToTrainingTranslation],
    {taskChanged:false,newEvidence:false,capturedSedimentation:false}
  );
  assert.equal(audit.shouldReopen,true);
  assert.ok(audit.triggers.includes('SEMANTIC_DRIFT'));
  assert.ok(audit.triggers.includes('PROVENANCE_LOSS'));
  assert.ok(audit.triggers.includes('CONTESTABILITY_LOSS'));
});

test('false-friend translation triggers stronger historical reopen',()=>{
  const audit=auditHistoricalReopen(
    interpretiveExclusionGenealogy,
    [falseFriendTranslation],
    {taskChanged:false,newEvidence:false,capturedSedimentation:false}
  );
  assert.ok(audit.triggers.includes('CROSS_GENERATION_FALSE_FRIEND'));
  assert.equal(audit.inheritedUseMayContinueProvisionally,false);
});

test('task change can independently trigger historical reopen',()=>{
  const audit=auditHistoricalReopen(
    interpretiveExclusionGenealogy,
    [],
    {taskChanged:true,newEvidence:false,capturedSedimentation:false}
  );
  assert.ok(audit.triggers.includes('TASK_CHANGE'));
});

test('new evidence can independently trigger historical reopen',()=>{
  const audit=auditHistoricalReopen(
    interpretiveExclusionGenealogy,
    [],
    {taskChanged:false,newEvidence:true,capturedSedimentation:false}
  );
  assert.ok(audit.triggers.includes('NEW_EVIDENCE'));
});

test('captured sedimentation blocks provisional continuation',()=>{
  const audit=auditHistoricalReopen(
    interpretiveExclusionGenealogy,
    [],
    {taskChanged:false,newEvidence:false,capturedSedimentation:true}
  );
  assert.ok(audit.triggers.includes('CAPTURED_SEDIMENTATION'));
  assert.equal(audit.inheritedUseMayContinueProvisionally,false);
});

test('historical persistence never authorizes present use',()=>{
  const audit=auditHistoricalReopen(
    interpretiveExclusionGenealogy,
    [],
    {taskChanged:false,newEvidence:false,capturedSedimentation:false}
  );
  assert.equal(audit.historicalPersistenceAuthorizesUse,false);
});
