export type EncyclopediaDomainId =
  | "CORE"
  | "SCIENCE-INQUIRY"
  | "ETHICS"
  | "HISTORY-PHILOSOPHY"
  | "LOGIC-ARGUMENT"
  | "AESTHETICS"
  | "INSTITUTIONS-CONNECTED-DOING"
  | "FORMAL-EXECUTABLE";

export type DomainMaturity =
  | "FOUNDATIONAL"
  | "ACTIVE-MATURE"
  | "SUBSTANTIAL-INTEGRATION-PENDING"
  | "SCOPED"
  | "CROSS-DOMAIN";

export type ResourceDepth = "QUICK"|"STANDARD"|"DEEP";
export type PublicStatus =
  | "SCOPED"
  | "CANONICAL"
  | "NARRATIVE"
  | "ATLAS"
  | "DEEP_READER"
  | "CLASSROOM"
  | "VR"
  | "APPLICATION"
  | "RESEARCH";

export type CanonicalOwnerKind =
  | "CORE"
  | "DOMAIN"
  | "SHARED-HISTORICAL"
  | "CASE"
  | "FORMAL";

export interface EncyclopediaDomain {
  domainId:EncyclopediaDomainId;
  title:string;
  publicQuestion:string;
  purpose:string;
  maturity:DomainMaturity;
  nativeTopology:string[];
  sharedCoreIds:string[];
  routeIds:string[];
  publicStatus:PublicStatus[];
}

export interface CanonicalOwnership {
  resourceId:string;
  ownerKind:CanonicalOwnerKind;
  ownerId:string;
  canonicalTitle:string;
  reusableAcross:string[];
  rule:string;
}

export interface EncyclopediaRoute {
  routeId:string;
  title:string;
  routeType:"BOOK"|"COURSE"|"COLLECTION"|"LAB"|"REFERENCE";
  primaryDomainId:EncyclopediaDomainId;
  includesDomainIds:EncyclopediaDomainId[];
  canonicalResourceIds:string[];
  projectionTargets:string[];
  rule:string;
}

export interface ResourceDepthProfile {
  depth:ResourceDepth;
  publicRole:string;
  mayCompress:string[];
  mayNotChange:string[];
}

export interface EncyclopediaScope {
  title:string;
  publicIdentity:string;
  universalCore:string[];
  domains:EncyclopediaDomain[];
  ownership:CanonicalOwnership[];
  routes:EncyclopediaRoute[];
  depths:ResourceDepthProfile[];
  governance:readonly string[];
}

export const UNIVERSAL_FSP_CORE=[
  "DOING",
  "MAP-WORLD-PERSON",
  "CLAIM",
  "EVIDENCE",
  "PROVENANCE",
  "STANDING",
  "AUTHORITY",
  "POSSIBILITY",
  "TRANSITION",
  "REMAINDER",
  "CLAIM-CEILING",
  "REOPEN",
  "AUTHORIAL-RETURN"
] as const;

