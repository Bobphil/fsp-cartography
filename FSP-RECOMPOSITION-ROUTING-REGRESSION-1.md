# FSP-RECOMPOSITION-ROUTING-REGRESSION-1

## Seven-Case Routing Validation, Adversarial Counterexamples, Failure-Selection Precision, and CT-F17 Reconsideration Gate

**Status:** ROUTING REGRESSION / CONSOLIDATION TEST — VERSION 1  
**Parents:** FSP-RECOMPOSITION-GOVERNANCE-1; FSP-NEAR-DECOMPOSABILITY-STRESS-1; FSP-CT-CANONICAL-1.1; FSP-CT-META-GOVERNANCE-1  
**Primary purpose:** Test whether the recomposition routing overlay reliably improves diagnosis by selecting existing canonical failures across the original seven cases and adversarial counterexamples, without requiring CT-F17, a thirteenth Tool, or a new constitutional primitive.  
**Primary decision criterion:** Reconsider CT-F17 only if recurrent boundary-crossing failures cannot be routed with adequate specificity to CT-F01–CT-F16.  
**Primary claim ceiling:** This build tests architectural routing adequacy, not classroom psychometrics or human-subject usability. User-facing validation remains a later empirical task.

---

# 1. Regression Question

The preceding build made a strong consolidation decision:

> **Bad Recomposition = routing pattern, not canonical failure code.**

That decision is only defensible if the routing overlay can actually do three things:

1. identify that a boundary crossing is occurring;
2. select the specific existing failure mechanism at risk;
3. improve diagnosis over the generic label "Bad Recomposition."

The governing question is therefore:

> **Does recomposition routing add precision without adding vocabulary?**

---

# 2. Acceptance Criteria

The routing overlay passes only if it satisfies all seven criteria.

## RR1 — Coverage

Every tested recomposition breakdown can be routed to at least one existing canonical failure.

## RR2 — Specificity

The route names what went wrong rather than merely restating that a crossing occurred.

## RR3 — Non-collapse

Different boundary failures do not all route mechanically to CT-F03 Inferential Overreach.

## RR4 — Multi-route discipline

Multiple failures may be active, but one primary route should normally be identifiable.

## RR5 — Action relevance

Routing should change the next Tool, Firewall, claim ceiling, authorization check, or repair.

## RR6 — Vocabulary economy

No new failure code is needed merely to name the cross-boundary pattern.

## RR7 — Counterexample resilience

The overlay must survive adversarial cases designed to tempt incorrect routing.

---

# 3. Routing Algorithm Under Test

The tested routing sequence is:

```text
1. STATE LOCAL RESULT
2. IDENTIFY BOUNDARY
3. IDENTIFY WHAT CHANGED
4. IDENTIFY WHAT IS BEING CARRIED
5. ASK WHICH WARRANT CONDITIONS SURVIVE
6. IDENTIFY PRIMARY FAILURE RISK
7. ADD SECONDARY FAILURE ONLY IF DISTINCT
8. APPLY TOOL / FIREWALL
9. SET CLAIM CEILING
10. CHECK AUTHORIZATION
11. PRESERVE REMAINDER
12. DEFINE RETURN TEST
```

The routing overlay fails if step 6 cannot select a canonical failure with useful specificity.

---

# 4. Routing Priority Heuristic

To prevent indiscriminate multi-labeling, use this priority order.

## First ask: Did the target or map change?

If yes, test:

- CT-F01 Map Substitution;
- CT-F02 Omission Failure.

## Then ask: Did the conclusion become stronger?

If yes, test:

- CT-F03 Inferential Overreach;
- CT-F10 Causal Confidence Inflation where causal strength changed.

## Then ask: Did authority or intervention change?

If yes, test:

- CT-F07 Authority Substitution;
- CT-F15 Judgment/Authorization Collapse.

## Then ask: Did distribution or background conditions disappear?

If yes, test:

- CT-F09 Aggregation Blindness;
- CT-F11 Background-Condition Blindness.

## Finally ask: Did provisional success become fixed?

If yes, test:

- CT-F16 Closure Inflation.

This is a routing heuristic, not a mandatory sequence.

---

# 5. Case 1 — Neptune / Vulcan

## Local result

An anomaly may be compatible with multiple revisions to a theory-plus-auxiliary system.

## Boundary

```text
historical case
→ general philosophy-of-science claim
```

## Tempting vague label

Bad Recomposition.

## Primary route

**CT-F03 — Inferential Overreach**

Why:

The local historical comparison is being used to support a broader universal claim than the evidence warrants.

## Secondary route

**CT-F11 — Background-Condition Blindness**

If historical differences are erased.

## Not primary

CT-F01 is not primary unless the abstract comparison itself is treated as the historical reality.

## Tool route

CT-T02 — Examination / Reason-Giving Audit.

## Claim ceiling

> Similar anomaly structures do not establish one universal mechanism of theory change.

## Verdict

**PASS — specific routing improves diagnosis.**

---

# 6. Case 2 — Challenger / Boisjoly

## Local result

Engineering evidence and uncertainty were relevant to launch risk.

## Boundary

```text
technical judgment
→ managerial review
→ institutional action
```

## Primary route

**CT-F15 — Judgment/Authorization Collapse**

Why:

The central boundary question is how technical judgment relates to action authority.

## Secondary routes

- CT-F02 Omission Failure if uncertainty is stripped;
- CT-F07 Authority Substitution if managerial authority substitutes for evidential judgment;
- CT-F16 Closure Inflation if dissent is prematurely closed.

## Tool route

Primary: CT-T06 — Legitimacy / Standing Audit.  
Secondary: CT-T02 — Examination / Reason-Giving Audit.

## Claim ceiling

> Decision authority does not erase the evidential burden carried by technical dissent.

## Verdict

**PASS — routing identifies the action boundary rather than reducing the case to generic overreach.**

---

# 7. Case 3 — Bat Objective Phenomenology

## Local result

Echolocation supports discriminable and actionable spatial structure.

## Boundary

```text
functional structure
→ phenomenal character
```

## Primary route

**CT-F03 — Inferential Overreach**

## Secondary route

**CT-F01 — Map Substitution**

when a human-accessible reconstruction is treated as the bat’s experience itself.

## Causal route

CT-F10 becomes secondary only if neural or functional dependence is inflated into a causal explanation of qualitative character.

## Tool route

CT-T02 — Examination / Reason-Giving Audit.

## Claim ceiling

> Structural reconstruction does not establish phenomenal identity.

## Verdict

**PASS — current failures distinguish overreach from map substitution.**

---

# 8. Case 4 — Patient Medicine

## Local result

Population evidence constrains expected treatment outcomes.

## Boundary

```text
population evidence
→ individual patient
→ intervention
```

## Primary route

**CT-F02 — Omission Failure**

Why:

The most common failure is loss of patient-specific comorbidity, values, context, and constraints.

## Secondary routes

- CT-F03 Inferential Overreach;
- CT-F11 Background-Condition Blindness;
- CT-F15 Judgment/Authorization Collapse.

## Tool route

Primary: CT-T01 — First Map Audit.  
Then CT-T09 / CT-T12 as consequence and capability become relevant.

## Claim ceiling

> Population evidence constrains but does not determine an individual patient’s outcome or consent.

## Verdict

**PASS — recomposition routing does not collapse medicine into CT-F03 alone.**

---

# 9. Case 5 — Planaria Adaptation

## Local result

Adaptation may alter future organism-level capability.

## Boundary

```text
observed adaptation
→ mechanism claim
→ general agency theory
```

## Primary route

**CT-F10 — Causal Confidence Inflation**

Why:

Successful adaptation does not establish the preferred causal/search architecture.

## Secondary route

