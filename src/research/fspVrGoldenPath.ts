export type GoldenPathStageId=
  |"GP0_ZERO"
  |"GP1_DOING"
  |"GP2_OTHER_AGENCY"
  |"GP3_DEPENDENCY"
  |"GP4_EXPECTATION_FAILURE"
  |"GP5_FREEZE_TRACE"
  |"GP6_REOPEN"
  |"GP7_SOCIAL_EVALUATION"
  |"GP8_EVIDENCE"
  |"GP9_CLAIM_CEILING"
  |"GP10_FADED_TRANSFER"
  |"GP11_LIFE_LOTTERY_HANDOFF";

export type ScaffoldLevel=0|1|2|3;
export type GoldenOperation=
  |"TURN_RELOCATE"
  |"REACH_ACT"
  |"ENCOUNTER_RESISTANCE"
  |"SIGNAL_WAIT"
  |"FREEZE_EXPAND"
  |"TRACE_BACKWARD"
  |"OPEN_DRILL_DOWN"
  |"PLACE_SIDE_BY_SIDE"
  |"HIT_BOUNDARY"
  |"RECOMPOSE_RETURN";

export interface ExperientialContract{
  perceive:string;
  act:string;
  change:string;
  sensoryCue:string;
  drillDown:string;
  misunderstandingCheck:string;
  returnToDoing:string;
}

export interface GoldenPathStage{
  id:GoldenPathStageId;
  label:string;
  operation:GoldenOperation[];
  scaffoldLevel:ScaffoldLevel;
  prompt:string|null;
  explicitProcedure:boolean;
  learnedDistinctions:string[];
  firewalls:string[];
  contract:ExperientialContract;
  next:GoldenPathStageId|null;
}

export interface GoldenPathState{
  stageId:GoldenPathStageId;
  scaffoldLevel:ScaffoldLevel;
  acquiredOperations:GoldenOperation[];
  freezeUsed:boolean;
  tracesInspected:boolean;
  reopened:boolean;
  evidenceCompared:boolean;
  ceilingEncountered:boolean;
  spontaneousOperations:GoldenOperation[];
  handoffReady:boolean;
}

