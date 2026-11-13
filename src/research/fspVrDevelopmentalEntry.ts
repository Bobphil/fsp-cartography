export type DevelopmentalStageId=
  |"D0_PEDAGOGICAL_ZERO"
  |"D1_CONTROL"
  |"D2_RESISTANCE"
  |"D3_OTHER_AGENT"
  |"D4_DEPENDENCY"
  |"D5_EXPECTATION"
  |"D6_HELPER_HINDERER"
  |"D7_SIMILARITY_DIFFERENCE"
  |"D8_EVIDENCE_INSPECTION"
  |"D9_PROTO_NORMATIVE"
  |"D10_CULTURAL_FORMATION"
  |"D11_CAPABILITY_GROWTH"
  |"D12_LIFE_LOTTERY_HANDOFF";

export type DevelopmentalEvidenceClass=
  |"BEHAVIORAL_EXPERIMENT"
  |"LOOKING_TIME"
  |"REACHING_CHOICE"
  |"OBSERVATIONAL_STUDY"
  |"CAREGIVER_REPORT"
  |"LONGITUDINAL"
  |"CROSS_CULTURAL_REPLICATION"
  |"MULTI_LAB_REPLICATION"
  |"DEVELOPMENTAL_NEUROSCIENCE";

export interface DevelopmentalEvidence{
  id:string;
  citation:string;
  year:number;
  evidenceClass:DevelopmentalEvidenceClass;
  observation:string;
  interpretation:string;
  alternatives:string[];
  replicationStatus:string;
  claimCeiling:string;
}

export interface DevelopmentalStage{
  id:DevelopmentalStageId;
  label:string;
  learnerExperience:string;
  newlyAvailableDistinctions:string[];
  vocabularyReveal:string[];
  evidenceIds:string[];
  firewalls:string[];
  next:DevelopmentalStageId|null;
}

export const DEVELOPMENTAL_EVIDENCE:DevelopmentalEvidence[]=[
  {
    id:"DEV-S01",
    citation:"Hamlin, Wynn & Bloom (2007), Social evaluation by preverbal infants, Nature 450:557–559.",
    year:2007,
    evidenceClass:"REACHING_CHOICE",
    observation:"In the reported hill-climbing paradigm, 6- and 10-month-old infants more often chose the helper than the hinderer.",
    interpretation:"The authors interpreted the choice pattern as evidence of early social evaluation.",
    alternatives:["perceptual or stimulus preferences","procedural features","simpler associative explanations"],
    replicationStatus:"Influential original finding; later direct and coordinated replications have produced mixed results.",
    claimCeiling:"Does not establish adult morality, explicit moral concepts, or stable judgments of good and evil."
  },
  {
    id:"DEV-S02",
    citation:"Lucca et al. (2025), Infants' Social Evaluation of Helpers and Hinderers: A Large-Scale, Multi-Lab, Coordinated Replication Study, Developmental Science 28(1):e13581.",
    year:2025,
    evidenceClass:"MULTI_LAB_REPLICATION",
    observation:"A preregistered coordinated replication across 37 laboratories and more than 1,000 tested infants did not find a reliable helper preference in the classic social hill paradigm among included infants.",
    interpretation:"The classic helper-preference effect may be less robust or more context-sensitive than early reports suggested.",
    alternatives:["paradigm sensitivity","age or procedural heterogeneity","site differences","effect may exist in some paradigms but not others"],
    replicationStatus:"Large-scale multi-lab replication weakens strong claims based on the original hill paradigm.",
    claimCeiling:"Failure to reproduce one paradigm does not prove that infants lack all early social-evaluative sensitivities."
  },
  {
    id:"DEV-S03",
    citation:"Rimol et al. (2026), conceptual replications and meta-analysis of the Hamlin & Wynn box opening/closing paradigm, Child Development.",
    year:2026,
    evidenceClass:"MULTI_LAB_REPLICATION",
    observation:"Across the analyzed box-opening literature, the aggregate helper-choice proportion was modest rather than overwhelming and effects were heterogeneous.",
    interpretation:"Some early social-evaluation effects may be real but smaller, more variable, and more paradigm-dependent than strong proto-morality narratives imply.",
    alternatives:["publication history","regional sampling","stimulus-specific effects","developmental heterogeneity"],
    replicationStatus:"Meta-analytic evidence supports caution and heterogeneity rather than a single settled effect.",
    claimCeiling:"A modest aggregate preference does not identify the infant's underlying representation or establish morality."
  },
  {
    id:"DEV-S04",
    citation:"Mahajan & Wynn (2012), Origins of 'us' versus 'them': prelinguistic infants prefer similar others, Cognition 124(2):227–233.",
    year:2012,
    evidenceClass:"REACHING_CHOICE",
    observation:"Preverbal infants in the reported experiments preferred agents who shared simple preferences with them.",
    interpretation:"Similarity can influence very early social preference.",
    alternatives:["familiarity","stimulus matching","task-specific preference"],
    replicationStatus:"Useful hypothesis-generating evidence; should not be treated as a complete theory of infant group psychology.",
    claimCeiling:"Similarity preference does not establish justified exclusion, stable prejudice, or immutable ingroup bias."
  },
  {
    id:"DEV-S05",
    citation:"Hamlin, Mahajan, Liberman & Wynn (2013), Not like me = bad: infants prefer those who harm dissimilar others, Psychological Science 24(4):589–594.",
    year:2013,
    evidenceClass:"REACHING_CHOICE",
    observation:"In the reported studies, 9- and 14-month-old infants sometimes preferred agents who treated similar others positively and dissimilar others negatively.",
    interpretation:"Early social preferences may interact with perceived similarity and third-party treatment.",
    alternatives:["task framing","preference matching","valence association","limited generalizability"],
    replicationStatus:"Provocative finding requiring cautious interpretation within the broader replication-sensitive literature.",
    claimCeiling:"Does not establish an innate moral endorsement of punishment or a fixed tendency toward hostility."
  }
];

