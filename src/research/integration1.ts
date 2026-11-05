import { ViewId } from "../kernel/types";

export type HumanExposure = "FULL"|"LIGHT"|"COMPRESSED"|"RARE"|"NONE";
export type IntegrationClass = "USER_VISIBLE"|"HIDDEN_GOVERNANCE"|"RESEARCH_ONLY_DETAIL";
export type KernelCarrier =
  | "TASK"
  | "NODE"
  | "CLAIM"
  | "CONNECTION"
  | "SHARED_TASK"
  | "CONSTRAINT"
  | "PATH"
  | "ACTION"
  | "MAP_CHANGE"
  | "RETURN"
  | "OUTPUT_CARD"
  | "REOPEN"
  | "RESEARCH_OVERLAY";

export interface RevisionCapabilityPlacement {
  capabilityId:string;
  revisionModule:string;
  capability:string;
  views:ViewId[];
  classes:IntegrationClass[];
  humanExposure:HumanExposure;
  ordinaryLanguageCue?:string;
  kernelCarriers:KernelCarrier[];
  activationTrigger:string;
  fullResearchDetail:string;
  requiresKernelChange:boolean;
}

export interface KernelChangeGate {
  status:"NO_KERNEL_CHANGE"|"KERNEL_CHANGE_REQUIRED";
  genuineRepresentationGaps:string[];
  overlaySufficient:string[];
  reason:string;
}

const p = (
  capabilityId:string,
  revisionModule:string,
  capability:string,
  views:ViewId[],
  classes:IntegrationClass[],
  humanExposure:HumanExposure,
  ordinaryLanguageCue:string|undefined,
  kernelCarriers:KernelCarrier[],
  activationTrigger:string,
  fullResearchDetail:string,
  requiresKernelChange=false
):RevisionCapabilityPlacement => ({
  capabilityId,revisionModule,capability,views,classes,humanExposure,
  ordinaryLanguageCue,kernelCarriers,activationTrigger,fullResearchDetail,
  requiresKernelChange
});

