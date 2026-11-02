import { reducer } from "../kernel/reducer";
import { FSPMapState, ViewId } from "../kernel/types";
import { buildShellViewModel } from "./contract";

export interface BrowserShell {
  render(): void;
  getState(): FSPMapState;
}

export function mountBrowserShell(
  root: HTMLElement,
  initialState: FSPMapState
): BrowserShell {
  let state = initialState;

  const render = () => {
    const vm = buildShellViewModel(state);
    root.replaceChildren();

    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = vm.mapTitle;
    const status = document.createElement("p");
    status.textContent = `Task: ${vm.taskStatus} · Map version: ${vm.mapVersion}`;
    header.append(title, status);

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "FSP Cartography views");

    for (const item of vm.navigation) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = item.label;
      button.dataset.view = item.id;
      button.setAttribute("aria-current", item.active ? "page" : "false");
      button.addEventListener("click", () => navigate(item.id));
      nav.append(button);
    }

    const main = document.createElement("main");
    const heading = document.createElement("h2");
    heading.textContent = vm.current.label;
    const purpose = document.createElement("p");
    purpose.textContent = vm.current.purpose;
    const empty = document.createElement("p");
    empty.dataset.role = "empty-state";
    empty.textContent = vm.current.emptyState;

    const carries = document.createElement("section");
    carries.dataset.role = "carry-region";
    const carriesHeading = document.createElement("h3");
    carriesHeading.textContent = "Carries";
    const carriesText = document.createElement("p");
    carriesText.textContent = vm.current.carries.join(", ");
    carries.append(carriesHeading, carriesText);

    const edits = document.createElement("section");
    edits.dataset.role = "edit-region";
    const editsHeading = document.createElement("h3");
    editsHeading.textContent = "Edits";
    const editsText = document.createElement("p");
    editsText.textContent = vm.current.edits.join(", ");
    edits.append(editsHeading, editsText);

    main.append(heading, purpose, empty, carries, edits);
    root.append(header, nav, main);
  };

  const navigate = (view: ViewId) => {
    state = reducer(state, { type: "NAVIGATE", view });
    render();
  };

  render();

  return {
    render,
    getState: () => state
  };
}
