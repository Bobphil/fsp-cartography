import { LocalStoragePersistenceAdapter } from "../kernel/persistence";
import { FSPMapState, PrivacyDomain, TaskStatus, ViewId } from "../kernel/types";
import { InteractionController } from "../interaction/controller";
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
