const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const target = path.join(root, "FSP-PRF-VR-3.1.md");
const text = fs.readFileSync(target, "utf8");

test("experiential integrator remains constitutional shell", () => {
  assert.ok(text.includes("FSP-VR is the experiential integrator of the FSP ecosystem."));
  assert.ok(text.includes("Sensory extension ≠ new constitutional center."));
  assert.ok(text.includes("a cognitive prosthesis, not a philosophical machine."));
});

test("assembly history is independent from current access", () => {
  assert.ok(text.includes("ACCESS AXIS"));
  assert.ok(text.includes("ASSEMBLY AXIS"));
  assert.ok(text.includes("Current sensory profile ≠ complete explanation of current actionable world."));
  assert.ok(text.includes("Present access ≠ history-free access."));
});

test("person map and unrepresented center remain explicit", () => {
  assert.ok(text.includes("My map of another person ≠ the other person."));
  assert.ok(text.includes("The Unrepresented Center"));
  assert.ok(text.includes("Constraint map ≠ possessed phenomenal world."));
});

test("cognitive prosthesis preserves decompression and recompression", () => {
  assert.ok(text.includes("DISCIPLINED DECOMPRESSION"));
  assert.ok(text.includes("RECOMPRESSION"));
  assert.ok(text.includes("better compression after disciplined decompression."));
});

test("OFF remains constitutional and transfer follows scaffold fading", () => {
  assert.ok(text.includes("OFF Is Constitutional"));
  assert.ok(text.includes("Tool recall ≠ transformed capability."));
  assert.ok(text.includes("Interface competence ≠ world competence."));
  assert.ok(text.includes("in-session learning"));
  assert.ok(text.includes("durable transfer"));
});

test("ecosystem artifact ownership remains distinct", () => {
  assert.ok(text.includes("VR replay ≠ canonical longitudinal record."));
  assert.ok(text.includes("VR reconstruction ≠ canonical historical account."));
  assert.ok(text.includes("Shared FSP governance ≠ identical domain topology."));
});

test("ethics returns after objective phenomenology", () => {
  assert.ok(text.includes("Incomplete access to another's world ≠ absence of responsibility toward that other."));
  assert.ok(text.includes("Epistemic limitation ≠ ethical erasure."));
});

test("joint inquiry remains separate from authorization and JTS", () => {
  assert.ok(text.includes("JOINT INQUIRY SPACE"));
  assert.ok(text.includes("STANDING / AUTHORIZATION"));
  assert.ok(text.includes("JOINT TASK SPACE"));
});

test("heterogeneous sensory extension remains bounded", () => {
  assert.ok(text.includes("Novel sensation ≠ philosophical value."));
  assert.ok(text.includes("Heterogeneous Access Is Not Exotic Spectacle"));
});

test("user authorship remains protected", () => {
  assert.ok(text.includes("Longitudinal trace ≠ person."));
  assert.ok(text.includes("User model ≠ authorial self."));
  assert.ok(text.includes("Pattern recognition ≠ self-knowledge."));
  assert.ok(text.includes("The system supplies evidence and structure."));
  assert.ok(text.includes("The user retains authorship."));
});

test("final claim ceiling blocks overreach", () => {
  for (const phrase of [
    "that VR produces durable cognitive transformation",
    "that users gain another person's or organism's first-person perspective",
    "that assembly history is fully recoverable",
    "that the system can determine who the user truly is"
  ]) assert.ok(text.includes(phrase), phrase);
});
