#!/usr/bin/env node

/**
 * Code statistics generator
 * Analyzes source code files and generates detailed statistics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  srcDir: path.join(__dirname, '..', '..', 'src'),
  statsFile: path.join(__dirname, '..', '..', 'src', 'data', 'project-stats.json')
};

class CodeStatsGenerator {
  constructor() {
    this.startTime = Date.now();
  }

  async run() {
    try {
      console.log('📊 Generating code statistics...');
      
      if (!fs.existsSync(CONFIG.srcDir)) {
        throw new Error(`Source directory not found: ${CONFIG.srcDir}`);
      }

      const codeStats = this.generateCodeStats();
      await this.updateStatsFile(codeStats);
      
      console.log('✅ Code statistics completed!');
      console.log(`Files: ${codeStats.files}, Lines: ${codeStats.totalLines}`);
      
      // Call next script in chain
      await this.callNextScript();
      
    } catch (error) {
      console.error('❌ Code stats error:', error.message);
      console.error('🔧 Please fix the source code structure or file permissions');
      process.exit(1);
    }
  }

  generateCodeStats() {
    try {
      // Get file counts by extension
      const jsFiles = this.countFiles('*.js');
      const tsFiles = this.countFiles('*.ts');
      const jsxFiles = this.countFiles('*.jsx');
      const tsxFiles = this.countFiles('*.tsx');
      const cssFiles = this.countFiles('*.css');
      const jsonFiles = this.countFiles('*.json');
      const mdFiles = this.countFiles('*.md');

      // Get line counts by extension
      const jsLines = this.countLines('*.js');
      const tsLines = this.countLines('*.ts');
      const jsxLines = this.countLines('*.jsx');
      const tsxLines = this.countLines('*.tsx');
      const cssLines = this.countLines('*.css');
      const jsonLines = this.countLines('*.json');
      const mdLines = this.countLines('*.md');

      const totalFiles = jsFiles + tsFiles + jsxFiles + tsxFiles + cssFiles + jsonFiles + mdFiles;
      const totalLines = jsLines + tsLines + jsxLines + tsxLines + cssLines + jsonLines + mdLines;

      if (totalFiles === 0) {
        throw new Error('No source files found in src directory');
      }

      // Calculate code vs comment vs blank lines
      const codeLines = this.countCodeLines();
      const blankLines = this.countBlankLines();
      const commentLines = totalLines - codeLines - blankLines;

      const languages = {};
      
      if (jsFiles + jsxFiles > 0) {
        languages.JavaScript = {
          files: jsFiles + jsxFiles,
          lines: jsLines + jsxLines,
          percentage: Math.round((jsLines + jsxLines) / totalLines * 1000) / 10
        };
      }

      if (tsFiles + tsxFiles > 0) {
        languages.TypeScript = {
          files: tsFiles + tsxFiles,
          lines: tsLines + tsxLines,
          percentage: Math.round((tsLines + tsxLines) / totalLines * 1000) / 10
        };
      }

      if (cssFiles > 0) {
        languages.CSS = {
          files: cssFiles,
          lines: cssLines,
          percentage: Math.round(cssLines / totalLines * 1000) / 10
        };
      }

      if (jsonFiles > 0) {
        languages.JSON = {
          files: jsonFiles,
          lines: jsonLines,
          percentage: Math.round(jsonLines / totalLines * 1000) / 10
        };
      }

      if (mdFiles > 0) {
        languages.Markdown = {
          files: mdFiles,
          lines: mdLines,
          percentage: Math.round(mdLines / totalLines * 1000) / 10
        };
      }

      return {
        files: totalFiles,
        totalLines: totalLines,
        codeLines: codeLines,
        blankLines: blankLines,
        commentLines: commentLines,
        languages: languages,
        lastUpdated: new Date().toISOString(),
        generationTime: Date.now() - this.startTime
      };

    } catch (error) {
      throw new Error(`Failed to generate code statistics: ${error.message}`);
    }
  }

  countFiles(pattern) {
    try {
      const result = execSync(`find "${CONFIG.srcDir}" -name "${pattern}" -type f | wc -l`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      return 0;
    }
  }

  countLines(pattern) {
    try {
      const result = execSync(`find "${CONFIG.srcDir}" -name "${pattern}" -type f -exec cat {} + | wc -l`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      return 0;
    }
  }

  countCodeLines() {
    try {
      // Count non-empty, non-comment lines
      const result = execSync(`find "${CONFIG.srcDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -v "^[[:space:]]*$" | grep -v "^[[:space:]]*//.*$" | grep -v "^[[:space:]]*\\*.*$" | wc -l`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      // Fallback to estimated percentage
      const totalLines = this.countLines('*.js') + this.countLines('*.jsx') + this.countLines('*.ts') + this.countLines('*.tsx');
      return Math.round(totalLines * 0.85);
    }
  }

  countBlankLines() {
    try {
      const result = execSync(`find "${CONFIG.srcDir}" -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -c "^[[:space:]]*$" | awk -F: '{sum += $2} END {print sum}'`, { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      // Fallback to estimated percentage
      const totalLines = this.countLines('*.js') + this.countLines('*.jsx') + this.countLines('*.ts') + this.countLines('*.tsx');
      return Math.round(totalLines * 0.10);
    }
  }

  async updateStatsFile(codeStats) {
    let existingStats = {};
    
    if (fs.existsSync(CONFIG.statsFile)) {
      try {
        existingStats = JSON.parse(fs.readFileSync(CONFIG.statsFile, 'utf8'));
      } catch (error) {
        console.warn('Warning: Could not parse existing stats file, creating new one');
      }
    }

    const updatedStats = {
      ...existingStats,
      code: codeStats,
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(CONFIG.statsFile, JSON.stringify(updatedStats, null, 2));
  }

  async callNextScript() {
    try {
      const { execa } = require('execa');
      const nextScript = path.join(__dirname, 'structure-stats.js');
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
  const generator = new CodeStatsGenerator();
  generator.run().catch(console.error);
}

module.exports = CodeStatsGenerator;
