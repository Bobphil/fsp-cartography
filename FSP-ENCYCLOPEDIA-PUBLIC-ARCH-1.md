# FSP-ENCYCLOPEDIA-PUBLIC-ARCH-1

## Public Reader Expansion Architecture

**Status:** architecture freeze candidate  
**Scope:** public information architecture only  
**Inherited semantic authorities:** Five-Case Atlas, certified chapter↔Atlas navigation, certified Reader Shell, certified human-facing reader interface

This build defines the public face of the FSP Encyclopedia before substantial polishing of CH1.2 or production of the remaining chapter pages. Its purpose is to ensure that future prose, visual design, concept explanations, comparison views, and deeper formal material all have a stable place without creating a second ontology beside the already-certified Atlas.

## 1. Public architecture

The public system is organized as:

```text
HOME
├── FOUR-CHAPTER SEQUENCE
│   └── prose section
│       └── certified case aperture
├── FIVE-CASE ATLAS
│   └── canonical states / transitions / probes / sources / ceilings
├── CONCEPTS
├── TOOLS
├── SOURCES
└── COMPARISONS
```

Every deep path preserves **Return** to the public object that made the inspection relevant.

The public architecture is an indexing and explanatory layer. It does not redefine canonical state fields, transition semantics, source identity, claim ceilings, or chapter↔Atlas routing.

## 2. Home page

The future Encyclopedia home page has five primary entrances:

1. **Read the argument** — enter the four chapters in sequence.
2. **Enter through a case** — Foucault, Neptune/Vulcan, Galileo, Newton→Einstein, or DESI 2024–2026.
3. **Look up a concept** — e.g. underdetermination, meaning change, provenance, claim ceiling, REOPEN.
4. **Use a tool** — e.g. revision-target audit, controlled-revision probe, provenance audit.
5. **Compare** — follow one inquiry function across multiple cases.

The home page is therefore an orientation surface, not a dashboard that exposes the entire formalism at once.

## 3. Four-chapter sequence

The chapter sequence remains:

1. **Duhem–Quine: Where Should Revision Pressure Go?**
2. **Kuhn and Meaning Change: When the Vocabulary Moves Too**
3. **Thought Experiments as Controlled Revision Spaces**
4. **FSP's Unified Diachronic Inquiry Formalism**

Each public chapter points to the existing canonical `ChapterId` and existing section IDs. Section-to-Atlas semantics remain governed exclusively by `encyclopediaNavigation.ts`.

The public chapter object may describe:
- the question the chapter asks;
- what the reader should gain;
- featured cases;
- concepts especially useful there;
- tools especially useful there.

It may not manufacture state, transition, probe, or source routes.

## 4. Five-case Atlas

The five public case entrances are projections of the already-certified dossiers:

- Foucault and light speed
- Neptune and Vulcan
- Galileo and the Copernican controversy
- Newton to Einstein
- DESI 2024–2026

A public case page answers four questions before formal detail:

**What is the case? Why does it matter here? Where does it appear in the four chapters? What can I inspect?**

Its deeper inspection still resolves to canonical Atlas objects.

## 5. Concept layer

A **concept card** explains what an idea means and why it matters. Concepts are explanatory overlays, not evidence-bearing historical claims.

The first public concept library is frozen at:

- Underdetermination
- Auxiliary hypothesis
- Meaning change
- Controlled revision
- Provenance
- Standing
- Historical sedimentation
- Remainder
- Claim ceiling
- REOPEN
- Diachronic inquiry

Each concept declares:
- short public definition;
- what it helps explain;
- chapters in which it matters;
- cases that illustrate it;
- related concepts;
- tools that operationalize it.

## 6. Tool layer

A **tool card** explains an operation a reader can perform. This is deliberately distinct from a concept card.

The initial public tool rack is:

- Revision-target audit
- Transition audit
- Controlled-revision probe
- Provenance audit
- Translation-and-remainder audit
- Standing and power audit
- Claim-ceiling check
- Diachronic comparison
- Authorial return

Every tool has a plain-language reader prompt. A tool can point toward canonical cases and concepts, but it cannot alter their semantic content.

## 7. Source layer

Sources remain governed by each `CanonicalCaseDossier.sourceLedger`.

Public source pages should answer:

**What is this source? Which represented claim or object does it support? What role does it play in the inference? What does it not establish by itself?**

The public source layer may improve explanation, citation formatting, and discoverability. It may not silently substitute a generic bibliography for claim-level provenance.

## 8. Comparison paths

Comparison is a first-class public entrance rather than a late appendix.

The initial paths are:

- **Where revision pressure goes** — Neptune/Vulcan, Foucault, DESI.
- **Meaning across frameworks** — Galileo, Newton→Einstein, Foucault.
- **Controlled revision across five cases** — all five cases.
- **Standing, authority, and constraint** — Galileo and DESI.
- **Five case-specific claim ceilings** — all five cases.

A comparison path declares its cases, concepts, tools, relevant chapters, and minimum reader depth. It does not contain independent state IDs. Canonical case comparison must resolve through the Atlas.

**Shared representation ≠ historical sameness.**

## 9. Three reader depths

The public Encyclopedia uses progressive disclosure rather than separate novice and expert sites.

