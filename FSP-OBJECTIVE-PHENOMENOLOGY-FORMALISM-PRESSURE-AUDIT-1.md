# FSP-OBJECTIVE-PHENOMENOLOGY-FORMALISM-PRESSURE-AUDIT-1

## Detection, Information, Access, Remainder, Constraint Typing, Active Sensing, Translation Topology, and Cross-Perspectival Calibration

**Status:** FORMALISM-PRESSURE AUDIT — VERSION 1
**Role:** Audit the draft essay *Knowing More Without Becoming the Bat* for places where ordinary prose performs distinctions or inferential work not yet carried by explicit FSP formal objects.
**Primary purpose:** Decide whether each pressure point requires ADD, MERGE, SUBTYPE, DOMAIN-LOCAL, or exposition-only clarification.
**Primary claim ceiling:** This audit proposes candidate objects; it does not canonize them.

# 1. Audit Rule

- **ADD** — the essay depends on a relation FSP cannot yet explicitly represent.
- **MERGE** — several overlapping FSP objects should be consolidated.
- **SUBTYPE** — an existing parent object is adequate but needs typed variants.
- **DOMAIN-LOCAL** — keep the object inside Objective Phenomenology until portability is shown.
- **EXPOSITION** — formalism is adequate; prose needs clarification.

> **Do not add an object merely because a sentence can be formalized. Add only when losing the distinction changes what can be represented, tested, or governed.**

# 2. Major Audit Result

The extended FSP formalism is strongest from evidence onward:

    EVIDENCE → REPRESENTATION → TRANSLATION → CONSTRAINT → REMAINDER

The bat essay pressures an earlier layer:

    WORLD RELATION
    → INFORMATION-BEARING RELATION
    → ACCESS
    → REGISTRATION / DETECTION
    → DISCRIMINATION
    → SALIENCE / TASK RELEVANCE
    → ACTIONABILITY
    → EVIDENCE

The present formalism sometimes compresses this into `sensoryAccess`, `E_i(W)`, or `detectableRelations`. That compression is now inadequate.

# 3. Information

## Pressure

The essay uses 'information' for acoustic structure, computationally recoverable structure, action-guiding structure, and scientific evidence. These are not the same.

## Decision

**ADD — `InformationRelation`**

    InformationRelation = {
      targetRelation, carrier, differencePattern, receiverOrPotentialReceiver,
      taskOrQuery, scale, timeWindow, reliability, counterfactualSensitivity,
      accessibilityConditions, claimCeiling
    }

## Provisional definition

> **Information, for FSP purposes, is a receiver- and task-relative relation in which differences in a carrier reliably constrain possible states of a target or inquiry-relevant variable under specified conditions.**

Information does not by itself imply meaning, awareness, interpretation, or evidence.

> **Information-bearing relation ≠ evidence.**
> **Information availability ≠ information uptake.**
> **Information ≠ meaning by default.**

# 4. Access

## Pressure

The bat, microphone, computer, and human scientist can all be said to have 'access,' but in different senses.

## Decision

**ADD — `AccessRelation`**

    AccessRelation = {
      accessor, target, route, channel, mediation, mode, conditions,
      temporalWindow, spatialScale, resolution, latency, activeOrPassive,
      dependenceOnAction, dependenceOnHistory, transformationApplied,
      reliability, accessLimit, provenance, claimCeiling
    }

## Provisional definition

> **Access is a bounded relation by which a specified system can become causally, functionally, representationally, or evidentially responsive to some aspect of a target through a stated route under stated conditions.**

Access must be indexed:

    Access(accessor, target, route, conditions, time)

> **Access ≠ possession.**
> **Access ≠ awareness.**
> **Access ≠ understanding.**
> **Access to a representation ≠ access to the represented thing in the same way.**

# 5. Access Modes

## Decision

**SUBTYPE — `AccessRelation.mode`**

Initial modes:

    DIRECT_SENSORY
    ACTIVE_SENSORY
    INSTRUMENT_MEDIATED
    COMPUTATIONAL_MEDIATED
    TESTIMONIAL
    ARCHIVAL
    MODEL_MEDIATED
    INTERVENTION_GENERATED

