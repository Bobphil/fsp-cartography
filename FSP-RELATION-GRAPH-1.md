# FSP-RELATION-GRAPH-1

## Governed Cross-Environment Relation Graph

**Status:** architecture freeze candidate  
**Inherited authorities:** Five-Case Atlas; certified chapter↔Atlas navigation; public Encyclopedia architecture; FSP-ECOSYSTEM-BRIDGE-1.

This build makes the connective tissue of the FSP ecosystem explicit as a typed, authority-aware graph.

The governing rule is:

> **A graph is a map of declared relations, not a machine for manufacturing undeclared ones.**

A node being near, reachable from, or connected to another node does not by itself establish identity, causation, evidential support, recommendation, authorization, or historical equivalence.

## 1. Node families

The graph contains:

### Encyclopedia structure
- Chapter
- Section

### Canonical inquiry
- Case
- State
- Transition
- Probe
- Source
- Claim ceiling

### Public overlays
- Concept
- Tool

### Cross-environment projections
- Encyclopedia view
- Classroom exercise
- VR experience
- Application profile
- Research test

Canonical inquiry nodes retain a deterministic fingerprint of the upstream Atlas object.

Projection nodes do not receive their own competing canonical payload.

## 2. Typed relations

The initial graph vocabulary is:

- **CONTAINS** — structural membership.
- **ROUTES_TO** — certified chapter/section navigation into the Atlas.
- **ILLUSTRATES** — a canonical case illustrates a public concept.
- **EXPLAINS** — a concept explains a canonical case.
- **OPERATIONALIZES** — a public tool can be used to inspect a case.
- **SUPPORTED_BY** — an Atlas object explicitly cites a canonical source.
- **BOUNDED_BY** — a case is bounded by its canonical claim ceiling.
- **PROJECTS_AS** — a canonical object is projected into an ecosystem environment.
- **USES_CONCEPT** — a projection explicitly uses a concept overlay.
- **USES_TOOL** — a projection explicitly uses a tool overlay.
- **PRACTICED_AS** — a canonical object becomes a classroom exercise.
- **SPATIALIZED_AS** — a canonical object becomes a VR experience.
- **TRANSFERRED_AS** — a canonical object is used as a bounded structural transfer pattern in an application profile.
- **EVALUATED_BY** — a canonical object/projection is used in a research fidelity test.
- **RETURNS_TOWARD** — a projection declares its human/domain return direction.

These relation names are deliberately narrower than generic terms such as “related to.”

## 3. Edge authority

Every edge declares the contract that authorizes it:

- **CANONICAL_ATLAS**
- **CERTIFIED_NAVIGATION**
- **PUBLIC_ARCHITECTURE**
- **ECOSYSTEM_BRIDGE**
- **PROGRAM_SPEC**

This lets downstream consumers distinguish, for example, a source edge inherited from a dossier from a concept edge introduced for public explanation.

An edge also declares its semantic class:

- structural
- navigation
- evidential
- explanatory
- operational
- boundary
- projection
- transfer
- evaluative
- return

Authority and semantics travel with the edge.

## 4. No graph-induced semantic inflation

The graph freezes several firewalls.

### Adjacency firewall

```text
A --edge--> B
```

means only what the edge type says.

It does not license arbitrary composition such as:

```text
A explains B
B is supported by C
therefore A is supported by C
```

unless a later governed rule explicitly defines and validates that inference.

### Navigation firewall

A section's neighboring case, concept, or tool nodes do not create new chapter→Atlas routes.

Only `ROUTES_TO` edges derived from the certified navigation contract have that authority.

### Projection firewall

A VR, classroom, application, or research node does not become another canonical object.

Its identity is:

```text
canonical object
    ↓ PROJECTS_AS
environment projection
```

not:

```text
canonical object = projection
```

### Transfer firewall

`TRANSFERRED_AS` means “use this as a bounded structural pattern for comparison.”

It does not mean “apply the historical solution,” “recommend this intervention,” or “authorize this action.”

## 5. First executable ecosystem graph

The graph is generated from existing certified sources rather than manually duplicating their relationships.

### From the Atlas

For each dossier it creates:

```text
CASE
 ├─ CONTAINS → STATE
 ├─ CONTAINS → TRANSITION
 ├─ CONTAINS → PROBE
 ├─ CONTAINS → SOURCE
 └─ BOUNDED_BY → CLAIM_CEILING
```

State and transition source declarations become `SUPPORTED_BY` edges.

### From chapter navigation

