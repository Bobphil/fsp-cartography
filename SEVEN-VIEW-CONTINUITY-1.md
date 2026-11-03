# SEVEN-VIEW-CONTINUITY-1

## Purpose

This build tests the seven-view FSP Cartography interaction architecture as one temporally extended inquiry rather than as seven individually functional screens.

The central question is:

> Does the technical map preserve the phenomenology and thin metaphysics of an unfolding Doing as the user moves through Start -> People -> Institution -> H/S/F -> Connections -> Investigate -> Return?

No new feature or kernel capability is introduced by this build.

## Thin-metaphysics continuity criteria

A successful journey should preserve the following through transitions.

### 1. Continuing identity

A person, institution, or claim remains the same mapped object as its relevance or interpretation changes.

H/S/F reassignment may alter relevance without replacing the object.

### 2. Phenomenal / epistemic differentiation

The map preserves the difference between:

- what another person reports;
- what the user infers;
- what is institutionally verified;
- what remains unknown;
- what is a practical constraint;
- what is merely a possible path.

No later view should erase those distinctions.

### 3. Situated temporality

H/S/F should allow inherited, situated, and forward relevance to coexist and change without becoming a chronology or prediction engine.

### 4. Connected Doing

Relations among agents and institutions may include practical power, authority, support, constraint, or no shared task.

The system must not manufacture agreement or cooperation.

### 5. Possibility without recommendation

Investigate may open paths and information-generating actions without ranking, forecasting, or selecting a life path for the user.

### 6. Authorial return

Return must be licensed by the map but remain the user's bounded judgment.

It should preserve uncertainty, claim ceilings, and REOPEN where appropriate.

### 7. Sparse-state legitimacy

A view may legitimately contain little or no content.

The architecture must not force institutions, paths, shared tasks, future projections, or conclusions merely because a seven-view sequence exists.

## Case 1 — Maya: inquiry becomes more differentiated

Start:
- formed task about which healthcare paths to investigate.

People:
- Maya represented as self;
- Mother represented as MY_MAP_OF_OTHER;
- Mother's report kept separate from Maya's inference about what Mother wants.

Institution:
- community college represented;
- a cost barrier is recorded as uncertain rather than prematurely hardened.

H/S/F:
- Mother's role may become H+S+F as family history, present influence, and future consequences become relevant;
- object identity remains stable.

Connections:
- Maya and Mother may have a bounded shared task around clarifying costs/training;
- agreement on a final profession remains outside scope.

Investigate:
- multiple healthcare possibilities remain unranked;
- next actions generate information.

Return:
- healthcare remains a serious direction;
- Maya is not choosing a final profession;
- claim ceiling limits the judgment to what to investigate next;
- REOPEN follows direct occupational exposure or verified financial information.

Expected continuity result: **PASS** if differentiation increases without convergence being manufactured.

## Case 2 — Leila: power is not authority

Start:
- formed task about educational paths if art/design is pursued.

People:
- Leila as self;
- Father as MY_MAP_OF_OTHER;
- Father's funding statement remains OTHER_REPORT.

Institution:
- college/funding context represented;
- funding condition is VERIFIED and HARD_CURRENTLY only within its stated scope.

H/S/F:
- Father's report and funding context can remain S+F because they affect the present decision and forward options;
- F must not become prediction.

Connections:
- Father's relation is PRACTICAL_POWER;
- no authority relation is inferred;
- no shared task may be identified.

Investigate:
- alternative financing and routes are explored as information-generating possibilities.

Return:
- current funding condition is a real constraint on one route;
- it does not authorize Father's choice of career;
- viability remains unresolved.

Expected continuity result: **PASS** if practical power survives without being upgraded to authority or moral legitimacy.

## Case 3 — Jordan: orientation may remain underformed

Start:
- task remains UNFORMED: education/work orientation.

People:
- Jordan as self;
- Brother's statement is OTHER_REPORT with historical relevance.

Institution:
- may remain empty.

H/S/F:
- Brother's experience may remain H;
- Jordan may remain S;
- F may remain sparse.

Connections:
- may remain empty;
- no shared task is required.

Investigate:
- information-generating visits/conversations may exist without formal paths.

Return:
- Jordan can know what to explore next while still not knowing a career.

Expected continuity result: **PASS** if the system supports movement without forcing task closure, future-path construction, or recommendation.

## View-transition audit

For each case the harness must visit all seven views in canonical order:

1. START
2. PEOPLE
3. INSTITUTION
4. HSF
5. CONNECTIONS
6. INVESTIGATE
7. RETURN

At every transition:

- state invariants must remain valid;
- current view must match the requested view;
- navigation itself must not change map version;
- prior mapped objects must remain available;
- sparse views are permitted.

## Cross-view continuity assertions

The harness should verify at minimum:

1. provenance survives from People into Return;
2. institution/constraint status survives into Investigate and Return;
3. H/S/F changes preserve object identity;
4. practical power remains distinct from authority;
5. NONE_IDENTIFIED shared task remains valid;
6. paths remain possibilities, not recommendations;
7. information-generating actions remain non-commitments;
8. Return references existing actions;
9. claim ceiling prevents overreach;
10. REOPEN preserves revisability where used;
11. UNFORMED task remains valid through the entire journey;
12. empty Institution/Connections/Paths remain valid for Jordan.

## Acceptance rule

The seven-view architecture passes only if all three cases complete the full sequence without:

- identity replacement;
- provenance collapse;
- stale H/S/F state;
- power/authority collapse;
- manufactured shared task;
- recommendation leakage;
- forced task formation;
- forced path creation;
- unbounded or finalizing Return.

A failure should be classified before any repair:

- **presentation failure**;
- **interaction-orchestration failure**;
- **state-model failure**;
- **continuity failure between otherwise valid local states**.

No repair is authorized merely because this harness discovers a failure. A new Change Gate must be earned if kernel semantics would need to change.
