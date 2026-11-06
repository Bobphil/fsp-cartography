import { CanonicalCaseDossier } from "./fiveCaseAtlas";
import {
  EcosystemEnvironment,
  EcosystemReturnToken,
  NEPTUNE_VULCAN_PROBE_BINDINGS,
  ProjectionBinding,
  ProjectedCanonicalObject,
  projectCanonicalObject
} from "./fspEcosystemBridge";
import {
  FspRelationGraph,
  RelationType,
  buildRelationGraph,
  outgoing
} from "./fspRelationGraph";

export type CanonicalDataFacet =
  | "IDENTITY"
  | "DOING"
  | "CLAIMS"
  | "EVIDENCE"
  | "WARRANTS"
  | "AUXILIARIES"
  | "BACKGROUND"
  | "MEANINGS"
  | "ONTOLOGY"
  | "TASK"
  | "STANDING"
  | "POWER_AUTHORITY"
  | "LIVE_POSSIBILITIES"
  | "REMAINDER"
  | "CLAIM_CEILING"
  | "FRAMEWORK"
  | "PROVENANCE"
  | "TRANSITION_STRUCTURE"
  | "PROBE_STRUCTURE"
  | "REOPEN";

export type ProjectionTransform =
  | "PLAIN_LANGUAGE"
  | "PROGRESSIVE_DISCLOSURE"
  | "SCAFFOLD"
  | "SEQUENCE"
  | "SPATIALIZE"
  | "TEMPORAL_REPLAY"
  | "PERSPECTIVE_SHIFT"
  | "DOMAIN_BIND"
  | "INSTRUMENT"
  | "AGGREGATE"
  | "COMPARE"
  | "ANNOTATE";

export interface ProjectionProfile {
  profileId:string;
  environment:EcosystemEnvironment;
  version:string;
  expose:CanonicalDataFacet[];
  transform:ProjectionTransform[];
  hideByDefault:CanonicalDataFacet[];
  requiredAdditions:string[];
  optionalAdditions:string[];
  allowedRelationTypes:RelationType[];
  requiredReturnFields:string[];
  returnArtifact:string;
  requiredStatusMarkers:string[];
  forbiddenMutations:string[];
  completionCriteria:string[];
}

export interface ProjectionPackage {
  packageId:string;
  profileId:string;
  profileVersion:string;
  environment:EcosystemEnvironment;
  canonical:{
    ref:ProjectedCanonicalObject["canonical"];
    fingerprint:string;
    claimCeiling:string[];
  };
  visibleFacets:CanonicalDataFacet[];
  hiddenFacets:CanonicalDataFacet[];
  transforms:ProjectionTransform[];
  overlays:ProjectedCanonicalObject["overlays"];
  affordances:string[];
  presentation:string[];
  additions:Record<string,string|string[]>;
  statusMarkers:string[];
  relationContext:{
    nodeId:string;
    allowedRelationTypes:RelationType[];
    outgoingEdgeIds:string[];
  };
  return:{
    token:EcosystemReturnToken;
    artifactType:string;
    requiredFields:string[];
  };
  governance:{
    bindingClaimCeilingPolicy:string;
    forbiddenMutations:string[];
    completionCriteria:string[];
  };
}

export interface ProjectionPackageValidation {
  passes:boolean;
  failures:string[];
}

const ALL_FACETS:CanonicalDataFacet[]=[
  "IDENTITY","DOING","CLAIMS","EVIDENCE","WARRANTS","AUXILIARIES","BACKGROUND",
  "MEANINGS","ONTOLOGY","TASK","STANDING","POWER_AUTHORITY","LIVE_POSSIBILITIES",
  "REMAINDER","CLAIM_CEILING","FRAMEWORK","PROVENANCE","TRANSITION_STRUCTURE",
  "PROBE_STRUCTURE","REOPEN"
];

