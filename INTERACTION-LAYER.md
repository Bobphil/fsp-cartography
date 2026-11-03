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

## Slice 2 — People editing controls

Status: PASS.

Accepted behavior:

- the user may add one self representation;
- another person is always added as "my map of this person";
- a person-related claim requires an explicit provenance choice;
- "They reported this" maps to `OTHER_REPORT`;
- "This is my inference" maps to `USER_INFERENCE`;
- provenance remains visible after the claim is saved;
- the People-specific claim control cannot target `SELF_PRF`;
- the kernel remains frozen.

Regression result: 31/31 tests green and browser build green on GitHub Actions run `41554882727`.

Accepted base for the next slice: Institution editing controls for institution representation plus constraint verification and rigidity.

## Slice 3 — Institution editing controls

Status: PASS.

Accepted behavior:

- an institution is represented only as `INSTITUTION`;
- institution representation remains separate from people;
- constraints are separate map objects;
- verification and rigidity are chosen independently;
- constraint scope is explicit;
- the UI does not invent an institution identifier on constraints because the frozen kernel has no such field;
- Connections and Investigate remain untouched;
- the kernel remains frozen.

Regression result: 37/37 tests green and browser build green on GitHub Actions run `41555738633`.

Accepted base for the next slice: Connections editing controls for typed connection relations plus optional shared-task judgment.
