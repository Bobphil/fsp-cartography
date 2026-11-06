const test=require('node:test');
const assert=require('node:assert/strict');
const {
  RELATION_GRAPH_CONSTITUTION,
  buildRelationGraph,
  explainRelation,
  incoming,
  outgoing,
  subgraphForEnvironment,
  traverse,
  validateRelationGraph
}=require('../../dist/research/fspRelationGraph.js');
const {FIVE_CASE_ATLAS}=require('../../dist/research/fiveCaseAtlasFixtures.js');
const {NAVIGATION_BINDINGS}=require('../../dist/research/encyclopediaNavigation.js');
const {NEPTUNE_VULCAN_PROBE_BINDINGS}=require('../../dist/research/fspEcosystemBridge.js');

const graph=buildRelationGraph(FIVE_CASE_ATLAS);

test('relation graph validates against Atlas navigation public architecture and ecosystem bridge',()=>{
  const result=validateRelationGraph(graph,FIVE_CASE_ATLAS);
  assert.equal(result.passes,true,JSON.stringify(result.failures));
});

test('graph constitution blocks untyped adjacency inference',()=>{
  assert.ok(RELATION_GRAPH_CONSTITUTION.some(x=>x.includes('Graph adjacency is not identity')));
  assert.ok(RELATION_GRAPH_CONSTITUTION.some(x=>x.includes('declare the relation types')));
});

test('graph contains all required object families',()=>{
  const kinds=new Set(graph.nodes.map(x=>x.kind));
  for(const kind of ['CHAPTER','SECTION','CASE','STATE','TRANSITION','PROBE','SOURCE','CLAIM_CEILING','CONCEPT','TOOL','CLASSROOM_EXERCISE','VR_EXPERIENCE','APPLICATION_PROFILE','RESEARCH_TEST']){
    assert.ok(kinds.has(kind),kind);
  }
});

test('every certified navigation binding becomes an exact ROUTES_TO edge',()=>{
  const routes=graph.edges.filter(e=>e.type==='ROUTES_TO');
  const expected=NAVIGATION_BINDINGS.reduce((n,b)=>n+b.targets.length,0);
  assert.equal(routes.length,expected);
});

test('CH1.2 routes exactly to its certified Neptune/Vulcan targets',()=>{
  const edges=outgoing(graph,'section:CH1.2',['ROUTES_TO']);
  assert.deepEqual(
    edges.map(e=>e.to).sort(),
    [
      'canonical:CLAIM_CEILING:NEPTUNE-VULCAN:NEPTUNE-VULCAN',
      'canonical:PROBE:NEPTUNE-VULCAN:NV-PROBE-VULCAN',
      'canonical:TRANSITION:NEPTUNE-VULCAN:NV0-NV1',
      'canonical:TRANSITION:NEPTUNE-VULCAN:NV1-NV2',
      'canonical:TRANSITION:NEPTUNE-VULCAN:NV3-NV4'
    ].sort()
  );
});

test('Vulcan probe projects into all five ecosystem environments',()=>{
  const id='canonical:PROBE:NEPTUNE-VULCAN:NV-PROBE-VULCAN';
  const edges=outgoing(graph,id,['PROJECTS_AS']);
  assert.equal(edges.length,NEPTUNE_VULCAN_PROBE_BINDINGS.length);
  assert.deepEqual(
    new Set(edges.map(e=>graph.nodes.find(n=>n.nodeId===e.to).environment)),
    new Set(['ENCYCLOPEDIA','CLASSROOM','VR','APPLICATION','RESEARCH'])
  );
});

test('projection-specific edges distinguish practice spatialization transfer and evaluation',()=>{
  const id='canonical:PROBE:NEPTUNE-VULCAN:NV-PROBE-VULCAN';
  const edges=outgoing(graph,id,['PRACTICED_AS','SPATIALIZED_AS','TRANSFERRED_AS','EVALUATED_BY']);
  assert.deepEqual(new Set(edges.map(e=>e.type)),new Set(['PRACTICED_AS','SPATIALIZED_AS','TRANSFERRED_AS','EVALUATED_BY']));
});

test('classroom exercise declares its concept and tool overlays',()=>{
  const node='projection:CLASSROOM:NV-PROBE-CLASSROOM';
  assert.ok(outgoing(graph,node,['USES_CONCEPT']).some(e=>e.to==='concept:UNDERDETERMINATION'));
  const tools=outgoing(graph,node,['USES_TOOL']).map(e=>e.to);
  assert.ok(tools.includes('tool:REVISION-TARGET-AUDIT'));
  assert.ok(tools.includes('tool:CONTROLLED-REVISION-PROBE'));
});

test('VR subgraph contains canonical probe plus controlled-revision concept and tool',()=>{
  const vr=subgraphForEnvironment(graph,'VR');
  const ids=new Set(vr.nodes.map(n=>n.nodeId));
  assert.ok(ids.has('projection:VR:NV-PROBE-VR'));
  assert.ok(ids.has('canonical:PROBE:NEPTUNE-VULCAN:NV-PROBE-VULCAN'));
  assert.ok(ids.has('concept:CONTROLLED-REVISION'));
  assert.ok(ids.has('tool:CONTROLLED-REVISION-PROBE'));
});

test('application transfer edge is typed as transfer not authorization',()=>{
  const id='canonical:PROBE:NEPTUNE-VULCAN:NV-PROBE-VULCAN';
  const transfer=outgoing(graph,id,['TRANSFERRED_AS'])[0];
  assert.equal(transfer.semantics,'TRANSFER');
  assert.equal(transfer.authority,'ECOSYSTEM_BRIDGE');
  assert.doesNotMatch(transfer.rationale,/authoriz/i);
});

test('research test is incoming evaluative relation on the canonical probe',()=>{
  const research='projection:RESEARCH:NV-PROBE-RESEARCH';
  const incomingEdges=incoming(graph,research,['EVALUATED_BY','PROJECTS_AS']);
  assert.ok(incomingEdges.some(e=>e.type==='EVALUATED_BY'));
  assert.ok(incomingEdges.some(e=>e.type==='PROJECTS_AS'));
});

test('traversal fails closed without explicit edge types',()=>{
  assert.throws(()=>traverse(graph,'section:CH1.2',[],3),/requires explicit relation types/);
});

test('typed traversal can move CH1.2 to probe to VR without using unrelated edges',()=>{
  const paths=traverse(graph,'section:CH1.2',['ROUTES_TO','SPATIALIZED_AS'],2);
  assert.ok(paths.some(p=>p.nodeIds.at(-1)==='projection:VR:NV-PROBE-VR'));
  assert.equal(paths.some(p=>p.nodeIds.includes('projection:APPLICATION:NV-PROBE-APPLICATION')),false);
});

test('explainRelation includes authority rationale and adjacency warning',()=>{
  const edge=graph.edges.find(e=>e.from==='section:CH1.2' && e.type==='ROUTES_TO' && e.to.includes('NV-PROBE-VULCAN'));
  const explanation=explainRelation(graph,edge.edgeId);
  assert.equal(explanation.edge.authority,'CERTIFIED_NAVIGATION');
  assert.match(explanation.warning,/adjacency adds no further inference/);
});

test('canonical graph nodes retain certified canonical fingerprints',()=>{
  const canon=graph.nodes.filter(n=>n.canonicalRef);
  assert.ok(canon.length>0);
  assert.ok(canon.every(n=>typeof n.canonicalRef.fingerprint==='string' && n.canonicalRef.fingerprint.length>10));
});