export const ENCYCLOPEDIA_DOMAINS:EncyclopediaDomain[]=[
  {
    domainId:"CORE",
    title:"FSP Core",
    publicQuestion:"What shared distinctions make inquiry across different domains inspectable without forcing those domains into one ontology?",
    purpose:"Provide the constitutional cross-domain grammar used by all domain libraries and routes.",
    maturity:"FOUNDATIONAL",
    nativeTopology:["Doing","Map / World / Person","claims","evidence","provenance","standing","possibility","transition","remainder","claim ceiling","REOPEN","Authorial Return"],
    sharedCoreIds:[...UNIVERSAL_FSP_CORE],
    routeIds:["ROUTE-FSP-REFERENCE"],
    publicStatus:["CANONICAL"]
  },
  {
    domainId:"SCIENCE-INQUIRY",
    title:"Inquiry & Science",
    publicQuestion:"How do scientific inquiries change through evidence, revision, meaning change, controlled probes, and framework transformation?",
    purpose:"Serve as the first mature domain collection and stress-test the shared FSP architecture on historical and contemporary science.",
    maturity:"ACTIVE-MATURE",
    nativeTopology:["experiment","measurement","model","theory","auxiliary","framework","anomaly","prediction","scientific case"],
    sharedCoreIds:["CLAIM","EVIDENCE","PROVENANCE","TRANSITION","REMAINDER","CLAIM-CEILING","REOPEN"],
    routeIds:["ROUTE-SCIENCE-ENCYCLOPEDIA","ROUTE-PHILSCI-COURSE"],
    publicStatus:["NARRATIVE","ATLAS","DEEP_READER","CLASSROOM","VR","RESEARCH"]
  },
  {
    domainId:"ETHICS",
    title:"Ethics",
    publicQuestion:"How do persons, practices, institutions, reasons, formation, responsibility, power, and flourishing interact in ethical inquiry?",
    purpose:"Integrate historical ethics, real-world cases, workbooks, output cards, journals, and the Power & Flourishing Laboratory without reducing ethics to scientific inquiry.",
    maturity:"SUBSTANTIAL-INTEGRATION-PENDING",
    nativeTopology:["moral formation","reasons","obligation","virtue","welfare","respect","justice","care","capability","responsibility","institutional power"],
    sharedCoreIds:["DOING","MAP-WORLD-PERSON","PROVENANCE","STANDING","AUTHORITY","REMAINDER","CLAIM-CEILING","REOPEN","AUTHORIAL-RETURN"],
    routeIds:["ROUTE-ETHICS-HISTORY","ROUTE-ETHICS-COURSE","ROUTE-PFLAB"],
    publicStatus:["SCOPED","CLASSROOM"]
  },
  {
    domainId:"HISTORY-PHILOSOPHY",
    title:"History of Philosophy",
    publicQuestion:"How can philosophical inquiries be followed historically without forcing dialogical, demonstrative, systematic, genealogical, or aporetic texts into one argumentative shape?",
    purpose:"Provide reusable historical master resources, philosopher/text narratives, transformation corridors, and course-specific apertures.",
    maturity:"SUBSTANTIAL-INTEGRATION-PENDING",
    nativeTopology:["philosopher","text","inquiry topology","historical context","concept transformation","argument","dialogue","genealogy","system"],
    sharedCoreIds:["DOING","PROVENANCE","TRANSITION","REMAINDER","CLAIM-CEILING","REOPEN"],
    routeIds:["ROUTE-HISTORY-PHILOSOPHY","ROUTE-HOI-PRESSBOOK","ROUTE-TRANSFORMATION-CORRIDOR"],
    publicStatus:["SCOPED"]
  },
  {
    domainId:"LOGIC-ARGUMENT",
    title:"Logic & Argument",
    publicQuestion:"How do claims support, attack, defeat, qualify, and reopen one another across different forms of reasoning?",
    purpose:"Integrate deduction, induction, abduction, analogy, Toulmin structure, schemes, attack/support grammar, and executable argument audit.",
    maturity:"SUBSTANTIAL-INTEGRATION-PENDING",
    nativeTopology:["argument","premise","conclusion","warrant","support","attack","defeater","scheme","validity","strength","burden"],
    sharedCoreIds:["CLAIM","PROVENANCE","STANDING","TRANSITION","REMAINDER","CLAIM-CEILING","REOPEN"],
    routeIds:["ROUTE-LOGIC-BOOK","ROUTE-ARGUMENT-LAB"],
    publicStatus:["SCOPED"]
  },
  {
    domainId:"AESTHETICS",
    title:"Aesthetics",
    publicQuestion:"How do perception, interpretation, creation, judgment, practice, cultural standing, and disagreement interact in aesthetic inquiry?",
    purpose:"Provide a future domain library whose native objects and practices are not forced into scientific or ethical topology.",
    maturity:"SCOPED",
    nativeTopology:["perception","artwork","practice","interpretation","expression","judgment","audience","tradition","institution"],
    sharedCoreIds:["DOING","MAP-WORLD-PERSON","PROVENANCE","STANDING","REMAINDER","CLAIM-CEILING","REOPEN","AUTHORIAL-RETURN"],
    routeIds:["ROUTE-AESTHETICS-BOOK"],
    publicStatus:["SCOPED"]
  },
  {
    domainId:"INSTITUTIONS-CONNECTED-DOING",
    title:"Institutions & Connected Doing",
    publicQuestion:"How do persons, roles, rules, authority, practical power, constraints, and shared tasks shape connected human action?",
    purpose:"Provide cross-domain structures for institutions and connected Doing without treating institutional representation as a substitute for persons or domain authority.",
    maturity:"CROSS-DOMAIN",
    nativeTopology:["person","institution","role","constraint","authority","practical power","connection","shared task","standing"],
    sharedCoreIds:["DOING","MAP-WORLD-PERSON","STANDING","AUTHORITY","POSSIBILITY","REOPEN","AUTHORIAL-RETURN"],
    routeIds:["ROUTE-CONNECTED-DOING"],
    publicStatus:["CANONICAL","APPLICATION"]
  },
  {
    domainId:"FORMAL-EXECUTABLE",
    title:"Formal & Executable FSP",
    publicQuestion:"How can FSP representations, invariants, state transitions, relation graphs, and projection contracts be made executable without confusing the model with the world?",
    purpose:"House the formal schemas, reducers, invariants, graph contracts, projection profiles, and research validation architecture.",
    maturity:"CROSS-DOMAIN",
    nativeTopology:["state","transition","invariant","relation","projection","profile","reducer","test","claim ceiling"],
    sharedCoreIds:["PROVENANCE","TRANSITION","REMAINDER","CLAIM-CEILING","REOPEN"],
    routeIds:["ROUTE-FORMAL-REFERENCE"],
    publicStatus:["CANONICAL","RESEARCH"]
  }
];

