import { assertInvariants } from "./invariants";
import { FSPMapState } from "./types";

export interface PersistenceAdapter {
  save(state: FSPMapState): void;
  load(mapId: string): FSPMapState | null;
  clear(mapId: string): void;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function cloneState(state: FSPMapState): FSPMapState {
  return JSON.parse(JSON.stringify(state)) as FSPMapState;
}

function parseState(raw: string, expectedMapId: string): FSPMapState {
  const parsed = JSON.parse(raw) as FSPMapState;

  if (!parsed || parsed.schemaVersion !== "fsp-cartography-0") {
    throw new Error("Unsupported or invalid FSP Cartography schema");
  }
  if (parsed.mapId !== expectedMapId) {
    throw new Error(`Stored map id ${parsed.mapId} does not match ${expectedMapId}`);
  }

  assertInvariants(parsed);
  return parsed;
}

export class MemoryPersistenceAdapter implements PersistenceAdapter {
  private readonly records = new Map<string, string>();

  save(state: FSPMapState): void {
    assertInvariants(state);
    this.records.set(state.mapId, JSON.stringify(state));
  }

  load(mapId: string): FSPMapState | null {
    const raw = this.records.get(mapId);
    if (raw === undefined) return null;
    return cloneState(parseState(raw, mapId));
  }

  clear(mapId: string): void {
    this.records.delete(mapId);
  }
}

export class LocalStoragePersistenceAdapter implements PersistenceAdapter {
  constructor(
    private readonly storage: StorageLike,
    private readonly namespace = "fsp-cartography"
  ) {}

  private key(mapId: string): string {
    return `${this.namespace}:${mapId}`;
  }

  save(state: FSPMapState): void {
    assertInvariants(state);
    this.storage.setItem(this.key(state.mapId), JSON.stringify(state));
  }

  load(mapId: string): FSPMapState | null {
    const raw = this.storage.getItem(this.key(mapId));
    if (raw === null) return null;
    return parseState(raw, mapId);
  }

  clear(mapId: string): void {
    this.storage.removeItem(this.key(mapId));
  }
}
