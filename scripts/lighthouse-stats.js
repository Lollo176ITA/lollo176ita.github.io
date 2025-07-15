#!/usr/bin/env node
/**
 * Lighthouse-based stats generator
 * Centralized performance analysis using Lighthouse
 */

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  buildDir: path.join(__dirname, '..', 'build'),
  statsFile: path.join(__dirname, '..', 'src', 'data', 'project-stats.json'),
  lighthousePort: 3001,
  lighthouseUrl: 'http://localhost:3001',
  lighthouseReportPath: path.join(__dirname, '..', 'lighthouse-report.json'),
  
  // Lighthouse command options
  lighthouseCmd: [
    'npx', 'lighthouse',
    'http://localhost:3001',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json',
    '--output-path=lighthouse-report.json',
    '--chrome-flags="--headless --disable-gpu --no-sandbox"'
  ]
};

class LighthouseStatsGenerator {
  constructor() {
    this.serverProcess = null;
    this.startTime = Date.now();
  }

  async run() {
    try {
      console.log('🚀 Starting Lighthouse-based stats generation...');
      
      // Check if build exists
      if (!fs.existsSync(CONFIG.buildDir)) {
        throw new Error(`Build directory not found: ${CONFIG.buildDir}`);
      }

      // Start static server
      await this.startStaticServer();
      
      // Wait for server to be ready
      await this.waitForServer();
      
      // Run Lighthouse
      await this.runLighthouse();
      
      // Parse results and update stats
      await this.updateStats();
      
      console.log('✅ Stats generation completed successfully!');
      
    } catch (error) {
      console.error('❌ Error during stats generation:', error.message);
      process.exit(1);
    } finally {
      // Clean up
      await this.cleanup();
    }
  }

  async startStaticServer() {
    return new Promise((resolve, reject) => {
      console.log(`📡 Starting static server on port ${CONFIG.lighthousePort}...`);
      
      // Use npx serve for static server
      this.serverProcess = spawn('npx', ['serve', '-s', CONFIG.buildDir, '-p', CONFIG.lighthousePort], {
        stdio: 'pipe',
        detached: false
      });

      this.serverProcess.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Accepting connections')) {
          console.log('✅ Static server started successfully');
          resolve();
        }
      });

      this.serverProcess.stderr.on('data', (data) => {
        console.error('Server error:', data.toString());
      });

