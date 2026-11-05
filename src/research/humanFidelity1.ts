import { RecognitionKind } from "./integration3";

export type ParticipantEvidenceSource =
  | "REAL_PARTICIPANT"
  | "SYNTHETIC"
  | "MODEL_SIMULATION";

export type HumanEvidenceGateStatus =
  | "PENDING"
  | "INSUFFICIENT"
  | "MIXED"
  | "PASS"
  | "FAIL";

export interface ParticipantProtocol {
  protocolId:string;
  version:string;
  minimumParticipants:number;
  requireIndependentConsent:boolean;
  requireOwnLivedCase:boolean;
  allowSensitiveDisclosure:boolean;
  requireSkipOption:boolean;
  requireWithdrawalOption:boolean;
  requirePostJourneyInterview:boolean;
  requireRecognitionElicitation:boolean;
  requireFormFillingProbe:boolean;
  prohibitResearchVocabularyPriming:boolean;
  prohibitLeadingRecognitionClaims:boolean;
}

export interface ParticipantSession {
  sessionId:string;
  participantId:string;
  source:ParticipantEvidenceSource;
  consentConfirmed:boolean;
  ownLivedCase:boolean;
  completedJourney:boolean;
  withdrew:boolean;
  recognitionElicited:boolean;
  formProbeCompleted:boolean;
  interviewCompleted:boolean;
  researchVocabularyPrimed:boolean;
  systemClaimedRecognition:boolean;
  facilitatorLedConclusion:boolean;
}

export type RecognitionResponse =
  | "YES"
  | "PARTLY"
  | "NO"
  | "NOT_SURE"
  | "DECLINED";

export interface HumanRecognitionEvidence {
  sessionId:string;
  kind:RecognitionKind;
  response:RecognitionResponse;
  verbatim:string;
  spontaneous:boolean;
  prompted:boolean;
}

export interface FormFillingEvidence {
  sessionId:string;
  feltLikeForm:"NO"|"PARTLY"|"YES"|"NOT_SURE";
  feltForcedToComplete:boolean;
  repeatedSelfUnnecessarily:boolean;
  promptsFitSituation:"YES"|"PARTLY"|"NO"|"NOT_SURE";
  couldLeaveViewsSparse:boolean;
  systemSeemedToDecideForMe:boolean;
  verbatim:string;
}

export interface JourneyInterviewEvidence {
  sessionId:string;
  ownWordsPreserved:"YES"|"PARTLY"|"NO"|"NOT_SURE";
  mapStillFeltLikeSameSituation:"YES"|"PARTLY"|"NO"|"NOT_SURE";
  returnFeltAuthoredByMe:"YES"|"PARTLY"|"NO"|"NOT_SURE";
  usefulDistinction:string;
  distortionOrMismatch:string;
  missingContext:string;
  whatWouldImprove:string;
}

export interface ParticipantEvidenceRecord {
  session:ParticipantSession;
  recognition:HumanRecognitionEvidence[];
  formFilling:FormFillingEvidence;
  interview:JourneyInterviewEvidence;
}

export interface SessionProtocolAudit {
  sessionId:string;
  source:ParticipantEvidenceSource;
  eligibleHumanEvidence:boolean;
  failures:string[];
}

export interface ParticipantOutcome {
  sessionId:string;
  recognitionKindsAffirmed:RecognitionKind[];
  recognitionKindsRejected:RecognitionKind[];
  formFillingConcern:boolean;
  authorshipConcern:boolean;
  continuityConcern:boolean;
  protocolEligible:boolean;
}

export interface HumanEvidenceGate {
  protocolId:string;
  status:HumanEvidenceGateStatus;
  eligibleParticipantCount:number;
  excludedSessionIds:string[];
  participantOutcomes:ParticipantOutcome[];
  recognitionCoverage:{
    thereIAmAffirmed:number;
    hereIAmAffirmed:number;
    iSeeMeAffirmed:number;
  };
  formFillingConcernCount:number;
  authorshipConcernCount:number;
  continuityConcernCount:number;
  adverseCasesPreserved:boolean;
  humanEvidenceOnly:boolean;
  claimCeiling:string;
}

export interface InterviewQuestion {
  questionId:string;
  purpose:string;
  text:string;
  leading:false;
}

