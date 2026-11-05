import {
  ConceptAdoptionRecord,
  ConceptRecord,
  ConceptTranslation,
  InterpretiveResourceSet
} from "./revision6";

export const counterPublicConcept:ConceptRecord={
  conceptId:"concept-counter",
  label:"recurring interpretive exclusion",
  origin:"COUNTER_PUBLIC",
  contributorIds:["m3","m4"],
  evidenceIds:["e-counter-1","e-counter-2"],
  definition:"a recurring pattern in which available institutional categories systematically fail to represent a class of reported experiences",
  contrastSet:["isolated misunderstanding","mere disagreement"],
  claimedScope:"bounded recurring institutional pattern",
  provenanceVisible:true,
  contestable:true
};

export const dominantConcept:ConceptRecord={
  conceptId:"concept-dominant",
  label:"communication problem",
  origin:"DOMINANT",
  contributorIds:["institution-team"],
  evidenceIds:["e-dominant-1"],
  definition:"a communication failure between participants",
  contrastSet:["technical failure"],
  claimedScope:"general interpersonal communication failure",
  provenanceVisible:true,
  contestable:true
};

export const sharedBridgeConcept:ConceptRecord={
  conceptId:"concept-shared",
  label:"interpretive access failure",
  origin:"SHARED",
  contributorIds:["m3","institution-team"],
  evidenceIds:["e-counter-1","e-dominant-1"],
  definition:"a case in which a participant cannot adequately use available categories to make a relevant experience intelligible in the shared task",
  contrastSet:["ordinary disagreement"],
  claimedScope:"shared-task interpretation",
  provenanceVisible:true,
  contestable:true
};

export const partialTranslation:ConceptTranslation={
  translationId:"tr-partial",
  fromConceptId:"concept-counter",
  toConceptId:"concept-dominant",
  task:"compare accounts of recurring communication breakdown",
  status:"PARTIAL",
  preservedFeatures:["communication failure is recognized"],
  lostFeatures:["structural recurrence","institutional category failure"],
  remainder:["power and category-formation dimensions remain untranslated"],
  asymmetric:true
};

export const structuralTranslation:ConceptTranslation={
  translationId:"tr-structural",
  fromConceptId:"concept-counter",
  toConceptId:"concept-shared",
  task:"build a shared audit vocabulary",
  status:"STRUCTURAL",
  preservedFeatures:["interpretive failure","recurring structure","task relevance"],
  lostFeatures:["some counter-public historical meaning"],
  remainder:["origin-community history remains only partially represented"],
  asymmetric:true
};

export const noAdequateTranslation:ConceptTranslation={
  translationId:"tr-none",
  fromConceptId:"concept-counter",
  toConceptId:"concept-dominant",
  task:"preserve structural account of category formation",
  status:"NO_ADEQUATE_TRANSLATION",
  preservedFeatures:["some communication difficulty"],
  lostFeatures:["category-production history","institutional power","recurrence"],
  remainder:["core structural meaning cannot be represented without distortion"],
  asymmetric:true
};

export const counterResource:InterpretiveResourceSet={
  resourceId:"resource-counter",
  label:"counter-public vocabulary",
  conceptIds:["concept-counter"],
  contributorIds:["m3","m4"],
  evidenceIds:["e-counter-1","e-counter-2"],
  dominant:false,
  contestable:true
};

export const dominantResource:InterpretiveResourceSet={
  resourceId:"resource-dominant",
  label:"dominant vocabulary",
  conceptIds:["concept-dominant"],
  contributorIds:["institution-team"],
  evidenceIds:["e-dominant-1"],
  dominant:true,
  contestable:true
};

export const sharedResource:InterpretiveResourceSet={
  resourceId:"resource-shared",
  label:"shared bridge vocabulary",
  conceptIds:["concept-shared"],
  contributorIds:["m3","institution-team"],
  evidenceIds:["e-counter-1","e-dominant-1"],
  dominant:false,
  contestable:true
};

export const healthyAdoption:ConceptAdoptionRecord={
  adoptionId:"adopt-healthy",
  conceptId:"concept-counter",
  adoptingActorId:"institution",
  adoptedLabel:"recurring interpretive exclusion",
  adoptedDefinition:counterPublicConcept.definition,
  retainedContributorIds:["m3","m4"],
  provenanceVisible:true,
  contestableByOriginContributors:true,
  institutionalAuthorityExpanded:true,
  originalScope:counterPublicConcept.claimedScope,
  adoptedScope:counterPublicConcept.claimedScope
};

export const capturedAdoption:ConceptAdoptionRecord={
  adoptionId:"adopt-captured",
  conceptId:"concept-counter",
  adoptingActorId:"institution",
  adoptedLabel:"recurring interpretive exclusion",
  adoptedDefinition:"a generic communication inconvenience that can be resolved through standard training",
  retainedContributorIds:[],
  provenanceVisible:false,
  contestableByOriginContributors:false,
  institutionalAuthorityExpanded:true,
  originalScope:counterPublicConcept.claimedScope,
  adoptedScope:"all communication problems across the organization"
};
