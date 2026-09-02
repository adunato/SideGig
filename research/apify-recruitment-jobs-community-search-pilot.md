# Apify Recruitment & Jobs Intelligence Community Search Pilot

- **Status:** Temporary pilot
- **Scope:** Apify — Recruitment & jobs intelligence opportunity area
- **Date:** 2026-09-02

## Purpose

Test the same community-research questions used in the Apify-wide pilot at the narrower opportunity-area level, and assess whether the structure remains useful and repeatable before changing the formal methodology.

## Pilot Questions

The questions are intentionally kept parallel with the channel-wide pilot.

1. **How do people recommend getting started in this opportunity area?**
2. **How do people identify promising opportunities within this area?**
3. **What seems to help a new product gain traction?**
4. **What problems or risks do creators and users repeatedly encounter?**
5. **What does the community evidence suggest about earnings and economics?**

## Community Sources Used

| Source | Use in pilot | Notes |
|---|---|---|
| `r/apify` | Builder strategies, explicit user requests, source/coverage gaps, pricing discussion | Strongest Apify-specific conversational source. |
| Adjacent Reddit communities (`r/webscraping`, `r/n8n`, recruitment/job-data discussions) | Technical approaches, user workflows, scale requirements and cost sensitivity | Used where directly relevant to jobs-data products; not automatically treated as Apify-specific evidence. |
| Apify & Crawlee Discord via `discord.apify.com` / Answer Overflow | Technical/source problems | Publicly indexed subset; jobs-specific coverage was much thinner than Reddit in this pilot. |
| Apify Actor Ideas — Jobs | Explicit community-submitted source/product ideas | Useful for gap discovery but some ideas are old or have little voting evidence, so they are hypotheses rather than demand proof. |
| Public Actor issues for jobs products | Customer problems, feature requests, cost questions and operational failures | Product-community evidence rather than general discussion; particularly useful for concrete pain points. |
| Apify Store/product pages | Triangulation only | Used to check whether community-identified approaches/gaps correspond to real products and observable adoption. |

## Findings

### 1. How do people recommend getting started in this opportunity area?

The strongest pattern is to begin with a **specific jobs-data source or workflow problem**, rather than building a generic jobs aggregator from scratch.

Community examples repeatedly use public or semi-structured source surfaces that already expose job data: LinkedIn's public job endpoints, employer ATS systems such as Greenhouse, Lever, Ashby and Workday, Google Jobs, or a particular regional/niche job board. Builders then package this into a stable API with filtering, normalization and export rather than inventing a new end-user job-search product.

A particularly clear user request on `r/apify` asked for jobs from the Jobs tab of an exact LinkedIn company URL because global LinkedIn job search by company name was ambiguous. Multiple later users reported the same requirement. Other builders describe going directly to ATS APIs so the returned listing is the employer's canonical posting rather than a mirrored job-board result.

**Pilot finding:** the practical starting unit appears to be **one identifiable source/access problem + a useful structured output**, with broader aggregation added only where there is evidence that buyers need it.

### 2. How do people identify promising opportunities within this area?

Community evidence surfaced three recurring forms of opportunity discovery.

**Source and coverage gaps.** Builders explicitly ask users which ATS or job boards they still cannot access. One Apify creator offering a multi-ATS suite called out Teamtailor, Recruit CRM and Pinpoint as remaining coverage questions. Apify Ideas still contains open jobs-source ideas such as Seek.com and FlexJobs, although their age and low voting mean they should be treated as leads rather than validated opportunities.

**Concrete workflow gaps.** The LinkedIn company-URL request is a good example: the broad market already contains many LinkedIn jobs scrapers, but the customer needed exact company identity and monitoring rather than another global keyword search. Other user discussions emphasize freshness, direct application links, deduplication and exact-country/source coverage.

**Aggregation and normalization gaps.** A recent recruitment-community request seeking an alternative to Apify for 100K–1M+ jobs/month listed a desired product as many job sources feeding one normalized layer, with local/niche boards, ATS/company career pages, freshness, deduplication, enrichment and incremental delivery. Separately, Apify builders are actively producing multi-ATS products around this same problem.

**Pilot finding:** community research is useful for moving below the generic label "job scraper" and identifying the actual dimensions on which opportunities differ: **source coverage, source precision, freshness, normalization, enrichment, deduplication and delivery model**.

### 3. What seems to help a new product gain traction?

