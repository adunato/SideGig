# SideGig Learning Inbox

This directory is the central review queue for reusable learnings discovered in SideGig product repositories.

## Flow

1. Product-repository agents capture reusable lessons under `docs/learnings/` using the installed `capture-learning` skill and canonical learning-record template.
2. Lessons that may require a cross-project change are marked `SideGig review: Yes`.
3. The SideGig `Collect SideGig learnings` GitHub Action scans the repositories registered in `sources.json`.
4. Eligible records are copied into `inbox/<owner>--<repository>/` and enriched with collection provenance: origin repository/branch/path, integrated commit, merged pull request when resolvable, collection timestamp, and source-content SHA-256.
5. A reviewer periodically processes the inbox. Cross-project actions are made through the normal SideGig lifecycle and PR process.
6. Once reviewed, move the collected record to the matching path under `processed/` and record the resulting disposition/action. The collector treats an identical processed source hash as complete and will not recreate it. If the source record changes later, it is eligible for collection again.

The collected copy is evidence, not an authoritative replacement for the originating product learning record.

## Source registration

Add product repositories to `sources.json` with:

- `repository` — `owner/repository`;
- `access` — `public` or `private`;
- `branch` — the integrated product branch to scan, normally `dev`;
- `learningPath` — normally `docs/learnings`.

Public sources are read without repository credentials. Before registering a private product repository, configure the SideGig Actions secret `SIDEGIG_LEARNING_TOKEN` with read access to the registered private source repositories. Keep that credential read-only for product repositories; writes occur only in the SideGig repository through the workflow's own token.

## Automated-write boundary

The collector is the only automated process permitted to write directly to SideGig `main`, and only for generated files under `development/learnings/inbox/**`. Changes to methodology, operating model, skills, templates, tooling or processed-learning dispositions still use normal branches, validation, pull requests and human merge decisions.

## Manual test

Run the `Collect SideGig learnings` workflow with `workflow_dispatch`. A successful run either reports that there is nothing new or commits new eligible records into `development/learnings/inbox/`.