A bat can have ACTIVE_SENSORY access to echo relations; a microphone can register ultrasonic variation; a human scientist can have instrument-mediated epistemic access to the recording. These are not equivalent.

> **Same target ≠ same route of access.**

# 6. Detection

## Pressure

'Detectable,' 'detected,' and 'detection capability' currently slide together. Detection by an organism, detector, and instrument is also treated too loosely.

## Decision

**ADD — `DetectionRecord`** with typed detectability / event / capability statuses.

    DetectionRecord = {
      detector, targetFeature, accessRelation, signalOrCarrier, criterion,
      baseline, response, sensitivity, falsePositiveRate, falseNegativeRate,
      conditions, time, evidence, consciousStatus, claimCeiling
    }

## Provisional definition

> **Detection is criterion-relative registration: a system counts as detecting a target feature when its state or output changes in a reliably target-dependent way under specified conditions and relative to an explicit response criterion.**

> **Detection ≠ conscious awareness.**
> **Detection ≠ discrimination among alternatives.**
> **Detection event ≠ stable detection capability.**
> **Detector response ≠ evidence until entered into inquiry with provenance and warrant.**

# 7. Discrimination

## Decision

**ADD — `DiscriminationRecord`**

    DiscriminationRecord = {
      discriminator, alternatives, accessRelations, relevantFeature, task,
      criterion, performance, errorStructure, generalization, contextDependence,
      learningHistory, evidence, claimCeiling
    }

> **Discrimination is reliable differential responsiveness among at least two task-relevant alternatives.**

> **Detection ≠ discrimination.**
> **Discrimination ≠ human-like categorization.**
> **Discrimination ≠ phenomenal contrast by itself.**

# 8. Actionability

Actionability depends on task, capabilities, response repertoire, constraints, and timing.

## Decision

**MERGE** with the existing Transformation Architecture rather than create a separate sensory theory.

Use the relation:

    DiscriminationRecord
    + CapabilityProfile
    + Task
    + ResponseRepertoire
    + ConstraintProfile
    → actionability

> **Discriminable ≠ actionable.**
> **Actionable ≠ selected.**
> **Actionable ≠ successful.**

# 9. Signal and Carrier

## Decision

**SUBTYPE under `InformationRelation` — `CarrierSignal`**

    CarrierSignal = {
      physicalOrSymbolicCarrier, source, targetRelation, encodingOrTransformation,
      temporalStructure, spatialStructure, noise, receiverConditions, provenance
    }

> **Carrier ≠ content.**
> **Signal ≠ evidence.**
> **Signal presence ≠ receiver access.**

# 10. Evidence

FSP already has a strong `EvidenceRecord`, but the essay sometimes moves directly from signal to evidence.

## Decision

**EXPOSITION + SUBTYPE field extension.**

A signal becomes evidence only relative to a claim or inquiry and only when provenance, reliability, and inferential role are represented.

Suggested `evidentialRole`:

    supports | weakens | discriminates | calibrates | revealsRemainder | generatesHypothesis

> **Data ≠ evidence without an inquiry relation.**

# 11. Participant Roles

## Pressure

The essay uses 'detector,' 'agent,' 'instrument,' 'model,' and 'investigator' in overlapping ways.

## Decision

**SUBTYPE — `ParticipantRole`**

    SENSOR | DETECTOR | DISCRIMINATOR | AGENT | INTERPRETER
    MODEL | INSTRUMENT | EXPERIMENTER | DECISION_MAKER

A system may occupy several roles.

> **Detector ≠ agent.**
> **Instrument ≠ epistemic subject.**
> **Contribution to inquiry ≠ possession of inquiry.**

# 12. Active Sensing

Static notation such as `D_i(W)` is inadequate for echolocation because action helps constitute later access.

## Decision

**ADD — `ActiveAccessLoop`**

    ActiveAccessLoop = {
      agent, worldState_t, action_t, emittedOrDirectedProbe, worldTransformation,
      returnSignal, accessUpdate, discriminationUpdate, nextAction,
      temporalResolution, historyDependence, evidence, claimCeiling
    }

