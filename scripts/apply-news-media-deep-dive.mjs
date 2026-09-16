#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const r = (...parts) => path.join(ROOT, ...parts);

function read(file) { return fs.readFileSync(r(file), 'utf8'); }
function write(file, content) { fs.writeFileSync(r(file), content); }
function ensureDir(file) { fs.mkdirSync(path.dirname(r(file)), { recursive: true }); }
function writeNew(file, content) { ensureDir(file); fs.writeFileSync(r(file), content); }

// 1) Canonical market framework: five commercial metrics only.
write('research/channel-assessment-framework.md', `# Channel Assessment Framework

## Status

Established. This document is the canonical framework for assessing channels during the channel research phase.

## Purpose

This framework defines the criteria used to assess and compare candidate sales channels consistently.

The objective is to estimate the commercial opportunity available to a new independent seller in each channel and support consistent comparison between channels. Capability and resource requirements are assessed separately in the capability framework rather than being mixed into market attractiveness.

## Assessment criteria

| Metric | What it establishes | Evidence to gather |
|---|---|---|
| **Paying demand** | How much genuine purchasing activity exists in the channel. | GMV or marketplace revenue, paid users, transactions, subscriptions, paid installs, paid usage, review velocity. |
| **Opportunity density** | Whether there is enough demand relative to the amount of supply. | Active buyers vs active products or sellers, sales per listing, proportion of listings receiving meaningful activity. |
| **New-entrant attainability** | Whether a seller entering now can realistically capture demand. | Recent products obtaining sales or reviews, age of successful listings, ranking movement, seller or revenue concentration. |
| **Revenue potential** | Whether modest success can plausibly generate approximately £2,000–£5,000 per year. | Typical prices, transaction frequency, recurring or usage-based revenue, plausible customer counts, seller earnings. |
| **Competitive pressure** | How difficult it is to create an offering that buyers will choose. | Number and quality of competitors, free alternatives, price compression, commoditisation, identifiable unmet niches. |

## Supporting assessments

Two supporting assessments are recorded for every channel:

- **Trend:** growing, stable or declining.
- **Evidence confidence:** high, medium or low.

These describe the context and reliability of the assessment rather than the intrinsic attractiveness of the channel.

## Scoring

Each of the five core metrics is scored from **1 to 5** using the evidence collected for that channel.

For every metric, **5 = more attractive** and **1 = less attractive**.

Raw evidence must be retained alongside every score so that the assessment remains auditable and can be revised as better information becomes available.

## Capability separation

Production leverage is not part of the assessment framework. It depends too heavily on the seller's own production capability and would bias the market assessment.

Operating burden is also not scored in isolation as a market metric. Ongoing maintenance, infrastructure, support and cost requirements are assessed together with the other capability dimensions in the channel and opportunity-area capability assessment.

## Core principle

Channel scale and seller opportunity are not the same thing.

A large marketplace can be unattractive if demand is heavily concentrated among established sellers. A smaller channel can be attractive if it contains proven paying demand, limited effective competition and evidence that new entrants can acquire customers.
`);

// 2) Methodology: replace seven-metric market model with five and explicitly score capability synthesis.
let methodology = read('research/methodology.md');
methodology = methodology
  .replace('The assessment framework uses seven core metrics:', 'The assessment framework uses five core market-attractiveness metrics:')
  .replace(/\n6\. \*\*Production leverage\*\*[\s\S]*?7\. \*\*Operating burden\*\*[\s\S]*?required to earn revenue\.\n/, '\n')
  .replace(/Each channel is assessed on:\n\n1\. Paying demand\n2\. Opportunity density\n3\. New-entrant attainability\n4\. Revenue potential\n5\. Competitive pressure\n6\. Production leverage\n7\. Operating burden/, 'Each channel is assessed on:\n\n1. Paying demand\n2. Opportunity density\n3. New-entrant attainability\n4. Revenue potential\n5. Competitive pressure')
  .replace('Assess every discovered opportunity area using the **same assessment framework used for channels**.\n\nEach opportunity area is assessed on:\n\n1. **Paying demand**\n2. **Opportunity density**\n3. **New-entrant attainability**\n4. **Revenue potential**\n5. **Competitive pressure**\n6. **Production leverage**\n7. **Operating burden**', 'Assess every discovered opportunity area using the **same five market-attractiveness metrics used for channels**. Capability requirements are deliberately excluded from this score and are assessed separately when the opportunity area proceeds to Phase 3.\n\nEach opportunity area is assessed on:\n\n1. **Paying demand**\n2. **Opportunity density**\n3. **New-entrant attainability**\n4. **Revenue potential**\n5. **Competitive pressure**')
  .replace('For the seven market-attractiveness metrics:\n\n1. Paying demand\n2. Opportunity density\n3. New-entrant attainability\n4. Revenue potential\n5. Competitive pressure\n6. Production leverage\n7. Operating burden', 'For the five market-attractiveness metrics:\n\n1. Paying demand\n2. Opportunity density\n3. New-entrant attainability\n4. Revenue potential\n5. Competitive pressure');

