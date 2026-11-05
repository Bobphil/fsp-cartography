import { PrimitiveName } from "./translation5";

export interface PrimitiveMinimalityResult {
  retainedPrimitives: PrimitiveName[];
  removedPrimitives: PrimitiveName[];
  preservedCapabilities: string[];
  lostCapabilities: string[];
  minimalityStatus:
    | "LOSSLESS_FOR_TESTED_CAPABILITIES"
    | "LOSSY_BUT_USABLE"
    | "TOO_LOSSY";
}

const primitiveCapabilities:Record<PrimitiveName,string[]>={
  TASK:["task-boundedness"],
  EVIDENCE:["evidence-provenance"],
  WARRANT:["licensing"],
  BACKGROUND:["context-sensitivity"],
  CLAIM_CEILING:["claim-restraint"],
  ONTOLOGY:["ontological-pluralism"],
  STANDING:["standing","anti-domination"],
  REMAINDER:["loss-tracking"],
  AUXILIARY:["auxiliary-sensitivity"],
  AGENCY:["anti-domination"]
};

export function challengePrimitiveMinimality(
  retainedPrimitives:PrimitiveName[],
  requiredCapabilities:string[]
):PrimitiveMinimalityResult {
  const all:PrimitiveName[]=[
    "TASK","EVIDENCE","WARRANT","BACKGROUND","CLAIM_CEILING",
    "ONTOLOGY","STANDING","REMAINDER","AUXILIARY","AGENCY"
  ];
  const retained=[...new Set(retainedPrimitives)];
  const removed=all.filter(p=>!retained.includes(p));
  const preserved=new Set<string>();
  for(const p of retained){
    for(const c of primitiveCapabilities[p]) preserved.add(c);
  }
  const lostCapabilities=requiredCapabilities.filter(c=>!preserved.has(c));
  const preservedCapabilities=requiredCapabilities.filter(c=>preserved.has(c));

  let minimalityStatus:PrimitiveMinimalityResult["minimalityStatus"];
  if(lostCapabilities.length===0) minimalityStatus="LOSSLESS_FOR_TESTED_CAPABILITIES";
  else if(lostCapabilities.length<=2) minimalityStatus="LOSSY_BUT_USABLE";
  else minimalityStatus="TOO_LOSSY";

  return {
    retainedPrimitives:retained,
    removedPrimitives:removed,
    preservedCapabilities,
    lostCapabilities,
    minimalityStatus
  };
}
