import {
  AgencyAudit,
  PRFProfile,
  SharedTaskProposal,
  TranslationAttempt,
  TranslationAssessment,
  assessAgency,
  assessCooperation,
  assessRepair,
  assessTranslation
} from "./translation";

export interface PairwiseTranslationResult {
  sourcePrfId: string;
  targetPrfId: string;
  assessment: TranslationAssessment;
}

export interface PairwiseTranslationMatrix {
  prfIds: string[];
  directedResults: PairwiseTranslationResult[];
  missingDirectedPairs: string[];
  complete: boolean;
}

export interface TaskRelevantStructure {
  prfId: string;
  task: string;
  empiricalCommitments: string[];
  practicalConstraints: string[];
  predictedConsequences: string[];
  licensedActions: string[];
  ontologyCommitments: string[];
}

export interface UnderdeterminationAssessment {
  sameTask: boolean;
  ontologicallyNonIdentical: boolean;
  taskRelevantStructureEquivalent: boolean;
  ontologicalUniquenessLicensed: boolean;
  candidateResult: "UNDERDETERMINATION_SUPPORTED" | "NOT_ESTABLISHED";
  comparedDimensions: string[];
}

export interface TaskNegotiationRound {
  proposal: SharedTaskProposal;
  participantReasons: Record<string, string>;
}

export interface TaskNegotiationResult {
  rounds: number;
  acceptedTask: string | null;
  cooperationResult: ReturnType<typeof assessCooperation>["result"];
  rejectedTasks: string[];
}

export interface InstitutionalPowerProfile {
  institutionId: string;
  institutionLabel: string;
  affectedPrfIds: string[];
  agendaControlBy: string[];
  informationControlBy: string[];
  decisionAuthorityBy: string[];
  appealAvailableTo: string[];
  exitAvailableTo: string[];
  agencyAudits: Record<string, AgencyAudit>;
}

export interface InstitutionalPowerAssessment {
  institutionId: string;
  dominationRiskByPrf: Record<string, ReturnType<typeof assessAgency>["dominationRisk"]>;
  severelyAffectedPrfs: string[];
  elevatedRiskPrfs: string[];
  concentrationFlags: string[];
}

export interface MultiPartyRepairProposal {
  description: string;
  changesByPrf: Record<string, Partial<AgencyAudit>>;
}

export interface MultiPartyRepairAssessment {
  description: string;
  passes: boolean;
  improvedPrfs: string[];
  worsenedPrfs: string[];
  unchangedPrfs: string[];
}

