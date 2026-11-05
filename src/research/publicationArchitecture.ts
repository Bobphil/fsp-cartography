export interface PublicationArchitecture {
  empiricalPaper: string[];
  formalPaper: string[];
  philosophicalPaper: string[];
  vrProgram: string[];
  claimCeiling: string;
}

export function buildPublicationArchitecture(
  domainCount:number,
  comparatorLossFound:boolean,
  allPrimitivesNecessary:boolean
):PublicationArchitecture {
  const claimCeiling =
    domainCount>=3 && comparatorLossFound
      ? "THREE-DOMAIN REPLICATION WITH COMPARATOR DELTA"
      : "CROSS-DOMAIN REPLICATION";

  return {
    empiricalPaper:[
      "three-domain replication results",
      "directed translation matrices",
      "failure and remainder cases",
      "primitive-ablation results"
    ],
    formalPaper:[
      "task-relative translation grammar",
      "underdetermination candidate theorem",
      "perturbation robustness",
      "comparator loss analysis"
    ],
    philosophicalPaper:[
      "ontological agnosticism",
      "cooperation without convergence",
      "standing and anti-domination",
      "limits of translation"
    ],
    vrProgram:[
      "experiential visualization of translation remainder",
      "same-action/different-reason demonstrations",
      "scaffold fading and return to lived Doing"
    ],
    claimCeiling:allPrimitivesNecessary
      ? claimCeiling
      : `${claimCeiling}; primitive set remains provisional`
  };
}
