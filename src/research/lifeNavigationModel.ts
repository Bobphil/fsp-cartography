export type LifeNavStage="HERE"|"THERE"|"BRIDGE"|"TEST"|"RETURN";
export type Rating="LOW"|"MEDIUM"|"HIGH"|"UNKNOWN"|"";

export interface FutureScenario{
  title:string;
  description:string;
  opens:string;
  costs:string;
  preserves:string;
  ratings:Record<"feasibility"|"capability"|"burden"|"reversibility"|"meaning"|"uncertainty",Rating>;
}
export interface StackItem{dimension:string;change:string}
export interface CapabilityStep{step:string;why:string;opens:string;blocker:string}
export interface Milestone{transition:string;evidence:string;ceiling:string;reopen:string}
export interface Assumption{assumption:string;type:string;warrant:string;test:string;reopen:string}
export interface AffectedParty{party:string;effect:string;know:string;infer:string;consent:string}

export interface LifeNavigationRecord{
  version:1;
  chosenArea:string;
  goingWell:string;
  blocked:string;
  evidence:string;
  guess:string;
  broadSelfClaim:string;
  boundedSelfClaim:string;
  candidateFuture:string;
  futureCapability:string;
  futureRoutine:string;
  futurePeople:string;
  futureInstitution:string;
  futureCost:string;
  futureWorth:string;
  futures:[FutureScenario,FutureScenario,FutureScenario];
  comparisonInsight:string;
  stack:StackItem[];
  problemReframed:string;
  nextTransition:string;
  capabilityPath:CapabilityStep[];
  capabilityGain:string;
  capabilityLoss:string;
  optionOpen:string;
  optionClose:string;
  milestones:Milestone[];
  assumptions:Assumption[];
  affected:AffectedParty[];
  advice:{text:string;source:string;problem:string;assumptions:string;context:string;useful:string;tooStrong:string;failure:string};
  ritual:{practice:string;transition:string;frequency:string;evidence:string;explanation:string;stop:string};
  matters:{whatMatters:string;beautyAwe:string;availability:string;notWorth:string};
  weekly:{did:string;changed:string;notChanged:string;assumption:string;capability:string;burden:string;stillWant:string;reopen:string;next:string};
  output:{future:string;transition:string;evidence:string;remainder:string;action:string};
}

const emptyFuture=(title:string):FutureScenario=>({
  title,description:"",opens:"",costs:"",preserves:"",
  ratings:{feasibility:"",capability:"",burden:"",reversibility:"",meaning:"",uncertainty:""}
});
const blankStep=():CapabilityStep=>({step:"",why:"",opens:"",blocker:""});
const blankMilestone=():Milestone=>({transition:"",evidence:"",ceiling:"",reopen:""});
const blankAssumption=():Assumption=>({assumption:"",type:"",warrant:"",test:"",reopen:""});
const blankAffected=():AffectedParty=>({party:"",effect:"",know:"",infer:"",consent:""});

export function blankLifeNavigationRecord():LifeNavigationRecord{
  return {
    version:1,chosenArea:"",goingWell:"",blocked:"",evidence:"",guess:"",broadSelfClaim:"",boundedSelfClaim:"",
    candidateFuture:"",futureCapability:"",futureRoutine:"",futurePeople:"",futureInstitution:"",futureCost:"",futureWorth:"",
    futures:[emptyFuture("Continuation"),emptyFuture("Chosen transformation"),emptyFuture("Alternative flourishing path")],
    comparisonInsight:"",
    stack:[],
    problemReframed:"",
    nextTransition:"",
    capabilityPath:[blankStep(),blankStep(),blankStep(),blankStep()],
    capabilityGain:"",capabilityLoss:"",optionOpen:"",optionClose:"",
    milestones:[blankMilestone(),blankMilestone(),blankMilestone()],
    assumptions:[blankAssumption(),blankAssumption(),blankAssumption()],
    affected:[blankAffected(),blankAffected()],
    advice:{text:"",source:"",problem:"",assumptions:"",context:"",useful:"",tooStrong:"",failure:""},
    ritual:{practice:"",transition:"",frequency:"",evidence:"",explanation:"",stop:""},
    matters:{whatMatters:"",beautyAwe:"",availability:"",notWorth:""},
    weekly:{did:"",changed:"",notChanged:"",assumption:"",capability:"",burden:"",stillWant:"",reopen:"",next:""},
    output:{future:"",transition:"",evidence:"",remainder:"",action:""}
  };
}