export const JOURNEY_INTERVIEW:InterviewQuestion[]=[
  {
    questionId:"same-situation",
    purpose:"lived continuity",
    text:"Did the map continue to feel like it was about the same situation you started with? What changed, if anything?",
    leading:false
  },
  {
    questionId:"own-words",
    purpose:"language fidelity",
    text:"Where did the system preserve your own words well, and where did it feel like your meaning had been changed?",
    leading:false
  },
  {
    questionId:"there-i-am",
    purpose:"local recognition",
    text:"Was there any point where a part of the map felt especially accurate or recognizable to you? If so, what made it feel that way?",
    leading:false
  },
  {
    questionId:"here-i-am",
    purpose:"architectural self-location",
    text:"Did the larger map help you locate where you were in the situation, or did it make the situation feel more abstract?",
    leading:false
  },
  {
    questionId:"i-see-me",
    purpose:"diachronic recognition",
    text:"Looking back across the journey, did you notice any change in how you understood your own thinking or situation?",
    leading:false
  },
  {
    questionId:"form-filling",
    purpose:"questionnaire failure detection",
    text:"Did any part feel like filling out a form rather than thinking through your situation? Which part?",
    leading:false
  },
  {
    questionId:"authorship",
    purpose:"authorial return",
    text:"At the end, did the judgment feel like yours, the system's, or something in between? Why?",
    leading:false
  },
  {
    questionId:"missing",
    purpose:"omission detection",
    text:"What important part of the situation was missing, distorted, or hard to represent?",
    leading:false
  }
];

export const HUMAN_FIDELITY_PROTOCOL_1:ParticipantProtocol={
  protocolId:"FSP-HUMAN-FIDELITY-1.0",
  version:"1.0",
  minimumParticipants:5,
  requireIndependentConsent:true,
  requireOwnLivedCase:true,
  allowSensitiveDisclosure:false,
  requireSkipOption:true,
  requireWithdrawalOption:true,
  requirePostJourneyInterview:true,
  requireRecognitionElicitation:true,
  requireFormFillingProbe:true,
  prohibitResearchVocabularyPriming:true,
  prohibitLeadingRecognitionClaims:true
};

function canonical<T extends string>(values:T[]):T[]{
  return [...new Set(values)].sort() as T[];
}

export function auditSessionProtocol(
  protocol:ParticipantProtocol,
  session:ParticipantSession
):SessionProtocolAudit{
  const failures:string[]=[];

  if(protocol.requireIndependentConsent && !session.consentConfirmed)
    failures.push("consent-not-confirmed");
  if(protocol.requireOwnLivedCase && !session.ownLivedCase)
    failures.push("not-own-lived-case");
  if(session.withdrew)
    failures.push("participant-withdrew");
  if(!session.completedJourney)
    failures.push("journey-not-completed");
  if(protocol.requireRecognitionElicitation && !session.recognitionElicited)
    failures.push("recognition-not-elicited");
  if(protocol.requireFormFillingProbe && !session.formProbeCompleted)
    failures.push("form-filling-probe-missing");
  if(protocol.requirePostJourneyInterview && !session.interviewCompleted)
    failures.push("journey-interview-missing");
  if(protocol.prohibitResearchVocabularyPriming && session.researchVocabularyPrimed)
    failures.push("research-vocabulary-priming");
  if(protocol.prohibitLeadingRecognitionClaims && session.systemClaimedRecognition)
    failures.push("system-claimed-recognition");
  if(session.facilitatorLedConclusion)
    failures.push("facilitator-led-conclusion");

  const eligibleHumanEvidence=
    session.source==="REAL_PARTICIPANT" &&
    failures.length===0;

  return {
    sessionId:session.sessionId,
    source:session.source,
    eligibleHumanEvidence,
    failures
  };
}

function affirmed(response:RecognitionResponse):boolean{
  return response==="YES" || response==="PARTLY";
}

function rejected(response:RecognitionResponse):boolean{
  return response==="NO";
}

export function participantOutcome(
  protocol:ParticipantProtocol,
  record:ParticipantEvidenceRecord
):ParticipantOutcome{
  const protocolAudit=auditSessionProtocol(protocol,record.session);

  const recognitionKindsAffirmed=canonical(
    record.recognition
      .filter(r=>affirmed(r.response) && Boolean(r.verbatim.trim()))
      .map(r=>r.kind)
  );
  const recognitionKindsRejected=canonical(
    record.recognition
      .filter(r=>rejected(r.response))
      .map(r=>r.kind)
  );

  const formFillingConcern=
    record.formFilling.feltLikeForm==="YES" ||
    record.formFilling.feltForcedToComplete ||
    record.formFilling.repeatedSelfUnnecessarily ||
    record.formFilling.promptsFitSituation==="NO" ||
    !record.formFilling.couldLeaveViewsSparse;

  const authorshipConcern=
    record.formFilling.systemSeemedToDecideForMe ||
    record.interview.returnFeltAuthoredByMe==="NO";

  const continuityConcern=
    record.interview.mapStillFeltLikeSameSituation==="NO" ||
    record.interview.ownWordsPreserved==="NO";

  return {
    sessionId:record.session.sessionId,
    recognitionKindsAffirmed,
    recognitionKindsRejected,
    formFillingConcern,
    authorshipConcern,
    continuityConcern,
    protocolEligible:protocolAudit.eligibleHumanEvidence
  };
}

