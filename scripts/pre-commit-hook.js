#!/usr/bin/env node

/**
 * Pre-commit hook per aggiornare statistiche del progetto
 */

const { execa } = require('execa');

(async () => {
  try {
    await execa('pnpm', ['run', 'stats'], { stdio: 'pipe' });
    await execa('git', ['add', 'src/data/project-stats.json', 'public/project-stats.json'], { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Pre-commit error:', error.message);
    process.exit(1);
  }
})();
