import {
  type Field2ExperienceState,
  INITIAL_FIELD2_STATE,
  FIELD2_MODE_GEOMETRY,
  requirementCheckpoints,
  setTemporalMode,
  selectPathWithTrace,
  pinPath
} from "./maathaiField2Experience";
import {
  temporalProjectionForPath,
  type RequirementStatus,
  type TemporalLensMode
} from "./maathaiFieldRenderer";

export interface HorizonCheckpoint{
  label:string;
  status:RequirementStatus;
  originalIndex:number;
}

export interface HorizonTraceGeometry{
  pathId:string;
  angle:number;
  markerRadius:number;
  markerX:number;
  markerY:number;
  originalTemporalDepth:1|2|3|4;
  compressedCheckpoints:HorizonCheckpoint[];
}

export const FIELD3_HORIZON_RADIUS=385;
export const FIELD3_VIEWBOX_HALF_WIDTH=560;
export const FIELD3_HORIZON_MARKER_RADIUS=24;

function firstOfStatus(pathId:string,status:RequirementStatus){
  return requirementCheckpoints(pathId).find(c=>c.status===status)??null;
}

export function compressContingencies(pathId:string){
  const selected=[
    firstOfStatus(pathId,"PRESENT"),
    firstOfStatus(pathId,"PARTIAL"),
    firstOfStatus(pathId,"ABSENT"),
    firstOfStatus(pathId,"UNKNOWN")
  ].filter(Boolean) as ReturnType<typeof requirementCheckpoints>;
  const unique=new Map<number,typeof selected[number]>();
  for(const c of selected) unique.set(c.index,c);
  return [...unique.values()]
    .sort((a,b)=>a.index-b.index)
    .slice(0,4)
    .map(c=>({label:c.label,status:c.status,originalIndex:c.index}));
}

export function horizonTraceGeometry(pathId:string,angle:number):HorizonTraceGeometry{
  const p=temporalProjectionForPath(pathId);
  return {
    pathId,
    angle,
    markerRadius:FIELD3_HORIZON_RADIUS,
    markerX:FIELD3_HORIZON_RADIUS*Math.cos(angle),
    markerY:FIELD3_HORIZON_RADIUS*Math.sin(angle),
    originalTemporalDepth:p.temporalDepth,
    compressedCheckpoints:compressContingencies(pathId)
  };
}

export function horizonMarkerInsideViewport(){
  return FIELD3_HORIZON_RADIUS+FIELD3_HORIZON_MARKER_RADIUS<FIELD3_VIEWBOX_HALF_WIDTH;
}

export function minimumModeForDepth(depth:1|2|3|4):TemporalLensMode{
  if(depth<=1)return "FREEZE";
  if(depth===2)return "SLOW";
  if(depth===3)return "NORMAL";
  return "ACCELERATE";
}

export function reenterPinnedHorizon(state:Field2ExperienceState,pathId:string){
  const depth=temporalProjectionForPath(pathId).temporalDepth;
  let next=selectPathWithTrace(state,pathId);
  if(!next.pinnedPathIds.includes(pathId))next=pinPath(next,pathId);
  return setTemporalMode(next,minimumModeForDepth(depth));
}

export function retainedHorizonPaths(state:Field2ExperienceState){
  const max=FIELD2_MODE_GEOMETRY[state.temporalMode].maxDepth;
  return state.pinnedPathIds
    .filter(id=>temporalProjectionForPath(id).temporalDepth>max)
    .map(id=>({pathId:id,depth:temporalProjectionForPath(id).temporalDepth}));
}

export function validateField3Geometry(){
  const failures:string[]=[];
  if(!horizonMarkerInsideViewport()) failures.push("horizon-marker-outside-viewport");
  const compressed=compressContingencies("P-ADVOCATE");
  if(compressed.length<3) failures.push("advocacy-contingency-compression-too-thin");
  if(compressed.length>4) failures.push("compressed-contingency-overflow");
  if(!compressed.some(c=>c.status==="PRESENT")) failures.push("missing-present-checkpoint");
  if(!compressed.some(c=>c.status==="ABSENT")) failures.push("missing-absent-checkpoint");
  if(!compressed.some(c=>c.status==="UNKNOWN")) failures.push("missing-unknown-checkpoint");
  let s=INITIAL_FIELD2_STATE;
  s=pinPath(s,"P-ADVOCATE");
  s=setTemporalMode(s,"FREEZE");
  if(retainedHorizonPaths(s).length!==1) failures.push("pinned-depth4-not-retained-horizon");
  const reentered=reenterPinnedHorizon(s,"P-ADVOCATE");
  if(reentered.temporalMode!=="ACCELERATE") failures.push("depth4-reentry-not-accelerate");
  if(!reentered.pinnedPathIds.includes("P-ADVOCATE")) failures.push("reentry-lost-pin");
  return {passes:failures.length===0,failures};
}
