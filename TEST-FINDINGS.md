# Test Findings

## CODE-0 kernel milestone

Date: 2026-11-01

Baseline command:

```bash
npm test
```

Baseline result:

- 7 tests passed
- 0 failed
- Maya acceptance journey: PASS
- Leila acceptance journey: PASS
- Jordan acceptance journey: PASS
- Verified institutional barrier micro-test: PASS
- Rejected Coach interpretation micro-test: PASS
- No-shared-task micro-test: PASS
- Privacy firewall micro-test: PASS

## Kernel hardening + persistence + seven-view shell

Date: 2026-11-02

Added direct tests for:

- reducer determinism and input immutability
- missing-target reducer no-ops
- rejected-Coach suppression at the reducer boundary
- privacy projection integrity
- duplicate IDs
- single SELF_PRF
- invariant enforcement before persistence
- Memory persistence
- LocalStorage-compatible persistence
- seven-view shell order, contract, empty-state, and navigation behavior

Target command:

```bash
npm test
npm run build:browser
```

Expected deterministic harness after this milestone:

- 21 tests total
- 7 frozen acceptance/micro tests
- 14 direct unit tests
- browser shell compiles separately

The milestone still does **not** establish human usability, interface clarity, distinctive value over a worksheet, or readiness for AI/VR.

Implementation note: the project continues to use TypeScript plus Node's built-in test runner rather than adding a package dependency. The test assertions remain framework-independent.
