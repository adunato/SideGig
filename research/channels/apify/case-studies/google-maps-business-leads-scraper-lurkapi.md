# LurkAPI Google Maps Business Leads Scraper

- **Product / provider:** `lurkapi/google-maps-business-leads-scraper` / LurkAPI
- **Channel:** [Apify Store](../overview.md)
- **Opportunity area:** Lead generation & business intelligence
- **URL:** https://apify.com/lurkapi/google-maps-business-leads-scraper
- **Why selected:** Recent community entrant that competes against the dominant Google Maps benchmark by packaging raw Maps extraction with website-derived emails, secondary phones, social profiles, deduplication and optional business enrichment. It tests whether workflow-ready enrichment provides a viable entrant path in a crowded market.
- **Assessment date:** 2026-09-15

## 1. Case Overview

LurkAPI's Google Maps Business Leads Scraper is a recent Apify Actor focused explicitly on producing sales-ready local-business leads rather than only reproducing Google Maps place data. It searches Maps by keyword and geography, extracts place records, visits business websites to find contact information and social profiles, and can add verification or company-level enrichment.

The product was published roughly four months before this assessment. Current Store snapshots show approximately **2.1K total users**, **130-145 monthly active users**, **23 bookmarks**, and a **4.8/5 rating from 5 reviews**. That is modest compared with the Compass incumbent but meaningful for a recent entrant in a highly competitive category.

## 2. Commercial Opportunity

### Product / service

The base service returns structured Google Maps business records and then crawls each company's website for emails, secondary phone numbers and social links. It exposes stable `placeId` values for deduplication and supports filters such as minimum rating, review count and website presence.

Optional paid enrichments include Google Ads activity, Meta Ads activity, LinkedIn company enrichment, company-registry matching, legal-entity resolution and primary-email validation. The product therefore sits between a source scraper and a lightweight lead-enrichment pipeline.

### Customer and buyer use case

The target buyer is a salesperson, agency, local-service provider, market researcher or automation workflow that needs businesses matching a concrete geographic/vertical target. A typical task is closer to "give me dentists in London with usable emails and social profiles" than "export Google Maps".

The output is designed to be exported to CSV/Excel/JSON or pushed into a CRM. That workflow orientation is important because it reduces the number of downstream steps a buyer must assemble independently.

### Value proposition

The differentiator is convenience and lead usability. The Actor combines business discovery, website contact extraction, deduplication and optional enrichment in one run. Filtered-out places are not charged, and optional enrichments charge only on successful positive matches.

This proposition directly addresses a recurring community complaint: raw place data can still require substantial cleaning and enrichment before it is useful for outreach. The Actor attempts to move more of that work into the purchased product.

### Demand and traction

As of mid-September 2026, the Store shows:

- approximately **2.1K total users**;
- approximately **130-145 monthly active users** across recent crawls;
- **23 bookmarks**;
- **4.8/5 from 5 reviews**;
- publication approximately four months earlier.

The evidence is not yet mature enough to prove durable long-term demand, but it is strong evidence that a differentiated new entrant can acquire meaningful usage despite the presence of a 36K+ MAU incumbent.

### Pricing and monetisation

The README states a base price of **$1.89 per 1,000 returned places**, while the Store headline shows discounted pricing from about **$1.69/1K** depending on plan tier.

Optional events are separately priced and charged only on positive matches:

- Google Ads activity: $1.00/1K matches;
- Meta Ads activity: $1.00/1K matches;
- LinkedIn company enrichment: $1.00/1K;
- company-registry enrichment: $2.00/1K;
- legal-entity resolution: $2.00/1K;
- primary-email validation: $0.50/1K.

As a community-maintained PPE Actor, standard Apify economics imply 80% of paid-plan event revenue before platform costs, subject to any private creator-partner terms.

### Revenue estimate

Exact run/result volume and revenue are private, so the estimate uses monthly active users and explicit unit pricing.

#### Observed inputs

- approximately **130 current monthly active users**;
- base price **$1.89/1K places** before plan discounts;
- optional enrichment events can increase revenue per returned business;
- 2.1K total users accumulated within roughly four months.

#### Assumptions

Three scenarios bracket average monthly output per active user:

| Scenario | Chargeable places per active user / month | Rationale |
|---|---:|---|
| Low | 500 | Light prospecting/testing usage. |
| Base | 5,000 | Several practical local/vertical prospecting batches per month. |
| High | 25,000 | Agency or automation use at meaningful recurring scale. |

Optional enrichment charges are excluded from the core estimate, making the scenarios conservative where add-ons are widely used.

#### Estimated range / scenarios

Using 130 MAU and the $1.89/1K base rate:

| Scenario | Places / month | Core customer event revenue / month | Standard 80% creator share before platform costs |
|---|---:|---:|---:|
| Low | 65K | **~$123** | **~$98** |
| Base | 650K | **~$1.23K** | **~$983** |
| High | 3.25M | **~$6.14K** | **~$4.91K** |

#### Central estimate and confidence

A reasonable current central estimate is **roughly $1K-$2K/month of customer event revenue**, including some add-on usage, with upside into several thousand dollars per month if the active-user base contains high-volume agencies. **Confidence: Low-Medium.** User counts and prices are public; output volume and add-on attach rates are not.

The evidence is nevertheless commercially relevant to this project: even the base-to-high scenarios place the product within or above the project's £2K-£5K annual target without requiring incumbent-scale adoption.

### Competition and differentiation

The direct market contains the Compass incumbent plus many community Google Maps scrapers. Competing only on core place extraction would therefore expose the product to severe price and trust disadvantages.

LurkAPI instead differentiates on a more complete lead outcome: emails and phones from business websites, social profiles, deduplication, filtering and optional qualification/enrichment events. It also publishes related vertical propositions such as identifying businesses without websites, reinforcing the strategy of packaging the same source capability around a specific sales workflow.

### Economics and cost drivers

The base event price is only modestly above the incumbent's best public tier, while the Actor does additional work by visiting arbitrary business websites. That makes operational efficiency more important than the headline price suggests.

Core cost drivers include Maps extraction, geographic expansion, website crawling, network/proxy traffic, retries, dataset operations and enrichment/verification calls. Successful add-ons create extra revenue, but they can also introduce external API or service costs and additional failure modes.

### Operating model

The customer-facing service is low-touch: configure search terms/location, run the Actor, then export or retrieve the dataset. Apify provides the runtime, billing, dataset storage and API surface.

The technical operation is less simple. Website contact coverage depends on whether each business has a site, exposes contact details and allows crawling. Google exposes about 120 results per individual Maps query, so the Actor expands larger requests across subregions and deduplicates results. Optional enrichments add further external dependencies and data-quality obligations.

## 3. Capability Assessment

| Dimension | Assessment | Evidence / basis | Confidence |
|---|---|---|---|
| Technical complexity | **Medium-High** | Combines Maps search/coverage with arbitrary website crawling, contact extraction, deduplication, filters and optional enrichment. | High |
| Domain expertise | **Medium** | Requires Maps/local-business semantics plus understanding of which contact and qualification fields make a prospect list commercially useful. | High |
| Data / resource access | **Low-Medium** | Core sources are public and Apify supplies platform infrastructure; some optional enrichment can depend on additional services or registries. | Medium-High |
| Operating complexity | **Medium-High** | Reliability depends on both Google Maps and heterogeneous business websites, plus optional enrichment providers. | High |
| Cost intensity | **Low-Medium, enrichment-sensitive** | Fixed costs are low, but website crawling, proxies/retries and third-party enrichment costs can consume a meaningful share of a low per-lead price. | Medium |

### Technical complexity

The case demonstrates that meaningful differentiation adds pipeline complexity. The Actor must first solve Maps discovery and geographic coverage, then visit arbitrary websites, identify plausible emails/phones/social profiles, normalize them, deduplicate businesses and optionally perform additional qualification tasks.

None of these components is individually exotic, but combining them into predictable commercial output is materially more difficult than returning Maps place cards. Error handling must also preserve useful partial results when a website or enrichment source fails.

### Domain expertise

The provider needs enough lead-generation knowledge to distinguish an attractive prospect record from a technically complete source record. Useful outputs include identity, geography, category, website, contact routes, social profiles and signals that can support qualification.

