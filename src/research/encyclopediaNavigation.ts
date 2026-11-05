import { CanonicalCaseDossier } from "./fiveCaseAtlas";

export type ChapterId =
  | "CH1-DUHEM-QUINE"
  | "CH2-KUHN-MEANING"
  | "CH3-THOUGHT-EXPERIMENTS"
  | "CH4-DIACHRONIC-FORMALISM";

export type AtlasTargetKind =
  | "STATE"
  | "TRANSITION"
  | "PROBE"
  | "SOURCE"
  | "CASE_CLAIM_CEILING";

export interface ChapterSection {
  chapterId:ChapterId;
  sectionId:string;
  title:string;
  summary:string;
  caseIds:string[];
}

export interface NavigationTarget {
  caseId:string;
  kind:AtlasTargetKind;
  targetId:string;
  rationale:string;
}

export interface NavigationBinding {
  sectionId:string;
  targets:NavigationTarget[];
}

export interface ReverseNavigationHit {
  chapterId:ChapterId;
  sectionId:string;
  sectionTitle:string;
  rationale:string;
}

export interface NavigationValidation {
  failures:string[];
  passes:boolean;
}

export const CHAPTER_SECTIONS:ChapterSection[]=[
  {chapterId:"CH1-DUHEM-QUINE",sectionId:"CH1.1",title:"A Failed Prediction Does Not Name Its Culprit",summary:"Duhem–Quine underdetermination and revision-target plurality.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN"]},
  {chapterId:"CH1-DUHEM-QUINE",sectionId:"CH1.2",title:"Neptune and Vulcan: Why No Revision Rule Is Enough",summary:"Successful and failed auxiliary repair.",caseIds:["NEPTUNE-VULCAN"]},
  {chapterId:"CH1-DUHEM-QUINE",sectionId:"CH1.3",title:"Foucault and the Mirage of the Crucial Experiment",summary:"Strong discrimination without ontological uniqueness.",caseIds:["FOUCAULT-LIGHT-SPEED"]},
  {chapterId:"CH1-DUHEM-QUINE",sectionId:"CH1.4",title:"Galileo: Underdetermination Beyond the Laboratory",summary:"Evidence, interpretation, standing, and power.",caseIds:["GALILEO-COPERNICAN"]},
  {chapterId:"CH1-DUHEM-QUINE",sectionId:"CH1.5",title:"DESI and the Contemporary Revision Frontier",summary:"Live model comparison and moving claim ceilings.",caseIds:["DESI-2024-2026"]},

  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.1",title:"What If the Terms Change Too?",summary:"Meaning change as part of theory change.",caseIds:["NEWTON-EINSTEIN","GALILEO-COPERNICAN"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.2",title:"Relativity and the Reconstruction of Familiar Words",summary:"Time, simultaneity, mass, space, and gravity across frameworks.",caseIds:["NEWTON-EINSTEIN"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.3",title:"Translation Without a View From Nowhere",summary:"Task-relative translation and remainder.",caseIds:["NEWTON-EINSTEIN","FOUCAULT-LIGHT-SPEED"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.4",title:"Galileo as a Cross-Generation Translation Problem",summary:"Historical concepts, false friends, and interpretive reconstruction.",caseIds:["GALILEO-COPERNICAN"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.5",title:"Foucault Revisited: What Counts as Wave or Particle?",summary:"Semantic drift across optical and later physical vocabularies.",caseIds:["FOUCAULT-LIGHT-SPEED"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.6",title:"Neptune and Vulcan as Semantic Stability Cases",summary:"Cases where meaning change is less central than auxiliary revision.",caseIds:["NEPTUNE-VULCAN"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.7",title:"DESI: Stable Data, Changing Model Language",summary:"Parameterization, model-relative language, and ontology caution.",caseIds:["DESI-2024-2026"]},
  {chapterId:"CH2-KUHN-MEANING",sectionId:"CH2.8",title:"From Translation to Genealogy",summary:"Historical concept versions, sedimentation, and formation ≠ justification.",caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN"]},

  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.1",title:"Experiments in Which the Apparatus Is Represented",summary:"Thought experiments as controlled revision spaces.",caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.2",title:"Galileo: Imagined Bodies and the Reorganization of a Problem",summary:"Assumption collision in falling-body reasoning.",caseIds:["GALILEO-COPERNICAN"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.3",title:"Einstein: Perspective as an Experimental Variable",summary:"Equivalence principle and local task-equivalence.",caseIds:["NEWTON-EINSTEIN"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.4",title:"Neptune and Vulcan as Counterfactual Revision Worlds",summary:"Model-world generation and empirical follow-up.",caseIds:["NEPTUNE-VULCAN"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.5",title:"Foucault: From Imagined Discrimination to Material Discrimination",summary:"Represent → derive → intervene → observe → revise.",caseIds:["FOUCAULT-LIGHT-SPEED"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.6",title:"DESI as Computational Thought-Experiment Ecology",summary:"Model comparison, simulation, parameter spaces, and empirical constraints.",caseIds:["DESI-2024-2026"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.7",title:"The Perturbation Grammar",summary:"Evidence, auxiliary, warrant, concept, task, standing, and scale perturbation.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"]},
  {chapterId:"CH3-THOUGHT-EXPERIMENTS",sectionId:"CH3.8",title:"FSP-VR as a Laboratory of Controlled Transformation",summary:"Experiential decompression of revision spaces.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"]},

  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.1",title:"From Theory Change to Inquiry-State Change",summary:"Unified inquiry-state object across all cases.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.2",title:"Transition Rather Than Snapshot",summary:"Explicit Δ-vectors across historical transitions.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.3",title:"Meaning as Diachronic Structure",summary:"Concept-version transitions and semantic remainder.",caseIds:["NEWTON-EINSTEIN","GALILEO-COPERNICAN","FOUCAULT-LIGHT-SPEED"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.4",title:"Historical Sedimentation",summary:"Concepts carried through institutions without justification by persistence.",caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.5",title:"Evidence Change Through Time",summary:"Evidence accumulation, reweighting, and provenance.",caseIds:["DESI-2024-2026","FOUCAULT-LIGHT-SPEED"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.6",title:"Thought Experiment as an Operator Over Inquiry States",summary:"Controlled probes over formal states.",caseIds:["GALILEO-COPERNICAN","NEWTON-EINSTEIN","NEPTUNE-VULCAN","FOUCAULT-LIGHT-SPEED","DESI-2024-2026"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.7",title:"Galileo Through the Unified Formalism",summary:"Coupled changes in evidence, meaning, standing, and power.",caseIds:["GALILEO-COPERNICAN"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.8",title:"Relativity Through the Unified Formalism",summary:"Conceptual transformation with preserved structure.",caseIds:["NEWTON-EINSTEIN"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.9",title:"DESI as a Live Diachronic Record",summary:"Open-ended 2024→2025→2026 evidence history.",caseIds:["DESI-2024-2026"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.10",title:"From Epistemology to Connected Inquiry",summary:"Standing, collaboration, coordination, and plural frameworks.",caseIds:["GALILEO-COPERNICAN","DESI-2024-2026"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.11",title:"The Claim Ceiling",summary:"Case-specific bounded conclusions.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"]},
  {chapterId:"CH4-DIACHRONIC-FORMALISM",sectionId:"CH4.12",title:"REOPEN as the Constitutional Principle of Diachronic Inquiry",summary:"Conditions under which settlements reopen.",caseIds:["FOUCAULT-LIGHT-SPEED","NEPTUNE-VULCAN","GALILEO-COPERNICAN","NEWTON-EINSTEIN","DESI-2024-2026"]}
];

export const NAVIGATION_BINDINGS:NavigationBinding[]=[
  {sectionId:"CH1.1",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F0",rationale:"Rival articulated systems before discriminating evidence."},
    {caseId:"NEPTUNE-VULCAN",kind:"STATE",targetId:"NV0",rationale:"Anomaly creates multiple possible revision targets."},
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-NEPTUNE",rationale:"Explicit auxiliary-revision possibility space."}
  ]},
  {sectionId:"CH1.2",targets:[
    {caseId:"NEPTUNE-VULCAN",kind:"TRANSITION",targetId:"NV0-NV1",rationale:"Auxiliary repair opened."},
    {caseId:"NEPTUNE-VULCAN",kind:"TRANSITION",targetId:"NV1-NV2",rationale:"Auxiliary repair supported."},
    {caseId:"NEPTUNE-VULCAN",kind:"TRANSITION",targetId:"NV3-NV4",rationale:"Failed auxiliary repair followed by framework revision."},
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-VULCAN",rationale:"Compare auxiliary retention and deeper framework revision."},
    {caseId:"NEPTUNE-VULCAN",kind:"CASE_CLAIM_CEILING",targetId:"NEPTUNE-VULCAN",rationale:"Blocks universal auxiliary-first rule."}
  ]},
  {sectionId:"CH1.3",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"TRANSITION",targetId:"F0-F1",rationale:"Material result discriminates between represented systems."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"TRANSITION",targetId:"F1-F2",rationale:"Duhemian reconstruction contracts ontological claim."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"PROBE",targetId:"F-PROBE-1",rationale:"Reopen auxiliaries while holding measured relation fixed."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"SOURCE",targetId:"FOUCAULT-SEP",rationale:"Historical/philosophical source."}
  ]},
  {sectionId:"CH1.4",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G1",rationale:"Telescopic evidence changes the inquiry state."},
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G1-G2",rationale:"Inquiry expands into standing and jurisdiction."},
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G2-G3",rationale:"Institutional power constrains action without epistemic demonstration."}
  ]},
  {sectionId:"CH1.5",targets:[
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D0",rationale:"2024 baseline inquiry state."},
    {caseId:"DESI-2024-2026",kind:"TRANSITION",targetId:"D0-D1",rationale:"2025 strengthened combined-data hint."},
    {caseId:"DESI-2024-2026",kind:"TRANSITION",targetId:"D1-D2",rationale:"2026 full-shape result reorganizes frontier."},
    {caseId:"DESI-2024-2026",kind:"CASE_CLAIM_CEILING",targetId:"DESI-2024-2026",rationale:"Live frontier remains unsettled."}
  ]},

  {sectionId:"CH2.1",targets:[
    {caseId:"NEWTON-EINSTEIN",kind:"TRANSITION",targetId:"RE0-RE1",rationale:"Conceptual roles of time/space change."},
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G0-G1",rationale:"Celestial/terrestrial categories shift under new observation."}
  ]},
  {sectionId:"CH2.2",targets:[
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE0",rationale:"Newtonian conceptual baseline."},
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE1",rationale:"Special-relativistic reorganization."},
    {caseId:"NEWTON-EINSTEIN",kind:"TRANSITION",targetId:"RE0-RE1",rationale:"Explicit meaning/ontology/framework transition."}
  ]},
  {sectionId:"CH2.3",targets:[
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE2",rationale:"Local equivalence with tidal remainder."},
    {caseId:"NEWTON-EINSTEIN",kind:"PROBE",targetId:"RE-PROBE-ELEVATOR",rationale:"Task-relative local equivalence without global identity."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F2",rationale:"Historical semantic caution around wave/emission terms."}
  ]},
  {sectionId:"CH2.4",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G0",rationale:"Inherited conceptual vocabulary."},
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G2",rationale:"Changed meanings of demonstration, hypothesis, interpretation, authority."},
    {caseId:"GALILEO-COPERNICAN",kind:"SOURCE",targetId:"GALILEO-SEP",rationale:"Historical reconstruction source."}
  ]},
  {sectionId:"CH2.5",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F0",rationale:"Historically situated wave/emission vocabulary."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F2",rationale:"Cross-generation semantic caution."}
  ]},
  {sectionId:"CH2.6",targets:[
    {caseId:"NEPTUNE-VULCAN",kind:"STATE",targetId:"NV0",rationale:"Planet concept sufficiently stable for auxiliary revision task."},
    {caseId:"NEPTUNE-VULCAN",kind:"STATE",targetId:"NV3",rationale:"Semantic stability does not guarantee repair success."}
  ]},
  {sectionId:"CH2.7",targets:[
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D1",rationale:"Evolving dark energy is parameterized/model-relative language."},
    {caseId:"DESI-2024-2026",kind:"PROBE",targetId:"D-PROBE-COMBINATION",rationale:"Model language and dataset combination jointly affect preference strength."}
  ]},
  {sectionId:"CH2.8",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G0-G1",rationale:"Historical conceptual transition."},
    {caseId:"NEWTON-EINSTEIN",kind:"TRANSITION",targetId:"RE0-RE1",rationale:"Conceptual change with inherited structure."},
    {caseId:"NEWTON-EINSTEIN",kind:"CASE_CLAIM_CEILING",targetId:"NEWTON-EINSTEIN",rationale:"Continuity and discontinuity both bounded."}
  ]},

  {sectionId:"CH3.1",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"PROBE",targetId:"G-PROBE-TELESCOPE",rationale:"Controlled change of cosmological accommodation."},
    {caseId:"NEWTON-EINSTEIN",kind:"PROBE",targetId:"RE-PROBE-ELEVATOR",rationale:"Controlled perspective/frame transformation."}
  ]},
  {sectionId:"CH3.2",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"PROBE",targetId:"G-PROBE-TELESCOPE",rationale:"Atlas proxy for controlled Galileo possibility-space reasoning."},
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G1",rationale:"Evidence and conceptual constraints available to the Galilean inquiry state."}
  ]},
  {sectionId:"CH3.3",targets:[
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE2",rationale:"Equivalence-principle bridge state."},
    {caseId:"NEWTON-EINSTEIN",kind:"PROBE",targetId:"RE-PROBE-ELEVATOR",rationale:"Local equivalence and tidal remainder."}
  ]},
  {sectionId:"CH3.4",targets:[
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-NEPTUNE",rationale:"Counterfactual unseen-body revision world."},
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-VULCAN",rationale:"Competing auxiliary/framework revision worlds."}
  ]},
  {sectionId:"CH3.5",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F0",rationale:"Pre-experimental prediction space."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"TRANSITION",targetId:"F0-F1",rationale:"Material intervention changes comparative standing."}
  ]},
  {sectionId:"CH3.6",targets:[
    {caseId:"DESI-2024-2026",kind:"PROBE",targetId:"D-PROBE-COMBINATION",rationale:"Dataset/model-combination perturbation."},
    {caseId:"DESI-2024-2026",kind:"PROBE",targetId:"D-PROBE-FULLSHAPE",rationale:"BAO-only versus full-shape information perturbation."}
  ]},
  {sectionId:"CH3.7",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"PROBE",targetId:"F-PROBE-1",rationale:"Auxiliary perturbation."},
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-VULCAN",rationale:"Framework/auxiliary perturbation."},
    {caseId:"GALILEO-COPERNICAN",kind:"PROBE",targetId:"G-PROBE-STANDING",rationale:"Standing perturbation."},
    {caseId:"NEWTON-EINSTEIN",kind:"PROBE",targetId:"RE-PROBE-ELEVATOR",rationale:"Scale/frame perturbation."},
    {caseId:"DESI-2024-2026",kind:"PROBE",targetId:"D-PROBE-COMBINATION",rationale:"Evidence/model perturbation."}
  ]},
  {sectionId:"CH3.8",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"PROBE",targetId:"F-PROBE-1",rationale:"Candidate VR discrimination scene."},
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-NEPTUNE",rationale:"Candidate VR revision-world scene."},
    {caseId:"GALILEO-COPERNICAN",kind:"PROBE",targetId:"G-PROBE-STANDING",rationale:"Candidate VR standing/power scene."},
    {caseId:"NEWTON-EINSTEIN",kind:"PROBE",targetId:"RE-PROBE-ELEVATOR",rationale:"Candidate embodied equivalence scene."},
    {caseId:"DESI-2024-2026",kind:"PROBE",targetId:"D-PROBE-FULLSHAPE",rationale:"Candidate temporal evidence-frontier scene."}
  ]},

  {sectionId:"CH4.1",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F1",rationale:"Inquiry-state example."},
    {caseId:"NEPTUNE-VULCAN",kind:"STATE",targetId:"NV3",rationale:"Inquiry-state example."},
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G2",rationale:"Inquiry-state example."},
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE2",rationale:"Inquiry-state example."},
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D2",rationale:"Inquiry-state example."}
  ]},
  {sectionId:"CH4.2",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"TRANSITION",targetId:"F1-F2",rationale:"Explicit Δ example."},
    {caseId:"NEPTUNE-VULCAN",kind:"TRANSITION",targetId:"NV3-NV4",rationale:"Explicit Δ example."},
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G1-G2",rationale:"Explicit Δ example."},
    {caseId:"NEWTON-EINSTEIN",kind:"TRANSITION",targetId:"RE0-RE1",rationale:"Explicit Δ example."},
    {caseId:"DESI-2024-2026",kind:"TRANSITION",targetId:"D1-D2",rationale:"Explicit Δ example."}
  ]},
  {sectionId:"CH4.3",targets:[
    {caseId:"NEWTON-EINSTEIN",kind:"TRANSITION",targetId:"RE0-RE1",rationale:"Primary semantic-change exemplar."},
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G1-G2",rationale:"Interpretive vocabulary changes."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"STATE",targetId:"F2",rationale:"Cross-generation wave/particle caution."}
  ]},
  {sectionId:"CH4.4",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G3",rationale:"Institutional carrier and constraint."},
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE3",rationale:"Later framework sedimented while Newtonian bounded use persists."}
  ]},
  {sectionId:"CH4.5",targets:[
    {caseId:"DESI-2024-2026",kind:"TRANSITION",targetId:"D0-D1",rationale:"Evidence accumulation/reweighting."},
    {caseId:"DESI-2024-2026",kind:"TRANSITION",targetId:"D1-D2",rationale:"New evidence reorganizes earlier frontier."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"TRANSITION",targetId:"F0-F1",rationale:"Single discriminating evidence transition."}
  ]},
  {sectionId:"CH4.6",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"PROBE",targetId:"G-PROBE-STANDING",rationale:"Standing operator example."},
    {caseId:"NEWTON-EINSTEIN",kind:"PROBE",targetId:"RE-PROBE-ELEVATOR",rationale:"Scale/frame operator example."},
    {caseId:"NEPTUNE-VULCAN",kind:"PROBE",targetId:"NV-PROBE-VULCAN",rationale:"Auxiliary/framework operator example."},
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"PROBE",targetId:"F-PROBE-1",rationale:"Auxiliary operator example."},
    {caseId:"DESI-2024-2026",kind:"PROBE",targetId:"D-PROBE-FULLSHAPE",rationale:"Information-structure operator example."}
  ]},
  {sectionId:"CH4.7",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G2",rationale:"Unified Galileo state."},
    {caseId:"GALILEO-COPERNICAN",kind:"TRANSITION",targetId:"G1-G2",rationale:"Coupled evidence/meaning/standing/power transition."},
    {caseId:"GALILEO-COPERNICAN",kind:"CASE_CLAIM_CEILING",targetId:"GALILEO-COPERNICAN",rationale:"Bounded historical claim."}
  ]},
  {sectionId:"CH4.8",targets:[
    {caseId:"NEWTON-EINSTEIN",kind:"STATE",targetId:"RE3",rationale:"Unified relativity endpoint."},
    {caseId:"NEWTON-EINSTEIN",kind:"TRANSITION",targetId:"RE0-RE1",rationale:"Conceptual framework change."},
    {caseId:"NEWTON-EINSTEIN",kind:"CASE_CLAIM_CEILING",targetId:"NEWTON-EINSTEIN",rationale:"Continuity without identity."}
  ]},
  {sectionId:"CH4.9",targets:[
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D0",rationale:"2024 state."},
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D1",rationale:"2025 state."},
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D2",rationale:"2026 state."},
    {caseId:"DESI-2024-2026",kind:"CASE_CLAIM_CEILING",targetId:"DESI-2024-2026",rationale:"Open contemporary ceiling."}
  ]},
  {sectionId:"CH4.10",targets:[
    {caseId:"GALILEO-COPERNICAN",kind:"STATE",targetId:"G2",rationale:"Standing/power/connected-inquiry example."},
    {caseId:"DESI-2024-2026",kind:"STATE",targetId:"D1",rationale:"Large-collaboration/model-comparison example."}
  ]},
  {sectionId:"CH4.11",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"CASE_CLAIM_CEILING",targetId:"FOUCAULT-LIGHT-SPEED",rationale:"Foucault bounded conclusion."},
    {caseId:"NEPTUNE-VULCAN",kind:"CASE_CLAIM_CEILING",targetId:"NEPTUNE-VULCAN",rationale:"Neptune/Vulcan bounded conclusion."},
    {caseId:"GALILEO-COPERNICAN",kind:"CASE_CLAIM_CEILING",targetId:"GALILEO-COPERNICAN",rationale:"Galileo bounded conclusion."},
    {caseId:"NEWTON-EINSTEIN",kind:"CASE_CLAIM_CEILING",targetId:"NEWTON-EINSTEIN",rationale:"Relativity bounded conclusion."},
    {caseId:"DESI-2024-2026",kind:"CASE_CLAIM_CEILING",targetId:"DESI-2024-2026",rationale:"DESI bounded conclusion."}
  ]},
  {sectionId:"CH4.12",targets:[
    {caseId:"FOUCAULT-LIGHT-SPEED",kind:"CASE_CLAIM_CEILING",targetId:"FOUCAULT-LIGHT-SPEED",rationale:"Reopen if historical/auxiliary reconstruction changes."},
    {caseId:"NEPTUNE-VULCAN",kind:"CASE_CLAIM_CEILING",targetId:"NEPTUNE-VULCAN",rationale:"Reopen under new revision comparator/history."},
    {caseId:"GALILEO-COPERNICAN",kind:"CASE_CLAIM_CEILING",targetId:"GALILEO-COPERNICAN",rationale:"Reopen under new source/jurisdiction interpretation."},
    {caseId:"NEWTON-EINSTEIN",kind:"CASE_CLAIM_CEILING",targetId:"NEWTON-EINSTEIN",rationale:"Reopen under new physics or reference theory."},
    {caseId:"DESI-2024-2026",kind:"CASE_CLAIM_CEILING",targetId:"DESI-2024-2026",rationale:"Reopen under new data/models/systematics."}
  ]}
];

