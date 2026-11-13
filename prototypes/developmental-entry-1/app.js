(function(){
"use strict";
var P=window.FSP_DEVELOPMENTAL_ENTRY_1;
if(!P){document.body.innerHTML="<p>Run npm run prototype:developmental-entry.</p>";return;}
var stages=P.stages,evidence=P.evidence,index=0,evidenceOpen=false;
var stageEl=document.getElementById("stage"),panel=document.getElementById("panel"),step=document.getElementById("step-indicator"),inspect=document.getElementById("inspect-evidence");
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]})}
function evidenceHtml(ids){
 if(!ids.length)return '<p class="small">No research evidence is being used to make a substantive developmental claim at this stage.</p>';
 return ids.map(function(id){
   var e=evidence.find(function(x){return x.id===id});
   return '<div class="evidence-card"><strong>'+esc(e.id)+'</strong><div>'+esc(e.citation)+'</div><details><summary>Observation</summary><p>'+esc(e.observation)+'</p></details><details><summary>Interpretation</summary><p>'+esc(e.interpretation)+'</p></details><details><summary>Alternatives</summary><ul>'+e.alternatives.map(function(a){return '<li>'+esc(a)+'</li>'}).join("")+'</ul></details><details><summary>Replication</summary><p>'+esc(e.replicationStatus)+'</p></details><div class="firewall"><strong>Claim ceiling:</strong> '+esc(e.claimCeiling)+'</div></div>';
 }).join("");
}
function panelHtml(s){
 var vocab=s.vocabularyReveal.length?'<p><strong>Words you have now earned:</strong><br>'+s.vocabularyReveal.map(function(v){return '<span class="vocab">'+esc(v)+'</span>'}).join("")+'</p>':'';
 var fw=s.firewalls.map(function(f){return '<div class="firewall">'+esc(f)+'</div>'}).join("");
 return '<h2>'+esc(s.label)+'</h2><p>'+esc(s.learnerExperience)+'</p><p><strong>New distinctions</strong></p><ul>'+s.newlyAvailableDistinctions.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul>'+vocab+fw+(evidenceOpen?'<h3>Evidence pool</h3>'+evidenceHtml(s.evidenceIds):'');
}
function clear(){stageEl.className="stage";stageEl.innerHTML=""}
function centerPrompt(title,body){
 var d=document.createElement("div");d.className="prompt";d.innerHTML='<h1>'+esc(title)+'</h1><p>'+esc(body)+'</p>';stageEl.appendChild(d);
}
function circle(cls,x,y,label){
 var d=document.createElement("div");d.className="simple-object "+cls;d.style.left=x+"%";d.style.top=y+"%";d.title=label;stageEl.appendChild(d);return d;
}
function renderStage(s){
 clear();
 if(s.id==="D0_PEDAGOGICAL_ZERO"){
   centerPrompt("Something happens.","No explanation yet.");
 }
 else if(s.id==="D1_CONTROL"){
   centerPrompt("Try acting.","Some change follows what you do.");
   var hand=circle("",50,62,"controllable element");
   stageEl.onclick=function(){hand.style.left=(40+Math.random()*20)+"%";hand.style.top=(48+Math.random()*24)+"%";};
 }
 else if(s.id==="D2_RESISTANCE"){
   centerPrompt("Not everything follows.","Some things move with you. Some do not.");
   var a=circle("",38,62,"controllable"),b=circle("other",68,48,"resistant object");
   stageEl.onclick=function(){a.style.left=(30+Math.random()*18)+"%";};
 }
 else if(s.id==="D3_OTHER_AGENT"){
   centerPrompt("Something else acts.","It moves without waiting for your command.");
   var self=circle("",35,62,"self-linked"),other=circle("other",70,42,"other agent");
   setInterval(function(){if(index===3){other.style.left=(62+Math.random()*16)+"%";other.style.top=(34+Math.random()*20)+"%";}},1200);
 }
 else if(s.id==="D4_DEPENDENCY"){
   centerPrompt("You can signal. You cannot command.","Sometimes the other responds.");
   circle("",34,62,"agent");var care=circle("care",72,38,"caregiver");var sig=document.createElement("div");sig.className="signal";stageEl.appendChild(sig);
   sig.onclick=function(){if(Math.random()>.35){care.style.left="54%";care.style.top="50%";}};
 }
 else if(s.id==="D5_EXPECTATION"){
   centerPrompt("Patterns become expectations.","Then one expected response does not occur.");
   circle("",35,62,"agent");circle("care",70,40,"other");var line=document.createElement("div");line.className="field-line";line.style.left="42%";line.style.top="53%";line.style.width="28%";stageEl.appendChild(line);
 }
 else if(s.id==="D6_HELPER_HINDERER"){
   centerPrompt("Watch what they do.","One agent helps another reach a goal. Another gets in the way. What do you notice?");
   circle("care",30,60,"helper");circle("other",70,60,"hinderer");circle("",50,32,"goal-directed agent");
 }
 else if(s.id==="D7_SIMILARITY_DIFFERENCE"){
   centerPrompt("Some others seem more like you.","Does that affect how you respond?");
   circle("",30,60,"similar preference");circle("other",70,60,"different preference");
 }
 else if(s.id==="D8_EVIDENCE_INSPECTION"){
   centerPrompt("Now inspect the maps.","What was actually observed? What did researchers infer? What replicated?");
 }
 else if(s.id==="D9_PROTO_NORMATIVE"){
   centerPrompt("Responses become social.","Approval, disapproval, reward, withdrawal—and eventually reasons.");
   ["approval","disapproval","reward","withdrawal"].forEach(function(t,i){var n=document.createElement("div");n.className="culture-node";n.textContent=t;n.style.left=(18+i*20)+"%";n.style.top=(48+(i%2)*12)+"%";stageEl.appendChild(n)});
 }
 else if(s.id==="D10_CULTURAL_FORMATION"){
   centerPrompt("Your world gets crowded.","Family, language, peers, institutions, beliefs, media, history.");
   ["family","language","peers","education","religion / none","institutions","media","history"].forEach(function(t,i){var n=document.createElement("div");n.className="culture-node";n.textContent=t;n.style.left=(12+(i%4)*22)+"%";n.style.top=(25+Math.floor(i/4)*42)+"%";stageEl.appendChild(n)});
 }
 else if(s.id==="D11_CAPABILITY_GROWTH"){
   centerPrompt("Time changes what you can do.","New capabilities open paths. Other paths narrow or close.");
   ["language","mobility","skills","relationships","standing"].forEach(function(t,i){var n=document.createElement("div");n.className="culture-node";n.textContent=t;n.style.left=(12+i*17)+"%";n.style.top=(35+i%2*25)+"%";stageEl.appendChild(n)});
 }
 else if(s.id==="D12_LIFE_LOTTERY_HANDOFF"){
   stageEl.classList.add("lottery");centerPrompt("Every human Doing develops somewhere.","You do not choose where you begin.");
 }
 step.textContent=s.id.replaceAll("_"," ")+" · "+s.label;
 panel.innerHTML=panelHtml(s);
 inspect.style.display=s.evidenceIds.length?"inline-block":"none";
}
function render(){renderStage(stages[index]);document.getElementById("back").disabled=index===0;document.getElementById("next").disabled=index===stages.length-1;}
document.getElementById("next").onclick=function(){if(index<stages.length-1){index++;evidenceOpen=false;render()}};
document.getElementById("back").onclick=function(){if(index>0){index--;evidenceOpen=false;render()}};
document.getElementById("inspect-evidence").onclick=function(){evidenceOpen=!evidenceOpen;render()};
document.getElementById("reset").onclick=function(){index=0;evidenceOpen=false;render()};
render();
})();