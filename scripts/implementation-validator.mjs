#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const ROOT = process.cwd();
const IMPLEMENTATION = path.join(ROOT, 'implementation');
const TEMPLATE_DIR = path.join(IMPLEMENTATION, 'templates');

const TEMPLATE_PATHS = {
  prerequisites: path.join(TEMPLATE_DIR, 'prerequisites-template.md'),
  prerequisitesValidation: path.join(TEMPLATE_DIR, 'prerequisites-validation-template.md'),
  poc: path.join(TEMPLATE_DIR, 'poc-template.md'),
};

const REQUIRED_CANONICAL_FILES = [
  path.join(IMPLEMENTATION, 'methodology.md'),
  ...Object.values(TEMPLATE_PATHS),
];

const PREREQUISITE_STATUSES = new Set(['Ready', 'Action required', 'Blocked', 'Not applicable']);
const VALIDATION_STATUSES = new Set(['Pass', 'Fail', 'Not applicable']);
const AREA_SELECTION_DECISIONS = new Set(['Selected', 'Not selected']);
const SHORTLIST_DECISIONS = new Set(['Shortlisted', 'Excluded']);
const FINAL_SELECTION_DECISIONS = new Set(['Selected', 'Deferred']);
const GATEWAY_DECISIONS = new Set(['Pass', 'Fail']);
const COMMITMENT_STATUSES = new Set(['Ready', 'Action before observation', 'Blocked', 'Not applicable']);
const CONFIDENCE_VALUES = new Set(['High', 'Medium', 'Low']);

const MARKET_DIMENSIONS = new Set([
  'Paying demand',
  'Opportunity density',
  'New-entrant attainability',
  'Revenue potential',
  'Competitive pressure',
]);

const CAPABILITY_DIMENSIONS = new Set([
  'Technical complexity',
  'Domain expertise',
  'Data / resource access',
  'Operating complexity',
  'Cost intensity',
]);

const parser = unified().use(remarkParse).use(remarkGfm);

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, '/');
}

function nodeText(node) {
  if (!node) return '';
  if (typeof node.value === 'string') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(nodeText).join('');
}

function parseMarkdown(file) {
  const raw = fs.readFileSync(file, 'utf8');
  return { raw, ast: parser.parse(raw) };
}

function headingRecords(ast) {
  return ast.children
    .map((node, index) => ({ node, index }))
    .filter(({ node }) => node.type === 'heading')
    .map(({ node, index }) => ({ depth: node.depth, text: nodeText(node).trim(), index }));
}

function headingsAtDepth(ast, depth) {
  return headingRecords(ast).filter((heading) => heading.depth === depth).map((heading) => heading.text);
}

function firstHeading(ast, depth, text) {
  return headingRecords(ast).find((heading) => heading.depth === depth && heading.text === text) ?? null;
}

function sectionNodes(ast, heading) {
  if (!heading) return [];
  const nodes = [];
  for (let index = heading.index + 1; index < ast.children.length; index += 1) {
    const node = ast.children[index];
    if (node.type === 'heading' && node.depth <= heading.depth) break;
    nodes.push(node);
  }
  return nodes;
}

function tableRows(table) {
  if (!table || table.type !== 'table') return [];
  return table.children.map((row) => row.children.map((cell) => nodeText(cell).trim()));
}

function firstTableInSection(ast, heading) {
  return sectionNodes(ast, heading).find((node) => node.type === 'table') ?? null;
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function formatList(values) {
  return values.length ? values.join(' | ') : '(none)';
}

function placeholderCount(raw) {
  return (raw.match(/<[^>\n]+>/g) ?? []).length;
}

function isPlaceholder(value) {
  return typeof value === 'string' && /<[^>]+>/.test(value);
}

function fieldValue(raw, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'mi'));
  return match ? match[1].trim() : null;
}

function metadataValue(raw, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'mi'));
  return match ? match[1].trim() : null;
}

function baseResult(file, type) {
  return { file: rel(file), type, errors: [], incomplete: [], data: {} };
}

function compareTemplateHeadings(result, ast, template, depth, label) {
  const actual = headingsAtDepth(ast, depth);
  const expected = headingsAtDepth(template.ast, depth);
  if (!arraysEqual(actual, expected)) {
    result.errors.push(`${label} heading structure differs from template. Expected: ${formatList(expected)}. Found: ${formatList(actual)}.`);
  }
}

function validateMetadata(result, raw, labels) {
  for (const label of labels) {
    if (!metadataValue(raw, label)) result.errors.push(`Missing metadata field: ${label}.`);
  }
}

function validateRequiredFields(result, raw, labels) {
  const values = {};
  for (const label of labels) {
    const value = fieldValue(raw, label);
    values[label] = value;
    if (!value) result.errors.push(`Missing field: ${label}.`);
  }
  return values;
}

