import { AtlasTargetKind } from "./encyclopediaNavigation";
import { FIVE_CASE_ATLAS } from "./fiveCaseAtlasFixtures";
import {
  ReaderSession,
  back,
  enterCaseFromProse,
  exploreFullCase,
  openClaimCeiling,
  openTarget,
  openTimeline,
  returnToProse
} from "./encyclopediaReaderShell";
import {
  ReaderActionModel,
  ReaderPanelModel,
  buildProsePanel,
  buildReaderPanel
} from "./encyclopediaReaderPresentation";

export interface EncyclopediaReaderOptions {
  sectionId:string;
  caseId:string;
  prose?:string;
  anchorId?:string;
  routeContext?:string;
  publicBackHref?:string;
  publicBackLabel?:string;
}

export interface EncyclopediaReader {
  render():void;
  getSession():ReaderSession|null;
}

const CSS = `
.fsp-reader{--ink:#172033;--muted:#5b6472;--line:#d8dde6;--paper:#ffffff;--wash:#f6f7f9;--accent:#243b67;--soft:#e9eef8;font:16px/1.6 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:var(--paper);max-width:1120px;margin:0 auto;padding:clamp(18px,4vw,48px)}
.fsp-reader *{box-sizing:border-box}.fsp-reader button,.fsp-reader a{font:inherit}.fsp-reader button{border:1px solid var(--line);border-radius:999px;background:var(--paper);padding:.68rem 1rem;cursor:pointer}.fsp-reader button:hover,.fsp-reader button:focus-visible{border-color:var(--accent);outline:3px solid var(--soft);outline-offset:2px}.fsp-reader button[data-primary="true"]{background:var(--accent);color:#fff;border-color:var(--accent)}
.fsp-reader__top{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:1rem;margin-bottom:2rem}.fsp-reader__crumb{display:inline-block;margin-bottom:.55rem;color:var(--muted);text-decoration:none}.fsp-reader__crumb:hover,.fsp-reader__crumb:focus{color:var(--accent)}.fsp-reader__brand{font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:.8rem}.fsp-reader__origin{color:var(--muted);font-size:.9rem}
.fsp-reader__prose{max-width:760px}.fsp-reader__prose h1{font-family:Georgia,serif;font-size:clamp(2rem,5vw,3.7rem);line-height:1.08;margin:.2rem 0 1rem}.fsp-reader__prose p{font-family:Georgia,serif;font-size:1.15rem}.fsp-reader__inquiry-link{margin:2rem 0;padding:1.2rem;border-left:4px solid var(--accent);background:var(--wash)}
.fsp-reader__workspace{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,320px);gap:2rem}.fsp-reader__eyebrow{text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-size:.8rem;font-weight:700}.fsp-reader__workspace h1{font-family:Georgia,serif;font-size:clamp(1.8rem,4vw,3rem);line-height:1.15}.fsp-reader__lede{font-size:1.08rem;color:#30394a}.fsp-reader__notice{padding:1rem 1.1rem;background:var(--soft);border-radius:14px}.fsp-reader__section{border-top:1px solid var(--line);padding-top:1rem;margin-top:1.2rem}.fsp-reader__section h2{font-size:1rem}.fsp-reader__section ul{padding-left:1.2rem}
.fsp-reader__timeline{list-style:none;padding:0;margin:0;display:grid;gap:.7rem}.fsp-reader__timeline li{display:grid;grid-template-columns:auto 1fr;gap:.7rem;align-items:start}.fsp-reader__timeline button{border-radius:12px;width:100%;text-align:left}.fsp-reader__timeline button[aria-current="step"]{border-color:var(--accent);background:var(--soft)}.fsp-reader__timeline small{display:block;color:var(--muted)}.fsp-reader__rail{border-left:1px solid var(--line);padding-left:1.25rem}.fsp-reader__rail h2{font-size:1rem}.fsp-reader__actions{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.5rem}.fsp-reader__return{position:sticky;bottom:12px;margin-top:2rem;padding:.8rem;background:rgba(255,255,255,.94);border:1px solid var(--line);border-radius:16px;backdrop-filter:blur(8px)}
@media(max-width:760px){.fsp-reader{padding:20px}.fsp-reader__workspace{grid-template-columns:1fr}.fsp-reader__rail{border-left:0;border-top:1px solid var(--line);padding-left:0;padding-top:1rem}.fsp-reader__top{display:block}.fsp-reader__origin{margin-top:.35rem}}
`;

