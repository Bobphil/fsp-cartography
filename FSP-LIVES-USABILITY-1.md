# FSP-LIVES-USABILITY-1

## Framework-Naive Browser Usability Pass for Lives + Maathai VR Prototype

**Status:** USABILITY REGRESSION — VERSION 1  
**Prototype:** prototypes/lives-maathai-vr  
**Primary purpose:** Test whether a reader with no prior FSP vocabulary can distinguish timeline state, supported claim, source, capability change, hidden future, portability, and Return.

# 1. Test Standard

The interface passes only if a first-time reader can answer, in ordinary language:

1. Where am I in the person's life?
2. What can the evidence support at this point?
3. Where does that support come from?
4. What became newly possible or newly constrained?
5. What later information is being deliberately withheld?
6. What lesson might travel to another context without copying the historical tactic?
7. What is my own bounded conclusion after inspecting the case?

The reader should not need to know the terms:
- state;
- provenance;
- capability delta;
- hindsight control;
- portability;
- Authorial Return;
- topology module.

# 2. Initial Findings

## Timeline state

**Original label:** Transformation timeline / States.

**Problem:** “State” is technically accurate but framework-dependent.

**Patch:** “Where we are in the life” and “Choose a period.”

PASS if the reader can identify one bounded historical period without treating it as the whole person.

## Revealed claim

**Original label:** Claims and provenance / Revealed claims.

**Problem:** The word “claim” is usable, but pairing it immediately with provenance raises the vocabulary burden.

**Patch:** “What we can say at this point” / “Supported statements.”

PASS if the reader understands that these statements are evidence-bounded and may change as later history becomes available.

## Source

**Original label:** Recoverable provenance.

**Problem:** “Provenance” is specialist vocabulary.

**Patch:** “Where those statements come from” / “Sources.”

Source classes are translated:
- PRIMARY_FIRST_PERSON → Maathai speaking or writing;
- CONTEMPORARY_DOCUMENT → document from the time;
- HISTORICAL_INSTITUTIONAL → later historical or institutional source;
- FSP_INFERENCE → FSP interpretation.

PASS if the reader can distinguish source type from the statement it supports.

## Capability change

**Original label:** Capability delta.

**Problem:** “Delta” and even “capability” may sound technical.

**Patch:** “What became newly possible.”

PASS if the reader can identify a change in reachable action rather than merely the next event in chronology.

## Hidden future

**Original label:** Hindsight control.

**Problem:** The concept is important but the label is opaque.

**Patch:** “What you are not being shown yet” / “Hidden future.”

PASS if the reader understands why later success is withheld: to prevent earlier choices from looking inevitable.

## Portability

**Original label:** Portability / What might travel?

**Problem:** “What might travel?” helps, but “portability” still requires explanation.

**Patch:** “What might carry to another situation” and “A structural lesson, not a recipe.”

PASS if the reader distinguishes structural comparison from copying Maathai's tactic.

## Return

**Original label:** Authorial Return artifact / OFF.

**Problem:** Strong FSP terminology, but not self-explanatory.

**Patch:** “What you take away — in your own words.”

Required fields become:
- What structural relation did you notice?
- What is importantly different in another context?
- What remains uncertain?
- What question would you carry forward?

PASS if the reader's output remains bounded and does not become advice or imitation.

# 3. Orientation Patch

Add a seven-card “How to read this page” orientation before the timeline.

The cards define:
- where we are in the life;
- what we can say now;
- where that statement comes from;
- what became newly possible;
- what is not being shown yet;
- what might carry to another situation;
- what the reader takes away.

This is progressive disclosure.

The FSP vocabulary remains available in the research layer but is not required for first comprehension.

# 4. FSP-Term Policy

Use:

> **plain-language first; FSP term second when useful**

Examples:

- “what became newly possible” before “capability change”;
- “what you are not being shown yet” before “hindsight control”;
- “what might carry to another situation” before “portability”;
- “what you take away” before “Authorial Return.”

Do not delete the canonical terms from the research architecture.

Do not require them at the public entry layer.

# 5. Semantic Preservation Test

The usability patch must not weaken:

- person ≠ dossier;
- later significance ≠ earlier foresight;
- source traceability;
- claim ceiling;
- capability / constraint distinction;
- portability firewall;
- learner-authored Return;
- optional Life Navigation.

Plain language may compress terminology.

It may not delete function.

# 6. VR Usability Patch

The browser VR rehearsal now uses:

- “Step” instead of “Scene” as the primary user-facing progression label;
- “What to do here” instead of “Learner task”;
- “What can be revealed now” instead of “Revealed claims”;
- “What became newly possible” instead of “Capability delta”;
- “New limits that now matter” instead of “New constraints” alone;
- “Hidden future” explanation at each step;
- “What you take away — in your own words” instead of requiring “Authorial Return” vocabulary;
- “The historical scaffold is now off” instead of presenting OFF as an unexplained command.

# 7. Framework-Naive Comprehension Questions

A usability session should ask the reader, without giving FSP terms:

1. What period are you looking at now?
2. Name one statement the page says is supported at this point.
3. What kind of source supports it?
4. What became possible later that was not possible before?
5. Why are some later facts hidden?
6. What is one lesson that might apply elsewhere, and one part of the case you should not copy?
7. What remains uncertain after you finish?

A successful session requires concept discrimination, not vocabulary recall.

# 8. Failure Conditions

FAIL if a reader:

- treats a period card as the whole person;
- cannot distinguish statement from source;
- treats source type as strength score;
- reads capability change as moral improvement;
- thinks hidden future means information is being concealed for persuasion;
- interprets portability as “do what Maathai did”;
- treats Return as a correct-answer quiz;
- thinks OFF means the historical inquiry is complete.

# 9. Current Decision

**PASS WITH PATCHES — READY FOR HUMAN BROWSER TESTING.**

The prototype is no longer dependent on prior knowledge of FSP labels for its seven central distinctions.

This is a design-level usability pass, not evidence from real users.

# 10. Next Empirical Step

Run a small observed browser test with framework-naive readers and record:

- first interpretation of each section;
- mistaken distinctions;
- time to locate evidence;
- hindsight leakage;
- portability inflation;
- Return quality;
- terms that still require explanation.

Do not infer human usability from code-level regression alone.
