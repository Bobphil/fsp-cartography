import { renderChapterPatch, bindingForNode } from "./fspHoiPressbooksPatch";

export interface PressbooksPilotCPackage {
  pilotId:string;
  nodeId:"ch08";
  chapterTitle:string;
  pressbooksUrl:string;
  insertionAnchor:string;
  insertionRule:string;
  patchHtml:string;
  expectedOptionalLinks:{
    label:string;
    hrefFragment:string;
    role:string;
  }[];
  acceptanceChecks:string[];
  rollbackRule:string;
  status:"READY_FOR_MANUAL_INSERTION";
}

export const CH8_INSERTION_ANCHOR =
  "This chapter follows that pressure through causal inference, induction, necessary connection, personal identity, and morality. Hume's inquiry is skeptical, but it is not simply destructive. Again and again, he asks what reason cannot establish and then looks at what human beings actually do. Custom, imagination, passion, sentiment, and social life enter the account not as embarrassing leftovers but as parts of the machinery by which human inquiry continues.";

export const CH8_PILOT:PressbooksPilotCPackage={
  pilotId:"FSP-HOI-PRESSBOOKS-PILOT-C-CH8",
  nodeId:"ch08",
  chapterTitle:"The Habit of Expecting",
  pressbooksUrl:bindingForNode("ch08").pressbooksUrl,
  insertionAnchor:CH8_INSERTION_ANCHOR,
  insertionRule:"Insert the Chapter 8 reconciliation patch immediately after the paragraph ending 'parts of the machinery by which human inquiry continues.' and before the horizontal rule / heading '1. The task inherited from Locke and Berkeley.' Do not alter the opening prose, horizontal rule, or heading.",
  patchHtml:renderChapterPatch(8).html,
  expectedOptionalLinks:[
    {
      label:"Neptune/Vulcan whole inquiry",
      hrefFragment:"#/narrative/NEPTUNE-VULCAN",
      role:"Later scientific case for prediction, revision pressure, and bounded inference."
    },
    {
      label:"DESI case",
      hrefFragment:"#/cases/DESI-2024-2026",
      role:"Live frontier case where evidence, model comparison, claim ceilings, and reopening remain active."
    }
  ],
  acceptanceChecks:[
    "The Chapter 8 URL remains exactly https://pressbooks.pub/whatmaywecarryforward/chapter/the-habit-of-expecting/.",
    "The complete opening billiard-ball and Hume orientation remains word-for-word unchanged.",
    "The heading '1. The task inherited from Locke and Berkeley' remains unchanged.",
    "The Later Reopening block appears once only.",
    "The Later Reopening explicitly says the contemporary links do not mean Hume anticipated or predicted later science.",
    "The Neptune/Vulcan Encyclopedia link opens the certified whole-inquiry narrative.",
    "The DESI Encyclopedia link opens the DESI case page.",
    "Both Encyclopedia links remain explicitly optional for core course completion.",
    "The SUPER link opens node ch08 on the inquire tab.",
    "The Table of Contents entry still opens Chapter 8.",
    "Previous/next Pressbooks navigation remains functional.",
    "Existing Chapter 8 citations and footnotes still render.",
    "The patch START marker appears once only.",
    "Mobile reading remains usable.",
    "Pressbooks print/PDF export retains the chapter prose and patch text.",
    "No existing Canvas/Studio media or links are moved or duplicated."
  ],
  rollbackRule:"If any acceptance check fails, remove only the content from <!-- FSP-HOI-PRESSBOOKS-PATCH-1:ch08:START --> through <!-- FSP-HOI-PRESSBOOKS-PATCH-1:ch08:END -->. Leave the full original Hume chapter, its citations, and its existing return apparatus untouched.",
  status:"READY_FOR_MANUAL_INSERTION"
};

export function validateChapter8Pilot(p:PressbooksPilotCPackage=CH8_PILOT):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  if(p.nodeId!=="ch08") failures.push("wrong-node");
  if(!p.pressbooksUrl.endsWith("/chapter/the-habit-of-expecting/")) failures.push("wrong-url");
  if(!p.insertionAnchor.includes("parts of the machinery by which human inquiry continues")) failures.push("wrong-anchor");
  if(!p.insertionRule.includes("1. The task inherited from Locke and Berkeley")) failures.push("missing-next-heading");
  if(!p.patchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:ch08:START")) failures.push("missing-start-marker");
  if(!p.patchHtml.includes("FSP-HOI-PRESSBOOKS-PATCH-1:ch08:END")) failures.push("missing-end-marker");
  if(!p.patchHtml.includes("Later reopening")) failures.push("missing-later-reopening");
  if(!p.patchHtml.includes("not a claim that the historical thinker anticipated or predicted the later inquiry")) failures.push("missing-anti-teleology-rule");
  if(!p.patchHtml.includes("NEPTUNE-VULCAN")) failures.push("missing-neptune-vulcan-link");
  if(!p.patchHtml.includes("DESI-2024-2026")) failures.push("missing-desi-link");
  if(!p.patchHtml.includes("#node=ch08&amp;tab=inquire")) failures.push("missing-super-link");
  if(!p.patchHtml.includes("You do not need these links to complete the chapter")) failures.push("optional-link-boundary-missing");
  if(p.expectedOptionalLinks.length!==2) failures.push("optional-link-count");
  if(p.acceptanceChecks.length<14) failures.push("acceptance-checks-too-thin");
  if(!p.rollbackRule.includes("Leave the full original Hume chapter")) failures.push("rollback-not-bounded");
  return {passes:failures.length===0,failures};
}
