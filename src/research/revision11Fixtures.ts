import {
  EmergencyCondition,
  NonIdealAuthorizationInput,
  RestorationPlan,
  SunsetReviewRule,
  TemporaryFloorException
} from "./revision11";
import {
  protectedFloors,
  pluralAuthorization
} from "./revision10Fixtures";

export const emergencyCondition:EmergencyCondition={
  emergencyId:"emergency-review-backlog",
  description:"systemic review failure creates immediate risk that time-sensitive complaints cannot be processed before irreversible consequences occur",
  severity:"SYSTEMIC",
  evidenceIds:["e-backlog-1","e-harm-window-1"],
  affectedGroupIds:["later-participants","future-participants","review-staff"],
  ordinaryGovernanceInsufficient:true,
  urgency:"delay risks irreversible loss before ordinary appeal can complete",
  alternativesConsidered:[
    "temporary triage staffing",
    "extended review hours"
  ]
};

export const legitimateTemporaryException:TemporaryFloorException={
  exceptionId:"exception-review-delay",
  emergencyId:"emergency-review-backlog",
  floorId:"floor-independent-appeal",
  groupId:"later-participants",
  capabilityId:"appeal-capacity",
  temporaryRestriction:"appeal review may use an emergency panel rather than the ordinary standing panel",
  necessityRationale:[
    "ordinary standing panel cannot meet the emergency harm window"
  ],
  lessRestrictiveAlternatives:[],
  residualCapability:[
    "independent review remains available",
    "written objection remains available",
    "retrospective ordinary-panel review remains available"
  ],
  startOrdinal:10,
  sunsetOrdinal:20,
  renewable:false,
  independentReviewRequired:true,
  minorityReportRequired:true,
  restorationPlanId:"restore-normal-review"
};

export const lessRestrictiveAlternativeException:TemporaryFloorException={
  ...structuredClone(legitimateTemporaryException),
  exceptionId:"exception-blocked-alternative",
  lessRestrictiveAlternatives:[
    "temporary staffing increase preserves ordinary panel independence"
  ]
};

export const noResidualCapabilityException:TemporaryFloorException={
  ...structuredClone(legitimateTemporaryException),
  exceptionId:"exception-no-residual",
  residualCapability:[]
};

export const validSunsetRule:SunsetReviewRule={
  ruleId:"sunset-review-rule",
  exceptionId:"exception-review-delay",
  reviewOrdinals:[12,16,19],
  sunsetOrdinal:20,
  automaticExpiration:true,
  renewalRequiresNewAuthorization:true,
  renewalRequiresNewEvidence:true,
  renewalRequiresIndependentReview:true
};

export const weakSunsetRule:SunsetReviewRule={
  ...structuredClone(validSunsetRule),
  ruleId:"weak-sunset",
  automaticExpiration:false,
  renewalRequiresNewAuthorization:false,
  renewalRequiresNewEvidence:false,
  renewalRequiresIndependentReview:false
};

export const constrainedAuthorization:NonIdealAuthorizationInput={
  parties:[
    pluralAuthorization[0],
    pluralAuthorization[1]
  ],
  requiredAffectedGroups:[
    "later-participants",
    "future-participants",
    "review-staff",
    "origin-contributors"
  ],
  unavailableGroups:["origin-contributors"],
  emergencyEvidenceVisible:true,
  proxyRepresentation:["origin-contributors"],
  independentReviewerPresent:true,
  retrospectiveReviewRequired:true
};

export const missingProxyAuthorization:NonIdealAuthorizationInput={
  ...structuredClone(constrainedAuthorization),
  proxyRepresentation:[]
};

export const restorationPlan:RestorationPlan={
  planId:"restore-normal-review",
  emergencyId:"emergency-review-backlog",
  exceptionIds:["exception-review-delay"],
  restorationSteps:[
    "restore ordinary standing panel",
    "clear emergency backlog",
    "publish emergency decisions",
    "conduct retrospective ordinary-panel review"
  ],
  restorationEvidence:[
    "backlog below normal threshold",
    "ordinary panel operational",
    "retrospective review complete"
  ],
  targetNormalGovernanceConditions:[
    "ordinary independent appeal restored",
    "ordinary minority-report process restored",
    "ordinary reopen process restored"
  ],
  deadlineOrdinal:30,
  reopenAfterRestoration:true
};

export const independentAppealFloor=protectedFloors.find(
  f=>f.floorId==="floor-independent-appeal"
);
