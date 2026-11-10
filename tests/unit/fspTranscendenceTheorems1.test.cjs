const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-TRANSCENDENCE-THEOREMS-1.md");
const text = fs.readFileSync(target, "utf8");

test("formal and empirical derivations remain distinct", () => {
  assert.ok(text.includes("FORMAL LEMMA"));
  assert.ok(text.includes("CONDITIONAL THEOREM"));
  assert.ok(text.includes("EMPIRICAL HYPOTHESIS"));
  assert.ok(text.includes("Formal consequence ≠ empirical discovery."));
});

test("core transcendence lemmas preserve bridge discipline", () => {
  assert.ok(text.includes("Every cross-layer claim requires an explicit bridge."));
  assert.ok(text.includes("Noetic intensity alone cannot increase the epistemic authorization of a metaphysical claim."));
  assert.ok(text.includes("Validation of an earlier bridge does not automatically validate later bridges."));
});

test("state trait and meaning truth distinctions remain explicit", () => {
  assert.ok(text.includes("Acute phenomenology alone cannot license a durable PRF-transformation claim."));
  assert.ok(text.includes("Therapeutic success and metaphysical truth must be evaluated on separate tracks."));
});

test("nonpsychedelic portability is required", () => {
  assert.ok(text.includes("Non-Psychedelic Regression Is Required"));
  assert.ok(text.includes("meditation"));
  assert.ok(text.includes("VR-mediated self/world transformation"));
});

test("domain applications preserve native ontology", () => {
  assert.ok(text.includes("domain-native ontology"));
  assert.ok(text.includes("Application — Consciousness Science"));
  assert.ok(text.includes("Application — Contemplative Science"));
  assert.ok(text.includes("Application — Heterogeneous Intelligence"));
});

test("theorem schema carries premises ceiling and reopen", () => {
  for (const phrase of ["PREMISES","BRIDGE ASSUMPTIONS","CLAIM CEILING","REOPEN CONDITIONS"]) assert.ok(text.includes(phrase), phrase);
});

test("compression kernel is present", () => {
  for (const phrase of ["PERTURB","REWEIGHT","EXPERIENCE","INTERPRET","INTEGRATE","SEDIMENT","RETEST","REOPEN"]) assert.ok(text.includes(phrase), phrase);
});