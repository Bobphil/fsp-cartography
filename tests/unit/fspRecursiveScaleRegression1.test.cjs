const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-RECURSIVE-SCALE-REGRESSION-1.md");
const text = fs.readFileSync(target, "utf8");

test("all four regression cases are present", () => {
  for (const phrase of [
    "Case A — Bat Echolocation",
    "Case B — Planaria",
    "Case C — Astronomy Measurement",
    "Case D — Institutional Reporting"
  ]) assert.ok(text.includes(phrase), phrase);
});

test("portable relation grammar is explicit", () => {
  for (const phrase of [
    "ScaleRelation",
    "ScaleRelationGraph",
    "RecursiveScaleLoop",
    "ScaleBridgeRecord",
    "EvidenceBridgeGraph",
    "TargetBinding",
    "ConstraintRecord",
    "RemainderRecord",
    "TranslationTopology"
  ]) assert.ok(text.includes(phrase), phrase);
});

test("bat case preserves active sensing and phenomenal ceiling", () => {
  assert.ok(text.includes("call + movement"));
  assert.ok(text.includes("neural representation ≠ phenomenal spatial identity"));
  assert.ok(text.includes("CLEAN PASS."));
});

test("planaria case does not force sensory access language", () => {
  assert.ok(text.includes("ACCESS_EMERGENCE: not primary here"));
  assert.ok(text.includes("PASS BY DISCIPLINE"));
  assert.ok(text.includes("Same present morphology ≠ same assembly history ≠ same future possibility structure."));
});

test("DESI case shows emergence can be non-applicable", () => {
  assert.ok(text.includes("Forcing \"emergence\" onto calibrated spectra"));
  assert.ok(text.includes("PASS BY NON-USE."));
  assert.ok(text.includes("ScaleKind = {"));
});

test("institutional case preserves ontology firewall", () => {
  assert.ok(text.includes("institution ≠ organism"));
  assert.ok(text.includes("institutional detection ≠ phenomenal awareness"));
  assert.ok(text.includes("higher-level coordination ≠ composite subject"));
});

test("metaphorical strain audit is explicit", () => {
  assert.ok(text.includes("Metaphorical-Strain Audit"));
  assert.ok(text.includes("emergence is optional and typed"));
  assert.ok(text.includes("AccessRelation is route-typed"));
});

test("new pressure fields are captured", () => {
  assert.ok(text.includes("RelationDomain"));
  assert.ok(text.includes("EmergenceStatus"));
  assert.ok(text.includes("BridgeBurden"));
});

test("core promotion remains bounded", () => {
  assert.ok(text.includes("Promote toward FSP Core / canonical-support"));
  assert.ok(text.includes("Keep experimental / domain-local"));
  assert.ok(text.includes("biological/phenomenal specializations outside the Core"));
});

test("overall regression verdict is pass without universal mechanism claim", () => {
  assert.ok(text.includes("FOUR-CASE REGRESSION: PASS."));
  assert.ok(text.includes("The portability lies in the grammar of governed relations."));
  assert.ok(text.includes("all domains share one emergence mechanism"));
});
