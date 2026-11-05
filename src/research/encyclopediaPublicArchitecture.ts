import { CanonicalCaseDossier } from "./fiveCaseAtlas";
import { CHAPTER_SECTIONS, ChapterId } from "./encyclopediaNavigation";

export type PublicObjectKind =
  | "HOME"
  | "CHAPTER"
  | "CASE"
  | "CONCEPT"
  | "TOOL"
  | "SOURCES"
  | "COMPARISON";

export type ReaderDepth = "READ" | "INSPECT" | "FORMAL";

export interface PublicChapter {
  chapterId:ChapterId;
  ordinal:number;
  title:string;
  publicQuestion:string;
  publicPromise:string;
  sectionIds:string[];
  featuredCaseIds:string[];
  conceptIds:string[];
  toolIds:string[];
}

export interface PublicCase {
  caseId:string;
  shortTitle:string;
  publicQuestion:string;
  whyItMatters:string;
  chapterIds:ChapterId[];
  conceptIds:string[];
  toolIds:string[];
}

export interface PublicConcept {
  conceptId:string;
  title:string;
  shortDefinition:string;
  explains:string[];
  chapterIds:ChapterId[];
  caseIds:string[];
  relatedConceptIds:string[];
  toolIds:string[];
}

export interface PublicTool {
  toolId:string;
  title:string;
  publicPurpose:string;
  readerPrompt:string;
  chapterIds:ChapterId[];
  caseIds:string[];
  conceptIds:string[];
  minimumDepth:ReaderDepth;
}

export interface PublicComparisonPath {
  comparisonId:string;
  title:string;
  publicQuestion:string;
  caseIds:string[];
  conceptIds:string[];
  toolIds:string[];
  chapterIds:ChapterId[];
  minimumDepth:ReaderDepth;
}

export interface ReaderDepthProfile {
  depth:ReaderDepth;
  label:string;
  promise:string;
  exposes:string[];
  hidesByDefault:string[];
}

export interface PublicReturnPolicy {
  originKinds:PublicObjectKind[];
  exactReturnRequiredFrom:PublicObjectKind[];
  preserves:string[];
  rule:string;
}

export interface PublicArchitecture {
  home:{
    title:string;
    subtitle:string;
    primaryEntrances:PublicObjectKind[];
    orientation:string[];
  };
  chapters:PublicChapter[];
  cases:PublicCase[];
  concepts:PublicConcept[];
  tools:PublicTool[];
  comparisons:PublicComparisonPath[];
  readerDepths:ReaderDepthProfile[];
  returnPolicy:PublicReturnPolicy;
  sourcePolicy:{
    principle:string;
    publicEntryPoints:string[];
    canonicalAuthority:string;
  };
  constitutionalRules:string[];
}

export interface PublicArchitectureValidation {
  failures:string[];
  passes:boolean;
}

