# FSP-ECOSYSTEM-BRIDGE-1

## Canonical Object Model, Cross-Environment Projection Contract, and Return Architecture

**Status:** architecture freeze candidate  
**Purpose:** prevent the Encyclopedia, classroom systems, FSP-VR, societal applications, and research program from evolving into independently defined versions of FSP.

The bridge establishes one governing proposition:

> **One canonical inquiry architecture may have many projections. Projection multiplicity does not imply semantic multiplicity.**

The environments may differ radically in presentation, interaction, scaffolding, embodiment, domain metadata, and evaluation. They may not silently rewrite the canonical object from which they project.

## 1. Two layers of objects

### Canonical inquiry objects

Semantic authority remains in the existing inquiry layer:

- Case
- Inquiry state
- Transition
- Controlled revision probe
- Source
- Claim ceiling

These objects carry the historical/inquiry identity that must survive projection.

### Explanatory and operational overlays

The public architecture already defines:

- Concepts
- Tools

These are portable overlays. A concept explains a canonical object. A tool defines an operation over it. Neither becomes new historical evidence merely because it appears in a classroom, VR environment, or application.

This distinction prevents a future teaching prompt, immersive scene, or application workflow from quietly becoming a competing ontology.

## 2. Five projection environments

### Encyclopedia — explain and inspect

Primary task: understand an inquiry while preserving readable philosophical narrative.

The Encyclopedia may:
- progressively disclose;
- translate field names into ordinary language;
- open timelines, probes, provenance, and claim ceilings;
- preserve contextual apertures.

It may not invent new chapter↔Atlas semantics or strengthen claims.

### Classroom — learn and practice

Primary task: practice bounded inquiry operations and produce learner-authored work.

The classroom may:
- scaffold;
- sequence difficulty;
- simplify notation;
- attach learning objectives, attempts, rubrics, and feedback.

It may not:
- alter canonical evidence;
- silently supply the learner's final judgment;
- convert pedagogical simplification into historical fact.

Return is to learner authorship: claim, reason, uncertainty, and REOPEN.

### VR — decompress and rehearse

Primary task: make relations, perspectives, temporal changes, and bounded possibility spaces experientially navigable.

VR may:
- spatialize relations;
- slow or replay transitions;
- let users inhabit perspectives;
- stage controlled counterfactual manipulation;
- fade scaffolding.

VR may not:
- turn spatial closeness into conceptual identity;
- invent causal or historical relations;
- hide simulation status;
- treat immersion or salience as evidence.

Return is an explicit debrief into human judgment.

### Application — support real Doing

Primary task: support real-world inquiry, coordination, or intervention while preserving domain-native authority and responsibility.

Applications may:
- bind domain-native vocabulary;
- add institutional constraints;
- encode permissions, governance, contestation, and appeals;
- represent live operational state.

Applications may not:
- inherit authority merely because FSP represents a problem;
- convert generated possibility into recommendation or authorization;
- erase affected persons' standing;
- substitute the FSP representation for the domain itself.

Return is to the actual people, institutions, practices, and decisions whose Doing is at stake.

### Research — evaluate and falsify

Primary task: test whether FSP projections preserve fidelity and improve bounded inquiry.

Research may:
- instrument interactions;
- compare conditions;
- measure transfer;
- define failure thresholds.

Research may not:
- treat usability as truth;
- treat performance gains as normative authorization;
- hide negative results;
- change the canonical object between conditions.

Return is evidence for revising, limiting, or retaining the architecture.

## 3. The projection contract

A projection binding contains:

```text
projection_id
environment
canonical_object_ref
concept/tool overlays
purpose
presentation
permitted operations
omitted-by-default material
added environment metadata
return contract
claim-ceiling policy
```

The canonical object is resolved independently of the projection. A deterministic canonical fingerprint is then attached to the projected object.

Environment-specific metadata does **not** enter that fingerprint.

Therefore:

```text
canonical object
      │
      ├── Encyclopedia presentation
      ├── Classroom scaffolding
      ├── VR spatialization
      ├── Application domain binding
      └── Research instrumentation
```

must still resolve to one canonical identity.

## 4. Projection versus semantic mutation

Allowed changes include:

- language level;
- layout;
- modality;
- spatial position;
- interaction affordances;
- educational scaffolding;
- domain-native metadata;
- experimental instrumentation.

Forbidden silent changes include:

- canonical ID;
- canonical evidence;
- historical transition structure;
- source identity;
- probe status;
- claim ceiling.

If an environment genuinely discovers that the canonical representation is inadequate, the correct operation is **REOPEN the canonical object**, not patch only the projection.

## 5. Cross-environment return contract

Each environment carries an `EcosystemReturnToken`:

```text
environment
origin_id
origin_label
depth_or_mode
context[]
```

Return semantics differ by environment while preserving the same constitutional role.

- Encyclopedia → exact prose/public context.
- Classroom → learner-authored judgment.
- VR → explicit debrief and re-entry to non-immersive judgment.
- Application → real people/institutions/practices and their decision authority.
- Research → architecture revision or limitation.

**Return is not merely navigation. It is the restoration of human authorship and domain responsibility after representational or computational assistance.**

## 6. First cross-environment regression object

The first bridge test uses one already-certified canonical object:

`NEPTUNE-VULCAN / NV-PROBE-VULCAN`

Five bindings are defined for the same probe:

1. Encyclopedia inspection.
2. Classroom revision exercise.
3. VR controlled-revision space.
4. Societal-application transfer pattern.
5. Research fidelity condition.

All five must retain the same canonical fingerprint and applicable canonical claim ceiling.

This is deliberately a severe constraint. If the VR scene, classroom exercise, or application analogy requires changing the historical/canonical probe, that change must become a canonical REOPEN rather than an environment-local rewrite.

## 7. Constitutional firewalls

The bridge freezes:

1. One canonical inquiry object may have many projections; projection multiplicity does not imply semantic multiplicity.
2. Projection may change presentation, interaction, scaffolding, and domain-native metadata, but may not silently change canonical identity, provenance, transition history, or claim ceiling.
3. Concept and tool overlays explain or operationalize canonical material; they do not become new historical evidence.
4. Counterfactual and simulated states remain explicitly marked as possibilities unless independently represented as canonical history.
5. Application projections may bind domain-native authority and governance, but FSP does not inherit that authority merely by representing it.
6. Every environment must preserve a return path from representation or operation to human-authored judgment in the originating Doing.
7. Research evaluates projections and transfer; it does not certify the FSP ontology as unique or exhaustive.

## 8. Consequence for the next builds

The Encyclopedia and VR can now develop in parallel without becoming independent architectures.

The next builds should inherit this bridge:

- **FSP-RELATION-GRAPH-1** — explicit graph connecting canonical objects, overlays, projections, classes, VR experiences, applications, and research tests.
- **FSP-PROJECTION-PROFILES-1** — production-level transformation rules for each environment.
- **FSP-CLASS-BRIDGE-1** — bind existing curriculum/workbook/output-card structures to canonical objects.
- **FSP-VR-BRIDGE-1** — bind states, transitions, probes, perspective and return to VR primitives.
- **FSP-APPLICATION-PROFILES-1** — test strong domain-native differences without universalizing one application schema.
- **FSP-ECOSYSTEM-REGRESSION-1** — require multiple canonical objects, including harder human/institutional cases, to survive all projections without semantic drift.

## 9. Claim ceiling

This bridge establishes a governance architecture for cross-environment identity and projection.

It does **not** prove that the current FSP canonical object model is unique, exhaustive, or universally adequate. It does not license societal intervention merely because an application projection can represent one. It does not establish that VR improves inquiry merely because a canonical object can be spatialized.

Those are REOPENable empirical and philosophical questions for subsequent builds.
