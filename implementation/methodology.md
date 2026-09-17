# Implementation Methodology

## Status

Draft. This document defines the implementation process from selection of a viable API/microservice channel through proof of concept, production launch and initial live operation.

The methodology is intended to remain channel-agnostic within the API/microservice space. Platform-, opportunity- and product-specific requirements are captured in implementation artifacts rather than embedded in the methodology itself.

## Purpose and Scope

Define a repeatable implementation process that converts a selected commercial channel and opportunity into a technically and operationally sustainable monetised service.

The methodology governs the sequence of implementation work, the outputs expected from each step, the decision gateways between phases, and the artifacts used to evidence and track progress.

## Relationship to the Research Methodology

The implementation methodology explicitly depends on the [Research Methodology](../research/methodology.md). The research methodology owns channel discovery and assessment, opportunity-area discovery and assessment, community research, research selection gateways, representative case studies and channel/opportunity capability synthesis. The implementation methodology consumes those outputs; it must not silently assume that they exist or reproduce them as implementation work.

The expected handoff is:

- **Research Phase 1 / Gateway 1** identifies the channel selected for deeper opportunity analysis and records the channel market assessment in `research/channels/<channel>/overview.md`.
- **Research Phase 2 / Gateway 2** defines and assesses the channel's opportunity areas, records opportunity-area community findings and identifies which opportunity areas proceed to deep dive. These outputs are held primarily in `research/channels/<channel>/overview.md`, with the channel-level capability baseline in `research/channels/<channel>/capability.md`.
- **Research Phase 3 / Steps 10–12** executes representative case studies and synthesizes their findings back to the opportunity-area level. Representative cases are held under `research/channels/<channel>/case-studies/`; refined opportunity-area market findings remain in `overview.md`, and opportunity-area capability requirements are recorded in `capability.md`.

When an implementation step depends on research, its input contract should identify the relevant research methodology stage and artifacts explicitly. If a required research output is missing, materially incomplete or inconsistent with the current research methodology, resolve that gap through the research methodology before treating the implementation step as complete.

The implementation methodology begins once a channel has been selected for execution. It converts the relevant research outputs into implementation prerequisites, opportunity selection, experiments, product decisions and operational processes without creating a parallel channel/opportunity-area research model.

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

The research-side inputs above are defined by the [Research Methodology](../research/methodology.md), particularly the selected channel evidence and channel-level capability baseline. Opportunity-specific product requirements should not be introduced unless they are genuinely required to satisfy the common implementation prerequisites.

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
7. no unresolved material issue remains that would prevent moving to POC opportunity selection;
8. the artifact records the Gateway 1 decision and rationale.

Step 2 completion proves only that the implementation prerequisites and essential channel mechanics work in practice. It does not validate a commercial opportunity, product design or production operating model.

## Gateway 1 — Prerequisites Validated

Confirm that the Step 1 prerequisites have been exercised successfully in practice and that no material technical blocker remains before POC opportunity selection begins.

The decision is recorded in `implementation/<channel>/prerequisites-validation.md` as **Pass** or **Fail**, with a concise rationale and any remaining non-blocking observations.

---

# Phase 2 — POC Opportunity Selection

## Phase objective

Select one specific commercial opportunity for a proof of concept through a structured progression from the completed opportunity-area research to a concrete proposition.

The POC should be a **small-scale, simple and inexpensive commercial experiment**, but it must still be substantial enough to test the two dimensions already established by the Research Methodology:

1. **Market attractiveness** — whether the researched market-value assumptions translate into enough real demand, usage or buyer feedback to generate meaningful evidence during the POC.
2. **Capability requirements** — whether the researched technical, domain, resource, operating and cost assumptions hold when the opportunity is implemented and operated in practice.

The POC opportunity should therefore not be selected simply because it has the highest theoretical market score or because it is the easiest thing to build. It should provide the smallest practical experiment that can generate meaningful evidence on both dimensions.

Phase 2 reuses the terminology, scoring direction and evidence discipline of the [Research Methodology](../research/methodology.md). Market-attractiveness scores remain **1–5 where higher is more attractive**. Capability scores remain **1–5 where higher means more demanding**. Existing research outputs are reused wherever the unit of analysis has already been assessed; new research is required only when moving below the opportunity-area level to specific propositions.

All Phase 2 steps update the same `implementation/<channel>/poc.md` artifact. The canonical template for that artifact must be aligned to this methodology before Phase 2 execution is treated as valid.

## Step 3 — Select the POC Opportunity Area

### Purpose

Choose the researched opportunity area that provides the strongest basis for a useful first POC before researching or selecting a specific product proposition.

