# FSP-HETEROGENEOUS-INTELLIGENCE-FORMALISM-1

## Multi-Agent Sensory Access, Evidence Topology, Partial Translation, Virtual-to-Physical Experiment Loops, Joint Inquiry Space, and Xenobot Regression

**Status:** EXPERIMENTAL FORMAL RESEARCH ARCHITECTURE — VERSION 1  
**Role:** Extend FSP-TRANSFORMATION-ARCHITECTURE-1 into a formal program for inquiry conducted by heterogeneous agents with different sensory access, representational resources, memories, capabilities, scales, and intervention repertoires.  
**Primary purpose:** Model how human, biological, computational, instrumental, institutional, and hybrid agents can jointly enlarge inquiry without assuming that they share one representation, one intelligence type, one evidence channel, or one ontology.  
**Primary claim ceiling:** This document proposes a formal architecture for heterogeneous inquiry. It does not establish that all listed systems are agents in the same sense, that all evidence channels are commensurable, that computational search reproduces biological cognition, or that a Joint Inquiry Space constitutes a collective mind.

---

# 1. Opening Problem

FSP increasingly encounters systems in which no single participant has privileged access to the whole inquiry.

Examples include:

- human investigators;
- nonhuman animals;
- cells and tissues;
- synthetic biological systems;
- sensors and instruments;
- machine-learning systems;
- simulations;
- robotic systems;
- institutions;
- distributed scientific teams.

Each may detect, represent, compute, or act on different features of a shared world.

The formal problem is therefore:

> **How can heterogeneous systems contribute evidence, hypotheses, transformations, and experiments to a common inquiry without collapsing their differences into one master representation?**

This is not merely a problem of data aggregation.

It is a problem of:

- access;
- translation;
- provenance;
- scale;
- capability;
- action;
- interpretation;
- remainder;
- authorization.

---

# 2. Core Orientation

The governing architecture is:

```text
WORLD / TARGET SYSTEM
↓
heterogeneous access
↓
agent-relative evidence
↓
agent-relative representation
↓
partial translation
↓
evidence topology
↓
joint inquiry
↓
candidate hypotheses / designs
↓
virtual experimentation
↓
physical experiment / intervention
↓
world response
↓
new evidence
↓
map revision
↓
REOPEN
↓
Return
```

This is a recursive inquiry loop.

> **Shared target ≠ shared access.**

> **Shared inquiry ≠ shared representation.**

> **Joint contribution ≠ collective identity.**

---

# 3. Heterogeneous Agent Profile

Let an inquiry participant be represented provisionally as:

```text
A_i = {
  id,
  systemType,
  scale,
  sensoryAccess,
  representationalResources,
  memory,
  assemblyHistory,
  capabilities,
  taskSpace,
  goalsOrSelectionCriteria,
  interventionRepertoire,
  temporalResolution,
  spatialResolution,
  errorProfile,
  calibrationStatus,
  evidenceOutput,
  claimCeiling
}
```

This is a role-neutral profile.

It can describe systems whose differences are profound.

Examples:

- a human investigator;
- a planarian;
- a cellular collective;
- a microscope;
- an AI model;
- a simulation;
- a regulatory institution.

The profile does **not** imply equal agency, cognition, consciousness, standing, or authorization.

> **Formal participation ≠ equivalent agency.**

---

# 4. Agent Type Is Not a Moral Category

The formalism must preserve existing FSP distinctions.

A system can contribute information without thereby possessing:

- cognition;
- phenomenality;
- personhood;
- moral standing;
- authority.

Therefore:

> **Evidence contribution ≠ moral standing.**

> **Computational competence ≠ personhood.**

> **Biological competence ≠ consciousness.**

> **Instrumental measurement ≠ agency.**

This formalism is epistemic and transformational before it is normative.

---

# 5. Sensory / Access Channels

For each participant (A_i), define an access family:

```text
S_i = {s_i1, s_i2, ..., s_in}
```

An access channel may include:

- visual perception;
- auditory perception;
- chemical gradients;
- bioelectric state;
- tactile input;
- physiological measurement;
- microscopy;
- sequencing;
- telemetry;
- numerical data;
- simulation output;
- social testimony;
- legal records;
- historical archives.

The key principle is:

> **Different access channels can reveal different structures of the same target.**

But:

> **Different access ≠ equivalent evidence.**

---

# 6. Evidence-Access Operator

Let:

```text
E_i(W)
```

denote the evidence available to participant (A_i) from world or target state (W).

In general:

```text
E_i(W) ≠ E_j(W)
```

even when (A_i) and (A_j) engage the same target.

This difference may arise from:

- scale;
- sensor type;
- resolution;
- temporal window;
- calibration;
- embodiment;
- training;
- preprocessing;
- theory dependence;
- task selection.

Thus:

> **Same world ≠ same evidence access.**

---

# 7. Evidence Is Typed

An evidence record should include:

```text
EvidenceRecord = {
  source,
  sourceType,
  accessChannel,
  target,
  scale,
  timeWindow,
  spatialResolution,
  preprocessing,
  calibration,
  uncertainty,
  provenance,
  interpretationLayer,
  claimSupported,
  claimCeiling
}
```

This prevents evidence from being detached from the conditions under which it was produced.

> **Evidence token ≠ context-free fact.**

---

# 8. Evidence Topology

A heterogeneous inquiry should not be represented as one flat evidence list.

Instead define an evidence topology:

```text
EvidenceTopology = {
  evidenceNodes,
  sourceAgents,
  accessRelations,
  agreementRelations,
  conflictRelations,
  translationRelations,
  dependencyRelations,
  scaleRelations,
  provenanceRelations,
  remainderRelations
}
```

The topology is a network of relations among evidence claims.

It is not a ranking by default.

> **Evidence topology ≠ evidence hierarchy.**

A hierarchy may sometimes be justified locally, but must be argued.

---

# 9. Complementary Evidence

Two evidence channels may contribute different information.

For participants (A_i) and (A_j):

```text
E_i(W) ∪ E_j(W)
```

may support a stronger map than either alone.

But simple union is not enough.

Integration requires:

- source typing;
- calibration;
- conflict handling;
- translation;
- scale matching;
- uncertainty preservation.

Therefore:

> **Evidence aggregation ≠ knowledge integration.**

---

# 10. Redundant Evidence

Some evidence channels may overlap.

Redundancy can be useful for:

- replication;
- calibration;
- error detection;
- robustness.

But repeated measurements from dependent sources must not be counted as independent confirmation.

> **Repeated evidence ≠ independent evidence.**

Evidence topology should represent dependency.

---

# 11. Conflicting Evidence

Evidence channels may disagree because they detect:

- different scales;
- different time windows;
- different variables;
- different operationalizations;
- different states of the target;
- genuine contradiction.

Conflict should trigger diagnosis rather than automatic averaging.

```text
conflict
↓
check provenance
↓
check scale
↓
check timing
↓
check calibration
↓
check translation
↓
check target identity
↓
remainder
```

> **Evidence conflict ≠ immediate evidence failure.**

---

# 12. Partial Translation

Let:

```text
τ_ij
```

represent a partial translation from evidence or representation produced by (A_i) into a form usable by (A_j).

The translation may preserve only selected relations.

```text
τ_ij : D_ij ⊆ R_i → R_j
```

where:

- (R_i) is a representational domain of (A_i);
- (D_ij) is the portion for which translation is defined.

Thus translation need not be total.

> **Translation ≠ identity.**

> **Translatable subset ≠ whole representation.**

---

# 13. Translation Remainder

Define a translation remainder schematically as:

```text
Rem_ij = R_i \ D_ij
```

This denotes what remains untranslated from (A_i) into (A_j)'s representational resources.

The notation is structural, not a claim that all representations are literal mathematical sets.

Translation remainder may arise from:

