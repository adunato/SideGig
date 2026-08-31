# Apify Store

- **Channel class:** API and Microservice Marketplaces
- **Channel URL:** https://apify.com/store
- **Assessment status:** Assessed
- **Assessment date:** 2026-08-31
- **Opportunity-area assessment:** Completed as Phase 2 methodology pilot on 2026-08-31

## 1. Channel Overview

Apify Store is a marketplace for hosted "Actors": server-side programs that perform web scraping, data extraction, automation, AI-assisted processing and other API-like tasks. Developers publish Actors to Apify's managed runtime and can charge users per event or usage while Apify handles execution infrastructure, marketplace distribution, billing and payouts.

The channel is therefore both a marketplace and a managed execution environment. Sellers do not need to build a separate SaaS front end, payment system or deployment platform, but they remain responsible for the quality and maintenance of the Actor itself and for any source-specific reliability issues.

## 2. Channel Assessment

*Methodology mapping: Phase 1, Step 5 — Assess Channels.*

Assessment framework: [../channel-assessment-framework.md](../channel-assessment-framework.md)

A higher score always means a more attractive condition for this research objective.

| Metric | Score (1–5) | Confidence | Evidence and rationale |
|---|---:|---|---|
| Paying demand | **5** | High | Apify states that it pays about **$1.5M per month** to creators, has **3,900 community developers** and more than **65,000 tools and automations**. It also reports independent creators above $1,000/month and top creators above $10,000 MRR. This is unusually strong direct evidence of real paid demand. |
| Opportunity density | **4** | Medium | Aggregate creator payouts are material relative to the seller base, and recent entrants can attract users in specialised areas. However, earnings are certainly concentrated, the catalogue is very large, and Apify does not publish a full revenue distribution. |
| New-entrant attainability | **4** | High | Publishing is open to community developers and there is current entrant evidence. A July 2026 case study describes a developer who started in November 2025 and reached 98 public Actors, 2,500 total users and 855 monthly active users within six months. |
| Revenue potential | **5** | High | The project target of roughly £2,000–£5,000/year is well below earnings Apify publicly reports for many successful creators. Pay-per-event pricing also allows monetisation at granular units of customer value. |
| Competitive pressure | **3** | Medium | The Store contains more than 65,000 tools and popular targets are crowded, but the marketplace spans many narrow sources and use cases. Recent evidence shows that differentiated or niche Actors can still acquire meaningful usage. |
| Production leverage | **5** | High | Actors are code products and strongly reward reusable software, automated testing, rapid iteration, shared infrastructure and systematic creation of specialised variants. |
| Operating burden | **4** | High | Apify handles execution infrastructure, scaling, billing, distribution and payouts. Sellers still need to maintain reliability, manage source changes and respond to issues, but the managed runtime removes much of the burden present in self-hosted API marketplaces. |

**Trend:** Growing  
**Overall evidence confidence:** High

### Overall channel conclusion

Apify is a commercially active marketplace with unusually strong evidence of independent-developer earnings and a route to market that removes much of the infrastructure and billing burden normally associated with APIs. Its principal weakness is not lack of demand but the uneven distribution of that demand: major categories contain powerful incumbents, and some technically easy-looking areas have little meaningful buyer activity.

The channel-level assessment therefore supports further analysis inside the marketplace rather than treating Apify as uniformly attractive across all product types.

## 3. Opportunity Landscape

*Methodology mapping: Phase 2, Steps 6–7 — identify discovery sources and discover opportunity areas.*

### 3.1 Discovery basis

The internal opportunity landscape was established before area-level scoring using sources chosen for broad Store coverage:

- **Apify public Store and native categories** for the visible product landscape, category labels and product examples.
- **Apify Store API and API documentation** for structured product statistics, including total users, recent user windows, pricing models and categories.
- **Category and collection pages** as a coverage cross-check for the way Apify groups products and buyer use cases.
- **Individual Actor pages** for current usage, pricing, ratings, recency, maintenance signals and comparable products.
- **A near-complete July 2026 third-party Store snapshot based on the public API** as a secondary cross-check on category-level supply and recent demand. It is not treated as primary evidence because Apify categories overlap and can mix product forms with buyer markets.