CT-F03 Inferential Overreach for the jump to general agency theory.

## Tool route

CT-T02 — Examination / Reason-Giving Audit.

## Claim ceiling

> Adaptation constrains mechanism hypotheses but does not identify one preferred general search architecture.

## Verdict

**PASS — causal inflation is more specific than generic recomposition.**

---

# 10. Case 6 — Institutional Safety

## Local result

A local safety intervention succeeds under bounded conditions.

## Boundary

```text
local process
→ institutional policy
→ regulatory infrastructure
```

## Primary route

**CT-F11 — Background-Condition Blindness**

Why:

The enabling local conditions are most at risk of disappearing when policy scales.

## Secondary routes

- CT-F09 Aggregation Blindness;
- CT-F15 Judgment/Authorization Collapse;
- CT-F16 Closure Inflation.

## Tool route

Primary: CT-T10 — Background Power / Genealogy Audit.  
Secondary: CT-T09 — Consequence / Welfare / Harm Audit.

## Claim ceiling

> Local success may justify higher-level REOPEN, not automatic universalization.

## Verdict

**PASS — existing failures diagnose the scale-up mechanism precisely.**

---

# 11. Case 7 — Psychedelic / Neural / Phenomenal Inference

## Local result

Distinct evidence supports claims about receptor activity, network dynamics, reported experience, and later outcomes.

## Boundary

Multiple:

```text
neural correlate
→ phenomenal explanation

acute experience
→ durable therapeutic benefit

noetic certainty
→ metaphysical truth

acute change
→ durable identity improvement
```

## Primary routes by bridge

### Neural correlate → phenomenal explanation

CT-F10 — Causal Confidence Inflation.

### Acute phenomenology → durable therapeutic benefit

CT-F03 — Inferential Overreach.

### Noetic certainty → metaphysical truth

CT-F01 — Map Substitution, with CT-F03 secondary.

### Acute change → durable identity improvement

CT-F11 — Background-Condition Blindness, with CT-F16 secondary if early coherence is treated as settled.

## Authorization route

CT-F15 if therapeutic promise is converted into permission to shape belief or identity without consent.

## Verdict

**PASS — one domain generates several different recomposition routes, strongly supporting routing over CT-F17.**

---

# 12. Seven-Case Coverage Result

All original stress-test cases route to existing failures.

No case requires:

- CT-F17;
- a thirteenth Tool;
- a new Firewall;
- a new claim-ceiling code;
- a new constitutional primitive.

**RR1 Coverage: PASS.**

---

# 13. Adversarial Counterexample A — Correct Cross-Scale Inference

## Scenario

A laboratory measure is translated through a well-calibrated chain into a clinical quantity.

The transition crosses scales but calibration evidence is strong.

## Temptation

Label any cross-scale move "Bad Recomposition."

## Correct result

**NO FAILURE.**

The boundary is real, but the warrant survives.

## Lesson

> **Boundary crossing ≠ failure.**

This is critical.

Recomposition routing is diagnostic only when a warrant condition is threatened.

## Verdict

**RR7 PASS.**

---

# 14. Adversarial Counterexample B — New Evidence Strengthens the Recomposition

## Scenario

A population estimate is combined with patient-specific biomarkers and treatment history.

The individual recommendation becomes better supported than the population estimate alone.

## Temptation

Apply the rule “recomposition cannot strengthen claims.”

## Correct result

The claim can strengthen because **new warrant was added**.

The correct rule is:

> **Recomposition without new warrant cannot silently strengthen the claim.**

## Failure status

NO FAILURE if the new evidence is valid and authorization remains separate.

## Verdict

**PASS — routing avoids overconstraining legitimate inference.**

---

# 15. Adversarial Counterexample C — Same Target, Stronger Causal Claim

## Scenario

A model predicts outcomes accurately in the same target population, and investigators infer the model has identified the causal mechanism.

No scale or target boundary changes.

