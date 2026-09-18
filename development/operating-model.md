# SideGig Development Operating Model

## Status

Draft. This document defines the standard development operating model for all software repositories created under SideGig.

It defines the concrete development conventions used across projects. Project-specific technical decisions belong in the project repository; common development process is defined here once.

## 1. Project and Repository Model

- Each independently deployable product or service has its own GitHub repository.
- Product source code does not live in the SideGig repository.
- The SideGig repository owns cross-project development standards, templates and reusable agentic-development assets.
- New project repositories are private by default.
- Repository names use lowercase kebab-case.
- Every project repository contains:
  - `README.md`
  - `AGENTS.md`
  - `docs/hld.md`
  - `docs/implementation-plan.md`
  - application source code
  - automated tests
  - project configuration
  - `.github/workflows/`
- A repository contains one independently deployable product or service. SideGig does not use a shared product monorepo.

## 2. Work Management

### Issues

- GitHub Issues are the canonical development work items.
- Only two issue type labels are used:
  - `feature`
  - `bug`
- Every code change starts from an issue.
- One issue represents one independently mergeable outcome.
- Every issue contains:
  - **Objective** — the required outcome;
  - **Acceptance criteria** — observable conditions that must be true before closure;
  - **Dependencies** — issue numbers that must be completed first, or `None`.
- Feature issues describe the required behaviour, not the implementation approach.
- Bug issues contain the observed behaviour and the expected behaviour.
- An issue is closed only by a merged pull request or an explicit no-code resolution recorded in the issue.

### Milestones

- A GitHub Milestone represents exactly one planned release.
- Milestone names are the target Semantic Version, for example `v0.2.0` or `v1.1.3`.
- A milestone is created when work for that release is first committed to implementation.
- Every issue committed to a release is assigned to exactly one milestone.
- Backlog issues have no milestone.
- An issue is moved to another milestone only when its target release changes.
- A milestone is closed only after its corresponding Git tag and GitHub Release have been created.
- SideGig does not use milestones for themes, workstreams, architecture areas or generic planning periods.

### GitHub Projects

- GitHub Projects is not part of the standard project workflow.
- Issues, milestones and pull requests are the authoritative development state.
- A project must not duplicate issue or release status in another planning board.

## 3. Git Lifecycle

### Permanent branches

- `main` is the only permanent branch.
- SideGig does not use permanent `develop`, `test`, `staging` or release branches.
- Deployments and environments are controlled through CI/CD configuration, not branches.

### Development branches

Every development branch is created from the current `main`.

Branch names use:

- `feature/<issue-number>-<slug>`
- `fix/<issue-number>-<slug>`

Examples:

- `feature/42-add-pagination`
- `fix/57-handle-empty-response`

One branch implements one issue. A branch is deleted immediately after merge.

### Pull requests and merge

- All changes to `main` are made through pull requests.
- Direct pushes to `main` are disabled.
- A pull request references the issue it closes.
- CI must pass before merge.
- The final diff is reviewed by the developer before merge, including agent-generated changes.
- Pull requests are squash-merged.
- The squash commit title uses the pull-request title.
- Merge remains an explicit human action; coding agents do not merge to `main`.

## 4. Development Lifecycle

Every code change follows this lifecycle:

1. Create or refine the GitHub Issue.
2. Confirm its acceptance criteria and dependencies.
3. Assign it to the target release milestone when it is committed for implementation.
4. Confirm the HLD and implementation plan remain valid for the change; update them before coding if they do not.
5. Create the issue branch from `main`.
6. Implement the issue and its automated tests.
7. Run the complete local validation command.
8. Open a pull request linked to the issue.
9. Resolve CI failures and review the complete diff.
10. Squash-merge after CI passes.
11. Delete the source branch.
12. Close the issue through the merged pull request.
13. Release through the repository release workflow when all issues in the milestone are complete.

Untracked implementation work is not allowed. If implementation reveals work outside the issue acceptance criteria, a new issue is created.

## 5. Architecture and Design

- Every project repository has `docs/hld.md`.
- Every project repository has `docs/implementation-plan.md`.
- Both documents are created from canonical SideGig templates in `development/templates/`.
- The HLD defines the stable system-level design: components, responsibilities, external interfaces, principal data flows, deployment shape and material technology choices.
- The implementation plan converts the current approved design into an ordered implementation structure: deliverables, issue decomposition, dependencies and validation approach.
- The HLD is updated in the same pull request that introduces a material architecture change.
- The implementation plan is updated when planned implementation scope, sequencing or dependencies materially change.
- SideGig does not require a standard LLD document.
- A project creates an LLD only when a component requires detailed internal design that cannot be represented clearly in the HLD, implementation plan and code-level interfaces.
- Project repositories do not create alternative architecture or implementation-plan formats when a SideGig template exists.

## 6. Coding and Quality Baseline

### TypeScript

- Application code uses TypeScript, not JavaScript.
- TypeScript `strict` mode is enabled.
- Prettier is the formatter.
- ESLint is the linter.
- Vitest is the unit-test framework.

### Python

- Ruff is the formatter and linter.
- Pyright is the type checker.
- pytest is the test framework.

### Repository validation

Every repository exposes one command that executes the complete local validation suite.

For Node.js projects:

`npm run validate`

For Python projects:

`make validate`

The validation command runs, in order:

1. formatting verification;
2. linting;
3. type checking;
4. automated tests;
5. build or package validation where the project produces a build artefact.

CI calls the same underlying validation commands used locally.

Dependency lockfiles are committed and CI installs from the lockfile.

## 7. CI/CD

Every project repository contains two workflow types.

### Pull-request validation

Every pull request to `main` executes the complete repository validation suite.

A failed validation blocks merge.

### Deployment and release

- Deployment is performed by GitHub Actions from committed repository state.
- Normal deployment is not performed manually from a developer workstation.
- Project-specific deployment workflows define the target platform and environment.
- A production/public release is deployed from a version tag.
- The released commit is therefore immutable and identifiable by version.
- Deployment credentials are configured in the repository or target-platform secret store required by the deployment workflow.

## 8. Agentic Development

- OpenAI Codex is the standard coding agent for SideGig projects.
- Every project repository contains a root `AGENTS.md`.
- SideGig defines a canonical baseline `AGENTS.md` under the development framework once that baseline is created.
- A project `AGENTS.md` extends the SideGig baseline with project-specific commands, architecture constraints and repository instructions.
- Reusable Codex behaviour is implemented as SideGig Codex skills rather than repeated prompt text.
- Codex receives implementation work through a GitHub Issue with explicit acceptance criteria.
- The HLD and implementation plan are authoritative context for architectural and implementation intent.
- Codex creates or works on the issue branch, edits code, runs validation and prepares the pull request.
- Codex does not silently expand issue scope.
- Work discovered outside the current issue becomes a new GitHub Issue.
- Codex does not merge its own pull request.
- Human review before merge focuses on the complete diff, acceptance criteria, test evidence and any architectural/documentation changes rather than line-by-line supervision of the agent's implementation process.

## 9. Releases

- SideGig projects use Semantic Versioning: `MAJOR.MINOR.PATCH`.
- Release tags use `vMAJOR.MINOR.PATCH`.
- The release version is identical to the milestone name.
- A release is created only when every issue assigned to that milestone is closed.
- GitHub Releases are the canonical release record.
- The GitHub Release contains:
  - a concise user-visible summary;
  - the merged features and bug fixes included in the release;
  - links to the relevant pull requests or issues.
- SideGig does not maintain a separate manual `CHANGELOG.md`.
- After the GitHub Release and deployment complete successfully, the corresponding milestone is closed.
