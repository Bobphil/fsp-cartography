export type TranslationLevel =
  | "FULL_LOCAL"
  | "PARTIAL"
  | "STRUCTURAL"
  | "TASK_ONLY"
  | "FAILURE";

export type AgencyCondition = "OPEN" | "CONSTRAINED" | "BLOCKED";

export interface ClaimBundle {
  id: string;
  proposition: string;
  evidence: string[];
  warrants: string[];
  backgroundCommitments: string[];
  task: string;
  claimCeiling: string;
  ontologyCommitments: string[];
  standing: string[];
}

export interface PRFProfile {
  id: string;
  label: string;
  claims: ClaimBundle[];
  values: string[];
  salientEntities: string[];
}

export interface TranslationCorrespondence {
  sourceElement: string;
  targetElement: string;
  relation: "DIRECT" | "STRUCTURAL" | "TASK_EQUIVALENT";
}

export interface TranslationAttempt {
  sourcePrfId: string;
  targetPrfId: string;
  task: string;
  correspondences: TranslationCorrespondence[];
  preserved: string[];
  remainder: string[];
  distortions: string[];
}

export interface TranslationAssessment {
  level: TranslationLevel;
  locallyAdequate: boolean;
  requiresOntologicalConvergence: false;
  preserved: string[];
  remainder: string[];
  distortions: string[];
}

export interface SharedTaskProposal {
  task: string;
  participantPrfIds: string[];
  acceptedBy: string[];
  rejectedBy: string[];
  compatibleActions: string[];
  incompatibleActions: string[];
}

export interface CooperationAssessment {
  sharedTaskExists: boolean;
  allParticipantsAcceptTask: boolean;
  actionCompatibilityExists: boolean;
  ontologicalConvergenceRequired: false;
  result: "COOPERATION_POSSIBLE" | "COORDINATION_ONLY" | "NO_SHARED_TASK";
}

export interface AgencyAudit {
  informationAccess: AgencyCondition;
  interpretiveContestability: AgencyCondition;
  optionVisibility: AgencyCondition;
  standingToParticipate: AgencyCondition;
  reopenability: AgencyCondition;
  materialCapability: AgencyCondition;
}

export interface AgencyAssessment {
  blockedDimensions: (keyof AgencyAudit)[];
  constrainedDimensions: (keyof AgencyAudit)[];
  dominationRisk: "LOW" | "ELEVATED" | "SEVERE";
}

export interface RepairProposal {
  changes: Partial<AgencyAudit>;
  description: string;
}

export interface RepairAssessment {
  improvedDimensions: (keyof AgencyAudit)[];
  worsenedDimensions: (keyof AgencyAudit)[];
  preservesAgencyOrImproves: boolean;
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

export function assessTranslation(attempt: TranslationAttempt): TranslationAssessment {
  const preserved = unique(attempt.preserved);
  const remainder = unique(attempt.remainder);
  const distortions = unique(attempt.distortions);

  let level: TranslationLevel;

  if (preserved.length === 0 || distortions.length > 0 && preserved.length === 0) {
    level = "FAILURE";
  } else if (remainder.length === 0 && distortions.length === 0) {
    level = "FULL_LOCAL";
  } else {
    const relations = new Set(attempt.correspondences.map(c => c.relation));
    if (relations.has("TASK_EQUIVALENT") && !relations.has("DIRECT") && !relations.has("STRUCTURAL")) {
      level = "TASK_ONLY";
    } else if (relations.has("STRUCTURAL") && !relations.has("DIRECT")) {
      level = "STRUCTURAL";
    } else {
      level = "PARTIAL";
    }
  }

  return {
    level,
    locallyAdequate: level !== "FAILURE",
    requiresOntologicalConvergence: false,
    preserved,
    remainder,
    distortions
  };
}

export function assessCooperation(proposal: SharedTaskProposal): CooperationAssessment {
  const participantSet = new Set(proposal.participantPrfIds);
  const accepted = new Set(proposal.acceptedBy.filter(id => participantSet.has(id)));
  const allParticipantsAcceptTask =
    participantSet.size > 0 && accepted.size === participantSet.size;
  const sharedTaskExists = proposal.task.trim().length > 0 && proposal.rejectedBy.length === 0;
  const actionCompatibilityExists = proposal.compatibleActions.length > 0;

  let result: CooperationAssessment["result"];
  if (!sharedTaskExists) {
    result = "NO_SHARED_TASK";
  } else if (allParticipantsAcceptTask && actionCompatibilityExists) {
    result = "COOPERATION_POSSIBLE";
  } else {
    result = "COORDINATION_ONLY";
  }

  return {
    sharedTaskExists,
    allParticipantsAcceptTask,
    actionCompatibilityExists,
    ontologicalConvergenceRequired: false,
    result
  };
}

const agencyKeys: (keyof AgencyAudit)[] = [
  "informationAccess",
  "interpretiveContestability",
  "optionVisibility",
  "standingToParticipate",
  "reopenability",
  "materialCapability"
];

export function assessAgency(audit: AgencyAudit): AgencyAssessment {
  const blockedDimensions = agencyKeys.filter(key => audit[key] === "BLOCKED");
  const constrainedDimensions = agencyKeys.filter(key => audit[key] === "CONSTRAINED");

  let dominationRisk: AgencyAssessment["dominationRisk"] = "LOW";
  if (blockedDimensions.length >= 2) dominationRisk = "SEVERE";
  else if (blockedDimensions.length === 1 || constrainedDimensions.length >= 3) dominationRisk = "ELEVATED";

  return { blockedDimensions, constrainedDimensions, dominationRisk };
}

function rank(condition: AgencyCondition): number {
  if (condition === "BLOCKED") return 0;
  if (condition === "CONSTRAINED") return 1;
  return 2;
}

export function assessRepair(before: AgencyAudit, proposal: RepairProposal): RepairAssessment {
  const after: AgencyAudit = { ...before, ...proposal.changes };
  const improvedDimensions = agencyKeys.filter(key => rank(after[key]) > rank(before[key]));
  const worsenedDimensions = agencyKeys.filter(key => rank(after[key]) < rank(before[key]));

  return {
    improvedDimensions,
    worsenedDimensions,
    preservesAgencyOrImproves: improvedDimensions.length > 0 && worsenedDimensions.length === 0
  };
}
