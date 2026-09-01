# Vali G Indeed Jobs Scraper

- **Product / provider:** `valig/indeed-jobs-scraper` / Vali G
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** Recruitment & jobs intelligence
- **URL:** https://apify.com/valig/indeed-jobs-scraper
- **Why selected:** Established non-LinkedIn jobs-data provider with substantial adoption, low pricing and a rich Indeed-specific output model. It complements the two LinkedIn cases by testing which economics, capabilities and maintenance burdens are specific to LinkedIn versus intrinsic to recruitment/jobs intelligence more broadly.
- **Assessment date:** 2026-09-01

## 1. Case Overview

Vali G's Indeed Jobs Scraper is an established Apify Actor that extracts Indeed job listings, employer data, salaries, benefits, skills and structured occupational metadata. It targets recruiters, staffing agencies, HR/market analysts, developers, job boards and researchers.

The Actor was published roughly **1.2 years ago**. Current Apify data shows approximately **27,000 total users**, **3,700 monthly active users**, **132 bookmarks**, a **4.7/5 rating from 18 reviews**, and a current issue-response time of roughly **0.65 hours**. Vali G's wider profile reports 7 public Actors, approximately 29K total users, 11K monthly users and >99% successful runs across the portfolio, indicating that this is an established operator rather than a single experimental listing.

A third-party index has separately recorded approximately **98,000 cumulative runs** for the Actor in an earlier snapshot. That figure is not current enough to use as a monthly run measure, but it provides independent evidence of substantial repeated execution.

This case is important because it removes LinkedIn as the source while retaining essentially the same buyer need: fresh structured jobs and employer intelligence delivered through Apify.

## 2. Commercial Opportunity

### Product / service

The Actor extracts Indeed listings by keywords/title, location, date posted and maximum results (up to 1,000). Its output is unusually rich and includes:

- core job metadata and timestamps;
- employer name, company page, description, industry, employee count, revenue, CEO and ratings;
- detailed geographic fields and coordinates;
- salary ranges, currency and pay period;
- required skills and education indicators;
- benefits;
- employment/job type;
- occupation classifications;
- full job description;
- repost/urgency/high-volume-hiring signals where available.

The service is available through standard Apify datasets and APIs, so it can feed analytics, dashboards, recruitment systems or job-board products without the provider operating a separate SaaS front end.

### Customer and buyer use case

The Actor explicitly targets:

- recruiters and staffing agencies;
- HR and labour-market analysts;
- developers and job-board operators;
- researchers/academics;
- analytics and salary/skills-demand workflows.

The underlying commercial need overlaps strongly with the LinkedIn cases: buyers pay to avoid building and maintaining a source-specific jobs-data pipeline and to receive structured records ready for downstream use.

The Indeed product is somewhat more obviously oriented toward **labour-market/job-board data** than the Automation Lab LinkedIn product, which also emphasises B2B hiring-intent lead generation.

### Value proposition

The value proposition combines **very low price with unusually rich output**.

For less than $0.10/1K paid-tier results, buyers can obtain structured job, employer, salary, skills, benefits and location data. The output example shows fields such as employer revenue/headcount/CEO, ratings, occupations, structured benefits and skill tags in addition to the job listing itself.

The proposition is therefore not merely “scrape Indeed search cards cheaply”. It packages Indeed's wider job/employer metadata into a ready-to-use data product.

Key buyer value includes:

- current job-market coverage;
- normalized structured output;
- employer enrichment without a separate enrichment service;
- salary and skills data for market analysis;
- geographic metadata;
- low per-result cost;
- API and automated cloud delivery.

### Demand and traction

Demand evidence is strong:

- approximately **27K total users**;
- approximately **3.7K monthly active users**;
- **18 reviews**, currently averaging **4.7/5**;
- **132 bookmarks**;
- third-party historical evidence of roughly **98K cumulative runs**;
- the Actor constitutes most of Vali G's approximately 29K total portfolio users.

This is materially smaller than the Curious Coder LinkedIn leader in monthly actives, but much larger than the recent Automation Lab entrant. It demonstrates that strong recurring jobs-data demand exists outside LinkedIn.

