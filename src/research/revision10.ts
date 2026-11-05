export type CompensationStatus =
  | "COMPENSABLE"
  | "PARTIALLY_COMPENSABLE"
  | "NON_COMPENSABLE"
  | "UNRESOLVED";

export interface CapabilityFloor {
  floorId:string;
  capabilityId:string;
  groupId:string;
  description:string;
  protectedMinimum:string;
  breachConditions:string[];
  waivable:false;
}

export interface CompensationBoundary {
  boundaryId:string;
  groupId:string;
  capabilityId:string;
  loss:string;
  proposedCompensation:string[];
  status:CompensationStatus;
  reasons:string[];
}

export interface BurdenShiftRecord {
  burdenId:string;
  fromGroupId?:string;
  toGroupId:string;
  burden:string;
  newlyCreated:boolean;
  consented:boolean;
  exitMeaningful:boolean;
  voiceMeaningful:boolean;
  appealMeaningful:boolean;
  affectsProtectedFloor:boolean;
}

export interface BurdenShiftAudit {
  burdens:BurdenShiftRecord[];
  shiftedToGroups:string[];
  newlyCreatedBurdens:string[];
  unconsentedShifts:string[];
  protectedFloorRisks:string[];
  burdenShiftLegitimate:boolean;
}

export interface RepairLegitimacyInput {
  repairId:string;
  protectedFloors:CapabilityFloor[];
  compensationBoundaries:CompensationBoundary[];
  burdenAudit:BurdenShiftAudit;
  evidenceVisible:boolean;
  minorityReportsPreserved:boolean;
  reopenAvailable:boolean;
  appealIndependent:boolean;
  retaliationRisk:"LOW"|"ELEVATED"|"SEVERE";
}

export type RepairLegitimacyStatus =
  | "LEGITIMATE_WITH_REOPEN"
  | "LEGITIMATE_BUT_CONTESTED"
  | "BLOCKED_PROTECTED_FLOOR"
  | "BLOCKED_BURDEN_SHIFT"
  | "BLOCKED_GOVERNANCE"
  | "UNRESOLVED";

export interface RepairLegitimacyAudit {
  repairId:string;
  status:RepairLegitimacyStatus;
  protectedFloorBreaches:string[];
  unresolvedCompensation:string[];
  governanceFailures:string[];
  legitimacyAuthorizesTruth:false;
  majorityApprovalSufficient:false;
  reasons:string[];
}

export interface PartyAuthorization {
  partyId:string;
  affectedGroupIds:string[];
  authorization:"AUTHORIZE"|"CONDITIONALLY_AUTHORIZE"|"WITHHOLD"|"OBJECT";
  reasons:string[];
  conditions:string[];
  standingAdequate:boolean;
  coercionRisk:"LOW"|"ELEVATED"|"SEVERE";
}

export interface MultiPartyAuthorizationAudit {
  parties:PartyAuthorization[];
  authorizingParties:string[];
  conditionalParties:string[];
  withholdingParties:string[];
  objectingParties:string[];
  allAffectedGroupsRepresented:boolean;
  coercedAuthorizations:string[];
  unanimous:boolean;
  convergentReasons:boolean;
  authorizationWithoutConvergence:boolean;
  status:
    | "AUTHORIZED_WITHOUT_CONVERGENCE"
    | "AUTHORIZED_CONDITIONALLY"
    | "NOT_AUTHORIZED"
    | "BLOCKED_COERCION"
    | "BLOCKED_MISSING_STANDING";
}

function canonical(values:string[]):string[]{
  return [...new Set(values)].sort();
}

export function auditCompensationBoundary(
  boundary:CompensationBoundary,
  floors:CapabilityFloor[]
):CompensationBoundary{
  const relevant=floors.filter(f=>
    f.groupId===boundary.groupId &&
    f.capabilityId===boundary.capabilityId
  );
  if(relevant.some(f=>f.breachConditions.some(c=>boundary.loss.includes(c)))){
    return {
      ...structuredClone(boundary),
      status:"NON_COMPENSABLE",
      reasons:canonical([
        ...boundary.reasons,
        "loss crosses a protected capability floor"
      ])
    };
  }
  return structuredClone(boundary);
}

export function auditBurdenShift(
  burdens:BurdenShiftRecord[]
):BurdenShiftAudit{
  const shiftedToGroups=canonical(burdens.map(b=>b.toGroupId));
  const newlyCreatedBurdens=canonical(
    burdens.filter(b=>b.newlyCreated).map(b=>b.burdenId)
  );
  const unconsentedShifts=canonical(
    burdens
      .filter(b=>
        !b.consented ||
        !b.exitMeaningful ||
        !b.voiceMeaningful ||
        !b.appealMeaningful
      )
      .map(b=>b.burdenId)
  );
  const protectedFloorRisks=canonical(
    burdens.filter(b=>b.affectsProtectedFloor).map(b=>b.burdenId)
  );

  return {
    burdens:structuredClone(burdens),
    shiftedToGroups,
    newlyCreatedBurdens,
    unconsentedShifts,
    protectedFloorRisks,
    burdenShiftLegitimate:
      unconsentedShifts.length===0 &&
      protectedFloorRisks.length===0
  };
}