export const GOLDEN_PATH_STAGES:GoldenPathStage[]=[
  {
    id:"GP0_ZERO",label:"Pedagogical zero",operation:["TURN_RELOCATE"],scaffoldLevel:3,prompt:null,explicitProcedure:false,
    learnedDistinctions:["situated access"],
    firewalls:["pedagogical blank ≠ metaphysical nothingness"],
    contract:{
      perceive:"Near-empty field with one localized event.",
      act:"Turn or orient toward the event.",
      change:"The event becomes available from the learner's changed orientation.",
      sensoryCue:"Localized visual/auditory event.",
      drillDown:"No drill-down yet; first task is orientation.",
      misunderstandingCheck:"Learner does not infer that unperceived means nonexistent.",
      returnToDoing:"Continue from the newly oriented present."
    },next:"GP1_DOING"
  },
  {
    id:"GP1_DOING",label:"Minimal Doing and embodied control",operation:["REACH_ACT"],scaffoldLevel:3,prompt:"Try acting.",explicitProcedure:true,
    learnedDistinctions:["action-consequence covariance","controlled/uncontrolled change"],
    firewalls:["control ≠ complete theory of agency"],
    contract:{
      perceive:"A controllable hand-like locus and an inert object.",
      act:"Move/reach.",
      change:"Hand-like locus covaries with action; inert object does not.",
      sensoryCue:"Brief confirmation pulse/sound on successful controlled movement.",
      drillDown:"Inspect which changes covary with action.",
      misunderstandingCheck:"Learner can distinguish control from mere co-presence.",
      returnToDoing:"Resume interaction with both controllable and inert elements."
    },next:"GP2_OTHER_AGENCY"
  },
  {
    id:"GP2_OTHER_AGENCY",label:"Resistance and other agency",operation:["ENCOUNTER_RESISTANCE","SIGNAL_WAIT"],scaffoldLevel:3,prompt:"Try. Signal. Wait.",explicitProcedure:true,
    learnedDistinctions:["constraint","other agency","influence/control distinction"],
    firewalls:["MY DOING ≠ OTHER DOING","influence ≠ control"],
    contract:{
      perceive:"A resistant object and an independently moving other agent.",
      act:"Attempt control, then signal and wait.",
      change:"Object resists; other agent may respond but continues independently.",
      sensoryCue:"Resistance cue differs from reciprocal-agent response cue.",
      drillDown:"Inspect which events depend on learner action and which originate elsewhere.",
      misunderstandingCheck:"Learner does not treat the other agent as a controllable object.",
      returnToDoing:"Continue in a field containing both resistance and independent agency."
    },next:"GP3_DEPENDENCY"
  },
  {
    id:"GP3_DEPENDENCY",label:"Dependency",operation:["SIGNAL_WAIT"],scaffoldLevel:3,prompt:"Signal when you need help.",explicitProcedure:true,
    learnedDistinctions:["dependency","probabilistic response"],
    firewalls:["agency and dependence can coexist","dependence ≠ inferiority"],
    contract:{
      perceive:"Need-state cue and caregiver locus outside direct control.",
      act:"Signal and wait.",
      change:"Caregiver sometimes responds; need cue resolves only on response.",
      sensoryCue:"Repeating need pulse that stops with successful care.",
      drillDown:"Inspect the relation between signaling and response frequency.",
      misunderstandingCheck:"Learner does not convert successful signaling into guaranteed command.",
      returnToDoing:"Continue with a revised sense of action under dependence."
    },next:"GP4_EXPECTATION_FAILURE"
  },
  {
    id:"GP4_EXPECTATION_FAILURE",label:"Expectation failure",operation:["FREEZE_EXPAND"],scaffoldLevel:3,prompt:"Freeze?",explicitProcedure:true,
    learnedDistinctions:["regularity/necessity","anomaly as inquiry pressure"],
    firewalls:["regularity ≠ necessity"],
    contract:{
      perceive:"Repeated signal-response pattern followed by a failed response.",
      act:"Invoke Freeze.",
      change:"Moving scene becomes inspectable instead of disappearing into the past.",
      sensoryCue:"Anomaly pulse; scaffold cue depends on level.",
      drillDown:"Freeze opens temporal traces in GP5.",
      misunderstandingCheck:"Learner uses Freeze as inquiry rather than treating failure as random interface error.",
      returnToDoing:"Advance into trace inspection."
    },next:"GP5_FREEZE_TRACE"
  },
  {
    id:"GP5_FREEZE_TRACE",label:"Freeze and temporal trace",operation:["FREEZE_EXPAND","TRACE_BACKWARD"],scaffoldLevel:2,prompt:"What made you expect a response?",explicitProcedure:false,
    learnedDistinctions:["past/current distinction","evidential history of expectation"],
    firewalls:["past trace ≠ present state"],
    contract:{
      perceive:"Two successful past traces and one current failed trace.",
      act:"Compare and trace backward.",
      change:"The compressed expectation decomposes into its history.",
      sensoryCue:"Past traces are lower-salience; current state remains highest resolution.",
      drillDown:"Select a trace to inspect sequence and difference.",
      misunderstandingCheck:"Learner does not confuse the trace with an event occurring now.",
      returnToDoing:"Carry the decompressed expectation into REOPEN."
    },next:"GP6_REOPEN"
  },
  {
    id:"GP6_REOPEN",label:"REOPEN",operation:["OPEN_DRILL_DOWN","RECOMPOSE_RETURN"],scaffoldLevel:2,prompt:"What should change in your map?",explicitProcedure:false,
    learnedDistinctions:["map revision","unknown preservation"],
    firewalls:["failed map ≠ failed inquiry","revision ≠ failure"],
    contract:{
      perceive:"Expected map expanded into happened/expected/unknown/revise components.",
      act:"Open, revise, and recompose.",
      change:"Only the pressured expectation changes; the rest of the world persists.",
      sensoryCue:"Compressed object expands then recomposes.",
      drillDown:"Inspect the unsupported part of the expectation.",
      misunderstandingCheck:"Learner revises locally rather than discarding all prior structure.",
      returnToDoing:"Re-enter active field with revised expectation."
    },next:"GP7_SOCIAL_EVALUATION"
  },
  {
    id:"GP7_SOCIAL_EVALUATION",label:"Social evaluation",operation:["REACH_ACT"],scaffoldLevel:2,prompt:"What did you notice?",explicitProcedure:false,
    learnedDistinctions:["preference/justification"],
    firewalls:["response ≠ moral judgment","preference ≠ justification"],
    contract:{
      perceive:"One agent helps another; another obstructs.",
      act:"Observe and optionally indicate a preference.",
      change:"Learner response is recorded without correctness feedback.",
      sensoryCue:"No good/bad color coding; relational motion carries the difference.",
      drillDown:"Evidence layer becomes available only after response.",
      misunderstandingCheck:"Learner does not infer system moral endorsement from presentation.",
      returnToDoing:"Carry own response into evidence inspection."
    },next:"GP8_EVIDENCE"
  },
  {
    id:"GP8_EVIDENCE",label:"Evidence inspection",operation:["OPEN_DRILL_DOWN","PLACE_SIDE_BY_SIDE"],scaffoldLevel:2,prompt:"Compare what was observed with what was inferred.",explicitProcedure:false,
    learnedDistinctions:["observation/interpretation","replication/settlement","alternative explanation"],
    firewalls:["observation ≠ interpretation","initial study ≠ settled result"],
    contract:{
      perceive:"Co-present observation, interpretation, alternative, replication, and ceiling objects.",
      act:"Open and place evidence objects side by side.",
      change:"Relations among claims become simultaneously inspectable.",
      sensoryCue:"Stable source/provenance textures differentiate evidence roles.",
      drillDown:"Open source, method, alternative, replication, and ceiling.",
      misunderstandingCheck:"Learner can identify which object is observation versus interpretation.",
      returnToDoing:"Recompose evidence set into bounded claim."
    },next:"GP9_CLAIM_CEILING"
  },
  {
    id:"GP9_CLAIM_CEILING",label:"Claim ceiling",operation:["HIT_BOUNDARY"],scaffoldLevel:1,prompt:null,explicitProcedure:false,
    learnedDistinctions:["licensed inference/speculation"],
    firewalls:["evidence licenses only so much","replication failure ≠ proof of opposite"],
    contract:{
      perceive:"Inference line extending from evidence toward a stronger claim meets a boundary.",
      act:"Attempt to extend the claim beyond the boundary.",
      change:"Beyond-boundary segment changes to speculation rather than supported claim.",
      sensoryCue:"Boundary contact produces a distinct non-punitive cue.",
      drillDown:"Inspect which missing warrant/evidence prevents further propagation.",
      misunderstandingCheck:"Learner understands boundary as evidential limit rather than censorship.",
      returnToDoing:"Return with a bounded claim rather than maximal conclusion."
    },next:"GP10_FADED_TRANSFER"
  },
  {
    id:"GP10_FADED_TRANSFER",label:"Faded-scaffold transfer",operation:["FREEZE_EXPAND","OPEN_DRILL_DOWN","PLACE_SIDE_BY_SIDE","HIT_BOUNDARY"],scaffoldLevel:0,prompt:null,explicitProcedure:false,
    learnedDistinctions:["self-initiated inquiry operation"],
    firewalls:["cue absence ≠ operation unavailable"],
    contract:{
      perceive:"Novel microcase with structurally similar ambiguity but no procedural labels.",
      act:"Choose an inquiry operation without being told which one.",
      change:"Selected operation exposes the same underlying grammar in new content.",
      sensoryCue:"No explicit operation cue; only ordinary case signals.",
      drillDown:"Any learned operation remains available.",
      misunderstandingCheck:"Learner waits indefinitely for instruction or never invokes an inquiry move.",
      returnToDoing:"Recompose the novel case after at least one self-initiated operation."
    },next:"GP11_LIFE_LOTTERY_HANDOFF"
  },
  {
    id:"GP11_LIFE_LOTTERY_HANDOFF",label:"Life-Lottery handoff",operation:["RECOMPOSE_RETURN"],scaffoldLevel:0,prompt:null,explicitProcedure:false,
    learnedDistinctions:["situated beginning","portable inquiry grammar"],
    firewalls:["starting condition ≠ destiny"],
    contract:{
      perceive:"Developmental field contracts; learned operation signatures remain available.",
      act:"Return and enter next situated beginning.",
      change:"Acquired operations persist into Life-Lottery state.",
      sensoryCue:"Recomposition cue followed by quiet transition.",
      drillDown:"Future Life Lottery can reuse learned operations.",
      misunderstandingCheck:"Learner does not treat assigned beginning as predetermined life outcome.",
      returnToDoing:"Enter a new situated present."
    },next:null
  }
];

