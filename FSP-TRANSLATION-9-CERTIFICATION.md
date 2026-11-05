# FSP-TRANSLATION-9 Certification

Status: **PASS AS BATCH NODESET SCALING TEST**

TRANSLATION-9 scales the raw external-graph program from isolated nodesets to a six-nodeset, two-corpus batch.

Certified:

- corpus-scoped original identities remain coherent across overlapping local subgraphs;
- repeated source nodes are allowed when type/text are consistent;
- conflicting identity reuse is detected;
- sampled augmentation coding can be compared structurally without forcing remainder agreement;
- RA and standing queries recover consistently as batch size grows;
- compression-retention curves distinguish FULL, RAW_ONLY, and single-field ablations;
- corpus-level failure audits detect missing relation families and identity conflicts;
- augmentation coverage is tracked separately from native AIF graph validity.

Regression certification:

- GitHub Actions run `42031578466`;
- 223 tests passed;
- 0 failed;
- browser build PASS.

Current strongest claim:

> The FSP overlay architecture remains coherent across a six-nodeset, two-corpus external AIF batch, preserving original identities across overlapping subgraphs while maintaining stable audit-query semantics and measurable selective loss under compression.

Not yet licensed:

- full-corpus QT30 ingestion;
- independent human inter-coder reliability;
- automatic augmentation;
- performance scaling benchmarks;
- statistical corpus generalization;
- human-fidelity validation.

Recommended next research direction:

`FSP-TRANSLATION-10 — Automatic Raw-Nodeset Extraction, Stratified Relation Sampling, Human-Coder Protocol Freeze, Query-Performance Benchmark, and Scale-Up Acceptance Gate.`
