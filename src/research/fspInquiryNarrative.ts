import { ChapterId } from "./encyclopediaNavigation";

export type TemporalPrecision = "DATE"|"YEAR"|"RANGE"|"ERA";

export interface InquiryMilestone {
  milestoneId:string;
  label:string;
  start:string;
  end?:string;
  precision:TemporalPrecision;
  narrative:string;
  stateIds:string[];
  transitionIds:string[];
  sourceIds:string[];
  significance:string;
}

export interface NarrativeSource {
  sourceId:string;
  title:string;
  url:string;
  supports:string[];
}

export interface ChapterAperture {
  chapterId:ChapterId;
  sectionIds:string[];
  title:string;
  chapterQuestion:string;
  currentFocus:string;
  wholeInquiryConnection:string;
  whatFspAdds:string[];
  returnPrompt:string;
}

export interface InquiryNarrativeSpine {
  caseId:string;
  title:string;
  orientingQuestion:string;
  whyWholeStoryMatters:string;
  narrativeParagraphs:string[];
  milestones:InquiryMilestone[];
  apertures:ChapterAperture[];
  sources:NarrativeSource[];
  contextPrompts:{
    whole:string;
    temporal:string;
    local:string;
    fsp:string;
  };
  returnPolicy:{
    localReturn:string;
    wholeInquiryReturn:string;
    rule:string;
  };
  firewalls:string[];
}

export interface InquiryContextRecovery {
  caseId:string;
  chapterId?:ChapterId;
  sectionId?:string;
  wholeProblem:string;
  temporalLocation:string;
  localProblem:string;
  fspContribution:string;
  wholeInquiryHref:string;
  localHref?:string;
}

