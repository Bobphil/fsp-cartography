# FSP-JTS-FL-NURSING-HOME-REPAIR-4

## Gulf Pines Repair, Strategy Families, and Sequencing

**Status:** LAYER-4 WORKED REPAIR GRAMMAR  
**Parent:** FSP-JTS-FL-NURSING-HOME-1  
**Depends on:** Layers 1–3  
**Purpose:** Show how governed inquiry moves from diagnosis toward action without collapsing generation, recommendation, authorization, implementation, and review.

---

# 1. Why repair needs its own layer

A Joint Task Space can diagnose a problem accurately and still fail at action.

Common failures include:

- jumping from diagnosis directly to one preferred solution;
- treating a generated option as a recommendation;
- treating a recommendation as authorization;
- sequencing actions in the wrong order;
- ignoring implementation dependencies;
- choosing irreversible actions before reversible probes;
- solving one domain's problem by exporting hidden burdens into another;
- continuing an emergency strategy after its justificatory conditions decay.

Therefore:

> **Diagnosis ≠ repair.**

And:

> **Generated option ≠ recommended option ≠ authorized option ≠ implemented option.**

Layer 4 governs the path from a revised map to coordinated repair.

---

# 2. Repair object

Each repair candidate should expose:

```text
REPAIR_OBJECT
  repair_id
  target_failure
  target_domain
  strategy_family
  proposed_action
  evidence_basis
  expected_benefit
  expected_burden
  affected_parties
  prerequisites
  dependencies
  conflicts
  reversibility
  implementation_owner
  recommendation_status
  authorization_status
  monitoring_plan
  claim_ceiling
  reopen_conditions
  stop_conditions
  review_time
```

A repair object is not an order.

It is an inspectable candidate.

---

# 3. Strategy families

The Gulf Pines pilot uses six strategy families.

## A. Clinical / infection-control repair

Examples:
- testing;
- cohorting;
- PPE;
- ventilation;
- monitoring;
- clinical escalation;
- unit-specific precautions.

Primary target:
infection risk and clinical deterioration.

Firewall:

> **Clinical benefit ≠ complete institutional justification.**

## B. Staffing / capacity repair

Examples:
- contingency staffing;
- schedule redesign;
- protected skill mix;
- workload triage;
- external support;
- redeployment;
- temporary staffing reserve.

Primary target:
implementation feasibility and care capacity.

Firewall:

> **Staffing adequacy on paper ≠ effective care capacity.**

## C. Resident-capability repair

Examples:
- communication support;
- safe-contact alternatives;
- mobility support;
- individualized visitation exceptions;
- sensory accommodation;
- routine preservation.

Primary target:
effective capability, dignity, and agency.

Firewall:

> **Formal access ≠ usable access.**

## D. Family / relational repair

Examples:
- designated family contacts;
- scheduled communication;
- caregiver exceptions;
- transparent policy explanation;
- remote access support;
- structured feedback.

Primary target:
relational continuity and information flow.

Firewall:

> **Communication channel ≠ meaningful relationship access.**

## E. Institutional / governance repair

Examples:
- escalation rules;
- standing map;
- rapid review group;
- exception process;
- authorization expiry;
- documentation;
- burden review;
- REOPEN schedule.

Primary target:
governance quality.

Firewall:

> **Policy existence ≠ governed policy.**

## F. Structural / post-crisis repair

Examples:
- staffing resilience review;
- inspection-history review;
- ownership/resource analysis;
- physical-plant redesign;
- emergency reserve planning;
- data/provenance repair;
- training redesign.

Primary target:
background conditions that shaped vulnerability.

Firewall:

> **Post-crisis diagnosis ≠ retrospective blame.**

---

# 4. Repair sequencing

Repairs should not be treated as an unordered menu.

A candidate sequence may involve:

```text
stabilize immediate harm
→ restore visibility
→ restore minimum capability
→ repair implementation constraints
→ revise authorization
→ address structural causes
→ monitor
→ REOPEN
```

The sequence is not universal.

It is a dependency-aware grammar.

---

# 5. Four sequencing tests

## A. Prerequisite test

What must already be true before this action can work?

