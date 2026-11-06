import {
  CanonicalCaseDossier,
  ControlledRevisionProbe,
  DiachronicInquiryState,
  InquiryTransition,
  SourceLedgerEntry
} from "./fiveCaseAtlas";
import {
  PUBLIC_ARCHITECTURE,
  PublicConcept,
  PublicTool
} from "./encyclopediaPublicArchitecture";

export type EcosystemEnvironment =
  | "ENCYCLOPEDIA"
  | "CLASSROOM"
  | "VR"
  | "APPLICATION"
  | "RESEARCH";

export type CanonicalObjectKind =
  | "CASE"
  | "STATE"
  | "TRANSITION"
  | "PROBE"
  | "SOURCE"
  | "CLAIM_CEILING";

export type OverlayObjectKind = "CONCEPT" | "TOOL";

export interface CanonicalObjectRef {
  kind:CanonicalObjectKind;
  caseId:string;
  objectId:string;
}

export interface OverlayObjectRef {
  kind:OverlayObjectKind;
  objectId:string;
}

export interface EcosystemReturnToken {
  environment:EcosystemEnvironment;
  originId:string;
  originLabel:string;
  depthOrMode:string;
  context:string[];
}

export interface ProjectionBinding {
  projectionId:string;
  environment:EcosystemEnvironment;
  canonical:CanonicalObjectRef;
  overlays:OverlayObjectRef[];
  purpose:string;
  presentation:string[];
  permittedOperations:string[];
  omittedByDefault:string[];
  addedMetadata:string[];
  returnContract:string;
  claimCeilingPolicy:string;
}

export interface EcosystemEnvironmentProfile {
  environment:EcosystemEnvironment;
  primaryHumanTask:string;
  characteristicPresentation:string[];
  allowedTransformations:string[];
  prohibitedTransformations:string[];
  requiredReturn:string;
}

export interface ProjectedCanonicalObject {
  projectionId:string;
  environment:EcosystemEnvironment;
  canonical:CanonicalObjectRef;
  canonicalFingerprint:string;
  payload:unknown;
  overlays:Array<PublicConcept|PublicTool>;
  affordances:string[];
  presentation:string[];
  returnToken:EcosystemReturnToken;
  claimCeiling:string[];
}

export interface EcosystemBridgeValidation {
  passes:boolean;
  failures:string[];
}