Formal sketch:

    action_t → changed relation → return signal → detection → discrimination → action_t+1

> **Access need not precede action; action may constitute access.**

# 13. Assembly-History-Dependent Access

Learning, development, injury, adaptation, and prior environment can alter current discrimination.

## Decision

**MERGE** with existing `AssemblyTrace` and Transformation Architecture.

`AccessRelation` and `DiscriminationRecord` should reference relevant assembly traces.

> **Current access ≠ history-free access.**

# 14. Remainder

## Pressure

'Remainder' currently means too many things across FSP: missing evidence, translation loss, mechanism gap, model mismatch, scale mismatch, phenomenal opacity, normative disagreement, and more.

## Decision

**MERGE — create canonical-support `RemainderRecord`.**

    RemainderRecord = {
      id, sourceObject, targetObjectOrClaim, remainderType, description,
      causeKnown, currentExplanation, resolvabilityStatus, evidenceNeeded,
      translationNeeded, testNeeded, consequencesIfUnresolved,
      claimCeiling, reopenConditions
    }

Initial types:

    EMPIRICAL
    TRANSLATIONAL
    MODEL
    MECHANISTIC
    SCALE
    STRUCTURAL
    PHENOMENAL
    NORMATIVE
    AUTHORIZATION
    HISTORICAL
    UNKNOWN

> **Remainder ≠ ignorance simpliciter.**
> **Remainder type ≠ metaphysical status.**
> **Unresolved ≠ unresolvable.**

# 15. Objective-Phenomenology Remainders

The essay's tuple `<R_E, R_T, R_P>` is useful but should not become universal FSP remainder grammar.

## Decision

**DOMAIN-LOCAL SUBTYPES** of `RemainderRecord`:

    EMPIRICAL | TRANSLATIONAL | PHENOMENAL

# 16. Remainder Dynamics

The essay says remainder can shrink, partition, localize, or change type. Current REOPEN does not record this history.

## Decision

**ADD — `RemainderTransition`**

    RemainderTransition = {
      remainderBefore, interventionOrEvidence, operation, remainderAfter,
      resolvedPortion, newlyExposedPortion, typeChange, confidenceChange,
      provenance, claimCeiling
    }

Operations:

    NARROW | PARTITION | RECLASSIFY | RESOLVE | DEFER | EXPOSE_NEW | MERGE

# 17. Constraint

'Constraint' currently covers physical, sensory, behavioral, causal, phenomenal, and metaphysical work.

## Decision

**ADD — `ConstraintRecord`**

    ConstraintRecord = {
      id, constraintType, sourceEvidence, targetSpace, relationConstrained,
      operator, strength, scope, conditions, alternativesExcluded,
      alternativesRemaining, defeaters, uncertainty, provenance, claimCeiling
    }

Initial types:

    PHYSICAL | ACCESS | DETECTION | DISCRIMINATION | BEHAVIORAL
    CAUSAL | COMPUTATIONAL | STRUCTURAL_PHENOMENAL | METAPHYSICAL | NORMATIVE

Suggested strengths:

    EXCLUDES | REQUIRES | SUPPORTS | WEAKENS | BOUNDS | CALIBRATES | UNDERDETERMINES

> **Constraint type ≠ constraint strength.**
> **Empirical constraint ≠ metaphysical necessity.**

# 18. Candidate Phenomenal Structures

The essay uses `Phi_t` as a space of candidate phenomenal structures.

## Decision

**DOMAIN-LOCAL ADD — `PhenomenalModelSpace`**

    PhenomenalModelSpace = {
      candidates, equivalenceRelations, evidenceConstraints, excludedCandidates,
      liveAlternatives, underdeterminedDimensions, remainder, claimCeiling
    }

Exposition lock:

> **Represented candidate space ≠ total metaphysical possibility space.**

# 19. Translation Topology

Pairwise `TranslationRecord` is insufficient for chains such as:

    bat-relevant acoustic relation
    → microphone signal
    → digitized data
    → computational representation
    → human visualization

## Decision