function findDossier(caseId:string,dossiers:CanonicalCaseDossier[]):CanonicalCaseDossier{
  const d=dossiers.find(x=>x.caseId===caseId);
  if(!d) throw new Error(`unknown case: ${caseId}`);
  return d;
}

export function validateNavigation(
  dossiers:CanonicalCaseDossier[]
):NavigationValidation{
  const failures:string[]=[];
  const sectionIds=new Set(CHAPTER_SECTIONS.map(s=>s.sectionId));
  const boundSections=new Set(NAVIGATION_BINDINGS.map(b=>b.sectionId));

  for(const section of CHAPTER_SECTIONS){
    if(!boundSections.has(section.sectionId)) failures.push(`${section.sectionId}:unbound-section`);
  }

  for(const binding of NAVIGATION_BINDINGS){
    if(!sectionIds.has(binding.sectionId)) failures.push(`${binding.sectionId}:unknown-section`);
    if(binding.targets.length===0) failures.push(`${binding.sectionId}:no-targets`);

    for(const target of binding.targets){
      let dossier:CanonicalCaseDossier;
      try{ dossier=findDossier(target.caseId,dossiers); }
      catch{ failures.push(`${binding.sectionId}:unknown-case:${target.caseId}`); continue; }

      const exists =
        target.kind==="STATE" ? dossier.states.some(x=>x.stateId===target.targetId) :
        target.kind==="TRANSITION" ? dossier.transitions.some(x=>x.transitionId===target.targetId) :
        target.kind==="PROBE" ? dossier.controlledRevisionProbes.some(x=>x.probeId===target.targetId) :
        target.kind==="SOURCE" ? dossier.sourceLedger.some(x=>x.sourceId===target.targetId) :
        target.kind==="CASE_CLAIM_CEILING" ? target.targetId===dossier.caseId :
        false;

      if(!exists) failures.push(`${binding.sectionId}:missing-${target.kind.toLowerCase()}:${target.caseId}:${target.targetId}`);
    }
  }

  return {failures:[...new Set(failures)].sort(),passes:failures.length===0};
}

