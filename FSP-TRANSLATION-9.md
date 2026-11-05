# FSP-TRANSLATION-9

## Batch Nodeset Ingestion, Sampled Independent Augmentation Coding, Query-Scaling Test, Compression-Retention Curve, and Corpus-Level Failure Audit

**Status:** Batch external-graph scaling test  
**Boundary:** Research layer only; no Cartography kernel change.

## 1. Purpose

TRANSLATION-8 showed that FSP governance overlays could attach cleanly to bounded raw AIF subgraphs while preserving original node IDs and native argument relations.

TRANSLATION-9 asks whether that architecture remains coherent when we ingest a larger batch of connected nodesets from multiple external corpora.

The build adds:

- six bounded nodesets across two raw AIF sources;
- repeated original nodes appearing in more than one local subgraph;
- sampled independent augmentation coding;
- query-scaling curves as batch size increases;
- compression-retention curves;
- corpus-level failure audits.

This is a scale test, not a claim of full-corpus ingestion.

## 2. Batch composition

The batch contains six nodesets:

### Kosciuszko corpus

- conflict around CA node `610187`;
- conflict around CA node `610198`;
- inference around RA node `610206`.

### Otway corpus

- inference around RA node `1201647_164813044708340528`;
- inference around RA node `599075_164813044708340528`;
- inference around RA node `599081_164813044708340528`.

The same original information node may legitimately appear in more than one bounded subgraph.

Identity therefore remains:

```
<corpusId, nodeID>
```

and repeated occurrence is not duplication error unless the same identity is represented with conflicting type or text.

## 3. Batch-ingestion audit

The batch audit measures:

- number of nodesets;
- number of distinct corpora;
- total imported raw nodes;
- total imported raw edges;
- original-ID preservation;
- dangling-edge count;
- conflicting identity keys.

A repeated source node with the same type and text is acceptable.

A repeated source node with different type or text under the same `<corpusId,nodeID>` is a corpus-level failure.

## 4. Sampled independent augmentation coding

Full independent human coding is not claimed.

TRANSLATION-9 instead adds a sampled coding protocol on one nodeset.

Two explicit codings are compared for:

- target-node agreement;
- task agreement;
- claim-ceiling agreement;
- standing agreement;
- remainder agreement.

Structural agreement passes when:

- target-node agreement >= 0.80;
- task agreement >= 0.80;
- claim-ceiling agreement >= 0.50.

Standing and remainder disagreement remain visible rather than being forced into the pass threshold.

This preserves the distinction between structural agreement and interpretive convergence.

## 5. Query scaling

For any audit query, the system records:

```
(batch size, match count)
```

as nodesets are added one at a time.

The point is not that counts must always rise.

The point is that query semantics remain stable as the batch grows.

Examples:

- RA relation recovery;
- CA relation recovery;
- standing recovery;
- remainder recovery;
- claim-ceiling recovery;
- REOPEN recovery.

## 6. Compression-retention curve

TRANSLATION-9 generalizes the TRANSLATION-8 ablation into a retention curve.

For each compression profile:

- FULL
- RAW_ONLY
- NO_REMAINDER
- NO_STANDING
- NO_CLAIM_CEILING
- NO_REOPEN

the system records:

```
retained queries / total tested queries
```

The expected pattern is not a smooth numerical law.

The important requirement is selective degradation:

- FULL should retain all queries;
- RAW_ONLY should preserve native relation recovery while losing governance queries;
- each single-field ablation should reduce only the relevant governance recovery.

## 7. Corpus-level failure audit

The failure audit checks:

- dangling edges;
- conflicting identity keys;
- nodesets with no augmentation;
- required audit queries returning no matches.

A batch can therefore fail even if every individual nodeset imported successfully.

This matters because scale introduces new errors:

- inconsistent reuse of IDs;
- partial augmentation coverage;
- missing relation families;
- query degradation;
- hidden conflicts across local subgraphs.

## 8. What this build adds beyond TRANSLATION-8

TRANSLATION-8 established local correctness.

TRANSLATION-9 adds batch coherence.

The research question is now:

> Does the FSP overlay architecture preserve provenance, identity, and auditability when multiple bounded external nodesets are analyzed together?

## 9. Claim ceiling

If successful, TRANSLATION-9 supports the following:

> The FSP overlay architecture remains coherent across a six-nodeset, two-corpus external AIF batch, with original-node identity preserved across overlapping subgraphs, sampled augmentation coding recoverable, audit queries stable under batch growth, and compression losses measurable at corpus-batch level.

It does not establish:

- full QT30 ingestion;
- corpus-wide independent human coding;
- automatic augmentation;
- statistical generalization to arbitrary AIF corpora;
- human-fidelity validation.

## 10. FSP-VR implication

A future VR corpus browser may need to move from:

```
one exemplar -> one graph
```

to:

```
many exemplars -> overlapping source neighborhoods
```

TRANSLATION-9 provides the identity rule needed for that transition.

A node can appear in multiple experiential scenes while still pointing back to one original source identity.

This allows:

- multiple routes through one source;
- repeated evidence in different tasks;
- different FSP overlays without source renumbering;
- provenance-preserving zoom across argument neighborhoods.

## 11. Next research ceiling

The next step should increase both scale and independence:

- larger automatic batch extraction from raw corpus files;
- stratified sampling across relation types;
- sampled augmentation coding by genuinely independent coders;
- query-performance timing;
- cross-corpus failure rates;
- external corpus metadata retained alongside graph structure.

The canonical repository remains monograph-scale throughout.
