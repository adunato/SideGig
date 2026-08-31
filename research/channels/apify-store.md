# Apify Store

- **Channel class:** API and Microservice Marketplaces
- **Channel URL:** https://apify.com/store
- **Assessment status:** Assessed
- **Assessment date:** 2026-08-31
- **Phase 2 opportunity-area assessment:** Completed as methodology pilot on 2026-08-31

## Description

Apify Store is a marketplace for hosted "Actors": server-side programs that can perform web scraping, data extraction, automation, AI-agent tasks and general API-like services. Developers publish Actors to Apify's managed runtime and can charge users per event or usage while Apify handles execution infrastructure, marketplace distribution, billing and payouts.

## Channel Assessment

Assessment framework: [../channel-assessment-framework.md](../channel-assessment-framework.md)

A higher score always means a more attractive channel for this project.

| Metric | Score (1–5) | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Apify publishes unusually strong current commercial evidence: its creator page states that it pays **$1.5M per month** to creators, has **3,900 community developers**, **65,628 tools and automations**, and receives **10k+ new developer sign-ups per day**. Its October 2025 monetisation guidance says the most successful independent creators make more than $10,000 MRR and many others exceed $1,000/month. These figures directly establish substantial paying demand rather than merely platform traffic. |
| Opportunity density | **4** | Medium | $1.5M in monthly creator payouts against 3,900 community developers implies meaningful monetisation across the ecosystem even though earnings are certainly concentrated and not every developer is paid. The catalogue is large, but much of it is free, platform-created or highly specialised. Recent case studies show users accruing to niche Actors, suggesting that demand is not restricted to a few incumbent listings. Exact payout concentration is not public, so the score stops short of 5. |
| New-entrant attainability | **4** | High | Publishing is open to community developers and there is recent direct evidence of entrant traction. A July 2026 case study describes a developer who published his first Actor in November 2025 and, six months later, had 98 public Actors, 2,500 total users and 855 monthly active users. Apify also surfaces recent creator testimonials describing first profitable months and growing passive-income strategies. This is substantially stronger evidence than available for the other API marketplaces. |
| Revenue potential | **5** | High | The project's target of roughly £2,000–£5,000/year is well below the earnings levels Apify publicly reports for many successful creators. Apify says many independent creators make more than $1,000/month and top creators exceed $10,000 MRR. Pay-per-event creators receive 80% of revenue before platform execution costs, and creators can price granular events rather than relying only on subscriptions. |
| Competitive pressure | **3** | Medium | The store contains more than 65,000 tools and Apify explicitly allows competing Actors for the same target. Popular scraping targets are crowded. However, recent creator evidence says the products that paid off were often niches nobody else had built, and the platform's broad runtime means developers can publish non-scraping tools as well. Competition is meaningful but there remains a large differentiated search space. |
| Production leverage | **5** | High | This channel strongly rewards software automation and high production velocity. Actors are code products, can be generated and tested systematically, can wrap existing APIs or data workflows, and can be deployed as many specialised variants. Apify also supports AI-agent/agentic payments and MCP-oriented discovery, further increasing the value of reusable technical production systems. |
| Operating burden | **4** | High | Apify handles serverless execution, scaling, billing, marketplace distribution and payouts, removing much of the infrastructure burden found on conventional API marketplaces. Creators still need to maintain reliability, monitor costs and respond to issues; execution costs can reduce margin. A successful Actor cannot be abandoned indefinitely, but the managed runtime makes the total obligation materially lower than self-hosted API channels. |

### Supporting assessments

- **Trend:** Growing
- **Evidence confidence:** High

Current platform evidence indicates expansion rather than stagnation: large monthly creator payouts, 10k+ daily sign-ups, a 2026 pricing redesign for agentic usage, migration of thousands of Actors toward pay-per-event pricing, and active investment in creator acquisition. Among the assessed API/microservice channels, Apify provides the strongest direct evidence that the marketplace is currently producing material independent-developer income.

---

# Phase 2 — Opportunity Areas Within Apify

This section applies Steps 6–8 of [../methodology.md](../methodology.md) to Apify Store as the Phase 2 methodology pilot.

The purpose is to identify and assess the **commercial opportunity areas inside Apify**, not to identify or recommend specific products.

## Step 6 — Identify Opportunity-Area Discovery Sources

The following sources were selected before the discovery pass:

1. **Apify public Store and native categories** — primary source for the visible product landscape, category definitions, product examples and current usage signals.
2. **Apify Store API and API documentation** — primary structured source. The `/v2/store` endpoint supports category, search, pricing-model and developer filters and exposes product statistics including total users and recent user windows.
3. **Apify category and collection pages** — coverage cross-check for how Apify groups products and describes buyer use cases.
4. **Individual Actor pages** — used during assessment for pricing, 30-day active users, total users, ratings, recency, maintenance activity and comparable products.
5. **Near-complete third-party Store snapshot based on the public API** — secondary cross-check only. A July 2026 analysis covered 54,025 public Actors and compared recent demand with supply by native category. It is not treated as primary evidence because category overlap and Apify-maintained-product visibility can bias results.

The discovery sources were chosen for broad Store coverage rather than because they highlighted particular products or creator stories.

## Step 7 — Discover Opportunity Areas

Apify's native taxonomy mixes several different concepts. Some tags describe buyer markets (`Jobs`, `Real estate`), while others describe technologies or product forms (`Agents`, `MCP servers`, `Open source`). Native categories therefore provide discovery coverage but are not copied directly into the analytical taxonomy.

The following 13 opportunity areas were identified as commercially distinct enough to assess separately.

| Opportunity area | Buyer need / commercial use case | Native categories / evidence used | Boundary notes |
|---|---|---|---|
| **Social media & video intelligence** | Access to structured profiles, posts, comments, creators, engagement and video-platform data for research, monitoring and analysis. | Social media, Videos; dominant Instagram/TikTok/YouTube products. | `Videos` is merged because the commercial use cases and competitive dynamics substantially overlap social-platform data. Ad-specific intelligence is separated below. |
| **Lead generation & business intelligence** | Discover organisations/people and obtain contact, location, company and enrichment data for prospecting and market research. | Lead generation; Google Maps, LinkedIn and enrichment products. | Excludes job-market data and dedicated advertising-intelligence products even where they can also generate leads. |
| **Advertising & marketing intelligence** | Monitor competitors' advertisements, creatives, advertisers, campaigns and ad-market activity. | Marketing signals plus products tagged Social media, Lead generation and E-commerce; Meta/Google/TikTok ad products. | Separated because the buyer problem is competitive advertising intelligence rather than generic social data or prospect lists. |
| **E-commerce & product intelligence** | Product, catalogue, seller, price, review and marketplace data for competitive intelligence, monitoring and ecommerce analytics. | E-commerce. | Lead datasets about ecommerce companies remain in lead generation; advertising creatives remain in advertising intelligence. |
| **Search & SEO intelligence** | SERP, ranking, keyword, search-result and website-SEO data for search monitoring and optimisation. | SEO tools; Google Search and related products. | General-purpose crawling without an SEO/search buyer need is excluded. |
| **Recruitment & jobs intelligence** | Job listings, employer, salary, skills and labour-market data for recruitment, research and job-market analysis. | Jobs; job-board and ATS products. | Products whose primary purpose is personal job-hunting automation are adjacent but included only where the purchased value is job-market data. |
| **Real-estate & property intelligence** | Property listings, prices, rentals, agents and housing-market data. | Real estate. | Source-specific property scrapers are grouped where the buyer need is property-market data. |
| **Travel & hospitality intelligence** | Accommodation, booking, hotel, flight, location, review and travel-price data. | Travel. | Google Maps is included as evidence only where travel/hospitality usage is explicit; its general lead-generation demand is not transferred wholesale to this area. |
| **News & media intelligence** | News/article feeds and monitoring data for research, media monitoring, trend analysis and downstream analytics. | News, Marketing. | General website-content extraction is excluded unless the proposition specifically addresses news/media monitoring. |
| **AI / LLM data preparation** | Clean, crawl and structure web content for LLM, RAG, vector-database and model-data workflows. | AI; selected Developer tools. | `AI` as a native tag is not itself an opportunity area. AI products aimed at another buyer problem remain in that buyer area. |
| **General web extraction & developer utilities** | Generic crawling, scraping and data-extraction infrastructure used by developers across many domains. | Developer tools, Open source. | `Open source` is treated as a product-form attribute, not a separate market. Domain-specific extraction products are assessed in their buyer area. |
| **Web / browser workflow automation** | Automate multi-step web or browser tasks where task execution, rather than a particular dataset, is the primary purchased value. | Automation, Agents. | `Agents` is treated as an implementation form. Agent products serving lead, news, jobs or other specific buyer markets remain in those areas. |
| **Data integrations & connectors** | Move Apify data to/from external systems and connect Actor outputs into other platforms. | Integrations, Automation. | Native platform integrations are direct substitutes and therefore relevant to competition. MCP is treated as an interface/distribution mechanism rather than a standalone opportunity area. |

