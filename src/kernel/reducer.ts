import { FSPAction } from "./actions";
import { FSPMapState } from "./types";
import { normalizeHSFRegions, sameHSFRegions } from "./hsf";

function bump(state: FSPMapState): FSPMapState {
  // Reducers must be deterministic. Timestamps are supplied by the outer application boundary,
  // not read from the clock during a state transition.
  return { ...state, version: state.version + 1 };
}

function hasSuppressedCoachKey(state: FSPMapState, semanticKey: string): boolean {
  return state.rejectedInterpretations.some(
    r => r.semanticKey === semanticKey && r.doNotReuse
  );
}

export function reducer(state: FSPMapState, action: FSPAction): FSPMapState {
  switch (action.type) {
    case "TASK_SET":
      return bump({ ...state, task: action.payload });

    case "NODE_ADD":
      return bump({ ...state, nodes: [...state.nodes, action.payload] });

    case "CLAIM_ADD":
      return bump({ ...state, claims: [...state.claims, action.payload] });

    case "HSF_SET": {
      const regions = normalizeHSFRegions(action.regions);

      if (action.targetType === "NODE") {
        const target = state.nodes.find(n => n.id === action.targetId);
        if (!target) return state;
        if (sameHSFRegions(target.hsf, regions)) return state;

        return bump({
          ...state,
          nodes: state.nodes.map(n =>
            n.id === action.targetId ? { ...n, hsf: regions } : n
          )
        });
      }

      const target = state.claims.find(c => c.id === action.targetId);
      if (!target) return state;
      if (sameHSFRegions(target.hsf, regions)) return state;

      return bump({
        ...state,
        claims: state.claims.map(c =>
          c.id === action.targetId ? { ...c, hsf: regions } : c
        )
      });
    }

    case "CLAIM_RECLASSIFY": {
      if (!state.claims.some(c => c.id === action.claimId)) return state;
      return bump({
        ...state,
        claims: state.claims.map(c =>
          c.id === action.claimId ? { ...c, claimType: action.claimType } : c
        )
      });
    }

    case "CONNECTION_ADD":
      return bump({ ...state, connections: [...state.connections, action.payload] });

    case "PATH_ADD":
      return bump({ ...state, paths: [...state.paths, action.payload] });

    case "PATH_ACCEPT": {
      if (!state.paths.some(p => p.id === action.pathId)) return state;
      return bump({
        ...state,
        paths: state.paths.map(p =>
          p.id === action.pathId ? { ...p, acceptedIntoMap: true } : p
        )
      });
    }

    case "CONSTRAINT_ADD":
      return bump({ ...state, constraints: [...state.constraints, action.payload] });

    case "CONSTRAINT_SET_STATUS": {
      if (!state.constraints.some(c => c.id === action.constraintId)) return state;
      return bump({
        ...state,
        constraints: state.constraints.map(c =>
          c.id === action.constraintId
            ? {
                ...c,
                epistemicStatus: action.epistemicStatus,
                rigidity: action.rigidity
              }
            : c
        )
      });
    }

    case "SHARED_TASK_SET":
      return bump({ ...state, sharedTasks: [...state.sharedTasks, action.payload] });

    case "ACTION_ADD":
      return bump({ ...state, actions: [...state.actions, action.payload] });

    case "MAP_CHANGE_ADD":
      return bump({ ...state, mapChanges: [...state.mapChanges, action.payload] });

    case "REOPEN_ADD":
      return bump({ ...state, reopenItems: [...state.reopenItems, action.payload] });

    case "RETURN_ADD":
      return bump({ ...state, returns: [...state.returns, action.payload] });

    case "OUTPUT_CARD_ADD":
      return bump({ ...state, outputCards: [...state.outputCards, action.payload] });

    case "COACH_RECORD_ADD":
      if (hasSuppressedCoachKey(state, action.payload.semanticKey)) return state;
      return bump({
        ...state,
        coachRecords: [
          ...state.coachRecords,
          { ...action.payload, disposition: "PENDING" }
        ]
      });

    case "COACH_PROPOSAL_REJECT": {
      const record = state.coachRecords.find(r => r.id === action.coachRecordId);
      if (!record) return state;
      if (record.disposition === "REJECTED") return state;

      return bump({
        ...state,
        coachRecords: state.coachRecords.map(r =>
          r.id === record.id ? { ...r, disposition: "REJECTED" } : r
        ),
        rejectedInterpretations: [
          ...state.rejectedInterpretations,
          {
            id: `rejected_${record.id}`,
            taskId: action.taskId,
            semanticKey: record.semanticKey,
            originalProposal: record.proposal,
            userCorrection: action.userCorrection,
            doNotReuse: true
          }
        ]
      });
    }

    case "PRIVACY_PROJECT_TO_COURSE": {
      if (action.projected.privacy !== "COURSE") {
        throw new Error("Course projection must explicitly use COURSE privacy");
      }

      if (action.projected.id === action.sourceObjectId) {
        throw new Error("Course projection must use a distinct object id");
      }

      if (action.sourceObjectType === "CLAIM") {
        if (!state.claims.some(x => x.id === action.sourceObjectId)) {
          throw new Error(`Projection source claim ${action.sourceObjectId} not found`);
        }
        return bump({
          ...state,
          claims: [...state.claims, action.projected as typeof state.claims[number]]
        });
      }

      if (action.sourceObjectType === "RETURN") {
        if (!state.returns.some(x => x.id === action.sourceObjectId)) {
          throw new Error(`Projection source return ${action.sourceObjectId} not found`);
        }
        return bump({
          ...state,
          returns: [...state.returns, action.projected as typeof state.returns[number]]
        });
      }

      if (!state.outputCards.some(x => x.id === action.sourceObjectId)) {
        throw new Error(`Projection source output card ${action.sourceObjectId} not found`);
      }
      return bump({
        ...state,
        outputCards: [
          ...state.outputCards,
          action.projected as typeof state.outputCards[number]
        ]
      });
    }

    case "NAVIGATE":
      return state.currentView === action.view
        ? state
        : { ...state, currentView: action.view };

    case "TITLE_SET":
      return state.title === action.title
        ? state
        : bump({ ...state, title: action.title });

    case "DEFAULT_PRIVACY_SET":
      return state.defaultPrivacy === action.privacy
        ? state
        : bump({ ...state, defaultPrivacy: action.privacy });

    default:
      return state;
  }
}