function canonicalStrings(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function sameStrings(left: string[], right: string[]): boolean {
  const a = canonicalStrings(left);
  const b = canonicalStrings(right);
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function buildPairwiseTranslationMatrix(
  prfs: PRFProfile[],
  attempts: TranslationAttempt[]
): PairwiseTranslationMatrix {
  const ids = prfs.map(p => p.id);
  const requiredPairs: string[] = [];
  for (const source of ids) {
    for (const target of ids) {
      if (source !== target) requiredPairs.push(`${source}->${target}`);
    }
  }

  const directedResults = attempts
    .filter(a => a.sourcePrfId !== a.targetPrfId)
    .map(a => ({
      sourcePrfId: a.sourcePrfId,
      targetPrfId: a.targetPrfId,
      assessment: assessTranslation(a)
    }));

  const present = new Set(directedResults.map(r => `${r.sourcePrfId}->${r.targetPrfId}`));
  const missingDirectedPairs = requiredPairs.filter(pair => !present.has(pair));

  return {
    prfIds: ids,
    directedResults,
    missingDirectedPairs,
    complete: missingDirectedPairs.length === 0
  };
}

export function assessUnderdeterminationCandidate(
  left: TaskRelevantStructure,
  right: TaskRelevantStructure
): UnderdeterminationAssessment {
  const sameTask = left.task === right.task;
  const ontologicallyNonIdentical = !sameStrings(
    left.ontologyCommitments,
    right.ontologyCommitments
  );

  const empiricalEquivalent = sameStrings(left.empiricalCommitments, right.empiricalCommitments);
  const constraintEquivalent = sameStrings(left.practicalConstraints, right.practicalConstraints);
  const consequenceEquivalent = sameStrings(left.predictedConsequences, right.predictedConsequences);
  const actionEquivalent = sameStrings(left.licensedActions, right.licensedActions);

  const taskRelevantStructureEquivalent =
    empiricalEquivalent &&
    constraintEquivalent &&
    consequenceEquivalent &&
    actionEquivalent;

  const supported =
    sameTask &&
    ontologicallyNonIdentical &&
    taskRelevantStructureEquivalent;

  return {
    sameTask,
    ontologicallyNonIdentical,
    taskRelevantStructureEquivalent,
    ontologicalUniquenessLicensed: false,
    candidateResult: supported ? "UNDERDETERMINATION_SUPPORTED" : "NOT_ESTABLISHED",
    comparedDimensions: [
      "empiricalCommitments",
      "practicalConstraints",
      "predictedConsequences",
      "licensedActions"
    ]
  };
}

export function negotiateSharedTask(
  participantPrfIds: string[],
  rounds: TaskNegotiationRound[]
): TaskNegotiationResult {
  const rejectedTasks: string[] = [];

  for (const round of rounds) {
    const normalizedProposal: SharedTaskProposal = {
      ...round.proposal,
      participantPrfIds
    };
    const assessment = assessCooperation(normalizedProposal);

    if (assessment.result === "COOPERATION_POSSIBLE") {
      return {
        rounds: rejectedTasks.length + 1,
        acceptedTask: normalizedProposal.task,
        cooperationResult: assessment.result,
        rejectedTasks
      };
    }

    rejectedTasks.push(normalizedProposal.task);
  }

  const finalAssessment = rounds.length > 0
    ? assessCooperation({ ...rounds[rounds.length - 1].proposal, participantPrfIds })
    : {
        result: "NO_SHARED_TASK" as const
      };

  return {
    rounds: rounds.length,
    acceptedTask: null,
    cooperationResult: finalAssessment.result,
    rejectedTasks
  };
}

export function assessInstitutionalPower(
  profile: InstitutionalPowerProfile
): InstitutionalPowerAssessment {
  const dominationRiskByPrf: Record<string, ReturnType<typeof assessAgency>["dominationRisk"]> = {};
  const severelyAffectedPrfs: string[] = [];
  const elevatedRiskPrfs: string[] = [];

  for (const prfId of profile.affectedPrfIds) {
    const audit = profile.agencyAudits[prfId];
    if (!audit) continue;
    const result = assessAgency(audit);
    dominationRiskByPrf[prfId] = result.dominationRisk;
    if (result.dominationRisk === "SEVERE") severelyAffectedPrfs.push(prfId);
    if (result.dominationRisk === "ELEVATED") elevatedRiskPrfs.push(prfId);
  }

  const concentrationFlags: string[] = [];
  const decisionControllers = new Set(profile.decisionAuthorityBy);
  const agendaControllers = new Set(profile.agendaControlBy);
  const informationControllers = new Set(profile.informationControlBy);

  for (const actor of decisionControllers) {
    if (agendaControllers.has(actor)) concentrationFlags.push(`${actor}:agenda+decision`);
    if (informationControllers.has(actor)) concentrationFlags.push(`${actor}:information+decision`);
  }

  return {
    institutionId: profile.institutionId,
    dominationRiskByPrf,
    severelyAffectedPrfs,
    elevatedRiskPrfs,
    concentrationFlags: canonicalStrings(concentrationFlags)
  };
}

export function assessMultiPartyRepair(
  beforeByPrf: Record<string, AgencyAudit>,
  proposal: MultiPartyRepairProposal
): MultiPartyRepairAssessment {
  const improvedPrfs: string[] = [];
  const worsenedPrfs: string[] = [];
  const unchangedPrfs: string[] = [];

  for (const [prfId, before] of Object.entries(beforeByPrf)) {
    const changes = proposal.changesByPrf[prfId] ?? {};
    if (Object.keys(changes).length === 0) {
      unchangedPrfs.push(prfId);
      continue;
    }

    const result = assessRepair(before, {
      description: proposal.description,
      changes
    });

    if (result.worsenedDimensions.length > 0) worsenedPrfs.push(prfId);
    else if (result.improvedDimensions.length > 0) improvedPrfs.push(prfId);
    else unchangedPrfs.push(prfId);
  }

  return {
    description: proposal.description,
    passes: improvedPrfs.length > 0 && worsenedPrfs.length === 0,
    improvedPrfs,
    worsenedPrfs,
    unchangedPrfs
  };
}
