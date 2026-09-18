# SideGig Development Operating Model

## Status

Draft. This document defines the default software-development operating model for product repositories created by SideGig.

It governs how software projects are structured and developed. The research and implementation methodologies define **what** should be pursued and **when** it is ready to progress; this document defines **how software is built once development begins**.

## 1. Project and Repository Model

- Each deployable commercial product or POC gets its own GitHub repository.
- Product source code does not live in the SideGig repository. SideGig retains the research, implementation methodology, cross-project standards and reusable development assets.
- New product repositories are private by default during POC development. Repository visibility is reconsidered only when there is a specific reason to publish the source.
- Each product repository contains, at minimum:
  - `README.md` — product purpose, local setup and usage;
  - `AGENTS.md` — project-specific agent instructions based on the SideGig baseline;
  - `docs/hld.md` — high-level design;
  - `docs/implementation-plan.md` — implementation scope and work breakdown;
  - source code, tests and project configuration;
  - `.github/workflows/` — automated validation and deployment workflows.
- One repository represents one independently deployable product. SideGig does not use a product monorepo.

## 2. Work Management

- GitHub Issues are the canonical development work items.
- One issue represents one independently reviewable outcome.
- Issues use only the following type labels:
  - `feature`
  - `bug`
  - `chore`
  - `spike`
- Milestones group issues that belong to the same POC objective or planned release.
- GitHub Projects is not part of the default workflow. Issues, milestones and pull requests provide the project state.
- Pull requests link the issue or issues they implement. Closing an issue without merged implementation or an explicit no-code resolution is not allowed.

## 3. Git Lifecycle

- `main` is the only permanent branch.
- SideGig does not use permanent `develop`, `test` or release branches.
- Development branches are created from `main` using:
  - `feature/<issue-number>-<slug>`
  - `fix/<issue-number>-<slug>`
  - `chore/<issue-number>-<slug>`
  - `spike/<issue-number>-<slug>`
- All changes to `main` are merged through pull requests.
- Pull requests require passing CI before merge.
- Pull requests are squash-merged.
- The source branch is deleted after merge.
- Environments are represented by deployment configuration, not by Git branches.

## 4. Development Lifecycle

Every implementation change follows this sequence:

1. Create or refine the GitHub Issue and acceptance criteria.
2. Confirm that the project HLD and implementation plan cover the change; update them when the change alters architecture or implementation scope.
3. Create the issue branch.
4. Implement the change with tests.
5. Run the repository validation suite locally.
6. Open a pull request linked to the issue.
7. Pass automated CI validation.
8. Review the resulting diff, test evidence and agent output.
9. Squash-merge to `main`.
10. Deploy through the repository workflow when the merged change is deployable.

Development does not start from an untracked prompt or ad-hoc task. Every code change is anchored to an issue.

## 5. Architecture and Design

- Every new product repository has an HLD before feature implementation begins.
- Every new product repository has an implementation plan before feature implementation begins.
- HLD and implementation-plan documents are created from canonical SideGig templates under `development/templates/`.
- A separate LLD is **not** a standard project document. It is created only when a component has implementation-critical internal behaviour, state or interfaces that cannot be specified clearly in the HLD and acceptance criteria.
- Projects do not invent local architecture-document formats when a SideGig template exists.
- Architecture decisions that materially change the HLD are updated in the HLD as part of the implementing pull request.

## 6. Coding and Quality Baseline

### TypeScript / JavaScript

- TypeScript is used instead of JavaScript for application code.
- TypeScript runs with `strict` enabled.
- Prettier is the formatter.
- ESLint is the linter.
- Vitest is the default unit-test framework.

### Python

- Ruff is the formatter and linter.
- Pyright is the type checker.
- pytest is the test framework.

### Common rules

- Formatter, linter, type-check and test commands are defined as repository scripts/tasks and run identically locally and in CI.
- Formatting is automated; projects do not maintain manual style conventions that duplicate formatter behaviour.
- Lockfiles are committed.
- CI installs dependencies from the committed lockfile.

## 7. CI/CD

Every product repository has two workflow classes.

### Pull-request validation

Every pull request to `main` runs:

1. dependency installation from the lockfile;
2. formatting/lint validation;
3. type checking where the language supports it;
4. automated tests;
5. build or packaging validation.

A failed validation blocks merge.

### Deployment and release

- Deployment is automated from repository state; normal deployments are not performed from a developer workstation.
- Merge to `main` updates the project's development/test deployment where the product has one.
- Public or production releases are created from version tags.
- Deployment details remain project-specific because the target platform differs by product.

## 8. Agentic Development

- OpenAI Codex is the standard coding agent for SideGig product development.
- Every product repository has a root `AGENTS.md`.
- SideGig maintains the baseline `AGENTS.md` content and reusable Codex skills centrally under the SideGig development framework once those assets are defined.
- Project `AGENTS.md` files contain only project-specific additions or overrides to the SideGig baseline.
- Codex works from GitHub Issues and the repository design documents; issue acceptance criteria define the requested outcome.
- Codex may create branches, edit code, run validation, commit changes and prepare pull requests.
- Codex does not expand issue scope implicitly. New work discovered during implementation becomes a separate issue unless it is required to satisfy the existing acceptance criteria.
- Merge to `main` remains an explicit human decision.
- Reusable development behaviour is encoded in SideGig skills or baseline agent instructions instead of repeated ad-hoc prompts.

## 9. Releases

- SideGig product repositories use Semantic Versioning: `MAJOR.MINOR.PATCH`.
- Release tags use the form `vMAJOR.MINOR.PATCH`.
- GitHub Releases are the canonical release record.
- Each release records the user-visible changes and references the implemented issues or pull requests.
- SideGig does not maintain a separate manual `CHANGELOG.md`; release history is generated from GitHub Releases and merged work.
