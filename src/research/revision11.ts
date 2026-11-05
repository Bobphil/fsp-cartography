import { CapabilityFloor, PartyAuthorization } from "./revision10";

export type EmergencySeverity =
  | "LOCALIZED"
  | "SERIOUS"
  | "SYSTEMIC"
  | "CATASTROPHIC";

export interface EmergencyCondition {
  emergencyId:string;
  description:string;
  severity:EmergencySeverity;
  evidenceIds:string[];
  affectedGroupIds:string[];
  ordinaryGovernanceInsufficient:boolean;
  urgency:string;
  alternativesConsidered:string[];
}

export interface TemporaryFloorException {
  exceptionId:string;
  emergencyId:string;
  floorId:string;
  groupId:string;
  capabilityId:string;
  temporaryRestriction:string;
  necessityRationale:string[];
  lessRestrictiveAlternatives:string[];
  residualCapability:string[];
  startOrdinal:number;
  sunsetOrdinal:number;
  renewable:boolean;
  independentReviewRequired:boolean;
  minorityReportRequired:boolean;
  restorationPlanId:string;
}

export type FloorExceptionStatus =
  | "PERMITTED_TEMPORARY_EXCEPTION"
  | "BLOCKED_NO_EMERGENCY"
  | "BLOCKED_NO_NECESSITY"
  | "BLOCKED_LESS_RESTRICTIVE_ALTERNATIVE"
  | "BLOCKED_NO_RESIDUAL_CAPABILITY"
  | "BLOCKED_NO_SUNSET"
  | "BLOCKED_NO_REVIEW"
  | "BLOCKED_MISMATCHED_FLOOR";

export interface FloorExceptionAudit {
  exceptionId:string;
  status:FloorExceptionStatus;
  reasons:string[];
  exceptionCreatesNewFloor:false;
  exceptionAuthorizesPermanentChange:false;
}

export interface SunsetReviewRule {
  ruleId:string;
  exceptionId:string;
  reviewOrdinals:number[];
  sunsetOrdinal:number;
  automaticExpiration:boolean;
  renewalRequiresNewAuthorization:boolean;
  renewalRequiresNewEvidence:boolean;
  renewalRequiresIndependentReview:boolean;
}

export interface SunsetReviewAudit {
  exceptionId:string;
  reviewScheduleValid:boolean;
  automaticExpiration:boolean;
  selfRenewalBlocked:boolean;
  newEvidenceRequiredForRenewal:boolean;
  independentReviewRequiredForRenewal:boolean;
  failures:string[];
}

export interface NonIdealAuthorizationInput {
  parties:PartyAuthorization[];
  requiredAffectedGroups:string[];
  unavailableGroups:string[];
  emergencyEvidenceVisible:boolean;
  proxyRepresentation:string[];
  independentReviewerPresent:boolean;
  retrospectiveReviewRequired:boolean;
}

export type NonIdealAuthorizationStatus =
  | "TEMPORARILY_AUTHORIZED_UNDER_CONSTRAINT"
  | "BLOCKED_COERCION"
  | "BLOCKED_UNREPRESENTED_AFFECTED_GROUP"
  | "BLOCKED_NO_EMERGENCY_EVIDENCE"
  | "BLOCKED_NO_INDEPENDENT_REVIEW"
  | "NOT_AUTHORIZED";

export interface NonIdealAuthorizationAudit {
  status:NonIdealAuthorizationStatus;
  representedGroups:string[];
  unavailableGroups:string[];
  proxyRepresentation:string[];
  retrospectiveReviewRequired:boolean;
  temporaryAuthorizationOnly:true;
  normalAuthorizationPresumed:false;
  reasons:string[];
}

export interface RestorationPlan {
  planId:string;
  emergencyId:string;
  exceptionIds:string[];
  restorationSteps:string[];
  restorationEvidence:string[];
  targetNormalGovernanceConditions:string[];
  deadlineOrdinal:number;
  reopenAfterRestoration:boolean;
}

