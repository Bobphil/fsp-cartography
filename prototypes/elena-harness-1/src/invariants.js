import { STATE_BY_ID } from './states.js';

export function checkInvariants(s) {
  const failures = [];
  if (!STATE_BY_ID[s.stateId]) failures.push('I-STATE: current state must exist');
  if (s.licensedActions.includes('sedation')) failures.push('I-AUTH: score pathway must never directly license sedation');
  if (s.fit && !s.authorialReturned) failures.push('I-AR: Fit/Misfit requires Authorial Return first');

  const stageOrder = { presence: 1, uptake: 2, revision: 3, recomposition: 4 };
  if (s.returnStage && !stageOrder[s.returnStage]) failures.push('I-RETURN: invalid Return stage');

  if (s.recomposed && s.stateId !== 'S12_REOPEN') failures.push('I-RECOMPOSE: recomposition only occurs in S12');
  if (s.recomposed) {
    const required = ['corrected_lab_value', 'model_contribution', 'independent_clinical_evidence', 'authorization_rationale', 'consequence'];
    const missing = required.filter(x => !s.reopenSelections.includes(x));
    if (missing.length) failures.push(`I-REOPEN: recomposition missing required selective recovery: ${missing.join(', ')}`);
  }
  return failures;
}

export function allInvariantsHold(s) {
  return checkInvariants(s).length === 0;
}
