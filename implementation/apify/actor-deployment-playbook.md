# Apify Actor Deployment Playbook

## Purpose

This playbook defines the SideGig operating procedure for deploying an Apify Actor from a frozen release candidate through hosted validation, monetization readiness, Store publication, and post-publication verification.

It specializes the generic SideGig release lifecycle for Apify. It does **not** replace `prepare-release`, `staging-validation`, or `promote-release`, and it does not create a shortcut around the `dev` → release branch → `staging` → `main` controls.

Use it when an independently deployable SideGig product is packaged as an Apify Actor.

## Lifecycle mapping

The Apify platform does not require a conventional long-lived staging service. SideGig therefore maps the lifecycle as follows:

| SideGig state | Apify state |
| --- | --- |
| `dev` | integrated source only; not a release deployment |
| `release/vMAJOR.MINOR.PATCH` | frozen release candidate |
| `staging` | exact release candidate approved for pre-public hosted validation |
| pre-production environment | private/unlisted Actor build and controlled hosted runs |
| `main` + immutable tag | production/public release authority |
| production deployment | Store/public Actor built or verified from the tagged release state |

Keep the Actor private/unlisted until the release candidate has passed hosted validation, monetization configuration is valid, and the production-promotion lifecycle permits publication.

## 1. Entry criteria

Before touching Apify deployment:

1. Identify the active release version and exact release-candidate commit.
2. Confirm the release branch was created from a green integrated `dev` state.
3. Confirm the release candidate has passed the repository release gate.
4. Confirm the release candidate has been explicitly promoted to `staging`.
5. Confirm the Actor definition, README, input/output schemas, dataset schema, Dockerfile/build definition, and release configuration are version-controlled.
6. Define the representative hosted-validation input and expected output contract before the run.
7. Keep the Actor private/unlisted.

Do not deploy an arbitrary working-tree state as staging evidence. Deployment evidence must be traceable to the active release candidate.

## 2. Local and package preflight

### 2.1 Run repository validation

Run the repository's canonical validation command before `apify push`, normally:

```text
npm run validate
```

A green repository suite is necessary but not sufficient. Apify-specific schema and packaging rules also need validation.

### 2.2 Validate Apify schemas

Apify input schemas extend JSON Schema with platform UI requirements. Fields that are valid JSON Schema can still be rejected by Apify if required Apify metadata is missing.

Run:

```text
apify validate-schema
```

Also inspect `.actor/input_schema.json` or the input schema referenced by `.actor/actor.json`.

For each input property, verify the Apify-required editor configuration appropriate to its type. Common examples include:

- strings: `textfield`, `textarea`, `select`, or another supported editor;
- integers: `number`;
- booleans: `checkbox`;
- string arrays: `stringList`.

Treat an Apify schema rejection as a version-controlled configuration defect. Create a Bug Issue, add a regression check where practical, fix it on a bounded release-fix branch, merge it into the active release branch, and re-promote the corrected candidate to `staging`.

### 2.3 Control the deployment payload

Keep transient local files out of the Actor source package.

At minimum, use `.actorignore` for deployment-only exclusions and keep matching transient files in `.gitignore` when they should never be committed.

Typical exclusions include:

```text
apify-validation-output/
apify-test-input.json
apify-validation-dump*.bat
```

Do not exclude real Actor source, schemas, documentation, lockfiles, or build configuration.

This matters because `apify push` chooses the source upload format by package size. Current Apify CLI behavior is:

- below 3 MB: upload as multiple source files;
- 3 MB or larger: upload as a ZIP archive.

A sudden change from normal file upload to `Zipping Actor files` can therefore be a useful diagnostic signal that local artefacts have contaminated the deployment payload.

If a ZIP build fails before application build execution with archive download/extraction errors, first inspect package contents and ignore rules. Do not classify that immediately as an Actor application defect.

## 3. Deploy the frozen candidate

From the exact active release branch:

```text
git fetch origin
git switch release/vMAJOR.MINOR.PATCH
git pull --ff-only origin release/vMAJOR.MINOR.PATCH
apify push --json
```

