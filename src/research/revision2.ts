import { RevisionCandidateAudit } from "./revision1";

export type RevisionReason =
  | "EVIDENCE_FIT"
  | "COHERENCE"
  | "SIMPLICITY"
  | "FECUNDITY"
  | "SCOPE"
  | "CONSERVATISM"
  | "EXPLANATORY_POWER";

export type ReasonAssessment =
  | "STRONGLY_FAVORS"
  | "FAVORS"
  | "NEUTRAL"
  | "COUNTS_AGAINST"
  | "STRONGLY_COUNTS_AGAINST"
  | "UNRESOLVED";

export interface CandidateReasonProfile {
  candidateId:string;
  assessments:Record<RevisionReason,ReasonAssessment>;
  notes:Partial<Record<RevisionReason,string>>;
}

export interface TradeoffCell {
  candidateId:string;
  reason:RevisionReason;
  assessment:ReasonAssessment;
  note?:string;
}

export interface TradeoffMatrix {
  candidates:string[];
  reasons:RevisionReason[];
  cells:TradeoffCell[];
  dominance:{
    candidateId:string;
    dominates:string[];
  }[];
  recommendation:null;
}

export interface GoodSenseProfile {
  evaluatorId:string;
  priorityOrder:RevisionReason[];
  permittedReasons:RevisionReason[];
  excludedReasons:RevisionReason[];
  rationale:string[];
}

export interface GoodSenseComparison {
  candidateId:string;
  evaluatorId:string;
  salientReasons:RevisionReason[];
  favorableReasons:RevisionReason[];
  adverseReasons:RevisionReason[];
  unresolvedReasons:RevisionReason[];
  verdict:"LIVE"|"WEAKENED"|"REJECTED"|"UNDERDETERMINED";
}

export interface PathDependenceContext {
  contextId:string;
  inheritedFramework:string[];
  normalPractice:string[];
  sunkInfrastructure:string[];
  trainingCommitments:string[];
  institutionalConstraints:string[];
}

export interface PathDependenceAudit {
  contextId:string;
  candidateId:string;
  inheritedSupports:string[];
  inheritedCosts:string[];
  epistemicallyRelevant:string[];
  merelyHistorical:string[];
  formationJustificationFirewall:string;
}

export interface NonAlgorithmicChoiceBoundary {
  mayCompare:string[];
  mayNotCompute:string[];
  recommendation:null;
}

const REASONS:RevisionReason[]=[
  "EVIDENCE_FIT",
  "COHERENCE",
  "SIMPLICITY",
  "FECUNDITY",
  "SCOPE",
  "CONSERVATISM",
  "EXPLANATORY_POWER"
];

const favorable=new Set<ReasonAssessment>(["STRONGLY_FAVORS","FAVORS"]);
const adverse=new Set<ReasonAssessment>(["COUNTS_AGAINST","STRONGLY_COUNTS_AGAINST"]);

function rank(v:ReasonAssessment):number{
  switch(v){
    case "STRONGLY_FAVORS": return 2;
    case "FAVORS": return 1;
    case "NEUTRAL": return 0;
    case "UNRESOLVED": return 0;
    case "COUNTS_AGAINST": return -1;
    case "STRONGLY_COUNTS_AGAINST": return -2;
  }
}

export function buildTradeoffMatrix(
  profiles:CandidateReasonProfile[]
):TradeoffMatrix{
  if(profiles.length===0) throw new Error("at least one reason profile required");

  const cells=profiles.flatMap(profile=>
    REASONS.map(reason=>({
      candidateId:profile.candidateId,
      reason,
      assessment:profile.assessments[reason],
      note:profile.notes[reason]
    }))
  );

  const dominance=profiles.map(left=>{
    const dominates=profiles.filter(right=>{
      if(right.candidateId===left.candidateId) return false;
      let atLeastOneBetter=false;
      for(const reason of REASONS){
        const l=rank(left.assessments[reason]);
        const r=rank(right.assessments[reason]);
        if(l<r) return false;
        if(l>r) atLeastOneBetter=true;
      }
      return atLeastOneBetter;
    }).map(x=>x.candidateId);
    return {candidateId:left.candidateId,dominates};
  });

  return {
    candidates:profiles.map(p=>p.candidateId),
    reasons:[...REASONS],
    cells,
    dominance,
    recommendation:null
  };
}

export function compareByGoodSense(
  candidate:CandidateReasonProfile,
  evaluator:GoodSenseProfile
):GoodSenseComparison{
  const salientReasons=evaluator.priorityOrder.filter(
    r=>evaluator.permittedReasons.includes(r) && !evaluator.excludedReasons.includes(r)
  );
  const favorableReasons=salientReasons.filter(r=>favorable.has(candidate.assessments[r]));
  const adverseReasons=salientReasons.filter(r=>adverse.has(candidate.assessments[r]));
  const unresolvedReasons=salientReasons.filter(r=>candidate.assessments[r]==="UNRESOLVED");

  let verdict:GoodSenseComparison["verdict"]="UNDERDETERMINED";
  if(adverseReasons.length===0 && favorableReasons.length>0 && unresolvedReasons.length===0)
    verdict="LIVE";
  else if(adverseReasons.length>0 && favorableReasons.length>0)
    verdict="WEAKENED";
  else if(adverseReasons.length>0 && favorableReasons.length===0 && unresolvedReasons.length===0)
    verdict="REJECTED";

  return {
    candidateId:candidate.candidateId,
    evaluatorId:evaluator.evaluatorId,
    salientReasons,
    favorableReasons,
    adverseReasons,
    unresolvedReasons,
    verdict
  };
}

export function auditPathDependence(
  context:PathDependenceContext,
  candidate:RevisionCandidateAudit,
  classification:{
    inheritedSupports:string[];
    inheritedCosts:string[];
    epistemicallyRelevant:string[];
    merelyHistorical:string[];
  }
):PathDependenceAudit{
  const allContext=[
    ...context.inheritedFramework,
    ...context.normalPractice,
    ...context.sunkInfrastructure,
    ...context.trainingCommitments,
    ...context.institutionalConstraints
  ];
  for(const item of [...classification.inheritedSupports,...classification.inheritedCosts]){
    if(!allContext.includes(item))
      throw new Error(`path-dependence item not present in context: ${item}`);
  }

  return {
    contextId:context.contextId,
    candidateId:candidate.candidateId,
    inheritedSupports:[...classification.inheritedSupports],
    inheritedCosts:[...classification.inheritedCosts],
    epistemicallyRelevant:[...classification.epistemicallyRelevant],
    merelyHistorical:[...classification.merelyHistorical],
    formationJustificationFirewall:
      "Historical inheritance may explain why a revision is easier, costlier, familiar, or institutionally available; it does not by itself justify the revision."
  };
}

export const NON_ALGORITHMIC_CHOICE_BOUNDARY:NonAlgorithmicChoiceBoundary={
  mayCompare:[
    "evidence fit",
    "coherence",
    "simplicity",
    "fecundity",
    "scope",
    "conservatism",
    "explanatory power",
    "path-dependent costs and affordances"
  ],
  mayNotCompute:[
    "a universal weighted sum that yields the uniquely rational theory choice",
    "a hidden recommendation score",
    "a conversion of historical familiarity into epistemic authority",
    "a rule that one theory virtue always lexically dominates the others"
  ],
  recommendation:null
};
