# Apify POC Opportunity Selection

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisite validation:** [Apify Prerequisites Validation Test](prerequisites-validation.md)
- **Research methodology:** [Research Methodology](../../research/methodology.md)
- **Phase 2 start date:** 2026-09-17
- **Phase 3 definition date:** 2026-09-18

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
| Recruitment & jobs intelligence | 5 | 4 | 4 | 4 | 3 | Opportunity Score 4.0 / High | Clearly sufficient market signal for a POC; established job Actors show substantial active usage and recent entrants can acquire users. |
| Lead generation & business intelligence | 5 | 3 | 4 | 5 | 2 | Opportunity Score 3.8 / High | Clearly sufficient market signal, but competition is heavier and differentiated propositions commonly require enrichment or verification. |
| News & media intelligence | 3 | 4 | 4 | 3 | 4 | Opportunity Score 3.6 / Medium-High | Sufficient market signal despite lower absolute demand: established and recent Google News products have substantial active usage, while lightweight RSS products also show paid utility demand. |

### Eligible Opportunity Areas — Capability Requirements

Reuse the existing research scores. Higher = more demanding.

| Opportunity area | Technical complexity | Domain expertise | Data / resource access | Operating complexity | Cost intensity | Capability score / confidence | POC capability implication |
|---|---:|---:|---:|---:|---:|---|---|
| Recruitment & jobs intelligence | 3 | 3 | 2 | 4 | 2 | 2.8 / High overall | A focused POC is feasible, but source reliability, blocking, completeness and maintenance create a materially heavier operating experiment. |
| Lead generation & business intelligence | 4 | 3 | 3 | 4 | 2 | 3.2 / High overall | The heaviest profile; a representative differentiated POC tends to introduce enrichment, identity resolution and additional dependencies. |
| News & media intelligence | 2 | 2 | 1 | 2 | 1 | 1.6 / High overall | Public RSS/Google News inputs, lightweight HTTP extraction and minimal external-resource requirements support a genuinely small and inexpensive representative POC. |

### Selected Opportunity Area

**Selected opportunity area:** News & media intelligence

**Step 3 rationale:** All three eligible areas clear the market-evidence threshold, so Step 3 should not simply choose the highest market score. News/media has a lower market score than recruitment/jobs (3.6 vs 4.0) and lead generation (3.6 vs 3.8), but its market signal is sufficient for a POC. Against that adequate signal, the capability difference is substantial: News/media is 1.6 versus 2.8 for recruitment/jobs and 3.2 for lead generation. The modest market-score advantage of the other areas does not justify the materially larger capability burden for the first experiment.

### Step 3 Completion

**Step 3 complete:** Yes

**Step 3 blockers:** None

## 2. Specific POC Opportunity Research

*Methodology mapping: Phase 2, Step 4 — Research Specific POC Opportunities.*

Research the selected opportunity area below the area level and establish a credible landscape of concrete commercial propositions before selection.

**Specific research date:** 2026-09-17

The scan combined the existing News/media case studies with a fresh review of current Apify Store products, recent entrants and community evidence. Existing Actors are used as evidence for demand spaces, entrant traction, competition and capability requirements; they are not treated as product specifications to clone.

### Candidate Landscape

