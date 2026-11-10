const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-HETEROGENEOUS-INTELLIGENCE-FORMALISM-1.md");
const text = fs.readFileSync(target, "utf8");

test("heterogeneous roles remain distinct", () => {
  for (const phrase of [
    "Formal participation ≠ equivalent agency.",
    "Evidence contribution ≠ moral standing.",
    "Computational competence ≠ personhood.",
    "Biological competence ≠ consciousness.",
    "Instrumental measurement ≠ agency."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("evidence access and topology remain typed", () => {
  for (const phrase of [
    "Same world ≠ same evidence access.",
    "Evidence token ≠ context-free fact.",
    "Evidence topology ≠ evidence hierarchy.",
    "Evidence aggregation ≠ knowledge integration.",
    "Repeated evidence ≠ independent evidence."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("translation is partial and remainder preserving", () => {
  assert.ok(text.includes("τ_ij"));
  assert.ok(text.includes("Translation ≠ identity."));
  assert.ok(text.includes("Untranslated ≠ irrelevant."));
  assert.ok(text.includes("Useful translation ≠ lossless translation."));
  assert.ok(text.includes("TranslationRemainder"));
});

test("virtual and physical experimentation remain distinct", () => {
  for (const phrase of [
    "Virtual viability ≠ physical viability.",
    "Simulation optimum ≠ real-world optimum.",
    "Virtual design ≠ constructible object.",
    "Embodied biological response ≠ execution of the computational model.",
    "Model failure ≠ inquiry failure."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("joint inquiry remains distinct from JTS and collective mind", () => {
  assert.ok(text.includes("JointInquirySpace = {"));
  assert.ok(text.includes("Shared inquiry ≠ authorization to act."));
  assert.ok(text.includes("Joint Inquiry Space ≠ collective phenomenal subject."));
  assert.ok(text.includes("Coordinated inquiry network ≠ unified phenomenal agent."));
});

test("xenobot regression preserves human computational biological and instrumental roles", () => {
  for (const role of [
    "A_H = human investigators",
    "A_C = computational search / simulation",
    "A_B = biological cellular collective",
    "A_I = instruments / imaging / measurement"
  ]) assert.ok(text.includes(role), role);
  assert.ok(text.includes("Role complementarity ≠ role equivalence."));
});

test("hypothesis space can expand rather than only reweight", () => {
  assert.ok(text.includes("Evidence update ≠ always reweighting a fixed hypothesis set."));
  assert.ok(text.includes("Physical realization can transform the hypothesis space."));
  assert.ok(text.includes("Hypothesis-Space Expansion"));
});

test("formalism remains anti-foundational and math pluralist", () => {
  assert.ok(text.includes("No mathematical family is canonical at this stage."));
  assert.ok(text.includes("Useful formal fit ≠ universal mathematical ownership."));
  assert.ok(text.includes("No participant becomes the final privileged map."));
});

test("claim ceiling blocks overreach", () => {
  for (const phrase of [
    "a universal theory of intelligence",
    "a universal evidence calculus",
    "a proof that biological systems compute in the same way as digital computers",
    "a proof that coordinated networks are collective minds",
    "a complete normative theory of hybrid inquiry"
  ]) assert.ok(text.includes(phrase), phrase);
});
