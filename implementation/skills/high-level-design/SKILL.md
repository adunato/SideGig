---
name: high-level-design
description: Produce a concise change-specific high-level design when the Development Lifecycle requires one.
---

# High-Level Design

Use the canonical `implementation/templates/high-level-design.md` template when the Development Lifecycle requires an HLD.

Start from the GitHub Issue, current Product Definition, current Architecture Definition, and relevant repository context. The HLD describes the proposed behaviour and design for this individual change; it does not replace the durable product or architecture documents and must not prescribe individual file edits.

Keep the design proportional to the change. Resolve material design choices, interfaces, state changes, error behaviour, validation considerations, and any intended impact on the durable Product Definition or Architecture Definition.

Structural validity is not substantive approval. Do not approve the HLD while a material design question remains unresolved.

## Completion contract

Report the artifact path/ID, originating Issue, product/architecture context used, material design decisions, validation considerations, durable-document impacts, unresolved questions, and approval state. A material unresolved design question keeps the HLD on hold.
