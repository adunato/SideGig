# Within-Channel Assessment Methodology Pilot

## Status

Provisional sub-methodology for review. This document does **not** change the canonical [research methodology](methodology.md).

It supersedes [channel-opportunity-methodology-pilot.md](channel-opportunity-methodology-pilot.md) as the current proposal for analysing the opportunity landscape inside an individual channel.

The objective of this document is methodological clarity. It deliberately stops before defining the later process for generating and assessing specific product opportunities.

---

## 1. Purpose and relationship to the existing methodology

The existing research methodology already performs a broad comparative assessment at **channel-class level**:

**Channel class → identify channels → assess channels → compare channels**

For example, the `API and Microservice Marketplaces` class contains channels such as RapidAPI, Apify Store and Zyla API Hub. Each channel is assessed using the established [Channel Assessment Framework](channel-assessment-framework.md).

Once a channel has been found attractive enough to investigate further, the same general analytical pattern is required at a smaller scale:

**Channel → identify opportunity areas → assess opportunity areas → compare opportunity areas**

This document defines that second process.

The central principle is therefore:

> **Within-channel assessment is the same comparative market-assessment pattern applied one level deeper.**

The unit being compared changes; most of the assessment concepts do not.

---

## 2. Terminology and analytical hierarchy

Clear terminology is necessary because marketplace taxonomies often mix buyer markets, technical product forms and implementation technologies.

### Channel class

A broad family of sales/distribution channels with materially similar route-to-market characteristics.

Example: `API and Microservice Marketplaces`.

### Channel

A specific marketplace, store, platform or distribution mechanism through which sellers reach buyers.

Example: `Apify Store`.

A channel is the comparison unit during the existing class-level Channel Assessment.

### Opportunity area

A **commercially coherent segment inside a channel** containing multiple products or potential products that address broadly similar buyer needs and compete under sufficiently similar demand, supply, economic and operating conditions to be analysed together.

An opportunity area is the comparison unit during Within-Channel Assessment.

An opportunity area should normally be defined primarily by **buyer need / commercial use case**, not by implementation technology.

Examples in different channel types might include:

- recruitment-data products inside a data/API marketplace;
- ecommerce-conversion plugins inside an app marketplace;
- financial-model templates inside a template marketplace;
- environment asset packs inside a game-asset marketplace;
- technical certification courses inside an education marketplace.

The definition is intentionally domain-neutral.

### Product form

The way value is packaged or delivered, such as an API, plugin, template, dataset, scraper, MCP server, course or downloadable file.

A product form is **not automatically an opportunity area**. It may cut across several different buyer markets.

For example, `MCP server` or `open-source wrapper` describes a delivery/implementation form. It becomes an opportunity area only if the products using that form constitute a commercially distinct buyer market with meaningfully different demand and competitive dynamics.

### Native category

A category or tag supplied by the channel itself.

Native categories are useful inputs to landscape mapping but are not assumed to be the correct analytical taxonomy. A marketplace may mix buyer markets, product forms, technologies and editorial labels in the same category system.

### Specific opportunity

A concrete proposition within an opportunity area, defined around a particular buyer, problem, finished product/output and competitive gap.

Specific opportunities are **not** the unit assessed by this sub-methodology. They are the subject of the later research stage that follows a completed Within-Channel Assessment.

---

## 3. The repeated analytical pattern

The two levels of analysis are intentionally analogous.

| Level | Container | Units compared | Purpose |
|---|---|---|---|
| Class-level Channel Assessment | Channel class | Channels | Determine which sales/distribution channels are attractive enough to pursue |
| Within-Channel Assessment | Channel | Opportunity areas | Determine which commercial areas inside that channel are attractive enough for specific-opportunity research |

At both levels the process is:

1. Map the relevant comparison set.
2. Assess every material unit consistently.
3. Compare the completed set.
4. Deep-dive only the units that merit further research.
5. Produce an explicit assessment outcome before moving to a more specific level.

