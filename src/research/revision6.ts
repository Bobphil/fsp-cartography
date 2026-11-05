export type ConceptOrigin =
  | "DOMINANT"
  | "COUNTER_PUBLIC"
  | "SHARED"
  | "EMERGENT"
  | "INSTITUTIONAL";

export interface ConceptRecord {
  conceptId:string;
  label:string;
  origin:ConceptOrigin;
  contributorIds:string[];
  evidenceIds:string[];
  definition:string;
  contrastSet:string[];
  claimedScope:string;
  provenanceVisible:boolean;
  contestable:boolean;
}

export type ConceptTranslationStatus =
  | "FULL_LOCAL"
  | "PARTIAL"
  | "STRUCTURAL"
  | "TASK_ONLY"
  | "NO_ADEQUATE_TRANSLATION";

export interface ConceptTranslation {
  translationId:string;
  fromConceptId:string;
  toConceptId:string;
  task:string;
  status:ConceptTranslationStatus;
  preservedFeatures:string[];
  lostFeatures:string[];
  remainder:string[];
  asymmetric:boolean;
}

export interface InterpretiveResourceSet {
  resourceId:string;
  label:string;
  conceptIds:string[];
  contributorIds:string[];
  evidenceIds:string[];
  dominant:boolean;
  contestable:boolean;
}

export interface ResourceCompetitionAudit {
  resourceIds:string[];
  overlappingConcepts:string[];
  incompatibleConcepts:string[];
  translationBridges:string[];
  unresolvedRemainders:string[];
  winner:null;
  claimCeiling:string;
}

export interface ConceptAdoptionRecord {
  adoptionId:string;
  conceptId:string;
  adoptingActorId:string;
  adoptedLabel:string;
  adoptedDefinition:string;
  retainedContributorIds:string[];
  provenanceVisible:boolean;
  contestableByOriginContributors:boolean;
  institutionalAuthorityExpanded:boolean;
  originalScope:string;
  adoptedScope:string;
}

export interface ConceptCaptureAudit {
  adoptionId:string;
  labelRetained:boolean;
  definitionShifted:boolean;
  provenanceErased:boolean;
  contributorsDisplaced:boolean;
  contestabilityReduced:boolean;
  scopeExpanded:boolean;
  possibleCapture:boolean;
  possibleCooption:boolean;
  reasons:string[];
  claimCeiling:string;
}

export type SharedLanguageStatus =
  | "SHARED_LANGUAGE_CONVERGENCE"
  | "PARTIAL_TRANSLATION_BRIDGE"
  | "PRACTICAL_COORDINATION_WITH_LEXICAL_PLURALISM"
  | "IRREDUCIBLE_LEXICAL_NONCONVERGENCE"
  | "DISTORTED_BY_CONCEPT_CAPTURE";

