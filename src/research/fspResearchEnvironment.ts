export type ResearchRegionId =
  | "GOVERNANCE_TRANSLATION"
  | "SITUATED_AGENCY_TRANSFORMATION"
  | "MIND_PERCEPTION_PHENOMENOLOGY"
  | "INTELLIGENCE_ACROSS_SCALES"
  | "SCIENCE_MODELS_INTEROPERABILITY"
  | "INSTITUTIONS_POWER_COORDINATION"
  | "COMPLETION_HORIZON";

export interface ResearchRegion {
  id: ResearchRegionId;
  title: string;
  publicQuestion: string;
  ownerRefs: string[];
  related: ResearchRegionId[];
  publicReady: boolean;
  claimCeiling: string;
}

export const RESEARCH_REGIONS: ResearchRegion[] = [
  {id:"GOVERNANCE_TRANSLATION",title:"Governance and Translation",publicQuestion:"What survives when a warranted result travels into another context, and what must remain visible when it does not?",ownerRefs:["FSP-CONSTITUTIONAL-COMPRESSION-1","FSP-FOUR-MOVE-GOVERNANCE-1","FSP-RECOMPOSITION-GOVERNANCE-1"],related:["SITUATED_AGENCY_TRANSFORMATION","SCIENCE_MODELS_INTEROPERABILITY","INSTITUTIONS_POWER_COORDINATION","COMPLETION_HORIZON"],publicReady:false,claimCeiling:"Navigation and governance orientation only; does not replace canonical owners."},
  {id:"SITUATED_AGENCY_TRANSFORMATION",title:"Situated Agency and Transformation",publicQuestion:"What can this situated agent actually do from here, what constrains or enables that agency, and how can future reachability change?",ownerRefs:["FSP-PRICE-ISMAEL-SITUATED-PRAGMATISM-1","FSP-TRANSFORMATION-ARCHITECTURE-1","FSP-SITUATED-LIFE-NAVIGATION-1","FSP-LIVES-IN-TRANSFORMATION-1"],related:["MIND_PERCEPTION_PHENOMENOLOGY","INTELLIGENCE_ACROSS_SCALES","INSTITUTIONS_POWER_COORDINATION"],publicReady:false,claimCeiling:"Does not supply a complete theory of agency or prescribe a life target."},
  {id:"MIND_PERCEPTION_PHENOMENOLOGY",title:"Mind, Perception, and Phenomenology",publicQuestion:"How should first-person experience and publicly inspectable scientific descriptions constrain one another without being prematurely collapsed?",ownerRefs:["OBJECTIVE-PHENOMENOLOGY-RESEARCH","FSP-PRICE-ISMAEL-SITUATED-PRAGMATISM-1","PREDICTIVE-SITUATED-PERCEPTION-ORIENTATION"],related:["SITUATED_AGENCY_TRANSFORMATION","INTELLIGENCE_ACROSS_SCALES","SCIENCE_MODELS_INTEROPERABILITY"],publicReady:false,claimCeiling:"Does not establish reduction of first-person experience to public structure."},
  {id:"INTELLIGENCE_ACROSS_SCALES",title:"Intelligence Across Scales",publicQuestion:"Which structural relations genuinely travel across biological and artificial intelligence, and which do not?",ownerRefs:["HETEROGENEOUS-INTELLIGENCE-RESEARCH","RECURSIVE-SCALE-RESEARCH","LEVIN-PLANARIA-DOSSIERS","AI-COMPARATOR-RESEARCH"],related:["SITUATED_AGENCY_TRANSFORMATION","MIND_PERCEPTION_PHENOMENOLOGY","SCIENCE_MODELS_INTEROPERABILITY"],publicReady:false,claimCeiling:"Problem-solving and goal-directedness do not by themselves establish consciousness or moral standing."},
  {id:"SCIENCE_MODELS_INTEROPERABILITY",title:"Science, Models, and Interoperability",publicQuestion:"How do scientific maps change, recombine, and travel across theory, evidence, scale, and ontology?",ownerRefs:["FSP-FIVE-CASE-ATLAS","DUHEM-QUINE-SEQUENCE","KUHN-MEANING-CHANGE","THOUGHT-EXPERIMENTS","ONTOLOGICAL-INTEROPERABILITY-RESEARCH"],related:["GOVERNANCE_TRANSLATION","MIND_PERCEPTION_PHENOMENOLOGY","INTELLIGENCE_ACROSS_SCALES","COMPLETION_HORIZON"],publicReady:false,claimCeiling:"Cross-domain interoperability does not establish one ontology or one final vocabulary."},
  {id:"INSTITUTIONS_POWER_COORDINATION",title:"Institutions, Power, and Ethical Coordination",publicQuestion:"How can plural agents coordinate action without confusing practical power, expertise, legitimacy, consent, and moral authorization?",ownerRefs:["JUDGMENT-AUTHORIZATION-ARCHITECTURE","CONNECTED-DOING-INSTITUTIONS","COOPERATION-WITHOUT-CONVERGENCE","ETHICS-POWER-FLOURISHING"],related:["GOVERNANCE_TRANSLATION","SITUATED_AGENCY_TRANSFORMATION","COMPLETION_HORIZON"],publicReady:false,claimCeiling:"Institutional coordination does not imply moral convergence or automatic legitimacy."},
  {id:"COMPLETION_HORIZON",title:"Completion Horizon",publicQuestion:"What would increasingly comprehensive understanding have to explain, translate, and preserve before it could responsibly claim greater completion?",ownerRefs:["FSP-ECOSYSTEM-RECONCILIATION-2","RESEARCH-COMPLETION-LADDER","COMPLETION-HORIZON-RESEARCH"],related:["GOVERNANCE_TRANSLATION","SCIENCE_MODELS_INTEROPERABILITY","INSTITUTIONS_POWER_COORDINATION"],publicReady:false,claimCeiling:"Present integration is not present completeness."}
];