This step deliberately separates **opportunity-area selection** from **specific POC opportunity selection**. It uses the completed research evidence and does not invent a product idea.

### Inputs

Use the completed research outputs for opportunity areas that passed Research Gateway 2 and completed Research Phase 3 deep dive:

- `research/channels/<channel>/overview.md`, including Step 8 market-attractiveness assessments, Step 8A community findings, Research Gateway 2 decisions and Step 12 market refinements;
- `research/channels/<channel>/capability.md`, including Step 12 opportunity-area capability synthesis;
- `research/channels/<channel>/case-studies/*.md`, providing the representative evidence behind the Step 12 synthesis;
- project constraints and relevant Phase 1 implementation evidence.

### Selection method

Compare the eligible opportunity areas using the existing research dimensions rather than creating a new scoring model.

#### Decision principle

Step 3 is a **market-sufficiency and proportionality decision**, not a ranking by market score alone and not a search for the absolute lowest capability score.

First establish whether each area has enough market evidence for a small POC to plausibly generate meaningful usage or buyer feedback. An area that does not clear that bar should not be selected merely because it is easy to implement.

Among areas that do clear the market-evidence bar, the first POC should generally favour the lower capability burden because the experiment is intentionally small, simple and inexpensive. A more demanding area can still be selected where its stronger market evidence is material enough to justify the additional technical, operating, resource or cost burden and the resulting POC remains genuinely bounded.

Do not assume that a small improvement in market attractiveness justifies a large increase in capability requirements. Equally, do not assume that the lowest-capability area wins where its market signal is too weak to make the experiment informative. The rationale should make this proportional trade-off explicit rather than applying an undeclared weighting or composite score.

#### Market attractiveness

Use the five existing market-attractiveness dimensions:

1. **Paying demand**
2. **Opportunity density**
3. **New-entrant attainability**
4. **Revenue potential**
5. **Competitive pressure**

For POC selection, particular attention should be paid to whether paying demand and new-entrant attainability are sufficient for a small-scale implementation to plausibly generate observable usage or buyer feedback. An otherwise attractive but extremely narrow opportunity area is a poor POC candidate if the expected signal is too sparse to evaluate.

#### Capability requirements

Use the five existing capability dimensions:

1. **Technical complexity**
2. **Domain expertise**
3. **Data / resource access**
4. **Operating complexity**
5. **Cost intensity**

A first POC should favour a capability profile that can be implemented and operated simply and inexpensively. The selected area should nevertheless exercise enough of the area's real capability requirements to make the POC informative rather than choosing an artificially trivial edge case.

Use the existing scores, confidence and evidence from the research artifacts. If those outputs are missing or materially insufficient, return to the Research Methodology rather than reconstructing them inside this step.

### Required output

Record in `implementation/<channel>/poc.md`:

- the eligible opportunity areas considered;
- their existing market-attractiveness and capability results;
- any material POC-selection implications of those results;
- the selected POC opportunity area;
- a concise rationale explaining why it offers an appropriate balance of market-evidence potential and manageable capability requirements.

No specific product proposition is selected in Step 3.

### Completion criteria

Step 3 is complete when:

1. Gateway 1 is **Pass**;
2. the eligible comparison set consists only of opportunity areas with completed Research Gateway 2 and Phase 3 evidence;
3. the comparison explicitly uses the existing market-attractiveness and capability dimensions;
4. the selected area has sufficient market evidence to plausibly generate meaningful POC feedback;
5. its capability profile is sufficiently bounded for a simple and inexpensive POC while remaining representative enough to test material capability assumptions;
6. exactly one opportunity area is selected for Step 4.

## Step 4 — Research Specific POC Opportunities

### Purpose

Research the selected opportunity area at a finer level to identify concrete commercial propositions that could serve as the POC.

The Research Methodology establishes attractiveness and capability requirements at opportunity-area level. Step 4 moves below that boundary. It must therefore perform structured specific-opportunity research rather than deriving a product idea from a small number of anecdotes or from implementation convenience.

### Discovery method

Establish the candidate landscape before assessing or selecting individual propositions.

Use sources appropriate to the selected area, which may include:

- marketplace products, usage, pricing and recent entrants;
- buyer and user discussions;
- feature requests, issue trackers and product reviews;
- platform or source-specific gaps;
- existing workflows and combinations of tools buyers currently use;
- competing or substitute products on and off the selected channel;
- relevant first-party documentation and observable product behaviour;
- other direct evidence of unresolved buyer needs.

For each concrete candidate opportunity, record at minimum:

- the buyer problem or use case;
- the target buyer at a sufficient level to distinguish the proposition;
- the proposed commercial outcome or value;
- evidence of demand or usage;
- existing alternatives and competitive context;
- the apparent differentiation or unresolved need;
- the principal data, source or delivery model;
- material capability or cost implications visible at this stage.