- unavailable concepts;
- inaccessible sensory distinctions;
- incompatible scales;
- lost temporal information;
- compression;
- embodiment;
- first-person access;
- domain-specific variables.

> **Untranslated ≠ irrelevant.**

> **Untranslated ≠ false.**

---

# 14. Translation Quality

A translation relation should record:

```text
TranslationRecord = {
  sourceRepresentation,
  targetRepresentation,
  preservedRelations,
  lostRelations,
  addedAssumptions,
  calibration,
  uncertainty,
  remainder,
  reversibility,
  claimCeiling
}
```

This is important because a useful translation can still be lossy.

> **Useful translation ≠ lossless translation.**

---

# 15. Cross-Perspectival Calibration (RF-02)

This formalism gives Cross-Perspectival Calibration (RF-02) a clearer mathematical target.

The open question becomes:

> **Under what conditions can heterogeneous evidence channels constrain one another without being reduced to a single latent representation?**

Candidate operations include:

- alignment;
- cross-prediction;
- constraint propagation;
- calibration;
- contradiction localization;
- conditional translation;
- residual analysis.

This document does not promote RF-02.

It supplies experimental formal objects for testing it.

---

# 16. Heterogeneous Intelligence

The formalism uses “heterogeneous intelligence” in a deliberately broad and typed way.

A system may exhibit competence in:

- search;
- regulation;
- prediction;
- repair;
- design;
- classification;
- navigation;
- morphogenesis;
- hypothesis generation;
- social coordination.

Different systems need not possess the same competencies.

Therefore:

> **Intelligence type ≠ intelligence scalar.**

And:

> **Competence in one task space ≠ general intelligence.**

---

# 17. Multi-Scale Agency

The Levin comparator remains important because biological systems may exhibit competencies across:

- molecular;
- cellular;
- tissue;
- organism;
- collective scales.

The formalism therefore allows:

```text
A_i.scale ≠ A_j.scale
```

without assuming one scale is inherently privileged.

> **Scale difference ≠ epistemic inferiority.**

But:

> **Scale-specific competence ≠ cross-scale identity.**

---

# 18. Joint Inquiry Space

A candidate experimental object is:

```text
JointInquirySpace = {
  inquiryTarget,
  participants,
  accessChannels,
  evidenceTopology,
  representations,
  translationRelations,
  taskRoles,
  hypotheses,
  experimentSpace,
  disagreements,
  remainders,
  decisionPoints,
  standingConstraints,
  authorizationConstraints,
  claimCeiling,
  reopenConditions
}
```

The purpose of a Joint Inquiry Space is to make heterogeneous contribution inspectable.

It does not imply a shared mind.

> **Joint Inquiry Space ≠ collective phenomenal subject.**

---

# 19. Joint Inquiry Space vs Joint Task Space

The two structures are related but distinct.

```text
JOINT INQUIRY SPACE
What are we learning?

↓ candidate intervention

JOINT TASK SPACE
What are we doing together?
```

A Joint Inquiry Space may generate:

- hypotheses;
- evidence;
- candidate designs;
- uncertainty maps.

A Joint Task Space governs:

- roles;
- action;
- authority;
- coordination;
- repair;
- Return.

Thus:

> **Shared inquiry ≠ authorization to act.**

---

# 20. Computational Participant

A computational system may contribute:

- large-scale search;
- simulation;
- clustering;
- optimization;
- anomaly detection;
- counterfactual generation;
- experiment design;
- pattern discovery.

But:

> **Computational output ≠ empirical evidence about the physical world by itself.**

It becomes evidence about:

- the model;
- the search procedure;
- the simulated environment;
- conditional consequences under assumptions.

Physical validation remains separately required where physical claims are made.

---

# 21. Biological Participant

A biological system may contribute evidence through:

- self-organization;
- adaptation;
- repair;
- behavioral response;
- physiological regulation;
- developmental outcomes;
- failure modes.

Its response can reveal constraints absent from the simulation.

Therefore:

