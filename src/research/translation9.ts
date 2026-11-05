import {
  ImportedCorpus,
  AuditQuery,
  CompressionProfile,
  FSPNodeAugmentation,
  auditImport,
  auditCompressionRecovery,
  importRawAIF,
  runAuditQuery
} from "./translation8";

export interface BatchNodeset {
  nodesetId:string;
  imported:ImportedCorpus;
}

export interface BatchIngestionAudit {
  nodesetCount:number;
  corpusCount:number;
  totalRawNodes:number;
  totalRawEdges:number;
  allIdsPreserved:boolean;
  danglingEdgeCount:number;
  conflictingIdentityKeys:string[];
}

export interface AugmentationCodingSample {
  coderId:string;
  nodesetId:string;
  augmentations:FSPNodeAugmentation[];
}

export interface AugmentationCodingAgreement {
  nodesetId:string;
  targetNodeAgreement:number;
  taskAgreement:number;
  claimCeilingAgreement:number;
  standingAgreement:number;
  remainderAgreement:number;
  passesStructuralAgreement:boolean;
}

export interface QueryScalingPoint {
  batchSize:number;
  matches:number;
}

export interface CompressionRetentionPoint {
  profile:CompressionProfile;
  retained:number;
  total:number;
  retention:number;
}

export interface CorpusFailureAudit {
  danglingEdges:string[];
  conflictingIdentityKeys:string[];
  nodesetsWithoutAugmentation:string[];
  queryFailures:string[];
  passes:boolean;
}

function canonical(v:string[]):string[]{return [...new Set(v)].sort();}
function same(a:string[],b:string[]):boolean{
  const x=canonical(a),y=canonical(b);
  return x.length===y.length && x.every((v,i)=>v===y[i]);
}
function ratio(matches:number,total:number):number{
  return total===0?1:matches/total;
}

export function auditBatch(nodesets:BatchNodeset[]):BatchIngestionAudit{
  const identities=new Map<string,{type:string;text:string}>();
  const conflicts:string[]=[];
  let totalRawNodes=0,totalRawEdges=0,danglingEdgeCount=0;
  let allIdsPreserved=true;

  for(const ns of nodesets){
    const audit=auditImport(ns.imported);
    totalRawNodes+=ns.imported.raw.nodes.length;
    totalRawEdges+=ns.imported.raw.edges.length;
    danglingEdgeCount+=audit.danglingEdges.length;
    allIdsPreserved=allIdsPreserved && audit.idsPreserved;
    for(const node of ns.imported.raw.nodes){
      const key=`${ns.imported.raw.corpusId}::${node.nodeID}`;
      const prior=identities.get(key);
      if(prior && (prior.type!==node.type || prior.text!==node.text)) conflicts.push(key);
      else if(!prior) identities.set(key,{type:node.type,text:node.text});
    }
  }

  return {
    nodesetCount:nodesets.length,
    corpusCount:new Set(nodesets.map(n=>n.imported.raw.corpusId)).size,
    totalRawNodes,totalRawEdges,allIdsPreserved,danglingEdgeCount,
    conflictingIdentityKeys:canonical(conflicts)
  };
}

function fieldAgreement(
  left:FSPNodeAugmentation[],
  right:FSPNodeAugmentation[],
  field:"task"|"claimCeiling"|"standing"|"remainder"
):number{
  const ids=canonical([
    ...left.map(x=>x.nodeID),
    ...right.map(x=>x.nodeID)
  ]);
  let matches=0;
  for(const id of ids){
    const a=left.find(x=>x.nodeID===id);
    const b=right.find(x=>x.nodeID===id);
    if(!a||!b) continue;
    if(field==="standing"||field==="remainder"){
      if(same(a[field]??[],b[field]??[])) matches++;
    } else if((a[field]??"")===(b[field]??"")) matches++;
  }
  return ratio(matches,ids.length);
}

export function compareAugmentationCodings(
  left:AugmentationCodingSample,
  right:AugmentationCodingSample
):AugmentationCodingAgreement{
  if(left.nodesetId!==right.nodesetId) throw new Error("Nodeset mismatch");
  const leftIds=left.augmentations.map(x=>x.nodeID);
  const rightIds=right.augmentations.map(x=>x.nodeID);
  const intersection=canonical(leftIds).filter(id=>rightIds.includes(id)).length;
  const union=new Set([...leftIds,...rightIds]).size;
  const targetNodeAgreement=ratio(intersection,union);

  const result={
    nodesetId:left.nodesetId,
    targetNodeAgreement,
    taskAgreement:fieldAgreement(left.augmentations,right.augmentations,"task"),
    claimCeilingAgreement:fieldAgreement(left.augmentations,right.augmentations,"claimCeiling"),
    standingAgreement:fieldAgreement(left.augmentations,right.augmentations,"standing"),
    remainderAgreement:fieldAgreement(left.augmentations,right.augmentations,"remainder"),
    passesStructuralAgreement:false
  };
  result.passesStructuralAgreement=
    result.targetNodeAgreement>=0.8 &&
    result.taskAgreement>=0.8 &&
    result.claimCeilingAgreement>=0.5;
  return result;
}

export function queryScaling(
  nodesets:BatchNodeset[],
  query:AuditQuery
):QueryScalingPoint[]{
  const points:QueryScalingPoint[]=[];
  for(let size=1;size<=nodesets.length;size++){
    const corpora=nodesets.slice(0,size).map(n=>n.imported);
    points.push({batchSize:size,matches:runAuditQuery(corpora,query).matches.length});
  }
  return points;
}

export function compressionRetentionCurve(
  nodesets:BatchNodeset[],
  profiles:CompressionProfile[]
):CompressionRetentionPoint[]{
  const corpora=nodesets.map(n=>n.imported);
  return profiles.map(profile=>{
    const audit=auditCompressionRecovery(corpora,profile);
    const total=audit.recoverableQueries.length+audit.lostQueries.length;
    return {
      profile,
      retained:audit.recoverableQueries.length,
      total,
      retention:ratio(audit.recoverableQueries.length,total)
    };
  });
}

export function auditCorpusFailures(
  nodesets:BatchNodeset[],
  requiredQueries:{name:string;query:AuditQuery}[]
):CorpusFailureAudit{
  const batch=auditBatch(nodesets);
  const nodesetsWithoutAugmentation=nodesets
    .filter(n=>n.imported.augmentations.length===0)
    .map(n=>n.nodesetId);
  const queryFailures:string[]=[];
  const corpora=nodesets.map(n=>n.imported);
  for(const q of requiredQueries){
    if(runAuditQuery(corpora,q.query).matches.length===0) queryFailures.push(q.name);
  }
  return {
    danglingEdges:nodesets.flatMap(n=>auditImport(n.imported).danglingEdges.map(e=>`${n.nodesetId}:${e}`)),
    conflictingIdentityKeys:batch.conflictingIdentityKeys,
    nodesetsWithoutAugmentation,
    queryFailures,
    passes:
      batch.danglingEdgeCount===0 &&
      batch.conflictingIdentityKeys.length===0 &&
      queryFailures.length===0
  };
}
