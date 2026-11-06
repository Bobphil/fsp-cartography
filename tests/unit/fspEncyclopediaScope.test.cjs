const test=require('node:test');
const assert=require('node:assert/strict');
const {
  ENCYCLOPEDIA_SCOPE,
  ENCYCLOPEDIA_DOMAINS,
  ENCYCLOPEDIA_ROUTES,
  RESOURCE_DEPTHS,
  CANONICAL_OWNERSHIP,
  domainFor,
  routesForDomain,
  validateEncyclopediaScope
}=require('../../dist/research/fspEncyclopediaScope.js');

test('Encyclopedia scope validates',()=>{
  const r=validateEncyclopediaScope();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('scope is broader than scientific inquiry',()=>{
  assert.ok(ENCYCLOPEDIA_DOMAINS.some(d=>d.domainId==='SCIENCE-INQUIRY'));
  assert.ok(ENCYCLOPEDIA_DOMAINS.some(d=>d.domainId==='ETHICS'));
  assert.ok(ENCYCLOPEDIA_DOMAINS.some(d=>d.domainId==='HISTORY-PHILOSOPHY'));
  assert.ok(ENCYCLOPEDIA_DOMAINS.some(d=>d.domainId==='LOGIC-ARGUMENT'));
  assert.ok(ENCYCLOPEDIA_DOMAINS.some(d=>d.domainId==='AESTHETICS'));
});

test('science is mature without becoming philosophically privileged',()=>{
  assert.equal(domainFor('SCIENCE-INQUIRY').maturity,'ACTIVE-MATURE');
  assert.ok(ENCYCLOPEDIA_SCOPE.governance.some(x=>x.includes("production maturity")));
});

test('shared grammar does not imply shared ontology',()=>{
  assert.ok(ENCYCLOPEDIA_SCOPE.governance.some(x=>x.includes('Shared FSP grammar does not imply shared domain ontology')));
  assert.notDeepEqual(domainFor('ETHICS').nativeTopology,domainFor('SCIENCE-INQUIRY').nativeTopology);
  assert.notDeepEqual(domainFor('LOGIC-ARGUMENT').nativeTopology,domainFor('AESTHETICS').nativeTopology);
});

test('resource depths are QUICK STANDARD DEEP and cannot mutate semantics',()=>{
  assert.deepEqual(RESOURCE_DEPTHS.map(x=>x.depth),['QUICK','STANDARD','DEEP']);
  for(const d of RESOURCE_DEPTHS){
    assert.ok(d.mayNotChange.includes('canonical identity'));
    assert.ok(d.mayNotChange.includes('claim ceiling'));
  }
});

test('routes are projections/selections rather than canonical ownership',()=>{
  const ethics=ENCYCLOPEDIA_ROUTES.find(r=>r.routeId==='ROUTE-ETHICS-COURSE');
  assert.match(ethics.rule,/route through canonical resources/i);
  const science=ENCYCLOPEDIA_ROUTES.find(r=>r.routeId==='ROUTE-SCIENCE-ENCYCLOPEDIA');
  assert.match(science.rule,/does not define the scope of the whole Encyclopedia/i);
});

test('shared Aristotle historical master is reusable across multiple domains',()=>{
  const a=CANONICAL_OWNERSHIP.find(o=>o.resourceId==='HIST:ARISTOTLE');
  assert.equal(a.ownerKind,'SHARED-HISTORICAL');
  assert.ok(a.reusableAcross.includes('ETHICS'));
  assert.ok(a.reusableAcross.includes('LOGIC-ARGUMENT'));
  assert.ok(a.reusableAcross.includes('AESTHETICS'));
  assert.match(a.rule,/apertures|overlays/i);
});

test('domain route lookup supports cross-domain books and corridors',()=>{
  const hist=routesForDomain('HISTORY-PHILOSOPHY').map(r=>r.routeId);
  assert.ok(hist.includes('ROUTE-HISTORY-PHILOSOPHY'));
  assert.ok(hist.includes('ROUTE-ETHICS-HISTORY'));
  assert.ok(hist.includes('ROUTE-TRANSFORMATION-CORRIDOR'));
});

test('public identity is explicitly multi-domain',()=>{
  assert.match(ENCYCLOPEDIA_SCOPE.publicIdentity,/human inquiry, judgment, interpretation, action, and institutions/i);
  assert.doesNotMatch(ENCYCLOPEDIA_SCOPE.publicIdentity,/scientific inquiry only/i);
});