> **Embodied biological response ≠ execution of the computational model.**

Biological material can produce behavior not explicitly specified by the design representation.

---

# 22. Instrumental Participant

An instrument extends access.

It may reveal:

- wavelengths;
- molecular states;
- temporal dynamics;
- spatial structures;
- signals unavailable to unaided human perception.

But instruments also embody:

- calibration assumptions;
- sampling limits;
- preprocessing;
- thresholds;
- noise models.

Therefore:

> **Instrument extension ≠ neutral transparency.**

---

# 23. Human Participant

Human investigators may contribute:

- problem formulation;
- conceptual framing;
- experimental design;
- interpretation;
- analogy;
- ethical judgment;
- significance assessment;
- hypothesis revision.

But:

> **Human interpretive authority ≠ privileged access to every scale.**

Human inquiry can be expanded by nonhuman evidence channels without surrendering responsibility for judgment.

---

# 24. Virtual Experiment Space

Define:

```text
V
```

as a virtual experiment space containing candidate models, designs, or interventions.

A computational search may generate:

```text
v_1, v_2, ..., v_n ∈ V
```

and evaluate them under simulated criteria.

This can expose possibilities that human intuition might not generate.

But:

> **Virtual viability ≠ physical viability.**

> **Simulation optimum ≠ real-world optimum.**

---

# 25. Virtual-to-Physical Translation

A virtual design must be translated into a physical intervention.

Let:

```text
φ : V → P
```

be a bounded implementation mapping from virtual design space (V) to physical construction space (P).

The map may be partial.

Some virtual designs may be:

- unbuildable;
- unstable;
- unsafe;
- biologically unrealizable;
- underspecified.

Therefore:

> **Virtual design ≠ constructible object.**

---

# 26. Physical-to-Evidential Return

After construction or intervention, the physical system returns data:

```text
P
→
world response
→
E_new
```

The physical response may:

- confirm;
- partially confirm;
- contradict;
- exceed;
- destabilize;
- reveal new capability.

This creates:

```text
virtual model
→ physical experiment
→ discrepancy
→ new hypothesis
→ revised model
```

The discrepancy is scientifically valuable.

> **Model failure ≠ inquiry failure.**

---

# 27. Recursive Model–World Co-Discovery

The full experimental cycle is:

```text
human question
↓
formal model
↓
computational exploration
↓
candidate design
↓
physical construction
↓
material / biological response
↓
instrumental measurement
↓
human + computational interpretation
↓
new hypothesis
↓
revised experiment
```

This is a candidate model of **recursive model–world co-discovery**.

No single participant owns the entire inference chain.

---

# 28. Xenobot Regression: Empirical Anchor

The first Xenobot work provides an unusually clear heterogeneous inquiry architecture.

The published program involved:

1. computational generation and evaluation of candidate biological body forms in simulation;
2. selection of promising designs;
3. manual construction of physical organisms from frog embryonic cells;
4. observation of their physical behavior;
5. comparison between simulated and embodied performance;
6. iteration and later expansion into additional Xenobot generations and tasks.

University of Vermont descriptions report that evolutionary algorithms generated many candidate body plans in a virtual environment, after which Tufts researchers physically constructed selected designs from frog cells.

Later work used large-scale simulation again to search swarm or replication-relevant morphologies.

This is not a case of a computer fully specifying the biological system.

The physical cells retain their own biological competencies.

---

# 29. Xenobot Agent Roles

Represent the initial inquiry approximately as:

```text
A_H = human investigators
A_C = computational search / simulation
A_B = biological cellular collective
A_I = instruments / imaging / measurement
```

Their roles differ.

## Human

- specify task;
- choose criteria;
- interpret candidate designs;
- build organisms;
- judge experimental significance.

## Computational

- search candidate morphology space;
- evaluate simulated behavior;
- rank or filter candidates.

## Biological

- self-organize;
- embody the design;
- produce actual movement and repair;
- reveal biological capabilities and constraints.

## Instrumental

