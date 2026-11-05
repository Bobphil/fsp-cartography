import { PRFProfile, TranslationAttempt } from "./translation";
import { TaskRelevantStructure } from "./translation2";
import { DomainCase, PrimitiveAblationScenario } from "./translation5";

export const PAIN_TASK="Develop a tolerable, revisable care plan for persistent pain without erasing first-person experience, clinical evidence, access constraints, or cultural meaning";

export const painPrfs:PRFProfile[]=[
  {
    id:"P",
    label:"Patient lived-experience framework",
    values:["pain relief","function","being believed","control over treatment"],
    salientEntities:["pain episodes","sleep","mobility","fear","daily function"],
    claims:[{
      id:"P1",
      proposition:"The pain is real and disabling even when some measurements are inconclusive.",
      evidence:["first-person pain reports","sleep disruption","activity limitation","treatment history"],
      warrants:["persistent lived impairment is clinically and practically relevant evidence"],
      backgroundCommitments:["first-person experience has standing in care"],
      task:PAIN_TASK,
      claimCeiling:"supports the reality and significance of lived impairment; does not by itself establish a unique mechanism",
      ontologyCommitments:["lived embodied experience","functional impairment"],
      standing:["patient","primary experiencer"]
    }]
  },
  {
    id:"C",
    label:"Clinical biomedical framework",
    values:["diagnostic accuracy","benefit-risk balance","reversibility","evidence quality"],
    salientEntities:["symptoms","nociception","imaging","medication effects","functional findings"],
    claims:[{
      id:"C1",
      proposition:"Care should track plausible mechanisms, measurable function, and treatment benefit-risk.",
      evidence:["clinical exam","imaging","medication response","functional assessment"],
      warrants:["clinical interventions require evidence proportionate to risk"],
      backgroundCommitments:["biological mechanisms and functional outcomes are clinically investigable"],
      task:PAIN_TASK,
      claimCeiling:"supports bounded clinical recommendations; does not exhaust the patient's lived meaning",
      ontologyCommitments:["biological mechanisms","clinical function"],
      standing:["clinician","licensed medical expertise"]
    }]
  },
  {
    id:"I",
    label:"Insurance and utilization framework",
    values:["coverage consistency","documented necessity","cost control","rule predictability"],
    salientEntities:["covered service","authorization criteria","documentation","utilization","cost"],
    claims:[{
      id:"I1",
      proposition:"Coverage decisions should follow explicit necessity and authorization criteria.",
      evidence:["coverage policy","billing codes","documented prior treatment","utilization criteria"],
      warrants:["pooled resources require contestable and consistent allocation rules"],
      backgroundCommitments:["coverage is institutionally rule-governed"],
      task:PAIN_TASK,
      claimCeiling:"supports a coverage determination; does not settle what the patient's pain is or what care is morally ideal",
      ontologyCommitments:["institutional eligibility","resource allocation"],
      standing:["payer","coverage decision role"]
    }]
  },
  {
    id:"S",
    label:"Cultural-spiritual meaning framework",
    values:["meaning","family continuity","spiritual integrity","non-reductive care"],
    salientEntities:["suffering","ritual","family meaning","spiritual practice","healing relationship"],
    claims:[{
      id:"S1",
      proposition:"A tolerable care plan must not treat suffering as only a biomedical variable.",
      evidence:["patient testimony","family practice","religious or cultural commitments","care experience"],
      warrants:["meaning and spiritual integrity can affect whether care is acceptable and livable"],
      backgroundCommitments:["suffering can have dimensions not exhausted by biomedical description"],
      task:PAIN_TASK,
      claimCeiling:"supports inclusion of cultural-spiritual meaning in care; does not establish that others share its metaphysics",
      ontologyCommitments:["spiritual meaning","relational suffering","ritual significance"],
      standing:["patient-designated cultural or spiritual adviser"]
    }]
  }
];

const pair=(
  sourcePrfId:string,
  targetPrfId:string,
  relation:"DIRECT"|"STRUCTURAL"|"TASK_EQUIVALENT",
  preserved:string[],
  remainder:string[]
):TranslationAttempt=>({
  sourcePrfId,targetPrfId,task:PAIN_TASK,
  correspondences:preserved.map(item=>({sourceElement:item,targetElement:item,relation})),
  preserved,remainder,distortions:[]
});

