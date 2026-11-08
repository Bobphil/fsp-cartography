# FSP-JTS-FL-NURSING-HOME-TRANSLATION-3

## Gulf Pines Translation and Remainder Governance

**Status:** LAYER-3 WORKED TRANSLATION LEDGER  
**Parent:** FSP-JTS-FL-NURSING-HOME-1  
**Depends on:** FSP-JTS-FL-NURSING-HOME-STATES-1; FSP-JTS-FL-NURSING-HOME-STANDING-2  
**Purpose:** Show how heterogeneous domain-native representations can enter one Joint Task Space without being treated as identical, lossless, or self-authorizing.

---

# 1. Why translation is a governance problem

A Joint Task Space requires participants to communicate across domains.

That communication is never neutral.

Clinical language, staffing metrics, resident experience, family knowledge, regulatory categories, ethical judgments, administrative plans, and historical data do not describe the same kind of object.

They may refer to overlapping aspects of one situation, but they are constructed for different purposes, with different methods, evidence, authority, and omissions.

Therefore:

> **Translation ≠ identity.**

And:

> **Shared field ≠ shared ontology.**

The task is not to erase those differences.

The task is to make enough of the relation among them inspectable that they can cooperate responsibly.

---

# 2. The translation object

Every consequential cross-domain contribution should be representable through a thin governance object.

```text
TRANSLATION_OBJECT
  source_domain
  source_actor
  source_object
  source_representation
  provenance
  observation_status
  inference_status
  assumptions
  translation_target
  translated_representation
  remainder
  claim_ceiling
  standing
  recommendation_status
  authorization_status
  reopen_conditions
  return_target
```

Not every field must be populated in every case.

But three states must remain distinct:

- **KNOWN**
- **UNKNOWN**
- **NOT_APPLICABLE**

Silence must not be mistaken for absence.

---

# 3. Source-domain integrity

A translation begins from a domain-native object.

Examples:

Clinical:
- test result;
- symptom pattern;
- treatment indication;
- transmission estimate.

Resident:
- fear;
- pain;
- loneliness;
- preference;
- perceived loss of agency.

Staffing:
- hours;
- skill mix;
- absences;
- workload;
- shift coverage.

Family:
- longitudinal knowledge;
- baseline behavior;
- communication needs.

Regulation:
- rule;
- requirement;
- prohibited action;
- reporting threshold.

Administration:
- policy;
- schedule;
- resource allocation;
- contingency plan.

Historical analysis:
- association;
- matched contrast;
- descriptive warning profile.

Ethics:
- reasoned judgment;
- claim about standing;
- burden distribution;
- legitimacy concern.

The shared task space may translate selected relations from these objects.

It must not silently redefine the native object.

Firewall:

> **Translation target ≠ source object.**

---

# 4. Provenance

Every translation must preserve enough provenance to answer:

- Who supplied this?
- From which domain?
- Under what method?
- At what time?
- From which evidence source?
- Under what role?
- With what uncertainty?
- Was it observed, inferred, modeled, reported, remembered, or stipulated?

Example:

```text
source_domain: FRONTLINE_CARE
source_actor: NIGHT_SHIFT_CNA
source_object: room-isolation feasibility
source_representation: "full isolation is difficult under current coverage"
provenance: direct shift report
observation_status: REPORTED_DIRECTLY
inference_status: LOW
```

The Joint Task Space may later translate this as:

```text
translated_representation:
  current staffing may constrain safe implementation of full-room isolation
```

That translation does not erase the original report.

---

# 5. Observation / inference separation

Translation often introduces abstraction.

Therefore every translated claim should preserve whether it rests on:

- DIRECT_OBSERVATION
- REPORTED_OBSERVATION
- MEASURED_DATA
- MODEL_OUTPUT
- INFERENCE
- HYPOTHESIS
- NORMATIVE_JUDGMENT
- POLICY_STIPULATION
- LEGAL_REQUIREMENT

Example:

Resident stops eating after isolation.

Possible representations:

**Observation:**
resident intake declined after restriction.

**Inference:**
reduced family contact may be contributing.

**Normative judgment:**
the intervention burden may now be ethically significant.

These are connected.

They are not the same claim.

Firewall:

> **Temporal sequence ≠ established cause.**

---

# 6. Remainder

A translation is governed only if it can represent what did not travel.

