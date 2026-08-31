# Apify Structured Opportunity Analysis Pilot

## Status

Structured pilot complete through opportunity identification and preliminary opportunity assessment.

This document repeats the Apify analysis using the staged process defined in [channel-opportunity-methodology-pilot.md](channel-opportunity-methodology-pilot.md). It deliberately replaces the source-driven approach of the earlier [Apify Market and Opportunity Analysis Pilot](apify-market-opportunity-pilot.md).

The canonical [methodology.md](methodology.md) has **not** been changed.

## Purpose

Test whether a disciplined general-to-specific process can:

1. map the opportunity landscape inside a channel;
2. assess every material opportunity type consistently;
3. select deep dives from the completed comparison rather than from interesting individual sources;
4. generate specific opportunities only after the selected types have been analysed;
5. preserve uncertainty and avoid over-weighting anecdotes.

---

# Stage A — Map Opportunity Types

## A1. Taxonomy basis

Apify exposes a native category system in the Store/API. Current categories include:

- Agents
- AI
- Automation
- Developer tools
- E-commerce
- Integrations
- Jobs
- Lead generation
- MCP servers
- News
- Open source
- Real estate
- SEO tools
- Social media
- Travel
- Videos
- Other

Actors can belong to multiple categories, so these are tags rather than a mutually exclusive market taxonomy. For this pilot, the native taxonomy is retained as the primary coverage mechanism, but commercially overlapping tags are normalised into opportunity types where their buyer/use-case dynamics are substantially similar.

## A2. Normalised opportunity map

| Opportunity type | Native categories represented | What is sold / buyer use case | Coverage notes |
|---|---|---|---|
| Social/video platform data | Social media, Videos | Structured posts, profiles, comments, engagement, ads and media from social/video platforms | Videos is merged because most commercial dynamics overlap with social-platform extraction. |
| Lead generation / business intelligence | Lead generation | Company/contact/business datasets, prospect discovery, enrichment and advertising intelligence | Often overlaps social, jobs, maps and ecommerce products. |
| E-commerce / product intelligence | E-commerce | Product, price, seller, review and catalogue data for pricing, research and monitoring | Includes store/product extraction and ecommerce lead datasets. |
| Search / SEO intelligence | SEO tools | SERPs, rankings, audits, keyword/search data and website SEO diagnostics | Search data also appears in lead-generation and developer products. |
| Jobs / recruitment data | Jobs | Job listings, salaries, employer information and recruitment-market data | Often overlaps lead generation and automation. |
| Real-estate data | Real estate | Property listings, prices, agents, rentals and housing-market data | Mostly source-specific data extraction. |
| Travel / hospitality data | Travel | Accommodation, booking, flight, location, review and price data | Often source-specific and highly operational. |
| News / media monitoring | News | News articles, headlines, publishers, monitoring and media datasets | Can overlap AI/RAG products. |
| AI-assisted extraction | AI | AI-based web extraction, content transformation and LLM/RAG data preparation | Distinguished from agents because the primary output is extracted/processed data rather than autonomous task completion. |
| Autonomous / agentic workflows | Agents | Goal-oriented tools that combine LLM reasoning with web data or actions | Emerging product form with different adoption dynamics from conventional scrapers. |
| Developer tooling | Developer tools | Generic crawlers, scraping primitives, dataset utilities and developer-facing infrastructure | Includes some long-established free/pay-usage Apify-maintained tools. |
| Workflow / browser automation | Automation | RPA, browser tasks and multi-step workflow execution | Overlaps other types when automation is merely implementation rather than buyer proposition. |
| Data integrations | Integrations | Transfer/import/export between Apify and external data systems | Often utility products rather than independent buyer markets. |
| MCP / agent-tool interfaces | MCP servers | Actors exposed as MCP-accessible tools for AI-agent consumption | Emerging distribution/use model; kept separate because demand is still developing. |
| Open-source hosted utilities | Open source | Hosted/open-source software packaged as runnable Actors | Cross-cutting product form; usually free/pay-usage rather than direct creator markup. |
| Other / residual | Other | Products not captured elsewhere | Retained to preserve coverage; not assumed to form one coherent market. |

