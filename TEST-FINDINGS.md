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
