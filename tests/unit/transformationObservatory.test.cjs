const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const model=require("../../dist/research/transformationObservatory.js");

test("TO1-TO9 four-case observatory validates structural invariants",()=>{
  const errors=model.validateTransformationObservatory();
  assert.deepEqual(errors,[]);
  assert.equal(model.TRANSFORMATION_OBSERVATORY_CASES.length,4);
  for(const c of model.TRANSFORMATION_OBSERVATORY_CASES){
    assert.ok(c.states.length>=4);
    assert.equal(c.transitions.length,c.states.length-1);
    for(const t of c.transitions){
      assert.ok(t.evidence.length>0);
      assert.ok(t.assumptions.length>0);
      assert.ok(t.remainder.length>0);
      assert.ok(t.reopen.length>0);
      assert.ok(t.claimCeiling.length>0);
      assert.ok(["LOW","MODERATE","HIGH","UNRESOLVED"].includes(t.bridgeBurden));
    }
  }
});

test("TO10 possibility delta is computable and bounded",()=>{
  for(const c of model.TRANSFORMATION_OBSERVATORY_CASES){
    for(const t of c.transitions){
      const d=model.possibilityDelta(c.id,t.id);
      assert.ok(Array.isArray(d.opened));
      assert.ok(Array.isArray(d.closed));
      assert.ok(Array.isArray(d.retained));
    }
  }
});

test("TO11 access view preserves accessible mediated and unavailable",()=>{
  for(const c of model.TRANSFORMATION_OBSERVATORY_CASES){
    assert.ok(c.agents.length>=3);
    for(const a of c.agents){
      assert.ok(Array.isArray(a.accessible));
      assert.ok(Array.isArray(a.mediated));
      assert.ok(Array.isArray(a.notAccessible));
    }
  }
});

test("TO12-TO13 consequences and case claim ceilings stay bounded",()=>{
  for(const c of model.TRANSFORMATION_OBSERVATORY_CASES){
    assert.ok(c.consequences.length>=4);
    assert.ok(c.globalClaimCeiling.length>0);
    assert.ok(c.reopenPrompt.length>0);
  }
});

test("TO15 domain-specific firewalls are preserved",()=>{
  const byId=Object.fromEntries(model.TRANSFORMATION_OBSERVATORY_CASES.map(c=>[c.id,c]));
  assert.match(byId["OBS-DAPHNIA-MATERNAL"].globalClaimCeiling,/evolutionary inheritance/i);
  assert.match(byId["OBS-CLIMATE-PLASTICITY"].globalClaimCeiling,/adaptation/i);
  assert.match(byId["OBS-MATE-CHOICE"].globalClaimCeiling,/speciation/i);
  assert.match(byId["OBS-PSYCHEDELIC"].globalClaimCeiling,/metaphysical proof/i);
});

test("TO14 PROD-3 reader exposes Observatory entrance and all five tabs",()=>{
  const browser=fs.readFileSync(path.resolve(__dirname,"../../src/research/encyclopediaProd3Browser.ts"),"utf8");
  assert.ok(browser.includes("FSP-TRANSFORMATION-OBSERVATORY"));
  for(const label of ["Timeline + Bridge","Agents & Access","Possibility Change","Consequences","REOPEN"]){
    assert.ok(browser.includes(label),label);
  }
  assert.ok(browser.includes("BRIDGE INSPECTOR"));
});
