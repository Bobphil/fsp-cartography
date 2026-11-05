import { PRFProfile, TranslationAttempt } from "./translation";
import { TaskRelevantStructure } from "./translation2";
import { DomainCase } from "./translation5";

export const HISTORY_TASK="Construct a bounded public interpretation of Galileo's 1633 trial that distinguishes evidence, institutional context, causal explanation, and present-day significance";

export const historyPrfs:PRFProfile[]=[
  {
    id:"A",
    label:"Archival-historical framework",
    values:["source provenance","chronology","context","claim restraint"],
    salientEntities:["trial records","letters","decrees","patronage","institutions"],
    claims:[{
      id:"A1",
      proposition:"A defensible interpretation should track surviving sources and remain explicit about archival gaps.",
      evidence:["trial transcript","letters","published works","institutional records"],
      warrants:["historical claims should be proportionate to source provenance and context"],
      backgroundCommitments:["archives are incomplete and historically situated"],
      task:HISTORY_TASK,
      claimCeiling:"supports a bounded reconstruction; does not recover Galileo's complete inner experience",
      ontologyCommitments:["historical events","documents","institutional relations"],
      standing:["historian","source analyst"]
    }]
  },
  {
    id:"S",
    label:"History-of-science framework",
    values:["theory change","evidence","method","scientific practice"],
    salientEntities:["astronomical models","observations","instruments","argument","disciplinary norms"],
    claims:[{
      id:"S1",
      proposition:"The trial should be interpreted partly through changing standards of astronomical evidence and scientific practice.",
      evidence:["observational claims","telescopic reports","astronomical models","published argument"],
      warrants:["scientific controversy is partly structured by evidential and methodological change"],
      backgroundCommitments:["scientific knowledge develops through historically situated practices"],
      task:HISTORY_TASK,
      claimCeiling:"supports a science-practice interpretation; does not reduce the trial to a simple science-versus-religion story",
      ontologyCommitments:["scientific practices","models","observations"],
      standing:["historian of science"]
    }]
  },
  {
    id:"I",
    label:"Institutional-political framework",
    values:["authority","jurisdiction","institutional stability","power"],
    salientEntities:["Church authority","patronage","legal process","obedience","political context"],
    claims:[{
      id:"I1",
      proposition:"The trial cannot be understood without institutional authority, jurisdiction, and political constraint.",
      evidence:["decrees","legal procedure","patronage relations","institutional correspondence"],
      warrants:["institutional power changes which actions and arguments are available"],
      backgroundCommitments:["formal authority and practical power are historically consequential"],
      task:HISTORY_TASK,
      claimCeiling:"supports an institutional explanation; does not prove that power alone explains the intellectual dispute",
      ontologyCommitments:["institutions","authority relations","political constraints"],
      standing:["institutional historian"]
    }]
  },
  {
    id:"P",
    label:"Public-memory framework",
    values:["civic meaning","accessibility","symbolic significance","present relevance"],
    salientEntities:["public narrative","symbol","education","memory","modern identity"],
    claims:[{
      id:"P1",
      proposition:"Galileo's trial has present public meaning, but symbolic use should not erase historical complexity.",
      evidence:["textbook narratives","museum interpretation","public commemoration","popular retellings"],
      warrants:["public memory can reshape the significance of past events"],
      backgroundCommitments:["later reception is historically real but distinct from original context"],
      task:HISTORY_TASK,
      claimCeiling:"supports analysis of present significance; does not authorize projecting modern categories uncritically backward",
      ontologyCommitments:["public memory","symbolic meaning","civic narrative"],
      standing:["public historian","educator"]
    }]
  }
];

const pair=(
  sourcePrfId:string,targetPrfId:string,
  relation:"DIRECT"|"STRUCTURAL"|"TASK_EQUIVALENT",
  preserved:string[],remainder:string[]
):TranslationAttempt=>({
  sourcePrfId,targetPrfId,task:HISTORY_TASK,
  correspondences:preserved.map(item=>({sourceElement:item,targetElement:item,relation})),
  preserved,remainder,distortions:[]
});

export const historyTranslationAttempts:TranslationAttempt[]=[
  pair("A","S","STRUCTURAL",["source chronology","published argument"],["archival gaps","private motive"]),
  pair("A","I","STRUCTURAL",["legal record","institutional correspondence"],["full institutional motive"]),
  pair("A","P","TASK_EQUIVALENT",["documented complexity"],["public symbolic simplification"]),
  pair("S","A","STRUCTURAL",["observational claims","scientific publications"],["disciplinary reconstruction"]),
  pair("S","I","STRUCTURAL",["scientific controversy affects institutional response"],["institutional legitimacy"]),
  pair("S","P","TASK_EQUIVALENT",["science controversy remains publicly salient"],["technical model nuance"]),
  pair("I","A","STRUCTURAL",["decrees","legal procedure"],["power relations not explicit in every source"]),
  pair("I","S","STRUCTURAL",["authority constrains scientific action"],["scientific content"]),
  pair("I","P","TASK_EQUIVALENT",["authority conflict shapes public memory"],["institutional complexity"]),
  pair("P","A","TASK_EQUIVALENT",["later reception can be sourced"],["symbolic meaning is not original context"]),
  pair("P","S","TASK_EQUIVALENT",["science/religion narrative is historically consequential"],["scientific nuance"]),
  pair("P","I","STRUCTURAL",["public memory of authority conflict"],["later symbolism differs from original jurisdiction"])
];

const sharedEmpirical=[
  "the 1633 trial involved documented legal and institutional procedures",
  "Galileo's astronomical claims were embedded in an active scientific controversy"
];
const sharedConstraints=[
  "interpretation must distinguish surviving evidence from retrospective inference",
  "present symbolic meaning must not be treated as identical with seventeenth-century context"
];
const sharedConsequences=[
  "oversimplified narratives can distort both scientific and institutional history",
  "explicit provenance improves public interpretive accountability"
];
const sharedActions=[
  "publish a provenance-bounded interpretation",
  "mark contested causal claims",
  "separate original context from later public memory"
];

export const historyTaskStructures:TaskRelevantStructure[]=[
  {prfId:"A",task:HISTORY_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["historical events","documents","institutional relations"]},
  {prfId:"S",task:HISTORY_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["scientific practices","models","observations"]},
  {prfId:"I",task:HISTORY_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["institutions","authority relations","political constraints"]},
  {prfId:"P",task:HISTORY_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["public memory","symbolic meaning","civic narrative"]}
];

export const historyDomain:DomainCase={
  id:"galileo-history",
  label:"Galileo trial historical interpretation",
  nativeTopology:[
    "incomplete archives",
    "retrospective interpretation",
    "scientific controversy",
    "institutional authority",
    "causal explanation",
    "public memory"
  ],
  prfs:historyPrfs,
  translationAttempts:historyTranslationAttempts,
  taskStructures:historyTaskStructures,
  requiredPrimitives:[
    "TASK","EVIDENCE","WARRANT","BACKGROUND","CLAIM_CEILING",
    "ONTOLOGY","STANDING","REMAINDER","AUXILIARY","AGENCY"
  ]
};
