const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-PRF-VR-3.md");
const text = fs.readFileSync(target, "utf8");

test("sensory world distinctions remain explicit", () => {
  for (const phrase of [
    "World model ≠ rendered experience.",
    "Sensory profile ≠ organism.",
    "Present in world ≠ detectable by agent.",
    "Detectable ≠ discriminable.",
    "Discriminable ≠ actionable.",
    "Actionable structure ≠ phenomenal character."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("phenomenal ceiling and translation remainder remain visible", () => {
  assert.ok(text.includes("VR rendering ≠ another organism's experience."));
  assert.ok(text.includes("Translation aid ≠ perceptual equivalence."));
  assert.ok(text.includes("TRANSLATED"));
  assert.ok(text.includes("NOT TRANSLATED"));
  assert.ok(text.includes("UNKNOWN"));
});

test("joint inquiry does not collapse agents or authorization", () => {
  assert.ok(text.includes("Coordinated inquiry ≠ unified phenomenal subject."));
  assert.ok(text.includes("Shared task ≠ shared experience."));
  assert.ok(text.includes("Evidence integration ≠ cognitive fusion."));
  assert.ok(text.includes("Joint Inquiry does not authorize physical intervention by itself."));
});

test("virtual to physical distinction remains intact", () => {
  for (const phrase of [
    "VR success ≠ real-world validation.",
    "Simulated sufficiency ≠ biological mechanism.",
    "Virtual agent performance ≠ organismal evidence."
  ]) assert.ok(text.includes(phrase), phrase);
});

test("pattern of discovery transfer test preserves scaffold fading discipline", () => {
  assert.ok(text.includes("Tool recall ≠ transformed discrimination."));
  assert.ok(text.includes("in-session performance"));
  assert.ok(text.includes("near transfer"));
  assert.ok(text.includes("far transfer"));
  assert.ok(text.includes("durable transfer"));
  assert.ok(text.includes("Scaffold Fading"));
});

test("bat pilot preserves active sensing and nonidentity", () => {
  assert.ok(text.includes("THIS MODE SIMULATES:"));
  assert.ok(text.includes("THIS MODE DOES NOT SIMULATE:"));
  assert.ok(text.includes("Active sensing"));
  assert.ok(text.includes("Human sensory substitution ≠ nonhuman sensory phenomenology."));
});

test("experiment handoff retains ethics and authorization", () => {
  assert.ok(text.includes("ExperimentProposal = {"));
  assert.ok(text.includes("standingIssues"));
  assert.ok(text.includes("authorizationNeeded"));
  assert.ok(text.includes("physical claims require real-world evidence"));
});

test("data layers stay separated", () => {
  for (const phrase of [
    "simulation state",
    "participant behavior",
    "participant self-report",
    "model inference",
    "researcher interpretation"
  ]) assert.ok(text.includes(phrase), phrase);
});

test("anthropomorphism and mechanomorphism are both guarded", () => {
  assert.ok(text.includes("Anthropomorphism Sentinel"));
  assert.ok(text.includes("Mechanomorphism Sentinel"));
  assert.ok(text.includes("Avoiding anthropomorphism ≠ reducing organism to mechanism."));
});

test("claim ceiling blocks VR overreach", () => {
  for (const phrase of [
    "what it is intrinsically like to be a bat",
    "that VR can reproduce another organism's phenomenology",
    "that artificial agents possess experience",
    "that immediate learning equals durable perceptual transformation",
    "that Joint Inquiry creates a collective mind"
  ]) assert.ok(text.includes(phrase), phrase);
});
