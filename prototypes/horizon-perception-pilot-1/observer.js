(function(){
"use strict";
var KEY="fsp-horizon-perception-pilot-1.0";
var ERROR_CODES=["HP-TIME-NEAR","HP-PROB-UP","HP-FEAS-UP","HP-RECOMMEND","HP-DESTINY","HP-CONTINGENCY-LOSS","HP-IDENTITY-LOSS","HP-ATTN-FAIL","HP-PANEL-DEPENDENCE"];
var errors=document.getElementById("errors");
ERROR_CODES.forEach(function(code){
 var l=document.createElement("label"),c=document.createElement("input");c.type="checkbox";c.value=code;c.dataset.error=code;l.appendChild(c);l.append(" "+code);errors.appendChild(l);
});
function scoreValues(){var o={};document.querySelectorAll("[data-score]").forEach(function(s){o[s.dataset.score]=Number(s.value)});return o}
function total(){return Object.values(scoreValues()).reduce(function(a,b){return a+b},0)}
function updateTotal(){document.getElementById("total").textContent=String(total())}
document.querySelectorAll("[data-score]").forEach(function(s){s.onchange=updateTotal});
function record(){
 return {
  participantCode:document.getElementById("code").value.trim(),
  date:document.getElementById("date").value,
  priorFspExposure:document.getElementById("exposure").value,
  pilotVersion:"1.0",
  scores:scoreValues(),
  total:total(),
  errors:Array.from(document.querySelectorAll("[data-error]:checked")).map(function(x){return x.value}),
  spontaneousWording:document.getElementById("wording").value,
  transferChoice:document.getElementById("transfer").value,
  observerNotes:document.getElementById("notes").value
 };
}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}}
document.getElementById("save").onclick=function(){var rows=load();rows.push(record());localStorage.setItem(KEY,JSON.stringify(rows));alert("Saved locally.");};
document.getElementById("clear").onclick=function(){document.querySelectorAll("[data-score]").forEach(function(s){s.value="0"});document.querySelectorAll("[data-error]").forEach(function(x){x.checked=false});["code","date","wording","notes"].forEach(function(id){document.getElementById(id).value=""});document.getElementById("transfer").value="";document.getElementById("exposure").value="No";updateTotal();};
function csvCell(x){var s=String(x==null?"":x);return '"'+s.replace(/"/g,'""')+'"'}
document.getElementById("export").onclick=function(){
 var rows=load();if(!rows.length){alert("No saved rows.");return}
 var head=["participantCode","date","priorFspExposure","pilotVersion","D1","D2","D3","D4","D5","total","errors","transferChoice","spontaneousWording","observerNotes"];
 var lines=[head.map(csvCell).join(",")];
 rows.forEach(function(r){lines.push([r.participantCode,r.date,r.priorFspExposure,r.pilotVersion,r.scores.D1,r.scores.D2,r.scores.D3,r.scores.D4,r.scores.D5,r.total,r.errors.join("|"),r.transferChoice,r.spontaneousWording,r.observerNotes].map(csvCell).join(","))});
 var blob=new Blob([lines.join("\n")],{type:"text/csv"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="fsp-vr-horizon-perception-pilot-1.0.csv";a.click();URL.revokeObjectURL(url);
};
updateTotal();
})();