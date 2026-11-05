export type RevisionTarget =
  | "EVIDENCE_ASSESSMENT"
  | "AUXILIARY"
  | "WARRANT"
  | "BACKGROUND"
  | "CLAIM_CEILING"
  | "TASK"
  | "ONTOLOGY"
  | "FRAMEWORK";

export interface RevisionState {
  id:string;
  task:string;
  evidenceAssessments:string[];
  auxiliaries:string[];
  warrants:string[];
  background:string[];
  claimCeiling:string;
  ontologyCommitments:string[];
  frameworkCommitments:string[];
  unresolvedAnomalies:string[];
  licensedPredictions:string[];
}

export interface RevisionOperation {
  id:string;
  target:RevisionTarget;
  remove?:string[];
  add?:string[];
  replaceText?:string;
  reason:string;
}

export interface RevisionApplication {
  before:RevisionState;
  after:RevisionState;
  operation:RevisionOperation;
  changedDimensions:RevisionTarget[];
}

export interface RevisionCandidateAudit {
  candidateId:string;
  target:RevisionTarget;
  changedDimensions:RevisionTarget[];
  changedItemCount:number;
  preservedItemCount:number;
  unresolvedAnomalyCount:number;
  newLiabilities:string[];
  empiricalStatus:"SUPPORTED"|"UNRESOLVED"|"FAILED";
  explanatoryGain:string[];
  minimalMutilationScore:number;
}

export interface RevisionFrontier {
  candidates:RevisionCandidateAudit[];
  leastMutilatingCandidateIds:string[];
  empiricallySupportedCandidateIds:string[];
  unresolvedCandidateIds:string[];
  failedCandidateIds:string[];
  recommendation:null;
  claimCeiling:string;
}

