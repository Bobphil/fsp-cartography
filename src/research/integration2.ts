import { ViewId } from "../kernel/types";
import {
  HumanExposure,
  REVISION_TO_CARTOGRAPHY_CROSSWALK,
  RevisionCapabilityPlacement,
  humanVocabularyLeaks
} from "./integration1";

export type CompressionDepth = "BASE"|"PRESSURE"|"DEEP";

export type CasePressureSignal =
  | "MULTIPLE_LIVE_PATHS"
  | "EVIDENCE_CONFLICT"
  | "PERSISTENT_DISAGREEMENT"
  | "POWER_AUTHORITY_TENSION"
  | "EVIDENCE_ASYMMETRY"
  | "CREDIBILITY_DISTORTION"
  | "INTERPRETIVE_GAP"
  | "VOCABULARY_CONFLICT"
  | "HISTORICAL_INHERITANCE"
  | "INSTITUTIONAL_FEEDBACK"
  | "LOCK_IN"
  | "REPAIR_WINDOW"
  | "DISTRIBUTIONAL_CONFLICT"
  | "IRREVERSIBILITY"
  | "EMERGENCY"
  | "FRAMEWORK_CHALLENGE";

export interface HumanPrompt {
  promptId:string;
  view:ViewId;
  text:string;
  source:"BASE_GRAMMAR"|"REVISION_COMPRESSION";
  capabilityId?:string;
  exposure:HumanExposure;
  depth:CompressionDepth;
  rationale:string;
}

export interface CompressionPlan {
  view:ViewId;
  depth:CompressionDepth;
  signals:CasePressureSignal[];
  prompts:HumanPrompt[];
  suppressedCapabilityIds:string[];
  researchVocabularyLeaks:string[];
  promptBudget:number;
}

export interface CognitiveLoadAudit {
  view:ViewId;
  promptCount:number;
  promptBudget:number;
  rarePromptCount:number;
  deepPromptCount:number;
  researchVocabularyLeaks:string[];
  passes:boolean;
  failures:string[];
}

export const BASE_GRAMMAR:Record<ViewId,string[]> = {
  START:[
    "What are you trying to work through?",
    "Do you have a clear task yet, or are you still orienting?"
  ],
  PEOPLE:[
    "Who matters in this situation?",
    "What did they actually say or do, and what are you inferring?"
  ],
  INSTITUTION:[
    "What institutions, rules, or constraints matter here?",
    "Which constraints are verified, assumed, or still unclear?"
  ],
  HSF:[
    "What is inherited from the past, what matters now, and what may matter going forward?"
  ],
  CONNECTIONS:[
    "How are the people and institutions connected?",
    "Where is there practical power, authority, dependence, or a possible shared task?"
  ],
  INVESTIGATE:[
    "What possibilities are still live?",
    "What would help you learn more before committing?"
  ],
  RETURN:[
    "What is your current bounded judgment?",
    "What are you not claiming yet, and what would make you reconsider?"
  ]
};

const SIGNAL_CAPABILITIES:Record<CasePressureSignal,string[]> = {
  MULTIPLE_LIVE_PATHS:["r1-target","r1-frontier","r2-reasons","r2-good-sense"],
  EVIDENCE_CONFLICT:["r2-reasons","r3-time","r3-salience"],
  PERSISTENT_DISAGREEMENT:["r3-community","r3-practical","r4-minority","r4-legitimate"],
  POWER_AUTHORITY_TENSION:["r4-power","r9-eva"],
  EVIDENCE_ASYMMETRY:["r4-access"],
  CREDIBILITY_DISTORTION:["r5-testimonial"],
  INTERPRETIVE_GAP:["r5-hermeneutical","r5-standing","r5-counter"],
  VOCABULARY_CONFLICT:["r6-translation","r6-remainder","r6-language"],
  HISTORICAL_INHERITANCE:["r2-path","r6-concept","r7-genealogy","r7-falsefriend","r7-historical-reopen"],
  INSTITUTIONAL_FEEDBACK:["r8-network","r8-feedback"],
  LOCK_IN:["r8-lockin"],
  REPAIR_WINDOW:["r8-window","r9-sequence","r9-reversible"],
  DISTRIBUTIONAL_CONFLICT:["r9-tradeoff","r10-comp","r10-floor","r10-burden","r10-authorization"],
  IRREVERSIBILITY:["r9-reversible"],
  EMERGENCY:["r11-emergency","r11-restoration"],
  FRAMEWORK_CHALLENGE:["r12-reopen"]
};

const EXPOSURE_PRIORITY:Record<HumanExposure,number> = {
  FULL:0,
  LIGHT:1,
  COMPRESSED:2,
  RARE:3,
  NONE:4
};

function placementById(id:string):RevisionCapabilityPlacement|undefined{
  return REVISION_TO_CARTOGRAPHY_CROSSWALK.find(p=>p.capabilityId===id);
}

function promptBudgetFor(depth:CompressionDepth):number{
  if(depth==="BASE") return 2;
  if(depth==="PRESSURE") return 3;
  return 4;
}

function allowedExposure(depth:CompressionDepth, exposure:HumanExposure):boolean{
  if(exposure==="NONE") return false;
  if(depth==="BASE") return exposure==="FULL" || exposure==="LIGHT";
  if(depth==="PRESSURE") return exposure!=="RARE";
  return true;
}

