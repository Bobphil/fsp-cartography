import { CanonicalCaseDossier } from "./fiveCaseAtlas";
import {
  EcosystemReturnToken,
  NEPTUNE_VULCAN_PROBE_BINDINGS,
  ProjectionBinding
} from "./fspEcosystemBridge";
import { FspRelationGraph, buildRelationGraph } from "./fspRelationGraph";
import {
  ProjectionPackage,
  compileProjectionPackage,
  NEPTUNE_VULCAN_PROFILE_EXAMPLES
} from "./fspProjectionProfiles";

export type VrPrimitive =
  | "INSPECT"
  | "MOVE_VIEWPOINT"
  | "TOGGLE_PROBE"
  | "REPLAY_TRANSITION"
  | "COMPARE"
  | "OVERVIEW"
  | "RETURN";

export interface VrZone {
  zoneId:string;
  label:string;
  role:string;
  canonicalStatus:"HISTORICAL"|"PROBE"|"RETURN";
}

export interface VrViewpoint {
  viewpointId:string;
  label:string;
  reveals:string[];
  hides:string[];
  firewall:string;
}

export interface VrInteraction {
  interactionId:string;
  primitive:VrPrimitive;
  targetZoneId:string;
  effect:string;
  invariant:string;
}

export interface VrScaffoldStage {
  stage:number;
  label:string;
  visibleSupports:string[];
  removedSupports:string[];
  advanceWhen:string;
}

export interface VrDebriefField {
  fieldId:string;
  prompt:string;
  required:boolean;
}

export interface VrScenePackage {
  packageId:string;
  projection:ProjectionPackage;
  scene:{
    sceneId:string;
    title:string;
    simulationStatus:string;
    zones:VrZone[];
    viewpoints:VrViewpoint[];
    interactions:VrInteraction[];
    replay:{
      enabled:boolean;
      target:string;
      rule:string;
    };
    scaffoldFade:VrScaffoldStage[];
    overviewAnchor:string;
  };
  debrief:{
    mode:"NON_IMMERSIVE";
    fields:VrDebriefField[];
    completionRule:string;
  };
  returnRule:string;
}

export interface VrValidation {
  passes:boolean;
  failures:string[];
}

export const VR_CONSTITUTION=[
  "Spatial arrangement is an interface choice and never by itself establishes semantic, causal, or historical relation.",
  "Viewpoint changes what is perceptually available, not what is true about the canonical object.",
  "Replay may slow, repeat, or compare a transition but may not rewrite its historical order or evidential standing.",
  "Controlled probes remain visibly marked as simulated possibility spaces.",
  "Scaffold fading removes assistance, not canonical constraints.",
  "A VR experience is incomplete until the participant exits immersion into an explicit authorial debrief."
] as const;

function vrBinding():ProjectionBinding{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==="VR");
  if(!binding) throw new Error("missing VR binding");
  return binding;
}

