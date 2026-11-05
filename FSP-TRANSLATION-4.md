# FSP-TRANSLATION-4

## Out-of-Sample Perturbation Generator, Auxiliary-Network Sensitivity, Robustness Ablation, and False-Equivalence Detection

**Status:** Research robustness / adversarial detection layer  
**Boundary:** No Cartography-kernel change.

## 1. Purpose

TRANSLATION-3 showed that the underdetermination candidate could survive some evidence changes, fail under a task-relevant divergence, and require reopening when auxiliary support changed.

TRANSLATION-4 asks whether that result is too dependent on hand-authored perturbations.

The build therefore adds:

- a deterministic perturbation generator;
- a suite of out-of-sample perturbation specifications;
- explicit auxiliary-network sensitivity;
- ablation of auxiliary support nodes;
- false-equivalence detection when surface action agreement hides deeper divergence.

The goal is not to generate random noise. It is to expose the candidate result to a reproducible family of changes that were specified independently of the expected theorem status.

## 2. Out-of-sample perturbation grammar

The generator supports seven mutation types:

- ADD_SHARED_EVIDENCE
- ADD_PRF_SPECIFIC_EVIDENCE
- REMOVE_SHARED_EVIDENCE
- ALTER_AUXILIARY
- ADD_CONSEQUENCE
- ADD_ACTION
- REMOVE_ACTION

Each perturbation is explicit, deterministic, and provenance-bearing.

The generator does not infer which perturbation should preserve or break equivalence.

That judgment remains a downstream test result.

## 3. Why deterministic generation matters

A completely random generator would produce many semantically meaningless cases.

A hand-authored one-off case risks tuning the evidence to the theorem.

TRANSLATION-4 therefore uses a middle path:

> predeclare a small perturbation grammar and a fixed suite of perturbation specifications, then evaluate their consequences without changing the evaluator.

This does not solve the problem of out-of-sample validation completely, but it reduces direct outcome tuning.

## 4. Auxiliary network

Auxiliary assumptions are now represented as nodes in a directed support network.

Within each PRF, assumptions may support other assumptions or downstream task structures.

The first network is deliberately simple.

The important addition is the ability to ask:

> If this auxiliary assumption is removed, which visible task-level structures depend on it?

This creates a sensitivity test between hidden support and visible outcome.

## 5. Robustness ablation

For an auxiliary node A_i, ablation removes its support role conceptually and reports which task-relevant dimensions depend upon it.

An ablation is sensitive when at least one of the following is declared dependent:

- empirical commitments;
- practical constraints;
- predicted consequences;
- licensed actions.

The first build does not automatically recalculate the entire PRF.

It records dependency exposure.

A later build may replace declared dependency maps with generated inference networks.

## 6. False equivalence

TRANSLATION-2 and TRANSLATION-3 compare full task signatures.

TRANSLATION-4 adds an adversarial warning for a common practical shortcut:

> two parties chose the same action, therefore they agree.

That inference can be false.

Two PRFs may license the same action while differing in:

- empirical commitments;
- practical constraints;
- predicted consequences;
- auxiliary support;
- translation remainder.

The false-equivalence detector therefore treats surface action agreement as insufficient.

If actions match while any of these deeper dimensions differ, it reports:

**FALSE EQUIVALENCE DETECTED**

This is especially relevant for FSP-VR, where visually overlapping action paths could otherwise falsely imply convergence.

## 7. Out-of-sample suite

The first suite includes:

1. shared sediment evidence;
2. PRF-C-specific place testimony;
3. removal of a previously shared reversibility premise;
4. disputed ecological-model calibration;
5. a new compensation consequence for B;
6. a new restoration action for D;
7. removal of joint evidence review from A.

The suite is not preclassified.

The evaluator determines whether each perturbation:

- preserves the candidate;
- breaks task equivalence;
- requires reopening;
- produces a false-equivalence risk.

## 8. Auxiliary sensitivity questions

The ablation layer tests questions such as:

- Does A's ecological-model calibration assumption support empirical commitments, consequences, and licensed actions?
- Does C's intergenerational-obligation assumption support constraints and actions rather than empirical observations?
- Does B's title-preservation assumption affect practical constraints rather than the ecological evidence itself?

These distinctions matter because two PRFs may rely on very different support networks even when they temporarily produce the same action.

## 9. Stronger robustness criterion

The candidate underdetermination result should now be considered more robust only when:

1. the task signature remains equivalent;
2. the result survives multiple predeclared perturbation types;
3. no ablated auxiliary node reveals a hidden dependency that would alter task equivalence without reopening;
4. surface action agreement is not masking deeper divergence.

This is substantially stronger than a single static equivalence test.

## 10. False-equivalence firewall

The following inference is prohibited:

```
same licensed action
therefore
same task-relevant representation
```

Instead:

```
same action
+
compare evidence
+
compare constraints
+
compare consequences
+
compare auxiliaries
+
compare remainder
```

Only after those comparisons may local equivalence be considered.

## 11. Relationship to FSP-VR

This build gives VR an important warning mechanism.

Two agents may walk toward the same cooperative action in the shared task space.

VR should not merge their paths.

The system can preserve:

- distinct color/line histories;
- different evidence chains;
- different auxiliary supports;
- visible untranslated remainder;
- different reasons for entering the same action.

The learner can therefore see:

> behavioral convergence does not entail ontological, evidential, or justificatory convergence.

Likewise, removing one auxiliary assumption can make a previously stable path flicker, weaken, or trigger REOPEN.

That could make Duhem-like dependence experientially visible.

## 12. Research ceiling

TRANSLATION-4 still does not provide genuinely autonomous hypothesis generation.

The perturbation grammar and suite are human-designed.

The dependency map is declared rather than inferred.

Therefore the correct claim is:

> the underdetermination candidate has survived a broader, predeclared perturbation and ablation regime.

It has not yet survived independent corpus-scale or externally generated challenges.

Recommended next research direction:

> test the same formalism on a second domain with different native structure, then compare which primitives survive without modification.
