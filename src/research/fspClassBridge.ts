import { CanonicalCaseDossier } from "./fiveCaseAtlas";
import {
  NEPTUNE_VULCAN_PROBE_BINDINGS,
  EcosystemReturnToken,
  ProjectionBinding
} from "./fspEcosystemBridge";
import { FspRelationGraph, buildRelationGraph } from "./fspRelationGraph";
import {
  ProjectionPackage,
  compileProjectionPackage,
  NEPTUNE_VULCAN_PROFILE_EXAMPLES
} from "./fspProjectionProfiles";

export interface CoursePlacement {
  courseId:string;
  moduleId:string;
  sessionId:string;
  durationMinutes:number;
  placementRole:"INTRODUCE"|"PRACTICE"|"TRANSFER"|"ASSESS";
}

export interface WorkbookMove {
  moveId:string;
  ordinal:number;
  prompt:string;
  operation:string;
  sourceUse:string;
  studentAction:string;
  firewall:string;
}

export interface OutputCardField {
  fieldId:string;
  label:string;
  required:boolean;
  author:"STUDENT"|"SYSTEM";
}

export interface ClassroomPackage {
  packageId:string;
  projection:ProjectionPackage;
  placement:CoursePlacement;
  learningObjective:string;
  workbook:{
    title:string;
    estimatedMinutes:number;
    moves:WorkbookMove[];
  };
  outputCard:{
    title:string;
    fields:OutputCardField[];
    completionRule:string;
  };
  journalHandoff?:{
    enabled:boolean;
    rule:string;
  };
  returnRule:string;
}

export interface ClassroomValidation {
  passes:boolean;
  failures:string[];
}

export const CLASSROOM_CONSTITUTION=[
  "Workbook structure may scaffold inquiry but may not supply the student's final judgment.",
  "Output cards must preserve claim, reason, uncertainty, and REOPEN as student-authored fields.",
  "Course placement may change pacing and sequencing but not canonical fingerprint or claim ceiling.",
  "Journal handoff is reflective transfer and must not overwrite the bounded judgment produced in the workbook.",
  "A classroom package is complete only when the learner returns from scaffolded operation to authored judgment."
] as const;

function classroomBinding():ProjectionBinding{
  const binding=NEPTUNE_VULCAN_PROBE_BINDINGS.find(x=>x.environment==="CLASSROOM");
  if(!binding) throw new Error("missing classroom binding");
  return binding;
}

