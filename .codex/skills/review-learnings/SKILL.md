---
name: review-learnings
description: Review collected SideGig learning evidence, decide its central disposition, create or link execution Issues where action is warranted, and move decided records from inbox to processed evidence.
---

# Review Learnings

Use this SideGig-local skill to process `development/learnings/inbox/`.

## Purpose

Convert collected product-repository learning evidence into an explicit SideGig disposition. The learning record remains evidence; when action is required, a SideGig GitHub Issue becomes the execution tracker.

## Inputs

Read:

- every candidate inbox record in scope;
- the current SideGig methodology, operating model, product-package sources, templates or tooling implicated by the evidence;
- relevant open and closed SideGig Issues and recent integrated changes.

Review related records together. Multiple learnings may support one coherent SideGig Issue.

## Dispositions

Use exactly one final disposition for a decided record:

- **Action** — a new SideGig Issue is warranted.
- **Existing action** — an open SideGig Issue already represents the required outcome.
- **Already addressed** — the required change is already integrated.
- **No action** — the evidence does not justify a SideGig change.

If evidence is insufficient, leave the record in `inbox/` and report what is missing. Do not move it merely to clear the queue.

## Duplicate and grouping checks

Before creating an Issue:

1. search open and closed SideGig Issues for the Learning ID, origin and materially equivalent subject;
2. inspect recent SideGig changes when the lesson may already have been addressed;
3. group related records only when they require the same central outcome.

## Action Issue contract

A new action Issue must state the behavioural objective, observable acceptance criteria, dependencies and the source learning IDs/final processed paths. Use the existing SideGig Feature/Bug conventions where applicable.

Do not copy product implementation design into the Issue unless it is an approved central constraint. The Issue is a SideGig tracker and is executed through the SideGig repository workflow, not through product `dev`/`staging` rules.

## Processed record contract

For each decided record, preserve the collected evidence and append a `## SideGig review` section containing:

- reviewed date/time;
- disposition;
- SideGig Issue or `None`;
- related SideGig evidence or `None`;
- rationale;
- grouped Learning IDs or `None`.

Move the record from `development/learnings/inbox/<source>/<file>.md` to the corresponding `development/learnings/processed/<source>/<file>.md`.

## Repository-change boundary

For a review batch, use `sidegig-change`:

1. create or adopt a branch from current `main`;
2. create/link required Issues;
3. move decided records and append review metadata;
4. leave undecided records unchanged;
5. validate;
6. open a PR to `main`;
7. stop for human merge.

The processed state becomes authoritative only after the PR is merged.

## Completion contract

Report records reviewed, grouping, disposition, Issues/evidence linked, undecided records and why, validation, PR, and human action required.
