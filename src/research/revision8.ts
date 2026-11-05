import { ConceptGenealogy } from "./revision7";

export type InstitutionalEdgeType =
  | "ENCODES"
  | "REINFORCES"
  | "DEPENDS_ON"
  | "CONSTRAINS"
  | "ENABLES"
  | "TRANSLATES"
  | "FEEDS_BACK_INTO";

export interface InstitutionalNode {
  nodeId:string;
  kind:"CONCEPT"|"POLICY"|"PRACTICE"|"INSTITUTION"|"CAPABILITY"|"RESOURCE";
  label:string;
  generation:number;
}

export interface InstitutionalEdge {
  edgeId:string;
  fromNodeId:string;
  toNodeId:string;
  type:InstitutionalEdgeType;
  rationale:string;
}

export interface SedimentationNetwork {
  networkId:string;
  nodes:InstitutionalNode[];
  edges:InstitutionalEdge[];
}

export interface CoevolutionRecord {
  recordId:string;
  conceptIds:string[];
  sharedInstitutions:string[];
  mutuallyReinforcing:boolean;
  tensions:string[];
  jointDrift:string[];
}

export interface PolicyPracticeFeedback {
  loopId:string;
  policyNodeId:string;
  practiceNodeId:string;
  conceptNodeIds:string[];
  policyShapesPractice:boolean;
  practiceFeedsPolicy:boolean;
  amplification:string[];
  dampening:string[];
}

export interface LockInAudit {
  networkId:string;
  pathDependencePresent:boolean;
  switchingCosts:string[];
  reinforcingLoops:string[];
  alternativesSuppressed:string[];
  lockInStrength:"LOW"|"MEDIUM"|"HIGH";
  historicallyProduced:boolean;
  lockInJustifiesContinuation:false;
}

export interface RepairWindow {
  windowId:string;
  trigger:string;
  openingConditions:string[];
  closingConditions:string[];
  availableRepairs:string[];
  affectedNodeIds:string[];
  windowOpen:boolean;
  repairMandatory:false;
}

export type CapabilityEffect = "EXPANDS"|"CONSTRAINS"|"MIXED"|"UNKNOWN";

export interface GenerationCapabilityRecord {
  generation:number;
  groupId:string;
  capabilityId:string;
  effect:CapabilityEffect;
  mechanism:string;
  inheritedFromNodeIds:string[];
}

export interface CrossGenerationalCapabilityAudit {
  capabilityId:string;
  records:GenerationCapabilityRecord[];
  expansionGenerations:number[];
  constraintGenerations:number[];
  mixedGenerations:number[];
  unknownGenerations:number[];
  intergenerationalAsymmetry:boolean;
  historicalBenefitJustifiesCurrentBurden:false;
  currentRepairQuestion:string;
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function validateSedimentationNetwork(
  network:SedimentationNetwork
):string[]{
  const failures:string[]=[];
  const nodeIds=new Set(network.nodes.map(n=>n.nodeId));
  for(const edge of network.edges){
    if(!nodeIds.has(edge.fromNodeId) || !nodeIds.has(edge.toNodeId)){
      failures.push(`${edge.edgeId}:dangling-edge`);
    }
  }
  return canonical(failures);
}

export function auditConceptCoevolution(
  genealogies:ConceptGenealogy[],
  sharedInstitutions:string[],
  tensions:string[],
  jointDrift:string[]
):CoevolutionRecord{
  if(genealogies.length<2) throw new Error("at least two concept genealogies required");
  const conceptIds=canonical(genealogies.map(g=>g.concept.conceptId));
  return {
    recordId:`coevolution::${conceptIds.join("+")}`,
    conceptIds,
    sharedInstitutions:canonical(sharedInstitutions),
    mutuallyReinforcing:sharedInstitutions.length>0,
    tensions:canonical(tensions),
    jointDrift:canonical(jointDrift)
  };
}

export function auditPolicyPracticeFeedback(
  network:SedimentationNetwork,
  loop:PolicyPracticeFeedback
):PolicyPracticeFeedback{
  const ids=new Set(network.nodes.map(n=>n.nodeId));
  for(const id of [loop.policyNodeId,loop.practiceNodeId,...loop.conceptNodeIds]){
    if(!ids.has(id)) throw new Error(`feedback references unknown node: ${id}`);
  }
  return structuredClone(loop);
}

export function auditHistoricalLockIn(
  network:SedimentationNetwork,
  input:{
    switchingCosts:string[];
    reinforcingLoops:string[];
    alternativesSuppressed:string[];
  }
):LockInAudit{
  const pathDependencePresent =
    input.switchingCosts.length>0 ||
    input.reinforcingLoops.length>0 ||
    input.alternativesSuppressed.length>0;

  let lockInStrength:LockInAudit["lockInStrength"]="LOW";
  const score =
    input.switchingCosts.length+
    input.reinforcingLoops.length+
    input.alternativesSuppressed.length;
  if(score>=5) lockInStrength="HIGH";
  else if(score>=2) lockInStrength="MEDIUM";

  return {
    networkId:network.networkId,
    pathDependencePresent,
    switchingCosts:canonical(input.switchingCosts),
    reinforcingLoops:canonical(input.reinforcingLoops),
    alternativesSuppressed:canonical(input.alternativesSuppressed),
    lockInStrength,
    historicallyProduced:pathDependencePresent,
    lockInJustifiesContinuation:false
  };
}

export function evaluateRepairWindow(
  window:RepairWindow,
  context:{
    activeConditions:string[];
    blockedConditions:string[];
  }
):RepairWindow{
  const active=new Set(context.activeConditions);
  const blocked=new Set(context.blockedConditions);
  const openingSatisfied=window.openingConditions.every(c=>active.has(c));
  const closureTriggered=window.closingConditions.some(c=>blocked.has(c) || active.has(c));
  return {
    ...structuredClone(window),
    windowOpen:openingSatisfied && !closureTriggered,
    repairMandatory:false
  };
}

export function auditCrossGenerationalCapability(
  capabilityId:string,
  records:GenerationCapabilityRecord[]
):CrossGenerationalCapabilityAudit{
  const relevant=records
    .filter(r=>r.capabilityId===capabilityId)
    .sort((a,b)=>a.generation-b.generation);
  if(relevant.length===0) throw new Error("no capability records");

  const expansionGenerations=canonical(
    relevant.filter(r=>r.effect==="EXPANDS").map(r=>String(r.generation))
  ).map(Number);
  const constraintGenerations=canonical(
    relevant.filter(r=>r.effect==="CONSTRAINS").map(r=>String(r.generation))
  ).map(Number);
  const mixedGenerations=canonical(
    relevant.filter(r=>r.effect==="MIXED").map(r=>String(r.generation))
  ).map(Number);
  const unknownGenerations=canonical(
    relevant.filter(r=>r.effect==="UNKNOWN").map(r=>String(r.generation))
  ).map(Number);

  const distinctEffects=new Set(relevant.map(r=>r.effect));
  const intergenerationalAsymmetry=distinctEffects.size>1;

  return {
    capabilityId,
    records:structuredClone(relevant),
    expansionGenerations,
    constraintGenerations,
    mixedGenerations,
    unknownGenerations,
    intergenerationalAsymmetry,
    historicalBenefitJustifiesCurrentBurden:false,
    currentRepairQuestion:
      "What present repair would preserve warranted inherited benefits while reducing avoidable constraints on current and future capability?"
  };
}
