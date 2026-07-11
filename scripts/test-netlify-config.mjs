import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'aero-netlify-'));
const output = path.join(directory, 'config.js');
try {
  const valid = spawnSync(process.execPath, ['scripts/generate-netlify-config.mjs', '--output', output], {
    cwd: process.cwd(),
    env: { ...process.env, AERO_API_BASE_URL: 'https://aero-api.onrender.com/' },
    encoding: 'utf8',
  });
  assert.equal(valid.status, 0, valid.stderr);
  assert.match(fs.readFileSync(output, 'utf8'), /https:\/\/aero-api\.onrender\.com/);

  const invalid = spawnSync(process.execPath, ['scripts/generate-netlify-config.mjs', '--output', output], {
    cwd: process.cwd(),
    env: { ...process.env, AERO_API_BASE_URL: 'http://localhost:8000/api' },
    encoding: 'utf8',
  });
  assert.notEqual(invalid.status, 0);
  console.log('Netlify runtime config tests: OK');
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
