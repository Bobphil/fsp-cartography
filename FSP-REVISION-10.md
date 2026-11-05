# FSP-REVISION-10

## Compensation/Non-Compensation Boundaries, Burden-Shifting Audit, Protected Capability Floors, Repair Legitimacy Conditions, and Multi-Party Authorization Without Convergence

**Status:** Normative repair-boundary and plural-authorization layer  
**Boundary:** REVISION-1 through REVISION-9 remain intact; TRANSLATION-12 human evidence remains PENDING.

## 1. Purpose

REVISION-9 established repair sequencing, group-specific tradeoffs, exit/voice/appeal, reversibility, and multi-generation REOPEN.

REVISION-10 asks the harder normative question:

> Which losses may be compensated, which capability floors may not be traded away, when does repair merely shift burdens onto weaker groups, and how can a plural set of parties authorize repair without sharing the same reasons?

The build therefore adds:

- compensation boundaries;
- protected capability floors;
- burden-shifting audits;
- repair-legitimacy conditions;
- plural authorization without reason convergence.

## 2. Compensation boundaries

Not all losses are fungible.

A compensation boundary records:

- affected group;
- affected capability;
- loss;
- proposed compensation;
- compensation status;
- reasons.

Statuses are:

- COMPENSABLE;
- PARTIALLY_COMPENSABLE;
- NON_COMPENSABLE;
- UNRESOLVED.

## 3. Protected capability floors

A protected capability floor identifies a minimum capability that a repair may not trade away merely because other benefits are large.

Examples in the test fixture include:

- effective ability to raise a complaint;
- interpretive contestability;
- REOPEN access;
- independent appeal.

Protected floors are represented as:

`waivable = false`.

This is a governance rule for the research model, not a complete theory of human rights.

## 4. Floor crossing

If a proposed loss matches a declared breach condition for the affected group's protected capability floor, the compensation audit changes the status to:

`NON_COMPENSABLE`.

Thus:

```
more money
or
faster processing
```

cannot automatically compensate for:

```
loss of REOPEN
or
loss of independent appeal.
```

## 5. Burden shifting

A repair may appear beneficial while merely relocating burdens.

A burden-shift record tracks:

- source group where relevant;
- receiving group;
- burden;
- whether the burden is newly created;
- consent;
- meaningful exit;
- meaningful voice;
- meaningful appeal;
- protected-floor effects.

Burden shifting is legitimate only when:

- consent is present;
- exit is meaningful;
- voice is meaningful;
- appeal is meaningful;
- no protected floor is endangered.

## 6. Consent is not enough by itself

Nominal consent does not cure:

- prohibitive exit;
- absent voice;
- dependent appeal;
- severe practical constraint.

This carries forward the earlier distinction between formal authorization and effective agency.

## 7. Repair legitimacy

Repair legitimacy is audited through:

- capability floors;
- compensation boundaries;
- burden shifting;
- evidence visibility;
- minority-report preservation;
- REOPEN;
- independent appeal;
- retaliation risk.

Possible outcomes are:

- LEGITIMATE_WITH_REOPEN;
- LEGITIMATE_BUT_CONTESTED;
- BLOCKED_PROTECTED_FLOOR;
- BLOCKED_BURDEN_SHIFT;
- BLOCKED_GOVERNANCE;
- UNRESOLVED.

## 8. Majority approval is insufficient

The legitimacy audit fixes:

`majorityApprovalSufficient = false`.

A majority cannot legitimate:

- floor violations;
- coercive burden shifts;
- erased minority reports;
- unavailable REOPEN;
- dependent appeal.

## 9. Legitimacy does not authorize truth

Institutional legitimacy is not epistemic truth.

The audit therefore fixes:

`legitimacyAuthorizesTruth = false`.

A repair may be procedurally legitimate while the community remains uncertain about deeper empirical, ethical, or ontological questions.

## 10. Multi-party authorization

Parties may:

- AUTHORIZE;
- CONDITIONALLY_AUTHORIZE;
- WITHHOLD;
- OBJECT.

Each party records:

- affected groups represented;
- reasons;
- conditions;
- adequacy of standing;
- coercion risk.

## 11. Authorization without convergence

Parties may authorize the same repair for different reasons.

One may care about:

- independent appeal.

Another may emphasize:

- professional responsibility.

Another may emphasize:

- provenance and minority-report preservation.

If all affected groups are represented, standing is adequate, and severe coercion is absent, the result can be:

`AUTHORIZED_WITHOUT_CONVERGENCE`.

This is a direct institutional analogue of cooperation without convergence.

## 12. Conditional authorization

A party may authorize only if a condition is retained.

The result becomes:

`AUTHORIZED_CONDITIONALLY`.

This preserves plural reasons and bounded agreement rather than forcing uniform endorsement.

## 13. Coercion

Authorization given under severe coercion does not count as clean authorization.

The audit returns:

`BLOCKED_COERCION`.

Practical power cannot manufacture legitimacy merely by producing assent.

## 14. Missing standing

If affected groups are not represented, or a party lacks adequate standing, authorization is blocked as:

`BLOCKED_MISSING_STANDING`.

This prevents institutional authorization from becoming a vote among only the already powerful.

## 15. Protected-floor case

The test fixture includes a proposed loss of REOPEN access for future participants.

Even if the institution offers monetary or administrative compensation, the floor audit changes the boundary to:

`NON_COMPENSABLE`.

The repair is therefore blocked at the protected-floor stage.

## 16. Compensable burden case

The fixture also contains increased review workload for staff.

That burden may be compensable through:

- additional staffing;
- clerical automation;
- reduced unrelated workload.

The model therefore does not treat every institutional burden as protected or non-tradeable.

## 17. Burden-shifting case

A repair that moves administrative costs onto staff with meaningful standing, exit, voice, and appeal may remain legitimate.

A repair that shifts loss of REOPEN onto future participants without standing or contestability is blocked.

## 18. Human-validation boundary

Nothing in REVISION-10 changes TRANSLATION-12.

Human-validation status remains:

`PENDING`.

## 19. Research ceiling

The strongest current claim is:

> FSP can distinguish compensable from non-compensable represented losses, protect declared capability floors from aggregate tradeoff, identify illegitimate burden shifting, and model multi-party authorization across divergent reasons without treating majority approval, coercion, or convergence as sufficient for legitimacy.

It does not establish a complete theory of rights, compensation, democratic legitimacy, or distributive justice.
