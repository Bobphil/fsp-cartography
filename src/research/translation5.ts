import { PRFProfile, TranslationAttempt } from "./translation";
import {
  PairwiseTranslationMatrix,
  TaskRelevantStructure,
  buildPairwiseTranslationMatrix
} from "./translation2";

export type PrimitiveName =
  | "TASK"
  | "EVIDENCE"
  | "WARRANT"
  | "BACKGROUND"
  | "CLAIM_CEILING"
  | "ONTOLOGY"
  | "STANDING"
  | "REMAINDER"
  | "AUXILIARY"
  | "AGENCY";

export interface DomainCase {
  id: string;
  label: string;
  nativeTopology: string[];
  prfs: PRFProfile[];
  translationAttempts: TranslationAttempt[];
  taskStructures: TaskRelevantStructure[];
  requiredPrimitives: PrimitiveName[];
}

export interface CrossDomainReplicationResult {
  domainIds: string[];
  sharedPrimitives: PrimitiveName[];
  domainSpecificPrimitives: Record<string,PrimitiveName[]>;
  completeMatrices: Record<string,boolean>;
  replicated: boolean;
}

export interface PrimitiveAblationScenario {
  primitive: PrimitiveName;
  loses: string[];
}

export interface PrimitiveAblationAudit {
  primitive: PrimitiveName;
  necessaryFor: string[];
  dispensableFor: string[];
  materiallyNecessary: boolean;
}

export type PublicationClaimCeiling =
  | "SINGLE_CASE_ONLY"
  | "CROSS_DOMAIN_REPLICATION"
  | "DOMAIN_GENERAL_CANDIDATE"
  | "UNIVERSAL_CLAIM_NOT_LICENSED";

export interface PublicationAssessment {
  ceiling: PublicationClaimCeiling;
  allowedClaims: string[];
  prohibitedClaims: string[];
  reasons: string[];
}

function intersect<T>(sets:T[][]):T[] {
  if(sets.length===0) return [];
  return [...new Set(sets[0])].filter(x=>sets.every(s=>s.includes(x)));
}

export function assessCrossDomainReplication(
  domains:DomainCase[]
):CrossDomainReplicationResult {
  const sharedPrimitives=intersect(domains.map(d=>d.requiredPrimitives));
  const completeMatrices:Record<string,boolean>={};
  const domainSpecificPrimitives:Record<string,PrimitiveName[]>={};

  for(const domain of domains){
    const matrix:PairwiseTranslationMatrix=
      buildPairwiseTranslationMatrix(domain.prfs,domain.translationAttempts);
    completeMatrices[domain.id]=matrix.complete;
    domainSpecificPrimitives[domain.id]=domain.requiredPrimitives.filter(
      p=>!sharedPrimitives.includes(p)
    );
  }

  return {
    domainIds:domains.map(d=>d.id),
    sharedPrimitives,
    domainSpecificPrimitives,
    completeMatrices,
    replicated:
      domains.length>=2 &&
      Object.values(completeMatrices).every(Boolean) &&
      sharedPrimitives.length>0
  };
}

export function auditPrimitiveAblation(
  primitive:PrimitiveName,
  scenarios:PrimitiveAblationScenario[]
):PrimitiveAblationAudit {
  const relevant=scenarios.filter(s=>s.primitive===primitive);
  const necessaryFor=[...new Set(relevant.flatMap(s=>s.loses))].sort();
  const allCapabilities=[
    "task-boundedness",
    "evidence-provenance",
    "licensing",
    "context-sensitivity",
    "claim-restraint",
    "ontological-pluralism",
    "standing",
    "loss-tracking",
    "auxiliary-sensitivity",
    "anti-domination"
  ];
  const dispensableFor=allCapabilities.filter(x=>!necessaryFor.includes(x));
  return {
    primitive,
    necessaryFor,
    dispensableFor,
    materiallyNecessary:necessaryFor.length>0
  };
}

export function assessPublicationClaimCeiling(
  replication:CrossDomainReplicationResult,
  ablations:PrimitiveAblationAudit[]
):PublicationAssessment {
  const necessary=ablations.filter(a=>a.materiallyNecessary).map(a=>a.primitive);
  const reasons:string[]=[];

  if(!replication.replicated){
    return {
      ceiling:"SINGLE_CASE_ONLY",
      allowedClaims:["The formalism is useful in the tested case."],
      prohibitedClaims:[
        "The formalism is domain-general.",
        "The formalism applies to all human PRFs.",
        "The formalism proves ontological underdetermination."
      ],
      reasons:["Cross-domain replication has not been established."]
    };
  }

  reasons.push("The core translation grammar has replicated across at least two structurally different domains.");
  if(necessary.length>0){
    reasons.push(`Primitive ablation identified non-redundant roles for: ${necessary.join(", ")}.`);
  }
  reasons.push("Only two constructed domains have been tested, so universal or unrestricted domain-general claims remain unlicensed.");

  return {
    ceiling:"CROSS_DOMAIN_REPLICATION",
    allowedClaims:[
      "The tested FSP translation grammar has replicated across two structurally different constructed domains.",
      "Several primitives perform non-redundant representational work under ablation.",
      "Task-relative cooperation and translation can be represented without ontological convergence in both tested domains."
    ],
    prohibitedClaims:[
      "All human PRFs are mutually translatable.",
      "The formalism is universally domain-general.",
      "The formalism proves the Duhem-Quine thesis.",
      "The formalism supplies a complete theory of domination or legitimate governance.",
      "Success in two constructed domains establishes applicability to all medicine, ecology, ethics, religion, or culture."
    ],
    reasons
  };
}
