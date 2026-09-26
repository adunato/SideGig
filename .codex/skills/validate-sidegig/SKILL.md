---
name: validate-sidegig
description: Select and run the validation appropriate to changes in the central SideGig repository and report the exact evidence without applying product-repository validation rules.
---

# Validate SideGig

Use this skill before a SideGig change is handed off for merge.

## Dependency setup

When validator dependencies are not already installed, use:

`npm install --no-audit --no-fund`

Do not introduce dependency or lockfile changes merely as a side effect of validation unless the task intentionally changes dependencies.

## Validation selection

For research changes, run:

`npm run validate:research`

Generate the research report/dashboard when the change materially affects those derived views:

- `npm run report:research`
- `npm run dashboard:research`

For implementation, development-operating-model, template or bootstrap-package changes, run:

`npm run validate:implementation`

For product-package changes, also run:

`powershell -NoProfile -ExecutionPolicy Bypass -File implementation/bootstrap/verify-skills.ps1`

For learning-collector changes, also compile/check the collector and source registry:

- `python -m py_compile implementation/learning/collect_learnings.py`
- verify `development/learnings/sources.json` parses as JSON.

For cross-cutting changes, or when scope is uncertain, run the complete repository validation:

`npm run validate`

For `AGENTS.md` or `.codex/skills/` changes, additionally inspect that every skill has valid front matter with a unique `name` and a clear `description`, and that no SideGig-local skill has been added to the product bootstrap manifest accidentally.

## Failure handling

Classify failures as caused by the active change, pre-existing, environmental or intermittent. Correct in-scope failures and rerun. Do not weaken validation rules to obtain a pass.

## Completion contract

Report every command/check run, its result, any failure classification/correction, and whether the change is ready for PR review.
