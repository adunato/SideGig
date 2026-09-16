#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HTML_REPORT = path.join(ROOT, 'research-insights-dashboard.html');
const PROGRESS_JSON = path.join(ROOT, 'research-validation-report.json');
const CHANNELS_DIR = path.join(ROOT, 'research', 'channels');

const REMOVED_MARKET_METRICS = new Set(['Production leverage', 'Operating burden']);
const MARKET_METRICS = [
  'Paying demand',
  'Opportunity density',
  'New-entrant attainability',
  'Revenue potential',
  'Competitive pressure',
];

function escRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function decodeHtml(value) {
  return String(value)
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'");
}

function plainText(html) {
  return decodeHtml(String(html).replace(/<[^>]+>/g, '').trim());
}

function capabilityLevel(value) {
  const text = String(value ?? '')
    .replace(/\*\*/g, '')
    .trim()
    .toLowerCase();
  if (text.startsWith('low-medium')) return 2;
  if (text.startsWith('medium-high')) return 4;
  if (text.startsWith('low')) return 1;
  if (text.startsWith('medium')) return 3;
  if (text.startsWith('high')) return 5;
  return null;
}

function capabilityScoresForChannel(slug) {
  const file = path.join(CHANNELS_DIR, slug, 'capability.md');
  if (!fs.existsSync(file)) return new Map();

  const raw = fs.readFileSync(file, 'utf8');
  const sectionMatch = raw.match(/## 2\. Opportunity-Area Capability Requirements\s*\n([\s\S]*?)(?=\n## |$)/);
  if (!sectionMatch) return new Map();

  const scores = new Map();
  const section = sectionMatch[1];
  const areaMatches = [...section.matchAll(/^### (.+)\s*$/gm)];

  for (let i = 0; i < areaMatches.length; i += 1) {
    const areaMatch = areaMatches[i];
    const area = areaMatch[1].trim();
    const bodyStart = areaMatch.index + areaMatch[0].length;
    const bodyEnd = i + 1 < areaMatches.length ? areaMatches[i + 1].index : section.length;
    const body = section.slice(bodyStart, bodyEnd);
    const values = [];

    for (const dimension of [
      'Technical complexity',
      'Domain expertise',
      'Data / resource access',
      'Operating complexity',
      'Cost intensity',
    ]) {
      const row = body.match(new RegExp(`^\\|\\s*${escRegex(dimension)}\\s*\\|\\s*([^|]+)\\|`, 'mi'));
      const level = row ? capabilityLevel(row[1]) : null;
      if (level !== null) values.push(level);
    }

    if (values.length === 5) {
      scores.set(area, (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1));
    }
  }

  return scores;
}

function opportunityScoreClass(score) {
  const n = Number.parseFloat(score);
  if (n >= 4) return 'high';
  if (n >= 3) return 'mid';
  return 'low';
}

function capabilityScoreClass(score) {
  const n = Number.parseFloat(score);
  if (!Number.isFinite(n)) return 'na';
  if (n <= 2) return 'low';
  if (n < 4) return 'mid';
  return 'high';
}

function rebuildOpportunityTable(table, deepDiveAreas, capabilityScores) {
  const headerMatch = table.match(/<thead><tr>([\s\S]*?)<\/tr><\/thead>/);
  if (!headerMatch) return table;
  const originalHeaders = [...headerMatch[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((match) => plainText(match[1]));
  if (!originalHeaders.length) return table;

  const keepIndexes = originalHeaders
    .map((header, index) => ({ header, index }))
    .filter(({ header }) => !REMOVED_MARKET_METRICS.has(header));
  const areaColumn = keepIndexes.find(({ header }) => header === 'Opportunity area');
  const remainingColumns = keepIndexes.filter(({ header }) => header !== 'Opportunity area');

  const finalHeaders = [
    '<th class="opportunity-score-col">Opportunity Score</th>',
    areaColumn ? '<th>Opportunity area</th>' : '',
    '<th class="capability-score-col" title="1 = lower capability requirement; 5 = higher capability requirement">Capability Score</th>',
    ...remainingColumns.map(({ header }) => `<th>${header}</th>`),
    '<th class="depth-col">Research depth</th>',
  ].join('');

  const bodyMatch = table.match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!bodyMatch) return table;
  const rows = bodyMatch[1].match(/<tr>[\s\S]*?<\/tr>/g) ?? [];

  const rebuiltRows = rows.map((rowHtml) => {
    const cells = rowHtml.match(/<td[\s\S]*?<\/td>/g) ?? [];
    if (!cells.length) return rowHtml;

    const areaIndex = originalHeaders.indexOf('Opportunity area');
    const area = areaIndex >= 0 && cells[areaIndex] ? plainText(cells[areaIndex]) : '';
    const scoreValues = MARKET_METRICS.map((metric) => {
      const index = originalHeaders.indexOf(metric);
      if (index < 0 || !cells[index]) return NaN;
      return Number.parseInt(plainText(cells[index]), 10);
    });
    const opportunityScore = scoreValues.every(Number.isFinite)
      ? (scoreValues.reduce((sum, score) => sum + score, 0) / scoreValues.length).toFixed(1)
      : '—';
    const opportunityClass = opportunityScore === '—' ? 'na' : opportunityScoreClass(opportunityScore);

    const capabilityScore = capabilityScores.get(area) ?? '—';
    const capabilityClass = capabilityScoreClass(capabilityScore);
    const deepDive = deepDiveAreas.has(area);
    const marker = deepDive
      ? '<td class="depth-col"><span class="depth-badge deep">✓ Deep dive</span></td>'
      : '<td class="depth-col"><span class="depth-badge assessed">Assessment only</span></td>';

    const areaCell = areaColumn && cells[areaColumn.index] ? cells[areaColumn.index] : '';
    const remainingCells = remainingColumns.map(({ index }) => cells[index]).filter(Boolean).join('');

    return `<tr><td class="opportunity-score-col opportunity-score-${opportunityClass}"><strong>${opportunityScore}</strong></td>${areaCell}<td class="capability-score-col capability-score-${capabilityClass}"><strong>${capabilityScore}</strong></td>${remainingCells}${marker}</tr>`;
  }).join('');

  return table
    .replace(headerMatch[0], `<thead><tr>${finalHeaders}</tr></thead>`)
    .replace(bodyMatch[0], `<tbody>${rebuiltRows}</tbody>`);
}

function updateOpportunitySection(sectionHtml, deepDiveAreas, capabilityScores) {
  const tableMatch = sectionHtml.match(/<table class="compact">[\s\S]*?<\/table>/);
  if (!tableMatch) return sectionHtml;

  let out = sectionHtml.replace(tableMatch[0], rebuildOpportunityTable(tableMatch[0], deepDiveAreas, capabilityScores));

  for (const area of deepDiveAreas) {
    const pattern = new RegExp(`(<details class="insight-detail"><summary><span>${escRegex(area)}</span>)`, 'g');
    out = out.replace(pattern, '$1<span class="depth-badge deep detail-depth">✓ Deep dive</span>');
  }

  return out;
}

function removeMarketMetricsFromDashboard(html) {
  for (const metric of REMOVED_MARKET_METRICS) {
    const escaped = escRegex(metric);
    html = html.replace(new RegExp(`<div class="metric"><span>${escaped}<\\/span><strong[\\s\\S]*?<\\/strong><\\/div>`, 'g'), '');
    html = html.replace(new RegExp(`<tr><td><strong>${escaped}<\\/strong><\\/td>[\\s\\S]*?<\\/tr>`, 'g'), '');
    html = html.replace(new RegExp(`\\s*·\\s*${escaped}[^·<]*`, 'gi'), '');
  }

  html = html.replace(
    /Production leverage is exceptionally high, but the evidence does not currently show that generic community entrants capture demand easily\./gi,
    '',
  );
  html = html.replace(/Operating burden is also high because /gi, 'Ongoing maintenance is substantial because ');
  html = html.replace(/operating burden remain material/gi, 'ongoing reliability demands remain material');
  html = html.replace(/keep operating burden material/gi, 'create ongoing reliability demands');
  html = html.replace(/<li><p><strong>Operating burden varies within an area\.<\/strong>[\s\S]*?<\/p><\/li>/gi, '');

  return html;
}

function main() {
  if (!fs.existsSync(HTML_REPORT)) throw new Error('research-insights-dashboard.html was not found. Run research-dashboard.mjs first.');
  if (!fs.existsSync(PROGRESS_JSON)) throw new Error('research-validation-report.json was not found. Run research-report.mjs first.');

  const progress = JSON.parse(fs.readFileSync(PROGRESS_JSON, 'utf8'));
  let html = fs.readFileSync(HTML_REPORT, 'utf8');

  const compactCss = `
/* Wide compact multi-channel overview, summary scores and research-depth markers */
.shell{max-width:1800px}
.cards{grid-template-columns:1fr;gap:9px}
.channel-card{display:grid;grid-template-columns:minmax(185px,1.05fr) minmax(440px,2.8fr) minmax(330px,2fr) minmax(150px,.8fr);grid-template-areas:"head market capability footer";gap:14px;align-items:start;padding:11px 13px;border-radius:11px;box-shadow:0 3px 12px rgba(20,35,50,.045)}
.card-head{grid-area:head;display:block;min-width:0}.card-head h2{font-size:17px;line-height:1.15;margin:2px 0 7px}.card-head .eyebrow{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trend{text-align:left;display:flex;flex-direction:row;flex-wrap:wrap;gap:4px 8px;font-size:11px;line-height:1.25}.trend small{font-size:11px}
.card-columns{display:contents}.card-columns>section:first-child{grid-area:market;min-width:0}.card-columns>section:last-child{grid-area:capability;min-width:0}.card-columns h3{font-size:9px;margin:0 0 5px;letter-spacing:.08em}
.metric-grid{display:grid;grid-template-columns:repeat(3,minmax(88px,1fr));gap:4px}.cap-grid{display:grid;grid-template-columns:repeat(3,minmax(100px,1fr));gap:4px}
.metric,.cap-item{padding:4px 6px;border-radius:6px;font-size:10px;line-height:1.2;gap:4px;min-width:0}.metric span,.cap-item span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.score,.requirement{font-size:9px;min-width:21px;padding:1px 5px;flex:0 0 auto}
.card-footer{grid-area:footer;border-top:0;border-left:1px solid var(--line);padding:1px 0 1px 13px;margin:0;display:flex;flex-direction:column;justify-content:space-between;align-items:stretch;gap:8px;min-height:100%;font-size:10px;line-height:1.35}.card-footer span{color:var(--muted)}.open-channel{padding:6px 8px;font-size:10px;width:100%;white-space:nowrap}
th.opportunity-score-col,th.capability-score-col{white-space:nowrap;text-align:center;font-variant-numeric:tabular-nums;background:var(--accent-soft);color:var(--accent);font-weight:800}
td.opportunity-score-col,td.capability-score-col{white-space:nowrap;text-align:center;font-variant-numeric:tabular-nums;font-size:14px;font-weight:800;border-right:2px solid var(--surface)}
td.opportunity-score-high{background:var(--high-bg);color:var(--high)}
td.opportunity-score-mid{background:var(--mid-bg);color:var(--mid)}
td.opportunity-score-low{background:var(--low-bg);color:var(--low)}
td.opportunity-score-na,td.capability-score-na{background:#f5f6f8;color:var(--muted)}
td.capability-score-low{background:var(--high-bg);color:var(--high)}
td.capability-score-mid{background:var(--mid-bg);color:var(--mid)}
td.capability-score-high{background:var(--low-bg);color:var(--low)}
.depth-col{white-space:nowrap}.depth-badge{display:inline-flex;align-items:center;border-radius:999px;padding:3px 8px;font-size:11px;font-weight:750;white-space:nowrap}
.depth-badge.deep{background:var(--high-bg);color:var(--high)}.depth-badge.assessed{background:#edf1f4;color:#657180}
.detail-depth{margin-left:8px}.insight-detail summary{display:flex;align-items:center;gap:8px}.insight-detail .summary-meta{margin-left:auto}
@media(max-width:1250px){
  .channel-card{grid-template-columns:minmax(190px,.9fr) minmax(420px,2.2fr) minmax(150px,.7fr);grid-template-areas:"head market footer" "head capability footer";align-items:stretch}
  .card-columns>section:last-child{align-self:end}.cap-grid{grid-template-columns:repeat(5,minmax(90px,1fr))}
}
@media(max-width:900px){
  .channel-card{grid-template-columns:1fr;grid-template-areas:"head" "market" "capability" "footer";gap:9px;padding:12px}
  .card-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.trend{text-align:right;justify-content:flex-end}
  .metric-grid{grid-template-columns:repeat(3,minmax(80px,1fr))}.cap-grid{grid-template-columns:repeat(3,minmax(95px,1fr))}
  .card-footer{border-left:0;border-top:1px solid var(--line);padding:8px 0 0;display:flex;flex-direction:row;align-items:center;min-height:0}.open-channel{width:auto}
}
@media(max-width:620px){
  .card-head{display:block}.trend{text-align:left;justify-content:flex-start;margin-top:5px}
  .metric-grid,.cap-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .card-footer{align-items:flex-start;flex-direction:column}.open-channel{width:100%}
}
`;

  html = removeMarketMetricsFromDashboard(html);
  html = html.replace('</style>', `${compactCss}</style>`);

  for (const channel of progress.channels ?? []) {
    const deepDiveAreas = new Set(channel.selectedAreas ?? []);
    const capabilityScores = capabilityScoresForChannel(channel.slug);
    const startToken = `<section class="detail-section" id="opportunities-${channel.slug}">`;
    const start = html.indexOf(startToken);
    if (start < 0) continue;
    const nextSection = html.indexOf('<section class="detail-section"', start + startToken.length);
    const end = nextSection >= 0 ? nextSection : html.indexOf('</section>\n  </section>', start);
    if (end < 0) continue;
    const sectionHtml = html.slice(start, end);
    html = html.slice(0, start) + updateOpportunitySection(sectionHtml, deepDiveAreas, capabilityScores) + html.slice(end);
  }

  fs.writeFileSync(HTML_REPORT, html);
  console.log('Applied five-metric opportunity scoring, capability scores and research-depth markers to research-insights-dashboard.html.');
}

main();
