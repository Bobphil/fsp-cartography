import {
  GenerationCapabilityRecord,
  PolicyPracticeFeedback,
  RepairWindow,
  SedimentationNetwork
} from "./revision8";
import {
  interpretiveExclusionGenealogy
} from "./revision7Fixtures";
import {
  counterPublicConcept,
  sharedBridgeConcept
} from "./revision6Fixtures";

export const sharedBridgeGenealogy={
  concept:sharedBridgeConcept,
  versions:[
    {
      versionId:"sb-v1",
      conceptId:"concept-shared",
      ordinal:1,
      periodLabel:"joint bridge formulation",
      definition:sharedBridgeConcept.definition,
      contrastSet:sharedBridgeConcept.contrastSet,
      claimedScope:sharedBridgeConcept.claimedScope,
      contributorIds:sharedBridgeConcept.contributorIds,
      provenanceVisible:true
    },
    {
      versionId:"sb-v2",
      conceptId:"concept-shared",
      ordinal:2,
      periodLabel:"institutional procedure adoption",
      definition:"a procedure-level failure in which available categories do not support adequate participation in a shared task",
      contrastSet:["ordinary disagreement","simple access failure"],
      claimedScope:"institutional procedure and review",
      contributorIds:["m3","institution-team","review-office"],
      provenanceVisible:true
    }
  ],
  sedimentationEvents:[
    {
      eventId:"sb-s1",
      conceptId:"concept-shared",
      fromVersionId:"sb-v1",
      toVersionId:"sb-v2",
      carrier:"PROFESSIONAL_PRACTICE",
      institutionId:"review-office",
      retainedFeatures:["interpretive failure","task relevance"],
      alteredFeatures:["shared-task concept translated into procedural review language"],
      omittedFeatures:["some origin-community history"],
      addedUses:["formal review procedure"],
      provenancePreserved:true,
      contestabilityPreserved:true
    }
  ]
};

export const institutionalNetwork:SedimentationNetwork={
  networkId:"interpretive-review-ecology",
  nodes:[
    {nodeId:"concept-counter",kind:"CONCEPT",label:counterPublicConcept.label,generation:1},
    {nodeId:"concept-shared",kind:"CONCEPT",label:sharedBridgeConcept.label,generation:1},
    {nodeId:"policy-review",kind:"POLICY",label:"review and complaint policy",generation:2},
    {nodeId:"practice-intake",kind:"PRACTICE",label:"intake and review practice",generation:2},
    {nodeId:"institution-review",kind:"INSTITUTION",label:"review office",generation:2},
    {nodeId:"capability-voice",kind:"CAPABILITY",label:"effective voice in review",generation:3},
    {nodeId:"resource-training",kind:"RESOURCE",label:"training infrastructure",generation:3}
  ],
  edges:[
    {edgeId:"e1",fromNodeId:"concept-counter",toNodeId:"policy-review",type:"ENCODES",rationale:"policy incorporates concern about interpretive exclusion"},
    {edgeId:"e2",fromNodeId:"concept-shared",toNodeId:"policy-review",type:"ENCODES",rationale:"shared bridge concept structures procedure"},
    {edgeId:"e3",fromNodeId:"policy-review",toNodeId:"practice-intake",type:"CONSTRAINS",rationale:"policy shapes intake workflow"},
    {edgeId:"e4",fromNodeId:"practice-intake",toNodeId:"policy-review",type:"FEEDS_BACK_INTO",rationale:"practice experience prompts policy revision"},
    {edgeId:"e5",fromNodeId:"institution-review",toNodeId:"practice-intake",type:"REINFORCES",rationale:"office standardizes the practice"},
    {edgeId:"e6",fromNodeId:"practice-intake",toNodeId:"capability-voice",type:"ENABLES",rationale:"good intake can expand effective voice"},
    {edgeId:"e7",fromNodeId:"resource-training",toNodeId:"practice-intake",type:"REINFORCES",rationale:"training stabilizes practice"},
    {edgeId:"e8",fromNodeId:"practice-intake",toNodeId:"resource-training",type:"FEEDS_BACK_INTO",rationale:"practice generates training content"}
  ]
};

export const feedbackLoop:PolicyPracticeFeedback={
  loopId:"review-loop",
  policyNodeId:"policy-review",
  practiceNodeId:"practice-intake",
  conceptNodeIds:["concept-counter","concept-shared"],
  policyShapesPractice:true,
  practiceFeedsPolicy:true,
  amplification:[
    "repeated practice normalizes the policy categories",
    "training infrastructure reproduces intake categories"
  ],
  dampening:[
    "appeal and review can interrupt routine reproduction"
  ]
};

export const repairWindow:RepairWindow={
  windowId:"window-policy-review",
  trigger:"scheduled policy review plus new evidence of exclusion",
  openingConditions:[
    "scheduled-review-active",
    "new-evidence-available",
    "affected-participants-have-standing"
  ],
  closingConditions:[
    "policy-freeze-enacted",
    "retaliation-risk-severe"
  ],
  availableRepairs:[
    "revise policy categories",
    "restore contributor provenance",
    "add independent review",
    "change training materials",
    "add reopen clause"
  ],
  affectedNodeIds:["policy-review","practice-intake","resource-training"],
  windowOpen:false,
  repairMandatory:false
};

export const capabilityRecords:GenerationCapabilityRecord[]=[
  {
    generation:1,
    groupId:"origin-contributors",
    capabilityId:"effective-voice",
    effect:"EXPANDS",
    mechanism:"new concept makes recurring exclusion describable",
    inheritedFromNodeIds:["concept-counter"]
  },
  {
    generation:2,
    groupId:"policy-users",
    capabilityId:"effective-voice",
    effect:"EXPANDS",
    mechanism:"formal review policy creates recognized route for challenge",
    inheritedFromNodeIds:["policy-review","concept-shared"]
  },
  {
    generation:3,
    groupId:"later-participants",
    capabilityId:"effective-voice",
    effect:"MIXED",
    mechanism:"standardized procedure gives access but training categories narrow what counts as an intelligible complaint",
    inheritedFromNodeIds:["practice-intake","resource-training"]
  },
  {
    generation:4,
    groupId:"future-participants",
    capabilityId:"effective-voice",
    effect:"CONSTRAINS",
    mechanism:"locked-in categories make alternative formulations difficult to enter",
    inheritedFromNodeIds:["policy-review","practice-intake","resource-training"]
  }
];

export const conceptGenealogies=[
  interpretiveExclusionGenealogy,
  sharedBridgeGenealogy
];
