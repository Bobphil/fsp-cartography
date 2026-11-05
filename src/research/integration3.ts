import { ViewId } from "../kernel/types";
import { CompressionPlan } from "./integration2";

export type RecognitionKind =
  | "THERE_I_AM"
  | "YES_HERE_I_AM"
  | "I_SEE_ME";

export type RecognitionSource =
  | "USER_REPORTED"
  | "NOT_REPORTED";

export interface LivedAnchor {
  anchorId:string;
  userLanguage:string;
  introducedIn:ViewId;
  carriedThrough:ViewId[];
  changedByUser:boolean;
  systemRewording?:string;
}

export interface JourneyMoment {
  view:ViewId;
  orientation:string;
  userLanguageRetained:string[];
  newDistinctions:string[];
  unansweredQuestions:string[];
  nextMove:string;
  compression:CompressionPlan;
}

export interface LivedDoingJourney {
  journeyId:string;
  taskLanguage:string;
  anchors:LivedAnchor[];
  moments:JourneyMoment[];
  returnLanguage:string;
}

export interface ContinuityAudit {
  journeyId:string;
  allViewsPresent:boolean;
  taskLanguagePreserved:boolean;
  anchorsLost:string[];
  anchorsOverwrittenBySystem:string[];
  unresolvedQuestionsCarried:boolean;
  returnReconnectsToJourney:boolean;
  passes:boolean;
}

export interface RecognitionRecord {
  recognitionId:string;
  kind:RecognitionKind;
  source:RecognitionSource;
  view:ViewId;
  userText?:string;
  relatedAnchorIds:string[];
}

export interface RecognitionAudit {
  records:RecognitionRecord[];
  userReportedKinds:RecognitionKind[];
  systemMayClaimRecognition:false;
  missingKinds:RecognitionKind[];
  passesArchitecture:boolean;
  humanRecognitionValidated:boolean;
}

export interface FormFillingSignals {
  mandatoryFieldCount:number;
  repeatedEntryCount:number;
  genericPromptCount:number;
  promptsDetachedFromCurrentLanguage:number;
  forcedViewCompletion:boolean;
  emptyStateFabrication:boolean;
  systemAuthoredJudgment:boolean;
  recommendationPressure:boolean;
  userCanSkip:boolean;
  userCanReturnBackward:boolean;
  userLanguageReused:boolean;
}

export type FormFillingRisk = "LOW"|"ELEVATED"|"HIGH";

export interface FormFillingAudit {
  risk:FormFillingRisk;
  failures:string[];
  protectiveFeatures:string[];
  passes:boolean;
}

export interface HumanFidelityPrototypeAudit {
  continuity:ContinuityAudit;
  recognition:RecognitionAudit;
  formFilling:FormFillingAudit;
  architecturePass:boolean;
  humanValidationStatus:"PENDING";
  claimCeiling:string;
}

const VIEW_ORDER:ViewId[]=[
  "START","PEOPLE","INSTITUTION","HSF","CONNECTIONS","INVESTIGATE","RETURN"
];

function canonical<T extends string>(values:T[]):T[]{
  return [...new Set(values)].sort() as T[];
}

export function auditLivedContinuity(
  journey:LivedDoingJourney
):ContinuityAudit{
  const views=journey.moments.map(m=>m.view);
  const allViewsPresent=VIEW_ORDER.every(v=>views.includes(v));

  const allVisibleLanguage=journey.moments.flatMap(m=>m.userLanguageRetained);
  const taskLanguagePreserved=
    allVisibleLanguage.includes(journey.taskLanguage) ||
    journey.returnLanguage.includes(journey.taskLanguage);

  const anchorsLost=journey.anchors
    .filter(a=>!a.carriedThrough.every(v=>
      journey.moments
        .filter(m=>m.view===v)
        .some(m=>m.userLanguageRetained.includes(a.userLanguage))
    ))
    .map(a=>a.anchorId);

  const anchorsOverwrittenBySystem=journey.anchors
    .filter(a=>
      Boolean(a.systemRewording) &&
      !a.changedByUser &&
      a.systemRewording!.trim()!==a.userLanguage.trim()
    )
    .map(a=>a.anchorId);

  const unresolvedQuestions=journey.moments
    .slice(0,-1)
    .flatMap(m=>m.unansweredQuestions)
    .filter(Boolean);
  const returnMoment=journey.moments.find(m=>m.view==="RETURN");
  const unresolvedQuestionsCarried=
    unresolvedQuestions.length===0 ||
    Boolean(returnMoment) && unresolvedQuestions.some(q=>
      returnMoment!.unansweredQuestions.includes(q) ||
      journey.returnLanguage.toLowerCase().includes(q.toLowerCase())
    );

  const returnReconnectsToJourney=
    Boolean(returnMoment) &&
    journey.anchors.some(a=>
      journey.returnLanguage.includes(a.userLanguage) ||
      returnMoment!.userLanguageRetained.includes(a.userLanguage)
    );

  const passes=
    allViewsPresent &&
    taskLanguagePreserved &&
    anchorsLost.length===0 &&
    anchorsOverwrittenBySystem.length===0 &&
    unresolvedQuestionsCarried &&
    returnReconnectsToJourney;

  return {
    journeyId:journey.journeyId,
    allViewsPresent,
    taskLanguagePreserved,
    anchorsLost:canonical(anchorsLost),
    anchorsOverwrittenBySystem:canonical(anchorsOverwrittenBySystem),
    unresolvedQuestionsCarried,
    returnReconnectsToJourney,
    passes
  };
}