const capabilityNeedle = `Synthesize the representative case studies to describe the capability requirements of the opportunity area using the same five capability dimensions:\n\n1. Technical complexity\n2. Domain expertise\n3. Data / resource access\n4. Operating complexity\n5. Cost intensity\n`;
if (methodology.includes(capabilityNeedle) && !methodology.includes('The **Capability Score** is the arithmetic mean')) {
  methodology = methodology.replace(capabilityNeedle, capabilityNeedle + `\nScore each dimension explicitly from **1 to 5**, where **1 = Low requirement**, **2 = Low-Medium**, **3 = Medium**, **4 = Medium-High** and **5 = High requirement**. The **Capability Score** is the arithmetic mean of the five dimension scores, shown to one decimal place. A higher Capability Score therefore means a more demanding capability/resource profile; unlike the market-attractiveness scores, higher is not better.\n`);
}
write('research/methodology.md', methodology);

// 3) Channel template: five market metrics only.
let channelTemplate = read('research/templates/channel-template.md');
channelTemplate = channelTemplate
  .replace('| Production leverage |  |  |  |\n| Operating burden |  |  |  |\n', '')
  .replace('The same seven metrics used for channel assessment are applied at the narrower opportunity-area level.', 'The same five market-attractiveness metrics used for channel assessment are applied at the narrower opportunity-area level. Capability requirements are assessed separately.')
  .replace('| Opportunity area | Paying demand | Opportunity density | New-entrant attainability | Revenue potential | Competitive pressure | Production leverage | Operating burden | Trend | Overall confidence |\n|---|---:|---:|---:|---:|---:|---:|---:|---|---|\n| <Opportunity area> |  |  |  |  |  |  |  |  |  |\n| <Opportunity area> |  |  |  |  |  |  |  |  |  |', '| Opportunity area | Paying demand | Opportunity density | New-entrant attainability | Revenue potential | Competitive pressure | Trend | Overall confidence |\n|---|---:|---:|---:|---:|---:|---|---|\n| <Opportunity area> |  |  |  |  |  |  |  |\n| <Opportunity area> |  |  |  |  |  |  |  |')
  .replace('**Assessment:** Demand <score/confidence> · Density <score/confidence> · Entrant attainability <score/confidence> · Revenue <score/confidence> · Competition <score/confidence> · Production leverage <score/confidence> · Operating burden <score/confidence>', '**Assessment:** Demand <score/confidence> · Density <score/confidence> · Entrant attainability <score/confidence> · Revenue <score/confidence> · Competition <score/confidence>')
  .replace('Cover the seven metrics without reproducing a separate seven-row table. Focus on demand, supply/competition, entrant evidence, revenue economics, production leverage, operating characteristics and important uncertainties.', 'Cover the five market metrics without reproducing a separate table. Focus on demand, supply/competition, entrant evidence, revenue economics and important uncertainties. Capability and operating complexity belong in capability analysis.')
  .replace('where competition or operating burden changes the attractiveness of otherwise large markets, and any other cross-area pattern', 'where competitive structure changes the attractiveness of otherwise large markets, and any other cross-area pattern');
write('research/templates/channel-template.md', channelTemplate);

// 4) Validator canonical channel metrics.
let validator = read('scripts/research-validator.mjs');
validator = validator.replace("  'Competitive pressure',\n  'Production leverage',\n  'Operating burden',", "  'Competitive pressure',");
write('scripts/research-validator.mjs', validator);

// Helpers for overview edits.
function removeMarkdownColumns(block, names) {
  const lines = block.split('\n');
  const header = lines[0].split('|').slice(1, -1).map(x => x.trim());
  const remove = header.map((h, i) => names.includes(h) ? i : -1).filter(i => i >= 0);
  if (!remove.length) return block;
  return lines.map(line => {
    if (!line.trim().startsWith('|')) return line;
    const cells = line.split('|').slice(1, -1);
    const kept = cells.filter((_, i) => !remove.includes(i));
    return `|${kept.join('|')}|`;
  }).join('\n');
}

