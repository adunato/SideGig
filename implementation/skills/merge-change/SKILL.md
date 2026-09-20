---
name: merge-change
description: Conclude a validated change through the repository's GitHub integration controls and clean up only safe workspace state.
---

# Merge Change

Before integration, validate the originating Issue, change branch/worktree, base and target branches, intended commits, required validation evidence, repository guidance, and unrelated local changes.

Follow the GitHub Delivery Model. Normal SideGig changes integrate through a pull request to `dev`; approved release fixes integrate through a pull request to the active release branch. Do not bypass protected branches or claim a pull request is merged when it is not.

Confirm the pull request references the originating Issue, required checks are satisfied, the complete diff is ready for human review, and any required Product Definition or Architecture Definition updates are included in the same change.

Resolve only straightforward conflicts. A conflict that requires a material design, product, architecture, or ownership decision returns the change to the appropriate lifecycle stage.

After integration, remove obsolete worktree/branch state only when safe and preserve any uncommitted or unintegrated work.

## Completion report contract

Report Issue, source/change branch, target branch, pull request URL/ID, integration state, primary checkout state, worktree/branch cleanup, deviations, residual conditions, and required user action. The change is complete only when the GitHub Delivery Model's integration conditions are satisfied.
