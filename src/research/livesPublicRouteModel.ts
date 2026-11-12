export type EvidenceDensity="LOW"|"MEDIUM"|"HIGH";
export type SourceClass="PRIMARY_FIRST_PERSON"|"CONTEMPORARY_DOCUMENT"|"HISTORICAL_INSTITUTIONAL"|"FSP_INFERENCE";
export type TopologyModule=
  |"INTENDED_ACTUAL"
  |"FAILED_PLAN"
  |"STRATEGY_REVISION"
  |"AUTHORIZATION_STANDING"
  |"TEXT_CONCEPT_DEVELOPMENT"
  |"INSTITUTIONAL_ROLE"
  |"COUNTERFACTUAL_PROBE"
  |"HINDSIGHT_CONTROL";

export interface LivesSource{
  sourceId:string;
  sourceClass:SourceClass;
  label:string;
  locator:string;
}
export interface LivesClaim{
  claimId:string;
  text:string;
  sourceIds:string[];
  claimCeiling:string;
  fspInference:boolean;
  revealAtStateId:string;
}
export interface CapabilityDelta{
  gained:string[];
  reduced:string[];
  changed:string[];
}
export interface LivesState{
  stateId:string;
  label:string;
  period:string;
  evidenceDensity:EvidenceDensity;
  capabilities:string[];
  constraints:string[];
  institutions:string[];
  livePossibilities:string[];
  claimIds:string[];
}
export interface LivesTransition{
  transitionId:string;
  fromStateId:string;
  toStateId:string;
  label:string;
  documentedChange:string;
  structuralInference:string;
  remainder:string[];
  sourceIds:string[];
  capabilityDelta:CapabilityDelta;
  constraintDelta:{added:string[];reduced:string[];changed:string[]};
  modules:TopologyModule[];
  claimIds:string[];
}
export interface PortabilityContract{
  structuralRelation:string;
  mustNotTravel:string[];
  claimCeiling:string;
}
export interface LivesDossier{
  dossierId:string;
  personName:string;
  canonicalOwner:string;
  researchQuestion:string;
  dominantTopology:string;
  claimCeiling:string;
  sources:LivesSource[];
  claims:LivesClaim[];
  states:LivesState[];
  transitions:LivesTransition[];
  topologyModules:TopologyModule[];
  portability:PortabilityContract;
}

export interface PublicLivesRoute{
  canonicalOwner:string;
  dossierId:string;
  commonShell:["PERSON","STATES","TRANSITIONS","SOURCES","CAPABILITY_CONSTRAINT","HISTORICAL_RETURN","PORTABILITY"];
  activeModules:TopologyModule[];
  surface:{
    personName:string;
    researchQuestion:string;
    dominantTopology:string;
    claimCeiling:string;
    stateCount:number;
    transitionCount:number;
  };
  inspect:{
    states:LivesState[];
    transitions:LivesTransition[];
  };
  deep:{
    sources:LivesSource[];
    claims:LivesClaim[];
  };
  portability:PortabilityContract;
}

const src=(sourceId:string,sourceClass:SourceClass,label:string,locator:string):LivesSource=>({sourceId,sourceClass,label,locator});

