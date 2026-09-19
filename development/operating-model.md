# SideGig Development Operating Model

## Status

Draft. This document defines the standard development operating model for all software repositories created under SideGig.

It defines the concrete development conventions used across projects. Project-specific technical decisions belong in the project repository; common development process is defined here once.

## 1. Project and Repository Model

- Each independently deployable product or service has its own GitHub repository.
- Product source code does not live in the SideGig repository.
- The SideGig repository owns cross-project development standards, canonical templates, repository-bootstrap definitions and reusable agentic-development assets.
- New project repositories are private by default.
- Repository names use lowercase kebab-case.
- A repository contains one independently deployable product or service. SideGig does not use a shared product monorepo.
- Every project repository contains:
  - `README.md`
  - `AGENTS.md`
  - `docs/hld.md`
  - `docs/implementation-plan.md`
  - application source code
  - automated tests
  - project configuration
  - `.github/workflows/`

### Repository bootstrap

Every new project repository is established through the standard SideGig repository bootstrap.

The bootstrap creates the initial repository baseline directly. The normal pull-request lifecycle begins after the bootstrap baseline has been created.

The bootstrap must:

1. create the repository as private unless an explicit project decision requires otherwise;
2. create the canonical repository structure and baseline files;
3. create the initial `dev`, `staging` and `main` branches from the same bootstrap baseline;
4. set `dev` as the default branch;
5. install the standard CI/CD workflows required by this operating model;
6. configure the required branch protections after the initial branches exist;
7. create the initial design and implementation artifacts from the canonical SideGig templates.

The bootstrap is not merely a list of filenames. Each standard artifact must have a canonical SideGig template or baseline defining its purpose, required structure and project-specific extension points.


### README baseline

Every project repository contains a root `README.md` created from `development/templates/README-template.md`.

The README is the concise entry point for a developer or operator encountering the repository. It explains what the product is, how to run and validate it, and where to find the authoritative design and implementation documentation.

The README must contain:

- **Project summary** — the project name and a concise project-specific description of what the product does and who or what it serves.
- **Status** — the current lifecycle state where this materially helps interpret the repository, for example proof of concept, active development or production.
- **Getting started** — the minimum project-specific prerequisites and commands required to install dependencies and run the product locally.
- **Usage** — the minimum project-specific instructions needed to exercise the product through its primary local or developer-facing interface.
- **Development** — the standard commands used to validate, test and build the repository.
- **Project documentation** — links to `docs/hld.md` and `docs/implementation-plan.md`, identifying them as the authoritative design and implementation-planning artifacts.
- **Deployment** — a concise project-specific statement identifying the deployment target and the standard release/deployment path, without duplicating CI/CD workflow detail.

The template contains the common wording and headings. Each project replaces the explicit template placeholders with project-specific content during bootstrap.

The README remains concise. Architecture decisions belong in `docs/hld.md`, implementation sequencing belongs in `docs/implementation-plan.md`, agent instructions belong in `AGENTS.md`, and detailed CI/CD behaviour belongs in repository workflow configuration and the Development Operating Model.

## 2. Work Management

### Issues

- GitHub Issues are the canonical development work items.
- Only two issue type labels are used:
  - `feature`
  - `bug`
- Every implementation change starts from an issue.
- One issue represents one independently mergeable outcome.
- Every issue contains:
  - **Objective** — the required outcome;
  - **Acceptance criteria** — observable conditions that must be true before closure;
  - **Dependencies** — issue numbers that must be completed first, or `None`.
- Feature issues describe the required behaviour, not the implementation approach.
- Bug issues contain the observed behaviour and the expected behaviour.
- Every implementation branch is associated with an issue.
- Work discovered outside the current issue acceptance criteria becomes a separate issue.
- An issue is closed when its implementation pull request is merged into its target integration branch, or through an explicit no-code resolution recorded in the issue.

### Milestones

- A GitHub Milestone represents exactly one planned release.
- Milestone names are the target Semantic Version, for example `v0.2.0` or `v1.1.3`.
- The first planned POC release uses `v0.1.0`.
- A milestone is created when work for that release is first committed to implementation.
- Every issue committed to a release is assigned to exactly one milestone.
- Backlog issues have no milestone.
- An issue is moved to another milestone only when its target release changes.
- A milestone is closed only after its corresponding Git tag and GitHub Release have been created and production deployment has completed successfully.
- SideGig does not use milestones for themes, workstreams, architecture areas or generic planning periods.

### GitHub Projects

- GitHub Projects is not part of the standard project workflow.
- Issues, milestones, branches and pull requests are the authoritative development state.
- A project must not duplicate issue or release status in another planning board.

## 3. Git Lifecycle

### Permanent branches

Every project repository has three permanent branches:

- `dev`
- `staging`
- `main`

#### `dev`

`dev` is the default development and integration branch.

