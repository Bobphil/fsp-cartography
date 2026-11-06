const test=require('node:test');
const assert=require('node:assert/strict');
const {
  GALILEO_NARRATIVE,
  NEPTUNE_VULCAN_NARRATIVE,
  narrativeForCase,
  apertureForChapter,
  milestoneForState,
  recoverInquiryContext,
  validateInquiryNarrative
}=require('../../dist/research/fspInquiryNarrative.js');

test('Galileo narrative spine validates against the common contract',()=>{
  const r=validateInquiryNarrative(GALILEO_NARRATIVE);
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('Galileo and Neptune/Vulcan share one narrative-spine contract without identical content',()=>{
  assert.notEqual(GALILEO_NARRATIVE.caseId,NEPTUNE_VULCAN_NARRATIVE.caseId);
  assert.equal(GALILEO_NARRATIVE.apertures.length,4);
  assert.equal(NEPTUNE_VULCAN_NARRATIVE.apertures.length,4);
  assert.notDeepEqual(GALILEO_NARRATIVE.milestones,NEPTUNE_VULCAN_NARRATIVE.milestones);
});

test('Galileo whole story preserves evidence meaning standing jurisdiction and power as distinct threads',()=>{
  const whole=GALILEO_NARRATIVE.narrativeParagraphs.join(' ');
  for(const term of ['evidence','demonstration','standing','jurisdiction','institutional power']) {
    assert.match(whole,new RegExp(term,'i'));
  }
});

test('Galileo chronology anchors telescope 1609-1610 interpretation 1613-1616 and trial 1632-1633',()=>{
  assert.ok(GALILEO_NARRATIVE.milestones.some(m=>m.start==='1609' && m.end==='1610'));
  assert.ok(GALILEO_NARRATIVE.milestones.some(m=>m.start==='1613' && m.end==='1616'));
  assert.ok(GALILEO_NARRATIVE.milestones.some(m=>m.start==='1632' && m.end==='1633'));
});

test('Galileo G1 temporal recovery points to telescopic evidence rather than later trial',()=>{
  const hits=milestoneForState('GALILEO-COPERNICAN','G1');
  assert.ok(hits.some(m=>/telescope|Venus/i.test(m.label)));
  assert.equal(hits.some(m=>/trial|condemnation/i.test(m.label)),false);
});

test('Galileo chapter 1 aperture blocks telescope-equals-complete-Copernican-proof inference',()=>{
  const a=apertureForChapter('GALILEO-COPERNICAN','CH1-DUHEM-QUINE');
  assert.match(a.currentFocus,/without by themselves uniquely demonstrating the entire Copernican system/i);
});

test('Galileo chapter 2 aperture treats same words as historically situated roles',()=>{
  const a=apertureForChapter('GALILEO-COPERNICAN','CH2-KUHN-MEANING');
  assert.match(a.chapterQuestion,/demonstration, hypothesis, heavens, motion, and authority/i);
  assert.ok(a.whatFspAdds.some(x=>/concept versions/i.test(x)));
});

test('Galileo chapter 4 aperture keeps evidence meaning standing and power distinct',()=>{
  const a=apertureForChapter('GALILEO-COPERNICAN','CH4-DIACHRONIC-FORMALISM');
  assert.match(a.chapterQuestion,/evidence, meaning, standing, and power together/i);
  assert.ok(a.whatFspAdds.some(x=>/distinct/i.test(x)));
});

test('Galileo firewalls distinguish jurisdiction power and truth',()=>{
  const firewalls=GALILEO_NARRATIVE.firewalls.join(' ');
  assert.match(firewalls,/Interpretive jurisdiction ≠ epistemic truth/);
  assert.match(firewalls,/Institutional condemnation ≠ empirical demonstration/);
  assert.match(firewalls,/Power can constrain inquiry conditions without becoming identical to evidential warrant/);
});

test('Galileo context recovery returns whole temporal local and FSP orientation',()=>{
  const c=recoverInquiryContext({
    caseId:'GALILEO-COPERNICAN',
    chapterId:'CH4-DIACHRONIC-FORMALISM',
    sectionId:'CH4.7',
    stateId:'G2'
  });
  assert.match(c.wholeProblem,/observations, changing standards of demonstration/i);
  assert.match(c.temporalLocation,/1613/);
  assert.match(c.localProblem,/G0→G3|different dimensions/i);
  assert.match(c.fspContribution,/evidential|semantic|standing|power/i);
  assert.equal(c.wholeInquiryHref,'#/narrative/GALILEO-COPERNICAN');
});

test('narrativeForCase supports both certified whole-inquiry spines',()=>{
  assert.equal(narrativeForCase('NEPTUNE-VULCAN').caseId,'NEPTUNE-VULCAN');
  assert.equal(narrativeForCase('GALILEO-COPERNICAN').caseId,'GALILEO-COPERNICAN');
});
