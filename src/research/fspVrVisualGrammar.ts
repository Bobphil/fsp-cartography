export type LocusType="PERSON"|"GROUP"|"ORGANIZATION"|"INSTITUTION"|"SYSTEM"|"SIGNAL"|"ARTIFACT";
export type RelationType="KNOWS"|"MEMBER_OF"|"WORKS_WITH"|"DEPENDS_ON"|"AFFECTED_BY"|"REPORTS_TO"|"INFLUENCES"|"AUTHORIZED_BY"|"CONSTRAINED_BY"|"SUPPORTS"|"CONTESTS"|"EVIDENCES"|"INFERRED_RELATION";
export type ConstraintType="MATERIAL"|"LEGAL"|"INSTITUTIONAL"|"SOCIAL"|"ECONOMIC"|"INFORMATIONAL"|"TEMPORAL"|"PHYSICAL"|"NORMATIVE"|"UNKNOWN";
export type ConstraintStrength="VERIFIED"|"PROBABLE"|"POSSIBLE"|"UNKNOWN";
export type PathState="OPEN"|"CONDITIONAL"|"BLOCKED"|"UNCERTAIN"|"NOT_YET_VISIBLE";
export type GateState="AUTHORIZED"|"REQUIRES_CONSENT"|"REQUIRES_ROLE"|"CONTESTED"|"NO_AUTHORITY"|"UNKNOWN";
export type ProvenanceClass="DIRECT_STATEMENT"|"CONTEMPORARY_TESTIMONY"|"RECORDED_ACTION"|"INSTITUTIONAL_RECORD"|"LATER_MEMORY"|"HISTORICAL_SYNTHESIS"|"FSP_INFERENCE"|"NAVIGATIONAL_RECONSTRUCTION";
export type RemainderType="UNKNOWN_MOTIVE"|"MISSING_SOURCE"|"DISPUTED_INTERPRETATION"|"UNAVAILABLE_PERSPECTIVE"|"UNOBSERVED_CONSEQUENCE"|"UNRESOLVED_CAUSATION"|"OTHER";
export type ScaffoldLevel=0|1|2|3;

export interface ProvenanceRef{
  sourceId:string;
  sourceClass:ProvenanceClass;
  claimCeiling?:string;
}

export interface VisualLocus{
  id:string;
  label:string;
  type:LocusType;
  x:number;
  y:number;
  roles:string[];
  provenance:ProvenanceRef[];
  visibleAt:string;
  navigationalReconstruction:boolean;
}

export interface RelationEdge{
  id:string;
  from:string;
  to:string;
  type:RelationType;
  evidenceStatus:"DIRECT"|"SUPPORTED"|"INFERRED"|"UNKNOWN";
  label:string;
  provenance:ProvenanceRef[];
}

export interface ConstraintBoundary{
  id:string;
  label:string;
  type:ConstraintType;
  strength:ConstraintStrength;
  affects:string[];
  provenance:ProvenanceRef[];
}

export interface InstitutionalField{
  id:string;
  label:string;
  memberLocusIds:string[];
  roleEffects:string[];
  provenance:ProvenanceRef[];
}

export interface AuthorizationGate{
  id:string;
  label:string;
  state:GateState;
  requiredByPathIds:string[];
  recognizedRole?:string;
  provenance:ProvenanceRef[];
}

export interface CapabilityPath{
  id:string;
  label:string;
  fromLocusId:string;
  targetLocusId?:string;
  family:"KNOW_LEARN"|"ORGANIZE"|"RELATE"|"COMMUNICATE"|"EXPERIMENT"|"REQUEST"|"ADVOCATE"|"COORDINATE"|"WAIT_GATHER"|"BUILD_CAPABILITY"|"CHANGE_PROBLEM_MAP";
  state:PathState;
  requiredCapabilities:string[];
  requiredResources:string[];
  affectedParties:string[];
  reversible:boolean;
  historicalOutcomeHidden:boolean;
  recommendation:boolean;
  provenance:ProvenanceRef[];
}

export interface RemainderBoundary{
  id:string;
  label:string;
  type:RemainderType;
  attachedToIds:string[];
  explanation:string;
}

export interface PossibilityHorizon{
  hiddenOutcomeIds:string[];
  visiblePathIds:string[];
  minimumLivePathCount:number;
  historicalRevealAllowed:boolean;
}

export interface VisualScene{
  sceneId:string;
  label:string;
  timeLabel:string;
  boundedFieldStatement:string;
  scaffoldLevel:ScaffoldLevel;
  loci:VisualLocus[];
  relations:RelationEdge[];
  constraints:ConstraintBoundary[];
  institutions:InstitutionalField[];
  paths:CapabilityPath[];
  gates:AuthorizationGate[];
  remainders:RemainderBoundary[];
  horizon:PossibilityHorizon;
  returnPrompts:string[];
  offAvailable:boolean;
}

