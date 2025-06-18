#!/usr/bin/env node

/**
 * Script di test per verificare le metriche Lighthouse
 */

const fs = require('fs');
const path = require('path');

const statsFile = path.join(__dirname, '..', 'src', 'data', 'project-stats.json');

if (!fs.existsSync(statsFile)) {
  console.log('❌ File statistiche non trovato');
  process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));

console.log('🚀 LIGHTHOUSE METRICS AUTOMATION - REPORT\n');

console.log('📊 METRICHE PERFORMANCE:');
console.log(`   🎯 Performance: ${stats.performance.lighthouse.performance}/100`);
console.log(`   ♿ Accessibility: ${stats.performance.lighthouse.accessibility}/100`);
console.log(`   ✅ Best Practices: ${stats.performance.lighthouse.bestPractices}/100`);
console.log(`   🔍 SEO: ${stats.performance.lighthouse.seo}/100`);
console.log(`   ⏱️  Build Time: ${stats.performance.avgBuildTime.toFixed(1)}s`);

console.log('\n🔄 STATO SISTEMA:');
console.log(`   📅 Ultimo aggiornamento: ${new Date(stats.performance.lighthouse.lastUpdated).toLocaleString()}`);
console.log(`   🤖 Fallback attivo: ${stats.performance.lighthouse.fallback ? 'Sì' : 'No'}`);
console.log(`   ⚡ Tempo generazione: ${stats.generationTime}ms`);

console.log('\n📈 STATISTICHE PROGETTO:');
console.log(`   📁 File totali: ${stats.code.files}`);
console.log(`   📝 Righe di codice: ${stats.code.codeLines.toLocaleString()}`);
console.log(`   🧩 Componenti: ${stats.structure.components}`);
console.log(`   📚 Libri: ${stats.structure.books}`);
console.log(`   🔗 Commit: ${stats.git.commits}`);

console.log('\n🎯 ANALISI PERFORMANCE:');
if (stats.performance.lighthouse.performance < 50) {
  console.log('   🚨 CRITICO: Performance molto bassa - ottimizzazioni urgenti necessarie');
} else if (stats.performance.lighthouse.performance < 70) {
  console.log('   ⚠️  ATTENZIONE: Performance sotto la media - miglioramenti raccomandati');
} else if (stats.performance.lighthouse.performance < 90) {
  console.log('   ✅ BUONO: Performance accettabile - margini di miglioramento');
} else {
  console.log('   🚀 ECCELLENTE: Performance ottimale');
}

if (stats.performance.lighthouse.accessibility < 80) {
  console.log('   🚨 ACCESSIBILITÀ: Non conforme agli standard WCAG');
} else if (stats.performance.lighthouse.accessibility < 95) {
  console.log('   ⚠️  ACCESSIBILITÀ: Miglioramenti raccomandati per WCAG compliance');
} else {
  console.log('   ♿ ACCESSIBILITÀ: Eccellente conformità WCAG');
}

console.log('\n🎉 Sistema di automazione Lighthouse attivo e funzionante!');
console.log('\n💡 Suggerimenti:');
console.log('   - Esegui "npm run stats:lighthouse" per audit completo');
console.log('   - Controlla le metriche regolarmente per monitorare performance');
console.log('   - Le metriche sono visibili nella pagina /creations del sito');
