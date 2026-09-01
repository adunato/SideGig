# Automation Lab LinkedIn Jobs Scraper

- **Product / provider:** `automation-lab/linkedin-jobs-scraper` / Stas Persiianenko (Automation Lab)
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** Recruitment & jobs intelligence
- **URL:** https://apify.com/automation-lab/linkedin-jobs-scraper
- **Why selected:** Recent direct challenger to the established Curious Coder LinkedIn Jobs Scraper. It represents a deliberately lean entrant strategy: public guest API, pure HTTP extraction, minimum Apify memory allocation and materially lower pricing. It is useful for testing what a credible new entrant can achieve without reproducing the incumbent's full accumulated capability.
- **Assessment date:** 2026-09-01

## 1. Case Overview

Automation Lab's LinkedIn Jobs Scraper is a recently launched Apify Actor that extracts public LinkedIn job listings without login or cookies. It supports keyword/location searches, multiple queries, LinkedIn search URLs, standard job filters, full job-detail extraction and API/integration workflows.

The Actor launched on **17 March 2026**, making it roughly five and a half months old at assessment. Current Apify data shows approximately **653 total users**, **139 monthly active users**, a **4.7/5 rating from 3 reviews**, and a current issue-response time of roughly **0.8 hours**. A historical Apify crawl from roughly two months earlier showed approximately **343 total users and 134 monthly active users**. Taken directionally, this indicates continued account adoption while the monthly active base has remained broadly flat rather than scaling in proportion to cumulative users.

The case is deliberately complementary to the Curious Coder benchmark. It addresses essentially the same LinkedIn jobs-data need, but with a much simpler product and operating proposition.

## 2. Commercial Opportunity

### Product / service

The Actor sells structured LinkedIn jobs data on a pay-per-event basis. Users can search by keyword, company or location; provide multiple queries or LinkedIn jobs search URLs; apply job type, experience, workplace and recency filters; and optionally retrieve full job details.

Output includes job title, company, location, salary where available, workplace type, description, seniority, employment type, function, industry, applicant count, apply URL and benefits. The Actor can be called through the Apify API, scheduled, exported into standard file formats, connected to workflow tools, or exposed through Apify's MCP interface.

The product caps a run at 1,000 unique jobs, reflecting LinkedIn's public guest-search limit.

### Customer and buyer use case

The product explicitly targets:

- sales and lead-generation teams using hiring activity as an intent signal;
- recruiters and talent teams monitoring jobs, compensation and competitors;
- market and salary researchers;
- developers/data teams feeding jobs data into ETL, dashboards and AI agents;
- recurring job-monitoring workflows.

This is materially the same commercial buyer/problem space as the Curious Coder case, making the product a useful direct entrant comparison rather than a different opportunity area.

### Value proposition

The proposition is **low-cost, lightweight access to public LinkedIn jobs data**.

The strongest visible differentiators are:

- no LinkedIn login, cookies or customer account required;
- pure HTTP rather than browser-based extraction;
- 256 MB memory, the minimum Apify Actor allocation;
- datacenter proxy rather than mandatory residential proxy usage;
- structured inputs rather than requiring users to construct raw search URLs;
- full-detail extraction when required, with a faster summary-only mode;
- deterministic deduplication across multiple searches;
- materially lower pricing than the established Curious Coder benchmark.

The product therefore competes primarily on **cost and simplicity**, rather than on incumbent reputation, maximum enrichment breadth or accumulated source-specific edge-case handling.

### Demand and traction

Current traction is meaningful for a five-month-old Actor but still small relative to the market leader:

- approximately **653 total users**;
- approximately **139 monthly active users**;
- **3 reviews**, currently averaging **4.7/5**;
- published roughly five months ago;
- approximately **134 monthly active users** in an Apify crawl roughly two months earlier.

The most important signal is that monthly actives appear to have been broadly stable while cumulative users continued to rise. This suggests the Actor has demonstrated discoverability and trial adoption, but there is not yet evidence of rapid compounding active-user growth.

At roughly 139 MAU versus approximately 15K MAU for the Curious Coder benchmark, the entrant has captured around **1% of the incumbent's active-user scale** so far. That is still commercially relevant evidence: a new Actor with no long historical review base can gain a triple-digit active audience in several months.

### Pricing and monetisation

The Actor uses Apify pay-per-event pricing with platform usage included in the event price.

Current prices are:

| Event | Free | Starter / Bronze | Scale / Silver | Business / Gold |
|---|---:|---:|---:|---:|
| Job scraped | $0.58 / 1K | $0.50 / 1K | $0.39 / 1K | $0.30 / 1K |
| Run started | $0.005 | $0.005 | $0.005 | $0.005 |