export function compileNeptuneVulcanClassroomPackage(
  dossiers:CanonicalCaseDossier[],
  graph:FspRelationGraph=buildRelationGraph(dossiers)
):ClassroomPackage{
  const binding=classroomBinding();
  const example=NEPTUNE_VULCAN_PROFILE_EXAMPLES.CLASSROOM;
  const returnToken:EcosystemReturnToken={
    environment:"CLASSROOM",
    originId:"PHILSCI-NV-SESSION",
    originLabel:"Neptune/Vulcan revision-target session",
    depthOrMode:"PRACTICE",
    context:["course:philosophy-of-science","module:revision-under-pressure","workbook:NV"]
  };
  const projection=compileProjectionPackage(
    binding,dossiers,graph,returnToken,example.additions,example.statusMarkers
  );

  return {
    packageId:"CLASS-NV-REVISION-1",
    projection,
    placement:{
      courseId:"FSP-PHILSCI",
      moduleId:"REVISION-UNDER-PRESSURE",
      sessionId:"NV-AUXILIARY-REPAIR",
      durationMinutes:60,
      placementRole:"PRACTICE"
    },
    learningObjective:"Distinguish a revision that is rationally available from one that later becomes empirically supported, and state why the success of one auxiliary repair does not create a universal revision rule.",
    workbook:{
      title:"Neptune, Vulcan, and Where Revision Pressure Goes",
      estimatedMinutes:40,
      moves:[
        {
          moveId:"M1-MAP-PRESSURE",ordinal:1,
          prompt:"Identify the prediction under pressure and list at least two places revision could occur.",
          operation:"REVISION-TARGET-AUDIT",
          sourceUse:"Use the canonical probe and case context only to identify live targets, not to choose the answer.",
          studentAction:"Name candidate revision targets and state what would have to be true for each to remain live.",
          firewall:"An anomaly identifies pressure, not its culprit."
        },
        {
          moveId:"M2-HOLD-VARY",ordinal:2,
          prompt:"Hold the Newtonian framework fixed and vary the Vulcan auxiliary. What consequences follow, and what remains unresolved?",
          operation:"CONTROLLED-REVISION-PROBE",
          sourceUse:"Treat the probe as a controlled possibility space, not as historical actuality.",
          studentAction:"Record predicted consequences and the unresolved remainder.",
          firewall:"Probe result ≠ historical fact."
        },
        {
          moveId:"M3-COMPARE-TRAJECTORIES",ordinal:3,
          prompt:"Compare the Neptune and Vulcan repair trajectories. What was structurally similar, and what differed in evidential outcome?",
          operation:"TRANSITION-AUDIT",
          sourceUse:"Use canonical transitions to distinguish availability from later support.",
          studentAction:"State one similarity and one difference without turning either into a universal rule.",
          firewall:"Shared strategy ≠ guaranteed success."
        },
        {
          moveId:"M4-BOUND-JUDGMENT",ordinal:4,
          prompt:"What may you conclude about scientific revision rules from these cases, and what may you not conclude?",
          operation:"CLAIM-CEILING-CHECK",
          sourceUse:"Use the canonical claim ceiling as a boundary, not as prose to copy.",
          studentAction:"Write a bounded judgment, remaining uncertainty, and a REOPEN condition.",
          firewall:"Showing that no universal auxiliary-first rule is licensed ≠ proving a universal opposite rule."
        }
      ]
    },
    outputCard:{
      title:"Revision Under Pressure — Output Card",
      fields:[
        {fieldId:"claim",label:"My current bounded claim",required:true,author:"STUDENT"},
        {fieldId:"reason",label:"My strongest reason",required:true,author:"STUDENT"},
        {fieldId:"uncertainty",label:"What remains uncertain",required:true,author:"STUDENT"},
        {fieldId:"reopen",label:"I would REOPEN this judgment if…",required:true,author:"STUDENT"}
      ],
      completionRule:"All four required fields must be student-authored; no field may be auto-filled from the canonical claim ceiling."
    },
    journalHandoff:{
      enabled:true,
      rule:"The journal may ask how the student now recognizes revision pressure in another domain, but it must not replace or retroactively edit the workbook output card."
    },
    returnRule:"Return from scaffolded case operations to the student's own bounded claim, reason, uncertainty, and REOPEN condition."
  };
}

export function validateClassroomPackage(pkg:ClassroomPackage):ClassroomValidation{
  const failures:string[]=[];
  if(pkg.projection.environment!=="CLASSROOM") failures.push("wrong-environment");
  if(pkg.workbook.moves.length<4) failures.push("insufficient-consequential-moves");
  const ordinals=pkg.workbook.moves.map(m=>m.ordinal);
  if(new Set(ordinals).size!==ordinals.length) failures.push("duplicate-move-ordinal");
  if(!pkg.workbook.moves.some(m=>m.operation==="CLAIM-CEILING-CHECK")) failures.push("missing-claim-ceiling-move");
  if(!pkg.workbook.moves.some(m=>m.operation==="CONTROLLED-REVISION-PROBE")) failures.push("missing-probe-move");
  const fields=pkg.outputCard.fields.filter(f=>f.required);
  for(const id of ["claim","reason","uncertainty","reopen"]){
    const f=fields.find(x=>x.fieldId===id);
    if(!f) failures.push(`missing-output-field:${id}`);
    else if(f.author!=="STUDENT") failures.push(`nonstudent-output-field:${id}`);
  }
  if(!pkg.outputCard.completionRule.includes("student-authored")) failures.push("output-authorship-not-enforced");
  if(!pkg.returnRule.includes("student")) failures.push("missing-learner-return");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
