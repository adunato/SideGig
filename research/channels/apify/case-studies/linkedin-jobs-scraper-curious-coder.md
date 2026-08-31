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

A separate bottom-up estimate of platform costs is included under **Cost intensity** below. Using its base assumption of approximately **$0.22 platform cost per 1,000 paid results**, the base revenue case implies roughly **$4.8K/month of platform costs** and approximately **$12.6K/month of creator profit after platform costs**. Because the exact Actor resource usage is private, this remains an estimate rather than reported profitability.

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

The table below provides the high-level capability profile. The subsections that follow explain what each dimension means in practice for this case.

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium-High** | The underlying extraction task is conceptually straightforward, but a mature product must preserve useful search semantics, completeness, enrichment and reliability as LinkedIn changes. | High |
| Domain expertise | **Medium** | Requires strong source-specific understanding of LinkedIn jobs search and enough recruitment/data-product knowledge to expose useful fields and workflows; deep HR expertise is not evident as a prerequisite. | Medium-High |
| Data / resource access | **Medium** | No proprietary dataset is evident and the Actor works from public LinkedIn jobs surfaces. Apify supplies the managed execution, storage, API, scheduling and billing infrastructure, while reliable collection still depends on compute/network/proxy resources and continued source access. | High |
| Operating complexity | **High** | Apify removes much of the generic service-operation burden, but the LinkedIn dependency creates recurring maintenance, completeness and blocking issues that require active intervention. | High |
| Cost intensity | **Low-Medium** | No material fixed data/server cost is visible, but paid usage creates platform costs. A scenario estimate suggests roughly **$0.08-$0.45 per 1,000 paid results**, with a central assumption around **$0.22/1,000**, versus an $0.80 creator gross share before platform costs. | Low-Medium |

### Technical complexity

The core technical capability is to turn LinkedIn's public jobs search into a stable data product. At a high level this requires accepting a search request, retrieving the relevant job listings and details, normalising them into a consistent schema, and returning them through Apify's dataset/API interfaces. Public run logs identify the implementation as a Node.js/Crawlee Actor, but the particular runtime versions are not important to the capability assessment; Apify supports standard containerised Actor development and manages the execution environment.

The complexity lies less in the existence of the scraper than in the behaviour expected from a mature commercial product. The Actor must support both direct LinkedIn search URLs and structured search inputs, preserve useful location and filter semantics, paginate through results, avoid duplicates, retrieve additional job/company/poster details, and continue to return complete and usable datasets when LinkedIn changes what its public search surfaces return.

The public changelog provides direct evidence of this production complexity. Changes during 2026 addressed incomplete result sets, missing application URLs, pagination loops, irrelevant-result drift and LinkedIn serving reduced search pages. In August 2026 LinkedIn changed its jobs search to an AI-powered model with fewer explicit URL filters; the Actor subsequently added compatibility logic that converts some discontinued filters into natural-language search terms. The important capability is therefore **source-specific extraction and adaptation**, rather than an unusually sophisticated general software stack.

There is also a material difference between initial development and mature-product complexity. A functional LinkedIn jobs extractor does not appear to require unusual technology or proprietary algorithms. The higher complexity rating reflects the accumulated logic needed to make the product sufficiently complete, predictable and backward-compatible for thousands of recurring users.

### Domain expertise

The required domain knowledge is primarily **LinkedIn-jobs and recruitment-data knowledge**, rather than deep professional HR expertise.

At source level, the developer needs to understand how LinkedIn represents job searches, locations and geo IDs, which filters remain externally usable, how result limits and pagination behave, and which job/company/poster fields can be retrieved reliably. The August 2026 search change illustrates why this knowledge matters: older experience-level, job-type and workplace filters could no longer simply be passed through as before, so the product had to reinterpret them within the new search behaviour.

At product level, the developer also needs enough understanding of recruitment, lead-generation and labour-market workflows to know which fields and controls are commercially useful. The Actor exposes more than a title and URL: it includes company information, salary fields where available, applicant counts, seniority, employment type, industries, workplace type, application method and job-poster information. That schema reflects a view of how buyers actually use jobs data downstream.