Competition within Indeed scraping is also visibly substantial: Apify lists established competitors ranging from Apify-maintained/mature products with tens of thousands of users to newer low-price entrants. This supports the interpretation that Indeed jobs scraping is itself a meaningful submarket rather than a single-provider anomaly.

### Pricing and monetisation

The Actor uses pay-per-event pricing with platform usage included.

Current prices are:

| Event | Free | Starter / Bronze | Scale / Silver | Business / Gold |
|---|---:|---:|---:|---:|
| Result | $0.10 / 1K | $0.09 / 1K | $0.08 / 1K | $0.07 / 1K |
| Actor start | $0.001 | $0.0009 | $0.0008 | $0.0007 |

This is exceptionally aggressive pricing. The creator's gross share on paid result events is only approximately **$0.056-$0.072 per 1,000 results** before platform costs.

Under Apify PPE rules, free-tier activity contributes neither creator remuneration nor creator-borne platform costs. For paid users, creator profit is calculated as `(80% × event revenue) - platform costs`.

### Revenue estimate

The main missing variables are current runs per active user, results per run and paid/free usage share. Unlike the Curious Coder case, no reliable current 30-day run count was found. A third-party source records roughly 98K cumulative runs in an earlier snapshot, which is useful as evidence of repeat use but not as a current monthly measure.

#### Observed inputs

- **3,700 monthly active users**.
- **27K total users**.
- Third-party historical snapshot: approximately **98K cumulative runs**.
- Maximum configured output: **1,000 results**.
- Paid result prices: **$0.09/$0.08/$0.07 per 1K**.
- Paid actor-start fee: less than **$0.001/run**.
- Rich output supports both one-off analytics and recurring operational pipelines.

#### Assumptions

| Scenario | Runs / active user / month | Results / run | Paid share of usage | Weighted paid result price |
|---|---:|---:|---:|---:|
| Low | 5 | 100 | 25% | $0.085 / 1K |
| Base | 12 | 250 | 45% | $0.080 / 1K |
| High | 25 | 500 | 60% | $0.075 / 1K |

The base case assumes a mixture of occasional analysts and recurring API/job-board users. It is intentionally below the roughly 33 runs/MAU observed for the mature Curious Coder LinkedIn product, while allowing larger per-run result volumes because Indeed/job-board workflows can naturally operate in bulk.

#### Estimated range / scenarios

| Scenario | Total results / month | Paid results / month | Customer event revenue | Creator 80% share before platform costs |
|---|---:|---:|---:|---:|
| Low | 1.85M | 0.46M | ~$43 | **~$35** |
| Base | 11.1M | 5.0M | ~$416 | **~$330** |
| High | 46.3M | 27.8M | ~$2.1K | **~$1.7K** |

The customer-event revenue figures include an allowance for paid Actor-start events, although these are economically minor relative to results.

#### Central estimate and confidence

The best central estimate is approximately **$250-$500/month creator gross remuneration before platform costs**, with a broad plausible range of roughly **$35-$1.7K/month**.

Annualised, the central estimate is approximately **$3K-$6K/year before platform costs**, placing the Actor around the project's target side-income scale despite its extremely low unit price.

**Revenue confidence: Low-Medium.** User scale, pricing and historical run evidence are strong, but current run frequency/results-per-run and paid share are private. The estimate is therefore an order-of-magnitude model rather than reported revenue.

The central implication is robust: with several thousand monthly users, even a price below $0.10/1K can plausibly produce meaningful side-income-scale remuneration if a material share of users run recurring/bulk workloads.

### Competition and differentiation

Indeed scraping is highly competitive on Apify. Visible alternatives include:

- Apify-maintained Misceres Indeed Scraper with roughly 30K total users and pricing around $3/1K;
- Borderline's established Indeed Actor with roughly 23K users and pricing around $5/1K;
- Kaix's newer low-cost comprehensive product with roughly 5.4K users and pricing as low as about $0.04/1K;
- Curious Coder's Indeed scraper;
- numerous newer specialist providers.

Vali G therefore competes in an unusually wide price band. Its differentiation appears to be the combination of:

