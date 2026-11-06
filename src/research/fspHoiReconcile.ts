import { ResourceDepth } from "./fspEncyclopediaScope";

export type HoiNodeKind = "PROLOGUE"|"CHAPTER"|"INTERVENTION"|"LAB"|"EPILOGUE";
export type ReconciliationPatch =
  | "CONTEXT_RECOVERY"
  | "TEMPORAL_ANCHOR"
  | "DISCIPLINARY_DEVELOPMENT"
  | "ENCYCLOPEDIA_LINK"
  | "LATER_REOPENING"
  | "RETURN_CUE"
  | "SOURCE_STATUS";

export interface HoiCanonicalLink {
  label:string;
  href:string;
  kind:"CORE"|"CASE"|"CONCEPT"|"DOMAIN";
  required:boolean;
  reason:string;
}

export interface HoiChapterReconciliation {
  nodeId:string;
  kind:HoiNodeKind;
  ordinal?:number;
  title:string;
  disciplinaryQuestion:string;
  developmentalMove:string;
  wholeInquiryRecovery:{
    inheritedWorld:string;
    liveProblem:string;
    situatedInquiry:string;
    publicArtifact:string;
    uptakeAndContest:string;
    sediment:string;
    changedLaterTask:string;
    reopening:string;
  };
  temporalAnchor:string;
  studentFacingCompression:string[];
  encyclopediaLinks:HoiCanonicalLink[];
  allowedPatches:ReconciliationPatch[];
  preserve:string[];
  noFspRequirement:string;
}

export interface HoiModeContract {
  mode:"HISTORICAL_CHAPTER"|"HISTORICAL_INTERVENTION"|"CONTEMPORARY_LAB";
  purpose:string;
  commonDevices:string[];
  nativeFreedom:string;
  prohibitedCollapse:string;
}

export interface HoiNoFspCoursePolicy {
  courseIdentity:string;
  studentPrerequisite:string;
  permittedStudentFacingTerms:string[];
  optionalBackgroundTerms:string[];
  forbiddenPrerequisiteTerms:string[];
  successCriterion:string;
}

export interface HoiReconciliationPlan {
  buildId:string;
  sourceLock:string;
  title:string;
  bookIdentity:string;
  globalSpine:string[];
  chapters:HoiChapterReconciliation[];
  modes:HoiModeContract[];
  depths:ResourceDepth[];
  noFspCourse:HoiNoFspCoursePolicy;
  governance:readonly string[];
}

const basePatches:ReconciliationPatch[]=[
  "CONTEXT_RECOVERY","TEMPORAL_ANCHOR","DISCIPLINARY_DEVELOPMENT",
  "ENCYCLOPEDIA_LINK","LATER_REOPENING","RETURN_CUE","SOURCE_STATUS"
];

function link(label:string,href:string,kind:HoiCanonicalLink["kind"],reason:string,required=false):HoiCanonicalLink{
  return {label,href,kind,reason,required};
}

