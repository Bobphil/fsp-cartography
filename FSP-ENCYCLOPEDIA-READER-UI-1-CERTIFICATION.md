# FSP-ENCYCLOPEDIA-READER-UI-1 — Certification

Status: PASS

## Certified implementation

- Repository: `Bobphil/fsp-cartography`
- Branch: `main`
- Interface implementation commit: `f39a7d0ee068806006194bd88d9b232f67dd5c8f`
- Corrective compile-fix commit: `2992e5d586640eea3086e01a33f41987a363c1e9`
- Passing GitHub Actions run: `42098705097`
- Workflow: `CODE-0.1 regression gate`
- Workflow conclusion: `success`
- Deterministic regression suite: 615/615 PASS
- Browser TypeScript compilation: PASS
- Frozen pre-interface baseline: 603/603
- New human-facing presentation tests: 12

## Certified visible reader sequence

`PROSE → CASE CARD → STATE TIMELINE → TRANSITION DETAIL → CONTROLLED PROBE → SOURCE LEDGER → CLAIM CEILING → EXACT RETURN TO PROSE`

## Interface contract certified

The UI is a projection layer over the previously frozen reader-state and chapter↔Atlas routing contracts.

Certified properties include:

- prose-first chapter reading surface;
- restrained case-connection entry;
- case card before formal detail;
- ordered diachronic state timeline;
- explicit transition presentation of change, preservation, gain, loss, and unresolved remainder;
- bounded controlled-probe display with counterfactual/historical firewall;
- provenance-oriented source ledger;
- first-class claim ceiling with blocked inferences and REOPEN conditions;
- contextual aperture visually distinguished from optional full-case exploration;
- persistent Return to reading action;
- canonical Atlas nonmutation by presentation code;
- responsive single-column fallback and semantic native controls.

## Regression event

The initial interface commit triggered a TypeScript compile error in a presentation-only helper. The regression gate correctly blocked certification. The helper was removed in corrective commit `2992e5d...`.

No change was made to:

- `fiveCaseAtlas.ts`;
- `fiveCaseAtlasFixtures.ts`;
- `encyclopediaNavigation.ts`;
- `encyclopediaReaderShell.ts`.

The corrective run passed 615/615 and browser compilation.

## Claim ceiling

This certification establishes the first human-facing browser implementation and its deterministic presentation contract.

It does not yet certify:

- a deployed GitHub Pages entry page;
- Pressbooks embedding;
- real-browser cross-device usability;
- screen-reader human testing;
- final typography/visual polish;
- all four chapters as production prose pages.

Those are the next interface/deployment gates and must continue to use the frozen semantic routing authority.
