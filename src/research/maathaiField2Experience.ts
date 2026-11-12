import {
  MAATHAI_1976_FIELD_PROJECTION,
  temporalProjectionForPath,
  temporalLensProfile,
  contingencyBurden,
  type TemporalLensMode
} from "./maathaiFieldRenderer";

export interface Field2ExperienceState{
  temporalMode:TemporalLensMode;
  selectedPathId:string|null;
  pinnedPathIds:string[];
  traceHistory:string[];
  expandedGatePathId:string|null;
}

export const FIELD2_MODE_GEOMETRY:Record<TemporalLensMode,{
  maxDepth:1|2|3|4;
  viewScale:number;
  nearFieldScale:number;
  transitionMs:number;
}>={
  FREEZE:{maxDepth:1,viewScale:1.34,nearFieldScale:1.18,transitionMs:700},
  SLOW:{maxDepth:2,viewScale:1.18,nearFieldScale:1.10,transitionMs:800},
  NORMAL:{maxDepth:3,viewScale:1.00,nearFieldScale:1.00,transitionMs:900},
  ACCELERATE:{maxDepth:4,viewScale:0.84,nearFieldScale:0.94,transitionMs:1100}
};

export const INITIAL_FIELD2_STATE:Field2ExperienceState={
  temporalMode:"NORMAL",
  selectedPathId:null,
  pinnedPathIds:[],
  traceHistory:[],
  expandedGatePathId:null
};

export function pinPath(state:Field2ExperienceState,pathId:string):Field2ExperienceState{
  temporalProjectionForPath(pathId);
  const already=state.pinnedPathIds.includes(pathId);
  const nextPins=already
    ? state.pinnedPathIds.filter(id=>id!==pathId)
    : [...state.pinnedPathIds,pathId].slice(-3);
  return {
    ...state,
    selectedPathId:pathId,
    pinnedPathIds:nextPins,
    traceHistory:state.traceHistory.includes(pathId)?state.traceHistory:[...state.traceHistory,pathId]
  };
}

export function selectPathWithTrace(state:Field2ExperienceState,pathId:string):Field2ExperienceState{
  temporalProjectionForPath(pathId);
  return {
    ...state,
    selectedPathId:pathId,
    traceHistory:state.traceHistory.includes(pathId)?state.traceHistory:[...state.traceHistory,pathId]
  };
}

export function setTemporalMode(state:Field2ExperienceState,mode:TemporalLensMode):Field2ExperienceState{
  temporalLensProfile(mode);
  return {...state,temporalMode:mode};
}

export function expandGate(state:Field2ExperienceState,pathId:string|null):Field2ExperienceState{
  if(pathId) temporalProjectionForPath(pathId);
  return {...state,expandedGatePathId:pathId};
}

export function requirementCheckpoints(pathId:string){
  const p=temporalProjectionForPath(pathId);
  return p.requirements.map((r,index)=>({
    pathId,
    index,
    fraction:(index+1)/(p.requirements.length+1),
    label:r.label,
    status:r.status,
    kind:r.kind,
    explanation:r.explanation
  }));
}

export function firstBlockingCheckpoint(pathId:string){
  const checkpoints=requirementCheckpoints(pathId);
  return checkpoints.find(x=>x.status==="ABSENT"||x.status==="UNKNOWN")
    ?? checkpoints.find(x=>x.status==="PARTIAL")
    ?? null;
}

export function comparisonRows(state:Field2ExperienceState){
  return state.pinnedPathIds.map(pathId=>{
    const p=temporalProjectionForPath(pathId);
    const burden=contingencyBurden(pathId);
    return {
      pathId,
      temporalDepth:p.temporalDepth,
      unresolvedCount:burden.unresolvedCount,
      burden:burden.burden,
      absent:burden.unresolved.filter(r=>r.status==="ABSENT").map(r=>r.label),
      unknown:burden.unresolved.filter(r=>r.status==="UNKNOWN").map(r=>r.label)
    };
  });
}

export function traceVisibility(state:Field2ExperienceState,pathId:string){
  const depth=temporalProjectionForPath(pathId).temporalDepth;
  const maxDepth=FIELD2_MODE_GEOMETRY[state.temporalMode].maxDepth;
  return {
    visible:depth<=maxDepth,
    pinned:state.pinnedPathIds.includes(pathId),
    traced:state.traceHistory.includes(pathId),
    ghosted:depth>maxDepth && (state.pinnedPathIds.includes(pathId)||state.traceHistory.includes(pathId))
  };
}

export function validateField2Experience(){
  const failures:string[]=[];
  const modes:TemporalLensMode[]=["FREEZE","SLOW","NORMAL","ACCELERATE"];
  const scales=modes.map(m=>FIELD2_MODE_GEOMETRY[m].viewScale);
  if(!(scales[0]>scales[1]&&scales[1]>scales[2]&&scales[2]>scales[3])) failures.push("view-scale-order");
  if(FIELD2_MODE_GEOMETRY.FREEZE.nearFieldScale<=FIELD2_MODE_GEOMETRY.NORMAL.nearFieldScale) failures.push("freeze-does-not-deepen-near-field");
  const distant=requirementCheckpoints("P-ADVOCATE");
  if(distant.length<4) failures.push("distant-path-not-decomposed");
  if(!firstBlockingCheckpoint("P-ADVOCATE")) failures.push("gate-has-no-blocking-checkpoint");
  let s=INITIAL_FIELD2_STATE;
  s=pinPath(s,"P-RESEARCH");
  s=pinPath(s,"P-ADVOCATE");
  s=setTemporalMode(s,"FREEZE");
  if(!traceVisibility(s,"P-ADVOCATE").ghosted) failures.push("pinned-distant-path-not-ghosted-in-freeze");
  if(comparisonRows(s).length!==2) failures.push("comparison-pins-not-preserved");
  return {passes:failures.length===0,failures};
}