These sources were used to map the commercial landscape first. Individual products and seller stories were then used as evidence during assessment rather than to define the taxonomy by themselves.

### 3.2 Opportunity-area taxonomy

Apify's native taxonomy mixes buyer markets with technologies and product forms. The analytical taxonomy therefore groups products primarily by the buyer need being served.

| Opportunity area | Buyer need / commercial use case | Scope and boundaries |
|---|---|---|
| **Social media & video intelligence** | Structured profiles, posts, comments, creators, engagement and video-platform data for research and monitoring. | Includes social/video data; advertising-specific use cases are separated below. |
| **Lead generation & business intelligence** | Organisation, person, contact, location and enrichment data for prospecting and market research. | Excludes job-market data and dedicated advertising intelligence. |
| **Advertising & marketing intelligence** | Competitor ads, creatives, advertisers, campaigns and advertising-market activity. | Separated from generic social data and generic lead generation. |
| **E-commerce & product intelligence** | Product, catalogue, seller, price, review and marketplace data for monitoring and competitive analysis. | Excludes ecommerce-company lead lists and ad creatives. |
| **Search & SEO intelligence** | SERPs, rankings, keywords, search-result data and SEO-oriented website intelligence. | Excludes general crawling without a search/SEO buyer need. |
| **Recruitment & jobs intelligence** | Job listings, employers, salaries, skills and labour-market data. | Includes job-board and ATS data where the purchased value is market/recruitment information. |
| **Real-estate & property intelligence** | Property listings, prices, rentals, agents and housing-market data. | Groups source-specific products serving property-market use cases. |
| **Travel & hospitality intelligence** | Accommodation, booking, hotel, flight, review and travel-price data. | General local-business data is included only where the travel/hospitality use case is explicit. |
| **News & media intelligence** | News/article feeds, monitoring and media datasets for research and downstream analysis. | Excludes generic website extraction without a news/media use case. |
| **AI / LLM data preparation** | Crawl, clean and structure web content for LLM, RAG, vector-database and model-data workflows. | AI products serving another buyer need remain in that commercial area. |
| **General web extraction & developer utilities** | Generic crawling, scraping and extraction infrastructure for developers. | Domain-specific extraction products are allocated to their buyer area. |
| **Web / browser workflow automation** | Multi-step browser or web task automation where task completion is the primary purchased value. | Domain-specific agents remain in the relevant buyer area. |
| **Data integrations & connectors** | Move Apify data into or out of external systems and connect Actors with other platforms. | Native Apify integrations and APIs are relevant substitutes. |

### Taxonomy notes

`Agents`, `MCP servers` and `Open source` are treated as implementation, interface or licensing forms rather than independent opportunity areas. `Marketing` is treated as a cross-cutting buyer function and its products are allocated to advertising intelligence, lead generation, SEO, social intelligence or another relevant commercial area. `Other` is not retained as a standalone market because it is commercially heterogeneous.

## 4. Opportunity-Area Assessment

*Methodology mapping: Phase 2, Step 8 — Assess Opportunity Areas.*

The same seven metrics used for channel assessment are applied at the narrower opportunity-area level. `H`, `M` and `L` indicate High, Medium and Low confidence in the individual score.

### 4.1 Comparison

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

### 4.2 Assessment by opportunity area

#### Social media & video intelligence

**Assessment:** Demand 5 (H) · Density 3 (M) · Entrant attainability 4 (M) · Revenue 5 (H) · Competition 1 (H) · Production leverage 5 (H) · Operating burden 1 (H)  
**Trend:** Growing · **Overall confidence:** High

Demand is exceptionally strong. Apify's Instagram Scraper has roughly 41K monthly active users and 380K total users, and TikTok and YouTube products are also among the largest products in the Store. Paid per-result pricing is established, so the revenue pool is clearly material.

