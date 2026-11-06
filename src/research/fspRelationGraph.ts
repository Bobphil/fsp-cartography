import { CanonicalCaseDossier } from "./fiveCaseAtlas";
import {
  CHAPTER_SECTIONS,
  NAVIGATION_BINDINGS,
  AtlasTargetKind,
  ChapterId
} from "./encyclopediaNavigation";
import { PUBLIC_ARCHITECTURE } from "./encyclopediaPublicArchitecture";
import {
  EcosystemEnvironment,
  NEPTUNE_VULCAN_PROBE_BINDINGS,
  ProjectionBinding,
  canonicalFingerprint
} from "./fspEcosystemBridge";

export type RelationNodeKind =
  | "CHAPTER"
  | "SECTION"
  | "CASE"
  | "STATE"
  | "TRANSITION"
  | "PROBE"
  | "SOURCE"
  | "CLAIM_CEILING"
  | "CONCEPT"
  | "TOOL"
  | "ENCYCLOPEDIA_VIEW"
  | "CLASSROOM_EXERCISE"
  | "VR_EXPERIENCE"
  | "APPLICATION_PROFILE"
  | "RESEARCH_TEST";

export type RelationAuthority =
  | "CANONICAL_ATLAS"
  | "CERTIFIED_NAVIGATION"
  | "PUBLIC_ARCHITECTURE"
  | "ECOSYSTEM_BRIDGE"
  | "PROGRAM_SPEC";

export type RelationType =
  | "CONTAINS"
  | "ROUTES_TO"
  | "ILLUSTRATES"
  | "EXPLAINS"
  | "OPERATIONALIZES"
  | "SUPPORTED_BY"
  | "BOUNDED_BY"
  | "PROJECTS_AS"
  | "USES_CONCEPT"
  | "USES_TOOL"
  | "PRACTICED_AS"
  | "SPATIALIZED_AS"
  | "TRANSFERRED_AS"
  | "EVALUATED_BY"
  | "RETURNS_TOWARD";

export type RelationSemantics =
  | "STRUCTURAL"
  | "NAVIGATION"
  | "EVIDENTIAL"
  | "EXPLANATORY"
  | "OPERATIONAL"
  | "BOUNDARY"
  | "PROJECTION"
  | "TRANSFER"
  | "EVALUATIVE"
  | "RETURN";

export interface RelationNode {
  nodeId:string;
  kind:RelationNodeKind;
  label:string;
  authority:RelationAuthority;
  canonicalRef?:{
    caseId:string;
    kind:"CASE"|"STATE"|"TRANSITION"|"PROBE"|"SOURCE"|"CLAIM_CEILING";
    objectId:string;
    fingerprint:string;
  };
  environment?:EcosystemEnvironment;
  status?:"CANONICAL"|"CERTIFIED"|"PROTOTYPE";
  metadata:Record<string,string|string[]>;
}

export interface RelationEdge {
  edgeId:string;
  from:string;
  to:string;
  type:RelationType;
  semantics:RelationSemantics;
  authority:RelationAuthority;
  rationale:string;
  directional:true;
}

export interface FspRelationGraph {
  nodes:RelationNode[];
  edges:RelationEdge[];
  constitution:readonly string[];
}

export interface RelationGraphValidation {
  passes:boolean;
  failures:string[];
}

export interface RelationPath {
  nodeIds:string[];
  edgeIds:string[];
}

export const RELATION_GRAPH_CONSTITUTION=[
  "Graph adjacency is not identity, causation, evidential support, recommendation, or authorization unless the typed edge explicitly says so.",
  "Canonical Atlas identity and payload remain upstream of graph representation.",
  "Certified chapter routing may be represented by ROUTES_TO edges but may not be expanded by inference from neighboring graph nodes.",
  "Concept and tool edges are explanatory or operational overlays, not new historical evidence.",
  "Projection nodes inherit canonical identity through PROJECTS_AS and must not alter the canonical fingerprint.",
  "Transfer edges identify a candidate structural analogy or application profile; they do not authorize action in the target domain.",
  "Research edges evaluate a representation, interaction, or transfer claim; they do not certify the FSP ontology.",
  "Every graph consumer must declare the relation types it is permitted to traverse.",
  "Return relations restore the originating human or domain context; they are not equivalent to semantic reverse edges."
] as const;