export function deriveCompressionDepth(signals:CasePressureSignal[]):CompressionDepth{
  if(signals.some(s=>[
    "INTERPRETIVE_GAP","VOCABULARY_CONFLICT","HISTORICAL_INHERITANCE",
    "INSTITUTIONAL_FEEDBACK","LOCK_IN","DISTRIBUTIONAL_CONFLICT",
    "EMERGENCY","FRAMEWORK_CHALLENGE"
  ].includes(s))) return "DEEP";
  if(signals.length>0) return "PRESSURE";
  return "BASE";
}

export function buildCompressionPlan(
  view:ViewId,
  signals:CasePressureSignal[],
  explicitDepth?:CompressionDepth
):CompressionPlan{
  const depth=explicitDepth ?? deriveCompressionDepth(signals);
  const budget=promptBudgetFor(depth);
  const basePrompts=BASE_GRAMMAR[view].map((text,index)=>({
    promptId:`base:${view}:${index+1}`,
    view,
    text,
    source:"BASE_GRAMMAR" as const,
    exposure:"FULL" as HumanExposure,
    depth:"BASE" as CompressionDepth,
    rationale:"Seven-view human orientation grammar."
  }));

  const triggeredIds=[...new Set(signals.flatMap(s=>SIGNAL_CAPABILITIES[s]))];
  const placements=triggeredIds
    .map(placementById)
    .filter((p):p is RevisionCapabilityPlacement=>Boolean(p))
    .filter(p=>p.views.includes(view))
    .filter(p=>p.classes.includes("USER_VISIBLE"))
    .filter(p=>Boolean(p.ordinaryLanguageCue))
    .filter(p=>allowedExposure(depth,p.humanExposure))
    .sort((a,b)=>
      EXPOSURE_PRIORITY[a.humanExposure]-EXPOSURE_PRIORITY[b.humanExposure] ||
      a.capabilityId.localeCompare(b.capabilityId)
    );

  const selected:HumanPrompt[]=[...basePrompts];
  const usedText=new Set(selected.map(p=>p.text.toLowerCase()));
  for(const p of placements){
    if(selected.length>=budget) break;
    const text=p.ordinaryLanguageCue!;
    if(usedText.has(text.toLowerCase())) continue;
    selected.push({
      promptId:`revision:${p.capabilityId}`,
      view,
      text,
      source:"REVISION_COMPRESSION",
      capabilityId:p.capabilityId,
      exposure:p.humanExposure,
      depth:p.humanExposure==="RARE" ? "DEEP" : "PRESSURE",
      rationale:p.activationTrigger
    });
    usedText.add(text.toLowerCase());
  }

  const selectedIds=new Set(selected.map(p=>p.capabilityId).filter(Boolean));
  const suppressedCapabilityIds=placements
    .filter(p=>!selectedIds.has(p.capabilityId))
    .map(p=>p.capabilityId);

  const researchVocabularyLeaks=humanVocabularyLeaks(selected.map(p=>p.text));

  return {
    view,
    depth,
    signals:[...signals],
    prompts:selected,
    suppressedCapabilityIds,
    researchVocabularyLeaks,
    promptBudget:budget
  };
}

export function auditCognitiveLoad(plan:CompressionPlan):CognitiveLoadAudit{
  const failures:string[]=[];
  const rarePromptCount=plan.prompts.filter(p=>p.exposure==="RARE").length;
  const deepPromptCount=plan.prompts.filter(p=>p.depth==="DEEP").length;

  if(plan.prompts.length>plan.promptBudget) failures.push("prompt-budget-exceeded");
  if(rarePromptCount>1) failures.push("too-many-rare-prompts");
  if(plan.depth!=="DEEP" && rarePromptCount>0) failures.push("rare-prompt-before-deep-pressure");
  if(plan.researchVocabularyLeaks.length>0) failures.push("research-vocabulary-leak");
  if(plan.depth==="BASE" && plan.prompts.some(p=>p.source==="REVISION_COMPRESSION"))
    failures.push("revision-prompt-in-base-mode");

  return {
    view:plan.view,
    promptCount:plan.prompts.length,
    promptBudget:plan.promptBudget,
    rarePromptCount,
    deepPromptCount,
    researchVocabularyLeaks:[...plan.researchVocabularyLeaks],
    passes:failures.length===0,
    failures
  };
}

export function buildJourneyCompression(
  signalsByView:Partial<Record<ViewId,CasePressureSignal[]>>
):Record<ViewId,CompressionPlan>{
  const views:ViewId[]=["START","PEOPLE","INSTITUTION","HSF","CONNECTIONS","INVESTIGATE","RETURN"];
  return Object.fromEntries(
    views.map(view=>[view,buildCompressionPlan(view,signalsByView[view]??[])])
  ) as Record<ViewId,CompressionPlan>;
}

export function compressionDictionary():Array<{
  capabilityId:string;
  formal:string;
  ordinary:string;
  exposure:HumanExposure;
}>{
  return REVISION_TO_CARTOGRAPHY_CROSSWALK
    .filter(p=>p.classes.includes("USER_VISIBLE") && p.ordinaryLanguageCue)
    .map(p=>({
      capabilityId:p.capabilityId,
      formal:p.capability,
      ordinary:p.ordinaryLanguageCue!,
      exposure:p.humanExposure
    }));
}
