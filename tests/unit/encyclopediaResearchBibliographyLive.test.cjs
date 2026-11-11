const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

test('live PROD-3 exposes the durable research bibliography in Resources and Routes',()=>{
  const src=fs.readFileSync(path.join(__dirname,'../../src/research/encyclopediaProd3Browser.ts'),'utf8');
  const title='FSP Research Bibliography — 60 Annotated Entries';
  const href='FSP-RESEARCH-BIBLIOGRAPHY-2026-11.md';
  assert.ok(src.split(title).length>=3,'title should appear in both public entrances');
  assert.ok(src.split(href).length>=3,'bibliography link should appear in both public entrances');
  assert.match(src,/Open the 60-entry annotated research bibliography/);
  assert.match(src,/RESEARCH ROUTE/);
});