export const PROJECTION_PROFILES:ProjectionProfile[]=[
  {
    profileId:"FSP-PROFILE-ENCYCLOPEDIA-1",
    environment:"ENCYCLOPEDIA",
    version:"1.0.0",
    expose:["IDENTITY","DOING","CLAIMS","EVIDENCE","WARRANTS","AUXILIARIES","MEANINGS","LIVE_POSSIBILITIES","REMAINDER","CLAIM_CEILING","PROVENANCE","TRANSITION_STRUCTURE","PROBE_STRUCTURE","REOPEN"],
    transform:["PLAIN_LANGUAGE","PROGRESSIVE_DISCLOSURE","ANNOTATE"],
    hideByDefault:["ONTOLOGY","POWER_AUTHORITY","FRAMEWORK"],
    requiredAdditions:["chapterOrigin","readerDepth","plainLanguageSummary"],
    optionalAdditions:["comparisonContext","readingTimeHint"],
    allowedRelationTypes:["ROUTES_TO","ILLUSTRATES","EXPLAINS","OPERATIONALIZES","SUPPORTED_BY","BOUNDED_BY","PROJECTS_AS","USES_CONCEPT","USES_TOOL","RETURNS_TOWARD"],
    requiredReturnFields:["originId","originLabel","depthOrMode","context"],
    returnArtifact:"exact prose/public-context return",
    requiredStatusMarkers:["canonical-versus-projection","probe-versus-history"],
    forbiddenMutations:["canonical identity","source identity","historical transition structure","claim ceiling","chapter routing authority"],
    completionCriteria:["canonical fingerprint retained","claim ceiling visible or one action away","return token complete","projection status visible"]
  },
  {
    profileId:"FSP-PROFILE-CLASSROOM-1",
    environment:"CLASSROOM",
    version:"1.0.0",
    expose:["IDENTITY","DOING","CLAIMS","EVIDENCE","WARRANTS","AUXILIARIES","TASK","LIVE_POSSIBILITIES","REMAINDER","CLAIM_CEILING","PROVENANCE","PROBE_STRUCTURE","REOPEN"],
    transform:["PLAIN_LANGUAGE","SCAFFOLD","SEQUENCE","ANNOTATE"],
    hideByDefault:["ONTOLOGY","FRAMEWORK","POWER_AUTHORITY","MEANINGS"],
    requiredAdditions:["learningObjective","estimatedMinutes","studentPrompt","outputCardSchema"],
    optionalAdditions:["rubricId","attemptPolicy","feedbackMode","accessibilitySupport"],
    allowedRelationTypes:["PRACTICED_AS","USES_CONCEPT","USES_TOOL","SUPPORTED_BY","BOUNDED_BY","RETURNS_TOWARD"],
    requiredReturnFields:["studentClaim","studentReason","remainingUncertainty","reopenCondition"],
    returnArtifact:"learner-authored bounded judgment/output card",
    requiredStatusMarkers:["scaffold-versus-canonical","student-authored-versus-system-supplied"],
    forbiddenMutations:["canonical evidence","canonical provenance","claim ceiling","learner authorship","historical status"],
    completionCriteria:["canonical fingerprint retained","task has learner-authored move","output card requires uncertainty","REOPEN field present","scaffolding does not contain final answer"]
  },
  {
    profileId:"FSP-PROFILE-VR-1",
    environment:"VR",
    version:"1.0.0",
    expose:["IDENTITY","DOING","EVIDENCE","AUXILIARIES","MEANINGS","TASK","STANDING","POWER_AUTHORITY","LIVE_POSSIBILITIES","REMAINDER","CLAIM_CEILING","PROVENANCE","TRANSITION_STRUCTURE","PROBE_STRUCTURE","REOPEN"],
    transform:["SPATIALIZE","TEMPORAL_REPLAY","PERSPECTIVE_SHIFT","PROGRESSIVE_DISCLOSURE","ANNOTATE"],
    hideByDefault:["BACKGROUND","WARRANTS","FRAMEWORK"],
    requiredAdditions:["sceneId","spatialLayout","interactionPrimitives","simulationStatus","debriefSchema"],
    optionalAdditions:["comfortMode","guidedMode","replaySpeed","overviewAnchor","scaffoldFadePolicy"],
    allowedRelationTypes:["SPATIALIZED_AS","PROJECTS_AS","USES_CONCEPT","USES_TOOL","SUPPORTED_BY","BOUNDED_BY","RETURNS_TOWARD"],
    requiredReturnFields:["experiencedChange","licensedInference","unlicensedInference","remainingUncertainty","reopenCondition"],
    returnArtifact:"non-immersive authorial debrief",
    requiredStatusMarkers:["simulation-versus-history","perspective-versus-person","spatial-relation-versus-semantic-relation"],
    forbiddenMutations:["canonical topology of inquiry","historical causation","evidential standing","claim ceiling","simulation status"],
    completionCriteria:["canonical fingerprint retained","simulation status persistent","overview return available","debrief required before completion","immersive salience cannot raise claim strength"]
  },
  {
    profileId:"FSP-PROFILE-APPLICATION-1",
    environment:"APPLICATION",
    version:"1.0.0",
    expose:["IDENTITY","DOING","CLAIMS","EVIDENCE","WARRANTS","TASK","STANDING","POWER_AUTHORITY","LIVE_POSSIBILITIES","REMAINDER","CLAIM_CEILING","PROVENANCE","REOPEN"],
    transform:["DOMAIN_BIND","PROGRESSIVE_DISCLOSURE","ANNOTATE"],
    hideByDefault:["ONTOLOGY","FRAMEWORK","BACKGROUND","MEANINGS"],
    requiredAdditions:["targetDomain","domainAuthority","affectedParties","permissionsModel","contestabilityPath","transferLimitations"],
    optionalAdditions:["institutionalConstraints","liveOperationalState","appealPath","auditOwner"],
    allowedRelationTypes:["TRANSFERRED_AS","USES_CONCEPT","USES_TOOL","SUPPORTED_BY","BOUNDED_BY","RETURNS_TOWARD"],
    requiredReturnFields:["domainJudgmentOwner","decisionAuthority","affectedPartyReview","remainingUncertainty","reopenCondition"],
    returnArtifact:"domain-owned bounded decision or inquiry record",
    requiredStatusMarkers:["analogy-versus-domain-evidence","possibility-versus-recommendation","recommendation-versus-authorization"],
    forbiddenMutations:["domain authority","affected-party standing","canonical source claims","claim ceiling","transfer limitation"],
    completionCriteria:["canonical fingerprint retained","domain authority named","affected parties represented","contestability path present","no inherited authorization from source case"]
  },
  {
    profileId:"FSP-PROFILE-RESEARCH-1",
    environment:"RESEARCH",
    version:"1.0.0",
    expose:["IDENTITY","DOING","CLAIMS","EVIDENCE","WARRANTS","TASK","REMAINDER","CLAIM_CEILING","PROVENANCE","TRANSITION_STRUCTURE","PROBE_STRUCTURE","REOPEN"],
    transform:["INSTRUMENT","AGGREGATE","COMPARE","ANNOTATE"],
    hideByDefault:["ONTOLOGY","POWER_AUTHORITY","MEANINGS"],
    requiredAdditions:["studyId","hypothesis","measures","comparisonCondition","failureCriteria","analysisPlan"],
    optionalAdditions:["preregistrationRef","sampleDescriptor","randomizationPolicy","replicationStatus"],
    allowedRelationTypes:["EVALUATED_BY","PROJECTS_AS","USES_CONCEPT","USES_TOOL","SUPPORTED_BY","BOUNDED_BY"],
    requiredReturnFields:["result","failureFlags","limitations","architectureImplication","reopenCondition"],
    returnArtifact:"research audit returning evidence to architecture revision",
    requiredStatusMarkers:["measure-versus-construct","performance-versus-validity","result-versus-authorization"],
    forbiddenMutations:["canonical object between conditions","negative-result visibility","claim ceiling","measurement provenance"],
    completionCriteria:["canonical fingerprint retained across conditions","failure criteria explicit","negative outcomes recordable","result cannot certify ontology","limitations required"]
  }
];

