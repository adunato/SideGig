#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HTML_REPORT = path.join(ROOT, 'research-insights-dashboard.html');
const PROGRESS_JSON = path.join(ROOT, 'research-validation-report.json');
const CHANNELS_DIR = path.join(ROOT, 'research', 'channels');

const CAPABILITY_DIMENSIONS = [
  'Technical complexity',
  'Domain expertise',
  'Data / resource access',
  'Operating complexity',
  'Cost intensity',
];

function escRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function encodeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function decodeHtml(value) {
  return String(value)
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'");
}

function plainText(value) {
  return decodeHtml(String(value).replace(/<[^>]+>/g, '').trim());
}

function capabilityScoreClass(score) {
  const n = Number.parseFloat(score);
  if (!Number.isFinite(n)) return 'na';
  if (n <= 2) return 'low';
  if (n < 4) return 'mid';
  return 'high';
}

function parseCapabilityScores(slug) {
  const file = path.join(CHANNELS_DIR, slug, 'capability.md');
  if (!fs.existsSync(file)) return new Map();

  const raw = fs.readFileSync(file, 'utf8');
  const sectionMatch = raw.match(/## 2\. Opportunity-Area Capability Requirements\s*\n([\s\S]*?)(?=\n## |$)/);
  if (!sectionMatch) return new Map();

  const section = sectionMatch[1];
  const areaMatches = [...section.matchAll(/^### (.+)\s*$/gm)];
  const result = new Map();

  for (let i = 0; i < areaMatches.length; i += 1) {
    const area = areaMatches[i][1].trim();
    const start = areaMatches[i].index + areaMatches[i][0].length;
    const end = i + 1 < areaMatches.length ? areaMatches[i + 1].index : section.length;
    const body = section.slice(start, end);
    const dimensions = new Map();

    for (const dimension of CAPABILITY_DIMENSIONS) {
      const line = body.split('\n').find((candidate) => candidate.trim().startsWith(`| ${dimension} |`));
      if (!line) continue;
      const cells = line.split('|').slice(1, -1).map((cell) => cell.replace(/\*\*/g, '').trim());
      const score = Number.parseInt(cells[1], 10);
      if (Number.isFinite(score) && score >= 1 && score <= 5) dimensions.set(dimension, score);
    }

    if (dimensions.size === CAPABILITY_DIMENSIONS.length) {
      const values = [...dimensions.values()];
      const overall = (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
      result.set(area, { overall, dimensions });
    }
  }

  return result;
}

function updateOpportunityTable(sectionHtml, capabilityData) {
  const tableMatch = sectionHtml.match(/<table class="compact">[\s\S]*?<\/table>/);
  if (!tableMatch) return sectionHtml;

  let table = tableMatch[0];
  const headerMatch = table.match(/<thead><tr>([\s\S]*?)<\/tr><\/thead>/);
  if (!headerMatch) return sectionHtml;
  const headers = [...headerMatch[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((match) => plainText(match[1]));
  const areaIndex = headers.indexOf('Opportunity area');
  const capabilityIndex = headers.indexOf('Capability Score');

  if (areaIndex >= 0 && capabilityIndex >= 0) {
    table = table.replace(/<tbody>([\s\S]*?)<\/tbody>/, (tbodyHtml, body) => {
      const rows = body.match(/<tr>[\s\S]*?<\/tr>/g) ?? [];
      const updated = rows.map((row) => {
        const cells = row.match(/<td[\s\S]*?<\/td>/g) ?? [];
        if (!cells[areaIndex] || !cells[capabilityIndex]) return row;
        const area = plainText(cells[areaIndex]);
        const data = capabilityData.get(area);
        if (!data) return row;
        const cls = capabilityScoreClass(data.overall);
        cells[capabilityIndex] = `<td class="capability-score-col capability-score-${cls}"><strong>${data.overall}</strong></td>`;
        return `<tr>${cells.join('')}</tr>`;
      }).join('');
      return `<tbody>${updated}</tbody>`;
    });
  }

  const legend = `<div class="column-legend"><strong>Column definitions</strong><span><b>Opportunity Score</b> — average of the five market scores; 1–5, higher = more attractive.</span><span><b>Capability Score</b> — average of the five scored capability dimensions after a deep dive; 1 = lower requirements, 5 = higher requirements. “—” means not yet assessed.</span><span><b>Market metric cells</b> — number = attractiveness score; H/M/L = confidence in that score.</span><span><b>Trend</b> — observed market direction. <b>Overall confidence</b> — confidence in the market assessment.</span><span><b>Research depth</b> — Assessment only or Deep dive.</span></div>`;

  return sectionHtml.replace(tableMatch[0], `${table}${legend}`);
}

function updateCapabilitySynthesis(sectionHtml, capabilityData) {
  let out = sectionHtml;

  for (const [area, data] of capabilityData.entries()) {
    const cls = capabilityScoreClass(data.overall);
    const areaHtml = encodeHtml(area);
    const areaEscaped = escRegex(areaHtml);
    const blockPattern = new RegExp(`(<details class="insight-detail"><summary><span>${areaEscaped}<\\/span><span class="summary-meta">Capability synthesis<\\/span><\\/summary><div class="detail-body">)([\\s\\S]*?)(<\\/div><\\/details>)`);
    const match = out.match(blockPattern);
    if (!match) continue;

    let body = match[2];
    const tableMatch = body.match(/<table>[\s\S]*?<\/table>/);
    if (tableMatch && !/<th[^>]*>Score<\/th>/.test(tableMatch[0])) {
      let table = tableMatch[0];
      table = table.replace('<th>Dimension</th>', '<th>Dimension</th><th class="capability-dimension-score">Score</th>');
      table = table.replace(/<tr>([\s\S]*?)<\/tr>/g, (rowHtml, cellsHtml) => {
        if (/<th\b/.test(cellsHtml)) return rowHtml;
        const dimensionMatch = cellsHtml.match(/<td><strong>([\s\S]*?)<\/strong><\/td>/);
        if (!dimensionMatch) return rowHtml;
        const dimension = plainText(dimensionMatch[1]);
        const score = data.dimensions.get(dimension);
        if (!score) return rowHtml;
        const scoreCls = capabilityScoreClass(score);
        const firstCell = dimensionMatch[0];
        const replacement = `${firstCell}<td class="capability-dimension-score capability-score-${scoreCls}"><strong>${score}</strong></td>`;
        return `<tr>${cellsHtml.replace(firstCell, replacement)}</tr>`;
      });
      body = body.replace(tableMatch[0], table);
    }

    const replacement = `<details class="insight-detail"><summary><span>${areaHtml}</span><span class="summary-meta">Capability synthesis <span class="capability-score-pill capability-score-${cls}">Score ${data.overall}</span></span></summary><div class="detail-body">${body}</div></details>`;
    out = out.replace(blockPattern, () => replacement);
  }

  return out;
}

function main() {
  if (!fs.existsSync(HTML_REPORT)) throw new Error('research-insights-dashboard.html was not found.');
  if (!fs.existsSync(PROGRESS_JSON)) throw new Error('research-validation-report.json was not found.');

  const progress = JSON.parse(fs.readFileSync(PROGRESS_JSON, 'utf8'));
  let html = fs.readFileSync(HTML_REPORT, 'utf8');

  const css = `
/* Explicit capability scoring and opportunity-table legend */
.column-legend{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 18px;margin:-8px 0 20px;padding:10px 12px;border:1px solid var(--line);border-top:0;border-radius:0 0 10px 10px;background:#f8fafb;color:var(--muted);font-size:11px;line-height:1.4}
.column-legend>strong{grid-column:1/-1;color:var(--text);font-size:11px;text-transform:uppercase;letter-spacing:.05em}.column-legend b{color:var(--text)}
.capability-score-pill{display:inline-flex;align-items:center;margin-left:7px;padding:2px 7px;border-radius:999px;font-size:11px;font-weight:800;white-space:nowrap}
th.capability-dimension-score,td.capability-dimension-score{text-align:center;white-space:nowrap;font-variant-numeric:tabular-nums}
td.capability-dimension-score{font-size:13px;font-weight:800}
.capability-score-low{background:var(--high-bg)!important;color:var(--high)!important}.capability-score-mid{background:var(--mid-bg)!important;color:var(--mid)!important}.capability-score-high{background:var(--low-bg)!important;color:var(--low)!important}
@media(max-width:720px){.column-legend{grid-template-columns:1fr}}
`;
  html = html.replace('</style>', `${css}</style>`);

  for (const channel of progress.channels ?? []) {
    const capabilityData = parseCapabilityScores(channel.slug);

    const opportunityToken = `<section class="detail-section" id="opportunities-${channel.slug}">`;
    let start = html.indexOf(opportunityToken);
    if (start >= 0) {
      let end = html.indexOf('<section class="detail-section"', start + opportunityToken.length);
      if (end < 0) end = html.length;
      const section = html.slice(start, end);
      html = html.slice(0, start) + updateOpportunityTable(section, capabilityData) + html.slice(end);
    }

    const capabilityToken = `<section class="detail-section" id="capability-${channel.slug}">`;
    start = html.indexOf(capabilityToken);
    if (start >= 0) {
      let end = html.indexOf('</section>\n  </section>', start);
      if (end < 0) end = html.length;
      const section = html.slice(start, end);
      html = html.slice(0, start) + updateCapabilitySynthesis(section, capabilityData) + html.slice(end);
    }
  }

  fs.writeFileSync(HTML_REPORT, html);
  console.log('Applied explicit capability scoring, synthesis header scores and Section 2 column legend.');
}

main();
