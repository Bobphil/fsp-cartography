const test=require('node:test');
const assert=require('node:assert/strict');
const {
  PUBLIC_ARCHITECTURE,
  conceptsForCase,
  comparisonsForCase,
  publicCase,
  publicChapter,
  publicConcept,
  publicComparison,
  publicTool,
  toolsForCase,
  validatePublicArchitecture
}=require('../../dist/research/encyclopediaPublicArchitecture.js');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');

test('public architecture validates against frozen chapters and five-case Atlas',()=>{
  const result=validatePublicArchitecture(PUBLIC_ARCHITECTURE,FIVE_CASE_ATLAS);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
  assert.deepEqual(result.failures,[]);
});

test('public home offers chapters cases concepts tools and comparisons as primary entrances',()=>{
  assert.deepEqual(PUBLIC_ARCHITECTURE.home.primaryEntrances,['CHAPTER','CASE','CONCEPT','TOOL','COMPARISON']);
});

test('public architecture contains exactly four chapters in canonical order',()=>{
  assert.deepEqual(
    PUBLIC_ARCHITECTURE.chapters.map(c=>c.chapterId),
    ['CH1-DUHEM-QUINE','CH2-KUHN-MEANING','CH3-THOUGHT-EXPERIMENTS','CH4-DIACHRONIC-FORMALISM']
  );
});

test('public case layer resolves all five canonical Atlas dossiers and no extras',()=>{
  assert.deepEqual(
    PUBLIC_ARCHITECTURE.cases.map(c=>c.caseId).sort(),
    FIVE_CASE_ATLAS.map(c=>c.caseId).sort()
  );
});

test('reader depth is progressive disclosure over one ontology',()=>{
  assert.deepEqual(PUBLIC_ARCHITECTURE.readerDepths.map(x=>x.depth),['READ','INSPECT','FORMAL']);
  assert.ok(PUBLIC_ARCHITECTURE.constitutionalRules.some(x=>x.includes('presentation density')));
});

test('CH1 keeps the Neptune/Vulcan pilot inside a larger public chapter architecture',()=>{
  const chapter=publicChapter('CH1-DUHEM-QUINE');
  assert.ok(chapter.sectionIds.includes('CH1.2'));
  assert.ok(chapter.featuredCaseIds.includes('NEPTUNE-VULCAN'));
  assert.ok(chapter.conceptIds.includes('UNDERDETERMINATION'));
  assert.ok(chapter.toolIds.includes('REVISION-TARGET-AUDIT'));
});

test('concept objects explain ideas while tool objects specify reader operations',()=>{
  const concept=publicConcept('CLAIM-CEILING');
  const tool=publicTool('CLAIM-CEILING-CHECK');
  assert.match(concept.shortDefinition,/strongest conclusion/);
  assert.match(tool.readerPrompt,/What may we conclude now/);
});

test('Neptune/Vulcan public overlays do not alter canonical case identity',()=>{
  const c=publicCase('NEPTUNE-VULCAN');
  assert.equal(c.caseId,'NEPTUNE-VULCAN');
  assert.ok(conceptsForCase(c.caseId).some(x=>x.conceptId==='UNDERDETERMINATION'));
  assert.ok(toolsForCase(c.caseId).some(x=>x.toolId==='CONTROLLED-REVISION-PROBE'));
});

test('comparison paths are cross-case overlays with explicit minimum reader depth',()=>{
  const c=publicComparison('MEANING-ACROSS-FRAMEWORKS');
  assert.ok(c.caseIds.length>=2);
  assert.equal(c.minimumDepth,'INSPECT');
});

test('five-case ceiling comparison includes all canonical cases',()=>{
  const c=publicComparison('FIVE-CASE-CEILINGS');
  assert.deepEqual(c.caseIds.sort(),FIVE_CASE_ATLAS.map(x=>x.caseId).sort());
});

test('case lookup returns comparison paths without creating case-to-state semantic edges',()=>{
  const paths=comparisonsForCase('DESI-2024-2026');
  assert.ok(paths.some(x=>x.comparisonId==='REVISION-PRESSURE'));
  assert.ok(paths.some(x=>x.comparisonId==='FIVE-CASE-CEILINGS'));
  assert.equal(paths.some(x=>Object.prototype.hasOwnProperty.call(x,'stateIds')),false);
});

test('return architecture preserves originating public context and reader depth',()=>{
  assert.ok(PUBLIC_ARCHITECTURE.returnPolicy.exactReturnRequiredFrom.includes('CHAPTER'));
  assert.ok(PUBLIC_ARCHITECTURE.returnPolicy.preserves.includes('reader depth'));
  assert.match(PUBLIC_ARCHITECTURE.returnPolicy.rule,/originating public context/);
});

test('source policy keeps canonical authority in Atlas ledger',()=>{
  assert.equal(PUBLIC_ARCHITECTURE.sourcePolicy.canonicalAuthority,'CanonicalCaseDossier.sourceLedger');
});

test('public architecture forbids claim-strength inflation',()=>{
  assert.ok(PUBLIC_ARCHITECTURE.constitutionalRules.includes('No public presentation may exceed the applicable canonical claim ceiling.'));
});

test('public architecture embeds the four-move router without changing canonical ownership',()=>{
  assert.deepEqual(PUBLIC_ARCHITECTURE.governance.moves.map(x=>x.id),['PORTABILITY','CEILING','AUTHORIZATION','RETURN']);
  assert.match(PUBLIC_ARCHITECTURE.governance.remainderInvariant.rule,/cross-cutting/i);
  assert.ok(PUBLIC_ARCHITECTURE.researchNavigation.governanceCore.includes('Four-Move Governance'));
  assert.ok(PUBLIC_ARCHITECTURE.researchNavigation.completionHorizon.includes('Open Remainders'));
});