## Temptation

Treat recomposition as irrelevant because no obvious boundary was crossed.

## Correct route

**CT-F10 — Causal Confidence Inflation.**

## Lesson

Recomposition routing is not a replacement for the Failure Atlas.

Some failures arise without recomposition.

## Verdict

**PASS — overlay remains subordinate to canonical failures.**

---

# 16. Adversarial Counterexample D — Authority Without Overreach

## Scenario

A legally authorized regulator acts on strong evidence within delegated authority.

## Temptation

Route all evidence→action transitions to CT-F15.

## Correct result

NO FAILURE if:

- evidence supports the action;
- authority is legitimate;
- standing is respected;
- claim ceiling is observed.

## Lesson

> **Judgment→action boundary ≠ authorization collapse by default.**

## Verdict

**PASS.**

---

# 17. Adversarial Counterexample E — Aggregation Without Blindness

## Scenario

A policy uses an aggregate metric but separately audits subgroup burden and preserves exceptions.

## Temptation

Route aggregate→policy to CT-F09 automatically.

## Correct result

NO FAILURE.

Aggregation is not itself blindness.

## Lesson

> **Aggregation ≠ Aggregation Blindness.**

## Verdict

**PASS.**

---

# 18. Adversarial Counterexample F — Functional Claim That Stays Functional

## Scenario

A bat navigation model claims only that certain acoustic relations are sufficient for route discrimination.

## Temptation

Treat sensory→functional modeling as phenomenal overreach.

## Correct result

NO FAILURE.

The claim ceiling remains functional.

## Lesson

A high-burden neighboring bridge does not contaminate a lower-burden claim.

## Verdict

**PASS.**

---

# 19. Adversarial Counterexample G — Temporary Closure

## Scenario

A team freezes a working protocol for six months, with explicit review criteria and rollback conditions.

## Temptation

Route stabilization to CT-F16 Closure Inflation.

## Correct result

NO FAILURE.

Bounded closure with REOPEN conditions is not closure inflation.

## Verdict

**PASS.**

---

# 20. Adversarial Counterexample H — Local Map Used Only Locally

## Scenario

A local institutional dashboard is used for local staffing adjustments and explicitly not generalized.

## Temptation

Treat the dashboard as Map Substitution merely because it is compressed.

## Correct result

NO FAILURE if the map stays within its validated scope.

## Lesson

> **Compression ≠ Map Substitution.**

## Verdict

**PASS.**

---

# 21. Adversarial Counterexample Result

The routing overlay survives eight adversarial cases because it does not automatically equate:

- boundary crossing with failure;
- aggregation with blindness;
- authority with substitution;
- stabilization with closure;
- compression with map substitution;
- scale change with overreach.

This matters greatly.

A useful routing system must detect failures without pathologizing every abstraction or action.

**RR7 Counterexample Resilience: PASS.**

---

# 22. Specificity Test

Compare:

## Generic label

> Bad Recomposition.

This tells us only that a boundary crossing is risky.

## Routed diagnosis

> CT-F11 Background-Condition Blindness: the local institutional result is being generalized while the enabling conditions are stripped.

The second diagnosis determines:

- which Tool to use;
- which Firewall applies;
- what claim ceiling to set;
- what repair to attempt.

Therefore:

**RR2 Specificity: PASS.**

---

# 23. Non-Collapse Test

Primary failure assignments across the seven cases:

| Case | Primary route |
|---|---|
| Neptune/Vulcan | CT-F03 Inferential Overreach |
| Challenger | CT-F15 Judgment/Authorization Collapse |
| Bat | CT-F03 Inferential Overreach |
| Medicine | CT-F02 Omission Failure |
| Planaria | CT-F10 Causal Confidence Inflation |
| Institutional safety | CT-F11 Background-Condition Blindness |
| Psychedelic inference | bridge-specific: F10 / F03 / F01 / F11 |

