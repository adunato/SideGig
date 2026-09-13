#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const ROOT = process.cwd();
const CHANNELS_DIR = path.join(ROOT, 'research', 'channels');
const VALIDATION_REPORT = path.join(ROOT, 'validation-report.txt');
const HTML_REPORT = path.join(ROOT, 'research-validation-report.html');
const JSON_REPORT = path.join(ROOT, 'research-validation-report.json');
const parser = unified().use(remarkParse).use(remarkGfm);

const CAPABILITY_DIMENSIONS = [
  'Technical complexity',
  'Domain expertise',
  'Data / resource access',
  'Operating complexity',
  'Cost intensity',
];

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, '/');
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
    .map(({ node, index }) => ({ depth: node.depth, text: nodeText(node).trim(), index, node }));
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

function directChildHeadingRecords(ast, parent, depth = parent?.depth + 1) {
  if (!parent) return [];
  return headingRecords(ast).filter((candidate) => {
    if (candidate.depth !== depth || candidate.index <= parent.index) return false;
    for (let i = parent.index + 1; i < candidate.index; i += 1) {
      const node = ast.children[i];
      if (node.type === 'heading' && node.depth <= parent.depth) return false;
    }
    return true;
  });
}

function findNestedHeading(ast, parent, depth, text) {
  if (!parent) return null;
  const match = sectionNodes(ast, parent).find(
    (node) => node.type === 'heading' && node.depth === depth && nodeText(node).trim() === text,
  );
  if (!match) return null;
  return { node: match, depth, text, index: ast.children.indexOf(match) };
}

function firstTableInSection(ast, heading) {
  return sectionNodes(ast, heading).find((node) => node.type === 'table') ?? null;
}

function tableRows(table) {
  if (!table || table.type !== 'table') return [];
  return table.children.map((row) => row.children.map((cell) => nodeText(cell).trim()));
}

function firstColumn(table) {
  return tableRows(table).slice(1).map((row) => row[0]).filter(Boolean);
}

function hasPlaceholder(text) {
  return /<[^>\n]+>/.test(text);
}

function sectionText(ast, heading) {
  return sectionNodes(ast, heading).map(nodeText).join('\n').trim();
}

function sectionSubstantive(ast, heading) {
  const text = sectionText(ast, heading);
  return Boolean(text) && !hasPlaceholder(text);
}

function tablePopulated(table) {
  const rows = tableRows(table);
  return rows.length > 1 && rows.slice(1).every((row) => row.length > 1 && row.slice(1).every((cell) => cell.trim() !== '' && !hasPlaceholder(cell)));
}

function documentType(file) {
  const r = rel(file);
  if (/^research\/channels\/[^/]+\/overview\.md$/.test(r)) return 'overview';
  if (/^research\/channels\/[^/]+\/capability\.md$/.test(r)) return 'capability';
  if (/^research\/channels\/[^/]+\/case-studies\/[^/]+\.md$/.test(r)) return 'case-study';
  return null;
}

function parseValidatorOutput() {
  if (!fs.existsSync(VALIDATION_REPORT)) throw new Error('validation-report.txt was not found. Run the validator first.');
  const lines = fs.readFileSync(VALIDATION_REPORT, 'utf8').split(/\r?\n/);
  const documents = new Map();
  let current = null;
  let summary = { VALID: 0, INCOMPLETE: 0, INVALID: 0 };

  for (const line of lines) {
    const summaryMatch = line.match(/^VALID:\s*(\d+)\s+INCOMPLETE:\s*(\d+)\s+INVALID:\s*(\d+)/);
    if (summaryMatch) {
      summary = { VALID: Number(summaryMatch[1]), INCOMPLETE: Number(summaryMatch[2]), INVALID: Number(summaryMatch[3]) };
      continue;
    }
    const docMatch = line.match(/^(INVALID|INCOMPLETE)\s{2}(.+)$/);
    if (docMatch) {
      current = { status: docMatch[1], file: docMatch[2], errors: [], incomplete: [] };
      documents.set(current.file, current);
      continue;
    }
    if (!current) continue;
    const error = line.match(/^\s+ERROR:\s*(.+)$/);
    if (error) current.errors.push(error[1]);
    const incomplete = line.match(/^\s+INCOMPLETE:\s*(.+)$/);
    if (incomplete) current.incomplete.push(incomplete[1]);
  }

  return { summary, documents };
}

