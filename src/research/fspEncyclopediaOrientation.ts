export interface FspOrientationSection{
  id:string;
  title:string;
  purpose:string;
  paragraphs:string[];
  keyDistinctions?:string[];
}

export interface FspPublicOrientation{
  buildId:string;
  title:string;
  subtitle:string;
  oneSentence:string;
  originProblem:string[];
  fullStackMeaning:string[];
  constitutionalCommitments:{
    title:string;
    publicMeaning:string;
  }[];
  governingDistinctions:string[];
  inquiryArc:string[];
  notClaims:string[];
  noPrerequisiteBoundary:string[];
  sections:FspOrientationSection[];
}

export const FSP_PUBLIC_ORIENTATION:FspPublicOrientation={
  buildId:"FSP-ENCYCLOPEDIA-ORIENTATION-1",
  title:"What is Full-Stack Philosophy?",
  subtitle:"A governed architecture for inquiry, judgment, cooperation, and return to lived Doing.",
  oneSentence:"Full-Stack Philosophy is a way of making the interacting layers of human inquiry inspectable without pretending that every domain has the same ontology, evidence, authority, or method.",
  originProblem:[
    "Human inquiry rarely happens only at the level of arguments or theories. People inherit concepts, institutions, practices, identities, technologies, evidence, relationships, and histories, then have to act under uncertainty inside those inheritances.",
    "Philosophical work often becomes fragmented across those levels. We may have a good argument but lose the person acting, a useful model but confuse it with the world, a possibility generator but mistake possibility for recommendation, or a historical explanation that is silently treated as present justification.",
    "FSP was developed to keep those layers connected and govern the transitions between them without collapsing them into one master theory."
  ],
  fullStackMeaning:[
    "The phrase full-stack is borrowed as a metaphor for following inquiry across interacting levels rather than studying only one slice.",
    "Depending on the problem, the stack may include lived experience, concepts, claims, evidence, provenance, models, institutions, power, possibilities, relations, judgment, and return to action.",
    "The stack is not a universal ontology. Ethics, science, history, logic, aesthetics, institutions, and other domains keep their own native objects, practices, and standards."
  ],
  constitutionalCommitments:[
    {
      title:"Authorial Capability",
      publicMeaning:"Inquiry should increase a person's capacity to inspect, revise, and own a bounded judgment rather than merely receive an answer."
    },
    {
      title:"Cognitive Prosthesis",
      publicMeaning:"Tools, models, diagrams, simulations, AI, and shared representations may extend human inquiry, but they remain aids to judgment rather than replacements for persons or authority."
    },
    {
      title:"Translational Governance",
      publicMeaning:"When inquiry moves between people, models, disciplines, institutions, or representations, the transition itself must be governed so that meaning, provenance, standing, and claim ceilings are not silently changed."
    },
    {
      title:"Return to Lived Doing",
      publicMeaning:"Inquiry should eventually return to the lived problem, person, practice, or institution that gave the inquiry its stakes, while preserving uncertainty and conditions for reopening."
    }
  ],
  governingDistinctions:[
    "Map ≠ World ≠ Person",
    "Generate ≠ Recommend ≠ Authorize",
    "Possibility ≠ prediction",
    "Historical explanation ≠ present justification",
    "Model success ≠ ontology",
    "Shared representation ≠ historical sameness",
    "Evidence ≠ full theory choice",
    "Authority ≠ truth",
    "Current judgment ≠ final closure"
  ],
  inquiryArc:[
    "Lived Doing",
    "Inquiry",
    "Representation",
    "Revision",
    "Bounded Judgment",
    "Authorial Return",
    "REOPEN"
  ],
  notClaims:[
    "FSP is not another ethical theory.",
    "FSP is not a universal philosophy-of-science theory.",
    "FSP is not a single decision procedure for every domain.",
    "FSP is not a claim that all disciplines share one ontology.",
    "FSP is not a vocabulary students must master before doing philosophy.",
    "FSP is not a replacement for domain expertise, historical scholarship, empirical evidence, or institutional authority."
  ],
  noPrerequisiteBoundary:[
    "A reader may enter Ethics, History of Philosophy, Inquiry & Science, Logic, Aesthetics, or another domain without first learning FSP.",
    "Courses may use FSP distinctions quietly where they clarify disciplinary development without making FSP itself the course subject.",
    "The Encyclopedia may expose deeper FSP architecture for readers who want it, but domain-native inquiry remains primary."
  ],
  sections:[
    {
      id:"WHY",
      title:"Why does FSP exist?",
      purpose:"Recover the problem that motivated the architecture.",
      paragraphs:[
        "Many philosophical and practical problems become difficult not because we lack a single argument, but because several layers move at once: evidence changes, concepts shift, institutions constrain action, people disagree about standing, possibilities multiply, and a decision still has to be made.",
        "FSP asks how those layers can be inspected together without treating any one of them as the whole problem."
      ]
    },
    {
      id:"FULL-STACK",
      title:"Why call it full-stack?",
      purpose:"Explain the metaphor without turning it into ontology.",
      paragraphs:[
        "Full-stack means following an inquiry from lived experience through representation, evidence, concepts, institutions, possibilities, judgment, and return.",
        "Different domains instantiate that stack differently. What counts as evidence, authority, object, relation, or successful closure in physics may differ sharply from ethics, history, logic, or aesthetics."
      ]
    },
    {
      id:"GOVERNANCE",
      title:"What does FSP govern?",
      purpose:"Make transition governance visible.",
      paragraphs:[
        "FSP pays special attention to transitions: from evidence to claim, model to world, possibility to recommendation, historical reconstruction to present judgment, one person's map to another person, and inquiry to action.",
        "The aim is not to prohibit those moves but to make their licenses, limits, provenance, and remaining uncertainty explicit."
      ],
      keyDistinctions:[
        "Map ≠ World ≠ Person",
        "Generate ≠ Recommend ≠ Authorize",
        "Possibility ≠ prediction",
        "Historical explanation ≠ present justification"
      ]
    },
    {
      id:"CAPABILITY",
      title:"What should inquiry leave the person able to do?",
      purpose:"State the authorial-capability aim.",
      paragraphs:[
        "A successful inquiry should leave the person better able to inspect the problem, understand what supports a claim, distinguish authority from evidence, see what remains unresolved, and own a bounded judgment.",
        "This is why Authorial Return matters: the endpoint is not merely a representation of the problem but a governed return to the person's or community's actual Doing."
      ]
    },
    {
      id:"REOPEN",
      title:"Why REOPEN?",
      purpose:"Explain responsible closure and fallibility.",
      paragraphs:[
        "Many inquiries require action before uncertainty disappears. FSP therefore distinguishes bounded judgment from final closure.",
        "REOPEN records what kinds of new evidence, changed circumstances, failed assumptions, new standing, or unexpected consequences should cause the judgment to be reconsidered."
      ]
    },
    {
      id:"NO-PREREQUISITE",
      title:"Do I need to learn FSP before using this Encyclopedia?",
      purpose:"Protect domain-first entry.",
      paragraphs:[
        "No. You can enter through a domain, historical chapter, case, book, laboratory, concept, or tool.",
        "FSP is the connective and governance architecture underneath the Encyclopedia. It becomes explicit when that helps the inquiry; it is not a prerequisite imposed on every reader or course."
      ]
    }
  ]
};

