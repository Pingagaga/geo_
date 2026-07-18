import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const input = path.join(root, 'geo_', 'hahow_courses.xlsx');
const output = path.join(root, 'geo_', 'data', 'hahow_courses.json');
const helper = path.join(root, 'scripts', 'xlsx_to_course_json.py');

if (!existsSync(input)) {
  console.error(`[course-data] Missing source Excel file: ${input}`);
  process.exit(1);
}

const candidates = [
  process.env.PYTHON,
  'python3',
  'python',
  'py',
].filter(Boolean);

let lastError = '';
for (const command of candidates) {
  const args = command === 'py'
    ? ['-3', helper, input, output]
    : [helper, input, output];
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status === 0) process.exit(0);
  lastError = result.error?.message || `exit ${result.status}`;
}

console.error(`[course-data] Could not run Python xlsx converter. Last error: ${lastError}`);
process.exit(1);
