import { EvidenceSnapshot } from "./translation3";
import { TaskRelevantStructure } from "./translation2";

export type PerturbationKind =
  | "ADD_SHARED_EVIDENCE"
  | "ADD_PRF_SPECIFIC_EVIDENCE"
  | "REMOVE_SHARED_EVIDENCE"
  | "ALTER_AUXILIARY"
  | "ADD_CONSEQUENCE"
  | "ADD_ACTION"
  | "REMOVE_ACTION";

export interface PerturbationSpec {
  id: string;
  kind: PerturbationKind;
  targetPrfId?: string;
  value: string;
  secondaryValue?: string;
}

export interface GeneratedPerturbation {
  spec: PerturbationSpec;
  snapshot: EvidenceSnapshot;
}

export interface AuxiliaryNetworkNode {
  id: string;
  prfId: string;
  assumption: string;
}

export interface AuxiliaryNetworkEdge {
  from: string;
  to: string;
  relation: "SUPPORTS" | "DEPENDS_ON";
}

export interface AuxiliaryNetwork {
  nodes: AuxiliaryNetworkNode[];
  edges: AuxiliaryNetworkEdge[];
}

export interface AblationResult {
  removedNodeId: string;
  affectedPrfIds: string[];
  changedStructures: string[];
  sensitive: boolean;
}

export interface FalseEquivalenceAssessment {
  surfaceActionsMatch: boolean;
  empiricalCommitmentsMatch: boolean;
  practicalConstraintsMatch: boolean;
  predictedConsequencesMatch: boolean;
  auxiliarySupportMatch: boolean;
  remainderMatch: boolean;
  falseEquivalenceDetected: boolean;
  reasons: string[];
}

function clone<T>(value:T):T {
  return structuredClone(value);
}

function canonical(values:string[]):string[] {
  return [...new Set(values)].sort();
}

function same(left:string[],right:string[]):boolean {
  const a=canonical(left);
  const b=canonical(right);
  return a.length===b.length && a.every((v,i)=>v===b[i]);
}

function findStructure(snapshot:EvidenceSnapshot,prfId:string):TaskRelevantStructure {
  const found=snapshot.taskStructures.find(x=>x.prfId===prfId);
  if(!found) throw new Error(`Missing task structure for ${prfId}`);
  return found;
}

export function generatePerturbation(
  baseline:EvidenceSnapshot,
  spec:PerturbationSpec
):GeneratedPerturbation {
  const next=clone(baseline);
  next.id=`${baseline.id}::${spec.id}`;
  next.label=`${baseline.label} / ${spec.id}`;

  const target=spec.targetPrfId
    ? findStructure(next,spec.targetPrfId)
    : null;

  switch(spec.kind){
    case "ADD_SHARED_EVIDENCE":
      next.evidence=canonical([...next.evidence,spec.value]);
      for(const structure of next.taskStructures){
        structure.empiricalCommitments=canonical([...structure.empiricalCommitments,spec.value]);
      }
      break;

    case "ADD_PRF_SPECIFIC_EVIDENCE":
      if(!target) throw new Error("targetPrfId required");
      next.evidence=canonical([...next.evidence,spec.value]);
      target.empiricalCommitments=canonical([...target.empiricalCommitments,spec.value]);
      break;

    case "REMOVE_SHARED_EVIDENCE":
      next.evidence=next.evidence.filter(x=>x!==spec.value);
      for(const structure of next.taskStructures){
        structure.empiricalCommitments=structure.empiricalCommitments.filter(x=>x!==spec.value);
      }
      break;

    case "ALTER_AUXILIARY": {
      if(!spec.targetPrfId) throw new Error("targetPrfId required");
      const aux=next.auxiliaryAssumptions.find(x=>x.prfId===spec.targetPrfId);
      if(!aux) throw new Error(`Missing auxiliary assumptions for ${spec.targetPrfId}`);
      aux.assumptions=canonical([
        ...aux.assumptions.filter(x=>x!==spec.secondaryValue),
        spec.value
      ]);
      break;
    }

    case "ADD_CONSEQUENCE":
      if(!target) throw new Error("targetPrfId required");
      target.predictedConsequences=canonical([...target.predictedConsequences,spec.value]);
      break;

    case "ADD_ACTION":
      if(!target) throw new Error("targetPrfId required");
      target.licensedActions=canonical([...target.licensedActions,spec.value]);
      break;

    case "REMOVE_ACTION":
      if(!target) throw new Error("targetPrfId required");
      target.licensedActions=target.licensedActions.filter(x=>x!==spec.value);
      break;
  }

  return {spec,snapshot:next};
}

