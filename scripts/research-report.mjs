#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const ROOT = process.cwd();
const RESEARCH = path.join(ROOT, 'research');
const CHANNELS_DIR = path.join(RESEARCH, 'channels');
const VALIDATION_REPORT = path.join(ROOT, 'validation-report.txt');
const HTML_REPORT = path.join(ROOT, 'research-validation-report.html');
const JSON_REPORT = path.join(ROOT, 'research-validation-report.json');
const FRAMEWORK_FILE = path.join(RESEARCH, 'channel-assessment-framework.md');
const CLASSES_FILE = path.join(RESEARCH, 'channel-classes.md');
const CHANNEL_INDEX_FILE = path.join(RESEARCH, 'channels.md');
const parser = unified().use(remarkParse).use(remarkGfm);

const CAPABILITY_DIMENSIONS = [
  'Technical complexity',
  'Domain expertise',
  'Data / resource access',
  'Operating complexity',
  'Cost intensity',
];

const METHODOLOGY_STEPS = [
  ['1', 'Define the Channel Assessment Framework'],
  ['2', 'Define Channel Classes'],
  ['3', 'Identify Channel Discovery Sources'],
  ['4', 'Discover Channels'],
  ['5', 'Assess Channels'],
  ['5A', 'Community Research: Channel Scope'],
  ['G1', 'Gateway 1 — Select Channels for Opportunity-Area Analysis'],
  ['6', 'Identify Opportunity-Area Discovery Sources'],
  ['7', 'Discover Opportunity Areas'],
  ['8', 'Assess Opportunity Areas'],
  ['8A', 'Community Research: Opportunity-Area Scope'],
  ['9', 'Define Channel-Level Capability Prerequisites'],
  ['G2', 'Gateway 2 — Select Opportunity Areas for Deep Dive'],
  ['10', 'Select Representative Case Studies'],
  ['11', 'Execute Case Studies'],
  ['12', 'Synthesize Case-Study Findings at Opportunity-Area Level'],
];

const STEP_ORDER = new Map(METHODOLOGY_STEPS.map(([id], index) => [id, index]));

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

function sectionText(ast, heading) {
  return sectionNodes(ast, heading).map(nodeText).join('\n').trim();
}

function sectionSubstantive(ast, heading) {
  const text = sectionText(ast, heading);
  return Boolean(text) && !hasPlaceholder(text);
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

function tablePopulated(table) {
  const rows = tableRows(table);
  return rows.length > 1 && rows.slice(1).every(
    (row) => row.length > 1 && row.slice(1).every((cell) => cell.trim() !== '' && !hasPlaceholder(cell)),
  );
}

function hasPlaceholder(text) {
  return /<[^>\n]+>/.test(text ?? '');
}

function metadataValue(raw, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'mi'));
  return match ? match[1].trim() : null;
}

