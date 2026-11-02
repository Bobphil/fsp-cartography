import { FSPMapState } from "./types";

export function createInitialState(mapId = "map_001", now = "2026-11-01T00:00:00.000Z"): FSPMapState {
  return {
    mapId,
    schemaVersion: "fsp-cartography-0",
    title: "Untitled Map",
    createdAt: now,
    updatedAt: now,
    defaultPrivacy: "PRIVATE",
    task: null,
    nodes: [],
    claims: [],
    connections: [],
    paths: [],
    constraints: [],
    sharedTasks: [],
    actions: [],
    coachRecords: [],
    rejectedInterpretations: [],
    mapChanges: [],
    reopenItems: [],
    returns: [],
    outputCards: [],
    currentView: "START",
    version: 0
  };
}
