import { FSPMapState, ViewId } from "../kernel/types";
import { VIEW_CONTRACTS } from "../shell/contract";

export interface InteractionItem {
  heading: string;
  detail?: string;
  meta?: string;
}

export interface InteractionSection {
  title: string;
  emptyText: string;
  items: InteractionItem[];
}

export interface InteractionView {
  id: ViewId;
  label: string;
  purpose: string;
  taskLine: string;
  sections: InteractionSection[];
}

function nodeLabel(state: FSPMapState, id: string): string {
  return state.nodes.find(n => n.id === id)?.label ?? id;
}

export function presentView(state: FSPMapState): InteractionView {
  const contract = VIEW_CONTRACTS[state.currentView];
  const taskLine = state.task
    ? `${state.task.status === "FORMED" ? "Task" : "Orientation"}: ${state.task.text || "Not yet described"}`
    : "No task has been formed.";

  const sections: InteractionSection[] = [];

  switch (state.currentView) {
    case "START":
      sections.push({
        title: "Current boundary",
        emptyText: contract.emptyState,
        items: state.task
          ? [{
              heading: state.task.text || "Open orientation",
              detail: state.task.status === "FORMED"
                ? "A bounded task is currently formed."
                : "The map is intentionally open while the task remains unformed.",
              meta: `Privacy: ${state.task.privacy}`
            }]
          : []
      });
      break;

    case "PEOPLE": {
      const people = state.nodes.filter(n =>
        n.nodeType === "SELF_PRF" || n.nodeType === "MY_MAP_OF_OTHER"
      );
      sections.push({
        title: "People in this map",
        emptyText: contract.emptyState,
        items: people.map(n => ({
          heading: n.label,
          detail: n.nodeType === "SELF_PRF" ? "Self" : "My map of this person",
          meta: n.relevance.join(", ") || undefined
        }))
      });
      sections.push({
        title: "Claims about people",
        emptyText: "No person-related claims have been recorded yet.",
        items: state.claims
          .filter(c => people.some(p => p.id === c.subjectId))
          .map(c => ({
            heading: c.text,
            detail: c.claimType.replace(/_/g, " "),
            meta: c.verification
          }))
      });
      break;
    }

    case "INSTITUTION": {
      const institutions = state.nodes.filter(n => n.nodeType === "INSTITUTION");
      sections.push({
        title: "Institutions",
        emptyText: contract.emptyState,
        items: institutions.map(n => ({
          heading: n.label,
          detail: n.relevance.join(", ") || "Institution represented in the map."
        }))
      });
      sections.push({
        title: "Constraints",
        emptyText: "No institutional or practical constraint has been recorded yet.",
        items: state.constraints.map(c => ({
          heading: c.text,
          detail: `${c.epistemicStatus.replace(/_/g, " ")} · ${c.rigidity.replace(/_/g, " ")}`,
          meta: c.scope
        }))
      });
      break;
    }

    case "HSF":
      for (const region of ["H", "S", "F"] as const) {
        const names = state.nodes.filter(n => n.hsf.includes(region)).map(n => n.label);
        const claims = state.claims.filter(c => c.hsf.includes(region)).map(c => c.text);
        sections.push({
          title: region === "H" ? "Historical / inherited" : region === "S" ? "Situated / current" : "Forward / possible",
          emptyText: `Nothing has been placed in ${region} yet.`,
          items: [
            ...names.map(name => ({ heading: name, detail: "Map element" })),
            ...claims.map(text => ({ heading: text, detail: "Claim" }))
          ]
        });
      }
      break;

    case "CONNECTIONS":
      sections.push({
        title: "Connections",
        emptyText: contract.emptyState,
        items: state.connections.map(c => ({
          heading: `${nodeLabel(state, c.sourceId)} → ${nodeLabel(state, c.targetId)}`,
          detail: c.connectionType.replace(/_/g, " "),
          meta: c.note
        }))
      });
      sections.push({
        title: "Shared task",
        emptyText: "No shared-task judgment has been recorded yet.",
        items: state.sharedTasks.map(s => ({
          heading: s.status === "NONE_IDENTIFIED"
            ? "No shared task identified"
            : s.text || s.status.replace(/_/g, " "),
          detail: s.participantIds.map(id => nodeLabel(state, id)).join(", "),
          meta: s.outsideScope.length ? `Outside scope: ${s.outsideScope.join("; ")}` : undefined
        }))
      });
      break;

    case "INVESTIGATE":
      sections.push({
        title: "Paths",
        emptyText: "No path has been mapped yet.",
        items: state.paths.map(p => ({
          heading: p.name,
          detail: p.status.replace(/_/g, " "),
          meta: p.origin === "SYSTEM_CANDIDATE" && !p.acceptedIntoMap
            ? "System candidate — not yet accepted into the map"
            : p.unknowns.length ? `Unknowns: ${p.unknowns.join("; ")}` : undefined
        }))
      });
      sections.push({
        title: "Next inquiry actions",
        emptyText: contract.emptyState,
        items: state.actions.map(a => ({
          heading: a.text,
          detail: a.actionType.replace(/_/g, " "),
          meta: a.status
        }))
      });
      break;

    case "RETURN":
      sections.push({
        title: "Authorial return",
        emptyText: contract.emptyState,
        items: state.returns.map(r => ({
          heading: r.currentJudgment || r.whatBecameClearer || r.returnType.replace(/_/g, " "),
          detail: r.notClaiming ? `Not claiming: ${r.notClaiming}` : undefined,
          meta: r.remainingUncertainty
        }))
      });
      sections.push({
        title: "Output cards",
        emptyText: "No output card has been created yet.",
        items: state.outputCards.map(o => ({
          heading: o.currentJudgment || o.taskText,
          detail: `Claim ceiling: ${o.claimCeiling}`,
          meta: o.reopenCondition
        }))
      });
      break;
  }

  return {
    id: state.currentView,
    label: contract.label,
    purpose: contract.purpose,
    taskLine,
    sections
  };
}
