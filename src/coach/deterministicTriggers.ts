import { FSPMapState } from "../kernel/types";
import { coachKeySuppressed } from "../kernel/selectors";

export type CoachTrigger = "PROVENANCE_NEEDED" | "STRONG_UNVERIFIED_CONSTRAINT" | "INSTITUTION_MECHANISM_UNCLEAR" | "AUTHORITY_POWER_POSSIBLE_CONFUSION" | "SHARED_TASK_NOT_YET_CHOSEN" | "RETURN_READINESS";

export const messages: Record<CoachTrigger, string> = {
  PROVENANCE_NEEDED: "Is this something they told you, something you observed, your current interpretation, or are you unsure?",
  STRONG_UNVERIFIED_CONSTRAINT: "This seems important to the paths you can see. Is it verified, assumed, or still unknown?",
  INSTITUTION_MECHANISM_UNCLEAR: "Would it help to identify the rule, office, record, or person through which that happens?",
  AUTHORITY_POWER_POSSIBLE_CONFUSION: "Even without decision authority, does this person or institution have practical power to change the available paths?",
  SHARED_TASK_NOT_YET_CHOSEN: "Do you actually need or want a shared task here?",
  RETURN_READINESS: "Do you have enough clarity for the decision actually before you?"
};

export function canEmit(state: FSPMapState, semanticKey: string): boolean {
  return !coachKeySuppressed(state, semanticKey);
}