**ADD — `TranslationTopology`**

    TranslationTopology = {
      nodes, translationEdges, preservedRelations, lossAtEdges, assumptionsAtEdges,
      composablePaths, nonComposablePaths, asymmetries, accumulatedRemainder,
      provenance, claimCeiling
    }

> **Pairwise translatability ≠ globally lossless translation.**
> **Composed translation ≠ identity preservation.**

# 20. Cross-Perspectival Calibration

Evidence Topology can record conflict, but the formalism lacks a process object for diagnosing conflict among behavioral, neural, ecological, and computational evidence.

## Decision

**ADD — experimental `CalibrationRecord` supporting Cross-Perspectival Calibration (RF-02).**

    CalibrationRecord = {
      evidenceChannels, sharedTarget, sharedTaskOrAnchor, relationTested,
      calibrationMethod, agreementPattern, disagreementPattern, dependencyAudit,
      scaleAudit, timingAudit, translationAudit, interventionResult, residualMismatch,
      updatedClaims, remainder, claimCeiling
    }

# 21. Shared Target

Different evidence streams may silently operationalize different targets.

## Decision

**ADD — `TargetBinding`**

    TargetBinding = {
      targetId, participantSpecificReferents, operationalizations, temporalAlignment,
      spatialAlignment, scaleAlignment, identityAssumptions, evidenceForBinding,
      ambiguity, claimCeiling
    }

> **Shared label ≠ shared target by default.**

# 22. Information Sufficiency

An artificial agent showing that a signal subset is sufficient for a task is stronger than showing the signal exists.

## Decision

**SUBTYPE — `TaskSufficiencyClaim` under ConstraintRecord.**

> **Task sufficiency in a model ≠ biological mechanism identity.**

# 23. First-Person and Other Evidence Types

## Decision

**SUBTYPE — `EvidenceRecord.sourceType`**

    FIRST_PERSON_REPORT
    BEHAVIORAL_OBSERVATION
    PHYSIOLOGICAL_MEASUREMENT
    NEURAL_MEASUREMENT
    ECOLOGICAL_OBSERVATION
    INSTRUMENTAL_MEASUREMENT
    COMPUTATIONAL_OUTPUT
    INTERVENTION_RESULT
    HISTORICAL_RECORD
    TESTIMONY

# 24. First-Person Report Is Itself Mediated

Experience → attention → conceptualization → memory → language → report.

## Decision

**RESEARCH-FRONTIER remainder, not a new Core object yet.**

> **First-person report ≠ unmediated phenomenal state.**

# 25. Functional Structure vs Phenomenal Structure

The essay needs a warrant for moving from behaviorally or functionally organized structure to phenomenal-structure claims.

## Decision

**DOMAIN-LOCAL unresolved problem + experimental `PhenomenalBridgeClaim`.**

    PhenomenalBridgeClaim = {
      sourceFunctionalOrBehavioralStructure, phenomenalTargetClaim, bridgePrinciple,
      comparatorSupport, evidence, alternatives, objections, claimCeiling
    }

> **Functional structure ≠ phenomenal structure by stipulation.**

# 26. Consciousness Attribution

## Decision

**DOMAIN-LOCAL subtype in ObjectivePhenomenologyDossier:**

    PhenomenalityStatus = assumedForArgument | independentlySupported | contested | withheld

Do not make this a general Core object yet.

# 27. Intrinsic Qualitative Character

## Decision

**EXPOSITION / CLAIM CEILING.**

FSP currently does not formalize intrinsic qualitative character itself.

> **Formal omission by design ≠ theoretical denial.**

# 28. Environmental Feature Binding

`W` can falsely suggest that the world arrives already partitioned into inquiry-ready variables.

## Decision

**MERGE into `TargetBinding`.**

> **World ≠ already-formatted variable set.**

# 29. Scale and Time Bridges

Acoustic microstructure, neural activity, behavior, and ecological navigation occur at different scales and windows.

## Decision

**EXPERIMENTAL SUBTYPE — `ScaleBridgeRecord`; add temporal-alignment fields to CalibrationRecord/TargetBinding.**

> **Cross-scale correlation ≠ explanatory identity.**

# 30. Experiment as Access Construction

Experiments do not only adjudicate hypotheses; interventions can create new epistemic access.

