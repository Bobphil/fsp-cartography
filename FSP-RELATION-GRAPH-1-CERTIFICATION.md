# FSP-RELATION-GRAPH-1 — Certification

Status: PASS

## Certified implementation

- Repository: `Bobphil/fsp-cartography`
- Branch: `main`
- Relation graph implementation commit: `3a95ac1974a77e27571286df79db1fdc965ac750`
- Regression run: `42144906000`
- Deterministic regression suite: 670/670 PASS
- Browser TypeScript compilation: PASS
- Pages build run: `42144905753`
- Pages build / bundle / artifact upload: PASS

## Certified graph role

The relation graph is a governed connective layer over already-certified authorities.

It does not replace:

- the Five-Case Atlas;
- certified chapter↔Atlas navigation;
- the public Encyclopedia architecture;
- FSP-ECOSYSTEM-BRIDGE-1.

Its role is to make declared relations explicit, typed, traversable, and inspectable across those layers.

## Certified node families

The graph contains:

- Chapter
- Section
- Case
- State
- Transition
- Probe
- Source
- Claim ceiling
- Concept
- Tool
- Encyclopedia view
- Classroom exercise
- VR experience
- Application profile
- Research test

Canonical inquiry nodes retain deterministic canonical fingerprints.

Projection nodes remain projections and do not acquire competing canonical payloads.

## Certified relation vocabulary

- CONTAINS
- ROUTES_TO
- ILLUSTRATES
- EXPLAINS
- OPERATIONALIZES
- SUPPORTED_BY
- BOUNDED_BY
- PROJECTS_AS
- USES_CONCEPT
- USES_TOOL
- PRACTICED_AS
- SPATIALIZED_AS
- TRANSFERRED_AS
- EVALUATED_BY
- RETURNS_TOWARD

Each edge declares:

- source node;
- target node;
- relation type;
- semantic class;
- authority;
- rationale;
- directionality.

## Certified authorities

Edges distinguish their source authority:

- CANONICAL_ATLAS
- CERTIFIED_NAVIGATION
- PUBLIC_ARCHITECTURE
- ECOSYSTEM_BRIDGE
- PROGRAM_SPEC

Graph consumers may therefore distinguish a canonical evidential edge from a public explanatory edge or an ecosystem projection edge.

## Navigation preservation

Every certified chapter-navigation target is represented by exactly one governed `ROUTES_TO` edge.

CH1.2 remains exactly bound to:

- NV0-NV1
- NV1-NV2
- NV3-NV4
- NV-PROBE-VULCAN
- NEPTUNE-VULCAN case claim ceiling

No additional Chapter 1 Atlas route is licensed by graph adjacency.

## Cross-environment hub

`NEPTUNE-VULCAN / NV-PROBE-VULCAN` is the first fully connected ecosystem hub.

It has governed projection relations to:

- Encyclopedia view
- Classroom exercise
- VR experience
- Application profile
- Research test

The specialized relations remain distinct:

- PRACTICED_AS
- SPATIALIZED_AS
- TRANSFERRED_AS
- EVALUATED_BY

This prevents a generic projection relation from erasing the different human and governance meanings of each environment.

## Query discipline

Graph traversal fails closed unless the caller supplies explicit allowed relation types.

This is constitutional.

A consumer may not ask for unconstrained graph reachability and treat every reachable node as semantically licensed.

Examples:

- Encyclopedia may traverse `ROUTES_TO`, `EXPLAINS`, `ILLUSTRATES`, `SUPPORTED_BY`, and `BOUNDED_BY`.
- Classroom systems may traverse `PRACTICED_AS`, `USES_TOOL`, `USES_CONCEPT`, and governed return edges.
- VR may traverse `SPATIALIZED_AS`, `USES_TOOL`, `USES_CONCEPT`, and governed return edges.
- Application profiles may traverse `TRANSFERRED_AS` plus explicitly declared overlays.
- Research may traverse `EVALUATED_BY` and `PROJECTS_AS`.

## Constitutional firewalls

1. Graph adjacency is not identity, causation, evidential support, recommendation, or authorization unless the typed edge explicitly says so.
2. Canonical Atlas identity and payload remain upstream of graph representation.
3. Certified chapter routing may be represented by ROUTES_TO edges but may not be expanded by inference from neighboring graph nodes.
4. Concept and tool edges are explanatory or operational overlays, not new historical evidence.
5. Projection nodes inherit canonical identity through PROJECTS_AS and must not alter the canonical fingerprint.
6. Transfer edges identify a candidate structural analogy or application profile; they do not authorize action in the target domain.
7. Research edges evaluate a representation, interaction, or transfer claim; they do not certify the FSP ontology.
8. Every graph consumer must declare the relation types it is permitted to traverse.
9. Return relations restore the originating human or domain context; they are not equivalent to semantic reverse edges.

## Claim ceiling

FSP-RELATION-GRAPH-1 certifies a governed graph over existing canonical, public, and ecosystem relationships.

It does not establish that all philosophically important relations are graph-representable. It does not license automatic semantic inference by path composition. It does not yet encode all course activities, VR scenes, societal application profiles, or research protocols.

New relation types and large-scale graph packages remain REOPENable and regression-governed.