function unique<T>(values:T[]):T[]{ return [...new Set(values)]; }
function canonicalNodeId(kind:string,caseId:string,objectId:string):string{
  return `canonical:${kind}:${caseId}:${objectId}`;
}
function chapterNodeId(chapterId:string):string{ return `chapter:${chapterId}`; }
function sectionNodeId(sectionId:string):string{ return `section:${sectionId}`; }
function conceptNodeId(id:string):string{ return `concept:${id}`; }
function toolNodeId(id:string):string{ return `tool:${id}`; }
function projectionNodeKind(environment:EcosystemEnvironment):RelationNodeKind{
  if(environment==="ENCYCLOPEDIA") return "ENCYCLOPEDIA_VIEW";
  if(environment==="CLASSROOM") return "CLASSROOM_EXERCISE";
  if(environment==="VR") return "VR_EXPERIENCE";
  if(environment==="APPLICATION") return "APPLICATION_PROFILE";
  return "RESEARCH_TEST";
}
function projectionNodeId(binding:ProjectionBinding):string{
  return `projection:${binding.environment}:${binding.projectionId}`;
}
function edgeId(from:string,type:RelationType,to:string):string{
  return `${from}--${type}-->${to}`;
}
function atlasKind(kind:AtlasTargetKind):"STATE"|"TRANSITION"|"PROBE"|"SOURCE"|"CLAIM_CEILING"{
  return kind==="CASE_CLAIM_CEILING" ? "CLAIM_CEILING" : kind;
}
function relationNodeKind(kind:"CASE"|"STATE"|"TRANSITION"|"PROBE"|"SOURCE"|"CLAIM_CEILING"):RelationNodeKind{
  return kind;
}

function pushNode(nodes:RelationNode[],node:RelationNode):void{
  if(!nodes.some(x=>x.nodeId===node.nodeId)) nodes.push(node);
}
function pushEdge(edges:RelationEdge[],edge:Omit<RelationEdge,"edgeId"|"directional">):void{
  const completed:RelationEdge={...edge,edgeId:edgeId(edge.from,edge.type,edge.to),directional:true};
  if(!edges.some(x=>x.edgeId===completed.edgeId)) edges.push(completed);
}

function canonicalRef(
  kind:"CASE"|"STATE"|"TRANSITION"|"PROBE"|"SOURCE"|"CLAIM_CEILING",
  caseId:string,
  objectId:string,
  dossiers:CanonicalCaseDossier[]
){
  return {
    caseId,kind,objectId,
    fingerprint:canonicalFingerprint({kind,caseId,objectId},dossiers)
  };
}

