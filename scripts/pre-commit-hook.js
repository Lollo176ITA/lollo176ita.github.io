#!/usr/bin/env node

/**
 * Pre-commit hook per aggiornare statistiche del progetto
 */

const { execa } = require('execa');

(async () => {
  console.log('🔄 Pre-commit: Updating stats...');
   
  try {
    await execa('pnpm', ['run', 'stats'], { stdio: 'inherit' });
    await execa('git', ['add', 'src/data/project-stats.json', 'public/project-stats.json'], { stdio: 'inherit' });
    console.log('✅ Pre-commit completed!');
  } catch (error) {
    console.error('❌ Pre-commit error:', error.message);
    process.exit(1);
  }
})();
