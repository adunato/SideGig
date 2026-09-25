---
name: review-learnings
description: Review collected SideGig learning evidence, decide its central disposition, create or link execution Issues where action is warranted, and move decided records from the inbox to processed evidence.
---

# Review Learnings

This is a **SideGig-central skill**. It operates in the SideGig repository against `development/learnings/inbox/`. Do not install it into product repositories through the bootstrap manifest.

Use it when the user asks to process, review, triage or act on the SideGig learning inbox.

## Purpose

Convert collected learning evidence into an explicit SideGig decision and, where change is warranted, a normal GitHub Issue that becomes the execution tracker.

The learning record remains evidence. It is never the execution tracker and does not replace the normal SideGig Issue → lifecycle → pull request flow.

## Inputs

Read:

- every candidate record under `development/learnings/inbox/` in scope for the review;
- the current Development Operating Model, methodology, skills, templates and tooling implicated by those records;
- relevant open and closed SideGig GitHub Issues and pull requests before creating new work.

Review related inbox records together. Multiple learnings may support one SideGig Issue.

## Dispositions

A reviewed learning receives exactly one of these dispositions:

### Action

A SideGig change is warranted and no existing Issue already represents it.

Create one SideGig GitHub Issue for the required outcome. The Issue becomes the sole execution tracker. The learning record is then processed with a link to that Issue.

An action does not need to be implemented immediately. If it is intentionally deferred, leave the Issue open and schedule/prioritize it through the normal GitHub delivery process rather than inventing a separate learning status.

### Existing action

The warranted outcome is already represented by an open SideGig Issue.

Do not create a duplicate Issue. Link the learning to the existing Issue and process the record.

### Already addressed

The learning is valid but the required SideGig change has already been integrated.

Record the relevant Issue, pull request, commit or authoritative artifact as evidence and process the record without creating new work.

### No action

The evidence has been considered and no SideGig change is justified.

Record a concise rationale and process the record without creating an Issue.

### Undecided

There is not enough evidence to make a responsible disposition.

Do not move the record to `processed/`. Leave it in `inbox/` and report exactly what evidence or decision is missing. `Undecided` is a review outcome, not a persisted processed disposition.

## Duplicate and grouping checks

Before creating an Issue:

1. search open and closed SideGig Issues for the Learning ID, originating repository/Issue and materially equivalent subject;
2. inspect relevant recent SideGig changes when the learning may already have been addressed;
3. compare related inbox records and group them when they require the same central outcome.

Prefer one Issue for one coherent SideGig outcome, even when several learning records support it.

Do not combine unrelated changes merely because they were reviewed together.

## Learning-action Issue contract

Every new `Action` Issue must use the normal canonical SideGig Issue shape. Do **not** invent a separate learning-specific Issue format.

Choose the appropriate canonical template:

- `development/templates/feature-issue.md` for a new or changed SideGig capability, convention, operating-model rule, skill/template/tooling behaviour or other improvement;
- `development/templates/bug-issue.md` when the learning demonstrates that existing intended SideGig behaviour is defective and the Issue is to restore that intended behaviour.

The Issue must satisfy the normal `refine-issue` contract at creation time where the evidence is sufficient: behavioural objective/expected outcome, observable acceptance criteria, relevant Product/Architecture context or `None`, and dependencies or `None`.

Preserve the canonical `Development Lifecycle Assessment` section exactly as part of the Issue body. Leave all assessment values as `Pending` when the Issue is created. The `assess-change` skill is the only step that decides whether HLD or an Implementation Plan is required and what happens with LLD.

Add learning provenance as an additional `## Source Learnings` section without replacing or renaming canonical template sections. That section must list:

- each Learning ID;
- the final central evidence path under `development/learnings/processed/` (or the planned processed path when the review PR has not yet merged);
- origin repository;
- origin source activity;
- concise evidence context where needed.

Do not use the temporary `inbox/` path as the durable Issue reference, because a decided learning moves to `processed/`.

Do not add implementation design, affected-file prescriptions, libraries, algorithms or patch instructions to the Issue unless they are already approved constraints. Likely affected central assets may be described only when useful as context, not as a substitute for the canonical lifecycle assessment.

After creation, a development-ready learning-generated Issue proceeds to `assess-change`. If it is not yet development-ready, use `refine-issue` first rather than compensating for missing requirements during assessment.

## Processed record contract

For each decided record, preserve the complete collected learning and append:

`## SideGig review`

with:

- **Reviewed at:** ISO date/time or date;
- **Disposition:** `Action`, `Existing action`, `Already addressed`, or `No action`;
- **SideGig Issue:** issue number/link, or `None`;
- **Related SideGig evidence:** relevant PR/commit/artifact links, or `None`;
- **Rationale:** concise explanation of the disposition;
- **Grouped with:** other Learning IDs handled by the same decision, or `None`.

Move the reviewed file from:

`development/learnings/inbox/<source>/<file>.md`

to the corresponding path under:

`development/learnings/processed/<source>/<file>.md`

Do not alter the original collected evidence above the appended review section except to correct an objectively broken central reference.

## Repository-change boundary

Disposition changes are **not** generated collector evidence and must not be committed directly to `main`.

For a review batch:

1. create a SideGig review branch from current `main`;
2. create or link all required GitHub Issues;
3. move decided learning records to `processed/` with the review section;
4. leave undecided records unchanged in `inbox/`;
5. validate the repository as required for documentation changes;
6. create a pull request summarizing every disposition and linked Issue;
7. stop for explicit human merge.

The processed state becomes authoritative only after that pull request is merged.

## Completion report

Report:

- inbox records reviewed;
- grouping decisions;
- disposition for each record;
- new Issues created;
- existing Issues/evidence linked;
- records left undecided and why;
- review branch and pull request;
- human action required.

Do not claim the learning has been processed until the review pull request is merged.