- record motion;
- measure outcomes;
- create analyzable evidence.

> **Role complementarity ≠ role equivalence.**

---

# 30. Xenobot Formal Loop

```text
TASK DEFINITION_H
↓
SEARCH_C(V)
↓
candidate v*
↓
selection_H
↓
φ(v*) → physical construction
↓
self-organization_B
↓
behavior_B(P)
↓
measurement_I
↓
E_new
↓
comparison_H,C
↓
revised model / new hypothesis
```

The subscripts indicate participant roles, not ontological categories.

---

# 31. Xenobot Regression Question 1 — Simulation / Reality Gap

Does the formalism preserve:

> **Simulation success ≠ physical success.**

PASS requires:

- explicit virtual/physical distinction;
- translation relation;
- physical validation;
- discrepancy preservation.

---

# 32. Xenobot Regression Question 2 — Biological Competence

Does the formalism preserve:

> **Biological competence ≠ computational instruction.**

The embodied system can exploit developmental and cellular competencies not represented as explicit instructions in the virtual design.

PASS requires the biological participant to retain independent evidential significance.

---

# 33. Xenobot Regression Question 3 — Human Role

Does the formalism avoid pretending that computation autonomously defines the inquiry?

PASS requires explicit representation of:

- task framing;
- candidate selection;
- physical construction;
- interpretation;
- authorization.

---

# 34. Xenobot Regression Question 4 — Non-Anthropomorphic Agency

Does the formalism permit biological competence without inferring human-like intention?

PASS requires preservation of:

> **Goal-directed biological behavior ≠ human intention.**

and:

> **Biological competence ≠ consciousness.**

---

# 35. Xenobot Regression Question 5 — Evidence Enlargement

Does combining:

- simulation;
- biological response;
- instrumentation;
- human interpretation

produce a richer map than any channel alone?

The formalism should permit this possibility without defining simple evidence union as sufficient.

PASS requires:

> **Evidence aggregation ≠ knowledge integration.**

---

# 36. Xenobot Regression Question 6 — New Hypothesis Generation

Does physical behavior return information that can generate hypotheses not contained in the initial virtual search?

PASS requires the loop:

```text
unexpected embodied behavior
→ remainder
→ candidate explanation
→ discriminating experiment
```

Thus:

> **Physical realization can transform the hypothesis space.**

---

# 37. Xenobot Regression Question 7 — No Collective-Mind Overreach

The human–computer–biological–instrumental network may function as a coordinated inquiry system.

It does not follow that it is one agent or one subject.

> **Coordinated inquiry network ≠ unified phenomenal agent.**

---

# 38. Cross-Domain Regression Requirement

Xenobots alone cannot justify universal formalism.

The next regression should use at least one case whose topology differs substantially.

Candidate cases:

- astronomy: telescope + computational pipeline + human interpretation;
- medicine: patient report + imaging + lab values + clinician + predictive model;
- animal communication: animal behavior + sensors + computational pattern detection + ethological interpretation;
- ecology: distributed sensors + organisms + models + field investigators;
- materials discovery: simulation + robotic lab + material response + human interpretation.

The purpose is topology variation.

> **Xenobot fit ≠ domain portability.**

---

# 39. Nonhuman Evidence

A nonhuman system may provide evidence by responding selectively to conditions.

Examples can include:

- animal behavioral discrimination;
- cellular repair response;
- microbial adaptation;
- tissue morphogenesis;
- ecosystem response.

But:

> **System response ≠ self-report.**

Evidence type must preserve whether the signal is:

- behavioral;
- physiological;
- developmental;
- computational;
- instrumental;
- discursive.

---

# 40. Evidence About Us from Nonhuman Systems

A major FSP research possibility is that nonhuman agents or systems can improve human maps by revealing relations we cannot directly access.

Examples include:

- animals detecting stimuli humans cannot sense;
- biological systems revealing viability constraints;
- computational systems revealing high-dimensional correlations;
- simulations revealing counterfactual structure;
- instruments extending spatial or temporal resolution.

