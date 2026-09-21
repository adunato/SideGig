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


## Relationship to the Development Operating Model

The implementation methodology and the [SideGig Development Operating Model](../development/operating-model.md) are complementary and intentionally operate at different levels.

The implementation methodology owns the **commercial implementation lifecycle**: the sequence from a selected channel through prerequisite validation, POC selection and definition, implementation commitment, live POC evaluation, productisation, launch readiness and initial live operation. It defines the outcome and evidence required from each step and the gateways that authorize progression.

The Development Operating Model owns the **software engineering lifecycle** for every independently deployable SideGig product or service. It defines repository bootstrap and structure, durable Product and Architecture definitions, the GitHub Delivery Model, Issue-driven change delivery, proportional design and planning, development and validation, coding/quality standards, CI/CD, release preparation, staging validation, production promotion and agentic-development conventions.

The boundary is governed by the following rules:

1. When an implementation-methodology step requires software to be created or changed, that engineering work is performed in the product repository under the current Development Operating Model.
2. The product repository is authoritative for durable Product and Architecture definitions, GitHub Issues, change-specific design artifacts, source code, tests, CI/CD configuration, pull requests, release state and engineering validation evidence.
3. Implementation artifacts record the methodology decision, required cross-project evidence and stable references needed to establish step completion. They do not duplicate detailed engineering artifacts from the product repository.
4. Initial creation of a product repository uses the operating model's bootstrap process. Normal software changes after bootstrap are Issue-driven and follow the Development Lifecycle.
5. Channel configuration, commercial decisions, market evidence and operating-process definitions that are not software-engineering state remain owned by the implementation methodology and its artifacts. Version-controlled software or configuration changes still follow the Development Operating Model.
6. If implementation exposes a reusable engineering-process gap, correct the Development Operating Model rather than embedding a project-specific replacement process in this methodology.
7. Active implementations consume the current Development Operating Model unless a documented project-specific exception is genuinely required.

This gives the lifecycle a one-way delegation model:

Implementation methodology outcome → Development Operating Model execution → product-repository evidence → implementation methodology completion evidence

The implementation methodology may therefore require a software outcome without prescribing branches, pull-request mechanics, design-document depth, CI jobs or release commands. Those details are resolved by the Development Operating Model and the product repository.

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

## 12. Development Execution Uses the Development Operating Model

The implementation methodology does not maintain a parallel software-development process.

Whenever a methodology step requires repository establishment, product or architecture definition, software changes, technical validation, release preparation, staging validation, production promotion or corrective software work, use the current [SideGig Development Operating Model](../development/operating-model.md) and its canonical templates and skills.

The SideGig-owned reusable agent package, bootstrap definitions and engineering templates are implementation mechanisms of that operating model. Their detailed composition, installation and lifecycle rules belong to the Development Operating Model rather than being repeated here.

Implementation artifacts retain only the evidence and references required to prove the methodology step or gateway. Detailed engineering state remains in the product repository.

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

**Steps 7 and 8, Gateway 3 and Step 9 are defined and may be executed. Step 10, Gateway 4 and the later phases remain directional placeholders until they are explicitly developed using the methodology-definition process above.**

## Step 7 — Define the POC

### Purpose

Convert the specific opportunity selected at Gateway 2 into a bounded commercial experiment that is precise enough to implement and evaluate.

Step 7 defines **what the POC is and what evidence it must generate**. It does not design production architecture, define the production commercial model or introduce production-grade operational requirements. Those belong to later steps.

The POC must remain the smallest credible implementation that can test both dimensions carried forward from Phase 2:

1. whether the selected proposition can generate observable real-user market evidence; and
2. whether the material capability assumptions remain valid when the proposition is implemented and exposed under realistic conditions.

### Inputs

Use:

- the completed `implementation/<channel>/poc.md` Phase 2 sections and Gateway 2 decision;
- the selected opportunity's buyer problem, target user, value proposition, market assumptions and capability assumptions;
- relevant research and case-study evidence already linked from Phase 2;
- Phase 1 implementation evidence where it constrains the POC;
- current channel documentation where implementation or monetisation mechanics must be verified.

Do not reopen opportunity selection unless Step 7 exposes a material contradiction that makes the selected proposition unsuitable for a bounded POC.

### Definition method

Define the POC at the minimum level required to make implementation and later evaluation unambiguous.

#### Experiment boundary

Record:

- the POC objective;
- the primary target user and buyer problem carried forward from Phase 2;
- the experiment mode, including whether the POC is private, invited, public, free or paid;
- the observation window or other explicit evaluation boundary;
- any temporary POC commercial parameter needed to make the experiment meaningful, while making clear that production pricing belongs to Step 12.

