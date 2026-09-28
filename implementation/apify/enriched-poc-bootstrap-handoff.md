# Enriched Google News POC — Repository Bootstrap Handoff

- **Channel:** Apify Store
- **Current POC:** [implementation/apify/poc.md](poc.md)
- **Legacy POC:** [implementation/apify/legacy/google-news-metadata-poc.md](legacy/google-news-metadata-poc.md)
- **Preparation date:** 2026-09-26
- **Preparation status:** Ready for repository bootstrap — deliberately paused before repository creation
- **Proposed repository:** `adunato/google-news-enriched-actor-poc`
- **Proposed repository visibility:** Private at bootstrap
- **Target runtime:** TypeScript / Node.js on Apify Actor
- **Canonical SideGig bootstrap package:** v2.6.0 at preparation time

## 1. Purpose

This handoff records the implementation preparation required after Gateway 3 and before the new enriched Google News POC repository is created.

It deliberately stops before repository establishment. The next project-establishment action, when resumed, is to run the standard SideGig product-repository bootstrap using this handoff and the current POC definition as upstream context.

The pause is intentional so the superseded metadata-only POC can first complete its Apify deployment and operational closeout. Any reusable deployment, Store, monetisation, monitoring or release lessons from that exercise must be reviewed before the new repository is bootstrapped.

## 2. Repository Decision

**Decision:** Create a new product repository for the enriched Google News POC.

**Repository identity:** `adunato/google-news-enriched-actor-poc`

**Initial visibility:** Private, following the Development Operating Model default. The Apify Actor may later be public in the Store without requiring the GitHub repository itself to be public.

### Rationale

The enriched POC is a separately deployable commercial experiment with a materially different external contract from the legacy metadata POC:

- resolved publisher URLs are now a core product capability;
- optional best-effort full-text extraction is part of the public contract;
- output status fields and fail-soft semantics are new;
- pricing, capability evidence and operational thresholds differ;
- it requires a separate 30-day observation baseline and evidence trail.

The legacy `adunato/google-news-actor-poc` repository must remain intact as historical and operational evidence while it completes deployment learning. Reusing that repository as the current enriched project would mix two different experiment histories and make the legacy closeout harder to interpret.

A new repository does **not** imply a rewrite from scratch. Reusable implementation is carried forward selectively through normal post-bootstrap Issues.

## 3. Legacy Implementation Baseline

The reusable implementation source is:

- **Repository:** `adunato/google-news-actor-poc`
- **Development branch:** `dev`
- **Development baseline:** `51f89df7c21cb40787fbc84c1658c96ebdf5c8b3`
- **Final development merge:** PR #16 — Prepare deployable Apify POC package and Store docs
- **Legacy status:** development implementation complete; deployment/operational continuation still pending

The baseline contains:

- TypeScript/Node.js Apify Actor runtime;
- validated Actor input normalization;
- bounded Google News RSS request adapter with retries/timeouts/body limits;
- Google News XML parsing and metadata normalization;
- multi-query orchestration;
- optional cross-query deduplication;
- default-dataset delivery;
- native Apify input/output/dataset schemas;
- Actor Docker packaging and local package smoke validation;
- public-facing README/deployment instructions;
- repository validation, CI and SideGig lifecycle infrastructure.

## 4. Implementation Delta