This step discovers and describes the candidate set. It does not yet choose the POC or define its detailed implementation scope.

### Required output

Add the specific-opportunity research and candidate set to `implementation/<channel>/poc.md`, preserving links to the evidence used.

### Completion criteria

Step 4 is complete when:

1. the research is scoped to the opportunity area selected in Step 3;
2. the main relevant sources have been investigated sufficiently to establish a credible candidate landscape;
3. candidates are concrete commercial propositions rather than broad opportunity-area labels or implementation technologies;
4. each candidate has evidence covering the buyer problem, market signal, competitive context and material capability implications;
5. the candidate set is broad enough to support comparative assessment rather than merely documenting a preselected idea.

## Step 5 — Assess and Shortlist POC Opportunities

### Purpose

Assess the concrete opportunities identified in Step 4 consistently and produce a shortlist of propositions suitable for a small-scale POC.

### Assessment method

Apply the same two analytical axes and terminology used by the Research Methodology, but at the **specific-opportunity** level.

#### Market attractiveness assessment

Assess each candidate on:

1. **Paying demand**
2. **Opportunity density**
3. **New-entrant attainability**
4. **Revenue potential**
5. **Competitive pressure**

Record a **1–5 score**, confidence and evidence/rationale for each dimension using the same scoring direction as the research methodology.

Evidence must relate to the specific proposition. Opportunity-area evidence provides context but must not automatically be inherited as proof that the specific opportunity has equivalent attractiveness.

#### Capability assessment

Assess each candidate on:

1. **Technical complexity**
2. **Domain expertise**
3. **Data / resource access**
4. **Operating complexity**
5. **Cost intensity**

Record a **1–5 score**, confidence and evidence/rationale for each dimension using the same scoring direction as the research methodology: higher means more demanding.

The assessment should consider both the minimum credible POC and the extent to which that implementation remains representative of the real opportunity. A proposition should not appear artificially attractive merely because the POC removes the elements that create its actual commercial or operating value.

### Shortlisting criteria

The shortlist should contain opportunities that satisfy both of the following conditions:

- **Market evidence potential:** sufficient paying demand, opportunity density and entrant attainability to make meaningful usage or buyer feedback plausible at POC scale, with credible longer-term revenue potential and competitive positioning.
- **POC capability suitability:** technical, domain, resource, operating and cost requirements that can be exercised through a bounded, simple and inexpensive implementation without making the experiment unrepresentative.

Do not create a third composite POC score unless the methodology is explicitly revised to define one. The market and capability assessments should remain visible separately so the trade-off is explicit.

### Required output

Record in `implementation/<channel>/poc.md`:

- the specific-opportunity market-attractiveness assessments;
- the specific-opportunity capability assessments;
- the resulting shortlist;
- the evidence-based reason each shortlisted candidate remains suitable for a POC and why excluded candidates were not carried forward.

### Completion criteria

Step 5 is complete when:

1. every material candidate from Step 4 has been assessed consistently on both axes;
2. scores, confidence and evidence are recorded for all ten dimensions;
3. opportunity-area evidence has not been substituted for candidate-specific evidence where the distinction matters;
4. candidates unlikely to generate meaningful market feedback at POC scale are excluded;
5. candidates whose representative POC would be disproportionately complex, expensive or operationally heavy are excluded;
6. a small evidence-based shortlist remains for final selection.

## Step 6 — Select the POC Opportunity

### Purpose

Select one concrete commercial proposition from the Step 5 shortlist to carry into POC definition and design.

The selection should favour the **smallest and least expensive credible experiment** that can still generate useful evidence about both specific market attractiveness and the capability requirements of delivering the proposition.

### Selection method

Use the completed Step 5 assessments rather than introducing a new idea or new scoring framework.

The final decision should consider:

- strength and confidence of the candidate's specific market-attractiveness evidence;
- likelihood that a POC can generate enough real usage or buyer feedback to test those assumptions;
- overall capability burden, particularly technical complexity, operating complexity and cost intensity;
- whether the bounded POC will exercise the material data/resource and operating requirements of the real proposition;
- whether the experiment can be kept sufficiently small, inexpensive and reversible for a first implementation cycle.

The highest-market candidate is not automatically selected if it requires a disproportionately heavy POC. The lowest-capability candidate is not automatically selected if it is unlikely to generate enough market evidence to be informative.

### Required output

Record in `implementation/<channel>/poc.md`:

- the selected specific opportunity;
- its Step 5 market-attractiveness and capability assessment;
- the buyer problem, target user and core value proposition at the level already established by the research;
- the rationale for selection over the other shortlisted candidates;
- the market and capability assumptions that the subsequent POC should be capable of testing.

Detailed POC scope, implementation design and success/exit criteria are defined in Phase 3, not in this step.

### Completion criteria

Step 6 is complete when:

1. exactly one candidate is selected from the Step 5 shortlist;
2. the selection is traceable to the Step 4 research and Step 5 assessments;
3. the candidate has sufficient market-evidence potential for a meaningful POC;
4. its representative POC can reasonably be kept simple and inexpensive;
5. the candidate is capable of exercising the material capability assumptions that need to be tested;
6. the rationale explicitly explains the trade-off between market attractiveness and capability requirements;
7. no unresolved evidence gap prevents the opportunity from being developed into a POC definition.

## Gateway 2 — POC Opportunity Selected

Confirm that one specific opportunity has been selected through the full Phase 2 process and is sufficiently evidenced to justify POC definition and design.

A **Pass** decision requires a completed opportunity-area selection, specific-opportunity research, candidate assessment/shortlisting and final opportunity selection. Gateway 2 confirms the opportunity to develop further; it does not commit the project to building the POC.

---

# Phase 3 — POC Definition and Design

Phase 3 expands the selected opportunity into a structured POC definition that can support an implementation decision. The buyer problem, target user and core proposition established during Phase 2 become inputs rather than being rediscovered from scratch.

**The steps from Phase 3 onward remain directional placeholders until they are explicitly developed using the methodology-definition process above. They should not be treated as fully defined methodology steps merely because they are named here.**

## Step 7 — Define the POC

Expand the selected opportunity into a structured POC definition covering the problem, target user, value proposition, scope, inputs and outputs, dependencies, constraints and explicit success and exit criteria.

## Step 8 — Define POC Operational Requirements

Identify the minimum operational capabilities required while the POC is running, such as visibility of failures, dependency changes, cost behaviour and issues requiring intervention.

## Gateway 3 — POC Commitment

Confirm that the POC is sufficiently defined, appropriately scoped and operationally manageable before implementation begins.

---

# Phase 4 — POC Implementation and Validation

## Step 9 — Implement the POC

Build and deploy the minimum implementation required to test the defined commercial and technical hypotheses.

## Step 10 — Operate, Evaluate and Iterate the POC

Run the POC under realistic conditions, evaluate it against its success criteria, observe its operational behaviour and perform bounded iterations where justified by the evidence.

## Gateway 4 — Productisation Decision

Determine whether the combined commercial, technical and operational evidence supports progression to a production product.

---

# Phase 5 — Product, Commercial and Operational Design

## Step 11 — Define the Production Product

Translate the validated POC into a production product definition covering functionality, architecture, user experience, reliability and service behaviour.

## Step 12 — Define the Commercial Model

Define pricing, cost structure, expected usage economics and other commercial characteristics required for a sustainable paid service.

## Step 13 — Define the Production Operating Model

Identify how the live service must be operated after launch, including monitoring, failure detection, issue handling, customer feedback, corrective releases, external dependency changes and ongoing service maintenance.

## Gateway 5 — Production Commitment

Confirm that the product, commercial model and required operating model are sufficiently understood to justify production implementation.

---

# Phase 6 — Production Implementation and Readiness

## Step 14 — Implement the Production Product

Build the production version of the service with the functionality and technical characteristics required for public paid usage.

## Step 15 — Implement Operational Processes

Put in place the operational mechanisms and processes identified in the operating model so that the service can be monitored, supported, maintained and changed after launch.

## Step 16 — Validate Technical Readiness

Verify that the production service satisfies its defined functional, reliability, performance, integration, cost and technical quality requirements.

## Step 17 — Validate Operational Readiness

Verify that failures, customer issues, dependency changes and other foreseeable operational events can be detected and handled through the implemented operating processes.

## Gateway 6 — Launch Readiness

Confirm technical readiness, operational readiness and commercial readiness before exposing the service to paying customers.

---

# Phase 7 — Launch and Initial Operation

## Step 18 — Prepare Channel Publication

Complete the customer-facing channel configuration, documentation, schemas, examples, pricing and other publication requirements.

## Step 19 — Publish and Validate Go-Live

Publish the monetised service and verify the complete live customer journey, including discovery, execution, API consumption, result delivery, charging and operational visibility.

## Step 20 — Validate the Live Operating Model

Confirm during initial live operation that the monitoring, support, maintenance and change processes function effectively against real service behaviour.

## Implementation Complete

Defines the point at which the initial implementation objective has been achieved: the service is live, monetised, technically stable and supported by a functioning operating model.