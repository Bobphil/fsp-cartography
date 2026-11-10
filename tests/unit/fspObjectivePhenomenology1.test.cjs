const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-OBJECTIVE-PHENOMENOLOGY-1.md");
const text = fs.readFileSync(target, "utf8");

test("Nagel constraint and partial knowledge are both preserved", () => {
  assert.ok(text.includes("Objective phenomenology ≠ first-person equivalence."));
  assert.ok(text.includes("Partial objective phenomenology is possible."));
  assert.ok(text.includes("Third-person reconstruction ≠ possession of first-person experience."));
});

test("four-level distinction remains explicit", () => {
  assert.ok(text.includes("Detectable ≠ discriminable ≠ actionable ≠ phenomenal."));
  assert.ok(text.includes("W"));
  assert.ok(text.includes("D_i(W)"));
  assert.ok(text.includes("P_i"));
});

test("Umwelt map remains distinct from organism lived world", () => {
  assert.ok(text.includes("Umwelt Constraint Map ≠ organism's Umwelt."));
  assert.ok(text.includes("Different sensory world ≠ deficient human sensory world."));
});

test("phenomenal remainder remains explicit and revisable", () => {
  assert.ok(text.includes("PhenomenalTranslationRemainder"));
  assert.ok(text.includes("Scientific progress ≠ elimination of all phenomenal remainder."));
  assert.ok(text.includes("Currently inaccessible ≠ metaphysically inaccessible."));
});

test("evidence remains typed and non-reductive", () => {
  for (const phrase of [
    "Behavioral discrimination ≠ direct phenomenal report.",
    "Neural correlate ≠ qualitative character.",
    "Comparative similarity ≠ phenomenal identity.",
    "Causal contribution ≠ phenomenal content.",
    "Evidence topology ≠ evidence hierarchy."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("artificial sensory reconstruction does not become animal experience", () => {
  assert.ok(text.includes("Artificial sensory reconstruction ≠ reconstructed animal experience."));
  assert.ok(text.includes("Artificial reconstruction can test accessibility without reproducing phenomenality."));
  assert.ok(text.includes("Human imaginative simulation ≠ bat point of view."));
});

test("bat regression preserves structural inference and qualitative remainder", () => {
  assert.ok(text.includes("SUPPORTED:"));
  assert.ok(text.includes("NOT LICENSED:"));
  assert.ok(text.includes("REMAINDER:"));
  assert.ok(text.includes("Acoustic cognitive map-based navigation in echolocating bats"));
});

test("objective phenomenology is formalized as constraint science", () => {
  assert.ok(text.includes("Objective phenomenology should be treated as a constraint science rather than a duplication project."));
  assert.ok(text.includes("PhenomenalConstraintLedger"));
  assert.ok(text.includes("PhenomenalEquivalenceClass"));
  assert.ok(text.includes("ConstraintOperator"));
});

test("standing and metaphysics remain separate", () => {
  assert.ok(text.includes("Phenomenal evidence can inform standing judgments without determining them automatically."));
  assert.ok(text.includes("It remains neutral among:"));
  assert.ok(text.includes("physicalism"));
  assert.ok(text.includes("dual-aspect views"));
});

test("claim ceiling blocks consciousness overreach", () => {
  for (const phrase of [
    "what echolocation intrinsically feels like to a bat",
    "that all organisms possess consciousness",
    "that objective phenomenology resolves the explanatory gap",
    "that FSP provides a general theory of consciousness"
  ]) assert.ok(text.includes(phrase), phrase);
});
