# Implementation Methodology

## Status

Draft. This document defines the implementation process from selection of a viable API/microservice channel through proof of concept, production launch and initial live operation.

The methodology is intended to remain channel-agnostic within the API/microservice space. Platform-, opportunity- and product-specific requirements are captured in implementation artifacts rather than embedded in the methodology itself.

## Purpose and Scope

Define a repeatable implementation process that converts a selected commercial channel and opportunity into a technically and operationally sustainable monetised service.

The methodology governs the sequence of implementation work, the outputs expected from each step, the decision gateways between phases, and the artifacts used to evidence and track progress.

## Relationship to the Research Methodology

The research methodology determines where implementation effort should be invested and produces inputs such as channel assessments, opportunity-area analysis, representative case studies and capability requirements.

The implementation methodology begins once a channel has been selected for execution. It consumes relevant research outputs rather than repeating them, and converts them into implementation prerequisites, experiments, product decisions and operational processes.

---

# Methodology Operating Principles

## 1. Methodology → Templates → Artifacts

The methodology defines the required steps and gateways. Each step must map to at least one explicit implementation artifact or artifact section that records its material output and makes completion observable.

Every persistent implementation document must be created from a canonical template maintained under `implementation/templates/`. A single artifact may support several related methodology steps where that produces a clearer and simpler structure; the methodology does not require one document per step.

## 2. Artifacts Are the Source of Truth for Progress

Implementation progress must be derived from the implementation artifacts themselves rather than maintained in a separate manual tracker.

Artifacts therefore serve two purposes: they capture the substantive output of the work and provide the evidence from which methodology progress can be determined.

## 3. Each Step Has an Explicit Completion Contract

As each methodology step is developed, it must define:

- its purpose;
- its required inputs;
- the artifact or artifact section it produces or updates;
- the canonical template governing that artifact;
- the minimum substantive conditions required for the step to be considered complete;
- any gateway or later step that depends on it.

Implementation work such as code, deployments or platform configuration may be the primary practical output of a step, but the associated artifact must record the evidence required to determine whether the step has been completed.

## 4. Templates Define Canonical Structure

Templates define the stable document structure needed for consistency, validation and automated extraction. Required headings, fields, tables, decisions and relationships should remain machine-readable where they are used to determine progress or generate dashboards.

Templates should prescribe only the structure needed by the methodology. Narrative content should remain flexible where additional structure provides no value.

## 5. Structural Validity and Methodology Completion Are Separate

Document structure and methodology progress must be evaluated independently.

Structural validation determines whether an artifact conforms to its canonical template and whether required fields or placeholders remain. Methodology progress determines whether the substantive completion conditions for a step have actually been met.

A structurally valid document is therefore not automatically a completed methodology step, and an implementation activity is not considered complete merely because code or configuration exists without the required artifact evidence.

## 6. Gateways Are Explicit Decisions

Every methodology gateway must be represented by an explicit recorded decision and rationale in a defined artifact.

Gateway decisions determine whether downstream steps are applicable. Progress reporting should derive later-step applicability from these recorded decisions rather than from assumptions or manual status updates.

## 7. Cross-Artifact Traceability Must Be Preserved

Where artifacts depend on one another, their relationships must be explicit through stable names, identifiers or links. Examples include the relationship between a selected opportunity and its POC, between a POC and its evaluation, or between a production design and its operational-readiness evidence.

Validation should check material cross-artifact relationships where doing so prevents inconsistent or orphaned implementation records.

## 8. Reports and Dashboards Are Generated Views

Progress reports and insight dashboards are derived outputs, not authoritative records. They must be reproducible from the canonical implementation artifacts and validation results.

The reporting layer should derive methodology status from artifact content and gateway decisions. Insight views may extract and present selected implementation findings from the same artifacts, but should not introduce independent state that must be maintained manually.

## 9. Methodology, Templates and Automation Evolve Together

A material change to a methodology step or its required output must be reflected consistently in the methodology, the relevant template, structural validation rules, progress-derivation logic and any dashboard extraction that depends on that structure.

Existing artifacts should conform to the current canonical structure before being treated as structurally valid. The objective is to keep the methodology executable and machine-verifiable rather than allowing the documentation and automation to diverge.

## 10. Documentation Should Remain Minimal

Create an artifact only where it captures a material methodology output, decision, evidence set or operational definition that needs to persist. Avoid duplicate status documents, parallel trackers and documentation that simply restates information already held elsewhere.

The preferred pattern is the smallest set of canonical artifacts capable of representing the implementation lifecycle clearly and supporting validation, progress tracking and insight extraction.

## 11. Generic Methodology, Specific Implementations

The methodology and its core templates should remain reusable across API/microservice channels. Channel-specific platform mechanics, credentials, prerequisites, deployment details and commercial constraints belong in the artifacts for that implementation.

Channel-specific extensions to the generic templates should be introduced only where a genuine implementation requirement cannot be represented cleanly by the common structure.

---

# Phase 1 — Implementation Foundation

## Step 1 — Establish Implementation Prerequisites

### Purpose

Convert the selected channel's capability baseline into a concrete, implementation-ready view of what must be in place before platform-level implementation can begin.

This step establishes readiness to execute Step 2. It does not redesign the channel capability assessment and should reuse existing research findings wherever they are already sufficient. Additional investigation is required only where an implementation prerequisite is unclear, outdated or not covered by the research artifacts.

### Inputs

Use the relevant existing research outputs as the starting point, particularly:

- the selected channel overview and decision evidence;
- channel-level capability prerequisites;
- relevant case-study or opportunity findings where they expose a genuine channel-level dependency;
- known project constraints that affect implementation readiness;
- current platform documentation or terms where an implementation detail requires verification.