function collectLinks(node) {
  const links = [];
  if (!node || typeof node !== 'object') return links;
  if (node.type === 'link') links.push(node);
  if (Array.isArray(node.children)) for (const child of node.children) links.push(...collectLinks(child));
  return links;
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

function structuralStatus(file, validator) {
  if (!file || !fs.existsSync(file)) return 'MISSING';
  return validator.documents.get(rel(file))?.status ?? 'VALID';
}

function issuesFor(file, validator) {
  if (!file || !fs.existsSync(file)) return null;
  const r = rel(file);
  return validator.documents.get(r) ?? { status: 'VALID', file: r, errors: [], incomplete: [] };
}

function decisionFromSection(ast, heading) {
  const text = sectionText(ast, heading);
  const match = text.match(/Decision\s*:\s*([^\n]+)/i);
  if (!match || hasPlaceholder(match[1])) return null;
  return match[1].trim();
}

function progressStatus(done, started = false) {
  if (done) return 'COMPLETE';
  return started ? 'IN_PROGRESS' : 'NOT_STARTED';
}

function makeStep(id, status, detail, structure = null) {
  const label = METHODOLOGY_STEPS.find(([stepId]) => stepId === id)?.[1] ?? id;
  return { id, label, status, detail, structure };
}

function buildOverviewFacts(file) {
  const { raw, ast } = parseMarkdown(file);
  const title = headingRecords(ast).find((h) => h.depth === 1)?.text ?? path.basename(path.dirname(file));
  const channelClass = metadataValue(raw, 'Channel class');
  const channelUrl = metadataValue(raw, 'Channel URL') ?? metadataValue(raw, 'URL');

  const assessment = firstHeading(ast, 2, '2. Channel Assessment');
  const community = firstHeading(ast, 2, '3. Channel Community Findings');
  const gateway1Heading = firstHeading(ast, 2, 'Gateway 1 — Channel Selection');
  const landscape = firstHeading(ast, 2, '4. Opportunity Landscape');
  const discovery = findNestedHeading(ast, landscape, 3, '4.1 Discovery basis');
  const taxonomy = findNestedHeading(ast, landscape, 3, '4.2 Opportunity-area taxonomy');
  const taxonomyTable = firstTableInSection(ast, taxonomy);
  const opportunityAreas = firstColumn(taxonomyTable).filter((x) => !hasPlaceholder(x));

  const areaAssessment = firstHeading(ast, 2, '5. Opportunity-Area Assessment');
  const byArea = findNestedHeading(ast, areaAssessment, 3, '5.2 Assessment by opportunity area');
  const areaRecords = directChildHeadingRecords(ast, byArea, 4).filter((h) => !hasPlaceholder(h.text));
  const areaDetails = areaRecords.map((area) => {
    const fullText = sectionText(ast, area);
    const beforeCommunity = fullText.split(/Community Findings/i)[0] ?? fullText;
    const communityHeading = findNestedHeading(ast, area, 5, 'Community Findings');
    const assessmentPresent = /Assessment\s*:/i.test(beforeCommunity) && !hasPlaceholder(beforeCommunity);
    const communityPresent = Boolean(communityHeading && sectionSubstantive(ast, communityHeading));
    return { area: area.text, assessmentPresent, communityPresent, fullyResearched: assessmentPresent && communityPresent };
  });

  return {
    raw,
    ast,
    title,
    channelClass,
    channelUrl,
    channelAssessment: Boolean(assessment && tablePopulated(firstTableInSection(ast, assessment))),
    channelCommunity: Boolean(community && sectionSubstantive(ast, community)),
    gateway1: decisionFromSection(ast, gateway1Heading),
    discoverySources: Boolean(discovery && sectionSubstantive(ast, discovery)),
    taxonomyComplete: Boolean(taxonomyTable && opportunityAreas.length > 0),
    opportunityAreas,
    areaDetails,
    assessmentRecords: areaDetails.filter((x) => x.assessmentPresent).length,
    communityAreas: areaDetails.filter((x) => x.communityPresent).length,
    fullyResearchedAreas: areaDetails.filter((x) => x.fullyResearched).length,
  };
}

function buildCapabilityFacts(file) {
  if (!file || !fs.existsSync(file)) return { exists: false, baseline: false, gatewayDecisions: [], selectedAreas: [], syntheses: [] };
  const { ast } = parseMarkdown(file);
  const baselineHeading = firstHeading(ast, 2, '1. Channel-Level Capability Prerequisites');
  const gateway = firstHeading(ast, 2, 'Gateway 2 — Opportunity-Area Selection');
  const gatewayAreas = directChildHeadingRecords(ast, gateway, 3).filter((h) => !hasPlaceholder(h.text));
  const gatewayDecisions = gatewayAreas
    .map((h) => ({ area: h.text, decision: decisionFromSection(ast, h) }))
    .filter((x) => x.decision);
  const selectedAreas = gatewayDecisions.filter((x) => /^Pass\b/i.test(x.decision)).map((x) => x.area);

  const synthesisHeading = firstHeading(ast, 2, '2. Opportunity-Area Capability Requirements');
  const synthesisAreas = directChildHeadingRecords(ast, synthesisHeading, 3).filter((h) => !hasPlaceholder(h.text));
  const syntheses = synthesisAreas.map((area) => {
    const h4 = directChildHeadingRecords(ast, area, 4).map((h) => h.text);
    const dimensions = CAPABILITY_DIMENSIONS.every((dimension) => h4.includes(dimension));
    const links = sectionNodes(ast, area)
      .flatMap(collectLinks)
      .map((link) => link.url)
      .filter((url) => /^case-studies\/.*\.md$/.test(url));
    const complete = dimensions && tablePopulated(firstTableInSection(ast, area)) && !hasPlaceholder(sectionText(ast, area));
    return { area: area.text, links, complete };
  });

  return {
    exists: true,
    baseline: Boolean(baselineHeading && tablePopulated(firstTableInSection(ast, baselineHeading))),
    gatewayDecisions,
    selectedAreas,
    syntheses,
  };
}

function buildCaseFacts(dir, validator) {
  const caseDir = path.join(dir, 'case-studies');
  if (!fs.existsSync(caseDir)) return [];
  return walk(caseDir)
    .filter((file) => documentType(file) === 'case-study')
    .sort()
    .map((file) => {
      const doc = parseMarkdown(file);
      return {
        file,
        relativeFile: rel(file),
        name: headingRecords(doc.ast).find((h) => h.depth === 1)?.text ?? path.basename(file),
        opportunityArea: metadataValue(doc.raw, 'Opportunity area'),
        structuralStatus: structuralStatus(file, validator),
        issues: issuesFor(file, validator),
      };
    });
}

function buildMethodologySteps(channel, globals) {
  const o = channel.overviewFacts;
  const c = channel.capabilityFacts;
  const currentStructure = channel.overviewStatus !== 'INVALID';
  const steps = [];

  steps.push(makeStep('1', globals.frameworkComplete ? 'COMPLETE' : 'NOT_STARTED', globals.frameworkComplete ? 'Canonical assessment framework is present.' : 'Assessment framework is missing.'));
  steps.push(makeStep('2', globals.classesComplete && o.channelClass && !hasPlaceholder(o.channelClass) ? 'COMPLETE' : 'NOT_STARTED', o.channelClass ? `Channel class: ${o.channelClass}.` : 'Channel class is not recorded.'));
  steps.push(makeStep('3', globals.discoverySourcesComplete ? 'COMPLETE' : 'NOT_STARTED', globals.discoverySourcesComplete ? 'Channel-class discovery sources are recorded in channel-classes.md.' : 'Channel-class discovery sources are not confirmed.'));
  steps.push(makeStep('4', channel.discovered ? 'COMPLETE' : 'NOT_STARTED', channel.discovered ? 'Channel is present in the master index and has an overview document.' : 'Channel discovery output is incomplete.', channel.overviewStatus));

  if (!currentStructure) {
    for (const [id] of METHODOLOGY_STEPS.filter(([id]) => STEP_ORDER.get(id) >= STEP_ORDER.get('5'))) {
      steps.push(makeStep(id, 'ISSUE', 'Progress cannot be derived reliably because the channel overview uses a legacy/non-canonical structure.', channel.overviewStatus));
    }
    return steps;
  }

  steps.push(makeStep('5', progressStatus(o.channelAssessment, Boolean(firstHeading(o.ast, 2, '2. Channel Assessment'))), o.channelAssessment ? 'Channel assessment table is complete.' : 'Channel assessment is not complete.', channel.overviewStatus));
  steps.push(makeStep('5A', progressStatus(o.channelCommunity, Boolean(firstHeading(o.ast, 2, '3. Channel Community Findings'))), o.channelCommunity ? 'Channel community synthesis is complete.' : 'Channel community research is not complete.', channel.overviewStatus));
  steps.push(makeStep('G1', o.gateway1 ? 'COMPLETE' : 'NOT_STARTED', o.gateway1 ? `Decision: ${o.gateway1}` : 'No Gateway 1 decision is recorded.', channel.overviewStatus));

  const gateway1Pass = Boolean(o.gateway1 && /^Pass\b/i.test(o.gateway1));
  if (!gateway1Pass) {
    const laterStatus = o.gateway1 ? 'NOT_APPLICABLE' : 'NOT_STARTED';
    for (const [id] of METHODOLOGY_STEPS.filter(([id]) => STEP_ORDER.get(id) >= STEP_ORDER.get('6'))) {
      steps.push(makeStep(id, laterStatus, o.gateway1 ? 'Not applicable unless Gateway 1 passes.' : 'Waiting for Gateway 1.', channel.overviewStatus));
    }
    return steps;
  }

  steps.push(makeStep('6', progressStatus(o.discoverySources, Boolean(firstHeading(o.ast, 2, '4. Opportunity Landscape'))), o.discoverySources ? 'Opportunity-area discovery basis is recorded.' : 'Opportunity-area discovery sources are not complete.', channel.overviewStatus));
  steps.push(makeStep('7', progressStatus(o.taxonomyComplete, o.opportunityAreas.length > 0), o.taxonomyComplete ? `${o.opportunityAreas.length} opportunity areas are defined.` : 'Opportunity-area taxonomy is not complete.', channel.overviewStatus));

  const totalAreas = o.opportunityAreas.length;
  const phase2AreaComplete = totalAreas > 0 && o.fullyResearchedAreas === totalAreas;
  const step8Started = o.assessmentRecords > 0;
  const step8Status = phase2AreaComplete ? 'COMPLETE' : progressStatus(false, step8Started);
  const step8Detail = totalAreas
    ? `${o.assessmentRecords}/${totalAreas} assessment records are present; ${o.fullyResearchedAreas}/${totalAreas} opportunity areas are fully researched through Step 8A. Content presence is not treated as completed opportunity-area work.`
    : 'No opportunity areas are available to assess.';
  steps.push(makeStep('8', step8Status, step8Detail, channel.overviewStatus));

  const step8AComplete = totalAreas > 0 && o.communityAreas === totalAreas;
  steps.push(makeStep('8A', progressStatus(step8AComplete, o.communityAreas > 0), totalAreas ? `${o.communityAreas}/${totalAreas} opportunity areas have substantive community findings.` : 'No opportunity areas are available for community research.', channel.overviewStatus));

  const capabilityStructure = channel.capabilityStatus;
  steps.push(makeStep('9', c.exists ? progressStatus(c.baseline, true) : 'NOT_STARTED', c.baseline ? 'Channel-level capability prerequisites are complete.' : 'Channel-level capability prerequisites are not complete.', capabilityStructure));

  const eligibleAreas = o.areaDetails.filter((x) => x.fullyResearched).map((x) => x.area);
  const decidedEligible = c.gatewayDecisions.filter((x) => eligibleAreas.includes(x.area));
  const g2Complete = eligibleAreas.length > 0 && decidedEligible.length === eligibleAreas.length;
  const g2Started = c.gatewayDecisions.length > 0;
  steps.push(makeStep('G2', progressStatus(g2Complete, g2Started), `${c.gatewayDecisions.length} Gateway 2 decision(s) recorded; ${eligibleAreas.length} area(s) are currently eligible after Steps 8/8A.${eligibleAreas.length > 0 ? ` ${decidedEligible.length}/${eligibleAreas.length} eligible areas decided.` : ''}`, capabilityStructure));

  const selectedAreas = c.selectedAreas;
  if (selectedAreas.length === 0) {
    const status = c.gatewayDecisions.length > 0 ? 'NOT_APPLICABLE' : 'NOT_STARTED';
    steps.push(makeStep('10', status, c.gatewayDecisions.length > 0 ? 'No opportunity area has passed Gateway 2.' : 'Waiting for Gateway 2.', capabilityStructure));
    steps.push(makeStep('11', status, c.gatewayDecisions.length > 0 ? 'No representative case studies are required because no area has passed Gateway 2.' : 'Waiting for Gateway 2.', null));
    steps.push(makeStep('12', status, c.gatewayDecisions.length > 0 ? 'No opportunity-area synthesis is required because no area has passed Gateway 2.' : 'Waiting for Gateway 2.', capabilityStructure));
    return steps;
  }

  const synthesisByArea = new Map(c.syntheses.map((x) => [x.area, x]));
  const selectionsComplete = selectedAreas.every((area) => (synthesisByArea.get(area)?.links.length ?? 0) > 0);
  const selectedLinkCount = selectedAreas.reduce((sum, area) => sum + (synthesisByArea.get(area)?.links.length ?? 0), 0);
  steps.push(makeStep('10', progressStatus(selectionsComplete, selectedLinkCount > 0), `${selectedAreas.length} area(s) passed Gateway 2; ${selectedLinkCount} representative case-study link(s) are recorded.`, capabilityStructure));

  let expectedCases = 0;
  let existingCases = 0;
  let validCases = 0;
  for (const area of selectedAreas) {
    const synthesis = synthesisByArea.get(area);
    for (const link of synthesis?.links ?? []) {
      expectedCases += 1;
      const target = path.resolve(path.dirname(channel.capabilityFile), link);
      if (fs.existsSync(target)) {
        existingCases += 1;
        if (structuralStatus(target, channel.validator) === 'VALID') validCases += 1;
      }
    }
  }
  const caseExecutionComplete = expectedCases > 0 && existingCases === expectedCases;
  steps.push(makeStep('11', progressStatus(caseExecutionComplete, existingCases > 0), `${existingCases}/${expectedCases} selected case-study files exist. ${validCases}/${expectedCases} are structurally valid; structural validity is reported separately from execution progress.`, expectedCases > 0 && validCases < expectedCases ? 'ISSUES' : 'VALID'));

  let completedSynthesis = 0;
  for (const area of selectedAreas) {
    const capabilitySynthesis = synthesisByArea.get(area)?.complete ?? false;
    const overviewArea = o.areaDetails.find((x) => x.area === area);
    if (capabilitySynthesis && overviewArea?.fullyResearched) completedSynthesis += 1;
  }
  steps.push(makeStep('12', progressStatus(completedSynthesis === selectedAreas.length, completedSynthesis > 0), `${completedSynthesis}/${selectedAreas.length} selected opportunity areas have both completed area research and capability synthesis.`, capabilityStructure));

  return steps;
}

function buildChannels(validator, globals) {
  const allMarkdown = walk(CHANNELS_DIR).filter((file) => file.endsWith('.md'));
  const overviewFiles = allMarkdown.filter((file) => documentType(file) === 'overview').sort();
  const channelIndexRaw = fs.readFileSync(CHANNEL_INDEX_FILE, 'utf8');

  return overviewFiles.map((overviewFile) => {
    const dir = path.dirname(overviewFile);
    const slug = path.basename(dir);
    const capabilityFile = path.join(dir, 'capability.md');
    const overviewFacts = buildOverviewFacts(overviewFile);
    const capabilityFacts = buildCapabilityFacts(capabilityFile);
    const overviewStatus = structuralStatus(overviewFile, validator);
    const capabilityStatus = structuralStatus(capabilityFile, validator);
    const cases = buildCaseFacts(dir, validator);
    const discovered = channelIndexRaw.includes(`channels/${slug}/overview.md`);

    const channel = {
      slug,
      name: overviewFacts.title,
      validator,
      overviewFile,
      capabilityFile,
      overviewStatus,
      capabilityStatus,
      overviewIssues: issuesFor(overviewFile, validator),
      capabilityIssues: issuesFor(capabilityFile, validator),
      overviewFacts,
      capabilityFacts,
      cases,
      discovered,
    };
    channel.steps = buildMethodologySteps(channel, globals);
    return channel;
  });
}

function buildGlobals() {
  const classesRaw = fs.existsSync(CLASSES_FILE) ? fs.readFileSync(CLASSES_FILE, 'utf8') : '';
  return {
    frameworkComplete: fs.existsSync(FRAMEWORK_FILE) && fs.statSync(FRAMEWORK_FILE).size > 0,
    classesComplete: fs.existsSync(CLASSES_FILE) && /##\s+[^\n]+/.test(classesRaw),
    discoverySourcesComplete: /Step\s*3\s+complete/i.test(classesRaw),
  };
}

function statusCounts(channels) {
  const counts = Object.fromEntries(METHODOLOGY_STEPS.map(([id, label]) => [id, { label, COMPLETE: 0, IN_PROGRESS: 0, NOT_STARTED: 0, NOT_APPLICABLE: 0, ISSUE: 0 }]));
  for (const channel of channels) {
    for (const step of channel.steps) counts[step.id][step.status] += 1;
  }
  return counts;
}

function structureBreakdown(channels) {
  const out = { overview: {}, capability: {}, caseStudy: {} };
  for (const kind of Object.keys(out)) for (const status of ['VALID', 'INCOMPLETE', 'INVALID', 'MISSING']) out[kind][status] = 0;
  for (const channel of channels) {
    out.overview[channel.overviewStatus] += 1;
    out.capability[channel.capabilityStatus] += 1;
    for (const c of channel.cases) out.caseStudy[c.structuralStatus] += 1;
  }
  return out;
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function structuralBadge(status) {
  if (!status) return '<span class="muted">—</span>';
  const normalized = status === 'ISSUES' ? 'INVALID' : status;
  const labels = { VALID: 'Valid', INCOMPLETE: 'Incomplete', INVALID: 'Issue', MISSING: 'Missing' };
  return `<span class="badge structure-${normalized.toLowerCase()}">${esc(labels[normalized] ?? normalized)}</span>`;
}

function progressBadge(status) {
  const labels = { COMPLETE: 'Complete', IN_PROGRESS: 'In progress', NOT_STARTED: 'Not started', NOT_APPLICABLE: 'N/A', ISSUE: 'Structural issue' };
  return `<span class="badge progress-${status.toLowerCase().replaceAll('_', '-')}">${esc(labels[status] ?? status)}</span>`;
}

function issueList(issue) {
  if (!issue || (!issue.errors.length && !issue.incomplete.length)) return '<span class="muted">None</span>';
  return `<ul>${[
    ...issue.errors.map((x) => `<li>${esc(x)}</li>`),
    ...issue.incomplete.map((x) => `<li>${esc(x)}</li>`),
  ].join('')}</ul>`;
}

function methodologyTable(channel) {
  return `<table class="method-table"><thead><tr><th>Step</th><th>Methodology</th><th>Progress</th><th>Evidence / coverage</th><th>Structure</th></tr></thead><tbody>${channel.steps.map((step) => `<tr><td class="step">${esc(step.id)}</td><td>${esc(step.label)}</td><td>${progressBadge(step.status)}</td><td>${esc(step.detail)}</td><td>${structuralBadge(step.structure)}</td></tr>`).join('')}</tbody></table>`;
}

function channelRows(channels) {
  return channels.map((channel) => {
    const latestStep = [...channel.steps].reverse().find((step) => step.status === 'COMPLETE')?.id ?? '—';
    const inProgress = channel.steps.filter((step) => step.status === 'IN_PROGRESS').map((step) => step.id).join(', ') || '—';
    const search = esc(`${channel.name} ${channel.slug} ${channel.overviewStatus} ${channel.capabilityStatus}`.toLowerCase());
    return `<tr class="channel-row" data-search="${search}" data-status="${channel.overviewStatus}">
      <td><strong>${esc(channel.name)}</strong><div class="path">${esc(channel.slug)}</div></td>
      <td>${structuralBadge(channel.overviewStatus)}</td>
      <td>${structuralBadge(channel.capabilityStatus)}</td>
      <td>${esc(latestStep)}</td>
      <td>${esc(inProgress)}</td>
      <td><details><summary>View methodology progress</summary><div class="detail">
        ${methodologyTable(channel)}
        <h4>Overview structural issues</h4>${issueList(channel.overviewIssues)}
        ${channel.capabilityIssues ? `<h4>Capability structural issues</h4>${issueList(channel.capabilityIssues)}` : ''}
        ${channel.cases.length ? `<h4>Case-study structural issues</h4>${channel.cases.map((c) => `<div class="case"><div><strong>${esc(c.name)}</strong> ${structuralBadge(c.structuralStatus)}</div><div class="path">${esc(c.relativeFile)}</div>${issueList(c.issues)}</div>`).join('')}` : ''}
      </div></details></td>
    </tr>`;
  }).join('');
}

function invalidDocumentDetails(channels) {
  const docs = [];
  for (const channel of channels) {
    if (channel.overviewIssues && channel.overviewStatus !== 'VALID') docs.push(channel.overviewIssues);
    if (channel.capabilityIssues && channel.capabilityStatus !== 'VALID') docs.push(channel.capabilityIssues);
    for (const c of channel.cases) if (c.structuralStatus !== 'VALID') docs.push(c.issues);
  }
  return docs.map((doc) => `<details class="issue-doc"><summary>${structuralBadge(doc.status)} <code>${esc(doc.file)}</code></summary>${issueList(doc)}</details>`).join('');
}

function buildHtml(model) {
  const { validator, channels, stepCounts, structure } = model;
  const totalDocs = validator.summary.VALID + validator.summary.INCOMPLETE + validator.summary.INVALID;
  const generated = new Date().toISOString();
  const apify = channels.find((c) => c.slug === 'apify');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SideGig Research Validation & Progress</title>
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172033;background:#f6f8fb}*{box-sizing:border-box}body{margin:0}.wrap{max-width:1500px;margin:auto;padding:28px}h1{margin:0 0 6px;font-size:30px}h2{margin-top:34px}h4{margin-bottom:7px}.muted,.path{color:#697386}.path{font-size:12px;margin-top:4px}.note{background:#fff8df;border:1px solid #ead99d;border-radius:10px;padding:12px 14px;margin:18px 0}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:20px 0}.card{background:white;border:1px solid #dfe4ec;border-radius:12px;padding:16px}.card .n{font-size:28px;font-weight:750}.card .label{font-size:13px;color:#697386;margin-top:4px}.panel{background:white;border:1px solid #dfe4ec;border-radius:12px;padding:18px;margin:14px 0;overflow:auto}table{border-collapse:collapse;width:100%}th,td{padding:9px 11px;border-bottom:1px solid #e7ebf0;text-align:left;vertical-align:top}thead th{background:#f7f9fc;position:sticky;top:0}.step{font-weight:800;white-space:nowrap}.badge{display:inline-block;padding:3px 8px;border-radius:999px;font-size:12px;font-weight:700;white-space:nowrap}.structure-valid,.progress-complete{background:#def7e5;color:#166534}.structure-incomplete,.progress-in-progress{background:#fff1c2;color:#854d0e}.structure-invalid,.progress-issue{background:#fee2e2;color:#991b1b}.structure-missing,.progress-not-started,.progress-not-applicable{background:#eceff3;color:#596273}.controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}input,select{padding:9px 10px;border:1px solid #cfd6e0;border-radius:8px;background:white}input{min-width:260px;flex:1}summary{cursor:pointer}.detail{min-width:800px;padding:12px 0 4px}.case{padding:10px 0;border-top:1px solid #edf0f4}.issue-doc{padding:8px 0;border-bottom:1px solid #edf0f4}ul{margin:8px 0 12px;padding-left:22px}code{font-size:12px}.method-table th:nth-child(1){width:55px}.method-table th:nth-child(3){width:120px}.method-table th:nth-child(5){width:100px}@media(max-width:760px){.wrap{padding:14px}.panel{padding:10px}.detail{min-width:700px}h1{font-size:23px}th,td{padding:7px 8px}}
</style></head><body><main class="wrap">
<h1>SideGig Research Validation & Progress</h1>
<div class="muted">Generated ${esc(generated)} from repository Markdown and validator output.</div>
<div class="note"><strong>Progress rule:</strong> the report follows the numbered methodology. Presence of content is evidence, not automatically completion. In particular, populated Step 8 assessment records are not presented as completed opportunity-area work while the required Step 8A research for those areas remains unfinished. Structural validity is shown separately from research progress.</div>

<h2>Validation overview</h2>
<div class="cards">
<div class="card"><div class="n">${totalDocs}</div><div class="label">Documents validated</div></div>
<div class="card"><div class="n">${validator.summary.VALID}</div><div class="label">Structurally valid</div></div>
<div class="card"><div class="n">${validator.summary.INCOMPLETE}</div><div class="label">Structurally incomplete</div></div>
<div class="card"><div class="n">${validator.summary.INVALID}</div><div class="label">Structural issues</div></div>
<div class="card"><div class="n">${channels.length}</div><div class="label">Channels</div></div>
</div>

${apify ? `<h2>Apify Store — methodology progress</h2><div class="panel">${methodologyTable(apify)}</div>` : ''}

<h2>Methodology progress across channels</h2>
<div class="panel"><table><thead><tr><th>Step</th><th>Methodology</th><th>Complete</th><th>In progress</th><th>Not started</th><th>N/A</th><th>Structural issue</th></tr></thead><tbody>${METHODOLOGY_STEPS.map(([id, label]) => { const c = stepCounts[id]; return `<tr><td class="step">${esc(id)}</td><td>${esc(label)}</td><td>${c.COMPLETE}</td><td>${c.IN_PROGRESS}</td><td>${c.NOT_STARTED}</td><td>${c.NOT_APPLICABLE}</td><td>${c.ISSUE}</td></tr>`; }).join('')}</tbody></table></div>

<h2>Channels</h2>
<div class="panel"><div class="controls"><input id="search" placeholder="Search channel"><select id="filter"><option value="ALL">All overview structures</option><option value="VALID">Valid</option><option value="INCOMPLETE">Incomplete</option><option value="INVALID">Issue</option></select></div><table><thead><tr><th>Channel</th><th>Overview structure</th><th>Capability structure</th><th>Latest completed step</th><th>Step(s) in progress</th><th>Detail</th></tr></thead><tbody id="channels">${channelRows(channels)}</tbody></table></div>

<h2>Structural validity by document type</h2>
<div class="panel"><table><thead><tr><th>Document type</th><th>Valid</th><th>Incomplete</th><th>Issue</th><th>Missing</th></tr></thead><tbody>
<tr><th>Channel overview</th><td>${structure.overview.VALID}</td><td>${structure.overview.INCOMPLETE}</td><td>${structure.overview.INVALID}</td><td>${structure.overview.MISSING}</td></tr>
<tr><th>Capability</th><td>${structure.capability.VALID}</td><td>${structure.capability.INCOMPLETE}</td><td>${structure.capability.INVALID}</td><td>${structure.capability.MISSING}</td></tr>
<tr><th>Case study</th><td>${structure.caseStudy.VALID}</td><td>${structure.caseStudy.INCOMPLETE}</td><td>${structure.caseStudy.INVALID}</td><td>${structure.caseStudy.MISSING}</td></tr>
</tbody></table></div>

<h2>Exact structural issues</h2><div class="panel">${invalidDocumentDetails(channels) || '<span class="muted">None</span>'}</div>

<script>
const search=document.getElementById('search'),filter=document.getElementById('filter');
function apply(){const q=search.value.toLowerCase().trim(),f=filter.value;document.querySelectorAll('.channel-row').forEach(r=>{r.style.display=(!q||r.dataset.search.includes(q))&&(f==='ALL'||r.dataset.status===f)?'':'none'})}search.addEventListener('input',apply);filter.addEventListener('change',apply);
</script></main></body></html>`;
}

function serialiseModel(model) {
  return JSON.stringify({
    generatedAt: new Date().toISOString(),
    validation: model.validator.summary,
    globals: model.globals,
    stepCounts: model.stepCounts,
    structure: model.structure,
    channels: model.channels.map((channel) => ({
      slug: channel.slug,
      name: channel.name,
      overviewStatus: channel.overviewStatus,
      capabilityStatus: channel.capabilityStatus,
      steps: channel.steps,
      opportunityAreas: channel.overviewFacts.opportunityAreas,
      areaDetails: channel.overviewFacts.areaDetails,
      gateway2: channel.capabilityFacts.gatewayDecisions,
      selectedAreas: channel.capabilityFacts.selectedAreas,
      caseStudies: channel.cases.map((c) => ({ file: c.relativeFile, name: c.name, opportunityArea: c.opportunityArea, structuralStatus: c.structuralStatus })),
    })),
  }, null, 2);
}

function main() {
  const validator = parseValidatorOutput();
  const globals = buildGlobals();
  const channels = buildChannels(validator, globals);
  const model = {
    validator,
    globals,
    channels,
    stepCounts: statusCounts(channels),
    structure: structureBreakdown(channels),
  };
  fs.writeFileSync(JSON_REPORT, serialiseModel(model));
  fs.writeFileSync(HTML_REPORT, buildHtml(model));
  console.log(`Generated ${rel(HTML_REPORT)} and ${rel(JSON_REPORT)}`);
}

main();