Direct community evidence on *why* individual jobs Actors gained traction is weaker than the evidence available in the channel-wide pilot. Community launch posts commonly emphasize the following differentiators:

- direct/canonical source access rather than mirrored results;
- no login/cookies where possible;
- HTTP/API-first extraction with lower proxy/compute cost;
- precise geography and source selection;
- deduplication and predictable completeness;
- richer job/company/recruiter fields;
- multi-source or multi-ATS normalization;
- usage-based pricing rather than paying a fixed rental while idle.

For example, a Google Jobs creator explicitly positioned pay-per-event pricing against flat monthly rental, while an ATS builder positioned direct company APIs as the canonical complement to Google Jobs. An Indeed creator promoted country-matched reliability, salary normalization and deduplication as fixes for failure modes in existing products.

These are credible hypotheses about useful differentiation, but community posts are often promotional and do not prove that a particular feature caused adoption.

**Pilot finding:** community research is good at identifying **claimed differentiation and buyer-valued attributes**, but Store usage/case-study evidence remains necessary to establish whether those attributes actually produce traction.

### 4. What problems or risks do creators and users repeatedly encounter?

This was the strongest part of the opportunity-area community search.

Recurring problems include:

- **Source instability and blocking.** LinkedIn and Indeed can change behavior, rate-limit access or require different proxy strategies. A public Indeed issue shows the same query producing materially different run costs because Cloudflare challenges were triggered on some runs.
- **Completeness and pagination.** Users care about whether the scraper returns the full relevant set rather than simply completing successfully.
- **Freshness.** Large-scale job-data users want frequent/incremental updates rather than periodic bulk snapshots.
- **Duplicates.** Cross-source aggregation creates duplicate listings; even individual ATS/company sources can contain near-duplicates across locations.
- **Filtering accuracy.** Public issues include non-remote jobs leaking into remote-only results and requests to exclude recruitment agencies or irrelevant industries.
- **Coverage fragmentation.** Buyers may need LinkedIn, Indeed, Google Jobs, dozens of ATS platforms, regional boards and niche sites. No single source covers the whole requirement.
- **Cost unpredictability.** Browser/proxy challenges and retries can make actual collection cost diverge from simple result-count assumptions.
- **Maintenance scaling.** Direct ATS APIs can be comparatively stable, but covering many ATSs/job boards creates a portfolio of connectors that must remain compatible.

**Pilot finding:** community evidence adds particularly strong information about **data quality and operating reality**. In this area, a product can technically return jobs while still failing commercially because results are stale, incomplete, duplicated, misclassified or unexpectedly expensive.

### 5. What does the community evidence suggest about earnings and economics?

Unlike the Apify-wide pilot, there is little reliable community disclosure of **seller earnings specifically from jobs Actors**. The opportunity-area community is much more informative about buyer economics and cost sensitivity.

Examples include:

- a high-volume LinkedIn jobs user asking for monthly/rental pricing because per-result charging was becoming expensive;
- a Google Jobs builder explicitly choosing pay-per-event because customers otherwise pay monthly rental even when idle;
- an n8n user reporting that a nominally free LinkedIn-jobs workflow consumed the Apify free-tier credit very quickly and cost more than $1 for a run in their configuration;
- an Indeed customer reporting the same query costing more than twice as much on different runs, with the developer attributing the variance to Cloudflare challenges;
- builders repeatedly asking what users consider a fair price per thousand ATS/job results.

The community therefore confirms that **unit economics are visible and important to buyers**. Buyers compare price per result, fixed rental versus usage pricing, predictable run cost and whether failed/duplicate/filtered records are billed.

Seller-side revenue is better estimated from Store usage/pricing and representative case studies than from community anecdotes at this scope.

**Pilot finding:** at opportunity-area level, Question 5 remains useful, but its strongest output is **commercial economics and price sensitivity**, not necessarily creator earnings.

## Overall Assessment of the Community Lens

The same five-question structure worked at opportunity-area level without needing a new question set.

### Strongest contributions

- identifies **specific unmet workflows** inside an already established market;
- exposes **source/coverage gaps** that broad category analysis hides;
- reveals what users and builders consider meaningful differentiation;
- provides unusually strong evidence on **quality, maintenance and cost failure modes**;
- exposes buyer language around freshness, canonical data, deduplication, enrichment and predictable pricing.

### Weaknesses