The weakness is market structure. Social Media is one of Apify's highest-demand categories, but it also contains thousands of Actors and extremely strong incumbents. Differentiated community products can gain traction—for example, a related-profiles product has reached meaningful monthly usage—but generic clones commonly remain near zero. Operating burden is also high because major social platforms change frequently and aggressively resist automation. The area therefore combines excellent demand with some of the worst competitive and maintenance conditions in the Store.

#### Lead generation & business intelligence

**Assessment:** Demand 5 (H) · Density 3 (M) · Entrant attainability 4 (H) · Revenue 5 (H) · Competition 2 (H) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Growing · **Overall confidence:** High

Lead generation is another major paid market. Google Maps Scraper alone has roughly 34K monthly active users and 583K total users, while paid enrichment and contact/business data appear across many Store products. Pricing per record or enrichment event makes the project's annual revenue target plausible at a small fraction of incumbent-scale usage.

Competition is heavy across Maps, LinkedIn, directories, email enrichment and overlapping social sources, but entrant evidence is stronger than in several other large markets. A community Google Maps Business Leads product has reached roughly 193 monthly active users and 2K total users despite competing with a very large incumbent. The area remains maintenance-heavy because data quality and source reliability require ongoing work, but differentiated entrants demonstrably can acquire demand.

#### Advertising & marketing intelligence

**Assessment:** Demand 5 (H) · Density 3 (M) · Entrant attainability 4 (H) · Revenue 5 (H) · Competition 2 (H) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Growing · **Overall confidence:** High

Advertising intelligence shows substantial paid usage across major sources. Apify's Facebook Ads Library Scraper has roughly 5.4K monthly active users and 34K total users, while a community Google Ads Transparency product has reached about 400 monthly active users. Current products charge per thousand ads or records, establishing a credible revenue model.

The area is not uniformly open: major Meta, Google and TikTok data surfaces already have strong competitors and multiple close substitutes. However, recent community traction is stronger than in ecommerce or real estate, which supports a relatively high entrant-attainability score. Source changes, monitoring expectations and extraction reliability keep operating burden material.

#### E-commerce & product intelligence

**Assessment:** Demand 4 (H) · Density 2 (M) · Entrant attainability 2 (M) · Revenue 4 (M) · Competition 2 (H) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Stable / Growing · **Overall confidence:** Medium-High

Paid demand is established: Apify's Amazon Product Scraper has roughly 1.9K monthly active users and 22K total users, and larger general ecommerce tools also have substantial adoption. Price, catalogue, seller and review data are all commercially useful and technically well suited to automated production.

The difficulty is entry. Major ecommerce sources contain many competing products and current recent-entrant evidence is weak; several newer Amazon products have zero or only a handful of monthly users while established products retain most visible adoption. Retail sites are also dynamic and anti-bot heavy. The area therefore has credible revenue but relatively poor density, entrant evidence and operating characteristics.

#### Search & SEO intelligence

**Assessment:** Demand 5 (H) · Density 3 (M) · Entrant attainability 3 (M) · Revenue 5 (H) · Competition 2 (H) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Stable / Growing · **Overall confidence:** High

Search data is a large recurring market. Apify's Google Search Results Scraper has roughly 15K monthly active users and more than 172K total users with explicit per-result pricing. The scale of ongoing usage makes the annual target plausible with a modest share of area demand.

Competition remains substantial because the official Google Search Actor is mature and heavily used and multiple community products compete on price, localisation and coverage. A community alternative with roughly 80 monthly active users shows that entrants can attract some usage, but the evidence is less convincing than in jobs or advertising. Search changes and anti-bot behaviour also create continuing maintenance requirements.

#### Recruitment & jobs intelligence

**Assessment:** Demand 5 (H) · Density 4 (M) · Entrant attainability 4 (H) · Revenue 4 (H) · Competition 3 (M) · Production leverage 5 (H) · Operating burden 3 (M)  
**Trend:** Growing · **Overall confidence:** High

Jobs combines strong paid demand with comparatively favourable market structure. A major LinkedIn Jobs Scraper has about 15K monthly active users and 143K total users, and other job-board and ATS products also show meaningful adoption. The wider area spans many sources rather than depending entirely on one dominant platform.