An interesting source, seller story, product listing or trend can contribute evidence, but it cannot change this sequence.

---

## 4. Assessment framework: what stays the same

The seven established Channel Assessment metrics remain conceptually valid at opportunity-area level.

The evidence boundary changes from the whole channel to the relevant area inside the channel.

| Existing metric | Channel-level meaning | Opportunity-area meaning | Decision |
|---|---|---|---|
| **Paying demand** | Current paid activity across the channel | Current paid activity attributable to products in the opportunity area | Reuse |
| **Opportunity density** | Demand relative to effective supply across the channel | Demand relative to effective supply within the opportunity area | Reuse |
| **New-entrant attainability** | Whether a seller entering the channel now can capture demand | Whether new products/sellers entering this opportunity area now can capture demand | Reuse |
| **Revenue potential** | Whether modest channel success can reach the £2k–£5k annual target | Whether a modestly successful product in this area can reach the target | Reuse |
| **Competitive pressure** | Difficulty creating an offering buyers choose in the channel | Difficulty differentiating from direct substitutes within the area | Reuse |
| **Production leverage** | Whether products sold through the channel reward software/AI/automation capability | Whether products in this area specifically allow that capability to create a material production advantage | Reuse |
| **Operating burden** | Ongoing obligation created by selling through the channel | Typical ongoing obligation associated with products in this area, including the channel mechanics | Reuse |

This is deliberate rather than convenient. These seven metrics express the core economic and operating questions the project is trying to answer. Changing them merely because the unit of analysis has become smaller would reduce comparability without improving the decision.

---

## 5. One additional opportunity-area metric: Capability fit

### Definition

**Capability fit** measures whether the opportunity area overlaps sufficiently with existing skills and domain understanding to produce credible products and judge their quality.

A high score means the project has relevant knowledge or transferable expertise and can understand the buyer/problem well enough to make informed product decisions.

A low score means production might be technically possible but would rely on unfamiliar domain expertise or quality criteria.

### Why this is added here but not at channel level

Capability fit is generally too broad to be meaningful for a channel as a whole. A single marketplace can contain products from many unrelated domains.

At opportunity-area level, the buyer problem and product domain have become specific enough for capability fit to be assessed meaningfully.

This addition is also required by the project specification: market demand and personal capability must both be present, and automation must not be treated as a substitute for missing domain expertise.

### Why capability fit remains separate from Production leverage

The two answer different questions:

- **Capability fit:** do we understand this problem/domain well enough to create and judge a good product?
- **Production leverage:** can software, AI or automation give us a material advantage in producing that product?

A technically automatable market can therefore score highly on Production leverage while scoring poorly on Capability fit.

---

## 6. Metrics not added to the broad opportunity-area scorecard

The later specific-opportunity process will need to consider factors such as initial build effort, legal/IP/privacy risk and detailed marketing/distribution dependence.

They are deliberately **not added as core opportunity-area metrics at this stage**.

### Initial build effort

Absolute build effort can vary dramatically between specific products within the same opportunity area. At area level it is more reliable to assess the structural production advantage through Production leverage and then examine actual build effort during the deep dive or specific-opportunity assessment.

### Legal, platform, IP and privacy risk

Some opportunity areas have systematic risk characteristics and these should be recorded during deep dive. However, the decisive risk often depends on the specific source, data, functionality or implementation chosen. Scoring an entire broad area could create false precision.

### Marketing/distribution dependence

At broad area level this is usually reflected indirectly through New-entrant attainability and Competitive pressure. The actual acquisition mechanism should be analysed in the opportunity-area deep dive and later for specific opportunities.

The principle is to add metrics only where the concept is both decision-relevant **and sufficiently stable at the unit being compared**.

---

## 7. Common scoring semantics

Every core metric receives:

- a **1–5 attractiveness score**;
- **High / Medium / Low evidence confidence**;
- concise retained evidence and reasoning.

