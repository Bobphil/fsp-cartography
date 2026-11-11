const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const w=require("../../dist/research/transformationWorkbench.js");

test("WB1 blank inquiry starts bounded and empty",()=>{
  const q=w.blankWorkbenchInquiry("How does A become B?");
  assert.equal(q.question,"How does A become B?");
  assert.deepEqual(q.states,[]);
  assert.deepEqual(q.transitions,[]);
});

test("WB2 user can construct states and inspect transition readout",()=>{
  let q=w.blankWorkbenchInquiry("How does A become B?");
  q=w.addWorkbenchState(q,"A","Initial",["x","y"]);
  q=w.addWorkbenchState(q,"B","Later",["y","z"]);
  q=w.addWorkbenchTransition(q,{
    from:"S0",to:"S1",label:"A changes into B",relation:"ENABLES",
    evidence:["observation"],assumptions:["no hidden confound"],alternatives:["C"],
    remainder:["mechanism"],claimCeiling:"B followed A under tested conditions.",reopen:["replicate"]
  });
  const r=w.workbenchTransitionReadout(q,"T0");
  assert.deepEqual(r.possibilityDelta.opened,["z"]);
  assert.deepEqual(r.possibilityDelta.closed,["x"]);
  assert.deepEqual(r.possibilityDelta.retained,["y"]);
});

test("WB3 validation requires question states ceiling and reopen",()=>{
  let q=w.blankWorkbenchInquiry("");
  assert.ok(w.validateWorkbenchInquiry(q).length>=2);
  q=w.addWorkbenchState(q,"A","",[]);
  q=w.addWorkbenchState(q,"B","",[]);
  q=w.addWorkbenchTransition(q,{from:"S0",to:"S1",label:"change",relation:"",evidence:[],assumptions:[],alternatives:[],remainder:[],claimCeiling:"",reopen:[]});
  const errs=w.validateWorkbenchInquiry(q);
  assert.ok(errs.some(x=>x.includes("claim ceiling")));
  assert.ok(errs.some(x=>x.includes("REOPEN")));
});

test("WB4 PROD-3 exposes guide and bring-your-own-question surfaces",()=>{
  const browser=fs.readFileSync(path.resolve(__dirname,"../../src/research/encyclopediaProd3Browser.ts"),"utf8");
  for(const phrase of ["FSP-TRANSFORMATION-OBSERVATORY-GUIDE","FSP-TRANSFORMATION-WORKBENCH","Bring your own question","Your map ≠ the world"]){
    assert.ok(browser.includes(phrase),phrase);
  }
});
