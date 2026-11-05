# FSP-TRANSLATION-11 Certification

Status: **PASS AS LARGE-BATCH INFRASTRUCTURE REGRESSION; HUMAN CODING PENDING**

TRANSLATION-11 scales the external-source pipeline from a six-nodeset batch to a 30-nodeset stratified sample across two external AIF corpora.

Certified infrastructure results:

- 30 automatically selected relation-centered nodesets;
- 10 RA, 10 CA, and 10 MA nodesets;
- both external source corpora represented;
- real MA source imbalance retained rather than erased;
- deterministic stratified sample reconstruction;
- frozen human-coder protocol carried into an executable blank trial packet;
- source identities preserved in coder packet;
- p50, p95, mean, and maximum query latency measurable;
- current 30-nodeset fixture stays within the 25 ms p95 regression threshold;
- large-batch regression passes native relation coverage and query recovery;
- scale regression fails when relation coverage, performance, or scale-increase conditions are broken.

Human-coding status:

**PENDING**

No independent humans have yet completed the trial packet.

Therefore TRANSLATION-11 does not claim:

- human inter-coder reliability;
- validated human usability of the coding protocol;
- corpus-wide semantic FSP augmentation;
- full QT30 ingestion;
- statistically representative AIF sampling;
- hardware-independent performance.

Regression certification:

- GitHub Actions run `42033055250`;
- 255 tests passed;
- 0 failed;
- browser build PASS.

Current strongest claim:

> The FSP external-source infrastructure has scaled from a six-nodeset batch to a deterministic 30-nodeset, two-corpus, RA/CA/MA-stratified sample with preserved provenance, an executable independent-human coding packet, stable native query recovery, and acceptable p95 latency under the current CI regression threshold.

Crucial ceiling:

> Infrastructure readiness is not human validation. The human-coder evidence state remains PENDING until independent coders complete the frozen packet.

Recommended next evidential move:

`FSP-TRANSLATION-12 — Human-Coder Trial Execution, Agreement/Disagreement Audit, Protocol-Fidelity Test, Adjudication Firewall, and Post-Human Scale Gate.`
