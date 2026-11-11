export type FourMoveId="PORTABILITY"|"CEILING"|"AUTHORIZATION"|"RETURN";

export interface FourMoveGovernanceMove{
  id:FourMoveId;
  publicLabel:string;
  publicQuestion:string;
  purpose:string;
  decompression:string[];
}

export interface FourMoveGovernanceModel{
  buildId:string;
  moves:FourMoveGovernanceMove[];
  remainderInvariant:{
    label:string;
    question:string;
    rule:string;
  };
  semanticFirewalls:string[];
}

export const FOUR_MOVE_GOVERNANCE:FourMoveGovernanceModel={
  buildId:"FSP-FOUR-MOVE-GOVERNANCE-1",
  moves:[
    {
      id:"PORTABILITY",
      publicLabel:"Will it still hold here?",
      publicQuestion:"Does the warrant survive when this result is carried into this context?",
      purpose:"Test whether locally warranted results remain warranted after a change of target, scale, representation, role, institution, or action context.",
      decompression:["Partial Map","Relation","Transition","TargetBinding","TranslationAnchor","BridgeBurden","provenance","domain-native warrant"]
    },
    {
      id:"CEILING",
      publicLabel:"What does it justify?",
      publicQuestion:"What is the strongest conclusion that still follows?",
      purpose:"Bound the inferential strength of the result after portability has been tested.",
      decompression:["evidence","inference","Tool result","Firewall","uncertainty","competing models","claim ceiling"]
    },
    {
      id:"AUTHORIZATION",
      publicLabel:"Who may act?",
      publicQuestion:"Who, if anyone, may recommend, decide, impose, resist, intervene, or implement?",
      purpose:"Keep warranted judgment distinct from permission, consent, standing, authority, and legitimate intervention.",
      decompression:["standing","authority","consent","role","jurisdiction","practical power","affected-party review","reversibility","proportionality"]
    },
    {
      id:"RETURN",
      publicLabel:"What happened, and what should reopen?",
      publicQuestion:"What consequences changed the situation, and what would require renewed inquiry?",
      purpose:"Return governed judgment or action to lived Doing through consequence, repair, changed capability, successor conditions, and REOPEN.",
      decompression:["consequence","capability change","repair","institutional effects","re-location","successor conditions","REOPEN"]
    }
  ],
  remainderInvariant:{
    label:"What remains unresolved?",
    question:"What did not cross, remains unresolved, or must stay visible?",
    rule:"Remainder is cross-cutting and must remain visible before, during, and after governed transitions."
  },
  semanticFirewalls:[
    "Portability ≠ statistical generalizability only.",
    "Claim Ceiling ≠ uncertainty.",
    "Authorization ≠ implementation readiness.",
    "Return ≠ summary or generic feedback.",
    "Remainder ≠ unknowns only.",
    "Four-move governance ≠ four-step psychology.",
    "Compression ≠ deletion of domain-native methods or deeper FSP decompressions."
  ]
};

export function fourMove(id:FourMoveId):FourMoveGovernanceMove{
  const move=FOUR_MOVE_GOVERNANCE.moves.find(x=>x.id===id);
  if(!move) throw new Error("unknown four-move id: "+id);
  return structuredClone(move);
}

export function validateFourMoveGovernance(
  model:FourMoveGovernanceModel=FOUR_MOVE_GOVERNANCE
):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  const expected:FourMoveId[]=["PORTABILITY","CEILING","AUTHORIZATION","RETURN"];
  if(model.moves.map(x=>x.id).join(",")!==expected.join(",")) failures.push("move-order-drift");
  if(new Set(model.moves.map(x=>x.id)).size!==4) failures.push("move-cardinality");
  for(const move of model.moves){
    if(!move.publicLabel.trim()) failures.push("missing-label:"+move.id);
    if(!move.publicQuestion.trim()) failures.push("missing-question:"+move.id);
    if(!move.purpose.trim()) failures.push("missing-purpose:"+move.id);
    if(!move.decompression.length) failures.push("missing-decompression:"+move.id);
  }
  if(!model.remainderInvariant.rule.toLowerCase().includes("cross-cutting")) failures.push("remainder-not-invariant");
  for(const required of ["Portability ≠","Claim Ceiling ≠","Authorization ≠","Return ≠","Remainder ≠"]){
    if(!model.semanticFirewalls.some(x=>x.startsWith(required))) failures.push("missing-firewall:"+required);
  }
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
