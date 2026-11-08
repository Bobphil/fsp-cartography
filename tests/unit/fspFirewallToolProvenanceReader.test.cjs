const test=require('node:test');
const assert=require('node:assert/strict');

const {
  FIREWALL_PROVENANCE,
  EVIDENCE_LABELS,
  PROVENANCE_READER_STEPS,
  evidenceLabels,
  provenanceEntry,
  validateFirewallProvenance
}=require('../../dist/research/fspFirewallToolProvenanceReader.js');

test('provenance reader contains 26 unique validated Firewalls',()=>{
  assert.equal(FIREWALL_PROVENANCE.length,26);
  assert.deepEqual(validateFirewallProvenance(),[]);
  assert.equal(new Set(FIREWALL_PROVENANCE.map(x=>x.key)).size,26);
});

test('every Firewall preserves the full provenance contract',()=>{
  for(const x of FIREWALL_PROVENANCE){
    assert.match(x.key,/^FW-\d{2}$/);
    assert.match(x.label,/≠/);
    assert.ok(x.protectedTransition.length>5,x.key);
    assert.ok(x.recurrentFailure.length>10,x.key);
    assert.ok(x.lineage.length>0,x.key);
    assert.ok(x.crossingWarrant.length>0,x.key);
    assert.ok(x.tool.length>3,x.key);
    assert.ok(x.cases.length>0,x.key);
    assert.ok(x.formalImplementation.length>0,x.key);
    assert.ok(x.evidence.length>0,x.key);
    assert.ok(x.claimCeiling.length>10,x.key);
    assert.ok(x.failureConditions.length>0,x.key);
    assert.ok(x.reopenTriggers.length>0,x.key);
    assert.ok(x.canonicalSources.length>0,x.key);
  }
});

test('evidence state labels preserve validation boundaries',()=>{
  assert.equal(EVIDENCE_LABELS.H,'Historical / philosophical recurrence');
  assert.equal(EVIDENCE_LABELS.X,'Executable / formal implementation');
  assert.equal(EVIDENCE_LABELS.P,'Protocol-ready human test');
  assert.equal(EVIDENCE_LABELS.E,'External empirical support');
  const fw14=provenanceEntry('FW-14');
  assert.ok(evidenceLabels(fw14).some(x=>x.startsWith('P —')));
  assert.equal(fw14.evidence.includes('E'),false);
});

test('reader route follows provenance contract through Return',()=>{
  assert.deepEqual(PROVENANCE_READER_STEPS.map(x=>x.id),[
    'WHY','LINEAGE','WARRANT','TOOL','CASE','FORMAL','EVIDENCE','CEILING','REOPEN','RETURN'
  ]);
});

test('self-governance Firewall keeps FSP corrigible',()=>{
  const x=provenanceEntry('FW-26');
  assert.match(x.label,/FSP map/);
  assert.match(x.claimCeiling,/universal validity|empirical superiority/i);
  assert.ok(x.reopenTriggers.some(r=>/domain failure|empirical harm|formalism capture/i.test(r)));
});

test('translation Firewall does not promote task success to identity',()=>{
  const x=provenanceEntry('FW-19');
  assert.match(x.claimCeiling,/Task success.*identity|ontological uniqueness/i);
  assert.ok(x.evidence.includes('P'));
  assert.equal(x.evidence.includes('E'),false);
});
