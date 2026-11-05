# FSP-ENCYCLOPEDIA-SHELL-1

## Encyclopedia Shell / Reader Architecture

Status: executable shell increment over the certified chapter↔Atlas navigation layer.

Baseline before this build:

- branch: `main`
- navigation certification commit: `ad5a5494483448a55dea82912305283d2158628a`
- regression baseline: 589/589 tests
- navigation authority: `src/research/encyclopediaNavigation.ts`
- canonical Atlas: `src/research/fiveCaseAtlasFixtures.ts`

## Reader contract

The shell implements the governed reader path:

`PROSE → CASE CARD → STATE TIMELINE → TRANSITION DETAIL → PROBE → SOURCE LEDGER → CLAIM CEILING → EXACT PROSE RETURN`

The shell is a projection of the certified routing map. It does not create new chapter↔case semantics.

Three constitutional constraints govern the implementation:

1. The certified routing map is the sole prose→Atlas semantic authority.
2. Canonical Atlas objects remain immutable; reader inspection receives clones.
3. Every deep inspection preserves an exact prose-return token containing chapter, section, anchor, scroll position, and route context.

## Contextual aperture

Entering from prose exposes only Atlas targets certified for that chapter section and case. A reader may explicitly enter full-case exploration, but this does not mutate the stored contextual route or return origin.

Source-ledger entries may also be opened as provenance descendants of the currently selected state, transition, or probe. The case claim ceiling is reachable as a canonical descendant from any valid case entry.

## Executable acceptance harness

`tests/unit/encyclopediaReaderShell.test.cjs` adds fourteen tests:

- six complete reader journeys:
  - Neptune/Vulcan from CH1.2
  - Foucault from CH1.3
  - Newton→Einstein meaning change from CH2.2
  - elevator controlled probe from CH3.3
  - DESI 2024→2026 from CH4.9
  - five-case claim-ceiling comparison from CH4.11
- eight adversarial failures:
  - invented prose route
  - counterfactual mutation leakage
  - chapter-top return substitution
  - unrelated provenance source
  - out-of-aperture canonical target
  - invented reverse route
  - full-case route contamination
  - unknown section/target

## Claim ceiling

Passing this build establishes that the reader shell can traverse the certified Encyclopedia/Atlas relationship while preserving route authority, provenance, counterfactual isolation, claim-ceiling reachability, and exact authorial return.

It does not yet certify visual design, browser interaction polish, mobile layout, accessibility implementation, or deployed GitHub Pages reader UI. Those belong to the next interface layer after this state/routing gate passes.