The Actor's optional advertising, registry and LinkedIn-company enrichments illustrate this buyer orientation. The required expertise is practical B2B data-product knowledge rather than specialist sales credentials.

### Data / resource access

Google Maps and public business websites provide the main raw data and do not require proprietary dataset ownership. Apify supplies managed compute, storage, APIs, schedules, billing and marketplace distribution.

However, broader enrichment can introduce additional services or public registries. Even where the source is nominally public, reliable access, email verification and structured legal/company matching may create external service dependencies that a pure Maps scraper does not have.

### Operating complexity

The ongoing burden is distributed across two highly variable source classes: Google Maps and arbitrary company websites. A run can successfully find a business but fail to find an email because the business lacks a site, the site lacks a public email or blocks the crawler. The product must communicate those distinctions clearly so missing enrichment is not mistaken for a product failure.

Large searches also require geographic expansion and deduplication, while optional add-ons add their own availability and matching-quality issues. This supports a Medium-High operating-complexity assessment even though customer delivery remains self-service.

### Cost intensity

The model has low fixed cost but meaningful variable sensitivity.

#### Observed cost inputs

- Base customer charge: **$1.89/1K places** before discounts.
- Add-ons: roughly **$0.50-$2.00/1K successful matches** depending on enrichment.
- Standard Apify PPE creator economics: **80% of paid event revenue minus platform costs**.

#### Cost assumptions

Exact compute, proxy and external-enrichment costs are private. A practical scenario is that platform plus enrichment costs consume **20%-50% of the creator's pre-cost 80% share**, with the lower end applying to straightforward Maps/site crawling and the higher end to difficult sites or external enrichment.

#### Estimated cost range / scenarios

At the base revenue scenario of about $1.23K/month, the standard 80% creator share is about **$983/month before costs**. A 20%-50% variable-cost assumption implies approximately **$197-$492/month of direct platform/enrichment cost**, leaving roughly **$491-$786/month contribution** before development/support labour. Add-on revenue can improve or worsen this depending on the underlying external cost of each event.

#### Margin / economic impact and confidence

The case can be economically attractive at relatively small scale, but margin is sensitive to website-crawl efficiency and enrichment cost because the base unit price is low. Charging only on successful enrichment protects customer value but places failed lookup cost on the provider. **Confidence: Low-Medium** for numeric cost estimates; high confidence in the direction of the cost drivers.

## 4. Case Findings

### Intrinsic characteristics

Lead-generation value increases materially when raw business discovery is combined with usable contact data, deduplication and qualification signals. Public-source availability keeps fixed entry cost low, while heterogeneous sources make data quality a recurring product concern.

### Case-specific characteristics

The exact set of ad-detection, registry, legal-entity and email-validation events is LurkAPI's chosen product design rather than an area-wide requirement. A competitor could differentiate through a vertical schema, another data source, CRM workflow or different enrichment stack.

### Wider opportunity-area relevance

The case is strong evidence for the community-research hypothesis that a recent entrant can compete by moving one step closer to the buyer's outcome. It also shows the trade-off: each enrichment layer increases differentiation but also technical, operational and cost complexity.

### Key uncertainties

- Monthly result volume and add-on attach rates are private.
- Current user counts are still early and do not prove long-term retention.
- Website-derived contact coverage varies structurally by business and geography.
- External enrichment/verification costs are not public.

## 5. Evidence and Sources

### Sources

- Apify Store — LurkAPI Google Maps Business Leads Scraper: https://apify.com/lurkapi/google-maps-business-leads-scraper
- Apify Store — Actor API page: https://apify.com/lurkapi/google-maps-business-leads-scraper/api
- Public GitHub repository: https://github.com/WaveLeKick/google-maps-business-leads-scraper
- Apify Docs — Pay-per-event pricing and creator profit: https://docs.apify.com/actors/publishing/monetize/pay-per-event
- Apify Docs — Actors in Store / pricing models: https://docs.apify.com/actors/running/actors-in-store

### Material inferences and limitations

- Revenue scenarios infer places processed per monthly active user and exclude unknown add-on attach rates.
- Cost scenarios are sensitivity analysis; no private platform or enrichment invoices are available.
- Monthly active users are an adoption proxy, not a count of paying customers.
