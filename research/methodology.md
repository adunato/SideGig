# Research Methodology

## Status

Draft. This document defines the research process from broad channel discovery through opportunity-area assessment and capability requirements.

The methodology is deliberately structured from general to specific:

**Channel classes → Channels → Opportunity areas**

Capability analysis complements the market analysis. It describes what is required to compete at the relevant taxonomy level; it does not replace or alter the market-attractiveness assessment.

---

# Phase 1 — Channel Landscape

## Step 1 — Define the Channel Assessment Framework

Establish the common criteria used to assess commercial attractiveness consistently.

The assessment framework uses seven core metrics:

1. **Paying demand**  
   Evidence that customers currently spend money through the channel.

2. **Opportunity density**  
   Whether there is sufficient demand relative to effective supply.

3. **New-entrant attainability**  
   Whether a seller entering now can realistically capture meaningful demand.

4. **Revenue potential**  
   Whether modest success can plausibly generate approximately £2,000–£5,000 per year.

5. **Competitive pressure**  
   How difficult it is to create an offering that buyers will choose over existing alternatives.

6. **Production leverage**  
   Whether software development, automation and AI can provide a material production advantage.

7. **Operating burden**  
   The ongoing maintenance, support, infrastructure, customer-service and other commitments required to earn revenue.

Two supporting assessments are also recorded:

- **Trend** — Growing, Stable, Declining or Unclear.
- **Overall evidence confidence** — High, Medium or Low.

Each core metric is recorded using:

- **Score (1–5)**
- **Confidence — High / Medium / Low**
- **Evidence and rationale**

For every metric, **5 represents the more attractive condition and 1 the less attractive condition**.

The detailed definitions and evidence examples for the framework are maintained in [channel-assessment-framework.md](channel-assessment-framework.md).

---

## Step 2 — Define Channel Classes

Identify the broad classes of sales and distribution channels that should be investigated.

A **channel class** is a family of channels with sufficiently similar route-to-market characteristics to be researched together.

For each channel class, record:

- Channel class name
- Description

The purpose of this step is to define the overall search landscape before individual channels are discovered.

Channel classes are maintained in [channel-classes.md](channel-classes.md).

---

## Step 3 — Identify Channel Discovery Sources

For each channel class, identify suitable research sources for discovering channels within that class.

Sources may differ substantially between channel classes. The methodology therefore defines the purpose of the research rather than prescribing a fixed list of sources.

Potential sources may include:

- marketplace directories;
- industry lists;
- platform documentation;
- specialist articles;
- community discussions;
- search engines;
- other relevant discovery sources.

Record the selected discovery sources under the relevant channel class in [channel-classes.md](channel-classes.md).

This step establishes **where channel discovery will be performed before the discovery pass begins**.

---

## Step 4 — Discover Channels

For each channel class, work through the identified discovery sources and identify the material candidate channels.

For every discovered channel:

1. Add it to the master channel index in [channels.md](channels.md).
2. Create an individual channel document under [`channels/`](channels/).
3. Record:
   - channel name;
   - channel class;
   - URL;
   - description of what the channel is;
   - what sellers can offer through it;
   - what market or buyer base it provides access to.

This is a **discovery pass only**.

Do not assess channel attractiveness during this step. Discovery and assessment remain separate so that the comparison landscape is established before conclusions are formed.

If a material channel is discovered incidentally during later research, add it to the inventory rather than ignoring it. This does not require reopening the entire discovery phase.

---

## Step 5 — Assess Channels

Assess every discovered channel using the common Channel Assessment Framework.

Each channel is assessed on:

1. Paying demand
2. Opportunity density
3. New-entrant attainability
4. Revenue potential
5. Competitive pressure
6. Production leverage
7. Operating burden

Each metric records:

- **Score (1–5)**
- **Confidence — High / Medium / Low**
- **Evidence and rationale**

Supporting assessments record:

- Trend
- Overall evidence confidence
- Material evidence gaps or limitations

### Evidence and inference rules

Commercial data will often be incomplete or private. The objective is therefore to make the strongest defensible assessment from the available evidence rather than requiring perfect data.

For each metric:

1. Seek direct and current evidence first, prioritising first-party or directly observable marketplace data.
2. Where direct evidence is unavailable, triangulate from relevant proxies.
3. Assign a score whenever the combined evidence supports a defensible directional conclusion.
4. Record clearly:
   - the evidence;
   - the inference drawn from it;
   - significant assumptions;
   - limitations;
   - confidence.
5. Use **Insufficient evidence** only where the available evidence is genuinely too weak or contradictory to support even a directional assessment.

Relevant proxy evidence may include:

- revenue or marketplace payout information;
- transactions or usage;
- reviews and review velocity;
- rankings;
- catalogue size;
- seller activity;
- product age;
- pricing;
- subscriber or user counts;
- public seller earnings;
- search visibility;
- community or seller reports.

Individual anecdotes, seller case studies and community discussions may contribute evidence but should not define the assessment by themselves.

Evidence should be weighted according to:

- relevance;
- recency;
- reliability;
- representativeness.

Channel scale must not be confused with seller opportunity. A large marketplace may still be unattractive if demand is concentrated among entrenched sellers, while a smaller marketplace may provide better opportunities for new entrants.

The result of Phase 1 is a consistently assessed and comparable set of channels within each channel class.

---

# Phase 2 — Opportunity Areas Within Each Channel

Phase 2 applies the same analytical pattern at a smaller scale.

At Phase 1 level:

**Channel class → discover channels → assess channels**

At Phase 2 level:

**Channel → discover opportunity areas → assess opportunity areas**

The unit of comparison changes, but the assessment framework remains the same.

An **opportunity area** is a commercially coherent segment within a channel containing multiple existing or potential products that address broadly similar buyer needs and operate under sufficiently similar demand, supply and competitive conditions to be assessed together.

Opportunity areas should normally be defined by the commercial problem or buyer use case rather than solely by technology, product format or marketplace taxonomy.

A native marketplace category may help identify an opportunity area, but it is not automatically treated as one.

---

## Step 6 — Identify Opportunity-Area Discovery Sources

For each channel selected for within-channel analysis, identify suitable sources for discovering the opportunity areas within that channel.

The available sources will depend on the channel.

Potential sources may include:

- native marketplace categories;
- marketplace search;
- product catalogues;
- marketplace APIs;
- rankings or bestseller pages;
- seller directories;
- public product statistics;
- platform documentation;
- third-party directories or analysis;
- other sources that reveal the channel's internal commercial structure.

The objective is to establish **where the opportunity-area landscape will be discovered before assessing it**.

Sources should provide broad coverage of the channel rather than being chosen merely because they highlight an interesting individual product or seller.

---

## Step 7 — Discover Opportunity Areas

Work through the identified sources and map the materially distinct opportunity areas within the channel.

For every opportunity area, record:

- Opportunity-area name
- Description
- Buyer need or commercial use case
- Basis for identifying the area
- Relevant product examples
- Important overlaps, exclusions or boundaries

This is a **discovery pass only**.

Do not score or prioritise opportunity areas during this step.

The objective is to establish the comparison set before attractiveness judgements are made.

### Taxonomy discipline

Marketplace taxonomies may mix:

- buyer markets;
- product forms;
- technologies;
- implementation approaches;
- editorial categories.

These should not automatically become opportunity areas.

For example, terms such as API, plugin, template, MCP server, dataset or scraper may describe how a product is delivered rather than the commercial market it serves.

Opportunity areas should be separated where their demand, competition or buyer use cases are materially different, and combined where the commercial dynamics are substantially the same.

If a material opportunity area is discovered later during assessment, it should be added rather than ignored. This does not require rerunning the entire discovery exercise.

---

## Step 8 — Assess Opportunity Areas

Assess every discovered opportunity area using the **same assessment framework used for channels**.

Each opportunity area is assessed on:

1. **Paying demand**
2. **Opportunity density**
3. **New-entrant attainability**
4. **Revenue potential**
5. **Competitive pressure**
6. **Production leverage**
7. **Operating burden**

Each metric records:

- **Score (1–5)**
- **Confidence — High / Medium / Low**
- **Evidence and rationale**

Supporting assessments record:

- Trend
- Overall evidence confidence
- Material evidence gaps or limitations

The same scoring direction applies:

**5 = more attractive**  
**1 = less attractive**

The same evidence and inference rules established in Step 5 also apply.

The difference is the **scope of evidence**.

For example:

- Channel-level paying demand asks whether customers spend money through the channel overall.
- Opportunity-area paying demand asks whether customers spend money on products within that particular area.

Likewise:

- Channel-level new-entrant attainability asks whether new sellers can succeed within the channel.
- Opportunity-area new-entrant attainability asks whether new sellers or products can gain traction within that particular commercial area.

Evidence should therefore be relevant to the opportunity area being assessed rather than inherited automatically from the wider channel.

Channel-level evidence may provide context, but it does not prove that every opportunity area within the channel is attractive.

The result of Phase 2 is a consistently assessed and comparable set of opportunity areas within the channel.

---

# Phase 3 — Opportunity Deep Dive and Capability Requirements

Phase 3 adds a capability analysis that runs in parallel with and complements the market analysis. It is intended to establish **what is required to compete**, independently of whether those requirements match any particular person's current capabilities.

Capability requirements are described using five dimensions:

1. **Technical complexity** — the engineering and technical sophistication required to build and operate a credible offering.
2. **Domain expertise** — the subject-matter understanding required to understand the buyer, product requirements and useful differentiation.
3. **Data / resource access** — the datasets, APIs, accounts, infrastructure, third-party services or other resources required to compete.
4. **Operating complexity** — the ongoing operational capability required after launch, including maintenance, monitoring, reliability and support.
5. **Cost intensity** — the material build and ongoing cost requirements, including the principal drivers of variable or recurring cost.

Capability requirements are recorded separately from market-attractiveness scores.

## Step 9 — Define Channel-Level Capability Prerequisites

Establish the baseline capability and resource requirements that apply to operating in the channel regardless of the particular opportunity area.

Assess the channel baseline using the five capability dimensions. These requirements form the common foundation inherited by deeper opportunity-area analysis.

---

## Step 10 — Select Representative Case Studies

For each opportunity area being developed further, select representative real products or providers for deeper case-study analysis.

The purpose is to ground subsequent conclusions in how actual opportunities work rather than inferring capability requirements solely from the opportunity-area label.

The detailed case-study selection methodology is defined separately.

---

## Step 11 — Execute Case Studies

Research the selected cases as complete opportunities rather than capability examples alone.

Case studies should build practical understanding of the opportunity, including its specific demand, customers, proposition, competition, economics, implementation, operating model, resources and capability requirements.

The detailed case-study methodology and template are defined separately.

---

## Step 12 — Extrapolate Case-Study Findings to Opportunity-Area Capability Requirements

Synthesize the representative case studies to describe the capability requirements of the opportunity area as a whole.

Assess the area using the same five capability dimensions:

1. Technical complexity
2. Domain expertise
3. Data / resource access
4. Operating complexity
5. Cost intensity

The synthesis should distinguish requirements that appear broadly necessary across the area from those that are specific to individual cases or business models.

For each conclusion, retain the evidence or case-study basis and the confidence of the inference. Evidence, inference and confidence are research-quality requirements rather than separate methodology steps.

The result is an objective capability profile for the opportunity area that complements its market-attractiveness assessment.

---

# Document Structure

Channel documents may remain as individual files while they contain only channel-level research. When deeper research creates additional artifacts, the channel is promoted to a folder:

```text
channels/
  <channel>/
    overview.md
    capability.md
    case-studies/
      <case-study>.md
```

- **`overview.md`** contains the channel and opportunity-area market analysis.
- **`capability.md`** contains channel-level and opportunity-area capability requirements.
- **`case-studies/`** contains the representative opportunity case studies used for deeper analysis.

This hierarchy mirrors the research without requiring every discovery-only channel to become a folder prematurely.

---

# Current Methodology Boundary

The methodology currently covers:

**Channel classes → Channels → Opportunity areas → Capability requirements**

It establishes the high-level role of representative case studies but does not yet define the detailed case-study selection and execution methodology or the next specific-opportunity selection process.

Personal capability fit is outside the current methodology boundary.