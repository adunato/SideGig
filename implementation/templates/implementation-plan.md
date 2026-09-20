# Implementation Plan: <change name>

> Canonical artifact. Required headings are stable for structural validation. Structural validity and substantive completion are separate.

**Artifact ID:** `<stable-id>`  
**Status:** `<Draft | Approved | Superseded>`  
**Owner:** `<person or role>`  
**Created / updated:** `<YYYY-MM-DD>`  
**Originating Issue:** `<issue reference>`  
**HLD reference:** `<path and artifact ID | Not required>`  
**Methodology step / gateway:** `<step or gateway>`  
**Traceability:** `<requirements, decisions, or upstream artifact links>`

## 1. Implementation Summary

<Practical implementation shape, affected areas, sequencing, and dependencies.>

## 2. Design Inputs

- **Originating Issue:** <issue reference and outcome>
- **HLD:** <design decisions that constrain implementation, or "Not required">
- **Durable product / architecture context:** <relevant Product Definition or Architecture Definition references, or None>

Do not create an HLD solely to satisfy this section. Where no HLD is required, the Issue and durable project documentation provide the design input.

## 3. Repository Assessment

<Relevant repository components, patterns, reusable behaviour, constraints, and replacement/extension points discovered during inspection.>

## 4. Implementation Approach

### 4.1 <Implementation Area>

<What changes, why, responsibility, and dependencies.>

### 4.2 <Implementation Area>

<Add or remove areas as needed.>

## 5. Implementation Sequence

1. <underlying capability>
2. <dependent behaviour>
3. <integration and supporting behaviour>
4. <integrity checks and hand-off>

<Explain only meaningful dependencies.>

## 6. Development Integrity Checks

- <lint, formatting, syntax, type, build, or repository-specific check>
- <check or "Not applicable, because ...">

## 7. Validation Requirements

### Unit Validation

- <behaviour and edge case to prove>

### End-to-End Validation

- <user/system flow to prove>

### Other Relevant Validation

- <integration, migration, compatibility, or manual check, if needed>

## 8. Open Implementation Questions

<Questions requiring resolution before or during development. If none: "No outstanding implementation questions.">

## 9. Low-Level Design Decision

**LLD required:** `<Yes | No>`

### Rationale

<Assess complexity, coupling, repository-specific decisions, and risk. If Yes, state what the LLD must resolve. If No, explain why the available design inputs and this plan are sufficient.>

## 10. Implementation Checklist

- [ ] <implementation activity>
- [ ] <implementation activity>
- [ ] Complete relevant integrity checks
- [ ] Complete implementation summary for validation hand-off

### Gateway decision

**Decision:** `<Approve implementation | Hold | Reject>`  
**Rationale:** `<evidence and conditions>`  
**Required evidence:** `<artifact links or None>`

### Completion contract

The plan is substantively complete only when the repository assessment, sequence, checks, validation requirements, explicit LLD decision, checklist, traceability, and gateway decision are resolved and approved. An HLD is required only when the Development Lifecycle says the change needs one.