Record:

- release commit;
- Actor ID;
- Actor URL;
- build ID;
- build number;
- build status;
- build URL;
- exit code.

A successful build is staging deployment evidence. A failed build is not automatically an application failure; classify the failure by phase first.

### Failure classification

Use these categories:

1. **Repository/application defect** — source, tests, runtime code, or version-controlled configuration is wrong.
2. **Apify schema/configuration defect** — Actor/input/output/storage definition is invalid for the platform.
3. **Deployment packaging/transport defect** — source upload/archive/build handoff fails before meaningful application build/run execution.
4. **Account/platform prerequisite** — permissions, billing, KYC, quota, or platform state blocks the step.
5. **Transient platform failure** — same immutable source can reasonably be retried without changing release contents.

Only categories 1–3 that require a source/configuration change create a release-fix Bug Issue. A safe retry of the identical candidate does not create a new release state.

## 4. Prepare robust hosted-run input

Define a representative input that exercises the material contract while keeping cost bounded.

Prefer a JSON input file over inline JSON in PowerShell. Inline JSON can be altered by native-process quoting rules, and stdin behavior can vary by shell/CLI combination.

On Windows PowerShell, write the file as UTF-8 **without BOM**:

```powershell
$json = '{"example":"value"}'
[System.IO.File]::WriteAllText(
    "$PWD\apify-test-input.json",
    $json,
    [System.Text.UTF8Encoding]::new($false)
)
```

A UTF-8 BOM may cause a JSON parser to reject the first token as an unrecognized character.

Run the exact build under test rather than relying implicitly on a mutable tag:

```text
apify actors call <actor-id> -b <build-number> --input-file ./apify-test-input.json --json
```

Use `-m <megabytes>` only when deliberately testing a memory allocation. Otherwise omit it when verifying the Actor's configured default.

If `--silent` is used, do not assume no console output means failure. Inspect the newest run with:

```text
apify runs ls <actor-id> --desc --limit 1 --json
```

## 5. Hosted execution acceptance

A representative staging run passes only when all material checks pass.

Record:

- run ID and URL;
- build ID/number;
- terminal status;
- exit code;
- start/finish time and duration;
- default dataset ID;
- default key-value-store ID where relevant;
- default request-queue ID where relevant.

The minimum execution gate is:

- terminal status `SUCCEEDED`;
- the intended input was accepted;
- the expected query/item limits were respected;
- output was written to the expected default storage;
- no unclassified runtime failure remains.

## 6. Validate dataset and API output

Retrieve the default dataset through the normal Apify path:

```text
apify datasets get-items <dataset-id> --format json
```

Validate the product-specific output contract, including:

- total result count;
- per-query/per-input limits;
- required fields;
- field types and semantics;
- deduplication behavior where applicable;
- ordering/position rules where applicable;
- optional fields where material.

Do not rely only on Console rendering. Verify the API/dataset retrieval route that downstream users will actually consume.

Record the dataset ID and the normal API output reference from run metadata.

## 7. Capture logs, runtime, and cost evidence

Use:

```text
apify runs info <run-id> --json --verbose
apify runs log <run-id>
```

Capture at least:

- build identity;
- status and exit code;
- duration;
- compute units;
- configured memory;
- average and peak memory;
- CPU usage where useful;
- network usage where useful;
- dataset/storage operations;
- total platform usage cost and material breakdown;
- billing model;
- max-charge state where relevant;
- output/API links;
- Actor visibility/public state;
- warnings/errors.

For Windows batch collection, remember that the global `apify` executable may resolve to `apify.cmd`. When one batch file invokes another `.cmd`, use `call apify ...`; otherwise the parent batch may not resume after the first command.

Example:

```bat
call apify runs info RUN_ID --json --verbose > run-info.json
call apify runs log RUN_ID > run-log.txt 2>&1
```

Keep generated evidence outside the deployable Actor package via `.actorignore`.

## 8. Right-size memory before monetization

Do not accept the platform/default memory allocation without evidence.

