
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
  s=model.back(s);assert.equal(s.current.id,"FSP-HOME");
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

test("scientific atlas index exposes all five cases",()=>{
  const atlas=registry.nodes.find(x=>x.id==="SCI-ATLAS");
  assert.ok(atlas);
  assert.deepEqual(atlas.relatedIds,["CASE-SCI-01","CASE-SCI-02","CASE-SCI-03","CASE-SCI-04","CASE-SCI-05"]);
  for(const id of atlas.relatedIds)assert.ok(registry.cases.some(c=>c.id===id),id);
});

test("twelve tools index exposes all canonical tools",()=>{
  const idx=registry.nodes.find(x=>x.id==="CT-TOOLS");
  assert.ok(idx);
  assert.equal(idx.relatedIds.length,12);
  assert.deepEqual(idx.relatedIds,[
    "CT-T01","CT-T02","CT-T03","CT-T04","CT-T05","CT-T06",
    "CT-T07","CT-T08","CT-T09","CT-T10","CT-T11","CT-T12"
  ]);
  for(const id of idx.relatedIds)assert.ok(registry.tools.some(t=>t.id===id),id);
});

test("tool index supports human-readable titles and functions",()=>{
  const idx=registry.nodes.find(x=>x.id==="CT-TOOLS");
  for(const id of idx.relatedIds){
    const tool=registry.tools.find(t=>t.id===id);
    assert.ok(tool);
    assert.ok(tool.title && tool.title.length>3);
    assert.ok(tool.function && tool.function.length>10);
  }
});

test("top-level indexes expose human-readable canonical entries",()=>{
  const home=registry.nodes.find(x=>x.id==="CT-HOME");
  const con=registry.nodes.find(x=>x.id==="FSP-CONSTITUTION");
  const fail=registry.nodes.find(x=>x.id==="CT-FAILURES");
  assert.equal(home.relatedIds.length,10);
  assert.equal(con.relatedIds.length,10);
  assert.equal(fail.relatedIds.length,16);
  for(const id of home.relatedIds){const n=registry.nodes.find(x=>x.id===id);assert.ok(n?.title&&n?.summary);}
  for(const id of con.relatedIds){const n=registry.nodes.find(x=>x.id===id);assert.ok(n?.title&&n?.canonicalClaim);}
  for(const id of fail.relatedIds){const f=registry.failures.find(x=>x.id===id);assert.ok(f?.title&&f?.symptom&&f?.diagnosticQuestion);}
});


test("startup opens universal Encyclopedia Home rather than Critical Thinking",()=>{
  const s=model.initialReaderState();
  assert.equal(s.current.kind,"NODE");
  assert.equal(s.current.id,"FSP-HOME");
  const home=registry.nodes.find(x=>x.id==="FSP-HOME");
  assert.ok(home);
  assert.deepEqual(home.relatedIds,["FSP-DOMAINS","FSP-CONSTITUTION","FSP-RESOURCES","FSP-ROUTES","FSP-ABOUT","FSP-WHY"]);
});


test("three-depth FSP synthesis routes resolve",()=>{
  const ids=["FSP-WHY","FSP-JTS","FSP-TRANSLATION"];
  for(const id of ids){
    const n=registry.nodes.find(x=>x.id===id);
    assert.ok(n,id);
    assert.ok(n.title.length>5);
    assert.ok(n.summary.length>20);
  }
  const home=registry.nodes.find(x=>x.id==="FSP-HOME");
  assert.ok(home.relatedIds.includes("FSP-WHY"));
});


test("universal Encyclopedia information architecture resolves",()=>{
  const ids=["FSP-DOMAINS","FSP-CONSTITUTION","FSP-RESOURCES","FSP-ROUTES","FSP-ABOUT","FSP-WHY"];
  for(const id of ids)assert.ok(registry.nodes.some(x=>x.id===id),id);
  const domains=registry.nodes.find(x=>x.id==="FSP-DOMAINS");
  assert.equal(domains.relatedIds.length,8);
  for(const id of domains.relatedIds)assert.ok(registry.nodes.some(x=>x.id===id),id);
});


test("Florida nursing-home Joint Task Space pilot resolves",()=>{
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  assert.ok(p);
  assert.equal(p.family,"PILOT");
  assert.ok(p.relatedIds.includes("FSP-JTS"));
  assert.ok(p.relatedIds.includes("FSP-TRANSLATION"));
  assert.ok(p.claimCeilingIds.includes("CE-10"));
});


test("Gulf Pines four-state progression resolves",()=>{
  const ids=["FSP-JTS-FLNH-S0","FSP-JTS-FLNH-S1","FSP-JTS-FLNH-S2","FSP-JTS-FLNH-S3"];
  for(const id of ids){
    const n=registry.nodes.find(x=>x.id===id);
    assert.ok(n,id);
    assert.equal(n.family,"JTS_STATE");
    assert.ok(n.canonicalClaim.length>10);
  }
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  for(const id of ids)assert.ok(p.relatedIds.includes(id),id);
});


test("Gulf Pines Layer 2 standing and authorization resolves",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH-STANDING");
  assert.ok(n);
  assert.equal(n.family,"JTS_LAYER");
  assert.ok(n.relatedIds.includes("FSP-JTS-FLNH-S2"));
  assert.ok(n.claimCeilingIds.includes("CE-06"));
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  assert.ok(p.relatedIds.includes("FSP-JTS-FLNH-STANDING"));
});


