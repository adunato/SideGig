---
name: validation
description: Validate an implemented change with appropriate automation, rectify in-scope defects, and minimize manual validation.
---

# Validation

Use HLD, plan, LLD, implementation summary, repository tests, and methodology completion conditions to assess scope. Cover changed behaviour, regressions, edge cases, errors, user flows, and integration boundaries. Add or extend proportionate unit, integration, API, contract, component, or end-to-end tests; do not introduce disproportionate infrastructure merely for ceremony.

Run change-specific tests first, rectify implementation defects within approved scope, rerun affected tests, then run relevant regression coverage. Do not weaken valid tests. Stop and escalate when the result requires major redesign, contradicts an approved artifact, expands scope, or needs a new decision. Structural artifact checks, substantive completion, gateway decisions, and cross-artifact traceability must be assessed independently.

## Completion report contract

Report validation performed and coverage, results and excluded suites, every fix and rerun, outstanding failures classified as implementation/pre-existing/environment/intermittent, manual validation still required, artifact/gateway state, and explicitly state `No additional manual validation is required.` when applicable.
