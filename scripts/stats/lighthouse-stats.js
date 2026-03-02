#!/usr/bin/env node
/**
 * Lighthouse performance statistics generator
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);

const CONFIG = {
  buildDir: path.join(__dirname, '..', '..', 'build'),
  statsFile: path.join(__dirname, '..', '..', 'src', 'data', 'project-stats.json'),
  publicStatsFile: path.join(__dirname, '..', '..', 'public', 'project-stats.json'),
  buildStatsFile: path.join(__dirname, '..', '..', 'build', 'project-stats.json'),
  lighthousePort: 3000,
  lighthouseUrl: 'http://localhost:3000',
  lighthouseReportPath: path.join(__dirname, '..', '..', 'lighthouse-report.json'),
  serverStartupTimeoutMs: 10000,
  serverRequestTimeoutSeconds: 2,
  lighthouseTimeoutMs: 180000,
  processShutdownTimeoutMs: 5000
};

class LighthouseStatsGenerator {
  constructor() {
    this.serverProcess = null;
    this.startTime = Date.now();
  }

  async run() {
    try {
      if (!fs.existsSync(CONFIG.buildDir)) {
        throw new Error(`Build directory not found: ${CONFIG.buildDir}`);
      }

      await this.startStaticServer();
      await this.waitForServer();
      await this.runLighthouse();
      await this.updateStats();
      
    } catch (error) {
      console.error('❌ Lighthouse error:', error.message);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  async startStaticServer() {
    return new Promise((resolve, reject) => {
      let settled = false;
      const settle = (fn, value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        fn(value);
      };

      this.serverProcess = spawn('npx', ['serve', '-s', CONFIG.buildDir, '-p', CONFIG.lighthousePort], {
        stdio: 'pipe',
        detached: process.platform !== 'win32'
      });

      this.serverProcess.stdout.on('data', (data) => {
        if (data.toString().includes('Accepting connections')) {
          settle(resolve);
        }
      });

      this.serverProcess.stderr.on('data', () => {
        // Drain stderr to avoid pipe backpressure in CI.
      });

      this.serverProcess.on('error', (error) => settle(reject, error));

      const timeoutId = setTimeout(
        () => settle(reject, new Error('Server startup timeout')),
        CONFIG.serverStartupTimeoutMs
      );
    });
  }

  async waitForServer() {
    for (let i = 0; i < 10; i++) {
      try {
        await execAsync(
          `curl -s --fail --max-time ${CONFIG.serverRequestTimeoutSeconds} ${CONFIG.lighthouseUrl} > /dev/null`
        );
        return;
      } catch (error) {
        if (i === 9) throw new Error('Server not responding');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async runLighthouse() {
    return new Promise((resolve, reject) => {
      let settled = false;
      const settle = (fn, value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        fn(value);
      };

      const lighthouseProcess = spawn('npx', [
        'lighthouse',
        CONFIG.lighthouseUrl,
        '--only-categories=performance,accessibility,best-practices,seo',
        '--quiet',
        '--output=json',
        `--output-path=${CONFIG.lighthouseReportPath}`,
        '--chrome-flags=--headless --disable-gpu --no-sandbox'
      ], {
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd: path.dirname(CONFIG.lighthouseReportPath)
      });

      lighthouseProcess.stdout.on('data', () => {
        // Drain stdout to avoid child process blocking on full buffers.
      });

      lighthouseProcess.stderr.on('data', () => {
        // Drain stderr to avoid child process blocking on full buffers.
      });

      lighthouseProcess.on('close', (code) => {
        code === 0
          ? settle(resolve)
          : settle(reject, new Error(`Lighthouse failed with code: ${code}`));
      });

      lighthouseProcess.on('error', (error) => settle(reject, error));

      const timeoutId = setTimeout(() => {
        lighthouseProcess.kill('SIGTERM');
        settle(reject, new Error('Lighthouse timeout exceeded'));
      }, CONFIG.lighthouseTimeoutMs);
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
          url: CONFIG.lighthouseUrl,
          formFactor: 'mobile',
          lastUpdated: new Date().toISOString(),
          fallback: false
        }
      }
    };

    this.writeJsonFile(CONFIG.statsFile, newStats);
    this.syncPublishedStats(newStats);
    this.displayResults(newStats);
  }

  writeJsonFile(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  syncPublishedStats(stats) {
    this.writeJsonFile(CONFIG.publicStatsFile, stats);

    if (fs.existsSync(CONFIG.buildDir)) {
      this.writeJsonFile(CONFIG.buildStatsFile, stats);
    }
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
      await this.stopServerProcess();
    }
    if (fs.existsSync(CONFIG.lighthouseReportPath)) {
      fs.unlinkSync(CONFIG.lighthouseReportPath);
    }
  }

  async stopServerProcess() {
    const proc = this.serverProcess;
    this.serverProcess = null;

    if (!proc || proc.killed) {
      return;
    }

    await new Promise((resolve) => {
      let finished = false;
      let forceKillTimer = null;

      const finish = () => {
        if (finished) return;
        finished = true;
        if (forceKillTimer) {
          clearTimeout(forceKillTimer);
        }
        proc.stdout?.destroy();
        proc.stderr?.destroy();
        resolve();
      };

      proc.once('close', finish);
      proc.once('exit', finish);

      try {
        if (process.platform !== 'win32' && proc.pid) {
          process.kill(-proc.pid, 'SIGTERM');
        } else {
          proc.kill('SIGTERM');
        }
      } catch {
        finish();
        return;
      }

      forceKillTimer = setTimeout(() => {
        try {
          if (process.platform !== 'win32' && proc.pid) {
            process.kill(-proc.pid, 'SIGKILL');
          } else {
            proc.kill('SIGKILL');
          }
        } catch {
          // Ignore force-kill errors; the process may already be gone.
        }
        finish();
      }, CONFIG.processShutdownTimeoutMs);
    });
  }
}

// Main execution
if (require.main === module) {
  const generator = new LighthouseStatsGenerator();
  generator.run().catch(console.error);
}

module.exports = LighthouseStatsGenerator;
