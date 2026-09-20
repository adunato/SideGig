---
name: setup-change-workspace
description: Prepare or adopt an isolated Git workspace for a change while preserving repository conventions and unrelated work.
---

# Setup Change Workspace

Prepare a safe workspace before implementation. Inspect repository instructions, determine the explicit or normal integration branch, adopt an existing suitable branch/worktree when present, or use `change/<short-descriptive-name>` and a sibling worktree when no convention exists. Never reset, overwrite, or discard unrelated changes to force setup.

Validate branch, base, worktree location, clean ownership boundaries, and readiness for development. Follow project methodology: create or link the HLD and implementation plan before development, and record their artifact IDs and gateway state.

## Completion contract

Report branch, worktree, base branch, created/adopted state, conventions applied, unrelated-change safety, and any readiness blocker. The workspace is ready only when subsequent work can proceed safely in isolation.
