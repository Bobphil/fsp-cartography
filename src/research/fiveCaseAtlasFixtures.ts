import { CanonicalCaseDossier } from "./fiveCaseAtlas";

const fspDqUrl="https://plato.stanford.edu/entries/scientific-underdetermination/";
const duhemUrl="https://plato.stanford.edu/entries/duhem/";
const galileoUrl="https://plato.stanford.edu/entries/galileo/";
const kuhnUrl="https://plato.stanford.edu/entries/thomas-kuhn/";
const relativityUrl="https://www.einstein-online.info/en/spotlight/equivalence_principle/";
const desi2024Url="https://www.desi.lbl.gov/2024/04/04/first-cosmology-results-from-desi-most-precise-measurement-of-the-expanding-universe/";
const desi2025Url="https://newscenter.lbl.gov/2025/03/19/new-desi-results-strengthen-hints-that-dark-energy-may-evolve/";
const desi2026Url="https://www.desi.lbl.gov/2026/07/30/new-desi-dr2-lyman-alpha-results-shed-light-on-dark-energy/";

export const foucaultDossier:CanonicalCaseDossier={
  caseId:"FOUCAULT-LIGHT-SPEED",
  title:"Foucault Light-Speed Experiment: Discrimination Without Ontological Uniqueness",
  canonicalQuestion:"What did Foucault's air/water light-speed result discriminate, and what did it not uniquely establish?",
  philosophicalRole:[
    "Duhemian critique of crucial experiments",
    "evidence-to-theory licensing",
    "claim-ceiling discipline",
    "historical translation warning for wave/particle vocabulary"
  ],
  states:[
    {
      stateId:"F0",caseId:"FOUCAULT-LIGHT-SPEED",ordinal:0,periodLabel:"Pre-experiment rival systems",
      doing:["compare rival optical systems through a discriminating propagation-speed test"],
      claims:["emission and wave systems license opposite air/water speed relations"],
      evidence:["established refraction phenomena","available optical measurements"],
      warrants:["derive medium-speed relation from each articulated optical system"],
      auxiliaries:["instrument can compare propagation speeds across media","relevant media conditions are controlled"],
      background:["nineteenth-century optical theory landscape"],
      meanings:["wave and emission are historically situated optical-system terms"],
      ontology:["rival represented wave-medium and emission/corpuscular commitments"],
      task:["discriminate the currently articulated optical systems"],
      standing:["experimental physicists","optical theorists"],
      powerAuthority:["experimental result can shift scientific standing but does not create logical ontological uniqueness"],
      livePossibilities:["wave-system prediction","emission-system prediction","unarticulated alternative optical systems"],
      remainder:["whether all possible emission-like reconstructions are excluded"],
      claimCeiling:["a discriminating result could favor one articulated system without proving ontological uniqueness"],
      framework:["classical rival optical systems"],sourceIds:["FOUCAULT-SEP"]
    },
    {
      stateId:"F1",caseId:"FOUCAULT-LIGHT-SPEED",ordinal:1,periodLabel:"Foucault result",
      doing:["measure relative light speed in air and water"],
      claims:["light travels more slowly in water than in air under the experimental comparison"],
      evidence:["Foucault measurement favors the wave-system predicted relation"],
      warrants:["observed relation discriminates between the represented rival predictions"],
      auxiliaries:["measurement apparatus is adequate","controlled comparison is relevant to the rival predictions"],
      background:["wave/emission systems remain the principal comparison set"],
      meanings:["wave/emission labels still refer to nineteenth-century systems"],
      ontology:["wave-system gains comparative support; emission-system loses standing"],
      task:["update the rival-system comparison"],
      standing:["experimental result has high evidential standing"],
      powerAuthority:["comparative evidential success increases authority but does not entail metaphysical closure"],
      livePossibilities:["wave system","reconstructed alternatives beyond the original binary"],
      remainder:["what other theoretical structures could accommodate the observed speed relation"],
      claimCeiling:["the result strongly discriminates against the represented emission system; it does not prove that light is uniquely and finally ontologically wave-like"],
      framework:["post-Foucault classical optics"],sourceIds:["FOUCAULT-SEP","DUHEM-SEP"]
    },
    {
      stateId:"F2",caseId:"FOUCAULT-LIGHT-SPEED",ordinal:2,periodLabel:"Duhemian retrospective reconstruction",
      doing:["reconstruct why a successful discriminating experiment is not a logically final crucial experiment"],
      claims:["the tested prediction depended on a larger theoretical conjunction"],
      evidence:["historical Foucault result","logical structure of theory testing"],
      warrants:["failed/favored prediction does not isolate every possible ontology"],
      auxiliaries:["alternative theoretical reconstructions remain logically possible"],
      background:["Duhemian holism about physical-theory testing"],
      meanings:["particle/wave vocabulary must not be projected uncritically into later quantum usage"],
      ontology:["ontological uniqueness remains underdetermined by the single experiment"],
      task:["separate discriminating success from ontological promotion"],
      standing:["historical-philosophical reconstruction"],
      powerAuthority:["successful textbook narrative does not itself authorize a stronger claim ceiling"],
      livePossibilities:["comparative wave victory","broader later electromagnetic reconstruction","historical semantic reinterpretation"],
      remainder:["relation between nineteenth-century categories and later theories of light"],
      claimCeiling:["Foucault is a strong comparative discriminator within the represented nineteenth-century systems, not a proof that every alternative ontology is impossible"],
      framework:["FSP Duhem–Quine reconstruction"],sourceIds:["FOUCAULT-SEP","DUHEM-SEP"]
    }
  ],
  transitions:[
    {
      transitionId:"F0-F1",caseId:"FOUCAULT-LIGHT-SPEED",fromStateId:"F0",toStateId:"F1",
      changedDimensions:["E","W","X","GAMMA"],description:"Physical measurement breaks the predictive tie between the represented rival systems.",
      preserved:["comparison task","instrumental discrimination structure"],gained:["observed slower-in-water relation","comparative support for wave system"],
      lostOrRejected:["equal standing of the represented emission prediction"],unresolved:["ontological uniqueness","future theoretical alternatives"],sourceIds:["FOUCAULT-SEP"]
    },
    {
      transitionId:"F1-F2",caseId:"FOUCAULT-LIGHT-SPEED",fromStateId:"F1",toStateId:"F2",
      changedDimensions:["W","B","M","O","R","GAMMA"],description:"Duhemian reconstruction contracts the metaphysical claim while preserving the experimental discrimination.",
      preserved:["experimental result","comparative defeat of represented emission system"],gained:["explicit holism","translation/semantic caution"],
      lostOrRejected:["crucial-experiment finality"],unresolved:["later theory relation to historical wave/particle categories"],sourceIds:["FOUCAULT-SEP","DUHEM-SEP"]
    }
  ],
  controlledRevisionProbes:[
    {
      probeId:"F-PROBE-1",caseId:"FOUCAULT-LIGHT-SPEED",stateId:"F1",
      holdFixed:["measured relative speed relation"],vary:["auxiliary assumptions linking emission ontology to predicted medium speed"],
      constraints:["do not alter the observed result"],candidateConsequences:["original emission system remains disfavored","a reconstructed alternative may evade the original prediction"],
      remainder:["whether a reconstructed rival remains scientifically viable"],claimCeiling:"Changing auxiliaries can reopen logical possibility without restoring equal empirical standing automatically."
    }
  ],
  sourceLedger:[
    {sourceId:"FOUCAULT-SEP",title:"Underdetermination of Scientific Theory",sourceType:"REFERENCE",url:fspDqUrl,supports:["Foucault air/water prediction contrast","Duhemian crucial-experiment analysis"]},
    {sourceId:"DUHEM-SEP",title:"Pierre Duhem",sourceType:"REFERENCE",url:duhemUrl,supports:["physical-theory holism","critique of crucial experiments"]}
  ],
  caseClaimCeiling:["Foucault strongly discriminated between articulated rival optical systems without logically establishing one unique final ontology of light."],
  mayNotInfer:["modern photon language is identical to nineteenth-century emission theory","one discriminating experiment proves all alternative ontologies impossible"],
  reopenConditions:["new historical reconstruction of the rival systems","new analysis of auxiliary dependence","cross-generation semantic comparison"]
};

export const neptuneVulcanDossier:CanonicalCaseDossier={
  caseId:"NEPTUNE-VULCAN",
  title:"Neptune and Vulcan: Successful and Failed Auxiliary Repair",
  canonicalQuestion:"Why can the same auxiliary-first revision strategy succeed for one anomaly and fail for another?",
  philosophicalRole:["Duhem–Quine revision targeting","auxiliary repair","minimal-mutilation limits","framework replacement"],
  states:[
    {
      stateId:"NV0",caseId:"NEPTUNE-VULCAN",ordinal:0,periodLabel:"Uranus anomaly under Newtonian celestial mechanics",
      doing:["reconcile Uranus's observed motion with Newtonian celestial mechanics"],
      claims:["known-body Newtonian model does not fully capture Uranus's observed orbit"],
      evidence:["persistent orbital discrepancy"],
      warrants:["Newtonian perturbation calculations connect unseen mass distributions to orbital effects"],
      auxiliaries:["known gravitating bodies exhaust relevant perturbing planets"],
      background:["Newtonian celestial mechanics is highly successful"],
      meanings:["planet as gravitating solar-system body"],
      ontology:["Newtonian forces and planetary bodies"],
      task:["explain Uranus anomaly while preserving successful celestial mechanics if warranted"],
      standing:["astronomers","mathematical physicists"],
      powerAuthority:["predictive success gives Newtonian framework high but defeasible authority"],
      livePossibilities:["measurement error","auxiliary unseen planet","deeper dynamics revision"],
      remainder:["which revision target is warranted"],
      claimCeiling:["the anomaly creates revision pressure but does not identify its unique target"],
      framework:["Newtonian celestial mechanics"],sourceIds:["UNDERDET-SEP"]
    },
    {
      stateId:"NV1",caseId:"NEPTUNE-VULCAN",ordinal:1,periodLabel:"Unseen-planet auxiliary revision",
      doing:["compute whether an additional planet could account for Uranus's perturbation"],
      claims:["an unseen outer planet could produce the observed discrepancy"],
      evidence:["Uranus anomaly plus Newtonian perturbation calculations"],
      warrants:["if Newtonian dynamics is retained, a suitably located mass predicts specific perturbations"],
      auxiliaries:["additional unseen planet exists"],
      background:["retain Newtonian framework provisionally"],
      meanings:["planet concept preserved"],
      ontology:["Newtonian forces plus candidate new body"],
      task:["generate a discriminating location/prediction for auxiliary repair"],
      standing:["mathematical prediction gains testable standing"],
      powerAuthority:["successful framework history licenses investigation, not immunity"],
      livePossibilities:["candidate Neptune","alternative auxiliary explanations","deeper revision"],
      remainder:["observational confirmation pending"],
      claimCeiling:["auxiliary repair is a live candidate, not yet established"],
      framework:["Newtonian celestial mechanics"],sourceIds:["UNDERDET-SEP"]
    },
    {
      stateId:"NV2",caseId:"NEPTUNE-VULCAN",ordinal:2,periodLabel:"Neptune observational success",
      doing:["compare predicted new-body consequences with observation"],
      claims:["the additional-planet repair receives strong evidential support"],
      evidence:["observational identification of Neptune in the predicted search context"],
      warrants:["novel predictive success supports the repaired Newtonian task structure"],
      auxiliaries:["Neptune is an actual perturbing body"],
      background:["Newtonian dynamics retained"],
      meanings:["planet concept remains stable enough for the task"],
      ontology:["Newtonian framework plus Neptune"],
      task:["explain Uranus anomaly"],
      standing:["auxiliary repair gains strong standing"],
      powerAuthority:["success increases framework confidence but does not prove global ontological uniqueness"],
      livePossibilities:["Newtonian repaired model"],
      remainder:["broader limits of Newtonian gravitation"],
      claimCeiling:["Neptune supports this auxiliary repair; it does not prove Newtonian gravity universally final"],
      framework:["successful Newtonian auxiliary repair"],sourceIds:["UNDERDET-SEP"]
    },
    {
      stateId:"NV3",caseId:"NEPTUNE-VULCAN",ordinal:3,periodLabel:"Mercury anomaly and Vulcan hypothesis",
      doing:["reuse an unseen-planet repair strategy for Mercury's anomalous perihelion"],
      claims:["an intra-Mercurial body might account for the discrepancy"],
      evidence:["Mercury perihelion anomaly","unsuccessful search trajectory for Vulcan"],
      warrants:["structural analogy to successful planetary perturbation repair"],
      auxiliaries:["candidate Vulcan exists"],
      background:["Newtonian framework still highly successful"],
      meanings:["planet concept retained","anomaly now tests limits of successful repair heuristic"],
      ontology:["Newtonian gravity plus hypothetical Vulcan"],
      task:["explain Mercury anomaly"],
      standing:["Vulcan auxiliary loses standing as evidential trajectory fails"],
      powerAuthority:["past success of an auxiliary strategy cannot authorize its indefinite reuse"],
      livePossibilities:["alternative Newtonian repairs","deeper gravitational revision"],
      remainder:["what deeper change explains Mercury while preserving prior successes"],
      claimCeiling:["the auxiliary-first strategy is not methodologically mandatory merely because Neptune succeeded"],
      framework:["strained Newtonian celestial mechanics"],sourceIds:["UNDERDET-SEP"]
    },
    {
      stateId:"NV4",caseId:"NEPTUNE-VULCAN",ordinal:4,periodLabel:"General-relativistic framework revision",
      doing:["reconstruct gravitation and explain Mercury within a changed spacetime/gravity framework"],
      claims:["Mercury's anomaly can be explained without Vulcan through general relativity"],
      evidence:["Mercury perihelion fit within general relativity plus broader relativistic successes"],
      warrants:["new gravitational framework changes the relevant dynamical structure"],
      auxiliaries:["Vulcan not required"],
      background:["Newtonian theory remains useful in bounded regimes"],
      meanings:["gravity and spacetime acquire changed theoretical roles"],
      ontology:["gravitational geometry/spacetime structure rather than unchanged Newtonian force ontology"],
      task:["explain Mercury while preserving appropriate limiting successes"],
      standing:["framework revision gains standing"],
      powerAuthority:["framework replacement is warranted by a broader evidential/explanatory trajectory, not by anomaly alone"],
      livePossibilities:["general relativity","future deeper gravitational frameworks"],
      remainder:["ultimate ontology of gravitation","future regime limits"],
      claimCeiling:["Vulcan's failure and relativity's success show that auxiliary repair can fail and deeper revision can become warranted; no universal auxiliary-first rule follows"],
      framework:["general relativity with Newtonian limiting applicability"],sourceIds:["KUHN-SEP","REL-EINSTEIN"]
    }
  ],
  transitions:[
    {transitionId:"NV0-NV1",caseId:"NEPTUNE-VULCAN",fromStateId:"NV0",toStateId:"NV1",changedDimensions:["A","X","GAMMA"],description:"Revision pressure is directed to an auxiliary rather than the core framework.",preserved:["Newtonian framework","task"],gained:["unseen-planet candidate"],lostOrRejected:["known-bodies-exhaust-system auxiliary"],unresolved:["observational confirmation"],sourceIds:["UNDERDET-SEP"]},
    {transitionId:"NV1-NV2",caseId:"NEPTUNE-VULCAN",fromStateId:"NV1",toStateId:"NV2",changedDimensions:["E","W","A","X","GAMMA"],description:"Observational success upgrades the auxiliary repair.",preserved:["Newtonian framework"],gained:["Neptune evidence","novel predictive success"],lostOrRejected:["unconfirmed status of additional planet"],unresolved:["global limits of Newtonian gravity"],sourceIds:["UNDERDET-SEP"]},
    {transitionId:"NV2-NV3",caseId:"NEPTUNE-VULCAN",fromStateId:"NV2",toStateId:"NV3",changedDimensions:["D","E","A","X","GAMMA"],description:"A superficially similar anomaly receives the same repair strategy but a different evidential trajectory.",preserved:["Newtonian framework","unseen-planet repair heuristic"],gained:["Mercury/Vulcan test case"],lostOrRejected:["automatic transfer of Neptune success"],unresolved:["Mercury explanation"],sourceIds:["UNDERDET-SEP"]},
    {transitionId:"NV3-NV4",caseId:"NEPTUNE-VULCAN",fromStateId:"NV3",toStateId:"NV4",changedDimensions:["W","B","M","O","X","R","GAMMA","F"],description:"Failed auxiliary repair is followed by a deeper gravitational framework revision.",preserved:["many bounded Newtonian predictive successes"],gained:["relativistic gravitation","new conceptual organization"],lostOrRejected:["Vulcan requirement","universal Newtonian gravitational framework"],unresolved:["future gravitational theory limits"],sourceIds:["KUHN-SEP","REL-EINSTEIN"]}
  ],
  controlledRevisionProbes:[
    {probeId:"NV-PROBE-NEPTUNE",caseId:"NEPTUNE-VULCAN",stateId:"NV0",holdFixed:["Newtonian dynamics provisionally"],vary:["known gravitating bodies"],constraints:["new body must generate discriminating orbital consequences"],candidateConsequences:["auxiliary repair predicts search region","failure would return pressure to frontier"],remainder:["whether auxiliary exists"],claimCeiling:"A minimally disruptive auxiliary repair is worth testing, not automatically preferring."},
    {probeId:"NV-PROBE-VULCAN",caseId:"NEPTUNE-VULCAN",stateId:"NV3",holdFixed:["Mercury anomaly"],vary:["retain Newtonian framework vs revise gravity framework"],constraints:["candidate must explain anomaly without unacceptable new liabilities"],candidateConsequences:["Vulcan route loses standing","framework revision becomes more live"],remainder:["which deeper theory will survive broader tests"],claimCeiling:"Past success of the same revision topology does not determine the current revision target."}
  ],
  sourceLedger:[
    {sourceId:"UNDERDET-SEP",title:"Underdetermination of Scientific Theory",sourceType:"REFERENCE",url:fspDqUrl,supports:["Neptune/Vulcan contrast","Duhemian revision underdetermination"]},
    {sourceId:"KUHN-SEP",title:"Thomas Kuhn",sourceType:"REFERENCE",url:kuhnUrl,supports:["Newton-to-Einstein conceptual change"]},
    {sourceId:"REL-EINSTEIN",title:"The elevator, the rocket, and gravity: the equivalence principle",sourceType:"REFERENCE",url:relativityUrl,supports:["special-to-general relativity relation","local equivalence and tidal remainder"]}
  ],
  caseClaimCeiling:["Neptune shows successful auxiliary repair; Vulcan shows that structurally similar repair can fail; the pair blocks any simple rule that anomalies should always be handled by the least disruptive target."],
  mayNotInfer:["auxiliary repair is always rationally prior","failed auxiliary repair logically forces one unique framework replacement","Neptune proves Newtonian ontology globally true"],
  reopenConditions:["new historical evidence about prediction/search history","new comparator for revision reasons","alternative reconstruction of Mercury anomaly handling"]
};

export const galileoDossier:CanonicalCaseDossier={
  caseId:"GALILEO-COPERNICAN",
  title:"Galileo: Evidence, Meaning, Standing, and Institutional Power",
  canonicalQuestion:"How did observational evidence, conceptual change, interpretive standing, and institutional power interact in the Copernican controversy?",
  philosophicalRole:["evidence underdetermination","meaning change","standing and jurisdiction","power/authority distinction","institutional sedimentation"],
  states:[
    {
      stateId:"G0",caseId:"GALILEO-COPERNICAN",ordinal:0,periodLabel:"Inherited Aristotelian-Ptolemaic order",
      doing:["interpret celestial and terrestrial motion within inherited natural-philosophical and theological institutions"],
      claims:["terrestrial/celestial domains are organized through inherited Aristotelian-Ptolemaic categories"],
      evidence:["naked-eye astronomy","traditional physical observations"],
      warrants:["accepted natural-philosophical and mathematical practices"],
      auxiliaries:["instrument-mediated celestial appearances have limited standing before validation"],
      background:["scholastic natural philosophy","ecclesiastical interpretive structures"],
      meanings:["motion","heavens","planet","demonstration","hypothesis are historically situated terms"],
      ontology:["terrestrial/celestial distinction","traditional cosmological order"],
      task:["explain celestial and terrestrial phenomena within inherited categories"],
      standing:["natural philosophers","mathematicians","theological authorities"],
      powerAuthority:["epistemic and institutional jurisdictions overlap but are not identical"],
      livePossibilities:["Ptolemaic/Aristotelian order","alternative mathematical arrangements"],
      remainder:["status of new instruments and physical Earth motion"],
      claimCeiling:["inherited framework has strong institutional and intellectual standing but remains revisable"],
      framework:["Aristotelian-Ptolemaic natural philosophy"],sourceIds:["GALILEO-SEP"]
    },
    {
      stateId:"G1",caseId:"GALILEO-COPERNICAN",ordinal:1,periodLabel:"Telescopic observations 1609–1613",
      doing:["validate and use telescope to investigate celestial phenomena"],
      claims:["Moon has terrestrial-like features; Jupiter has satellites; Venus has phases; celestial mutability is empirically supported"],
      evidence:["telescopic observations","instrument validation and replication by others"],
      warrants:["reliable instrument-mediated observations can revise cosmological constraints"],
      auxiliaries:["telescope reliably reveals celestial structure"],
      background:["Copernican hypothesis becomes more physically plausible"],
      meanings:["celestial/terrestrial contrast begins to shift"],
      ontology:["heavens appear less categorically distinct from terrestrial matter"],
      task:["assess implications of telescopic evidence for cosmological/physical systems"],
      standing:["instrumental observation gains standing"],
      powerAuthority:["Galileo gains scientific prestige; institutional authority remains distinct"],
      livePossibilities:["Copernican-compatible physics","Tychonic alternatives","revised geocentric arrangements"],
      remainder:["direct proof of Earth's motion","relation of observations to full Copernican system"],
      claimCeiling:["telescopic evidence strongly constrains older cosmologies and supports Copernican plausibility without by itself demonstrating the entire Copernican system"],
      framework:["transitional early-modern astronomy/natural philosophy"],sourceIds:["GALILEO-SEP"]
    },
    {
      stateId:"G2",caseId:"GALILEO-COPERNICAN",ordinal:2,periodLabel:"Interpretive and jurisdictional dispute 1613–1616",
      doing:["negotiate relations among natural evidence, scriptural interpretation, mathematics, and institutional jurisdiction"],
      claims:["apparent conflict between Scripture and nature may arise through interpretation"],
      evidence:["telescopic evidence","physical/mathematical arguments","theological texts and interpretive traditions"],
      warrants:["different domains require disciplined interpretation; truth cannot genuinely contradict truth"],
      auxiliaries:["Copernicanism's evidential status remains contested","demonstration threshold matters"],
      background:["Church scrutiny of Copernicanism"],
      meanings:["demonstration","hypothesis","interpretation","authority shift across domains"],
      ontology:["cosmological question remains open under institutional constraint"],
      task:["determine permissible epistemic and interpretive standing of Copernican claims"],
      standing:["Galileo","mathematicians/natural philosophers","theologians/ecclesiastical authorities"],
      powerAuthority:["formal ecclesiastical authority can constrain publication/teaching independently of evidential standing"],
      livePossibilities:["Copernican realism","instrumental/mathematical use","alternative systems"],
      remainder:["what counts as demonstration sufficient to alter inherited interpretation"],
      claimCeiling:["the dispute cannot be reduced to empirical science versus religion; standing and interpretive jurisdiction are part of the historical inquiry state"],
      framework:["Copernican controversy within early-modern institutions"],sourceIds:["GALILEO-SEP"]
    },
    {
      stateId:"G3",caseId:"GALILEO-COPERNICAN",ordinal:3,periodLabel:"Dialogue, trial, and condemnation 1632–1633",
      doing:["publish and defend a comparison of world systems under negotiated censorship and institutional power"],
      claims:["Dialogue strongly favors Earth's motion while navigating formal constraints"],
      evidence:["accumulated astronomy and physics arguments"],
      warrants:["comparative explanatory and physical reasoning"],
      auxiliaries:["publication permissions and prior injunction history become practically decisive"],
      background:["Counter-Reformation ecclesiastical/legal setting"],
      meanings:["scientific argument and permissible advocacy become institutionally entangled"],
      ontology:["Copernican physical interpretation remains institutionally constrained"],
      task:["evaluate and communicate world-system claims under authority boundaries"],
      standing:["Galileo's scientific standing remains high; ecclesiastical legal authority has coercive power"],
      powerAuthority:["practical power and epistemic authority diverge sharply"],
      livePossibilities:["continued scientific development under constraint","institutional suppression","later reevaluation"],
      remainder:["historical allocation of responsibility","later scientific vindication does not erase contextual complexity"],
      claimCeiling:["the 1633 outcome is an institutional/legal settlement, not an epistemic demonstration of geocentrism"],
      framework:["Galilean science under institutional constraint"],sourceIds:["GALILEO-SEP"]
    }
  ],
  transitions:[
    {transitionId:"G0-G1",caseId:"GALILEO-COPERNICAN",fromStateId:"G0",toStateId:"G1",changedDimensions:["D","E","W","A","M","O","X","GAMMA"],description:"Validated telescopic observations alter the evidential and conceptual landscape.",preserved:["need for interpretation","mathematical astronomy"],gained:["new celestial evidence","instrumental standing"],lostOrRejected:["strictly immutable/qualitatively separate heavens as unpressured default"],unresolved:["Earth's motion","full system choice"],sourceIds:["GALILEO-SEP"]},
    {transitionId:"G1-G2",caseId:"GALILEO-COPERNICAN",fromStateId:"G1",toStateId:"G2",changedDimensions:["W","B","M","T","S","P","X","R","GAMMA"],description:"The inquiry expands from observations to questions of demonstration, interpretation, and jurisdiction.",preserved:["telescopic evidence"],gained:["explicit standing/jurisdiction problem"],lostOrRejected:["idea that evidence alone exhausts the dispute"],unresolved:["demonstration threshold","interpretive authority boundaries"],sourceIds:["GALILEO-SEP"]},
    {transitionId:"G2-G3",caseId:"GALILEO-COPERNICAN",fromStateId:"G2",toStateId:"G3",changedDimensions:["D","S","P","X","GAMMA"],description:"Institutional/legal power constrains communication and action without settling the epistemic question.",preserved:["scientific arguments","Copernican controversy"],gained:["formal trial outcome"],lostOrRejected:["unconstrained advocacy"],unresolved:["historical justification of authority exercise","later science/institution relation"],sourceIds:["GALILEO-SEP"]}
  ],
  controlledRevisionProbes:[
    {probeId:"G-PROBE-TELESCOPE",caseId:"GALILEO-COPERNICAN",stateId:"G1",holdFixed:["telescopic observations"],vary:["cosmological system used to accommodate them"],constraints:["must preserve phases of Venus and Jovian satellites"],candidateConsequences:["some inherited cosmologies lose viability","Copernican plausibility increases","not every alternative system is eliminated"],remainder:["direct Earth-motion demonstration"],claimCeiling:"Observation can constrain a theory space without uniquely selecting a complete cosmology."},
    {probeId:"G-PROBE-STANDING",caseId:"GALILEO-COPERNICAN",stateId:"G2",holdFixed:["same empirical observations"],vary:["who has standing to interpret cosmological and scriptural implications"],constraints:["do not equate coercive jurisdiction with epistemic truth"],candidateConsequences:["different permissible claims/actions","same evidence can have different institutional consequences"],remainder:["legitimate boundary between epistemic and institutional authority"],claimCeiling:"Standing and power affect inquiry conditions without determining truth."}
  ],
  sourceLedger:[
    {sourceId:"GALILEO-SEP",title:"Galileo Galilei",sourceType:"REFERENCE",url:galileoUrl,supports:["telescopic observations","Copernican advocacy","1616/1633 institutional context","conceptual transformation of motion and matter"]}
  ],
  caseClaimCeiling:["Galileo's case is best represented as a coupled change in evidence, concepts, standing, and institutional power; later scientific judgment does not justify a simplistic science-versus-religion reconstruction."],
  mayNotInfer:["institutional condemnation proved geocentrism","telescopic observations alone logically demonstrated the entire Copernican system","power and truth are the same thing"],
  reopenConditions:["new primary-source interpretation","new reconstruction of instrument validation","new analysis of jurisdiction/standing"]
};

export const relativityDossier:CanonicalCaseDossier={
  caseId:"NEWTON-EINSTEIN",
  title:"Newton to Einstein: Framework Change with Preserved Limiting Structure",
  canonicalQuestion:"How can a later theory reorganize core meanings and ontology while preserving important empirical structure from an earlier framework?",
  philosophicalRole:["Kuhnian meaning change","translation with remainder","framework revision","thought experiment","local/global scale dependence"],
  states:[
    {
      stateId:"RE0",caseId:"NEWTON-EINSTEIN",ordinal:0,periodLabel:"Newtonian classical framework",
      doing:["model motion, force, gravitation, space, and time through classical mechanics"],
      claims:["time and space support Newtonian kinematics and universal gravitation"],
      evidence:["classical mechanical and astronomical successes"],
      warrants:["Newtonian laws connect forces, masses, and motions"],
      auxiliaries:["classical simultaneity and low-velocity regime"],
      background:["absolute/structured classical spacetime assumptions"],
      meanings:["mass, time, space, force have Newtonian inferential roles"],
      ontology:["Newtonian bodies, forces, and classical spacetime structure"],
      task:["predict and explain motion and gravitation"],
      standing:["Newtonian mechanics is exemplary successful physics"],
      powerAuthority:["paradigm success shapes standards of good explanation"],
      livePossibilities:["normal-science extensions","future revisions under anomaly or new principles"],
      remainder:["high-velocity/electromagnetic compatibility","deeper gravity account"],
      claimCeiling:["Newtonian mechanics is highly successful within its represented regime"],
      framework:["Newtonian mechanics/gravity"],sourceIds:["KUHN-SEP","SPACETIME-SEP"]
    },
    {
      stateId:"RE1",caseId:"NEWTON-EINSTEIN",ordinal:1,periodLabel:"Special relativity 1905",
      doing:["reconstruct kinematics around relativity principles and light propagation"],
      claims:["spatially separated simultaneity is frame/procedure dependent; Newtonian temporal structure is not retained unchanged"],
      evidence:["electromagnetic/optical theoretical constraints and relativistic empirical trajectory"],
      warrants:["new relativistic transformation structure preserves laws across inertial frames"],
      auxiliaries:["inertial-frame domain","standard synchronization procedures"],
      background:["special relativity excludes gravitation from its full scope"],
      meanings:["time, simultaneity, mass, space acquire changed theoretical/inferential roles"],
      ontology:["Minkowski/relativistic spacetime structure replaces unchanged Newtonian temporal-spatial structure"],
      task:["provide consistent kinematics/dynamics for inertial physics"],
      standing:["special relativity becomes a new framework"],
      powerAuthority:["new framework changes standards while retaining classical limiting usefulness"],
      livePossibilities:["relativistic inertial physics","extension to gravitation"],
      remainder:["gravity","accelerated frames","global gravitational structure"],
      claimCeiling:["special relativity reorganizes key concepts while Newtonian predictions survive approximately in appropriate regimes"],
      framework:["special relativity"],sourceIds:["KUHN-SEP","SPACETIME-SEP"]
    },
    {
      stateId:"RE2",caseId:"NEWTON-EINSTEIN",ordinal:2,periodLabel:"Equivalence-principle bridge",
      doing:["use controlled observer/frame transformations to probe gravitation"],
      claims:["locally, free-fall and gravity-free inertial descriptions can become observationally equivalent within bounded regions"],
      evidence:["universality of free fall and relativistic reasoning"],
      warrants:["equivalence principle licenses local comparison while tidal effects bound equivalence"],
      auxiliaries:["sufficiently local region","tidal effects negligible"],
      background:["special relativity plus gravitational problem"],
      meanings:["gravity begins shifting from force-only interpretation toward spacetime/geometry relation"],
      ontology:["local inertial structure inside gravitational setting"],
      task:["identify a bridge from special relativity to gravitation"],
      standing:["thought-experimental/local-equivalence reasoning gains theoretical standing"],
      powerAuthority:["conceptual fruitfulness does not eliminate empirical test requirements"],
      livePossibilities:["geometric gravitation","alternative gravitational completion"],
      remainder:["tidal/global curvature effects"],
      claimCeiling:["local equivalence is bounded; tidal remainder prevents global identity"],
      framework:["transition toward general relativity"],sourceIds:["REL-EINSTEIN"]
    },
    {
      stateId:"RE3",caseId:"NEWTON-EINSTEIN",ordinal:3,periodLabel:"General relativity",
      doing:["represent gravitation through dynamical spacetime geometry"],
      claims:["gravity is represented through spacetime curvature/geometry rather than unchanged Newtonian force structure"],
      evidence:["Mercury perihelion and later relativistic empirical successes"],
      warrants:["field equations connect matter-energy and spacetime geometry"],
      auxiliaries:["appropriate boundary/approximation conditions recover classical regimes"],
      background:["special relativity/local equivalence generalized"],
      meanings:["gravity, inertial motion, spacetime, mass-energy relations inhabit a changed conceptual network"],
      ontology:["dynamical spacetime geometry"],
      task:["explain gravitation across relativistic regimes"],
      standing:["general relativity becomes established gravitational framework"],
      powerAuthority:["later framework does not erase the bounded utility of Newtonian mechanics"],
      livePossibilities:["general relativity","future quantum/deeper gravity frameworks"],
      remainder:["quantum gravity","singular/extreme regimes"],
      claimCeiling:["Einsteinian theory reorganizes concepts and ontology while preserving bounded limiting relations to Newtonian success"],
      framework:["general relativity"],sourceIds:["KUHN-SEP","REL-EINSTEIN"]
    }
  ],
  transitions:[
    {transitionId:"RE0-RE1",caseId:"NEWTON-EINSTEIN",fromStateId:"RE0",toStateId:"RE1",changedDimensions:["W","B","M","O","X","R","GAMMA","F"],description:"Special relativity changes the conceptual and spacetime framework while preserving bounded classical approximations.",preserved:["many low-velocity predictions"],gained:["frame-dependent simultaneity structure","relativistic kinematics"],lostOrRejected:["unchanged Newtonian time/space framework"],unresolved:["gravitation"],sourceIds:["KUHN-SEP","SPACETIME-SEP"]},
    {transitionId:"RE1-RE2",caseId:"NEWTON-EINSTEIN",fromStateId:"RE1",toStateId:"RE2",changedDimensions:["D","W","A","M","O","X","R","GAMMA"],description:"Equivalence-principle reasoning creates a controlled local bridge toward gravitation.",preserved:["special-relativistic local laws"],gained:["local equivalence structure"],lostOrRejected:["assumption that gravity must remain a conventional force description"],unresolved:["tidal/global structure"],sourceIds:["REL-EINSTEIN"]},
    {transitionId:"RE2-RE3",caseId:"NEWTON-EINSTEIN",fromStateId:"RE2",toStateId:"RE3",changedDimensions:["E","W","B","M","O","X","R","GAMMA","F"],description:"General relativity turns local equivalence into a new gravitational framework with dynamical geometry.",preserved:["local special relativity","appropriate Newtonian limits"],gained:["geometric gravitation","broader explanatory reach"],lostOrRejected:["universal Newtonian force framework"],unresolved:["quantum/extreme gravity"],sourceIds:["REL-EINSTEIN","KUHN-SEP"]}
  ],
  controlledRevisionProbes:[
    {probeId:"RE-PROBE-SIMULTANEITY",caseId:"NEWTON-EINSTEIN",stateId:"RE1",holdFixed:["same pair of spatially separated events"],vary:["inertial frame and synchronization relation"],constraints:["preserve relativistic light-signal procedure"],candidateConsequences:["simultaneity assignment changes across frames"],remainder:["philosophical interpretation of simultaneity convention"],claimCeiling:"The thought experiment exposes dependence of simultaneity assignment on frame/synchronization structure."},
    {probeId:"RE-PROBE-ELEVATOR",caseId:"NEWTON-EINSTEIN",stateId:"RE2",holdFixed:["local observed free-fall behavior"],vary:["gravity-free inertial frame vs freely falling gravitational frame"],constraints:["region remains sufficiently local"],candidateConsequences:["local observational equivalence"],remainder:["tidal effects distinguish larger/global cases"],claimCeiling:"Local task equivalence does not entail global ontological identity."}
  ],
  sourceLedger:[
    {sourceId:"KUHN-SEP",title:"Thomas Kuhn",sourceType:"REFERENCE",url:kuhnUrl,supports:["Newton/Einstein meaning change","incommensurability and conceptual web"]},
    {sourceId:"SPACETIME-SEP",title:"Absolute and Relational Space and Motion: Post-Newtonian Theories",sourceType:"REFERENCE",url:"https://plato.stanford.edu/entries/spacetime-theories/",supports:["Newtonian-to-relativistic spacetime comparison"]},
    {sourceId:"REL-EINSTEIN",title:"The elevator, the rocket, and gravity: the equivalence principle",sourceType:"REFERENCE",url:relativityUrl,supports:["equivalence principle","locality and tidal remainder","special-to-general relativity bridge"]}
  ],
  caseClaimCeiling:["Newton→Einstein shows that scientific change can combine conceptual discontinuity with preserved limiting structure; neither complete identity nor complete incomparability is required."],
  mayNotInfer:["same term guarantees same meaning","conceptual change prevents all comparison","Newtonian success was simply irrational after Einstein"],
  reopenConditions:["new philosophy of reference/meaning comparator","new historical reconstruction of transition","new physics beyond general relativity"]
};

export const desiDossier:CanonicalCaseDossier={
  caseId:"DESI-2024-2026",
  title:"DESI 2024–2026: A Live Revision Frontier in Cosmology",
  canonicalQuestion:"How should a scientific framework represent changing evidence when the live alternatives and claim ceiling move over successive data releases?",
  philosophicalRole:["live evidence change","model comparison","claim-ceiling dynamics","parameterization/meaning boundary","REOPEN"],
  states:[
    {
      stateId:"D0",caseId:"DESI-2024-2026",ordinal:0,periodLabel:"DESI Year 1 results — April 2024",
      doing:["measure cosmic expansion history using BAO across multiple tracers"],
      claims:["DESI Y1 is broadly compatible with Lambda-CDM while combined analyses show a slight preference for time-varying dark energy models"],
      evidence:["Year 1 BAO measurements","CMB combinations","supernova combinations"],
      warrants:["standard-ruler BAO measurements constrain expansion history and model parameters"],
      auxiliaries:["dataset calibration/modeling","chosen cosmological parameterizations","cross-dataset likelihood assumptions"],
      background:["Lambda-CDM is baseline cosmological model"],
      meanings:["dark energy evolution is operationalized through model parameters such as w0/wa rather than direct observation of a substance changing"],
      ontology:["Lambda-CDM and dynamic-dark-energy interpretations remain live"],
      task:["compare cosmological models against Y1 expansion-history constraints"],
      standing:["DESI collaboration and combined cosmological datasets"],
      powerAuthority:["baseline-model status structures comparison but does not immunize Lambda-CDM"],
      livePossibilities:["Lambda-CDM","w0waCDM/time-varying dark energy","other extensions"],
      remainder:["whether Y1 preference is fluctuation/systematic/new physics","ontology behind effective parameters"],
      claimCeiling:["Y1 is broadly compatible with Lambda-CDM and only slightly prefers evolving-dark-energy models in combinations"],
      framework:["DESI Y1 cosmological inference"],sourceIds:["DESI-2024"]
    },
    {
      stateId:"D1",caseId:"DESI-2024-2026",ordinal:1,periodLabel:"DESI DR2 / three-year results — March 2025",
      doing:["update cosmological model comparison with a larger DESI dataset and external probes"],
      claims:["combined-data preference for evolving dark energy strengthens relative to Y1, while DESI alone remains compatible with Lambda-CDM"],
      evidence:["DESI first three years","CMB","multiple Type Ia supernova datasets","additional combined probes"],
      warrants:["larger sample and cross-probe consistency/tension update parameter constraints"],
      auxiliaries:["cross-dataset independence/covariance assumptions","w0waCDM parameterization captures tested dynamic behavior"],
      background:["Lambda-CDM remains baseline comparator"],
      meanings:["evolving dark energy remains model-relative language rather than direct ontological identification"],
      ontology:["dynamic-dark-energy models gain comparative standing without unique ontological promotion"],
      task:["assess whether Y1 hint persists with more data"],
      standing:["DR2 combined analysis"],
      powerAuthority:["increased statistical preference raises evidential standing but remains below discovery closure"],
      livePossibilities:["Lambda-CDM","w0waCDM","more complex cosmological extensions","unmodeled/systematic explanations"],
      remainder:["dataset dependence","model dependence","future full-shape constraints"],
      claimCeiling:["combined-data evidence strengthens the dynamic-dark-energy hint but does not establish discovery or unique ontology"],
      framework:["DESI DR2 combined cosmological inference"],sourceIds:["DESI-2025"]
    },
    {
      stateId:"D2",caseId:"DESI-2024-2026",ordinal:2,periodLabel:"DR2 Lyman-alpha full-shape result — July 2026",
      doing:["use more of the Lyman-alpha correlation function and a larger dataset to sharpen high-redshift cosmological constraints"],
      claims:["new full-shape Lyman-alpha result has smaller uncertainty and a central value shifted toward Lambda-CDM"],
      evidence:["DR2 Lyman-alpha full-shape correlation measurement","earlier BAO-only and combined DR2 results"],
      warrants:["full-shape information adds constraining power beyond BAO peak alone"],
      auxiliaries:["full-shape modeling assumptions","fiducial cosmology/reference choices","Lyman-alpha astrophysical/systematic treatment"],
      background:["earlier DR2 dynamic-dark-energy hint remains part of the evidence history"],
      meanings:["one new measurement can change the model frontier without erasing earlier evidence"],
      ontology:["Lambda-CDM regains comparative support in this channel; more complex model remains possible"],
      task:["update the live model frontier with a sharper high-redshift measurement"],
      standing:["new full-shape result has improved precision"],
      powerAuthority:["precision shifts evidential weight but does not automatically settle all combined-data tensions"],
      livePossibilities:["Lambda-CDM","evolving dark energy whose earlier hint fades","more complex model explaining all measurements"],
      remainder:["joint interpretation of all DESI/external data","future observations and full analyses"],
      claimCeiling:["the new result agrees with Lambda-CDM and may weaken the earlier evolving-dark-energy narrative, while leaving open whether the hint fades or a more complex model is required"],
      framework:["DESI DR2 evolving revision frontier"],sourceIds:["DESI-2026","DESI-2025"]
    }
  ],
  transitions:[
    {transitionId:"D0-D1",caseId:"DESI-2024-2026",fromStateId:"D0",toStateId:"D1",changedDimensions:["E","W","A","X","R","GAMMA"],description:"Larger three-year and combined datasets strengthen the evolving-dark-energy hint without closing the model frontier.",preserved:["Lambda-CDM baseline comparator","BAO expansion-history task"],gained:["stronger combined-data preference","larger evidence base"],lostOrRejected:["interpretation of Y1 as merely isolated weak hint"],unresolved:["dataset/model dependence","unique physical explanation"],sourceIds:["DESI-2024","DESI-2025"]},
    {transitionId:"D1-D2",caseId:"DESI-2024-2026",fromStateId:"D1",toStateId:"D2",changedDimensions:["D","E","W","A","X","R","GAMMA"],description:"A more precise full-shape Lyman-alpha analysis shifts one major constraint toward Lambda-CDM and reorganizes the live frontier.",preserved:["earlier combined-data results remain in evidence history","open model comparison"],gained:["full-shape high-redshift constraint","smaller uncertainty"],lostOrRejected:["simple monotonic narrative of ever-strengthening dynamic dark energy"],unresolved:["joint model for all measurements","future DESI evidence"],sourceIds:["DESI-2026","DESI-2025"]}
  ],
  controlledRevisionProbes:[
    {probeId:"D-PROBE-COMBINATION",caseId:"DESI-2024-2026",stateId:"D1",holdFixed:["DESI DR2 measurements"],vary:["which external datasets are combined","cosmological model parameterization"],constraints:["report dataset dependence explicitly"],candidateConsequences:["preference strength changes","different model extensions remain live"],remainder:["whether tension is physical or dataset/model dependent"],claimCeiling:"Combined-data preference is evidence about represented models, not direct observation of dark-energy ontology."},
    {probeId:"D-PROBE-FULLSHAPE",caseId:"DESI-2024-2026",stateId:"D2",holdFixed:["underlying Lyman-alpha sample"],vary:["BAO-only information vs full-shape information"],constraints:["model/systematic assumptions must be tracked"],candidateConsequences:["uncertainty tightens","central value shifts toward Lambda-CDM"],remainder:["global combined-data interpretation"],claimCeiling:"Adding information can change evidential weight and the revision frontier without deleting the prior evidence state."}
  ],
  sourceLedger:[
    {sourceId:"DESI-2024",title:"First Cosmology Results from DESI: Most Precise Measurement of the Expanding Universe",sourceType:"OFFICIAL",url:desi2024Url,supports:["Y1 broad Lambda-CDM agreement","slight evolving-dark-energy preference","BAO measurement context"]},
    {sourceId:"DESI-2025",title:"New DESI Results Strengthen Hints That Dark Energy May Evolve",sourceType:"OFFICIAL",url:desi2025Url,supports:["DR2 combined-data strengthened hint","DESI-alone compatibility","non-discovery status"]},
    {sourceId:"DESI-2026",title:"New DESI DR2 Lyman-alpha Results Shed Light on Dark Energy",sourceType:"OFFICIAL",url:desi2026Url,supports:["full-shape result","smaller uncertainty","shift toward Lambda-CDM","reopened interpretation"]}
  ],
  caseClaimCeiling:["DESI 2024–2026 is a live example of a revision frontier whose evidential weights, model comparisons, and claim ceilings change over time; the sequence does not yet license a settled ontology of dark energy."],
  mayNotInfer:["2025 results discovered evolving dark energy","2026 result erased the 2025 evidence","one parameterization exhausts all possible new physics"],
  reopenConditions:["new DESI data release","new full-shape combined analysis","new systematic assessment","new model class","cross-probe inconsistency resolution"]
};

export const FIVE_CASE_ATLAS:CanonicalCaseDossier[]=[
  foucaultDossier,
  neptuneVulcanDossier,
  galileoDossier,
  relativityDossier,
  desiDossier
];