For every metric, **5 is the more attractive condition and 1 the less attractive condition**.

The following anchors apply at opportunity-area level.

| Metric | 1 — unattractive | 3 — mixed / viable | 5 — strongly attractive |
|---|---|---|---|
| **Paying demand** | Little credible evidence of current paid demand | Credible paid demand exists but depth/scale is moderate or uncertain | Strong direct evidence of substantial current paid demand |
| **Opportunity density** | Effective supply materially overwhelms available demand | Demand/supply balance is viable but not clearly favourable | Strong demand relative to effective supply; meaningful demand appears available beyond incumbents |
| **New-entrant attainability** | Little evidence recent entrants can obtain meaningful traction | Some recent entrants obtain traction, but outcomes are inconsistent or evidence is incomplete | Repeated evidence that recent entrants can acquire meaningful demand |
| **Revenue potential** | Reaching £2k–£5k/year appears implausible even with a credible product | Target appears achievable but requires meaningful success or relies on uncertain assumptions | Target appears achievable with modest success and is supported by pricing/usage/earnings evidence |
| **Competitive pressure** | Mature incumbents, strong substitutes, price compression or commoditisation make differentiation difficult | Competition is meaningful but viable differentiation routes exist | Limited effective competition and/or clear unmet needs create room for differentiated entry |
| **Capability fit** | Material domain/quality knowledge is missing | Adjacent knowledge is transferable but some domain learning would be required | Strong existing understanding of buyer/problem/domain and ability to judge product quality |
| **Production leverage** | Software/AI/automation provides little meaningful advantage | Automation materially helps some aspects of production or quality | Technical capability provides a strong structural advantage in creation, iteration, variation or quality control |
| **Operating burden** | Continuous/high maintenance, support, uptime or customer obligation; poor pauseability | Ongoing work is manageable but periodic maintenance/support is unavoidable | Low ongoing obligation; revenue can continue with limited intervention and activity can largely be paused |

Scores 2 and 4 represent intermediate conditions between the anchors.

These anchors are intentionally evidence-agnostic: different channels can provide different data while still being evaluated against the same substantive meaning.

---

## 8. Supporting assessments

Every opportunity area also records:

- **Trend:** Growing / Stable / Declining / Unclear.
- **Overall evidence confidence:** High / Medium / Low.
- **Principal evidence gaps.**
- **Material constraint/risk flags:** only where a risk appears systematic across the area rather than specific to one hypothetical product.

Trend and confidence do not contribute an attractiveness score.

---

# 9. Within-Channel Assessment stages

## Stage 1 — Map Opportunity Areas

### Purpose

Create the complete comparison set before making attractiveness judgements.

### Procedure

1. Inspect the channel's native categories/taxonomy where available.
2. Inspect a broad cross-section of actual products/listings.
3. Identify materially distinct buyer needs and commercial use cases.
4. Use independent descriptions/directories only as a coverage cross-check where useful.
5. Consolidate these into **opportunity areas** using the definition in this document.
6. Treat product forms and technologies as attributes unless they genuinely represent a distinct buyer market.
7. Retain `Other / residual` where necessary rather than forcing complete classification.

### Required output

| Field | Required content |
|---|---|
| Opportunity area | Stable, domain-neutral name |
| Description | Buyer need/use case and what type of value is purchased |
| Basis for inclusion | Native taxonomy, observed cluster, or other evidence |
| Representative products | Small illustrative sample only |
| Product-form attributes | Relevant forms/technologies where useful |
| Coverage notes | Overlap, exclusions and taxonomy limitations |

### Gate

No area may be selected for detailed research until the material opportunity landscape has been mapped.

No individual product, case study or article can promote an area directly to deep dive during Stage 1.

---

## Stage 2 — Baseline Assessment of All Opportunity Areas

### Purpose

Apply the same scorecard to every mapped opportunity area before selecting any for deeper research.

### Metrics

Every area is assessed on:

