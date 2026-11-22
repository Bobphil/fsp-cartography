export const STATES = [
  {
    id: 'S1_LIVED_FIELD', n: 1, title: 'Lived Field',
    purpose: 'Elena precedes every clinical representation.',
    operation: 'ORIENT',
    visible: ['Elena', 'Hospital room', 'Breathing effort', 'Call button'],
    hidden: ['Clinical record', 'Population data', 'Risk model', 'Threshold policy'],
    prompt: 'Something feels different. I feel weaker, and breathing feels harder.',
    lesson: 'Lived person ≠ clinical map.',
    next: 'S2_CLINICAL_MAP'
  },
  {
    id: 'S2_CLINICAL_MAP', n: 2, title: 'Clinical Map',
    purpose: 'A partial clinical representation is created without becoming Elena.',
    operation: 'TRACE / REVEAL',
    visible: ['Elena', 'Clinical record', 'Oxygen saturation', 'Respiratory rate', 'Nursing note'],
    hidden: ['Prior sedation experience', 'Family role', 'Felt strangeness', 'Unstructured nursing impressions'],
    prompt: 'What entered the chart, and what remained outside it?',
    lesson: 'Representation ≠ represented person; omission ≠ falsehood.',
    next: 'S3_POPULATION_FIELD'
  },
  {
    id: 'S3_POPULATION_FIELD', n: 3, title: 'Population Field',
    purpose: 'Individual records become comparative population evidence.',
    operation: 'CROSS / REVEAL',
    visible: ['Prior records', 'Recorded features', 'Outcome labels', 'Statistical pattern'],
    hidden: ['Full personal histories', 'Individual causal stories', 'Patient values'],
    prompt: 'What changed when many persons became a population pattern?',
    lesson: 'Population pattern ≠ individual destiny.',
    next: 'S4_MODEL'
  },
  {
    id: 'S4_MODEL', n: 4, title: 'Predictive Model',
    purpose: 'Population evidence becomes operational predictive infrastructure.',
    operation: 'TRACE / REVEAL',
    visible: ['Clinical Deterioration Risk Model', 'Training provenance tether', 'Prediction task'],
    hidden: ['Treatment authority', 'Consent', 'Causal diagnosis'],
    prompt: 'What can this model do, and what does it not automatically do?',
    lesson: 'Prediction infrastructure ≠ clinical authority.',
    next: 'S5_SCORE'
  },
  {
    id: 'S5_SCORE', n: 5, title: 'Individual Score',
    purpose: 'Population-trained evidence is transported to Elena as an individualized estimate.',
    operation: 'CROSS',
    visible: ['Risk score: 0.81', 'Elena record', 'Model'],
    hidden: ['Certainty', 'Diagnosis', 'Treatment mandate'],
    prompt: 'What changed when the index moved from population to Elena?',
    lesson: 'Population evidence → individual prediction requires scope discipline.',
    next: 'S6_HIGH_RISK'
  },
  {
    id: 'S6_HIGH_RISK', n: 6, title: 'Status Crossing',
    purpose: 'A numerical model result becomes an institutional workflow category.',
    operation: 'CROSS',
    visible: ['0.81 — model prediction', 'Threshold ≥ 0.80', 'HIGH RISK — workflow category'],
    hidden: ['Natural discontinuity', 'Automatic treatment authorization'],
    prompt: 'What changed at the threshold?',
    lesson: 'Score → institutional status is a status transformation.',
    next: 'S7_STANDING'
  },
  {
    id: 'S7_STANDING', n: 7, title: 'Standing Field',
    purpose: 'Different participants matter for different functions.',
    operation: 'STANDING',
    visible: ['Elena', 'Nurse', 'Dr. Rahman', 'AI model', 'Hospital'],
    hidden: ['Global standing rank'],
    prompt: 'Who matters here—and for what?',
    lesson: 'Epistemic, affected, decisional, review, and restoration standing are distinct.',
    next: 'S8_AUTHORIZATION'
  },
  {
    id: 'S8_AUTHORIZATION', n: 8, title: 'Authorization Gate',
    purpose: 'Evidence must not silently inherit authority.',
    operation: 'LICENSE',
    visible: ['HIGH RISK', 'Closer monitoring', 'Transfer', 'Sedation', 'Authorization gate'],
    hidden: ['Universal authority token'],
    prompt: 'What licenses each downstream action?',
    lesson: 'Evidence ≠ recommendation ≠ authorization.',
    next: 'S9_AUTHORIAL_RETURN'
  },
  {
    id: 'S9_AUTHORIAL_RETURN', n: 9, title: 'Authorial Return',
    purpose: 'A consequential representation returns to the person it characterizes.',
    operation: 'RETURN TO PERSON',
    visible: ['Risk explanation', 'Elena response', 'Fit marker', 'Qualification marker'],
    hidden: ['Patient factual sovereignty'],
    prompt: 'What fits Elena’s experience, and what does she qualify?',
    lesson: 'Fit/Misfit is relevant without becoming truth or veto.',
    next: 'S10_ACTION'
  },
  {
    id: 'S10_ACTION', n: 10, title: 'Action / Sedimentation',
    purpose: 'A bounded authorization changes the world while preserving reconstruction capacity.',
    operation: 'ACT / OBSERVE',
    visible: ['Transfer order', 'Monitoring workflow', 'Handoff', 'Warrant capsule'],
    hidden: ['Inquiry closure'],
    prompt: 'What changed because we acted, and what must remain recoverable?',
    lesson: 'Action closure ≠ inquiry closure; decisions begin to sediment into infrastructure.',
    next: 'S11_RETURN'
  },
  {
    id: 'S11_RETURN', n: 11, title: 'Consequence / Return',
    purpose: 'A downstream error becomes a potential challenge to earlier warrant and authorization.',
    operation: 'RETURN CONSEQUENCE',
    visible: ['Data-entry error', 'Patient burden', 'Return Presence', 'Uptake', 'Revision', 'Recomposition'],
    hidden: ['Automatic correction'],
    prompt: 'How far has the Return actually traveled?',
    lesson: 'Presence ≠ Uptake ≠ Revision ≠ Recomposition.',
    next: 'S12_REOPEN'
  },
  {
    id: 'S12_REOPEN', n: 12, title: 'Selective REOPEN / Recomposition',
    purpose: 'Recover only the distinctions made relevant by the failure, then construct a revised bounded action.',
    operation: 'REOPEN / RECOMPOSE',
    visible: ['Original lab value', 'Corrected lab value', 'Model contribution', 'Independent clinical evidence', 'Authorization rationale', 'Consequences'],
    hidden: ['Total rewind', 'Total decompression'],
    prompt: 'What must return to view, and what can remain compressed?',
    lesson: 'REOPEN ≠ rewind; recomposition carries history forward.',
    next: null
  }
];

