#!/usr/bin/env node
/**
 * Lighthouse performance statistics generator
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { promisify } = require('util');
const { exec, execSync } = require('child_process');

const execAsync = promisify(exec);

const CONFIG = {
  buildDir: path.join(__dirname, '..', '..', 'build'),
  statsFile: path.join(__dirname, '..', '..', 'src', 'data', 'project-stats.json'),
  lighthousePort: 3000,
  lighthouseUrl: 'http://localhost:3000',
  lighthouseReportPath: path.join(__dirname, '..', '..', 'lighthouse-report.json')
};

class LighthouseStatsGenerator {
  constructor() {
    this.serverProcess = null;
    this.startTime = Date.now();
  }

  async run() {
    try {
      console.log('🚀 Generating lighthouse performance statistics...');
      
      if (!fs.existsSync(CONFIG.buildDir)) {
        throw new Error(`Build directory not found: ${CONFIG.buildDir}`);
      }

      await this.startStaticServer();
      await this.waitForServer();
      await this.runLighthouse();
      await this.updateStats();
      
      console.log('✅ Lighthouse statistics completed!');
      
    } catch (error) {
      console.error('❌ Lighthouse error:', error.message);
      console.error('🔧 Please ensure build directory exists and ports are available');
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  async startStaticServer() {
    return new Promise((resolve, reject) => {
      this.serverProcess = spawn('npx', ['serve', '-s', CONFIG.buildDir, '-p', CONFIG.lighthousePort], {
        stdio: 'pipe',
        detached: false
      });

      this.serverProcess.stdout.on('data', (data) => {
        if (data.toString().includes('Accepting connections')) {
          resolve();
        }
      });

      this.serverProcess.on('error', reject);
      setTimeout(() => reject(new Error('Server startup timeout')), 10000);
    });
  }

  async waitForServer() {
    for (let i = 0; i < 10; i++) {
      try {
        await execAsync(`curl -s ${CONFIG.lighthouseUrl} > /dev/null`);
        return;
      } catch (error) {
        if (i === 9) throw new Error('Server not responding');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async runLighthouse() {
    return new Promise((resolve, reject) => {
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

      lighthouseProcess.on('close', (code) => {
        code === 0 ? resolve() : reject(new Error(`Lighthouse failed with code: ${code}`));
      });

      lighthouseProcess.on('error', reject);
    });
  }

  async updateStats() {
    let existingStats = {};
    if (fs.existsSync(CONFIG.statsFile)) {
      try {
        existingStats = JSON.parse(fs.readFileSync(CONFIG.statsFile, 'utf8'));
      } catch (error) {
        console.warn('Warning: Could not parse existing stats file, creating new one');
      }
    }

    const lighthouseData = await this.parseLighthouseReport();
    const buildStats = await this.getBuildStats();
    const projectMeta = await this.getProjectMetadata();
    
    const newStats = {
      generated: new Date().toISOString(),
      generationTime: Date.now() - this.startTime,
      project: { ...existingStats.project, ...projectMeta },
      code: existingStats.code || {},
      structure: existingStats.structure || {},
      git: existingStats.git || {},
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

    fs.writeFileSync(CONFIG.statsFile, JSON.stringify(newStats, null, 2));
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
          networkRequests: reportData.audits?.['network-requests']?.details?.items?.length || 0
        }
      };
    } catch (error) {
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
      return { buildSize: buildStats.stdout.split('\t')[0] };
    } catch (error) {
      return { buildSize: 'N/A' };
    }
  }

  async getProjectMetadata() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8'));
      return {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: Object.keys(packageJson.dependencies || {}).length,
        devDependencies: Object.keys(packageJson.devDependencies || {}).length
      };
    } catch (error) {
      return {};
    }
  }

  displayResults(stats) {
    console.log(`Performance: ${stats.performance.lighthouse.performance}/100`);
    console.log(`Build Size: ${stats.performance.buildSize}`);
  }

  async cleanup() {
    if (this.serverProcess) {
      this.serverProcess.kill();
    }
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