| Candidate opportunity | Buyer problem / use case | Target buyer | Commercial outcome / value | Demand / usage evidence | Alternatives / competition | Differentiation / unresolved need | Data / source / delivery model | Capability / cost implications | Evidence links |
|---|---|---|---|---|---|---|---|---|---|
| Google News search API | Buyers need structured Google News search/headline data without manually operating the Google News UI or maintaining their own parser. | Developers, researchers, PR/marketing teams, aggregators, AI/data workflows. | Query-driven article metadata with title, source, date, snippet and URL through API/dataset delivery. | Data Xplorer currently shows about 1.8K total users / 460 MAU; EasyApi about 2.2K / 267 MAU; SolidCode, a newer entrant, about 102 / 26 MAU. | Many mature and recent Google News Actors compete primarily on price, filters, speed and reliability. | Demand is proven but extraction is commoditised; a POC would test whether a clean low-cost implementation can still acquire usage in a crowded space. | Public Google News search/RSS surfaces; HTTP parsing; query/date/locale controls; Apify API/dataset. | Low technical and cost floor; main burden is source compatibility, query semantics and maintaining reliable output. | [Data Xplorer](https://apify.com/data_xplorer/google-news-scraper-fast), [EasyApi](https://apify.com/easyapi/google-news-scraper), [SolidCode](https://apify.com/solidcode/google-news-scraper), [EasyApi case study](../../research/channels/apify/case-studies/google-news-scraper-easyapi.md) |
| Google News canonical-link and full-text enrichment | Buyers using Google News need the real publisher URL and optionally clean article text rather than wrapped Google links and metadata-only feed records. | Researchers, media-monitoring teams, RAG/AI pipelines, analysts and automation builders. | Search results enriched with resolved canonical publisher URLs and optional clean article body/metadata. | Crawler Bros currently shows about 199 users / 58 MAU at roughly $4/1K results; community users repeatedly report Google News redirect links and limited RSS metadata as workflow blockers. | Some Google News Actors already resolve direct URLs or add full text; generic article extractors are substitutes after URL resolution. | Canonical-link resolution addresses a specific recurring pain point; full text adds value for filtering, summarisation and RAG but increases publisher variability. | Google News search/RSS plus redirect/canonical resolution and optional publisher-page extraction. | Moderate rather than low complexity: metadata remains cheap, but arbitrary publisher pages add parsing failures, retries and occasional browser/fallback requirements. | [Crawler Bros](https://apify.com/crawlerbros/google-news-scraper), [Xtracto](https://apify.com/xtracto/google-news-scraper), [article-extraction pain discussion](https://www.reddit.com/r/webscraping/comments/1qqz3rt/tired_of_google_rss_scraping/), [recent RSS enrichment discussion](https://www.reddit.com/r/webscraping/comments/1w8sq6f/google_news_rss_alternative/) |
| RSS/Atom normalization API | Buyers already have feed URLs but want many RSS/Atom feeds normalised into one stable schema and API/dataset without operating ingestion code. | Developers, analysts, journalists, marketers, AI/RAG pipelines and automation users. | Very low-cost multi-feed parsing, normalisation, scheduling and structured delivery. | Automation Lab has about 147 total users / 40 MAU after roughly six months. Several very recent RSS entrants exist but currently show only about 1 MAU each. | Free libraries, DIY cron/n8n workflows and many inexpensive RSS Actors create strong substitution pressure. | The value is convenience, batching, error handling and Apify-native scheduling/API rather than unique data. | Customer-supplied public RSS/Atom/RDF feeds; standards-based HTTP/XML parsing and normalized dataset rows. | Lowest capability profile in the candidate set: no browser, proxy, proprietary data or source-specific connectors are intrinsic. | [Automation Lab](https://apify.com/automation-lab/rss-feed-reader), [Automation Lab case study](../../research/channels/apify/case-studies/rss-feed-reader-automation-lab.md), [Rowfeed](https://apify.com/rowfeed/rss-feed-reader) |
| Stateful keyword / brand news monitor | Buyers want only new mentions of a company, competitor or topic over time rather than repeatedly pulling full search result sets. | PR/comms teams, small agencies, founders, marketers and competitive-intelligence users. | Scheduled keyword monitoring with deduplication, new-item state and webhook/dataset delivery. | Brand/media monitoring is a well-established off-platform use case, but dedicated Apify monitoring Actors currently show only about 1–3 users/MAU; generic Google News Actors capture much of the underlying demand. | Google Alerts, Talkwalker alerts, enterprise monitoring tools and scheduled Google News Actors are substitutes. | A programmable low-cost monitor could improve on manual/free alerts, but channel-specific willingness to pay for the stateful layer is not yet demonstrated. | Google News/RSS queries plus persistent state, deduplication and scheduled incremental delivery. | Still lightweight; adds state/change logic and monitoring semantics but little data-access or cash cost. | [HarvestLab monitor](https://apify.com/harvestlab/news-monitor), [Google News Monitor](https://apify.com/sthiven_r/google-news-monitor), [affordable monitoring discussion](https://www.reddit.com/r/BrandingPRMarketing/comments/1ne2e6n/best_affordable_media_monitoring_options/) |
| Multi-source topic news aggregator with deduplication | Buyers want one clean topic feed across several public news sources rather than managing each feed/search separately and reviewing duplicates. | Researchers, analysts, niche publishers, AI briefing workflows and content teams. | Combined topic feed with normalized records and duplicate reduction. | Current dedicated Apify aggregators/monitors are mostly very new and show around 1 MAU; adjacent RSS and Google News utilities have stronger demand but do not prove the combined proposition directly. | DIY RSS aggregation, feed readers, Google News itself and generic automation tools are strong substitutes. | Cross-source normalization and duplicate handling solve a real workflow problem, but the incremental paid value over simpler utilities is not yet demonstrated on Apify. | Multiple RSS/Google News feeds; normalization, deduplication and structured output. | Low-medium complexity; mostly lightweight HTTP/feed processing with additional identity/deduplication logic. | [AgenticTools aggregator](https://apify.com/agentictools/news-aggregator), [News Monitor](https://apify.com/jedii_123/news-monitor), [news aggregation discussion](https://www.reddit.com/r/webscraping/comments/1igt3qi/scraping_of_news/) |
| News sentiment and event-clustering intelligence | Buyers want article streams converted into higher-level signals such as sentiment, entities or grouped coverage of the same event. | PR/communications, finance/research teams, competitive intelligence and AI workflows. | Higher-value interpreted news signals rather than raw article rows. | Current direct Apify products remain very early: sentiment/event products reviewed show roughly 0–2 MAU. | Enterprise media-intelligence tools, LLM workflows and external news-intelligence APIs compete strongly. | Potential value is higher, but specific Store demand is not yet established and enrichment risks becoming more expensive than the first POC needs to be. | News search/feed inputs plus NLP/LLM or external intelligence APIs, clustering and aggregation. | Highest candidate capability burden due classification quality, external API/LLM cost, event matching and richer operating logic. | [News & Media Monitor](https://apify.com/akozaruk/newsapi-ai-scraper), [News Sentiment Analyzer](https://apify.com/junipr/news-sentiment-analyzer), [News Sentiment Mini](https://apify.com/publicmoney/sentiment-mini) |

### Step 4 Completion

**Step 4 complete:** Yes

**Step 4 blockers:** None

## 3. POC Opportunity Assessment and Shortlist

*Methodology mapping: Phase 2, Step 5 — Assess and Shortlist POC Opportunities.*

Assess each Step 4 candidate using the same market-attractiveness and capability dimensions used by the Research Methodology, but at the specific-opportunity level.

### Market Attractiveness Assessment

Higher score = more attractive. For **Competitive pressure**, higher means lower/more favourable pressure, consistent with the Research Methodology.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| Google News search API | Paying demand | 5 | High | Multiple paid Actors have hundreds of MAU; Data Xplorer is about 460 MAU and EasyApi about 267 MAU. |
| Google News search API | Opportunity density | 4 | High | Search, monitoring, aggregation, research, PR, SEO and downstream AI workflows all consume the same structured result layer. |
| Google News search API | New-entrant attainability | 4 | High | SolidCode reached about 26 MAU and Crawler Bros about 58 MAU despite mature incumbents. |
| Google News search API | Revenue potential | 4 | Medium | Public prices span roughly sub-$1 to $5/1K results with substantial active usage, but actual paid result volume is private. |
| Google News search API | Competitive pressure | 2 | High | Many mature and new near-substitutes make basic metadata extraction highly competitive. |
| Google News canonical-link and full-text enrichment | Paying demand | 4 | High | Crawler Bros has about 58 MAU at premium pricing and enriched/direct-link features also appear in other Google News products. |
| Google News canonical-link and full-text enrichment | Opportunity density | 4 | High | Canonical links/full text support monitoring, RAG, research, briefing, classification and summarisation workflows. |
| Google News canonical-link and full-text enrichment | New-entrant attainability | 4 | High | Crawler Bros is a relatively recent entrant with meaningful active usage. |
| Google News canonical-link and full-text enrichment | Revenue potential | 4 | Medium | Enrichment supports materially higher per-result prices than commodity RSS parsing, although paid volume is unknown. |
| Google News canonical-link and full-text enrichment | Competitive pressure | 3 | Medium | Fewer products deliver robust enrichment than metadata-only search, but several Actors and generic extractors already compete. |
| RSS/Atom normalization API | Paying demand | 3 | High | Automation Lab has about 40 MAU; demand is real but materially smaller than Google News search. |
| RSS/Atom normalization API | Opportunity density | 4 | Medium | News, blogs, podcasts, changelogs, monitoring and AI ingestion all use feed normalization, though some usage lies outside News/media. |
| RSS/Atom normalization API | New-entrant attainability | 3 | Medium | Automation Lab gained usage quickly, but several newer entrants remain around 1 MAU. |
| RSS/Atom normalization API | Revenue potential | 2 | Medium | Public pricing is extremely low and existing case estimates indicate modest absolute spend unless run volume is high. |
| RSS/Atom normalization API | Competitive pressure | 2 | High | Free libraries, DIY workflows and numerous low-cost Actors create strong substitution pressure. |
| Stateful keyword / brand news monitor | Paying demand | 3 | Medium | The underlying monitoring need is established, but dedicated Apify monitors currently show very little direct usage. |
| Stateful keyword / brand news monitor | Opportunity density | 4 | Medium | Brand, competitor, executive, topic, regulatory and event monitoring provide many recurring queries. |
| Stateful keyword / brand news monitor | New-entrant attainability | 2 | Medium | Current dedicated recent entrants have not yet demonstrated meaningful Apify traction. |
| Stateful keyword / brand news monitor | Revenue potential | 3 | Low | Monitoring is commercially valuable off-platform, but Apify-specific willingness to pay for the stateful layer is not established. |
| Stateful keyword / brand news monitor | Competitive pressure | 3 | Medium | Free Google Alerts and enterprise suites are strong substitutes, but a low-cost programmable niche remains plausible. |
| Multi-source topic news aggregator with deduplication | Paying demand | 2 | Medium | Dedicated current Apify aggregators show only about 1 MAU; stronger adjacent utility demand is not direct proof. |
| Multi-source topic news aggregator with deduplication | Opportunity density | 4 | Medium | Many topic/industry monitoring and briefing workflows need aggregation and deduplication. |
| Multi-source topic news aggregator with deduplication | New-entrant attainability | 2 | Medium | Recent dedicated entrants reviewed have not yet shown meaningful traction. |
| Multi-source topic news aggregator with deduplication | Revenue potential | 2 | Low | The proposition competes with free feed readers and aggregation workflows, limiting evidence of paid depth. |
| Multi-source topic news aggregator with deduplication | Competitive pressure | 3 | Medium | No dominant Apify incumbent, but substitutes are abundant and easy to assemble. |
| News sentiment and event-clustering intelligence | Paying demand | 2 | Medium | Direct current Apify products reviewed show approximately 0–2 MAU. |
| News sentiment and event-clustering intelligence | Opportunity density | 3 | Medium | PR, finance, research and intelligence workflows can use these signals, but each requires more domain-specific interpretation. |
| News sentiment and event-clustering intelligence | New-entrant attainability | 2 | Medium | Recent entrants have not yet demonstrated meaningful Store traction. |
| News sentiment and event-clustering intelligence | Revenue potential | 3 | Low | Higher-value intelligence could support premium pricing, but observed Store usage is too sparse to validate depth. |
| News sentiment and event-clustering intelligence | Competitive pressure | 3 | Medium | Many external APIs, LLM workflows and enterprise tools compete, though direct Apify supply remains immature. |

### Capability Assessment

Higher score = more demanding.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| Google News search API | Technical complexity | 2 | High | Lightweight HTTP/RSS/search parsing, filters and normalization are sufficient for a credible POC. |
| Google News search API | Domain expertise | 2 | High | Requires query, locale, recency and news-result knowledge but no specialist domain expertise. |
| Google News search API | Data / resource access | 1 | High | Public Google News surfaces; no proprietary dataset or customer credentials are intrinsic. |
| Google News search API | Operating complexity | 2 | Medium | Source behaviour can change and mature products report occasional failures, but there is one main source and no enrichment chain. |
| Google News search API | Cost intensity | 1 | High | HTTP/feed-based extraction can run without proprietary data or intrinsic proxy spend. |
| Google News canonical-link and full-text enrichment | Technical complexity | 3 | High | URL resolution plus arbitrary publisher extraction adds parsing/fallback logic beyond Google News metadata. |
| Google News canonical-link and full-text enrichment | Domain expertise | 2 | High | News/query and article-content knowledge is sufficient; no scarce domain expertise is required. |
| Google News canonical-link and full-text enrichment | Data / resource access | 1 | High | Google News and publisher pages are public inputs; no licensed dataset is intrinsic. |
| Google News canonical-link and full-text enrichment | Operating complexity | 3 | High | Publisher variability and partial extraction failures create a broader maintenance surface. |
| Google News canonical-link and full-text enrichment | Cost intensity | 2 | Medium | Extra page fetches/retries increase compute/network cost and difficult publishers may require heavier fallbacks. |
| RSS/Atom normalization API | Technical complexity | 1 | High | Standards-based feed retrieval, parsing and normalization are bounded and straightforward. |
| RSS/Atom normalization API | Domain expertise | 1 | High | General RSS/Atom and data-normalization knowledge is sufficient. |
| RSS/Atom normalization API | Data / resource access | 1 | High | Customer-supplied public feed URLs; no special access is needed. |
| RSS/Atom normalization API | Operating complexity | 1 | High | One generic parser handles many sources; maintenance centres on malformed feeds and protocol edge cases. |
| RSS/Atom normalization API | Cost intensity | 1 | High | Lightweight HTTP/XML work with no intrinsic proxy, browser, licence or enrichment cost. |
| Stateful keyword / brand news monitor | Technical complexity | 2 | High | Adds state, deduplication and scheduling to otherwise lightweight Google News/RSS collection. |
| Stateful keyword / brand news monitor | Domain expertise | 2 | Medium | Needs monitoring semantics and query design but no scarce specialist expertise. |
| Stateful keyword / brand news monitor | Data / resource access | 1 | High | Public news/search feeds and Apify state/storage are sufficient for a minimal product. |
| Stateful keyword / brand news monitor | Operating complexity | 2 | Medium | Stateful checkpoints and notification correctness add modest operating burden. |
| Stateful keyword / brand news monitor | Cost intensity | 1 | High | Scheduled HTTP collection and state storage can remain inexpensive. |
| Multi-source topic news aggregator with deduplication | Technical complexity | 2 | High | Multiple feeds plus schema normalization and duplicate detection are still technically bounded. |
| Multi-source topic news aggregator with deduplication | Domain expertise | 2 | Medium | Requires topic/query and deduplication decisions but little specialist knowledge. |
| Multi-source topic news aggregator with deduplication | Data / resource access | 1 | High | Public feeds/search surfaces are sufficient. |
| Multi-source topic news aggregator with deduplication | Operating complexity | 2 | Medium | More sources create partial failures and feed changes, but no heavy anti-bot stack is intrinsic. |
| Multi-source topic news aggregator with deduplication | Cost intensity | 1 | High | Primarily lightweight HTTP, parsing and dataset work. |
| News sentiment and event-clustering intelligence | Technical complexity | 3 | Medium | Classification, clustering and evidence aggregation materially expand product logic. |
| News sentiment and event-clustering intelligence | Domain expertise | 3 | Medium | Useful interpretation requires stronger understanding of sentiment, entity/event semantics and buyer workflows. |
| News sentiment and event-clustering intelligence | Data / resource access | 2 | Medium | Can use public news data, but richer products may rely on external news or model APIs. |
| News sentiment and event-clustering intelligence | Operating complexity | 3 | Medium | Model/API dependencies, quality evaluation and clustering errors require more monitoring. |
| News sentiment and event-clustering intelligence | Cost intensity | 3 | Medium | External API or LLM inference can become a material variable cost. |

### Shortlist

Use only:

- **Shortlisted** — remains a credible POC candidate;
- **Excluded** — not suitable for this POC cycle based on the evidence.

| Candidate opportunity | Market evidence potential | POC capability suitability | Decision | Rationale |
|---|---|---|---|---|
| Google News search API | High: multiple incumbents have hundreds of MAU and recent entrants show meaningful traction. | High: representative POC can remain HTTP-based, low-cost and operationally bounded. | Shortlisted | Strongest direct market signal and still a low-capability experiment; main negative is heavy commodity competition. |
| Google News canonical-link and full-text enrichment | High-medium: a recent enriched entrant has meaningful MAU and community evidence identifies redirect/full-text pain directly. | Medium-high: still inexpensive, but publisher extraction makes the POC materially more complex than metadata-only search. | Shortlisted | Provides clearer differentiation and tests a documented buyer pain while remaining small enough for a first POC. |
| RSS/Atom normalization API | Medium: about 40 MAU demonstrates paid utility, though revenue depth is much lower than Google News search. | Very high: lowest technical, operating and cost profile in the candidate set. | Shortlisted | Clears the minimum market-signal bar and is the simplest representative experiment; low revenue depth and strong DIY substitution are the main risks. |
| Stateful keyword / brand news monitor | Medium-low: monitoring demand exists, but dedicated Apify products have not yet shown meaningful traction. | High: stateful monitoring remains cheap and technically bounded. | Excluded | Specific channel demand is too weak to justify preferring it over the simpler opportunities with stronger direct usage evidence. |
| Multi-source topic news aggregator with deduplication | Low-medium: current dedicated products have little direct usage. | High: technically manageable and inexpensive. | Excluded | Attractive capability profile is not enough; candidate-specific market evidence is currently too sparse for an informative first POC. |
| News sentiment and event-clustering intelligence | Low-medium: current Store traction is minimal despite plausible off-platform value. | Low-medium: model/API dependencies make it the heaviest News/media candidate. | Excluded | Weak direct market evidence and substantially higher capability/cost burden make it a poor first POC relative to the shortlisted alternatives. |

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
| Google News search API | Very strong direct demand and entrant evidence; market dimensions 5/4/4/4/2, with competition the main weakness. | Low burden: 2/2/1/2/1; public source, lightweight HTTP/RSS extraction and no intrinsic licensed-data or proxy requirement. | Whether a clean, reliable, competitively priced new entrant can acquire measurable usage in a crowded but proven demand space; whether lightweight source handling remains reliable and cheap in practice. | Low. A representative POC can remain one-source, HTTP-based and inexpensive while still exercising query, locale, recency, normalization and source-reliability requirements. | Selected |
| Google News canonical-link and full-text enrichment | Strong evidence and clearer differentiation; market dimensions 4/4/4/4/3 with meaningful recent-entrant traction. | Moderate burden: 3/2/1/3/2; publisher-page variability materially expands build and operating complexity. | Whether buyers value canonical links/full text enough to support differentiated usage and whether heterogeneous publisher extraction can remain reliable at low cost. | Low-medium. Still feasible as a POC, but it adds publisher extraction, retries and fallback behaviour that are not required to test the core Google News market. | Deferred |
| RSS/Atom normalization API | Real but materially weaker demand/revenue depth; market dimensions 3/4/3/2/2. | Minimal burden: 1/1/1/1/1; standards-based parsing with the lowest cost and maintenance profile. | Whether convenience and normalization alone produce enough paid usage despite abundant free/DIY substitutes. | Very low, but the weaker demand and revenue evidence make the resulting commercial test less informative than Google News search. | Deferred |

### Selected Opportunity

**Selected opportunity:** Google News search API

**Buyer problem:** Buyers need structured Google News search and headline data without manually operating the Google News interface or maintaining their own extraction and normalization code.

**Target user:** Developers, researchers, PR/marketing teams, news/content aggregators and AI/data workflows that consume current news-search results programmatically.

**Core value proposition:** A low-friction, low-cost Apify API/dataset that converts Google News queries into reliable structured article metadata with useful query, locale and recency controls.

**Market assumptions to test:** Google News search has enough active paid demand for a new entrant to acquire measurable usage despite heavy competition; reliability, usability and competitive pricing are sufficient differentiators for a simple entrant; the breadth of monitoring, research, aggregation and AI workflows produces enough repeat usage to make the market signal observable during a small POC.

**Capability assumptions to test:** A commercially credible Google News search product can be implemented with lightweight HTTP/RSS-style extraction and normalization; useful query, locale and recency semantics can be supported without proprietary data or intrinsic proxy spend; source changes and occasional failures can be handled with a bounded operating burden; direct execution costs remain low enough for usage-based pricing.

**Selection rationale:** Google News search provides the strongest balance for the first POC. It has the strongest direct demand evidence in the shortlist and recent entrants demonstrate attainability, while its capability profile remains low. Canonical-link/full-text enrichment offers clearer differentiation but adds materially more technical and operating complexity without stronger overall market evidence. RSS normalization is simpler still, but its paying-demand and revenue evidence are substantially weaker. Google News search therefore gives the smallest low-cost experiment with the highest probability of producing meaningful market feedback while still testing real source-reliability and operating assumptions.

**Selection date:** 2026-09-17

### Step 6 Completion

**Step 6 complete:** Yes

**Step 6 blockers:** None

## 5. Gateway 2 — POC Opportunity Selected

**Decision:** Pass

**Rationale:** Steps 3–6 are complete and traceable to the research evidence. News & media intelligence was selected as the proportionate first POC area, six specific propositions were researched and assessed, and Google News search API was selected from the evidence-based shortlist. The proposition has strong enough market evidence to support an informative POC while remaining simple, inexpensive and representative of the material capability assumptions to be tested. No unresolved blocker prevents progression to Phase 3 POC definition and design.

A Pass requires Steps 3–6 to be complete, exactly one Step 6 candidate to be Selected, and no unresolved blocker preventing Phase 3.

## 6. POC Definition

*Methodology mapping: Phase 3, Step 7 — Define the POC.*

The selected proposition remains the **Google News search API** from Step 6. This definition deliberately keeps the experiment at metadata-search level so that the POC tests the selected proposition rather than drifting into the deferred canonical-link/full-text opportunity.

### Experiment Definition

**POC objective:** Determine whether a new, low-cost Google News metadata Actor can acquire measurable real-user usage on Apify while remaining technically reliable, operationally bounded and economically viable using lightweight Google News feed access.

**Primary POC user:** Developers, automation builders and researchers who need self-service structured Google News search results through an Apify Actor, dataset and API rather than a consumer news interface.

**Experiment mode:** Public paid Apify Store POC. The Actor will be discoverable and runnable by external users and will use pay-per-event charging. It is an experimental Store product rather than a production-readiness commitment; later production gateways still govern hardening, final pricing and production launch.

**Observation window:** 30 consecutive days beginning when the POC is publicly listed with monetisation active. The window may end early only for a material capability failure that meets the exit rule.

**POC commercial parameter:** Temporary POC price of **$1.00 per 1,000 dataset results** ($0.001 per result), plus Apify's default `apify-actor-start` synthetic event at its standard price where applicable. This matches the low end of current Google News Store pricing closely enough to avoid testing an obvious price disadvantage. It is an experiment parameter, not the Step 12 production commercial model.

### Functional Scope

| Scope item | Status | Definition / rationale |
|---|---|---|
| Query-driven Google News search | In scope | Execute one or more user-supplied Google News search expressions and return structured metadata. This is the core selected proposition. |
| Multiple queries per run | In scope | Support up to 20 queries in one run so the POC is useful for automation without turning into a large-scale crawling product. |
| Locale control | In scope | Allow language and country/edition selection so the POC exercises the localisation requirement identified in Phase 2. |
| Recency control | In scope | Allow a small set of common recency windows to test useful current-news search semantics. |
| Per-query result limit | In scope | Allow 1–100 results per query, reflecting the practical Google News feed boundary rather than adding pagination mechanisms. |
| Cross-query deduplication | In scope | Optional deduplication prevents obvious repeated records in multi-query runs while remaining lightweight. |
| Apify dataset/API delivery | In scope | Store normalized records in the default dataset and expose them through normal Apify API, export and integration mechanisms. |
| Input and output schemas | In scope | Define native Apify schemas so the Actor is self-describing in Console/API and suitable for programmatic use. |
| Public Store README sufficient for POC use | In scope | Provide concise usage, field and limitation documentation required for an external user to run the experiment. |
| Canonical publisher-article URL resolution | Out of scope | Explicitly deferred in Step 6. It would move the POC toward the separate canonical-link enrichment proposition. |
| Full article-body extraction | Out of scope | Explicitly deferred because arbitrary publisher extraction materially increases technical and operating complexity. |
| Images / media extraction | Out of scope | Not required to test the selected metadata-search proposition. |
| Browser-based Google News scraping | Out of scope | The POC tests whether lightweight HTTP/feed access is sufficient; browser automation would invalidate that capability assumption. |
| Residential proxy dependency | Out of scope | The selected capability hypothesis assumes no intrinsic residential-proxy spend. If it becomes necessary, that is evidence against the hypothesis rather than an automatic scope expansion. |
| Stateful monitoring / alerting | Out of scope | This is the separate stateful news-monitor proposition excluded in Step 5. Users may still use Apify's generic scheduling/webhook capabilities externally. |
| Sentiment, clustering or AI enrichment | Out of scope | Separate higher-complexity proposition excluded in Step 5. |
| Multi-source news aggregation | Out of scope | The POC intentionally remains a single-source Google News experiment. |

### Inputs

| Input | Required | Type / allowed values | Default / bound | Purpose |
|---|---|---|---|---|
| `queries` | Yes | Array of non-empty strings | 1–20 queries | Defines the Google News search expressions to execute. Native Google News search operators may be passed through as part of the query. |
| `maxItemsPerQuery` | No | Integer | Default 20; min 1; max 100 | Bounds output and cost while allowing realistic search workloads. |
| `language` | No | Locale string supported by the POC | Default `en-US` | Selects the language edition used for the Google News request. |
| `country` | No | Two-letter country/edition code supported by the POC | Default `US` | Selects the regional Google News edition. |
| `dateRange` | No | `any`, `1h`, `6h`, `1d`, `7d`, `30d` | Default `7d` | Provides a bounded, user-friendly recency control without introducing arbitrary pagination/history logic. |
| `dedupe` | No | Boolean | Default `true` | Removes duplicate Google News records returned across multiple queries while preserving the first matching query context. |

### Outputs

| Output | Required | Definition |
|---|---|---|
| `query` | Yes | Search expression that produced the record. |
| `title` | Yes | Article headline returned by Google News. |
| `sourceName` | Yes | Publisher/source name supplied by the feed. |
| `sourceUrl` | No | Publisher/source URL supplied by Google News where available; this is not guaranteed to be the canonical article URL. |
| `googleNewsUrl` | Yes | Google News article/feed URL for the result. |
| `publishedAt` | Yes | Publication timestamp normalized to ISO 8601 where the source timestamp is valid. |
| `descriptionText` | No | Plain-text description/snippet derived from the feed when available. |
| `guid` | No | Google News feed identifier where supplied, useful for deduplication and traceability. |
| `position` | Yes | 1-based position of the item within the result set for its query before cross-query deduplication. |
| `language` | Yes | Language edition requested for the run. |
| `country` | Yes | Country/edition requested for the run. |
| `scrapedAt` | Yes | ISO 8601 timestamp recording when the POC collected the record. |

### Dependencies and Constraints

| Dependency / constraint | POC implication | Boundary / response |
|---|---|---|
| Public Google News feed/search behaviour | The POC depends on an upstream interface that Google may change, throttle or vary without notice. | Use lightweight direct HTTP/feed access first. Measure failures and source changes rather than hiding them behind a heavier browser implementation. |
| Approximate 100-result feed ceiling per query | A single query cannot be treated as an exhaustive or deeply paginated historical search. | Cap `maxItemsPerQuery` at 100 and document that the POC returns the feed results Google exposes, not guaranteed complete coverage. |
| Google-controlled query, locale and recency semantics | Result composition and ranking are controlled upstream and can vary by edition/time. | Validate that requested controls are applied consistently; do not claim deterministic ranking or complete market coverage. |
| Google News redirect/article links | Metadata feeds may expose Google News links rather than canonical publisher article URLs. | Return the Google News URL and source metadata only. Canonical-link resolution remains explicitly out of scope. |
| Variable or missing snippets/source metadata | Some feed records may omit non-core metadata or provide truncated descriptions. | Required fields are limited to the stable core; optional fields remain nullable. |
| Apify Actor runtime, dataset, API and Store | The POC relies on Apify for execution, storage, discoverability, charging and usage visibility. | Use native Actor input/output schemas, default dataset and PPE mechanisms rather than external infrastructure. |
| Apify pay-per-event economics | Creator revenue is reduced by Apify's platform share and underlying platform costs remain the creator's cost. | Measure actual run cost and creator revenue during the POC; production pricing is deferred to Step 12. |
| No proprietary data or paid external API | The selected capability profile assumes public-source access and minimal variable cost. | Introducing a mandatory paid data/API dependency is a material capability change and triggers the exit/iteration rules rather than silently expanding scope. |

### Success and Exit Criteria

| Dimension | Criterion | Threshold / decision rule |
|---|---|---|
| Market | Independent external users | **Success:** at least 10 distinct non-owner users during the 30-day observation window. |
| Market | Repeat use | **Success:** at least 3 external users run the Actor on more than one distinct day, providing evidence beyond one-off trials. |
| Market | Monetised demand | **Success:** at least one external paid-plan usage produces positive creator revenue during the observation window. |
| Capability | Run reliability | **Success:** at least 95% of valid-input POC runs complete successfully, excluding clearly attributable Apify-wide outages. |
| Capability | Core record completeness | **Success:** at least 98% of returned records contain valid `title`, `sourceName`, `googleNewsUrl` and `publishedAt` values. |
| Capability | Query / locale / recency behaviour | **Success:** the acceptance matrix defined during implementation passes for all supported controls, with no systematic mismatch that makes a control misleading. |
| Capability | Lightweight access assumption | **Success:** normal operation does not require browser automation, a paid external data API or mandatory residential-proxy usage. |
| Capability | Unit economics | **Success:** measured Apify platform cost across representative paid runs remains at or below 40% of net creator revenue generated by those runs at the temporary POC price. |

**POC success rule:** The POC is successful when all five capability criteria pass and all three market criteria are met within the 30-day observation window. This provides evidence that both the selected market and capability assumptions survived a real commercial experiment.

**Bounded iteration rule:** One bounded iteration is justified when the capability criteria pass but market evidence is partial — specifically, at least 5 distinct external users are observed but one or more of the 10-user, repeat-use or monetised-demand thresholds are missed — or when one capability criterion narrowly misses because of a specific fix that does not change the proposition or introduce an excluded dependency. The iteration must have an explicit hypothesis and remain within the Step 7 functional boundary.

**Exit / stop rule:** Stop the POC without further implementation expansion when, after the 30-day window, fewer than 5 distinct external users are observed; or when the core proposition cannot meet the reliability/completeness criteria without browser automation, a mandatory paid external data source or residential-proxy dependence; or when representative unit economics materially exceed the 40% cost threshold and cannot be corrected within the existing scope. A failure caused by the selected proposition should return to Gateway 4 evidence assessment rather than being hidden by adding deferred features.

### Step 7 Completion

**Step 7 complete:** Yes

**Step 7 blockers:** None

