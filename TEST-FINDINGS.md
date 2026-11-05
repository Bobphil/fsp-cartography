# Test Findings

## CODE-0 kernel milestone

Date: 2026-11-01

Baseline command:

```bash
npm test
```

Baseline result:

- 7 tests passed
- 0 failed
- Maya acceptance journey: PASS
- Leila acceptance journey: PASS
- Jordan acceptance journey: PASS
- Verified institutional barrier micro-test: PASS
- Rejected Coach interpretation micro-test: PASS
- No-shared-task micro-test: PASS
- Privacy firewall micro-test: PASS

## CODE-0.1 regression gate

Date: 2026-11-02

Tested baseline commit:

`a58766f3340716d2b71102fe0b855264f8e88288`

Commands:

```bash
npm test
npm run build:browser
```

Observed result:

- 21 tests passed
- 0 failed
- 0 skipped
- Maya acceptance journey: PASS
- Leila acceptance journey: PASS
- Jordan acceptance journey: PASS
- all four frozen micro-tests: PASS
- all direct reducer/invariant/persistence/shell unit tests: PASS
- TypeScript kernel build: PASS
- separate browser TypeScript build: PASS

The gate was executed against a local reconstruction of the exact GitHub commit contents using Node 22.16.0 and TypeScript 5.8.3 after the runtime's direct network path to GitHub was unavailable.

CODE-0.1 is therefore frozen. The next phase is usability work outside the kernel; the state machine remains closed unless the Change Gate is explicitly reopened.

## CODE-0.1 interaction slice 1 gate

Date: 2026-11-02

Scope:

- interaction controller outside the kernel
- invariant check after each dispatched interaction
- existing persistence adapter wiring
- human-facing presenters for all seven frozen views
- usable Start form for map title, task/orientation, task text, and privacy
- readable summaries and explicit empty states for the remaining six views

Observed result after the ES2020 compatibility correction:

- 25 tests passed
- 0 failed
- 0 skipped
- original 21-test CODE-0.1 regression set remains green
- 4 interaction-layer unit tests pass
- browser TypeScript build: PASS
- no files under `src/kernel/` changed

The initial interaction commit exposed an ES2020 compile incompatibility from `String.replaceAll`. The gate caught it; the interaction files were corrected to use ES2020-compatible replacement before this slice was accepted.

## CODE-0.1 People editing slice gate

Date: 2026-11-02

Scope:

- add one `SELF_PRF` through the interaction controller
- add other people only as `MY_MAP_OF_OTHER`
- add person claims only against `MY_MAP_OF_OTHER`
- force provenance choice between `OTHER_REPORT` and `USER_INFERENCE`
- keep provenance visible in the human-facing presenter
- keep "my map of this person" visible in the People screen
- refuse a second self representation
- refuse People-claim targeting of `SELF_PRF`
- add a GitHub Actions regression gate for future slices

GitHub Actions run:

- run id: `41554882727`
- tested head: `01cd25db600d0e52db1ab5a6a0189b781074620a`
- result: SUCCESS
- 31 tests passed
- 0 failed
- kernel TypeScript build: PASS
- browser TypeScript build: PASS
- no file under `src/kernel/` changed

The six new People tests cover single-self enforcement, `MY_MAP_OF_OTHER` creation, report provenance, inference provenance, invalid self targeting, and visible provenance/map-of-other presentation.

People editing slice: PASS.

## CODE-0.1 Institution editing slice gate

Date: 2026-11-02

Scope:

- add institutions only as `INSTITUTION`
- add constraints through existing `CONSTRAINT_ADD`
- keep constraint verification and rigidity as independent fields
- require explicit constraint scope
- keep institutions separate from persons
- do not invent an institution-to-constraint relation not represented by the frozen kernel
- keep Connections and Investigate untouched

GitHub Actions run:

- run id: `41555738633`
- tested head: `3f3e17c9a0c7ee46ca129a19eb6d016009b87a6e`
- result: SUCCESS
- 37 tests passed
- 0 failed
- kernel TypeScript build: PASS
- browser TypeScript build: PASS
- no file under `src/kernel/` changed

The six new Institution tests cover typed institution creation, blank-label rejection, independent verification/rigidity combinations, required constraint text/scope, and explicit presenter labeling of verification, rigidity, and scope.

Institution editing slice: PASS.

## CODE-0.1 Connections editing slice gate

Date: 2026-11-02

Scope:

- add typed connections through existing `CONNECTION_ADD`
- require existing source and target nodes
- preserve `PRACTICAL_POWER` and `AUTHORITY` as separate relation types
- add optional shared-task judgments through existing `SHARED_TASK_SET`
- permit `NONE_IDENTIFIED` with no manufactured task text
- require any shared-task participants to already exist in the map
- keep connection type and shared-task status visible in presentation
- keep Investigate untouched

GitHub Actions run:

- run id: `41556033238`
- tested head: `44bdc4d03c376a223ac11de11a4304a91908648d`
- result: SUCCESS
- 44 tests passed
- 0 failed
- kernel TypeScript build: PASS
- browser TypeScript build: PASS
- no file under `src/kernel/` changed

The seven new Connections tests cover practical-power/authority separation, missing-endpoint rejection, `NONE_IDENTIFIED` shared task, confirmed shared task with outside scope, unknown-participant rejection, and visible connection/shared-task presentation.

Connections editing slice: PASS.

## CODE-0.1 Investigate editing slice gate

Date: 2026-11-02

Scope:

- add user-entered paths through existing `PATH_ADD`
- preserve paths as possibilities rather than rankings, recommendations, or predictions
- record path unknowns explicitly
- link only existing constraints to paths
- add next actions only as `INFORMATION_GENERATING`
- keep inquiry actions distinct from commitments
- keep possibility/inquiry firewalls visible in presentation
- keep Return untouched

GitHub Actions run:

- run id: `41559583753`
- tested head: `a55c630047acf6c4bd404454c62f0ba31dd19cbf`
- result: SUCCESS
- 51 tests passed
- 0 failed
- kernel TypeScript build: PASS
- browser TypeScript build: PASS
- no file under `src/kernel/` changed

The seven new Investigate tests cover user-path creation without ranking metadata, existing-constraint linkage, unknown preservation, required path name, information-generating action type, required action text, and visible possibility/inquiry firewalls.

Investigate editing slice: PASS.

## CODE-0.1 Return editing slice gate

Date: 2026-11-03

Scope:

- create bounded authorial returns through existing `RETURN_ADD`
- require a current judgment
- require an explicit claim ceiling
- preserve remaining uncertainty and optional "not claiming" content
- link only existing next actions
- optionally create a task-targeted `REOPEN_ADD` item
- create an `OUTPUT_CARD_ADD` record carrying the bounded judgment, claim ceiling, next actions, and REOPEN condition
- keep current judgment distinct from final closure
- keep H/S/F untouched

GitHub Actions run:

- run id: `41623591194`
- tested head: `c5ff40132471f291c2b7e914d25553d65f46bfd0`
- result: SUCCESS
- 57 tests passed
- 0 failed
- kernel TypeScript build: PASS
- browser TypeScript build: PASS
- no file under `src/kernel/` changed

The six new Return tests cover bounded Return/output-card/REOPEN creation, required judgment/claim ceiling, existing-action linkage, REOPEN target validity, non-final current judgment without REOPEN, and visible uncertainty/claim-ceiling/REOPEN presentation.

Return editing slice: PASS.

## HSF-USABILITY-GATE-1

Date: 2026-11-03

Purpose:

- test add-time H/S/F adequacy before changing the frozen kernel;
- distinguish UI insufficiency from model insufficiency;
- audit prose/duplication workarounds;
- determine whether the Change Gate is earned.

Observed result:

- current data shape permits multiple H/S/F regions on nodes and claims;
- current interaction controls hard-code those created objects to `["S"]`;
- no existing action can change H/S/F on an existing node or claim;
- MapChange, Return, and REOPEN can describe a changed understanding but leave machine-readable H/S/F state stale;
- duplicating the object changes identity rather than reclassifying it.

Classification: **MODEL FAIL + ADD-TIME UI FAIL**.

GitHub Actions run:

- run id: `41626183556`
- tested head: `f775da3d91facc7001841a8dea59e8331cb02c6d`
- 64 tests passed
- 0 failed
- kernel TypeScript build: PASS
- browser TypeScript build: PASS
- no file under `src/kernel/` changed

Change Gate: **OPEN — narrowly justified**.

## HSF-CHANGE-SPEC-1

Date: 2026-11-03

Purpose:

- freeze the smallest admissible H/S/F reassignment contract before implementation;
- resolve target-type, empty-set, normalization, no-op, invariant, migration, and interaction semantics;
- keep the kernel untouched during specification.

Frozen design decisions:

- action: `HSF_SET`;
- target types: `NODE | CLAIM` only;
- at least one H/S/F region required;
- valid runtime values limited to H/S/F;
- duplicate regions normalize away;
- canonical stored order: H,S,F;
- unknown targets are exact no-ops;
- same-value normalized assignments are exact no-ops;
- only `hsf` may change;
- invariant validation enforces non-empty, valid, duplicate-free, canonical H/S/F arrays;
- add-time controls expose H/S/F with S selected by default;
- later reassignment occurs through the H/S/F view;
- F carries no prediction, ranking, recommendation, probability, inevitability, or commitment semantics;
- no schema-version bump authorized.

GitHub Actions run:

- run id: `41631287905`
- tested head: `4e4cfd2d59d5d127872658931fdb5204c733d9ec`
- 72 tests passed
- 0 failed
- browser TypeScript build: PASS
- kernel implementation files unchanged

Two earlier spec-test runs failed because of brittle literal-string assertions in the new contract tests. The specification itself was unchanged; the assertions were corrected to test the actual semantic language.

HSF-CHANGE-SPEC-1: PASS.

## HSF-CHANGE-IMPL-1

Date: 2026-11-03

Scope:

- add canonical H/S/F normalizer;
- add `HSF_SET` action for `NODE | CLAIM`;
- implement exact no-op behavior for unknown and same-value targets;
- enforce non-empty, valid, duplicate-free, canonical H/S/F invariants;
- preserve every non-H/S/F field during reassignment;
- expose H/S/F at creation time for self, other, institution, and person claims;
- add later reassignment controls in the H/S/F view;
- preserve relevance-not-intrinsic-time language and the F != prediction/recommendation firewall;
- update historical usability-gate tests to verify that the authorized repair resolves the previously documented blocker.

GitHub Actions run:

- run id: `41632144985`
- tested head: `85126e8bc196c6c6ce2d3462eb1b3e9c9d3cc16d`
- result: SUCCESS
- 90 tests passed
- 0 failed
- browser TypeScript build: PASS

Implementation result:

- node S -> H+S: PASS
- claim S -> S+F: PASS
- claim S+F -> S: PASS
- H+S+F: PASS
- duplicate normalization: PASS
- canonical H,S,F ordering: PASS
- empty/invalid rejection: PASS
- unknown target no-op: PASS
- same-value no-op: PASS
- node preservation contract: PASS
- claim preservation contract: PASS
- add-time selectors: PASS
- H/S/F reassignment controls: PASS
- F adds no prediction/recommendation fields: PASS
- prior Maya/Leila/Jordan and all previous regression coverage remain green

HSF-CHANGE-IMPL-1: PASS.

## SEVEN-VIEW-CONTINUITY-1

Date: 2026-11-03

Purpose:

- test the seven-view architecture as one unfolding inquiry rather than seven isolated screens;
- stress continuity of identity, provenance, H/S/F relevance, institutional constraint, connection type, possibility, and Authorial Return;
- test sparse-state legitimacy and unformed-task continuity;
- classify any discovered failure before repair.

Cases:

- Maya — differentiation without manufactured convergence;
- Leila — practical power without authority;
- Jordan — open orientation without forced task formation or recommendation.

Cross-view assertions:

- navigation itself does not mutate substantive map state;
- sparse Institution/Connections/Investigate views remain valid;
- H/S/F reassignment preserves identity and provenance;
- Return links backward to existing inquiry actions;
- claim ceilings and REOPEN preserve bounded revisability.

GitHub Actions run:

- run id: `41634487210`
- tested head: `87f0fc3a4aa4d08d5b2d967bb066dc45ad878566`
- result: SUCCESS
- 97 tests passed
- 0 failed
- browser TypeScript build: PASS

Continuity findings:

- Maya: PASS — report/inference distinction survives, H/S/F relevance can evolve on the same object, multiple paths remain unranked, bounded shared task does not imply agreement on final profession, and Return stays below its claim ceiling.
- Leila: PASS — practical power remains distinct from authority, verified/hard-currently funding constraint remains scoped, NONE_IDENTIFIED shared task remains legitimate, and Return does not convert leverage into authority.
- Jordan: PASS — UNFORMED task survives the entire sequence, Institution/Connections/Paths may remain empty, inquiry actions can exist without path construction, and Return does not manufacture a career recommendation.
- Cross-view identity continuity: PASS.
- Provenance continuity: PASS.
- H/S/F continuity: PASS.
- Sparse-state legitimacy: PASS.
- Possibility-without-recommendation: PASS.
- Authorial Return boundedness: PASS.

No new Change Gate was earned by this pass.

SEVEN-VIEW-CONTINUITY-1: PASS.

## FSP-TRANSLATION-1

Date: 2026-11-05

Purpose:

- establish an ontologically agnostic research formalism outside the Cartography kernel;
- decompose claims into proposition, evidence, warrant, background commitment, task, claim ceiling, ontology commitment, and standing;
- represent task-relative PRF-to-PRF translation without assuming a universal metalanguage;
- make translation remainder and translation failure first-class results;
- distinguish cooperation from mere coordination;
- add a coarse, transparent agency/anti-domination diagnostic;
- test repair as agency improvement without hidden worsening;
- preserve the Wittgensteinian ladder principle: the formalism is a reusable scaffold, not an ultimate ontology.

Executable research results:

- FULL_LOCAL translation: represented;
- PARTIAL / STRUCTURAL / TASK_ONLY distinctions: represented;
- translation FAILURE: represented;
- asymmetric translation remainder: represented;
- cooperation without ontological convergence: represented;
- shared-task rejection: preserved;
- coordination without full shared-task acceptance: preserved;
- severe agency-risk trigger under multiple blocked dimensions: represented;
- constrained agency does not automatically equal domination: preserved;
- agency-improving repair: represented;
- repair that worsens another agency dimension: rejected by minimal repair test.

GitHub Actions run:

- run id: `42021433363`
- tested head: `f54e20a25ae99be136aa5f39dafe320bee66db3a`
- result: SUCCESS
- 109 tests passed
- 0 failed
- browser TypeScript build: PASS

Research ceiling:

- no Duhem-Quine theorem is claimed;
- no universal PRF translatability is claimed;
- no normative domination theorem is claimed;
- the agency heuristic remains transparent and replaceable;
- no Cartography kernel semantics were changed.

FSP-TRANSLATION-1: PASS as a first executable research scaffold.

## FSP-TRANSLATION-2

Date: 2026-11-05

Purpose:

- instantiate four divergent PRFs in one contested forest case;
- require all 12 directed pairwise translations;
- preserve asymmetric remainder;
- operationalize a task-relative underdetermination candidate;
- negotiate rather than assume a shared task;
- audit institutional concentration of agenda, information, and decision power;
- test multi-party capability-preserving repair.

Integrated findings:

- complete 12-edge directed translation matrix: PASS;
- asymmetric translation remainder: PASS;
- STRUCTURAL and TASK_ONLY translation outcomes: PASS;
- missing directed translation is surfaced rather than inferred: PASS;
- candidate underdetermination supported when task signatures match and ontology differs: PASS;
- candidate theorem withheld when one task-relevant consequence differs: PASS;
- first task ("maximize economic value") rejected without manufactured cooperation: PASS;
- second task negotiated into cooperation without ontological convergence: PASS;
- institutional power audit identifies severe risk for the most blocked participant and concentration of agenda/information/decision power: PASS;
- capability-preserving multi-party repair: PASS;
- repair that increases information while worsening contestability/reopenability: FAILS as intended;
- relational and religious ontological remainders remain explicit after task agreement: PASS;
- property/market PRF retains bounded standing and is not modeled as unlimited-use entitlement: PASS.

GitHub Actions:

- initial integrated run `42025229645`: 122/123 tests passed, 1 failed;
- failure classification: fixture-construction mismatch, not formalism failure;
- cause: intended STRUCTURAL routes mixed STRUCTURAL and DIRECT correspondences, so the pre-existing classifier correctly returned PARTIAL;
- repair: align the forest fixture with the already frozen classification semantics; no TRANSLATION-1 classifier change.

Final regression:

- run id: `42025294279`;
- tested head: `5203c0fac89a994011f9cb0cffbe34c13f313910`;
- 123 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- the underdetermination result is task-relative and candidate only;
- equal task signatures do not establish global theoretical equivalence;
- no claim is made that all PRFs are mutually translatable;
- no claim is made that cooperation proves institutional legitimacy;
- the forest PRFs are formal stress constructs, not complete anthropological representations.

FSP-TRANSLATION-2: PASS as an integrated adversarial research case.

## FSP-TRANSLATION-3

Date: 2026-11-05

Purpose:

- test auxiliary-assumption divergence under evidence change;
- make translation remainder explicitly time-varying;
- distinguish robust underdetermination from task-relevant breakdown;
- force REOPEN when auxiliary support changes even if the visible task signature remains equivalent.

Perturbations:

1. **Convergent evidence** — a new nitrate observation is added to all four PRFs with a common task-relevant update.
   - candidate underdetermination remains supported;
   - result: ROBUST_UNDER_PERTURBATION.

2. **Divergent consequence** — C adds a non-substitutable sacred-spring consequence and an additional exclusion action.
   - A/C task signatures no longer match;
   - result: BROKEN_BY_TASK_RELEVANT_DIFFERENCE.

3. **Auxiliary-only instability** — A's model-transfer assumption becomes uncertain while the current visible task signature remains unchanged.
   - A->C translation remainder grows;
   - result: REOPEN_AUXILIARIES.

Executable findings:

- auxiliary assumptions may differ even under task-equivalent signatures: PASS;
- added/removed public evidence is tracked: PASS;
- parallel task-signature change can preserve underdetermination: PASS;
- task-relevant consequence divergence breaks the candidate: PASS;
- changed PRFs are explicitly identified: PASS;
- translation remainder can grow under new evidence: PASS;
- remainder dynamics remain directional: PASS;
- auxiliary support can change without current task-signature divergence: PASS;
- such instability triggers REOPEN rather than false robustness: PASS;
- robust results never license ontological uniqueness: PASS;
- a non-established baseline is not retroactively promoted: PASS.

GitHub Actions:

- run id: `42027084807`;
- tested head: `b827fe6d2c6e35c1ffd425a8dec4f9c652fb1ed5`;
- 135 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- no Duhem-Quine proof is claimed;
- robustness is relative to a specified perturbation class;
- hand-authored perturbations remain a limitation;
- auxiliary assumptions are represented explicitly but not yet causally generated;
- no claim is made that task-equivalence implies theoretical equivalence.

FSP-TRANSLATION-3: PASS as a temporal robustness test.

## FSP-TRANSLATION-4

Date: 2026-11-05

Purpose:

- reduce hand-tuning by adding a deterministic predeclared perturbation grammar;
- expose the underdetermination candidate to a broader perturbation suite;
- represent auxiliary assumptions as a sensitivity network;
- ablate auxiliary support nodes;
- detect false equivalence when matching actions hide deeper divergence.

Perturbation grammar:

- ADD_SHARED_EVIDENCE
- ADD_PRF_SPECIFIC_EVIDENCE
- REMOVE_SHARED_EVIDENCE
- ALTER_AUXILIARY
- ADD_CONSEQUENCE
- ADD_ACTION
- REMOVE_ACTION

Out-of-sample findings:

- generated suite is deterministic: PASS;
- duplicate perturbation IDs rejected: PASS;
- shared evidence can update all PRFs in parallel: PASS;
- PRF-specific evidence alters only its target structure: PASS;
- shared evidence can preserve the A/C candidate: PASS;
- PRF-specific evidence can break A/C task equivalence: PASS;
- auxiliary-only perturbation triggers REOPEN_AUXILIARIES: PASS.

