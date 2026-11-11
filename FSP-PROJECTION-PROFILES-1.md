# FSP-PROJECTION-PROFILES-1

## Production Projection Profiles for Encyclopedia, Classroom, VR, Application, and Research

**Status:** production-profile freeze candidate  
**Inherited authorities:** FSP-ECOSYSTEM-BRIDGE-1; FSP-RELATION-GRAPH-1; canonical Five-Case Atlas.

This build converts broad environment descriptions into executable production specifications.

The governing rule is:

> **A projection profile may govern visibility, transformation, interaction, metadata, and return. It may not become a second source of canonical truth.**

## 1. Profile contract

Each environment profile now declares:

- canonical data facets it may expose;
- canonical data facets hidden by default;
- permitted presentation transformations;
- required environment-specific additions;
- optional additions;
- relation types the environment may traverse;
- required status markers;
- required return fields;
- return artifact type;
- forbidden mutations;
- completion criteria.

The profile therefore answers a production question:

**What must be true before a projection counts as a valid artifact in this environment?**

## 2. Canonical data facets

The profile layer recognizes these facets:

`IDENTITY, DOING, CLAIMS, EVIDENCE, WARRANTS, AUXILIARIES, BACKGROUND, MEANINGS, ONTOLOGY, TASK, STANDING, POWER_AUTHORITY, LIVE_POSSIBILITIES, REMAINDER, CLAIM_CEILING, FRAMEWORK, PROVENANCE, TRANSITION_STRUCTURE, PROBE_STRUCTURE, REOPEN`

Visibility policy does not change semantic status.

If a profile hides `ONTOLOGY` or `FRAMEWORK` by default, those fields remain present in the canonical source object. They are suppressed for the human task, not deleted from the inquiry.

## 3. Encyclopedia production profile

### Expose

Narratively useful case structure, claims, evidence, warrants, auxiliaries, meaning changes, live possibilities, remainder, claim ceiling, provenance, transitions, probes, and REOPEN.

### Transform

- plain-language labeling;
- progressive disclosure;
- explanatory annotation.

### Hide by default

- raw ontology;
- power/authority detail unless relevant;
- formal framework field.

### Required additions

- chapter origin;
- reader depth;
- plain-language summary.

### Required return

Exact prose or public-context return.

### Production ceiling

The Encyclopedia may clarify and reorganize presentation. It may not create new routing authority or strengthen the canonical claim.

## 4. Classroom production profile

### Expose

The material necessary for a learner to perform a bounded inquiry move: doing, claims, evidence, warrants, auxiliaries, task, possibilities, remainder, claim ceiling, provenance, probe structure, and REOPEN.

### Transform

- scaffolding;
- sequencing;
- plain-language rewriting;
- instructional annotation.

### Required additions

- learning objective;
- estimated time;
- student prompt;
- output-card schema.

### Required return artifact

A learner-authored record containing:

- student claim;
- reason;
- remaining uncertainty;
- REOPEN condition.

The system must not fill the learner's final judgment.

## 5. VR production profile

### Expose

The relations especially suited to experiential decompression: doing, evidence, auxiliaries, meaning, task, standing, power/authority, live possibilities, remainder, provenance, transitions, probe structure, claim ceiling, and REOPEN.

### Transform

- spatialization;
- temporal replay;
- perspective shift;
- progressive disclosure;
- status annotation.

### Required additions

- scene ID;
- spatial layout;
- interaction primitives;
- persistent simulation status;
- debrief schema.

### Required status firewalls

- simulation ≠ history;
- perspective ≠ person;
- spatial relation ≠ semantic relation.

### Required return artifact

A non-immersive debrief containing what changed experientially, what inference is licensed, what is not licensed, remaining uncertainty, and REOPEN.

A VR scene cannot be production-complete if it ends inside immersion.

## 6. Application production profile

### Expose

Claims, evidence, warrants, task, standing, power/authority, live possibilities, remainder, claim ceiling, provenance, and REOPEN.

### Transform

- domain binding;
- progressive disclosure;
- governance annotation.

### Required additions

- target domain;
- domain authority;
- affected parties;
- permissions model;
- contestability path;
- transfer limitations.

### Required status firewalls

