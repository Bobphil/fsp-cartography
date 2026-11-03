# HSF-CHANGE-SPEC-1

## Status

Design specification only. No kernel implementation is authorized by this document alone.

This spec narrows the Change Gate opened by HSF-USABILITY-GATE-1 to the smallest admissible H/S/F reassignment capability.

## 1. Philosophical contract

H/S/F is a task-relative relevance map over an unfolding inquiry.

It is not:

- an intrinsic metaphysical property of the object;
- a timestamp;
- a claim that H is merely past, S exhausts the present, or F predicts the future;
- a ranking, recommendation, probability, or commitment;
- a substitute for provenance, verification, identity, privacy, or causal explanation.

A continuing object may change its H/S/F relevance without changing what object it is.

## 2. Minimal action contract

Proposed action:

```ts
{
  type: "HSF_SET";
  targetType: "NODE" | "CLAIM";
  targetId: string;
  regions: HSFRegion[];
}
```

No generic edit action is introduced.

## 3. Target-type boundary

Eligible:

- `NodeState`
- `ClaimState`

Not eligible in this amendment:

- `TaskState`
- `ConnectionState`
- `PathState`
- `ConstraintState`
- `SharedTaskState`
- `InquiryActionState`
- `AuthorialReturn`
- `ReopenItem`
- `OutputCardState`
- Coach records
- rejected interpretations
- map changes

Reason: only nodes and claims currently carry an `hsf` field in the frozen schema. Extending H/S/F to other object types would be a separate model change and requires separate evidence.

## 4. Empty-set policy

`regions` must contain at least one valid H/S/F region.

Therefore:

```ts
[]
```

is invalid.

Rationale: H/S/F expresses where an object is relevant in the current inquiry. An object with no H/S/F relevance should not silently remain an active H/S/F-bearing object with an empty relevance relation. If later work requires an explicitly "not currently placed" state, that should be represented intentionally rather than smuggled in through an empty array.

The UI must therefore prevent saving with no region selected.

The kernel action itself should also reject an empty normalized region set.

## 5. Valid values

Only:

- `"H"`
- `"S"`
- `"F"`

are valid.

TypeScript supplies compile-time protection, but reducer/runtime handling must not assume all callers are type-safe.

An invalid runtime region value should cause the action to be rejected with an error rather than silently stored.

## 6. Duplicate normalization

Input may contain duplicate valid regions because runtime callers are not guaranteed to be canonical.

Examples:

```
["S", "H", "S"]
["F", "F"]
```

The reducer must normalize duplicates away before comparison/storage.

Canonical stored order:

```
H, S, F
```

Thus:

```
["S","H","S"] -> ["H","S"]
["F","H"] -> ["H","F"]
["S","F","H"] -> ["H","S","F"]
```

Canonicalization reduces representational noise without changing semantics.

## 7. Unknown-target behavior

Unknown target IDs are exact no-ops.

This follows the existing reducer policy for missing-target mutations such as `CLAIM_RECLASSIFY`, `PATH_ACCEPT`, and `CONSTRAINT_SET_STATUS`.

Therefore:

- unknown node target -> return original state object;
- unknown claim target -> return original state object;
- version must not bump;
- no persistence write should occur through the interaction controller because state identity is unchanged.

This is intentionally different from malformed action payloads such as invalid or empty region sets, which should throw.

## 8. Same-value behavior

If normalized regions are already exactly equal to the target object's stored canonical H/S/F set, the action is an exact no-op.

Consequences:

- no new state object;
- no version bump;
- no persistence write;
- no MapChange automatically generated.

A separate user-confirmed MapChange may later be useful as reflective provenance, but HSF_SET itself remains a narrow state mutation.

## 9. Reducer semantics

Pseudo-code:

```ts
case "HSF_SET": {
  const regions = normalizeAndValidate(action.regions);

  if (action.targetType === "NODE") {
    const target = state.nodes.find(n => n.id === action.targetId);
    if (!target) return state;
    if (sameRegions(target.hsf, regions)) return state;

    return bump({
      ...state,
      nodes: state.nodes.map(n =>
        n.id === action.targetId ? { ...n, hsf: regions } : n
      )
    });
  }

  const target = state.claims.find(c => c.id === action.targetId);
  if (!target) return state;
  if (sameRegions(target.hsf, regions)) return state;

  return bump({
    ...state,
    claims: state.claims.map(c =>
      c.id === action.targetId ? { ...c, hsf: regions } : c
    )
  });
}
```

The reducer must not read the clock, browser, persistence, or network.

## 10. Preservation contract

For a node reclassification, all of the following must remain unchanged:

- `id`
- `nodeType`
- `label`
- `relevance`
- `privacy`
- `createdBy`
- `archived`

For a claim reclassification, all of the following must remain unchanged:

- `id`
- `subjectId`
- `text`
- `claimType`
- `verification`
- `privacy`
- `archived`

