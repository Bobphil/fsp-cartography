export type PrivacyDomain = "PRIVATE" | "SHARED_CONSENTED" | "COURSE" | "PUBLIC_SOURCE" | "TEMP_SESSION";
export type HSFRegion = "H" | "S" | "F";
export type ViewId = "START" | "PEOPLE" | "INSTITUTION" | "HSF" | "CONNECTIONS" | "INVESTIGATE" | "RETURN";

export type TaskStatus = "FORMED" | "UNFORMED";
export interface TaskState {
  id: string;
  status: TaskStatus;
  text: string;
  origin: "USER" | "USER_CONFIRMED" | "SYSTEM_CANDIDATE";
  privacy: PrivacyDomain;
}

export type NodeType = "SELF_PRF" | "MY_MAP_OF_OTHER" | "INSTITUTION" | "PUBLIC_SOURCE";
export interface NodeState {
  id: string;
  nodeType: NodeType;
  label: string;
  relevance: string[];
  hsf: HSFRegion[];
  privacy: PrivacyDomain;
  createdBy: "USER" | "SYSTEM";
  archived: boolean;
}

export type ClaimType = "SELF_REPORT" | "OTHER_REPORT" | "OBSERVATION" | "USER_INFERENCE" | "SOURCE_DERIVED" | "UNKNOWN";
export type Verification = "VERIFIED" | "PARTIALLY_VERIFIED" | "UNVERIFIED" | "UNKNOWN";
export interface ClaimState {
  id: string;
  subjectId: string;
  text: string;
  claimType: ClaimType;
  verification: Verification;
  hsf: HSFRegion[];
  privacy: PrivacyDomain;
  archived: boolean;
}

export type ConnectionType = "COMMUNICATION" | "DEPENDENCY" | "PRACTICAL_POWER" | "AUTHORITY" | "SHARED_HISTORY" | "AFFECTS" | "SUPPORTS" | "CONSTRAINS";
export interface ConnectionState {
  id: string;
  sourceId: string;
  targetId: string;
  connectionType: ConnectionType;
  note?: string;
  status: "USER_CONFIRMED" | "UNVERIFIED" | "UNKNOWN";
  privacy: PrivacyDomain;
}

export type PathStatus = "ACTIVE" | "EXPLORATORY" | "CONDITIONAL" | "CURRENTLY_BLOCKED" | "UNMAPPED";
export interface PathState {
  id: string;
  name: string;
  status: PathStatus;
  requirements: string[];
  unknowns: string[];
  constraintIds: string[];
  nextActionIds: string[];
  privacy: PrivacyDomain;
  origin: "USER" | "SYSTEM_CANDIDATE";
  acceptedIntoMap: boolean;
}

export type ConstraintVerification = "VERIFIED" | "PARTIALLY_VERIFIED" | "ASSUMED" | "UNKNOWN";
export type ConstraintRigidity = "HARD_CURRENTLY" | "MODIFIABLE" | "CONDITIONAL" | "UNKNOWN";
export interface ConstraintState {
  id: string;
  text: string;
  epistemicStatus: ConstraintVerification;
  rigidity: ConstraintRigidity;
  scope: string;
  targetPathIds: string[];
  privacy: PrivacyDomain;
}

export type SharedTaskStatus = "CONFIRMED" | "POSSIBLE_UNCONFIRMED" | "NONE_IDENTIFIED" | "NOT_APPROPRIATE";
export interface SharedTaskState {
  id: string;
  participantIds: string[];
  status: SharedTaskStatus;
  text?: string;
  outsideScope: string[];
  privacy: PrivacyDomain;
}

export type InquiryActionType = "INFORMATION_GENERATING" | "COMMITMENT";
export interface InquiryActionState {
  id: string;
  actionType: InquiryActionType;
  text: string;
  status: "PLANNED" | "COMPLETED" | "CANCELLED";
  privacy: PrivacyDomain;
}

export type ReturnType = "JUDGMENT" | "INVESTIGATE" | "NARROW" | "CONFIRM_CONSTRAINT" | "REJECT_INTERPRETATION" | "UNRESOLVED" | "SUSPEND";
export interface AuthorialReturn {
  id: string;
  returnType: ReturnType;
  whatBecameClearer?: string;
  whatChanged?: string;
  currentJudgment?: string;
  notClaiming?: string;
  nextActionIds: string[];
  remainingUncertainty?: string;
  reopenId?: string;
  privacy: PrivacyDomain;
}

export interface ReopenItem {
  id: string;
  targetType: "TASK" | "CLAIM" | "CONSTRAINT" | "PATH" | "RETURN";
  targetId: string;
  condition: string;
  status: "OPEN" | "TRIGGERED" | "CLOSED";
  privacy: PrivacyDomain;
}

export interface RejectedInterpretation {
  id: string;
  taskId: string;
  semanticKey: string;
  originalProposal: string;
  userCorrection?: string;
  doNotReuse: true;
}

export interface CoachRecord {
  id: string;
  semanticKey: string;
  trigger: string;
  proposal: string;
  disposition: "PENDING" | "ACCEPTED" | "REJECTED" | "DISMISSED";
}

export interface MapChange {
  id: string;
  before: string;
  after: string;
  trigger: string;
  confirmedByUser: boolean;
  privacy: PrivacyDomain;
}

export interface OutputCardState {
  id: string;
  returnId: string;
  taskText: string;
  startingMap?: string;
  importantChange?: string;
  currentJudgment?: string;
  nextActions: string[];
  claimCeiling: string;
  reopenCondition?: string;
  privacy: PrivacyDomain;
  sourceObjectIds: string[];
}

export interface FSPMapState {
  mapId: string;
  schemaVersion: "fsp-cartography-0";
  title: string;
  createdAt: string;
  updatedAt: string;
  defaultPrivacy: PrivacyDomain;
  task: TaskState | null;
  nodes: NodeState[];
  claims: ClaimState[];
  connections: ConnectionState[];
  paths: PathState[];
  constraints: ConstraintState[];
  sharedTasks: SharedTaskState[];
  actions: InquiryActionState[];
  coachRecords: CoachRecord[];
  rejectedInterpretations: RejectedInterpretation[];
  mapChanges: MapChange[];
  reopenItems: ReopenItem[];
  returns: AuthorialReturn[];
  outputCards: OutputCardState[];
  currentView: ViewId;
  version: number;
}