export const ENVIRONMENT_PROFILES:EcosystemEnvironmentProfile[]=[
  {
    environment:"ENCYCLOPEDIA",
    primaryHumanTask:"Understand and inspect an inquiry while preserving readable philosophical narrative.",
    characteristicPresentation:["prose","case card","timeline","transition detail","probe panel","source ledger","claim ceiling"],
    allowedTransformations:["progressive disclosure","plain-language labels","contextual chapter aperture","reader-depth formatting"],
    prohibitedTransformations:["invent chapter-to-Atlas routes","rewrite canonical history","inflate claim strength","convert probe possibility into historical fact"],
    requiredReturn:"Return to the exact prose or public context that made inspection relevant."
  },
  {
    environment:"CLASSROOM",
    primaryHumanTask:"Practice a bounded inquiry operation and produce a learner-authored artifact that can be assessed without replacing the learner's judgment.",
    characteristicPresentation:["case prompt","guided move","tool practice","comparison task","output card","reflection or authorial return"],
    allowedTransformations:["scaffold prompts","sequence difficulty","hide formal notation","add assessment metadata","provide feedback"],
    prohibitedTransformations:["change canonical evidence","supply the learner's final judgment as authoritative","treat pedagogical simplification as historical fact","erase provenance"],
    requiredReturn:"Return the learner from scaffolded operation to an authored claim, reason, uncertainty, and REOPEN condition."
  },
  {
    environment:"VR",
    primaryHumanTask:"Decompress relations, perspectives, temporal change, and controlled possibilities into navigable experience.",
    characteristicPresentation:["spatial scene","perspective shift","temporal replay","interactive dependency","controlled variation","overview/return"],
    allowedTransformations:["spatialize relations","slow or replay transitions","embody viewpoint","stage controlled probes","fade scaffolds"],
    prohibitedTransformations:["turn spatial proximity into semantic identity","invent causal or historical relations","hide simulation status","convert immersion into evidential authority"],
    requiredReturn:"Return from immersive manipulation to explicit human judgment about what the experience did and did not license."
  },
  {
    environment:"APPLICATION",
    primaryHumanTask:"Support real-world inquiry, coordination, or intervention while preserving domain-native authority, contestability, and human responsibility.",
    characteristicPresentation:["domain case","persons and institutions","claims and provenance","constraints","live possibilities","bounded intervention","REOPEN"],
    allowedTransformations:["bind domain-native vocabulary","add permissions and governance metadata","add live operational state","add contestation and appeal paths"],
    prohibitedTransformations:["substitute FSP representation for domain authority","convert possibility into recommendation or authorization","erase affected persons' standing","exceed domain evidence"],
    requiredReturn:"Return analytic support to the actual people, institutions, and practices whose Doing is at stake."
  },
  {
    environment:"RESEARCH",
    primaryHumanTask:"Evaluate whether an FSP representation, interaction, or intervention preserves fidelity and improves bounded inquiry.",
    characteristicPresentation:["hypothesis","operational measure","comparison condition","audit trail","failure criterion","transfer test"],
    allowedTransformations:["instrument interactions","aggregate measurements","compare conditions","encode falsification thresholds"],
    prohibitedTransformations:["treat usability as truth","treat performance gain as normative authorization","hide negative results","change the tested canonical object mid-comparison"],
    requiredReturn:"Return empirical results to the architecture as evidence for revision, limitation, or retention rather than automatic validation."
  }
];

export const ECOSYSTEM_CONSTITUTION=[
  "One canonical inquiry object may have many projections; projection multiplicity does not imply semantic multiplicity.",
  "Projection may change presentation, interaction, scaffolding, and domain-native metadata, but may not silently change canonical identity, provenance, transition history, or claim ceiling.",
  "Concept and tool overlays explain or operationalize canonical material; they do not become new historical evidence.",
  "Counterfactual and simulated states remain explicitly marked as possibilities unless independently represented as canonical history.",
  "Application projections may bind domain-native authority and governance, but FSP does not inherit that authority merely by representing it.",
  "Every environment must preserve a return path from representation or operation to human-authored judgment in the originating Doing.",
  "Research evaluates projections and transfer; it does not certify the FSP ontology as unique or exhaustive."
] as const;

function dossierFor(caseId:string,dossiers:CanonicalCaseDossier[]):CanonicalCaseDossier{
  const dossier=dossiers.find(d=>d.caseId===caseId);
  if(!dossier) throw new Error(`unknown case: ${caseId}`);
  return dossier;
}

export function canonicalObject(
  ref:CanonicalObjectRef,
  dossiers:CanonicalCaseDossier[]
):unknown{
  const dossier=dossierFor(ref.caseId,dossiers);
  if(ref.kind==="CASE"){
    if(ref.objectId!==dossier.caseId) throw new Error(`case identity mismatch: ${ref.objectId}`);
    return structuredClone(dossier);
  }
  if(ref.kind==="STATE"){
    const item=dossier.states.find(x=>x.stateId===ref.objectId);
    if(!item) throw new Error(`unknown state: ${ref.objectId}`);
    return structuredClone(item);
  }
  if(ref.kind==="TRANSITION"){
    const item=dossier.transitions.find(x=>x.transitionId===ref.objectId);
    if(!item) throw new Error(`unknown transition: ${ref.objectId}`);
    return structuredClone(item);
  }
  if(ref.kind==="PROBE"){
    const item=dossier.controlledRevisionProbes.find(x=>x.probeId===ref.objectId);
    if(!item) throw new Error(`unknown probe: ${ref.objectId}`);
    return structuredClone(item);
  }
  if(ref.kind==="SOURCE"){
    const item=dossier.sourceLedger.find(x=>x.sourceId===ref.objectId);
    if(!item) throw new Error(`unknown source: ${ref.objectId}`);
    return structuredClone(item);
  }
  if(ref.objectId!==dossier.caseId) throw new Error(`claim ceiling identity mismatch: ${ref.objectId}`);
  return {
    caseId:dossier.caseId,
    caseClaimCeiling:structuredClone(dossier.caseClaimCeiling),
    mayNotInfer:structuredClone(dossier.mayNotInfer),
    reopenConditions:structuredClone(dossier.reopenConditions)
  };
}

