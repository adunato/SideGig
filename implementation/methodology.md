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

Convert the selected channel's capability baseline into a concrete, implementation-ready view of what must be in place before practical implementation testing can begin.

This step establishes readiness to execute Step 2. It does not redesign the channel capability assessment and should reuse existing research findings wherever they are already sufficient. Additional investigation is required only where an implementation prerequisite is unclear, outdated or not covered by the research artifacts.

### Inputs

Use the relevant existing research outputs as the starting point, particularly:

- the selected channel overview and decision evidence;
- channel-level capability prerequisites;
- relevant case-study or opportunity findings where they expose a genuine channel-level dependency;
- known project constraints that affect implementation readiness;
- current platform documentation or terms where an implementation detail requires verification.

Opportunity-specific product requirements should not be introduced unless they are genuinely required to satisfy the common implementation prerequisites.

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
- minimum logging or operational visibility needed during the validation test;
- platform knowledge required to implement and troubleshoot the test;
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
5. the artifact explicitly confirms readiness to proceed to the prerequisites validation test and records the evidence supporting that conclusion.

Step 1 completion means that the required setup is ready to be tested in practice. It does not itself prove that the prerequisites work together correctly; that is the purpose of Step 2 and Gateway 1.

## Step 2 — Prerequisites Validation Test

### Purpose

Verify in practice that the prerequisites established in Step 1 are sufficient to perform the essential technical actions required to build and deliver through the selected channel.

The test should use the smallest possible non-commercial implementation. Its purpose is to validate setup, access, tooling and platform mechanics before a real POC is selected or built. It must not introduce opportunity-specific functionality or production design unless required simply to exercise the channel.

### Inputs

Use:

- the completed `implementation/<channel>/prerequisites.md` artifact;
- the development environment, credentials and platform access established in Step 1;
- current platform documentation where needed to execute or troubleshoot the test.

### Required output

Create `implementation/<channel>/prerequisites-validation.md` from [`templates/prerequisites-validation-template.md`](templates/prerequisites-validation-template.md).

The artifact must define the minimal test, record the actions performed and their evidence, capture any issues discovered, and record the Gateway 1 decision.

The test implementation itself may exist as code or platform configuration outside the artifact. The artifact must link to or identify that implementation sufficiently for the result to be reproducible and auditable.

### Test scope

Exercise only the essential technical path required to prove that the Step 1 prerequisites work together. For a typical API/microservice channel this may include:

- creating or initializing a minimal implementation locally;
- executing it successfully in the local development environment where local execution is part of the channel workflow;
- deploying or uploading it to the selected platform;
- executing the deployed implementation successfully;
- invoking it through the platform's external API or equivalent programmatic interface;
- retrieving a valid structured result;
- inspecting execution status and logs;
- inspecting usage or cost information where the platform exposes it.

Not every channel will require every item. Any non-applicable capability should be recorded explicitly rather than tested artificially.

The test should remain deliberately trivial. Successful completion proves the technical setup and delivery mechanics, not the viability, quality or production readiness of any commercial product.

### Test result status

Each required test item must use one of the following statuses:

- **Pass** — executed successfully with evidence;
- **Fail** — attempted but did not work or produced an unresolved material issue;
- **Not applicable** — the test item does not apply to the selected channel.

Issues discovered during testing should be resolved and retested where practical. A failed item that is required for later implementation remains a blocker to Gateway 1.

### Completion criteria

Step 2 is complete when:

1. the prerequisites-validation artifact exists and conforms to the canonical template;
2. the minimal test implementation is identified and its scope is explicitly non-commercial and opportunity-independent;
3. every material technical action required to exercise the Step 1 prerequisites has been tested;
4. every required test item is **Pass** or **Not applicable**;
5. the evidence demonstrates successful deployment/execution, programmatic invocation and result retrieval where those capabilities are material to the channel;
6. execution visibility and usage/cost visibility have been confirmed where available;
7. no unresolved material issue remains that would prevent moving to POC selection and definition;
8. the artifact records the Gateway 1 decision and rationale.

Step 2 completion proves only that the implementation prerequisites and essential channel mechanics work in practice. It does not validate a commercial opportunity, product design or production operating model.

## Gateway 1 — Prerequisites Validated

Confirm that the Step 1 prerequisites have been exercised successfully in practice and that no material technical blocker remains before selecting and defining the commercial POC.