Apify's PPE economics mean paid-plan event revenue is shared 80/20 with the creator, after which the creator bears the paid users' underlying platform usage costs when usage is included in the event price. Free-tier event activity contributes neither creator revenue nor creator-borne platform cost.

Compared with Curious Coder's approximate $1/1K paid-tier price, Automation Lab deliberately prices at roughly **30-50% of the incumbent rate**.

### Revenue estimate

Exact run volume, results per run and paid/free mix are private. The estimate therefore starts from the current active-user base and the Actor's observable usage design.

#### Observed inputs

- **139 monthly active users**.
- Default maximum output: **50 jobs**; configurable up to **1,000 jobs**.
- Product examples repeatedly use **50-100 job** requests.
- A full-detail 100-job run is advertised as completing in under one minute; summary-only 100 jobs in about five seconds.
- Paid result price ranges from **$0.30-$0.50/1K** plus $0.005/run.
- Historical Apify data shows monthly actives broadly stable around the mid-130s over the last two months.

#### Assumptions

Three scenarios are used because there is no public run-count series:

| Scenario | Runs / active user / month | Results / run | Paid share of usage | Weighted paid result price |
|---|---:|---:|---:|---:|
| Low | 8 | 50 | 20% | $0.45 / 1K |
| Base | 20 | 100 | 40% | $0.40 / 1K |
| High | 35 | 250 | 60% | $0.35 / 1K |

The base case assumes repeated monitoring/API use but materially less recurrent usage than the established Curious Coder benchmark, which has evidence of roughly 33 runs per active user per month. The paid-share assumptions reflect the likelihood that a young low-priced Actor still contains substantial trial/free usage.

#### Estimated range / scenarios

| Scenario | Estimated total results / month | Paid results / month | Customer event revenue | Creator 80% share before platform costs |
|---|---:|---:|---:|---:|
| Low | 55.6K | 11.1K | ~$6 | **~$5** |
| Base | 278K | 111K | ~$50 | **~$40** |
| High | 1.22M | 730K | ~$270 | **~$215** |

The event-revenue figures include an allowance for the $0.005 paid-run start charge.

#### Central estimate and confidence

The best current estimate is approximately **$25-$75/month creator gross remuneration before platform costs**, with a broad plausible range of approximately **$5-$215/month**.

Annualised, the current central estimate is only roughly **$300-$900/year before platform costs**. On available evidence, the Actor has not yet reached the project's £2K-£5K annual side-income target, although the high scenario approaches the lower end if usage continues to grow.

**Revenue confidence: Low.** Active users and pricing are observable, but current run frequency, results per run and paid-plan usage are all private. The principal conclusion is more robust than the exact number: at the present active-user scale and sub-$0.50/1K pricing, revenue is likely still modest unless a small number of users generate unusually large result volumes.

### Competition and differentiation

The direct comparison is the Curious Coder LinkedIn Jobs Scraper, which has roughly 15K MAU and a long review/history advantage. Numerous other LinkedIn jobs Actors are also visible on Apify, including providers such as Crawlworks, AgentX, Orgupdate and multiple recent no-login/guest-API entrants.

Automation Lab's differentiation is unusually explicit:

- lower price;
- pure HTTP / no browser;
- minimum memory footprint;
- no login/cookies;
- datacenter proxy support;
- straightforward structured input;
- optional detail-fetching to trade richness for speed/cost.

This makes it a useful example of a **cost-leadership entrant** rather than an attempt to beat the incumbent on every feature. The early traction indicates that this positioning can attract users, but the stable MAU base does not yet demonstrate displacement of the leader.

### Operating model

Commercial delivery is low-touch because Apify handles execution, billing, storage, API access, schedules and integrations.

The technical source still requires maintenance. The public changelog shows several material updates within the first five months:

- June: timeout reduction/partial-result handling for larger runs;
- July: correction of job-type filter leakage;
- August: multi-query and search-URL support with deterministic deduplication.

The product itself states that LinkedIn can rotate HTML structure and that high-volume scraping can trigger temporary rate limits. This confirms that even the lean implementation retains ongoing source-maintenance exposure.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Low-Medium** | Public guest endpoints, pure HTTP/Cheerio extraction, 256 MB runtime and no browser reduce build complexity. Commercial quality still requires filtering, pagination, details, deduplication, retries and source-change handling. | High |
| Domain expertise | **Low-Medium** | Requires understanding LinkedIn job-search parameters and recruitment/lead-generation data needs, but no specialised HR IP or proprietary analytics are evident. | Medium-High |
| Data / resource access | **Low** | Uses public guest jobs endpoints with no account/cookies and works with datacenter proxies. Apify supplies execution, storage, APIs, billing and scheduling. | High |
| Operating complexity | **Medium** | Low-touch platform delivery, but LinkedIn rate limits/HTML changes and early changelog fixes show recurring source maintenance. | High |
| Cost intensity | **Low** | 256 MB HTTP-only design, datacenter proxy support and sub-$0.50/1K selling price imply very low platform resource cost. | Medium-High |

