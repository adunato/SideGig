# Apify Store Capability Assessment

- **Channel overview:** [overview.md](overview.md)

This document records the objective capability requirements associated with Apify Store and its opportunity areas. It does not assess personal capability fit.

## 1. Channel-Level Capability Prerequisites

*Methodology mapping: Phase 2, Step 9 — Define Channel-Level Capability Prerequisites.*

These requirements apply to operating through Apify Store regardless of the specific opportunity area pursued. Opportunity-specific requirements are assessed separately from representative case studies.

| Dimension | Requirement | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium** | Apify removes the need to build a separate deployment, billing and distribution stack, but a seller must still build a production-quality Actor, configure its runtime, define input/output schemas and permissions, document it, test it and publish it correctly. Actors run in managed containers and can be deployed directly to Apify. | High |
| Domain expertise | **Low-Medium** | No specialist subject-matter expertise is required merely to participate in the channel, but sellers need working knowledge of Apify concepts and commercial mechanics: Actors, runs, datasets/storage, pricing events, platform usage costs, publication requirements and Store discovery. | High |
| Data / resource access | **Low** | The baseline requirement is primarily an Apify account and development environment. Apify supplies the managed runtime, storage, APIs, schedules, billing, Store distribution and optional platform resources such as proxies. External datasets, accounts or third-party APIs depend on the opportunity area rather than on the channel itself. | High |
| Operating complexity | **Low-Medium** | Apify handles infrastructure scaling, execution, billing, transactions and core product delivery. The seller remains responsible for Actor reliability, documentation, updates, support, pricing configuration, usage/cost monitoring and compliance with publishing requirements. | High |
| Cost intensity | **Low-Medium, usage-variable** | Fixed channel-entry costs are low because separate production infrastructure and commerce systems are not required. Variable costs arise from platform resources such as compute, data transfer, storage/API operations and proxies. Under pay-per-event pricing, creator profit is based on 80% of event revenue less platform usage costs unless those costs are passed through to users. | High |

**Channel-level conclusion:** Apify has a relatively accessible channel baseline. The platform absorbs much of the generic SaaS infrastructure, deployment, billing and distribution burden, so the main capability and cost differences arise from the opportunity area and the external sources or services an Actor depends on rather than from participation in Apify itself.

## Gateway 2 — Opportunity-Area Selection

*Methodology mapping: Gateway 2 — Select Opportunity Areas for Deep Dive.*

### Recruitment & jobs intelligence

**Decision: Pass — selected for Phase 3 deep dive.**

Recruitment & jobs intelligence was selected because its Step 8 assessment combined strong paying demand, relatively favourable opportunity density and entrant attainability, credible revenue potential and high evidence confidence. Community research also identified concrete unresolved source, coverage, freshness, deduplication and delivery problems that justified deeper case-study investigation.

The channel-level prerequisites above do not introduce a material barrier that changes that conclusion: Apify's managed runtime and commerce stack keep the common platform requirements relatively accessible, while the important remaining uncertainties are opportunity-specific and therefore appropriate for Phase 3.

### Lead generation & business intelligence

**Decision: Pass — selected for Phase 3 deep dive.**

Lead generation & business intelligence is selected as the next opportunity area because its Step 8 assessment combines very strong paying demand and revenue potential with credible evidence that recent community entrants can acquire meaningful usage. Its market structure is less favourable than recruitment/jobs because major Maps, LinkedIn and enrichment products are crowded, but the area remains attractive enough to justify deeper investigation rather than being rejected at the comparison stage.

The opportunity-area community research sharpens the reason for the deep dive. The strongest signal is not for another generic source scraper, but for products that convert raw source data into a more useful buyer outcome through enrichment, verification, qualification, vertical or ICP-specific targeting and workflow-ready delivery. Current entrant evidence supports that distinction, while recurring complaints about irrelevant results, incomplete contact data, email quality and price pressure show that the remaining uncertainty is precisely about **which product forms create enough additional value to overcome strong competition**.

The channel-level prerequisites do not add a material barrier beyond those already understood for Apify. The unresolved questions are opportunity-specific—source choice, enrichment depth, data-quality requirements, unit economics and ongoing source maintenance—so representative case studies are the appropriate next step.