A commercial POC may be publicly exposed or monetised where real-user behaviour is necessary to test the market hypothesis. This does not make the POC a production launch: production readiness, production pricing and the final go-live decision remain governed by later gateways.

#### Functional scope

Define the minimum functionality required to deliver the selected value proposition and test its material capability assumptions.

Record both **in scope** and **out of scope**. Out-of-scope items are important where they prevent the POC from drifting into adjacent propositions, differentiation layers or production features that were not selected at Gateway 2.

#### Inputs and outputs

Define the user-visible inputs and outputs at a level sufficient to implement stable schemas and acceptance tests.

For each material input, record its purpose, type or form, default/bound where relevant and whether it is required.

For each material output, record the field or output object, its meaning and whether it is required for every successful result.

The POC should use the channel's native schema and delivery mechanisms where practical rather than creating unnecessary external interfaces.

#### Dependencies and constraints

Record the external sources, channel services and other dependencies the POC relies on, together with the material constraint each introduces.

Explicitly identify constraints that affect the validity of the experiment, such as source result limits, incomplete data, unstable upstream behaviour, usage policies, geographic behaviour or variable execution cost.

Do not solve these constraints pre-emptively with heavier production mechanisms unless the selected proposition genuinely requires them. The POC should expose whether such mechanisms become necessary.

#### Success and exit criteria

Define observable criteria before implementation begins.

Criteria must cover both:

- **market evidence**, such as independent users, repeat use, paid use, buyer feedback or another observable signal appropriate to the channel; and
- **capability evidence**, such as functional correctness, run reliability, dependency behaviour, resource requirements and unit-cost behaviour.

Use explicit thresholds where a threshold is meaningful. Define what constitutes:

- **POC success** — evidence sufficient to support progression toward productisation;
- **bounded iteration** — partial evidence that justifies one or more specific, limited changes without changing the selected proposition; and
- **exit / stop** — evidence that the market or capability assumptions have failed strongly enough that further POC work is not justified.

Step 7 defines these criteria; Step 10 later measures the implemented POC against them.

### Required output

Extend `implementation/<channel>/poc.md` using the canonical POC template with a Phase 3 POC Definition section containing:

- the experiment definition and boundary;
- in-scope and out-of-scope functionality;
- user-visible inputs and outputs;
- dependencies and constraints;
- market and capability success criteria;
- iteration and exit criteria;
- the Step 7 completion decision.

### Completion criteria

Step 7 is complete when:

1. Gateway 2 is **Pass** and exactly one specific opportunity has been selected;
2. the POC objective and experiment boundary are explicit;
3. the scope is small enough to remain a bounded experiment while still delivering the selected proposition's core value;
4. in-scope and out-of-scope functionality are recorded clearly enough to prevent scope drift;
5. material user inputs and outputs are defined sufficiently for implementation and acceptance testing;
6. material dependencies and constraints are explicit;
7. success criteria cover both market evidence and capability evidence with observable measures;
8. bounded-iteration and exit criteria are defined;
9. no unresolved definition gap prevents Step 8 from determining the operational requirements needed to run the POC.

## Step 8 — Define POC Operational Requirements

### Purpose

Define the **minimum operating layer required to run the Step 7 POC safely and interpret its evidence correctly**.

Step 8 is not the production operating model. It should not introduce production SLAs, 24/7 support, enterprise incident management, redundant infrastructure or other operational mechanisms that are unnecessary for a bounded POC. Its purpose is to ensure that material failures, source changes, data-quality degradation, cost behaviour and market signals can be observed and acted on during the experiment.

The operational design should remain proportional to the POC. Prefer native channel monitoring, logs, analytics and cost controls before introducing custom monitoring infrastructure.

### Inputs

Use:

- the completed Step 7 POC definition;
- the Step 7 market and capability success criteria, bounded-iteration rule and exit rule;
- the POC dependencies and constraints;
- Phase 1 evidence about the channel's available run, log, usage and cost visibility;
- current channel documentation for monitoring, analytics, charging and operational controls where those mechanics may have changed.

If a Step 7 criterion cannot be measured reliably with the available channel evidence, refine the criterion to the closest observable measure before Step 8 is considered complete. The change must preserve the intent of the criterion rather than making success easier.

### Operational-requirements method

Define only the operational capabilities needed to preserve the validity of the POC and support the later evaluation.

#### Monitoring coverage

For each material operational concern, record:

- the signal, metric or evidence that reveals its state;
- the monitoring or evidence mechanism;
- the trigger, threshold or review rule;
- the action required when the trigger is met.

At minimum consider:

1. **Run health and failures** — whether executions succeed and failures can be diagnosed.
2. **Data / result quality** — whether the output continues to satisfy the material quality assumptions defined in Step 7.
3. **External dependency behaviour** — whether an upstream source or service has changed, degraded or become inaccessible.
4. **Usage, cost and unit economics** — whether the POC remains within its cost assumptions and charging behaviour is operating as intended.
5. **Market-experiment signals** — whether user, usage, repeat-use and monetisation evidence needed by Step 7 can actually be observed.
6. **User-reported issues** — where the channel exposes feedback, issues or shared diagnostic evidence that could reveal a POC defect.

A category may be marked not applicable where the POC genuinely does not require it, with a reason.

#### Operating cadence and evidence capture

Define the smallest review cadence needed for the experiment.

Separate:

- **event-driven observation**, where a failure or threshold should trigger attention promptly;
- **periodic review**, where trends such as usage, user growth, cost or profit can be reviewed less frequently; and
- **evaluation snapshots**, including the baseline and end-of-window evidence needed to calculate the Step 7 decision criteria.

The evidence source should be identified sufficiently that Step 10 can reproduce the POC evaluation without relying on memory or informal observations. Use existing channel run history, analytics exports, logs and usage records where possible rather than creating a parallel monitoring database.

#### Intervention boundaries

Define what may be changed while the POC is running without invalidating the experiment.

A bounded operational fix may normally correct a defect, parser breakage, retry behaviour, logging, schema implementation or documentation while preserving the selected proposition, experiment mode, commercial parameter and functional boundary.

A change that materially alters the buyer proposition, data source, pricing, distribution mode or excluded capability should not be treated as routine operations. It should trigger a deliberate iteration decision and, where it changes the conditions under which market evidence is collected, a new observation window or later gateway decision.

Define explicit conditions under which the experiment should be paused while a material defect or dependency failure is investigated.

### Required output

Extend `implementation/<channel>/poc.md` using the canonical POC template with a POC Operational Requirements section containing:

- the operational evidence basis;
- monitoring requirements and response rules;
- the operating cadence and evidence-retention approach;
- bounded-intervention and pause rules;
- the Step 8 completion decision.

### Completion criteria

Step 8 is complete when:

1. Step 7 is complete and the POC boundary is stable enough to operate;
2. every material Step 7 market and capability criterion has an identified observable evidence source;
3. run health, result quality, dependency behaviour and cost/economic behaviour are covered where material;
4. the market signals required to evaluate the POC are measurable using identified channel evidence;
5. material operational triggers have a defined response;
6. event-driven monitoring and periodic review are proportionate to the POC rather than production-grade by default;
7. baseline and end-of-window evidence capture are defined;
8. bounded fixes are distinguished from changes that invalidate or restart the experiment;
9. pause conditions are explicit;
10. no unresolved operational-observability gap prevents Gateway 3 from deciding whether to commit to implementation.

## Gateway 3 — POC Commitment

### Purpose

Make the explicit decision whether the project should **commit implementation effort to the defined POC**.

Gateway 3 is the transition from definition to implementation. It does not ask whether the POC has already succeeded; that evidence does not exist until the POC is built and operated. Instead, it determines whether Steps 7 and 8 have produced a sufficiently bounded, measurable and operationally manageable experiment to justify Step 9.

A Gateway 3 **Pass** authorizes implementation. It does **not** by itself authorize the public observation window to begin. Requirements that are needed only before public or paid exposure may remain as explicit **Action before observation** items, provided they are understood, feasible and non-blocking to implementation.

### Inputs

Use:

- the completed Step 7 POC definition;
- the completed Step 8 operational requirements;
- Phase 1 prerequisite and validation evidence;
- any deferred prerequisite that has become relevant because of the selected POC mode;
- current channel documentation where publication, monetisation, permissions or other commitment-critical mechanics may have changed;
- material project constraints such as cost, legal/eligibility limitations and implementation effort.

Do not reopen market opportunity selection at this gateway unless Steps 7–8 reveal a material contradiction that invalidates the selected proposition.

### Commitment assessment

Assess the following dimensions explicitly:

1. **Definition readiness** — scope, inputs, outputs, dependencies, constraints and experiment boundary are clear enough to implement without material product-definition decisions being left to the coding phase.
2. **Evidence readiness** — the market and capability hypotheses have observable success, iteration and exit criteria.
3. **Operational manageability** — the monitoring, evidence capture, intervention and pause rules are proportionate and feasible.
4. **Implementation proportionality** — the implementation remains sufficiently small, inexpensive and reversible for a POC.
5. **Prerequisite feasibility** — technical, platform and commercial prerequisites needed for implementation or the later observation window are either ready or have a concrete feasible action.
6. **Risk / cost containment** — known technical, commercial and operational risks have explicit boundaries and no unresolved exposure makes the experiment unreasonable.

