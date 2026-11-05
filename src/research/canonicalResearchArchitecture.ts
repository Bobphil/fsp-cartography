export interface CanonicalResearchArchitecture {
  canonicalRepositoryMode: "MONOGRAPH_SCALE";
  compressionPolicy: "NO_SUBMISSION_LIMIT_ON_CANONICAL";
  exportProfiles: {
    journalArticle: string[];
    conferencePaper: string[];
    vrProgramPaper: string[];
    monographChapter: string[];
  };
  protectedResearchAssets: string[];
}

export function buildCanonicalResearchArchitecture():CanonicalResearchArchitecture {
  return {
    canonicalRepositoryMode:"MONOGRAPH_SCALE",
    compressionPolicy:"NO_SUBMISSION_LIMIT_ON_CANONICAL",
    exportProfiles:{
      journalArticle:[
        "derive bounded question from canonical repository",
        "select only evidence needed for target claim",
        "preserve omitted-material ledger",
        "never delete canonical support to fit word count"
      ],
      conferencePaper:[
        "compress to one demonstrative result",
        "link conceptual dependencies back to canonical repository"
      ],
      vrProgramPaper:[
        "retain experiential architecture",
        "separate formal results from implementation claims"
      ],
      monographChapter:[
        "permit full argument, comparator history, failures, and extensions",
        "retain research-development chronology where philosophically useful"
      ]
    },
    protectedResearchAssets:[
      "full formal specifications",
      "failed tests and repair history",
      "alternative hypotheses",
      "extended case reconstructions",
      "comparator analyses",
      "ablation results",
      "claim ceilings",
      "future research branches"
    ]
  };
}