// 5) Apify overview: remove the two capability-like market metrics and complete News community/deep-dive synthesis.
let overview = read('research/channels/apify/overview.md');
overview = overview
  .replace(/^\| Production leverage \|.*\n/gm, '')
  .replace(/^\| Operating burden \|.*\n/gm, '')
  .replace('Apify combines strong paying demand, credible independent-creator revenue, high production leverage and comparatively low platform-level operating burden.', 'Apify combines strong paying demand, credible independent-creator revenue and evidence that new entrants can gain traction.')
  .replace('The same seven metrics used for channel assessment are applied at the narrower opportunity-area level.', 'The same five market-attractiveness metrics used for channel assessment are applied at the narrower opportunity-area level. Capability and operating requirements are assessed separately after an area passes Gateway 2.')
  .replace(/ · Production leverage [^\n·]+ · Operating burden [^\n]+/g, '')
  .replace(/Production leverage is exceptionally high, but /g, '')
  .replace(/, while competition and operating burden remain material/g, ', while competition remains material')
  .replace(/Search changes and anti-bot behaviour also create continuing maintenance requirements\.\n/g, '')
  .replace(/The area remains maintenance-heavy because data quality and source reliability require ongoing work, but differentiated entrants demonstrably can acquire demand\./g, 'Differentiated entrants demonstrably can acquire demand despite crowded Maps, LinkedIn and enrichment segments.')
  .replace(/Source changes, monitoring expectations and extraction reliability keep operating burden material\.\n/g, '')
  .replace(/Retail sites are also dynamic and anti-bot heavy\. The area therefore has credible revenue but relatively poor density, entrant evidence and operating characteristics\./g, 'The area therefore has credible revenue but relatively poor density and entrant evidence.')
  .replace(/Property portals also bring significant scraping and anti-bot maintenance\. Current evidence therefore supports a middling rather than strongly attractive assessment\./g, 'Current evidence therefore supports a middling rather than strongly attractive market assessment.')
  .replace(/Date-sensitive pricing, availability, dynamic pages and anti-bot controls create a substantial ongoing reliability burden\. The area is commercially credible but not especially easy to enter or operate\./g, 'The area is commercially credible but current entrant evidence is limited.')
  .replace(/General-purpose tools avoid dependence on one source but must support many site patterns and browser behaviours, which creates broad compatibility and support work\. /g, '')
  .replace(/Browser automation also carries significant maintenance exposure from page changes, authentication, model behaviour and third-party dependencies\. /g, '')
  .replace(/Connectors are relatively maintainable and highly reusable from a software perspective, but /g, '');

