# Apify POC Opportunity Selection

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisite validation:** [Apify Prerequisites Validation Test](prerequisites-validation.md)
- **Research methodology:** [Research Methodology](../../research/methodology.md)
- **POC methodology revision:** Demand validation v1
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

> **Reassessment status:** The content below is the legacy Step 7 definition for the superseded metadata-only proposition. Gateway 2 was re-run on 2026-09-26 and selected **Google News enriched search API — real publisher URLs + optional full text**. Step 7 has not yet been redefined under Demand validation v1 and the legacy thresholds below are not current authorization for implementation or observation.

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
| Market | Repeat-use signal | **Success:** at least 3 successful external runs occur beyond the one-run-per-new-user baseline during the observation window, demonstrating usage beyond pure first trials. |
| Market | Monetised demand | **Success:** at least one external paid-plan usage produces positive creator revenue during the observation window. |
| Capability | Run reliability | **Success:** at least 95% of valid-input POC runs complete successfully, excluding clearly attributable Apify-wide outages. |
| Capability | Core record completeness | **Success:** at least 98% of returned records contain valid `title`, `sourceName`, `googleNewsUrl` and `publishedAt` values. |
| Capability | Query / locale / recency behaviour | **Success:** the acceptance matrix defined during implementation passes for all supported controls, with no systematic mismatch that makes a control misleading. |
| Capability | Lightweight access assumption | **Success:** normal operation does not require browser automation, a paid external data API or mandatory residential-proxy usage. |
| Capability | Unit economics | **Success:** measured Apify platform cost across representative paid runs remains at or below 40% of net creator revenue generated by those runs at the temporary POC price. |

#### Market Test Cards

| Test ID | Hypothesis | Experiment | Measure | Precommitted threshold | Demand-case reference |
|---|---|---|---|---|---|
| <Pending Step 7 reassessment> | <Pending> | <Pending> | <Pending> | <Pending> | <Pending> |

**POC success rule:** The POC is successful when all five capability criteria pass and all three market criteria are met within the 30-day observation window. This provides evidence that both the selected market and capability assumptions survived a real commercial experiment.

**Bounded iteration rule:** One bounded iteration is justified when the capability criteria pass but market evidence is partial — specifically, at least 5 distinct external users are observed but one or more of the 10-user, repeat-use-signal or monetised-demand thresholds are missed — or when one capability criterion narrowly misses because of a specific fix that does not change the proposition or introduce an excluded dependency. The iteration must have an explicit hypothesis and remain within the Step 7 functional boundary.

**Exit / stop rule:** Stop the POC without further implementation expansion when, after the 30-day window, fewer than 5 distinct external users are observed; or when the core proposition cannot meet the reliability/completeness criteria without browser automation, a mandatory paid external data source or residential-proxy dependence; or when representative unit economics materially exceed the 40% cost threshold and cannot be corrected within the existing scope. A failure caused by the selected proposition should return to Gateway 4 evidence assessment rather than being hidden by adding deferred features.

### Step 7 Completion

**Step 7 complete:** No

**Step 7 blockers:** Gateway 2 was re-run on 2026-09-26 and selected a materially richer proposition. Step 7 must be redefined from the new Demand Case before Phase 3 can be treated as current.

## 7. POC Operational Requirements

*Methodology mapping: Phase 3, Step 8 — Define POC Operational Requirements.*

> **Reassessment status:** The operational requirements below were designed for the superseded metadata-only Step 7 definition. They are retained as legacy evidence but must be reconciled after the new Step 7 is defined.

The operational design is intentionally lightweight. Apify already exposes run statuses, logs, resource usage, cost information, built-in Actor monitoring, dataset-field alerts and Actor Analytics. Those native capabilities are sufficient for this POC; no separate monitoring service or production support stack is required.

