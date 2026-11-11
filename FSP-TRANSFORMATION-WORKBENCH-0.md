# FSP-TRANSFORMATION-WORKBENCH-0

## Bring-Your-Own-Question Authoring, Local Persistence, Transition Inspection, Claim Ceiling, REOPEN, and AI-Assist Gap Audit

**Status:** PUBLIC V0 / PRODUCT-TRANSITION PROBE

# 1. Why this build exists

The Guided Pilot demonstrates how FSP inspects transformations through prepared cases.

The Workbench begins the next product transition:

> **Bring your own question and construct an inspectable transformation map.**

This V0 deliberately does **not** infer the map automatically.

That limitation is visible by design.

# 2. What users can do now

Users can:

- enter their own transformation question;
- name the inquiry;
- add bounded states;
- record possibilities in each state;
- connect states with transitions;
- name the relation type;
- enter evidence;
- enter assumptions;
- enter competing explanations;
- enter remainder;
- set a claim ceiling;
- set REOPEN conditions;
- inspect a selected transition;
- see opened and closed possibilities;
- record a whole-inquiry bounded judgment;
- persist the draft locally in the browser;
- export the inquiry as structured JSON.

# 3. What the system does not yet do

V0 does not:

- infer states from natural-language questions;
- propose candidate pathways automatically;
- identify missing actors or access relations;
- retrieve external evidence;
- evaluate evidence quality;
- score bridge burden;
- generate predictions automatically;
- propose discriminating experiments automatically;
- compare a user case against the case library;
- detect hidden scale jumps automatically;
- distinguish causal, correlational, normative, and authorization transitions without user input.

# 4. Why V0 is useful anyway

V0 tests whether the underlying representation grammar is usable before AI assistance is added.

If users cannot comfortably:

    question
    → state
    → transition
    → evidence / assumptions
    → ceiling
    → REOPEN

then an AI-generated version would merely automate an unclear workflow.

# 5. AI-assisted V1 boundary

A future assistance layer may propose:

    USER QUESTION
    ↓
    CANDIDATE STATES
    ↓
    CANDIDATE TRANSITIONS
    ↓
    ALTERNATIVE PATHWAYS
    ↓
    EVIDENCE NEEDED
    ↓
    PREDICTIONS / DISCRIMINATING TESTS

But every proposal must remain editable and explicitly marked as generated.

> **Generated map ≠ accepted map.**

> **Generated explanation ≠ validated explanation.**

> **Generated test ≠ authorized intervention.**

# 6. Missing-resource audit

The next AI-assisted version requires at least:

1. a proposal schema compatible with Workbench objects;
2. provenance marking for model-generated vs user-authored fields;
3. confidence / uncertainty handling that is not mistaken for evidence strength;
4. optional web or source retrieval for evidence claims;
5. domain-library routing;
6. competing-path generation;
7. prediction and test-generation grammar;
8. user acceptance / rejection / revision controls;
9. persistence beyond one local browser if cross-session research work is desired;
10. privacy rules for personal or sensitive inquiries.

# 7. Product sequence

    GUIDED PILOT
    → WORKBENCH V0
    → AI-ASSISTED PROPOSAL V1
    → EVIDENCE-BINDING V2
    → COMPARATIVE RESEARCH STUDIO
    → CROSS-CASE DISCOVERY LAYER

# 8. Claim ceiling

Workbench V0 makes user-authored transformation maps inspectable.

It does not determine whether the maps are correct.

---

**FSP-TRANSFORMATION-WORKBENCH-0 — BRING-YOUR-OWN-QUESTION AUTHORING, LOCAL PERSISTENCE, TRANSITION INSPECTION, CLAIM CEILING, REOPEN, AND AI-ASSIST GAP AUDIT**
