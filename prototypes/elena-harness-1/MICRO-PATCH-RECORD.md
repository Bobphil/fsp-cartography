# FSP-VR-ELENA-HARNESS-1 — Micro-Patch Record

## Patch policy
Only patch observed implementation or perception failures. Do not expand the constitutional vocabulary during prototype hardening.

## P0 — Initial executable baseline
- 12 frozen fixtures implemented.
- Deterministic reducer implemented.
- Constitutional invariant checker implemented.
- Plain 2D/2.5D browser UI implemented.
- Framework-naive post-trial instrument embedded.

## P1 — Direct sedation authorization blocked in reducer
**Reason:** A UI-only block would be cosmetically safe but constitutionally weak; an alternate caller could still grant the action.
**Patch:** Reducer allows `monitoring` and `transfer` from the current prototype pathway but refuses direct `sedation` licensing.
**Invariant:** Prediction/threshold pathway cannot silently become sedation authorization.

## P2 — Fit/Misfit requires Authorial Return
**Reason:** Fit/Misfit makes no constitutional sense if the representation has not been returned to the represented person.
**Patch:** Invariant fails when a Fit/Misfit state exists before `AUTHORIAL_RETURN`.

## P3 — Recomposition requires selective recovery
**Reason:** A RECOMPOSE button without recovery requirements would reduce REOPEN to a decorative transition.
**Patch:** Required recovery set: corrected lab value, model contribution, independent clinical evidence, authorization rationale, consequence.
**Invariant:** Recomposition before the required set is a failure.

## P4 — Return stages do not auto-progress
**Reason:** The central external-regression lesson is Presence ≠ Uptake ≠ Revision ≠ Recomposition.
**Patch:** Return stage is a single explicit reducer field changed only by user action.

## Deferred patches pending actual browser observation
- P5 Crossing animation may be too weak to communicate status transformation.
- P6 Standing mode may be read as ranking despite non-scalar implementation.
- P7 Authorial Return may be mistaken for consent alone.
- P8 — APPLIED after browser observation (see below).
- P9 REOPEN selection may require clearer “relevant vs merely available” guidance.

No deferred patch is authorized until an observed failure justifies it.

## P8 — Sedimentation requires visible infrastructural embedding
**Observed failure:** In the first Chromium run, State 10 rendered `Workflow sediment` as an ordinary peer card. The label stated sedimentation, but the visual form did not communicate increasing embedding/default.
**Patch:** Add a restrained layered-card shadow to the sediment node and explicitly mark it as increasingly embedded.
**Scope:** Perceptual only; no reducer/state semantics changed.

## P10 — Consequential Return stage layout overflow
**Observed failure:** In the first Chromium run at 1440×1050, State 11 stacked all four Return-stage cards in the provenance column, causing `REVISION` to collide with the explanation band and obscuring the stage sequence.
**Patch:** Freeze a three-row layout: Presence (row 1), Uptake (row 2), Revision (row 3) in the provenance column; Consequential Return in the active field; Recomposition beside Revision.
**Scope:** Layout only; Return stages remain explicit reducer states and do not auto-progress.

## P11 — Standing-mode null state mislabeled
**Observed failure:** In the Chromium standing-field screenshots, after selecting `decision`, actors without decisional standing still displayed `Select a standing mode`, falsely implying the toggle had not been activated.
**Patch:** When a standing mode is active but an actor has no standing in that mode, display `No <mode> standing in this view`. Preserve the actor rather than removing it.
**Scope:** Labeling only; standing remains non-scalar and task-relative.