Every existing navigation target becomes exactly one `ROUTES_TO` edge.

For CH1.2 this means:

```text
CH1.2
 ├─ ROUTES_TO → NV0-NV1
 ├─ ROUTES_TO → NV1-NV2
 ├─ ROUTES_TO → NV3-NV4
 ├─ ROUTES_TO → NV-PROBE-VULCAN
 └─ ROUTES_TO → NEPTUNE-VULCAN claim ceiling
```

No additional CH1.2 Atlas edges are inferred.

### From the public architecture

Concepts and tools are represented as overlays onto the cases for which the certified public architecture declares them relevant.

### From the ecosystem bridge

The Vulcan probe becomes the first full cross-environment hub:

```text
NV-PROBE-VULCAN
 ├─ PROJECTS_AS / Encyclopedia
 ├─ PRACTICED_AS / Classroom
 ├─ SPATIALIZED_AS / VR
 ├─ TRANSFERRED_AS / Application
 └─ EVALUATED_BY / Research
```

Each projection then connects only to the concepts and tools explicitly named in its certified binding.

## 6. Query discipline

Consumers do not get an unrestricted “neighbors” operation as the primary interface.

Traversal requires an explicit list of relation types.

Examples:

### Encyclopedia

```text
ROUTES_TO
EXPLAINS
ILLUSTRATES
SUPPORTED_BY
BOUNDED_BY
```

### Classroom sequencing

```text
PRACTICED_AS
USES_TOOL
USES_CONCEPT
RETURNS_TOWARD
```

### VR

```text
SPATIALIZED_AS
USES_CONCEPT
USES_TOOL
RETURNS_TOWARD
```

### Application

```text
TRANSFERRED_AS
USES_TOOL
USES_CONCEPT
```

### Research

```text
EVALUATED_BY
PROJECTS_AS
```

This makes traversal itself governed rather than treating graph reachability as semantic permission.

## 7. Environment subgraphs

The graph supports extracting an environment-specific local subgraph.

For example, the first VR subgraph contains:

- the canonical Vulcan probe;
- the VR projection of that probe;
- the controlled-revision concept;
- the controlled-revision tool.

This gives FSP-VR a clean way to request only the semantic neighborhood it needs for a scene without importing the entire Encyclopedia or classroom architecture.

## 8. Relationship to future classes and applications

This build creates the graph vocabulary and the first concrete classroom/VR/application/research nodes from the ecosystem bridge.

It does not yet encode every existing Ethics, Philosophy of Science, history, or inquiry exercise.

The next class/application builds can add new projection nodes **without inventing new relation semantics** unless a regression-tested vocabulary extension is required.

A future course sequence might therefore be represented as:

```text
CANONICAL CASE
   ↓ PRACTICED_AS
CLASSROOM EXERCISE
   ↓ USES_TOOL
FSP TOOL
   ↓
STUDENT OUTPUT / RETURN
```

while a VR sequence might be:

```text
CANONICAL TRANSITION
   ↓ SPATIALIZED_AS
VR EXPERIENCE
   ↓ USES_CONCEPT
CONCEPT
   ↓ RETURNS_TOWARD
HUMAN DEBRIEF
```

The graph is connective tissue, not the learner, participant, or institution.

## 9. Constitutional rules

1. Graph adjacency is not identity, causation, evidential support, recommendation, or authorization unless the typed edge explicitly says so.
2. Canonical Atlas identity and payload remain upstream of graph representation.
3. Certified chapter routing may be represented by ROUTES_TO edges but may not be expanded by inference from neighboring graph nodes.
4. Concept and tool edges are explanatory or operational overlays, not new historical evidence.
5. Projection nodes inherit canonical identity through PROJECTS_AS and must not alter the canonical fingerprint.
6. Transfer edges identify a candidate structural analogy or application profile; they do not authorize action in the target domain.
7. Research edges evaluate a representation, interaction, or transfer claim; they do not certify the FSP ontology.
8. Every graph consumer must declare the relation types it is permitted to traverse.
9. Return relations restore the originating human or domain context; they are not equivalent to semantic reverse edges.

## 10. Claim ceiling

FSP-RELATION-GRAPH-1 establishes an explicit governed graph over already-certified relationships and the first ecosystem projections.

It does not prove that all philosophically important relations are graph-representable. It does not license automatic inference by graph composition. It does not yet encode every course activity, VR scene, social application, or research protocol.

New relation types and large-scale projection packages remain subject to REOPEN and regression.
