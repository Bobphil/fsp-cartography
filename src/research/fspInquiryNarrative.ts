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


export const GALILEO_NARRATIVE:InquiryNarrativeSpine={
  caseId:"GALILEO-COPERNICAN",
  title:"Galileo: Evidence, Meaning, Standing, and Power in a Changing Inquiry",
  orientingQuestion:"How did new observations, changing standards of demonstration, interpretive jurisdiction, and institutional power interact in the Copernican controversy without any one of them by itself settling the whole inquiry?",
  whyWholeStoryMatters:"Galileo's case cannot be understood as a simple sequence in which a new observation immediately defeated an old worldview, nor as a simple contest between science and religion. Telescopic evidence changed what could be seen and what older cosmologies could plausibly maintain. At the same time, the standing of instruments, the meanings of demonstration and hypothesis, the relation between natural philosophy and scriptural interpretation, and the institutional authority to regulate teaching and publication all changed the inquiry conditions. FSP is useful here only if it can keep these dimensions distinct while still showing how they interacted through time.",
  narrativeParagraphs:[
    "At the beginning of the seventeenth century, European astronomy and natural philosophy inherited a complex Aristotelian-Ptolemaic order rather than one single proposition waiting to be falsified. The heavens and the terrestrial realm were commonly treated as importantly different, mathematical astronomy could be valued for prediction without automatically determining physical reality, and theological interpretation formed part of the institutional setting within which cosmological claims were discussed. Copernicus had already offered a Sun-centered mathematical system, while Tycho Brahe had developed an alternative system that preserved a stationary Earth. The inquiry therefore began with multiple intellectual and institutional structures already in place.",
    "Galileo's telescopic work changed the evidential field. In late 1609 and early 1610 he used improved telescopes to study the Moon and Jupiter, and in March 1610 published Sidereus Nuncius. The mountains and irregularities of the Moon challenged a simple contrast between perfect heavens and an imperfect Earth. The satellites of Jupiter showed that not every celestial body revolved directly around Earth. Galileo's later observations of the phases of Venus constrained older Ptolemaic arrangements and supported Sun-centered orbital relations. These observations mattered because they were not merely new points of data: they also required arguments that the telescope itself was a trustworthy means of learning about the heavens.",
    "Yet the new evidence did not by itself establish every element of the Copernican system. Some observations ruled out or pressured particular inherited arrangements while remaining compatible with alternatives such as Tychonic systems. The question therefore shifted from 'what did Galileo see?' to a more articulated set of problems: which cosmological systems could accommodate the observations, what counted as a physical demonstration of Earth's motion, and how much standing should be granted to instrument-mediated evidence. The evidential gain was real, but the claim ceiling remained lower than 'the whole Copernican system has now been deductively demonstrated.'",
    "From 1613 through 1616, the inquiry widened further. Galileo openly defended Copernicanism and entered disputes about how natural knowledge and scriptural interpretation should relate. In the Letter to Castelli and the Letter to the Grand Duchess Christina, he argued that genuine truths about nature and Scripture could not ultimately conflict, while also insisting that both nature and texts required disciplined interpretation. In 1616 Copernicus's book was suspended pending correction, and Cardinal Bellarmine admonished Galileo not to hold or defend Copernican doctrine. At this point, evidential standing, standards of demonstration, theological interpretation, and institutional jurisdiction had become entangled without becoming identical.",
    "The controversy did not end in 1616. Galileo continued to work, published The Assayer in 1623, and under Pope Urban VIII eventually completed the Dialogue Concerning the Two Chief World Systems, published in 1632. The Dialogue compared competing cosmologies but strongly favored Earth's motion. Its publication occurred inside a negotiated environment of permissions, previous warnings, patronage, censorship, and political pressures. In 1633 Galileo was tried and condemned, and his sentence was commuted to house arrest. The legal and institutional outcome changed what Galileo could publicly do, but it did not constitute an empirical demonstration that geocentrism was true.",
    "The later history can tempt readers to compress the episode into a morality tale in which modern science simply possessed the truth and authority simply opposed it. FSP instead treats the case diachronically and at several levels. It asks what evidence was available at each stage, which cosmological possibilities remained live, what terms such as 'demonstration' and 'hypothesis' meant in context, who had standing to interpret different kinds of claims, what institutional power could constrain, and what remained unresolved. The point is not to relativize truth into power. It is to prevent evidential support, semantic change, epistemic standing, interpretive jurisdiction, and coercive authority from being collapsed into one undifferentiated variable."
  ],
  milestones:[
    {
      milestoneId:"G-T0",label:"Inherited cosmological and institutional order",
      start:"1543",end:"1609",precision:"RANGE",
      narrative:"Copernican, Ptolemaic, Tychonic, Aristotelian, mathematical, natural-philosophical, and theological structures formed the inherited field before Galileo's telescopic intervention.",
      stateIds:["G0"],transitionIds:[],sourceIds:["GALILEO-SEP-NARRATIVE"],
      significance:"Establishes that Galileo entered an already plural and institutionally structured inquiry."
    },
    {
      milestoneId:"G-T1",label:"Telescope, Moon, Jupiter, and the new evidential field",
      start:"1609",end:"1610",precision:"RANGE",
      narrative:"Galileo improved the telescope, observed the Moon and Jupiter's satellites, and published Sidereus Nuncius in March 1610; the new observations pressured inherited celestial assumptions and changed the standing of instrument-mediated evidence.",
      stateIds:["G1"],transitionIds:["G0-G1"],sourceIds:["LOC-STARRY-MESSENGER","NASA-JUPITER-MOONS"],
      significance:"New evidence changes the theory space, but instrument reliability and interpretation remain part of the inquiry."
    },
    {
      milestoneId:"G-T2",label:"Venus phases and widening Copernican support",
      start:"1610",end:"1613",precision:"RANGE",
      narrative:"Galileo observed the phases of Venus and continued telescopic work; such evidence undermined older Ptolemaic arrangements and increased the plausibility of Sun-centered orbital relations without uniquely selecting every part of the Copernican system.",
      stateIds:["G1"],transitionIds:[],sourceIds:["NASA-VENUS-PHASES","GALILEO-SEP-NARRATIVE"],
      significance:"Shows strong evidential constraint without complete system determination."
    },
    {
      milestoneId:"G-T3",label:"Interpretation, demonstration, and jurisdiction",
      start:"1613",end:"1616",precision:"RANGE",
      narrative:"Galileo's Copernican advocacy expanded into arguments about scriptural interpretation and standards of demonstration; in 1616 Copernicus's work was suspended pending correction and Bellarmine admonished Galileo not to hold or defend Copernican doctrine.",
      stateIds:["G2"],transitionIds:["G1-G2"],sourceIds:["GALILEO-SEP-NARRATIVE"],
      significance:"The inquiry expands from evidence alone into meaning, standing, interpretive jurisdiction, and institutional authority."
    },
    {
      milestoneId:"G-T4",label:"Dialogue, trial, and condemnation",
      start:"1632",end:"1633",precision:"RANGE",
      narrative:"Galileo published the Dialogue in 1632; the Inquisition proceedings of 1633 ended in condemnation and house arrest, changing his practical freedom while leaving the epistemic question distinct from the legal settlement.",
      stateIds:["G3"],transitionIds:["G2-G3"],sourceIds:["GALILEO-SEP-NARRATIVE"],
      significance:"Makes the divergence between coercive institutional power and epistemic demonstration explicit."
    }
  ],
  apertures:[
    {
      chapterId:"CH1-DUHEM-QUINE",sectionIds:["CH1.4"],
      title:"Evidence without a single automatic theory verdict",
      chapterQuestion:"What did Galileo's new evidence constrain, and what did it still leave open?",
      currentFocus:"Inspect how telescopic observations altered the viable theory space without by themselves uniquely demonstrating the entire Copernican system.",
      wholeInquiryConnection:"This aperture sits inside a larger history in which instrument standing, alternative cosmologies, and later institutional disputes all matter to what the evidence could responsibly license.",
      whatFspAdds:["separates observed result from complete system choice","tracks which alternatives lose or retain standing","keeps evidential support distinct from institutional outcome"],
      returnPrompt:"Return to the whole narrative and ask what was actually established by 1610–1613 before reading later outcomes backward into the evidence."
    },
    {
      chapterId:"CH2-KUHN-MEANING",sectionIds:["CH2.4","CH2.8"],
      title:"Meaning change and historical translation",
      chapterQuestion:"How do terms such as demonstration, hypothesis, heavens, motion, and authority change role across the controversy?",
      currentFocus:"Compare inherited meanings with the altered inferential and institutional roles those terms acquire as telescopic evidence and Copernican advocacy develop.",
      wholeInquiryConnection:"The narrative shows that semantic change is not merely vocabulary replacement; it changes what counts as a licensed claim, a physical explanation, or an appropriate interpretive authority.",
      whatFspAdds:["marks concept versions instead of assuming same-word identity","preserves historical translation remainder","separates formation and institutional sedimentation from justification"],
      returnPrompt:"Return to the narrative and notice where a familiar word carries a different task or authority relation at a later stage."
    },
    {
      chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionIds:["CH3.2","CH3.7","CH3.8"],
      title:"Controlled possibilities over evidence and standing",
      chapterQuestion:"What can we vary analytically while holding Galileo's actual evidence fixed?",
      currentFocus:"Use controlled probes to compare cosmological accommodations or standing/jurisdiction arrangements without rewriting the historical record.",
      wholeInquiryConnection:"The historical spine supplies the evidence and institutional constraints; the probe lets us isolate one dependency at a time while preserving the distinction between counterfactual possibility and historical actuality.",
      whatFspAdds:["makes hold-fixed/vary structure explicit","permits standing and theory-space perturbations without turning them into history","keeps probe consequences bounded by the historical case"],
      returnPrompt:"Return to the dated inquiry and identify which relationships were historical and which were introduced only for controlled analysis."
    },
    {
      chapterId:"CH4-DIACHRONIC-FORMALISM",sectionIds:["CH4.1","CH4.2","CH4.3","CH4.4","CH4.7","CH4.10","CH4.11","CH4.12"],
      title:"Coupled change through time",
      chapterQuestion:"Can one formalism track evidence, meaning, standing, and power together without collapsing them into one variable?",
      currentFocus:"Follow G0→G3 as different dimensions change at different rates: observations gain standing, meanings shift, jurisdiction becomes explicit, and institutional power constrains action.",
      wholeInquiryConnection:"The formal state sequence is anchored to the dated Galileo narrative, but neither the state labels nor a transition vector are identical with the historical episode.",
      whatFspAdds:["keeps evidential, semantic, standing, and power dimensions distinct","shows when the inquiry problem itself widens","preserves claim ceilings and unresolved remainder across institutional change"],
      returnPrompt:"Return from the formal sequence to the continuous narrative and ask which coupled relationships became clearer—and which historical texture the formalization still leaves out."
    }
  ],
  sources:[
    {sourceId:"GALILEO-SEP-NARRATIVE",title:"Galileo Galilei — Stanford Encyclopedia of Philosophy",url:"https://plato.stanford.edu/entries/galileo/",supports:["telescopic and Copernican trajectory","1613–1616 interpretive dispute","1616 admonition and censorship context","1632 Dialogue","1633 trial and condemnation","historical complexity of jurisdiction and politics"]},
    {sourceId:"LOC-STARRY-MESSENGER",title:"Galileo and the Telescope / The Starry Messenger — Library of Congress",url:"https://www.loc.gov/collections/finding-our-place-in-the-cosmos-with-carl-sagan/articles-and-essays/modeling-the-cosmos/galileo-and-the-telescope",supports:["1609–1610 telescope work","Moon observations","Jupiter satellites","March 1610 Sidereus Nuncius","instrument-mediated evidence"]},
    {sourceId:"NASA-JUPITER-MOONS",title:"Galileo Discovers Jupiter's Moons — NASA",url:"https://www.nasa.gov/general/415-years-ago-astronomer-galileo-discovers-jupiters-moons/",supports:["January 1610 Jupiter observations","four satellites","support for Copernican theory"]},
    {sourceId:"NASA-VENUS-PHASES",title:"Galileo's Phases of Venus and Other Planets — NASA Science",url:"https://science.nasa.gov/resource/galileos-phases-of-venus-and-other-planets/",supports:["1610 Venus phases","evidence for Venus orbiting the Sun","pressure on older geocentric arrangements"]}
  ],
  contextPrompts:{
    whole:"What is the whole Galileo inquiry problem, and which scientific, semantic, interpretive, and institutional threads are active?",
    temporal:"Where are we historically, and which observations, arguments, warnings, permissions, or later outcomes are not yet available?",
    local:"Which dimension of the larger Galileo problem are we isolating right now?",
    fsp:"What is FSP helping us keep distinct here—evidence, meaning, standing, jurisdiction, power, possibility, or claim ceiling?"
  },
  returnPolicy:{
    localReturn:"Return to the exact chapter sentence or local inspection origin.",
    wholeInquiryReturn:"Return to the Galileo narrative spine with the relevant milestone, active dimensions, and chapter aperture restored.",
    rule:"Every Galileo inspection must support exact local return and recovery of the coupled whole-inquiry context."
  },
  firewalls:[
    "Formal state order is anchored in historical time but is not identical with calendar time.",
    "Telescopic evidence constrains cosmological possibilities without by itself uniquely demonstrating the entire Copernican system.",
    "Instrument standing ≠ automatic theory finality.",
    "Interpretive jurisdiction ≠ epistemic truth.",
    "Institutional condemnation ≠ empirical demonstration.",
    "Power can constrain inquiry conditions without becoming identical to evidential warrant.",
    "Probe possibility ≠ historical actuality.",
    "Historical chronology ≠ canonical state identity.",
    "Whole-inquiry recovery complements rather than replaces exact Authorial Return."
  ]
};


export const NEWTON_EINSTEIN_NARRATIVE:InquiryNarrativeSpine={
  caseId:"NEWTON-EINSTEIN",
  title:"Newton to Einstein: Conceptual Transformation with Preserved Bounded Success",
  orientingQuestion:"How can a later scientific framework reorganize space, time, motion, gravity, and explanation while still preserving much of an earlier framework's empirical success in bounded regimes?",
  whyWholeStoryMatters:"Newton→Einstein is a test of whether the narrative-spine architecture can represent scientific change without forcing a choice between two misleading pictures: complete continuity, as if the same concepts simply received better numerical values, or complete replacement, as if Newtonian mechanics became irrational or useless after relativity. The history contains both deep conceptual reorganization and structured preservation. FSP is useful here only if it can track meaning change, framework change, limiting relations, controlled thought experiments, empirical discrimination, and residual usefulness without collapsing them into either sameness or total incomparability.",
  narrativeParagraphs:[
    "Newtonian mechanics and gravitation became extraordinarily successful because they provided a unified mathematical framework for terrestrial and celestial motion. Within that framework, bodies move in space and time according to laws connecting force, mass, acceleration, and gravitation. Over centuries, this framework accumulated immense predictive and engineering success. That success matters historically because the Einsteinian transition did not begin from a failed or worthless science; it began from one of the most powerful frameworks physics had produced.",
    "By the late nineteenth century, however, classical mechanics had to coexist with increasingly important electromagnetic and optical structures that did not fit comfortably with an unchanged Newtonian account of space, time, and motion. Einstein's 1905 special theory of relativity reorganized the kinematics of inertial physics around the relativity principle and the invariant role of light propagation. Spatially separated simultaneity was no longer an observer-independent relation in the Newtonian sense. Space and time did not merely receive corrected measurements; their inferential roles changed.",
    "Yet special relativity did not solve gravitation. Newton's gravitational theory still worked extremely well across ordinary terrestrial and solar-system conditions, while special relativity supplied a new framework only where gravity was excluded. The resulting problem was therefore not 'Newton was simply wrong.' It was how to preserve the earlier theory's extraordinary bounded successes while constructing a relativistically coherent account of gravitation.",
    "Einstein's equivalence-principle reasoning supplied a crucial bridge. A freely falling observer can, within a sufficiently small region, describe local physics as if gravity were absent. This did not show that gravity and acceleration were globally identical. Tidal effects and larger-scale structure remained. The bridge was powerful precisely because it was bounded: local equivalence opened a new route toward gravitation while carrying its own remainder and claim ceiling.",
    "By 1915, general relativity represented gravitation through dynamical spacetime geometry rather than an unchanged Newtonian force acting within a fixed background of space and time. Einstein's account reproduced Mercury's anomalous perihelion advance, and later observations—including early light-deflection tests—helped establish the new framework. But general relativity did not erase Newtonian mechanics. In weak gravitational fields, at low velocities, and where relativistic corrections are negligible, Newtonian calculations remain extraordinarily accurate and useful.",
    "The philosophical challenge is therefore double. Terms such as time, simultaneity, inertia, mass, gravity, and spacetime do not simply preserve identical theoretical roles across the transition. But the theories are not therefore sealed into incomparable worlds. Approximation relations, shared empirical tasks, mathematical limiting behavior, instrument practices, and overlapping predictions make disciplined comparison possible. FSP represents the transition diachronically so that conceptual discontinuity, preserved structure, empirical gain, and residual usefulness can all be visible at once."
  ],
  milestones:[
    {
      milestoneId:"RE-T0",label:"Newtonian mechanics and gravitation become the classical framework",
      start:"1687",end:"1905",precision:"RANGE",
      narrative:"From the publication of Newton's Principia onward, classical mechanics and gravitation develop into a highly successful framework for terrestrial and celestial prediction.",
      stateIds:["RE0"],transitionIds:[],sourceIds:["SEP-SPACETIME-NARRATIVE","EO-NEWTON-EINSTEIN"],
      significance:"Establishes the depth of the earlier framework's empirical and practical standing; later change must explain preservation as well as rejection."
    },
    {
      milestoneId:"RE-T1",label:"Special relativity reorganizes space-time kinematics",
      start:"1905",precision:"YEAR",
      narrative:"Special relativity introduces a new inertial framework in which simultaneity and temporal-spatial relations depend on frame and synchronization structure, while gravity remains outside the theory's full scope.",
      stateIds:["RE1"],transitionIds:["RE0-RE1"],sourceIds:["EO-SPECIAL-RELATIVITY","SEP-SPACETIME-NARRATIVE"],
      significance:"Deep conceptual change occurs without erasing the bounded empirical success of Newtonian mechanics."
    },
    {
      milestoneId:"RE-T2",label:"Equivalence-principle bridge toward gravitation",
      start:"1907",end:"1911",precision:"RANGE",
      narrative:"Einstein develops the equivalence-principle route: sufficiently local freely falling descriptions recover gravity-free special-relativistic physics, while tidal and global effects remain unresolved.",
      stateIds:["RE2"],transitionIds:["RE1-RE2"],sourceIds:["EO-EQUIVALENCE"],
      significance:"A controlled local equivalence creates a bridge without licensing global identity."
    },
    {
      milestoneId:"RE-T3",label:"General relativity and Mercury's perihelion",
      start:"1915",precision:"YEAR",
      narrative:"General relativity supplies a new gravitational framework and accounts for Mercury's anomalous perihelion advance without retaining Newtonian gravitation as universally fundamental.",
      stateIds:["RE3"],transitionIds:["RE2-RE3"],sourceIds:["EO-NEWTON-EINSTEIN","EO-GR-TESTS"],
      significance:"A changed framework gains explanatory standing while preserving Newtonian accuracy in appropriate limiting regimes."
    },
    {
      milestoneId:"RE-T4",label:"Early observational testing and framework stabilization",
      start:"1919",end:"PRESENT",precision:"ERA",
      narrative:"Light-deflection observations and a widening range of later tests support general relativity, while Newtonian mechanics continues to function as a highly effective approximation across everyday and many astronomical tasks.",
      stateIds:["RE3"],transitionIds:[],sourceIds:["EO-GR-TESTS","EO-TEST-BED"],
      significance:"Later empirical success strengthens the new framework without turning historical replacement into total practical erasure."
    }
  ],
  apertures:[
    {
      chapterId:"CH1-DUHEM-QUINE",sectionIds:["CH1.5"],
      title:"Revision pressure without retrospective inevitability",
      chapterQuestion:"When classical structures encounter incompatibilities or anomalies, what should be revised—and what does later success fail to prove about what was rationally mandatory earlier?",
      currentFocus:"Treat Newtonian mechanics as a highly successful conjunction of claims, background assumptions, and domain conditions rather than as one isolated proposition that relativity simply falsifies.",
      wholeInquiryConnection:"The whole history shows that revision pressure can accumulate while an earlier framework remains strongly warranted within many tasks.",
      whatFspAdds:["separates framework-wide pressure from local empirical failure","tracks what is preserved as revision deepens","blocks the inference that later success made one earlier revision path logically mandatory"],
      returnPrompt:"Return to the whole narrative and ask which Newtonian commitments were under pressure at each stage and which remained evidentially secure."
    },
    {
      chapterId:"CH2-KUHN-MEANING",sectionIds:["CH2.2","CH2.3","CH2.5","CH2.7","CH2.9"],
      title:"Meaning change with translation and remainder",
      chapterQuestion:"How can time, simultaneity, mass, inertia, space, and gravity change theoretical role while comparison across frameworks remains possible?",
      currentFocus:"Track semantic versions and inferential roles rather than assuming either same-word identity or total untranslatability.",
      wholeInquiryConnection:"The transition reorganizes a network of concepts, yet shared problems, limiting relations, measurements, and mathematical correspondences preserve disciplined cross-framework comparison.",
      whatFspAdds:["marks semantic-version differences","records translation relations and translation remainder","distinguishes conceptual discontinuity from total empirical incomparability"],
      returnPrompt:"Return to the whole narrative and identify one concept that changed role and one predictive or operational relation that survived."
    },
    {
      chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionIds:["CH3.5","CH3.6"],
      title:"Controlled revision through frames and elevators",
      chapterQuestion:"How do thought experiments expose conceptual dependencies without becoming evidence-free replacements for empirical inquiry?",
      currentFocus:"Use simultaneity and elevator probes to vary frame or local gravitational description while holding explicit constraints fixed.",
      wholeInquiryConnection:"The probes operate inside the historical development from special to general relativity; they clarify dependency structures but do not by themselves establish the final gravitational theory.",
      whatFspAdds:["makes hold-fixed/vary structure explicit","marks locality and tidal remainder","separates conceptual possibility, licensed inference, and later empirical standing"],
      returnPrompt:"Return to the historical sequence and distinguish what the thought experiment clarified from what still required mathematical development and observational test."
    },
    {
      chapterId:"CH4-DIACHRONIC-FORMALISM",sectionIds:["CH4.1","CH4.2","CH4.5","CH4.8","CH4.9","CH4.10","CH4.11","CH4.12"],
      title:"Change plus preservation across frameworks",
      chapterQuestion:"Can a diachronic formalism represent conceptual reorganization while also preserving limiting relations, inherited successes, and unresolved remainder?",
      currentFocus:"Follow RE0→RE3 while tracking changed meanings, ontology, warrants, framework, and claim ceilings alongside preserved low-velocity, weak-field, and local structures.",
      wholeInquiryConnection:"The formal sequence must neither redescribe Newton as secretly Einsteinian nor portray Einstein as making Newtonian success unintelligible.",
      whatFspAdds:["tracks gain/loss/preservation separately","represents local and limiting equivalence without global identity","keeps empirical continuity and conceptual discontinuity simultaneously inspectable"],
      returnPrompt:"Return to the continuous narrative and ask which parts of Newtonian practice were rejected, reinterpreted, approximated, or preserved."
    }
  ],
  sources:[
    {sourceId:"SEP-SPACETIME-NARRATIVE",title:"Absolute and Relational Space and Motion: Post-Newtonian Theories — Stanford Encyclopedia of Philosophy",url:"https://plato.stanford.edu/entries/spacetime-theories/",supports:["Newtonian and relativistic spacetime comparison","conceptual transformation of space and time"]},
    {sourceId:"EO-SPECIAL-RELATIVITY",title:"Special Relativity — Einstein Online",url:"https://www.einstein-online.info/en/explandict/special-relativity/",supports:["special relativity as a theory of space time and motion excluding gravity","relativistic framework context"]},
    {sourceId:"EO-EQUIVALENCE",title:"The Elevator, the Rocket, and Gravity: The Equivalence Principle — Einstein Online",url:"https://www.einstein-online.info/en/spotlight/equivalence_principle/",supports:["1905 special-relativity background","equivalence-principle bridge","locality restriction","path toward general relativity"]},
    {sourceId:"EO-NEWTON-EINSTEIN",title:"Step by Step from Newton to Einstein — Einstein Online",url:"https://www.einstein-online.info/en/spotlight/postnewton/",supports:["Newtonian weak-field success","Mercury discrepancy","transition to Einsteinian gravitation"]},
    {sourceId:"EO-GR-TESTS",title:"Classical Tests of General Relativity — Einstein Online",url:"https://www.einstein-online.info/en/explandict/tests-of-general-relativity-classical/",supports:["Mercury perihelion","light deflection","classical empirical tests"]},
    {sourceId:"EO-TEST-BED",title:"A Test Bed for the General Theory of Relativity — Einstein Online",url:"https://www.einstein-online.info/en/spotlight/A-Test-Bed-for-the-General-Theory-of-Relativity/",supports:["1919 light-deflection measurements","later empirical testing of general relativity"]}
  ],
  contextPrompts:{
    whole:"What is changing across the Newton→Einstein inquiry, and what earlier successes still have to be recovered or explained?",
    temporal:"Where are we historically, and which later relativistic concepts or empirical successes are not yet available at this stage?",
    local:"Are we currently inspecting a conceptual change, a controlled probe, an empirical test, a limiting relation, or a framework transition?",
    fsp:"What is FSP helping us separate here—semantic change, empirical preservation, local equivalence, framework revision, or translation remainder?"
  },
  returnPolicy:{
    localReturn:"Return to the exact chapter sentence or local inspection origin.",
    wholeInquiryReturn:"Return to the Newton→Einstein narrative spine with the relevant milestone, changed concepts, and preserved structures restored.",
    rule:"Every Newton→Einstein inspection must support exact local return and recovery of both what changed and what remained valid in bounded regimes."
  },
  firewalls:[
    "Formal state order is anchored in historical time but is not identical with calendar time.",
    "Later theory ≠ simple deletion of earlier theory.",
    "Preserved empirical success ≠ unchanged conceptual meaning.",
    "Same term ≠ same inferential role.",
    "Conceptual discontinuity ≠ total incomparability.",
    "Approximation or limiting recovery ≠ global theoretical identity.",
    "Local equivalence ≠ global ontological identity.",
    "Thought-experiment insight ≠ empirical confirmation.",
    "Historical chronology ≠ canonical state identity.",
    "Whole-inquiry recovery complements rather than replaces exact Authorial Return."
  ]
};

export const INQUIRY_NARRATIVES:Record<string,InquiryNarrativeSpine>={
  "NEPTUNE-VULCAN":NEPTUNE_VULCAN_NARRATIVE,
  "GALILEO-COPERNICAN":GALILEO_NARRATIVE,
  "NEWTON-EINSTEIN":NEWTON_EINSTEIN_NARRATIVE
};

export function narrativeForCase(caseId:string):InquiryNarrativeSpine{
  const spine=INQUIRY_NARRATIVES[caseId];
  if(!spine) throw new Error(`no narrative spine yet for case: ${caseId}`);
  return structuredClone(spine);
}

export function apertureForChapter(caseId:string,chapterId:ChapterId):ChapterAperture{
  const spine=narrativeForCase(caseId);
  const a=spine.apertures.find(x=>x.chapterId===chapterId);
  if(!a) throw new Error(`no aperture for chapter: ${chapterId}`);
  return structuredClone(a);
}

export function milestoneForState(caseId:string,stateId:string):InquiryMilestone[]{
  const spine=narrativeForCase(caseId);
  return spine.milestones.filter(m=>m.stateIds.includes(stateId)).map(m=>structuredClone(m));
}

export function recoverInquiryContext(args:{
  caseId:string;
  chapterId?:ChapterId;
  sectionId?:string;
  stateId?:string;
}):InquiryContextRecovery{
  const spine=narrativeForCase(args.caseId);
  const aperture=args.chapterId ? apertureForChapter(args.caseId,args.chapterId) : undefined;
  const milestones=args.stateId ? milestoneForState(args.caseId,args.stateId) : [];
  return {
    caseId:args.caseId,
    chapterId:args.chapterId,
    sectionId:args.sectionId,
    wholeProblem:spine.orientingQuestion,
    temporalLocation:milestones.length ? milestones.map(m=>`${m.label} (${m.start}${m.end?`–${m.end}`:""})`).join("; ") : "Use the full dated narrative timeline.",
    localProblem:aperture?.currentFocus ?? "Recover the whole inquiry before entering a local aperture.",
    fspContribution:aperture?.whatFspAdds.join(" · ") ?? "FSP separates historical chronology, inquiry states, evidence, revision targets, probes, and claim ceilings.",
    wholeInquiryHref:`#/narrative/${args.caseId}`,
    localHref:args.sectionId ? `#/reader/${args.sectionId}/${args.caseId}` : undefined
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
