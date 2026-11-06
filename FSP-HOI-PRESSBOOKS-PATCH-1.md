# FSP-HOI-PRESSBOOKS-PATCH-1

## Thin Pressbooks Production Patch Pass

Source: FSP-HOI-RECONCILE-1

Book: What May We Carry Forward? A History of Philosophy as Situated Human Inquiry

## Production decision

This pass does not replace the locked manuscript. It adds bounded static HTML around existing prose.

## Existing-functionality preservation

1. No Pressbooks URL or slug changes.
2. No chapter-title changes.
3. No paragraph replacement or reordering.
4. No JavaScript, iframes, forms, or page-global CSS.
5. No Canvas/Studio media duplication.
6. Bridge C remains embedded in the Chapter 4 Pressbooks page.
7. The six Contemporary Laboratories remain untouched in this pass.
8. Encyclopedia links remain optional.
9. SUPER URLs remain unchanged.

## Chapter patch anatomy

Each numbered chapter receives:
- Where this chapter fits: inherited world, live problem, developmental move, time/context.
- Later reopening only on Chapters 5, 6, 7, 8, 9, 10, 12, and 13.
- Optional deeper exploration through canonical Encyclopedia links.
- Return to the whole inquiry plus the existing SUPER workspace.

## Idempotence and rollback

Every fragment has stable START and END comments keyed by node ID. Search for the START marker before insertion. If present, do not insert again. Rollback removes only content between matching markers.

## Safe deployment order

Pilot A: Chapter 5. This tests context recovery, Later Reopening, Galileo Encyclopedia link, and SUPER return.

Pilot B: Chapter 4 / Bridge C. This tests shared-page identity. Do not create a separate Pressbooks page for Bridge C.

Pilot C: Chapter 8. This tests multiple optional Encyclopedia links and a strong Later Reopening.

Only after these three pass should the remaining historical chapters be patched.

For each pilot verify page rendering, table of contents, previous/next navigation, citations/footnotes, SUPER handoff, Encyclopedia links, print/PDF export, and mobile reading.

## Production statuses

NOT_STARTED → INSERTED_UNPUBLISHED → PREVIEW_PASS → PUBLISHED → ROUTING_PASS → EXPORT_PASS → ACCESSIBILITY_PASS → CERTIFIED

## Claim ceiling

This build creates the URL-bound patch generator and deployment contract. It does not directly edit the hosted Pressbooks pages in this environment. The fragments are ready for insertion through the Pressbooks HTML editor or a future connected publishing workflow.
