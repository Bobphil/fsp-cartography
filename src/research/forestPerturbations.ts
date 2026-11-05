import { EvidenceSnapshot } from "./translation3";
import {
  forestTaskRelevantStructures,
  forestTranslationAttempts
} from "./forestCase";

const cloneStructures=()=>structuredClone(forestTaskRelevantStructures);
const cloneAttempts=()=>structuredClone(forestTranslationAttempts);

export const forestBaselineSnapshot: EvidenceSnapshot = {
  id:"forest-t0",
  label:"Baseline shared evidence",
  evidence:[
    "clearing steep slopes increases erosion risk",
    "watershed damage can become difficult to reverse"
  ],
  taskStructures:cloneStructures(),
  auxiliaryAssumptions:[
    {prfId:"A",assumptions:["erosion model calibrated locally","ecological thresholds are decision-relevant"]},
    {prfId:"B",assumptions:["temporary delay preserves legal title","erosion estimates are decision-relevant"]},
    {prfId:"C",assumptions:["place-based observations remain applicable","irreversible damage violates intergenerational obligation"]},
    {prfId:"D",assumptions:["stewardship duties apply to irreversible damage","observed ecological harm is morally relevant"]}
  ],
  translationAttempts:cloneAttempts()
};

const t1Structures=cloneStructures();
export const forestConvergentEvidenceSnapshot: EvidenceSnapshot = {
  id:"forest-t1",
  label:"New contamination evidence preserves task signature",
  evidence:[
    ...forestBaselineSnapshot.evidence,
    "spring nitrate spike observed downstream after test clearing"
  ],
  taskStructures:t1Structures.map(s=>({
    ...s,
    empiricalCommitments:[
      ...s.empiricalCommitments,
      "spring nitrate spike follows test clearing"
    ],
    predictedConsequences:[
      ...s.predictedConsequences,
      "additional clearing may worsen downstream contamination"
    ],
    licensedActions:[
      ...s.licensedActions,
      "expand water-quality monitoring"
    ]
  })),
  auxiliaryAssumptions:structuredClone(forestBaselineSnapshot.auxiliaryAssumptions),
  translationAttempts:cloneAttempts()
};

const t2Structures=cloneStructures();
const c=t2Structures.find(x=>x.prfId==="C");
if(!c) throw new Error("Missing C structure");
c.predictedConsequences=[
  ...c.predictedConsequences,
  "any commercial extraction at the sacred spring damages a non-substitutable relation"
];
c.licensedActions=[
  ...c.licensedActions,
  "exclude sacred spring zone from commercial extraction"
];

const t2Attempts=cloneAttempts().map(a=>{
  if(a.sourcePrfId==="C" && a.targetPrfId==="A"){
    return {
      ...a,
      remainder:[...a.remainder,"non-substitutable sacred-spring relation"]
    };
  }
  if(a.sourcePrfId==="A" && a.targetPrfId==="C"){
    return {
      ...a,
      remainder:[...a.remainder,"scientific evidence cannot settle sacred standing"]
    };
  }
  return a;
});

export const forestDivergentConsequenceSnapshot: EvidenceSnapshot = {
  id:"forest-t2",
  label:"Sacred-spring evidence creates a task-relevant divergence",
  evidence:[
    ...forestBaselineSnapshot.evidence,
    "archival and oral-history evidence identifies the spring as a non-substitutable ceremonial site"
  ],
  taskStructures:t2Structures,
  auxiliaryAssumptions:[
    {prfId:"A",assumptions:["erosion model calibrated locally","ecological thresholds are decision-relevant","ceremonial standing is outside ecological measurement"]},
    {prfId:"B",assumptions:["temporary delay preserves legal title","erosion estimates are decision-relevant","ceremonial standing requires institutional recognition"]},
    {prfId:"C",assumptions:["place-based observations remain applicable","irreversible damage violates intergenerational obligation","sacred spring relation is non-substitutable"]},
    {prfId:"D",assumptions:["stewardship duties apply to irreversible damage","observed ecological harm is morally relevant","sacred places may carry special duties"]}
  ],
  translationAttempts:t2Attempts
};

export const forestAuxiliaryOnlySnapshot: EvidenceSnapshot = {
  id:"forest-t3",
  label:"Auxiliary assumptions shift without changing current task signature",
  evidence:[
    ...forestBaselineSnapshot.evidence,
    "regional erosion study may not generalize to this watershed"
  ],
  taskStructures:cloneStructures(),
  auxiliaryAssumptions:[
    {prfId:"A",assumptions:["local calibration is uncertain","ecological thresholds remain decision-relevant"]},
    {prfId:"B",assumptions:["temporary delay preserves legal title","erosion estimates are decision-relevant"]},
    {prfId:"C",assumptions:["place-based observations remain applicable","irreversible damage violates intergenerational obligation"]},
    {prfId:"D",assumptions:["stewardship duties apply to irreversible damage","observed ecological harm is morally relevant"]}
  ],
  translationAttempts:cloneAttempts().map(a=>{
    if(a.sourcePrfId==="A" && a.targetPrfId==="C"){
      return {...a,remainder:[...a.remainder,"uncertain transferability of regional erosion model"]};
    }
    return a;
  })
};
