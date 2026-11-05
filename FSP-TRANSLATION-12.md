# FSP-TRANSLATION-12

## Human-Coder Trial Execution, Agreement/Disagreement Audit, Protocol-Fidelity Test, Adjudication Firewall, and Post-Human Scale Gate

**Status:** Protocol architecture frozen; actual human-evidence state remains PENDING.

## 1. Purpose

TRANSLATION-11 prepared a real human-coder trial packet but correctly stopped short of claiming human validation.

TRANSLATION-12 freezes the machinery required to execute and evaluate that trial when independent coders become available.

It adds:

- human coding record schema;
- field-level agreement auditing;
- structural versus interpretive agreement separation;
- protocol-fidelity checks;
- adjudication firewall;
- a post-human scale gate that can return PASS, FAIL, or PENDING.

The decisive constraint is:

> No synthetic or model-generated coding record may be treated as evidence of human inter-coder reliability.

## 2. Structural versus interpretive agreement

Agreement is separated into two layers.

### Structural fields

- target node;
- task;
- claim ceiling.

These determine whether coders are identifying the same bounded interpretive object.

### Interpretive fields

- standing;
- remainder;
- REOPEN condition.

These are expected to permit more disagreement.

A coder pair can therefore pass structural agreement while retaining visible interpretive disagreement.

## 3. Protocol fidelity

Every submitted coding record must preserve:

- packet version;
- protocol version;
- item ID;
- target node;
- task;
- claim ceiling;
- standing;
- REOPEN condition.

Missing or version-mismatched records fail fidelity.

Remainder may be empty when a coder explicitly judges no remainder to be present; absence of a remainder entry is not automatically treated as protocol failure.

## 4. Agreement threshold

The frozen structural threshold is:

```
0.80
```

computed over target node, task, and claim ceiling.

This threshold is a protocol rule for the first human trial, not a universal standard for qualitative coding.

Interpretive agreement is reported separately and is not silently folded into the structural score.

## 5. Adjudication firewall

Adjudication may occur only after independent records exist.

Each adjudication must preserve:

- original coder values;
- item ID;
- field being adjudicated;
- adjudicated value;
- adjudicator identity;
- explicit reason;
- confirmation that original records remain preserved.

Adjudication is invalid if it overwrites or destroys the independent coding records.

Thus:

```
independent coding
-> agreement audit
-> disagreement inspection
-> adjudication
```

never:

```
coding
-> edit until coders agree
```

## 6. Post-human scale gate

The post-human gate has three statuses.

### PENDING

Returned when:

- the human trial has not been executed; or
- fewer than two independent coders have completed it.

### FAIL

Returned when actual completed human coding exists but:

- protocol fidelity fails;
- structural agreement is below 0.80;
- the adjudication firewall fails;
- critical disagreements remain unresolved;
- infrastructure itself no longer passes.

### PASS

Returned only when:

- infrastructure already passes;
- at least two independent coders completed the frozen trial;
- protocol fidelity passes;
- structural agreement >= 0.80;
- adjudication preserves independent records;
- critical disagreements have been resolved or explicitly bounded.

## 7. Current state

As of this freeze:

- infrastructure: PASS from TRANSLATION-11;
- trial packet: READY;
- independent human coders: NOT YET OBTAINED;
- human trial executed: NO;
- post-human gate: PENDING.

This is the correct evidential state.

## 8. Why freeze now

Freezing before obtaining coders prevents us from changing:

- required fields;
- thresholds;
- adjudication rules;
- packet/version rules;
- pass criteria

in response to disappointing human agreement.

That makes later human evidence more meaningful.

## 9. Relationship to Duhem–Quine

The human trial is not a test of the truth of Duhem or Quine.

It tests a different question:

> Can independent humans apply the FSP governance distinctions consistently enough for those distinctions to function as a usable translational formalism?

This matters because the Duhem–Quine application depends on coders being able to distinguish:

- target hypothesis from auxiliary assumptions;
- evidence from warrant;
- framework revision from auxiliary repair;
- task-level equivalence from ontological uniqueness;
- unresolved remainder from resolved disagreement;
- REOPEN from final closure.

## 10. Freeze boundary

The following are frozen for the first human trial:

- packet version: `FSP-AIF-HUMAN-TRIAL-1.0`;
- protocol version: `FSP-AIF-CODER-1.0`;
- structural agreement threshold: `0.80`;
- structural fields: target node, task, claim ceiling;
- interpretive fields: standing, remainder, REOPEN;
- adjudication must preserve originals;
- post-human gate is three-valued: PASS / FAIL / PENDING.

Changing any of these before completion of the first human trial requires a new protocol version and must not be back-applied to the frozen trial.

## 11. Current claim ceiling

TRANSLATION-12 licenses no new human-validation claim today.

Its contribution is methodological:

> The human-validation stage is now precommitted, executable, and protected against retrospective threshold or adjudication drift.

That is the correct freeze point until genuine independent human coding becomes possible.
