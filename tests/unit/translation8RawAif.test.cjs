const test=require('node:test');
const assert=require('node:assert/strict');

const {
  importRawAIF,
  auditImport,
  runAuditQuery,
  compressCorpus,
  auditCompressionRecovery
}=require('../../dist/research/translation8.js');

const {
  kosciuszkoRaw,
  otwayRaw,
  kosciuszkoAugmentations,
  otwayAugmentations
}=require('../../dist/research/translation8Fixtures.js');

const imported=()=>[
  importRawAIF(kosciuszkoRaw,kosciuszkoAugmentations),
  importRawAIF(otwayRaw,otwayAugmentations)
];

test('raw multi-corpus import preserves original node IDs exactly',()=>{
  for(const corpus of imported()){
    const audit=auditImport(corpus);
    assert.equal(audit.idsPreserved,true);
    assert.deepEqual(audit.originalNodeIds,audit.importedNodeIds);
  }
});

test('raw imported subgraphs have no dangling edges',()=>{
  for(const corpus of imported()){
    const audit=auditImport(corpus);
    assert.deepEqual(audit.danglingEdges,[]);
  }
});

test('external source scale metadata remains visible',()=>{
  assert.equal(kosciuszkoRaw.sourceNodeCount,1195);
  assert.equal(kosciuszkoRaw.sourceEdgeCount,1383);
  assert.equal(otwayRaw.sourceNodeCount,739);
  assert.equal(otwayRaw.sourceEdgeCount,784);
});

test('augmentation must target original existing node ID',()=>{
  assert.throws(
    ()=>importRawAIF(kosciuszkoRaw,[{
      corpusId:'kosciuszko00219',
      nodeID:'synthetic-renumbered-node',
      standing:['invalid']
    }]),
    /unknown node/
  );
});

test('augmentation corpus mismatch is rejected',()=>{
  assert.throws(
    ()=>importRawAIF(kosciuszkoRaw,[{
      corpusId:'wrong-corpus',
      nodeID:'610172',
      standing:['invalid']
    }]),
    /corpus mismatch/
  );
});

test('raw AIF conflict relation is recoverable in kosciuszko subgraph',()=>{
  const result=runAuditQuery(imported(),{kind:'RELATION_TYPE',relationType:'CA'});
  assert.ok(result.matches.some(x=>
    x.corpusId==='kosciuszko00219' && x.nodeID==='610187'
  ));
});

test('raw AIF inference relation is recoverable in otway subgraph',()=>{
  const result=runAuditQuery(imported(),{kind:'RELATION_TYPE',relationType:'RA'});
  assert.ok(result.matches.some(x=>
    x.corpusId==='otway00219' &&
    x.nodeID==='1201647_164813044708340528'
  ));
});

test('FSP standing query recovers overlay targets without altering raw IDs',()=>{
  const corpora=imported();
  const result=runAuditQuery(corpora,{kind:'HAS_STANDING'});
  assert.ok(result.matches.some(x=>x.nodeID==='610172'));
  assert.ok(result.matches.some(x=>x.nodeID==='1196468_164813044708340528'));
  for(const match of result.matches){
    const corpus=corpora.find(c=>c.raw.corpusId===match.corpusId);
    assert.ok(corpus.raw.nodes.some(n=>n.nodeID===match.nodeID));
  }
});

test('FSP remainder claim-ceiling and reopen queries are recoverable',()=>{
  const corpora=imported();
  assert.ok(runAuditQuery(corpora,{kind:'HAS_REMAINDER'}).matches.length>=4);
  assert.ok(runAuditQuery(corpora,{kind:'HAS_CLAIM_CEILING'}).matches.length>=4);
  assert.ok(runAuditQuery(corpora,{kind:'REOPENABLE'}).matches.length>=4);
});

test('raw-only compression preserves native relation queries but loses FSP governance queries',()=>{
  const corpora=imported();
  const compressed=corpora.map(c=>compressCorpus(c,'RAW_ONLY'));
  assert.deepEqual(
    runAuditQuery(compressed,{kind:'RELATION_TYPE',relationType:'RA'}).matches,
    runAuditQuery(corpora,{kind:'RELATION_TYPE',relationType:'RA'}).matches
  );
  assert.equal(runAuditQuery(compressed,{kind:'HAS_REMAINDER'}).matches.length,0);
  assert.equal(runAuditQuery(compressed,{kind:'HAS_STANDING'}).matches.length,0);
});

test('NO_REMAINDER selectively destroys remainder recovery',()=>{
  const result=auditCompressionRecovery(imported(),'NO_REMAINDER');
  assert.ok(result.lostQueries.includes('remainder'));
  assert.ok(result.recoverableQueries.includes('standing'));
  assert.ok(result.recoverableQueries.includes('claim-ceiling'));
  assert.ok(result.recoverableQueries.includes('reopen'));
});

test('NO_STANDING selectively destroys standing recovery',()=>{
  const result=auditCompressionRecovery(imported(),'NO_STANDING');
  assert.ok(result.lostQueries.includes('standing'));
  assert.ok(result.recoverableQueries.includes('remainder'));
  assert.ok(result.recoverableQueries.includes('relation'));
});

test('NO_CLAIM_CEILING selectively destroys claim-ceiling recovery',()=>{
  const result=auditCompressionRecovery(imported(),'NO_CLAIM_CEILING');
  assert.ok(result.lostQueries.includes('claim-ceiling'));
  assert.ok(result.recoverableQueries.includes('standing'));
  assert.ok(result.recoverableQueries.includes('relation'));
});

test('NO_REOPEN selectively destroys reopen recovery',()=>{
  const result=auditCompressionRecovery(imported(),'NO_REOPEN');
  assert.ok(result.lostQueries.includes('reopen'));
  assert.ok(result.recoverableQueries.includes('remainder'));
  assert.ok(result.recoverableQueries.includes('relation'));
});

test('FULL compression profile loses no audit queries',()=>{
  const result=auditCompressionRecovery(imported(),'FULL');
  assert.deepEqual(result.lostQueries,[]);
});

test('source identifiers are corpus-scoped rather than renumbered globally',()=>{
  const corpora=imported();
  for(const corpus of corpora){
    for(const node of corpus.raw.nodes){
      assert.equal(typeof node.nodeID,'string');
      assert.ok(node.nodeID.length>0);
    }
  }
  assert.equal(corpora[0].raw.corpusId,'kosciuszko00219');
  assert.equal(corpora[1].raw.corpusId,'otway00219');
});
