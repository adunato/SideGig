#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const ROOT = process.cwd();
const CHANNELS_DIR = path.join(ROOT, 'research', 'channels');
const PROGRESS_JSON = path.join(ROOT, 'research-validation-report.json');
const HTML_REPORT = path.join(ROOT, 'research-insights-dashboard.html');
const parser = unified().use(remarkParse).use(remarkGfm);

const CAPABILITY_DIMENSIONS = [
  'Technical complexity',
  'Domain expertise',
  'Data / resource access',
  'Operating complexity',
  'Cost intensity',
];

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

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

function headings(ast) {
  return ast.children
    .map((node, index) => ({ node, index }))
    .filter(({ node }) => node.type === 'heading')
    .map(({ node, index }) => ({ node, index, depth: node.depth, text: nodeText(node).trim() }));
}

function firstHeading(ast, depth, text) {
  return headings(ast).find((h) => h.depth === depth && h.text === text) ?? null;
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

function directChildHeadings(ast, parent, depth = parent?.depth + 1) {
  if (!parent) return [];
  const out = [];
  for (let i = parent.index + 1; i < ast.children.length; i += 1) {
    const node = ast.children[i];
    if (node.type === 'heading' && node.depth <= parent.depth) break;
    if (node.type === 'heading' && node.depth === depth) {
      out.push({ node, index: i, depth: node.depth, text: nodeText(node).trim() });
    }
  }
  return out;
}

function findNestedHeading(ast, parent, depth, text) {
  return directChildHeadings(ast, parent, depth).find((h) => h.text === text) ?? null;
}

function firstTable(nodes) {
  return nodes.find((node) => node.type === 'table') ?? null;
}

function tableRows(table) {
  if (!table) return [];
  return table.children.map((row) => row.children.map((cell) => nodeText(cell).trim()));
}

function tableObjects(table) {
  const rows = tableRows(table);
  if (rows.length < 2) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ''])));
}

function metadataValue(raw, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'mi'));
  return match ? match[1].trim() : null;
}

