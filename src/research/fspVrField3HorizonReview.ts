import {
  type HorizonRetentionReview,
  HORIZON_RETENTION_THRESHOLD
} from "./fspVrHorizonRetentionReview";
import {
  FIELD3_HORIZON_RADIUS,
  FIELD3_VIEWBOX_HALF_WIDTH,
  FIELD3_HORIZON_MARKER_RADIUS,
  horizonMarkerInsideViewport,
  compressContingencies,
  reenterPinnedHorizon,
  validateField3Geometry
} from "./maathaiField3Experience";
import {
  INITIAL_FIELD2_STATE,
  pinPath,
  setTemporalMode
} from "./maathaiField2Experience";

export const MAATHAI_FIELD_3_HORIZON_REVIEW:HorizonRetentionReview={
  reviewId:"FSP-VR-HORIZON-RETENTION-REVIEW-2",
  prototypeId:"FSP-VR-MAATHAI-FIELD-3",
  sequence:["NORMAL","ACCELERATE","INSPECT:P-ADVOCATE","PIN:P-ADVOCATE","FREEZE","REENTER:P-ADVOCATE"],
  scores:[
    {
      criterion:"VISIBLE_TETHER",
      score:2,
      finding:"Pinned out-of-range futures are redrawn as dedicated present-to-horizon tethers rather than faint copies of the original path.",
      evidence:["separate horizon layer","bounded tether from center to retained marker","original out-of-range path is suppressed while tether is active"]
    },
    {
      criterion:"CONDITIONALLY_LEGIBLE",
      score:2,
      finding:"The retained tether carries a compressed checkpoint set that preserves present, partial, absent, and unknown conditions when available.",
      evidence:["contingency compression selects representative statuses","compressed checkpoints remain spatially attached to tether","maximum four checkpoints limits clutter"]
    },
    {
      criterion:"INSIDE_PERCEPTUAL_FIELD",
      score:2,
      finding:"Retained marker is bounded to radius 385 with marker radius 24 inside a half-width of 560.",
      evidence:["385 + 24 < 560","horizon geometry is independent of Freeze present-space scaling"]
    },
    {
      criterion:"DISTINCT_FROM_CURRENT_REACHABILITY",
      score:2,
      finding:"A dedicated retained-future band and marker grammar distinguishes beyond-horizon possibilities from current path endpoints.",
      evidence:["retained-future band","horizon marker label says beyond current reach","out-of-range original path is visually suppressed"]
    },
    {
      criterion:"REENTERABLE",
      score:2,
      finding:"Selecting a retained horizon marker computes the minimum temporal mode required and re-expands to the original path while preserving the pin.",
      evidence:["depth 4 maps to ACCELERATE","reentry preserves selected path and pin","full path geometry becomes visible again"]
    },
    {
      criterion:"PRESENT_RELATIVE",
      score:2,
      finding:"The horizon tether begins at the same 1976 center and asks what must change in the present for the distant possibility to move inward.",
      evidence:["tether origin is central present","present-relative panel prompt","near field and horizon use independent transforms"]
    },
    {
      criterion:"RECOMPOSITION_SUPPORTING",
      score:2,
      finding:"Freeze can show immediate present-space options while simultaneously retaining a compressed distant contingency structure.",
      evidence:["dual-scale geometry","retained checkpoint chain remains visible during Freeze","comparison panel preserves pinned path identity"]
    },
    {
      criterion:"NON_PREDICTIVE",
      score:2,
      finding:"Horizon compression is explicitly an inspection transform, not temporal nearness, probability, recommendation, or destiny.",
      evidence:["inspection compression firewall","retained marker says beyond current reach","historical semantics unchanged"]
    }
  ],
  total:16,
  maximum:16,
  classification:"HORIZON_RETAINING",
  passes:true,
  nextBuild:"FSP-VR-MAATHAI-FIELD-3-HUMAN-VISUAL-PILOT"
};

export function validateField3HorizonReview(){
  const failures:string[]=[];
  const geometry=validateField3Geometry();
  if(!geometry.passes) failures.push(...geometry.failures.map(x=>"geometry:"+x));
  const review=MAATHAI_FIELD_3_HORIZON_REVIEW;
  const total=review.scores.reduce((sum,s)=>sum+s.score,0);
  if(total!==review.total) failures.push("total-mismatch");
  if(review.total<HORIZON_RETENTION_THRESHOLD.minimumTotal) failures.push("below-threshold");
  for(const s of review.scores){
    if(s.score<HORIZON_RETENTION_THRESHOLD.requiredMinimums[s.criterion]) failures.push("criterion:"+s.criterion);
  }
  if(!horizonMarkerInsideViewport()) failures.push("marker-outside-viewport");
  if(FIELD3_HORIZON_RADIUS+FIELD3_HORIZON_MARKER_RADIUS>=FIELD3_VIEWBOX_HALF_WIDTH) failures.push("marker-boundary-failure");
  let state=INITIAL_FIELD2_STATE;
  state=pinPath(state,"P-ADVOCATE");
  state=setTemporalMode(state,"FREEZE");
  const reentered=reenterPinnedHorizon(state,"P-ADVOCATE");
  if(reentered.temporalMode!=="ACCELERATE") failures.push("reentry-mode");
  if(!reentered.pinnedPathIds.includes("P-ADVOCATE")) failures.push("reentry-pin-loss");
  const compressed=compressContingencies("P-ADVOCATE");
  if(compressed.length<3||compressed.length>4) failures.push("compressed-chain-size");
  return {passes:failures.length===0,failures};
}