export function targetsForSection(sectionId:string):NavigationTarget[]{
  return structuredClone(NAVIGATION_BINDINGS.find(b=>b.sectionId===sectionId)?.targets ?? []);
}

export function sectionsForAtlasTarget(
  caseId:string,
  kind:AtlasTargetKind,
  targetId:string
):ReverseNavigationHit[]{
  return NAVIGATION_BINDINGS.flatMap(binding=>{
    const section=CHAPTER_SECTIONS.find(s=>s.sectionId===binding.sectionId);
    if(!section) return [];
    return binding.targets
      .filter(t=>t.caseId===caseId && t.kind===kind && t.targetId===targetId)
      .map(t=>({
        chapterId:section.chapterId,
        sectionId:section.sectionId,
        sectionTitle:section.title,
        rationale:t.rationale
      }));
  });
}

export function chapterNavigation(chapterId:ChapterId):Array<{
  section:ChapterSection;
  targets:NavigationTarget[];
}>{
  return CHAPTER_SECTIONS
    .filter(s=>s.chapterId===chapterId)
    .map(section=>({section,targets:targetsForSection(section.sectionId)}));
}

export function navigationCoverage():{
  chapterCount:number;
  sectionCount:number;
  boundSectionCount:number;
  targetCount:number;
  reverseNavigableTargetCount:number;
}{
  const uniqueTargets=new Set(
    NAVIGATION_BINDINGS.flatMap(b=>b.targets.map(t=>`${t.caseId}|${t.kind}|${t.targetId}`))
  );
  return {
    chapterCount:new Set(CHAPTER_SECTIONS.map(s=>s.chapterId)).size,
    sectionCount:CHAPTER_SECTIONS.length,
    boundSectionCount:new Set(NAVIGATION_BINDINGS.map(b=>b.sectionId)).size,
    targetCount:NAVIGATION_BINDINGS.reduce((n,b)=>n+b.targets.length,0),
    reverseNavigableTargetCount:uniqueTargets.size
  };
}