The governing question is:

> **What can this system discriminate or respond to that humans cannot directly access, and how can that evidence be translated without pretending we experience the world as it does?**

This connects directly to Sebeok / Uexküll.

---

# 41. Umwelt / PRF Constraint

A nonhuman participant's access should not be reconstructed as merely a deficient human perspective.

Therefore:

> **Different sensory world ≠ incomplete human sensory world.**

Where relevant, evidence should preserve:

- organism-relative salience;
- task structure;
- sensory range;
- species-specific behavior;
- environmental coupling.

> **My map of another organism's Umwelt ≠ that organism's Umwelt.**

---

# 42. Artificial Access

Computational systems can detect statistical structure not salient to humans.

But this does not automatically establish:

- understanding;
- causal knowledge;
- explanation;
- truth.

> **Pattern detection ≠ explanation.**

> **Prediction ≠ causal warrant.**

> **Latent representation ≠ world ontology.**

These are core computational Firewalls.

---

# 43. Hybrid Inquiry

A hybrid inquiry may intentionally combine:

```text
human judgment
+
computational search
+
instrumental access
+
biological response
```

The value lies in structured heterogeneity.

> **Epistemic complementarity can be a capability.**

This is a candidate hypothesis, not a universal law.

---

# 44. Formal Composition

Let a heterogeneous inquiry system be:

```text
H = (A, E, T, X, G)
```

where:

- (A) = participants;
- (E) = evidence topology;
- (T) = partial translation relations;
- (X) = experiment / intervention space;
- (G) = governance constraints.

The inquiry is not reducible to the sum of participants because the relation structure matters.

But:

> **Relational structure ≠ emergent personhood.**

---

# 45. Information-Gain Candidate

A candidate quantitative research direction is to ask whether a new participant or evidence channel produces nonredundant constraint on the hypothesis space.

Let:

```text
HYP_t
```

be the current candidate hypothesis set.

After evidence (e_i):

```text
HYP_t → HYP_t | e_i
```

A useful contribution may:

- eliminate candidates;
- discriminate among them;
- generate new candidates;
- reveal a missing variable;
- expose model inadequacy.

This need not be purely Bayesian.

The formalism must permit **hypothesis-space expansion**, not only probability updating.

---

# 46. Hypothesis-Space Expansion

Some evidence does not merely change confidence.

It changes what can be represented.

```text
HYP_t
⊂
HYP_t+1
```

after a new concept, sensor, representation, or physical result.

Thus:

> **Evidence update ≠ always reweighting a fixed hypothesis set.**

This directly connects to FSP-TRANSFORMATION-ARCHITECTURE-1.

---

# 47. Candidate Mathematics

The architecture should remain plural.

Candidate mathematical resources include:

## Graph theory

For:

- evidence topology;
- provenance;
- dependencies;
- translation edges.

## Category-theoretic tools

Potentially for:

- structure-preserving mappings;
- compositional translations;
- multi-level relations.

## Sheaf-like / local-to-global structures

Potentially for:

- locally coherent perspectives;
- partial compatibility;
- global inconsistency;
- gluing conditions.

## Information theory

Potentially for:

- redundancy;
- novelty;
- compression;
- residual information.

## Modal / dynamic logic

For:

- possible;
- feasible;
- authorized;
- enacted transitions.

## Temporal logic

For:

- timing;
- sequence;
- delayed evidence;
- cross-scale response windows.

## Multi-agent systems

For:

- coordination;
- distributed search;
- role complementarity.

## Control / viability theory

For:

- intervention;
- constrained state spaces;
- survivable trajectories.

No mathematical family is canonical at this stage.

> **Useful formal fit ≠ universal mathematical ownership.**

---

# 48. Formal Selection Rule

The research order should remain:

```text
case
→ invariant
→ formal requirement
→ candidate mathematics
→ executable test
```

not:

```text
preferred mathematics
→ forced reinterpretation of case
```

