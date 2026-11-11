const test=require('node:test');
const assert=require('node:assert/strict');
const {
  DOMAIN_PUBLIC_NAV,
  TOP_LEVEL_PUBLIC_NAV,
  publicDomain,
  readerStatusFor,
  validateDomainPublicNav,
  RESEARCH_PUBLIC_NAV,
  PUBLIC_RESEARCH_RESOURCES
}=require('../../dist/research/fspEncyclopediaDomainNav.js');

test('domain public navigation validates',()=>{
  const r=validateDomainPublicNav();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('top navigation is domain neutral',()=>{
  assert.deepEqual(TOP_LEVEL_PUBLIC_NAV.map(x=>x.label),['Domains','Core','Resources','Routes','About']);
  assert.equal(TOP_LEVEL_PUBLIC_NAV.some(x=>['Chapters','Cases'].includes(x.label)),false);
});

test('science preserves all existing domain-native public routes',()=>{
  const s=publicDomain('SCIENCE-INQUIRY');
  assert.deepEqual(s.nativeNavigation.map(x=>x.label),['Chapters','Cases','Concepts','Tools','Comparisons']);
  assert.deepEqual(s.nativeNavigation.map(x=>x.href),['#/chapters','#/cases','#/concepts','#/tools','#/comparisons']);
});

test('History of Philosophy has real existing Pressbook and SUPER resources',()=>{
  const h=publicDomain('HISTORY-PHILOSOPHY');
  assert.equal(h.readerStatus,'In development');
  assert.ok(h.resources.some(x=>x.href.includes('pressbooks.pub/whatmaywecarryforward')));
  assert.ok(h.resources.some(x=>x.href.includes('what-may-we-carry-forward-super')));
});

test('Ethics exposes certified SUPER and PFLAB but no unverified Pressbook',()=>{
  const e=publicDomain('ETHICS');
  assert.ok(e.resources.some(x=>x.href.includes('ethics-super-final')));
  assert.ok(e.resources.some(x=>x.href.includes('ethics-power-flourishing-lab')));
  assert.equal(e.resources.some(x=>/pressbook/i.test(x.resourceId+x.title+x.href)),false);
});

test('internal maturity codes map to reader-facing labels',()=>{
  assert.equal(readerStatusFor('ACTIVE-MATURE'),'Available now');
  assert.equal(readerStatusFor('SUBSTANTIAL-INTEGRATION-PENDING'),'In development');
  assert.equal(readerStatusFor('SCOPED'),'Planned');
  assert.equal(readerStatusFor('CROSS-DOMAIN'),'Cross-domain resource');
  assert.equal(readerStatusFor('FOUNDATIONAL'),'Foundation');
});

test('all scope domains have landing definitions',()=>{
  assert.equal(DOMAIN_PUBLIC_NAV.length,8);
  assert.ok(DOMAIN_PUBLIC_NAV.every(x=>x.summary.length>30));
});

test('planned domains do not fabricate working resources',()=>{
  assert.equal(publicDomain('AESTHETICS').resources.length,0);
  assert.equal(publicDomain('LOGIC-ARGUMENT').resources.length,0);
});

test('research navigation separates governance comparators domains and completion horizon',()=>{
  assert.ok(RESEARCH_PUBLIC_NAV.governanceCore.includes('Four-Move Governance'));
  assert.ok(RESEARCH_PUBLIC_NAV.comparators.includes('Price'));
  assert.ok(RESEARCH_PUBLIC_NAV.domainArchitectures.includes('Objective Phenomenology'));
  assert.ok(RESEARCH_PUBLIC_NAV.completionHorizon.includes('Successor Architectures'));
  assert.match(RESEARCH_PUBLIC_NAV.completionHorizonClaimCeiling,/not present theoretical completeness/i);
});

test('public research resources expose the durable 60-entry bibliography',()=>{
  const b=PUBLIC_RESEARCH_RESOURCES.find(x=>x.resourceId==='FSP-RESEARCH-BIBLIOGRAPHY-2026-11');
  assert.ok(b);
  assert.equal(b.kind,'REFERENCE');
  assert.equal(b.external,true);
  assert.match(b.title,/60 Annotated Entries/);
  assert.match(b.href,/FSP-RESEARCH-BIBLIOGRAPHY-2026-11\.md$/);
});
