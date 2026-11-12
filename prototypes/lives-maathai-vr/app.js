(function(){
"use strict";
var P=window.FSP_LIVES_MAATHAI_PROTOTYPE;
if(!P){document.getElementById("app").innerHTML="<p>Prototype data missing. Run npm run prototype:lives.</p>";return}
var mode="lives",stateId=P.route.inspect.states[0].stateId,sceneIndex=0,returnData={relation:"",difference:"",remainder:"",question:""};
function esc(s){return String(s||"").replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function state(){return P.route.inspect.states.find(function(s){return s.stateId===stateId})}
function claimsFor(id){var index=P.route.inspect.states.findIndex(function(s){return s.stateId===id});var ids=new Set(P.route.inspect.states.slice(0,index+1).map(function(s){return s.stateId}));return P.route.deep.claims.filter(function(c){return ids.has(c.revealAtStateId)})}
function sourcesFor(claims){var ids=new Set([].concat.apply([],claims.map(function(c){return c.sourceIds})));return P.route.deep.sources.filter(function(s){return ids.has(s.sourceId)})}
function sourceClassLabel(x){return {"PRIMARY_FIRST_PERSON":"Maathai speaking or writing","CONTEMPORARY_DOCUMENT":"Document from the time","HISTORICAL_INSTITUTIONAL":"Later historical or institutional source","FSP_INFERENCE":"FSP interpretation"}[x]||x}
function header(){return '<header class="mast"><div><div class="brand">FSP Lives · Browser Prototype</div><span class="badge">NON-DEPLOYED</span></div><div class="tabs"><button data-mode="lives" class="'+(mode==="lives"?"active":"")+'">Explore the life</button><button data-mode="vr" class="'+(mode==="vr"?"active":"")+'">Step through the VR sequence</button></div></header>'}
function guide(){
 return '<section class="section"><div class="eyebrow">How to read this page</div><h2>Seven things to keep separate</h2><div class="grid">'+
 '<div class="card"><h3>Where we are in the life</h3><p>A timeline state is one bounded period, not a summary of the whole person.</p></div>'+
 '<div class="card"><h3>What we can say now</h3><p>A claim is a statement supported at this point in the timeline. Later facts stay hidden.</p></div>'+
 '<div class="card"><h3>Where that statement comes from</h3><p>Sources show whether the support comes from Maathai herself, a document from the time, or later historical work.</p></div>'+
 '<div class="card"><h3>What became newly possible</h3><p>A capability change means the range of things a person or organization could do changed.</p></div>'+
 '<div class="card"><h3>What you are not being shown yet</h3><p>Hidden future keeps later success or fame from changing how you interpret an earlier choice.</p></div>'+
 '<div class="card"><h3>What might carry to another situation</h3><p>Portability asks whether a structural lesson travels without copying the historical tactic.</p></div>'+
 '<div class="card"><h3>What you take away</h3><p>Return is your own bounded conclusion after seeing what happened, what changed, and what remains uncertain.</p></div>'+
 '</div></section>';
}
function lives(){
 var s=state(),claims=claimsFor(stateId),sources=sourcesFor(claims);
 return header()+
 '<section class="hero"><div class="eyebrow">A life seen through changing situations</div><h1>'+esc(P.route.surface.personName)+'</h1><p class="lede">'+esc(P.route.surface.researchQuestion)+'</p><div class="notice"><strong>Limit of this reconstruction:</strong> '+esc(P.route.surface.claimCeiling)+'</div></section>'+
 guide()+
 '<section class="section"><div class="eyebrow">Where we are in the life</div><h2>Choose a period</h2><p class="muted">Each card is one bounded historical situation. “Evidence density” tells you how much source material we have for that period, not how important the period was.</p><div class="timeline">'+P.route.inspect.states.map(function(x){return '<button class="node '+(x.stateId===stateId?"active":"")+'" data-state="'+x.stateId+'"><strong>'+esc(x.label)+'</strong><div>'+esc(x.period)+'</div><div class="density">Source record: '+(x.evidenceDensity==="HIGH"?"relatively rich":x.evidenceDensity==="MEDIUM"?"moderate":"limited")+'</div></button>'}).join("")+'</div></section>'+
 '<section class="section"><div class="notice"><strong>You are looking at:</strong> '+esc(s.label)+' ('+esc(s.period)+'). The cards below describe this period, not Maathai as a whole.</div><div class="grid" style="margin-top:1rem"><div class="card"><h3>What she or the organization could do</h3><ul>'+s.capabilities.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="card"><h3>What limited action</h3><ul>'+s.constraints.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="card"><h3>Institutions that mattered here</h3><ul>'+s.institutions.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="card"><h3>Options visible from this period</h3><ul>'+s.livePossibilities.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div></div></section>'+
 '<section class="section"><div class="eyebrow">What we can say at this point</div><h2>Supported statements</h2><p class="muted">These are not the whole story. Each statement carries a limit on how strongly it may be interpreted.</p><div class="grid">'+claims.map(function(c){return '<div class="card source"><strong>'+esc(c.text)+'</strong><p class="muted"><strong>Do not infer more than this:</strong> '+esc(c.claimCeiling)+'</p><small>'+esc(c.sourceIds.join(", "))+(c.fspInference?" · FSP interpretation":"")+'</small></div>'}).join("")+'</div></section>'+
 '<section class="section"><div class="eyebrow">Where those statements come from</div><h2>Sources</h2><div class="grid">'+sources.map(function(s){return '<div class="card"><strong>'+esc(s.label)+'</strong><p>'+esc(sourceClassLabel(s.sourceClass))+'</p><small>'+esc(s.sourceId)+'</small></div>'}).join("")+'</div></section>'+
 '<section class="section hidden-future"><strong>What you are not being shown yet:</strong> later events remain hidden until you move to the period where they become historically available. This helps prevent later success from making earlier choices look inevitable.</section>'+
 '<section class="section"><div class="eyebrow">What this case lets us inspect</div><h2>Case-specific lenses</h2><p class="muted">These are tools that fit this life especially well. Other lives may need different ones.</p><p>'+P.route.activeModules.map(function(x){var map={"INTENDED_ACTUAL":"what was intended vs. what actually happened","FAILED_PLAN":"a plan that failed without ending the larger transformation","AUTHORIZATION_STANDING":"influence vs. formal authority","INSTITUTIONAL_ROLE":"how institutions changed what was possible","HINDSIGHT_CONTROL":"keeping later outcomes out of earlier decisions"};return '<span class="status pass">'+esc(map[x]||x)+'</span> '}).join("")+'</p><div class="firewall">A tool that is absent here may still matter in another life. Missing tool ≠ missing human feature.</div></section>'+
 '<section class="section"><div class="eyebrow">What might carry to another situation</div><h2>A structural lesson, not a recipe</h2><p>'+esc(P.route.portability.structuralRelation)+'</p><h3>What should not be copied from the case</h3><ul>'+P.route.portability.mustNotTravel.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul><div class="notice"><strong>Limit:</strong> '+esc(P.route.portability.claimCeiling)+'</div></section>';
}
function vr(){
 var sc=P.vr.scenes[sceneIndex];
 return header()+
 '<section class="hero"><div class="eyebrow">Interaction rehearsal for a future VR version</div><h1>'+esc(sc.label)+'</h1><p class="lede">Move through the case one step at a time. Later outcomes are deliberately withheld. This sequence does not simulate Maathai\'s private experience.</p></section>'+
 '<section class="scene"><div class="eyebrow">Step '+(sceneIndex+1)+' of '+P.vr.scenes.length+'</div><h2>'+esc(sc.label)+'</h2><div class="task"><strong>What to do here</strong><p>'+esc(sc.learnerTask)+'</p></div>'+sceneBody(sc)+'<div class="actions" style="margin-top:1rem"><button id="prev" '+(sceneIndex===0?"disabled":"")+'>Previous</button><button id="exit">Leave the sequence</button><button id="next" class="primary">'+(sceneIndex===P.vr.scenes.length-1?"Restart":"Continue")+'</button></div></section>'+
 '<section class="section"><div class="firewall"><strong>Important limit:</strong> this reconstruction can show public evidence and historically bounded possibilities. It cannot give you Maathai\'s exact first-person experience.</div></section>';
}
function sceneBody(sc){
 if(sc.sceneId==="AUTHORIAL_RETURN") return '<div class="return"><h3>What you take away — in your own words</h3><p class="muted">Do not write a lesson about how to be like Maathai. State what relation you noticed, how your context differs, what remains uncertain, and what question is worth carrying forward.</p>'+field("relation","What structural relation did you notice?")+field("difference","What is importantly different in another context?")+field("remainder","What remains uncertain?")+field("question","What question would you carry forward?")+'<div id="return-status" class="status '+returnReady()+'">'+(returnReady()==="pass"?"YOUR RETURN IS BOUNDED ENOUGH":"ADD DIFFERENCE AND UNCERTAINTY BEFORE CLOSING")+'</div></div>';
 if(sc.sceneId==="OFF") return '<div class="notice"><strong>The historical scaffold is now off.</strong> You are back outside the case. No personal recommendation has been generated, and moving into Life Navigation would be a separate choice.</div>';
 var visible=P.route.deep.claims.filter(function(c){return sc.revealClaimIds.includes(c.claimId)});
 var hidden=sc.hiddenClaimIds.length;
 var extra="";
 if(sc.sceneId==="CAPABILITY_GROWTH"){
   var t=P.route.inspect.transitions.find(function(x){return x.transitionId==="M-T1"});
   extra='<div class="card delta"><h3>What became newly possible</h3><ul>'+t.capabilityDelta.gained.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div>';
 }
 if(sc.sceneId==="GOVERNANCE_CONSTRAINT"){
   var g=P.route.inspect.transitions.find(function(x){return x.transitionId==="M-T2"});
   extra='<div class="card delta"><h3>New limits that now matter</h3><ul>'+g.constraintDelta.added.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div>';
 }
 return '<div class="section"><h3>What can be revealed now</h3><div class="grid">'+visible.map(function(c){return '<div class="card source">'+esc(c.text)+'<p class="muted"><strong>Limit:</strong> '+esc(c.claimCeiling)+'</p></div>'}).join("")+extra+'</div><p class="muted"><strong>Hidden future:</strong> '+hidden+' later statement(s) are still withheld so you do not read later outcomes back into this moment.</p></div>';
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
 document.querySelectorAll("[data-return]").forEach(function(x){x.oninput=function(){returnData[x.dataset.return]=x.value;var st=document.getElementById("return-status");if(st){st.className="status "+returnReady();st.textContent=returnReady()==="pass"?"YOUR RETURN IS BOUNDED ENOUGH":"ADD DIFFERENCE AND UNCERTAINTY BEFORE CLOSING"}}});
}
render();
})();