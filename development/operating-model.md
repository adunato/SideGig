# SideGig Development Operating Model

## Status

Draft. This document defines the standard development operating model for all software repositories created under SideGig.

It defines the concrete development conventions used across projects. Project-specific technical decisions belong in the project repository; common development process is defined here once.


## Planned Revision

> **Planning / tracking section.** This section records the agreed structural revision of the operating model and the scope of the section-by-section iterations. It is not normative operating-model content and should be removed once the target sections have been revised and stabilized.

### 1. Project and Repository Model

Revise last, once the durable product, architecture, GitHub, development, quality and CI/CD models are known. Define the final repository structure, bootstrap contents, README, AGENTS.md, agentic framework and locations of canonical project artifacts without assuming document structures that have not yet been settled.

### 2. Product Definition and Evolution

Defined in the current model. Maintain one concise durable Product Definition describing the current approved product intent, requirements and externally meaningful behaviour. Revisit only for final consistency after downstream sections are finalized.

### 3. Architecture and Design

Defined in the current model. Maintain one concise durable Architecture Definition describing the current approved technical architecture. Revisit only for final consistency after downstream sections are finalized.

### 4. GitHub Delivery Model

Defined in the current model. GitHub Issues, Milestones, branches, pull requests, release candidates, tags, GitHub Releases and protection rules form the delivery-control layer. Revisit only for consistency after CI/CD and repository bootstrap are finalized.

### 5. Development Lifecycle

Defined in the current model. The lifecycle starts from the originating GitHub Issue, creates the change workspace, applies HLD / Implementation Plan / LLD proportionately, then performs development, durable-document updates, validation and integration.

### 6. Coding and Quality Baseline

Defined in the current model. The baseline supplies pragmatic coding, formatting, linting, typing, testing, dependency and reproducible local-validation standards to Development and Validation without defining a separate workflow.

### 7. CI/CD

Defined in the current model. CI/CD reuses the repository validation contract and automates change, integrated, release-candidate, staging and production gates while preserving explicit human merge and promotion decisions. Revisit only for final consistency after repository/bootstrap structure is finalized.


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

### Agentic development framework

- OpenAI Codex is the standard coding agent for SideGig software projects.
- Every project repository contains a root `AGENTS.md` providing repository-specific instructions and constraints.
- SideGig owns reusable agent skills and canonical agent guidance; project repositories receive or extend those assets through the repository bootstrap model.
- Reusable workflow behaviour is implemented as skills rather than repeated prompt text.
- Process-specific agent behaviour is defined alongside the operating-model process it supports rather than in a separate parallel lifecycle.
- Coding agents do not bypass repository controls or perform human merge/promotion decisions.

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

## 3. Architecture and Design

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

## 4. GitHub Delivery Model

### Purpose

GitHub is the canonical control system for SideGig software delivery.

This section defines the GitHub artifacts and state transitions used to represent, integrate and release software work. It does not define how a change is designed or implemented; that belongs to the Development Lifecycle. It also does not redefine automated validation or deployment behaviour; those controls belong to CI/CD.

The core GitHub artifacts are:

- **Issues** — individual units of software change and the root traceability record;
- **Milestones** — planned release scope;
- **change branches** — isolated Git state for one Issue;
- **pull requests** — controlled integration and promotion records;
- **permanent branches** — the development, staging and production lines;
- **release branches** — temporary immutable-in-scope release candidates;
- **tags and GitHub Releases** — immutable production release records.

### Issues

Every software change is represented by a GitHub Issue before implementation begins.

The Issue is the root traceability reference for the change. Downstream design artifacts, implementation work, pull requests and release records reference the originating Issue where applicable.

SideGig uses two standard Issue type labels:

- `feature`
- `bug`

One Issue represents one independently mergeable outcome.

Feature Issues are created using the [Feature Issue template](templates/feature-issue.md) and contain:

- the required outcome;
- observable acceptance criteria;
- relevant Product Definition or Architecture Definition context where material;
- dependencies on other Issues, or `None`.

Bug Issues are created using the [Bug Issue template](templates/bug-issue.md) and contain:

- observed behaviour;
- expected behaviour;
- observable acceptance criteria;
- relevant Product Definition or Architecture Definition context where material;
- dependencies on other Issues, or `None`.

Issues describe required outcomes and evidence, not implementation design. The Development Lifecycle determines what design and planning artifacts are required to execute the Issue.

Work discovered outside the current Issue scope becomes a separate Issue rather than silently expanding the active change.

An Issue is closed when its implementation has been integrated into its target integration branch, or through an explicit no-code resolution recorded in the Issue.

### Milestones

A GitHub Milestone represents exactly one planned release.

Milestone names use the target Semantic Version, for example `v0.2.0` or `v1.1.3`.

- The first planned POC release uses `v0.1.0`.
- A milestone is created when work is first committed to that release.
- Every Issue committed to a release is assigned to exactly one milestone.
- Backlog Issues may remain without a milestone.
- An Issue moves between milestones only when its target release changes.
- SideGig does not use milestones for themes, architecture areas, generic workstreams or planning periods.
- A milestone is closed only after its corresponding production release has completed successfully.

The milestone expresses intended release scope. The actual release candidate is the Git commit selected when the release branch is created.

### Permanent branches

Every project repository has three permanent branches:

- `dev`
- `staging`
- `main`

#### `dev`

`dev` is the default development and integration branch.

Normal completed changes are integrated into `dev` through pull requests. Direct normal pushes are disabled after repository bootstrap.

A release branch may be created only from a `dev` commit that is green under the required integrated validation.

#### `staging`

`staging` represents the release candidate currently deployed for pre-production validation.

Application changes are not developed directly on `staging`. Code reaches `staging` only through a promotion pull request from the active release branch.

#### `main`

`main` represents the production release line.

Application changes are not developed directly on `main`. Code reaches `main` only through a production-promotion pull request from a release branch that has passed staging validation.

Production/public deployment is performed from the immutable release tag associated with the validated production commit.

### Change branches

Normal change branches are created from the current `dev` branch and are associated with exactly one Issue.

Branch names use:

- `feature/<issue-number>-<slug>`
- `fix/<issue-number>-<slug>`

Examples:

- `feature/42-add-pagination`
- `fix/57-handle-empty-response`

A change branch is deleted after successful integration.

A bug discovered while validating an active release candidate is represented by a Bug Issue. Its fix branch is created from the active release branch rather than from `dev`, then reconciled back into `dev` after the release.

### Pull requests

Pull requests are the controlled GitHub mechanism for integrating changes and promoting releases.

For normal changes:

- the pull request targets `dev`;
- it references the Issue it resolves;
- required CI checks must pass before merge;
- the complete diff and acceptance-criteria evidence are reviewed before merge;
- the change branch is squash-merged into `dev`;
- the source branch is deleted after merge.

For release-fix branches, the pull request targets the active release branch and follows the same Issue traceability and validation principles.

Promotion pull requests between release, staging and production branches use normal merge commits so release lineage remains explicit.

Merge and promotion remain explicit human actions. Coding agents do not merge their own pull requests.

### Release branches and release scope

A release candidate is represented by a temporary branch named:

`release/vMAJOR.MINOR.PATCH`

The release branch is cut from a green `dev` commit representing the intended release scope.

Once created:

- the release scope is frozen except for fixes required to make the candidate acceptable;
- `dev` may continue to receive work for later releases;
- normal feature development is not added to the release branch;
- individual features are not cherry-picked from `dev` as the normal release-selection mechanism;
- release defects are handled through Bug Issues and fix branches based on the active release branch;
- release-only fixes are reconciled back into `dev` before the release branch is deleted.

The release branch is temporary and is deleted after successful production release and reconciliation.

### Promotion to staging

Promotion to staging is performed through a pull request from the active release branch to `staging`.

The promotion pull request identifies the exact release candidate and is subject to the release-candidate checks defined in CI/CD.

Successful merge:

- uses a normal merge commit;
- preserves the candidate lineage;
- triggers deployment of the resulting `staging` state to the staging environment.

A failed required check or failed mandatory staging validation blocks production promotion.

