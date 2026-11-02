# CODE-0.1 Freeze

Date: 2026-11-02

Frozen baseline commit tested: `a58766f3340716d2b71102fe0b855264f8e88288`

Regression gate:

```bash
npm test
npm run build:browser
```

Observed result:

- 21 tests passed
- 0 failed
- 0 skipped
- TypeScript kernel build: PASS
- separate browser TypeScript build: PASS

CODE-0.1 therefore freezes the deterministic state machine, invariants, minimal persistence boundary, and seven-view shell contract represented by the tested baseline.

## Frozen kernel boundary

The following are frozen for the CODE-0.1 interaction-layer phase:

- `src/kernel/types.ts`
- `src/kernel/actions.ts`
- `src/kernel/defaults.ts`
- `src/kernel/reducer.ts`
- `src/kernel/invariants.ts`
- `src/kernel/selectors.ts`
- `src/kernel/persistence.ts`

The interaction layer may render state and dispatch existing actions. It may not add, remove, reinterpret, or silently bypass kernel actions or invariants without opening the Change Gate.

## Preserved distinctions

- Map != World
- My Map of Other != Other
- Inference != Report
- Institution != Person
- Power != Authority
- Shared Task != Required Agreement
- Possibility != Prediction
- System Candidate != User Judgment
- Private != Course
- REOPEN != Permanent Openness

## Next phase

Build the first genuinely usable seven-view interaction layer outside the kernel. Usability changes must remain presentation/orchestration changes unless a repeatable blocker justifies reopening the Change Gate.
