export type HorizonRetentionCriterion=
  |"VISIBLE_TETHER"
  |"CONDITIONALLY_LEGIBLE"
  |"INSIDE_PERCEPTUAL_FIELD"
  |"DISTINCT_FROM_CURRENT_REACHABILITY"
  |"REENTERABLE"
  |"PRESENT_RELATIVE"
  |"RECOMPOSITION_SUPPORTING"
  |"NON_PREDICTIVE";

export interface HorizonRetentionScore{
  criterion:HorizonRetentionCriterion;
  score:0|1|2;
  finding:string;
  evidence:string[];
}

export interface HorizonRetentionReview{
  reviewId:string;
  prototypeId:string;
  sequence:string[];
  scores:HorizonRetentionScore[];
  total:number;
  maximum:number;
  classification:"GRAPH_TRACE"|"WEAK_HORIZON_RETENTION"|"HORIZON_RETAINING";
  passes:boolean;
  nextBuild:string;
}

export const MAATHAI_FIELD_2_HORIZON_REVIEW:HorizonRetentionReview={
  reviewId:"FSP-VR-HORIZON-RETENTION-REVIEW-1",
  prototypeId:"FSP-VR-MAATHAI-FIELD-2",
  sequence:["NORMAL","ACCELERATE","INSPECT:P-ADVOCATE","EXPAND_GATE:P-ADVOCATE","PIN:P-ADVOCATE","FREEZE"],
  scores:[
    {
      criterion:"VISIBLE_TETHER",
      score:1,
      finding:"The pinned path remains connected to the center as a ghosted SVG path, but it is still the same graph edge rather than a transformed horizon tether.",
      evidence:["pinned out-of-range path remains rendered","ghosting preserves origin at central locus","no dedicated horizon-tether geometry"]
    },
    {
      criterion:"CONDITIONALLY_LEGIBLE",
      score:1,
      finding:"Requirement beads persist, but Freeze does not compress the decisive contingency chain toward the visible horizon.",
      evidence:["pinned path keeps beads visible","beads remain distributed along original long path","no compressed contingency summary in field"]
    },
    {
      criterion:"INSIDE_PERCEPTUAL_FIELD",
      score:0,
      finding:"The depth-4 endpoint can be clipped after Freeze because global present zoom pushes the distant terminal region beyond the SVG half-width.",
      evidence:["advocacy radius 430","Freeze scale 1.34","effective radius 576.2","SVG half-width 560 before endpoint radius"]
    },
    {
      criterion:"DISTINCT_FROM_CURRENT_REACHABILITY",
      score:1,
      finding:"Reduced opacity weakly distinguishes retained beyond-horizon paths from currently reachable ones, but no dedicated horizon state exists.",
      evidence:["out-of-range pinned paths ghost to reduced opacity","no separate horizon marker grammar"]
    },
    {
      criterion:"REENTERABLE",
      score:1,
      finding:"Pinned out-of-range paths remain pointer-active, but selecting them does not automatically widen temporal depth toward the retained future.",
      evidence:["pointer events preserved for pinned paths","selection does not change temporalMode"]
    },
    {
      criterion:"PRESENT_RELATIVE",
      score:1,
      finding:"The path still originates at the Maathai locus, but the distant future is not geometrically reorganized around the enlarged frozen present.",
      evidence:["same path origin preserved","single global field transform","no dual-scale geometry"]
    },
    {
      criterion:"RECOMPOSITION_SUPPORTING",
      score:1,
      finding:"Comparison rows preserve contingency information, but much of the retained-horizon support remains textual rather than spatial.",
      evidence:["comparison shows depth/burden/absent/unknown","spatial ghost alone is insufficient"]
    },
    {
      criterion:"NON_PREDICTIVE",
      score:2,
      finding:"FIELD-2 preserves distance versus probability and possibility versus recommendation firewalls.",
      evidence:["no historical correct path","contingency burden explicitly not probability","pinned future is not privileged as recommendation"]
    }
  ],
  total:8,
  maximum:16,
  classification:"WEAK_HORIZON_RETENTION",
  passes:false,
  nextBuild:"FSP-VR-MAATHAI-FIELD-3"
};

export const HORIZON_RETENTION_THRESHOLD={
  minimumTotal:12,
  requiredMinimums:{
    VISIBLE_TETHER:1,
    CONDITIONALLY_LEGIBLE:2,
    INSIDE_PERCEPTUAL_FIELD:2,
    DISTINCT_FROM_CURRENT_REACHABILITY:2,
    REENTERABLE:1,
    PRESENT_RELATIVE:1,
    RECOMPOSITION_SUPPORTING:1,
    NON_PREDICTIVE:2
  } as Record<HorizonRetentionCriterion,0|1|2>
};

export function validateHorizonRetentionReview(review:HorizonRetentionReview=MAATHAI_FIELD_2_HORIZON_REVIEW){
  const failures:string[]=[];
  const computed=review.scores.reduce((sum,s)=>sum+s.score,0);
  if(computed!==review.total) failures.push("total-mismatch");
  if(review.maximum!==16) failures.push("maximum-mismatch");
  if(review.scores.length!==8) failures.push("criterion-count");
  const thresholdPass=review.total>=HORIZON_RETENTION_THRESHOLD.minimumTotal &&
    review.scores.every(s=>s.score>=HORIZON_RETENTION_THRESHOLD.requiredMinimums[s.criterion]);
  if(thresholdPass!==review.passes) failures.push("pass-flag-mismatch");
  if(review.passes && review.classification!=="HORIZON_RETAINING") failures.push("classification-mismatch");
  if(!review.passes && review.classification==="HORIZON_RETAINING") failures.push("premature-horizon-classification");
  return {passes:failures.length===0,failures,thresholdPass};
}

export function horizonRetentionGaps(review:HorizonRetentionReview=MAATHAI_FIELD_2_HORIZON_REVIEW){
  return review.scores
    .map(s=>({
      criterion:s.criterion,
      current:s.score,
      required:HORIZON_RETENTION_THRESHOLD.requiredMinimums[s.criterion],
      gap:Math.max(0,HORIZON_RETENTION_THRESHOLD.requiredMinimums[s.criterion]-s.score)
    }))
    .filter(x=>x.gap>0)
    .sort((a,b)=>b.gap-a.gap);
}

export function frozenEndpointRadius(baseRadius=430,freezeScale=1.34){
  return baseRadius*freezeScale;
}

export function isFrozenEndpointClipped(baseRadius=430,freezeScale=1.34,halfWidth=560,nodeRadius=26){
  return frozenEndpointRadius(baseRadius,freezeScale)+nodeRadius>halfWidth;
}
