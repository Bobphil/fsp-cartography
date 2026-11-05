# FSP-TRANSLATION-10

## Automatic Raw-Nodeset Extraction, Stratified Relation Sampling, Human-Coder Protocol Freeze, Query-Performance Benchmark, and Scale-Up Acceptance Gate

**Status:** Reproducible extraction and scale-up gate  
**Boundary:** Research layer only; no Cartography-kernel change.

## 1. Purpose

TRANSLATION-9 established batch coherence across six hand-selected external nodesets.

TRANSLATION-10 removes that hand-selection bottleneck.

The build adds:

- automatic extraction of relation-centered nodesets from raw AIF documents;
- deterministic stratified sampling across RA, CA, and MA relation families;
- a frozen human-coder protocol for future genuine independent coding;
- query-performance benchmarking;
- a scale-up acceptance gate that can fail independently on coverage, provenance, coding, or performance.

The central transition is:

> hand-selected neighborhoods -> reproducible raw extraction pipeline

## 2. Automatic relation-centered extraction

Given a raw AIF document, the extractor:

1. finds relation nodes of type RA, CA, or MA;
2. preserves the original relation node ID;
3. collects all directly connected source/target nodes;
4. preserves original edge IDs;
5. creates a bounded nodeset without renumbering source identities.

The extractor is deterministic.

Running it twice over the same raw document must produce the same nodesets and ordering.

## 3. Stratified relation sampling

A corpus can contain many more RA nodes than CA or MA nodes.

A naïve sample would therefore overrepresent inference.

TRANSLATION-10 uses relation-type strata:

- RA — inference;
- CA — conflict;
- MA — rephrase.

For a requested sample size `n`, the sampler attempts to select `n` nodesets from each relation family.

Shortfall is explicit.

If a corpus lacks enough MA relations, the sampler reports MA as missing rather than silently substituting more RA relations.

## 4. External fixture basis

The test fixtures contain raw relation examples already observed in two external ARG Tech sources:

### Kosciuszko

- CA node `610187`;
- RA node `610206`;
- MA node `610454`.

### Otway

- RA node `1201647_164813044708340528`;
- CA node `1032_164813044708340528`;
- MA node `702_164813044708340528`.

These are stored as compact raw-document fixtures so extraction is tested from node/edge collections rather than from pre-built nodesets.

## 5. Human-coder protocol freeze

TRANSLATION-10 does **not** claim human-coder validation.

It freezes the protocol that future human coders must follow.

Protocol version:

`FSP-AIF-CODER-1.0`

Required:

- independent coding before comparison;
- no exposure to the other coder's record before submission;
- original AIF IDs may never be rewritten;
- target node, task, claim ceiling, standing, remainder, and REOPEN condition must be recorded;
- missing source information must remain unknown rather than inferred;
- standing may not be inferred solely from practical power;
- disagreement may not be erased merely to improve agreement scores.

Adjudication happens only after independent agreement metrics are computed.

## 6. Why freeze the protocol before human coding

Without a frozen protocol, later coding rules could drift in response to observed disagreements.

That would make agreement easier to manufacture.

The sequence is therefore:

```
freeze protocol
-> recruit coders
-> code independently
-> compute agreement
-> inspect disagreement
-> adjudicate only afterward
```

## 7. Query-performance benchmark

TRANSLATION-9 tested semantic scaling but not runtime performance.

TRANSLATION-10 adds a simple deterministic benchmark harness.

For a fixed set of audit queries, it records:

- number of iterations;
- number of queries;
- total query executions;
- elapsed milliseconds;
- mean milliseconds per execution;
- total matches recovered.

The benchmark is not a hardware-independent scientific performance claim.

It is an acceptance guard against gross regressions.

## 8. Performance threshold

The initial scale-up threshold is deliberately generous:

```
mean query execution <= 25 ms
```

for the committed fixture batch in CI.

This threshold is not claimed to be optimal.

Its purpose is to catch accidental algorithmic degradation before scaling to larger corpus batches.

Future builds may replace it with:

- percentile latency;
- corpus-size-normalized benchmarks;
- memory-use measurements;
- asymptotic comparisons.

## 9. Scale-up acceptance gate

The scale-up gate passes only when all of the following hold:

- at least six extracted nodesets;
- RA, CA, and MA are all represented;
- original source IDs are preserved;
- zero dangling edges;
- human-coder protocol is frozen;
- structural coding agreement benchmark >= 0.80;
- mean query execution <= 25 ms;
- zero required-query failures.

Failure in any one dimension blocks scale-up.

## 10. Why the gate is multi-dimensional

A corpus pipeline can be fast but epistemically poor.

It can be semantically rich but corrupt source IDs.

It can preserve provenance but fail relation coverage.

It can perform well computationally while human coders cannot apply the augmentation protocol consistently.

Therefore no single metric can certify scale-up.

## 11. Research ceiling

If successful, TRANSLATION-10 establishes:

> A reproducible raw-AIF extraction pipeline can recover relation-centered nodesets across inference, conflict, and rephrase strata; preserve original IDs; operate under a frozen future human-coding protocol; satisfy a basic query-performance threshold; and pass a multi-dimensional scale-up acceptance gate.

It does not establish:

- human inter-coder reliability;
- full-corpus QT30 ingestion;
- automatic semantic FSP augmentation;
- hardware-independent performance guarantees;
- statistical generalization across all AIF corpora;
- human phenomenological fidelity.

## 12. Monograph-scale rule

Performance and extraction work remain part of the canonical research repository.

Later articles may report only selected benchmarks.

The full extraction grammar, coder protocol, failure cases, and acceptance history remain protected canonical assets.

## 13. FSP-VR implication

This build begins making external exemplar ingestion reproducible.

A future VR atlas should not depend on manually curated source fragments alone.

It should be able to:

- extract bounded argument neighborhoods automatically;
- preserve original source identities;
- stratify examples by relation type;
- attach human-reviewed FSP overlays;
- expose source and augmentation layers separately;
- reject scale-up when provenance or coding quality falls below threshold.

## 14. Next research ceiling

The next meaningful move is no longer another internal pipeline feature.

It should be one of two things:

1. a materially larger raw corpus batch using this extractor; or
2. genuine independent human coding under the frozen protocol.

Either would convert TRANSLATION-10 from infrastructure validation into stronger external evidence.
