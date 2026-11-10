const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-TRANSCENDENCE-RESEARCH-ARCHITECTURE-1.md");
const text = fs.readFileSync(target, "utf8");

test("experience mechanism interpretation and metaphysics remain distinct", () => {
  assert.ok(text.includes("EXPERIENCE ≠ MECHANISM ≠ INTERPRETATION ≠ METAPHYSICAL TRUTH."));
  assert.ok(text.includes("Mechanistic explanation ≠ phenomenological invalidation."));
  assert.ok(text.includes("Phenomenological validity ≠ metaphysical verification."));
});

test("active inference and generative models remain non-privileged", () => {
  assert.ok(text.includes("Active inference ≠ universal ontology of mind."));
  assert.ok(text.includes("Generative model ≠ PRF."));
  assert.ok(text.includes("Recursive generative modeling ≠ phenomenality by definition."));
});

test("context and perturbation are separated from experience", () => {
  assert.ok(text.includes("ContextProfile = {"));
  assert.ok(text.includes("PsychedelicPerturbationRecord = {"));
  assert.ok(text.includes("Same dose ≠ same experience."));
  assert.ok(text.includes("Drug administration ≠ transcendent experience."));
});

test("precision remains a model quantity", () => {
  assert.ok(text.includes("PrecisionProfile = {"));
  assert.ok(text.includes("Precision is a model quantity ≠ directly observed psychological certainty."));
});

test("self world boundary change is decomposed and nonmetaphysical", () => {
  assert.ok(text.includes("SelfWorldBoundaryRecord = {"));
  assert.ok(text.includes("Phenomenal unity ≠ metaphysical unity."));
  assert.ok(text.includes("Phenomenal transcendence ≠ ontological transcendence."));
});

test("noetic certainty stays distinct from epistemic warrant", () => {
  assert.ok(text.includes("NoeticClaim = {"));
  assert.ok(text.includes("Experienced certainty ≠ epistemic warrant."));
  assert.ok(text.includes("Noetic quality ≠ knowledge by definition."));
});

test("meaning and metaphysical belief change remain distinct from truth", () => {
  assert.ok(text.includes("MeaningTransformationRecord = {"));
  assert.ok(text.includes("MetaphysicalInterpretationRecord = {"));
  assert.ok(text.includes("Meaning ≠ factual accuracy."));
  assert.ok(text.includes("Psychedelic-induced metaphysical belief change ≠ metaphysical evidence by itself."));
});

test("state to trait transfer requires persistence evidence", () => {
  assert.ok(text.includes("StateTraitTransition = {"));
  assert.ok(text.includes("Acute state ≠ persistent trait."));
  assert.ok(text.includes("Near transfer ≠ durable transformation."));
  assert.ok(text.includes("State→trait claims require delayed evidence."));
});

test("integration and vulnerability stay governed", () => {
  assert.ok(text.includes("IntegrationProcess = {"));
  assert.ok(text.includes("ContextVulnerabilityRecord = {"));
  assert.ok(text.includes("Integration ≠ indoctrination."));
  assert.ok(text.includes("Reduced belief rigidity ≠ permission to install beliefs."));
});

test("heterogeneous agent comparison does not imply equivalent phenomenality", () => {
  assert.ok(text.includes("Formal similarity ≠ equivalent agency."));
  assert.ok(text.includes("Embodied control ≠ consciousness by itself."));
});

test("final discipline preserves bounded transcendence claim", () => {
  assert.ok(text.includes("Take the experience seriously without taking every interpretation literally; explain the mechanism without explaining away the experience; model the transformation without declaring the ontology settled."));
});