export const AGENCY_MIND_INTELLIGENCE_NEXUS = {
  kind:"NEXUS" as const,
  notARegion:true,
  nodes:["SITUATED_AGENCY","PERCEPTION_SELF_LOCATION","CAPABILITY_TRANSFORMATION","BIOLOGICAL_INTELLIGENCE","AI_DISTRIBUTED_AGENCY","CONSCIOUSNESS_PHENOMENOLOGY","ETHICAL_INTERVENTION"],
  invariants:["AGENCY != INTELLIGENCE","INTELLIGENCE != CONSCIOUSNESS","CAPABILITY != MORAL_STANDING","MORAL_STANDING != AUTHORIZATION"]
};

export const LIVES_PUBLIC_CONTRACT = {
  owner:"FSP-LIVES-IN-TRANSFORMATION-1",
  route:["PERSON","BIOGRAPHY_MAP","TRANSFORMATION_TIMELINE","CRITICAL_TRANSITION","SOURCE_LEDGER","INTENDED_VS_ACTUAL","CAPABILITY_CONSTRAINT_DELTA","OPENED_CLOSED_FUTURES","HISTORICAL_RETURN","WHAT_MIGHT_TRAVEL","WHAT_MUST_NOT_TRAVEL","SITUATED_COMPARISON","OPTIONAL_LIFE_NAVIGATION"],
  provenance:["DIRECT_STATEMENT","CONTEMPORARY_TESTIMONY","RECORDED_ACTION","INSTITUTIONAL_RECORD","LATER_MEMORY","BIOGRAPHER_INTERPRETATION","FSP_INFERENCE"],
  firewalls:["BIOGRAPHICAL_DOSSIER != PERSON","LATER_SIGNIFICANCE != EARLIER_FORESIGHT","STATED_REASON != COMPLETE_CAUSE","INFERRED_CAUSE != DEMONSTRATED_MOTIVE","EXEMPLAR_AS_MIRROR != EXEMPLAR_AS_TEMPLATE"],
  lifeNavigationOptional:true
};

export const ORIENTATION_PAGE_GRAMMAR = ["OPENING_PROBLEM","EXISTING_MAPS","TRANSLATION_BURDENS","FSP_CONTRIBUTION","CLAIM_CEILING","RESEARCH_FRONTIER","DEEPER_ROUTES"] as const;

export const CANONICAL_OWNER_REGRESSION = [
  "REGION_MUST_NOT_DEFINE_OWNED_CONCEPT",
  "ORIENTATION_MUST_NOT_STRENGTHEN_CANONICAL_CLAIM",
  "PROJECTION_MUST_NOT_INVENT_EVIDENCE",
  "REGION_MUST_NOT_REPLACE_CLAIM_LEVEL_PROVENANCE",
  "PUBLIC_SUMMARY_MUST_PRESERVE_CLAIM_CEILING",
  "ROUTE_MUST_PRESERVE_DECISION_RELEVANT_REMAINDER",
  "RESEARCH_ARCHITECTURE_MUST_NOT_APPEAR_AS_SETTLED_DOMAIN_FACT",
  "DOMAIN_NATIVE_CLAIM_MUST_NOT_BE_ATTRIBUTED_TO_FSP",
  "LIFE_NAVIGATION_MUST_NOT_OWN_HISTORICAL_LESSON",
  "VR_MUST_NOT_OWN_HISTORICAL_DOSSIER"
] as const;

export function validateResearchEnvironment(): string[] {
  const errors:string[]=[];
  if(RESEARCH_REGIONS.length!==7) errors.push("Expected exactly seven first-wave research regions.");
  const ids=new Set(RESEARCH_REGIONS.map(r=>r.id));
  if(ids.size!==RESEARCH_REGIONS.length) errors.push("Research region IDs must be unique.");
  for(const r of RESEARCH_REGIONS){
    if(!r.publicQuestion.trim()) errors.push(r.id+": missing public question");
    if(!r.ownerRefs.length) errors.push(r.id+": missing owner references");
    if(r.publicReady) errors.push(r.id+": Phase 1 region may not be public-ready");
    if(!r.claimCeiling.trim()) errors.push(r.id+": missing claim ceiling");
  }
  if(!AGENCY_MIND_INTELLIGENCE_NEXUS.notARegion) errors.push("Agency/Mind/Intelligence nexus must not become an eighth region.");
  if(!LIVES_PUBLIC_CONTRACT.lifeNavigationOptional) errors.push("Lives to Life Navigation handoff must remain optional.");
  return errors;
}
