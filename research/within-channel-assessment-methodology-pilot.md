# Opportunity Area Assessment Methodology Pilot

## Status

Provisional sub-methodology for review. This document does **not** change the canonical [research methodology](methodology.md).

It supersedes the earlier within-channel methodology proposals. Its purpose is to define the next analytical level cleanly and to mirror the existing Channel Assessment approach as closely as possible.

This document stops at **Opportunity Area Assessment**. It does not define how specific product opportunities are subsequently generated, selected or validated.

---

## 1. Analytical hierarchy

The research proceeds from broad distribution structures toward progressively narrower commercial units:

**Channel class → Channel → Opportunity area → Specific opportunity**

### Channel class

A broad family of sales/distribution channels with similar route-to-market characteristics.

Example: `API and Microservice Marketplaces`.

### Channel

A specific marketplace, store, platform or distribution mechanism through which sellers reach buyers.

Example: `Apify Store`.

Within a channel class, **channels are the units being discovered and assessed**.

### Opportunity area

A commercially coherent segment **inside a channel** containing multiple existing or potential products that address broadly similar buyer needs and operate under sufficiently similar demand, supply and competitive conditions to be compared as one market area.

Within a channel, **opportunity areas are the units being discovered and assessed**.

An opportunity area should normally be defined by the **buyer need / commercial use case**, not merely by implementation technology or delivery format.

Examples across different channels could include:

- recruitment-data products inside an API marketplace;
- ecommerce-conversion extensions inside an app marketplace;
- financial-model templates inside a template marketplace;
- environment asset packs inside a game-asset marketplace;
- technical-certification courses inside an education marketplace.

### Product form

The way value is packaged or delivered, such as an API, plugin, template, dataset, scraper, MCP server, course or downloadable file.

A product form is not automatically an opportunity area. It may cut across several commercially different buyer needs.

### Native category

A category or tag supplied by the channel itself.

Native categories are useful discovery inputs but are not assumed to be the correct analytical taxonomy. A channel may mix buyer markets, technologies, product forms and editorial labels in the same category system.

### Specific opportunity

A concrete product proposition within an opportunity area, defined around a particular buyer, problem, product/output and competitive gap.

Specific opportunities are **outside the scope of this sub-methodology**.

---

## 2. The same assessment pattern at a smaller scale

Opportunity Area Assessment is deliberately the same general market-assessment pattern already used for channels, applied one level deeper.

| Assessment level | Container | Units discovered and assessed |
|---|---|---|
| Channel Assessment | Channel class | Channels |
| Opportunity Area Assessment | Channel | Opportunity areas |

The corresponding process is:

| Channel research | Opportunity-area research |
|---|---|
| Identify research sources for a channel class | Identify research sources for the selected channel |
| Discover channels | Discover opportunity areas |
| Assess every discovered channel | Assess every discovered opportunity area |
| Compare completed channel assessments | Compare completed opportunity-area assessments |

There is no separate `screen`, `deep-dive`, `hold`, `proceed` or `do not pursue` stage inside Opportunity Area Assessment.

Just as Channel Assessment does not first lightly score channels and then invent a second assessment framework for selected channels, Opportunity Area Assessment should not do that either.

The output is simply a complete, consistently assessed comparison set at the opportunity-area level.

### Why there is no equivalent of `Define Channel Classes`

The overall methodology required a separate step to define **channel classes** because channel discovery was being performed across the entire market landscape and therefore needed broad containers.

At the opportunity-area level, the selected **channel is already the container**. Introducing another formal level such as `opportunity-area classes` would add an unnecessary hierarchy between the channel and the opportunity areas being assessed.

The discovery task therefore moves directly from the selected channel to its opportunity areas.

---

## 3. Assessment framework

The seven established [Channel Assessment Framework](channel-assessment-framework.md) metrics remain valid at opportunity-area level.

The concepts do not change. Only the **evidence boundary** changes from the whole channel to one commercial area inside that channel.

