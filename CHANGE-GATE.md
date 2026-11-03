# Change Gate

A change may enter Prototype 0 only if it is:

1. required by the frozen specification; or
2. required to make a frozen acceptance journey pass; or
3. required to repair a repeatable usability blocker; or
4. required to repair privacy, authorship, or type integrity.

All other proposals go to `DEFERRED-IDEAS.md`.

## Open decision: H/S/F reassignment

HSF-USABILITY-GATE-1 has earned a narrow Change Gate under criterion 3: a repeatable usability blocker exposes a model-level mutation gap.

Authorized design scope:

- a narrowly typed H/S/F reassignment capability for existing H/S/F-bearing objects;
- preservation of identity, provenance, verification, privacy, and unrelated state;
- no generic edit action;
- no automatic temporal inference;
- no prediction, recommendation, ranking, or commitment semantics.

Evidence: `HSF-USABILITY-GATE-1.md` and `HSF-CHANGE-GATE-DECISION.md`.

Regression floor at gate opening: 64/64 tests green.