export const HOI_CHAPTERS:HoiChapterReconciliation[]=[
  {
    nodeId:"HOI-C01",kind:"CHAPTER",ordinal:1,title:"The Trouble with Knowing",
    disciplinaryQuestion:"How does Socratic examination turn confident inherited language into a live philosophical problem without requiring final closure?",
    developmentalMove:"Confidence → examination → explanatory-direction pressure → bounded aporia → public dialogical inheritance.",
    wholeInquiryRecovery:{
      inheritedWorld:"Athenian civic, religious, and educational practices already give piety, expertise, and accusation public stakes.",
      liveProblem:"What entitles a person to act and speak as though they know what piety is?",
      situatedInquiry:"Plato's represented Socrates examines Euthyphro through a dialogical and aporetic inquiry.",
      publicArtifact:"Platonic dialogue preserves the inquiry as a public philosophical artifact rather than direct access to Socrates' private mind.",
      uptakeAndContest:"Later readers inherit both arguments and the model of examination, often compressing them into a 'Socratic method.'",
      sediment:"Examination, definition, reason-giving, and aporia become recurring philosophical practices.",
      changedLaterTask:"Aristotle inherits questions about virtue, knowledge, education, and the good but changes the scale from definition to a whole life.",
      reopening:"What can later inquiry preserve from Socratic examination without treating aporia as failure or a later label as the original practice?"
    },
    temporalAnchor:"Classical Athens; keep Plato-as-author / Socrates-as-speaker provenance explicit rather than flattening text into biography.",
    studentFacingCompression:["What problem is live?","What has the argument earned?","What remains unresolved?","What may be carried forward?"],
    encyclopediaLinks:[
      link("Claim Ceiling","#/concepts/CLAIM-CEILING","CONCEPT","Supports the ordinary-language question 'What has this earned?' without requiring FSP study."),
      link("REOPEN","#/concepts/REOPEN","CONCEPT","Provides optional deeper reference for bounded aporia and later reopening.")
    ],
    allowedPatches:basePatches,preserve:["dialogical/aporetic topology","Plato/Socrates provenance distinction","historical prose first"],
    noFspRequirement:"Students must be able to complete the chapter using Socrates, Plato, Euthyphro, reason-giving, and aporia without knowing FSP terminology."
  },
  {
    nodeId:"HOI-C02",kind:"CHAPTER",ordinal:2,title:"A Life as a Whole",
    disciplinaryQuestion:"How does Aristotle transform inherited questions about virtue and knowledge into an inquiry about flourishing across a whole life?",
    developmentalMove:"Socratic/Platonic inheritance → layered inquiry into function, formation, choice, practical wisdom, friendship, fortune, pleasure, and contemplation.",
    wholeInquiryRecovery:{
      inheritedWorld:"Greek inquiries into virtue, knowledge, education, political life, and the good already structure Aristotle's problem space.",
      liveProblem:"What must be present across a life for human flourishing rather than a single successful episode?",
      situatedInquiry:"Aristotle builds a layered investigation whose object becomes richer as more conditions of flourishing enter.",
      publicArtifact:"The Nicomachean Ethics becomes a teachable and disputable account of flourishing, virtue, and practical judgment.",
      uptakeAndContest:"Later virtue traditions inherit and transform Aristotle's distinctions across changing social, religious, and institutional settings.",
      sediment:"Virtue, habituation, practical wisdom, friendship, and flourishing become durable philosophical categories.",
      changedLaterTask:"Hellenistic schools inherit the vulnerability of flourishing and ask what can remain under pressure from fortune and instability.",
      reopening:"Which Aristotelian distinctions remain useful when social conditions, conceptions of personhood, or domains of practice change?"
    },
    temporalAnchor:"Fourth-century BCE Greek philosophical and political setting; later virtue-ethics labels remain retrospective compressions.",
    studentFacingCompression:["What entered the picture?","Formation is not the same as conformity.","Practical judgment cannot be replaced by a formula.","What survives a change of context?"],
    encyclopediaLinks:[
      link("Aristotle historical master","#/domains/HISTORY-PHILOSOPHY","DOMAIN","Future canonical master link; the course should use an Ethics/history aperture rather than create a competing Aristotle."),
      link("Remainder","#/concepts/REMAINDER","CONCEPT","Optional reference for what a function argument or virtue account does not settle.")
    ],
    allowedPatches:basePatches,preserve:["layered Aristotelian topology","formation ≠ justification","historical master / domain-aperture distinction"],
    noFspRequirement:"Students need Aristotle's ethical questions and arguments, not a general FSP ontology."
  },
  {
    nodeId:"HOI-C03",kind:"CHAPTER",ordinal:3,title:"Philosophy Under Pressure",
    disciplinaryQuestion:"How do Hellenistic inquiries reorganize the task of philosophy when fortune, desire, fear, assent, and political instability pressure the good life?",
    developmentalMove:"Rich but vulnerable flourishing → competing therapeutic/practical responses → changed standards for what philosophy should secure.",
    wholeInquiryRecovery:{
      inheritedWorld:"Aristotelian flourishing remains vulnerable to external goods, political community, friendship, and fortune.",
      liveProblem:"What can philosophy help secure when external conditions and internal responses are unstable?",
      situatedInquiry:"Epicurean, Stoic, and Skeptical inquiries develop distinct practices of desire, assent, suspension, and living.",
      publicArtifact:"Schools, texts, teaching practices, and exercises turn philosophy into repeatable forms of life and training.",
      uptakeAndContest:"Later religious, therapeutic, and moral traditions selectively inherit and transform these practices.",
      sediment:"Control, assent, tranquility, suspension, desire, and philosophical therapy become durable resources.",
      changedLaterTask:"Late antique and medieval inquiry asks what reason can do inside worlds structured by revelation, inherited authority, and transmission.",
      reopening:"What can be carried forward from philosophical therapy without treating different schools as one method or modern wellness programs?"
    },
    temporalAnchor:"Hellenistic and Roman worlds after classical polis assumptions; preserve school differences and changing political conditions.",
    studentFacingCompression:["What is under pressure?","What can the agent actually control?","Different practices answer different tasks.","Comparison is not identity."],
    encyclopediaLinks:[link("Standing","#/concepts/STANDING","CONCEPT","Optional support for distinguishing authority, practice, and warrant.")],
    allowedPatches:basePatches,preserve:["school-specific therapeutic topologies","no single Hellenistic method","pressure from fortune and instability"],
    noFspRequirement:"The course remains about Hellenistic philosophy; FSP vocabulary may remain background."
  },
  {
    nodeId:"HOI-C04",kind:"CHAPTER",ordinal:4,title:"Reason Inside an Inherited World",
    disciplinaryQuestion:"What can reason do when inquiry begins inside inherited revelation, authority, texts, translations, institutions, and conceptual transmissions?",
    developmentalMove:"Inherited authority → reconstruction and transmission → reason/revelation negotiation → transformed later intellectual environment.",
    wholeInquiryRecovery:{
      inheritedWorld:"Late antique and medieval thinkers inherit texts, revelation, institutions, languages, translations, and established authority structures.",
      liveProblem:"How can reason investigate when neither the intellectual materials nor their standing begin from zero?",
      situatedInquiry:"Augustine, transmission networks, and Aquinas negotiate inherited philosophical and theological resources under changed tasks.",
      publicArtifact:"Confessions, commentaries, translations, scholastic disputes, and syntheses make inherited material newly public and reusable.",
      uptakeAndContest:"Greek, Syriac, Arabic, Persian, Jewish, and Latin intellectual worlds transmit and transform materials rather than merely copy them.",
      sediment:"Authority, natural law, reason/revelation relations, scholastic distinctions, and translated conceptual vocabularies become later inheritances.",
      changedLaterTask:"Early modern inquiry confronts inherited intellectual machines amid printing, institutional conflict, instruments, voyages, and political change.",
      reopening:"Which inheritances are identical, which are transformed transmissions, and which are only structural parallels?"
    },
    temporalAnchor:"Late antiquity through medieval transmission; Bridge C must remain a documented historical transmission arrow, not a pedagogical comparison.",
    studentFacingCompression:["Inheritance is not obedience.","Transmission can transform what is inherited.","Historical influence ≠ philosophical truth.","What changed in translation or institutional use?"],
    encyclopediaLinks:[
      link("Provenance","#/concepts/PROVENANCE","CONCEPT","Deepens source/transmission discipline."),
      link("Historical sedimentation","#/concepts/HISTORICAL-SEDIMENTATION","CONCEPT","Optional reference for persistence without automatic legitimacy.")
    ],
    allowedPatches:basePatches,preserve:["Historical Bridge C","documented transmission discipline","reason/revelation problem","no pseudo-genealogy"],
    noFspRequirement:"Students can understand inheritance and transmission historically without learning relation-graph or projection terminology."
  },
  {
    nodeId:"HOI-C05",kind:"CHAPTER",ordinal:5,title:"Rebuilding the Map",
    disciplinaryQuestion:"How do Bacon, Hobbes, new instruments, changing institutions, and political conflict reopen method, mechanism, and authority?",
    developmentalMove:"Inherited intellectual machine → methodological and institutional pressure → reconstruction of knowledge and political authority.",
    wholeInquiryRecovery:{
      inheritedWorld:"Scholastic, theological, political, and educational inheritances remain powerful while printing, voyages, instruments, mathematics, anatomy, astronomy, mechanics, and state formation alter tasks.",
      liveProblem:"Which inherited methods and authorities can still organize reliable inquiry and political order?",
      situatedInquiry:"Bacon and Hobbes rebuild different parts of the map: method, mechanism, language, authority, and political construction.",
      publicArtifact:"Methodological programs and political-philosophical systems become public proposals for reorganizing knowledge and order.",
      uptakeAndContest:"Later science and political philosophy inherit both methodological ambitions and unresolved questions about institutions and authority.",
      sediment:"Method, mechanism, experiment, construction, sovereignty, and institutional order become powerful modern categories.",
      changedLaterTask:"Descartes radicalizes the epistemic problem by deliberately withdrawing inherited standing and asking what can survive doubt.",
      reopening:"How do contemporary Life and AI inquiries reuse method/mechanism/institution questions without making Bacon or Hobbes their precursors?"
    },
    temporalAnchor:"Sixteenth–seventeenth-century transformation context; later science links are reopenings, not retroactive destinations.",
    studentFacingCompression:["Inherited maps can be rebuilt.","New instruments can change what becomes salient.","Method and institution are distinct.","Later reopening, not prediction."],
    encyclopediaLinks:[
      link("Galileo whole inquiry","#/narrative/GALILEO-COPERNICAN","CASE","A concrete early-modern case where instrument standing, evidence, interpretation, and institutional power interact."),
      link("Standing and power audit","#/tools/STANDING-POWER-AUDIT","CORE","Optional deeper inspection; not a course prerequisite.")
    ],
    allowedPatches:basePatches,preserve:["Bacon/Hobbes disciplinary identity","method/mechanism/institution distinction","Later reopening label"],
    noFspRequirement:"The chapter must remain intelligible as early-modern philosophy and intellectual history without FSP."
  },
  {
    nodeId:"HOI-C06",kind:"CHAPTER",ordinal:6,title:"What Can Survive Doubt?",
    disciplinaryQuestion:"What does Descartes's ordered skeptical inquiry allow him to carry forward, and what remains unearned at each stage?",
    developmentalMove:"Withdrawal of inherited standing → ordered doubt → bounded carry-forward → new representational and metaphysical problems.",
    wholeInquiryRecovery:{
      inheritedWorld:"Inherited sensory, scholastic, mathematical, religious, and educational standings are deliberately suspended for the inquiry.",
      liveProblem:"What, if anything, remains warranted when familiarity and inherited authority are not enough?",
      situatedInquiry:"The Meditations proceeds through an unusually ordered sequence of skeptical and reconstructive moves.",
      publicArtifact:"The Meditations publishes a staged inquiry whose later claims depend on what earlier stages have licensed.",
      uptakeAndContest:"Later philosophy inherits the representational, mind/world, certainty, and method problems even when rejecting Cartesian solutions.",
      sediment:"Cogito, mind/body distinction, clear-and-distinct ideas, and methodological doubt become durable philosophical reference points.",
      changedLaterTask:"Empiricist inquiry asks how ideas relate to a world and what experience itself can license.",
      reopening:"Which Cartesian dependencies survive when first-/third-person evidence and mind inquiries are reopened today?"
    },
    temporalAnchor:"Seventeenth-century Cartesian project; preserve dependency order instead of treating the Meditations as a bag of doctrines.",
    studentFacingCompression:["What can survive this stage?","Later claims may depend on earlier licenses.","What has not yet been earned?","Return to the inquiry sequence."],
    encyclopediaLinks:[link("Claim Ceiling","#/concepts/CLAIM-CEILING","CONCEPT","Optional language for stage-bounded warrant.")],
    allowedPatches:basePatches,preserve:["ordered Meditation topology","stage dependency","first-/third-person seam"],
    noFspRequirement:"Students reconstruct Descartes's own ordered inquiry; no FSP state machine or transition formalism is required."
  },
  {
    nodeId:"HOI-C07",kind:"CHAPTER",ordinal:7,title:"Ideas and the World",
    disciplinaryQuestion:"What can experience, ideas, and representation license us to say about a world beyond immediate perception?",
    developmentalMove:"Cartesian representation problem → Locke/Berkeley alternatives → pressure on external-object licensing.",
    wholeInquiryRecovery:{
      inheritedWorld:"Cartesian inquiry leaves a sharpened distinction between mental representation and external world.",
      liveProblem:"What relation between ideas and world can experience actually warrant?",
      situatedInquiry:"Locke and Berkeley reconstruct representation and existence through different empiricist tasks.",
      publicArtifact:"Treatises make ideas, qualities, substance, perception, and existence explicit objects of philosophical dispute.",
      uptakeAndContest:"Later empiricism inherits representation while intensifying questions about causation, necessity, and the self.",
      sediment:"Primary/secondary quality, idea, representation, and idealism become durable labels that can also overcompress the original inquiries.",
      changedLaterTask:"Hume asks how far repeated experience can carry expectations of causation, necessity, and identity.",
      reopening:"How do Physics, Mind, Unity/Change, and AI reopen representation without assuming seventeenth-century categories survive unchanged?"
    },
    temporalAnchor:"Late seventeenth–early eighteenth century; later representation links are structural reopenings, not identity claims.",
    studentFacingCompression:["Representation is not the represented world.","What licenses the move from idea to object?","Same word can carry a changed role.","Keep the remainder visible."],
    encyclopediaLinks:[
      link("Provenance","#/concepts/PROVENANCE","CONCEPT","Supports source and representation discipline."),
      link("Newton→Einstein whole inquiry","#/narrative/NEWTON-EINSTEIN","CASE","Optional later case for changed representation and translation across frameworks.")
    ],
    allowedPatches:basePatches,preserve:["Locke/Berkeley contrast","representation-to-world licensing problem","Later reopening discipline"],
    noFspRequirement:"Students should be able to explain Locke and Berkeley without being tested on FSP."
  },
  {
    nodeId:"HOI-C08",kind:"CHAPTER",ordinal:8,title:"The Habit of Expecting",
    disciplinaryQuestion:"How far can experience carry claims about causation, induction, self, and normative transition?",
    developmentalMove:"Repeated experience → expectation → pressure on necessity and induction → bounded distinctions that reopen later science and ethics.",
    wholeInquiryRecovery:{
      inheritedWorld:"Empiricist representation remains available, but its licenses for necessity, causation, and identity are unsettled.",
      liveProblem:"What warrants the move from observed succession and habit to necessity, future expectation, or normative conclusion?",
      situatedInquiry:"Hume analyzes causation, induction, self, and is/ought transitions through experience and habit.",
      publicArtifact:"The Treatise and Enquiries make inferential limits themselves central philosophical objects.",
      uptakeAndContest:"Kant treats Humean pressure as a reason to reconstruct the conditions under which objective experience and necessity are possible.",
      sediment:"Hume's problem of induction, causation analysis, bundle/self discussions, and is/ought distinction become durable later resources.",
      changedLaterTask:"Kant asks what experience must bring with it—or what the knower must contribute—for objectivity and obligation.",
      reopening:"How do contemporary scientific prediction and model-based inference reopen Hume without pretending later methods answer his exact historical question?"
    },
    temporalAnchor:"Eighteenth-century British empiricism; contemporary prediction is a Later reopening, not Hume anticipating machine learning or modern science.",
    studentFacingCompression:["Observed regularity is not necessity.","Prediction needs a bridge.","Description is not recommendation.","What has experience earned?"],
    encyclopediaLinks:[
      link("Neptune/Vulcan whole inquiry","#/narrative/NEPTUNE-VULCAN","CASE","Concrete later case for revision, prediction, and bounded inference."),
      link("DESI case","#/cases/DESI-2024-2026","CASE","Live frontier example where claim ceilings and reopening remain active.")
    ],
    allowedPatches:basePatches,preserve:["Humean historical problem","causation/induction/is-ought distinctions","high-visibility Later reopening"],
    noFspRequirement:"The course assesses Hume's arguments and disciplinary significance, not FSP vocabulary."
  },
  {
    nodeId:"HOI-C09",kind:"CHAPTER",ordinal:9,title:"What Must Experience Bring With It?",
    disciplinaryQuestion:"How does Kant reconstruct the conditions of objective experience and autonomy in response to empiricist pressure?",
    developmentalMove:"Humean limits → transcendental reconstruction → conditions of objectivity/autonomy → later questions about model, person, and domain.",
    wholeInquiryRecovery:{
      inheritedWorld:"Humean skepticism about necessity and empiricist accounts of experience set the immediate philosophical pressure.",
      liveProblem:"What must be contributed for experience to count as experience of an objective world, and for agency to count as autonomous?",
      situatedInquiry:"Kant's architectonic inquiry reconstructs conditions rather than simply adding more observations.",
      publicArtifact:"Critiques and moral works establish a systematic architecture whose transitions require careful licensing.",
      uptakeAndContest:"Later philosophy inherits categories, autonomy, personhood, and conditions-of-possibility arguments while contesting their scope.",
      sediment:"Synthetic a priori, category, autonomy, dignity, and transcendental argument become durable philosophical resources.",
      changedLaterTask:"Utilitarian, genealogical, pragmatist, and situated inquiries challenge or redirect Kantian boundaries.",
      reopening:"How do Physics, Medicine/AI, and Life reuse conditions, representation, and autonomy distinctions without treating Kant as their contemporary theorist?"
    },
    temporalAnchor:"Late eighteenth-century Kantian system; present-day applications remain typed reopenings.",
    studentFacingCompression:["Conditions are not observations.","Architecture needs licensed transitions.","Autonomy is not mere preference.","Later use ≠ historical prediction."],
    encyclopediaLinks:[link("Newton→Einstein whole inquiry","#/narrative/NEWTON-EINSTEIN","CASE","Optional comparison for conditions, framework transformation, and bounded translation.")],
    allowedPatches:basePatches,preserve:["Kantian architectonic topology","Hume-to-Kant dependency","distinct theoretical/practical reopenings"],
    noFspRequirement:"Students learn Kant's problem and architecture; FSP formalism remains optional backplane."
  },
  {
    nodeId:"HOI-C10",kind:"CHAPTER",ordinal:10,title:"Whose Happiness Counts?",
    disciplinaryQuestion:"How do Bentham and Mill turn welfare, liberty, aggregation, and public policy into a modern philosophical problem?",
    developmentalMove:"Moral/political evaluation → aggregation and welfare → liberty constraints → public institutional use and later risk.",
    wholeInquiryRecovery:{
      inheritedWorld:"Modern moral and political philosophy inherits rights, authority, autonomy, and growing administrative/public-policy tasks.",
      liveProblem:"How should welfare, harm, liberty, and unequal burdens count in public decisions?",
      situatedInquiry:"Bentham and Mill construct and revise utilitarian reasoning under different problems of aggregation and freedom.",
      publicArtifact:"Utilitarian texts enter law, policy, economics, reform, and public moral vocabulary.",
      uptakeAndContest:"Later welfare analysis, medicine, economics, and AI governance inherit aggregation tools alongside objections about rights and distribution.",
      sediment:"Utility, welfare, harm, liberty, and cost-benefit reasoning become institutionalized categories.",
      changedLaterTask:"Nietzsche turns attention from evaluating values by a rule to examining how values themselves acquire histories and forces.",
      reopening:"When may contemporary Medicine or AI reuse welfare analysis, and what domain-native standing or rights prevent simple aggregation?"
    },
    temporalAnchor:"Nineteenth-century reform and liberal-utilitarian context; modern policy tools are later developments, not identical to Bentham/Mill.",
    studentFacingCompression:["Aggregation can reveal and conceal.","Welfare is not the whole moral field.","Liberty constrains some calculations.","Institutional use can sediment a philosophical tool."],
    encyclopediaLinks:[link("Standing","#/concepts/STANDING","CONCEPT","Optional bridge for whose interests and authority count in applied decisions.")],
    allowedPatches:basePatches,preserve:["Bentham/Mill differences","welfare/liberty tension","Medicine/AI Later reopening"],
    noFspRequirement:"The chapter remains a utilitarianism/liberty chapter rather than an FSP governance lesson."
  },
  {
    nodeId:"HOI-C11",kind:"CHAPTER",ordinal:11,title:"When Values Acquire a History",
    disciplinaryQuestion:"What changes when Nietzsche makes the formation and history of values themselves objects of philosophical diagnosis?",
    developmentalMove:"Inherited moral vocabulary → genealogy → origin/force diagnosis → revaluation pressure without origin-to-invalidity shortcut.",
    wholeInquiryRecovery:{
      inheritedWorld:"Moral terms arrive already weighted by institutions, religion, family, law, praise, blame, and habit.",
      liveProblem:"How did these valuations acquire authority, and what follows—or does not follow—from reconstructing their history?",
      situatedInquiry:"Nietzsche uses genealogy and diagnosis rather than a neutral rule test or deductive ethical system.",
      publicArtifact:"Genealogical texts turn the history and psychology of valuation into philosophical evidence and provocation.",
      uptakeAndContest:"Later critical theory, genealogy, social critique, and identity/power inquiries inherit the diagnostic move in different forms.",
      sediment:"Ressentiment, genealogy, revaluation, and suspicion become durable critical vocabularies.",
      changedLaterTask:"Pragmatism asks how inquiry can remain fallible and reconstructive without either timeless foundations or pure genealogy.",
      reopening:"When does historical explanation alter current standing, and when does origin fail to settle validity?"
    },
    temporalAnchor:"Late nineteenth-century Nietzschean genealogy; preserve genealogical topology rather than converting it into causal debunking.",
    studentFacingCompression:["Origin ≠ validity.","History can change what becomes visible.","Diagnosis ≠ final judgment.","What has genealogy earned?"],
    encyclopediaLinks:[link("Historical sedimentation","#/concepts/HISTORICAL-SEDIMENTATION","CONCEPT","Deepens persistence/formation without equating persistence with legitimacy.")],
    allowedPatches:basePatches,preserve:["genealogical topology","origin-to-validity firewall","revaluation problem"],
    noFspRequirement:"Students can evaluate Nietzsche through genealogy and revaluation without learning FSP."
  },
  {
    nodeId:"HOI-C12",kind:"CHAPTER",ordinal:12,title:"Inquiry That Can Learn",
    disciplinaryQuestion:"How do Peirce, James, and Dewey make fallibility, consequence, revision, and communal inquiry central without reducing truth to usefulness?",
    developmentalMove:"Fallibilism → consequence-sensitive inquiry → public correction → reconstructive reopening.",
    wholeInquiryRecovery:{
      inheritedWorld:"Modern philosophy inherits skepticism, system-building, genealogy, science, democratic institutions, and unresolved method disputes.",
      liveProblem:"How can inquiry proceed responsibly without infallible foundations or surrender to arbitrary belief?",
      situatedInquiry:"Peirce, James, and Dewey develop different pragmatist approaches to belief, consequence, inquiry, and reconstruction.",
      publicArtifact:"Pragmatist essays and books make public correction, consequence, and revisability central philosophical resources.",
      uptakeAndContest:"Later philosophy of science, education, democracy, and applied inquiry reuse fallibilist and reconstructive practices.",
      sediment:"Fallibilism, inquiry community, practical consequence, and reconstruction become durable philosophical tools.",
      changedLaterTask:"Situated freedom adds embodiment, social position, recognition, and unequal possibility to the inquiry field.",
      reopening:"All contemporary laboratories can reuse fallibility and revision, but must preserve their domain-native evidence and authority structures."
    },
    temporalAnchor:"Late nineteenth–twentieth-century American pragmatism; contemporary labs are later reopenings, not the destination pragmatism was secretly approaching.",
    studentFacingCompression:["Fallibility is not skepticism.","Consequences can test without deciding every value.","Inquiry can learn.","Reopening is part of responsible closure."],
    encyclopediaLinks:[
      link("REOPEN","#/concepts/REOPEN","CONCEPT","Direct optional reference for revisable closure."),
      link("DESI case","#/cases/DESI-2024-2026","CASE","Contemporary live-science example of evidence and claim ceilings still moving.")
    ],
    allowedPatches:basePatches,preserve:["Peirce/James/Dewey differences","fallibility/consequence/revision hinge","all-laboratory Later reopening"],
    noFspRequirement:"Pragmatism remains the disciplinary subject; FSP may clarify but cannot become the learning objective."
  },
  {
    nodeId:"HOI-C13",kind:"CHAPTER",ordinal:13,title:"Situated Freedom",
    disciplinaryQuestion:"How do Du Bois and de Beauvoir make embodiment, social position, recognition, unequal possibility, and power part of what inquiry can see and what agents can do?",
    developmentalMove:"Abstract knower/agent → situated evidence and constrained possibility → recognition/power → relational reopening.",
    wholeInquiryRecovery:{
      inheritedWorld:"Modern accounts of reason, autonomy, utility, genealogy, and pragmatism often leave social position and embodied constraint unevenly represented.",
      liveProblem:"How do social position and unequal institutions alter what becomes visible, credible, possible, and actionable?",
      situatedInquiry:"Du Bois and de Beauvoir reconstruct inquiry and freedom from situated lives without making standpoint infallible.",
      publicArtifact:"Sociological, philosophical, literary, and political works make double consciousness, ambiguity, embodiment, recognition, and oppression publicly contestable.",
      uptakeAndContest:"Feminist, race, standpoint, care, decolonial, disability, and relational inquiries inherit and transform these problems.",
      sediment:"Situated knowledge, embodiment, recognition, oppression, and relational agency become central contemporary philosophical resources.",
      changedLaterTask:"Chapter 14 asks how plural expertise and cooperation can be governed when no single standpoint or model can replace all others.",
      reopening:"Mind, Medicine, AI, and relational-personhood inquiries reuse situatedness while preserving domain-native standing and evidence."
    },
    temporalAnchor:"Late nineteenth–twentieth-century racialized, gendered, colonial, and existential contexts; avoid abstracting situatedness away from power.",
    studentFacingCompression:["Situatedness is not relativism.","Standpoint can reveal without becoming infallible.","Power changes possibility.","Person ≠ map of person."],
    encyclopediaLinks:[
      link("Standing","#/concepts/STANDING","CONCEPT","Supports distinction between evidential, social, and institutional standing."),
      link("Galileo whole inquiry","#/narrative/GALILEO-COPERNICAN","CASE","Optional comparison where authority and evidence interact without collapsing into each other.")
    ],
    allowedPatches:basePatches,preserve:["Du Bois/de Beauvoir distinctness","situated evidence/embodiment/power","Intervention D handoff"],
    noFspRequirement:"Students study situated freedom in its historical and philosophical terms; FSP is not a prerequisite vocabulary."
  },
  {
    nodeId:"HOI-C14",kind:"CHAPTER",ordinal:14,title:"You Are Here: Plural Inquiry, Expertise, Prediction, and Cooperation Without Convergence",
    disciplinaryQuestion:"What can responsible inquiry look like now when expertise, models, institutions, technologies, and plural values cannot be collapsed into one final map?",
    developmentalMove:"Inherited history → plural present inquiry → explicit transition governance → six live laboratories → reader responsibility.",
    wholeInquiryRecovery:{
      inheritedWorld:"The reader inherits the book's accumulated distinctions, disputes, losses, translations, and sedimented practices.",
      liveProblem:"How should inquiry proceed when expertise is distributed, models predict without authorizing values, and cooperation must survive disagreement?",
      situatedInquiry:"Chapter 14 synthesizes plural expertise, prediction, standing, translation, consequence, and reopening without becoming a meta-theory that solves the laboratories.",
      publicArtifact:"The chapter functions as a hinge from historical reconstruction to six contemporary inquiry laboratories.",
      uptakeAndContest:"Each laboratory tests inherited distinctions inside a domain-native inquiry still changing.",
      sediment:"The reader acquires a portable but non-universal set of habits for governing transitions and returns.",
      changedLaterTask:"The six laboratories become live tests rather than chapters 15–20, and the Epilogue returns responsibility to the reader.",
      reopening:"What will future inheritors need in order to inspect, contest, and reopen the maps we leave them?"
    },
    temporalAnchor:"Explicit present-day hinge; frontier dossiers require versioning and should not be back-projected into earlier historical chapters.",
    studentFacingCompression:["Models do not decide values.","Generate ≠ recommend ≠ authorize.","Cooperation need not require convergence.","Responsible closure keeps a reopening route."],
    encyclopediaLinks:[
      link("FSP Encyclopedia home","#/","DOMAIN","Optional deep resource for students who want to inspect the broader architecture."),
      link("Scientific Inquiry collection","#/cases","DOMAIN","Current mature domain collection; laboratory links remain selective.")
    ],
    allowedPatches:basePatches,preserve:["hinge role","not a meta-laboratory","plural expertise/cooperation focus","six-lab handoff"],
    noFspRequirement:"Students must be able to complete Chapter 14 as contemporary philosophy without learning formal FSP machinery."
  }
];

