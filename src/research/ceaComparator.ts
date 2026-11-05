import { DomainCase, PrimitiveName } from "./translation5";

export interface CEARecord {
  claim: string;
  evidence: string[];
  action: string[];
}

export interface ComparatorProjection {
  prfId: string;
  cea: CEARecord;
  omitted: PrimitiveName[];
}

export interface ComparatorLossAudit {
  prfId: string;
  retained: string[];
  lost: string[];
  materiallyLost: boolean;
}

export function projectToCEA(domain:DomainCase):ComparatorProjection[] {
  return domain.prfs.map(prf=>{
    const claim=prf.claims[0];
    const taskStructure=domain.taskStructures.find(x=>x.prfId===prf.id);
    if(!taskStructure) throw new Error(`Missing task structure for ${prf.id}`);
    return {
      prfId:prf.id,
      cea:{
        claim:claim.proposition,
        evidence:[...claim.evidence],
        action:[...taskStructure.licensedActions]
      },
      omitted:[
        "TASK","WARRANT","BACKGROUND","CLAIM_CEILING",
        "ONTOLOGY","STANDING","REMAINDER","AUXILIARY","AGENCY"
      ]
    };
  });
}

export function auditComparatorLoss(
  domain:DomainCase,
  projection:ComparatorProjection
):ComparatorLossAudit {
  const prf=domain.prfs.find(x=>x.id===projection.prfId);
  if(!prf) throw new Error(`Unknown PRF ${projection.prfId}`);
  const claim=prf.claims[0];

  const lost:string[]=[];
  if(claim.warrants.length>0) lost.push("warrant");
  if(claim.backgroundCommitments.length>0) lost.push("background commitments");
  if(claim.claimCeiling.trim().length>0) lost.push("claim ceiling");
  if(claim.ontologyCommitments.length>0) lost.push("ontology commitments");
  if(claim.standing.length>0) lost.push("standing");
  lost.push(
    "directed translation remainder",
    "auxiliary assumptions",
    "agency diagnostics",
    "explicit task identity"
  );

  return {
    prfId:projection.prfId,
    retained:["claim content","evidence list","licensed action list"],
    lost:[...new Set(lost)],
    materiallyLost:lost.length>0
  };
}