export function profileFor(environment:EcosystemEnvironment):ProjectionProfile{
  const profile=PROJECTION_PROFILES.find(p=>p.environment===environment);
  if(!profile) throw new Error(`missing projection profile: ${environment}`);
  return structuredClone(profile);
}

function projectionNodeId(binding:ProjectionBinding):string{
  return `projection:${binding.environment}:${binding.projectionId}`;
}

export function validateProjectionProfiles(
  profiles:ProjectionProfile[]=PROJECTION_PROFILES
):ProjectionPackageValidation{
  const failures:string[]=[];
  const environments:EcosystemEnvironment[]=["ENCYCLOPEDIA","CLASSROOM","VR","APPLICATION","RESEARCH"];
  if(profiles.length!==environments.length) failures.push("profile-count");
  for(const env of environments){
    const matching=profiles.filter(p=>p.environment===env);
    if(matching.length!==1) failures.push(`${env}:profile-cardinality`);
  }
  for(const p of profiles){
    if(new Set(p.expose).size!==p.expose.length) failures.push(`${p.profileId}:duplicate-expose`);
    if(new Set(p.hideByDefault).size!==p.hideByDefault.length) failures.push(`${p.profileId}:duplicate-hide`);
    const overlap=p.expose.filter(x=>p.hideByDefault.includes(x));
    if(overlap.length) failures.push(`${p.profileId}:expose-hide-overlap:${overlap.join(",")}`);
    for(const facet of [...p.expose,...p.hideByDefault]){
      if(!ALL_FACETS.includes(facet)) failures.push(`${p.profileId}:unknown-facet:${facet}`);
    }
    if(!p.requiredAdditions.length) failures.push(`${p.profileId}:missing-required-additions`);
    if(!p.requiredReturnFields.length) failures.push(`${p.profileId}:missing-return-fields`);
    if(!p.returnArtifact.trim()) failures.push(`${p.profileId}:missing-return-artifact`);
    if(!p.requiredStatusMarkers.length) failures.push(`${p.profileId}:missing-status-markers`);
    if(!p.forbiddenMutations.includes("claim ceiling")) failures.push(`${p.profileId}:claim-ceiling-not-protected`);
    if(!p.completionCriteria.some(x=>x.includes("canonical fingerprint retained"))) failures.push(`${p.profileId}:fingerprint-not-required`);
  }
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}