Recent entrant evidence is relatively strong. A newer community LinkedIn Jobs Actor has reached roughly 96 monthly active users and 548 total users, and several newer job/ATS products show material usage alongside failures. Competition is still meaningful, particularly on LinkedIn, but source diversity and structured ATS endpoints reduce both incumbent dominance and, in some cases, maintenance burden. Among the large-demand areas, jobs has one of the most balanced profiles.

#### Real-estate & property intelligence

**Assessment:** Demand 3 (M) · Density 3 (L) · Entrant attainability 2 (M) · Revenue 3 (M) · Competition 3 (M) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Stable / Unclear · **Overall confidence:** Medium

There is clear but more modest paid demand. The Apify-maintained Zillow Search Scraper has roughly 600 monthly active users and 7.6K total users, which demonstrates a functioning paid market but at a much smaller scale than social, search, lead generation or jobs.

Recent community Zillow products generally show zero to single-digit monthly usage, so entrant evidence is weak. The market is fragmented across countries and property portals, which prevents competition from being uniformly severe, but that same fragmentation makes area-wide demand difficult to quantify. Property portals also bring significant scraping and anti-bot maintenance. Current evidence therefore supports a middling rather than strongly attractive assessment.

#### Travel & hospitality intelligence

**Assessment:** Demand 4 (H) · Density 3 (M) · Entrant attainability 2 (M) · Revenue 4 (M) · Competition 3 (M) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Stable / Growing · **Overall confidence:** Medium-High

Accommodation and travel data show real paid demand. Apify's Booking Scraper has roughly 737 monthly active users and 8.8K total users, and other hotel and booking products have accumulated meaningful usage. Pricing, reviews and availability data all have recurring commercial value.

The market is less concentrated than social media, but current evidence for recent entrants is limited and major Booking/Google-related sources already have established products. Date-sensitive pricing, availability, dynamic pages and anti-bot controls create a substantial ongoing reliability burden. The area is commercially credible but not especially easy to enter or operate.

#### News & media intelligence

**Assessment:** Demand 3 (M) · Density 4 (M) · Entrant attainability 4 (H) · Revenue 3 (M) · Competition 4 (M) · Production leverage 5 (H) · Operating burden 4 (M)  
**Trend:** Growing · **Overall confidence:** Medium-High

Absolute demand is lower than in the largest data markets, but the competitive structure is more favourable. A current community Google News Scraper has roughly 94 monthly active users and 431 total users, while another newer competitor has about 18 monthly active users. There is no overwhelmingly dominant official product absorbing nearly all visible demand.

The area also has comparatively favourable operating characteristics because some useful products can rely on RSS or lightweight HTTP extraction rather than browser-heavy scraping. Competition can occur on coverage, language, geography, history and monitoring quality. Revenue evidence is less certain because usage volumes are smaller, but the combination of entrant attainability, manageable competition and lower maintenance produces a balanced profile.

#### AI / LLM data preparation

**Assessment:** Demand 5 (H) · Density 3 (M) · Entrant attainability 2 (M) · Revenue 4 (M) · Competition 2 (H) · Production leverage 5 (H) · Operating burden 3 (M)  
**Trend:** Growing · **Overall confidence:** Medium-High

The buyer need is clearly established. Apify's Website Content Crawler has roughly 9.6K monthly active users and 151K total users, while AI Web Scraper has around 259 monthly active users with explicit paid extraction pricing. LLM/RAG workflows therefore generate real marketplace usage rather than merely speculative interest.

The weakness is entrant structure. Demand is concentrated in mature Apify-maintained tools, and sampled community generic AI/RAG scrapers have very low current usage. The area also competes with generic crawlers and abundant off-platform open-source tools. Production leverage is exceptionally high, but the evidence does not currently show that generic community entrants capture demand easily.

#### General web extraction & developer utilities

**Assessment:** Demand 4 (H) · Density 2 (M) · Entrant attainability 2 (M) · Revenue 3 (M) · Competition 1 (H) · Production leverage 5 (H) · Operating burden 3 (M)  
**Trend:** Stable / Growing · **Overall confidence:** Medium-High