export function compileNeptuneVulcanVrPackage(
  dossiers:CanonicalCaseDossier[],
  graph:FspRelationGraph=buildRelationGraph(dossiers)
):VrScenePackage{
  const binding=vrBinding();
  const example=NEPTUNE_VULCAN_PROFILE_EXAMPLES.VR;
  const returnToken:EcosystemReturnToken={
    environment:"VR",
    originId:"VR-NV-VULCAN-1",
    originLabel:"Vulcan controlled revision space",
    depthOrMode:"IMMERSIVE",
    context:["scene:VR-NV-VULCAN-1","probe:NV-PROBE-VULCAN"]
  };
  const projection=compileProjectionPackage(
    binding,dossiers,graph,returnToken,example.additions,example.statusMarkers
  );

  return {
    packageId:"VR-NV-VULCAN-1",
    projection,
    scene:{
      sceneId:"VR-NV-VULCAN-1",
      title:"Vulcan: Holding the Framework Fixed",
      simulationStatus:"CONTROLLED PROBE — NOT HISTORICAL ACTUALITY",
      zones:[
        {zoneId:"Z-FRAMEWORK",label:"Newtonian framework anchor",role:"Shows what is being held fixed in the probe.",canonicalStatus:"PROBE"},
        {zoneId:"Z-AUXILIARY",label:"Vulcan auxiliary branch",role:"Manipulable candidate repair.",canonicalStatus:"PROBE"},
        {zoneId:"Z-REMAINDER",label:"Observational remainder",role:"Displays what the repair still fails to settle.",canonicalStatus:"PROBE"},
        {zoneId:"Z-HISTORY",label:"Historical transition reference",role:"Separately presents the canonical historical trajectory for comparison.",canonicalStatus:"HISTORICAL"},
        {zoneId:"Z-RETURN",label:"Overview and return",role:"Reassembles the inquiry and exits to debrief.",canonicalStatus:"RETURN"}
      ],
      viewpoints:[
        {
          viewpointId:"V-STRUCTURE",label:"Dependency view",
          reveals:["held-fixed commitments","varied auxiliary","unresolved remainder"],
          hides:["immersive narrative embellishment"],
          firewall:"Visible dependency structure is a representation of the probe, not a claim that the world literally has this spatial form."
        },
        {
          viewpointId:"V-HISTORICAL",label:"Historical comparison view",
          reveals:["probe/history distinction","later framework revision","claim ceiling"],
          hides:["manipulation controls"],
          firewall:"Historical sequence is inspected, not rewritten by the participant."
        }
      ],
      interactions:[
        {
          interactionId:"I-INSPECT",primitive:"INSPECT",targetZoneId:"Z-FRAMEWORK",
          effect:"Reveal the commitments explicitly held fixed by the probe.",
          invariant:"Inspection does not change canonical content."
        },
        {
          interactionId:"I-TOGGLE-VULCAN",primitive:"TOGGLE_PROBE",targetZoneId:"Z-AUXILIARY",
          effect:"Toggle the Vulcan auxiliary on/off inside the controlled revision space.",
          invariant:"Toggle state is simulation metadata, not historical actuality."
        },
        {
          interactionId:"I-REPLAY",primitive:"REPLAY_TRANSITION",targetZoneId:"Z-HISTORY",
          effect:"Replay the canonical historical transition sequence for comparison.",
          invariant:"Replay changes tempo only; historical order and evidence remain fixed."
        },
        {
          interactionId:"I-COMPARE",primitive:"COMPARE",targetZoneId:"Z-REMAINDER",
          effect:"Compare the probe consequences with the historical framework-revision trajectory.",
          invariant:"Comparison does not collapse probe and history into one state."
        },
        {
          interactionId:"I-OVERVIEW",primitive:"OVERVIEW",targetZoneId:"Z-RETURN",
          effect:"Restore a whole-inquiry view before exit.",
          invariant:"Overview preserves claim ceiling and unresolved remainder."
        }
      ],
      replay:{
        enabled:true,
        target:"NV3-NV4 historical transition reference",
        rule:"Replay may change speed and viewpoint but not canonical sequence, provenance, or claim strength."
      },
      scaffoldFade:[
        {
          stage:1,label:"Guided",
          visibleSupports:["zone labels","hold-fixed/vary legend","probe/history status banners","suggested next action"],
          removedSupports:[],
          advanceWhen:"Participant correctly distinguishes the probe zone from the historical reference."
        },
        {
          stage:2,label:"Reduced",
          visibleSupports:["probe/history status banners","claim ceiling marker"],
          removedSupports:["suggested next action","full hold-fixed/vary legend"],
          advanceWhen:"Participant completes a comparison without treating the probe as historical fact."
        },
        {
          stage:3,label:"Independent",
          visibleSupports:["persistent simulation status","return anchor"],
          removedSupports:["zone labels","claim ceiling hint"],
          advanceWhen:"Participant can state a licensed and unlicensed inference before exit."
        }
      ],
      overviewAnchor:"Z-RETURN"
    },
    debrief:{
      mode:"NON_IMMERSIVE",
      fields:[
        {fieldId:"experiencedChange",prompt:"What changed when you manipulated the auxiliary branch?",required:true},
        {fieldId:"licensedInference",prompt:"What does this experience help you see that the case licenses?",required:true},
        {fieldId:"unlicensedInference",prompt:"What would be an overreach or illicit inference from the experience?",required:true},
        {fieldId:"remainingUncertainty",prompt:"What remains unresolved?",required:true},
        {fieldId:"reopenCondition",prompt:"What would make you REOPEN your current judgment?",required:true}
      ],
      completionRule:"The scene cannot be marked complete until all five debrief fields are answered outside immersion."
    },
    returnRule:"Return from spatialized manipulation to explicit non-immersive authorship; the participant, not the scene, states the final bounded judgment."
  };
}

export function validateVrPackage(pkg:VrScenePackage):VrValidation{
  const failures:string[]=[];
  if(pkg.projection.environment!=="VR") failures.push("wrong-environment");
  if(!pkg.scene.simulationStatus.includes("NOT HISTORICAL ACTUALITY")) failures.push("missing-simulation-status");
  if(!pkg.scene.zones.some(z=>z.canonicalStatus==="HISTORICAL")) failures.push("missing-historical-reference-zone");
  if(!pkg.scene.zones.some(z=>z.canonicalStatus==="PROBE")) failures.push("missing-probe-zone");
  if(!pkg.scene.interactions.some(i=>i.primitive==="REPLAY_TRANSITION")) failures.push("missing-replay");
  if(!pkg.scene.interactions.some(i=>i.primitive==="TOGGLE_PROBE")) failures.push("missing-controlled-probe-interaction");
  if(pkg.scene.scaffoldFade.length<3) failures.push("insufficient-scaffold-fade");
  if(pkg.debrief.mode!=="NON_IMMERSIVE") failures.push("debrief-not-nonimmersive");
  for(const id of ["experiencedChange","licensedInference","unlicensedInference","remainingUncertainty","reopenCondition"]){
    if(!pkg.debrief.fields.some(f=>f.fieldId===id && f.required)) failures.push(`missing-debrief-field:${id}`);
  }
  if(!pkg.debrief.completionRule.includes("cannot be marked complete")) failures.push("debrief-not-required");
  if(!pkg.returnRule.includes("participant")) failures.push("missing-participant-authorship");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
