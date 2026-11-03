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
