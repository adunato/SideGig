# Apify Implementation Prerequisites

- **Channel:** [Apify Store](../../research/channels/apify/overview.md)
- **Capability source:** [Apify capability assessment](../../research/channels/apify/capability.md)
- **Assessment date:** 2026-09-17

## 1. Scope and Inputs

*Methodology mapping: Phase 1, Step 1 — Establish Implementation Prerequisites.*

This assessment identifies the minimum prerequisites that must be in place before Step 2 — Prerequisites Validation Test. It deliberately excludes opportunity-specific implementation requirements and later commercial/production requirements unless they would block that validation test.

The existing Apify research is treated as the primary capability input. Current Apify documentation is used only to verify implementation mechanics that may change over time.

### Inputs used

- [Apify channel capability assessment](../../research/channels/apify/capability.md)
- [Apify local Actor development documentation](https://docs.apify.com/actors/development/quick-start/locally)
- [Apify CLI installation documentation](https://docs.apify.com/cli/docs/installation)
- [Apify Actor deployment documentation](https://docs.apify.com/actors/development/deployment)
- [Apify API integration documentation](https://docs.apify.com/integrations/api)
- [Apify Actor usage and resources documentation](https://docs.apify.com/actors/running/usage-and-resources)
- [Apify monetisation and payout documentation](https://docs.apify.com/actors/publishing/monetize)

## 2. Prerequisites Required for Validation Test

| Area | Prerequisite | Why required | Status | Evidence / current state | Action required |
|---|---|---|---|---|---|
| Channel access | Working Apify account with access to Apify Console and Actor development | Step 2 must create, deploy and run an Actor on the platform | Ready | Apify account has been created and Console access confirmed. | None. |
| Development tooling | Apify CLI installed and executable in the local development environment | The validation test will use the standard local create/run/push workflow | Ready | Apify CLI has been installed successfully in the local development environment. | None. |
| Authentication | CLI authenticated to the intended Apify account and an API token available for API testing | Step 2 must deploy through the authenticated development workflow and separately verify API invocation | Ready | CLI authentication has been completed successfully and an API token has been generated for explicit API testing. | None. Keep the token outside the repository and use it only through local environment/configuration. |
| Implementation runtime | A single supported implementation runtime/language selected for the validation test | The test needs one concrete Actor project that can be run locally and on Apify | Ready | TypeScript/Node.js has been selected as the runtime for the validation test. | None. |
| Source control / workspace | Repository location available for the validation-test implementation | The test code and evidence must be reproducible and traceable to the implementation artifacts | Ready | The existing `adunato/SideGig` repository is available and already contains the implementation methodology and Apify implementation artifacts. | None. |
| Platform usage visibility | Ability to inspect individual Actor runs, logs and platform usage/cost information | Step 2 must verify runtime behaviour and observe resource consumption rather than merely obtain a successful result | Ready | At Step 1, Apify Console access was confirmed and run-specific verification was deferred to Step 2. Logs, run status, usage and cost visibility were subsequently validated successfully; see [prerequisites-validation.md](prerequisites-validation.md). | None. |
| Cost guardrail | A deliberately low-cost validation-test execution approach | The test should validate mechanics without creating unnecessary spend | Ready | Billing limits were checked in Apify Console. Current usage is $0.00 and the account has a custom monthly platform-usage limit of $5.00, providing a bounded cost ceiling for the test. | None. |
| External data / third-party services | No opportunity-specific external dataset, proxy service or third-party API required for Step 2 | The validation test must remain independent of the later commercial opportunity | Not applicable | The capability assessment identifies external resources as opportunity-specific; Apify itself supplies the managed runtime, storage and API needed for the validation test. | None. |
| Commercial payout setup | Billing/payment details and creator payout verification | Not required for the Step 2 validation test, but the later public paid POC introduces commercial setup before or during POC execution | Not applicable | Apify monetisation requires billing/payment details; identity verification is required for payout eligibility and supports individual creators as well as companies. | Step 2 remains unaffected. Complete billing/payment setup before the paid POC observation window; complete KYC before payout. |

## 3. Deferred Requirements

| Requirement | Expected stage | Evidence / basis | Notes |
|---|---|---|---|
| Store publication requirements, public README, display information, sample output and output schema | POC — before public observation | Public Store publication requires the product-facing publication fields and documentation to be complete | Pulled forward because the selected POC is explicitly a public Store experiment. |
| POC monetisation and pay-per-event configuration | POC — before public paid observation | The selected POC uses a temporary PPE experiment price; Apify requires monetisation setup before paid execution | Configure the Step 7 temporary POC charging model before the observation window. Production pricing remains a later Step 12 decision. |
| Billing and payment details | POC — before public paid observation | Required to configure Actor monetisation | Complete before the paid observation window begins. |
| Creator identity verification (KYC) | Before payout | Required for payout eligibility | Apify documents an individual verification path, so establishing a company is not a prerequisite. This does not block Step 9 implementation. |
| Production token permissions and secret-management design | Production | Production integrations should use appropriately scoped credentials and controlled secret handling | The Step 2 token only needs to support controlled development/API validation. |
| CI/CD and automated release process | Production | Useful for repeatable production deployment and maintenance | Not required to prove the basic development/deployment mechanics. |
| Production monitoring, alerting and incident handling | POC / Production | Operational readiness is developed progressively later in the methodology | Step 2 only needs direct visibility of runs, failures, logs and usage. |
| Opportunity-specific data sources, proxies, accounts and source-access controls | POC | These depend on the POC opportunity and implementation | Deliberately excluded from the opportunity-independent validation test. |

## 4. Open Issues and Dependencies

None that block Step 2.

At Step 1 completion, run-specific logs and resource/usage evidence had not yet been exercised because that verification belonged to Step 2. They were subsequently validated successfully; see [prerequisites-validation.md](prerequisites-validation.md).

## 5. Step 1 Completion

**Ready for Step 2:** Yes

**Open blockers:** None

All prerequisites required to begin the opportunity-independent prerequisites validation test are now in place: Apify account access, local CLI, authenticated CLI access, API token, TypeScript/Node.js runtime selection, repository workspace and a bounded $5 monthly usage limit. Step 1 is complete.
