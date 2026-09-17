# Apify POC Opportunity Selection

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisite validation:** [Apify Prerequisites Validation Test](prerequisites-validation.md)
- **Research methodology:** [Research Methodology](../../research/methodology.md)
- **Phase 2 start date:** 2026-09-17

## 1. POC Opportunity Area Selection

*Methodology mapping: Phase 2, Step 3 — Select the POC Opportunity Area.*

Select one researched opportunity area that can support a simple, inexpensive POC while still generating meaningful evidence on market attractiveness and capability requirements.

### Research Inputs

**Channel research:** [Apify Store overview](../../research/channels/apify/overview.md), including the Step 8 opportunity-area assessment, Step 8A community findings, Research Gateway 2 decisions and Step 12 market refinements.

**Capability research:** [Apify Store capability assessment](../../research/channels/apify/capability.md), including the Step 12 opportunity-area capability syntheses.

**Case-study / deep-dive evidence:** Recruitment/jobs — [Curious Coder LinkedIn Jobs Scraper](../../research/channels/apify/case-studies/linkedin-jobs-scraper-curious-coder.md), [Automation Lab LinkedIn Jobs Scraper](../../research/channels/apify/case-studies/linkedin-jobs-scraper-automation-lab.md), [Vali G Indeed Jobs Scraper](../../research/channels/apify/case-studies/indeed-jobs-scraper-valig.md); Lead generation — [Compass Google Maps Scraper](../../research/channels/apify/case-studies/google-maps-scraper-compass.md), [LurkAPI Google Maps Business Leads Scraper](../../research/channels/apify/case-studies/google-maps-business-leads-scraper-lurkapi.md), [Dev Fusion Mass LinkedIn Profile Scraper with Email](../../research/channels/apify/case-studies/linkedin-profile-scraper-dev-fusion.md); News/media — [EasyApi Google News Scraper](../../research/channels/apify/case-studies/google-news-scraper-easyapi.md), [Crawler Bros Google News Scraper](../../research/channels/apify/case-studies/google-news-scraper-crawlerbros.md), [Automation Lab RSS Feed Reader](../../research/channels/apify/case-studies/rss-feed-reader-automation-lab.md).

### Eligible Opportunity Areas — Market Attractiveness

Reuse the existing research scores. Higher = more attractive.

| Opportunity area | Paying demand | Opportunity density | New-entrant attainability | Revenue potential | Competitive pressure | Overall market result / confidence | POC market implication |
|---|---:|---:|---:|---:|---:|---|---|
| Recruitment & jobs intelligence | 5 | 4 | 4 | 4 | 3 | Opportunity Score 4.0 / High | Strongest balance of high demand and entrant attainability; large active usage in established job Actors makes measurable POC traffic plausible. |
| Lead generation & business intelligence | 5 | 3 | 4 | 5 | 2 | Opportunity Score 3.8 / High | Very strong demand and revenue, but more crowded and differentiation usually requires enrichment/verification rather than a simple raw-data POC. |
| News & media intelligence | 3 | 4 | 4 | 3 | 4 | Opportunity Score 3.6 / Medium-High | Easier market entry and less pressure, but materially weaker paying-demand and revenue signals increase the risk of too little POC feedback. |

### Eligible Opportunity Areas — Capability Requirements

Reuse the existing research scores. Higher = more demanding.

| Opportunity area | Technical complexity | Domain expertise | Data / resource access | Operating complexity | Cost intensity | Capability score / confidence | POC capability implication |
|---|---:|---:|---:|---:|---:|---|---|
| Recruitment & jobs intelligence | 3 | 3 | 2 | 4 | 2 | 2.8 / High overall | A focused source/product can remain inexpensive and technically bounded; the main representative risk is source reliability and ongoing maintenance. |
| Lead generation & business intelligence | 4 | 3 | 3 | 4 | 2 | 3.2 / High overall | A credible differentiated POC quickly becomes a multi-stage enrichment/verification pipeline, making it the heaviest of the three areas. |
| News & media intelligence | 2 | 2 | 1 | 2 | 1 | 1.6 / High overall | Clearly the lightest implementation profile, but that advantage is offset by weaker evidence that a small POC would produce meaningful commercial feedback. |

### Selected Opportunity Area

