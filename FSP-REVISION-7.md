# FSP-REVISION-7

## Concept Genealogy, Semantic Drift Through Institutional Sedimentation, Cross-Generation Translation, Formation/Justification Re-Audit, and Historical REOPEN

**Status:** Historical concept-genealogy and sedimentation-governance layer  
**Boundary:** REVISION-1 through REVISION-6 remain intact; TRANSLATION-12 human evidence remains PENDING.

## 1. Purpose

REVISION-6 established that concepts may form, translate partially, compete, and be captured or co-opted.

REVISION-7 adds historical depth.

The central question is:

> What happens when concepts sediment through institutions and later agents inherit versions whose meanings, scopes, contrasts, and provenance have changed?

The build therefore adds:

- concept versions;
- sedimentation events;
- semantic-drift audits;
- cross-generation translation;
- false-friend detection;
- formation/justification re-auditing;
- historical REOPEN.

## 2. Concept genealogy

A genealogy contains:

- the concept record;
- ordered historical versions;
- sedimentation events linking versions.

Each version records:

- period label;
- definition;
- contrast set;
- scope;
- contributors;
- provenance visibility.

The genealogy preserves continuity without assuming identity.

## 3. Sedimentation carriers

Concepts may sediment through:

- LAW;
- POLICY;
- TEXTBOOK;
- CURRICULUM;
- PROFESSIONAL_PRACTICE;
- RITUAL;
- TECHNICAL_STANDARD;
- INSTITUTIONAL_FORM.

A sedimentation event records:

- retained features;
- altered features;
- omitted features;
- added uses;
- provenance preservation;
- contestability preservation.

Institutional persistence is therefore represented as a historical process, not as semantic stasis.

## 4. Semantic drift

The audit distinguishes:

- definition drift;
- scope drift;
- contrast-set drift;
- provenance loss;
- contestability loss;
- accumulated omissions;
- accumulated additions.

A concept may keep its label while its practical and inferential role changes substantially.

## 5. Historical persistence does not establish justification

The genealogy explicitly returns:

`justificationStatus = NOT_ESTABLISHED_BY_PERSISTENCE`

The firewall is:

```
historical persistence
!=
current justification
```

Formation can explain why a concept is inherited, familiar, institutionally embedded, or difficult to dislodge.

It does not by itself justify continuing to use it.

## 6. Cross-generation translation

Translation across historical versions can be:

- CONTINUITY_WITH_REMAINDER;
- PARTIAL_INHERITANCE;
- STRUCTURAL_ANALOGY;
- FALSE_FRIEND;
- NO_ADEQUATE_TRANSLATION.

This prevents a simple historical identity rule.

## 7. False friends

A false friend occurs when a later term resembles an earlier term closely enough to invite back-projection, while important features of the earlier concept have changed or disappeared.

The build therefore tracks:

`backProjectionRisk`.

This matters because historical interpretation can fail even when the same label appears across periods.

## 8. Formation/justification re-audit

The re-audit separates:

- evidence that a concept persisted;
- explanations of how it formed and sedimented;
- independent reasons for current use;
- current contestations.

The result always preserves:

`persistenceJustifiesCurrentUse = false`

and:

`independentJustificationRequired = true`.

A current use may still be justified, but that justification must come from reasons beyond inheritance alone.

## 9. Historical REOPEN

Historical REOPEN can be triggered by:

- SEMANTIC_DRIFT;
- PROVENANCE_LOSS;
- CONTESTABILITY_LOSS;
- TASK_CHANGE;
- NEW_EVIDENCE;
- CROSS_GENERATION_FALSE_FRIEND;
- CAPTURED_SEDIMENTATION.

REOPEN is not automatic repudiation of an inherited concept.

It is a requirement to re-examine whether the inherited version still fits the current task and warrant structure.

## 10. Provisional continuation

Inherited use may continue provisionally when reopening is warranted, unless the represented case includes especially serious failures such as:

- captured sedimentation;
- cross-generation false-friend risk.

This preserves practical continuity without treating continuity as justification.

## 11. Three-generation fixture

The test genealogy tracks a concept through:

1. origin-community formulation;
2. institutional policy adoption;
3. later training-manual use.

The policy version preserves important structure but reframes some of the original power analysis.

The later training version preserves the label/theme while reducing recurrence, power, provenance, and contributor history.

## 12. Cross-generation comparison

Origin -> policy is represented as:

`CONTINUITY_WITH_REMAINDER`.

Origin -> training is:

`PARTIAL_INHERITANCE`.

Training -> origin, when the later generic meaning is projected backward, is:

`FALSE_FRIEND`.

This prevents current institutional meaning from being treated as the original meaning.

## 13. Historical inheritance and institutional authority

A concept may become more authoritative because it is embedded in:

- policy;
- curriculum;
- professional practice;
- law;
- technical standards.

That increased practical authority is historically important.

It does not itself supply epistemic or moral justification.

This extends:

```
formation != justification
```

from individual belief and theory revision to institutional conceptual history.

## 14. Historical REOPEN and FSP

The historical return now becomes:

```
inherited concept
-> genealogy
-> sedimentation audit
-> cross-generation translation
-> current task
-> independent justification
-> REOPEN if needed
```

This connects the revision branch back to the broader PHIL-HIST architecture.

## 15. Human-validation boundary

Nothing in REVISION-7 changes TRANSLATION-12.

Human-validation status remains:

`PENDING`.

## 16. Research ceiling

The strongest current claim is:

> FSP can represent concept genealogies, semantic drift through institutional sedimentation, cross-generation translation and false-friend risk, while preserving the distinction between formation and justification and specifying when inherited concepts should be historically reopened.

It does not establish a complete theory of genealogy, intellectual history, or historical causation.
