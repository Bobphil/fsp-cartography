import { FSPAction } from "../kernel/actions";
import { createInitialState } from "../kernel/defaults";
import { assertInvariants } from "../kernel/invariants";
import { PersistenceAdapter } from "../kernel/persistence";
import { reducer } from "../kernel/reducer";
import { FSPMapState, PrivacyDomain, TaskStatus, ViewId } from "../kernel/types";

export class InteractionController {
  private state: FSPMapState;

  constructor(
    initialState: FSPMapState,
    private readonly persistence: PersistenceAdapter
  ) {
    assertInvariants(initialState);
    this.state = initialState;
  }

  static loadOrCreate(
    mapId: string,
    persistence: PersistenceAdapter
  ): InteractionController {
    const stored = persistence.load(mapId);
    return new InteractionController(stored ?? createInitialState(mapId), persistence);
  }

  getState(): FSPMapState {
    return this.state;
  }

  dispatch(action: FSPAction): FSPMapState {
    const next = reducer(this.state, action);
    assertInvariants(next);

    if (next !== this.state) {
      this.state = next;
      this.persistence.save(next);
    }

    return this.state;
  }

  navigate(view: ViewId): FSPMapState {
    return this.dispatch({ type: "NAVIGATE", view });
  }

  setTitle(title: string): FSPMapState {
    return this.dispatch({ type: "TITLE_SET", title: title.trim() || "Untitled Map" });
  }

  setDefaultPrivacy(privacy: PrivacyDomain): FSPMapState {
    return this.dispatch({ type: "DEFAULT_PRIVACY_SET", privacy });
  }

  setTask(status: TaskStatus, text: string): FSPMapState {
    return this.dispatch({
      type: "TASK_SET",
      payload: {
        id: this.state.task?.id ?? `task_${this.state.mapId}`,
        status,
        text: text.trim(),
        origin: "USER",
        privacy: this.state.defaultPrivacy
      }
    });
  }
}