function validateTableShape(result, table, expectedHeaders, label) {
  if (!table) {
    result.errors.push(`Missing ${label} table.`);
    return [];
  }
  const rows = tableRows(table);
  const headers = rows[0] ?? [];
  if (!arraysEqual(headers, expectedHeaders)) {
    result.errors.push(`${label} table headers differ from canonical structure. Expected: ${formatList(expectedHeaders)}. Found: ${formatList(headers)}.`);
  }
  return rows.slice(1);
}

function validateStatusTable(result, table, expectedHeaders, statusColumn, allowedStatuses, label) {
  const bodyRows = validateTableShape(result, table, expectedHeaders, label);
  for (const row of bodyRows) {
    const status = row[statusColumn]?.trim();
    if (!status) {
      result.errors.push(`${label} contains a row without a status.`);
      continue;
    }
    if (!isPlaceholder(status) && !allowedStatuses.has(status)) {
      result.errors.push(`${label} contains invalid status "${status}".`);
    }
  }
  return bodyRows;
}

function validateScoreRows(result, rows, dimensionSet, label) {
  for (const row of rows) {
    const dimension = row[1]?.trim();
    const score = row[2]?.trim();
    const confidence = row[3]?.trim();

    if (dimension && !isPlaceholder(dimension) && !dimensionSet.has(dimension)) {
      result.errors.push(`${label} contains unknown dimension "${dimension}".`);
    }
    if (score && !isPlaceholder(score) && !/^[1-5]$/.test(score)) {
      result.errors.push(`${label} contains score "${score}" outside 1-5.`);
    }
    if (confidence && !isPlaceholder(confidence) && !CONFIDENCE_VALUES.has(confidence)) {
      result.errors.push(`${label} contains invalid confidence "${confidence}".`);
    }
  }
}

function validateCompleteField(result, value, label) {
  if (value && !isPlaceholder(value) && !['Yes', 'No'].includes(value)) {
    result.errors.push(`${label} must be Yes or No.`);
  }
}

function requireCompletedStep(result, complete, blockers, label) {
  if (complete === 'Yes' && blockers && !isPlaceholder(blockers) && blockers.toLowerCase() !== 'none') {
    result.errors.push(`${label} is complete but blockers are not None.`);
  }
}

function addIncompletePlaceholders(result, raw) {
  const count = placeholderCount(raw);
  if (count > 0) result.incomplete.push(`${count} template placeholder${count === 1 ? '' : 's'} remain.`);
}

function validatePrerequisites(file, doc, template) {
  const result = baseResult(file, 'prerequisites');
  compareTemplateHeadings(result, doc.ast, template, 2, 'H2');
  validateMetadata(result, doc.raw, ['Channel', 'Capability source', 'Assessment date']);

  const section = firstHeading(doc.ast, 2, '2. Prerequisites Required for Validation Test');
  const rows = validateStatusTable(
    result,
    firstTableInSection(doc.ast, section),
    ['Area', 'Prerequisite', 'Why required', 'Status', 'Evidence / current state', 'Action required'],
    3,
    PREREQUISITE_STATUSES,
    'Prerequisites',
  );

  const fields = validateRequiredFields(result, doc.raw, ['Ready for Step 2', 'Open blockers']);
  const ready = fields['Ready for Step 2'];
  const blockers = fields['Open blockers'];
  validateCompleteField(result, ready, 'Ready for Step 2');

  if (ready === 'Yes') {
    const blockingStatuses = rows
      .map((row) => row[3]?.trim())
      .filter((status) => status && !isPlaceholder(status) && !['Ready', 'Not applicable'].includes(status));
    if (blockingStatuses.length) result.errors.push(`Ready for Step 2 is Yes but blocking prerequisite statuses remain: ${formatList(blockingStatuses)}.`);
    if (blockers && !isPlaceholder(blockers) && blockers.toLowerCase() !== 'none') result.errors.push('Ready for Step 2 is Yes but Open blockers is not None.');
  }

  result.data = { readyForStep2: ready };
  addIncompletePlaceholders(result, doc.raw);
  return result;
}

