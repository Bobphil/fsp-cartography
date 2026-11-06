# FSP-ENCYCLOPEDIA-PUBLIC-SHELL-1 — Certification

Status: PASS

## Certified implementation

- Repository: `Bobphil/fsp-cartography`
- Branch: `main`
- Public shell implementation commit: `0e910224c3e3d9cbbe1fbaa4753dec0e875ee483`
- Corrective rendering commit: `1ad5630fe374f88a6d682eae51779d5d9eab68eb`
- Temporary Pages initializer removal commit: `bf42b70449b2c665d15a908d85e5e20a7eaa896d`
- Passing regression run for shell: `42135829834`
- Passing regression run after workflow cleanup: `42135868168`
- Deterministic regression suite: 636/636 PASS
- Browser TypeScript compilation: PASS
- Passing Encyclopedia Pages deployment run: `42135829819`

## Certified public shell

The deployed public shell exposes:

- Home
- Chapters index and chapter maps
- Cases index and case maps
- Concepts index and concept pages
- Tools index and tool pages
- Comparisons index and comparison pages
- the existing CH1.2 Neptune/Vulcan reader as the first complete interactive vertical slice

Public navigation uses hash routes so the shell works on static GitHub Pages without a server router.

## Vertical-slice boundary

The public shell explicitly identifies `CH1.2 → NEPTUNE-VULCAN` as the current complete vertical slice.

Other public pages expose certified architecture and content placement without pretending that their full deep-reader production is complete.

## Semantic authority preserved

This build does not change:

- canonical Five-Case Atlas semantics;
- certified chapter↔Atlas navigation bindings;
- Reader Shell state authority;
- claim ceilings;
- source-ledger authority.

The public shell is a navigation and explanation layer over those contracts.

## Deployment authority

The temporary `.github/workflows/static.yml` workflow used only to initialize GitHub Pages has been removed.

`.github/workflows/pages-encyclopedia.yml` is now the sole intended Pages deployment path for the Encyclopedia.

The final initializer run completed before the authoritative Encyclopedia deployment run; the Encyclopedia deployment completed afterward and therefore owns the current published artifact.

## Claim ceiling

This certification establishes the first coherent public Encyclopedia shell and its deployed navigation structure.

It does not yet certify final visual design, polished production prose for all four chapters, complete deep readers for the other four cases, human accessibility testing, or Pressbooks integration.
