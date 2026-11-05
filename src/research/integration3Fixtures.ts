import {
  FormFillingSignals,
  LivedDoingJourney,
  RecognitionRecord
} from "./integration3";
import { buildCompressionPlan } from "./integration2";

export const mayaJourney:LivedDoingJourney={
  journeyId:"maya-lived",
  taskLanguage:"Which healthcare paths should I investigate before making a larger educational commitment?",
  anchors:[
    {
      anchorId:"maya-debt",
      userLanguage:"I don't want to end up with huge debt.",
      introducedIn:"PEOPLE",
      carriedThrough:["PEOPLE","INSTITUTION","INVESTIGATE","RETURN"],
      changedByUser:false
    },
    {
      anchorId:"maya-direction",
      userLanguage:"Healthcare remains a serious direction.",
      introducedIn:"INVESTIGATE",
      carriedThrough:["INVESTIGATE","RETURN"],
      changedByUser:false
    }
  ],
  moments:[
    {
      view:"START",
      orientation:"Bound the inquiry without choosing a career.",
      userLanguageRetained:["Which healthcare paths should I investigate before making a larger educational commitment?"],
      newDistinctions:["investigation is not commitment"],
      unansweredQuestions:["Which healthcare roles are worth direct exposure?"],
      nextMove:"Map people who matter.",
      compression:buildCompressionPlan("START",[])
    },
    {
      view:"PEOPLE",
      orientation:"Separate report from inference.",
      userLanguageRetained:["I don't want to end up with huge debt."],
      newDistinctions:["mother's report vs Maya's inference"],
      unansweredQuestions:["How much of the concern is debt, time, or profession-specific?"],
      nextMove:"Check institutional and financial constraints.",
      compression:buildCompressionPlan("PEOPLE",[])
    },
    {
      view:"INSTITUTION",
      orientation:"Separate verified constraints from assumptions.",
      userLanguageRetained:["I don't want to end up with huge debt."],
      newDistinctions:["financial concern vs verified financial impossibility"],
      unansweredQuestions:["What are actual training costs and financing options?"],
      nextMove:"Locate historical/current/future relevance.",
      compression:buildCompressionPlan("INSTITUTION",["EVIDENCE_CONFLICT"])
    },
    {
      view:"HSF",
      orientation:"Place concerns across inherited/current/future relevance.",
      userLanguageRetained:["Which healthcare paths should I investigate before making a larger educational commitment?"],
      newDistinctions:["current concern can shape future inquiry without predicting outcome"],
      unansweredQuestions:["Which concerns remain important after direct occupational exposure?"],
      nextMove:"Inspect relations and shared task.",
      compression:buildCompressionPlan("HSF",[])
    },
    {
      view:"CONNECTIONS",
      orientation:"Clarify influence and shared task.",
      userLanguageRetained:["I don't want to end up with huge debt."],
      newDistinctions:["family concern can affect inquiry without settling career choice"],
      unansweredQuestions:["Can Maya and her mother share the task of clarifying costs without agreeing on profession?"],
      nextMove:"Compare live paths.",
      compression:buildCompressionPlan("CONNECTIONS",["PERSISTENT_DISAGREEMENT"])
    },
    {
      view:"INVESTIGATE",
      orientation:"Keep paths live and information-generating.",
      userLanguageRetained:["Healthcare remains a serious direction."],
      newDistinctions:["next inquiry move vs final recommendation"],
      unansweredQuestions:["Which healthcare roles are worth direct exposure?","What are actual training costs and financing options?"],
      nextMove:"Meet adviser and shadow professionals.",
      compression:buildCompressionPlan("INVESTIGATE",["MULTIPLE_LIVE_PATHS","EVIDENCE_CONFLICT"])
    },
    {
      view:"RETURN",
      orientation:"Return to bounded current judgment.",
      userLanguageRetained:["Healthcare remains a serious direction.","I don't want to end up with huge debt."],
      newDistinctions:["serious direction does not equal final profession"],
      unansweredQuestions:["Which healthcare roles are worth direct exposure?","What are actual training costs and financing options?"],
      nextMove:"Reopen after direct experience and verified financial information.",
      compression:buildCompressionPlan("RETURN",[])
    }
  ],
  returnLanguage:"Healthcare remains a serious direction. I don't want to end up with huge debt. I am choosing what to investigate next, not a final career."
};

