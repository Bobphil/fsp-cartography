import {
  MAATHAI_DOSSIER,
  compilePublicLivesRoute,
  historicalView,
  recoverProvenance,
  capabilityChange,
  validatePortabilitySubmission,
  type PublicLivesRoute,
  type PortabilitySubmission
} from "./livesPublicRouteModel";

export type VrSceneId=
  |"ORIENTATION"
  |"SITUATED_ENTRY"
  |"EVIDENCE_NEED"
  |"BOUNDED_ACTION"
  |"HISTORICAL_REVEAL"
  |"CAPABILITY_GROWTH"
  |"RELOCATION"
  |"GOVERNANCE_CONSTRAINT"
  |"PROBLEM_MAP_EXPANSION"
  |"PORTABILITY_GATE"
  |"AUTHORIAL_RETURN"
  |"OFF";

export interface VrScene{
  sceneId:VrSceneId;
  label:string;
  historicalStateId:string|null;
  revealClaimIds:string[];
  hiddenClaimIds:string[];
  sourceIds:string[];
  learnerTask:string;
  requiredBeforeAdvance:string[];
}

export interface VrReturnArtifact{
  structuralRelation:string;
  evidenceClaimId:string;
  contextualDifference:string;
  remainder:string;
  carryForwardQuestion:string;
}

export interface MaathaiVrHarness{
  canonicalOwner:string;
  route:PublicLivesRoute;
  activeModules:string[];
  disabledModules:string[];
  scenes:VrScene[];
  exitAllowed:boolean;
  lifeNavigationOptional:boolean;
  returnRule:string;
}

const route=compilePublicLivesRoute(MAATHAI_DOSSIER);

function viewIds(stateId:string){
  const v=historicalView(route,stateId);
  return {
    visibleClaims:v.visibleClaims.map(c=>c.claimId),
    hiddenClaims:v.hiddenClaimIds,
    sourceIds:v.visibleSources.map(s=>s.sourceId)
  };
}
const a=viewIds("M-A");
const b=viewIds("M-B");
const c=viewIds("M-C");

