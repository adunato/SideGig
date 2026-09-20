---
name: validation
description: Validate an implemented change against its GitHub Issue, applicable design artifacts, and repository quality expectations.
---

# Validation

Use the originating GitHub Issue and its acceptance criteria as the mandatory validation baseline. Also use any HLD, implementation plan or LLD that was required for the change, together with relevant durable Product Definition and Architecture Definition requirements.

Cover changed behaviour, regressions, edge cases, errors, user flows, and integration boundaries proportionately. Add or extend appropriate unit, integration, API, contract, component, or end-to-end tests; do not introduce disproportionate infrastructure merely for ceremony.

Run change-specific tests first, rectify implementation defects within approved scope, rerun affected tests, then run the relevant regression and repository validation coverage. Do not weaken valid tests.

If validation reveals a material design error, scope expansion, architectural change, or new product decision, return the change to the appropriate earlier lifecycle stage rather than fixing it silently inside validation.

Before validation is considered complete, confirm that any required Product Definition or Architecture Definition updates are present and consistent with the implemented change.

## Completion report contract

Report Issue, validation performed and coverage, acceptance-criteria results, results and excluded suites, every fix and rerun, outstanding failures classified as implementation/pre-existing/environment/intermittent, durable-document consistency, and manual validation still required. Explicitly state `No additional manual validation is required.` when applicable.
