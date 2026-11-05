import {
  AtlasTargetKind,
  CHAPTER_SECTIONS,
  NavigationTarget,
  sectionsForAtlasTarget,
  targetsForSection
} from "./encyclopediaNavigation";
import {
  CanonicalCaseDossier,
  ControlledRevisionProbe,
  DiachronicInquiryState,
  InquiryTransition,
  SourceLedgerEntry
} from "./fiveCaseAtlas";

export type ReaderView =
  | "PROSE"
  | "CASE_CARD"
  | "STATE_TIMELINE"
  | "TRANSITION_DETAIL"
  | "PROBE"
  | "SOURCE_LEDGER"
  | "CLAIM_CEILING";

export interface ProseOrigin {
  chapterId:string;
  sectionId:string;
  anchorId:string;
  scrollPosition:number|null;
  routeContext:string;
}

export interface ReaderSelection {
  kind:AtlasTargetKind;
  targetId:string;
}

export interface ReaderSnapshot {
  view:ReaderView;
  selection:ReaderSelection|null;
}

export interface ReaderSession {
  origin:ProseOrigin;
  caseId:string;
  contextualTargets:NavigationTarget[];
  fullCaseExploration:boolean;
  view:ReaderView;
  selection:ReaderSelection|null;
  history:ReaderSnapshot[];
}

export interface ReaderRoute {
  routeId:string;
  origin:Pick<ProseOrigin,"chapterId"|"sectionId">;
  caseId:string;
  targets:NavigationTarget[];
  preferredEntry:NavigationTarget;
}

export type CanonicalReaderObject =
  | DiachronicInquiryState
  | InquiryTransition
  | ControlledRevisionProbe
  | SourceLedgerEntry
  | {
      caseId:string;
      caseClaimCeiling:string[];
      mayNotInfer:string[];
      reopenConditions:string[];
    };

function dossierFor(caseId:string,dossiers:CanonicalCaseDossier[]):CanonicalCaseDossier{
  const dossier=dossiers.find(d=>d.caseId===caseId);
  if(!dossier) throw new Error(`unknown case: ${caseId}`);
  return dossier;
}

function targetKey(kind:AtlasTargetKind,targetId:string):string{
  return `${kind}|${targetId}`;
}

function snapshot(session:ReaderSession):ReaderSnapshot{
  return {view:session.view,selection:session.selection ? {...session.selection} : null};
}

function withView(
  session:ReaderSession,
  view:ReaderView,
  selection:ReaderSelection|null
):ReaderSession{
  return {
    ...session,
    view,
    selection,
    history:[...session.history,snapshot(session)]
  };
}

export function routeForSectionCase(sectionId:string,caseId:string):ReaderRoute{
  const section=CHAPTER_SECTIONS.find(s=>s.sectionId===sectionId);
  if(!section) throw new Error(`unknown section: ${sectionId}`);
  const targets=targetsForSection(sectionId).filter(t=>t.caseId===caseId);
  if(targets.length===0) throw new Error(`case not routed from section: ${sectionId} -> ${caseId}`);
  return {
    routeId:`${sectionId}::${caseId}`,
    origin:{chapterId:section.chapterId,sectionId},
    caseId,
    targets,
    preferredEntry:targets[0]
  };
}

export function enterCaseFromProse(
  sectionId:string,
  caseId:string,
  anchorId:string,
  scrollPosition:number|null,
  routeContext:string
):ReaderSession{
  const route=routeForSectionCase(sectionId,caseId);
  return {
    origin:{
      chapterId:route.origin.chapterId,
      sectionId,
      anchorId,
      scrollPosition,
      routeContext
    },
    caseId,
    contextualTargets:structuredClone(route.targets),
    fullCaseExploration:false,
    view:"CASE_CARD",
    selection:null,
    history:[{view:"PROSE",selection:null}]
  };
}

export function openTimeline(session:ReaderSession):ReaderSession{
  return withView(session,"STATE_TIMELINE",null);
}

export function exploreFullCase(session:ReaderSession):ReaderSession{
  return {...session,fullCaseExploration:true};
}

function canonicalTargetExists(
  dossier:CanonicalCaseDossier,
  kind:AtlasTargetKind,
  targetId:string
):boolean{
  if(kind==="STATE") return dossier.states.some(s=>s.stateId===targetId);
  if(kind==="TRANSITION") return dossier.transitions.some(t=>t.transitionId===targetId);
  if(kind==="PROBE") return dossier.controlledRevisionProbes.some(p=>p.probeId===targetId);
  if(kind==="SOURCE") return dossier.sourceLedger.some(s=>s.sourceId===targetId);
  return kind==="CASE_CLAIM_CEILING" && targetId===dossier.caseId;
}

