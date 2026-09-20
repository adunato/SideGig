# SideGig Development Operating Model

## Status

Draft. This document defines the standard development operating model for all software repositories created under SideGig.

It defines the concrete development conventions used across projects. Project-specific technical decisions belong in the project repository; common development process is defined here once.


## Planned Revision

> **Planning / tracking section.** This section records the agreed structural revision of the operating model and the scope of the next section-by-section iterations. It is not normative operating-model content and should be removed once the target sections have been revised and stabilized.

### 1. Project and Repository Model

Keep this section focused on the durable structure of a SideGig software project: one repository per independently deployable product or service, bootstrap principles, repository-level files and ownership boundaries. Rework the premature README definition so it does not assume a documentation model that has not yet been defined. Incorporate the project-level agentic framework here: standard agent/tooling, purpose of `AGENTS.md`, location and use of reusable skills, and the principle that process-specific skills are described alongside the lifecycle stage they support rather than in a separate Agentic Development section.

### 2. Product Definition and Evolution

Add this as a new top-level section. Initially establish the boundary and purpose rather than fully defining the product-management model: this section will own the durable definition of what the product is, its intended capabilities, product requirements/specification, and how that definition evolves as features are introduced. Explicitly distinguish these durable product artifacts from change-specific implementation artifacts such as HLDs and implementation plans. Detailed artifact definitions will be developed in a later iteration.

### 3. Work Management

Preserve the existing GitHub Issue and milestone model, but make the Issue explicitly the starting point and root traceability object for every software change. Define the handoff from an Issue into the Development Lifecycle and ensure feature and bug issues carry the information needed to determine what subsequent design and planning stages are necessary. Keep milestones focused on release planning rather than change design.

### 4. Git Lifecycle

Retain the agreed `dev` / `staging` / `main` model, release branches, pull-request rules and branch protection. Reconcile the timing of issue branches and workspaces with the revised Development Lifecycle so that change-specific design artifacts, code and validation can evolve in the appropriate change workspace. Git mechanics should implement the lifecycle defined elsewhere rather than define the development methodology themselves.

### 6. Architecture and Design

Reframe this section around durable project-level architecture and design rather than treating a project-level HLD and implementation plan as the primary architecture artifacts. Define how the overall architecture is initially established, which architectural principles and constraints remain durable, and how they are maintained as the product evolves. Establish the relationship between durable architecture and change-specific HLD/LLD artifacts: changes consume the current architecture and update durable architecture when they materially alter it.

### 6. Development Lifecycle

Rewrite this as the core change-centric development process while retaining the Development Lifecycle heading. The lifecycle should begin with the originating GitHub Issue and apply process proportionately according to the nature of the change. Define the sequence involving change workspace, HLD where required, implementation plan, optional LLD, development, validation and integration. Explicitly account for both features and bugs so simple fixes are not forced through unnecessary design ceremony, while material bugs can enter the fuller design path when needed. Also define the obligation for a change to update durable product or architecture artifacts when it alters them. The corresponding Codex skills should be referenced within the relevant lifecycle stages.

### 7. Coding and Quality Baseline

Retain the common implementation standards for TypeScript, Python, formatting, linting, typing, testing, dependency locking and local validation. Review this section after the Development Lifecycle is settled so that its validation commands and quality expectations cleanly support the Development and Validation stages rather than defining a competing process.

### 8. CI/CD

Preserve the main automated control layers: change validation into `dev`, integrated and release-candidate validation, and deployed/staging validation before production. Reconcile these gates with the revised Development Lifecycle so CI acts as automated enforcement and evidence for the lifecycle rather than independently describing how a change is developed. Process-specific automation or future agent skills relating to CI/CD should be described here.

### 10. Releases

Keep this section focused on what happens after changes have been integrated: Semantic Versioning, release scope, release branches, tags, GitHub Releases, promotion and release completion. Check consistency with Work Management, Git Lifecycle and CI/CD once those sections are revised. Any future release-oriented agent skills should be referenced here rather than under a standalone Agentic Development section.

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

## 2. Product Definition and Evolution

### Purpose

Each SideGig product maintains a concise, durable definition of **what the product is intended to do**.

The product definition is the authoritative current-state description of the product's purpose, users, scope, capabilities, externally meaningful behaviour, material requirements, constraints and non-goals. It provides the product-level input to architecture and individual software changes.

It is deliberately separate from:

- commercial and market research, which establishes whether the opportunity is worth pursuing;
- architecture documentation, which describes how the product is technically structured;
- GitHub Issues, which represent individual units of change;
- change-specific HLD, implementation-plan and LLD artifacts, which describe how a particular change will be designed and implemented;
- release records, which describe what was delivered in a particular version.

### Canonical product definition

Every independently deployable SideGig product has one canonical Product Definition artifact created from the [Product Definition template](templates/product-definition.md).

The Product Definition is a **durable current-state artifact**, not a chronology of product changes. Git history, Issues, pull requests and releases provide change history.

The definition contains only the product information needed to make later architecture and change decisions reliably:

- product summary and value;
- intended users and primary use cases;
- explicit in-scope and out-of-scope boundaries;
- product capabilities;
- material product requirements and behaviour;
- externally meaningful interaction or contract;
- product constraints and non-goals;
- unresolved product questions that materially affect scope or behaviour.

