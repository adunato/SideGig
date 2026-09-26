# SideGig Learning Inbox

This directory is the central review queue for reusable learnings discovered in SideGig product repositories.

## End-to-end flow

1. Product-repository agents capture reusable lessons under `docs/learnings/` using the installed `capture-learning` skill and canonical learning-record template.
2. Lessons that may require a cross-project change are marked `SideGig review: Yes`.
3. When a product pull request is merged to `dev`, that repository's `sidegig-learning-dispatch.yml` workflow immediately dispatches the SideGig `Collect SideGig learnings` workflow for the originating repository.
4. The SideGig collector validates the source against `sources.json`, imports eligible records into `inbox/`, and enriches them with post-merge provenance.
5. A SideGig reviewer uses the central `review-learnings` skill to review the inbox, group related evidence, check for existing work, and assign a disposition.
6. When a SideGig change is warranted, the reviewer creates or links a GitHub Issue. The Issue becomes the execution tracker and follows the normal SideGig Development Lifecycle.
7. Records with a decided disposition move to the matching path under `processed/` through a normal SideGig review pull request. Records that remain undecided stay in `inbox/`.
8. The collector treats an identical processed source hash as complete and will not recreate it. If the source record changes later, it is eligible for collection again.

The collected copy is evidence, not an authoritative replacement for the originating product learning record.

## Queue semantics

The directory state has a precise meaning:

- `inbox/` — no final SideGig disposition has been integrated yet;
- `processed/` — SideGig has made and integrated a disposition decision;
- GitHub Issue — execution tracker when the disposition requires work.

Do not use the learning file itself to track implementation progress. Once an Issue exists, its normal open/closed state, lifecycle artifacts, pull request and merge history track execution.

## Review dispositions

Use `.codex/skills/review-learnings/SKILL.md` for central review.

A decided learning is recorded as one of:

- **Action** — a new SideGig Issue is required and created;
- **Existing action** — an existing open SideGig Issue already represents the required outcome;
- **Already addressed** — the required SideGig change is already integrated;
- **No action** — the evidence was considered but does not justify a SideGig change.

If there is insufficient evidence to decide, leave the record in `inbox/`. Do not move an unresolved record merely to empty the queue.

Several learning records may support one coherent SideGig Issue. Review related evidence together and avoid duplicate Issues.

## Action Issue contract

A learning-generated SideGig Issue is a normal execution Issue, not a special parallel workflow.

Create it from the canonical SideGig Feature or Bug Issue template. Preserve the canonical sections, including the `Development Lifecycle Assessment` block with its initial `Pending` values. Add learning provenance in a separate `Source Learnings` section rather than replacing the normal Issue shape.

Where the evidence is sufficient, create the Issue already satisfying the `refine-issue` contract: behavioural objective/expected outcome, observable acceptance criteria, Product/Architecture context or `None`, and dependencies or `None`. The next lifecycle step is then `assess-change`, which alone decides whether HLD and/or an Implementation Plan are required and records the LLD status.

Use the final `processed/` learning path as the durable central evidence reference, even while the review PR that performs the move is still awaiting merge.

A warranted action that is not being implemented immediately still receives an Issue and remains open. Scheduling or deferral belongs to normal Issue prioritization rather than a separate learning status.

## Processed record contract

When a final disposition is reached, preserve the complete collected record and append a `## SideGig review` section containing:

- reviewed date/time;
- disposition;
- SideGig Issue or `None`;
- related SideGig evidence or `None`;
- rationale;
- grouped Learning IDs or `None`.

Move the file to the corresponding path under `processed/`.

Inbox-to-processed moves and disposition metadata are normal SideGig repository changes. They use a branch, validation, pull request and explicit human merge. The collector's direct-write exception applies only to generated files under `inbox/**`.

## Source registration

Add product repositories to `sources.json` with:

- `repository` — `owner/repository`;
- `access` — `public` or `private`;
- `branch` — the integrated product branch to scan, normally `dev`;
- `learningPath` — normally `docs/learnings`.

Public sources are read without repository credentials. Before registering a private product repository, configure the SideGig Actions secret `SIDEGIG_LEARNING_TOKEN` with read access to the registered private source repositories. Keep that credential read-only for product repositories; writes occur only in the SideGig repository through the workflow's own token.

Each product repository also requires `SIDEGIG_COLLECTOR_DISPATCH_TOKEN`, a fine-grained credential restricted to the SideGig repository with `Actions: write`. Its only purpose is to start the central collector immediately after a merge. It does not grant the product workflow permission to modify SideGig contents.

## Automated-write boundary

The collector is the only automated process permitted to write directly to SideGig `main`, and only for generated files under `development/learnings/inbox/**`. Changes to methodology, operating model, skills, templates, tooling or processed-learning dispositions still use normal branches, validation, pull requests and human merge decisions.

## Trigger and recovery behaviour

The normal path is event-driven: product PR merge to `dev` → product dispatch workflow → SideGig collector. The SideGig collector also performs one daily all-source scan as a recovery mechanism for a missed or failed dispatch. Scheduled polling is not the normal delivery path.

For diagnostics or explicit testing, the `Collect SideGig learnings` workflow can still be run manually with `workflow_dispatch`.