**Selected opportunity area:** Recruitment & jobs intelligence

**Step 3 rationale:** Recruitment/jobs offers the strongest POC balance without creating a new score: market attractiveness is the highest of the three researched areas (4.0), while capability requirements remain moderate (2.8). Lead generation offers similar market strength but a higher capability burden (3.2), while news/media is much easier (1.6) but has materially weaker paying-demand and revenue scores. Recruitment/jobs therefore gives a small POC a better chance of producing observable market feedback while remaining practical to build and operate.

### Step 3 Completion

**Step 3 complete:** Yes

**Step 3 blockers:** None

## 2. Specific POC Opportunity Research

*Methodology mapping: Phase 2, Step 4 — Research Specific POC Opportunities.*

Research the selected opportunity area below the area level and establish a credible landscape of concrete commercial propositions before selection.

**Specific research date:** 2026-09-17

The specific-opportunity scan combined the existing Apify case studies with a fresh review of current Store products, recent entrants, pricing/usage signals, and buyer/community evidence. The candidate set intentionally covers both high-demand source scrapers and more differentiated workflow/intelligence propositions rather than starting from a preselected product idea.

### Candidate Landscape

| Candidate opportunity | Buyer problem / use case | Target buyer | Commercial outcome / value | Demand / usage evidence | Alternatives / competition | Differentiation / unresolved need | Data / source / delivery model | Capability / cost implications | Evidence links |
|---|---|---|---|---|---|---|---|---|---|
| LinkedIn jobs search API | Need structured LinkedIn job search/results without manual browsing or an official jobs API. | Recruiters, job boards, market researchers, job seekers, data/AI workflows. | High-volume, filterable job records with company, salary, description and application metadata. | Bebity incumbent: ~36K total users, ~354 MAU, 73 ratings; recent Logiover entrant: ~50 total users and ~15 MAU within weeks. | Many mature and new LinkedIn Jobs Actors; strong incumbent recognition. | New entrants can still acquire users, but basic extraction is highly commoditised; reliability, richer fields, speed and price are the main levers. | Public LinkedIn jobs/guest surfaces; HTTP extraction, pagination, filters, optional proxy; Apify dataset/API delivery. | Moderate build; material rate-limit/source-change burden; proxy spend can rise on larger runs. | [Bebity](https://apify.com/bebity/linkedin-jobs-scraper), [Logiover](https://apify.com/logiover/linkedin-jobs-scraper), [existing case study](../../research/channels/apify/case-studies/linkedin-jobs-scraper-curious-coder.md) |
| Indeed jobs search API | Need broad job, salary and employer data from Indeed without manual search or a stable official API. | Recruiters, job boards, labour-market analysts, HR/compensation teams, data products. | High-volume structured job search with salary/company metadata across countries. | Vali G incumbent: ~30K total users and ~3.9K MAU; Automation Lab entrant: ~225 users / ~33 MAU; FactDen: ~54 users / ~22 MAU. | Several strong Indeed Actors; severe price competition, with incumbent pricing around cents per 1K results and newer richer products at higher prices. | Recent entrants demonstrate attainability; differentiation is in completeness, filters, company enrichment, reliability and country coverage. | Indeed public/search or mobile/API-like surfaces; HTTP extraction; structured dataset/API. | Moderate build; source protection, retries/proxies and very low incumbent pricing create operating and margin pressure. | [Vali G](https://apify.com/valig/indeed-jobs-scraper), [Automation Lab](https://apify.com/automation-lab/indeed-scraper), [FactDen](https://apify.com/factden/indeed-jobs-scraper), [existing case study](../../research/channels/apify/case-studies/indeed-jobs-scraper-valig.md) |
| Multi-ATS canonical career-page jobs API | Buyers need current jobs directly from company career systems without integrating Greenhouse, Lever, Ashby, Workday and other ATSs individually. | Job aggregators, recruiters, talent-intelligence teams, sales/research workflows. | Canonical employer-source jobs in one normalized schema, with direct apply URLs and less dependence on aggregators. | FalconScrape career-page Actor: ~429 total users / ~37 MAU after ~7 months; multiple new ATS entrants are appearing, including PulseData at ~2 MAU within its first month. | Several recent multi-ATS Actors now compete on ATS coverage, auto-detection and enrichment. | Stronger source provenance and lower blocking than broad job boards; remaining gaps are ATS breadth, career-page discovery, normalization, completeness and source-change handling. | Public ATS/job-board endpoints (e.g. Greenhouse, Lever, Ashby, Workday); company URL/board input; normalized job output through Apify. | Moderate connector work but low source-access cost; many ATS endpoints are public HTTP and can avoid browser/residential proxies. Operating burden grows with connector count. | [FalconScrape](https://apify.com/piotrv1001/company-career-page-scraper), [PulseData](https://apify.com/pulsedata/career-page-jobs-scraper), [Greenhouse/Lever/Ashby example](https://apify.com/webdata_labs/greenhouse-lever-ashby-jobs-scraper) |
| ATS job-change monitor | Buyers need to know what changed since the last run rather than repeatedly receiving a full current-state job list. | Recruiters, competitor-intelligence teams, investors, sales/GTM teams, job alert workflows. | New/changed/removed job events and optional webhook alerts from target-company ATS boards. | Current dedicated ATS Job Change Monitor shows 0 MAU; adjacent career-site monitor products exist, but direct Store adoption evidence is weak. | Some monitoring Actors and generic Apify schedules/webhooks can reproduce parts of the workflow. | Stateful change detection, confirmed removals and event delivery are more workflow-ready than raw scraping, but the market may be too narrow for strong POC traffic. | Public ATS endpoints + persisted prior state + scheduled runs + event/webhook delivery. | Low data cost; moderate state/change logic; ongoing connector maintenance remains representative. | [ATS Job Change Monitor](https://apify.com/marcuslee/ats-career-page-monitor), [Career Site Hiring Signal Monitor](https://apify.com/signaltools/career-site-hiring-signal-monitor) |
| Hiring-signal feed from job postings | Sales/recruiting users want hiring activity converted into intent signals instead of raw job rows. | SDR/BDR teams, agencies, recruiters, investors and competitive-intelligence users. | Scored hiring triggers such as new sales hiring, hiring velocity or role clusters, delivered to CRM/Slack/webhooks. | Direct Apify signal products currently have very low Store adoption (GTM Trigger Feed around 0–3 users/MAU depending snapshot), but community discussions explicitly cite job postings and role volume as useful prospecting/recruiting signals. | GTM-intent platforms and generic jobs data can substitute; Apify has at least one multi-signal GTM Actor. | Higher buyer-level value than a scraper, but specific willingness-to-pay on Apify is not yet evidenced strongly enough. | ATS/jobs data + rule-based classification/scoring + stateful monitoring + alerts/integrations. | Moderate domain/product logic and state; source costs can remain low if based on public ATS feeds. | [GTM Trigger Feed](https://apify.com/scrapersdelight/gtm-trigger-feed), [competitor-hiring example](https://apify.com/scrapersdelight/gtm-trigger-feed/examples/monitor-competitor-hiring), [recruiter signal discussion](https://www.reddit.com/r/recruiting/comments/1t6m3jl/) |
| Multi-board remote-jobs aggregator | Users need one normalized, deduplicated feed rather than querying several public remote-job boards separately. | Job seekers, niche job boards, recruiters, automation/data workflows. | Cheap multi-source remote-jobs feed with deduplication, salary/tags and direct application links. | Get Anything entrant: ~38 users / ~13 MAU after ~2 months; several additional recent aggregators have 1–2 MAU, showing repeated entrant activity but also crowding. | Numerous recent low-priced aggregators covering similar public feeds. | Easy sources make the POC inexpensive; differentiation depends on dedupe, freshness/ghost-job scoring, salary/skills or source breadth. | Public JSON/RSS feeds (Remotive, RemoteOK, Arbeitnow, Himalayas, Jobicy, WWR, etc.); normalization/deduplication; API/dataset. | Low technical/access/cost burden; low proxy needs; modest maintenance. | [Get Anything](https://apify.com/get_anything/remote-jobs-aggregator), [WFH Scout](https://apify.com/wfh_scout/remote-jobs-aggregator), [ScrapeSage](https://apify.com/scrapesage/remote-jobs-scraper) |
| Job-market intelligence: salary, skills and hiring trends | Buyers need decisions/benchmarks from job data rather than raw listings. | Recruiters, talent leaders, compensation analysts, labour-market researchers, career products. | Salary benchmarks, skill-demand rankings, hiring trends and market summaries generated from current jobs. | Current dedicated intelligence Actors show sparse direct adoption: Ryan Clinton Job Market Intelligence around 1–7 total users depending snapshot; salary-transparency and enrichment Actors around 0–1 MAU. Apify itself publishes a talent-market-intelligence workflow, confirming the use case but not Store demand. | LinkedIn Talent Insights / Lightcast-like products off-platform plus several new Apify intelligence/enrichment Actors. | Potentially higher value per run, but direct Store demand is not yet demonstrated; data quality and interpretation become central. | Public job feeds/ATSs + normalization + salary/skills extraction + aggregation/trend logic; report/API output. | Still relatively cheap with public feeds, but more domain/analytics logic and historical-state quality requirements than a raw feed. | [Job Market Intelligence](https://apify.com/ryanclinton/job-market-intelligence), [Salary Transparency Scraper](https://apify.com/coregent/job-salary-transparency-scraper), [Apify talent-market-intelligence guide](https://blog.apify.com/talent-market-intelligence/) |

### Step 4 Completion

**Step 4 complete:** Yes

**Step 4 blockers:** None

## 3. POC Opportunity Assessment and Shortlist

*Methodology mapping: Phase 2, Step 5 — Assess and Shortlist POC Opportunities.*

Assess each Step 4 candidate using the same market-attractiveness and capability dimensions used by the Research Methodology, but at the specific-opportunity level.

### Market Attractiveness Assessment

Higher score = more attractive.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| LinkedIn jobs search API | Paying demand | 5 | High | Established Actor has ~36K users / ~354 MAU and many ratings. |
| LinkedIn jobs search API | Opportunity density | 3 | Medium | Many use cases exist, but most converge on the same underlying search/extraction product. |
| LinkedIn jobs search API | New-entrant attainability | 4 | High | A recent entrant reached ~15 MAU and ~50 users within weeks. |
| LinkedIn jobs search API | Revenue potential | 4 | Medium | High usage volume and $1–$2/1K market pricing support revenue, but commodity pressure limits pricing power. |
| LinkedIn jobs search API | Competitive pressure | 2 | High | Strong incumbent plus many alternatives make differentiation difficult. |
| Indeed jobs search API | Paying demand | 5 | High | Vali G has ~3.9K MAU / ~30K users; several newer Actors also show active usage. |
| Indeed jobs search API | Opportunity density | 3 | Medium | Recruiter, job-board, labour-market and salary use cases are broad but product forms are similar. |
| Indeed jobs search API | New-entrant attainability | 4 | High | Automation Lab (~33 MAU) and FactDen (~22 MAU) demonstrate recent entrant traction. |
| Indeed jobs search API | Revenue potential | 4 | Medium | Very high volume supports revenue, but incumbent prices are extremely low and compress unit economics. |
| Indeed jobs search API | Competitive pressure | 2 | High | Multiple credible products compete on price, coverage and filters. |
| Multi-ATS canonical career-page jobs API | Paying demand | 4 | High | FalconScrape has ~37 MAU / ~429 users and supports paid per-result pricing. |
| Multi-ATS canonical career-page jobs API | Opportunity density | 4 | High | Job boards, recruiting, talent intelligence, competitive intelligence and hiring-signal workflows all consume canonical ATS data. |
| Multi-ATS canonical career-page jobs API | New-entrant attainability | 4 | High | A sub-year entrant has meaningful usage and multiple very recent entrants are appearing. |
| Multi-ATS canonical career-page jobs API | Revenue potential | 4 | Medium | Per-result pricing around $1–$2.25/1K plus recurring company-watch use cases provide credible scale. |
| Multi-ATS canonical career-page jobs API | Competitive pressure | 3 | High | Competition is increasing quickly, but no single entrenched incumbent dominates across all ATSs. |
| ATS job-change monitor | Paying demand | 2 | Medium | Dedicated current Actor shows 0 MAU; demand is mostly inferred from adjacent monitoring use cases. |
| ATS job-change monitor | Opportunity density | 3 | Medium | Relevant to recruiting, competitive intelligence, sales signals and alerts, but narrower than raw jobs APIs. |
| ATS job-change monitor | New-entrant attainability | 3 | Low | Low competition helps, but current entrants have not demonstrated adoption. |
| ATS job-change monitor | Revenue potential | 3 | Low | Recurring monitoring could support value-based pricing, but direct revenue evidence is absent. |
| ATS job-change monitor | Competitive pressure | 4 | Medium | Few direct dedicated competitors on Apify; generic scheduling remains a substitute. |
| Hiring-signal feed from job postings | Paying demand | 2 | Medium | Direct Apify GTM signal products show little current adoption despite adjacent lead-gen demand. |
| Hiring-signal feed from job postings | Opportunity density | 3 | Medium | Many possible signals/verticals exist, but proposition requires buyer-specific packaging. |
| Hiring-signal feed from job postings | New-entrant attainability | 3 | Low | Sparse competition but no strong entrant traction evidence. |
| Hiring-signal feed from job postings | Revenue potential | 4 | Medium | Intent signals can be higher-value than raw data if they influence prospecting/recruiting decisions. |
| Hiring-signal feed from job postings | Competitive pressure | 4 | Medium | Few direct Apify competitors, though external intent-data tools are substitutes. |
| Multi-board remote-jobs aggregator | Paying demand | 3 | Medium | One recent entrant reached ~13 MAU; several others have low but non-zero adoption. |
| Multi-board remote-jobs aggregator | Opportunity density | 4 | Medium | Job seeker, niche-board, recruiter and automation use cases are broad. |
| Multi-board remote-jobs aggregator | New-entrant attainability | 4 | High | Multiple recent entrants have acquired users quickly using public feeds. |
| Multi-board remote-jobs aggregator | Revenue potential | 3 | Medium | Large potential volume but low per-result pricing and public-source substitutes limit upside. |
| Multi-board remote-jobs aggregator | Competitive pressure | 2 | High | Numerous near-identical low-price aggregators are entering the Store. |
| Job-market intelligence: salary, skills and hiring trends | Paying demand | 2 | Medium | Dedicated Store products currently have very low adoption despite a credible off-platform category. |
| Job-market intelligence: salary, skills and hiring trends | Opportunity density | 3 | Medium | Salary, skills, hiring trends and career decisions provide several product angles. |
| Job-market intelligence: salary, skills and hiring trends | New-entrant attainability | 3 | Low | Few direct competitors, but current entrants have not demonstrated strong traction. |
| Job-market intelligence: salary, skills and hiring trends | Revenue potential | 4 | Medium | Higher-value analytics can support higher per-run pricing if buyer value is proven. |
| Job-market intelligence: salary, skills and hiring trends | Competitive pressure | 4 | Medium | Limited direct Apify competition, though sophisticated external products exist. |

### Capability Assessment

Higher score = more demanding.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| LinkedIn jobs search API | Technical complexity | 3 | High | Public jobs surfaces allow HTTP extraction, but pagination, filters, details and throttling must be handled reliably. |
| LinkedIn jobs search API | Domain expertise | 2 | High | Requires LinkedIn/jobs search semantics rather than deep recruitment expertise. |
| LinkedIn jobs search API | Data / resource access | 3 | High | Public data is available, but hard rate limits and larger runs may need Apify/residential proxies. |
| LinkedIn jobs search API | Operating complexity | 4 | High | Source changes, throttling, result caps and anti-bot behaviour create recurring maintenance. |
| LinkedIn jobs search API | Cost intensity | 3 | Medium | Proxy/retry costs can become material at scale, especially under price competition. |
| Indeed jobs search API | Technical complexity | 3 | High | Pure-HTTP/API-like approaches exist, but country/search semantics and full-detail enrichment add work. |
| Indeed jobs search API | Domain expertise | 2 | High | Requires Indeed/job-search semantics, salary/company fields and geography handling. |
| Indeed jobs search API | Data / resource access | 3 | High | Public/source endpoints exist but anti-bot protections and access methods can change. |
| Indeed jobs search API | Operating complexity | 4 | High | Blocking, source changes, retries and completeness are material recurring risks. |
| Indeed jobs search API | Cost intensity | 3 | Medium | Very low market prices make proxy/retry cost and efficiency important to margin. |
| Multi-ATS canonical career-page jobs API | Technical complexity | 3 | High | Several connector schemas and normalization are required, but many ATSs expose simple public endpoints. |
| Multi-ATS canonical career-page jobs API | Domain expertise | 2 | High | Requires ATS/job-field knowledge but little specialist HR expertise. |
| Multi-ATS canonical career-page jobs API | Data / resource access | 1 | High | Major ATS public job-board endpoints generally require no login, licensed data or residential proxy. |
| Multi-ATS canonical career-page jobs API | Operating complexity | 3 | High | Connector/source changes require maintenance, but each source is usually more stable than broad job-board scraping. |
| Multi-ATS canonical career-page jobs API | Cost intensity | 1 | High | Plain HTTP/public endpoints support low compute/network cost and no intrinsic enrichment spend. |
| ATS job-change monitor | Technical complexity | 3 | High | Adds persistent state, diff logic, confirmed removals and webhook/event handling to ordinary ATS extraction. |
| ATS job-change monitor | Domain expertise | 2 | High | Change semantics and hiring workflows are understandable without specialist HR credentials. |
| ATS job-change monitor | Data / resource access | 1 | High | Uses the same public ATS endpoints as canonical career-page extraction. |
| ATS job-change monitor | Operating complexity | 3 | High | Scheduled stateful runs and connector changes require monitoring but remain bounded. |
| ATS job-change monitor | Cost intensity | 1 | High | Public HTTP sources and small incremental outputs keep direct cost low. |
| Hiring-signal feed from job postings | Technical complexity | 3 | Medium | Requires extraction plus classification/scoring, state and alert delivery. |
| Hiring-signal feed from job postings | Domain expertise | 3 | Medium | Useful signals require understanding recruiting/GTM meaning rather than merely extracting jobs. |
| Hiring-signal feed from job postings | Data / resource access | 2 | High | Public ATS data is cheap, but company/firmographic enrichment may be needed for stronger signals. |
| Hiring-signal feed from job postings | Operating complexity | 3 | Medium | Signal quality, false positives and stateful monitoring require ongoing tuning. |
| Hiring-signal feed from job postings | Cost intensity | 2 | Medium | Base data is cheap; optional enrichment/AI can add variable cost. |
| Multi-board remote-jobs aggregator | Technical complexity | 2 | High | Public JSON/RSS feeds require straightforward fetch, normalization and deduplication. |
| Multi-board remote-jobs aggregator | Domain expertise | 2 | High | Basic jobs/feed semantics, source attribution and dedupe rules are sufficient. |
| Multi-board remote-jobs aggregator | Data / resource access | 1 | High | Sources expose public keyless JSON/RSS endpoints. |
| Multi-board remote-jobs aggregator | Operating complexity | 2 | High | Multiple feeds can change, but source failure can be isolated and anti-bot burden is low. |
| Multi-board remote-jobs aggregator | Cost intensity | 1 | High | No browser, proxy or licensed data is intrinsically required. |
| Job-market intelligence: salary, skills and hiring trends | Technical complexity | 3 | Medium | Collection is accessible, but normalization, salary/skill extraction and aggregate analysis add logic. |
| Job-market intelligence: salary, skills and hiring trends | Domain expertise | 3 | Medium | Meaningful benchmarks/trends require stronger labour-market and compensation interpretation. |
| Job-market intelligence: salary, skills and hiring trends | Data / resource access | 1 | High | Existing examples use free public job feeds/ATS data. |
| Job-market intelligence: salary, skills and hiring trends | Operating complexity | 3 | Medium | Historical comparisons, data-quality drift and changing source mix need ongoing quality control. |
| Job-market intelligence: salary, skills and hiring trends | Cost intensity | 2 | Medium | Public feeds keep source cost low; analysis/AI enrichment can add variable compute/API cost. |

### Shortlist

Use only:

- **Shortlisted** — remains a credible POC candidate;
- **Excluded** — not suitable for this POC cycle based on the evidence.

| Candidate opportunity | Market evidence potential | POC capability suitability | Decision | Rationale |
|---|---|---|---|---|
| LinkedIn jobs search API | Very high: large incumbent usage plus a recent entrant reaching ~15 MAU within weeks. | Medium: feasible HTTP POC, but throttling/proxy and source-change burden are representative and non-trivial. | Shortlisted | Strongest direct market feedback potential; retained despite higher operating/cost risk so the final decision can explicitly compare demand against complexity. |
| Indeed jobs search API | Very high: ~3.9K MAU incumbent plus newer products at ~22–33 MAU. | Medium: pure-HTTP implementations are proven, but access reliability and low-price economics create material operating risk. | Shortlisted | Exceptional demand and demonstrated entrant adoption justify carrying it forward even though source/cost complexity is higher than ATS/public-feed options. |
| Multi-ATS canonical career-page jobs API | High: one sub-year entrant has ~37 MAU / ~429 users and multiple new competitors are entering. | High: public ATS endpoints allow a representative multi-connector POC with low access and cash cost. | Shortlisted | Best observed balance of specific demand, entrant attainability, source quality and manageable capability burden. |
| ATS job-change monitor | Low-Medium: buyer problem is credible but current dedicated Actor shows 0 MAU. | High: public sources and bounded state/change logic make a cheap POC possible. | Excluded | The capability fit is attractive, but direct market evidence is currently too weak to expect a meaningful POC traffic sample. |
| Hiring-signal feed from job postings | Low-Medium: community evidence supports the concept, but direct Apify signal products show negligible adoption. | Medium-High: technically bounded but requires product/domain judgment and signal-quality tuning. | Excluded | Higher-value concept, but the current Store evidence is not strong enough to make a first POC likely to generate interpretable market feedback. |
| Multi-board remote-jobs aggregator | Medium: recent entrant at ~13 MAU shows observable demand, although most alternatives remain small. | Very high: public feeds, no login/proxy, simple normalization and low direct cost. | Shortlisted | The simplest credible market experiment in the set; retained as the low-complexity benchmark despite weaker revenue/competition characteristics. |
| Job-market intelligence: salary, skills and hiring trends | Low-Medium: use case is credible, but current dedicated Actors show sparse Store usage. | Medium-High: public inputs are cheap but analytics/domain requirements make it more than a trivial POC. | Excluded | Revenue upside may be higher, but current Apify demand evidence is insufficient for a first POC whose market assumptions need a meaningful sample. |

### Step 5 Completion

**Step 5 complete:** Yes

**Step 5 blockers:** None

## 4. POC Opportunity Selection

*Methodology mapping: Phase 2, Step 6 — Select the POC Opportunity.*

Select one concrete proposition from the Step 5 shortlist using the completed market-attractiveness and capability assessments. Do not introduce a new scoring model.

### Shortlist Comparison

Use only:

- **Selected** — chosen for Phase 3 POC definition and design;
- **Deferred** — remains viable but is not the selected POC opportunity.

| Candidate opportunity | Market-attractiveness summary | Capability-requirements summary | Expected POC evidence | POC complexity / cost | Decision |
|---|---|---|---|---|---|
| <Shortlisted candidate> | <Summary from Step 5> | <Summary from Step 5> | <What market and capability evidence this POC can generate> | <Why the POC can or cannot remain small and inexpensive> | <Selected / Deferred> |

### Selected Opportunity

**Selected opportunity:** <Exactly one shortlisted concrete proposition>

**Buyer problem:** <Problem/use case established during Step 4 research>

**Target user:** <Target buyer/user established during Step 4 research>

**Core value proposition:** <Commercial outcome/value established by the research>

**Market assumptions to test:** <Specific market-attractiveness assumptions the POC should be capable of testing>

**Capability assumptions to test:** <Specific capability assumptions the POC should be capable of testing>

**Selection rationale:** <Why this proposition provides the best balance of meaningful market evidence and manageable, representative capability requirements>

**Selection date:** <YYYY-MM-DD>

### Step 6 Completion

**Step 6 complete:** No

**Step 6 blockers:** Awaiting review of the Step 5 shortlist before final opportunity selection.

## 5. Gateway 2 — POC Opportunity Selected

**Decision:** <Pass / Fail>

**Rationale:** <Why the Phase 2 evidence does or does not justify carrying the selected opportunity into POC definition and design>

A Pass requires Steps 3–6 to be complete, exactly one Step 6 candidate to be Selected, and no unresolved blocker preventing Phase 3.