export const CANONICAL_OWNERSHIP:CanonicalOwnership[]=[
  {
    resourceId:"CORE:CLAIM-CEILING",ownerKind:"CORE",ownerId:"CORE",canonicalTitle:"Claim Ceiling",
    reusableAcross:["SCIENCE-INQUIRY","ETHICS","HISTORY-PHILOSOPHY","LOGIC-ARGUMENT","AESTHETICS","INSTITUTIONS-CONNECTED-DOING"],
    rule:"Domain routes may define domain-native applications of claim ceilings but may not redefine the canonical cross-domain meaning silently."
  },
  {
    resourceId:"CORE:REOPEN",ownerKind:"CORE",ownerId:"CORE",canonicalTitle:"REOPEN",
    reusableAcross:["SCIENCE-INQUIRY","ETHICS","HISTORY-PHILOSOPHY","LOGIC-ARGUMENT","AESTHETICS","INSTITUTIONS-CONNECTED-DOING"],
    rule:"Courses and books reference the canonical REOPEN resource and may add domain-specific triggers without changing its cross-domain role."
  },
  {
    resourceId:"CASE:NEPTUNE-VULCAN",ownerKind:"CASE",ownerId:"SCIENCE-INQUIRY",canonicalTitle:"Neptune and Vulcan",
    reusableAcross:["SCIENCE-INQUIRY","HISTORY-PHILOSOPHY","LOGIC-ARGUMENT"],
    rule:"Routes and projections may select apertures or depths but may not clone a competing canonical history."
  },
  {
    resourceId:"HIST:ARISTOTLE",ownerKind:"SHARED-HISTORICAL",ownerId:"HISTORY-PHILOSOPHY",canonicalTitle:"Aristotle — Historical Master Resource",
    reusableAcross:["HISTORY-PHILOSOPHY","ETHICS","LOGIC-ARGUMENT","AESTHETICS"],
    rule:"Domain libraries use apertures or overlays onto the shared historical master rather than creating independent Aristotle histories."
  }
];

