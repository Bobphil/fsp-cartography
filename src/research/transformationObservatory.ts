export type ObservatoryDomain = "EVOLUTION"|"REPRODUCTION"|"ECOLOGY"|"CONSCIOUSNESS";
export type BridgeBurdenLevel = "LOW"|"MODERATE"|"HIGH"|"UNRESOLVED";

export interface ObservatoryState {
  id:string;
  label:string;
  summary:string;
  possibilities:string[];
}

export interface ObservatoryTransition {
  id:string;
  from:string;
  to:string;
  label:string;
  relation:string;
  evidence:string[];
  assumptions:string[];
  bridgeBurden:BridgeBurdenLevel;
  remainder:string[];
  claimCeiling:string;
  reopen:string[];
}

export interface ObservatoryAgentAccess {
  actor:string;
  role:string;
  accessible:string[];
  mediated:string[];
  notAccessible:string[];
}

export interface ObservatoryConsequence {
  scale:string;
  effect:string;
  status:"GAIN"|"LOSS"|"MIXED"|"UNKNOWN";
}

export interface ObservatoryCase {
  id:string;
  domain:ObservatoryDomain;
  title:string;
  question:string;
  summary:string;
  states:ObservatoryState[];
  transitions:ObservatoryTransition[];
  agents:ObservatoryAgentAccess[];
  consequences:ObservatoryConsequence[];
  currentJudgment:string;
  globalClaimCeiling:string;
  reopenPrompt:string[];
}

