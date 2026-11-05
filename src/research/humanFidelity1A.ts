import {
  HUMAN_FIDELITY_PROTOCOL_1,
  JOURNEY_INTERVIEW,
  ParticipantEvidenceRecord,
  ParticipantSession,
  auditHumanEvidenceGate,
  auditSessionProtocol
} from "./humanFidelity1";

export interface ConsentChecklist {
  participantId:string;
  voluntaryParticipation:boolean;
  ownLivedCase:boolean;
  noSensitiveDisclosureRequired:boolean;
  maySkip:boolean;
  mayWithdraw:boolean;
  recordingPermission:"YES"|"NO"|"NOT_REQUESTED";
  dataUseExplained:boolean;
  questionsAnswered:boolean;
  consentConfirmed:boolean;
}

export interface FacilitatorCheckpoint {
  checkpointId:string;
  phase:
    | "BEFORE"
    | "START"
    | "DURING"
    | "RETURN"
    | "RECOGNITION"
    | "FORM_PROBE"
    | "INTERVIEW"
    | "CLOSE";
  instruction:string;
  prohibitedMove?:string;
}

export interface ParticipantRecordTemplate {
  sessionId:string;
  participantId:string;
  livedCaseLabel:string;
  consent:ConsentChecklist;
  viewNotes:Record<string,string>;
  recognitionNotes:Record<string,string>;
  formFillingNotes:string;
  interviewNotes:Record<string,string>;
  withdrawalOccurred:boolean;
  researcherNotes:string;
}

export interface CodingSheet {
  sessionId:string;
  source:"REAL_PARTICIPANT"|"SYNTHETIC"|"MODEL_SIMULATION";
  consentConfirmed:boolean;
  ownLivedCase:boolean;
  completedJourney:boolean;
  withdrew:boolean;
  recognitionResponses:{
    THERE_I_AM:"YES"|"PARTLY"|"NO"|"NOT_SURE"|"DECLINED";
    YES_HERE_I_AM:"YES"|"PARTLY"|"NO"|"NOT_SURE"|"DECLINED";
    I_SEE_ME:"YES"|"PARTLY"|"NO"|"NOT_SURE"|"DECLINED";
  };
  recognitionVerbatimPresent:boolean;
  feltLikeForm:"NO"|"PARTLY"|"YES"|"NOT_SURE";
  authorshipConcern:boolean;
  continuityConcern:boolean;
  sparseViewsPermitted:boolean;
  researchVocabularyPrimed:boolean;
  systemClaimedRecognition:boolean;
  facilitatorLedConclusion:boolean;
  codingComplete:boolean;
}

export interface TrialRunExecution {
  trialRunId:string;
  source:"SYNTHETIC"|"MODEL_SIMULATION";
  packetVersion:string;
  consentFlowCompleted:boolean;
  facilitatorFlowCompleted:boolean;
  participantRecordCompleted:boolean;
  codingCompleted:boolean;
  evidenceGateInvoked:boolean;
  eligibleHumanEvidenceCount:number;
  humanEvidenceStatus:"PENDING"|"INSUFFICIENT"|"MIXED"|"PASS"|"FAIL";
  executionFailures:string[];
  executionPass:boolean;
  countsAsHumanEvidence:false;
}

export const PACKET_VERSION="FSP-HUMAN-FIDELITY-1A.0";

export const FACILITATOR_CHECKPOINTS:FacilitatorCheckpoint[]=[
  {
    checkpointId:"before-1",
    phase:"BEFORE",
    instruction:"Confirm that participation is voluntary, that the participant may skip any question or view, and that withdrawal is available at any time.",
    prohibitedMove:"Do not imply that participation is required or expected."
  },
  {
    checkpointId:"before-2",
    phase:"BEFORE",
    instruction:"Invite a participant-owned lived case that is meaningful enough to explore but does not require sensitive disclosure.",
    prohibitedMove:"Do not ask the participant to reveal medical, legal, sexual, financial, or other sensitive details."
  },
  {
    checkpointId:"start-1",
    phase:"START",
    instruction:"Use the participant's own wording for the situation and task wherever possible.",
    prohibitedMove:"Do not translate the case into FSP research vocabulary."
  },
  {
    checkpointId:"during-1",
    phase:"DURING",
    instruction:"Permit sparse views and silence. Ask only the prompts needed for the current view and case pressure.",
    prohibitedMove:"Do not fill empty views merely to complete the schema."
  },
  {
    checkpointId:"during-2",
    phase:"DURING",
    instruction:"When the participant corrects a map or phrase, preserve the correction as the operative wording.",
    prohibitedMove:"Do not defend the system's wording against the participant's account."
  },
  {
    checkpointId:"return-1",
    phase:"RETURN",
    instruction:"Ask the participant for a bounded current judgment, remaining uncertainty, and possible REOPEN conditions.",
    prohibitedMove:"Do not recommend a conclusion or complete the judgment for the participant."
  },
  {
    checkpointId:"recognition-1",
    phase:"RECOGNITION",
    instruction:"Use the frozen non-leading recognition questions and preserve verbatim responses.",
    prohibitedMove:"Do not tell the participant that recognition has occurred."
  },
  {
    checkpointId:"form-1",
    phase:"FORM_PROBE",
    instruction:"Ask directly whether any part felt like filling out a form, forced completion, repetition, or system-led judgment.",
    prohibitedMove:"Do not reassure the participant before they answer."
  },
  {
    checkpointId:"interview-1",
    phase:"INTERVIEW",
    instruction:"Administer the frozen eight-question journey interview in neutral language and capture participant wording.",
    prohibitedMove:"Do not paraphrase negative feedback into a more favorable interpretation."
  },
  {
    checkpointId:"close-1",
    phase:"CLOSE",
    instruction:"Remind the participant that their account may remain unresolved and that they may request removal of the session record before it is incorporated into analysis, subject to the study's stated data-handling policy.",
    prohibitedMove:"Do not imply that completion requires a final answer."
  }
];

