---
name: sidegig-change
description: Prepare and deliver a normal change to the central SideGig repository without applying the product-repository branch or release model.
---

# SideGig Change

Use this skill for normal repository changes to SideGig itself.

## Context

Read the root `AGENTS.md`, the originating GitHub Issue when one exists, and the authoritative documents for the changed area.

SideGig is not a product repository. Do not use product-repository `dev`, `staging`, release-branch or promotion rules.

## Workflow

1. Confirm the intended outcome and affected SideGig area.
2. Start from current `main` and create or adopt an isolated change branch. Place a new worktree at `<primary-checkout>/.worktrees/issue-<number>/`, resolving the primary checkout with `git worktree list --porcelain` even when starting from a linked worktree. Adopt a suitable existing worktree in place; do not move it automatically.
3. Keep the change within the approved scope and preserve unrelated work.
4. Update all directly affected durable documentation or automation together.
5. Use `validate-sidegig` and resolve in-scope validation failures.
6. Commit and push the complete change.
7. Create or update a pull request targeting `main`.
8. Link the originating Issue when one exists and summarize scope and validation evidence.
9. Stop for explicit human merge.

Do not merge the pull request yourself. Do not push a normal change directly to `main`.

The learning collector's direct-write exception is separate automation and applies only to generated evidence under `development/learnings/inbox/**`.

After a human confirms integration, remove a change worktree only when it is clean and its branch contains no work beyond the integrated change. Preserve dirty worktrees and any branch with unintegrated commits. Never use forced worktree or branch removal to bypass these checks.

## Completion contract

Report the Issue or task reference, source branch, files/areas changed, validation performed and result, pull request, and human action required.
