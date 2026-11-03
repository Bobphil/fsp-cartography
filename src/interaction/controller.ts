import { FSPAction } from "../kernel/actions";
import { createInitialState } from "../kernel/defaults";
import { assertInvariants } from "../kernel/invariants";
import { PersistenceAdapter } from "../kernel/persistence";
import { reducer } from "../kernel/reducer";
import { ClaimType, FSPMapState, PrivacyDomain, TaskStatus, ViewId } from "../kernel/types";

export type PeopleClaimType = Extract<ClaimType, "OTHER_REPORT" | "USER_INFERENCE">;

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

  private nextId(prefix: string): string {
    const ids = new Set<string>([
      ...(this.state.task ? [this.state.task.id] : []),
      ...this.state.nodes.map(x => x.id),
      ...this.state.claims.map(x => x.id),
      ...this.state.connections.map(x => x.id),
      ...this.state.paths.map(x => x.id),
      ...this.state.constraints.map(x => x.id),
      ...this.state.sharedTasks.map(x => x.id),
      ...this.state.actions.map(x => x.id),
      ...this.state.coachRecords.map(x => x.id),
      ...this.state.rejectedInterpretations.map(x => x.id),
      ...this.state.mapChanges.map(x => x.id),
      ...this.state.reopenItems.map(x => x.id),
      ...this.state.returns.map(x => x.id),
      ...this.state.outputCards.map(x => x.id)
    ]);

    let index = 1;
    while (ids.has(`${prefix}_${index}`)) index += 1;
    return `${prefix}_${index}`;
  }

  addSelf(label: string): FSPMapState {
    if (this.state.nodes.some(n => n.nodeType === "SELF_PRF")) {
      throw new Error("This map already has a self representation");
    }

    return this.dispatch({
      type: "NODE_ADD",
      payload: {
        id: this.nextId("person_self"),
        nodeType: "SELF_PRF",
        label: label.trim() || "Me",
        relevance: [],
        hsf: ["S"],
        privacy: this.state.defaultPrivacy,
        createdBy: "USER",
        archived: false
      }
    });
  }

  addOther(label: string): FSPMapState {
    const clean = label.trim();
    if (!clean) throw new Error("A label is required for another person");

    return this.dispatch({
      type: "NODE_ADD",
      payload: {
        id: this.nextId("person_other"),
        nodeType: "MY_MAP_OF_OTHER",
        label: clean,
        relevance: [],
        hsf: ["S"],
        privacy: this.state.defaultPrivacy,
        createdBy: "USER",
        archived: false
      }
    });
  }

  addPersonClaim(
    subjectId: string,
    text: string,
    claimType: PeopleClaimType
  ): FSPMapState {
    const subject = this.state.nodes.find(
      n => n.id === subjectId && n.nodeType === "MY_MAP_OF_OTHER"
    );
    if (!subject) {
      throw new Error("Person claims in this control must target MY_MAP_OF_OTHER");
    }

    const clean = text.trim();
    if (!clean) throw new Error("Claim text is required");

    return this.dispatch({
      type: "CLAIM_ADD",
      payload: {
        id: this.nextId("claim_person"),
        subjectId,
        text: clean,
        claimType,
        verification: "UNVERIFIED",
        hsf: ["S"],
        privacy: this.state.defaultPrivacy,
        archived: false
      }
    });
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
