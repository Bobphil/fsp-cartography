const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { InteractionController } = require('../../dist/interaction/controller.js');
const { presentView } = require('../../dist/interaction/presenter.js');
const { validateInvariants } = require('../../dist/kernel/invariants.js');

class RecordingPersistence {
  constructor(){ this.saved=[]; }
  save(state){ this.saved.push(JSON.parse(JSON.stringify(state))); }
  load(){ return null; }
  clear(){}
}

const VIEW_ORDER=['START','PEOPLE','INSTITUTION','HSF','CONNECTIONS','INVESTIGATE','RETURN'];

function traverse(controller){
  const versions=[];
  for(const view of VIEW_ORDER){
    const before=controller.getState().version;
    controller.navigate(view);
    const state=controller.getState();
    versions.push({view,before,after:state.version});
    assert.equal(state.currentView,view);
    assert.deepEqual(validateInvariants(state),[]);
    assert.equal(state.version,before);
    const vm=presentView(state);
    assert.equal(vm.id,view);
  }
  return versions;
}

test('Maya seven-view continuity preserves provenance, evolving relevance, unranked possibility, and bounded return', () => {
  const persistence=new RecordingPersistence();
  const c=new InteractionController(createInitialState('maya-e2e'),persistence);

  c.setTask('FORMED','Which healthcare paths should I investigate before making a larger educational commitment?');
  c.addSelf('Maya',['S']);
  c.addOther('Mother',['S']);
  const maya=c.getState().nodes.find(n=>n.nodeType==='SELF_PRF');
  const mother=c.getState().nodes.find(n=>n.nodeType==='MY_MAP_OF_OTHER');

  c.addPersonClaim(mother.id,'Mom wants me to become a nurse.','USER_INFERENCE',['S']);
  c.addPersonClaim(mother.id,"I don't want you spending ten years in school and ending up with huge debt.",'OTHER_REPORT',['S']);
  const inference=c.getState().claims.find(x=>x.claimType==='USER_INFERENCE');
  const report=c.getState().claims.find(x=>x.claimType==='OTHER_REPORT');

  c.addInstitution('Harbor Community College',['S','F']);
  c.addConstraint('Medical school is financially impossible','UNKNOWN','UNKNOWN','physician path');

  c.setHSF('NODE',mother.id,['H','S','F']);
  const motherAfter=c.getState().nodes.find(n=>n.id===mother.id);
  assert.equal(motherAfter.id,mother.id);
  assert.deepEqual(motherAfter.hsf,['H','S','F']);
  assert.equal(c.getState().claims.find(x=>x.id===inference.id).claimType,'USER_INFERENCE');
  assert.equal(c.getState().claims.find(x=>x.id===report.id).claimType,'OTHER_REPORT');

  c.addConnection(mother.id,maya.id,'AFFECTS','Family concern affects the current decision');
  c.setSharedTask('CONFIRMED',[maya.id,mother.id],'Clarify actual training and financial concerns',['Agreement on final profession']);

  const constraintId=c.getState().constraints[0].id;
  c.addPath('Physician','EXPLORATORY',['actual cost'],[constraintId]);
  c.addPath('Registered Nurse','EXPLORATORY',[],[]);
  c.addPath('Physician Assistant','EXPLORATORY',[],[]);
  c.addInquiryAction('Meet a healthcare adviser');
  c.addInquiryAction('Shadow or interview two healthcare professionals');

  const actionIds=c.getState().actions.map(a=>a.id);
  c.addBoundedReturn(
    'INVESTIGATE',
    'Healthcare remains a serious direction.',
    'Choosing what to investigate next, not a final career.',
    'I still need direct experience and verified financial information.',
    actionIds,
    'After direct occupational exposure or verified financial information',
    'I am not choosing a final profession.'
  );

  traverse(c);
  const s=c.getState();

  assert.equal(s.claims.find(x=>x.id===inference.id).claimType,'USER_INFERENCE');
  assert.equal(s.claims.find(x=>x.id===report.id).claimType,'OTHER_REPORT');
  assert.equal(s.constraints[0].epistemicStatus,'UNKNOWN');
  assert.equal(s.paths.length,3);
  assert.ok(s.paths.every(p=>p.origin==='USER' && p.acceptedIntoMap));
  assert.equal(s.sharedTasks[0].outsideScope[0],'Agreement on final profession');
  assert.equal(s.returns[0].returnType,'INVESTIGATE');
  assert.equal(s.outputCards[0].claimCeiling,'Choosing what to investigate next, not a final career.');
  assert.ok(s.outputCards[0].reopenCondition);
  assert.ok(!s.paths.some(p=>'score' in p || 'probability' in p || 'recommendation' in p));
});

