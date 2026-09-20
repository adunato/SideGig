---
name: merge-change
description: Safely conclude a validated change by following repository integration guidance and cleaning up only safe workspace state.
---

# Merge Change

Before integration, validate the change branch, worktree, base/target branch, intended commits, repository guidance, and unrelated local changes. Use direct merge or pull request according to project policy; do not guess an ambiguous target or claim a pull request is merged. Resolve only straightforward conflicts; stop for a material design or ownership decision.

After direct merge, verify the primary checkout reflects the target and remove obsolete worktree/branch only when safe. After pull request creation, keep required branch state and do not simulate a merge. Preserve uncommitted or unintegrated work.

## Completion report contract

Report source/change branch, target branch, integration method and result, PR URL/ID when applicable, primary checkout state, worktree/branch cleanup, deviations, residual conditions, and required user action. Update the implementation artifact set with the final gateway/integration evidence.