export const painTranslationAttempts:TranslationAttempt[]=[
  pair("P","C","STRUCTURAL",["functional impairment","treatment response"],["felt quality of pain","meaning of being believed"]),
  pair("P","I","TASK_EQUIVALENT",["documented functional limitation"],["felt quality","loss of agency","unbilled caregiving burden"]),
  pair("P","S","STRUCTURAL",["suffering matters","acceptable care must be livable"],["clinical mechanism claims"]),
  pair("C","P","STRUCTURAL",["functional assessment","treatment benefit-risk"],["mechanism uncertainty cannot erase lived pain"]),
  pair("C","I","DIRECT",["documented treatment history","functional criteria"],["clinical nuance outside coverage rule"]),
  pair("C","S","STRUCTURAL",["care must be acceptable to patient","treatment burden matters"],["biomedical mechanism"]),
  pair("I","P","TASK_EQUIVALENT",["coverage pathway","document requirements"],["institutional rule is not lived need"]),
  pair("I","C","DIRECT",["authorization criteria","documented prior treatment"],["coverage rule is not clinical judgment"]),
  pair("I","S","TASK_EQUIVALENT",["covered supportive services"],["sacred or cultural meaning"]),
  pair("S","P","STRUCTURAL",["suffering has lived meaning","care must preserve agency"],["specific spiritual ontology"]),
  pair("S","C","STRUCTURAL",["patient acceptability","care burden"],["spiritual causation or meaning"]),
  pair("S","I","TASK_EQUIVALENT",["access to supportive care"],["non-market spiritual value"])
];

const sharedEmpirical=[
  "persistent pain is associated with impaired daily function",
  "treatment effects and burdens vary across individuals"
];
const sharedConstraints=[
  "high-burden interventions should remain revisable",
  "the patient must retain meaningful participation"
];
const sharedConsequences=[
  "an intolerable plan may reduce adherence and function",
  "delayed access can prolong impairment"
];
const sharedActions=[
  "use a staged revisable care plan",
  "document function and treatment response",
  "include patient-defined acceptability"
];

export const painTaskStructures:TaskRelevantStructure[]=[
  {prfId:"P",task:PAIN_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["lived embodied experience","functional impairment"]},
  {prfId:"C",task:PAIN_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["biological mechanisms","clinical function"]},
  {prfId:"I",task:PAIN_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["institutional eligibility","resource allocation"]},
  {prfId:"S",task:PAIN_TASK,empiricalCommitments:sharedEmpirical,practicalConstraints:sharedConstraints,predictedConsequences:sharedConsequences,licensedActions:sharedActions,ontologyCommitments:["spiritual meaning","relational suffering","ritual significance"]}
];

export const painDomain:DomainCase={
  id:"persistent-pain",
  label:"Persistent pain care",
  nativeTopology:[
    "first-person symptom access",
    "clinical mechanism uncertainty",
    "benefit-risk recommendation",
    "coverage authorization",
    "patient consent and acceptability",
    "cultural-spiritual meaning"
  ],
  prfs:painPrfs,
  translationAttempts:painTranslationAttempts,
  taskStructures:painTaskStructures,
  requiredPrimitives:[
    "TASK","EVIDENCE","WARRANT","BACKGROUND","CLAIM_CEILING",
    "ONTOLOGY","STANDING","REMAINDER","AUXILIARY","AGENCY"
  ]
};

export const translation5Ablations:PrimitiveAblationScenario[]=[
  {primitive:"TASK",loses:["task-boundedness"]},
  {primitive:"EVIDENCE",loses:["evidence-provenance"]},
  {primitive:"WARRANT",loses:["licensing"]},
  {primitive:"BACKGROUND",loses:["context-sensitivity"]},
  {primitive:"CLAIM_CEILING",loses:["claim-restraint"]},
  {primitive:"ONTOLOGY",loses:["ontological-pluralism"]},
  {primitive:"STANDING",loses:["standing","anti-domination"]},
  {primitive:"REMAINDER",loses:["loss-tracking","ontological-pluralism"]},
  {primitive:"AUXILIARY",loses:["auxiliary-sensitivity"]},
  {primitive:"AGENCY",loses:["anti-domination"]}
];