function statusFor(file, validator) {
  const r = rel(file);
  return validator.documents.get(r)?.status ?? 'VALID';
}

function issuesFor(file, validator) {
  const r = rel(file);
  return validator.documents.get(r) ?? { status: 'VALID', file: r, errors: [], incomplete: [] };
}

function decisionFromSection(ast, heading) {
  const text = sectionText(ast, heading);
  const match = text.match(/Decision\s*:\s*([^\n]+)/i);
  if (!match || hasPlaceholder(match[1])) return null;
  return match[1].trim();
}

function overviewProgress(file, structuralStatus) {
  const { ast } = parseMarkdown(file);
  const title = headingRecords(ast).find((h) => h.depth === 1)?.text ?? path.basename(path.dirname(file));
  if (structuralStatus === 'INVALID') {
    return { title, measurable: false, reason: 'Structure does not conform to the current channel template.' };
  }

  const assessment = firstHeading(ast, 2, '2. Channel Assessment');
  const community = firstHeading(ast, 2, '3. Channel Community Findings');
  const gateway1 = firstHeading(ast, 2, 'Gateway 1 — Channel Selection');
  const landscape = firstHeading(ast, 2, '4. Opportunity Landscape');
  const discovery = findNestedHeading(ast, landscape, 3, '4.1 Discovery basis');
  const taxonomy = findNestedHeading(ast, landscape, 3, '4.2 Opportunity-area taxonomy');
  const taxonomyTable = firstTableInSection(ast, taxonomy);
  const opportunityAreas = firstColumn(taxonomyTable).filter((x) => !hasPlaceholder(x));
  const areaAssessment = firstHeading(ast, 2, '5. Opportunity-Area Assessment');
  const byArea = findNestedHeading(ast, areaAssessment, 3, '5.2 Assessment by opportunity area');
  const areaRecords = directChildHeadingRecords(ast, byArea, 4).filter((h) => !hasPlaceholder(h.text));

  let assessedAreas = 0;
  let communityAreas = 0;
  for (const area of areaRecords) {
    const text = sectionText(ast, area);
    if (/Assessment\s*:/i.test(text) && !hasPlaceholder(text.split(/Community Findings/i)[0] ?? text)) assessedAreas += 1;
    const communityHeading = findNestedHeading(ast, area, 5, 'Community Findings');
    if (communityHeading && sectionSubstantive(ast, communityHeading)) communityAreas += 1;
  }

  const crossArea = firstHeading(ast, 2, '6. Cross-Area Findings');
  const limitations = firstHeading(ast, 2, '7. Evidence Gaps and Limitations');

  return {
    title,
    measurable: true,
    channelAssessment: Boolean(assessment && tablePopulated(firstTableInSection(ast, assessment))),
    channelCommunity: Boolean(community && sectionSubstantive(ast, community)),
    gateway1: decisionFromSection(ast, gateway1),
    opportunityLandscape: Boolean(discovery && sectionSubstantive(ast, discovery) && opportunityAreas.length > 0),
    opportunityAreas,
    assessedAreas,
    communityAreas,
    crossArea: Boolean(crossArea && sectionSubstantive(ast, crossArea)),
    limitations: Boolean(limitations && sectionSubstantive(ast, limitations)),
  };
}