- very low price;
- large established user base;
- rich employer/job/salary/skills output;
- simple search inputs;
- responsive maintenance/support;
- established provider reputation.

The case demonstrates that low-price products can accumulate large usage in a crowded marketplace, but it also suggests that jobs scraping does not behave as a pure commodity: providers coexist at prices differing by one to two orders of magnitude.

### Operating model

Commercial delivery is low-touch because Apify supplies the cloud runtime, datasets, API, billing and integrations.

The source-integration burden is real. Public issues include:

- an out-of-memory edge case that required the developer to double the Actor's memory allocation;
- reports of unexpectedly low results for UK searches;
- questions around residential proxy support.

The README itself states that the Actor handles dynamic content and proxies. These signals indicate that Indeed access is not uniformly trivial and can vary by geography/source behaviour.

The issue-response metric of roughly 0.65 hours indicates active support at the time of assessment. The wider Vali G profile reports >99% successful runs across its portfolio, suggesting operational maturity, although that figure is not Actor-specific.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium** | Rich job/employer/salary/skills extraction, pagination/dynamic content and geographic search require more than a simple listing parser, but no evidence of unusually specialised technology. | Medium-High |
| Domain expertise | **Medium** | Requires understanding Indeed search/geography and a richer labour-market data schema including compensation, skills, benefits, occupations and employer metadata. | High |
| Data / resource access | **Medium** | Source data is public, but proxy/dynamic-content issues and geography-specific result behaviour make reliable source access an operational resource. Apify supplies generic infrastructure. | Medium-High |
| Operating complexity | **Medium-High** | Low-touch commercial delivery is offset by source-result completeness, proxy, memory and geography-specific support issues. | Medium-High |
| Cost intensity | **Low, but margin-sensitive** | Extremely low selling price means platform costs must also be very low. No fixed data-licensing/server cost is visible, but even small per-result infrastructure costs materially affect margin. | Medium |

### Technical complexity

The technical capability is to convert Indeed search results and detail/employer data into a broad stable schema across locations and searches.

Compared with the Automation Lab LinkedIn entrant, this product exposes a richer data model. It includes nested employer information, salaries, benefits, skills/education attributes, occupation classes, geographic coordinates and full descriptions. This increases parser/normalisation work and creates more fields whose availability and semantics can change.

The product also states that it handles pagination, dynamic content and proxies. Public support evidence shows that memory usage has been high enough in an edge case to require the developer to double the Actor's memory allocation. That suggests a heavier runtime than the 256 MB LinkedIn entrant, although exact current memory and implementation technology are not public.

There is insufficient evidence to justify a detailed architecture reconstruction. The appropriate capability conclusion is **Medium technical complexity**: conventional web-data engineering on managed Apify infrastructure, but with meaningful source, normalization and scale/reliability work.

### Domain expertise

Domain requirements are somewhat broader than in the lightweight LinkedIn entrant because the product packages data for recruitment and labour-market analysis rather than only listing extraction.

A useful implementation needs to understand:

- Indeed search/filter semantics and country/location behaviour;
- job listing freshness and expiration/reposting fields;
- salary minimum/maximum, currency and work period;
- employer profile/rating/headcount/revenue fields;
- job benefits and employment types;
- skills/education attributes;
- occupation classifications;
- how recruiters, job boards and labour-market analysts consume these fields.

This is still not evidence of scarce specialist HR intellectual property. However, the breadth of the output means product quality depends materially on understanding what the data means and preserving consistent semantics.

The resulting domain-expertise requirement is **Medium**.

### Data / resource access

No proprietary data licence is visible. The commercial source is Indeed's publicly accessible jobs/employer surfaces, with Apify providing generic runtime, storage, APIs, billing and scheduling.

Unlike the Automation Lab LinkedIn case, reliable access appears more operationally variable. The product documentation references dynamic content and proxies, and public issues include questions about residential proxy support and reports of geographically incomplete results. Other current Indeed Actors also describe Indeed/Cloudflare IP-reputation blocking and recommend residential proxies, supporting the conclusion that proxy/source-access strategy can be material in this market.