### News & media intelligence

**Decision: Pass — selected for Phase 3 deep dive.**

News & media intelligence is selected as a deliberate contrast case. Its market assessment is respectable rather than dominant—Opportunity Score **3.6**—but it combines good opportunity density and new-entrant attainability with evidence that commercially useful products can be built on lightweight public feeds and HTTP extraction.

The Step 8A community research reinforces that rationale. Users commonly begin with RSS or Google News feeds and add canonical-URL resolution or article extraction only where the buyer workflow needs it. The remaining uncertainty is therefore whether this simpler delivery model still supports sufficient paid demand and whether operating complexity stays materially below the two areas already deep-dived.

The channel-level prerequisites do not create a barrier to testing that question. Representative case studies are appropriate to establish the actual capability profile and revenue depth.

## 2. Opportunity-Area Capability Requirements

Capability requirements at this level are extrapolated from representative case studies and relevant opportunity-area evidence.

Each capability dimension is explicitly scored from **1 to 5**, where **1 = Low**, **2 = Low-Medium**, **3 = Medium**, **4 = Medium-High** and **5 = High** requirement. The **Capability Score** is the arithmetic mean of the five dimension scores, shown to one decimal place. Higher scores mean a more demanding capability/resource profile; this is not an attractiveness score.

### Recruitment & jobs intelligence

**Representative case studies:**
- [Curious Coder LinkedIn Jobs Scraper](case-studies/linkedin-jobs-scraper-curious-coder.md) — established LinkedIn jobs market benchmark.
- [Automation Lab LinkedIn Jobs Scraper](case-studies/linkedin-jobs-scraper-automation-lab.md) — recent low-cost LinkedIn entrant/direct challenger.
- [Vali G Indeed Jobs Scraper](case-studies/indeed-jobs-scraper-valig.md) — established alternative-source jobs provider, used to distinguish LinkedIn-specific characteristics from wider recruitment/jobs dynamics.

The three cases provide enough variation for an initial opportunity-area synthesis: a mature premium LinkedIn incumbent, a lean low-cost LinkedIn entrant, and an established high-volume Indeed provider. Community evidence adds source/coverage gaps, buyer quality requirements and operating problems that are not fully visible from Store metrics alone.

| Dimension | Score (1–5) | Opportunity-area requirement | Evidence / basis | Confidence |
|---|---:|---|---|---|
| Technical complexity | **3** | **Medium** | A credible single-source product can be built with lightweight HTTP extraction, but commercial quality requires search/filter semantics, pagination, completeness, deduplication, normalization and adaptation to source changes. Multi-source/ATS aggregation raises complexity further. | High |
| Domain expertise | **3** | **Medium** | Requires source-specific jobs/search knowledge and enough recruitment/labour-market understanding to expose useful fields, freshness, geography, salary, skills and employer data; deep HR expertise is not generally required. | High |
| Data / resource access | **2** | **Low-Medium** | Core data is generally public and no proprietary dataset is required in the representative cases. Apify supplies generic runtime, storage, APIs, scheduling and billing, but reliable source access may require proxies, geography-specific routing or source-specific endpoints. | High |
| Operating complexity | **4** | **Medium-High** | Commercial delivery is low-touch on Apify, but source changes, blocking, incomplete results, filter errors, duplicates, freshness and multi-connector maintenance create recurring operational work. Burden varies materially by source. | High |
| Cost intensity | **2** | **Low-Medium, margin-sensitive** | Fixed infrastructure requirements are low because Apify supplies the platform and source data is public. Variable compute/proxy/retry costs can materially affect margin, especially for very low-priced Actors. | Medium-High |

**Capability Score: 2.8 / 5**

#### Technical complexity

The case set shows that the technical barrier is **not uniformly high**. Automation Lab demonstrates that a commercially usable LinkedIn jobs product can run as a pure-HTTP Actor with 256 MB memory, no browser and no authenticated LinkedIn session. That establishes a relatively low floor for initial single-source extraction.

