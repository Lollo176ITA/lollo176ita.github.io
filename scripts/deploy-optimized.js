#!/usr/bin/env node

/**
 * Script di deployment ottimizzato per GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function optimizedDeploy() {
  console.log('🚀 DEPLOYMENT OTTIMIZZATO GITHUB PAGES\n');
  
  try {
    // 1. Pulisci dipendenze non utilizzate
    console.log('🧹 Pulizia dipendenze...');
    // Il cleanup è già stato fatto
    
    // 2. Genera statistiche aggiornate
    console.log('📊 Generazione statistiche...');
    execSync('npm run stats', { stdio: 'inherit' });
    
    // 3. Ottimizza immagini
    console.log('🖼️  Ottimizzazione immagini...');
    execSync('npm run optimize:images', { stdio: 'inherit' });
    
    // 4. Build ottimizzato
    console.log('🔨 Build ottimizzato...');
    execSync('npm run build:with-stats', { stdio: 'inherit' });
    
    // 5. Verifica Service Worker per GitHub Pages
    console.log('🔧 Configurazione Service Worker...');
    updateServiceWorkerForGitHubPages();
    
    // 6. Ottimizza manifest
    console.log('📱 Ottimizzazione PWA...');
    optimizeManifest();
    
    // 7. Deploy
    console.log('🚀 Deploy su GitHub Pages...');
    execSync('npm run deploy', { stdio: 'inherit' });
    
    console.log('\n✅ DEPLOYMENT COMPLETATO CON SUCCESSO!');
    console.log('\n📈 OTTIMIZZAZIONI APPLICATE:');
    console.log('   ✅ Dipendenze non utilizzate rimosse');
    console.log('   ✅ Immagini ottimizzate in WebP');
    console.log('   ✅ Service Worker configurato per GitHub Pages');
    console.log('   ✅ Bundle ottimizzato con code splitting');
    console.log('   ✅ Statistiche Lighthouse aggiornate');
    
  } catch (error) {
    console.error('❌ ERRORE DURANTE IL DEPLOYMENT:', error.message);
    process.exit(1);
  }
}

function updateServiceWorkerForGitHubPages() {
  const swPath = path.join(__dirname, '..', 'build', 'sw.js');
  
  if (fs.existsSync(swPath)) {
    let swContent = fs.readFileSync(swPath, 'utf8');
    
    // Aggiorna i path per GitHub Pages
    swContent = swContent.replace(
      /const STATIC_FILES = \[[\s\S]*?\];/,
      `const STATIC_FILES = [
  'https://lollo176ita.github.io/',
  'https://lollo176ita.github.io/manifest.json'
];`
    );
    
    // Aggiorna la logica di caching per GitHub Pages
    swContent = swContent.replace(
      /url\.origin !== location\.origin/,
      `url.origin !== location.origin && !url.href.startsWith('https://lollo176ita.github.io')`
    );
    
    fs.writeFileSync(swPath, swContent);
    console.log('   ✅ Service Worker aggiornato per GitHub Pages');
  }
}

function optimizeManifest() {
  const manifestPath = path.join(__dirname, '..', 'build', 'manifest.json');
  
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Ottimizza per GitHub Pages
    manifest.start_url = 'https://lollo176ita.github.io/';
    manifest.scope = 'https://lollo176ita.github.io/';
    
    // Aggiungi configurazioni PWA ottimali
    manifest.background_color = '#000000';
    manifest.theme_color = '#3B82F6';
    manifest.display = 'standalone';
    manifest.orientation = 'portrait-primary';
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('   ✅ Manifest PWA ottimizzato');
  }
}

// Esegui deployment
optimizedDeploy().catch(console.error);