export const HOI_MODES:HoiModeContract[]=[
  {
    mode:"HISTORICAL_CHAPTER",
    purpose:"Reconstruct a historically situated philosophical inquiry in its own problem space and topology.",
    commonDevices:["chapter promise/question","human-entry problem","inherited-world reconstruction","licensing zoom","claim ceiling","carry-forward","reader return"],
    nativeFreedom:"Dialogical, layered, architectonic, genealogical, reconstructive, therapeutic, or other chapter-native forms remain primary.",
    prohibitedCollapse:"Do not standardize historical chapters into one FSP worksheet, state vector, or universal method."
  },
  {
    mode:"HISTORICAL_INTERVENTION",
    purpose:"Broaden or reconnect the historical spine through typed inquiry windows or documented transmission bridges.",
    commonDevices:["intervention type","why-here cue","relation discipline","non-skippable arrow","claim ceiling","what changes in the spine","return-to-spine"],
    nativeFreedom:"Inquiry Windows may be pedagogical parallels; Historical Bridge C may assert transmission only where historically sourced.",
    prohibitedCollapse:"Do not convert pedagogical comparison into genealogy or make all interventions the same relation type."
  },
  {
    mode:"CONTEMPORARY_LAB",
    purpose:"Test inherited distinctions inside live domain-native inquiries without turning contemporary science or policy into the destination of history.",
    commonDevices:["Do Not Skip This Arrow","I Still Cannot Conclude","What Changed?","Reopen Trigger","Reader Return / Carry-Forward"],
    nativeFreedom:"Each laboratory retains at least two domain-native devices and its own evidence/authority topology.",
    prohibitedCollapse:"Do not rewrite the six laboratories into one generalized FSP procedure or treat Chapters 1–13 as precursors of the labs."
  }
];

