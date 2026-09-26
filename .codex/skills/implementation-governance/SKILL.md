---
name: implementation-governance
description: Maintain SideGig's central implementation methodology and POC evidence while keeping detailed product engineering in the product repository.
---

# Implementation Governance

Use this skill for central SideGig work under `implementation/` and for implementation-methodology decisions recorded by SideGig.

## Inputs

Read:

- `requirements.md`;
- `implementation/methodology.md`;
- the relevant channel implementation/POC/prerequisite artifacts;
- `development/operating-model.md` when software-engineering standards are implicated;
- stable evidence from the relevant product repository when implementation progress must be recorded centrally.

## Boundary

SideGig owns methodology, cross-project standards, bootstrap/package definitions and the evidence required to establish implementation-step completion.

The product repository owns detailed engineering state: source code, tests, product/architecture definitions, change design, CI state and release implementation.

Do not duplicate detailed product engineering artifacts into SideGig. Record only the stable references and cross-project evidence required by the implementation methodology.

When a task changes the product-repository skill/template/bootstrap package, use `maintain-product-package`.

## Execution

1. Identify the exact implementation methodology step and its required inputs/outputs.
2. Confirm the upstream decision or evidence on which the step depends.
3. Update the canonical SideGig implementation artifact rather than creating an alternative tracker.
4. Keep product-repository engineering details in the product repository.
5. Record stable references and explicit evidence for completed gates.
6. Use `validate-sidegig` for the applicable implementation checks.
7. Deliver repository changes through `sidegig-change`.

## Completion contract

Report the methodology step, central artifacts updated, product-repository evidence referenced, unresolved prerequisites or gates, validation result, and next step.