export const INITIAL_GOLDEN_PATH_STATE:GoldenPathState={
  stageId:"GP0_ZERO",
  scaffoldLevel:3,
  acquiredOperations:[],
  freezeUsed:false,
  tracesInspected:false,
  reopened:false,
  evidenceCompared:false,
  ceilingEncountered:false,
  spontaneousOperations:[],
  handoffReady:false
};

export function stageById(id:GoldenPathStageId){
  const s=GOLDEN_PATH_STAGES.find(x=>x.id===id);
  if(!s) throw new Error("unknown-golden-path-stage:"+id);
  return structuredClone(s);
}

export function setScaffoldLevel(state:GoldenPathState,level:ScaffoldLevel):GoldenPathState{
  return {...state,scaffoldLevel:level};
}

export function performOperation(state:GoldenPathState,op:GoldenOperation,spontaneous=false):GoldenPathState{
  const acquired=state.acquiredOperations.includes(op)?state.acquiredOperations:[...state.acquiredOperations,op];
  const spontaneousOps=spontaneous&&!state.spontaneousOperations.includes(op)?[...state.spontaneousOperations,op]:state.spontaneousOperations;
  return {
    ...state,
    acquiredOperations:acquired,
    spontaneousOperations:spontaneousOps,
    freezeUsed:state.freezeUsed||op==="FREEZE_EXPAND",
    tracesInspected:state.tracesInspected||op==="TRACE_BACKWARD",
    reopened:state.reopened||op==="OPEN_DRILL_DOWN"&&state.stageId==="GP6_REOPEN",
    evidenceCompared:state.evidenceCompared||op==="PLACE_SIDE_BY_SIDE",
    ceilingEncountered:state.ceilingEncountered||op==="HIT_BOUNDARY"
  };
}

