import {
  CandidateReasonProfile,
  GoodSenseProfile,
  ReasonAssessment,
  RevisionReason
} from "./revision2";

export type SalienceLevel = "LOW"|"MEDIUM"|"HIGH"|"CRITICAL";

export interface ReasonSalience {
  reason:RevisionReason;
  salience:SalienceLevel;
  rationale:string;
}

export interface RevisionMoment {
  momentId:string;
  ordinal:number;
  evidenceState:string[];
  candidateProfiles:CandidateReasonProfile[];
  evaluatorProfiles:GoodSenseProfile[];
  salienceByEvaluator:Record<string,ReasonSalience[]>;
  events:string[];
}

export interface ReasonChange {
  candidateId:string;
  reason:RevisionReason;
  before:ReasonAssessment;
  after:ReasonAssessment;
}

export interface SalienceChange {
  evaluatorId:string;
  reason:RevisionReason;
  before:SalienceLevel;
  after:SalienceLevel;
}

export interface RevisionDynamics {
  fromMoment:string;
  toMoment:string;
  addedEvidence:string[];
  removedEvidence:string[];
  reasonChanges:ReasonChange[];
  salienceChanges:SalienceChange[];
  hiddenUtilityScore:null;
}

export interface EvidenceReweightingRecord {
  evaluatorId:string;
  reason:RevisionReason;
  previousSalience:SalienceLevel;
  newSalience:SalienceLevel;
  triggerEvidence:string[];
  justification:string;
  numericWeight:null;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

function difference(after:string[],before:string[]):string[]{
  const beforeSet=new Set(before);
  return canonical(after.filter(x=>!beforeSet.has(x)));
}

function assessmentFor(
  profiles:CandidateReasonProfile[],
  candidateId:string,
  reason:RevisionReason
):ReasonAssessment|undefined{
  return profiles.find(p=>p.candidateId===candidateId)?.assessments[reason];
}

function salienceFor(
  moment:RevisionMoment,
  evaluatorId:string,
  reason:RevisionReason
):SalienceLevel|undefined{
  return moment.salienceByEvaluator[evaluatorId]?.find(x=>x.reason===reason)?.salience;
}

export function compareRevisionMoments(
  before:RevisionMoment,
  after:RevisionMoment
):RevisionDynamics{
  if(after.ordinal<=before.ordinal)
    throw new Error("after moment must have greater ordinal");

  const candidateIds=canonical([
    ...before.candidateProfiles.map(p=>p.candidateId),
    ...after.candidateProfiles.map(p=>p.candidateId)
  ]);
  const reasons:RevisionReason[]=[
    "EVIDENCE_FIT","COHERENCE","SIMPLICITY","FECUNDITY",
    "SCOPE","CONSERVATISM","EXPLANATORY_POWER"
  ];

  const reasonChanges:ReasonChange[]=[];
  for(const candidateId of candidateIds){
    for(const reason of reasons){
      const b=assessmentFor(before.candidateProfiles,candidateId,reason);
      const a=assessmentFor(after.candidateProfiles,candidateId,reason);
      if(b!==undefined && a!==undefined && b!==a){
        reasonChanges.push({candidateId,reason,before:b,after:a});
      }
    }
  }

  const evaluatorIds=canonical([
    ...before.evaluatorProfiles.map(e=>e.evaluatorId),
    ...after.evaluatorProfiles.map(e=>e.evaluatorId)
  ]);
  const salienceChanges:SalienceChange[]=[];
  for(const evaluatorId of evaluatorIds){
    for(const reason of reasons){
      const b=salienceFor(before,evaluatorId,reason);
      const a=salienceFor(after,evaluatorId,reason);
      if(b!==undefined && a!==undefined && b!==a){
        salienceChanges.push({evaluatorId,reason,before:b,after:a});
      }
    }
  }

  return {
    fromMoment:before.momentId,
    toMoment:after.momentId,
    addedEvidence:difference(after.evidenceState,before.evidenceState),
    removedEvidence:difference(before.evidenceState,after.evidenceState),
    reasonChanges,
    salienceChanges,
    hiddenUtilityScore:null
  };
}

export function recordEvidenceReweighting(
  evaluatorId:string,
  reason:RevisionReason,
  previousSalience:SalienceLevel,
  newSalience:SalienceLevel,
  triggerEvidence:string[],
  justification:string
):EvidenceReweightingRecord{
  if(triggerEvidence.length===0) throw new Error("trigger evidence required");
  if(!justification.trim()) throw new Error("justification required");
  return {
    evaluatorId,
    reason,
    previousSalience,
    newSalience,
    triggerEvidence:[...triggerEvidence],
    justification,
    numericWeight:null
  };
}