### Stage A conclusion

The opportunity landscape is now mapped before any selection occurs. No seller story or product example is used to choose a deep dive at this stage.

---

# Stage B — Opportunity-Type Screen

## B1. Evidence available across the channel

Apify is unusually observable. The public Store API exposes, where available:

- total users;
- active users in the last 7/30/90 days;
- lifetime and recent runs;
- reviews/ratings;
- bookmarks;
- categories;
- pricing model;
- run-success statistics.

Apify states that the Store contains roughly 65,000+ Actors and that creators collectively receive about $1.5 million per month. This establishes channel-level demand but is **not** used to infer that every opportunity type is attractive.

The type screen uses category definitions, representative Store products, recent entrants, pricing and operating requirements. Where a complete category population was not extracted, scores are directional and confidence is reduced accordingly.

## B2. Full screen

Higher scores always mean a more attractive condition for this project.

| Opportunity type | Demand | Density | Entrant attainability | Revenue | Competition | Capability fit | Production leverage | Operating burden | Trend | Overall confidence |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| Social/video platform data | **5** H | 2 M | 3 M | **5** H | 1 H | 3 M | **5** H | 1 H | Stable/Growing | High |
| Lead generation / business intelligence | **5** H | 2 M | 3 M | **5** H | 2 M | 4 M | **5** H | 2 H | Growing | High |
| E-commerce / product intelligence | 4 M | 3 M | 3 M | 4 M | 3 M | 3 M | **5** H | 2 H | Stable/Growing | Medium |
| Search / SEO intelligence | **5** H | 2 M | 3 M | **5** H | 2 M | 3 M | **5** H | 2 H | Stable | Medium |
| Jobs / recruitment data | 4 H | 3 M | **4** H | 4 H | 3 M | 3 M | **5** H | 3 M | Growing | High |
| Real-estate data | 2 M | 3 L | 2 M | 3 L | 3 M | 2 M | **5** H | 2 H | Unclear | Medium-Low |
| Travel / hospitality data | 3 M | 3 L | 3 L | 4 M | 3 M | 2 M | **5** H | 2 H | Stable | Medium-Low |
| News / media monitoring | 3 M | 3 L | 3 L | 3 L | 3 M | 3 M | **5** H | 3 M | Growing | Medium-Low |
| AI-assisted extraction | 3 H | 3 M | 2 H | 4 M | 3 M | **5** H | **5** H | 4 M | Growing | High |
| Autonomous / agentic workflows | 2 M | 3 L | 2 M | 3 L | 4 M | **5** H | **5** H | 3 M | Growing | Medium |
| Developer tooling | 4 H | 3 M | 2 M | 3 M | 3 M | **5** H | **5** H | 4 M | Stable/Growing | Medium-High |
| Workflow / browser automation | 3 M | 3 L | 3 L | 3 L | 3 M | **5** H | **5** H | 3 M | Growing | Medium-Low |
| Data integrations | 2 H | 2 L | 2 L | 2 L | 4 M | 4 H | **5** H | 4 M | Stable | Medium |
| MCP / agent-tool interfaces | 2 M | 3 L | 2 L | 3 L | 4 M | **5** H | **5** H | 4 M | Growing rapidly | Medium-Low |
| Open-source hosted utilities | 1 H | 3 L | 3 M | 2 M | 4 M | **5** H | **5** H | 4 M | Growing | Medium |
| Other / residual | 2 L | 2 L | 2 L | 2 L | 2 L | 3 M | 4 M | 3 L | Unclear | Low |

`H/M/L` beside each score is per-metric confidence.

## B3. Evidence notes by type

### Social/video platform data

Very high demand is directly visible in products such as Instagram Scraper (~377k total users), TikTok Scraper (~245k) and YouTube Scraper (~107k). However, this is also the most incumbent-heavy part of the Store, with many mature official/community products and frequent source changes. High demand therefore coexists with low density, very high competition and high maintenance.

### Lead generation / business intelligence

