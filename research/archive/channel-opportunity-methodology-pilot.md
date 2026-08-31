# Channel Opportunity Analysis Methodology Pilot

## Status

Provisional methodology for testing only. This document does **not** change the canonical [research methodology](methodology.md).

It was created after the first Apify opportunity-analysis pilot proved too source-driven and insufficiently structured. The purpose of this document is to define a repeatable funnel that can be applied across materially different channels before any further detailed channel research is performed.

## Objective

The existing Channel Assessment determines whether a sales/distribution channel is attractive at channel level.

The next research layer must answer two progressively narrower questions:

1. **Which kinds of opportunity within this channel are attractive enough to investigate?**
2. **Which specific opportunities within those kinds are credible enough to validate or build?**

The method must remain flexible enough for channels with different products, buyers, public data and market structures, while constraining the research so that individual sources cannot pull the analysis into arbitrary rabbit holes.

## Core principles

### 1. General to specific

Research always moves through explicit levels:

**Channel → Opportunity types → Opportunity-type deep dives → Specific opportunities → Validation**

A lower level is not entered until the broader level has been mapped and assessed.

### 2. Complete the comparison set before selecting winners

The agent must map the material opportunity landscape before advocating a particular opportunity type.

An interesting article, seller story, product listing or trend may be recorded as evidence, but must not cause the agent to skip directly to a deep dive.

### 3. Common framework, channel-specific evidence

The questions and outputs are consistent across channels. The evidence used to answer them may vary by channel.

Examples of evidence include transactions, payouts, reviews, downloads, users, runs, rankings, product counts, pricing, seller histories, marketplace search results, buyer discussions, third-party market data and reasoned proxies.

The method defines **what must be assessed**, not a fixed list of websites or data fields that every channel must provide.

### 4. Evidence breadth before anecdote

Single seller stories, blog posts and platform case studies can be useful evidence, especially for entrant attainability, but they cannot define the market structure by themselves.

They are considered only within a wider evidence set and their representativeness must be stated.

### 5. Confidence is separate from conclusion

Incomplete market data should normally produce a lower-confidence conclusion, not an absence of conclusion. The same inference rules used in channel assessment apply here.

---

# Stage A — Map Opportunity Types

## Purpose

Create a broad but usable taxonomy of the materially different things that can be sold through the channel before assessing which are attractive.

An **opportunity type** is a recurring family of products or buyer use cases within a channel that is commercially meaningful enough to analyse separately.

The taxonomy should be specific enough that different types can have materially different demand, competition or economics, but broad enough that it does not collapse into individual product ideas.

## Procedure

1. Start from any native marketplace taxonomy, categories or product classifications exposed by the channel.
2. Inspect a broad cross-section of listings/products to identify material product types not captured well by the native taxonomy.
3. Use independent marketplace descriptions or directories as a coverage cross-check where useful.
4. Merge categories that are commercially indistinguishable for this research and split categories only when there is clear evidence of materially different buyer/use-case dynamics.
5. Retain a residual `Other / uncategorised` type if necessary rather than forcing every unusual listing into an artificial category.

## Required output

A complete opportunity-type map containing:

| Field | Purpose |
|---|---|
| Opportunity type | Stable name for the type |
| Description | What is sold and the buyer/use case |
| Basis for inclusion | Native category, observed product cluster, or other evidence |
| Representative examples | A small number of examples used only to make the category concrete |
| Coverage notes | Overlaps, exclusions or known taxonomy limitations |

## Gate

Do **not** assess or recommend specific opportunities until the material opportunity types have been mapped.

---

# Stage B — Opportunity-Type Screen

## Purpose

Assess every mapped opportunity type using a common framework before choosing which types deserve detailed research.

## Metrics

Each metric receives a **1–5 score** and **High / Medium / Low confidence**. As in channel assessment, 5 always means the more attractive condition.

| Metric | Question |
|---|---|
| Paying demand | Is there credible evidence that buyers currently spend money on products of this type through the channel? |
| Opportunity density | Is there enough demand relative to effective supply to make the type interesting? |
| New-entrant attainability | Is there evidence that relatively recent entrants can acquire meaningful demand? |
| Revenue potential | Can a modestly successful product of this type plausibly reach the project revenue target? |
| Competitive pressure | How difficult is it for a new product to be chosen over existing alternatives? Higher score = lower pressure. |
| Capability fit | Does the product type overlap with skills/domain understanding that allow quality to be judged and produced credibly? |
| Production leverage | Can software, automation or AI materially reduce production cost, increase quality, or enable useful variants? |
| Operating burden | How compatible is the type with intermittent work and low ongoing support/maintenance? Higher score = lower burden. |

### Supporting assessments

- Trend: Growing / Stable / Declining / Unclear
- Overall evidence confidence: High / Medium / Low
- Principal evidence gaps

## Evidence rules

The screen is deliberately broad rather than exhaustive. It should use enough evidence to reach a directional conclusion for every opportunity type without deep-diving any single type prematurely.

For each type, seek a balanced combination where available of:

- marketplace activity/demand signals;
- supply/listing volume or concentration;
- recent entrant evidence;
- pricing/economics;
- operating model;
- external substitutes or buyer behaviour;
- relevant seller/buyer reports.

Anecdotes may support a score but should not dominate it.

## Required output