export const NEPTUNE_VULCAN_NARRATIVE:InquiryNarrativeSpine={
  caseId:"NEPTUNE-VULCAN",
  title:"Neptune and Vulcan: One Repair Strategy, Two Historical Trajectories",
  orientingQuestion:"When an established theory faces an anomalous prediction, what should investigators revise—and how can later success make an earlier choice look more obvious than it was?",
  whyWholeStoryMatters:"The philosophical lesson depends on seeing the full historical sequence. Neptune is not simply a successful guess and Vulcan a failed one. Both emerged from efforts to preserve a highly successful Newtonian framework by revising assumptions about what bodies existed. Their later evidential trajectories diverged. FSP uses that divergence to make revision targets, evidence changes, historical timing, and claim ceilings inspectable without pretending that the formal representation replaces the history.",
  narrativeParagraphs:[
    "By the early nineteenth century, Newtonian celestial mechanics had accumulated extraordinary predictive authority. Yet the observed motion of Uranus did not fit its predicted orbit perfectly. That mismatch did not by itself say what was wrong. Measurement, calculations, the inventory of known gravitating bodies, or the underlying theory could in principle bear some of the revision pressure.",
    "One conservative response was to retain Newtonian gravitation and revise an auxiliary assumption: perhaps another, unseen planet was perturbing Uranus. John Couch Adams and Urbain Le Verrier independently calculated where such a body might be found. On September 23, 1846, Johann Gottfried Galle observed Neptune close to Le Verrier's predicted position. The episode became a celebrated success of mathematically guided auxiliary repair within Newtonian celestial mechanics.",
    "Mercury later presented a superficially similar problem. Its perihelion advanced slightly more than Newtonian calculations based on the known planets could account for. In 1859 Le Verrier drew attention to the unexplained residual and explored the possibility of an intra-Mercurial planet. The hypothetical body came to be called Vulcan. The earlier Neptune success made this kind of repair intelligible and worth testing, but it did not guarantee that the same repair topology would succeed again.",
    "For decades, searches and reported sightings failed to establish Vulcan as the needed planet. The anomaly persisted. What changed over this interval was not merely the passage of time; the evidential standing of the auxiliary repair eroded while the problem itself remained. The history therefore contains an extended interval in which the inquiry was neither solved nor logically forced into one unique alternative.",
    "In 1915 Einstein showed that general relativity accounted for Mercury's anomalous perihelion advance without requiring Vulcan. The successful response was no longer an additional body inside an unchanged gravitational framework but a deeper reconstruction of gravitation. Newtonian mechanics did not thereby become useless: it remained highly successful within bounded regimes.",
    "The paired history is philosophically useful because hindsight can compress these decades into a simple morality tale. FSP instead keeps the inquiry diachronic. At each stage it asks what was being held fixed, what was open to revision, what evidence had actually arrived, which possibilities remained live, and what could responsibly be concluded then. Neptune shows that auxiliary repair can succeed. Vulcan shows that earlier success does not make the same target mandatory in a later anomaly. The pair does not generate a universal opposite rule either."
  ],
  milestones:[
    {
      milestoneId:"NV-T0",label:"Uranus discrepancy under a successful Newtonian framework",
      start:"1821",precision:"YEAR",
      narrative:"Published orbital work made the Uranus discrepancy a durable problem inside an otherwise highly successful celestial mechanics.",
      stateIds:["NV0"],transitionIds:[],sourceIds:["NASA-NEPTUNE-HISTORY"],
      significance:"Creates revision pressure without identifying a unique culprit."
    },
    {
      milestoneId:"NV-T1",label:"Unseen-planet calculations and Neptune discovery",
      start:"1845",end:"1846",precision:"RANGE",
      narrative:"Adams and Le Verrier independently developed unseen-planet calculations; Galle observed Neptune on September 23, 1846, close to Le Verrier's predicted position.",
      stateIds:["NV1","NV2"],transitionIds:["NV0-NV1","NV1-NV2"],sourceIds:["NASA-NEPTUNE-HISTORY","NASA-NEPTUNE-FACT"],
      significance:"A live auxiliary repair acquires strong observational support."
    },
    {
      milestoneId:"NV-T2",label:"Mercury residual and the Vulcan proposal",
      start:"1859",precision:"YEAR",
      narrative:"Le Verrier identified an unexplained residual in Mercury's perihelion advance and considered an intra-Mercurial body as a Newtonian repair.",
      stateIds:["NV3"],transitionIds:["NV2-NV3"],sourceIds:["APS-MERCURY-2018"],
      significance:"A structurally familiar repair strategy is reopened in a different inquiry."
    },
    {
      milestoneId:"NV-T3",label:"Long unsuccessful Vulcan search trajectory",
      start:"1859",end:"1915",precision:"RANGE",
      narrative:"Repeated searches and proposed sightings did not establish a planet capable of resolving the anomaly; the auxiliary repair lost standing while the anomaly remained.",
      stateIds:["NV3"],transitionIds:[],sourceIds:["APS-MERCURY-2018"],
      significance:"Shows diachronic erosion of a repair's standing rather than instantaneous falsification."
    },
    {
      milestoneId:"NV-T4",label:"General relativity explains Mercury's perihelion",
      start:"1915",precision:"YEAR",
      narrative:"Einstein's general relativity accounted for Mercury's anomalous perihelion advance without Vulcan.",
      stateIds:["NV4"],transitionIds:["NV3-NV4"],sourceIds:["NASA-GR-CENTENNIAL"],
      significance:"A deeper framework revision gains explanatory and evidential standing while Newtonian use survives in bounded regimes."
    }
  ],
  apertures:[
    {
      chapterId:"CH1-DUHEM-QUINE",sectionIds:["CH1.1","CH1.2"],
      title:"Revision pressure: where should change go?",
      chapterQuestion:"Does a failed prediction identify what must be revised?",
      currentFocus:"Compare the successful Neptune auxiliary repair with the failed Vulcan trajectory.",
      wholeInquiryConnection:"This is the opening problem of the whole narrative: both anomalies generated multiple possible revision targets inside historically successful Newtonian practice.",
      whatFspAdds:["separates anomaly from revision target","tracks auxiliary standing through time","prevents hindsight from becoming a universal revision rule"],
      returnPrompt:"Return to the full story and ask what investigators could responsibly know before the later outcome was available."
    },
    {
      chapterId:"CH2-KUHN-MEANING",sectionIds:["CH2.6"],
      title:"Semantic stability and framework change",
      chapterQuestion:"Must every important theory change involve immediate meaning change?",
      currentFocus:"Notice that the planet concept remains comparatively stable through the Neptune/Vulcan repair attempts even though the later gravitational framework changes more deeply.",
      wholeInquiryConnection:"The same history helps distinguish local auxiliary revision from later changes in the roles of gravity and spacetime.",
      whatFspAdds:["keeps concept stability separate from framework stability","marks where semantic change is central and where it is not","preserves translation remainder across later Newtonian and relativistic descriptions"],
      returnPrompt:"Return to the whole inquiry and compare what changed in 1846 with what changed in 1915."
    },
    {
      chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionIds:["CH3.4"],
      title:"Controlled revision spaces",
      chapterQuestion:"How can we explore alternative repairs without confusing imagined variation with historical fact?",
      currentFocus:"Hold selected commitments fixed and compare the unseen-planet repair with deeper gravitational revision.",
      wholeInquiryConnection:"The historical sequence supplies constraints for the probe; the probe does not rewrite that sequence.",
      whatFspAdds:["makes hold-fixed/vary operations explicit","separates controlled possibility from actual history","records remainder and claim ceiling after the probe"],
      returnPrompt:"Return to the chronology and check which possibilities were actually tested, supported, weakened, or replaced."
    },
    {
      chapterId:"CH4-DIACHRONIC-FORMALISM",sectionIds:["CH4.1","CH4.2","CH4.6","CH4.11","CH4.12"],
      title:"Representing inquiry through time",
      chapterQuestion:"How can we formalize changing inquiry without flattening historical time into a sequence of labels?",
      currentFocus:"Use states and transitions to track changing evidence, auxiliaries, frameworks, and standing from the Uranus anomaly through the 1915 gravitational revision.",
      wholeInquiryConnection:"The formal sequence is anchored to the dated narrative but is not identical with calendar time or with the history itself.",
      whatFspAdds:["makes transition dimensions inspectable","preserves provenance and claim ceilings at each stage","supports REOPEN while retaining historical order"],
      returnPrompt:"Return from the state/transition representation to the continuous historical narrative and ask what the formalization clarified—and what it left out."
    }
  ],
  sources:[
    {sourceId:"NASA-NEPTUNE-HISTORY",title:"175 Years Ago: Astronomers Discover Neptune, the Eighth Planet",url:"https://www.nasa.gov/history/175-years-ago-astronomers-discover-neptune-the-eighth-planet/",supports:["Uranus discrepancy","Adams and Le Verrier predictions","September 23–24, 1846 Neptune discovery","Galle observation near predicted position"]},
    {sourceId:"NASA-NEPTUNE-FACT",title:"Neptune Fact Sheet",url:"https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html",supports:["September 23, 1846 discovery date","discovery attribution"]},
    {sourceId:"APS-MERCURY-2018",title:"New General Relativistic Contribution to Mercury's Perihelion Advance",url:"https://link.aps.org/doi/10.1103/PhysRevLett.120.191101",supports:["Le Verrier's 1859 Mercury residual","Vulcan as attempted repair","persistence of the problem into the relativistic era"]},
    {sourceId:"NASA-GR-CENTENNIAL",title:"100 Years and Counting: General Relativity",url:"https://assets.science.nasa.gov/content/dam/science/astro/programs/physics-of-the-cosmos/documents/brochures-factsheets/jan-2015-aas/GR_Centennial_Brochure-Final.pdf",supports:["1915 general relativity","Mercury perihelion as a classic GR test"]}
  ],
  contextPrompts:{
    whole:"What is the whole inquiry problem, and what historical sequence brought us here?",
    temporal:"Where are we in historical time, and what later evidence is not yet available at this point?",
    local:"Which part of the larger problem are we inspecting right now?",
    fsp:"What is FSP making easier to distinguish, track, or return to here?"
  },
  returnPolicy:{
    localReturn:"Return to the exact chapter sentence or local inspection origin.",
    wholeInquiryReturn:"Return to the case narrative spine with the relevant milestone and chapter aperture highlighted.",
    rule:"Every local inspection must support both exact local return and recovery of the whole inquiry context."
  },
  firewalls:[
    "Formal state order is anchored in historical time but is not identical with calendar time.",
    "A later successful explanation must not be projected backward as if it were already available to earlier investigators.",
    "Probe possibility ≠ historical actuality.",
    "Historical chronology ≠ canonical state identity.",
    "Whole-inquiry recovery complements rather than replaces exact Authorial Return."
  ]
};