export const HOI_NO_FSP_COURSE:HoiNoFspCoursePolicy={
  courseIdentity:"History of philosophy as situated human inquiry; the discipline is philosophy and its historical development, not FSP.",
  studentPrerequisite:"No prior FSP knowledge. Students need ordinary philosophical reading, historical orientation, and argument reconstruction only.",
  permittedStudentFacingTerms:["claim ceiling","carry forward","reopening","standing","map","sedimentation","Doing"],
  optionalBackgroundTerms:["FSP","provenance","remainder","Authorial Return"],
  forbiddenPrerequisiteTerms:["FSP state vector","relation graph","canonical fingerprint","projection profile","reducer","invariant suite","formal transition vector","ecosystem binding"],
  successCriterion:"A student can meet every chapter objective, complete course assessments, and explain the book's developmental history without defining FSP or using formal FSP machinery."
};

export const HOI_RECONCILIATION_GOVERNANCE=[
  "Reconcile the locked Pressbook; do not globally rewrite Chapters 1–13 around current FSP or contemporary science.",
  "Historical prose comes first; framework vocabulary appears only when it clarifies a disciplinary problem already visible in the history.",
  "The book's common developmental spine belongs to the history of public inquiry, not to a secret universal topology of philosophy.",
  "Whole-inquiry recovery must answer where the reader came from, what problem is live, what changed, what became inheritable, and what later task was reopened.",
  "Temporal anchoring must prevent later concepts, cases, and successes from leaking backward into earlier actors' available reasons.",
  "Canonical Encyclopedia links are optional depth/recovery routes unless a chapter explicitly requires a source; the course may not depend on browsing the Encyclopedia.",
  "Later reopening identifies genuine conceptual reuse; it never means anticipated, predicted, or secretly discovered.",
  "Inquiry Windows and Historical Bridge C remain typed relations; pedagogical parallel is not genealogy.",
  "Contemporary Laboratories preserve domain-native topology and versioned frontier evidence.",
  "No-FSP-Course regression is constitutional: FSP may govern authoring and navigation while remaining unnecessary as a student prerequisite.",
  "Pressbook chapter identities, order, intervention placement, Chapter 14 hinge, laboratory status, and Epilogue return remain locked unless a demonstrated disciplinary gap REOPENs them."
] as const;