- Normal implementation changes are integrated into `dev`.
- Direct pushes to `dev` are disabled after repository bootstrap.
- Every normal change reaches `dev` through a pull request from an issue-specific branch.
- A pull request must pass the required change-validation gate before merge.
- `dev` may continue to accept new work after a release branch has been cut.
- A release branch may be created only from a green `dev` commit representing the intended release scope.

#### `staging`

`staging` represents the release candidate currently undergoing pre-production validation.

- Application code is not developed directly on `staging`.
- Direct pushes to `staging` are disabled after repository bootstrap.
- Code reaches `staging` only through a pull request from the active release branch.
- A successful merge to `staging` automatically deploys that release candidate to the staging environment.
- The release candidate on `staging` is subjected to the staging validation gate before production promotion.

#### `main`

`main` represents the production release line.

- Application code is not developed directly on `main`.
- Direct pushes to `main` are disabled after repository bootstrap.
- Code reaches `main` only through a pull request from a release branch that has passed staging validation.
- Production/public deployment is performed from an immutable release tag created from the validated production commit.

### Development branches

Normal implementation branches are created from the current `dev` branch.

Branch names use:

- `feature/<issue-number>-<slug>`
- `fix/<issue-number>-<slug>`

Examples:

- `feature/42-add-pagination`
- `fix/57-handle-empty-response`

One branch implements one issue. A development branch is deleted after merge.

### Pull requests into `dev`

- Every implementation change reaches `dev` through a pull request.
- The pull request references the issue it closes.
- Required CI checks must pass before merge.
- The final diff is reviewed by the developer before merge, including agent-generated changes.
- Short-lived issue branches are squash-merged into `dev`.
- The squash commit title uses the pull-request title.
- Merge remains an explicit human action; coding agents do not merge their own pull requests.

### Release branches

A release candidate is represented by a temporary branch named:

`release/vMAJOR.MINOR.PATCH`

The release branch is cut from a green `dev` commit that represents the intended release scope.

Once the release branch has been created:

- its functional scope is frozen except for fixes required to make that release candidate acceptable;
- `dev` may continue to receive work for later releases;
- normal feature development is not added to the release branch;
- fixes discovered during release validation are represented by bug issues and implemented through issue-specific fix branches created from the active release branch;
- those fix branches are merged into the release branch through pull requests and the updated candidate is revalidated;
- all release-branch fixes must also be merged back into `dev` before the release branch is deleted.

Release branches are temporary and are deleted after successful production release and reconciliation with `dev`.

### Promotion from release branch to `staging`

Promotion to staging is performed through a pull request from the active release branch to `staging`.

The promotion pull request:

- identifies the exact release candidate being proposed;
- executes the full automated release-candidate validation suite;
- cannot merge while any required check is failing;
- is merged using a normal merge commit so that release lineage remains explicit;
- triggers automatic deployment of the resulting `staging` state to the staging environment.

Individual feature commits are not cherry-picked from `dev` into `staging`.

### Promotion from release branch to `main`

After the release candidate has passed staging validation, the same active release branch is promoted to `main` through a pull request.

The production promotion:

- must contain the same validated application state as the staging release candidate, apart from release metadata that does not alter application behaviour;
- must rerun the required production-promotion checks;
- is merged using a normal merge commit;
- is followed by creation of the release tag and GitHub Release;
- triggers production/public deployment from the release tag.

Application fixes are never made directly on `staging` or `main`.

### Branch protection

After repository bootstrap:

- `dev`, `staging` and `main` reject direct normal pushes;
- force pushes are disabled;
- branch deletion is disabled;
- required pull-request and CI checks must pass before merge;
- promotion merges remain explicit human actions;
- coding agents do not bypass branch protection or merge their own pull requests.

## 4. Development Lifecycle

Every normal implementation change follows this lifecycle:

1. Create or refine the GitHub Issue.
2. Confirm its objective, acceptance criteria and dependencies.
3. Assign it to the target release milestone when it is committed for implementation.
4. Confirm the HLD and implementation plan remain valid for the change; update them before coding if they do not.
5. Create the issue branch from `dev`.
6. Implement the issue and its automated tests.
7. Run the complete local validation command.
8. Open a pull request targeting `dev`.
9. Execute the required pull-request validation and resolve failures.
10. Review the complete diff and acceptance-criteria evidence.
11. Squash-merge the approved change into `dev`.
12. Delete the source branch.
13. Close the issue through the merged pull request.

Release preparation follows this lifecycle:

14. Confirm the intended release scope and milestone.
15. Confirm the selected `dev` commit is green under the integrated development validation suite.
16. Create `release/vMAJOR.MINOR.PATCH` from that `dev` commit.
17. Open the release promotion pull request to `staging`.
18. Pass the release-candidate validation gate and merge to `staging`.
19. Deploy the candidate automatically to the staging environment.
20. Execute the staging validation gate.
21. Resolve any release defects through bug issues and release-based fix branches, then repeat the applicable validation steps.
22. Open the production promotion pull request from the validated release branch to `main`.
23. Pass the production-promotion checks and merge to `main`.
24. Create the version tag and GitHub Release.
25. Deploy the tagged release to production/public environment.
26. Merge any release-only fixes back into `dev`.
27. Delete the release branch.
28. Close the release milestone.

Untracked implementation work is not allowed.

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

CI/CD implements three quality gates: change validation into `dev`, release-candidate validation into `staging`, and deployed validation before promotion to `main`.

### Change validation — issue branch to `dev`

Every pull request targeting `dev` executes the standard automated change-validation suite.

The mandatory baseline is:

1. formatting verification;
2. linting;
3. type checking;
4. unit tests;
5. relevant automated component or integration tests;
6. build or package validation;
7. automated issue-specific acceptance tests where applicable.

A failed required check blocks merge.

### Integrated development validation — `dev`

The integrated `dev` state is continuously validated using the repository-wide automated regression suite.

A release branch may be cut only from a `dev` commit for which the required integrated validation is green.

### Release-candidate validation — release branch to `staging`

Every pull request from a release branch to `staging` reruns the complete automated validation suite against the exact candidate being promoted.

The release-candidate gate must:

1. execute the complete repository regression suite;
2. execute integration tests that require the combined release state;
3. build the deployable artefact where the project produces one;
4. prevent promotion while any required check fails.

Successful merge automatically deploys the candidate to the staging environment.

Where technically practical, the deployable artefact created for the release candidate is retained and promoted unchanged to production rather than rebuilt.

### Staging validation

The staging environment validates behaviour that requires the deployed application and its real external dependencies or platform environment.

The required staging baseline is:

1. deployment smoke tests;
2. end-to-end functional tests covering the critical user execution path;
3. external API/service integration checks;
4. runtime and environment configuration validation;
5. persistence and material data-flow validation where applicable;
6. logging and operational-observability checks;
7. project-specific platform tests that cannot be meaningfully executed locally;
8. experiment-critical commercial behaviour such as charging, billing or usage metering where applicable.

Project-specific staging tests are defined in the implementation plan and automated wherever practical.

Any failed mandatory staging validation blocks production promotion.

### Production promotion — release branch to `main`

The production-promotion pull request reruns the mandatory repository checks required to ensure that the validated release candidate has not changed unexpectedly.

Production/public deployment is performed from the tagged committed repository state through GitHub Actions or the target platform's controlled deployment mechanism.

Deployment credentials are configured in the GitHub or target-platform secret store required by the deployment workflow.

Routine validation is automated. Merge and promotion decisions remain explicit human actions. SideGig does not require artificial second-person approval for a solo-developed project.

## 8. Agentic Development

- OpenAI Codex is the standard coding agent for SideGig projects.
- Every project repository contains a root `AGENTS.md`.
- SideGig defines a canonical baseline `AGENTS.md` under the development framework once that baseline is created.
- A project `AGENTS.md` extends the SideGig baseline with project-specific commands, architecture constraints and repository instructions.
- Reusable Codex behaviour is implemented as SideGig Codex skills rather than repeated prompt text.
- Codex receives implementation work through a GitHub Issue with explicit acceptance criteria.
- The HLD and implementation plan are authoritative context for architectural and implementation intent.
- For normal development, Codex creates or works on the issue branch based on `dev`.
- For an approved release-fix issue, Codex creates or works on the issue branch based on the active release branch.
- Codex edits code, runs validation and prepares the pull request.
- Codex does not silently expand issue scope.
- Work discovered outside the current issue becomes a new GitHub Issue.
- Codex does not merge its own pull request.
- Human review before merge focuses on the complete diff, acceptance criteria, test evidence and any architectural/documentation changes rather than line-by-line supervision of the agent's implementation process.

## 9. Releases

- SideGig projects use Semantic Versioning: `MAJOR.MINOR.PATCH`.
- Release tags use `vMAJOR.MINOR.PATCH`.
- The release version is identical to the milestone name and release-branch version.
- The first planned POC release is `v0.1.0`.
- A release branch is created only from a green `dev` commit representing the intended release scope.
- A production release is created only after its release candidate has passed the staging validation gate.
- GitHub Releases are the canonical release record.
- The GitHub Release contains:
  - a concise user-visible summary;
  - the merged features and bug fixes included in the release;
  - links to the relevant pull requests or issues.
- SideGig does not maintain a separate manual `CHANGELOG.md`.
- The production deployment uses the immutable release tag.
- After the GitHub Release and production deployment complete successfully, release fixes are reconciled into `dev`, the release branch is deleted and the corresponding milestone is closed.