export interface RevisionChoiceClaimCeiling {
  maySay:string[];
  mayNotSay:string[];
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

function replaceItems(source:string[], remove:string[]=[], add:string[]=[]):string[]{
  const removed=new Set(remove);
  return canonical([...source.filter(x=>!removed.has(x)),...add]);
}

function arraysEqual(a:string[],b:string[]):boolean{
  const x=canonical(a),y=canonical(b);
  return x.length===y.length && x.every((v,i)=>v===y[i]);
}

export function applyRevision(
  state:RevisionState,
  operation:RevisionOperation
):RevisionApplication{
  const after:RevisionState=structuredClone(state);
  const changedDimensions:RevisionTarget[]=[];

  const mark=(target:RevisionTarget)=> {
    if(!changedDimensions.includes(target)) changedDimensions.push(target);
  };

  switch(operation.target){
    case "EVIDENCE_ASSESSMENT":
      after.evidenceAssessments=replaceItems(
        after.evidenceAssessments,
        operation.remove,
        operation.add
      );
      if(!arraysEqual(after.evidenceAssessments,state.evidenceAssessments))
        mark("EVIDENCE_ASSESSMENT");
      break;

    case "AUXILIARY":
      after.auxiliaries=replaceItems(after.auxiliaries,operation.remove,operation.add);
      if(!arraysEqual(after.auxiliaries,state.auxiliaries)) mark("AUXILIARY");
      break;

    case "WARRANT":
      after.warrants=replaceItems(after.warrants,operation.remove,operation.add);
      if(!arraysEqual(after.warrants,state.warrants)) mark("WARRANT");
      break;

    case "BACKGROUND":
      after.background=replaceItems(after.background,operation.remove,operation.add);
      if(!arraysEqual(after.background,state.background)) mark("BACKGROUND");
      break;

    case "CLAIM_CEILING":
      if(operation.replaceText===undefined) throw new Error("replaceText required");
      if(after.claimCeiling!==operation.replaceText){
        after.claimCeiling=operation.replaceText;
        mark("CLAIM_CEILING");
      }
      break;

    case "TASK":
      if(operation.replaceText===undefined) throw new Error("replaceText required");
      if(after.task!==operation.replaceText){
        after.task=operation.replaceText;
        mark("TASK");
      }
      break;

    case "ONTOLOGY":
      after.ontologyCommitments=replaceItems(
        after.ontologyCommitments,
        operation.remove,
        operation.add
      );
      if(!arraysEqual(after.ontologyCommitments,state.ontologyCommitments))
        mark("ONTOLOGY");
      break;

    case "FRAMEWORK":
      after.frameworkCommitments=replaceItems(
        after.frameworkCommitments,
        operation.remove,
        operation.add
      );
      if(!arraysEqual(after.frameworkCommitments,state.frameworkCommitments))
        mark("FRAMEWORK");
      break;
  }

  after.id=`${state.id}::${operation.id}`;
  return {before:state,after,operation,changedDimensions};
}

function countItems(state:RevisionState):number{
  return (
    state.evidenceAssessments.length+
    state.auxiliaries.length+
    state.warrants.length+
    state.background.length+
    state.ontologyCommitments.length+
    state.frameworkCommitments.length+
    2
  );
}

function commonCount(before:RevisionState,after:RevisionState):number{
  const fields:[string[],string[]][]=[
    [before.evidenceAssessments,after.evidenceAssessments],
    [before.auxiliaries,after.auxiliaries],
    [before.warrants,after.warrants],
    [before.background,after.background],
    [before.ontologyCommitments,after.ontologyCommitments],
    [before.frameworkCommitments,after.frameworkCommitments]
  ];
  let common=0;
  for(const [a,b] of fields){
    const bs=new Set(b);
    common+=a.filter(x=>bs.has(x)).length;
  }
  if(before.task===after.task) common++;
  if(before.claimCeiling===after.claimCeiling) common++;
  return common;
}

export function auditRevisionCandidate(
  application:RevisionApplication,
  result:{
    unresolvedAnomalies:string[];
    newLiabilities?:string[];
    empiricalStatus:"SUPPORTED"|"UNRESOLVED"|"FAILED";
    explanatoryGain?:string[];
  }
):RevisionCandidateAudit{
  const beforeCount=countItems(application.before);
  const preservedItemCount=commonCount(application.before,application.after);
  const changedItemCount=Math.max(0,beforeCount-preservedItemCount);

  return {
    candidateId:application.operation.id,
    target:application.operation.target,
    changedDimensions:application.changedDimensions,
    changedItemCount,
    preservedItemCount,
    unresolvedAnomalyCount:result.unresolvedAnomalies.length,
    newLiabilities:result.newLiabilities??[],
    empiricalStatus:result.empiricalStatus,
    explanatoryGain:result.explanatoryGain??[],
    minimalMutilationScore:
      beforeCount===0 ? 1 : preservedItemCount/beforeCount
  };
}

export function buildRevisionFrontier(
  audits:RevisionCandidateAudit[]
):RevisionFrontier{
  if(audits.length===0) throw new Error("at least one candidate required");
  const best=Math.max(...audits.map(a=>a.minimalMutilationScore));
  return {
    candidates:audits,
    leastMutilatingCandidateIds:audits
      .filter(a=>a.minimalMutilationScore===best)
      .map(a=>a.candidateId),
    empiricallySupportedCandidateIds:audits
      .filter(a=>a.empiricalStatus==="SUPPORTED")
      .map(a=>a.candidateId),
    unresolvedCandidateIds:audits
      .filter(a=>a.empiricalStatus==="UNRESOLVED")
      .map(a=>a.candidateId),
    failedCandidateIds:audits
      .filter(a=>a.empiricalStatus==="FAILED")
      .map(a=>a.candidateId),
    recommendation:null,
    claimCeiling:
      "The audit may expose preservation cost, empirical status, liabilities, and explanatory gain; it may not infer a uniquely rational revision from minimal mutilation alone."
  };
}

export const REVISION_CHOICE_CLAIM_CEILING:RevisionChoiceClaimCeiling={
  maySay:[
    "this candidate changes fewer represented commitments",
    "this candidate currently resolves more represented anomalies",
    "this candidate introduces these represented liabilities",
    "this candidate is better supported by the represented evidence",
    "these revision targets remain live"
  ],
  mayNotSay:[
    "the least mutilating candidate is therefore rationally mandatory",
    "the system has identified the uniquely correct belief to revise",
    "successful auxiliary repair proves the retained framework true",
    "failed auxiliary repair proves immediate framework replacement is mandatory",
    "represented costs exhaust scientific judgment"
  ]
};
