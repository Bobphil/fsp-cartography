import { TranslationAttempt, assessTranslation } from "./translation";
import {
  TaskRelevantStructure,
  UnderdeterminationAssessment,
  assessUnderdeterminationCandidate
} from "./translation2";

export interface AuxiliaryAssumptionSet {
  prfId: string;
  assumptions: string[];
}

export interface EvidenceSnapshot {
  id: string;
  label: string;
  evidence: string[];
  taskStructures: TaskRelevantStructure[];
  auxiliaryAssumptions: AuxiliaryAssumptionSet[];
  translationAttempts: TranslationAttempt[];
}

export interface AuxiliaryComparison {
  leftPrfId: string;
  rightPrfId: string;
  shared: string[];
  leftOnly: string[];
  rightOnly: string[];
  identical: boolean;
}

export interface RemainderDelta {
  sourcePrfId: string;
  targetPrfId: string;
  before: string[];
  after: string[];
  added: string[];
  removed: string[];
  changed: boolean;
}

export interface EvidenceChangeAssessment {
  beforeId: string;
  afterId: string;
  addedEvidence: string[];
  removedEvidence: string[];
  changedPrfs: string[];
  auxiliaryChanges: AuxiliaryComparison[];
  remainderDeltas: RemainderDelta[];
}

export interface RobustnessAssessment {
  pair: string;
  before: UnderdeterminationAssessment;
  after: UnderdeterminationAssessment;
  evidenceChanged: boolean;
  auxiliaryAssumptionsDiverged: boolean;
  remainderChanged: boolean;
  result:
    | "ROBUST_UNDER_PERTURBATION"
    | "BROKEN_BY_TASK_RELEVANT_DIFFERENCE"
    | "REOPEN_AUXILIARIES"
    | "NOT_PREVIOUSLY_ESTABLISHED";
}

