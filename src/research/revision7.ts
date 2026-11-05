import { ConceptRecord } from "./revision6";

export type SedimentationCarrier =
  | "LAW"
  | "POLICY"
  | "TEXTBOOK"
  | "CURRICULUM"
  | "PROFESSIONAL_PRACTICE"
  | "RITUAL"
  | "TECHNICAL_STANDARD"
  | "INSTITUTIONAL_FORM";

export interface ConceptVersion {
  versionId:string;
  conceptId:string;
  ordinal:number;
  periodLabel:string;
  definition:string;
  contrastSet:string[];
  claimedScope:string;
  contributorIds:string[];
  provenanceVisible:boolean;
}

export interface SedimentationEvent {
  eventId:string;
  conceptId:string;
  fromVersionId:string;
  toVersionId:string;
  carrier:SedimentationCarrier;
  institutionId:string;
  retainedFeatures:string[];
  alteredFeatures:string[];
  omittedFeatures:string[];
  addedUses:string[];
  provenancePreserved:boolean;
  contestabilityPreserved:boolean;
}

export interface ConceptGenealogy {
  concept:ConceptRecord;
  versions:ConceptVersion[];
  sedimentationEvents:SedimentationEvent[];
}

export interface SemanticDriftAudit {
  conceptId:string;
  versionPath:string[];
  definitionDrift:boolean;
  scopeDrift:boolean;
  contrastDrift:boolean;
  provenanceLoss:boolean;
  contestabilityLoss:boolean;
  retainedFeatures:string[];
  accumulatedOmissions:string[];
  accumulatedAdditions:string[];
  formationHistory:string[];
  justificationStatus:"NOT_ESTABLISHED_BY_PERSISTENCE";
}

export type CrossGenerationTranslationStatus =
  | "CONTINUITY_WITH_REMAINDER"
  | "PARTIAL_INHERITANCE"
  | "STRUCTURAL_ANALOGY"
  | "FALSE_FRIEND"
  | "NO_ADEQUATE_TRANSLATION";

export interface CrossGenerationTranslation {
  translationId:string;
  conceptId:string;
  fromVersionId:string;
  toVersionId:string;
  task:string;
  status:CrossGenerationTranslationStatus;
  preservedFeatures:string[];
  changedFeatures:string[];
  remainder:string[];
  backProjectionRisk:boolean;
}

export interface FormationJustificationAudit {
  conceptId:string;
  persistenceEvidence:string[];
  formationExplanations:string[];
  independentJustifications:string[];
  currentContestations:string[];
  formationExplainsPersistence:boolean;
  persistenceJustifiesCurrentUse:false;
  independentJustificationRequired:true;
  conclusion:string;
}

export type HistoricalReopenTrigger =
  | "SEMANTIC_DRIFT"
  | "PROVENANCE_LOSS"
  | "CONTESTABILITY_LOSS"
  | "TASK_CHANGE"
  | "NEW_EVIDENCE"
  | "CROSS_GENERATION_FALSE_FRIEND"
  | "CAPTURED_SEDIMENTATION";

export interface HistoricalReopenAudit {
  conceptId:string;
  triggers:HistoricalReopenTrigger[];
  shouldReopen:boolean;
  inheritedUseMayContinueProvisionally:boolean;
  reasons:string[];
  historicalPersistenceAuthorizesUse:false;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}
function norm(v:string):string{
  return v.trim().replace(/\s+/g," ").toLowerCase();
}

export function validateGenealogy(genealogy:ConceptGenealogy):string[]{
  const failures:string[]=[];
  const versions=[...genealogy.versions].sort((a,b)=>a.ordinal-b.ordinal);
  if(versions.length<2) failures.push("fewer-than-two-versions");
  for(let i=1;i<versions.length;i++){
    if(versions[i].ordinal<=versions[i-1].ordinal)
      failures.push("non-increasing-version-order");
  }
  const versionIds=new Set(versions.map(v=>v.versionId));
  for(const event of genealogy.sedimentationEvents){
    if(event.conceptId!==genealogy.concept.conceptId)
      failures.push(`${event.eventId}:concept-mismatch`);
    if(!versionIds.has(event.fromVersionId) || !versionIds.has(event.toVersionId))
      failures.push(`${event.eventId}:unknown-version`);
  }
  return canonical(failures);
}

