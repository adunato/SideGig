# Curious Coder LinkedIn Jobs Scraper

- **Product / provider:** `curious_coder/linkedin-jobs-scraper` / Curious Coder
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** Recruitment & jobs intelligence
- **URL:** https://apify.com/curious_coder/linkedin-jobs-scraper
- **Why selected:** Established benchmark within the LinkedIn jobs segment, with long operating history, market-leading current usage, extensive public product documentation, visible pricing, reviews, issue history and changelog. It provides a strong first case for understanding both the commercial model and the capability required to operate a mature jobs-data product.
- **Assessment date:** 2026-08-31

## 1. Case Overview

Curious Coder's LinkedIn Jobs Scraper is a mature Apify Actor that converts LinkedIn public job-search results into structured datasets. Users can provide LinkedIn search URLs or structured search inputs and receive job, company and job-poster information through Apify datasets, downloads or API integrations.

As of 31 August 2026, Apify shows approximately **15,000 monthly active users**, **144,000 total users**, **1,200 bookmarks**, and a **4.6/5 rating from 140 reviews**. ActorConsole independently reports approximately **14,700 active users and 483,200 runs in the last 30 days**. This implies roughly **33 runs per monthly active user**, supporting the conclusion that the product is used recurrently and at substantial operational scale rather than primarily for one-off experimentation.

Curious Coder is itself an established Apify seller. ActorConsole reports 44 public Actors, approximately 272,000 total users, 21,000+ monthly active users and 3.2 million runs over 30 days across the portfolio. The LinkedIn Jobs Scraper accounts for roughly 69% of the portfolio's active-user base. Some commercial performance may nevertheless benefit from seller reputation, portfolio cross-selling and accumulated marketplace presence rather than product characteristics alone.

## 2. Commercial Opportunity

### Product / service

The Actor sells structured access to LinkedIn jobs data. It accepts either LinkedIn jobs search URLs or structured filters and returns detailed records including job title, company, location, salary information, description, applicant count, job-poster details, seniority, employment type, function, industry, company information, application method and workplace type where available.

The product supports scheduled use, dataset export and programmatic access through the Apify API. The README explicitly describes daily scheduled collection of newly posted jobs, making the product suitable for recurring monitoring workflows as well as one-off extraction.

### Customer and buyer use case

The observable use cases extend beyond individual job seekers. The product is categorised under both **Jobs** and **Lead generation**. Public usage examples and issues show recurring, commercially motivated use including high-volume lead-generation agencies and automated job-search workflows.

The main buyer/use-case groups therefore appear to include:

- recruiters and recruitment automation workflows;
- lead-generation agencies using hiring activity as a commercial signal;
- labour-market and hiring-intelligence workflows;
- job-search automation and monitoring;
- developers, data pipelines and AI agents requiring structured LinkedIn jobs data through an API.

The exact distribution of users and paying customers is private.

### Value proposition

The product's value proposition is not simply access to public LinkedIn jobs pages. It converts an unstable web source into a reusable structured data service while removing the buyer's need to build and continuously maintain a LinkedIn-specific scraper.

Its mature proposition includes:

- structured and enriched job records rather than raw pages;
- bulk collection and pagination;
- duplicate handling;
- scheduled collection of new jobs;
- API and workflow integration;
- handling of LinkedIn's approximate 1,000-result-per-search limit through location splitting;
- structured search inputs and compatibility translation when LinkedIn changes filter behaviour;
- access to company and job-poster information alongside the core listing;
- ongoing adaptation to source-side failures, rate limits and search changes.

The case therefore illustrates that a mature scraping product competes heavily on **reliability and maintenance capability**, not only on initial extraction functionality.

### Demand and traction

Current demand evidence is strong:

- approximately **15K monthly active users** on Apify;
- approximately **144K total users**;
- approximately **1.2K bookmarks**;
- **140 reviews** with a **4.6/5** rating;
- approximately **14.7K active users and 483.2K runs over 30 days** in ActorConsole.

The ActorConsole figures imply approximately **32.9 runs per active user per month**. Public issues and documentation also show users scheduling daily runs and performing high-volume commercial extraction. One lead-generation agency user explicitly asked for monthly pricing because per-result charging was becoming expensive at daily high volume.

These signals support high confidence that the Actor serves established recurring demand.