test('Leila seven-view continuity preserves practical power without authority or manufactured cooperation', () => {
  const c=new InteractionController(createInitialState('leila-e2e'),new RecordingPersistence());

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

  const constraintId=c.getState().constraints[0].id;
  c.addPath('Art/design with alternative financing','CONDITIONAL',['whether financing is viable'],[constraintId]);
  c.addInquiryAction('Investigate alternative financing and part-time routes');
  const actionId=c.getState().actions[0].id;

  c.addBoundedReturn(
    'UNRESOLVED',
    'The current funding condition constrains this route but does not settle my career.',
    'This identifies a current funding constraint, not authority over my career choice.',
    'Whether an alternative route is viable remains unresolved.',
    [actionId],
    'After verified alternative-financing information',
    'I am not treating financial leverage as moral or decision authority.'
  );

  traverse(c);
  const s=c.getState();

  assert.ok(s.connections.some(x=>x.connectionType==='PRACTICAL_POWER'));
  assert.ok(!s.connections.some(x=>x.connectionType==='AUTHORITY' && x.sourceId===father.id));
  assert.equal(s.constraints[0].epistemicStatus,'VERIFIED');
  assert.equal(s.constraints[0].rigidity,'HARD_CURRENTLY');
  assert.equal(s.constraints[0].scope,'current funding source only');
  assert.equal(s.sharedTasks[0].status,'NONE_IDENTIFIED');
  assert.equal(s.returns[0].returnType,'UNRESOLVED');
  assert.match(s.outputCards[0].claimCeiling,/not authority/i);
});

test('Jordan seven-view continuity permits sparse states and an unformed task without recommendation', () => {
  const c=new InteractionController(createInitialState('jordan-e2e'),new RecordingPersistence());

  c.setTask('UNFORMED','education/work');
  c.addSelf('Jordan',['S']);
  c.addOther('Brother',['H']);
  const brother=c.getState().nodes.find(n=>n.nodeType==='MY_MAP_OF_OTHER');
  c.addPersonClaim(brother.id,'College was a waste of time for me.','OTHER_REPORT',['H']);

  c.addInquiryAction('Visit a technical program');
  c.addInquiryAction('Talk with career services about short credentials and transfer routes');
  const actionIds=c.getState().actions.map(a=>a.id);

  c.addBoundedReturn(
    'INVESTIGATE',
    'I still do not know what career I want, but I know what I want to explore next.',
    'This identifies next inquiry moves, not a career recommendation.',
    'My longer-term direction remains open.',
    actionIds,
    '',
    'I am not claiming a best-fit career.'
  );

  traverse(c);
  const s=c.getState();

  assert.equal(s.task.status,'UNFORMED');
  assert.equal(s.constraints.length,0);
  assert.equal(s.connections.length,0);
  assert.equal(s.sharedTasks.length,0);
  assert.equal(s.paths.length,0);
  assert.equal(s.returns[0].returnType,'INVESTIGATE');
  assert.ok(!s.claims.some(c=>/should become|best career|fit/i.test(c.text)));
  assert.match(s.outputCards[0].claimCeiling,/not a career recommendation/);
});

test('seven-view continuity: navigation itself never mutates the substantive map', () => {
  const c=new InteractionController(createInitialState('nav-continuity'),new RecordingPersistence());
  c.setTask('UNFORMED','orientation');
  c.addSelf('Self',['S']);
  const before=JSON.parse(JSON.stringify(c.getState()));
  traverse(c);
  const after=c.getState();

  assert.equal(after.version,before.version);
  assert.deepEqual(after.nodes,before.nodes);
  assert.deepEqual(after.claims,before.claims);
  assert.deepEqual(after.constraints,before.constraints);
  assert.deepEqual(after.paths,before.paths);
  assert.deepEqual(after.actions,before.actions);
});

test('seven-view continuity: sparse views remain presentable rather than requiring fabricated content', () => {
  const c=new InteractionController(createInitialState('sparse-continuity'),new RecordingPersistence());
  c.setTask('UNFORMED','orientation');
  c.addSelf('Self',['S']);

  for(const view of ['INSTITUTION','CONNECTIONS','INVESTIGATE']){
    c.navigate(view);
    const vm=presentView(c.getState());
    assert.equal(vm.id,view);
    assert.ok(vm.sections.length>0);
  }
  assert.equal(c.getState().constraints.length,0);
  assert.equal(c.getState().connections.length,0);
  assert.equal(c.getState().paths.length,0);
});

test('seven-view continuity: HSF reassignment changes relevance while preserving provenance and identity', () => {
  const c=new InteractionController(createInitialState('hsf-continuity'),new RecordingPersistence());
  c.addOther('Mother',['S']);
  const mother=c.getState().nodes[0];
  c.addPersonClaim(mother.id,'A direct report.','OTHER_REPORT',['S']);
  const claim=structuredClone(c.getState().claims[0]);

  c.setHSF('CLAIM',claim.id,['H','S','F']);
  const after=c.getState().claims[0];

  assert.equal(after.id,claim.id);
  assert.equal(after.text,claim.text);
  assert.equal(after.claimType,'OTHER_REPORT');
  assert.equal(after.verification,claim.verification);
  assert.equal(after.privacy,claim.privacy);
  assert.deepEqual(after.hsf,['H','S','F']);
});

test('seven-view continuity: Return links backward to existing inquiry actions rather than inventing new ones', () => {
  const c=new InteractionController(createInitialState('return-links'),new RecordingPersistence());
  c.setTask('FORMED','What should I investigate?');
  c.addInquiryAction('Gather one source');
  c.addInquiryAction('Talk with one participant');
  const ids=c.getState().actions.map(a=>a.id);
  c.addBoundedReturn('INVESTIGATE','Investigate next.','Only a next-step judgment.','',ids);
  const ret=c.getState().returns[0];
  const out=c.getState().outputCards[0];
  assert.deepEqual(ret.nextActionIds,ids);
  assert.deepEqual(out.nextActions,['Gather one source','Talk with one participant']);
  assert.ok(ids.every(id=>c.getState().actions.some(a=>a.id===id)));
});
