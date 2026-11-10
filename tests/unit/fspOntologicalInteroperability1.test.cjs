const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-ONTOLOGICAL-INTEROPERABILITY-1.md");
const text = fs.readFileSync(target, "utf8");

test("ontology relevance is distinct from convergence", () => {
  assert.ok(text.includes("Ontology relevance ≠ ontology requirement ≠ ontological convergence."));
  assert.ok(text.includes("ontology-relevant"));
  assert.ok(text.includes("ontology-privileged"));
  assert.ok(text.includes("ontology-shared"));
});

test("non-privilege and sufficiency principles are explicit", () => {
  assert.ok(text.includes("Ontological Non-Privilege Principle"));
  assert.ok(text.includes("Ontological Sufficiency Principle"));
  assert.ok(text.includes("No representation, scale, ontology, or agent-native partition receives universal privilege"));
  assert.ok(text.includes("Heterogeneous agents need share only enough structure"));
});

test("translation anchors preserve relation without ontology identity", () => {
  assert.ok(text.includes("TranslationAnchor = {"));
  assert.ok(text.includes("Preserved relation ≠ shared representation."));
  assert.ok(text.includes("Shared representation ≠ shared ontology."));
  assert.ok(text.includes("Translation success ≠ ontology convergence."));
});

test("operational sufficiency is bounded and nonmetaphysical", () => {
  assert.ok(text.includes("OperationalSufficiencyRecord = {"));
  assert.ok(text.includes("Operational sufficiency ≠ metaphysical agreement."));
  assert.ok(text.includes("Interoperable for task T ≠ interoperable without qualification."));
});

test("joint task space does not require shared ontology", () => {
  assert.ok(text.includes("JTS requires sufficient interoperability, not complete ontology sharing."));
  assert.ok(text.includes("Joint inquiry ≠ shared ontology."));
});

test("substrate realization does not become universal substrate privilege", () => {
  assert.ok(text.includes("SubstrateProfile = {"));
  assert.ok(text.includes("Realization requirement ≠ universal substrate privilege."));
  assert.ok(text.includes("SubstrateProfile ≠ final metaphysical substrate."));
  assert.ok(text.includes("Common formal role ≠ common ontological realization."));
});

test("Quine and Putnam comparators remain bounded", () => {
  assert.ok(text.includes("Quine–FSP Crosswalk"));
  assert.ok(text.includes("Putnam–FSP Crosswalk"));
  assert.ok(text.includes("Quinean underdetermination of reference ≠ FSP claim that ontology is irrelevant."));
  assert.ok(text.includes("Conceptual plurality can coexist with non-arbitrary constraint."));
});

test("anti-relativism and anti-anthropocentrism remain explicit", () => {
  assert.ok(text.includes("Ontological non-privilege ≠ all ontologies are equally adequate."));
  assert.ok(text.includes("Human-native ontology ≠ universal ontology by default."));
});

test("sentience claim ceiling remains intact", () => {
  assert.ok(text.includes("Shared physical environment ≠ privileged shared phenomenal ontology."));
  assert.ok(text.includes("consciousness from detection"));
  assert.ok(text.includes("substrate independence from cross-system formal similarity"));
});

test("final architecture preserves bounded interoperability", () => {
  assert.ok(text.includes("Require enough shared structure for the task; require no more ontology than the task and evidence justify; preserve the remainder where translation stops."));
});