- seller earnings evidence becomes much thinner at this narrower scope;
- builder launch posts often contain self-promotion and should not be treated as success evidence;
- community demand requests can be isolated edge cases;
- Apify Ideas can contain old, unvoted ideas that have not been commercially validated;
- indexed Discord material was relatively sparse for this opportunity area.

## Key Insights from the Pilot

1. **The same five questions are reusable at both channel and opportunity-area level.** The scope of the search changes; the backbone does not need to.
2. **Community research becomes more concrete as scope narrows.** At jobs level it surfaced exact source gaps, filtering problems, pricing concerns and workflows rather than broad marketplace advice.
3. **The most interesting opportunity signal is not "jobs scraping" itself but unresolved combinations of source, coverage, quality and delivery.** Examples include exact-company monitoring, multi-ATS normalization, regional/niche coverage and dependable incremental feeds.
4. **Direct ATS/company-career data repeatedly appears as a practical alternative/complement to LinkedIn/Indeed.** It offers canonical listings and often simpler access, although broad ATS coverage creates connector-maintenance work.
5. **Community evidence is strongest for practical economics, not seller revenue, at opportunity-area level.** Case studies and Store data should remain the primary tools for estimating seller revenue.
6. **Community claims about differentiation need marketplace validation.** A builder saying that lower cost, richer fields or a new source matters is a useful hypothesis; observable adoption determines whether it actually matters commercially.

## Sources

### Apify / community-derived

- https://www.reddit.com/r/apify/comments/1obkgp1/need_apify_actor_to_scrape_jobs_from_a_company/
- https://www.reddit.com/r/apify/comments/1uebgt5/ats_scraping_coverage_is_now_exhaustive_ashby/
- https://www.reddit.com/r/apify/comments/1u7cj67/i_shipped_47_web_scrapers_in_the_last_month_open/
- https://www.reddit.com/r/apify/comments/1v5l79n/google_jobs_has_no_official_api_so_i_built_a/
- https://www.reddit.com/r/apify/comments/1vurffu/i_built_a_scraper_for_lennys_jobs/
- https://apify.com/ideas/categories/jobs
- https://apify.com/ideas/seek.com-job-scraper
- https://apify.com/ideas/flexjobs-scraper
- https://apify.com/curious_coder/linkedin-jobs-scraper/issues/rentalmonthly-pricin-GJbM7nnS9zIlcbvvf
- https://apify.com/curious_coder/indeed-scraper/issues/how-are-costs-calcul-tR8eCwcrWnLh4IoRw
- https://apify.com/fantastic-jobs/career-site-job-listing-api/issues/excluding-recruitmen-N3veQkAbl7ygMdQKy
- https://apify.com/fantastic-jobs/career-site-job-listing-api/issues/inclusion-of-nonremo-TbDiaHqla9PMcpn7d

### Adjacent community evidence

- https://www.reddit.com/r/webscraping/comments/1rwekn7/found_linkedin_job_scraper_no_login_no_proxies/
- https://www.reddit.com/r/n8n/comments/1t4lk7a/i_built_a_100_free_linkedin_job_scraper_using_n8n/
- https://www.reddit.com/r/Recruitment/comments/1w3j9x5/looking_for_an_alternative_to_apify_for/
- https://www.reddit.com/r/WebScrapingInsider/comments/1v72n6d/how_do_you_efficiently_support_scraping_many/
- https://www.reddit.com/r/webscraping/comments/1uk9qrw/monthly_selfpromotion_july_2026/
- https://www.reddit.com/r/webscraping/comments/1vcbi8t/monthly_selfpromotion_august_2026/

### Supporting marketplace evidence

- https://apify.com/fantastic-jobs/career-site-job-listing-api
- https://apify.com/fantastic-jobs/career-site-job-listing-feed
- https://apify.com/valig/indeed-jobs-scraper
- https://apify.com/curious_coder/linkedin-jobs-scraper

## Methodology / Template Lessons to Review

This remains a pilot; no canonical methodology or template changes are made here.

- The **same five community questions** appear suitable as a reusable backbone at both channel and opportunity-area scope.
- The research should allow the answer to a question to be weak or unavailable rather than forcing an artificial conclusion.
- Community evidence should be synthesized into findings; the final channel document should not reproduce the full search diary.
- Opportunity-area community findings appear to belong naturally alongside the existing opportunity-area market analysis in the channel `overview.md`, not in the capability or case-study documents.
- A compact final representation should capture only the material community insights, evidence/confidence and any implication for the existing assessment; detailed question-by-question research can remain a working artifact or research notes.