Example:
essential-caregiver access may require PPE supply, screening, and staffing for safe entry.

## B. Dependency test

What other repair does this action rely on?

Example:
a communication plan may depend on staffing time and accessible devices.

## C. Conflict test

Does this repair undermine another legitimate objective?

Example:
strict room isolation may reduce contact but increase falls, distress, or staffing burden.

## D. Order test

Does doing this first close off a better later option?

Example:
facility-wide shutdown before unit-level evidence may destroy useful differentiation.

---

# 6. Reversibility

Layer 4 adds **reversibility status**.

Canonical states:

- HIGHLY_REVERSIBLE
- REVERSIBLE_WITH_COST
- PARTIALLY_REVERSIBLE
- DIFFICULT_TO_REVERSE
- IRREVERSIBLE

When uncertainty is high, prefer reversible or bounded moves where clinically and ethically adequate.

This is not an absolute rule.

Sometimes delay itself causes irreversible harm.

Firewall:

> **Reversible ≠ automatically preferable.**

The correct question is:

> **What is the cost of being wrong in each direction?**

---

# 7. Option value

A strategy can preserve future options.

Example:

A time-limited, unit-specific restriction with scheduled review may preserve more future flexibility than an indefinite facility-wide rule.

Layer 4 therefore tracks:

- informational value;
- reversibility;
- option preservation;
- burden;
- time sensitivity.

This creates a practical firewall:

> **Immediate decisiveness ≠ strategic adequacy.**

---

# 8. Repair bundles

Complex problems often require bundles rather than isolated interventions.

Example bundle:

```text
BUNDLE-A
  clinical: unit-specific precautions
  staffing: temporary night-shift reinforcement
  capability: safe caregiver exceptions
  family: structured daily updates
  governance: 72-hour authorization review
```

A bundle can be more coherent than choosing one "best" action.

But bundling introduces interaction effects.

Firewall:

> **Individually reasonable repairs ≠ jointly coherent bundle.**

---

# 9. State-specific strategy families

## S0 — Early Signal

Primary goal:
gain information while reducing avoidable immediate harm.

Candidate repairs:
- rapid assessment;
- targeted testing;
- temporary precautions;
- staffing contingency check;
- internal alert;
- early family communication plan.

Preferred sequencing:
1. verify signal;
2. protect immediately exposed persons;
3. assess staffing reserve;
4. prepare escalation.

Avoid:
premature facility-wide irreversible measures.

Claim ceiling:

> **Early precaution ≠ final policy.**

---

## S1 — Widening Map

Primary goal:
integrate resident burden and operational feasibility into the response.

Candidate repairs:
- targeted unit precautions;
- communication supports;
- staffing reinforcement;
- resident-specific isolation alternatives;
- family contact protocols;
- capability accommodations.

Preferred sequencing:
1. preserve infection-control minimums;
2. identify high-burden residents;
3. repair staffing/communication bottlenecks;
4. differentiate where evidence supports differentiation.

Claim ceiling:

> **More evidence ≠ permission to ignore unequal burden.**

---

## S2 — Intervention Pressure

Primary goal:
control serious transmission while preventing emergency overreach.

Candidate repair families:
- time-limited facility-wide restriction;
- unit-specific restrictions;
- essential caregiver exceptions;
- PPE-supported visitation;
- staffing surge;
- rapid review committee;
- burden-monitoring protocol.

Critical sequencing:
1. define emergency objective;
2. identify least-burden adequate intervention;
3. secure implementation capacity;
4. authorize explicitly;
5. set expiry;
6. monitor both disease and intervention harms.

Firewall:

> **Emergency intensity ≠ indefinite duration.**

---

## S3 — Revised Bounded Judgment

Primary goal:
de-escalate responsibly and address structural vulnerability.

Candidate repairs:
- narrow restrictions;
- restore caregiver access;
- restore mobility/activity;
- repair deferred relational harms;
- review staffing resilience;
- inspect structural profile;
- revise emergency protocol.

Preferred sequencing:
1. remove no-longer-justified restrictions;
2. restore lost capabilities;
3. continue surveillance;
4. conduct structural review;
5. preserve re-escalation criteria.

