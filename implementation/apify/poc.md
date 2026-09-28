# Apify POC Opportunity Selection

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisite validation:** [Apify Prerequisites Validation Test](prerequisites-validation.md)
- **Research methodology:** [Research Methodology](../../research/methodology.md)
- **POC methodology revision:** Demand validation v1
- **POC artifact role:** Current
- **POC lineage predecessor:** [Google News metadata POC](legacy/google-news-metadata-poc.md)
- **Phase 2 start date:** 2026-09-17
- **Phase 3 definition date:** 2026-09-26

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

**Specific research date:** 2026-09-26

The reassessment preserves the six previously identified candidate spaces but re-runs the commercial question under the current demand-validation method. Current Apify Store evidence was rechecked, including established products, recent entrants, issue histories and products published during September 2026. Existing Actors are evidence for buyer behaviour, substitution and entrant traction; they are not specifications to clone.

### Candidate Landscape

| Candidate opportunity | Buyer problem / use case | Target buyer | Commercial outcome / value | Demand / usage evidence | Alternatives / competition | Differentiation / unresolved need | Data / source / delivery model | Capability / cost implications | Evidence links |
|---|---|---|---|---|---|---|---|---|---|
| Google News metadata search API | Buyers need structured Google News search/headline data without manually operating the Google News UI or maintaining basic feed parsing. | Developers, researchers, PR/marketing teams, aggregators and AI/data workflows. | Query-driven article metadata through an Apify API/dataset. | Category demand is strong: Data Xplorer shows about 1.8K total users / 460 MAU and EasyApi about 2.4K / 230 MAU. However, recent low-cost entrants are much smaller: SolidCode about 102 / 26 MAU, Fetch Cat about 18 / 12 MAU, while two Actors published within the last week currently show only about 1 MAU each. | Many mature and recent Google News Actors now provide near-identical metadata at roughly $0.30-$5/1K results; several also resolve publisher URLs. | The unresolved issue is no longer whether Google News data is useful; it is why a buyer would choose another metadata-only Actor. Price/reliability alone are weakly differentiated and increasingly crowded. | Public Google News RSS/search surfaces; lightweight HTTP parsing; query/date/locale controls; Apify API/dataset. | Low technical and cost floor, but low build complexity also lowers entry barriers and increases substitution. | [Data Xplorer](https://apify.com/data_xplorer/google-news-scraper-fast), [EasyApi](https://apify.com/easyapi/google-news-scraper), [SolidCode](https://apify.com/solidcode/google-news-scraper), [Fetch Cat](https://apify.com/fetch_cat/google-news-scraper), [Plainfetch](https://apify.com/plainfetch/google-news-scraper), [Chorelet](https://apify.com/chorelet/google-news-scraper) |
| Google News enriched search API — real publisher URLs + optional full text | Buyers need Google News discovery that can be handed directly into research, monitoring or AI workflows without Google redirect URLs and without separately orchestrating article extraction. | Researchers, media-monitoring teams, RAG/AI pipelines, analysts and automation builders. | Search results with resolved publisher URLs plus optional readable article text/metadata in one Actor. | Crawler Bros now shows about 466 total users / 104 MAU after roughly six months; Memo23 about 74 / 42 MAU after roughly three months. Several new September entrants explicitly make real publisher URLs their primary value proposition. | Existing enriched Google News Actors, metadata Actors combined with a separate article extractor, DIY URL-resolution code and external news APIs. | Integrated resolved URLs remove a concrete downstream failure mode; optional full text removes an additional pipeline step. The unresolved question is whether a new entrant can still earn attention now that this differentiation is becoming more common. | Google News RSS/search plus publisher-URL resolution and optional publisher-page extraction. | Moderate complexity: real-URL resolution is bounded; full-text extraction adds publisher variability, partial failures and additional requests but can remain optional/fail-soft. | [Crawler Bros](https://apify.com/crawlerbros/google-news-scraper), [Memo23](https://apify.com/memo23/google-news-scraper), [Chorelet](https://apify.com/chorelet/google-news-scraper), [Dami Studio](https://apify.com/dami_studio/google-news-scraper), [EasyApi broken-URL issue](https://apify.com/easyapi/google-news-scraper/issues/results-have-a-broke-obnNdrySgPcTUbdXg) |
| RSS/Atom normalization API | Buyers already have feed URLs but want RSS/Atom feeds normalized into one stable schema and API/dataset without operating ingestion code. | Developers, analysts, journalists, marketers, AI/RAG pipelines and automation users. | Low-cost multi-feed parsing, normalization, batching and structured delivery. | Automation Lab currently shows about 147 total users / 40 MAU after roughly six months. | Free libraries, DIY cron/n8n workflows, feed readers and several inexpensive RSS Actors. | Apify-native batching, error isolation, scheduling and stable output reduce operational glue, but the underlying parsing problem is easy to solve elsewhere. | Customer-supplied public RSS/Atom/RDF feeds; standards-based HTTP/XML parsing and normalized dataset rows. | Minimal capability burden and very low variable cost. | [Automation Lab RSS Feed Reader](https://apify.com/automation-lab/rss-feed-reader), [case study](../../research/channels/apify/case-studies/rss-feed-reader-automation-lab.md) |
| Stateful keyword / brand news monitor | Buyers want only new mentions of a company, competitor or topic over time rather than repeatedly pulling full search result sets. | PR/comms teams, small agencies, founders, marketers and competitive-intelligence users. | Scheduled keyword monitoring with state, deduplication and incremental delivery/alerts. | Off-platform monitoring demand is established, but direct Store traction remains weak: HarvestLab's monitor shows only a handful of users and Google News Monitor products commonly show around 1 MAU. | Google Alerts, enterprise media-monitoring tools and scheduled generic Google News Actors. | Programmable state/new-only delivery could be useful, but Apify-specific willingness to pay for the monitoring layer remains unproven. | Google News/RSS queries plus persistent state, deduplication and scheduled incremental delivery. | Low-medium complexity; state and notification correctness add modest operating burden. | [HarvestLab](https://apify.com/harvestlab/news-monitor), [Google News Monitor](https://apify.com/sthiven_r/google-news-monitor) |
| Multi-source topic news aggregator with deduplication | Buyers want one clean topic feed across several public news sources rather than managing each feed/search separately. | Researchers, analysts, niche publishers, AI briefing workflows and content teams. | Combined topic feed with normalized records and duplicate reduction. | Dedicated current Apify aggregators reviewed remain around 0-1 MAU; adjacent RSS/Google News demand is stronger but does not directly validate the combined proposition. | DIY RSS aggregation, feed readers, Google News itself and generic automation tools. | Cross-source normalization/deduplication is useful, but incremental paid value over simple composition is not demonstrated. | Multiple RSS/Google News feeds; normalization, deduplication and structured output. | Low-medium complexity and low cost. | [News Monitor](https://apify.com/jedii_123/news-monitor), [News Aggregator](https://apify.com/ayeeyee/news-aggregator), [Master News Aggregator](https://apify.com/smart_tech_resources/master-news-aggregator) |
| News sentiment and event-clustering intelligence | Buyers want article streams converted into higher-level signals such as sentiment, entities, grouped events or executive summaries. | PR/communications, finance/research teams, competitive intelligence and AI workflows. | Higher-value interpreted news signals rather than raw article rows. | Direct Store evidence remains sparse; current enrichment/monitoring products typically show only a handful of active users despite ambitious positioning. | LLM workflows, enterprise media-intelligence tools and external news/intelligence APIs. | Higher theoretical buyer value, but Store-specific demand is not yet demonstrated and quality/cost burdens are materially higher. | News feeds/search plus NLP/LLM or external APIs, clustering and aggregation. | Highest capability burden in the candidate set due quality evaluation, model/API cost and richer operating logic. | [HarvestLab monitor](https://apify.com/harvestlab/news-monitor), [existing News/media research](../../research/channels/apify/overview.md) |

#### Candidate Demand Evidence

| Candidate opportunity | Customer job / outcome | Current alternative / workaround | Reason-to-buy hypothesis | Supporting evidence | Contrary / disconfirming evidence | Evidence links |
|---|---|---|---|---|---|---|
| Google News metadata search API | Turn a Google News query into structured rows usable by software. | Google News UI/RSS, DIY parsing, or one of many existing Apify Google News Actors. | A buyer will choose a new metadata Actor because it is cheaper, simpler or more reliable. | The category has large active usage and several lower-cost entrants have acquired some users. | There are many near-exact substitutes; resolved publisher URLs are increasingly expected; very recent metadata entrants have little early usage. The evidence proves category demand much more strongly than it proves a reason to choose this proposition. | [Data Xplorer](https://apify.com/data_xplorer/google-news-scraper-fast), [SolidCode](https://apify.com/solidcode/google-news-scraper), [Plainfetch](https://apify.com/plainfetch/google-news-scraper) |
| Google News enriched search API — real publisher URLs + optional full text | Discover relevant Google News coverage and pass usable publisher URLs/content directly into downstream monitoring, RAG or analysis. | Metadata Actor plus separate URL-resolution/article extraction; DIY decoder/extractor; existing enriched Actors. | A one-step Actor that reliably resolves publisher URLs and optionally returns article text removes meaningful integration work and is preferable to metadata-only output. | Crawler Bros and Memo23 have strong recent-entrant usage; several new Actors lead with real publisher URLs as the primary differentiator; Google redirect/broken-link handling is an explicit product/issue theme. | The feature is becoming more common, so it is not a permanent moat; full-text extraction is incomplete on paywalled/blocked sites and raises cost/operational complexity. | [Crawler Bros](https://apify.com/crawlerbros/google-news-scraper), [Memo23](https://apify.com/memo23/google-news-scraper), [Chorelet](https://apify.com/chorelet/google-news-scraper), [EasyApi broken-URL issue](https://apify.com/easyapi/google-news-scraper/issues/results-have-a-broke-obnNdrySgPcTUbdXg) |
| RSS/Atom normalization API | Convert heterogeneous feeds into stable machine-readable rows without maintaining feed-ingestion code. | Feed libraries, n8n/Make workflows, feed readers or direct XML parsing. | Apify-native normalization, batching and error handling are convenient enough to justify paid use. | Automation Lab has about 40 MAU and 147 total users. | The problem is easy to solve with free libraries and automation tools; direct revenue depth is likely modest. | [Automation Lab](https://apify.com/automation-lab/rss-feed-reader) |
| Stateful keyword / brand news monitor | Receive only new relevant mentions over time with minimal repeated processing. | Google Alerts, enterprise monitoring products, or scheduled generic Google News runs plus user-managed state. | A low-cost programmable monitor is more useful than generic alerts or manually managed state. | Monitoring is a well-established buyer job and multiple Store products attempt it. | Dedicated Apify monitors currently have negligible traction, so the paid Store demand is not demonstrated. | [HarvestLab](https://apify.com/harvestlab/news-monitor), [Google News Monitor](https://apify.com/sthiven_r/google-news-monitor) |
| Multi-source topic news aggregator with deduplication | Get a single normalized topic feed without configuring each source separately. | Feed readers, n8n/Make, Google News, or custom RSS composition. | Cross-source normalization and deduplication save enough integration work to justify a dedicated Actor. | The job is common in research/briefing workflows and is technically straightforward. | Dedicated Store products reviewed remain around 0-1 MAU; easy DIY composition is a strong substitute. | [News Monitor](https://apify.com/jedii_123/news-monitor), [News Aggregator](https://apify.com/ayeeyee/news-aggregator) |
| News sentiment and event-clustering intelligence | Convert raw news into interpreted signals that reduce analyst reading/triage. | LLM prompts/pipelines, external intelligence APIs and enterprise monitoring platforms. | Turnkey structured intelligence saves enough analytical work to support premium usage. | The underlying buyer outcome has obvious value and many external products target it. | Direct Apify usage is sparse; quality expectations, model cost and domain specificity make the value difficult to establish cheaply. | [HarvestLab](https://apify.com/harvestlab/news-monitor), [existing News/media research](../../research/channels/apify/overview.md) |

### Step 4 Completion

**Step 4 complete:** Yes

**Step 4 blockers:** None

## 3. POC Opportunity Assessment and Shortlist

*Methodology mapping: Phase 2, Step 5 — Assess and Shortlist POC Opportunities.*

The existing ten-dimension assessment was rechecked against the refreshed demand evidence. Scores are changed only where the stronger proposition-level evidence materially changes the conclusion.

### Market Attractiveness Assessment

Higher score = more attractive. For **Competitive pressure**, higher means lower/more favourable pressure.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| Google News metadata search API | Paying demand | 5 | High | Established Google News Actors still show hundreds of MAU. |
| Google News metadata search API | Opportunity density | 4 | High | Monitoring, research, aggregation, SEO and AI workflows all consume structured news results. |
| Google News metadata search API | New-entrant attainability | 3 | Medium | Some recent entrants gain users, but current very-new metadata products remain near 1 MAU and the strongest newer Actors increasingly include richer URL/content features. |
| Google News metadata search API | Revenue potential | 4 | Medium | Paid usage exists across a broad price range, but paid result volumes are private. |
| Google News metadata search API | Competitive pressure | 1 | High | Supply is now extremely dense and near-exact substitutes are available at very low prices. |
| Google News enriched search API — real publisher URLs + optional full text | Paying demand | 4 | High | Crawler Bros (~104 MAU) and Memo23 (~42 MAU) provide direct behavioural evidence for enriched Google News output. |
| Google News enriched search API — real publisher URLs + optional full text | Opportunity density | 4 | High | Resolved URLs/full text support monitoring, RAG, research, briefing, classification and summarisation workflows. |
| Google News enriched search API — real publisher URLs + optional full text | New-entrant attainability | 4 | High | Multiple products launched within roughly 3-6 months have acquired meaningful active usage, although outcomes vary widely. |
| Google News enriched search API — real publisher URLs + optional full text | Revenue potential | 4 | Medium | Enrichment supports roughly $1-$3+/1K pricing in current products, but paid volume remains private. |
| Google News enriched search API — real publisher URLs + optional full text | Competitive pressure | 2 | High | Enrichment is less commoditised than metadata-only extraction but is rapidly becoming a standard differentiator. |
| RSS/Atom normalization API | Paying demand | 3 | High | Automation Lab has about 40 MAU; paid utility exists but is materially smaller than Google News. |
| RSS/Atom normalization API | Opportunity density | 4 | Medium | News, blogs, podcasts, changelogs and AI ingestion all use feed normalization. |
| RSS/Atom normalization API | New-entrant attainability | 3 | Medium | One recent product has meaningful usage while other newer entrants remain small. |
| RSS/Atom normalization API | Revenue potential | 2 | Medium | Strong free/DIY substitution constrains likely spend. |
| RSS/Atom normalization API | Competitive pressure | 2 | High | Free libraries and workflow tools are strong substitutes. |
| Stateful keyword / brand news monitor | Paying demand | 3 | Medium | Underlying monitoring demand is established, but direct Apify usage remains weak. |
| Stateful keyword / brand news monitor | Opportunity density | 4 | Medium | Brand, competitor, topic and event monitoring provide many recurring queries. |
| Stateful keyword / brand news monitor | New-entrant attainability | 2 | Medium | Current dedicated entrants have not demonstrated meaningful traction. |
| Stateful keyword / brand news monitor | Revenue potential | 3 | Low | Off-platform willingness to pay is clear, but Apify-specific depth is not. |
| Stateful keyword / brand news monitor | Competitive pressure | 3 | Medium | Google Alerts and enterprise suites are strong substitutes, with a plausible programmable niche. |
| Multi-source topic news aggregator with deduplication | Paying demand | 2 | Medium | Dedicated Apify aggregators reviewed remain around 0-1 MAU. |
| Multi-source topic news aggregator with deduplication | Opportunity density | 4 | Medium | Many briefing/monitoring workflows need aggregation and deduplication. |
| Multi-source topic news aggregator with deduplication | New-entrant attainability | 2 | Medium | Recent dedicated entrants have not shown meaningful traction. |
| Multi-source topic news aggregator with deduplication | Revenue potential | 2 | Low | Easy DIY composition limits evidence of paid depth. |
| Multi-source topic news aggregator with deduplication | Competitive pressure | 3 | Medium | Direct Store competition is limited, but substitutes are abundant. |
| News sentiment and event-clustering intelligence | Paying demand | 2 | Medium | Direct Store traction remains minimal. |
| News sentiment and event-clustering intelligence | Opportunity density | 3 | Medium | PR, finance, research and intelligence workflows can use these signals. |
| News sentiment and event-clustering intelligence | New-entrant attainability | 2 | Medium | Recent entrants have not demonstrated meaningful Store traction. |
| News sentiment and event-clustering intelligence | Revenue potential | 3 | Low | Premium value is plausible but unproven in this channel. |
| News sentiment and event-clustering intelligence | Competitive pressure | 3 | Medium | External APIs, enterprise tools and generic LLM workflows compete strongly. |

### Capability Assessment

Higher score = more demanding.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| Google News metadata search API | Technical complexity | 2 | High | Lightweight HTTP/RSS/search parsing, filters and normalization are sufficient. |
| Google News metadata search API | Domain expertise | 2 | High | Requires query, locale, recency and news-result knowledge but no specialist domain expertise. |
| Google News metadata search API | Data / resource access | 1 | High | Public Google News surfaces; no proprietary dataset or customer credentials are intrinsic. |
| Google News metadata search API | Operating complexity | 2 | Medium | Source behaviour can change, but there is one main source and no enrichment chain. |
| Google News metadata search API | Cost intensity | 1 | High | HTTP/feed extraction can run without proprietary data or intrinsic proxy spend. |
| Google News enriched search API — real publisher URLs + optional full text | Technical complexity | 3 | High | URL resolution plus optional publisher extraction adds parsing/fallback logic beyond metadata-only search. |
| Google News enriched search API — real publisher URLs + optional full text | Domain expertise | 2 | High | News/query and article-content knowledge is sufficient. |
| Google News enriched search API — real publisher URLs + optional full text | Data / resource access | 1 | High | Google News and publisher pages are public inputs; no licensed dataset is intrinsic. |
| Google News enriched search API — real publisher URLs + optional full text | Operating complexity | 3 | High | Publisher variability and partial extraction failures create a broader maintenance surface. |
| Google News enriched search API — real publisher URLs + optional full text | Cost intensity | 2 | Medium | Extra page fetches/retries increase compute/network cost and some publishers may require heavier fallbacks. |
| RSS/Atom normalization API | Technical complexity | 1 | High | Standards-based feed retrieval, parsing and normalization are bounded. |
| RSS/Atom normalization API | Domain expertise | 1 | High | General feed/data-normalization knowledge is sufficient. |
| RSS/Atom normalization API | Data / resource access | 1 | High | Customer-supplied public feeds require no special access. |
| RSS/Atom normalization API | Operating complexity | 1 | High | Maintenance centres on malformed feeds and protocol edge cases. |
| RSS/Atom normalization API | Cost intensity | 1 | High | Lightweight HTTP/XML work has no intrinsic proxy/licence cost. |
| Stateful keyword / brand news monitor | Technical complexity | 2 | High | Adds state, deduplication and scheduling to lightweight collection. |
| Stateful keyword / brand news monitor | Domain expertise | 2 | Medium | Needs monitoring semantics and query design. |
| Stateful keyword / brand news monitor | Data / resource access | 1 | High | Public feeds/search plus Apify storage are sufficient. |
| Stateful keyword / brand news monitor | Operating complexity | 2 | Medium | Stateful checkpoints and notification correctness add modest burden. |
| Stateful keyword / brand news monitor | Cost intensity | 1 | High | Scheduled HTTP collection remains inexpensive. |
| Multi-source topic news aggregator with deduplication | Technical complexity | 2 | High | Multiple feeds plus normalization/deduplication are bounded. |
| Multi-source topic news aggregator with deduplication | Domain expertise | 2 | Medium | Requires topic/query and duplicate decisions but little specialist knowledge. |
| Multi-source topic news aggregator with deduplication | Data / resource access | 1 | High | Public feeds/search surfaces are sufficient. |
| Multi-source topic news aggregator with deduplication | Operating complexity | 2 | Medium | Multiple sources create partial-failure handling. |
| Multi-source topic news aggregator with deduplication | Cost intensity | 1 | High | Primarily lightweight HTTP and parsing. |
| News sentiment and event-clustering intelligence | Technical complexity | 3 | Medium | Classification/clustering materially expand product logic. |
| News sentiment and event-clustering intelligence | Domain expertise | 3 | Medium | Useful interpretation requires stronger semantic/domain judgement. |
| News sentiment and event-clustering intelligence | Data / resource access | 2 | Medium | Richer products may rely on model/news APIs. |
| News sentiment and event-clustering intelligence | Operating complexity | 3 | Medium | Model quality and dependency behaviour require more monitoring. |
| News sentiment and event-clustering intelligence | Cost intensity | 3 | Medium | Model/API inference can become a material variable cost. |

### Shortlist

| Candidate opportunity | Market evidence potential | POC capability suitability | Decision | Rationale |
|---|---|---|---|---|
| Google News metadata search API | Category demand is high, but proposition-specific reason-to-buy evidence is weak. | Very high: technically cheap and bounded. | Excluded | Under the new method, low implementation cost cannot substitute for a reason to buy. A new metadata-only Actor is surrounded by cheaper/richer substitutes and the critical reason-to-buy precondition is not adequately supported. |
| Google News enriched search API — real publisher URLs + optional full text | High-medium: multiple recent enriched entrants show meaningful active usage and direct links solve an identifiable workflow problem. | Medium-high: still inexpensive enough for a POC, with optional full text providing a bounded richer layer. | Shortlisted | This is the strongest combination of observable entrant behaviour and a concrete buyer improvement over metadata-only output. |
| RSS/Atom normalization API | Medium: about 40 MAU proves real utility but likely revenue depth is lower. | Very high: simplest and cheapest candidate. | Shortlisted | Clears the evidence bar and provides a defensible convenience proposition, though free substitution and revenue depth remain material risks. |
| Stateful keyword / brand news monitor | Medium-low: underlying need is real but direct Store traction is weak. | High. | Excluded | Critical Apify-specific demand precondition remains weakly evidenced. |
| Multi-source topic news aggregator with deduplication | Low-medium. | High. | Excluded | Candidate-specific paid demand remains too weak despite easy implementation. |
| News sentiment and event-clustering intelligence | Low-medium. | Low-medium. | Excluded | Direct demand evidence is weak while implementation/quality burden is materially higher. |

#### Critical Assumption Stress Test

| Candidate opportunity | Assumption ID | Assumption | Classification | Importance | Evidence grade | Supporting / contrary evidence | Disposition |
|---|---|---|---|---|---|---|---|
| Google News metadata search API | M1 | Buyers will choose another metadata-only Google News Actor because price/reliability/usability are sufficient differentiation. | Precondition | Critical | E1 | Strong category demand exists, but direct differentiation evidence is weak; numerous low-price/richer substitutes and very-low-traction new entrants cut against the assumption. | Blocking |
| Google News enriched search API — real publisher URLs + optional full text | E1 | Resolved publisher URLs and integrated optional article text solve enough downstream integration pain to influence Actor choice. | Precondition | Critical | E3 | Crawler Bros (~104 MAU) and Memo23 (~42 MAU) are close behavioural analogues; several new products explicitly sell real URLs as their headline benefit. The feature is becoming common, which limits durability but not current relevance. | Supported |
| Google News enriched search API — real publisher URLs + optional full text | E2 | A new entrant with this proposition can attract observable users despite increasing competition. | POC test | Critical | E3 | Recent enriched entrants demonstrate attainable usage, but outcomes range from ~1 MAU to >100 MAU and launch-month distribution is not publicly observable. | Test in POC |
| Google News enriched search API — real publisher URLs + optional full text | E3 | Real-URL resolution can be reliable and optional full-text extraction can fail softly without making the product operationally heavy. | POC test | Material | E2 | Multiple Actors advertise pure-HTTP/no-proxy or best-effort approaches, but publisher/paywall variability and partial body retrieval are explicitly documented. | Test in POC |
| RSS/Atom normalization API | R1 | Buyers value Apify-native feed normalization/batching enough to use a paid Actor instead of free libraries/workflows. | Precondition | Critical | E3 | Automation Lab's ~40 MAU is direct close-analogue behaviour. Free substitutes remain abundant. | Supported |
| RSS/Atom normalization API | R2 | A new RSS normalization entrant can acquire enough usage to make a first POC informative. | POC test | Critical | E2 | One recent product has meaningful usage, while several newer products remain near 1 MAU. Evidence supports experimentation but not a strong forecast. | Test in POC |
| Stateful keyword / brand news monitor | N1 | Apify buyers will pay/use a dedicated stateful monitor instead of scheduling a generic search Actor or using Google Alerts. | Precondition | Critical | E1 | Off-platform need is clear, but direct Store products remain at only a handful of users. | Blocking |
| Multi-source topic news aggregator with deduplication | A1 | Cross-source aggregation/deduplication is valuable enough on Apify to beat easy DIY composition. | Precondition | Critical | E1 | Adjacent demand exists, but direct aggregator products reviewed remain around 0-1 MAU. | Blocking |
| News sentiment and event-clustering intelligence | S1 | Apify buyers will pay for a generic interpreted-news layer without a more specific vertical/workflow proposition. | Precondition | Critical | E1 | External market value is plausible, but direct Store traction remains sparse and generic LLM/API substitutes are strong. | Blocking |

### Step 5 Completion

**Step 5 complete:** Yes

**Step 5 blockers:** None

## 4. POC Opportunity Selection

*Methodology mapping: Phase 2, Step 6 — Select the POC Opportunity.*

The refreshed selection is made only from candidates that passed the Step 5 assumption stress test.

### Shortlist Comparison

| Candidate opportunity | Market-attractiveness summary | Capability-requirements summary | Expected POC evidence | POC complexity / cost | Decision |
|---|---|---|---|---|---|
| Google News enriched search API — real publisher URLs + optional full text | Strong current behavioural evidence from recent entrants; clearer buyer improvement than metadata-only output; market dimensions 4/4/4/4/2. | Moderate burden: 3/2/1/3/2. Real-URL resolution remains bounded; optional full text adds variability but can fail softly. | Whether a newly published enriched Google News Actor can attract users and paid/repeat behaviour; whether resolved URLs/full text can remain reliable and inexpensive enough for a small product. | Low-medium. Still suitable for a bounded first POC, but materially richer than the current metadata-only implementation. | Selected |
| RSS/Atom normalization API | Real but smaller direct demand; market dimensions 3/4/3/2/2. | Minimal burden: 1/1/1/1/1. | Whether convenience/normalization alone can overcome free/DIY substitution and produce observable paid usage. | Very low. | Deferred |

### Selected Opportunity

**Selected opportunity:** Google News enriched search API — real publisher URLs + optional full text

**Buyer problem:** Buyers can retrieve Google News headlines relatively easily, but Google News redirect URLs and the need to separately resolve/fetch publisher pages create additional integration steps before articles can be used reliably in monitoring, RAG, research or downstream analysis.

**Target user:** Developers, researchers, media-monitoring/PR users and AI/data workflows that need Google News discovery in a directly consumable downstream form.

**Core value proposition:** An Apify-native Google News search API that returns structured metadata plus resolved publisher URLs, with optional best-effort article text, so a buyer can move from query to usable publisher-level data without assembling multiple tools.

**Market assumptions to test:** Resolved publisher URLs materially improve the buyer workflow; a new entrant can still acquire measurable usage despite a growing number of enriched competitors; optional full-text capability increases usefulness without needing to be perfect for every publisher; some observed usage converts into repeat and paid behaviour.

**Capability assumptions to test:** Publisher URL resolution can be implemented with a bounded, primarily HTTP-based method; unresolved links can fail softly without invalidating the run; optional full-text extraction can return useful coverage while tolerating paywalls/blocked publishers; the additional requests and fallbacks remain operationally and economically proportionate.

**Selection rationale:** The new demand-validation method changes the result. The previous metadata-only Google News selection had strong category demand but no sufficiently evidenced reason for buyers to choose another near-identical Actor. The enriched proposition has materially stronger proposition-specific evidence: recent Actors that resolve publisher URLs and/or return article bodies have acquired meaningful usage, and the redirect/broken-link problem is explicitly visible in competitor positioning and issue history. RSS normalization remains a credible lower-complexity alternative, but its demand/revenue depth is weaker. The enriched Google News proposition therefore provides the strongest evidence-backed reason to buy while remaining small enough for a bounded POC.

**Selection date:** 2026-09-26

#### Selected Opportunity Demand Case

**Customer / job:** A developer, analyst or monitoring/AI workflow needs to search Google News and immediately pass usable publisher-level article data into another process.

**Current alternative / workaround:** Use Google News RSS or a metadata-only Actor, then separately resolve Google redirect links and, when required, run another article-extraction step; alternatively use one of the existing enriched Google News Actors.

**Reason to buy / choose:** A single Actor that combines Google News discovery with dependable publisher-URL resolution and optional fail-soft article text reduces orchestration, avoids unusable Google redirect links and produces data closer to the buyer's downstream task. The POC must still test whether execution quality, pricing and usability are good enough to win usage against existing enriched Actors.

**Reference-class basis:** Recent enriched Google News entrants provide the closest observable reference class. Crawler Bros (about six months old) currently shows roughly 466 total users / 104 MAU; Memo23 (about three months) roughly 74 / 42 MAU. Outcomes are not uniformly strong: Dami Studio, also around three months old, shows only about 4 total users / 1 MAU, while Chorelet, published about five days ago, shows about 2 total users / 1 MAU. This wide dispersion supports a deliberately broad launch forecast rather than assuming the successful entrants are representative.

**Market engagement hypothesis:** During the first 30 days of a public paid listing, a credible enriched Google News Actor should attract approximately **6 independent external users in the base case**, with a plausible range of roughly **2-15**, and should produce at least some repeat execution and approximately one paid-plan user if the proposition has real commercial pull.

#### Demand Forecast

| Metric | Observation window | Low | Base | High | Reference-class / derivation | Confidence |
|---|---|---:|---:|---:|---|---|
| Independent external users | First 30 days | 2 | 6 | 15 | Very-new enriched entrants show ~1 MAU within the first week; 3-6 month outcomes range from ~1 to >100 MAU. The base deliberately reflects early-stage acquisition rather than mature MAU. | Low |
| Successful external runs beyond one initial run per new user | First 30 days | 0 | 4 | 12 | Repeat-run behaviour is not public for reference Actors; range is anchored to the expectation that only a subset of initial users will repeat. | Low |
| External paid-plan users generating positive creator revenue | First 30 days | 0 | 1 | 3 | Public Actor pages do not disclose paid conversion. Established paid pricing and active usage show monetisation is possible, but launch conversion is unknown. | Low |

### Step 6 Completion

**Step 6 complete:** Yes

**Step 6 blockers:** None

## 5. Gateway 2 — POC Opportunity Selected

**Decision:** Pass

**Rationale:** Steps 3–6 are complete under **Demand validation v1**. News & media intelligence remains the selected opportunity area, but the specific opportunity has changed. The metadata-only Google News proposition is excluded because its critical reason-to-buy precondition is supported only by weak proposition-specific evidence despite strong category demand. The selected enriched Google News proposition has an explicit customer job and current alternative, E3 close-analogue evidence supporting the reason-to-buy precondition, no Blocking/Rejected critical assumption, and a low/base/high 30-day demand forecast. Remaining uncertainty — entrant acquisition, repeat use, paid conversion and fail-soft enrichment reliability — is appropriate for a bounded POC to test rather than a reason to reject the proposition before implementation.

The Gateway 2 **Pass does not validate the existing Phase 3/4 Google News metadata POC definition or implementation**. Those downstream artifacts were created for the superseded metadata-only proposition and must be explicitly reassessed before implementation or observation continues.

A Pass requires Steps 3–6 to be complete, exactly one Step 6 candidate to be Selected, no unresolved blocker preventing Phase 3, no Blocking/Rejected critical assumption for the selected candidate, and a substantive reason-to-buy, reference-class demand forecast and quantified market-engagement hypothesis.

## 6. POC Definition

*Methodology mapping: Phase 3, Step 7 — Define the POC.*

Define the smallest credible commercial experiment that can test the selected opportunity's market and capability assumptions. Production architecture, production pricing and production operating requirements remain outside this step.

### Experiment Definition

**POC objective:** Determine whether a new Apify Google News Actor that returns **resolved publisher URLs by default** and offers **optional best-effort full article text** can attract observable external usage, repeat use and at least some paid demand while remaining technically reliable, operationally bounded and economically viable without mandatory browser automation, residential proxies or paid external data APIs.

**Primary POC user:** Developers, researchers, media-monitoring/PR users and AI/data workflows that need Google News discovery in a form that can be passed directly into downstream processing without separately resolving Google redirect URLs.

**Experiment mode:** Public paid Apify Store POC. External users can discover and run the Actor through Apify UI/API and receive results through the default dataset. The experiment tests a real commercial proposition but does not imply production readiness or final production pricing.

**Observation window:** 30 consecutive days beginning only after the Actor is publicly listed, charging is active, the launch baseline has been captured and all Gateway 3 pre-observation requirements are closed.

**POC commercial parameter:** Temporary pay-per-event pricing of **$2.00 per 1,000 delivered article records with resolved publisher URL attempts**, plus **$2.00 per 1,000 successful full-text enrichments** when full text is requested. Failed full-text extraction is not charged as a full-text event. This keeps the experiment within the current enriched-Google-News price range rather than testing an obvious price disadvantage. Current reference products span roughly $1-$3 per 1,000 article results, with optional/full-text enrichment commonly adding further usage charges.

### Functional Scope

| Scope item | Status | Definition / rationale |
|---|---|---|
| Query-driven Google News search | In scope | Execute user-supplied Google News search expressions and return structured article results. |
| Multiple queries per run | In scope | Support 1-20 queries in one run so the Actor is useful for automation while remaining bounded. |
| Locale control | In scope | Support language and country/edition controls required for realistic Google News use. |
| Recency control | In scope | Support a bounded set of common recency windows sufficient for current-news workflows. |
| Per-query result limit | In scope | Support 1-100 Google News results per query; the POC does not add time-slicing or pagination mechanisms to exceed the normal feed boundary. |
| Cross-query deduplication | In scope | Remove obvious duplicate records across queries while retaining the first matching-query context. |
| Publisher URL resolution | In scope | Attempt to resolve every Google News article link to the real publisher URL. This is the core differentiated capability selected at Gateway 2. |
| Resolution status/fallback | In scope | Preserve the Google News URL and explicit resolution status when a publisher URL cannot be resolved; individual resolution failure must not fail the whole run. |
| Optional full-text extraction | In scope | When requested, make a bounded HTTP fetch of the resolved publisher page and attempt readable article-text extraction. Failure is recorded per row and is not fatal to the run. |
| Full-text status | In scope | Return an explicit success/failure status and reason so downstream users can distinguish unavailable text from successful enrichment. |
| Apify dataset/API delivery | In scope | Store normalized records in the default dataset and expose them through standard Apify API/export mechanisms. |
| Input/output schemas and concise Store README | In scope | Make the Actor self-describing and runnable by an external user without separate setup assistance. |
| Browser-rendered article extraction | Out of scope | The POC tests whether useful full-text coverage can be achieved with bounded HTTP extraction. Browser automation would materially change capability and cost assumptions. |
| Paywall bypass | Out of scope | Paywalled content remains unavailable; the Actor records extraction failure rather than attempting circumvention. |
| Residential proxy dependency | Out of scope | The selected proposition assumes no mandatory residential-proxy spend. If it becomes necessary, that is evidence against the capability hypothesis. |
| Paid external extraction/news API | Out of scope | No mandatory third-party paid data or article-extraction service may be introduced during this POC. |
| Stateful monitoring / only-new mode | Out of scope | This remains a separate proposition and would change the market experiment. |
| Multi-source news aggregation | Out of scope | The POC remains Google News-specific. |
| Sentiment, entities, clustering or AI summarisation | Out of scope | These are separate higher-complexity value layers and are not required to test the selected proposition. |

### Inputs

| Input | Required | Type / allowed values | Default / bound | Purpose |
|---|---|---|---|---|
| `queries` | Yes | Array of non-empty strings | 1-20 queries | Defines Google News searches; native Google News operators may be passed through. |
| `maxItemsPerQuery` | No | Integer | Default 20; min 1; max 100 | Bounds output, run duration and POC cost. |
| `language` | No | Supported locale/language string | Default `en-GB` | Selects the Google News language context. |
| `country` | No | Supported two-letter country/edition code | Default `GB` | Selects the regional Google News edition. |
| `dateRange` | No | `any`, `1h`, `6h`, `1d`, `7d`, `30d` | Default `7d` | Provides bounded recency control. |
| `dedupe` | No | Boolean | Default `true` | Removes repeated articles across queries. |
| `resolvePublisherUrls` | No | Boolean | Default `true` | Enables the core publisher-URL resolution capability; may be disabled for diagnostic comparison. |
| `includeFullText` | No | Boolean | Default `false` | Requests best-effort full-text extraction after publisher URL resolution. |

### Outputs

| Output | Required | Definition |
|---|---|---|
| `query` | Yes | Search expression that produced the record. |
| `title` | Yes | Article headline returned by Google News. |
| `sourceName` | Yes | Publisher/source name supplied by Google News. |
| `publishedAt` | Yes | Publication timestamp supplied by Google News, normalized where possible. |
| `snippet` | No | Google News summary/snippet where available. |
| `googleNewsUrl` | Yes | Original Google News article URL retained as provenance/fallback. |
| `publisherUrl` | No | Resolved real publisher article URL when resolution succeeds. |
| `urlResolved` | Yes | Boolean indicating whether publisher URL resolution succeeded. |
| `urlResolutionStatus` | Yes | Machine-readable status/reason for resolution success or failure. |
| `publisherDomain` | No | Domain derived from the resolved publisher URL where available. |
| `articleText` | No | Readable article body when `includeFullText=true` and extraction succeeds. |
| `fullTextStatus` | No | Explicit success/failure/not-requested status for full-text enrichment. |
| `wordCount` | No | Word count for successfully extracted article text. |
| `scrapedAt` | Yes | Timestamp at which the POC produced the record. |

### Dependencies and Constraints

| Dependency / constraint | POC implication | Boundary / response |
|---|---|---|
| Google News result/feed availability | Search results, locale behaviour and recency semantics depend on Google News. | Treat source change or feed unavailability as dependency evidence; do not add browser scraping merely to preserve the experiment. |
| Google News publisher-link encoding / redirect behaviour | The core differentiated capability depends on reliably resolving Google links. | Measure resolution success explicitly. Preserve the Google URL and fail per row rather than failing the run. |
| Publisher-page variability | Optional article text may be blocked, paywalled, JavaScript-rendered or structurally unusual. | Full text is best-effort and fail-soft. No paywall bypass or browser fallback is introduced during the POC. |
| Google News per-query result ceiling | A query commonly exposes a bounded result set rather than arbitrary pagination. | Keep the POC at 100 results/query maximum; exceeding this through date slicing is outside scope. |
| Apify runtime/dataset/API | Execution, storage, delivery, charging and monitoring depend on Apify channel mechanics. | Step 8 must map each market/capability criterion to observable Apify evidence before Gateway 3. |
| External resource cost | The hypothesis assumes lightweight HTTP execution with no mandatory proxy or paid extraction dependency. | If a mandatory heavy dependency is required for the core proposition, treat it as capability evidence against the POC rather than silently expanding scope. |

### Success and Exit Criteria

| Dimension | Criterion | Threshold / decision rule |
|---|---|---|
| Market | Independent external users | **Success:** at least 6 distinct non-owner external users during the 30-day window. **Bounded-iteration zone:** 2-5. **Exit signal:** fewer than 2. |
| Market | Repeat-use signal | At least 4 successful external runs beyond a one-initial-run-per-new-user baseline during the 30-day window. |
| Market | Paid demand | At least 1 external paid-plan user generates positive creator revenue during the 30-day window. |
| Capability | Valid-input run reliability | At least 95% of valid-input POC runs succeed without Actor/source failure. |
| Capability | Core metadata completeness | At least 98% of returned records contain `title`, `sourceName`, `publishedAt`, `googleNewsUrl`, `urlResolved` and `urlResolutionStatus`. |
| Capability | Publisher URL resolution | At least 95% of returned Google News article rows resolve to a syntactically valid non-Google publisher URL across the defined representative validation sample. |
| Capability | Full-text usefulness | With full text requested, at least 50% of a representative mixed-publisher sample yields non-empty readable `articleText`; every failure must remain row-level/fail-soft rather than failing the run. |
| Capability | Lightweight dependency model | Core search + URL-resolution functionality operates without mandatory browser automation, residential proxies or paid external data/extraction APIs. |
| Capability | Unit economics | Representative paid runs generate positive creator margin and platform/direct execution cost remains no more than 40% of net creator revenue under the temporary POC price. |

#### Market Test Cards

Translate the material market assumptions and Step 6 demand forecast into precommitted tests before observation begins.

| Test ID | Hypothesis | Experiment | Measure | Precommitted threshold | Demand-case reference |
|---|---|---|---|---|---|
| M1 | A new enriched Google News Actor can attract observable external users despite increasing competition. | Publish the bounded paid Actor for 30 consecutive days without experiment-changing feature or pricing changes. | Distinct non-owner external users acquired during the window. | **>=6** for success; **2-5** supports bounded iteration; **<2** is evidence against continuing this proposition. | Step 6 independent-user forecast: low 2 / base 6 / high 15. |
| M2 | The proposition produces behaviour beyond one-off trial usage. | Observe successful external runs during the same unchanged 30-day experiment. | Successful external runs beyond one initial run per new external user. | **>=4** additional successful runs. | Step 6 repeat-run forecast: low 0 / base 4 / high 12. |
| M3 | Some users value the proposition enough to generate paid usage. | Run the public Actor with temporary POC charging active for the entire observation window. | External paid-plan users producing positive creator revenue. | **>=1** paid external user. | Step 6 paid-user forecast: low 0 / base 1 / high 3. |

**POC success rule:** Market success requires M1 at or above the base forecast (**>=6 external users**), M2 at or above the base forecast (**>=4 additional successful runs**) and M3 at or above the base forecast (**>=1 paid external user**). Capability success requires all capability criteria above to pass. Meeting these criteria supports progression to Gateway 4 evaluation; it does not itself authorize productisation.

**Bounded iteration rule:** One bounded iteration may be justified when at least **2 external users** are observed and the proposition shows some engagement or paid signal, but one or more base market thresholds are missed; or when a capability criterion narrowly misses because of a fixable implementation defect that does not change the selected proposition, mandatory dependency model or temporary commercial parameters. Any material buyer-facing feature expansion, change from optional/fail-soft full text to a heavier extraction proposition, or material pricing/distribution change requires redefining the experiment rather than treating it as a bounded fix.

**Exit / stop rule:** Stop this POC without further implementation expansion when fewer than **2 external users** are observed after the full 30-day window; when no credible reason remains to expect external acquisition after the bounded iteration rule is considered; when publisher-URL resolution cannot meet the defined criterion without a materially heavier dependency model; when optional full-text extraction cannot provide useful fail-soft coverage without materially changing the proposition; or when representative paid economics remain structurally negative / above the cost threshold after implementation defects are excluded.

### Step 7 Completion

**Step 7 complete:** Yes

**Step 7 blockers:** None

## 7. POC Operational Requirements

*Methodology mapping: Phase 3, Step 8 — Define POC Operational Requirements.*

The operating layer remains intentionally lightweight and uses Apify-native evidence wherever possible. The purpose is to make every Step 7 market and capability criterion reproducible without building a separate production monitoring stack.

**Operational evidence basis:** [Apify Actor monitoring](https://docs.apify.com/actors/running/monitoring); [Actor analytics and monetisation](https://docs.apify.com/actors/publishing/monetize); [Actor statistics / Get Actor API](https://docs.apify.com/api/v2/actor-get); [default dataset statistics](https://docs.apify.com/api/v2/actor-run-dataset-statistics-get); [pay-per-event pricing](https://docs.apify.com/actors/publishing/monetize/pay-per-event); [Actor pricing and costs](https://docs.apify.com/actors/publishing/monetize/pricing-and-costs).

Apify Actor Analytics provides user-growth, paid/free-user, revenue, cost, profit, run-success and acquisition-funnel metrics and can export the analytics as JSON. Actor statistics expose total-user counts and, for public Actors, 30-day run-status counts that exclude runs started by the Actor owner. Dataset statistics expose field-level null/empty counts for schema fields. These native sources are sufficient for the POC when combined with a small owner-run capability validation sample.

### Operational Requirements

| Operational concern | Signal / evidence | Mechanism | Trigger / review rule | Required response |
|---|---|---|---|---|
| Run health / reliability | Run terminal status, success-rate trend, logs and run detail | Apify built-in monitoring, Actor Analytics and run history/API | Review every `FAILED` or `TIMED-OUT` run. Pause if three consecutive valid-input runs fail for an Actor/source reason or if observed valid-input reliability drops below 90% before the final 95% criterion. User/spending-limit aborts are classified separately. | Inspect logs/input and classify user/platform/Actor/source cause. Apply only an in-scope bounded fix. Resume after the failure mode is cleared and a verification run succeeds. |
| Google News dependency health | Successful feed/search response, result structure, locale/recency controls and publisher-link encoding | Daily owner canary plus run logs | One owner canary each day using a broad query with URL resolution enabled. Investigate any parser failure, systematic empty result, broken locale/recency control or resolution-format change. | Confirm whether Google News behaviour changed. Fix bounded request/parser/resolution logic only; do not introduce browser scraping or a paid external data source to preserve the experiment. |
| Core metadata completeness | Presence/non-empty rate for `title`, `sourceName`, `publishedAt`, `googleNewsUrl`, `urlResolved`, `urlResolutionStatus` | Dataset schema field statistics plus validation-sample export | Final criterion is >=98%. Investigate any validation cycle below 98% or any systematic malformed field. | Correct schema/normalisation defects within scope. Record affected runs and verification evidence. |
| Publisher URL resolution quality | `urlResolved=true`, valid non-Google `publisherUrl`, resolution status/reason | Owner-run capability validation sample and exported dataset | Twice-weekly fixed capability sample: 100 rows total using five broad news queries across GB and US English editions, 10 results per query/edition. Final criterion is >=95% successful valid publisher-URL resolution across the retained evaluation samples. | Inspect failures by resolution status and publisher pattern. Correct bounded decoder/redirect/canonical logic. Pause if resolution falls below 85% in two consecutive validation cycles or requires an excluded heavy dependency. |
| Optional full-text usefulness | `fullTextStatus`, non-empty readable `articleText`, `wordCount` | Same twice-weekly capability sample with `includeFullText=true`; dataset export/sample review | Final criterion is >=50% successful readable extraction across the representative mixed-publisher sample. Investigate any cycle below 40% or any run-level failure caused by an individual publisher. | Fix generic extraction/encoding/readability defects only. Preserve fail-soft per-row behaviour. Do not add browser rendering, paywall bypass or publisher-specific heavy infrastructure during this POC. |
| Fail-soft enrichment behaviour | Resolution/full-text failure remains row-level while run completes and fallback fields remain available | Capability sample, run status/logs and targeted negative cases | Any individual publisher failure that crashes the run, removes the Google News fallback URL or makes the dataset unusable is a POC defect. | Correct error isolation and status reporting before continued observation. |
| Lightweight dependency model | Absence of mandatory browser, residential proxy and paid external extraction/news API use | Build/runtime configuration, environment/config review and run evidence | Check before launch and after every material implementation change. Any mandatory excluded dependency is a Step 7 capability failure/experiment-change condition. | Stop normal implementation expansion and return to the bounded-iteration/exit decision rather than silently adding the dependency. |
| User acquisition — Market Test M1 | New external Actor users during the observation window | Actor Analytics user-growth export as authoritative evidence; Actor `totalUsers` launch-to-final delta as cross-check | Capture baseline immediately before public launch and final snapshot at day 30. Success >=6; bounded-iteration zone 2-5; exit signal <2. Owner already exists at baseline and owner activity is excluded from the delta interpretation. | Record only; weak acquisition is market evidence, not an operational defect. Do not change pricing/features/distribution during the same window to manufacture usage. |
| Repeat-use signal — Market Test M2 | Successful public runs beyond one initial successful run per new external user | Actor Analytics run/user evidence; public Actor 30-day `SUCCEEDED` count, which excludes owner runs, as cross-check | Final calculation: successful external runs minus external-user count. Success >=4 additional runs. If pre-launch external traffic exists, use the date-filtered Analytics export rather than relying on the rolling public counter. | Record only; do not prompt artificial repeat runs or alter scope during the window. |
| Paid demand — Market Test M3 | Paid users, creator revenue and profit | Actor Analytics paid/free-user and revenue/profit metrics; pricing/run charge evidence | Review after first paid external usage and at each periodic review. Success >=1 external paid-plan user producing positive creator revenue. | Record the evidence. Lack of paid use is market evidence rather than a billing defect. |
| Charging correctness / spending limits | Charged event counts, run price, accessible output, max-total-charge behaviour | PPE charge results, run detail, Billing/Historical usage and targeted pre-launch pricing test | Any charge without accessible result, uncharged delivered paid event, duplicate charge, or failure to stop gracefully at spending limit is blocking. | Pause public paid execution until charging is corrected and reverified. Respect the user max-charge limit and stop processing when the charge limit is reached. |
| Unit economics | Revenue, platform costs, profit, cost per 1,000 results and observed resource consumption | Actor Analytics plus run details; owner capability runs provide an early cost estimate before external paid usage | Final criterion: positive creator margin and platform/direct execution cost <=40% of net creator revenue on representative paid usage. Review after first paid usage and twice weekly thereafter. | Correct bounded inefficiency where possible. If the cost structure remains above threshold without an implementation defect, treat it as capability evidence rather than silently increasing price during the experiment. |
| User-reported issues / diagnostics | Store issues, shared debug runs and directly surfaced user feedback | Actor Analytics shared debug runs and Store issue mechanisms | Review twice weekly and whenever a shared debug run or issue appears. | Fix reproducible in-scope defects; record feature requests separately. Buyer-facing scope additions require an experiment-change decision. |

### Operating Cadence and Evidence

| Activity | Cadence / trigger | Evidence retained |
|---|---|---|
| Pre-launch pricing and charging verification | Once before opening the observation window | Effective PPE configuration, event prices, primary event, controlled charge/spending-limit test and accessible output evidence. |
| Launch baseline | Immediately before public paid launch | Actor ID/build/version, `totalUsers`, public run counters, Actor Analytics user/run/revenue snapshot, pricing configuration and Step 7 scope/version. The baseline must be captured before any external promotion or observation traffic. |
| Daily dependency canary | Once daily | Owner-run ID, query/locale configuration, status, output count, resolution success and any parser/control exception. Owner runs are excluded from market evidence. |
| Capability validation sample | Twice weekly | Export of the fixed 100-row GB/US mixed-topic sample with field completeness, URL-resolution rate, full-text success rate and failure/status distribution. |
| Automated run monitoring | Continuous through Apify monitoring | Run-status alerts and relevant run/log evidence. |
| Material incident review | Whenever a pause trigger or material defect occurs | Run IDs, logs, classification, corrective action, verification evidence and whether the observation window remains valid. |
| Market/economics review | Twice weekly; additionally after first paid external usage | Actor Analytics JSON/export covering user growth, paid/free users, runs, success rate, revenue, platform cost, profit, acquisition funnel and cost per 1,000 results. |
| User-feedback review | Twice weekly and event-driven on shared debug run/Store issue | Issue/debug reference, defect classification and disposition. |
| End-of-window snapshot | At the end of day 30 before any experiment-changing modification | Final Actor Analytics export, Actor stats, public external-run counts, revenue/cost/profit evidence, capability-validation sample summary and evidence needed to calculate M1-M3 and all capability criteria. |

### Intervention Boundaries

**Bounded operational intervention:** Request/parser corrections, publisher-link decoder/redirect/canonical-resolution fixes, generic readability extraction fixes, error-isolation/fail-soft corrections, retry/backoff corrections, logging/telemetry improvements, schema implementation corrections, billing/spending-limit defects and documentation clarifications may be made when they preserve the selected enriched proposition, Step 7 scope, temporary prices and lightweight-dependency assumptions. Every material fix during observation must record the affected runs, the change and the verification evidence.

**Experiment-change rule:** Adding browser-rendered extraction, residential-proxy dependence, a paid external news/article-extraction API, paywall bypass, stateful monitoring, additional news sources, AI enrichment, a materially different full-text promise, a material pricing change, or another buyer-facing scope change is not a routine operational fix. It requires an explicit bounded-iteration/redefinition decision. If the change could materially affect acquisition, repeat use or willingness to pay, the 30-day market observation window must restart under the changed experiment.

**Pause rule:** Pause the public paid POC when a billing defect could mischarge users; when three consecutive valid-input runs fail for an Actor/source reason; when mandatory-field completeness is systematically below 98%; when URL-resolution success is below 85% in two consecutive capability samples; when enrichment failure can crash whole runs rather than fail per row; when the core proposition requires an excluded dependency; or when repeated paid usage demonstrates structurally negative economics / execution cost above the Step 7 threshold. Resume only after the issue is corrected within scope and verified. A low user count by itself is not a pause condition.

### Step 8 Completion

**Step 8 complete:** Yes

**Step 8 blockers:** None

## 8. Gateway 3 — POC Commitment

*Methodology mapping: Phase 3, Gateway 3 — POC Commitment.*

The commitment decision uses the completed Step 7 enriched-Google-News experiment definition, the completed Step 8 operational requirements, the Phase 1 Apify prerequisite validation and current Apify publication/monetisation requirements.

Current Apify documentation confirms that Store publication requires completed display information, monetisation, sample output, output schema and Actor permissions. Pay-per-event monetisation requires billing/payment details before configuration. Identity verification is required for payout eligibility; it is not required to begin implementation. The existing Phase 1 validation already proves local development, deployment, hosted execution, authenticated API invocation, structured dataset retrieval, logs and run-level usage/cost visibility.

### Commitment Assessment

Use only **Ready**, **Action before observation**, **Blocked**, or **Not applicable**.

| Commitment dimension | Evidence / assessment | Status | Required action / condition |
|---|---|---|---|
| Definition readiness | Step 7 defines the enriched Google News proposition, public paid experiment, 30-day boundary, exact in/out scope, input/output contract, dependencies, temporary pricing, Market Test Cards and success/iteration/exit rules. Publisher URL resolution is explicitly core; full text is optional/fail-soft; heavy extraction mechanisms remain excluded. No material buyer/product-definition decision needs to be invented during coding. | Ready | None. |
| Evidence readiness | M1-M3 are precommitted and trace directly to the Step 6 demand forecast. Capability criteria cover run reliability, metadata completeness, publisher-URL resolution, optional full-text usefulness, dependency model and unit economics. Step 8 maps every criterion to reproducible Apify-native evidence or a fixed owner-run validation sample. | Ready | None. |
| Operational manageability | Step 8 uses native Apify monitoring/analytics plus a daily owner canary and twice-weekly fixed capability sample. Bounded fixes, experiment-changing changes and pause conditions are explicit. No custom production monitoring stack is required. | Ready | None. |
| Implementation proportionality | The POC remains one source and primarily HTTP-based. URL resolution plus optional fail-soft full text is materially richer than the legacy metadata Actor but remains bounded. Browser rendering, residential proxies, paid extraction/news APIs, multi-source aggregation, stateful monitoring and AI enrichment are excluded. The implementation is reversible and suitable for a POC-sized project. | Ready | None. |
| Prerequisite feasibility | Phase 1 proved the Apify development/deployment/API/log/cost path. Public Store listing and PPE monetisation introduce normal account/configuration requirements that are documented and feasible. No external proprietary data, proxy account or paid API is required by the selected design. | Action before observation | Complete Store/publication and monetisation prerequisites before opening the public paid observation window. |
| Risk and cost containment | The POC has bounded functionality, a 30-day window, explicit charging/economics criteria, fail-soft publisher handling and pause rules. The existing account-level $5 platform-usage ceiling is useful during development but could prematurely stop a public observation window if retained unchanged. | Action before observation | Before launch, estimate expected POC platform usage from implementation/capability runs and deliberately retain, raise or replace the current $5 account limit with a guardrail that protects spend without invalidating the 30-day experiment. |

### Pre-Observation Requirements

| Requirement | Why required | Required by | Status | Action |
|---|---|---|---|---|
| Public Store publication configuration | Apify requires display information, description/logo, monetisation, sample output, output schema and Actor permissions for Store publication. | Before public observation window | Action before observation | Complete the Publishing-tab requirements and verify the public Store page. |
| POC README / user documentation | External users must understand the query inputs, publisher-URL behaviour, optional full-text semantics, charging model and known limitations for the experiment to be interpretable. | Before public observation window | Action before observation | Publish concise Store-facing documentation aligned to Step 7. |
| Billing and payment details | Apify requires billing/payment details before Actor monetisation can be configured. | Before paid observation window | Action before observation | Complete billing/payment details in Apify Console. |
| Temporary PPE configuration | The experiment depends on the Step 7 temporary prices and separate article/full-text events. | Before paid observation window | Action before observation | Configure the Step 7 PPE events/prices, primary event and platform-cost treatment; verify the effective configuration before launch. |
| Charging / spending-limit verification | A billing defect would invalidate the paid experiment and could mischarge users. | Before paid observation window | Action before observation | Run controlled pre-launch tests covering result charges, successful-full-text charges, non-charge on failed full text, accessible outputs and user max-total-charge behaviour. |
| Account usage guardrail review | The existing $5 monthly account usage ceiling may be too restrictive for a public 30-day enriched POC and could create artificial run failures. | Before public observation window | Action before observation | Estimate likely platform cost from Step 9 validation runs and set an explicit observation-window guardrail high enough not to invalidate normal external usage while remaining financially bounded. |
| Actor permissions review | Publication requires permissions to be defined, and the POC should not request broader access than necessary. | Before public observation window | Action before observation | Confirm the minimum permission level needed by the implementation and publication configuration. |
| Launch baseline capture | Step 8 requires a reproducible baseline for user/run/revenue deltas and later M1-M3 evaluation. | Immediately before day 1 | Action before observation | Capture Actor/build reference, `totalUsers`, public run counters, Analytics snapshot, pricing configuration and Step 7 scope version before external traffic begins. |
| Creator identity verification (KYC) | Required for payout eligibility and for optional agentic-payment eligibility, but not required to begin Step 9 implementation. | Before payout; before relying on agentic-payment distribution | Not applicable | Complete KYC before withdrawing earnings or deliberately relying on agentic-payment discovery. It does not block Step 9 or the standard public paid observation window. |

**Gateway 3 decision:** Pass

**Gateway 3 commitment:** Commit to POC implementation

**Gateway 3 rationale:** The selected enriched Google News POC is sufficiently defined, measurable and operationally bounded to justify a bounded Step 9 engineering commitment. Step 7 fixes the proposition and experiment conditions; Step 8 makes every material market and capability criterion observable; Phase 1 demonstrates the core Apify development/deployment/runtime evidence path. Subsequent Step 9 work identified that publisher-URL resolution itself contains a material undocumented technical boundary that was not established at Gateway 3; the original statement that no unresolved technical prerequisite existed is therefore superseded by the correction below.

**Post-commit technical-discovery correction (2026-09-28):** Step 9 evidence from the enriched product repository showed that the core Google News publisher-URL integration was approached without an authoritative Google specification and that the initially selected reverse-engineered decoder path could not be validated in the live environment. Under the Development Operating Model, this is now classified as prerequisite Technical Discovery rather than ordinary implementation uncertainty. The publisher-resolution Feature Issue is blocked until a separate discovery Issue establishes a supported HTTP-first integration contract/approach or concludes that the capability is not feasible within the Step 7 constraints. A `Not feasible` or `Inconclusive` result requires returning to the POC definition/commitment decision rather than silently adding excluded dependencies.

**Authorized next step:** Step 9 — continue the POC through the Development Operating Model, beginning with the required publisher-resolution Technical Discovery before dependent implementation. The public paid 30-day observation window must not start until every **Action before observation** item and every material Technical Discovery blocker is closed.

## 9. POC Implementation

*Methodology mapping: Phase 4, Step 9 — Implement the POC.*

Record only the evidence required to establish that the implemented POC is deployed and ready for the Step 10 observation window. Detailed engineering artifacts remain in the product repository.

**Pre-Bootstrap Implementation Preparation**

**Repository decision:** Create a new independently deployable product repository rather than evolve the legacy metadata POC repository.

**Planned repository:** `adunato/google-news-enriched-actor-poc` — **not yet created**

**Preparation handoff:** [Enriched Google News POC — Repository Bootstrap Handoff](enriched-poc-bootstrap-handoff.md)

**Legacy implementation reference:** `adunato/google-news-actor-poc` development baseline `51f89df7c21cb40787fbc84c1658c96ebdf5c8b3`, including the merged final development Issue #6 packaging/Store-documentation work.

**Reuse decision:** Reuse the proven Google News request/parser/orchestration and Apify runtime patterns selectively after bootstrap through normal Issue-centred implementation. Do not clone or rename the legacy repository. Regenerate repository infrastructure, SideGig skills/templates, CI/controls and durable Product/Architecture definitions from the canonical SideGig bootstrap. Publisher URL resolution, optional full-text extraction, enriched output/status contracts, temporary enriched PPE configuration and Step 8 experiment evidence are new work.

**Bootstrap readiness:** Ready. Repository identity, ownership boundary, selective-reuse strategy, upstream POC inputs, initial Product/Architecture intent and bootstrap preflight are documented.

**Deliberate hold before repository establishment:** The new repository will not be created until the legacy metadata POC completes its authorized Apify deployment/operational continuation and any reusable deployment, Store, monetisation, monitoring or release lessons have been reviewed. This pause does not reopen Gateway 3 and is not an implementation blocker.

**Exact resume action:** After legacy closeout learning review, reconcile any accepted lessons into SideGig/current handoff as necessary, then execute the standard `bootstrap-project` process to create `adunato/google-news-enriched-actor-poc`.

**Product repository:** Not created — deliberately stopped immediately before repository establishment.

**Development/design evidence:** Pre-bootstrap evidence is the current Step 7 definition, Step 8 operational requirements, Gateway 3 Pass and the [repository bootstrap handoff](enriched-poc-bootstrap-handoff.md). Product-repository `docs/product.md`, `docs/architecture.md` and change-specific artifacts do not exist yet and must be created/managed by the Development Operating Model after repository establishment.

**Deployed implementation reference:** Not applicable — implementation has not started.

### Implementation and Validation Evidence

| Implementation area | Requirement source | Evidence / reference | Status |
|---|---|---|---|
| POC implementation boundary | Step 7 / Gateway 3 | Step 7 complete; Gateway 3 Pass | Pass |
| Operational evidence design | Step 8 | Step 8 complete with market/capability evidence sources, cadence and pause/intervention rules | Pass |
| Repository and reuse decision | Step 9 project establishment preparation | [Bootstrap handoff](enriched-poc-bootstrap-handoff.md) | Pass |
| Legacy implementation baseline | Step 9 reuse assessment | `adunato/google-news-actor-poc@51f89df7c21cb40787fbc84c1658c96ebdf5c8b3` | Pass |
| New product repository establishment | Development Operating Model | Deliberately deferred until legacy deployment/learning closeout | Not applicable |
| Product implementation / validation | Step 7 / Step 8 | Cannot begin before repository establishment | Not applicable |
| Apify deployment / observation release | Step 9 | Cannot begin before implementation | Not applicable |

**Pre-observation requirements closed:** No

**Observation baseline captured:** No

### Engineering Learning Review

**Learning review completed:** No — the deliberate pre-bootstrap hold exists specifically to complete the legacy POC deployment/operational learning cycle first.

**Product-repository learning records requiring SideGig review:** Not applicable for the new enriched POC until its repository exists. Legacy metadata POC learning records remain governed by the legacy continuation artifact.

### Step 9 Completion

**Step 9 complete:** No

**Step 9 blockers:** Publisher-URL resolution has a material unresolved Technical Discovery prerequisite in the enriched product repository. Dependent Issue #4 implementation remains blocked until that discovery is integrated and #4 is reassessed. The earlier pre-repository establishment hold is complete and no longer describes the current blocker.


## 10. POC Operation and Evaluation

*Methodology mapping: Phase 4, Step 10 — Operate, Evaluate and Iterate the POC.*

Record the evidence generated during the live observation window and evaluate the POC against the Step 7 success, iteration and exit rules. Detailed software-change evidence remains in the product repository.

**Observation start:** <YYYY-MM-DD or other explicit boundary>

**Observation end:** <YYYY-MM-DD or stop-rule boundary>

**Observed implementation reference:** <Release / deployment reference established in Step 9>

### POC Evaluation Evidence

| Evaluation area | Step 7 criterion / Step 8 requirement | Evidence / result | Outcome |
|---|---|---|---|
| <Market / capability / operational area> | <Criterion or requirement> | <Observed evidence> | <Pass / Fail / Inconclusive / Not applicable> |

#### Demand Forecast Evaluation

Compare the precommitted demand expectations with observed behaviour. Do not revise the forecast retrospectively.

| Test / forecast metric | Expected range / threshold | Observed result | Variance / interpretation | Outcome |
|---|---|---|---|---|
| <M1 / metric> | <Step 6/7 expectation> | <Observed evidence> | <Difference and plausible interpretation> | <Supported / Weakened / Inconclusive> |

### Incidents, Interventions and Iterations

| Event | Classification | Action / evidence | Effect on observation window |
|---|---|---|---|
| <Incident, fix or iteration> | <Observation only / Bounded fix / Experiment-changing iteration> | <Action and reference> | <None / Paused / Restarted / Other> |

If no material incidents, interventions or iterations occurred, state **None**.

### Observation Learning Review

**Material learning records:** <None, or stable product-repository references>

**Learning records requiring SideGig review:** <None, or stable references>

### Step 10 Evaluation

**POC evaluation:** <Success / Bounded iteration justified / Stop>

**Evaluation rationale:** <Concise evidence-based conclusion against the Step 7 rules>

### Step 10 Completion

**Step 10 complete:** <Yes / No>

**Step 10 blockers:** <None, or concise list>

## 11. Gateway 4 — Productisation Decision

*Methodology mapping: Phase 4, Gateway 4 — Productisation Decision.*

Use the completed Step 10 evidence to decide whether the proposition should proceed beyond the POC.

**Decision:** <Proceed to productisation / Iterate POC / Stop>

**Rationale:** <Concise explanation based on the Step 10 evidence>

**Authorized next step:** <Phase 5 productisation / return to the relevant POC step for one bounded iteration / stop further implementation>

