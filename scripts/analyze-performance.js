#!/usr/bin/env node

/**
 * Analisi dettagliata performance e suggerimenti di ottimizzazione
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.cwd();

function analyzeBundle() {
  const buildPath = path.join(projectRoot, 'build');
  if (!fs.existsSync(buildPath)) {
    console.log('❌ Directory build non trovata. Esegui npm run build prima.');
    return {};
  }

  const staticPath = path.join(buildPath, 'static');
  const analysis = {
    totalSize: 0,
    jsSize: 0,
    cssSize: 0,
    mediaSize: 0,
    jsFiles: [],
    cssFiles: [],
    mediaFiles: []
  };

  function analyzeDirectory(dir, category) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile()) {
        const size = stat.size;
        analysis.totalSize += size;
        
        if (category === 'js') {
          analysis.jsSize += size;
          analysis.jsFiles.push({ name: file, size: size });
        } else if (category === 'css') {
          analysis.cssSize += size;
          analysis.cssFiles.push({ name: file, size: size });
        } else if (category === 'media') {
          analysis.mediaSize += size;
          analysis.mediaFiles.push({ name: file, size: size });
        }
      }
    });
  }

  analyzeDirectory(path.join(staticPath, 'js'), 'js');
  analyzeDirectory(path.join(staticPath, 'css'), 'css');
  analyzeDirectory(path.join(staticPath, 'media'), 'media');

  return analysis;
}

function analyzePackageJson() {
  const packagePath = path.join(projectRoot, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const heavyDeps = [];
  const deps = { ...packageData.dependencies, ...packageData.devDependencies };
  
  // Dipendenze note per essere "pesanti"
  const heavyLibraries = {
    'framer-motion': 'Animazioni pesanti - considera react-spring più leggero',
    'gsap': 'Libreria animazioni completa - usa solo moduli necessari',
    'react-tsparticles': 'Effetti particelle - lazy load o rimuovi se non essenziale',
    'swiper': 'Carousel completo - considera componente più leggero',
    'react-pageflip': 'Effetto flip 3D - potenzialmente pesante'
  };

  Object.keys(deps).forEach(dep => {
    if (heavyLibraries[dep]) {
      heavyDeps.push({ name: dep, reason: heavyLibraries[dep] });
    }
  });

  return { totalDeps: Object.keys(deps).length, heavyDeps };
}

function analyzeSourceCode() {
  const srcPath = path.join(projectRoot, 'src');
  const issues = [];

  function checkFile(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Check per problemi comuni di performance
    if (content.includes('import *')) {
      issues.push(`${fileName}: Import completo (*) - usa import specifici`);
    }
    
    if (content.match(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\},\s*\[\s*\]\s*\)/g)) {
      const effects = content.match(/useEffect/g);
      if (effects && effects.length > 3) {
        issues.push(`${fileName}: Troppi useEffect (${effects.length}) - considera ottimizzazione`);
      }
    }
    
    if (content.includes('getElementById') || content.includes('querySelector')) {
      issues.push(`${fileName}: DOM manipulation diretto - usa ref React`);
    }
    
    if (content.match(/\.map\s*\(\s*\([^)]*\)\s*=>\s*<[^>]*key=\{[^}]*Math\.random/)) {
      issues.push(`${fileName}: Key random in map - usa key stabili`);
    }
    
    // Controlla immagini non ottimizzate
    if (content.includes('.jpg') || content.includes('.png')) {
      issues.push(`${fileName}: Immagini non ottimizzate - considera WebP e lazy loading`);
    }
  }

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        checkFile(fullPath);
      }
    });
  }

  scanDirectory(srcPath);
  return issues;
}

async function generateOptimizationReport() {
  console.log('🔍 ANALISI PERFORMANCE DETTAGLIATA\n');

  // Analizza bundle
  console.log('📦 ANALISI BUNDLE:');
  const bundleAnalysis = analyzeBundle();
  
  if (bundleAnalysis.totalSize > 0) {
    console.log(`   📊 Dimensione totale: ${(bundleAnalysis.totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📜 JavaScript: ${(bundleAnalysis.jsSize / 1024).toFixed(1)} KB`);
    console.log(`   🎨 CSS: ${(bundleAnalysis.cssSize / 1024).toFixed(1)} KB`);
    console.log(`   🖼️  Media: ${(bundleAnalysis.mediaSize / 1024).toFixed(1)} KB`);
    
    // File JS più grandi
    const largestJs = bundleAnalysis.jsFiles
      .sort((a, b) => b.size - a.size)
      .slice(0, 3);
    
    if (largestJs.length > 0) {
      console.log('\n   📜 File JavaScript più grandi:');
      largestJs.forEach(file => {
        console.log(`      - ${file.name}: ${(file.size / 1024).toFixed(1)} KB`);
      });
    }
  } else {
    console.log('   ⚠️  Build non disponibile - esegui npm run build');
  }

  // Analizza dipendenze
  console.log('\n📚 ANALISI DIPENDENZE:');
  const depsAnalysis = analyzePackageJson();
  console.log(`   📦 Totale dipendenze: ${depsAnalysis.totalDeps}`);
  
  if (depsAnalysis.heavyDeps.length > 0) {
    console.log('   ⚠️  Dipendenze pesanti rilevate:');
    depsAnalysis.heavyDeps.forEach(dep => {
      console.log(`      - ${dep.name}: ${dep.reason}`);
    });
  }

  // Analizza codice sorgente
  console.log('\n🔧 ANALISI CODICE SORGENTE:');
  const codeIssues = analyzeSourceCode();
  
  if (codeIssues.length > 0) {
    console.log('   ⚠️  Problemi rilevati:');
    codeIssues.forEach(issue => {
      console.log(`      - ${issue}`);
    });
  } else {
    console.log('   ✅ Nessun problema evidente rilevato');
  }

  // Suggerimenti di ottimizzazione
  console.log('\n🚀 SUGGERIMENTI DI OTTIMIZZAZIONE:\n');
  
  console.log('1. 📦 OTTIMIZZAZIONI BUNDLE:');
  console.log('   - Code Splitting: Dividi il bundle in chunks più piccoli');
  console.log('   - Tree Shaking: Rimuovi codice non utilizzato');
  console.log('   - Lazy Loading: Carica componenti solo quando necessari');
  
  console.log('\n2. 🖼️  OTTIMIZZAZIONI MEDIA:');
  console.log('   - Converti immagini in formato WebP');
  console.log('   - Implementa lazy loading per immagini');
  console.log('   - Usa dimensioni responsive per immagini');
  
  console.log('\n3. ⚡ OTTIMIZZAZIONI RUNTIME:');
  console.log('   - Memoizza componenti pesanti con React.memo');
  console.log('   - Usa useMemo e useCallback per calcoli costosi');
  console.log('   - Ottimizza animazioni con will-change CSS');
  
  console.log('\n4. 🌐 OTTIMIZZAZIONI CARICAMENTO:');
  console.log('   - Implementa Service Worker per caching');
  console.log('   - Usa preload per risorse critiche');
  console.log('   - Minimizza Critical Rendering Path');
  
  console.log('\n5. 📱 OTTIMIZZAZIONI SPECIFICHE:');
  if (bundleAnalysis.jsSize > 500 * 1024) { // > 500KB
    console.log('   - ⚠️  Bundle JS molto grande - considera code splitting urgente');
  }
  if (depsAnalysis.heavyDeps.length > 0) {
    console.log('   - ⚠️  Sostituisci librerie pesanti con alternative più leggere');
  }
  if (bundleAnalysis.mediaSize > 1024 * 1024) { // > 1MB
    console.log('   - ⚠️  File media troppo grandi - ottimizza immagini');
  }

  console.log('\n💡 AZIONI IMMEDIATE RACCOMANDATE:');
  console.log('   1. Implementa React.lazy() per componenti non critici');
  console.log('   2. Ottimizza immagini (WebP, compressione)');
  console.log('   3. Rimuovi dipendenze non utilizzate');
  console.log('   4. Implementa lazy loading per animazioni pesanti');
  console.log('   5. Usa Dynamic Imports per librerie grandi');
}

generateOptimizationReport().catch(console.error);
