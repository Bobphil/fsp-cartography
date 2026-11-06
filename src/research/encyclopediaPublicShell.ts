import {
  PUBLIC_ARCHITECTURE,
  PublicChapter,
  PublicCase,
  PublicConcept,
  PublicTool,
  PublicComparisonPath
} from "./encyclopediaPublicArchitecture";
import { CHAPTER_SECTIONS } from "./encyclopediaNavigation";
import { mountEncyclopediaReader } from "./encyclopediaReaderBrowser";
import { ENCYCLOPEDIA_PILOT } from "./encyclopediaPilotConfig";

type PublicRoute =
  | {kind:"HOME"}
  | {kind:"CHAPTERS"}
  | {kind:"CHAPTER";id:string}
  | {kind:"CASES"}
  | {kind:"CASE";id:string}
  | {kind:"CONCEPTS"}
  | {kind:"CONCEPT";id:string}
  | {kind:"TOOLS"}
  | {kind:"TOOL";id:string}
  | {kind:"COMPARISONS"}
  | {kind:"COMPARISON";id:string}
  | {kind:"READER";sectionId:string;caseId:string};

const CSS=`
:root{color-scheme:light;--ink:#172033;--muted:#626b78;--line:#d8dde6;--paper:#fff;--wash:#f6f7f9;--accent:#243b67;--soft:#e9eef8}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}.fsp-public{max-width:1180px;margin:auto;padding:0 24px 64px}.fsp-public__mast{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:20px 0;border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);z-index:5}.fsp-public__brand{font-weight:800;text-decoration:none;letter-spacing:.03em}.fsp-public__nav{display:flex;gap:.8rem;flex-wrap:wrap}.fsp-public__nav a{text-decoration:none;color:var(--muted)}.fsp-public__nav a:hover,.fsp-public__nav a:focus{color:var(--accent)}.fsp-public__hero{padding:clamp(44px,8vw,88px) 0 36px;max-width:850px}.fsp-public__eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:.8rem;color:var(--muted);font-weight:700}.fsp-public h1,.fsp-public h2{font-family:Georgia,serif;line-height:1.12}.fsp-public h1{font-size:clamp(2.5rem,6vw,5rem);margin:.2em 0}.fsp-public h2{font-size:clamp(1.6rem,3vw,2.4rem)}.fsp-public__lede{font-size:1.2rem;color:#30394a;max-width:760px}.fsp-public__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}.fsp-public__card{border:1px solid var(--line);border-radius:18px;padding:1.2rem;background:#fff}.fsp-public__card h3{margin-top:0}.fsp-public__card p{color:#3d4655}.fsp-public__card a,.fsp-public__button{display:inline-block;margin-top:.4rem;text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:.58rem .9rem}.fsp-public__button--primary{background:var(--accent);color:#fff;border-color:var(--accent)}.fsp-public__section{padding:28px 0}.fsp-public__meta{color:var(--muted);font-size:.92rem}.fsp-public__pill{display:inline-block;background:var(--wash);border-radius:999px;padding:.25rem .6rem;margin:.18rem .25rem .18rem 0;font-size:.86rem}.fsp-public__notice{padding:1rem 1.1rem;background:var(--soft);border-radius:14px}.fsp-public__list{display:grid;gap:.8rem;padding:0;list-style:none}.fsp-public__list li{padding-bottom:.8rem;border-bottom:1px solid var(--line)}.fsp-public__back{display:inline-block;margin:24px 0}.fsp-public__footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--line);color:var(--muted)}@media(max-width:720px){.fsp-public__mast{position:static;display:block}.fsp-public__nav{margin-top:.7rem}.fsp-public{padding:0 18px 48px}}
`;

