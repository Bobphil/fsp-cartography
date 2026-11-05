export type CredibilityAssessment =
  | "DEFICIT"
  | "PROPORTIONATE"
  | "EXCESS"
  | "UNRESOLVED";

export type InterpretiveAdequacy =
  | "ADEQUATE"
  | "PARTIAL"
  | "GAP"
  | "CONTESTED";

export interface TestimonialRecord {
  testimonyId:string;
  speakerId:string;
  claim:string;
  evidenceIds:string[];
  assignedCredibility:CredibilityAssessment;
  credibilityBasis:string[];
  identityLinkedPrejudiceIndicators:string[];
  contentPrejudiceIndicators:string[];
  opportunityToRespond:boolean;
}

export interface TestimonialDistortionAudit {
  testimonyId:string;
  credibilityDistorted:boolean;
  possibleTestimonialInjustice:boolean;
  possibleCredibilityExcess:boolean;
  prejudiceIndicators:string[];
  proceduralDeficits:string[];
  claimCeiling:string;
}

export interface InterpretiveResource {
  resourceId:string;
  label:string;
  origin:"DOMINANT"|"COUNTER_PUBLIC"|"SHARED"|"EMERGENT";
  concepts:string[];
  participantContributors:string[];
  contestable:boolean;
}

export interface ExperienceInterpretationRecord {
  recordId:string;
  memberId:string;
  experienceClaim:string;
  availableResourceIds:string[];
  missingConcepts:string[];
  adequacy:InterpretiveAdequacy;
  excludedFromMeaningMaking:boolean;
  canProposeNewConcepts:boolean;
}

export interface HermeneuticalDistortionAudit {
  recordId:string;
  interpretiveGap:boolean;
  exclusionFromMeaningMaking:boolean;
  possibleHermeneuticalInjustice:boolean;
  missingConcepts:string[];
  repairTargets:string[];
  claimCeiling:string;
}

export interface StandingRepair {
  memberId:string;
  restoreTestimonySubmission:boolean;
  restoreQuestionRaising:boolean;
  restoreHypothesisProposal:boolean;
  restoreConceptProposal:boolean;
  restoreInterpretiveContestability:boolean;
  reduceRetaliationRisk:boolean;
  description:string;
}

export interface CounterPublicEvidenceRecord {
  recordId:string;
  contributorIds:string[];
  evidenceIds:string[];
  interpretiveResourceIds:string[];
  claims:string[];
  provenanceVisible:boolean;
  mayChallengeDominantInterpretation:boolean;
  autoPrivileged:false;
}

export interface ContestabilityRepair {
  memberId:string;
  canChallengeCredibilityAssessment:boolean;
  canChallengeInterpretiveResource:boolean;
  canAddCounterEvidence:boolean;
  canRequestIndependentReview:boolean;
  canRequestReopen:boolean;
}

export interface RevisionReentryCandidate {
  candidateId:string;
  memberId:string;
  sourceClaimIds:string[];
  testimonyAuditPassed:boolean;
  hermeneuticalRepairAvailable:boolean;
  standingRestored:boolean;
  contestabilityRestored:boolean;
  provenanceVisible:boolean;
  unresolvedRetaliationRisk:boolean;
}

export type RevisionReentryStatus =
  | "REENTER"
  | "REENTER_WITH_REMAINDER"
  | "BLOCKED_STANDING"
  | "BLOCKED_CONTESTABILITY"
  | "BLOCKED_PROVENANCE"
  | "BLOCKED_UNRESOLVED_DISTORTION";

