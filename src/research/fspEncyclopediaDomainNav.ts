import { ENCYCLOPEDIA_SCOPE, EncyclopediaDomainId, DomainMaturity } from "./fspEncyclopediaScope";

export type ReaderStatusLabel="Available now"|"In development"|"Planned"|"Cross-domain resource"|"Foundation";
export type DomainResourceKind="ENCYCLOPEDIA"|"PRESSBOOK"|"WORKSPACE"|"LAB"|"COURSE_ROUTE"|"REFERENCE";

export interface DomainPublicResource{
  resourceId:string;
  title:string;
  description:string;
  href:string;
  external:boolean;
  kind:DomainResourceKind;
  status:ReaderStatusLabel;
}

export interface DomainPublicNav{
  domainId:EncyclopediaDomainId;
  readerStatus:ReaderStatusLabel;
  summary:string;
  availableNow:string[];
  resources:DomainPublicResource[];
  nativeNavigation:{label:string;href:string}[];
  notYetClaimed:string[];
}

export function readerStatusFor(maturity:DomainMaturity):ReaderStatusLabel{
  if(maturity==="ACTIVE-MATURE") return "Available now";
  if(maturity==="SUBSTANTIAL-INTEGRATION-PENDING") return "In development";
  if(maturity==="SCOPED") return "Planned";
  if(maturity==="CROSS-DOMAIN") return "Cross-domain resource";
  return "Foundation";
}

export const DOMAIN_PUBLIC_NAV:DomainPublicNav[]=[
  {
    domainId:"SCIENCE-INQUIRY",
    readerStatus:"Available now",
    summary:"The first mature public Encyclopedia collection: scientific inquiry across historical and contemporary cases, with narrative, Atlas, tools, comparisons, and one deep live reader.",
    availableNow:["four-chapter philosophical sequence","five-case Atlas","whole-inquiry narratives for Neptune/Vulcan, Galileo, and Newton→Einstein","concept and tool libraries","cross-case comparisons"],
    resources:[
      {resourceId:"SCIENCE-HOME",title:"Inquiry & Science collection",description:"Enter the domain-native science navigation.",href:"#/domains/SCIENCE-INQUIRY",external:false,kind:"ENCYCLOPEDIA",status:"Available now"}
    ],
    nativeNavigation:[
      {label:"Chapters",href:"#/chapters"},
      {label:"Cases",href:"#/cases"},
      {label:"Concepts",href:"#/concepts"},
      {label:"Tools",href:"#/tools"},
      {label:"Comparisons",href:"#/comparisons"}
    ],
    notYetClaimed:["Foucault and DESI do not yet have full whole-inquiry narrative spines.","The science collection is the first mature domain, not the ontology of the whole Encyclopedia."]
  },
  {
    domainId:"HISTORY-PHILOSOPHY",
    readerStatus:"In development",
    summary:"A history of philosophy as situated human inquiry, preserving different inquiry topologies while showing how public philosophical artifacts are inherited, contested, sedimented, and reopened.",
    availableNow:["locked 14-chapter Pressbook","historical interventions","six contemporary inquiry laboratories","existing SUPER inquiry workspace","three-page Pressbooks reconciliation pilot prepared"],
    resources:[
      {resourceId:"HOI-PRESSBOOK",title:"What May We Carry Forward?",description:"Read the existing History of Inquiry Pressbook.",href:"https://pressbooks.pub/whatmaywecarryforward/front-matter/introduction/",external:true,kind:"PRESSBOOK",status:"Available now"},
      {resourceId:"HOI-SUPER",title:"History of Inquiry workspace",description:"Open the existing SUPER inquiry environment.",href:"https://rmertzman-tech.github.io/what-may-we-carry-forward-super/",external:true,kind:"WORKSPACE",status:"Available now"}
    ],
    nativeNavigation:[],
    notYetClaimed:["The full Pressbook has not been ingested into the Encyclopedia.","The current reconciliation adds optional canonical links; it does not turn the course into an FSP introduction."]
  },
  {
    domainId:"ETHICS",
    readerStatus:"In development",
    summary:"Historical ethics, ethical judgment, real-world cases, workbooks, Output Cards, Personal Ethics Journal, and the cumulative Power & Flourishing Laboratory.",
    availableNow:["12-chapter SUPER workbook environment","Output Card and READY/REOPEN workflow","Power & Flourishing Laboratory","Canvas-oriented course architecture"],
    resources:[
      {resourceId:"ETHICS-SUPER",title:"Ethics workbook environment",description:"Open the certified 12-chapter SUPER workbook environment.",href:"https://bobphil.github.io/ethics-super-final/ETHICS-SUPER-FINAL-1.html",external:true,kind:"WORKSPACE",status:"Available now"},
      {resourceId:"ETHICS-PFLAB",title:"Power & Flourishing Laboratory",description:"Open the cumulative Ethics laboratory.",href:"https://bobphil.github.io/ethics-power-flourishing-lab/ETHICS-PFLAB-INTEGRATION-1.html",external:true,kind:"LAB",status:"Available now"}
    ],
    nativeNavigation:[],
    notYetClaimed:["The Historical Ethics Pressbook is not yet represented here as a verified public Encyclopedia route.","Canvas quizzes and journals remain course-native objects, not Encyclopedia resources.","Ethics will keep its own domain-native topology rather than inheriting science navigation."]
  },
  {
    domainId:"LOGIC-ARGUMENT",
    readerStatus:"In development",
    summary:"Reasoning, support and attack, argument schemes, defeaters, Toulmin structures, and executable argument audit.",
    availableNow:["substantial research architecture exists outside the current public shell","argument-kernel and scheme-library work can be integrated later"],
    resources:[],
    nativeNavigation:[],
    notYetClaimed:["No public Logic & Argument collection is certified yet.","The future domain may introduce argument-native objects rather than reuse science case structures."]
  },
  {
    domainId:"AESTHETICS",
    readerStatus:"Planned",
    summary:"A future domain for perception, creation, interpretation, judgment, practices, audiences, traditions, and cultural standing.",
    availableNow:["domain scope and cross-domain governance are defined"],
    resources:[],
    nativeNavigation:[],
    notYetClaimed:["No public Aesthetics book or collection is certified yet.","Aesthetic inquiry will not be forced into scientific or ethical topology."]
  },
  {
    domainId:"INSTITUTIONS-CONNECTED-DOING",
    readerStatus:"Cross-domain resource",
    summary:"Cross-domain resources for persons, roles, institutions, constraints, authority, practical power, connections, and shared tasks.",
    availableNow:["canonical cross-domain scope is defined","application architecture exists in the broader FSP ecosystem"],
    resources:[],
    nativeNavigation:[],
    notYetClaimed:["A standalone public collection has not yet been produced.","Institutional representation never substitutes for a person or domain-specific evidence."]
  },
  {
    domainId:"CORE",
    readerStatus:"Foundation",
    summary:"The thin cross-domain FSP constitutional grammar shared by domain libraries without replacing their native ontologies.",
    availableNow:[...ENCYCLOPEDIA_SCOPE.universalCore],
    resources:[],
    nativeNavigation:[],
    notYetClaimed:["The shared core is deliberately thin.","Shared grammar does not imply shared domain ontology."]
  },
  {
    domainId:"FORMAL-EXECUTABLE",
    readerStatus:"Cross-domain resource",
    summary:"The executable architecture: states, transitions, invariants, relation graphs, reducers, projection contracts, and validation tests.",
    availableNow:["formal schemas and executable regression architecture exist in the project repository"],
    resources:[],
    nativeNavigation:[],
    notYetClaimed:["Formal representation is not a replacement for the world, person, historical case, or disciplinary judgment."]
  }
];