export function buildRelationGraph(dossiers:CanonicalCaseDossier[]):FspRelationGraph{
  const nodes:RelationNode[]=[];
  const edges:RelationEdge[]=[];

  for(const chapter of PUBLIC_ARCHITECTURE.chapters){
    pushNode(nodes,{
      nodeId:chapterNodeId(chapter.chapterId),kind:"CHAPTER",label:chapter.title,
      authority:"PUBLIC_ARCHITECTURE",status:"CERTIFIED",
      metadata:{chapterId:chapter.chapterId,publicQuestion:chapter.publicQuestion}
    });
  }

  for(const section of CHAPTER_SECTIONS){
    pushNode(nodes,{
      nodeId:sectionNodeId(section.sectionId),kind:"SECTION",label:section.title,
      authority:"CERTIFIED_NAVIGATION",status:"CERTIFIED",
      metadata:{chapterId:section.chapterId,sectionId:section.sectionId,summary:section.summary}
    });
    pushEdge(edges,{
      from:chapterNodeId(section.chapterId),to:sectionNodeId(section.sectionId),
      type:"CONTAINS",semantics:"STRUCTURAL",authority:"CERTIFIED_NAVIGATION",
      rationale:"Canonical chapter sequence contains this certified section."
    });
  }

  for(const dossier of dossiers){
    const caseId=canonicalNodeId("CASE",dossier.caseId,dossier.caseId);
    pushNode(nodes,{
      nodeId:caseId,kind:"CASE",label:dossier.title,authority:"CANONICAL_ATLAS",status:"CANONICAL",
      canonicalRef:canonicalRef("CASE",dossier.caseId,dossier.caseId,dossiers),
      metadata:{question:dossier.canonicalQuestion}
    });

    for(const state of dossier.states){
      const id=canonicalNodeId("STATE",dossier.caseId,state.stateId);
      pushNode(nodes,{
        nodeId:id,kind:"STATE",label:`${state.stateId} · ${state.periodLabel}`,
        authority:"CANONICAL_ATLAS",status:"CANONICAL",
        canonicalRef:canonicalRef("STATE",dossier.caseId,state.stateId,dossiers),
        metadata:{caseId:dossier.caseId,ordinal:String(state.ordinal)}
      });
      pushEdge(edges,{
        from:caseId,to:id,type:"CONTAINS",semantics:"STRUCTURAL",authority:"CANONICAL_ATLAS",
        rationale:"Canonical dossier contains this inquiry state."
      });
      for(const sourceId of state.sourceIds){
        pushEdge(edges,{
          from:id,to:canonicalNodeId("SOURCE",dossier.caseId,sourceId),
          type:"SUPPORTED_BY",semantics:"EVIDENTIAL",authority:"CANONICAL_ATLAS",
          rationale:"Canonical state declares this source in its sourceIds."
        });
      }
    }

    for(const transition of dossier.transitions){
      const id=canonicalNodeId("TRANSITION",dossier.caseId,transition.transitionId);
      pushNode(nodes,{
        nodeId:id,kind:"TRANSITION",label:`${transition.transitionId} · ${transition.description}`,
        authority:"CANONICAL_ATLAS",status:"CANONICAL",
        canonicalRef:canonicalRef("TRANSITION",dossier.caseId,transition.transitionId,dossiers),
        metadata:{caseId:dossier.caseId,fromStateId:transition.fromStateId,toStateId:transition.toStateId}
      });
      pushEdge(edges,{
        from:caseId,to:id,type:"CONTAINS",semantics:"STRUCTURAL",authority:"CANONICAL_ATLAS",
        rationale:"Canonical dossier contains this transition."
      });
      for(const sourceId of transition.sourceIds){
        pushEdge(edges,{
          from:id,to:canonicalNodeId("SOURCE",dossier.caseId,sourceId),
          type:"SUPPORTED_BY",semantics:"EVIDENTIAL",authority:"CANONICAL_ATLAS",
          rationale:"Canonical transition declares this source in its sourceIds."
        });
      }
    }

    for(const probe of dossier.controlledRevisionProbes){
      const id=canonicalNodeId("PROBE",dossier.caseId,probe.probeId);
      pushNode(nodes,{
        nodeId:id,kind:"PROBE",label:probe.probeId,authority:"CANONICAL_ATLAS",status:"CANONICAL",
        canonicalRef:canonicalRef("PROBE",dossier.caseId,probe.probeId,dossiers),
        metadata:{caseId:dossier.caseId,stateId:probe.stateId}
      });
      pushEdge(edges,{
        from:caseId,to:id,type:"CONTAINS",semantics:"STRUCTURAL",authority:"CANONICAL_ATLAS",
        rationale:"Canonical dossier contains this controlled revision probe."
      });
    }

    for(const source of dossier.sourceLedger){
      const id=canonicalNodeId("SOURCE",dossier.caseId,source.sourceId);
      pushNode(nodes,{
        nodeId:id,kind:"SOURCE",label:source.title,authority:"CANONICAL_ATLAS",status:"CANONICAL",
        canonicalRef:canonicalRef("SOURCE",dossier.caseId,source.sourceId,dossiers),
        metadata:{caseId:dossier.caseId,sourceType:source.sourceType,url:source.url}
      });
      pushEdge(edges,{
        from:caseId,to:id,type:"CONTAINS",semantics:"STRUCTURAL",authority:"CANONICAL_ATLAS",
        rationale:"Canonical dossier source ledger contains this source."
      });
    }

    const ceilingId=canonicalNodeId("CLAIM_CEILING",dossier.caseId,dossier.caseId);
    pushNode(nodes,{
      nodeId:ceilingId,kind:"CLAIM_CEILING",label:`${dossier.title} · claim ceiling`,
      authority:"CANONICAL_ATLAS",status:"CANONICAL",
      canonicalRef:canonicalRef("CLAIM_CEILING",dossier.caseId,dossier.caseId,dossiers),
      metadata:{caseId:dossier.caseId}
    });
    pushEdge(edges,{
      from:caseId,to:ceilingId,type:"BOUNDED_BY",semantics:"BOUNDARY",authority:"CANONICAL_ATLAS",
      rationale:"Canonical dossier is bounded by its case claim ceiling and may-not-infer constraints."
    });
  }

  for(const binding of NAVIGATION_BINDINGS){
    for(const target of binding.targets){
      const kind=atlasKind(target.kind);
      pushEdge(edges,{
        from:sectionNodeId(binding.sectionId),
        to:canonicalNodeId(kind,target.caseId,target.targetId),
        type:"ROUTES_TO",semantics:"NAVIGATION",authority:"CERTIFIED_NAVIGATION",
        rationale:target.rationale
      });
    }
  }

  for(const concept of PUBLIC_ARCHITECTURE.concepts){
    const id=conceptNodeId(concept.conceptId);
    pushNode(nodes,{
      nodeId:id,kind:"CONCEPT",label:concept.title,authority:"PUBLIC_ARCHITECTURE",status:"CERTIFIED",
      metadata:{definition:concept.shortDefinition}
    });
    for(const caseId of concept.caseIds){
      pushEdge(edges,{
        from:id,to:canonicalNodeId("CASE",caseId,caseId),
        type:"EXPLAINS",semantics:"EXPLANATORY",authority:"PUBLIC_ARCHITECTURE",
        rationale:"Certified public concept declares this case as an illustration."
      });
      pushEdge(edges,{
        from:canonicalNodeId("CASE",caseId,caseId),to:id,
        type:"ILLUSTRATES",semantics:"EXPLANATORY",authority:"PUBLIC_ARCHITECTURE",
        rationale:"Certified public case illustrates this concept."
      });
    }
  }

  for(const tool of PUBLIC_ARCHITECTURE.tools){
    const id=toolNodeId(tool.toolId);
    pushNode(nodes,{
      nodeId:id,kind:"TOOL",label:tool.title,authority:"PUBLIC_ARCHITECTURE",status:"CERTIFIED",
      metadata:{purpose:tool.publicPurpose,minimumDepth:tool.minimumDepth}
    });
    for(const caseId of tool.caseIds){
      pushEdge(edges,{
        from:id,to:canonicalNodeId("CASE",caseId,caseId),
        type:"OPERATIONALIZES",semantics:"OPERATIONAL",authority:"PUBLIC_ARCHITECTURE",
        rationale:"Certified public tool is applicable to this case."
      });
    }
  }

  for(const binding of NEPTUNE_VULCAN_PROBE_BINDINGS){
    const projectionId=projectionNodeId(binding);
    const kind=projectionNodeKind(binding.environment);
    pushNode(nodes,{
      nodeId:projectionId,kind,label:binding.purpose,authority:"ECOSYSTEM_BRIDGE",status:"PROTOTYPE",
      environment:binding.environment,
      metadata:{
        projectionId:binding.projectionId,
        returnContract:binding.returnContract,
        claimCeilingPolicy:binding.claimCeilingPolicy
      }
    });
    const canonicalId=canonicalNodeId(
      binding.canonical.kind,
      binding.canonical.caseId,
      binding.canonical.objectId
    );
    pushEdge(edges,{
      from:canonicalId,to:projectionId,type:"PROJECTS_AS",semantics:"PROJECTION",authority:"ECOSYSTEM_BRIDGE",
      rationale:"Certified ecosystem binding projects one canonical object into this environment."
    });

    const specialType:RelationType =
      binding.environment==="CLASSROOM" ? "PRACTICED_AS" :
      binding.environment==="VR" ? "SPATIALIZED_AS" :
      binding.environment==="APPLICATION" ? "TRANSFERRED_AS" :
      binding.environment==="RESEARCH" ? "EVALUATED_BY" :
      "PROJECTS_AS";
    if(specialType!=="PROJECTS_AS"){
      pushEdge(edges,{
        from:canonicalId,to:projectionId,type:specialType,
        semantics:
          binding.environment==="APPLICATION" ? "TRANSFER" :
          binding.environment==="RESEARCH" ? "EVALUATIVE" :
          "PROJECTION",
        authority:"ECOSYSTEM_BRIDGE",
        rationale:binding.purpose
      });
    }

    for(const overlay of binding.overlays){
      const overlayId=overlay.kind==="CONCEPT" ? conceptNodeId(overlay.objectId) : toolNodeId(overlay.objectId);
      pushEdge(edges,{
        from:projectionId,to:overlayId,
        type:overlay.kind==="CONCEPT" ? "USES_CONCEPT" : "USES_TOOL",
        semantics:overlay.kind==="CONCEPT" ? "EXPLANATORY" : "OPERATIONAL",
        authority:"ECOSYSTEM_BRIDGE",
        rationale:"Projection binding explicitly declares this overlay."
      });
    }

    if(binding.environment==="ENCYCLOPEDIA"){
      pushEdge(edges,{
        from:projectionId,to:sectionNodeId("CH1.2"),
        type:"RETURNS_TOWARD",semantics:"RETURN",authority:"ECOSYSTEM_BRIDGE",
        rationale:"Encyclopedia projection returns to the Chapter 1 prose origin."
      });
    }
  }

  return {
    nodes:nodes.sort((a,b)=>a.nodeId.localeCompare(b.nodeId)),
    edges:edges.sort((a,b)=>a.edgeId.localeCompare(b.edgeId)),
    constitution:RELATION_GRAPH_CONSTITUTION
  };
}

