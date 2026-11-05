# FSP-REVISION-9

## Institutional Repair Sequencing, Capability Tradeoffs Across Groups, Exit/Voice/Appeal Architecture, Repair Reversibility, and Multi-Generation REOPEN Governance

**Status:** Institutional repair-governance layer  
**Boundary:** REVISION-1 through REVISION-8 remain intact; TRANSLATION-12 human evidence remains PENDING.

## 1. Purpose

REVISION-8 identified institutional lock-in, repair windows, and cross-generational capability effects.

REVISION-9 asks the next question:

> Once a repair window opens, how should repairs be sequenced and governed when different groups gain, lose, or remain uncertain under the same change?

The build adds:

- typed repair sequences;
- group-specific capability tradeoffs;
- exit/voice/appeal auditing;
- repair reversibility;
- generation-indexed REOPEN governance.

## 2. Repair sequencing

Repairs are represented as ordered steps.

A step records:

- type;
- description;
- preconditions;
- reversibility;
- rollback conditions;
- affected groups.

Repair types include:

- INFORMATION;
- PROCEDURAL;
- POLICY;
- PRACTICE;
- RESOURCE;
- AUTHORITY;
- CAPABILITY.

The sequence is not a hidden recommendation system.

It returns:

`recommendation = null`.

## 3. Why sequencing matters

Some repairs should precede others.

For example:

```
evidence visibility
-> standing / appeal repair
-> policy revision
-> authority redistribution
```

may preserve more contestability than changing authority first and only later clarifying evidence.

REVISION-9 represents such dependencies explicitly through preconditions.

## 4. Capability tradeoffs across groups

A repair may:

- expand capability for one group;
- constrain another;
- generate mixed effects;
- leave important effects unknown.

The audit therefore remains group-specific.

It never calculates:

`aggregateNetScore`.

This prevents a large gain for one group from automatically cancelling a serious loss for another.

## 5. Pareto improvement

The audit may identify a limited Pareto-style improvement when:

- at least one group gains;
- no represented group loses;
- no represented group remains under material uncertainty.

This is a descriptive audit result, not a universal moral decision rule.

## 6. Distributional conflict

A repair has distributional conflict when represented gains and losses occur across different groups.

That conflict must remain visible.

The system may not say:

> total benefits exceed total costs, therefore repair is justified.

## 7. Exit

Exit is meaningful only when it is actually available and its costs are not represented as prohibitive, impossible, or severe.

Formal exit rights alone are therefore insufficient.

## 8. Voice

Voice is meaningful only when:

- a voice channel exists;
- the group can use it;
- severe retaliation does not make participation effectively unavailable.

## 9. Appeal

Appeal is meaningful only when:

- appeal exists;
- the reviewer is independent;
- severe retaliation does not undermine the process.

Exit, voice, and appeal are audited separately.

One cannot silently substitute for another.

## 10. Reversibility

Repair steps may be reversible or irreversible.

For reversible steps the audit tracks rollback conditions.

A reversible step supports institutional experimentation only when rollback remains genuinely available.

## 11. Irreversibility

An irreversible step, or a step carrying irreversible consequences, triggers:

`irreversibilityRequiresHigherEvidenceBurden = true`.

This does not make irreversible repair impermissible.

It means FSP should demand stronger justification before treating such a step as a low-risk experiment.

## 12. Test repair sequence

The fixture uses four steps:

1. publish provenance and disparity evidence;
2. restore voice, appeal, and minority-report preservation;
3. revise policy categories;
4. redistribute final review authority.

The later steps depend on earlier governance repairs.

This keeps institutional authority change downstream of evidence and standing repair.

## 13. Multi-generation REOPEN

Each generation can have an independent REOPEN rule.

A rule includes:

- triggers;
- groups whose standing is required;
- evidence review;
- capability review;
- minority-report review;
- ability to reopen.

This prevents one generation's approval from permanently binding future generations.

## 14. Future generations are not bound by original approval

The audit fixes:

`firstGenerationApprovalBindsFutureGenerations = false`.

A later generation may inherit benefits, burdens, or unforeseen effects that were unavailable to earlier participants.

It must retain standing to reopen the repair.

## 15. REOPEN continuity

Multi-generation REOPEN is continuous only when:

- every expected generation is covered;
- each rule permits reopening;
- evidence review remains required;
- capability review remains required;
- minority reports remain reviewable;
- at least one affected standing group is represented.

Missing generations break continuity.

## 16. Repair corrigibility

REVISION-9 therefore treats institutional repair as corrigible.

A repair is not successful merely because it was once adopted.

It must remain:

- reviewable;
- contestable;
- reversible where feasible;
- reopenable across generations.

## 17. Human-validation boundary

Nothing in REVISION-9 changes TRANSLATION-12.

Human-validation status remains:

`PENDING`.

## 18. Research ceiling

The strongest current claim is:

> FSP can represent institutional repair as an ordered, group-sensitive, corrigible process that preserves capability tradeoffs, audits meaningful exit/voice/appeal, distinguishes reversible from irreversible changes, and keeps REOPEN available across generations without collapsing repair into an aggregate optimization rule.

It does not establish a complete theory of institutional design, compensation, democratic legitimacy, or intergenerational justice.
