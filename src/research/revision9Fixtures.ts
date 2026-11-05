import {
  ExitVoiceAppealArchitecture,
  GenerationReopenRule,
  GroupCapabilityTradeoff,
  RepairSequence
} from "./revision9";

export const repairSequence:RepairSequence={
  sequenceId:"review-system-repair-sequence",
  recommendation:null,
  steps:[
    {
      stepId:"step-1-evidence",
      ordinal:1,
      type:"INFORMATION",
      description:"publish provenance and disparity evidence before changing authority",
      preconditions:["repair-window-open"],
      reversible:true,
      rollbackConditions:["archive-original-records"],
      affectedGroupIds:["origin-contributors","policy-users","later-participants"]
    },
    {
      stepId:"step-2-voice",
      ordinal:2,
      type:"PROCEDURAL",
      description:"restore voice, independent appeal, and minority-report preservation",
      preconditions:["repair-window-open","completed:step-1-evidence"],
      reversible:true,
      rollbackConditions:["appeal-records-preserved","minority-reports-preserved"],
      affectedGroupIds:["later-participants","future-participants"]
    },
    {
      stepId:"step-3-policy",
      ordinal:3,
      type:"POLICY",
      description:"revise policy categories after evidence and standing repairs",
      preconditions:["repair-window-open","completed:step-2-voice"],
      reversible:true,
      rollbackConditions:["prior-policy-version-retained"],
      affectedGroupIds:["policy-users","later-participants","future-participants"]
    },
    {
      stepId:"step-4-authority",
      ordinal:4,
      type:"AUTHORITY",
      description:"redistribute final review authority across independent reviewers and affected participants",
      preconditions:["repair-window-open","completed:step-3-policy"],
      reversible:false,
      rollbackConditions:[],
      affectedGroupIds:["institution-review","later-participants","future-participants"]
    }
  ]
};

export const policyTradeoffs:GroupCapabilityTradeoff[]=[
  {
    groupId:"later-participants",
    capabilityId:"effective-voice",
    before:"MIXED",
    after:"EXPANDS",
    gains:["broader admissible complaint categories","independent appeal"],
    losses:[],
    unknowns:[]
  },
  {
    groupId:"future-participants",
    capabilityId:"effective-voice",
    before:"CONSTRAINS",
    after:"EXPANDS",
    gains:["reopen rights","new concept entry"],
    losses:[],
    unknowns:["future administrative burden"]
  },
  {
    groupId:"review-staff",
    capabilityId:"administrative-capacity",
    before:"EXPANDS",
    after:"MIXED",
    gains:["clearer appeal record"],
    losses:["higher review workload","reduced unilateral discretion"],
    unknowns:[]
  }
];

export const noLossTradeoffs:GroupCapabilityTradeoff[]=[
  {
    groupId:"later-participants",
    capabilityId:"effective-voice",
    before:"MIXED",
    after:"EXPANDS",
    gains:["independent appeal"],
    losses:[],
    unknowns:[]
  },
  {
    groupId:"review-staff",
    capabilityId:"administrative-capacity",
    before:"MIXED",
    after:"EXPANDS",
    gains:["better evidence record"],
    losses:[],
    unknowns:[]
  }
];

export const participantArchitecture:ExitVoiceAppealArchitecture={
  groupId:"later-participants",
  exitAvailable:true,
  exitCost:["moderate switching cost"],
  voiceAvailable:true,
  voiceChannels:["minority report","review hearing","written objection"],
  appealAvailable:true,
  appealIndependent:true,
  retaliationRisk:"LOW"
};

export const constrainedArchitecture:ExitVoiceAppealArchitecture={
  groupId:"future-participants",
  exitAvailable:true,
  exitCost:["prohibitive loss of access"],
  voiceAvailable:true,
  voiceChannels:["internal complaint"],
  appealAvailable:true,
  appealIndependent:false,
  retaliationRisk:"ELEVATED"
};

export const reopenRules:GenerationReopenRule[]=[
  {
    ruleId:"reopen-g1",
    generation:1,
    triggers:["new-evidence","capability-loss"],
    requiredStandingGroups:["origin-contributors"],
    evidenceReviewRequired:true,
    capabilityReviewRequired:true,
    minorityReportReviewRequired:true,
    canReopen:true
  },
  {
    ruleId:"reopen-g2",
    generation:2,
    triggers:["policy-drift","new-evidence"],
    requiredStandingGroups:["policy-users","origin-contributors"],
    evidenceReviewRequired:true,
    capabilityReviewRequired:true,
    minorityReportReviewRequired:true,
    canReopen:true
  },
  {
    ruleId:"reopen-g3",
    generation:3,
    triggers:["capability-asymmetry","practice-drift"],
    requiredStandingGroups:["later-participants"],
    evidenceReviewRequired:true,
    capabilityReviewRequired:true,
    minorityReportReviewRequired:true,
    canReopen:true
  },
  {
    ruleId:"reopen-g4",
    generation:4,
    triggers:["inherited-burden","new-alternative"],
    requiredStandingGroups:["future-participants"],
    evidenceReviewRequired:true,
    capabilityReviewRequired:true,
    minorityReportReviewRequired:true,
    canReopen:true
  }
];