export function demoLifeNavigationRecord():LifeNavigationRecord{
  const r=blankLifeNavigationRecord();
  r.chosenArea="Preparing for a statistics course";
  r.goingWell="I attend class and complete most assignments.";
  r.blocked="I avoid practice problems when I am unsure how to begin.";
  r.evidence="I do better when I practice with worked examples first.";
  r.guess="I may be treating confusion as evidence that I am bad at math.";
  r.broadSelfClaim="I am bad at math.";
  r.boundedSelfClaim="My current preparation and practice routine have not yet produced reliable confidence on unfamiliar problems.";
  r.candidateFuture="Three years from now I can use statistics confidently in a research or work setting.";
  r.futureCapability="I can choose an appropriate analysis, use software, and explain the limits of the result.";
  r.futureRoutine="Short practice sessions are routine rather than crisis-driven.";
  r.futurePeople="I use office hours, classmates, and a mentor when needed.";
  r.futureInstitution="I have completed the prerequisite and statistics courses.";
  r.futureCost="Regular practice time and giving up some last-minute study habits.";
  r.futureWorth="It would open research and career options I care about.";
  r.futures[0].description="I continue passing courses but avoid quantitative work when I can.";
  r.futures[0].costs="Fewer research options.";
  r.futures[1].description="I build statistics competence and use it in later coursework.";
  r.futures[1].opens="Research projects and more career choices.";
  r.futures[1].costs="Regular practice and asking for help earlier.";
  r.futures[2].description="I choose a path with less quantitative work but still pursue research through qualitative methods.";
  r.futures[2].preserves="Research and analysis while reducing the mathematics burden.";
  r.stack=[
    {dimension:"Habits",change:"Practice before I feel fully ready."},
    {dimension:"Skills",change:"Build algebra and problem-setup fluency."},
    {dimension:"Self-map / identity",change:"Replace 'bad at math' with a bounded skill diagnosis."}
  ];
  r.problemReframed="The main bottleneck may be practice structure and prerequisite fluency rather than a fixed lack of ability.";
  r.nextTransition="Complete one week of structured practice and accurately solve a representative set of prerequisite problems.";
  r.capabilityPath[0]={step:"Take a diagnostic set",why:"Locate specific gaps",opens:"A targeted practice plan",blocker:"Avoiding the test because of anxiety"};
  r.capabilityPath[1]={step:"Practice 20 minutes on four days",why:"Build retrieval and setup fluency",opens:"More reliable problem starts",blocker:"Waiting for a long free block"};
  r.capabilityPath[2]={step:"Use office hours on one unresolved problem",why:"Test my explanation and get feedback",opens:"Better self-correction",blocker:"Embarrassment about asking"};
  r.milestones[0]={transition:"Prerequisite fluency improved",evidence:"At least 8/10 representative problems solved without hints",ceiling:"Supports readiness for the next topic, not mastery of statistics",reopen:"If the same errors repeat for two weeks"};
  r.assumptions[0]={assumption:"Short frequent practice will work better for me than cramming",type:"empirical / self-interpretive",warrant:"Past assignments improved when I practiced earlier",test:"Try it for two weeks and compare accuracy and stress",reopen:"No improvement or unsustainable burden"};
  r.output={future:r.candidateFuture,transition:r.nextTransition,evidence:r.milestones[0].evidence,remainder:"I do not yet know whether the routine is sustainable during busy weeks.",action:"Schedule the first four 20-minute practice blocks."};
  return r;
}

export function validateLifeNavigationRecord(r:LifeNavigationRecord):string[]{
  const out:string[]=[];
  if(!r.chosenArea.trim()) out.push("Choose an area to examine.");
  if(!r.candidateFuture.trim()) out.push("Describe one future under examination.");
  if(!r.nextTransition.trim()) out.push("Name one next transition.");
  const ms=r.milestones.find(x=>x.transition.trim()||x.evidence.trim());
  if(!ms?.evidence.trim()) out.push("Add evidence for at least one milestone.");
  if(!r.output.remainder.trim()) out.push("Keep at least one unresolved remainder visible.");
  if(!r.output.action.trim()) out.push("Choose one reversible next action.");
  return out;
}

export function pilotReadiness(r:LifeNavigationRecord){
  const failures=validateLifeNavigationRecord(r);
  return {
    passes:failures.length===0,
    failures,
    safeguards:{
      selfAuthorship:true,
      privacyChoice:true,
      domainAuthorityBoundary:true,
      reversibleNextAction:!!r.output.action.trim(),
      remainderVisible:!!r.output.remainder.trim()
    }
  };
}

export function summarizeLifeNavigation(r:LifeNavigationRecord):string{
  return [
    "FSP LIFE NAVIGATION — CURRENT MAP",
    "",
    "HERE",
    r.chosenArea||"(not entered)",
    "",
    "THERE",
    r.output.future||r.candidateFuture||"(not entered)",
    "",
    "BRIDGE",
    r.output.transition||r.nextTransition||"(not entered)",
    "",
    "TEST",
    r.output.evidence||"(not entered)",
    "",
    "REMAINDER",
    r.output.remainder||"(not entered)",
    "",
    "NEXT REVERSIBLE ACTION",
    r.output.action||"(not entered)",
    "",
    "Firewall: The student is the author. The plan is a map. The future is revisable."
  ].join("\n");
}

export function cloneLifeNavigation<T>(x:T):T{return JSON.parse(JSON.stringify(x))}
