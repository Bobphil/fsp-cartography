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

## HSF implementation contract frozen

HSF-CHANGE-SPEC-1 has passed its specification gate.

Implementation is now authorized only within the frozen contract in `HSF-CHANGE-SPEC-1.md`.

Protected regression floor before implementation: 72/72 tests green.

Next authorized build: `HSF-CHANGE-IMPL-1`.

## H/S/F reassignment gate closed

HSF-CHANGE-IMPL-1 has passed the full implementation regression gate.

The narrow Change Gate opened for H/S/F reassignment is now CLOSED.

Accepted implementation:

- `HSF_SET` targets `NODE | CLAIM` only;
- canonical normalizer and H/S/F invariants are active;
- add-time H/S/F selection and later reassignment are available;
- no generic editing, inference, prediction, ranking, or recommendation capability was introduced.

Regression certification: 90/90 tests green on GitHub Actions run `41632144985`.