Commercial quality requires substantially more than retrieving listing cards. Across the three cases, relevant functionality includes search/filter handling, pagination and source result limits, full-detail retrieval, deduplication, normalization, geographic semantics, employer/job enrichment and reliable structured output. Curious Coder's changelog shows the additional complexity accumulated by a mature product as source behaviour changes and backward compatibility must be preserved.

Community evidence extends this beyond individual sources. Users ask for exact-company monitoring, multi-ATS coverage, canonical career-site data, normalization, freshness, incremental delivery and cross-source deduplication. Those are not prerequisites for every entrant, but they show how complexity rises when moving from a focused source product toward broader jobs-intelligence infrastructure.

The opportunity-area requirement is therefore **Medium**: a focused product is accessible to an experienced web-data developer, while mature or multi-source offerings require materially more source-specific reliability and normalization work.

#### Domain expertise

The common domain requirement is a combination of **jobs-source knowledge and recruitment-data product knowledge** rather than specialist professional HR expertise.

At source level, providers need to understand search semantics, locations/geographies, filters, pagination/result limits and which fields are reliably available. This varies by source: LinkedIn has its own search/filter behaviour, Indeed exposes richer employer and labour-market metadata, and ATS/company-career systems often provide more canonical job records through source-specific APIs or endpoints.

At buyer level, a useful product must understand which outputs matter downstream: titles, company identity, location, salary, skills, seniority, workplace type, application URL, freshness, employer metadata and related fields. Community research reinforces that buyers also care strongly about canonical source identity, accurate filters, freshness, duplicates and completeness.

The resulting requirement is **Medium**. The knowledge is material to product quality and differentiation, but the evidence does not indicate scarce domain IP or deep recruitment credentials as a general barrier to entry.

#### Data / resource access

The representative cases do not require proprietary data ownership. LinkedIn and Indeed products derive value from publicly accessible jobs surfaces, and community evidence identifies ATS/company-career endpoints as another practical source family. This makes the area relatively favourable compared with markets requiring licensed or exclusive datasets.

Apify removes most generic infrastructure requirements by providing execution, storage, datasets, APIs, schedules, billing and marketplace distribution. A seller therefore does not normally need a separate production server fleet, customer billing system or API gateway merely to participate in the opportunity area.

The main qualification is **reliable source access**. Automation Lab documents datacenter-proxy operation with no login; Curious Coder and Indeed evidence show rate limits, 403/429 responses, Cloudflare challenges, proxy questions and geography-specific completeness issues. Source choice therefore determines whether access is almost trivial or a significant recurring resource requirement.

The area is assessed **Low-Medium**: public data and managed platform infrastructure keep the baseline accessible, while proxies, routing and source-specific access methods can materially increase requirements for particular targets.

#### Operating complexity

Apify makes the commercial delivery model low-touch: customer execution, API access, datasets, schedules, metering, billing and payouts are platform services. The ongoing burden is concentrated in the jobs-data integration itself.

The three cases expose recurring operational failure classes: source/search changes, pagination loops, reduced result sets, filter leakage, missing fields, rate limits, blocking, proxy failures, memory pressure and geography-specific completeness. Community evidence adds freshness, duplicate handling and the fact that a run can technically succeed while still returning commercially poor data.

The burden is strongly source-dependent. Automation Lab deliberately constrains the LinkedIn problem and therefore operates at lower complexity than the mature Curious Coder product. Indeed introduces different proxy/completeness issues. Direct ATS/company-career endpoints can be more stable individually, but a multi-ATS product turns that into a connector-maintenance portfolio.

The opportunity-area requirement is therefore **Medium-High**. Initial development can be bounded, but reliable operation is an open-ended dependency on external sources whose behaviour and accessibility are outside the seller's control.

#### Cost intensity

The area generally has **low fixed cash requirements**. None of the representative cases shows a proprietary data licence or dedicated external infrastructure requirement, and Apify supplies the main runtime and commercial platform services.

Variable costs matter because sellers using pay-per-event pricing absorb the platform resource cost associated with paid usage. The cases demonstrate a very wide unit-price range: the mature Curious Coder LinkedIn product supports substantially higher per-result economics, Automation Lab uses an extremely lightweight design to support sub-$0.50/1K pricing, and Vali G sells Indeed data below $0.10/1K, leaving a much narrower absolute contribution margin.

