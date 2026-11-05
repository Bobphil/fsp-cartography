import { CHAPTER_SECTIONS, NavigationTarget } from "./encyclopediaNavigation";
import {
  CanonicalCaseDossier,
  ControlledRevisionProbe,
  DiachronicInquiryState,
  InquiryTransition,
  SourceLedgerEntry
} from "./fiveCaseAtlas";
import {
  ReaderSession,
  ReaderView,
  provenanceSourceIds,
  resolveSelection
} from "./encyclopediaReaderShell";

export interface ReaderActionModel {
  id:string;
  label:string;
  kind:"STATE"|"TRANSITION"|"PROBE"|"SOURCE"|"CASE_CLAIM_CEILING"|"TIMELINE"|"FULL_CASE"|"BACK"|"RETURN";
  targetId?:string;
  primary?:boolean;
}

export interface TimelineNodeModel {
  stateId:string;
  periodLabel:string;
  ordinal:number;
  active:boolean;
  contextual:boolean;
}

export interface TimelineEdgeModel {
  transitionId:string;
  fromStateId:string;
  toStateId:string;
  active:boolean;
  contextual:boolean;
}

export interface ReaderPanelModel {
  view:ReaderView;
  eyebrow:string;
  title:string;
  lede:string;
  notice?:string;
  sections:Array<{heading:string;items:string[]}>;
  actions:ReaderActionModel[];
  timeline?:{nodes:TimelineNodeModel[];edges:TimelineEdgeModel[]};
}

export interface ProsePanelModel {
  chapterId:string;
  sectionId:string;
  title:string;
  summary:string;
  caseId:string;
  caseTitle:string;
  inspectLabel:string;
}

function dossierFor(caseId:string,dossiers:CanonicalCaseDossier[]):CanonicalCaseDossier{
  const dossier=dossiers.find(d=>d.caseId===caseId);
  if(!dossier) throw new Error(`unknown case: ${caseId}`);
  return dossier;
}

function contextual(session:ReaderSession,kind:NavigationTarget["kind"],targetId:string):boolean{
  return session.contextualTargets.some(t=>t.kind===kind && t.targetId===targetId);
}

function targetActions(session:ReaderSession):ReaderActionModel[]{
  return session.contextualTargets.map((target,index)=>({
    id:`target-${target.kind}-${target.targetId}`,
    label:
      target.kind==="STATE" ? `Open state ${target.targetId}` :
      target.kind==="TRANSITION" ? `Inspect transition ${target.targetId}` :
      target.kind==="PROBE" ? `Launch probe ${target.targetId}` :
      target.kind==="SOURCE" ? "Check source" :
      "See claim ceiling",
    kind:target.kind,
    targetId:target.targetId,
    primary:index===0
  }));
}

function commonActions(session:ReaderSession):ReaderActionModel[]{
  const actions:ReaderActionModel[]=[];
  if(session.history.length>1) actions.push({id:"back",label:"Back one step",kind:"BACK"});
  actions.push({id:"return",label:"Return to reading",kind:"RETURN",primary:true});
  return actions;
}

export function buildProsePanel(
  sectionId:string,
  caseId:string,
  dossiers:CanonicalCaseDossier[]
):ProsePanelModel{
  const section=CHAPTER_SECTIONS.find(s=>s.sectionId===sectionId);
  if(!section) throw new Error(`unknown section: ${sectionId}`);
  const dossier=dossierFor(caseId,dossiers);
  if(!section.caseIds.includes(caseId)) throw new Error(`case not declared for section: ${caseId}`);
  return {
    chapterId:section.chapterId,
    sectionId,
    title:section.title,
    summary:section.summary,
    caseId,
    caseTitle:dossier.title,
    inspectLabel:`Inspect this inquiry: ${dossier.title}`
  };
}

function timelineModel(session:ReaderSession,dossier:CanonicalCaseDossier[]){
  return {
    nodes:[...dossier].sort((a,b)=>a.ordinal-b.ordinal).map(state=>({
      stateId:state.stateId,
      periodLabel:state.periodLabel,
      ordinal:state.ordinal,
      active:session.selection?.kind==="STATE" && session.selection.targetId===state.stateId,
      contextual:contextual(session,"STATE",state.stateId)
    })),
    edges:dossier.length<2 ? [] : []
  };
}