| Metric | Channel-level meaning | Opportunity-area meaning |
|---|---|---|
| **Paying demand** | Genuine purchasing activity across the channel | Genuine purchasing activity for products serving this opportunity area |
| **Opportunity density** | Demand relative to effective supply across the channel | Demand relative to effective supply inside this opportunity area |
| **New-entrant attainability** | Whether a seller entering the channel now can capture demand | Whether new products/sellers entering this area now can capture demand |
| **Revenue potential** | Whether modest channel success can plausibly produce £2,000–£5,000/year | Whether a modestly successful product in this area can plausibly produce £2,000–£5,000/year |
| **Competitive pressure** | Difficulty creating an offering buyers choose within the channel | Difficulty creating an offering buyers choose over direct alternatives in the area |
| **Production leverage** | Whether products sold through the channel reward software, AI and automation capability | Whether products in this area specifically allow software, AI or automation to create a material production advantage |
| **Operating burden** | Ongoing obligation created by selling through the channel | Typical ongoing obligation associated with products in this area, including maintenance, support, fulfilment and live-service requirements |

The same scoring semantics apply:

- each metric receives a **1–5 attractiveness score**;
- **5 always represents the more attractive condition**;
- each metric records **High / Medium / Low confidence**;
- evidence and reasoning are retained alongside the score;
- Trend and overall evidence confidence remain supporting assessments rather than scored attractiveness metrics.

---

## 4. Additional metric: Capability fit

Opportunity Area Assessment adds one metric that is not used at whole-channel level.

### Definition

**Capability fit** measures the extent to which the knowledge and judgement required to understand the buyer problem, design a valuable product and assess the quality of the resulting output already exist within the project's capabilities or are closely transferable from them.

It is specifically about **substantive ability to operate competently in the opportunity area**, not merely the technical ability to build something.

A high Capability fit means that the project can reasonably:

1. understand what the buyer is trying to achieve;
2. recognise what makes a product in the area good or bad;
3. make informed product/design trade-offs;
4. detect important errors or quality problems;
5. create differentiated value using existing knowledge or closely adjacent expertise.

A low Capability fit means that producing something may be technically possible, but the project lacks important domain knowledge, professional judgement, creative skill, specialist knowledge or buyer understanding needed to know whether the product is genuinely good.

### Examples

- A technically simple legal-document product could have **low Capability fit** if evaluating legal correctness requires expertise we do not possess.
- A developer-facing LLM evaluation tool could have **high Capability fit** if the buyer problems, quality criteria and underlying technical concepts are already well understood.
- A graphic-asset marketplace may offer strong commercial demand and high automation potential but still have **low Capability fit** if success depends primarily on artistic judgement that is not part of the existing capability base.

### Difference from Production leverage

These are deliberately separate questions:

- **Capability fit:** *Do we understand this market/problem well enough to create and judge a good product?*
- **Production leverage:** *Can software, AI or automation give us a material advantage in producing it?*

An area can therefore score:

- high Capability fit / low Production leverage;
- low Capability fit / high Production leverage;
- high on both;
- low on both.

This separation directly reflects the project requirement that automation must not substitute for missing domain expertise.

### Scoring anchors

| Score | Capability fit meaning |
|---:|---|
| **1** | Critical domain or quality knowledge is absent; we could build something but could not confidently judge whether it solves the buyer problem well |
| **2** | Significant unfamiliar expertise would be required before credible product decisions could be made |
| **3** | Adjacent knowledge is transferable, but meaningful domain learning or external validation would still be required |
| **4** | Strongly adjacent expertise; buyer problem and quality criteria are mostly understandable with limited additional learning |
| **5** | Strong existing understanding of the buyer, problem domain and quality criteria; products can be designed and evaluated confidently |

---

## 5. Opportunity Area Assessment process

The process intentionally mirrors the existing channel research sequence.

### Step OA1 — Identify Research Sources for the Channel

Identify the sources that can be used to discover and later assess opportunity areas inside the selected channel.

The source set is channel-specific because different channels expose different information.

Possible sources include:

- native categories and search/browse interfaces;
- marketplace APIs or catalogue exports;
- rankings, bestseller lists or usage statistics;
- seller directories;
- pricing pages;
- reviews and ratings;
- platform analytics exposed publicly;
- independent marketplace directories or analyses;
- buyer/seller community discussions;
- other sources that materially improve coverage.

This step establishes **where opportunity-area discovery will be performed** before discovery begins.

