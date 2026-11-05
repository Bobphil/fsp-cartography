import { CapabilityEffect } from "./revision8";

export type RepairStepType =
  | "INFORMATION"
  | "PROCEDURAL"
  | "POLICY"
  | "PRACTICE"
  | "RESOURCE"
  | "AUTHORITY"
  | "CAPABILITY";

export interface RepairStep {
  stepId:string;
  ordinal:number;
  type:RepairStepType;
  description:string;
  preconditions:string[];
  reversible:boolean;
  rollbackConditions:string[];
  affectedGroupIds:string[];
}

export interface RepairSequence {
  sequenceId:string;
  steps:RepairStep[];
  recommendation:null;
}

export interface GroupCapabilityTradeoff {
  groupId:string;
  capabilityId:string;
  before:CapabilityEffect;
  after:CapabilityEffect;
  gains:string[];
  losses:string[];
  unknowns:string[];
}

export interface CapabilityTradeoffAudit {
  repairStepId:string;
  groupTradeoffs:GroupCapabilityTradeoff[];
  groupsWithGains:string[];
  groupsWithLosses:string[];
  groupsWithUnknowns:string[];
  aggregateNetScore:null;
  paretoImprovement:boolean;
  distributionalConflict:boolean;
}

export interface ExitVoiceAppealArchitecture {
  groupId:string;
  exitAvailable:boolean;
  exitCost:string[];
  voiceAvailable:boolean;
  voiceChannels:string[];
  appealAvailable:boolean;
  appealIndependent:boolean;
  retaliationRisk:"LOW"|"ELEVATED"|"SEVERE";
}

export interface ExitVoiceAppealAudit {
  groupId:string;
  meaningfulExit:boolean;
  meaningfulVoice:boolean;
  meaningfulAppeal:boolean;
  failures:string[];
}

export interface ReversibilityAudit {
  stepId:string;
  reversible:boolean;
  rollbackConditions:string[];
  rollbackCurrentlyAvailable:boolean;
  irreversibleConsequences:string[];
  reversibilitySupportsExperimentation:boolean;
  irreversibilityRequiresHigherEvidenceBurden:boolean;
}

export interface GenerationReopenRule {
  ruleId:string;
  generation:number;
  triggers:string[];
  requiredStandingGroups:string[];
  evidenceReviewRequired:boolean;
  capabilityReviewRequired:boolean;
  minorityReportReviewRequired:boolean;
  canReopen:boolean;
}

