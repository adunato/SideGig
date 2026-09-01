# Apify Community Search Pilot

- **Status:** Temporary pilot
- **Scope:** Apify-wide community research
- **Date:** 2026-09-01

## Purpose

Test whether community-based research adds useful practical evidence to the existing market and case-study analysis, and identify a simple repeatable structure before changing the formal methodology.

## Pilot Questions

1. **How do people recommend getting started on Apify?**
2. **How do people identify promising Actor opportunities?**
3. **What seems to help a new Actor gain traction?**
4. **What problems or risks do creators repeatedly encounter?**
5. **What does the community evidence suggest about earnings and economics?**

## Community Sources Used

| Source | Use in pilot | Notes |
|---|---|---|
| `r/apify` | Creator experience, revenue, distribution, opportunity selection, pricing | Strongest source for first-hand creator commentary. |
| Adjacent Reddit / builder discussions | Supplementary examples and wider builder behaviour | Used cautiously where evidence is not Apify-specific. |
| Apify & Crawlee Discord via `discord.apify.com` / Answer Overflow | User problems, requested solutions, technical discussions | Publicly indexed subset of Discord; not the full server. |
| Apify Actor Ideas | Explicit submitted demand and open development ideas | Structured rather than conversational, but directly useful for opportunity discovery. |
| Apify official creator / Store documentation | Context and triangulation of community claims | Not itself community evidence; used to validate platform mechanics. |

## Findings

### 1. How do people recommend getting started on Apify?

The technical barrier to publishing is low; the harder problem is choosing something that people will actually use and then getting it discovered.

Apify's own idea guidance recommends starting from problems that fit a background/cloud task, with inspiration coming from personal experience, community discussions, SEO/search demand, competitor gaps and the Actor Ideas catalogue. Community discussions reinforce that simply publishing a technically competent Actor is not enough.

**Pilot finding:** entry appears easiest when starting from an identifiable user problem rather than from a technology or generic desire to "build an Actor".

### 2. How do people identify promising Actor opportunities?

Three recurring approaches appeared:

- **Observed marketplace demand:** builders inspect categories, existing Actor usage and Store search terms. A recent community analysis of ~54K public Actors found demand concentrated particularly around social media, video, jobs and SEO, while also showing that demand is heavily concentrated among leading Actors.
- **Explicit unmet requests:** Apify Ideas provides community-submitted ideas marked `Open to develop`, with upvotes and a mechanism for developers to claim completed ideas.
- **Specific user problems:** Reddit and indexed Discord discussions expose users asking for data or workflows that are difficult to obtain, sometimes directly inviting developers to build a solution.

**Pilot finding:** community sources are useful less for producing a definitive list of markets and more for revealing concrete problems, gaps and buyer language that can then be validated against marketplace data.

### 3. What seems to help a new Actor gain traction?

The strongest recurring community theme is **distribution**.

Creators report that new Actors can remain largely invisible even when technically good. Several discussions describe marketing, Store ranking and external promotion as more important than expected. One creator reporting more than $1,000 monthly revenue from an 18-Actor portfolio explicitly attributed success partly to having a distribution strategy; another reported taking seven months to reach the first $100 without meaningful marketing.

Other recurring observations:

- Apify Store search and quality signals matter for visibility.
- External promotion, including Reddit, can help early discovery.
- A coherent portfolio may create cross-sell benefits where Actors serve related users.
- Making an Actor free can generate usage but may disproportionately attract free users who never convert to paid demand.

**Pilot finding:** new-entrant difficulty is not predominantly technical. Visibility and distribution appear to be a major part of the entry problem.

### 4. What problems or risks do creators repeatedly encounter?

Recurring issues include:

- **Store saturation and duplication:** creators describe many overlapping Actors and difficulty differentiating new products.
- **Winner concentration:** broad marketplace analysis shows large categories can contain substantial total demand while the median Actor receives very little usage.
- **Free-user economics:** creators repeatedly note that visible user/run counts can overstate commercial value because free-plan usage does not necessarily generate creator revenue.
- **Marketplace visibility:** newer, potentially better Actors may remain below established products in discovery/rankings.
- **Pricing-model change:** community discussion around the 2026 retirement of rental pricing shows that platform policy can materially change seller economics.
- **Maintenance and source dependency:** Discord, Actor issues and the case studies show that scraping products can require repeated adaptation to source changes, blocking and incomplete results.