export function validateRelationGraph(
  graph:FspRelationGraph,
  dossiers:CanonicalCaseDossier[]
):RelationGraphValidation{
  const failures:string[]=[];
  const nodeIds=new Set(graph.nodes.map(x=>x.nodeId));
  if(nodeIds.size!==graph.nodes.length) failures.push("duplicate-node-id");
  const edgeIds=new Set(graph.edges.map(x=>x.edgeId));
  if(edgeIds.size!==graph.edges.length) failures.push("duplicate-edge-id");

  for(const edge of graph.edges){
    if(!nodeIds.has(edge.from)) failures.push(`${edge.edgeId}:unknown-from`);
    if(!nodeIds.has(edge.to)) failures.push(`${edge.edgeId}:unknown-to`);
    if(edge.from===edge.to) failures.push(`${edge.edgeId}:self-edge`);
    if(!edge.rationale.trim()) failures.push(`${edge.edgeId}:missing-rationale`);
  }

  for(const node of graph.nodes){
    if(node.canonicalRef){
      const expected=canonicalFingerprint({
        kind:node.canonicalRef.kind,
        caseId:node.canonicalRef.caseId,
        objectId:node.canonicalRef.objectId
      },dossiers);
      if(expected!==node.canonicalRef.fingerprint) failures.push(`${node.nodeId}:fingerprint-drift`);
    }
  }

  for(const binding of NAVIGATION_BINDINGS){
    for(const target of binding.targets){
      const kind=atlasKind(target.kind);
      const expected=edgeId(
        sectionNodeId(binding.sectionId),
        "ROUTES_TO",
        canonicalNodeId(kind,target.caseId,target.targetId)
      );
      if(!edgeIds.has(expected)) failures.push(`missing-certified-route:${expected}`);
    }
  }

  for(const binding of NEPTUNE_VULCAN_PROBE_BINDINGS){
    const expected=edgeId(
      canonicalNodeId(binding.canonical.kind,binding.canonical.caseId,binding.canonical.objectId),
      "PROJECTS_AS",
      projectionNodeId(binding)
    );
    if(!edgeIds.has(expected)) failures.push(`missing-projection-edge:${binding.projectionId}`);
  }

  return {passes:failures.length===0,failures:unique(failures).sort()};
}

