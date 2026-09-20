# SideGig Development Operating Model

## Status

Draft. This document defines the standard development operating model for all software repositories created under SideGig.

It defines the concrete development conventions used across projects. Project-specific technical decisions belong in the project repository; common development process is defined here once.


## Planned Revision

> **Planning / tracking section.** This section records the agreed structural revision of the operating model and the scope of the section-by-section iterations. It is not normative operating-model content and should be removed once the target sections have been revised and stabilized.

### 1. Project and Repository Model

Revise last, once the durable product, architecture, GitHub, development, quality and CI/CD models are known. Define the final repository structure, bootstrap contents, README, AGENTS.md, agentic framework and locations of canonical project artifacts without assuming document structures that have not yet been settled.

### 2. Product Definition and Evolution

Defined in the current model. Maintain one concise durable Product Definition describing the current approved product intent, requirements and externally meaningful behaviour. Revisit only for consistency after downstream sections are finalized.

### 3. Architecture and Design

Defined in the current model. Maintain one concise durable Architecture Definition describing the current approved technical architecture. Revisit only for consistency after the Development Lifecycle is finalized.

### 4. GitHub Delivery Model

Defined in the current model. GitHub Issues, Milestones, branches, pull requests, release candidates, tags, GitHub Releases and protection rules form the delivery-control layer. Revisit only for consistency after CI/CD and repository bootstrap are finalized.

### 5. Development Lifecycle

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

Retain common language, formatting, linting, typing, testing, dependency and local-validation standards. Reconcile the section with the finalized Development Lifecycle so it supplies quality rules rather than a competing workflow.

### 7. CI/CD

Map automated validation and deployment controls onto the finalized GitHub Delivery Model and Development Lifecycle: change validation, integrated dev validation, release-candidate validation, staging deployment/validation and production promotion.


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

The Development Lifecycle defines how one tracked software change moves from an approved GitHub Issue to validated integration.

The lifecycle is change-centric. The GitHub Delivery Model owns the Issue, branch and pull-request mechanics; this section owns the engineering work performed inside that delivery structure.

Every implementation change follows the same core lifecycle:

`Issue -> workspace -> proportionate design/planning -> development -> validation -> integration`

Design artifacts are created only when they add value. Development and validation are mandatory for every code change.

### Lifecycle entry

A change enters the Development Lifecycle when its GitHub Issue is sufficiently defined to begin implementation.

Before work begins:

- the Issue has a clear required outcome and observable acceptance criteria;
- relevant dependencies are understood;
- relevant Product Definition and Architecture Definition context is identified where material;
- the target release milestone is assigned when the change has been committed to a release.

The Issue remains the root traceability object throughout the lifecycle.

### Determine the required design path

The required design path is determined by the substance of the change, not by ceremony or Issue type alone.

#### High-Level Design

Create a change-specific HLD using the [High-Level Design template](../implementation/templates/high-level-design.md) and the `high-level-design` skill when the change requires a meaningful behavioural or architectural design decision.

An HLD is normally required when the change:

- introduces or materially changes product behaviour whose design is not already unambiguous;
- changes the durable product or system architecture;
- changes a material component boundary, interface, integration, data model or principal flow;
- introduces a material cross-cutting decision involving security, reliability, performance, cost or compatibility;
- has unresolved design choices that should be settled before implementation.

An HLD is not required merely because code is being changed.

#### Implementation Plan

Create an Implementation Plan using the [Implementation Plan template](../implementation/templates/implementation-plan.md) and the `implementation-plan` skill when the implementation itself requires meaningful repository assessment, sequencing or coordination.

A plan is normally required when:

- the change spans multiple implementation areas with meaningful dependencies;
- the implementation approach is not obvious from the Issue and existing architecture;
- sequencing matters;
- migration, compatibility or integration work needs coordination;
- validation requires non-trivial preparation;
- an LLD decision is needed.

The Implementation Plan references the approved HLD when one exists. An HLD is not a prerequisite when the Issue and durable project documentation already provide sufficient design context.

#### Low-Level Design

An LLD is optional and is created only when an approved Implementation Plan explicitly records `LLD required: Yes`.

Use the [Low-Level Design template](../implementation/templates/low-level-design.md) and the `low-level-design` skill when repository-specific file/component interactions are complex enough that implementation would otherwise require significant design decisions while coding.

Do not create an LLD for routine file edits whose implementation is already clear.

#### Typical paths

Common paths are:

- **Simple bug:** Issue -> workspace -> development -> validation -> integration.
- **Bounded implementation change:** Issue -> workspace -> Implementation Plan -> development -> validation -> integration.
- **Designed change:** Issue -> workspace -> HLD -> Implementation Plan -> optional LLD -> development -> validation -> integration.

Features will commonly use the designed-change path. Straightforward bugs will commonly use the simple-bug path. Either Issue type may use a different path when the actual complexity warrants it.

When a design stage is skipped, no placeholder artifact is created. Where useful for traceability, record the reason briefly in the Issue or pull request.

### 1. Establish the change workspace

Use the `setup-change-workspace` skill before implementation work begins.

Create or adopt the Issue-specific branch and workspace according to the GitHub Delivery Model:

- normal changes are based on `dev`;
- approved release fixes are based on the active release branch.

The workspace is established before change-specific design artifacts are created so design documents and code evolve within the same isolated change context.

### 2. Complete required design and planning

Produce only the HLD, Implementation Plan and LLD required by the design-path decision above.

Each required artifact must be substantively complete and approved before the downstream stage that depends on it begins.

If an artifact exposes a material ambiguity in the Issue, Product Definition or Architecture Definition, resolve that ambiguity at its authoritative source rather than compensating for it in a downstream document.

### 3. Develop the change

Use the `development` skill.

Implementation is governed by:

1. the originating GitHub Issue;
2. the current durable Product Definition and Architecture Definition where relevant;
3. the approved HLD, Implementation Plan and LLD where those artifacts were required;
4. repository instructions and the Coding and Quality Baseline.

Keep the implementation within the approved Issue scope. Add or update automated tests proportionately to the changed behaviour.

A material implementation discovery that changes product behaviour, architecture, scope, interfaces, data model or another approved design decision returns the change to the appropriate earlier lifecycle stage. Do not silently redesign during coding.

Run the relevant local integrity checks before hand-off to validation.

### 4. Validate the change

Use the `validation` skill.

Validation proves that:

- the Issue acceptance criteria are satisfied;
- required behaviour defined by applicable design artifacts is implemented;
- relevant regressions and edge cases are covered proportionately;
- repository quality and validation commands pass for the changed scope;
- no known implementation defect prevents integration.

Validation may fix defects that remain within the approved design and Issue scope. A failure that requires a material product, architecture or scope decision returns the change to the appropriate earlier lifecycle stage.

### 5. Reconcile durable documentation

Before integration, determine whether the completed change modifies a durable product or architectural characteristic.

When it does:

- update the Product Definition when product scope, capability, externally meaningful behaviour, requirements, constraints or non-goals have changed;
- update the Architecture Definition when the system boundary, major components, interfaces, data/state model, deployment shape, cross-cutting architecture or durable technical constraints have changed.

These updates are part of the same change and are included in the same pull request.

Do not update durable documents for implementation detail that leaves the approved product and architecture unchanged.

### 6. Integrate the change

Use the `merge-change` skill and the GitHub Delivery Model.

For a normal change:

1. open a pull request from the Issue branch to `dev`;
2. reference the originating Issue;
3. pass the required CI checks;
4. review the complete diff, acceptance-criteria evidence, tests and documentation changes;
5. explicitly approve the merge;
6. squash-merge the change into `dev`;
7. delete the change branch when safe;
8. close the Issue through the integrated pull request.

Release-fix changes follow the same lifecycle but integrate into the active release branch and are later reconciled into `dev` according to the GitHub Delivery Model.

Coding agents may prepare the pull request and evidence but do not perform the human merge decision.

### Lifecycle completion

A change is complete when:

- its Issue outcome and acceptance criteria are satisfied;
- every required design/planning artifact is approved;
- implementation is complete;
- required local and CI validation has passed;
- durable Product Definition and Architecture Definition artifacts are consistent with the implemented state;
- the change is integrated into its target branch through the GitHub Delivery Model;
- the originating Issue is closed or explicitly resolved without code.

Release assembly, staging promotion and production release are not part of the per-change Development Lifecycle. They are governed by the GitHub Delivery Model and CI/CD sections.

### Lifecycle skill mapping

| Lifecycle activity | Standard skill | Required |
| --- | --- | --- |
| Establish workspace | `setup-change-workspace` | Yes |
| High-Level Design | `high-level-design` | When HLD criteria are met |
| Implementation Plan | `implementation-plan` | When planning criteria are met |
| Low-Level Design | `low-level-design` | Only when the approved plan requires it |
| Development | `development` | Yes |
| Validation | `validation` | Yes |
| Integration | `merge-change` | Yes |

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

