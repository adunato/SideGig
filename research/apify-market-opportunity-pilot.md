# Apify Market and Opportunity Analysis Pilot

## Status

Pilot complete. This document is deliberately separate from [methodology.md](methodology.md). It tests a possible next stage of research after channel assessment without changing the canonical methodology yet.

## Purpose

The existing channel assessment answered the question:

> **Is Apify Store an attractive channel through which an independent developer could sell?**

This pilot tests the next layer of research:

> **Where inside Apify Store is demand concentrated, what kinds of markets offer room for a new entrant, and what specific opportunity types could plausibly fit the project requirements?**

The objective is not to select a product immediately. It is to establish a repeatable way to move from an attractive channel to evidence-based opportunity hypotheses.

## Pilot scope

The pilot used Apify Store because the channel assessment found unusually strong evidence of current creator revenue and because Apify exposes more marketplace intelligence than most channels.

Research covered:

1. Marketplace structure and observable metrics.
2. Current high-demand product patterns.
3. Evidence from recent successful entrants.
4. Current competitive patterns and saturation.
5. Apify's own open idea backlog as a secondary demand signal.
6. Product forms aligned with the project's technical capabilities.
7. Candidate opportunity clusters and their principal uncertainties.

This is **not** a complete product search across every Actor in Apify Store. The purpose is to test the research process and identify what a full market-analysis pass should contain.

---

## 1. What market data is observable on Apify

Apify is unusually suitable for market analysis because its public Store and Store API expose useful product-level statistics.

Observable fields include:

- Total users.
- Users active in the last 7, 30 and 90 days.
- Lifetime runs.
- Thirty-day run success/failure statistics.
- Ratings and review counts.
- Bookmarks.
- Pricing model and pricing information.
- Developer identity.
- Categories.
- Last-run and modification information.

This means a future analysis does not need to infer market structure only from listings or reviews. It can build a structured dataset of the Store and directly compare **recent usage, accumulated adoption, quality, pricing, recency and supply**.

### Important limitation

Apify does not expose Actor-level revenue publicly. Monthly users and runs therefore remain demand proxies unless a creator discloses earnings. User counts also do not identify whether each user generated material paid usage.

The strongest market analysis should consequently combine Store metrics with creator payout evidence and external demand evidence rather than treating any single metric as sales.

---

## 2. Marketplace-level commercial evidence

Apify currently states that creators collectively earn approximately **$1.5 million per month** from products on the platform. Its Store currently contains more than **65,000** tools and automations.

The public creators directory also shows substantial concentration among established developers. Examples include Apify itself with roughly 2.2 million users, Compass with more than 700,000, Clockworks with more than 400,000, and numerous community creators with tens or hundreds of thousands of users.

This confirms two things simultaneously:

1. The market contains genuine material spending.
2. Aggregate marketplace success is not sufficient evidence for a new product because usage is highly uneven.

The next-stage analysis must therefore work at the **niche or use-case level**, not only at channel level.

---

## 3. What currently dominates demand

The most visible high-adoption products are overwhelmingly based on **valuable web data**, especially:

- Social-media data.
- Lead generation and business data.
- E-commerce and product intelligence.
- Jobs and recruitment data.
- Search/SEO data.
- Advertising and competitive intelligence.

Examples from the public Store include large incumbent Actors for Instagram, TikTok, Google Maps, Google Search and Meta Ads with user counts ranging from many thousands to hundreds of thousands.

This establishes a strong base-market conclusion:

> Buyers primarily appear to pay for access to structured, automation-ready data that would otherwise be inconvenient, technically difficult or expensive to obtain reliably.

The successful product is therefore usually not "a scraper" as a technical artefact. The finished product is **convenient access to commercially useful data through a reliable interface**.

---

## 4. Saturated markets versus attainable niches

A July 2026 case study from a community developer is especially informative because it describes the first six months after entering the Store.

The developer initially targeted obvious platforms such as LinkedIn, Amazon and Instagram but found them dominated by multiple established Actors. He then switched to three signals:

1. Search demand with weak existing supply.
2. High-value data with moderate technical difficulty.
3. Regional or vertical specialisation.

The resulting portfolio reached approximately **2,500 total users and 855 monthly active users across 98 Actors** within six months. The developer reports that niche products such as Welcome to the Jungle, Skool and regional job/data sources outperformed his obvious large-platform bets.

The lesson is important for the opportunity methodology:

> **Large demand is not the same as attractive opportunity.**

The relevant target is a niche with enough demand to matter but without a mature dominant solution.

### Current Store observations support this

Large established markets can still support challengers, but direct competition is intense. For example, Meta Ad Library has an Apify-maintained Actor with thousands of monthly users and many community competitors. Some newer community alternatives have nevertheless reached hundreds of monthly users when they compete on price or features.

Regional/vertical markets can produce strong adoption with much smaller absolute audiences. Several recently published Welcome to the Jungle Actors now show material monthly usage despite targeting a narrower European job-data source.

---

## 5. Pricing and buying behaviour

Apify is standardising monetisation around **pay per event (PPE)** and is retiring fixed rental pricing during 2026.

PPE lets a creator charge for a concrete unit of value such as:

- a record returned;
- a page processed;
- a task completed;
- an external API call;
- an Actor run.

The creator normally receives 80% of PPE revenue before any platform execution costs borne by the creator.

The recent entrant case study provides unusually useful behavioural evidence: for ten of eleven products where the developer operated both a traditional compute-priced version and a PPE version, the PPE product attracted more users, sometimes by more than tenfold.

This suggests a product-design rule for future opportunity assessment:

> Prefer products whose customer value can be expressed as a simple, predictable unit rather than requiring the buyer to understand infrastructure consumption.

---

## 6. Operational reality

Apify substantially reduces infrastructure burden but does not turn a live data product into passive income.

Recent creator evidence identifies ongoing requirements including:

- Site/source changes.
- Reliability monitoring.
- Retry and blocking logic.
- Silent data-quality failures.
- Issue response.
- Testing releases on Apify infrastructure.
- Maintaining reputation and reviews.

The same case study explicitly states that three reliable Actors can outperform ten poorly maintained ones and that issue-response time is commercially important.

This matters because the project requires an intermittent, low-maintenance model. A promising opportunity therefore needs to score not only on demand and competition but also on **source stability and maintenance architecture**.

An Actor based on a stable public API or relatively stable HTTP/JSON endpoint may fit much better than an Actor dependent on continuous browser automation against a rapidly changing consumer site.

---

## 7. Apify's idea backlog: useful but not demand proof

Apify maintains a public list of requested or suggested Actors marked `Open to develop`.

This is useful as a **lead-generation source for opportunities**, but it must not be treated as equivalent to paid demand.

Some ideas have explicit engagement. Examples observed during the pilot include:

- Zalo Scraper — 19 idea votes.
- Twitter Ads Scraper — 8 votes.
- PowerAdSpy Scraper — 4 votes.
- BuzzSumo Scraper — 3 votes.

By contrast, many AI/MCP ideas currently show zero votes, including MCP Validator and OpenAPI-to-MCP concepts.

The ideas database therefore provides a valuable additional signal, particularly when an idea has votes and weak Store supply, but each candidate still requires validation against actual Store usage and broader external demand.

---

## 8. Market clusters considered in the pilot

The following clusters were investigated as possible starting points for a deeper product search.

### A. Generic major-platform scrapers

Examples: Instagram, LinkedIn, Amazon, Meta Ads, Google Maps.

**Demand:** Very high  
**Competition:** Very high  
**New-entrant evidence:** Mixed  
**Project fit:** Moderate  
**Maintenance:** Often high

#### Conclusion

**Do not make this the default search area.** These markets prove willingness to pay but contain strong incumbents, mature products, price pressure and substantial reliability engineering.

A candidate in this cluster should survive only if it has a clearly differentiated data surface or derived output that incumbents do not provide.

---

### B. Regional or vertical structured-data Actors

