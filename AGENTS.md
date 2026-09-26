# AGENTS.md

This file governs agent work in the central SideGig repository.

## Repository role

SideGig is the central research, methodology, governance and product-bootstrap repository. It is **not** an independently deployable product repository.

The repository owns:

- the project objectives and constraints in `requirements.md`;
- the research process and evidence under `research/`;
- the implementation methodology and central implementation records under `implementation/`;
- the Development Operating Model under `development/`;
- the canonical product-repository skill/template/bootstrap package.

Product repositories are separate repositories and own their own application code, tests, product/architecture definitions and product delivery state.

## Critical skill boundary

Skills under `.codex/skills/` are the runtime skills for agents working **on SideGig itself**.

Skills under `implementation/skills/` are canonical **product-repository package sources**. They are maintained here and deployed into product repositories through `implementation/bootstrap/manifest.yaml` and the bootstrap tooling. Do not treat those product skills as instructions for operating on SideGig.

In particular, product rules involving `dev`, `staging`, release branches and product promotion do not apply to this repository.

## Authoritative context

Read the documents relevant to the task rather than applying one methodology everywhere:

- `requirements.md` for project objectives and constraints;
- `research/methodology.md` for market/channel/opportunity research;
- `implementation/methodology.md` for channel implementation and POC progression;
- `development/operating-model.md` for the standards SideGig defines for product software repositories;
- the relevant research, implementation, learning or bootstrap artifacts for the specific change.

Do not silently expand the scope of an existing GitHub Issue.

## SideGig Git and integration

- `main` is the SideGig integration branch.
- Normal repository changes start from current `main` on an isolated change branch.
- Normal pull requests target `main`.
- SideGig does not require `dev` or `staging` branches.
- Do not apply the product-repository release/promotion model to SideGig.
- Do not push normal repository changes directly to `main`.
- A human makes the merge decision; agents prepare changes and pull requests but do not merge their own work.
- The only documented direct-write exception is the learning collector, and only for generated evidence under `development/learnings/inbox/**`.

Where a material SideGig change already has a GitHub Issue, preserve that Issue as the traceability root. Create a new Issue when the work needs durable tracking rather than inventing a parallel tracker.

## SideGig runtime skills

Use the relevant repository-local skill under `.codex/skills/`:

- `sidegig-change` — prepare and deliver a normal SideGig repository change;
- `research-execution` — execute the research methodology;
- `implementation-governance` — maintain central implementation/POC governance without absorbing product engineering;
- `review-learnings` — process the central learning inbox;
- `maintain-product-package` — change the product-repository skill/template/bootstrap package;
- `validate-sidegig` — select and run SideGig validation.

## Validation

Install validator dependencies when needed with:

`npm install --no-audit --no-fund`

The complete repository validation entry point is:

`npm run validate`

Use `validate-sidegig` to select additional or narrower checks appropriate to the changed area. Do not substitute a product repository's validation or CI instructions for SideGig's own validation.

## Product-package changes

A change under `implementation/skills/`, `development/templates/`, `implementation/templates/` or `implementation/bootstrap/` may change what future product repositories receive.

When changing that package:

- use `maintain-product-package`;
- keep the bootstrap manifest, hashes, installer/verifier and documentation consistent;
- preserve the distinction between SideGig runtime skills and product-repository package skills;
- do not add SideGig-only skills to the product bootstrap manifest.