export function apertureForChapter(caseId:string,chapterId:ChapterId):ChapterAperture{
  if(caseId!=="NEPTUNE-VULCAN") throw new Error(`no narrative spine yet for case: ${caseId}`);
  const a=NEPTUNE_VULCAN_NARRATIVE.apertures.find(x=>x.chapterId===chapterId);
  if(!a) throw new Error(`no aperture for chapter: ${chapterId}`);
  return structuredClone(a);
}

export function milestoneForState(caseId:string,stateId:string):InquiryMilestone[]{
  if(caseId!=="NEPTUNE-VULCAN") throw new Error(`no narrative spine yet for case: ${caseId}`);
  return NEPTUNE_VULCAN_NARRATIVE.milestones.filter(m=>m.stateIds.includes(stateId)).map(m=>structuredClone(m));
}

export function recoverInquiryContext(args:{
  caseId:string;
  chapterId?:ChapterId;
  sectionId?:string;
  stateId?:string;
}):InquiryContextRecovery{
  if(args.caseId!=="NEPTUNE-VULCAN") throw new Error(`no narrative spine yet for case: ${args.caseId}`);
  const aperture=args.chapterId ? apertureForChapter(args.caseId,args.chapterId) : undefined;
  const milestones=args.stateId ? milestoneForState(args.caseId,args.stateId) : [];
  return {
    caseId:args.caseId,
    chapterId:args.chapterId,
    sectionId:args.sectionId,
    wholeProblem:NEPTUNE_VULCAN_NARRATIVE.orientingQuestion,
    temporalLocation:milestones.length ? milestones.map(m=>`${m.label} (${m.start}${m.end?`–${m.end}`:""})`).join("; ") : "Use the full dated narrative timeline.",
    localProblem:aperture?.currentFocus ?? "Recover the whole inquiry before entering a local aperture.",
    fspContribution:aperture?.whatFspAdds.join(" · ") ?? "FSP separates historical chronology, inquiry states, evidence, revision targets, probes, and claim ceilings.",
    wholeInquiryHref:"#/narrative/NEPTUNE-VULCAN",
    localHref:args.sectionId ? `#/reader/${args.sectionId}/NEPTUNE-VULCAN` : undefined
  };
}

export function validateInquiryNarrative(spine:InquiryNarrativeSpine):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  if(spine.narrativeParagraphs.length<5) failures.push("narrative-too-thin");
  if(spine.milestones.length<5) failures.push("timeline-too-thin");
  for(const chapterId of ["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"] as ChapterId[]){
    if(!spine.apertures.some(a=>a.chapterId===chapterId)) failures.push(`missing-aperture:${chapterId}`);
  }
  for(const m of spine.milestones){
    if(!m.start) failures.push(`${m.milestoneId}:missing-start`);
    if(!m.sourceIds.length) failures.push(`${m.milestoneId}:missing-source`);
  }
  if(!spine.returnPolicy.localReturn) failures.push("missing-local-return");
  if(!spine.returnPolicy.wholeInquiryReturn) failures.push("missing-whole-return");
  if(!spine.firewalls.some(x=>x.includes("not identical with calendar time"))) failures.push("missing-time-firewall");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
