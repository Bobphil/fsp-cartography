import {
  AgencyAudit,
  PRFProfile,
  TranslationAttempt
} from "./translation";
import {
  InstitutionalPowerProfile,
  TaskRelevantStructure,
  TaskNegotiationRound
} from "./translation2";

export const FOREST_TASK = "Protect the watershed from irreversible damage while negotiating permissible land use";

export const forestPrfs: PRFProfile[] = [
  {
    id: "A",
    label: "Ecological scientific naturalism",
    values: ["ecosystem viability", "evidence quality", "reversibility"],
    salientEntities: ["watershed", "species populations", "soil", "carbon", "hydrology"],
    claims: [{
      id: "A1",
      proposition: "Irreversible watershed damage should be prevented while land-use options are evaluated.",
      evidence: ["species survey", "erosion model", "hydrological measurements"],
      warrants: ["measured ecological degradation constrains safe land-use options"],
      backgroundCommitments: ["ecological systems are empirically investigable"],
      task: FOREST_TASK,
      claimCeiling: "supports precaution against irreversible damage; does not by itself settle ultimate land value",
      ontologyCommitments: ["natural systems", "causal ecological relations"],
      standing: ["ecological expertise"]
    }]
  },
  {
    id: "B",
    label: "Property and market framework",
    values: ["legal title", "economic opportunity", "predictability", "negotiated limits"],
    salientEntities: ["property title", "investment", "contract", "timber", "land-use rights"],
    claims: [{
      id: "B1",
      proposition: "Land-use restrictions require a justified and predictable basis.",
      evidence: ["title records", "zoning law", "projected returns", "risk estimates"],
      warrants: ["restrictions on titled use require public justification and stable rules"],
      backgroundCommitments: ["property rights have institutional standing"],
      task: FOREST_TASK,
      claimCeiling: "supports contestable limits and compensation questions; does not establish unlimited use",
      ontologyCommitments: ["legally constituted property", "market valuation"],
      standing: ["owner", "contract participant"]
    }]
  },
  {
    id: "C",
    label: "Relational Indigenous ecological framework",
    values: ["kinship with land", "intergenerational obligation", "community continuity", "place-specific responsibility"],
    salientEntities: ["ancestral land", "relations among generations", "watershed kin", "community practices"],
    claims: [{
      id: "C1",
      proposition: "The watershed is not merely a resource and obligations to place limit destructive use.",
      evidence: ["intergenerational testimony", "place-based ecological knowledge", "community practice", "observed watershed change"],
      warrants: ["longstanding reciprocal relations generate obligations not reducible to market price"],
      backgroundCommitments: ["human and more-than-human relations can carry standing"],
      task: FOREST_TASK,
      claimCeiling: "supports strong obligations against destructive use; does not claim all outsiders share the same ontology",
      ontologyCommitments: ["relational personhood", "more-than-human standing", "ancestral relation"],
      standing: ["community member", "knowledge holder", "affected descendant"]
    }]
  },
  {
    id: "D",
    label: "Religious stewardship framework",
    values: ["stewardship", "creation care", "community responsibility", "limits on exploitation"],
    salientEntities: ["creation", "stewardship duties", "community", "future generations"],
    claims: [{
      id: "D1",
      proposition: "Use of the forest is bounded by duties of stewardship and care for future generations.",
      evidence: ["religious teaching", "community tradition", "observed ecological harm"],
      warrants: ["stewardship obligations constrain destructive use"],
      backgroundCommitments: ["creation has value not exhausted by market price"],
      task: FOREST_TASK,
      claimCeiling: "supports stewardship-based limits; does not establish the religious ontology for non-adherents",
      ontologyCommitments: ["created order", "stewardship obligation", "sacred value"],
      standing: ["faith-community member", "affected resident"]
    }]
  }
];

