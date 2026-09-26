#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const MANIFEST = path.join(ROOT, 'implementation/bootstrap/manifest.yaml');
const PRETTIER = path.join(ROOT, 'node_modules/prettier/bin/prettier.cjs');
const CONFIG = path.join(ROOT, 'implementation/bootstrap/prettier.config.json');
const manifest = fs.readFileSync(MANIFEST, 'utf8');
const sources = [...manifest.matchAll(/^\s+source:\s*(\S+)\s*$/gm)].map((match) => match[1]);

if (sources.length === 0) {
  throw new Error(`No installable sources found in ${path.relative(ROOT, MANIFEST)}.`);
}

for (const source of sources) {
  if (path.extname(source).toLowerCase() !== '.md') {
    throw new Error(`Bootstrap formatter only supports Markdown; found ${source}.`);
  }
  const absolutePath = path.resolve(ROOT, source);
  if (!absolutePath.startsWith(`${ROOT}${path.sep}`)) {
    throw new Error(`Bootstrap source escapes the repository: ${source}.`);
  }
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Bootstrap source is missing: ${source}.`);
  }
}

if (!fs.existsSync(PRETTIER)) {
  throw new Error('Prettier is not installed. Run npm ci before checking bootstrap formatting.');
}

const mode = process.argv.includes('--write') ? '--write' : '--check';
try {
  execFileSync(process.execPath, [PRETTIER, mode, '--config', CONFIG, ...sources], {
    cwd: ROOT,
    stdio: 'inherit',
  });
} catch (error) {
  if (typeof error.status === 'number') process.exit(error.status);
  throw error;
}