Demand is strong across Maps, LinkedIn/profile data and advertising intelligence. Recent community entrants can reach meaningful scale: VortexData's Google Maps product, published about four months before assessment, shows ~2.1k total users and ~625 monthly active users; Curious Coder's Facebook Ads product shows ~39k total users and ~5.5k monthly active users. The counterweight is extensive clone/price competition and continuous reliability work.

### E-commerce / product intelligence

The Store contains established Amazon, Walmart and general ecommerce tools, and Apify's own ecommerce tool has ~14k users. Buyers have clear use cases around pricing, catalogue monitoring and competitive intelligence. Supply is substantial but more fragmented by retailer/source than social-media markets.

### Search / SEO intelligence

Google Search Results Scraper alone has ~172k users, strongly validating demand for search data. Generic SERP extraction is mature and competitive; opportunity is more likely in narrower search surfaces, analysis or workflows than another generic SERP clone.

### Jobs / recruitment data

This type combines strong incumbent demand with unusually visible entrant traction. Examples include Curious Coder LinkedIn Jobs (~143k total / ~15k monthly), Vali GM LinkedIn Jobs (~21k / ~5.3k monthly), Vali GM Indeed (~27k / ~3.6k monthly), and multiple products launched within the last 1–5 months already reaching tens or hundreds of monthly users. Pricing competition is strong, but evidence that entrants can acquire demand is materially better than in several other types.

### Real-estate data

The type is clearly represented, but sampled Zillow products generally show low-to-moderate usage. Several recent products have only single-digit monthly users; a stronger recent example reached ~18 monthly users. Demand may exist in specific sources/geographies, but broad attractiveness is not demonstrated by the current sample.

### Travel / hospitality data

Established Booking-type products demonstrate demand, but source-specific maintenance and anti-bot complexity are significant. Evidence for recent entrants is weaker than in jobs or lead generation.

### News / media monitoring

The type is structurally plausible and supported by dedicated Store categories/products, but seller-level commercial evidence is less visible. It remains a medium/low-confidence area until a fuller category population is analysed.

### AI-assisted extraction

The strongest current product is Apify's AI Web Scraper (~8.8k total users, ~259 monthly). Community alternatives sampled are much smaller: one older alternative shows ~1k total / ~36 monthly, while a product published four months ago shows about 100 total / 10 monthly and is currently under maintenance. This demonstrates real demand but weak recent-entrant attainability relative to conventional web-data categories.

### Autonomous / agentic workflows

Apify is strategically promoting agents and reports a substantial platform audience, but product-level adoption is still modest. AI Web Agent has around 1.9k total users but only single-digit monthly usage in recent snapshots; several business-analysis agents show zero-to-single-digit monthly users. Growth potential is real, current commercial evidence is not yet strong.

### Developer tooling

Generic tools such as Apify Web Scraper have very large installed usage (~122k total / ~2.8k monthly), validating utility demand. However, many developer tools are free/pay-usage and dominated by Apify-maintained primitives, limiting the attractiveness of the type for independent paid products unless differentiated substantially.

### Workflow / browser automation

Technically broad and well aligned with software skills, but market demand is heterogeneous and many products are implementation mechanisms rather than independently purchased outcomes. The broad category needs narrower subtyping before a high-confidence commercial conclusion.

### Data integrations

Representative products such as Pinecone Integration show hundreds of total users but only tens of monthly users and are generally utility/infrastructure products. Strong capability fit is not matched by strong independent creator monetisation evidence.

### MCP / agent-tool interfaces

Apify is investing aggressively in MCP and states that thousands of Actors are accessible through its MCP layer. The individual MCP-server market is nevertheless new; buyer/payment evidence for independently differentiated MCP-only products is still weak. This is a growth watchlist rather than a validated high-demand type.

### Open-source hosted utilities

The Store actively promotes open-source packaging, but the products are often free or monetised indirectly through platform usage/reward schemes. That makes the category interesting as a production model but weak under the project's requirement for direct buyer-supported revenue.

### Other / residual

This is intentionally not treated as a coherent opportunity market. Specific items can be reclassified if later evidence supports a distinct type.

---

# Stage B Selection Gate

The full opportunity-type screen was completed before selecting any deep dive.

Three types were selected to test Stage C because they represent materially different conditions:

1. **Jobs / recruitment data** — strong demand plus unusually strong recent-entrant evidence.
2. **Lead generation / business intelligence** — very high demand and revenue potential, but severe competitive pressure.
3. **AI-assisted extraction** — exceptionally strong capability fit and technical leverage, but weaker observed entrant adoption.

This selection is therefore not simply the top three narrative themes. It deliberately tests a balanced promising market, a large-but-crowded market, and a high-fit-but-demand-uncertain market.

---

# Stage C1 — Jobs / Recruitment Data Deep Dive

## Sample discipline

The sample deliberately contains established leaders, mid-tier products and recent entrants across LinkedIn, Indeed and Google Jobs.

| Product | Approx. age at assessment | Total users | Monthly active users | Indicative price | Sample role |
|---|---:|---:|---:|---|---|
| Curious Coder LinkedIn Jobs | ~2 years | 143k | 15k | ~$1 / 1k results | Established leader |
| Vali GM LinkedIn Jobs | ~1.3 years | 21k | 5.3k | ~$0.28 / 1k | Established/price leader |
| Vali GM Indeed Jobs | ~1.2 years | 27k | 3.6k | ~$0.07 / 1k | Established/price leader |
| Crawlworks LinkedIn Jobs | ~1.3 years | 2.6k | 447 | ~$1 / 1k | Mid-tier |
| Orgupdate Google Jobs | ~1.5 years | 2.6k | 216 | pricing varies by listing/version | Mid-tier |
| Automation Lab LinkedIn Jobs | ~5 months | 629 | 129 | ~$0.30 / 1k | Recent entrant with traction |
| SolidCode LinkedIn Jobs | ~3 months | 50 | 13 | ~$0.95 / 1k | Recent entrant |
| memo23 Google Jobs | ~1 month | 30 | 24 | ~$2.50 / 1k | Very recent entrant |
| JobsAPI LinkedIn Jobs | ~2 months | 7 | 2 | ~$2.99 / 1k | Weak/new entrant |

## Demand structure

Demand is clearly real and large for major job-board data. Multiple independent products have thousands of active users, not only one incumbent. Buyer use cases repeatedly include recruitment, labour-market analysis, job boards, company hiring signals and AI/data workflows.

## Supply structure

Major LinkedIn/Indeed/Google surfaces are crowded and price competition is intense. Comparable raw-data products can differ by more than an order of magnitude in unit price. Differentiation is commonly based on fields, speed, no-login operation, geographic coverage, enrichment and reliability.

## Entrant dynamics

This is the strongest positive finding. Several products launched within months are already showing material monthly activity, while others remain at one or two users. Entry is therefore attainable but not automatic. Low price alone is insufficient; the stronger recent products combine low-cost HTTP/API extraction, useful fields and straightforward pay-per-result pricing.

## Economics

Pay-per-result dominates current new products. At prices measured in cents to a few dollars per thousand records, meaningful revenue requires volume. The channel nevertheless demonstrates sufficient user activity that a £2k–£5k annual target is plausible without becoming a category leader.

## Operating model

Source changes and anti-bot behaviour remain real maintenance risks. Jobs can be somewhat more stable than highly interactive social-media surfaces when public guest/search endpoints are available, but major platforms still require monitoring and fixes.

## Deep-dive conclusion

**Attractive type, but generic major-board clones are not an attractive specific opportunity.** The evidence supports looking for narrower job-data surfaces or higher-value outputs where competition is lower while buyer value remains clear.

---

# Stage C2 — Lead Generation / Business Intelligence Deep Dive

## Sample discipline

The sample deliberately includes mature products and recent community entrants in two major submarkets: advertising intelligence and local-business/Maps data.