1. Record the baseline run's configured memory, peak memory, duration, compute units, and total platform usage cost.
2. Choose a conservative lower allocation above observed peak usage and any runtime headroom required by the Actor.
3. Run the same representative workload with an explicit override:

```text
apify actors call <actor-id> -b <build-number> -m <candidate-mb> --input-file ./apify-test-input.json --silent --json
```

4. Inspect the newest run and its verbose metadata.
5. Compare functional output, duration, peak memory, compute units, and platform cost.
6. If the lower allocation passes with reasonable headroom, set it explicitly in `.actor/actor.json`, for example:

```json
{
  "defaultMemoryMbytes": 256
}
```

7. Add a regression assertion or deterministic configuration check where practical.
8. Route the configuration change through the release-fix lifecycle and re-promote it to `staging`.
9. Rebuild.
10. Run again **without** `-m`.
11. Confirm `options.memoryMbytes` in verbose run metadata equals the intended default.

Memory sizing affects both creator platform cost and PPE economics. For the `apify-actor-start` synthetic event, current Apify behavior charges one start event for runs up to and including 1 GB, then one additional event per extra GB.

## 9. Monetization and PPE readiness

Configure monetization only after hosted functional validation and resource sizing are stable.

Current Apify monetization setup is in:

`Development → My Actors → <Actor> → Publishing → Monetization`

For PPE Actors, explicitly decide and record:

- chargeable event names;
- price per event and any tiering;
- primary event;
- whether platform usage costs are transferred to users;
- minimum allowed max cost per run;
- expected creator platform cost;
- expected margin at representative run sizes.

### Synthetic events

`apify-default-dataset-item`:

- automatically charges once for each item written to the run's default dataset when enabled;
- requires no manual charging code for normal `Actor.pushData()` / default-dataset writes;
- is a natural primary event for per-result Actors.

`apify-actor-start`:

- is automatically charged when enabled;
- must not also be charged manually in Actor code;
- has a current default price of `$0.00005`;
- covers the compute cost of the first five seconds of each run;
- is charged once for runs up to and including 1 GB RAM, then once per additional GB.

Do not hard-code a product's per-result price into this generic procedure. Pricing is a product decision informed by measured platform cost, market positioning, and desired margin.

### Worked legacy example

The Google News metadata PoC used the following intended PPE shape during operational learning:

- `apify-default-dataset-item`: `$0.001` per delivered result;
- primary event: dataset item;
- `apify-actor-start`: retain the platform default start-event price;
- do not pass platform usage costs through separately;
- measure creator-side platform cost directly from controlled runs.

This is evidence from that PoC, not a universal SideGig pricing rule.

### Billing, payout, and identity prerequisites

Complete billing/payment details early. Apify requires identity verification (KYC) for payouts, and KYC is also required for agentic-payment eligibility.

If Console blocks monetization or publication while identity verification is pending:

- do not modify application code;
- record the state as an external platform/account dependency;
- keep the Actor private;
- preserve completed staging evidence;
- resume at monetization/publication once verification completes.

Do not manufacture billable usage merely to satisfy process. Perform a controlled PPE test only when the account can be charged safely and the result will provide useful evidence.

## 10. Store publication readiness

Before public publication, verify the Publishing sections required by Apify are complete, including as applicable:

- display information/logo/description;
- monetization;
- sample output;
- output schema and dataset schema;
- Actor permission level;
- README/public documentation.

Keep source visibility separate from Actor visibility: publishing an Actor does not require publishing its source code.

SideGig release authority still applies. A technically publishable Actor is not yet authorized for public production simply because the Console permits publication.

## 11. Production promotion and public deployment

After staging validation is explicitly `Pass`:

1. use the generic `promote-release` skill;
2. open the release-branch → `main` PR;
3. stop for explicit human merge;
4. after merge, verify the production commit corresponds to the staged candidate;
5. create the immutable `vMAJOR.MINOR.PATCH` tag;
6. create the GitHub Release;
7. build/verify the Actor from that tagged state;
8. apply the approved monetization configuration;
9. publish/make the Actor public in Apify Store;
10. perform a bounded production/public smoke run;
11. verify the Store page, input UI, output/API path, pricing display, run success, and expected charging behavior;
12. reconcile release-only fixes back into `dev`;
13. close the milestone/release issue only after the required evidence is complete.