export function advanceGoldenPath(state:GoldenPathState):GoldenPathState{
  const s=stageById(state.stageId);
  if(!s.next) return {...state,handoffReady:true};
  const next=stageById(s.next);
  return {...state,stageId:next.id,scaffoldLevel:next.scaffoldLevel,handoffReady:next.id==="GP11_LIFE_LOTTERY_HANDOFF"};
}

export function promptForStage(state:GoldenPathState){
  const s=stageById(state.stageId);
  if(state.stageId!=="GP4_EXPECTATION_FAILURE") return s.prompt;
  if(state.scaffoldLevel===3) return "Freeze?";
  if(state.scaffoldLevel===2) return "⏸";
  if(state.scaffoldLevel===1) return null;
  return null;
}

export function experientialContractComplete(stage:GoldenPathStage){
  const c=stage.contract;
  return [c.perceive,c.act,c.change,c.sensoryCue,c.drillDown,c.misunderstandingCheck,c.returnToDoing].every(x=>x.trim().length>0);
}

export function validateGoldenPath(){
  const failures:string[]=[];
  if(GOLDEN_PATH_STAGES.length!==12) failures.push("stage-count");
  if(GOLDEN_PATH_STAGES[0].id!=="GP0_ZERO") failures.push("bad-start");
  if(GOLDEN_PATH_STAGES[GOLDEN_PATH_STAGES.length-1].id!=="GP11_LIFE_LOTTERY_HANDOFF") failures.push("bad-end");
  for(let i=0;i<GOLDEN_PATH_STAGES.length;i++){
    const s=GOLDEN_PATH_STAGES[i];
    if(!experientialContractComplete(s)) failures.push("incomplete-contract:"+s.id);
    if(i<GOLDEN_PATH_STAGES.length-1&&s.next!==GOLDEN_PATH_STAGES[i+1].id) failures.push("broken-sequence:"+s.id);
  }
  const transfer=stageById("GP10_FADED_TRANSFER");
  if(transfer.scaffoldLevel!==0||transfer.explicitProcedure||transfer.prompt!==null) failures.push("transfer-not-faded");
  const trace=stageById("GP5_FREEZE_TRACE");
  if(!trace.operation.includes("TRACE_BACKWARD")) failures.push("trace-operation");
  const evidence=stageById("GP8_EVIDENCE");
  if(!evidence.operation.includes("PLACE_SIDE_BY_SIDE")) failures.push("evidence-comparison");
  const ceiling=stageById("GP9_CLAIM_CEILING");
  if(!ceiling.operation.includes("HIT_BOUNDARY")) failures.push("ceiling-operation");
  return {passes:failures.length===0,failures};
}
