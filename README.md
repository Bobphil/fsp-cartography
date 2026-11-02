# FSP Cartography — CODE-0.1

This repository is the first executable implementation of the frozen FSP Cartography specification.

CODE-0.1 freezes the deterministic state machine after a green 21-test regression gate and begins the usability phase around that tested kernel.

## Frozen baseline

The CODE-0.1 regression gate tested commit:

`a58766f3340716d2b71102fe0b855264f8e88288`

Result:

- 21 tests passed
- 0 failed
- browser TypeScript build passed

See `CODE-0.1-FREEZE.md` for the frozen boundary.

## Seven views

- Start
- People
- Institution
- H / S / F
- Connections
- Investigate
- Return

Persistence remains deliberately local and minimal: an in-memory adapter for deterministic tests and a LocalStorage-compatible adapter for the browser boundary.

## Run

```bash
npm test
npm run build:browser
```

## Architectural boundary

The reducer is pure: it does not read the clock, storage, network, or browser globals. Presentation and persistence live outside the kernel.

During the CODE-0.1 usability phase, interface code may dispatch existing actions and render existing state, but it must not silently alter kernel semantics.

## Not building now

No generative AI. No VR. No public-data integration. No multi-user collaboration. No recommendation engine. No personality model. No hidden personalization. No cloud account system.