The common cost drivers are compute, transfer/storage, proxy traffic and retries. Blocking or inefficient pagination can consume resources without producing proportional billable output. The Indeed community evidence is particularly useful here: otherwise similar runs can vary materially in cost when anti-bot challenges increase proxy/retry consumption.

The requirement is therefore **Low-Medium but margin-sensitive**. A focused, efficient Actor can have very low direct platform cost, but low-price products require disciplined execution economics and source instability can materially erode margin. Development and maintenance labour remain important economic considerations but are captured primarily under operating complexity rather than treated as platform cash cost.

**Opportunity-area synthesis conclusion:** Recruitment & jobs intelligence does not require scarce proprietary data or unusually specialised technology. Its attractive entry profile comes from public source availability, managed Apify infrastructure and the ability to begin with a narrow source/problem. The principal capability risk is ongoing source reliability: as the product expands in coverage, enrichment or completeness guarantees, operating complexity rises faster than the basic build complexity.

### Lead generation & business intelligence

**Representative case studies:**
- [Compass Google Maps Scraper](case-studies/google-maps-scraper-compass.md) — established high-volume benchmark for organisation/location data and incumbent-scale reliability.
- [LurkAPI Google Maps Business Leads Scraper](case-studies/google-maps-business-leads-scraper-lurkapi.md) — recent enriched entrant combining Maps extraction with website contacts, social profiles and optional qualification signals.
- [Dev Fusion Mass LinkedIn Profile Scraper with Email](case-studies/linkedin-profile-scraper-dev-fusion.md) — established person/contact enrichment case using a different primary source and external contact-finder layer.

The cases deliberately span three important forms of the opportunity: commodity-to-mature business/location extraction, a recent workflow-oriented enriched entrant, and higher-value person/contact enrichment. Together they distinguish what is intrinsic to lead-generation data products from choices specific to Google Maps, LinkedIn or a particular enrichment stack.

| Dimension | Score (1–5) | Opportunity-area requirement | Evidence / basis | Confidence |
|---|---:|---|---|---|
| Technical complexity | **4** | **Medium-High** | Raw source extraction can be moderate, but commercially useful products add geographic/search semantics, deduplication, normalization, website crawling, contact enrichment, verification, retries and stable schemas. | High |
| Domain expertise | **3** | **Medium** | Providers need source-specific knowledge plus practical understanding of prospect identity, qualification and which fields make data useful for sales/research workflows; scarce specialist expertise is not evident. | High |
| Data / resource access | **3** | **Medium** | Core Maps/LinkedIn/business-web data can be sourced publicly and Apify supplies infrastructure, but richer products may require proxies plus third-party email/mobile, registry or verification services. | High |
| Operating complexity | **4** | **Medium-High** | Commercial delivery is self-service, but source changes, geographic/search completeness, heterogeneous websites, contact match rates and external enrichment dependencies require ongoing quality and reliability work. | High |
| Cost intensity | **2** | **Low-Medium, enrichment-sensitive** | Fixed costs are low; variable compute/network/proxy and third-party enrichment costs matter. Unit prices range from roughly $1.50-$1.89/1K businesses to $10/1K enriched LinkedIn profiles, so margin depends strongly on product depth and source efficiency. | Medium-High |

**Capability Score: 3.2 / 5**

#### Technical complexity

The representative cases show a clear progression. The technical floor—retrieve a source record and put it in a dataset—is accessible. The capability required for a differentiated commercial lead product is materially higher.

Compass demonstrates the mature extraction layer: search/category/location semantics, geographic expansion, place details, deduplication, reviews, filtering and stable large-scale operation. LurkAPI adds website crawling, multi-field contact extraction and optional company-level enrichment. Dev Fusion adds bulk LinkedIn profile normalization, concurrent processing, retries and third-party email/mobile discovery.

The common requirement is therefore not an exotic architecture but a **reliable multi-stage data pipeline**. Products must distinguish missing source data from extraction failure, preserve useful partial results, deduplicate identities and keep schemas stable enough for CRM/API workflows. Complexity rises further with each enrichment layer because every additional source introduces its own matching and failure semantics.