### Taxonomy treatment of remaining native labels

- **Agents:** implementation/product form; allocated according to the underlying buyer need.
- **MCP servers:** interface/distribution form; not a distinct buyer market for this assessment.
- **Open source:** licensing/product form; not a distinct buyer market.
- **Other:** residual tag; products are allocated by buyer need where possible rather than creating a heterogeneous `Other` opportunity area.
- **Marketing:** cross-cutting buyer function; products are allocated to advertising intelligence, lead generation, SEO, social intelligence or another relevant commercial area.

Discovery was completed before any area was scored.

## Step 8 — Assess Opportunity Areas

A higher score always means a more attractive condition. Each score includes per-metric evidence confidence.

### Comparison summary

| Opportunity area | Paying demand | Opportunity density | New-entrant attainability | Revenue potential | Competitive pressure | Production leverage | Operating burden | Trend | Overall confidence |
|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| Social media & video intelligence | **5 H** | **3 M** | **4 M** | **5 H** | **1 H** | **5 H** | **1 H** | Growing | High |
| Lead generation & business intelligence | **5 H** | **3 M** | **4 H** | **5 H** | **2 H** | **5 H** | **2 H** | Growing | High |
| Advertising & marketing intelligence | **5 H** | **3 M** | **4 H** | **5 H** | **2 H** | **5 H** | **2 H** | Growing | High |
| E-commerce & product intelligence | **4 H** | **2 M** | **2 M** | **4 M** | **2 H** | **5 H** | **2 H** | Stable / Growing | Medium-High |
| Search & SEO intelligence | **5 H** | **3 M** | **3 M** | **5 H** | **2 H** | **5 H** | **2 H** | Stable / Growing | High |
| Recruitment & jobs intelligence | **5 H** | **4 M** | **4 H** | **4 H** | **3 M** | **5 H** | **3 M** | Growing | High |
| Real-estate & property intelligence | **3 M** | **3 L** | **2 M** | **3 M** | **3 M** | **5 H** | **2 H** | Stable / Unclear | Medium |
| Travel & hospitality intelligence | **4 H** | **3 M** | **2 M** | **4 M** | **3 M** | **5 H** | **2 H** | Stable / Growing | Medium-High |
| News & media intelligence | **3 M** | **4 M** | **4 H** | **3 M** | **4 M** | **5 H** | **4 M** | Growing | Medium-High |
| AI / LLM data preparation | **5 H** | **3 M** | **2 M** | **4 M** | **2 H** | **5 H** | **3 M** | Growing | Medium-High |
| General web extraction & developer utilities | **4 H** | **2 M** | **2 M** | **3 M** | **1 H** | **5 H** | **3 M** | Stable / Growing | Medium-High |
| Web / browser workflow automation | **2 M** | **3 L** | **2 M** | **2 L** | **3 L** | **5 H** | **2 H** | Growing | Medium-Low |
| Data integrations & connectors | **1 H** | **2 M** | **1 M** | **2 M** | **2 M** | **5 H** | **4 M** | Stable | Medium |

`H`, `M`, and `L` indicate High, Medium, and Low confidence for that metric.

---

### 1. Social media & video intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Apify's Instagram Scraper currently shows about **41K monthly active users**, 380K total users and pay-per-result pricing; TikTok and YouTube products are also among the Store's largest products. This is direct evidence of substantial current consumption of paid social-platform data. |
| Opportunity density | **3** | Medium | A near-complete July Store snapshot found Social Media had the strongest native-category demand-to-supply ratio (1.48x), but also 10,892 Actors and a median of only one 30-day user. Demand is large but highly concentrated. |
| New-entrant attainability | **4** | Medium | A differentiated community Instagram-related-profiles product currently has about **168 monthly active users** and 731 total users, showing that entrants can gain traction when the proposition differs from generic extraction. Generic recent Instagram clones often remain near zero, so evidence is mixed rather than uniformly strong. |
| Revenue potential | **5** | High | Incumbent and challenger products use explicit pay-per-result pricing, and observed monthly usage is far above the level at which the project's annual target could plausibly be achieved if a product captures meaningful paid usage. Exact seller revenue is private. |
| Competitive pressure | **1** | High | Major platforms have extremely strong Apify-maintained or long-established incumbents with hundreds of thousands of users, thousands of bookmarks and large review histories. Generic entry competes against mature products and free/off-channel alternatives. |
| Production leverage | **5** | High | Products are code-based extraction systems and can benefit strongly from shared scraping infrastructure, automated testing, reusable schemas, monitoring and rapid variation. |
| Operating burden | **1** | High | Social platforms are volatile, anti-automation-sensitive targets. Successful products require ongoing reliability work, proxy/blocking management and response to source changes; the incumbent Instagram product itself advertises active maintenance and support. |

