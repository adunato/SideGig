#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const ROOT = process.cwd();
const RESEARCH = path.join(ROOT, 'research');
const TEMPLATE_DIR = path.join(RESEARCH, 'templates');
const CHANNELS_DIR = path.join(RESEARCH, 'channels');

const TEMPLATE_PATHS = {
  channel: path.join(TEMPLATE_DIR, 'channel-template.md'),
  capability: path.join(TEMPLATE_DIR, 'capability-template.md'),
  caseStudy: path.join(TEMPLATE_DIR, 'case-study-template.md'),
};

const REQUIRED_CANONICAL_FILES = [
  path.join(RESEARCH, 'methodology.md'),
  path.join(RESEARCH, 'channel-assessment-framework.md'),
  path.join(RESEARCH, 'channel-classes.md'),
  path.join(RESEARCH, 'channels.md'),
  ...Object.values(TEMPLATE_PATHS),
];

const CHANNEL_METRICS = [
  'Paying demand',
  'Opportunity density',
  'New-entrant attainability',
  'Revenue potential',
  'Competitive pressure',
  'Production leverage',
  'Operating burden',
];

const CAPABILITY_DIMENSIONS = [
  'Technical complexity',
  'Domain expertise',
  'Data / resource access',
  'Operating complexity',
  'Cost intensity',
];

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
    .map(({ node, index }) => ({
      depth: node.depth,
      text: nodeText(node).trim(),
      index,
      node,
    }));
}

function headingsAtDepth(ast, depth) {
  return headingRecords(ast).filter((h) => h.depth === depth).map((h) => h.text);
}

function firstHeading(ast, depth, text) {
  return headingRecords(ast).find((h) => h.depth === depth && h.text === text) ?? null;
}

function sectionNodes(ast, heading) {
  if (!heading) return [];
  const nodes = [];
  for (let i = heading.index + 1; i < ast.children.length; i += 1) {
    const node = ast.children[i];
    if (node.type === 'heading' && node.depth <= heading.depth) break;
    nodes.push(node);
  }
  return nodes;
}

function directChildHeadings(ast, parentHeading, childDepth = parentHeading.depth + 1) {
  return sectionNodes(ast, parentHeading)
    .filter((node) => node.type === 'heading' && node.depth === childDepth)
    .map((node) => nodeText(node).trim());
}

function directChildHeadingRecords(ast, parentHeading, childDepth = parentHeading.depth + 1) {
  if (!parentHeading) return [];
  const records = headingRecords(ast);
  return records.filter((candidate) => {
    if (candidate.depth !== childDepth || candidate.index <= parentHeading.index) return false;
    for (let i = parentHeading.index + 1; i < candidate.index; i += 1) {
      const node = ast.children[i];
      if (node.type === 'heading' && node.depth <= parentHeading.depth) return false;
    }
    return true;
  });
}

function isPlaceholderHeading(text) {
  return /<[^>]+>/.test(text);
}

