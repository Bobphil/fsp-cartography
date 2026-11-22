# FSP-VR-ELENA-HARNESS-1

Executable 2D/2.5D prototype for the twelve-state Elena governed-crossing interaction grammar.

## Contents
- `index.html` — browser harness
- `styles.css` — plain 2D/2.5D visual grammar
- `app.js` — UI bindings and framework-naive trial dialog
- `src/states.js` — twelve frozen fixtures and standing/Return definitions
- `src/reducer.js` — deterministic interaction reducer
- `src/invariants.js` — constitutional invariant checker
- `tests/harness.test.mjs` — executable unit/regression tests
- `trial/framework-naive-trial.md` — protocol for a future actual framework-naive human browser trial
- `MICRO-PATCH-RECORD.md` — observed implementation patches and deferred perception patches
- `BROWSER-RUN-REPORT.md` — actual Chromium state-by-state inspection and current naive-trial claim ceiling

## Run tests
```bash
npm test
```

## Run locally
From this directory:
```bash
npm run serve
```
Then open:
`http://localhost:8000`

No package installation is required for the harness itself. The test runner uses the Node.js built-in `node:test` module and the local server command uses Python's built-in HTTP server.

## Current claim ceiling
This build provides an executable deterministic harness and automated constitutional tests. A developer Chromium perceptual pass has been performed and the observed UI defects were micro-patched. The built-in framework-naive trial instrument has been mechanically dry-run, but no independent human framework-naive browser trial has yet been performed. Therefore this build does **not** establish user comprehension, pedagogical transfer, or VR superiority.