export const DEVELOPMENTAL_STAGES:DevelopmentalStage[]=[
  {id:"D0_PEDAGOGICAL_ZERO",label:"Pedagogical zero",learnerExperience:"A nearly blank field. Something happens.",newlyAvailableDistinctions:["event/not-yet-explained"],vocabularyReveal:[],evidenceIds:[],firewalls:["blank field ≠ metaphysical nothingness"],next:"D1_CONTROL"},
  {id:"D1_CONTROL",label:"Embodied control",learnerExperience:"A controllable element moves reliably with the learner's action.",newlyAvailableDistinctions:["controlled change","action-consequence covariance"],vocabularyReveal:[],evidenceIds:[],firewalls:["control ≠ complete agency theory"],next:"D2_RESISTANCE"},
  {id:"D2_RESISTANCE",label:"Resistance",learnerExperience:"Other elements do not respond to the same command.",newlyAvailableDistinctions:["controlled/uncontrolled","capability/constraint"],vocabularyReveal:["capability","constraint"],evidenceIds:[],firewalls:["failed control ≠ impossibility"],next:"D3_OTHER_AGENT"},
  {id:"D3_OTHER_AGENT",label:"Other agent",learnerExperience:"Another locus moves and responds independently.",newlyAvailableDistinctions:["self/other","my Doing/other Doing"],vocabularyReveal:["agent locus","relation"],evidenceIds:[],firewalls:["other agent ≠ object under my control"],next:"D4_DEPENDENCY"},
  {id:"D4_DEPENDENCY",label:"Dependency",learnerExperience:"A signal sometimes changes whether care or resources arrive.",newlyAvailableDistinctions:["action/influence/control","dependence/response"],vocabularyReveal:["dependency","influence"],evidenceIds:[],firewalls:["influence ≠ control","dependence ≠ inferiority"],next:"D5_EXPECTATION"},
  {id:"D5_EXPECTATION",label:"Expectation and failure",learnerExperience:"A repeated regularity creates expectation; the expected response sometimes fails.",newlyAvailableDistinctions:["regularity/necessity","expectation/revision"],vocabularyReveal:["REOPEN"],evidenceIds:[],firewalls:["regularity ≠ necessity"],next:"D6_HELPER_HINDERER"},
  {id:"D6_HELPER_HINDERER",label:"Helping and hindering",learnerExperience:"The learner observes one agent facilitate and another obstruct another agent's goal.",newlyAvailableDistinctions:["social event","help/hindrance candidate interpretation"],vocabularyReveal:[],evidenceIds:["DEV-S01","DEV-S02","DEV-S03"],firewalls:["observed choice ≠ morality","initial study ≠ settled result"],next:"D7_SIMILARITY_DIFFERENCE"},
  {id:"D7_SIMILARITY_DIFFERENCE",label:"Similarity and difference",learnerExperience:"Agents share or differ in trivial preferences; social responses vary.",newlyAvailableDistinctions:["similar/different","preference/justification"],vocabularyReveal:[],evidenceIds:["DEV-S04","DEV-S05"],firewalls:["similarity preference ≠ legitimate exclusion","preference ≠ justification"],next:"D8_EVIDENCE_INSPECTION"},
  {id:"D8_EVIDENCE_INSPECTION",label:"Inspect the evidence",learnerExperience:"The learner opens observation, interpretation, alternatives, replication, and claim ceiling separately.",newlyAvailableDistinctions:["observation/interpretation","source/claim","replication/settlement"],vocabularyReveal:["source ledger","claim ceiling","alternative explanation"],evidenceIds:["DEV-S01","DEV-S02","DEV-S03","DEV-S04","DEV-S05"],firewalls:["experimental observation ≠ interpretation","replication failure ≠ proof of opposite"],next:"D9_PROTO_NORMATIVE"},
  {id:"D9_PROTO_NORMATIVE",label:"Proto-normative response",learnerExperience:"Approval, disapproval, reward, withdrawal, and social consequence become visible.",newlyAvailableDistinctions:["social response/norm","norm/reason","reason/authorization"],vocabularyReveal:["norm","authorization"],evidenceIds:[],firewalls:["social approval ≠ moral justification","predisposition ≠ norm ≠ reason ≠ justification ≠ authorization"],next:"D10_CULTURAL_FORMATION"},
  {id:"D10_CULTURAL_FORMATION",label:"Cultural formation",learnerExperience:"Family, language, peers, institutions, religion or its absence, education, media, and historical conditions enter as interacting fields.",newlyAvailableDistinctions:["biological/cultural/institutional contributions","person/dossier"],vocabularyReveal:["institutional field","assembly history"],evidenceIds:[],firewalls:["biology ≠ destiny","culture ≠ total explanation","person ≠ dossier"],next:"D11_CAPABILITY_GROWTH"},
  {id:"D11_CAPABILITY_GROWTH",label:"Capability growth",learnerExperience:"Time expands: language, mobility, relationships, skills, and standing open and close paths.",newlyAvailableDistinctions:["state/transition","capability/path","near/far possibility"],vocabularyReveal:["capability path","possibility horizon","temporal lens"],evidenceIds:[],firewalls:["more capability in one dimension ≠ global improvement"],next:"D12_LIFE_LOTTERY_HANDOFF"},
  {id:"D12_LIFE_LOTTERY_HANDOFF",label:"Every Doing develops somewhere",learnerExperience:"The developmental field contracts to the statement: You do not choose where you begin.",newlyAvailableDistinctions:["developing agent/situated beginning"],vocabularyReveal:["situated agency"],evidenceIds:[],firewalls:["starting condition ≠ destiny"],next:null}
];

