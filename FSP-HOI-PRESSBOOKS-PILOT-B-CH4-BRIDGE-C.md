# FSP-HOI-PRESSBOOKS-PILOT-B-CH4-BRIDGE-C

## Chapter 4 — Reason Inside an Inherited World
## Historical Bridge C — Transmission Is a Doing

Status: READY FOR MANUAL INSERTION

### Why this is the second pilot

Chapter 4 / Bridge C tests the one production arrangement most vulnerable to accidental duplication: two inquiry nodes share one Pressbooks reading page.

The pilot must prove that we can add separate reversible cues for Chapter 4 and Bridge C without changing that page identity.

### Chapter 4 insertion seam

Insert the Chapter 4 reconciliation patch after:

> That question will turn out to matter for both faith and reason, and later for law.

and before the existing horizontal rule and:

`## 1. Augustine: inquiry after certainty has become a problem`

Do not modify the opening prose, the horizontal rule, or the Augustine heading.

### Bridge C insertion seam

Inside the same Pressbooks page, locate:

`## 5. Historical Bridge C — Transmission Is a Doing`

Preserve the existing four-part orientation:

- Why here
- Relation discipline
- Do not skip this arrow
- I still cannot conclude

Insert the Bridge C cue immediately after:

> continuity of transmission does not imply identity of meaning across every stage.

and before:

> A book cannot influence a later thinker if nobody can read it.

Do not create a second Pressbooks page for Bridge C.

### Existing shared URL

`https://pressbooks.pub/whatmaywecarryforward/chapter/reason-inside-an-inherited-world/`

Both `ch04` and `intC` continue to resolve to this page.

### Manual editor procedure

1. Open Chapter 4 in Pressbooks.
2. Switch to HTML/Text view.
3. Search for the Chapter 4 anchor sentence.
4. Confirm the next heading is Augustine section 1.
5. Search for `FSP-HOI-PRESSBOOKS-PATCH-1:ch04:START`.
6. If present, do not insert another Chapter 4 patch.
7. Insert the Chapter 4 fragment at the chapter seam.
8. Search for `Historical Bridge C — Transmission Is a Doing`.
9. Confirm the existing four-part bridge orientation remains intact.
10. Search for `FSP-HOI-PRESSBOOKS-PATCH-1:intC:START`.
11. If present, do not insert another Bridge C cue.
12. Insert the Bridge C fragment after the I-still-cannot-conclude line and before the bridge body.
13. Preview the single page before publishing.

### Acceptance checks

- Chapter 4 and Bridge C share one URL.
- Chapter opening prose unchanged.
- Augustine section heading unchanged.
- Existing Bridge C orientation unchanged.
- Bridge C remains embedded.
- No duplicate page.
- TOC works.
- Previous/next navigation works.
- Citations/footnotes render.
- Chapter 4 SUPER link works.
- Bridge C SUPER link works.
- Patch markers each appear once.
- Mobile reading works.
- Print/PDF export preserves Bridge C.
- Existing course media remain untouched.

### Rollback

Remove only the new content bounded by:

`ch04:START ... ch04:END`

and/or:

`intC:START ... intC:END`

Never remove, move, or duplicate the original Bridge C material.

### Claim ceiling

This package certifies the insertion seams and same-page safeguards. It does not claim that the hosted Pressbooks page has already been edited or previewed.
