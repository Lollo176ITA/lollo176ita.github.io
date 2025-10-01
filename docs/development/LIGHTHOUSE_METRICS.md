# Lighthouse Metrics Automation

[⬅️ Torna al README](../../README.md)

Documentation for the automated Lighthouse performance metrics collection system.

## Overview

The project includes an automated system to collect real performance metrics using Lighthouse. These metrics are displayed on the `/creations` page, providing concrete data instead of estimated values.

## Collected Metrics

The system tracks four key Lighthouse scores:

- **Performance** (0-100): Page load speed and optimization
- **Accessibility** (0-100): Screen reader compatibility and WCAG compliance
- **Best Practices** (0-100): Security, HTTPS, console errors
- **SEO** (0-100): Search engine optimization

## Available Scripts

### Generate Base Statistics

```bash
pnpm run stats
```

Generates project statistics without Lighthouse metrics.

### Generate Complete Statistics with Lighthouse

```bash
pnpm run stats:lighthouse
```

Executes complete build + Lighthouse audit + statistics generation.

### Copy Statistics to Public Folder

```bash
pnpm run stats:copy
```

Copies the statistics file to the public folder for runtime access.

### Validate Metrics

```bash
pnpm run stats:test
```

Verifies that metrics are valid and complete.

## Project Integration

### Statistics Generation Script

The `scripts/stats/code-stats.js` file includes a `getLighthouseScores()` function that:

1. Starts a local server with the production build
2. Executes automated Lighthouse audit
3. Extracts metrics (Performance, Accessibility, Best Practices, SEO)
4. Saves results to `src/data/project-stats.json`

### Component Usage

```javascript
// src/hooks/useStats.js
import { useState, useEffect } from 'react';

export const useStats = () => {
  const [stats, setStats] = useState({
    lighthouse: {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0
    }
  });

  useEffect(() => {
    fetch('/project-stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.warn('Stats not available:', err));
  }, []);

  return stats;
};
```

### Display in Creations Page

```javascript
// src/components/pages/CreationsPage.js
const { lighthouse } = useStats();

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard 
    label="Performance" 
    value={lighthouse.performance} 
    suffix="/100"
    color="text-green-500"
  />
  <StatCard 
    label="Accessibility" 
    value={lighthouse.accessibility} 
    suffix="/100"
    color="text-blue-500"
  />
  <StatCard 
    label="Best Practices" 
    value={lighthouse.bestPractices} 
    suffix="/100"
    color="text-purple-500"
  />
  <StatCard 
    label="SEO" 
    value={lighthouse.seo} 
    suffix="/100"
    color="text-orange-500"
  />
</div>
```

## Configuration

### Lighthouse Configuration

Optional configuration file for custom audit settings:

```javascript
// scripts/lighthouse.config.js
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'performance',
      'accessibility',
      'best-practices',
      'seo'
    ],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    }
  }
};
```

### Server Configuration

Local server setup for Lighthouse audit:

```javascript
// scripts/stats/code-stats.js - Server setup
const server = spawn('npx', ['serve', '-s', 'build', '-p', port], {
  stdio: 'pipe',
  shell: true
});

// Wait for server to be ready
await new Promise(resolve => {
  server.stdout.on('data', (data) => {
    if (data.toString().includes('Accepting connections')) {
      setTimeout(resolve, 2000); // Extra wait for stability
    }
  });
});
```

## Metrics Output

### JSON Format

Standard output format for generated metrics:

```json
{
  "lighthouse": {
    "performance": 85,
    "accessibility": 92,
    "bestPractices": 100,
    "seo": 100
  },
  "generated": "2025-06-18T15:30:00.000Z",
  "url": "http://localhost:3000"
}
```

### Detailed Metrics (Optional)

Extended format with additional performance data:

```json
{
  "lighthouse": {
    "performance": {
      "score": 85,
      "metrics": {
        "firstContentfulPaint": 1200,
        "largestContentfulPaint": 2500,
        "totalBlockingTime": 150,
        "cumulativeLayoutShift": 0.1,
        "speedIndex": 2000
      }
    },
    "accessibility": {
      "score": 92,
      "details": "..."
    }
  }
}
```

## Benefits

### Automation
- Automatic generation on every build
- No manual intervention required
- CI/CD pipeline integration ready

### Real Data
- Actual metrics instead of estimates
- Updated with each deployment
- Historical tracking capability

### Visibility
- Metrics displayed on /creations page
- Performance trends over time
- Transparent project quality

### Integration
- Easy integration with build process
- Minimal performance overhead
- Robust error handling

## Technical Notes

### Port Management
- Script automatically finds available port
- Default range: 3000-3100
- Automatic cleanup after audit

### Timeout Configuration
- Default: 30 seconds maximum for audit
- Configurable for slower systems
- Graceful fallback on timeout

### Error Handling
- Fallback to default values on failure
- Server automatically terminated after audit
- Detailed error logging for debugging

### Performance Impact
- Adds ~30-45 seconds to build time
- Only runs when explicitly requested
- Skippable for development builds

## Troubleshooting

### Issue: Lighthouse Cannot Find Page

**Symptoms**: Audit fails with connection error

**Solution**:
```bash
# Verify build exists
pnpm run build

# Verify server is reachable
curl http://localhost:3000

# Check for port conflicts
lsof -i :3000
```

### Issue: Audit Timeout

**Symptoms**: Lighthouse times out before completing audit

**Solution**:
```javascript
// Increase timeout in code-stats.js
const result = await lighthouse(url, {
  port: chromePort,
  output: 'json'
}, null, undefined, { 
  timeout: 60000 // Increase to 60 seconds
});
```

### Issue: Chrome Not Available

**Symptoms**: Chrome/Chromium binary not found

**Solution**:
```bash
# macOS
brew install --cask google-chrome

# Ubuntu/Debian
sudo apt-get install chromium-browser

# Windows
# Download from https://www.google.com/chrome/
```

### Issue: Inconsistent Results

**Symptoms**: Metrics vary significantly between runs

**Possible Causes**:
- System load during audit
- Network conditions
- Chrome extensions interference

**Solution**:
- Run audit on idle system
- Use headless mode (already default)
- Clear Chrome cache before audit
- Run multiple audits and average results

## Best Practices

### When to Run Lighthouse Audit

**Recommended**:
- Before deployment
- After major performance changes
- During release process
- Weekly for tracking trends

**Not Recommended**:
- During active development
- On every commit
- In hot-reload mode

### Interpreting Scores

**Performance**:
- 90-100: Excellent
- 50-89: Needs improvement
- 0-49: Poor

**Target Scores**:
- Performance: 70+ (current: 57)
- Accessibility: 90+ (current: 88)
- Best Practices: 95+ (current: 100)
- SEO: 95+ (current: 100)

### Optimization Tips

Based on audit results:
- Reduce bundle size for better performance
- Implement lazy loading for images
- Optimize font loading strategy
- Minimize render-blocking resources

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Lighthouse CI

on:
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm run build
      
      - name: Run Lighthouse
        run: pnpm run stats:lighthouse
      
      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: lighthouse-results
          path: src/data/project-stats.json
```

---

Last updated: October 2025
