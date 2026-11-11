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
  architecturalInheritance:string[];
  humanInformationArc:string[];
  publicInquiryArc:string[];
  antiReductionFirewall:string[];
  phenomenalDoing:string[];
  existentialInquiry:string[];
  humanCenteredInquiryRelation:string[];
  explanationMeaningFirewall:string[];
  complexityComparatorBoundary:string[];
  constitutionalCommitments:{
    title:string;
    publicMeaning:string;
  }[];
  governingDistinctions:string[];
  inquiryArc:string[];
  notClaims:string[];
  noPrerequisiteBoundary:string[];
  presentStatus:string[];
  completionHorizon:string[];
  successorPrinciple:string;
  sections:FspOrientationSection[];
}

export const FSP_PUBLIC_ORIENTATION:FspPublicOrientation={
  buildId:"FSP-ENCYCLOPEDIA-ORIENTATION-1.2",
  title:"What is Full-Stack Philosophy?",
  subtitle:"A governed architecture for inquiry, judgment, cooperation, and return to lived Doing.",
  oneSentence:"Full-Stack Philosophy applies the architectural insight of full-stack computing to human inquiry: it follows an inquiry from its earliest emergence in lived noticing through interpretation, representation, evidence, possibility, judgment, authorization, action, consequence, and return to ongoing lived Doing—without reducing persons to computers or pretending that every domain has the same ontology, evidence, authority, or method.",
  originProblem:[
    "Human inquiry rarely happens only at the level of arguments or theories. People inherit concepts, institutions, practices, identities, technologies, evidence, relationships, and histories, then have to act under uncertainty inside those inheritances.",
    "Philosophical work often becomes fragmented across those levels. We may have a good argument but lose the person acting, a useful model but confuse it with the world, a possibility generator but mistake possibility for recommendation, or a historical explanation that is silently treated as present justification.",
    "FSP was developed to keep those layers connected and govern the transitions between them without collapsing them into one master theory."
  ],
  fullStackMeaning:[
    "The phrase full-stack is more than a loose analogy. FSP takes from computer science an architectural discipline: do not inspect only one layer of a system; follow information and transformation across layers, interfaces, dependencies, and downstream effects.",
    "FSP applies that discipline to human inquiry. It asks how something first noticed becomes attended to, interpreted, mapped, questioned, represented, tested, revised, judged, authorized, acted upon, encountered in consequence, and reintegrated into ongoing lived Doing.",
    "The mapping is architectural rather than reductionist. Human inquiry includes embodiment, salience, affect, meaning, value, relationships, institutions, power, standing, agency, and authorship; it is not exhausted by computation.",
    "The stack is not a universal ontology. Ethics, science, history, logic, aesthetics, institutions, and other domains keep their own native objects, practices, and standards."
  ],
  architecturalInheritance:[
    "Full-stack computing encourages inspection across an entire architecture rather than treating one layer as the whole system.",
    "FSP carries forward that discipline by tracing transformations, interfaces, dependencies, and downstream consequences across the full course of an inquiry.",
    "The point is not that a human being is a software stack. The point is that inquiry can fail when we inspect one stage while ignoring how it was produced, what it licenses, what depends on it, or what follows from it."
  ],
  humanInformationArc:[
    "Lived Doing",
    "Noticing",
    "Attention",
    "Mapping",
    "Inquiry",
    "Representation",
    "Evidence & Interpretation",
    "Revision",
    "Possibility",
    "Judgment",
    "Authorization",
    "Action",
    "Consequence",
    "Authorial Return",
    "Changed Lived Doing",
    "REOPEN"
  ],
  publicInquiryArc:[
    "Lived Doing",
    "Noticing",
    "Inquiry",
    "Representation",
    "Revision",
    "Judgment",
    "Action",
    "Consequence",
    "Authorial Return",
    "REOPEN"
  ],
  antiReductionFirewall:[
    "Human beings process information, but human inquiry is not exhausted by computation.",
    "A representation of a person is not the person; a model of a situation is not the situation; a computationally generated possibility is not a recommendation or authorization.",
    "Meaning, embodiment, affect, value, relationship, power, standing, agency, and authorship remain irreducible parts of the human inquiry architecture.",
    "Shared architectural grammar does not imply shared domain ontology."
  ],
  phenomenalDoing:[
    "Inquiry begins before a proposition is fully formed. Something becomes salient for a living person already engaged in an ongoing Doing: something is noticed, felt, resisted, desired, feared, questioned, or found puzzling enough to deserve attention.",
    "Phenomenal Doing names this situated first-person field without treating first-person experience as infallible. It is the place from which an inquiry acquires salience and stakes, not a guarantee that the first interpretation is correct.",
    "FSP is therefore phenomenology-first in entry and return: it begins from how a problem becomes present for a situated human being and eventually returns abstractions, models, reasons, and consequences to the life in which they matter."
  ],
  existentialInquiry:[
    "Questions such as Why am I here?, What is the meaning of my life?, What am I?, What should I become?, and What may I carry forward? are legitimate full-stack inquiries because they begin in lived Doing and can recruit evidence and understanding from many domains without being reducible to any one of them.",
    "An existential inquiry may expand through cosmology, biology, neuroscience, psychology, history, culture, relationships, institutions, ethics, religion, and philosophy, but FSP requires the inquiry to preserve the provenance and limits of what each domain can contribute.",
    "The inquiry returns to the person as Authorial Return: not to manufacture a private truth immune to evidence, but to ask what a bounded human being may responsibly make of what has been learned."
  ],
  humanCenteredInquiryRelation:[
    "The human being remains at the center of the inquiry relation because this is where salience, questioning, interpretation, judgment, authorization, responsibility, consequence, and authorship are lived.",
    "Human-centered inquiry does not mean human-centered cosmology. FSP does not place humanity at the metaphysical center of the universe or assume that the world exists for human purposes.",
    "Phenomenology-first means that human inquiry must begin from and eventually return to the situated conditions under which anything becomes a question for a human being.",
    "Map ≠ World ≠ Person remains decisive: a cosmological map, biological explanation, cognitive model, or social-system account may illuminate a person without exhausting that person's lived relation to the inquiry."
  ],
  explanationMeaningFirewall:[
    "Explanation of the conditions that produced a person ≠ authorship of that person's meaning.",
    "Causal location in a system ≠ existential location within a life.",
    "A successful explanation of how a person or capacity arose may constrain an existential inquiry without automatically determining what that person should value, which commitments they should own, or how they should live.",
    "Existential appropriation must remain answerable to evidence and reasons while preserving the distinction between what explains a life and what a person may responsibly make of that explanation."
  ],
  complexityComparatorBoundary:[
    "FSP can use complexity science, self-organization, computational models, generative systems, and rule-space exploration as powerful resources for understanding how patterns and possibilities arise.",
    "A complexity-first or world-generative inquiry typically asks what global structures can emerge from local rules, interactions, or generative constraints. FSP adds the situated inquiry question: how does a bounded human being encounter, represent, test, interpret, and act within such a world?",
    "FSP then adds an authorial question that system generation alone does not settle: what may this person responsibly make of the understanding in the course of a life?",
    "Accordingly, world-generative explanation, inquiry-generative reconstruction, and authorial return are distinguishable layers. FSP may cooperate with a complexity ontology without becoming one."
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
    "Explanation of the conditions that produced a person ≠ authorship of that person's meaning",
    "Causal location in a system ≠ existential location within a life",
    "Current judgment ≠ final closure"
  ],
  inquiryArc:[
    "Lived Doing",
    "Noticing",
    "Attention",
    "Mapping",
    "Inquiry",
    "Representation",
    "Evidence & Interpretation",
    "Revision",
    "Possibility",
    "Judgment",
    "Authorization",
    "Action",
    "Consequence",
    "Authorial Return",
    "Changed Lived Doing",
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
  presentStatus:[
    "FSP is presently a translational and governance architecture for situated inquiry.",
    "FSP is not presently a complete scientific or philosophical theory of cognition, meaning, agency, consciousness, or inquiry."
  ],
  completionHorizon:[
    "Increasingly mature domain accounts may become selectively interoperable through warranted translation rather than assumed unity.",
    "A future FSP or successor could support increasingly comprehensive synthesis only where domain theories, bridge relations, claim ceilings, and remainders earn that integration.",
    "Present partiality does not establish permanent fragmentation, and present architectural breadth does not establish completeness."
  ],
  successorPrinciple:"FSP is committed to the inquiry, not to the permanent survival of its current vocabulary.",
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
      purpose:"Explain the architectural inheritance without turning persons into computers or the stack into ontology.",
      paragraphs:[
        "Full-stack is an architectural commitment, not merely a metaphor for complexity. Computer science contributes the discipline of following transformations across layers, interfaces, dependencies, and downstream effects rather than treating one layer as the whole system.",
        "FSP applies that discipline to human inquiry from first noticing through attention, mapping, representation, evidence and interpretation, revision, possibility, judgment, authorization, action, consequence, Authorial Return, and changed lived Doing.",
        "Different domains instantiate that architecture differently. What counts as evidence, authority, object, relation, action, or responsible closure in physics may differ sharply from ethics, history, logic, or aesthetics.",
        "Human inquiry is not reducible to computation. Embodiment, salience, affect, meaning, value, relationship, institutional power, standing, agency, and authorship remain part of what must be followed."
      ]
    },
    {
      id:"PHENOMENAL-DOING",
      title:"Why does inquiry begin in phenomenal Doing?",
      purpose:"Locate the human origin and return point of inquiry without granting first-person infallibility.",
      paragraphs:[
        "FSP begins before a claim is fully formed, with something becoming salient inside a person's ongoing Doing. The first-person field gives the inquiry its stakes, but it does not guarantee that the person's first interpretation is correct.",
        "Phenomenology-first therefore means first in inquiry order, not supreme in evidential authority. Inquiry may move outward through public evidence, other persons, models, institutions, histories, and sciences before returning to lived Doing."
      ]
    },
    {
      id:"EXISTENTIAL-INQUIRY",
      title:"Can FSP address questions about who I am and why I am here?",
      purpose:"Show why existential questions are full-stack rather than exceptional.",
      paragraphs:[
        "Yes. Questions such as Why am I here?, What is the meaning of my life?, What am I?, and What should I become? can recruit many domains while remaining questions asked by a particular bounded person.",
        "FSP does not promise a universal answer. It provides a governed inquiry path that keeps evidence, interpretation, possibility, judgment, authorization, consequence, and Authorial Return distinguishable."
      ]
    },
    {
      id:"HUMAN-CENTER",
      title:"What does it mean to keep the human being at the center?",
      purpose:"Distinguish the center of an inquiry relation from the center of the cosmos.",
      paragraphs:[
        "The human being is central because salience, questioning, interpretation, judgment, responsibility, and consequence are lived here. That is a claim about the architecture of human inquiry, not a claim that human beings occupy a privileged metaphysical location in the universe.",
        "Phenomenology-first does not mean human-centered cosmology. It means that inquiry must preserve the situated conditions under which something became a question and eventually return what was learned to the life in which it has consequences."
      ]
    },
    {
      id:"EXPLANATION-MEANING",
      title:"Does explaining a person explain the meaning of that person's life?",
      purpose:"Protect the explanation-to-meaning boundary.",
      paragraphs:[
        "No single causal or generative explanation automatically supplies existential authorship. Cosmology, evolution, neuroscience, psychology, social history, and computation may each explain important conditions of a person's existence while leaving open what that person should value or make of those explanations.",
        "FSP therefore preserves two firewalls: Explanation of the conditions that produced a person ≠ authorship of that person's meaning; and Causal location in a system ≠ existential location within a life."
      ]
    },
    {
      id:"COMPLEXITY-COMPARATOR",
      title:"How is FSP different from a complexity-first or generative-system philosophy?",
      purpose:"State a cooperative comparator boundary rather than a rival universal ontology.",
      paragraphs:[
        "Complexity and generative-system approaches can explain how large-scale order, patterns, and possibility spaces arise from interactions, rules, or constraints. FSP can use those explanations without treating them as complete accounts of human inquiry.",
        "FSP adds two layers: the inquiry-generative question of how a situated person comes to notice, represent, test, and understand some part of the system, and the authorial question of what that person may responsibly make of that understanding in a life.",
        "The difference is therefore architectural rather than adversarial: world-generative explanation, situated inquiry, and Authorial Return must not be silently collapsed into one another."
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
  if(o.inquiryArc.join(" -> ")!=="Lived Doing -> Noticing -> Attention -> Mapping -> Inquiry -> Representation -> Evidence & Interpretation -> Revision -> Possibility -> Judgment -> Authorization -> Action -> Consequence -> Authorial Return -> Changed Lived Doing -> REOPEN") failures.push("inquiry-arc-drift");
  if(o.humanInformationArc.join(" -> ")!==o.inquiryArc.join(" -> ")) failures.push("human-information-arc-drift");
  if(!o.architecturalInheritance.some(x=>x.toLowerCase().includes("full-stack computing"))) failures.push("missing-computing-architectural-inheritance");
  if(!o.fullStackMeaning.some(x=>x.includes("architectural rather than reductionist"))) failures.push("missing-architectural-not-reductionist");
  if(!o.antiReductionFirewall.some(x=>x.includes("not exhausted by computation"))) failures.push("missing-computational-reduction-firewall");
  if(!o.antiReductionFirewall.some(x=>x.includes("Shared architectural grammar does not imply shared domain ontology"))) failures.push("missing-architectural-domain-firewall");
  if(!o.phenomenalDoing.some(x=>x.includes("Phenomenal Doing"))) failures.push("missing-phenomenal-doing");
  if(!o.humanCenteredInquiryRelation.some(x=>x.includes("does not mean human-centered cosmology"))) failures.push("missing-anti-anthropocentric-firewall");
  if(!o.explanationMeaningFirewall.includes("Explanation of the conditions that produced a person ≠ authorship of that person's meaning.")) failures.push("missing-explanation-meaning-firewall");
  if(!o.explanationMeaningFirewall.includes("Causal location in a system ≠ existential location within a life.")) failures.push("missing-causal-existential-firewall");
  if(!o.complexityComparatorBoundary.some(x=>x.includes("world-generative explanation, inquiry-generative reconstruction, and authorial return"))) failures.push("missing-complexity-comparator-boundary");
  if(!o.existentialInquiry.some(x=>x.includes("Why am I here?"))) failures.push("missing-existential-inquiry-entry");
  if(!o.humanInformationArc.includes("Authorization")||!o.humanInformationArc.includes("Consequence")||!o.humanInformationArc.includes("Changed Lived Doing")) failures.push("missing-downstream-human-arc");
  if(!o.noPrerequisiteBoundary.some(x=>x.includes("without first learning FSP"))) failures.push("missing-no-prerequisite-boundary");
  if(!o.notClaims.some(x=>x.includes("not another ethical theory"))) failures.push("missing-not-ethical-theory");
  if(!o.notClaims.some(x=>x.includes("not a universal philosophy-of-science theory"))) failures.push("missing-not-philsci-theory");
  if(!o.presentStatus.some(x=>x.includes("translational and governance architecture"))) failures.push("missing-present-status");
  if(!o.presentStatus.some(x=>x.includes("not presently a complete"))) failures.push("missing-present-completeness-ceiling");
  if(!o.completionHorizon.some(x=>x.includes("successor"))) failures.push("missing-completion-horizon");
  if(!o.successorPrinciple.includes("not to the permanent survival")) failures.push("missing-successor-principle");
  if(!o.fullStackMeaning.some(x=>x.includes("not a universal ontology"))) failures.push("missing-domain-ontology-firewall");
  if(new Set(o.sections.map(x=>x.id)).size!==o.sections.length) failures.push("duplicate-section-id");
  return {passes:failures.length===0,failures:[...new Set(failures)].sort()};
}
