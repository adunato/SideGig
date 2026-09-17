# Apify POC Opportunity Selection

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Prerequisite validation:** [Apify Prerequisites Validation Test](prerequisites-validation.md)
- **Research methodology:** [Research Methodology](../../research/methodology.md)
- **Phase 2 start date:** 2026-09-17

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
| News & media intelligence | 3 | 4 | 4 | 3 | 4 | Opportunity Score 3.6 / Medium-High | Sufficient market signal despite lower absolute demand: the established EasyApi Google News Actor has about 2.4K users / 230 MAU, while the roughly six-month-old Crawler Bros entrant has 400+ users / about 100–120 MAU. |

### Eligible Opportunity Areas — Capability Requirements

Reuse the existing research scores. Higher = more demanding.

| Opportunity area | Technical complexity | Domain expertise | Data / resource access | Operating complexity | Cost intensity | Capability score / confidence | POC capability implication |
|---|---:|---:|---:|---:|---:|---|---|
| Recruitment & jobs intelligence | 3 | 3 | 2 | 4 | 2 | 2.8 / High overall | A focused POC is feasible, but source reliability, blocking, completeness and maintenance create a materially heavier operating experiment. |
| Lead generation & business intelligence | 4 | 3 | 3 | 4 | 2 | 3.2 / High overall | The heaviest profile; a representative differentiated POC tends to introduce enrichment, identity resolution and additional dependencies. |
| News & media intelligence | 2 | 2 | 1 | 2 | 1 | 1.6 / High overall | Public RSS/Google News inputs, lightweight HTTP extraction and minimal external-resource requirements support a genuinely small and inexpensive representative POC. |

### Selected Opportunity Area

**Selected opportunity area:** News & media intelligence

**Step 3 rationale:** All three eligible areas clear the market-evidence threshold, so Step 3 should not simply choose the highest market score. News/media has a lower market score than recruitment/jobs (3.6 vs 4.0) and lead generation (3.6 vs 3.8), but its market signal is still directly sufficient for a POC: an established Google News product has about 230 MAU and a recent entrant has about 100–120 MAU. Against that adequate signal, the capability difference is substantial: News/media is 1.6 versus 2.8 for recruitment/jobs and 3.2 for lead generation. The modest market-score advantage of the other areas does not justify the materially larger capability burden for the first experiment. News/media therefore provides the more proportionate first POC area while still remaining capable of producing meaningful market feedback.

### Step 3 Completion

**Step 3 complete:** Yes

**Step 3 blockers:** None

## 2. Specific POC Opportunity Research

*Methodology mapping: Phase 2, Step 4 — Research Specific POC Opportunities.*

Research the selected opportunity area below the area level and establish a credible landscape of concrete commercial propositions before selection.

### Candidate Landscape

| Candidate opportunity | Buyer problem / use case | Target buyer | Commercial outcome / value | Demand / usage evidence | Alternatives / competition | Differentiation / unresolved need | Data / source / delivery model | Capability / cost implications | Evidence links |
|---|---|---|---|---|---|---|---|---|---|
| <Concrete proposition> | <Problem or workflow> | <Buyer> | <Outcome> | <Specific evidence> | <Alternatives> | <Gap or differentiation> | <How value is produced/delivered> | <Material implications> | <Sources> |

### Step 4 Completion

**Step 4 complete:** No

**Step 4 blockers:** None

## 3. POC Opportunity Assessment and Shortlist

*Methodology mapping: Phase 2, Step 5 — Assess and Shortlist POC Opportunities.*

Assess each Step 4 candidate using the same market-attractiveness and capability dimensions used by the Research Methodology, but at the specific-opportunity level.

### Market Attractiveness Assessment

Higher score = more attractive.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| <Candidate> | <Paying demand / Opportunity density / New-entrant attainability / Revenue potential / Competitive pressure> | <1-5> | <High / Medium / Low> | <Candidate-specific evidence> |

### Capability Assessment

Higher score = more demanding.

| Candidate opportunity | Dimension | Score (1-5) | Confidence | Evidence / rationale |
|---|---|---:|---|---|
| <Candidate> | <Technical complexity / Domain expertise / Data / resource access / Operating complexity / Cost intensity> | <1-5> | <High / Medium / Low> | <Candidate-specific evidence> |

### Shortlist

Use only:

- **Shortlisted** — remains a credible POC candidate;
- **Excluded** — not suitable for this POC cycle based on the evidence.

| Candidate opportunity | Market evidence potential | POC capability suitability | Decision | Rationale |
|---|---|---|---|---|
| <Candidate> | <Likelihood of meaningful market signal at POC scale> | <Whether a representative POC can remain simple and inexpensive> | <Shortlisted / Excluded> | <Evidence-based rationale> |

### Step 5 Completion

**Step 5 complete:** No

**Step 5 blockers:** Step 4 not yet complete for the newly selected opportunity area.

## 4. POC Opportunity Selection

*Methodology mapping: Phase 2, Step 6 — Select the POC Opportunity.*

Select one concrete proposition from the Step 5 shortlist using the completed market-attractiveness and capability assessments. Do not introduce a new scoring model.

### Shortlist Comparison

Use only:

- **Selected** — chosen for Phase 3 POC definition and design;
- **Deferred** — remains viable but is not the selected POC opportunity.

| Candidate opportunity | Market-attractiveness summary | Capability-requirements summary | Expected POC evidence | POC complexity / cost | Decision |
|---|---|---|---|---|---|
| <Shortlisted candidate> | <Summary from Step 5> | <Summary from Step 5> | <What market and capability evidence this POC can generate> | <Why the POC can or cannot remain small and inexpensive> | <Selected / Deferred> |

### Selected Opportunity

**Selected opportunity:** <Exactly one shortlisted concrete proposition>

**Buyer problem:** <Problem/use case established during Step 4 research>

**Target user:** <Target buyer/user established during Step 4 research>

**Core value proposition:** <Commercial outcome/value established by the research>

**Market assumptions to test:** <Specific market-attractiveness assumptions the POC should be capable of testing>

**Capability assumptions to test:** <Specific capability assumptions the POC should be capable of testing>

**Selection rationale:** <Why this proposition provides the best balance of meaningful market evidence and manageable, representative capability requirements>

**Selection date:** <YYYY-MM-DD>

### Step 6 Completion

**Step 6 complete:** No

**Step 6 blockers:** Step 5 not yet complete.

## 5. Gateway 2 — POC Opportunity Selected

**Decision:** <Pass / Fail>

**Rationale:** <Why the Phase 2 evidence does or does not justify carrying the selected opportunity into POC definition and design>

A Pass requires Steps 3–6 to be complete, exactly one Step 6 candidate to be Selected, and no unresolved blocker preventing Phase 3.