Auxiliary-network findings:

- all declared auxiliary assumptions are exposed as network nodes: PASS;
- declared dependency ablation identifies task-level sensitivity: PASS;
- auxiliary ablation remains localized to the relevant PRF: PASS;
- unknown auxiliary nodes are rejected: PASS.

False-equivalence findings:

- same action + different auxiliary support is flagged: PASS;
- same action + different predicted consequences is flagged: PASS;
- genuinely matching local structures are not falsely flagged: PASS.

GitHub Actions:

- run id: `42027864066`;
- tested head: `206b9e63a574a0e054a4e499005f590eba695876`;
- 149 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- perturbation grammar is broader but still human-designed;
- auxiliary dependencies are declared rather than inferred;
- no autonomous hypothesis generator exists;
- survival under this suite does not establish global robustness;
- false-equivalence detection is local to the represented task dimensions.

FSP-TRANSLATION-4: PASS as a broader adversarial robustness test.

## FSP-TRANSLATION-5

Date: 2026-11-05

Purpose:

- replicate the translation grammar in a structurally different domain;
- use persistent-pain care as a domain-native comparator;
- test whether the same primitives survive without flattening domain differences;
- audit primitive necessity through ablation;
- impose an evidence-based publication-claim ceiling.

Comparator domain:

- P — patient lived-experience framework;
- C — clinical biomedical framework;
- I — insurance/utilization framework;
- S — cultural-spiritual meaning framework.

Domain-native boundaries preserved:

- first-person pain report has standing without proving a unique mechanism;
- clinical expertise licenses bounded recommendations without exhausting lived meaning;
- insurer authorization has institutional power without clinical or ontological authority;
- cultural-spiritual meaning may affect acceptable care without universalizing its metaphysics.

Cross-domain findings:

- persistent-pain comparator has a complete 12-edge directed translation matrix: PASS;
- forest and persistent-pain cases share the full current primitive set: PASS;
- replication does not require native-topology identity: PASS;
- incomplete translation matrices block replication: PASS;
- domain-specific primitive differences remain visible when introduced: PASS.

Primitive-ablation findings:

- TASK -> task-boundedness loss: PASS;
- EVIDENCE -> evidence-provenance loss: PASS;
- WARRANT -> licensing loss: PASS;
- BACKGROUND -> context-sensitivity loss: PASS;
- CLAIM_CEILING -> claim-restraint loss: PASS;
- ONTOLOGY -> ontological-pluralism loss: PASS;
- STANDING -> standing/anti-domination loss: PASS;
- REMAINDER -> loss-tracking and ontological-pluralism loss: PASS;
- AUXILIARY -> auxiliary-sensitivity loss: PASS;
- AGENCY -> anti-domination loss: PASS.

Publication ceiling:

- result: CROSS_DOMAIN_REPLICATION;
- universal/domain-general claims remain prohibited;
- Duhem-Quine proof remains prohibited;
- universal PRF translatability remains prohibited.

GitHub Actions:

- run id: `42028479399`;
- tested head: `f7b6173c16e5d11064c19d999a014d98c968ed38`;
- 163 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- both domains are still constructed cases;
- no external corpus or empirical human validation has yet been used;
- primitive ablation shows current non-redundancy, not logical minimality;
- only two domains have been replicated;
- no universal FSP translation theorem is licensed.

FSP-TRANSLATION-5: PASS as a cross-domain replication.

## FSP-TRANSLATION-6

Date: 2026-11-05

Purpose:

- add a third structurally different domain;
- compare FSP against a simpler external Claim-Evidence-Action baseline;
- challenge the current primitive set for minimality;
- convert the evidence into a publication architecture with explicit claim ceilings.

Third domain:

- Galileo 1633 trial / historical interpretation;
- PRFs: archival-historical, history-of-science, institutional-political, public-memory.

Third-domain findings:

- complete 12-edge directed translation matrix: PASS;
- shared primitive set across forest, persistent pain, and historical interpretation: PASS;
- native topologies remain distinct: PASS;
- archival incompleteness firewall: PASS;
- science-versus-religion oversimplification firewall: PASS;
- retrospective-projection firewall: PASS.

CEA comparator findings:

- Claim-Evidence-Action projection retains claim, evidence, and action: PASS;
- loses warrant: PASS;
- loses background commitments: PASS;
- loses claim ceiling: PASS;
- loses ontology commitments: PASS;
- loses standing: PASS;
- loses directed translation remainder: PASS;
- loses auxiliary assumptions: PASS;
- loses agency diagnostics: PASS;
- comparator loss reproduced outside historical domain: PASS.

Primitive-minimality findings:

- full ten-primitive set preserves all tested capabilities: PASS;
- CEA-like reduced subset is TOO_LOSSY: PASS;
- removing STANDING and AGENCY loses anti-domination capability: PASS;
- removing REMAINDER loses loss-tracking: PASS;
- reduced subsets can preserve many capabilities while losing specific others: PASS.

Publication architecture:

- empirical/formal validation paper: specified;
- formal philosophy paper: specified;
- philosophical architecture paper: specified;
- FSP-VR program paper: specified;
- claim ceiling: THREE-DOMAIN REPLICATION WITH COMPARATOR DELTA.

GitHub Actions:

- run id: `42028969261`;
- tested head: `7adb4d488cfc1401ae4548e930e386032e959bf1`;
- 177 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- all three domains are still constructed cases;
- CEA is a deliberately simple comparator, not an exhaustive survey of rival formalisms;
- primitive minimality is tested relative to the current capability set, not proven logically minimal;
- no external corpus or human validation has yet been incorporated;
- universal PRF translatability and universal domain generality remain unlicensed.

FSP-TRANSLATION-6: PASS as a third-domain comparative replication.

## FSP-TRANSLATION-7

Date: 2026-11-05

Purpose:

- move beyond exclusively FSP-authored cases;
- reconstruct an externally specified AIF/xAIF sample;
- compare CEA, AIF, and FSP as rival representational formalisms;
- require independent coding agreement on native external structure;
- freeze the canonical repository as monograph-scale and protect it from submission word-count compression.

External-source findings:

- public ARG Tech AIF tutorial sample reconstructed: PASS;
- locution/content distinction preserved: PASS;
- information nodes preserved: PASS;
- inference relation represented: PASS;
- participant attribution preserved: PASS;
- native AIF strengths distinguished from later FSP augmentation: PASS;
- public external corpus registry includes QT30 and AIFdb targets: PASS;
- no corpus-scale import claim made: PASS.

Rival-formalism findings:

- CEA, AIF, and FSP comparator profiles present: PASS;
- AIF-specific argument representation preserved rather than normalized away: PASS;
- FSP delta includes claim ceiling, standing, translation remainder, agency audit, and REOPEN: PASS;
- comparator framing remains functional rather than claiming AIF was designed for FSP tasks: PASS.

Independent-coding findings:

- independent coders agree on core information nodes: PASS;
- relation-type agreement: PASS;
- participant agreement: PASS;
- task inference may disagree without invalidating native-source agreement: PASS;
- FSP remainder coding may disagree without invalidating native-source agreement: PASS;
- source mismatch is rejected: PASS.

Canonical research architecture:

- canonical mode: MONOGRAPH_SCALE;
- compression policy: NO_SUBMISSION_LIMIT_ON_CANONICAL;
- journal/conference papers are derived export profiles;
- canonical support must never be deleted solely to satisfy a word count;
- failed tests, repair history, alternative hypotheses, extended cases, comparator analyses, claim ceilings, and future branches are protected research assets.

GitHub Actions:

- run id: `42029769697`;
- tested head: `be239a1731b38d4fbe78901b8368d99842e57096`;
- 191 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- external AIF reconstruction currently uses a public tutorial sample, not a corpus-scale import;
- QT30/AIFdb are registered external targets but not yet ingested;
- rival-formalism set is still limited;
- independent coding is simulated by two explicit codings, not yet by independent human researchers;
- no human-fidelity validation is claimed.

FSP-TRANSLATION-7: PASS as an external-source comparative research layer.

## FSP-TRANSLATION-8

Date: 2026-11-05

Purpose:

- import bounded raw AIF subgraphs from more than one external source;
- preserve original node IDs exactly;
- keep FSP governance fields as separate overlays;
- recover native AIF and FSP-added audit queries;
- test non-redundancy by compression ablation.

External raw sources:

1. `arg-tech/ACH-ArgNav/uploaded_data/FFkosciuszko00219.json`
   - observed source scale: 1,195 nodes / 1,383 edges;
   - imported bounded conflict subgraph around original CA node `610187`;
   - original connected IDs preserved: `610172`, `610185`.

2. `arg-tech/AMF_Scheme_Classifier2/data/corpespotway.json`
   - observed source scale: 739 nodes / 784 edges;
   - imported bounded inference subgraph around original RA node `1201647_164813044708340528`;
   - original connected IDs preserved: `1196468_164813044708340528`, `1196586_164813044708340528`, `1201649_164813044708340528`.

Raw-import findings:

- original node IDs preserved exactly: PASS;
- raw edge IDs preserved: PASS;
- zero dangling edges in imported bounded subgraphs: PASS;
- cross-corpus identity handled by <corpusId,nodeID>, not renumbering: PASS;
- augmentation targeting unknown node rejected: PASS;
- augmentation corpus mismatch rejected: PASS.

Audit-query findings:

- native CA conflict recovery: PASS;
- native RA inference recovery: PASS;
- FSP standing recovery: PASS;
- FSP remainder recovery: PASS;
- FSP claim-ceiling recovery: PASS;
- FSP REOPEN recovery: PASS;
- FSP overlays target original raw node IDs without altering raw graph: PASS.

Compression-ablation findings:

- RAW_ONLY preserves native relation query and loses FSP governance queries: PASS;
- NO_REMAINDER selectively loses remainder query: PASS;
- NO_STANDING selectively loses standing query: PASS;
- NO_CLAIM_CEILING selectively loses claim-ceiling query: PASS;
- NO_REOPEN selectively loses reopen query: PASS;
- unrelated native AIF relation queries survive each governance-field ablation: PASS;
- FULL profile loses no tested queries: PASS.

