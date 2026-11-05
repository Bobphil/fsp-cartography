import {
  BurdenShiftRecord,
  CapabilityFloor,
  CompensationBoundary,
  PartyAuthorization,
  RepairLegitimacyInput
} from "./revision10";

export const protectedFloors:CapabilityFloor[]=[
  {
    floorId:"floor-effective-voice",
    capabilityId:"effective-voice",
    groupId:"future-participants",
    description:"minimum capability to raise a complaint, contest interpretation, and request reopen",
    protectedMinimum:"meaningful complaint, contestability, and reopen access",
    breachConditions:[
      "loss of complaint access",
      "loss of contestability",
      "loss of reopen access"
    ],
    waivable:false
  },
  {
    floorId:"floor-independent-appeal",
    capabilityId:"appeal-capacity",
    groupId:"later-participants",
    description:"minimum capability to seek independent review",
    protectedMinimum:"independent appeal remains available",
    breachConditions:[
      "loss of independent appeal"
    ],
    waivable:false
  }
];

export const compensableBoundary:CompensationBoundary={
  boundaryId:"boundary-admin-workload",
  groupId:"review-staff",
  capabilityId:"administrative-capacity",
  loss:"higher review workload",
  proposedCompensation:[
    "additional staffing",
    "automation of clerical steps",
    "reduced unrelated workload"
  ],
  status:"COMPENSABLE",
  reasons:[
    "loss concerns workload rather than protected standing or basic contestability"
  ]
};

export const floorBreachBoundary:CompensationBoundary={
  boundaryId:"boundary-future-voice",
  groupId:"future-participants",
  capabilityId:"effective-voice",
  loss:"loss of reopen access",
  proposedCompensation:[
    "financial credit",
    "faster processing"
  ],
  status:"COMPENSABLE",
  reasons:[
    "institution proposes fungible compensation"
  ]
};

export const unresolvedBoundary:CompensationBoundary={
  boundaryId:"boundary-review-discretion",
  groupId:"review-staff",
  capabilityId:"administrative-capacity",
  loss:"reduced unilateral discretion",
  proposedCompensation:[
    "shared decision authority"
  ],
  status:"UNRESOLVED",
  reasons:[
    "effect on professional responsibility remains disputed"
  ]
};

export const legitimateBurdenShift:BurdenShiftRecord[]=[
  {
    burdenId:"burden-review-workload",
    fromGroupId:"later-participants",
    toGroupId:"review-staff",
    burden:"higher review workload",
    newlyCreated:true,
    consented:true,
    exitMeaningful:true,
    voiceMeaningful:true,
    appealMeaningful:true,
    affectsProtectedFloor:false
  }
];

export const illegitimateBurdenShift:BurdenShiftRecord[]=[
  {
    burdenId:"burden-future-access",
    fromGroupId:"review-staff",
    toGroupId:"future-participants",
    burden:"reduced ability to request reopen",
    newlyCreated:true,
    consented:false,
    exitMeaningful:false,
    voiceMeaningful:false,
    appealMeaningful:false,
    affectsProtectedFloor:true
  }
];

export const pluralAuthorization:PartyAuthorization[]=[
  {
    partyId:"participants-party",
    affectedGroupIds:["later-participants","future-participants"],
    authorization:"AUTHORIZE",
    reasons:[
      "restores independent appeal",
      "preserves reopen rights"
    ],
    conditions:[],
    standingAdequate:true,
    coercionRisk:"LOW"
  },
  {
    partyId:"review-staff-party",
    affectedGroupIds:["review-staff"],
    authorization:"AUTHORIZE",
    reasons:[
      "clarifies professional responsibility",
      "creates better evidence records"
    ],
    conditions:[],
    standingAdequate:true,
    coercionRisk:"LOW"
  },
  {
    partyId:"origin-contributors-party",
    affectedGroupIds:["origin-contributors"],
    authorization:"AUTHORIZE",
    reasons:[
      "restores provenance",
      "protects minority-report preservation"
    ],
    conditions:[],
    standingAdequate:true,
    coercionRisk:"LOW"
  }
];

export const conditionalAuthorization:PartyAuthorization[]=[
  ...pluralAuthorization.slice(0,2),
  {
    partyId:"origin-contributors-party",
    affectedGroupIds:["origin-contributors"],
    authorization:"CONDITIONALLY_AUTHORIZE",
    reasons:[
      "repair is acceptable only if provenance remains visible"
    ],
    conditions:[
      "retain origin-contributor provenance"
    ],
    standingAdequate:true,
    coercionRisk:"LOW"
  }
];

export const coercedAuthorization:PartyAuthorization[]=[
  ...pluralAuthorization.slice(0,2),
  {
    partyId:"origin-contributors-party",
    affectedGroupIds:["origin-contributors"],
    authorization:"AUTHORIZE",
    reasons:[
      "authorization given under employment threat"
    ],
    conditions:[],
    standingAdequate:true,
    coercionRisk:"SEVERE"
  }
];

export function makeLegitimacyInput(
  burdenAudit:any,
  compensationBoundaries:CompensationBoundary[]
):RepairLegitimacyInput{
  return {
    repairId:"repair-review-system",
    protectedFloors,
    compensationBoundaries,
    burdenAudit,
    evidenceVisible:true,
    minorityReportsPreserved:true,
    reopenAvailable:true,
    appealIndependent:true,
    retaliationRisk:"LOW"
  };
}