| Product | Approx. age | Total users | Monthly active users | Indicative price | Sample role |
|---|---:|---:|---:|---|---|
| Apify Facebook Ads Library | ~3.4 years | 34k | 5.5k | ~$3.40 / 1k ads | Official incumbent |
| Curious Coder Facebook Ads | ~7 months | 39k | 5.5k | ~$0.75 / 1k ads | Rapid-growth entrant |
| VortexData Google Maps | ~4 months | 2.1k | 625 | ~$0.70 / 1k places | Rapid-growth entrant |
| WebDataLabs Meta Ad Library | ~7 months | 603 | 61 | ~$17 / 1k ads | Feature-differentiated entrant |
| Crawler Bros Google Maps Leads | ~4 months | 105 | 33 | ~$1 / 1k | Recent entrant |
| PracticalTools Facebook Ad Library | ~5 months | 92 | 22 | ~$0.50 / 1k | Recent entrant |
| Several other Maps/Ads entrants | ~2–10 months | low double/single digits | 0–14 | varied | Weak entrants |

## Demand structure

Very high. Businesses pay for prospect lists, contact enrichment, advertiser data and market intelligence. Multiple products have thousands of monthly users.

## Supply structure

Extremely crowded in obvious sources such as Google Maps, LinkedIn and Meta Ads. There are many near-substitutable products competing on price, speed and extra fields. The strongest incumbent Google Maps product on the platform has hundreds of thousands of total users.

## Entrant dynamics

The type provides strong evidence that recent entrants can still break through: Curious Coder's Ads product and VortexData's Maps product reached substantial usage within months. At the same time, many equally recent clones remain near zero. This is a high-variance market where execution and positioning matter greatly.

## Economics

Demand and usage are sufficient for the revenue target. Price compression is substantial, however, and many products compete below $1 per thousand results. Products charging materially more need enrichment or differentiated outputs that buyers value.

## Operating model

Major-platform scraping is maintenance intensive. Lead enrichment can also create dependencies on multiple sources, email verification services or anti-bot systems. This weakens fit with the desired intermittent model.

## Deep-dive conclusion

**Commercially strong but structurally difficult.** The type remains interesting only where there is a material differentiated source/output or a higher-value enrichment layer. A generic Maps/LinkedIn/Meta clone should be rejected.

---

# Stage C3 — AI-Assisted Extraction Deep Dive

## Sample discipline

The sample includes the platform incumbent and community alternatives rather than relying on AI-category marketing material.

| Product | Approx. age | Total users | Monthly active users | Current signal | Sample role |
|---|---:|---:|---:|---|---|
| Apify AI Web Scraper | ~3.4 years | 8.8k | 259 | Active, 4.3 rating, open issue volume | Established incumbent |
| Eloquent Mountain AI Web Scraper | older/community | ~1k | ~36 | Smaller established alternative | Mid-tier |
| Crawlworks AI Web Scraper | ~4 months | ~100 | ~10 | Under maintenance | Recent entrant |
| Other recent AI extractor listings | recent | single/double digits | low/single digits | Limited adoption | Weak entrants |

## Demand structure

There is clearly some demand for prompt-driven extraction, but current adoption is materially smaller than major conventional web-data types. The incumbent has thousands rather than hundreds of thousands of users, and recent alternatives have not yet shown strong traction.

## Supply structure

Competition is less numerically overwhelming than social/lead generation, but the incumbent product is Apify-maintained and deeply integrated with the platform. External substitutes such as Browse AI, Diffbot-style services and general LLM/browser tools also compete for the same buyer problem.

## Entrant dynamics

Weak in the current sample. A recent alternative with a similar proposition reached only around ten monthly users and is under maintenance. There is not yet evidence comparable with the jobs or lead-generation types showing repeated recent entrant success.

## Economics

The incumbent charges around $20 per thousand page extractions, showing a much higher unit value than commodity raw-data scraping. If differentiated demand exists, the revenue target could be reached at lower usage volumes. The issue is acquisition rather than theoretical unit economics.

## Operating model

Potentially attractive: AI extraction can reduce source-specific maintenance because the product is generalized, and Apify handles infrastructure. However, LLM costs, latency and variable extraction reliability require monitoring. Current incumbent issues include failed/incomplete extraction and performance complaints.

## Deep-dive conclusion

**High capability fit but currently weak evidence for a new generic entrant.** The type should not be promoted merely because it aligns with technical expertise. Any specific opportunity needs a narrower buyer problem than 'AI web scraper'.

---

# Stage D — Specific Opportunity Hypotheses