Generic extraction infrastructure is heavily used: Apify's Web Scraper has roughly 1.3K monthly active users and 124K total users. The problem is that buyers already have mature Apify tools, Crawlee and other open-source alternatives, plus numerous community scrapers.

This makes generic functionality highly substitutable. A sampled community generic web/AI scraper has only about two monthly active users, and public evidence for community tools approaching official-product adoption is weak. General-purpose tools avoid dependence on one source but must support many site patterns and browser behaviours, which creates broad compatibility and support work. The area has strong technical leverage but poor market differentiation.

#### Web / browser workflow automation

**Assessment:** Demand 2 (M) · Density 3 (L) · Entrant attainability 2 (M) · Revenue 2 (L) · Competition 3 (L) · Production leverage 5 (H) · Operating burden 2 (H)  
**Trend:** Growing · **Overall confidence:** Medium-Low

Dedicated generic browser/agent automation currently has much weaker Store adoption than data products. Browser Use Apify, for example, has only around two monthly active users despite several hundred total users. Native `Automation` and `Agents` tags also overlap with products whose real commercial value belongs in lead generation, news, jobs or another specific buyer area.

Effective competition is therefore hard to quantify: Store supply is not obviously overwhelming, but off-channel browser frameworks and open-source agent tools are strong substitutes. Browser automation also carries significant maintenance exposure from page changes, authentication, model behaviour and third-party dependencies. The area is technically attractive but commercially weak on current evidence.

#### Data integrations & connectors

**Assessment:** Demand 1 (H) · Density 2 (M) · Entrant attainability 1 (M) · Revenue 2 (M) · Competition 2 (M) · Production leverage 5 (H) · Operating burden 4 (M)  
**Trend:** Stable · **Overall confidence:** Medium

Store demand for standalone connectors is currently weak. MongoDB Import has zero monthly active users and 36 total users, while a paid Google Drive connector has around one monthly active user and 51 total users. Subscription pricing is possible, but current adoption does not support a strong revenue case.

The important competitive factor is native substitution rather than sheer Store listing count. Apify already provides built-in integrations, APIs, webhooks, MCP connectivity and compatibility with external automation platforms. Connectors are relatively maintainable and highly reusable from a software perspective, but low competition does not translate into attractive opportunity density when the platform itself already satisfies much of the buyer need.

## 5. Cross-Area Findings

The area-level assessment changes the interpretation of Apify materially. Strong channel-level demand is real, but it is not evenly distributed and does not make every internal market attractive.

**Large demand often comes with severe competition and maintenance.** Social media, lead generation, advertising, ecommerce and search all show substantial usage, but the biggest sources also contain strong incumbents and volatile external targets. In those areas, demand alone is a poor proxy for entrant attractiveness.

**Recruitment and jobs has the most balanced profile among the high-demand areas.** It combines strong current usage with repeated recent-entrant traction, a broader source landscape and somewhat better operating characteristics where structured ATS or public endpoints are available.

**News and media is smaller but structurally interesting.** Its demand is more modest, yet current community products show entrant traction without an overwhelmingly dominant incumbent, and lightweight HTTP/RSS approaches can reduce operating burden substantially.

**Technical leverage is almost universal and therefore not very discriminating inside Apify.** Every area scores highly because Actors are software products. The more useful discriminators are paying demand, entrant attainability, competition and operating burden.

**Low competition is not sufficient.** Integrations and generic workflow automation illustrate this directly: competition is not extreme, but observable buyer demand is weak or satisfied by native/off-channel alternatives.

## 6. Evidence Gaps and Limitations

