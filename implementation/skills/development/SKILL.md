---
name: development
description: Implement a tracked change from its GitHub Issue and any applicable approved design artifacts with controlled deviations and integrity checks.
---

# Development

Read the originating GitHub Issue, repository instructions, current Product Definition and Architecture Definition where relevant, and every design artifact required for this change before editing.

Treat the Issue as the required scope and acceptance reference. Treat an HLD, implementation plan and LLD as authoritative only when the Development Lifecycle required and approved them for the change. A simple change may legitimately proceed without one or more of those artifacts.

Keep implementation within the approved scope and preserve established repository patterns. Add or update automated tests proportionately to the changed behaviour.

Minor deviations may be made when they do not change product behaviour, architecture, scope, interfaces, data model, or introduce a significant decision; record them. A major deviation stops development and returns the change to the appropriate earlier lifecycle stage. Do not silently redesign or broaden the Issue.

Run the relevant local integrity checks defined by the Coding and Quality Baseline and repository instructions. Fix implementation-caused failures and distinguish unrelated failures.

## Completion report contract

Report Issue, implementation summary, changed areas/artifacts, deviations and reasons, confirmation that no unapproved major deviation occurred, checks and scope/results, tests added or changed, and known unrelated failures. Development is complete only when the approved scope is implemented and the changed scope is ready for validation.