Examples observed in the market include regional job boards, specialist community platforms, vertical directories and region-specific marketplaces.

**Demand:** Medium but demonstrably real  
**Competition:** Often low to moderate  
**New-entrant evidence:** Strong  
**Production leverage:** High  
**Maintenance:** Highly source-dependent

#### Evidence

Recent entrant evidence shows meaningful user acquisition from sources such as Welcome to the Jungle and Skool. The creator case study specifically identifies regional/vertical specialisation as one of the strongest strategies found during six months of experimentation.

#### Conclusion

**Strongest validated general opportunity pattern.**

However, the methodology must not simply search for obscure websites. It should require evidence that the underlying data is commercially useful and that the researcher understands who buys it and why.

---

### C. Derived intelligence rather than raw scraping

Examples could include:

- cross-source monitoring;
- enrichment;
- trend detection;
- change detection;
- ranking/scoring;
- data normalization;
- aggregation of several public sources into a decision-ready output.

**Demand:** Plausible and adjacent to proven markets  
**Competition:** Potentially lower than raw scrapers  
**Production leverage:** Very high  
**Capability fit:** High  
**Maintenance:** Potentially lower if built on existing Actors/APIs rather than direct fragile scraping

#### Evidence

The Store contains commercially active products built around advertiser intelligence, lead enrichment and combined data sources. Apify itself describes Actors as composable and supports one Actor calling others. PPE can charge directly for the higher-level output or completed task.

#### Conclusion

**High-priority cluster for deeper investigation.**

This may better exploit software/AI capability upstream than simply competing on extraction code. It also creates a longer value chain between raw data and the finished thing the customer buys.

The unresolved question is whether a specific derived product has sufficient independent demand. That must be validated at use-case level.

---

### D. Advertising and competitor intelligence niches

The broad market is clearly validated. Meta Ads and TikTok Ads products show substantial usage, and multiple recent community products have acquired material users.

**Demand:** High  
**Competition:** High in generic Meta/TikTok extraction  
**Opportunity:** Potentially attractive in narrower sources or derived signals  
**Capability fit:** Medium  
**Maintenance:** Medium to high

Apify's idea backlog also contains demand signals for Twitter Ads and specialist ad-intelligence services.

#### Conclusion

**Useful hunting ground, not an immediate product recommendation.**

A raw Meta Ads clone would be unattractive. A less-covered advertising source or a product producing differentiated campaign intelligence could warrant a full opportunity assessment.

---

### E. AI, LLM, RAG and MCP developer tools

This cluster has the strongest overlap with the project's technical expertise.

Examples investigated included:

- MCP validation.
- MCP discovery.
- OpenAPI-to-MCP bridges.
- RAG content extraction and linting.
- Apify Store intelligence/developer tools.

**Capability fit:** Very high  
**Production leverage:** Very high  
**Observed current Store demand:** Low  
**Idea-backlog demand:** Weak/uncertain

Several recent products in this area currently show single-digit total or monthly users. Multiple Apify idea entries for MCP utilities also show zero explicit votes.

Apify is strategically investing in MCP and agentic payments, so future growth is plausible, but current evidence does not justify assuming that developer-tool fit automatically translates into a commercial opportunity.

#### Conclusion

**Watchlist / exploratory cluster rather than validated opportunity.**

This is an important negative result. The methodology correctly prevents personal capability from substituting for evidence of demand.

---

### F. SaaS API and open-source wrappers

Apify explicitly identifies two product forms it wants developers to create:

- wrappers around existing SaaS APIs;
- cloud-packaged versions of useful open-source tools.

The product proposition is convenience: make an existing technical capability runnable through Apify without local installation, custom infrastructure or separate integration work.

**Capability fit:** High  
**Production leverage:** High  
**Maintenance:** Potentially low to medium  
**Demand evidence:** Requires product-specific validation

#### Conclusion

**Promising production model but not yet a validated market cluster.**

The key next step would be to find open-source tools or APIs with strong external usage but weak/no Apify presence, then test whether Apify users show demand for the hosted form.

---

## 9. Pilot opportunity shortlist

