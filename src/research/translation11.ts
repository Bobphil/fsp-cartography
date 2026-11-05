import {
  AuditQuery,
  ImportedCorpus,
  importRawAIF,
  runAuditQuery
} from "./translation8";
import {
  ExtractedNodeset,
  HUMAN_CODER_PROTOCOL_V1,
  HumanCoderProtocol
} from "./translation10";

export interface LargeBatchSample {
  targetPerRelation:number;
  selected:ExtractedNodeset[];
  countsByRelation:Record<"RA"|"CA"|"MA",number>;
  countsByCorpus:Record<string,number>;
  shortfalls:string[];
}

export interface HumanCoderTrialItem {
  itemId:string;
  corpusId:string;
  sourceRepository:string;
  sourcePath:string;
  relationNodeId:string;
  relationType:"RA"|"CA"|"MA";
  rawNodes:{nodeID:string;type:string;text:string}[];
  rawEdges:{edgeID:string;fromID:string;toID:string}[];
  codingFields:{
    targetNode:string;
    task:string;
    claimCeiling:string;
    standing:string;
    remainder:string;
    reopenCondition:string;
  };
}

export interface HumanCoderTrialPacket {
  packetVersion:string;
  protocolVersion:string;
  protocolFrozen:boolean;
  instructions:string[];
  items:HumanCoderTrialItem[];
  humanValidationStatus:"PENDING";
}

export interface LatencyDistribution {
  queryExecutions:number;
  elapsedMs:number;
  meanMs:number;
  p50Ms:number;
  p95Ms:number;
  maxMs:number;
  totalMatches:number;
}

export interface ScaleUpRegression {
  baselineNodesets:number;
  largeBatchNodesets:number;
  relationCoverage:string[];
  sourceCorpusCount:number;
  nativeQueryFailures:string[];
  p95Ms:number;
  performanceThresholdMs:number;
  infrastructureStatus:"PASS"|"FAIL";
  humanCodingStatus:"PENDING";
  failures:string[];
}

function canonical<T extends string>(values:T[]):T[]{
  return [...new Set(values)].sort() as T[];
}

export function buildLargeStratifiedSample(
  extracted:ExtractedNodeset[],
  targetPerRelation:number
):LargeBatchSample{
  if(targetPerRelation<1) throw new Error("targetPerRelation must be >= 1");
  const selected:ExtractedNodeset[]=[];
  const countsByRelation={RA:0,CA:0,MA:0};
  const countsByCorpus:Record<string,number>={};
  const shortfalls:string[]=[];

  for(const relationType of ["RA","CA","MA"] as const){
    const candidates=extracted
      .filter(x=>x.relationType===relationType)
      .sort((a,b)=>{
        const corpus=a.raw.corpusId.localeCompare(b.raw.corpusId);
        return corpus!==0?corpus:a.relationNodeId.localeCompare(b.relationNodeId);
      });

    const byCorpus=new Map<string,ExtractedNodeset[]>();
    for(const candidate of candidates){
      const bucket=byCorpus.get(candidate.raw.corpusId)??[];
      bucket.push(candidate);
      byCorpus.set(candidate.raw.corpusId,bucket);
    }
    const corpusIds=[...byCorpus.keys()].sort();
    let index=0;
    while(countsByRelation[relationType]<targetPerRelation){
      let added=false;
      for(const corpusId of corpusIds){
        if(countsByRelation[relationType]>=targetPerRelation) break;
        const bucket=byCorpus.get(corpusId)!;
        if(index<bucket.length){
          const chosen=bucket[index];
          selected.push(chosen);
          countsByRelation[relationType]++;
          countsByCorpus[corpusId]=(countsByCorpus[corpusId]??0)+1;
          added=true;
        }
      }
      if(!added) break;
      index++;
    }

    if(countsByRelation[relationType]<targetPerRelation){
      shortfalls.push(
        `${relationType}:${countsByRelation[relationType]}/${targetPerRelation}`
      );
    }
  }

  return {
    targetPerRelation,
    selected,
    countsByRelation,
    countsByCorpus,
    shortfalls
  };
}