const pair = (
  sourcePrfId: string,
  targetPrfId: string,
  relation: "DIRECT" | "STRUCTURAL" | "TASK_EQUIVALENT",
  preserved: string[],
  remainder: string[],
  distortions: string[] = []
): TranslationAttempt => ({
  sourcePrfId,
  targetPrfId,
  task: FOREST_TASK,
  correspondences: preserved.map((item, index) => ({
    sourceElement: item,
    targetElement: item,
    relation: index === 0 ? relation : "DIRECT"
  })),
  preserved,
  remainder,
  distortions
});

export const forestTranslationAttempts: TranslationAttempt[] = [
  pair("A","B","DIRECT",["irreversible watershed damage","measured ecological risk"],["non-market ecological value"]),
  pair("A","C","STRUCTURAL",["watershed viability","observed ecological change"],["scientific naturalism as ontology"]),
  pair("A","D","STRUCTURAL",["prevent irreversible damage","care for future conditions"],["naturalistic metaphysics"]),
  pair("B","A","TASK_EQUIVALENT",["predictable land-use constraint"],["property as primary normative frame"]),
  pair("B","C","TASK_EQUIVALENT",["limits on irreversible use"],["market valuation","individual title as primary standing"]),
  pair("B","D","TASK_EQUIVALENT",["limits on destructive use"],["market valuation as final value"]),
  pair("C","A","STRUCTURAL",["watershed viability","place-based ecological observation"],["kinship with land","more-than-human standing"]),
  pair("C","B","TASK_EQUIVALENT",["limits on destructive use"],["ancestral relation","non-transferable obligations to place"]),
  pair("C","D","STRUCTURAL",["obligation beyond immediate self-interest","future-generation responsibility"],["ancestral ontology"]),
  pair("D","A","STRUCTURAL",["prevent ecological destruction","future-generation responsibility"],["created-order ontology"]),
  pair("D","B","TASK_EQUIVALENT",["limits on destructive use"],["sacred value","stewardship grounding"]),
  pair("D","C","STRUCTURAL",["obligation beyond immediate extraction","intergenerational responsibility"],["creation theology"])
];

const sharedEmpirical = [
  "clearing steep slopes increases erosion risk",
  "watershed damage can become difficult to reverse"
];
const sharedConstraints = [
  "irreversible damage should be avoided during negotiation",
  "land-use decision remains contestable"
];
const sharedConsequences = [
  "unrestricted clearing increases watershed risk",
  "temporary pause preserves future options"
];
const sharedActions = [
  "temporary moratorium on irreversible clearing",
  "joint evidence review"
];

export const forestTaskRelevantStructures: TaskRelevantStructure[] = [
  {
    prfId:"A",task:FOREST_TASK,
    empiricalCommitments:sharedEmpirical,
    practicalConstraints:sharedConstraints,
    predictedConsequences:sharedConsequences,
    licensedActions:sharedActions,
    ontologyCommitments:["natural systems","causal ecological relations"]
  },
  {
    prfId:"B",task:FOREST_TASK,
    empiricalCommitments:sharedEmpirical,
    practicalConstraints:sharedConstraints,
    predictedConsequences:sharedConsequences,
    licensedActions:sharedActions,
    ontologyCommitments:["legally constituted property","market valuation"]
  },
  {
    prfId:"C",task:FOREST_TASK,
    empiricalCommitments:sharedEmpirical,
    practicalConstraints:sharedConstraints,
    predictedConsequences:sharedConsequences,
    licensedActions:sharedActions,
    ontologyCommitments:["relational personhood","more-than-human standing","ancestral relation"]
  },
  {
    prfId:"D",task:FOREST_TASK,
    empiricalCommitments:sharedEmpirical,
    practicalConstraints:sharedConstraints,
    predictedConsequences:sharedConsequences,
    licensedActions:sharedActions,
    ontologyCommitments:["created order","stewardship obligation","sacred value"]
  }
];