function fixedDirectChildren(ast, parentHeading, childDepth = parentHeading.depth + 1) {
  return directChildHeadings(ast, parentHeading, childDepth).filter((text) => !isPlaceholderHeading(text));
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function formatList(values) {
  return values.length ? values.join(' | ') : '(none)';
}

function tableRows(table) {
  if (!table || table.type !== 'table') return [];
  return table.children.map((row) => row.children.map((cell) => nodeText(cell).trim()));
}

function firstTableInSection(ast, heading) {
  return sectionNodes(ast, heading).find((node) => node.type === 'table') ?? null;
}

function findNestedHeading(ast, parent, depth, text) {
  if (!parent) return null;
  const nodes = sectionNodes(ast, parent);
  const match = nodes.find((node) => node.type === 'heading' && node.depth === depth && nodeText(node).trim() === text);
  if (!match) return null;
  const index = ast.children.indexOf(match);
  return { node: match, depth, text, index };
}

function firstColumn(table) {
  const rows = tableRows(table);
  return rows.slice(1).map((row) => row[0]).filter(Boolean);
}

function validateTableRows(result, table, expectedRows, label) {
  if (!table) {
    result.errors.push(`Missing ${label} table.`);
    return;
  }
  const rows = firstColumn(table);
  if (!arraysEqual(rows, expectedRows)) {
    result.errors.push(`${label} rows do not match the canonical set. Expected: ${formatList(expectedRows)}. Found: ${formatList(rows)}.`);
  }
}

function placeholderCount(raw) {
  return (raw.match(/<[^>\n]+>/g) ?? []).length;
}

function addIncompletePlaceholders(result, raw) {
  const count = placeholderCount(raw);
  if (count > 0) result.incomplete.push(`${count} template placeholder${count === 1 ? '' : 's'} remain.`);
}

function compareExactHeadings(result, actual, expected, label) {
  if (!arraysEqual(actual, expected)) {
    result.errors.push(`${label} heading structure differs from template. Expected: ${formatList(expected)}. Found: ${formatList(actual)}.`);
  }
}

function validateChannel(file, doc, templates) {
  const result = baseResult(file, 'channel');
  const { ast, raw } = doc;
  const template = templates.channel.ast;

  compareExactHeadings(result, headingsAtDepth(ast, 2), headingsAtDepth(template, 2), 'H2');

  for (const parentText of ['2. Channel Assessment', '4. Opportunity Landscape', '5. Opportunity-Area Assessment']) {
    const actualParent = firstHeading(ast, 2, parentText);
    const templateParent = firstHeading(template, 2, parentText);
    if (!actualParent) continue;
    compareExactHeadings(
      result,
      directChildHeadings(ast, actualParent, 3),
      fixedDirectChildren(template, templateParent, 3),
      `${parentText} H3`,
    );
  }

  const assessment = firstHeading(ast, 2, '2. Channel Assessment');
  validateTableRows(result, firstTableInSection(ast, assessment), CHANNEL_METRICS, 'Channel assessment');

  const landscape = firstHeading(ast, 2, '4. Opportunity Landscape');
  const taxonomy = findNestedHeading(ast, landscape, 3, '4.2 Opportunity-area taxonomy');
  const taxonomyTable = firstTableInSection(ast, taxonomy);
  if (!taxonomyTable) result.errors.push('Missing opportunity-area taxonomy table.');
  const taxonomyAreas = taxonomyTable ? firstColumn(taxonomyTable).filter((x) => !isPlaceholderHeading(x)) : [];

  const areaAssessment = firstHeading(ast, 2, '5. Opportunity-Area Assessment');
  const comparison = findNestedHeading(ast, areaAssessment, 3, '5.1 Comparison');
  const comparisonTable = firstTableInSection(ast, comparison);
  if (!comparisonTable) result.errors.push('Missing opportunity-area comparison table.');
  const comparisonAreas = comparisonTable ? firstColumn(comparisonTable).filter((x) => !isPlaceholderHeading(x)) : [];

  const byArea = findNestedHeading(ast, areaAssessment, 3, '5.2 Assessment by opportunity area');
  const areaRecords = directChildHeadingRecords(ast, byArea, 4).filter((h) => !isPlaceholderHeading(h.text));
  const detailedAreas = areaRecords.map((h) => h.text);

  if (taxonomyAreas.length && !arraysEqual(taxonomyAreas, comparisonAreas)) {
    result.errors.push(`Opportunity areas in taxonomy and comparison differ. Taxonomy: ${formatList(taxonomyAreas)}. Comparison: ${formatList(comparisonAreas)}.`);
  }
  if (taxonomyAreas.length && !arraysEqual(taxonomyAreas, detailedAreas)) {
    result.errors.push(`Opportunity areas in taxonomy and detailed assessment differ. Taxonomy: ${formatList(taxonomyAreas)}. Detailed: ${formatList(detailedAreas)}.`);
  }

  for (const area of areaRecords) {
    const h5s = directChildHeadings(ast, area, 5);
    if (!arraysEqual(h5s, ['Community Findings'])) {
      result.errors.push(`Opportunity area "${area.text}" must contain exactly one H5 "Community Findings" subsection.`);
    }
  }

  const sources = firstHeading(ast, 2, '8. Sources');
  if (sources && directChildHeadings(ast, sources, 3).length === 0) result.incomplete.push('Sources section has no H3 source groups yet.');

  const gateway = firstHeading(ast, 2, 'Gateway 1 — Channel Selection');
  if (gateway) {
    const text = sectionNodes(ast, gateway).map(nodeText).join('\n');
    if (!/Decision\s*:/i.test(text)) result.errors.push('Gateway 1 section does not contain a Decision field.');
  }

  addIncompletePlaceholders(result, raw);
  result.data = { opportunityAreas: taxonomyAreas };
  return result;
}

function validateCapability(file, doc, templates) {
  const result = baseResult(file, 'capability');
  const { ast, raw } = doc;
  const template = templates.capability.ast;

  compareExactHeadings(result, headingsAtDepth(ast, 2), headingsAtDepth(template, 2), 'H2');

  const channelBaseline = firstHeading(ast, 2, '1. Channel-Level Capability Prerequisites');
  validateTableRows(result, firstTableInSection(ast, channelBaseline), CAPABILITY_DIMENSIONS, 'Channel capability');

  const gateway = firstHeading(ast, 2, 'Gateway 2 — Opportunity-Area Selection');
  const gatewayAreas = directChildHeadingRecords(ast, gateway, 3).filter((h) => !isPlaceholderHeading(h.text));
  for (const area of gatewayAreas) {
    const text = sectionNodes(ast, area).map(nodeText).join('\n');
    if (!/Decision\s*:/i.test(text)) result.errors.push(`Gateway 2 area "${area.text}" does not contain a Decision field.`);
  }

  const capabilitySection = firstHeading(ast, 2, '2. Opportunity-Area Capability Requirements');
  const areaRecords = directChildHeadingRecords(ast, capabilitySection, 3).filter((h) => !isPlaceholderHeading(h.text));
  const templateArea = directChildHeadingRecords(template, firstHeading(template, 2, '2. Opportunity-Area Capability Requirements'), 3)
    .find((h) => isPlaceholderHeading(h.text));
  const expectedAreaH4 = templateArea ? fixedDirectChildren(template, templateArea, 4) : CAPABILITY_DIMENSIONS;

  for (const area of areaRecords) {
    validateTableRows(result, firstTableInSection(ast, area), CAPABILITY_DIMENSIONS, `Capability assessment for "${area.text}"`);
    compareExactHeadings(result, directChildHeadings(ast, area, 4), expectedAreaH4, `Capability subsections for "${area.text}"`);

    const links = sectionNodes(ast, area)
      .flatMap(collectLinks)
      .map((link) => link.url)
      .filter((url) => /^case-studies\/.*\.md$/.test(url));
    if (links.length === 0) result.incomplete.push(`Opportunity area "${area.text}" has no representative case-study links.`);
    for (const link of links) {
      const target = path.resolve(path.dirname(file), link);
      if (!fs.existsSync(target)) result.errors.push(`Broken representative case-study link in "${area.text}": ${link}`);
    }
  }

  const sources = firstHeading(ast, 2, 'Sources');
  if (sources && directChildHeadings(ast, sources, 3).length === 0) result.incomplete.push('Sources section has no H3 source groups yet.');

  addIncompletePlaceholders(result, raw);
  result.data = {
    gatewayAreas: gatewayAreas.map((h) => h.text),
    capabilityAreas: areaRecords.map((h) => h.text),
  };
  return result;
}

function validateCaseStudy(file, doc, templates) {
  const result = baseResult(file, 'case-study');
  const { ast, raw } = doc;
  const template = templates.caseStudy.ast;

  compareExactHeadings(result, headingsAtDepth(ast, 2), headingsAtDepth(template, 2), 'H2');

  for (const parent of headingRecords(ast).filter((h) => h.depth === 2)) {
    const templateParent = firstHeading(template, 2, parent.text);
    if (!templateParent) continue;
    const expectedH3 = fixedDirectChildren(template, templateParent, 3);
    compareExactHeadings(result, directChildHeadings(ast, parent, 3), expectedH3, `${parent.text} H3`);

    for (const h3Text of expectedH3) {
      const actualH3 = findNestedHeading(ast, parent, 3, h3Text);
      const templateH3 = findNestedHeading(template, templateParent, 3, h3Text);
      const expectedH4 = fixedDirectChildren(template, templateH3, 4);
      if (expectedH4.length > 0 && actualH3) {
        compareExactHeadings(result, directChildHeadings(ast, actualH3, 4), expectedH4, `${h3Text} H4`);
      }
    }
  }

  const capability = firstHeading(ast, 2, '3. Capability Assessment');
  validateTableRows(result, firstTableInSection(ast, capability), CAPABILITY_DIMENSIONS, 'Case-study capability');

  addIncompletePlaceholders(result, raw);
  result.data = { opportunityArea: metadataValue(raw, 'Opportunity area') };
  return result;
}

function collectLinks(node) {
  const links = [];
  if (!node || typeof node !== 'object') return links;
  if (node.type === 'link') links.push(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) links.push(...collectLinks(child));
  }
  return links;
}

