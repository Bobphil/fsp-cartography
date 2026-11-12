import {MAATHAI_1976_VISUAL_FIELD,type VisualScene} from "./fspVrVisualGrammar";

export type RequirementStatus="PRESENT"|"PARTIAL"|"ABSENT"|"UNKNOWN";
export type RequirementKind="CAPABILITY"|"RESOURCE"|"RELATIONSHIP"|"INSTITUTIONAL_ACCESS"|"ROLE"|"CONSENT"|"EVIDENCE"|"AUTHORITY"|"TIME";

export interface GateRequirement{
  id:string; label:string; kind:RequirementKind; status:RequirementStatus; explanation:string;
}
export interface TemporalPathProjection{
  pathId:string;
  temporalDepth:1|2|3|4;
  distanceMeaning:string;
  requirements:GateRequirement[];
}
export interface MaathaiFieldProjection{
  sceneId:string;
  centerLocusId:string;
  timeRings:Array<{depth:0|1|2|3|4;label:string;radius:number}>;
  pathProjection:TemporalPathProjection[];
  horizonLabel:string;
}

const req=(id:string,label:string,kind:RequirementKind,status:RequirementStatus,explanation:string):GateRequirement=>({id,label,kind,status,explanation});

export const MAATHAI_1976_FIELD_PROJECTION:MaathaiFieldProjection={
  sceneId:MAATHAI_1976_VISUAL_FIELD.sceneId,
  centerLocusId:"M",
  timeRings:[
    {depth:0,label:"NOW / PRESENT FIELD",radius:0},
    {depth:1,label:"reachable with present capabilities",radius:150},
    {depth:2,label:"requires capability or relationship development",radius:245},
    {depth:3,label:"requires institutional mediation",radius:340},
    {depth:4,label:"requires substantial structural change",radius:430}
  ],
  pathProjection:[
    {pathId:"P-RESEARCH",temporalDepth:1,distanceMeaning:"Can be attempted using capabilities substantially already present.",requirements:[
      req("PR1","Scientific expertise","CAPABILITY","PRESENT","Documented scientific and academic capability is already present."),
      req("PR2","Time and observational access","RESOURCE","PARTIAL","Investigation requires time and access to environmental observations.")
    ]},
    {pathId:"P-TEACH",temporalDepth:1,distanceMeaning:"Can be attempted through existing academic and communication roles.",requirements:[
      req("PT1","Scientific expertise","CAPABILITY","PRESENT","Scientific training is already present."),
      req("PT2","Audience / teaching channel","INSTITUTIONAL_ACCESS","PRESENT","University role supplies an existing communication setting.")
    ]},
    {pathId:"P-WAIT",temporalDepth:1,distanceMeaning:"Requires no major new institutional condition; preserves inquiry and non-action as a live option.",requirements:[
      req("PW1","Time","TIME","PRESENT","Waiting or gathering more information is already possible.")
    ]},
    {pathId:"P-ORGANIZE",temporalDepth:2,distanceMeaning:"Requires activating relationships and coordinating people over time.",requirements:[
      req("PO1","Women's organizational access","RELATIONSHIP","PRESENT","NCWK participation provides an organizational connection."),
      req("PO2","Coordination time","RESOURCE","PARTIAL","Repeated organizing requires sustained time and coordination."),
      req("PO3","Participant relationships","RELATIONSHIP","PARTIAL","Existing access helps but broader participation must still be built.")
    ]},
    {pathId:"P-EXPERIMENT",temporalDepth:2,distanceMeaning:"Requires combining existing knowledge with participants, materials, and organizational coordination.",requirements:[
      req("PE1","Scientific knowledge","CAPABILITY","PRESENT","Existing training supports investigation and intervention design."),
      req("PE2","Organizational access","RELATIONSHIP","PRESENT","Women's organizational participation supplies a possible coordination route."),
      req("PE3","Participants","RESOURCE","PARTIAL","A practical intervention requires willing participants."),
      req("PE4","Materials / local resources","RESOURCE","UNKNOWN","The scene does not yet establish the material conditions of a specific intervention.")
    ]},
    {pathId:"P-REQUEST",temporalDepth:3,distanceMeaning:"Requires institutional recognition and a workable channel into formal authority.",requirements:[
      req("PQ1","Public communication","CAPABILITY","PRESENT","Academic and organizational roles support public communication."),
      req("PQ2","Institutional access","INSTITUTIONAL_ACCESS","PARTIAL","There may be routes into public institutions, but the scene does not establish a reliable policy channel."),
      req("PQ3","Recognized state role","ROLE","ABSENT","No formal state role is represented in the 1976 field."),
      req("PQ4","Policy jurisdiction","AUTHORITY","ABSENT","Scientific expertise and public standing do not supply policy jurisdiction.")
    ]},
    {pathId:"P-ADVOCATE",temporalDepth:4,distanceMeaning:"Requires public standing, coalition support, and political or institutional conditions beyond those presently secured.",requirements:[
      req("PA1","Public voice","CAPABILITY","PRESENT","Academic and organizational standing provide some public voice."),
      req("PA2","Organizational support","RELATIONSHIP","PARTIAL","Existing women's-network access can support advocacy but does not guarantee a coalition."),
      req("PA3","Broader coalition","RELATIONSHIP","ABSENT","The scene does not yet show a broad advocacy coalition."),
      req("PA4","Formal political authority","AUTHORITY","ABSENT","The 1976 field does not represent formal state authority."),
      req("PA5","Political opportunity structure","INSTITUTIONAL_ACCESS","UNKNOWN","The current source set is not yet rich enough to encode the full political opportunity field.")
    ]}
  ],
  horizonLabel:"Later Green Belt, political, parliamentary, and global outcomes remain beyond the present horizon."
};