export function outgoing(
  graph:FspRelationGraph,
  nodeId:string,
  allowedTypes:RelationType[]
):RelationEdge[]{
  if(!graph.nodes.some(x=>x.nodeId===nodeId)) throw new Error(`unknown node: ${nodeId}`);
  const allowed=new Set(allowedTypes);
  return graph.edges.filter(e=>e.from===nodeId && allowed.has(e.type)).map(e=>structuredClone(e));
}

export function incoming(
  graph:FspRelationGraph,
  nodeId:string,
  allowedTypes:RelationType[]
):RelationEdge[]{
  if(!graph.nodes.some(x=>x.nodeId===nodeId)) throw new Error(`unknown node: ${nodeId}`);
  const allowed=new Set(allowedTypes);
  return graph.edges.filter(e=>e.to===nodeId && allowed.has(e.type)).map(e=>structuredClone(e));
}

export function traverse(
  graph:FspRelationGraph,
  startNodeId:string,
  allowedTypes:RelationType[],
  maxHops:number
):RelationPath[]{
  if(maxHops<1) return [];
  if(!graph.nodes.some(x=>x.nodeId===startNodeId)) throw new Error(`unknown node: ${startNodeId}`);
  if(allowedTypes.length===0) throw new Error("traversal requires explicit relation types");
  const allowed=new Set(allowedTypes);
  const paths:RelationPath[]=[];
  const queue:Array<{nodeId:string;nodeIds:string[];edgeIds:string[]}>= [
    {nodeId:startNodeId,nodeIds:[startNodeId],edgeIds:[]}
  ];

  while(queue.length){
    const current=queue.shift()!;
    if(current.edgeIds.length>=maxHops) continue;
    for(const edge of graph.edges.filter(e=>e.from===current.nodeId && allowed.has(e.type))){
      if(current.nodeIds.includes(edge.to)) continue;
      const next={
        nodeId:edge.to,
        nodeIds:[...current.nodeIds,edge.to],
        edgeIds:[...current.edgeIds,edge.edgeId]
      };
      paths.push({nodeIds:next.nodeIds,edgeIds:next.edgeIds});
      queue.push(next);
    }
  }
  return paths;
}

