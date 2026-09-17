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
const POC_SELECTION_DECISIONS = new Set(['Selected', 'Deferred', 'Not selected']);

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

function validateTable(result, table, expectedHeaders, statusColumn, allowedStatuses, label) {
  if (!table) {
    result.errors.push(`Missing ${label} table.`);
    return [];
  }

  const rows = tableRows(table);
  const headers = rows[0] ?? [];
  if (!arraysEqual(headers, expectedHeaders)) {
    result.errors.push(`${label} table headers differ from canonical structure. Expected: ${formatList(expectedHeaders)}. Found: ${formatList(headers)}.`);
  }

  const bodyRows = rows.slice(1);
  for (const row of bodyRows) {
    const status = row[statusColumn]?.trim();
    if (!status) {
      result.errors.push(`${label} contains a row without a status.`);
      continue;
    }
    if (!allowedStatuses.has(status)) result.errors.push(`${label} contains invalid status "${status}".`);
  }
  return bodyRows;
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
  const rows = validateTable(
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

  if (ready && !['Yes', 'No'].includes(ready)) result.errors.push('Ready for Step 2 must be Yes or No.');

  if (ready === 'Yes') {
    const blockingStatuses = rows
      .map((row) => row[3]?.trim())
      .filter((status) => status && !['Ready', 'Not applicable'].includes(status));
    if (blockingStatuses.length) result.errors.push(`Ready for Step 2 is Yes but blocking prerequisite statuses remain: ${formatList(blockingStatuses)}.`);
    if (blockers && blockers.toLowerCase() !== 'none') result.errors.push('Ready for Step 2 is Yes but Open blockers is not None.');
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
  const rows = validateTable(
    result,
    firstTableInSection(doc.ast, section),
    ['Test item', 'What was tested', 'Status', 'Evidence / result', 'Issue / follow-up'],
    2,
    VALIDATION_STATUSES,
    'Validation results',
  );

  const fields = validateRequiredFields(result, doc.raw, [
    'Test implementation',
    'Step 2 complete',
    'Open blockers',
    'Decision',
  ]);
  const complete = fields['Step 2 complete'];
  const blockers = fields['Open blockers'];
  const decision = fields.Decision;

  if (complete && !['Yes', 'No'].includes(complete)) result.errors.push('Step 2 complete must be Yes or No.');
  if (decision && !['Pass', 'Fail'].includes(decision)) result.errors.push('Gateway 1 Decision must be Pass or Fail.');

  const failed = rows.some((row) => row[2]?.trim() === 'Fail');
  if (complete === 'Yes' && failed) result.errors.push('Step 2 complete is Yes but at least one validation result is Fail.');
  if (complete === 'Yes' && blockers && blockers.toLowerCase() !== 'none') result.errors.push('Step 2 complete is Yes but Open blockers is not None.');
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
  validateMetadata(result, doc.raw, ['Channel', 'Prerequisite validation', 'Research methodology', 'Selection date']);

  const researchMethodology = metadataValue(doc.raw, 'Research methodology');
  if (researchMethodology && !/research\/methodology\.md/i.test(researchMethodology)) {
    result.errors.push('Research methodology metadata must link to research/methodology.md.');
  }

  const researchFields = validateRequiredFields(result, doc.raw, [
    'Channel research',
    'Capability research',
    'Case-study / deep-dive evidence',
  ]);

  const candidates = firstHeading(doc.ast, 3, 'Candidate Opportunities');
  const rows = validateTable(
    result,
    firstTableInSection(doc.ast, candidates),
    [
      'Candidate opportunity',
      'Research basis',
      'Commercial evidence',
      'Differentiation / unresolved need',
      'POC testability',
      'Implementation considerations',
      'Decision',
    ],
    6,
    POC_SELECTION_DECISIONS,
    'POC opportunity candidates',
  );

  if (rows.length === 0) result.errors.push('POC opportunity candidate table contains no candidates.');

  const fields = validateRequiredFields(result, doc.raw, [
    'Selected opportunity',
    'Research opportunity area',
    'Primary uncertainty to test',
    'Selection rationale',
    'Step 3 complete',
    'Open blockers',
  ]);
  const complete = fields['Step 3 complete'];
  const blockers = fields['Open blockers'];
  const selectedCount = rows.filter((row) => row[6]?.trim() === 'Selected').length;

  if (complete && !['Yes', 'No'].includes(complete)) result.errors.push('Step 3 complete must be Yes or No.');
  if (selectedCount > 1) result.errors.push('More than one POC opportunity candidate is marked Selected.');

  if (complete === 'Yes') {
    if (selectedCount !== 1) result.errors.push('Step 3 complete is Yes but exactly one candidate is not marked Selected.');
    if (blockers && blockers.toLowerCase() !== 'none') result.errors.push('Step 3 complete is Yes but Open blockers is not None.');
    if (!researchMethodology || !/research\/methodology\.md/i.test(researchMethodology)) {
      result.errors.push('Step 3 complete is Yes but the Research methodology handoff is not explicitly linked.');
    }
    for (const [label, value] of Object.entries(researchFields)) {
      if (!value) result.errors.push(`Step 3 complete is Yes but ${label} is not recorded.`);
    }
  }

  result.data = { step3Complete: complete, selectedCount };
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
    if (result.data.step3Complete === 'Yes' && validation.data.gatewayDecision !== 'Pass') {
      result.errors.push('Step 3 is complete but Gateway 1 in the sibling prerequisites-validation artifact is not Pass.');
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