export function auditRecognition(
  records:RecognitionRecord[]
):RecognitionAudit{
  const userReportedKinds=canonical(
    records
      .filter(r=>r.source==="USER_REPORTED" && Boolean(r.userText?.trim()))
      .map(r=>r.kind)
  );
  const allKinds:RecognitionKind[]=["THERE_I_AM","YES_HERE_I_AM","I_SEE_ME"];
  const missingKinds=allKinds.filter(k=>!userReportedKinds.includes(k));

  return {
    records:structuredClone(records),
    userReportedKinds,
    systemMayClaimRecognition:false,
    missingKinds,
    passesArchitecture:records.every(r=>
      r.source==="NOT_REPORTED" || Boolean(r.userText?.trim())
    ),
    humanRecognitionValidated:
      missingKinds.length===0 &&
      records.every(r=>r.source==="USER_REPORTED")
  };
}

export function auditFormFillingRisk(
  s:FormFillingSignals
):FormFillingAudit{
  const failures:string[]=[];
  const protectiveFeatures:string[]=[];

  if(s.mandatoryFieldCount>3) failures.push("too-many-mandatory-fields");
  if(s.repeatedEntryCount>0) failures.push("repeated-entry-required");
  if(s.genericPromptCount>4) failures.push("too-many-generic-prompts");
  if(s.promptsDetachedFromCurrentLanguage>1) failures.push("prompts-detached-from-user-language");
  if(s.forcedViewCompletion) failures.push("forced-view-completion");
  if(s.emptyStateFabrication) failures.push("empty-state-fabrication");
  if(s.systemAuthoredJudgment) failures.push("system-authored-judgment");
  if(s.recommendationPressure) failures.push("recommendation-pressure");

  if(s.userCanSkip) protectiveFeatures.push("skip-supported");
  if(s.userCanReturnBackward) protectiveFeatures.push("backward-return-supported");
  if(s.userLanguageReused) protectiveFeatures.push("user-language-reused");
  if(!s.forcedViewCompletion) protectiveFeatures.push("sparse-view-permitted");
  if(!s.systemAuthoredJudgment) protectiveFeatures.push("authorial-return-preserved");

  let risk:FormFillingRisk="LOW";
  if(failures.length>=4) risk="HIGH";
  else if(failures.length>0) risk="ELEVATED";

  return {
    risk,
    failures,
    protectiveFeatures,
    passes:risk==="LOW"
  };
}

export function auditHumanFidelityPrototype(
  journey:LivedDoingJourney,
  recognitionRecords:RecognitionRecord[],
  formSignals:FormFillingSignals
):HumanFidelityPrototypeAudit{
  const continuity=auditLivedContinuity(journey);
  const recognition=auditRecognition(recognitionRecords);
  const formFilling=auditFormFillingRisk(formSignals);

  return {
    continuity,
    recognition,
    formFilling,
    architecturePass:
      continuity.passes &&
      recognition.passesArchitecture &&
      formFilling.passes,
    humanValidationStatus:"PENDING",
    claimCeiling:
      "This audit certifies structural conditions for lived continuity, user-owned recognition, and anti-form-filling design. It does not establish that actual users experience recognition, ease, or phenomenological fidelity."
  };
}

export function recognitionPrompt(kind:RecognitionKind):string{
  if(kind==="THERE_I_AM")
    return "Does this part of the map feel like it is actually pointing to your situation?";
  if(kind==="YES_HERE_I_AM")
    return "Does the larger map help you locate where you are in the situation now?";
  return "Looking across what changed, do you recognize your own thinking or situation differently now?";
}