Firewall:

> **De-escalation ≠ abandonment of vigilance.**

---

# 10. Generate / recommend / authorize separation

Every repair remains in an action state.

```text
GENERATED
POSSIBLE
RECOMMENDED
AUTHORIZED
IMPLEMENTED
REVIEWED
```

Example:

**Generated:**
Allow essential caregiver entry.

**Possible:**
PPE, screening, staffing, and space exist.

**Recommended:**
Clinical + resident-capability review supports it.

**Authorized:**
Appropriate facility authority approves under resident-rights and infection-control constraints.

**Implemented:**
Visit occurs under protocol.

**Reviewed:**
Transmission, burden, feasibility, and resident outcomes assessed.

Firewall:

> **A good idea can fail at any transition.**

---

# 11. Recommendation criteria

Before a repair moves from POSSIBLE to RECOMMENDED, ask:

1. Which failure does it target?
2. What evidence supports it?
3. What expected benefit is plausible?
4. What burdens does it create?
5. Who is affected?
6. What alternatives exist?
7. Is it reversible?
8. What dependencies exist?
9. Does it preserve future options?
10. What remains uncertain?
11. What is the claim ceiling?
12. What would make us withdraw the recommendation?

---

# 12. Authorization criteria

Before a repair moves from RECOMMENDED to AUTHORIZED, add:

1. Who may authorize?
2. What standing constrains the authorization?
3. Is the scope resident-specific, unit-specific, or facility-wide?
4. Is authorization time-bound?
5. Is implementation capacity adequate?
6. What monitoring is mandatory?
7. What expiry or review condition applies?

This links Layer 4 back to Layer 2.

---

# 13. Implementation feedback

Implementation is not the end.

Implementation generates new evidence.

Therefore:

```text
repair
→ implementation
→ observed effects
→ burden effects
→ comparison to expectation
→ review
→ retain / modify / stop / replace
```

Firewall:

> **Implemented ≠ successful.**

---

# 14. Stop conditions

Every consequential repair should specify stop conditions.

Examples:

- intervention harm exceeds benefit;
- staffing burden becomes unsafe;
- evidence no longer supports target;
- alternative becomes clearly superior;
- legal standing changes;
- resident-specific harm crosses threshold;
- implementation failure invalidates assumption.

A strategy without stop conditions risks sedimentation.

---

# 15. Repair debt

Layer 4 introduces **repair debt**.

A temporary workaround can become a hidden permanent structure.

Examples:

- staff repeatedly absorbing family-care functions;
- temporary staffing overtime becoming routine;
- emergency communication process never formalized;
- exceptions handled informally without governance repair.

Firewall:

> **Temporary workaround ≠ completed repair.**

Accumulated repair debt should trigger structural review.

---

# 16. Strategy collision

Two strategies can each be locally reasonable yet conflict.

Examples:

- stricter isolation vs mobility preservation;
- staffing conservation vs communication support;
- rapid discharge vs continuity of care;
- uniform policy vs individualized capability.

Layer 4 requires explicit collision review.

Questions:
- Which objective does each strategy protect?
- Who bears the collision?
- Can sequencing reduce conflict?
- Can one repair be redesigned?
- Is a compensating repair needed?

---

# 17. Bounded optimization

The Joint Task Space does not optimize one master metric.

It seeks a bounded, revisable package that is good enough across legitimate constraints.

Therefore:

> **Joint Task Space ≠ single-objective optimization.**

The repair goal is satisficing under governed plural constraints.

---

# 18. Layer-4 acceptance test

Layer 4 passes if a reader can see:

1. why diagnosis does not determine repair;
2. why repairs belong to strategy families;
3. how prerequisites and dependencies shape order;
4. how conflicts among repairs are exposed;
5. why reversibility matters;
6. how bundles are constructed;
7. how Generate/Recommend/Authorize remain distinct;
8. how implementation creates new evidence;
9. how stop conditions prevent sedimentation;
10. how repair debt triggers deeper structural review.

The core result is:

> **FSP does not move from problem to solution. It moves from diagnosed pressure to governed strategy families, sequenced repair, bounded authorization, monitored implementation, and REOPEN.**