function canonical(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function diff(left: string[], right: string[]): string[] {
  const rightSet = new Set(right);
  return canonical(left.filter(x => !rightSet.has(x)));
}

function same(left: string[], right: string[]): boolean {
  const a=canonical(left);
  const b=canonical(right);
  return a.length===b.length && a.every((v,i)=>v===b[i]);
}

function findStructure(snapshot: EvidenceSnapshot, prfId: string): TaskRelevantStructure {
  const found=snapshot.taskStructures.find(x=>x.prfId===prfId);
  if(!found) throw new Error(`Missing task structure for PRF ${prfId} in snapshot ${snapshot.id}`);
  return found;
}

function findAux(snapshot: EvidenceSnapshot, prfId: string): string[] {
  return snapshot.auxiliaryAssumptions.find(x=>x.prfId===prfId)?.assumptions ?? [];
}

function findAttempt(snapshot: EvidenceSnapshot, sourcePrfId: string, targetPrfId: string): TranslationAttempt {
  const found=snapshot.translationAttempts.find(
    x=>x.sourcePrfId===sourcePrfId && x.targetPrfId===targetPrfId
  );
  if(!found) throw new Error(`Missing translation attempt ${sourcePrfId}->${targetPrfId} in snapshot ${snapshot.id}`);
  return found;
}

export function compareAuxiliaryAssumptions(
  leftPrfId: string,
  rightPrfId: string,
  snapshot: EvidenceSnapshot
): AuxiliaryComparison {
  const left=canonical(findAux(snapshot,leftPrfId));
  const right=canonical(findAux(snapshot,rightPrfId));
  return {
    leftPrfId,
    rightPrfId,
    shared:left.filter(x=>right.includes(x)),
    leftOnly:left.filter(x=>!right.includes(x)),
    rightOnly:right.filter(x=>!left.includes(x)),
    identical:same(left,right)
  };
}

export function compareRemainder(
  before: EvidenceSnapshot,
  after: EvidenceSnapshot,
  sourcePrfId: string,
  targetPrfId: string
): RemainderDelta {
  const beforeAssessment=assessTranslation(findAttempt(before,sourcePrfId,targetPrfId));
  const afterAssessment=assessTranslation(findAttempt(after,sourcePrfId,targetPrfId));
  const beforeR=canonical(beforeAssessment.remainder);
  const afterR=canonical(afterAssessment.remainder);

  return {
    sourcePrfId,
    targetPrfId,
    before:beforeR,
    after:afterR,
    added:diff(afterR,beforeR),
    removed:diff(beforeR,afterR),
    changed:!same(beforeR,afterR)
  };
}

export function assessEvidenceChange(
  before: EvidenceSnapshot,
  after: EvidenceSnapshot
): EvidenceChangeAssessment {
  const addedEvidence=diff(after.evidence,before.evidence);
  const removedEvidence=diff(before.evidence,after.evidence);

  const allPrfs=canonical([
    ...before.taskStructures.map(x=>x.prfId),
    ...after.taskStructures.map(x=>x.prfId)
  ]);

  const changedPrfs=allPrfs.filter(prfId=>{
    const b=findStructure(before,prfId);
    const a=findStructure(after,prfId);
    return !same(b.empiricalCommitments,a.empiricalCommitments)
      || !same(b.practicalConstraints,a.practicalConstraints)
      || !same(b.predictedConsequences,a.predictedConsequences)
      || !same(b.licensedActions,a.licensedActions)
      || !same(b.ontologyCommitments,a.ontologyCommitments);
  });

  const auxiliaryChanges: AuxiliaryComparison[]=[];
  for(let i=0;i<allPrfs.length;i++){
    for(let j=i+1;j<allPrfs.length;j++){
      auxiliaryChanges.push(compareAuxiliaryAssumptions(allPrfs[i],allPrfs[j],after));
    }
  }

  const remainderDeltas:RemainderDelta[]=[];
  for(const b of before.translationAttempts){
    const exists=after.translationAttempts.some(
      a=>a.sourcePrfId===b.sourcePrfId && a.targetPrfId===b.targetPrfId
    );
    if(exists) remainderDeltas.push(compareRemainder(before,after,b.sourcePrfId,b.targetPrfId));
  }

  return {
    beforeId:before.id,
    afterId:after.id,
    addedEvidence,
    removedEvidence,
    changedPrfs,
    auxiliaryChanges,
    remainderDeltas
  };
}

export function assessUnderdeterminationRobustness(
  before: EvidenceSnapshot,
  after: EvidenceSnapshot,
  leftPrfId: string,
  rightPrfId: string
): RobustnessAssessment {
  const beforeResult=assessUnderdeterminationCandidate(
    findStructure(before,leftPrfId),
    findStructure(before,rightPrfId)
  );
  const afterResult=assessUnderdeterminationCandidate(
    findStructure(after,leftPrfId),
    findStructure(after,rightPrfId)
  );

  const evidenceChanged=!same(before.evidence,after.evidence);
  const auxBefore=compareAuxiliaryAssumptions(leftPrfId,rightPrfId,before);
  const auxAfter=compareAuxiliaryAssumptions(leftPrfId,rightPrfId,after);
  const auxiliaryAssumptionsDiverged=
    !same(auxBefore.leftOnly,auxAfter.leftOnly)
    || !same(auxBefore.rightOnly,auxAfter.rightOnly)
    || !same(auxBefore.shared,auxAfter.shared);

  const remainderDelta=compareRemainder(before,after,leftPrfId,rightPrfId);

  let result: RobustnessAssessment["result"];
  if(beforeResult.candidateResult!=="UNDERDETERMINATION_SUPPORTED"){
    result="NOT_PREVIOUSLY_ESTABLISHED";
  } else if(afterResult.candidateResult!=="UNDERDETERMINATION_SUPPORTED"){
    result="BROKEN_BY_TASK_RELEVANT_DIFFERENCE";
  } else if(auxiliaryAssumptionsDiverged || remainderDelta.changed){
    result="REOPEN_AUXILIARIES";
  } else {
    result="ROBUST_UNDER_PERTURBATION";
  }

  return {
    pair:`${leftPrfId}<->${rightPrfId}`,
    before:beforeResult,
    after:afterResult,
    evidenceChanged,
    auxiliaryAssumptionsDiverged,
    remainderChanged:remainderDelta.changed,
    result
  };
}
