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

## Slice 4 — Connections editing controls

Status: PASS.

Accepted behavior:

- connection endpoints must already exist in the map;
- relation type is chosen explicitly by the user;
- `PRACTICAL_POWER` and `AUTHORITY` remain separate;
- the UI does not infer a relation automatically;
- shared-task judgment is optional;
- `NONE_IDENTIFIED` is a valid first-class shared-task result;
- a shared task may include explicit outside-scope content;
- shared-task participants must already exist in the map;
- Investigate remains untouched;
- the kernel remains frozen.

Regression result: 44/44 tests green and browser build green on GitHub Actions run `41556033238`.

Accepted base for the next slice: Investigate editing controls for paths, unknowns, constraints, and information-generating next actions without ranking or recommendation.

## Slice 5 — Investigate editing controls

Status: PASS.

Accepted behavior:

- a path entered here is a possibility to investigate, not a score, ranking, recommendation, or prediction;
- path status remains descriptive rather than evaluative;
- unknowns are recorded explicitly;
- only existing constraints may be linked to a path;
- next actions created here are `INFORMATION_GENERATING`;
- Investigate does not create commitment actions;
- the UI states the possibility/recommendation/prediction firewall explicitly;
- Return remains untouched;
- the kernel remains frozen.

Regression result: 51/51 tests green and browser build green on GitHub Actions run `41559583753`.

Accepted base for the next slice: Return editing controls for bounded judgment, claim ceiling, remaining uncertainty, next action linkage, and REOPEN.

## Slice 6 — Return editing controls

Status: PASS.

Accepted behavior:

- Return records a current bounded judgment rather than final closure;
- current judgment and claim ceiling are both required;
- remaining uncertainty is preserved;
- "not claiming" may be recorded explicitly;
- next actions must already exist in the map;
- an optional REOPEN condition targets the current task/orientation;
- the Return points to the REOPEN item when one exists;
- the Output Card carries the bounded judgment, claim ceiling, selected next-action text, and REOPEN condition;
- a Return without REOPEN is still presented as a current judgment, not as permanently closed;
- H/S/F remains untouched;
- the kernel remains frozen.

Regression result: 57/57 tests green and browser build green on GitHub Actions run `41623591194`.

Accepted base for the next slice: H/S/F usability review and, only if the existing add-time H/S/F tagging is insufficient, a narrowly justified Change Gate decision.

## HSF-USABILITY-GATE-1

Status: PASS as an evaluation gate.

Result:

- stable multi-region representation is already supported by the node/claim data shape;
- add-time usable controls are insufficient because current interaction helpers force `S`;
- later H/S/F reclassification is not representable by the frozen action grammar;
- workaround strategies either leave stale machine state or break object identity;
- Change Gate criterion 3 is satisfied.

Classification: **MODEL FAIL + ADD-TIME UI FAIL**.

Regression result: 64/64 tests green and browser build green on GitHub Actions run `41626183556`.

Next step: specify the smallest admissible H/S/F reassignment amendment before implementing it.

## HSF-CHANGE-IMPL-1

Status: PASS.

The seventh view is now editable under the narrow contract earned by HSF-USABILITY-GATE-1 and frozen in HSF-CHANGE-SPEC-1.

Accepted behavior:

- eligible nodes and claims may be created with one or more H/S/F regions;
- S remains the default for low-friction continuity;
- H/S/F can later be reassigned without changing object identity;
- empty selections are rejected;
- duplicate selections normalize;
- stored order is canonical H,S,F;
- the H/S/F view is the primary reassignment surface;
- H/S/F wording describes inquiry relevance, not intrinsic temporal location;
- F remains explicitly separate from prediction and recommendation.

Regression result: 90/90 tests green and browser build green on GitHub Actions run `41632144985`.