The decision is recorded in `implementation/<channel>/prerequisites-validation.md` as **Pass** or **Fail**, with a concise rationale and any remaining non-blocking observations.

---

# Phase 2 — Commercial POC Selection and Definition

## Step 3 — Select the POC Opportunity

### Purpose

Select one concrete commercial opportunity to carry into POC definition using the existing research evidence and the implementation evidence established in Phase 1.

This step narrows the research from broad opportunity areas and representative cases to a specific opportunity suitable for a first commercial implementation experiment. The selected opportunity must therefore be more specific than an opportunity-area label, but it does not yet require the full problem, target-user, value-proposition, scope or success-criteria definition produced in Step 4.

Step 3 is an implementation decision, not a second research phase. It must reuse the existing market and capability research rather than re-score the channel or repeat opportunity-area assessment.

### Inputs

Use:

- the completed `implementation/<channel>/prerequisites-validation.md` artifact with Gateway 1 recorded as **Pass**;
- the selected channel's opportunity-area assessment and research gateway decisions;
- opportunity-area capability requirements and representative case-study findings;
- relevant community findings and identified buyer problems or product gaps;
- project constraints and any opportunity-specific implications of deferred requirements recorded during Phase 1;
- Phase 1 technical evidence where it materially affects the practicality of a candidate opportunity.

Candidates should normally come from opportunity areas already selected for deeper investigation by the research methodology. If a candidate depends on a material commercial assumption that the existing research does not support, that gap should be resolved through the research methodology rather than by expanding Step 3 into new market research.

### Candidate selection method

Form a small set of concrete opportunities that are plausible contenders for the first POC. The candidate set does not need to reproduce every opportunity area previously researched; it should contain only opportunities with enough existing evidence to merit an implementation decision.

Compare candidates qualitatively using the considerations that matter specifically when choosing a first POC:

- **Commercial evidence** — whether the existing research establishes a credible buyer problem, paying demand or valuable outcome;
- **Differentiation / unresolved need** — whether the opportunity has a specific value angle or unresolved problem rather than being an undifferentiated clone of an established product;
- **POC testability** — whether the core proposition can be tested with a deliberately bounded implementation rather than requiring a near-production product before useful evidence can be obtained;
- **Implementation considerations** — material source/access dependencies, external services, operating burden, cost exposure, legal or platform constraints, and compatibility with project constraints;
- **Learning value** — whether a POC would resolve a material commercial, technical or operating uncertainty relevant to deciding whether the opportunity should progress.

No mandatory numeric scoring is used in Step 3. Existing research scores are evidence inputs and should not be recalculated into a second attractiveness model.

Each candidate must use one of the following decisions:

- **Selected** — chosen for Step 4 POC definition;
- **Deferred** — remains viable but is not the first POC;
- **Not selected** — not being carried forward in the current implementation cycle.

Exactly one candidate may be **Selected** when Step 3 is complete.

### Required output

Create `implementation/<channel>/poc.md` from [`templates/poc-template.md`](templates/poc-template.md).

Step 3 creates the Phase 2 POC artifact and records the candidate comparison, the selected opportunity, the research opportunity area it derives from, the primary uncertainty that makes a POC useful, and the selection rationale.

Steps 4 and 5 will subsequently extend the same `poc.md` artifact when those methodology steps are formalised. Step 3 must not pre-empt those definitions by specifying the detailed POC design or operating requirements.

### Completion criteria

Step 3 is complete when:

1. Gateway 1 is recorded as **Pass** for the channel;
2. `implementation/<channel>/poc.md` exists and conforms to the canonical template;
3. the candidate set is grounded in the existing research and contains only plausible first-POC opportunities;
4. each candidate is compared using the material commercial, differentiation, testability and implementation considerations relevant to the decision;
5. exactly one candidate is marked **Selected**;
6. the selected opportunity is traceable to a researched opportunity area and is specific enough to be defined as a POC in Step 4;
7. the selection rationale explains why it was chosen over the alternatives without creating a new research scoring model;
8. the primary uncertainty that the POC is intended to resolve is recorded;
9. no unresolved blocker remains that would prevent moving to Step 4.

Step 3 completion selects what should be defined and tested next. It does not commit the project to building the POC; that commitment occurs only after Steps 4 and 5 at Gateway 2.

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
