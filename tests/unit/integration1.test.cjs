const test=require('node:test');
const assert=require('node:assert/strict');

const {
  REVISION_TO_CARTOGRAPHY_CROSSWALK,
  placementsForRevision,
  placementsForView,
  humanFacingPlacements,
  researchOnlyPlacements,
  auditKernelChangeGate,
  humanVocabularyLeaks,
  integrationCoverage
}=require('../../dist/research/integration1.js');

const { createInitialState }=require('../helpers.cjs');
const { InteractionController }=require('../../dist/interaction/controller.js');
const { presentView }=require('../../dist/interaction/presenter.js');

class MemoryPersistence{
  save(){}
  load(){return null;}
  clear(){}
}

const VIEW_ORDER=['START','PEOPLE','INSTITUTION','HSF','CONNECTIONS','INVESTIGATE','RETURN'];

function collectVisibleText(vm){
  return [
    vm.label,
    vm.purpose,
    vm.taskLine,
    ...vm.sections.flatMap(s=>[
      s.title,
      s.emptyText,
      ...s.items.flatMap(i=>[i.heading,i.detail||'',i.meta||''])
    ])
  ];
}

function traverseNoResearchVocabulary(controller){
  for(const view of VIEW_ORDER){
    controller.navigate(view);
    const vm=presentView(controller.getState());
    assert.deepEqual(
      humanVocabularyLeaks(collectVisibleText(vm)),
      [],
      `research vocabulary leaked in ${view}`
    );
  }
}

test('crosswalk covers every REVISION-1 through REVISION-12 module',()=>{
  for(let i=1;i<=12;i++){
    assert.ok(placementsForRevision(`FSP-REVISION-${i}`).length>0);
  }
});

test('crosswalk covers all seven cartography views',()=>{
  for(const view of VIEW_ORDER){
    assert.ok(placementsForView(view).length>0,`missing placements for ${view}`);
  }
});

test('crosswalk preserves both human-facing and research-only layers',()=>{
  assert.ok(humanFacingPlacements().length>0);
  assert.ok(researchOnlyPlacements().length>0);
  assert.ok(REVISION_TO_CARTOGRAPHY_CROSSWALK.some(p=>
    p.classes.includes('USER_VISIBLE') &&
    p.classes.includes('HIDDEN_GOVERNANCE')
  ));
});

test('every placement has an explicit activation trigger and research detail',()=>{
  assert.ok(REVISION_TO_CARTOGRAPHY_CROSSWALK.every(p=>p.activationTrigger.trim()));
  assert.ok(REVISION_TO_CARTOGRAPHY_CROSSWALK.every(p=>p.fullResearchDetail.trim()));
});

test('every user-visible placement has ordinary-language cue unless intentionally exposure-none',()=>{
  const failures=humanFacingPlacements().filter(p=>
    p.humanExposure!=='NONE' && !p.ordinaryLanguageCue?.trim()
  );
  assert.deepEqual(failures,[]);
});

test('current kernel change gate finds no genuine representation gap',()=>{
  const gate=auditKernelChangeGate();
  assert.equal(gate.status,'NO_KERNEL_CHANGE');
  assert.deepEqual(gate.genuineRepresentationGaps,[]);
  assert.ok(gate.overlaySufficient.length>0);
});

test('integration coverage includes twelve revisions and seven views',()=>{
  const coverage=integrationCoverage();
  assert.equal(coverage.revisions.length,12);
  assert.deepEqual(coverage.views.sort(),VIEW_ORDER.slice().sort());
  assert.ok(coverage.userVisibleCount>0);
  assert.ok(coverage.hiddenCount>0);
  assert.ok(coverage.researchDetailCount>0);
});