function lineValue(raw, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+?)\\s{0,2}$`, 'mi'));
  return match ? match[1].trim() : null;
}

function decisionFromNodes(nodes) {
  const text = nodes.map(nodeText).join('\n');
  const match = text.match(/Decision\s*:\s*([^\n]+)/i);
  return match ? match[1].trim() : null;
}

function paragraphStarting(nodes, label) {
  const node = nodes.find((candidate) => candidate.type === 'paragraph' && nodeText(candidate).trim().toLowerCase().startsWith(label.toLowerCase()));
  if (!node) return '';
  const text = nodeText(node).trim();
  return text.slice(label.length).replace(/^\s*:?\s*/, '').trim();
}

function stripLeadingMeta(nodes, patterns = []) {
  return nodes.filter((node) => {
    if (node.type !== 'paragraph') return true;
    const text = nodeText(node).trim();
    return !patterns.some((pattern) => pattern.test(text));
  });
}

function inlineHtml(node) {
  if (!node) return '';
  if (node.type === 'text') return esc(node.value);
  if (node.type === 'strong') return `<strong>${(node.children ?? []).map(inlineHtml).join('')}</strong>`;
  if (node.type === 'emphasis') return `<em>${(node.children ?? []).map(inlineHtml).join('')}</em>`;
  if (node.type === 'delete') return `<del>${(node.children ?? []).map(inlineHtml).join('')}</del>`;
  if (node.type === 'inlineCode') return `<code>${esc(node.value)}</code>`;
  if (node.type === 'break') return '<br>';
  if (node.type === 'link') return `<a href="${esc(node.url)}" target="_blank" rel="noopener">${(node.children ?? []).map(inlineHtml).join('')}</a>`;
  if (node.type === 'image') return `<span class="muted">[${esc(node.alt || 'image')}]</span>`;
  if (Array.isArray(node.children)) return node.children.map(inlineHtml).join('');
  return node.value ? esc(node.value) : '';
}

function renderNode(node) {
  switch (node.type) {
    case 'paragraph': return `<p>${(node.children ?? []).map(inlineHtml).join('')}</p>`;
    case 'list': {
      const tag = node.ordered ? 'ol' : 'ul';
      return `<${tag}>${(node.children ?? []).map(renderNode).join('')}</${tag}>`;
    }
    case 'listItem': return `<li>${(node.children ?? []).map(renderNode).join('')}</li>`;
    case 'blockquote': return `<blockquote>${(node.children ?? []).map(renderNode).join('')}</blockquote>`;
    case 'code': return `<pre><code>${esc(node.value)}</code></pre>`;
    case 'thematicBreak': return '<hr>';
    case 'heading': return `<h${Math.min(6, Math.max(2, node.depth))}>${(node.children ?? []).map(inlineHtml).join('')}</h${Math.min(6, Math.max(2, node.depth))}>`;
    case 'table': {
      const rows = node.children ?? [];
      return `<div class="table-wrap"><table>${rows.map((row, ri) => `<tr>${(row.children ?? []).map((cell) => `<${ri === 0 ? 'th' : 'td'}>${(cell.children ?? []).map(inlineHtml).join('')}</${ri === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</table></div>`;
    }
    case 'html': return `<pre class="raw-html">${esc(node.value)}</pre>`;
    default: return Array.isArray(node.children) ? node.children.map(renderNode).join('') : '';
  }
}

function renderNodes(nodes) {
  return nodes.map(renderNode).join('');
}

function nodesBefore(nodes, predicate) {
  const index = nodes.findIndex(predicate);
  return index < 0 ? nodes : nodes.slice(0, index);
}

function buildOverview(file) {
  const { raw, ast } = parseMarkdown(file);
  const title = headings(ast).find((h) => h.depth === 1)?.text ?? path.basename(path.dirname(file));
  const overviewHeading = firstHeading(ast, 2, '1. Channel Overview');
  const assessmentHeading = firstHeading(ast, 2, '2. Channel Assessment');
  const assessmentNodes = sectionNodes(ast, assessmentHeading);
  const conclusionHeading = findNestedHeading(ast, assessmentHeading, 3, 'Overall channel conclusion');
  const communityHeading = firstHeading(ast, 2, '3. Channel Community Findings');
  const gateway1Heading = firstHeading(ast, 2, 'Gateway 1 — Channel Selection');
  const opportunityHeading = firstHeading(ast, 2, '5. Opportunity-Area Assessment');
  const comparisonHeading = findNestedHeading(ast, opportunityHeading, 3, '5.1 Comparison');
  const byAreaHeading = findNestedHeading(ast, opportunityHeading, 3, '5.2 Assessment by opportunity area');
  const crossAreaHeading = firstHeading(ast, 2, '6. Cross-Area Findings');
  const gapsHeading = firstHeading(ast, 2, '7. Evidence Gaps and Limitations');

  const assessmentRows = tableObjects(firstTable(assessmentNodes)).map((row) => ({
    metric: row.Metric,
    score: row['Score (1–5)'],
    confidence: row.Confidence,
    rationale: row['Evidence and rationale'],
  }));

  const opportunityRows = tableObjects(firstTable(sectionNodes(ast, comparisonHeading)));
  const opportunityAreas = directChildHeadings(ast, byAreaHeading, 4).map((area) => {
    const areaNodes = sectionNodes(ast, area);
    const community = findNestedHeading(ast, area, 5, 'Community Findings');
    const beforeCommunity = nodesBefore(areaNodes, (node) => node === community?.node);
    const summaryParagraphs = beforeCommunity.filter((node) => node.type === 'paragraph');
    const assessmentText = summaryParagraphs.map(nodeText).find((text) => /^Assessment\s*:/i.test(text.trim())) ?? '';
    const trendText = summaryParagraphs.map(nodeText).find((text) => /^Trend\s*:/i.test(text.trim())) ?? '';
    const narrativeNodes = beforeCommunity.filter((node) => {
      if (node.type !== 'paragraph') return node.type !== 'heading';
      const text = nodeText(node).trim();
      return !/^Assessment\s*:/i.test(text) && !/^Trend\s*:/i.test(text);
    });
    return {
      name: area.text,
      assessment: assessmentText.replace(/^Assessment\s*:\s*/i, ''),
      trend: trendText.replace(/^Trend\s*:\s*/i, ''),
      narrativeHtml: renderNodes(narrativeNodes),
      communityHtml: community ? renderNodes(sectionNodes(ast, community)) : '',
    };
  });

  const gatewayNodes = stripLeadingMeta(sectionNodes(ast, gateway1Heading), [/^Methodology mapping:/i]);
  const gatewayDecision = decisionFromNodes(gatewayNodes);
  const gatewayRationaleNodes = gatewayNodes.filter((node) => !(node.type === 'paragraph' && /Decision\s*:/i.test(nodeText(node))));

  return {
    title,
    channelClass: metadataValue(raw, 'Channel class'),
    channelUrl: metadataValue(raw, 'Channel URL') ?? metadataValue(raw, 'URL'),
    overviewHtml: renderNodes(sectionNodes(ast, overviewHeading)),
    assessmentRows,
    trend: lineValue(raw, 'Trend'),
    confidence: lineValue(raw, 'Overall evidence confidence'),
    conclusionHtml: conclusionHeading ? renderNodes(sectionNodes(ast, conclusionHeading)) : '',
    communityHtml: communityHeading ? renderNodes(stripLeadingMeta(sectionNodes(ast, communityHeading), [/^Methodology mapping:/i])) : '',
    gateway1: gatewayDecision,
    gateway1RationaleHtml: renderNodes(gatewayRationaleNodes),
    opportunityRows,
    opportunityAreas,
    crossAreaHtml: crossAreaHeading ? renderNodes(sectionNodes(ast, crossAreaHeading)) : '',
    gapsHtml: gapsHeading ? renderNodes(sectionNodes(ast, gapsHeading)) : '',
  };
}

function buildCapability(file) {
  const { ast } = parseMarkdown(file);
  const baselineHeading = firstHeading(ast, 2, '1. Channel-Level Capability Prerequisites');
  const baselineNodes = sectionNodes(ast, baselineHeading);
  const baselineRows = tableObjects(firstTable(baselineNodes)).map((row) => ({
    dimension: row.Dimension,
    requirement: row.Requirement,
    evidence: row['Evidence / basis'],
    confidence: row.Confidence,
  }));

  const gatewayHeading = firstHeading(ast, 2, 'Gateway 2 — Opportunity-Area Selection');
  const gatewayAreas = directChildHeadings(ast, gatewayHeading, 3).map((area) => {
    const nodes = sectionNodes(ast, area);
    const decision = decisionFromNodes(nodes);
    const rationale = nodes.filter((node) => !(node.type === 'paragraph' && /Decision\s*:/i.test(nodeText(node))));
    return { area: area.text, decision, rationaleHtml: renderNodes(rationale) };
  });

  const synthesisHeading = firstHeading(ast, 2, '2. Opportunity-Area Capability Requirements');
  const syntheses = directChildHeadings(ast, synthesisHeading, 3).map((area) => {
    const nodes = sectionNodes(ast, area);
    const h4s = directChildHeadings(ast, area, 4);
    const firstH4Index = nodes.findIndex((node) => node.type === 'heading' && node.depth === 4);
    const introNodes = firstH4Index >= 0 ? nodes.slice(0, firstH4Index) : nodes;
    const dimensionRows = tableObjects(firstTable(nodes)).map((row) => ({
      dimension: row.Dimension,
      requirement: row['Opportunity-area requirement'],
      evidence: row['Evidence / basis'],
      confidence: row.Confidence,
    }));
    const narratives = h4s
      .filter((h) => CAPABILITY_DIMENSIONS.includes(h.text))
      .map((h) => ({ dimension: h.text, html: renderNodes(sectionNodes(ast, h)) }));
    const conclusion = paragraphStarting(nodes, 'Opportunity-area synthesis conclusion');
    return {
      area: area.text,
      introHtml: renderNodes(introNodes.filter((node) => node.type !== 'table')),
      dimensionRows,
      narratives,
      conclusion,
    };
  });

  return {
    baselineRows,
    conclusion: paragraphStarting(baselineNodes, 'Channel-level conclusion'),
    gateway2: gatewayAreas,
    syntheses,
  };
}

function isCompletedChannel(channel) {
  if (channel.overviewStatus !== 'VALID' || channel.capabilityStatus !== 'VALID') return false;
  const terminal = new Set(['COMPLETE', 'NOT_APPLICABLE']);
  const structuralIssues = new Set(['INVALID', 'ISSUES', 'MISSING']);
  return channel.steps.every((step) => terminal.has(step.status) && !structuralIssues.has(step.structure));
}

function buildChannels(progress) {
  return progress.channels
    .filter(isCompletedChannel)
    .map((channel) => {
      const dir = path.join(CHANNELS_DIR, channel.slug);
      const overviewFile = path.join(dir, 'overview.md');
      const capabilityFile = path.join(dir, 'capability.md');
      if (!fs.existsSync(overviewFile) || !fs.existsSync(capabilityFile)) return null;
      return {
        slug: channel.slug,
        overview: buildOverview(overviewFile),
        capability: buildCapability(capabilityFile),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.overview.title.localeCompare(b.overview.title));
}

function scoreClass(score) {
  const n = Number.parseInt(String(score), 10);
  if (!Number.isFinite(n)) return 'score-neutral';
  if (n >= 4) return 'score-high';
  if (n === 3) return 'score-mid';
  return 'score-low';
}

function requirementClass(requirement) {
  const value = String(requirement ?? '').toLowerCase();
  const low = /low/.test(value);
  const medium = /medium/.test(value);
  const high = /high/.test(value);
  if (low && !medium && !high) return 'req-low';
  if (high && !medium && !low) return 'req-high';
  if (medium || (low && high)) return 'req-mid';
  return 'req-neutral';
}

function marketGrid(rows) {
  return `<div class="metric-grid">${rows.map((row) => `<div class="metric"><span>${esc(row.metric)}</span><strong class="score ${scoreClass(row.score)}">${esc(row.score)}</strong></div>`).join('')}</div>`;
}

function capabilityGrid(rows) {
  return `<div class="cap-grid">${rows.map((row) => `<div class="cap-item"><span>${esc(row.dimension)}</span><strong class="requirement ${requirementClass(row.requirement)}">${esc(row.requirement)}</strong></div>`).join('')}</div>`;
}

function assessmentTable(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Metric</th><th>Score</th><th>Confidence</th><th>Evidence and rationale</th></tr></thead><tbody>${rows.map((row) => `<tr><td><strong>${esc(row.metric)}</strong></td><td><span class="score ${scoreClass(row.score)}">${esc(row.score)}</span></td><td>${esc(row.confidence)}</td><td>${esc(row.rationale)}</td></tr>`).join('')}</tbody></table></div>`;
}

function capabilityTable(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Dimension</th><th>Requirement</th><th>Confidence</th><th>Evidence / basis</th></tr></thead><tbody>${rows.map((row) => `<tr><td><strong>${esc(row.dimension)}</strong></td><td><span class="requirement ${requirementClass(row.requirement)}">${esc(row.requirement)}</span></td><td>${esc(row.confidence)}</td><td>${esc(row.evidence)}</td></tr>`).join('')}</tbody></table></div>`;
}

function opportunityTable(rows) {
  if (!rows.length) return '<p class="muted">No opportunity-area comparison is recorded.</p>';
  const headers = Object.keys(rows[0]);
  return `<div class="table-wrap"><table class="compact"><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((h, i) => `<td>${i === 0 ? `<strong>${esc(row[h])}</strong>` : esc(row[h])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function card(channel) {
  const o = channel.overview;
  const c = channel.capability;
  const selected = c.gateway2.filter((x) => /^Pass\b/i.test(x.decision ?? '')).length;
  const search = esc(`${o.title} ${o.channelClass} ${o.conclusionHtml.replace(/<[^>]+>/g, ' ')}`.toLowerCase());
  return `<article class="channel-card" data-search="${search}">
    <div class="card-head"><div><span class="eyebrow">${esc(o.channelClass)}</span><h2>${esc(o.title)}</h2></div><div class="trend"><span>${esc(o.trend ?? '—')}</span><small>${esc(o.confidence ?? '—')} confidence</small></div></div>
    <div class="card-columns"><section><h3>Market profile</h3>${marketGrid(o.assessmentRows)}</section><section><h3>Capability baseline</h3>${capabilityGrid(c.baselineRows)}</section></div>
    <div class="card-footer"><span>${o.opportunityRows.length} opportunity area${o.opportunityRows.length === 1 ? '' : 's'} assessed · ${selected} selected for deep dive</span><button class="open-channel" data-channel="${esc(channel.slug)}">View findings →</button></div>
  </article>`;
}

function areaDetails(area) {
  return `<details class="insight-detail"><summary><span>${esc(area.name)}</span><span class="summary-meta">${esc(area.trend || '')}</span></summary><div class="detail-body">${area.assessment ? `<p class="assessment-line"><strong>Assessment:</strong> ${esc(area.assessment)}</p>` : ''}${area.narrativeHtml}${area.communityHtml ? `<h4>Community findings</h4>${area.communityHtml}` : ''}</div></details>`;
}

function synthesisDetails(synthesis) {
  return `<details class="insight-detail"><summary><span>${esc(synthesis.area)}</span><span class="summary-meta">Capability synthesis</span></summary><div class="detail-body">${synthesis.introHtml}${capabilityTable(synthesis.dimensionRows)}${synthesis.narratives.map((n) => `<h4>${esc(n.dimension)}</h4>${n.html}`).join('')}${synthesis.conclusion ? `<div class="callout"><strong>Conclusion</strong><p>${esc(synthesis.conclusion)}</p></div>` : ''}</div></details>`;
}

function channelView(channel) {
  const o = channel.overview;
  const c = channel.capability;
  return `<section class="channel-view" id="channel-${esc(channel.slug)}" data-channel-view="${esc(channel.slug)}" hidden>
    <button class="back-button">← All completed channels</button>
    <header class="detail-header"><div><span class="eyebrow">${esc(o.channelClass)}</span><h1>${esc(o.title)}</h1><div class="detail-meta"><span>Trend: <strong>${esc(o.trend ?? '—')}</strong></span><span>Evidence confidence: <strong>${esc(o.confidence ?? '—')}</strong></span>${o.channelUrl ? `<a href="${esc(o.channelUrl)}" target="_blank" rel="noopener">Open channel ↗</a>` : ''}</div></div></header>

    <nav class="section-nav"><a href="#market-${esc(channel.slug)}">Market</a><a href="#opportunities-${esc(channel.slug)}">Opportunity areas</a><a href="#capability-${esc(channel.slug)}">Capability</a></nav>

    <section class="detail-section" id="market-${esc(channel.slug)}"><div class="section-title"><span>01</span><h2>Market findings</h2></div>
      <div class="two-col"><div class="panel"><h3>Channel overview</h3>${o.overviewHtml}</div><div class="panel"><h3>Market profile</h3>${marketGrid(o.assessmentRows)}</div></div>
      <h3>Assessment evidence</h3>${assessmentTable(o.assessmentRows)}
      <div class="two-col narrative"><div><h3>Overall conclusion</h3>${o.conclusionHtml}</div><div><h3>Community findings</h3>${o.communityHtml}</div></div>
      ${o.gateway1 ? `<div class="decision"><span>Gateway 1</span><strong>${esc(o.gateway1)}</strong>${o.gateway1RationaleHtml}</div>` : ''}
    </section>

    <section class="detail-section" id="opportunities-${esc(channel.slug)}"><div class="section-title"><span>02</span><h2>Opportunity areas</h2></div>
      ${opportunityTable(o.opportunityRows)}
      <div class="details-stack">${o.opportunityAreas.map(areaDetails).join('')}</div>
      ${o.crossAreaHtml ? `<div class="panel narrative-block"><h3>Cross-area findings</h3>${o.crossAreaHtml}</div>` : ''}
      ${o.gapsHtml ? `<div class="panel narrative-block"><h3>Evidence gaps & limitations</h3>${o.gapsHtml}</div>` : ''}
    </section>

    <section class="detail-section" id="capability-${esc(channel.slug)}"><div class="section-title"><span>03</span><h2>Capability</h2></div>
      <div class="panel"><h3>Channel-level prerequisites</h3>${capabilityGrid(c.baselineRows)}${c.conclusion ? `<p class="cap-conclusion">${esc(c.conclusion)}</p>` : ''}</div>
      ${capabilityTable(c.baselineRows)}
      ${c.gateway2.length ? `<h3>Gateway 2 decisions</h3><div class="gateway-grid">${c.gateway2.map((g) => `<div class="decision small"><span>${esc(g.area)}</span><strong>${esc(g.decision ?? '—')}</strong>${g.rationaleHtml}</div>`).join('')}</div>` : ''}
      ${c.syntheses.length ? `<h3>Opportunity-area capability synthesis</h3><div class="details-stack">${c.syntheses.map(synthesisDetails).join('')}</div>` : ''}
    </section>
  </section>`;
}

function buildHtml(channels, sourceGeneratedAt) {
  const generated = new Date().toISOString();
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Research Insights Dashboard</title><style>
:root{--bg:#f4f6f8;--surface:#fff;--text:#17202a;--muted:#657180;--line:#dfe4ea;--accent:#1f5b8f;--accent-soft:#eaf2f8;--high:#147d64;--high-bg:#e7f5f0;--mid:#9b6b12;--mid-bg:#fff4d6;--low:#a63b37;--low-bg:#fdeceb;--shadow:0 10px 28px rgba(20,35,50,.07)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font:14px/1.55 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:var(--accent)}button,input{font:inherit}.shell{max-width:1440px;margin:0 auto;padding:34px 26px 70px}.topbar{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;margin-bottom:26px}.topbar h1,.detail-header h1{margin:4px 0 6px;font-size:34px;line-height:1.08;letter-spacing:-.03em}.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);font-weight:750}.subtitle{margin:0;color:var(--muted);max-width:760px}.report-meta{text-align:right;color:var(--muted);font-size:12px}.controls{display:flex;gap:12px;margin:20px 0}.controls input{width:min(460px,100%);padding:11px 14px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--text)}.summary-strip{display:flex;gap:10px;align-items:center;margin:0 0 18px;color:var(--muted)}.summary-strip strong{color:var(--text);font-size:22px}.cards{display:grid;gap:18px}.channel-card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px;box-shadow:var(--shadow)}.card-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}.card-head h2{font-size:24px;margin:3px 0 0}.trend{text-align:right;display:flex;flex-direction:column;gap:1px}.trend span{font-weight:750}.trend small{color:var(--muted)}.card-columns{display:grid;grid-template-columns:1.1fr .9fr;gap:26px;margin-top:18px}.card-columns h3,.panel h3{margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}.metric-grid,.cap-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.metric,.cap-item{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;background:#f8fafb;border:1px solid #edf0f2;border-radius:9px}.metric span,.cap-item span{color:#4f5c68}.score,.requirement{display:inline-flex;align-items:center;justify-content:center;min-width:28px;padding:2px 7px;border-radius:999px;font-weight:750;white-space:nowrap}.score-high,.req-low{background:var(--high-bg);color:var(--high)}.score-mid,.req-mid{background:var(--mid-bg);color:var(--mid)}.score-low,.req-high{background:var(--low-bg);color:var(--low)}.score-neutral,.req-neutral{background:#edf1f4;color:#56616d}.card-footer{border-top:1px solid var(--line);padding-top:16px;margin-top:18px;display:flex;justify-content:space-between;align-items:center;gap:14px;color:var(--muted)}.open-channel,.back-button{border:0;background:var(--accent);color:#fff;border-radius:9px;padding:9px 12px;cursor:pointer;font-weight:700}.back-button{background:transparent;color:var(--accent);padding:0;margin:0 0 18px}.empty{background:#fff;border:1px solid var(--line);border-radius:14px;padding:28px;color:var(--muted)}
.channel-view{background:transparent}.detail-header{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px;box-shadow:var(--shadow)}.detail-meta{display:flex;gap:18px;flex-wrap:wrap;color:var(--muted)}.section-nav{display:flex;gap:8px;position:sticky;top:0;z-index:5;background:rgba(244,246,248,.94);backdrop-filter:blur(8px);padding:13px 0}.section-nav a{text-decoration:none;background:#fff;border:1px solid var(--line);border-radius:999px;padding:7px 12px;font-weight:700}.detail-section{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px;margin-top:16px;box-shadow:var(--shadow);scroll-margin-top:62px}.section-title{display:flex;gap:12px;align-items:center;margin-bottom:18px}.section-title span{width:30px;height:30px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;font-size:11px;font-weight:800}.section-title h2{margin:0;font-size:24px}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:18px}.panel{background:#f8fafb;border:1px solid #edf0f2;border-radius:12px;padding:16px}.narrative{margin-top:22px}.narrative h3,.narrative-block h3{margin-top:0}.narrative-block{margin-top:18px}.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:11px;margin:12px 0 20px}table{border-collapse:collapse;width:100%;background:#fff}th,td{text-align:left;vertical-align:top;padding:10px 11px;border-bottom:1px solid var(--line)}th{background:#f6f8fa;color:#4d5966;font-size:12px;white-space:nowrap}tr:last-child td{border-bottom:0}.compact{font-size:12px}.compact th,.compact td{padding:8px}.decision{margin-top:20px;border-left:4px solid var(--accent);background:var(--accent-soft);padding:14px 16px;border-radius:8px}.decision>span{display:block;text-transform:uppercase;letter-spacing:.06em;font-size:11px;color:var(--muted);font-weight:750}.decision>strong{display:block;margin:3px 0 5px}.decision p:last-child{margin-bottom:0}.decision.small{margin-top:0}.gateway-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.details-stack{display:grid;gap:10px;margin-top:14px}.insight-detail{border:1px solid var(--line);border-radius:11px;background:#fff}.insight-detail summary{cursor:pointer;padding:13px 15px;display:flex;justify-content:space-between;gap:18px;font-weight:750;list-style:none}.insight-detail summary::-webkit-details-marker{display:none}.summary-meta{font-weight:500;color:var(--muted)}.detail-body{border-top:1px solid var(--line);padding:15px}.detail-body h4{margin:20px 0 6px}.assessment-line{background:#f8fafb;border-radius:8px;padding:10px}.callout{background:#f8fafb;border-left:4px solid var(--accent);border-radius:8px;padding:12px;margin-top:15px}.callout p{margin-bottom:0}.cap-conclusion{margin-bottom:0}.muted{color:var(--muted)}blockquote{margin:12px 0;padding-left:14px;border-left:3px solid var(--line);color:#4f5c68}code{background:#eef1f4;padding:1px 4px;border-radius:4px}pre{overflow:auto;background:#111827;color:#f3f4f6;padding:12px;border-radius:8px}.raw-html{color:#555;background:#f5f5f5}
@media(max-width:820px){.shell{padding:22px 14px 50px}.topbar{align-items:flex-start;flex-direction:column}.report-meta{text-align:left}.card-head{flex-direction:column}.trend{text-align:left}.card-columns,.two-col,.gateway-grid{grid-template-columns:1fr}.metric-grid,.cap-grid{grid-template-columns:1fr}.card-footer{align-items:flex-start;flex-direction:column}.open-channel{width:100%}.detail-header h1,.topbar h1{font-size:28px}.section-nav{overflow:auto}.section-nav a{white-space:nowrap}.detail-section{padding:17px}.compact{min-width:900px}}
</style></head><body><main class="shell">
<section id="dashboard-view"><header class="topbar"><div><span class="eyebrow">SideGig research</span><h1>Channel Insights Dashboard</h1><p class="subtitle">Market and capability findings for channels that have completed the current research methodology and passed structural validation.</p></div><div class="report-meta">Generated ${esc(generated)}<br>Progress source ${esc(sourceGeneratedAt ?? 'unknown')}</div></header>
<div class="summary-strip"><strong>${channels.length}</strong><span>completed channel${channels.length === 1 ? '' : 's'}</span></div>
${channels.length ? `<div class="controls"><input id="channel-search" type="search" placeholder="Search completed channels…" aria-label="Search completed channels"></div><div class="cards" id="channel-cards">${channels.map(card).join('')}</div>` : `<div class="empty">No channels currently meet the completed-and-valid criteria. Run the validation/progress workflow again after the first channel reaches completion.</div>`}
</section>
${channels.map(channelView).join('')}
<script>
const dashboard=document.getElementById('dashboard-view');
const views=[...document.querySelectorAll('[data-channel-view]')];
function showDashboard(updateHash=true){views.forEach(v=>v.hidden=true);dashboard.hidden=false;if(updateHash)history.pushState(null,'',location.pathname+location.search);window.scrollTo({top:0,behavior:'auto'});}
function showChannel(slug,updateHash=true){const view=document.querySelector('[data-channel-view="'+CSS.escape(slug)+'"]');if(!view)return;dashboard.hidden=true;views.forEach(v=>v.hidden=v!==view);if(updateHash)history.pushState(null,'','#channel='+encodeURIComponent(slug));window.scrollTo({top:0,behavior:'auto'});}
document.querySelectorAll('.open-channel').forEach(b=>b.addEventListener('click',()=>showChannel(b.dataset.channel)));
document.querySelectorAll('.back-button').forEach(b=>b.addEventListener('click',()=>showDashboard()));
const search=document.getElementById('channel-search');if(search)search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();document.querySelectorAll('.channel-card').forEach(c=>c.hidden=!!q&&!c.dataset.search.includes(q));});
function applyHash(){const m=location.hash.match(/^#channel=(.+)$/);if(m)showChannel(decodeURIComponent(m[1]),false);else showDashboard(false);}window.addEventListener('popstate',applyHash);applyHash();
</script></main></body></html>`;
}

function main() {
  if (!fs.existsSync(PROGRESS_JSON)) {
    throw new Error('research-validation-report.json was not found. Run npm run report:research first.');
  }
  const progress = JSON.parse(fs.readFileSync(PROGRESS_JSON, 'utf8'));
  const channels = buildChannels(progress);
  fs.writeFileSync(HTML_REPORT, buildHtml(channels, progress.generatedAt));
  console.log(`Generated ${rel(HTML_REPORT)} with ${channels.length} completed channel(s).`);
}

main();
