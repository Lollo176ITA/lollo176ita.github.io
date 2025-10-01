# Real Statistics System

Documentation for the automated statistics generation and integration system.

## Overview

The real statistics system automatically analyzes the local project and combines data with GitHub API information to provide accurate, up-to-date metrics displayed throughout the site.

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

Fetches and combines local and GitHub API data.

**Features**:
- Combined local + GitHub API data
- Intelligent fallback to local data if API unavailable
- Language percentages from GitHub or local analysis
- Accurate commit data from local Git

**Usage**:
```javascript
import { useGitHubStats } from '../hooks/useStats';

function StatsComponent() {
  const { stats, loading, error } = useGitHubStats();
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return <div>Total Commits: {stats.totalCommits}</div>;
}
```

**Returned Data**:
```javascript
{
  totalCommits: number,
  languages: { [language]: percentage },
  contributors: number,
  lastUpdate: string,
  stars: number,
  forks: number
}
```

### useSiteStats()

Loads statistics from generated `project-stats.json`.

**Features**:
- Real project metrics
- Performance data
- Structure information
- Build statistics

**Usage**:
```javascript
import { useSiteStats } from '../hooks/useStats';

function SiteStatsComponent() {
  const stats = useSiteStats();
  
  return (
    <div>
      <p>Components: {stats.components}</p>
      <p>Routes: {stats.routes}</p>
    </div>
  );
}
```

**Returned Data**:
```javascript
{
  components: number,
  routes: number,
  hooks: number,
  totalFiles: number,
  linesOfCode: number,
  languages: { [language]: { files, lines, percentage } },
  buildTime: string,
  bundleSize: string
}
```

### usePersonalStats()

Calculates derived statistics based on real data.

**Features**:
- Calculations based on actual commit count
- Intelligent estimates (coffee per commit, bug fix percentages)
- Real-time data integration

**Usage**:
```javascript
import { usePersonalStats } from '../hooks/useStats';

function PersonalStatsComponent() {
  const stats = usePersonalStats();
  
  return (
    <div>
      <p>Coffee Consumed: {stats.coffeeConsumed}</p>
      <p>Bugs Fixed: {stats.bugsFixed}</p>
    </div>
  );
}
```

## Configuration and Usage

### NPM Scripts

```bash
# Generate statistics manually
pnpm run stats

# Generate statistics with Lighthouse metrics
pnpm run stats:lighthouse

# Copy stats to public folder
pnpm run stats:copy

# Validate statistics
pnpm run stats:test
```

### Build Automation

Statistics are automatically regenerated on each build:

```json
{
  "scripts": {
    "predeploy": "pnpm run build:prod && pnpm run stats",
    "stats": "node scripts/stats/code-stats.js && cp src/data/project-stats.json public/project-stats.json"
  }
}
```

### Manual Generation

To manually generate statistics:

```bash
# Navigate to project root
cd /path/to/project

# Run statistics generation
node scripts/stats/code-stats.js

# Copy to public folder
cp src/data/project-stats.json public/project-stats.json
```

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

Statistics are displayed in various components:

### About Page
- Total commits
- Lines of code
- Project duration
- Technologies used

### History Page
- Commit timeline
- Version milestones
- Contributor information

### Creations Page
- Lighthouse metrics
- Performance scores
- Build statistics

### Homepage
- Quick statistics overview
- Recent activity
- Project highlights

## GitHub API Integration

### Rate Limiting

The GitHub API has rate limits:
- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour

The system handles rate limiting by:
- Caching responses
- Falling back to local data
- Showing appropriate error messages

### Authentication

To increase rate limits, add a GitHub token:

```env
# .env.local
REACT_APP_GITHUB_TOKEN=your_github_token
```

Generate a token at: [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

Required scopes:
- `public_repo` (read-only access to public repositories)

## Error Handling

The statistics system includes robust error handling:

### Network Errors
- Falls back to local statistics
- Shows cached data when available
- Displays user-friendly error messages

### Missing Data
- Provides default values
- Logs warnings in development
- Continues operation with partial data

### Validation
- Validates generated statistics
- Checks for required fields
- Ensures data type correctness

## Performance Considerations

### Caching
- Statistics cached in localStorage
- Automatic cache invalidation after 1 hour
- Manual refresh available

### Bundle Size
- Statistics file excluded from main bundle
- Loaded on-demand for statistics pages
- Gzip compression reduces file size

### Generation Time
- Code analysis: ~2-3 seconds
- Git statistics: ~1 second
- Lighthouse audit: ~30 seconds (optional)
- Total: ~5 seconds (without Lighthouse)

## Troubleshooting

### Statistics Not Updating

1. Clear local cache:
```javascript
localStorage.removeItem('project-stats-cache');
```

2. Regenerate manually:
```bash
pnpm run stats
```

3. Check file permissions:
```bash
ls -la src/data/project-stats.json
```

### GitHub API Errors

1. Check rate limit:
```bash
curl https://api.github.com/rate_limit
```

2. Add authentication token (see [GitHub API Integration](#github-api-integration))

3. Use local fallback data

### Build Errors

1. Ensure scripts are executable:
```bash
chmod +x scripts/stats/*.js
```

2. Check Node.js version (>= 18.0.0):
```bash
node --version
```

3. Verify dependencies:
```bash
pnpm install
```

## Related Documentation

- [Architecture](./ARCHITECTURE.md) - Project architecture
- [Lighthouse Metrics](./development/LIGHTHOUSE_METRICS.md) - Performance monitoring
- [Performance Optimization](./development/PERFORMANCE_OPTIMIZATION.md) - Optimization strategies

---

Last updated: October 2025