**Operational evidence basis:** [Apify Actor monitoring](https://docs.apify.com/actors/running/monitoring); [Actor Analytics and monetisation](https://docs.apify.com/actors/publishing/monetize); [Actor run API](https://docs.apify.com/api/v2/actors-actor-runs); [Pay-per-event pricing](https://docs.apify.com/actors/publishing/monetize/pay-per-event).

The Step 7 repeat-use criterion has been expressed as an aggregate **repeat-use signal** rather than "three identifiable repeat users". Apify exposes unique-user counts and owner-excluded public run statistics, but the documented operational interfaces do not require per-user identity analysis to evaluate the experiment. The revised measure preserves the intended question — whether usage extends beyond first trials — while making the criterion reproducible from channel-native evidence.

### Operational Requirements

| Operational concern | Signal / evidence | Mechanism | Trigger / review rule | Required response |
|---|---|---|---|---|
| Run health / reliability | Run terminal status, success-rate statistics, run logs and status message | Apify built-in monitoring plus run details/API | Review every `FAILED` or `TIMED-OUT` run. A user-initiated/spending-limit `ABORTED` run is classified separately. Pause if three consecutive valid-input runs fail for an Actor/source reason or if observed valid-input success drops below 90% before the final 95% evaluation threshold. | Inspect logs and input, classify platform/user/Actor/source cause, record whether the run counts toward reliability, and make only an in-scope fix. Resume after the failure mode is demonstrably cleared. |
| Core result completeness | Presence of `title`, `sourceName`, `googleNewsUrl` and `publishedAt` across dataset rows | Dataset schema/field statistics and periodic dataset sampling | Investigate any alert or sample showing completeness below the Step 7 98% threshold or a systematic malformed-field pattern. | Inspect affected records and source response; correct normalization/parser defects within scope. Do not add canonical-link/full-text extraction as a remedy. |
| Google News dependency health | Successful parsing, non-malformed feed response, normal result structure and supported locale/recency behaviour | User-run evidence plus a small owner-run canary using a broad query; run logs | Canary once daily during the observation window. Investigate any canary parser failure or systematic control mismatch. | Confirm whether Google behaviour changed. Apply a bounded parser/query-semantics fix if possible; pause if lightweight feed access is no longer sufficient. |
| Run duration / abnormal resource use | Duration, compute units, external transfer and run usage | Run detail/API and Actor Analytics | Review an obvious step-change from the implementation baseline or repeated abnormal resource usage; no arbitrary production SLA is imposed. | Identify retries, loops or unexpected response growth. Correct bounded defects; do not add heavier infrastructure simply to mask source behaviour. |
| POC unit economics | Revenue, platform cost, profit and cost per 1,000 results | Actor Analytics; finalized run usage/charged-event data for representative paid runs | Review after the first paid external run, then as part of each periodic review. Investigate any negative-profit paid run or repeated evidence that platform cost is above 40% of net creator revenue. | Check compute/data usage and charging configuration. Correct implementation inefficiency if possible within scope; repeated structural failure against the 40% criterion triggers pause/exit assessment rather than silent repricing. |
| Charging / user spend limits | Charged event counts, run status and max-charge behaviour | PPE synthetic dataset-item/start events, run pricing information and logs | Any evidence of output being produced without the intended event charge, charging without an accessible result, or failure to terminate cleanly at a spending limit. | Treat as a blocking billing defect; pause public execution until corrected and verified. |
| New-user market signal | Change in Actor unique-user statistics from the launch baseline | Actor Stats / Actor Analytics user-growth metrics | Snapshot at public launch; review periodically; final delta at day 30 is the authoritative Step 7 user measure. | No operational intervention merely because growth is weak. Record the evidence; demand failure is evaluated through the Step 7/Step 10 decision rules. |
| Repeat-use signal | Owner-excluded successful public runs compared with the new-user delta | Public Actor run statistics plus launch/final Actor Stats | At final evaluation, require at least three successful external runs beyond the one-run-per-new-user baseline. Periodic review is informational only. | Record the signal. Do not change functionality or pricing simply to manufacture repeat usage during the same observation window. |
| Monetised demand | Paid/free user analytics, revenue and profit | Actor Analytics | Review periodically and at day 30. Success requires positive creator revenue from at least one external paid-plan usage. | Record result. A lack of paid usage is market evidence, not an operational defect. |
| User-reported defects | Store issues, shared debug runs and directly exposed Actor feedback | Apify Actor Analytics/debug evidence and Store issue mechanisms | Review at least twice weekly and whenever Apify surfaces a shared debug run or issue. | Fix reproducible in-scope defects. Record feature requests separately; do not expand the Step 7 proposition during the same observation window. |

### Operating Cadence and Evidence

| Activity | Cadence / trigger | Evidence retained |
|---|---|---|
| Launch baseline | Immediately before the public 30-day window begins | Actor Stats (`totalUsers`, relevant public run counters), pricing configuration, default build/version and Step 7 scope; this baseline makes subsequent user/run deltas reproducible. |
| Automated operational monitoring | Continuous through Apify built-in monitoring | Run-status alerts and dataset-field alerts linked to the relevant run/dataset evidence. |
| Dependency canary | Once daily during the observation window | Owner-run ID, status and any exception/control failure. Owner activity is kept separate from external market evidence. |
| Early economics check | First paid external run | Finalized run usage/cost and charged-event evidence after run statistics have settled. |
| Periodic POC review | Twice weekly during the observation window | Actor Analytics snapshot/export covering users, runs, success rate, revenue, costs, profit and cost per 1,000 results; open operational issues and interventions. |
| Material incident review | Whenever a pause trigger or material defect occurs | Run IDs, logs, classification, corrective action, verification run and whether the observation window remains valid. |
| End-of-window snapshot | At the end of day 30 before any experiment-changing modification | Actor Analytics JSON export where available, Actor Stats, public run statistics, revenue/cost/profit evidence and the run/data-quality evidence needed to evaluate all Step 7 criteria. |

### Intervention Boundaries

**Bounded operational intervention:** Parser/normalization corrections, query/locale/recency implementation fixes, retry/backoff corrections, logging improvements, schema implementation corrections, billing-defect fixes and documentation clarifications may be made where they preserve the Google News metadata-search proposition, Step 7 scope, temporary price and lightweight-access assumption. Every material fix during the observation window must be recorded with the affected runs and verification evidence.

**Experiment-change rule:** Adding canonical-link or full-text enrichment, browser scraping, residential-proxy dependence, a paid external data/API dependency, stateful monitoring, additional news sources, AI enrichment, a material pricing change or another buyer-facing scope change is not routine operations. It requires an explicit bounded-iteration or gateway decision. If the change can materially affect user acquisition, repeat use or willingness to pay, the 30-day market observation window restarts for the changed experiment.

**Pause rule:** Pause the public POC when a billing defect could mischarge users; when three consecutive valid-input runs fail for an Actor/source reason; when required-field quality is systematically below the 98% criterion; when lightweight Google News access is materially broken; or when repeated paid runs show structurally negative economics / platform cost above the Step 7 threshold. Resume only after the issue is corrected within scope and verified.

### Step 8 Completion

**Step 8 complete:** No

**Step 8 blockers:** Step 7 has not yet been redefined for the selected enriched Google News proposition; Step 8 must be reconciled afterwards.

## 8. Gateway 3 — POC Commitment

*Methodology mapping: Phase 3, Gateway 3 — POC Commitment.*

> **Reassessment status:** Gateway 3 is no longer current because Gateway 2 selected a different proposition on 2026-09-26. The legacy commitment assessment below is retained only for traceability.

The commitment decision previously used the completed Step 7 definition and Step 8 operating requirements. Current Apify documentation was rechecked because the POC is explicitly public and paid: public Store publication requires completed display information, monetisation, sample output, output schema and permissions; monetisation setup requires billing/payment details; identity verification is required for payout eligibility.

### Commitment Assessment

| Commitment dimension | Evidence / assessment | Status | Required action / condition |
|---|---|---|---|
| Definition readiness | Step 7 defines the Google News metadata-search proposition, public paid experiment mode, 30-day boundary, functional scope, input/output schema, dependencies and explicit success/iteration/exit rules. No material product-definition decision needs to be invented during implementation. | Ready | None. |
| Evidence readiness | Market evidence is defined through external-user growth, aggregate repeat-use signal and monetised demand; capability evidence covers reliability, field completeness, supported controls, lightweight-access assumptions and unit economics. Step 8 maps each material measure to observable Apify evidence. | Ready | None. |
| Operational manageability | Step 8 uses native Apify monitoring, logs, dataset evidence and Actor Analytics with bounded intervention and pause rules. No separate production monitoring stack is required. | Ready | None. |
| Implementation proportionality | The POC remains one-source, metadata-only and HTTP/feed based. Canonical-link resolution, full text, browsers, residential proxies, paid external APIs, stateful monitoring, AI enrichment and multi-source aggregation remain excluded. | Ready | None. |
| Prerequisite feasibility | Phase 1 proved local/hosted Actor execution, API invocation, logs and cost visibility. The additional requirements created by the public paid POC — Store publication fields and billing/payment/monetisation setup — are standard Apify configuration steps and do not block starting the code implementation. | Action before observation | Complete the recorded pre-observation items before the 30-day public paid window begins. |
| Risk and cost containment | The experiment has a bounded 30-day window, temporary $1/1,000-result price, small scope, no intrinsic paid data/proxy dependency, reliability and economics thresholds, and explicit pause/exit rules. The existing $5 account usage ceiling provides an additional development guardrail and can be reconsidered only deliberately if POC testing requires it. | Ready | Preserve the Step 7/8 scope and guardrails during implementation. |

### Pre-Observation Requirements

| Requirement | Why required | Required by | Status | Action |
|---|---|---|---|---|
| Public Store publication configuration | Apify requires display information, description/logo, sample output, output schema and Actor permissions before Store publication. | Before public observation window | Action before observation | Complete the Publishing-tab requirements and verify the public Store page. |
| POC README / user documentation | External users need sufficient instructions, input/output definitions and limitations for the market experiment to be interpretable. | Before public observation window | Action before observation | Publish the concise POC README already included in Step 7 scope. |
| Billing and payment details | Apify requires billing/payment details before Actor monetisation can be configured. | Before paid observation window | Action before observation | Complete account billing/payment details in Apify Console. |
| Temporary PPE configuration | The Step 7 experiment requires the temporary per-result charging model to be active and testable. | Before paid observation window | Action before observation | Configure PPE at the Step 7 temporary price, verify the dataset-result event and spending-limit behaviour, and confirm a paid test run charges correctly before opening the window. |
| Creator identity verification | Required for payout eligibility, but not documented as a prerequisite to begin implementation or define the paid Actor experiment. | Before payout | Not applicable | Complete KYC before withdrawing creator earnings; it does not block Step 9 or the commitment decision. |
| Launch baseline capture | Step 8 requires a reproducible baseline for user/run deltas and later Step 10 evaluation. | Immediately before day 1 | Action before observation | Capture Actor Stats, pricing/build version and relevant public-run counters before opening the 30-day window. |

**Gateway 3 decision:** Fail

**Gateway 3 commitment:** Do not commit

**Gateway 3 rationale:** The previous Gateway 3 Pass applied to the metadata-only proposition selected on 2026-09-17. Gateway 2 has now selected a different enriched proposition. Until Steps 7 and 8 are re-run against that proposition, definition readiness and evidence readiness are not established under the current methodology.

**Authorized next step:** Re-run Step 7 — Define the POC for the enriched Google News proposition, then reconcile Step 8 and reconsider Gateway 3.

## 9. POC Implementation

*Methodology mapping: Phase 4, Step 9 — Implement the POC.*

Record only the evidence required to establish that the implemented POC is deployed and ready for the Step 10 observation window. Detailed engineering artifacts remain in the product repository.

**Product repository:** Public GitHub repository [`adunato/google-news-actor-poc`](https://github.com/adunato/google-news-actor-poc), with local bootstrap repository at `C:\Users\danie\projects\google-news-actor-poc` and current shared bootstrap commit `87f714b9b665745ae20b5c175bab079a285693df`.

**Development project establishment evidence:** `dev`, `staging` and `main` are present, with `dev` as the default branch. Branch protections are active on all three permanent branches: pull requests are required with zero approvals, the successful `validate` check is required, and force pushes and branch deletion are blocked. Local `npm ci` and `npm run validate` passed; the canonical SideGig package verifier passed after manifest correction `7040106`; and the GitHub Actions [Validate run](https://github.com/adunato/google-news-actor-poc/actions/runs/35619873173) completed successfully.

**Development/design evidence:** <Links to the project design and implementation-planning artifacts required by the SideGig Development Operating Model>

**Deployed implementation reference:** <Commit / version / build / deployment identifier>

### Implementation and Validation Evidence

| Implementation area | Requirement source | Evidence / reference | Status |
|---|---|---|---|
| <Functional scope / inputs and outputs / dependencies / operational evidence / deployment / charging or other relevant area> | <Step 7 / Step 8 / Gateway 3 requirement> | <Test, CI, run, deployment or configuration evidence> | <Pass / Fail / Not applicable> |

**Pre-observation requirements closed:** <Yes / No>

**Observation baseline captured:** <Yes / No>

### Engineering Learning Review

**Learning review completed:** <Yes / No>

**Product-repository learning records requiring SideGig review:** <None, or stable references>

### Step 9 Completion

**Step 9 complete:** No

**Step 9 blockers:** <None, or concise list>

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

| Test / forecast metric | Expected range / threshold | Observed result | Variance / interpretation | Outcome |
|---|---|---|---|---|
| <Pending Step 7/Step 10 execution> | <Pending> | <Pending> | <Pending> | <Pending> |

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

**Step 10 complete:** No

**Step 10 blockers:** Step 9 not yet complete; observation window has not started.

## 11. Gateway 4 — Productisation Decision

*Methodology mapping: Phase 4, Gateway 4 — Productisation Decision.*

Use the completed Step 10 evidence to decide whether the proposition should proceed beyond the POC.

**Decision:** <Proceed to productisation / Iterate POC / Stop>

**Rationale:** <Concise explanation based on the Step 10 evidence>

**Authorized next step:** <Phase 5 productisation / return to the relevant POC step for one bounded iteration / stop further implementation>
