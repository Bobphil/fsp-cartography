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
