# Apify Prerequisites Validation Test

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisites:** [Apify implementation prerequisites](prerequisites.md)
- **Test date:** 2026-09-17

## 1. Test Scope

*Methodology mapping: Phase 1, Step 2 — Prerequisites Validation Test.*

The test uses the smallest non-commercial, opportunity-independent Apify Actor: a TypeScript Actor that reads the supplied `input.json`, pushes one structured result containing a greeting and timestamp, and exits. It validates local execution, deployment, hosted execution, and the platform access/visibility needed before POC selection. No opportunity-specific functionality is included.

**Test implementation:** [`validation-test/`](validation-test/)

## 2. Validation Results

| Test item | What was tested | Status | Evidence / result | Issue / follow-up |
|---|---|---|---|---|
| Local initialization and execution | Ran the TypeScript Actor locally with `input.json`. | Pass | Local default dataset returned `{"message":"Hello Local test", ...}`. | None. |
| Deployment/upload | Pushed the Actor to Apify. | Pass | Actor ID: `id3wVM0E3zgdpsFyF`. | None. |
| Hosted execution | Called the deployed Actor with `apify call --input-file input.json -o`. | Pass | Run ID: `f17kghj72KgZV7IWA`; dataset ID: `a6tFI3drxthZseTxH`. | None. |
| Authenticated direct Apify API invocation | Confirmed `validation-test/.env` is ignored (`git check-ignore -v`), loaded `APIFY_TOKEN` in-process, and invoked the Actor with the documented Bearer-header REST endpoint. | Pass | `POST /v2/actors/id3wVM0E3zgdpsFyF/runs?waitForFinish=60` succeeded and created run `6uJVjBhgrt84pZ8NG`. The token was not printed or persisted. | None. |
| Structured result retrieval from direct API invocation | Retrieved the default dataset for the API-created run through REST. | Pass | Dataset `6gGT5fALSVWvDvdZw` returned one structured item: `{"message":"Hello API validation", ...}`. | None. |
| Run status visibility | Retrieved the API-created run through `GET /v2/actor-runs/{runId}` and polled until terminal. | Pass | Run `6uJVjBhgrt84pZ8NG` status: `SUCCEEDED`. | None. |
| Run log visibility | Retrieved `GET /v2/actor-runs/{runId}/log` for the API-created run. | Pass | HTTP 200; 10 log lines returned, including the API-validation input/run activity. | None. |
| Run usage/resource/cost visibility | Retrieved authenticated run usage, cost and statistics from the run object. | Pass | `usageTotalUsd`: `0.0000696536925898658`; `ACTOR_COMPUTE_UNITS`: `0.00009763888888888889`; `KEY_VALUE_STORE_WRITES`: `1`; external transfer: `6.2957406044006348e-07` GB. `usageUsd` included compute `0.00001952777777777778`, key-value writes `0.00005`, and external transfer `1.2591481208801271e-07`; run stats showed `durationMillis`: `1406` and `computeUnits`: `0.00009763888888888889`. | None. |

The local and hosted results establish the execution path; the direct REST checks above additionally confirm authenticated invocation, structured retrieval, run visibility, logs, and usage/cost visibility.

## 3. Issues Discovered

An initial sandboxed attempt could not connect to Apify before receiving an HTTP response. The same checks were then executed from the local PowerShell network path and completed successfully; this was an execution-environment limitation, not an Apify implementation failure. The token was loaded only in-process from the ignored `.env` and was never output or persisted.

## 4. Step 2 Completion

**Step 2 complete:** Yes

**Open blockers:** None

All material local, deployment, hosted, authenticated REST invocation, structured result, status, log, and usage/resource/cost checks passed. No implementation blocker remains.

## 5. Gateway 1 — Prerequisites Validated

**Decision:** Pass

**Rationale:** The minimal Actor was executed locally, deployed, run through the hosted CLI and invoked through the authenticated Apify REST API. The API-created run returned a structured result and exposed status, logs, resource usage, and cost evidence, with no unresolved material blocker before commercial POC selection and definition.

**Non-blocking observations:** None.
