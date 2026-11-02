# FSP Cartography — CODE-0 Prototype 0

This repository is the first executable implementation of the frozen FSP Cartography specification.

Prototype 0 is intentionally thin. It tests whether typed, provenance-aware, task-bounded mapping can preserve the distinctions that matter before any polished interface, generative AI, public-data layer, multi-user collaboration, or VR is added.

## Current milestone

The deterministic CODE-0 state machine is now protected by three layers:

1. acceptance journeys and frozen micro-tests;
2. direct reducer/invariant/persistence/shell unit tests; and
3. a thin seven-view browser shell compiled directly from the tested state machine.

The required acceptance journeys remain:

- Maya — standard healthcare exploration
- Leila — practical power, verified constraint, no manufactured cooperation
- Jordan — orientation without a formed task

Required micro-tests remain:

- verified institutional barrier remains verified
- rejected Coach interpretation remains rejected
- no shared task is a valid state
- private content does not mutate into course content

The seven shell views are:

- Start
- People
- Institution
- H / S / F
- Connections
- Investigate
- Return

Persistence is deliberately local and minimal: an in-memory adapter for deterministic testing and a LocalStorage-compatible adapter for the browser boundary.

## Run

```bash
npm test
npm run build:browser
```

The repository uses TypeScript plus Node's built-in test runner so the deterministic harness can run without downloading external packages. The test assertions are framework-independent and may later be moved to Vitest without changing kernel behavior.

## Architectural boundary

The reducer is pure: it does not read the clock, storage, network, or browser globals. Persistence and rendering live outside the kernel.

## Not building now

No generative AI. No VR. No public-data integration. No multi-user collaboration. No recommendation engine. No personality model. No hidden personalization. No cloud account system.