function validatePrerequisitesValidation(file, doc, template) {
  const result = baseResult(file, 'prerequisites-validation');
  compareTemplateHeadings(result, doc.ast, template, 2, 'H2');
  validateMetadata(result, doc.raw, ['Channel', 'Prerequisites', 'Test date']);

  const section = firstHeading(doc.ast, 2, '2. Validation Results');
  const rows = validateStatusTable(
    result,
    firstTableInSection(doc.ast, section),
    ['Test item', 'What was tested', 'Status', 'Evidence / result', 'Issue / follow-up'],
    2,
    VALIDATION_STATUSES,
    'Validation results',
  );

  const fields = validateRequiredFields(result, doc.raw, ['Test implementation', 'Step 2 complete', 'Open blockers', 'Decision']);
  const complete = fields['Step 2 complete'];
  const blockers = fields['Open blockers'];
  const decision = fields.Decision;

  validateCompleteField(result, complete, 'Step 2 complete');
  if (decision && !isPlaceholder(decision) && !GATEWAY_DECISIONS.has(decision)) result.errors.push('Gateway 1 Decision must be Pass or Fail.');

  const failed = rows.some((row) => row[2]?.trim() === 'Fail');
  if (complete === 'Yes' && failed) result.errors.push('Step 2 complete is Yes but at least one validation result is Fail.');
  if (complete === 'Yes' && blockers && !isPlaceholder(blockers) && blockers.toLowerCase() !== 'none') result.errors.push('Step 2 complete is Yes but Open blockers is not None.');
  if (complete === 'Yes' && decision !== 'Pass') result.errors.push('Step 2 complete is Yes but Gateway 1 Decision is not Pass.');
  if (decision === 'Pass' && complete !== 'Yes') result.errors.push('Gateway 1 Decision is Pass but Step 2 complete is not Yes.');
  if (decision === 'Pass' && failed) result.errors.push('Gateway 1 Decision is Pass but at least one validation result is Fail.');

  result.data = { step2Complete: complete, gatewayDecision: decision };
  addIncompletePlaceholders(result, doc.raw);
  return result;
}