## Decision

**ADD fields to ExperimentProposal / ActiveAccessLoop:**

    accessCreated
    accessDestroyed
    newInformationRelation

> **Experiment ≠ only adjudication; experiment can construct epistemic access.**

# 31. Model Failure vs Translation Failure

## Decision

**SUBTYPE via RemainderRecord.**

Use MODEL versus TRANSLATIONAL rather than generic mismatch.

# 32. Objective

'Objective' can mean public, third-person, perspective-independent, or invariant. The paper should not slide among these.

## Decision

**EXPOSITION / DOMAIN-LOCAL definition:**

> **Objective = publicly inspectable and corrigible through evidence and method, not perspective-free.**

> **Objective ≠ view from nowhere.**

# 33. Phenomenal Vocabulary Lock

## Decision

**EXPOSITION / glossary lock:**

    PHENOMENALITY — whether there is something it is like
    PHENOMENAL STRUCTURE — relations within experience
    PHENOMENAL IDENTITY — intrinsic qualitative character
    PHENOMENAL CLAIM — a claim whose target is one of the above

# 34. Who Has Access?

Every access statement should answer:

    WHO?
    TO WHAT?
    BY WHAT ROUTE?
    UNDER WHAT CONDITIONS?
    AT WHAT SCALE?
    AT WHAT TIME?
    WITH WHAT TRANSFORMATION?
    FOR WHAT TASK?
    WITH WHAT LIMIT?

## Decision

**FORMAL STYLE RULE.**

No important sentence of the form 'X is accessible' should survive without an indexed accessor, target, route, and conditions.

# 35. Availability Status

Distinguish:

    PHYSICALLY_PRESENT
    POTENTIALLY_ACCESSIBLE
    ACTUALLY_REGISTERED
    DISCRIMINATED
    SALIENT
    ACTIONABLE
    EVIDENTIALLY_AVAILABLE

## Decision

**SUBTYPE / shared status vocabulary.**

# 36. Worked Bat / Instrument Example

If a microphone registers ultrasound that a human cannot hear:

- the microphone registers the carrier;
- the computational pipeline transforms the recording;
- the human gains mediated epistemic access to the representation;
- the human does not thereby gain bat-like direct sensory access;
- the bat may have active organism-relative access to echo relations.

Thus:

> **Instrument registration ≠ human direct detection.**
> **Human mediated access ≠ bat sensory access.**

# 37. Information-for-Whom Rule

Replace loose claims such as 'the echo contains information' with one of:

1. **Physical formulation:** variations in the echo reliably covary with specified environmental relations.
2. **Agent-relative formulation:** those variations are accessible to agent `i` under conditions `C` and can constrain task `T`.

# 38. Consolidated Definition Lock

## Information

> **A receiver- and task-relative relation in which differences in a carrier reliably constrain possible states of a target or inquiry-relevant variable under specified conditions.**

## Access

> **A bounded relation by which a specified system can become causally, functionally, representationally, or evidentially responsive to some aspect of a target through a stated route under stated conditions.**

## Detection

> **Criterion-relative registration in which a detector's state or output changes in a reliably target-dependent way under specified conditions.**

## Discrimination

> **Reliable differential responsiveness among at least two task-relevant alternatives.**

## Evidence

> **An information-bearing or observational record entered into an inquiry as bearing on a specified claim, with provenance, reliability, and inferential role represented.**

## Remainder

> **A typed, explicitly represented relation marking what is not yet carried, explained, translated, resolved, warranted, or authorized across a specified transition in inquiry.**

# 39. Revised Pre-Evidential Stack

Use:

    WORLD / TARGET RELATION
    ↓
    INFORMATION-BEARING RELATION
    ↓
    ACCESS RELATION
    ↓
    REGISTRATION / DETECTION
    ↓
    DISCRIMINATION
    ↓
    SALIENCE / TASK RELEVANCE
    ↓
    ACTIONABILITY
    ↓
    EVIDENCE CONSTRUCTION
    ↓
    REPRESENTATION
    ↓
    CONSTRAINT
    ↓
    PHENOMENAL BRIDGE CLAIM, if any
    ↓
    REMAINDER

