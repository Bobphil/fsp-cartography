import { HOI_CHAPTERS, HoiChapterReconciliation } from "./fspHoiReconcile";

export type PressbooksNodeType =
  | "prologue" | "chapter" | "inquiry_window" | "historical_bridge" | "laboratory" | "epilogue";

export type PressbooksPatchPolicy =
  | "ORIENTATION_ONLY"
  | "CHAPTER_RECONCILIATION"
  | "INTERVENTION_RETURN_ONLY"
  | "EMBEDDED_BRIDGE_SHARED_PAGE"
  | "LAB_PRESERVE"
  | "EPILOGUE_RETURN_ONLY";

export interface PressbooksNodeBinding {
  order:number;
  nodeId:string;
  type:PressbooksNodeType;
  title:string;
  pressbooksUrl:string;
  superUrl:string;
  policy:PressbooksPatchPolicy;
}

export interface PressbooksPatchFragment {
  patchId:string;
  nodeId:string;
  pressbooksUrl:string;
  placement:"AFTER_OPENING_OR_PROMISE"|"BEFORE_EXISTING_RETURN"|"EMBEDDED_BRIDGE_SEAM";
  html:string;
  optionalEncyclopediaPaths:string[];
  invariants:string[];
}

export const ENCYCLOPEDIA_PUBLIC_BASE="https://bobphil.github.io/fsp-cartography/";
export const PRESSBOOKS_BOOK_BASE="https://pressbooks.pub/whatmaywecarryforward/";
const superBase="https://rmertzman-tech.github.io/what-may-we-carry-forward-super/";

