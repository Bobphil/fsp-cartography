import {
  CandidateReasonProfile,
  GoodSenseProfile,
  PathDependenceContext
} from "./revision2";

export const neptuneReasonProfile:CandidateReasonProfile={
  candidateId:"add-neptune-like-planet",
  assessments:{
    EVIDENCE_FIT:"STRONGLY_FAVORS",
    COHERENCE:"FAVORS",
    SIMPLICITY:"FAVORS",
    FECUNDITY:"FAVORS",
    SCOPE:"NEUTRAL",
    CONSERVATISM:"STRONGLY_FAVORS",
    EXPLANATORY_POWER:"FAVORS"
  },
  notes:{
    EVIDENCE_FIT:"later observational success strongly supports the repair trajectory",
    CONSERVATISM:"retains Newtonian framework while revising one auxiliary"
  }
};

export const vulcanReasonProfile:CandidateReasonProfile={
  candidateId:"add-vulcan-like-planet",
  assessments:{
    EVIDENCE_FIT:"STRONGLY_COUNTS_AGAINST",
    COHERENCE:"FAVORS",
    SIMPLICITY:"FAVORS",
    FECUNDITY:"COUNTS_AGAINST",
    SCOPE:"NEUTRAL",
    CONSERVATISM:"STRONGLY_FAVORS",
    EXPLANATORY_POWER:"COUNTS_AGAINST"
  },
  notes:{
    EVIDENCE_FIT:"the proposed planet was not successfully established",
    CONSERVATISM:"retains Newtonian framework with minimal structural change"
  }
};

export const relativityReasonProfile:CandidateReasonProfile={
  candidateId:"replace-newtonian-with-relativistic-gravity",
  assessments:{
    EVIDENCE_FIT:"STRONGLY_FAVORS",
    COHERENCE:"FAVORS",
    SIMPLICITY:"COUNTS_AGAINST",
    FECUNDITY:"STRONGLY_FAVORS",
    SCOPE:"STRONGLY_FAVORS",
    CONSERVATISM:"STRONGLY_COUNTS_AGAINST",
    EXPLANATORY_POWER:"STRONGLY_FAVORS"
  },
  notes:{
    SIMPLICITY:"requires a deeper mathematical and conceptual framework",
    FECUNDITY:"opens a wider program of gravitational predictions",
    CONSERVATISM:"revises the gravitational framework rather than a local auxiliary"
  }
};

export const cautiousEmpiricist:GoodSenseProfile={
  evaluatorId:"cautious-empiricist",
  priorityOrder:[
    "EVIDENCE_FIT",
    "COHERENCE",
    "EXPLANATORY_POWER",
    "SIMPLICITY",
    "CONSERVATISM",
    "SCOPE",
    "FECUNDITY"
  ],
  permittedReasons:[
    "EVIDENCE_FIT","COHERENCE","EXPLANATORY_POWER","SIMPLICITY",
    "CONSERVATISM","SCOPE","FECUNDITY"
  ],
  excludedReasons:[],
  rationale:[
    "empirical adequacy receives high salience",
    "conservatism matters but cannot rescue a failed empirical trajectory"
  ]
};

export const conservativeResearcher:GoodSenseProfile={
  evaluatorId:"conservative-researcher",
  priorityOrder:[
    "CONSERVATISM",
    "SIMPLICITY",
    "COHERENCE",
    "EVIDENCE_FIT",
    "EXPLANATORY_POWER",
    "SCOPE",
    "FECUNDITY"
  ],
  permittedReasons:[
    "EVIDENCE_FIT","COHERENCE","SIMPLICITY","FECUNDITY",
    "SCOPE","CONSERVATISM","EXPLANATORY_POWER"
  ],
  excludedReasons:[],
  rationale:[
    "preservation of a successful framework receives high salience",
    "simplicity and continuity are treated as genuine but defeasible virtues"
  ]
};

export const mercuryPathContext:PathDependenceContext={
  contextId:"mercury-newtonian-research-context",
  inheritedFramework:["Newtonian celestial mechanics"],
  normalPractice:[
    "search for unmodeled perturbing bodies",
    "treat orbital anomalies within celestial mechanics"
  ],
  sunkInfrastructure:[
    "Newtonian tables and computational techniques",
    "observatories calibrated around established astronomical practice"
  ],
  trainingCommitments:[
    "researchers trained in Newtonian celestial mechanics"
  ],
  institutionalConstraints:[
    "publication and research networks organized around established celestial mechanics"
  ]
};