GitHub Actions:

- run id: `42030668529`;
- tested head: `35b5cb098bb039a2ba97b7dccf29e682295c6564`;
- 207 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- this is multi-source raw-graph ingestion, not full-corpus QT30 ingestion;
- bounded connected subgraphs are used rather than mirroring complete external datasets;
- FSP overlays are hand-authored and not yet independently coded at corpus scale;
- audit-query utility is demonstrated on the tested queries only;
- no superiority claim over AIF is licensed.

FSP-TRANSLATION-8: PASS as a raw multi-source AIF augmentation and compression-ablation test.

## FSP-TRANSLATION-9

Date: 2026-11-05

Purpose:

- scale from isolated bounded subgraphs to a six-nodeset external batch;
- preserve corpus-scoped original identities across overlapping local neighborhoods;
- add sampled independent augmentation coding;
- measure audit-query recovery as batch size grows;
- compute compression-retention curves;
- add corpus-level failure audits.

Batch composition:

- 6 nodesets;
- 2 external corpora;
- Kosciuszko: 2 conflict neighborhoods + 1 inference neighborhood;
- Otway: 3 inference neighborhoods;
- repeated source nodes permitted across nodesets when <corpusId,nodeID>, type, and text agree.

Batch-ingestion findings:

- six nodesets across two corpora: PASS;
- original IDs preserved: PASS;
- zero dangling edges: PASS;
- repeated identical source nodes do not produce false conflicts: PASS;
- conflicting reuse of the same corpus-scoped identity is detected: PASS.

Sampled augmentation-coding findings:

- target-node agreement: PASS;
- task agreement: PASS;
- claim-ceiling agreement: PASS;
- structural agreement threshold: PASS;
- remainder disagreement remains visible without forcing structural failure: PASS;
- nodeset mismatch rejected: PASS.

Query-scaling findings:

- RA relation recovery is monotonic as RA-containing nodesets are added: PASS;
- standing-query recovery increases with augmented batch size: PASS;
- query semantics remain stable across batch growth: PASS.

Compression-retention findings:

- FULL retention = 1.0: PASS;
- RAW_ONLY retention is lower than FULL: PASS;
- each single-field governance ablation retains more than RAW_ONLY: PASS;
- each single-field governance ablation causes selective nonzero loss: PASS.

Corpus-level failure findings:

- healthy batch passes required RA/CA/standing/remainder/claim-ceiling/REOPEN queries: PASS;
- missing required MA relation family is detected as query failure: PASS;
- nodeset without augmentation is surfaced separately from native-query integrity: PASS;
- corpus-level failure audit distinguishes augmentation coverage from raw-graph validity: PASS.

GitHub Actions:

- run id: `42031578466`;
- tested head: `8ce24ed913e132ea97f0c62f16c705949b2c205e`;
- 223 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- batch size is six bounded nodesets, not full-corpus ingestion;
- sampled independent coding is represented by two explicit codings, not independent human coders;
- query scaling is semantic/count scaling, not performance benchmarking;
- no automatic extraction or augmentation is claimed;
- no statistical generalization to arbitrary AIF corpora is licensed.

FSP-TRANSLATION-9: PASS as a batch nodeset scaling and corpus-level failure test.

## FSP-TRANSLATION-10

Date: 2026-11-05

Purpose:

- replace hand-selected relation neighborhoods with deterministic raw-AIF extraction;
- stratify sampling across RA, CA, and MA relation families;
- freeze a future human-coder protocol before human validation;
- add query-performance benchmarking;
- require a multi-dimensional scale-up acceptance gate.

Automatic extraction findings:

- Kosciuszko raw document yields RA, CA, and MA neighborhoods: PASS;
- Otway raw document yields RA, CA, and MA neighborhoods: PASS;
- repeated extraction is deterministic: PASS;
- original relation-node IDs preserved: PASS;
- connected original edge IDs preserved: PASS.

Stratified sampling findings:

- one-per-stratum RA/CA/MA sample: PASS;
- missing relation strata reported rather than substituted: PASS;
- invalid zero sample request rejected: PASS.

Human-coder protocol:

- protocol version: FSP-AIF-CODER-1.0;
- protocol frozen before human coding: PASS;
- coder independence required: PASS;
- other-coder record hidden until submission: PASS;
- target/task/claim-ceiling/standing/remainder/REOPEN required: PASS;
- original AIF ID rewriting forbidden: PASS;
- disagreement erasure forbidden: PASS;
- malformed protocol detected: PASS.

Query-performance findings:

- benchmark executes declared iteration/query count: PASS;
- benchmark returns nonzero matches: PASS;
- nonpositive iterations rejected: PASS;
- current committed fixture benchmark remains below 25 ms mean execution threshold: PASS.

Scale-up gate findings:

- healthy current fixture state: PASS;
- missing MA coverage blocks scale-up: PASS;
- source-ID failure blocks scale-up: PASS;
- dangling edges block scale-up: PASS;
- unfrozen coder protocol blocks scale-up: PASS;
- structural coding agreement below 0.80 blocks scale-up: PASS;
- mean query time above 25 ms blocks scale-up: PASS;
- required-query failures block scale-up: PASS;
- fewer than six extracted nodesets blocks scale-up: PASS.

GitHub Actions:

- run id: `42032280909`;
- tested head: `9cea7d3c9c2ce0151a80f157ec2780d8ed26adc3`;
- 239 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- human-coder protocol is frozen but no genuine human inter-coder data exist yet;
- performance threshold is a regression guard, not a hardware-independent benchmark claim;
- raw-document fixtures are bounded extracts from external corpora, not full-corpus mirrors;
- automatic extraction is structural, not automatic semantic FSP augmentation;
- no statistical generalization across arbitrary AIF corpora is licensed.

FSP-TRANSLATION-10: PASS as a reproducible extraction and scale-up-gate build.

## FSP-TRANSLATION-11

Date: 2026-11-05

Purpose:

- increase the external batch from six to thirty automatically selected nodesets;
- preserve a stratified 10 RA / 10 CA / 10 MA sample;
- prepare an executable external human-coder trial packet under the frozen protocol;
- replace mean-only latency with latency-distribution measurement;
- distinguish infrastructure scale-up PASS from human-coding evidence PENDING.

Large-batch findings:

- committed sample size: 30 nodesets;
- RA: 10;
- CA: 10;
- MA: 10;
- source corpora: 2;
- Kosciuszko contribution: 17;
- Otway contribution: 13;
- MA source imbalance preserved rather than normalized away: 7 Kosciuszko / 3 Otway;
- deterministic large-sample reconstruction: PASS;
- relation shortfall reporting without fabricated substitutes: PASS.

Human-coder trial packet:

- packet version: FSP-AIF-HUMAN-TRIAL-1.0;
- protocol version: FSP-AIF-CODER-1.0;
- protocol frozen: PASS;
- packet samples all RA/CA/MA strata: PASS;
- raw source node/edge identities preserved: PASS;
- coding fields blank at distribution: PASS;
- other-coder interpretation not embedded: PASS;
- human validation status remains PENDING.

Latency-distribution findings:

- mean latency recorded: PASS;
- p50 latency recorded: PASS;
- p95 latency recorded: PASS;
- maximum latency recorded: PASS;
- requested query workload executed: PASS;
- native relation matches recovered: PASS;
- committed 30-nodeset fixture remains below current 25 ms p95 CI threshold: PASS.

Scale-up regression:

- baseline: 6 nodesets;
- large batch: 30 nodesets;
- strict scale increase: PASS;
- RA/CA/MA coverage: PASS;
- two-corpus coverage: PASS;
- native-query recovery: PASS;
- p95 threshold: PASS;
- infrastructureStatus: PASS;
- humanCodingStatus: PENDING;
- deliberately excessive p95 blocks regression: PASS;
- missing MA family blocks regression: PASS;
- non-increasing scale blocks regression: PASS.

GitHub Actions:

- run id: `42033055250`;
- tested head: `02c55eb77cfd4e756d30ddca808a8d79374e32be`;
- 255 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- this is infrastructure-scale evidence, not completed human inter-coder reliability;
- the 30-node sample is materially larger but still not full-corpus ingestion;
- source sampling is relation-stratified, not statistically representative of all AIF corpora;
- performance figures remain CI regression metrics rather than hardware-independent benchmarks;
- semantic FSP augmentation remains human-reviewed rather than automatic.

FSP-TRANSLATION-11: PASS as a large-batch infrastructure regression with human-coder trial PENDING.

## FSP Duhem–Quine Application

Date: 2026-11-05

Purpose:

- apply current FSP translation machinery to canonical Duhemian and Quinean problem structures;
- distinguish what FSP represents from what it does not solve.

Applied cases:

- Foucault light-speed / wave-versus-emission crucial-experiment case;
- Uranus anomaly -> Neptune auxiliary repair;
- Mercury perihelion -> failed Vulcan auxiliary repair -> deeper theoretical revision;
- Quinean web-of-belief revision pressure.

FSP mapping:

- Duhemian grouped testing maps to claim/evidence/warrant/background/auxiliary/task/claim-ceiling representation;
- Uranus/Neptune maps naturally to REOPEN_AUXILIARIES followed by successful evidential repair;
- Mercury/Vulcan prevents an auxiliary-repair bias and requires temporally defeasible robustness;
- Foucault discrimination can break a represented task-level prediction equivalence without licensing ontological uniqueness;
- Quinean web revision can be represented as distributed revision pressure across claims, warrants, background, ontology, auxiliaries, and tasks.

Claim ceiling:

- FSP does not identify a uniquely correct revision target;
- FSP does not prove all rival theories translatable;
- FSP does not supply a universal simplicity metric or scientific-good-sense algorithm;
- FSP does not prove realism, antirealism, or Duhem–Quine;
- FSP's contribution is to make underdetermination/revision structure inspectable and governable.

Artifact: `FSP-DUHEM-QUINE-APPLICATION.md`.

## FSP-TRANSLATION-12

Date: 2026-11-05

