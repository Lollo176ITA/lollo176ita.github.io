#!/usr/bin/env node

/**
 * Project structure statistics generator
 * Analyzes project structure and generates detailed statistics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  srcDir: path.join(__dirname, '..', '..', 'src'),
  statsFile: path.join(__dirname, '..', '..', 'src', 'data', 'project-stats.json')
};

class StructureStatsGenerator {
  constructor() {
    this.startTime = Date.now();
  }

  async run() {
    try {
      console.log('🏗️ Generating structure statistics...');
      
      if (!fs.existsSync(CONFIG.srcDir)) {
        throw new Error(`Source directory not found: ${CONFIG.srcDir}`);
      }

      const structureStats = this.generateStructureStats();
      await this.updateStatsFile(structureStats);
      
      console.log('✅ Structure statistics completed!');
      console.log(`Components: ${structureStats.components}, Pages: ${structureStats.pages}`);
      
      // Call next script in chain
      await this.callNextScript();
      
    } catch (error) {
      console.error('❌ Structure stats error:', error.message);
      console.error('🔧 Please check project structure and file organization');
      process.exit(1);
    }
  }

  generateStructureStats() {
    try {
      const components = this.countComponents();
      const pages = this.countPages();
      const hooks = this.countHooks();
      const routes = this.countRoutes();
      const books = this.countBooks();
      const chapters = this.countChapters();
      const utils = this.countUtils();
      const contexts = this.countContexts();

      if (components === 0 && pages === 0) {
        throw new Error('No React components or pages found');
      }

      return {
        components: components,
        pages: pages,
        hooks: hooks,
        routes: routes,
        books: books,
        chapters: chapters,
        utils: utils,
        contexts: contexts,
        lastUpdated: new Date().toISOString(),
        generationTime: Date.now() - this.startTime
      };

    } catch (error) {
      throw new Error(`Failed to generate structure statistics: ${error.message}`);
    }
  }

  countComponents() {
    try {
      const componentsDir = path.join(CONFIG.srcDir, 'components');
      if (!fs.existsSync(componentsDir)) {
        return 0;
      }
      const result = execSync(`find "${componentsDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | wc -l`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      throw new Error(`Failed to count components: ${error.message}`);
    }
  }

  countPages() {
    try {
      let totalPages = 0;
      
      // Controlla src/pages
      const pagesDir = path.join(CONFIG.srcDir, 'pages');
      if (fs.existsSync(pagesDir)) {
        const result = execSync(`find "${pagesDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | wc -l`, { encoding: 'utf8' });
        totalPages += parseInt(result.trim()) || 0;
      }
      
      // Controlla src/components/pages
      const componentsPagesDir = path.join(CONFIG.srcDir, 'components', 'pages');
      if (fs.existsSync(componentsPagesDir)) {
        const result = execSync(`find "${componentsPagesDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | wc -l`, { encoding: 'utf8' });
        totalPages += parseInt(result.trim()) || 0;
      }
      
      // Se non ha trovato niente, cerca file che finiscono con Page
      if (totalPages === 0) {
        const result = execSync(`find "${CONFIG.srcDir}" -name "*Page.js" -o -name "*Page.jsx" -o -name "*Page.ts" -o -name "*Page.tsx" | wc -l`, { encoding: 'utf8' });
        totalPages = parseInt(result.trim()) || 0;
      }
      
      return totalPages;
    } catch (error) {
      return 0;
    }
  }

  countHooks() {
    try {
      const hooksDir = path.join(CONFIG.srcDir, 'hooks');
      if (!fs.existsSync(hooksDir)) {
        // Try finding use* files
        const result = execSync(`find "${CONFIG.srcDir}" -name "use*.js" -o -name "use*.jsx" -o -name "use*.ts" -o -name "use*.tsx" | wc -l`, { encoding: 'utf8' });
        return parseInt(result.trim()) || 0;
      }
      const result = execSync(`find "${hooksDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | wc -l`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      return 0;
    }
  }

  countRoutes() {
    try {
      // Prima cerca nel file App.js principale
      const appFile = path.join(CONFIG.srcDir, 'App.js');
      if (fs.existsSync(appFile)) {
        const appContent = fs.readFileSync(appFile, 'utf8');
        // Conta tutte le occorrenze di <Route con path=
        const routeMatches = appContent.match(/<Route\s+[^>]*path\s*=\s*["'][^"']*["'][^>]*>/g);
        if (routeMatches) {
          return routeMatches.length;
        }
      }
      
      // Fallback: cerca in tutti i file con Router nel nome
      const routerFiles = execSync(`find "${CONFIG.srcDir}" -name "*Router*.js" -o -name "*Router*.jsx" -o -name "*Routes*.js" -o -name "*Routes*.jsx"`, { encoding: 'utf8' }).trim().split('\n').filter(f => f);
      
      let totalRoutes = 0;
      for (const file of routerFiles) {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf8');
          const routeMatches = content.match(/<Route\s+[^>]*path\s*=\s*["'][^"']*["'][^>]*>/g);
          if (routeMatches) {
            totalRoutes += routeMatches.length;
          }
        }
      }
      
      return totalRoutes > 0 ? totalRoutes : Math.max(this.countPages(), 1);
    } catch (error) {
      return 1;
    }
  }

  countBooks() {
    try {
      const booksDataFile = path.join(CONFIG.srcDir, 'data', 'books.js');
      if (!fs.existsSync(booksDataFile)) {
        return 0;
      }
      
      const booksContent = fs.readFileSync(booksDataFile, 'utf8');
      
      // Cerca l'array books nel file
      const booksArrayMatch = booksContent.match(/const\s+books\s*=\s*\[([\s\S]*?)\];/);
      if (!booksArrayMatch) {
        return 0;
      }
      
      // Conta gli oggetti libro nell'array (ogni libro ha un slug)
      const booksArray = booksArrayMatch[1];
      const bookObjects = (booksArray.match(/{\s*\n?\s*type:/g) || []).length;
      
      return bookObjects;
    } catch (error) {
      return 0;
    }
  }

  countChapters() {
    try {
      const booksDataFile = path.join(CONFIG.srcDir, 'data', 'books.js');
      if (!fs.existsSync(booksDataFile)) {
        return 0;
      }
      
      const booksContent = fs.readFileSync(booksDataFile, 'utf8');
      
      // Trova tutti gli array chapters
      const chaptersMatches = booksContent.match(/chapters:\s*\[([\s\S]*?)\]/g) || [];
      
      let totalChapters = 0;
      chaptersMatches.forEach((match) => {
        // Estrai il contenuto dell'array chapters
        const chaptersContent = match.match(/chapters:\s*\[([\s\S]*?)\]/)[1];
        // Conta gli oggetti capitolo (ogni capitolo ha un slug)
        const chapterObjects = (chaptersContent.match(/{\s*slug:/g) || []).length;
        totalChapters += chapterObjects;
      });
      
      return totalChapters;
    } catch (error) {
      return 0;
    }
  }

  countUtils() {
    try {
      const utilsDir = path.join(CONFIG.srcDir, 'utils');
      if (!fs.existsSync(utilsDir)) {
        return 0;
      }
      const result = execSync(`find "${utilsDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | wc -l`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      return 0;
    }
  }

  countContexts() {
    try {
      // Look for React contexts
      const contextFiles = execSync(`find "${CONFIG.srcDir}" -name "*Context*.js" -o -name "*Context*.jsx" -o -name "*Context*.ts" -o -name "*Context*.tsx" | wc -l`, { encoding: 'utf8' });
      return parseInt(contextFiles.trim()) || 0;
    } catch (error) {
      return 0;
    }
  }

  async updateStatsFile(structureStats) {
    let existingStats = {};
    
    if (fs.existsSync(CONFIG.statsFile)) {
      try {
        existingStats = JSON.parse(fs.readFileSync(CONFIG.statsFile, 'utf8'));
      } catch (error) {
        console.warn('Warning: Could not parse existing stats file');
      }
    }

    const updatedStats = {
      ...existingStats,
      structure: structureStats,
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(CONFIG.statsFile, JSON.stringify(updatedStats, null, 2));
  }

  async callNextScript() {
    try {
      const { execa } = require('execa');
      const nextScript = path.join(__dirname, 'git-stats.js');
      if (fs.existsSync(nextScript)) {
        await execa('node', [nextScript], { stdio: 'inherit' });
      }
    } catch (error) {
      throw new Error(`Failed to call next script: ${error.message}`);
    }
  }
}

// Main execution
if (require.main === module) {
  const generator = new StructureStatsGenerator();
  generator.run().catch(console.error);
}

module.exports = StructureStatsGenerator;