export const TRANSFORMATION_OBSERVATORY_CASES:ObservatoryCase[] = [
  {
    id:"OBS-DAPHNIA-MATERNAL",
    domain:"REPRODUCTION",
    title:"Maternal environment → offspring phenotype",
    question:"What is transmitted across a generation, and how long does the effect persist?",
    summary:"Illustrative maternal-effect case. The point is to distinguish environmental exposure, parental state, transmitted condition, offspring phenotype, and evolutionary persistence rather than calling them all inheritance.",
    states:[
      {id:"D0",label:"Baseline maternal environment",summary:"Parent generation develops under baseline conditions.",possibilities:["baseline reproduction","baseline offspring provisioning"]},
      {id:"D1",label:"Maternal environmental perturbation",summary:"The parental environment changes before reproduction.",possibilities:["physiological adjustment","changed provisioning","no durable change"]},
      {id:"D2",label:"Offspring phenotype differs",summary:"Offspring show a measurable difference under the study conditions.",possibilities:["temporary maternal effect","developmental carryover","adaptive response","maladaptive response"]},
      {id:"D3",label:"Persistence test",summary:"Offspring and later generations are tested under controlled conditions.",possibilities:["effect decays","effect persists one generation","multi-generation persistence","genetic explanation required"]}
    ],
    transitions:[
      {id:"D0-D1",from:"D0",to:"D1",label:"Environmental exposure alters maternal state",relation:"PERTURBS / MODULATES",evidence:["environmental manipulation","maternal physiological measures"],assumptions:["exposure is the relevant difference"],bridgeBurden:"LOW",remainder:["which maternal pathways matter"],claimCeiling:"The maternal environment changed under the study conditions; mechanism is not yet established.",reopen:["replicate exposure","measure alternative maternal pathways"]},
      {id:"D1-D2",from:"D1",to:"D2",label:"Maternal state is associated with offspring difference",relation:"TRANSMITS / ENABLES",evidence:["offspring phenotype","cross-generation comparison"],assumptions:["offspring groups differ because of parental pathway rather than uncontrolled confound"],bridgeBurden:"MODERATE",remainder:["carrier of the effect","adaptive status"],claimCeiling:"A maternal effect is supported; genetic inheritance or adaptive value does not yet follow.",reopen:["cross-foster or common-garden test","measure provisioning / epigenetic / microbiome routes"]},
      {id:"D2-D3",from:"D2",to:"D3",label:"Persistence is tested",relation:"SEDIMENTS / DECAYS",evidence:["later-generation measures","common-environment comparison"],assumptions:["later tests isolate persistence from renewed exposure"],bridgeBurden:"HIGH",remainder:["duration","mechanism","fitness consequence"],claimCeiling:"Persistence can be claimed only for the generations and conditions actually tested.",reopen:["extend generations","change environmental context"]}
    ],
    agents:[
      {actor:"Parent organism",role:"biological bearer",accessible:["local environmental conditions","internal physiological state"],mediated:[],notAccessible:["population-level evolutionary consequence"]},
      {actor:"Offspring",role:"developing organism",accessible:["developmental environment"],mediated:["parental provisioning / transmitted conditions"],notAccessible:["researcher's causal model"]},
      {actor:"Researcher",role:"inquiry agent",accessible:["measurements","cross-generation outcomes"],mediated:["internal biological processes through instruments"],notAccessible:["unmeasured organismal experience"]}
    ],
    consequences:[
      {scale:"parent",effect:"physiological or reproductive state may change",status:"MIXED"},
      {scale:"offspring",effect:"phenotype may differ",status:"MIXED"},
      {scale:"population",effect:"fitness consequences remain to be established",status:"UNKNOWN"},
      {scale:"evolution",effect:"stable evolutionary adaptation is not established by a maternal effect alone",status:"UNKNOWN"}
    ],
    currentJudgment:"The case supports tracing cross-generation change without conflating maternal effect, inheritance, adaptation, and evolution.",
    globalClaimCeiling:"Transmission across one generation ≠ stable evolutionary inheritance.",
    reopenPrompt:["Does the effect persist in a common environment?","What is the carrier?","Does it change fitness?"]
  },
  {
    id:"OBS-CLIMATE-PLASTICITY",
    domain:"ECOLOGY",
    title:"Warming → plastic response → population consequence",
    question:"When does an organismal response to climate become a durable population transformation?",
    summary:"Illustrative climate/plasticity case. It separates environmental change, organismal plasticity, reproduction, population persistence, and evolutionary change.",
    states:[
      {id:"C0",label:"Historical climate envelope",summary:"Population operates within an earlier environmental range.",possibilities:["existing phenology","existing reproductive timing","existing habitat use"]},
      {id:"C1",label:"Warming / altered seasonality",summary:"Temperature and seasonal cues shift.",possibilities:["plastic adjustment","range shift","reproductive mismatch","mortality increase"]},
      {id:"C2",label:"Organismal response",summary:"Timing, behavior, physiology, or habitat use changes.",possibilities:["successful compensation","partial compensation","tradeoff","failure"]},
      {id:"C3",label:"Population consequence",summary:"Survival and reproduction aggregate over time.",possibilities:["persistence","decline","migration","selection on variation"]},
      {id:"C4",label:"Long-run reopening",summary:"Multi-generation evidence tests whether change is plastic, inherited, or evolutionary.",possibilities:["plasticity persists","genetic change","eco-evolutionary feedback","reversal"]}
    ],
    transitions:[
      {id:"C0-C1",from:"C0",to:"C1",label:"Environmental regime changes",relation:"PERTURBS",evidence:["temperature / season records"],assumptions:["measurement represents biologically relevant exposure"],bridgeBurden:"LOW",remainder:["microclimate variation"],claimCeiling:"Environmental conditions changed at the measured scales.",reopen:["add microclimate data"]},
      {id:"C1-C2",from:"C1",to:"C2",label:"Organisms adjust",relation:"MODULATES / ENABLES",evidence:["phenology","behavior","physiology"],assumptions:["response is causally linked to altered conditions"],bridgeBurden:"MODERATE",remainder:["genetic versus plastic contribution","tradeoffs"],claimCeiling:"A response is supported; adaptation is not yet established.",reopen:["common-garden test","fitness comparison"]},
      {id:"C2-C3",from:"C2",to:"C3",label:"Responses aggregate into population outcomes",relation:"AGGREGATES / CONSTRAINS",evidence:["survival","reproduction","abundance"],assumptions:["sample scales to population"],bridgeBurden:"HIGH",remainder:["density dependence","migration","species interactions"],claimCeiling:"Population consequence is bounded to the observed population and period.",reopen:["extend spatial and temporal coverage"]},
      {id:"C3-C4",from:"C3",to:"C4",label:"Persistence and evolutionary interpretation are tested",relation:"SEDIMENTS / SELECTS",evidence:["multi-generation change","heritability / genomic evidence if available"],assumptions:["persistent difference is not renewed plasticity alone"],bridgeBurden:"HIGH",remainder:["eco-evolutionary feedback"],claimCeiling:"Evolutionary change requires evidence beyond repeated phenotype change.",reopen:["heritability test","multi-generation replication"]}
    ],
    agents:[
      {actor:"Organism",role:"ecological agent",accessible:["local temperature","resources","competitors"],mediated:[],notAccessible:["regional climate model"]},
      {actor:"Population",role:"aggregate biological system",accessible:[],mediated:["individual survival and reproduction"],notAccessible:["research model as such"]},
      {actor:"Ecologist",role:"inquiry agent",accessible:["field measurements","population records"],mediated:["remote sensing","models"],notAccessible:["every local interaction"]}
    ],
    consequences:[
      {scale:"organism",effect:"new behavior or physiology may open and close options",status:"MIXED"},
      {scale:"population",effect:"persistence or decline may change",status:"MIXED"},
      {scale:"community",effect:"species interactions may shift",status:"UNKNOWN"},
      {scale:"evolution",effect:"selection may alter future possibility structure",status:"UNKNOWN"}
    ],
    currentJudgment:"Plastic response, population persistence, and evolutionary adaptation are separate claims connected by inspectable bridges.",
    globalClaimCeiling:"Observed response ≠ proven adaptation; persistence ≠ proven genetic evolution.",
    reopenPrompt:["Is the response heritable?","What tradeoffs appear?","Do species interactions change the result?"]
  },
  {
    id:"OBS-MATE-CHOICE",
    domain:"EVOLUTION",
    title:"Signal → preference → reproductive isolation",
    question:"How can differences in access and preference become population-level divergence?",
    summary:"Illustrative mate-choice case. It follows signal availability through discrimination, salience, preference, mating consequence, and possible population divergence.",
    states:[
      {id:"M0",label:"Signal ecology",summary:"Potential mates produce traits or signals in an environment.",possibilities:["signal detectable","signal masked","multiple cues available"]},
      {id:"M1",label:"Discrimination",summary:"A chooser can distinguish task-relevant alternatives.",possibilities:["no preference","contextual preference","stable preference"]},
      {id:"M2",label:"Mate choice",summary:"Preference contributes to actual mating behavior.",possibilities:["assortative mating","mixed mating","socially influenced choice"]},
      {id:"M3",label:"Reproductive consequence",summary:"Mating pattern changes reproductive pairing and offspring distribution.",possibilities:["temporary pattern","reinforcement","gene-flow reduction"]},
      {id:"M4",label:"Population divergence test",summary:"Longer-run evidence tests reproductive isolation and evolutionary change.",possibilities:["no isolation","partial isolation","stable isolation","speciation process"]}
    ],
    transitions:[
      {id:"M0-M1",from:"M0",to:"M1",label:"Signal becomes discriminable",relation:"ACCESS / DISCRIMINATES",evidence:["sensory tests","choice assays"],assumptions:["experimental cue matches ecologically used cue"],bridgeBurden:"MODERATE",remainder:["multimodal cues","learning history"],claimCeiling:"Discrimination is supported for the tested cue and context.",reopen:["vary cue ecology","test learning history"]},
      {id:"M1-M2",from:"M1",to:"M2",label:"Discrimination contributes to preference",relation:"SALIENCE / SELECTS",evidence:["repeated choice behavior"],assumptions:["choice reflects mating preference rather than unrelated movement bias"],bridgeBurden:"MODERATE",remainder:["social information","condition dependence"],claimCeiling:"Preference is supported under the tested conditions; fixed preference does not follow.",reopen:["test alternative contexts","remove social cues"]},
      {id:"M2-M3",from:"M2",to:"M3",label:"Preference changes mating pattern",relation:"IMPLEMENTS / AGGREGATES",evidence:["mating pairs","offspring parentage"],assumptions:["observed choices scale to reproductive outcome"],bridgeBurden:"HIGH",remainder:["mate availability","competition"],claimCeiling:"A reproductive consequence is supported; reproductive isolation does not yet follow.",reopen:["measure gene flow","test natural population"]},
      {id:"M3-M4",from:"M3",to:"M4",label:"Mating pattern becomes persistent divergence",relation:"SEDIMENTS / CONSTRAINS",evidence:["gene flow","longitudinal population divergence"],assumptions:["other barriers do not fully explain divergence"],bridgeBurden:"HIGH",remainder:["ecology","hybrid fitness","historical contingency"],claimCeiling:"Speciation requires sustained evidence of divergence and reduced gene flow.",reopen:["hybrid fitness test","longitudinal gene-flow study"]}
    ],
    agents:[
      {actor:"Signaler",role:"potential mate",accessible:["local social / ecological context"],mediated:[],notAccessible:["population genetic consequence"]},
      {actor:"Chooser",role:"reproductive agent",accessible:["detectable cues","social information"],mediated:["environmental filtering of signals"],notAccessible:["future population divergence"]},
      {actor:"Evolutionary biologist",role:"inquiry agent",accessible:["behavioral assays","parentage","population data"],mediated:["genetic models"],notAccessible:["complete historical counterfactual"]}
    ],
    consequences:[
      {scale:"individual",effect:"mate opportunities change",status:"MIXED"},
      {scale:"pairing",effect:"assortative mating may increase",status:"MIXED"},
      {scale:"population",effect:"gene flow may be reduced",status:"UNKNOWN"},
      {scale:"evolution",effect:"persistent reproductive isolation may emerge",status:"UNKNOWN"}
    ],
    currentJudgment:"The case shows how access and salience can matter evolutionarily without making preference itself equivalent to speciation.",
    globalClaimCeiling:"Mate preference ≠ reproductive isolation ≠ speciation.",
    reopenPrompt:["Does preference persist in natural settings?","Does gene flow actually fall?","What ecological variables co-produce divergence?"]
  },
  {
    id:"OBS-PSYCHEDELIC",
    domain:"CONSCIOUSNESS",
    title:"Psychedelic state → integration → delayed transformation",
    question:"What converts an acute altered state into a durable change in a person's PRF?",
    summary:"Illustrative transcendence case. It separates biological perturbation, altered access/salience, self/world-boundary change, meaning, integration, delayed transfer, and metaphysical interpretation.",
    states:[
      {id:"P0",label:"Baseline PRF",summary:"Existing salience, beliefs, self/world partitions, values, and action repertoire.",possibilities:["ordinary coping","ordinary interpretation","existing constraints"]},
      {id:"P1",label:"Acute perturbation",summary:"Pharmacological and contextual conditions alter ongoing cognitive/phenomenal organization.",possibilities:["altered salience","distress","novel associations","boundary change"]},
      {id:"P2",label:"Acute experience",summary:"Phenomenology and noetic/meaning attribution occur.",possibilities:["personal insight","metaphysical interpretation","emotional processing","confusion"]},
      {id:"P3",label:"Integration",summary:"The experience is interpreted, socially framed, challenged, or reinforced.",possibilities:["revision","sedimentation","rejection","belief installation risk"]},
      {id:"P4",label:"Delayed retest",summary:"Later behavior and PRF organization are tested outside the acute state.",possibilities:["durable trait change","near transfer only","decay","maladaptive persistence"]}
    ],
    transitions:[
      {id:"P0-P1",from:"P0",to:"P1",label:"Perturbation alters predictive / access organization",relation:"PERTURBS / REWEIGHTS",evidence:["pharmacology","acute behavioral / neural measures"],assumptions:["selected model quantities track relevant cognitive change"],bridgeBurden:"MODERATE",remainder:["complete mechanism","individual variability"],claimCeiling:"Acute cognitive/neural perturbation may be supported; mystical or therapeutic outcome does not yet follow.",reopen:["compare alternative mechanisms","vary context"]},
      {id:"P1-P2",from:"P1",to:"P2",label:"Altered organization becomes phenomenal experience",relation:"ENABLES / CORRELATES",evidence:["first-person report","psychometrics","behavioral measures"],assumptions:["reported phenomenology is measured adequately"],bridgeBurden:"HIGH",remainder:["phenomenal bridge","self/world decomposition"],claimCeiling:"The experience is real as reported experience; metaphysical truth does not follow.",reopen:["improve phenomenological measures","compare non-psychedelic states"]},
      {id:"P2-P3",from:"P2",to:"P3",label:"Experience is interpreted and integrated",relation:"INTERPRETS / REINFORCES",evidence:["integration records","belief / meaning measures"],assumptions:["later change is not entirely spontaneous recovery or external influence"],bridgeBurden:"HIGH",remainder:["suggestibility","guide influence","causal role of integration"],claimCeiling:"Meaning and belief change may be documented; truth and authorship require separate evaluation.",reopen:["measure guide influence","compare integration conditions"]},
      {id:"P3-P4",from:"P3",to:"P4",label:"State change is tested for trait persistence",relation:"SEDIMENTS / DECAYS",evidence:["delayed self-report","behavior","observer report","novel-context tasks"],assumptions:["later measures reflect durable change rather than demand or repeated reinforcement"],bridgeBurden:"HIGH",remainder:["duration","far transfer","truth-tracking"],claimCeiling:"Durable transformation requires delayed evidence across contexts; acute intensity is insufficient.",reopen:["longer follow-up","novel-context test","contradictory evidence challenge"]}
    ],
    agents:[
      {actor:"Participant",role:"phenomenal / authorial agent",accessible:["first-person experience","felt meaning"],mediated:["biological mechanisms through scientific explanation"],notAccessible:["future persistence during the acute state"]},
      {actor:"Guide / therapist",role:"contextual influence",accessible:["participant report","observable behavior"],mediated:["participant experience through testimony"],notAccessible:["participant phenomenality directly"]},
      {actor:"Researcher",role:"inquiry agent",accessible:["measures","reports","longitudinal outcomes"],mediated:["neural / computational models"],notAccessible:["metaphysical truth from intensity alone"]}
    ],
    consequences:[
      {scale:"neural/cognitive",effect:"predictive weighting and salience may change",status:"MIXED"},
      {scale:"phenomenal",effect:"self/world boundaries and meaning may change",status:"MIXED"},
      {scale:"personal",effect:"values, beliefs, and behavior may persist or decay",status:"MIXED"},
      {scale:"social/ethical",effect:"benefit, vulnerability, and influence require governance",status:"MIXED"}
    ],
    currentJudgment:"The case can separate acute experience, interpretation, integration, durable transformation, and metaphysical claim rather than treating them as one event.",
    globalClaimCeiling:"Profound experience ≠ metaphysical proof; acute state ≠ durable trait; benefit ≠ authorization.",
    reopenPrompt:["What persists in novel contexts?","How much change is guide/context dependent?","Which claims survive contradictory evidence?"]
  }
];

