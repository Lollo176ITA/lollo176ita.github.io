#!/usr/bin/env node

/**
 * Unified project statistics generator
 * Combines: code-stats, structure-stats, git-stats
 * 
 * Generates a single project-stats.json with all metrics.
 * Lighthouse stats are excluded (run separately with: node scripts/stats/lighthouse-stats.js)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  srcDir: path.join(__dirname, '..', '..', 'src'),
  statsFile: path.join(__dirname, '..', '..', 'src', 'data', 'project-stats.json'),
  projectRoot: path.join(__dirname, '..', '..')
};

// ─── Utility ─────────────────────────────────────────────

function readStatsFile() {
  try {
    if (fs.existsSync(CONFIG.statsFile)) {
      return JSON.parse(fs.readFileSync(CONFIG.statsFile, 'utf8'));
    }
  } catch {
    // ignore parse errors
  }
  return {};
}

function writeStatsFile(stats) {
  const dir = path.dirname(CONFIG.statsFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG.statsFile, JSON.stringify(stats, null, 2));
}

function exec(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', cwd: CONFIG.projectRoot }).trim();
  } catch {
    return '';
  }
}

function toInt(str) {
  return parseInt(str) || 0;
}

// ─── Code Stats ──────────────────────────────────────────

function generateCodeStats() {
  const extensions = ['js', 'ts', 'jsx', 'tsx', 'css', 'json', 'md'];
  
  const counts = {};
  const lines = {};
  
  for (const ext of extensions) {
    counts[ext] = toInt(exec(`find "${CONFIG.srcDir}" -name "*.${ext}" -type f | wc -l`));
    lines[ext] = toInt(exec(`find "${CONFIG.srcDir}" -name "*.${ext}" -type f -exec cat {} + 2>/dev/null | wc -l`));
  }

  const totalFiles = extensions.reduce((sum, ext) => sum + counts[ext], 0);
  const totalLines = extensions.reduce((sum, ext) => sum + lines[ext], 0);

  // Code lines (non-empty, non-comment) for JS/JSX/TS/TSX
  const codeExts = ['js', 'jsx', 'ts', 'tsx'];
  const codeLines = toInt(exec(
    `find "${CONFIG.srcDir}" \\( ${codeExts.map(e => `-name "*.${e}"`).join(' -o ')} \\) | xargs grep -v "^[[:space:]]*$" 2>/dev/null | grep -v "^[[:space:]]*//.*$" | grep -v "^[[:space:]]*\\*.*$" | wc -l`
  )) || Math.round(totalLines * 0.85);
  
  const blankLines = toInt(exec(
    `find "${CONFIG.srcDir}" \\( ${codeExts.map(e => `-name "*.${e}"`).join(' -o ')} \\) | xargs grep -c "^[[:space:]]*$" 2>/dev/null | awk -F: '{sum += $2} END {print sum}'`
  )) || Math.round(totalLines * 0.10);

  // Build languages breakdown
  const languages = {};
  const langMap = {
    JavaScript: { files: counts.js + counts.jsx, lines: lines.js + lines.jsx },
    TypeScript: { files: counts.ts + counts.tsx, lines: lines.ts + lines.tsx },
    CSS: { files: counts.css, lines: lines.css },
    JSON: { files: counts.json, lines: lines.json },
    Markdown: { files: counts.md, lines: lines.md }
  };

  for (const [name, data] of Object.entries(langMap)) {
    if (data.files > 0 && totalLines > 0) {
      languages[name] = {
        files: data.files,
        lines: data.lines,
        percentage: Math.round((data.lines / totalLines) * 1000) / 10
      };
    }
  }

  return {
    files: totalFiles,
    totalLines,
    codeLines,
    blankLines,
    commentLines: totalLines - codeLines - blankLines,
    languages,
    lastUpdated: new Date().toISOString()
  };
}

// ─── Structure Stats ─────────────────────────────────────

