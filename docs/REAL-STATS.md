# Real Statistics System

[⬅️ Back to README](../README.md)

Automated statistics generation and integration system.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [React Hooks](#react-hooks)
- [Configuration](#configuration--usage)
- [Data Display](#data-display)
- [Troubleshooting](#troubleshooting)

## Overview

Automatically analyzes local project and combines with GitHub API data to provide accurate, real-time metrics displayed throughout the site.

## Architecture

### Core Files

```
scripts/stats/
├── code-stats.js          # Code analysis script
├── git-stats.js           # Git statistics
├── lighthouse-stats.js    # Performance metrics
└── structure-stats.js     # Project structure analysis

src/
├── hooks/useStats.js      # React hooks for statistics
└── data/project-stats.json # Generated statistics data

public/
└── project-stats.json     # Public statistics file
```

## Features

### 1. Code Analysis

Automatically scans the project to calculate:

**File Metrics**:
- Total files count by type (.js, .jsx, .css, .json, .md)
- Lines of code (excluding empty lines and comments)
- Language distribution percentages
- React component detection

**Project Structure**:
- Route count (from App.js)
- Custom hooks count (from `src/hooks/`)
- Book data analysis (from `src/data/books.js`)
- Chapter counting across books

### 2. Git Statistics

Collects repository information:

- Total commits: `git rev-list --count HEAD`
- Contributors: `git shortlog -sn`
- Branch listing: `git branch -r`
- Latest commit details (hash, message, author, date)

### 3. Package Information

Extracts from `package.json`:

- Project name and version
- Dependencies count (production + development)
- Available npm scripts
- Package manager information

### 4. Performance Metrics

Lighthouse integration for:

- Performance score
- Accessibility score
- Best Practices score
- SEO score

See [LIGHTHOUSE_METRICS.md](./development/LIGHTHOUSE_METRICS.md) for details.

## React Hooks

### useGitHubStats()

Fetches and combines local + GitHub API data with intelligent fallback.

**Returns**: `{ stats, loading, error }` with stats containing: `totalCommits`, `languages`, `contributors`, `lastUpdate`, `stars`, `forks`

### useSiteStats()

Loads statistics from generated `project-stats.json`.

**Returns**: `{ components, routes, hooks, totalFiles, linesOfCode, languages, buildTime, bundleSize }`

### usePersonalStats()

Calculates derived statistics based on actual commit count (coffee consumed, bugs fixed, etc.).

## Configuration & Usage

### NPM Scripts

```bash
pnpm run stats              # Generate statistics manually
pnpm run stats:lighthouse   # Generate with Lighthouse metrics
pnpm run stats:copy         # Copy to public folder
pnpm run stats:test         # Validate statistics
```

### Build Automation

Statistics automatically regenerate on each build via `predeploy` script.

## Generated Statistics File

The `project-stats.json` file contains:

```json
{
  "project": {
    "name": "lollo176ita.github.io",
    "version": "2.2.8",
    "description": "Personal website and portfolio"
  },
  "code": {
    "totalFiles": 150,
    "linesOfCode": 8500,
    "languages": {
      "JavaScript": { "files": 85, "lines": 6200, "percentage": 72.9 },
      "CSS": { "files": 25, "lines": 1500, "percentage": 17.6 },
      "JSON": { "files": 15, "lines": 400, "percentage": 4.7 },
      "Markdown": { "files": 25, "lines": 400, "percentage": 4.7 }
    },
    "components": 45,
    "hooks": 8,
    "routes": 12
  },
  "git": {
    "totalCommits": 350,
    "contributors": 1,
    "branches": 3,
    "lastCommit": {
      "hash": "abc123...",
      "message": "Latest commit message",
      "author": "lollo176ita",
      "date": "2025-10-01"
    }
  },
  "dependencies": {
    "total": 45,
    "production": 20,
    "development": 25
  },
  "performance": {
    "lighthouse": {
      "performance": 57,
      "accessibility": 88,
      "bestPractices": 100,
      "seo": 100
    },
    "buildTime": "13.1s",
    "bundleSize": "131KB"
  },
  "generated": "2025-10-01T12:00:00.000Z"
}
```

## Data Display

Statistics displayed across site:

- **About**: Total commits, lines of code, project duration, technologies
- **History**: Commit timeline, version milestones, contributor info
- **Creations**: Lighthouse metrics, performance scores, build stats
- **Homepage**: Quick overview, recent activity, project highlights

## GitHub API Integration

**Rate Limits**: 60 req/hour (unauth) | 5000 req/hour (auth)

**Handling**: Response caching, local data fallback, error messages

**Authentication**: Add `REACT_APP_GITHUB_TOKEN` to `.env.local` for increased limits. [Generate token →](https://github.com/settings/tokens)

## Error Handling & Performance

**Error Handling**: Fallback to local stats, cached data, default values, validation checks

**Caching**: localStorage with 1-hour invalidation

**Generation Time**: ~5 seconds (code + git) | ~35 seconds (with Lighthouse)

## Troubleshooting

**Stats Not Updating**:
1. Clear cache: `localStorage.removeItem('project-stats-cache')`
2. Regenerate: `pnpm run stats`
3. Check permissions: `ls -la src/data/project-stats.json`

**GitHub API Errors**:
1. Check rate limit: `curl https://api.github.com/rate_limit`
2. Add auth token (see [GitHub API Integration](#github-api-integration))
3. Use local fallback

**Build Errors**:
1. Make scripts executable: `chmod +x scripts/stats/*.js`
2. Check Node.js version (>= 18.0.0): `node --version`
3. Verify dependencies: `pnpm install`

---

Last updated: October 2025
