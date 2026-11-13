export type HorizonPerceptionErrorCode=
  |"HP-TIME-NEAR"
  |"HP-PROB-UP"
  |"HP-FEAS-UP"
  |"HP-RECOMMEND"
  |"HP-DESTINY"
  |"HP-CONTINGENCY-LOSS"
  |"HP-IDENTITY-LOSS"
  |"HP-ATTN-FAIL"
  |"HP-PANEL-DEPENDENCE";

export interface HorizonPerceptionParticipant{
  participantCode:string;
  pilotVersion:"1.0";
  priorFspExposure:boolean;
  scores:{D1:number;D2:number;D3:number;D4:number;D5:number};
  errors:HorizonPerceptionErrorCode[];
  transferChoice:"A"|"B"|"C"|null;
}

export const HORIZON_PERCEPTION_PILOT_VERSION="1.0" as const;
export const HORIZON_PERCEPTION_TARGET="FSP-VR-MAATHAI-FIELD-3" as const;
export const HORIZON_PERCEPTION_COHORT_SIZE=5;

export function participantTotal(p:HorizonPerceptionParticipant){
  return p.scores.D1+p.scores.D2+p.scores.D3+p.scores.D4+p.scores.D5;
}

export function participantPasses(p:HorizonPerceptionParticipant){
  return participantTotal(p)>=8;
}

export function cohortSummary(rows:HorizonPerceptionParticipant[]){
  const passes=rows.filter(participantPasses).length;
  const countError=(code:HorizonPerceptionErrorCode)=>rows.filter(r=>r.errors.includes(code)).length;
  const temporal=countError("HP-TIME-NEAR");
  const probability=countError("HP-PROB-UP");
  const recommendation=countError("HP-RECOMMEND")+countError("HP-DESTINY");
  const panelDependence=countError("HP-PANEL-DEPENDENCE");
  return {
    n:rows.length,
    passes,
    temporalNearErrors:temporal,
    probabilityErrors:probability,
    recommendationOrDestinyErrors:recommendation,
    panelDependence,
    fullCohortPass:
      rows.length===HORIZON_PERCEPTION_COHORT_SIZE &&
      passes>=4 &&
      temporal<=1 &&
      probability<=1 &&
      recommendation<=1,
    stopEarly:
      temporal>=2 ||
      probability>=2 ||
      recommendation>=2 ||
      panelDependence>=3
  };
}

export function validateParticipant(p:HorizonPerceptionParticipant){
  const failures:string[]=[];
  if(p.pilotVersion!==HORIZON_PERCEPTION_PILOT_VERSION) failures.push("version-mismatch");
  for(const [k,v] of Object.entries(p.scores)){
    if(!Number.isInteger(v)||v<0||v>2) failures.push("invalid-score:"+k);
  }
  if(p.transferChoice!==null&&!["A","B","C"].includes(p.transferChoice)) failures.push("invalid-transfer");
  return {passes:failures.length===0,failures};
}

export function classifyInterpretation(p:HorizonPerceptionParticipant){
  if(p.errors.includes("HP-TIME-NEAR")) return "P3_TEMPORAL_NEARNESS_ERROR";
  if(p.errors.some(e=>["HP-PROB-UP","HP-RECOMMEND","HP-DESTINY"].includes(e))) return "P4_PROBABILITY_OR_RECOMMENDATION_ERROR";
  if(p.scores.D2===2&&p.scores.D3===2&&p.scores.D4===2&&p.scores.D5===2) return "P1_STRONG_HORIZON_INTERPRETATION";
  return "P2_PARTIAL_HORIZON_INTERPRETATION";
}