export const ENCYCLOPEDIA_ROUTES:EncyclopediaRoute[]=[
  {
    routeId:"ROUTE-FSP-REFERENCE",title:"FSP Core Reference",routeType:"REFERENCE",primaryDomainId:"CORE",
    includesDomainIds:["CORE"],canonicalResourceIds:["CORE:CLAIM-CEILING","CORE:REOPEN"],projectionTargets:["ENCYCLOPEDIA"],
    rule:"Reference route exposes canonical core resources at appropriate public depths."
  },
  {
    routeId:"ROUTE-SCIENCE-ENCYCLOPEDIA",title:"Scientific Inquiry Collection",routeType:"COLLECTION",primaryDomainId:"SCIENCE-INQUIRY",
    includesDomainIds:["CORE","SCIENCE-INQUIRY"],canonicalResourceIds:["CASE:NEPTUNE-VULCAN"],projectionTargets:["ENCYCLOPEDIA","CLASSROOM","VR","RESEARCH"],
    rule:"This is the first mature public collection; it does not define the scope of the whole Encyclopedia."
  },
  {
    routeId:"ROUTE-ETHICS-HISTORY",title:"Historical Ethics Book",routeType:"BOOK",primaryDomainId:"ETHICS",
    includesDomainIds:["CORE","ETHICS","HISTORY-PHILOSOPHY","INSTITUTIONS-CONNECTED-DOING"],canonicalResourceIds:["HIST:ARISTOTLE"],projectionTargets:["ENCYCLOPEDIA","CLASSROOM"],
    rule:"Historical masters are shared; Ethics adds domain-native apertures, workbooks, cases, and returns."
  },
  {
    routeId:"ROUTE-ETHICS-COURSE",title:"Intro Ethics Course",routeType:"COURSE",primaryDomainId:"ETHICS",
    includesDomainIds:["CORE","ETHICS","INSTITUTIONS-CONNECTED-DOING"],canonicalResourceIds:["CORE:CLAIM-CEILING","CORE:REOPEN"],projectionTargets:["CLASSROOM"],
    rule:"The course is a route through canonical resources and projections, not the owner of duplicated content."
  },
  {
    routeId:"ROUTE-HOI-PRESSBOOK",title:"What May We Carry Forward? — History of Inquiry Pressbook",routeType:"BOOK",primaryDomainId:"HISTORY-PHILOSOPHY",
    includesDomainIds:["CORE","HISTORY-PHILOSOPHY","SCIENCE-INQUIRY","INSTITUTIONS-CONNECTED-DOING"],canonicalResourceIds:["CORE:CLAIM-CEILING","CORE:REOPEN"],projectionTargets:["ENCYCLOPEDIA","CLASSROOM"],
    rule:"The Pressbook remains a disciplinary history of philosophy. FSP supplies optional governance, context recovery, and canonical-resource links without becoming a student prerequisite or secret historical teleology."
  },
  {
    routeId:"ROUTE-HISTORY-PHILOSOPHY",title:"History of Philosophy",routeType:"BOOK",primaryDomainId:"HISTORY-PHILOSOPHY",
    includesDomainIds:["CORE","HISTORY-PHILOSOPHY"],canonicalResourceIds:["HIST:ARISTOTLE"],projectionTargets:["ENCYCLOPEDIA","CLASSROOM"],
    rule:"Historical narrative masters remain reusable across domain apertures."
  },
  {
    routeId:"ROUTE-LOGIC-BOOK",title:"Logic & Argument",routeType:"BOOK",primaryDomainId:"LOGIC-ARGUMENT",
    includesDomainIds:["CORE","LOGIC-ARGUMENT"],canonicalResourceIds:["CORE:CLAIM-CEILING","CORE:REOPEN"],projectionTargets:["ENCYCLOPEDIA","CLASSROOM"],
    rule:"Logic-native support/attack structures remain domain-native while sharing provenance, standing, remainder, and REOPEN."
  },
  {
    routeId:"ROUTE-AESTHETICS-BOOK",title:"Aesthetics",routeType:"BOOK",primaryDomainId:"AESTHETICS",
    includesDomainIds:["CORE","AESTHETICS","HISTORY-PHILOSOPHY"],canonicalResourceIds:[],projectionTargets:["ENCYCLOPEDIA","CLASSROOM"],
    rule:"Aesthetics may introduce native objects and practices without being forced into scientific-inquiry topology."
  },
  {
    routeId:"ROUTE-PHILSCI-COURSE",title:"Philosophy of Science Course",routeType:"COURSE",primaryDomainId:"SCIENCE-INQUIRY",
    includesDomainIds:["CORE","SCIENCE-INQUIRY"],canonicalResourceIds:["CASE:NEPTUNE-VULCAN"],projectionTargets:["CLASSROOM"],
    rule:"Course sequence selects and transforms certified science resources without owning their canonical identity."
  },
  {
    routeId:"ROUTE-PFLAB",title:"Power & Flourishing Laboratory",routeType:"LAB",primaryDomainId:"ETHICS",
    includesDomainIds:["CORE","ETHICS","INSTITUTIONS-CONNECTED-DOING"],canonicalResourceIds:["CORE:REOPEN"],projectionTargets:["CLASSROOM","APPLICATION"],
    rule:"The lab combines domain-native ethical analysis with shared governance and return structures."
  },
  {
    routeId:"ROUTE-TRANSFORMATION-CORRIDOR",title:"Three-Transformation Corridor",routeType:"COLLECTION",primaryDomainId:"HISTORY-PHILOSOPHY",
    includesDomainIds:["CORE","HISTORY-PHILOSOPHY","SCIENCE-INQUIRY"],canonicalResourceIds:[],projectionTargets:["ENCYCLOPEDIA","CLASSROOM"],
    rule:"Cross-domain corridor may connect Reformation, Science, and Industry without collapsing their native topologies."
  },
  {
    routeId:"ROUTE-ARGUMENT-LAB",title:"Argument Laboratory",routeType:"LAB",primaryDomainId:"LOGIC-ARGUMENT",
    includesDomainIds:["CORE","LOGIC-ARGUMENT"],canonicalResourceIds:[],projectionTargets:["CLASSROOM","RESEARCH"],
    rule:"Executable argument structures remain a logic-domain projection of shared FSP governance."
  },
  {
    routeId:"ROUTE-CONNECTED-DOING",title:"Connected Doing Applications",routeType:"REFERENCE",primaryDomainId:"INSTITUTIONS-CONNECTED-DOING",
    includesDomainIds:["CORE","INSTITUTIONS-CONNECTED-DOING"],canonicalResourceIds:[],projectionTargets:["APPLICATION","VR","RESEARCH"],
    rule:"Institutional applications preserve person/institution distinctions and domain-native authority."
  },
  {
    routeId:"ROUTE-FORMAL-REFERENCE",title:"Formal & Executable Reference",routeType:"REFERENCE",primaryDomainId:"FORMAL-EXECUTABLE",
    includesDomainIds:["CORE","FORMAL-EXECUTABLE"],canonicalResourceIds:[],projectionTargets:["ENCYCLOPEDIA","RESEARCH"],
    rule:"Executable artifacts expose representation and invariants without claiming ontological completeness."
  }
];