Purpose:

- freeze the human-coder execution and evaluation architecture before obtaining human coders;
- separate structural from interpretive agreement;
- audit protocol fidelity;
- protect independent records during adjudication;
- enforce a three-valued post-human gate.

Frozen trial boundary:

- packet version: `FSP-AIF-HUMAN-TRIAL-1.0`;
- protocol version: `FSP-AIF-CODER-1.0`;
- structural fields: targetNode, task, claimCeiling;
- interpretive fields: standing, remainder, reopenCondition;
- structural agreement threshold: 0.80;
- adjudication occurs only after agreement measurement;
- original independent records must be preserved;
- gate states: PASS / FAIL / PENDING;
- synthetic/model coding cannot count as human evidence.

Executable findings:

- complete coding records pass protocol fidelity: PASS;
- version/required-field violations fail fidelity: PASS;
- structural and interpretive agreement are separated: PASS;
- interpretive disagreement may remain visible while structural threshold passes: PASS;
- substantial structural divergence fails threshold: PASS;
- missing coded items block structural pass: PASS;
- provenance-preserving adjudication passes: PASS;
- destructive adjudication fails: PASS;
- zero-coder state remains PENDING: PASS;
- one-coder state remains PENDING: PASS;
- two-coder completed evidence can PASS only with all safeguards: PASS;
- completed trial below 0.80 structural agreement FAILS: PASS;
- adjudication-firewall violation FAILS: PASS;
- unresolved critical disagreement FAILS: PASS;
- infrastructure regression blocks post-human PASS: PASS.

Current evidential state:

- TRANSLATION-11 infrastructure: PASS;
- human trial packet: READY;
- independent human coders completed: 0;
- human trial executed: NO;
- post-human scale gate: PENDING.

GitHub Actions:

- run id: `42033951542`;
- tested head: `171f3cdb21157a23584353126afa406cd5735bdf`;
- 269 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

FSP-TRANSLATION-12: PROTOCOL ARCHITECTURE FROZEN / HUMAN EVIDENCE PENDING.

## FSP-REVISION-1

Date: 2026-11-05

Purpose:

- branch from the frozen translation program into explicit revision governance;
- distinguish revision targets rather than treating all reopening as theory replacement;
- compare Neptune-style successful auxiliary repair with Vulcan-style failed auxiliary repair;
- audit minimal mutilation without converting it into a decision rule;
- freeze a revision-choice claim ceiling.

Revision-target grammar:

- EVIDENCE_ASSESSMENT
- AUXILIARY
- WARRANT
- BACKGROUND
- CLAIM_CEILING
- TASK
- ONTOLOGY
- FRAMEWORK

Comparator findings:

- Neptune auxiliary repair changes only the auxiliary dimension: PASS;
- Neptune repair can be low-mutilation and empirically supported: PASS;
- Vulcan repair can be low-mutilation and empirically FAILED: PASS;
- relativity-style framework revision can be more disruptive yet empirically SUPPORTED: PASS;
- claim-ceiling contraction is representable without theory replacement: PASS;
- revision frontier separates least-mutilating, supported, unresolved, and failed candidates: PASS;
- revision frontier returns recommendation = null: PASS.

Minimal-mutilation audit:

- initial run exposed a model weakness: simple changed-item counting treated one auxiliary replacement and one framework replacement as equally mutilating;
- initial run `42035569822`: 283/284 passed, 1 failed;
- failure classified as metric-design failure, not historical-fixture failure;
- repair: add transparent revision-scope cost by target type while keeping empirical status independent;
- auxiliary scope cost remains lower than framework scope cost;
- corrected run: PASS.

Revision-choice firewall:

- least mutilation does not imply empirical support: PASS;
- least mutilation does not imply rational mandate: PASS;
- successful auxiliary repair does not prove retained ontology/framework uniquely true: PASS;
- failed auxiliary repair does not mandate immediate framework replacement: PASS;
- untouched dimensions remain preserved by typed revision operations: PASS.

GitHub Actions:

- corrected run id: `42035699148`;
- tested head: `d7e416499a648b7c15794365a7c02fdf009e050c`;
- 284 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- revision-scope costs are transparent research parameters, not universal rational weights;
- FSP does not identify the uniquely correct revision target;
- minimal mutilation is an audit dimension, not a theory-choice algorithm;
- Neptune/Vulcan are structured comparators, not complete historical reconstructions;
- human-validation state from TRANSLATION-12 remains PENDING.

FSP-REVISION-1: PASS as the first governed revision-space build.

## FSP-REVISION-2

Date: 2026-11-05

Purpose:

- formalize reasons bearing on movement within the revision frontier;
- keep evidence, coherence, simplicity, fecundity, scope, conservatism, and explanatory power distinct;
- model Duhemian/Kuhnian good-sense disagreement without hidden weighting;
- audit path dependence without confusing formation with justification;
- enforce a non-algorithmic theory-choice boundary.

Revision-reason grammar:

- EVIDENCE_FIT
- COHERENCE
- SIMPLICITY
- FECUNDITY
- SCOPE
- CONSERVATISM
- EXPLANATORY_POWER

Tradeoff findings:

- three-candidate Neptune/Vulcan/relativity matrix constructed: PASS;
- candidate profiles preserve conflicting virtues: PASS;
- relativity can win on evidence/fecundity/scope while losing on conservatism/simplicity: PASS;
- Vulcan can remain conservative while strongly disfavored by evidence: PASS;
- no universal weighted sum or hidden recommendation is produced: PASS;
- matrix recommendation remains null: PASS.

Good-sense comparator:

- evaluator profiles may order salient reasons differently: PASS;
- underlying candidate facts remain unchanged across evaluator profiles: PASS;
- provisional disagreement can be represented without declaring one evaluator uniquely rational: PASS.

Path-dependence findings:

- inherited framework/practice/infrastructure/training/institutional constraints represented: PASS;
- path-dependent items must come from the declared context: PASS;
- formation/justification firewall explicit: PASS;
- historical familiarity may explain uptake without automatically counting as epistemic support: PASS.

Non-algorithmic boundary:

- evidence fit/coherence/simplicity/fecundity/scope/conservatism/explanatory power may be compared: PASS;
- path-dependent costs and affordances may be compared: PASS;
- universal weighted sum prohibited: PASS;
- hidden recommendation score prohibited: PASS;
- fixed lexical priority among virtues prohibited: PASS.

GitHub Actions:

- run id: `42036511717`;
- tested head: `94d254067f7fbf67def1e4dbbcd54898ff844a74`;
- 295 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- theory virtues are represented as inspectable reasons, not universal rational weights;
- good-sense profiles are structured comparators, not empirical psychological models;
- path-dependence classifications remain researcher-authored;
- no universal theory-choice algorithm is licensed;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-2: PASS as a plural revision-reason and non-algorithmic choice build.

## FSP-REVISION-3

Date: 2026-11-05

Purpose:

- make revision reasons diachronic rather than static;
- track evidence-driven reason changes and salience changes without hidden utility;
- model community disagreement and multiple forms of convergence/nonconvergence;
- preserve cooperation without theoretical convergence.

Temporal dynamics:

- ordered revision moments: PASS;
- added/removed evidence recovery: PASS;
- Vulcan EVIDENCE_FIT can move UNRESOLVED -> STRONGLY_COUNTS_AGAINST: PASS;
- relativity EVIDENCE_FIT and FECUNDITY can strengthen: PASS;
- hiddenUtilityScore remains null: PASS.

Evidence reweighting:

- salience changes require explicit triggering evidence: PASS;
- salience changes require explicit justification: PASS;
- numericWeight remains null: PASS;
- evidence salience may rise while conservatism remains represented separately: PASS.

Community convergence grammar:

- FULL_CONVERGENCE: PASS;
- CHOICE_CONVERGENCE_WITH_REASON_PLURALISM: PASS;
- PRACTICAL_CONVERGENCE_ONLY: PASS;
- REASON_CONVERGENCE_WITH_CHOICE_DIVERGENCE: PASS;
- NONCONVERGENCE: PASS;
- forcedConsensus remains false in all cases: PASS.

Mercury community findings:

- early community can disagree on Vulcan vs relativity while sharing action to collect further evidence: PASS;
- later community can converge on relativity while retaining different stated reasons: PASS;
- same reasons need not imply same revision choice: PASS;
- nonconvergence remains legitimate output: PASS.

GitHub Actions:

- run id: `42038275434`;
- tested head: `27680abdce2403007112963ec59aa3402e5f0ccb`;
- 309 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- community members are structured research fixtures, not empirical sociological subjects;
- reason salience is categorical and researcher-authored;
- no hidden utility, majority truth rule, or convergence mandate is licensed;
- convergence of action, choice, reasons, and ontology remain distinct;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-3: PASS as a diachronic and social revision-governance build.

## FSP-REVISION-4

Date: 2026-11-05

Purpose:

- distinguish legitimate persistent disagreement from disagreement distorted by evidence asymmetry, constrained standing, or practical power;
- preserve minority reports under majority uptake;
- separate epistemic authority, procedural authority, and practical power;
- audit reopenability and retaliation risk;
- protect nonconvergence without making dissent epistemically privileged.

Minority-report findings:

- minority report can be preserved under a majority candidate: PASS;
- provenance/evidence/reopen conditions remain attached: PASS;
- majority convergence does not authorize truth: PASS;
- minority dissent does not authorize truth: PASS;
- lost minority report is governance failure: PASS.

Evidence-asymmetry findings:

- blocked evidence access detected: PASS;
- asymmetric evidence IDs detected: PASS;
- blocked interpretive contestability separately visible: PASS;
- persistent disagreement under material evidence asymmetry classified DISTORTED_BY_ASYMMETRY: PASS.

Authority/power findings:

- procedural authority alone does not create distortion: PASS;
- practical power is represented separately from epistemic authority: PASS;
- uncontestable practical power presented as technical/expert basis produces SEVERE distortion risk: PASS;
- power-distorted disagreement classified DISTORTED_BY_POWER: PASS.

Standing/reopen findings:

- constrained or denied standing surfaced: PASS;
- inability to submit dissent surfaced: PASS;
- inability to request REOPEN surfaced: PASS;
- severe retaliation risk surfaced: PASS;
- denied reopenability prevents classification as clean legitimate pluralism: PASS.

Legitimate nonconvergence:

- symmetric access + full standing + preserved dissent + open REOPEN + live unresolved questions -> LEGITIMATE_PENDING_INQUIRY: PASS;
- same fair conditions with exhausted represented unresolved questions -> LEGITIMATE_PERSISTENT_PLURALISM: PASS;
- forced truth from majority or minority status remains prohibited: PASS.

GitHub Actions:

- run id: `42039273198`;
- tested head: `3208877a99c8e43a3f9d549e7ca08e2a2539bfc0`;
- 324 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- authority/power classifications are research constructs, not a complete political theory;
- practical power may coexist with genuine expertise, but power itself supplies no epistemic warrant;
- legitimate nonconvergence requires fair-enough inquiry conditions in the represented case;
- minority preservation is a governance requirement, not a truth privilege;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-4: PASS as a persistent-disagreement / anti-distortion revision-governance build.

## FSP-REVISION-5

Date: 2026-11-05

Purpose:

- distinguish credibility distortion from interpretive-resource gaps;
- model standing and contestability repair;
- preserve counter-public evidence without auto-privileging it;
- define revision re-entry conditions;
- retain provenance and remainder through repair.

Testimonial-distortion findings:

- credibility deficit + prejudice indicators -> possible testimonial injustice candidate: PASS;
- credibility excess separately representable: PASS;
- no-opportunity-to-respond surfaced as procedural deficit: PASS;
- testimonial audit does not infer testimony truth: PASS.

Hermeneutical-distortion findings:

- interpretive gap + exclusion from meaning-making -> possible hermeneutical injustice candidate: PASS;
- interpretive gap without exclusion does not automatically count as injustice: PASS;
- missing concepts and repair targets remain explicit: PASS.

Standing/contestability repair:

- testimony submission restoration: PASS;
- question raising restoration: PASS;
- hypothesis proposal restoration: PASS;
- concept proposal restoration: PASS;
- interpretive contestability restoration: PASS;
- safer participation restoration: PASS.

Counter-public evidence:

- contributor/evidence/provenance validation: PASS;
- dominant-interpretation challenge capacity required: PASS;
- counter-public evidence auto-privileged = false: PASS;
- missing provenance blocks validation: PASS.

Revision re-entry:

- fully repaired candidate -> REENTER: PASS;
- candidate with remaining interpretive gap -> REENTER_WITH_REMAINDER: PASS;
- unresolved retaliation -> BLOCKED_UNRESOLVED_DISTORTION: PASS;
- invisible provenance -> BLOCKED_PROVENANCE: PASS;
- unrestored standing -> BLOCKED_STANDING: PASS;
- unrestored contestability -> BLOCKED_CONTESTABILITY: PASS;
- re-entry authorizes truth = false: PASS.

GitHub Actions:

- run id: `42045268214`;
- tested head: `826d3abfaa78d5ce2acacb2cca6e98ce379b2be1`;
- 341 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- testimonial/hermeneutical injustice classifications are represented candidates, not complete sociological diagnoses;
- credibility repair does not establish truth;
- counter-public origin does not confer epistemic privilege;
- interpretive gaps may persist after fair re-entry;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-5: PASS as an epistemic-standing / interpretive-repair revision-governance build.

## FSP-REVISION-6

Date: 2026-11-05

Purpose:

- represent concept formation and concept provenance;
- compare competing interpretive resources without selecting a forced winner;
- formalize partial, structural, task-only, and failed concept translation;
- audit institutional concept capture/co-option;
- preserve practical coordination under lexical nonconvergence.

Concept-formation findings:

- concept ID/label/contributor/evidence/definition/scope/provenance structure: PASS;
- missing provenance invalidates concept record: PASS;
- counter-public, dominant, shared, emergent, and institutional origins remain distinguishable: PASS;
- concept origin does not authorize truth: PASS.

Interpretive-resource competition:

- multiple vocabularies remain representable simultaneously: PASS;
- partial translation bridges remain visible: PASS;
- failed translation is represented as incompatibility rather than forced equivalence: PASS;
- unresolved translation remainder preserved: PASS;
- resource winner remains null: PASS.

Concept capture/co-option:

- healthy institutional adoption preserving definition/provenance/contributors/contestability is not capture: PASS;
- semantic change alone is insufficient for co-option: PASS;
- semantic shift + provenance loss/contributor displacement/contestability loss -> possible capture: PASS;
- retained label + expanded institutional authority + capture conditions -> possible co-option: PASS;
- audit claim ceiling does not infer wrongful intent: PASS.

Shared-language outcomes:

- SHARED_LANGUAGE_CONVERGENCE: PASS;
- PARTIAL_TRANSLATION_BRIDGE: PASS;
- PRACTICAL_COORDINATION_WITH_LEXICAL_PLURALISM: PASS;
- IRREDUCIBLE_LEXICAL_NONCONVERGENCE: PASS;
- DISTORTED_BY_CONCEPT_CAPTURE: PASS;
- shared action does not require one vocabulary: PASS;
- one vocabulary does not authorize truth: PASS.

GitHub Actions:

- run id: `42047881429`;
- tested head: `1fc63184366a5b14433f30aaa28ea26a029952a5`;
- 358 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- concept-capture classifications are governance diagnostics, not complete semantic histories;
- semantic change and institutional adoption are not automatically wrongful;
- partial translation does not imply global equivalence;
- lexical nonconvergence may remain legitimate;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-6: PASS as a concept-formation / vocabulary-governance revision build.

## FSP-REVISION-7

Date: 2026-11-05

Purpose:

- add concept genealogy and ordered historical versions;
- represent semantic drift through institutional sedimentation;
- formalize cross-generation translation and false-friend risk;
- re-audit formation versus justification;
- add historical REOPEN conditions.

Genealogy findings:

- ordered concept versions validated: PASS;
- sedimentation links validated: PASS;
- policy/curriculum/institutional carriers preserved: PASS;
- continuity does not imply identity: PASS.

Semantic-drift findings:

- definition drift detected: PASS;
- scope drift detected: PASS;
- contrast-set drift detected: PASS;
- provenance loss detected: PASS;
- contestability loss detected: PASS;
- accumulated omissions preserved: PASS;
- accumulated additions preserved: PASS;
- historical persistence never establishes justification: PASS.

Cross-generation translation:

- origin -> policy = CONTINUITY_WITH_REMAINDER: PASS;
- origin -> training = PARTIAL_INHERITANCE: PASS;
- later generic meaning projected backward = FALSE_FRIEND: PASS;
- back-projection risk preserved explicitly: PASS;
- unknown-version translation rejected: PASS.

Formation/justification re-audit:

- persistence evidence separated from formation explanation: PASS;
- independent current justification remains separately required: PASS;
- persistenceJustifiesCurrentUse = false: PASS;
- formationExplainsPersistence may be true without licensing current use: PASS.

Historical REOPEN:

- SEMANTIC_DRIFT trigger: PASS;
- PROVENANCE_LOSS trigger: PASS;
- CONTESTABILITY_LOSS trigger: PASS;
- TASK_CHANGE trigger: PASS;
- NEW_EVIDENCE trigger: PASS;
- CROSS_GENERATION_FALSE_FRIEND trigger: PASS;
- CAPTURED_SEDIMENTATION trigger: PASS;
- historical persistence authorizes present use = false: PASS;
- false-friend or captured-sedimentation cases block provisional continuation: PASS.

GitHub Actions:

- run id: `42049129281`;
- tested head: `03b617512a2e7d2fcec45f09bfd9d937736c88d5`;
- 375 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- genealogies are structured research reconstructions, not complete intellectual histories;
- sedimentation events do not by themselves establish causal sufficiency;
- semantic drift does not imply corruption;
- inheritance may remain provisionally usable after REOPEN where serious capture/back-projection risks are absent;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-7: PASS as a historical concept-genealogy / sedimentation-governance build.

## FSP-REVISION-8

Date: 2026-11-05

Purpose:

- move from single-concept genealogy to institutional sedimentation networks;
- represent multi-concept coevolution;
- model policy/practice feedback loops;
- audit historical lock-in without equating it with justification;
- expose bounded repair windows;
- compare cross-generational capability effects.

Institutional network findings:

- concept/policy/practice/institution/capability/resource nodes represented: PASS;
- network edge integrity enforced: PASS;
- dangling-edge detection: PASS;
- ENCODES/REINFORCES/CONSTRAINS/ENABLES/FEEDS_BACK_INTO relations represented: PASS.

Multi-concept coevolution:

- two concept genealogies may coevolve through shared institutions: PASS;
- shared institutional uptake does not imply conceptual identity: PASS;
- tensions and joint drift remain explicit: PASS;
- single-genealogy pseudo-coevolution rejected: PASS.

Policy/practice feedback:

- policy shapes practice: PASS;
- practice feeds back into policy: PASS;
- reinforcing and dampening conditions preserved: PASS;
- unknown feedback nodes rejected: PASS.

Historical lock-in:

- switching costs detected: PASS;
- reinforcing loops detected: PASS;
- suppressed alternatives detected: PASS;
- LOW/MEDIUM/HIGH lock-in strength representable: PASS;
- lockInJustifiesContinuation = false: PASS;
- absent path-dependence indicators do not fabricate lock-in: PASS.

Repair windows:

- window opens only when all declared opening conditions are active: PASS;
- missing opening conditions keep window closed: PASS;
- severe retaliation / blocking conditions can close window: PASS;
- repairMandatory = false: PASS.

Cross-generational capability:

- generations 1-2 may show expansion: PASS;
- later generation may show MIXED effect: PASS;
- later generation may show CONSTRAINS effect: PASS;
- intergenerational asymmetry detected: PASS;
- inherited network provenance retained: PASS;
- historicalBenefitJustifiesCurrentBurden = false: PASS;
- repair question asks how to preserve warranted inherited benefits while reducing avoidable current/future constraints: PASS.

GitHub Actions:

- run id: `42050121729`;
- tested head: `8df562a8421e4b5d72482d873f5c8be42909c92f`;
- 390 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- network relations are structured research representations, not complete causal models;
- lock-in does not imply dysfunction;
- repair windows identify opportunity conditions, not mandates;
- capability effects are represented judgments, not population-level empirical measurements;
- intergenerational asymmetry does not by itself establish injustice;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-8: PASS as an institutional-ecology / cross-generational capability build.

## FSP-REVISION-9

Date: 2026-11-05

Purpose:

- govern institutional repair sequencing;
- preserve capability tradeoffs across groups without aggregate netting;
- audit meaningful exit, voice, and appeal separately;
- distinguish reversible from irreversible repair;
- preserve REOPEN across generations.

Repair sequencing:

- typed ordered repair steps: PASS;
- explicit preconditions: PASS;
- evidence/standing repair may precede policy/authority change: PASS;
- invalid irreversible rollback declaration rejected: PASS;
- recommendation remains null: PASS.

Capability tradeoffs:

- gains preserved by group: PASS;
- losses preserved by group: PASS;
- unknowns preserved by group: PASS;
- aggregateNetScore = null: PASS;
- distributional conflict detected: PASS;
- limited Pareto-style improvement detected only when no represented losses/unknowns remain: PASS.

Exit / voice / appeal:

- meaningful exit requires non-prohibitive cost: PASS;
- meaningful voice requires usable channels and non-severe retaliation risk: PASS;
- meaningful appeal requires independent review and non-severe retaliation risk: PASS;
- exit, voice, and appeal remain independently auditable: PASS.

Repair reversibility:

- rollback availability explicitly tested: PASS;
- reversible label alone does not imply practical reversibility: PASS;
- reversible step can support bounded experimentation when rollback remains available: PASS;
- irreversible step or irreversible consequence triggers higher-evidence-burden flag: PASS.

Multi-generation REOPEN:

- generations 1-4 covered: PASS;
- evidence review required: PASS;
- capability review required: PASS;
- minority-report review required: PASS;
- later generation can challenge inherited repair: PASS;
- missing generation breaks REOPEN continuity: PASS;
- firstGenerationApprovalBindsFutureGenerations = false: PASS.

GitHub Actions:

- run id: `42051413513`;
- tested head: `bc141ac82a0ebc0c20ae469a9e7ba3b49b07f70c`;
- 408 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- repair sequencing is a governed dependency structure, not a universal optimal sequence;
- group tradeoffs are represented judgments, not commensurated welfare quantities;
- Pareto-style improvement is descriptive and does not settle legitimacy;
- exit/voice/appeal availability does not by itself establish justice;
- reversibility is one governance virtue, not an absolute requirement;
- future-generation REOPEN preserves corrigibility but does not solve intergenerational justice;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-9: PASS as an institutional repair sequencing / corrigibility governance build.

## FSP-REVISION-10

Date: 2026-11-05

Purpose:

- distinguish compensable from non-compensable represented losses;
- protect declared capability floors from tradeoff;
- audit burden shifting;
- evaluate repair legitimacy conditions;
- model multi-party authorization without reason convergence.

Compensation boundaries:

- ordinary administrative burden may remain COMPENSABLE: PASS;
- protected-floor breach converts proposed compensation to NON_COMPENSABLE: PASS;
- protected floors are non-waivable in the model: PASS;
- compensation status remains explicit rather than aggregated: PASS.

Burden shifting:

- burden recipient remains explicit: PASS;
- newly created burdens remain explicit: PASS;
- nominal consent is insufficient without meaningful exit/voice/appeal: PASS;
- protected-floor risk independently blocks burden-shift legitimacy: PASS;
- burdenShiftLegitimate requires no unconsented shifts and no protected-floor risk: PASS.

Repair legitimacy:

- protected-floor breach -> BLOCKED_PROTECTED_FLOOR: PASS;
- illegitimate burden shift -> BLOCKED_BURDEN_SHIFT: PASS;
- governance failure -> BLOCKED_GOVERNANCE: PASS;
- unresolved compensation -> UNRESOLVED: PASS;
- satisfactory represented conditions -> LEGITIMATE_WITH_REOPEN: PASS;
- majorityApprovalSufficient = false: PASS;
- legitimacyAuthorizesTruth = false: PASS.

Multi-party authorization:

- divergent reasons can still yield AUTHORIZED_WITHOUT_CONVERGENCE: PASS;
- conditional authorization preserved: PASS;
- severe coercion -> BLOCKED_COERCION: PASS;
- missing affected-group standing -> BLOCKED_MISSING_STANDING: PASS;
- inadequate party standing -> BLOCKED_MISSING_STANDING: PASS;
- objection is not averaged away -> NOT_AUTHORIZED: PASS;
- authorization audit requires at least two parties: PASS.

GitHub Actions:

- run id: `42052546821`;
- tested head: `eeddfda3fd0f1d5675401c9d9a41a9a40661e436`;
- 426 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- protected capability floors are declared normative research constraints, not a complete theory of rights;
- compensation classifications are structured judgments, not universal moral facts;
- authorization without convergence is governance authorization, not epistemic truth;
- majority approval is neither necessary nor sufficient in all institutional settings;
- no complete theory of democratic legitimacy, distributive justice, or compensation is established;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-10: PASS as a normative repair-boundary / plural-authorization build.

## FSP-REVISION-11

Date: 2026-11-05

Purpose:

- stress-test protected floors under genuine emergency constraint;
- require necessity and less-restrictive-alternative review;
- preserve residual capability under temporary exceptions;
- add sunset/review architecture;
- distinguish non-ideal emergency authorization from normal authorization;
- require restoration to ordinary governance;
- detect normalization of temporary emergency powers.

Temporary floor exceptions:

- ordinary governance sufficiency blocks exception: PASS;
- necessity rationale required: PASS;
- less restrictive alternative blocks exception: PASS;
- residual capability required: PASS;
- valid bounded sunset required: PASS;
- independent review required: PASS;
- minority-report preservation required: PASS;
- exceptionCreatesNewFloor = false: PASS;
- exceptionAuthorizesPermanentChange = false: PASS.

Sunset/review architecture:

- interim review schedule validated: PASS;
- automatic expiration required: PASS;
- renewal requires new authorization: PASS;
- renewal requires new evidence: PASS;
- renewal requires independent review: PASS;
- silent self-renewal exposed as failure: PASS.

Non-ideal authorization:

- unavailable group may receive explicit proxy representation: PASS;
- constrained authorization returns TEMPORARILY_AUTHORIZED_UNDER_CONSTRAINT: PASS;
- temporaryAuthorizationOnly = true: PASS;
- normalAuthorizationPresumed = false: PASS;
- retrospective review preserved: PASS;
- missing proxy standing blocks authorization: PASS;
- severe coercion still blocks authorization: PASS;
- invisible emergency evidence blocks authorization: PASS;
- independent review remains required: PASS.

Restoration:

- full steps + normal conditions + terminated exception -> RESTORED_TO_NORMAL_GOVERNANCE: PASS;
- incomplete restoration before deadline -> RESTORATION_IN_PROGRESS: PASS;
- active exception past deadline with unrestored normal conditions -> EXCEPTION_NORMALIZED: PASS;
- incomplete restoration after deadline without active exception -> FAILED_RESTORATION: PASS;
- emergencyPersistenceJustifiesContinuation = false: PASS;
- post-restoration REOPEN preserved: PASS.

GitHub Actions:

- run id: `42053750408`;
- tested head: `2bb15a48a410aae2f9c7ae6b8f39774f9c6eec94`;
- 444 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- emergency-condition severity and necessity remain represented judgments;
- temporary floor exceptions are not a universal constitutional doctrine;
- proxy representation is a non-ideal governance device, not equivalent to direct participation;
- restoration tests identify governance state, not legal validity;
- no complete theory of emergency powers, constitutional law, or public-health ethics is established;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-11: PASS as an emergency-governance / restoration-to-normal-governance build.

## FSP-REVISION-12

Date: 2026-11-05

Purpose:

- turn FSP's revision-governance architecture upon itself;
- audit constitutional provenance, challengeability, and reopen conditions;
- detect exception-to-normal ratchets;
- test governance-layer reflexivity without infinite regress;
- permit FSP-as-object reopening;
- freeze REVISION-1 through REVISION-11 only as a provisional research base.

Constitutional self-audit:

- healthy constitutional commitments pass provenance/challenge/reopen checks: PASS;
- self-sealing commitment fails self-audit: PASS;
- challengeable commitment without reopen conditions fails self-audit: PASS;
- constitutionalStatusDoesNotAuthorizeTruth = true: PASS.

Exception-to-normal ratchet:

- silent emergency-default normalization without reauthorization detected: PASS;
- persistenceAuthorizesNormalization = false: PASS;
- same resulting rule may be legitimate when explicitly reauthorized with new evidence: PASS;
- legitimacy history remains distinct from surface rule identity: PASS.

Governance-layer reflexivity:

- object/revision/constitutional layers cross-audit coherently: PASS;
- self-sealing top layer detected: PASS;
- reflexivity does not require infinite meta-governor hierarchy: PASS;
- infiniteRegressClaim = false: PASS.

FSP-as-object reopening:

- FSP protected-floor commitment can be reopened under standing/provenance/evidence/counterargument conditions: PASS;
- constrained reopen preserves missing counterargument obligation: PASS;
- no-evidence challenge blocked: PASS;
- inadequate-standing challenge blocked: PASS;
- reopeningInvalidatesAllFSP = false: PASS;
- current commitment remains operative until actual revision: PASS.

Revision-program integration:

- REVISION-1 through REVISION-11 present: PASS;
- dependencies point to prior modules: PASS;
- regression gates pass: PASS;
- browser builds pass: PASS;
- claim ceilings present: PASS;
- missing module blocks freeze: PASS;
- failed regression blocks freeze: PASS;
- missing claim ceiling blocks freeze: PASS;
- non-prior dependency blocks freeze: PASS.

Freeze semantics:

- integrationPass = true: PASS;
- freezeStatus = FREEZE_AS_PROVISIONAL_RESEARCH_BASE: PASS;
- freezeMeansFinalTruth = false: PASS;
- futureReopenRequired = true: PASS;
- pending human evidence remains visible through freeze: PASS.