Geography is part of this capability. LinkedIn searches depend on locations and geo IDs, and the Actor uses location-based splitting to work around the approximate 1,000-result ceiling of an individual search. This does not imply specialised local-market expertise, but it does require maintaining source-specific geographic/search knowledge rather than treating all searches as globally interchangeable.

Overall, the evidence supports **medium domain expertise**: the product does not appear to rely on scarce recruitment IP, but it does require accumulated understanding of LinkedIn's jobs domain and of the data requirements of recruiters, lead-generation users and automated job-data workflows.

### Data / resource access

The case is notable because the core commercial product does **not** appear to depend on proprietary data ownership. The Actor's documentation directs users to public/incognito LinkedIn jobs search and does not require the customer's LinkedIn login. No paid external dataset or proprietary data licence is visible in the product or documentation.

The essential external data dependency is therefore LinkedIn itself. That lowers the entry barrier compared with an opportunity requiring exclusive data, but it creates a different risk: the seller does not control the source. LinkedIn can change search behaviour, accessible fields, rate limits or blocking behaviour, and the changelog shows that such changes materially affect the product.

On infrastructure, Apify removes most of the need for separate server assets. Actors run as containerised cloud programs on Apify. The platform provides the execution environment and allocates CPU, memory and disk resources to each run; it also provides datasets/storage, API access, tasks and schedules, usage metering, billing and marketplace distribution. The seller therefore does **not** need to operate a separate production web server, API gateway, scheduler, customer billing system or general storage platform for this product.

The remaining operating resources are principally those needed to make the source collection reliable: Apify compute capacity, network/data transfer, storage/API operations and proxy capacity where required. Public issue logs show HTTP 403/429 responses and proxy/network failures, confirming that network/proxy access is a real operational resource rather than merely theoretical infrastructure.

The resulting resource profile is therefore relatively favourable in fixed-asset terms: **public source data + managed Apify infrastructure**, with the main dependency risk concentrated in continued reliable access to LinkedIn.

### Operating complexity

Commercial delivery is comparatively simple. Apify handles user accounts, execution, API access, datasets, schedules, billing and payouts. Customers can run the Actor without the developer manually delivering data or operating a separate SaaS application. This makes the transactional operating model substantially lighter than a conventional self-hosted scraping service.

The technical operating burden is very different. The LinkedIn source requires ongoing attention because failures are not limited to obvious page breakage. Public issues and changelog entries show problems with incomplete results, repeated pagination, altered search semantics, missing fields, 403/429 responses and source responses that technically succeed while returning materially fewer or less relevant jobs.

That means maintenance requires more than keeping the service online. The provider needs to detect when result quality or completeness changes, investigate customer runs and logs, distinguish transient network/proxy failures from source changes, release fixes, and preserve compatibility with existing customer inputs where practical. The August 2026 search transition is a good example: LinkedIn did not simply go offline; the meaning and availability of filters changed, requiring product-level adaptation.

This is where the distinction between **development and maintenance** is most important. Initial product development is a bounded software task on top of managed infrastructure. Maintenance is an open-ended dependency on a third-party source whose behaviour changes outside the seller's control. The evidence therefore supports a high operating-complexity assessment even though the commercial delivery model itself is low-touch.

### Cost intensity

The product has a relatively light fixed-cost structure but a meaningful variable cost model. The important point is not only what Apify charges, but what those charges imply for cost per billable result and therefore margin.

Under Apify's current pay-per-event model:

`creator profit = (80% × paid-user event revenue) - platform usage costs`

For this Actor, paid-plan users are charged **$1 per 1,000 results**, so the creator's gross share is **$0.80 per 1,000 paid results before platform costs**. Free-plan activity is excluded from both creator revenue and seller-borne platform cost calculations.

#### Observed platform cost inputs

Apify publishes the unit rates used when calculating PPE platform costs for paid users. Current standard paid-tier rates are approximately:

| Cost component | Bronze | Silver | Gold | Relevance to this Actor |
|---|---:|---:|---:|---|
| Compute | $0.20/CU | $0.16/CU | $0.13/CU | CPU/memory × run duration. |
| Residential proxy | $8/GB | $7.50/GB | $7/GB | Potentially material if residential traffic is used. |
| External data transfer | $0.20/GB | $0.19/GB | $0.18/GB | LinkedIn requests and returned data. |
| Dataset writes | $0.005/1K | $0.0045/1K | $0.004/1K | Approximately one output write per delivered job. |
| Request-queue reads | $0.004/1K | $0.0036/1K | $0.0032/1K | Request orchestration where used. |
| Request-queue writes | $0.01/1K | $0.009/1K | $0.008/1K | Search/detail request orchestration where used. |

Datacenter proxy capacity is priced differently: standard Apify plans include a pool of datacenter IPs, with additional IPs charged separately rather than by traffic volume. The Actor's public logs show proxy use and proxy failures, but do not reveal whether the production workload uses datacenter, residential or a mixture of proxy types. That is the largest cost-model uncertainty.

The fixed-cost side is much lighter. There is no evidence of a proprietary-data licence, external database subscription, separate server fleet or third-party paid API required to deliver the product. Apify itself supplies execution, storage, API exposure, scheduling, billing and marketplace delivery.

#### Cost estimate assumptions

The exact cost per result is private, so a scenario model is required.

Two external observations help constrain the assumptions:

1. Public logs for Curious Coder show an HTTP request pipeline with retries and proxy failures rather than a clearly browser-heavy workflow.
2. A newer comparable LinkedIn Jobs Actor from Automation Lab explicitly advertises a **256 MB, HTTP-only, datacenter-proxy** implementation while retailing at roughly **$0.30-$0.50 per 1,000 jobs with platform usage included**. Because an Apify creator receives only 80% of event revenue before platform costs, that comparable product strongly suggests that a lean LinkedIn-jobs implementation can operate with platform costs materially below roughly $0.24-$0.40 per 1,000 results.

Curious Coder's product is richer than that comparator: it retrieves broader job/company/poster detail, handles more compatibility logic and has evidence of retries and source instability. It is therefore reasonable to assume a higher unit cost than the leanest competitor.

The following bracket is used:

| Scenario | Estimated platform cost / 1K paid results | Assumption |
|---|---:|---|
| Efficient | **$0.08** | HTTP-first collection, predominantly datacenter proxy capacity, low retry rate, efficient batching; compute/transfer/storage dominate. |
| Base | **$0.22** | Rich detail retrieval plus ordinary retry/proxy overhead and source inefficiency. |
| Stressed | **$0.45** | Frequent retries, heavier network/proxy consumption or other adverse source conditions. |

These figures are not reported costs. They are an informed bracket around private resource consumption using Apify's published unit rates and a directly comparable Store product as a market constraint.

#### Implied margin per 1,000 paid results

| Scenario | Creator gross share | Estimated platform cost | Estimated creator profit / 1K results | Implied margin on creator gross |
|---|---:|---:|---:|---:|
| Efficient | $0.80 | $0.08 | **$0.72** | **90%** |
| Base | $0.80 | $0.22 | **$0.58** | **73%** |
| Stressed | $0.80 | $0.45 | **$0.35** | **44%** |

On the **base revenue case of 21.7M paid results/month**, those unit-cost assumptions imply:

| Cost scenario | Estimated monthly platform cost | Estimated monthly creator profit after platform costs |
|---|---:|---:|
| Efficient | **$1.7K** | **$15.7K** |
| Base | **$4.8K** | **$12.6K** |
| Stressed | **$9.8K** | **$7.6K** |

The best central estimate is therefore approximately **$4K-$6K/month of platform costs** against the base revenue scenario, leaving roughly **$11K-$14K/month of creator profit after platform costs**. This excludes the economic value of the developer's own maintenance/support time because that is treated under operating complexity rather than as an external cash cost.

**Cost-estimate confidence: Low-Medium.** Published platform unit prices are strong evidence, but the Actor's actual compute time, traffic volume and proxy mix are private. The estimate is most useful as an order-of-magnitude view of unit economics and margin sensitivity.