The pilot does not establish a single product worth building. It does identify three opportunity patterns that merit a proper detailed scan.

| Opportunity pattern | Market evidence | Capability fit | Production leverage | Likely maintenance | Pilot priority |
|---|---|---|---|---|---|
| Regional/vertical high-value data source with weak Store supply | Strong | Medium, source dependent | High | Medium | **High** |
| Derived intelligence/enrichment built over existing data sources or Actors | Medium | High | **Very high** | Low–Medium | **High** |
| SaaS/open-source capability packaged as a managed Actor/API | Medium–Low until individually validated | **Very high** | **Very high** | Low–Medium | **Medium–High** |
| Narrow advertising/competitive-intelligence source | Strong broad-market evidence | Medium | High | Medium–High | Medium |
| AI/MCP/RAG utility | Weak current Store evidence | **Very high** | **Very high** | Low–Medium | Watchlist |
| Generic major-platform scraper | Very strong demand | Medium | High | High | Low |

The important result is that **the most attractive product form is not necessarily the area of strongest technical familiarity**. Opportunity selection must keep market evidence and capability fit as separate tests and require both before proceeding.

---

## 10. Proposed detailed opportunity-analysis process derived from the pilot

The following process worked well enough to serve as the basis for a future methodology addition, but it remains provisional until reviewed.

### Phase A — Map the channel's internal markets

Identify the channel's principal product/use-case clusters rather than treating the channel as one market.

For Apify this means categories such as social data, lead generation, jobs, ecommerce, advertising, AI tools, developer tools and specialist vertical data.

### Phase B — Quantify demand and supply within each candidate niche

For each niche/search term, collect a structured set of competing products and record at least:

- Number of relevant products.
- Total users.
- 30-day active users.
- 7/90-day users where useful.
- Runs and recent run activity.
- Pricing/model.
- Ratings/reviews.
- Product age/last update.
- Developer/incumbent identity.
- Reliability where observable.

Do not rely on the top listing alone.

### Phase C — Separate incumbent demand from entrant attainability

Inspect both:

1. Established leaders proving the market exists.
2. Products launched recently enough to show whether new entrants can acquire users.

A niche dominated by one mature incumbent with no recent challengers gaining traction should score differently from one where multiple recent products acquire users.

### Phase D — Search explicitly for gaps

Look for:

- Search demand returning no product.
- Stale or poorly rated incumbents.
- Missing features repeatedly requested in issues/reviews.
- Regional/vertical variants.
- Valuable fields not exposed by existing products.
- Expensive solutions that could be undercut structurally.
- Raw-data products that could be converted into higher-value derived intelligence.

### Phase E — Validate demand outside the channel

Cross-check the use case using evidence such as:

- Search demand.
- Reddit/Hacker News/Stack Overflow discussions.
- Existing SaaS/API competitors and their pricing.
- Public spending statements.
- GitHub usage where relevant.
- The platform's idea/request backlog.

The channel can reveal that a product exists; external evidence helps establish why customers care.

### Phase F — Generate narrowly specified opportunity hypotheses

Each hypothesis should define:

- Buyer.
- Problem.
- Finished output.
- Data/capability supplied.
- Why existing alternatives are inadequate.
- Why this channel is appropriate.

Avoid generic statements such as "build an AI Actor" or "build a scraper."

### Phase G — Assess opportunity fit

For each hypothesis assess:

1. Paying-demand evidence.
2. Supply/competition.
3. New-entrant attainability.
4. Revenue plausibility.
5. Domain/capability fit.
6. Production leverage.
7. Initial build effort.
8. Ongoing maintenance/support burden.
9. Distribution dependence outside the marketplace.
10. Legal/platform/IP/privacy risk.
11. Cheapest validation experiment.

Confidence should be recorded separately from the substantive conclusion, using the same principle already adopted for channel assessment.

### Phase H — Shortlist validation experiments rather than products

Before committing to development, define the cheapest way to resolve the largest uncertainty.

Examples:

- Pull a full Store dataset for the niche and measure recent entrant usage.
- Test a search term against the Store and external search demand.
- Prototype extraction against the target source to estimate maintenance difficulty.
- Inspect competitor issues for missing fields/features.
- Build a very narrow minimum Actor and observe Store usage before expanding it.

This keeps the research focused on reducing uncertainty rather than writing a large speculative product specification.

---

## 11. What the pilot says about the methodology

### What worked

- Separating channel attractiveness from internal market attractiveness.
- Using product-level recent-usage metrics rather than listings alone.
- Looking explicitly for recent entrant evidence.
- Treating platform idea requests as leads rather than demand proof.
- Evaluating product maintenance as part of the market opportunity, not after selection.
- Keeping technical fit separate from market demand.

### What needs more testing

- How to convert Store metrics into a consistent niche-level score without creating false precision.
- How large a competitor sample is sufficient for a niche.
- How to compare fundamentally different opportunity types such as a scraper, derived intelligence product and open-source wrapper.
- Whether the same process works on marketplaces with much less public product-level data.

### Recommendation before changing the canonical methodology

Run at least one **fully quantified Apify niche analysis** using the public Store API and this process. That should produce an actual ranked set of narrowly defined product opportunities rather than only opportunity clusters.

If that works, pilot the same deeper process on one materially different channel class before making the new stages canonical.

---

## Sources

### Apify marketplace and platform

1. Apify Store: https://apify.com/store
2. Apify creators directory: https://apify.com/creators
3. Apify Store API — list Actors / exposed stats: https://docs.apify.com/api/v2/store-get
4. Apify Store documentation: https://docs.apify.com/console/store
5. How Apify Store works: https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-store-works
6. Actor quality score: https://docs.apify.com/actors/publishing/quality-score
7. Publishing Actors: https://docs.apify.com/actors/publishing
8. Monetize Actors: https://docs.apify.com/actors/publishing/monetize
9. Pay-per-event pricing: https://docs.apify.com/actors/publishing/monetize/pay-per-event
10. Store publishing terms: https://docs.apify.com/legal/store-publishing-terms-and-conditions
11. Apify pricing: https://apify.com/pricing
12. Why Apify is standardizing Actor pricing, April 2026: https://blog.apify.com/standardizing-actor-pricing/
13. Find ideas for new Actors: https://docs.apify.com/academy/build-and-publish/actor-ideas/find-actor-ideas
14. Validate your Actor idea: https://docs.apify.com/academy/build-and-publish/actor-ideas/actor-validation
15. Apify ideas: https://apify.com/ideas

### Entrant and market evidence

16. How I built 98 Actors on Apify Store in 6 months, July 2026: https://blog.apify.com/building-98-actors-on-apify-store/
17. Meta/Facebook Ads Library Scraper — Apify: https://apify.com/apify/facebook-ads-scraper
18. Facebook Ads Library Scraper — Automation Lab: https://apify.com/automation-lab/facebook-ads-library
19. TikTok Ads Scraper — Lexis Solutions: https://apify.com/lexis-solutions/tiktok-ads-scraper
20. Welcome to the Jungle Scraper — ClearPath: https://apify.com/clearpath/welcome-to-the-jungle-jobs-api
21. Store Leads (14M E-Commerce Leads): https://apify.com/ecommerce_leads/store-leads-14m-e-commerce-leads
22. RAG Web Browser: https://apify.com/crawlerbros/rag-web-browser
23. MCP Registry Actor: https://apify.com/epicmotionsd/mcp-registry-discovery
24. Apify Store API / intelligence Actor: https://apify.com/johnvc/store-actor-intelligence-api

### Idea-backlog examples

25. Marketing ideas including Zalo/Twitter Ads/PowerAdSpy/BuzzSumo: https://apify.com/ideas/categories/marketing
26. MCP Validator idea: https://apify.com/ideas/mcp-validator
27. OpenAPI to MCP Converter idea: https://apify.com/ideas/openapi-to-mcp-converter
28. Social Media Trend Finder idea: https://apify.com/ideas/social-media-trend-finder
