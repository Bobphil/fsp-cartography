const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-TRANSFORMATION-ARCHITECTURE-1.md");
const text = fs.readFileSync(target, "utf8");

test("core transformation separation is preserved", () => {
  const phrases = [
    "Possible ≠ feasible ≠ visible ≠ selectable ≠ authorized ≠ implemented.",
    "Model-reachable ≠ guaranteed.",
    "Reachable ≠ desirable.",
    "Desirable ≠ authorized.",
    "Formal optimization ≠ ethical authorization."
  ];
  for (const phrase of phrases) assert.ok(text.includes(phrase), phrase);
});

test("assembly history and capability remain non-deterministic", () => {
  assert.ok(text.includes("Same present state ≠ same future possibility structure."));
  assert.ok(text.includes("Historical occurrence ≠ retained functional trace."));
  assert.ok(text.includes("Capability gain in one task space ≠ global capability gain."));
  assert.ok(text.includes("Local adaptation ≠ global resilience."));
});

test("search architecture remains mechanism-neutral", () => {
  assert.ok(text.includes("Successful navigation ≠ exhaustive search."));
  assert.ok(text.includes("Observed solution-finding ≠ known search algorithm."));
  assert.ok(text.includes("Search neutrality"));
  assert.ok(text.includes("Platonic-space proposal may be represented as a comparator hypothesis"));
});

test("task sequencing remains descriptive rather than prescriptive", () => {
  assert.ok(text.includes("Intermediate task value ≠ immediate goal completion."));
  assert.ok(text.includes("Dependency map ≠ recommended strategy."));
  assert.ok(text.includes("TaskGraph = {"));
});

test("JTS and STAG coordination do not imply legitimacy", () => {
  assert.ok(text.includes("Coordination can enlarge the reachable state space."));
  assert.ok(text.includes("Expanded reachability ≠ legitimate coordination."));
  assert.ok(text.includes("Large coordinated target ≠ worthy STAG."));
  assert.ok(text.includes("Successful coordination ≠ justified coordination."));
});

test("hypothesis generation remains distinct from confirmation", () => {
  assert.ok(text.includes("Unexplained remainder ≠ evidence for the preferred hypothesis."));
  assert.ok(text.includes("Hypothesis generation ≠ hypothesis confirmation."));
  assert.ok(text.includes("Hypothesis-Generation Grammar"));
});

test("research frontiers remain research frontiers", () => {
  for (const frontier of [
    "Pattern of Discovery (RF-01)",
    "Cross-Perspectival Calibration (RF-02)",
    "Agency-Substrate Extraction (RF-03)",
    "Temporal Interoperability (RF-04)",
    "Repair Topology (RF-05)"
  ]) assert.ok(text.includes(frontier), frontier);
  assert.ok(text.includes("No Frontier is promoted by this document."));
});

test("anti-foundational and return constraints remain explicit", () => {
  assert.ok(text.includes("Transformation model ≠ transformation itself."));
  assert.ok(text.includes("No single representation is automatically privileged"));
  assert.ok(text.includes("Transformation returns to lived Doing"));
});

test("claim ceiling prevents universal overreach", () => {
  for (const phrase of [
    "a universal mathematics of transformation",
    "a general solution to search",
    "a universal theory of flourishing",
    "a general optimizer for social change",
    "a method for choosing final values"
  ]) assert.ok(text.includes(phrase), phrase);
});
