const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-ENCYCLOPEDIA-AGENCY-CAPACITY-1.md");
const text = fs.readFileSync(target, "utf8");

test("responsibility distinctions are present", () => {
  const phrases = [
    "Causal explanation ≠ moral excuse.",
    "Remaining agency ≠ unlimited responsibility.",
    "Responsibility ≠ blame.",
    "Reduced culpability ≠ reduced standing of affected others.",
    "Treatment ≠ protection.",
    "Protection ≠ punishment."
  ];
  for (const phrase of phrases) assert.ok(text.includes(phrase), phrase);
});

test("scale firewalls prevent reductionism and reification", () => {
  const phrases = [
    "Scale of explanation ≠ exclusivity of explanation.",
    "Substrate explanation ≠ exhaustive explanation of organized competence.",
    "Higher-level pattern ≠ independence from substrate.",
    "Higher-level coordination ≠ composite phenomenal person.",
    "Formal resemblance across scales ≠ explanatory identity."
  ];
  for (const phrase of phrases) assert.ok(text.includes(phrase), phrase);
});

test("personal continuity remains typed and non-metaphysical", () => {
  assert.ok(text.includes("PersonalContinuity = {"));
  assert.ok(text.includes("Personal continuity ≠ unchanged agential capacity."));
  assert.ok(text.includes("Changed agency ≠ new person by default."));
  assert.ok(text.includes("This is not a metaphysical theory of personal identity."));
});

test("manifest and scientific descriptions remain non-substitutional", () => {
  const phrases = [
    "Scientific description ≠ replacement of lived description.",
    "Lived description ≠ exemption from scientific evidence.",
    "Phenomenal significance ≠ metaphysical proof.",
    "Therapeutic efficacy ≠ ontological validation.",
    "Scientific mechanism ≠ complete ethical judgment."
  ];
  for (const phrase of phrases) assert.ok(text.includes(phrase), phrase);
});

test("normative profile retains ownership of standing", () => {
  assert.ok(text.includes("Agency profile ≠ standing profile."));
  assert.ok(text.includes("Capacity profile ≠ moral-worth ranking."));
  assert.ok(text.includes("Normative Profile architecture remains authoritative for standing."));
});

test("research frontiers remain research frontiers", () => {
  const frontiers = [
    "Pattern of Discovery (RF-01)",
    "Cross-Perspectival Calibration (RF-02)",
    "Agency-Substrate Extraction (RF-03)",
    "Temporal Interoperability (RF-04)",
    "Repair Topology (RF-05)"
  ];
  for (const frontier of frontiers) assert.ok(text.includes(frontier), frontier);
  assert.ok(text.includes("Canonical clarification ≠ Frontier promotion."));
});

test("JTS and public reader remain stable", () => {
  assert.ok(text.includes("The current canonical JTS layer remains:"));
  assert.ok(text.includes("REPAIR"));
  assert.ok(text.includes("No new top-level public entrance is required."));
});

test("claim ceiling blocks overreach", () => {
  assert.ok(text.includes("a universal theory of responsibility"));
  assert.ok(text.includes("a solution to free will"));
  assert.ok(text.includes("a complete theory of personal identity"));
  assert.ok(text.includes("a method for fusing first- and third-person evidence"));
});
