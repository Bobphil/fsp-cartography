# FSP-TRANSLATION-3

## Auxiliary-Assumption Perturbation, Evidence-Change Stress Test, Translation-Remainder Dynamics, and Underdetermination Robustness

**Status:** Robustness research layer  
**Boundary:** No Cartography-kernel change. No expansion of the basic translation vocabulary.

## 1. Purpose

TRANSLATION-2 established a candidate underdetermination result for one fixed task state.

TRANSLATION-3 asks the harder question:

> Does that result survive when the evidential environment and auxiliary assumptions change?

The build therefore treats underdetermination as a time-indexed, reopenable result rather than a permanent relation between two PRFs.

## 2. Why auxiliary assumptions matter

A task signature can appear equivalent because multiple frameworks are presently relying on different auxiliary assumptions that happen to support the same action.

New evidence may preserve the shared task signature, expose a previously hidden auxiliary divergence, alter a predicted consequence, change which actions are licensed, or enlarge/shrink translation remainder.

Therefore:

```
UNDERDETERMINATION_SUPPORTED at t0
```

does not imply:

```
UNDERDETERMINATION_SUPPORTED at all later t
```

The correct FSP behavior is temporal:

```
support -> perturb -> compare -> preserve or reopen
```

## 3. Evidence snapshots

A snapshot records:

- public evidence currently in play;
- each PRF's task-relevant structure;
- explicit auxiliary assumptions;
- directed translation attempts.

The point is not to freeze the PRF as a complete worldview. It is to preserve enough of the inquiry state to compare what changed.

## 4. Auxiliary-assumption comparison

For any PRF pair, the formalism records:

- shared auxiliary assumptions;
- assumptions unique to the left PRF;
- assumptions unique to the right PRF;
- whether the auxiliary sets are identical.

Difference is not itself a defect. The purpose is to reveal where apparently identical task behavior may depend on different support structures.

## 5. Translation-remainder dynamics

Remainder is no longer treated as static.

For each directed translation:

```
R^(T,t0)_(i->j) -> R^(T,t1)_(i->j)
```

the build records previous remainder, new remainder, additions, removals, and whether the remainder changed.

This lets FSP represent cases in which two frameworks become more or less mutually intelligible as evidence changes without either framework becoming identical to the other.

## 6. Robustness outcomes

TRANSLATION-3 adds only a temporal robustness classification:

- **ROBUST_UNDER_PERTURBATION** — the candidate result held before and after the perturbation and neither auxiliary support nor translation remainder changed in a way requiring reopening;
- **BROKEN_BY_TASK_RELEVANT_DIFFERENCE** — new evidence produces a difference in empirical commitments, constraints, consequences, or licensed actions;
- **REOPEN_AUXILIARIES** — the task signature still matches, but changed auxiliary assumptions or translation remainder require renewed scrutiny;
- **NOT_PREVIOUSLY_ESTABLISHED** — there was no supported candidate result at baseline.

These are research statuses, not metaphysical verdicts.

## 7. Perturbation A — convergent new evidence

Baseline evidence supports a shared watershed-protection signature.

New evidence appears:

> a nitrate spike is observed downstream after test clearing.

All four PRFs incorporate the same new public evidence into the same task-relevant signature.

Expected result:

> **ROBUST_UNDER_PERTURBATION**

The result is stronger than TRANSLATION-2 because equivalence survives a new evidence addition rather than existing only in a static fixture.

## 8. Perturbation B — divergent task consequence

New archival and oral-history evidence establishes, within C's PRF, that a spring is a non-substitutable ceremonial site.

C now adds a consequence:

> any commercial extraction at the sacred spring damages a non-substitutable relation.

and licenses an additional action:

> exclude the sacred spring zone from commercial extraction.

A does not derive that consequence from ecological evidence alone.

Expected result:

> **BROKEN_BY_TASK_RELEVANT_DIFFERENCE**

The formalism must not protect underdetermination by defining away evidence that differentiates frameworks.

## 9. Perturbation C — auxiliary uncertainty without current signature divergence

A regional erosion study raises doubt about whether a model generalizes to the local watershed.

The current practical signature remains provisionally unchanged, but A's auxiliary assumptions change and the A->C translation remainder grows.

Expected result:

> **REOPEN_AUXILIARIES**

This is the closest TRANSLATION-3 comes to the Duhem-style problem: evidence bears on a network of assumptions, and changed support conditions may require reopening before any proposition-level conclusion changes.

## 10. Stronger candidate theorem

TRANSLATION-3 supports a more disciplined schema:

> If ontologically non-identical PRFs preserve the same defined task-relevant signature across a specified class of evidential perturbations, and no changed auxiliary support or remainder becomes task-relevant, then task success across those perturbations still does not by itself license ontological uniqueness.

The phrase **specified class of perturbations** is essential.

No global robustness is claimed.

## 11. Falsification condition

The candidate underdetermination claim should weaken or fail when:

- new evidence creates a different predicted consequence;
- different auxiliary assumptions begin licensing different actions;
- one framework ceases to accept previously shared empirical commitments;
- translation remainder becomes task-relevant;
- a shared task must be reformulated to preserve cooperation.

Thus the formalism is designed to reveal when underdetermination ends.

## 12. Implication for FSP-VR

A learner should be able to revisit the same four-PRF scene at different times.

At t0, translation lines may overlap strongly.

At t1, new evidence can preserve shared action while leaving ontological difference intact.

At t2, one line can visibly diverge because a new consequence becomes salient within one PRF.

At t3, the visible action map may remain unchanged while the epistemic support underneath one route becomes unstable.

The learner would thereby experience that agreement, disagreement, remainder, and evidence are dynamic.

## 13. Research ceiling

TRANSLATION-3 still does not prove Duhem-Quine.

It establishes an executable framework for testing one Duhem-like insight:

> the standing of a task-level equivalence depends not only on visible claims but on changing auxiliary support structures.

Recommended next question:

> Can robust underdetermination be distinguished from temporary observational equivalence using out-of-sample perturbations rather than hand-authored ones?
