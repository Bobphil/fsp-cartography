const test = require('node:test');
const assert = require('node:assert/strict');
const { createInitialState } = require('../helpers.cjs');
const { MemoryPersistenceAdapter, LocalStoragePersistenceAdapter } = require('../../dist/kernel/persistence.js');

class FakeStorage {
  constructor(){ this.data = new Map(); }
  getItem(k){ return this.data.has(k) ? this.data.get(k) : null; }
  setItem(k,v){ this.data.set(k,String(v)); }
  removeItem(k){ this.data.delete(k); }
}

test('memory persistence round-trips by value and clears independently', () => {
  const adapter = new MemoryPersistenceAdapter();
  const s = createInitialState('memory');
  s.title = 'Stored map';
  adapter.save(s);
  const loaded = adapter.load('memory');
  assert.deepEqual(loaded,s);
  assert.notEqual(loaded,s);
  loaded.title = 'mutated copy';
  assert.equal(adapter.load('memory').title,'Stored map');
  adapter.clear('memory');
  assert.equal(adapter.load('memory'),null);
});

test('local-storage adapter uses a namespaced key and round-trips state', () => {
  const storage = new FakeStorage();
  const adapter = new LocalStoragePersistenceAdapter(storage,'fsp-test');
  const s = createInitialState('local');
  adapter.save(s);
  assert.ok(storage.data.has('fsp-test:local'));
  assert.deepEqual(adapter.load('local'),s);
  adapter.clear('local');
  assert.equal(adapter.load('local'),null);
});

test('persistence refuses invalid state instead of silently storing it', () => {
  const adapter = new MemoryPersistenceAdapter();
  const s = createInitialState('invalid');
  s.nodes.push(
    {id:'one',nodeType:'SELF_PRF',label:'one',relevance:[],hsf:['S'],privacy:'PRIVATE',createdBy:'USER',archived:false},
    {id:'two',nodeType:'SELF_PRF',label:'two',relevance:[],hsf:['S'],privacy:'PRIVATE',createdBy:'USER',archived:false}
  );
  assert.throws(()=>adapter.save(s),/SELF_PRF/);
});
