# SideGig Bootstrap

The SideGig bootstrap package establishes the standard agent, template, workflow and tooling baseline for product repositories.

## Change worktrees

New Issue worktrees are placed at `<primary-checkout>/.worktrees/issue-<number>/`. Setup resolves the primary checkout with `git worktree list --porcelain`, including when invoked from a linked worktree. Existing suitable worktrees outside that location may be adopted in place; bootstrap and setup do not move existing worktrees.

When installing the package, `install-skills.ps1` ensures the repository-root `.gitignore` contains `/.worktrees/`. It appends this rule without replacing existing entries and does not append it again when already present.

## One-time workstation credential

Product repositories use a post-merge workflow to dispatch the central SideGig learning collector. That workflow needs the repository Actions secret `SIDEGIG_COLLECTOR_DISPATCH_TOKEN`.

The token itself is created once in GitHub as a fine-grained personal access token:

- resource owner: the SideGig repository owner;
- repository access: `adunato/SideGig` only;
- repository permission: `Actions: Read and write`;
- all other repository permissions: minimum/default.

After creating the token, initialize the local SideGig bootstrap credential once on Windows:

```powershell
pwsh implementation/bootstrap/initialize-dispatch-credential.ps1
```

The script prompts for the token as a secure value and stores only a Windows DPAPI-encrypted representation at:

`%LOCALAPPDATA%\SideGig\bootstrap\collector-dispatch-token.dpapi`

The encrypted credential is tied to the current Windows user and is not stored in GitHub or any product repository.

Token creation and later token rotation remain explicit security actions. Per-repository secret creation does not.

## Automatic repository provisioning

The canonical package installs:

`.codex/tools/provision-repository-secrets.ps1`

During every repository bootstrap, the `provision-repository-secrets` skill runs this tool with the new `owner/repository`. The tool automatically creates or updates `SIDEGIG_COLLECTOR_DISPATCH_TOKEN` through GitHub CLI and verifies that the secret exists.

If the local encrypted credential is missing, cannot be decrypted, GitHub CLI is unavailable, or secret creation fails, bootstrap fails. The process must not silently leave a manual secret-setup task behind.

## Rotation

When the fine-grained token is rotated, rerun `initialize-dispatch-credential.ps1` with the new token. Existing product repository secrets can then be refreshed by running the provisioning tool for each repository; all future bootstraps use the new local credential automatically.
