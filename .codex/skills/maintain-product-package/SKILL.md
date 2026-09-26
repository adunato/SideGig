---
name: maintain-product-package
description: Maintain the canonical skill, template and bootstrap package that SideGig deploys into product repositories without confusing those assets with SideGig runtime instructions.
---

# Maintain Product Package

Use this skill whenever a change affects what SideGig installs into a product repository.

## Package boundary

Canonical product-package inputs include:

- `implementation/skills/` — product-repository lifecycle skill sources;
- `development/templates/` — canonical product/repository templates;
- `implementation/templates/` — canonical change and implementation templates;
- `implementation/bootstrap/manifest.yaml`;
- installer, verifier and bootstrap tools under `implementation/bootstrap/`;
- product bootstrap/dispatch workflow templates where referenced by the package.

SideGig runtime skills under `.codex/skills/` are **not** part of the product package and must not be added to the bootstrap manifest unless an explicit design decision changes that boundary.

## Change procedure

1. Identify which product-repository behaviour or package artifact is changing.
2. Update the canonical source, not an installed copy in an individual product repository.
3. Keep manifest source paths, destinations, ordering, dependencies, versions and SHA-256 hashes consistent.
4. Keep templates, installer/verifier behaviour and operating-model documentation aligned.
5. Run the package verifier:
   `powershell -NoProfile -ExecutionPolicy Bypass -File implementation/bootstrap/verify-skills.ps1`
6. Use `validate-sidegig` for the complete applicable implementation validation.
7. Deliver the SideGig source change through `sidegig-change`.

The bootstrap installer refuses to overwrite installed package files; do not assume changing SideGig automatically upgrades existing product repositories. Updating an existing product repository is a separate explicit action.

## Completion contract

Report package sources changed, manifest/version/hash changes, verifier result, broader validation result, whether existing product repositories require an explicit refresh, and the SideGig PR.
