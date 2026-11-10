const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-RECURSIVE-SCALE-ARCHITECTURE-1.1.md");
const text = fs.readFileSync(target, "utf8");

test("ScaleKind typing is explicit", () => {
  for (const phrase of ["PHYSICAL","ORGANIZATIONAL","TEMPORAL","SPATIAL","REPRESENTATIONAL","INSTITUTIONAL","ScaleKind ≠ ontological level taxonomy."]) assert.ok(text.includes(phrase), phrase);
});

test("RelationDomain separates target and inquiry recursion", () => {
  for (const phrase of ["TARGET_SYSTEM","INQUIRY_SYSTEM","COUPLED_TARGET_INQUIRY","Target recursion ≠ inquiry recursion."]) assert.ok(text.includes(phrase), phrase);
});

test("Emergence optionality is preserved", () => {
  for (const phrase of ["REQUIRED","SUPPORTED","OPTIONAL_DESCRIPTION","NOT_APPLICABLE","CONTESTED","Absence of emergence language can be a positive regression result."]) assert.ok(text.includes(phrase), phrase);
});

test("BridgeBurden is typed and non-scalar", () => {
  assert.ok(text.includes("BridgeBurden = {"));
  assert.ok(text.includes("identityAssumption"));
  assert.ok(text.includes("mechanismAssumption"));
  assert.ok(text.includes("calibrationAssumption"));
  assert.ok(text.includes("normativeAssumption"));
  assert.ok(text.includes("Bridge burden is typed, not summed by default."));
});

test("BridgeBurdenLedger is explicit", () => {
  assert.ok(text.includes("BridgeBurdenLedger = {"));
  assert.ok(text.includes("highBurdenBridges"));
  assert.ok(text.includes("unresolvedAssumptions"));
  assert.ok(text.includes("Hidden bridge burden is the primary danger."));
});

test("relation type remains distinct from mechanism", () => {
  assert.ok(text.includes("Relation type ≠ mechanism."));
  for (const phrase of ["TRANSLATES","AGGREGATES","CALIBRATES","CLASSIFIES","PERTURBS"]) assert.ok(text.includes(phrase), phrase);
});

test("promotion tiers remain distinct", () => {
  assert.ok(text.includes("Tier A — Promote Toward Core / Canonical-Support"));
  assert.ok(text.includes("Tier B — Canonical-Support Candidate / Optional"));
  assert.ok(text.includes("Tier C — Experimental / Domain-Local"));
});

test("emergence and organism-environment machinery remain outside Core", () => {
  assert.ok(text.includes("`EmergenceRecord`;"));
  assert.ok(text.includes("`OrganismEnvironmentLoop`;"));
  assert.ok(text.includes("Keep outside Core:"));
});

test("portable does not become mandatory", () => {
  assert.ok(text.includes("Portable ≠ mandatory."));
  assert.ok(text.includes("Full-scale graph ≠ mandatory complete ontology."));
  assert.ok(text.includes("EmergenceStatus = NOT_APPLICABLE"));
});

test("core promotion remains bounded by regression discipline", () => {
  assert.ok(text.includes("Regression success ≠ automatic canonization."));
  for (const phrase of ["stable definition","cross-domain usefulness","no hidden ontology import","executable regression coverage"]) assert.ok(text.includes(phrase), phrase);
});

test("final reconciliation preserves translational-formalism claim", () => {
  assert.ok(text.includes("A translational formalism should make relation structure portable while allowing ontology, mechanism, and even the relevance of particular concepts to remain domain-specific."));
});