export const MAATHAI_DOSSIER: LivesDossier={
  dossierId:"LIVES-MAATHAI-1",
  personName:"Wangari Maathai",
  canonicalOwner:"FSP-LIVES-IN-TRANSFORMATION-PILOT-1",
  researchQuestion:"How did bounded environmental action build capability, encounter institutional constraint, and widen the practical problem field over time?",
  dominantTopology:"bounded practical task -> repeated coordination -> capability expansion -> institutional friction -> widened problem map -> civic/political action -> institutional re-location",
  claimCeiling:"This reconstruction does not provide transparent access to Maathai's private experience, total motives, or a complete causal history.",
  sources:[
    src("WM-S01","HISTORICAL_INSTITUTIONAL","Nobel biographical record","https://www.nobelprize.org/prizes/peace/2004/maathai/biographical/"),
    src("WM-S02","PRIMARY_FIRST_PERSON","Nobel lecture, 10 December 2004","https://erepository.uonbi.ac.ke/items/06c80329-a564-4c2f-83f4-c29c477af523"),
    src("WM-S03","HISTORICAL_INSTITUTIONAL","Green Belt Movement history","https://www.greenbeltmovement.org/history/"),
    src("WM-S04","PRIMARY_FIRST_PERSON","UN Africa Renewal interview, 2004","https://africarenewal.un.org/en/magazine/getting-heart-matter"),
    src("WM-S05","CONTEMPORARY_DOCUMENT","Amnesty International, 1992","https://www.amnesty.org/en/documents/afr32/004/1992/en/"),
    src("WM-S10","HISTORICAL_INSTITUTIONAL","University of Nairobi Wangari Maathai Institute biography","https://wmi.uonbi.ac.ke/basic-page/about-prof-wangari-maathai"),
    src("WM-S11","HISTORICAL_INSTITUTIONAL","Nobel Peace Prize facts / citation","https://www.nobelprize.org/prizes/peace/2004/maathai/facts/")
  ],
  claims:[
    {claimId:"M-C1",text:"By the mid-1970s Maathai held scientific and university roles and participated in women's organizational networks.",sourceIds:["WM-S01","WM-S10"],claimCeiling:"Supports public role and capability, not a fixed later life plan.",fspInference:false,revealAtStateId:"M-A"},
    {claimId:"M-C2",text:"The 1977 Green Belt initiative responded to practical environmental and livelihood concerns reported by rural women.",sourceIds:["WM-S02","WM-S03"],claimCeiling:"Supports a bounded account of the practical problem; not a complete motive map.",fspInference:false,revealAtStateId:"M-B"},
    {claimId:"M-C3",text:"Repeated organizing expanded grassroots capability and the reach of the movement.",sourceIds:["WM-S01","WM-S03"],claimCeiling:"Capability expansion does not imply ideological convergence or inevitable political development.",fspInference:true,revealAtStateId:"M-B"},
    {claimId:"M-C4",text:"Maathai later described environmental protection as becoming inseparable from democratic participation when organizing encountered governance constraints.",sourceIds:["WM-S04","WM-S05"],claimCeiling:"Later retrospective interpretation does not prove this was the full original 1977 intention.",fspInference:false,revealAtStateId:"M-C"},
    {claimId:"M-C5",text:"Maathai later entered electoral politics and eventually gained formal parliamentary and ministerial standing.",sourceIds:["WM-S01","WM-S10"],claimCeiling:"Later office must not leak backward into early-state interpretation.",fspInference:false,revealAtStateId:"M-E"},
    {claimId:"M-C6",text:"Maathai received the Nobel Peace Prize in 2004.",sourceIds:["WM-S11"],claimCeiling:"Historical recognition does not validate every earlier strategy or create ethical authority for imitation.",fspInference:false,revealAtStateId:"M-E"}
  ],
  states:[
    {stateId:"M-A",label:"Academic formation and organizational position",period:"mid-1970s",evidenceDensity:"MEDIUM",capabilities:["scientific training","university participation","women's organizational access"],constraints:["limited public organizational reach"],institutions:["University of Nairobi","National Council of Women of Kenya"],livePossibilities:["research","teaching","women's organizational work","bounded environmental action"],claimIds:["M-C1"]},
    {stateId:"M-B",label:"Grassroots environmental organization",period:"1977-1988",evidenceDensity:"HIGH",capabilities:["community tree planting","training routines","grassroots networks","environmental advocacy"],constraints:["resource limits","local organizational dependence"],institutions:["Green Belt Movement","National Council of Women of Kenya"],livePossibilities:["expand nurseries","train participants","broaden environmental education","seek institutional support"],claimIds:["M-C2","M-C3"]},
    {stateId:"M-C",label:"Environmental-democratic opposition",period:"1989-1996",evidenceDensity:"HIGH",capabilities:["national advocacy","coalition participation","public-space defense"],constraints:["state opposition","repression risk","restricted civic participation"],institutions:["Green Belt Movement","Kenyan state institutions"],livePossibilities:["public advocacy","rights solidarity","land defense","institutional challenge"],claimIds:["M-C4"]},
    {stateId:"M-D",label:"Continued advocacy after electoral failure",period:"1997-2001",evidenceDensity:"MEDIUM",capabilities:["public standing","environmental advocacy","international visibility"],constraints:["no elected office","political hostility"],institutions:["civil society networks","political field"],livePossibilities:["continued advocacy","future electoral participation"],claimIds:[]},
    {stateId:"M-E",label:"Formal institutional and global standing",period:"2002-2011",evidenceDensity:"HIGH",capabilities:["legislative standing","government role","global advocacy"],constraints:["institutional responsibility","public representational burden"],institutions:["Parliament of Kenya","Government of Kenya","international institutions"],livePossibilities:["policy work","global environmental advocacy"],claimIds:["M-C5","M-C6"]}
  ],
  transitions:[
    {transitionId:"M-T1",fromStateId:"M-A",toStateId:"M-B",label:"Bounded tree-planting intervention becomes sustained grassroots organization",documentedChange:"The 1977 initiative developed into a wider Green Belt movement.",structuralInference:"Repeated practical action expanded organizational capability and future reachability.",remainder:["complete motive structure","participant-level experience"],sourceIds:["WM-S02","WM-S03"],capabilityDelta:{gained:["grassroots organization","training routines","network reach"],reduced:[],changed:["scientific knowledge became linked to public environmental practice"]},constraintDelta:{added:["coordination burden"],reduced:[],changed:["problem scale widened"]},modules:["INTENDED_ACTUAL","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],claimIds:["M-C2","M-C3"]},
    {transitionId:"M-T2",fromStateId:"M-B",toStateId:"M-C",label:"Environmental action encounters governance constraint",documentedChange:"Environmental organizing became connected to public-land, rights, and democratic conflicts.",structuralInference:"Institutional friction changed the practical problem map.",remainder:["degree of causal contribution of each conflict","private motive development"],sourceIds:["WM-S03","WM-S04","WM-S05"],capabilityDelta:{gained:["national advocacy","coalition reach"],reduced:[],changed:["environmental practice became linked with civic action"]},constraintDelta:{added:["state repression risk","organizing restrictions"],reduced:[],changed:["institutional constraint became more salient"]},modules:["INTENDED_ACTUAL","AUTHORIZATION_STANDING","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],claimIds:["M-C4"]},
    {transitionId:"M-T3",fromStateId:"M-C",toStateId:"M-D",label:"Electoral attempt fails without erasing accumulated capability",documentedChange:"A national electoral attempt failed while public advocacy continued.",structuralInference:"Failed plan did not reset the capability field.",remainder:["full motive mix for candidacy"],sourceIds:["WM-S01"],capabilityDelta:{gained:["electoral experience"],reduced:[],changed:["political pathway revised"]},constraintDelta:{added:[],reduced:[],changed:["formal office remained unavailable"]},modules:["FAILED_PLAN","AUTHORIZATION_STANDING","HINDSIGHT_CONTROL"],claimIds:[]},
    {transitionId:"M-T4",fromStateId:"M-D",toStateId:"M-E",label:"Public influence becomes formal institutional standing",documentedChange:"Maathai won parliamentary office and later served as Assistant Minister.",structuralInference:"Formal authorization changed while earlier advocacy capabilities remained.",remainder:["full relation between prior activism and electoral success"],sourceIds:["WM-S01","WM-S10"],capabilityDelta:{gained:["legislative standing","government access"],reduced:[],changed:["practical influence became partly formal authority"]},constraintDelta:{added:["institutional responsibility"],reduced:["lack of elected standing"],changed:["relation to state institutions"]},modules:["AUTHORIZATION_STANDING","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],claimIds:["M-C5"]}
  ],
  topologyModules:["INTENDED_ACTUAL","FAILED_PLAN","AUTHORIZATION_STANDING","INSTITUTIONAL_ROLE","HINDSIGHT_CONTROL"],
  portability:{
    structuralRelation:"A bounded practical task can sometimes build capability and expose deeper constraints that alter the problem map.",
    mustNotTravel:["tree planting as a universal tactic","confrontation with authority as a default","persistence as a guarantee of success","historical recognition as ethical validation"],
    claimCeiling:"This is a portable structural hypothesis, not a recommendation or prediction."
  }
};

export function validateLivesDossier(d:LivesDossier){
  const failures:string[]=[];
  if(d.states.length<3) failures.push("too-few-states");
  if(d.transitions.length<2) failures.push("too-few-transitions");
  const sourceIds=new Set(d.sources.map(s=>s.sourceId));
  const stateIds=new Set(d.states.map(s=>s.stateId));
  const claimIds=new Set(d.claims.map(c=>c.claimId));
  for(const c of d.claims){
    if(!stateIds.has(c.revealAtStateId)) failures.push("claim-reveal-state:"+c.claimId);
    for(const s of c.sourceIds) if(!sourceIds.has(s)) failures.push("unknown-claim-source:"+c.claimId+":"+s);
  }
  for(const t of d.transitions){
    if(!stateIds.has(t.fromStateId)||!stateIds.has(t.toStateId)) failures.push("unknown-transition-state:"+t.transitionId);
    for(const s of t.sourceIds) if(!sourceIds.has(s)) failures.push("unknown-transition-source:"+t.transitionId+":"+s);
    for(const c of t.claimIds) if(!claimIds.has(c)) failures.push("unknown-transition-claim:"+t.transitionId+":"+c);
  }
  for(const s of d.states) for(const c of s.claimIds) if(!claimIds.has(c)) failures.push("unknown-state-claim:"+s.stateId+":"+c);
  if(!d.claimCeiling.trim()) failures.push("missing-claim-ceiling");
  if(!d.portability.claimCeiling.trim()) failures.push("missing-portability-ceiling");
  return {passes:failures.length===0,failures};
}

export function compilePublicLivesRoute(d:LivesDossier):PublicLivesRoute{
  const audit=validateLivesDossier(d);
  if(!audit.passes) throw new Error("invalid-lives-dossier:"+audit.failures.join(","));
  return {
    canonicalOwner:d.canonicalOwner,
    dossierId:d.dossierId,
    commonShell:["PERSON","STATES","TRANSITIONS","SOURCES","CAPABILITY_CONSTRAINT","HISTORICAL_RETURN","PORTABILITY"],
    activeModules:[...d.topologyModules],
    surface:{personName:d.personName,researchQuestion:d.researchQuestion,dominantTopology:d.dominantTopology,claimCeiling:d.claimCeiling,stateCount:d.states.length,transitionCount:d.transitions.length},
    inspect:{states:structuredClone(d.states),transitions:structuredClone(d.transitions)},
    deep:{sources:structuredClone(d.sources),claims:structuredClone(d.claims)},
    portability:structuredClone(d.portability)
  };
}

export function historicalView(route:PublicLivesRoute,stateId:string){
  const stateIndex=route.inspect.states.findIndex(s=>s.stateId===stateId);
  if(stateIndex<0) throw new Error("unknown-state:"+stateId);
  const visibleStateIds=new Set(route.inspect.states.slice(0,stateIndex+1).map(s=>s.stateId));
  const visibleClaims=route.deep.claims.filter(c=>visibleStateIds.has(c.revealAtStateId));
  const hiddenClaims=route.deep.claims.filter(c=>!visibleStateIds.has(c.revealAtStateId));
  const visibleSourceIds=new Set(visibleClaims.flatMap(c=>c.sourceIds));
  return {
    currentState:structuredClone(route.inspect.states[stateIndex]),
    visibleClaims:structuredClone(visibleClaims),
    hiddenClaimIds:hiddenClaims.map(c=>c.claimId),
    visibleSources:route.deep.sources.filter(s=>visibleSourceIds.has(s.sourceId)).map(s=>structuredClone(s))
  };
}

export function recoverProvenance(route:PublicLivesRoute,claimId:string){
  const claim=route.deep.claims.find(c=>c.claimId===claimId);
  if(!claim) throw new Error("unknown-claim:"+claimId);
  const sources=claim.sourceIds.map(id=>route.deep.sources.find(s=>s.sourceId===id)).filter((x):x is LivesSource=>!!x);
  return {claim:structuredClone(claim),sources:structuredClone(sources)};
}

export function capabilityChange(route:PublicLivesRoute,transitionId:string){
  const t=route.inspect.transitions.find(x=>x.transitionId===transitionId);
  if(!t) throw new Error("unknown-transition:"+transitionId);
  return {capabilityDelta:structuredClone(t.capabilityDelta),constraintDelta:structuredClone(t.constraintDelta),historicalReturnStateId:t.toStateId};
}

export interface PortabilitySubmission{
  structuralRelation:string;
  contextualSimilarity:string;
  contextualDifference:string;
  nonPortableFeature:string;
  claimCeiling:string;
  reversibleTest:string;
  recommendation?:string;
}

export function validatePortabilitySubmission(route:PublicLivesRoute,p:PortabilitySubmission){
  const failures:string[]=[];
  if(!p.structuralRelation.trim()) failures.push("missing-structural-relation");
  if(!p.contextualDifference.trim()) failures.push("missing-contextual-difference");
  if(!p.nonPortableFeature.trim()) failures.push("missing-nonportable-feature");
  if(!p.claimCeiling.trim()) failures.push("missing-claim-ceiling");
  if(!p.reversibleTest.trim()) failures.push("missing-reversible-test");
  if(p.recommendation?.trim()) failures.push("recommendation-inflation");
  const lower=p.structuralRelation.toLowerCase();
  if(lower.includes("should do what maathai")||lower.includes("must imitate")||lower.includes("always works")) failures.push("exemplar-inflation");
  return {passes:failures.length===0,failures};
}
