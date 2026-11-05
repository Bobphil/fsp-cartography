export interface HumanCodingRecord {
  coderId:string;
  packetVersion:string;
  protocolVersion:string;
  itemId:string;
  targetNode:string;
  task:string;
  claimCeiling:string;
  standing:string[];
  remainder:string[];
  reopenCondition:string;
  submittedAt?:string;
}

export interface FieldAgreement {
  field:
    | "targetNode"
    | "task"
    | "claimCeiling"
    | "standing"
    | "remainder"
    | "reopenCondition";
  agreement:number;
}

export interface HumanAgreementAudit {
  coderPair:string;
  comparedItems:number;
  missingItems:string[];
  fieldAgreements:FieldAgreement[];
  structuralAgreement:number;
  interpretiveAgreement:number;
  passesStructuralThreshold:boolean;
}

export interface ProtocolFidelityAudit {
  coderId:string;
  packetVersion:string;
  protocolVersion:string;
  failures:string[];
  passes:boolean;
}

export interface AdjudicationRecord {
  itemId:string;
  field:string;
  coderValues:{coderId:string;value:string|string[]}[];
  adjudicatedValue:string|string[];
  adjudicatorId:string;
  reason:string;
  preservesOriginalRecords:boolean;
}

export interface AdjudicationAudit {
  records:number;
  failures:string[];
  passes:boolean;
}

export interface PostHumanScaleGateInput {
  infrastructurePass:boolean;
  completedIndependentCoders:number;
  protocolFidelityPass:boolean;
  structuralAgreement:number;
  adjudicationFirewallPass:boolean;
  unresolvedCriticalDisagreements:number;
  humanTrialExecuted:boolean;
}

export interface PostHumanScaleGateResult {
  status:"PASS"|"FAIL"|"PENDING";
  failures:string[];
  pendingReasons:string[];
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}
function normalizeText(value:string):string{
  return value.trim().replace(/\s+/g," ").toLowerCase();
}
function textEqual(a:string,b:string):boolean{
  return normalizeText(a)===normalizeText(b);
}
function arrayEqual(a:string[],b:string[]):boolean{
  const x=canonical(a.map(normalizeText));
  const y=canonical(b.map(normalizeText));
  return x.length===y.length && x.every((v,i)=>v===y[i]);
}
function ratio(matches:number,total:number):number{
  return total===0?1:matches/total;
}

export function auditProtocolFidelity(
  records:HumanCodingRecord[],
  expectedPacketVersion:string,
  expectedProtocolVersion:string
):ProtocolFidelityAudit[]{
  const byCoder=new Map<string,HumanCodingRecord[]>();
  for(const record of records){
    const bucket=byCoder.get(record.coderId)??[];
    bucket.push(record);
    byCoder.set(record.coderId,bucket);
  }

  const audits:ProtocolFidelityAudit[]=[];
  for(const [coderId,coderRecords] of byCoder){
    const failures:string[]=[];
    for(const record of coderRecords){
      if(record.packetVersion!==expectedPacketVersion)
        failures.push(`${record.itemId}:packet-version-mismatch`);
      if(record.protocolVersion!==expectedProtocolVersion)
        failures.push(`${record.itemId}:protocol-version-mismatch`);
      if(!record.itemId.trim()) failures.push("missing-item-id");
      if(!record.targetNode.trim()) failures.push(`${record.itemId}:missing-target-node`);
      if(!record.task.trim()) failures.push(`${record.itemId}:missing-task`);
      if(!record.claimCeiling.trim()) failures.push(`${record.itemId}:missing-claim-ceiling`);
      if(record.standing.length===0) failures.push(`${record.itemId}:missing-standing`);
      if(!record.reopenCondition.trim()) failures.push(`${record.itemId}:missing-reopen-condition`);
    }
    audits.push({
      coderId,
      packetVersion:expectedPacketVersion,
      protocolVersion:expectedProtocolVersion,
      failures,
      passes:failures.length===0
    });
  }
  return audits;
}

