# FSP Cartography — CODE-0 Prototype 0

This repository is the first executable implementation of the frozen FSP Cartography specification.

Prototype 0 is intentionally thin. It tests whether typed, provenance-aware, task-bounded mapping can preserve the distinctions that matter before any polished interface, generative AI, public-data layer, multi-user collaboration, or VR is added.

## Current milestone

Kernel / reducer / invariants / deterministic acceptance harness only.

The required acceptance journeys are:

- Maya — standard healthcare exploration
- Leila — practical power, verified constraint, no manufactured cooperation
- Jordan — orientation without a formed task

Required micro-tests:

- verified institutional barrier remains verified
- rejected Coach interpretation remains rejected
- no shared task is a valid state
- private content does not mutate into course content

## Run

```bash
npm test
```

The repository currently uses TypeScript plus Node's built-in test runner so the deterministic harness can run without downloading external packages. The tests are framework-independent and may later be moved to Vitest without changing kernel behavior.

## Not building now

No generative AI. No VR. No public-data integration. No multi-user collaboration. No recommendation engine. No personality model. No hidden personalization. No cloud account system.
