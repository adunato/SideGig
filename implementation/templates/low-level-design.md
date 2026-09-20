# Low-Level Design: <change name>

> Canonical artifact. This is a file-level design, not a patch. Keep it synchronized with the approved HLD and implementation plan.

**Artifact ID:** `<stable-id>`  
**Status:** `<Draft | Approved | Superseded>`  
**Owner:** `<person or role>`  
**Created / updated:** `<YYYY-MM-DD>`  
**HLD / plan references:** `<paths and artifact IDs>`  
**Traceability:** `<requirements or decisions covered>`

## 1. Change Overview

<Implementation shape in a few sentences; do not repeat the HLD.>

## 2. File Changes

### `<path/to/file>`

**Action:** `<Modify | Create | Remove | Move>`

<Specific responsibility, symbol/component, behaviour after change, and useful interactions. Do not provide a diff.>

### `<path/to/another-file>`

**Action:** `<Modify | Create | Remove | Move>`

<Required change. Add one subsection for every significant file.>

## 3. Cross-File Dependencies

1. `<file>` establishes `<capability/interface>`.
2. `<dependent file>` consumes or extends it.
3. `<integrating file>` exposes the resulting behaviour.

<Omit only when no meaningful sequencing or interaction exists.>

## 4. File Change Summary

| File | Action | Purpose |
| --- | --- | --- |
| `<path>` | `<Modify | Create | Remove | Move>` | `<short description>` |

### Completion contract

The LLD is substantively complete only when every significant file has an action and responsibility, dependencies are explicit where needed, the summary agrees with the detailed entries, and the artifact is approved against the HLD and plan.