The distribution shows the overlay does not simply route everything to Inferential Overreach.

**RR3 Non-collapse: PASS.**

---

# 24. Multi-Route Discipline Test

Several cases activate multiple failures.

The regression therefore adopts:

> **Primary failure = the mechanism most directly responsible for the boundary error.**

> **Secondary failure = a distinct additional mechanism that changes repair or authorization.**

Do not list every plausible failure.

Example:

Medicine:

Primary:
CT-F02 Omission Failure.

Secondary:
CT-F15 only if recommendation becomes intervention without valid consent.

This preserves diagnostic economy.

**RR4 Multi-route Discipline: PASS.**

---

# 25. Tool-Selection Test

Routing changes Tool selection.

Examples:

- CT-F02 → CT-T01 / CT-T07;
- CT-F03 → CT-T02;
- CT-F07 → CT-T06;
- CT-F09 → CT-T09;
- CT-F10 → CT-T02 with causal audit;
- CT-F11 → CT-T10;
- CT-F15 → CT-T06 / CT-T08;
- CT-F16 → REOPEN / relevant Tool depending settlement.

Therefore routing is not merely relabeling.

It changes inspection.

**RR5 Action Relevance: PASS.**

---

# 26. Repair Test

A useful routing diagnosis should imply different repair.

## CT-F01 repair

Restore map/world distinction.

## CT-F02 repair

Add omitted actors, variables, burdens, or uncertainty.

## CT-F03 repair

Narrow the claim.

## CT-F07 repair

Separate expertise, office, power, and standing.

## CT-F09 repair

Disaggregate burdens.

## CT-F10 repair

Downgrade causal confidence or add causal evidence.

## CT-F11 repair

Restore enabling/background conditions.

## CT-F15 repair

Separate judgment from authority/consent.

## CT-F16 repair

Install or activate REOPEN conditions.

This confirms that recomposition routing improves repair precision.

---

# 27. Claim-Ceiling Test

Each route yields a different ceiling.

Examples:

- F01: map ≠ world;
- F02: incomplete map ≠ adequate basis for broad conclusion;
- F03: evidence supports narrower claim only;
- F10: prediction/association ≠ established cause;
- F15: supported judgment ≠ authorized intervention;
- F16: current success ≠ permanent closure.

Therefore the overlay preserves the existing claim-ceiling architecture rather than duplicating it.

---

# 28. Return Test

The routing overlay also improves Return.

Different failures predict different consequential signals.

## F02 Return signal

An omitted subgroup or factor generates unexpected outcome.

## F10 Return signal

Intervention changes the supposed cause without changing the outcome, or vice versa.

## F11 Return signal

The result fails outside the enabling context.

## F15 Return signal

Action generates legitimacy, consent, or standing conflict despite evidence.

## F16 Return signal

New evidence cannot enter the frozen procedure.

Thus:

> **Return can discriminate among recomposition failures.**

This is stronger than merely saying Return reveals failed decomposition.

---

# 29. False-Positive Control

A major danger of the overlay is overdiagnosis.

Therefore freeze:

> **A recomposition route should not be assigned unless the boundary crossing threatens a specific warrant condition.**

Boundary crossing alone is insufficient.

This is the principal false-positive control.

---

# 30. False-Negative Control

The opposite risk is missing a boundary because it looks familiar.

Therefore ask:

> **Did the target, scale, representation, affected population, authority, time horizon, or ontology change—even if the vocabulary stayed the same?**

This catches hidden recompositions.

---

# 31. Target Drift Regression

Target Drift remains a routing condition.

It does not behave as one unique failure.

Examples:

- navigation → experience routes mainly to F03;
- population → patient often routes to F02;
- local metric → person may route to F01;
- judgment → intervention routes to F15.

Therefore:

> **Target Drift = boundary alarm, not canonical diagnosis.**

Decision retained.

---

# 32. Scale Overreach Regression

Scale Overreach also remains a routing condition.

