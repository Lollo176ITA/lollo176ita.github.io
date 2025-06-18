#!/usr/bin/env node

/**
 * Analizza le dipendenze effettivamente utilizzate nel progetto
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

function analyzeUsedDependencies() {
  const packagePath = path.join(projectRoot, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const allDependencies = {
    ...packageData.dependencies,
    ...packageData.devDependencies
  };
  
  const usedDependencies = new Set();
  const unusedDependencies = [];
  const heavyDependencies = [];
  
  // Scansiona tutti i file per trovare importazioni
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !['node_modules', 'build', '.git'].includes(item)) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.jsx'))) {
        analyzeFile(fullPath);
      }
    }
  }
  
  function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Trova tutte le importazioni
    const importMatches = content.match(/import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g);
    const requireMatches = content.match(/require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g);
    
    const allMatches = [...(importMatches || []), ...(requireMatches || [])];
    
    allMatches.forEach(match => {
      const moduleMatch = match.match(/['"`]([^'"`]+)['"`]/);
      if (moduleMatch) {
        let moduleName = moduleMatch[1];
        
        // Gestisci importazioni relative
        if (!moduleName.startsWith('.') && !moduleName.startsWith('/')) {
          // Estrai il nome del pacchetto (es: da '@types/node' -> '@types/node')
          if (moduleName.startsWith('@')) {
            const parts = moduleName.split('/');
            moduleName = parts.slice(0, 2).join('/');
          } else {
            moduleName = moduleName.split('/')[0];
          }
          
          if (allDependencies[moduleName]) {
            usedDependencies.add(moduleName);
          }
        }
      }
    });
  }
  
  // Scansiona il progetto
  scanDirectory(path.join(projectRoot, 'src'));
  scanDirectory(path.join(projectRoot, 'public'));
  
  // Controlla anche file di configurazione
  const configFiles = ['tailwind.config.js', 'craco.config.js', 'webpack.config.js'];
  configFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      analyzeFile(filePath);
    }
  });
  
  // Trova dipendenze non utilizzate
  Object.keys(allDependencies).forEach(dep => {
    if (!usedDependencies.has(dep)) {
      // Alcune dipendenze potrebbero essere utilizzate indirettamente
      const criticalDeps = [
        'react', 'react-dom', 'react-scripts', 
        'web-vitals', '@testing-library/jest-dom',
        'lighthouse', 'chrome-launcher', 'node-fetch', 'serve'
      ];
      
      if (!criticalDeps.includes(dep)) {
        unusedDependencies.push(dep);
      }
    }
  });
  
  // Identifica dipendenze pesanti
  const knownHeavyDeps = {
    'framer-motion': { size: '~50KB', alternatives: 'react-spring (~20KB)' },
    'gsap': { size: '~60KB', alternatives: 'CSS animations o react-spring' },
    'react-tsparticles': { size: '~80KB', alternatives: 'CSS animations o rimozione' },
    'swiper': { size: '~40KB', alternatives: 'componente carousel custom' },
    'react-pageflip': { size: '~30KB', alternatives: 'CSS flip animation' }
  };
  
  Object.keys(knownHeavyDeps).forEach(dep => {
    if (usedDependencies.has(dep)) {
      heavyDependencies.push({
        name: dep,
        ...knownHeavyDeps[dep],
        used: true
      });
    }
  });
  
  return {
    total: Object.keys(allDependencies).length,
    used: usedDependencies.size,
    unused: unusedDependencies,
    heavy: heavyDependencies
  };
}

function generateCleanupCommands(analysis) {
  const commands = [];
  
  if (analysis.unused.length > 0) {
    commands.push(`npm uninstall ${analysis.unused.join(' ')}`);
  }
  
  return commands;
}

// Esegui analisi
console.log('🔍 ANALISI DIPENDENZE UTILIZZATE\n');

const analysis = analyzeUsedDependencies();

console.log('📊 STATISTICHE:');
console.log(`   📦 Totale dipendenze: ${analysis.total}`);
console.log(`   ✅ Utilizzate: ${analysis.used}`);
console.log(`   ❌ Non utilizzate: ${analysis.unused.length}`);
console.log(`   ⚠️  Pesanti: ${analysis.heavy.length}`);

if (analysis.unused.length > 0) {
  console.log('\n❌ DIPENDENZE NON UTILIZZATE:');
  analysis.unused.forEach(dep => {
    console.log(`   - ${dep}`);
  });
  
  console.log('\n🧹 COMANDO PULIZIA:');
  const cleanupCommands = generateCleanupCommands(analysis);
  cleanupCommands.forEach(cmd => {
    console.log(`   ${cmd}`);
  });
}

if (analysis.heavy.length > 0) {
  console.log('\n⚠️  DIPENDENZE PESANTI UTILIZZATE:');
  analysis.heavy.forEach(dep => {
    console.log(`   - ${dep.name}: ${dep.size}`);
    console.log(`     Alternative: ${dep.alternatives}`);
  });
}

console.log('\n💡 RACCOMANDAZIONI:');
console.log('   1. Rimuovi dipendenze non utilizzate per ridurre bundle size');
console.log('   2. Considera alternative più leggere per dipendenze pesanti');
console.log('   3. Implementa lazy loading per componenti non critici');
console.log('   4. Usa tree shaking per importare solo parti necessarie');