export function auditSemanticDrift(
  genealogy:ConceptGenealogy
):SemanticDriftAudit{
  const failures=validateGenealogy(genealogy);
  if(failures.length>0) throw new Error(failures.join(","));
  const versions=[...genealogy.versions].sort((a,b)=>a.ordinal-b.ordinal);
  const first=versions[0], last=versions[versions.length-1];

  const definitionDrift=norm(first.definition)!==norm(last.definition);
  const scopeDrift=norm(first.claimedScope)!==norm(last.claimedScope);
  const contrastDrift=
    canonical(first.contrastSet.map(norm)).join("|")!==
    canonical(last.contrastSet.map(norm)).join("|");

  const provenanceLoss=
    !last.provenanceVisible ||
    genealogy.sedimentationEvents.some(e=>!e.provenancePreserved);
  const contestabilityLoss=
    genealogy.sedimentationEvents.some(e=>!e.contestabilityPreserved);

  return {
    conceptId:genealogy.concept.conceptId,
    versionPath:versions.map(v=>v.versionId),
    definitionDrift,
    scopeDrift,
    contrastDrift,
    provenanceLoss,
    contestabilityLoss,
    retainedFeatures:canonical(
      genealogy.sedimentationEvents.flatMap(e=>e.retainedFeatures)
    ),
    accumulatedOmissions:canonical(
      genealogy.sedimentationEvents.flatMap(e=>e.omittedFeatures)
    ),
    accumulatedAdditions:canonical(
      genealogy.sedimentationEvents.flatMap(e=>e.addedUses)
    ),
    formationHistory:genealogy.sedimentationEvents.map(
      e=>`${e.carrier}:${e.institutionId}:${e.fromVersionId}->${e.toVersionId}`
    ),
    justificationStatus:"NOT_ESTABLISHED_BY_PERSISTENCE"
  };
}

export function auditCrossGenerationTranslation(
  translation:CrossGenerationTranslation,
  genealogy:ConceptGenealogy
):CrossGenerationTranslation{
  const ids=new Set(genealogy.versions.map(v=>v.versionId));
  if(!ids.has(translation.fromVersionId) || !ids.has(translation.toVersionId))
    throw new Error("translation references unknown version");
  if(translation.fromVersionId===translation.toVersionId)
    throw new Error("cross-generation translation requires distinct versions");
  return structuredClone(translation);
}

export function auditFormationJustification(
  conceptId:string,
  input:{
    persistenceEvidence:string[];
    formationExplanations:string[];
    independentJustifications:string[];
    currentContestations:string[];
  }
):FormationJustificationAudit{
  return {
    conceptId,
    persistenceEvidence:[...input.persistenceEvidence],
    formationExplanations:[...input.formationExplanations],
    independentJustifications:[...input.independentJustifications],
    currentContestations:[...input.currentContestations],
    formationExplainsPersistence:
      input.persistenceEvidence.length>0 && input.formationExplanations.length>0,
    persistenceJustifiesCurrentUse:false,
    independentJustificationRequired:true,
    conclusion:
      input.independentJustifications.length>0
        ? "Current use has independent represented reasons, which remain separately contestable."
        : "Persistence and formation explain inheritance but do not justify current use."
  };
}

export function auditHistoricalReopen(
  genealogy:ConceptGenealogy,
  translations:CrossGenerationTranslation[],
  options:{
    taskChanged:boolean;
    newEvidence:boolean;
    capturedSedimentation:boolean;
  }
):HistoricalReopenAudit{
  const drift=auditSemanticDrift(genealogy);
  const triggers:HistoricalReopenTrigger[]=[];
  if(drift.definitionDrift || drift.scopeDrift || drift.contrastDrift)
    triggers.push("SEMANTIC_DRIFT");
  if(drift.provenanceLoss) triggers.push("PROVENANCE_LOSS");
  if(drift.contestabilityLoss) triggers.push("CONTESTABILITY_LOSS");
  if(options.taskChanged) triggers.push("TASK_CHANGE");
  if(options.newEvidence) triggers.push("NEW_EVIDENCE");
  if(translations.some(t=>t.status==="FALSE_FRIEND" || t.backProjectionRisk))
    triggers.push("CROSS_GENERATION_FALSE_FRIEND");
  if(options.capturedSedimentation) triggers.push("CAPTURED_SEDIMENTATION");

  const unique=canonical(triggers) as HistoricalReopenTrigger[];
  return {
    conceptId:genealogy.concept.conceptId,
    triggers:unique,
    shouldReopen:unique.length>0,
    inheritedUseMayContinueProvisionally:
      !unique.includes("CAPTURED_SEDIMENTATION") &&
      !unique.includes("CROSS_GENERATION_FALSE_FRIEND"),
    reasons:unique.map(t=>`historical reopen trigger: ${t}`),
    historicalPersistenceAuthorizesUse:false
  };
}