export interface MultiGenerationReopenAudit {
  rules:GenerationReopenRule[];
  generationsCovered:number[];
  missingGenerations:number[];
  reopenContinuity:boolean;
  laterGenerationCanChallengeInheritedRepair:boolean;
  firstGenerationApprovalBindsFutureGenerations:false;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function validateRepairSequence(
  sequence:RepairSequence
):string[]{
  const failures:string[]=[];
  const ordered=[...sequence.steps].sort((a,b)=>a.ordinal-b.ordinal);
  for(let i=1;i<ordered.length;i++){
    if(ordered[i].ordinal<=ordered[i-1].ordinal)
      failures.push("non-increasing-step-order");
  }
  for(const step of ordered){
    if(!step.description.trim()) failures.push(`${step.stepId}:missing-description`);
    if(!step.reversible && step.rollbackConditions.length>0)
      failures.push(`${step.stepId}:irreversible-step-has-rollback-conditions`);
  }
  return canonical(failures);
}

export function sequenceRepair(
  sequence:RepairSequence,
  activeConditions:string[]
):RepairStep[]{
  const failures=validateRepairSequence(sequence);
  if(failures.length>0) throw new Error(failures.join(","));
  const active=new Set(activeConditions);
  const executable:RepairStep[]=[];
  for(const step of [...sequence.steps].sort((a,b)=>a.ordinal-b.ordinal)){
    if(step.preconditions.every(c=>active.has(c))){
      executable.push(structuredClone(step));
      active.add(`completed:${step.stepId}`);
    }
  }
  return executable;
}

export function auditCapabilityTradeoffs(
  repairStepId:string,
  tradeoffs:GroupCapabilityTradeoff[]
):CapabilityTradeoffAudit{
  const groupsWithGains=canonical(
    tradeoffs.filter(t=>t.gains.length>0).map(t=>t.groupId)
  );
  const groupsWithLosses=canonical(
    tradeoffs.filter(t=>t.losses.length>0).map(t=>t.groupId)
  );
  const groupsWithUnknowns=canonical(
    tradeoffs.filter(t=>t.unknowns.length>0 || t.after==="UNKNOWN").map(t=>t.groupId)
  );
  const paretoImprovement=
    groupsWithGains.length>0 &&
    groupsWithLosses.length===0 &&
    groupsWithUnknowns.length===0;
  return {
    repairStepId,
    groupTradeoffs:structuredClone(tradeoffs),
    groupsWithGains,
    groupsWithLosses,
    groupsWithUnknowns,
    aggregateNetScore:null,
    paretoImprovement,
    distributionalConflict:
      groupsWithGains.length>0 && groupsWithLosses.length>0
  };
}

export function auditExitVoiceAppeal(
  architecture:ExitVoiceAppealArchitecture
):ExitVoiceAppealAudit{
  const failures:string[]=[];
  const meaningfulExit=
    architecture.exitAvailable &&
    !architecture.exitCost.some(c=>/prohibitive|impossible|severe/i.test(c));
  const meaningfulVoice=
    architecture.voiceAvailable &&
    architecture.voiceChannels.length>0 &&
    architecture.retaliationRisk!=="SEVERE";
  const meaningfulAppeal=
    architecture.appealAvailable &&
    architecture.appealIndependent &&
    architecture.retaliationRisk!=="SEVERE";

  if(!meaningfulExit) failures.push("exit-not-meaningful");
  if(!meaningfulVoice) failures.push("voice-not-meaningful");
  if(!meaningfulAppeal) failures.push("appeal-not-meaningful");

  return {
    groupId:architecture.groupId,
    meaningfulExit,
    meaningfulVoice,
    meaningfulAppeal,
    failures
  };
}

export function auditRepairReversibility(
  step:RepairStep,
  context:{
    activeRollbackConditions:string[];
    irreversibleConsequences:string[];
  }
):ReversibilityAudit{
  const active=new Set(context.activeRollbackConditions);
  const rollbackCurrentlyAvailable=
    step.reversible &&
    step.rollbackConditions.every(c=>active.has(c));
  return {
    stepId:step.stepId,
    reversible:step.reversible,
    rollbackConditions:[...step.rollbackConditions],
    rollbackCurrentlyAvailable,
    irreversibleConsequences:[...context.irreversibleConsequences],
    reversibilitySupportsExperimentation:
      step.reversible && rollbackCurrentlyAvailable,
    irreversibilityRequiresHigherEvidenceBurden:
      !step.reversible || context.irreversibleConsequences.length>0
  };
}

export function auditMultiGenerationReopen(
  rules:GenerationReopenRule[],
  expectedGenerations:number[]
):MultiGenerationReopenAudit{
  const generationsCovered=canonical(rules.map(r=>String(r.generation))).map(Number);
  const missingGenerations=expectedGenerations
    .filter(g=>!generationsCovered.includes(g))
    .sort((a,b)=>a-b);

  const reopenContinuity=
    missingGenerations.length===0 &&
    rules.every(r=>
      r.canReopen &&
      r.evidenceReviewRequired &&
      r.capabilityReviewRequired &&
      r.minorityReportReviewRequired &&
      r.requiredStandingGroups.length>0
    );

  return {
    rules:structuredClone(rules),
    generationsCovered,
    missingGenerations,
    reopenContinuity,
    laterGenerationCanChallengeInheritedRepair:
      rules.some(r=>r.generation>Math.min(...expectedGenerations) && r.canReopen),
    firstGenerationApprovalBindsFutureGenerations:false
  };
}