- **Trend:** Growing
- **Overall confidence:** High
- **Principal gap:** category-level revenue distribution and long-term survival rate of recent community entrants are not public.

### 2. Lead generation & business intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Google Maps Scraper has about **34K monthly active users** and 583K total users with paid per-result pricing. Lead generation is a prominent Store category and paid enrichment is embedded directly in high-volume products. |
| Opportunity density | **3** | Medium | Demand is enormous, but effective supply is also broad across Maps, LinkedIn, social profiles, email enrichment and business directories. Strong usage exists beyond one product, but no complete sales distribution is public. |
| New-entrant attainability | **4** | High | A community Google Maps Business Leads product marked `Rising star` has about **193 monthly active users** and 2K total users despite competing with a 34K-MAU incumbent. This is direct recent evidence that differentiated entrants can attract demand. |
| Revenue potential | **5** | High | Paid lead products commonly charge per thousand records or enrichment events, and observed usage levels support a plausible path to the target with a small fraction of area demand. |
| Competitive pressure | **2** | High | There are strong incumbents, many overlapping products and price competition. Differentiation through enrichment, vertical focus, coverage or workflow value is possible but generic business-list extraction is crowded. |
| Production leverage | **5** | High | Extraction, enrichment, validation, deduplication and source-specific variants are highly automatable and reward reusable software systems. |
| Operating burden | **2** | High | Lead products frequently depend on volatile external sources, websites and enrichment endpoints. Apify removes hosting/billing burden but source reliability and data quality require continuing maintenance. |

- **Trend:** Growing
- **Overall confidence:** High
- **Principal gap:** precise paid revenue distribution across the long tail of lead-generation Actors.

### 3. Advertising & marketing intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Apify's Facebook Ads Library Scraper has about **5.4K monthly active users**, 34K total users and paid pricing from $3.40/1,000 ads. A community Google Ads Transparency product has about **400 monthly active users** and 738 total users. |
| Opportunity density | **3** | Medium | Significant demand is visible across Meta, Google and TikTok ad data, but Store results also show numerous competing Google Ads products and a very strong official Meta incumbent. Demand/supply distribution by ad source is not fully observable. |
| New-entrant attainability | **4** | High | The Google Ads Transparency `Rising star` demonstrates strong community entrant traction at about 400 MAU, while related Google Ads community products also show hundreds or thousands of total users. |
| Revenue potential | **5** | High | Current products charge roughly $2–$3.40 per 1,000 ad records before add-ons, and observed MAU supports material paid usage. The project's target is plausible without incumbent-scale adoption. |
| Competitive pressure | **2** | High | Major ad libraries have several strong competitors, including official Apify products. Source-specific differentiation and monitoring features create room, but generic Meta/Google clones face substantial pressure. |
| Production leverage | **5** | High | Shared extraction, monitoring, change detection, creative normalization and cross-source schemas are strongly software-leveraged. |
| Operating burden | **2** | High | Advertising-source interfaces change and large-scale extraction can require proxies and maintenance. Monitoring products also create continuing reliability expectations. |

- **Trend:** Growing
- **Overall confidence:** High
- **Principal gap:** seller-level revenue is private and current demand outside the major Meta/Google sources is less visible.

### 4. E-commerce & product intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **4** | High | Apify's Amazon Product Scraper has about **1.9K monthly active users**, 22K total users and explicit pricing from $3/1,000 results; the Store also features a 14K-user general E-commerce Scraping Tool. |
| Opportunity density | **2** | Medium | Major ecommerce sources have many competing products. Demand is real but appears concentrated in established target/platform products, and catalogue duplication is high. |
| New-entrant attainability | **2** | Medium | Recent Amazon products provide weak entrant evidence: examples published within the last six months currently show zero or only a handful of monthly users, while established products retain much larger adoption. |
| Revenue potential | **4** | Medium | Pricing and incumbent usage support the annual target, but a new entrant must first overcome concentrated incumbent adoption; seller revenue distribution is not public. |
| Competitive pressure | **2** | High | Amazon and other major ecommerce targets are mature, crowded and price-sensitive, with strong incumbent products and numerous near-substitutes. |
| Production leverage | **5** | High | Shared scraping infrastructure, catalogue normalization, product matching, monitoring and source variants are highly automatable. |
| Operating burden | **2** | High | Retail sites change frequently, deploy anti-bot controls and require ongoing data-quality and extraction maintenance. |

