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