### Pricing and monetisation

The current pricing page provides unusually useful detail:

- **Free-plan users:** $2.00 per 1,000 results, paid from the user's Apify platform credits;
- **Starter / Scale / Business users:** $1.00 per 1,000 results;
- **Actor-start event:** $0.00005 per applicable memory unit/start event;
- **Platform usage:** included in the advertised event price rather than separately charged to the customer.

This creates an important distinction between **customer-visible charging** and **creator revenue**. Apify's PPE documentation states that creator profit is calculated as:

`profit = (0.8 × paid-plan event revenue) - platform costs`

and that **usage by users on Apify's Free plan is not included in creator revenue or platform costs**. Free users therefore create adoption and run-count activity but do not directly contribute to the developer's payout under the current PPE economics.

This is why monthly active users and total runs cannot be multiplied directly by the displayed price. The economically relevant variables are:

1. results produced per run;
2. proportion of result volume generated by paid-plan customers;
3. platform cost of producing those paid results.

### Revenue estimate

Revenue is private, but the public data is sufficient to construct a useful scenario estimate rather than leave the question unanswered.

#### Observed inputs

- **483,200 runs / 30 days** (ActorConsole).
- **14,700 active users / 30 days**, or about **33 runs per active user**.
- Paid Apify plans are charged **$1 per 1,000 results**.
- Free-plan users are charged **$2 per 1,000 results** against their included credits, but their usage produces **no creator revenue**.
- The Free plan currently contains **$5 of monthly platform usage**, so a free user spending all of it exclusively on this Actor could obtain at most roughly **2,500 results per month** at the free-tier event price.

That free-tier ceiling is informative. At the observed average of 33 runs per active user, a free user spending all $5 solely on this Actor could average only about **76 results per run** before exhausting the monthly credit. The Actor's documentation and public issues show common use cases requesting tens to hundreds of jobs and support use above 1,000 results. This makes it unlikely that the product's result volume is dominated entirely by free users even though the user count may contain many free accounts.

#### Scenario assumptions

Because results per run and paid/free output share are not public, three scenarios are used:

| Scenario | Average results per run | Paid-plan share of result volume | Rationale |
|---|---:|---:|---|
| Low | 50 | 25% | Assumes many small monitoring/API calls and a large free-user contribution. |
| Base | 100 | 45% | Consistent with public examples requesting around 100 results, the 33-runs/user activity level, and the free-plan credit ceiling. |
| High | 250 | 60% | Represents heavier commercial/agency use while remaining well below the Actor's supported 1,000+ result workflows. |

These assumptions are not measurements. They are a transparent bracket around the two private variables that matter most.

#### Estimated monthly economics

| Scenario | Estimated paid results / month | Paid customer event revenue | Creator 80% share before platform costs |
|---|---:|---:|---:|
| Low | 6.0M | **$6.0K** | **$4.8K** |
| Base | 21.7M | **$21.7K** | **$17.4K** |
| High | 72.5M | **$72.5K** | **$58.0K** |

The **best central estimate** is therefore approximately **$15K-$25K per month of creator remuneration before platform costs**, with a deliberately broad plausible range of roughly **$5K-$60K per month**. Annualised, the central estimate is roughly **$180K-$300K before platform costs**, while the broad scenario range is approximately **$58K-$696K**.

**Revenue-estimate confidence: Low-Medium.** The run count and pricing inputs are strong; results per run and paid-plan result share are inferred. The estimate should therefore be treated as order-of-magnitude economics, not reported revenue.

Platform costs then reduce the creator's 80% share. Their exact level is not public. As a sensitivity rather than an asserted estimate, if platform costs consumed 10%, 20% or 30% of the base-case creator share, monthly profit would be approximately **$15.7K, $13.9K or $12.2K** respectively. The main conclusion is robust to reasonable platform-cost assumptions: this appears capable of being a **five-figure monthly product**, materially above the project's modest side-income target.

### Competition and differentiation

Competition is substantial. Apify currently surfaces many LinkedIn jobs Actors, including products from Bebity, cheap_scraper, Crawlworks, Dataji, Automation Lab, SolidCode and newer entrants. Current competitors range from very low-cost lightweight extraction to approximately $1 per 1,000 results and enriched premium propositions.

Curious Coder's product is therefore not differentiated primarily by being cheapest. Its visible advantages are:

- very large installed user base and accumulated reviews;
- a long operating history;
- broad output fields and enrichment;
- active adaptation to LinkedIn changes;
- seller reputation and a wider scraping portfolio;
- established API/workflow use;
- demonstrated handling of high-volume and recurring workloads.

The case suggests that incumbent advantage in this segment is materially based on trust, reliability history, source-specific engineering knowledge and accumulated distribution. Price competition nevertheless creates pressure because the underlying buyer need can be served by technically similar products.

### Economics and cost drivers

The model is highly scalable because revenue is tied to results while Apify supplies hosting, billing, datasets, API access, scheduling and marketplace distribution.

Important variable cost drivers for the developer are:

- Actor compute and memory;
- network/data transfer;
- proxy traffic;
- retries caused by LinkedIn rate limiting, 403/429 responses and proxy failures;
- requests required to retrieve full job/company details;
- extra work created by pagination, location splitting and duplicate elimination;
- dataset/storage operations.

Apify explicitly calculates PPE creator profit as 80% of paid event revenue minus underlying platform costs. Implementation efficiency therefore directly affects margin.

There is no evidence of proprietary dataset licences or other major external data-purchase costs. The key external assets are LinkedIn's public jobs surfaces and Apify's execution/proxy infrastructure.

### Operating model

The product is delivered as an automated self-service Actor, so customer ordering, execution, billing and data delivery are largely handled by Apify. The seller does not need to operate a separate payment system, customer portal, API gateway, scheduler, storage service or general-purpose server fleet.

The technical product nevertheless requires meaningful ongoing maintenance. The 2026 changelog alone records fixes for incomplete result sets, missing application URLs, pagination loops, irrelevant result drift, LinkedIn serving reduced search pages and LinkedIn's August 2026 move toward AI-powered job search with fewer URL filters. The developer responded by adding structured AI-search inputs and backward-compatibility conversion of older filters into natural-language search terms.

This is therefore a **low-touch commercial delivery model but a high-maintenance source integration**.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium-High** | A basic scraper is straightforward for an experienced developer, but mature parity requires search/detail extraction, pagination, deduplication, retries, proxy handling, location splitting, schema enrichment, filter translation, concurrency and resilient state management. | High |
| Domain expertise | **Medium** | Requires detailed knowledge of LinkedIn job-search semantics, location/geo IDs, search/filter behaviour, useful job/recruiter/company fields and downstream recruitment/lead-generation workflows. Deep HR expertise is not required. | Medium-High |
| Data / resource access | **Medium** | Core data is available through public LinkedIn jobs surfaces and this Actor does not require a user's LinkedIn login. No proprietary dataset is evident. Reliable production requires Apify runtime/storage/API services and proxy/network capacity. | High |
| Operating complexity | **High** | Changelog and issue evidence show repeated source changes, rate limits, incomplete-result problems and search-semantics changes requiring active fixes. | High |
| Cost intensity | **Low-Medium** | Fixed infrastructure requirements are low because Apify supplies execution and delivery infrastructure. Variable compute, proxy, traffic and storage costs scale with paid usage and are borne by the developer under the current included-usage PPE model. | Medium-High |

### Capability architecture and required assets

The public evidence is sufficient to reconstruct the product at a useful architectural level.

#### 1. Apify application and delivery layer

A March 2026 user-shared run log directly reports:

- **Node.js 18.20.8**;
- **Apify SDK 3.6.0**;
- **Apify Client 2.22.2**;
- **Crawlee 3.16.0**;
- **Linux** execution inside an Apify Actor container.

This means the core stack is not merely speculative: the product is demonstrably a Node.js/Crawlee Actor running on Apify's container infrastructure. Apify provides the Docker execution environment, API endpoint, datasets, scheduling/tasks, storage, usage metering, billing and marketplace distribution.

A competing implementation therefore **does not require a separate production server stack**. The minimum platform asset is an Apify Actor project containing the application code, Actor configuration/input schema, Docker build configuration and product metadata. Apify's normal Actor onboarding is relatively lightweight: create from a template or existing containerised code, define input/output, build, test and publish.

#### 2. Search-input and query-translation layer

The product must translate buyer intent into valid LinkedIn searches. Current inputs support either:

- direct LinkedIn job-search URLs; or
- structured inputs such as keywords, location, geo ID, distance, date posted, company IDs and applicant-count filters.

LinkedIn's August 2026 AI-search change removed several legacy URL-filter behaviours. Curious Coder added a compatibility layer that converts discontinued experience-level, job-type and workplace filters into natural-language search terms. This layer is a genuine piece of product capability rather than simple scraping.

Required assets include:

- knowledge of LinkedIn search parameters and current behaviour;
- mappings for locations/geo IDs and search geography;
- filter-to-query conversion logic;
- backward-compatibility handling for old URLs and inputs;
- input validation and user-facing schema/documentation.

#### 3. Job-search extraction engine

Recent run logs expose request labels including `JOB_SEARCH` and `JOB_DETAILS2`, with HTTP 403/429 and proxy 595 errors. Combined with Crawlee system information and the absence of browser-start traces, this strongly indicates an **HTTP-first Crawlee request pipeline** rather than a browser-heavy architecture for the main path.

The engine needs to:

- fetch public LinkedIn search pages/endpoints;
- parse job identifiers and summary records;
- enqueue job-detail requests;
- parse full detail pages into a stable output schema;
- control concurrency and request pacing;
- retry transient source/proxy failures;
- preserve state when runs fail or are resurrected.

Historical logs show Crawlee dynamically operating at approximately five or six concurrent requests in example runs, although current production concurrency may vary.

#### 4. Pagination, completeness and scale layer

This is one of the harder parts of the capability.

LinkedIn limits an individual search to roughly 1,000 accessible results. The Actor works around this by splitting searches geographically into multiple city/location searches and deduplicating the resulting jobs. The changelog also shows several cases where LinkedIn pagination behaviour changed, returned repeated pages, exposed only ~60 jobs or drifted into irrelevant results.

A mature implementation therefore needs:

- pagination/offset logic;
- duplicate detection based on job identity;
- detection of repeated pages and false continuation;
- detection/retry of reduced-result LinkedIn page variants;
- geographic search segmentation to exceed the 1,000-result ceiling;
- limits per source/query and global limits;
- completeness diagnostics and logging.

This layer is a significant differentiator between a scraper that technically works and one that buyers can depend on.

#### 5. Enrichment and normalisation layer

The product returns considerably more than search-card data. The output can include company details, job-poster information, salary insights, applicant counts, employment type, seniority, functions, industries, application method, standardised title, country and workplace type.

This requires:

- additional detail requests;
- parsers for multiple LinkedIn page/data structures;
- normalisation into a consistent schema;
- handling of optional/missing fields;
- schema evolution when LinkedIn adds or removes fields.

The relevant domain capability is therefore partly **data-product design**: deciding which fields are commercially useful and keeping their semantics consistent.

#### 6. Blocking, proxy and reliability layer

Public issue logs show HTTP 403, HTTP 429, proxy 595/ECONNRESET and historical proxy-payment failures. The Actor retries these conditions and stores state.

Required operational assets include:

- Apify Proxy configuration and appropriate proxy groups;
- retry/backoff rules by error type;
- concurrency limits;
- session/request rotation where required;
- run-state persistence and resurrection;
- observability around request failures and incomplete outputs.

This is an ongoing capability because the correct strategy is determined by LinkedIn's current behaviour rather than by a one-time implementation choice.

#### 7. Output, API and automation layer

Apify supplies most generic infrastructure, but the product still needs a coherent interface:

- stable default-dataset schema;
- CSV/JSON/XLS exports through Apify;
- synchronous/asynchronous Actor API access;
- OpenAPI/API examples;
- tasks and schedules for recurring collection;
- examples for external integrations and agent workflows.

The developer's task is therefore mainly packaging and schema design rather than building an API gateway or storage platform from scratch.

#### 8. Monetisation layer

The Actor is configured with PPE events tied primarily to output results plus an Actor-start event. Platform usage is included in the event price, so the implementation must both trigger charging correctly and remain resource-efficient enough to retain margin.

No separate billing system is required; Apify handles customer billing and creator payouts.

#### 9. QA, maintenance and support assets

A market-leading implementation needs a persistent maintenance capability, not only source code. The evidence suggests the following assets are required:

- representative regression searches across countries, query types and result volumes;
- checks for result completeness, duplicate rates and missing fields;
- regression tests for legacy and new search-filter semantics;
- monitoring for sudden drops in results or spikes in HTTP/proxy errors;
- fast source-change investigation capability;
- changelog/release discipline;
- issue triage using shared customer runs and logs.

The public changelog is effectively evidence of an accumulated source-specific knowledge base built over multiple years.

### Development stages and indicative effort

For an experienced web-scraping developer already familiar with Node.js/TypeScript, Crawlee and Apify, the capability can be thought of in stages:

| Stage | Main work | Indicative difficulty / effort |
|---|---|---|
| 1. Actor onboarding | Create Actor, input/output schema, Docker/build configuration, dataset/API wiring. | **Low** — hours to ~1 day. |
| 2. Functional LinkedIn prototype | Public search request, job IDs, detail extraction, basic dataset output. | **Low-Medium** — roughly 1-3 days. |
| 3. Productised scraper | Filters, pagination, dedupe, field normalisation, concurrency, retries, documentation. | **Medium** — roughly 1-2 weeks. |
| 4. Reliable scalable product | Proxy strategy, completeness logic, search segmentation, state/resurrection, failure diagnostics, API compatibility. | **Medium-High** — additional 1-3 weeks. |
| 5. Mature incumbent-grade feature set | Broad enrichment, legacy compatibility, geography handling, edge cases, regression coverage and accumulated fixes. | **High cumulative effort** — several additional weeks/months of iteration. |
| 6. Ongoing maintenance | React to LinkedIn changes, blocking, field/search changes and customer failures. | **Persistent** — unpredictable hours/days per incident. |

**Effort-estimate confidence: Low-Medium.** These are engineering estimates based on the observed architecture and feature set, not reported development times. They are intended to distinguish the ease of creating a basic Actor from the much larger cumulative capability represented by a mature market leader.

### Development versus maintenance

The case makes this distinction particularly important:

- **Development complexity:** moderate. An experienced scraper developer could build a useful first version quickly using Apify, Node.js and Crawlee with no proprietary data and no separate server infrastructure.
- **Market-leader development complexity:** materially higher. Search segmentation, enrichment, result completeness, compatibility logic and productisation require significant hardening.
- **Maintenance complexity:** high. LinkedIn is the dominant external dependency and repeatedly changes page behaviour, pagination and search semantics. A product serving thousands of active customers must detect and repair those changes quickly.

Thus the scarce capability is not primarily "ability to write a scraper." It is **ability to operate and continuously adapt a reliable source-specific data product at scale**.

## 4. Case Findings

### Intrinsic characteristics

The following appear intrinsic to a LinkedIn-jobs-data opportunity rather than unique to Curious Coder:

- recurring demand for fresh structured job data;
- value from automation, scheduling and API access;
- dependence on an external source outside the seller's control;
- risk of changes to filters, pagination, page structure and accessible fields;
- per-result economics that reward efficient extraction;
- need to manage duplicates, completeness and freshness;
- competition from technically similar products.

### Case-specific characteristics

The following appear more specific to this provider or implementation:

- the very large accumulated user and review base;
- Curious Coder's established seller reputation and wider Actor portfolio;
- the particular breadth of company and job-poster enrichment;
- the current automatic conversion of discontinued LinkedIn filters into AI-search terms;
- the location-based method used to work around LinkedIn's approximate 1,000-result search limit;
- the provider's accumulated support history and source-specific fixes.

These should not automatically be treated as minimum requirements for every product in the wider recruitment/jobs opportunity area.

### Wider opportunity-area relevance

This case strongly supports several wider hypotheses for **Recruitment & jobs intelligence**:

1. Jobs data can support very large recurring usage and potentially five-figure monthly seller economics on Apify.
2. Buyer value comes from structured, continuously accessible data rather than from one-off scraping alone.
3. Source choice is a major determinant of operating burden. LinkedIn's volatility creates substantially more maintenance than a stable ATS or public feed might require.
4. Data access need not be proprietary for a product to have meaningful commercial value; engineering reliability and packaging can themselves be monetisable capability.
5. Mature incumbents can retain strong usage despite cheaper entrants, suggesting trust, reliability and accumulated distribution matter alongside price.
6. Apify materially reduces generic infrastructure requirements; most differentiating capability sits in source acquisition, transformation, reliability and maintenance rather than hosting/billing/API infrastructure.

