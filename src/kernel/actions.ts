import {
  AuthorialReturn, ClaimState, ConnectionState, ConstraintState, InquiryActionState,
  MapChange, NodeState, OutputCardState, PathState, PrivacyDomain, ReopenItem,
  SharedTaskState, TaskState, ViewId
} from "./types";

export type FSPAction =
  | { type: "TASK_SET"; payload: TaskState }
  | { type: "NODE_ADD"; payload: NodeState }
  | { type: "CLAIM_ADD"; payload: ClaimState }
  | { type: "CLAIM_RECLASSIFY"; claimId: string; claimType: ClaimState["claimType"] }
  | { type: "CONNECTION_ADD"; payload: ConnectionState }
  | { type: "PATH_ADD"; payload: PathState }
  | { type: "PATH_ACCEPT"; pathId: string }
  | { type: "CONSTRAINT_ADD"; payload: ConstraintState }
  | { type: "CONSTRAINT_SET_STATUS"; constraintId: string; epistemicStatus: ConstraintState["epistemicStatus"]; rigidity: ConstraintState["rigidity"] }
  | { type: "SHARED_TASK_SET"; payload: SharedTaskState }
  | { type: "ACTION_ADD"; payload: InquiryActionState }
  | { type: "MAP_CHANGE_ADD"; payload: MapChange }
  | { type: "REOPEN_ADD"; payload: ReopenItem }
  | { type: "RETURN_ADD"; payload: AuthorialReturn }
  | { type: "OUTPUT_CARD_ADD"; payload: OutputCardState }
  | { type: "COACH_RECORD_ADD"; payload: { id: string; semanticKey: string; trigger: string; proposal: string } }
  | { type: "COACH_PROPOSAL_REJECT"; coachRecordId: string; taskId: string; userCorrection?: string }
  | { type: "PRIVACY_PROJECT_TO_COURSE"; sourceObjectType: "CLAIM" | "RETURN" | "OUTPUT_CARD"; sourceObjectId: string; projected: ClaimState | AuthorialReturn | OutputCardState }
  | { type: "NAVIGATE"; view: ViewId }
  | { type: "TITLE_SET"; title: string }
  | { type: "DEFAULT_PRIVACY_SET"; privacy: PrivacyDomain };