export const HOI_RECONCILE_PLAN:HoiReconciliationPlan={
  buildId:"FSP-HOI-RECONCILE-1",
  sourceLock:"PHIL-HIST-TEXT-LOCK-2",
  title:"What May We Carry Forward? A History of Philosophy as Situated Human Inquiry",
  bookIdentity:"A disciplinary history of philosophy organized around how situated human inquiries become public, inherited, contested, sedimented, and reopened.",
  globalSpine:["inherited world","live problem","situated inquiry","public artifact","uptake and contest","sediment","changed later task","reopening"],
  chapters:HOI_CHAPTERS,
  modes:HOI_MODES,
  depths:["QUICK","STANDARD","DEEP"],
  noFspCourse:HOI_NO_FSP_COURSE,
  governance:HOI_RECONCILIATION_GOVERNANCE
};

export function chapterReconciliation(ordinal:number):HoiChapterReconciliation{
  const chapter=HOI_CHAPTERS.find(c=>c.ordinal===ordinal);
  if(!chapter) throw new Error(`unknown HOI chapter: ${ordinal}`);
  return structuredClone(chapter);
}

export function validateHoiReconciliation(plan:HoiReconciliationPlan=HOI_RECONCILE_PLAN):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  if(plan.chapters.length!==14) failures.push("chapter-count");
  if(plan.chapters.map(c=>c.ordinal).join(",")!=="1,2,3,4,5,6,7,8,9,10,11,12,13,14") failures.push("chapter-order");
  if(plan.globalSpine.join(" -> ")!=="inherited world -> live problem -> situated inquiry -> public artifact -> uptake and contest -> sediment -> changed later task -> reopening") failures.push("historical-spine-drift");
  for(const c of plan.chapters){
    if(!c.disciplinaryQuestion.trim()) failures.push(`${c.nodeId}:missing-disciplinary-question`);
    if(!c.developmentalMove.trim()) failures.push(`${c.nodeId}:missing-developmental-move`);
    for(const key of ["inheritedWorld","liveProblem","situatedInquiry","publicArtifact","uptakeAndContest","sediment","changedLaterTask","reopening"]){
      if(!(c.wholeInquiryRecovery as any)[key]?.trim()) failures.push(`${c.nodeId}:missing-recovery:${key}`);
    }
    if(!c.noFspRequirement.toLowerCase().includes("fsp") && !c.noFspRequirement.toLowerCase().includes("formal")) failures.push(`${c.nodeId}:missing-no-fsp-rule`);
    if(c.preserve.length===0) failures.push(`${c.nodeId}:missing-preserve-lock`);
  }
  if(plan.modes.length!==3) failures.push("mode-count");
  if(!plan.governance.some(x=>x.includes("Historical prose comes first"))) failures.push("missing-history-first");
  if(!plan.governance.some(x=>x.includes("No-FSP-Course regression"))) failures.push("missing-no-fsp-constitutional-rule");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}

export function noFspCourseAudit(plan:HoiReconciliationPlan=HOI_RECONCILE_PLAN):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  const forbidden=plan.noFspCourse.forbiddenPrerequisiteTerms.map(x=>x.toLowerCase());
  const studentRequiredText=[
    plan.noFspCourse.studentPrerequisite,
    plan.noFspCourse.successCriterion,
    ...plan.chapters.flatMap(c=>[c.disciplinaryQuestion,c.developmentalMove,c.noFspRequirement,...c.studentFacingCompression])
  ].join(" ").toLowerCase();
  for(const term of forbidden){
    if(studentRequiredText.includes(term)) failures.push(`forbidden-student-prerequisite:${term}`);
  }
  if(!plan.noFspCourse.studentPrerequisite.includes("No prior FSP knowledge")) failures.push("fsp-prerequisite-not-explicitly-blocked");
  if(!plan.noFspCourse.successCriterion.includes("without defining FSP")) failures.push("student-success-still-fsp-dependent");
  for(const c of plan.chapters){
    if(/define fsp|fsp state vector|relation graph|projection profile|canonical fingerprint/i.test(c.disciplinaryQuestion)) failures.push(`${c.nodeId}:fsp-in-disciplinary-question`);
  }
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