export function stageById(id:DevelopmentalStageId){
  const stage=DEVELOPMENTAL_STAGES.find(s=>s.id===id);
  if(!stage) throw new Error("unknown-developmental-stage:"+id);
  return structuredClone(stage);
}

export function evidenceById(id:string){
  const e=DEVELOPMENTAL_EVIDENCE.find(x=>x.id===id);
  if(!e) throw new Error("unknown-developmental-evidence:"+id);
  return structuredClone(e);
}

export function evidenceForStage(id:DevelopmentalStageId){
  return stageById(id).evidenceIds.map(evidenceById);
}

export function validateDevelopmentalEntry(){
  const failures:string[]=[];
  if(DEVELOPMENTAL_STAGES.length!==13) failures.push("stage-count");
  if(DEVELOPMENTAL_STAGES[0].id!=="D0_PEDAGOGICAL_ZERO") failures.push("bad-start");
  if(DEVELOPMENTAL_STAGES[DEVELOPMENTAL_STAGES.length-1]?.id!=="D12_LIFE_LOTTERY_HANDOFF") failures.push("bad-handoff");
  for(let i=0;i<DEVELOPMENTAL_STAGES.length-1;i++){
    if(DEVELOPMENTAL_STAGES[i].next!==DEVELOPMENTAL_STAGES[i+1].id) failures.push("broken-sequence:"+DEVELOPMENTAL_STAGES[i].id);
  }
  for(const s of DEVELOPMENTAL_STAGES){
    for(const id of s.evidenceIds) if(!DEVELOPMENTAL_EVIDENCE.some(e=>e.id===id)) failures.push("missing-evidence:"+id);
  }
  const evidenceStage=stageById("D8_EVIDENCE_INSPECTION");
  if(!evidenceStage.vocabularyReveal.includes("claim ceiling")) failures.push("claim-ceiling-not-revealed");
  if(!stageById("D9_PROTO_NORMATIVE").firewalls.some(x=>x.includes("social approval"))) failures.push("approval-firewall");
  if(!stageById("D12_LIFE_LOTTERY_HANDOFF").firewalls.includes("starting condition ≠ destiny")) failures.push("destiny-firewall");
  return {passes:failures.length===0,failures};
}