### Read

The reader sees:
- prose;
- case cards;
- concept definitions;
- plain-language claim ceilings;
- return to reading.

Formal field codes and matrices remain hidden.

### Inspect

The reader additionally sees:
- state timelines;
- transition detail;
- controlled probes;
- source support;
- tool cards;
- comparison paths.

This is the default depth for the present Neptune/Vulcan pilot.

### Formal

The reader may additionally expose:
- canonical field labels;
- transition dimensions;
- formal comparison rows;
- invariants and explicit formal claim ceilings.

Depth changes **presentation density**, never canonical object identity or inferential strength.

## 10. Return architecture

Return is constitutional at the public level just as it is inside the Reader Shell.

A deep inspection preserves:
- origin public object;
- section/anchor where applicable;
- reader depth;
- comparison context if applicable;
- navigation history.

Therefore:

```text
CHAPTER → CASE → PROBE → SOURCE → CEILING → RETURN
```

returns to the originating chapter context.

And:

```text
COMPARISON → CASE → TRANSITION → SOURCE → RETURN
```

returns to the comparison, not to a generic case page.

The formal layer should decompress the inquiry and then return the reader to the question that made decomposition useful.

## 11. Constitutional rules

The public architecture freezes these rules:

1. Public architecture indexes and explains canonical objects; it does not redefine Atlas field semantics.
2. Chapter-to-Atlas semantic edges remain governed by `encyclopediaNavigation.ts`.
3. Concept and tool links are explanatory overlays, not new evidence or historical claims.
4. Reader depth changes presentation density, not canonical object identity or claim strength.
5. Shared comparison grammar does not imply historical sameness.
6. Counterfactual probe output remains distinct from sourced historical actuality.
7. Every public path that deepens inspection preserves an Authorial Return route.
8. No public presentation may exceed the applicable canonical claim ceiling.

## 11.1 Four-Move Governance Overlay

The public architecture now inherits the preferred governance compression without replacing the existing reader route.

```text
PORTABILITY
→ CEILING
→ AUTHORIZATION
→ RETURN
↺

REMAINDER VISIBLE THROUGHOUT
```

At public depth these appear as ordinary-language questions:

1. **Will it still hold here?**
2. **What does it actually justify?**
3. **Who may act?**
4. **What happened, and what should reopen?**
5. **What did not cross or remains unresolved?**

The overlay maps onto the existing public architecture:

- transition detail → Portability;
- claim-ceiling view → Ceiling;
- standing / decision / authority context → Authorization;
- state change / return path → Return;
- source ledger / unresolved field → Remainder.

No new canonical route is created.

## 11.2 Research Navigation Reclassification

The Research entrance should distinguish four classes:

```text
RESEARCH
├── Governance Core
├── Comparators
├── Domain Architectures
└── Completion Horizon
```

**Governance Core** contains Four-Move Governance, Constitutional Compression, Recomposition, Return, and Remainder.

**Comparators** contains Simon, Brandom, Price, Ismael, Nagel, Levin, Quine/Putnam, and later external comparators.

**Domain Architectures** contains Objective Phenomenology, Heterogeneous Intelligence, Recursive Scale, Ontological Interoperability, Transformation, Medicine, Institutions, AI, and later research programmes.

**Completion Horizon** contains research about progressive integration, open remainders, successor architectures, and criteria for comprehensive synthesis.

The Completion Horizon is research-facing. It must not imply present theoretical completeness.

> **Present architectural sufficiency ≠ present theoretical completeness.**

## 12. Production consequence

With this architecture frozen, CH1.2 can later be polished without having to carry every explanation inside its prose. A sentence can remain readable while exposing structured routes to:

```text
concept → tool → case object → source → claim ceiling → return
```

The same architecture can then be used for all four chapters and all five dossiers.

The next production step after certification should be a **public shell implementation**, not immediate prose expansion: Home + chapter index + case index + concept/tool index + comparison index, all linking to the already-running CH1.2 pilot as the first complete vertical slice.

## 2.1 Full-stack public orientation essay

The public `What is FSP?` entrance now contains a long-form narrative route owned by `FSP-ENCYCLOPEDIA-FULL-STACK-ESSAY-1.md`.

Its function is to connect the technical architecture to its broader human purpose:

`situated experience → inquiry → specialization → translation → pluralistic cooperation → capability / authorization → action → consequence → flourishing-oriented Return`

The preferred public case apertures are:
1. **Medicine / public health** — evidence, population-to-person translation, authorization, consequence.
2. **Cross-disciplinary science** — portability without totalization.
3. **Aesthetics / cultural difference** — plural maps without forced closure.
4. **Maathai** — cooperation without convergence, bounded shared tasks, capability accumulation.

These are explanatory apertures, not new canonical case dossiers. Where canonical case objects exist, deeper navigation must resolve to them; otherwise the essay remains an orientation example with an explicit claim ceiling.

Reader-depth behavior:
- **Read:** continuous essay and four human examples.
- **Inspect:** expose concepts, firewalls, Joint Task Spaces, Cooperation Without Convergence, Dark Coherence, Capability ≠ Authorization, Return, and REOPEN.
- **Formal:** route to the relevant constitutional and executable owners.