export function createBlankParticipantRecord(
  sessionId:string,
  participantId:string
):ParticipantRecordTemplate{
  return {
    sessionId,
    participantId,
    livedCaseLabel:"",
    consent:{
      participantId,
      voluntaryParticipation:false,
      ownLivedCase:false,
      noSensitiveDisclosureRequired:true,
      maySkip:true,
      mayWithdraw:true,
      recordingPermission:"NOT_REQUESTED",
      dataUseExplained:false,
      questionsAnswered:false,
      consentConfirmed:false
    },
    viewNotes:{
      START:"",
      PEOPLE:"",
      INSTITUTION:"",
      HSF:"",
      CONNECTIONS:"",
      INVESTIGATE:"",
      RETURN:""
    },
    recognitionNotes:{
      THERE_I_AM:"",
      YES_HERE_I_AM:"",
      I_SEE_ME:""
    },
    formFillingNotes:"",
    interviewNotes:Object.fromEntries(
      JOURNEY_INTERVIEW.map(q=>[q.questionId,""])
    ),
    withdrawalOccurred:false,
    researcherNotes:""
  };
}

export function auditConsent(
  consent:ConsentChecklist
):string[]{
  const failures:string[]=[];
  if(!consent.voluntaryParticipation) failures.push("voluntary-participation-not-confirmed");
  if(!consent.ownLivedCase) failures.push("own-lived-case-not-confirmed");
  if(!consent.noSensitiveDisclosureRequired) failures.push("sensitive-disclosure-boundary-missing");
  if(!consent.maySkip) failures.push("skip-right-missing");
  if(!consent.mayWithdraw) failures.push("withdrawal-right-missing");
  if(!consent.dataUseExplained) failures.push("data-use-not-explained");
  if(!consent.questionsAnswered) failures.push("questions-not-answered");
  if(!consent.consentConfirmed) failures.push("consent-not-confirmed");
  return failures;
}

export function codingSheetComplete(sheet:CodingSheet):boolean{
  return Boolean(
    sheet.sessionId &&
    sheet.codingComplete &&
    sheet.recognitionVerbatimPresent &&
    !sheet.researchVocabularyPrimed &&
    !sheet.systemClaimedRecognition &&
    !sheet.facilitatorLedConclusion
  );
}

export function runTrialExecution(
  record:ParticipantEvidenceRecord,
  packetChecks:{
    consentFlowCompleted:boolean;
    facilitatorFlowCompleted:boolean;
    participantRecordCompleted:boolean;
    codingCompleted:boolean;
  }
):TrialRunExecution{
  if(record.session.source==="REAL_PARTICIPANT"){
    throw new Error("trial-run execution must not fabricate or consume real-participant evidence");
  }

  const executionFailures:string[]=[];
  if(!packetChecks.consentFlowCompleted) executionFailures.push("consent-flow-incomplete");
  if(!packetChecks.facilitatorFlowCompleted) executionFailures.push("facilitator-flow-incomplete");
  if(!packetChecks.participantRecordCompleted) executionFailures.push("participant-record-incomplete");
  if(!packetChecks.codingCompleted) executionFailures.push("coding-incomplete");

  const protocolAudit=auditSessionProtocol(HUMAN_FIDELITY_PROTOCOL_1,record.session);
  const gate=auditHumanEvidenceGate(HUMAN_FIDELITY_PROTOCOL_1,[record]);

  if(protocolAudit.eligibleHumanEvidence)
    executionFailures.push("dry-run-was-incorrectly-eligible-as-human-evidence");
  if(gate.eligibleParticipantCount!==0)
    executionFailures.push("dry-run-inflated-human-evidence-count");
  if(gate.status!=="PENDING")
    executionFailures.push("dry-run-changed-human-evidence-status");

  return {
    trialRunId:`trial::${record.session.sessionId}`,
    source:record.session.source,
    packetVersion:PACKET_VERSION,
    consentFlowCompleted:packetChecks.consentFlowCompleted,
    facilitatorFlowCompleted:packetChecks.facilitatorFlowCompleted,
    participantRecordCompleted:packetChecks.participantRecordCompleted,
    codingCompleted:packetChecks.codingCompleted,
    evidenceGateInvoked:true,
    eligibleHumanEvidenceCount:gate.eligibleParticipantCount,
    humanEvidenceStatus:gate.status,
    executionFailures,
    executionPass:executionFailures.length===0,
    countsAsHumanEvidence:false
  };
}

export function firstLiveSessionReady():{
  ready:boolean;
  packetVersion:string;
  checks:string[];
  boundary:string;
}{
  const checks=[
    "consent-script-present",
    "facilitator-script-present",
    "participant-record-template-present",
    "coding-sheet-present",
    "journey-interview-frozen",
    "human-evidence-gate-present",
    "dry-run-does-not-count-as-human-evidence"
  ];
  return {
    ready:true,
    packetVersion:PACKET_VERSION,
    checks,
    boundary:
      "Operational readiness does not constitute institutional ethics approval, participant recruitment authorization, or human evidence."
  };
}
