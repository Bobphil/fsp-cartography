import { FSPMapState, ViewId } from "../kernel/types";

export interface ViewContract {
  id: ViewId;
  label: string;
  purpose: string;
  carries: string[];
  edits: string[];
  emptyState: string;
}

export const VIEW_ORDER: ViewId[] = [
  "START",
  "PEOPLE",
  "INSTITUTION",
  "HSF",
  "CONNECTIONS",
  "INVESTIGATE",
  "RETURN"
];

export const VIEW_CONTRACTS: Record<ViewId, ViewContract> = {
  START: {
    id: "START",
    label: "Start",
    purpose: "Form or deliberately leave unformed the task that bounds this map.",
    carries: ["task", "defaultPrivacy"],
    edits: ["task", "title", "defaultPrivacy"],
    emptyState: "No task is formed yet. Orientation without premature task formation is valid."
  },
  PEOPLE: {
    id: "PEOPLE",
    label: "People",
    purpose: "Represent self and other people without collapsing a map of another person into that person.",
    carries: ["task", "nodes", "claims"],
    edits: ["nodes", "claims"],
    emptyState: "No people are represented yet."
  },
  INSTITUTION: {
    id: "INSTITUTION",
    label: "Institution",
    purpose: "Represent institutional actors and constraints separately from persons.",
    carries: ["task", "nodes", "claims", "constraints"],
    edits: ["nodes", "claims", "constraints"],
    emptyState: "No institution or institutional constraint is represented yet."
  },
  HSF: {
    id: "HSF",
    label: "H / S / F",
    purpose: "Locate relevant map elements across historical, situated, and forward regions without treating regions as verdicts.",
    carries: ["nodes", "claims"],
    edits: ["nodes", "claims"],
    emptyState: "No H/S/F placement has been recorded yet."
  },
  CONNECTIONS: {
    id: "CONNECTIONS",
    label: "Connections",
    purpose: "Map relations while keeping practical power distinct from authority and shared task distinct from agreement.",
    carries: ["nodes", "connections", "sharedTasks"],
    edits: ["connections", "sharedTasks"],
    emptyState: "No connection or shared task has been identified yet."
  },
  INVESTIGATE: {
    id: "INVESTIGATE",
    label: "Investigate",
    purpose: "Expose paths, constraints, information-generating actions, and bounded possibilities for inquiry.",
    carries: ["task", "paths", "constraints", "actions", "coachRecords"],
    edits: ["paths", "constraints", "actions", "coachRecords"],
    emptyState: "No investigation path or next inquiry action has been recorded yet."
  },
  RETURN: {
    id: "RETURN",
    label: "Return",
    purpose: "Return authorship to the user through bounded judgment, next action, claim ceiling, and REOPEN conditions.",
    carries: ["task", "mapChanges", "returns", "outputCards", "reopenItems"],
    edits: ["mapChanges", "returns", "outputCards", "reopenItems"],
    emptyState: "No Authorial Return has been recorded yet."
  }
};

export interface ShellViewModel {
  current: ViewContract;
  navigation: Array<{ id: ViewId; label: string; active: boolean }>;
  mapTitle: string;
  mapVersion: number;
  taskStatus: "FORMED" | "UNFORMED" | "NONE";
}

export function buildShellViewModel(state: FSPMapState): ShellViewModel {
  return {
    current: VIEW_CONTRACTS[state.currentView],
    navigation: VIEW_ORDER.map(id => ({
      id,
      label: VIEW_CONTRACTS[id].label,
      active: id === state.currentView
    })),
    mapTitle: state.title,
    mapVersion: state.version,
    taskStatus: state.task?.status ?? "NONE"
  };
}