function validatePoc(file, doc, template) {
  const result = baseResult(file, 'poc');
  compareTemplateHeadings(result, doc.ast, template, 2, 'H2');
  compareTemplateHeadings(result, doc.ast, template, 3, 'H3');
  validateMetadata(result, doc.raw, ['Channel', 'Prerequisite validation', 'Research methodology', 'Phase 2 start date', 'Phase 3 definition date']);

  const researchMethodology = metadataValue(doc.raw, 'Research methodology');
  if (researchMethodology && !isPlaceholder(researchMethodology) && !/research\/methodology\.md/i.test(researchMethodology)) {
    result.errors.push('Research methodology metadata must link to research/methodology.md.');
  }

  const researchFields = validateRequiredFields(result, doc.raw, ['Channel research', 'Capability research', 'Case-study / deep-dive evidence']);

  const areaMarketHeading = firstHeading(doc.ast, 3, 'Eligible Opportunity Areas — Market Attractiveness');
  const areaMarketRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, areaMarketHeading),
    ['Opportunity area', 'Paying demand', 'Opportunity density', 'New-entrant attainability', 'Revenue potential', 'Competitive pressure', 'Overall market result / confidence', 'POC market implication'],
    'Opportunity-area market-attractiveness',
  );

  const areaCapabilityHeading = firstHeading(doc.ast, 3, 'Eligible Opportunity Areas — Capability Requirements');
  const areaCapabilityRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, areaCapabilityHeading),
    ['Opportunity area', 'Technical complexity', 'Domain expertise', 'Data / resource access', 'Operating complexity', 'Cost intensity', 'Capability score / confidence', 'POC capability implication'],
    'Opportunity-area capability',
  );

  const step3 = validateRequiredFields(result, doc.raw, ['Selected opportunity area', 'Step 3 rationale', 'Step 3 complete', 'Step 3 blockers']);
  validateCompleteField(result, step3['Step 3 complete'], 'Step 3 complete');
  requireCompletedStep(result, step3['Step 3 complete'], step3['Step 3 blockers'], 'Step 3');
  if (step3['Step 3 complete'] === 'Yes') {
    if (areaMarketRows.length === 0 || areaCapabilityRows.length === 0) result.errors.push('Step 3 is complete but eligible opportunity-area comparison evidence is missing.');
    if (!step3['Selected opportunity area'] || isPlaceholder(step3['Selected opportunity area'])) result.errors.push('Step 3 is complete but no opportunity area is selected.');
    for (const [label, value] of Object.entries(researchFields)) {
      if (!value || isPlaceholder(value)) result.errors.push(`Step 3 is complete but ${label} is not substantively recorded.`);
    }
  }

  const candidateHeading = firstHeading(doc.ast, 3, 'Candidate Landscape');
  const candidateRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, candidateHeading),
    ['Candidate opportunity', 'Buyer problem / use case', 'Target buyer', 'Commercial outcome / value', 'Demand / usage evidence', 'Alternatives / competition', 'Differentiation / unresolved need', 'Data / source / delivery model', 'Capability / cost implications', 'Evidence links'],
    'Specific POC opportunity research',
  );

  const step4 = validateRequiredFields(result, doc.raw, ['Step 4 complete', 'Step 4 blockers']);
  validateCompleteField(result, step4['Step 4 complete'], 'Step 4 complete');
  requireCompletedStep(result, step4['Step 4 complete'], step4['Step 4 blockers'], 'Step 4');
  if (step4['Step 4 complete'] === 'Yes') {
    if (step3['Step 3 complete'] !== 'Yes') result.errors.push('Step 4 is complete but Step 3 is not complete.');
    const substantiveCandidates = candidateRows.filter((row) => row[0] && !isPlaceholder(row[0]));
    if (substantiveCandidates.length < 2) result.errors.push('Step 4 is complete but fewer than two concrete candidate opportunities are recorded.');
  }

  const marketAssessmentHeading = firstHeading(doc.ast, 3, 'Market Attractiveness Assessment');
  const marketRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, marketAssessmentHeading),
    ['Candidate opportunity', 'Dimension', 'Score (1-5)', 'Confidence', 'Evidence / rationale'],
    'Specific-opportunity market-attractiveness assessment',
  );
  validateScoreRows(result, marketRows, MARKET_DIMENSIONS, 'Specific-opportunity market-attractiveness assessment');

  const capabilityAssessmentHeading = firstHeading(doc.ast, 3, 'Capability Assessment');
  const capabilityRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, capabilityAssessmentHeading),
    ['Candidate opportunity', 'Dimension', 'Score (1-5)', 'Confidence', 'Evidence / rationale'],
    'Specific-opportunity capability assessment',
  );
  validateScoreRows(result, capabilityRows, CAPABILITY_DIMENSIONS, 'Specific-opportunity capability assessment');

  const shortlistHeading = firstHeading(doc.ast, 3, 'Shortlist');
  const shortlistRows = validateStatusTable(
    result,
    firstTableInSection(doc.ast, shortlistHeading),
    ['Candidate opportunity', 'Market evidence potential', 'POC capability suitability', 'Decision', 'Rationale'],
    3,
    SHORTLIST_DECISIONS,
    'POC shortlist',
  );

  const step5 = validateRequiredFields(result, doc.raw, ['Step 5 complete', 'Step 5 blockers']);
  validateCompleteField(result, step5['Step 5 complete'], 'Step 5 complete');
  requireCompletedStep(result, step5['Step 5 complete'], step5['Step 5 blockers'], 'Step 5');
  if (step5['Step 5 complete'] === 'Yes') {
    if (step4['Step 4 complete'] !== 'Yes') result.errors.push('Step 5 is complete but Step 4 is not complete.');
    const shortlisted = shortlistRows.filter((row) => row[3]?.trim() === 'Shortlisted');
    if (shortlisted.length === 0) result.errors.push('Step 5 is complete but no opportunity is Shortlisted.');

    const candidateNames = new Set(candidateRows.map((row) => row[0]?.trim()).filter((value) => value && !isPlaceholder(value)));
    for (const candidate of candidateNames) {
      const marketDimensions = new Set(marketRows.filter((row) => row[0]?.trim() === candidate).map((row) => row[1]?.trim()).filter((value) => MARKET_DIMENSIONS.has(value)));
      const capabilityDimensions = new Set(capabilityRows.filter((row) => row[0]?.trim() === candidate).map((row) => row[1]?.trim()).filter((value) => CAPABILITY_DIMENSIONS.has(value)));
      if (marketDimensions.size !== MARKET_DIMENSIONS.size) result.errors.push(`Step 5 is complete but ${candidate} does not have all five market-attractiveness dimensions.`);
      if (capabilityDimensions.size !== CAPABILITY_DIMENSIONS.size) result.errors.push(`Step 5 is complete but ${candidate} does not have all five capability dimensions.`);
    }
  }

  const comparisonHeading = firstHeading(doc.ast, 3, 'Shortlist Comparison');
  const comparisonRows = validateStatusTable(
    result,
    firstTableInSection(doc.ast, comparisonHeading),
    ['Candidate opportunity', 'Market-attractiveness summary', 'Capability-requirements summary', 'Expected POC evidence', 'POC complexity / cost', 'Decision'],
    5,
    FINAL_SELECTION_DECISIONS,
    'Final POC opportunity comparison',
  );

  const selectionFields = validateRequiredFields(result, doc.raw, [
    'Selected opportunity',
    'Buyer problem',
    'Target user',
    'Core value proposition',
    'Market assumptions to test',
    'Capability assumptions to test',
    'Selection rationale',
    'Selection date',
    'Step 6 complete',
    'Step 6 blockers',
  ]);

  const step6Complete = selectionFields['Step 6 complete'];
  validateCompleteField(result, step6Complete, 'Step 6 complete');
  requireCompletedStep(result, step6Complete, selectionFields['Step 6 blockers'], 'Step 6');
  const selectedCount = comparisonRows.filter((row) => row[5]?.trim() === 'Selected').length;
  if (selectedCount > 1) result.errors.push('More than one Step 6 candidate is marked Selected.');
  if (step6Complete === 'Yes') {
    if (step5['Step 5 complete'] !== 'Yes') result.errors.push('Step 6 is complete but Step 5 is not complete.');
    if (selectedCount !== 1) result.errors.push('Step 6 is complete but exactly one candidate is not marked Selected.');
    for (const [label, value] of Object.entries(selectionFields)) {
      if (['Step 6 complete', 'Step 6 blockers'].includes(label)) continue;
      if (!value || isPlaceholder(value)) result.errors.push(`Step 6 is complete but ${label} is not substantively recorded.`);
    }
  }

  const gatewayFields = validateRequiredFields(result, doc.raw, ['Decision', 'Rationale']);
  const gatewayDecision = gatewayFields.Decision;
  if (gatewayDecision && !isPlaceholder(gatewayDecision) && !GATEWAY_DECISIONS.has(gatewayDecision)) {
    result.errors.push('Gateway 2 Decision must be Pass or Fail.');
  }
  if (gatewayDecision === 'Pass') {
    if (step3['Step 3 complete'] !== 'Yes' || step4['Step 4 complete'] !== 'Yes' || step5['Step 5 complete'] !== 'Yes' || step6Complete !== 'Yes') {
      result.errors.push('Gateway 2 is Pass but Steps 3-6 are not all complete.');
    }
    if (selectedCount !== 1) result.errors.push('Gateway 2 is Pass but exactly one Step 6 candidate is not Selected.');
  }

  const scopeHeading = firstHeading(doc.ast, 3, 'Functional Scope');
  const scopeRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, scopeHeading),
    ['Scope item', 'Status', 'Definition / rationale'],
    'POC functional scope',
  );
  const validScopeStatuses = new Set(['In scope', 'Out of scope']);
  for (const row of scopeRows) {
    const value = row[1]?.trim();
    if (value && !isPlaceholder(value) && !validScopeStatuses.has(value)) {
      result.errors.push(`POC functional scope has invalid status "${value}".`);
    }
  }

  const inputsHeading = firstHeading(doc.ast, 3, 'Inputs');
  const inputRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, inputsHeading),
    ['Input', 'Required', 'Type / allowed values', 'Default / bound', 'Purpose'],
    'POC inputs',
  );

  const outputsHeading = firstHeading(doc.ast, 3, 'Outputs');
  const outputRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, outputsHeading),
    ['Output', 'Required', 'Definition'],
    'POC outputs',
  );

  const dependencyHeading = firstHeading(doc.ast, 3, 'Dependencies and Constraints');
  const dependencyRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, dependencyHeading),
    ['Dependency / constraint', 'POC implication', 'Boundary / response'],
    'POC dependencies and constraints',
  );

  const criteriaHeading = firstHeading(doc.ast, 3, 'Success and Exit Criteria');
  const criteriaRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, criteriaHeading),
    ['Dimension', 'Criterion', 'Threshold / decision rule'],
    'POC success and exit criteria',
  );

  const step7 = validateRequiredFields(result, doc.raw, [
    'POC objective',
    'Primary POC user',
    'Experiment mode',
    'Observation window',
    'POC commercial parameter',
    'POC success rule',
    'Bounded iteration rule',
    'Exit / stop rule',
    'Step 7 complete',
    'Step 7 blockers',
  ]);
  validateCompleteField(result, step7['Step 7 complete'], 'Step 7 complete');
  requireCompletedStep(result, step7['Step 7 complete'], step7['Step 7 blockers'], 'Step 7');

  if (step7['Step 7 complete'] === 'Yes') {
    if (gatewayDecision !== 'Pass') result.errors.push('Step 7 is complete but Gateway 2 is not Pass.');
    if (selectedCount !== 1) result.errors.push('Step 7 is complete but exactly one Step 6 candidate is not Selected.');
    if (scopeRows.length < 2) result.errors.push('Step 7 is complete but the functional scope is not substantively defined.');
    if (!scopeRows.some((row) => row[1]?.trim() === 'In scope')) result.errors.push('Step 7 is complete but no functional scope item is In scope.');
    if (!scopeRows.some((row) => row[1]?.trim() === 'Out of scope')) result.errors.push('Step 7 is complete but no functional scope item is Out of scope.');
    if (inputRows.length === 0) result.errors.push('Step 7 is complete but no POC inputs are defined.');
    if (outputRows.length === 0) result.errors.push('Step 7 is complete but no POC outputs are defined.');
    if (dependencyRows.length === 0) result.errors.push('Step 7 is complete but no dependencies or constraints are defined.');
    const marketCriteria = criteriaRows.filter((row) => row[0]?.trim() === 'Market');
    const capabilityCriteria = criteriaRows.filter((row) => row[0]?.trim() === 'Capability');
    if (marketCriteria.length === 0) result.errors.push('Step 7 is complete but no market success criterion is defined.');
    if (capabilityCriteria.length === 0) result.errors.push('Step 7 is complete but no capability success criterion is defined.');
    for (const [label, value] of Object.entries(step7)) {
      if (['Step 7 complete', 'Step 7 blockers'].includes(label)) continue;
      if (!value || isPlaceholder(value)) result.errors.push(`Step 7 is complete but ${label} is not substantively recorded.`);
    }
  }

  const operationalHeading = firstHeading(doc.ast, 3, 'Operational Requirements');
  const operationalRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, operationalHeading),
    ['Operational concern', 'Signal / evidence', 'Mechanism', 'Trigger / review rule', 'Required response'],
    'POC operational requirements',
  );

  const cadenceHeading = firstHeading(doc.ast, 3, 'Operating Cadence and Evidence');
  const cadenceRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, cadenceHeading),
    ['Activity', 'Cadence / trigger', 'Evidence retained'],
    'POC operating cadence and evidence',
  );

  const step8 = validateRequiredFields(result, doc.raw, [
    'Operational evidence basis',
    'Bounded operational intervention',
    'Experiment-change rule',
    'Pause rule',
    'Step 8 complete',
    'Step 8 blockers',
  ]);
  validateCompleteField(result, step8['Step 8 complete'], 'Step 8 complete');
  requireCompletedStep(result, step8['Step 8 complete'], step8['Step 8 blockers'], 'Step 8');

  if (step8['Step 8 complete'] === 'Yes') {
    if (step7['Step 7 complete'] !== 'Yes') result.errors.push('Step 8 is complete but Step 7 is not complete.');
    if (operationalRows.length === 0) result.errors.push('Step 8 is complete but no operational requirements are recorded.');
    if (cadenceRows.length === 0) result.errors.push('Step 8 is complete but no operating cadence/evidence activities are recorded.');
    const operationalText = operationalRows.flat().join(' ').toLowerCase();
    const requiredOperationalThemes = [
      ['run health', /(run|reliability|failure|status)/],
      ['result quality', /(quality|completeness|schema|field)/],
      ['dependency behaviour', /(dependency|source|upstream|google)/],
      ['cost / economics', /(cost|economics|profit|revenue|usage)/],
      ['market evidence', /(market|user|demand|monetised|repeat)/],
    ];
    for (const [label, pattern] of requiredOperationalThemes) {
      if (!pattern.test(operationalText)) result.errors.push(`Step 8 is complete but operational coverage for ${label} is not apparent.`);
    }
    for (const [label, value] of Object.entries(step8)) {
      if (['Step 8 complete', 'Step 8 blockers'].includes(label)) continue;
      if (!value || isPlaceholder(value)) result.errors.push(`Step 8 is complete but ${label} is not substantively recorded.`);
    }
  }

  const commitmentHeading = firstHeading(doc.ast, 3, 'Commitment Assessment');
  const commitmentRows = validateStatusTable(
    result,
    firstTableInSection(doc.ast, commitmentHeading),
    ['Commitment dimension', 'Evidence / assessment', 'Status', 'Required action / condition'],
    2,
    COMMITMENT_STATUSES,
    'Gateway 3 commitment assessment',
  );

  const preObservationHeading = firstHeading(doc.ast, 3, 'Pre-Observation Requirements');
  const preObservationRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, preObservationHeading),
    ['Requirement', 'Why required', 'Required by', 'Status', 'Action'],
    'Gateway 3 pre-observation requirements',
  );
  for (const row of preObservationRows) {
    const value = row[3]?.trim();
    if (value && !isPlaceholder(value) && !COMMITMENT_STATUSES.has(value)) {
      result.errors.push(`Gateway 3 pre-observation requirement has invalid status "${value}".`);
    }
  }

  const gateway3 = validateRequiredFields(result, doc.raw, [
    'Gateway 3 decision',
    'Gateway 3 commitment',
    'Gateway 3 rationale',
    'Authorized next step',
  ]);
  const gateway3Decision = gateway3['Gateway 3 decision'];
  if (gateway3Decision && !isPlaceholder(gateway3Decision) && !GATEWAY_DECISIONS.has(gateway3Decision)) {
    result.errors.push('Gateway 3 decision must be Pass or Fail.');
  }

  const blockedCommitments = commitmentRows.filter((row) => row[2]?.trim() === 'Blocked');
  if (gateway3Decision === 'Pass') {
    if (step7['Step 7 complete'] !== 'Yes' || step8['Step 8 complete'] !== 'Yes') {
      result.errors.push('Gateway 3 is Pass but Steps 7 and 8 are not both complete.');
    }
    if (blockedCommitments.length) result.errors.push('Gateway 3 is Pass but at least one commitment-assessment item is Blocked.');
    if (commitmentRows.length < 6) result.errors.push('Gateway 3 is Pass but all six commitment dimensions are not recorded.');
    if (!/^Commit to POC implementation$/i.test(gateway3['Gateway 3 commitment'] ?? '')) {
      result.errors.push('Gateway 3 is Pass but Gateway 3 commitment is not "Commit to POC implementation".');
    }
    if (!/Step 9/i.test(gateway3['Authorized next step'] ?? '')) {
      result.errors.push('Gateway 3 is Pass but the authorized next step is not Step 9.');
    }
    for (const [label, value] of Object.entries(gateway3)) {
      if (!value || isPlaceholder(value)) result.errors.push(`Gateway 3 is Pass but ${label} is not substantively recorded.`);
    }
  }

  const implementationEvidenceHeading = firstHeading(doc.ast, 3, 'Implementation and Validation Evidence');
  const implementationEvidenceRows = validateTableShape(
    result,
    firstTableInSection(doc.ast, implementationEvidenceHeading),
    ['Implementation area', 'Requirement source', 'Evidence / reference', 'Status'],
    'Step 9 implementation and validation evidence',
  );
  for (const row of implementationEvidenceRows) {
    const status = row[3]?.trim();
    if (status && !isPlaceholder(status) && !VALIDATION_STATUSES.has(status)) {
      result.errors.push(`Step 9 implementation evidence has invalid status "${status}".`);
    }
  }

  const step9 = validateRequiredFields(result, doc.raw, [
    'Product repository',
    'Development/design evidence',
    'Deployed implementation reference',
    'Pre-observation requirements closed',
    'Observation baseline captured',
    'Step 9 complete',
    'Step 9 blockers',
  ]);
  validateCompleteField(result, step9['Pre-observation requirements closed'], 'Pre-observation requirements closed');
  validateCompleteField(result, step9['Observation baseline captured'], 'Observation baseline captured');
  validateCompleteField(result, step9['Step 9 complete'], 'Step 9 complete');
  requireCompletedStep(result, step9['Step 9 complete'], step9['Step 9 blockers'], 'Step 9');

  if (step9['Step 9 complete'] === 'Yes') {
    if (gateway3Decision !== 'Pass') result.errors.push('Step 9 is complete but Gateway 3 is not Pass.');
    if (implementationEvidenceRows.length === 0) result.errors.push('Step 9 is complete but no implementation/validation evidence is recorded.');
    const failedEvidence = implementationEvidenceRows.filter((row) => row[3]?.trim() === 'Fail');
    if (failedEvidence.length) result.errors.push('Step 9 is complete but failed implementation/validation evidence remains.');
    if (step9['Pre-observation requirements closed'] !== 'Yes') result.errors.push('Step 9 is complete but pre-observation requirements are not closed.');
    if (step9['Observation baseline captured'] !== 'Yes') result.errors.push('Step 9 is complete but the observation baseline has not been captured.');
    const outstandingPreObservation = preObservationRows.filter((row) => {
      const status = row[3]?.trim();
      return status === 'Action before observation' || status === 'Blocked';
    });
    if (outstandingPreObservation.length) result.errors.push('Step 9 is complete but Gateway 3 pre-observation actions remain open.');
    for (const [label, value] of Object.entries(step9)) {
      if (['Step 9 complete', 'Step 9 blockers'].includes(label)) continue;
      if (!value || isPlaceholder(value)) result.errors.push(`Step 9 is complete but ${label} is not substantively recorded.`);
    }
  }

  result.data = {
    step3Complete: step3['Step 3 complete'],
    step4Complete: step4['Step 4 complete'],
    step5Complete: step5['Step 5 complete'],
    step6Complete,
    gateway2Decision: gatewayDecision,
    selectedCount,
    step7Complete: step7['Step 7 complete'],
    step8Complete: step8['Step 8 complete'],
    gateway3Decision,
    step9Complete: step9['Step 9 complete'],
  };

  addIncompletePlaceholders(result, doc.raw);
  return result;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function classify(file) {
  const relative = rel(file);
  if (/^implementation\/[^/]+\/prerequisites\.md$/.test(relative)) return 'prerequisites';
  if (/^implementation\/[^/]+\/prerequisites-validation\.md$/.test(relative)) return 'prerequisites-validation';
  if (/^implementation\/[^/]+\/poc\.md$/.test(relative)) return 'poc';
  return null;
}

