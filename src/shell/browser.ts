import { LocalStoragePersistenceAdapter } from "../kernel/persistence";
import { ConnectionType, ConstraintRigidity, ConstraintVerification, FSPMapState, HSFRegion, PathStatus, PrivacyDomain, ReturnType, SharedTaskStatus, TaskStatus, ViewId } from "../kernel/types";
import { InteractionController, PeopleClaimType } from "../interaction/controller";
import { presentView } from "../interaction/presenter";
import { VIEW_ORDER, VIEW_CONTRACTS } from "./contract";

export interface BrowserShell {
  render(): void;
  getState(): FSPMapState;
}

function labeledField(labelText: string, input: HTMLElement): HTMLElement {
  const label = document.createElement("label");
  const text = document.createElement("span");
  text.textContent = labelText;
  label.append(text, input);
  return label;
}

function hsfSelector(name: string, selected: HSFRegion[] = ["S"]): { element: HTMLElement; getRegions: () => HSFRegion[] } {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Where is this relevant in your map?";
  fieldset.append(legend);

  const values: Array<[HSFRegion, string]> = [
    ["H", "Historical / inherited"],
    ["S", "Situated / current"],
    ["F", "Forward / possible"]
  ];
  const inputs: HTMLInputElement[] = [];

  for (const [value, labelText] of values) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = name;
    input.value = value;
    input.checked = selected.includes(value);
    inputs.push(input);
    label.append(input, document.createTextNode(labelText));
    fieldset.append(label);
  }

  const help = document.createElement("p");
  help.textContent = "These mark where something matters in this inquiry. They do not predict the future or recommend a possibility.";
  fieldset.append(help);

  return {
    element: fieldset,
    getRegions: () => inputs.filter(input => input.checked).map(input => input.value as HSFRegion)
  };
}

