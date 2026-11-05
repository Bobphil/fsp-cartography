export type InquiryDimension =
  | "D" | "C" | "E" | "W" | "A" | "B" | "M" | "O"
  | "T" | "S" | "P" | "X" | "R" | "GAMMA" | "F";

export interface DiachronicInquiryState {
  stateId:string;
  caseId:string;
  ordinal:number;
  periodLabel:string;
  doing:string[];
  claims:string[];
  evidence:string[];
  warrants:string[];
  auxiliaries:string[];
  background:string[];
  meanings:string[];
  ontology:string[];
  task:string[];
  standing:string[];
  powerAuthority:string[];
  livePossibilities:string[];
  remainder:string[];
  claimCeiling:string[];
  framework:string[];
  sourceIds:string[];
}

export interface InquiryTransition {
  transitionId:string;
  caseId:string;
  fromStateId:string;
  toStateId:string;
  changedDimensions:InquiryDimension[];
  description:string;
  preserved:string[];
  gained:string[];
  lostOrRejected:string[];
  unresolved:string[];
  sourceIds:string[];
}

export interface ControlledRevisionProbe {
  probeId:string;
  caseId:string;
  stateId:string;
  holdFixed:string[];
  vary:string[];
  constraints:string[];
  candidateConsequences:string[];
  remainder:string[];
  claimCeiling:string;
}

export interface SourceLedgerEntry {
  sourceId:string;
  title:string;
  sourceType:"PRIMARY"|"OFFICIAL"|"REFERENCE";
  url:string;
  supports:string[];
}

export interface CanonicalCaseDossier {
  caseId:string;
  title:string;
  canonicalQuestion:string;
  philosophicalRole:string[];
  states:DiachronicInquiryState[];
  transitions:InquiryTransition[];
  controlledRevisionProbes:ControlledRevisionProbe[];
  sourceLedger:SourceLedgerEntry[];
  caseClaimCeiling:string[];
  mayNotInfer:string[];
  reopenConditions:string[];
}

export interface AtlasValidation {
  caseId:string;
  failures:string[];
  passes:boolean;
}

export interface AtlasComparisonRow {
  caseId:string;
  dominantChangedDimensions:InquiryDimension[];
  stateCount:number;
  transitionCount:number;
  probeCount:number;
  finalClaimCeiling:string[];
  reopenConditions:string[];
}

const ALL_DIMENSIONS:InquiryDimension[]=[
  "D","C","E","W","A","B","M","O","T","S","P","X","R","GAMMA","F"
];

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function validateCaseDossier(dossier:CanonicalCaseDossier):AtlasValidation{
  const failures:string[]=[];
  if(dossier.states.length<2) failures.push("fewer-than-two-states");
  const ordered=[...dossier.states].sort((a,b)=>a.ordinal-b.ordinal);
  for(let i=1;i<ordered.length;i++){
    if(ordered[i].ordinal<=ordered[i-1].ordinal) failures.push("non-increasing-state-order");
  }

  const stateIds=new Set(dossier.states.map(s=>s.stateId));
  const sourceIds=new Set(dossier.sourceLedger.map(s=>s.sourceId));

  for(const state of dossier.states){
    if(state.caseId!==dossier.caseId) failures.push(`${state.stateId}:case-mismatch`);
    if(state.claimCeiling.length===0) failures.push(`${state.stateId}:missing-claim-ceiling`);
    if(state.framework.length===0) failures.push(`${state.stateId}:missing-framework`);
    for(const src of state.sourceIds){
      if(!sourceIds.has(src)) failures.push(`${state.stateId}:unknown-source:${src}`);
    }
  }

  for(const t of dossier.transitions){
    if(t.caseId!==dossier.caseId) failures.push(`${t.transitionId}:case-mismatch`);
    if(!stateIds.has(t.fromStateId) || !stateIds.has(t.toStateId))
      failures.push(`${t.transitionId}:unknown-state`);
    if(t.fromStateId===t.toStateId) failures.push(`${t.transitionId}:self-transition`);
    if(t.changedDimensions.length===0) failures.push(`${t.transitionId}:no-changed-dimensions`);
    for(const d of t.changedDimensions){
      if(!ALL_DIMENSIONS.includes(d)) failures.push(`${t.transitionId}:unknown-dimension:${d}`);
    }
    for(const src of t.sourceIds){
      if(!sourceIds.has(src)) failures.push(`${t.transitionId}:unknown-source:${src}`);
    }
  }

  for(const p of dossier.controlledRevisionProbes){
    if(p.caseId!==dossier.caseId) failures.push(`${p.probeId}:case-mismatch`);
    if(!stateIds.has(p.stateId)) failures.push(`${p.probeId}:unknown-state`);
    if(p.vary.length===0) failures.push(`${p.probeId}:nothing-varied`);
    if(!p.claimCeiling.trim()) failures.push(`${p.probeId}:missing-claim-ceiling`);
  }

  if(dossier.caseClaimCeiling.length===0) failures.push("missing-case-claim-ceiling");
  if(dossier.mayNotInfer.length===0) failures.push("missing-may-not-infer");
  if(dossier.reopenConditions.length===0) failures.push("missing-reopen-conditions");

  return {
    caseId:dossier.caseId,
    failures:canonical(failures),
    passes:failures.length===0
  };
}

export function transitionVector(t:InquiryTransition):Record<InquiryDimension,boolean>{
  return Object.fromEntries(
    ALL_DIMENSIONS.map(d=>[d,t.changedDimensions.includes(d)])
  ) as Record<InquiryDimension,boolean>;
}

export function dominantChangedDimensions(
  dossier:CanonicalCaseDossier
):InquiryDimension[]{
  const counts=new Map<InquiryDimension,number>();
  for(const t of dossier.transitions){
    for(const d of t.changedDimensions){
      counts.set(d,(counts.get(d)??0)+1);
    }
  }
  const max=Math.max(...counts.values());
  return [...counts.entries()]
    .filter(([,n])=>n===max)
    .map(([d])=>d)
    .sort();
}

export function compareAtlasCases(
  dossiers:CanonicalCaseDossier[]
):AtlasComparisonRow[]{
  return dossiers.map(d=>({
    caseId:d.caseId,
    dominantChangedDimensions:dominantChangedDimensions(d),
    stateCount:d.states.length,
    transitionCount:d.transitions.length,
    probeCount:d.controlledRevisionProbes.length,
    finalClaimCeiling:[...d.states].sort((a,b)=>b.ordinal-a.ordinal)[0].claimCeiling,
    reopenConditions:[...d.reopenConditions]
  }));
}

export function sourceCoverage(dossier:CanonicalCaseDossier):{
  usedSourceIds:string[];
  unusedSourceIds:string[];
}{
  const used=canonical([
    ...dossier.states.flatMap(s=>s.sourceIds),
    ...dossier.transitions.flatMap(t=>t.sourceIds)
  ]);
  const all=canonical(dossier.sourceLedger.map(s=>s.sourceId));
  return {
    usedSourceIds:used,
    unusedSourceIds:all.filter(id=>!used.includes(id))
  };
}

export function atlasClaimCeiling(dossiers:CanonicalCaseDossier[]):string{
  const failed=dossiers.filter(d=>!validateCaseDossier(d).passes).map(d=>d.caseId);
  if(failed.length>0) return `Atlas is not certifiable; invalid dossiers: ${failed.join(", ")}`;
  return "The Atlas supports structured comparison of diachronic inquiry states, transition dimensions, controlled revision spaces, claim ceilings, and REOPEN conditions across the five cases. It does not prove that the FSP field decomposition is unique, exhaustive, or historically neutral.";
}