const comparisonMatch = overview.match(/\| Opportunity area \| Paying demand[\s\S]*?\n\n### 5\.2 Assessment by opportunity area/);
if (comparisonMatch) {
  const table = comparisonMatch[0].replace(/\n\n### 5\.2 Assessment by opportunity area$/, '');
  const reduced = removeMarkdownColumns(table, ['Production leverage', 'Operating burden']);
  overview = overview.replace(comparisonMatch[0], `${reduced}\n\n### 5.2 Assessment by opportunity area`);
}

const newsBlock = `#### News & media intelligence

**Assessment:** Demand 3 (M) · Density 4 (M) · Entrant attainability 4 (H) · Revenue 3 (M) · Competition 4 (M)  
**Trend:** Growing · **Overall confidence:** Medium-High

The deep dive strengthens the evidence for a smaller but genuinely active market. EasyApi's established Google News Scraper has roughly **2.4K total users and 230 monthly active users** at about **$5 per 1,000 results**. Crawler Bros, published only around six months ago, has reached roughly **400+ total users and more than 100 monthly active users** at about **$1 per 1,000 results**. A simpler RSS Feed Reader has also attracted roughly **150 total users and around 40 monthly active users**. These cases support the existing demand and entrant-attainability scores without showing demand at the scale of jobs, search or social data.

Competition remains comparatively fragmented. Google News has several competing products with meaningful but not overwhelming adoption, while RSS, direct-publisher and full-article products compete on different combinations of coverage, real-URL resolution, full text, language/region support, freshness and monitoring workflow. The case-study revenue scenarios show that the project's target is plausible for a product reaching sustained paid usage, but paid conversion and result volume per active user remain private, so Revenue potential remains **3 (M)** rather than being upgraded.

##### Community Findings

Community evidence points to a deliberately simple entry pattern: **use RSS/Google News feeds for discovery, then add only the enrichment buyers actually need**. Recent web-scraping discussions describe Google News RSS as a low-cost basis for keyword monitoring and recommend lightweight article parsers such as Readability, Newspaper4k or Trafilatura when title/snippet metadata is insufficient. This matches the current Apify product landscape: simple feed parsing, Google News metadata, full-text extraction and publisher-specific monitoring are sold as distinct products rather than requiring one large platform.

The recurring problems are also concrete and comparatively bounded. Google News redirect links can break naive downstream fetching; feeds may expose only limited metadata; full-text extraction introduces publisher-specific HTML and blocking; and established Apify products have experienced temporary zero-result/outage issues. Buyers therefore appear to value **canonical article URLs, full text where needed, stable date/locale filters, deduplication and reliable monitoring delivery**. The economics can remain lightweight when the product stays on RSS/HTTP paths, while arbitrary full-site crawling materially increases complexity and cost.

The community findings therefore support the existing market scores and justify the deep dive as a useful contrast to recruitment and lead generation: News & media has lower absolute demand, but stronger evidence that a useful paid product can be delivered without a heavy enrichment or anti-bot stack.
`;
overview = overview.replace(/#### News & media intelligence[\s\S]*?(?=\n#### AI \/ LLM data preparation)/, newsBlock + '\n');

overview = overview.replace(/## 6\. Cross-Area Findings[\s\S]*?(?=\n## 7\. Evidence Gaps and Limitations)/, `## 6. Cross-Area Findings

The area-level assessment changes the interpretation of Apify materially. Strong channel-level demand is real, but it is not evenly distributed and does not make every internal market attractive.

**Large demand often comes with severe competition.** Social media, lead generation, advertising, ecommerce and search all show substantial usage, but the biggest sources also contain strong incumbents. Demand alone is therefore a poor proxy for entrant attractiveness.

**Recruitment and jobs has the most balanced profile among the high-demand areas.** The deeper review retains an Opportunity Score of **4.0** and produces a Capability Score of **2.8**.

**Lead generation has similarly strong market economics but a heavier capability profile.** Its Opportunity Score is **3.8** and its completed synthesis gives a Capability Score of **3.2**, reflecting the added demands of enrichment, identity resolution and data-quality operations.

**News and media provides the useful contrast that was previously missing.** Its Opportunity Score remains **3.6**, but the completed deep dive finds a materially lower Capability Score of **1.6**. Public RSS/Google News inputs, low fixed costs and lightweight HTTP implementations reduce delivery requirements, while the main trade-off is lower absolute demand and less certain revenue depth.

**Low competition is not sufficient.** Integrations and generic workflow automation illustrate this directly: competition is not extreme, but observable buyer demand is weak or satisfied by native/off-channel alternatives.
`);

overview = overview.replace('- **Operating burden varies within an area.** A job Actor using a stable ATS endpoint may be materially easier to maintain than one scraping a heavily protected website, even though both sit in the same opportunity area.\n', '');

if (!overview.includes('### News & media intelligence community and deep-dive sources')) {
  overview += `\n\n### News & media intelligence community and deep-dive sources\n\n61. Apify News category — https://apify.com/store/categories/news\n62. EasyApi Google News Scraper — https://apify.com/easyapi/google-news-scraper\n63. EasyApi Google News Scraper issues — https://apify.com/easyapi/google-news-scraper/issues/closed\n64. Crawler Bros Google News Scraper — https://apify.com/crawlerbros/google-news-scraper\n65. Automation Lab RSS Feed Reader — https://apify.com/automation-lab/rss-feed-reader\n66. Google News RSS monitoring discussion — https://www.reddit.com/r/webscraping/comments/1w8sq6f/google_news_rss_alternative/\n67. News aggregation / RSS discussion — https://www.reddit.com/r/webscraping/comments/1igt3qi/scraping_of_news/\n68. Google News redirect-link discussion — https://www.reddit.com/r/webscraping/comments/1qqz3rt/tired_of_google_rss_scraping/\n69. Media-monitoring RSS + article extraction example — https://www.reddit.com/r/OSINT/comments/1s2ox6d/media_monitoring_iran/\n`;
}
write('research/channels/apify/overview.md', overview);

// 6) Apify capability: add Gateway 2 and full News capability synthesis.
let capability = read('research/channels/apify/capability.md');
const newsGateway = `
### News & media intelligence

**Decision: Pass — selected for Phase 3 deep dive.**

News & media intelligence is selected as a deliberate contrast case. Its market assessment is respectable rather than dominant—Opportunity Score **3.6**—but it combines good opportunity density and new-entrant attainability with evidence that commercially useful products can be built on lightweight public feeds and HTTP extraction.

The Step 8A community research reinforces that rationale. Users commonly begin with RSS or Google News feeds and add canonical-URL resolution or article extraction only where the buyer workflow needs it. The remaining uncertainty is therefore whether this simpler delivery model still supports sufficient paid demand and whether operating complexity stays materially below the two areas already deep-dived.

The channel-level prerequisites do not create a barrier to testing that question. Representative case studies are appropriate to establish the actual capability profile and revenue depth.
`;
if (!capability.includes('### News & media intelligence\n\n**Decision: Pass')) {
  capability = capability.replace('\n## 2. Opportunity-Area Capability Requirements', `${newsGateway}\n## 2. Opportunity-Area Capability Requirements`);
}

const newsSynthesis = `
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
`;
if (!capability.includes('**Capability Score: 1.6 / 5**')) {
  capability = capability.replace('\n## Sources', `${newsSynthesis}\n## Sources`);
}
if (!capability.includes('### News & media intelligence\n\n- [EasyApi Google News Scraper case study]')) {
  capability += `\n\n### News & media intelligence\n\n- [EasyApi Google News Scraper case study](case-studies/google-news-scraper-easyapi.md)\n- [Crawler Bros Google News Scraper case study](case-studies/google-news-scraper-crawlerbros.md)\n- [Automation Lab RSS Feed Reader case study](case-studies/rss-feed-reader-automation-lab.md)\n- Apify News category — https://apify.com/store/categories/news\n- Apify Docs — Actor pricing and costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs\n`;
}
write('research/channels/apify/capability.md', capability);

// 7) Representative case studies.
const easyApiCase = `# EasyApi Google News Scraper

- **Product / provider:** Google News Scraper / EasyApi
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** News & media intelligence
- **URL:** https://apify.com/easyapi/google-news-scraper
- **Why selected:** Established paid Google News benchmark with multi-year operating history, thousands of users, visible paid pricing and public issue history.
- **Assessment date:** 2026-09-16

## 1. Case Overview

EasyApi's Google News Scraper is an established Apify Actor that turns Google News search results into structured article metadata. It supports search terms, country/language parameters, time filtering and large result sets, and is positioned for news aggregation, market research, monitoring and sentiment-analysis pipelines.

The case is useful because it demonstrates that news metadata is a real paid product on Apify while also exposing the reliability work that accumulates in a mature Google News integration.

## 2. Commercial Opportunity

### Product / service

The Actor sells structured Google News result extraction. Public output fields include title, direct article link, domain/source, publication time, snippet and thumbnail. The product supports large result limits and localisation/search controls.

### Customer and buyer use case

Likely buyers include researchers, analysts, PR/media-monitoring users, content aggregators and developers building downstream sentiment or intelligence workflows. The purchased value is avoiding the work of repeatedly querying Google News and normalising its results into a stable API/dataset.

### Value proposition

The product packages Google News discovery into an Apify-native, schedulable and exportable dataset with locale and date controls. It competes on convenience, scale and a stable structured interface rather than on proprietary content.

### Demand and traction

Current Apify pages show roughly **2.4K total users**, around **230 monthly active users**, a **3.9/5** rating from about nine reviews and more than sixty bookmarks. The Actor has been published for roughly two years. This is materially stronger demand evidence than most community products in the News category.

### Pricing and monetisation

The public Store price is approximately **$5 per 1,000 results**. This is usage-linked pricing; customer spend therefore depends on extracted result volume. Public Apify documentation states that monetised event/result Actors generally return 80% of charge revenue to the creator before platform usage costs, although the exact economics of this Actor are private.

### Revenue estimate

#### Observed inputs

- About 230 monthly active users.
- Public price around $5 / 1,000 results ($0.005/result).
- Result limits can reach thousands per run.
- Paid conversion, paid-plan share and actual result volume per active user are not public.

#### Assumptions

Monthly active users are used only as a demand proxy. Scenarios assume average monthly paid extraction of 100, 1,000 or 5,000 results per active user. These are not observed usage figures.

#### Estimated range / scenarios

- **Low:** 230 × 100 results × $0.005 ≈ **$115/month customer event spend**.
- **Base:** 230 × 1,000 × $0.005 ≈ **$1,150/month**.
- **High:** 230 × 5,000 × $0.005 ≈ **$5,750/month**.

#### Central estimate and confidence

A practical central estimate is roughly **$1K–$2K/month of customer event spend**, **Low-Medium confidence**. The largest uncertainty is result volume per paid user and the share of monthly active users on paid plans. Creator payout/profit will be lower after Apify's share and platform costs.

### Competition and differentiation

Google News is a crowded subsegment but not dominated by one official Apify product. Alternatives include older metadata scrapers, recent low-price entrants, products that resolve canonical publisher URLs and richer tools that add full article text. EasyApi's differentiation is established adoption, large result limits and broad search/localisation controls.

### Economics and cost drivers

The selling price gives meaningful headroom compared with sub-$1/1K entrants, but the underlying implementation cost is not public. Likely cost drivers are compute/network requests, retries and storage; if an external search service is used internally that would materially change economics, but there is no evidence to assume one.

### Operating model

Customers configure and run the Actor through Apify or the API; datasets, scheduling, billing and delivery are handled by Apify. The seller's ongoing role is maintaining Google News compatibility, result quality and support.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium** | Search/localisation/date semantics and high-volume result extraction are straightforward conceptually, but mature reliability and pagination require non-trivial source handling. | Medium-High |
| Domain expertise | **Low-Medium** | Requires Google News/query and monitoring-workflow knowledge, not scarce specialist expertise. | High |
| Data / resource access | **Low** | No proprietary dataset or customer login is visible as a prerequisite; Google News is the source and Apify supplies platform services. | Medium-High |
| Operating complexity | **Medium** | Public issues include temporary zero-result/outage reports, showing that source behaviour can require active maintenance. | High |
| Cost intensity | **Low-Medium** | Fixed costs appear low; variable platform/network costs scale with result volume, but exact resource consumption is private. | Medium |

### Technical complexity

The functional scope is conventional web-data extraction: accept search parameters, query Google News, handle locale/time filters, paginate or repeat queries when needed and normalise results. The public output schema is modest and does not require entity resolution or multi-stage enrichment.

The complexity comes from production quality. Large result limits, direct links, date semantics and changes to Google News can create edge cases that a toy RSS parser would not handle. The issue history provides direct evidence that mature operation occasionally breaks and must be repaired.

### Domain expertise

The seller needs practical knowledge of Google News search controls, localisation, date windows and the fields that monitoring/research buyers expect. This is real product knowledge but not a deep specialist domain barrier.

### Data / resource access

The value proposition is built on public Google News data. No proprietary dataset, paid data licence or customer credentials are advertised. Apify provides runtime, scheduling, storage, API access and billing.

### Operating complexity

Apify handles commercial delivery, but source reliability remains the seller's responsibility. EasyApi's public issue list includes recent reports of the Actor returning zero results or not working, followed by fixes. That is consistent with a **Medium** mature-product operating requirement: not continuously intensive, but not set-and-forget.

### Cost intensity

#### Observed cost inputs

- Public customer price: about $0.005/result.
- Apify creator economics: generally 80% of event/result revenue before platform usage costs.
- No visible licensed-data fee or mandatory external enrichment service.

#### Cost assumptions

Assume the product primarily incurs ordinary Apify compute/network/storage costs. Exact per-result resource consumption is private.

#### Estimated cost range / scenarios

A precise cost estimate is not defensible from public data. The structure is nevertheless low-fixed-cost and usage-variable; direct platform cost should scale primarily with requests, retries and dataset writes rather than with a separate data licence.

#### Margin / economic impact and confidence

At $5/1K results the product has considerably more pricing headroom than low-cost RSS/Google News competitors. Margin confidence is **Low-Medium** because resource consumption and paid/free user mix are private.

## 4. Case Findings

### Intrinsic characteristics

Google News metadata can support a paid monitoring/research product with a relatively simple data model and no proprietary data asset.

### Case-specific characteristics

EasyApi's scale, pricing and mature issue history reflect a long-running implementation and should not be assumed for every entrant.

### Wider opportunity-area relevance

The case validates paid demand, shows that mature Google News products can reach hundreds of monthly active users, and demonstrates that source breakage is real but narrower than the operational burden seen in heavily protected social or enrichment pipelines.

### Key uncertainties

Paid conversion, results per user, creator profit, internal extraction method and actual platform cost are private.

## 5. Evidence and Sources

### Sources

- EasyApi Google News Scraper — https://apify.com/easyapi/google-news-scraper
- EasyApi output schema — https://apify.com/easyapi/google-news-scraper/output-schema
- EasyApi issue history — https://apify.com/easyapi/google-news-scraper/issues/closed
- Apify Actor pricing and costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs

### Material inferences and limitations

- Monthly active users are usage proxies, not paid-customer counts.
- Revenue scenarios estimate customer event spend, not creator payout or profit.
- Internal architecture and resource consumption are not public.
`;

const crawlerCase = `# Crawler Bros Google News Scraper

- **Product / provider:** Google News Scraper / Crawler Bros
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** News & media intelligence
- **URL:** https://apify.com/crawlerbros/google-news-scraper
- **Why selected:** Recent direct entrant with strong active-user traction, low per-result pricing and richer optional full-text extraction.
- **Assessment date:** 2026-09-16

## 1. Case Overview

Crawler Bros' Google News Scraper is a relatively recent community Actor that searches Google News in real time and returns structured news results. It advertises keyword/date filtering plus full article text, images and author extraction, while stating that no proxy is required.

It is selected to test whether a recent entrant can gain traction in the same core market as established Google News products without inheriting a heavy infrastructure stack.

## 2. Commercial Opportunity

### Product / service

The Actor sells Google News result extraction with optional richer article fields. It is priced per result and can be called through Apify's normal UI/API workflow.

### Customer and buyer use case

The product targets news monitoring, market research, content aggregation and downstream analysis where buyers want current articles in structured form and may prefer full text to metadata-only feeds.

### Value proposition

Its main public differentiators are low unit price, recent data, full-text/image extraction and a no-proxy implementation. That combination reduces both buyer cost and setup burden.

### Demand and traction

Current public Apify pages show roughly **400+ total users**, around **100–120 monthly active users**, a **5.0/5** rating from two reviews and several bookmarks after only about six months. The monthly-active/total-user ratio is a strong entrant signal even though the absolute scale remains below the largest News products.

### Pricing and monetisation

The listed price is approximately **$1 per 1,000 results**. The Actor therefore competes aggressively on unit price while including richer extraction than some metadata-only alternatives.

### Revenue estimate

#### Observed inputs

- Roughly 119 monthly active users on a recent Apify API page.
- Approximate price $1 / 1,000 results ($0.001/result).
- Paid-plan share and result volume are private.

#### Assumptions

Scenarios use 100, 2,000 and 10,000 results per monthly active user. The high case represents repeated monitoring or bulk collection rather than casual one-off use.

#### Estimated range / scenarios

- **Low:** 119 × 100 × $0.001 ≈ **$12/month customer event spend**.
- **Base:** 119 × 2,000 × $0.001 ≈ **$238/month**.
- **High:** 119 × 10,000 × $0.001 ≈ **$1,190/month**.

#### Central estimate and confidence

A reasonable central bracket is **$150–$400/month customer event spend**, **Low confidence**. The Actor's traction is clear, but monetised result volume is not.

### Competition and differentiation

The product competes directly with EasyApi, Lhotanova and many newer Google News Actors. Its visible positioning is a low price plus full-text extraction and no-proxy operation. That is a stronger entrant proposition than another undifferentiated metadata clone.

### Economics and cost drivers

At $1/1K results, margin depends on keeping extraction efficient. Metadata via feed/HTTP requests is cheap; retrieving full publisher pages introduces more network/compute variability and failed fetches. Avoiding proxies removes one common scraping cost.

### Operating model

The product is self-service through Apify. The seller maintains Google News parsing, article extraction and any publisher-specific fallbacks while Apify supplies execution, datasets, schedules, API access and billing.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium** | Google News metadata is lightweight, but canonical/full-text article extraction across publishers adds parsing/fallback complexity. | High |
| Domain expertise | **Low-Medium** | Requires monitoring/query and article-field knowledge, not specialist industry expertise. | High |
| Data / resource access | **Low** | Public Google News/publisher pages; the product advertises no proxy requirement. | High |
| Operating complexity | **Low-Medium** | Google News plus arbitrary article pages need monitoring, but the no-proxy HTTP model is comparatively lightweight. | Medium-High |
| Cost intensity | **Low** | No proxy or proprietary-data cost is advertised; low unit price implies an efficient resource footprint. | Medium-High |

### Technical complexity

Search and metadata extraction can be handled with ordinary HTTP/feed parsing. The richer product promise creates the meaningful complexity: resolving article links, fetching publisher pages, extracting readable text/images/authors and dealing with missing or non-standard markup.

This is still materially simpler than an enrichment pipeline with multiple paid dependencies, but it is more than a basic RSS parser.

### Domain expertise

The necessary knowledge is mostly product/source knowledge: Google News query behaviour, recency, publisher identity and what fields matter for monitoring or research. It can be acquired through normal product development.

### Data / resource access

The Actor explicitly advertises no proxy requirement. Core data comes from public Google News and publisher pages, and Apify provides generic platform infrastructure. No paid external dataset is visible.

### Operating complexity

The product must track Google News changes and the variability of publisher pages. Full-text extraction will inevitably have partial failures, but the architecture can degrade gracefully by returning metadata when article bodies cannot be fetched. The lack of login/proxy dependencies keeps the baseline relatively low.

### Cost intensity

#### Observed cost inputs

- Customer price around $0.001/result.
- No proxy required according to the product page.
- Apify platform costs still apply to creator economics unless passed through under the pricing configuration.

#### Cost assumptions

HTTP/feed collection is assumed to dominate rather than browser sessions. Full-text page fetches add network and CPU but no known licensed-data fee.

#### Estimated cost range / scenarios

Exact costs are private. The observed price itself is evidence that the provider expects a low unit-cost implementation. Cost risk rises with full-text fetch retries and article-page complexity.

#### Margin / economic impact and confidence

At only $1/1K, inefficient browser/proxy use would quickly compress margin, so the advertised no-proxy design is economically important. Confidence is **Medium-Low** because run-level resource data are not public.

## 4. Case Findings

### Intrinsic characteristics

A recent entrant can acquire meaningful active usage in Google News without proprietary data or a high customer price.

### Case-specific characteristics

Full-text extraction and the no-proxy implementation are this provider's particular positioning and are not universal requirements for the opportunity area.

### Wider opportunity-area relevance

The case strengthens new-entrant attainability and supports the hypothesis that news products can remain technically and economically lightweight while still differentiating on useful enrichment.

### Key uncertainties

Paid-user share, result volume, creator revenue, full-text success rate and detailed cost consumption are private.

## 5. Evidence and Sources

### Sources

- Crawler Bros Google News Scraper — https://apify.com/crawlerbros/google-news-scraper
- Crawler Bros API page — https://apify.com/crawlerbros/google-news-scraper/api
- Google News RSS alternative discussion — https://www.reddit.com/r/webscraping/comments/1w8sq6f/google_news_rss_alternative/
- Apify pay-per-event pricing — https://docs.apify.com/actors/publishing/monetize/pay-per-event

### Material inferences and limitations

- Public active-user counts do not identify paid users.
- Revenue scenarios are customer-spend scenarios rather than creator profit estimates.
- Internal extraction implementation is inferred only where supported by public product claims.
`;

const rssCase = `# Automation Lab RSS Feed Reader

- **Product / provider:** RSS Feed Reader / Automation Lab
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** News & media intelligence
- **URL:** https://apify.com/automation-lab/rss-feed-reader
- **Why selected:** Lower-complexity commercial case that tests whether a simple public-feed product can attract real usage without browser scraping, proprietary data or enrichment services.
- **Assessment date:** 2026-09-16

## 1. Case Overview

Automation Lab's RSS Feed Reader accepts RSS 2.0, Atom and RSS 1.0 feeds and converts items into structured Apify datasets. It extracts titles, links, dates, authors, categories, descriptions and available content and is positioned for news monitoring, aggregation, competitor tracking and content pipelines.

This is the key contrast case because it represents the simplest technically credible end of News & media intelligence.

## 2. Commercial Opportunity

### Product / service

The Actor sells batch parsing of public RSS/Atom feeds with standardised output, API access, scheduling and Apify integrations.

### Customer and buyer use case

Buyers include analysts, journalists, marketers, developers and business-intelligence users who want multiple feeds normalised into a reusable dataset or scheduled monitoring pipeline without operating their own feed ingestion service.

### Value proposition

RSS itself is open and easy to parse; the paid value is convenience, batching, normalisation, scheduling, stable API delivery and direct integration into the Apify ecosystem.

### Demand and traction

Current Store pages show roughly **150 total users** and around **40 monthly active users** after about six months. Absolute demand is modest, but it is meaningful for a narrowly scoped utility whose underlying protocol is freely available.

### Pricing and monetisation

Public pricing is approximately **$0.035 per run start plus $0.001 per feed item parsed**. The page gives examples such as 500 parsed items costing roughly $0.535 including the start event.

### Revenue estimate

#### Observed inputs

- About 40 monthly active users.
- $0.035 start event.
- $0.001 per parsed feed item.
- Public examples confirm the arithmetic of the charging model.

#### Assumptions

Three usage patterns are modelled because run frequency and items per run are private.

#### Estimated range / scenarios

- **Low:** 40 users × 5 runs × 50 items ≈ **$17/month** total charges.
- **Base:** 40 × 20 runs × 100 items ≈ **$108/month**.
- **High:** 40 × 30 runs × 500 items ≈ **$642/month**.

These include start fees and item charges.

#### Central estimate and confidence

A reasonable central estimate is **$75–$200/month customer event spend**, **Low-Medium confidence**. The product validates paid utility demand but does not by itself demonstrate the project's annual revenue target.

### Competition and differentiation

Competition includes free feed libraries, DIY cron jobs, n8n/Zapier flows and other Apify RSS/news Actors. The Actor differentiates through multi-format support, batch processing, Apify-native scheduling/API/integrations and a very low-friction usage model.

### Economics and cost drivers

The underlying work is lightweight HTTP retrieval, XML parsing and dataset writes. There is no browser, proxy, licensed-data or third-party enrichment requirement inherent to the product. The main commercial challenge is therefore willingness to pay, not expensive delivery.

### Operating model

The seller maintains one generic parser rather than a connector for each publisher. Standards variation and malformed feeds create edge cases, but customer delivery is otherwise self-service through Apify.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Low** | Standard feed retrieval/parsing, normalisation and batching; no browser automation or source-specific scraping is required for the core product. | High |
| Domain expertise | **Low** | General RSS/Atom and monitoring-workflow knowledge is sufficient. | High |
| Data / resource access | **Low** | Public feed URLs and Apify platform services; no proprietary data or credentials. | High |
| Operating complexity | **Low** | One standards-based parser supports many sources; maintenance centres on malformed feeds and protocol edge cases. | High |
| Cost intensity | **Low** | Lightweight HTTP/XML work and dataset writes with no intrinsic proxy/licensing/enrichment cost. | High |

### Technical complexity

The technical problem is bounded and standards-based: fetch one or more feed URLs, parse several common XML feed variants, normalise fields, apply per-feed item limits and persist results. Robust handling of malformed XML, date formats and optional fields is necessary, but the product does not require browser automation or anti-bot techniques.

### Domain expertise

Useful product decisions include which feed metadata to preserve, how to normalise dates/content and how monitoring users batch or schedule feeds. This is basic product knowledge rather than a specialist domain barrier.

### Data / resource access

Feeds are supplied by the customer as public URLs. No proprietary database, paid API, account login or source-specific credential is intrinsic to the product. Apify supplies runtime, storage, schedules and API delivery.

### Operating complexity

RSS/Atom are stable standards, so the seller can support many publishers through one generic code path. Ongoing work is likely to involve malformed feeds, unusual namespaces, redirects and occasional source failures rather than constant per-publisher reverse engineering.

### Cost intensity

#### Observed cost inputs

- Customer pricing: $0.035/run + $0.001/item.
- Core work is HTTP feed retrieval, parsing and dataset storage.
- No required proxy or external service is advertised.

#### Cost assumptions

Assume ordinary small-memory Actor execution and network/storage usage. Exact platform costs per run are private.

#### Estimated cost range / scenarios

Direct costs should be low and scale mainly with run count, feed size and dataset writes. Public evidence is insufficient to quantify creator platform cost more precisely.

#### Margin / economic impact and confidence

The very low selling price is consistent with a low-cost workload. Contribution may still be modest in absolute terms unless usage is frequent or batched at scale. Confidence in the low cost classification is **High**; confidence in actual margin is **Medium-Low**.

## 4. Case Findings

### Intrinsic characteristics

A standards-based feed product can be extremely simple to build and operate while still attracting paying/active marketplace usage.

### Case-specific characteristics

The exact $0.035 start fee, $0.001 item price and field schema are provider choices rather than opportunity-area requirements.

### Wider opportunity-area relevance

The case demonstrates that News & media contains a genuinely low-capability submodel. It also highlights the commercial trade-off: easy delivery is accompanied by lower apparent revenue depth and abundant DIY substitutes.

### Key uncertainties

Paid-plan share, run frequency, creator payout and actual platform resource cost are not public.

## 5. Evidence and Sources

### Sources

- Automation Lab RSS Feed Reader — https://apify.com/automation-lab/rss-feed-reader
- Automation Lab RSS Feed Reader API — https://apify.com/automation-lab/rss-feed-reader/api
- News aggregation / RSS discussion — https://www.reddit.com/r/webscraping/comments/1igt3qi/scraping_of_news/
- Media-monitoring RSS + extraction example — https://www.reddit.com/r/OSINT/comments/1s2ox6d/media_monitoring_iran/
- Apify Actor pricing and costs — https://docs.apify.com/actors/publishing/monetize/pricing-and-costs

### Material inferences and limitations

- User counts measure usage, not paid conversion.
- Revenue estimates are scenario-based customer charges.
- Low complexity applies to feed-native products; arbitrary full-site article extraction is a different implementation depth.
`;

writeNew('research/channels/apify/case-studies/google-news-scraper-easyapi.md', easyApiCase);
writeNew('research/channels/apify/case-studies/google-news-scraper-crawlerbros.md', crawlerCase);
writeNew('research/channels/apify/case-studies/rss-feed-reader-automation-lab.md', rssCase);

console.log('Applied five-metric market framework and completed Apify News & media deep dive.');
