# FSP-CT-ETHICS-LIVE-BINDING-1

## Ethical History Pressbook Live-Binding Package

**Status:** LIVE-BINDING PACKAGE READY FOR INSERTION  
**Book:** Ethical History  
**Verified public book root:** https://pressbooks.pub/ethicalhistory/  
**Verified Chapter 1 URL:** https://pressbooks.pub/ethicalhistory/chapter/chapter-1/  
**Canonical source:** FSP-CT-CANONICAL-1.1 — FROZEN  
**Student-facing source:** FSP-CT-PRESSBOOK-COMPRESSION-1  
**Integration source:** FSP-CT-PRESSBOOK-INTEGRATION-1  
**Production rule:** Bind only to verified live Pressbooks URLs. Do not guess the future front-matter permalink before Pressbooks creates it.

---

# 1. Exact Placement

Create one new standalone front-matter chapter in the live **Ethical History** Pressbook.

The required opening order is:

```text
Existing Book / Course Orientation
↓
NEW FRONT MATTER:
How We Will Think Through Ethical Problems
↓
Chapter 1 — Attention
https://pressbooks.pub/ethicalhistory/chapter/chapter-1/
```

The new front-matter chapter must appear immediately before the current Chapter 1 page in the Pressbooks table of contents.

Do not rename or move Chapter 1 as part of this insertion.

Do not absorb the new critical-thinking chapter into the existing orientation page.

---

# 2. New Front-Matter Identity

## Pressbooks page title

**How We Will Think Through Ethical Problems**

## Deck

*A Critical-Thinking Guide for This Book*

## Page type

Front Matter

## Visibility

Public while the book is temporarily public for this build.

If the book is later returned to private status, preserve the page and its internal ordering.

## Future permalink

Do not hard-code or predict the final permalink.

After Pressbooks saves the page, record the actual URL returned by Pressbooks as:

```text
ETHICS_CT_FRONTMATTER_URL = [actual Pressbooks permalink]
```

All later chapter-return links must use that real permalink.

---

# 3. Stable Local Anchors

Insert these HTML IDs on the corresponding internal H2 sections:

- `ethics-ct-start`
- `ethics-ct-reasons`
- `ethics-ct-governed`
- `ethics-ct-six`
- `ethics-ct-authorization`
- `ethics-ct-reopen`
- `ethics-ct-deeper`

Recommended binding:

```html
<h2 id="ethics-ct-start">1. You Are Already an Inquirer</h2>
<h2 id="ethics-ct-reasons">2. Critical Thinking Tests Reasons</h2>
<h2 id="ethics-ct-governed">3. Governed Ethical Inquiry</h2>
<h2 id="ethics-ct-six">4. Six Questions You Can Use Now</h2>
<h2 id="ethics-ct-authorization">5. Judgment Is Not the Same as Authorization</h2>
<h2 id="ethics-ct-reopen">6. Claim Ceilings, REOPEN, and the History Ahead</h2>
```

The GO DEEPER callout receives:

```html
<aside id="ethics-ct-deeper" ...>
```

These anchors are presentation IDs only.

They are not new canonical FSP IDs.

---

# 4. Orientation Pointer

Add one short forward pointer to the existing general orientation page.

Do not reproduce the critical-thinking introduction there.

Use this exact student-facing sentence:

> Before Chapter 1, read **How We Will Think Through Ethical Problems**, a short guide to the six critical-thinking questions you will use throughout the book.

Once the new front-matter page has its real Pressbooks permalink, link the title text to that URL.

Do not create a second copy of the introduction in the orientation page.

---

# 5. Front-Matter Body Source

Use the **History of Ethics Pressbook Introduction** from:

`FSP-CT-PRESSBOOK-COMPRESSION-1.md`

Do not restore material that was intentionally removed during compression.

In particular, do not reinsert:

- the complete Twelve-Tool inventory;
- the full twelve-chapter Tool preview;
- the complete major-case catalog;
- extended institutional diagnostics;
- a long technical explanation of Authorial Return.

The front matter should remain an orientation to use, not a miniature version of the entire course.

---

# 6. Callout A — USE THIS NOW

Insert this callout around the six-question routine.

## Visible heading

**USE THIS NOW — Six Questions**

## Content

1. **What is my map?**  
   What happened? What am I adding? What or who might be missing?

2. **What are the reasons?**  
   What supports the judgment? What actually follows from those reasons?

3. **What shaped the situation?**  
   What habits, constraints, institutions, histories, or power relations matter?

4. **Who is affected and who has standing?**  
   Whose perspective is represented? Who may decide, recommend, constrain, or intervene?

5. **What is my claim ceiling?**  
   What does not yet follow from the evidence or reasoning I have?

6. **What would REOPEN this?**  
   What new evidence, consequence, challenge, changed condition, or newly visible person would make me reconsider?