A single comparison table covering **all mapped opportunity types**, followed by short evidence notes for each type.

## Gate

Only after the full table is complete may opportunity types be selected for deep dive.

Selection should be based on the combination of market attractiveness, project fit and uncertainty worth resolving—not on whichever source produced the most interesting narrative.

---

# Stage C — Opportunity-Type Deep Dive

## Purpose

For each selected opportunity type, replace the broad screen with a more granular view of its internal market structure.

The evidence available will differ across channels, so this stage specifies analytical questions rather than fixed data fields.

## Required questions

### Demand structure

- What buyer problems/use cases create demand?
- What observable evidence indicates current purchasing or meaningful consumption?
- Is demand concentrated in a few products/subtypes or broadly distributed?
- Are there important free/off-channel substitutes?

### Supply structure

- How many serious competing products/sellers exist?
- How concentrated is adoption/revenue/visibility where observable?
- What differentiators are currently used: price, features, quality, niche, geography, speed, convenience, trust, integration, etc.?
- Are incumbent products mature and defensible or weak/stale/fragmented?

### Entrant dynamics

- Can recent products or sellers gain traction?
- What characteristics distinguish entrants that do gain traction?
- Is discoverability controlled by reviews, ranking, algorithmic recommendation, paid placement, external marketing, curation or another mechanism?

### Economics

- Typical pricing/monetisation model.
- Platform fees and variable costs.
- Plausible sales/usage required to reach the target annual revenue.
- Evidence about actual seller outcomes where available.

### Operating model

- Initial creation effort.
- Ongoing maintenance/update/support burden.
- Dependence on live infrastructure, third-party systems or volatile data sources.
- Ability to pause work without harming customers.

## Sampling discipline

Where a full population cannot be analysed, use an explicit sample rather than ad-hoc examples. The sample should normally include:

- leading/incumbent products;
- mid-tier products;
- recent entrants;
- weak/failed products where observable.

Record how the sample was selected and why it is reasonably informative.

## Required output

A structured deep-dive document/table for the opportunity type, including evidence, conclusions, confidence and unresolved uncertainties.

---

# Stage D — Identify Specific Opportunities

## Purpose

Generate specific opportunity hypotheses **only after** the selected opportunity type has been deep-dived.

Specific opportunities should emerge from observed demand/supply conditions rather than generic brainstorming.

## Sources of opportunity hypotheses

Examples include:

- underserved buyer/use-case segment;
- weak or stale incumbents;
- missing feature/output repeatedly demanded;
- geographic or vertical gap;
- structural cost advantage;
- better packaging/convenience;
- combination/aggregation of existing products;
- higher-value transformation of a commoditised input;
- externally proven product/use case that is poorly served within the channel.

## Required opportunity definition

Each hypothesis must state:

- Buyer
- Problem/use case
- Finished product/output
- Existing alternatives
- Observed gap
- Evidence the gap matters
- Why the channel is appropriate

Do not treat a product idea as an opportunity merely because it is technically possible to build.

---

# Stage E — Specific Opportunity Assessment

## Purpose

Compare specific opportunities consistently before deciding what deserves validation.

## Metrics

The exact scoring framework remains provisional and should be tested during the pilot. At minimum it must cover:

1. Paying-demand evidence
2. Effective competition / differentiation
3. New-entrant evidence
4. Revenue plausibility
5. Capability/domain fit
6. Production leverage
7. Initial build effort
8. Ongoing operating burden
9. Distribution/marketing dependence
10. Legal, platform, IP, privacy and liability risk
11. Evidence confidence

The output should explicitly distinguish **verified fact, inference and unresolved assumption**.

---

# Stage F — Validation Plan

## Purpose

Convert the strongest specific opportunities into cheap tests rather than immediately into build projects.

For each shortlisted opportunity:

1. Identify the uncertainty most capable of invalidating the opportunity.
2. Define the cheapest practical test that materially reduces that uncertainty.
3. State the success/failure signal before running the test.

Examples may include deeper marketplace data collection, buyer-demand checks, technical feasibility tests, competitor review analysis, a minimal listing/product experiment, or another channel-appropriate test.

---

# Research-control rules

These rules exist specifically to prevent agent drift.

1. **No early winner:** do not advocate a product or opportunity type before Stage B is complete.
2. **No source-driven branching:** finding an interesting source adds evidence; it does not change the research sequence.
3. **No anecdote as market map:** a case study can inform entrant dynamics but cannot define the opportunity taxonomy or demand distribution.
4. **Balanced evidence:** for every favourable signal, actively look for counter-evidence such as weak products, saturation, free substitutes, operational burden or failed entrants.
5. **Explicit sample:** when examining products within a type, state how the sample was selected.
6. **Separate levels:** channel-level evidence must not automatically be treated as evidence that every opportunity type within the channel is attractive.
7. **Stop at the current stage:** do not generate specific product recommendations while still mapping or screening opportunity types.
8. **Record uncertainty:** missing data becomes a confidence limitation or a later research question, not an invitation to wander into unrelated searches.

## Pilot test

This provisional methodology will now be tested by repeating the Apify analysis from the beginning. The previous [Apify Market and Opportunity Analysis Pilot](apify-market-opportunity-pilot.md) remains as a record of the source-driven approach that this methodology is intended to replace.
