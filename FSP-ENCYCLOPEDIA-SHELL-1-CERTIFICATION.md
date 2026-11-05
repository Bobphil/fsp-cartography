# FSP-ENCYCLOPEDIA-SHELL-1 — Certification

Status: PASS

## Certified implementation

- Repository: `Bobphil/fsp-cartography`
- Branch: `main`
- Implementation commit: `930421c1c7e3e500ebad6d468f5d0849f3a494e2`
- Commit message: `add executable FSP encyclopedia reader shell`
- GitHub Actions run: `42095846054`
- Workflow: `CODE-0.1 regression gate`
- Workflow conclusion: `success`
- Deterministic regression suite: PASS
- Browser compilation: PASS
- Previous regression baseline: 589 tests
- New Encyclopedia Reader Shell tests: 14
- Certified total: 603/603

## Certified reader architecture

The executable shell preserves the canonical reader sequence:

`PROSE → CASE CARD → STATE TIMELINE → TRANSITION DETAIL → PROBE → SOURCE LEDGER → CLAIM CEILING → EXACT PROSE RETURN`

The certification covers:

- certified navigation map as sole prose→Atlas semantic authority;
- contextual chapter apertures;
- explicit full-case exploration without route contamination;
- canonical Atlas object identity with cloned reader inspection;
- counterfactual probe isolation from canonical history;
- provenance descendant routing;
- case claim-ceiling reachability;
- reverse chapter lookup;
- exact authorial return token preserving chapter, section, anchor, scroll position, and route context.

## Journey certification

PASS:

1. Neptune/Vulcan from CH1.2.
2. Foucault from CH1.3.
3. Newton→Einstein meaning change from CH2.2.
4. Elevator controlled revision probe from CH3.3.
5. DESI 2024→2025→2026 from CH4.9.
6. Five-case claim-ceiling comparison from CH4.11.

## Adversarial certification

PASS:

1. invented prose route rejected;
2. probe mutation does not leak into canonical Atlas history;
3. exact return cannot collapse to chapter-top semantics;
4. unrelated provenance source rejected;
5. out-of-aperture canonical target rejected;
6. reverse routing does not invent chapter uses;
7. full-case exploration preserves contextual route;
8. unknown section/target fails closed.

## Claim ceiling

This certification establishes the state/routing layer of the Encyclopedia Reader Shell. It does not yet certify the polished visual reader, mobile layout, accessibility implementation, or GitHub Pages presentation layer.

Those should be built next on top of this frozen reader-state contract rather than by changing the certified chapter↔Atlas semantics.