### Promotion to production

After staging validation passes, the same active release branch is promoted to `main` through a pull request.

The production promotion must represent the same validated application state as the staging candidate, apart from release metadata that does not alter application behaviour.

After successful merge:

1. create the immutable release tag;
2. create the corresponding GitHub Release;
3. deploy production/public service from the tagged release state;
4. reconcile any release-only fixes back into `dev`;
5. delete the release branch;
6. close the corresponding milestone.

Application fixes are never made directly on `staging` or `main`.

### Versioning and release records

SideGig projects use Semantic Versioning:

`MAJOR.MINOR.PATCH`

Release tags use:

`vMAJOR.MINOR.PATCH`

For a release, the milestone name, release-branch version, Git tag and GitHub Release version are identical.

GitHub Releases are the canonical release record. Each release contains:

- a concise user-visible summary;
- the features and bug fixes included in the release;
- links to the relevant Issues or pull requests.

SideGig does not maintain a separate manual `CHANGELOG.md`. GitHub Issues, pull requests, tags and Releases provide the delivery history.

### Branch protection

After repository bootstrap:

- `dev`, `staging` and `main` reject direct normal pushes;
- force pushes are disabled;
- deletion of permanent branches is disabled;
- required pull-request and CI checks must pass before merge;
- promotion merges remain explicit human actions;
- coding agents do not bypass branch protection or merge their own pull requests.

### GitHub Projects

GitHub Projects is not part of the standard SideGig delivery model.

Issues, Milestones, branches, pull requests, tags and GitHub Releases are the authoritative GitHub delivery state. SideGig does not duplicate that state in a separate planning board.

### Delivery flow summary

Normal change:

`Issue → change branch → pull request → dev`

Release:

`Milestone scope on dev → release branch → staging promotion → main promotion → tag → GitHub Release`

Release fix:

`Bug Issue → fix branch from release branch → pull request to release branch → revalidation → reconciliation into dev`

## 5. Development Lifecycle

### Purpose

The Development Lifecycle defines how one approved GitHub Issue is turned into an integrated software change.