export function makeHumanCoderTrialPacket(
  selected:ExtractedNodeset[],
  perRelation:number,
  protocol:HumanCoderProtocol=HUMAN_CODER_PROTOCOL_V1
):HumanCoderTrialPacket{
  if(perRelation<1) throw new Error("perRelation must be >= 1");
  const items:HumanCoderTrialItem[]=[];
  for(const relationType of ["RA","CA","MA"] as const){
    const candidates=selected.filter(x=>x.relationType===relationType);
    const corpusSeen=new Set<string>();
    for(const candidate of candidates){
      if(items.filter(x=>x.relationType===relationType).length>=perRelation) break;
      if(corpusSeen.has(candidate.raw.corpusId) && candidates.some(
        c=>!corpusSeen.has(c.raw.corpusId)
      )) continue;
      corpusSeen.add(candidate.raw.corpusId);
      items.push({
        itemId:`${candidate.raw.corpusId}::${candidate.relationNodeId}`,
        corpusId:candidate.raw.corpusId,
        sourceRepository:candidate.raw.sourceRepository,
        sourcePath:candidate.raw.sourcePath,
        relationNodeId:candidate.relationNodeId,
        relationType:candidate.relationType,
        rawNodes:candidate.raw.nodes.map(n=>({
          nodeID:n.nodeID,type:n.type,text:n.text
        })),
        rawEdges:candidate.raw.edges.map(e=>({
          edgeID:e.edgeID,fromID:e.fromID,toID:e.toID
        })),
        codingFields:{
          targetNode:"",
          task:"",
          claimCeiling:"",
          standing:"",
          remainder:"",
          reopenCondition:""
        }
      });
    }
  }

  return {
    packetVersion:"FSP-AIF-HUMAN-TRIAL-1.0",
    protocolVersion:protocol.version,
    protocolFrozen:protocol.frozen,
    instructions:[
      "Code each item independently before seeing another coder's response.",
      "Do not alter any original corpus or node identifier.",
      "Distinguish source-visible structure from FSP interpretation.",
      "Leave unknowns explicit rather than filling them by inference.",
      "Record disagreement; do not optimize for agreement.",
      "Submit the complete packet before adjudication."
    ],
    items,
    humanValidationStatus:"PENDING"
  };
}

function nowMs():number{
  return globalThis.performance?.now?.() ?? Date.now();
}

function percentile(values:number[],fraction:number):number{
  if(values.length===0) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const index=Math.min(sorted.length-1,Math.max(0,Math.ceil(fraction*sorted.length)-1));
  return sorted[index];
}

export function benchmarkQueryLatencyDistribution(
  corpora:ImportedCorpus[],
  queries:AuditQuery[],
  iterations:number
):LatencyDistribution{
  if(iterations<1) throw new Error("iterations must be >= 1");
  const durations:number[]=[];
  let totalMatches=0;
  const overallStart=nowMs();

  for(let i=0;i<iterations;i++){
    for(const query of queries){
      const start=nowMs();
      const result=runAuditQuery(corpora,query);
      durations.push(nowMs()-start);
      totalMatches+=result.matches.length;
    }
  }

  const elapsedMs=nowMs()-overallStart;
  const total=durations.length;
  const sum=durations.reduce((a,b)=>a+b,0);

  return {
    queryExecutions:total,
    elapsedMs,
    meanMs:total===0?0:sum/total,
    p50Ms:percentile(durations,0.50),
    p95Ms:percentile(durations,0.95),
    maxMs:total===0?0:Math.max(...durations),
    totalMatches
  };
}

export function importedFromExtracted(
  selected:ExtractedNodeset[]
):ImportedCorpus[]{
  return selected.map(x=>importRawAIF(x.raw,[]));
}

export function evaluateScaleUpRegression(
  baselineNodesets:number,
  selected:ExtractedNodeset[],
  latency:LatencyDistribution,
  performanceThresholdMs:number,
  requiredNativeQueries:{name:string;query:AuditQuery}[]
):ScaleUpRegression{
  const failures:string[]=[];
  const corpora=importedFromExtracted(selected);
  const relationCoverage=canonical(selected.map(x=>x.relationType));
  const sourceCorpusCount=new Set(selected.map(x=>x.raw.corpusId)).size;
  const nativeQueryFailures=requiredNativeQueries
    .filter(q=>runAuditQuery(corpora,q.query).matches.length===0)
    .map(q=>q.name);

  if(selected.length<30) failures.push("large-batch-below-30");
  if(selected.length<=baselineNodesets) failures.push("no-scale-increase");
  for(const type of ["RA","CA","MA"]){
    if(!relationCoverage.includes(type as "RA"|"CA"|"MA"))
      failures.push(`missing-relation-${type}`);
  }
  if(sourceCorpusCount<2) failures.push("single-corpus-only");
  if(nativeQueryFailures.length>0) failures.push("native-query-failure");
  if(latency.p95Ms>performanceThresholdMs) failures.push("p95-latency-above-threshold");

  return {
    baselineNodesets,
    largeBatchNodesets:selected.length,
    relationCoverage,
    sourceCorpusCount,
    nativeQueryFailures,
    p95Ms:latency.p95Ms,
    performanceThresholdMs,
    infrastructureStatus:failures.length===0?"PASS":"FAIL",
    humanCodingStatus:"PENDING",
    failures
  };
}
