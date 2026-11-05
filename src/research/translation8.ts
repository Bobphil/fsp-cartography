export type RawAIFNodeType="L"|"I"|"RA"|"CA"|"MA"|"TA"|"YA";

export interface RawAIFNode {
  nodeID:string;
  type:RawAIFNodeType;
  text:string;
  timestamp?:string;
}
export interface RawAIFEdge {
  edgeID:string;
  fromID:string;
  toID:string;
  formEdgeID?:string|null;
}
export interface RawAIFSubgraph {
  corpusId:string;
  sourceRepository:string;
  sourcePath:string;
  sourceNodeCount:number;
  sourceEdgeCount:number;
  nodes:RawAIFNode[];
  edges:RawAIFEdge[];
}

export interface FSPNodeAugmentation {
  corpusId:string;
  nodeID:string;
  task?:string;
  claimCeiling?:string;
  standing?:string[];
  remainder?:string[];
  auxiliary?:string[];
  reopenCondition?:string;
}

export interface ImportedCorpus {
  raw:RawAIFSubgraph;
  augmentations:FSPNodeAugmentation[];
}

export interface ImportAudit {
  corpusId:string;
  originalNodeIds:string[];
  importedNodeIds:string[];
  idsPreserved:boolean;
  danglingEdges:string[];
  rawNodeCount:number;
  augmentationCount:number;
}

export type AuditQuery =
  | {kind:"RELATION_TYPE";relationType:"RA"|"CA"|"MA"}
  | {kind:"HAS_STANDING"}
  | {kind:"HAS_REMAINDER"}
  | {kind:"HAS_CLAIM_CEILING"}
  | {kind:"REOPENABLE"};

export interface AuditQueryResult {
  query:AuditQuery;
  matches:{corpusId:string;nodeID:string}[];
}

export type CompressionProfile =
  | "RAW_ONLY"
  | "NO_REMAINDER"
  | "NO_STANDING"
  | "NO_CLAIM_CEILING"
  | "NO_REOPEN"
  | "FULL";

export interface CompressionAblationResult {
  profile:CompressionProfile;
  recoverableQueries:string[];
  lostQueries:string[];
}

export function importRawAIF(
  raw:RawAIFSubgraph,
  augmentations:FSPNodeAugmentation[]
):ImportedCorpus{
  const rawIds=new Set(raw.nodes.map(n=>n.nodeID));
  for(const a of augmentations){
    if(a.corpusId!==raw.corpusId) throw new Error("Augmentation corpus mismatch");
    if(!rawIds.has(a.nodeID)) throw new Error(`Augmentation targets unknown node ${a.nodeID}`);
  }
  return {
    raw:structuredClone(raw),
    augmentations:structuredClone(augmentations)
  };
}

export function auditImport(imported:ImportedCorpus):ImportAudit{
  const originalNodeIds=imported.raw.nodes.map(n=>n.nodeID);
  const importedNodeIds=imported.raw.nodes.map(n=>n.nodeID);
  const ids=new Set(importedNodeIds);
  const danglingEdges=imported.raw.edges
    .filter(e=>!ids.has(e.fromID)||!ids.has(e.toID))
    .map(e=>e.edgeID);
  return {
    corpusId:imported.raw.corpusId,
    originalNodeIds,
    importedNodeIds,
    idsPreserved:
      originalNodeIds.length===importedNodeIds.length &&
      originalNodeIds.every((id,i)=>id===importedNodeIds[i]),
    danglingEdges,
    rawNodeCount:imported.raw.nodes.length,
    augmentationCount:imported.augmentations.length
  };
}

export function runAuditQuery(
  corpora:ImportedCorpus[],
  query:AuditQuery
):AuditQueryResult{
  const matches:{corpusId:string;nodeID:string}[]=[];
  for(const corpus of corpora){
    if(query.kind==="RELATION_TYPE"){
      for(const node of corpus.raw.nodes){
        if(node.type===query.relationType){
          matches.push({corpusId:corpus.raw.corpusId,nodeID:node.nodeID});
        }
      }
      continue;
    }
    for(const a of corpus.augmentations){
      if(query.kind==="HAS_STANDING" && (a.standing?.length??0)>0)
        matches.push({corpusId:a.corpusId,nodeID:a.nodeID});
      if(query.kind==="HAS_REMAINDER" && (a.remainder?.length??0)>0)
        matches.push({corpusId:a.corpusId,nodeID:a.nodeID});
      if(query.kind==="HAS_CLAIM_CEILING" && !!a.claimCeiling?.trim())
        matches.push({corpusId:a.corpusId,nodeID:a.nodeID});
      if(query.kind==="REOPENABLE" && !!a.reopenCondition?.trim())
        matches.push({corpusId:a.corpusId,nodeID:a.nodeID});
    }
  }
  return {query,matches};
}

export function compressCorpus(
  imported:ImportedCorpus,
  profile:CompressionProfile
):ImportedCorpus{
  if(profile==="FULL") return structuredClone(imported);
  if(profile==="RAW_ONLY") return {raw:structuredClone(imported.raw),augmentations:[]};

  const augmentations=imported.augmentations.map(a=>{
    const next=structuredClone(a);
    if(profile==="NO_REMAINDER") delete next.remainder;
    if(profile==="NO_STANDING") delete next.standing;
    if(profile==="NO_CLAIM_CEILING") delete next.claimCeiling;
    if(profile==="NO_REOPEN") delete next.reopenCondition;
    return next;
  });
  return {raw:structuredClone(imported.raw),augmentations};
}

export function auditCompressionRecovery(
  corpora:ImportedCorpus[],
  profile:CompressionProfile
):CompressionAblationResult{
  const compressed=corpora.map(c=>compressCorpus(c,profile));
  const namedQueries:[string,AuditQuery][]=[
    ["relation", {kind:"RELATION_TYPE",relationType:"RA"}],
    ["standing", {kind:"HAS_STANDING"}],
    ["remainder", {kind:"HAS_REMAINDER"}],
    ["claim-ceiling", {kind:"HAS_CLAIM_CEILING"}],
    ["reopen", {kind:"REOPENABLE"}]
  ];
  const recoverableQueries:string[]=[];
  const lostQueries:string[]=[];
  for(const [name,q] of namedQueries){
    const before=runAuditQuery(corpora,q).matches.length;
    const after=runAuditQuery(compressed,q).matches.length;
    if(before===after) recoverableQueries.push(name);
    else lostQueries.push(name);
  }
  return {profile,recoverableQueries,lostQueries};
}