export const leilaJourney:LivedDoingJourney={
  journeyId:"leila-lived",
  taskLanguage:"What educational paths remain open if I pursue art/design?",
  anchors:[
    {
      anchorId:"leila-funding",
      userLanguage:"I will stop paying tuition if you leave nursing.",
      introducedIn:"PEOPLE",
      carriedThrough:["PEOPLE","INSTITUTION","CONNECTIONS","INVESTIGATE","RETURN"],
      changedByUser:false
    },
    {
      anchorId:"leila-authority",
      userLanguage:"The funding condition constrains the route but does not settle my career.",
      introducedIn:"CONNECTIONS",
      carriedThrough:["CONNECTIONS","INVESTIGATE","RETURN"],
      changedByUser:false
    }
  ],
  moments:[
    {
      view:"START",orientation:"Bound the educational question.",userLanguageRetained:["What educational paths remain open if I pursue art/design?"],newDistinctions:["path inquiry vs career authorization"],unansweredQuestions:["What routes remain financially viable?"],nextMove:"Map people.",compression:buildCompressionPlan("START",[])
    },
    {
      view:"PEOPLE",orientation:"Keep direct report separate from inferred motive.",userLanguageRetained:["I will stop paying tuition if you leave nursing."],newDistinctions:["reported funding condition vs interpretation of intent"],unansweredQuestions:["What exactly will stop and under what conditions?"],nextMove:"Verify institutional/funding constraints.",compression:buildCompressionPlan("PEOPLE",[])
    },
    {
      view:"INSTITUTION",orientation:"Scope the constraint.",userLanguageRetained:["I will stop paying tuition if you leave nursing."],newDistinctions:["current funding source only"],unansweredQuestions:["What alternative financing exists?"],nextMove:"Locate temporal relevance.",compression:buildCompressionPlan("INSTITUTION",[])
    },
    {
      view:"HSF",orientation:"Separate current constraint from future possibility.",userLanguageRetained:["What educational paths remain open if I pursue art/design?"],newDistinctions:["hard currently does not mean impossible permanently"],unansweredQuestions:["How long does the funding constraint matter?"],nextMove:"Inspect power and authority.",compression:buildCompressionPlan("HSF",[])
    },
    {
      view:"CONNECTIONS",orientation:"Distinguish practical power from decision authority.",userLanguageRetained:["The funding condition constrains the route but does not settle my career.","I will stop paying tuition if you leave nursing."],newDistinctions:["financial leverage is not automatically moral authority"],unansweredQuestions:["Is there any shared task with father?"],nextMove:"Investigate alternatives.",compression:buildCompressionPlan("CONNECTIONS",["POWER_AUTHORITY_TENSION"])
    },
    {
      view:"INVESTIGATE",orientation:"Generate information without recommendation.",userLanguageRetained:["The funding condition constrains the route but does not settle my career."],newDistinctions:["alternative financing as inquiry path"],unansweredQuestions:["What alternative financing exists?"],nextMove:"Check part-time and financing routes.",compression:buildCompressionPlan("INVESTIGATE",["MULTIPLE_LIVE_PATHS"])
    },
    {
      view:"RETURN",orientation:"Return authorship to Leila.",userLanguageRetained:["The funding condition constrains the route but does not settle my career."],newDistinctions:["constraint acknowledged without surrendering authorship"],unansweredQuestions:["What alternative financing exists?"],nextMove:"Reopen after verified financing information.",compression:buildCompressionPlan("RETURN",[])
    }
  ],
  returnLanguage:"The funding condition constrains the route but does not settle my career. What alternative financing exists?"
};