function validateCrossDocument(results) {
  const byFile = new Map(results.map((result) => [result.file, result]));

  for (const result of results.filter((item) => item.type === 'prerequisites-validation')) {
    const prerequisiteFile = `${path.posix.dirname(result.file)}/prerequisites.md`;
    const prerequisite = byFile.get(prerequisiteFile);
    if (!prerequisite) {
      result.errors.push('Prerequisites validation artifact has no sibling prerequisites.md artifact.');
      continue;
    }
    if (result.data.gatewayDecision === 'Pass' && prerequisite.data.readyForStep2 !== 'Yes') {
      result.errors.push('Gateway 1 is Pass but the sibling prerequisites artifact does not record Ready for Step 2: Yes.');
    }
  }

  for (const result of results.filter((item) => item.type === 'poc')) {
    const validationFile = `${path.posix.dirname(result.file)}/prerequisites-validation.md`;
    const validation = byFile.get(validationFile);
    if (!validation) {
      result.errors.push('POC artifact has no sibling prerequisites-validation.md artifact.');
      continue;
    }
    const phase2Started = [result.data.step3Complete, result.data.step4Complete, result.data.step5Complete, result.data.step6Complete, result.data.step7Complete, result.data.step8Complete].includes('Yes') || result.data.gateway2Decision === 'Pass' || result.data.gateway3Decision === 'Pass';
    if (phase2Started && validation.data.gatewayDecision !== 'Pass') {
      result.errors.push('Phase 2 records completed work but Gateway 1 in the sibling prerequisites-validation artifact is not Pass.');
    }
  }
}

