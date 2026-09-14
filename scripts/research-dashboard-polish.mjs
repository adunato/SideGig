#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HTML_REPORT = path.join(ROOT, 'research-insights-dashboard.html');
const PROGRESS_JSON = path.join(ROOT, 'research-validation-report.json');

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

function addDeepDiveColumn(sectionHtml, deepDiveAreas) {
  const tableMatch = sectionHtml.match(/<table class="compact">[\s\S]*?<\/table>/);
  if (!tableMatch) return sectionHtml;

  let table = tableMatch[0];
  table = table.replace(/(<thead><tr>[\s\S]*?)(<\/tr><\/thead>)/, '$1<th class="depth-col">Research depth</th>$2');

  table = table.replace(/<tr>([\s\S]*?)<\/tr>/g, (rowHtml, cellsHtml) => {
    if (/<th\b/.test(cellsHtml)) return rowHtml;
    const nameMatch = cellsHtml.match(/<td><strong>([\s\S]*?)<\/strong><\/td>/);
    if (!nameMatch) return rowHtml;
    const area = decodeHtml(nameMatch[1].replace(/<[^>]+>/g, '').trim());
    const deepDive = deepDiveAreas.has(area);
    const marker = deepDive
      ? '<td class="depth-col"><span class="depth-badge deep">✓ Deep dive</span></td>'
      : '<td class="depth-col"><span class="depth-badge assessed">Assessment only</span></td>';
    return `<tr>${cellsHtml}${marker}</tr>`;
  });

  let out = sectionHtml.replace(tableMatch[0], table);

  for (const area of deepDiveAreas) {
    const pattern = new RegExp(`(<details class="insight-detail"><summary><span>${escRegex(area)}</span>)`, 'g');
    out = out.replace(pattern, '$1<span class="depth-badge deep detail-depth">✓ Deep dive</span>');
  }

  return out;
}

function main() {
  if (!fs.existsSync(HTML_REPORT)) throw new Error('research-insights-dashboard.html was not found. Run research-dashboard.mjs first.');
  if (!fs.existsSync(PROGRESS_JSON)) throw new Error('research-validation-report.json was not found. Run research-report.mjs first.');

  const progress = JSON.parse(fs.readFileSync(PROGRESS_JSON, 'utf8'));
  let html = fs.readFileSync(HTML_REPORT, 'utf8');

  const compactCss = `
/* Compact multi-channel overview and research-depth markers */
.cards{grid-template-columns:repeat(auto-fill,minmax(430px,1fr));gap:12px}
.channel-card{padding:14px;border-radius:12px;box-shadow:0 5px 16px rgba(20,35,50,.05)}
.card-head{gap:12px}.card-head h2{font-size:18px;margin-top:1px}.trend{font-size:12px}
.card-columns{grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}.card-columns h3{font-size:10px;margin-bottom:6px}
.metric-grid,.cap-grid{display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start}
.metric,.cap-item{padding:4px 6px;border-radius:7px;font-size:11px;gap:5px;min-width:0}
.metric span,.cap-item span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
.score,.requirement{font-size:10px;min-width:23px;padding:1px 5px}
.card-footer{padding-top:9px;margin-top:10px;font-size:11px}.open-channel{padding:6px 9px;font-size:11px}
.depth-col{white-space:nowrap}.depth-badge{display:inline-flex;align-items:center;border-radius:999px;padding:3px 8px;font-size:11px;font-weight:750;white-space:nowrap}
.depth-badge.deep{background:var(--high-bg);color:var(--high)}.depth-badge.assessed{background:#edf1f4;color:#657180}
.detail-depth{margin-left:8px}.insight-detail summary{display:flex;align-items:center;gap:8px}.insight-detail .summary-meta{margin-left:auto}
@media(max-width:760px){.cards{grid-template-columns:1fr}.card-columns{grid-template-columns:1fr}.metric span,.cap-item span{max-width:none}}
`;

  html = html.replace('</style>', `${compactCss}</style>`);

  for (const channel of progress.channels ?? []) {
    const deepDiveAreas = new Set(channel.selectedAreas ?? []);
    const startToken = `<section class="detail-section" id="opportunities-${channel.slug}">`;
    const start = html.indexOf(startToken);
    if (start < 0) continue;
    const nextSection = html.indexOf('<section class="detail-section"', start + startToken.length);
    const end = nextSection >= 0 ? nextSection : html.indexOf('</section>\n  </section>', start);
    if (end < 0) continue;
    const sectionHtml = html.slice(start, end);
    html = html.slice(0, start) + addDeepDiveColumn(sectionHtml, deepDiveAreas) + html.slice(end);
  }

  fs.writeFileSync(HTML_REPORT, html);
  console.log('Applied compact overview layout and deep-dive markers to research-insights-dashboard.html.');
}

main();