Specific opportunities are generated only now, after the screen and selected deep dives.

## From Jobs / Recruitment

### J1 — Under-served regional or specialist job-data source

- **Buyer:** recruiters, job-data products, labour-market analysts, AI/research workflows.
- **Problem:** relevant job data exists on a regional/vertical source but lacks a reliable structured API/Actor.
- **Finished output:** structured job records with stable schema and pay-per-result access.
- **Gap:** major global boards are crowded; the type-level evidence shows buyer demand but suggests competition can be reduced by source selection.
- **Key uncertainty:** whether any particular under-served source has enough buyer demand.

### J2 — Normalised multi-source job feed

- **Buyer:** job boards, analysts, recruiters and data teams.
- **Problem:** source-specific Actors return inconsistent schemas and duplicate jobs.
- **Finished output:** normalized, deduplicated multi-board feed with source attribution and optional enrichment.
- **Gap:** shifts differentiation from raw extraction to usable output.
- **Key uncertainty:** whether buyers will pay enough for aggregation rather than directly orchestrating existing Actors.

### J3 — Hiring-market intelligence rather than raw listings

- **Buyer:** sales/research/competitive-intelligence users.
- **Problem:** raw job feeds require downstream analysis to identify hiring trends, growth signals and skills demand.
- **Finished output:** company/role trend summaries or structured hiring signals.
- **Gap:** higher-value transformation over a proven data market.
- **Key uncertainty:** independent demand for the derived signal inside Apify.

## From Lead Generation

### L1 — Enriched leads from an under-covered source or vertical

- **Buyer:** sales/marketing/recruiting teams.
- **Problem:** generic sources are saturated, but useful vertical/local sources can lack reliable structured/enriched data.
- **Finished output:** source data plus verified contact/company enrichment.
- **Gap:** differentiation by source/vertical and useful fields rather than another generic Maps clone.
- **Key uncertainty:** source-specific demand and maintenance burden.

### L2 — Cross-source lead enrichment / normalization

- **Buyer:** teams already obtaining raw leads from existing Actors.
- **Problem:** raw outputs need deduplication, contact enrichment, normalization and scoring.
- **Finished output:** a normalized/enriched record rather than raw scraped rows.
- **Gap:** builds over proven demand rather than competing for extraction directly.
- **Key uncertainty:** willingness to pay versus assembling the workflow independently.

## From AI-Assisted Extraction

### A1 — Domain-specific AI extraction

- **Buyer:** users repeatedly extracting one complex document/page class.
- **Problem:** generic AI extraction is expensive/variable and requires prompt engineering.
- **Finished output:** reliable domain-specific structured extraction with fixed schema and validation.
- **Gap:** narrows the problem enough to compete on outcome rather than generic AI capability.
- **Key uncertainty:** identifying a domain with sufficient repeat demand and appropriate expertise.

### A2 — Extraction quality/validation layer

- **Buyer:** users of existing scrapers/AI extractors.
- **Problem:** silent missing/invalid data creates downstream risk.
- **Finished output:** validation, normalization, anomaly detection and retry/repair over Actor datasets.
- **Gap:** addresses an observed operational pain rather than duplicating extraction.
- **Key uncertainty:** whether Apify users perceive the problem strongly enough to pay separately.

---

# Stage E — Preliminary Specific-Opportunity Assessment

This is intentionally preliminary. The hypotheses have not yet received external demand validation, so confidence is mostly Low/Medium.

Scores: 5 = more attractive.

| Opportunity | Demand evidence | Differentiation | Entrant plausibility | Revenue | Capability fit | Production leverage | Build effort | Operating burden | Distribution dependence | Risk | Overall confidence |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| J1 Regional/specialist job data | 4 | 4 | 4 | 4 | 3 | 5 | 4 | 3 | 4 | 3 | Medium |
| J2 Normalised multi-source job feed | 4 | 4 | 3 | 4 | 4 | 5 | 3 | 4 | 4 | 3 | Medium-Low |
| J3 Hiring-market intelligence | 3 | 5 | 3 | 4 | 4 | 5 | 3 | 4 | 3 | 4 | Low |
| L1 Under-covered enriched lead source | 4 | 4 | 3 | 5 | 3 | 5 | 3 | 2 | 4 | 3 | Medium-Low |
| L2 Cross-source lead enrichment | 4 | 4 | 3 | 4 | 4 | 5 | 3 | 4 | 4 | 3 | Medium-Low |
| A1 Domain-specific AI extraction | 3 | 4 | 2 | 4 | 5 | 5 | 4 | 4 | 3 | 4 | Low |
| A2 Extraction quality/validation | 2 | 5 | 3 | 3 | 5 | 5 | 4 | 5 | 3 | 5 | Low |

