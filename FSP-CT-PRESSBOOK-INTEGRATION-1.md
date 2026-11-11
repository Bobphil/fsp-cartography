# FSP-CT-PRESSBOOK-INTEGRATION-1

## Pressbook Production Integration for the Governed Critical Thinking Introductions

**Status:** PRODUCTION INTEGRATION SPECIFICATION  
**Canonical source:** FSP-CT-CANONICAL-1.1 — FROZEN  
**Student-facing source:** FSP-CT-PRESSBOOK-COMPRESSION-1  
**Targets:** History of Ethics Pressbook; History of Inquiry Pressbook  
**Production rule:** Integration may change placement, heading hierarchy, callout treatment, and routing; it may not mutate the compressed student-facing meaning.  
**No-fabrication rule:** Do not publish guessed Pressbooks or Encyclopedia URLs. Use only verified public URLs. Stable FSP target IDs may be recorded before URL-level deep links exist.

---

# 1. Production Decision

The governed-critical-thinking introductions should be inserted as **standalone front-matter chapters**, not folded into the books' existing general orientation pages.

This is the preferred production architecture for both Pressbooks.

The reason is functional separation.

The general orientation page answers questions such as:

- What is this book?
- How is it organized?
- How should students use chapters, cases, workbooks, quizzes, or other course components?

The governed-critical-thinking introduction answers a different question:

> **How should I inquire while reading this book?**

Combining those jobs would make the general orientation too long and would make later chapter-level links difficult to target precisely.

A standalone front-matter chapter also provides:

- one stable Pressbooks URL;
- one reusable Canvas link;
- one destination for chapter-level "review the inquiry routine" links;
- one location that can be revised without changing the book's general orientation;
- a clean boundary between course navigation and critical-thinking practice;
- print/PDF visibility as a genuine part of the book rather than a sidebar buried inside orientation.

Therefore the production decision is:

> **GENERAL ORIENTATION → GOVERNED CRITICAL THINKING FRONT-MATTER CHAPTER → FIRST SUBSTANTIVE HISTORICAL CHAPTER**

for both books.

---

# 2. History of Ethics — Exact Placement

## Pressbooks order

The Ethics Pressbook should use the following opening order:

```text
Book / Course Orientation
↓
How We Will Think Through Ethical Problems
↓
Chapter 1 — Attention
↓
Chapter 2 — Socrates / Plato
↓
...
```

The new governed-critical-thinking chapter belongs **immediately before Chapter 1 — Attention**.

This placement matters conceptually.

Chapter 1 begins with attention because the course treats the first ethical representation as something that must be inspected before later moral reasoning becomes reliable. The front-matter introduction gives students enough vocabulary to understand why the book begins there without teaching the entire Tool Rack in advance.

## Front-matter title

**How We Will Think Through Ethical Problems**

## Subtitle / deck

**A Critical-Thinking Guide for This Book**

Do not put "FSP" in the page title.

The page is a student-facing course resource first. FSP can be named once in the prose as the deeper framework that supplies the expanded governance architecture.

---

# 3. History of Inquiry — Exact Placement

## Pressbooks order

The History of Inquiry Pressbook should use:

```text
Book / Course Orientation
↓
How We Will Follow Inquiry
↓
First Historical Inquiry Chapter / Transformation
↓
subsequent historical sequence
```

The governed-critical-thinking chapter belongs **immediately before the first substantive historical inquiry chapter or transformation sequence**.

The repository currently does not expose a verified current Pressbooks table of contents for this book. Therefore this specification deliberately does **not** fabricate the title of that first historical chapter.

The production binding rule is:

> Bind the handoff to the first existing substantive History of Inquiry chapter in the live Pressbooks TOC; do not create or rename a chapter merely to satisfy this integration.

## Front-matter title

**How We Will Follow Inquiry**

## Subtitle / deck

**A Critical-Thinking Guide for This Book**

Again, do not put "FSP" in the page title.

The student should encounter a domain-native reading guide, not a framework prerequisite.