test("Gulf Pines Layer 3 translation and remainder resolves",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH-TRANSLATION");
  assert.ok(n);
  assert.equal(n.family,"JTS_LAYER");
  assert.ok(n.relatedIds.includes("FSP-TRANSLATION"));
  assert.ok(n.claimCeilingIds.includes("CE-12"));
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  assert.ok(p.relatedIds.includes("FSP-JTS-FLNH-TRANSLATION"));
});


test("Gulf Pines Layer 4 repair strategy and sequencing resolves",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH-REPAIR");
  assert.ok(n);
  assert.equal(n.family,"JTS_LAYER");
  assert.ok(n.relatedIds.includes("FSP-JTS-FLNH-S2"));
  assert.ok(n.relatedIds.includes("FSP-JTS-FLNH-TRANSLATION"));
  assert.ok(n.claimCeilingIds.includes("CE-06"));
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  assert.ok(p.relatedIds.includes("FSP-JTS-FLNH-REPAIR"));
});


test("Gulf Pines Layer 5 institutional amplification resolves",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH-INSTITUTIONAL");
  assert.ok(n);
  assert.equal(n.family,"JTS_LAYER");
  assert.ok(n.relatedIds.includes("FSP-JTS-FLNH-REPAIR"));
  assert.ok(n.relatedIds.includes("DOMAIN-INSTITUTIONS-CONNECTED-DOING"));
  assert.ok(n.claimCeilingIds.includes("CE-12"));
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  assert.ok(p.relatedIds.includes("FSP-JTS-FLNH-INSTITUTIONAL"));
});


test("Gulf Pines five-layer integration resolves",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH-INTEGRATION");
  assert.ok(n);
  assert.equal(n.family,"JTS_INTEGRATION");
  for(const id of [
    "FSP-JTS-FLNH-S2",
    "FSP-JTS-FLNH-STANDING",
    "FSP-JTS-FLNH-TRANSLATION",
    "FSP-JTS-FLNH-REPAIR",
    "FSP-JTS-FLNH-INSTITUTIONAL",
    "FSP-JTS-FLNH-S3"
  ]) assert.ok(n.relatedIds.includes(id),id);
  const p=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH");
  assert.ok(p.relatedIds.includes("FSP-JTS-FLNH-INTEGRATION"));
});


test("FSP JTS integration gate provisional freeze resolves",()=>{
  const gate=registry.nodes.find(x=>x.id==="FSP-JTS-INTEGRATION-GATE-1");
  assert.ok(gate);
  assert.equal(gate.family,"JTS_GATE");
  assert.equal(gate.status,"PROVISIONAL_FREEZE_PASS");
  for(const id of [
    "FSP-JTS-FLNH",
    "FSP-JTS-FLNH-INTEGRATION",
    "FSP-JTS-FLNH-STANDING",
    "FSP-JTS-FLNH-TRANSLATION",
    "FSP-JTS-FLNH-REPAIR",
    "FSP-JTS-FLNH-INSTITUTIONAL"
  ]) assert.ok(gate.relatedIds.includes(id),id);
  assert.ok(gate.claimCeilingIds.includes("CE-12"));
});

test("JTS freeze preserves five-layer canonical ownership",()=>{
  const ownership={
    "FSP-JTS-FLNH-S2":"JTS_STATE",
    "FSP-JTS-FLNH-STANDING":"JTS_LAYER",
    "FSP-JTS-FLNH-TRANSLATION":"JTS_LAYER",
    "FSP-JTS-FLNH-REPAIR":"JTS_LAYER",
    "FSP-JTS-FLNH-INSTITUTIONAL":"JTS_LAYER",
    "FSP-JTS-FLNH-INTEGRATION":"JTS_INTEGRATION"
  };
  for(const [id,family] of Object.entries(ownership)){
    const n=registry.nodes.find(x=>x.id===id);
    assert.ok(n,id);
    assert.equal(n.family,family,id);
  }
});

test("JTS freeze preserves Return routes through registry relations",()=>{
  const integration=registry.nodes.find(x=>x.id==="FSP-JTS-FLNH-INTEGRATION");
  assert.ok(integration.relatedIds.includes("FSP-JTS-FLNH"));
  const gate=registry.nodes.find(x=>x.id==="FSP-JTS-INTEGRATION-GATE-1");
  assert.ok(gate.relatedIds.includes("FSP-JTS-FLNH-INTEGRATION"));
});


test("Asteria Joint Task Space comparator resolves",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-COMPARATOR-1");
  assert.ok(n);
  assert.equal(n.family,"JTS_COMPARATOR");
  assert.equal(n.status,"COMPARATOR_PASS_WITH_PRESSURE");
  assert.ok(n.relatedIds.includes("FSP-JTS-FLNH-INTEGRATION"));
  assert.ok(n.relatedIds.includes("FSP-JTS-INTEGRATION-GATE-1"));
  assert.ok(n.claimCeilingIds.includes("CE-04"));
});

test("Asteria comparator preserves five-layer baseline without sixth layer",()=>{
  const n=registry.nodes.find(x=>x.id==="FSP-JTS-COMPARATOR-1");
  assert.ok(/five-layer/i.test(n.summary));
  assert.ok(/sixth layer/i.test(n.canonicalClaim));
});
