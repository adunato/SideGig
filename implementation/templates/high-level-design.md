# High-Level Design: <change name>

> Canonical artifact. Keep the required headings stable so structural validators and progress views can read this document. A valid structure does not, by itself, mean the design or its gateway is complete.

**Artifact ID:** `<stable-id>`  
**Status:** `<Draft | Approved | Superseded>`  
**Owner:** `<person or role>`  
**Created / updated:** `<YYYY-MM-DD>`  
**Related methodology step / gateway:** `<step or gateway>`  
**Traceability:** `<research, issue, requirement, or upstream artifact links>`

## 1. Summary

<Describe the change, the problem it solves, and the intended outcome in plain language.>

## 2. Current State

<Describe only the current behaviour and architecture relevant to this change, including material limitations.>

## 3. Requirements

<Restate the requirements so this artifact stands alone.>

### Functional Requirements

- <required behaviour>
- <required behaviour>

### Constraints and Important Conditions

- <compatibility, security, performance, integration, or unchanged behaviour constraint>

## 4. Expected Outcome

### Before

<Relevant current behaviour.>

### After

<Specific expected behaviour and evidence of success.>

## 5. Proposed Design

<Describe the architecture, responsibilities, interactions, decisions, and important data/control flow. Do not prescribe individual file edits.>

### High-Level Flow

1. <event or user action>
2. <system response>
3. <processing and state change>
4. <result or operational outcome>

## 6. Backend Changes

<Services, APIs, domain logic, persistence, jobs, integrations, or error handling. State “No meaningful backend impact” when applicable.>

## 7. UI and User Experience Changes

<User-visible flows and loading, empty, success, or error states. State “No meaningful UI impact” when applicable.>

## 8. Data and State

<Data concepts, ownership, persistence, transitions, migration, compatibility, and exchanged state.>

## 9. Interfaces and Integrations

<Internal/external APIs, events, queues, commands, or integration boundaries and their responsibilities.>

## 10. Error and Edge-Case Behaviour

<Material failures, invalid input, partial failure, retries, degraded behaviour, and recovery expectations.>

## 11. Validation Considerations

<Behaviours to prove through unit, integration, end-to-end, or manual validation.>

## 12. Open Questions

<Unresolved questions that affect behaviour or implementation. If none: “No outstanding design questions.”>

## 13. Design Summary

- <key decision>
- <key decision>
- <key decision>

### Gateway decision

**Decision:** `<Proceed | Hold | Reject | Not applicable>`  
**Rationale:** `<evidence-based decision and remaining conditions>`  
**Required evidence before downstream work:** `<artifact links or None>`

### Completion contract

The HLD is substantively complete only when requirements, proposed architecture, validation considerations, open questions, traceability, and the gateway decision are resolved. Record approval in the artifact; do not infer completion from headings alone.
