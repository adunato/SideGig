---
name: low-level-design
description: Produce a concise file-level design from an approved HLD and plan when the plan requires an LLD.
---

# Low-Level Design

Create an LLD only when the approved implementation plan says it is required. Inspect the actual repository and use `implementation/templates/low-level-design.md`. Describe the change overview, every significant file action and responsibility, cross-file dependencies, and an agreeing summary table. The LLD is design guidance, not a diff or line-by-line patch.

Keep the artifact synchronized with HLD, plan, methodology mapping, and traceability. Structural validity and substantive approval remain separate. If repository facts invalidate the approved direction, stop and report the conflict rather than silently redesigning.

## Completion contract

Report artifact path/ID, files/actions covered, dependencies, summary agreement, approval/gateway state, structural checks, substantive completion, and any unresolved decision.