| Area | Legacy metadata POC | Enriched POC requirement | Reuse decision |
|---|---|---|---|
| Apify Actor runtime | Single TypeScript Actor using Apify SDK | Same runtime model | **Reuse design/pattern**. Bootstrap fresh repository infrastructure; carry product runtime code forward through controlled implementation work. |
| Query input model | Queries, result limit, language, country, recency, dedupe | Same controls plus `resolvePublisherUrls` and `includeFullText`; new defaults are `en-GB` / `GB` | **Adapt**. Preserve validation approach and common fields; revise defaults/schema and add new controls. |
| Google News request adapter | Bounded RSS HTTP requests, retry/timeout/size controls | Same Google News discovery source | **High reuse**. Treat the existing request adapter and its tests as the implementation reference unless legacy deployment exposes a defect. |
| Google News parser | Parses/normalizes feed metadata | Metadata remains first stage before enrichment | **High reuse with contract reconciliation**. Preserve parser logic where compatible; align emitted fields to the new Product Definition rather than copying the legacy contract wholesale. |
| Multi-query orchestration | Sequential bounded requests, per-query limits, dedupe, dataset writes | Same search flow plus URL-resolution and optional full-text stages | **Adapt**. Preserve orchestration concepts and insert enrichment before final dataset delivery. |
| Publisher URL resolution | Explicitly out of scope | Core differentiated capability; fail-soft | **Technical Discovery prerequisite, then new implementation**. Google News does not provide an approved integration specification for the required publisher-URL resolution path in this project. Empirically establish the viable HTTP-first boundary/approach before HLD or implementation; third-party decoder code is evidence to investigate, not a specification to implement against. |
| Full-text extraction | Explicitly out of scope | Optional, best-effort, HTTP-based, fail-soft | **New implementation**. No browser/paywall bypass/residential-proxy dependency. |
| Output contract | Metadata + Google News URL, optional feed fields | Google URL + resolved publisher URL/status + optional article text/status/word count | **Replace/adapt**. New schemas and contracts are authoritative; legacy fields are retained only where the new Product Definition deliberately includes them. |
| Error semantics | Source-level request/parser failures observable | Per-row URL/full-text failure must not fail whole run | **Extend**. Existing source error handling is reusable; enrichment requires new row-level isolation/status semantics. |
| Native Actor schemas | Metadata-search schemas | New enriched input/output schemas | **Adapt/rebuild from current Step 7**. Do not copy legacy schemas as authoritative. |
| Dataset/API delivery | Default Apify dataset/API | Same delivery mechanism | **Reuse**. |
| Actor package/Dockerfile/smoke path | Working Apify package baseline | Same target platform | **Reuse pattern**, subject to deployment lessons from the legacy operational closeout. |
| Store README | Metadata-only public documentation | Enriched proposition, new inputs/outputs/pricing/limitations | **Rewrite** from the new product contract; legacy README may be used only as structural reference. |
| PPE / commercial configuration | Legacy metadata temporary pricing | $2/1,000 article-result events + $2/1,000 successful full-text events | **New configuration**. Legacy deployment lessons may inform setup mechanics, not price/experiment interpretation. |
| Monitoring/evidence | General Apify evidence concepts | Step 8 daily canary, capability samples, M1-M3, economics/pause rules | **New experiment configuration** using the same Apify-native platform capabilities. |
| CI / branch model / Issue templates / skills | Installed SideGig package from the legacy project lifecycle | Current SideGig standard | **Regenerate from canonical bootstrap**. Do not copy the legacy `.codex`, workflows or repository controls as the source of truth. |
| Tests | Strong coverage for input, request, parser and orchestration | Existing behaviours plus enrichment/fail-soft/new-contract testing | **Reuse test cases/fixtures selectively** after bootstrap; extend substantially for new capabilities. |

## 5. Reuse Rules

The new project must not be created by cloning the legacy repository and renaming it.

At repository establishment:

1. run the current canonical SideGig bootstrap from `main`;
2. install the current canonical SideGig package rather than copying the legacy `.codex` package;
3. create the new durable Product and Architecture definitions from the current enriched POC context;
4. create only the baseline source/test/configuration structure needed for the new project.

After bootstrap:

1. create normal Feature/Bug Issues from the approved enriched POC boundary and use `assess-change` to identify any prerequisite Technical Discovery;
2. for publisher URL resolution, complete a dedicated Technical Discovery Issue before approving its HLD/Implementation Plan;
3. bring reusable product code and tests across as deliberate implementation inputs only after relevant discovery/design prerequisites are satisfied;
4. preserve source attribution/traceability in the relevant discovery/design/implementation artifacts or PR descriptions where useful;
5. adapt rather than blindly copy any code whose public contract, defaults, error semantics or operational evidence changed.

The legacy repository remains authoritative evidence for the superseded metadata experiment. It is not the durable product definition for the enriched POC.

## 6. Bootstrap Context

When repository establishment resumes, the bootstrap should use the following context.

### Product identity

- **Repository:** `adunato/google-news-enriched-actor-poc`
- **Working product title:** Enriched Google News Actor POC
- **Deployment unit:** one independently deployable Apify Actor
- **Repository visibility:** private at bootstrap
- **Default branch after bootstrap:** `dev`
- **Permanent branches:** `dev`, `staging`, `main`

### Authoritative upstream decisions

- `implementation/apify/poc.md` Step 6 — selected enriched Google News proposition and demand case;
- Step 7 — exact experiment/product boundary;
- Step 8 — operational evidence and intervention rules;
- Gateway 3 — Pass / commit to implementation;
- this handoff — repository/reuse decision only.

### Initial Product Definition intent

The bootstrap-generated `docs/product.md` should translate Step 7 into a durable definition containing, at minimum:

- developers, researchers, media-monitoring/PR users and AI/data workflows as intended users;
- Google News query, locale, recency, bounded-result and dedupe controls;
- publisher URL resolution as core behaviour;
- optional best-effort article-text extraction;
- explicit fail-soft status semantics;
- Apify dataset/API delivery;
- public paid POC boundary and temporary pricing context;
- explicit non-goals: browser rendering, paywall bypass, residential proxies, paid external extraction/news APIs, stateful monitoring, multi-source aggregation and AI enrichment.

### Initial Architecture intent

The bootstrap-generated `docs/architecture.md` should start from:

1. Apify Actor entrypoint/input validation;
2. bounded Google News request adapter;
3. Google News feed parser/normalizer;
4. publisher URL resolution stage;
5. optional HTTP article-fetch/readability stage;
6. row-level enrichment status/error isolation;
7. bounded multi-query/deduplication orchestration;
8. Apify default dataset/API delivery;
9. Apify-native logging, analytics, charging and monitoring evidence.

The architecture remains lightweight HTTP-first. Browser automation, residential proxies and paid extraction services are excluded by the current POC and must not be introduced during bootstrap.

### Runtime/tooling baseline

- TypeScript / Node.js;
- Apify SDK;
- standard SideGig local validation/CI contract;
- current canonical formatter/linter/test/build baseline;
- current SideGig learning-dispatch infrastructure;
- current canonical package version at actual bootstrap time, not the legacy repository package.

At preparation time the canonical SideGig bootstrap package is **v2.6.0**. Re-check the version when bootstrap actually runs.

## 7. Decisions Intentionally Deferred Until After Bootstrap

The following are implementation-lifecycle decisions, not prerequisites for repository creation:

- decomposition into Feature/Bug Issues and prerequisite Technical Discovery Issues;
- whether individual Feature/Bug Issues require Technical Discovery, HLD, Implementation Plan or LLD;
- exact publisher-link resolution algorithm, which must not be selected before the required discovery evidence exists;
- exact readable-text extraction library/algorithm;
- file/module decomposition beyond the initial architecture boundary;
- release-candidate implementation details.

Do not create these artifacts before repository bootstrap merely to make the handoff appear more complete.

## 8. Legacy Deployment Learning Checkpoint

Before the new repository is created, complete or deliberately stop the legacy operational-continuation activities recorded in `legacy/google-news-metadata-poc.md`:

1. Apify deployment/build;
2. hosted functional run and dataset verification;
3. Store/publication configuration;
4. PPE/billing/controlled-charge verification where practical;
5. monitoring/log/cost evidence;
6. learning capture and SideGig review where warranted;
7. legacy closeout.

After that work, review whether any resulting lesson changes:

- the SideGig bootstrap process/package;
- Apify Actor package/deployment conventions;
- secret/deployment workflow handling;
- Store/PPE configuration assumptions;
- monitoring/evidence capture;
- the enriched POC architecture or bootstrap context above.

If no material change results, this handoff remains executable as written. If a material lesson is integrated into SideGig first, bootstrap from the updated canonical `main`.

## 9. Bootstrap Preflight

Immediately before repository creation:

- confirm SideGig `main` contains any accepted legacy-deployment learnings;
- confirm the current bootstrap package version;
- confirm the reusable local bootstrap credential for automatic `SIDEGIG_COLLECTOR_DISPATCH_TOKEN` provisioning is available; bootstrap must stop if it is missing or invalid;
- confirm the repository name `google-news-enriched-actor-poc` is still unused;
- confirm no Step 7/Gateway 3 scope decision has changed.

These are preflight checks for the future bootstrap execution. They do not create the repository.

## 10. Stop Point

**Preparation complete:** Yes

**New repository created:** No

**Bootstrap executed:** No

**Implementation Issues created:** No

**Coding started:** No

**Current hold:** Complete the legacy metadata POC deployment/operational continuation and capture final reusable lessons.

**Exact resume action:** Reconcile any legacy closeout learnings, then execute the standard SideGig `bootstrap-project` process to create `adunato/google-news-enriched-actor-poc` from the current canonical SideGig baseline and this handoff.