### Technical complexity

This case demonstrates that a commercially usable LinkedIn jobs Actor does not inherently require a browser-heavy or infrastructure-heavy design. The provider explicitly documents a **pure HTTP + Cheerio** implementation with no Playwright/Puppeteer, 256 MB memory and datacenter proxy support.

The functional capability nevertheless extends beyond one HTTP request. The Actor supports search construction, multiple queries and raw search URLs, filters, pagination, full-detail requests, deduplication across searches, retry/backoff and API-compatible structured output. The guest API exposes roughly 25 search results per page and approximately 1,000 accessible results per query, so pagination and result caps are part of the product semantics.

The first five months of changelog activity also show that source/product correctness creates real work even with a simple architecture. Filter validation, timeout handling and multi-query deduplication have already required updates.

The appropriate conclusion is therefore **low-medium technical complexity**: initial extraction is straightforward for an experienced scraper developer, while reliable commercial packaging and continuing source compatibility require more than a trivial script.

### Domain expertise

The required domain knowledge is primarily knowledge of **LinkedIn's public jobs surface and downstream jobs-data use cases**.

The developer needs to understand LinkedIn filters for employment type, seniority, workplace type and recency, the 1,000-result search limitation, optional data fields such as salary/benefits, and the distinction between summary and detail data.

On the buyer side, the product is positioned not only for recruitment but also for hiring-intent lead generation, salary benchmarking and market intelligence. That requires enough understanding to expose fields that support those workflows, but there is no evidence that deep HR/recruitment expertise is a barrier to entry.

This case therefore supports a lower domain-expertise threshold than the incumbent might imply: source/product knowledge is important, but the underlying domain is learnable through normal product development.

### Data / resource access

The access profile is unusually favourable.

The Actor uses **LinkedIn's public guest jobs endpoints**, requires no LinkedIn account, authentication cookie or user-supplied session, and advertises successful operation with datacenter proxies. No proprietary dataset, third-party enrichment API or separately hosted infrastructure is visible.

Apify supplies the cloud execution environment, datasets, API endpoints, schedules, MCP exposure, integrations, billing and marketplace distribution. The seller therefore mainly needs the Actor code plus reliable network/proxy access to LinkedIn.

The main resource risk is not ownership of scarce data; it is continued availability and stability of the guest jobs surface. LinkedIn can alter markup, filters or rate-limit behaviour outside the seller's control.

### Operating complexity

The commercial model is low-touch because customers self-serve through Apify. The product can be called by API, scheduled, exported and billed without seller intervention.

Technical maintenance remains recurring. The product documentation explicitly warns that LinkedIn occasionally changes HTML structure and that very high volumes may trigger temporary rate limits. The changelog shows meaningful fixes only months after launch, including timeout management and incorrect filter results.

Compared with Curious Coder, however, the entrant has deliberately constrained the problem: no logged-in flows, no browser sessions, no residential proxy requirement and a narrower product feature/history surface. That should reduce the number of moving parts that need support.

Operating complexity is therefore assessed as **Medium**, materially below the mature incumbent but not negligible.

### Cost intensity

The cost model is unusually observable because the provider publishes performance characteristics and Apify publishes the underlying platform rates.

#### Observed cost inputs

- Runtime memory: **256 MB**.
- Full details: **100 jobs in under 60 seconds**.
- Summary-only: **100 jobs in about 5 seconds**.
- Proxy: **datacenter proxy**, with no residential proxy requirement stated.
- Apify paid-tier compute rates: approximately **$0.20/CU Bronze, $0.16 Silver, $0.13 Gold**.
- Dataset writes: approximately **$0.005-$0.004 per 1K writes** by tier.
- External transfer: approximately **$0.20-$0.18/GB** by tier.
- Paid selling price: **$0.50/$0.39/$0.30 per 1K results**, with platform usage included.

At 256 MB, a ten-minute run consumes roughly 0.042 CU. If 1,000 full-detail jobs scale approximately from the published 100-jobs-under-60s benchmark, compute alone is therefore only roughly **$0.005-$0.008 per 1K jobs**, before transfer/storage/retries.

#### Cost assumptions

| Scenario | Estimated platform cost / 1K paid jobs | Rationale |
|---|---:|---|
| Efficient | $0.01 | Summary-heavy or highly efficient full-detail usage with minimal retries. |
| Base | $0.025 | Full details, dataset writes and moderate transfer/retry overhead. |
| Stressed | $0.05 | Higher transfer/retry/rate-limit overhead while remaining compatible with the provider's low-cost positioning. |