Use only:

- **Ready** — sufficient to commit and no further action is required for this dimension;
- **Action before observation** — does not block Step 9, but must be completed before the public/paid observation window starts;
- **Blocked** — unresolved issue prevents responsible commitment to implementation;
- **Not applicable** — the dimension or identified requirement genuinely does not apply.

A gateway should not pass with any **Blocked** item.

### Pre-observation requirements

Record every known requirement that does not block implementation but must be completed before the Step 7 observation window starts.

Examples include public listing metadata, monetisation/account configuration, customer-facing documentation, publication permissions or other channel-specific setup that is unnecessary for coding but necessary for a valid public experiment.

These items become explicit Step 9 completion dependencies. They must not disappear merely because Gateway 3 passed.

### Decision rule

Gateway 3 is **Pass** when:

- Steps 7 and 8 are complete;
- no commitment-assessment item is **Blocked**;
- the POC remains bounded and proportionate;
- all material success/exit evidence is observable;
- any **Action before observation** item is explicitly recorded, feasible and has a clear completion point;
- there is no unresolved prerequisite, cost or operating issue that makes implementation unjustified.

A **Pass** means **Commit to POC implementation and proceed to Step 9**.

Gateway 3 is **Fail** when a material definition, observability, prerequisite, cost or operating issue must be resolved before implementation effort should be committed.

### Required output

Extend `implementation/<channel>/poc.md` using the canonical POC template with a Gateway 3 section containing:

- the commitment assessment;
- all pre-observation requirements;
- the Gateway 3 decision and commitment;
- the rationale;
- the authorized next step.

### Completion criteria

Gateway 3 is complete when:

1. Steps 7 and 8 are complete;
2. all six commitment dimensions have been considered;
3. each material commitment item has a valid readiness status;
4. no **Blocked** item remains for a Pass decision;
5. all known pre-observation requirements are recorded;
6. the decision is explicitly **Pass** or **Fail**;
7. a Pass explicitly records the commitment to Step 9 and preserves the distinction between implementation authorization and observation-window readiness.

---

# Phase 4 — POC Implementation and Validation

Phase 4 turns the committed POC into a working experiment and then uses that experiment to gather the evidence required for a productisation decision.

## Step 9 — Implement the POC

### Purpose

Turn the Gateway 3 commitment into a **deployed, technically validated and observation-ready POC**.

Step 9 implements only the experiment defined in Step 7, with the operating capabilities defined in Step 8. It does not broaden the proposition, introduce production hardening or begin evaluating market success.

Step 9 ends immediately before the Step 7 observation window begins. Step 10 owns live operation, evidence gathering, bounded iteration and evaluation during that window.

### Inputs

Use:

- the completed Step 7 POC definition, including scope, inputs, outputs, dependencies and success/exit criteria;
- the completed Step 8 operational requirements;
- the Gateway 3 **Pass** decision and all recorded pre-observation requirements;
- the Phase 1 prerequisite and validation evidence where it constrains implementation;
- the current [SideGig Development Operating Model](../development/operating-model.md);
- current channel documentation where deployment, publication, charging or runtime mechanics must be implemented.

### Relationship to the Development Operating Model

Step 9 defines the **implementation outcome and evidence required by the commercial methodology**. It does not redefine the engineering workflow.

All software engineering required by Step 9 is performed according to the current [SideGig Development Operating Model](../development/operating-model.md). The operating model owns repository bootstrap, durable Product and Architecture definitions, GitHub Issues and release state, proportional change design and planning, development, validation, CI/CD and promotion.

The product repository is therefore authoritative for the engineering execution of the POC. implementation/<channel>/poc.md records only the references and cross-project evidence needed to determine whether Step 9 is complete and the observation window may begin.

Where Step 9 exposes a reusable gap in the Development Operating Model, update that operating model separately rather than embedding an alternative engineering process in this methodology.

### Implementation method

#### 1. Establish the development project

Create or reconcile the product repository through the standard bootstrap process defined by the Development Operating Model.

Use the approved Step 7 POC definition, Step 8 operational requirements and Gateway 3 decision as upstream product context. The product repository must contain the durable Product Definition and Architecture Definition required by the operating model, with sufficient approval state for downstream implementation to rely on them.

Repository bootstrap is project establishment rather than a product change and does not require an artificial bootstrap Issue.

#### 2. Translate the POC into controlled software work

Represent implementation work after bootstrap through GitHub Issues under the Development Operating Model.

The POC boundary remains controlled by Step 7. Issues translate that approved boundary into independently mergeable outcomes; they do not create new product scope.