- analogy ≠ domain evidence;
- possibility ≠ recommendation;
- recommendation ≠ authorization.

### Required return artifact

A domain-owned bounded inquiry or decision record identifying the judgment owner, decision authority, affected-party review, remaining uncertainty, and REOPEN.

FSP supplies structure; it does not acquire the target domain's authority.

## 7. Research production profile

### Expose

The canonical material needed to test projection fidelity, comprehension, transfer, and failure.

### Transform

- instrumentation;
- aggregation;
- comparison;
- audit annotation.

### Required additions

- study ID;
- hypothesis;
- measures;
- comparison condition;
- failure criteria;
- analysis plan.

### Status firewalls

- measure ≠ construct;
- performance ≠ validity;
- result ≠ authorization.

### Required return artifact

A research audit containing:

- result;
- failure flags;
- limitations;
- implication for architecture;
- REOPEN condition.

Research evaluates the projection. It does not certify the ontology.

## 8. Projection package compiler

The build includes a compiler:

```text
canonical object
      +
ecosystem projection binding
      +
production profile
      +
relation graph
      +
environment additions
      +
status markers
      +
return token
      ↓
PROJECTION PACKAGE
```

A compiled package contains:

- canonical reference and fingerprint;
- applicable canonical claim ceiling;
- visible/hidden data facets;
- transformations;
- concept/tool overlays;
- presentation and affordances;
- environment additions;
- status markers;
- relation traversal permissions;
- required return artifact;
- forbidden mutations;
- completion criteria.

The compiler fails closed when required additions or status markers are missing.

## 9. First compiled package family

The certified Vulcan controlled-revision probe now compiles into five production package candidates.

### Encyclopedia

Adds CH1.2 origin, INSPECT depth, and a plain-language summary.

### Classroom

Adds a learning objective, 20-minute bounded revision exercise, student prompt, and output-card schema.

### VR

Adds the first scene specification:

`VR-NV-VULCAN-1`

with:
- Newtonian framework anchor;
- Vulcan auxiliary branch;
- observational remainder zone;
- GR revision portal;
- overview return.

Its simulation marker is explicit:

> controlled revision space — not historical actuality

### Application

Compiles only as a generic transfer-training profile. It explicitly states that domain authority must come from the target domain and that the historical case supplies no recommendation or authorization.

### Research

Adds `NV-PROJECTION-FIDELITY-1`, testing whether five projections of the same probe preserve fingerprint, claim ceiling, and return structure before any claim about performance benefit is made.

## 10. Production rule

From this point forward, new classroom packages, VR scene specifications, application profiles, and research tests should not be handcrafted without a profile.

They should be generated or validated against:

```text
canonical object
→ ecosystem binding
→ relation graph
→ projection profile
→ environment artifact
→ return
```

This is the production corridor that prevents downstream environments from becoming independent semantic systems.

## 10.1 Shared Four-Move Governance Preservation Invariants

Across Encyclopedia, Classroom, VR, Application, and Research projections, the profile layer must preserve the semantic functions of the preferred governance compression:

```text
PORTABILITY
→ CEILING
→ AUTHORIZATION
→ RETURN
↺

REMAINDER VISIBLE THROUGHOUT
```

A projection need not expose these labels verbatim. It must, however, preserve enough canonical structure that the following remain recoverable:

- what local result is being carried and into what destination context;
- whether the relevant warrant survives that crossing;
- what claim ceiling applies;
- whether judgment is distinct from recommendation, permission, consent, authority, or implementation;
- what remainder remains visible;
- what consequences and REOPEN conditions constitute Return;
- what provenance supports the projected material.

The compiler must fail closed if a projection silently strengthens the canonical claim, hides decision-relevant remainder, collapses judgment into authorization, or removes a required Return path.

> **Projection simplification ≠ semantic deletion.**

> **Four-move preservation ≠ four mandatory user-interface fields.**

## 11. Claim ceiling

FSP-PROJECTION-PROFILES-1 certifies production requirements for projecting canonical FSP objects into five environments.

It does not yet prove that these profiles are optimal for human learning, VR cognition, societal use, or research validity. It does not establish that every canonical data facet is always appropriately exposed or hidden. Those choices remain testable and REOPENable through usability, classroom, VR, application, and research evidence.