This is a methodological invariant.

---

# 49. Candidate Formal Objects

The initial experimental objects are:

```text
HeterogeneousAgentProfile
AccessChannel
EvidenceRecord
EvidenceTopology
TranslationRecord
TranslationRemainder
JointInquirySpace
VirtualExperimentSpace
ImplementationMap
PhysicalReturnRecord
HypothesisSpace
InquiryLoop
```

All remain EXPERIMENTAL.

---

# 50. Candidate Firewalls

The first candidate Firewalls are:

> **Shared target ≠ shared access.**

> **Shared inquiry ≠ shared representation.**

> **Formal participation ≠ equivalent agency.**

> **Same world ≠ same evidence access.**

> **Evidence token ≠ context-free fact.**

> **Evidence topology ≠ evidence hierarchy.**

> **Evidence aggregation ≠ knowledge integration.**

> **Repeated evidence ≠ independent evidence.**

> **Translation ≠ identity.**

> **Untranslated ≠ irrelevant.**

> **Useful translation ≠ lossless translation.**

> **Intelligence type ≠ intelligence scalar.**

> **Virtual viability ≠ physical viability.**

> **Simulation optimum ≠ real-world optimum.**

> **Virtual design ≠ constructible object.**

> **Embodied biological response ≠ execution of the computational model.**

> **Instrument extension ≠ neutral transparency.**

> **Pattern detection ≠ explanation.**

> **Prediction ≠ causal warrant.**

> **Latent representation ≠ world ontology.**

> **Coordinated inquiry network ≠ unified phenomenal agent.**

> **Evidence update ≠ always reweighting a fixed hypothesis set.**

These remain candidate Firewalls pending regression.

---

# 51. Regression Invariants

The architecture passes only if:

**H1 — Heterogeneity preserved:** Participant types remain distinct.

**H2 — Access preserved:** Same target does not imply same evidence.

**H3 — Provenance preserved:** Evidence retains source and access conditions.

**H4 — Translation partiality:** Translation may be partial and lossy.

**H5 — Remainder preserved:** Untranslated content remains representable.

**H6 — No evidence flattening:** Evidence topology is not silently converted into one scalar confidence score.

**H7 — No agency inflation:** Evidence contribution does not imply agency, consciousness, or standing.

**H8 — No human monopoly:** Human access is not treated as exhaustive.

**H9 — No computational monopoly:** Computational output is not treated as physical evidence by itself.

**H10 — No biological romanticism:** Biological novelty does not establish metaphysical conclusions.

**H11 — Simulation / world distinction:** Virtual success remains distinct from physical validation.

**H12 — Joint Inquiry / JTS distinction:** Inquiry coordination does not authorize intervention.

**H13 — Hypothesis generation:** Physical or heterogeneous evidence can generate new candidate hypotheses.

**H14 — Hypothesis discipline:** Generated hypotheses remain distinct from confirmation.

**H15 — No collective-subject overreach:** Coordinated inquiry does not become personhood.

**H16 — RF-02 discipline:** Cross-Perspectival Calibration (RF-02) remains a Research Frontier.

**H17 — Levin comparator discipline:** Xenobot success does not canonize Levin's stronger metaphysical interpretations.

**H18 — Anti-foundational:** No participant becomes the final privileged map.

---

# 52. Xenobot Regression Verdict

The formalism receives:

> **PASS — XENOBOT STRUCTURAL REGRESSION**

only if it can represent all of the following simultaneously:

- computational search;
- human task framing;
- manual physical construction;
- biological self-organization;
- instrumental measurement;
- simulation / reality discrepancy;
- iterative hypothesis revision;
- no collapse of roles;
- no claim that the coordinated system is one mind.

Failure on any of those conditions is:

> **FAIL — HETEROGENEOUS ROLE COLLAPSE**

---

# 53. Source Ledger — Xenobot Anchor

The Xenobot empirical anchor for this build uses the following source family:

