export type AccessCondition = "OPEN"|"PARTIAL"|"BLOCKED";
export type StandingCondition = "FULL"|"CONSTRAINED"|"DENIED";
export type InfluenceKind =
  | "EPISTEMIC_AUTHORITY"
  | "PROCEDURAL_AUTHORITY"
  | "PRACTICAL_POWER";

export interface EvidenceAccessRecord {
  memberId:string;
  evidenceId:string;
  access:AccessCondition;
  sourceVisible:boolean;
  canContestInterpretation:boolean;
}

export interface MemberStandingRecord {
  memberId:string;
  standing:StandingCondition;
  canSubmitDissent:boolean;
  canRequestReopen:boolean;
  retaliationRisk:"LOW"|"ELEVATED"|"SEVERE";
}

export interface InfluenceRecord {
  actorId:string;
  targetMemberIds:string[];
  kind:InfluenceKind;
  basis:string;
  scope:string;
  contestable:boolean;
}

export interface MinorityReport {
  reportId:string;
  memberIds:string[];
  preferredCandidateIds:string[];
  claims:string[];
  evidenceIds:string[];
  reasons:string[];
  unresolvedQuestions:string[];
  requestedReopenConditions:string[];
  preserved:boolean;
}

export interface EvidenceAsymmetryAudit {
  evidenceIds:string[];
  asymmetricEvidenceIds:string[];
  blockedMembers:string[];
  interpretationContestabilityFailures:string[];
  materiallyAsymmetric:boolean;
}

export interface AuthorityPowerAudit {
  epistemicAuthorityActors:string[];
  proceduralAuthorityActors:string[];
  practicalPowerActors:string[];
  powerPresentedAsEpistemicAuthority:string[];
  uncontestableInfluence:string[];
  distortionRisk:"LOW"|"ELEVATED"|"SEVERE";
}

export interface PersistentDisagreementState {
  communityId:string;
  majorityCandidateId?:string;
  minorityReports:MinorityReport[];
  evidenceAccess:EvidenceAccessRecord[];
  standing:MemberStandingRecord[];
  influences:InfluenceRecord[];
  sharedActions:string[];
}

export type NonconvergenceLegitimacy =
  | "LEGITIMATE_PENDING_INQUIRY"
  | "LEGITIMATE_PERSISTENT_PLURALISM"
  | "DISTORTED_BY_ASYMMETRY"
  | "DISTORTED_BY_POWER"
  | "INSUFFICIENTLY_GOVERNED";

