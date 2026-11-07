
import {ReaderState,initialReaderState,navigate,back,openFailure,openToolFromFailure,openProbe,openSources,openClaimCeiling,validateRegistry} from "./encyclopediaProd3Model";

type AnyObj=Record<string,any>;
const esc=(s:any)=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c));

const CSS=`
:root{--ink:#172033;--muted:#667085;--line:#d8dee9;--soft:#eef2f8;--accent:#243b67;--danger:#8b2c2c}
*{box-sizing:border-box}body{margin:0;color:var(--ink);font:16px/1.62 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff}
button,a{font:inherit}button{cursor:pointer}.app{max-width:1240px;margin:auto;padding:1rem}.top{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:1rem}.top h1{margin:.1rem 0}.muted{color:var(--muted)}.layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:1.5rem;margin-top:1.25rem}.nav{position:sticky;top:1rem;align-self:start}.nav button{display:block;width:100%;text-align:left;border:0;background:transparent;padding:.55rem .65rem;border-radius:.45rem}.nav button:hover,.nav button:focus-visible{background:var(--soft)}.nav button[aria-current="page"]{background:var(--accent);color:#fff}.panel{border:1px solid var(--line);border-radius:.75rem;padding:1rem;margin:0 0 1rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:.8rem}.card{border:1px solid var(--line);border-radius:.65rem;padding:.85rem;background:#fff}.tag{display:inline-block;background:var(--soft);border-radius:999px;padding:.15rem .5rem;margin:.1rem .25rem .1rem 0;font-size:.82rem}.actions{display:flex;gap:.55rem;flex-wrap:wrap;margin:.75rem 0}.actions button,.nav .return{border:1px solid var(--accent);background:#fff;color:var(--accent);border-radius:.45rem;padding:.45rem .7rem}.actions .primary,.nav .return{background:var(--accent);color:#fff}.warning{border-left:4px solid var(--danger);padding-left:.8rem}.timeline{border-left:3px solid var(--line);margin-left:.4rem;padding-left:1rem}.timeline .state{margin:0 0 1rem}.source a{overflow-wrap:anywhere}.stack{font-size:.9rem;color:var(--muted)}:focus-visible{outline:3px solid #1f6feb;outline-offset:3px}
@media(max-width:760px){.layout{grid-template-columns:1fr}.nav{position:static}.top{display:block}.nav .group{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}
`;

async function loadRegistry():Promise<AnyObj>{
  const r=await fetch("./encyclopedia-registry.json",{cache:"no-store"});
  if(!r.ok)throw new Error("registry HTTP "+r.status);
  return r.json();
}
function mkButton(label:string,onClick:()=>void,primary=false){
  const b=document.createElement("button");b.type="button";b.textContent=label;if(primary)b.classList.add("primary");b.onclick=onClick;return b;
}

