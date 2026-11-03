import { FSPAction } from "../kernel/actions";
import { createInitialState } from "../kernel/defaults";
import { assertInvariants } from "../kernel/invariants";
import { PersistenceAdapter } from "../kernel/persistence";
import { reducer } from "../kernel/reducer";
import { normalizeHSFRegions } from "../kernel/hsf";
import { ClaimType, ConnectionType, ConstraintRigidity, ConstraintVerification, FSPMapState, HSFRegion, PathStatus, PrivacyDomain, ReturnType, SharedTaskStatus, TaskStatus, ViewId } from "../kernel/types";

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

  addSelf(label: string, regions: HSFRegion[] = ["S"]): FSPMapState {
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
        hsf: normalizeHSFRegions(regions),
        privacy: this.state.defaultPrivacy,
        createdBy: "USER",
        archived: false
      }
    });
  }

  addOther(label: string, regions: HSFRegion[] = ["S"]): FSPMapState {
    const clean = label.trim();
    if (!clean) throw new Error("A label is required for another person");

    return this.dispatch({
      type: "NODE_ADD",
      payload: {
        id: this.nextId("person_other"),
        nodeType: "MY_MAP_OF_OTHER",
        label: clean,
        relevance: [],
        hsf: normalizeHSFRegions(regions),
        privacy: this.state.defaultPrivacy,
        createdBy: "USER",
        archived: false
      }
    });
  }

  addPersonClaim(
    subjectId: string,
    text: string,
    claimType: PeopleClaimType,
    regions: HSFRegion[] = ["S"]
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
        hsf: normalizeHSFRegions(regions),
        privacy: this.state.defaultPrivacy,
        archived: false
      }
    });
  }

  addInstitution(label: string, regions: HSFRegion[] = ["S"]): FSPMapState {
    const clean = label.trim();
    if (!clean) throw new Error("An institution label is required");

    return this.dispatch({
      type: "NODE_ADD",
      payload: {
        id: this.nextId("institution"),
        nodeType: "INSTITUTION",
        label: clean,
        relevance: [],
        hsf: normalizeHSFRegions(regions),
        privacy: this.state.defaultPrivacy,
        createdBy: "USER",
        archived: false
      }
    });
  }

  setHSF(
    targetType: "NODE" | "CLAIM",
    targetId: string,
    regions: HSFRegion[]
  ): FSPMapState {
    return this.dispatch({
      type: "HSF_SET",
      targetType,
      targetId,
      regions: normalizeHSFRegions(regions)
    });
  }

  addConstraint(
    text: string,
    epistemicStatus: ConstraintVerification,
    rigidity: ConstraintRigidity,
    scope: string
  ): FSPMapState {
    const cleanText = text.trim();
    const cleanScope = scope.trim();

    if (!cleanText) throw new Error("Constraint text is required");
    if (!cleanScope) throw new Error("Constraint scope is required");

    return this.dispatch({
      type: "CONSTRAINT_ADD",
      payload: {
        id: this.nextId("constraint"),
        text: cleanText,
        epistemicStatus,
        rigidity,
        scope: cleanScope,
        targetPathIds: [],
        privacy: this.state.defaultPrivacy
      }
    });
  }

  addConnection(
    sourceId: string,
    targetId: string,
    connectionType: ConnectionType,
    note?: string
  ): FSPMapState {
    const source = this.state.nodes.find(n => n.id === sourceId);
    const target = this.state.nodes.find(n => n.id === targetId);

    if (!source) throw new Error("Connection source must already exist in the map");
    if (!target) throw new Error("Connection target must already exist in the map");

    return this.dispatch({
      type: "CONNECTION_ADD",
      payload: {
        id: this.nextId("connection"),
        sourceId,
        targetId,
        connectionType,
        note: note?.trim() || undefined,
        status: "USER_CONFIRMED",
        privacy: this.state.defaultPrivacy
      }
    });
  }

  setSharedTask(
    status: SharedTaskStatus,
    participantIds: string[],
    text?: string,
    outsideScope: string[] = []
  ): FSPMapState {
    const uniqueParticipantIds = [...new Set(participantIds)];
    for (const participantId of uniqueParticipantIds) {
      if (!this.state.nodes.some(n => n.id === participantId)) {
        throw new Error("Shared-task participants must already exist in the map");
      }
    }

    return this.dispatch({
      type: "SHARED_TASK_SET",
      payload: {
        id: this.nextId("shared_task"),
        participantIds: uniqueParticipantIds,
        status,
        text: text?.trim() || undefined,
        outsideScope: outsideScope.map(x => x.trim()).filter(Boolean),
        privacy: this.state.defaultPrivacy
      }
    });
  }

  addPath(
    name: string,
    status: PathStatus,
    unknowns: string[],
    constraintIds: string[]
  ): FSPMapState {
    const cleanName = name.trim();
    if (!cleanName) throw new Error("Path name is required");

    const uniqueConstraintIds = [...new Set(constraintIds)];
    for (const constraintId of uniqueConstraintIds) {
      if (!this.state.constraints.some(c => c.id === constraintId)) {
        throw new Error("Path constraints must already exist in the map");
      }
    }

    return this.dispatch({
      type: "PATH_ADD",
      payload: {
        id: this.nextId("path"),
        name: cleanName,
        status,
        requirements: [],
        unknowns: unknowns.map(x => x.trim()).filter(Boolean),
        constraintIds: uniqueConstraintIds,
        nextActionIds: [],
        privacy: this.state.defaultPrivacy,
        origin: "USER",
        acceptedIntoMap: true
      }
    });
  }

  addInquiryAction(text: string): FSPMapState {
    const clean = text.trim();
    if (!clean) throw new Error("Inquiry action text is required");

    return this.dispatch({
      type: "ACTION_ADD",
      payload: {
        id: this.nextId("inquiry_action"),
        actionType: "INFORMATION_GENERATING",
        text: clean,
        status: "PLANNED",
        privacy: this.state.defaultPrivacy
      }
    });
  }

  addBoundedReturn(
    returnType: ReturnType,
    currentJudgment: string,
    claimCeiling: string,
    remainingUncertainty: string,
    nextActionIds: string[],
    reopenCondition?: string,
    notClaiming?: string
  ): FSPMapState {
    const cleanJudgment = currentJudgment.trim();
    const cleanCeiling = claimCeiling.trim();
    const cleanUncertainty = remainingUncertainty.trim();
    const cleanReopen = reopenCondition?.trim() || "";
    const cleanNotClaiming = notClaiming?.trim() || "";

    if (!cleanJudgment) throw new Error("Current judgment is required");
    if (!cleanCeiling) throw new Error("Claim ceiling is required");

    const uniqueActionIds = [...new Set(nextActionIds)];
    for (const actionId of uniqueActionIds) {
      if (!this.state.actions.some(a => a.id === actionId)) {
        throw new Error("Return next actions must already exist in the map");
      }
    }

    let reopenId: string | undefined;
    if (cleanReopen) {
      if (!this.state.task) {
        throw new Error("A task or orientation is required before adding a REOPEN condition");
      }
      reopenId = this.nextId("reopen");
      this.dispatch({
        type: "REOPEN_ADD",
        payload: {
          id: reopenId,
          targetType: "TASK",
          targetId: this.state.task.id,
          condition: cleanReopen,
          status: "OPEN",
          privacy: this.state.defaultPrivacy
        }
      });
    }

    const returnId = this.nextId("return");
    this.dispatch({
      type: "RETURN_ADD",
      payload: {
        id: returnId,
        returnType,
        currentJudgment: cleanJudgment,
        notClaiming: cleanNotClaiming || undefined,
        nextActionIds: uniqueActionIds,
        remainingUncertainty: cleanUncertainty || undefined,
        reopenId,
        privacy: this.state.defaultPrivacy
      }
    });

    const nextActionTexts = uniqueActionIds
      .map(actionId => this.state.actions.find(a => a.id === actionId)?.text)
      .filter((text): text is string => Boolean(text));

    return this.dispatch({
      type: "OUTPUT_CARD_ADD",
      payload: {
        id: this.nextId("output_card"),
        returnId,
        taskText: this.state.task?.text || "Open orientation",
        currentJudgment: cleanJudgment,
        nextActions: nextActionTexts,
        claimCeiling: cleanCeiling,
        reopenCondition: cleanReopen || undefined,
        privacy: this.state.defaultPrivacy,
        sourceObjectIds: [
          returnId,
          ...uniqueActionIds,
          ...(reopenId ? [reopenId] : [])
        ]
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