export interface LegitimateNonconvergenceAudit {
  result:NonconvergenceLegitimacy;
  preservedMinorityReports:string[];
  lostMinorityReports:string[];
  evidenceAsymmetry:EvidenceAsymmetryAudit;
  authorityPower:AuthorityPowerAudit;
  standingFailures:string[];
  reopenAvailable:boolean;
  majorityConvergenceAuthorizesTruth:false;
  dissentAuthorizesTruth:false;
  reasons:string[];
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function auditEvidenceAsymmetry(
  access:EvidenceAccessRecord[]
):EvidenceAsymmetryAudit{
  const evidenceIds=canonical(access.map(x=>x.evidenceId));
  const asymmetricEvidenceIds:string[]=[];
  const blockedMembers:string[]=[];
  const interpretationContestabilityFailures:string[]=[];

  for(const evidenceId of evidenceIds){
    const rows=access.filter(x=>x.evidenceId===evidenceId);
    const conditions=new Set(rows.map(x=>x.access));
    if(conditions.size>1 || rows.some(x=>x.access!=="OPEN")){
      asymmetricEvidenceIds.push(evidenceId);
    }
    for(const row of rows){
      if(row.access==="BLOCKED") blockedMembers.push(row.memberId);
      if(!row.canContestInterpretation)
        interpretationContestabilityFailures.push(
          `${row.memberId}::${evidenceId}`
        );
    }
  }

  return {
    evidenceIds,
    asymmetricEvidenceIds:canonical(asymmetricEvidenceIds),
    blockedMembers:canonical(blockedMembers),
    interpretationContestabilityFailures:canonical(
      interpretationContestabilityFailures
    ),
    materiallyAsymmetric:
      asymmetricEvidenceIds.length>0 ||
      blockedMembers.length>0 ||
      interpretationContestabilityFailures.length>0
  };
}

export function auditAuthorityPower(
  influences:InfluenceRecord[]
):AuthorityPowerAudit{
  const epistemicAuthorityActors=canonical(
    influences.filter(x=>x.kind==="EPISTEMIC_AUTHORITY").map(x=>x.actorId)
  );
  const proceduralAuthorityActors=canonical(
    influences.filter(x=>x.kind==="PROCEDURAL_AUTHORITY").map(x=>x.actorId)
  );
  const practicalPowerActors=canonical(
    influences.filter(x=>x.kind==="PRACTICAL_POWER").map(x=>x.actorId)
  );
  const powerPresentedAsEpistemicAuthority=canonical(
    influences
      .filter(x=>
        x.kind==="PRACTICAL_POWER" &&
        /expert|evidence|technical|scientific/i.test(x.basis)
      )
      .map(x=>x.actorId)
  );
  const uncontestableInfluence=canonical(
    influences.filter(x=>!x.contestable).map(x=>x.actorId)
  );

  let distortionRisk:AuthorityPowerAudit["distortionRisk"]="LOW";
  if(
    powerPresentedAsEpistemicAuthority.length>0 &&
    uncontestableInfluence.length>0
  ) distortionRisk="SEVERE";
  else if(
    practicalPowerActors.length>0 ||
    uncontestableInfluence.length>0
  ) distortionRisk="ELEVATED";

  return {
    epistemicAuthorityActors,
    proceduralAuthorityActors,
    practicalPowerActors,
    powerPresentedAsEpistemicAuthority,
    uncontestableInfluence,
    distortionRisk
  };
}

export function preserveMinorityReport(
  report:MinorityReport
):MinorityReport{
  return {
    ...structuredClone(report),
    memberIds:canonical(report.memberIds),
    preferredCandidateIds:canonical(report.preferredCandidateIds),
    evidenceIds:canonical(report.evidenceIds),
    preserved:true
  };
}

export function auditLegitimateNonconvergence(
  state:PersistentDisagreementState
):LegitimateNonconvergenceAudit{
  const evidenceAsymmetry=auditEvidenceAsymmetry(state.evidenceAccess);
  const authorityPower=auditAuthorityPower(state.influences);
  const preservedMinorityReports=state.minorityReports
    .filter(r=>r.preserved)
    .map(r=>r.reportId);
  const lostMinorityReports=state.minorityReports
    .filter(r=>!r.preserved)
    .map(r=>r.reportId);

  const standingFailures=state.standing
    .filter(s=>
      s.standing!=="FULL" ||
      !s.canSubmitDissent ||
      !s.canRequestReopen ||
      s.retaliationRisk==="SEVERE"
    )
    .map(s=>s.memberId);

  const reopenAvailable=
    state.standing.length>0 &&
    state.standing.every(s=>s.canRequestReopen);

  const reasons:string[]=[];
  let result:NonconvergenceLegitimacy;

  if(authorityPower.distortionRisk==="SEVERE"){
    result="DISTORTED_BY_POWER";
    reasons.push("practical power is presented as epistemic authority under uncontestable conditions");
  } else if(evidenceAsymmetry.materiallyAsymmetric || standingFailures.length>0){
    result="DISTORTED_BY_ASYMMETRY";
    reasons.push("participants do not have sufficiently symmetric evidence access or standing");
  } else if(lostMinorityReports.length>0 || !reopenAvailable){
    result="INSUFFICIENTLY_GOVERNED";
    reasons.push("minority reporting or reopening is not adequately preserved");
  } else {
    const unresolved=state.minorityReports.some(
      r=>r.unresolvedQuestions.length>0 || r.requestedReopenConditions.length>0
    );
    result=unresolved
      ? "LEGITIMATE_PENDING_INQUIRY"
      : "LEGITIMATE_PERSISTENT_PLURALISM";
    reasons.push(
      unresolved
        ? "dissent remains preserved while inquiry conditions remain open"
        : "dissent persists under symmetric access, standing, and reopenability"
    );
  }

  return {
    result,
    preservedMinorityReports,
    lostMinorityReports,
    evidenceAsymmetry,
    authorityPower,
    standingFailures:canonical(standingFailures),
    reopenAvailable,
    majorityConvergenceAuthorizesTruth:false,
    dissentAuthorizesTruth:false,
    reasons
  };
}