function fullTimeline(session:ReaderSession,dossier:CanonicalCaseDossier){
  return {
    nodes:[...dossier.states].sort((a,b)=>a.ordinal-b.ordinal).map(state=>({
      stateId:state.stateId,
      periodLabel:state.periodLabel,
      ordinal:state.ordinal,
      active:session.selection?.kind==="STATE" && session.selection.targetId===state.stateId,
      contextual:contextual(session,"STATE",state.stateId)
    })),
    edges:dossier.transitions.map(t=>({
      transitionId:t.transitionId,
      fromStateId:t.fromStateId,
      toStateId:t.toStateId,
      active:session.selection?.kind==="TRANSITION" && session.selection.targetId===t.transitionId,
      contextual:contextual(session,"TRANSITION",t.transitionId)
    }))
  };
}

function statePanel(
  session:ReaderSession,
  state:DiachronicInquiryState,
  dossier:CanonicalCaseDossier
):ReaderPanelModel{
  const sourceActions=provenanceSourceIds(session,[dossier]).map(id=>({
    id:`source-${id}`,label:"Check source",kind:"SOURCE" as const,targetId:id
  }));
  return {
    view:"STATE_TIMELINE",
    eyebrow:`${dossier.title} · inquiry state`,
    title:state.periodLabel,
    lede:state.doing.join(" "),
    sections:[
      {heading:"What is being claimed",items:state.claims},
      {heading:"Evidence in view",items:state.evidence},
      {heading:"What carries the inference",items:state.warrants},
      {heading:"Still open",items:[...state.livePossibilities,...state.remainder]},
      {heading:"Current claim ceiling",items:state.claimCeiling}
    ],
    timeline:fullTimeline(session,dossier),
    actions:[
      ...sourceActions,
      {id:"ceiling",label:"See case claim ceiling",kind:"CASE_CLAIM_CEILING",targetId:dossier.caseId},
      ...commonActions(session)
    ]
  };
}

function transitionPanel(
  session:ReaderSession,
  transition:InquiryTransition,
  dossier:CanonicalCaseDossier
):ReaderPanelModel{
  const sourceActions=provenanceSourceIds(session,[dossier]).map(id=>({
    id:`source-${id}`,label:"Check source",kind:"SOURCE" as const,targetId:id
  }));
  return {
    view:"TRANSITION_DETAIL",
    eyebrow:`${dossier.title} · transition`,
    title:`${transition.fromStateId} → ${transition.toStateId}`,
    lede:transition.description,
    sections:[
      {heading:"What changed",items:transition.changedDimensions},
      {heading:"What was preserved",items:transition.preserved},
      {heading:"What was gained",items:transition.gained},
      {heading:"What was rejected or left behind",items:transition.lostOrRejected},
      {heading:"What remains unresolved",items:transition.unresolved}
    ],
    timeline:fullTimeline(session,dossier),
    actions:[
      ...sourceActions,
      {id:"ceiling",label:"See case claim ceiling",kind:"CASE_CLAIM_CEILING",targetId:dossier.caseId},
      ...commonActions(session)
    ]
  };
}

function probePanel(
  session:ReaderSession,
  probe:ControlledRevisionProbe,
  dossier:CanonicalCaseDossier
):ReaderPanelModel{
  const sourceActions=provenanceSourceIds(session,[dossier]).map(id=>({
    id:`source-${id}`,label:"Trace historical/source basis",kind:"SOURCE" as const,targetId:id
  }));
  return {
    view:"PROBE",
    eyebrow:`${dossier.title} · controlled revision space`,
    title:`Probe from ${probe.stateId}`,
    lede:"Change only the licensed variable while keeping the stated constraints visible.",
    notice:"A probe explores a bounded possibility. Its result is not automatically a historical fact or an authorized scientific conclusion.",
    sections:[
      {heading:"Hold fixed",items:probe.holdFixed},
      {heading:"Vary",items:probe.vary},
      {heading:"Constraints",items:probe.constraints},
      {heading:"Candidate consequences",items:probe.candidateConsequences},
      {heading:"Remainder",items:probe.remainder},
      {heading:"Probe claim ceiling",items:[probe.claimCeiling]}
    ],
    timeline:fullTimeline(session,dossier),
    actions:[
      ...sourceActions,
      {id:"ceiling",label:"See case claim ceiling",kind:"CASE_CLAIM_CEILING",targetId:dossier.caseId},
      ...commonActions(session)
    ]
  };
}

