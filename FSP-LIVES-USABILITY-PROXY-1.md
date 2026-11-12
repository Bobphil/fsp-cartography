# FSP-LIVES-USABILITY-PROXY-1

## Five-Reader Framework-Naive Proxy Walkthrough and Measurement

**Status:** ANALYTICAL PROXY STUDY — NOT HUMAN-PARTICIPANT EVIDENCE  
**Prototype:** prototypes/lives-maathai-vr  
**Parent:** FSP-LIVES-USABILITY-1  
**Primary purpose:** Estimate whether a framework-naive reader can distinguish seven core functions without prior FSP vocabulary and identify likely confusion points before recruiting actual readers.

---

# 1. Important Method Ceiling

This is not an observed human-subject study.

No independent participants were recruited or watched.

Five distinct novice-reader profiles were used as structured analytical proxies. Each walkthrough was constrained to the visible browser language and interaction order. The evaluator did not credit hidden FSP knowledge.

Therefore:

> **Proxy comprehension ≠ human comprehension evidence.**

The result may guide interface revision and a later human protocol.

---

# 2. Seven Distinctions Tested

Each proxy was scored on:

1. **Timeline period** — recognizes one bounded period rather than the whole person.
2. **Supported statement** — recognizes what can be said at that point.
3. **Source** — distinguishes a statement from where support comes from.
4. **Capability change** — recognizes what became newly possible / constrained.
5. **Hidden future** — understands why later outcomes are withheld.
6. **Portability** — distinguishes structural transfer from imitation.
7. **Return** — understands the final output as the reader's bounded conclusion, not a correct-answer quiz.

Scoring:

- **2 = clear without framework knowledge**
- **1 = understandable but likely to require one clarification**
- **0 = likely confusion or category collapse**

Maximum per reader: 14.

---

# 3. Proxy Reader Profiles

## P1 — First-year college student

No philosophy background; comfortable with ordinary educational websites; reads headings more than explanatory prose.

## P2 — General adult reader

No academic background assumed; interested in biography; likely to read the page as a story about a famous person.

## P3 — History student

Comfortable with evidence and chronology; likely to ask about primary versus later sources.

## P4 — STEM student

Comfortable with evidence and models; unfamiliar with biography-as-inquiry and philosophical transfer language.

## P5 — Skeptical web reader

Skims quickly; suspicious of interpretive framing; likely to ask whether the site is steering them toward admiration or a lesson.

---

# 4. Measurement Matrix

| Distinction | P1 | P2 | P3 | P4 | P5 | Mean / 2 |
|---|---:|---:|---:|---:|---:|---:|
| Timeline period | 2 | 2 | 2 | 2 | 2 | 2.0 |
| Supported statement | 2 | 1 | 2 | 2 | 2 | 1.8 |
| Source | 1 | 1 | 2 | 2 | 2 | 1.6 |
| Capability change | 1 | 1 | 2 | 2 | 1 | 1.4 |
| Hidden future | 2 | 2 | 2 | 2 | 2 | 2.0 |
| Portability | 1 | 1 | 2 | 1 | 2 | 1.4 |
| Return | 2 | 1 | 2 | 2 | 2 | 1.8 |

**Total scores**

- P1: 11 / 14
- P2: 9 / 14
- P3: 14 / 14
- P4: 13 / 14
- P5: 13 / 14

**Mean:** 12.0 / 14 = **85.7% of maximum proxy score**

This percentage is a design diagnostic, not a measured human success rate.

---

# 5. Reader-by-Reader Walkthrough

## P1 — First-year college student

### Likely strengths

The revised labels “Where we are in the life,” “What we can say at this point,” and “What you are not being shown yet” are immediately legible.

The seven-card orientation reduces the need to infer the page's structure.

### Likely confusions

**Source:** source IDs such as WM-S02 remain visually code-like and may be mistaken for citation numbers rather than links into a source ledger.

**Capability change:** “what became newly possible” is understandable, but the student may still read it as simple progress rather than a change in available action.

**Portability:** “structural lesson, not a recipe” helps, but “structural” may still be too abstract.

### Score

11 / 14.

---

## P2 — General adult biography reader

### Likely strengths

Chronology and hidden-future logic are clear.

The phrase “The cards below describe this period, not Maathai as a whole” strongly protects against person/dossier collapse.

### Likely confusions

**Supported statement vs source:** likely to understand both separately but not immediately see why the site distinguishes them so carefully.

**Capability:** may interpret “what became newly possible” as “what good thing happened next,” losing the possibility-field concept.

**Portability:** may still ask, “So what lesson am I supposed to learn from Maathai?”

**Return:** may treat the final fields as reflective homework unless the purpose is stated more explicitly.

### Score

9 / 14.

---

## P3 — History student

### Likely strengths

All seven distinctions map naturally onto historical method: periodization, claims, source provenance, changing institutions, hindsight bias, analogy limits, and historical interpretation.