function button(action:ReaderActionModel,onAction:(a:ReaderActionModel)=>void):HTMLButtonElement{
  const b=document.createElement("button");
  b.type="button";
  b.textContent=action.label;
  b.dataset.action=action.id;
  if(action.primary) b.dataset.primary="true";
  b.addEventListener("click",()=>onAction(action));
  return b;
}

function list(items:string[]):HTMLElement{
  const ul=document.createElement("ul");
  for(const item of items){
    const li=document.createElement("li");
    if(/^https?:\/\//.test(item)){
      const a=document.createElement("a");
      a.href=item;
      a.textContent=item;
      a.target="_blank";
      a.rel="noreferrer";
      li.append(a);
    }else li.textContent=item;
    ul.append(li);
  }
  return ul;
}

export function mountEncyclopediaReader(
  root:HTMLElement,
  options:EncyclopediaReaderOptions
):EncyclopediaReader{
  let session:ReaderSession|null=null;
  const proseModel=buildProsePanel(options.sectionId,options.caseId,FIVE_CASE_ATLAS);
  const prose=options.prose ?? proseModel.summary;
  const anchorId=options.anchorId ?? `${options.sectionId}-reader-anchor`;
  const routeContext=options.routeContext ?? `encyclopedia:${options.sectionId}`;

  const returnToReading=()=>{
    if(!session) return;
    const origin=returnToProse(session);
    session=null;
    render();
    requestAnimationFrame(()=>{
      const anchor=document.getElementById(origin.anchorId);
      anchor?.focus({preventScroll:true});
      if(origin.scrollPosition!==null) window.scrollTo({top:origin.scrollPosition});
      else anchor?.scrollIntoView({block:"center"});
    });
  };

  const act=(action:ReaderActionModel)=>{
    if(!session) return;
    if(action.kind==="TIMELINE") session=openTimeline(session);
    else if(action.kind==="FULL_CASE") session=exploreFullCase(session);
    else if(action.kind==="BACK") session=back(session);
    else if(action.kind==="RETURN"){ returnToReading(); return; }
    else if(action.kind==="CASE_CLAIM_CEILING") session=openClaimCeiling(session,FIVE_CASE_ATLAS);
    else if(action.targetId) session=openTarget(session,FIVE_CASE_ATLAS,action.kind as AtlasTargetKind,action.targetId);
    render();
  };

  const renderTimeline=(model:ReaderPanelModel):HTMLElement|null=>{
    if(!model.timeline || !session) return null;
    const aside=document.createElement("aside");
    aside.className="fsp-reader__rail";
    const h=document.createElement("h2");
    h.textContent="State timeline";
    const ol=document.createElement("ol");
    ol.className="fsp-reader__timeline";

    for(const state of model.timeline.nodes){
      const li=document.createElement("li");
      const marker=document.createElement("span");
      marker.textContent=String(state.ordinal+1);
      const b=document.createElement("button");
      b.type="button";
      b.innerHTML=`<strong>${state.stateId}</strong><small></small>`;
      const small=b.querySelector("small");
      if(small) small.textContent=state.periodLabel + (state.contextual ? " · chapter route" : "");
      if(state.active) b.setAttribute("aria-current","step");
      b.disabled=!state.contextual && !session.fullCaseExploration;
      b.addEventListener("click",()=>{
        if(!session) return;
        session=openTarget(session,FIVE_CASE_ATLAS,"STATE",state.stateId);
        render();
      });
      li.append(marker,b);
      ol.append(li);

      const edges=model.timeline.edges.filter(e=>e.fromStateId===state.stateId);
      for(const edge of edges){
        const edgeLi=document.createElement("li");
        const arrow=document.createElement("span");
        arrow.textContent="↓";
        const eb=document.createElement("button");
        eb.type="button";
        eb.textContent=`${edge.transitionId}${edge.contextual ? " · chapter route" : ""}`;
        if(edge.active) eb.setAttribute("aria-current","step");
        eb.disabled=!edge.contextual && !session.fullCaseExploration;
        eb.addEventListener("click",()=>{
          if(!session) return;
          session=openTarget(session,FIVE_CASE_ATLAS,"TRANSITION",edge.transitionId);
          render();
        });
        edgeLi.append(arrow,eb);
        ol.append(edgeLi);
      }
    }
    aside.append(h,ol);
    return aside;
  };

  const renderWorkspace=()=>{
    if(!session) return;
    const model=buildReaderPanel(session,FIVE_CASE_ATLAS);
    const shell=document.createElement("div");
    shell.className="fsp-reader";

    const style=document.createElement("style");
    style.textContent=CSS;

    const top=document.createElement("header");
    top.className="fsp-reader__top";
    const brandWrap=document.createElement("div");
    if(options.publicBackHref){
      const crumb=document.createElement("a");
      crumb.className="fsp-reader__crumb";
      crumb.href=options.publicBackHref;
      crumb.textContent=options.publicBackLabel ?? "← Back to Encyclopedia";
      brandWrap.append(crumb);
    }
    const brand=document.createElement("div");
    brand.className="fsp-reader__brand";
    brand.textContent="FSP Inquiry Atlas";
    brandWrap.append(brand);
    const origin=document.createElement("div");
    origin.className="fsp-reader__origin";
    origin.textContent=`Entered from ${session.origin.sectionId} · ${session.fullCaseExploration ? "full-case exploration" : "chapter aperture"}`;
    top.append(brandWrap,origin);

    const layout=document.createElement("div");
    layout.className="fsp-reader__workspace";
    const main=document.createElement("main");
    main.tabIndex=-1;

    const eyebrow=document.createElement("div");
    eyebrow.className="fsp-reader__eyebrow";
    eyebrow.textContent=model.eyebrow;
    const title=document.createElement("h1");
    title.textContent=model.title;
    const lede=document.createElement("p");
    lede.className="fsp-reader__lede";
    lede.textContent=model.lede;
    main.append(eyebrow,title,lede);

    if(model.notice){
      const notice=document.createElement("p");
      notice.className="fsp-reader__notice";
      notice.textContent=model.notice;
      main.append(notice);
    }

    for(const section of model.sections){
      if(section.items.length===0) continue;
      const block=document.createElement("section");
      block.className="fsp-reader__section";
      const h=document.createElement("h2");
      h.textContent=section.heading;
      block.append(h,list(section.items));
      main.append(block);
    }

    const actions=document.createElement("div");
    actions.className="fsp-reader__actions";
    for(const action of model.actions.filter(a=>a.kind!=="RETURN")) actions.append(button(action,act));
    main.append(actions);

    const timeline=renderTimeline(model);
    layout.append(main);
    if(timeline) layout.append(timeline);

    const returnBar=document.createElement("div");
    returnBar.className="fsp-reader__return";
    const returnAction=model.actions.find(a=>a.kind==="RETURN") ?? {id:"return",label:"Return to reading",kind:"RETURN" as const};
    returnBar.append(button(returnAction,act));

    shell.append(style,top,layout,returnBar);
    root.replaceChildren(shell);
    main.focus({preventScroll:true});
  };

  const renderProse=()=>{
    const shell=document.createElement("div");
    shell.className="fsp-reader";
    const style=document.createElement("style");
    style.textContent=CSS;

    const article=document.createElement("article");
    article.className="fsp-reader__prose";
    article.id=anchorId;
    article.tabIndex=-1;
    const eyebrow=document.createElement("div");
    eyebrow.className="fsp-reader__eyebrow";
    eyebrow.textContent=`${proseModel.chapterId} · ${proseModel.sectionId}`;
    const h=document.createElement("h1");
    h.textContent=proseModel.title;
    const proseBlocks=prose.split(/\\n\\s*\\n/).map(x=>x.trim()).filter(Boolean);

    const inquiry=document.createElement("aside");
    inquiry.className="fsp-reader__inquiry-link";
    const label=document.createElement("strong");
    label.textContent="Case connection";
    const explain=document.createElement("p");
    explain.textContent=`Open the structured inquiry without leaving your place in the chapter. ${proseModel.caseTitle}`;
    const inspect=document.createElement("button");
    inspect.type="button";
    inspect.dataset.primary="true";
    inspect.textContent=proseModel.inspectLabel;
    inspect.addEventListener("click",()=>{
      session=enterCaseFromProse(
        options.sectionId,
        options.caseId,
        anchorId,
        window.scrollY,
        routeContext
      );
      render();
    });
    inquiry.append(label,explain,inspect);
    article.append(eyebrow,h);
    for(const paragraph of proseBlocks){ const p=document.createElement("p"); p.textContent=paragraph; article.append(p); }
    article.append(inquiry);
    shell.append(style,article);
    root.replaceChildren(shell);
  };

  const render=()=> session ? renderWorkspace() : renderProse();
  render();

  return {render,getSession:()=>session ? structuredClone(session) : null};
}