export const MAATHAI_VR_HARNESS:MaathaiVrHarness={
  canonicalOwner:MAATHAI_DOSSIER.canonicalOwner,
  route,
  activeModules:["INTENDED_ACTUAL","AUTHORIZATION_STANDING","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],
  disabledModules:["TEXT_CONCEPT_DEVELOPMENT","STRATEGY_REVISION"],
  exitAllowed:true,
  lifeNavigationOptional:true,
  returnRule:"VR returns learner-authored relation, contextual difference, remainder, and carry-forward question; it returns no historical fact to the canonical dossier and no recommendation to the learner.",
  scenes:[
    {sceneId:"ORIENTATION",label:"Pre-entry orientation",historicalStateId:null,revealClaimIds:[],hiddenClaimIds:route.deep.claims.map(c=>c.claimId),sourceIds:[],learnerTask:"Acknowledge that this is a bounded reconstruction, not Wangari Maathai's private experience.",requiredBeforeAdvance:["reconstruction-status","exit-available"]},
    {sceneId:"SITUATED_ENTRY",label:"1976 situated entry",historicalStateId:"M-A",revealClaimIds:a.visibleClaims,hiddenClaimIds:a.hiddenClaims,sourceIds:a.sourceIds,learnerTask:"Identify present capabilities, constraints, affected parties, and live possibilities without later outcomes.",requiredBeforeAdvance:["inspect-state","mark-uncertainty"]},
    {sceneId:"EVIDENCE_NEED",label:"Evidence and need field",historicalStateId:"M-A",revealClaimIds:a.visibleClaims,hiddenClaimIds:a.hiddenClaims,sourceIds:a.sourceIds,learnerTask:"Separate documented needs from inference.",requiredBeforeAdvance:["inspect-provenance"]},
    {sceneId:"BOUNDED_ACTION",label:"Bounded action possibilities",historicalStateId:"M-A",revealClaimIds:a.visibleClaims,hiddenClaimIds:a.hiddenClaims,sourceIds:a.sourceIds,learnerTask:"Compare historically plausible bounded actions without guessing the future.",requiredBeforeAdvance:["record-possibility"]},
    {sceneId:"HISTORICAL_REVEAL",label:"1977 tree-planting reveal",historicalStateId:"M-B",revealClaimIds:b.visibleClaims,hiddenClaimIds:b.hiddenClaims,sourceIds:b.sourceIds,learnerTask:"Inspect the historical action and its claim ceiling.",requiredBeforeAdvance:["inspect-provenance","inspect-ceiling"]},
    {sceneId:"CAPABILITY_GROWTH",label:"Capability growth",historicalStateId:"M-B",revealClaimIds:b.visibleClaims,hiddenClaimIds:b.hiddenClaims,sourceIds:b.sourceIds,learnerTask:"Identify what became newly reachable after repeated organizing.",requiredBeforeAdvance:["inspect-capability-delta"]},
    {sceneId:"RELOCATION",label:"Return as re-location",historicalStateId:"M-B",revealClaimIds:b.visibleClaims,hiddenClaimIds:b.hiddenClaims,sourceIds:b.sourceIds,learnerTask:"Compare the practical field before and after capability expansion.",requiredBeforeAdvance:["state-comparison"]},
    {sceneId:"GOVERNANCE_CONSTRAINT",label:"Governance constraint appears",historicalStateId:"M-C",revealClaimIds:c.visibleClaims,hiddenClaimIds:c.hiddenClaims,sourceIds:c.sourceIds,learnerTask:"Identify which institutional constraints changed the task.",requiredBeforeAdvance:["inspect-constraint-delta"]},
    {sceneId:"PROBLEM_MAP_EXPANSION",label:"Problem-map expansion",historicalStateId:"M-C",revealClaimIds:c.visibleClaims,hiddenClaimIds:c.hiddenClaims,sourceIds:c.sourceIds,learnerTask:"Compare the earlier environmental/livelihood map with the later environmental/governance map.",requiredBeforeAdvance:["map-comparison"]},
    {sceneId:"PORTABILITY_GATE",label:"Portability gate",historicalStateId:"M-C",revealClaimIds:c.visibleClaims,hiddenClaimIds:c.hiddenClaims,sourceIds:c.sourceIds,learnerTask:"State one structural relation, one contextual difference, one non-portable element, one ceiling, and one reversible test.",requiredBeforeAdvance:["valid-portability-submission"]},
    {sceneId:"AUTHORIAL_RETURN",label:"Authorial Return",historicalStateId:null,revealClaimIds:c.visibleClaims,hiddenClaimIds:c.hiddenClaims,sourceIds:c.sourceIds,learnerTask:"Create a learner-authored return artifact without recommendation or personality inference.",requiredBeforeAdvance:["valid-return-artifact"]},
    {sceneId:"OFF",label:"OFF",historicalStateId:null,revealClaimIds:[],hiddenClaimIds:[],sourceIds:[],learnerTask:"Exit the immersive scaffold and return to ordinary context.",requiredBeforeAdvance:[]}
  ]
};

export function hindsightLeakage(h:MaathaiVrHarness){
  const failures:string[]=[];
  for(const scene of h.scenes){
    if(!scene.historicalStateId) continue;
    const allowed=historicalView(h.route,scene.historicalStateId).visibleClaims.map(c=>c.claimId);
    for(const id of scene.revealClaimIds) if(!allowed.includes(id)) failures.push(scene.sceneId+":"+id);
    for(const id of scene.hiddenClaimIds) if(allowed.includes(id)) failures.push(scene.sceneId+":hidden-visible:"+id);
  }
  return {passes:failures.length===0,failures};
}

export function provenanceRecovery(h:MaathaiVrHarness){
  const failures:string[]=[];
  for(const scene of h.scenes){
    for(const claimId of scene.revealClaimIds){
      const p=recoverProvenance(h.route,claimId);
      if(!p.sources.length) failures.push(scene.sceneId+":"+claimId+":no-source");
      for(const s of p.sources){
        if(!scene.sourceIds.includes(s.sourceId)) failures.push(scene.sceneId+":"+claimId+":missing-scene-source:"+s.sourceId);
      }
    }
  }
  return {passes:failures.length===0,failures};
}

export function capabilityComprehension(h:MaathaiVrHarness){
  const t1=capabilityChange(h.route,"M-T1");
  const t2=capabilityChange(h.route,"M-T2");
  return {
    passes:t1.capabilityDelta.gained.length>0 && t2.constraintDelta.added.length>0,
    firstTransitionGains:t1.capabilityDelta.gained,
    secondTransitionConstraints:t2.constraintDelta.added
  };
}

export function portabilityInflationCheck(h:MaathaiVrHarness,p:PortabilitySubmission){
  return validatePortabilitySubmission(h.route,p);
}

export function validateReturnArtifact(a:VrReturnArtifact){
  const failures:string[]=[];
  if(!a.structuralRelation.trim()) failures.push("missing-structural-relation");
  if(!a.evidenceClaimId.trim()) failures.push("missing-evidence-claim");
  if(!a.contextualDifference.trim()) failures.push("missing-contextual-difference");
  if(!a.remainder.trim()) failures.push("missing-remainder");
  if(!a.carryForwardQuestion.trim()) failures.push("missing-carry-forward-question");
  const lower=(a.structuralRelation+" "+a.carryForwardQuestion).toLowerCase();
  if(lower.includes("should imitate")||lower.includes("be like maathai")||lower.includes("must do what maathai")) failures.push("recommendation-inflation");
  return {passes:failures.length===0,failures};
}

export function offReturnCheck(h:MaathaiVrHarness){
  const ids=h.scenes.map(s=>s.sceneId);
  const returnIndex=ids.indexOf("AUTHORIAL_RETURN");
  const offIndex=ids.indexOf("OFF");
  return {
    passes:returnIndex>=0 && offIndex===ids.length-1 && returnIndex===offIndex-1 && h.exitAllowed && h.lifeNavigationOptional,
    returnIndex,
    offIndex
  };
}

export function validateMaathaiVrHarness(h:MaathaiVrHarness){
  const failures:string[]=[];
  if(h.canonicalOwner!==MAATHAI_DOSSIER.canonicalOwner) failures.push("canonical-owner-drift");
  if(h.activeModules.includes("TEXT_CONCEPT_DEVELOPMENT")) failures.push("aristotle-module-leakage");
  if(h.activeModules.includes("STRATEGY_REVISION")) failures.push("mandela-module-leakage");
  const hl=hindsightLeakage(h); if(!hl.passes) failures.push(...hl.failures.map(x=>"hindsight:"+x));
  const pr=provenanceRecovery(h); if(!pr.passes) failures.push(...pr.failures.map(x=>"provenance:"+x));
  if(!capabilityComprehension(h).passes) failures.push("capability-comprehension-structure");
  if(!offReturnCheck(h).passes) failures.push("off-return-sequence");
  return {passes:failures.length===0,failures};
}
