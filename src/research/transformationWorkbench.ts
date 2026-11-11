export interface WorkbenchState {
  id:string;
  label:string;
  summary:string;
  possibilities:string[];
}
export interface WorkbenchTransition {
  id:string;
  from:string;
  to:string;
  label:string;
  relation:string;
  evidence:string[];
  assumptions:string[];
  alternatives:string[];
  remainder:string[];
  claimCeiling:string;
  reopen:string[];
}
export interface WorkbenchInquiry {
  version:1;
  title:string;
  question:string;
  states:WorkbenchState[];
  transitions:WorkbenchTransition[];
  currentJudgment:string;
  globalClaimCeiling:string;
  reopenPrompt:string[];
}

const clean=(s:string)=>s.trim();
const list=(s:string)=>s.split(/\n|;/).map(clean).filter(Boolean);

export function blankWorkbenchInquiry(question=""):WorkbenchInquiry{
  return {
    version:1,
    title:"My transformation inquiry",
    question:clean(question),
    states:[],
    transitions:[],
    currentJudgment:"",
    globalClaimCeiling:"",
    reopenPrompt:[]
  };
}

export function parseList(value:string):string[]{return list(value)}

export function stateId(index:number):string{return "S"+index}
export function transitionId(index:number):string{return "T"+index}

export function addWorkbenchState(inquiry:WorkbenchInquiry,label:string,summary:string,possibilities:string[]=[]):WorkbenchInquiry{
  const next=clone(inquiry);
  const id=stateId(next.states.length);
  next.states.push({id,label:clean(label)||id,summary:clean(summary),possibilities:[...possibilities]});
  return next;
}

export function addWorkbenchTransition(
  inquiry:WorkbenchInquiry,
  input:Omit<WorkbenchTransition,"id">
):WorkbenchInquiry{
  const next=clone(inquiry);
  const id=transitionId(next.transitions.length);
  next.transitions.push({...clone(input),id});
  return next;
}

export function updateWorkbenchInquiry(
  inquiry:WorkbenchInquiry,
  patch:Partial<Pick<WorkbenchInquiry,"title"|"question"|"currentJudgment"|"globalClaimCeiling"|"reopenPrompt">>
):WorkbenchInquiry{
  return {...clone(inquiry),...clone(patch)};
}

export function removeLastWorkbenchState(inquiry:WorkbenchInquiry):WorkbenchInquiry{
  const next=clone(inquiry);
  const removed=next.states.pop();
  if(removed) next.transitions=next.transitions.filter(t=>t.from!==removed.id&&t.to!==removed.id);
  return next;
}

export function removeLastWorkbenchTransition(inquiry:WorkbenchInquiry):WorkbenchInquiry{
  const next=clone(inquiry);next.transitions.pop();return next;
}

export function workbenchTransitionReadout(inquiry:WorkbenchInquiry,transitionIdValue:string){
  const t=inquiry.transitions.find(x=>x.id===transitionIdValue);
  if(!t) throw new Error("unknown workbench transition "+transitionIdValue);
  const from=inquiry.states.find(s=>s.id===t.from);
  const to=inquiry.states.find(s=>s.id===t.to);
  if(!from||!to) throw new Error("transition references unknown state");
  return {
    question:inquiry.question,
    from:clone(from),
    to:clone(to),
    transition:clone(t),
    possibilityDelta:{
      opened:to.possibilities.filter(x=>!from.possibilities.includes(x)),
      closed:from.possibilities.filter(x=>!to.possibilities.includes(x)),
      retained:to.possibilities.filter(x=>from.possibilities.includes(x))
    }
  };
}

export function validateWorkbenchInquiry(inquiry:WorkbenchInquiry):string[]{
  const out:string[]=[];
  if(!clean(inquiry.question)) out.push("Inquiry question is missing.");
  if(inquiry.states.length<2) out.push("Add at least two states.");
  const ids=new Set(inquiry.states.map(s=>s.id));
  for(const t of inquiry.transitions){
    if(!ids.has(t.from)||!ids.has(t.to)) out.push(t.id+" references an unknown state.");
    if(!clean(t.label)) out.push(t.id+" needs a transition label.");
    if(!clean(t.claimCeiling)) out.push(t.id+" needs a claim ceiling.");
    if(!t.reopen.length) out.push(t.id+" needs at least one REOPEN condition.");
  }
  return out;
}

export function exportWorkbenchInquiry(inquiry:WorkbenchInquiry):string{
  return JSON.stringify(inquiry,null,2);
}

function clone<T>(x:T):T{return JSON.parse(JSON.stringify(x))}
