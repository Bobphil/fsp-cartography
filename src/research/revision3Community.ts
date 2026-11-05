import { RevisionReason } from "./revision2";

export interface CommunityMemberJudgment {
  memberId:string;
  evaluatorId:string;
  liveCandidateIds:string[];
  preferredCandidateId?:string;
  actionCommitments:string[];
  statedReasons:RevisionReason[];
}

export type ConvergenceKind =
  | "FULL_CONVERGENCE"
  | "CHOICE_CONVERGENCE_WITH_REASON_PLURALISM"
  | "PRACTICAL_CONVERGENCE_ONLY"
  | "REASON_CONVERGENCE_WITH_CHOICE_DIVERGENCE"
  | "NONCONVERGENCE";

export interface CommunityConvergence {
  kind:ConvergenceKind;
  sharedPreferredCandidateId?:string;
  sharedActions:string[];
  sharedReasons:RevisionReason[];
  dissentingMembers:string[];
  forcedConsensus:false;
}

export interface CommunityRevisionState {
  communityId:string;
  momentId:string;
  memberJudgments:CommunityMemberJudgment[];
  convergence:CommunityConvergence;
}

function canonical<T extends string>(values:T[]):T[]{
  return [...new Set(values)].sort() as T[];
}

function intersection<T extends string>(sets:T[][]):T[]{
  if(sets.length===0) return [];
  return [...new Set(sets[0])].filter(x=>sets.every(set=>set.includes(x))).sort() as T[];
}

export function assessCommunityConvergence(
  judgments:CommunityMemberJudgment[]
):CommunityConvergence{
  if(judgments.length<2) throw new Error("at least two community judgments required");

  const preferences=judgments
    .map(j=>j.preferredCandidateId)
    .filter(Boolean) as string[];
  const allHavePreference=preferences.length===judgments.length;
  const samePreference=allHavePreference && new Set(preferences).size===1;
  const sharedPreferredCandidateId=samePreference?preferences[0]:undefined;

  const sharedActions=intersection(judgments.map(j=>j.actionCommitments));
  const sharedReasons=intersection(judgments.map(j=>j.statedReasons));

  let kind:ConvergenceKind="NONCONVERGENCE";
  if(samePreference && sharedActions.length>0){
    const exactReasonMatch=judgments.every(j=>
      canonical(j.statedReasons).join("|")===canonical(judgments[0].statedReasons).join("|")
    );
    kind=exactReasonMatch
      ? "FULL_CONVERGENCE"
      : "CHOICE_CONVERGENCE_WITH_REASON_PLURALISM";
  } else if(samePreference) {
    kind="CHOICE_CONVERGENCE_WITH_REASON_PLURALISM";
  } else if(sharedActions.length>0) {
    kind="PRACTICAL_CONVERGENCE_ONLY";
  } else if(sharedReasons.length>0) {
    kind="REASON_CONVERGENCE_WITH_CHOICE_DIVERGENCE";
  }

  const referencePreference=preferences[0];
  const dissentingMembers=samePreference
    ? []
    : judgments
        .filter(j=>j.preferredCandidateId!==referencePreference)
        .map(j=>j.memberId);

  return {
    kind,
    sharedPreferredCandidateId,
    sharedActions,
    sharedReasons,
    dissentingMembers,
    forcedConsensus:false
  };
}

export function buildCommunityRevisionState(
  communityId:string,
  momentId:string,
  memberJudgments:CommunityMemberJudgment[]
):CommunityRevisionState{
  return {
    communityId,
    momentId,
    memberJudgments:structuredClone(memberJudgments),
    convergence:assessCommunityConvergence(memberJudgments)
  };
}