Opportunity-specific product requirements should not be introduced unless they are genuinely required to establish the common platform baseline.

### Required output

Create `implementation/<channel>/prerequisites.md` from [`templates/prerequisites-template.md`](templates/prerequisites-template.md).

The artifact must record the prerequisites required to begin Step 2, their current readiness, supporting evidence and any action needed to close a gap. Known prerequisites that belong to later POC, production or launch stages may be recorded separately for traceability, but they do not block Step 1.

### Assessment scope

Consider the prerequisite areas that are material for the selected channel. Typical API/microservice implementation areas include:

- channel access and eligibility;
- commercial, billing or payout setup where required for implementation;
- development and runtime tooling;
- authentication, credentials and permissions;
- deployment or publication access;
- API or service invocation capability;
- channel-level data, infrastructure or external resource access;
- usage and cost visibility;
- minimum logging or operational visibility needed during the platform spike;
- platform knowledge required to implement and troubleshoot the baseline;
- channel policies or other participation constraints that affect implementation.

The list is intentionally non-exhaustive. Record only prerequisites that are materially relevant to the selected implementation.

### Prerequisite status

Each prerequisite required for Step 2 must use one of the following statuses:

- **Ready** — the prerequisite is in place and sufficiently verified;
- **Action required** — the prerequisite is understood and can be satisfied, but work remains;
- **Blocked** — the prerequisite cannot currently be satisfied or depends on an unresolved external constraint;
- **Not applicable** — the prerequisite category or identified item does not apply to this implementation.

Later-stage requirements that are known but are not required for Step 2 should be recorded as deferred requirements rather than mixed into the readiness assessment.

### Completion criteria

Step 1 is complete when:

1. the prerequisites artifact exists and conforms to the canonical template;
2. the relevant prerequisite areas have been considered and all material Step 2 prerequisites are recorded;
3. every Step 2 prerequisite is either **Ready** or **Not applicable**;
4. no unresolved **Action required** or **Blocked** item remains for Step 2;
5. the artifact explicitly confirms readiness to proceed to the platform-baseline validation step and records the evidence supporting that conclusion.

Step 1 completion means that the implementation foundation is ready to be exercised. It does not itself prove that the platform works end to end; that is the purpose of Step 2 and Gateway 1.

## Step 2 — Validate the Platform Baseline

Implement a minimal opportunity-independent platform spike to prove the essential development lifecycle and establish practical understanding of the selected platform.

## Gateway 1 — Platform Readiness

Confirm that the essential implementation capabilities have been demonstrated and that no material platform-level blockers remain.

---

# Phase 2 — Commercial POC Selection and Definition

## Step 3 — Select the POC Opportunity

Select the opportunity to use for the first commercial implementation experiment using the existing opportunity research and implementation-specific considerations.

## Step 4 — Define the POC

Define the problem, target user, value proposition, scope, inputs and outputs, dependencies, constraints and explicit success and exit criteria.

## Step 5 — Define POC Operational Requirements

Identify the minimum operational capabilities required while the POC is running, such as visibility of failures, dependency changes, cost behaviour and issues requiring intervention.

## Gateway 2 — POC Commitment

Confirm that the POC is sufficiently defined, appropriately scoped and operationally manageable before implementation begins.

---

# Phase 3 — POC Implementation and Validation

## Step 6 — Implement the POC

Build and deploy the minimum implementation required to test the defined commercial and technical hypotheses.

## Step 7 — Operate, Evaluate and Iterate the POC

Run the POC under realistic conditions, evaluate it against its success criteria, observe its operational behaviour and perform bounded iterations where justified by the evidence.

## Gateway 3 — Productisation Decision

Determine whether the combined commercial, technical and operational evidence supports progression to a production product.

---

# Phase 4 — Product, Commercial and Operational Design

## Step 8 — Define the Production Product

Translate the validated POC into a production product definition covering functionality, architecture, user experience, reliability and service behaviour.

## Step 9 — Define the Commercial Model

Define pricing, cost structure, expected usage economics and other commercial characteristics required for a sustainable paid service.

## Step 10 — Define the Production Operating Model

Identify how the live service must be operated after launch, including monitoring, failure detection, issue handling, customer feedback, corrective releases, external dependency changes and ongoing service maintenance.

## Gateway 4 — Production Commitment

Confirm that the product, commercial model and required operating model are sufficiently understood to justify production implementation.

---

# Phase 5 — Production Implementation and Readiness

## Step 11 — Implement the Production Product

Build the production version of the service with the functionality and technical characteristics required for public paid usage.

## Step 12 — Implement Operational Processes

Put in place the operational mechanisms and processes identified in the operating model so that the service can be monitored, supported, maintained and changed after launch.

## Step 13 — Validate Technical Readiness

Verify that the production service satisfies its defined functional, reliability, performance, integration, cost and technical quality requirements.

## Step 14 — Validate Operational Readiness

Verify that failures, customer issues, dependency changes and other foreseeable operational events can be detected and handled through the implemented operating processes.

## Gateway 5 — Launch Readiness

Confirm technical readiness, operational readiness and commercial readiness before exposing the service to paying customers.

---

# Phase 6 — Launch and Initial Operation

## Step 15 — Prepare Channel Publication

Complete the customer-facing channel configuration, documentation, schemas, examples, pricing and other publication requirements.

## Step 16 — Publish and Validate Go-Live

Publish the monetised service and verify the complete live customer journey, including discovery, execution, API consumption, result delivery, charging and operational visibility.

## Step 17 — Validate the Live Operating Model

Confirm during initial live operation that the monitoring, support, maintenance and change processes function effectively against real service behaviour.

## Implementation Complete

Defines the point at which the initial implementation objective has been achieved: the service is live, monetised, technically stable and supported by a functioning operating model.