export const PRESSBOOKS_BINDINGS:PressbooksNodeBinding[]=[
  {order:0,nodeId:"prologue",type:"prologue",title:"You Inherited a Philosophical World",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"front-matter/introduction/",superUrl:superBase+"#node=prologue&tab=inquire",policy:"ORIENTATION_ONLY"},
  {order:1,nodeId:"ch01",type:"chapter",title:"The Trouble with Knowing",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/chapter-1/",superUrl:superBase+"#node=ch01&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:2,nodeId:"ch02",type:"chapter",title:"A Life as a Whole",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/a-life-as-a-whole/",superUrl:superBase+"#node=ch02&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:3,nodeId:"intA",type:"inquiry_window",title:"Cultivation, Role, Way",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/cultivation-role-way/",superUrl:superBase+"#node=intA&tab=inquire",policy:"INTERVENTION_RETURN_ONLY"},
  {order:4,nodeId:"ch03",type:"chapter",title:"Philosophy Under Pressure",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/philosophy-under-pressure/",superUrl:superBase+"#node=ch03&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:5,nodeId:"intB",type:"inquiry_window",title:"Suffering, Attachment, Self, Practice",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/suffering-attachment-self-practice/",superUrl:superBase+"#node=intB&tab=inquire",policy:"INTERVENTION_RETURN_ONLY"},
  {order:6,nodeId:"ch04",type:"chapter",title:"Reason Inside an Inherited World",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/reason-inside-an-inherited-world/",superUrl:superBase+"#node=ch04&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:7,nodeId:"intC",type:"historical_bridge",title:"Transmission Is a Doing",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/reason-inside-an-inherited-world/",superUrl:superBase+"#node=intC&tab=inquire",policy:"EMBEDDED_BRIDGE_SHARED_PAGE"},
  {order:8,nodeId:"ch05",type:"chapter",title:"Rebuilding the Map",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/rebuilding-the-map/",superUrl:superBase+"#node=ch05&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:9,nodeId:"ch06",type:"chapter",title:"What Can Survive Doubt?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/what-can-survive-doubt/",superUrl:superBase+"#node=ch06&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:10,nodeId:"ch07",type:"chapter",title:"Ideas and the World",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/ideas-and-the-world/",superUrl:superBase+"#node=ch07&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:11,nodeId:"ch08",type:"chapter",title:"The Habit of Expecting",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/the-habit-of-expecting/",superUrl:superBase+"#node=ch08&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:12,nodeId:"ch09",type:"chapter",title:"What Must Experience Bring With It?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/what-must-experience-bring-with-it/",superUrl:superBase+"#node=ch09&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:13,nodeId:"ch10",type:"chapter",title:"Whose Happiness Counts?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/whose-happiness-counts/",superUrl:superBase+"#node=ch10&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:14,nodeId:"ch11",type:"chapter",title:"When Values Acquire a History",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/when-values-acquire-a-history/",superUrl:superBase+"#node=ch11&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:15,nodeId:"ch12",type:"chapter",title:"Inquiry That Can Learn",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/inquiry-that-can-learn/",superUrl:superBase+"#node=ch12&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:16,nodeId:"ch13",type:"chapter",title:"Situated Freedom",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/situated-freedom/",superUrl:superBase+"#node=ch13&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:17,nodeId:"intD",type:"inquiry_window",title:"Persons in Relation",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/persons-in-relation/",superUrl:superBase+"#node=intD&tab=inquire",policy:"INTERVENTION_RETURN_ONLY"},
  {order:18,nodeId:"ch14",type:"chapter",title:"You Are Here",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/you-are-here-contemporary-situated-inquiry/",superUrl:superBase+"#node=ch14&tab=inquire",policy:"CHAPTER_RECONCILIATION"},
  {order:19,nodeId:"lab01",type:"laboratory",title:"One Universe, Many Descriptions?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/one-universe-many-descriptions-space-time-cosmology/",superUrl:superBase+"#node=lab01&tab=inquire",policy:"LAB_PRESERVE"},
  {order:20,nodeId:"lab02",type:"laboratory",title:"Where Is the Mind?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/where-is-the-mind/",superUrl:superBase+"#node=lab02&tab=inquire",policy:"LAB_PRESERVE"},
  {order:21,nodeId:"lab03",type:"laboratory",title:"What Does It Mean to Be Alive?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/what-does-it-mean-to-be-alive/",superUrl:superBase+"#node=lab03&tab=inquire",policy:"LAB_PRESERVE"},
  {order:22,nodeId:"lab04",type:"laboratory",title:"The Patient Is Not a Population",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/the-patient-is-not-a-population/",superUrl:superBase+"#node=lab04&tab=inquire",policy:"LAB_PRESERVE"},
  {order:23,nodeId:"lab05",type:"laboratory",title:"One World, Many Maps?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/one-world-many-maps/",superUrl:superBase+"#node=lab05&tab=inquire",policy:"LAB_PRESERVE"},
  {order:24,nodeId:"lab06",type:"laboratory",title:"When May a Machine Decide?",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"chapter/when-may-a-machine-decide/",superUrl:superBase+"#node=lab06&tab=inquire",policy:"LAB_PRESERVE"},
  {order:25,nodeId:"epilogue",type:"epilogue",title:"The Map Is Still Open",pressbooksUrl:PRESSBOOKS_BOOK_BASE+"back-matter/the-map-is-still-open/",superUrl:superBase+"#node=epilogue&tab=inquire",policy:"EPILOGUE_RETURN_ONLY"}
];

const laterReopeningOrdinals=new Set([5,6,7,8,9,10,12,13]);

function esc(s:string):string{
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function absEncyclopedia(path:string):string{
  const clean=path.startsWith("#")?path:"#"+path;
  return ENCYCLOPEDIA_PUBLIC_BASE+clean;
}

function chapterNode(ordinal:number):string{
  return "ch"+String(ordinal).padStart(2,"0");
}

export function bindingForNode(nodeId:string):PressbooksNodeBinding{
  const b=PRESSBOOKS_BINDINGS.find(x=>x.nodeId===nodeId);
  if(!b) throw new Error("unknown Pressbooks node: "+nodeId);
  return structuredClone(b);
}

function contextRecoveryHtml(c:HoiChapterReconciliation):string{
  return [
    '<aside class="hoi-patch hoi-context-recovery" aria-label="Where this chapter fits">',
    '<h3>Where this chapter fits</h3>',
    '<p><strong>Inherited world:</strong> '+esc(c.wholeInquiryRecovery.inheritedWorld)+'</p>',
    '<p><strong>Live problem:</strong> '+esc(c.wholeInquiryRecovery.liveProblem)+'</p>',
    '<p><strong>Developmental move:</strong> '+esc(c.developmentalMove)+'</p>',
    '<p><strong>Time and context:</strong> '+esc(c.temporalAnchor)+'</p>',
    '</aside>'
  ].join("\\n");
}

function optionalDepthHtml(c:HoiChapterReconciliation):string{
  if(!c.encyclopediaLinks.length) return "";
  const items=c.encyclopediaLinks.map(l=>{
    const href=l.href.startsWith("#/")?absEncyclopedia(l.href):l.href;
    return '<li><a href="'+esc(href)+'">'+esc(l.label)+'</a> — '+esc(l.reason)+' <em>(optional)</em></li>';
  }).join("\\n");
  return [
    '<aside class="hoi-patch hoi-depth-links" aria-label="Optional deeper exploration">',
    '<h3>Optional deeper exploration</h3>',
    '<p>You do not need these links to complete the chapter. They are available if you want more context or a deeper case comparison.</p>',
    '<ul>',items,'</ul>','</aside>'
  ].join("\\n");
}

function laterReopeningHtml(c:HoiChapterReconciliation):string{
  if(!c.ordinal || !laterReopeningOrdinals.has(c.ordinal)) return "";
  return [
    '<aside class="hoi-patch hoi-later-reopening" aria-label="Later reopening">',
    '<h3>Later reopening</h3>',
    '<p>'+esc(c.wholeInquiryRecovery.reopening)+'</p>',
    '<p><em>This is a later reopening of the problem, not a claim that the historical thinker anticipated or predicted the later inquiry.</em></p>',
    '</aside>'
  ].join("\\n");
}

function returnHtml(c:HoiChapterReconciliation,b:PressbooksNodeBinding):string{
  return [
    '<nav class="hoi-patch hoi-return" aria-label="Return and continue">',
    '<h3>Return to the whole inquiry</h3>',
    '<p><strong>Carry forward:</strong> '+esc(c.wholeInquiryRecovery.changedLaterTask)+'</p>',
    '<p><a href="'+esc(PRESSBOOKS_BOOK_BASE+"front-matter/introduction/")+'">Return to the book&#39;s guiding question</a> · <a href="'+esc(b.superUrl)+'">Open this chapter&#39;s inquiry workspace</a></p>',
    '</nav>'
  ].join("\\n");
}

export function renderChapterPatch(ordinal:number):PressbooksPatchFragment{
  const c=HOI_CHAPTERS.find(x=>x.ordinal===ordinal);
  if(!c) throw new Error("unknown HOI chapter ordinal: "+ordinal);
  const nodeId=chapterNode(ordinal);
  const b=bindingForNode(nodeId);
  const start="<!-- FSP-HOI-PRESSBOOKS-PATCH-1:"+nodeId+":START -->";
  const end="<!-- FSP-HOI-PRESSBOOKS-PATCH-1:"+nodeId+":END -->";
  const parts=[start,contextRecoveryHtml(c),laterReopeningHtml(c),optionalDepthHtml(c),returnHtml(c,b),end].filter(Boolean);
  return {
    patchId:"FSP-HOI-PRESSBOOKS-PATCH-1:"+nodeId,
    nodeId,
    pressbooksUrl:b.pressbooksUrl,
    placement:"AFTER_OPENING_OR_PROMISE",
    html:parts.join("\\n\\n"),
    optionalEncyclopediaPaths:c.encyclopediaLinks.map(x=>x.href),
    invariants:[
      "Do not replace or reorder existing chapter prose.",
      "Do not alter the Pressbooks URL or slug.",
      "Do not duplicate Canvas/Studio media.",
      "Do not add scripts, iframes, forms, or page-global CSS.",
      "Do not insert a second copy if this patch marker already exists.",
      "All Encyclopedia links remain optional for core course completion."
    ]
  };
}

export function renderInterventionReturnPatch(nodeId:"intA"|"intB"|"intD"):PressbooksPatchFragment{
  const b=bindingForNode(nodeId);
  const html=[
    "<!-- FSP-HOI-PRESSBOOKS-PATCH-1:"+nodeId+":START -->",
    '<nav class="hoi-patch hoi-return" aria-label="Return to the historical spine">',
    '<h3>Return to the historical spine</h3>',
    '<p>This intervention broadens the map without turning comparison into identity or genealogy. Return to the numbered chapters carrying forward only what the comparison has actually earned.</p>',
    '<p><a href="'+esc(b.superUrl)+'">Open this intervention&#39;s inquiry workspace</a></p>',
    '</nav>',
    "<!-- FSP-HOI-PRESSBOOKS-PATCH-1:"+nodeId+":END -->"
  ].join("\\n");
  return {
    patchId:"FSP-HOI-PRESSBOOKS-PATCH-1:"+nodeId,nodeId,pressbooksUrl:b.pressbooksUrl,
    placement:"BEFORE_EXISTING_RETURN",html,optionalEncyclopediaPaths:[],
    invariants:["Do not alter intervention body.","Comparison ≠ genealogy.","Do not duplicate existing return apparatus."]
  };
}

export function renderBridgeCPatch():PressbooksPatchFragment{
  const b=bindingForNode("intC");
  const html=[
    "<!-- FSP-HOI-PRESSBOOKS-PATCH-1:intC:START -->",
    '<aside class="hoi-patch hoi-bridge-cue" aria-label="Historical transmission bridge">',
    '<h3>Historical Bridge — Transmission Is a Doing</h3>',
    '<p>This bridge follows documented transmission and transformation. It is not merely a pedagogical comparison. Preserve source direction, translation changes, and what remains uncertain.</p>',
    '<p><a href="'+esc(b.superUrl)+'">Inspect the transmission inquiry</a> · <a href="'+esc(bindingForNode("ch04").pressbooksUrl)+'">Return to Chapter 4</a></p>',
    '</aside>',
    "<!-- FSP-HOI-PRESSBOOKS-PATCH-1:intC:END -->"
  ].join("\\n");
  return {
    patchId:"FSP-HOI-PRESSBOOKS-PATCH-1:intC",nodeId:"intC",pressbooksUrl:b.pressbooksUrl,
    placement:"EMBEDDED_BRIDGE_SEAM",html,optionalEncyclopediaPaths:[],
    invariants:["Bridge C shares the Chapter 4 page; never create a duplicate Pressbooks page.","Transmission claims require historical provenance."]
  };
}

export function productionPatchSet():PressbooksPatchFragment[]{
  return [
    ...HOI_CHAPTERS.map(c=>renderChapterPatch(c.ordinal!)),
    renderInterventionReturnPatch("intA"),
    renderInterventionReturnPatch("intB"),
    renderBridgeCPatch(),
    renderInterventionReturnPatch("intD")
  ];
}

export function validatePressbooksPatchSet(patches=productionPatchSet()):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  const ids=new Set<string>();
  for(const p of patches){
    if(ids.has(p.patchId)) failures.push("duplicate-patch:"+p.patchId);
    ids.add(p.patchId);
    if(!p.pressbooksUrl.startsWith(PRESSBOOKS_BOOK_BASE)) failures.push(p.nodeId+":wrong-book-url");
    if(!p.html.includes("FSP-HOI-PRESSBOOKS-PATCH-1:"+p.nodeId+":START")) failures.push(p.nodeId+":missing-start-marker");
    if(!p.html.includes("FSP-HOI-PRESSBOOKS-PATCH-1:"+p.nodeId+":END")) failures.push(p.nodeId+":missing-end-marker");
    if(/<script|<iframe|<form|<style/i.test(p.html)) failures.push(p.nodeId+":unsafe-active-html");
    if(/state vector|relation graph|canonical fingerprint|projection profile|reducer|invariant suite/i.test(p.html)) failures.push(p.nodeId+":formal-fsp-leak");
  }
  const chapterPatches=patches.filter(p=>/^ch\d\d$/.test(p.nodeId));
  if(chapterPatches.length!==14) failures.push("chapter-patch-count");
  if(patches.some(p=>/^lab\d/.test(p.nodeId))) failures.push("labs-must-remain-unpatched-in-this-pass");
  if(bindingForNode("intC").pressbooksUrl!==bindingForNode("ch04").pressbooksUrl) failures.push("bridge-c-page-identity");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