- **Trend:** Stable / Growing
- **Overall confidence:** Medium-High
- **Principal gap:** opportunity density outside the largest platforms is not well quantified by public data.

### 5. Search & SEO intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Apify's Google Search Results Scraper has about **15K monthly active users**, 172K+ total users and paid pricing from $1.80/1,000 SERP pages. |
| Opportunity density | **3** | Medium | The near-complete Store snapshot identified SEO Tools among the stronger demand-relative-to-supply categories, but Google/search keywords also appear across many Actors and incumbent demand is concentrated. |
| New-entrant attainability | **3** | Medium | A community Google Search product shows about **80 monthly active users** and 302 total users, while other newer alternatives remain much smaller. Entrant success is possible but inconsistent. |
| Revenue potential | **5** | High | Search data has clear per-result pricing and very high ongoing usage. A modest share of this area could plausibly reach the target revenue. |
| Competitive pressure | **2** | High | The official Google Search Actor is mature and heavily used; numerous community alternatives compete on price, field coverage and specialized search surfaces. |
| Production leverage | **5** | High | Search extraction, localization, result normalization, monitoring and variants are strongly software-leveraged. |
| Operating burden | **2** | High | Search surfaces and anti-bot behaviour change continually. The official Actor's active issue queue shows ongoing reliability and output-maintenance requirements. |

- **Trend:** Stable / Growing
- **Overall confidence:** High
- **Principal gap:** category-level revenue concentration is not public.

### 6. Recruitment & jobs intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Curious Coder's LinkedIn Jobs Scraper has about **15K monthly active users**, 143K total users and pricing from $1/1,000 results. Multiple job-board and ATS products also show meaningful adoption. |
| Opportunity density | **4** | Medium | The near-complete Store snapshot identified Jobs as one of the native categories where recent demand was relatively strong versus supply. The area spans LinkedIn, national job boards and ATS/career-site aggregation rather than one source only. |
| New-entrant attainability | **4** | High | A newer community LinkedIn Jobs Actor currently has about **96 monthly active users** and 548 total users; its comparable-products list shows several other newer job/ATS Actors with meaningful user counts. Recent entrants also include failures, so attainability is not automatic. |
| Revenue potential | **4** | High | Paid job records commonly sell on a per-result basis and incumbent usage is substantial. The target appears plausible, although typical paid usage per active user is not public. |
| Competitive pressure | **3** | Medium | LinkedIn is crowded, but the broader area contains many job boards, ATS systems and normalized multi-source use cases. Competition is material without being uniformly incumbent-dominated across every source. |
| Production leverage | **5** | High | Shared HTTP extraction, ATS adapters, schema normalization, deduplication, salary parsing and source variants are highly automatable. |
| Operating burden | **3** | Medium | Some job sources expose stable public/guest APIs or structured ATS endpoints, reducing maintenance compared with browser-heavy social/ecommerce scraping; individual sources can still change or block extraction. |

- **Trend:** Growing
- **Overall confidence:** High
- **Principal gap:** no complete public breakdown of paid usage across job-source subsegments.

### 7. Real-estate & property intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **3** | Medium | Apify-maintained Zillow Search Scraper currently shows about **600 monthly active users** and 7.6K total users with paid per-result pricing. This proves real demand, but it is far below the strongest Store areas. |
| Opportunity density | **3** | Low | Several Zillow competitors exist, but observed community usage is generally small. Low supply does not by itself imply attractive density because total demand is also moderate and distribution by source/geography is unknown. |
| New-entrant attainability | **2** | Medium | Community Zillow products published in recent months typically show zero to single-digit monthly users; one ten-month product has about 8 MAU. Current evidence therefore favours established incumbents. |
| Revenue potential | **3** | Medium | Paid prices around $0.60–$1.70/1,000 listings and an established 600-MAU product make the annual target possible, but public evidence does not show many community products reaching meaningful scale. |
| Competitive pressure | **3** | Medium | There are several direct substitutes and a strong Apify-maintained incumbent, but the area is fragmented across countries, portals and property types. |
| Production leverage | **5** | High | Property sources can share extraction, normalization, geocoding and monitoring infrastructure, enabling efficient variants. |
| Operating burden | **2** | High | Property portals are live external systems with anti-bot controls and changing feeds; reliable commercial products require ongoing source maintenance. |

- **Trend:** Stable / Unclear
- **Overall confidence:** Medium
- **Principal gap:** public evidence is heavily Zillow-centric and does not establish global area economics.

