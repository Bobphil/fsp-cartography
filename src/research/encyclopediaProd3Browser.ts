
import {ReaderState,RegistryLike,initialReaderState,navigate,back,openFailure,openToolFromFailure,openProbe,openSources,openClaimCeiling,validateRegistry} from "./encyclopediaProd3Model";
import {DOMAIN_PUBLIC_NAV,PUBLIC_RESEARCH_RESOURCES} from "./fspEncyclopediaDomainNav";
import {FIREWALL_PROVENANCE,evidenceLabels,provenanceEntry,validateFirewallProvenance} from "./fspFirewallToolProvenanceReader";
import {TRANSFORMATION_OBSERVATORY_CASES,observatoryCase,transitionFor,possibilityDelta} from "./transformationObservatory";
import {WorkbenchInquiry,blankWorkbenchInquiry,addWorkbenchState,addWorkbenchTransition,removeLastWorkbenchState,removeLastWorkbenchTransition,updateWorkbenchInquiry,workbenchTransitionReadout,validateWorkbenchInquiry,exportWorkbenchInquiry,parseList} from "./transformationWorkbench";

type AnyObj=Record<string,any>;
const esc=(s:any)=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c));

const CSS=`
:root{--ink:#172033;--muted:#667085;--line:#d8dee9;--soft:#eef2f8;--accent:#243b67;--danger:#8b2c2c}
*{box-sizing:border-box}body{margin:0;color:var(--ink);font:16px/1.62 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff}
button,a{font:inherit}button{cursor:pointer}.app{max-width:1240px;margin:auto;padding:1rem}.top{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:1rem}.top h1{margin:.1rem 0}.muted{color:var(--muted)}.layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:1.5rem;margin-top:1.25rem}.nav{position:sticky;top:1rem;align-self:start}.nav button{display:block;width:100%;text-align:left;border:0;background:transparent;padding:.55rem .65rem;border-radius:.45rem}.nav button:hover,.nav button:focus-visible{background:var(--soft)}.nav button[aria-current="page"]{background:var(--accent);color:#fff}.panel{border:1px solid var(--line);border-radius:.75rem;padding:1rem;margin:0 0 1rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:.8rem}.card{border:1px solid var(--line);border-radius:.65rem;padding:.85rem;background:#fff}.tag{display:inline-block;background:var(--soft);border-radius:999px;padding:.15rem .5rem;margin:.1rem .25rem .1rem 0;font-size:.82rem}.actions{display:flex;gap:.55rem;flex-wrap:wrap;margin:.75rem 0}.actions button,.nav .return{border:1px solid var(--accent);background:#fff;color:var(--accent);border-radius:.45rem;padding:.45rem .7rem}.actions .primary,.nav .return{background:var(--accent);color:#fff}.warning{border-left:4px solid var(--danger);padding-left:.8rem}.timeline{border-left:3px solid var(--line);margin-left:.4rem;padding-left:1rem}.timeline .state{margin:0 0 1rem}.source a{overflow-wrap:anywhere}.stack{font-size:.9rem;color:var(--muted)}:focus-visible{outline:3px solid #1f6feb;outline-offset:3px}
.obs-tabs{display:flex;gap:.45rem;flex-wrap:wrap;margin:.7rem 0 1rem}.obs-tabs button[aria-current="page"]{background:var(--accent);color:#fff}.obs-timeline{display:flex;gap:.45rem;align-items:stretch;overflow-x:auto;padding:.5rem 0 1rem}.obs-state{min-width:185px;flex:1;border:1px solid var(--line);border-radius:.65rem;padding:.75rem;background:#fff}.obs-arrow{align-self:center;min-width:135px;border:1px solid var(--accent);background:var(--soft);color:var(--accent);border-radius:.5rem;padding:.55rem}.obs-arrow[aria-pressed="true"]{background:var(--accent);color:#fff}.obs-status{font-weight:700}.obs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.7rem}.obs-list{margin:.35rem 0;padding-left:1.25rem}.obs-ceiling{border-left:4px solid var(--danger);padding-left:.8rem}.workbench-form label{display:block;margin:.75rem 0}.workbench-form input,.workbench-form textarea,.workbench-form select{width:100%;padding:.55rem;border:1px solid var(--line);border-radius:.4rem;font:inherit}.workbench-form textarea{min-height:82px}.workbench-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin:.75rem 0}.workbench-output{white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9rem;background:var(--soft);padding:.75rem;border-radius:.5rem;overflow:auto}@media(max-width:760px){.layout{grid-template-columns:1fr}.nav{position:static}.top{display:block}.nav .group{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}
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
  const registry=await loadRegistry() as AnyObj & RegistryLike;
  const validation=validateRegistry(registry);
  if(validation.length)throw new Error("registry validation failed: "+validation.join("; "));
  let state:ReaderState=initialReaderState();
  const byId=(collection:string,id:string)=>registry[collection].find((x:AnyObj)=>x.id===id);
  const go=(next:any)=>{state=navigate(state,next);render()};
  const goBack=()=>{state=back(state);render()};

  const renderFirewallIndex=(main:HTMLElement)=>{
    const failures=validateFirewallProvenance();
    if(failures.length) throw new Error("Firewall provenance validation failed: "+failures.join("; "));
    main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · FIREWALL PROVENANCE</div><h2>Why the gates exist</h2><p>Each Firewall records a transition that inquiry has learned not to cross silently. A Firewall is not normally a prohibition: it identifies the additional warrant, evidence, standing, or licensing argument needed to pass responsibly.</p><p class="warning"><strong>Firewall ≠ prohibition. You may cross, but show the license.</strong></p></div>';
    const intro=document.createElement("section");intro.className="panel";intro.innerHTML="<h3>How to read this registry</h3><p>Open a Firewall to follow its recurrent failure, historical lineage, positive crossing warrant, Tool, worked cases, formal implementation, evidence state, claim ceiling, failure conditions, and REOPEN triggers.</p><p class=\"muted\">Evidence states: H historical recurrence · C FSP reconstruction · K worked case · X executable/formal implementation · P protocol-ready human test · E external empirical support.</p>";main.append(intro);
    const grid=document.createElement("div");grid.className="grid";
    for(const fw of FIREWALL_PROVENANCE){
      const c=document.createElement("article");c.className="card";
      c.innerHTML="<div class=\"muted\">"+esc(fw.key)+"</div><strong>"+esc(fw.label)+"</strong><p>"+esc(fw.recurrentFailure)+"</p><div>"+fw.evidence.map(x=>"<span class=\"tag\">"+esc(x)+"</span>").join("")+"</div>";
      c.append(mkButton("Open provenance",()=>go({kind:"NODE",id:fw.key})));
      grid.append(c);
    }
    main.append(grid);
  };

  const appendList=(parent:HTMLElement,heading:string,items:string[])=>{
    const sec=document.createElement("section");sec.className="panel";sec.append(Object.assign(document.createElement("h3"),{textContent:heading}));
    const ul=document.createElement("ul");for(const item of items){const li=document.createElement("li");li.textContent=item;ul.append(li)}sec.append(ul);parent.append(sec);
  };

  const renderFirewallProvenance=(main:HTMLElement,key:string)=>{
    const fw=provenanceEntry(key);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(fw.key)+' · FIREWALL PROVENANCE</div><h2>'+esc(fw.label)+'</h2><p><strong>Protected transition:</strong> '+esc(fw.protectedTransition)+'</p><p><strong>Why this gate exists:</strong> '+esc(fw.recurrentFailure)+'</p></div>';
    appendList(main,"Historical / disciplinary lineage",fw.lineage);
    appendList(main,"Positive crossing warrant",fw.crossingWarrant);
    const tool=document.createElement("section");tool.className="panel";tool.innerHTML="<h3>Associated Tool</h3><p><strong>"+esc(fw.tool)+"</strong></p>";main.append(tool);
    appendList(main,"Worked cases",fw.cases);
    appendList(main,"Formal implementation",fw.formalImplementation);
    appendList(main,"Evidence state",evidenceLabels(fw));
    const ceiling=document.createElement("section");ceiling.className="panel";ceiling.innerHTML="<h3>Claim ceiling</h3><p class=\"warning\"><strong>"+esc(fw.claimCeiling)+"</strong></p>";main.append(ceiling);
    appendList(main,"What would count against this formulation",fw.failureConditions);
    appendList(main,"REOPEN if",fw.reopenTriggers);
    appendList(main,"Canonical sources",fw.canonicalSources);
    const ret=document.createElement("section");ret.className="panel";ret.innerHTML="<h3>Return</h3><p>Return to the case, Tool, chapter, or domain that made this gate relevant. The provenance route deepens inspection; it does not replace the originating inquiry.</p>";
    const a=document.createElement("div");a.className="actions";a.append(mkButton("← All Firewalls",()=>go({kind:"NODE",id:"FSP-FIREWALLS"}),true),mkButton("FSP Constitution",()=>go({kind:"NODE",id:"FSP-CONSTITUTION"})),mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"})));ret.append(a);main.append(ret);
  };

  const renderTransformationGuide=(main:HTMLElement)=>{
    main.innerHTML='<section class="panel"><div class="muted">TRANSFORMATION OBSERVATORY · GUIDE</div><h2>What this is—and how to benefit from using it</h2><p>The current Transformation Observatory is a <strong>guided interactive reader</strong>. It does not yet take any question and automatically analyze it for you. Instead, it lets you explore four worked cases and learn how FSP makes change visible by separating states, transitions, evidence, assumptions, consequences, claim ceilings, and REOPEN conditions.</p><p class="warning"><strong>Use the Guided Pilot to learn how to inspect a transformation. Use the Workbench to build your own map.</strong></p></section>';

    const sections=[
      ["1. Start with a case that resembles your question","Choose the worked case closest to the kind of change you care about. Maternal effects help with transmission across generations; climate plasticity helps with environment→response→population questions; mate choice helps with signal→preference→long-run divergence; the psychedelic case helps with acute state→meaning→durable change."],
      ["2. Read the timeline as a proposed explanation","The boxes are bounded states. The arrows are not facts merely because they are drawn. Each arrow is a claim that one state is connected to the next in some specific way."],
      ["3. Click the arrow","The Bridge Inspector shows the relation being claimed, the evidence supporting it, the assumptions carrying the inference, the bridge burden, what remains unresolved, the claim ceiling, and what would REOPEN the judgment."],
      ["4. Look for the weak transition","The most useful part of a case is often the arrow carrying the most assumptions or the largest jump in scale. That is where a new measurement, comparison, or experiment may be most valuable."],
      ["5. Use Possibility Change","Opened, Closed, and Retained possibilities show how a transformation changes what can happen next. These are bounded descriptions, not exhaustive maps of the world."],
      ["6. Use Agents & Access","Ask who can observe what directly, what is mediated through instruments or testimony, and what remains unavailable. Different access does not automatically mean error, and one access route does not replace every other."],
      ["7. Check consequences at several scales","A change can help at one scale and harm at another. The Observatory therefore keeps organism, offspring, population, social, personal, or other consequences distinct."],
      ["8. Finish with REOPEN","The last readout gives the current bounded judgment, the strongest claim the case licenses, and the evidence that should make you reconsider it. REOPEN turns uncertainty into a next inquiry step."],
      ["9. Take the method to your own question","After exploring a case, open the Workbench. Enter your own question, add the states you think matter, connect them with transitions, and fill in evidence, assumptions, alternatives, claim ceilings, and REOPEN conditions. The Workbench does not decide the map for you; it helps you make your map inspectable."],
      ["10. Scale up by linking smaller inquiries","Do not begin with an entire ecosystem, organization, or lifetime. Start with one important transition. When that is clear, create another bounded map whose starting state is the previous map's outcome. Explanation grows by linked inspectable transitions rather than one enormous diagram."]
    ];
    for(const [title,body] of sections){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>"+esc(title)+"</h3><p>"+esc(body)+"</p>";main.append(sec);
    }
    const close=document.createElement("section");close.className="panel";
    close.innerHTML='<h3>The habit the Observatory is meant to teach</h3><p><strong>Show the states. Inspect the arrows. Check the evidence. Expose the assumptions. Follow the consequences. Bound the conclusion. Say what would make you reconsider.</strong></p><p>That is enough to make many difficult questions clearer even before new data are collected.</p>';
    const a=document.createElement("div");a.className="actions";a.append(mkButton("Open Guided Pilot",()=>go({kind:"NODE",id:"FSP-TRANSFORMATION-OBSERVATORY"}),true),mkButton("Bring your own question",()=>go({kind:"NODE",id:"FSP-TRANSFORMATION-WORKBENCH"})));close.append(a);main.append(close);
  };

  const renderTransformationWorkbench=(main:HTMLElement)=>{
    const key="fsp-transformation-workbench-v0";
    let inquiry:WorkbenchInquiry=blankWorkbenchInquiry("");
    try{const stored=window.localStorage.getItem(key);if(stored)inquiry=JSON.parse(stored)}catch{}
    let selectedTransitionId=inquiry.transitions[0]?.id||"";

    const save=()=>{try{window.localStorage.setItem(key,JSON.stringify(inquiry))}catch{}};
    const field=(label:string,el:HTMLElement)=>{const wrap=document.createElement("label");const strong=document.createElement("strong");strong.textContent=label;wrap.append(strong,el);return wrap};
    const input=(value="")=>{const x=document.createElement("input");x.value=value;return x};
    const area=(value="")=>{const x=document.createElement("textarea");x.value=value;return x};

    const paint=()=>{
      main.replaceChildren();
      const intro=document.createElement("section");intro.className="panel";
      intro.innerHTML='<div class="muted">TRANSFORMATION OBSERVATORY · WORKBENCH V0</div><h2>Bring your own question</h2><p>This version lets you build and inspect your own transformation map. It does <strong>not</strong> automatically infer states or explanations from your question. You supply the proposed map; the Workbench makes its transitions inspectable and preserves claim ceilings and REOPEN.</p><p class="warning"><strong>Your map ≠ the world. A transition you enter ≠ a validated explanation.</strong></p>';
      const ia=document.createElement("div");ia.className="actions";ia.append(mkButton("How to use the Observatory",()=>go({kind:"NODE",id:"FSP-TRANSFORMATION-OBSERVATORY-GUIDE"})));intro.append(ia);main.append(intro);

      const qsec=document.createElement("section");qsec.className="panel workbench-form";qsec.innerHTML="<h3>1. Bound the inquiry</h3>";
      const title=input(inquiry.title),question=area(inquiry.question);
      qsec.append(field("Map title",title),field("What transformation are you trying to understand?",question));
      const qsave=mkButton("Save inquiry boundary",()=>{inquiry=updateWorkbenchInquiry(inquiry,{title:title.value,question:question.value});save();paint()},true);qsec.append(qsave);main.append(qsec);

      const ssec=document.createElement("section");ssec.className="panel workbench-form";ssec.innerHTML="<h3>2. Add states</h3><p class=\"muted\">Use a bounded description of what the system is like before, during, or after a change. Two states are enough to begin.</p>";
      const slabel=input(),ssummary=area(),sposs=area();sposs.placeholder="One possibility per line, or separate with semicolons";
      ssec.append(field("State label",slabel),field("State description",ssummary),field("Possibilities available in this state",sposs));
      const sa=document.createElement("div");sa.className="workbench-actions";
      sa.append(mkButton("Add state",()=>{inquiry=addWorkbenchState(inquiry,slabel.value,ssummary.value,parseList(sposs.value));save();paint()},true),mkButton("Remove last state",()=>{inquiry=removeLastWorkbenchState(inquiry);selectedTransitionId=inquiry.transitions[0]?.id||"";save();paint()}));ssec.append(sa);
      if(inquiry.states.length){
        const row=document.createElement("div");row.className="obs-timeline";
        inquiry.states.forEach(st=>{const c=document.createElement("div");c.className="obs-state";c.innerHTML="<div class=\"muted\">"+esc(st.id)+"</div><strong>"+esc(st.label)+"</strong><p>"+esc(st.summary)+"</p>";row.append(c)});ssec.append(row);
      }
      main.append(ssec);

      const tsec=document.createElement("section");tsec.className="panel workbench-form";tsec.innerHTML="<h3>3. Connect two states</h3><p class=\"muted\">The arrow is a claim. Make the evidence, assumptions, alternatives, ceiling, and REOPEN condition visible.</p>";
      if(inquiry.states.length>=2){
        const from=document.createElement("select"),to=document.createElement("select");
        for(const st of inquiry.states){for(const sel of [from,to]){const o=document.createElement("option");o.value=st.id;o.textContent=st.id+" · "+st.label;sel.append(o)}}
        to.selectedIndex=Math.min(1,to.options.length-1);
        const label=input(),relation=input(),evidence=area(),assumptions=area(),alternatives=area(),remainder=area(),ceiling=area(),reopen=area();
        relation.placeholder="e.g. causes, enables, constrains, correlates, transmits";
        tsec.append(field("From",from),field("To",to),field("What change does this arrow claim?",label),field("Relation type",relation),field("Evidence",evidence),field("Assumptions",assumptions),field("Competing explanations / alternatives",alternatives),field("What remains unresolved?",remainder),field("Claim ceiling",ceiling),field("What would REOPEN this transition?",reopen));
        const ta=document.createElement("div");ta.className="workbench-actions";
        ta.append(mkButton("Add transition",()=>{inquiry=addWorkbenchTransition(inquiry,{from:from.value,to:to.value,label:label.value,relation:relation.value,evidence:parseList(evidence.value),assumptions:parseList(assumptions.value),alternatives:parseList(alternatives.value),remainder:parseList(remainder.value),claimCeiling:ceiling.value,reopen:parseList(reopen.value)});selectedTransitionId=inquiry.transitions[inquiry.transitions.length-1].id;save();paint()},true),mkButton("Remove last transition",()=>{inquiry=removeLastWorkbenchTransition(inquiry);selectedTransitionId=inquiry.transitions[0]?.id||"";save();paint()}));
        tsec.append(ta);
      }else{
        const p=document.createElement("p");p.className="warning";p.textContent="Add at least two states before creating a transition.";tsec.append(p);
      }
      main.append(tsec);

      if(inquiry.transitions.length){
        const isec=document.createElement("section");isec.className="panel";isec.innerHTML="<h3>4. Inspect a transition</h3>";
        const buttons=document.createElement("div");buttons.className="obs-tabs";
        for(const t of inquiry.transitions){const b=mkButton(t.id+" · "+t.label,()=>{selectedTransitionId=t.id;paint()});b.setAttribute("aria-current",selectedTransitionId===t.id?"page":"false");buttons.append(b)}isec.append(buttons);
        if(!inquiry.transitions.some(t=>t.id===selectedTransitionId))selectedTransitionId=inquiry.transitions[0].id;
        const r=workbenchTransitionReadout(inquiry,selectedTransitionId);
        const t=r.transition;
        const head=document.createElement("div");head.className="card";head.innerHTML="<strong>"+esc(r.from.label)+" → "+esc(r.to.label)+"</strong><p>"+esc(t.label)+"</p><p><strong>Relation:</strong> "+esc(t.relation||"Not specified")+"</p>";isec.append(head);
        const grid=document.createElement("div");grid.className="obs-grid";
        const blocks:[string,string[]][]=[["Evidence",t.evidence],["Assumptions",t.assumptions],["Alternatives",t.alternatives],["Remainder",t.remainder],["REOPEN",t.reopen],["Opened possibilities",r.possibilityDelta.opened],["Closed possibilities",r.possibilityDelta.closed]];
        for(const [name,items] of blocks){const c=document.createElement("div");c.className="card";c.innerHTML="<strong>"+esc(name)+"</strong>"+(items.length?"<ul>"+items.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>":"<p class=\"muted\">None recorded.</p>");grid.append(c)}isec.append(grid);
        const cp=document.createElement("p");cp.className="obs-ceiling";cp.innerHTML="<strong>Claim ceiling:</strong> "+esc(t.claimCeiling||"Not yet recorded.");isec.append(cp);main.append(isec);
      }

      const rsec=document.createElement("section");rsec.className="panel workbench-form";rsec.innerHTML="<h3>5. Return / REOPEN the whole inquiry</h3>";
      const judgment=area(inquiry.currentJudgment),globalCeiling=area(inquiry.globalClaimCeiling),globalReopen=area(inquiry.reopenPrompt.join("\n"));
      rsec.append(field("Current bounded judgment",judgment),field("Overall claim ceiling",globalCeiling),field("What would REOPEN the inquiry?",globalReopen));
      const ra=document.createElement("div");ra.className="workbench-actions";
      ra.append(mkButton("Save Return",()=>{inquiry=updateWorkbenchInquiry(inquiry,{currentJudgment:judgment.value,globalClaimCeiling:globalCeiling.value,reopenPrompt:parseList(globalReopen.value)});save();paint()},true),mkButton("Reset Workbench",()=>{inquiry=blankWorkbenchInquiry("");selectedTransitionId="";save();paint()}));
      rsec.append(ra);main.append(rsec);

      const v=validateWorkbenchInquiry(inquiry);
      const out=document.createElement("section");out.className="panel";
      out.innerHTML="<h3>6. Readout / export</h3>"+(v.length?"<p class=\"warning\"><strong>Map still needs work:</strong></p><ul>"+v.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>":"<p><strong>Minimum structural checks pass.</strong> This means the map is inspectable—not that its claims are true.</p>");
      const pre=document.createElement("pre");pre.className="workbench-output";pre.textContent=exportWorkbenchInquiry(inquiry);out.append(pre);main.append(out);
    };
    paint();
  };

  const renderTransformationObservatory=(main:HTMLElement)=>{
    let selectedCaseId=TRANSFORMATION_OBSERVATORY_CASES[0].id;
    let selectedTransitionId=TRANSFORMATION_OBSERVATORY_CASES[0].transitions[0].id;
    let selectedTab:"TIMELINE"|"ACCESS"|"POSSIBILITY"|"CONSEQUENCES"|"REOPEN"="TIMELINE";

    const paint=()=>{
      const c=observatoryCase(selectedCaseId);
      if(!c.transitions.some(t=>t.id===selectedTransitionId)) selectedTransitionId=c.transitions[0].id;
      const t=transitionFor(selectedCaseId,selectedTransitionId);
      const delta=possibilityDelta(selectedCaseId,selectedTransitionId);
      main.replaceChildren();

      const intro=document.createElement("section");intro.className="panel";
      intro.innerHTML='<div class="muted">FSP · TRANSFORMATION OBSERVATORY · GUIDED PILOT</div><h2>See transformations instead of hiding them inside conclusions</h2><p>This Guided Pilot contains four worked cases. Choose a case, follow the state timeline, and click any transition arrow to inspect what licenses the move, what changed in the possibility space, what consequences appear at different scales, and what would REOPEN the judgment.</p><p class="warning"><strong>This Guided Pilot does not automatically analyze a question you type. Shared relation grammar ≠ shared ontology.</strong></p>';
      const introActions=document.createElement("div");introActions.className="actions";introActions.append(mkButton("What this is / How to benefit",()=>go({kind:"NODE",id:"FSP-TRANSFORMATION-OBSERVATORY-GUIDE"}),true),mkButton("Bring your own question",()=>go({kind:"NODE",id:"FSP-TRANSFORMATION-WORKBENCH"})));intro.append(introActions);
      main.append(intro);

      const selector=document.createElement("section");selector.className="panel";
      const h=document.createElement("h3");h.textContent="Four-case pilot";selector.append(h);
      const buttons=document.createElement("div");buttons.className="obs-tabs";
      for(const item of TRANSFORMATION_OBSERVATORY_CASES){
        const b=mkButton(item.title,()=>{selectedCaseId=item.id;selectedTransitionId=item.transitions[0].id;selectedTab="TIMELINE";paint()});
        b.setAttribute("aria-current",item.id===selectedCaseId?"page":"false");
        buttons.append(b);
      }
      selector.append(buttons);
      const q=document.createElement("p");q.innerHTML="<strong>Inquiry question:</strong> "+esc(c.question);selector.append(q);
      const summary=document.createElement("p");summary.textContent=c.summary;selector.append(summary);
      main.append(selector);

      const tabs=document.createElement("div");tabs.className="obs-tabs";
      const tabDefs:[typeof selectedTab,string][]=[
        ["TIMELINE","Timeline + Bridge"],
        ["ACCESS","Agents & Access"],
        ["POSSIBILITY","Possibility Change"],
        ["CONSEQUENCES","Consequences"],
        ["REOPEN","REOPEN"]
      ];
      for(const [tab,label] of tabDefs){
        const b=mkButton(label,()=>{selectedTab=tab;paint()});
        b.setAttribute("aria-current",selectedTab===tab?"page":"false");
        tabs.append(b);
      }
      main.append(tabs);

      if(selectedTab==="TIMELINE"){
        const timeline=document.createElement("section");timeline.className="panel";
        timeline.innerHTML="<h3>Case timeline</h3><p class=\"muted\">States are bounded descriptions. Arrows are claims that require evidence and assumptions.</p>";
        const row=document.createElement("div");row.className="obs-timeline";
        c.states.forEach((st,index)=>{
          const box=document.createElement("div");box.className="obs-state";
          box.innerHTML="<div class=\"muted\">"+esc(st.id)+"</div><strong>"+esc(st.label)+"</strong><p>"+esc(st.summary)+"</p>";
          row.append(box);
          if(index<c.transitions.length){
            const tr=c.transitions[index];
            const a=mkButton("→ "+tr.label,()=>{selectedTransitionId=tr.id;paint()});
            a.classList.add("obs-arrow");a.setAttribute("aria-pressed",tr.id===selectedTransitionId?"true":"false");row.append(a);
          }
        });
        timeline.append(row);main.append(timeline);

        const inspector=document.createElement("section");inspector.className="panel";
        inspector.innerHTML="<div class=\"muted\">"+esc(t.id)+" · BRIDGE INSPECTOR</div><h3>"+esc(t.label)+"</h3><p><strong>Relation:</strong> "+esc(t.relation)+"</p><p><strong>Bridge burden:</strong> "+esc(t.bridgeBurden)+"</p>";
        const grid=document.createElement("div");grid.className="obs-grid";
        const cols:[string,string[]][]=[["Evidence",t.evidence],["Assumptions",t.assumptions],["Remainder",t.remainder],["REOPEN",t.reopen]];
        for(const [label,items] of cols){const card=document.createElement("div");card.className="card";card.innerHTML="<strong>"+esc(label)+"</strong><ul class=\"obs-list\">"+items.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>";grid.append(card)}
        inspector.append(grid);
        const ceiling=document.createElement("p");ceiling.className="obs-ceiling";ceiling.innerHTML="<strong>Claim ceiling:</strong> "+esc(t.claimCeiling);inspector.append(ceiling);
        main.append(inspector);
      }

      if(selectedTab==="ACCESS"){
        const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Agents & Access</h3><p class=\"muted\">Who has access to what, by which route, and what remains unavailable?</p>";
        const grid=document.createElement("div");grid.className="obs-grid";
        for(const a of c.agents){
          const card=document.createElement("div");card.className="card";
          card.innerHTML="<strong>"+esc(a.actor)+"</strong><div class=\"muted\">"+esc(a.role)+"</div><p><strong>Accessible</strong></p><ul>"+a.accessible.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul><p><strong>Mediated</strong></p><ul>"+a.mediated.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul><p><strong>Not accessible</strong></p><ul>"+a.notAccessible.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>";
          grid.append(card);
        }
        sec.append(grid);main.append(sec);
      }

      if(selectedTab==="POSSIBILITY"){
        const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Possibility-space change</h3><p><strong>Selected transition:</strong> "+esc(t.label)+"</p><p class=\"muted\">Transformation is represented as a change in what becomes open, closed, or retained—not as automatic improvement.</p>";
        const grid=document.createElement("div");grid.className="obs-grid";
        for(const [label,items] of [["Opened",delta.opened],["Closed",delta.closed],["Retained",delta.retained]] as [string,string[]][]){
          const card=document.createElement("div");card.className="card";card.innerHTML="<strong>"+label+"</strong>"+(items.length?"<ul>"+items.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>":"<p class=\"muted\">None represented in this bounded model.</p>");grid.append(card);
        }
        sec.append(grid);main.append(sec);
      }

      if(selectedTab==="CONSEQUENCES"){
        const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Multi-scale consequences</h3><p class=\"muted\">A gain at one scale need not be a gain at every scale.</p>";
        const grid=document.createElement("div");grid.className="obs-grid";
        for(const x of c.consequences){const card=document.createElement("div");card.className="card";card.innerHTML="<div class=\"muted\">"+esc(x.scale)+"</div><strong>"+esc(x.status)+"</strong><p>"+esc(x.effect)+"</p>";grid.append(card)}
        sec.append(grid);main.append(sec);
      }

      if(selectedTab==="REOPEN"){
        const sec=document.createElement("section");sec.className="panel";
        sec.innerHTML="<h3>Return / REOPEN</h3><p><strong>Current bounded judgment:</strong> "+esc(c.currentJudgment)+"</p><p class=\"obs-ceiling\"><strong>Case claim ceiling:</strong> "+esc(c.globalClaimCeiling)+"</p><h4>What would change the judgment?</h4><ul>"+c.reopenPrompt.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul><p class=\"muted\">REOPEN is not rejection. It records the evidence or condition under which the current judgment should be revisited.</p>";
        main.append(sec);
      }
    };
    paint();
  };

  const renderNode=(main:HTMLElement,id:string)=>{
    if(id==="FSP-FIREWALLS"){renderFirewallIndex(main);return;}
    if(id==="FSP-TRANSFORMATION-OBSERVATORY"){renderTransformationObservatory(main);return;}
    if(id==="FSP-TRANSFORMATION-OBSERVATORY-GUIDE"){renderTransformationGuide(main);return;}
    if(id==="FSP-TRANSFORMATION-WORKBENCH"){renderTransformationWorkbench(main);return;}
    if(/^FW-\\d{2}$/.test(id)){renderFirewallProvenance(main,id);return;}
    if(id==="FSP-FULL-STACK-ESSAY"){
      main.innerHTML='<section class="panel"><div class="muted">PUBLIC ORIENTATION · WHY FULL-STACK?</div><h2>Why We Need a Full-Stack Philosophy</h2><p class="muted">Knowledge, difference, cooperation, and the problem of living well together.</p><p>We live with partial knowledge, highly specialized sciences, different moral and cultural worlds, and shared problems that do not wait for comprehensive agreement. FSP asks how we can understand enough to act responsibly together without pretending that every map, discipline, or worldview is the same.</p><p><strong>EXPERIENCE → INQUIRE → DECOMPRESS → LEARN → COMPARE → ACT → RETURN</strong></p><p class="warning"><strong>Better inquiry is not the final destination. It is part of the equipment for better governed Doing.</strong></p></section>';

      const cases=document.createElement("section");cases.className="panel";
      cases.innerHTML="<h3>Four human entrances</h3><p class=\"muted\">Begin with a recognizable problem. The deeper FSP architecture is available only when it helps.</p>";
      const grid=document.createElement("div");grid.className="grid";
      [
        ["Medicine & Public Health","How does evidence move from laboratory and population studies to a decision affecting an actual person?","FSP-JTS-FLNH"],
        ["Science Across Disciplines","How can specialized sciences combine results without pretending their models and vocabularies are identical?","SCI-ATLAS"],
        ["Art, Culture & Interpretation","How can different ways of seeing remain genuinely different while becoming mutually inspectable?","FSP-AESTHETICS-CULTURAL-APERTURE"],
        ["Maathai & Shared Action","How can people cooperate on an important real-world task without first agreeing about religion, politics, morality, or the good life?","FSP-MAATHAI-APERTURE"]
      ].forEach(([title,body,target])=>{
        const card=document.createElement("article");card.className="card";
        card.innerHTML="<strong>"+esc(title)+"</strong><p>"+esc(body)+"</p>";
        card.append(mkButton("Explore",()=>go({kind:"NODE",id:target})));
        grid.append(card);
      });
      cases.append(grid);main.append(cases);

      const stack=document.createElement("section");stack.className="panel";
      stack.innerHTML='<h3>The full stack</h3><p><strong>Lived Doing → Attention → Representation → Evidence → Inference → Specialized Inquiry → Translation → Comparison → Judgment → Authorization → Cooperation → Action → Consequence → Return → REOPEN → Lived Doing again</strong></p><p>Most disciplines and philosophical traditions specialize in parts of this sequence. FSP\'s distinctive ambition is to keep the crossings visible—especially where evidence becomes interpretation, models move between domains, judgment becomes authorization, or individual conclusions become institutional action.</p><p class="warning"><strong>Shared governance grammar ≠ shared ontology, method, value system, or final interpretation.</strong></p>';
      main.append(stack);

      const plural=document.createElement("section");plural.className="panel";
      plural.innerHTML='<h3>Pluralism and convergence create opposite pressures</h3><p><strong>Pluralism:</strong> many maps may fragment coordination. FSP asks where sufficient overlap exists for responsible cooperation without manufacturing false convergence.</p><p><strong>Convergence:</strong> one dominant map may become invisible as a map. FSP asks what remainder, alternative, affected person, or suppressed possibility has become difficult to see.</p><p><strong>COOPERATION ≠ CONVERGENCE</strong><br><strong>OVERLAP ≠ CONSENSUS</strong><br><strong>CONVERGENCE ≠ CLOSURE</strong></p>';
      main.append(plural);

      const translation=document.createElement("section");translation.className="panel";
      translation.innerHTML='<h3>Why science, aesthetics, and culture all belong here</h3><p>Science increasingly depends on disciplined translation across specialties: a model, measurement, trial, or population result must move into another domain without silently gaining stronger meaning.</p><p>Aesthetic and cultural inquiry pose a different problem. Several maps may disclose different aspects of the same work, practice, or history without one method legitimately absorbing all the others.</p><p>FSP therefore seeks <strong>portability without totalization</strong>: make enough of a map inspectable to support inquiry or cooperation while preserving what does not travel cleanly.</p>';
      main.append(translation);

      const coop=document.createElement("section");coop.className="panel";
      coop.innerHTML='<h3>From understanding to cooperation</h3><p>When people remain divided about ultimate reasons, the practical question becomes: <strong>What can these agents responsibly do together now?</strong></p><p>A Joint Task Space identifies a bounded objective, each participant\'s reasons and constraints, standing and authorization, the shared action corridor, burdens, consequences, and REOPEN conditions.</p><p>Sometimes critical thinking helps decide among claims. Sometimes it helps redesign the task so that responsible cooperation becomes possible without ideological conversion.</p>';
      const coopActions=document.createElement("div");coopActions.className="actions";
      coopActions.append(mkButton("Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}),true),mkButton("Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"})),mkButton("Firewall Provenance",()=>go({kind:"NODE",id:"FSP-FIREWALLS"})));
      coop.append(coopActions);main.append(coop);

      const flourish=document.createElement("section");flourish.className="panel";
      flourish.innerHTML='<h3>Why any of this matters</h3><p>People seek health, security, belonging, freedom, competence, meaning, creativity, care, and futures worth inhabiting. They disagree about how these goods should be understood and ranked.</p><p>FSP does not impose one official theory of the good life. It asks: <strong>Better in what respect? Better for whom? According to whose map? Who bears the cost? Which capabilities expand? What happens after we act?</strong></p><p>Inquiry therefore returns to consequence. Success along one dimension is not total success.</p>';
      main.append(flourish);

      const returnSec=document.createElement("section");returnSec.className="panel";
      returnSec.innerHTML='<h3>Return</h3><p>The public route is intentionally progressive:</p><p><strong>human problem → case → extended critical thinking → translation → cooperation → capability / authorization → consequence → Return → optional formal depth</strong></p><p>This orientation is a map of why FSP exists, not evidence that FSP is empirically superior or universally portable.</p>';
      const ra=document.createElement("div");ra.className="actions";
      ra.append(mkButton("Return Home",()=>go({kind:"NODE",id:"FSP-HOME"}),true),mkButton("Why FSP? · Short orientation",()=>go({kind:"NODE",id:"FSP-WHY"})),mkButton("Critical Thinking",()=>go({kind:"NODE",id:"CT-HOME"})));
      returnSec.append(ra);main.append(returnSec);
      return;
    }
    if(id==="FSP-AESTHETICS-CULTURAL-APERTURE"){
      main.innerHTML='<section class="panel"><div class="muted">PUBLIC CASE APERTURE · AESTHETICS / CULTURE</div><h2>Different Maps Without Forced Closure</h2><p>Imagine a museum exhibiting an object that one community regards as sacred while another treats it primarily as art. A curator may emphasize provenance and historical significance; an artist may emphasize form; members of the originating community may emphasize ritual use, custodial obligation, or cultural standing.</p><p>The problem is not solved merely by declaring every interpretation equally correct, nor by allowing one vocabulary to absorb all the others.</p><p class="warning"><strong>Shared inspectability ≠ forced interpretive convergence.</strong></p></section>';
      const q=document.createElement("section");q.className="panel";
      q.innerHTML='<h3>Extended critical-thinking questions</h3><p>Which claims are historical? Which are aesthetic? Which concern sacred use, ownership, standing, or public access? What evidence supports each? What does insider knowledge reveal? What can outsider comparison reveal? What is lost when one map translates the other?</p><p><strong>Insider understanding ≠ automatic moral authorization.</strong><br><strong>Outsider criticism ≠ complete understanding.</strong></p>';
      main.append(q);
      const deeper=document.createElement("section");deeper.className="panel";
      deeper.innerHTML='<h3>Go deeper</h3><p>This aperture does not claim that the Aesthetics domain is already complete. It uses one bounded cultural-interpretive problem to expose translation, standing, provenance, remainder, and claim ceilings.</p>';
      const a=document.createElement("div");a.className="actions";
      a.append(mkButton("Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"}),true),mkButton("Firewall Provenance",()=>go({kind:"NODE",id:"FSP-FIREWALLS"})),mkButton("Aesthetics domain status",()=>go({kind:"NODE",id:"DOMAIN-AESTHETICS"})),mkButton("Return to Full-Stack Essay",()=>go({kind:"NODE",id:"FSP-FULL-STACK-ESSAY"})));
      deeper.append(a);main.append(deeper);return;
    }

    if(id==="FSP-MAATHAI-APERTURE"){
      main.innerHTML='<section class="panel"><div class="muted">PUBLIC CASE APERTURE · MAATHAI / SHARED ACTION</div><h2>Cooperation Without Convergence</h2><p>Tree planting can matter for many different reasons: firewood, soil protection, water, household labor, livelihood, ecological restoration, women\'s capability, civic organization, cultural continuity, or democratic standing.</p><p>Participants do not need one comprehensive moral, religious, or political theory before beginning a bounded shared task.</p><p><strong>different reasons → bounded shared task → coordinated Doing → consequence → capability accumulation → widened task space</strong></p><p class="warning"><strong>SHARED ACTION ≠ SHARED ULTIMATE REASONS. OVERLAP ≠ CONVERGENCE.</strong></p></section>';
      const j=document.createElement("section");j.className="panel";
      j.innerHTML='<h3>What FSP makes inspectable</h3><p>What is the bounded task? What does each participant independently authorize? What constraints must be preserved? Where does the common action corridor end? Who bears burdens? What new capabilities and relationships emerge? What remains unresolved after successful cooperation?</p><p>The Maathai pattern does not imply that every disagreement can be bridged or that every coalition is just. It shows how consequential shared Doing can sometimes begin before comprehensive agreement.</p>';
      main.append(j);
      const deeper=document.createElement("section");deeper.className="panel";
      deeper.innerHTML='<h3>Go deeper</h3><p>Use Joint Task Spaces for the general cooperation architecture, or open the existing Maathai Lives pilot for the historical/transformational experience.</p>';
      const a=document.createElement("div");a.className="actions";
      a.append(mkButton("Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}),true),mkButton("Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"})),mkButton("Return to Full-Stack Essay",()=>go({kind:"NODE",id:"FSP-FULL-STACK-ESSAY"})));
      const ext=document.createElement("a");ext.href="./pilot/lives-maathai/";ext.textContent="Open Maathai Lives pilot";ext.className="primary";ext.style.cssText="display:inline-block;text-decoration:none;border:1px solid var(--accent);background:var(--accent);color:#fff;border-radius:.45rem;padding:.45rem .7rem";
      a.append(ext);deeper.append(a);main.append(deeper);return;
    }
    const n=byId("nodes",id);if(!n)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(n.id)+' · '+esc(n.status)+'</div><h2>'+esc(n.title)+'</h2><p>'+esc(n.summary)+'</p><p><strong>Canonical claim:</strong> '+esc(n.canonicalClaim)+'</p></div>';
    if(id==="FSP-HOME"){
      main.innerHTML='<div class="panel"><div class="muted">FSP Encyclopedia · HOME</div><h2>Full-Stack Philosophy</h2><p>FSP makes the interacting layers of human inquiry inspectable without pretending that every domain has the same ontology, evidence, authority, or method.</p><p><strong>Why FSP?</strong> Human inquiry does not happen only inside arguments. We notice selectively, build partial maps, use specialized tools, make judgments, act through institutions, and revise when consequences or evidence resist our expectations.</p><p><strong>Notice → Inspect → Govern → Bound → REOPEN → Return</strong></p><p>The Joint Task Space work gives that orientation a concrete coordination grammar for complex shared problems: <strong>STATE → STANDING → TRANSLATION → REPAIR → AMPLIFICATION → REOPEN</strong>. These are not competing grammars. The first is the broader inquiry orientation; the second is a worked coordination architecture.</p><p class="warning"><strong>Shared grammar ≠ shared ontology.</strong> FSP itself remains corrigible: <strong>FSP map ≠ inquiry itself.</strong></p></div>';
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Explore the Encyclopedia</h3><p class=\"muted\">Begin with domains, shared core resources, course and research routes, or the short Why FSP? orientation.</p>";
      const grid=document.createElement("div");grid.className="grid";
      [
        ["FSP-DOMAINS","Domains","Enter Inquiry & Science, Ethics, History of Philosophy, Logic & Argument, Aesthetics, Institutions & Connected Doing, Core, and Formal / Executable FSP."],
        ["FSP-CONSTITUTION","Core","Inspect the thin constitutional grammar shared across domains without replacing their native ontologies."],
        ["FSP-FULL-STACK-ESSAY","Why We Need a Full-Stack Philosophy","Start with the human problem: partial knowledge, specialized expertise, different values, and shared tasks that require responsible action without complete convergence."],
        ["FSP-RESOURCES","Resources","Browse cross-domain resources such as Why FSP?, Critical Thinking, Tools, Failure Atlas, and the Scientific Atlas."],
        ["FSP-ROUTES","Routes","Follow books, courses, laboratories, and workspaces through canonical resources."],
        ["FSP-ABOUT","About","See how the Encyclopedia is organized, governed, and kept corrigible."],
        ["FSP-FIREWALLS","Firewall Provenance","Inspect why each gate exists, what licenses crossing, and how the formulation remains open to REOPEN."],
        ["FSP-TRANSFORMATION-OBSERVATORY","Transformation Observatory","Watch transformations unfold across biology, ecology, reproduction, and consciousness; inspect every consequential arrow."]
      ].forEach(([rid,label,desc])=>{
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<strong>"+esc(label)+"</strong><p>"+esc(desc)+"</p>";
        c.append(mkButton("Open "+label,()=>go({kind:"NODE",id:rid})));
        grid.append(c);
      });
      sec.append(grid);main.append(sec);
      const depth=document.createElement("section");depth.className="panel";depth.innerHTML="<h3>Three reader depths</h3><p><strong>Quick:</strong> Why FSP? — orientation and the compact grammar.</p><p><strong>Standard:</strong> Extended Critical Thinking and Joint Task Spaces.</p><p><strong>Deep / Formal:</strong> translation governance, provenance, remainder, standing, authorization, and cross-domain interoperability.</p>";
      const da=document.createElement("div");da.className="actions";
      da.append(
        mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"}),true),
        mkButton("Standard explanation",()=>go({kind:"NODE",id:"FSP-JTS"})),
        mkButton("Deep / Formal",()=>go({kind:"NODE",id:"FSP-TRANSLATION"}))
      );
      da.prepend(mkButton("Long-form public orientation",()=>go({kind:"NODE",id:"FSP-FULL-STACK-ESSAY"}),true));
      depth.append(da);main.append(depth);
      return;
    }

    if(id==="FSP-DOMAINS"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · DOMAINS</div><h2>Domains</h2><p>FSP is multi-domain by design. Each domain retains its native objects, evidence, methods, and forms of authority while exposing selected inquiry relations through the shared governance grammar.</p><p class="warning"><strong>Shared grammar ≠ shared domain ontology.</strong></p></div>';
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Domain libraries</h3>";
      const grid=document.createElement("div");grid.className="grid";
      for(const d of DOMAIN_PUBLIC_NAV){
        const c=document.createElement("div");c.className="card";
        const label=d.domainId==="SCIENCE-INQUIRY"?"Inquiry & Science":
          d.domainId==="HISTORY-PHILOSOPHY"?"History of Philosophy":
          d.domainId==="ETHICS"?"Ethics":
          d.domainId==="LOGIC-ARGUMENT"?"Logic & Argument":
          d.domainId==="AESTHETICS"?"Aesthetics":
          d.domainId==="INSTITUTIONS-CONNECTED-DOING"?"Institutions & Connected Doing":
          d.domainId==="CORE"?"FSP Core":"Formal & Executable FSP";
        c.innerHTML="<strong>"+esc(label)+"</strong><div class=\"tag\">"+esc(d.readerStatus)+"</div><p>"+esc(d.summary)+"</p>";
        c.append(mkButton("Open "+label,()=>go({kind:"NODE",id:"DOMAIN-"+d.domainId})));
        grid.append(c);
      }
      sec.append(grid);main.append(sec);return;
    }

    if(id.startsWith("DOMAIN-")){
      const did=id.slice("DOMAIN-".length);
      const d=DOMAIN_PUBLIC_NAV.find(x=>x.domainId===did);
      if(!d)return renderMissing(main,id);
      const label=did==="SCIENCE-INQUIRY"?"Inquiry & Science":
        did==="HISTORY-PHILOSOPHY"?"History of Philosophy":
        did==="ETHICS"?"Ethics":
        did==="LOGIC-ARGUMENT"?"Logic & Argument":
        did==="AESTHETICS"?"Aesthetics":
        did==="INSTITUTIONS-CONNECTED-DOING"?"Institutions & Connected Doing":
        did==="CORE"?"FSP Core":"Formal & Executable FSP";
      main.innerHTML='<div class="panel"><div class="muted">DOMAIN · '+esc(d.readerStatus)+'</div><h2>'+esc(label)+'</h2><p>'+esc(d.summary)+'</p></div>';
      if(did==="ETHICS"){
        const x=document.createElement("section");x.className="panel";
        x.innerHTML="<h3>What Ethics makes visible</h3><p>Reasons for action, duties and permissions, harm and benefit, dignity, agency, standing, fairness, dependency, capability, legitimacy, power, and the distribution of burdens and benefits.</p><h3>What Ethics contributes</h3><p>Standing analysis, burden visibility, legitimacy questions, capability analysis, reasons for exception, justification of limits, and normative conflict made explicit rather than hidden.</p><h3>What Ethics does not own</h3><p>Ethics does not by itself determine infection probability, staffing capacity, legal authority, epidemiological causation, operational feasibility, or empirical success.</p><p class=\"warning\"><strong>Moral relevance ≠ empirical determination. Ethical judgment ≠ unrestricted authorization.</strong></p><h3>Worked entrance</h3><p><strong>Gulf Pines</strong> is the current canonical Ethics/Institutions Joint Task Space.</p>";
        main.append(x);
      }else if(did==="INSTITUTIONS-CONNECTED-DOING"){
        const x=document.createElement("section");x.className="panel";
        x.innerHTML="<h3>What Institutions makes visible</h3><p>Roles, permissions, procedures, defaults, metrics, incentives, reporting channels, authority, resource flows, enforcement, memory, and persistence.</p><h3>What Institutions contributes</h3><p>Practical power, formal authority, role-bounded responsibility, implementation capacity, institutional amplification, policy sedimentation, feedback channels, regulatory learning, exception structures, and multi-level coordination.</p><h3>What Institutions does not own</h3><p>Institutional authority does not by itself settle empirical truth, moral legitimacy, lived experience, scientific explanation, or domain-native meaning.</p><p class=\"warning\"><strong>Power ≠ legitimacy. Operational authority ≠ moral completeness.</strong></p><h3>Worked entrance</h3><p><strong>Gulf Pines Layer 5</strong> shows how local judgments become rules and how implementation effects can travel upward into institutional and regulatory REOPEN.</p>";
        main.append(x);
      }else if(did==="SCIENCE-INQUIRY"){
        const x=document.createElement("section");x.className="panel";
        x.innerHTML="<h3>What Inquiry & Science makes visible</h3><p>Observation, measurement, models, prediction, causal hypotheses, uncertainty, error, model comparison, and temporal revision.</p><h3>What Inquiry & Science contributes</h3><p>Evidence provenance, observation/inference separation, uncertainty representation, model plurality, causal restraint, controlled probes, and sensitivity to diachronic change.</p><h3>What Inquiry & Science does not own</h3><p>Scientific expertise does not by itself determine legitimate risk transfer, standing, international authorization, acceptable burden, moral priority, or political legitimacy.</p><p class=\"warning\"><strong>Model success ≠ ontology. Impact-model expertise ≠ mission authorization.</strong></p><h3>Worked entrances</h3><p><strong>Asteria-2047</strong> is the current cross-domain Joint Task Space comparator. The <strong>Scientific Atlas</strong> remains the deeper historical/diachronic entrance.</p>";
        main.append(x);
      }else if(did==="FORMAL-EXECUTABLE"){
        const x=document.createElement("section");x.className="panel";
        x.innerHTML="<h3>What Formal & Executable FSP makes visible</h3><p>States, transitions, invariants, relation graphs, typed records, reducers, projection contracts, failure routing, claim ceilings, and explicit REOPEN conditions.</p><h3>What it contributes</h3><p>Deterministic transitions, invariant checking, reproducible routing, regression protection, projection fidelity, freeze gates, and executable preservation of important distinctions.</p><h3>What it does not own</h3><p>Formalization does not determine lived meaning, philosophical truth, scientific truth, legitimacy, or final ethical judgment.</p><p class=\"warning\"><strong>Formal representation ≠ world. Executable invariant ≠ philosophical truth. Passing tests ≠ empirical validation.</strong></p><h3>Canonical role</h3><p>The formal layer is a governance prosthesis: it helps preserve distinctions across complex systems while remaining subordinate to the persons, phenomena, and domains represented.</p><p><strong>FSP map ≠ inquiry itself.</strong></p>";
        main.append(x);
      }
      else if(did==="HISTORY-PHILOSOPHY"){
        const x=document.createElement("section");x.className="panel";
        x.innerHTML="<h3>What History of Philosophy makes visible</h3><p>Situated problem contexts, public philosophical artifacts, native inquiry topologies, attribution, uptake, contest, sedimentation, and what becomes available for later inquiry.</p><h3>Native topologies</h3><p>Serial / reconstructive · dialogical / aporetic · genealogical / diagnostic · field / transition. The shared shell governs location, representation, attribution, typing, licensing, challenge, fork/REOPEN, and continuation without claiming every philosopher follows one sequence.</p><p class=\"warning\"><strong>Speaker utterance ≠ authorial commitment. Refutation ≠ positive doctrine. Origin ≠ validity.</strong></p><h3>What this domain contributes</h3><p>Context recovery, inquiry-topology preservation, reconstruction/endorsement separation, historical provenance, selective Carry Forward, and REOPEN across changing task spaces.</p><h3>What it does not own</h3><p>Historical reconstruction does not by itself determine truth, soundness, present justification, or contemporary authorization.</p><p class=\"warning\"><strong>Historical reconstruction ≠ present justification.</strong></p><h3>Worked entrance</h3><p><strong>What May We Carry Forward?</strong> and its SUPER workspace remain the current public routes.</p>";
        main.append(x);
      }else if(did==="LOGIC-ARGUMENT"){
        const x=document.createElement("section");x.className="panel";
        x.innerHTML="<h3>What Logic & Argument makes visible</h3><p>Claims, grounds, warrants, backing, qualifiers, rebuttals, support relations, defeaters, scope, provenance, and authority carried across an inference.</p><h3>Attack targets</h3><p>Ground · claim · warrant · backing · scope · provenance · authority. Different disagreements can therefore target different parts of the same argument.</p><h3>Selective REOPEN</h3><p>Linked support may fail when a required premise is defeated; convergent support may survive when an independent source remains. Challenge does not automatically reopen every dependent claim.</p><p class=\"warning\"><strong>Challenge ≠ automatic REOPEN.</strong></p><h3>What this domain contributes</h3><p>Inferential audit, typed support, attack targeting, warrant visibility, provenance, scope control, defeater handling, and dependency-sensitive revision.</p><h3>What it does not own</h3><p>Argument support does not by itself settle moral importance, institutional authorization, historical meaning, ontology, or policy.</p><p class=\"warning\"><strong>Supported argument ≠ authorized action. Governance integration ≠ new argumentation theory.</strong></p>";
        main.append(x);
      }
      if(d.availableNow.length){
        const now=document.createElement("section");now.className="panel";now.innerHTML="<h3>Available now</h3>";
        const ul=document.createElement("ul");for(const x of d.availableNow){const li=document.createElement("li");li.textContent=x;ul.append(li)}now.append(ul);main.append(now);
      }
      if(d.resources.length){
        const rs=document.createElement("section");rs.className="panel";rs.innerHTML="<h3>Public resources</h3>";
        for(const r of d.resources){
          const c=document.createElement("div");c.className="card";
          c.innerHTML="<strong>"+esc(r.title)+"</strong><p>"+esc(r.description)+"</p>";
          if(r.external){
            const a=document.createElement("a");a.href=r.href;a.target="_blank";a.rel="noopener";a.textContent="Open "+r.title;c.append(a);
          }else if(did==="SCIENCE-INQUIRY"){
            c.append(mkButton("Open Inquiry & Science",()=>go({kind:"NODE",id:"SCI-ATLAS"})));
          }
          rs.append(c);
        }
        main.append(rs);
      }
      if(did==="CORE"){
        const a=document.createElement("div");a.className="actions";a.append(mkButton("Open FSP Constitution",()=>go({kind:"NODE",id:"FSP-CONSTITUTION"}),true),mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"})));main.append(a);
      }else if(did==="SCIENCE-INQUIRY"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Browse Scientific Atlas",()=>go({kind:"NODE",id:"SCI-ATLAS"}),true),
          mkButton("Asteria-2047 Comparator",()=>go({kind:"NODE",id:"FSP-JTS-COMPARATOR-1"}))
        );main.append(a);
      }else if(did==="FORMAL-EXECUTABLE"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"}),true),
          mkButton("Joint Task Space Integration Gate",()=>go({kind:"NODE",id:"FSP-JTS-INTEGRATION-GATE-1"})),
          mkButton("Asteria Comparator",()=>go({kind:"NODE",id:"FSP-JTS-COMPARATOR-1"}))
        );main.append(a);
      }else if(did==="INSTITUTIONS-CONNECTED-DOING"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}),true),
          mkButton("Florida Nursing-Home Pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"})),
          mkButton("Institutional Amplification",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-INSTITUTIONAL"}))
        );main.append(a);
      }else if(did==="ETHICS"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Florida Nursing-Home Joint Task Space",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
          mkButton("Critical Thinking",()=>go({kind:"NODE",id:"CT-HOME"}))
        );main.append(a);
      }else if(did==="HISTORY-PHILOSOPHY"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Critical Thinking",()=>go({kind:"NODE",id:"CT-HOME"})),
          mkButton("Inquiry & Science",()=>go({kind:"NODE",id:"DOMAIN-SCIENCE-INQUIRY"}))
        );main.append(a);
      }else if(did==="LOGIC-ARGUMENT"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Critical Thinking",()=>go({kind:"NODE",id:"CT-HOME"}),true),
          mkButton("T02 · Reason-Giving Audit",()=>go({kind:"NODE",id:"CT-T02"}))
        );main.append(a);
      }
      if(d.notYetClaimed.length){
        const n=document.createElement("section");n.className="panel";n.innerHTML="<h3>Current boundary</h3>";
        const ul=document.createElement("ul");for(const x of d.notYetClaimed){const li=document.createElement("li");li.textContent=x;ul.append(li)}n.append(ul);main.append(n);
      }
      return;
    }

    if(id==="FSP-RESOURCES"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · RESOURCES</div><h2>Resources</h2><p>Cross-domain resources expose shared governance concepts without replacing domain-native inquiry.</p></div><section class="panel"><div class="muted">RESEARCH REFERENCE · DURABLE 60-ENTRY ANNOTATED BIBLIOGRAPHY</div><h3>FSP Research Bibliography — 60 Annotated Entries</h3><p>Annotated research sources supporting the recent FSP comparator, governance, consciousness, biology, inquiry, interoperability, and authorization work. Each entry includes a DOI or stable link, a short annotation, the FSP build(s) it supports, and a Read first / Skim / Reference only priority.</p><p><a href="https://github.com/Bobphil/fsp-cartography/blob/main/FSP-RESEARCH-BIBLIOGRAPHY-2026-11.md" target="_blank" rel="noopener"><strong>Open the 60-entry annotated research bibliography</strong></a></p></section>';
      const grid=document.createElement("div");grid.className="grid";
      [
        ["FSP-WHY","Why FSP?","A short orientation to the reason for the project."],
        ["FSP-JTS","Extended Critical Thinking & Joint Task Spaces","The Standard account of governed inquiry and cooperation without convergence."],
        ["FSP-TRANSLATION","Translation Governance","Deep/Formal treatment of provenance, remainder, standing, and interoperability."],
        ["CT-HOME","Critical Thinking","Traditional critical thinking extended into governed inquiry."],
        ["CT-TOOLS","Twelve Tools","Functional inquiry operators."],
        ["CT-FAILURES","Failure Atlas","Reasoning symptoms routed to repair."],
        ["SCI-ATLAS","Scientific Atlas","Five comparative inquiry dossiers."],
        ["FSP-FIREWALLS","Firewall Provenance","Historical lineage, crossing warrants, Tools, cases, evidence states, claim ceilings, and REOPEN triggers."]
      ].forEach(([rid,label,desc])=>{const c=document.createElement("div");c.className="card";c.innerHTML="<strong>"+esc(label)+"</strong><p>"+esc(desc)+"</p>";c.append(mkButton("Open "+label,()=>go({kind:"NODE",id:rid})));grid.append(c)});
      for(const r of PUBLIC_RESEARCH_RESOURCES){
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<div class=\"muted\">RESEARCH REFERENCE · "+esc(r.status)+"</div><strong>"+esc(r.title)+"</strong><p>"+esc(r.description)+"</p>";
        const a=document.createElement("a");a.href=r.href;a.target="_blank";a.rel="noopener";a.textContent="Open bibliography";c.append(a);grid.append(c);
      }
      const life=document.createElement("div");life.className="card";life.innerHTML="<div class=\"muted\">STUDENT PILOT · REVIEW BUILD</div><strong>FSP Life Navigation Prototype</strong><p>HERE → THERE → BRIDGE → TEST → RETURN: a low-stakes student-facing pilot for examining one possible future while preserving privacy, self-authorship, evidence, remainder, and revision.</p>";const la=document.createElement("a");la.href="./life-navigation.html";la.textContent="Open Life Navigation pilot";life.append(la);grid.append(life);
      main.append(grid);return;
    }

    if(id==="FSP-ROUTES"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · ROUTES</div><h2>Routes</h2><p>Books, courses, laboratories, and workspaces are routes through canonical resources. A route may select, compress, and sequence material without becoming a competing canonical owner.</p><p class="warning"><strong>Route ≠ canonical owner.</strong></p></div><section class="panel"><div class="muted">RESEARCH ROUTE</div><h3>FSP Research Bibliography — 60 Annotated Entries</h3><p>A durable research route into the sources behind the recent FSP builds.</p><p><a href="https://github.com/Bobphil/fsp-cartography/blob/main/FSP-RESEARCH-BIBLIOGRAPHY-2026-11.md" target="_blank" rel="noopener"><strong>Open bibliography</strong></a></p></section>';
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Available public routes</h3>";
      for(const d of DOMAIN_PUBLIC_NAV){
        for(const r of d.resources.filter(x=>x.external)){
          const c=document.createElement("div");c.className="card";c.innerHTML="<strong>"+esc(r.title)+"</strong><p>"+esc(r.description)+"</p>";
          const a=document.createElement("a");a.href=r.href;a.target="_blank";a.rel="noopener";a.textContent="Open "+r.title;c.append(a);sec.append(c);
        }
      }
      main.append(sec);return;
    }

    if(id==="FSP-ABOUT"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · ABOUT</div><h2>About the FSP Encyclopedia</h2><p>The Encyclopedia is a public architecture for connecting domains, cases, concepts, Tools, sources, comparisons, formal models, course routes, laboratories, and institutional applications.</p><p>It is both a <strong>knowledge environment</strong> and an <strong>inquiry-routing environment</strong>. Readers should be able to move from prose to cases, from cases to transitions, from transitions to Tools, from Tools to sources, from sources to claim ceilings, and back to lived inquiry.</p><p><strong>One canonical owner, many projections.</strong> A concept may appear in public, course, research, or executable forms, but those projections must not silently mutate its meaning.</p><p><strong>Progressive disclosure ≠ semantic mutation.</strong></p><p>Its purpose is not to impose one master ontology. It is to make heterogeneous forms of inquiry more mutually inspectable and selectively interoperable while preserving provenance, standing, domain-native meaning, claim ceilings, remainder, REOPEN, and Return.</p><p><strong>FSP map ≠ inquiry itself.</strong></p><p>The Encyclopedia therefore remains corrigible: when a domain, case, comparator, or user exposes a systematic failure in the shared grammar, the grammar itself may REOPEN.</p></div>';
      const a=document.createElement("div");a.className="actions";a.append(mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"}),true),mkButton("Browse Domains",()=>go({kind:"NODE",id:"FSP-DOMAINS"})));main.append(a);return;
    }

    if(id==="FSP-WHY"){
      main.innerHTML='<div class="panel"><div class="muted">QUICK · ORIENTATION</div><h2>Why Full-Stack Philosophy?</h2><p>Human beings already inquire before they ever enter a classroom or formal discipline. We notice, interpret, compare, remember, infer, act, encounter resistance, and revise. Modern societies have multiplied the power of that inquiry through science, law, engineering, medicine, statistics, institutions, computation, and specialized professional knowledge.</p><p>The difficulty is that these forms of inquiry are often separated into silos. A useful model in one domain may travel without its assumptions. A recommendation may arrive without its provenance. Expertise may be mistaken for authority. A representation may be treated as the thing represented. A current judgment may become a policy before anyone asks what it actually licenses.</p><h3>What FSP adds</h3><p>FSP keeps the achievements of traditional critical thinking—logic, argument analysis, evidence, inference, alternatives, counterexamples, source evaluation—and places them inside a wider governance architecture.</p><p><strong>Notice → Inspect → Govern → Bound → REOPEN → Return</strong></p><p><strong>Notice:</strong> What entered the map, and what may be missing?</p><p><strong>Inspect:</strong> What reasons, evidence, alternatives, and Tools matter?</p><p><strong>Govern:</strong> Which transitions need provenance, standing, or justification?</p><p><strong>Bound:</strong> What does not yet follow?</p><p><strong>REOPEN:</strong> What would make us reconsider?</p><p><strong>Return:</strong> How does inquiry return to responsible lived action?</p><h3>Why this matters across domains</h3><p>FSP does not ask physics, ethics, history, law, medicine, institutions, or ordinary human experience to become the same kind of inquiry. It asks whether enough of their relevant structure can be made mutually inspectable to support responsible coordination.</p><p class="warning"><strong>Shared grammar ≠ shared ontology.</strong></p><p>This makes possible a different kind of synthesis: not one worldview into which everything must fit, but a corrigible architecture for translation, comparison, bounded judgment, and cooperation without convergence.</p><h3>What we can now demonstrate</h3><p><strong>Gulf Pines</strong> shows the grammar under short-horizon institutional and ethical pressure. <strong>Asteria-2047</strong> shows it under long-horizon uncertainty, model dependence, distributed authority, future-person standing, and possible irreversibility.</p><p>Together they support a provisional portability claim, not universality.</p><h3>FSP is corrigible too</h3><p>The framework itself is a map. If its Tools, categories, or translations systematically obscure important distinctions or fail across domains, they must be eligible for revision.</p><p class="warning"><strong>FSP map ≠ inquiry itself.</strong></p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Read the Standard explanation",()=>go({kind:"NODE",id:"FSP-JTS"}),true),
        mkButton("Gulf Pines · Nursing-home case",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"})),
        mkButton("Asteria-2047 · Planetary-defense case",()=>go({kind:"NODE",id:"FSP-JTS-COMPARATOR-1"})),
        mkButton("Explore Domains",()=>go({kind:"NODE",id:"FSP-DOMAINS"})),
        mkButton("Return to Encyclopedia Home",()=>go({kind:"NODE",id:"FSP-HOME"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS"){
      main.innerHTML='<div class="panel"><div class="muted">STANDARD · JOINT TASK SPACE</div><h2>Extended Critical Thinking and Joint Task Spaces</h2><p><strong>Extended Critical Thinking</strong> is traditional critical thinking embedded within a governed inquiry architecture. It preserves argument analysis, logic, evidence, causal reasoning, source evaluation, alternatives, and counterexamples, while extending inquiry both upstream and downstream.</p><h3>Before the argument</h3><p>FSP asks what entered the map, what was omitted, what was observed rather than inferred, which categories shaped attention, whose perspective supplied the framing, and what histories, institutions, or constraints made that framing seem natural.</p><h3>After the argument</h3><p>FSP asks what a conclusion licenses, who has standing to recommend or decide, what happens when an institution amplifies a judgment, who bears consequences, which capabilities are expanded or constrained, and what would require repair or REOPEN.</p><h3>How the grammar works</h3><p><strong>ABCD</strong> broadens attention. <strong>Tools</strong> selectively inspect recurring pressure points. <strong>Firewalls</strong> govern transitions where inquiry may carry more across than has been licensed. <strong>Claim ceilings</strong> ask what does not yet follow. <strong>REOPEN</strong> preserves corrigibility. <strong>Authorial Return</strong> returns judgment to lived human Doing.</p><p>A Firewall is not normally a prohibition. It is a controlled checkpoint: <strong>You may cross, but show the license.</strong></p><h3>Translation without reduction</h3><p>Different domains can preserve their native entities, evidence, methods, and authority while exposing selected relations in a shared governance form. The shared representation records provenance, assumptions, uncertainty, standing, claim ceilings, and remainder rather than pretending translation is lossless.</p><p class="warning"><strong>Translation ≠ identity. Compression ≠ semantic equivalence.</strong></p><h3>Cooperation without convergence</h3><p>Participants need not agree on metaphysics, final values, disciplinary method, or one complete explanation. They may still coordinate if they can make relevant observations, constraints, assumptions, uncertainties, standing, authorization boundaries, reversible actions, and REOPEN conditions mutually inspectable.</p><h3>Joint Task Spaces</h3><p>A <strong>Joint Task Space</strong> is a governed coordination surface in which heterogeneous participants contribute domain-native maps, evidence, constraints, uncertainty, recommendations, permissions, and repair conditions without surrendering their local identities.</p><p><strong>domain-native inquiry → translation with provenance + remainder → shared task representation → Tool-guided inspection → Firewall-governed transitions → bounded joint judgment → standing / authorization → coordinated action → consequences → REOPEN</strong></p><h3>Continuous intercommunication</h3><p>The aim is not a final synthesis. It is sustained, auditable movement among partial syntheses as inquiry changes. Each domain can update its local map while preserving what changed, why it changed, what remains uncertain, and which shared judgments must be reconsidered.</p><h3>First demonstration</h3><p>The Florida nursing-home pilot tests whether this architecture can coordinate residents, families, frontline workers, clinical/public-health expertise, administration, regulation, historical evidence, and ethical judgment without collapsing them into one authority or one ontology.</p><p class="warning"><strong>The Standard layer explains a capability architecture; it does not claim that FSP has already solved interdisciplinary coordination.</strong></p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Open Florida Nursing-Home Joint Task Space",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("Inspect Deep / Formal translation governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"})),
        mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"})),
        mkButton("Critical Thinking",()=>go({kind:"NODE",id:"CT-HOME"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH"){
      main.innerHTML='<div class="panel"><div class="muted">JOINT TASK SPACE PILOT · FLORIDA NURSING HOME</div><h2>Gulf Pines: Cooperation Without Convergence</h2><p><strong>Gulf Pines</strong> is a fictional/composite Florida nursing-home teaching facility used as a human coordination surface. It is kept separate from the real Florida historical backtest, which supplies only a bounded empirical evidence layer.</p><p>The shared task is: <strong>reduce avoidable outbreak harm while preserving resident dignity, effective capability, worker safety, family relationships, lawful authority, and the ability to revise policy as evidence and conditions change.</strong></p><h3>Why this is a Joint Task Space</h3><p>No single participant owns the whole problem. Residents, families, frontline staff, clinical leadership, administrators, regulators, public-health authorities, and empirical analysts contribute different kinds of evidence, experience, constraint, standing, and authority.</p><p class="warning"><strong>Expertise ≠ standing ≠ authorization.</strong></p><h3>ABCD first-map expansion</h3><p><strong>Agency:</strong> who can actually do what? <strong>Mattering:</strong> what is protected or threatened? <strong>Context:</strong> what histories, staffing, regulation, ownership, and design shape the situation? <strong>Dynamism:</strong> what is changing in infection, staffing, resident condition, family pressure, and policy feasibility?</p><p class="warning"><strong>Expanded attention ≠ complete representation.</strong></p><h3>Tool sequence</h3><p>T01 First Map Audit → T07 Perspective / Moral Visibility → T09 Consequence / Harm → T12 Effective Capability → T06 Legitimacy / Standing → T10 Background Power → T02 Reason-Giving Audit.</p><p>The sequence is diagnostic, not mandatory. <strong>Tool ≠ Verdict.</strong></p><h3>Empirical hinge</h3><p>The Florida historical replay is used only as a structural evidence contribution. Its lesson is that differentiated warnings can remain useful even when a universal risk score fails. Historical data therefore inform investigation without becoming a prophecy, causal conclusion, or moral verdict about Gulf Pines.</p><p class="warning"><strong>Historical association ≠ causal effect ≠ prospective validation.</strong></p><h3>Translation and remainder</h3><p>Clinical evidence, staffing constraints, resident experience, family knowledge, regulation, ethics, operations, historical data, and finance remain domain-native while selected relations become mutually inspectable. The shared representation explicitly keeps a remainder ledger for what cannot be translated cleanly.</p><p><strong>Untranslated remainder ≠ irrelevant remainder.</strong></p><h3>Cooperation without convergence</h3><p>Participants need not agree on one ethical theory, causal model, or institutional priority. They need enough governed interoperability to preserve evidence provenance, resident visibility, uncertainty, role boundaries, standing, reversible options, burden monitoring, claim ceilings, and REOPEN conditions.</p><h3>Bounded joint judgment</h3><p>Current evidence may justify heightened infection-control response while leaving the form, duration, and authorization of restrictions open to resident-specific capability, staffing feasibility, lawful standing, and new evidence.</p><h3>REOPEN</h3><p>Reopen when infection trajectory, staffing capacity, resident harm, clinical guidance, implementation feasibility, capability effects, regulatory conditions, or newly visible evidence materially changes.</p><p class="warning"><strong>The pilot tests whether FSP can govern coordination; it does not claim to solve nursing-home governance.</strong></p></div>';
      const timeline=document.createElement("section");timeline.className="panel";timeline.innerHTML="<h3>Follow the inquiry over time</h3><p class=\"muted\">Each state changes the shared map, Tool selection, standing, claim ceiling, and REOPEN conditions.</p>";
      const ta=document.createElement("div");ta.className="actions";
      [
        ["FSP-JTS-FLNH-S0","S0 · Early Signal"],
        ["FSP-JTS-FLNH-S1","S1 · Widening Map"],
        ["FSP-JTS-FLNH-S2","S2 · Intervention Pressure"],
        ["FSP-JTS-FLNH-S3","S3 · Revised Bounded Judgment"]
      ].forEach(([rid,label])=>ta.append(mkButton(label,()=>go({kind:"NODE",id:rid}))));
      timeline.append(ta);main.append(timeline);
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}),true),
        mkButton("Standing / Authorization Layer",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-STANDING"})),
        mkButton("Translation & Remainder Layer",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-TRANSLATION"})),
        mkButton("Repair / Strategy Layer",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-REPAIR"})),
        mkButton("Institutional Amplification Layer",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-INSTITUTIONAL"})),
        mkButton("Five-Layer Integration",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-INTEGRATION"})),
        mkButton("Integration Freeze Gate",()=>go({kind:"NODE",id:"FSP-JTS-INTEGRATION-GATE-1"})),
        mkButton("Asteria-2047 Comparator",()=>go({kind:"NODE",id:"FSP-JTS-COMPARATOR-1"})),
        mkButton("Public Coherence Audit",()=>go({kind:"NODE",id:"FSP-ENCYCLOPEDIA-COHERENCE-AUDIT-1"})),
        mkButton("Inspect Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"})),
        mkButton("Browse Ethics domain",()=>go({kind:"NODE",id:"DOMAIN-ETHICS"})),
        mkButton("Browse Institutions domain",()=>go({kind:"NODE",id:"DOMAIN-INSTITUTIONS-CONNECTED-DOING"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-S0"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · STATE S0</div><h2>Early Signal</h2><p>Three residents develop respiratory symptoms, one CNA calls out, and frontline staff report two additional residents may be changing. No facility-wide testing result exists yet.</p><h3>Observed / reported</h3><p>Symptoms, staff absence, possible hallway clustering.</p><h3>Inferred / hypothesized</h3><p>An outbreak may be beginning, staff transmission may be possible, and staffing may become strained. None is yet established.</p><h3>ABCD shift</h3><p><strong>Agency:</strong> who can assess, test, isolate, staff, and communicate? <strong>Mattering:</strong> safety and the meaning of home. <strong>Context:</strong> staffing, layout, acuity, local prevalence. <strong>Dynamism:</strong> the situation is changing faster than the map is stabilizing.</p><h3>Activated Tools</h3><p>T01 First Map Audit · T02 Reason-Giving Audit · T09 Consequence / Harm Audit</p><p class="warning"><strong>Early cluster ≠ confirmed facility-wide outbreak.</strong></p><h3>Remainder</h3><p>Pathogen identity, transmission route, scale, staff exposure, community prevalence, staffing reserve.</p><h3>REOPEN</h3><p>Positive testing, new symptomatic residents, increased staff illness, clinical deterioration, or contradictory diagnostic evidence.</p></div>';
      const a=document.createElement("div");a.className="actions";a.append(mkButton("Next: S1 · Widening Map",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S1"}),true),mkButton("Pilot overview",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"})));main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-S1"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · STATE S1</div><h2>Widening Map</h2><p>Two residents test positive, another becomes symptomatic, two staff report symptoms, a daughter reports severe isolation distress, and night staff report that full-room isolation is difficult under current coverage.</p><h3>What changed</h3><p>The outbreak hypothesis strengthens, but the map now also includes staffing feasibility, resident-specific capability, family knowledge, and implementation burden.</p><h3>Activated Tools</h3><p>T07 Perspective / Moral Visibility · T12 Effective Capability · T09 Consequence / Harm · T04 Control / Moral Range</p><h3>Standing</h3><p>Clinical staff gain stronger warrant for infection-control recommendations; residents retain standing over burdens; families contribute resident-specific knowledge; administration coordinates within rights and feasibility constraints.</p><p class="warning"><strong>Clinical indication ≠ unrestricted facility-wide authorization.</strong></p><p><strong>Formal option ≠ effective capability.</strong></p><h3>Claim ceiling</h3><p>Confirmed transmission supports heightened response; it does not yet justify one uniform restriction for every resident.</p><h3>REOPEN</h3><p>Unit-specific distribution, staffing threshold breach, isolation harm, new guidance, or evidence that precautions are operationally infeasible.</p></div>';
      const a=document.createElement("div");a.className="actions";a.append(mkButton("Back to S0",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S0"})),mkButton("Next: S2 · Intervention Pressure",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S2"}),true));main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-S2"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · STATE S2</div><h2>Intervention Pressure</h2><p>Cases rise on two units, staffing absences increase, administration proposes facility-wide visitation suspension, families object, one cognitively impaired resident stops eating reliably, and staff report increased fall risk under room isolation.</p><h3>The question changes</h3><p>What may legitimately be done, by whom, to whom, for how long, and under what review conditions?</p><h3>Activated Tools</h3><p>T06 Legitimacy / Standing · T08 Respect / Autonomy · T09 Consequence / Harm · T12 Effective Capability · T10 Background Power</p><h3>Translation problem</h3><p><strong>Clinical:</strong> reduce contact. <strong>Resident-life:</strong> remove familiar people, routines, touch, advocacy, and orientation. <strong>Operational:</strong> increase staff burden because staff replace functions families were providing. These descriptions are not identical.</p><p class="warning"><strong>Benefit ≠ authorization.</strong></p><p><strong>Uniform rule ≠ equal practical burden.</strong></p><h3>Bounded judgment</h3><p>A facility-wide restriction may be provisionally justified under high transmission pressure, but current evidence does not license treating its burden as equal, harmless, or indefinitely acceptable.</p><h3>REOPEN</h3><p>Case growth slows, staffing improves, resident harm rises, safe caregiver access becomes feasible, testing narrows affected units, or implementation proves counterproductive.</p></div>';
      const a=document.createElement("div");a.className="actions";a.append(mkButton("Back to S1",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S1"})),mkButton("Next: S3 · Revised Judgment",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S3"}),true));main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-S3"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · STATE S3</div><h2>Revised Bounded Judgment</h2><p>New cases decline, one unit remains affected, staffing begins to recover, resident distress and deconditioning become more visible, and PPE-supported essential caregiver visits appear workable.</p><h3>Map revision</h3><p>The emergency justification weakens while intervention burdens become more visible. The shared task shifts from emergency suppression toward differentiated recovery.</p><h3>Activated Tools</h3><p>T01 First Map Audit · T06 Legitimacy / Standing · T09 Consequence / Harm · T12 Effective Capability · T02 Reason-Giving Audit</p><h3>Revised bounded judgment</h3><p>Current conditions no longer justify maintaining the original facility-wide restriction in its initial form. Restrictions should narrow toward affected units and resident-specific risk, while safe caregiver access and capability-restoring supports expand.</p><p class="warning"><strong>Improved conditions ≠ final closure.</strong></p><h3>Historical backtest contribution</h3><p>If Gulf Pines also exhibited low staffing and weak inspection history, that profile would justify deeper investigation of structural resilience. It would not establish that those factors caused the outbreak.</p><p><strong>Structural warning ≠ retrospective blame.</strong></p><h3>Authorial Return</h3><p>The Joint Task Space returns updated evidence, changed burdens, revised standing, narrowed authorization, remaining uncertainty, structural repair questions, and explicit REOPEN conditions to the legitimate human decision-makers.</p></div>';
      const a=document.createElement("div");a.className="actions";a.append(mkButton("Back to S2",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S2"})),mkButton("Return to pilot overview",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),mkButton("Inspect Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"})));main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-STANDING"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · LAYER 2</div><h2>Standing and Authorization</h2><p>The word <strong>stakeholder</strong> is too weak for a governed Joint Task Space. It hides crucial differences among who knows, who is affected, who may recommend, who may authorize, who can implement, and who must review.</p><p class="warning"><strong>Stake ≠ expertise ≠ standing ≠ authority ≠ practical power ≠ authorization.</strong></p><h3>Six governance relations</h3><p><strong>Evidential authority:</strong> what kind of claim is this participant especially qualified to support?</p><p><strong>Moral standing:</strong> whose interests, burdens, agency, dignity, or capabilities must count directly?</p><p><strong>Legal / institutional authority:</strong> who is empowered by law, regulation, policy, role, or delegation?</p><p><strong>Recommendation standing:</strong> who may legitimately recommend?</p><p><strong>Authorization standing:</strong> who may convert a recommendation into a binding action?</p><p><strong>Practical implementation power:</strong> who can actually make the action happen?</p><h3>Action-state grammar</h3><p><strong>GENERATED → POSSIBLE → RECOMMENDED → AUTHORIZED → IMPLEMENTED → REVIEWED</strong></p><p class="warning"><strong>Generated ≠ Possible ≠ Recommended ≠ Authorized ≠ Implemented ≠ Reviewed.</strong></p><h3>Participant profiles</h3><p><strong>Residents:</strong> primary moral standing; strong evidential authority regarding lived burden and preferences; practical power may be low without reducing standing.</p><p><strong>Families / supporters:</strong> potentially strong longitudinal knowledge and advocacy; authorization only where valid proxy or legal role applies.</p><p><strong>Frontline staff:</strong> strong evidential authority regarding feasibility, workflow, resident changes, and near misses; implementation responsibility does not imply policy authority.</p><p><strong>Clinical leadership:</strong> strong clinical/infection-control expertise and recommendation standing; not total authorization over all ethical or relational burdens.</p><p><strong>Administration:</strong> substantial operational authority, bounded by law, rights, professional duties, evidence, and feasibility.</p><p><strong>Regulators / public health:</strong> high authority within jurisdiction, but incomplete local knowledge.</p><p><strong>Empirical analysts / data systems:</strong> evidential contribution only by default; analytic output is not decision authority.</p><h3>State-by-state standing shift</h3><p><strong>S0 — Early Signal:</strong> clinical and frontline observation dominate the immediate evidence question; only bounded precautionary authority is justified.</p><p><strong>S1 — Widening Map:</strong> resident burden, family knowledge, and frontline feasibility gain standing as the map expands.</p><p><strong>S2 — Intervention Pressure:</strong> recommendation and authorization separate sharply. This is the strongest test of legitimacy, rights, burden, and role-bounded authority.</p><p><strong>S3 — Revised Judgment:</strong> emergency authorization must be reconsidered as its supporting conditions decay.</p><p class="warning"><strong>Past authorization ≠ present authorization.</strong></p><h3>Authorization audit</h3><p>Before a consequential action becomes authorized, ask: What is being authorized? Who is affected? Who recommended it? What evidence supports it? Who may authorize it? What rights constrain it? Can it actually be implemented? What burdens follow? What is the claim ceiling? When does authorization expire or require review? What would REOPEN it?</p><h3>Authorization expiry</h3><p>Consequential authorization should be time-, evidence-, threshold-, condition-, event-, or review-bounded rather than silently becoming permanent.</p><p class="warning"><strong>Authorization without review ≠ governed authorization.</strong></p><h3>Core result</h3><p>A Joint Task Space does not merely collect voices. It governs the relations among evidence, standing, recommendation, authorization, implementation, and review.</p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Gulf Pines pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("S0 · Early Signal",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S0"})),
        mkButton("S1 · Widening Map",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S1"})),
        mkButton("S2 · Intervention Pressure",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S2"})),
        mkButton("S3 · Revised Judgment",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S3"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-TRANSLATION"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · LAYER 3</div><h2>Translation and Remainder</h2><p>A Joint Task Space must let clinical, resident, family, staffing, regulatory, ethical, administrative, and empirical contributions interact without pretending they are the same kind of object.</p><p class="warning"><strong>Translation ≠ identity. Shared field ≠ shared ontology.</strong></p><h3>Translation object</h3><p>A consequential cross-domain contribution may expose: source domain, source actor, source object, source representation, provenance, observation status, inference status, assumptions, translation target, translated representation, remainder, claim ceiling, standing, recommendation status, authorization status, REOPEN conditions, and Return target.</p><h3>Observation and inference</h3><p>DIRECT_OBSERVATION, REPORTED_OBSERVATION, MEASURED_DATA, MODEL_OUTPUT, INFERENCE, HYPOTHESIS, NORMATIVE_JUDGMENT, POLICY_STIPULATION, and LEGAL_REQUIREMENT remain distinct.</p><p class="warning"><strong>Temporal sequence ≠ established cause.</strong></p><h3>Remainder</h3><p>Remainder records what cannot be carried cleanly into the shared representation without loss, controversy, uncertainty, or distortion. Canonical statuses include NONE_IDENTIFIED, DOMAIN_NATIVE_ONLY, PARTIALLY_TRANSLATED, CONTESTED, UNKNOWN, and DEFERRED.</p><p><strong>Untranslated remainder ≠ irrelevant remainder.</strong></p><h3>Domain translations</h3><p><strong>Clinical/public health:</strong> infection evidence → outbreak-risk claim; remainder includes individual prognosis and future pathogen behavior.</p><p><strong>Resident experience:</strong> lived burden → capability and dignity effect; remainder includes irreducible first-person meaning.</p><p><strong>Family knowledge:</strong> longitudinal observation → perspective/provenance contribution; remainder includes proxy limits and disagreement.</p><p><strong>Frontline staffing:</strong> feasibility/workload → implementation-capacity constraint; remainder includes informal adaptation and morale.</p><p><strong>Regulation:</strong> rule/mandate → authorization boundary; remainder includes moral sufficiency and local fit.</p><p><strong>Historical data:</strong> association/matched contrast → structural warning; remainder includes causality and facility-specific prediction.</p><h3>State-by-state translation pressure</h3><p><strong>S0:</strong> symptom observations must not become a premature facility-wide outbreak diagnosis.</p><p><strong>S1:</strong> resident burden, family knowledge, and staffing feasibility must enter a clinically framed problem without being reduced to clinical variables.</p><p><strong>S2:</strong> “reduce contact” must not silently become an authorized uniform policy.</p><p><strong>S3:</strong> changed evidence and visible intervention harms must flow back into revised authorization.</p><h3>Translation-loss audit</h3><p>Ask: What source object is being translated? What was preserved? What was compressed? What was lost or left as remainder? Did the translation silently strengthen the claim?</p><p class="warning"><strong>Readable summary ≠ exhaustive representation.</strong></p><h3>Remainder debt</h3><p>A remainder may be deferred temporarily, but repeated deferral can accumulate into <strong>remainder debt</strong>. Resident distress, informal family care, staffing skill mix, or local feasibility can become systematically invisible if they are repeatedly postponed because they are hard to quantify.</p><p class="warning"><strong>Deferred remainder ≠ resolved remainder.</strong></p><h3>Repair</h3><p>Translation repair may require representation repair, vocabulary repair, standing repair, remainder repair, routing back to the source domain, or—if failures recur—grammar-level REOPEN.</p><h3>Core result</h3><p>A Joint Task Space succeeds not when every domain says the same thing, but when differences can travel without becoming invisible.</p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Gulf Pines pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("Standing / Authorization",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-STANDING"})),
        mkButton("S0 · Early Signal",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S0"})),
        mkButton("S2 · Intervention Pressure",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S2"})),
        mkButton("Deep / Formal Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-REPAIR"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · LAYER 4</div><h2>Repair, Strategy Families, and Sequencing</h2><p>A Joint Task Space can diagnose a problem correctly and still fail at action. Layer 4 governs how inquiry moves from diagnosed pressure toward repair without collapsing generation, recommendation, authorization, implementation, and review.</p><p class="warning"><strong>Diagnosis ≠ repair.</strong></p><p><strong>Generated option ≠ recommended option ≠ authorized option ≠ implemented option.</strong></p><h3>Strategy families</h3><p><strong>Clinical / infection-control:</strong> testing, cohorting, PPE, ventilation, monitoring, escalation.</p><p><strong>Staffing / capacity:</strong> contingency staffing, schedule redesign, skill-mix protection, workload triage, external support.</p><p><strong>Resident capability:</strong> communication support, safe-contact alternatives, mobility support, individualized visitation exceptions.</p><p><strong>Family / relational:</strong> designated contacts, caregiver exceptions, structured updates, access support.</p><p><strong>Institutional / governance:</strong> escalation rules, standing map, review group, authorization expiry, burden review, REOPEN schedule.</p><p><strong>Structural / post-crisis:</strong> staffing resilience, inspection-history review, resource/ownership analysis, physical plant, emergency reserve, training.</p><h3>Sequencing grammar</h3><p><strong>stabilize immediate harm → restore visibility → restore minimum capability → repair implementation constraints → revise authorization → address structural causes → monitor → REOPEN</strong></p><p>The sequence is dependency-aware, not universal.</p><h3>Four sequencing tests</h3><p><strong>Prerequisite:</strong> what must already be true?</p><p><strong>Dependency:</strong> what other repair does this rely on?</p><p><strong>Conflict:</strong> does this repair undermine another legitimate objective?</p><p><strong>Order:</strong> does doing this first close off a better later option?</p><h3>Reversibility</h3><p>Repairs may be HIGHLY_REVERSIBLE, REVERSIBLE_WITH_COST, PARTIALLY_REVERSIBLE, DIFFICULT_TO_REVERSE, or IRREVERSIBLE.</p><p class="warning"><strong>Reversible ≠ automatically preferable.</strong></p><p>The governing question is: <strong>What is the cost of being wrong in each direction?</strong></p><h3>Repair bundles</h3><p>Complex problems often require coherent bundles rather than one “best” intervention. Example: unit-specific precautions + night-shift reinforcement + safe caregiver exceptions + daily family updates + 72-hour authorization review.</p><p><strong>Individually reasonable repairs ≠ jointly coherent bundle.</strong></p><h3>State-specific sequencing</h3><p><strong>S0:</strong> verify signal, protect immediate exposure, assess staffing reserve, prepare escalation.</p><p><strong>S1:</strong> preserve infection-control minimums, identify high-burden residents, repair staffing and communication bottlenecks, differentiate where evidence allows.</p><p><strong>S2:</strong> define emergency objective, identify least-burden adequate intervention, secure implementation capacity, authorize explicitly, set expiry, monitor disease and intervention harms.</p><p><strong>S3:</strong> remove no-longer-justified restrictions, restore lost capabilities, continue surveillance, conduct structural review, preserve re-escalation criteria.</p><h3>Action states</h3><p><strong>GENERATED → POSSIBLE → RECOMMENDED → AUTHORIZED → IMPLEMENTED → REVIEWED</strong></p><p class="warning"><strong>A good idea can fail at any transition.</strong></p><h3>Stop conditions</h3><p>Consequential repairs should specify when to stop: excessive burden, unsafe staffing, loss of evidence support, superior alternative, changed legal standing, threshold harm, or implementation failure.</p><h3>Repair debt</h3><p>Temporary workarounds can sediment into hidden permanent structures. Repeated overtime, informal family-care substitution, or ad hoc exceptions can accumulate into <strong>repair debt</strong>.</p><p><strong>Temporary workaround ≠ completed repair.</strong></p><h3>Core result</h3><p>FSP does not move from problem to solution. It moves from diagnosed pressure to governed strategy families, sequenced repair, bounded authorization, monitored implementation, and REOPEN.</p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Gulf Pines pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("Standing / Authorization",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-STANDING"})),
        mkButton("Translation / Remainder",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-TRANSLATION"})),
        mkButton("S2 · Intervention Pressure",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S2"})),
        mkButton("S3 · Revised Judgment",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S3"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-INSTITUTIONAL"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · LAYER 5</div><h2>Institutional Amplification and Regulatory REOPEN</h2><p>A bounded judgment changes when it becomes a facility rule, workflow, staffing default, quality metric, inspection category, reimbursement rule, emergency protocol, or other infrastructure.</p><p class="warning"><strong>Local usefulness ≠ safe institutional amplification.</strong></p><p><strong>Supported local judgment ≠ universally appropriate rule.</strong></p><h3>Two amplification levels</h3><p><strong>Facility amplification:</strong> a local judgment becomes repeated policy, workflow, exception process, reporting requirement, or care default.</p><p><strong>Governmental / regulatory amplification:</strong> recurring local patterns become survey priorities, reporting standards, staffing requirements, quality measures, reimbursement incentives, or broader rules.</p><h3>Institutional sedimentation</h3><p>Temporary rules can persist because forms, software, training, metrics, incentives, and habits preserve them after the original rationale weakens.</p><p class="warning"><strong>Repeated use ≠ continuing justification.</strong></p><h3>Amplification risks</h3><p>Scale blindness · context stripping · metric substitution · exception erasure · burden export · authority inflation · feedback suppression.</p><h3>Upward translation</h3><p>A single Gulf Pines event should not determine regulation. It can, however, generate structured upward evidence: LOCAL_OBSERVATION, LOCAL_INFERENCE, LOCAL_BOUNDED_JUDGMENT, IMPLEMENTATION_EFFECT, BURDEN_EFFECT, EXCEPTION_PATTERN, REMAINDER, STRUCTURAL_WARNING, and POSSIBLE_SYSTEMIC_PATTERN.</p><p class="warning"><strong>Local case ≠ population rule.</strong></p><p><strong>Repeated local signal ≠ causal identification.</strong></p><h3>Regulatory REOPEN</h3><p>Rules and procedures should be eligible for review when implementation repeatedly fails, burdens concentrate systematically, exceptions become common, metrics stop tracking the intended capability, workarounds become routine, evidence changes, or cross-agency rules conflict.</p><p><strong>REOPEN ≠ rejection.</strong></p><p>Possible outcomes include retain, clarify, narrow, expand, add exception pathway, change metric, change evidence threshold, alter review cycle, add local discretion, strengthen minimum protection, redesign support, sunset, or replace.</p><h3>Claim ceiling for upward learning</h3><p>Local or historical evidence may justify inquiry, audit, targeted study, pilot revision, public comment, comparator analysis, or rule review. It does not by itself justify a universal causal claim or a national mandate.</p><p class="warning"><strong>Evidence sufficient to REOPEN ≠ evidence sufficient to replace.</strong></p><h3>Multi-level learning loop</h3><p><strong>resident/frontline event → facility observation → local Joint Task Space → bounded intervention → implementation effects → structured feedback packet → facility review → state/regional aggregation → comparator analysis → regulatory inquiry → pilot/guidance/rule review → revised environment → local implementation → new evidence → REOPEN</strong></p><h3>Metric governance</h3><p>Metrics are necessary but lossy. Ask what capability the metric is intended to track, what can improve the metric without improving the capability, who becomes invisible, what gaming incentives appear, and what threshold should trigger metric REOPEN.</p><p><strong>Metric improvement ≠ capability improvement.</strong></p><h3>Regulatory remainder debt</h3><p>When family care, resident capability burden, frontline workarounds, staffing skill mix, or exception frequency remain systematically unrepresented, the regulatory map can become technically consistent but practically incomplete.</p><p class="warning"><strong>Regulatory consistency ≠ representational adequacy.</strong></p><h3>Core result</h3><p>Institutional amplification turns judgments into environments. FSP therefore governs not only whether a judgment is warranted, but what happens when that judgment becomes infrastructure—and how infrastructure remains open to evidence-driven repair.</p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Gulf Pines pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("Standing / Authorization",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-STANDING"})),
        mkButton("Translation / Remainder",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-TRANSLATION"})),
        mkButton("Repair / Strategy",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-REPAIR"})),
        mkButton("Institutions & Connected Doing",()=>go({kind:"NODE",id:"DOMAIN-INSTITUTIONS-CONNECTED-DOING"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-FLNH-INTEGRATION"){
      main.innerHTML='<div class="panel"><div class="muted">GULF PINES · FIVE-LAYER INTEGRATION</div><h2>One Issue Through the Full Joint Task Space</h2><p>This walkthrough follows one pressure point—<strong>visitation restriction during active outbreak conditions</strong>—through all five layers. The purpose is to show one inquiry moving vertically, not five separate modules.</p><h3>Layer 1 — State</h3><p><strong>Question:</strong> What changed?</p><p>At S2, active transmission, staffing strain, resident isolation harm, family concern, and regulatory duties create a new decision pressure.</p><p><strong>Output:</strong> current state, uncertainty, affected actors, decision requiring authorization.</p><p><strong>Do not carry forward:</strong> assumed legitimacy or policy scope.</p><h3>Layer 2 — Standing / Authorization</h3><p><strong>Question:</strong> Who may know, recommend, authorize, implement, and review?</p><p>Clinical leadership may recommend; residents hold primary moral standing; families contribute longitudinal knowledge; frontline staff supply feasibility evidence; administration may authorize within rights and regulation; regulators define lawful boundaries.</p><p class="warning"><strong>Clinical expertise ≠ total authorization.</strong></p><h3>Layer 3 — Translation / Remainder</h3><p><strong>Question:</strong> What travels, and what is lost?</p><p>“Reduce high-risk contact” can become “suspend visitation,” but that translation must retain resident capability burden, informal family care, staffing substitution burden, and uncertainty about marginal transmission reduction.</p><p class="warning"><strong>Translation ≠ identity.</strong></p><h3>Layer 4 — Repair / Sequencing</h3><p><strong>Question:</strong> What repair can be tried, in what order, under what bounds?</p><p>The binary choice “open vs closed” becomes a bundle: unit-specific precautions, staffing reinforcement, essential-caregiver exceptions, communication support, and 72-hour review.</p><p><strong>GENERATED → POSSIBLE → RECOMMENDED → AUTHORIZED → IMPLEMENTED → REVIEWED</strong></p><p class="warning"><strong>Generated ≠ Recommended ≠ Authorized.</strong></p><h3>Layer 5 — Institutional Amplification</h3><p><strong>Question:</strong> What happens if the local repair becomes policy or infrastructure?</p><p>The facility must inspect sedimentation, exception patterns, metrics, burden distribution, and whether local implementation evidence should travel upward into regulatory inquiry.</p><p><strong>Evidence sufficient to REOPEN ≠ evidence sufficient to replace.</strong></p><h3>Return to REOPEN</h3><p>Implementation produces new evidence. If transmission declines, staffing recovers, burden rises, or policy effects diverge from expectations, the inquiry returns to a changed state rather than proceeding toward closure.</p><p><strong>S2 decision → implementation → effects → REOPEN → S3 revised bounded judgment.</strong></p><h3>Non-duplication rule</h3><p><strong>Layer 1 owns:</strong> what changed.<br><strong>Layer 2 owns:</strong> who may do what.<br><strong>Layer 3 owns:</strong> what travels and what remains.<br><strong>Layer 4 owns:</strong> repair family and order.<br><strong>Layer 5 owns:</strong> what changes when the judgment scales.</p><h3>Carry-forward contract</h3><p><strong>1→2:</strong> state, pressure, uncertainty, affected actors.<br><strong>2→3:</strong> source roles, standing, recommendation/authorization state.<br><strong>3→4:</strong> translated problem, provenance, remainder, claim ceiling.<br><strong>4→5:</strong> implemented repair, scope, expiry, metrics, observed effects, exceptions.<br><strong>5→REOPEN:</strong> changed conditions, institutional effects, recurring failures, new evidence.</p><p class="warning"><strong>Five-layer pass ≠ final closure.</strong></p><h3>Compact integrated grammar</h3><p><strong>STATE → STANDING → TRANSLATION → REPAIR → AMPLIFICATION → REOPEN</strong></p><p>A usable Joint Task Space is one corrigible inquiry in which these functions remain distinct but continuously communicate.</p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Gulf Pines pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("Layer 1 · States",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-S2"})),
        mkButton("Layer 2 · Standing",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-STANDING"})),
        mkButton("Layer 3 · Translation",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-TRANSLATION"})),
        mkButton("Layer 4 · Repair",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-REPAIR"})),
        mkButton("Layer 5 · Amplification",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-INSTITUTIONAL"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-INTEGRATION-GATE-1"){
      main.innerHTML='<div class="panel"><div class="muted">JOINT TASK SPACE · INTEGRATION FREEZE GATE</div><h2>Joint Task Space Integration Gate</h2><p><strong>Verdict: PASS — PROVISIONAL FREEZE.</strong></p><p>This gate tests whether the five-layer Gulf Pines architecture functions as one usable, corrigible Joint Task Space rather than five adjacent modules.</p><h3>Frozen ownership</h3><p><strong>State:</strong> what changed?<br><strong>Standing:</strong> who may know, recommend, authorize, implement?<br><strong>Translation:</strong> what travels, what is compressed, what remains?<br><strong>Repair:</strong> what can be tried, bundled, ordered, stopped?<br><strong>Amplification:</strong> what happens when judgment becomes policy, metric, default, or regulation?</p><h3>Carry-forward invariant</h3><p><strong>No layer may inherit a stronger claim than the prior layer licensed.</strong></p><h3>Compression gate</h3><p><strong>Quick:</strong> what changed → who may decide → what repair → what would REOPEN.</p><p><strong>Standard:</strong> adds state history, standing partition, translation/remainder, sequencing, authorization expiry, institutional effects.</p><p><strong>Deep:</strong> adds full provenance, formal objects, remainder debt, action-state transitions, amplification, and grammar-level REOPEN.</p><p class="warning"><strong>Progressive disclosure ≠ semantic mutation.</strong></p><h3>Return integrity</h3><p>Every deep route must preserve a way back to the Gulf Pines case, the relevant state, and the bounded human decision context.</p><p><strong>Inspection depth must not erase lived context.</strong></p><h3>REOPEN integrity</h3><p>A valid REOPEN needs a trigger, changed condition, target layer or state, preserved provenance, and bounded reason for revision.</p><p class="warning"><strong>Current judgment ≠ final closure.</strong></p><h3>Anti-pipeline rule</h3><p>The five layers are routable governance functions, not a mandatory linear checklist. A case may move Layer 5 → Layer 3, Layer 4 → Layer 2, or Layer 2 → REOPEN when the topology requires it.</p><h3>Governance-load rule</h3><p><strong>More governance ≠ better governance.</strong> Quick, Standard, and Deep projections should be used according to stakes and complexity.</p><h3>Freeze invariants</h3><p>State ≠ Standing · Standing ≠ Translation · Translation ≠ Repair · Repair ≠ Authorization · Authorization ≠ Implementation · Implementation ≠ Success · Local success ≠ safe institutional amplification · Shared grammar ≠ shared ontology · Remainder remains representable · Claim ceilings survive movement · Return and REOPEN remain intact.</p><h3>What the PASS licenses</h3><p>Gulf Pines may now serve as the canonical Joint Task Space reference implementation and the five-layer grammar may be used as the comparator baseline for a second domain.</p><h3>What the PASS does not license</h3><p>It does not establish universal applicability, optimality, empirical superiority, or that every case needs all five layers.</p><h3>Reopen conditions</h3><p>Reopen this freeze if a comparator domain cannot fit without distortion, layers duplicate one another, Quick compression changes meaning, standing is lost in translation, repair bypasses authorization, institutional feedback cannot return, remainder cannot be represented, governance burden becomes excessive, or a new primitive is repeatedly required.</p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Five-Layer Integration",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-INTEGRATION"}),true),
        mkButton("Gulf Pines Pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"})),
        mkButton("Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS-COMPARATOR-1"){
      main.innerHTML='<div class="panel"><div class="muted">JOINT TASK SPACE · CROSS-DOMAIN COMPARATOR</div><h2>Asteria-2047</h2><p><strong>Verdict: PASS — PORTABLE WITH PRESSURE.</strong></p><p>Asteria-2047 is a fictional planetary-defense scenario used to test whether the Gulf Pines five-layer grammar survives a radically different inquiry topology: decades-long uncertainty, distributed international authority, model dependence, future-person standing, possible irreversibility, and cross-border risk transfer.</p><h3>Scenario</h3><p>A newly discovered near-Earth object may impact Earth in 2047. Current probability is material but uncertain; physical composition is incompletely known; intervention works better with lead time; waiting improves information but may reduce options.</p><h3>Layer 1 — State</h3><p>The state is partly a distribution over possible futures rather than a simple description of present conditions. Probability, orbit uncertainty, time remaining, model sensitivity, physical characterization, intervention windows, and geographic risk corridor all matter.</p><p class="warning"><strong>Nontrivial probability ≠ predicted impact.</strong></p><h3>Layer 2 — Standing</h3><p>Scientific expertise, national authority, international coordination, affected populations, lower-capacity states, and future persons all have different forms of standing and authority.</p><p><strong>Low technical capability ≠ low standing.</strong></p><h3>Layer 3 — Translation</h3><p>Observation → orbit model → impact probability → risk corridor → consequence forecast → mission recommendation. Each transition adds assumptions and remainder.</p><p class="warning"><strong>Observation ≠ orbit model ≠ impact probability ≠ policy recommendation.</strong></p><h3>Layer 4 — Repair</h3><p>Observation, reconnaissance, deflection, consequence management, governance, and research strategies must be sequenced under a tension between better information and shrinking intervention time.</p><p><strong>More information ≠ always better if waiting destroys intervention options.</strong></p><p><strong>Global expected-risk reduction ≠ legitimate unilateral risk transfer.</strong></p><h3>Layer 5 — Amplification</h3><p>Notification thresholds, mission-planning thresholds, national protocols, funding rules, model standards, and communication practices can become institutional infrastructure and require REOPEN as technology and evidence change.</p><p><strong>Threshold crossing ≠ complete decision justification.</strong></p><h3>New stressors</h3><p>Probabilistic standing · future-person standing · risk transfer · model plurality · distributed Return.</p><p>These stress the existing layers but do not yet require a sixth layer.</p><h3>Comparator result</h3><p>Gulf Pines and Asteria differ radically in scale, time horizon, evidence, authority, affected populations, reversibility, and model dependence, yet both remain governable through <strong>STATE → STANDING → TRANSLATION → REPAIR → AMPLIFICATION → REOPEN</strong>.</p><p class="warning"><strong>This does not establish universal portability.</strong></p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Gulf Pines Integration",()=>go({kind:"NODE",id:"FSP-JTS-FLNH-INTEGRATION"}),true),
        mkButton("Integration Freeze Gate",()=>go({kind:"NODE",id:"FSP-JTS-INTEGRATION-GATE-1"})),
        mkButton("Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"})),
        mkButton("Inquiry & Science",()=>go({kind:"NODE",id:"DOMAIN-SCIENCE-INQUIRY"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-ENCYCLOPEDIA-COHERENCE-AUDIT-1"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · PUBLIC COHERENCE GATE</div><h2>Whole-Encyclopedia Coherence Audit</h2><p><strong>Verdict: PASS — coherent with targeted repairs.</strong></p><p>The audit tests whether a first-time reader can move through the public architecture without knowing the project’s development history.</p><h3>Canonical public spine</h3><p><strong>HOME → WHY FSP? → DOMAIN → WORKED CASE → CORE / FORMAL → RETURN</strong></p><h3>Reader questions</h3><p>What is this? Why does it exist? Where do I go? What does each domain contribute? Can I see it working? How deep do I need to go? What is Core? What is Formal? Can I return? What remains uncertain?</p><h3>Top-level navigation</h3><p>Encyclopedia Home · Domains · Core · Resources · Routes · About · Why FSP? · Critical Thinking</p><p><strong>Critical Thinking remains an entrance, not the universal front door.</strong></p><h3>Depth integrity</h3><p><strong>Quick</strong> preserves purpose, uncertainty, standing, claim ceiling, REOPEN, and Return.<br><strong>Standard</strong> adds Joint Task Space, translation, remainder, repair, authorization, and institutional effects.<br><strong>Deep</strong> adds provenance, typed objects, invariants, regression gates, and grammar-level REOPEN.</p><p class="warning"><strong>Progressive disclosure ≠ semantic mutation.</strong></p><h3>Canonical ownership</h3><p><strong>One canonical owner, many projections.</strong> Domains and course routes may project a concept, Tool, or claim ceiling without silently redefining it.</p><h3>Development-history firewall</h3><p>Commit chronology, PROD labels, acceptance-run history, migration history, and internal build names remain useful for development and audit but should not be reader prerequisites.</p><p><strong>Development provenance ≠ reader prerequisite.</strong></p><h3>Current targeted repairs</h3><p>Human-readable Tool labels should increasingly precede codes; worked-case entrances should remain prominent; Aesthetics should remain honestly planned; Logic & Argument still lacks a dedicated public executable explorer; History of Philosophy remains externally routed; depth labels should remain consistent; public pages should continue reducing build-code exposure.</p><h3>Claim ceiling</h3><p>Architectural coherence does not establish universal usability, accessibility certification, empirical learning gains, or public comprehension without user testing.</p><p class="warning"><strong>Architectural coherence ≠ empirical validation.</strong></p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Encyclopedia Home",()=>go({kind:"NODE",id:"FSP-HOME"}),true),
        mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"})),
        mkButton("Browse Domains",()=>go({kind:"NODE",id:"FSP-DOMAINS"})),
        mkButton("About",()=>go({kind:"NODE",id:"FSP-ABOUT"})),
        mkButton("Formal & Executable",()=>go({kind:"NODE",id:"DOMAIN-FORMAL-EXECUTABLE"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-TRANSLATION"){
      main.innerHTML='<div class="panel"><div class="muted">DEEP · FORMAL GOVERNANCE</div><h2>Translation Governance and Cross-Domain Interoperability</h2><p>The Deep layer treats translation as a governed object rather than a neutral transfer. Its purpose is to make cross-domain movement inspectable enough that provenance, limits, authority, and correction conditions do not disappear when information travels.</p><h3>Translation object</h3><p>A cross-domain representation may expose: source domain, source object, source representation, provenance, observation status, inference status, assumptions, translation target, translated representation, remainder, claim ceiling, standing, recommendation status, authorization status, REOPEN conditions, and Return target.</p><p>Not every domain must populate every field. <strong>Unknown</strong>, <strong>not applicable</strong>, and <strong>not yet represented</strong> must remain distinguishable.</p><h3>Core invariants</h3><p>1. Provenance must not disappear through translation.<br>2. Translation may compress but must not silently strengthen a claim.<br>3. Remainder must be recordable.<br>4. Source-domain meaning must remain recoverable.<br>5. Standing must not be inferred from expertise alone.<br>6. Recommendation must not silently become authorization.<br>7. Shared field names must not imply ontological identity.<br>8. Institutional amplification requires renewed claim-ceiling review.<br>9. Consequential cross-domain transfers preserve REOPEN conditions.<br>10. Deep inspection preserves a Return path.</p><h3>Remainder</h3><p><strong>Remainder</strong> is what cannot be carried cleanly into the shared representation without loss, controversy, uncertainty, or distortion. Possible statuses include DOMAIN_NATIVE_ONLY, PARTIALLY_TRANSLATED, CONTESTED, UNKNOWN, and DEFERRED.</p><p class="warning"><strong>Untranslated remainder ≠ irrelevant remainder.</strong></p><h3>Standing</h3><p>Standing is represented separately from knowledge, expertise, causal power, institutional role, practical ability, and legitimacy. A participant may know something without being authorized to decide; an institution may possess authority without making every associated factual claim true.</p><h3>Authorization states</h3><p><strong>GENERATED → POSSIBLE → RECOMMENDED → AUTHORIZED → IMPLEMENTED → REVIEWED</strong></p><p class="warning"><strong>Generate ≠ Recommend ≠ Authorize.</strong></p><h3>Interoperability criterion</h3><p>Two domains are sufficiently interoperable for a task when participants can recover what the other domain is claiming, what supports it, what assumptions travel, what does not travel, what remains uncertain, who has standing, what action status applies, and what would trigger revision.</p><p><strong>Interoperability does not require conceptual identity.</strong></p><h3>Grammar-level REOPEN</h3><p>The shared grammar itself must reopen under recurring translation loss, domain-native mismatch, false equivalence, standing error, excessive complexity, omitted actors or capabilities, failed adversarial cases, unusable public projections, repeated workarounds, or framework-induced closure.</p><p><strong>detect failure → localize layer → classify failure → attempt smallest repair → preserve invariants → rerun regressions → retain or reopen canonical grammar</strong></p><p class="warning"><strong>Formal translatability ≠ exhaustive representability.</strong></p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Open the Florida pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
        mkButton("Return to Standard explanation",()=>go({kind:"NODE",id:"FSP-JTS"})),
        mkButton("FSP Constitution",()=>go({kind:"NODE",id:"FSP-CONSTITUTION"})),
        mkButton("Encyclopedia Home",()=>go({kind:"NODE",id:"FSP-HOME"}))
      );
      main.append(a);return;
    }

    if(id==="CT-HOME"){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Browse critical-thinking entries</h3><p class=\"muted\">Choose by question and concept. Stable IDs remain visible for reference, but are not the primary labels.</p>";
      const grid=document.createElement("div");grid.className="grid";
      for(const rid of n.relatedIds||[]){
        const item=byId("nodes",rid); if(!item)continue;
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<div class=\"muted\">"+esc(item.id)+"</div><strong>"+esc(item.title)+"</strong><p>"+esc(item.summary)+"</p>";
        c.append(mkButton("Open "+item.title,()=>go({kind:"NODE",id:item.id})));
        grid.append(c);
      }
      sec.append(grid);main.append(sec);
      const more=document.createElement("div");more.className="actions";
      more.append(
        mkButton("Browse Twelve Tools",()=>go({kind:"NODE",id:"CT-TOOLS"})),
        mkButton("Browse Failure Atlas",()=>go({kind:"NODE",id:"CT-FAILURES"})),
        mkButton("Browse Scientific Atlas",()=>go({kind:"NODE",id:"SCI-ATLAS"}))
      );
      main.append(more);
      return;
    }

    if(id==="FSP-CONSTITUTION"){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Browse constitutional principles</h3><p class=\"muted\">Choose by principle name. Stable IDs remain available as reference identifiers.</p>";
      const grid=document.createElement("div");grid.className="grid";
      for(const rid of n.relatedIds||[]){
        const item=byId("nodes",rid); if(!item)continue;
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<div class=\"muted\">"+esc(item.id)+"</div><strong>"+esc(item.title)+"</strong><p>"+esc(item.canonicalClaim)+"</p>";
        c.append(mkButton("Open "+item.title,()=>go({kind:"NODE",id:item.id})));
        grid.append(c);
      }
      sec.append(grid);main.append(sec);return;
    }

    if(id==="CT-FAILURES"){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Browse failure modes</h3><p class=\"muted\">Start from a recognizable reasoning symptom, then inspect the diagnostic question and Tool route.</p>";
      const grid=document.createElement("div");grid.className="grid";
      for(const rid of n.relatedIds||[]){
        const f=byId("failures",rid); if(!f)continue;
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<div class=\"muted\">"+esc(f.id)+"</div><strong>"+esc(f.title)+"</strong><p>"+esc(f.symptom)+"</p><p><em>"+esc(f.diagnosticQuestion)+"</em></p>";
        c.append(mkButton("Open "+f.title,()=>go({kind:"FAILURE",id:f.id})));
        grid.append(c);
      }
      sec.append(grid);main.append(sec);return;
    }

    if(id==="CT-TOOLS"){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Browse the twelve Tools</h3><p class=\"muted\">Choose by function and name; codes remain visible only as stable identifiers.</p>";
      const grid=document.createElement("div");grid.className="grid";
      for(const rid of n.relatedIds||[]){
        const t=byId("tools",rid);
        if(!t)continue;
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<div class=\"muted\">"+esc(t.id)+"</div><strong>"+esc(t.title)+"</strong><p>"+esc(t.function)+"</p>";
        c.append(mkButton("Open "+t.title,()=>go({kind:"TOOL",id:t.id})));
        grid.append(c);
      }
      sec.append(grid);main.append(sec);
      for(const cid of n.claimCeilingIds||[]){
        const ca=document.createElement("div");ca.className="actions";
        ca.append(mkButton("Claim ceiling "+cid,()=>{state=openClaimCeiling(state,registry,cid);render()}));
        main.append(ca);
      }
      return;
    }
    if(id==="SCI-ATLAS"){
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Browse the five scientific dossiers</h3><p class=\"muted\">Choose by case title; codes remain available as stable identifiers.</p>";
      const grid=document.createElement("div");grid.className="grid";
      for(const rid of n.relatedIds||[]){
        const cse=byId("cases",rid);
        if(!cse)continue;
        const c=document.createElement("div");c.className="card";
        c.innerHTML="<div class=\"muted\">"+esc(cse.id)+"</div><strong>"+esc(cse.title)+"</strong><p>"+esc(cse.question)+"</p>";
        c.append(mkButton("Open "+cse.title,()=>go({kind:"CASE",id:cse.id,caseId:cse.id})));
        grid.append(c);
      }
      sec.append(grid);main.append(sec);
      for(const cid of n.claimCeilingIds||[]){
        const ca=document.createElement("div");ca.className="actions";
        ca.append(mkButton("Claim ceiling "+cid,()=>{state=openClaimCeiling(state,registry,cid);render()}));
        main.append(ca);
      }
      return;
    }
    const a=document.createElement("div");a.className="actions";
    for(const rid of n.relatedIds||[]){
      const kind=rid.startsWith("CT-T")?"TOOL":rid.startsWith("CT-F")?"FAILURE":rid.startsWith("CASE-")?"CASE":"NODE";
      const obj=kind==="TOOL"?byId("tools",rid):kind==="FAILURE"?byId("failures",rid):kind==="CASE"?byId("cases",rid):byId("nodes",rid);
      a.append(mkButton("Open "+(obj?.title||rid),()=>go({kind,id:rid})));
    }
    for(const cid of n.claimCeilingIds||[]){const ce=byId("claimCeilings",cid);a.append(mkButton("Claim ceiling: "+(ce?.title||cid),()=>{state=openClaimCeiling(state,registry,cid);render()}));}
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
    for(const fid of t.failureIds){const f=byId("failures",fid);a.append(mkButton(f?.title||fid,()=>{state=openFailure(state,fid);render()}));}
    sec.append(a);main.append(sec);
  };

  const renderFailure=(main:HTMLElement,id:string)=>{
    const f=byId("failures",id);if(!f)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(f.id)+' · FAILURE ATLAS</div><h2>'+esc(f.title)+'</h2><p><strong>Symptom:</strong> '+esc(f.symptom)+'</p><p><strong>Diagnostic question:</strong> '+esc(f.diagnosticQuestion)+'</p></div>';
    const a=document.createElement("div");a.className="actions";
    const primary=byId("tools",f.primaryToolId);
    const primaryTitle=f.primaryToolId==="FSP-C05"?"REOPEN":(primary?.title||f.primaryToolId);
    a.append(mkButton("Open primary Tool: "+primaryTitle,()=>{
      if(f.primaryToolId==="FSP-C05")go({kind:"NODE",id:"FSP-C05"});
      else{state=openToolFromFailure(state,registry,id);render()}
    },true));
    for(const tid of f.secondaryToolIds){const t=byId("tools",tid);a.append(mkButton("Also inspect "+(t?.title||tid),()=>go({kind:"TOOL",id:tid})));}
    const ceiling=byId("claimCeilings",f.claimCeilingId);
    a.append(mkButton("Claim ceiling: "+(ceiling?.title||f.claimCeilingId),()=>{state=openClaimCeiling(state,registry,f.claimCeilingId);render()}));
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
    for(const ce of c.claimCeilingIds){const ceiling=byId("claimCeilings",ce);a.append(mkButton("Claim ceiling: "+(ceiling?.title||ce),()=>{state=openClaimCeiling(state,registry,ce,id);render()}));}
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
      ["NODE","FSP-HOME","Encyclopedia Home"],
      ["NODE","FSP-DOMAINS","Domains"],
      ["NODE","FSP-CONSTITUTION","Core"],
      ["NODE","FSP-RESOURCES","Resources"],
      ["NODE","FSP-ROUTES","Routes"],
      ["NODE","FSP-ABOUT","About"],
      ["NODE","FSP-FIREWALLS","Firewalls"],
      ["NODE","FSP-WHY","Why FSP?"],
      ["NODE","FSP-TRANSFORMATION-OBSERVATORY","Transformation Observatory"],
      ["NODE","FSP-TRANSFORMATION-WORKBENCH","TO Workbench"],
      ["NODE","CT-HOME","Critical Thinking"]
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
