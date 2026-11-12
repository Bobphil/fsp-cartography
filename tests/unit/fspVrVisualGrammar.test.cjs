const test=require('node:test');
const assert=require('node:assert/strict');
const {
  MAATHAI_1976_VISUAL_FIELD,
  validateVisualScene,
  scaffoldView,
  visiblePossibilityField,
  provenanceForElement
}=require('../../dist/research/fspVrVisualGrammar.js');

test('Maathai 1976 visual field passes first-wave visual grammar invariants',()=>{
  const r=validateVisualScene(MAATHAI_1976_VISUAL_FIELD);
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('possibility field resists singular outcome prediction',()=>{
  const paths=visiblePossibilityField(MAATHAI_1976_VISUAL_FIELD);
  assert.ok(paths.length>=3);
  assert.ok(new Set(paths.map(p=>p.family)).size>=3);
  assert.ok(paths.some(p=>p.family==='WAIT_GATHER'));
  assert.ok(paths.every(p=>p.recommendation===false));
  assert.ok(paths.every(p=>p.historicalOutcomeHidden===true));
});

test('capability paths and authorization gates remain distinct',()=>{
  const field=MAATHAI_1976_VISUAL_FIELD;
  const advocacy=field.paths.find(p=>p.id==='P-ADVOCATE');
  const gate=field.gates.find(g=>g.requiredByPathIds.includes('P-ADVOCATE'));
  assert.equal(advocacy.state,'CONDITIONAL');
  assert.equal(gate.state,'NO_AUTHORITY');
});

test('visual grammar preserves explicit remainder',()=>{
  const field=MAATHAI_1976_VISUAL_FIELD;
  assert.ok(field.remainders.some(r=>r.type==='UNKNOWN_MOTIVE'));
  assert.ok(field.remainders.some(r=>r.type==='MISSING_SOURCE'));
  assert.ok(field.remainders.some(r=>r.type==='UNOBSERVED_CONSEQUENCE'));
});

test('future historical outcomes remain outside the current possibility horizon',()=>{
  const field=MAATHAI_1976_VISUAL_FIELD;
  assert.ok(field.horizon.hiddenOutcomeIds.includes('FUTURE'));
  assert.equal(field.horizon.historicalRevealAllowed,false);
});

test('provenance is recoverable for reconstructed paths and source-grounded relations',()=>{
  const pathProv=provenanceForElement(MAATHAI_1976_VISUAL_FIELD,'P-EXPERIMENT');
  assert.ok(pathProv.some(p=>p.sourceClass==='FSP_INFERENCE'));
  const relationProv=provenanceForElement(MAATHAI_1976_VISUAL_FIELD,'R2');
  assert.ok(relationProv.some(p=>p.sourceId==='WM-S01'));
});

test('scaffold fading removes assistance without removing the field semantics',()=>{
  const strong=scaffoldView(MAATHAI_1976_VISUAL_FIELD,3);
  const moderate=scaffoldView(MAATHAI_1976_VISUAL_FIELD,2);
  const thin=scaffoldView(MAATHAI_1976_VISUAL_FIELD,1);
  const off=scaffoldView(MAATHAI_1976_VISUAL_FIELD,0);
  assert.equal(strong.showExampleFamilies,true);
  assert.equal(moderate.showTypedRelations,true);
  assert.equal(thin.showPaths,true);
  assert.equal(off.showReturnOnly,true);
  assert.equal(off.showPaths,false);
});

test('navigational reconstruction is explicitly marked where spatialization is invented',()=>{
  const field=MAATHAI_1976_VISUAL_FIELD;
  assert.ok(field.loci.some(l=>l.navigationalReconstruction));
  assert.ok(field.institutions.some(i=>i.provenance.some(p=>p.sourceClass==='NAVIGATIONAL_RECONSTRUCTION')));
});

test('Return and OFF remain constitutional requirements',()=>{
  const field=MAATHAI_1976_VISUAL_FIELD;
  assert.ok(field.returnPrompts.length>=4);
  assert.equal(field.offAvailable,true);
});
