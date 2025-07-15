#!/usr/bin/env node

/**
 * Pre-commit hook per aggiornare automaticamente le statistiche del progetto
 * Questo script viene eseguito prima di ogni commit
 */

const fs = require('fs').promises;
const { execa } = require('execa');
const path = require('path');

// Aiuta a eseguire comandi shell in modo asincrono
async function runCommand(cmd, args) {
  await execa(cmd, args, { stdio: 'inherit', cwd: process.cwd() });
}

(async () => {
  console.log('🔄 Pre-commit: Aggiornamento statistiche con Lighthouse...');
   
  try {
    // Genera le nuove statistiche con Lighthouse
    await runCommand('node', ['scripts/lighthouse-stats.js']);
     
    // Copia nella cartella public
    const sourceFile = path.join(process.cwd(), 'src/data/project-stats.json');
    const destFile = path.join(process.cwd(), 'public/project-stats.json');
    try {
      await fs.copyFile(sourceFile, destFile);
      console.log('✅ Statistiche copiate in public/');
    } catch {
      console.warn('⚠️  Nessun file di statistica da copiare');
    }
     
    // Aggiungi i file aggiornati al commit
    await runCommand('git', ['add', 'src/data/project-stats.json', 'public/project-stats.json']);
     
    console.log('✅ Pre-commit completato con successo!');
  } catch (error) {
    console.error('❌ Errore durante pre-commit:', error.message);
    process.exit(1);
  }
})();
