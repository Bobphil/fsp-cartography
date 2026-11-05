import {
  HUMAN_FIDELITY_PROTOCOL_1,
  ParticipantEvidenceRecord
} from "./humanFidelity1";

function baseRecord(
  id:string,
  source:"REAL_PARTICIPANT"|"SYNTHETIC"|"MODEL_SIMULATION"
):ParticipantEvidenceRecord{
  return {
    session:{
      sessionId:id,
      participantId:`participant-${id}`,
      source,
      consentConfirmed:true,
      ownLivedCase:true,
      completedJourney:true,
      withdrew:false,
      recognitionElicited:true,
      formProbeCompleted:true,
      interviewCompleted:true,
      researchVocabularyPrimed:false,
      systemClaimedRecognition:false,
      facilitatorLedConclusion:false
    },
    recognition:[
      {
        sessionId:id,
        kind:"THERE_I_AM",
        response:"YES",
        verbatim:"A part of the map matched how I was actually seeing the situation.",
        spontaneous:false,
        prompted:true
      },
      {
        sessionId:id,
        kind:"YES_HERE_I_AM",
        response:"YES",
        verbatim:"The larger map helped me locate where I was in relation to the problem.",
        spontaneous:false,
        prompted:true
      },
      {
        sessionId:id,
        kind:"I_SEE_ME",
        response:"YES",
        verbatim:"I could see how my own thinking shifted over the journey.",
        spontaneous:false,
        prompted:true
      }
    ],
    formFilling:{
      sessionId:id,
      feltLikeForm:"NO",
      feltForcedToComplete:false,
      repeatedSelfUnnecessarily:false,
      promptsFitSituation:"YES",
      couldLeaveViewsSparse:true,
      systemSeemedToDecideForMe:false,
      verbatim:"It felt like working through the situation rather than filling boxes."
    },
    interview:{
      sessionId:id,
      ownWordsPreserved:"YES",
      mapStillFeltLikeSameSituation:"YES",
      returnFeltAuthoredByMe:"YES",
      usefulDistinction:"Separating what was said from what I inferred.",
      distortionOrMismatch:"",
      missingContext:"",
      whatWouldImprove:""
    }
  };
}

export const syntheticExcellentRecords:ParticipantEvidenceRecord[]=[
  baseRecord("synthetic-1","SYNTHETIC"),
  baseRecord("synthetic-2","SYNTHETIC"),
  baseRecord("synthetic-3","SYNTHETIC"),
  baseRecord("synthetic-4","SYNTHETIC"),
  baseRecord("synthetic-5","SYNTHETIC")
];

export const modelExcellentRecords:ParticipantEvidenceRecord[]=[
  baseRecord("model-1","MODEL_SIMULATION"),
  baseRecord("model-2","MODEL_SIMULATION"),
  baseRecord("model-3","MODEL_SIMULATION"),
  baseRecord("model-4","MODEL_SIMULATION"),
  baseRecord("model-5","MODEL_SIMULATION")
];

export const insufficientRealRecords:ParticipantEvidenceRecord[]=[
  baseRecord("real-1","REAL_PARTICIPANT"),
  baseRecord("real-2","REAL_PARTICIPANT")
];

export const passingRealRecords:ParticipantEvidenceRecord[]=[
  baseRecord("real-pass-1","REAL_PARTICIPANT"),
  baseRecord("real-pass-2","REAL_PARTICIPANT"),
  baseRecord("real-pass-3","REAL_PARTICIPANT"),
  baseRecord("real-pass-4","REAL_PARTICIPANT"),
  baseRecord("real-pass-5","REAL_PARTICIPANT")
];

export const mixedRealRecords:ParticipantEvidenceRecord[]=[
  ...passingRealRecords.slice(0,4).map(x=>structuredClone(x)),
  (() => {
    const r=baseRecord("real-mixed-5","REAL_PARTICIPANT");
    r.recognition[2].response="NO";
    r.recognition[2].verbatim="I did not see any change in my own thinking.";
    r.formFilling.feltLikeForm="PARTLY";
    r.formFilling.verbatim="Some parts felt like a form.";
    return r;
  })()
];

export const failingRealRecords:ParticipantEvidenceRecord[]=[
  ...passingRealRecords.slice(0,2).map((x,i)=>{
    const r=structuredClone(x);
    r.session.sessionId=`real-fail-good-${i+1}`;
    r.session.participantId=`participant-real-fail-good-${i+1}`;
    r.recognition.forEach(y=>y.sessionId=r.session.sessionId);
    r.formFilling.sessionId=r.session.sessionId;
    r.interview.sessionId=r.session.sessionId;
    return r;
  }),
  ...[1,2,3].map(i=>{
    const r=baseRecord(`real-fail-${i}`,"REAL_PARTICIPANT");
    r.recognition[0].response="NO";
    r.recognition[0].verbatim="The map did not feel like my situation.";
    r.formFilling.feltLikeForm="YES";
    r.formFilling.feltForcedToComplete=true;
    r.formFilling.systemSeemedToDecideForMe=true;
    r.formFilling.verbatim="It felt like the system wanted me to complete and accept its structure.";
    r.interview.mapStillFeltLikeSameSituation="NO";
    r.interview.returnFeltAuthoredByMe="NO";
    r.interview.distortionOrMismatch="The categories took over the situation.";
    return r;
  })
];

export const ineligibleRealRecord:ParticipantEvidenceRecord=(()=>{
  const r=baseRecord("real-ineligible","REAL_PARTICIPANT");
  r.session.researchVocabularyPrimed=true;
  r.session.systemClaimedRecognition=true;
  return r;
})();

export const protocol=HUMAN_FIDELITY_PROTOCOL_1;
