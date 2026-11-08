export type ProvenanceEvidenceCode="H"|"C"|"K"|"X"|"P"|"E";

export interface FirewallProvenanceEntry{
  key:string;
  label:string;
  protectedTransition:string;
  recurrentFailure:string;
  lineage:string[];
  crossingWarrant:string[];
  tool:string;
  cases:string[];
  formalImplementation:string[];
  evidence:ProvenanceEvidenceCode[];
  claimCeiling:string;
  failureConditions:string[];
  reopenTriggers:string[];
  canonicalSources:string[];
}

export const EVIDENCE_LABELS:Record<ProvenanceEvidenceCode,string>={
  H:"Historical / philosophical recurrence",
  C:"FSP conceptual reconstruction",
  K:"Worked-case stress",
  X:"Executable / formal implementation",
  P:"Protocol-ready human test",
  E:"External empirical support"
};

export const FIREWALL_PROVENANCE:FirewallProvenanceEntry[]=[
  {
    key:"FW-01",label:"Map ≠ World ≠ Person",
    protectedTransition:"Representation → represented reality or person",
    recurrentFailure:"A description, diagnosis, model, institutional record, ranking, statistic, or narrative is treated as though it exhausts the person or situation.",
    lineage:["Phenomenological attention","Philosophy of representation","Measurement and model criticism","Ethics of personhood","Institutional classification"],
    crossingWarrant:["Triangulate representations","Preserve provenance and uncertainty","Engage the represented person where possible","Keep remainder visible"],
    tool:"Attention / First Map Audit",
    cases:["Ethics Ch1","Gulf Pines resident representation","Inquiry observation and modeling cases"],
    formalImplementation:["Representation/source typing","Provenance fields","Translation remainder","State/history separation"],
    evidence:["H","C","K","X"],
    claimCeiling:"Better representation ≠ final judgment; representation governance ≠ direct access to reality.",
    failureConditions:["The distinction becomes so broad that no representation can support action.","Map becomes a vague synonym for everything cognitive."],
    reopenTriggers:["A domain shows that map/world/person distinctions distort more than clarify.","New representation types require finer distinctions."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-CT-INQUIRY-1","FSP-TRANSLATION-1","FSP-JTS-INTEGRATION-GATE-1"]
  },
  {
    key:"FW-02",label:"Authority approval ≠ sufficient justification",
    protectedTransition:"Authority endorsement → justified claim",
    recurrentFailure:"Law, tradition, status, office, or confidence substitutes for reason-giving.",
    lineage:["Socratic examination","Plato's Euthyphro problem","Argumentation theory","Legitimacy disputes"],
    crossingWarrant:["Provide reasons that explain why the authority ought to approve or promulgate the claim."],
    tool:"Examination / Reason-Giving Audit",
    cases:["Ethics Ch2: Law and the Direction of Justification"],
    formalImplementation:["Claim/evidence/warrant decomposition"],
    evidence:["H","C","K","X"],
    claimCeiling:"Failure of an authority-based justification ≠ proof of the opposite conclusion.",
    failureConditions:["The Firewall is misread as authority never supplying evidence."],
    reopenTriggers:["A domain contains constitutive authority that partly creates the relevant status."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-PRESSBOOK-INSTRUCTOR-IMPLEMENTATION-GUIDE-1","FSP-TRANSLATION-1"]
  },
  {
    key:"FW-03",label:"Formation ≠ justification",
    protectedTransition:"Causal or developmental history → normative warrant",
    recurrentFailure:"Explaining how a belief, habit, value, or practice formed is treated as proving it right or wrong.",
    lineage:["Aristotle on habituation","Genealogy","Sociology of knowledge","Developmental and institutional accounts"],
    crossingWarrant:["Add independent reasons, evidence, or normative premises connecting formation history to present justification."],
    tool:"Formation / Practical-Wisdom Audit",
    cases:["Ethics Ch3","Genealogical comparisons"],
    formalImplementation:["Assembly-history fields remain distinct from warrants and claim ceilings."],
    evidence:["H","C","K"],
    claimCeiling:"Good formation ≠ complete moral warrant; bad origin ≠ present invalidity.",
    failureConditions:["The distinction blocks legitimate evidential relevance of formation history."],
    reopenTriggers:["Formation proves partly constitutive of the norm and needs a more qualified gate."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-PRESSBOOK-INSTRUCTOR-IMPLEMENTATION-GUIDE-1"]
  },
  {
    key:"FW-04",label:"Remaining agency ≠ unlimited responsibility",
    protectedTransition:"Presence of some agency → full responsibility",
    recurrentFailure:"Any residual choice is treated as proof that constraints are morally irrelevant.",
    lineage:["Stoic and Hellenistic control distinctions","Coercion","Disability","Structural constraint","Moral luck"],
    crossingWarrant:["Calibrate actual options, control, foreseeability, coercion, material capability, and role."],
    tool:"Control / Moral Range Audit",
    cases:["Saad Sirop Hanna","Ethics Ch4"],
    formalImplementation:["Agency dimensions","OPEN / CONSTRAINED / BLOCKED diagnostics"],
    evidence:["H","C","K","X"],
    claimCeiling:"Some agency ≠ total responsibility; constraint ≠ zero agency.",
    failureConditions:["The audit collapses into blame elimination or individualistic blame assignment."],
    reopenTriggers:["New evidence changes coercion, capacity, options, or institutional constraint."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-TRANSLATION-1"]
  },
  {
    key:"FW-05",label:"Good purpose ≠ sufficient authorization",
    protectedTransition:"Worthy end → permission for proposed means",
    recurrentFailure:"Common-good or beneficent goals are treated as licensing whatever intervention appears effective.",
    lineage:["Natural-law and common-good reasoning","Proportionality traditions","Public-policy ethics"],
    crossingWarrant:["Establish legitimate standing","Use proportionate and necessary means","Respect rights and capabilities","Specify review conditions"],
    tool:"Moral Authority / Common-Good Audit",
    cases:["Ethics Ch5","Institutional ethics cases"],
    formalImplementation:["Standing / authorization layer","Action-state grammar"],
    evidence:["H","C","K","X"],
    claimCeiling:"A worthy end supplies a reason, not blanket permission.",
    failureConditions:["The gate prevents any practical policy inference from common-good reasoning."],
    reopenTriggers:["Cases require distinct necessity, proportionality, or jurisdiction subtypes."],
    canonicalSources:["FSP-PRESSBOOK-RECONCILIATION-1-AUTH-PROGRESSION","FSP-JTS-INTEGRATION-GATE-1"]
  },
  {
    key:"FW-06",label:"Power ≠ legitimacy",
    protectedTransition:"Ability to compel or control → justified authority",
    recurrentFailure:"Effective control is mistaken for moral or political standing.",
    lineage:["Social-contract theory","Political obligation","Legitimacy","Resistance","Democratic theory"],
    crossingWarrant:["Supply domain-appropriate legitimacy grounds: consent, procedure, reciprocity, rights, jurisdiction, or public justification."],
    tool:"Legitimacy / Standing Audit",
    cases:["Mandela","Ethics Ch6","Gulf Pines authority roles"],
    formalImplementation:["Standing partitions","Authority vs practical power"],
    evidence:["H","C","K","X"],
    claimCeiling:"Illegitimacy ≠ automatic authorization of every resistance strategy.",
    failureConditions:["Legitimacy becomes undefined moral approval."],
    reopenTriggers:["Plural legitimacy theories require explicit local profiles."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-JTS-FL-NURSING-HOME-1","FSP-PRESSBOOK-RECONCILIATION-1-AUTH-PROGRESSION"]
  },
  {
    key:"FW-07",label:"Sympathy ≠ direct access",
    protectedTransition:"Perspective-taking → knowledge of another person's experience",
    recurrentFailure:"Imaginative identification is treated as transparent access.",
    lineage:["Hume","Adam Smith","Phenomenology","Empathy debates","Standpoint and testimony problems"],
    crossingWarrant:["Use testimony and dialogue","Allow repeated correction","Add contextual knowledge","Preserve first-person remainder"],
    tool:"Perspective / Moral Visibility Audit",
    cases:["Ethics Ch7","Gulf Pines resident and family perspectives"],
    formalImplementation:["MY_MAP_OF_OTHER distinction","Said vs inferred","Provenance fields"],
    evidence:["H","C","K","X"],
    claimCeiling:"Improved perspective ≠ complete representation.",
    failureConditions:["The Firewall becomes a reason to discount perspective-taking entirely."],
    reopenTriggers:["New communicative contexts show the direct-access formulation is too strong or too weak."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-PRESSBOOK-RECONCILIATION-1-REMAINDER-PASS"]
  },
  {
    key:"FW-08",label:"Help ≠ authorized agency bypass",
    protectedTransition:"Predicted benefit → permission to decide for another",
    recurrentFailure:"Beneficence becomes paternalistic substitution.",
    lineage:["Kantian respect","Consent","Care ethics","Disability ethics","Medical ethics"],
    crossingWarrant:["Consent","Capacity-sensitive justification","Emergency conditions","Role authority","Least-restrictive means"],
    tool:"Respect / Agency Audit",
    cases:["Leila / adviser","Ethics Ch8"],
    formalImplementation:["Recommendation vs authorization","Standing and agency fields"],
    evidence:["H","C","K","X"],
    claimCeiling:"Respect for autonomy ≠ automatic deference to every present preference.",
    failureConditions:["The gate blocks legitimate protective action in incapacity or emergency cases."],
    reopenTriggers:["Relational autonomy or capacity evidence requires refined crossing conditions."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-PRESSBOOK-RECONCILIATION-1-AUTH-PROGRESSION"]
  },
  {
    key:"FW-09",label:"Benefit ≠ authorization",
    protectedTransition:"Expected welfare gain → permission to impose",
    recurrentFailure:"Aggregate outcome evidence silently resolves standing, liberty, burden, rights, and jurisdiction.",
    lineage:["Bentham","Mill","Liberty","Welfare economics","Public-health ethics"],
    crossingWarrant:["Inspect burden distribution","Respect standing and constraints","Calibrate uncertainty","Secure legitimate authorization and review"],
    tool:"Consequence / Welfare / Harm Audit",
    cases:["Ethics Ch9","Gulf Pines repair policies"],
    formalImplementation:["Action-state grammar","Standing/authorization layer","Claim-ceiling continuity"],
    evidence:["H","C","K","X"],
    claimCeiling:"Largest expected benefit ≠ complete justification.",
    failureConditions:["The gate is used to deny that consequences can ever justify coercive action."],
    reopenTriggers:["Domains show authorization is partly consequence-constituted and needs finer analysis."],
    canonicalSources:["FSP-PRESSBOOK-RECONCILIATION-1-AUTH-PROGRESSION","FSP-JTS-INTEGRATION-GATE-1"]
  },
  {
    key:"FW-10",label:"Origin ≠ validity",
    protectedTransition:"Genealogy or source → truth or justification verdict",
    recurrentFailure:"Genetic explanation substitutes for evaluation.",
    lineage:["Nietzsche","Marx","Genealogy","Genetic-fallacy analysis","Sociology of knowledge"],
    crossingWarrant:["Add a reliability, distortion, incentive, evidential-defect, or normative argument connecting origin to warrant."],
    tool:"Background Power / Genealogy Audit",
    cases:["Ethics Ch10","Institutional category histories"],
    formalImplementation:["Provenance separated from warrants and claim ceilings"],
    evidence:["H","C","K","X"],
    claimCeiling:"Revealing origin can destabilize confidence without proving the opposite conclusion.",
    failureConditions:["Origin history is made irrelevant even when it bears on reliability."],
    reopenTriggers:["Recurring cases require explicit origin-as-evidence subtypes."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-TRANSLATION-1"]
  },
  {
    key:"FW-11",label:"Formal equality ≠ equal practical burden",
    protectedTransition:"Identical rule or procedure → substantive fairness",
    recurrentFailure:"Formally equal treatment masks unequal starting positions or burdens.",
    lineage:["Rawls","Structural inequality","Disability","Institutional fairness"],
    crossingWarrant:["Compare burden, access, opportunity, and reasons for differential impact."],
    tool:"Fair-Structure Audit",
    cases:["Ethics Ch11","Commonwealth Colleges"],
    formalImplementation:["Capability/burden fields","Institutional amplification audits"],
    evidence:["H","C","K"],
    claimCeiling:"Fair-looking procedure ≠ fair structure or outcome.",
    failureConditions:["Every differential outcome is automatically classified as unfair."],
    reopenTriggers:["Alternative fairness theories expose missing structural dimensions."],
    canonicalSources:["FSP-CT-ETHICS-1","FSP-PRESSBOOK-INSTRUCTOR-IMPLEMENTATION-GUIDE-1"]
  },
  {
    key:"FW-12",label:"Resource ≠ capability",
    protectedTransition:"Possession of resource, right, or opportunity → effective freedom",
    recurrentFailure:"Formal provision is treated as proof of usable capability.",
    lineage:["Capability approaches","Care and dependency","Disability","Development ethics"],
    crossingWarrant:["Inspect conversion conditions: health, access, time, safety, support, knowledge, recognition, and feasibility."],
    tool:"Dependency / Effective-Capability Audit",
    cases:["Maathai / Green Belt","Ethics Ch12","Gulf Pines resident burden"],
    formalImplementation:["materialCapability dimension","Repair and capability-effect tracking"],
    evidence:["H","C","K","X"],
    claimCeiling:"Providing a resource ≠ securing effective capability.",
    failureConditions:["Capability becomes an unbounded catch-all."],
    reopenTriggers:["New domains reveal missing conversion factors or competing capability concepts."],
    canonicalSources:["FSP-TRANSLATION-1","FSP-PRESSBOOK-RECONCILIATION-1-REMAINDER-PASS"]
  },
  {
    key:"FW-13",label:"Instrument reading ≠ uninterpreted fact",
    protectedTransition:"Instrument output → observational fact or theoretical quantity",
    recurrentFailure:"Calibration, transformation, noise modeling, and interpretation disappear.",
    lineage:["Galileo","Foucault","Metrology","Experimental science"],
    crossingWarrant:["Preserve calibration chain","State the measurement model","Report uncertainty","Maintain reproducible procedure and provenance"],
    tool:"Measurement / Provenance Audit",
    cases:["Galileo","Foucault light-speed measurement"],
    formalImplementation:["Observation vs inference typing","Source ledgers","Provenance objects"],
    evidence:["H","C","K","X"],
    claimCeiling:"Reliable reading ≠ theory-free fact.",
    failureConditions:["The distinction becomes constructivist overreach denying robust measurement."],
    reopenTriggers:["Automated pipelines require richer provenance fields."],
    canonicalSources:["FSP-CT-INQUIRY-1","FSP-INQUIRY-NARRATIVE-1"]
  },
  {
    key:"FW-14",label:"Anomaly ≠ uniquely located refutation",
    protectedTransition:"Failed prediction or anomaly → one uniquely identified failing assumption",
    recurrentFailure:"Evidence is treated as announcing exactly which component of a theoretical network is false.",
    lineage:["Neptune/Vulcan","Duhem–Quine","Auxiliary-hypothesis problems"],
    crossingWarrant:["Obtain discriminating evidence that rules out alternative error locations."],
    tool:"Alternative / Auxiliary-Assumption Audit",
    cases:["Neptune/Vulcan"],
    formalImplementation:["Claim/warrant/background decomposition","Human-coder trial distinctions"],
    evidence:["H","C","K","X","P"],
    claimCeiling:"Anomaly creates revision pressure, not a uniquely located diagnosis.",
    failureConditions:["Underdetermination is overstated so strongly that evidence can never discriminate."],
    reopenTriggers:["Near-direct falsification cases or new localization measures require qualification."],
    canonicalSources:["FSP-CT-INQUIRY-1","FSP-TRANSLATION-1","FSP-TRANSLATION-12"]
  },
  {
    key:"FW-15",label:"Model success ≠ ontology",
    protectedTransition:"Predictive or explanatory success → unique metaphysical interpretation",
    recurrentFailure:"Empirical success is silently promoted to ontological closure.",
    lineage:["Newton→Einstein","Philosophy of models","Scientific realism debates","Cosmology"],
    crossingWarrant:["Add a domain-appropriate realist or structural argument","Test cross-model robustness","Use eliminative evidence where available"],
    tool:"Model / Claim-Ceiling Audit",
    cases:["Newton→Einstein","DESI"],
    formalImplementation:["Ontology field separated from task/evidence/warrant in claim bundles"],
    evidence:["H","C","K","X"],
    claimCeiling:"Retained usefulness ≠ final ontology.",
    failureConditions:["The gate blocks any justified realist inference."],
    reopenTriggers:["Intervention-rich domains show current ontology warrant is too weak or too strong."],
    canonicalSources:["FSP-CT-INQUIRY-1","FSP-TRANSLATION-1"]
  },
  {
    key:"FW-16",label:"Shared vocabulary ≠ shared conceptual structure",
    protectedTransition:"Same word or phrase → same concept or inferential role",
    recurrentFailure:"Lexical continuity masks framework change.",
    lineage:["Kuhn","Conceptual change","History of science","Translation theory"],
    crossingWarrant:["Compare inferential roles","Compare exemplars","Compare measurement relations and use contexts"],
    tool:"Semantic / Framework Translation Audit",
    cases:["Kuhn and meaning change","Cross-framework translation cases"],
    formalImplementation:["DIRECT / STRUCTURAL / TASK_EQUIVALENT correspondences","Explicit remainder"],
    evidence:["H","C","K","X"],
    claimCeiling:"Meaning change ≠ total incomparability.",
    failureConditions:["Any lexical difference is inflated into semantic rupture."],
    reopenTriggers:["Human-coder or corpus evidence reveals stable equivalence patterns current categories miss."],
    canonicalSources:["FSP-CT-INQUIRY-1","FSP-TRANSLATION-1"]
  },
  {
    key:"FW-17",label:"Probe result ≠ historical fact",
    protectedTransition:"Thought-experimental or simulated result → empirical or historical fact",
    recurrentFailure:"Controlled possibility testing is mistaken for observation or historical reconstruction.",
    lineage:["Galileo","Einstein","Thought experiments","Simulation methodology"],
    crossingWarrant:["Add empirical observation, source evidence, or separate historical documentation."],
    tool:"Controlled-Probe / Counterfactual Audit",
    cases:["Relativity probes","FSP simulations","Thought-experiment cases"],
    formalImplementation:["Probe results typed separately from historical/source ledgers"],
    evidence:["H","C","K","X"],
    claimCeiling:"Possibility or dependency result ≠ actuality.",
    failureConditions:["The gate blocks legitimate evidential roles of validated simulation."],
    reopenTriggers:["Simulation domains show robust surrogate-evidence status requiring finer typing."],
    canonicalSources:["FSP-CT-INQUIRY-1","FSP-INQUIRY-NARRATIVE-1"]
  },
  {
    key:"FW-18",label:"Institutional validation ≠ interpretive closure",
    protectedTransition:"Collaboration, review, or publication acceptance → final interpretation",
    recurrentFailure:"Consensus about data or method becomes consensus about ontology or meaning.",
    lineage:["Large-team science","DESI","Peer review","Replication and collaboration practice"],
    crossingWarrant:["Add interpretation-specific convergent evidence beyond procedural validation."],
    tool:"Institutional Validation / Claim-Ceiling Audit",
    cases:["DESI contemporary cosmology"],
    formalImplementation:["DESI JTS-lite: state, translation, remainder, validation, REOPEN, Return"],
    evidence:["H","C","K"],
    claimCeiling:"Collaboration-wide publication ≠ interpretive unanimity.",
    failureConditions:["Institutional consensus is underweighted even when it is strong evidence."],
    reopenTriggers:["Real collaboration evidence supports finer procedural/statistical/interpretive consensus categories."],
    canonicalSources:["FSP-PRESSBOOK-RECONCILIATION-1-CULMINATION","FSP-CT-INQUIRY-1"]
  },
  {
    key:"FW-19",label:"Translation ≠ identity",
    protectedTransition:"Successful cross-domain mapping → ontological or semantic identity",
    recurrentFailure:"Task-relative correspondence is treated as proof that source and target frameworks mean the same thing.",
    lineage:["Translation theory","Kuhnian change","Interdisciplinary modeling","Pluralism"],
    crossingWarrant:["Require an explicit domain-appropriate equivalence argument beyond task success."],
    tool:"Translation / Remainder Audit",
    cases:["Contested forest","Gulf Pines multi-domain translation"],
    formalImplementation:["DIRECT / STRUCTURAL / TASK_EQUIVALENT mappings","Asymmetric translation","Remainder object"],
    evidence:["C","K","X","P"],
    claimCeiling:"Task success ≠ ontological uniqueness or semantic identity.",
    failureConditions:["Remainder becomes a place to hide chronic translation failure."],
    reopenTriggers:["Human-coder failure or unstable mapping types."],
    canonicalSources:["FSP-TRANSLATION-1","FSP-TRANSLATION-12","FSP-JTS-FL-NURSING-HOME-TRANSLATION-3"]
  },
  {
    key:"FW-20",label:"Coordination ≠ legitimate cooperation",
    protectedTransition:"Behavioral alignment → legitimate joint task",
    recurrentFailure:"Coerced, dominated, or excluded actors are counted as cooperating merely because behavior aligns.",
    lineage:["Political legitimacy","Domination","Labor","Collective action","Social-science agency problems"],
    crossingWarrant:["Require standing, contestability, information access, option visibility, reopenability, material capability, and legitimate task acceptance."],
    tool:"Agency / Anti-Domination Audit",
    cases:["Contested forest","Gulf Pines","Mandela / refusal"],
    formalImplementation:["COOPERATION_POSSIBLE / COORDINATION_ONLY / NO_SHARED_TASK","Six agency dimensions"],
    evidence:["C","K","X"],
    claimCeiling:"Shared behavior ≠ shared legitimate task.",
    failureConditions:["The cooperation standard invisibly encodes one political theory."],
    reopenTriggers:["Cross-cultural evidence shows current agency dimensions are incomplete or biased."],
    canonicalSources:["FSP-TRANSLATION-1","FSP-JTS-FL-NURSING-HOME-1"]
  },
  {
    key:"FW-21",label:"Generate ≠ Recommend ≠ Authorize ≠ Implement",
    protectedTransition:"Option existence → recommendation → permission → action",
    recurrentFailure:"Generated possibilities inherit normative force merely by moving through a system.",
    lineage:["Decision theory","Professional roles","Ethics","Governance","AI-assisted decision systems"],
    crossingWarrant:["Supply separate recommendation reasons","Establish authorization standing","Check feasibility and jurisdiction","Record implementation decision"],
    tool:"Authorization-State Audit",
    cases:["Ethics Ch5–9 progression","Gulf Pines","PFLAB"],
    formalImplementation:["GENERATED → POSSIBLE → RECOMMENDED → AUTHORIZED → IMPLEMENTED → REVIEWED"],
    evidence:["C","K","X"],
    claimCeiling:"Producing or ranking an option does not license action.",
    failureConditions:["The distinctions add bureaucracy without changing consequential decisions."],
    reopenTriggers:["Real workflows expose missing states such as delegation, veto, appeal, or automation."],
    canonicalSources:["FSP-JTS-INTEGRATION-GATE-1","FSP-PRESSBOOK-RECONCILIATION-1-AUTH-PROGRESSION"]
  },
  {
    key:"FW-22",label:"Local usefulness ≠ safe institutional amplification",
    protectedTransition:"Successful local judgment → general rule, metric, default, or infrastructure",
    recurrentFailure:"Context-bound success is standardized beyond its evidential or moral license.",
    lineage:["Institutional design","Policy diffusion","Goodhart-like effects","Implementation science","Regulation"],
    crossingWarrant:["Test portability and scope","Inspect distributional effects","Provide exception handling","Monitor and expire rules","Preserve REOPEN"],
    tool:"Institutional Amplification Audit",
    cases:["Gulf Pines Layer 5","PFLAB"],
    formalImplementation:["Amplification layer","Authorization expiry","Implementation effects returned as evidence"],
    evidence:["C","K","X"],
    claimCeiling:"Local success ≠ population rule.",
    failureConditions:["Institutional learning becomes impossible because every generalization is blocked."],
    reopenTriggers:["Scale effects, exception clusters, metric gaming, or cross-site failure."],
    canonicalSources:["FSP-JTS-FL-NURSING-HOME-INSTITUTIONAL-5","FSP-JTS-INTEGRATION-GATE-1"]
  },
  {
    key:"FW-23",label:"Progressive disclosure ≠ semantic mutation",
    protectedTransition:"Compressed presentation → altered meaning",
    recurrentFailure:"Quick versions silently strengthen, weaken, or collapse canonical distinctions.",
    lineage:["Pedagogy","Interface design","Expert-to-public communication","Formal compression"],
    crossingWarrant:["Regression-test projections against canonical owner","Preserve claim ceilings, standing, remainder, and REOPEN"],
    tool:"Projection / Compression Audit",
    cases:["Quick / Standard / Deep JTS views","Pressbook projections","Public Encyclopedia reader"],
    formalImplementation:["Compression tests","One canonical owner, many projections"],
    evidence:["C","K","X"],
    claimCeiling:"Simpler presentation ≠ license to change the underlying claim.",
    failureConditions:["Fidelity rules make public prose unusably technical."],
    reopenTriggers:["User testing shows the fidelity/usability tradeoff needs a different projection architecture."],
    canonicalSources:["FSP-JTS-INTEGRATION-GATE-1","FSP-CT-PRESSBOOK-COMPRESSION-1"]
  },
  {
    key:"FW-24",label:"REOPEN ≠ rejection / perpetual reconsideration",
    protectedTransition:"Presence of revision conditions → lack of commitment",
    recurrentFailure:"Corrigibility is mistaken either for reversal or endless indecision.",
    lineage:["Fallibilism","Scientific revision","Adaptive governance","Reflective equilibrium"],
    crossingWarrant:["Specify a trigger","Name the changed condition","Target the affected state/layer","Preserve provenance","Give a bounded revision reason"],
    tool:"REOPEN Audit",
    cases:["Gulf Pines","DESI","Ethics Output Cards","Translation protocol"],
    formalImplementation:["REOPEN conditions in state machine","Translation objects","JTS gate","Human-coder protocol"],
    evidence:["C","K","X","P"],
    claimCeiling:"Current judgment can guide action without claiming final closure.",
    failureConditions:["REOPEN causes paralysis or becomes ceremonial."],
    reopenTriggers:["Trigger design proves too sensitive, too inert, or not portable."],
    canonicalSources:["FSP-JTS-INTEGRATION-GATE-1","FSP-TRANSLATION-12","FSP-PRESSBOOK-RECONCILIATION-1"]
  },
  {
    key:"FW-25",label:"Return ≠ summary / restoration",
    protectedTransition:"End of analysis → mere recap or reset",
    recurrentFailure:"Inquiry terminates inside the framework instead of reconnecting to changed lived Doing.",
    lineage:["Pragmatism","Phenomenology","Reflective practice","Action research","FSP Authorial Return"],
    crossingWarrant:["Name next author/actor","State changed conditions and uncertainty","Specify authorized next action","Assign monitoring responsibility"],
    tool:"Return / Authorial Capability Audit",
    cases:["Output Cards","Gulf Pines","DESI","PFLAB"],
    formalImplementation:["Return routes in reader architecture","Bounded-judgment state machine"],
    evidence:["C","K","X"],
    claimCeiling:"Return does not restore the pre-inquiry situation; it re-enters a changed one.",
    failureConditions:["Return becomes an empty closing prompt with no effect on action or authorship."],
    reopenTriggers:["User testing shows Return does not improve next-step clarity."],
    canonicalSources:["FSP-JTS-INTEGRATION-GATE-1","FSP-OUTWARD-VISION-ESSAY-1","FSP-PRESSBOOK-RECONCILIATION-1"]
  },
  {
    key:"FW-26",label:"FSP map ≠ inquiry itself",
    protectedTransition:"Governance architecture → final ontology or universal structure of inquiry",
    recurrentFailure:"FSP becomes the sovereign framework it was designed to resist.",
    lineage:["Fallibilism","Pluralism","Philosophy of models","Reflexive methodology"],
    crossingWarrant:["No automatic universal promotion; scope can strengthen only through continued comparative and empirical evidence."],
    tool:"Meta-Governance / Constitutional REOPEN Audit",
    cases:["Cross-domain comparator","Public reader","Pressbook reconciliation","Translation formalism"],
    formalImplementation:["Freeze records","Regression gates","Versioning","Explicit REOPEN conditions","Protocol precommitment"],
    evidence:["C","K","X","P"],
    claimCeiling:"Coherent architecture ≠ universal validity or empirical superiority.",
    failureConditions:["A domain cannot fit without distortion.","Governance burden exceeds value.","Users cannot contest categories.","External evidence falsifies key operational claims."],
    reopenTriggers:["Domain failure","Empirical harm","Systematic remainder","Standing failure","Formalism capture","Better comparator architecture"],
    canonicalSources:["FSP-REASON-FOR-BEING-3","FSP-TRANSLATION-12","FSP-JTS-INTEGRATION-GATE-1","FSP-OUTWARD-VISION-ESSAY-2-FIREWALL-PROVENANCE"]
  }
];

export function provenanceEntry(key:string):FirewallProvenanceEntry{
  const entry=FIREWALL_PROVENANCE.find(x=>x.key===key);
  if(!entry) throw new Error(`unknown Firewall provenance key: ${key}`);
  return structuredClone(entry);
}

export function evidenceLabels(entry:FirewallProvenanceEntry):string[]{
  return entry.evidence.map(code=>`${code} — ${EVIDENCE_LABELS[code]}`);
}

export function validateFirewallProvenance(entries:FirewallProvenanceEntry[]=FIREWALL_PROVENANCE):string[]{
  const failures:string[]=[];
  if(entries.length!==26) failures.push(`firewall-count:${entries.length}`);
  const keys=new Set<string>();
  for(const x of entries){
    if(keys.has(x.key)) failures.push(`${x.key}:duplicate`);
    keys.add(x.key);
    if(!/^FW-\d{2}$/.test(x.key)) failures.push(`${x.key}:bad-key`);
    if(!x.label.includes("≠")) failures.push(`${x.key}:missing-gate`);
    if(!x.protectedTransition) failures.push(`${x.key}:missing-transition`);
    if(!x.recurrentFailure) failures.push(`${x.key}:missing-failure`);
    if(x.lineage.length===0) failures.push(`${x.key}:missing-lineage`);
    if(x.crossingWarrant.length===0) failures.push(`${x.key}:missing-warrant`);
    if(!x.tool) failures.push(`${x.key}:missing-tool`);
    if(x.cases.length===0) failures.push(`${x.key}:missing-cases`);
    if(x.formalImplementation.length===0) failures.push(`${x.key}:missing-formal`);
    if(x.evidence.length===0) failures.push(`${x.key}:missing-evidence`);
    if(!x.claimCeiling) failures.push(`${x.key}:missing-ceiling`);
    if(x.failureConditions.length===0) failures.push(`${x.key}:missing-failure-conditions`);
    if(x.reopenTriggers.length===0) failures.push(`${x.key}:missing-reopen`);
    if(x.canonicalSources.length===0) failures.push(`${x.key}:missing-sources`);
  }
  return failures.sort();
}

export interface ProvenanceReaderStep{
  id:"WHY"|"LINEAGE"|"WARRANT"|"TOOL"|"CASE"|"FORMAL"|"EVIDENCE"|"CEILING"|"REOPEN"|"RETURN";
  label:string;
}

export const PROVENANCE_READER_STEPS:ProvenanceReaderStep[]=[
  {id:"WHY",label:"Why this gate exists"},
  {id:"LINEAGE",label:"Historical lineage"},
  {id:"WARRANT",label:"Crossing warrant"},
  {id:"TOOL",label:"Tool"},
  {id:"CASE",label:"Worked case"},
  {id:"FORMAL",label:"Formal implementation"},
  {id:"EVIDENCE",label:"Evidence state"},
  {id:"CEILING",label:"Claim ceiling"},
  {id:"REOPEN",label:"REOPEN history"},
  {id:"RETURN",label:"Return"}
];
