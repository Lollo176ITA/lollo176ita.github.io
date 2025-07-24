#!/usr/bin/env node

/**
 * Script di deployment ottimizzato per GitHub Pages
 */

const fs = require('fs').promises;
const path = require('path');
const { execa } = require('execa');

const projectRoot = process.cwd();

async function runCommand(command, args) {
  await execa(command, args, { stdio: 'inherit', cwd: projectRoot });
}

async function optimizedDeploy() {
  console.log('🚀 Optimized deployment starting...');
  
  try {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const homepageUrl = packageJson.homepage;

    if (!homepageUrl) {
      throw new Error("Homepage field not defined in package.json");
    }

    // Generate stats and build
    await runCommand('pnpm', ['run', 'stats']);
    await runCommand('pnpm', ['run', 'build:prod']);
    
    // Configure PWA for GitHub Pages
    await Promise.all([
      updateServiceWorkerForGitHubPages(homepageUrl),
      optimizeManifest(homepageUrl)
    ]);
    
    // Deploy
    await runCommand('pnpm', ['run', 'deploy']);
    
    console.log('✅ Deployment completed successfully!');
    
  } catch (error) {
    console.error('❌ Deployment error:', error.message);
    process.exit(1);
  }
}

async function updateServiceWorkerForGitHubPages(homepage) {
  const swPath = path.join(projectRoot, 'build', 'sw.js');
  try {
    let swContent = await fs.readFile(swPath, 'utf8');
    const homepageUrl = new URL(homepage);
    const basePath = homepageUrl.pathname.endsWith('/') ? homepageUrl.pathname : `${homepageUrl.pathname}/`;

    swContent = swContent.replace(
      /const STATIC_FILES = \[[\s\S]*?\];/,
      `const STATIC_FILES = [\n  '${basePath}',\n  '${basePath}manifest.json'\n];`
    );
    
    swContent = swContent.replace(
      /url\.origin !== location\.origin/,
      `url.origin !== location.origin && !url.href.startsWith('${homepageUrl.origin}')`
    );
    
    await fs.writeFile(swPath, swContent);
  } catch (error) {
    // Ignore if Service Worker not found
  }
}

async function optimizeManifest(homepage) {
  const manifestPath = path.join(projectRoot, 'build', 'manifest.json');
  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    const homepageUrl = new URL(homepage);
    const basePath = homepageUrl.pathname.endsWith('/') ? homepageUrl.pathname : `${homepageUrl.pathname}/`;

    manifest.start_url = basePath;
    manifest.scope = basePath;
    manifest.background_color = '#000000';
    manifest.theme_color = '#3B82F6';
    manifest.display = 'standalone';
    manifest.orientation = 'portrait-primary';
    
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  } catch (error) {
    // Ignore if manifest not found
  }
}

// Esegui deployment
optimizedDeploy();
