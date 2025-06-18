#!/usr/bin/env node

/**
 * Pre-commit hook per aggiornare automaticamente le statistiche del progetto
 * Questo script viene eseguito prima di ogni commit
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Pre-commit: Aggiornamento statistiche...');

try {
  // Genera le nuove statistiche
  execSync('node scripts/generate-stats.js', { stdio: 'inherit' });
  
  // Copia nella cartella public
  const sourceFile = path.join(process.cwd(), 'src/data/project-stats.json');
  const destFile = path.join(process.cwd(), 'public/project-stats.json');
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, destFile);
    console.log('✅ Statistiche copiate in public/');
  }
  
  // Aggiungi i file aggiornati al commit
  execSync('git add src/data/project-stats.json public/project-stats.json', { stdio: 'inherit' });
  
  console.log('✅ Pre-commit completato con successo!');
  
} catch (error) {
  console.error('❌ Errore durante pre-commit:', error.message);
  process.exit(1);
}
