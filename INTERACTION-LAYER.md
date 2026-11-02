# CODE-0.1 Interaction Layer

This phase begins only after the CODE-0.1 regression gate passed.

## First slice

The first interaction-layer slice adds:

- a controller outside the kernel that dispatches existing actions;
- invariant checking after every interaction;
- persistence through the existing adapter;
- human-facing view presenters for all seven frozen views;
- a usable Start form for title, task/orientation status, task text, and default privacy;
- readable summaries and explicit empty states for People, Institution, H/S/F, Connections, Investigate, and Return.

## Boundary rule

No file under `src/kernel/` is changed by this slice.

The interaction layer may make existing state understandable and editable. It may not invent new kernel semantics merely because a UI control would be convenient.

## Next usability slices

The next slices should add direct editing controls, one view at a time, in this order:

1. People — self / my-map-of-other plus claim provenance;
2. Institution — institution plus constraint verification/rigidity;
3. Connections — connection type and optional shared-task judgment;
4. Investigate — paths, unknowns, information-generating actions;
5. Return — bounded judgment, claim ceiling, REOPEN;
6. H/S/F — only after we determine whether existing add-time H/S/F tagging is usable enough without adding a mutation action.

Each slice should run the full regression gate before the next one begins.

## Slice 1 status

PASS.

Regression result: 25/25 tests green, browser build green, frozen kernel untouched.

Accepted base for the next slice: People editing controls.