export function generateOutOfSampleSuite(
  baseline:EvidenceSnapshot,
  specs:PerturbationSpec[]
):GeneratedPerturbation[] {
  const ids=new Set<string>();
  for(const spec of specs){
    if(ids.has(spec.id)) throw new Error(`Duplicate perturbation id: ${spec.id}`);
    ids.add(spec.id);
  }
  return specs.map(spec=>generatePerturbation(baseline,spec));
}

export function buildAuxiliaryNetwork(snapshot:EvidenceSnapshot):AuxiliaryNetwork {
  const nodes:AuxiliaryNetworkNode[]=[];
  const edges:AuxiliaryNetworkEdge[]=[];

  for(const group of snapshot.auxiliaryAssumptions){
    group.assumptions.forEach((assumption,index)=>{
      const id=`${group.prfId}:aux:${index}`;
      nodes.push({id,prfId:group.prfId,assumption});
      if(index>0){
        edges.push({
          from:`${group.prfId}:aux:${index-1}`,
          to:id,
          relation:"SUPPORTS"
        });
      }
    });
  }

  return {nodes,edges};
}

export function ablateAuxiliaryNode(
  snapshot:EvidenceSnapshot,
  nodeId:string,
  dependentStructureKeys:Record<string,(keyof TaskRelevantStructure)[]>
):AblationResult {
  const network=buildAuxiliaryNetwork(snapshot);
  const node=network.nodes.find(x=>x.id===nodeId);
  if(!node) throw new Error(`Unknown auxiliary node ${nodeId}`);

  const changedStructures=(dependentStructureKeys[nodeId]??[]).map(String);

  return {
    removedNodeId:nodeId,
    affectedPrfIds:[node.prfId],
    changedStructures,
    sensitive:changedStructures.length>0
  };
}

export function assessFalseEquivalence(
  left:TaskRelevantStructure,
  right:TaskRelevantStructure,
  leftAux:string[],
  rightAux:string[],
  leftRemainder:string[],
  rightRemainder:string[]
):FalseEquivalenceAssessment {
  const surfaceActionsMatch=same(left.licensedActions,right.licensedActions);
  const empiricalCommitmentsMatch=same(left.empiricalCommitments,right.empiricalCommitments);
  const practicalConstraintsMatch=same(left.practicalConstraints,right.practicalConstraints);
  const predictedConsequencesMatch=same(left.predictedConsequences,right.predictedConsequences);
  const auxiliarySupportMatch=same(leftAux,rightAux);
  const remainderMatch=same(leftRemainder,rightRemainder);

  const reasons:string[]=[];
  if(surfaceActionsMatch && !empiricalCommitmentsMatch) reasons.push("same actions, different empirical commitments");
  if(surfaceActionsMatch && !practicalConstraintsMatch) reasons.push("same actions, different practical constraints");
  if(surfaceActionsMatch && !predictedConsequencesMatch) reasons.push("same actions, different predicted consequences");
  if(surfaceActionsMatch && !auxiliarySupportMatch) reasons.push("same actions, different auxiliary support");
  if(surfaceActionsMatch && !remainderMatch) reasons.push("same actions, different translation remainder");

  return {
    surfaceActionsMatch,
    empiricalCommitmentsMatch,
    practicalConstraintsMatch,
    predictedConsequencesMatch,
    auxiliarySupportMatch,
    remainderMatch,
    falseEquivalenceDetected:reasons.length>0,
    reasons
  };
}