The overall **Low-Medium cost intensity** rating remains appropriate: there is little visible fixed investment, but variable platform costs are commercially meaningful and can consume a material share of gross creator remuneration when source conditions deteriorate.

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
7. Platform costs appear capable of supporting attractive gross margins at $1/1K results, but source inefficiency and proxy strategy can materially alter those margins.

These findings should be tested against additional representative cases before being extrapolated to the opportunity area as a whole.

### Key uncertainties

- Actual Actor revenue, creator payout and platform costs are private.
- Results per run and paid-plan share of result volume are inferred; they dominate the revenue-estimate uncertainty.
- Monthly active users do not identify paying customers or spend per customer.
- The current source repository is private, so detailed internal implementation choices remain partly unobservable.
- Exact proxy configuration, resource consumption and platform cost per result are private; these dominate the cost-estimate uncertainty.
- Developer time spent on support and maintenance is unknown.
- The observed maintenance burden is LinkedIn-specific and may overstate the burden for products built on stable job-board APIs, ATS endpoints or feeds.
- Some usage may benefit from Curious Coder's wider marketplace reputation and cannot be attributed solely to the product proposition.

## 5. Evidence and Sources

Directly observed product, seller and platform evidence is prioritised. Third-party sources are used as secondary evidence where they expose otherwise useful marketplace-level usage information, provide comparable market benchmarks or demonstrate downstream use cases.

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
10. Apify Actor usage and resources — https://docs.apify.com/actors/running/usage-and-resources
11. Apify Actor runs and builds — https://docs.apify.com/actors/running/runs-and-builds
12. Apify Actors overview — https://docs.apify.com/actors
13. Apify Store publishing terms — https://docs.apify.com/legal/store-publishing-terms-and-conditions
14. ActorConsole Curious Coder profile — https://actorconsole.com/builders/curious_coder?window=30
15. High-volume lead-generation pricing issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/rentalmonthly-pricin-GJbM7nnS9zIlcbvvf
16. March 2026 incomplete-results / system-log issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/seeing-errors-and-a-SYOwVmf2icOzPoMxc
17. Historical rate-limit/system-log issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/too-many-requests-er-bPibmu3Rlj3otW2Qy
18. Result-limit issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/result-count-limit-s-pQ3QdEPEMOvkUiuTV
19. Concurrent-runs issue — https://apify.com/curious_coder/linkedin-jobs-scraper/issues/do-you-not-allow-con-cTiiO63PP6fS3LCrm
20. SolidCode LinkedIn Jobs Scraper competitor — https://apify.com/solidcode/linkedin-jobs-scraper
21. Coregent LinkedIn Jobs Scraper competitor — https://apify.com/coregent/linkedin-jobs-scraper
22. Apify platform pricing — https://apify.com/pricing
23. Automation Lab LinkedIn Jobs Scraper cost/architecture benchmark — https://apify.com/automation-lab/linkedin-jobs-scraper

### Material inferences and limitations

- **Inference — revenue (Low-Medium confidence):** the scenario model combines observed 30-day run volume and exact pricing with explicit assumptions for results per run and paid-plan share. The central estimate is intended as an order-of-magnitude estimate, not a claimed seller disclosure.
- **Inference — paid-result share (Medium-Low confidence):** free users receive only $5 monthly credits and face a $2/1K result price on this Actor; combined with ~33 runs per active user and observed high-volume use, this makes a material paid-result share likely. The actual share is private.
- **Inference — competitive advantage (Medium-High confidence):** continued market-leading usage despite cheaper competitors suggests reputation, reliability, feature breadth and accumulated distribution matter. Their individual contribution cannot be separated.
- **Inference — cost per result (Low-Medium confidence):** Apify publishes the relevant platform unit rates, while the exact Curious Coder resource consumption is private. The scenario bracket uses those rates plus a directly comparable HTTP-only LinkedIn jobs Actor as an external constraint; actual proxy mix and retry behaviour could materially change the result.
