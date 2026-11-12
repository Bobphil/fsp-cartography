import {
  type FieldExperienceReview,
  FIELD_LIKE_THRESHOLD
} from "./fspVrFieldExperienceReview";

export const MAATHAI_FIELD_2_EXPERIENCE_REVIEW:FieldExperienceReview={
  reviewId:"FSP-VR-FIELD-EXPERIENCE-REVIEW-2",
  prototypeId:"FSP-VR-MAATHAI-FIELD-2",
  scores:[
    {
      criterion:"ANCHORED_PRESENT",
      score:1,
      finding:"The 1976 locus remains the fixed center while temporal zoom changes around it; the standpoint is clearer than FIELD-1 but still represented through a centered locus rather than embodied access.",
      evidence:["all temporal transforms are centered on the same Maathai locus","time-mode narration states that the 1976 present remains anchored","historical semantics do not change with zoom"]
    },
    {
      criterion:"CONTINUOUS_TEMPORAL_EXPANSION",
      score:2,
      finding:"Temporal modes now interpolate field scale and opacity through persistent SVG elements rather than replacing the field.",
      evidence:["persistent DOM field","CSS transform and opacity transitions","mode-specific viewScale","outer field contracts or expands continuously"]
    },
    {
      criterion:"NEAR_FIELD_DECOMPOSITION",
      score:2,
      finding:"Freeze increases near-field scale while narrowing temporal reach and preserves local requirement/provenance inspectability.",
      evidence:["FREEZE viewScale exceeds NORMAL","FREEZE nearScale exceeds NORMAL","near loci remain inspectable","path-borne requirements remain available"]
    },
    {
      criterion:"CONTINGENCY_GROWTH",
      score:2,
      finding:"Requirements are carried as ordered beads directly on each path, making longer dependency chains visible in the field.",
      evidence:["requirement beads positioned between center and endpoint","distant paths carry more unresolved beads","contingency burden remains available as a secondary summary"]
    },
    {
      criterion:"GATE_AS_THRESHOLD",
      score:2,
      finding:"The first blocking checkpoint becomes an in-field gate; expanding it enlarges the requirement structure and truncates the visible path at the blocking condition.",
      evidence:["gate positioned at first ABSENT/UNKNOWN or PARTIAL checkpoint","expanded gate scales in place","path x2/y2 moves to blocking checkpoint while expanded"]
    },
    {
      criterion:"PERSISTENCE_TRACE",
      score:2,
      finding:"Inspected paths enter trace history and pinned paths remain as ghost traces when the temporal horizon contracts.",
      evidence:["traceHistory persists","up to three pinned path IDs persist","out-of-range traced/pinned paths remain ghosted rather than disappearing"]
    },
    {
      criterion:"REVERSIBLE_TEMPORAL_MOVEMENT",
      score:2,
      finding:"Temporal modes can move outward and inward without resetting pinned paths, trace history, selection, or the historical center.",
      evidence:["time-mode changes mutate temporalMode only","pinned paths survive FREEZE after ACCELERATE","trace history is independent of maxDepth"]
    },
    {
      criterion:"SITUATED_COMPARISON",
      score:2,
      finding:"Up to three possibilities can remain pinned and compared simultaneously while the 1976 field stays visible.",
      evidence:["three-path pin limit","comparison rows retain depth, burden, absent and unknown requirements","pinned paths remain foregrounded in the same field"]
    }
  ],
  total:15,
  maximum:16,
  classification:"FIELD_LIKE",
  passesFieldThreshold:true,
  nextBuild:"FSP-VR-MAATHAI-FIELD-2-HUMAN-VISUAL-PILOT"
};

export function validateField2ExperienceReview(){
  const failures:string[]=[];
  const review=MAATHAI_FIELD_2_EXPERIENCE_REVIEW;
  const total=review.scores.reduce((sum,s)=>sum+s.score,0);
  if(total!==review.total) failures.push("total-mismatch");
  if(review.total<FIELD_LIKE_THRESHOLD.minimumTotal) failures.push("below-total-threshold");
  for(const s of review.scores){
    const minimum=FIELD_LIKE_THRESHOLD.requiredMinimums[s.criterion];
    if(s.score<minimum) failures.push("below-required:"+s.criterion);
  }
  if(review.classification!=="FIELD_LIKE") failures.push("classification");
  if(!review.passesFieldThreshold) failures.push("pass-flag");
  return {passes:failures.length===0,failures};
}