These are estimates rather than reported Actor cost data. Residential proxy expense is not included because the provider specifically states datacenter proxy operation.

#### Estimated cost range / scenarios

Applying the matching cost assumption to the revenue scenarios gives approximately:

- Low usage: **<$1/month** seller-borne platform cost.
- Base usage: **~$3/month**.
- High/stressed usage: **~$35-$45/month**.

#### Margin / economic impact and confidence

At the base case, creator gross remuneration is approximately **$40/month** before platform usage. Estimated platform cost of roughly **$3/month** would leave approximately **$35-$40/month** before developer labour/tax.

At high usage, estimated gross remuneration of about **$215/month** minus roughly **$40/month** platform usage would leave around **$175/month**.

**Cost confidence: Medium.** The memory, performance and architecture inputs are unusually strong, but exact data transfer, retry frequency and paid-user discount mix are private.

The key finding is that **cost is not the binding constraint in this case**. The lightweight architecture appears capable of strong unit margins; current active-user/result volume is the main constraint on revenue.

## 4. Case Findings

### Intrinsic characteristics

- Public LinkedIn jobs data can be packaged without logged-in accounts or proprietary data.
- Recurring jobs-data demand supports API/scheduled use cases.
- Source-side result caps, rate limits and HTML/filter changes create continuing maintenance exposure.
- Apify removes most generic SaaS infrastructure and transaction overhead.
- Low-cost HTTP implementations can materially undercut established incumbents.

### Case-specific characteristics

- 256 MB pure-HTTP/Cheerio architecture.
- Datacenter-proxy rather than residential-proxy positioning.
- Aggressive $0.30-$0.50/1K paid-tier pricing.
- Relatively narrow five-month operating history and small review base.
- Current strategy appears weighted toward price/simplicity rather than incumbent-grade enrichment or source workaround breadth.

### Wider opportunity-area relevance

This case materially changes the interpretation of the Curious Coder benchmark:

1. **A new entrant can gain meaningful usage quickly.** Triple-digit MAU within about five months is evidence of entrant attainability.
2. **Basic LinkedIn jobs capability is cheaper and simpler than the incumbent alone suggested.** Mature incumbent complexity should not be treated as the minimum entry requirement.
3. **Low pricing alone has not yet produced incumbent-scale traction.** The product remains around 1% of Curious Coder's MAU despite a substantial price discount.
4. **The economics are strongly volume-driven.** At sub-$0.50/1K, hundreds of active users are not enough for material income unless usage per customer is high.
5. **Source maintenance remains intrinsic.** Lean architecture reduces but does not eliminate LinkedIn change/rate-limit exposure.

### Key uncertainties

- Current monthly run count is not public.
- Results per run and paid/free usage split are private and dominate the revenue estimate.
- Historical Apify snapshots may use slightly different crawl dates/definitions; the user-growth comparison is directional.
- Exact platform usage per 1,000 jobs is private.
- The current small review base makes customer-satisfaction evidence weak.
- Five months is too short to establish long-term retention or maintenance burden.

## 5. Evidence and Sources

### Sources

1. Automation Lab LinkedIn Jobs Scraper — https://apify.com/automation-lab/linkedin-jobs-scraper
2. Actor pricing — https://apify.com/automation-lab/linkedin-jobs-scraper/pricing
3. Actor reviews — https://apify.com/automation-lab/linkedin-jobs-scraper/reviews
4. Actor issues — https://apify.com/automation-lab/linkedin-jobs-scraper/issues/open
5. Actor changelog — https://apify.com/automation-lab/linkedin-jobs-scraper/changelog
6. Actor API — https://apify.com/automation-lab/linkedin-jobs-scraper/api
7. Apify Actor pricing and platform costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
8. Apify Actor usage/resources — https://docs.apify.com/actors/running/usage-and-resources
9. Apify PPE monetisation — https://docs.apify.com/actors/publishing/monetize/pay-per-event
10. Curious Coder LinkedIn Jobs Scraper case study — [linkedin-jobs-scraper-curious-coder.md](linkedin-jobs-scraper-curious-coder.md)

### Material inferences and limitations

- **Revenue estimate (Low confidence):** based on current MAU, product defaults/performance and explicit run/result/paid-share assumptions because no public current run-volume data was found.
- **Cost estimate (Medium confidence):** anchored in published memory/runtime characteristics and Apify unit rates; data transfer and retry intensity remain inferred.
- **User-retention inference (Medium-Low confidence):** cumulative users rose substantially while MAU remained around the mid-130s across separate Apify crawls; exact snapshot timing and metric calculation are not controlled.
- **Entrant-positioning inference (High confidence):** price, architecture and feature documentation explicitly position the product as a cheaper lightweight alternative.