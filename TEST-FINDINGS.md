# Test Findings

## CODE-0 kernel milestone

Date: 2026-11-01

Command:

```bash
npm test
```

Result:

- 7 tests passed
- 0 failed
- Maya acceptance journey: PASS
- Leila acceptance journey: PASS
- Jordan acceptance journey: PASS
- Verified institutional barrier micro-test: PASS
- Rejected Coach interpretation micro-test: PASS
- No-shared-task micro-test: PASS
- Privacy firewall micro-test: PASS

The current milestone demonstrates deterministic state behavior only. It does **not** yet establish human usability, interface clarity, distinctive value over a worksheet, or readiness for AI/VR.

Implementation note: the runtime could not download npm packages, so the first harness uses TypeScript plus Node's built-in test runner rather than Vitest. The test assertions are framework-independent; this does not alter the frozen kernel behavior.

Local baseline commit before GitHub import: `6639993`.