export const RESOURCE_DEPTHS:ResourceDepthProfile[]=[
  {
    depth:"QUICK",publicRole:"Orientation, recovery, or first-pass student access.",
    mayCompress:["historical detail","formal notation","source saturation","secondary controversies"],
    mayNotChange:["canonical identity","claim ceiling","source status","domain-native meaning"]
  },
  {
    depth:"STANDARD",publicRole:"Full readable account suitable for ordinary Encyclopedia and course reading.",
    mayCompress:["specialist apparatus","extended formal proofs","full source commentary"],
    mayNotChange:["canonical identity","claim ceiling","historical sequence","domain-native topology"]
  },
  {
    depth:"DEEP",publicRole:"Source-rich, formally inspectable, controversy-aware reference layer.",
    mayCompress:[],
    mayNotChange:["canonical identity","claim ceiling","provenance distinctions","projection status"]
  }
];

export const ENCYCLOPEDIA_SCOPE_GOVERNANCE=[
  "The FSP Encyclopedia is broader than any one domain library, book, course, application, or projection.",
  "Shared FSP grammar does not imply shared domain ontology.",
  "Domain-native objects and relations remain primary when the universal core is too thin to represent a domain faithfully.",
  "One canonical resource has one canonical owner; routes and projections reference it rather than cloning competing canonical versions.",
  "Shared historical figures and texts should prefer one reusable historical master with domain apertures rather than independent histories.",
  "A course or book is a route through canonical resources, not the canonical owner of duplicated content.",
  "Resource depth may compress presentation but may not change canonical identity, provenance, claim ceiling, or domain-native meaning.",
  "Public status must be explicit and must drive discoverability in the public shell.",
  "Cross-domain edges must be typed; relatedness alone does not license identity, evidence, recommendation, or authorization.",
  "New domains may extend the ontology when required; elegance of the shared core may not block domain fidelity.",
  "Whole↔part return must remain possible from resource to domain, route, and Encyclopedia scale.",
  "A domain's production maturity must not be mistaken for its philosophical priority."
] as const;