function routeFromHash(hash:string):PublicRoute{
  const raw=(hash.replace(/^#\/?/,"")||"").split("/").filter(Boolean);
  if(raw.length===0) return {kind:"HOME"};
  if(raw[0]==="chapters") return raw[1]?{kind:"CHAPTER",id:raw[1]}:{kind:"CHAPTERS"};
  if(raw[0]==="cases") return raw[1]?{kind:"CASE",id:raw[1]}:{kind:"CASES"};
  if(raw[0]==="concepts") return raw[1]?{kind:"CONCEPT",id:raw[1]}:{kind:"CONCEPTS"};
  if(raw[0]==="tools") return raw[1]?{kind:"TOOL",id:raw[1]}:{kind:"TOOLS"};
  if(raw[0]==="comparisons") return raw[1]?{kind:"COMPARISON",id:raw[1]}:{kind:"COMPARISONS"};
  if(raw[0]==="reader" && raw[1] && raw[2]) return {kind:"READER",sectionId:raw[1],caseId:raw[2]};
  return {kind:"HOME"};
}

function el<K extends keyof HTMLElementTagNameMap>(tag:K,cls?:string,text?:string):HTMLElementTagNameMap[K]{
  const node=document.createElement(tag);
  if(cls) node.className=cls;
  if(text!==undefined) node.textContent=text;
  return node;
}
function link(label:string,href:string,cls?:string):HTMLAnchorElement{
  const a=el("a",cls,label); a.href=href; return a;
}
function pills(items:string[]):HTMLElement{
  const wrap=el("div");
  for(const item of items) wrap.append(el("span","fsp-public__pill",item));
  return wrap;
}
function card(title:string,body:string,href:string,label:string):HTMLElement{
  const c=el("article","fsp-public__card");
  c.append(el("h3","",title),el("p","",body),link(label,href));
  return c;
}
function chrome(main:HTMLElement):HTMLElement{
  const shell=el("div","fsp-public");
  const style=el("style"); style.textContent=CSS;
  const mast=el("header","fsp-public__mast");
  mast.append(link("FSP Encyclopedia","#/","fsp-public__brand"));
  const nav=el("nav","fsp-public__nav");
  nav.append(
    link("Chapters","#/chapters"),link("Cases","#/cases"),link("Concepts","#/concepts"),
    link("Tools","#/tools"),link("Comparisons","#/comparisons")
  );
  mast.append(nav);
  const footer=el("footer","fsp-public__footer","Public architecture: Read → Inspect → Formal. Canonical Atlas and routing contracts remain authoritative.");
  shell.append(style,mast,main,footer);
  return shell;
}
function hero(eyebrow:string,title:string,lede:string):HTMLElement{
  const h=el("section","fsp-public__hero");
  h.append(el("div","fsp-public__eyebrow",eyebrow),el("h1","",title),el("p","fsp-public__lede",lede));
  return h;
}
function livePilotLink():HTMLAnchorElement{
  return link("Open the live Neptune/Vulcan reader","#/reader/CH1.2/NEPTUNE-VULCAN","fsp-public__button fsp-public__button--primary");
}

function renderHome():HTMLElement{
  const main=el("main");
  main.append(hero("Public reader",PUBLIC_ARCHITECTURE.home.title,PUBLIC_ARCHITECTURE.home.subtitle));
  const notice=el("p","fsp-public__notice","This is the first public shell. Neptune/Vulcan is the current complete vertical slice; the other indexes expose the architecture and content map while their deeper readers are built.");
  main.append(notice);
  const entrances=el("section","fsp-public__section");
  entrances.append(el("h2","","Choose an entrance"));
  const grid=el("div","fsp-public__grid");
  grid.append(
    card("Read the argument","Follow the four-chapter sequence from revision pressure through meaning change, controlled revision, and the unified diachronic formalism.","#/chapters","Browse chapters"),
    card("Enter through a case","Begin with one of five scientific cases and see where it appears across the Encyclopedia.","#/cases","Browse cases"),
    card("Look up a concept","Open plain-language explanations of the key ideas used across the chapters and Atlas.","#/concepts","Browse concepts"),
    card("Use an inquiry tool","See the operations FSP uses to inspect revision, provenance, translation, standing, claim ceilings, and return.","#/tools","Browse tools"),
    card("Compare across cases","Follow one inquiry function across multiple cases without collapsing their historical differences.","#/comparisons","Browse comparisons")
  );
  entrances.append(grid); main.append(entrances);
  const pilot=el("section","fsp-public__section");
  pilot.append(el("h2","","Current complete vertical slice"),el("p","","CH1.2 · Neptune and Vulcan: successful and failed auxiliary repair, controlled revision, source support, claim ceiling, and exact return to prose."),livePilotLink());
  main.append(pilot);
  return main;
}

function renderChapters():HTMLElement{
  const main=el("main"); main.append(hero("Four-chapter sequence","Read the argument","Each chapter uses familiar scientific cases to expose a different problem in changing inquiry."));
  const grid=el("div","fsp-public__grid");
  for(const c of PUBLIC_ARCHITECTURE.chapters) grid.append(card(`${c.ordinal}. ${c.title}`,c.publicQuestion,`#/chapters/${c.chapterId}`,"Open chapter map"));
  main.append(grid); return main;
}
function renderChapter(id:string):HTMLElement{
  const c=PUBLIC_ARCHITECTURE.chapters.find(x=>x.chapterId===id); if(!c) return renderChapters();
  const main=el("main"); main.append(link("← All chapters","#/chapters","fsp-public__back"),hero(`Chapter ${c.ordinal}`,c.title,c.publicQuestion));
  main.append(el("p","fsp-public__lede",c.publicPromise));
  const secs=el("section","fsp-public__section"); secs.append(el("h2","","Sections"));
  const ul=el("ul","fsp-public__list");
  for(const sid of c.sectionIds){
    const s=CHAPTER_SECTIONS.find(x=>x.sectionId===sid); if(!s) continue;
    const li=el("li"); li.append(el("strong","",`${sid} · ${s.title}`),el("div","fsp-public__meta",s.summary));
    if(sid==="CH1.2") li.append(livePilotLink());
    ul.append(li);
  }
  secs.append(ul); main.append(secs);
  const rel=el("section","fsp-public__section"); rel.append(el("h2","","Featured cases"),pills(c.featuredCaseIds.map(id=>PUBLIC_ARCHITECTURE.cases.find(x=>x.caseId===id)?.shortTitle??id)));
  main.append(rel); return main;
}

function renderCases():HTMLElement{
  const main=el("main"); main.append(hero("Five-case Atlas","Enter through a case","Each public case page explains why the case matters and where it appears across the four-chapter sequence."));
  const grid=el("div","fsp-public__grid");
  for(const c of PUBLIC_ARCHITECTURE.cases) grid.append(card(c.shortTitle,c.publicQuestion,`#/cases/${c.caseId}`,"Open case map"));
  main.append(grid); return main;
}
function renderCase(id:string):HTMLElement{
  const c=PUBLIC_ARCHITECTURE.cases.find(x=>x.caseId===id); if(!c) return renderCases();
  const main=el("main"); main.append(link("← All cases","#/cases","fsp-public__back"),hero("Case",c.shortTitle,c.publicQuestion),el("p","fsp-public__lede",c.whyItMatters));
  const chapters=el("section","fsp-public__section"); chapters.append(el("h2","","Appears in"),pills(c.chapterIds.map(id=>PUBLIC_ARCHITECTURE.chapters.find(x=>x.chapterId===id)?.title??id))); main.append(chapters);
  const concepts=el("section","fsp-public__section"); concepts.append(el("h2","","Key concepts"),pills(c.conceptIds.map(id=>PUBLIC_ARCHITECTURE.concepts.find(x=>x.conceptId===id)?.title??id))); main.append(concepts);
  if(id==="NEPTUNE-VULCAN"){const live=el("section","fsp-public__section");live.append(el("h2","","Live reader"),el("p","","This is currently the complete public vertical slice."),livePilotLink());main.append(live);}
  else main.append(el("p","fsp-public__notice","This case is mapped into the public architecture, but its full public reader has not yet been produced."));
  return main;
}

function renderConcepts():HTMLElement{
  const main=el("main"); main.append(hero("Concept library","What the ideas mean","Concept cards explain the vocabulary used across the chapters and Atlas without becoming new historical or evidential authorities."));
  const grid=el("div","fsp-public__grid"); for(const c of PUBLIC_ARCHITECTURE.concepts) grid.append(card(c.title,c.shortDefinition,`#/concepts/${c.conceptId}`,"Open concept")); main.append(grid); return main;
}
function renderConcept(id:string):HTMLElement{
  const c=PUBLIC_ARCHITECTURE.concepts.find(x=>x.conceptId===id); if(!c)return renderConcepts();
  const main=el("main");main.append(link("← All concepts","#/concepts","fsp-public__back"),hero("Concept",c.title,c.shortDefinition));
  const explain=el("section","fsp-public__section");explain.append(el("h2","","Helps explain")); const ul=el("ul");c.explains.forEach(x=>ul.append(el("li","",x)));explain.append(ul);main.append(explain);
  main.append(el("section","fsp-public__section")).append(el("h2","","Illustrated by"),pills(c.caseIds.map(id=>PUBLIC_ARCHITECTURE.cases.find(x=>x.caseId===id)?.shortTitle??id)));
  return main;
}

function renderTools():HTMLElement{
  const main=el("main");main.append(hero("Inquiry tools","What the reader can do","Tools operationalize FSP concepts without redefining the canonical cases or their evidential limits."));
  const grid=el("div","fsp-public__grid");for(const t of PUBLIC_ARCHITECTURE.tools)grid.append(card(t.title,t.publicPurpose,`#/tools/${t.toolId}`,"Open tool"));main.append(grid);return main;
}
function renderTool(id:string):HTMLElement{
  const t=PUBLIC_ARCHITECTURE.tools.find(x=>x.toolId===id);if(!t)return renderTools();
  const main=el("main");main.append(link("← All tools","#/tools","fsp-public__back"),hero(`${t.minimumDepth} depth`,t.title,t.publicPurpose));
  main.append(el("p","fsp-public__notice",t.readerPrompt));
  main.append(el("section","fsp-public__section")).append(el("h2","","Used with"),pills(t.caseIds.map(id=>PUBLIC_ARCHITECTURE.cases.find(x=>x.caseId===id)?.shortTitle??id)));
  return main;
}

function renderComparisons():HTMLElement{
  const main=el("main");main.append(hero("Comparison paths","Compare without collapsing","Each path follows one inquiry function across cases while keeping case-specific differences and claim ceilings visible."));
  const grid=el("div","fsp-public__grid");for(const c of PUBLIC_ARCHITECTURE.comparisons)grid.append(card(c.title,c.publicQuestion,`#/comparisons/${c.comparisonId}`,"Open comparison"));main.append(grid);return main;
}
function renderComparison(id:string):HTMLElement{
  const c=PUBLIC_ARCHITECTURE.comparisons.find(x=>x.comparisonId===id);if(!c)return renderComparisons();
  const main=el("main");main.append(link("← All comparisons","#/comparisons","fsp-public__back"),hero(`${c.minimumDepth} depth`,c.title,c.publicQuestion));
  const cases=el("section","fsp-public__section");cases.append(el("h2","","Cases in this path"));
  const grid=el("div","fsp-public__grid");for(const id of c.caseIds){const x=PUBLIC_ARCHITECTURE.cases.find(y=>y.caseId===id);if(x)grid.append(card(x.shortTitle,x.whyItMatters,`#/cases/${id}`,"Open case"));}cases.append(grid);main.append(cases);
  return main;
}

export function mountPublicEncyclopedia(root:HTMLElement):{render:()=>void}{
  const render=()=>{
    const route=routeFromHash(location.hash);
    if(route.kind==="READER"){
      if(route.sectionId===ENCYCLOPEDIA_PILOT.sectionId && route.caseId===ENCYCLOPEDIA_PILOT.caseId){
        document.title=ENCYCLOPEDIA_PILOT.pageTitle+" · FSP Encyclopedia";
        root.replaceChildren();
        mountEncyclopediaReader(root,{sectionId:route.sectionId,caseId:route.caseId,prose:ENCYCLOPEDIA_PILOT.prose,anchorId:"ch1-2-neptune-vulcan",routeContext:"public-shell"});
        return;
      }
      location.hash="#/cases/"+route.caseId; return;
    }
    let main:HTMLElement;
    if(route.kind==="HOME") main=renderHome();
    else if(route.kind==="CHAPTERS") main=renderChapters();
    else if(route.kind==="CHAPTER") main=renderChapter(route.id);
    else if(route.kind==="CASES") main=renderCases();
    else if(route.kind==="CASE") main=renderCase(route.id);
    else if(route.kind==="CONCEPTS") main=renderConcepts();
    else if(route.kind==="CONCEPT") main=renderConcept(route.id);
    else if(route.kind==="TOOLS") main=renderTools();
    else if(route.kind==="TOOL") main=renderTool(route.id);
    else if(route.kind==="COMPARISONS") main=renderComparisons();
    else main=renderComparison(route.id);
    document.title=(route.kind==="HOME"?"FSP Encyclopedia":"FSP Encyclopedia · "+route.kind);
    root.replaceChildren(chrome(main));
    window.scrollTo({top:0});
  };
  addEventListener("hashchange",render);
  render();
  return {render};
}