The seller therefore avoids owning separate infrastructure or licensed datasets, but cannot treat source access as a guaranteed free commodity. Geographic routing, proxy quality and Indeed's anti-bot/source behaviour are meaningful dependencies.

### Operating complexity

Commercial delivery remains low-touch because Apify handles the marketplace transaction and execution service.

Technical operations are **Medium-High**. The public evidence shows several distinct failure classes rather than a single fixed scraper:

- memory pressure under some API runs;
- search/result completeness varying by geography;
- proxy configuration/support questions;
- continuing need to handle dynamic source content.

For a product with thousands of active users, these issues require responsive diagnosis because a run can complete technically while still returning insufficient/incorrect market coverage. That creates a quality-monitoring requirement in addition to simple uptime.

The current ~0.65-hour issue-response metric is consistent with an actively maintained product. This does not reveal total labour hours, but it indicates that support/maintenance is part of the operating model.

### Cost intensity

This case has a very different cost profile from the Curious Coder benchmark because the selling price itself is extremely low.

#### Observed cost inputs

- Paid result price: **$0.09/$0.08/$0.07 per 1K results**.
- Creator gross share before platform usage: approximately **$0.072/$0.064/$0.056 per 1K**.
- Platform usage is included, so paid-run costs are deducted from creator remuneration.
- Apify platform rates include compute at roughly **$0.20/$0.16/$0.13 per CU**, external transfer around **$0.20-$0.18/GB**, residential proxy at roughly **$8-$7/GB**, plus storage/API operations.
- Public issue evidence shows some nontrivial memory use and proxy/access considerations.
- A directly comparable newer Indeed Actor (Kaix) currently sells a rich Indeed product at approximately **$0.04-$0.06/1K**, demonstrating that extremely low-cost Indeed extraction is technically achievable on Apify, even though its exact costs are also private.

The key economic constraint is obvious: at a weighted paid selling price around $0.08/1K, creator gross is only about **$0.064/1K**. Platform usage materially above that would make the paid run uneconomic.

#### Cost assumptions

| Scenario | Estimated platform cost / 1K paid results | Rationale |
|---|---:|---|
| Efficient | $0.008 | Highly efficient source requests/normalisation and limited costly proxy traffic. |
| Base | $0.020 | Moderate compute/transfer/proxy/storage burden while preserving a viable margin at current prices. |
| Stressed | $0.045 | High retry/proxy/resource use; leaves only a narrow margin but remains below creator gross on most paid tiers. |

These assumptions are necessarily wider than the Automation Lab LinkedIn estimate because Vali G does not publish its runtime architecture/resource consumption.

#### Estimated cost range / scenarios

At the base revenue scenario of approximately **5.0M paid results/month**:

- Efficient: **~$40/month** platform cost.
- Base: **~$100/month**.
- Stressed: **~$225/month**.

Costs scale approximately with paid result volume, although run-size efficiency and proxy/retry behaviour can make the relationship nonlinear.

#### Margin / economic impact and confidence

Base-case creator gross remuneration is approximately **$330/month before platform costs**.

Applying the cost range above gives estimated contribution after platform usage of approximately:

- Efficient: **~$290/month**.
- Base: **~$230/month**.
- Stressed: **~$105/month**.

Annualised, the base cost/revenue model implies roughly **$2.5K-$3K/year after platform usage** before developer labour/tax, with materially higher or lower outcomes depending primarily on paid result volume and proxy/resource intensity.

**Cost confidence: Low-Medium.** Platform rates and the selling-price ceiling are observable, but exact memory, run duration, proxy mix and data-transfer consumption are private.

The important insight is that Vali G's product is **low fixed-cost but margin-sensitive**. Its commercial viability depends on maintaining extremely efficient per-result execution; the low price leaves much less room for source inefficiency than Curious Coder's $1/1K model.

## 4. Case Findings

### Intrinsic characteristics

- Structured jobs data has meaningful demand outside LinkedIn.
- Buyers value employer/salary/skills enrichment in addition to job listings.
- Public source data can support commercial products without proprietary licences.
- Source access, geography, pagination/completeness and anti-bot/proxy behaviour create continuing operational work.
- Apify removes most generic infrastructure and commercial transaction burden.