Use the operating model's proportional lifecycle to determine whether each Issue requires an HLD, Implementation Plan or LLD. The implementation methodology does not prescribe those artifacts independently.

Where the POC is the first planned release, use the release/versioning conventions defined by the GitHub Delivery Model.

#### 3. Implement, validate and integrate the defined POC

Execute each implementation Issue through the Development Lifecycle.

The resulting code, tests, durable-document updates, validation evidence, pull requests and CI results remain in the product repository. All required implementation work must be integrated into the appropriate development line before the POC release candidate is prepared.

Step 9 does not broaden the proposition to solve deferred production concerns.

#### 4. Prepare, validate and deploy the observation release

Use the Development Operating Model's release, staging-validation and production-promotion path proportionately for the target channel.

The release candidate must represent the POC that will actually be observed in Step 10. Validate the material deployed behaviour that cannot be established locally, including the Step 7 input/output contract and the Step 8 platform, monitoring, charging or operational mechanisms where applicable.

Deploy the validated release to the actual channel/environment used for the observation window and retain an unambiguous implementation/release reference.

#### 5. Close the pre-observation requirements

Complete every Gateway 3 item recorded as **Action before observation** and update the Gateway 3 pre-observation table with its final status and evidence.

This includes channel publication, customer-facing documentation, billing/monetisation configuration, monitoring setup or other channel-specific requirements explicitly carried into Step 9.

No **Action before observation** or **Blocked** item may remain when Step 9 is complete.

#### 6. Establish the observation baseline

Capture the baseline evidence defined in Step 8 immediately before the live observation window begins and record the deployed implementation/configuration against which Step 10 evidence will be evaluated.

Do not begin counting the observation window until Step 9 has been recorded as complete.

### Required output

Extend `implementation/<channel>/poc.md` using the canonical POC template with a POC Implementation section containing:

- the product repository reference;
- the development/design evidence references required by the Development Operating Model;
- the deployed implementation reference;
- concise technical implementation and validation evidence;
- confirmation that the Gateway 3 pre-observation requirements are closed;
- confirmation that the Step 8 observation baseline has been captured;
- the Step 9 completion decision and any blockers.

Detailed design, issue history, source code, tests and CI records remain in the product repository and should be linked rather than duplicated in the implementation artifact.

### Completion criteria

Step 9 is complete when:

1. Gateway 3 is **Pass**;
2. the product repository has been established and the current Development Operating Model requirements needed for implementation have been satisfied;
3. the implemented functionality remains within the Step 7 POC boundary;
4. representative technical validation demonstrates the Step 7 input/output contract and material capability assumptions sufficiently to begin live operation;
5. the Step 8 monitoring and evidence mechanisms required during Step 10 are configured and verified;
6. the POC is deployed to the channel/environment that will be used for the observation window and the intended user execution/result-delivery path works;
7. the deployed implementation is traceable to a specific implementation reference;
8. every Gateway 3 **Action before observation** item has been closed or made explicitly **Not applicable**;
9. the Step 8 baseline required for later evaluation has been captured;
10. no unresolved implementation defect or configuration issue prevents valid live observation;
11. the artifact explicitly records Step 9 as complete and ready to proceed to Step 10.

## Step 10 — Operate, Evaluate and Iterate the POC

### Purpose

Run the deployed POC under the Step 7 experiment conditions, collect the Step 8 evidence, perform only bounded interventions that preserve the experiment, and evaluate the result against the defined success, iteration and exit rules.

Step 10 owns the live observation window. It does not silently convert the POC into a production product.

### Inputs

Use:

- the completed Step 9 implementation evidence and deployed release reference;
- the Step 7 POC scope, experiment mode, success criteria, bounded-iteration rule and exit rule;
- the Step 8 monitoring, evidence-capture, intervention and pause rules;
- the launch baseline captured at the end of Step 9.

### Operating method

Operate the POC for the defined observation window and retain the evidence required by Step 7 and Step 8.

Classify interventions as:

- **Operational observation only** — evidence collection with no change to the experiment;
- **Bounded fix** — a defect correction permitted by the Step 8 intervention boundary;
- **Experiment-changing iteration** — a material change to proposition, scope, data source, pricing, distribution mode or another Step 7 condition.

Any software correction or iteration is implemented through the Development Operating Model. A bounded fix does not create an informal repair path. Where a software change requires a new release, use the applicable Issue, validation and release flow and record whether the observation window remains valid.

An experiment-changing iteration must be explicitly authorized under the Step 7 bounded-iteration rule and must restart or redefine the observation window where the evidence conditions materially change.

### Required output

Extend implementation/<channel>/poc.md with the live-operation and evaluation evidence needed to determine:

- the observation period actually completed;
- market evidence against each Step 7 market criterion;
- capability and operational evidence against each Step 7 capability criterion;
- incidents, pauses and bounded interventions;
- any authorized iteration and its effect on the observation window;
- the final POC evaluation and recommendation into Gateway 4.

Detailed software-fix evidence remains in the product repository and is referenced rather than duplicated.

### Completion criteria

Step 10 is complete when:

1. Step 9 was complete before the observation window began;
2. the defined observation window has completed, or an explicit Step 7 stop rule has terminated it;
3. every material Step 7 criterion has been evaluated from retained evidence;
4. material incidents, pauses, fixes and iterations are recorded and their effect on experiment validity is understood;
5. any software work performed during the window is traceable through the Development Operating Model;
6. the POC has an explicit evidence-based evaluation suitable for Gateway 4.

## Gateway 4 — Productisation Decision

### Purpose

Decide whether the POC evidence justifies progressing the proposition into production design.

Gateway 4 evaluates the experiment that was actually run. It does not treat implementation effort already spent as evidence that productisation is justified.

### Decision

Use one of:

- **Proceed to productisation** — the combined market, capability and operational evidence justifies Phase 5;
- **Iterate POC** — the evidence supports one further bounded experiment before a production commitment can be assessed;
- **Stop** — the evidence does not justify further implementation of the proposition.

Record the decision and rationale in implementation/<channel>/poc.md.

A decision to iterate returns to the appropriate POC definition/implementation step rather than bypassing the existing POC controls.

### Completion criteria

Gateway 4 is complete when the Step 10 evidence has been evaluated, the decision is explicit, and the authorized next step is recorded.

---

# Phase 5 — Product, Commercial and Operational Design

Phase 5 translates a successful POC into a production proposition without creating a second software-engineering methodology.

The product repository remains authoritative for durable Product and Architecture definitions. The implementation methodology owns the commercial and service-operating decisions needed to determine whether production implementation should be committed.

The Phase 5–7 implementation record is held in implementation/<channel>/productisation.md using the canonical productisation template. That artifact records methodology decisions and references to product-repository engineering evidence; it does not duplicate the durable Product Definition, Architecture Definition or change-specific engineering artifacts.

## Step 11 — Define the Production Product

### Purpose

Translate the validated POC proposition into the approved production product baseline that downstream production implementation will deliver.

### Inputs

Use:

- Gateway 4 **Proceed to productisation** evidence;
- the validated POC scope and Step 10 findings;
- user, market, capability and operational evidence generated during the POC;
- the current product-repository Product Definition and Architecture Definition.

### Method

Define the production product in the product repository under the Development Operating Model.

Reconcile the durable Product Definition so that it describes the approved production scope, user-visible behaviour, capabilities, external contract, constraints and non-goals.

Reconcile the durable Architecture Definition to the level required for the production commitment decision. Material architecture decisions must be explicit enough that downstream implementation can be planned safely; implementation-detail decisions may remain for the proportional change lifecycle.

Do not create a duplicate production product specification inside the implementation artifact.

### Required output

Record in implementation/<channel>/productisation.md:

- the product repository reference;
- the approved Product Definition reference;
- the approved Architecture Definition reference;
- the material production-scope differences from the POC;
- any unresolved product or architecture question that affects Gateway 5.

### Completion criteria

Step 11 is complete when the production Product Definition and Architecture Definition are sufficiently approved to support production commitment and no unresolved product/architecture question makes implementation scope materially indeterminate.

## Step 12 — Define the Commercial Model

### Purpose

Define the commercial model required for a sustainable paid production service.

### Inputs

Use the POC market evidence, measured POC costs/economics, current channel commercial mechanics and the production product scope from Step 11.

### Required output

Record in implementation/<channel>/productisation.md the production commercial model, including where material:

- pricing and charging mechanism;
- channel fees and payout mechanics;
- expected unit economics and principal cost drivers;
- usage assumptions needed to interpret sustainability;
- material commercial constraints or account requirements;
- commercial thresholds or guardrails that affect production operation.

The methodology requires defensible assumptions and explicit uncertainty; it does not require false precision where private demand or revenue data remains unavailable.

### Completion criteria

Step 12 is complete when the proposed production pricing and charging model is actionable, the material cost/revenue mechanics are understood sufficiently for a commitment decision, and no unresolved commercial prerequisite prevents implementation.

## Step 13 — Define the Production Service Operating Model

### Purpose

Define how the production service will be monitored, supported, maintained and changed after launch.

This is the **service operating model**, not the SideGig Development Operating Model.

### Inputs

Use:

- Step 10 operational evidence;
- the production Product and Architecture definitions;
- the Step 12 commercial model;
- current channel monitoring, support and operational capabilities;
- the Development Operating Model for the software-change and release path.