Do not publish a release-candidate branch directly as the final public production authority when the SideGig production state is `main` + immutable tag.

## 12. Evidence checklist

For every Apify release, retain enough evidence to reconstruct what was deployed and why it was accepted.

### Candidate/build

- release version;
- release commit;
- staging promotion PR;
- Actor ID;
- build ID;
- build number;
- build result.

### Hosted validation

- representative input;
- run ID;
- run status;
- dataset ID;
- dataset/API contract result;
- log result;
- build/run traceability.

### Operations/cost

- memory allocation;
- peak memory;
- duration;
- compute units;
- platform usage cost;
- material storage/network usage;
- Actor visibility state.

### Monetization/publication

- pricing model;
- event configuration;
- primary event;
- platform-cost pass-through setting;
- minimum max charge;
- billing/KYC state;
- controlled PPE test result where applicable;
- public Store state and URL after authorized release.

### Release closeout

- production tag;
- GitHub Release;
- production/public smoke evidence;
- release-fix reconciliation to `dev`;
- learnings captured;
- final `Pass` / `Hold` / external blocker.

## 13. Troubleshooting patterns learned from the legacy Google News deployment

| Symptom | Likely classification | First action |
| --- | --- | --- |
| `Input schema is not valid (...editor is required)` during build | Apify schema/config defect | Add valid editors, regression-check schema, run `apify validate-schema`, release-fix/re-promote |
| `Cannot parse JSON input` from PowerShell inline JSON | local shell/input transport | Use a JSON file rather than inline JSON |
| `Unrecognized token '﻿'` reading JSON file | UTF-8 BOM | Rewrite as UTF-8 without BOM |
| Actor says required input missing after stdin piping | local shell/stdin transport | Prefer `--input-file` with a real JSON file |
| `.bat` produces only first Apify output | Windows batch command chaining | Use `call apify ...` inside batch files |
| Run succeeds but `--silent --json` prints nothing | CLI presentation behavior | Inspect `apify runs ls ... --desc --limit 1 --json` |
| 4 GB allocation for a lightweight HTTP Actor | resource over-provisioning | Controlled lower-memory run, compare cost, set `defaultMemoryMbytes`, verify without override |
| `apify push` suddenly says `Zipping Actor files` and archive extraction fails | package contamination/ZIP transport | Inspect `.actorignore`, local artefacts, and package size before changing Actor code |
| Monetization setup blocked by identity verification | account/platform prerequisite | Record external blocker; keep Actor private; resume after KYC |

## 14. Learning checkpoint

Deployment is a high-value learning surface because many failures occur at boundaries that local tests cannot reproduce.

At the end of staging/publication, ask:

- Did Apify enforce a platform rule absent from repository validation?
- Did shell/OS behavior create a repeatable failure mode?
- Did package contents or upload mode expose a missing ignore/validation guardrail?
- Did cost/resource evidence change a default?
- Did monetization/publication expose an account or process prerequisite?
- Should a canonical SideGig skill/template/bootstrap rule change?

Capture reusable lessons using `capture-learning`. Product-specific defects remain normal Issues; cross-project lessons should be marked for SideGig review.

## Current official Apify references

Verified against Apify documentation on 2026-09-27:

- Actor deployment and source-type-by-size behavior: https://docs.apify.com/actors/development/deployment
- CLI command reference: https://docs.apify.com/cli/docs/reference
- Input schema specification and `apify validate-schema`: https://docs.apify.com/actors/development/actor-definition/input-schema/specification/v1
- Monetization setup: https://docs.apify.com/actors/monetize/set-up-monetization
- PPE pricing and costs: https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
- Monetization / agentic-payment prerequisites: https://docs.apify.com/actors/publishing/monetize
- Store publication: https://docs.apify.com/actors/publishing/publish