The [GitHub Delivery Model](#4-github-delivery-model) owns the delivery artifacts and state transitions: Issues, branches, pull requests and integration. This section owns the engineering process performed within that structure: design where needed, implementation planning where needed, development, validation and integration hand-off.

The lifecycle is deliberately proportional. SideGig does not require HLD, implementation-plan or LLD artifacts for a change merely because those templates exist. Each artifact is created only when it adds enough clarity or control to justify its cost.

Every implementation change remains traceable to one originating GitHub Issue.

### Lifecycle inputs

Before execution begins, the originating Issue must define the required outcome and acceptance criteria sufficiently to begin work.

Use as current context:

- the originating GitHub Issue;
- the current Product Definition;
- the current Architecture Definition;
- repository instructions, including `AGENTS.md`;
- relevant existing code and tests;
- the target release milestone when the Issue has been committed to a release.

A normal change is based on `dev`. A release-fix Issue is based on the active release branch as defined by the GitHub Delivery Model.

### 1. Establish the change workspace

Create or adopt the Issue-specific branch/worktree before change-specific design or implementation begins.

Use the [Setup Change Workspace skill](../implementation/skills/setup-change-workspace/SKILL.md).

The workspace must:

- be associated with the originating Issue;
- use the correct base branch;
- preserve unrelated work;
- contain or reference the current Product Definition and Architecture Definition;
- be safe for the design artifacts, code and tests for that Issue to evolve together.

Workspace creation does not require an HLD or implementation plan to exist first.

### 2. Determine the required design and planning depth

Determine proportionately which change-specific artifacts are required.

No separate classification document is created. Where an artifact is intentionally omitted, record the rationale concisely in the Issue, pull request or next required artifact.

#### HLD decision

Create a change-specific HLD when the change requires a material design decision.

An HLD is normally required when the change:

- introduces or materially changes product behaviour or capability;
- changes the durable Architecture Definition;
- changes a material external interface, integration, data model, ownership boundary or system flow;
- spans components in a way that requires an explicit design decision;
- introduces material security, reliability, performance, cost or compatibility risk;
- has multiple credible design approaches whose choice should be resolved before implementation.

Feature Issues will normally require an HLD.

A simple Bug Issue may omit the HLD when the expected behaviour is already clear, the correction is localized, the durable product and architecture remain unchanged, and no material design decision is needed.

Use the [High-Level Design template](../implementation/templates/high-level-design.md) and [High-Level Design skill](../implementation/skills/high-level-design/SKILL.md) when required.

#### Implementation Plan decision

Create an Implementation Plan when the implementation itself requires meaningful repository-level planning.

An Implementation Plan is required when:

- an HLD is required;
- implementation spans multiple meaningful repository areas or has sequencing/dependency constraints;
- the required code changes are not obvious from the Issue and current repository structure;
- validation, migration, compatibility or integration work needs explicit planning;
- implementation risk warrants a written plan before editing.

An Implementation Plan may therefore be required even when no HLD is needed.

A simple localized Bug Issue may omit both HLD and Implementation Plan.

Use the [Implementation Plan template](../implementation/templates/implementation-plan.md) and [Implementation Plan skill](../implementation/skills/implementation-plan/SKILL.md) when required.

#### LLD decision

An LLD is never required by default.

When an Implementation Plan exists, it must explicitly decide whether an LLD is required. Create one only when file-level responsibilities, cross-file coupling or repository-specific implementation detail cannot be represented clearly enough in the Issue, HLD (if present) and Implementation Plan.

Use the [Low-Level Design template](../implementation/templates/low-level-design.md) and [Low-Level Design skill](../implementation/skills/low-level-design/SKILL.md) when required.

### 3. Complete required change design

Where an HLD is required, complete and approve it before implementation planning or development proceeds.

The HLD:

- starts from the Issue and the current Product/Architecture definitions;
- defines the proposed change design rather than the durable system architecture as a whole;
- records material behaviour, interfaces, data/state, error handling and validation considerations;
- identifies whether the completed change is expected to alter the durable Product Definition or Architecture Definition;
- avoids file-level implementation prescriptions.

For a sole-developer SideGig project, approval by the project owner is sufficient.

If no HLD is required, the Issue and durable project documentation remain the authoritative behavioural/design context.

### 4. Complete required implementation planning

Where an Implementation Plan is required, complete and approve it before development proceeds.

The plan:

- references the approved HLD when one exists;
- may explicitly state that no HLD was required;
- inspects the actual repository before prescribing implementation work;
- defines the implementation areas and meaningful sequence;
- defines relevant local integrity and validation requirements;
- makes the explicit LLD decision.

The plan should be detailed enough to remove material implementation ambiguity without becoming a patch description.

### 5. Complete LLD where required

Create an LLD only when the approved Implementation Plan states `LLD required: Yes`.

The LLD describes significant file-level responsibilities and dependencies. It does not contain a diff or line-by-line patch instructions.

Approve the LLD before development proceeds.

### 6. Develop the change

Use the [Development skill](../implementation/skills/development/SKILL.md).

Development uses:

- the GitHub Issue as the scope and acceptance contract;
- the HLD, Implementation Plan and LLD only when those artifacts were required;
- the current Product Definition and Architecture Definition;
- repository instructions and coding/quality rules.

Implement only the approved Issue scope and add or update automated tests proportionately.

Minor implementation adjustments may be made without reopening design when they do not change product behaviour, architecture, interfaces, data ownership, scope or another material decision.

A material deviation returns to the appropriate Issue, HLD or Implementation Plan rather than being silently absorbed during coding.

### 7. Update durable product and architecture documentation

Durable documentation changes are part of the software change, not a later housekeeping activity.

Update the Product Definition in the same change when the intended product scope, capability, externally observable behaviour, requirement, contract, constraint or non-goal changes.

A bug fix that merely restores already-defined behaviour does not normally change the Product Definition.

Update the Architecture Definition in the same change when the durable system boundary, component model, interface/integration structure, data ownership/flow, deployment shape or material architectural principle changes.

Implementation detail that remains within the existing architecture does not require an Architecture Definition update.

Where required, these durable-document updates are included on the same change branch and in the same pull request as the implementation.

### 8. Validate the change

Use the [Validation skill](../implementation/skills/validation/SKILL.md).

Validation starts from the Issue acceptance criteria and also considers every required change-specific artifact.

Validation must be proportionate to the change and cover, where material:

- the changed behaviour;
- relevant edge and error cases;
- regression risk;
- material integrations and system flows;
- the repository integrity checks defined by the Coding and Quality Baseline;
- consistency of the resulting Product Definition and Architecture Definition.

Implementation defects found during validation may be corrected within the existing scope and retested.

If validation reveals a material scope, product, architecture or design change, return to the relevant lifecycle stage rather than redefining the change during validation.

### 9. Integrate the validated change

Use the [Merge Change skill](../implementation/skills/merge-change/SKILL.md) for integration hand-off and safe workspace closure.

The validated change is integrated according to the GitHub Delivery Model.

For a normal change:

1. open or update the pull request from the Issue branch to `dev`;
2. reference the originating Issue;
3. include the relevant HLD / Implementation Plan / LLD references where they exist;
4. summarize the implemented outcome and validation evidence;
5. include any Product Definition or Architecture Definition updates;
6. pass the required CI checks;
7. review the complete diff and acceptance-criteria evidence;
8. perform the explicit human merge;
9. confirm integration before deleting the change branch/worktree.

A release-fix Issue follows the same lifecycle but targets the active release branch and is later reconciled into `dev` according to the GitHub Delivery Model.

Coding agents may prepare the pull request and integration evidence but do not bypass CI/branch protection or perform their own human merge decision.

### Feature and bug paths

The lifecycle is not two separate processes. Feature and Bug Issues use the same stages with different typical depth.

Typical feature path:

`Issue → workspace → HLD → Implementation Plan → optional LLD → development → validation → pull request → integration`

Simple bug path:

`Issue → workspace → development → validation → pull request → integration`

Material bug path:

`Issue → workspace → HLD and/or Implementation Plan as required → optional LLD → development → validation → pull request → integration`

The nature of the decision and implementation risk determines the required artifacts, not the Issue label alone.

### Lifecycle skills

The SideGig lifecycle skills implement this process; they do not define a competing process.

| Stage | Skill | Use |
| --- | --- | --- |
| Workspace | [setup-change-workspace](../implementation/skills/setup-change-workspace/SKILL.md) | Every implemented Issue |
| Change design | [high-level-design](../implementation/skills/high-level-design/SKILL.md) | Only when HLD is required |
| Implementation planning | [implementation-plan](../implementation/skills/implementation-plan/SKILL.md) | Only when a plan is required |
| File-level design | [low-level-design](../implementation/skills/low-level-design/SKILL.md) | Only when the approved plan requires LLD |
| Development | [development](../implementation/skills/development/SKILL.md) | Every implemented Issue |
| Validation | [validation](../implementation/skills/validation/SKILL.md) | Every implemented Issue |
| Integration | [merge-change](../implementation/skills/merge-change/SKILL.md) | Every validated Issue |

### Completion

An implementation change is complete when:

1. the originating Issue acceptance criteria are satisfied;
2. every design/planning artifact required for the change is approved and consistent with the implementation;
3. relevant automated and manual validation is complete;
4. required Product Definition and Architecture Definition updates are included;
5. required CI checks pass;
6. the change is integrated into its target branch through the GitHub Delivery Model;
7. the GitHub Issue is closed through the integrated change or an explicit recorded resolution.

Untracked implementation work is not allowed.

## 6. Coding and Quality Baseline

### Purpose

The Coding and Quality Baseline defines the common implementation standards that every SideGig software repository follows.

It supports the Development and Validation stages of the [Development Lifecycle](#5-development-lifecycle). It does not define a separate workflow and does not create additional quality documents.

The baseline has two practical goals:

- keep code mechanically consistent and easy for a developer or coding agent to inspect and change;
- provide one reproducible local validation contract that can also be enforced by CI.

Project-specific requirements may extend this baseline where the product or platform genuinely requires them.

### General coding principles

- Follow the existing repository structure and established patterns unless an approved change intentionally alters them.
- Prefer the simplest implementation that satisfies the Issue and approved design.
- Keep responsibilities explicit and avoid unnecessary abstraction, indirection or framework introduction.
- Remove dead code created by the change rather than leaving obsolete paths behind.
- Do not mix unrelated refactoring into an Issue unless it is required to implement the approved outcome safely.
- Do not weaken linting, typing or tests merely to make a change pass.
- Generated code and external/vendor material are excluded from normal style rules where applying them would add no value.

### TypeScript baseline

For TypeScript repositories:

- application code uses TypeScript rather than new JavaScript application modules;
- TypeScript `strict` mode is enabled;
- Prettier is the formatter;
- ESLint is the linter;
- Vitest is the default unit-test framework;
- project configuration may add framework-specific test tooling where required.

Existing JavaScript may be retained where conversion is unrelated to the active change. SideGig does not require opportunistic migration of otherwise valid code merely to satisfy the baseline.

### Python baseline

For Python repositories:

- Ruff is the formatter and linter;
- Pyright is the type checker;
- pytest is the test framework;
- project configuration defines the supported Python version and material type-checking exclusions explicitly.

Existing project conventions may be retained where changing them would create unrelated migration work, but new code follows the current repository standard.

### Automated testing

Automated tests are proportionate to the behaviour and regression risk of the change.

As a baseline:

- a feature adds or updates automated tests for its material acceptance behaviour where that behaviour can reasonably be automated;
- a bug fix adds a regression test where practical so the corrected behaviour remains protected;
- changed error and edge-case behaviour is tested where it is material;
- existing relevant tests are updated when intentional behaviour changes make their previous expectations obsolete;
- tests should exercise externally meaningful behaviour or stable component contracts rather than duplicate implementation details unnecessarily.

Use the lowest test level that proves the behaviour reliably:

1. unit tests for isolated logic;
2. component, API, contract or integration tests where behaviour crosses a meaningful boundary;
3. end-to-end tests for critical flows that cannot be proved adequately at a lower level.

SideGig does not impose a repository-wide code-coverage percentage. Coverage metrics may be used as diagnostic information, but acceptance is based on whether material changed behaviour and regression risk are adequately tested.

Manual validation is used when behaviour cannot reasonably be automated or when real platform/environment interaction is itself part of the requirement. It supplements rather than replaces practical automated coverage.

### Development integrity checks

During Development, run the checks needed to keep the changed scope mechanically sound while implementation is in progress.

Typical integrity checks include:

- formatting;
- linting;
- type checking;
- changed-scope or targeted automated tests;
- build, compile or package checks where relevant.

These checks are intentionally fast and may be run selectively while coding.

Before hand-off to Validation, the implementation must be in a state where the repository's complete local validation command can reasonably be expected to pass. A known unrelated repository failure must be identified explicitly rather than silently treated as an implementation failure or ignored.

### Repository validation contract

Every software repository exposes one documented root command that executes its complete local validation suite.

For Node.js / TypeScript repositories:

`npm run validate`

For Python repositories:

`make validate`

Where a target platform or project convention makes those commands inappropriate, the repository may define an equivalent single command, but `AGENTS.md` and the README must identify it unambiguously.

The complete validation command runs the repository-applicable checks for:

1. formatting verification;
2. linting;
3. type checking;
4. automated tests;
5. build, compile or package validation where applicable.

Project-specific validation may extend this command with additional deterministic local checks when they materially protect the product.

The command must return a non-zero exit status when a required check fails.

### Validation-stage expectations

The Validation stage uses the repository validation contract as the baseline regression check, then adds the change-specific evidence required by the Issue and any applicable HLD / Implementation Plan / LLD.

Validation therefore normally includes:

- the complete local validation command;
- acceptance-criteria-specific tests or evidence;
- relevant integration or end-to-end validation not already covered by the local baseline;
- required manual validation;
- confirmation that Product Definition and Architecture Definition updates are consistent with the implemented behaviour.

A validation failure caused by the active change is corrected within the approved scope and rerun.

A pre-existing, environmental or intermittent failure is identified explicitly. It must not be represented as a passing check, but it does not automatically require unrelated corrective work to be absorbed into the current Issue.

### Dependencies and reproducibility

- Dependency lockfiles are committed.
- CI installs dependencies from the committed lockfile.
- Dependency changes are intentional and included in the change diff.
- Do not add a dependency when the required behaviour can be implemented simply and safely with the existing stack.
- Repository setup and validation must not depend on undocumented local machine state.

### Quality completion boundary

A change is ready to leave Development when:

- the approved implementation scope is complete;
- relevant automated tests have been added or updated;
- changed-scope integrity checks pass;
- no known implementation-caused mechanical failure remains.

A change is ready to leave Validation when:

- the Issue acceptance criteria have been demonstrated;
- the complete applicable repository validation suite passes, except for explicitly identified unrelated/environmental conditions;
- material regression risk has been covered proportionately;
- required integration, end-to-end and manual checks are complete;
- required durable Product Definition and Architecture Definition updates are consistent with the implementation.

## 7. CI/CD

### Purpose

CI/CD automates the quality gates and deployments that enforce the [GitHub Delivery Model](#4-github-delivery-model) and support the [Development Lifecycle](#5-development-lifecycle).

CI/CD does not define a separate engineering process. It reuses the repository validation contract from the [Coding and Quality Baseline](#6-coding-and-quality-baseline), adds the checks that require integrated or deployed environments, and records whether a GitHub state transition is safe to perform.

Automation should be proportional to the product. A small POC does not require production-scale deployment infrastructure, but every repository must automate the checks that materially protect its delivery path.

### CI/CD principles

- Local and CI validation use the same underlying repository commands wherever practical.
- Required automated checks fail closed: a failed required check blocks the corresponding merge or promotion.
- CI runs against the exact Git commit proposed for integration or promotion.
- Deployment credentials and other secrets are held in GitHub or the target platform's secret store, never committed to the repository.
- Deployment configuration is version-controlled where the target platform permits it.
- A deployment should be reproducible from repository state plus explicitly managed environment configuration.
- Merge and promotion decisions remain explicit human actions for a sole-developer project; automation supplies evidence and execution, not an artificial second-person approval.
- Coding agents may inspect CI results and rectify in-scope failures, but do not bypass required checks, branch protection or human promotion decisions.

### 1. Change validation — change branch to `dev`

Every pull request targeting `dev` runs the standard change-validation gate.

The gate must execute the repository's complete local validation contract, normally:

- `npm run validate` for Node.js / TypeScript repositories;
- `make validate` for Python repositories;
- the explicitly documented equivalent where a project uses another stack.

The validation contract already owns formatting, linting, type checking, automated tests and build/package checks. CI should call that contract rather than independently reimplementing the same sequence.

The pull request may add deterministic change-specific checks where they cannot reasonably be included in the common repository command.

A required failure blocks merge into `dev`.

The pull request remains the evidence record linking:

- the originating Issue;
- required HLD / Implementation Plan / LLD artifacts where they exist;
- the implementation diff;
- local and CI validation;
- required Product Definition or Architecture Definition updates.

### 2. Integrated validation — `dev`

After changes are merged, `dev` is validated as the integrated development line.

At minimum, the same complete repository validation contract runs against the resulting `dev` commit.

Add broader integration or regression checks at this stage only when they materially benefit from the combined `dev` state and are unsuitable for every change-branch pull request.

A release branch may be cut only from a specific `dev` commit for which all required integrated checks are green.

A later failure on `dev` does not silently invalidate completed Issues, but it must be resolved before that state can be selected as a release candidate.

### 3. Release-candidate validation and staging deployment

A pull request from `release/vMAJOR.MINOR.PATCH` to `staging` represents the proposed release candidate.

Before the promotion pull request can merge, CI validates the exact release-branch commit being proposed.

The release-candidate gate includes:

- the complete repository validation contract;
- material integrated regression or compatibility checks;
- creation or verification of the deployable artifact where the product has one;
- any deterministic packaging or platform checks required before deployment.

A required failure blocks promotion to `staging`.

After the promotion pull request is explicitly merged, the resulting staging state is deployed automatically to the staging or pre-production environment.

Where technically practical, create the deployable artifact once for the release candidate and retain it for later production promotion. Where the target platform necessarily rebuilds from source, production must build from the same validated repository state and controlled build definition.

### 4. Staging validation

Staging validates behaviour that cannot be established adequately from repository-local or build-time checks.

The applicable staging scope is determined by the product architecture, platform and release risk. It may include:

- deployment smoke tests;
- the critical end-to-end execution path;
- external service or platform integrations;
- environment and runtime configuration;
- persistence and material data flows;
- authentication, permissions or secret integration;
- logging and operational visibility;
- platform-specific execution behaviour;
- charging, billing, metering or other commercial mechanics where they are part of the product.

Automate staging checks where doing so is reliable and proportionate.

Manual validation is acceptable when the behaviour genuinely requires human observation or when automating a low-frequency platform check would add disproportionate complexity. Required manual evidence must be recorded before production promotion.

Not every repository requires every category above. The Architecture Definition and relevant change/release context determine what is material.

A failed required staging check blocks production promotion. Corrective software work follows the release-fix path defined by the GitHub Delivery Model and is revalidated through the applicable gates.

### 5. Production promotion and deployment

After the release candidate has passed required staging validation, the active release branch may be proposed for promotion to `main`.

The production-promotion pull request must verify that the proposed production state corresponds to the validated release candidate.

CI reruns the minimum deterministic checks needed to detect unexpected divergence or packaging failure. It does not need to repeat expensive staging-only tests whose evidence is tied unambiguously to the same candidate.

The pull request remains blocked when:

- the candidate differs materially from the staged state;
- a required promotion check fails;
- required staging evidence is incomplete;
- a known release blocker remains unresolved.

After the explicit human merge to `main`:

1. create the immutable Semantic Version tag defined by the GitHub Delivery Model;
2. create the corresponding GitHub Release;
3. deploy production/public service from that tagged state;
4. verify deployment success with a proportionate smoke or health check.

Production deployment is therefore traceable to an immutable release tag rather than to an arbitrary mutable branch head.

### Deployment failures

A failed production deployment does not create an untracked repair path.

If deployment can be retried safely without changing application or configuration state, retry the same tagged release.

If correction requires a code or version-controlled configuration change:

1. record a Bug Issue;
2. follow the release-fix change lifecycle;
3. validate the corrected release candidate;
4. promote and release the corrected state through the normal GitHub Delivery Model.

Do not patch application code directly in the production environment.

### Environments and configuration

Repositories define only the environments the product genuinely needs.

The standard delivery model recognizes:

- **development/integration** — represented by `dev`;
- **staging/pre-production** — represented by `staging` and the target staging environment;
- **production** — represented by `main`, an immutable release tag and the production environment.

A target platform may not expose a conventional long-lived staging environment. In that case, use the closest isolated pre-production or candidate-validation mechanism available and document the project-specific mapping in the Architecture Definition and repository deployment configuration.

Environment-specific values are configuration, not source-code forks. The same application implementation is promoted through environments.

### Workflow ownership

Each project repository contains the CI/CD workflow configuration needed to implement this chapter.

This operating model defines the required **behaviour and gates**, not universal workflow YAML. Exact GitHub Actions jobs, target-platform commands and credentials depend on the repository's language, architecture and deployment target.

Chapter 1 — Project and Repository Model defines the canonical repository locations and bootstrap mechanics for those workflows once the operating-model revision is complete.

### CI/CD completion boundary

For a normal change, CI/CD responsibility is complete when the required change-validation checks pass and the pull request is eligible for the explicit merge decision.

For a release, CI/CD responsibility is complete when:

1. the selected `dev` state is green;
2. the release candidate passes its automated gate;
3. staging deployment succeeds;
4. required staging validation is complete;
5. production promotion checks pass;
6. the tagged production deployment succeeds and the required post-deployment check is green.

