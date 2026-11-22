import { STATES, STATE_BY_ID, STANDING_MODES, RETURN_STAGES } from './states.js';

export function initialState() {
  return {
    stateId: STATES[0].id,
    revealed: {},
    standingMode: null,
    returnStage: null,
    authorialReturned: false,
    fit: null,
    qualification: null,
    licensedActions: [],
    warrantCapsule: false,
    reopenSelections: [],
    recomposed: false,
    eventLog: []
  };
}

function log(s, action) {
  return [...s.eventLog, { at: new Date().toISOString(), stateId: s.stateId, ...action }];
}

export function reducer(state, action) {
  switch (action.type) {
    case 'ADVANCE': {
      const current = STATE_BY_ID[state.stateId];
      if (!current?.next) return state;
      return { ...state, stateId: current.next, eventLog: log(state, action) };
    }
    case 'GOTO':
      if (!STATE_BY_ID[action.stateId]) return state;
      return { ...state, stateId: action.stateId, eventLog: log(state, action) };
    case 'REVEAL':
      return {
        ...state,
        revealed: { ...state.revealed, [state.stateId]: true },
        eventLog: log(state, action)
      };
    case 'SET_STANDING':
      if (!STANDING_MODES.includes(action.mode)) return state;
      return { ...state, standingMode: action.mode, eventLog: log(state, action) };
    case 'LICENSE_ACTION': {
      const allowed = ['monitoring', 'transfer'];
      const licensedActions = allowed.includes(action.action)
        ? [...new Set([...state.licensedActions, action.action])]
        : state.licensedActions;
      return { ...state, licensedActions, eventLog: log(state, action) };
    }
    case 'AUTHORIAL_RETURN':
      return { ...state, authorialReturned: true, eventLog: log(state, action) };
    case 'SET_FIT':
      if (!['fit', 'partial_fit', 'misfit', 'cannot_assess'].includes(action.value)) return state;
      return { ...state, fit: action.value, eventLog: log(state, action) };
    case 'QUALIFY':
      return { ...state, qualification: action.text || 'No automatic sedation authorization', eventLog: log(state, action) };
    case 'CREATE_WARRANT_CAPSULE':
      return { ...state, warrantCapsule: true, eventLog: log(state, action) };
    case 'SET_RETURN_STAGE':
      if (!RETURN_STAGES.includes(action.stage)) return state;
      return { ...state, returnStage: action.stage, eventLog: log(state, action) };
    case 'REOPEN_SELECT': {
      const set = new Set(state.reopenSelections);
      if (action.selected) set.add(action.item); else set.delete(action.item);
      return { ...state, reopenSelections: [...set], eventLog: log(state, action) };
    }
    case 'RECOMPOSE':
      return { ...state, recomposed: true, eventLog: log(state, action) };
    case 'RESET':
      return initialState();
    default:
      return state;
  }
}