### Required output

Record in implementation/<channel>/productisation.md the material production operating requirements, including where relevant:

- service health and failure detection;
- data/result quality monitoring;
- dependency-change detection;
- cost, usage, revenue and charging visibility;
- user/support intake and issue classification;
- incident and pause rules;
- routine maintenance expectations;
- the path from an operational defect or requested product change into the GitHub Issue and Development Lifecycle;
- evidence-retention and review cadence.

Prefer channel-native capabilities where they are sufficient. Add custom operational infrastructure only where the production requirement justifies it.

### Completion criteria

Step 13 is complete when the live service can be operated through explicit monitoring, support, maintenance and change-management mechanisms and no material operational responsibility is left undefined.

## Gateway 5 — Production Commitment

### Purpose

Decide whether the defined production product, commercial model and service operating model justify committing production implementation effort.

### Inputs

Use the completed Steps 11–13 and the Gateway 4 evidence.

### Decision rule

Gateway 5 is **Pass** when:

- the production Product and Architecture definitions are sufficiently approved;
- the commercial model is actionable and no material commercial blocker remains;
- the service operating model is feasible and proportionate;
- material production dependencies, costs and risks are understood sufficiently to implement;
- no unresolved issue makes the production commitment unreasonable.

A Pass authorizes production implementation under the Development Operating Model. A Fail records the blocking gap and the step to which work must return.

### Required output

Record the **Pass / Fail** decision, rationale, material conditions and authorized next step in implementation/<channel>/productisation.md.

---

# Phase 6 — Production Implementation and Readiness

Phase 6 builds the committed production product and proves that the release candidate and service-operating mechanisms are ready for launch.

Software engineering in this phase is executed through the Development Operating Model. The implementation artifact records production-readiness evidence and stable references rather than duplicating Issues, design artifacts, tests, pull requests or CI records.

## Step 14 — Implement the Production Product

### Purpose

Implement the production scope authorized by Gateway 5 and integrate it into the product repository's development line.

### Method

Translate the approved production Product/Architecture baseline into GitHub Issues and release scope under the Development Operating Model.

Each software change follows the proportional Development Lifecycle. Required durable-document changes, tests and CI evidence are part of the corresponding change.

Do not promote the production release to the public production environment in this step. Step 14 ends with the intended production scope integrated and green on the development line, ready for release-candidate preparation.

### Required output

Record in implementation/<channel>/productisation.md:

- the target production release/milestone;
- references to the completed implementation scope;
- the integrated dev candidate/reference;
- any unresolved implementation blocker.

### Completion criteria

Step 14 is complete when all Gateway-5 production scope required for the initial release is integrated, required development validation is green, and the intended release scope can be selected as a release candidate.

## Step 15 — Implement Operational Processes

### Purpose

Put in place the operational mechanisms required by Step 13 before launch readiness is assessed.

### Method

Implement the monitoring, alerting, support, cost/usage visibility, incident-handling and maintenance mechanisms that are required for the initial production service.

Any software or version-controlled configuration change follows the Development Operating Model. Non-code channel/account/process configuration remains methodology evidence but must still be reproducible or documented sufficiently to operate the service.

### Required output

Record implementation evidence against the Step 13 operating requirements in implementation/<channel>/productisation.md.

### Completion criteria

Step 15 is complete when every operating requirement needed at launch is implemented or explicitly not applicable and no missing operational mechanism prevents readiness validation.

## Step 16 — Validate Technical Readiness

### Purpose

Prove that the exact production release candidate satisfies the material technical requirements before launch authorization.

### Method

Use the Development Operating Model's release-candidate and staging-validation path.

Prepare the release candidate from a green dev state, promote it to the staging/pre-production environment and execute the technical validation material to the product. This includes the repository validation contract plus deployed checks such as critical end-to-end behaviour, integrations, runtime configuration, persistence, permissions, logging, metering or charging where applicable.

A technical defect is resolved through the Development Operating Model release-fix path and revalidated.

Step 16 does not authorize production promotion.

### Required output

Record in implementation/<channel>/productisation.md:

- the exact release-candidate reference;
- the staging deployment reference;
- required automated and manual staging evidence;
- technical-readiness result and blockers.

### Completion criteria

Step 16 is complete when the same candidate intended for launch has passed all material technical and staging checks and no unresolved technical blocker remains.

## Step 17 — Validate Operational Readiness

### Purpose

Verify that the Step 13 service operating model works against the production release candidate and launch environment.

### Method

Exercise the material operational paths that can be validated before launch, such as:

- failure detection and diagnostic visibility;
- alert and escalation paths;
- data/result quality checks;
- cost, usage and charging visibility;
- user/support intake;
- incident classification and corrective-change routing;
- dependency-change response;
- any required manual operational procedure.

Where validation exposes a software defect, correct it through the Development Operating Model and repeat the affected readiness checks.

### Required output

Record the operational-readiness evidence, unresolved issues and final readiness result in implementation/<channel>/productisation.md.

### Completion criteria

Step 17 is complete when the material operational mechanisms required for initial live service have been demonstrated and no unresolved operating blocker remains.

## Gateway 6 — Launch Readiness

### Purpose

Authorize or block launch of the exact production release candidate.

### Decision rule

Gateway 6 is **Pass** only when:

- Steps 14–17 are complete;
- the exact release candidate has passed required staging validation;
- the production commercial configuration is ready;
- required channel/publication prerequisites are understood and executable;
- required service-operating mechanisms are ready;
- no known technical, operational or commercial blocker remains.

A Pass authorizes Phase 7 preparation and production promotion. It does not permit replacing the validated release candidate with unvalidated application changes.

### Required output

Record the **Pass / Fail** decision, the authorized release candidate and any launch conditions in implementation/<channel>/productisation.md.

---

# Phase 7 — Launch and Initial Operation

Phase 7 prepares the customer-facing publication state, promotes the validated candidate into production, validates the live customer journey and confirms that the service operating model works under initial real usage.

## Step 18 — Prepare Channel Publication

### Purpose

Complete the customer-facing and channel-specific configuration required to make the validated production candidate launchable.

### Required output

Record in implementation/<channel>/productisation.md the completion/evidence for material publication requirements, including where applicable:

- listing metadata and positioning;
- customer-facing documentation and examples;
- input/output schemas or samples;
- production pricing/charging configuration;
- permissions, visibility and account requirements;
- support/contact information;
- any other channel-specific launch prerequisite.

Version-controlled documentation or configuration changes follow the Development Operating Model and must not invalidate the candidate without revalidation.

### Completion criteria

Step 18 is complete when the channel publication state is ready to expose the Gateway-6-authorized candidate without an unresolved customer-facing, commercial or account prerequisite.

## Step 19 — Publish and Validate Go-Live

### Purpose

Promote the Gateway-6-authorized release candidate to production, publish the service and verify the complete live customer journey.

### Method

Use the Development Operating Model's production-promotion path for the software release.

The production state must correspond to the validated release candidate. Complete the explicit production promotion, immutable tag/GitHub Release and production deployment required by the operating model, then complete the channel publication action.

Verify the live path that matters to a paying customer, including where applicable discovery, configuration, execution/API invocation, result delivery, charging and operational visibility.

A launch defect that requires code or version-controlled configuration change follows the normal Development Operating Model repair/release path rather than being patched directly in production.

### Required output

Record in implementation/<channel>/productisation.md:

- immutable production release reference;
- channel publication reference;
- live smoke/customer-journey validation evidence;
- charging/monetisation evidence where material;
- any launch blocker or corrective action.

### Completion criteria

Step 19 is complete when the production release is traceable, the channel publication is live, the intended customer execution/result-delivery path works, and no known launch defect prevents valid initial operation.

## Step 20 — Validate the Live Operating Model

### Purpose

Confirm during initial live operation that the Step 13 service operating model functions against real service behaviour.

### Method

Operate the live service for a proportionate initial validation period and confirm that monitoring, support, maintenance, economics visibility and corrective-change routing work as designed.

Software defects or changes discovered during this period enter the Development Operating Model through GitHub Issues and normal release handling.

Step 20 is not an indefinite operations phase. It validates that the initial production operating model is functioning before the implementation methodology is considered complete.

### Required output

Record in implementation/<channel>/productisation.md:

- the initial live-validation period or evidence boundary;
- material operational events and how they were handled;
- confirmation of service-health, support, economics and maintenance visibility;
- any corrective releases or process changes;
- the final implementation-completion decision.

### Completion criteria

Step 20 is complete when the live service has demonstrated a functioning service operating model under initial real usage and no unresolved issue prevents transition to normal ongoing operation.

## Implementation Complete

The initial implementation objective is complete when:

1. the production product is live and monetised;
2. the deployed service is traceable to an immutable production release;
3. the complete customer execution and charging path has been validated where applicable;
4. the service operating model has been exercised successfully under initial live conditions;
5. no unresolved technical, operational or commercial blocker prevents normal ongoing operation;
6. the implementation artifacts contain the evidence required to reconstruct the methodology decisions and locate the authoritative engineering records in the product repository.

Ongoing product evolution, defect correction and releases continue under the Development Operating Model, with future commercial/product decisions entering the appropriate implementation or research methodology where required.