export const REVISION_TO_CARTOGRAPHY_CROSSWALK:RevisionCapabilityPlacement[]=[
  p("r1-target","FSP-REVISION-1","revision target",["INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What might need to change?",
    ["PATH","CONSTRAINT","ACTION","RESEARCH_OVERLAY"],"a current explanation or path stops fitting","typed revision-target grammar"),
  p("r1-minimal","FSP-REVISION-1","minimal-mutilation audit",["INVESTIGATE"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"multiple live revision candidates","scope-cost and preservation audit"),
  p("r1-frontier","FSP-REVISION-1","revision frontier",["INVESTIGATE","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","Which possibilities are still live, and why?",
    ["PATH","ACTION","RETURN","RESEARCH_OVERLAY"],"more than one revision remains live","supported/unresolved/failed candidate frontier"),
  p("r1-ceiling","FSP-REVISION-1","revision-choice claim ceiling",["RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What are you not claiming yet?",
    ["RETURN","OUTPUT_CARD"],"a bounded judgment is formed","formal revision-choice claim ceiling"),

  p("r2-reasons","FSP-REVISION-2","revision-reason grammar",["INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","What supports this possibility? What counts against it?",
    ["CLAIM","PATH","CONSTRAINT","RESEARCH_OVERLAY"],"revision alternatives conflict","evidence/coherence/simplicity/fecundity/scope/conservatism/explanatory-power matrix"),
  p("r2-tradeoff","FSP-REVISION-2","reason tradeoff matrix",["INVESTIGATE"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"several reasons pull in different directions","full multi-reason matrix and Pareto-style dominance"),
  p("r2-good-sense","FSP-REVISION-2","good-sense comparator",["INVESTIGATE","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","Which reasons matter most to you here, and which remain defeasible?",
    ["CLAIM","RETURN","RESEARCH_OVERLAY"],"reasonable evaluators foreground different considerations","evaluator priority profiles"),
  p("r2-path","FSP-REVISION-2","path-dependence audit",["HSF","INSTITUTION","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","What is here because of how this situation developed?",
    ["NODE","CLAIM","CONSTRAINT","RESEARCH_OVERLAY"],"historical inheritance shapes current options","formation/justification path-dependence classifications"),

  p("r3-time","FSP-REVISION-3","reason change over time",["HSF","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What changed as new information arrived?",
    ["CLAIM","MAP_CHANGE","RESEARCH_OVERLAY"],"evidence or salience changes over time","ordered revision moments and reason-change records"),
  p("r3-salience","FSP-REVISION-3","evidence-triggered salience shift",["INVESTIGATE"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["MAP_CHANGE","RESEARCH_OVERLAY"],"a reason becomes more or less salient","categorical salience-change records"),
  p("r3-community","FSP-REVISION-3","community convergence/nonconvergence",["CONNECTIONS","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","Where do people agree on action, choice, or reasons—and where do they not?",
    ["CONNECTION","SHARED_TASK","RETURN","RESEARCH_OVERLAY"],"multiple participants disagree or coordinate","five-state convergence grammar"),
  p("r3-practical","FSP-REVISION-3","practical convergence without theory convergence",["CONNECTIONS"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"FULL","Can you act together on anything without agreeing on everything?",
    ["SHARED_TASK","CONNECTION"],"shared action is possible despite disagreement","community convergence classifier"),

  p("r4-minority","FSP-REVISION-4","minority report",["CONNECTIONS","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What important disagreement should remain visible?",
    ["CLAIM","SHARED_TASK","RETURN","REOPEN","RESEARCH_OVERLAY"],"a minority view would otherwise disappear","full minority-report object"),
  p("r4-access","FSP-REVISION-4","evidence asymmetry",["PEOPLE","CONNECTIONS","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","Who can see, challenge, or verify the relevant information?",
    ["CLAIM","CONNECTION","ACTION","RESEARCH_OVERLAY"],"participants have unequal evidence access","per-member evidence-access matrix"),
  p("r4-power","FSP-REVISION-4","authority/power distortion",["CONNECTIONS","INSTITUTION"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"FULL","Who has expertise, who has formal authority, and who can actually impose consequences?",
    ["CONNECTION","NODE","CONSTRAINT","RESEARCH_OVERLAY"],"authority and practical power may be confused","epistemic/procedural/practical influence audit"),
  p("r4-legitimate","FSP-REVISION-4","legitimate nonconvergence audit",["RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RETURN","REOPEN","RESEARCH_OVERLAY"],"persistent disagreement remains","five-outcome nonconvergence legitimacy audit"),

  p("r5-testimonial","FSP-REVISION-5","testimonial credibility distortion",["PEOPLE","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"RARE","Is someone being discounted or over-credited for reasons unrelated to the evidence?",
    ["CLAIM","ACTION","RESEARCH_OVERLAY"],"credibility allocation becomes inquiry-relevant","testimonial-distortion audit"),
  p("r5-hermeneutical","FSP-REVISION-5","hermeneutical gap",["PEOPLE","INSTITUTION","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"RARE","Do the available words or categories fail to capture something important?",
    ["CLAIM","CONSTRAINT","ACTION","RESEARCH_OVERLAY"],"available interpretive resources appear inadequate","hermeneutical-distortion audit"),
  p("r5-standing","FSP-REVISION-5","standing repair",["CONNECTIONS","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","What would let this person participate meaningfully in the inquiry?",
    ["CONNECTION","ACTION","PATH","RESEARCH_OVERLAY"],"standing or contestability is constrained","multi-capability standing-repair object"),
  p("r5-counter","FSP-REVISION-5","counter-public evidence",["INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What evidence or language is missing from the dominant account?",
    ["CLAIM","ACTION","RESEARCH_OVERLAY"],"excluded evidence or vocabulary becomes relevant","counter-public evidence record"),
  p("r5-reentry","FSP-REVISION-5","revision re-entry",["INVESTIGATE","RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["PATH","RETURN","REOPEN","RESEARCH_OVERLAY"],"previously excluded perspective may re-enter","six-state re-entry audit"),

  p("r6-concept","FSP-REVISION-6","concept formation/provenance",["HSF","INSTITUTION","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"RARE","Where did this way of describing the situation come from?",
    ["CLAIM","NODE","MAP_CHANGE","RESEARCH_OVERLAY"],"language itself becomes part of the problem","concept record with origin/contributors/contrast/scope"),
  p("r6-translation","FSP-REVISION-6","translation across vocabularies",["CONNECTIONS","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","What carries across between these ways of talking—and what does not?",
    ["CLAIM","CONNECTION","RETURN","RESEARCH_OVERLAY"],"participants use non-identical vocabularies","five-status concept-translation audit"),
  p("r6-remainder","FSP-REVISION-6","translation remainder",["INVESTIGATE","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What did not carry across?",
    ["CLAIM","RETURN","OUTPUT_CARD","RESEARCH_OVERLAY"],"translation loses task-relevant structure","explicit lost-features/remainder arrays"),
  p("r6-capture","FSP-REVISION-6","concept capture/co-option",["INSTITUTION","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"RARE","Did the label stay the same while its meaning, provenance, or who may contest it changed?",
    ["NODE","CLAIM","CONSTRAINT","RESEARCH_OVERLAY"],"institution adopts an emergent concept","semantic/provenance/contributor capture audit"),
  p("r6-language","FSP-REVISION-6","shared-language nonconvergence",["CONNECTIONS","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","Do you need the same words to coordinate on this task?",
    ["SHARED_TASK","RETURN","RESEARCH_OVERLAY"],"coordination continues despite lexical difference","five-state shared-language audit"),

  p("r7-genealogy","FSP-REVISION-7","concept genealogy",["HSF","INSTITUTION","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"RARE","How has this idea changed as it moved through time and institutions?",
    ["NODE","CLAIM","MAP_CHANGE","RESEARCH_OVERLAY"],"historical meaning is task-relevant","ordered genealogy/version/sedimentation graph"),
  p("r7-drift","FSP-REVISION-7","semantic drift",["HSF","INSTITUTION"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["MAP_CHANGE","RESEARCH_OVERLAY"],"same label persists across changing meanings","definition/scope/contrast/provenance drift audit"),
  p("r7-falsefriend","FSP-REVISION-7","cross-generation false friend",["HSF","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"RARE","Are we reading an older use through today's meaning?",
    ["CLAIM","ACTION","REOPEN","RESEARCH_OVERLAY"],"historical back-projection risk appears","cross-generation translation status"),
  p("r7-historical-reopen","FSP-REVISION-7","historical REOPEN",["RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","What about this inherited idea should be reconsidered now?",
    ["REOPEN","RETURN","OUTPUT_CARD"],"drift/provenance/task/evidence changes warrant review","seven-trigger historical reopen audit"),

  p("r8-network","FSP-REVISION-8","institutional sedimentation network",["INSTITUTION","CONNECTIONS","HSF"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"COMPRESSED","What keeps reinforcing this arrangement?",
    ["NODE","CONNECTION","CONSTRAINT","RESEARCH_OVERLAY"],"institutional ecology rather than one actor explains persistence","typed multi-node sedimentation network"),
  p("r8-feedback","FSP-REVISION-8","policy/practice feedback",["INSTITUTION","CONNECTIONS"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","How do rules shape practice, and how does practice feed back into the rules?",
    ["CONNECTION","NODE","RESEARCH_OVERLAY"],"policy and practice form a loop","feedback-loop object"),
  p("r8-lockin","FSP-REVISION-8","historical lock-in",["INSTITUTION","HSF","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","What makes this arrangement hard to change?",
    ["CONSTRAINT","CONNECTION","ACTION","RESEARCH_OVERLAY"],"switching costs/reinforcement/suppressed alternatives matter","lock-in strength audit"),
  p("r8-window","FSP-REVISION-8","repair window",["INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","Is there a real opening for change now, and what could close it?",
    ["PATH","CONSTRAINT","ACTION","RESEARCH_OVERLAY"],"repair opportunity conditions align","repair-window formal object"),
  p("r8-capability","FSP-REVISION-8","cross-generational capability effect",["HSF","INSTITUTION","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"RARE","Who gained from this arrangement, who is constrained now, and what changed across generations?",
    ["CLAIM","CONNECTION","RETURN","RESEARCH_OVERLAY"],"historical benefits and present burdens diverge","generation-indexed capability audit"),

  p("r9-sequence","FSP-REVISION-9","repair sequencing",["INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","What has to happen before the next repair step is safe or meaningful?",
    ["PATH","CONSTRAINT","ACTION","RESEARCH_OVERLAY"],"multiple repair steps have dependencies","typed ordered repair sequence"),
  p("r9-tradeoff","FSP-REVISION-9","capability tradeoffs across groups",["CONNECTIONS","INVESTIGATE","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"COMPRESSED","Who gains, who loses, and what remains unknown under this change?",
    ["CLAIM","CONNECTION","RETURN","RESEARCH_OVERLAY"],"repair affects groups differently","group-specific tradeoff audit"),
  p("r9-eva","FSP-REVISION-9","exit/voice/appeal architecture",["CONNECTIONS","INSTITUTION"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","Can people leave, speak, and appeal in ways that are actually usable?",
    ["CONNECTION","CONSTRAINT","ACTION","RESEARCH_OVERLAY"],"formal participation may be practically hollow","independent EVA audit"),
  p("r9-reversible","FSP-REVISION-9","repair reversibility",["INVESTIGATE","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","Can this change be rolled back if it goes badly?",
    ["PATH","CONSTRAINT","REOPEN","RESEARCH_OVERLAY"],"repair carries irreversible risk","reversibility/higher-evidence-burden audit"),
  p("r9-multigen","FSP-REVISION-9","multi-generation REOPEN",["HSF","RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["REOPEN","RESEARCH_OVERLAY"],"repair persists across generations","generation-indexed reopen rules"),

  p("r10-comp","FSP-REVISION-10","compensation boundary",["INVESTIGATE","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"RARE","Can this loss really be made good by something else?",
    ["CONSTRAINT","RETURN","RESEARCH_OVERLAY"],"repair proposes compensation for a loss","four-state compensation boundary"),
  p("r10-floor","FSP-REVISION-10","protected capability floor",["INSTITUTION","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"RARE","What minimum ability must remain protected here?",
    ["CONSTRAINT","RETURN","REOPEN","RESEARCH_OVERLAY"],"tradeoff threatens a declared minimum","non-waivable floor declaration"),
  p("r10-burden","FSP-REVISION-10","burden-shifting audit",["CONNECTIONS","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"LIGHT","Who is carrying the cost of this repair?",
    ["CONNECTION","CONSTRAINT","CLAIM","RESEARCH_OVERLAY"],"repair relocates or creates burdens","burden-shift audit"),
  p("r10-legitimacy","FSP-REVISION-10","repair legitimacy conditions",["RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RETURN","OUTPUT_CARD","RESEARCH_OVERLAY"],"repair approaches authorization","six-state legitimacy audit"),
  p("r10-authorization","FSP-REVISION-10","multi-party authorization without convergence",["CONNECTIONS","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"COMPRESSED","Can affected parties authorize this for different reasons without pretending they agree on everything?",
    ["SHARED_TASK","CONNECTION","RETURN","RESEARCH_OVERLAY"],"repair requires plural authorization","party-level authorization audit"),

  p("r11-emergency","FSP-REVISION-11","temporary floor exception",["INSTITUTION","INVESTIGATE"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"RARE","Is ordinary governance genuinely insufficient, and what protection must still remain?",
    ["CONSTRAINT","PATH","ACTION","RESEARCH_OVERLAY"],"emergency claim would narrow a protected floor","temporary-exception audit"),
  p("r11-sunset","FSP-REVISION-11","sunset/review architecture",["INSTITUTION","RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["REOPEN","CONSTRAINT","RESEARCH_OVERLAY"],"temporary exception is activated","sunset and renewal audit"),
  p("r11-nonideal","FSP-REVISION-11","non-ideal authorization",["CONNECTIONS","RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["SHARED_TASK","RETURN","RESEARCH_OVERLAY"],"ideal participation is impossible under emergency","proxy/temporary authorization audit"),
  p("r11-restoration","FSP-REVISION-11","restoration to normal governance",["INSTITUTION","RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE"],"RARE","What has to be restored before this temporary arrangement ends?",
    ["ACTION","CONSTRAINT","REOPEN","RETURN","RESEARCH_OVERLAY"],"emergency exception is ending or persisting","four-state restoration audit"),
  p("r11-ratchet","FSP-REVISION-11","emergency normalization detection",["INSTITUTION"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"temporary powers persist past restoration deadline","EXCEPTION_NORMALIZED state"),

  p("r12-selfaudit","FSP-REVISION-12","constitutional self-audit",["START","RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"FSP's own rules are challenged or versioned","constitutional provenance/challenge/reopen audit"),
  p("r12-ratchet","FSP-REVISION-12","exception-to-normal ratchet detection",["INSTITUTION"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"exception becomes a default","ratchet audit"),
  p("r12-reflexive","FSP-REVISION-12","governance-layer reflexivity",["START","RETURN"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"governance layer itself becomes inquiry object","object/revision/constitutional layer audit"),
  p("r12-reopen","FSP-REVISION-12","FSP-as-object reopening",["RETURN"],
    ["USER_VISIBLE","HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"RARE","Should one of the framework's own rules be reconsidered here?",
    ["REOPEN","RETURN","RESEARCH_OVERLAY"],"user/researcher challenges an FSP commitment","constitutional challenge gate"),
  p("r12-freeze","FSP-REVISION-12","revision-program provisional freeze",["START"],
    ["HIDDEN_GOVERNANCE","RESEARCH_ONLY_DETAIL"],"NONE",undefined,
    ["RESEARCH_OVERLAY"],"research architecture reaches a version checkpoint","program integration/freeze audit")
];

export const RESEARCH_VOCABULARY = [
  "minimal-mutilation",
  "revision frontier",
  "fecundity",
  "testimonial injustice",
  "hermeneutical injustice",
  "counter-public",
  "concept capture",
  "sedimentation",
  "pareto",
  "capability floor",
  "exception normalized",
  "constitutional self-audit"
] as const;

export function placementsForRevision(revisionModule:string):RevisionCapabilityPlacement[]{
  return REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(p=>p.revisionModule===revisionModule);
}

export function placementsForView(view:ViewId):RevisionCapabilityPlacement[]{
  return REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(p=>p.views.includes(view));
}

export function humanFacingPlacements():RevisionCapabilityPlacement[]{
  return REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(p=>p.classes.includes("USER_VISIBLE"));
}

export function researchOnlyPlacements():RevisionCapabilityPlacement[]{
  return REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(
    p=>p.classes.includes("RESEARCH_ONLY_DETAIL") && p.humanExposure==="NONE"
  );
}

export function auditKernelChangeGate():KernelChangeGate{
  const gaps=REVISION_TO_CARTOGRAPHY_CROSSWALK
    .filter(p=>p.requiresKernelChange)
    .map(p=>p.capabilityId);

  const overlaySufficient=REVISION_TO_CARTOGRAPHY_CROSSWALK
    .filter(p=>!p.requiresKernelChange && p.kernelCarriers.includes("RESEARCH_OVERLAY"))
    .map(p=>p.capabilityId);

  return {
    status:gaps.length===0 ? "NO_KERNEL_CHANGE" : "KERNEL_CHANGE_REQUIRED",
    genuineRepresentationGaps:gaps,
    overlaySufficient,
    reason:gaps.length===0
      ? "The frozen kernel already carries the human-facing primitives required for the seven-view journeys. Advanced Revision detail can remain in a separate research overlay until a concrete human-facing persistence need proves otherwise."
      : "At least one human-facing capability cannot be represented faithfully by existing kernel carriers or a separate research overlay."
  };
}

export function humanVocabularyLeaks(texts:string[]):string[]{
  const joined=texts.join(" ").toLowerCase();
  return RESEARCH_VOCABULARY.filter(term=>joined.includes(term.toLowerCase()));
}

export function integrationCoverage():{
  revisions:string[];
  views:ViewId[];
  userVisibleCount:number;
  hiddenCount:number;
  researchDetailCount:number;
}{
  const revisions=canonical(REVISION_TO_CARTOGRAPHY_CROSSWALK.map(p=>p.revisionModule));
  const views=canonical(
    REVISION_TO_CARTOGRAPHY_CROSSWALK.flatMap(p=>p.views)
  ) as ViewId[];
  return {
    revisions,
    views,
    userVisibleCount:REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(p=>p.classes.includes("USER_VISIBLE")).length,
    hiddenCount:REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(p=>p.classes.includes("HIDDEN_GOVERNANCE")).length,
    researchDetailCount:REVISION_TO_CARTOGRAPHY_CROSSWALK.filter(p=>p.classes.includes("RESEARCH_ONLY_DETAIL")).length
  };
}

function canonical<T extends string>(values:T[]):T[]{
  return [...new Set(values)].sort() as T[];
}