Its actual failure varies:

- causal jump → F10;
- context loss → F11;
- generalized claim → F03;
- distribution loss → F09.

Decision retained.

---

# 33. Authorization Inflation Regression

Authorization Inflation routes reliably to:

- F07 when authority source is substituted for justification;
- F15 when evidence becomes permission to act.

This distinction is useful enough to preserve.

Decision retained.

---

# 34. Hidden Remainder Regression

Hidden Remainder routes by mechanism:

- omitted uncertainty → F02;
- overstrong conclusion → F03;
- permanent closure → F16.

No independent failure is needed.

Decision retained.

---

# 35. Does CT-F17 Add Anything?

Candidate CT-F17 formulation:

> **Recomposition Failure — a locally valid result is carried across a changed boundary without renewed warrant.**

Ablation test:

If CT-F17 is removed, can the cases still be diagnosed, routed, repaired, bounded, and reopened?

**Yes.**

If CT-F17 is added, does it change Tool choice, claim ceiling, authorization, or repair beyond the existing route?

**No, not reliably.**

Therefore CT-F17 fails:

- No Decorative Type;
- No Orphan Distinction;
- Canonical Promotion Gate.

---

# 36. CT-F17 Decision

**REJECT FOR CANONICAL PROMOTION.**

Keep "recomposition risk" as:

- cross-cutting index;
- routing overlay;
- research concept;
- teaching prompt.

Do not add it to CT-F01–CT-F16.

---

# 37. Routing Overlay Status

The overlay earns a stable status:

**CANONICAL-SUPPORT META-GOVERNANCE ROUTER**

It may be used to connect:

```text
boundary symptom
→ canonical failure
→ Tool
→ Firewall
→ claim ceiling
→ repair
→ REOPEN
→ Return
```

It does not become an independent Failure Atlas item.

---

# 38. Failure Atlas Integration Recommendation

Add a non-numbered index card:

## Recomposition Risk

**Symptom:** A result is being carried into a changed target, scale, representation, institution, population, authority, or action context.

**Ask:** What changed at the boundary, and which warrant condition no longer travels automatically?

**Common routes:** CT-F01, CT-F02, CT-F03, CT-F07, CT-F09, CT-F10, CT-F11, CT-F15, CT-F16.

**Do not infer:** that every boundary crossing is defective.

This card is a router, not CT-F17.

---

# 39. Public Five-Question Test

The public version remains:

1. **What did we establish here?**
2. **What changes when we carry it there?**
3. **What no longer follows automatically?**
4. **Who may act on it?**
5. **What would make us reopen the move?**

Desk-regression result:

All seven original cases can be meaningfully entered through these questions.

But this is not yet evidence of student usability.

### Status

**CONCEPTUAL PASS / EMPIRICAL PENDING**

---

# 40. Classroom Usability Claim Ceiling

This build does not claim:

- students will route correctly without scaffolding;
- five questions are optimal;
- novices can distinguish F01/F02/F03 consistently;
- Tool selection will be reliable without examples.

Those require classroom or usability testing.

---

# 41. Adversarial Routing Summary

| Adversarial case | Correct result |
|---|---|
| calibrated cross-scale inference | no failure |
| new evidence strengthens inference | no failure |
| causal inflation without boundary change | CT-F10, overlay not required |
| legitimate authority and action | no failure |
| aggregate metric with subgroup audit | no failure |
| functional claim stays functional | no failure |
| bounded closure with REOPEN | no failure |
| local map used locally | no failure |

This table is important because it demonstrates that the overlay is selective rather than suspicious of all compression.

---

# 42. Regression Scorecard

| Criterion | Result |
|---|---|
| RR1 Coverage | PASS |
| RR2 Specificity | PASS |
| RR3 Non-collapse | PASS |
| RR4 Multi-route discipline | PASS |
| RR5 Action relevance | PASS |
| RR6 Vocabulary economy | PASS |
| RR7 Counterexample resilience | PASS |