export function mountBrowserShell(
  root: HTMLElement,
  initialState: FSPMapState
): BrowserShell {
  const persistence = new LocalStoragePersistenceAdapter(window.localStorage);
  const controller = new InteractionController(initialState, persistence);

  const render = () => {
    const state = controller.getState();
    const vm = presentView(state);
    root.replaceChildren();

    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = state.title;
    const task = document.createElement("p");
    task.textContent = vm.taskLine;
    const privacy = document.createElement("p");
    privacy.textContent = `Default privacy: ${state.defaultPrivacy}`;
    header.append(title, task, privacy);

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "FSP Cartography views");
    for (const id of VIEW_ORDER) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = VIEW_CONTRACTS[id].label;
      button.dataset.view = id;
      button.setAttribute("aria-current", id === state.currentView ? "page" : "false");
      button.addEventListener("click", () => {
        controller.navigate(id);
        render();
      });
      nav.append(button);
    }

    const main = document.createElement("main");
    const heading = document.createElement("h2");
    heading.textContent = vm.label;
    const purpose = document.createElement("p");
    purpose.textContent = vm.purpose;
    main.append(heading, purpose);

    if (state.currentView === "START") {
      const form = document.createElement("form");
      form.dataset.role = "start-form";

      const titleInput = document.createElement("input");
      titleInput.name = "title";
      titleInput.value = state.title;

      const taskInput = document.createElement("textarea");
      taskInput.name = "task";
      taskInput.value = state.task?.text ?? "";

      const statusSelect = document.createElement("select");
      statusSelect.name = "taskStatus";
      for (const status of ["FORMED", "UNFORMED"] as TaskStatus[]) {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status === "FORMED" ? "I have a task" : "I am still orienting";
        option.selected = (state.task?.status ?? "UNFORMED") === status;
        statusSelect.append(option);
      }

      const privacySelect = document.createElement("select");
      privacySelect.name = "privacy";
      for (const domain of ["PRIVATE", "TEMP_SESSION", "SHARED_CONSENTED", "COURSE", "PUBLIC_SOURCE"] as PrivacyDomain[]) {
        const option = document.createElement("option");
        option.value = domain;
        option.textContent = domain.replace(/_/g, " ");
        option.selected = state.defaultPrivacy === domain;
        privacySelect.append(option);
      }

      const save = document.createElement("button");
      save.type = "submit";
      save.textContent = "Save map boundary";

      form.append(
        labeledField("Map title", titleInput),
        labeledField("What are you trying to work through?", taskInput),
        labeledField("Task status", statusSelect),
        labeledField("Default privacy", privacySelect),
        save
      );

      form.addEventListener("submit", event => {
        event.preventDefault();
        controller.setDefaultPrivacy(privacySelect.value as PrivacyDomain);
        controller.setTitle(titleInput.value);
        controller.setTask(statusSelect.value as TaskStatus, taskInput.value);
        render();
      });

      main.append(form);
    }

    if (state.currentView === "PEOPLE") {
      const peopleIntro = document.createElement("p");
      peopleIntro.textContent = "This screen records your map. Adding another person creates MY_MAP_OF_OTHER — not a claim that the map is the person.";
      main.append(peopleIntro);

      const selfNode = state.nodes.find(n => n.nodeType === "SELF_PRF");
      if (!selfNode) {
        const selfForm = document.createElement("form");
        selfForm.dataset.role = "add-self-form";

        const selfLabel = document.createElement("input");
        selfLabel.name = "selfLabel";
        selfLabel.placeholder = "Me";

        const selfHSF = hsfSelector("selfHSF");

        const addSelf = document.createElement("button");
        addSelf.type = "submit";
        addSelf.textContent = "Add myself to this map";

        selfForm.append(
          labeledField("How should you be labeled in this map?", selfLabel),
          selfHSF.element,
          addSelf
        );

        selfForm.addEventListener("submit", event => {
          event.preventDefault();
          controller.addSelf(selfLabel.value, selfHSF.getRegions());
          render();
        });

        main.append(selfForm);
      }

      const otherForm = document.createElement("form");
      otherForm.dataset.role = "add-other-form";

      const otherLabel = document.createElement("input");
      otherLabel.name = "otherLabel";
      otherLabel.required = true;

      const otherHSF = hsfSelector("otherHSF");

      const addOther = document.createElement("button");
      addOther.type = "submit";
      addOther.textContent = "Add my map of this person";

      otherForm.append(
        labeledField("Person label", otherLabel),
        otherHSF.element,
        addOther
      );

      otherForm.addEventListener("submit", event => {
        event.preventDefault();
        controller.addOther(otherLabel.value, otherHSF.getRegions());
        render();
      });

      main.append(otherForm);

      const mappedOthers = state.nodes.filter(n => n.nodeType === "MY_MAP_OF_OTHER");
      if (mappedOthers.length) {
        const claimForm = document.createElement("form");
        claimForm.dataset.role = "add-person-claim-form";

        const subjectSelect = document.createElement("select");
        subjectSelect.name = "subject";
        for (const person of mappedOthers) {
          const option = document.createElement("option");
          option.value = person.id;
          option.textContent = `My map of ${person.label}`;
          subjectSelect.append(option);
        }

        const provenanceSelect = document.createElement("select");
        provenanceSelect.name = "provenance";
        const reportOption = document.createElement("option");
        reportOption.value = "OTHER_REPORT";
        reportOption.textContent = "They reported this";
        const inferenceOption = document.createElement("option");
        inferenceOption.value = "USER_INFERENCE";
        inferenceOption.textContent = "This is my inference";
        provenanceSelect.append(reportOption, inferenceOption);

        const claimText = document.createElement("textarea");
        claimText.name = "claimText";
        claimText.required = true;

        const claimHSF = hsfSelector("claimHSF");

        const provenanceHelp = document.createElement("p");
        provenanceHelp.textContent = "Choose provenance before saving. A report and your inference are different map claims.";

        const addClaim = document.createElement("button");
        addClaim.type = "submit";
        addClaim.textContent = "Add claim to my map";

        claimForm.append(
          labeledField("Whose map entry is this about?", subjectSelect),
          labeledField("Where did this claim come from?", provenanceSelect),
          labeledField("What should the map record?", claimText),
          claimHSF.element,
          provenanceHelp,
          addClaim
        );

        claimForm.addEventListener("submit", event => {
          event.preventDefault();
          controller.addPersonClaim(
            subjectSelect.value,
            claimText.value,
            provenanceSelect.value as PeopleClaimType,
            claimHSF.getRegions()
          );
          render();
        });

        main.append(claimForm);
      }
    }

    if (state.currentView === "INSTITUTION") {
      const intro = document.createElement("p");
      intro.textContent = "Institutions are represented separately from people. Constraints are separate map objects with independent verification and rigidity.";
      main.append(intro);

      const institutionForm = document.createElement("form");
      institutionForm.dataset.role = "add-institution-form";

      const institutionLabel = document.createElement("input");
      institutionLabel.name = "institutionLabel";
      institutionLabel.required = true;

      const institutionHSF = hsfSelector("institutionHSF");

      const addInstitution = document.createElement("button");
      addInstitution.type = "submit";
      addInstitution.textContent = "Add institution";

      institutionForm.append(
        labeledField("Institution label", institutionLabel),
        institutionHSF.element,
        addInstitution
      );

      institutionForm.addEventListener("submit", event => {
        event.preventDefault();
        controller.addInstitution(institutionLabel.value, institutionHSF.getRegions());
        render();
      });

      main.append(institutionForm);

      const constraintForm = document.createElement("form");
      constraintForm.dataset.role = "add-constraint-form";

      const constraintText = document.createElement("textarea");
      constraintText.name = "constraintText";
      constraintText.required = true;

      const verificationSelect = document.createElement("select");
      verificationSelect.name = "verification";
      const verificationValues: Array<[ConstraintVerification, string]> = [
        ["VERIFIED", "Verified"],
        ["PARTIALLY_VERIFIED", "Partially verified"],
        ["ASSUMED", "Assumed"],
        ["UNKNOWN", "Unknown"]
      ];
      for (const [value, label] of verificationValues) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        verificationSelect.append(option);
      }

      const rigiditySelect = document.createElement("select");
      rigiditySelect.name = "rigidity";
      const rigidityValues: Array<[ConstraintRigidity, string]> = [
        ["HARD_CURRENTLY", "Hard currently"],
        ["MODIFIABLE", "Modifiable"],
        ["CONDITIONAL", "Conditional"],
        ["UNKNOWN", "Unknown"]
      ];
      for (const [value, label] of rigidityValues) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        rigiditySelect.append(option);
      }

      const scopeInput = document.createElement("input");
      scopeInput.name = "scope";
      scopeInput.required = true;
      scopeInput.placeholder = "Where does this constraint apply?";

      const help = document.createElement("p");
      help.textContent = "Verification asks how well established the constraint is. Rigidity asks how changeable it is. These are separate judgments.";

      const addConstraint = document.createElement("button");
      addConstraint.type = "submit";
      addConstraint.textContent = "Add constraint";

      constraintForm.append(
        labeledField("Constraint", constraintText),
        labeledField("Verification", verificationSelect),
        labeledField("Rigidity", rigiditySelect),
        labeledField("Scope", scopeInput),
        help,
        addConstraint
      );

      constraintForm.addEventListener("submit", event => {
        event.preventDefault();
        controller.addConstraint(
          constraintText.value,
          verificationSelect.value as ConstraintVerification,
          rigiditySelect.value as ConstraintRigidity,
          scopeInput.value
        );
        render();
      });

      main.append(constraintForm);
    }

    if (state.currentView === "HSF") {
      const intro = document.createElement("p");
      intro.textContent = "Update where each object is relevant in your inquiry. H/S/F is not intrinsic time, and F is not prediction or recommendation.";
      main.append(intro);

      const objects = [
        ...state.nodes.map(node => ({ targetType: "NODE" as const, id: node.id, label: node.label, hsf: node.hsf })),
        ...state.claims.map(claim => ({ targetType: "CLAIM" as const, id: claim.id, label: claim.text, hsf: claim.hsf }))
      ];

      for (const object of objects) {
        const form = document.createElement("form");
        form.dataset.role = "hsf-reassignment-form";

        const label = document.createElement("strong");
        label.textContent = object.label;

        const selector = hsfSelector(`hsf-${object.id}`, object.hsf);
        const save = document.createElement("button");
        save.type = "submit";
        save.textContent = "Update relevance";

        form.append(label, selector.element, save);
        form.addEventListener("submit", event => {
          event.preventDefault();
          controller.setHSF(object.targetType, object.id, selector.getRegions());
          render();
        });

        main.append(form);
      }
    }

    if (state.currentView === "CONNECTIONS") {
      const intro = document.createElement("p");
      intro.textContent = "Connections are user-chosen relations. Practical power and authority are separate relation types. A shared task is optional, and 'No shared task identified' is a valid judgment.";
      main.append(intro);

      if (state.nodes.length >= 2) {
        const connectionForm = document.createElement("form");
        connectionForm.dataset.role = "add-connection-form";

        const sourceSelect = document.createElement("select");
        sourceSelect.name = "source";
        const targetSelect = document.createElement("select");
        targetSelect.name = "target";

        for (const node of state.nodes) {
          const sourceOption = document.createElement("option");
          sourceOption.value = node.id;
          sourceOption.textContent = node.label;
          sourceSelect.append(sourceOption);

          const targetOption = document.createElement("option");
          targetOption.value = node.id;
          targetOption.textContent = node.label;
          targetSelect.append(targetOption);
        }

        const relationSelect = document.createElement("select");
        relationSelect.name = "connectionType";
        const relationValues: Array<[ConnectionType, string]> = [
          ["COMMUNICATION", "Communication"],
          ["DEPENDENCY", "Dependency"],
          ["PRACTICAL_POWER", "Practical power"],
          ["AUTHORITY", "Authority"],
          ["SHARED_HISTORY", "Shared history"],
          ["AFFECTS", "Affects"],
          ["SUPPORTS", "Supports"],
          ["CONSTRAINS", "Constrains"]
        ];
        for (const [value, label] of relationValues) {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = label;
          relationSelect.append(option);
        }

        const noteInput = document.createElement("input");
        noteInput.name = "connectionNote";
        noteInput.placeholder = "Optional note";

        const help = document.createElement("p");
        help.textContent = "Choose the relation explicitly. Practical power is not the same as authority.";

        const addConnection = document.createElement("button");
        addConnection.type = "submit";
        addConnection.textContent = "Add connection";

        connectionForm.append(
          labeledField("From", sourceSelect),
          labeledField("To", targetSelect),
          labeledField("Relation type", relationSelect),
          labeledField("Note", noteInput),
          help,
          addConnection
        );

        connectionForm.addEventListener("submit", event => {
          event.preventDefault();
          controller.addConnection(
            sourceSelect.value,
            targetSelect.value,
            relationSelect.value as ConnectionType,
            noteInput.value
          );
          render();
        });

        main.append(connectionForm);
      } else {
        const needNodes = document.createElement("p");
        needNodes.textContent = "Add at least two map nodes before recording a connection.";
        main.append(needNodes);
      }

      const sharedTaskForm = document.createElement("form");
      sharedTaskForm.dataset.role = "shared-task-form";

      const statusSelect = document.createElement("select");
      statusSelect.name = "sharedTaskStatus";
      const sharedTaskValues: Array<[SharedTaskStatus, string]> = [
        ["CONFIRMED", "Confirmed shared task"],
        ["POSSIBLE_UNCONFIRMED", "Possible, not confirmed"],
        ["NONE_IDENTIFIED", "No shared task identified"],
        ["NOT_APPROPRIATE", "Shared task not appropriate"]
      ];
      for (const [value, label] of sharedTaskValues) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        statusSelect.append(option);
      }

      const participantSelect = document.createElement("select");
      participantSelect.name = "participants";
      participantSelect.multiple = true;
      participantSelect.size = Math.min(Math.max(state.nodes.length, 2), 6);
      for (const node of state.nodes) {
        const option = document.createElement("option");
        option.value = node.id;
        option.textContent = node.label;
        participantSelect.append(option);
      }

      const taskText = document.createElement("input");
      taskText.name = "sharedTaskText";
      taskText.placeholder = "Optional shared task description";

      const outsideScope = document.createElement("input");
      outsideScope.name = "outsideScope";
      outsideScope.placeholder = "Optional items outside scope, separated by semicolons";

      const sharedHelp = document.createElement("p");
      sharedHelp.textContent = "You do not need to manufacture cooperation. 'No shared task identified' may be the correct result.";

      const saveSharedTask = document.createElement("button");
      saveSharedTask.type = "submit";
      saveSharedTask.textContent = "Save shared-task judgment";

      sharedTaskForm.append(
        labeledField("Shared-task status", statusSelect),
        labeledField("Participants", participantSelect),
        labeledField("Shared task", taskText),
        labeledField("Outside scope", outsideScope),
        sharedHelp,
        saveSharedTask
      );

      sharedTaskForm.addEventListener("submit", event => {
        event.preventDefault();
        const participantIds = Array.from(participantSelect.selectedOptions).map(option => option.value);
        controller.setSharedTask(
          statusSelect.value as SharedTaskStatus,
          participantIds,
          taskText.value,
          outsideScope.value.split(";")
        );
        render();
      });

      main.append(sharedTaskForm);
    }

    if (state.currentView === "INVESTIGATE") {
      const intro = document.createElement("p");
      intro.textContent = "Investigate maps possibilities and learning moves. Paths are not rankings, recommendations, or predictions, and next actions here are for gathering information rather than committing to a path.";
      main.append(intro);

      const pathForm = document.createElement("form");
      pathForm.dataset.role = "add-path-form";

      const pathName = document.createElement("input");
      pathName.name = "pathName";
      pathName.required = true;

      const pathStatus = document.createElement("select");
      pathStatus.name = "pathStatus";
      const pathStatusValues: Array<[PathStatus, string]> = [
        ["EXPLORATORY", "Exploratory"],
        ["ACTIVE", "Active"],
        ["CONDITIONAL", "Conditional"],
        ["CURRENTLY_BLOCKED", "Currently blocked"],
        ["UNMAPPED", "Unmapped"]
      ];
      for (const [value, label] of pathStatusValues) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        pathStatus.append(option);
      }

      const unknownsInput = document.createElement("input");
      unknownsInput.name = "unknowns";
      unknownsInput.placeholder = "Unknowns, separated by semicolons";

      const constraintSelect = document.createElement("select");
      constraintSelect.name = "constraintIds";
      constraintSelect.multiple = true;
      constraintSelect.size = Math.min(Math.max(state.constraints.length, 2), 6);
      for (const constraint of state.constraints) {
        const option = document.createElement("option");
        option.value = constraint.id;
        option.textContent = constraint.text;
        constraintSelect.append(option);
      }

      const pathHelp = document.createElement("p");
      pathHelp.textContent = "A path is a possibility to investigate. Adding it does not mean the system recommends it or predicts that it will happen.";

      const addPath = document.createElement("button");
      addPath.type = "submit";
      addPath.textContent = "Add possibility";

      pathForm.append(
        labeledField("Path or possibility", pathName),
        labeledField("Current status", pathStatus),
        labeledField("What is still unknown?", unknownsInput),
        labeledField("Applicable constraints", constraintSelect),
        pathHelp,
        addPath
      );

      pathForm.addEventListener("submit", event => {
        event.preventDefault();
        const constraintIds = Array.from(constraintSelect.selectedOptions).map(option => option.value);
        controller.addPath(
          pathName.value,
          pathStatus.value as PathStatus,
          unknownsInput.value.split(";"),
          constraintIds
        );
        render();
      });

      main.append(pathForm);

      const actionForm = document.createElement("form");
      actionForm.dataset.role = "add-inquiry-action-form";

      const actionText = document.createElement("textarea");
      actionText.name = "inquiryAction";
      actionText.required = true;

      const actionHelp = document.createElement("p");
      actionHelp.textContent = "This next action should generate information or experience. It is not a commitment to any path.";

      const addAction = document.createElement("button");
      addAction.type = "submit";
      addAction.textContent = "Add information-generating action";

      actionForm.append(
        labeledField("What could you do to learn more?", actionText),
        actionHelp,
        addAction
      );

      actionForm.addEventListener("submit", event => {
        event.preventDefault();
        controller.addInquiryAction(actionText.value);
        render();
      });

      main.append(actionForm);
    }

    if (state.currentView === "RETURN") {
      const intro = document.createElement("p");
      intro.textContent = "Return records a current bounded judgment, not a permanently closed conclusion. State what you can claim now, what remains uncertain, what you are not claiming, and what would reopen the judgment.";
      main.append(intro);

      const returnForm = document.createElement("form");
      returnForm.dataset.role = "add-return-form";

      const returnTypeSelect = document.createElement("select");
      returnTypeSelect.name = "returnType";
      const returnTypeValues: Array<[ReturnType, string]> = [
        ["JUDGMENT", "Current judgment"],
        ["INVESTIGATE", "Investigate further"],
        ["NARROW", "Narrow the question"],
        ["CONFIRM_CONSTRAINT", "Confirm a constraint"],
        ["REJECT_INTERPRETATION", "Reject an interpretation"],
        ["UNRESOLVED", "Remain unresolved"],
        ["SUSPEND", "Suspend judgment"]
      ];
      for (const [value, label] of returnTypeValues) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        returnTypeSelect.append(option);
      }

      const judgmentInput = document.createElement("textarea");
      judgmentInput.name = "currentJudgment";
      judgmentInput.required = true;

      const ceilingInput = document.createElement("textarea");
      ceilingInput.name = "claimCeiling";
      ceilingInput.required = true;

      const uncertaintyInput = document.createElement("textarea");
      uncertaintyInput.name = "remainingUncertainty";

      const notClaimingInput = document.createElement("textarea");
      notClaimingInput.name = "notClaiming";

      const actionSelect = document.createElement("select");
      actionSelect.name = "nextActionIds";
      actionSelect.multiple = true;
      actionSelect.size = Math.min(Math.max(state.actions.length, 2), 6);
      for (const action of state.actions) {
        const option = document.createElement("option");
        option.value = action.id;
        option.textContent = action.text;
        actionSelect.append(option);
      }

      const reopenInput = document.createElement("textarea");
      reopenInput.name = "reopenCondition";
      reopenInput.placeholder = "Optional: what new information or event should reopen this judgment?";

      const help = document.createElement("p");
      help.textContent = "A claim ceiling limits what this Return licenses. REOPEN is optional but, when used, marks the judgment as revisable under stated conditions.";

      const saveReturn = document.createElement("button");
      saveReturn.type = "submit";
      saveReturn.textContent = "Save bounded Return";

      returnForm.append(
        labeledField("Return type", returnTypeSelect),
        labeledField("Current judgment", judgmentInput),
        labeledField("Claim ceiling", ceilingInput),
        labeledField("Remaining uncertainty", uncertaintyInput),
        labeledField("What are you not claiming?", notClaimingInput),
        labeledField("Existing next actions", actionSelect),
        labeledField("REOPEN condition", reopenInput),
        help,
        saveReturn
      );

      returnForm.addEventListener("submit", event => {
        event.preventDefault();
        const nextActionIds = Array.from(actionSelect.selectedOptions).map(option => option.value);
        controller.addBoundedReturn(
          returnTypeSelect.value as ReturnType,
          judgmentInput.value,
          ceilingInput.value,
          uncertaintyInput.value,
          nextActionIds,
          reopenInput.value,
          notClaimingInput.value
        );
        render();
      });

      main.append(returnForm);
    }

    for (const section of vm.sections) {
      const block = document.createElement("section");
      const sectionHeading = document.createElement("h3");
      sectionHeading.textContent = section.title;
      block.append(sectionHeading);

      if (!section.items.length) {
        const empty = document.createElement("p");
        empty.dataset.role = "empty-state";
        empty.textContent = section.emptyText;
        block.append(empty);
      } else {
        const list = document.createElement("ul");
        for (const item of section.items) {
          const li = document.createElement("li");
          const strong = document.createElement("strong");
          strong.textContent = item.heading;
          li.append(strong);
          if (item.detail) {
            const detail = document.createElement("div");
            detail.textContent = item.detail;
            li.append(detail);
          }
          if (item.meta) {
            const meta = document.createElement("small");
            meta.textContent = item.meta;
            li.append(meta);
          }
          list.append(li);
        }
        block.append(list);
      }

      main.append(block);
    }

    root.append(header, nav, main);
  };

  render();

  return {
    render,
    getState: () => controller.getState()
  };
}