function status(result) {
  if (result.errors.length) return 'INVALID';
  if (result.incomplete.length) return 'INCOMPLETE';
  return 'VALID';
}

function printConsole(results, canonicalErrors) {
  const counts = { VALID: 0, INCOMPLETE: 0, INVALID: 0 };
  for (const result of results) counts[status(result)] += 1;

  console.log('\nImplementation document validation');
  console.log('==================================');
  console.log(`VALID: ${counts.VALID}  INCOMPLETE: ${counts.INCOMPLETE}  INVALID: ${counts.INVALID}`);

  if (canonicalErrors.length) {
    console.log('\nCanonical repository errors:');
    for (const error of canonicalErrors) console.log(`  - ${error}`);
  }

  for (const result of results.filter((item) => status(item) !== 'VALID')) {
    console.log(`\n${status(result)}  ${result.file}`);
    for (const error of result.errors) console.log(`  ERROR: ${error}`);
    for (const item of result.incomplete) console.log(`  INCOMPLETE: ${item}`);
  }
  return counts;
}

function markdownSummary(results, canonicalErrors, counts) {
  const lines = [
    '# Implementation document validation',
    '',
    '| Valid | Incomplete | Invalid |',
    '|---:|---:|---:|',
    `| ${counts.VALID} | ${counts.INCOMPLETE} | ${counts.INVALID} |`,
    '',
    '> **Invalid** means structural/template or internal-consistency failure and fails CI. **Incomplete** means the artifact is structurally valid but still contains explicit template placeholders.',
  ];

  if (canonicalErrors.length) {
    lines.push('', '## Canonical repository errors');
    for (const error of canonicalErrors) lines.push(`- ${error}`);
  }

  for (const result of results.filter((item) => status(item) !== 'VALID')) {
    lines.push('', `## ${status(result)} — \`${result.file}\``);
    for (const error of result.errors) lines.push(`- ${error}`);
    for (const item of result.incomplete) lines.push(`- ${item}`);
  }
  return `${lines.join('\n')}\n`;
}