export interface RevisionReentryAudit {
  candidateId:string;
  status:RevisionReentryStatus;
  reasons:string[];
  reentryAuthorizesTruth:false;
  counterPublicEvidenceAutoPrivileged:false;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function auditTestimonialDistortion(
  record:TestimonialRecord
):TestimonialDistortionAudit{
  const prejudiceIndicators=canonical([
    ...record.identityLinkedPrejudiceIndicators,
    ...record.contentPrejudiceIndicators
  ]);
  const proceduralDeficits:string[]=[];
  if(!record.opportunityToRespond) proceduralDeficits.push("no-opportunity-to-respond");

  const possibleTestimonialInjustice=
    record.assignedCredibility==="DEFICIT" &&
    prejudiceIndicators.length>0;

  const possibleCredibilityExcess=
    record.assignedCredibility==="EXCESS" &&
    prejudiceIndicators.length>0;

  return {
    testimonyId:record.testimonyId,
    credibilityDistorted:
      possibleTestimonialInjustice || possibleCredibilityExcess,
    possibleTestimonialInjustice,
    possibleCredibilityExcess,
    prejudiceIndicators,
    proceduralDeficits,
    claimCeiling:
      "This audit identifies represented credibility distortion conditions; it does not by itself determine the truth of the testimony or prove an injustice occurred outside the represented case."
  };
}

export function auditHermeneuticalDistortion(
  record:ExperienceInterpretationRecord
):HermeneuticalDistortionAudit{
  const interpretiveGap=
    record.adequacy==="GAP" ||
    record.missingConcepts.length>0;
  const exclusionFromMeaningMaking=record.excludedFromMeaningMaking;
  const possibleHermeneuticalInjustice=
    interpretiveGap && exclusionFromMeaningMaking;

  const repairTargets:string[]=[];
  if(interpretiveGap) repairTargets.push("expand or revise interpretive resources");
  if(exclusionFromMeaningMaking) repairTargets.push("restore participation in meaning-making");
  if(!record.canProposeNewConcepts) repairTargets.push("restore concept-proposal standing");

  return {
    recordId:record.recordId,
    interpretiveGap,
    exclusionFromMeaningMaking,
    possibleHermeneuticalInjustice,
    missingConcepts:canonical(record.missingConcepts),
    repairTargets:canonical(repairTargets),
    claimCeiling:
      "A represented interpretive gap plus exclusion supports a hermeneutical-injustice candidate; it does not establish that every failure of understanding is unjust."
  };
}

export function applyStandingRepair(
  repair:StandingRepair
):string[]{
  const restored:string[]=[];
  if(repair.restoreTestimonySubmission) restored.push("testimony-submission");
  if(repair.restoreQuestionRaising) restored.push("question-raising");
  if(repair.restoreHypothesisProposal) restored.push("hypothesis-proposal");
  if(repair.restoreConceptProposal) restored.push("concept-proposal");
  if(repair.restoreInterpretiveContestability) restored.push("interpretive-contestability");
  if(repair.reduceRetaliationRisk) restored.push("safer-participation");
  return canonical(restored);
}

export function validateCounterPublicEvidence(
  record:CounterPublicEvidenceRecord
):string[]{
  const failures:string[]=[];
  if(record.contributorIds.length===0) failures.push("missing-contributors");
  if(record.evidenceIds.length===0) failures.push("missing-evidence");
  if(!record.provenanceVisible) failures.push("provenance-not-visible");
  if(!record.mayChallengeDominantInterpretation)
    failures.push("cannot-challenge-dominant-interpretation");
  return failures;
}

export function auditContestabilityRepair(
  repair:ContestabilityRepair
):string[]{
  const restored:string[]=[];
  if(repair.canChallengeCredibilityAssessment) restored.push("credibility-contestability");
  if(repair.canChallengeInterpretiveResource) restored.push("interpretive-resource-contestability");
  if(repair.canAddCounterEvidence) restored.push("counter-evidence-entry");
  if(repair.canRequestIndependentReview) restored.push("independent-review");
  if(repair.canRequestReopen) restored.push("reopen");
  return canonical(restored);
}

export function auditRevisionReentry(
  candidate:RevisionReentryCandidate
):RevisionReentryAudit{
  const reasons:string[]=[];
  let status:RevisionReentryStatus;

  if(!candidate.standingRestored){
    status="BLOCKED_STANDING";
    reasons.push("standing has not been restored");
  } else if(!candidate.contestabilityRestored){
    status="BLOCKED_CONTESTABILITY";
    reasons.push("credibility or interpretive contestability remains unavailable");
  } else if(!candidate.provenanceVisible){
    status="BLOCKED_PROVENANCE";
    reasons.push("source provenance remains insufficiently visible");
  } else if(candidate.unresolvedRetaliationRisk || !candidate.testimonyAuditPassed){
    status="BLOCKED_UNRESOLVED_DISTORTION";
    reasons.push("credibility distortion or retaliation conditions remain unresolved");
  } else if(candidate.hermeneuticalRepairAvailable){
    status="REENTER";
    reasons.push("standing, contestability, provenance, and interpretive resources support reentry");
  } else {
    status="REENTER_WITH_REMAINDER";
    reasons.push("reentry is allowed while interpretive remainder remains explicit");
  }

  return {
    candidateId:candidate.candidateId,
    status,
    reasons,
    reentryAuthorizesTruth:false,
    counterPublicEvidenceAutoPrivileged:false
  };
}