test('Maya can traverse shell without research vocabulary exposure',()=>{
  const c=new InteractionController(createInitialState('maya-integration'),new MemoryPersistence());
  c.setTask('FORMED','Which healthcare paths should I investigate before making a larger educational commitment?');
  c.addSelf('Maya',['S']);
  c.addOther('Mother',['S']);
  const maya=c.getState().nodes.find(n=>n.nodeType==='SELF_PRF');
  const mother=c.getState().nodes.find(n=>n.nodeType==='MY_MAP_OF_OTHER');
  c.addPersonClaim(mother.id,'Mom wants me to become a nurse.','USER_INFERENCE',['S']);
  c.addPersonClaim(mother.id,"I don't want you spending ten years in school and ending up with huge debt.",'OTHER_REPORT',['S']);
  c.addInstitution('Harbor Community College',['S','F']);
  c.addConstraint('Medical school is financially impossible','UNKNOWN','UNKNOWN','physician path');
  c.addConnection(mother.id,maya.id,'AFFECTS','Family concern affects the current decision');
  c.setSharedTask('CONFIRMED',[maya.id,mother.id],'Clarify actual training and financial concerns',['Agreement on final profession']);
  c.addPath('Physician','EXPLORATORY',['actual cost'],[c.getState().constraints[0].id]);
  c.addInquiryAction('Meet a healthcare adviser');
  c.addBoundedReturn('INVESTIGATE','Healthcare remains a serious direction.','Choosing what to investigate next, not a final career.','I still need direct experience and verified financial information.',c.getState().actions.map(a=>a.id),'After direct occupational exposure or verified financial information','I am not choosing a final profession.');
  traverseNoResearchVocabulary(c);
});

test('Leila can traverse shell without research vocabulary exposure',()=>{
  const c=new InteractionController(createInitialState('leila-integration'),new MemoryPersistence());
  c.setTask('FORMED','What educational paths remain open if I pursue art/design?');
  c.addSelf('Leila',['S','F']);
  c.addOther('Father',['S','F']);
  const leila=c.getState().nodes.find(n=>n.nodeType==='SELF_PRF');
  const father=c.getState().nodes.find(n=>n.nodeType==='MY_MAP_OF_OTHER');
  c.addPersonClaim(father.id,'I will stop paying tuition if you leave nursing.','OTHER_REPORT',['S','F']);
  c.addInstitution('Current College',['S','F']);
  c.addConstraint('Current family tuition contribution ends if nursing is left','VERIFIED','HARD_CURRENTLY','current funding source only');
  c.addConnection(father.id,leila.id,'PRACTICAL_POWER','Controls current tuition contribution');
  c.setSharedTask('NONE_IDENTIFIED',[leila.id,father.id]);
  c.addInquiryAction('Investigate alternative financing and part-time routes');
  c.addBoundedReturn('UNRESOLVED','The current funding condition constrains this route but does not settle my career.','This identifies a current funding constraint, not authority over my career choice.','Whether an alternative route is viable remains unresolved.',c.getState().actions.map(a=>a.id),'After verified alternative-financing information','I am not treating financial leverage as moral or decision authority.');
  traverseNoResearchVocabulary(c);
});

test('Jordan can traverse sparse shell without research vocabulary exposure',()=>{
  const c=new InteractionController(createInitialState('jordan-integration'),new MemoryPersistence());
  c.setTask('UNFORMED','education/work');
  c.addSelf('Jordan',['S']);
  c.addOther('Brother',['H']);
  const brother=c.getState().nodes.find(n=>n.nodeType==='MY_MAP_OF_OTHER');
  c.addPersonClaim(brother.id,'College was a waste of time for me.','OTHER_REPORT',['H']);
  c.addInquiryAction('Visit a technical program');
  c.addInquiryAction('Talk with career services about short credentials and transfer routes');
  c.addBoundedReturn('INVESTIGATE','I still do not know what career I want, but I know what I want to explore next.','This identifies next inquiry moves, not a career recommendation.','My longer-term direction remains open.',c.getState().actions.map(a=>a.id),'','I am not claiming a best-fit career.');
  traverseNoResearchVocabulary(c);
});

test('research vocabulary leak detector catches formal terms when explicitly supplied',()=>{
  const leaks=humanVocabularyLeaks([
    'Run the minimal-mutilation audit and constitutional self-audit.'
  ]);
  assert.ok(leaks.includes('minimal-mutilation'));
  assert.ok(leaks.includes('constitutional self-audit'));
});

test('no placement currently requests kernel mutation',()=>{
  assert.equal(
    REVISION_TO_CARTOGRAPHY_CROSSWALK.some(p=>p.requiresKernelChange),
    false
  );
});