### 8. Travel & hospitality intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **4** | High | Apify-maintained Booking Scraper has about **737 monthly active users**, 8.8K total users and paid pricing from $2/1,000 results; several related Booking and hotel-price products also have hundreds or thousands of users. |
| Opportunity density | **3** | Medium | Demand exists across accommodation, hotel pricing and location/travel data, but Booking and Google-related sources have multiple established alternatives. No complete category sales distribution is public. |
| New-entrant attainability | **2** | Medium | A Booking.com product published days ago has only one MAU, while established products dominate. Some community alternatives have accumulated hundreds of total users, but strong recent entrant evidence is limited. |
| Revenue potential | **4** | Medium | Paid incumbent pricing and hundreds of active users make the target plausible, but the usage distribution and economics of newer community products remain opaque. |
| Competitive pressure | **3** | Medium | Major travel sources have established Actors, but the market spans many booking sites, regional platforms, price/review surfaces and specialist hospitality datasets. |
| Production leverage | **5** | High | Shared extraction, normalization, date/price handling, monitoring and regional/source adapters support substantial software leverage. |
| Operating burden | **2** | High | Booking/travel sites are dynamic, date-sensitive and often anti-bot protected; accurate pricing and availability require continual reliability work. |

- **Trend:** Stable / Growing
- **Overall confidence:** Medium-High
- **Principal gap:** area-wide demand beyond major Booking/Maps products is not fully measurable.

### 9. News & media intelligence

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **3** | Medium | A current community Google News Scraper has about **94 monthly active users** and 431 total users at $1.20/1,000 articles; another has 18 MAU at $0.90/1,000. This establishes paid demand, but at a modest scale. |
| Opportunity density | **4** | Medium | Meaningful recent usage is visible on multiple community products without an overwhelmingly dominant official incumbent. The apparent demand/supply balance is comparatively favourable, though complete category data is unavailable. |
| New-entrant attainability | **4** | High | The 94-MAU product is a recent community entrant and another newer competitor has 18 MAU, providing direct evidence that new products can gain usage. |
| Revenue potential | **3** | Medium | Per-article pricing and tens to roughly one hundred MAU can support recurring revenue, but the public data is insufficient to show that a typical successful product reaches the annual target. |
| Competitive pressure | **4** | Medium | Competition exists, but products can differentiate on coverage, direct URLs, countries/languages, history, monitoring and output quality. Current evidence shows room for several community products. |
| Production leverage | **5** | High | RSS/HTTP extraction, normalization, monitoring, language/source variants and downstream enrichment are highly automatable. |
| Operating burden | **4** | Medium | Some successful products use lightweight RSS/HTTP rather than browser automation, materially reducing runtime and anti-bot maintenance. Coverage/redirect behaviour still needs periodic upkeep. |

- **Trend:** Growing
- **Overall confidence:** Medium-High
- **Principal gap:** seller revenue and broader category demand are not directly published.

### 10. AI / LLM data preparation

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Apify's Website Content Crawler has about **9.6K monthly active users** and 151K total users; AI Web Scraper has about **259 MAU** at $20/1,000 page extractions. The area has substantial current usage tied directly to LLM/RAG workflows. |
| Opportunity density | **3** | Medium | Demand is strong, but it is heavily concentrated in Apify-maintained products and many Actors now use AI-related tags. Exact demand outside the leading tools is unclear. |
| New-entrant attainability | **2** | Medium | A community AI/RAG-oriented generic scraper observed in the sample has only about **2 MAU**, while dominant Apify-maintained tools retain much larger adoption. There are isolated community AI-agent products with users, but they often serve different buyer needs. |
| Revenue potential | **4** | Medium | High usage and explicit AI-extraction pricing establish commercial value, but the strongest usage belongs to platform-maintained products and community seller outcomes are not transparent. |
| Competitive pressure | **2** | High | The area competes against mature Apify tools, generic crawlers and numerous external/open-source RAG extraction tools. Differentiation must be more than attaching an AI label. |
| Production leverage | **5** | High | Crawling, cleaning, chunking, extraction, schema generation and LLM-assisted transformation are intrinsically software- and AI-leveraged. |
| Operating burden | **3** | Medium | Generic crawling spreads maintenance across arbitrary websites and AI extraction adds model-cost/quality failure modes, but it avoids dependence on one volatile consumer platform. |

- **Trend:** Growing
- **Overall confidence:** Medium-High
- **Principal gap:** community-provider paid revenue and entrant survival are weakly observable.