export async function mountProd3(root:HTMLElement){
  const registry=await loadRegistry();
  const validation=validateRegistry(registry);
  if(validation.length)throw new Error("registry validation failed: "+validation.join("; "));
  let state:ReaderState=initialReaderState();
  const byId=(collection:string,id:string)=>registry[collection].find((x:AnyObj)=>x.id===id);
  const go=(next:any)=>{state=navigate(state,next);render()};
  const goBack=()=>{state=back(state);render()};

  const renderNode=(main:HTMLElement,id:string)=>{
    const n=byId("nodes",id);if(!n)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(n.id)+' · '+esc(n.status)+'</div><h2>'+esc(n.title)+'</h2><p>'+esc(n.summary)+'</p><p><strong>Canonical claim:</strong> '+esc(n.canonicalClaim)+'</p></div>';
    const a=document.createElement("div");a.className="actions";
    for(const rid of n.relatedIds||[]){
      const kind=rid.startsWith("CT-T")?"TOOL":rid.startsWith("CT-F")?"FAILURE":"NODE";
      a.append(mkButton("Open "+rid,()=>go({kind,id:rid})));
    }
    for(const cid of n.claimCeilingIds||[])a.append(mkButton("Claim ceiling "+cid,()=>{state=openClaimCeiling(state,registry,cid);render()}));
    main.append(a);
    if(id==="CT-00"){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Reader entrances</h3>";
      const grid=document.createElement("div");grid.className="grid";
      [
        ["NODE","CT-01","Map, Argument, Judgment"],
        ["FAILURE","CT-F03","Failure Atlas"],
        ["CASE","CASE-SCI-02","Scientific Atlas"],
        ["TOOL","CT-T02","Tool Function"]
      ].forEach(([kind,objId,label])=>{
        const c=document.createElement("div");c.className="card";c.innerHTML="<strong>"+esc(label)+"</strong>";
        c.append(mkButton("Open",()=>go({kind,id:objId,caseId:kind==="CASE"?objId:undefined})));
        grid.append(c);
      });
      sec.append(grid);main.append(sec);
    }
  };

  const renderTool=(main:HTMLElement,id:string)=>{
    const t=byId("tools",id);if(!t)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(t.id)+' · TOOL</div><h2>'+esc(t.title)+'</h2><p><strong>Functional job:</strong> '+esc(t.function)+'</p><p><strong>Canonical question:</strong> '+esc(t.question)+'</p><p><strong>Claim ceiling:</strong> '+esc(t.claimCeiling)+'</p><p><strong>Historical projection:</strong> '+esc(t.projection)+'</p><p><strong>Case projection:</strong> '+esc(t.caseProjection)+'</p></div>';
    const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Failure modes this Tool can expose</h3>";
    const a=document.createElement("div");a.className="actions";
    for(const fid of t.failureIds)a.append(mkButton(fid,()=>{state=openFailure(state,fid);render()}));
    sec.append(a);main.append(sec);
  };

  const renderFailure=(main:HTMLElement,id:string)=>{
    const f=byId("failures",id);if(!f)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(f.id)+' · FAILURE ATLAS</div><h2>'+esc(f.title)+'</h2><p><strong>Symptom:</strong> '+esc(f.symptom)+'</p><p><strong>Diagnostic question:</strong> '+esc(f.diagnosticQuestion)+'</p></div>';
    const a=document.createElement("div");a.className="actions";
    a.append(mkButton("Open primary Tool: "+f.primaryToolId,()=>{
      if(f.primaryToolId==="FSP-C05")go({kind:"NODE",id:"FSP-C05"});
      else{state=openToolFromFailure(state,registry,id);render()}
    },true));
    for(const tid of f.secondaryToolIds)a.append(mkButton("Also inspect "+tid,()=>go({kind:"TOOL",id:tid})));
    a.append(mkButton("Claim ceiling",()=>{state=openClaimCeiling(state,registry,f.claimCeilingId);render()}));
    main.append(a);
  };

  const renderCase=(main:HTMLElement,id:string)=>{
    const c=byId("cases",id);if(!c)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(c.id)+' · '+esc(c.status)+'</div><h2>'+esc(c.title)+'</h2><p><strong>Inquiry question:</strong> '+esc(c.question)+'</p><p>'+esc(c.summary)+'</p><p><strong>Role:</strong> '+esc(c.role)+'</p></div>';
    const tl=document.createElement("section");tl.className="panel";tl.innerHTML="<h3>State timeline</h3>";
    const line=document.createElement("div");line.className="timeline";
    for(const s of c.states){const d=document.createElement("div");d.className="state";d.innerHTML="<strong>"+esc(s.id)+" · "+esc(s.label)+"</strong><p>"+esc(s.text)+"</p>";line.append(d)}
    tl.append(line);main.append(tl);
    const tr=document.createElement("section");tr.className="panel";tr.innerHTML="<h3>Transitions</h3><ul>"+c.transitions.map((x:AnyObj)=>"<li><strong>"+esc(x.id)+"</strong> — "+esc(x.label)+"</li>").join("")+"</ul>";main.append(tr);
    const a=document.createElement("div");a.className="actions";
    for(const p of c.probes)a.append(mkButton("Probe: "+p.title,()=>{state=openProbe(state,registry,id,p.id);render()}));
    a.append(mkButton("Source ledger",()=>{state=openSources(state,registry,id);render()}));
    for(const ce of c.claimCeilingIds)a.append(mkButton("Claim ceiling "+ce,()=>{state=openClaimCeiling(state,registry,ce,id);render()}));
    main.append(a);
  };

  const renderProbe=(main:HTMLElement,caseId:string|undefined,probeId:string)=>{
    const c=byId("cases",caseId||"");const p=c?.probes.find((x:AnyObj)=>x.id===probeId);if(!p)return renderMissing(main,probeId);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(c.title)+' · CONTROLLED PROBE</div><h2>'+esc(p.title)+'</h2><p>'+esc(p.prompt)+'</p><p class="warning"><strong>Firewall:</strong> '+esc(p.firewall)+'</p></div>';
    const a=document.createElement("div");a.className="actions";a.append(mkButton("Inspect case sources",()=>{state=openSources(state,registry,c.id);render()}));main.append(a);
  };

  const renderSources=(main:HTMLElement,caseId:string)=>{
    const c=byId("cases",caseId);if(!c)return renderMissing(main,caseId);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(c.id)+' · SOURCE LEDGER</div><h2>'+esc(c.title)+'</h2><p><strong>Ledger status:</strong> '+esc(c.sourceStatus)+'</p></div>';
    const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Sources</h3>";
    if(!c.sourceIds.length){const p=document.createElement("p");p.className="warning";p.textContent="Full source ledger is explicitly pending. No placeholder source has been invented.";sec.append(p)}
    for(const sid of c.sourceIds){const s=byId("sources",sid);const d=document.createElement("div");d.className="card source";d.innerHTML='<strong>'+esc(s.kind)+' · '+esc(s.title)+'</strong><p>'+esc(s.supports)+'</p><a href="'+esc(s.url)+'" target="_blank" rel="noopener">Open source</a>';sec.append(d)}
    main.append(sec);
  };

  const renderCeiling=(main:HTMLElement,id:string,caseId?:string)=>{
    const c=byId("claimCeilings",id);if(!c)return renderMissing(main,id);
    const applied=caseId?'<p>Applied here to <strong>'+esc(byId("cases",caseId)?.title||caseId)+'</strong>.</p>':"";
    main.innerHTML='<div class="panel"><div class="muted">'+esc(c.id)+' · CLAIM CEILING</div><h2>'+esc(c.title)+'</h2><p class="warning"><strong>'+esc(c.text)+'</strong></p>'+applied+'</div>';
  };

  const renderMissing=(main:HTMLElement,id:string)=>{main.innerHTML='<div class="panel warning"><h2>Unknown registry object</h2><p>'+esc(id)+'</p></div>'};

  const render=()=>{
    root.replaceChildren();
    const app=document.createElement("div");app.className="app";
    const style=document.createElement("style");style.textContent=CSS;
    const header=document.createElement("header");header.className="top";header.innerHTML='<div><div class="muted">FSP-ENCYCLOPEDIA-PROD-3</div><h1>FSP Encyclopedia</h1><div class="muted">Narrative ↔ Inquiry Structure ↔ Audit</div></div><div class="stack">Return depth: '+state.stack.length+'</div>';
    const layout=document.createElement("div");layout.className="layout";
    const nav=document.createElement("nav");nav.className="nav";nav.setAttribute("aria-label","Encyclopedia navigation");
    const group=document.createElement("div");group.className="group";
    [
      ["NODE","CT-00","Home / Critical Thinking"],
      ["NODE","FSP-C01","FSP Constitution"],
      ["FAILURE","CT-F01","Failure Atlas"],
      ["CASE","CASE-SCI-01","Scientific Atlas"],
      ["TOOL","CT-T01","Twelve Tools"]
    ].forEach(([kind,id,label])=>{
      const b=mkButton(label,()=>go({kind,id,caseId:kind==="CASE"?id:undefined}));
      if(state.current.kind===kind&&state.current.id===id)b.setAttribute("aria-current","page");
      group.append(b);
    });
    nav.append(group);
    if(state.stack.length){const rb=mkButton("← Return to prior context",goBack,true);rb.classList.add("return");nav.append(rb)}
    const main=document.createElement("main");main.tabIndex=-1;
    switch(state.current.kind){
      case "NODE":renderNode(main,state.current.id);break;
      case "TOOL":renderTool(main,state.current.id);break;
      case "FAILURE":renderFailure(main,state.current.id);break;
      case "CASE":renderCase(main,state.current.id);break;
      case "PROBE":renderProbe(main,state.current.caseId,state.current.id);break;
      case "SOURCES":renderSources(main,state.current.id);break;
      case "CLAIM_CEILING":renderCeiling(main,state.current.id,state.current.caseId);break;
    }
    layout.append(nav,main);app.append(style,header,layout);root.append(app);main.focus({preventScroll:true});
  };
  render();
  return{getState:()=>JSON.parse(JSON.stringify(state)),getRegistry:()=>JSON.parse(JSON.stringify(registry)),render};
}
