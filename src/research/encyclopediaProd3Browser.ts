
import {ReaderState,RegistryLike,initialReaderState,navigate,back,openFailure,openToolFromFailure,openProbe,openSources,openClaimCeiling,validateRegistry} from "./encyclopediaProd3Model";
import {DOMAIN_PUBLIC_NAV} from "./fspEncyclopediaDomainNav";

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
  const registry=await loadRegistry() as AnyObj & RegistryLike;
  const validation=validateRegistry(registry);
  if(validation.length)throw new Error("registry validation failed: "+validation.join("; "));
  let state:ReaderState=initialReaderState();
  const byId=(collection:string,id:string)=>registry[collection].find((x:AnyObj)=>x.id===id);
  const go=(next:any)=>{state=navigate(state,next);render()};
  const goBack=()=>{state=back(state);render()};

  const renderNode=(main:HTMLElement,id:string)=>{
    const n=byId("nodes",id);if(!n)return renderMissing(main,id);
    main.innerHTML='<div class="panel"><div class="muted">'+esc(n.id)+' · '+esc(n.status)+'</div><h2>'+esc(n.title)+'</h2><p>'+esc(n.summary)+'</p><p><strong>Canonical claim:</strong> '+esc(n.canonicalClaim)+'</p></div>';
    if(id==="FSP-HOME"){
      main.innerHTML='<div class="panel"><div class="muted">FSP Encyclopedia · HOME</div><h2>Full-Stack Philosophy</h2><p>FSP makes the interacting layers of human inquiry inspectable without pretending that every domain has the same ontology, evidence, authority, or method.</p><p><strong>Why FSP?</strong> Human inquiry does not happen only inside arguments. We notice selectively, build partial maps, use specialized tools, make judgments, act through institutions, and revise when consequences or evidence resist our expectations.</p><p><strong>Notice → Inspect → Govern → Bound → REOPEN → Return</strong></p><p class="warning"><strong>Shared grammar ≠ shared ontology.</strong> FSP itself remains corrigible: <strong>FSP map ≠ inquiry itself.</strong></p></div>';
      const sec=document.createElement("section");sec.className="panel";sec.innerHTML="<h3>Explore the Encyclopedia</h3><p class=\"muted\">Begin with domains, shared core resources, course and research routes, or the short Why FSP? orientation.</p>";
      const grid=document.createElement("div");grid.className="grid";
      [
        ["FSP-DOMAINS","Domains","Enter Inquiry & Science, Ethics, History of Philosophy, Logic & Argument, Aesthetics, Institutions & Connected Doing, Core, and Formal / Executable FSP."],
        ["FSP-CONSTITUTION","Core","Inspect the thin constitutional grammar shared across domains without replacing their native ontologies."],
        ["FSP-RESOURCES","Resources","Browse cross-domain resources such as Why FSP?, Critical Thinking, Tools, Failure Atlas, and the Scientific Atlas."],
        ["FSP-ROUTES","Routes","Follow books, courses, laboratories, and workspaces through canonical resources."],
        ["FSP-ABOUT","About","See how the Encyclopedia is organized, governed, and kept corrigible."]
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
        const a=document.createElement("div");a.className="actions";a.append(mkButton("Browse Scientific Atlas",()=>go({kind:"NODE",id:"SCI-ATLAS"}),true));main.append(a);
      }else if(did==="FORMAL-EXECUTABLE"){
        const a=document.createElement("div");a.className="actions";a.append(mkButton("Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"}),true));main.append(a);
      }else if(did==="INSTITUTIONS-CONNECTED-DOING"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}),true),
          mkButton("Florida Nursing-Home Pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}))
        );main.append(a);
      }else if(did==="ETHICS"){
        const a=document.createElement("div");a.className="actions";a.append(
          mkButton("Florida Nursing-Home Joint Task Space",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"}),true),
          mkButton("Critical Thinking",()=>go({kind:"NODE",id:"CT-HOME"}))
        );main.append(a);
      }
      if(d.notYetClaimed.length){
        const n=document.createElement("section");n.className="panel";n.innerHTML="<h3>Current boundary</h3>";
        const ul=document.createElement("ul");for(const x of d.notYetClaimed){const li=document.createElement("li");li.textContent=x;ul.append(li)}n.append(ul);main.append(n);
      }
      return;
    }

    if(id==="FSP-RESOURCES"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · RESOURCES</div><h2>Resources</h2><p>Cross-domain resources expose shared governance concepts without replacing domain-native inquiry.</p></div>';
      const grid=document.createElement("div");grid.className="grid";
      [
        ["FSP-WHY","Why FSP?","A short orientation to the reason for the project."],
        ["FSP-JTS","Extended Critical Thinking & Joint Task Spaces","The Standard account of governed inquiry and cooperation without convergence."],
        ["FSP-TRANSLATION","Translation Governance","Deep/Formal treatment of provenance, remainder, standing, and interoperability."],
        ["CT-HOME","Critical Thinking","Traditional critical thinking extended into governed inquiry."],
        ["CT-TOOLS","Twelve Tools","Functional inquiry operators."],
        ["CT-FAILURES","Failure Atlas","Reasoning symptoms routed to repair."],
        ["SCI-ATLAS","Scientific Atlas","Five comparative inquiry dossiers."]
      ].forEach(([rid,label,desc])=>{const c=document.createElement("div");c.className="card";c.innerHTML="<strong>"+esc(label)+"</strong><p>"+esc(desc)+"</p>";c.append(mkButton("Open "+label,()=>go({kind:"NODE",id:rid})));grid.append(c)});
      main.append(grid);return;
    }

    if(id==="FSP-ROUTES"){
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · ROUTES</div><h2>Routes</h2><p>Books, courses, laboratories, and workspaces are routes through canonical resources. A route may select, compress, and sequence material without becoming a competing canonical owner.</p><p class="warning"><strong>Route ≠ canonical owner.</strong></p></div>';
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
      main.innerHTML='<div class="panel"><div class="muted">ENCYCLOPEDIA · ABOUT</div><h2>About the FSP Encyclopedia</h2><p>The Encyclopedia is a public, multi-domain knowledge and inquiry architecture. It connects canonical concepts, cases, Tools, sources, comparisons, courses, applications, and formal models while preserving provenance, standing, domain-native meaning, claim ceilings, and Return.</p><p>Its purpose is not to impose one master ontology. It is to make heterogeneous forms of inquiry more mutually inspectable and selectively interoperable.</p><p><strong>One canonical owner, many projections.</strong></p><p><strong>Progressive disclosure ≠ semantic mutation.</strong></p><p><strong>FSP map ≠ inquiry itself.</strong></p><p>The Encyclopedia therefore remains corrigible: when a domain, case, or user exposes a systematic failure in the shared grammar, the grammar itself may REOPEN.</p></div>';
      const a=document.createElement("div");a.className="actions";a.append(mkButton("Why FSP?",()=>go({kind:"NODE",id:"FSP-WHY"}),true),mkButton("Browse Domains",()=>go({kind:"NODE",id:"FSP-DOMAINS"})));main.append(a);return;
    }

    if(id==="FSP-WHY"){
      main.innerHTML='<div class="panel"><div class="muted">QUICK · WHY FSP?</div><h2>Why Full-Stack Philosophy?</h2><p>Human beings already inquire before they ever enter a classroom or formal discipline. We notice, interpret, compare, remember, infer, act, encounter resistance, and revise. Modern societies have multiplied the power of that inquiry through science, law, engineering, medicine, statistics, institutions, computation, and specialized professional knowledge.</p><p>The difficulty is that these forms of inquiry are often separated into silos. A useful model in one domain may travel without its assumptions. A recommendation may arrive without its provenance. Expertise may be mistaken for authority. A representation may be treated as the thing represented. A current judgment may become a policy before anyone asks what it actually licenses.</p><h3>What FSP adds</h3><p>FSP keeps the achievements of traditional critical thinking—logic, argument analysis, evidence, inference, alternatives, counterexamples, source evaluation—and places them inside a wider governance architecture.</p><p><strong>Notice → Inspect → Govern → Bound → REOPEN → Return</strong></p><p><strong>Notice:</strong> What entered the map, and what may be missing?</p><p><strong>Inspect:</strong> What reasons, evidence, alternatives, and Tools matter?</p><p><strong>Govern:</strong> Which transitions need provenance, standing, or justification?</p><p><strong>Bound:</strong> What does not yet follow?</p><p><strong>REOPEN:</strong> What would make us reconsider?</p><p><strong>Return:</strong> How does inquiry return to responsible lived action?</p><h3>Why this matters across domains</h3><p>FSP does not ask physics, ethics, history, law, medicine, institutions, or ordinary human experience to become the same kind of inquiry. It asks whether enough of their relevant structure can be made mutually inspectable to support responsible coordination.</p><p class="warning"><strong>Shared grammar ≠ shared ontology.</strong></p><p>This makes possible a different kind of synthesis: not one worldview into which everything must fit, but a corrigible architecture for translation, comparison, bounded judgment, and cooperation without convergence.</p><h3>FSP is corrigible too</h3><p>The framework itself is a map. If its Tools, categories, or translations systematically obscure important distinctions or fail across domains, they must be eligible for revision.</p><p class="warning"><strong>FSP map ≠ inquiry itself.</strong></p></div>';
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Read the Standard explanation",()=>go({kind:"NODE",id:"FSP-JTS"}),true),
        mkButton("Open the Florida Joint Task Space pilot",()=>go({kind:"NODE",id:"FSP-JTS-FLNH"})),
        mkButton("Explore Domains",()=>go({kind:"NODE",id:"FSP-DOMAINS"})),
        mkButton("Return to Encyclopedia Home",()=>go({kind:"NODE",id:"FSP-HOME"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-JTS"){
      main.innerHTML='<div class="panel"><div class="muted">STANDARD · EXTENDED CRITICAL THINKING</div><h2>Extended Critical Thinking and Joint Task Spaces</h2><p><strong>Extended Critical Thinking</strong> is traditional critical thinking embedded within a governed inquiry architecture. It preserves argument analysis, logic, evidence, causal reasoning, source evaluation, alternatives, and counterexamples, while extending inquiry both upstream and downstream.</p><h3>Before the argument</h3><p>FSP asks what entered the map, what was omitted, what was observed rather than inferred, which categories shaped attention, whose perspective supplied the framing, and what histories, institutions, or constraints made that framing seem natural.</p><h3>After the argument</h3><p>FSP asks what a conclusion licenses, who has standing to recommend or decide, what happens when an institution amplifies a judgment, who bears consequences, which capabilities are expanded or constrained, and what would require repair or REOPEN.</p><h3>How the grammar works</h3><p><strong>ABCD</strong> broadens attention. <strong>Tools</strong> selectively inspect recurring pressure points. <strong>Firewalls</strong> govern transitions where inquiry may carry more across than has been licensed. <strong>Claim ceilings</strong> ask what does not yet follow. <strong>REOPEN</strong> preserves corrigibility. <strong>Authorial Return</strong> returns judgment to lived human Doing.</p><p>A Firewall is not normally a prohibition. It is a controlled checkpoint: <strong>You may cross, but show the license.</strong></p><h3>Translation without reduction</h3><p>Different domains can preserve their native entities, evidence, methods, and authority while exposing selected relations in a shared governance form. The shared representation records provenance, assumptions, uncertainty, standing, claim ceilings, and remainder rather than pretending translation is lossless.</p><p class="warning"><strong>Translation ≠ identity. Compression ≠ semantic equivalence.</strong></p><h3>Cooperation without convergence</h3><p>Participants need not agree on metaphysics, final values, disciplinary method, or one complete explanation. They may still coordinate if they can make relevant observations, constraints, assumptions, uncertainties, standing, authorization boundaries, reversible actions, and REOPEN conditions mutually inspectable.</p><h3>Joint Task Spaces</h3><p>A <strong>Joint Task Space</strong> is a governed coordination surface in which heterogeneous participants contribute domain-native maps, evidence, constraints, uncertainty, recommendations, permissions, and repair conditions without surrendering their local identities.</p><p><strong>domain-native inquiry → translation with provenance + remainder → shared task representation → Tool-guided inspection → Firewall-governed transitions → bounded joint judgment → standing / authorization → coordinated action → consequences → REOPEN</strong></p><h3>Continuous intercommunication</h3><p>The aim is not a final synthesis. It is sustained, auditable movement among partial syntheses as inquiry changes. Each domain can update its local map while preserving what changed, why it changed, what remains uncertain, and which shared judgments must be reconsidered.</p><h3>First demonstration</h3><p>The Florida nursing-home pilot tests whether this architecture can coordinate residents, families, frontline workers, clinical/public-health expertise, administration, regulation, historical evidence, and ethical judgment without collapsing them into one authority or one ontology.</p><p class="warning"><strong>The Standard layer explains a capability architecture; it does not claim that FSP has already solved interdisciplinary coordination.</strong></p></div>';
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
      const a=document.createElement("div");a.className="actions";
      a.append(
        mkButton("Return to Joint Task Spaces",()=>go({kind:"NODE",id:"FSP-JTS"}),true),
        mkButton("Inspect Translation Governance",()=>go({kind:"NODE",id:"FSP-TRANSLATION"})),
        mkButton("Browse Ethics domain",()=>go({kind:"NODE",id:"DOMAIN-ETHICS"})),
        mkButton("Browse Institutions domain",()=>go({kind:"NODE",id:"DOMAIN-INSTITUTIONS-CONNECTED-DOING"}))
      );
      main.append(a);return;
    }

    if(id==="FSP-TRANSLATION"){
      main.innerHTML='<div class="panel"><div class="muted">DEEP / FORMAL · TRANSLATION GOVERNANCE</div><h2>Translation Governance and Cross-Domain Interoperability</h2><p>The Deep layer treats translation as a governed object rather than a neutral transfer. Its purpose is to make cross-domain movement inspectable enough that provenance, limits, authority, and correction conditions do not disappear when information travels.</p><h3>Translation object</h3><p>A cross-domain representation may expose: source domain, source object, source representation, provenance, observation status, inference status, assumptions, translation target, translated representation, remainder, claim ceiling, standing, recommendation status, authorization status, REOPEN conditions, and Return target.</p><p>Not every domain must populate every field. <strong>Unknown</strong>, <strong>not applicable</strong>, and <strong>not yet represented</strong> must remain distinguishable.</p><h3>Core invariants</h3><p>1. Provenance must not disappear through translation.<br>2. Translation may compress but must not silently strengthen a claim.<br>3. Remainder must be recordable.<br>4. Source-domain meaning must remain recoverable.<br>5. Standing must not be inferred from expertise alone.<br>6. Recommendation must not silently become authorization.<br>7. Shared field names must not imply ontological identity.<br>8. Institutional amplification requires renewed claim-ceiling review.<br>9. Consequential cross-domain transfers preserve REOPEN conditions.<br>10. Deep inspection preserves a Return path.</p><h3>Remainder</h3><p><strong>Remainder</strong> is what cannot be carried cleanly into the shared representation without loss, controversy, uncertainty, or distortion. Possible statuses include DOMAIN_NATIVE_ONLY, PARTIALLY_TRANSLATED, CONTESTED, UNKNOWN, and DEFERRED.</p><p class="warning"><strong>Untranslated remainder ≠ irrelevant remainder.</strong></p><h3>Standing</h3><p>Standing is represented separately from knowledge, expertise, causal power, institutional role, practical ability, and legitimacy. A participant may know something without being authorized to decide; an institution may possess authority without making every associated factual claim true.</p><h3>Authorization states</h3><p><strong>GENERATED → POSSIBLE → RECOMMENDED → AUTHORIZED → IMPLEMENTED → REVIEWED</strong></p><p class="warning"><strong>Generate ≠ Recommend ≠ Authorize.</strong></p><h3>Interoperability criterion</h3><p>Two domains are sufficiently interoperable for a task when participants can recover what the other domain is claiming, what supports it, what assumptions travel, what does not travel, what remains uncertain, who has standing, what action status applies, and what would trigger revision.</p><p><strong>Interoperability does not require conceptual identity.</strong></p><h3>Grammar-level REOPEN</h3><p>The shared grammar itself must reopen under recurring translation loss, domain-native mismatch, false equivalence, standing error, excessive complexity, omitted actors or capabilities, failed adversarial cases, unusable public projections, repeated workarounds, or framework-induced closure.</p><p><strong>detect failure → localize layer → classify failure → attempt smallest repair → preserve invariants → rerun regressions → retain or reopen canonical grammar</strong></p><p class="warning"><strong>Formal translatability ≠ exhaustive representability.</strong></p></div>';
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
      ["NODE","FSP-HOME","Encyclopedia Home"],
      ["NODE","FSP-DOMAINS","Domains"],
      ["NODE","FSP-CONSTITUTION","Core"],
      ["NODE","FSP-RESOURCES","Resources"],
      ["NODE","FSP-ROUTES","Routes"],
      ["NODE","FSP-ABOUT","About"],
      ["NODE","FSP-WHY","Why FSP?"],
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