The area is assessed **Medium-High**. A narrow MVP may be Medium complexity; the capability needed to compete on quality, enrichment or workflow completeness is consistently higher across the case set.

#### Domain expertise

The shared domain requirement is practical B2B data-product knowledge combined with source-specific understanding.

For Google Maps products, sellers need to understand categories, geography, place identity, search-result limits and the fields buyers use to qualify organisations. For LinkedIn enrichment, they need to understand professional identity, current role/employer context, company attributes and how sales/recruiting users interpret those fields. Across both, contact data creates product decisions around primary email/phone, verification, missing values and confidence.

Community evidence and the LurkAPI case show that differentiation often comes from translating a broad source into a specific buyer outcome: vertical targeting, ICP filters, verified contacts, businesses lacking websites, advertising activity or CRM-ready records. That requires enough commercial understanding to choose the right transformations, but not scarce industry credentials.

The opportunity-area requirement is therefore **Medium**.

#### Data / resource access

The area does not generally require ownership of a proprietary base dataset. Compass and LurkAPI derive their core value from Google Maps and public company websites; Dev Fusion operates without LinkedIn cookies and works from public profile URLs. This keeps fixed entry barriers relatively low.

The resource profile changes when a seller moves from extraction to enrichment. Reliable large-scale source access can require proxies and routing. Website crawling introduces arbitrary target behaviour. Email/mobile discovery, registry matching, ad-activity checks and verification can introduce external providers whose pricing, coverage and availability become part of the product.

Apify removes most generic SaaS infrastructure requirements by supplying runtime, storage, datasets, API access, scheduling, metering, billing and distribution. The area-specific requirement is therefore **Medium**: public base data keeps access feasible, but a competitive enriched product commonly depends on additional network and third-party resources.

#### Operating complexity

All three cases are commercially low-touch but technically maintenance-sensitive. Customers configure runs and receive data through Apify without seller-operated checkout, hosting or delivery systems. The ongoing work is concentrated in maintaining data quality across external sources.

The case set exposes different failure classes: Google Maps search/geography can return partial or unexpected coverage; arbitrary business websites may lack or block contact information; LinkedIn fields may change or be absent; external email/mobile finders can return no match; and enrichment stages can technically succeed while still producing data that buyers consider incomplete or low quality.

This is why the requirement is **Medium-High** rather than simply Medium. In lead generation, commercial correctness is often stricter than technical run success. A product can return rows but still fail if the rows are irrelevant, duplicated, stale, poorly matched or missing the contact fields that justified the purchase.

#### Cost intensity

Fixed cash requirements are generally low. The cases do not depend on proprietary licensed base datasets, and Apify provides the commercial/runtime platform. The dominant costs scale with usage.

At the low-depth end, Compass advertises core place extraction from about $1.50/1K and LurkAPI about $1.89/1K before discounts; the margin envelope is therefore sensitive to compute, network, proxy and retry efficiency. At the richer end, Dev Fusion charges $10/1K profiles, providing more revenue headroom but adding external email/mobile lookup costs. LurkAPI's separately charged verification, registry, LinkedIn-company and ad-activity events illustrate a useful economic pattern: **monetise expensive enrichment separately when its cost and buyer value are incremental**.

Under standard Apify PPE economics, community creators receive 80% of paid event revenue before platform costs. The case-study cost scenarios are necessarily broad because actual resource consumption and external-service contracts are private. They consistently support the same conclusion: base extraction can have low direct cash cost, but enrichment depth and failed/retried lookups can materially change contribution margin.

The opportunity-area requirement is therefore **Low-Medium, enrichment-sensitive** rather than uniformly low.

**Opportunity-area synthesis conclusion:** Lead generation & business intelligence has a relatively accessible technical and data-entry floor, but the cases reinforce the Step 8A finding that **raw extraction is not the strongest entrant proposition**. Defensible products usually move closer to the buyer's outcome through reliable identity, deduplication, enrichment, verification, qualification or workflow-ready delivery. Those layers raise technical and operating complexity to Medium-High and can introduce material third-party cost, while Apify keeps the generic infrastructure and commerce burden low. The principal capability constraint is therefore not building an initial scraper; it is operating a dependable enrichment pipeline whose additional buyer value remains greater than its maintenance and unit cost.

