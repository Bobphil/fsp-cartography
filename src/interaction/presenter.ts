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

function peopleClaimLabel(claimType: string): string {
  if (claimType === "OTHER_REPORT") return "Reported by this person";
  if (claimType === "USER_INFERENCE") return "My inference about this person";
  return claimType.replace(/_/g, " ");
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
            detail: peopleClaimLabel(c.claimType),
            meta: `Provenance: ${c.claimType} · ${c.verification}`
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
          detail: `Verification: ${c.epistemicStatus.replace(/_/g, " ")} · Rigidity: ${c.rigidity.replace(/_/g, " ")}`,
          meta: `Scope: ${c.scope}`
        }))
      });
      break;
    }

    case "HSF":
      sections.push({
        title: "H/S/F-bearing objects",
        emptyText: "No H/S/F-bearing nodes or claims have been recorded yet.",
        items: [
          ...state.nodes.map(n => ({
            heading: n.label,
            detail: `Node · Relevant in: ${n.hsf.join("+")}`,
            meta: "H/S/F marks relevance in this inquiry, not intrinsic temporal location."
          })),
          ...state.claims.map(c => ({
            heading: c.text,
            detail: `Claim · Relevant in: ${c.hsf.join("+")}`,
            meta: "H/S/F marks relevance in this inquiry; F is not prediction or recommendation."
          }))
        ]
      });
      break;

    case "CONNECTIONS":
      sections.push({
        title: "Connections",
        emptyText: contract.emptyState,
        items: state.connections.map(c => ({
          heading: `${nodeLabel(state, c.sourceId)} → ${nodeLabel(state, c.targetId)}`,
          detail: `Relation: ${c.connectionType.replace(/_/g, " ")}`,
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
          detail: `Status: ${s.status.replace(/_/g, " ")}${s.participantIds.length ? ` · Participants: ${s.participantIds.map(id => nodeLabel(state, id)).join(", ")}` : ""}`,
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
          detail: `Possibility status: ${p.status.replace(/_/g, " ")}`,
          meta: [
            p.origin === "SYSTEM_CANDIDATE" && !p.acceptedIntoMap
              ? "System candidate — not yet accepted into the map"
              : "Possibility, not recommendation or prediction",
            p.unknowns.length ? `Unknowns: ${p.unknowns.join("; ")}` : "",
            p.constraintIds.length ? `Linked constraints: ${p.constraintIds.length}` : ""
          ].filter(Boolean).join(" · ")
        }))
      });
      sections.push({
        title: "Next inquiry actions",
        emptyText: contract.emptyState,
        items: state.actions.map(a => ({
          heading: a.text,
          detail: a.actionType === "INFORMATION_GENERATING" ? "Information-generating action" : a.actionType.replace(/_/g, " "),
          meta: `${a.status} · Intended to learn more, not commit to a path`
        }))
      });
      break;

    case "RETURN":
      sections.push({
        title: "Authorial return",
        emptyText: contract.emptyState,
        items: state.returns.map(r => ({
          heading: r.currentJudgment || r.whatBecameClearer || r.returnType.replace(/_/g, " "),
          detail: [
            `Return type: ${r.returnType.replace(/_/g, " ")}`,
            r.notClaiming ? `Not claiming: ${r.notClaiming}` : "",
            r.remainingUncertainty ? `Remaining uncertainty: ${r.remainingUncertainty}` : ""
          ].filter(Boolean).join(" · "),
          meta: r.reopenId ? "Current judgment remains reopenable" : "Current judgment; no REOPEN condition recorded"
        }))
      });
      sections.push({
        title: "Output cards",
        emptyText: "No output card has been created yet.",
        items: state.outputCards.map(o => ({
          heading: o.currentJudgment || o.taskText,
          detail: `Claim ceiling: ${o.claimCeiling}`,
          meta: [
            o.nextActions.length ? `Next actions: ${o.nextActions.join("; ")}` : "",
            o.reopenCondition ? `REOPEN when: ${o.reopenCondition}` : "No REOPEN condition recorded"
          ].filter(Boolean).join(" · ")
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
