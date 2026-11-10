# FSP-RECURSIVE-SCALE-ARCHITECTURE-1.1

## ScaleKind Typing, RelationDomain Separation, Emergence Optionality, Bridge-Burden Ledger, and Core-Promotion Reconciliation

**Status:** RECONCILIATION / CORE-PROMOTION CANDIDATE — VERSION 1.1
**Parent:** FSP-RECURSIVE-SCALE-ARCHITECTURE-1
**Evidence base:** FSP-RECURSIVE-SCALE-REGRESSION-1 four-case portability test.
**Primary purpose:** Incorporate the four-case regression results into the recursive-scale architecture, add the minimum controls required by the regression, and distinguish which objects are now strong Core/canonical-support candidates from those that should remain optional, experimental, or domain-local.
**Primary claim ceiling:** Passing four heterogeneous cases supports portability of a relation grammar, not a universal ontology of scale, emergence, causation, or explanation.

# 1. Reconciliation Result

The four-case regression passed across:

- bat echolocation;
- planaria adaptation/regeneration;
- DESI astronomical measurement;
- institutional reporting/control.

The strongest result was not that all four cases shared one mechanism.

It was that the same typed relation grammar remained useful while:

- emergence was central in some cases and absent in others;
- recursion occurred in the target system, inquiry system, or both;
- detection could be biological, instrumental, or functional;
- access could be sensory, mediated, computational, or institutional;
- evidence bridges carried different burdens across domains.

> **Portability of relation grammar ≠ identity of ontology.**

# 2. ScaleKind Typing

The regression showed that 'scale' cannot mean only biological or compositional level.

## Decision

**ADD — `ScaleKind`**

    ScaleKind = {
      PHYSICAL,
      ORGANIZATIONAL,
      TEMPORAL,
      SPATIAL,
      REPRESENTATIONAL,
      INSTITUTIONAL
    }

Every `ScaleRelation` should identify the relevant scale kind when ambiguity matters.

Examples:

- bat receptor → organism navigation: ORGANIZATIONAL + PHYSICAL;
- DESI detector → spectrum → redshift catalog: PHYSICAL + REPRESENTATIONAL;
- local reports → management metric: INSTITUTIONAL + REPRESENTATIONAL;
- regeneration history → present response: TEMPORAL + ORGANIZATIONAL.

> **Scale label without scale kind may hide incompatible relations.**

# 3. Scale Is Still an Aperture

`ScaleKind` does not convert scale into a fixed ontology.

> **ScaleKind ≠ ontological level taxonomy.**

> **Scale partition ≠ uniquely correct decomposition of the world.**

The aperture remains inquiry-relative and claim-relative.

# 4. RelationDomain Separation

The regression showed that recursion can occur:

- inside the target system;
- inside the inquiry system;
- through coupling between inquiry and target.

## Decision

**ADD — `RelationDomain`**

    RelationDomain = {
      TARGET_SYSTEM,
      INQUIRY_SYSTEM,
      COUPLED_TARGET_INQUIRY
    }

Add to `ScaleRelation`, `RecursiveScaleLoop`, `ScaleBridgeRecord`, and `EvidenceBridgeGraph` where relevant.

> **Target recursion ≠ inquiry recursion.**

> **Inquiry recursion may alter target access without becoming target-system organization.**

# 5. Coupled Target–Inquiry Relations

Some scientific interventions create or alter access to the target.

Examples:

- echolocation experiment manipulates sensory conditions;
- DESI calibration changes how detector output becomes evidence;
- institutional policy changes reporting behavior;
- biological perturbation changes later measurable state.

`COUPLED_TARGET_INQUIRY` should be used only when the inquiry process materially alters the target relation being investigated.

# 6. Emergence Optionality

The regression showed that forcing emergence language onto every domain creates metaphorical strain.

## Decision

**ADD — `EmergenceStatus`**

    EmergenceStatus = {
      REQUIRED,
      SUPPORTED,
      OPTIONAL_DESCRIPTION,
      NOT_APPLICABLE,
      CONTESTED
    }

Every `EmergenceRecord` should carry a status.

> **Absence of emergence language can be a positive regression result.**

# 7. EmergenceRecord Revision

Revise:

    EmergenceRecord = {
      sourceScale,
      targetScale,
      scaleKinds,
      relationDomain,
      emergenceStatus,
      componentStates,
      organizationRelations,
      enablingConditions,
      emergenceType,
      newStructure,
      newCapability,
      newAccess,
      newConstraints,
      persistence,
      dependenceOnLowerScale,
      sensitivityToPerturbation,
      evidence,
      alternatives,
      remainder,
      claimCeiling
    }

# 8. Emergence Promotion Decision

`EmergenceRecord` remains **experimental / specialized**, not Core.

Reason:

- strong fit in bat and planaria;
- bounded fit in institutions;
- unnecessary in DESI.

> **Core portability does not require emergence centrality.**

# 9. Bridge Burden

The regression showed that cross-scale bridges can be valid while carrying very different inferential burdens.

## Decision

**ADD — `BridgeBurden`**

    BridgeBurden = {
      identityAssumption,
      mechanismAssumption,
      calibrationAssumption,
      aggregationAssumption,
      translationAssumption,
      statisticalAssumption,
      normativeAssumption,
      temporalAlignmentAssumption,
      scaleAlignmentAssumption
    }

Each field should record:

    NONE | LOW | MODERATE | HIGH | UNRESOLVED

`BridgeBurden` is not a scalar score.

> **Bridge burden is typed, not summed by default.**

# 10. ScaleBridgeRecord Revision

Revise:

    ScaleBridgeRecord = {
      sourceScale,
      targetScale,
      sourceScaleKind,
      targetScaleKind,
      relationDomain,
      sourceEvidence,
      targetClaim,
      bridgeRelation,
      bridgeAssumptions,
      bridgeBurden,
      temporalAlignment,
      spatialAlignment,
      mechanismOrConstraint,
      alternatives,
      translationLoss,
      remainder,
      claimCeiling
    }

# 11. Bridge Burden Examples

## Bat

Hippocampal representation → organism navigation:

- mechanism assumption: MODERATE;
- scale alignment: MODERATE;
- phenomenal bridge burden: HIGH if used for experience claims.

## Planaria

Transcriptomic change → organism tolerance:

- mechanism assumption: HIGH;
- aggregation assumption: MODERATE;
- historical assumption: MODERATE.

## DESI

Detector counts → calibrated spectrum:

- calibration assumption: HIGH but explicit and testable;
- translation assumption: MODERATE.

Spectrum → cosmological claim:

- statistical assumption: HIGH;
- model assumption: HIGH.

## Institution

Local reports → organizational risk metric:

- aggregation assumption: HIGH;
- translation assumption: MODERATE;
- normative assumption: NONE until policy judgment enters.

# 12. EvidenceBridgeGraph Revision

Add:

    scaleKinds
    relationDomains
    bridgeBurdens

An EvidenceBridgeGraph should therefore make visible not merely that evidence travels, but what inferential work each bridge performs.

# 13. Relation-Type Reconciliation

The four-case regression supports retaining:

    CONSTITUTES
    ENABLES
    CONSTRAINS
    MODULATES
    COORDINATES
    REALIZES
    AMPLIFIES
    DAMPENS
    TRANSLATES
    EVIDENCES

Add where needed:

    AGGREGATES
    CALIBRATES
    CLASSIFIES
    PERTURBS

These additions are justified by DESI and institutional reporting.

# 14. RelationType Firewall

> **Relation type ≠ mechanism.**

`EVIDENCES` does not explain the physical process.
`CONSTITUTES` does not imply sufficient explanation.
`AGGREGATES` does not imply preservation of all local structure.
`TRANSLATES` does not imply lossless equivalence.

# 15. Core-Promotion Reconciliation

The four-case regression supports three promotion tiers.

# 16. Tier A — Promote Toward Core / Canonical-Support

Strongest candidates:

1. `ScaleRelation`
2. `ScaleRelationGraph`
3. `ScaleKind`
4. `RelationDomain`
5. `ScaleBridgeRecord`
6. `BridgeBurden`
7. `EvidenceBridgeGraph`
8. `TargetBinding`
9. typed `RemainderRecord`
10. typed `ConstraintRecord`
11. `TranslationTopology`
12. target-recursion / inquiry-recursion distinction

Rationale:

Each survived all four cases and remained useful when biology, emergence, phenomenality, or institutional structure were absent.

# 17. Tier B — Canonical-Support Candidate / Optional

Retain as portable but nonmandatory:

- `RecursiveScaleLoop`;
- `DetectionChain`;
- scale-indexed `AccessRelation`;
- scale-indexed `DetectionRecord`;
- scale-indexed `CapabilityProfile`.

Rationale:

These are cross-domain but not needed in every inquiry.

> **Portable ≠ mandatory.**

# 18. Tier C — Experimental / Domain-Local

Keep outside Core:

- `EmergenceRecord`;
- `OrganismEnvironmentLoop`;
- `PhenomenalBridgeClaim`;
- `PhenomenalModelSpace`;
- biological access-emergence specializations.

Rationale:

These either depend on domain-specific ontology or have not yet shown sufficient cross-domain necessity.

# 19. Core-Promotion Firewall

> **Regression success ≠ automatic canonization.**

Promotion requires:

- stable definition;
- cross-domain usefulness;
- no hidden ontology import;
- no duplication of existing objects;
- executable regression coverage;
- clear claim ceiling.