function capabilityProgress(file, structuralStatus) {
  if (!file || !fs.existsSync(file)) return { exists: false, measurable: false };
  const { ast } = parseMarkdown(file);
  if (structuralStatus === 'INVALID') return { exists: true, measurable: false };

  const baseline = firstHeading(ast, 2, '1. Channel-Level Capability Prerequisites');
  const gateway = firstHeading(ast, 2, 'Gateway 2 — Opportunity-Area Selection');
  const gatewayAreas = directChildHeadingRecords(ast, gateway, 3).filter((h) => !hasPlaceholder(h.text));
  const gatewayDecisions = gatewayAreas
    .map((h) => ({ area: h.text, decision: decisionFromSection(ast, h) }))
    .filter((x) => x.decision);
  const selectedAreas = gatewayDecisions.filter((x) => /^Pass\b/i.test(x.decision));

  const synthesis = firstHeading(ast, 2, '2. Opportunity-Area Capability Requirements');
  const synthesisAreas = directChildHeadingRecords(ast, synthesis, 3).filter((h) => !hasPlaceholder(h.text));
  let completeSyntheses = 0;
  for (const area of synthesisAreas) {
    const h4 = directChildHeadingRecords(ast, area, 4).map((h) => h.text);
    const hasDimensions = CAPABILITY_DIMENSIONS.every((dimension) => h4.includes(dimension));
    if (hasDimensions && tablePopulated(firstTableInSection(ast, area)) && !hasPlaceholder(sectionText(ast, area))) completeSyntheses += 1;
  }

  return {
    exists: true,
    measurable: true,
    channelCapability: Boolean(baseline && tablePopulated(firstTableInSection(ast, baseline))),
    gatewayDecisions,
    selectedAreas,
    synthesisAreas: synthesisAreas.map((h) => h.text),
    completeSyntheses,
  };
}

function buildChannels(validator) {
  const allMarkdown = walk(CHANNELS_DIR).filter((file) => file.endsWith('.md'));
  const overviewFiles = allMarkdown.filter((file) => documentType(file) === 'overview').sort();

  return overviewFiles.map((overviewFile) => {
    const dir = path.dirname(overviewFile);
    const capabilityFile = path.join(dir, 'capability.md');
    const caseDir = path.join(dir, 'case-studies');
    const caseFiles = fs.existsSync(caseDir)
      ? walk(caseDir).filter((file) => documentType(file) === 'case-study').sort()
      : [];

    const overviewStatus = statusFor(overviewFile, validator);
    const capabilityStatus = fs.existsSync(capabilityFile) ? statusFor(capabilityFile, validator) : 'MISSING';
    const cases = caseFiles.map((file) => ({
      file: rel(file),
      name: headingRecords(parseMarkdown(file).ast).find((h) => h.depth === 1)?.text ?? path.basename(file),
      status: statusFor(file, validator),
      issues: issuesFor(file, validator),
    }));

    const overview = overviewProgress(overviewFile, overviewStatus);
    const capability = capabilityProgress(capabilityFile, capabilityStatus);

    return {
      slug: path.basename(dir),
      name: overview.title,
      overviewFile: rel(overviewFile),
      overviewStatus,
      overviewIssues: issuesFor(overviewFile, validator),
      capabilityFile: fs.existsSync(capabilityFile) ? rel(capabilityFile) : null,
      capabilityStatus,
      capabilityIssues: fs.existsSync(capabilityFile) ? issuesFor(capabilityFile, validator) : null,
      cases,
      progress: { overview, capability },
    };
  });
}

function overallProgress(channels) {
  const measurable = channels.filter((c) => c.progress.overview.measurable);
  const totals = {
    channels: channels.length,
    measurableChannels: measurable.length,
    channelAssessments: 0,
    channelCommunity: 0,
    gateway1: 0,
    opportunityAreas: 0,
    areaAssessments: 0,
    areaCommunity: 0,
    channelCapabilities: 0,
    gateway2Decisions: 0,
    selectedAreas: 0,
    caseStudies: 0,
    validCaseStudies: 0,
    areaSyntheses: 0,
  };

  for (const channel of channels) {
    const o = channel.progress.overview;
    const c = channel.progress.capability;
    if (o.measurable) {
      if (o.channelAssessment) totals.channelAssessments += 1;
      if (o.channelCommunity) totals.channelCommunity += 1;
      if (o.gateway1) totals.gateway1 += 1;
      totals.opportunityAreas += o.opportunityAreas.length;
      totals.areaAssessments += o.assessedAreas;
      totals.areaCommunity += o.communityAreas;
    }
    if (c.measurable) {
      if (c.channelCapability) totals.channelCapabilities += 1;
      totals.gateway2Decisions += c.gatewayDecisions.length;
      totals.selectedAreas += c.selectedAreas.length;
      totals.areaSyntheses += c.completeSyntheses;
    }
    totals.caseStudies += channel.cases.length;
    totals.validCaseStudies += channel.cases.filter((x) => x.status === 'VALID').length;
  }
  return totals;
}