Use stable requirement identifiers where they materially improve traceability, but do not create a heavyweight requirements catalogue for its own sake.

SideGig does not require separate roadmap, feature-specification or product-requirements documents by default. Introduce another durable product artifact only when a real project need cannot be represented clearly in the Product Definition, GitHub Issues and change-specific design artifacts.

### Initial product definition

Create the initial Product Definition from the approved upstream context that authorized the product or POC, such as the selected POC definition, productisation decision or equivalent project evidence.

The upstream source remains authoritative for the decision that created the product. The Product Definition translates that decision into the durable product-level specification needed by the software project rather than duplicating the supporting research.

Set the Product Definition to **Approved** once it is sufficiently resolved to act as an input to architecture and change design. Material unresolved questions that affect product scope or behaviour keep it in **Draft**.

For a sole-developer SideGig project, explicit approval by the project owner is sufficient. A second-person approval step is not required.

### Product evolution

The Product Definition is maintained as the product evolves.

Update it when an approved change intentionally alters a durable product characteristic, including:

- product scope;
- user-visible or externally observable behaviour;
- a product capability;
- a material product requirement;
- an external contract;
- a material product constraint or non-goal.

A bug fix that restores already-defined behaviour does not normally require a Product Definition change. If the bug exposes an ambiguity or error in the durable definition, correct the Product Definition as part of the same change.

The Product Definition should always describe the **current approved product**, not preserve obsolete behaviour for historical completeness.

### Relationship to change delivery

The Product Definition is an input to, not a substitute for, the Development Lifecycle.

Individual software changes begin from GitHub Issues. Where a change implements or modifies product behaviour, its Issue and downstream design artifacts reference the relevant Product Definition requirement, capability or section.

Change-specific HLD, implementation-plan and LLD artifacts describe the design and execution of that change. When the completed change intentionally modifies the durable product definition, the Product Definition is updated within the same change before integration is complete.

## 3. Work Management

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

## 4. Git Lifecycle

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

## 5. Architecture and Design

### Purpose

Each SideGig product maintains a concise, durable definition of its **current approved technical architecture**.

The Architecture Definition describes how the product is structurally designed: its system boundary, major components and responsibilities, principal flows, interfaces and integrations, material data/state, deployment shape, cross-cutting architectural concerns, and durable technical constraints or principles.

It is deliberately separate from:

- the Product Definition, which describes what the product is intended to do;
- GitHub Issues, which represent individual units of change;
- change-specific HLD and LLD artifacts, which design a particular change;
- the Implementation Plan, which translates an approved change design into repository-level implementation work;
- code and configuration, which remain the executable implementation.

### Canonical architecture definition

Every independently deployable SideGig product has one canonical Architecture Definition artifact created from the [Architecture Definition template](templates/architecture-definition.md).

The Architecture Definition is a **durable current-state artifact**, not a historical record of architectural changes. Git history, Issues and change-specific design artifacts provide that history.

The definition contains only architecture information that materially helps a developer or coding agent understand and change the system safely:

- system context and product boundary;
- major components and their responsibilities;
- principal system flows;
- material interfaces and integrations;
- material data/state ownership and movement;
- deployment and runtime shape;
- cross-cutting concerns that materially shape the design;
- durable architectural principles and constraints;
- unresolved architecture questions that affect future design or implementation.

Do not turn the Architecture Definition into an exhaustive inventory of classes, files, endpoints or implementation detail. Those belong in code, configuration and change-specific design artifacts.

### Initial architecture definition

Create the initial Architecture Definition from the approved [Product Definition template](templates/product-definition.md) and the technical context available when implementation of the product is first being established.

The architecture should be proportional to the product. A small POC may have a correspondingly small architecture definition; the model does not require artificial components, layers or infrastructure merely to satisfy the template.

Set the Architecture Definition to **Approved** once it is sufficiently resolved to act as the durable technical context for change design and implementation. Material unresolved questions that prevent safe implementation keep it in **Draft**.

For a sole-developer SideGig project, explicit approval by the project owner is sufficient. A second-person architecture approval step is not required.

### Architecture evolution

The Architecture Definition is maintained as the product evolves.

Update it when an approved change intentionally alters a durable architectural characteristic, including:

- the system boundary or deployment shape;
- a major component or its responsibility;
- a material interface or integration;
- material data ownership, persistence or flow;
- a cross-cutting architectural approach;
- a durable technology, platform or design constraint.

A change that only modifies implementation detail within the existing architecture does not require an Architecture Definition update.

A bug fix that restores behaviour within the existing architecture does not normally require an architecture update. If the bug reveals that the durable architecture is inaccurate or incomplete, correct the Architecture Definition as part of the same change.

The Architecture Definition should always describe the **current approved architecture**, not preserve superseded structures for historical completeness.

### Relationship to change delivery

The Architecture Definition is an input to, not a substitute for, the Development Lifecycle.

Where a change affects architecture, its GitHub Issue and change-specific HLD reference the relevant parts of the current Product Definition and Architecture Definition. The HLD describes the proposed architectural change in the context of that individual change.

When the approved change materially alters the durable architecture, the Architecture Definition is updated within the same change before integration is complete.

## 6. Development Lifecycle

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

## 7. Coding and Quality Baseline

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

## 8. CI/CD

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

## 9. Agentic Development

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

## 10. Releases

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
