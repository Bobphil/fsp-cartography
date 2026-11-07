
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const model=require("../../dist/research/encyclopediaProd3Model.js");
const registry=JSON.parse(fs.readFileSync(path.join(__dirname,"../../site/encyclopedia-registry.json"),"utf8"));

test("PROD-3 registry has frozen Wave-1 populations",()=>{
  assert.equal(registry.nodes.filter(x=>x.family==="CT").length,10);
  assert.equal(registry.nodes.filter(x=>x.family==="FSP").length,10);
  assert.equal(registry.tools.length,12);
  assert.equal(registry.failures.length,16);
  assert.equal(registry.cases.length,5);
  assert.equal(registry.claimCeilings.length,12);
  assert.deepEqual(model.validateRegistry(registry),[]);
});

test("failure atlas routes to primary Tool and exact return restores prior contexts",()=>{
  let s=model.initialReaderState();
  s=model.openFailure(s,"CT-F03");
  assert.equal(s.current.id,"CT-F03");
  s=model.openToolFromFailure(s,registry,"CT-F03");
  assert.equal(s.current.id,"CT-T02");
  s=model.back(s);assert.equal(s.current.id,"CT-F03");
  s=model.back(s);assert.equal(s.current.id,"CT-00");
});

test("case to probe to sources preserves exact return stack",()=>{
  let s=model.initialReaderState();
  s=model.openCase(s,"CASE-SCI-05");
  s=model.openProbe(s,registry,"CASE-SCI-05","D-PROBE-FULLSHAPE");
  s=model.openSources(s,registry,"CASE-SCI-05");
  assert.equal(s.current.kind,"SOURCES");
  assert.equal(s.stack.length,3);
  s=model.back(s);assert.equal(s.current.id,"D-PROBE-FULLSHAPE");
  s=model.back(s);assert.equal(s.current.id,"CASE-SCI-05");
});

test("claim ceilings are first-class routed objects",()=>{
  let s=model.initialReaderState();
  s=model.openClaimCeiling(s,registry,"CE-04","CASE-SCI-05");
  assert.equal(s.current.kind,"CLAIM_CEILING");
  assert.equal(s.current.id,"CE-04");
  assert.equal(s.current.caseId,"CASE-SCI-05");
});

test("all case sources and claim ceilings resolve",()=>{
  const src=new Set(registry.sources.map(x=>x.id));
  const ce=new Set(registry.claimCeilings.map(x=>x.id));
  for(const c of registry.cases){
    for(const id of c.sourceIds)assert.ok(src.has(id),c.id+" source "+id);
    for(const id of c.claimCeilingIds)assert.ok(ce.has(id),c.id+" ceiling "+id);
  }
});

test("DESI is explicitly diachronic through 2026",()=>{
  const d=registry.cases.find(x=>x.id==="CASE-SCI-05");
  assert.deepEqual(d.states.map(x=>x.id),["D0","D1","D2"]);
  assert.match(d.states[2].text,/2026|Lyman-alpha|ΛCDM/);
  assert.equal(d.status,"ACTIVE_CONTEMPORARY_DOSSIER");
});

test("pending source ledgers fail closed rather than inventing provenance",()=>{
  const f=registry.cases.find(x=>x.id==="CASE-SCI-01");
  assert.equal(f.sourceIds.length,0);
  assert.equal(f.sourceStatus,"PENDING_FULL_LEDGER");
});