function metadataValue(raw, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'mi'));
  return match ? match[1].trim() : null;
}

function baseResult(file, type) {
  return { file: rel(file), type, errors: [], incomplete: [], data: {} };
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function classify(file) {
  const r = rel(file);
  if (/^research\/channels\/[^/]+\/overview\.md$/.test(r)) return 'channel';
  if (/^research\/channels\/[^/]+\/capability\.md$/.test(r)) return 'capability';
  if (/^research\/channels\/[^/]+\/case-studies\/[^/]+\.md$/.test(r)) return 'caseStudy';
  return null;
}

function loadTemplates() {
  return Object.fromEntries(
    Object.entries(TEMPLATE_PATHS).map(([key, file]) => {
      if (!fs.existsSync(file)) throw new Error(`Missing canonical template: ${rel(file)}`);
      return [key, parseMarkdown(file)];
    }),
  );
}

function validateCrossDocument(results) {
  const overviewsByDir = new Map();
  for (const result of results.filter((r) => r.type === 'channel')) {
    overviewsByDir.set(path.posix.dirname(result.file), result);
  }

  for (const capability of results.filter((r) => r.type === 'capability')) {
    const dir = path.posix.dirname(capability.file);
    const overview = overviewsByDir.get(dir);
    if (!overview) {
      capability.errors.push('Capability document has no sibling overview.md.');
      continue;
    }
    const known = new Set(overview.data.opportunityAreas ?? []);
    for (const area of capability.data.gatewayAreas ?? []) {
      if (known.size && !known.has(area)) capability.errors.push(`Gateway 2 area "${area}" is not present in overview opportunity taxonomy.`);
    }
    for (const area of capability.data.capabilityAreas ?? []) {
      if (known.size && !known.has(area)) capability.errors.push(`Capability area "${area}" is not present in overview opportunity taxonomy.`);
    }
  }

  for (const caseStudy of results.filter((r) => r.type === 'case-study')) {
    const channelDir = path.posix.dirname(path.posix.dirname(caseStudy.file));
    const overview = overviewsByDir.get(channelDir);
    if (!overview) {
      caseStudy.errors.push('Case study has no channel overview.md.');
      continue;
    }
    const area = caseStudy.data.opportunityArea;
    if (!area) {
      caseStudy.errors.push('Case study is missing the Opportunity area metadata field.');
      continue;
    }
    if (!isPlaceholderHeading(area)) {
      const known = new Set(overview.data.opportunityAreas ?? []);
      if (known.size && !known.has(area)) caseStudy.errors.push(`Case-study opportunity area "${area}" is not present in overview opportunity taxonomy.`);
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

  console.log('\nResearch document validation');
  console.log('============================');
  console.log(`VALID: ${counts.VALID}  INCOMPLETE: ${counts.INCOMPLETE}  INVALID: ${counts.INVALID}`);

  if (canonicalErrors.length) {
    console.log('\nCanonical repository errors:');
    for (const error of canonicalErrors) console.log(`  - ${error}`);
  }

  for (const result of results.filter((r) => status(r) !== 'VALID')) {
    console.log(`\n${status(result)}  ${result.file}`);
    for (const error of result.errors) console.log(`  ERROR: ${error}`);
    for (const item of result.incomplete) console.log(`  INCOMPLETE: ${item}`);
  }

  return counts;
}

function markdownSummary(results, canonicalErrors, counts) {
  const lines = [
    '# Research document validation',
    '',
    '| Valid | Incomplete | Invalid |',
    '|---:|---:|---:|',
    `| ${counts.VALID} | ${counts.INCOMPLETE} | ${counts.INVALID} |`,
    '',
    '> **Invalid** means structural/template failure and fails CI. **Incomplete** means the document is structurally valid but still contains explicit template placeholders.',
  ];

  if (canonicalErrors.length) {
    lines.push('', '## Canonical repository errors');
    for (const error of canonicalErrors) lines.push(`- ${error}`);
  }

  const invalid = results.filter((r) => status(r) === 'INVALID');
  if (invalid.length) {
    lines.push('', '## Invalid documents');
    for (const result of invalid) {
      lines.push(`- \`${result.file}\``);
      for (const error of result.errors) lines.push(`  - ${error}`);
    }
  }

  const incomplete = results.filter((r) => status(r) === 'INCOMPLETE');
  if (incomplete.length) {
    lines.push('', '## Structurally valid but incomplete');
    for (const result of incomplete) lines.push(`- \`${result.file}\` — ${result.incomplete.join(' ')}`);
  }

  return `${lines.join('\n')}\n`;
}

function parseArgs(argv) {
  const args = { paths: [] };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--path' && argv[i + 1]) {
      args.paths.push(argv[i + 1]);
      i += 1;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const canonicalErrors = REQUIRED_CANONICAL_FILES.filter((file) => !fs.existsSync(file)).map((file) => `Missing required canonical file: ${rel(file)}`);
  if (canonicalErrors.length) {
    for (const error of canonicalErrors) console.error(error);
    process.exitCode = 1;
    return;
  }

  const templates = loadTemplates();
  let files = walk(CHANNELS_DIR).filter((file) => file.endsWith('.md') && classify(file));
  if (args.paths.length) {
    const requested = new Set(args.paths.map((p) => rel(path.resolve(ROOT, p))));
    files = files.filter((file) => requested.has(rel(file)));
  }

  const results = files.map((file) => {
    const type = classify(file);
    const doc = parseMarkdown(file);
    if (type === 'channel') return validateChannel(file, doc, templates);
    if (type === 'capability') return validateCapability(file, doc, templates);
    return validateCaseStudy(file, doc, templates);
  });

  validateCrossDocument(results);
  const counts = printConsole(results, canonicalErrors);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdownSummary(results, canonicalErrors, counts));
  }

  if (canonicalErrors.length || counts.INVALID > 0) process.exitCode = 1;
}

main();