A source is a discovery or evidence source; finding an interesting article or case study does not itself define an opportunity area.

### Step OA2 — Discover Opportunity Areas

Work through the identified sources and map the material commercial opportunity areas inside the channel.

For every discovered area, record:

- Opportunity area name
- Description of buyer need / commercial use case
- Types of products currently serving that need
- Basis for identifying the area
- Relevant native categories or product-form attributes
- Representative examples used only to make the area concrete
- Known overlaps or taxonomy limitations

Discovery is a separate pass from assessment.

Do not score areas, select winners or start detailed research into one area while the opportunity landscape is still being mapped.

The objective is a sufficiently complete comparison set, not a perfect mutually exclusive taxonomy. Some overlap between areas is acceptable where real products serve multiple buyer needs, but each area must be commercially meaningful enough to assess independently.

### Step OA3 — Assess Opportunity Areas

For **every discovered opportunity area**, research and populate a standard Opportunity Area Assessment using:

1. Paying demand
2. Opportunity density
3. New-entrant attainability
4. Revenue potential
5. Competitive pressure
6. Capability fit
7. Production leverage
8. Operating burden

Supporting assessments:

- Trend
- Overall evidence confidence
- Principal evidence gaps where material

Each metric receives:

- 1–5 attractiveness score
- High / Medium / Low confidence
- Evidence and rationale

The same evidence/inference principles used for Channel Assessment apply:

- seek direct current evidence first;
- use triangulation and proxies where direct commercial data is private;
- make a defensible directional judgement rather than defaulting to abstention;
- distinguish low-confidence evidence from a weak substantive score;
- retain the evidence and assumptions behind the conclusion;
- prevent single anecdotes or articles from dominating the assessment.

The evidence sought should be appropriate to the metric and the channel. Examples include sales, payouts, usage, reviews, active products, seller counts, pricing, rankings, recent entrant outcomes, catalogue concentration, free substitutes, support requirements and maintenance characteristics.

Assessment continues until **all discovered opportunity areas have been assessed consistently**.

---

## 6. Final output of Opportunity Area Assessment

The final output is analogous to the completed channel comparison for a channel class.

It contains:

1. **Opportunity Area Index** — the complete set of discovered opportunity areas in the channel.
2. **Individual Opportunity Area Assessments** — evidence-backed assessment of every area against the same eight metrics.
3. **Comparison table** — scores and confidence across all assessed areas.
4. **Evidence gaps and uncertainties** — retained where they materially affect interpretation.

The assessment does **not** itself:

- generate specific product ideas;
- classify areas into arbitrary workflow states;
- define validation experiments;
- recommend building a product;
- introduce a second assessment framework for selected areas.

Those belong to the later methodology for moving from an assessed opportunity area to specific opportunities.

The purpose of Opportunity Area Assessment is narrower and clearer:

> **Produce a complete, comparable view of the commercial opportunity areas inside a channel using the same assessment logic already used to compare channels.**

---

## 7. Research-control rules

These rules exist to prevent the source-driven drift observed in the first Apify pilot.

1. **Sources before discovery:** identify the research-source set before mapping opportunity areas.
2. **Discovery before assessment:** complete the opportunity-area map before scoring areas.
3. **Assess every discovered area:** do not assess only the areas that appear interesting early.
4. **Same framework for every area:** no bespoke criteria because one area has unusually rich or unusual data.
5. **No source-driven branching:** an interesting article, seller story or product adds evidence; it does not change the sequence.
6. **Evidence only informs relevant metrics:** a seller success story may inform entrant attainability but does not automatically prove high demand, density or revenue potential across the area.
7. **Balanced evidence:** actively seek counter-evidence such as weak products, saturation, free substitutes, poor entrant outcomes and operational burden.
8. **Confidence is separate from score:** incomplete data lowers confidence; it does not justify changing the metric definition.
9. **Stop at opportunity areas:** do not generate specific product recommendations during Opportunity Area Assessment.

---

## 8. Relationship to the next methodology stage

Opportunity Area Assessment ends with a comparable set of assessed areas.

The next methodology stage will define how to move from **an assessed opportunity area** to **specific opportunities**.

That later stage should be designed separately rather than being embedded into this sub-methodology prematurely.