**Pilot finding:** community discussion adds practical risk information that is difficult to infer from Store metrics alone, particularly around distribution, policy changes and day-to-day operating friction.

### 5. What does the community evidence suggest about earnings and economics?

The evidence shows a very wide distribution rather than a typical income level.

Examples reported in `r/apify` include:

- about **$10** after a first month;
- about **$10/month** in a second month;
- about **$380** in a first month in one reported case;
- seven months to reach a first **$100** for another creator;
- more than **$1,000/month** from a portfolio of 18 public Actors in another case.

Other contributors report having hundreds of monthly users but almost no revenue, largely because of free users. Community discussion also suggests that earning a developed-world full-time income purely from public Actor revenue is unusual and likely concentrated among a small minority of builders.

These figures are anecdotes and cannot be treated as a representative revenue distribution.

**Pilot finding:** the most useful community contribution is not a single earnings benchmark; it is evidence of **high variance**, long traction periods, concentration of earnings and the importance of distinguishing usage from paid usage.

## Overall Assessment of the Community Lens

The pilot produced useful information that was either absent or much harder to see in marketplace-level analysis.

### Strongest contributions

- exposes **practical entry barriers**, especially distribution and Store visibility;
- provides first-hand evidence on **time to traction and earnings variance**;
- surfaces **explicit opportunity requests and unmet user problems**;
- reveals seller concerns around **pricing policy, free users and platform incentives**;
- gives context for why apparently attractive demand may still be difficult for a new entrant to capture.

### Weaknesses

- self-selection bias: unsuccessful and successful creators may both be overrepresented in different discussions;
- small samples for earnings claims;
- promotional posts can look like market evidence but are primarily marketing;
- Discord indexing is incomplete;
- anecdotes require triangulation before becoming market conclusions.

## Key Insights from the Pilot

1. **Technical entry is relatively easy; commercial entry is materially harder.** Distribution and discovery repeatedly appear as the practical bottleneck.
2. **High category demand does not imply easy opportunity.** Demand is strongly concentrated among established winners.
3. **Community research is particularly good at finding problems and gaps.** Apify Ideas, Reddit questions and Discord requests expose user needs more directly than catalogue statistics.
4. **Usage is not revenue.** Free-user activity and platform pricing mechanics materially distort simple user/run metrics.
5. **Community evidence should complement, not replace, marketplace evidence.** Its highest value is practical context, hypothesis generation and triangulation.

## Sources

### Community / community-derived

- https://www.reddit.com/r/apify/comments/1rxssfj/how_much_can_you_actually_earn_by_building_apify/
- https://www.reddit.com/r/apify/comments/1v5ltmz/i_analyzed_54025_public_apify_actors_here_is_what/
- https://www.reddit.com/r/apify/comments/1vb2gd1/free_actor_strategy/
- https://www.reddit.com/r/apify/comments/1rr3l1s/is_the_apify_store_becoming_a_closed_market_for/
- https://www.reddit.com/r/apify/comments/1vbqmjw/whats_the_earning_potential_of_full_time_apify/
- https://www.reddit.com/r/apify/comments/1u7cj67/i_shipped_47_web_scrapers_in_the_last_month_open/
- https://www.reddit.com/r/apify/comments/1u0m8wo/weekly_wild_ideas/
- https://discord.apify.com/m/1035078904022573086
- https://apify.com/ideas
- https://apify.com/ideas/how-it-works

### Supporting platform sources

- https://docs.apify.com/academy/build-and-publish/actor-ideas/find-actor-ideas
- https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-store-works
- https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works
- https://apify.com/partners/actor-developers

## Next Use

This document is a pilot only. The next step is to review whether the questions, source mix and output structure are useful enough to form the basis of a formal community-research method, and then test the same approach at an opportunity-area level.