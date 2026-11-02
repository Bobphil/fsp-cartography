import { FSPMapState } from "./types";

export const findClaim = (state: FSPMapState, text: string) => state.claims.find(c => c.text === text);
export const findClaimContaining = (state: FSPMapState, fragment: string) => state.claims.find(c => c.text.includes(fragment));
export const findNodeByLabel = (state: FSPMapState, label: string) => state.nodes.find(n => n.label === label);
export const coachKeySuppressed = (state: FSPMapState, semanticKey: string) => state.rejectedInterpretations.some(r => r.semanticKey === semanticKey && r.doNotReuse);
