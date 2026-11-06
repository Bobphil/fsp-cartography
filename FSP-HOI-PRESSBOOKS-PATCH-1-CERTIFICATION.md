# FSP-HOI-PRESSBOOKS-PATCH-1 — Certification

Status: PASS

## Certified implementation

- Repository: `Bobphil/fsp-cartography`
- Branch: `main`
- Patch module commit: `47ff2f2e8c668e2854f7098023a275259fa8226e`
- Regression tests commit: `88e549431dcf036aee119a584331fed29da01e0d`
- Deployment contract commit: `060c3e09d199419c623ae5c2333fa859c8188bb1`
- URL assertion correction: `8417d0859720c22d0b113f9aa2099d48549022b4`
- Node-regex corrections: `41091c99ca08726ba371587af73d77967e2ffbcf`, `bda89aa15726816ec0eb351f1f8a66ec472a31fa`
- Regression run: `42234307949`
- Deterministic regression suite: 762/762 PASS
- Browser TypeScript compilation: PASS

## Certified scope

This build implements the thin production patch layer authorized by FSP-HOI-RECONCILE-1.

It does not rewrite the locked manuscript.

It does not change the six Contemporary Laboratories.

It does not alter the public Pressbooks URLs.

## Existing-functionality preservation

The certified patch contract prohibits:

- URL/slug mutation;
- chapter-title mutation;
- replacement or reordering of existing prose;
- JavaScript;
- iframes;
- forms;
- page-global CSS;
- Canvas/Studio media duplication;
- duplicate patch insertion.

SUPER handoff URLs remain unchanged.

The FSP Encyclopedia remains optional depth rather than a course prerequisite.

## Exact binding

The module binds all 26 existing reading/inquiry nodes:

- Prologue;
- Chapters 1–14;
- Inquiry Windows A, B, D;
- embedded Historical Bridge C;
- Laboratories 1–6;
- Epilogue.

Bridge C shares the Chapter 4 Pressbooks URL and may not become a duplicate page.

## Production patch set

This pass generates patches for:

- 14 numbered chapters;
- Inquiry Windows A, B, D with return-only cues;
- Historical Bridge C at the embedded seam.

The six Contemporary Laboratories are explicitly marked `LAB_PRESERVE`.

## Chapter patch grammar

Each numbered chapter receives:

1. **Where this chapter fits**
   - inherited world;
   - live problem;
   - developmental move;
   - time/context.

2. **Later reopening**
   - only on Chapters 5, 6, 7, 8, 9, 10, 12, 13;
   - explicitly blocks the claim that a historical thinker anticipated or predicted the later inquiry.

3. **Optional deeper exploration**
   - canonical Encyclopedia cases/concepts;
   - explicitly optional for course completion.

4. **Return to the whole inquiry**
   - changed later task;
   - book-guiding-question return;
   - existing SUPER workspace.

## Idempotence and rollback

Every patch has stable START/END markers.

Duplicate insertion is detectable.

Rollback is bounded to content between matching markers.

This makes the patch layer reversible without rewriting the chapter body.

## Certified live bases

Pressbooks:
`https://pressbooks.pub/whatmaywecarryforward/`

FSP Encyclopedia:
`https://bobphil.github.io/fsp-cartography/`

SUPER:
`https://rmertzman-tech.github.io/what-may-we-carry-forward-super/`

## Required pilot order

### Pilot A — Chapter 5

Tests:
- context recovery;
- Later Reopening;
- Galileo Encyclopedia link;
- SUPER return.

### Pilot B — Chapter 4 / Bridge C

Tests:
- shared-page identity;
- embedded bridge seam;
- no duplicate page.

### Pilot C — Chapter 8

Tests:
- multiple Encyclopedia links;
- Later Reopening;
- strong whole↔part return.

Only after all three pass should the remaining historical chapters be patched.

## Pilot acceptance checks

For each pilot verify:

- page rendering;
- Table of Contents;
- previous/next navigation;
- citations/footnotes;
- SUPER handoff;
- Encyclopedia links;
- print/PDF export;
- mobile reading;
- accessibility.

## Claim ceiling

FSP-HOI-PRESSBOOKS-PATCH-1 certifies a production-ready, URL-bound, reversible patch generator and deployment contract.

It does not certify that the hosted Pressbooks pages have already been edited.

No hosted Pressbooks content was modified by this build.

Hosted publication remains gated by the controlled three-page pilot.