1. Paying demand
2. Opportunity density
3. New-entrant attainability
4. Revenue potential
5. Competitive pressure
6. Capability fit
7. Production leverage
8. Operating burden

plus the supporting assessments defined above.

### Minimum evidence package

The objective is a broad directional screen rather than a deep dive. For every area the researcher must nevertheless seek evidence covering each of the following dimensions:

1. **Demand signal** — direct sales/revenue evidence or the strongest credible demand proxy available.
2. **Supply/competition signal** — scale, quality, concentration or other evidence about effective alternatives.
3. **Entrant signal** — recent entrant outcomes where observable, or an explicit statement that this evidence is unavailable.
4. **Economics signal** — pricing, usage economics, seller earnings, customer counts or another basis for revenue plausibility.
5. **Operating-model signal** — typical maintenance, support, fulfilment, uptime or update requirements.
6. **Capability rationale** — why the area does or does not overlap relevant domain/technical expertise.

One source may inform several dimensions if it genuinely contains relevant evidence, but its scope must not be overstated.

### Evidence discipline

- Prefer current first-party or directly observable marketplace evidence.
- Use external quantitative evidence where relevant.
- Use seller/buyer reports and case studies as supporting evidence rather than as the market definition.
- A source may influence only the metrics it actually informs.
- For every favourable conclusion, actively look for material counter-evidence.
- Missing direct data normally reduces confidence and triggers disciplined inference; it does not justify abandoning the comparison framework.
- Stop broad-screen research once a defensible directional assessment exists for every metric. Do not deep-dive one area while others remain unassessed.

### Required output

A single comparison table covering **all opportunity areas**, with score and confidence per metric, plus concise evidence notes.

The full table must be completed before Stage 3.

---

## Stage 3 — Select Opportunity Areas for Deep Dive

### Purpose

Select the areas where additional research is most decision-useful.

Selection is not based on a mechanically summed total score. Different metrics represent different project requirements and some weaknesses can be disqualifying even when the arithmetic total is high.

### Selection logic

An area should normally **not** become a priority deep dive where high- or medium-confidence evidence shows a serious failure on one of the foundational requirements:

- Paying demand is very weak.
- Revenue potential is materially below the target.
- Capability fit is poor.
- Production leverage is poor.
- Operating burden clearly conflicts with the required intermittent model.

Areas with low-confidence evidence may still be selected where resolving the uncertainty could materially change the decision.

Among viable areas, relative priority is then informed by:

- opportunity density;
- new-entrant attainability;
- competitive pressure;
- production leverage;
- operating burden;
- strength/confidence of demand and revenue evidence;
- evidence gaps worth resolving.

### Required output

Every opportunity area receives one disposition:

- **Deep dive** — sufficiently attractive and/or decision-relevant to justify detailed research.
- **Hold / evidence resolution** — potentially attractive but blocked by a material evidence gap.
- **Do not pursue at present** — current evidence indicates poor fit or weak commercial attractiveness.

Each disposition must cite the metrics that drive it.

---

## Stage 4 — Deep Dive Selected Opportunity Areas

### Purpose

Replace the directional screen with a stronger, more granular assessment of each selected area before any specific product opportunity is generated.

The deep dive uses the **same eight metrics** rather than introducing a new narrative framework. The difference is depth of evidence and granularity.

### Required analysis by metric

#### Paying demand

- Who is buying and why?
- What direct or proxy evidence establishes current demand?
- Is demand broad or concentrated in a few products/subsegments?
- What free/off-channel substitutes exist?

#### Opportunity density

- What is the effective supply serving the same buyer need?
- How is demand distributed across that supply where observable?
- Are there subsegments with materially different demand/supply balance?

#### New-entrant attainability

- Can recent products/sellers gain meaningful traction?
- What distinguishes successful and unsuccessful entrants?
- How does marketplace discovery/ranking/curation affect entry?

#### Revenue potential

