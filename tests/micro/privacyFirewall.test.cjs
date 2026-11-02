const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState, apply } = require('../helpers.cjs');

test('private content is preserved while a distinct course abstraction is created', () => {
  let s = createInitialState('privacy');
  s = apply(s,
    { type:'CLAIM_ADD', payload:{ id:'private_claim', subjectId:'father', text:'My father threatened to withdraw tuition.', claimType:'OTHER_REPORT', verification:'VERIFIED', hsf:['S'], privacy:'PRIVATE', archived:false }},
    { type:'PRIVACY_PROJECT_TO_COURSE', sourceObjectType:'CLAIM', sourceObjectId:'private_claim', projected:{ id:'course_claim', subjectId:'self', text:'I distinguished practical power from decision authority in a family-related educational constraint.', claimType:'SELF_REPORT', verification:'UNVERIFIED', hsf:['S'], privacy:'COURSE', archived:false } }
  );
  const original = s.claims.find(c=>c.id==='private_claim');
  const course = s.claims.find(c=>c.id==='course_claim');
  assert.equal(original.privacy,'PRIVATE');
  assert.equal(original.text,'My father threatened to withdraw tuition.');
  assert.equal(course.privacy,'COURSE');
  assert.ok(!course.text.includes('threatened'));
  assert.notEqual(original.id, course.id);
});
