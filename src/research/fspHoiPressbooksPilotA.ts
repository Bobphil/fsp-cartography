import { renderChapterPatch, bindingForNode } from "./fspHoiPressbooksPatch";

export interface PressbooksPilotPackage {
  pilotId:string;
  nodeId:string;
  chapterTitle:string;
  pressbooksUrl:string;
  insertionAnchor:string;
  insertionRule:string;
  patchHtml:string;
  acceptanceChecks:string[];
  rollbackRule:string;
  status:"READY_FOR_MANUAL_INSERTION";
}

export const CH5_INSERTION_ANCHOR =
  "Part I asked how philosophical examination, character, and practical discipline alter the person who inquires. Part II showed how philosophical artifacts survive through authority, translation, commentary, institutions, and reconstruction. We now encounter thinkers who increasingly ask whether inherited methods and authorities must themselves be rebuilt.";

export const CH5_PILOT:PressbooksPilotPackage={
  pilotId:"FSP-HOI-PRESSBOOKS-PILOT-A-CH5",
  nodeId:"ch05",
  chapterTitle:"Rebuilding the Map",
  pressbooksUrl:bindingForNode("ch05").pressbooksUrl,
  insertionAnchor:CH5_INSERTION_ANCHOR,
  insertionRule:"In the Pressbooks HTML editor, insert the generated patch immediately after this paragraph and before the horizontal rule / heading '1. An early-modern world already under construction.' Do not alter the paragraph, horizontal rule, or heading.",
  patchHtml:renderChapterPatch(5).html,
  acceptanceChecks:[
    "The chapter URL remains exactly https://pressbooks.pub/whatmaywecarryforward/chapter/rebuilding-the-map/.",
    "The opening prose remains word-for-word unchanged.",
    "The heading '1. An early-modern world already under construction' remains the first substantive section after the patch.",
    "The Table of Contents entry still opens Chapter 5.",
    "Previous/next Pressbooks navigation remains functional.",
    "Existing citations and footnotes still render.",
    "The Galileo Encyclopedia link opens the certified Galileo whole-inquiry narrative.",
    "The SUPER link opens node ch05 on the inquire tab.",
    "The patch appears once only; the START marker is not duplicated.",
    "The page remains readable on mobile.",
    "Pressbooks print/PDF export retains the chapter prose and does not lose the patch text.",
    "No existing Canvas/Studio media or links are moved or duplicated."
  ],
  rollbackRule:"If any acceptance check fails, remove only the content from <!-- FSP-HOI-PRESSBOOKS-PATCH-1:ch05:START --> through <!-- FSP-HOI-PRESSBOOKS-PATCH-1:ch05:END -->, leaving all original Chapter 5 content untouched.",
  status:"READY_FOR_MANUAL_INSERTION"
};

export function validateChapter5Pilot(p:PressbooksPilotPackage=CH5_PILOT):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  if(p.nodeId!=="ch05") failures.push("wrong-node");
  if(!p.pressbooksUrl.endsWith("/chapter/rebuilding-the-map/")) failures.push("wrong-url");
  if(!p.insertionAnchor.includes("whether inherited methods and authorities must themselves be rebuilt")) failures.push("wrong-anchor");
  if(!p.insertionRule.includes("1. An early-modern world already under construction")) failures.push("missing-next-heading");
  if(!p.patchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:ch05:START")) failures.push("missing-start-marker");
  if(!p.patchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:ch05:END")) failures.push("missing-end-marker");
  if(!p.patchHtml.includes("Later reopening")) failures.push("missing-later-reopening");
  if(!p.patchHtml.includes("GALILEO-COPERNICAN")) failures.push("missing-galileo-link");
  if(!p.patchHtml.includes("#node=ch05&tab=inquire")) failures.push("missing-super-link");
  if(p.acceptanceChecks.length<10) failures.push("acceptance-checks-too-thin");
  if(!p.rollbackRule.includes("leaving all original Chapter 5 content untouched")) failures.push("rollback-not-bounded");
  return {passes:failures.length===0,failures};
}