## Preferred semantic markup

```html
<aside aria-labelledby="ethics-ct-six-title">
  <h3 id="ethics-ct-six-title">USE THIS NOW — Six Questions</h3>
  ...
</aside>
```

If Pressbooks native textbox styles are used instead, preserve the visible heading text exactly.

---

# 7. Callout B — CLAIM CEILING

Insert one claim-ceiling callout in the later half of the page.

## Visible heading

**CLAIM CEILING — What does not yet follow?**

## Content

- **Formation ≠ justification.**
- **Power ≠ legitimacy.**
- **Supported judgment ≠ unrestricted authorization.**
- **Current judgment ≠ final closure.**

Add one sentence beneath the list:

> A claim ceiling does not weaken inquiry. It marks the strongest conclusion the present reasons have actually earned.

Do not create separate callout boxes for every other firewall.

---

# 8. Callout C — GO DEEPER

Insert one optional deeper-reference callout near the end of the page.

## Visible heading

**GO DEEPER — FSP Encyclopedia**

## Content

> This chapter gives you only the critical-thinking habits needed to begin the course. The FSP Encyclopedia contains the fuller governed-inquiry architecture, including the Twelve Tools, Failure Atlas, claim ceilings, and deeper comparator notes. You do not need to study that material before continuing.

## Link text

**Explore Governed Critical Thinking in the FSP Encyclopedia**

## Current binding rule

Bind this link only to the verified public Encyclopedia root URL when that URL is available in the production environment.

Do not invent a deep-link URL for `CT-HOME`.

Record the intended future internal target as:

```text
Primary Encyclopedia target: CT-HOME — Critical Thinking
Optional later targets:
- CT-TOOLS — Twelve Tools
- CT-FAILURES — Failure Atlas
```

No raw IDs should appear in the student-facing Pressbooks page.

---

# 9. Chapter 1 Handoff

At the end of the new front-matter chapter, insert:

## Next: Chapter 1 — Attention

> You now have enough of the inquiry framework to begin. Chapter 1 starts with the most basic ethical move: before deciding what a situation means or what anyone should do, inspect what entered the first map—and what may have been left out.

Then add a descriptive link:

**Continue to Chapter 1 — Attention**

Target:

https://pressbooks.pub/ethicalhistory/chapter/chapter-1/

This is a real bound URL and may be used immediately.

---

# 10. Chapter 1 Return Link

After the new front-matter page has been created and its actual permalink captured, Chapter 1 may receive one small optional return link near its first case or first workbook handoff:

**Review the six ethical inquiry questions**

Target:

```text
[ETHICS_CT_FRONTMATTER_URL]#ethics-ct-six
```

Do not insert this until the real front-matter URL exists.

Do not place more than one such return link in Chapter 1.

---

# 11. Future Chapter Return Contract

For later Ethics chapters, the default return label remains:

**Review the six ethical inquiry questions**

Target:

```text
[ETHICS_CT_FRONTMATTER_URL]#ethics-ct-six
```

Maximum:

> one front-matter return link per chapter.

The chapter-specific Tool and case remain local to each chapter.

The front-matter page is not a replacement for chapter-specific Tool instruction.

---

# 12. Exact URL Bindings

## Bound now

### Book root

```text
ETHICS_BOOK_ROOT
https://pressbooks.pub/ethicalhistory/
```

### Chapter 1

```text
ETHICS_CH01_URL
https://pressbooks.pub/ethicalhistory/chapter/chapter-1/
```

## To bind after page creation

### Governed critical-thinking front matter

```text
ETHICS_CT_FRONTMATTER_URL
PENDING — capture exact Pressbooks-generated permalink
```

### Existing general orientation page

```text
ETHICS_ORIENTATION_URL
PENDING — capture exact live orientation permalink before editing
```

## Important ceiling

> **Known book root + known Chapter 1 URL ≠ permission to guess orientation or new-front-matter URLs.**

---

# 13. Pressbooks HTML Constraints

Use only bounded static markup.

Required:

1. no JavaScript;
2. no iframe;
3. no page-global CSS;
4. no color-only meaning;
5. H1 supplied by Pressbooks page title;
6. content sections begin with H2;
7. six-question items may use H3 only;
8. descriptive link text;
9. all callout content survives print/PDF export;
10. stable anchor IDs retained if Pressbooks does not strip them.

If Pressbooks strips custom IDs, preserve the prose and callouts and record anchor support as FAIL/PENDING rather than creating a workaround that changes semantics.

---

# 14. Insertion Sequence

Use this exact production sequence.

## Step 1 — Create front-matter page

Create:

**How We Will Think Through Ethical Problems**

Place immediately before Chapter 1.

Do not publish guessed links elsewhere yet.

## Step 2 — Insert compressed student-facing body

Use the Ethics portion of `FSP-CT-PRESSBOOK-COMPRESSION-1`.

Add the stable anchors.

## Step 3 — Add the three callouts

- USE THIS NOW
- CLAIM CEILING
- GO DEEPER

No additional recurring callout type.

## Step 4 — Add Chapter 1 handoff

Bind to:

https://pressbooks.pub/ethicalhistory/chapter/chapter-1/

## Step 5 — Publish / update page

Capture the actual front-matter permalink.

Record it as `ETHICS_CT_FRONTMATTER_URL`.

## Step 6 — Bind orientation pointer

Open the real existing orientation page.

Insert the one-sentence pointer.

Bind it to the actual front-matter permalink.

## Step 7 — Optional Chapter 1 return link

Bind:

`[ETHICS_CT_FRONTMATTER_URL]#ethics-ct-six`

only after confirming anchors survive publication.

---

# 15. Live Acceptance Runner

After insertion, run the following in the public Pressbook.

## A. Book-root test

Open:

https://pressbooks.pub/ethicalhistory/

Confirm:

- new front-matter title appears in TOC;
- it appears before Chapter 1;
- Chapter 1 title/order is unchanged.

## B. Front-matter rendering test

Open the actual `ETHICS_CT_FRONTMATTER_URL`.

Confirm:

- title is correct;
- subtitle/deck appears once;
- six H2 sections render in order;
- prose remains paragraph-driven;
- no raw FSP IDs are visible;
- no duplicated H1 appears.

## C. Callout test

Confirm exactly:

- one USE THIS NOW callout;
- one CLAIM CEILING callout;
- one GO DEEPER callout.

Confirm callout meaning is legible without color.

## D. Anchor test

Test:

`[ETHICS_CT_FRONTMATTER_URL]#ethics-ct-six`

Confirm it lands at the six-question section or its callout.

If Pressbooks strips the ID, mark **ANCHOR FAIL** and retain a page-level return link instead.

## E. Chapter 1 handoff test

Click:

**Continue to Chapter 1 — Attention**

Confirm destination:

https://pressbooks.pub/ethicalhistory/chapter/chapter-1/

## F. Orientation-pointer test

From the existing orientation page, click:

**How We Will Think Through Ethical Problems**

Confirm it reaches the new front matter.

## G. Mobile / accessibility test

Confirm:

- headings remain hierarchical;
- callouts do not overflow;
- links have readable text;
- no interaction depends on hover;
- six questions remain readable on a narrow screen.

## H. Print / PDF test

Confirm:

- callout headings and content survive export;
- URLs are not required to understand the prose;
- the Chapter 1 handoff remains intelligible if links are inactive.

---

# 16. Rollback Contract

If the front-matter insertion causes a TOC, export, accessibility, or navigation problem:

1. leave Chapter 1 unchanged;
2. unpublish or move only the new front-matter page;
3. remove only the orientation pointer added by this package;
4. remove only any return link added to Chapter 1;
5. preserve all source artifacts in the repository.

Do not roll back or rewrite the historical chapters.

---

# 17. Production Status Model

Use:

```text
PACKAGE_READY
→ FRONTMATTER_CREATED
→ BODY_INSERTED
→ URL_CAPTURED
→ ORIENTATION_BOUND
→ CH01_HANDOFF_PASS
→ ANCHOR_PASS
→ MOBILE_ACCESSIBILITY_PASS
→ EXPORT_PASS
→ LIVE_BINDING_CERTIFIED
```

Current state:

> **PACKAGE_READY**

The public book root and Chapter 1 URL are bound.

The new front-matter URL and existing orientation-page URL remain pending capture from the live Pressbooks interface.

---

# 18. Final Binding Decision

The real public Ethics Pressbook is now bound to this integration package at:

https://pressbooks.pub/ethicalhistory/

The governed-critical-thinking chapter will enter as a new standalone front-matter page immediately before:

https://pressbooks.pub/ethicalhistory/chapter/chapter-1/

Its student-facing title is:

**How We Will Think Through Ethical Problems**

Its stable local return target is intended to be:

`#ethics-ct-six`

Its three callouts are frozen for this production pass:

- **USE THIS NOW — Six Questions**
- **CLAIM CEILING — What does not yet follow?**
- **GO DEEPER — FSP Encyclopedia**

Its terminal handoff is bound to the real Chapter 1 page.

---

## Live-binding claim ceiling

This package binds the production architecture to the real public **Ethical History** book root and Chapter 1 URL.

It does not claim that the new front-matter page already exists.

It does not invent the future front-matter permalink.

It does not invent the existing orientation-page permalink.

It does not claim that the live public rendering has passed visual, anchor, mobile, accessibility, or export tests yet.

Its bounded conclusion is:

> **The Ethics governed-critical-thinking introduction is now production-bound to the real `ethicalhistory` Pressbook and is ready for insertion, permalink capture, orientation binding, and live acceptance testing.**
