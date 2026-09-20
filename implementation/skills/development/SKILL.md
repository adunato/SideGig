---
name: development
description: Implement an approved change from its HLD, plan, and optional LLD with controlled deviations and integrity checks.
---

# Development

Read approved artifacts and repository instructions before editing. Treat HLD as behavioural architecture, the plan as implementation approach, and LLD (when required) as file-level guidance. Keep changes within the approved scope and preserve established patterns.

Minor deviations may be made when they do not change architecture, behaviour, scope, or introduce a significant decision; record them. A major deviation (architecture, component, interface, data model, scope, or invalid LLD) stops development for a decision. Do not silently redesign. Run relevant lint, formatting, syntax, type, build, static-analysis, or equivalent integrity checks; fix implementation-caused failures and distinguish unrelated failures.

## Completion report contract

Report summary, changed areas/artifacts, LLD/plan deviations and reasons, confirmation that no unapproved major deviation occurred, checks and scope/results, and known unrelated failures. Development is complete only when approved work is implemented, checks pass for the changed scope, and the report is recorded in the implementation artifact set.