- **Revenue distribution is private.** Public user counts and pricing are useful demand proxies, but Actor-level seller revenue is generally unavailable.
- **Opportunity density remains the least certain metric.** Even with extensive Store data, paid demand per listing and revenue concentration are not public.
- **Native categories overlap.** Category-level counts cannot be treated as clean market segments without normalization by buyer need.
- **Recent-user counts do not equal paid customers.** They indicate active usage but not the value of each user's paid consumption.
- **Several areas are represented by a small number of dominant sources.** Real-estate evidence is especially Zillow-heavy, and travel evidence is concentrated around Booking and similar major platforms.
- **Operating burden varies within an area.** A job Actor using a stable ATS endpoint may be materially easier to maintain than one scraping a heavily protected website, even though both sit in the same opportunity area.
- **This assessment stops at the opportunity-area level.** It does not infer specific product opportunities or apply a personal-capability overlay.

## 7. Sources

### Channel and marketplace sources

1. Apify Store — https://apify.com/store
2. Apify Actor developer/creator page — https://apify.com/partners/actor-developers
3. Apify Help — Make money publishing your Actors on Apify Store — https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store
4. Apify Docs — Monetize Actors — https://docs.apify.com/actors/publishing/monetize
5. Apify Docs — How Actor monetization works — https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works
6. Apify Docs — Actor pricing and costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
7. Apify — Why Apify is standardizing Actor pricing, April 2026 — https://blog.apify.com/standardizing-actor-pricing/
8. Apify — How I built 98 Actors on Apify Store in 6 months, July 2026 — https://blog.apify.com/building-98-actors-on-apify-store/
9. Apify Creator Plan — https://apify.com/pricing/creator-plan
10. Apify — How to monetize your API, November 2025 — https://blog.apify.com/how-to-monetize-api/

### Opportunity-landscape sources

11. Apify Store documentation — https://docs.apify.com/console/store
12. Apify Store API — https://docs.apify.com/api/v2/store-get
13. Apify Store API overview — https://docs.apify.com/api/v2/store
14. Apify integrations — https://apify.com/integrations
15. July 2026 near-complete Store snapshot and methodology discussion — https://www.reddit.com/r/apify/comments/1v5ltmz/i_analyzed_54025_public_apify_actors_here_is_what/

### Representative area evidence

16. Instagram Scraper — https://apify.com/apify/instagram-scraper
17. Instagram Related Profiles Scraper — https://apify.com/afanasenko/instagram-related-profiles-scraper
18. Google Maps Scraper — https://apify.com/compass/crawler-google-places
19. Google Maps Business Leads Scraper — https://apify.com/lurkapi/google-maps-business-leads-scraper
20. Facebook Ads Library Scraper — https://apify.com/apify/facebook-ads-scraper
21. Google Ads Transparency Center Scraper — https://apify.com/scrapesage/google-ads-transparency-scraper
22. Amazon Product Scraper — https://apify.com/junglee/amazon-crawler
23. Recent Amazon Product Scraper example — https://apify.com/scraper-engine/amazon-product-scraper
24. Google Search Results Scraper — https://apify.com/apify/google-search-scraper
25. Community Google Search Scraper — https://apify.com/api-ninja/google-search-scraper
26. LinkedIn Jobs Scraper — https://apify.com/curious_coder/linkedin-jobs-scraper
27. Newer LinkedIn Jobs Scraper — https://apify.com/automation-lab/linkedin-jobs-scraper
28. Zillow Search Scraper — https://apify.com/maxcopell/zillow-scraper
29. Community Zillow Listings Scraper — https://apify.com/parseforge/zillow-scraper
30. Booking Scraper — https://apify.com/voyager/booking-scraper
31. Recent Booking.com Scraper example — https://apify.com/datascrapers/booking-com-scraper
32. Google News Scraper — https://apify.com/automation-lab/google-news-scraper
33. Alternative Google News Scraper — https://apify.com/solidcode/google-news-scraper
34. Website Content Crawler — https://apify.com/apify/website-content-crawler
35. AI Web Scraper — https://apify.com/apify/ai-web-scraper
36. Community AI-oriented Web Scraper — https://apify.com/datascoutapi/web-scraper
37. Web Scraper — https://apify.com/apify/web-scraper
38. Browser Use Apify — https://apify.com/lexis-solutions/browser-use-apify
39. MongoDB Import — https://apify.com/drobnikj/mongodb-import
40. Google Drive connector — https://apify.com/onidivo/google-drive
