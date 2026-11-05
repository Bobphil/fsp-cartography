# FSP-TRANSLATION-11

## Large-Batch Automatic Extraction, Stratified Corpus Sampling, External Human-Coder Trial Packet, Query-Latency Distribution, and Scale-Up Regression

**Status:** Large-batch infrastructure validation with human-coding packet prepared  
**Boundary:** Research layer only; no Cartography-kernel change.

## 1. Purpose

TRANSLATION-10 established a reproducible extractor, relation-stratified sampling, a frozen coder protocol, a basic mean-latency benchmark, and a scale-up acceptance gate.

TRANSLATION-11 increases the external batch materially and separates two questions that must not be conflated:

1. **Is the infrastructure ready to scale?**
2. **Has independent human augmentation coding actually been validated?**

The first can pass here.

The second remains **PENDING** until independent humans complete the frozen trial packet.

## 2. Large external batch

The committed sample contains 30 automatically selected relation-centered nodesets:

- 10 RA inference nodesets;
- 10 CA conflict nodesets;
- 10 MA rephrase nodesets.

Two external AIF sources are represented.

Corpus contribution is:

- Kosciuszko: 17 nodesets;
- Otway: 13 nodesets.

RA and CA are balanced across both corpora.

MA is necessarily unbalanced because the Otway source contains only three MA relation nodes in the observed raw graph.

That imbalance is retained as evidence about the corpus rather than normalized away.

## 3. Stratified corpus sampling

The large-sample builder attempts to satisfy a target count independently for:

- RA;
- CA;
- MA.

Selection is deterministic and corpus-aware.

It alternates across available corpora where possible before filling remaining slots from the corpus that still has available examples.

The result is therefore:

- relation-balanced;
- multi-corpus;
- transparent about corpus-specific relation scarcity.

## 4. Human-coder trial packet

TRANSLATION-11 produces a real trial packet from the selected external nodesets.

Each packet item includes only:

- corpus and source provenance;
- original relation-node ID;
- relation type;
- raw nodes;
- raw edges;
- blank FSP coding fields.

Coding fields are:

- target node;
- task;
- claim ceiling;
- standing;
- remainder;
- REOPEN condition.

The packet carries protocol version:

`FSP-AIF-CODER-1.0`

and trial-packet version:

`FSP-AIF-HUMAN-TRIAL-1.0`.

No prefilled FSP interpretation is shown to the coder.

## 5. Human validation status

The packet is infrastructure.

It is not evidence of human reliability by itself.

Therefore the packet has the explicit status:

`PENDING`

until independently recruited coders complete it.

The acceptance architecture must never convert packet readiness into a human-validation PASS.

## 6. Latency distribution

TRANSLATION-10 used mean latency.

TRANSLATION-11 records a fuller distribution:

- mean;
- p50;
- p95;
- maximum;
- total query executions;
- total matches.

The p95 statistic becomes the primary scale-up guard because a low mean can hide occasional slow queries.

## 7. Performance threshold

For the committed 30-nodeset fixture batch, the initial CI guard remains:

```
p95 query latency <= 25 ms
```

This is still a regression threshold, not a hardware-independent performance claim.

It is intended to catch gross degradation while the corpus scale is still modest.

## 8. Scale-up regression

The large-batch regression compares the new infrastructure against the earlier six-nodeset baseline.

The gate requires:

- at least 30 selected nodesets;
- strictly more nodesets than the TRANSLATION-9 baseline;
- RA, CA, and MA coverage;
- at least two source corpora;
- zero required native-query failures;
- p95 latency within threshold.

Its output distinguishes:

- `infrastructureStatus: PASS | FAIL`;
- `humanCodingStatus: PENDING`.

This separation is constitutional for the research program.

## 9. Why no automatic semantic augmentation yet

The extraction layer is automated.

The FSP interpretation layer is not.

That is deliberate.

Automatic extraction concerns graph topology and provenance.

FSP augmentation concerns task interpretation, claim restraint, standing, remainder, and REOPEN.

Those are exactly the fields for which premature automation could silently install the system's interpretation as if it were source fact.

## 10. Research ceiling

A successful TRANSLATION-11 supports:

> The external AIF infrastructure has scaled from a six-nodeset batch to a deterministic 30-nodeset, two-corpus stratified sample with all three major relation families represented, an executable independent-coder trial packet, stable native audit-query recovery, and acceptable p95 latency under the current CI threshold.

It does **not** establish:

- completed human inter-coder reliability;
- corpus-wide semantic FSP augmentation;
- full QT30 ingestion;
- statistically representative sampling of all AIF corpora;
- hardware-independent performance;
- phenomenological fidelity.

## 11. Monograph-scale preservation

The full 30-nodeset sample, extraction rules, trial-packet design, benchmark results, and failure criteria remain part of the canonical repository.

Future papers may report only subsets.

The canonical research object remains uncompressed.

## 12. FSP-VR implication

A VR exemplar atlas can now inherit a more credible external-source pipeline:

```
raw corpus
-> automatic relation extraction
-> stratified sample
-> human coding packet
-> reviewed FSP augmentation
-> experiential representation
```

The experiential layer should therefore sit downstream of both provenance-preserving extraction and human review.

## 13. Next evidential step

After TRANSLATION-11, the next strongest move is no longer an internal formal build.

It is to complete the frozen human-coder trial with genuinely independent coders, or to apply the automatic extractor to a materially larger raw corpus batch.

The preferable sequence is:

```
infrastructure PASS
-> human-coder trial
-> agreement audit
-> protocol revision only if justified
-> larger corpus augmentation
```

without retroactively changing the protocol to improve agreement.