export function auditRepairLegitimacy(
  input:RepairLegitimacyInput
):RepairLegitimacyAudit{
  const protectedFloorBreaches=input.compensationBoundaries
    .filter(b=>b.status==="NON_COMPENSABLE")
    .map(b=>b.boundaryId);
  const unresolvedCompensation=input.compensationBoundaries
    .filter(b=>b.status==="UNRESOLVED" || b.status==="PARTIALLY_COMPENSABLE")
    .map(b=>b.boundaryId);

  const governanceFailures:string[]=[];
  if(!input.evidenceVisible) governanceFailures.push("evidence-not-visible");
  if(!input.minorityReportsPreserved) governanceFailures.push("minority-reports-not-preserved");
  if(!input.reopenAvailable) governanceFailures.push("reopen-unavailable");
  if(!input.appealIndependent) governanceFailures.push("appeal-not-independent");
  if(input.retaliationRisk==="SEVERE") governanceFailures.push("severe-retaliation-risk");

  let status:RepairLegitimacyStatus;
  const reasons:string[]=[];

  if(protectedFloorBreaches.length>0){
    status="BLOCKED_PROTECTED_FLOOR";
    reasons.push("repair crosses a protected capability floor");
  } else if(!input.burdenAudit.burdenShiftLegitimate){
    status="BLOCKED_BURDEN_SHIFT";
    reasons.push("repair shifts burdens under illegitimate conditions");
  } else if(governanceFailures.length>0){
    status="BLOCKED_GOVERNANCE";
    reasons.push("repair governance conditions are insufficient");
  } else if(unresolvedCompensation.length>0){
    status="UNRESOLVED";
    reasons.push("compensation boundaries remain unresolved");
  } else if(input.compensationBoundaries.some(b=>b.status==="PARTIALLY_COMPENSABLE")){
    status="LEGITIMATE_BUT_CONTESTED";
    reasons.push("repair remains contested despite meeting current governance conditions");
  } else {
    status="LEGITIMATE_WITH_REOPEN";
    reasons.push("repair satisfies represented floor, burden, and governance conditions while remaining reopenable");
  }

  return {
    repairId:input.repairId,
    status,
    protectedFloorBreaches:canonical(protectedFloorBreaches),
    unresolvedCompensation:canonical(unresolvedCompensation),
    governanceFailures:canonical(governanceFailures),
    legitimacyAuthorizesTruth:false,
    majorityApprovalSufficient:false,
    reasons
  };
}

export function auditMultiPartyAuthorization(
  parties:PartyAuthorization[],
  requiredAffectedGroups:string[]
):MultiPartyAuthorizationAudit{
  if(parties.length<2) throw new Error("at least two parties required");

  const authorizingParties=canonical(
    parties.filter(p=>p.authorization==="AUTHORIZE").map(p=>p.partyId)
  );
  const conditionalParties=canonical(
    parties.filter(p=>p.authorization==="CONDITIONALLY_AUTHORIZE").map(p=>p.partyId)
  );
  const withholdingParties=canonical(
    parties.filter(p=>p.authorization==="WITHHOLD").map(p=>p.partyId)
  );
  const objectingParties=canonical(
    parties.filter(p=>p.authorization==="OBJECT").map(p=>p.partyId)
  );
  const representedGroups=canonical(parties.flatMap(p=>p.affectedGroupIds));
  const allAffectedGroupsRepresented=requiredAffectedGroups.every(g=>representedGroups.includes(g));
  const coercedAuthorizations=canonical(
    parties
      .filter(p=>
        (p.authorization==="AUTHORIZE" || p.authorization==="CONDITIONALLY_AUTHORIZE") &&
        p.coercionRisk==="SEVERE"
      )
      .map(p=>p.partyId)
  );
  const unanimous=parties.every(p=>p.authorization==="AUTHORIZE");
  const normalizedReasons=parties.map(p=>canonical(p.reasons).join("|"));
  const convergentReasons=new Set(normalizedReasons).size===1;

  let status:MultiPartyAuthorizationAudit["status"];
  if(!allAffectedGroupsRepresented || parties.some(p=>!p.standingAdequate)){
    status="BLOCKED_MISSING_STANDING";
  } else if(coercedAuthorizations.length>0){
    status="BLOCKED_COERCION";
  } else if(objectingParties.length>0 || withholdingParties.length>0){
    status="NOT_AUTHORIZED";
  } else if(conditionalParties.length>0){
    status="AUTHORIZED_CONDITIONALLY";
  } else {
    status="AUTHORIZED_WITHOUT_CONVERGENCE";
  }

  return {
    parties:structuredClone(parties),
    authorizingParties,
    conditionalParties,
    withholdingParties,
    objectingParties,
    allAffectedGroupsRepresented,
    coercedAuthorizations,
    unanimous,
    convergentReasons,
    authorizationWithoutConvergence:
      (status==="AUTHORIZED_WITHOUT_CONVERGENCE" || status==="AUTHORIZED_CONDITIONALLY") &&
      !convergentReasons,
    status
  };
}