The source-class translations are especially useful.

### Likely confusion

None severe in the current surface.

### Score

14 / 14.

---

## P4 — STEM student

### Likely strengths

Supported statements, sources, hidden-future rules, and capability deltas resemble model / evidence distinctions.

“Do not infer more than this” makes the claim ceiling legible without needing the phrase “claim ceiling.”

### Likely confusion

**Portability:** “structural relation” may be read as an analogy that should be generalized more strongly than FSP permits.

The interface should emphasize that transfer is a hypothesis to test, not a deduction from the historical case.

### Score

13 / 14.

---

## P5 — Skeptical web reader

### Likely strengths

Claim ceilings, source types, hidden-future explanations, and “what should not be copied” all reduce suspicion that the page is covertly presenting a hero narrative.

### Likely confusion

**Capability change:** this reader may interpret capability language as a positive-value judgment unless the interface explicitly says “more capability in one dimension is not necessarily global improvement.”

### Score

13 / 14.

---

# 6. Strongest Findings

## PASS — Timeline state

All five proxy readers can distinguish the selected period from the whole life.

The phrase:

> “The cards below describe this period, not Maathai as a whole.”

does substantial work.

## PASS — Hidden future

This is the clearest distinction in the prototype.

“Later events remain hidden … to prevent later success from making earlier choices look inevitable” communicates hindsight control without framework vocabulary.

## PASS — Supported statement

The plain-language phrase “What we can say at this point” is much stronger than “claims and provenance.”

One residual issue remains for biography-oriented readers: they may not immediately understand why a supported statement carries a separate interpretive limit.

## PARTIAL PASS — Source

“Where those statements come from” is clear, but source IDs remain too internal-looking.

Likely next patch:
- make source type prominent;
- make source ID secondary;
- add a one-line “Why this source matters here.”

## PARTIAL PASS — Capability change

“What became newly possible” is understandable but risks being read as simple progress.

Likely next patch:

> “What could now be done that could not be done before?”

and pair gains with new burdens / losses.

## PARTIAL PASS — Portability

“A structural lesson, not a recipe” is directionally strong.

The word “structural” remains the most abstract public-facing term.

Likely next patch:

> “What pattern might apply somewhere else?”

Then reveal “structural relation” only as a deeper label.

## PASS WITH SMALL PATCH — Return

“What you take away — in your own words” is understandable.

Likely next patch:
state explicitly:

> “There is no single correct takeaway. Your answer passes only if it keeps difference and uncertainty visible.”

---

# 7. Distinction Confusion Map

Most likely remaining collapses:

1. **source ↔ statement**
2. **capability gain ↔ progress / goodness**
3. **portable pattern ↔ advice**
4. **Return ↔ correct interpretation**

No strong proxy evidence of collapse between:
- timeline period and whole person;
- hidden future and missing evidence.

---

# 8. Recommended Micro-Patches Before Human Testing

## U1 — Source cards

Add:

**Why this source matters here:** [claim-supported role]

Make source ID visually secondary.

## U2 — Capability language

Replace primary heading:

**What became newly possible**

with:

**What could now be done that could not be done before?**

Add:

> New capability can also bring new costs or constraints.

## U3 — Portability language

Replace primary phrase:

**structural relation**

with:

**pattern that might matter somewhere else**

Retain “structural relation” as a secondary / deep label.

## U4 — Return language

Add:

> There is no single correct takeaway. A good Return keeps at least one important difference and one uncertainty visible.

---

# 9. Proxy Decision

**PASS WITH FOUR MICRO-PATCHES — READY FOR ACTUAL HUMAN OBSERVATION.**

The prototype appears capable of presenting the seven distinctions without requiring prior FSP vocabulary.

The weakest areas are capability change and portability, not chronology or evidence visibility.

---

# 10. Human-Test Thresholds

For an actual five-person test:

A distinction passes if at least **4 of 5 readers** can explain it in ordinary language without the observer supplying the FSP term.

Global pilot pass requires:

- at least 5 of 7 distinctions pass;
- timeline period must pass;
- hidden future must pass;
- source vs statement must not collapse in more than one reader;
- portability must not become direct imitation in more than one reader;
- Return must not become a single-correct-answer task in more than one reader.

---

# 11. Observer Protocol

Do not teach FSP vocabulary before the task.

Ask the seven questions only after the reader has explored the page.

Observers may say:

> “Tell me what you think this part means.”

Observers may not define:
- capability;
- hindsight control;
- portability;
- Return.

Record:
- first answer;
- whether clarification was requested;
- mistaken category;
- self-correction;
- time to locate supporting evidence.

---

# 12. Claim Ceiling

This proxy study does not establish actual usability.

It establishes:

- where the current interface is likely robust;
- where confusion is still likely;
- a fixed measurement protocol for real readers.

The next evidence-producing step requires actual independent participants.
