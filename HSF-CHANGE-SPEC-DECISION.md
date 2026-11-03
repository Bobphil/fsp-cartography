# HSF-CHANGE-SPEC-1 Decision

Status: **SPECIFICATION PASS — implementation authorized within narrow scope**

The design checkpoint resolves the open questions from HSF-USABILITY-GATE-1 without modifying the kernel.

Frozen implementation contract:

- action: `HSF_SET`;
- targets: `NODE | CLAIM` only;
- at least one region required;
- only H/S/F valid;
- duplicates normalize away;
- canonical storage order H,S,F;
- unknown targets are exact no-ops;
- same-value normalized assignments are exact no-ops;
- only `hsf` may change;
- persisted nodes/claims must satisfy non-empty, valid, duplicate-free, canonical H/S/F invariants;
- add-time controls expose H/S/F selection with S as a usability default;
- later reassignment occurs through the H/S/F view;
- F never implies prediction, ranking, recommendation, probability, inevitability, or commitment.

No schema-version bump is authorized by this spec because the stored shape remains `HSFRegion[]`.

Next authorized build:

`HSF-CHANGE-IMPL-1 — HSF_SET Action, Canonical Normalizer, Invariants, Reducer Preservation Tests, Add-Time Selectors, H/S/F Reassignment Controls, and Full Regression Gate.`
