# Research Methodology

## Status

Draft. This document defines the research process incrementally as each step is agreed.

## Step 1 — Define the Channel Assessment Framework

Establish the criteria used to assess and compare channels consistently before channel discovery begins.

The canonical framework is defined in [channel-assessment-framework.md](channel-assessment-framework.md).

## Step 2 — Define Channel Classes

Identify the broad classes of channels that should be investigated.

For each channel class, record:

- Channel class name
- Description

Channel classes are maintained in [channel-classes.md](channel-classes.md).

## Step 3 — Identify Research Sources by Channel Class

For each channel class, run a distinct research activity to identify the sources that can be used to discover channels within that class.

Record the research sources directly under the relevant class in [channel-classes.md](channel-classes.md).

This step establishes where channel discovery will be performed before the discovery pass begins.

## Step 4 — Discover Channels

For each channel class, work through its identified research sources and identify candidate channels.

For every channel discovered:

1. Add the channel to the master index in [channels.md](channels.md).
2. Create an individual channel document in [`channels/`](channels/) using [templates/channel-template.md](templates/channel-template.md).
3. Record the channel class and a descriptive paragraph explaining what the channel is, what it enables sellers to offer, and the market it provides access to.

This is a discovery pass only. The channel assessment is not populated during this step. Each channel document is created as a skeleton that can be expanded incrementally by later research steps.

If a material channel is discovered incidentally during a later research step, add it to [channels.md](channels.md) and create its channel document rather than ignoring it. This does not reopen Step 4 as a separate discovery exercise.

## Step 5 — Assess Channels

For every discovered channel, research and populate the Channel Assessment section of its individual channel document.

The assessment must use the criteria and scoring defined in [channel-assessment-framework.md](channel-assessment-framework.md), with supporting evidence retained in the channel document.

Each metric must be recorded using four fields:

- **Metric**
- **Score (1–5)**
- **Confidence** — High, Medium or Low
- **Evidence and rationale**

Confidence is recorded per metric because evidence quality can vary substantially within the same channel. The existing overall evidence-confidence assessment may still be retained as a channel-level summary.

### Evidence and inference rules

Channel-level commercial data will often be incomplete or private. The assessment must therefore make the strongest defensible judgement from the available evidence rather than defaulting to an unscored result.

For each metric:

1. Seek direct, current evidence first, prioritising first-party sources where available.
2. Where direct evidence is unavailable, triangulate from relevant proxies such as review counts and velocity, rankings, catalogue size, product age, seller activity, pricing, subscriber or usage indicators, public seller revenue reports, search visibility, community reports and other observable market signals.
3. Assign a 1–5 score whenever the combined evidence supports a defensible directional conclusion, even when that conclusion relies partly or wholly on inference.
4. Record the evidence used, the inference drawn from it, the important assumptions or limitations, and a High, Medium or Low confidence level for the metric.
5. Use **Insufficient evidence** only when the available signals are genuinely too weak or contradictory to support even a directional judgement.

Low confidence does not prevent a score from being assigned. A low-confidence score represents the current best estimate and distinguishes uncertainty in the evidence from the substantive assessment of the channel.

### Evidence quality

Evidence should be weighted according to relevance, recency and reliability. First-party marketplace or platform data should normally carry the greatest weight, followed by credible independent analysis and observable marketplace data. Individual seller reports and community discussions are useful supporting evidence, particularly for new-entrant attainability and operating experience, but should be triangulated where possible.

Where a score depends on proxy evidence, the channel document must identify the proxy explicitly and explain why it is informative for the metric being assessed.

### Scoring consistency

Scores must use a consistent direction: **5 represents the more attractive condition for this research objective and 1 the less attractive condition**. Metrics whose natural wording is negative must therefore be interpreted accordingly; for example, a high score for competitive pressure means relatively low competitive pressure, and a high score for operating burden means relatively low ongoing burden.

Update [channels.md](channels.md) to reflect the channel's assessment status.

Discovery and assessment are separate passes so that the landscape is mapped before channels are evaluated.