function sourcePanel(
  session:ReaderSession,
  source:SourceLedgerEntry,
  dossier:CanonicalCaseDossier
):ReaderPanelModel{
  return {
    view:"SOURCE_LEDGER",
    eyebrow:`${dossier.title} · source ledger`,
    title:source.title,
    lede:`Source type: ${source.sourceType}`,
    sections:[
      {heading:"This source supports",items:source.supports},
      {heading:"Source location",items:[source.url]}
    ],
    actions:[
      {id:"ceiling",label:"Continue to claim ceiling",kind:"CASE_CLAIM_CEILING",targetId:dossier.caseId,primary:true},
      ...commonActions(session)
    ]
  };
}

function ceilingPanel(
  session:ReaderSession,
  dossier:CanonicalCaseDossier
):ReaderPanelModel{
  return {
    view:"CLAIM_CEILING",
    eyebrow:`${dossier.title} · claim ceiling`,
    title:"How far may this inquiry carry us?",
    lede:dossier.caseClaimCeiling.join(" "),
    notice:"The claim ceiling is a stopping rule against turning strong evidence or a useful reconstruction into a stronger conclusion than the case warrants.",
    sections:[
      {heading:"May not infer",items:dossier.mayNotInfer},
      {heading:"REOPEN if",items:dossier.reopenConditions}
    ],
    actions:commonActions(session)
  };
}

export function buildReaderPanel(
  session:ReaderSession,
  dossiers:CanonicalCaseDossier[]
):ReaderPanelModel{
  const dossier=dossierFor(session.caseId,dossiers);
  const selected=resolveSelection(session,dossiers);

  if(session.view==="CASE_CARD"){
    return {
      view:"CASE_CARD",
      eyebrow:"Case card",
      title:dossier.title,
      lede:dossier.canonicalQuestion,
      sections:[
        {heading:"Why this case matters",items:dossier.philosophicalRole},
        {heading:"This chapter opens onto",items:session.contextualTargets.map(t=>t.rationale)}
      ],
      actions:[
        {id:"timeline",label:"View state timeline",kind:"TIMELINE",primary:true},
        ...targetActions(session),
        {id:"full-case",label:"Explore full case",kind:"FULL_CASE"},
        ...commonActions(session)
      ]
    };
  }

  if(session.view==="STATE_TIMELINE" && !selected){
    return {
      view:"STATE_TIMELINE",
      eyebrow:`${dossier.title} · state timeline`,
      title:"Follow the inquiry through time",
      lede:"Each node is a complete inquiry state; each edge records a governed revision rather than mere chronological succession.",
      timeline:fullTimeline(session,dossier),
      sections:[
        {heading:"Contextual aperture",items:session.contextualTargets.map(t=>t.rationale)}
      ],
      actions:[
        ...targetActions(session).filter(a=>a.kind==="STATE" || a.kind==="TRANSITION" || a.kind==="PROBE"),
        {id:"full-case",label:"Explore full case",kind:"FULL_CASE"},
        ...commonActions(session)
      ]
    };
  }

  if(session.selection?.kind==="STATE" && selected) return statePanel(session,selected as DiachronicInquiryState,dossier);
  if(session.selection?.kind==="TRANSITION" && selected) return transitionPanel(session,selected as InquiryTransition,dossier);
  if(session.selection?.kind==="PROBE" && selected) return probePanel(session,selected as ControlledRevisionProbe,dossier);
  if(session.selection?.kind==="SOURCE" && selected) return sourcePanel(session,selected as SourceLedgerEntry,dossier);
  if(session.selection?.kind==="CASE_CLAIM_CEILING") return ceilingPanel(session,dossier);

  throw new Error(`unsupported reader presentation state: ${session.view}`);
}