These findings should be tested against additional representative cases before being extrapolated to the opportunity area as a whole.

### Key uncertainties

- Actual Actor revenue, creator payout and platform costs are private.
- Results per run and paid-plan share of result volume are inferred; they dominate the revenue-estimate uncertainty.
- Monthly active users do not identify paying customers or spend per customer.
- The current source repository is private. The stack is evidenced through run logs, but some internal design details remain inferred.
- Exact proxy configuration, memory allocation and resource cost per result are private.
- Developer time spent on support and maintenance is unknown.
- The observed maintenance burden is LinkedIn-specific and may overstate the burden for products built on stable job-board APIs, ATS endpoints or feeds.
- Some usage may benefit from Curious Coder's wider marketplace reputation and cannot be attributed solely to the product proposition.

## 5. Evidence and Sources

Directly observed product, seller and platform evidence is prioritised. Third-party sources are used as secondary evidence where they expose otherwise useful marketplace-level usage information or demonstrate downstream use cases.

### Sources

1. Curious Coder LinkedIn Jobs Scraper — https://apify.com/curious_coder/linkedin-jobs-scraper
2. Actor pricing — https://apify.com/curious_coder/linkedin-jobs-scraper/pricing
3. Actor API/OpenAPI — https://apify.com/curious_coder/linkedin-jobs-scraper/api
4. Actor reviews — https://apify.com/curious_coder/linkedin-jobs-scraper/reviews
5. Actor issues — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/open
6. Actor changelog — https://apify.com/curious_coder/linkedin-jobs-scraper/changelog
7. Curious Coder Apify profile — https://apify.com/curious_coder
8. Apify pay-per-event pricing documentation — https://docs.apify.com/actors/publishing/monetize/pay-per-event
9. Apify Actor pricing and costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
10. Apify monetisation documentation — https://docs.apify.com/actors/publishing/monetize
11. Apify platform pricing — https://apify.com/pricing
12. Apify Actor development documentation — https://docs.apify.com/actors/development
13. Apify Actor deployment workflow — https://docs.apify.com/academy/deploying-your-code
14. Apify Store publishing terms — https://docs.apify.com/legal/store-publishing-terms-and-conditions
15. ActorConsole Curious Coder profile — https://actorconsole.com/builders/curious_coder?window=30
16. High-volume lead-generation pricing issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/rentalmonthly-pricin-GJbM7nnS9zIlcbvvf
17. March 2026 incomplete-results / system-log issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/seeing-errors-and-a-SYOwVmf2icOzPoMxc
18. Historical rate-limit/system-log issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/too-many-requests-er-bPibmu3Rlj3otW2Qy
19. Result-limit issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/result-count-limit-s-pQ3QdEPEMOvkUiuTV
20. Concurrent-runs issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/do-you-not-allow-con-cTiiO63PP6fS3LCrm
21. SolidCode LinkedIn Jobs Scraper competitor — https://apify.com/solidcode/linkedin-jobs-scraper
22. Coregent LinkedIn Jobs Scraper competitor — https://apify.com/coregent/linkedin-jobs-scraper

### Material inferences and limitations

- **Inference — revenue (Low-Medium confidence):** the scenario model combines observed 30-day run volume and exact pricing with explicit assumptions for results per run and paid-plan share. The central estimate is intended as an order-of-magnitude estimate, not a claimed seller disclosure.
- **Inference — paid-result share (Medium-Low confidence):** free users receive only $5 monthly credits and face a $2/1K result price on this Actor; combined with ~33 runs per active user and observed high-volume use, this makes a material paid-result share likely. The actual share is private.
- **Inference — HTTP-first architecture (High confidence):** current run logs expose Node.js/Crawlee, `JOB_SEARCH` and `JOB_DETAILS2` HTTP request labels, 403/429/proxy errors and no browser-start trace. Internal implementation could still use browser tooling on edge paths.
- **Inference — competitive advantage (Medium-High confidence):** continued market-leading usage despite cheaper competitors suggests reputation, reliability, feature breadth and accumulated distribution matter. Their individual contribution cannot be separated.
- **Inference — build effort (Low-Medium confidence):** indicative development times are based on the observed architecture/feature set and general software-development effort, not reported developer time.
