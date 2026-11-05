import {
  AuditQuery,
  FSPNodeAugmentation,
  ImportedCorpus,
  RawAIFEdge,
  RawAIFNode,
  RawAIFNodeType,
  RawAIFSubgraph,
  importRawAIF,
  runAuditQuery
} from "./translation8";

export interface RawAIFDocument {
  corpusId:string;
  sourceRepository:string;
  sourcePath:string;
  nodes:RawAIFNode[];
  edges:RawAIFEdge[];
}

export interface ExtractedNodeset {
  nodesetId:string;
  relationNodeId:string;
  relationType:"RA"|"CA"|"MA";
  raw:RawAIFSubgraph;
}

export interface StratifiedSample {
  requestedPerType:number;
  selected:ExtractedNodeset[];
  missingTypes:("RA"|"CA"|"MA")[];
}

export interface HumanCoderProtocol {
  version:string;
  frozen:boolean;
  coderIndependenceRequired:boolean;
  revealOtherCoderBeforeSubmission:boolean;
  requiredFields:string[];
  disagreementFields:string[];
  adjudicationRule:string;
  forbiddenShortcuts:string[];
}

export interface QueryBenchmark {
  iterations:number;
  queryCount:number;
  totalExecutions:number;
  elapsedMs:number;
  meanMsPerExecution:number;
  totalMatches:number;
}

export interface ScaleUpGateInput {
  extractedCount:number;
  relationTypesCovered:string[];
  idsPreserved:boolean;
  danglingEdges:number;
  coderProtocolFrozen:boolean;
  structuralCodingAgreement:number;
  meanQueryMs:number;
  requiredQueryFailures:number;
}

export interface ScaleUpGateResult {
  passes:boolean;
  failures:string[];
}

const RELATION_TYPES:("RA"|"CA"|"MA")[]=["RA","CA","MA"];

export function extractRelationCenteredNodesets(
  doc:RawAIFDocument,
  relationTypes:("RA"|"CA"|"MA")[]=RELATION_TYPES
):ExtractedNodeset[]{
  const allowed=new Set(relationTypes);
  const relationNodes=doc.nodes.filter(
    n=>allowed.has(n.type as "RA"|"CA"|"MA")
  );
  return relationNodes.map(rel=>{
    const ids=new Set<string>([rel.nodeID]);
    for(const edge of doc.edges){
      if(edge.fromID===rel.nodeID || edge.toID===rel.nodeID){
        ids.add(edge.fromID);
        ids.add(edge.toID);
      }
    }
    const nodes=doc.nodes.filter(n=>ids.has(n.nodeID));
    const edges=doc.edges.filter(e=>ids.has(e.fromID)&&ids.has(e.toID));
    return {
      nodesetId:`${doc.corpusId}-${rel.type.toLowerCase()}-${rel.nodeID}`,
      relationNodeId:rel.nodeID,
      relationType:rel.type as "RA"|"CA"|"MA",
      raw:{
        corpusId:doc.corpusId,
        sourceRepository:doc.sourceRepository,
        sourcePath:doc.sourcePath,
        sourceNodeCount:doc.nodes.length,
        sourceEdgeCount:doc.edges.length,
        nodes:structuredClone(nodes),
        edges:structuredClone(edges)
      }
    };
  });
}

export function stratifiedRelationSample(
  extracted:ExtractedNodeset[],
  perType:number
):StratifiedSample{
  if(perType<1) throw new Error("perType must be >= 1");
  const selected:ExtractedNodeset[]=[];
  const missingTypes:("RA"|"CA"|"MA")[]=[];
  for(const type of RELATION_TYPES){
    const matches=extracted
      .filter(x=>x.relationType===type)
      .sort((a,b)=>a.relationNodeId.localeCompare(b.relationNodeId))
      .slice(0,perType);
    selected.push(...matches);
    if(matches.length<perType) missingTypes.push(type);
  }
  return {requestedPerType:perType,selected,missingTypes};
}

export function attachAugmentation(
  extracted:ExtractedNodeset,
  augmentations:FSPNodeAugmentation[]
):ImportedCorpus{
  return importRawAIF(extracted.raw,augmentations);
}

export const HUMAN_CODER_PROTOCOL_V1:HumanCoderProtocol={
  version:"FSP-AIF-CODER-1.0",
  frozen:true,
  coderIndependenceRequired:true,
  revealOtherCoderBeforeSubmission:false,
  requiredFields:[
    "target node",
    "task",
    "claim ceiling",
    "standing",
    "remainder",
    "reopen condition"
  ],
  disagreementFields:[
    "task",
    "claim ceiling",
    "standing",
    "remainder",
    "reopen condition"
  ],
  adjudicationRule:"preserve independent records first; adjudicate only after agreement metrics are computed",
  forbiddenShortcuts:[
    "copy another coder's augmentation",
    "rewrite original AIF node IDs",
    "treat missing source information as known",
    "infer standing solely from practical power",
    "erase disagreement to improve agreement score"
  ]
};

export function validateHumanCoderProtocol(
  protocol:HumanCoderProtocol
):string[]{
  const failures:string[]=[];
  if(!protocol.frozen) failures.push("protocol-not-frozen");
  if(!protocol.coderIndependenceRequired) failures.push("independence-not-required");
  if(protocol.revealOtherCoderBeforeSubmission) failures.push("premature-coder-reveal");
  if(!protocol.requiredFields.includes("remainder")) failures.push("remainder-not-required");
  if(!protocol.requiredFields.includes("claim ceiling")) failures.push("claim-ceiling-not-required");
  if(!protocol.forbiddenShortcuts.includes("rewrite original AIF node IDs"))
    failures.push("source-id-protection-missing");
  return failures;
}

export function benchmarkAuditQueries(
  corpora:ImportedCorpus[],
  queries:AuditQuery[],
  iterations:number
):QueryBenchmark{
  if(iterations<1) throw new Error("iterations must be >= 1");
  const start=Date.now();
  let totalMatches=0;
  for(let i=0;i<iterations;i++){
    for(const query of queries){
      totalMatches+=runAuditQuery(corpora,query).matches.length;
    }
  }
  const elapsedMs=Date.now()-start;
  const totalExecutions=iterations*queries.length;
  return {
    iterations,
    queryCount:queries.length,
    totalExecutions,
    elapsedMs,
    meanMsPerExecution:totalExecutions===0?0:elapsedMs/totalExecutions,
    totalMatches
  };
}

export function evaluateScaleUpGate(
  input:ScaleUpGateInput
):ScaleUpGateResult{
  const failures:string[]=[];
  const requiredRelations=["RA","CA","MA"];
  if(input.extractedCount<6) failures.push("insufficient-extracted-nodesets");
  for(const relation of requiredRelations){
    if(!input.relationTypesCovered.includes(relation))
      failures.push(`missing-relation-${relation}`);
  }
  if(!input.idsPreserved) failures.push("source-id-preservation-failed");
  if(input.danglingEdges>0) failures.push("dangling-edges-present");
  if(!input.coderProtocolFrozen) failures.push("coder-protocol-not-frozen");
  if(input.structuralCodingAgreement<0.8) failures.push("coding-agreement-below-threshold");
  if(input.meanQueryMs>25) failures.push("query-performance-above-threshold");
  if(input.requiredQueryFailures>0) failures.push("required-query-failures");
  return {passes:failures.length===0,failures};
}
