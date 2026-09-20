---
name: implementation-plan
description: Turn a tracked change and its applicable design inputs into a practical implementation plan with an explicit LLD decision.
---

# Implementation Plan

Use the canonical 10-section template when the Development Lifecycle requires an implementation plan.

Start from the originating GitHub Issue. If an approved HLD exists, use it as the change-design authority. If an HLD is not required, use the Issue together with the relevant Product Definition, Architecture Definition and repository context. Do not create an HLD solely because the plan skill is being used.

Inspect the repository, define logical implementation areas and sequence, identify relevant integrity and validation checks, and maintain traceability to the Issue and all applicable design inputs.

The plan must explicitly state `LLD required: Yes | No` and justify that choice using complexity, coupling, repository-specific design risk, and unresolved technical decisions. If Yes, state what the LLD must resolve. If No, state why the available design inputs and plan are sufficient. Keep checklist completion evidence-based; structural completeness is not substantive completion.

## Completion contract

Report plan path/ID, originating Issue, design inputs, repository findings, sequence, integrity/validation scope, explicit LLD decision and rationale, open questions, gateway decision, and approval state. Do not begin downstream work while a material decision or gateway is unresolved.
