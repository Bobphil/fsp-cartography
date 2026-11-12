(function(){
"use strict";
var BASELINE="FSP-LIVES-USABILITY-PILOT-1.0";
var QUESTIONS=[
 ["timeline","Where in Maathai's life are you looking right now?"],
 ["claim","What is one thing the page says we can support at this point?"],
 ["source","Where does that statement come from? What kind of source is it?"],
 ["capability","What could be done later that could not be done before? Did anything also become harder?"],
 ["hiddenFuture","Why does the site hide some later facts while you are looking at an earlier period?"],
 ["portability","Is there any pattern from this case that might matter somewhere else? What part should not simply be copied?"],
 ["return","At the end, what is the page asking you to produce? Is there one correct takeaway?"]
];
var ERRORS={
 "T-PERSON":"treats one period as the whole person",
 "C-SOURCE":"confuses statement with source",
 "S-STRENGTH":"treats source type as certainty score",
 "CAP-PROGRESS":"treats capability change as moral/global improvement",
 "HF-CONCEAL":"thinks later facts are hidden to persuade or manipulate",
 "PORT-IMITATE":"converts case into do what Maathai did",
 "RET-CORRECT":"thinks Return has one approved answer"
};
var q=document.getElementById("questions");
q.innerHTML=QUESTIONS.map(function(item,i){return '<section class="q"><h3>'+(i+1)+'. '+item[1]+'</h3><div class="grid"><div class="field"><label>First answer</label><textarea name="'+item[0]+'_answer"></textarea></div><div class="field"><label>Clarification requested?</label><select name="'+item[0]+'_clarification"><option>no</option><option>yes</option></select><label style="margin-top:.7rem">Score</label><select name="'+item[0]+'_score"><option value="0">0 — likely confusion/category collapse</option><option value="1">1 — one clarification likely needed</option><option value="2">2 — clear without framework knowledge</option></select></div></div></section>'}).join("");
document.getElementById("errors").innerHTML=Object.entries(ERRORS).map(function(e){return '<label><input type="checkbox" name="errorCode" value="'+e[0]+'"> '+e[0]+' — '+e[1]+'</label>'}).join("");
var form=document.getElementById("observer-form");
function readSessions(){try{return JSON.parse(localStorage.getItem("fspLivesPilotSessions")||"[]")}catch(e){return []}}
function writeSessions(v){localStorage.setItem("fspLivesPilotSessions",JSON.stringify(v))}
function collect(){
 var fd=new FormData(form),o={baseline:BASELINE,recordedAt:new Date().toISOString(),scores:{},answers:{},clarifications:{},errorCodes:[]};
 for(var pair of fd.entries()){
  var k=pair[0],v=pair[1];
  if(k==="errorCode"){o.errorCodes.push(v);continue}
  var matched=false;
  QUESTIONS.forEach(function(item){
   if(k===item[0]+"_score"){o.scores[item[0]]=Number(v);matched=true}
   if(k===item[0]+"_answer"){o.answers[item[0]]=v;matched=true}
   if(k===item[0]+"_clarification"){o.clarifications[item[0]]=v;matched=true}
  });
  if(!matched)o[k]=v;
 }
 o.total=Object.values(o.scores).reduce(function(a,b){return a+b},0);
 return o;
}
form.addEventListener("submit",function(e){
 e.preventDefault();
 var sessions=readSessions(),rec=collect();
 sessions.push(rec);writeSessions(sessions);
 document.getElementById("save-status").innerHTML='<span class="saved">Saved locally.</span> '+sessions.length+' session(s) stored in this browser. Total score: '+rec.total+'/14.';
 form.reset();
});
function csvCell(v){var s=String(v==null?"":v);return '"'+s.replace(/"/g,'""')+'"'}
document.getElementById("export").onclick=function(){
 var sessions=readSessions();
 if(!sessions.length){document.getElementById("save-status").textContent="No saved sessions to export.";return}
 var headers=["baseline","participantId","date","observer","priorExposure","timeline","claim","source","capability","hiddenFuture","portability","return","total","errorCodes","longestHesitation","labelMisunderstood","selfCorrection","attemptedClick","changeSuggested"];
 var rows=[headers.join(",")];
 sessions.forEach(function(s){
  var row=[s.baseline,s.participantId,s.date,s.observer,s.priorExposure,s.scores.timeline,s.scores.claim,s.scores.source,s.scores.capability,s.scores.hiddenFuture,s.scores.portability,s.scores.return,s.total,(s.errorCodes||[]).join("|"),s.longestHesitation,s.labelMisunderstood,s.selfCorrection,s.attemptedClick,s.changeSuggested];
  rows.push(row.map(csvCell).join(","));
 });
 var blob=new Blob([rows.join("\n")],{type:"text/csv"});
 var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="fsp-lives-usability-pilot-1.0-results.csv";a.click();URL.revokeObjectURL(a.href);
};
document.getElementById("clear").onclick=function(){
 if(confirm("Clear all locally saved pilot sessions in this browser?")){localStorage.removeItem("fspLivesPilotSessions");document.getElementById("save-status").textContent="Local sessions cleared."}
};
})();