function parseArgs(argv) {
  const args = { paths: [] };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--path' && argv[index + 1]) {
      args.paths.push(argv[index + 1]);
      index += 1;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const canonicalErrors = REQUIRED_CANONICAL_FILES
    .filter((file) => !fs.existsSync(file))
    .map((file) => `Missing required canonical file: ${rel(file)}`);

  if (canonicalErrors.length) {
    for (const error of canonicalErrors) console.error(error);
    process.exitCode = 1;
    return;
  }

  const templates = {
    prerequisites: parseMarkdown(TEMPLATE_PATHS.prerequisites),
    prerequisitesValidation: parseMarkdown(TEMPLATE_PATHS.prerequisitesValidation),
    poc: parseMarkdown(TEMPLATE_PATHS.poc),
  };

  let files = walk(IMPLEMENTATION).filter((file) => file.endsWith('.md') && classify(file));
  if (args.paths.length) {
    const requested = new Set(args.paths.map((item) => rel(path.resolve(ROOT, item))));
    files = files.filter((file) => requested.has(rel(file)));
  }

  const results = files.map((file) => {
    const type = classify(file);
    const doc = parseMarkdown(file);
    if (type === 'prerequisites') return validatePrerequisites(file, doc, templates.prerequisites);
    if (type === 'prerequisites-validation') return validatePrerequisitesValidation(file, doc, templates.prerequisitesValidation);
    return validatePoc(file, doc, templates.poc);
  });

  validateCrossDocument(results);
  const counts = printConsole(results, canonicalErrors);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdownSummary(results, canonicalErrors, counts));
  }

  if (canonicalErrors.length || counts.INVALID > 0) process.exitCode = 1;
}

main();