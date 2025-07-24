#!/usr/bin/env node

/**
 * Git statistics generator
 * Analyzes git repository and generates detailed statistics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  statsFile: path.join(__dirname, '..', '..', 'src', 'data', 'project-stats.json')
};

class GitStatsGenerator {
  constructor() {
    this.startTime = Date.now();
  }

  async run() {
    try {
      console.log('📈 Generating git statistics...');
      
      if (!this.isGitRepository()) {
        throw new Error('Not a git repository');
      }

      const gitStats = this.generateGitStats();
      await this.updateStatsFile(gitStats);
      
      console.log('✅ Git statistics completed!');
      console.log(`Commits: ${gitStats.commits}, Contributors: ${gitStats.contributors}`);
      
      // Call next script in chain
      await this.callNextScript();
      
    } catch (error) {
      console.error('❌ Git stats error:', error.message);
      console.error('🔧 Please ensure this is a valid git repository with commit history');
      process.exit(1);
    }
  }

  isGitRepository() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  generateGitStats() {
    try {
      const commits = this.getCommitCount();
      const contributors = this.getContributorCount();
      const branches = this.getBranchCount();
      const lastCommit = this.getLastCommitInfo();
      const repoAge = this.getRepositoryAge();
      const commitFrequency = this.getCommitFrequency();

      if (commits === 0) {
        throw new Error('No commits found in repository');
      }

      return {
        commits: commits,
        contributors: contributors,
        branches: branches,
        lastCommit: lastCommit,
        repoAge: repoAge,
        commitFrequency: commitFrequency,
        lastUpdated: new Date().toISOString(),
        generationTime: Date.now() - this.startTime
      };

    } catch (error) {
      throw new Error(`Failed to generate git statistics: ${error.message}`);
    }
  }

  getCommitCount() {
    try {
      const result = execSync('git rev-list --count HEAD', { encoding: 'utf8' });
      const count = parseInt(result.trim());
      if (isNaN(count) || count === 0) {
        throw new Error('Invalid commit count');
      }
      return count;
    } catch (error) {
      throw new Error(`Failed to get commit count: ${error.message}`);
    }
  }

  getContributorCount() {
    try {
      const result = execSync('git log --format="%an" | sort -u | wc -l', { encoding: 'utf8' });
      return parseInt(result.trim()) || 0;
    } catch (error) {
      throw new Error(`Failed to get contributor count: ${error.message}`);
    }
  }

  getBranchCount() {
    try {
      // Count all branches (local + remote, avoiding duplicates)
      const localBranches = execSync('git branch | wc -l', { encoding: 'utf8' });
      const remoteBranches = execSync('git branch -r | grep -v "origin/HEAD" | wc -l', { encoding: 'utf8' });
      
      const local = parseInt(localBranches.trim()) || 0;
      const remote = parseInt(remoteBranches.trim()) || 0;
      
      // Use the higher count as some branches might be local-only or remote-only
      return Math.max(local, remote);
    } catch (error) {
      // Fallback to local branches only
      try {
        const result = execSync('git branch | wc -l', { encoding: 'utf8' });
        return parseInt(result.trim()) || 1;
      } catch (fallbackError) {
        return 1;
      }
    }
  }

  getLastCommitInfo() {
    try {
      const hash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
      const message = execSync('git log -1 --pretty=%s', { encoding: 'utf8' }).trim();
      const author = execSync('git log -1 --pretty=%an', { encoding: 'utf8' }).trim();
      const date = execSync('git log -1 --pretty=%cI', { encoding: 'utf8' }).trim();
      const filesChanged = execSync('git show --stat --format="" | grep -c "^[[:space:]]*[^|]*|"', { encoding: 'utf8' }).trim();

      if (!hash || !message || !author || !date) {
        throw new Error('Incomplete commit information');
      }

      return {
        hash: hash,
        message: message,
        author: author,
        date: date,
        filesChanged: parseInt(filesChanged) || 0
      };
    } catch (error) {
      throw new Error(`Failed to get last commit info: ${error.message}`);
    }
  }

  getRepositoryAge() {
    try {
      const firstCommitDate = execSync('git log --reverse --pretty=%ct | head -n 1', { encoding: 'utf8' }).trim();
      const firstCommitTimestamp = parseInt(firstCommitDate) * 1000;
      const now = Date.now();
      const ageInDays = Math.floor((now - firstCommitTimestamp) / (1000 * 60 * 60 * 24));
      
      return {
        days: ageInDays,
        firstCommit: new Date(firstCommitTimestamp).toISOString()
      };
    } catch (error) {
      return {
        days: 0,
        firstCommit: new Date().toISOString()
      };
    }
  }

  getCommitFrequency() {
    try {
      const totalCommits = this.getCommitCount();
      const repoAge = this.getRepositoryAge();
      
      if (repoAge.days === 0) {
        return {
          commitsPerDay: totalCommits,
          commitsPerWeek: totalCommits * 7,
          commitsPerMonth: totalCommits * 30
        };
      }

      const commitsPerDay = totalCommits / repoAge.days;
      
      return {
        commitsPerDay: Math.round(commitsPerDay * 100) / 100,
        commitsPerWeek: Math.round(commitsPerDay * 7 * 100) / 100,
        commitsPerMonth: Math.round(commitsPerDay * 30 * 100) / 100
      };
    } catch (error) {
      return {
        commitsPerDay: 0,
        commitsPerWeek: 0,
        commitsPerMonth: 0
      };
    }
  }

  async updateStatsFile(gitStats) {
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
      git: gitStats,
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(CONFIG.statsFile, JSON.stringify(updatedStats, null, 2));
  }

  async callNextScript() {
    try {
      const { execa } = require('execa');
      const nextScript = path.join(__dirname, 'lighthouse-stats.js');
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
  const generator = new GitStatsGenerator();
  generator.run().catch(console.error);
}

module.exports = GitStatsGenerator;