### Interpretation

The scores are **not recommendations**. Their main purpose is to expose the next uncertainty.

- J1 is supported by a strong parent market and good entrant dynamics, but needs identification/validation of an actual source with buyer demand.
- J2 and L2 are attractive production models, but willingness to pay for value-added aggregation/enrichment has not been established.
- AI opportunities fit the capability profile strongly but remain demand-constrained; they should not outrank better-evidenced markets until buyer evidence improves.

---

# Stage F — Validation Plans

## J1 Regional/specialist job data

**Largest uncertainty:** whether a specific under-served source has enough demand.

**Cheapest next test:** build a source inventory using external traffic/search/buyer-use evidence and Apify Store coverage; shortlist sources that show meaningful external usage but no strong Store product.

**Success signal:** at least one source with credible buyer/use demand, weak Apify supply and technically maintainable public access.

## J2 Normalised multi-source job feed

**Largest uncertainty:** willingness to pay for aggregation/deduplication.

**Cheapest next test:** inspect issues/reviews/use cases around major job Actors and search external developer/recruitment discussions for repeated requests for multi-board normalized feeds.

**Success signal:** repeated independent evidence that buyers currently build/pay for normalization, deduplication or cross-board aggregation.

## L1 Under-covered enriched lead source

**Largest uncertainty:** whether a differentiated source provides enough commercial value to overcome maintenance cost.

**Cheapest next test:** inventory high-value vertical/local directories and compare external buyer use, Store competition, data richness and technical extraction stability.

**Success signal:** identifiable vertical with recurring commercial lead-generation use and materially weaker supply than Maps/LinkedIn.

## AI opportunities

**Largest uncertainty:** buyer demand, not technical feasibility.

**Cheapest next test:** do not prototype first. Search for repeated paid/current buyer problems that generic AI extraction does not solve, then check whether existing Store products serving that exact problem show usage.

**Success signal:** a concrete sub-use-case with current paid substitutes or demonstrable Store adoption independent of the generic AI category.

---

# Pilot Review

## What improved versus the first pilot

1. **The whole opportunity landscape was mapped first.** No seller story determined the taxonomy.
2. **Every opportunity type was screened before any deep dive.** This prevents research attention from following whichever source happens to be most vivid.
3. **Deep dives were selected for explicit reasons.** They represent different combinations of demand, competition and capability fit.
4. **Anecdotes became supporting evidence rather than the spine of the analysis.** Product-level current usage and multiple examples carry more weight.
5. **Specific product hypotheses appeared only after type-level analysis.** This preserves the general-to-specific funnel.
6. **High personal capability fit did not override weak demand.** AI/agent opportunities remain lower-confidence despite technical alignment.

## Remaining methodology issues exposed

### 1. Opportunity taxonomy may need more than one dimension

Native marketplace categories are often overlapping tags rather than clean markets. A robust future method may need to distinguish:

- **buyer/use-case type**, and
- **product/production form**.

For Apify, `Jobs` is primarily a buyer/data market, while `Open source`, `MCP servers` and `Agents` are partly product/distribution forms. The current normalization is workable but not perfectly orthogonal.

### 2. Stage B needs a defined evidence budget

The screen must be broad without turning into sixteen separate deep dives. A practical future rule should define a minimum evidence package per type, for example:

- one market/category-level signal where available;
- several representative products rather than one;
- at least one entrant signal where available;
- operating/pricing evidence;
- explicit confidence.

The exact sample size should remain flexible by channel rather than fixed mechanically.

