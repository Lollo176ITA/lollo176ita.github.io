#!/usr/bin/env node

/**
 * Script di deployment ottimizzato per GitHub Pages
 */

const fs = require('fs').promises;
const path = require('path');
const { execa } = require('execa');

const projectRoot = process.cwd();

async function runCommand(command, args) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  await execa(command, args, { stdio: 'inherit', cwd: projectRoot });
}

async function optimizedDeploy() {
  console.log('🚀 DEPLOYMENT OTTIMIZZATO PER GITHUB PAGES\n');
  
  try {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const homepageUrl = packageJson.homepage;

    if (!homepageUrl) {
      throw new Error("Il campo 'homepage' non è definito in package.json. Impossibile procedere.");
    }

    // 1. Genera statistiche aggiornate con Lighthouse
    console.log('📊 Generazione statistiche con Lighthouse...');
    await runCommand('pnpm', ['run', 'stats:lighthouse']);
    
    // 2. Build ottimizzato
    console.log('🔨 Build ottimizzato...');
    await runCommand('pnpm', ['run', 'build:prod']);
    
    // 3. Copia le statistiche
    console.log('📋 Copia delle statistiche...');
    await runCommand('pnpm', ['run', 'stats:copy']);
    
    // 4. Configurazione Service Worker e Manifest
    console.log('🔧 Configurazione PWA per GitHub Pages...');
    await Promise.all([
      updateServiceWorkerForGitHubPages(homepageUrl),
      optimizeManifest(homepageUrl)
    ]);
    
    // 5. Deploy
    console.log('🚀 Deploy su GitHub Pages...');
    await runCommand('pnpm', ['run', 'deploy']);
    
    console.log('\n✅ DEPLOYMENT COMPLETATO CON SUCCESSO!');
    console.log('\n📈 OTTIMIZZAZIONI APPLICATE:');
    console.log('   ✅ Statistiche del progetto aggiornate con Lighthouse');
    console.log('   ✅ Bundle ottimizzato con le ultime statistiche');
    console.log('   ✅ Service Worker e Manifest configurati per l\'ambiente di produzione');
    
  } catch (error) {
    console.error('❌ ERRORE DURANTE IL DEPLOYMENT:', error.message);
    if (error.stderr) {
      console.error('   Dettagli:', error.stderr);
    }
    process.exit(1);
  }
}

async function updateServiceWorkerForGitHubPages(homepage) {
  const swPath = path.join(projectRoot, 'build', 'sw.js');
  try {
    let swContent = await fs.readFile(swPath, 'utf8');
    
    const homepageUrl = new URL(homepage);
    const basePath = homepageUrl.pathname.endsWith('/') ? homepageUrl.pathname : `${homepageUrl.pathname}/`;

    // Aggiorna i path per essere relativi alla homepage
    swContent = swContent.replace(
      /const STATIC_FILES = \[[\s\S]*?\];/,
      `const STATIC_FILES = [\n  '${basePath}',\n  '${basePath}manifest.json'\n];`
    );
    
    // Aggiorna la logica di caching per non intercettare richieste cross-origin
    swContent = swContent.replace(
      /url\.origin !== location\.origin/,
      `url.origin !== location.origin && !url.href.startsWith('${homepageUrl.origin}')`
    );
    
    await fs.writeFile(swPath, swContent);
    console.log('   ✅ Service Worker aggiornato per GitHub Pages');
  } catch (error) {
    console.warn(`⚠️  Attenzione: Impossibile aggiornare il Service Worker. File non trovato o illeggibile. (${swPath})`);
  }
}

async function optimizeManifest(homepage) {
  const manifestPath = path.join(projectRoot, 'build', 'manifest.json');
  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    
    const homepageUrl = new URL(homepage);
    const basePath = homepageUrl.pathname.endsWith('/') ? homepageUrl.pathname : `${homepageUrl.pathname}/`;

    // Ottimizza per GitHub Pages
    manifest.start_url = basePath;
    manifest.scope = basePath;
    
    // Aggiungi/aggiorna configurazioni PWA ottimali
    manifest.background_color = '#000000';
    manifest.theme_color = '#3B82F6';
    manifest.display = 'standalone';
    manifest.orientation = 'portrait-primary';
    
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('   ✅ Manifest PWA ottimizzato');
  } catch (error) {
    console.warn(`⚠️  Attenzione: Impossibile ottimizzare il manifest. File non trovato o illeggibile. (${manifestPath})`);
  }
}

// Esegui deployment
optimizedDeploy();
