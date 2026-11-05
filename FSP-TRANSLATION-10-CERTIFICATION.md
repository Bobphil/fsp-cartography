# FSP-TRANSLATION-10 Certification

Status: **PASS AS REPRODUCIBLE EXTRACTION AND SCALE-UP GATE**

TRANSLATION-10 replaces hand-selected relation neighborhoods with deterministic extraction from raw AIF node/edge collections.

Certified:

- automatic extraction of RA, CA, and MA relation-centered neighborhoods;
- deterministic repeated extraction;
- exact preservation of original relation-node and edge IDs;
- stratified relation sampling with explicit shortfall reporting;
- frozen human-coder protocol version FSP-AIF-CODER-1.0;
- source-ID protection and disagreement-preservation rules;
- query benchmark harness with current 25 ms regression threshold;
- multi-dimensional scale-up gate covering relation coverage, provenance, graph integrity, coding protocol, coding agreement, performance, and required-query recovery.

Regression certification:

- GitHub Actions run `42032280909`;
- 239 tests passed;
- 0 failed;
- browser build PASS.

Current strongest claim:

> A reproducible raw-AIF extraction pipeline can recover relation-centered nodesets across inference, conflict, and rephrase strata, preserve original source identities, operate under a frozen future human-coding protocol, satisfy a basic query-performance regression threshold, and pass a multi-dimensional scale-up acceptance gate.

Not yet licensed:

- genuine human inter-coder reliability;
- full-corpus QT30 ingestion;
- automatic semantic FSP augmentation;
- hardware-independent performance guarantees;
- statistical corpus generalization;
- human phenomenological fidelity.

Recommended next research direction:

`FSP-TRANSLATION-11 — Large-Batch Automatic Extraction, Stratified Corpus Sampling, External Human-Coder Trial Packet, Query-Latency Distribution, and Scale-Up Regression.`