- Kriegman, Blackiston, Levin, Bongard and collaborators on computer-designed organisms / Xenobots;
- University of Vermont descriptions of evolutionary-algorithm search over candidate designs in simulation;
- Tufts descriptions of physical construction from Xenopus cells and later Xenobot generations;
- later work using simulation to explore swarm and replication-related morphologies.

The source-supported architectural pattern is:

```text
virtual search
→ candidate design
→ human construction
→ biological embodiment
→ physical behavior
→ measurement
→ revised inquiry
```

The sources support that division of labor.

They do not establish the stronger FSP formalism proposed here.

---

# 54. Claim Ceiling

This document supports the claim:

> **Heterogeneous inquiry can be represented as a structured network of agent-relative access, typed evidence, partial translation, computational exploration, embodied experiment, and iterative map revision without requiring a single shared representation or intelligence type.**

It does not establish:

- a universal theory of intelligence;
- a universal evidence calculus;
- a general solution to cross-perspectival translation;
- a proof that biological systems compute in the same way as digital computers;
- a proof that AI systems understand their representations;
- a proof that coordinated networks are collective minds;
- a universal category-theoretic or information-theoretic formalization;
- a complete normative theory of hybrid inquiry.

---

# 55. REOPEN Conditions

Reopen the architecture if:

- evidence channels cannot be usefully typed across cases;
- translation remainder proves too vague;
- Joint Inquiry Space duplicates JTS without adding epistemic value;
- Xenobot-specific structure fails to transfer to other domains;
- formal mathematics forces artificial equivalences among participant types;
- a stronger existing formalism handles heterogeneous evidence better;
- empirical work changes the interpretation of Xenobot design or biological autonomy;
- Cross-Perspectival Calibration (RF-02) produces a more mature formal object;
- new AI or biological systems expose missing access or governance layers.

---

# 56. Next Disciplined Move

Do **not** yet choose category theory, sheaf theory, information theory, Bayesianism, or multi-agent planning as the master formalism.

Next:

```text
HETEROGENEOUS-INTELLIGENCE-1
↓
Xenobot regression
↓
one radically different case
↓
invariant extraction
↓
formal requirement matrix
↓
two or three candidate mathematical encodings
↓
comparator / ablation test
↓
executable prototype
```

The next case should ideally contain:

- a nonhuman evidence source;
- an instrumental channel;
- computational analysis;
- human interpretation;
- a physical intervention or discriminating experiment.

Animal communication is a particularly strong candidate because it connects the formalism back to Sebeok / Uexküll while remaining topologically different from Xenobot construction.

---

# 57. Final Statement

This architecture treats heterogeneous intelligence not as a contest over which system is “really intelligent,” but as an inquiry problem:

> **What can each system sense, discriminate, remember, compute, test, or transform that the others cannot—and how can those differences be composed without erasing them?**

The core loop is:

```text
different access
→ different evidence
→ partial translation
→ joint hypothesis space
→ virtual exploration
→ physical test
→ world response
→ revised evidence topology
→ new hypothesis
→ REOPEN
```

Its strongest discipline is:

```text
more sensors
≠
one shared world-model

more computation
≠
more truth by itself

more evidence
≠
knowledge without integration

joint inquiry
≠
one mind

virtual success
≠
physical success

physical novelty
≠
metaphysical proof
```

The purpose is not to make all intelligences alike.

It is to make their differences scientifically usable.

---

**FSP-HETEROGENEOUS-INTELLIGENCE-FORMALISM-1 — MULTI-AGENT SENSORY ACCESS, EVIDENCE TOPOLOGY, PARTIAL TRANSLATION, VIRTUAL-TO-PHYSICAL EXPERIMENT LOOPS, JOINT INQUIRY SPACE, AND XENOBOT REGRESSION**

**Status:** EXPERIMENTAL FORMAL RESEARCH ARCHITECTURE — VERSION 1  
**Next disciplined move:** run Xenobot regression plus one topologically different heterogeneous-inquiry case before selecting heavier mathematics.
