# HSF-USABILITY-GATE-1

## Purpose

This gate asks whether the frozen CODE-0.1 representation of H/S/F is adequate for the kind of temporally extended, situated, revisable mapping required by FSP's thin metaphysics of Doing.

It is an evaluation build, not an H/S/F feature build. No file under `src/kernel/` is modified by this gate.

## Phenomenological / Doing interpretation

H/S/F should be read as a relation between an object in the map and the current inquiry, not as an intrinsic metaphysical property of the object.

- **H — Historical / inherited:** relevant because prior formation, sedimentation, path-dependence, remembered history, inherited structure, or earlier Doing bears on the current inquiry.
- **S — Situated / current:** relevant within the present configuration of agents, institutions, constraints, claims, and capacities.
- **F — Forward / possible:** relevant to live possibilities, prospective consequences, opened or foreclosed arcs, or future-directed inquiry.

The regions are non-exclusive. One map object may legitimately be H+S, S+F, H+F, or H+S+F.

The regions are also revisable. Inquiry may disclose historical relevance that was not initially visible, or forward relevance may emerge or recede without changing the object's identity, content, provenance, verification, privacy, or other typed properties.

### Firewalls

H/S/F placement must not imply:

- H = merely a past fact;
- S = an objective or exhaustive description of the present;
- F = prediction, probability, recommendation, inevitability, or commitment;
- change of region = change of object identity;
- change of region = change of claim provenance or verification.

## Evaluation question

> Can a user accurately maintain H/S/F relevance over the life of an inquiry using the frozen add-time representation alone, without stale tags, duplicate objects, or prose that contradicts machine state?

## Four journeys

### Journey A — Stable multi-region placement

A user recognizes immediately that a family employment history is both inherited and presently relevant.

Required representation: the same object may be H+S at creation.

This journey tests representational capacity at creation time.

### Journey B — Newly discovered historical relevance

A claim initially appears purely situated: "Tuition is too expensive."

Later inquiry discloses that a family history of debt is materially shaping how the tuition question is understood.

Required transition: S -> H+S on the same claim.

Identity, text, provenance, verification, and privacy must remain unchanged.

### Journey C — Forward relevance emerges later

A current institutional fact begins as situated: "My college does not offer this program."

Later inquiry shows that it also structures future transfer options.

Required transition: S -> S+F on the same mapped object.

The forward marker must not imply a prediction.

### Journey D — Forward relevance is withdrawn or revised

A mapped claim is initially S+F because it appears to structure a live future possibility. New information removes that future relevance while the claim itself remains in the inquiry.

Required transition: S+F -> S on the same object.

The object must not be deleted, duplicated, or silently rewritten merely to change its temporal/inquiry relevance.

## Workaround audit

Each available workaround is judged against identity continuity, machine-state truthfulness, provenance preservation, and usability.

| Workaround | Result | Reason |
|---|---|---|
| Leave original H/S/F unchanged | FAIL | Produces stale machine state once inquiry changes. |
| Add explanatory MapChange prose | FAIL | Records that the map changed without changing the object's H/S/F field. |
| Add Return / REOPEN prose | FAIL | Preserves reflexive narrative but leaves the object's H/S/F state unchanged. |
| Duplicate the object with a new ID and new H/S/F | FAIL | Breaks identity continuity and creates two map objects for one continuing object. |
| Delete/recreate object | FAIL | No delete action exists, and recreation would break continuity/provenance links. |
| Improve labels/selectors only | PARTIAL | Can repair add-time UI but cannot support later reclassification. |

## Classification criteria

- **PASS:** add-time tagging accurately supports the journeys without semantic distortion.
- **UI FAIL / MODEL PASS:** representation is adequate but current interaction controls make correct use difficult.
- **MODEL FAIL:** a repeatable inquiry transition cannot be represented without stale state, duplication, or semantic distortion.

## Gate decision

**MODEL FAIL, with an additional UI-level failure at creation time.**

Evidence:

1. `NodeState` and `ClaimState` can store multiple H/S/F regions, so the data shape itself supports multi-region placement.
2. Current interaction controls create relevant nodes and person claims with `hsf: ["S"]`, so users cannot currently choose H/S/F at creation through the usable interface.
3. The frozen action grammar contains no action that changes the H/S/F set of an existing node or claim.
4. MapChange, Return, and REOPEN can describe a changed understanding but cannot make the machine-readable H/S/F state reflect it.
5. Reclassification is required by Journeys B-D while object identity and other properties remain stable.

Therefore the blocker satisfies Change Gate criterion 3: **required to repair a repeatable usability blocker**, and more specifically exposes a representational mutation gap.

## Narrow change justified by this gate

The gate justifies considering one narrowly scoped kernel capability:

```
HSF_SET
  targetType: NODE | CLAIM
  targetId: string
  regions: HSFRegion[]
```

Required semantics:

- change only the target object's `hsf` set;
- preserve ID, text/label, provenance, verification, privacy, archived state, and every unrelated field;
- reject or no-op unknown targets consistently with existing reducer policy;
- permit multiple regions;
- prohibit duplicate region values;
- require at least one region unless a later explicit decision justifies an empty relevance set;
- never infer probability, recommendation, ranking, or commitment from F.

This document does not implement that action. It only records that the Change Gate has been earned.