export function auditHumanEvidenceGate(
  protocol:ParticipantProtocol,
  records:ParticipantEvidenceRecord[]
):HumanEvidenceGate{
  const audited=records.map(r=>({
    record:r,
    protocol:auditSessionProtocol(protocol,r.session),
    outcome:participantOutcome(protocol,r)
  }));

  const eligible=audited.filter(x=>x.protocol.eligibleHumanEvidence);
  const excludedSessionIds=canonical(
    audited.filter(x=>!x.protocol.eligibleHumanEvidence).map(x=>x.record.session.sessionId)
  );
  const outcomes=eligible.map(x=>x.outcome);

  const countAffirmed=(kind:RecognitionKind)=>
    outcomes.filter(o=>o.recognitionKindsAffirmed.includes(kind)).length;

  const recognitionCoverage={
    thereIAmAffirmed:countAffirmed("THERE_I_AM"),
    hereIAmAffirmed:countAffirmed("YES_HERE_I_AM"),
    iSeeMeAffirmed:countAffirmed("I_SEE_ME")
  };

  const formFillingConcernCount=outcomes.filter(o=>o.formFillingConcern).length;
  const authorshipConcernCount=outcomes.filter(o=>o.authorshipConcern).length;
  const continuityConcernCount=outcomes.filter(o=>o.continuityConcern).length;

  let status:HumanEvidenceGateStatus="PENDING";

  if(eligible.length===0){
    status="PENDING";
  } else if(eligible.length<protocol.minimumParticipants){
    status="INSUFFICIENT";
  } else {
    const majorityThreshold=Math.floor(eligible.length/2)+1;
    const allRecognitionMajority=
      recognitionCoverage.thereIAmAffirmed>=majorityThreshold &&
      recognitionCoverage.hereIAmAffirmed>=majorityThreshold &&
      recognitionCoverage.iSeeMeAffirmed>=majorityThreshold;

    const severeConcern=
      authorshipConcernCount>=majorityThreshold ||
      continuityConcernCount>=majorityThreshold ||
      formFillingConcernCount>=majorityThreshold;

    const anyAdverse=
      authorshipConcernCount>0 ||
      continuityConcernCount>0 ||
      formFillingConcernCount>0 ||
      outcomes.some(o=>o.recognitionKindsRejected.length>0);

    if(severeConcern){
      status="FAIL";
    } else if(allRecognitionMajority && !anyAdverse){
      status="PASS";
    } else {
      status="MIXED";
    }
  }

  return {
    protocolId:protocol.protocolId,
    status,
    eligibleParticipantCount:eligible.length,
    excludedSessionIds,
    participantOutcomes:outcomes,
    recognitionCoverage,
    formFillingConcernCount,
    authorshipConcernCount,
    continuityConcernCount,
    adverseCasesPreserved:true,
    humanEvidenceOnly:eligible.every(x=>x.record.session.source==="REAL_PARTICIPANT"),
    claimCeiling:
      "This gate summarizes protocol-compliant participant evidence about recognition, continuity, authorship, and form-filling. It does not establish general psychological efficacy, clinical benefit, or population-wide validity."
  };
}

export function protocolReady(
  protocol:ParticipantProtocol
):boolean{
  return Boolean(
    protocol.protocolId &&
    protocol.version &&
    protocol.minimumParticipants>=3 &&
    protocol.requireIndependentConsent &&
    protocol.requireOwnLivedCase &&
    protocol.requireSkipOption &&
    protocol.requireWithdrawalOption &&
    protocol.requirePostJourneyInterview &&
    protocol.requireRecognitionElicitation &&
    protocol.requireFormFillingProbe &&
    protocol.prohibitResearchVocabularyPriming &&
    protocol.prohibitLeadingRecognitionClaims
  );
}