function structureBreakdown(channels) {
  const breakdown = {
    overview: { VALID: 0, INCOMPLETE: 0, INVALID: 0, MISSING: 0 },
    capability: { VALID: 0, INCOMPLETE: 0, INVALID: 0, MISSING: 0 },
    'case-study': { VALID: 0, INCOMPLETE: 0, INVALID: 0, MISSING: 0 },
  };
  for (const channel of channels) {
    breakdown.overview[channel.overviewStatus] += 1;
    breakdown.capability[channel.capabilityStatus] += 1;
    for (const c of channel.cases) breakdown['case-study'][c.status] += 1;
  }
  return breakdown;
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function badge(status) {
  const label = status === 'MISSING' ? 'Not present' : status[0] + status.slice(1).toLowerCase();
  return `<span class="badge ${status.toLowerCase()}">${esc(label)}</span>`;
}

function boolMark(value) {
  return value ? '<span class="done">Complete</span>' : '<span class="todo">Not complete</span>';
}

function progressHtml(channel) {
  const o = channel.progress.overview;
  const c = channel.progress.capability;
  if (!o.measurable) return '<p class="muted">Progress is not derived because the overview does not conform to the current canonical structure.</p>';

  const areas = o.opportunityAreas.length;
  const rows = [
    ['Channel assessment', boolMark(o.channelAssessment)],
    ['Channel community research', boolMark(o.channelCommunity)],
    ['Gateway 1', o.gateway1 ? `<span class="done">${esc(o.gateway1)}</span>` : '<span class="todo">Not complete</span>'],
    ['Opportunity landscape', boolMark(o.opportunityLandscape)],
    ['Opportunity-area assessments', `<strong>${o.assessedAreas}/${areas}</strong>`],
    ['Opportunity-area community research', `<strong>${o.communityAreas}/${areas}</strong>`],
    ['Channel capability prerequisites', c.exists && c.measurable ? boolMark(c.channelCapability) : '<span class="todo">Not complete / not measurable</span>'],
    ['Gateway 2 decisions', c.measurable ? `<strong>${c.gatewayDecisions.length}</strong>` : '<span class="todo">Not measurable</span>'],
    ['Representative case studies', `<strong>${channel.cases.length}</strong> present; <strong>${channel.cases.filter((x) => x.status === 'VALID').length}</strong> structurally valid`],
    ['Opportunity-area syntheses', c.measurable ? `<strong>${c.completeSyntheses}/${Math.max(c.selectedAreas.length, c.completeSyntheses)}</strong>` : '<span class="todo">Not measurable</span>'],
  ];
  return `<table class="progress-table"><tbody>${rows.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</tbody></table>`;
}

function issueList(issue) {
  if (!issue || (!issue.errors.length && !issue.incomplete.length)) return '<span class="muted">None</span>';
  return `<ul>${[
    ...issue.errors.map((x) => `<li>${esc(x)}</li>`),
    ...issue.incomplete.map((x) => `<li>${esc(x)}</li>`),
  ].join('')}</ul>`;
}

function channelRows(channels) {
  return channels.map((channel) => {
    const caseSummary = channel.cases.length
      ? `${channel.cases.length} present / ${channel.cases.filter((x) => x.status === 'VALID').length} valid`
      : 'None';
    const search = esc(`${channel.name} ${channel.slug} ${channel.overviewStatus} ${channel.capabilityStatus}`.toLowerCase());
    return `<tr class="channel-row" data-search="${search}" data-status="${channel.overviewStatus}">
      <td><strong>${esc(channel.name)}</strong><div class="path">${esc(channel.slug)}</div></td>
      <td>${badge(channel.overviewStatus)}</td>
      <td>${badge(channel.capabilityStatus)}</td>
      <td>${esc(caseSummary)}</td>
      <td>${channel.progress.overview.measurable ? `${channel.progress.overview.communityAreas}/${channel.progress.overview.opportunityAreas.length} area community` : '<span class="muted">Legacy / not measurable</span>'}</td>
      <td><details><summary>View</summary><div class="detail">
        <h4>Progress</h4>${progressHtml(channel)}
        <h4>Overview structural issues</h4>${issueList(channel.overviewIssues)}
        ${channel.capabilityIssues ? `<h4>Capability structural issues</h4>${issueList(channel.capabilityIssues)}` : ''}
        ${channel.cases.length ? `<h4>Case studies</h4>${channel.cases.map((c) => `<div class="case"><div><strong>${esc(c.name)}</strong> ${badge(c.status)}</div><div class="path">${esc(c.file)}</div>${issueList(c.issues)}</div>`).join('')}` : ''}
      </div></details></td>
    </tr>`;
  }).join('');
}

function invalidDocumentDetails(channels) {
  const docs = [];
  for (const channel of channels) {
    if (channel.overviewStatus !== 'VALID') docs.push(channel.overviewIssues);
    if (channel.capabilityIssues && channel.capabilityStatus !== 'VALID') docs.push(channel.capabilityIssues);
    for (const c of channel.cases) if (c.status !== 'VALID') docs.push(c.issues);
  }
  return docs.map((doc) => `<details class="issue-doc"><summary>${badge(doc.status)} <code>${esc(doc.file)}</code></summary>${issueList(doc)}</details>`).join('');
}

function buildHtml(model) {
  const { validator, channels, progress, structure } = model;
  const totalDocs = validator.summary.VALID + validator.summary.INCOMPLETE + validator.summary.INVALID;
  const generated = new Date().toISOString();

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SideGig Research Validation Report</title>
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172033;background:#f6f8fb}*{box-sizing:border-box}body{margin:0}.wrap{max-width:1500px;margin:auto;padding:28px}h1{margin:0 0 6px;font-size:30px}h2{margin-top:34px}.muted,.path{color:#697386}.path{font-size:12px;margin-top:4px}.note{background:#fff8df;border:1px solid #ead99d;border-radius:10px;padding:12px 14px;margin:18px 0}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:20px 0}.card{background:white;border:1px solid #dfe4ec;border-radius:12px;padding:16px}.card .n{font-size:28px;font-weight:750}.card .label{font-size:13px;color:#697386;margin-top:4px}.panel{background:white;border:1px solid #dfe4ec;border-radius:12px;padding:18px;margin:14px 0;overflow:auto}table{border-collapse:collapse;width:100%}th,td{padding:10px 12px;border-bottom:1px solid #e7ebf0;text-align:left;vertical-align:top}thead th{background:#f7f9fc;position:sticky;top:0}.badge{display:inline-block;padding:3px 8px;border-radius:999px;font-size:12px;font-weight:700}.valid{background:#def7e5;color:#166534}.incomplete{background:#fff1c2;color:#854d0e}.invalid{background:#fee2e2;color:#991b1b}.missing{background:#eceff3;color:#596273}.done{color:#166534;font-weight:650}.todo{color:#9a3412;font-weight:650}.progress-table th{width:44%;font-weight:600;background:#fafbfd}.controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}input,select{padding:9px 10px;border:1px solid #cfd6e0;border-radius:8px;background:white}input{min-width:260px;flex:1}summary{cursor:pointer}.detail{min-width:520px;padding:12px 0 4px}.detail h4{margin:16px 0 7px}.case{padding:10px 0;border-top:1px solid #edf0f4}.issue-doc{padding:8px 0;border-bottom:1px solid #edf0f4}.issue-doc ul,.detail ul{margin:8px 0 12px;padding-left:22px}code{font-size:12px}.small{font-size:12px}.structure-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}.structure-grid table td,.structure-grid table th{padding:7px 9px}@media(max-width:700px){.wrap{padding:16px}.panel{padding:12px}th,td{padding:8px}.detail{min-width:0}h1{font-size:24px}}
</style>
</head>
<body><main class="wrap">
<h1>SideGig Research Validation & Progress</h1>
<div class="muted">Generated ${esc(generated)} from the canonical Markdown documents and validator output.</div>
<div class="note"><strong>Interpretation rule:</strong> structural validity and research progress are separate. Progress is only derived where the current canonical structure is recognised. Legacy/invalid documents are not silently treated as “not started”.</div>

<h2>Overall</h2>
<div class="cards">
  <div class="card"><div class="n">${totalDocs}</div><div class="label">Documents validated</div></div>
  <div class="card"><div class="n">${validator.summary.VALID}</div><div class="label">Structurally valid</div></div>
  <div class="card"><div class="n">${validator.summary.INCOMPLETE}</div><div class="label">Valid but incomplete</div></div>
  <div class="card"><div class="n">${validator.summary.INVALID}</div><div class="label">Structurally invalid</div></div>
  <div class="card"><div class="n">${progress.channels}</div><div class="label">Channels</div></div>
  <div class="card"><div class="n">${progress.measurableChannels}</div><div class="label">Channels measurable on current template</div></div>
</div>

<h2>Current-methodology progress</h2>
<div class="panel"><table><tbody>
<tr><th>Channel assessments complete</th><td><strong>${progress.channelAssessments}</strong></td></tr>
<tr><th>Channel community research complete</th><td><strong>${progress.channelCommunity}</strong></td></tr>
<tr><th>Gateway 1 decisions recorded</th><td><strong>${progress.gateway1}</strong></td></tr>
<tr><th>Opportunity areas discovered</th><td><strong>${progress.opportunityAreas}</strong></td></tr>
<tr><th>Opportunity-area assessments complete</th><td><strong>${progress.areaAssessments}/${progress.opportunityAreas}</strong></td></tr>
<tr><th>Opportunity-area community research complete</th><td><strong>${progress.areaCommunity}/${progress.opportunityAreas}</strong></td></tr>
<tr><th>Channel capability baselines complete</th><td><strong>${progress.channelCapabilities}</strong></td></tr>
<tr><th>Gateway 2 decisions recorded</th><td><strong>${progress.gateway2Decisions}</strong></td></tr>
<tr><th>Opportunity areas selected for Phase 3</th><td><strong>${progress.selectedAreas}</strong></td></tr>
<tr><th>Representative case studies present</th><td><strong>${progress.caseStudies}</strong> (${progress.validCaseStudies} structurally valid)</td></tr>
<tr><th>Opportunity-area syntheses complete</th><td><strong>${progress.areaSyntheses}</strong></td></tr>
</tbody></table></div>

<h2>Structure by document type</h2>
<div class="structure-grid">
${Object.entries(structure).map(([type, counts]) => `<div class="panel"><strong>${esc(type)}</strong><table><tbody><tr><th>Valid</th><td>${counts.VALID}</td></tr><tr><th>Incomplete</th><td>${counts.INCOMPLETE}</td></tr><tr><th>Invalid</th><td>${counts.INVALID}</td></tr><tr><th>Not present</th><td>${counts.MISSING}</td></tr></tbody></table></div>`).join('')}
</div>

<h2>Channel progress & structure</h2>
<div class="panel">
<div class="controls"><input id="search" type="search" placeholder="Filter channels…"><select id="status"><option value="">All overview statuses</option><option>VALID</option><option>INCOMPLETE</option><option>INVALID</option></select></div>
<table><thead><tr><th>Channel</th><th>Overview</th><th>Capability</th><th>Case studies</th><th>Progress snapshot</th><th>Details</th></tr></thead><tbody id="channels">${channelRows(channels)}</tbody></table>
</div>

<h2>All structural issues</h2>
<div class="panel">${invalidDocumentDetails(channels)}</div>

<div class="muted small">Source files: <code>validation-report.txt</code> plus the current Markdown AST. This HTML is generated output, not a source of truth.</div>
</main>
<script>
const search=document.getElementById('search');const status=document.getElementById('status');function apply(){const q=search.value.trim().toLowerCase();const s=status.value;for(const row of document.querySelectorAll('.channel-row')){const okQ=!q||row.dataset.search.includes(q);const okS=!s||row.dataset.status===s;row.style.display=okQ&&okS?'':'none'}}search.addEventListener('input',apply);status.addEventListener('change',apply);
</script>
</body></html>`;
}

function main() {
  const validator = parseValidatorOutput();
  const channels = buildChannels(validator);
  const progress = overallProgress(channels);
  const structure = structureBreakdown(channels);
  const model = {
    generatedAt: new Date().toISOString(),
    validator: { summary: validator.summary },
    progress,
    structure,
    channels,
  };
  fs.writeFileSync(JSON_REPORT, `${JSON.stringify(model, null, 2)}\n`);
  fs.writeFileSync(HTML_REPORT, buildHtml(model));
  console.log(`Generated ${rel(HTML_REPORT)}`);
  console.log(`Generated ${rel(JSON_REPORT)}`);
}

main();