export function observatoryCase(caseId:string):ObservatoryCase{
  const found=TRANSFORMATION_OBSERVATORY_CASES.find(c=>c.id===caseId);
  if(!found) throw new Error("unknown observatory case "+caseId);
  return JSON.parse(JSON.stringify(found));
}

export function transitionFor(caseId:string,transitionId:string):ObservatoryTransition{
  const c=observatoryCase(caseId);
  const found=c.transitions.find(t=>t.id===transitionId);
  if(!found) throw new Error("unknown observatory transition "+transitionId);
  return found;
}

export function possibilityDelta(caseId:string,transitionId:string):{opened:string[];closed:string[];retained:string[]}{
  const c=observatoryCase(caseId);
  const t=c.transitions.find(x=>x.id===transitionId);
  if(!t) throw new Error("unknown observatory transition "+transitionId);
  const a=c.states.find(s=>s.id===t.from)!;
  const b=c.states.find(s=>s.id===t.to)!;
  const opened=b.possibilities.filter(x=>!a.possibilities.includes(x));
  const closed=a.possibilities.filter(x=>!b.possibilities.includes(x));
  const retained=b.possibilities.filter(x=>a.possibilities.includes(x));
  return{opened,closed,retained};
}

export function validateTransformationObservatory():string[]{
  const errors:string[]=[];
  for(const c of TRANSFORMATION_OBSERVATORY_CASES){
    const stateIds=new Set(c.states.map(s=>s.id));
    if(c.states.length<4) errors.push(c.id+" needs at least four states");
    if(c.transitions.length!==c.states.length-1) errors.push(c.id+" transition chain mismatch");
    for(const t of c.transitions){
      if(!stateIds.has(t.from)||!stateIds.has(t.to)) errors.push(c.id+" transition has unknown state "+t.id);
      if(!t.claimCeiling.trim()) errors.push(c.id+" transition missing claim ceiling "+t.id);
      if(!t.remainder.length) errors.push(c.id+" transition missing remainder "+t.id);
      if(!t.reopen.length) errors.push(c.id+" transition missing REOPEN "+t.id);
    }
    if(!c.globalClaimCeiling.trim()) errors.push(c.id+" missing global claim ceiling");
    if(!c.reopenPrompt.length) errors.push(c.id+" missing case REOPEN");
  }
  return errors;
}
