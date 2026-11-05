import {
  CandidateReasonProfile,
  GoodSenseProfile
} from "./revision2";
import {
  ReasonSalience,
  RevisionMoment
} from "./revision3Dynamics";
import {
  CommunityMemberJudgment
} from "./revision3Community";

export const relativityEarly:CandidateReasonProfile={
  candidateId:"replace-newtonian-with-relativistic-gravity",
  assessments:{
    EVIDENCE_FIT:"FAVORS",
    COHERENCE:"FAVORS",
    SIMPLICITY:"COUNTS_AGAINST",
    FECUNDITY:"FAVORS",
    SCOPE:"FAVORS",
    CONSERVATISM:"STRONGLY_COUNTS_AGAINST",
    EXPLANATORY_POWER:"FAVORS"
  },
  notes:{}
};

export const relativityLater:CandidateReasonProfile={
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
  notes:{}
};

export const vulcanEarly:CandidateReasonProfile={
  candidateId:"add-vulcan-like-planet",
  assessments:{
    EVIDENCE_FIT:"UNRESOLVED",
    COHERENCE:"FAVORS",
    SIMPLICITY:"FAVORS",
    FECUNDITY:"NEUTRAL",
    SCOPE:"NEUTRAL",
    CONSERVATISM:"STRONGLY_FAVORS",
    EXPLANATORY_POWER:"NEUTRAL"
  },
  notes:{}
};

export const vulcanLater:CandidateReasonProfile={
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
  notes:{}
};

export const empiricist:GoodSenseProfile={
  evaluatorId:"empiricist",
  priorityOrder:[
    "EVIDENCE_FIT","EXPLANATORY_POWER","COHERENCE","SCOPE",
    "FECUNDITY","SIMPLICITY","CONSERVATISM"
  ],
  permittedReasons:[
    "EVIDENCE_FIT","EXPLANATORY_POWER","COHERENCE","SCOPE",
    "FECUNDITY","SIMPLICITY","CONSERVATISM"
  ],
  excludedReasons:[],
  rationale:["evidence is primary but not exclusive"]
};

export const conservative:GoodSenseProfile={
  evaluatorId:"conservative",
  priorityOrder:[
    "CONSERVATISM","SIMPLICITY","COHERENCE","EVIDENCE_FIT",
    "EXPLANATORY_POWER","SCOPE","FECUNDITY"
  ],
  permittedReasons:[
    "EVIDENCE_FIT","EXPLANATORY_POWER","COHERENCE","SCOPE",
    "FECUNDITY","SIMPLICITY","CONSERVATISM"
  ],
  excludedReasons:[],
  rationale:["framework preservation receives high initial salience"]
};

const salience=(pairs:[ReasonSalience["reason"],ReasonSalience["salience"],string][]):ReasonSalience[] =>
  pairs.map(([reason,salience,rationale])=>({reason,salience,rationale}));

export const mercuryMomentEarly:RevisionMoment={
  momentId:"mercury-early",
  ordinal:1,
  evidenceState:[
    "Mercury perihelion anomaly persists",
    "Vulcan remains a live auxiliary hypothesis"
  ],
  candidateProfiles:[vulcanEarly,relativityEarly],
  evaluatorProfiles:[empiricist,conservative],
  salienceByEvaluator:{
    empiricist:salience([
      ["EVIDENCE_FIT","HIGH","new evidence should discriminate candidates"],
      ["EXPLANATORY_POWER","HIGH","explanatory reach matters"],
      ["CONSERVATISM","LOW","preservation alone is not decisive"]
    ]),
    conservative:salience([
      ["EVIDENCE_FIT","MEDIUM","evidence matters"],
      ["CONSERVATISM","CRITICAL","preserve successful framework if possible"],
      ["SIMPLICITY","HIGH","prefer local repair when defensible"]
    ])
  },
  events:["Mercury anomaly remains unresolved"]
};

export const mercuryMomentLater:RevisionMoment={
  momentId:"mercury-later",
  ordinal:2,
  evidenceState:[
    "Mercury perihelion anomaly persists",
    "Vulcan searches fail to establish the proposed planet",
    "relativistic prediction accounts for Mercury perihelion"
  ],
  candidateProfiles:[vulcanLater,relativityLater],
  evaluatorProfiles:[empiricist,conservative],
  salienceByEvaluator:{
    empiricist:salience([
      ["EVIDENCE_FIT","CRITICAL","new discriminatory evidence has arrived"],
      ["EXPLANATORY_POWER","HIGH","explanatory reach matters"],
      ["CONSERVATISM","LOW","preservation alone is not decisive"]
    ]),
    conservative:salience([
      ["EVIDENCE_FIT","HIGH","failed auxiliary repair raises evidential stakes"],
      ["CONSERVATISM","HIGH","framework preservation still matters but is defeasible"],
      ["SIMPLICITY","MEDIUM","local simplicity loses salience when repair fails"]
    ])
  },
  events:[
    "Vulcan search trajectory weakens auxiliary repair",
    "relativistic account gains evidential support"
  ]
};

export const earlyCommunity:CommunityMemberJudgment[]=[
  {
    memberId:"m1",
    evaluatorId:"empiricist",
    liveCandidateIds:["add-vulcan-like-planet","replace-newtonian-with-relativistic-gravity"],
    preferredCandidateId:"replace-newtonian-with-relativistic-gravity",
    actionCommitments:["collect further perihelion evidence"],
    statedReasons:["EVIDENCE_FIT","EXPLANATORY_POWER"]
  },
  {
    memberId:"m2",
    evaluatorId:"conservative",
    liveCandidateIds:["add-vulcan-like-planet","replace-newtonian-with-relativistic-gravity"],
    preferredCandidateId:"add-vulcan-like-planet",
    actionCommitments:["collect further perihelion evidence"],
    statedReasons:["CONSERVATISM","SIMPLICITY"]
  }
];

export const laterCommunity:CommunityMemberJudgment[]=[
  {
    memberId:"m1",
    evaluatorId:"empiricist",
    liveCandidateIds:["replace-newtonian-with-relativistic-gravity"],
    preferredCandidateId:"replace-newtonian-with-relativistic-gravity",
    actionCommitments:["adopt relativistic perihelion calculation","continue independent tests"],
    statedReasons:["EVIDENCE_FIT","EXPLANATORY_POWER","FECUNDITY"]
  },
  {
    memberId:"m2",
    evaluatorId:"conservative",
    liveCandidateIds:["replace-newtonian-with-relativistic-gravity"],
    preferredCandidateId:"replace-newtonian-with-relativistic-gravity",
    actionCommitments:["adopt relativistic perihelion calculation","continue independent tests"],
    statedReasons:["EVIDENCE_FIT","COHERENCE"]
  }
];