function stableSort(value:unknown):unknown{
  if(Array.isArray(value)) return value.map(stableSort);
  if(value && typeof value==="object"){
    return Object.fromEntries(
      Object.entries(value as Record<string,unknown>)
        .sort(([a],[b])=>a.localeCompare(b))
        .map(([k,v])=>[k,stableSort(v)])
    );
  }
  return value;
}

function hashString(text:string):string{
  let h=2166136261;
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

export function canonicalFingerprint(
  ref:CanonicalObjectRef,
  dossiers:CanonicalCaseDossier[]
):string{
  const serialized=JSON.stringify(stableSort(canonicalObject(ref,dossiers)));
  return `${ref.kind}:${ref.caseId}:${ref.objectId}:${hashString(serialized)}`;
}

function resolveOverlay(ref:OverlayObjectRef):PublicConcept|PublicTool{
  if(ref.kind==="CONCEPT"){
    const c=PUBLIC_ARCHITECTURE.concepts.find(x=>x.conceptId===ref.objectId);
    if(!c) throw new Error(`unknown concept overlay: ${ref.objectId}`);
    return structuredClone(c);
  }
  const t=PUBLIC_ARCHITECTURE.tools.find(x=>x.toolId===ref.objectId);
  if(!t) throw new Error(`unknown tool overlay: ${ref.objectId}`);
  return structuredClone(t);
}

export function applicableClaimCeiling(
  ref:CanonicalObjectRef,
  dossiers:CanonicalCaseDossier[]
):string[]{
  const dossier=dossierFor(ref.caseId,dossiers);
  if(ref.kind==="STATE"){
    return structuredClone(dossier.states.find(x=>x.stateId===ref.objectId)?.claimCeiling ?? []);
  }
  if(ref.kind==="PROBE"){
    const p=dossier.controlledRevisionProbes.find(x=>x.probeId===ref.objectId);
    return p ? [p.claimCeiling] : [];
  }
  return structuredClone(dossier.caseClaimCeiling);
}

export function projectCanonicalObject(
  binding:ProjectionBinding,
  dossiers:CanonicalCaseDossier[],
  returnToken:EcosystemReturnToken
):ProjectedCanonicalObject{
  if(binding.environment!==returnToken.environment)
    throw new Error("return token environment mismatch");
  const profile=ENVIRONMENT_PROFILES.find(p=>p.environment===binding.environment);
  if(!profile) throw new Error(`unknown environment: ${binding.environment}`);

  return {
    projectionId:binding.projectionId,
    environment:binding.environment,
    canonical:structuredClone(binding.canonical),
    canonicalFingerprint:canonicalFingerprint(binding.canonical,dossiers),
    payload:canonicalObject(binding.canonical,dossiers),
    overlays:binding.overlays.map(resolveOverlay),
    affordances:structuredClone(binding.permittedOperations),
    presentation:structuredClone(binding.presentation),
    returnToken:structuredClone(returnToken),
    claimCeiling:applicableClaimCeiling(binding.canonical,dossiers)
  };
}

export function returnFromProjection(
  projection:ProjectedCanonicalObject
):EcosystemReturnToken{
  return structuredClone(projection.returnToken);
}

export const NEPTUNE_VULCAN_PROBE_BINDINGS:ProjectionBinding[]=[
  {
    projectionId:"NV-PROBE-ENCYCLOPEDIA",
    environment:"ENCYCLOPEDIA",
    canonical:{kind:"PROBE",caseId:"NEPTUNE-VULCAN",objectId:"NV-PROBE-VULCAN"},
    overlays:[
      {kind:"CONCEPT",objectId:"CONTROLLED-REVISION"},
      {kind:"TOOL",objectId:"CONTROLLED-REVISION-PROBE"},
      {kind:"TOOL",objectId:"CLAIM-CEILING-CHECK"}
    ],
    purpose:"Let a reader inspect the bounded Vulcan alternative from Chapter 1 without confusing the probe with historical actuality.",
    presentation:["probe panel","hold-fixed / vary distinction","candidate consequences","claim ceiling"],
    permittedOperations:["inspect constraints","trace source basis","open claim ceiling","return to CH1.2"],
    omittedByDefault:["raw field vector"],
    addedMetadata:["chapter origin","reader depth"],
    returnContract:"Exact return to the Chapter 1 prose origin.",
    claimCeilingPolicy:"Never exceed the canonical probe or case claim ceiling."
  },
  {
    projectionId:"NV-PROBE-CLASSROOM",
    environment:"CLASSROOM",
    canonical:{kind:"PROBE",caseId:"NEPTUNE-VULCAN",objectId:"NV-PROBE-VULCAN"},
    overlays:[
      {kind:"CONCEPT",objectId:"UNDERDETERMINATION"},
      {kind:"TOOL",objectId:"REVISION-TARGET-AUDIT"},
      {kind:"TOOL",objectId:"CONTROLLED-REVISION-PROBE"}
    ],
    purpose:"Give students a bounded revision exercise in which they distinguish a rationally available repair from a historically successful one.",
    presentation:["short case prompt","hold-fixed / vary worksheet","bounded judgment output card"],
    permittedOperations:["propose consequence","compare with canonical history","state uncertainty","write REOPEN condition"],
    omittedByDefault:["formal dimension codes"],
    addedMetadata:["learning objective","attempt record","student-authored response"],
    returnContract:"Return to a student-authored claim, reason, uncertainty, and REOPEN condition.",
    claimCeilingPolicy:"Scaffolding may simplify wording but may not strengthen the canonical conclusion."
  },
  {
    projectionId:"NV-PROBE-VR",
    environment:"VR",
    canonical:{kind:"PROBE",caseId:"NEPTUNE-VULCAN",objectId:"NV-PROBE-VULCAN"},
    overlays:[
      {kind:"CONCEPT",objectId:"CONTROLLED-REVISION"},
      {kind:"TOOL",objectId:"CONTROLLED-REVISION-PROBE"}
    ],
    purpose:"Spatially decompress the Vulcan repair by letting the participant hold Newtonian commitments fixed while manipulating the auxiliary-planet possibility.",
    presentation:["astronomical inquiry space","fixed-commitment anchors","manipulable auxiliary branch","historical/probe status markers","overview return"],
    permittedOperations:["inspect dependency","toggle bounded alternative","replay consequence propagation","return to overview"],
    omittedByDefault:["long prose","full source bibliography"],
    addedMetadata:["spatial coordinates","interaction state","simulation-status marker"],
    returnContract:"Exit immersion into an explicit debrief stating what the manipulation did and did not establish.",
    claimCeilingPolicy:"Immersive salience may not increase evidential or historical standing."
  },
  {
    projectionId:"NV-PROBE-APPLICATION",
    environment:"APPLICATION",
    canonical:{kind:"PROBE",caseId:"NEPTUNE-VULCAN",objectId:"NV-PROBE-VULCAN"},
    overlays:[
      {kind:"CONCEPT",objectId:"UNDERDETERMINATION"},
      {kind:"TOOL",objectId:"REVISION-TARGET-AUDIT"}
    ],
    purpose:"Serve as a training/example pattern for recognizing that a successful local repair strategy does not become a domain-general rule for real-world intervention.",
    presentation:["analogy pattern","domain-binding checklist","authority firewall","transfer warning"],
    permittedOperations:["compare structural pattern","identify candidate revision targets","record domain-native differences","reject invalid analogy"],
    omittedByDefault:["historical detail not needed for transfer"],
    addedMetadata:["target domain","domain authority","affected-party standing","transfer limitations"],
    returnContract:"Return to the actual domain problem; the historical case remains an analogy, not an authorization.",
    claimCeilingPolicy:"No societal recommendation or authorization may be inherited from the historical probe."
  },
  {
    projectionId:"NV-PROBE-RESEARCH",
    environment:"RESEARCH",
    canonical:{kind:"PROBE",caseId:"NEPTUNE-VULCAN",objectId:"NV-PROBE-VULCAN"},
    overlays:[
      {kind:"CONCEPT",objectId:"CONTROLLED-REVISION"},
      {kind:"TOOL",objectId:"CLAIM-CEILING-CHECK"}
    ],
    purpose:"Use one invariant canonical probe to test whether different interfaces preserve provenance, boundedness, and transfer without semantic drift.",
    presentation:["experimental condition","fidelity checklist","claim-ceiling test","transfer measure"],
    permittedOperations:["measure comprehension","measure ceiling violations","compare projection conditions","record failure"],
    omittedByDefault:["decorative interface features"],
    addedMetadata:["condition assignment","measure values","failure flags","transfer result"],
    returnContract:"Return measured results to architecture revision rather than treating performance as proof of the ontology.",
    claimCeilingPolicy:"Research results evaluate the projection, not the truth or uniqueness of FSP's ontology."
  }
];

export function validateProjectionBinding(
  binding:ProjectionBinding,
  dossiers:CanonicalCaseDossier[]
):EcosystemBridgeValidation{
  const failures:string[]=[];
  try{ canonicalObject(binding.canonical,dossiers); }
  catch(e){ failures.push(String(e instanceof Error?e.message:e)); }

  for(const overlay of binding.overlays){
    try{ resolveOverlay(overlay); }
    catch(e){ failures.push(String(e instanceof Error?e.message:e)); }
  }
  if(!ENVIRONMENT_PROFILES.some(x=>x.environment===binding.environment))
    failures.push("unknown-environment");
  if(binding.permittedOperations.length===0) failures.push("no-permitted-operations");
  if(!binding.returnContract.trim()) failures.push("missing-return-contract");
  if(!binding.claimCeilingPolicy.trim()) failures.push("missing-claim-ceiling-policy");

  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}

export function validateBridge(
  bindings:ProjectionBinding[],
  dossiers:CanonicalCaseDossier[]
):EcosystemBridgeValidation{
  const failures:string[]=[];
  for(const binding of bindings){
    const result=validateProjectionBinding(binding,dossiers);
    for(const f of result.failures) failures.push(`${binding.projectionId}:${f}`);
  }
  const ids=bindings.map(x=>x.projectionId);
  if(new Set(ids).size!==ids.length) failures.push("duplicate-projection-id");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}

export function projectionDriftAudit(
  projections:ProjectedCanonicalObject[]
):{
  passes:boolean;
  fingerprints:string[];
  failures:string[];
}{
  if(projections.length===0) return {passes:false,fingerprints:[],failures:["no-projections"]};
  const fingerprints=[...new Set(projections.map(x=>x.canonicalFingerprint))].sort();
  const canonicalIds=[...new Set(projections.map(x=>JSON.stringify(x.canonical)))];
  const failures:string[]=[];
  if(canonicalIds.length!==1) failures.push("canonical-reference-drift");
  if(fingerprints.length!==1) failures.push("canonical-payload-drift");
  return {passes:failures.length===0,fingerprints,failures};
}
