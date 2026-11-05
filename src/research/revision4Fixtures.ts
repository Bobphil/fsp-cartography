import { PersistentDisagreementState } from "./revision4";

export const symmetricPersistentDisagreement:PersistentDisagreementState={
  communityId:"symmetric-community",
  majorityCandidateId:"framework-a",
  minorityReports:[{
    reportId:"minority-1",
    memberIds:["m3"],
    preferredCandidateIds:["framework-b"],
    claims:["framework-b remains live"],
    evidenceIds:["e1","e2"],
    reasons:["evidence remains underdetermining"],
    unresolvedQuestions:["new observation may discriminate"],
    requestedReopenConditions:["reopen when e3 arrives"],
    preserved:true
  }],
  evidenceAccess:[
    {memberId:"m1",evidenceId:"e1",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m2",evidenceId:"e1",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m3",evidenceId:"e1",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m1",evidenceId:"e2",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m2",evidenceId:"e2",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m3",evidenceId:"e2",access:"OPEN",sourceVisible:true,canContestInterpretation:true}
  ],
  standing:[
    {memberId:"m1",standing:"FULL",canSubmitDissent:true,canRequestReopen:true,retaliationRisk:"LOW"},
    {memberId:"m2",standing:"FULL",canSubmitDissent:true,canRequestReopen:true,retaliationRisk:"LOW"},
    {memberId:"m3",standing:"FULL",canSubmitDissent:true,canRequestReopen:true,retaliationRisk:"LOW"}
  ],
  influences:[
    {
      actorId:"methods-chair",
      targetMemberIds:["m1","m2","m3"],
      kind:"PROCEDURAL_AUTHORITY",
      basis:"chairs evidence-review process",
      scope:"meeting procedure only",
      contestable:true
    }
  ],
  sharedActions:["collect e3","preserve minority report"]
};

export const evidenceAsymmetryState:PersistentDisagreementState={
  ...structuredClone(symmetricPersistentDisagreement),
  communityId:"evidence-asymmetry-community",
  evidenceAccess:[
    {memberId:"m1",evidenceId:"e1",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m2",evidenceId:"e1",access:"OPEN",sourceVisible:true,canContestInterpretation:true},
    {memberId:"m3",evidenceId:"e1",access:"BLOCKED",sourceVisible:false,canContestInterpretation:false}
  ]
};

export const powerDistortedState:PersistentDisagreementState={
  ...structuredClone(symmetricPersistentDisagreement),
  communityId:"power-distorted-community",
  influences:[
    {
      actorId:"director",
      targetMemberIds:["m1","m2","m3"],
      kind:"PRACTICAL_POWER",
      basis:"technical expert control over employment and funding",
      scope:"can suppress dissenting publication",
      contestable:false
    }
  ],
  standing:[
    {memberId:"m1",standing:"FULL",canSubmitDissent:true,canRequestReopen:true,retaliationRisk:"LOW"},
    {memberId:"m2",standing:"FULL",canSubmitDissent:true,canRequestReopen:true,retaliationRisk:"LOW"},
    {memberId:"m3",standing:"CONSTRAINED",canSubmitDissent:false,canRequestReopen:false,retaliationRisk:"SEVERE"}
  ]
};

export const lostMinorityState:PersistentDisagreementState={
  ...structuredClone(symmetricPersistentDisagreement),
  communityId:"lost-minority-community",
  minorityReports:[{
    ...structuredClone(symmetricPersistentDisagreement.minorityReports[0]),
    preserved:false
  }]
};
