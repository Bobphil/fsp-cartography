# HSF Change-Gate Decision

Status: **OPEN — narrowly justified**

HSF-USABILITY-GATE-1 demonstrates a repeatable model-level blocker.

The kernel's current data types allow nodes and claims to carry multiple H/S/F regions, but the frozen action grammar cannot revise those regions after creation. This matters because H/S/F is task-relative relevance within an unfolding inquiry, not an immutable property of an object.

The gate therefore authorizes design work on a narrowly scoped H/S/F reassignment action. It does **not** authorize a generic edit action, automatic temporal inference, ranking, prediction, or expansion of H/S/F to additional object types without separate justification.

Before implementation, the next build should specify:

1. exact target types;
2. empty-set policy;
3. duplicate-region normalization;
4. unknown-target behavior;
5. invariant and reducer tests;
6. migration/regression implications;
7. interaction controls for add-time placement and later reassignment.

The existing 57-test baseline remains the protected floor.
