import { renderChapterPatch, renderBridgeCPatch, bindingForNode } from "./fspHoiPressbooksPatch";

export interface PressbooksPilotBPackage {
  pilotId:string;
  chapterNodeId:"ch04";
  bridgeNodeId:"intC";
  chapterTitle:string;
  pressbooksUrl:string;
  chapterInsertionAnchor:string;
  chapterInsertionRule:string;
  bridgeInsertionAnchor:string;
  bridgeInsertionRule:string;
  chapterPatchHtml:string;
  bridgePatchHtml:string;
  acceptanceChecks:string[];
  rollbackRule:string;
  status:"READY_FOR_MANUAL_INSERTION";
}

export const CH4_INSERTION_ANCHOR =
  "That question will turn out to matter for both faith and reason, and later for law.";

export const BRIDGE_C_INSERTION_ANCHOR =
  "**I still cannot conclude:** continuity of transmission does not imply identity of meaning across every stage.";

export const CH4_BRIDGE_C_PILOT:PressbooksPilotBPackage={
  pilotId:"FSP-HOI-PRESSBOOKS-PILOT-B-CH4-BRIDGE-C",
  chapterNodeId:"ch04",
  bridgeNodeId:"intC",
  chapterTitle:"Reason Inside an Inherited World",
  pressbooksUrl:bindingForNode("ch04").pressbooksUrl,
  chapterInsertionAnchor:CH4_INSERTION_ANCHOR,
  chapterInsertionRule:"Insert the Chapter 4 reconciliation patch immediately after the sentence 'That question will turn out to matter for both faith and reason, and later for law.' and before the horizontal rule / heading '1. Augustine: inquiry after certainty has become a problem.'",
  bridgeInsertionAnchor:BRIDGE_C_INSERTION_ANCHOR,
  bridgeInsertionRule:"Insert the Bridge C cue immediately after the existing line 'I still cannot conclude: continuity of transmission does not imply identity of meaning across every stage.' and before the bridge body begins 'A book cannot influence a later thinker if nobody can read it.' Do not create a second Pressbooks page.",
  chapterPatchHtml:renderChapterPatch(4).html,
  bridgePatchHtml:renderBridgeCPatch().html,
  acceptanceChecks:[
    "Chapter 4 and Bridge C continue to share exactly one Pressbooks URL.",
    "The Chapter 4 opening prose remains word-for-word unchanged.",
    "The heading '1. Augustine: inquiry after certainty has become a problem' remains unchanged.",
    "The Bridge C heading and its existing Why here / Relation discipline / Do not skip this arrow / I still cannot conclude apparatus remain unchanged.",
    "Bridge C still appears inside Chapter 4 and does not appear as a duplicate Pressbooks page.",
    "The Chapter 4 Table of Contents entry still opens the existing page.",
    "Previous/next Pressbooks navigation remains functional.",
    "Existing Chapter 4 citations and footnotes still render.",
    "The Chapter 4 SUPER link opens node ch04 on the inquire tab.",
    "The Bridge C SUPER link opens node intC on the inquire tab.",
    "Both patch markers appear once only.",
    "Mobile reading remains usable.",
    "Pressbooks print/PDF export preserves both the Chapter 4 prose and embedded Bridge C.",
    "No existing Canvas/Studio media or links are moved or duplicated."
  ],
  rollbackRule:"If any acceptance check fails, remove only the Chapter 4 patch between its ch04 START/END markers and/or the Bridge C cue between its intC START/END markers. Never delete, move, or duplicate the original Bridge C text or create a separate Bridge C page.",
  status:"READY_FOR_MANUAL_INSERTION"
};

export function validateChapter4BridgeCPilot(p:PressbooksPilotBPackage=CH4_BRIDGE_C_PILOT):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  if(p.pressbooksUrl!==bindingForNode("intC").pressbooksUrl) failures.push("shared-page-identity-broken");
  if(!p.chapterInsertionAnchor.includes("both faith and reason, and later for law")) failures.push("wrong-chapter-anchor");
  if(!p.chapterInsertionRule.includes("Augustine: inquiry after certainty has become a problem")) failures.push("missing-next-chapter-heading");
  if(!p.bridgeInsertionAnchor.includes("continuity of transmission does not imply identity of meaning")) failures.push("wrong-bridge-anchor");
  if(!p.bridgeInsertionRule.includes("A book cannot influence a later thinker if nobody can read it")) failures.push("missing-bridge-body-anchor");
  if(!p.bridgeInsertionRule.includes("Do not create a second Pressbooks page")) failures.push("missing-no-duplicate-page-rule");
  if(!p.chapterPatchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:ch04:START")) failures.push("missing-ch04-start");
  if(!p.chapterPatchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:ch04:END")) failures.push("missing-ch04-end");
  if(!p.bridgePatchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:intC:START")) failures.push("missing-intc-start");
  if(!p.bridgePatchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:intC:END")) failures.push("missing-intc-end");
  if(!p.bridgePatchHtml.includes("#node=intC&amp;tab=inquire")) failures.push("missing-intc-super-link");
  if(p.acceptanceChecks.length<12) failures.push("acceptance-checks-too-thin");
  if(!p.rollbackRule.includes("Never delete, move, or duplicate the original Bridge C text")) failures.push("rollback-not-bridge-safe");
  return {passes:failures.length===0,failures};
}
