# FSP Cartography — CODE-0.1

This repository is the first executable implementation of the frozen FSP Cartography specification.

CODE-0.1 freezes the deterministic state machine after a green 21-test regression gate and begins the usability phase around that tested kernel.

## Frozen baseline

The CODE-0.1 regression gate tested commit:

`a58766f3340716d2b71102fe0b855264f8e88288`

Result:

- 21 tests passed
- 0 failed
- browser TypeScript build passed

See `CODE-0.1-FREEZE.md` for the frozen boundary.

## Seven views

- Start
- People
- Institution
- H / S / F
- Connections
- Investigate
- Return

Persistence remains deliberately local and minimal: an in-memory adapter for deterministic tests and a LocalStorage-compatible adapter for the browser boundary.

## Run

```bash
npm test
npm run build:browser
```

## Architectural boundary

The reducer is pure: it does not read the clock, storage, network, or browser globals. Presentation and persistence live outside the kernel.

During the CODE-0.1 usability phase, interface code may dispatch existing actions and render existing state, but it must not silently alter kernel semantics.

## Not building now

No generative AI. No VR. No public-data integration. No multi-user collaboration. No recommendation engine. No personality model. No hidden personalization. No cloud account system.


## Research layer

The repository now also contains a deliberately non-constitutional research layer under `src/research/`.

`FSP-TRANSLATION-1` explores task-relative translation among divergent PRFs, explicit translation remainder/failure, cooperation without ontological convergence, and transparent agency/repair diagnostics.

These research constructs are not part of the frozen Cartography kernel unless separately justified through a future Change Gate.


`FSP-TRANSLATION-2` adds a four-PRF forest stress case with a complete directed translation matrix, a narrowly scoped underdetermination candidate, negotiated shared-task logic, institutional power auditing, and multi-party capability-preserving repair.


`FSP-TRANSLATION-3` adds time-indexed evidence snapshots, auxiliary-assumption comparison, translation-remainder dynamics, and a robustness test that distinguishes preserved underdetermination, task-relevant breakdown, and REOPEN conditions.


`FSP-TRANSLATION-4` adds a deterministic out-of-sample perturbation grammar, auxiliary-network sensitivity/ablation, and false-equivalence detection so matching surface actions cannot substitute for deeper task-signature comparison.


`FSP-TRANSLATION-5` adds a persistent-pain comparator, cross-domain replication logic, primitive-ablation auditing, and an explicit publication-claim ceiling.


`FSP-TRANSLATION-6` adds a Galileo historical-interpretation third domain, a Claim-Evidence-Action external comparator, primitive-minimality challenges, and a publication architecture capped at three-domain replication with comparator delta.


`FSP-TRANSLATION-7` adds external AIF reconstruction, CEA/AIF/FSP comparator profiles, independent coding agreement, and a canonical monograph-scale research architecture in which submission-length papers are derived exports rather than constraints on the research repository.


`FSP-TRANSLATION-8` adds bounded raw AIF imports from multiple external ARG Tech sources, exact original-node-ID preservation, separate FSP governance overlays, audit-query recovery, and selective compression ablation.


`FSP-TRANSLATION-9` adds six-nodeset batch ingestion across two external AIF corpora, overlapping-ID coherence, sampled augmentation coding, query-scaling tests, compression-retention curves, and corpus-level failure auditing.


`FSP-TRANSLATION-10` adds deterministic raw-AIF relation-neighborhood extraction, RA/CA/MA stratified sampling, a frozen future human-coder protocol, query-performance benchmarking, and a multi-dimensional scale-up acceptance gate.


`FSP-TRANSLATION-11` scales automatic external extraction to a 30-nodeset, two-corpus RA/CA/MA-stratified sample, adds a frozen blank human-coder trial packet, measures query latency by distribution, and distinguishes infrastructure PASS from human-coding PENDING.


`FSP-DUHEM-QUINE-APPLICATION` applies the translation machinery to Foucault optics, Uranus/Neptune, Mercury/Vulcan, and Quinean web-of-belief revision while preserving the ceiling that FSP represents underdetermination without uniquely solving theory choice.

`FSP-TRANSLATION-12` freezes the first-human-trial evaluation architecture: protocol fidelity, structural/interpretive agreement separation, adjudication firewall, and a PASS/FAIL/PENDING post-human scale gate. Human evidence remains PENDING.


`FSP-REVISION-1` begins the post-Translation revision branch: typed revision targets, Neptune/Vulcan comparison, explicit revision-scope cost, minimal-mutilation auditing, a non-recommending revision frontier, and a hard revision-choice claim ceiling.


`FSP-REVISION-2` adds a plural revision-reason grammar, Neptune/Vulcan/relativity tradeoff matrix, good-sense comparator profiles, path-dependence auditing with formation != justification, and a non-algorithmic choice boundary that forbids universal weighted theory-choice scores.


`FSP-REVISION-3` adds diachronic reason change, evidence-triggered salience shifts without numeric utility, community disagreement, practical convergence without theory agreement, choice convergence with reason pluralism, and legitimate nonconvergence without forced consensus.


`FSP-REVISION-4` adds persistent-disagreement auditing, minority-report preservation, evidence-access asymmetry, standing/reopenability checks, epistemic/procedural/practical authority separation, power-distortion detection, and legitimate nonconvergence classification.


`FSP-REVISION-5` adds testimonial-credibility and hermeneutical-distortion audits, standing and contestability repair, counter-public evidence with provenance, and revision re-entry conditions that preserve remainder without auto-validating previously excluded claims.


`FSP-REVISION-6` adds concept provenance, interpretive-resource competition, partial/failed concept translation, concept-capture/co-option auditing, and shared-language nonconvergence with practical coordination across plural vocabularies.


`FSP-REVISION-7` adds concept genealogy, semantic drift through institutional sedimentation, cross-generation translation and false-friend detection, a renewed formation != justification audit, and historical REOPEN triggers for inherited concepts.


`FSP-REVISION-8` adds institutional sedimentation networks, multi-concept coevolution, policy/practice feedback loops, historical lock-in auditing, bounded repair windows, and cross-generational capability trajectories with past-benefit != present-justification safeguards.


`FSP-REVISION-9` adds ordered institutional repair sequencing, group-specific capability tradeoff auditing without aggregate net scores, independent exit/voice/appeal checks, repair reversibility, and multi-generation REOPEN governance that prevents first-generation approval from binding future generations.


`FSP-REVISION-10` adds compensation/non-compensation boundaries, non-waivable protected capability floors, burden-shifting audits, repair-legitimacy conditions, and multi-party authorization without reason convergence, with coercion and missing standing as hard blockers.