### Case-specific characteristics

- Exceptionally low $0.07-$0.09/1K paid pricing.
- Very rich Indeed-specific employer and labour-market schema.
- Large user base relative to the seller's overall portfolio.
- Current implementation/resource architecture is not publicly documented in detail.
- Responsive issue-handling model.

### Wider opportunity-area relevance

This case materially broadens the recruitment/jobs opportunity assessment:

1. **The opportunity is not LinkedIn-dependent.** Indeed alone supports thousands of monthly active users for a community-developed Actor.
2. **Multiple viable positioning models exist.** Curious Coder monetises a mature LinkedIn product at about $1/1K; Vali G operates at below $0.10/1K with larger volume economics.
3. **Side-income-scale revenue can emerge from very low unit prices if active usage reaches several thousand users.**
4. **Rich domain data can be a differentiator.** Employer metadata, skills, benefits and salary structures broaden the product beyond raw listings.
5. **Source choice materially changes operating and cost structure.** Indeed presents its own geography/proxy/completeness issues rather than simply repeating LinkedIn's search/filter change pattern.
6. **Low-price competition creates a strong efficiency requirement.** At $0.07-$0.09/1K, platform cost control becomes central to capability rather than a secondary margin issue.

### Key uncertainties

- Current 30-day run count is unavailable.
- The third-party ~98K run figure is historical/cumulative and should not be interpreted as current monthly activity.
- Results per run and paid/free mix are private.
- Exact Actor architecture, memory after the recent increase, proxy mix and platform consumption are private.
- Revenue estimate is highly sensitive to recurring/bulk use assumptions.
- Some of Vali G's traction may benefit from seller reputation and its broader jobs/data portfolio.

## 5. Evidence and Sources

### Sources

1. Vali G Indeed Jobs Scraper — https://apify.com/valig/indeed-jobs-scraper
2. Actor pricing — https://apify.com/valig/indeed-jobs-scraper/pricing
3. Actor reviews — https://apify.com/valig/indeed-jobs-scraper/reviews
4. Actor issues — https://apify.com/valig/indeed-jobs-scraper/issues
5. Actor API — https://apify.com/valig/indeed-jobs-scraper/api
6. Vali G profile — https://apify.com/valig
7. OOM issue — https://apify.com/valig/indeed-jobs-scraper/issues/crashing-multiple-ti-SzZk5VE6tAubXYtcY
8. UK result-completeness issue — https://apify.com/valig/indeed-jobs-scraper/issues/very-few-results-ret-NdtVbpZZCjDB3ennt
9. Residential proxy question — https://apify.com/valig/indeed-jobs-scraper/issues/question-about-resid-i0ExpGguF82DKWdnm
10. Third-party historical Actor index — https://digitalbiztalk.com/tools/apify-actors/valig/indeed-jobs-scraper
11. Apify Actor pricing/platform costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
12. Apify Actor usage/resources — https://docs.apify.com/actors/running/usage-and-resources
13. Apify PPE monetisation — https://docs.apify.com/actors/publishing/monetize/pay-per-event
14. Kaix Indeed Jobs Scraper comparator — https://apify.com/kaix/indeed-scraper
15. Misceres Indeed Scraper comparator — https://apify.com/misceres/indeed-scraper
16. Borderline Indeed Scraper comparator — https://apify.com/borderline/indeed-scraper
17. Indeed source-access comparator — https://apify.com/gopalakrishnan/indeed-jobs

### Material inferences and limitations

- **Revenue estimate (Low-Medium confidence):** combines current MAU/pricing and historical run evidence with explicit run-frequency, results/run and paid-share assumptions.
- **Cost estimate (Low-Medium confidence):** constrained by the known selling price, official Apify unit costs and low-price Indeed competitors; Vali G's actual resource use remains private.
- **Source-access assessment (Medium confidence):** Vali G explicitly references proxies/dynamic content and has relevant support issues; current Indeed competitors independently report IP/proxy blocking, but their architectures are not necessarily identical.
- **Commercial-scale inference (High confidence):** thousands of MAU, tens of thousands of total users and independent cumulative-run evidence establish material real usage even though exact revenue is private.