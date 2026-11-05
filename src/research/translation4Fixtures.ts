import { PerturbationSpec } from "./translation4";
import { forestBaselineSnapshot } from "./forestPerturbations";

export const outOfSampleSpecs:PerturbationSpec[] = [
  {
    id:"shared-sediment-spike",
    kind:"ADD_SHARED_EVIDENCE",
    value:"sediment concentration rises after heavy rainfall"
  },
  {
    id:"c-place-testimony",
    kind:"ADD_PRF_SPECIFIC_EVIDENCE",
    targetPrfId:"C",
    value:"community testimony identifies seasonal fish spawning dependence"
  },
  {
    id:"remove-shared-reversibility",
    kind:"REMOVE_SHARED_EVIDENCE",
    value:"watershed damage can become difficult to reverse"
  },
  {
    id:"a-calibration-shift",
    kind:"ALTER_AUXILIARY",
    targetPrfId:"A",
    secondaryValue:"erosion model calibrated locally",
    value:"erosion model calibration is disputed"
  },
  {
    id:"b-compensation-consequence",
    kind:"ADD_CONSEQUENCE",
    targetPrfId:"B",
    value:"extended moratorium may trigger compensation claims"
  },
  {
    id:"d-restoration-action",
    kind:"ADD_ACTION",
    targetPrfId:"D",
    value:"fund riparian restoration as stewardship obligation"
  },
  {
    id:"a-remove-joint-review",
    kind:"REMOVE_ACTION",
    targetPrfId:"A",
    value:"joint evidence review"
  }
];

export const auxiliaryDependencyMap:Record<string,string[]> = {
  "A:aux:0":["empiricalCommitments","predictedConsequences","licensedActions"],
  "A:aux:1":["practicalConstraints","licensedActions"],
  "B:aux:0":["practicalConstraints","licensedActions"],
  "B:aux:1":["empiricalCommitments","predictedConsequences"],
  "C:aux:0":["empiricalCommitments","predictedConsequences"],
  "C:aux:1":["practicalConstraints","licensedActions"],
  "D:aux:0":["practicalConstraints","licensedActions"],
  "D:aux:1":["predictedConsequences","licensedActions"]
};

export function getBaseline(){
  return structuredClone(forestBaselineSnapshot);
}
