(function(){
"use strict";

var P=window.FSP_MAATHAI_FIELD_2;
if(!P){
  document.body.innerHTML="<p>Run npm run prototype:maathai-field2.</p>";
  return;
}
var S=P.scene,R=P.projection;
var state={
  temporalMode:"NORMAL",
  level:3,
  selectedPathId:null,
  pinnedPathIds:[],
  traceHistory:[],
  expandedGatePathId:null,
  provenance:false
};
var geom={
  FREEZE:{maxDepth:1,viewScale:1.34,nearScale:1.18,ms:700},
  SLOW:{maxDepth:2,viewScale:1.18,nearScale:1.10,ms:800},
  NORMAL:{maxDepth:3,viewScale:1.00,nearScale:1.00,ms:900},
  ACCELERATE:{maxDepth:4,viewScale:.84,nearScale:.94,ms:1100}
};
var svg=document.getElementById("field");
var fieldRoot=document.getElementById("field-root");
var ringsG=document.getElementById("rings");
var pathsG=document.getElementById("paths");
var gatesG=document.getElementById("gates");
var nearG=document.getElementById("near-root");
var remG=document.getElementById("remainders");
var panel=document.getElementById("panel");
var timeNote=document.getElementById("time-note");
var NS="http://www.w3.org/2000/svg";
var pathEls=new Map(),ringEls=new Map(),gateEls=new Map();

function el(tag,attrs,text){
  var n=document.createElementNS(NS,tag);
  Object.entries(attrs||{}).forEach(function(e){n.setAttribute(e[0],String(e[1]));});
  if(text!=null)n.textContent=text;
  return n;
}
function pathData(id){return S.paths.find(function(x){return x.id===id;});}
function projection(id){return R.pathProjection.find(function(x){return x.pathId===id;});}
function locus(id){return S.loci.find(function(x){return x.id===id;});}
function lens(){return (R.temporalLens||[]).find(function(x){return x.mode===state.temporalMode;})||{maxDepth:3,label:"Normal",purpose:"Middle field"};}
function polar(r,t){return{x:r*Math.cos(t),y:r*Math.sin(t)};}
function angle(id,depth){
  var a=R.pathProjection.filter(function(x){return x.temporalDepth===depth;});
  var i=a.findIndex(function(x){return x.pathId===id;});
  var spread=Math.PI*1.55,start=-Math.PI*.78;
  return a.length<=1?-.1:start+spread*(i/(a.length-1));
}
function pointFor(id){
  var p=projection(id),ring=R.timeRings.find(function(x){return x.depth===p.temporalDepth;});
  return polar(ring.radius,angle(id,p.temporalDepth));
}
function requirementPoint(id,fraction){
  var p=pointFor(id);
  return{x:p.x*fraction,y:p.y*fraction};
}
function shortText(s,n){return s.length>n?s.slice(0,n-1)+"…":s;}
function visibleByTime(id){return projection(id).temporalDepth<=geom[state.temporalMode].maxDepth;}
function isPinned(id){return state.pinnedPathIds.includes(id);}
function isTraced(id){return state.traceHistory.includes(id);}
function unresolved(id){return projection(id).requirements.filter(function(r){return r.status!=="PRESENT";});}
function burden(id){
  var w={PRESENT:0,PARTIAL:1,ABSENT:2,UNKNOWN:2};
  return projection(id).requirements.reduce(function(sum,r){return sum+(w[r.status]||0);},0);
}
function firstBlocking(id){
  var q=projection(id).requirements;
  var idx=q.findIndex(function(r){return r.status==="ABSENT"||r.status==="UNKNOWN";});
  if(idx<0)idx=q.findIndex(function(r){return r.status==="PARTIAL";});
  if(idx<0)return null;
  return {req:q[idx],index:idx,fraction:(idx+1)/(q.length+1)};
}
function addTrace(id){
  if(!state.traceHistory.includes(id))state.traceHistory.push(id);
}
function togglePin(id){
  addTrace(id);
  if(isPinned(id))state.pinnedPathIds=state.pinnedPathIds.filter(function(x){return x!==id;});
  else state.pinnedPathIds=state.pinnedPathIds.concat(id).slice(-3);
  state.selectedPathId=id;
  updateExperience();
}
function selectPath(id){
  state.selectedPathId=id;
  addTrace(id);
  renderPanel();
  updateStyles();
}
function expandGate(id){
  state.selectedPathId=id;
  addTrace(id);
  state.expandedGatePathId=state.expandedGatePathId===id?null:id;
  renderPanel();
  updateStyles();
}
function statusClass(s){return "req "+s;}
function statusLabel(s){return s.charAt(0)+s.slice(1).toLowerCase();}

function buildStaticField(){
  R.timeRings.filter(function(r){return r.depth>0;}).forEach(function(r){
    var g=el("g",{class:"ring-item","data-depth":r.depth});
    g.appendChild(el("circle",{cx:0,cy:0,r:r.radius,class:"ring"}));
    g.appendChild(el("text",{x:8,y:-r.radius+16,class:"ring-label"},r.depth+" · "+r.label));
    ringsG.appendChild(g);
    ringEls.set(r.depth,g);
  });
  ringsG.appendChild(el("circle",{cx:0,cy:0,r:468,class:"horizon"}));
  ringsG.appendChild(el("text",{x:-225,y:-465,class:"ring-label"},R.horizonLabel));

  S.paths.forEach(function(p){
    var pt=pointFor(p.id),q=projection(p.id);
    var g=el("g",{class:"path-item","data-path":p.id});
    var line=el("line",{x1:0,y1:0,x2:pt.x,y2:pt.y,class:"path-line "+(p.state==="CONDITIONAL"?"conditional":""),"marker-end":"url(#arrow2)"});
    line.addEventListener("click",function(){selectPath(p.id);});
    g.appendChild(line);

    var beads=el("g",{class:"beads"});
    q.requirements.forEach(function(req,i){
      var frac=(i+1)/(q.requirements.length+1),bp=requirementPoint(p.id,frac);
      var bg=el("g",{class:"requirement-bead","data-status":req.status});
      bg.appendChild(el("circle",{cx:bp.x,cy:bp.y,r:9,class:"bead "+req.status}));
      bg.appendChild(el("text",{x:bp.x+13,y:bp.y+3,class:"bead-label"},shortText(req.label,22)));
      bg.addEventListener("click",function(e){e.stopPropagation();selectPath(p.id);});
      beads.appendChild(bg);
    });
    g.appendChild(beads);

    var node=el("g",{class:"path-node"});
    node.appendChild(el("circle",{cx:pt.x,cy:pt.y,r:26}));
    node.appendChild(el("text",{x:pt.x,y:pt.y+43,"text-anchor":"middle",class:"path-label"},shortText(p.label,29)));
    node.addEventListener("click",function(){selectPath(p.id);});
    g.appendChild(node);

    pathsG.appendChild(g);
    pathEls.set(p.id,{group:g,line:line,beads:beads,node:node});
  });

  S.paths.forEach(function(p){
    var block=firstBlocking(p.id);
    if(!block)return;
    var bp=requirementPoint(p.id,block.fraction);
    var gate=el("g",{class:"gate-item","data-path":p.id});
    gate.appendChild(el("rect",{x:bp.x-18,y:bp.y-13,width:36,height:26,rx:5,class:"gate-shell"}));
    gate.appendChild(el("text",{x:bp.x,y:bp.y+4,"text-anchor":"middle","font-size":9,fill:"#5f4518"},"GATE"));
    gate.addEventListener("click",function(){expandGate(p.id);});
    gatesG.appendChild(gate);
    gateEls.set(p.id,gate);
  });

  S.loci.filter(function(x){return x.id!=="FUTURE";}).forEach(function(l){
    var x=l.x*300,y=l.y*300,g=el("g",{class:"locus "+(l.id==="M"?"agent":"")});
    g.appendChild(el("circle",{cx:x,cy:y,r:l.id==="M"?40:27}));
    g.appendChild(el("text",{x:x,y:y+50,"text-anchor":"middle"},shortText(l.label,30)));
    g.addEventListener("click",function(){renderLocus(l.id);});
    nearG.appendChild(g);
  });

  S.remainders.forEach(function(r,i){
    var pt=polar(455,-2.4+i*.42),g=el("g",{class:"remainder"});
    g.appendChild(el("circle",{cx:pt.x,cy:pt.y,r:15}));
    g.appendChild(el("text",{x:pt.x,y:pt.y+29,"text-anchor":"middle"},"unknown"));
    g.addEventListener("click",function(){renderRemainder(r.id);});
    remG.appendChild(g);
  });
}

function updateExperience(){
  var g=geom[state.temporalMode];
  fieldRoot.style.transitionDuration=g.ms+"ms";
  nearG.style.transitionDuration=g.ms+"ms";
  fieldRoot.setAttribute("transform","scale("+g.viewScale+")");
  nearG.setAttribute("transform","scale("+g.nearScale+")");
  timeNote.innerHTML="<strong>"+state.temporalMode.charAt(0)+state.temporalMode.slice(1).toLowerCase()+":</strong> "+lens().purpose+" <span class=\"small\">The 1976 present remains anchored while temporal reach changes.</span>";
  updateStyles();
  renderPanel();
}

function updateStyles(){
  var max=geom[state.temporalMode].maxDepth;
  ringEls.forEach(function(g,depth){
    g.style.opacity=depth<=max?"1":".10";
  });
  pathEls.forEach(function(ref,id){
    var inRange=visibleByTime(id);
    var pinned=isPinned(id),traced=isTraced(id);
    var ghost=!inRange&&(pinned||traced);
    ref.group.style.opacity=inRange?"1":ghost?".34":".06";
    ref.group.style.pointerEvents=inRange||pinned?"all":"none";
    ref.line.setAttribute("class","path-line "+(pathData(id).state==="CONDITIONAL"?"conditional ":"")+(pinned?"pinned ":"")+(traced&&!pinned?"trace ":""));
    var terminal=pointFor(id);
    if(state.expandedGatePathId===id){
      var block=firstBlocking(id);
      if(block){
        var stop=requirementPoint(id,block.fraction);
        ref.line.setAttribute("x2",stop.x);
        ref.line.setAttribute("y2",stop.y);
      }
    }else{
      ref.line.setAttribute("x2",terminal.x);
      ref.line.setAttribute("y2",terminal.y);
    }
    ref.node.setAttribute("class","path-node "+(pinned?"pinned":""));
    var showBeads=state.level>=3 || state.selectedPathId===id || pinned || state.expandedGatePathId===id;
    ref.beads.style.opacity=showBeads?"1":state.level>=2?".32":"0";
    Array.from(ref.beads.children).forEach(function(b,i){
      b.style.transform=state.expandedGatePathId===id?"scale(1.35)":"scale(1)";
      b.style.transformOrigin="center";
      b.style.transition="transform 350ms ease, opacity 500ms ease";
      if(state.expandedGatePathId===id){
        var req=projection(id).requirements[i];
        b.style.opacity=(req.status==="ABSENT"||req.status==="UNKNOWN")?"1":".72";
      }else b.style.opacity="1";
    });
  });
  gateEls.forEach(function(g,id){
    var visible=visibleByTime(id)||isPinned(id);
    g.style.opacity=visible?"1":".12";
    g.style.pointerEvents=visible?"all":"none";
    g.style.transform=state.expandedGatePathId===id?"scale(1.28)":"scale(1)";
    g.style.transformOrigin="center";
  });
  document.getElementById("return-overlay").style.display=state.level===0?"block":"none";
  var hideLabels=state.level===1;
  document.querySelectorAll(".ring-label,.path-label,.locus text").forEach(function(x){x.style.opacity=hideLabels?"0":"1";});
}

function pathPanel(id){
  var p=pathData(id),q=projection(id),block=firstBlocking(id);
  var pinText=isPinned(id)?"Unpin":"Pin for comparison";
  var reqs=q.requirements.map(function(r){return '<div class="'+statusClass(r.status)+'"><strong>'+r.label+'</strong> · '+statusLabel(r.status)+'<br><span class="small">'+r.explanation+'</span></div>';}).join("");
  return '<div class="title">'+p.label+'</div>'+
    '<p><span class="chip">distance '+q.temporalDepth+'</span><span class="chip">'+p.state+'</span></p>'+
    '<p>'+q.distanceMeaning+'</p>'+
    '<button class="pin-btn '+(isPinned(id)?"active":"")+'" data-pin="'+id+'">'+pinText+'</button>'+
    '<p class="note"><strong>Contingency stack:</strong> '+unresolved(id).length+' unresolved requirement(s); burden '+burden(id)+'. Not a probability.</p>'+
    '<h3>Path-borne requirements</h3>'+reqs+
    (block?'<p class="small"><strong>First threshold:</strong> '+block.req.label+' · '+block.req.status+'</p>':'');
}

function comparisonHtml(){
  if(!state.pinnedPathIds.length)return '<span class="small">No paths pinned.</span>';
  return state.pinnedPathIds.map(function(id){
    var p=pathData(id),q=projection(id);
    var abs=q.requirements.filter(function(r){return r.status==="ABSENT";}).map(function(r){return r.label;});
    var unk=q.requirements.filter(function(r){return r.status==="UNKNOWN";}).map(function(r){return r.label;});
    return '<div class="compare-row"><strong>'+p.label+'</strong><br><span class="small">depth '+q.temporalDepth+' · unresolved '+unresolved(id).length+' · burden '+burden(id)+'</span>'+
      (abs.length?'<div class="small">Absent: '+abs.join(", ")+'</div>':'')+
      (unk.length?'<div class="small">Unknown: '+unk.join(", ")+'</div>':'')+'</div>';
  }).join("");
}

function tracesHtml(){
  if(!state.traceHistory.length)return '<span class="small">No inspections yet.</span>';
  return state.traceHistory.map(function(id){return '<span class="trace-pill">'+shortText(pathData(id).label,24)+'</span>';}).join("");
}

function renderPanel(){
  var main=state.selectedPathId?pathPanel(state.selectedPathId):
    '<div class="title">Move through the field</div><p class="small">Select a path. Pin up to three paths. Accelerate outward, then Freeze again: pinned and inspected paths remain as traces.</p>';
  panel.innerHTML=main+
    '<div class="compare"><strong>Comparative field</strong><div id="compare-rows">'+comparisonHtml()+'</div></div>'+
    '<div class="compare"><strong>Inspection traces</strong><div class="trace-list">'+tracesHtml()+'</div></div>';
  panel.querySelectorAll("[data-pin]").forEach(function(b){b.onclick=function(){togglePin(b.dataset.pin);};});
}

function renderLocus(id){
  var l=locus(id);
  state.selectedPathId=null;
  panel.innerHTML='<div class="title">'+l.label+'</div><p>'+l.roles.map(function(x){return '<span class="chip">'+x+'</span>';}).join("")+'</p><p class="small">'+(l.navigationalReconstruction?"Spatial placement is a navigational reconstruction.":"Bounded dossier locus.")+'</p>'+
    '<div class="compare"><strong>Comparative field</strong>'+comparisonHtml()+'</div><div class="compare"><strong>Inspection traces</strong><div class="trace-list">'+tracesHtml()+'</div></div>';
}
function renderRemainder(id){
  var r=S.remainders.find(function(x){return x.id===id;});
  state.selectedPathId=null;
  panel.innerHTML='<div class="title">'+r.label+'</div><p><span class="chip">'+r.type+'</span></p><p>'+r.explanation+'</p><p class="small">This remains part of the field rather than being filled by plausible narrative.</p>'+
    '<div class="compare"><strong>Comparative field</strong>'+comparisonHtml()+'</div><div class="compare"><strong>Inspection traces</strong><div class="trace-list">'+tracesHtml()+'</div></div>';
}

document.querySelectorAll("[data-time]").forEach(function(b){
  b.onclick=function(){
    state.temporalMode=b.dataset.time;
    document.querySelectorAll("[data-time]").forEach(function(x){x.classList.remove("active");});
    b.classList.add("active");
    updateExperience();
  };
});
document.querySelectorAll("[data-level]").forEach(function(b){
  b.onclick=function(){
    state.level=Number(b.dataset.level);
    document.querySelectorAll("[data-level]").forEach(function(x){x.classList.remove("active");});
    b.classList.add("active");
    updateStyles();
  };
});
document.getElementById("prov").onclick=function(){
  state.provenance=!state.provenance;
  this.classList.toggle("active",state.provenance);
  fieldRoot.style.filter=state.provenance?"contrast(1.08)":"none";
};
document.getElementById("reset").onclick=function(){
  state={temporalMode:"NORMAL",level:3,selectedPathId:null,pinnedPathIds:[],traceHistory:[],expandedGatePathId:null,provenance:false};
  document.querySelectorAll("[data-time]").forEach(function(x){x.classList.toggle("active",x.dataset.time==="NORMAL");});
  document.querySelectorAll("[data-level]").forEach(function(x){x.classList.toggle("active",x.dataset.level==="3");});
  updateExperience();
};

buildStaticField();
updateExperience();
renderPanel();
})();