# 20. TargetBinding Promotion

`TargetBinding` is promoted toward Core/canonical-support because every case exposed a risk of apparent sameness hiding different target constructions.

Add fields:

    targetScaleKind
    relationDomain
    operationalizationFamily

> **Shared label ≠ shared target.**

# 21. Remainder Promotion

Typed `RemainderRecord` is promoted toward Core/canonical-support.

Required types remain:

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

Add optional:

    CALIBRATION
    AGGREGATION

> **Remainder type ≠ metaphysical status.**

# 22. Constraint Promotion

Typed `ConstraintRecord` is promoted toward Core/canonical-support.

Add cross-scale fields:

    sourceScaleKind
    targetScaleKind
    relationDomain
    constraintDirection

Directions:

    UPWARD
    DOWNWARD
    LATERAL
    RECURSIVE

> **Constraint direction ≠ causal priority.**

# 23. TranslationTopology Promotion

`TranslationTopology` is promoted toward Core/canonical-support because:

- bat required sensory/instrument/human translation;
- DESI required detector/data/model translation;
- institutions required report/classification/aggregation translation;
- planaria required molecular/physiological explanatory translation.

> **Translation portability is stronger than domain-specific emergence portability.**

# 24. AccessRelation Reconciliation

`AccessRelation` remains canonical-support candidate rather than full Core object.

Required scale-aware fields:

    accessorScaleKind
    targetScaleKind
    relationDomain

Do not infer awareness from access.

# 25. DetectionRecord Reconciliation

`DetectionRecord` remains canonical-support candidate / optional.

Required fields:

    detectorScaleKind
    targetScaleKind
    relationDomain
    detectionLevel

Detection levels:

    LOCAL_REGISTRATION
    INTEGRATED_DISCRIMINATION
    SYSTEM_LEVEL_DETECTION
    INQUIRY_LEVEL_DETECTION

> **Detection level must not be inferred from vocabulary alone.**

# 26. DetectionChain Reconciliation

`DetectionChain` is retained as optional.

It is required only when a claim moves across multiple registrations or scales.

> **No chain needed when the detector and target claim remain at one well-specified scale.**

# 27. RecursiveScaleLoop Reconciliation

`RecursiveScaleLoop` remains optional.

Use only when:

- a later state feeds back onto conditions of an earlier-scale process;
- the loop changes access, capability, constraint, or evidence in a way relevant to the inquiry.

> **Repeated sequence ≠ recursive scale loop by default.**

# 28. ScaleRelationGraph Minimality

A graph may contain only those scales and relations relevant to the claim.

> **Full-scale graph ≠ mandatory complete ontology.**

# 29. Emergence Optionality Test

An application should be allowed to state:

    EmergenceStatus = NOT_APPLICABLE

without failing the recursive-scale architecture.

This condition is mandatory for Core portability.

# 30. Non-Use as Positive Evidence

The DESI case establishes an important principle:

> **A translational formalism is stronger when it can decline a concept cleanly than when it can force that concept everywhere.**

# 31. Bridge-Burden Ledger

## Decision

**ADD — `BridgeBurdenLedger`**

    BridgeBurdenLedger = {
      bridgeRecords,
      burdenTypes,
      highBurdenBridges,
      unresolvedAssumptions,
      crossCaseComparisons,
      claimCeiling
    }

Purpose:

- identify where an argument performs the most inferential work;
- distinguish well-calibrated technical bridges from speculative cross-scale bridges;
- prevent one successful bridge from laundering assumptions in another.

# 32. Bridge Burden Does Not Equal Weakness

A high burden may still be justified.

Example:

DESI's detector-to-cosmology chain carries substantial calibration, statistical, and model burden but may still be scientifically strong because those assumptions are explicit and testable.

> **High bridge burden ≠ bad inference.**

> **Hidden bridge burden is the primary danger.**

# 33. Core Use Case

The Core should be able to represent:

    source object
    → typed relation
    → target object
    + scale kind
    + relation domain
    + bridge burden
    + evidence
    + remainder
    + claim ceiling

without requiring any domain-specific emergence theory.

# 34. Four-Case Reconciliation Matrix

