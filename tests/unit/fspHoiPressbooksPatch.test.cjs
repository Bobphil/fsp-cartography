const test=require('node:test');
const assert=require('node:assert/strict');
const {
  ENCYCLOPEDIA_PUBLIC_BASE,
  PRESSBOOKS_BOOK_BASE,
  PRESSBOOKS_BINDINGS,
  bindingForNode,
  renderChapterPatch,
  renderBridgeCPatch,
  productionPatchSet,
  validatePressbooksPatchSet
}=require('../../dist/research/fspHoiPressbooksPatch.js');

test('production Pressbooks patch set validates',()=>{
  const r=validatePressbooksPatchSet();
  assert.equal(r.passes,true,JSON.stringify(r.failures));
});

test('all 26 existing book nodes are bound to current Pressbooks/SUPER routes',()=>{
  assert.equal(PRESSBOOKS_BINDINGS.length,26);
  assert.deepEqual(PRESSBOOKS_BINDINGS.map(x=>x.order),Array.from({length:26},(_,i)=>i));
  for(const b of PRESSBOOKS_BINDINGS){
    assert.ok(b.pressbooksUrl.startsWith(PRESSBOOKS_BOOK_BASE),b.nodeId);
    assert.match(b.superUrl,/what-may-we-carry-forward-super/);
  }
});

test('Bridge C preserves shared Chapter 4 page identity',()=>{
  assert.equal(bindingForNode('intC').pressbooksUrl,bindingForNode('ch04').pressbooksUrl);
  assert.equal(bindingForNode('intC').policy,'EMBEDDED_BRIDGE_SHARED_PAGE');
  assert.match(renderBridgeCPatch().html,/Return to Chapter 4/);
});

test('chapter patch set is thin and covers exactly fourteen chapters',()=>{
  const patches=productionPatchSet().filter(x=>/^ch\\d\\d$/.test(x.nodeId));
  assert.equal(patches.length,14);
  for(const p of patches){
    assert.ok(p.html.length<8000,p.nodeId);
    assert.match(p.html,/Where this chapter fits/);
    assert.match(p.html,/Return to the whole inquiry/);
  }
});

test('patches are static HTML only and cannot inject active page behavior',()=>{
  for(const p of productionPatchSet()){
    assert.doesNotMatch(p.html,/<script|<iframe|<form|<style/i);
    assert.doesNotMatch(p.html,/onclick=|onload=|javascript:/i);
  }
});

test('stable markers make duplicate insertion detectable',()=>{
  for(const p of productionPatchSet()){
    assert.match(p.html,new RegExp('FSP-HOI-PRESSBOOKS-PATCH-1:'+p.nodeId+':START'));
    assert.match(p.html,new RegExp('FSP-HOI-PRESSBOOKS-PATCH-1:'+p.nodeId+':END'));
  }
});

test('no formal FSP machinery leaks into student patch text',()=>{
  const all=productionPatchSet().map(x=>x.html).join(' ');
  assert.doesNotMatch(all,/state vector|relation graph|canonical fingerprint|projection profile|reducer|invariant suite/i);
});

test('selected Later Reopening blocks appear only on authorized historical chapters',()=>{
  const authorized=new Set(['ch05','ch06','ch07','ch08','ch09','ch10','ch12','ch13']);
  for(let i=1;i<=14;i++){
    const id='ch'+String(i).padStart(2,'0');
    const has=/Later reopening/.test(renderChapterPatch(i).html);
    assert.equal(has,authorized.has(id),id);
  }
});

test('Later Reopening explicitly blocks retroactive prediction language',()=>{
  for(const id of [5,6,7,8,9,10,12,13]){
    const h=renderChapterPatch(id).html;
    assert.match(h,/not a claim that the historical thinker anticipated or predicted/i);
  }
});

test('Encyclopedia links use the certified live public base and remain optional',()=>{
  assert.equal(ENCYCLOPEDIA_PUBLIC_BASE,'https://bobphil.github.io/fsp-cartography/');
  const p=renderChapterPatch(8);
  assert.ok(p.html.includes('https://bobphil.github.io/fsp-cartography/#/narrative/NEPTUNE-VULCAN'));
  assert.match(p.html,/optional/i);
});

test('labs remain untouched by this thin patch pass',()=>{
  assert.equal(productionPatchSet().some(x=>/^lab/.test(x.nodeId)),false);
  for(const id of ['lab01','lab02','lab03','lab04','lab05','lab06']){
    assert.equal(bindingForNode(id).policy,'LAB_PRESERVE');
  }
});

test('patches preserve original Pressbooks URLs',()=>{
  const expected={
    ch01:'https://pressbooks.pub/whatmaywecarryforward/chapter/chapter-1/',
    ch05:'https://pressbooks.pub/whatmaywecarryforward/chapter/rebuilding-the-map/',
    ch14:'https://pressbooks.pub/whatmaywecarryforward/chapter/you-are-here-contemporary-situated-inquiry/'
  };
  for(const [id,url] of Object.entries(expected)){
    assert.equal(bindingForNode(id).pressbooksUrl,url);
  }
});