export function subgraphForEnvironment(
  graph:FspRelationGraph,
  environment:EcosystemEnvironment
):FspRelationGraph{
  const environmentNodes=new Set(
    graph.nodes.filter(n=>n.environment===environment).map(n=>n.nodeId)
  );
  const directlyConnected=new Set<string>(environmentNodes);
  for(const edge of graph.edges){
    if(environmentNodes.has(edge.from)) directlyConnected.add(edge.to);
    if(environmentNodes.has(edge.to)) directlyConnected.add(edge.from);
  }
  return {
    nodes:graph.nodes.filter(n=>directlyConnected.has(n.nodeId)).map(n=>structuredClone(n)),
    edges:graph.edges.filter(e=>directlyConnected.has(e.from) && directlyConnected.has(e.to)).map(e=>structuredClone(e)),
    constitution:graph.constitution
  };
}

export function explainRelation(
  graph:FspRelationGraph,
  edgeIdValue:string
):{
  edge:RelationEdge;
  from:RelationNode;
  to:RelationNode;
  warning:string;
}{
  const edge=graph.edges.find(e=>e.edgeId===edgeIdValue);
  if(!edge) throw new Error(`unknown edge: ${edgeIdValue}`);
  const from=graph.nodes.find(n=>n.nodeId===edge.from)!;
  const to=graph.nodes.find(n=>n.nodeId===edge.to)!;
  return {
    edge:structuredClone(edge),
    from:structuredClone(from),
    to:structuredClone(to),
    warning:"This typed relation licenses only the semantics declared on the edge; graph adjacency adds no further inference."
  };
}