export function compileProjectionPackage(
  binding:ProjectionBinding,
  dossiers:CanonicalCaseDossier[],
  graph:FspRelationGraph,
  returnToken:EcosystemReturnToken,
  additions:Record<string,string|string[]>,
  statusMarkers:string[]
):ProjectionPackage{
  const profile=profileFor(binding.environment);
  const projected=projectCanonicalObject(binding,dossiers,returnToken);
  const missingAdditions=profile.requiredAdditions.filter(k=>!(k in additions));
  if(missingAdditions.length) throw new Error(`missing required additions: ${missingAdditions.join(",")}`);
  const missingMarkers=profile.requiredStatusMarkers.filter(x=>!statusMarkers.includes(x));
  if(missingMarkers.length) throw new Error(`missing required status markers: ${missingMarkers.join(",")}`);

  const nodeId=projectionNodeId(binding);
  if(!graph.nodes.some(n=>n.nodeId===nodeId)) throw new Error(`projection missing from relation graph: ${nodeId}`);
  const outgoingEdges=outgoing(graph,nodeId,profile.allowedRelationTypes);

  return {
    packageId:`${binding.projectionId}@${profile.version}`,
    profileId:profile.profileId,
    profileVersion:profile.version,
    environment:binding.environment,
    canonical:{
      ref:structuredClone(projected.canonical),
      fingerprint:projected.canonicalFingerprint,
      claimCeiling:structuredClone(projected.claimCeiling)
    },
    visibleFacets:structuredClone(profile.expose),
    hiddenFacets:structuredClone(profile.hideByDefault),
    transforms:structuredClone(profile.transform),
    overlays:structuredClone(projected.overlays),
    affordances:structuredClone(projected.affordances),
    presentation:structuredClone(projected.presentation),
    additions:structuredClone(additions),
    statusMarkers:structuredClone(statusMarkers),
    relationContext:{
      nodeId,
      allowedRelationTypes:structuredClone(profile.allowedRelationTypes),
      outgoingEdgeIds:outgoingEdges.map(e=>e.edgeId).sort()
    },
    return:{
      token:structuredClone(returnToken),
      artifactType:profile.returnArtifact,
      requiredFields:structuredClone(profile.requiredReturnFields)
    },
    governance:{
      bindingClaimCeilingPolicy:binding.claimCeilingPolicy,
      forbiddenMutations:structuredClone(profile.forbiddenMutations),
      completionCriteria:structuredClone(profile.completionCriteria)
    }
  };
}

export function validateProjectionPackage(
  pkg:ProjectionPackage,
  binding:ProjectionBinding,
  dossiers:CanonicalCaseDossier[],
  graph:FspRelationGraph
):ProjectionPackageValidation{
  const failures:string[]=[];
  const profile=profileFor(pkg.environment);
  const canonical=projectCanonicalObject(binding,dossiers,pkg.return.token);

  if(pkg.profileId!==profile.profileId) failures.push("profile-id-mismatch");
  if(pkg.profileVersion!==profile.version) failures.push("profile-version-mismatch");
  if(pkg.environment!==binding.environment) failures.push("environment-mismatch");
  if(pkg.canonical.fingerprint!==canonical.canonicalFingerprint) failures.push("canonical-fingerprint-drift");
  if(JSON.stringify(pkg.canonical.ref)!==JSON.stringify(canonical.canonical)) failures.push("canonical-ref-drift");
  if(JSON.stringify(pkg.canonical.claimCeiling)!==JSON.stringify(canonical.claimCeiling)) failures.push("claim-ceiling-drift");
  if(pkg.visibleFacets.some(x=>pkg.hiddenFacets.includes(x))) failures.push("visible-hidden-overlap");

  for(const k of profile.requiredAdditions){
    if(!(k in pkg.additions)) failures.push(`missing-addition:${k}`);
  }
  for(const marker of profile.requiredStatusMarkers){
    if(!pkg.statusMarkers.includes(marker)) failures.push(`missing-marker:${marker}`);
  }
  for(const rel of pkg.relationContext.allowedRelationTypes){
    if(!profile.allowedRelationTypes.includes(rel)) failures.push(`relation-not-permitted:${rel}`);
  }
  if(!graph.nodes.some(n=>n.nodeId===pkg.relationContext.nodeId)) failures.push("unknown-relation-node");
  if(pkg.return.token.environment!==pkg.environment) failures.push("return-environment-mismatch");
  if(JSON.stringify(pkg.return.requiredFields)!==JSON.stringify(profile.requiredReturnFields)) failures.push("return-fields-drift");
  if(pkg.return.artifactType!==profile.returnArtifact) failures.push("return-artifact-drift");

  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}