function contextualTargetAllowed(
  session:ReaderSession,
  kind:AtlasTargetKind,
  targetId:string
):boolean{
  return session.contextualTargets.some(t=>targetKey(t.kind,t.targetId)===targetKey(kind,targetId));
}

function sourcesForSelection(
  session:ReaderSession,
  dossier:CanonicalCaseDossier
):string[]{
  if(!session.selection) return [];
  const {kind,targetId}=session.selection;
  if(kind==="STATE"){
    return dossier.states.find(s=>s.stateId===targetId)?.sourceIds ?? [];
  }
  if(kind==="TRANSITION"){
    return dossier.transitions.find(t=>t.transitionId===targetId)?.sourceIds ?? [];
  }
  if(kind==="PROBE"){
    const probe=dossier.controlledRevisionProbes.find(p=>p.probeId===targetId);
    if(!probe) return [];
    return dossier.states.find(s=>s.stateId===probe.stateId)?.sourceIds ?? [];
  }
  return [];
}

export function provenanceSourceIds(
  session:ReaderSession,
  dossiers:CanonicalCaseDossier[]
):string[]{
  const dossier=dossierFor(session.caseId,dossiers);
  return [...new Set([
    ...sourcesForSelection(session,dossier),
    ...session.contextualTargets.filter(t=>t.kind==="SOURCE").map(t=>t.targetId)
  ])].sort();
}

export function openTarget(
  session:ReaderSession,
  dossiers:CanonicalCaseDossier[],
  kind:AtlasTargetKind,
  targetId:string
):ReaderSession{
  const dossier=dossierFor(session.caseId,dossiers);
  if(!canonicalTargetExists(dossier,kind,targetId)){
    throw new Error(`unknown canonical target: ${session.caseId}|${kind}|${targetId}`);
  }

  const isSourceDescendant =
    kind==="SOURCE" && provenanceSourceIds(session,dossiers).includes(targetId);
  const isCeilingDescendant =
    kind==="CASE_CLAIM_CEILING" && targetId===session.caseId;

  if(
    !session.fullCaseExploration &&
    !contextualTargetAllowed(session,kind,targetId) &&
    !isSourceDescendant &&
    !isCeilingDescendant
  ){
    throw new Error(`target outside contextual aperture: ${kind}|${targetId}`);
  }

  const view:ReaderView =
    kind==="STATE" ? "STATE_TIMELINE" :
    kind==="TRANSITION" ? "TRANSITION_DETAIL" :
    kind==="PROBE" ? "PROBE" :
    kind==="SOURCE" ? "SOURCE_LEDGER" :
    "CLAIM_CEILING";

  return withView(session,view,{kind,targetId});
}

export function openClaimCeiling(
  session:ReaderSession,
  dossiers:CanonicalCaseDossier[]
):ReaderSession{
  return openTarget(session,dossiers,"CASE_CLAIM_CEILING",session.caseId);
}

export function resolveSelection(
  session:ReaderSession,
  dossiers:CanonicalCaseDossier[]
):CanonicalReaderObject|null{
  if(!session.selection) return null;
  const dossier=dossierFor(session.caseId,dossiers);
  const {kind,targetId}=session.selection;
  if(kind==="STATE"){
    const x=dossier.states.find(s=>s.stateId===targetId);
    return x ? structuredClone(x) : null;
  }
  if(kind==="TRANSITION"){
    const x=dossier.transitions.find(t=>t.transitionId===targetId);
    return x ? structuredClone(x) : null;
  }
  if(kind==="PROBE"){
    const x=dossier.controlledRevisionProbes.find(p=>p.probeId===targetId);
    return x ? structuredClone(x) : null;
  }
  if(kind==="SOURCE"){
    const x=dossier.sourceLedger.find(s=>s.sourceId===targetId);
    return x ? structuredClone(x) : null;
  }
  return {
    caseId:dossier.caseId,
    caseClaimCeiling:structuredClone(dossier.caseClaimCeiling),
    mayNotInfer:structuredClone(dossier.mayNotInfer),
    reopenConditions:structuredClone(dossier.reopenConditions)
  };
}

export function back(session:ReaderSession):ReaderSession{
  if(session.history.length===0) return session;
  const previous=session.history[session.history.length-1];
  return {
    ...session,
    view:previous.view,
    selection:previous.selection ? {...previous.selection} : null,
    history:session.history.slice(0,-1)
  };
}

export function returnToProse(session:ReaderSession):ProseOrigin{
  return structuredClone(session.origin);
}

export function reverseChapterConnections(
  caseId:string,
  kind:AtlasTargetKind,
  targetId:string
){
  return sectionsForAtlasTarget(caseId,kind,targetId);
}
