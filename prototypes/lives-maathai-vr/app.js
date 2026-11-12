(function(){
"use strict";
var P=window.FSP_LIVES_MAATHAI_PROTOTYPE;
if(!P){document.getElementById("app").innerHTML="<p>Prototype data missing. Run npm run prototype:lives.</p>";return}
var mode="lives",stateId=P.route.inspect.states[0].stateId,sceneIndex=0,returnData={relation:"",difference:"",remainder:"",question:""};
function esc(s){return String(s||"").replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function state(){return P.route.inspect.states.find(function(s){return s.stateId===stateId})}
function claimsFor(id){var index=P.route.inspect.states.findIndex(function(s){return s.stateId===id});var ids=new Set(P.route.inspect.states.slice(0,index+1).map(function(s){return s.stateId}));return P.route.deep.claims.filter(function(c){return ids.has(c.revealAtStateId)})}
function sourcesFor(claims){var ids=new Set([].concat.apply([],claims.map(function(c){return c.sourceIds})));return P.route.deep.sources.filter(function(s){return ids.has(s.sourceId)})}
function header(){return '<header class="mast"><div><div class="brand">FSP Lives · Browser Prototype</div><span class="badge">NON-DEPLOYED</span></div><div class="tabs"><button data-mode="lives" class="'+(mode==="lives"?"active":"")+'">Lives route</button><button data-mode="vr" class="'+(mode==="vr"?"active":"")+'">Maathai VR sequence</button></div></header>'}
function lives(){
 var s=state(),claims=claimsFor(stateId),sources=sourcesFor(claims);
 return header()+
 '<section class="hero"><div class="eyebrow">Common shell + topology-sensitive modules</div><h1>'+esc(P.route.surface.personName)+'</h1><p class="lede">'+esc(P.route.surface.researchQuestion)+'</p><div class="notice"><strong>Claim ceiling:</strong> '+esc(P.route.surface.claimCeiling)+'</div></section>'+
 '<section class="section"><div class="eyebrow">States</div><h2>Transformation timeline</h2><div class="timeline">'+P.route.inspect.states.map(function(x){return '<button class="node '+(x.stateId===stateId?"active":"")+'" data-state="'+x.stateId+'"><strong>'+esc(x.label)+'</strong><div>'+esc(x.period)+'</div><div class="density">Evidence density: '+x.evidenceDensity+'</div></button>'}).join("")+'</div></section>'+
 '<section class="section"><div class="grid"><div class="card"><h3>Capabilities</h3><ul>'+s.capabilities.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="card"><h3>Constraints</h3><ul>'+s.constraints.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="card"><h3>Institutions</h3><ul>'+s.institutions.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="card"><h3>Live possibilities</h3><ul>'+s.livePossibilities.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div></div></section>'+
 '<section class="section"><div class="eyebrow">Known by this point</div><h2>Claims and provenance</h2><div class="grid">'+claims.map(function(c){return '<div class="card source"><strong>'+esc(c.text)+'</strong><p class="muted">'+esc(c.claimCeiling)+'</p><small>'+esc(c.sourceIds.join(", "))+(c.fspInference?" · FSP inference":"")+'</small></div>'}).join("")+'</div></section>'+
 '<section class="section"><div class="eyebrow">Sources</div><h2>Recoverable provenance</h2><div class="grid">'+sources.map(function(s){return '<div class="card"><strong>'+esc(s.label)+'</strong><p>'+esc(s.sourceClass)+'</p><small>'+esc(s.sourceId)+'</small></div>'}).join("")+'</div></section>'+
 '<section class="section hidden-future"><strong>Hindsight control:</strong> later claims remain hidden until their reveal state. The interface is showing only claims available by this timeline position.</section>'+
 '<section class="section"><div class="eyebrow">Topology profile</div><h2>Modules earned by this dossier</h2><p>'+P.route.activeModules.map(function(x){return '<span class="status pass">'+esc(x)+'</span> '}).join("")+'</p><div class="firewall">Missing module ≠ missing human feature.</div></section>'+
 '<section class="section"><div class="eyebrow">Portability</div><h2>What might travel?</h2><p>'+esc(P.route.portability.structuralRelation)+'</p><h3>What must not travel</h3><ul>'+P.route.portability.mustNotTravel.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul><div class="notice"><strong>Ceiling:</strong> '+esc(P.route.portability.claimCeiling)+'</div></section>';
}
function vr(){
 var sc=P.vr.scenes[sceneIndex];
 return header()+
 '<section class="hero"><div class="eyebrow">Maathai VR 2.0 · interaction rehearsal</div><h1>'+esc(sc.label)+'</h1><p class="lede">This browser prototype rehearses reveal order, provenance, capability change, portability, Authorial Return, and OFF. It does not simulate Maathai\'s private experience.</p></section>'+
 '<section class="scene"><div class="eyebrow">Scene '+(sceneIndex+1)+' of '+P.vr.scenes.length+'</div><h2>'+esc(sc.label)+'</h2><div class="task"><strong>Learner task</strong><p>'+esc(sc.learnerTask)+'</p></div>'+sceneBody(sc)+'<div class="actions" style="margin-top:1rem"><button id="prev" '+(sceneIndex===0?"disabled":"")+'>Previous</button><button id="exit">Exit / OFF</button><button id="next" class="primary">'+(sceneIndex===P.vr.scenes.length-1?"Restart":"Continue")+'</button></div></section>'+
 '<section class="section"><div class="firewall"><strong>Perspective firewall:</strong> VR reconstruction ≠ Wangari Maathai. Perspective reconstruction ≠ phenomenal possession.</div></section>';
}
function sceneBody(sc){
 if(sc.sceneId==="AUTHORIAL_RETURN") return '<div class="return"><h3>Authorial Return artifact</h3>'+field("relation","Structural relation")+field("difference","Contextual difference")+field("remainder","Remainder")+field("question","Carry-forward question")+'<div id="return-status" class="status '+returnReady()+'">'+(returnReady()==="pass"?"RETURN READY":"KEEP REMAINDER AND DIFFERENCE VISIBLE")+'</div></div>';
 if(sc.sceneId==="OFF") return '<div class="notice"><strong>OFF.</strong> The historical scaffold is removed. No personal recommendation is generated. Life Navigation is optional.</div>';
 var visible=P.route.deep.claims.filter(function(c){return sc.revealClaimIds.includes(c.claimId)});
 var hidden=sc.hiddenClaimIds.length;
 var extra="";
 if(sc.sceneId==="CAPABILITY_GROWTH"){
   var t=P.route.inspect.transitions.find(function(x){return x.transitionId==="M-T1"});
   extra='<div class="card delta"><h3>Capability delta</h3><ul>'+t.capabilityDelta.gained.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div>';
 }
 if(sc.sceneId==="GOVERNANCE_CONSTRAINT"){
   var g=P.route.inspect.transitions.find(function(x){return x.transitionId==="M-T2"});
   extra='<div class="card delta"><h3>New constraints</h3><ul>'+g.constraintDelta.added.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div>';
 }
 return '<div class="section"><h3>Revealed claims</h3><div class="grid">'+visible.map(function(c){return '<div class="card source">'+esc(c.text)+'<p class="muted">'+esc(c.claimCeiling)+'</p></div>'}).join("")+extra+'</div><p class="muted">'+hidden+' later claim(s) remain hidden by hindsight control.</p></div>';
}
function field(k,label){return '<label class="field"><span>'+label+'</span><textarea data-return="'+k+'">'+esc(returnData[k])+'</textarea></label>'}
function returnReady(){return returnData.relation.trim()&&returnData.difference.trim()&&returnData.remainder.trim()&&returnData.question.trim()?"pass":"hold"}
function render(){document.getElementById("app").innerHTML=mode==="lives"?lives():vr();bind()}
function bind(){
 document.querySelectorAll("[data-mode]").forEach(function(b){b.onclick=function(){mode=b.dataset.mode;render()}});
 document.querySelectorAll("[data-state]").forEach(function(b){b.onclick=function(){stateId=b.dataset.state;render()}});
 var prev=document.getElementById("prev"),next=document.getElementById("next"),exit=document.getElementById("exit");
 if(prev)prev.onclick=function(){sceneIndex=Math.max(0,sceneIndex-1);render()};
 if(next)next.onclick=function(){sceneIndex=sceneIndex===P.vr.scenes.length-1?0:sceneIndex+1;render()};
 if(exit)exit.onclick=function(){sceneIndex=P.vr.scenes.findIndex(function(s){return s.sceneId==="OFF"});render()};
 document.querySelectorAll("[data-return]").forEach(function(x){x.oninput=function(){returnData[x.dataset.return]=x.value;var st=document.getElementById("return-status");if(st){st.className="status "+returnReady();st.textContent=returnReady()==="pass"?"RETURN READY":"KEEP REMAINDER AND DIFFERENCE VISIBLE"}}});
}
render();
})();