export const TOP_LEVEL_PUBLIC_NAV=[
  {label:"Domains",href:"#/domains"},
  {label:"Core",href:"#/core"},
  {label:"Resources",href:"#/resources"},
  {label:"Routes",href:"#/routes"},
  {label:"About",href:"#/about"}
] as const;

export function publicDomain(id:EncyclopediaDomainId):DomainPublicNav{
  const d=DOMAIN_PUBLIC_NAV.find(x=>x.domainId===id);
  if(!d) throw new Error("unknown public domain: "+id);
  return structuredClone(d);
}

export function validateDomainPublicNav():{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  const scopeIds=ENCYCLOPEDIA_SCOPE.domains.map(d=>d.domainId);
  const navIds=DOMAIN_PUBLIC_NAV.map(d=>d.domainId);
  for(const id of scopeIds) if(!navIds.includes(id)) failures.push("missing-domain:"+id);
  if(new Set(navIds).size!==navIds.length) failures.push("duplicate-domain");
  if(TOP_LEVEL_PUBLIC_NAV.map(x=>x.label).join(",")!=="Domains,Core,Resources,Routes,About") failures.push("top-nav-drift");
  const science=publicDomain("SCIENCE-INQUIRY");
  for(const label of ["Chapters","Cases","Concepts","Tools","Comparisons"]) if(!science.nativeNavigation.some(x=>x.label===label)) failures.push("science-nav-missing:"+label);
  const hoi=publicDomain("HISTORY-PHILOSOPHY");
  if(!hoi.resources.some(r=>r.resourceId==="HOI-PRESSBOOK"&&r.external)) failures.push("hoi-pressbook-missing");
  if(!hoi.resources.some(r=>r.resourceId==="HOI-SUPER"&&r.external)) failures.push("hoi-super-missing");
  const ethics=publicDomain("ETHICS");
  if(!ethics.resources.some(r=>r.resourceId==="ETHICS-SUPER")) failures.push("ethics-super-missing");
  if(!ethics.resources.some(r=>r.resourceId==="ETHICS-PFLAB")) failures.push("ethics-pflab-missing");
  if(ethics.resources.some(r=>/pressbook/i.test(r.resourceId+r.title))) failures.push("unverified-ethics-pressbook-exposed");
  for(const d of DOMAIN_PUBLIC_NAV){
    const scope=ENCYCLOPEDIA_SCOPE.domains.find(x=>x.domainId===d.domainId);
    if(scope && d.readerStatus!==readerStatusFor(scope.maturity)) failures.push("status-mismatch:"+d.domainId);
  }
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
