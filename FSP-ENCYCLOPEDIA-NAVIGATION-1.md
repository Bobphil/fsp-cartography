# FSP ENCYCLOPEDIA NAVIGATION LAYER

## Chapter ↔ Atlas Routing for the Four-Chapter Sequence and Five-Case Atlas

**Status:** Canonical navigation bridge between philosophical narrative and formal dossier architecture.

## 1. Purpose

The four-chapter sequence and Five-Case Atlas are paired canonical encyclopedia assets.

The chapters provide narrative development.

The Atlas provides formal states, transitions, controlled probes, source ledgers, and claim ceilings.

This navigation layer binds them.

The routing relation is:

[
	ext{Chapter Section}
leftrightarrow
	ext{Atlas State / Transition / Probe / Source / Claim Ceiling}.
]

The mapping is bidirectional.

A reader should be able to move from a paragraph-level philosophical discussion into the formal dossier and back again.

## 2. Stable chapter IDs

- `CH1-DUHEM-QUINE`
- `CH2-KUHN-MEANING`
- `CH3-THOUGHT-EXPERIMENTS`
- `CH4-DIACHRONIC-FORMALISM`

Each chapter section has a stable section ID such as:

- `CH1.2`
- `CH2.5`
- `CH3.7`
- `CH4.11`

These IDs are designed for reuse in:

- Pressbooks links;
- web encyclopedia routing;
- VR scene entry/return;
- source popovers;
- controlled-probe launches;
- reverse navigation from formal objects to prose.

## 3. Navigation target types

A narrative section can point to:

### STATE

A time-indexed inquiry state such as:

`D2`

for the July 2026 DESI inquiry state.

### TRANSITION

A diachronic change such as:

`NV3-NV4`

for Vulcan failure to deeper framework revision.

### PROBE

A controlled-revision space such as:

`RE-PROBE-ELEVATOR`.

### SOURCE

A source-ledger entry such as:

`GALILEO-SEP`.

### CASE_CLAIM_CEILING

The bounded conclusion for an entire dossier.

## 4. Chapter One routing

### CH1.1 — A Failed Prediction Does Not Name Its Culprit

Routes to:

- Foucault state F0;
- Neptune/Vulcan state NV0;
- Neptune controlled probe.

This section therefore begins with underdetermination before a revision target is selected.

### CH1.2 — Neptune and Vulcan

Routes to:

- NV0→NV1;
- NV1→NV2;
- NV3→NV4;
- Vulcan controlled probe;
- Neptune/Vulcan case claim ceiling.

The reader can move from prose about successful and failed repair directly to the encoded transition history.

### CH1.3 — Foucault

Routes to:

- F0→F1;
- F1→F2;
- Foucault controlled probe;
- Foucault source entry.

### CH1.4 — Galileo

Routes to:

- G1;
- G1→G2;
- G2→G3.

### CH1.5 — DESI

Routes to:

- D0;
- D0→D1;
- D1→D2;
- DESI case claim ceiling.

## 5. Chapter Two routing

Chapter Two emphasizes meaning change, translation, and genealogy.

Its routes therefore privilege:

- Newton→Einstein state/transition objects;
- Galileo conceptual transitions;
- Foucault historical-semantic caution;
- DESI model-language probes;
- claim ceilings where semantic continuity must be bounded.

The navigation layer makes visible that:

[
	ext{same case}
]

can support different philosophical tasks in different chapters.

For example, Foucault is used in Chapter One for underdetermination and in Chapter Two for historical meaning change.

## 6. Chapter Three routing

Chapter Three maps narrative sections primarily to controlled probes.

Examples:

- Galileo → `G-PROBE-TELESCOPE`;
- Einstein → `RE-PROBE-ELEVATOR`;
- Neptune/Vulcan → `NV-PROBE-NEPTUNE` and `NV-PROBE-VULCAN`;
- Foucault → pre-experiment state plus material transition;
- DESI → combination/full-shape probes.

The perturbation-grammar and VR sections route to probes across all five dossiers.

This gives the eventual VR layer an immediate formal handoff target.

## 7. Chapter Four routing

Chapter Four is the formal integration chapter.

It therefore routes directly to:

- inquiry states across all cases;
- transition vectors across all cases;
- controlled probes;
- case-level claim ceilings.

The chapter becomes a narrative index over the Atlas.

## 8. Reverse navigation

The navigation layer is explicitly bidirectional.

Given an Atlas target such as:

`DESI-2024-2026 / TRANSITION / D1-D2`

the system can return all chapter sections that use that target.

This matters because one formal object may support several narrative purposes.

For example:

`RE0-RE1`

may support:

- Kuhnian meaning change;
- translation analysis;
- unified diachronic formalism.

The target is not duplicated.

The narrative uses are linked to one canonical object.

## 9. No duplication rule

The encyclopedia should avoid copying formal content into every chapter.

Instead:

[
	ext{one canonical Atlas object}
ightarrow
	ext{many narrative routes}.
]

This keeps:

- source provenance stable;
- claim ceilings consistent;
- future corrections local;
- VR and Pressbooks navigation synchronized.

## 10. Navigation firewalls

Routing does not imply equivalence.

A section linked to an Atlas state does not mean that the entire section is reducible to that state.

A source link does not mean that one source exhausts the historiography.

A probe link does not mean that the historical event itself was literally a thought experiment.

The layer is navigational.

It is not an ontological reduction.

## 11. Acceptance criteria

The navigation layer passes only if:

1. all four chapters are represented;
2. every chapter section has at least one navigation binding;
3. every target resolves to a valid Atlas object;
4. reverse navigation works;
5. no binding references an unknown case;
6. no state/transition/probe/source target is fabricated;
7. chapter sections may reuse canonical objects without duplicating them;
8. claim ceilings remain case-specific.

## 12. Encyclopedia role

The resulting architecture is:

[
	ext{Narrative Chapter}
ightarrow
	ext{Section}
ightarrow
	ext{Canonical Atlas Object}
ightarrow
	ext{Source / Probe / Claim Ceiling}
]

and back again:

[
	ext{Atlas Object}
ightarrow
	ext{Narrative Uses}.
]

This is the first true navigation layer of the FSP encyclopedia.
