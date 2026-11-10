const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-RECURSIVE-SCALE-ARCHITECTURE-1.md");
const text = fs.readFileSync(target, "utf8");

test("scale is aperture not universal ladder", () => {
  assert.ok(text.includes("Scale partition ≠ ontology of nature."));
  assert.ok(text.includes("Chosen aperture ≠ uniquely correct level."));
  assert.ok(text.includes("Multi-scale organization ≠ one-way hierarchy."));
});

test("scale relations are typed", () => {
  for (const phrase of [
    "CONSTITUTES",
    "ENABLES",
    "CONSTRAINS",
    "MODULATES",
    "COORDINATES",
    "REALIZES",
    "TRANSLATES",
    "EVIDENCES"
  ]) assert.ok(text.includes(phrase), phrase);
});

test("emergence is typed and non-magical", () => {
  for (const phrase of [
    "STRUCTURAL_EMERGENCE",
    "CAPABILITY_EMERGENCE",
    "ACCESS_EMERGENCE",
    "CONSTRAINT_EMERGENCE",
    "Calling a property emergent ≠ explaining its emergence.",
    "Emergence ≠ explanatory magic."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("recursive scale loop preserves bidirectionality", () => {
  assert.ok(text.includes("RecursiveScaleLoop = {"));
  assert.ok(text.includes("Emergence ≠ a one-way move from lower to higher level."));
  assert.ok(text.includes("Higher-scale organization can constrain lower-scale transition possibilities"));
});

test("access and detection are scale indexed", () => {
  assert.ok(text.includes("accessorScale"));
  assert.ok(text.includes("detectorScale"));
  assert.ok(text.includes("targetScale"));
  assert.ok(text.includes("Detection at one scale ≠ detection at another scale."));
  assert.ok(text.includes("Component registration ≠ organism-level detection by default."));
});

test("detection chain blocks local-to-organism collapse", () => {
  assert.ok(text.includes("DetectionChain = {"));
  assert.ok(text.includes("local registration is not equated with organism-level detection"));
});

test("organism environment loop remains coupled but nonidentical", () => {
  assert.ok(text.includes("OrganismEnvironmentLoop = {"));
  assert.ok(text.includes("Organism and environment are coupled in inquiry-relevant access without being identical."));
  assert.ok(text.includes("Environment ≠ static input field."));
});

test("cross-scale evidence requires explicit bridge", () => {
  assert.ok(text.includes("ScaleBridgeRecord = {"));
  assert.ok(text.includes("EvidenceBridgeGraph = {"));
  assert.ok(text.includes("Evidence from one scale does not automatically license claims at another."));
  assert.ok(text.includes("Cross-scale inference requires a bridge record."));
});

test("target recursion and inquiry recursion remain distinct", () => {
  assert.ok(text.includes("TARGET_RECURSION"));
  assert.ok(text.includes("INQUIRY_RECURSION"));
  assert.ok(text.includes("Observation can become intervention, and intervention can create new access."));
});

test("anti-reduction and anti-holism remain explicit", () => {
  assert.ok(text.includes("Substrate realization ≠ explanatory exhaustion."));
  assert.ok(text.includes("Higher-level usefulness ≠ independence from substrate."));
});

test("phenomenal ceiling remains intact", () => {
  assert.ok(text.includes("multiscale functional explanation does not by itself license phenomenal identity"));
  assert.ok(text.includes("that cross-scale functional organization determines phenomenal structure"));
});