### 3. Selection should not rely on an unweighted score total

The scores are useful comparison aids but should not be summed blindly. A type with very high demand but impossible operating burden may be unsuitable even if its numeric total is high. Selection should use explicit gates/constraints plus comparative scores.

### 4. Stage E framework needs another pilot

The specific-opportunity metrics are directionally sensible, but they have not yet been tested on a channel with a very different product model. They should remain provisional until another channel/class is analysed.

## Overall conclusion

This structured rerun is materially closer to the intended research method than the first Apify pilot.

The key methodological shape appears sound:

**Map opportunity types → Screen all types → Select deep dives → Analyse selected types → Identify specific opportunities → Assess opportunities → Define validation tests.**

The main remaining design work is to refine the taxonomy rule and Stage B evidence budget, then test the same funnel on a materially different channel before promoting it into the canonical methodology.

---

# Sources

## Apify structure and marketplace data

- Apify Store: https://apify.com/store
- Apify Store categories: https://apify.com/store/categories
- Store API: https://docs.apify.com/api/v2/store-get
- Actors in Store / pricing: https://docs.apify.com/actors/running/actors-in-store
- Creator programme: https://apify.com/partners/actor-developers
- Community vs Apify maintenance: https://docs.apify.com/actors/running/store/actor-developers

## Opportunity taxonomy/category references

- Lead generation: https://apify.com/store/categories/lead_generation
- E-commerce: https://apify.com/store/categories/ecommerce
- AI: https://apify.com/store/categories/ai
- Agents: https://apify.com/store/categories/agents
- Automation: https://apify.com/store/categories/automation
- Developer tools: https://apify.com/store/categories/developer_tools
- Integrations: https://apify.com/store/categories/integrations
- Jobs: https://apify.com/store/categories/jobs
- MCP servers: https://apify.com/store/categories/mcp-servers
- News: https://apify.com/store/categories/news
- Open source: https://apify.com/store/categories/open-source
- Real estate: https://apify.com/store/categories/real-estate
- SEO: https://apify.com/store/categories/seo-tools
- Travel: https://apify.com/store/categories/travel
- Videos: https://apify.com/store/categories/videos
- Other: https://apify.com/store/categories/other

## Jobs sample

- Curious Coder LinkedIn Jobs: https://apify.com/curious_coder/linkedin-jobs-scraper
- Vali GM LinkedIn Jobs: https://apify.com/valig/linkedin-jobs-scraper
- Vali GM Indeed Jobs: https://apify.com/valig/indeed-jobs-scraper
- Crawlworks LinkedIn Jobs: https://apify.com/crawlworks/linkedin-jobs-scraper
- Automation Lab LinkedIn Jobs: https://apify.com/automation-lab/linkedin-jobs-scraper
- SolidCode LinkedIn Jobs: https://apify.com/solidcode/linkedin-jobs-scraper
- Orgupdate Google Jobs: https://apify.com/orgupdate/google-jobs-scraper
- memo23 Google Jobs: https://apify.com/memo23/google-jobs-scraper
- JobsAPI LinkedIn Jobs: https://apify.com/jobsapi/linkedin-jobs-search-scraper

## Lead-generation sample

- Apify Facebook Ads: https://apify.com/apify/facebook-ads-scraper
- Curious Coder Facebook Ads: https://apify.com/curious_coder/facebook-ads-library-scraper
- VortexData Google Maps: https://apify.com/vortex_data/google-maps
- WebDataLabs Meta Ads: https://apify.com/webdatalabs/meta-ad-library-scraper
- Crawler Bros Google Maps Leads: https://apify.com/crawlerbros/google-maps-leads
- PracticalTools Facebook Ads: https://apify.com/practicaltools/facebook-ad-library-scraper

## AI sample

- Apify AI Web Scraper: https://apify.com/apify/ai-web-scraper
- Eloquent Mountain AI Web Scraper: https://apify.com/eloquent_mountain/ai-web-scraper-extract-data-with-ease
- Crawlworks AI Web Scraper: https://apify.com/crawlworks/ai-web-scraper
- Apify AI agents overview: https://apify.com/ai-agents
