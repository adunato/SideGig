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
  table = table.replace('<th>Trend</th>', '<th class="opportunity-score-col">Opportunity Score</th><th>Trend</th>');
  table = table.replace(/(<thead><tr>[\s\S]*?)(<\/tr><\/thead>)/, '$1<th class="depth-col">Research depth</th>$2');

  table = table.replace(/<tr>([\s\S]*?)<\/tr>/g, (rowHtml, cellsHtml) => {
    if (/<th\b/.test(cellsHtml)) return rowHtml;

    const cells = cellsHtml.match(/<td[\s\S]*?<\/td>/g) ?? [];
    if (cells.length >= 10) {
      const scores = cells.slice(1, 8).map((cell) => {
        const text = decodeHtml(cell.replace(/<[^>]+>/g, '').trim());
        return Number.parseInt(text, 10);
      });
      if (scores.every(Number.isFinite)) {
        const opportunityScore = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
        cells.splice(8, 0, `<td class="opportunity-score-col"><strong>${opportunityScore}</strong></td>`);
        cellsHtml = cells.join('');
      }
    }

    const nameMatch = cellsHtml.match(/<td><strong>([\s\S]*?)<\/strong><\/td>/);
    if (!nameMatch) return `<tr>${cellsHtml}</tr>`;
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
/* Wide compact multi-channel overview and research-depth markers */
.shell{max-width:1800px}
.cards{grid-template-columns:1fr;gap:9px}
.channel-card{display:grid;grid-template-columns:minmax(185px,1.05fr) minmax(440px,2.8fr) minmax(330px,2fr) minmax(150px,.8fr);grid-template-areas:"head market capability footer";gap:14px;align-items:start;padding:11px 13px;border-radius:11px;box-shadow:0 3px 12px rgba(20,35,50,.045)}
.card-head{grid-area:head;display:block;min-width:0}.card-head h2{font-size:17px;line-height:1.15;margin:2px 0 7px}.card-head .eyebrow{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trend{text-align:left;display:flex;flex-direction:row;flex-wrap:wrap;gap:4px 8px;font-size:11px;line-height:1.25}.trend small{font-size:11px}
.card-columns{display:contents}.card-columns>section:first-child{grid-area:market;min-width:0}.card-columns>section:last-child{grid-area:capability;min-width:0}.card-columns h3{font-size:9px;margin:0 0 5px;letter-spacing:.08em}
.metric-grid{display:grid;grid-template-columns:repeat(4,minmax(88px,1fr));gap:4px}.cap-grid{display:grid;grid-template-columns:repeat(3,minmax(100px,1fr));gap:4px}
.metric,.cap-item{padding:4px 6px;border-radius:6px;font-size:10px;line-height:1.2;gap:4px;min-width:0}.metric span,.cap-item span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.score,.requirement{font-size:9px;min-width:21px;padding:1px 5px;flex:0 0 auto}
.card-footer{grid-area:footer;border-top:0;border-left:1px solid var(--line);padding:1px 0 1px 13px;margin:0;display:flex;flex-direction:column;justify-content:space-between;align-items:stretch;gap:8px;min-height:100%;font-size:10px;line-height:1.35}.card-footer span{color:var(--muted)}.open-channel{padding:6px 8px;font-size:10px;width:100%;white-space:nowrap}
.opportunity-score-col{white-space:nowrap;text-align:center;font-variant-numeric:tabular-nums}
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
  .metric-grid{grid-template-columns:repeat(4,minmax(80px,1fr))}.cap-grid{grid-template-columns:repeat(3,minmax(95px,1fr))}
  .card-footer{border-left:0;border-top:1px solid var(--line);padding:8px 0 0;display:flex;flex-direction:row;align-items:center;min-height:0}.open-channel{width:auto}
}
@media(max-width:620px){
  .card-head{display:block}.trend{text-align:left;justify-content:flex-start;margin-top:5px}
  .metric-grid,.cap-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .card-footer{align-items:flex-start;flex-direction:column}.open-channel{width:100%}
}
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
  console.log('Applied opportunity score, wide compact overview layout and deep-dive markers to research-insights-dashboard.html.');
}

main();
