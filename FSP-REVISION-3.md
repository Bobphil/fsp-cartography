# FSP-REVISION-3

## Revision-Conflict Dynamics, Reason-Change Over Time, Evidence-Reweighting Without Hidden Utility, Community Disagreement, and Convergence/Nonconvergence Conditions

**Status:** Diachronic and social revision-governance layer  
**Boundary:** REVISION-1/2 remain intact; TRANSLATION-12 human evidence remains PENDING.

## 1. Purpose

REVISION-2 represented plural theory-choice reasons at a moment.

REVISION-3 asks what happens when:

- evidence changes;
- reason assessments change;
- the salience of reasons changes;
- different investigators revise at different rates;
- communities coordinate before they agree;
- communities may converge on a choice without converging on reasons.

The build therefore makes the revision frontier diachronic and social.

## 2. Revision moments

A revision moment records:

- evidence state;
- candidate reason profiles;
- evaluator profiles;
- reason salience by evaluator;
- events.

Moments are ordered.

A later moment must have a strictly greater ordinal than an earlier moment.

## 3. Reason change over time

The dynamics layer compares moments and reports:

- added evidence;
- removed evidence;
- changed reason assessments;
- changed reason salience.

It deliberately contains:

`hiddenUtilityScore = null`

The system does not turn evolving reasons into a numeric theory-choice utility.

## 4. Evidence reweighting

Reason salience may change in response to evidence.

For example, a conservative researcher may initially treat conservatism as CRITICAL and evidence fit as MEDIUM.

After repeated auxiliary failure and new discriminatory evidence, evidence fit may become HIGH while conservatism falls to HIGH or MEDIUM.

This is represented as:

- previous salience;
- new salience;
- triggering evidence;
- explicit justification.

There is no numeric weight.

## 5. Mercury comparator

The early Mercury moment contains:

- persistent perihelion anomaly;
- Vulcan still live;
- relativity not yet fully established in the represented case.

The later moment contains:

- failed Vulcan search trajectory;
- continued anomaly;
- positive relativistic explanatory/predictive support.

The same candidate can therefore change its reason profile over time.

Vulcan may move:

`EVIDENCE_FIT: UNRESOLVED -> STRONGLY_COUNTS_AGAINST`

while relativity may move:

`EVIDENCE_FIT: FAVORS -> STRONGLY_FAVORS`

and:

`FECUNDITY: FAVORS -> STRONGLY_FAVORS`.

## 6. Community disagreement

Community members carry:

- live candidates;
- preferred candidate;
- action commitments;
- stated reasons.

The architecture distinguishes several outcomes.

### FULL_CONVERGENCE

Same preferred candidate, shared action, and the same represented reason set.

### CHOICE_CONVERGENCE_WITH_REASON_PLURALISM

Same preferred candidate, but different reasons remain.

### PRACTICAL_CONVERGENCE_ONLY

Members share an action while preferring different candidates.

### REASON_CONVERGENCE_WITH_CHOICE_DIVERGENCE

Members share reasons but still select different revisions.

### NONCONVERGENCE

Neither choice, practical action, nor represented reasons sufficiently overlap.

## 7. Cooperation without theoretical convergence

The early Mercury community can disagree about Vulcan versus framework revision while still agreeing to:

> collect further perihelion evidence.

That is practical convergence without theory-choice convergence.

FSP must not relabel this as theoretical agreement.

## 8. Convergence after evidence change

Later evidence may lead multiple investigators to prefer the relativistic revision.

But they may still do so for different reasons.

One may emphasize:

- evidence fit;
- explanatory power;
- fecundity.

Another may emphasize:

- evidence fit;
- coherence.

That is:

`CHOICE_CONVERGENCE_WITH_REASON_PLURALISM`

not full convergence.

## 9. Nonconvergence is legitimate output

REVISION-3 does not assume communities must eventually converge.

If evidence remains underdetermining and reason priorities remain different, nonconvergence is a valid state.

The architecture therefore never sets:

`forcedConsensus = true`.

## 10. Evidence, persuasion, and power

A change in reason salience should be traceable to a declared trigger.

That matters because communities may also change through:

- institutional pressure;
- authority;
- prestige;
- resource constraints;
- professional risk.

Those may explain uptake.

They do not automatically count as epistemic evidence.

This extends the formation != justification firewall into community dynamics.

## 11. What counts as convergence

The build deliberately separates:

```
same action
!=
same candidate
!=
same reasons
!=
same ontology
```

This protects the broader FSP principle of cooperation without convergence.

## 12. Non-algorithmic boundary

Reason change over time remains inspectable but non-algorithmic.

The system may say:

- evidence fit increased;
- conservatism became less salient;
- two members now prefer the same candidate;
- reasons remain plural;
- practical cooperation existed before theoretical agreement.

It may not say:

- the new evidence mathematically forces one universal weighting;
- convergence proves that the community has discovered the uniquely rational theory;
- persistence of dissent proves irrationality;
- majority uptake converts a candidate into truth.

## 13. Human-validation boundary

Nothing in REVISION-3 changes TRANSLATION-12.

Human-validation status remains:

`PENDING`

## 14. Research ceiling

The strongest current claim is:

> FSP can represent changing revision reasons and salience through time, distinguish multiple forms of community convergence and nonconvergence, and preserve cooperation without theoretical agreement without converting evolving reason profiles into hidden utilities or forced consensus.

It does not establish a sociology of scientific communities or a universal model of rational convergence.