const prov=(sourceId:string,sourceClass:ProvenanceClass,claimCeiling?:string):ProvenanceRef=>({sourceId,sourceClass,claimCeiling});

export const MAATHAI_1976_VISUAL_FIELD:VisualScene={
  sceneId:"MAATHAI-1976-FIELD-A",
  label:"Maathai circa 1976 — situated possibility field",
  timeLabel:"mid-1970s",
  boundedFieldStatement:"A bounded reconstruction of public roles, relationships, institutions, environmental signals, and historically plausible action families before later outcomes are revealed.",
  scaffoldLevel:3,
  loci:[
    {id:"M",label:"Wangari Maathai",type:"PERSON",x:0,y:0,roles:["scientist","university academic","women's organization participant"],provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS","Public role only; not a complete self-map.")],visibleAt:"START",navigationalReconstruction:false},
    {id:"UON",label:"University of Nairobi",type:"INSTITUTION",x:-0.72,y:-0.12,roles:["employer","research institution"],provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")],visibleAt:"START",navigationalReconstruction:true},
    {id:"NCWK",label:"National Council of Women of Kenya",type:"ORGANIZATION",x:0.68,y:-0.16,roles:["women's organizational network"],provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")],visibleAt:"START",navigationalReconstruction:true},
    {id:"RW",label:"Rural women reporting livelihood pressures",type:"GROUP",x:0.68,y:0.58,roles:["affected parties","knowledge source"],provenance:[prov("WM-S02","LATER_MEMORY","Later account of practical needs; not a complete 1976 perspective.")],visibleAt:"START",navigationalReconstruction:true},
    {id:"SCI",label:"Biological / scientific expertise",type:"ARTIFACT",x:-0.62,y:0.52,roles:["capability resource"],provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")],visibleAt:"START",navigationalReconstruction:true},
    {id:"STATE",label:"Kenyan state / political institutions",type:"INSTITUTION",x:0.06,y:-0.76,roles:["public authority field"],provenance:[prov("NAV-STATE","NAVIGATIONAL_RECONSTRUCTION","Composite institutional locus for navigation; not a single historical office.")],visibleAt:"START",navigationalReconstruction:true},
    {id:"FIREWOOD",label:"Firewood pressure",type:"SIGNAL",x:0.92,y:0.18,roles:["environmental/livelihood signal"],provenance:[prov("WM-S02","LATER_MEMORY")],visibleAt:"START",navigationalReconstruction:true},
    {id:"WATER",label:"Water stress",type:"SIGNAL",x:0.86,y:0.38,roles:["environmental/livelihood signal"],provenance:[prov("WM-S02","LATER_MEMORY")],visibleAt:"START",navigationalReconstruction:true},
    {id:"FUTURE",label:"Later Green Belt / political / global outcomes",type:"SYSTEM",x:0,y:1.1,roles:["hidden future"],provenance:[],visibleAt:"AFTER_REVEAL",navigationalReconstruction:true}
  ],
  relations:[
    {id:"R1",from:"M",to:"UON",type:"WORKS_WITH",evidenceStatus:"SUPPORTED",label:"academic role",provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")]},
    {id:"R2",from:"M",to:"NCWK",type:"MEMBER_OF",evidenceStatus:"SUPPORTED",label:"women's organizational participation",provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")]},
    {id:"R3",from:"RW",to:"M",type:"INFLUENCES",evidenceStatus:"SUPPORTED",label:"reported practical environmental needs",provenance:[prov("WM-S02","LATER_MEMORY","Later account; does not provide a complete contemporaneous causal chain.")]},
    {id:"R4",from:"SCI",to:"M",type:"SUPPORTS",evidenceStatus:"SUPPORTED",label:"scientific capability",provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")]},
    {id:"R5",from:"FIREWOOD",to:"RW",type:"AFFECTED_BY",evidenceStatus:"SUPPORTED",label:"livelihood burden",provenance:[prov("WM-S02","LATER_MEMORY")]},
    {id:"R6",from:"WATER",to:"RW",type:"AFFECTED_BY",evidenceStatus:"SUPPORTED",label:"livelihood burden",provenance:[prov("WM-S02","LATER_MEMORY")]}
  ],
  constraints:[
    {id:"C1",label:"Limited formal state authority",type:"INSTITUTIONAL",strength:"VERIFIED",affects:["M","P-ADVOCATE","P-REQUEST"],provenance:[prov("FSP-M1976-AUTH","FSP_INFERENCE","Structural inference from public role; requires further historical enrichment for detailed institutional claims.")]},
    {id:"C2",label:"Gendered professional / social constraints",type:"SOCIAL",strength:"PROBABLE",affects:["M","P-ADVOCATE","P-ORGANIZE"],provenance:[prov("FSP-M1976-GENDER","FSP_INFERENCE","Placeholder structural constraint pending enriched Maathai situated-entry sourcing.")]}
  ],
  institutions:[
    {id:"IF-UON",label:"University field",memberLocusIds:["M","UON","SCI"],roleEffects:["scientific expertise","teaching/research access","limited direct political authority"],provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS")]},
    {id:"IF-NCWK",label:"Women's organizational field",memberLocusIds:["M","NCWK","RW"],roleEffects:["organizational access","contact with reported livelihood concerns","collective-action possibilities"],provenance:[prov("WM-S01","HISTORICAL_SYNTHESIS"),prov("WM-S02","LATER_MEMORY")]},
    {id:"IF-STATE",label:"State-authority field",memberLocusIds:["STATE"],roleEffects:["formal public authority","policy control","authorization constraints"],provenance:[prov("NAV-STATE","NAVIGATIONAL_RECONSTRUCTION")]}
  ],
  paths:[
    {id:"P-RESEARCH",label:"Investigate environmental conditions",fromLocusId:"M",family:"KNOW_LEARN",state:"OPEN",requiredCapabilities:["scientific expertise"],requiredResources:["time","access to observations"],affectedParties:["RW"],reversible:true,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-RESEARCH","FSP_INFERENCE","Plausible action family, not a documented chosen plan.")]},
    {id:"P-TEACH",label:"Teach / communicate environmental knowledge",fromLocusId:"M",family:"COMMUNICATE",state:"OPEN",requiredCapabilities:["scientific expertise","academic role"],requiredResources:["audience","institutional access"],affectedParties:["UON","RW"],reversible:true,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-TEACH","FSP_INFERENCE","Plausible action family, not a documented chosen plan.")]},
    {id:"P-ORGANIZE",label:"Organize through women's networks",fromLocusId:"M",targetLocusId:"NCWK",family:"ORGANIZE",state:"OPEN",requiredCapabilities:["organizational access"],requiredResources:["relationships","coordination time"],affectedParties:["NCWK","RW"],reversible:true,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-ORGANIZE","FSP_INFERENCE","Plausible action family grounded in documented organizational participation.")]},
    {id:"P-EXPERIMENT",label:"Try a bounded practical intervention",fromLocusId:"M",family:"EXPERIMENT",state:"CONDITIONAL",requiredCapabilities:["scientific knowledge","organizational access"],requiredResources:["participants","materials"],affectedParties:["RW"],reversible:true,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-EXPERIMENT","FSP_INFERENCE","General action family; historical tree-planting outcome remains hidden before reveal.")]},
    {id:"P-REQUEST",label:"Seek institutional support",fromLocusId:"M",targetLocusId:"STATE",family:"REQUEST",state:"CONDITIONAL",requiredCapabilities:["public communication","institutional access"],requiredResources:["recognized channel"],affectedParties:["RW"],reversible:true,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-REQUEST","FSP_INFERENCE","Plausible action family, not a documented chosen plan.")]},
    {id:"P-ADVOCATE",label:"Publicly advocate for change",fromLocusId:"M",targetLocusId:"STATE",family:"ADVOCATE",state:"CONDITIONAL",requiredCapabilities:["public voice","organizational support"],requiredResources:["audience","standing"],affectedParties:["RW"],reversible:false,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-ADVOCATE","FSP_INFERENCE","Plausible action family, not a documented 1976 plan.")]},
    {id:"P-WAIT",label:"Wait / gather more evidence",fromLocusId:"M",family:"WAIT_GATHER",state:"OPEN",requiredCapabilities:[],requiredResources:["time"],affectedParties:["M"],reversible:true,historicalOutcomeHidden:true,recommendation:false,provenance:[prov("FSP-PATH-WAIT","FSP_INFERENCE","Control path preserving non-action / inquiry as a live possibility.")]}
  ],
  gates:[
    {id:"G1",label:"Formal state authority required for direct policy control",state:"NO_AUTHORITY",requiredByPathIds:["P-REQUEST","P-ADVOCATE"],recognizedRole:"public influence without direct state jurisdiction",provenance:[prov("FSP-M1976-AUTH","FSP_INFERENCE","Preliminary structural encoding; enrich with historical source review before public historical claim.")] }
  ],
  remainders:[
    {id:"REM1",label:"Private motive unavailable",type:"UNKNOWN_MOTIVE",attachedToIds:["M"],explanation:"The scene does not claim access to Maathai's complete private motives in 1976."},
    {id:"REM2",label:"Gender / political context requires enrichment",type:"MISSING_SOURCE",attachedToIds:["C2","STATE"],explanation:"The first scene intentionally marks this as incompletely sourced rather than filling the gap with plausible narrative."},
    {id:"REM3",label:"Later political meaning not yet available",type:"UNOBSERVED_CONSEQUENCE",attachedToIds:["P-EXPERIMENT","P-ORGANIZE","P-ADVOCATE"],explanation:"Later environmental-democratic significance remains outside the current horizon."}
  ],
  horizon:{
    hiddenOutcomeIds:["FUTURE"],
    visiblePathIds:["P-RESEARCH","P-TEACH","P-ORGANIZE","P-EXPERIMENT","P-REQUEST","P-ADVOCATE","P-WAIT"],
    minimumLivePathCount:3,
    historicalRevealAllowed:false
  },
  returnPrompts:[
    "What changed in the field?",
    "What became newly possible?",
    "What became harder?",
    "Which relation surprised you?",
    "What remained unresolved?"
  ],
  offAvailable:true
};

export function validateVisualScene(s:VisualScene){
  const failures:string[]=[];
  const locusIds=new Set(s.loci.map(x=>x.id));
  const pathIds=new Set(s.paths.map(x=>x.id));
  const allIds=new Set<string>([
    ...s.loci.map(x=>x.id),
    ...s.constraints.map(x=>x.id),
    ...s.paths.map(x=>x.id),
    ...s.gates.map(x=>x.id)
  ]);

  if(!s.boundedFieldStatement.trim()) failures.push("missing-bounded-field");
  if(s.scaffoldLevel<0||s.scaffoldLevel>3) failures.push("invalid-scaffold-level");
  if(new Set(s.loci.map(x=>x.id)).size!==s.loci.length) failures.push("duplicate-locus-id");

  for(const r of s.relations){
    if(!locusIds.has(r.from)||!locusIds.has(r.to)) failures.push("relation-endpoint:"+r.id);
    if(!r.type) failures.push("untyped-relation:"+r.id);
    if(!r.provenance.length) failures.push("relation-without-provenance:"+r.id);
  }
  for(const c of s.constraints){
    if(!c.type||!c.strength) failures.push("untyped-constraint:"+c.id);
    if(!c.provenance.length) failures.push("constraint-without-provenance:"+c.id);
  }
  for(const p of s.paths){
    if(!locusIds.has(p.fromLocusId)) failures.push("path-origin:"+p.id);
    if(p.targetLocusId&&!locusIds.has(p.targetLocusId)) failures.push("path-target:"+p.id);
    if(p.recommendation) failures.push("recommendation-path:"+p.id);
    if(!p.provenance.length) failures.push("path-without-provenance:"+p.id);
  }
  for(const g of s.gates){
    for(const p of g.requiredByPathIds) if(!pathIds.has(p)) failures.push("gate-path:"+g.id+":"+p);
    if(!g.provenance.length) failures.push("gate-without-provenance:"+g.id);
  }
  for(const r of s.remainders){
    for(const id of r.attachedToIds) if(!allIds.has(id)) failures.push("remainder-target:"+r.id+":"+id);
  }
  const live=s.paths.filter(p=>s.horizon.visiblePathIds.includes(p.id)&&p.state!=="NOT_YET_VISIBLE");
  if(live.length<s.horizon.minimumLivePathCount) failures.push("possibility-collapse");
  if(s.paths.some(p=>p.recommendation)) failures.push("historical-path-marked-recommendation");
  if(!s.remainders.length) failures.push("missing-remainder");
  if(!s.returnPrompts.length) failures.push("missing-return");
  if(!s.offAvailable) failures.push("missing-off");
  return {passes:failures.length===0,failures};
}

export function scaffoldView(s:VisualScene,level:ScaffoldLevel){
  return {
    sceneId:s.sceneId,
    level,
    showExampleFamilies:level>=3,
    showTypedRelations:level>=2,
    showConstraintLabels:level>=2,
    showProvenanceByDefault:level>=3,
    showPaths:level>=1,
    showRemainder:level>=1,
    showReturnOnly:level===0
  };
}

export function visiblePossibilityField(s:VisualScene){
  return s.paths.filter(p=>s.horizon.visiblePathIds.includes(p.id)&&p.state!=="NOT_YET_VISIBLE");
}

export function provenanceForElement(s:VisualScene,id:string){
  const elements:any[]=[...s.loci,...s.relations,...s.constraints,...s.institutions,...s.paths,...s.gates];
  const el=elements.find(x=>x.id===id);
  if(!el) throw new Error("unknown-visual-element:"+id);
  return structuredClone(el.provenance||[]);
}