export const jordanJourney:LivedDoingJourney={
  journeyId:"jordan-lived",
  taskLanguage:"education/work",
  anchors:[
    {
      anchorId:"jordan-open",
      userLanguage:"I still do not know what career I want.",
      introducedIn:"START",
      carriedThrough:["START","INVESTIGATE","RETURN"],
      changedByUser:false
    }
  ],
  moments:[
    {
      view:"START",orientation:"Permit an unformed task.",userLanguageRetained:["education/work","I still do not know what career I want."],newDistinctions:["orientation can precede a formed task"],unansweredQuestions:["What should I explore next?"],nextMove:"Notice who influences the orientation.",compression:buildCompressionPlan("START",[])
    },
    {
      view:"PEOPLE",orientation:"Record a brother's report without turning it into advice.",userLanguageRetained:["education/work"],newDistinctions:["another person's experience is not a recommendation"],unansweredQuestions:["What experiences of my own would help?"],nextMove:"Leave empty institutional structure empty if none is salient.",compression:buildCompressionPlan("PEOPLE",[])
    },
    {
      view:"INSTITUTION",orientation:"Permit a sparse view.",userLanguageRetained:["education/work"],newDistinctions:["no fabricated institution required"],unansweredQuestions:[],nextMove:"Keep temporal relevance light.",compression:buildCompressionPlan("INSTITUTION",[])
    },
    {
      view:"HSF",orientation:"Notice past influence without overbuilding history.",userLanguageRetained:["education/work"],newDistinctions:["brother's past experience is context, not destiny"],unansweredQuestions:[],nextMove:"Connections may remain sparse.",compression:buildCompressionPlan("HSF",[])
    },
    {
      view:"CONNECTIONS",orientation:"Permit no shared task or typed relation if not useful.",userLanguageRetained:["education/work"],newDistinctions:["absence of structure can remain explicit"],unansweredQuestions:[],nextMove:"Move toward inquiry actions.",compression:buildCompressionPlan("CONNECTIONS",[])
    },
    {
      view:"INVESTIGATE",orientation:"Turn uncertainty into next inquiry moves.",userLanguageRetained:["I still do not know what career I want."],newDistinctions:["not knowing a career can coexist with knowing what to explore next"],unansweredQuestions:["What should I explore next?"],nextMove:"Visit technical program and career services.",compression:buildCompressionPlan("INVESTIGATE",[])
    },
    {
      view:"RETURN",orientation:"Return without manufacturing a conclusion.",userLanguageRetained:["I still do not know what career I want."],newDistinctions:["next inquiry move is enough"],unansweredQuestions:["What should I explore next?"],nextMove:"Continue orientation after direct exposure.",compression:buildCompressionPlan("RETURN",[])
    }
  ],
  returnLanguage:"I still do not know what career I want. What should I explore next?"
};

export const recognitionRecords:RecognitionRecord[]=[
  {
    recognitionId:"rec-there",
    kind:"THERE_I_AM",
    source:"USER_REPORTED",
    view:"PEOPLE",
    userText:"Yes, that separates what was actually said from what I was adding.",
    relatedAnchorIds:["maya-debt"]
  },
  {
    recognitionId:"rec-here",
    kind:"YES_HERE_I_AM",
    source:"USER_REPORTED",
    view:"CONNECTIONS",
    userText:"Yes, this shows where I am in relation to the people and constraints.",
    relatedAnchorIds:["leila-funding","leila-authority"]
  },
  {
    recognitionId:"rec-see",
    kind:"I_SEE_ME",
    source:"USER_REPORTED",
    view:"RETURN",
    userText:"I can see how my thinking changed without the map deciding for me.",
    relatedAnchorIds:["maya-direction","jordan-open"]
  }
];

export const architectureOnlyRecognitionRecords:RecognitionRecord[]=[
  {
    recognitionId:"rec-none-1",
    kind:"THERE_I_AM",
    source:"NOT_REPORTED",
    view:"PEOPLE",
    relatedAnchorIds:["maya-debt"]
  },
  {
    recognitionId:"rec-none-2",
    kind:"YES_HERE_I_AM",
    source:"NOT_REPORTED",
    view:"CONNECTIONS",
    relatedAnchorIds:["leila-authority"]
  },
  {
    recognitionId:"rec-none-3",
    kind:"I_SEE_ME",
    source:"NOT_REPORTED",
    view:"RETURN",
    relatedAnchorIds:["jordan-open"]
  }
];

export const lowFormRisk:FormFillingSignals={
  mandatoryFieldCount:2,
  repeatedEntryCount:0,
  genericPromptCount:3,
  promptsDetachedFromCurrentLanguage:0,
  forcedViewCompletion:false,
  emptyStateFabrication:false,
  systemAuthoredJudgment:false,
  recommendationPressure:false,
  userCanSkip:true,
  userCanReturnBackward:true,
  userLanguageReused:true
};

export const highFormRisk:FormFillingSignals={
  mandatoryFieldCount:9,
  repeatedEntryCount:3,
  genericPromptCount:12,
  promptsDetachedFromCurrentLanguage:5,
  forcedViewCompletion:true,
  emptyStateFabrication:true,
  systemAuthoredJudgment:true,
  recommendationPressure:true,
  userCanSkip:false,
  userCanReturnBackward:false,
  userLanguageReused:false
};