**Remainder** is the portion of the source-domain meaning, uncertainty, context, or structure that cannot be carried cleanly into the shared representation.

Remainder is not a defect to be hidden.

It is governance information.

Canonical statuses:

- **NONE_IDENTIFIED**
- **DOMAIN_NATIVE_ONLY**
- **PARTIALLY_TRANSLATED**
- **CONTESTED**
- **UNKNOWN**
- **DEFERRED**

Firewall:

> **Untranslated remainder ≠ irrelevant remainder.**

---

# 7. Remainder examples

## Resident experience

Source:
“I feel like I am being imprisoned.”

Shared translation:
restriction is producing severe experienced loss of agency.

Remainder:
- emotional texture;
- personal history;
- symbolic meaning;
- whether “imprisoned” is metaphorical, literal, or both.

Status:
DOMAIN_NATIVE_ONLY + PARTIALLY_TRANSLATED.

## Clinical recommendation

Source:
minimize contact during active transmission.

Shared translation:
reduce high-risk interpersonal exposure.

Remainder:
- exact dose-response relation;
- resident-specific risk;
- uncertainty regarding alternative safeguards.

Status:
PARTIALLY_TRANSLATED.

## Staffing metric

Source:
staffing hours per resident day decline.

Shared translation:
care capacity may be under pressure.

Remainder:
- skill mix;
- informal teamwork;
- staff experience;
- local workflow adaptations;
- morale.

Status:
PARTIALLY_TRANSLATED.

## Regulation

Source:
facility must meet specified infection-control requirement.

Shared translation:
available action space is legally constrained.

Remainder:
- whether minimum compliance is ethically sufficient;
- whether local implementation is feasible;
- whether the rule captures resident-specific burdens.

Status:
DOMAIN_NATIVE_ONLY.

---

# 8. Translation matrix

| Domain | Native object | Shared translation | Remainder |
|---|---|---|---|
| Clinical/public health | infection/transmission evidence | outbreak-risk claim with uncertainty | prognosis, future pathogen behavior |
| Resident experience | lived burden/preferences | capability + dignity effects | first-person meaning |
| Family knowledge | longitudinal resident knowledge | perspective/provenance contribution | proxy limits, disagreement |
| Frontline staffing | shift feasibility/workload | implementation-capacity constraint | informal adaptations, morale |
| Administration | policy/resource plan | action pathway | hidden burden, incentive effects |
| Regulation | rule/mandate | authorization boundary | moral sufficiency, local fit |
| Ethics | reasoned judgment | bounded normative claim | unresolved theory/value conflict |
| Historical data | association/matched contrast | structural warning | causality, facility-specific prediction |
| Finance/ownership | resources/incentives | background constraint hypothesis | intent, direct causal path |

This is **metaphysically agnostic translation**.

The domains remain different kinds of inquiry.

---

# 9. Translation firewalls

Layer 3 freezes the following Firewalls:

> **Translation ≠ identity.**

> **Compression ≠ semantic equivalence.**

> **Shared field ≠ shared ontology.**

> **Observation ≠ inference.**

> **Association ≠ causal effect.**

> **Expertise ≠ standing.**

> **Recommendation ≠ authorization.**

> **Untranslated remainder ≠ irrelevant remainder.**

> **Readable summary ≠ exhaustive representation.**

---

# 10. Translation across the four Gulf Pines states

## S0 — Early Signal

Translation problem:
How do isolated observations become an outbreak hypothesis without becoming a premature diagnosis?

Key source domains:
- frontline observation;
- clinical assessment;
- staffing report.

Primary translation:
symptom cluster → candidate outbreak state.

Remainder:
- pathogen;
- causal chain;
- scale;
- staffing trajectory.

Claim ceiling:

> **Candidate outbreak representation ≠ established facility-wide outbreak.**

---

## S1 — Widening Map

Translation problem:
How do resident burden, family knowledge, and staffing feasibility enter a clinically framed outbreak problem?

Key source domains:
- resident experience;
- family knowledge;
- frontline operations;
- clinical evidence.

Primary translation:
infection-control problem → multi-domain capability-and-burden problem.

Remainder:
- resident-specific meaning;
- informal caregiving functions;
- exact operational limits.

Claim ceiling:

> **More domains represented ≠ complete map.**

---

## S2 — Intervention Pressure