export const PUBLIC_CHAPTERS:PublicChapter[]=[
  {
    chapterId:"CH1-DUHEM-QUINE",ordinal:1,
    title:"Duhem–Quine: Where Should Revision Pressure Go?",
    publicQuestion:"When a prediction fails, what exactly should change?",
    publicPromise:"See why failed predictions do not identify their own repair target.",
    sectionIds:["CH1.1","CH1.2","CH1.3","CH1.4","CH1.5"],
    featuredCaseIds:["NEPTUNE-VULCAN","FOUCAULT-LIGHT-SPEED","GALILEO-COPERNICAN","DESI-2024-2026"],
    conceptIds:["UNDERDETERMINATION","AUXILIARY-HYPOTHESIS","CLAIM-CEILING","REMAINDER"],
    toolIds:["REVISION-TARGET-AUDIT","PROVENANCE-AUDIT","CLAIM-CEILING-CHECK"]
  },
  {
    chapterId:"CH2-KUHN-MEANING",ordinal:2,
    title:"Kuhn and Meaning Change: When the Vocabulary Moves Too",
    publicQuestion:"What happens when theory change also changes what familiar terms mean?",
    publicPromise:"Track continuity, changed conceptual roles, and translation remainder without forcing either total sameness or total incommensurability.",
    sectionIds:["CH2.1","CH2.2","CH2.3","CH2.4","CH2.5","CH2.6","CH2.7","CH2.8"],
    featuredCaseIds:["NEWTON-EINSTEIN","GALILEO-COPERNICAN","FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","DESI-2024-2026"],
    conceptIds:["MEANING-CHANGE","REMAINDER","HISTORICAL-SEDIMENTATION","CLAIM-CEILING"],
    toolIds:["TRANSLATION-REMAINDER-AUDIT","TRANSITION-AUDIT","CLAIM-CEILING-CHECK"]
  },
  {
    chapterId:"CH3-THOUGHT-EXPERIMENTS",ordinal:3,
    title:"Thought Experiments as Controlled Revision Spaces",
    publicQuestion:"What can we learn by varying one commitment while holding others provisionally fixed?",
    publicPromise:"Use thought experiments and model-worlds as governed probes rather than free-floating imagination.",
    sectionIds:["CH3.1","CH3.2","CH3.3","CH3.4","CH3.5","CH3.6","CH3.7","CH3.8"],
    featuredCaseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN","NEPTUNE-VULCAN","FOUCAULT-LIGHT-SPEED","DESI-2024-2026"],
    conceptIds:["CONTROLLED-REVISION","PROVENANCE","REMAINDER","CLAIM-CEILING"],
    toolIds:["CONTROLLED-REVISION-PROBE","PROVENANCE-AUDIT","CLAIM-CEILING-CHECK"]
  },
  {
    chapterId:"CH4-DIACHRONIC-FORMALISM",ordinal:4,
    title:"FSP's Unified Diachronic Inquiry Formalism",
    publicQuestion:"Can changing scientific inquiries be compared without pretending they are historically identical?",
    publicPromise:"See the shared state/transition grammar, its comparative power, and its explicit limits.",
    sectionIds:["CH4.1","CH4.2","CH4.3","CH4.4","CH4.5","CH4.6","CH4.7","CH4.8","CH4.9","CH4.10","CH4.11","CH4.12"],
    featuredCaseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["DIACHRONIC-INQUIRY","STANDING","PROVENANCE","CLAIM-CEILING","REOPEN"],
    toolIds:["TRANSITION-AUDIT","DIACHRONIC-COMPARISON","STANDING-POWER-AUDIT","AUTHORIAL-RETURN"]
  }
];

