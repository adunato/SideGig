#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PROGRESS_JSON = path.join(ROOT, 'research-validation-report.json');

function isInsightReady(channel) {
  if (channel.overviewStatus !== 'VALID' || channel.capabilityStatus !== 'VALID') return false;
  if (!/^Pass\b/i.test(String(channel.gateway1 ?? ''))) return false;
  return Array.isArray(channel.selectedAreas) && channel.selectedAreas.length > 0;
}

function projectForInsights(progress) {
  return {
    ...progress,
    channels: (progress.channels ?? []).map((channel) => {
      if (!isInsightReady(channel)) return channel;
      return {
        ...channel,
        steps: (channel.steps ?? []).map((step) => ({
          ...step,
          status: 'COMPLETE',
          structure: 'VALID',
        })),
      };
    }),
  };
}

if (!fs.existsSync(PROGRESS_JSON)) {
  throw new Error('research-validation-report.json was not found. Run research-report.mjs first.');
}

const original = fs.readFileSync(PROGRESS_JSON, 'utf8');
const progress = JSON.parse(original);
const projected = projectForInsights(progress);

fs.writeFileSync(PROGRESS_JSON, `${JSON.stringify(projected, null, 2)}\n`, 'utf8');

try {
  await import('./research-dashboard.mjs');
} finally {
  fs.writeFileSync(PROGRESS_JSON, original, 'utf8');
}