Translation problem:
How does “reduce contact” travel into policy without losing resident meaning, staff burden, and authorization constraints?

Key source domains:
- clinical recommendation;
- administration;
- resident/family;
- frontline operations;
- regulation.

Primary translation:
clinical risk reduction → candidate institutional intervention.

This is the most dangerous translation point.

Firewall:

> **Clinical recommendation ≠ authorized policy.**

Remainder:
- unequal resident burden;
- implementation effects;
- policy legitimacy;
- resident-specific exceptions.

Claim ceiling:

> **Translated policy rationale ≠ ethically complete authorization.**

---

## S3 — Revised Bounded Judgment

Translation problem:
How do changed evidence and visible intervention harms flow back into policy revision?

Key source domains:
- updated clinical evidence;
- resident outcomes;
- staff feasibility;
- caregiver experience.

Primary translation:
changed local evidence → revised authorization state.

Remainder:
- future resurgence;
- long-term harms;
- structural causes.

Claim ceiling:

> **Improved conditions ≠ proof that earlier intervention was unnecessary.**

---

# 11. Translation loss audit

Every consequential translation should be inspectable through five questions:

1. **What source object is being translated?**
2. **What was preserved?**
3. **What was compressed?**
4. **What was lost or left as remainder?**
5. **Did the translation silently strengthen the claim?**

A translation fails governance if the answer to 5 is yes.

Examples of silent strengthening:

- “staff report difficulty” → “policy is impossible”;
- “resident distress increased” → “restriction caused all decline”;
- “historical LL profile associated with worse outcomes” → “low staffing caused this outbreak”;
- “regulator requires infection control” → “regulator requires this exact local policy.”

---

# 12. Cross-domain interoperability test

Two contributions are interoperable enough for the task when participants can recover:

- what each domain is claiming;
- what supports it;
- what representation was used;
- what assumptions travel;
- what remains uncertain;
- what cannot be translated cleanly;
- who has standing;
- what action state applies;
- what would require revision.

Interoperability does not require conceptual identity.

---

# 13. Translation provenance chain

A high-stakes translated claim should permit reverse inspection.

Example:

```text
POLICY CLAIM:
  visitation restriction is needed

← translated from

CLINICAL RECOMMENDATION:
  reduce high-risk contact

← supported by

CLINICAL EVIDENCE:
  active multi-unit transmission

+ modified by

RESIDENT BURDEN:
  severe isolation effects

+ modified by

STAFFING FEASIBILITY:
  staff cannot safely replace all family functions

+ constrained by

LEGAL / REGULATORY BOUNDARY:
  infection-control duties + resident rights

→ resulting bounded policy candidate
```

This is a translation chain, not a single argument.

---

# 14. Remainder debt

Layer 3 introduces **remainder debt**.

A remainder can be temporarily deferred.

But repeated deferral can become dangerous.

Examples:

- resident distress repeatedly omitted because it is hard to quantify;
- informal family care never represented;
- staffing skill mix hidden behind total hours;
- local feasibility omitted because policy is standardized.

A Joint Task Space should therefore track whether deferred remainder accumulates.

Firewall:

> **Deferred remainder ≠ resolved remainder.**

Remainder debt should itself be a REOPEN trigger when it becomes decision-relevant.

---

# 15. Translation repair

When a translation fails, repair can occur at different levels:

### Representation repair
Add omitted field, provenance, or uncertainty.

### Vocabulary repair
Separate terms that were falsely treated as equivalent.

### Standing repair
Restore who may challenge or interpret the translated object.

### Remainder repair
Expose what was suppressed or deferred.

### Routing repair
Return the claim to the source domain for clarification.

### Grammar repair
If repeated failures show the shared schema itself is defective, REOPEN the FSP grammar.

---

# 16. Layer-3 acceptance test

Layer 3 passes if a reader can see:

1. what each domain contributes in its own terms;
2. how selected information enters the shared task space;
3. what provenance is preserved;
4. what abstraction the translation introduces;
5. what remains as remainder;
6. how claim ceilings survive translation;
7. how recommendation and authorization remain separate;
8. how translation loss can trigger repair;
9. how remainder debt can accumulate;
10. why interoperability does not require one shared ontology.

The core result is:

> **A Joint Task Space succeeds not when every domain says the same thing, but when differences can travel without becoming invisible.**
