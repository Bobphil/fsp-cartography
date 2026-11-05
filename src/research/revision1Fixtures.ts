import { RevisionState, RevisionOperation } from "./revision1";

export const uranusBaseline:RevisionState={
  id:"uranus-newtonian-baseline",
  task:"explain the anomalous orbit of Uranus",
  evidenceAssessments:[
    "Uranus observations are sufficiently reliable to require explanation"
  ],
  auxiliaries:[
    "known gravitating bodies are adequately represented",
    "observational error is not sufficient to explain the anomaly"
  ],
  warrants:[
    "Newtonian dynamics licenses orbital predictions given gravitating masses and initial conditions"
  ],
  background:[
    "Newtonian celestial mechanics is the working framework"
  ],
  claimCeiling:"the anomaly requires revision somewhere in the represented test system",
  ontologyCommitments:["gravitating bodies","Newtonian force relations"],
  frameworkCommitments:["Newtonian celestial mechanics"],
  unresolvedAnomalies:["Uranus orbit discrepancy"],
  licensedPredictions:[]
};

export const neptuneAuxiliaryRepair:RevisionOperation={
  id:"add-neptune-like-planet",
  target:"AUXILIARY",
  remove:["known gravitating bodies are adequately represented"],
  add:["an additional unknown gravitating planet may perturb Uranus"],
  reason:"repair anomaly by revising a solar-system auxiliary while retaining Newtonian dynamics"
};

export const uranusFrameworkReplacement:RevisionOperation={
  id:"replace-newtonian-framework-for-uranus",
  target:"FRAMEWORK",
  remove:["Newtonian celestial mechanics"],
  add:["alternative gravitational framework"],
  reason:"treat Uranus anomaly as evidence for deeper framework replacement"
};

export const mercuryBaseline:RevisionState={
  id:"mercury-newtonian-baseline",
  task:"explain the anomalous perihelion precession of Mercury",
  evidenceAssessments:[
    "Mercury perihelion anomaly is sufficiently stable to require explanation"
  ],
  auxiliaries:[
    "known gravitating bodies are adequately represented",
    "observational error is not sufficient to explain the anomaly"
  ],
  warrants:[
    "Newtonian dynamics licenses perihelion predictions given gravitating masses and initial conditions"
  ],
  background:[
    "Newtonian celestial mechanics is the working framework"
  ],
  claimCeiling:"the anomaly requires revision somewhere in the represented test system",
  ontologyCommitments:["gravitating bodies","Newtonian force relations"],
  frameworkCommitments:["Newtonian celestial mechanics"],
  unresolvedAnomalies:["Mercury perihelion discrepancy"],
  licensedPredictions:[]
};

export const vulcanAuxiliaryRepair:RevisionOperation={
  id:"add-vulcan-like-planet",
  target:"AUXILIARY",
  remove:["known gravitating bodies are adequately represented"],
  add:["an additional intra-Mercurial planet may perturb Mercury"],
  reason:"repair anomaly by revising an auxiliary while retaining Newtonian dynamics"
};

export const relativityFrameworkRevision:RevisionOperation={
  id:"replace-newtonian-with-relativistic-gravity",
  target:"FRAMEWORK",
  remove:["Newtonian celestial mechanics"],
  add:["relativistic gravitational framework"],
  reason:"revise the gravitational framework after auxiliary repair fails"
};

export const claimCeilingContraction:RevisionOperation={
  id:"contract-mercury-claim-ceiling",
  target:"CLAIM_CEILING",
  replaceText:"current evidence establishes an anomaly but not a uniquely correct revision target",
  reason:"narrow the claim rather than prematurely selecting a theory repair"
};
