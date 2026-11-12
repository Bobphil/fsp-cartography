(function(){
"use strict";

var P=window.FSP_MAATHAI_FIELD_1;
if(!P){
  document.body.innerHTML="<p>Run npm run prototype:maathai-field.</p>";
  return;
}

var S=P.scene;
var R=P.projection;
var selected=null;
var prov=false;
var level=3;
var timeMode="NORMAL";
var svg=document.getElementById("field");
var panel=document.getElementById("panel");
var stage=document.getElementById("stage");
var timeNote=document.getElementById("time-note");
var burdenNote=document.getElementById("burden-note");
var NS="http://www.w3.org/2000/svg";

function el(tag,attrs,text){
  var node=document.createElementNS(NS,tag);
  Object.entries(attrs||{}).forEach(function(entry){node.setAttribute(entry[0],entry[1]);});
  if(text!=null) node.textContent=text;
  return node;
}
function locus(id){return S.loci.find(function(x){return x.id===id;});}
function path(id){return S.paths.find(function(x){return x.id===id;});}
function proj(id){return R.pathProjection.find(function(x){return x.pathId===id;});}
function lens(){return (R.temporalLens||[]).find(function(x){return x.mode===timeMode;})||{mode:"NORMAL",maxDepth:3,label:"Normal",purpose:"Expose the middle field.",decomposition:"BALANCED"};}
function polar(r,t){return {x:r*Math.cos(t),y:r*Math.sin(t)};}
function angle(id,depth){
  var same=R.pathProjection.filter(function(x){return x.temporalDepth===depth;});
  var i=same.findIndex(function(x){return x.pathId===id;});
  var spread=Math.PI*1.55;
  var start=-Math.PI*.78;
  return same.length<=1?-.1:start+spread*(i/(same.length-1));
}
function ppoint(id){
  var p=proj(id);
  var ring=R.timeRings.find(function(x){return x.depth===p.temporalDepth;});
  return polar(ring.radius,angle(id,p.temporalDepth));
}
function shortText(s,n){return s.length>n?s.slice(0,n-1)+"…":s;}
function visibleByTime(pathId){return proj(pathId).temporalDepth<=lens().maxDepth;}
function unresolvedCount(pathId){return proj(pathId).requirements.filter(function(r){return r.status!=="PRESENT";}).length;}
function burdenScore(pathId){
  var weights={PRESENT:0,PARTIAL:1,ABSENT:2,UNKNOWN:2};
  return proj(pathId).requirements.reduce(function(sum,r){return sum+(weights[r.status]||0);},0);
}
function modeNarrative(){
  var l=lens();
  return "<strong>"+l.label+":</strong> "+l.purpose+" <span class=\"small\">Visible temporal depth: "+l.maxDepth+" of 4.</span>";
}

function render(){
  svg.innerHTML="";
  var defs=el("defs");
  var marker=el("marker",{id:"arrow",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto"});
  marker.appendChild(el("path",{d:"M0,0 L0,6 L7,3 z",fill:"#6f7f96"}));
  defs.appendChild(marker);
  svg.appendChild(defs);

  var root=el("g",{id:"field-layer"});
  svg.appendChild(root);

  R.timeRings.filter(function(r){return r.depth>0;}).forEach(function(ring){
    var active=ring.depth<=lens().maxDepth;
    root.appendChild(el("circle",{cx:0,cy:0,r:ring.radius,class:"ring",opacity:active?1:.14}));
    root.appendChild(el("text",{x:8,y:-ring.radius+16,class:"ring-label",opacity:active?1:.18},ring.depth+" · "+ring.label));
  });

  root.appendChild(el("circle",{cx:0,cy:0,r:468,class:"horizon"}));
  root.appendChild(el("text",{x:-210,y:-462,class:"ring-label"},R.horizonLabel));

  S.paths.forEach(function(p){
    var pt=ppoint(p.id);
    var visible=visibleByTime(p.id);
    var opacity=visible?1:.08;
    var line=el("line",{
      x1:0,y1:0,x2:pt.x,y2:pt.y,
      class:"path-line "+(p.state==="CONDITIONAL"?"conditional ":"")+(selected===p.id?"selected":""),
      "data-prov":p.provenance[0]&&p.provenance[0].sourceClass||"",
      opacity:opacity,
      "pointer-events":visible?"stroke":"none"
    });
    if(visible) line.onclick=function(){selectPath(p.id);};
    root.appendChild(line);

    var g=el("g",{class:"path-node",opacity:opacity,"pointer-events":visible?"all":"none"});
    g.appendChild(el("circle",{cx:pt.x,cy:pt.y,r:26}));
    g.appendChild(el("text",{x:pt.x,y:pt.y+42,"text-anchor":"middle"},shortText(p.label,28)));
    if(visible) g.onclick=function(){selectPath(p.id);};
    root.appendChild(g);
  });

  S.gates.forEach(function(gate){
    gate.requiredByPathIds.forEach(function(pid){
      if(!visibleByTime(pid)) return;
      var pt=ppoint(pid);
      var x=pt.x*.7;
      var y=pt.y*.7;
      var gg=el("g",{class:"gate"});
      gg.appendChild(el("polygon",{points:(x-16)+","+(y-13)+" "+(x+16)+","+(y-13)+" "+(x+16)+","+(y+13)+" "+(x-16)+","+(y+13)}));
      gg.appendChild(el("text",{x:x,y:y+4,"text-anchor":"middle"},"GATE"));
      gg.onclick=function(){selectGate(gate.id,pid);};
      root.appendChild(gg);
    });
  });

  S.loci.filter(function(x){return x.id!=="FUTURE";}).forEach(function(l){
    var x=l.x*300;
    var y=l.y*300;
    var g=el("g",{class:"locus "+(l.id==="M"?"agent":"")});
    g.appendChild(el("circle",{cx:x,cy:y,r:l.id==="M"?38:27}));
    g.appendChild(el("text",{x:x,y:y+50,"text-anchor":"middle"},shortText(l.label,30)));
    g.onclick=function(){selectLocus(l.id);};
    root.appendChild(g);
  });

  S.remainders.forEach(function(rem,i){
    var pt=polar(455,-2.4+i*.42);
    var g=el("g",{class:"remainder"});
    g.appendChild(el("circle",{cx:pt.x,cy:pt.y,r:15}));
    g.appendChild(el("text",{x:pt.x,y:pt.y+29,"text-anchor":"middle"},"unknown"));
    g.onclick=function(){selectRemainder(rem.id);};
    root.appendChild(g);
  });

  stage.className="stage scaffold-"+level+(prov?" prov-on":"");
  document.getElementById("return-overlay").style.display=level===0?"block":"none";
  timeNote.innerHTML=modeNarrative();
}

function requirementHtml(reqs){
  return reqs.map(function(r){
    return '<div class="req '+r.status+'"><strong>'+r.label+'</strong> · '+r.status+'<br><span class="small">'+r.explanation+'</span></div>';
  }).join("");
}

function contingencySummary(pathId){
  var unresolved=unresolvedCount(pathId);
  var burden=burdenScore(pathId);
  return '<div class="notice"><strong>Contingency stack:</strong> '+unresolved+' unresolved requirement(s); burden score '+burden+'. This score is only a decomposition aid, not a probability.</div>';
}

function selectPath(id){
  selected=id;
  var p=path(id);
  var q=proj(id);
  var gate=S.gates.find(function(x){return x.requiredByPathIds.includes(id);});
  panel.innerHTML=
    '<div class="title">'+p.label+'</div>'+
    '<p><span class="chip">'+p.family+'</span><span class="chip">'+p.state+'</span><span class="chip">distance '+q.temporalDepth+'</span></p>'+
    '<p>'+q.distanceMeaning+'</p>'+
    contingencySummary(id)+
    '<h3>What is already present / still needed?</h3>'+
    requirementHtml(q.requirements)+
    (gate?'<p class="notice"><strong>Gate:</strong> '+gate.label+' · '+gate.state+'</p>':'')+
    '<p class="small">Distance means how much must change first, not probability or recommendation.</p>';
  burdenNote.innerHTML='<strong>Selected path:</strong> '+p.label+' · '+unresolvedCount(id)+' unresolved requirement(s).';
  render();
}

function selectGate(id,pid){
  selected=pid;
  var gate=S.gates.find(function(x){return x.id===id;});
  var q=proj(pid);
  panel.innerHTML=
    '<div class="title">'+gate.label+'</div>'+
    '<p><span class="chip">'+gate.state+'</span></p>'+
    '<p>What must become present before this path can open further?</p>'+
    contingencySummary(pid)+
    requirementHtml(q.requirements);
  burdenNote.innerHTML='<strong>Gate decomposition:</strong> present, partial, absent, and unknown conditions remain visible together.';
  render();
}

function selectLocus(id){
  var l=locus(id);
  panel.innerHTML=
    '<div class="title">'+l.label+'</div>'+
    '<p>'+l.roles.map(function(x){return '<span class="chip">'+x+'</span>';}).join("")+'</p>'+
    '<p class="small">'+(l.navigationalReconstruction?"Spatial placement is a navigational reconstruction.":"Bounded dossier locus.")+'</p>';
}

function selectRemainder(id){
  var r=S.remainders.find(function(x){return x.id===id;});
  panel.innerHTML=
    '<div class="title">'+r.label+'</div>'+
    '<p><span class="chip">'+r.type+'</span></p>'+
    '<p>'+r.explanation+'</p>'+
    '<p class="small">This preserves what the scene does not know.</p>';
}

document.querySelectorAll("[data-time]").forEach(function(b){
  b.onclick=function(){
    timeMode=b.dataset.time;
    document.querySelectorAll("[data-time]").forEach(function(x){x.classList.remove("active");});
    b.classList.add("active");
    if(selected && !visibleByTime(selected)) selected=null;
    render();
  };
});

document.querySelectorAll("[data-level]").forEach(function(b){
  b.onclick=function(){
    level=Number(b.dataset.level);
    document.querySelectorAll("[data-level]").forEach(function(x){x.classList.remove("active");});
    b.classList.add("active");
    render();
  };
});

document.getElementById("prov").onclick=function(){
  prov=!prov;
  this.classList.toggle("active",prov);
  render();
};

document.getElementById("reset").onclick=function(){
  selected=null;
  timeMode="NORMAL";
  document.querySelectorAll("[data-time]").forEach(function(x){x.classList.toggle("active",x.dataset.time==="NORMAL");});
  panel.innerHTML='<div class="title">Select a path, gate, locus, or remainder marker</div><p class="small">The field is intentionally plural. No path is the historical answer.</p>';
  burdenNote.innerHTML='<strong>Contingency stack:</strong> select a path to see what is present, partial, absent, or unknown.';
  render();
};

render();
})();