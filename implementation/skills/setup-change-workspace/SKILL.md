---
name: setup-change-workspace
description: Prepare or adopt an isolated Git workspace for a tracked change while preserving repository conventions and unrelated work.
---

# Setup Change Workspace

Start from the originating GitHub Issue and repository instructions. Determine the correct base branch from the GitHub Delivery Model: normally `dev`, or the active release branch for an approved release fix.

Adopt an existing suitable branch/worktree when present, otherwise create the repository-standard issue branch and an isolated workspace where useful. Never reset, overwrite, or discard unrelated changes to force setup.

Validate the Issue reference, branch, base, worktree location, clean ownership boundaries, and readiness for the next lifecycle stage. Do not require an HLD or implementation plan merely to complete workspace setup; those artifacts are created only when the Development Lifecycle requires them.

## Completion contract

Report Issue, branch, worktree, base branch, created/adopted state, conventions applied, unrelated-change safety, and any readiness blocker. The workspace is ready only when the tracked change can proceed safely in isolation.
