import { FSPAction } from "./actions";
import { FSPMapState } from "./types";

function bump(state: FSPMapState): FSPMapState {
  return { ...state, version: state.version + 1, updatedAt: new Date().toISOString() };
}

export function reducer(state: FSPMapState, action: FSPAction): FSPMapState {
  switch (action.type) {
    case "TASK_SET": return bump({ ...state, task: action.payload });
    case "NODE_ADD": return bump({ ...state, nodes: [...state.nodes, action.payload] });
    case "CLAIM_ADD": return bump({ ...state, claims: [...state.claims, action.payload] });
    case "CLAIM_RECLASSIFY":
      return bump({ ...state, claims: state.claims.map(c => c.id === action.claimId ? { ...c, claimType: action.claimType } : c) });
    case "CONNECTION_ADD": return bump({ ...state, connections: [...state.connections, action.payload] });
    case "PATH_ADD": return bump({ ...state, paths: [...state.paths, action.payload] });
    case "PATH_ACCEPT":
      return bump({ ...state, paths: state.paths.map(p => p.id === action.pathId ? { ...p, acceptedIntoMap: true } : p) });
    case "CONSTRAINT_ADD": return bump({ ...state, constraints: [...state.constraints, action.payload] });
    case "CONSTRAINT_SET_STATUS":
      return bump({ ...state, constraints: state.constraints.map(c => c.id === action.constraintId ? { ...c, epistemicStatus: action.epistemicStatus, rigidity: action.rigidity } : c) });
    case "SHARED_TASK_SET": return bump({ ...state, sharedTasks: [...state.sharedTasks, action.payload] });
    case "ACTION_ADD": return bump({ ...state, actions: [...state.actions, action.payload] });
    case "MAP_CHANGE_ADD": return bump({ ...state, mapChanges: [...state.mapChanges, action.payload] });
    case "REOPEN_ADD": return bump({ ...state, reopenItems: [...state.reopenItems, action.payload] });
    case "RETURN_ADD": return bump({ ...state, returns: [...state.returns, action.payload] });
    case "OUTPUT_CARD_ADD": return bump({ ...state, outputCards: [...state.outputCards, action.payload] });
    case "COACH_RECORD_ADD":
      return bump({ ...state, coachRecords: [...state.coachRecords, { ...action.payload, disposition: "PENDING" }] });
    case "COACH_PROPOSAL_REJECT": {
      const record = state.coachRecords.find(r => r.id === action.coachRecordId);
      if (!record) return state;
      return bump({
        ...state,
        coachRecords: state.coachRecords.map(r => r.id === record.id ? { ...r, disposition: "REJECTED" } : r),
        rejectedInterpretations: [...state.rejectedInterpretations, {
          id: `rejected_${record.id}`,
          taskId: action.taskId,
          semanticKey: record.semanticKey,
          originalProposal: record.proposal,
          userCorrection: action.userCorrection,
          doNotReuse: true
        }]
      });
    }
    case "PRIVACY_PROJECT_TO_COURSE": {
      if (action.projected.privacy !== "COURSE") throw new Error("Course projection must explicitly use COURSE privacy");
      if (action.sourceObjectType === "CLAIM") {
        return bump({ ...state, claims: [...state.claims, action.projected as any] });
      }
      if (action.sourceObjectType === "RETURN") {
        return bump({ ...state, returns: [...state.returns, action.projected as any] });
      }
      return bump({ ...state, outputCards: [...state.outputCards, action.projected as any] });
    }
    case "NAVIGATE": return { ...state, currentView: action.view };
    case "TITLE_SET": return bump({ ...state, title: action.title });
    case "DEFAULT_PRIVACY_SET": return bump({ ...state, defaultPrivacy: action.privacy });
    default: return state;
  }
}
