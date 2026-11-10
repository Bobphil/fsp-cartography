const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-OBJECTIVE-PHENOMENOLOGY-FORMALISM-PRESSURE-AUDIT-1.md");
const text = fs.readFileSync(target, "utf8");

test("pre-evidential stack remains explicit", () => {
  for (const phrase of [
    "WORLD / TARGET RELATION",
    "INFORMATION-BEARING RELATION",
    "ACCESS RELATION",
    "REGISTRATION / DETECTION",
    "DISCRIMINATION",
    "SALIENCE / TASK RELEVANCE",
    "ACTIONABILITY",
    "EVIDENCE CONSTRUCTION"
  ]) assert.ok(text.includes(phrase), phrase);
});

test("information is distinct from evidence and meaning", () => {
  assert.ok(text.includes("Information-bearing relation ≠ evidence."));
  assert.ok(text.includes("Information availability ≠ information uptake."));
  assert.ok(text.includes("Information ≠ meaning by default."));
});

test("access is indexed and nonidentical to awareness or possession", () => {
  assert.ok(text.includes("Access(accessor, target, route, conditions, time)"));
  assert.ok(text.includes("Access ≠ possession."));
  assert.ok(text.includes("Access ≠ awareness."));
  assert.ok(text.includes("Access ≠ understanding."));
});

test("detection definition stays criterion-relative and nonphenomenal", () => {
  assert.ok(text.includes("Detection is criterion-relative registration"));
  assert.ok(text.includes("Detection ≠ conscious awareness."));
  assert.ok(text.includes("Detection ≠ discrimination among alternatives."));
  assert.ok(text.includes("Detection event ≠ stable detection capability."));
});

test("discrimination remains distinct from detection and phenomenality", () => {
  assert.ok(text.includes("Discrimination is reliable differential responsiveness"));
  assert.ok(text.includes("Detection ≠ discrimination."));
  assert.ok(text.includes("Discrimination ≠ phenomenal contrast by itself."));
});

test("remainder is typed and not equated with ignorance", () => {
  assert.ok(text.includes("RemainderRecord = {"));
  assert.ok(text.includes("Remainder ≠ ignorance simpliciter."));
  assert.ok(text.includes("Remainder type ≠ metaphysical status."));
  assert.ok(text.includes("Unresolved ≠ unresolvable."));
});

test("constraint typing remains explicit", () => {
  assert.ok(text.includes("ConstraintRecord = {"));
  assert.ok(text.includes("Constraint type ≠ constraint strength."));
  assert.ok(text.includes("Empirical constraint ≠ metaphysical necessity."));
});

test("active access loop remains action-dependent", () => {
  assert.ok(text.includes("ActiveAccessLoop = {"));
  assert.ok(text.includes("Access need not precede action; action may constitute access."));
});

test("translation topology remains stronger than pairwise translation", () => {
  assert.ok(text.includes("TranslationTopology = {"));
  assert.ok(text.includes("Pairwise translatability ≠ globally lossless translation."));
  assert.ok(text.includes("Composed translation ≠ identity preservation."));
});

test("phenomenal bridge remains domain-local and nonidentity preserving", () => {
  assert.ok(text.includes("PhenomenalBridgeClaim = {"));
  assert.ok(text.includes("Functional structure ≠ phenomenal structure by stipulation."));
});

test("formal style rule requires who has access and how", () => {
  for (const phrase of ["WHO?", "TO WHAT?", "BY WHAT ROUTE?", "UNDER WHAT CONDITIONS?", "FOR WHAT TASK?", "WITH WHAT LIMIT?"]) {
    assert.ok(text.includes(phrase), phrase);
  }
});

test("worked instrument example preserves access distinctions", () => {
  assert.ok(text.includes("Instrument registration ≠ human direct detection."));
  assert.ok(text.includes("Human mediated access ≠ bat sensory access."));
});

test("promotion discipline keeps experimental objects provisional", () => {
  assert.ok(text.includes("Likely canonical-support candidates after regression:"));
  assert.ok(text.includes("Remain experimental:"));
  assert.ok(text.includes("PhenomenalBridgeClaim"));
});