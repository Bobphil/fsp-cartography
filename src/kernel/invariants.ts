import { FSPMapState } from "./types";
import { isCanonicalHSFRegions } from "./hsf";

type Identified = { id: string };

function collectIdentified(state: FSPMapState): Array<{ collection: string; value: Identified }> {
  const collections: Array<[string, Identified[]]> = [
    ["nodes", state.nodes],
    ["claims", state.claims],
    ["connections", state.connections],
    ["paths", state.paths],
    ["constraints", state.constraints],
    ["sharedTasks", state.sharedTasks],
    ["actions", state.actions],
    ["coachRecords", state.coachRecords],
    ["rejectedInterpretations", state.rejectedInterpretations],
    ["mapChanges", state.mapChanges],
    ["reopenItems", state.reopenItems],
    ["returns", state.returns],
    ["outputCards", state.outputCards]
  ];

  if (state.task) collections.push(["task", [state.task]]);

  return collections.flatMap(([collection, values]) =>
    values.map(value => ({ collection, value }))
  );
}

export function validateInvariants(state: FSPMapState): string[] {
  const errors: string[] = [];

  const seen = new Map<string, string>();
  for (const { collection, value } of collectIdentified(state)) {
    const prior = seen.get(value.id);
    if (prior) {
      errors.push(`Duplicate id ${value.id} appears in ${prior} and ${collection}`);
    } else {
      seen.set(value.id, collection);
    }
  }

  for (const node of state.nodes) {
    if (!isCanonicalHSFRegions(node.hsf)) {
      errors.push(`Node ${node.id} must have non-empty, valid, duplicate-free H/S/F regions in canonical H,S,F order`);
    }
  }

  for (const claim of state.claims) {
    if (!isCanonicalHSFRegions(claim.hsf)) {
      errors.push(`Claim ${claim.id} must have non-empty, valid, duplicate-free H/S/F regions in canonical H,S,F order`);
    }
  }

  const selfNodes = state.nodes.filter(n => n.nodeType === "SELF_PRF");
  if (selfNodes.length > 1) {
    errors.push("Map may contain at most one SELF_PRF node");
  }

  const privateIds = new Set([
    ...state.claims.filter(x => x.privacy === "PRIVATE").map(x => x.id),
    ...state.returns.filter(x => x.privacy === "PRIVATE").map(x => x.id),
    ...state.outputCards.filter(x => x.privacy === "PRIVATE").map(x => x.id)
  ]);
  const courseIds = new Set([
    ...state.claims.filter(x => x.privacy === "COURSE").map(x => x.id),
    ...state.returns.filter(x => x.privacy === "COURSE").map(x => x.id),
    ...state.outputCards.filter(x => x.privacy === "COURSE").map(x => x.id)
  ]);
  for (const id of privateIds) {
    if (courseIds.has(id)) {
      errors.push(`Object ${id} cannot be both PRIVATE and COURSE`);
    }
  }

  const rejectedKeys = new Set(
    state.rejectedInterpretations
      .filter(x => x.doNotReuse)
      .map(x => x.semanticKey)
  );
  for (const rec of state.coachRecords) {
    if (rejectedKeys.has(rec.semanticKey) && rec.disposition === "PENDING") {
      errors.push(`Rejected coach key ${rec.semanticKey} cannot be pending again`);
    }
  }

  return errors;
}

export function assertInvariants(state: FSPMapState): void {
  const errors = validateInvariants(state);
  if (errors.length) throw new Error(errors.join("\n"));
}
