# Apify POC

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisite validation:** [Apify Prerequisites Validation Test](prerequisites-validation.md)
- **Research methodology:** [Research Methodology](../../research/methodology.md)
- **Selection date:** 2026-09-17

## 1. POC Opportunity Selection

*Methodology mapping: Phase 2, Step 3 — Select the POC Opportunity.*

Step 3 selects one concrete commercial opportunity to carry into POC definition. It consumes the outputs of the linked research methodology rather than repeating opportunity research, and it does not yet define the POC design.

### Research Inputs

**Channel research:** [Apify Store overview](../../research/channels/apify/overview.md), including the opportunity-area assessments, community findings, Research Gateway 2 decisions and Step 12 market refinements.

**Capability research:** [Apify Store capability assessment](../../research/channels/apify/capability.md), including the channel baseline and Step 12 capability syntheses for the three deep-dived opportunity areas.

**Case-study / deep-dive evidence:** Recruitment/jobs — [Curious Coder LinkedIn Jobs Scraper](../../research/channels/apify/case-studies/linkedin-jobs-scraper-curious-coder.md), [Automation Lab LinkedIn Jobs Scraper](../../research/channels/apify/case-studies/linkedin-jobs-scraper-automation-lab.md), [Vali G Indeed Jobs Scraper](../../research/channels/apify/case-studies/indeed-jobs-scraper-valig.md); Lead generation — [Compass Google Maps Scraper](../../research/channels/apify/case-studies/google-maps-scraper-compass.md), [LurkAPI Google Maps Business Leads Scraper](../../research/channels/apify/case-studies/google-maps-business-leads-scraper-lurkapi.md), [Dev Fusion Mass LinkedIn Profile Scraper with Email](../../research/channels/apify/case-studies/linkedin-profile-scraper-dev-fusion.md); News/media — [EasyApi Google News Scraper](../../research/channels/apify/case-studies/google-news-scraper-easyapi.md), [Crawler Bros Google News Scraper](../../research/channels/apify/case-studies/google-news-scraper-crawlerbros.md), [Automation Lab RSS Feed Reader](../../research/channels/apify/case-studies/rss-feed-reader-automation-lab.md).

### Candidate Opportunities

| Candidate opportunity | Research basis | Commercial evidence | Differentiation / unresolved need | POC testability | Implementation considerations | Decision |
|---|---|---|---|---|---|---|
| **Exact-company job monitoring from canonical employer career / ATS sources** | [Recruitment & jobs intelligence](../../research/channels/apify/overview.md) passed Research Gateway 2 and the [capability synthesis](../../research/channels/apify/capability.md) is based on three representative jobs cases. Community/deep-dive evidence repeatedly identifies exact-company monitoring, ATS coverage, canonical career-site data, freshness, incremental delivery and deduplication as unresolved combinations of source, quality and delivery. | Recruitment/jobs retains strong demand and entrant evidence: Demand 5, opportunity density 4, entrant attainability 4 and revenue potential 4, with established LinkedIn/Indeed products at material usage and a recent LinkedIn entrant reaching meaningful adoption. | Avoids another generic LinkedIn/Indeed clone by focusing on the buyer need for canonical company-specific job changes and cleaner source records. The unresolved question is whether freshness, canonical sourcing and focused employer monitoring create enough value to support paid usage without broad aggregator-scale coverage. | The core proposition can be tested with a deliberately bounded source set and employer-monitoring workflow before attempting broad ATS or job-board coverage. | Capability Score 2.8/5. Public source availability and Apify infrastructure keep entry accessible; the material risk is recurring source/connector maintenance, completeness, deduplication and freshness rather than proprietary data or high fixed cost. | **Selected** |
| **ICP-qualified local-business leads with website/contact enrichment** | [Lead generation & business intelligence](../../research/channels/apify/overview.md) passed Research Gateway 2 and the [capability synthesis](../../research/channels/apify/capability.md) is grounded in Google Maps and LinkedIn enrichment cases. The research consistently finds that raw lead extraction is less attractive than enrichment, qualification and workflow-ready delivery. | The area has very strong commercial evidence: Demand 5 and revenue potential 5. Google Maps incumbents operate at large scale and recent enriched entrants such as LurkAPI have acquired meaningful usage despite heavy competition. | The value angle is richer, better-qualified prospect records rather than another raw Maps scraper. However, current entrants already demonstrate similar enrichment strategies, so differentiation must be sharper than enrichment alone. | A POC could be bounded around one ICP/vertical and a small enrichment chain, so the proposition is testable without production-scale coverage. | Capability Score 3.2/5. Enrichment, verification, identity matching and heterogeneous website/source dependencies increase technical and operating burden, and third-party enrichment can introduce material variable cost. | **Deferred** |
| **Keyword news monitoring with canonical URLs, deduplication and optional article enrichment** | [News & media intelligence](../../research/channels/apify/overview.md) passed Research Gateway 2 and the [capability synthesis](../../research/channels/apify/capability.md) is based on Google News and RSS cases. Research identifies canonical URL resolution, deduplication, stable filtering and selective full-text extraction as recurring buyer needs. | The market is smaller but active: Demand 3, opportunity density 4, entrant attainability 4 and revenue potential 3. Recent Google News entrants have gained meaningful monthly usage and simple RSS products also attract buyers. | Differentiates from raw feed parsing by producing more reliable monitoring output, but the buyer value is still relatively easy to reproduce and absolute demand is materially lower than recruitment/jobs or lead generation. | Highly testable with a small RSS/Google News workflow and optional enrichment, with little need for heavy anti-bot infrastructure. | Capability Score 1.6/5. Lowest implementation and operating burden of the three, but the principal risk is commercial depth rather than technical feasibility. | **Deferred** |

### Selected Opportunity

**Selected opportunity:** Exact-company job monitoring from canonical employer career / ATS sources

**Research opportunity area:** [Recruitment & jobs intelligence](../../research/channels/apify/overview.md), selected at Research Gateway 2 and synthesized in [capability.md](../../research/channels/apify/capability.md).

**Primary uncertainty to test:** Whether buyers will pay for a focused company-job monitoring product that provides fresher, cleaner and more canonical employer/ATS job records than generic job-board scraping, without requiring broad multi-source aggregation from the outset.

**Selection rationale:** Recruitment/jobs offers the strongest balance for a first commercial experiment. The research shows high paying demand, comparatively favourable opportunity density and entrant attainability, and concrete unresolved buyer problems around exact-company monitoring, ATS coverage, canonical records, freshness and deduplication. Its capability profile is materially lighter than enriched lead generation while the commercial evidence is stronger than news/media. The selected opportunity is also bounded enough to test before committing to broad source coverage. The lead-generation candidate remains commercially attractive but carries a heavier enrichment and operating stack; the news candidate is simpler technically but has a smaller and less certain revenue pool.

### Step 3 Completion

**Step 3 complete:** Yes

**Open blockers:** None

The selected opportunity is traceable to a Research Gateway 2 area with completed Phase 3 case-study and capability synthesis evidence. Exactly one candidate is selected, the alternatives remain documented, and no unresolved blocker prevents Step 4 POC definition.