      this.serverProcess.on('error', (error) => {
        reject(new Error(`Failed to start server: ${error.message}`));
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        reject(new Error('Server startup timeout'));
      }, 10000);
    });
  }

  async waitForServer() {
    const maxRetries = 10;
    const retryDelay = 1000;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        await execAsync(`curl -s ${CONFIG.lighthouseUrl} > /dev/null`);
        console.log('✅ Server is ready');
        return;
      } catch (error) {
        if (i === maxRetries - 1) {
          throw new Error('Server not responding after maximum retries');
        }
        console.log(`⏳ Waiting for server... (${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  async runLighthouse() {
    return new Promise((resolve, reject) => {
      console.log('🔍 Running Lighthouse analysis...');
      
      const lighthouseProcess = spawn('npx', [
        'lighthouse',
        CONFIG.lighthouseUrl,
        '--only-categories=performance,accessibility,best-practices,seo',
        '--output=json',
        `--output-path=${CONFIG.lighthouseReportPath}`,
        '--chrome-flags="--headless --disable-gpu --no-sandbox"'
      ], {
        stdio: 'pipe',
        cwd: path.dirname(CONFIG.lighthouseReportPath)
      });

      lighthouseProcess.stdout.on('data', (data) => {
        // Show lighthouse progress
        const output = data.toString();
        if (output.includes('Generating report...')) {
          console.log('📊 Generating Lighthouse report...');
        }
      });

      lighthouseProcess.stderr.on('data', (data) => {
        const error = data.toString();
        // Ignore common warnings
        if (!error.includes('Runtime.console') && 
            !error.includes('Runtime.runtime') &&
            !error.includes('WARNING')) {
          console.error('Lighthouse error:', error);
        }
      });

      lighthouseProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Lighthouse analysis completed');
          resolve();
        } else {
          reject(new Error(`Lighthouse failed with code: ${code}`));
        }
      });

      lighthouseProcess.on('error', (error) => {
        reject(new Error(`Lighthouse process error: ${error.message}`));
      });
    });
  }

  async updateStats() {
    console.log('📊 Updating project statistics...');
    
    // Read existing stats
    let existingStats = {};
    if (fs.existsSync(CONFIG.statsFile)) {
      try {
        existingStats = JSON.parse(fs.readFileSync(CONFIG.statsFile, 'utf8'));
      } catch (error) {
        console.warn('Warning: Could not parse existing stats file');
      }
    }

    // Read Lighthouse report
    const lighthouseData = await this.parseLighthouseReport();
    
    // Get build statistics
    const buildStats = await this.getBuildStats();
    
    // Get project metadata
    const projectMeta = await this.getProjectMetadata();
    
    // Merge all data
    const newStats = {
      generated: new Date().toISOString(),
      generationTime: Date.now() - this.startTime,
      project: {
        ...existingStats.project,
        ...projectMeta
      },
      code: existingStats.code || this.getCodeStats(),
      structure: existingStats.structure || this.getStructureStats(),
      git: existingStats.git || this.getGitStats(),
      performance: {
        ...existingStats.performance,
        ...buildStats,
        lighthouse: {
          ...lighthouseData,
          lastUpdated: new Date().toISOString(),
          fallback: false
        }
      }
    };

    // Write updated stats
    fs.writeFileSync(CONFIG.statsFile, JSON.stringify(newStats, null, 2));
    console.log('✅ Statistics updated successfully');
    
    // Display results
    this.displayResults(newStats);
  }

  async parseLighthouseReport() {
    try {
      const reportData = JSON.parse(fs.readFileSync(CONFIG.lighthouseReportPath, 'utf8'));
      
      const categories = reportData.categories || {};
      
      return {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        
        // Additional metrics
        metrics: {
          firstContentfulPaint: reportData.audits?.['first-contentful-paint']?.numericValue || 0,
          largestContentfulPaint: reportData.audits?.['largest-contentful-paint']?.numericValue || 0,
          cumulativeLayoutShift: reportData.audits?.['cumulative-layout-shift']?.numericValue || 0,
          totalBlockingTime: reportData.audits?.['total-blocking-time']?.numericValue || 0,
          timeToInteractive: reportData.audits?.['interactive']?.numericValue || 0,
          speedIndex: reportData.audits?.['speed-index']?.numericValue || 0,
          firstMeaningfulPaint: reportData.audits?.['first-meaningful-paint']?.numericValue || 0,
          serverResponseTime: reportData.audits?.['server-response-time']?.numericValue || 0,
          maxPotentialFID: reportData.audits?.['max-potential-fid']?.numericValue || 0,
          domSize: reportData.audits?.['dom-size']?.numericValue || 0,
          mainThreadWorkBreakdown: reportData.audits?.['mainthread-work-breakdown']?.numericValue || 0,
          networkRequests: reportData.audits?.['network-requests']?.details?.items?.length || 0,
          usesOptimizedImages: reportData.audits?.['uses-optimized-images']?.score === 1,
          usesWebpImages: reportData.audits?.['uses-webp-images']?.score === 1,
          usesTextCompression: reportData.audits?.['uses-text-compression']?.score === 1,
          unusedCssRules: reportData.audits?.['unused-css-rules']?.details?.overallSavingsBytes || 0,
          renderBlockingResources: reportData.audits?.['render-blocking-resources']?.details?.items?.length || 0
        }
      };
    } catch (error) {
      console.error('Error parsing Lighthouse report:', error.message);
      return {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0,
        metrics: {}
      };
    }
  }

  async getBuildStats() {
    try {
      const buildStats = await execAsync(`du -sh ${CONFIG.buildDir}`);
      const buildSize = buildStats.stdout.split('\t')[0];
      
      return {
        buildSize,
        avgBuildTime: 0 // Could be calculated from previous builds
      };
    } catch (error) {
      return {
        buildSize: 'N/A',
        avgBuildTime: 0
      };
    }
  }

  async getProjectMetadata() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
      return {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: Object.keys(packageJson.dependencies || {}).length,
        devDependencies: Object.keys(packageJson.devDependencies || {}).length,
        scripts: Object.keys(packageJson.scripts || {}).length
      };
    } catch (error) {
      return {};
    }
  }

  getCodeStats() {
    // Simplified code stats - could be enhanced
    return {
      files: 0,
      totalLines: 0,
      codeLines: 0,
      blankLines: 0,
      languages: {}
    };
  }

  getStructureStats() {
    // Simplified structure stats - could be enhanced
    return {
      components: 0,
      routes: 0,
      books: 0,
      chapters: 0,
      hooks: 0,
      pages: 0
    };
  }

  getGitStats() {
    // Simplified git stats - could be enhanced
    return {
      commits: 0,
      contributors: 0,
      branches: 0,
      lastCommit: {}
    };
  }

  displayResults(stats) {
    console.log('\n📊 LIGHTHOUSE PERFORMANCE REPORT');
    console.log('═══════════════════════════════════');
    console.log(`🎯 Performance:     ${stats.performance.lighthouse.performance}/100`);
    console.log(`♿ Accessibility:   ${stats.performance.lighthouse.accessibility}/100`);
    console.log(`🛡️  Best Practices:  ${stats.performance.lighthouse.bestPractices}/100`);
    console.log(`🔍 SEO:             ${stats.performance.lighthouse.seo}/100`);
    console.log(`📦 Build Size:      ${stats.performance.buildSize}`);
    console.log(`⏱️  Generation Time: ${stats.generationTime}ms`);
    console.log('═══════════════════════════════════\n');
  }

  async cleanup() {
    if (this.serverProcess) {
      console.log('🧹 Cleaning up server process...');
      this.serverProcess.kill();
    }
    
    // Clean up lighthouse report
    if (fs.existsSync(CONFIG.lighthouseReportPath)) {
      fs.unlinkSync(CONFIG.lighthouseReportPath);
    }
  }
}

// Main execution
if (require.main === module) {
  const generator = new LighthouseStatsGenerator();
  generator.run().catch(console.error);
}

module.exports = LighthouseStatsGenerator;