With active sensing:

    ACTION
      ↘
       WORLD / TARGET RELATION
       → INFORMATION RELATION
       → ACCESS
       → DETECTION
       → DISCRIMINATION
       → NEXT ACTION

# 40. Disposition Summary

## ADD

1. `InformationRelation`
2. `AccessRelation`
3. `DetectionRecord`
4. `DiscriminationRecord`
5. `ActiveAccessLoop`
6. `RemainderTransition`
7. `ConstraintRecord`
8. `TranslationTopology`
9. `TargetBinding`
10. `CalibrationRecord` — EXPERIMENTAL / RF-02
11. `PhenomenalBridgeClaim` — DOMAIN-LOCAL / EXPERIMENTAL
12. `PhenomenalModelSpace` — DOMAIN-LOCAL

## MERGE

1. Generic remainder objects → `RemainderRecord`
2. Assembly-history-dependent access → `AssemblyTrace`
3. Actionability → Transformation Architecture
4. Salience → PRF / accessible-possibility grammar
5. World-feature identity → `TargetBinding`

## SUBTYPE

1. `AccessRelation.mode`
2. detection: detectability / event / capability
3. `EvidenceRecord.sourceType`
4. `ConstraintRecord.type`
5. `ConstraintRecord.strength`
6. `ParticipantRole`
7. `TaskSufficiencyClaim`
8. scale / temporal bridge fields
9. availability-status vocabulary

## DOMAIN-LOCAL

1. `PhenomenalModelSpace`
2. `PhenomenalBridgeClaim`
3. `PhenomenalityStatus`
4. foregrounded remainder types: empirical / translational / phenomenal

## EXPOSITION ONLY

1. Candidate phenomenal space is not exhaustive metaphysical possibility space.
2. Intrinsic qualitative character remains outside current formal representation.
3. Objective ≠ view from nowhere.
4. Inquiry system ≠ phenomenal subject.
5. Human mediated access ≠ bat direct sensory access.

# 41. Promotion Discipline

Likely canonical-support candidates after regression:

    InformationRelation
    AccessRelation
    DetectionRecord
    DiscriminationRecord
    RemainderRecord
    ConstraintRecord
    TargetBinding
    TranslationTopology
    ActiveAccessLoop

Remain experimental:

    CalibrationRecord
    ScaleBridgeRecord
    PhenomenalBridgeClaim
    PhenomenalModelSpace

# 42. Immediate Regression Sequence

First, encode one concrete echolocation episode:

    obstacle at distance d
    → echo-delay relation
    → InformationRelation
    → bat ActiveAccessLoop
    → DetectionRecord
    → DiscriminationRecord
    → actionability
    → behavioral EvidenceRecord
    → ConstraintRecord
    → PhenomenalBridgeClaim
    → RemainderRecord

Then separately encode:

    same bounded target
    → microphone registration
    → digitization
    → computational transformation
    → human visualization

using a `TranslationTopology`.

Then regress on medicine, telescope/astronomy, and institutional reporting.

# 43. Strongest Audit Result

The Nagel essay reveals that the extended FSP formalism currently begins **one layer too late**.

A mature translational formalism must represent how a relation in the world becomes available differently to different systems before it ever becomes evidence.

The missing sequence is:

> **world relation → information relation → access → detection → discrimination → salience → actionability → evidence**

The bat case forces this sequence into view because a bat, a microphone, a computer, and a human scientist can all participate in inquiry about one bounded target while possessing radically different forms and routes of access.

The new formal discipline should therefore be:

> **Never ask only 'What information is there?' Ask: information in what carrier, about what target, accessible to whom, by what route, under what conditions, detected by what criterion, discriminated for what task, and transformed into evidence for which claim?**

That is the principal augmentation demanded by the essay.

---

**FSP-OBJECTIVE-PHENOMENOLOGY-FORMALISM-PRESSURE-AUDIT-1**
**Status:** FORMALISM-PRESSURE AUDIT — VERSION 1
**Next disciplined move:** implement the minimal canonical-support candidate layer and run the bat/instrument regression before promoting any new Core object.