### 11. General web extraction & developer utilities

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **4** | High | Apify's Web Scraper has about **1.3K monthly active users**, 124K total users and 97 reviews. Generic extraction infrastructure is clearly used at scale. |
| Opportunity density | **2** | Medium | Demand is substantial but the area contains strong official tools, open-source substitutes and many generic scrapers. Effective supply is high and product differentiation is difficult. |
| New-entrant attainability | **2** | Medium | A community generic web/AI scraper sampled during the pilot has about **2 MAU** despite paid positioning. Public evidence for generic community entrants approaching official-tool adoption is weak. |
| Revenue potential | **3** | Medium | The market is large, but many leading tools are Apify-maintained and priced as platform usage rather than high-margin community products. A community seller can charge, but evidence of target-level outcomes is limited. |
| Competitive pressure | **1** | High | Buyers can choose mature Apify tools, Crawlee/open-source software and numerous third-party scrapers. Generic functionality is highly substitutable. |
| Production leverage | **5** | High | The product itself is reusable software infrastructure and can be developed/tested/iterated with very high automation leverage. |
| Operating burden | **3** | Medium | General-purpose tools avoid one-source fragility but must work across many site patterns, browsers and anti-bot conditions, creating broad compatibility/support work. |

- **Trend:** Stable / Growing
- **Overall confidence:** Medium-High
- **Principal gap:** community-provider monetisation is much less visible than total product usage.

### 12. Web / browser workflow automation

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **2** | Medium | Dedicated browser/agent automation products show much less current Store adoption than data products. Browser Use Apify, for example, currently has about **2 monthly active users** and 382 total users. |
| Opportunity density | **3** | Low | Effective competition appears lower than in major scraping categories, but demand is also weak and the native `Automation`/`Agents` tags overlap heavily with products whose actual buyer value belongs in other areas. |
| New-entrant attainability | **2** | Medium | Current dedicated workflow/browser products do not show strong recent usage growth in the observed sample. Stronger `Agents` products generally solve a more specific lead/news/data problem and are assessed in those areas instead. |
| Revenue potential | **2** | Low | Paid usage is technically possible, but current Store adoption provides little evidence that a generic browser-automation product can reliably achieve the annual target. |
| Competitive pressure | **3** | Low | Direct Store competition is not obviously overwhelming, but off-channel frameworks and open-source browser/agent tools are strong substitutes. The balance is difficult to quantify. |
| Production leverage | **5** | High | Agent orchestration, browser control, reusable workflows and test automation are intrinsically software-leveraged. |
| Operating burden | **2** | High | Browser automation is reliability-intensive; page changes, authentication, model behaviour, third-party APIs and long-running workflows create significant maintenance/support expectations. |

- **Trend:** Growing
- **Overall confidence:** Medium-Low
- **Principal gap:** native tags do not cleanly isolate generic workflow demand from domain-specific agent products.

### 13. Data integrations & connectors

| Metric | Score | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **1** | High | Store examples show very low current usage: MongoDB Import has **0 MAU** and 36 total users; a paid Google Drive connector at $20/month + usage has **1 MAU** and 51 total users. |
| Opportunity density | **2** | Medium | Store supply is not enormous, but Apify now provides a broad native integration ecosystem and built-in API/MCP/webhook connections, which satisfy much of the same need. Low competition therefore does not translate into attractive unmet demand. |
| New-entrant attainability | **1** | Medium | Current community integration examples show little traction, and native/built-in integrations are highly visible substitutes. |
| Revenue potential | **2** | Medium | Subscription pricing exists, but observed active-user counts are too low to support strong confidence in target-level annual revenue for a typical connector. |
| Competitive pressure | **2** | Medium | The main competition is not only other Store Actors but Apify's built-in integrations, API, webhooks, MCP and external automation platforms. These are strong substitutes. |
| Production leverage | **5** | High | Connectors are highly reusable software and can share authentication, mapping, retry and transport infrastructure. |
| Operating burden | **4** | Medium | Compared with scraper products, stable third-party APIs can make connectors relatively maintainable; authentication/API-version changes still require periodic work. |

- **Trend:** Stable
- **Overall confidence:** Medium
- **Principal gap:** there may be niche connector demand not visible in the sampled generic integrations, but current broad evidence is weak.

---

## Phase 2 Pilot Observations

The pilot supports the Phase 2 structure without requiring a change to the methodology at this point.

