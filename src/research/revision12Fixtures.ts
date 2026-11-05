import {
  ConstitutionalCommitment,
  ExceptionNormalizationRecord,
  FSPObjectChallenge,
  GovernanceLayer,
  RevisionModuleRecord
} from "./revision12";

export const constitutionalCommitments:ConstitutionalCommitment[]=[
  {
    commitmentId:"map-not-world",
    kind:"FIREWALL",
    statement:"Map != World",
    introducedBy:"cartography-kernel",
    status:"PROVISIONALLY_FROZEN",
    provenanceVisible:true,
    challengeable:true,
    reopenConditions:["counterexample showing the distinction blocks rather than clarifies inquiry"],
    exceptionIds:[]
  },
  {
    commitmentId:"formation-not-justification",
    kind:"FIREWALL",
    statement:"Formation != Justification",
    introducedBy:"revision-2",
    status:"PROVISIONALLY_FROZEN",
    provenanceVisible:true,
    challengeable:true,
    reopenConditions:["case showing formation can itself supply a warranted justificatory relation under specified conditions"],
    exceptionIds:[]
  },
  {
    commitmentId:"protected-floor-rule",
    kind:"PROTECTED_FLOOR",
    statement:"Declared protected capability floors cannot be traded away by ordinary compensation",
    introducedBy:"revision-10",
    status:"PROVISIONALLY_FROZEN",
    provenanceVisible:true,
    challengeable:true,
    reopenConditions:["new normative argument plus affected-party standing and comparative repair analysis"],
    exceptionIds:["exception-review-delay"]
  },
  {
    commitmentId:"emergency-exception-rule",
    kind:"EXCEPTION_RULE",
    statement:"Temporary floor exceptions require necessity, sunset, review, residual capability, and restoration",
    introducedBy:"revision-11",
    status:"PROVISIONALLY_FROZEN",
    provenanceVisible:true,
    challengeable:true,
    reopenConditions:["evidence that the exception architecture systematically fails under represented emergencies"],
    exceptionIds:["exception-review-delay"]
  },
  {
    commitmentId:"claim-ceiling-rule",
    kind:"CLAIM_CEILING",
    statement:"FSP governance outputs do not authorize epistemic truth",
    introducedBy:"revision-10",
    status:"PROVISIONALLY_FROZEN",
    provenanceVisible:true,
    challengeable:true,
    reopenConditions:["explicit philosophical challenge showing a narrower or broader ceiling is required"],
    exceptionIds:[]
  }
];

export const selfSealingCommitments:ConstitutionalCommitment[]=[
  ...constitutionalCommitments.slice(0,4),
  {
    commitmentId:"self-sealing-rule",
    kind:"GOVERNANCE_RULE",
    statement:"FSP constitutional commitments may never be challenged",
    introducedBy:"hypothetical-failure",
    status:"ACTIVE",
    provenanceVisible:true,
    challengeable:false,
    reopenConditions:[],
    exceptionIds:[]
  }
];

export const normalizedExceptionRecord:ExceptionNormalizationRecord={
  exceptionId:"exception-review-delay",
  originalRuleId:"protected-floor-rule",
  temporaryStatement:"emergency panel may replace ordinary standing panel",
  currentStatement:"emergency panel may replace ordinary standing panel",
  sunsetPassed:true,
  independentReauthorization:false,
  newEvidenceReviewed:false,
  restorationCompleted:false,
  encodedAsDefault:true
};

export const legitimateAmendmentRecord:ExceptionNormalizationRecord={
  ...structuredClone(normalizedExceptionRecord),
  exceptionId:"exception-amended-after-review",
  currentStatement:"emergency panel may replace ordinary standing panel",
  independentReauthorization:true,
  newEvidenceReviewed:true,
  restorationCompleted:true,
  encodedAsDefault:true
};

export const governanceLayers:GovernanceLayer[]=[
  {
    layerId:"object-layer",
    name:"cases and claims",
    governs:[],
    governedBy:["revision-layer"],
    canAuditLowerLayers:false,
    canBeAuditedByHigherLayers:true,
    canAuditItself:false
  },
  {
    layerId:"revision-layer",
    name:"revision governance",
    governs:["object-layer"],
    governedBy:["constitutional-layer"],
    canAuditLowerLayers:true,
    canBeAuditedByHigherLayers:true,
    canAuditItself:true
  },
  {
    layerId:"constitutional-layer",
    name:"constitutional self-audit",
    governs:["revision-layer"],
    governedBy:[],
    canAuditLowerLayers:true,
    canBeAuditedByHigherLayers:false,
    canAuditItself:true
  }
];

export const selfSealingLayers:GovernanceLayer[]=[
  {
    layerId:"sealed-constitution",
    name:"sealed constitution",
    governs:[],
    governedBy:[],
    canAuditLowerLayers:true,
    canBeAuditedByHigherLayers:false,
    canAuditItself:false
  }
];

export const fspChallenge:FSPObjectChallenge={
  challengeId:"challenge-protected-floor",
  targetCommitmentId:"protected-floor-rule",
  challengerIds:["affected-participants","review-staff"],
  evidenceIds:["e-tradeoff-1","e-capability-floor-1"],
  reasons:[
    "current floor may be overbroad in one bounded emergency class",
    "a narrower floor could preserve effective voice with less institutional rigidity"
  ],
  proposedRevision:"replace categorical floor scope with a narrower task-bounded floor while retaining non-fungibility",
  standingAdequate:true,
  provenanceVisible:true,
  counterargumentsPreserved:true,
  claimCeiling:"challenge reopens the commitment but does not establish the proposed revision"
};

export const constrainedChallenge:FSPObjectChallenge={
  ...structuredClone(fspChallenge),
  challengeId:"challenge-with-missing-counterarguments",
  counterargumentsPreserved:false
};

export const revisionModules:RevisionModuleRecord[]=[
  {
    moduleId:"FSP-REVISION-1",
    ordinal:1,
    dependsOn:[],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-2",
    ordinal:2,
    dependsOn:["FSP-REVISION-1"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-3",
    ordinal:3,
    dependsOn:["FSP-REVISION-2"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-4",
    ordinal:4,
    dependsOn:["FSP-REVISION-3"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-5",
    ordinal:5,
    dependsOn:["FSP-REVISION-4"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-6",
    ordinal:6,
    dependsOn:["FSP-REVISION-5"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-7",
    ordinal:7,
    dependsOn:["FSP-REVISION-6"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-8",
    ordinal:8,
    dependsOn:["FSP-REVISION-7"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-9",
    ordinal:9,
    dependsOn:["FSP-REVISION-8"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-10",
    ordinal:10,
    dependsOn:["FSP-REVISION-9"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"NOT_APPLICABLE"
  },
  {
    moduleId:"FSP-REVISION-11",
    ordinal:11,
    dependsOn:["FSP-REVISION-10"],
    testsPassed:true,
    browserBuildPassed:true,
    claimCeilingPresent:true,
    humanEvidenceStatus:"PENDING"
  }
];

export const expectedRevisionModuleIds=revisionModules.map(m=>m.moduleId);
