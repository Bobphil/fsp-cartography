# FSP-TRANSLATION-8

## Raw AIF Multi-Corpus Import, Original-Node-ID Preservation, FSP Augmentation Profile, Audit-Query Recovery, and Compression Ablation

**Status:** Raw external graph ingestion and augmentation test  
**Canonical mode:** Monograph-scale repository; external datasets remain external and are represented through bounded raw subgraphs plus source provenance.

## 1. Purpose

TRANSLATION-8 moves beyond tutorial-level reconstruction.

It imports bounded connected subgraphs from two externally produced AIF-family sources, preserves original node IDs exactly, attaches FSP governance fields only as overlays, and tests whether audit queries remain recoverable under controlled compression.

The central firewall is:

> External graph != FSP augmentation.

Raw nodes and edges remain the external source layer.

FSP fields are attached by source corpus ID + original node ID.

## 2. External raw sources

The first multi-source set uses two ARG Tech repositories.

### Kosciuszko source

Repository:

`arg-tech/ACH-ArgNav`

Source file:

`uploaded_data/FFkosciuszko00219.json`

Observed source size:

- 1,195 nodes
- 1,383 edges
- L, I, YA, CA, TA, RA, and MA node families

The bounded imported subgraph centers on original conflict node:

`610187`

and preserves original connected information-node IDs:

- `610172`
- `610185`

### Otway source

Repository:

`arg-tech/AMF_Scheme_Classifier2`

Source file:

`data/corpespotway.json`

Observed source size:

- 739 nodes
- 784 edges
- L, I, RA, TA, YA, CA, and MA node families

The bounded imported subgraph centers on original inference node:

`1201647_164813044708340528`

with connected original IDs:

- `1196468_164813044708340528`
- `1196586_164813044708340528`
- `1201649_164813044708340528`

These IDs are never renumbered.

## 3. Why bounded subgraphs

TRANSLATION-8 does not mirror entire external repositories into FSP.

Instead it imports connected raw subgraphs large enough to test:

- original-ID preservation;
- edge integrity;
- relation-type recovery;
- overlay targeting;
- query recovery;
- compression failure.

This keeps provenance external and avoids falsely presenting copied datasets as FSP-owned corpora.

## 4. Import contract

A raw import contains:

- corpus ID;
- source repository;
- source path;
- source node/edge counts;
- raw nodes with original node IDs;
- raw edges with original edge IDs.

An FSP augmentation contains:

- corpus ID;
- original node ID;
- optional task;
- optional claim ceiling;
- optional standing;
- optional remainder;
- optional auxiliary assumptions;
- optional REOPEN condition.

Augmentation may target only an existing raw node.

Unknown-node augmentation is rejected.

## 5. Original-ID preservation

The import audit requires:

```
originalNodeIds === importedNodeIds
```

in both identity and order for the bounded raw graph.

No prefixing, renumbering, hashing, or synthetic replacement is permitted.

Cross-corpus uniqueness is handled by the pair:

```
<corpusId, nodeID>
```

rather than by altering source IDs.

## 6. Audit-query recovery

TRANSLATION-8 defines two query classes.

### AIF-native query

Example:

- recover RA inference nodes;
- recover CA conflict nodes.

These queries operate only on the raw external graph.

### FSP-augmentation query

Examples:

- nodes with standing;
- nodes with translation remainder;
- nodes with claim ceilings;
- nodes with REOPEN conditions.

These queries operate only on the overlay.

This separation lets us ask whether FSP adds recoverable governance capacity without damaging AIF-native graph structure.

## 7. Compression profiles

The first compression-ablation profiles are:

- **FULL**
- **RAW_ONLY**
- **NO_REMAINDER**
- **NO_STANDING**
- **NO_CLAIM_CEILING**
- **NO_REOPEN**

Compression is non-destructive to the canonical repository. It creates derived representations for testing.

## 8. Compression criterion

A useful field should satisfy two conditions:

1. keeping it permits recovery of a governance query;
2. removing it selectively destroys that recovery without damaging unrelated raw AIF queries.

For example:

```
NO_REMAINDER
```

should make the remainder query unrecoverable while preserving relation-type recovery.

If removing a field changes nothing, its non-redundancy is weakened.

## 9. FSP augmentation profile

The current overlays deliberately remain bounded.

For the intelligence-conflict subgraph, FSP adds:

- bounded assessment task;
- claim ceiling;
- proposition standing;
- unresolved evidential remainder;
- auxiliary dependence on available intelligence;
- explicit REOPEN conditions.

For the corporate-espionage inference subgraph, FSP adds:

- hypothesis-assessment task;
- claim ceilings;
- information-node standing;
- external-evidence remainder;
- probability/source auxiliary assumptions;
- REOPEN triggers.

These additions do not alter AIF relation types.

## 10. What TRANSLATION-8 can test

If successful, the build establishes:

- raw external AIF graph ingestion from more than one source;
- exact preservation of external node IDs;
- edge-integrity checking;
- separate FSP augmentation overlays;
- AIF-native relation recovery across compression;
- FSP governance-query recovery;
- selective loss under field ablation.

## 11. What it does not yet establish

This is not yet full-corpus QT30 ingestion.

It does not establish:

- corpus-wide FSP coding;
- human inter-coder reliability;
- automatic FSP augmentation;
- semantic correctness of every external argument;
- universal utility of every FSP field;
- superiority of FSP over AIF.

The current claim is architectural:

> FSP governance fields can be attached to real external AIF node identities without altering those identities, and the resulting added query capabilities can be measured by controlled compression ablation.

## 12. Compression and the monograph-scale rule

Compression in TRANSLATION-8 is experimental.

It is not publication-driven deletion.

The canonical repository retains:

- raw-source provenance;
- full overlays;
- test history;
- ablation results.

Compressed profiles are disposable derived views.

## 13. FSP-VR implication

This gives future VR exemplars a disciplined source architecture.

An immersive representation can attach experiential or governance layers to:

```
<external corpus, original source node>
```

without pretending the augmentation was present in the source.

A user should be able to inspect:

- native external proposition;
- native argumentative relation;
- FSP task overlay;
- standing;
- remainder;
- REOPEN condition.

That supports vividness without provenance collapse.

## 14. Next research ceiling

The next step should expand from bounded multi-source subgraphs to either:

- multiple larger raw nodesets from public AIF corpora, or
- corpus-batch ingestion with sampled augmentation coding.

The decisive question becomes:

> Do the FSP-added fields continue to improve audit-query recovery when the graph scale increases by orders of magnitude?
