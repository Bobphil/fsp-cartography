import {
  ConceptGenealogy,
  CrossGenerationTranslation
} from "./revision7";
import {
  counterPublicConcept
} from "./revision6Fixtures";

export const interpretiveExclusionGenealogy:ConceptGenealogy={
  concept:counterPublicConcept,
  versions:[
    {
      versionId:"v1-origin",
      conceptId:"concept-counter",
      ordinal:1,
      periodLabel:"origin-community formulation",
      definition:"a recurring pattern in which available institutional categories systematically fail to represent a class of reported experiences",
      contrastSet:["isolated misunderstanding","mere disagreement"],
      claimedScope:"bounded recurring institutional pattern",
      contributorIds:["m3","m4"],
      provenanceVisible:true
    },
    {
      versionId:"v2-policy",
      conceptId:"concept-counter",
      ordinal:2,
      periodLabel:"institutional policy adoption",
      definition:"a recurring communication-access problem in which institutional categories may fail to represent reported experiences",
      contrastSet:["ordinary communication difficulty","isolated misunderstanding"],
      claimedScope:"institutional communication and complaint-handling practice",
      contributorIds:["m3","m4","institution-policy-team"],
      provenanceVisible:true
    },
    {
      versionId:"v3-training",
      conceptId:"concept-counter",
      ordinal:3,
      periodLabel:"later training-manual usage",
      definition:"a communication issue that can arise when standard categories do not fit a participant's report",
      contrastSet:["clear communication"],
      claimedScope:"general organizational communication training",
      contributorIds:["institution-training-team"],
      provenanceVisible:false
    }
  ],
  sedimentationEvents:[
    {
      eventId:"s1-policy",
      conceptId:"concept-counter",
      fromVersionId:"v1-origin",
      toVersionId:"v2-policy",
      carrier:"POLICY",
      institutionId:"institution",
      retainedFeatures:["category-fit problem","recurring institutional pattern"],
      alteredFeatures:["structural exclusion reframed as communication access"],
      omittedFeatures:["some origin-community account of power"],
      addedUses:["complaint-handling policy"],
      provenancePreserved:true,
      contestabilityPreserved:true
    },
    {
      eventId:"s2-training",
      conceptId:"concept-counter",
      fromVersionId:"v2-policy",
      toVersionId:"v3-training",
      carrier:"CURRICULUM",
      institutionId:"institution-training-office",
      retainedFeatures:["category-fit problem"],
      alteredFeatures:["institutional pattern reframed as generic communication issue"],
      omittedFeatures:["recurrence","power","origin-community history"],
      addedUses:["general communication training"],
      provenancePreserved:false,
      contestabilityPreserved:false
    }
  ]
};

export const originToPolicyTranslation:CrossGenerationTranslation={
  translationId:"cg-origin-policy",
  conceptId:"concept-counter",
  fromVersionId:"v1-origin",
  toVersionId:"v2-policy",
  task:"compare origin-community concept with institutional policy use",
  status:"CONTINUITY_WITH_REMAINDER",
  preservedFeatures:["category-fit problem","recurring institutional pattern"],
  changedFeatures:["power emphasis reduced","communication-access framing added"],
  remainder:["origin-community account of power is only partially preserved"],
  backProjectionRisk:false
};

export const originToTrainingTranslation:CrossGenerationTranslation={
  translationId:"cg-origin-training",
  conceptId:"concept-counter",
  fromVersionId:"v1-origin",
  toVersionId:"v3-training",
  task:"compare origin concept with later training-manual usage",
  status:"PARTIAL_INHERITANCE",
  preservedFeatures:["category-fit problem"],
  changedFeatures:["structural recurrence reduced","scope generalized"],
  remainder:["power, recurrence, and contributor history are not preserved"],
  backProjectionRisk:true
};

export const falseFriendTranslation:CrossGenerationTranslation={
  translationId:"cg-false-friend",
  conceptId:"concept-counter",
  fromVersionId:"v3-training",
  toVersionId:"v1-origin",
  task:"read the earlier concept through the later training meaning",
  status:"FALSE_FRIEND",
  preservedFeatures:["similar label and category-fit theme"],
  changedFeatures:["later generic communication meaning is projected backward"],
  remainder:["earlier structural and power dimensions disappear"],
  backProjectionRisk:true
};