export const STATE_BY_ID = Object.fromEntries(STATES.map(s => [s.id, s]));

export const STANDING_MODES = ['evidence', 'affected', 'decision', 'review', 'restoration'];
export const RETURN_STAGES = ['presence', 'uptake', 'revision', 'recomposition'];

export const STANDING = {
  evidence: {
    'Elena': 'First-person symptom and history evidence',
    'Nurse': 'Longitudinal bedside observation',
    'Dr. Rahman': 'Clinical expertise and synthesis',
    'AI model': 'Predictive pattern contribution',
    'Hospital': 'Operational data and institutional context'
  },
  affected: {
    'Elena': 'Primary bearer of clinical consequences',
    'Hospital': 'Secondary resource/system consequences'
  },
  decision: {
    'Elena': 'Decisional standing for interventions where consent applies',
    'Dr. Rahman': 'Professional authority to order bounded clinical actions',
    'Hospital': 'Administrative authority within policy/resource scope'
  },
  review: {
    'Elena': 'Contestatory and affected-party input',
    'Nurse': 'Clinical review evidence',
    'Dr. Rahman': 'Clinical review participation',
    'Hospital': 'Quality and safety review authority'
  },
  restoration: {
    'Elena': 'Standing regarding burdens and repair',
    'Hospital': 'Authority/responsibility to correct records, billing, workflow, or other warranted repair'
  }
};