| Object | Bat | Planaria | DESI | Institution | 1.1 Decision |
|---|---|---|---|---|---|
| ScaleRelation | strong | strong | strong | strong | PROMOTE |
| ScaleRelationGraph | strong | strong | strong | strong | PROMOTE |
| ScaleKind | needed | useful | required | required | ADD + PROMOTE |
| RelationDomain | required | useful | required | required | ADD + PROMOTE |
| ScaleBridgeRecord | strong | strong | very strong | very strong | PROMOTE |
| BridgeBurden | useful | useful | required | required | ADD + PROMOTE |
| EvidenceBridgeGraph | strong | strong | very strong | strong | PROMOTE |
| TargetBinding | strong | strong | very strong | strong | PROMOTE |
| RemainderRecord | strong | very strong | strong | very strong | PROMOTE |
| ConstraintRecord | strong | strong | strong | strong | PROMOTE |
| TranslationTopology | strong | moderate | very strong | very strong | PROMOTE |
| RecursiveScaleLoop | strong | strong | inquiry-only | strong | OPTIONAL |
| DetectionChain | strong | limited | very strong | strong | OPTIONAL |
| EmergenceRecord | strong | strong | not applicable | bounded | EXPERIMENTAL |
| OrganismEnvironmentLoop | strong | moderate | n/a | n/a | DOMAIN-LOCAL |

# 35. Core-Promotion Acceptance Tests

**CP1** `ScaleKind` distinguishes biological organization from representational and institutional scale.

**CP2** `RelationDomain` distinguishes target recursion from inquiry recursion.

**CP3** `EmergenceStatus = NOT_APPLICABLE` is valid and does not count as architecture failure.

**CP4** `BridgeBurden` is typed and non-scalar.

**CP5** `ScaleBridgeRecord` exposes assumptions rather than hiding them.

**CP6** Core objects remain useful in DESI without biological metaphors.

**CP7** Institutional use preserves no-collective-phenomenality firewall.

**CP8** Bat use preserves no-phenomenal-identity inference.

**CP9** Planaria use does not force detection/access vocabulary without a specified mechanism.

**CP10** Portable objects remain optional where the inquiry does not need them.

# 36. Core Firewalls

> **ScaleKind ≠ ontology.**

> **RelationDomain ≠ causal priority.**

> **Emergence optionality ≠ theoretical incompleteness.**

> **Bridge burden ≠ inference invalidity.**

> **High bridge burden ≠ bad inference.**

> **Hidden bridge burden ≠ acceptable compression.**

> **Portable ≠ mandatory.**

> **Regression success ≠ automatic canonization.**

# 37. Strongest Supported Claim

> **After four-case regression, FSP's recursive-scale architecture supports promotion of a typed cross-scale relation grammar—ScaleKind, RelationDomain, ScaleRelation, ScaleBridgeRecord, BridgeBurden, EvidenceBridgeGraph, TargetBinding, typed RemainderRecord, typed ConstraintRecord, and TranslationTopology—while leaving emergence, organism–environment specialization, and phenomenal bridge machinery optional or domain-local.**

# 38. Claim Ceiling

This reconciliation does not establish:

- a universal ontology of scales;
- a universal emergence mechanism;
- that every inquiry requires recursive-scale modeling;
- that a high-burden bridge is weak;
- that a low-burden bridge is true;
- that institutional relations are biological relations;
- that multiscale functional organization determines phenomenal identity;
- that four cases are sufficient for final FSP canonization.

# 39. REOPEN Conditions

Reopen if:

- ScaleKind proves too coarse across new domains;
- RelationDomain cannot cleanly separate target and inquiry recursion;
- BridgeBurden cannot be operationalized without arbitrary scoring;
- promoted objects duplicate existing FSP Core objects;
- a new non-biological domain requires emergence as a central relation in an incompatible way;
- optional objects begin to be treated as mandatory;
- relation typing obscures rather than clarifies domain-native explanation.

# 40. Next Regression Sequence

Before final Core promotion, test 1.1 on:

1. medicine: patient report → clinical measure → diagnosis → intervention;
2. historical inquiry: source → interpretation → narrative → later reopening;
3. AI/model evaluation: benchmark → internal representation → output → human decision;
4. one engineering control-system case.

These should test whether ScaleKind and BridgeBurden remain discriminating outside the original four.

# 41. Final Reconciliation

The four-case regression supports a narrower and stronger FSP claim than 'everything is multiscale' or 'everything is emergent.'

The promoted architecture is:

    bounded target / inquiry object
    → typed relation
    → typed scale kind
    → explicit relation domain
    → explicit bridge burden
    → evidence
    → remainder
    → claim ceiling

with recursive loops, detection chains, and emergence records added only when the case requires them.

The governing principle is:

> **A translational formalism should make relation structure portable while allowing ontology, mechanism, and even the relevance of particular concepts to remain domain-specific.**

---

**FSP-RECURSIVE-SCALE-ARCHITECTURE-1.1 — SCALEKIND TYPING, RELATIONDOMAIN SEPARATION, EMERGENCE OPTIONALITY, BRIDGE-BURDEN LEDGER, AND CORE-PROMOTION RECONCILIATION**

**Status:** RECONCILIATION / CORE-PROMOTION CANDIDATE — VERSION 1.1
**Next disciplined move:** implement the 1.1 promotion objects in an executable schema/regression harness and test medicine, historical inquiry, AI/model evaluation, and engineering control before final Core freeze.