**Overall:** 7/7 PASS.

---

# 43. Strongest Supported Claim

> **Across the seven original recomposition cases and eight adversarial counterexamples, the recomposition routing overlay improves diagnostic specificity without requiring a new canonical failure. It reliably routes boundary-crossing risks to existing CT-F failures, changes Tool and repair selection, preserves claim ceilings and authorization checks, and avoids false positives where cross-boundary inference is adequately warranted.**

---

# 44. Claim Ceiling

This regression does not establish:

- psychometric reliability;
- inter-rater reliability among human users;
- student usability;
- optimal routing order;
- completeness of the current Failure Atlas for every future domain;
- that one primary failure can always be selected;
- that CT-F17 can never become necessary.

---

# 45. REOPEN Conditions

Reopen the CT-F17 rejection if:

1. new cases repeatedly resist specific routing;
2. independent users disagree systematically because the existing failures do not capture the mechanism;
3. one recurrent recomposition pattern requires a unique Tool or repair;
4. a distinct claim ceiling appears that cannot be inherited from existing failures;
5. the routing overlay becomes more complex than a single dedicated failure;
6. classroom testing shows the overlay is unusable without a dedicated concept.

---

# 46. Constitutional Consequence

The regression strengthens the anti-proliferation architecture.

The system now has an example of a concept that:

- is real;
- is diagnostically useful;
- survives cross-domain stress;
- yet should **not** become a new canonical primitive or failure.

That is an important proof of concept for constitutional compression.

---

# 47. Relation to Simon Comparator

Simon helps explain why decomposition is necessary for tractability.

This regression shows how recomposition can be governed without creating a second ontology of cross-boundary errors.

The synthesis becomes:

```text
DECOMPOSE FOR TRACTABILITY
↓
SOLVE LOCALLY
↓
IDENTIFY BOUNDARY
↓
ROUTE RECOMPOSITION RISK
↓
RE-EARN WARRANT
↓
ACT WITHIN AUTHORIZATION
↓
RETURN
```

---

# 48. Next Disciplined Move

The next move should shift from conceptual architecture to implementation or human validation.

Two strong options:

## Option A — FSP-FAILURE-ROUTING-OVERLAY-1

Implement the non-numbered Recomposition Risk router in the Encyclopedia / Failure Atlas while preserving CT-F01–CT-F16.

## Option B — FSP-RECOMPOSITION-USABILITY-1

Create a small student/faculty test set using the public five-question version, then compare:
- unaided diagnosis;
- "Bad Recomposition" label;
- routed existing-failure diagnosis.

The stronger next move for architectural completion is **Option A**.  
The stronger next move for empirical validation is **Option B**.

---

# 49. Final Decision

**PASS — ROUTING OVERLAY VALIDATED AT ARCHITECTURAL LEVEL.**

- CT-F17 remains rejected.
- Existing sixteen failures remain frozen.
- Recomposition Risk is promoted only to canonical-support routing overlay.
- Boundary crossing is not itself a failure.
- Primary failure selection is required where possible.
- Secondary failures are added only when they change repair or authorization.
- Public five-question compression remains conceptually adequate but empirically unvalidated.

---

# 50. Final Statement

The routing regression confirms a disciplined result:

> **The fact that a result crossed a boundary tells us where to inspect, not what the failure is.**

The proper architecture is:

```text
BOUNDARY ALARM
≠
FAILURE DIAGNOSIS

BOUNDARY ALARM
→ inspect changed conditions
→ select existing failure
→ apply existing Tool / Firewall
→ bound the claim
→ check authorization
→ preserve remainder
→ test in Return
```

The governing principle is therefore:

> **Recomposition is a routing problem before it is a vocabulary problem.**

And the final consolidation rule is:

> **Do not name a new failure when an existing failure can explain what changed, what broke, and how to repair it.**
