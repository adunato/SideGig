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
const POWERSHELL_FORMATTER = path.join(ROOT, 'implementation/bootstrap/check-powershell-format.ps1');
const POWERSHELL_FORMATTER_VERSION = path.join(ROOT, 'implementation/bootstrap/PSScriptAnalyzer.version');
const manifest = fs.readFileSync(MANIFEST, 'utf8');
const sources = [...manifest.matchAll(/^\s+source:\s*(\S+)\s*$/gm)].map((match) => match[1]);
const prettierExtensions = new Set(['.md', '.yaml', '.yml', '.json', '.js', '.mjs', '.cjs']);
const prettierSources = [];
const powershellSources = [];

if (sources.length === 0) {
  throw new Error(`No installable sources found in ${path.relative(ROOT, MANIFEST)}.`);
}

for (const source of sources) {
  const extension = path.extname(source).toLowerCase();
  if (prettierExtensions.has(extension)) prettierSources.push(source);
  else if (extension === '.ps1') powershellSources.push(source);
  else throw new Error(`No configured bootstrap formatter for ${extension || '(no extension)'}: ${source}.`);

  const absolutePath = path.resolve(ROOT, source);
  if (!absolutePath.startsWith(`${ROOT}${path.sep}`)) {
    throw new Error(`Bootstrap source escapes the repository: ${source}.`);
  }
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Bootstrap source is missing: ${source}.`);
  }
}

const mode = process.argv.includes('--write') ? '--write' : '--check';
function run(command, args, label) {
  try {
    execFileSync(command, args, { cwd: ROOT, stdio: 'inherit' });
  } catch (error) {
    if (error.code === 'ENOENT') {
      const missing = new Error(`${label} is required but was not found: ${command}.`);
      missing.code = 'ENOENT';
      throw missing;
    }
    if (typeof error.status === 'number') process.exit(error.status);
    throw error;
  }
}

if (prettierSources.length > 0) {
  if (!fs.existsSync(PRETTIER)) {
    throw new Error('Prettier is not installed. Run npm ci before checking bootstrap formatting.');
  }
  run(process.execPath, [PRETTIER, mode, '--config', CONFIG, ...prettierSources], 'Prettier');
}

if (powershellSources.length > 0) {
  if (!fs.existsSync(POWERSHELL_FORMATTER_VERSION)) {
    throw new Error(`Pinned PSScriptAnalyzer version file is missing: ${POWERSHELL_FORMATTER_VERSION}.`);
  }
  const requiredVersion = fs.readFileSync(POWERSHELL_FORMATTER_VERSION, 'utf8').trim();
  if (!requiredVersion) throw new Error('Pinned PSScriptAnalyzer version is empty.');

  const args = [
    '-NoProfile',
    '-NonInteractive',
    '-ExecutionPolicy',
    'Bypass',
    '-File',
    POWERSHELL_FORMATTER,
    '-Mode',
    mode === '--write' ? 'write' : 'check',
    '-RequiredVersion',
    requiredVersion,
    ...powershellSources,
  ];
  let lastMissingExecutable;
  for (const executable of ['pwsh', 'powershell']) {
    try {
      run(executable, args, 'PowerShell');
      lastMissingExecutable = undefined;
      break;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      lastMissingExecutable = error;
    }
  }
  if (lastMissingExecutable) {
    throw new Error('PowerShell Core (pwsh) or Windows PowerShell is required to format .ps1 sources.');
  }
}
