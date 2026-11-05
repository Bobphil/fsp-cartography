const test=require('node:test');
const assert=require('node:assert/strict');

const {
  reconstructExternalAIF,
  externalAifTutorialSample,
  externalCorpusRegistry
}=require('../../dist/research/externalAif.js');
const {
  compareRivalFormalisms,
  rivalFormalismProfiles
}=require('../../dist/research/rivalComparators.js');
const {
  compareIndependentCodings,
  externalSampleCoderA,
  externalSampleCoderB
}=require('../../dist/research/independentCoding.js');
const {
  buildCanonicalResearchArchitecture
}=require('../../dist/research/canonicalResearchArchitecture.js');

test('external AIF sample reconstructs native information and locution layers',()=>{
  const result=reconstructExternalAIF(externalAifTutorialSample);
  assert.equal(result.informationNodes.length,3);
  assert.equal(result.locutions.length,4);
  assert.equal(result.inferenceRelations,1);
  assert.deepEqual(new Set(result.participants),new Set(['Bob','Worker']));
});

test('external reconstruction preserves AIF native strengths without pretending they are FSP fields',()=>{
  const result=reconstructExternalAIF(externalAifTutorialSample);
  assert.ok(result.preservedByAIF.includes('locution/content distinction'));
  assert.ok(result.preservedByAIF.includes('argument relation structure'));
  assert.ok(result.notNativeToAIF.includes('translation remainder'));
  assert.ok(result.notNativeToAIF.includes('agency/anti-domination audit'));
});

test('public external corpus registry is marked external',()=>{
  assert.ok(externalCorpusRegistry.length>=2);
  assert.ok(externalCorpusRegistry.every(x=>x.external===true));
  assert.ok(externalCorpusRegistry.some(x=>x.id==='QT30'));
});

test('rival comparator includes CEA AIF and FSP',()=>{
  assert.deepEqual(
    new Set(rivalFormalismProfiles.map(x=>x.name)),
    new Set(['CEA','AIF','FSP'])
  );
});

test('rival comparator does not erase AIF-specific argument representation',()=>{
  const result=compareRivalFormalisms();
  const aif=rivalFormalismProfiles.find(x=>x.name==='AIF');
  assert.ok(aif.preserves.includes('argument relation type'));
  assert.ok(aif.preserves.includes('locution/content distinction'));
  assert.ok(result.fspDelta.includes('claim ceiling'));
});

test('FSP comparator delta includes governance structures absent from both simpler baselines',()=>{
  const result=compareRivalFormalisms();
  assert.ok(result.fspDelta.includes('standing'));
  assert.ok(result.fspDelta.includes('translation remainder'));
  assert.ok(result.fspDelta.includes('agency audit'));
  assert.ok(result.fspDelta.includes('reopen condition'));
});

test('independent coders agree on external sample core structure',()=>{
  const result=compareIndependentCodings(externalSampleCoderA,externalSampleCoderB);
  assert.equal(result.passesCoreAgreement,true);
  assert.equal(result.relationAgreement,true);
  assert.equal(result.participantAgreement,true);
  assert.equal(result.informationOverlap,1);
});

test('independent coding keeps task and remainder separate from native agreement threshold',()=>{
  const altered={
    ...externalSampleCoderB,
    inferredTask:'different FSP task inference',
    explicitRemainders:['different FSP remainder']
  };
  const result=compareIndependentCodings(externalSampleCoderA,altered);
  assert.equal(result.passesCoreAgreement,true);
  assert.equal(result.taskAgreement,false);
  assert.equal(result.remainderAgreement,false);
});

test('source mismatch is rejected in independent coding comparison',()=>{
  const altered={...externalSampleCoderB,sourceId:'other-source'};
  assert.throws(
    ()=>compareIndependentCodings(externalSampleCoderA,altered),
    /Source mismatch/
  );
});

test('canonical research architecture is monograph scale',()=>{
  const architecture=buildCanonicalResearchArchitecture();
  assert.equal(architecture.canonicalRepositoryMode,'MONOGRAPH_SCALE');
  assert.equal(architecture.compressionPolicy,'NO_SUBMISSION_LIMIT_ON_CANONICAL');
});

test('journal export cannot delete canonical support to meet word count',()=>{
  const architecture=buildCanonicalResearchArchitecture();
  assert.ok(
    architecture.exportProfiles.journalArticle.includes(
      'never delete canonical support to fit word count'
    )
  );
  assert.ok(architecture.protectedResearchAssets.includes('failed tests and repair history'));
  assert.ok(architecture.protectedResearchAssets.includes('future research branches'));
});

test('monograph profile preserves full argument and extension space',()=>{
  const architecture=buildCanonicalResearchArchitecture();
  assert.ok(
    architecture.exportProfiles.monographChapter.some(x=>/full argument/.test(x))
  );
});

test('AIF native representation and FSP augmentation remain distinguishable',()=>{
  const external=reconstructExternalAIF(externalAifTutorialSample);
  const rival=compareRivalFormalisms();
  assert.ok(external.preservedByAIF.includes('participant attribution'));
  assert.ok(rival.fspDelta.includes('translation remainder'));
});

test('TRANSLATION-7 does not claim corpus-scale import merely from registry presence',()=>{
  const result=reconstructExternalAIF(externalAifTutorialSample);
  assert.equal(result.sourceId,'arg-tech-aif-tutorial-table-example');
  assert.notEqual(result.sourceId,'QT30');
});