export function compareHumanCoders(
  left:HumanCodingRecord[],
  right:HumanCodingRecord[],
  structuralThreshold=0.80
):HumanAgreementAudit{
  const leftCoder=left[0]?.coderId??"LEFT";
  const rightCoder=right[0]?.coderId??"RIGHT";
  const leftMap=new Map(left.map(r=>[r.itemId,r]));
  const rightMap=new Map(right.map(r=>[r.itemId,r]));
  const allIds=canonical([...leftMap.keys(),...rightMap.keys()]);
  const common=allIds.filter(id=>leftMap.has(id)&&rightMap.has(id));
  const missingItems=allIds.filter(id=>!(leftMap.has(id)&&rightMap.has(id)));

  const fields:FieldAgreement["field"][]=[
    "targetNode","task","claimCeiling","standing","remainder","reopenCondition"
  ];
  const fieldAgreements:FieldAgreement[]=fields.map(field=>{
    let matches=0;
    for(const id of common){
      const a=leftMap.get(id)!;
      const b=rightMap.get(id)!;
      if(field==="standing"||field==="remainder"){
        if(arrayEqual(a[field],b[field])) matches++;
      }else{
        if(textEqual(a[field],b[field])) matches++;
      }
    }
    return {field,agreement:ratio(matches,common.length)};
  });

  const get=(field:FieldAgreement["field"])=>
    fieldAgreements.find(x=>x.field===field)!.agreement;

  const structuralAgreement=(
    get("targetNode")+get("task")+get("claimCeiling")
  )/3;

  const interpretiveAgreement=(
    get("standing")+get("remainder")+get("reopenCondition")
  )/3;

  return {
    coderPair:`${leftCoder}<->${rightCoder}`,
    comparedItems:common.length,
    missingItems,
    fieldAgreements,
    structuralAgreement,
    interpretiveAgreement,
    passesStructuralThreshold:
      common.length>0 &&
      missingItems.length===0 &&
      structuralAgreement>=structuralThreshold
  };
}

export function auditAdjudicationFirewall(
  originalRecords:HumanCodingRecord[],
  adjudications:AdjudicationRecord[]
):AdjudicationAudit{
  const failures:string[]=[];
  const validItems=new Set(originalRecords.map(r=>r.itemId));

  for(const record of adjudications){
    if(!validItems.has(record.itemId))
      failures.push(`${record.itemId}:unknown-item`);
    if(!record.adjudicatorId.trim())
      failures.push(`${record.itemId}:missing-adjudicator`);
    if(!record.reason.trim())
      failures.push(`${record.itemId}:missing-reason`);
    if(!record.preservesOriginalRecords)
      failures.push(`${record.itemId}:original-records-not-preserved`);
    if(record.coderValues.length<2)
      failures.push(`${record.itemId}:insufficient-coder-values`);
  }

  return {
    records:adjudications.length,
    failures,
    passes:failures.length===0
  };
}

export function evaluatePostHumanScaleGate(
  input:PostHumanScaleGateInput
):PostHumanScaleGateResult{
  const failures:string[]=[];
  const pendingReasons:string[]=[];

  if(!input.infrastructurePass) failures.push("infrastructure-not-passed");

  if(!input.humanTrialExecuted){
    pendingReasons.push("human-trial-not-executed");
  }
  if(input.completedIndependentCoders<2){
    pendingReasons.push("fewer-than-two-independent-coders");
  }

  if(input.humanTrialExecuted && input.completedIndependentCoders>=2){
    if(!input.protocolFidelityPass) failures.push("protocol-fidelity-failed");
    if(input.structuralAgreement<0.80) failures.push("structural-agreement-below-0.80");
    if(!input.adjudicationFirewallPass) failures.push("adjudication-firewall-failed");
    if(input.unresolvedCriticalDisagreements>0)
      failures.push("critical-disagreements-unresolved");
  }

  if(failures.length>0) return {status:"FAIL",failures,pendingReasons};
  if(pendingReasons.length>0) return {status:"PENDING",failures,pendingReasons};
  return {status:"PASS",failures:[],pendingReasons:[]};
}