export const NEPTUNE_VULCAN_PROFILE_EXAMPLES:Record<EcosystemEnvironment,{
  additions:Record<string,string|string[]>;
  statusMarkers:string[];
}> = {
  ENCYCLOPEDIA:{
    additions:{
      chapterOrigin:"CH1.2",
      readerDepth:"INSPECT",
      plainLanguageSummary:"Compare a failed auxiliary repair with a deeper framework revision without treating the probe as historical fact."
    },
    statusMarkers:["canonical-versus-projection","probe-versus-history"]
  },
  CLASSROOM:{
    additions:{
      learningObjective:"Distinguish a rationally available revision from a historically successful revision.",
      estimatedMinutes:"20",
      studentPrompt:"Hold the stated constraints fixed. What changes if Vulcan is retained, and what would make you reconsider that repair?",
      outputCardSchema:["claim","reason","remaining uncertainty","REOPEN condition"]
    },
    statusMarkers:["scaffold-versus-canonical","student-authored-versus-system-supplied"]
  },
  VR:{
    additions:{
      sceneId:"VR-NV-VULCAN-1",
      spatialLayout:["Newtonian framework anchor","Vulcan auxiliary branch","observational remainder zone","GR revision portal","overview return"],
      interactionPrimitives:["inspect dependency","toggle auxiliary branch","replay mismatch","compare framework revision"],
      simulationStatus:"controlled revision space — not historical actuality",
      debriefSchema:["experienced change","licensed inference","unlicensed inference","remaining uncertainty","REOPEN condition"]
    },
    statusMarkers:["simulation-versus-history","perspective-versus-person","spatial-relation-versus-semantic-relation"]
  },
  APPLICATION:{
    additions:{
      targetDomain:"generic transfer-training profile",
      domainAuthority:"must be supplied by target domain; historical case has none",
      affectedParties:["must be identified in target domain"],
      permissionsModel:"no recommendation or authorization inherited from source case",
      contestabilityPath:"target-domain actors can reject the structural analogy",
      transferLimitations:["historical astronomy is an analogy source, not domain evidence"]
    },
    statusMarkers:["analogy-versus-domain-evidence","possibility-versus-recommendation","recommendation-versus-authorization"]
  },
  RESEARCH:{
    additions:{
      studyId:"NV-PROJECTION-FIDELITY-1",
      hypothesis:"Projection format can change while canonical identity and claim-ceiling discipline remain stable.",
      measures:["canonical-fingerprint retention","claim-ceiling violations","return-artifact completeness"],
      comparisonCondition:"five environment projections of the same canonical probe",
      failureCriteria:["fingerprint drift","claim inflation","missing simulation or analogy status","missing return artifact"],
      analysisPlan:"compare projection fidelity before evaluating any performance benefit"
    },
    statusMarkers:["measure-versus-construct","performance-versus-validity","result-versus-authorization"]
  }
};

export function compileAllNeptuneVulcanPackages(
  dossiers:CanonicalCaseDossier[],
  graph:FspRelationGraph=buildRelationGraph(dossiers)
):ProjectionPackage[]{
  return NEPTUNE_VULCAN_PROBE_BINDINGS.map(binding=>{
    const example=NEPTUNE_VULCAN_PROFILE_EXAMPLES[binding.environment];
    const token:EcosystemReturnToken={
      environment:binding.environment,
      originId:`${binding.projectionId}:origin`,
      originLabel:binding.purpose,
      depthOrMode:
        binding.environment==="ENCYCLOPEDIA" ? "INSPECT" :
        binding.environment==="CLASSROOM" ? "PRACTICE" :
        binding.environment==="VR" ? "IMMERSIVE" :
        binding.environment==="APPLICATION" ? "DOMAIN-BOUND" :
        "EVALUATION",
      context:[binding.projectionId,"FSP-PROJECTION-PROFILES-1"]
    };
    return compileProjectionPackage(binding,dossiers,graph,token,example.additions,example.statusMarkers);
  });
}
