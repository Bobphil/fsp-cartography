export type FieldExperienceCriterion=
  |"ANCHORED_PRESENT"
  |"CONTINUOUS_TEMPORAL_EXPANSION"
  |"NEAR_FIELD_DECOMPOSITION"
  |"CONTINGENCY_GROWTH"
  |"GATE_AS_THRESHOLD"
  |"PERSISTENCE_TRACE"
  |"REVERSIBLE_TEMPORAL_MOVEMENT"
  |"SITUATED_COMPARISON";

export interface FieldExperienceScore{
  criterion:FieldExperienceCriterion;
  score:0|1|2;
  finding:string;
  evidence:string[];
}

export interface FieldExperienceReview{
  reviewId:string;
  prototypeId:string;
  scores:FieldExperienceScore[];
  total:number;
  maximum:number;
  classification:"DIAGRAM"|"EARLY_FIELD"|"FIELD_LIKE";
  passesFieldThreshold:boolean;
  nextBuild:string;
}

export const MAATHAI_FIELD_1_EXPERIENCE_REVIEW:FieldExperienceReview={
  reviewId:"FSP-VR-FIELD-EXPERIENCE-REVIEW-1",
  prototypeId:"FSP-VR-MAATHAI-FIELD-1",
  scores:[
    {
      criterion:"ANCHORED_PRESENT",
      score:1,
      finding:"Maathai 1976 remains visually centered, but the center is still primarily a node rather than an experienced standpoint.",
      evidence:["central locus remains fixed while temporal depth changes","no viewpoint-dependent access or field transformation yet"]
    },
    {
      criterion:"CONTINUOUS_TEMPORAL_EXPANSION",
      score:0,
      finding:"Temporal modes currently behave as visibility filters rather than continuous temporal zoom.",
      evidence:["maxDepth changes by mode","paths change opacity and pointer-events abruptly","no interpolation or animated horizon movement"]
    },
    {
      criterion:"NEAR_FIELD_DECOMPOSITION",
      score:1,
      finding:"Freeze narrows the field but does not yet spatially deepen the near field.",
      evidence:["requirements are inspectable in the side panel","near loci do not spread or reveal additional local relations when frozen"]
    },
    {
      criterion:"CONTINGENCY_GROWTH",
      score:1,
      finding:"Distant paths carry larger computed contingency stacks, but most contingency structure remains outside the path geometry.",
      evidence:["contingency burden is computed","requirements appear mainly in side panel","path itself remains a single line"]
    },
    {
      criterion:"GATE_AS_THRESHOLD",
      score:1,
      finding:"Gates are decomposable but remain labeled icons rather than spatially expanded thresholds.",
      evidence:["gate click reveals PRESENT/PARTIAL/ABSENT/UNKNOWN","missing requirements do not yet interrupt or branch the path geometry"]
    },
    {
      criterion:"PERSISTENCE_TRACE",
      score:0,
      finding:"Selections replace one another and leave no persistent inspection trace.",
      evidence:["single selected path state","no pinned paths","no trace history or breadcrumb"]
    },
    {
      criterion:"REVERSIBLE_TEMPORAL_MOVEMENT",
      score:1,
      finding:"Temporal modes can move outward and inward without changing the historical state, but discoveries are not preserved across scale changes.",
      evidence:["central scene remains 1976","mode can return to FREEZE after ACCELERATE","no persistent cross-scale memory"]
    },
    {
      criterion:"SITUATED_COMPARISON",
      score:0,
      finding:"Only one path can be foregrounded at a time.",
      evidence:["single selected variable","side panel replaced on selection","no multi-path pinning"]
    }
  ],
  total:5,
  maximum:16,
  classification:"EARLY_FIELD",
  passesFieldThreshold:false,
  nextBuild:"FSP-VR-MAATHAI-FIELD-2"
};

export const FIELD_LIKE_THRESHOLD={
  minimumTotal:12,
  requiredMinimums:{
    ANCHORED_PRESENT:1,
    CONTINUOUS_TEMPORAL_EXPANSION:2,
    NEAR_FIELD_DECOMPOSITION:2,
    CONTINGENCY_GROWTH:2,
    GATE_AS_THRESHOLD:2,
    PERSISTENCE_TRACE:1,
    REVERSIBLE_TEMPORAL_MOVEMENT:1,
    SITUATED_COMPARISON:1
  } as Record<FieldExperienceCriterion,0|1|2>
};

export function validateFieldExperienceReview(review:FieldExperienceReview=MAATHAI_FIELD_1_EXPERIENCE_REVIEW){
  const failures:string[]=[];
  const computed=review.scores.reduce((sum,s)=>sum+s.score,0);
  if(computed!==review.total) failures.push("total-mismatch");
  if(review.maximum!==16) failures.push("unexpected-maximum");
  if(review.scores.length!==8) failures.push("criterion-count");
  const ids=new Set(review.scores.map(s=>s.criterion));
  for(const key of Object.keys(FIELD_LIKE_THRESHOLD.requiredMinimums) as FieldExperienceCriterion[]){
    if(!ids.has(key)) failures.push("missing-criterion:"+key);
  }
  const thresholdPass=review.total>=FIELD_LIKE_THRESHOLD.minimumTotal &&
    review.scores.every(s=>s.score>=FIELD_LIKE_THRESHOLD.requiredMinimums[s.criterion]);
  if(thresholdPass!==review.passesFieldThreshold) failures.push("threshold-status-mismatch");
  if(review.passesFieldThreshold && review.classification!=="FIELD_LIKE") failures.push("classification-mismatch");
  if(!review.passesFieldThreshold && review.classification==="FIELD_LIKE") failures.push("premature-field-like-classification");
  return {passes:failures.length===0,failures,thresholdPass};
}

export function fieldExperienceGap(review:FieldExperienceReview=MAATHAI_FIELD_1_EXPERIENCE_REVIEW){
  return review.scores
    .map(s=>({
      criterion:s.criterion,
      current:s.score,
      required:FIELD_LIKE_THRESHOLD.requiredMinimums[s.criterion],
      gap:Math.max(0,FIELD_LIKE_THRESHOLD.requiredMinimums[s.criterion]-s.score)
    }))
    .filter(x=>x.gap>0)
    .sort((a,b)=>b.gap-a.gap);
}
