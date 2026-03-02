#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = String(packageJson.version || '').trim();

if (!version) {
  console.error('package.json is missing a valid version field.');
  process.exit(1);
}

process.stdout.write(version.startsWith('v') ? version : `v${version}`);