GitHub Actions:

- run id: `42054859623`;
- tested head: `f3926917f63a15c95811ecdc39239e08a183dfce`;
- 462 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- self-audit demonstrates internal coherence under represented tests, not philosophical completeness;
- reflexivity does not prove FSP uniquely correct;
- a provisional freeze is a versioned research checkpoint, not closure;
- the program remains reopenable through explicit challenge;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-REVISION-12: PASS as a reflexive constitutional capstone / provisional program-freeze build.

## FSP-INTEGRATION-1

Date: 2026-11-05

Purpose:

- map REVISION-1 through REVISION-12 onto the existing seven-view Cartography shell;
- classify capabilities as USER_VISIBLE, HIDDEN_GOVERNANCE, and/or RESEARCH_ONLY_DETAIL;
- preserve a full research encyclopedia while compressing human-facing interaction;
- test whether the frozen kernel already carries the required human primitives;
- gate kernel changes behind genuine representation gaps;
- verify Maya/Leila/Jordan journeys without research-vocabulary exposure.

Crosswalk coverage:

- REVISION-1 through REVISION-12 all represented: PASS;
- START coverage: PASS;
- PEOPLE coverage: PASS;
- INSTITUTION coverage: PASS;
- H/S/F coverage: PASS;
- CONNECTIONS coverage: PASS;
- INVESTIGATE coverage: PASS;
- RETURN coverage: PASS.

Placement architecture:

- user-visible compressed capabilities present: PASS;
- hidden governance capabilities present: PASS;
- research-only detailed capabilities present: PASS;
- capabilities may retain both compressed and full-research forms: PASS;
- every placement has an activation trigger: PASS;
- every placement preserves full research-detail description: PASS;
- user-visible placements carry ordinary-language cues: PASS.

Kernel-change gate:

- genuine representation gaps: none;
- current status: NO_KERNEL_CHANGE;
- existing carriers sufficient for human-facing integration:
  TASK / NODE / CLAIM / CONNECTION / SHARED_TASK / CONSTRAINT / PATH / ACTION / MAP_CHANGE / RETURN / OUTPUT_CARD / REOPEN;
- advanced formal detail remains in RESEARCH_OVERLAY;
- no placement currently requests kernel mutation: PASS.

Research encyclopedia boundary:

- full Revision formalism retained: PASS;
- human-facing compression does not delete research detail: PASS;
- research richness != required user-visible complexity: PASS.

Maya / Leila / Jordan gate:

- Maya seven-view traversal: PASS;
- Leila seven-view traversal: PASS;
- Jordan seven-view traversal: PASS;
- defined research vocabulary exposed to Maya: none;
- defined research vocabulary exposed to Leila: none;
- defined research vocabulary exposed to Jordan: none;
- sparse Jordan state remains valid: PASS;
- practical power remains ordinary-language representable: PASS;
- report vs inference provenance remains ordinary-language representable: PASS;
- bounded return / claim ceiling / REOPEN remain ordinary-language representable: PASS.

Vocabulary-leak detector:

- formal research vocabulary is detected when deliberately supplied: PASS;
- zero leakage in acceptance journeys is therefore a tested absence rather than a disabled detector: PASS.

GitHub Actions:

- run id: `42060054043`;
- tested head: `25d80a69fb0c9c909e5a04f6dc92d16c9fc5a9e4`;
- 474 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- placement success does not establish human usability;
- ordinary-language prompts are candidate compressions, not validated final wording;
- zero leakage for Maya/Leila/Jordan does not prove zero leakage for all future cases;
- RESEARCH_OVERLAY remains an architectural integration strategy, not yet the final persistence implementation;
- kernel remains frozen because no genuine representation gap has been demonstrated;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-INTEGRATION-1: PASS as a Revision-to-Cartography placement, encyclopedia-boundary, and no-kernel-change build.

## FSP-INTEGRATION-2

Date: 2026-11-05

Purpose:

- define a human compression grammar for the seven-view shell;
- map research primitives to ordinary-language prompts;
- control progressive disclosure with case-pressure signals;
- enforce prompt budgets and rare-prompt gating;
- preserve the full research encyclopedia beneath the human-facing layer;
- prevent ordinary-language overload from replacing formal jargon overload.

Base grammar:

- START base prompts <= 2: PASS;
- PEOPLE base prompts <= 2: PASS;
- INSTITUTION base prompts <= 2: PASS;
- H/S/F base prompts <= 2: PASS;
- CONNECTIONS base prompts <= 2: PASS;
- INVESTIGATE base prompts <= 2: PASS;
- RETURN base prompts <= 2: PASS;
- BASE mode exposes no Revision-derived prompt: PASS.

Progressive disclosure:

- BASE depth with no pressure: PASS;
- PRESSURE depth for ordinary local conflict: PASS;
- DEEP depth for interpretive/historical/institutional/emergency/framework pressure: PASS;
- PRESSURE prompt budget <= 3: PASS;
- DEEP prompt budget <= 4: PASS;
- at most one RARE prompt in a view: PASS;
- rare prompt before DEEP mode fails gate: PASS;
- suppressed triggered capabilities remain explicit for later disclosure: PASS.

Compression dictionary:

- formal and ordinary layers preserved side by side: PASS;
- revision target -> "What might need to change?": PASS;
- vocabulary translation -> ordinary carry-across question: PASS;
- power/authority -> ordinary expertise/authority/consequence question: PASS;
- protected-floor/emergency/framework challenges remain rare: PASS;
- defined research vocabulary leaks in ordinary dictionary: none.

Case behavior:

- Jordan-style sparse journey remains BASE across views: PASS;
- Maya-style multi-path/evidence pressure adds bounded Investigate depth: PASS;
- Leila-style power/authority pressure adds ordinary-language Connections depth: PASS;
- deep interpretive/vocabulary pressure remains within budget: PASS;
- emergency pressure remains within DEEP budget: PASS;
- framework challenge appears only at DEEP disclosure: PASS.

Cognitive-load gate:

- prompt-budget overflow detected: PASS;
- research-vocabulary leakage detected: PASS;
- premature rare prompt detected: PASS;
- base-mode Revision prompt detected by rule: PASS;
- passing plans remain within configured budgets: PASS.

Architecture findings:

- encyclopedia carries complexity; user need not: PASS;
- triggered != immediately displayed: PASS;
- research-only formalism remains intact beneath compression: PASS;
- kernel remains unchanged: PASS;
- INTEGRATION-1 NO_KERNEL_CHANGE disposition preserved: PASS.

GitHub Actions:

- run id: `42060826654`;
- tested head: `303941d84f185c785b23f355330c3b269a30b4ad`;
- 492 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- deterministic prompt budgets are architecture, not psychological measurement;
- ordinary-language wording remains candidate wording pending human-fidelity trials;
- case-pressure detection rules are current research heuristics, not validated cognitive diagnostics;
- the configured budgets are not yet empirically optimal;
- kernel remains frozen;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-INTEGRATION-2: PASS as a human-compression / progressive-disclosure / cognitive-load-gate build.

## FSP-INTEGRATION-3

Date: 2026-11-05

Purpose:

- prototype lived-Doing continuity across all seven views;
- preserve user-language anchors through the journey;
- distinguish recognition opportunities from actual user-reported recognition;
- detect form-filling drift;
- keep sparse states valid;
- preserve authorial Return and progressive disclosure.

Lived continuity:

- Maya all seven views present: PASS;
- Maya task language preserved: PASS;
- Maya debt-language anchor preserved through declared views: PASS;
- Maya unresolved questions carried to Return: PASS;
- Maya Return reconnects to lived journey: PASS;
- Leila all seven views present: PASS;
- Leila direct funding report preserved through declared views: PASS;
- Leila authorship distinction preserved: PASS;
- Jordan sparse seven-view journey: PASS;
- Jordan unformed orientation preserved without manufactured closure: PASS.

Adversarial continuity:

- dropped anchor detected: PASS;
- silent system rewording detected: PASS;
- lost unresolved question at Return detected: PASS;
- missing view breaks prototype: PASS.

Recognition architecture:

- THERE_I_AM prompt is invitational: PASS;
- YES_HERE_I_AM prompt is invitational: PASS;
- I_SEE_ME prompt is invitational: PASS;
- systemMayClaimRecognition = false: PASS;
- explicit user-reported recognition can populate all three kinds in synthetic fixture: PASS;
- architecture-only NOT_REPORTED records do not count as human recognition: PASS;
- USER_REPORTED recognition without user text fails architecture audit: PASS.

Form-filling audit:

- low-risk signals pass: PASS;
- forced view completion detected: PASS;
- repeated entry detected: PASS;
- generic/detached prompts detected: PASS;
- fabricated empty-state content detected: PASS;
- system-authored judgment detected: PASS;
- recommendation pressure detected: PASS;
- skip/backward/user-language reuse recorded as protective features: PASS.

Integration-2 continuity:

- Maya compression plans remain within budgets: PASS;
- Leila compression plans remain within budgets: PASS;
- Jordan remains BASE throughout sparse journey: PASS.

Failure/repair history:

- initial gate exposed declared lived anchors that were not actually carried into later views;
- audit was not weakened;
- fixtures were corrected to preserve exact user language through Investigate/Return;
- repaired gate passed.

GitHub Actions:

- failed exploratory run: `42063764181` — 509/512, 3 failures;
- second exploratory run: `42063899526` — 511/512, 1 failure;
- repaired passing run: `42063997241`;
- tested head: `2825f806def4771907c9dca164f848ba439ed5aa`;
- 512 tests passed;
- 0 failed;
- browser TypeScript build: PASS.

Research ceiling:

- this is structural human-fidelity architecture, not actual human phenomenological validation;
- synthetic USER_REPORTED fixtures do not count as human evidence;
- recognition wording remains candidate wording;
- form-filling thresholds are architectural heuristics, not validated psychological measures;
- Cartography kernel remains frozen;
- TRANSLATION-12 human-validation status remains PENDING.

FSP-INTEGRATION-3: PASS as a lived-Doing continuity / recognition-ownership / anti-form-filling prototype build.