### News & media intelligence

**Representative case studies:**
- [EasyApi Google News Scraper](case-studies/google-news-scraper-easyapi.md) — established paid Google News benchmark with multi-year history, thousands of users and visible reliability issues.
- [Crawler Bros Google News Scraper](case-studies/google-news-scraper-crawlerbros.md) — recent entrant with strong active-user traction, low per-result pricing and optional full-text extraction.
- [Automation Lab RSS Feed Reader](case-studies/rss-feed-reader-automation-lab.md) — lower-complexity feed product that tests the simplest commercially useful end of the opportunity area.

The case set covers an established Google News incumbent, a recent direct challenger and a simpler RSS-native product. Together they provide enough variation to separate common news-monitoring requirements from complexity introduced by richer full-text extraction or a particular provider implementation.

| Dimension | Score (1–5) | Opportunity-area requirement | Evidence / basis | Confidence |
|---|---:|---|---|---|
| Technical complexity | **2** | **Low-Medium** | Useful products can be built on public RSS/Google News feeds with straightforward HTTP parsing, filtering and structured output. Complexity rises when resolving redirects or extracting full text across arbitrary publishers, but that is an optional product-depth choice rather than a universal requirement. | High |
| Domain expertise | **2** | **Low-Medium** | Sellers need practical knowledge of news-search queries, publisher/source identity, recency, locales, deduplication and monitoring workflows, but the cases do not require scarce editorial or industry expertise. | High |
| Data / resource access | **1** | **Low** | Core inputs are public Google News/RSS feeds and public publisher pages. The representative cases require no proprietary dataset, customer credentials or paid external data source as a general prerequisite. | High |
| Operating complexity | **2** | **Low-Medium** | RSS/feed products are low-touch; Google News products still need monitoring for redirect/schema changes and occasional zero-result failures. Full-text extraction adds publisher variability, but the common baseline remains materially lighter than source-heavy lead or jobs products. | Medium-High |
| Cost intensity | **1** | **Low** | Fixed costs are minimal and lightweight feed/HTTP extraction can avoid browser and proxy spend. Platform compute/storage remain variable costs, but no material licensed-data or external-enrichment cost is intrinsic to the area. | High |

**Capability Score: 1.6 / 5**

#### Technical complexity

The cases establish a low technical floor. Automation Lab's RSS Feed Reader primarily fetches standard RSS/Atom formats and normalises common metadata fields. Google News also exposes feed/search surfaces that can be consumed without a browser. This makes useful keyword monitoring, feed aggregation and structured article discovery achievable with ordinary HTTP parsing, filtering, pagination/item limits and dataset output.

The main complexity boundary is **enrichment depth**. Crawler Bros adds canonical URLs, images and full article text; community discussions show that Google News redirect resolution and arbitrary publisher extraction can require additional parsing/fallback logic. Those features can move an individual product toward Medium complexity, but they are not required for every commercially useful news-monitoring product.

The opportunity-area requirement is therefore **Low-Medium (2)**.

#### Domain expertise

A credible product needs to understand how buyers search and monitor news: query syntax, keywords, date windows, language/country selection, publisher identity, duplicate stories, freshness and the difference between article metadata and full text. Those decisions matter to usability, especially for PR, research and competitive-monitoring workflows.

However, none of the representative cases depends on specialist editorial credentials, proprietary taxonomies or deep regulated-domain knowledge. The required expertise is learnable product/source knowledge rather than scarce subject-matter expertise.

The requirement is **Low-Medium (2)**.

#### Data / resource access

This is the strongest capability advantage of the area. Google News/RSS and publisher feeds are public inputs, and the RSS case explicitly operates on arbitrary public feed URLs. Crawler Bros advertises operation without proxies, while the benchmark Google News products require no private customer account or licensed data asset as part of their public value proposition.

Full-text extraction can encounter publisher blocking or paywalls, but that is a target-specific extension rather than a prerequisite for entering the area. Apify supplies the runtime, datasets, scheduling, API and billing layer.