---

# 4. Shared Heading Hierarchy

Pressbooks should own the page-level H1 through the chapter title.

Do not duplicate the page title as an internal H1.

Use the following content hierarchy.

## Ethics

**Pressbooks page title / H1:**  
How We Will Think Through Ethical Problems

**Deck / opening italic or paragraph:**  
A Critical-Thinking Guide for This Book

**H2 sections:**
1. You Are Already an Inquirer
2. Critical Thinking Tests Reasons
3. Governed Ethical Inquiry
4. Six Questions You Can Use Now
5. Judgment Is Not the Same as Authorization
6. Claim Ceilings, REOPEN, and the History Ahead

**H3 headings:**
Use only for the six numbered questions inside Section 4.

Do not use H4 or deeper heading levels in this front matter.

## Inquiry

**Pressbooks page title / H1:**  
How We Will Follow Inquiry

**Deck / opening italic or paragraph:**  
A Critical-Thinking Guide for This Book

**H2 sections:**
1. You Are Already an Inquirer
2. Critical Thinking Tests Reasons and Evidence
3. Governed Inquiry
4. Six Questions You Can Use Now
5. Models, Instruments, and Sources Need Claim Ceilings
6. REOPEN and the History Ahead

**H3 headings:**
Use only for the six numbered questions inside Section 4.

Do not use H4 or deeper heading levels.

---

# 5. Callout System

The front-matter pages should remain prose-first.

Do not convert the introductions into a sequence of colored boxes.

Use no more than **three recurring callout types**.

The labels must remain visible in text so meaning does not depend on color or theme styling.

---

## Callout A — USE THIS NOW

**Purpose:** give the student the six-question routine.

**Placement:** once, around Section 4.

**Label:**  
**USE THIS NOW — Six Questions**

This is the most prominent callout on the page.

It should contain the six questions only, with one short explanatory sentence.

It should not include Tool IDs.

### Ethics content

1. What is my map?
2. What are the reasons?
3. What shaped the situation?
4. Who is affected and who has standing?
5. What is my claim ceiling?
6. What would REOPEN this?

### Inquiry content

1. What was observed or made measurable?
2. What inference was licensed?
3. What alternatives remained?
4. What shaped the inquiry?
5. What is the claim ceiling?
6. What would REOPEN this?

---

## Callout B — CLAIM CEILING

**Purpose:** teach the recurring "what does not yet follow?" discipline.

**Placement:** once near the later half of the page.

**Label:**  
**CLAIM CEILING — What does not yet follow?**

### Ethics examples

- Formation ≠ justification.
- Power ≠ legitimacy.
- Supported judgment ≠ unrestricted authorization.
- Current judgment ≠ final closure.

### Inquiry examples

- Map ≠ World.
- Instrument reading ≠ uninterpreted fact.
- Model success ≠ ontology.
- Current judgment ≠ final closure.

Do not turn every firewall in the page into a separate box.

The prose may still use bold inline firewalls.

---

## Callout C — GO DEEPER

**Purpose:** optional route to the FSP Encyclopedia.

**Placement:** once near the end of the page.

**Label:**  
**GO DEEPER — FSP Encyclopedia**

Suggested text:

> This chapter gives you only the critical-thinking habits needed to begin the course. The FSP Encyclopedia contains the fuller governed-inquiry architecture, including the Twelve Tools, Failure Atlas, claim ceilings, and deeper comparator notes. You do not need to study that material before continuing.

The callout must make deeper exploration **optional**.

This preserves the no-framework-prerequisite boundary.

---

# 6. What Should Not Become a Callout

Do not create separate boxes for:

- Map ≠ World ≠ Person;
- Formation ≠ justification;
- Origin ≠ validity;
- Tool ≠ Verdict;
- Possibility ≠ Recommendation ≠ Authorization;
- source-ledger distinctions;
- every REOPEN trigger.

These should remain integrated into the prose unless one of them is serving the dedicated Claim Ceiling box.

Too many callouts would turn a narrative introduction into a reference sheet and recreate the overload we just removed.

---

# 7. Encyclopedia Link Contract

## Current technical state

The public Encyclopedia reader has stable internal node IDs including:

- `CT-HOME` — Critical Thinking
- `CT-TOOLS` — Twelve Tools
- `CT-FAILURES` — Failure Atlas
- `FSP-CONSTITUTION` — FSP Constitution
- `SCI-ATLAS` — Scientific Atlas

The current browser reader does **not** expose URL-level deep-link routing for those internal destinations.

Therefore the Pressbooks must not publish guessed node URLs.

## Production link rule now

Use **one verified public Encyclopedia root URL** in the GO DEEPER callout.

The visible link text should be:

**Explore Governed Critical Thinking in the FSP Encyclopedia**

After opening the reader, the student can choose **Critical Thinking** from the human-readable navigation.

Do not make students navigate by internal IDs.

## Recorded future deep-link bindings

When URL-level routing is implemented, bind:

### Ethics front matter

Primary target:
- `CT-HOME` — Critical Thinking

Optional secondary targets:
- `CT-TOOLS` — Twelve Tools
- `CT-FAILURES` — Failure Atlas

Do not route introductory Ethics students directly to FSP Constitution by default.

### Inquiry front matter

Primary target:
- `CT-HOME` — Critical Thinking

Optional secondary targets:
- `SCI-ATLAS` — Scientific Atlas
- `CT-FAILURES` — Failure Atlas

The Scientific Atlas should appear only as optional exploration, not as required prerequisite reading.

## Link ceiling

> **Stable internal target ID ≠ currently available public deep-link URL.**

This distinction must remain explicit until the reader implements URL-addressable node routing.

---

# 8. Chapter Handoff — Ethics

The front-matter chapter should end with a short handoff rather than another summary.

Use:

## Next: Chapter 1 — Attention

> You now have enough of the inquiry framework to begin. Chapter 1 starts with the most basic ethical move: before deciding what a situation means or what anyone should do, inspect what entered the first map—and what may have been left out.

Then provide the normal Pressbooks next-chapter navigation.

Do not add the full Tool name or code here.

Chapter 1 itself will disclose the **Attention / First Map Audit** at the point of use.

---

# 9. Chapter Handoff — History of Inquiry

Because the current live Pressbooks first-chapter title has not been verified in this repository, use a title-independent production handoff until deployment binding.

## Next: Begin the Historical Inquiry

> You now have enough of the inquiry framework to begin. In the first historical chapter, follow what investigators could observe, how they represented it, what their evidence licensed, and what resistance or surprise forced them to revise.

At Pressbooks binding time, replace the heading only with:

**Next: [exact existing first historical chapter title]**

Do not change the body paragraph unless the chapter itself requires a domain-specific handoff.

This provides exact production behavior without fabricating the current TOC.

---

# 10. Chapter-Level Return Links

The standalone front-matter decision becomes valuable only if later chapters can return to it.

Each chapter may include one small optional link near the first case or workbook handoff:

### Ethics

**Review the six ethical inquiry questions**

Target: the front-matter chapter, ideally with an anchor to the six-question section.

### Inquiry

**Review the six inquiry questions**

Target: the front-matter chapter, ideally with an anchor to the six-question section.

This link should not appear repeatedly inside the prose.

Recommended maximum:

> one return link per chapter.

---

# 11. Stable Section Anchors

If Pressbooks permits stable HTML IDs, use the following.

## Ethics

- `ethics-ct-start`
- `ethics-ct-reasons`
- `ethics-ct-governed`
- `ethics-ct-six`
- `ethics-ct-authorization`
- `ethics-ct-reopen`
- `ethics-ct-deeper`

## Inquiry

- `inquiry-ct-start`
- `inquiry-ct-reasons`
- `inquiry-ct-governed`
- `inquiry-ct-six`
- `inquiry-ct-models`
- `inquiry-ct-reopen`
- `inquiry-ct-deeper`

These anchors are Pressbooks-local presentation identifiers.

They are not new FSP canonical IDs.

---

# 12. Sidebar / Textbox Markup Contract

Use native Pressbooks textboxes when available.

If native theme textboxes are unavailable or inconsistent, use semantic static HTML only:

```html
<aside aria-labelledby="...">
  <h3 id="...">USE THIS NOW — Six Questions</h3>
  ...
</aside>
```

Production constraints:

1. no JavaScript;
2. no iframe required for the introduction;
3. no page-global CSS;
4. no meaning conveyed through color alone;
5. heading order must remain valid;
6. external links must have descriptive link text;
7. no raw internal IDs shown to students;
8. all callout content must remain legible in print/PDF export.

This is consistent with the existing thin Pressbooks production philosophy: bounded static additions, preserved prose, and export-safe behavior.

---

# 13. General Orientation Relationship

The existing book orientation should **not** absorb the full critical-thinking introduction.

It should receive only a short forward pointer.

## Ethics orientation pointer

Suggested orientation sentence:

> Before Chapter 1, read **How We Will Think Through Ethical Problems**, a short guide to the six critical-thinking questions you will use throughout the book.

## Inquiry orientation pointer

Suggested orientation sentence:

> Before beginning the historical sequence, read **How We Will Follow Inquiry**, a short guide to the six critical-thinking questions you will use throughout the book.

This preserves a light general orientation while giving the governed-critical-thinking page its own identity.

---

# 14. Canvas / Course-Module Placement

Where the Pressbook is used inside Canvas, do not create a duplicate LMS essay.

Use a link to the Pressbooks front-matter chapter.

## Ethics module

Recommended opening order:

1. Course / module orientation
2. **How We Will Think Through Ethical Problems** — Pressbooks link
3. Chapter 1 — Attention — Pressbooks link
4. Chapter 1 workbook / Output Card
5. Chapter 1 quiz

## Inquiry module

Recommended opening order:

1. Course / module orientation
2. **How We Will Follow Inquiry** — Pressbooks link
3. First historical inquiry chapter — Pressbooks link
4. associated case / lab / activity as designed

The Pressbooks introduction remains the canonical student-facing course copy.

Do not maintain a second Canvas copy that can drift.

---

# 15. Progressive-Disclosure Routing

## Front matter exposes

- situated inquiry;
- partial maps;
- ordinary critical thinking;
- governed-inquiry extension;
- six-question routine;
- claim ceiling;
- REOPEN;
- bounded student authorship.

## Chapters expose

- chapter-specific Tool;
- distinctive failure pattern;
- philosopher / historical episode;
- real case;
- bounded transfer;
- chapter-specific claim ceiling;
- chapter-specific REOPEN.

## Interlude / reference layer exposes

### Ethics
- Twelve-Tool Rack;
- Failure Atlas;
- cross-chapter sequencing;
- cumulative Tool comparison.

### Inquiry
- cross-case transition grammar;
- model/evidence/ontology distinctions;
- source-ledger practices;
- anomaly/revision patterns;
- controlled probes.

## Encyclopedia exposes

- canonical governed-critical-thinking architecture;
- FSP Constitution;
- full Tool definitions;
- Failure Atlas;
- comparator notes;
- formal architecture;
- institutional amplification;
- cross-domain projections.

---

# 15A. Four-Move Projection Contract

The Pressbook front-matter introductions now inherit the shared governance semantics:

```text
PORTABILITY
→ CEILING
→ AUTHORIZATION
→ RETURN

REMAINDER VISIBLE THROUGHOUT
```

This is a **hidden projection contract**, not a replacement for the six-question routines.

## Front matter must preserve

- enough context to ask what carries into a case;
- one explicit boundedness / claim-ceiling habit;
- the judgment ≠ authorization distinction where domain-relevant;
- unresolved remainder without treating incompleteness as failure;
- REOPEN / Return as the route back into continued inquiry.

## Front matter must not do

- introduce four new required headings;
- teach the Twelve Tools;
- turn the Pressbook into an FSP prerequisite;
- present Completion Horizon as course content;
- imply that deeper FSP architecture replaces historical or domain-native methods.

## Completion-Horizon routing rule

The Completion Horizon belongs only in optional Encyclopedia depth.

A Pressbook may use a restrained GO DEEPER link such as:

**Explore the broader FSP research programme**

but required student prose should not claim or teach that FSP will become a complete theory of cognition, meaning, agency, consciousness, or inquiry.

> **Research horizon ≠ Pressbook learning objective.**

# 16. Production Acceptance Tests

## Placement

- Ethics page appears after general orientation and before Chapter 1 Attention — **REQUIRED**
- Inquiry page appears after general orientation and before first substantive historical chapter — **REQUIRED**
- neither introduction is embedded inside the general orientation — **REQUIRED**

## Heading hierarchy

- page title supplies H1 — **REQUIRED**
- internal sections begin at H2 — **REQUIRED**
- six questions may use H3 — **REQUIRED**
- no skipped heading levels — **REQUIRED**

## Callout density

- one USE THIS NOW callout — **REQUIRED**
- one CLAIM CEILING callout — **REQUIRED**
- one GO DEEPER callout — **REQUIRED**
- no proliferation of one-box-per-firewall — **REQUIRED**

## Links

- only verified Pressbooks URLs used — **REQUIRED**
- only verified Encyclopedia root URL used now — **REQUIRED**
- future deep-link bindings recorded by stable ID — **PASS**
- no raw IDs exposed in student-facing link text — **REQUIRED**

## Handoffs

- Ethics hands directly to Chapter 1 Attention — **REQUIRED**
- Inquiry hands to the existing first historical chapter without fabricating a title — **REQUIRED**
- later chapters may route back to the six-question anchor — **ALLOWED / RECOMMENDED**

## Accessibility / export

- no JavaScript dependence — **REQUIRED**
- callout meaning survives print/PDF — **REQUIRED**
- no color-only semantics — **REQUIRED**
- descriptive link labels — **REQUIRED**

## Semantic integrity

- compressed student prose remains unchanged in meaning — **REQUIRED**
- FSP remains optional deeper architecture, not prerequisite — **REQUIRED**
- Tool ≠ Verdict preserved — **REQUIRED**
- claim ceilings preserved — **REQUIRED**
- REOPEN preserved — **REQUIRED**
- historical actor ≠ FSP reconstruction preserved — **REQUIRED**

---

# 17. Final Integration Decision

The introductions should be implemented as **standalone front-matter chapters in both Pressbooks**.

They should not be folded into the existing orientation.

Their student-facing identities are:

### History of Ethics
**How We Will Think Through Ethical Problems**  
*A Critical-Thinking Guide for This Book*

### History of Inquiry
**How We Will Follow Inquiry**  
*A Critical-Thinking Guide for This Book*

Both use the same production grammar:

```text
general orientation
→ governed critical-thinking front matter
→ first historical chapter
→ chapter-specific progressive disclosure
→ optional Encyclopedia depth
```

The public Encyclopedia provides optional depth rather than prerequisite instruction.

The current Encyclopedia root may be linked once a verified public URL is bound. Stable internal targets are already defined for future deep-link activation, but guessed deep-link URLs must not be published.

---

## Production claim ceiling

This build fixes the placement, heading, callout, routing, and handoff contract.

It does **not** claim that the Pressbooks pages have already been created or published.

It does **not** invent an unverified History of Inquiry first-chapter title or unverified public URLs.

It does **not** change the frozen FSP canonical architecture or the student-facing compressed prose.

Its bounded conclusion is:

> **Both governed-critical-thinking introductions are ready to enter Pressbooks as standalone front-matter chapters, immediately after general orientation and before the historical sequence, with a restrained three-callout system, optional Encyclopedia depth, stable local return anchors, and chapter-level progressive disclosure.**