export interface SharedLanguageAudit {
  status:SharedLanguageStatus;
  sharedConceptIds:string[];
  translationIds:string[];
  coordinatedActions:string[];
  unresolvedRemainders:string[];
  requiresSingleVocabulary:false;
  oneVocabularyAuthorizesTruth:false;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

function normalized(value:string):string{
  return value.trim().replace(/\s+/g," ").toLowerCase();
}

export function validateConceptRecord(record:ConceptRecord):string[]{
  const failures:string[]=[];
  if(!record.conceptId.trim()) failures.push("missing-concept-id");
  if(!record.label.trim()) failures.push("missing-label");
  if(record.contributorIds.length===0) failures.push("missing-contributors");
  if(record.evidenceIds.length===0) failures.push("missing-evidence");
  if(!record.definition.trim()) failures.push("missing-definition");
  if(!record.provenanceVisible) failures.push("provenance-not-visible");
  return failures;
}

export function auditResourceCompetition(
  resources:InterpretiveResourceSet[],
  concepts:ConceptRecord[],
  translations:ConceptTranslation[]
):ResourceCompetitionAudit{
  if(resources.length<2) throw new Error("at least two resources required");

  const conceptById=new Map(concepts.map(c=>[c.conceptId,c]));
  const allConceptIds=resources.flatMap(r=>r.conceptIds);
  const counts=new Map<string,number>();
  for(const id of allConceptIds) counts.set(id,(counts.get(id)??0)+1);

  const overlappingConcepts=[...counts.entries()]
    .filter(([,count])=>count>1)
    .map(([id])=>id);

  const incompatibleConcepts:string[]=[];
  for(const a of resources){
    for(const b of resources){
      if(a.resourceId>=b.resourceId) continue;
      for(const aid of a.conceptIds){
        for(const bid of b.conceptIds){
          const t=translations.find(x=>
            (x.fromConceptId===aid && x.toConceptId===bid) ||
            (x.fromConceptId===bid && x.toConceptId===aid)
          );
          if(t?.status==="NO_ADEQUATE_TRANSLATION"){
            incompatibleConcepts.push(`${aid}<->${bid}`);
          }
        }
      }
    }
  }

  const translationBridges=translations
    .filter(t=>t.status!=="NO_ADEQUATE_TRANSLATION")
    .map(t=>t.translationId);

  const unresolvedRemainders=canonical(
    translations.flatMap(t=>t.remainder)
  );

  for(const id of allConceptIds){
    if(!conceptById.has(id)) throw new Error(`unknown concept: ${id}`);
  }

  return {
    resourceIds:canonical(resources.map(r=>r.resourceId)),
    overlappingConcepts:canonical(overlappingConcepts),
    incompatibleConcepts:canonical(incompatibleConcepts),
    translationBridges:canonical(translationBridges),
    unresolvedRemainders,
    winner:null,
    claimCeiling:
      "Competing interpretive resources may overlap, translate, or remain incompatible; the audit does not infer a uniquely correct vocabulary."
  };
}

export function auditConceptCapture(
  source:ConceptRecord,
  adoption:ConceptAdoptionRecord
):ConceptCaptureAudit{
  if(adoption.conceptId!==source.conceptId)
    throw new Error("adoption concept mismatch");

  const labelRetained=normalized(adoption.adoptedLabel)===normalized(source.label);
  const definitionShifted=normalized(adoption.adoptedDefinition)!==normalized(source.definition);
  const provenanceErased=!adoption.provenanceVisible;
  const contributorsDisplaced=
    source.contributorIds.some(id=>!adoption.retainedContributorIds.includes(id));
  const contestabilityReduced=!adoption.contestableByOriginContributors;
  const scopeExpanded=normalized(adoption.adoptedScope)!==normalized(source.claimedScope) &&
    adoption.adoptedScope.length>=source.claimedScope.length;

  const reasons:string[]=[];
  if(definitionShifted) reasons.push("definition shifted during adoption");
  if(provenanceErased) reasons.push("origin provenance erased");
  if(contributorsDisplaced) reasons.push("origin contributors displaced");
  if(contestabilityReduced) reasons.push("origin contributors cannot contest adopted meaning");
  if(scopeExpanded) reasons.push("adopted scope differs or expands");

  const possibleCapture=
    definitionShifted &&
    (provenanceErased || contributorsDisplaced || contestabilityReduced);

  const possibleCooption=
    labelRetained &&
    adoption.institutionalAuthorityExpanded &&
    possibleCapture;

  return {
    adoptionId:adoption.adoptionId,
    labelRetained,
    definitionShifted,
    provenanceErased,
    contributorsDisplaced,
    contestabilityReduced,
    scopeExpanded,
    possibleCapture,
    possibleCooption,
    reasons,
    claimCeiling:
      "This audit identifies represented semantic/provenance capture conditions; institutional adoption or semantic change alone does not prove wrongful co-option."
  };
}

export function auditSharedLanguage(
  concepts:ConceptRecord[],
  translations:ConceptTranslation[],
  coordinatedActions:string[],
  captureAudits:ConceptCaptureAudit[]
):SharedLanguageAudit{
  const sharedConceptIds=canonical(
    concepts.filter(c=>c.origin==="SHARED").map(c=>c.conceptId)
  );
  const translationIds=canonical(translations.map(t=>t.translationId));
  const unresolvedRemainders=canonical(
    translations.flatMap(t=>t.remainder)
  );

  let status:SharedLanguageStatus;

  if(captureAudits.some(a=>a.possibleCooption)){
    status="DISTORTED_BY_CONCEPT_CAPTURE";
  } else if(
    translations.length>0 &&
    translations.every(t=>t.status==="FULL_LOCAL") &&
    unresolvedRemainders.length===0
  ){
    status="SHARED_LANGUAGE_CONVERGENCE";
  } else if(
    translations.some(t=>["PARTIAL","STRUCTURAL","TASK_ONLY"].includes(t.status))
  ){
    status=coordinatedActions.length>0
      ? "PRACTICAL_COORDINATION_WITH_LEXICAL_PLURALISM"
      : "PARTIAL_TRANSLATION_BRIDGE";
  } else if(
    translations.some(t=>t.status==="NO_ADEQUATE_TRANSLATION")
  ){
    status=coordinatedActions.length>0
      ? "PRACTICAL_COORDINATION_WITH_LEXICAL_PLURALISM"
      : "IRREDUCIBLE_LEXICAL_NONCONVERGENCE";
  } else {
    status=sharedConceptIds.length>0
      ? "SHARED_LANGUAGE_CONVERGENCE"
      : "IRREDUCIBLE_LEXICAL_NONCONVERGENCE";
  }

  return {
    status,
    sharedConceptIds,
    translationIds,
    coordinatedActions:canonical(coordinatedActions),
    unresolvedRemainders,
    requiresSingleVocabulary:false,
    oneVocabularyAuthorizesTruth:false
  };
}