- Typical pricing/monetisation model.
- Platform fees and variable costs relevant to the area.
- Plausible customers/sales/usage required to reach £2k–£5k annually.
- Actual seller outcomes where available.

#### Competitive pressure

- Number and quality of serious competitors.
- Incumbent strength/concentration.
- Free substitutes and price pressure.
- Current differentiators and visible unmet needs.

#### Capability fit

- Domain knowledge needed to understand buyer requirements.
- Ability to judge product quality and correctness.
- Missing knowledge that would need to be acquired.

#### Production leverage

- What parts of creation, testing, variation or maintenance can be automated?
- Does technical capability create an advantage over ordinary sellers or merely allow market entry?
- Are there scalable/reusable production components?

#### Operating burden

- Typical initial-to-live operating model.
- Maintenance/update/support frequency.
- Live infrastructure or volatile third-party dependencies.
- Customer-service expectations.
- Ability to pause activity without harming customers.

### Sampling discipline

Where complete population data is unavailable, the sample must be explicit and balanced rather than source-driven.

It should normally cover:

- leading/incumbent products;
- meaningful mid-tier products;
- recent entrants;
- weak/failed products where observable.

The document must state how the sample was chosen and what population it is intended to represent.

### Reassessment

At the end of the deep dive, all eight scores and confidence levels are revisited using the stronger evidence.

A deep dive therefore produces an **updated opportunity-area assessment**, not merely a prose market report.

---

## Stage 5 — Produce the Within-Channel Assessment Outcome

### Purpose

Close the channel-level analysis before moving to specific opportunity generation.

### Required output

The final Within-Channel Assessment contains:

1. The complete opportunity-area map.
2. The baseline scorecard covering every mapped area.
3. The disposition of every area after the baseline screen.
4. Deep-dive assessments for the selected areas.
5. Updated scores/confidence after deep dive.
6. A final list of opportunity areas classified as:
   - **Proceed to specific-opportunity research**
   - **Hold / evidence resolution**
   - **Do not pursue at present**
7. Principal evidence gaps and systematic risk/constraint flags.

The output should explain **which areas of the channel merit further research and why**.

It should **not yet propose the final products to build**. That is the next analytical level.

---

## 10. Research-control rules

These rules exist to prevent the source-driven drift exposed by the first Apify pilot.

1. **Map before judging.** Complete the material opportunity-area map before selecting winners.
2. **Compare before deep-diving.** Complete the baseline assessment for every mapped area before detailed research begins.
3. **Same ruler for every area.** Use the same eight metrics and scoring semantics across all areas.
4. **No source-driven branching.** A new source adds evidence; it does not change the research sequence.
5. **No anecdote as market structure.** Seller stories can inform specific metrics but cannot define the taxonomy or overall conclusion.
6. **Keep analytical levels separate.** Channel evidence is not automatically evidence for an opportunity area; opportunity-area evidence is not automatically evidence for a specific product.
7. **Separate score from confidence.** Weak data reduces confidence; it does not automatically produce a neutral score or an `Insufficient evidence` result.
8. **Use balanced samples.** Deep dives must include more than successful leaders where weaker/recent products are observable.
9. **Do not sum blindly.** Scores support comparison but do not override foundational project constraints.
10. **Stop at the current level.** Within-Channel Assessment ends with qualified opportunity areas, not speculative product recommendations.

---

## 11. Relationship to the next methodology stage

This sub-methodology intentionally ends at **qualified opportunity areas**.

The next stage will need to define how to move from a qualified area to:

1. specific opportunity discovery;
2. specific opportunity assessment;
3. validation experiments;
4. eventual product selection.

That later framework should reuse concepts from this assessment where they remain valid, but additional product-specific factors such as absolute build effort, implementation-specific risk, legal/IP/privacy exposure and concrete differentiation can then be assessed at the level where they are actually meaningful.

The next stage should be designed only after this Within-Channel Assessment method has been reviewed and successfully tested against at least one channel.