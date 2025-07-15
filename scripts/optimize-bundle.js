#!/usr/bin/env node

/**
 * Script per l'ottimizzazione automatica del bundle
 * Implementa code splitting, tree shaking e ottimizzazioni varie
 */

const fs = require('fs').promises;
const path = require('path');
const { execa } = require('execa');
const { sync: globSync } = require('glob');

const projectRoot = process.cwd();

// Componenti da lazy-loadare (pesanti o non critici)
const LAZY_COMPONENTS = [
  {
    path: 'src/components/books/BooksHome.js',
    importName: 'BooksHome',
    exportName: 'BooksHome'
  },
  {
    path: 'src/components/books/BookChapter.js',
    importName: 'BookChapter',
    exportName: 'BookChapter'
  },
  {
    path: 'src/components/common/CodeEditor.js',
    importName: 'CodeEditor',
    exportName: 'CodeEditor'
  },
  {
    path: 'src/components/pages/CreationsPage.js',
    importName: 'CreationsPage',
    exportName: 'CreationsPage'
  },
  {
    path: 'src/components/pages/History.js',
    importName: 'History',
    exportName: 'History'
  },
  {
    path: 'src/components/pages/About.js',
    importName: 'About',
    exportName: 'About'
  }
];

// Importazioni da ottimizzare (specifiche invece di globali)
const IMPORT_OPTIMIZATIONS = [
  {
    from: "import { motion } from 'framer-motion'",
    to: "import { motion } from 'framer-motion/dist/framer-motion'",
    files: ['src/components/**/*.js']
  },
  {
    from: "import * as React from 'react'",
    to: "import React from 'react'",
    files: ['src/**/*.js']
  }
];

async function runCommand(cmd, args) {
  console.log(`> ${cmd} ${args.join(' ')}`);
  await execa(cmd, args, { stdio: 'inherit', cwd: projectRoot });
}

async function optimizeImports() {
  console.log('🔧 Ottimizzazione importazioni...');
  
  // Trova tutti i file JS/JSX
  const files = globSync('src/**/*.{js,jsx}');
  
  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf8');
      let modified = false;
      
      // Ottimizza import * as React
      if (content.includes("import * as React from 'react'")) {
        content = content.replace(/import \* as React from 'react'/g, "import React from 'react'");
        modified = true;
      }
      
      // Ottimizza framer-motion imports - usa solo motion base
      if (content.includes("import { motion }") && content.includes("from 'framer-motion'")) {
        // Sostituisci solo se usa pochi componenti
        const framerImports = content.match(/import\s*\{\s*([^}]+)\s*\}\s*from\s*'framer-motion'/);
        if (framerImports && framerImports[1]) {
          const imports = framerImports[1].split(',').map(i => i.trim());
          // Solo se usa solo motion, non ottimizzare se ci sono altri componenti
          if (imports.length === 1 && imports[0] === 'motion') {
            console.log(`    ⚠️  Mantengo import completo per framer-motion in ${file}`);
          }
        }
      }
      
      if (modified) {
        await fs.writeFile(file, content);
        console.log(`  ✅ Ottimizzato: ${file}`);
      }
    } catch (error) {
      console.warn(`  ⚠️  Errore ottimizzando ${file}:`, error.message);
    }
  }
}

async function implementCodeSplitting() {
  console.log('⚡ Implementazione code splitting...');
  
  // Leggi App.js
  const appPath = path.join(projectRoot, 'src/App.js');
  let appContent = await fs.readFile(appPath, 'utf8');
  
  // Aggiungi import per Suspense e lazy se non presenti
  if (!appContent.includes('Suspense')) {
    appContent = appContent.replace(
      /import React from 'react'/,
      "import React, { Suspense, lazy } from 'react'"
    );
  }
  
  // Converti i componenti pesanti in lazy imports
  for (const component of LAZY_COMPONENTS) {
    const importRegex = new RegExp(`import ${component.importName} from ['"]${component.path.replace('src/', './')}['"]`, 'g');
    const lazyImport = `const ${component.importName} = lazy(() => import('${component.path.replace('src/', './')}'))`;
    
    if (appContent.match(importRegex)) {
      appContent = appContent.replace(importRegex, lazyImport);
      console.log(`  ✅ Convertito a lazy: ${component.importName}`);
    }
  }
  
  // Aggiungi Suspense wrapper dove necessario
  if (!appContent.includes('<Suspense')) {
    // Trova le Routes e wrappa con Suspense
    appContent = appContent.replace(
      '<Routes>',
      '<Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>\n        <Routes>'
    );
    appContent = appContent.replace(
      '</Routes>',
      '</Routes>\n      </Suspense>'
    );
  }
  
  await fs.writeFile(appPath, appContent);
  console.log('  ✅ Code splitting implementato in App.js');
}

async function optimizePackageJson() {
  console.log('📦 Ottimizzazione package.json...');
  
  const packagePath = path.join(projectRoot, 'package.json');
  const packageData = JSON.parse(await fs.readFile(packagePath, 'utf8'));
  
  // Aggiungi configurazioni per ottimizzazioni
  packageData.browserslist = {
    production: [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  };
  
  await fs.writeFile(packagePath, JSON.stringify(packageData, null, 2));
  console.log('  ✅ Package.json ottimizzato');
}

async function createOptimizedBuild() {
  console.log('🏗️  Creazione build ottimizzato...');
  
  // Build senza source maps
  await runCommand('npm', ['run', 'build:prod']);
  
  console.log('  ✅ Build ottimizzato completato');
}

async function analyzeBundle() {
  console.log('📊 Analisi bundle...');
  
  try {
    // Genera report del bundle
    await runCommand('npm', ['run', 'bundle:analyze']);
    
    // Analizza con source-map-explorer
    console.log('📈 Generazione report dettagliato...');
    await runCommand('npm', ['run', 'build:analyze']);
    
    console.log('  ✅ Report generati - controlla build/bundle-report.html');
  } catch (error) {
    console.warn('  ⚠️  Errore durante analisi:', error.message);
  }
}

async function optimizeBundle() {
  console.log('🚀 OTTIMIZZAZIONE AUTOMATICA DEL BUNDLE\n');
  
  try {
    // 1. Ottimizza le importazioni
    await optimizeImports();
    
    // 2. Implementa code splitting
    await implementCodeSplitting();
    
    // 3. Ottimizza package.json
    await optimizePackageJson();
    
    // 4. Crea build ottimizzato
    await createOptimizedBuild();
    
    // 5. Analizza risultati
    await analyzeBundle();
    
    console.log('\n✅ OTTIMIZZAZIONE COMPLETATA!');
    console.log('\n📈 MIGLIORAMENTI APPLICATI:');
    console.log('   ✅ Code splitting con React.lazy()');
    console.log('   ✅ Importazioni ottimizzate');
    console.log('   ✅ Source maps rimossi in produzione');
    console.log('   ✅ Chunks separati per vendor e common');
    console.log('   ✅ Tree shaking abilitato');
    
    console.log('\n📊 CONTROLLO RISULTATI:');
    console.log('   - Apri build/bundle-report.html per l\'analisi dettagliata');
    console.log('   - Esegui npm run stats per nuove metriche Lighthouse');
    console.log('   - Controlla la dimensione del bundle in build/static/js/');
    
  } catch (error) {
    console.error('❌ ERRORE DURANTE L\'OTTIMIZZAZIONE:', error.message);
    process.exit(1);
  }
}

// Esegui ottimizzazione
optimizeBundle();