1. **The repeated framework works at the smaller scale.** The same seven metrics materially differentiate opportunity areas even though the parent channel is highly attractive overall. In particular, strong Apify-level demand does not prevent integrations or generic browser automation from scoring poorly on area-level demand.
2. **Taxonomy normalization is necessary but bounded.** Apify's native categories are useful discovery sources, but tags such as `Agents`, `MCP servers` and `Open source` cannot be copied mechanically into an opportunity-area taxonomy because they describe product form or technology rather than a coherent buyer market.
3. **The public Store data is unusually strong for Phase 2.** Recent active-user counts, pricing, ratings, product age, developer identity and comparable listings provide direct or useful proxy evidence for most metrics.
4. **Opportunity density remains the lowest-confidence metric.** Even with a near-complete catalogue, actual paid revenue distribution is private and native categories overlap. Density therefore relies on recent-user distribution, supply counts, incumbent concentration and recent entrant behaviour rather than direct sales-per-listing data.
5. **Recent entrants are essential evidence.** The assessment changes materially when newer products are examined alongside incumbents: recent traction is strong in jobs, lead generation, advertising and news, but weak in ecommerce, real estate, generic developer tools and integrations.
6. **No specific product opportunities are inferred here.** This document stops at the methodology's current boundary: a comparable assessment of opportunity areas.

## Phase 2 Sources

### Discovery and market structure

1. Apify Store — https://apify.com/store
2. Apify Store documentation — https://docs.apify.com/console/store
3. Apify Store API — https://docs.apify.com/api/v2/store-get
4. Apify Store API overview — https://docs.apify.com/api/v2/store
5. Apify integrations — https://apify.com/integrations
6. July 2026 near-complete Store snapshot and methodology discussion — https://www.reddit.com/r/apify/comments/1v5ltmz/i_analyzed_54025_public_apify_actors_here_is_what/

### Representative area evidence

7. Instagram Scraper — https://apify.com/apify/instagram-scraper
8. Instagram Related Profiles Scraper — https://apify.com/afanasenko/instagram-related-profiles-scraper
9. Google Maps Scraper — https://apify.com/compass/crawler-google-places
10. Google Maps Business Leads Scraper — https://apify.com/lurkapi/google-maps-business-leads-scraper
11. Facebook Ads Library Scraper — https://apify.com/apify/facebook-ads-scraper
12. Google Ads Transparency Center Scraper — https://apify.com/scrapesage/google-ads-transparency-scraper
13. Amazon Product Scraper — https://apify.com/junglee/amazon-crawler
14. Recent Amazon Product Scraper example — https://apify.com/scraper-engine/amazon-product-scraper
15. Google Search Results Scraper — https://apify.com/apify/google-search-scraper
16. Community Google Search Scraper — https://apify.com/api-ninja/google-search-scraper
17. LinkedIn Jobs Scraper — https://apify.com/curious_coder/linkedin-jobs-scraper
18. Newer LinkedIn Jobs Scraper — https://apify.com/automation-lab/linkedin-jobs-scraper
19. Zillow Search Scraper — https://apify.com/maxcopell/zillow-scraper
20. Community Zillow Listings Scraper — https://apify.com/parseforge/zillow-scraper
21. Booking Scraper — https://apify.com/voyager/booking-scraper
22. Recent Booking.com Scraper example — https://apify.com/datascrapers/booking-com-scraper
23. Google News Scraper — https://apify.com/automation-lab/google-news-scraper
24. Alternative Google News Scraper — https://apify.com/solidcode/google-news-scraper
25. Website Content Crawler — https://apify.com/apify/website-content-crawler
26. AI Web Scraper — https://apify.com/apify/ai-web-scraper
27. Community AI-oriented Web Scraper — https://apify.com/datascoutapi/web-scraper
28. Web Scraper — https://apify.com/apify/web-scraper
29. Browser Use Apify — https://apify.com/lexis-solutions/browser-use-apify
30. MongoDB Import — https://apify.com/drobnikj/mongodb-import
31. Google Drive connector — https://apify.com/onidivo/google-drive

## Sources for Channel Assessment

### First-party / primary

1. Apify — Actor developer/creator page: https://apify.com/partners/actor-developers
2. Apify Help — Make money publishing your Actors on Apify Store: https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store
3. Apify Docs — Monetize Actors: https://docs.apify.com/actors/publishing/monetize
4. Apify Docs — How Actor monetization works: https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works
5. Apify Docs — Actor pricing and costs: https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
6. Apify — Why Apify is standardizing Actor pricing, April 2026: https://blog.apify.com/standardizing-actor-pricing/
7. Apify — How I built 98 Actors on Apify Store in 6 months, July 2026: https://blog.apify.com/building-98-actors-on-apify-store/
8. Apify — Creator Plan: https://apify.com/pricing/creator-plan
9. Apify — How to monetize your API, November 2025: https://blog.apify.com/how-to-monetize-api/