export const forestTaskNegotiation: TaskNegotiationRound[] = [
  {
    proposal:{
      task:"Maximize economic value from the forest",
      participantPrfIds:["A","B","C","D"],
      acceptedBy:["B"],
      rejectedBy:["A","C","D"],
      compatibleActions:["timber valuation"],
      incompatibleActions:["unrestricted immediate clearing"]
    },
    participantReasons:{
      A:"does not preserve ecological constraints",
      B:"fits property/market frame",
      C:"reduces land relation to economic value",
      D:"does not express stewardship limits"
    }
  },
  {
    proposal:{
      task:FOREST_TASK,
      participantPrfIds:["A","B","C","D"],
      acceptedBy:["A","B","C","D"],
      rejectedBy:[],
      compatibleActions:["temporary moratorium on irreversible clearing","joint evidence review","public task-definition hearing"],
      incompatibleActions:["irreversible clearing before review"]
    },
    participantReasons:{
      A:"preserves ecological viability while evidence is reviewed",
      B:"keeps final land-use rules contestable",
      C:"prevents immediate destructive use while community standing is recognized",
      D:"fits stewardship limits without requiring theological agreement"
    }
  }
];

export const forestAgencyBefore: Record<string, AgencyAudit> = {
  A:{
    informationAccess:"OPEN",
    interpretiveContestability:"CONSTRAINED",
    optionVisibility:"OPEN",
    standingToParticipate:"CONSTRAINED",
    reopenability:"BLOCKED",
    materialCapability:"OPEN"
  },
  B:{
    informationAccess:"OPEN",
    interpretiveContestability:"OPEN",
    optionVisibility:"OPEN",
    standingToParticipate:"OPEN",
    reopenability:"CONSTRAINED",
    materialCapability:"OPEN"
  },
  C:{
    informationAccess:"CONSTRAINED",
    interpretiveContestability:"BLOCKED",
    optionVisibility:"CONSTRAINED",
    standingToParticipate:"BLOCKED",
    reopenability:"BLOCKED",
    materialCapability:"CONSTRAINED"
  },
  D:{
    informationAccess:"OPEN",
    interpretiveContestability:"CONSTRAINED",
    optionVisibility:"OPEN",
    standingToParticipate:"CONSTRAINED",
    reopenability:"BLOCKED",
    materialCapability:"OPEN"
  }
};

export const forestInstitution: InstitutionalPowerProfile = {
  institutionId:"county-board",
  institutionLabel:"County Land Use Board",
  affectedPrfIds:["A","B","C","D"],
  agendaControlBy:["BOARD_CHAIR"],
  informationControlBy:["BOARD_CHAIR"],
  decisionAuthorityBy:["BOARD_CHAIR","BOARD"],
  appealAvailableTo:["B"],
  exitAvailableTo:["B"],
  agencyAudits:forestAgencyBefore
};

export const forestAgencyRepair = {
  description:"Open evidence docket, recognize all four participants in task definition, create appeal/reopen route, and fund community participation",
  changesByPrf:{
    A:{interpretiveContestability:"OPEN",standingToParticipate:"OPEN",reopenability:"OPEN"},
    B:{reopenability:"OPEN"},
    C:{informationAccess:"OPEN",interpretiveContestability:"OPEN",optionVisibility:"OPEN",standingToParticipate:"OPEN",reopenability:"OPEN",materialCapability:"OPEN"},
    D:{interpretiveContestability:"OPEN",standingToParticipate:"OPEN",reopenability:"OPEN"}
  }
} as const;

export const forestBadRepair = {
  description:"Publish evidence but centralize interpretation and remove appeal to speed the decision",
  changesByPrf:{
    A:{informationAccess:"OPEN",interpretiveContestability:"BLOCKED",reopenability:"BLOCKED"},
    B:{informationAccess:"OPEN",reopenability:"BLOCKED"},
    C:{informationAccess:"OPEN",interpretiveContestability:"BLOCKED",reopenability:"BLOCKED"},
    D:{informationAccess:"OPEN",interpretiveContestability:"BLOCKED",reopenability:"BLOCKED"}
  }
} as const;