export type RestorationStatus =
  | "RESTORED_TO_NORMAL_GOVERNANCE"
  | "RESTORATION_IN_PROGRESS"
  | "FAILED_RESTORATION"
  | "EXCEPTION_NORMALIZED";

export interface RestorationAudit {
  planId:string;
  status:RestorationStatus;
  completedSteps:string[];
  missingSteps:string[];
  normalConditionsRestored:string[];
  missingNormalConditions:string[];
  deadlinePassed:boolean;
  emergencyExceptionStillActive:boolean;
  restorationReopenAvailable:boolean;
  emergencyPersistenceJustifiesContinuation:false;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function auditTemporaryFloorException(
  emergency:EmergencyCondition,
  floor:CapabilityFloor,
  exception:TemporaryFloorException
):FloorExceptionAudit{
  const reasons:string[]=[];
  let status:FloorExceptionStatus="PERMITTED_TEMPORARY_EXCEPTION";

  if(exception.floorId!==floor.floorId ||
     exception.groupId!==floor.groupId ||
     exception.capabilityId!==floor.capabilityId){
    status="BLOCKED_MISMATCHED_FLOOR";
    reasons.push("exception does not match the protected floor");
  } else if(!emergency.ordinaryGovernanceInsufficient){
    status="BLOCKED_NO_EMERGENCY";
    reasons.push("ordinary governance remains sufficient");
  } else if(exception.necessityRationale.length===0){
    status="BLOCKED_NO_NECESSITY";
    reasons.push("necessity rationale is missing");
  } else if(exception.lessRestrictiveAlternatives.length>0){
    status="BLOCKED_LESS_RESTRICTIVE_ALTERNATIVE";
    reasons.push("a less restrictive represented alternative remains available");
  } else if(exception.residualCapability.length===0){
    status="BLOCKED_NO_RESIDUAL_CAPABILITY";
    reasons.push("exception eliminates the protected capability rather than narrowing it");
  } else if(exception.sunsetOrdinal<=exception.startOrdinal){
    status="BLOCKED_NO_SUNSET";
    reasons.push("exception lacks a valid bounded sunset");
  } else if(!exception.independentReviewRequired || !exception.minorityReportRequired){
    status="BLOCKED_NO_REVIEW";
    reasons.push("independent review and minority-report preservation are required");
  } else {
    reasons.push("temporary exception is narrowly represented, reviewed, sunsetted, and restoration-linked");
  }

  return {
    exceptionId:exception.exceptionId,
    status,
    reasons,
    exceptionCreatesNewFloor:false,
    exceptionAuthorizesPermanentChange:false
  };
}

export function auditSunsetReview(
  exception:TemporaryFloorException,
  rule:SunsetReviewRule
):SunsetReviewAudit{
  const failures:string[]=[];
  const sorted=[...rule.reviewOrdinals].sort((a,b)=>a-b);
  const reviewScheduleValid=
    sorted.length>0 &&
    sorted.every(x=>x>exception.startOrdinal && x<=rule.sunsetOrdinal) &&
    rule.sunsetOrdinal===exception.sunsetOrdinal;

  if(!reviewScheduleValid) failures.push("invalid-review-schedule");
  if(!rule.automaticExpiration) failures.push("expiration-not-automatic");
  if(!rule.renewalRequiresNewAuthorization) failures.push("renewal-can-self-authorize");
  if(!rule.renewalRequiresNewEvidence) failures.push("renewal-does-not-require-new-evidence");
  if(!rule.renewalRequiresIndependentReview) failures.push("renewal-lacks-independent-review");

  return {
    exceptionId:exception.exceptionId,
    reviewScheduleValid,
    automaticExpiration:rule.automaticExpiration,
    selfRenewalBlocked:rule.renewalRequiresNewAuthorization,
    newEvidenceRequiredForRenewal:rule.renewalRequiresNewEvidence,
    independentReviewRequiredForRenewal:rule.renewalRequiresIndependentReview,
    failures
  };
}

export function auditNonIdealAuthorization(
  input:NonIdealAuthorizationInput
):NonIdealAuthorizationAudit{
  const representedGroups=canonical(input.parties.flatMap(p=>p.affectedGroupIds));
  const unavailable=new Set(input.unavailableGroups);
  const proxy=new Set(input.proxyRepresentation);
  const missing=input.requiredAffectedGroups.filter(g=>
    !representedGroups.includes(g) &&
    !(unavailable.has(g) && proxy.has(g))
  );

  const coerced=input.parties.some(p=>
    (p.authorization==="AUTHORIZE" || p.authorization==="CONDITIONALLY_AUTHORIZE") &&
    p.coercionRisk==="SEVERE"
  );

  let status:NonIdealAuthorizationStatus;
  const reasons:string[]=[];

  if(coerced){
    status="BLOCKED_COERCION";
    reasons.push("severe coercion invalidates emergency authorization");
  } else if(missing.length>0 || input.parties.some(p=>!p.standingAdequate)){
    status="BLOCKED_UNREPRESENTED_AFFECTED_GROUP";
    reasons.push("affected groups lack adequate direct or proxy standing");
  } else if(!input.emergencyEvidenceVisible){
    status="BLOCKED_NO_EMERGENCY_EVIDENCE";
    reasons.push("emergency evidence is not sufficiently visible");
  } else if(!input.independentReviewerPresent){
    status="BLOCKED_NO_INDEPENDENT_REVIEW";
    reasons.push("independent emergency review is absent");
  } else if(input.parties.some(p=>p.authorization==="OBJECT" || p.authorization==="WITHHOLD")){
    status="NOT_AUTHORIZED";
    reasons.push("represented parties withhold or object");
  } else {
    status="TEMPORARILY_AUTHORIZED_UNDER_CONSTRAINT";
    reasons.push("authorization is temporary, constrained, and subject to retrospective review");
  }

  return {
    status,
    representedGroups,
    unavailableGroups:canonical(input.unavailableGroups),
    proxyRepresentation:canonical(input.proxyRepresentation),
    retrospectiveReviewRequired:input.retrospectiveReviewRequired,
    temporaryAuthorizationOnly:true,
    normalAuthorizationPresumed:false,
    reasons
  };
}

export function auditRestorationToNormalGovernance(
  plan:RestorationPlan,
  context:{
    currentOrdinal:number;
    completedSteps:string[];
    restoredNormalConditions:string[];
    activeExceptionIds:string[];
  }
):RestorationAudit{
  const completedSteps=canonical(context.completedSteps);
  const missingSteps=plan.restorationSteps.filter(s=>!completedSteps.includes(s));
  const normalConditionsRestored=canonical(context.restoredNormalConditions);
  const missingNormalConditions=plan.targetNormalGovernanceConditions
    .filter(c=>!normalConditionsRestored.includes(c));
  const deadlinePassed=context.currentOrdinal>plan.deadlineOrdinal;
  const emergencyExceptionStillActive=plan.exceptionIds.some(
    id=>context.activeExceptionIds.includes(id)
  );

  let status:RestorationStatus;
  if(
    missingSteps.length===0 &&
    missingNormalConditions.length===0 &&
    !emergencyExceptionStillActive
  ){
    status="RESTORED_TO_NORMAL_GOVERNANCE";
  } else if(
    deadlinePassed &&
    emergencyExceptionStillActive &&
    missingNormalConditions.length>0
  ){
    status="EXCEPTION_NORMALIZED";
  } else if(deadlinePassed && (missingSteps.length>0 || missingNormalConditions.length>0)){
    status="FAILED_RESTORATION";
  } else {
    status="RESTORATION_IN_PROGRESS";
  }

  return {
    planId:plan.planId,
    status,
    completedSteps,
    missingSteps,
    normalConditionsRestored,
    missingNormalConditions,
    deadlinePassed,
    emergencyExceptionStillActive,
    restorationReopenAvailable:plan.reopenAfterRestoration,
    emergencyPersistenceJustifiesContinuation:false
  };
}