export const ENCYCLOPEDIA_SCOPE:EncyclopediaScope={
  title:"FSP Encyclopedia",
  publicIdentity:"A shared resource for examining how human inquiry, judgment, interpretation, action, and institutions develop through time across multiple philosophical and practical domains.",
  universalCore:[...UNIVERSAL_FSP_CORE],
  domains:ENCYCLOPEDIA_DOMAINS,
  ownership:CANONICAL_OWNERSHIP,
  routes:ENCYCLOPEDIA_ROUTES,
  depths:RESOURCE_DEPTHS,
  governance:ENCYCLOPEDIA_SCOPE_GOVERNANCE
};

export function domainFor(id:EncyclopediaDomainId):EncyclopediaDomain{
  const d=ENCYCLOPEDIA_DOMAINS.find(x=>x.domainId===id);
  if(!d) throw new Error(`unknown Encyclopedia domain: ${id}`);
  return structuredClone(d);
}

export function routesForDomain(id:EncyclopediaDomainId):EncyclopediaRoute[]{
  return ENCYCLOPEDIA_ROUTES.filter(r=>r.includesDomainIds.includes(id)).map(r=>structuredClone(r));
}

export function validateEncyclopediaScope(scope:EncyclopediaScope=ENCYCLOPEDIA_SCOPE):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  if(new Set(scope.domains.map(d=>d.domainId)).size!==scope.domains.length) failures.push("duplicate-domain-id");
  if(new Set(scope.routes.map(r=>r.routeId)).size!==scope.routes.length) failures.push("duplicate-route-id");
  if(new Set(scope.ownership.map(o=>o.resourceId)).size!==scope.ownership.length) failures.push("duplicate-canonical-owner");
  if(scope.depths.map(d=>d.depth).join(",")!=="QUICK,STANDARD,DEEP") failures.push("depth-order");
  for(const d of scope.domains){
    if(!d.nativeTopology.length) failures.push(`${d.domainId}:missing-native-topology`);
    if(!d.sharedCoreIds.length) failures.push(`${d.domainId}:missing-core-binding`);
  }
  for(const r of scope.routes){
    if(!scope.domains.some(d=>d.domainId===r.primaryDomainId)) failures.push(`${r.routeId}:unknown-primary-domain`);
    for(const d of r.includesDomainIds) if(!scope.domains.some(x=>x.domainId===d)) failures.push(`${r.routeId}:unknown-domain:${d}`);
  }
  for(const o of scope.ownership){
    if(o.ownerKind==="DOMAIN"||o.ownerKind==="CASE"||o.ownerKind==="SHARED-HISTORICAL"){
      if(!scope.domains.some(d=>d.domainId===o.ownerId) && o.ownerKind!=="SHARED-HISTORICAL") failures.push(`${o.resourceId}:unknown-owner`);
    }
  }
  if(!scope.governance.some(x=>x.includes("Shared FSP grammar does not imply shared domain ontology"))) failures.push("missing-domain-ontology-firewall");
  if(!scope.governance.some(x=>x.includes("one canonical owner"))) failures.push("missing-canonical-ownership-rule");
  if(!scope.governance.some(x=>x.includes("production maturity"))) failures.push("missing-maturity-priority-firewall");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