export function validateFspPublicOrientation(o:FspPublicOrientation=FSP_PUBLIC_ORIENTATION):{passes:boolean;failures:string[]}{
  const failures:string[]=[];
  for(const phrase of ["Authorial Capability","Cognitive Prosthesis","Translational Governance","Return to Lived Doing"]){
    if(!o.constitutionalCommitments.some(x=>x.title===phrase)) failures.push("missing-commitment:"+phrase);
  }
  for(const distinction of ["Map ≠ World ≠ Person","Generate ≠ Recommend ≠ Authorize","Possibility ≠ prediction","Historical explanation ≠ present justification"]){
    if(!o.governingDistinctions.includes(distinction)) failures.push("missing-distinction:"+distinction);
  }
  if(o.inquiryArc.join(" -> ")!=="Lived Doing -> Inquiry -> Representation -> Revision -> Bounded Judgment -> Authorial Return -> REOPEN") failures.push("inquiry-arc-drift");
  if(!o.noPrerequisiteBoundary.some(x=>x.includes("without first learning FSP"))) failures.push("missing-no-prerequisite-boundary");
  if(!o.notClaims.some(x=>x.includes("not another ethical theory"))) failures.push("missing-not-ethical-theory");
  if(!o.notClaims.some(x=>x.includes("not a universal philosophy-of-science theory"))) failures.push("missing-not-philsci-theory");
  if(!o.fullStackMeaning.some(x=>x.includes("not a universal ontology"))) failures.push("missing-domain-ontology-firewall");
  if(new Set(o.sections.map(x=>x.id)).size!==o.sections.length) failures.push("duplicate-section-id");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
