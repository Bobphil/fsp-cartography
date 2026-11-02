import { FSPMapState } from "./types";

export function validateInvariants(state: FSPMapState): string[] {
  const errors: string[] = [];

  for (const node of state.nodes) {
    if (node.nodeType === "INSTITUTION" && node.id === state.nodes.find(n => n.nodeType === "SELF_PRF")?.id) {
      errors.push("Institution cannot also be SELF_PRF");
    }
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
  for (const id of privateIds) if (courseIds.has(id)) errors.push(`Object ${id} cannot be both PRIVATE and COURSE`);

  const rejectedKeys = new Set(state.rejectedInterpretations.filter(x => x.doNotReuse).map(x => x.semanticKey));
  for (const rec of state.coachRecords) {
    if (rejectedKeys.has(rec.semanticKey) && rec.disposition === "PENDING" && !state.rejectedInterpretations.some(r => r.id === `rejected_${rec.id}`)) {
      errors.push(`Rejected coach key ${rec.semanticKey} cannot be pending again`);
    }
  }

  return errors;
}

export function assertInvariants(state: FSPMapState): void {
  const errors = validateInvariants(state);
  if (errors.length) throw new Error(errors.join("\n"));
}
