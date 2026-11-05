import {
  CounterPublicEvidenceRecord,
  ExperienceInterpretationRecord,
  RevisionReentryCandidate,
  StandingRepair,
  TestimonialRecord
} from "./revision5";

export const credibilityDeficitTestimony:TestimonialRecord={
  testimonyId:"t1",
  speakerId:"m3",
  claim:"the current interpretation omits a recurring form of harm",
  evidenceIds:["e-counter-1"],
  assignedCredibility:"DEFICIT",
  credibilityBasis:["speaker is treated as less reliable because of group-linked stereotypes"],
  identityLinkedPrejudiceIndicators:["group-linked credibility discount"],
  contentPrejudiceIndicators:[],
  opportunityToRespond:false
};

export const credibilityExcessTestimony:TestimonialRecord={
  testimonyId:"t2",
  speakerId:"director",
  claim:"the dominant interpretation is technically settled",
  evidenceIds:["e-dominant-1"],
  assignedCredibility:"EXCESS",
  credibilityBasis:["organizational prestige is treated as epistemic superiority"],
  identityLinkedPrejudiceIndicators:[],
  contentPrejudiceIndicators:["status-linked credibility inflation"],
  opportunityToRespond:true
};

export const hermeneuticalGapRecord:ExperienceInterpretationRecord={
  recordId:"h1",
  memberId:"m3",
  experienceClaim:"the available vocabulary does not adequately describe the recurring pattern being reported",
  availableResourceIds:["dominant-vocabulary"],
  missingConcepts:["concept for the recurring pattern"],
  adequacy:"GAP",
  excludedFromMeaningMaking:true,
  canProposeNewConcepts:false
};

export const partialUnderstandingRecord:ExperienceInterpretationRecord={
  recordId:"h2",
  memberId:"m3",
  experienceClaim:"the dominant vocabulary captures part but not all of the reported pattern",
  availableResourceIds:["dominant-vocabulary","counter-public-vocabulary"],
  missingConcepts:["remaining distinction"],
  adequacy:"PARTIAL",
  excludedFromMeaningMaking:false,
  canProposeNewConcepts:true
};

export const standingRepair:StandingRepair={
  memberId:"m3",
  restoreTestimonySubmission:true,
  restoreQuestionRaising:true,
  restoreHypothesisProposal:true,
  restoreConceptProposal:true,
  restoreInterpretiveContestability:true,
  reduceRetaliationRisk:true,
  description:"restore full participation in testimony, hypothesis formation, concept formation, and challenge"
};

export const counterPublicEvidence:CounterPublicEvidenceRecord={
  recordId:"cp1",
  contributorIds:["m3","m4"],
  evidenceIds:["e-counter-1","e-counter-2"],
  interpretiveResourceIds:["counter-public-vocabulary"],
  claims:[
    "the dominant vocabulary misses a recurring distinction",
    "the alternative vocabulary makes previously obscured evidence describable"
  ],
  provenanceVisible:true,
  mayChallengeDominantInterpretation:true,
  autoPrivileged:false
};

export const cleanReentryCandidate:RevisionReentryCandidate={
  candidateId:"reenter-minority-interpretation",
  memberId:"m3",
  sourceClaimIds:["t1","h1","cp1"],
  testimonyAuditPassed:true,
  hermeneuticalRepairAvailable:true,
  standingRestored:true,
  contestabilityRestored:true,
  provenanceVisible:true,
  unresolvedRetaliationRisk:false
};

export const remainderReentryCandidate:RevisionReentryCandidate={
  candidateId:"reenter-with-remaining-gap",
  memberId:"m3",
  sourceClaimIds:["t1","h2","cp1"],
  testimonyAuditPassed:true,
  hermeneuticalRepairAvailable:false,
  standingRestored:true,
  contestabilityRestored:true,
  provenanceVisible:true,
  unresolvedRetaliationRisk:false
};

export const blockedRetaliationCandidate:RevisionReentryCandidate={
  ...structuredClone(cleanReentryCandidate),
  candidateId:"blocked-retaliation",
  unresolvedRetaliationRisk:true
};

export const blockedProvenanceCandidate:RevisionReentryCandidate={
  ...structuredClone(cleanReentryCandidate),
  candidateId:"blocked-provenance",
  provenanceVisible:false
};