The requirement is therefore **Low (1)**.

#### Operating complexity

The lightweight end of the area is comparatively low-touch. Standard feeds change less frequently than aggressively protected social, jobs or ecommerce interfaces, and a feed parser can support many publishers without a dedicated connector for each one.

There is still real maintenance. EasyApi's issue history includes temporary zero-result and outage reports, and community users describe Google News wrapped links breaking naive downstream extraction. Full-text products must also handle publisher HTML variation, missing fields and occasional blocking. These are meaningful but narrower failure modes than the multi-source enrichment and identity-quality problems seen in lead generation.

The resulting requirement is **Low-Medium (2)**, with the important caveat that a product promising universal full-text extraction can become materially harder to operate than a feed/metadata product.

#### Cost intensity

The cases show low fixed cash requirements. Automation Lab prices RSS parsing at a small start fee plus roughly $0.001 per item, and Crawler Bros prices Google News around $1 per 1,000 results while advertising no proxy requirement. The common delivery path does not inherently require licensed datasets, external enrichment APIs or browser-heavy infrastructure.

Under Apify PPE/PPR economics, creators retain 80% of charge revenue before applicable platform usage costs. Efficient feed/HTTP products should therefore be able to operate with low direct unit cost, although exact creator margins are private and depend on compute, storage, transfer and the proportion of free-plan usage.

The area is assessed **Low (1)** for cost intensity.

**Opportunity-area synthesis conclusion:** News & media intelligence provides the lower-capability contrast sought by the project. Its **1.6 Capability Score** is materially below Recruitment & jobs (**2.8**) and Lead generation & business intelligence (**3.2**). The reason is structural: public feeds, simple HTTP access and low external-resource requirements allow a commercially useful product to remain narrow and lightweight. The trade-off is commercial rather than capability-driven: absolute demand and revenue depth are weaker and less certain than in the two higher-scoring opportunity areas. A low-capability strategy should therefore favour monitoring, feed aggregation, canonical-URL resolution or narrowly valuable enrichment rather than universal browser-based article extraction.

## Sources

### Channel-level capability prerequisites

- Apify Docs — Publish Actors: https://docs.apify.com/actors/publishing
- Apify Docs — Publish your Actor: https://docs.apify.com/actors/publishing/publish
- Apify Docs — Monetize Actors: https://docs.apify.com/actors/publishing/monetize
- Apify Docs — Set up Actor monetization: https://docs.apify.com/actors/monetize/set-up-monetization
- Apify Docs — Actor usage and resources: https://docs.apify.com/actors/running/usage-and-resources
- Apify Docs — How Actor monetization works: https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works

### Recruitment & jobs intelligence

- [Curious Coder LinkedIn Jobs Scraper case study](case-studies/linkedin-jobs-scraper-curious-coder.md)
- [Automation Lab LinkedIn Jobs Scraper case study](case-studies/linkedin-jobs-scraper-automation-lab.md)
- [Vali G Indeed Jobs Scraper case study](case-studies/indeed-jobs-scraper-valig.md)
- [Recruitment & Jobs community search pilot](../../apify-recruitment-jobs-community-search-pilot.md)

### Lead generation & business intelligence

- [Compass Google Maps Scraper case study](case-studies/google-maps-scraper-compass.md)
- [LurkAPI Google Maps Business Leads Scraper case study](case-studies/google-maps-business-leads-scraper-lurkapi.md)
- [Dev Fusion Mass LinkedIn Profile Scraper with Email case study](case-studies/linkedin-profile-scraper-dev-fusion.md)
- Apify Docs — Pay-per-event pricing: https://docs.apify.com/actors/publishing/monetize/pay-per-event


### News & media intelligence

- [EasyApi Google News Scraper case study](case-studies/google-news-scraper-easyapi.md)
- [Crawler Bros Google News Scraper case study](case-studies/google-news-scraper-crawlerbros.md)
- [Automation Lab RSS Feed Reader case study](case-studies/rss-feed-reader-automation-lab.md)
- Apify News category — https://apify.com/store/categories/news
- Apify Docs — Actor pricing and costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs
