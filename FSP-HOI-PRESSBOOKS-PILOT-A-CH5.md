# FSP-HOI-PRESSBOOKS-PILOT-A-CH5

## Chapter 5 — Rebuilding the Map

Status: READY FOR MANUAL INSERTION

### Why Chapter 5 first

Chapter 5 exercises all of the important low-risk patch mechanisms at once:

- whole-inquiry context recovery;
- temporal/developmental anchoring;
- Later Reopening;
- a certified Galileo Encyclopedia link;
- the existing Chapter 5 SUPER handoff;
- bounded rollback.

### Exact insertion seam

Insert the patch **after** the existing paragraph ending:

> Part I asked how philosophical examination, character, and practical discipline alter the person who inquires. Part II showed how philosophical artifacts survive through authority, translation, commentary, institutions, and reconstruction. We now encounter thinkers who increasingly ask whether inherited methods and authorities must themselves be rebuilt.

Insert it **before** the existing horizontal rule and:

`## 1. An early-modern world already under construction`

Do not modify either the anchor paragraph or the section heading.

### Existing URL

`https://pressbooks.pub/whatmaywecarryforward/chapter/rebuilding-the-map/`

This URL must remain unchanged.

### Pressbooks HTML editor procedure

1. Open Chapter 5 in the Pressbooks editor.
2. Switch to the HTML/Text view for the chapter body.
3. Search for the exact final sentence: `whether inherited methods and authorities must themselves be rebuilt.`
4. Confirm that the next substantive heading is `1. An early-modern world already under construction`.
5. Search for `FSP-HOI-PRESSBOOKS-PATCH-1:ch05:START`.
6. If that marker already exists, stop. Do not insert a duplicate.
7. Paste the generated Chapter 5 fragment between the opening orientation and the horizontal rule.
8. Preview before publishing.
9. Run the acceptance checks below.
10. Publish only after preview passes.

### Acceptance checks

- URL unchanged.
- Original opening prose unchanged.
- Section 1 heading unchanged and still follows the patch.
- Table of Contents works.
- Previous/next navigation works.
- Existing citations and footnotes render.
- Galileo Encyclopedia link works.
- SUPER Chapter 5 inquiry link works.
- Patch appears exactly once.
- Mobile reading remains usable.
- Print/PDF export retains both prose and patch text.
- Existing Canvas/Studio media are untouched.

### Rollback

If any acceptance check fails, delete only the content between:

`<!-- FSP-HOI-PRESSBOOKS-PATCH-1:ch05:START -->`

and

`<!-- FSP-HOI-PRESSBOOKS-PATCH-1:ch05:END -->`

Do not change any original Chapter 5 prose.

### Claim ceiling

This pilot package identifies the exact insertion seam and validates the generated patch. It does not claim that the hosted Chapter 5 page has already been edited or previewed inside Pressbooks.