function generateStructureStats() {
  const countInDir = (dir) => {
    if (!fs.existsSync(dir)) return 0;
    return toInt(exec(`find "${dir}" \\( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \\) -type f | wc -l`));
  };

  const components = countInDir(path.join(CONFIG.srcDir, 'components'));
  const hooks = countInDir(path.join(CONFIG.srcDir, 'hooks'));
  const utils = countInDir(path.join(CONFIG.srcDir, 'utils'));
  const contexts = toInt(exec(`find "${CONFIG.srcDir}" \\( -name "*Context*.js" -o -name "*Context*.jsx" -o -name "*Context*.ts" -o -name "*Context*.tsx" \\) -type f | wc -l`));

  // Pages: src/pages + src/components/pages
  let pages = countInDir(path.join(CONFIG.srcDir, 'pages')) + countInDir(path.join(CONFIG.srcDir, 'components', 'pages'));
  if (pages === 0) {
    pages = toInt(exec(`find "${CONFIG.srcDir}" \\( -name "*Page.js" -o -name "*Page.jsx" \\) -type f | wc -l`));
  }

  // Routes from App.js
  let routes = 0;
  const appFile = path.join(CONFIG.srcDir, 'App.js');
  if (fs.existsSync(appFile)) {
    const content = fs.readFileSync(appFile, 'utf8');
    routes = (content.match(/<Route\s+[^>]*path\s*=\s*["'][^"']*["'][^>]*>/g) || []).length;
  }

  // Books & chapters from data/books.js
  let booksCount = 0, chaptersCount = 0;
  const booksFile = path.join(CONFIG.srcDir, 'data', 'books.js');
  if (fs.existsSync(booksFile)) {
    const content = fs.readFileSync(booksFile, 'utf8');
    booksCount = (content.match(/{\s*\n?\s*type:/g) || []).length;
    const chapterMatches = content.match(/chapters:\s*\[([\s\S]*?)\]/g) || [];
    for (const match of chapterMatches) {
      chaptersCount += (match.match(/{\s*slug:/g) || []).length;
    }
  }

  return {
    components, pages, hooks, routes,
    books: booksCount, chapters: chaptersCount,
    utils, contexts,
    lastUpdated: new Date().toISOString()
  };
}

// ─── Git Stats ───────────────────────────────────────────

function generateGitStats() {
  // Check if git repo
  if (!exec('git rev-parse --git-dir')) {
    return { commits: 0, contributors: 0, branches: 0, lastCommit: null };
  }

  const commits = toInt(exec('git rev-list --count HEAD'));
  const contributors = toInt(exec('git log --format="%an" | sort -u | wc -l'));
  
  const localBranches = toInt(exec('git branch | wc -l'));
  const remoteBranches = toInt(exec('git branch -r | grep -v "origin/HEAD" | wc -l'));
  const branches = Math.max(localBranches, remoteBranches);

  // Last commit info
  const hash = exec('git rev-parse --short HEAD');
  const message = exec('git log -1 --pretty=%s');
  const author = exec('git log -1 --pretty=%an');
  const date = exec('git log -1 --pretty=%cI');
  const filesChanged = toInt(exec('git show --stat --format="" | grep -c "^[[:space:]]*[^|]*|"'));

  // Repo age
  const firstCommitTs = toInt(exec('git log --reverse --pretty=%ct | head -n 1')) * 1000;
  const ageDays = firstCommitTs ? Math.floor((Date.now() - firstCommitTs) / 86400000) : 0;
  const commitsPerDay = ageDays > 0 ? Math.round((commits / ageDays) * 100) / 100 : commits;

  return {
    commits, contributors, branches,
    lastCommit: hash ? { hash, message, author, date, filesChanged } : null,
    repoAge: { days: ageDays, firstCommit: firstCommitTs ? new Date(firstCommitTs).toISOString() : null },
    commitFrequency: {
      commitsPerDay,
      commitsPerWeek: Math.round(commitsPerDay * 7 * 100) / 100,
      commitsPerMonth: Math.round(commitsPerDay * 30 * 100) / 100
    },
    lastUpdated: new Date().toISOString()
  };
}

// ─── Project Metadata ────────────────────────────────────

function getProjectMetadata() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(CONFIG.projectRoot, 'package.json'), 'utf8'));
    return {
      name: pkg.name,
      version: pkg.version,
      dependencies: Object.keys(pkg.dependencies || {}).length,
      devDependencies: Object.keys(pkg.devDependencies || {}).length
    };
  } catch {
    return {};
  }
}

// ─── Main ────────────────────────────────────────────────

function main() {
  const startTime = Date.now();

  if (!fs.existsSync(CONFIG.srcDir)) {
    console.error(`Source directory not found: ${CONFIG.srcDir}`);
    process.exit(1);
  }

  console.log('Generating project statistics...');

  const existing = readStatsFile();
  
  const code = generateCodeStats();
  const structure = generateStructureStats();
  const git = generateGitStats();
  const project = getProjectMetadata();

  const stats = {
    generated: new Date().toISOString(),
    generationTime: Date.now() - startTime,
    project: { ...existing.project, ...project },
    code,
    structure,
    git,
    // Preserve existing performance/lighthouse data
    performance: existing.performance || {}
  };

  writeStatsFile(stats);

  console.log(`Code: ${code.files} files, ${code.totalLines} lines (${code.codeLines} code)`);
  console.log(`Structure: ${structure.components} components, ${structure.pages} pages, ${structure.routes} routes`);
  console.log(`Git: ${git.commits} commits, ${git.contributors} contributors`);
  console.log(`Done in ${Date.now() - startTime}ms`);
}

main();
