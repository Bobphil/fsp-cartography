(function(){
"use strict";
var P=window.FSP_MAATHAI_FIELD_3;
if(!P){document.body.innerHTML="<p>Run npm run prototype:maathai-field3.</p>";return;}
var S=P.scene,R=P.projection;
var state={temporalMode:"NORMAL",level:3,selectedPathId:null,pinnedPathIds:[],traceHistory:[]};
var geom={FREEZE:{maxDepth:1,presentScale:1.34,nearScale:1.18,ms:700},SLOW:{maxDepth:2,presentScale:1.18,nearScale:1.10,ms:800},NORMAL:{maxDepth:3,presentScale:1,nearScale:1,ms:900},ACCELERATE:{maxDepth:4,presentScale:.84,nearScale:.94,ms:1100}};
var HORIZON_R=385,NS="http://www.w3.org/2000/svg";
var presentRoot=document.getElementById("present-root"),nearRoot=document.getElementById("near-root"),ringsG=document.getElementById("rings"),pathsG=document.getElementById("paths"),horizonItems=document.getElementById("horizon-items"),panel=document.getElementById("panel"),timeNote=document.getElementById("time-note");
var pathEls=new Map(),ringEls=new Map();
function el(tag,a,t){var n=document.createElementNS(NS,tag);Object.entries(a||{}).forEach(function(e){n.setAttribute(e[0],String(e[1]));});if(t!=null)n.textContent=t;return n}
function pathData(id){return S.paths.find(function(x){return x.id===id})}
function proj(id){return R.pathProjection.find(function(x){return x.pathId===id})}
function locus(id){return S.loci.find(function(x){return x.id===id})}
function polar(r,t){return{x:r*Math.cos(t),y:r*Math.sin(t)}}
function angle(id,depth){var a=R.pathProjection.filter(function(x){return x.temporalDepth===depth}),i=a.findIndex(function(x){return x.pathId===id}),spread=Math.PI*1.55,start=-Math.PI*.78;return a.length<=1?-.1:start+spread*(i/(a.length-1))}
function pointFor(id){var p=proj(id),ring=R.timeRings.find(function(x){return x.depth===p.temporalDepth});return polar(ring.radius,angle(id,p.temporalDepth))}
function reqPoint(id,f){var p=pointFor(id);return{x:p.x*f,y:p.y*f}}
function visible(id){return proj(id).temporalDepth<=geom[state.temporalMode].maxDepth}
function isPinned(id){return state.pinnedPathIds.includes(id)}
function addTrace(id){if(!state.traceHistory.includes(id))state.traceHistory.push(id)}
function short(s,n){return s.length>n?s.slice(0,n-1)+"…":s}
function compressedReqs(id){
  var q=proj(id).requirements;
  var out=[];
  ["PRESENT","PARTIAL","ABSENT","UNKNOWN"].forEach(function(st){var i=q.findIndex(function(r){return r.status===st});if(i>=0)out.push({req:q[i],index:i})});
  return out.sort(function(a,b){return a.index-b.index}).slice(0,4);
}
function minimumMode(id){var d=proj(id).temporalDepth;return d<=1?"FREEZE":d===2?"SLOW":d===3?"NORMAL":"ACCELERATE"}
function pin(id){addTrace(id);if(isPinned(id))state.pinnedPathIds=state.pinnedPathIds.filter(function(x){return x!==id});else state.pinnedPathIds=state.pinnedPathIds.concat(id).slice(-3);state.selectedPathId=id;update()}
function selectPath(id){state.selectedPathId=id;addTrace(id);renderPanel();updateStyles()}
function reenter(id){state.selectedPathId=id;state.temporalMode=minimumMode(id);document.querySelectorAll("[data-time]").forEach(function(b){b.classList.toggle("active",b.dataset.time===state.temporalMode)});update()}
function build(){
  R.timeRings.filter(function(r){return r.depth>0}).forEach(function(r){var g=el("g",{"data-depth":r.depth});g.appendChild(el("circle",{cx:0,cy:0,r:r.radius,class:"ring"}));g.appendChild(el("text",{x:8,y:-r.radius+16,class:"ring-label"},r.depth+" · "+r.label));ringsG.appendChild(g);ringEls.set(r.depth,g)});
  S.paths.forEach(function(p){var pt=pointFor(p.id),q=proj(p.id),g=el("g",{"data-path":p.id,class:"path-item"}),line=el("line",{x1:0,y1:0,x2:pt.x,y2:pt.y,class:"path-line","marker-end":"url(#arrow3)"});line.onclick=function(){selectPath(p.id)};g.appendChild(line);
    var beads=el("g",{});q.requirements.forEach(function(r,i){var bp=reqPoint(p.id,(i+1)/(q.requirements.length+1)),bg=el("g",{});bg.appendChild(el("circle",{cx:bp.x,cy:bp.y,r:8,class:"bead "+r.status}));bg.appendChild(el("text",{x:bp.x+12,y:bp.y+3,class:"bead-label"},short(r.label,20)));bg.onclick=function(e){e.stopPropagation();selectPath(p.id)};beads.appendChild(bg)});g.appendChild(beads);
    var node=el("g",{class:"path-node"});node.appendChild(el("circle",{cx:pt.x,cy:pt.y,r:25}));node.appendChild(el("text",{x:pt.x,y:pt.y+41,"text-anchor":"middle",class:"path-label"},short(p.label,28)));node.onclick=function(){selectPath(p.id)};g.appendChild(node);pathsG.appendChild(g);pathEls.set(p.id,{g:g,line:line,node:node,beads:beads});
  });
  S.loci.filter(function(x){return x.id!=="FUTURE"}).forEach(function(l){var x=l.x*300,y=l.y*300,g=el("g",{class:"locus "+(l.id==="M"?"agent":"")});g.appendChild(el("circle",{cx:x,cy:y,r:l.id==="M"?40:27}));g.appendChild(el("text",{x:x,y:y+50,"text-anchor":"middle"},short(l.label,30)));nearRoot.appendChild(g)});
}
function renderHorizon(){
  horizonItems.innerHTML="";
  state.pinnedPathIds.filter(function(id){return !visible(id)}).forEach(function(id){
    var ang=angle(id,proj(id).temporalDepth),marker=polar(HORIZON_R,ang),g=el("g",{class:"horizon-item","data-path":id,style:"cursor:pointer"});
    g.appendChild(el("line",{x1:0,y1:0,x2:marker.x,y2:marker.y,class:"horizon-tether"}));
    var cr=compressedReqs(id);
    cr.forEach(function(c,i){var f=(i+1)/(cr.length+1),pt={x:marker.x*f,y:marker.y*f};g.appendChild(el("circle",{cx:pt.x,cy:pt.y,r:9,class:"hc "+c.req.status}));});
    g.appendChild(el("circle",{cx:marker.x,cy:marker.y,r:24,class:"horizon-marker"}));
    g.appendChild(el("text",{x:marker.x,y:marker.y-2,"text-anchor":"middle",class:"horizon-title"},short(pathData(id).label,20)));
    g.appendChild(el("text",{x:marker.x,y:marker.y+14,"text-anchor":"middle",class:"horizon-sub"},"beyond current reach"));
    g.onclick=function(){reenter(id)};horizonItems.appendChild(g);
  });
}
function updateStyles(){
  var max=geom[state.temporalMode].maxDepth;
  ringEls.forEach(function(g,d){g.style.opacity=d<=max?"1":".08"});
  pathEls.forEach(function(ref,id){var inRange=visible(id),pinned=isPinned(id);ref.g.style.opacity=inRange?"1":".04";ref.g.style.pointerEvents=inRange?"all":"none";ref.line.setAttribute("class","path-line "+(pinned&&inRange?"pinned":""));ref.beads.style.opacity=state.level>=3||state.selectedPathId===id?".95":state.level>=2?".3":"0"});
  document.getElementById("return-overlay").style.display=state.level===0?"block":"none";
  renderHorizon();
}
function update(){
  var g=geom[state.temporalMode];
  presentRoot.style.transitionDuration=g.ms+"ms";nearRoot.style.transitionDuration=g.ms+"ms";
  presentRoot.setAttribute("transform","scale("+g.presentScale+")");nearRoot.setAttribute("transform","scale("+g.nearScale+")");
  timeNote.innerHTML="<strong>"+state.temporalMode.charAt(0)+state.temporalMode.slice(1).toLowerCase()+":</strong> near-present geometry and retained-horizon geometry are independent. <span class=\"small\">Inspection compression does not mean temporal nearness.</span>";
  updateStyles();renderPanel();
}
function reqHtml(id){return proj(id).requirements.map(function(r){return '<div class="req '+r.status+'"><strong>'+r.label+'</strong> · '+r.status+'<br><span class="small">'+r.explanation+'</span></div>'}).join("")}
function compareHtml(){if(!state.pinnedPathIds.length)return "No paths pinned.";return state.pinnedPathIds.map(function(id){var q=proj(id),u=q.requirements.filter(function(r){return r.status!=="PRESENT"});return '<div class="compare-row"><strong>'+pathData(id).label+'</strong><br><span class="small">depth '+q.temporalDepth+' · unresolved '+u.length+'</span></div>'}).join("")}
function renderPanel(){
  var main='<div class="title">Build a retained horizon</div><p class="small">Pin a distant path, then Freeze. Out-of-range pinned futures are compressed onto the retained-future band.</p>';
  if(state.selectedPathId){var id=state.selectedPathId;main='<div class="title">'+pathData(id).label+'</div><p><span class="chip">depth '+proj(id).temporalDepth+'</span></p><button class="pin-btn '+(isPinned(id)?"active":"")+'" data-pin="'+id+'">'+(isPinned(id)?"Unpin":"Pin")+'</button><p class="note"><strong>Present-relative question:</strong> What would have to change now for this possibility to move inward?</p>'+reqHtml(id)}
  panel.innerHTML=main+'<div class="compare"><strong>Comparative field</strong><div>'+compareHtml()+'</div></div>';
  panel.querySelectorAll("[data-pin]").forEach(function(b){b.onclick=function(){pin(b.dataset.pin)}});
}
document.querySelectorAll("[data-time]").forEach(function(b){b.onclick=function(){state.temporalMode=b.dataset.time;document.querySelectorAll("[data-time]").forEach(function(x){x.classList.remove("active")});b.classList.add("active");update()}});
document.querySelectorAll("[data-level]").forEach(function(b){b.onclick=function(){state.level=Number(b.dataset.level);document.querySelectorAll("[data-level]").forEach(function(x){x.classList.remove("active")});b.classList.add("active");updateStyles()}});
document.getElementById("reset").onclick=function(){state={temporalMode:"NORMAL",level:3,selectedPathId:null,pinnedPathIds:[],traceHistory:[]};document.querySelectorAll("[data-time]").forEach(function(x){x.classList.toggle("active",x.dataset.time==="NORMAL")});update()};
build();update();renderPanel();
})();