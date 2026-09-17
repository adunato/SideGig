# Apify Implementation Prerequisites

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Capability source:** [Apify capability assessment](../../research/channels/apify/capability.md)
- **Assessment date:** 2026-09-17

## 1. Scope and Inputs

*Methodology mapping: Phase 1, Step 1 — Establish Implementation Prerequisites.*

This assessment identifies the minimum prerequisites that must be in place before Step 2 — Validate the Platform Baseline. It deliberately excludes opportunity-specific implementation requirements and later commercial/production requirements unless they would block the platform-baseline spike.

The existing Apify research is treated as the primary capability input. Current Apify documentation is used only to verify implementation mechanics that may change over time.

### Inputs used

- [Apify channel capability assessment](../../research/channels/apify/capability.md)
- [Apify local Actor development documentation](https://docs.apify.com/actors/development/quick-start/locally)
- [Apify CLI installation documentation](https://docs.apify.com/cli/docs/installation)
- [Apify Actor deployment documentation](https://docs.apify.com/actors/development/deployment)
- [Apify API integration documentation](https://docs.apify.com/integrations/api)
- [Apify Actor usage and resources documentation](https://docs.apify.com/actors/running/usage-and-resources)
- [Apify monetisation and payout documentation](https://docs.apify.com/actors/publishing/monetize)

## 2. Prerequisites Required for Platform Baseline

| Area | Prerequisite | Why required | Status | Evidence / current state | Action required |
|---|---|---|---|---|---|
| Channel access | Working Apify account with access to Apify Console and Actor development | Step 2 must create, deploy and run an Actor on the platform | Action required | Apify requires an account for local Actor development and authenticated deployment. No existing project evidence confirms that an account has been created and accessed. | Create or confirm the Apify account and Console access. |
| Development tooling | Apify CLI installed and executable in the local development environment | The baseline spike will use the standard local create/run/push workflow | Action required | Current Apify documentation identifies the CLI as the standard local-development and deployment path. No existing project evidence confirms installation. | Install the current Apify CLI and verify `apify --version`. |
| Authentication | CLI authenticated to the intended Apify account and an API token available for API testing | Step 2 must deploy through the authenticated development workflow and separately verify API invocation | Action required | Apify supports `apify login` for CLI deployment and API tokens for REST/API-client authentication. No configured credentials are recorded in the project. | Authenticate the CLI, create/identify a dedicated API token, and store it without committing the secret to the repository. |
| Baseline implementation runtime | A single supported implementation runtime/language selected for the platform spike | The spike needs one concrete Actor project that can be run locally and on Apify | Action required | Apify supports local Actor projects including JavaScript and Python. The implementation project has not yet selected the baseline runtime. | Select the simplest runtime for the spike and use it consistently for Step 2. |
| Source control / workspace | Repository location available for the platform-spike implementation | The spike code and evidence must be reproducible and traceable to the implementation artifacts | Ready | The existing `adunato/SideGig` repository is available and already contains the implementation methodology and Apify implementation artifacts. | None. |
| Platform usage visibility | Ability to inspect individual Actor runs, logs and platform usage/cost information | Step 2 must verify runtime behaviour and observe resource consumption rather than merely obtain a successful result | Action required | Apify exposes run details and usage in Console, including compute, transfer, proxy and storage consumption. Account-specific access has not yet been verified. | Confirm that run logs/status and usage details are visible once the account is available. |
| Cost guardrail | A deliberately low-cost baseline-spike execution approach | The platform spike should validate mechanics without creating unnecessary spend | Action required | Apify charges platform usage according to resources consumed. The spike does not require a production-scale workload or opportunity-specific proxies/data. | Before running the spike, confirm the available plan/credits and use a minimal workload and resource allocation sufficient to validate the lifecycle. |
| External data / third-party services | No opportunity-specific external dataset, proxy service or third-party API required for Step 2 | The platform baseline must remain independent of the later commercial opportunity | Not applicable | The capability assessment identifies external resources as opportunity-specific; Apify itself supplies the managed runtime, storage and API needed for the baseline. | None. |
| Commercial payout setup | Billing details, payout method and creator identity verification | Required to receive commercial payouts, but not to create and run the opportunity-independent platform spike | Not applicable | Apify requires billing details, payout method and KYC for payouts, including for individual creators, but these are not prerequisites for basic Actor development/testing. | Defer to the commercial/launch stages. |

## 3. Deferred Requirements

| Requirement | Expected stage | Evidence / basis | Notes |
|---|---|---|---|
| Store publication requirements, public README, display information and product documentation | Production / Launch | Public Store publication requires product-facing configuration and documentation | Not required for a private platform-baseline Actor. |
| Monetisation model and pay-per-event configuration | Production / Launch | Paid Actors require an explicit pricing/charging model | Must be informed by measured product costs and the later commercial design. |
| Billing details, payout method and KYC | Launch | Required for creator payouts | Apify documents an individual verification path, so establishing a company is not a prerequisite to creator payout eligibility. |
| Production token permissions and secret-management design | Production | Production integrations should use appropriately scoped credentials and controlled secret handling | The Step 2 token only needs to support controlled development/API validation. |
| CI/CD and automated release process | Production | Useful for repeatable production deployment and maintenance | Not required to prove the basic platform lifecycle. |
| Production monitoring, alerting and incident handling | POC / Production | Operational readiness is developed progressively later in the methodology | Step 2 only needs direct visibility of runs, failures, logs and usage. |
| Opportunity-specific data sources, proxies, accounts and source-access controls | POC | These depend on the POC opportunity and implementation | Deliberately excluded from the opportunity-independent platform baseline. |

## 4. Open Issues and Dependencies

The material open items are configuration/state checks rather than platform unknowns. Current Apify documentation supports the required development lifecycle, but the project does not yet contain evidence that the Apify account, CLI, authentication, baseline runtime and usage visibility are configured and ready.

No channel-level external dependency has been identified that would prevent the platform spike once those setup items are completed.

## 5. Step 1 Completion

**Ready for Step 2:** No

**Open blockers:** Apify account access not yet verified; Apify CLI not yet installed/verified; CLI/API authentication not yet configured; baseline runtime not yet selected; run/usage visibility and cost guardrail not yet confirmed.

The prerequisite set is now identified and bounded, but Step 1 is not complete under the methodology's completion rule because several prerequisites required to start Step 2 remain in **Action required** state. Once those setup items are completed and evidenced in this artifact, the readiness decision can change to **Yes** without expanding the scope into POC or production requirements.