export const PUBLIC_CASES:PublicCase[]=[
  {
    caseId:"FOUCAULT-LIGHT-SPEED",shortTitle:"Foucault and light speed",
    publicQuestion:"How much can a discriminating experiment actually establish?",
    whyItMatters:"It separates strong empirical discrimination from stronger claims of ontological uniqueness.",
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    conceptIds:["UNDERDETERMINATION","PROVENANCE","CLAIM-CEILING","MEANING-CHANGE"],
    toolIds:["PROVENANCE-AUDIT","TRANSITION-AUDIT","CLAIM-CEILING-CHECK"]
  },
  {
    caseId:"NEPTUNE-VULCAN",shortTitle:"Neptune and Vulcan",
    publicQuestion:"Why can the same repair strategy succeed once and fail later?",
    whyItMatters:"It blocks the temptation to turn one successful auxiliary repair into a universal revision rule.",
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    conceptIds:["UNDERDETERMINATION","AUXILIARY-HYPOTHESIS","CONTROLLED-REVISION","CLAIM-CEILING","REOPEN"],
    toolIds:["REVISION-TARGET-AUDIT","CONTROLLED-REVISION-PROBE","CLAIM-CEILING-CHECK"]
  },
  {
    caseId:"GALILEO-COPERNICAN",shortTitle:"Galileo and the Copernican controversy",
    publicQuestion:"How do evidence, interpretation, conceptual change, standing, and institutional power interact?",
    whyItMatters:"It prevents epistemic reconstruction from treating authority, evidence, and historical meaning as one undifferentiated variable.",
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    conceptIds:["MEANING-CHANGE","STANDING","HISTORICAL-SEDIMENTATION","PROVENANCE","REMAINDER"],
    toolIds:["STANDING-POWER-AUDIT","TRANSLATION-REMAINDER-AUDIT","PROVENANCE-AUDIT"]
  },
  {
    caseId:"NEWTON-EINSTEIN",shortTitle:"Newton to Einstein",
    publicQuestion:"How can a later framework transform concepts while preserving bounded earlier successes?",
    whyItMatters:"It makes continuity and conceptual reconstruction visible at the same time.",
    chapterIds:["CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    conceptIds:["MEANING-CHANGE","CONTROLLED-REVISION","HISTORICAL-SEDIMENTATION","REMAINDER"],
    toolIds:["TRANSLATION-REMAINDER-AUDIT","CONTROLLED-REVISION-PROBE","TRANSITION-AUDIT"]
  },
  {
    caseId:"DESI-2024-2026",shortTitle:"DESI 2024–2026",
    publicQuestion:"What does governed inquiry look like while the evidential frontier is still moving?",
    whyItMatters:"It tests the architecture on a live scientific record where claim ceilings and REOPEN conditions remain active.",
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    conceptIds:["PROVENANCE","CLAIM-CEILING","REOPEN","DIACHRONIC-INQUIRY","REMAINDER"],
    toolIds:["PROVENANCE-AUDIT","DIACHRONIC-COMPARISON","CLAIM-CEILING-CHECK"]
  }
];

export const PUBLIC_CONCEPTS:PublicConcept[]=[
  {
    conceptId:"UNDERDETERMINATION",title:"Underdetermination",
    shortDefinition:"Evidence can constrain inquiry strongly without uniquely naming which commitment must change.",
    explains:["why anomaly does not equal culprit","why multiple revisions can remain live"],
    chapterIds:["CH1-DUHEM-QUINE","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","DESI-2024-2026"],
    relatedConceptIds:["AUXILIARY-HYPOTHESIS","CLAIM-CEILING","REMAINDER"],
    toolIds:["REVISION-TARGET-AUDIT","CLAIM-CEILING-CHECK"]
  },
  {
    conceptId:"AUXILIARY-HYPOTHESIS",title:"Auxiliary hypothesis",
    shortDefinition:"A supporting commitment that helps connect a broader framework to a particular prediction or test.",
    explains:["why frameworks are tested in articulated systems","why local repair can be rational without being mandatory"],
    chapterIds:["CH1-DUHEM-QUINE","CH3-THOUGHT-EXPERIMENTS"],
    caseIds:["NEPTUNE-VULCAN","FOUCAULT-LIGHT-SPEED"],
    relatedConceptIds:["UNDERDETERMINATION","CONTROLLED-REVISION"],
    toolIds:["REVISION-TARGET-AUDIT","CONTROLLED-REVISION-PROBE"]
  },
  {
    conceptId:"MEANING-CHANGE",title:"Meaning change",
    shortDefinition:"A concept can retain a word while changing its inferential, theoretical, or practical role.",
    explains:["why translation across frameworks can be partial","why same word does not guarantee same concept"],
    chapterIds:["CH2-KUHN-MEANING","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["NEWTON-EINSTEIN","GALILEO-COPERNICAN","FOUCAULT-LIGHT-SPEED","DESI-2024-2026"],
    relatedConceptIds:["HISTORICAL-SEDIMENTATION","REMAINDER"],
    toolIds:["TRANSLATION-REMAINDER-AUDIT","TRANSITION-AUDIT"]
  },
  {
    conceptId:"CONTROLLED-REVISION",title:"Controlled revision",
    shortDefinition:"A bounded probe that varies selected commitments while keeping other constraints explicit.",
    explains:["what thought experiments do in FSP","why counterfactual exploration is not historical evidence"],
    chapterIds:["CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    relatedConceptIds:["PROVENANCE","CLAIM-CEILING","REMAINDER"],
    toolIds:["CONTROLLED-REVISION-PROBE"]
  },
  {
    conceptId:"PROVENANCE",title:"Provenance",
    shortDefinition:"The traceable relation between a represented claim and the source or evidence that supports it.",
    explains:["where a claim comes from","which part of a reconstruction is sourced versus interpretive"],
    chapterIds:["CH1-DUHEM-QUINE","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    relatedConceptIds:["CLAIM-CEILING","REMAINDER"],
    toolIds:["PROVENANCE-AUDIT"]
  },
  {
    conceptId:"STANDING",title:"Standing",
    shortDefinition:"The context-sensitive authority, credibility, or role a claim, person, method, or institution has within an inquiry.",
    explains:["why evidence and authority are not the same","how participation and institutional position can affect inquiry without settling truth"],
    chapterIds:["CH1-DUHEM-QUINE","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["GALILEO-COPERNICAN","DESI-2024-2026"],
    relatedConceptIds:["PROVENANCE","HISTORICAL-SEDIMENTATION"],
    toolIds:["STANDING-POWER-AUDIT"]
  },
  {
    conceptId:"HISTORICAL-SEDIMENTATION",title:"Historical sedimentation",
    shortDefinition:"Concepts, practices, and institutions can persist through time and carry earlier structures forward without that persistence itself justifying them.",
    explains:["how inherited structures remain active","why formation is not justification"],
    chapterIds:["CH2-KUHN-MEANING","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN"],
    relatedConceptIds:["MEANING-CHANGE","STANDING"],
    toolIds:["TRANSLATION-REMAINDER-AUDIT","TRANSITION-AUDIT"]
  },
  {
    conceptId:"REMAINDER",title:"Remainder",
    shortDefinition:"What a successful translation, model, explanation, or local equivalence still leaves unresolved.",
    explains:["why bounded success need not become identity","how unresolved structure remains visible"],
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    relatedConceptIds:["CLAIM-CEILING","REOPEN"],
    toolIds:["TRANSLATION-REMAINDER-AUDIT","CLAIM-CEILING-CHECK"]
  },
  {
    conceptId:"CLAIM-CEILING",title:"Claim ceiling",
    shortDefinition:"The strongest conclusion the current evidence and reconstruction license without illicit strengthening.",
    explains:["where inference should stop","why evidence can be strong without becoming ontology"],
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    relatedConceptIds:["PROVENANCE","REMAINDER","REOPEN"],
    toolIds:["CLAIM-CEILING-CHECK"]
  },
  {
    conceptId:"REOPEN",title:"REOPEN",
    shortDefinition:"An explicit condition under which a provisional settlement should be reconsidered.",
    explains:["how closure remains revisable","what future evidence or failure would reopen judgment"],
    chapterIds:["CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    relatedConceptIds:["CLAIM-CEILING","REMAINDER","DIACHRONIC-INQUIRY"],
    toolIds:["CLAIM-CEILING-CHECK","AUTHORIAL-RETURN"]
  },
  {
    conceptId:"DIACHRONIC-INQUIRY",title:"Diachronic inquiry",
    shortDefinition:"Inquiry represented as changing states, transitions, inherited commitments, gains, losses, and reopening conditions through time.",
    explains:["why snapshots miss revision structure","how different cases can be compared without being collapsed"],
    chapterIds:["CH4-DIACHRONIC-FORMALISM"],
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    relatedConceptIds:["REOPEN","HISTORICAL-SEDIMENTATION","REMAINDER"],
    toolIds:["TRANSITION-AUDIT","DIACHRONIC-COMPARISON"]
  }
];

export const PUBLIC_TOOLS:PublicTool[]=[
  {
    toolId:"REVISION-TARGET-AUDIT",title:"Revision-target audit",
    publicPurpose:"Identify which commitments are under pressure without assuming the anomaly already identifies its culprit.",
    readerPrompt:"What could change here, and what reason favors one revision target over another?",
    chapterIds:["CH1-DUHEM-QUINE"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","DESI-2024-2026"],
    conceptIds:["UNDERDETERMINATION","AUXILIARY-HYPOTHESIS"],minimumDepth:"INSPECT"
  },
  {
    toolId:"TRANSITION-AUDIT",title:"Transition audit",
    publicPurpose:"Separate what changed from what was preserved, gained, rejected, or left unresolved.",
    readerPrompt:"What exactly changed between these inquiry states?",
    chapterIds:["CH2-KUHN-MEANING","CH4-DIACHRONIC-FORMALISM"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["MEANING-CHANGE","DIACHRONIC-INQUIRY","REMAINDER"],minimumDepth:"INSPECT"
  },
  {
    toolId:"CONTROLLED-REVISION-PROBE",title:"Controlled-revision probe",
    publicPurpose:"Explore a bounded counterfactual while explicitly marking what is held fixed and what is varied.",
    readerPrompt:"What happens if this commitment changes while these constraints remain fixed?",
    chapterIds:["CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["CONTROLLED-REVISION","REMAINDER","CLAIM-CEILING"],minimumDepth:"INSPECT"
  },
  {
    toolId:"PROVENANCE-AUDIT",title:"Provenance audit",
    publicPurpose:"Trace a represented factual claim to its source and distinguish source support from interpretive reconstruction.",
    readerPrompt:"What supports this claim, and what part is reconstruction rather than quotation or observation?",
    chapterIds:["CH1-DUHEM-QUINE","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["PROVENANCE","CLAIM-CEILING"],minimumDepth:"INSPECT"
  },
  {
    toolId:"TRANSLATION-REMAINDER-AUDIT",title:"Translation-and-remainder audit",
    publicPurpose:"Compare concepts across frameworks while preserving both translation success and what the translation leaves out.",
    readerPrompt:"What carries across, what changes role, and what remainder resists translation?",
    chapterIds:["CH2-KUHN-MEANING","CH4-DIACHRONIC-FORMALISM"],caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN","FOUCAULT-LIGHT-SPEED"],
    conceptIds:["MEANING-CHANGE","HISTORICAL-SEDIMENTATION","REMAINDER"],minimumDepth:"INSPECT"
  },
  {
    toolId:"STANDING-POWER-AUDIT",title:"Standing and power audit",
    publicPurpose:"Keep epistemic support, social standing, institutional authority, and practical constraint distinguishable.",
    readerPrompt:"Who or what has standing here, by what route, and what can power change without proving?",
    chapterIds:["CH1-DUHEM-QUINE","CH4-DIACHRONIC-FORMALISM"],caseIds:["GALILEO-COPERNICAN","DESI-2024-2026"],
    conceptIds:["STANDING","PROVENANCE"],minimumDepth:"INSPECT"
  },
  {
    toolId:"CLAIM-CEILING-CHECK",title:"Claim-ceiling check",
    publicPurpose:"State the strongest currently licensed conclusion and explicitly block stronger inference.",
    readerPrompt:"What may we conclude now, what may we not infer, and what would require REOPEN?",
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["CLAIM-CEILING","REOPEN","REMAINDER"],minimumDepth:"READ"
  },
  {
    toolId:"DIACHRONIC-COMPARISON",title:"Diachronic comparison",
    publicPurpose:"Compare transition patterns across cases without treating shared representation as historical sameness.",
    readerPrompt:"Which dimensions change across these cases, and which differences remain case-native?",
    chapterIds:["CH4-DIACHRONIC-FORMALISM"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["DIACHRONIC-INQUIRY","REMAINDER"],minimumDepth:"FORMAL"
  },
  {
    toolId:"AUTHORIAL-RETURN",title:"Authorial return",
    publicPurpose:"Return from formal inspection to the exact narrative or inquiry context that made the inspection relevant.",
    readerPrompt:"What does the inspected structure now let me say more carefully in the original context?",
    chapterIds:["CH1-DUHEM-QUINE","CH2-KUHN-MEANING","CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["CLAIM-CEILING","REOPEN"],minimumDepth:"READ"
  }
];

export const PUBLIC_COMPARISONS:PublicComparisonPath[]=[
  {
    comparisonId:"REVISION-PRESSURE",title:"Where revision pressure goes",
    publicQuestion:"When an inquiry is strained, what determines whether we revise an auxiliary, interpretation, framework, or evidence weighting?",
    caseIds:["NEPTUNE-VULCAN","FOUCAULT-LIGHT-SPEED","DESI-2024-2026"],
    conceptIds:["UNDERDETERMINATION","AUXILIARY-HYPOTHESIS","CLAIM-CEILING"],
    toolIds:["REVISION-TARGET-AUDIT","CLAIM-CEILING-CHECK"],
    chapterIds:["CH1-DUHEM-QUINE","CH4-DIACHRONIC-FORMALISM"],minimumDepth:"INSPECT"
  },
  {
    comparisonId:"MEANING-ACROSS-FRAMEWORKS",title:"Meaning across frameworks",
    publicQuestion:"How can concepts change while inquiry still preserves enough structure for comparison?",
    caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN","FOUCAULT-LIGHT-SPEED"],
    conceptIds:["MEANING-CHANGE","HISTORICAL-SEDIMENTATION","REMAINDER"],
    toolIds:["TRANSLATION-REMAINDER-AUDIT","TRANSITION-AUDIT"],
    chapterIds:["CH2-KUHN-MEANING","CH4-DIACHRONIC-FORMALISM"],minimumDepth:"INSPECT"
  },
  {
    comparisonId:"CONTROLLED-PROBES",title:"Controlled revision across five cases",
    publicQuestion:"What becomes visible when one commitment is varied under explicit constraints?",
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["CONTROLLED-REVISION","PROVENANCE","REMAINDER"],
    toolIds:["CONTROLLED-REVISION-PROBE","PROVENANCE-AUDIT"],
    chapterIds:["CH3-THOUGHT-EXPERIMENTS","CH4-DIACHRONIC-FORMALISM"],minimumDepth:"INSPECT"
  },
  {
    comparisonId:"STANDING-AND-CONSTRAINT",title:"Standing, authority, and constraint",
    publicQuestion:"How can institutions and collaborative structures shape inquiry without automatically settling evidential questions?",
    caseIds:["GALILEO-COPERNICAN","DESI-2024-2026"],
    conceptIds:["STANDING","PROVENANCE","HISTORICAL-SEDIMENTATION"],
    toolIds:["STANDING-POWER-AUDIT","PROVENANCE-AUDIT"],
    chapterIds:["CH1-DUHEM-QUINE","CH4-DIACHRONIC-FORMALISM"],minimumDepth:"INSPECT"
  },
  {
    comparisonId:"FIVE-CASE-CEILINGS",title:"Five case-specific claim ceilings",
    publicQuestion:"How do strong but bounded conclusions differ across the five cases?",
    caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"],
    conceptIds:["CLAIM-CEILING","REOPEN","REMAINDER"],
    toolIds:["CLAIM-CEILING-CHECK","DIACHRONIC-COMPARISON"],
    chapterIds:["CH4-DIACHRONIC-FORMALISM"],minimumDepth:"READ"
  }
];

export const READER_DEPTHS:ReaderDepthProfile[]=[
  {
    depth:"READ",label:"Read",
    promise:"Follow the philosophical narrative and open brief explanations without learning the formal notation.",
    exposes:["prose","case cards","concept definitions","plain-language claim ceilings","return to reading"],
    hidesByDefault:["field codes","delta vectors","full source ledger mechanics","cross-case transition matrices"]
  },
  {
    depth:"INSPECT",label:"Inspect",
    promise:"Open the inquiry machinery behind the prose and follow states, transitions, probes, provenance, and bounded conclusions.",
    exposes:["everything in Read","state timelines","transition detail","controlled probes","source support","tool cards","comparison paths"],
    hidesByDefault:["raw formal field vectors","full cross-case formal matrices"]
  },
  {
    depth:"FORMAL",label:"Formal",
    promise:"Expose the shared FSP representation used to compare diachronic inquiry without treating the cases as identical.",
    exposes:["everything in Inspect","canonical field labels","transition dimensions","formal comparison rows","explicit invariants and claim ceilings"],
    hidesByDefault:[]
  }
];

export const PUBLIC_RETURN_POLICY:PublicReturnPolicy={
  originKinds:["HOME","CHAPTER","CASE","CONCEPT","TOOL","SOURCES","COMPARISON"],
  exactReturnRequiredFrom:["CHAPTER","CASE","CONCEPT","TOOL","COMPARISON"],
  preserves:["origin object","section or anchor when present","reader depth","comparison context when present","navigation history"],
  rule:"Inspection may deepen or broaden temporarily, but return must restore the reader's originating public context rather than substitute a generic home or chapter-top destination."
};

export const PUBLIC_ARCHITECTURE:PublicArchitecture={
  home:{
    title:"FSP Encyclopedia",
    subtitle:"A public reader for seeing how inquiry changes, how claims are licensed, and where judgment must remain open.",
    primaryEntrances:["CHAPTER","CASE","CONCEPT","TOOL","COMPARISON"],
    orientation:[
      "Read the four-chapter argument in sequence.",
      "Enter through a familiar scientific case.",
      "Look up a concept or inquiry tool.",
      "Compare one inquiry function across multiple cases."
    ]
  },
  chapters:PUBLIC_CHAPTERS,
  cases:PUBLIC_CASES,
  concepts:PUBLIC_CONCEPTS,
  tools:PUBLIC_TOOLS,
  comparisons:PUBLIC_COMPARISONS,
  readerDepths:READER_DEPTHS,
  returnPolicy:PUBLIC_RETURN_POLICY,
  sourcePolicy:{
    principle:"Public source views explain what a source supports; canonical source identity and support relations remain in the Atlas ledger.",
    publicEntryPoints:["case dossier","state","transition","probe context","concept explanation"],
    canonicalAuthority:"CanonicalCaseDossier.sourceLedger"
  },
  constitutionalRules:[
    "Public architecture indexes and explains canonical objects; it does not redefine Atlas field semantics.",
    "Chapter-to-Atlas semantic edges remain governed by encyclopediaNavigation.ts.",
    "Concept and tool links are explanatory overlays, not new evidence or historical claims.",
    "Reader depth changes presentation density, not canonical object identity or claim strength.",
    "Shared comparison grammar does not imply historical sameness.",
    "Counterfactual probe output remains distinct from sourced historical actuality.",
    "Every public path that deepens inspection preserves an authorial return route.",
    "No public presentation may exceed the applicable canonical claim ceiling."
  ]
};

function canonical(values:string[]):string[]{ return [...new Set(values)].sort(); }

export function validatePublicArchitecture(
  architecture:PublicArchitecture,
  dossiers:CanonicalCaseDossier[]
):PublicArchitectureValidation{
  const failures:string[]=[];
  const chapterIds=new Set(CHAPTER_SECTIONS.map(s=>s.chapterId));
  const sectionIds=new Set(CHAPTER_SECTIONS.map(s=>s.sectionId));
  const caseIds=new Set(dossiers.map(d=>d.caseId));
  const conceptIds=new Set(architecture.concepts.map(c=>c.conceptId));
  const toolIds=new Set(architecture.tools.map(t=>t.toolId));

  if(architecture.chapters.length!==4) failures.push("public-chapter-count");
  if(architecture.cases.length!==5) failures.push("public-case-count");
  if(new Set(architecture.readerDepths.map(d=>d.depth)).size!==3) failures.push("reader-depth-count");

  for(const chapter of architecture.chapters){
    if(!chapterIds.has(chapter.chapterId)) failures.push(`${chapter.chapterId}:unknown-chapter`);
    for(const sectionId of chapter.sectionIds){
      const canonicalSection=CHAPTER_SECTIONS.find(s=>s.sectionId===sectionId);
      if(!sectionIds.has(sectionId) || canonicalSection?.chapterId!==chapter.chapterId)
        failures.push(`${chapter.chapterId}:bad-section:${sectionId}`);
    }
    for(const caseId of chapter.featuredCaseIds) if(!caseIds.has(caseId)) failures.push(`${chapter.chapterId}:unknown-case:${caseId}`);
    for(const conceptId of chapter.conceptIds) if(!conceptIds.has(conceptId)) failures.push(`${chapter.chapterId}:unknown-concept:${conceptId}`);
    for(const toolId of chapter.toolIds) if(!toolIds.has(toolId)) failures.push(`${chapter.chapterId}:unknown-tool:${toolId}`);
  }

  for(const publicCase of architecture.cases){
    if(!caseIds.has(publicCase.caseId)) failures.push(`unknown-public-case:${publicCase.caseId}`);
    for(const chapterId of publicCase.chapterIds) if(!chapterIds.has(chapterId)) failures.push(`${publicCase.caseId}:unknown-chapter:${chapterId}`);
    for(const conceptId of publicCase.conceptIds) if(!conceptIds.has(conceptId)) failures.push(`${publicCase.caseId}:unknown-concept:${conceptId}`);
    for(const toolId of publicCase.toolIds) if(!toolIds.has(toolId)) failures.push(`${publicCase.caseId}:unknown-tool:${toolId}`);
  }

  for(const concept of architecture.concepts){
    for(const chapterId of concept.chapterIds) if(!chapterIds.has(chapterId)) failures.push(`${concept.conceptId}:unknown-chapter:${chapterId}`);
    for(const caseId of concept.caseIds) if(!caseIds.has(caseId)) failures.push(`${concept.conceptId}:unknown-case:${caseId}`);
    for(const relatedId of concept.relatedConceptIds) if(!conceptIds.has(relatedId)) failures.push(`${concept.conceptId}:unknown-related-concept:${relatedId}`);
    for(const toolId of concept.toolIds) if(!toolIds.has(toolId)) failures.push(`${concept.conceptId}:unknown-tool:${toolId}`);
  }

  for(const tool of architecture.tools){
    for(const chapterId of tool.chapterIds) if(!chapterIds.has(chapterId)) failures.push(`${tool.toolId}:unknown-chapter:${chapterId}`);
    for(const caseId of tool.caseIds) if(!caseIds.has(caseId)) failures.push(`${tool.toolId}:unknown-case:${caseId}`);
    for(const conceptId of tool.conceptIds) if(!conceptIds.has(conceptId)) failures.push(`${tool.toolId}:unknown-concept:${conceptId}`);
  }

  for(const comparison of architecture.comparisons){
    if(comparison.caseIds.length<2) failures.push(`${comparison.comparisonId}:comparison-too-small`);
    for(const chapterId of comparison.chapterIds) if(!chapterIds.has(chapterId)) failures.push(`${comparison.comparisonId}:unknown-chapter:${chapterId}`);
    for(const caseId of comparison.caseIds) if(!caseIds.has(caseId)) failures.push(`${comparison.comparisonId}:unknown-case:${caseId}`);
    for(const conceptId of comparison.conceptIds) if(!conceptIds.has(conceptId)) failures.push(`${comparison.comparisonId}:unknown-concept:${conceptId}`);
    for(const toolId of comparison.toolIds) if(!toolIds.has(toolId)) failures.push(`${comparison.comparisonId}:unknown-tool:${toolId}`);
  }

  for(const required of ["Chapter-to-Atlas semantic edges remain governed by encyclopediaNavigation.ts.","Reader depth changes presentation density, not canonical object identity or claim strength.","No public presentation may exceed the applicable canonical claim ceiling."]){
    if(!architecture.constitutionalRules.includes(required)) failures.push(`missing-constitutional-rule:${required}`);
  }

  return {failures:canonical(failures),passes:failures.length===0};
}

export function publicChapter(chapterId:ChapterId):PublicChapter{
  const chapter=PUBLIC_ARCHITECTURE.chapters.find(c=>c.chapterId===chapterId);
  if(!chapter) throw new Error(`unknown public chapter: ${chapterId}`);
  return structuredClone(chapter);
}

export function publicCase(caseId:string):PublicCase{
  const item=PUBLIC_ARCHITECTURE.cases.find(c=>c.caseId===caseId);
  if(!item) throw new Error(`unknown public case: ${caseId}`);
  return structuredClone(item);
}

export function publicConcept(conceptId:string):PublicConcept{
  const item=PUBLIC_ARCHITECTURE.concepts.find(c=>c.conceptId===conceptId);
  if(!item) throw new Error(`unknown public concept: ${conceptId}`);
  return structuredClone(item);
}

export function publicTool(toolId:string):PublicTool{
  const item=PUBLIC_ARCHITECTURE.tools.find(t=>t.toolId===toolId);
  if(!item) throw new Error(`unknown public tool: ${toolId}`);
  return structuredClone(item);
}

export function publicComparison(comparisonId:string):PublicComparisonPath{
  const item=PUBLIC_ARCHITECTURE.comparisons.find(c=>c.comparisonId===comparisonId);
  if(!item) throw new Error(`unknown public comparison: ${comparisonId}`);
  return structuredClone(item);
}

export function conceptsForCase(caseId:string):PublicConcept[]{
  const item=publicCase(caseId);
  return item.conceptIds.map(publicConcept);
}

export function toolsForCase(caseId:string):PublicTool[]{
  const item=publicCase(caseId);
  return item.toolIds.map(publicTool);
}

export function comparisonsForCase(caseId:string):PublicComparisonPath[]{
  publicCase(caseId);
  return PUBLIC_ARCHITECTURE.comparisons.filter(c=>c.caseIds.includes(caseId)).map(structuredClone);
}