export function temporalProjectionForPath(pathId:string){
  const p=MAATHAI_1976_FIELD_PROJECTION.pathProjection.find(x=>x.pathId===pathId);
  if(!p) throw new Error("missing-temporal-projection:"+pathId);
  return structuredClone(p);
}
export function gateDecomposition(pathId:string){
  const p=temporalProjectionForPath(pathId);
  return {
    pathId,
    temporalDepth:p.temporalDepth,
    present:p.requirements.filter(r=>r.status==="PRESENT"),
    partial:p.requirements.filter(r=>r.status==="PARTIAL"),
    absent:p.requirements.filter(r=>r.status==="ABSENT"),
    unknown:p.requirements.filter(r=>r.status==="UNKNOWN")
  };
}
export function radialPosition(pathId:string,indexWithinDepth:number,totalWithinDepth:number){
  const p=temporalProjectionForPath(pathId);
  const ring=MAATHAI_1976_FIELD_PROJECTION.timeRings.find(r=>r.depth===p.temporalDepth)!;
  const spread=Math.PI*1.55,start=-Math.PI*0.78;
  const theta=totalWithinDepth<=1?0:start+(spread*(indexWithinDepth/(totalWithinDepth-1)));
  return {radius:ring.radius,theta,x:ring.radius*Math.cos(theta),y:ring.radius*Math.sin(theta)};
}
export function validateMaathaiFieldProjection(scene:VisualScene=MAATHAI_1976_VISUAL_FIELD){
  const failures:string[]=[];
  const scenePathIds=new Set(scene.paths.map(p=>p.id));
  const projPathIds=new Set(MAATHAI_1976_FIELD_PROJECTION.pathProjection.map(p=>p.pathId));
  for(const id of scene.horizon.visiblePathIds) if(!projPathIds.has(id)) failures.push("missing-projection:"+id);
  for(const id of projPathIds) if(!scenePathIds.has(id)) failures.push("unknown-projected-path:"+id);
  for(const p of MAATHAI_1976_FIELD_PROJECTION.pathProjection){
    if(p.temporalDepth<1||p.temporalDepth>4) failures.push("invalid-depth:"+p.pathId);
    if(!p.requirements.length) failures.push("missing-requirements:"+p.pathId);
  }
  const advocate=gateDecomposition("P-ADVOCATE");
  if(!advocate.absent.some(r=>r.kind==="AUTHORITY")) failures.push("advocacy-authority-not-decomposed");
  return {passes:failures.length===0,failures};
}