Only `hsf` may change.

## 11. Invariant additions

The invariant suite should enforce for every node and claim:

1. H/S/F array is non-empty.
2. Every value is one of H/S/F.
3. No duplicate values.
4. Stored order is canonical H,S,F.

This makes persistence and direct fixture construction subject to the same contract as reducer-driven changes.

## 12. Migration / compatibility policy

Existing valid persisted CODE-0.1 maps already contain non-empty valid H/S/F arrays on nodes and claims in the current fixtures and interaction-created objects.

No schema-version bump is required if the shape remains `HSFRegion[]`.

However, loading persisted state must now reject any noncanonical or invalid H/S/F state unless we deliberately add a normalization migration.

For CODE-0.1 prototype discipline, the recommended policy is:

- reducer normalizes action input;
- interaction layer creates canonical arrays;
- persistence invariant check rejects invalid/noncanonical stored state;
- no silent load-time migration in this patch.

A migration layer should be added only if real persisted user data demonstrates the need.

## 13. Interaction design — add-time placement

People and Institution creation controls should no longer hard-code `["S"]`.

Each eligible creation form should include:

> **Where is this relevant in your map?**

Checkboxes:

- Historical / inherited
- Situated / current
- Forward / possible

At least one must be selected.

Supporting text:

> These mark where something matters in this inquiry. They do not say when it "really exists," whether a future event will occur, or whether a possibility is recommended.

Default policy:

- default to `S` selected for low-friction continuity;
- make H and F visible and directly selectable;
- do not infer additional regions automatically.

Person-claim creation uses the same selector.

## 14. Interaction design — later reassignment

The H/S/F view should become the primary reassignment surface.

For each H/S/F-bearing node or claim, show:

- object label/text;
- object type;
- current H/S/F regions;
- editable H/S/F checkboxes;
- Save only when the normalized selection differs from stored state.

Wording:

> **Update where this is relevant in your inquiry**

The interface should never say "move this into the future" or "this belongs to history" because that suggests intrinsic temporal placement.

## 15. Interaction controller contract

A narrow helper may be added:

```ts
setHSF(
  targetType: "NODE" | "CLAIM",
  targetId: string,
  regions: HSFRegion[]
): FSPMapState
```

It should only dispatch `HSF_SET`.

Creation helpers may accept optional/required `regions` arguments and normalize them through the same shared interaction utility.

The controller must not infer H/S/F from text.

## 16. Required reducer tests

At minimum:

1. node S -> H+S;
2. claim S -> S+F;
3. claim S+F -> S;
4. H+S+F allowed;
5. duplicate input normalizes;
6. canonical ordering enforced;
7. empty input throws;
8. invalid runtime region throws;
9. unknown node no-op;
10. unknown claim no-op;
11. same-value node no-op;
12. same-value claim no-op;
13. node preservation contract;
14. claim preservation contract;
15. F reassignment adds no probability/recommendation fields.

## 17. Required invariant tests

At minimum:

1. valid canonical node H/S/F passes;
2. valid canonical claim H/S/F passes;
3. empty node H/S/F fails;
4. empty claim H/S/F fails;
5. duplicate node H/S/F fails;
6. duplicate claim H/S/F fails;
7. noncanonical ordering fails;
8. invalid runtime value fails.

## 18. Required interaction tests

At minimum:

1. add self with H+S;
2. add other with S+F;
3. add institution with H+S+F;
4. add person claim with selectable H/S/F;
5. reassignment helper dispatches same-object change;
6. no selection rejected;
7. H/S/F presenter shows current regions;
8. reassignment wording preserves relevance-not-intrinsic-time framing.

## 19. Regression obligations

All existing 64 tests remain the protected floor.

Implementation acceptance requires:

- all existing tests green;
- all new reducer/invariant/interaction H/S/F tests green;
- browser build green;
- no unrelated kernel behavior changes;
- Maya, Leila, and Jordan acceptance journeys remain green.

## 20. Non-goals

This amendment does not add:

- H/S/F to paths, constraints, returns, actions, or connections;
- automatic H/S/F inference;
- temporal reasoning;
- prediction;
- ranking;
- recommendation;
- ontology of time;
- event chronology;
- generic object editing;
- deletion or archival behavior.

## 21. Implementation decision

HSF-CHANGE-SPEC-1 recommends proceeding to implementation because:

1. the Change Gate was earned by repeatable model failure;
2. the amendment is narrower than a generic edit mechanism;
3. the existing schema already carries the needed field;
4. the change preserves identity and all other typed distinctions;
5. the regression obligations are explicit enough to detect semantic drift.

Recommended next build:

**HSF-CHANGE-IMPL-1 — HSF_SET Action, Canonical Normalizer, Invariants, Reducer Preservation Tests, Add-Time Selectors, H/S/F Reassignment Controls, and Full Regression Gate.**
