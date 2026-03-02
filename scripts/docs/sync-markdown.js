#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
);

const SCRIPT_METADATA = {
  start: {
    group: 'development',
    readmeIt: 'Avvia il dev server Vite su `localhost:3000`',
    readmeEn: 'Start the Vite dev server on `localhost:3000`',
    docsDescription: 'Avvia il dev server Vite locale (hot reload)',
    docsWhen: 'Sviluppo quotidiano',
  },
  build: {
    group: 'build',
    readmeIt: 'Build standard con Vite',
    readmeEn: 'Run the standard Vite build',
    docsDescription: 'Genera la build standard con Vite',
    docsWhen: 'Verifica locale del bundle',
  },
  'build:prod': {
    group: 'build',
    readmeIt: 'Esegui la build di produzione ottimizzata',
    readmeEn: 'Run the optimized production build',
    docsDescription: 'Genera la build di produzione ottimizzata',
    docsWhen: 'Prima del deploy',
  },
  'build:analyze': {
    group: 'build',
    readmeIt: 'Esegui la build con analisi del bundle',
    readmeEn: 'Build with bundle analysis enabled',
    docsDescription: 'Build con analisi del bundle',
    docsWhen: 'Analisi performance bundle',
  },
  test: {
    group: 'quality',
    readmeIt: 'Esegui i test con Vitest',
    readmeEn: 'Run the Vitest suite',
    docsDescription: 'Esegue la suite test con Vitest',
    docsWhen: 'Prima di push e release',
  },
  'test:ui': {
    group: 'quality',
    readmeIt: 'Apri la UI interattiva di Vitest',
    readmeEn: 'Open the interactive Vitest UI',
    docsDescription: 'Avvia la UI interattiva di Vitest',
    docsWhen: 'Debug dei test in locale',
  },
  'docs:sync': {
    group: 'automation',
    readmeIt: 'Sincronizza le sezioni Markdown gestite automaticamente',
    readmeEn: 'Sync the managed Markdown sections',
    docsDescription: 'Aggiorna le sezioni auto-generate di README e docs',
    docsWhen: 'Prima di commit e nei job GitHub',
  },
  stats: {
    group: 'automation',
    readmeIt: 'Rigenera le statistiche del progetto',
    readmeEn: 'Regenerate project statistics',
    docsDescription: 'Rigenera `project-stats.json` e lo copia in `public/`',
    docsWhen: 'Aggiornamento metriche repository',
  },
  'version:tag': {
    group: 'automation',
    readmeIt: 'Stampa il tag release derivato dalla versione',
    readmeEn: 'Print the release tag derived from the version',
    docsDescription: 'Restituisce il tag release da `package.json` (es. `v2.5.0`)',
    docsWhen: 'Automazione release e debug locale',
  },
  'prepare:content': {
    group: 'automation',
    readmeIt: 'Sincronizza docs e statistiche generate',
    readmeEn: 'Sync generated docs and stats',
    docsDescription: 'Esegue `docs:sync` e `stats` nella sequenza corretta',
    docsWhen: 'Prima di build e deploy',
  },
  predeploy: {
    group: 'deploy',
    readmeIt: 'Prepara contenuti e genera la build finale',
    readmeEn: 'Prepare generated content and build for release',
    docsDescription: 'Sincronizza contenuti generati e poi crea la build finale',
    docsWhen: 'Base comune per deploy locale e CI',
  },
  deploy: {
    group: 'deploy',
    readmeIt: 'Pubblica `build/` su GitHub Pages con `gh-pages`',
    readmeEn: 'Publish `build/` to GitHub Pages with `gh-pages`',
    docsDescription: 'Pubblica `build/` su GitHub Pages usando `gh-pages`',
    docsWhen: 'Deploy manuale dal proprio ambiente',
  },
  preview: {
    group: 'development',
    readmeIt: 'Serve la build locale in modalita preview',
    readmeEn: 'Serve the local build in preview mode',
    docsDescription: 'Serve la build locale in modalita preview',
    docsWhen: 'Controllo post-build in locale',
  },
};

const DEV_DEPENDENCY_METADATA = {
  '@testing-library/jest-dom': {
    description: 'Matcher DOM aggiuntivi per i test',
    usage: 'Vitest + Testing Library',
  },
  '@testing-library/react': {
    description: 'Utility di render e query per componenti React',
    usage: 'Test componenti React',
  },
  '@vitejs/plugin-react': {
    description: 'Plugin React ufficiale per Vite',
    usage: 'vite.config.js',
  },
  '@vitest/ui': {
    description: 'Interfaccia web interattiva per Vitest',
    usage: 'Script `test:ui`',
  },
  autoprefixer: {
    description: 'Aggiunge i vendor prefix al CSS',
    usage: 'postcss.config.js',
  },
  eslint: {
    description: 'Linting JavaScript e JSX',
    usage: 'Controlli statici',
  },
  'eslint-plugin-react': {
    description: 'Regole ESLint specifiche per React',
    usage: '.eslintrc.json',
  },
  'eslint-plugin-react-hooks': {
    description: 'Regole ESLint per gli hook React',
    usage: '.eslintrc.json',
  },
  execa: {
    description: 'Esecuzione processi child da Node.js',
    usage: 'Script di automazione',
  },
  'gh-pages': {
    description: 'Pubblicazione della cartella `build/` su GitHub Pages',
    usage: 'Script `deploy`',
  },
  glob: {
    description: 'Ricerca file tramite pattern glob',
    usage: 'Script di statistiche',
  },
  jsdom: {
    description: 'DOM emulato per test in ambiente Node',
    usage: 'Vitest',
  },
  lighthouse: {
    description: 'Audit automatici di performance e qualita',
    usage: 'scripts/stats/lighthouse-stats.js',
  },
  postcss: {
    description: 'Pipeline di trasformazione CSS',
    usage: 'postcss.config.js',
  },
  serve: {
    description: 'Server statico locale per test build',
    usage: 'Preview e Lighthouse',
  },
  vite: {
    description: 'Dev server e build tool principale',
    usage: 'Script `start`, `build`, `build:prod`',
  },
  'vite-bundle-visualizer': {
    description: 'Visualizzazione grafica del bundle',
    usage: 'Analisi bundle',
  },
  'vite-plugin-compression2': {
    description: 'Compressione gzip in fase di build',
    usage: 'vite.config.js',
  },
  vitest: {
    description: 'Test runner principale del progetto',
    usage: 'Script `test` e `test:ui`',
  },
};

const SCRIPT_ORDER = [
  'start',
  'preview',
  'build',
  'build:prod',
  'build:analyze',
  'test',
  'test:ui',
  'docs:sync',
  'stats',
  'version:tag',
  'prepare:content',
  'predeploy',
  'deploy',
];

const README_GROUPS = [
  {
    key: 'development',
    it: 'Sviluppo',
    en: 'Development',
  },
  {
    key: 'build',
    it: 'Build',
    en: 'Build',
  },
  {
    key: 'quality',
    it: 'Qualita',
    en: 'Quality',
  },
  {
    key: 'automation',
    it: 'Automazione',
    en: 'Automation',
  },
  {
    key: 'deploy',
    it: 'Deploy',
    en: 'Deploy',
  },
];

function replaceManagedBlock(filePath, marker, content) {
  const start = `<!-- ${marker}:START -->`;
  const end = `<!-- ${marker}:END -->`;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const startIndex = fileContent.indexOf(start);
  const endIndex = fileContent.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Managed block ${marker} not found in ${path.relative(ROOT, filePath)}`);
  }

  const updated =
    fileContent.slice(0, startIndex + start.length) +
    '\n' +
    content.trim() +
    '\n' +
    fileContent.slice(endIndex);

  fs.writeFileSync(filePath, updated);
}

function getAvailableScripts() {
  return SCRIPT_ORDER.filter((name) => Object.prototype.hasOwnProperty.call(packageJson.scripts, name));
}

function buildReadmeCommandBlock(language) {
  const availableScripts = getAvailableScripts();
  const lines = ['```bash'];

  for (const group of README_GROUPS) {
    const groupScripts = availableScripts.filter(
      (name) => SCRIPT_METADATA[name] && SCRIPT_METADATA[name].group === group.key
    );

    if (groupScripts.length === 0) {
      continue;
    }

    lines.push(`# ${language === 'it' ? group.it : group.en}`);
    for (const scriptName of groupScripts) {
      const label = scriptName === 'start' ? 'pnpm start' : `pnpm run ${scriptName}`;
      const description =
        language === 'it'
          ? SCRIPT_METADATA[scriptName].readmeIt
          : SCRIPT_METADATA[scriptName].readmeEn;
      lines.push(`${label}  # ${description}`);
    }
    lines.push('');
  }

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  lines.push('```');
  return lines.join('\n');
}

function buildScriptsGuideTable() {
  const lines = [
    '| Comando | Descrizione | Quando usarlo |',
    '|---------|-------------|---------------|',
  ];

  for (const scriptName of getAvailableScripts()) {
    const metadata = SCRIPT_METADATA[scriptName];
    if (!metadata) {
      continue;
    }

    const command = scriptName === 'start' ? '`pnpm start`' : `\`pnpm run ${scriptName}\``;
    lines.push(
      `| ${command} | ${metadata.docsDescription} | ${metadata.docsWhen} |`
    );
  }

  return lines.join('\n');
}

function buildDeployFlow() {
  return [
    '```bash',
    'pnpm run predeploy  # Sincronizza docs/stats e genera la build finale',
    'pnpm run deploy     # Pubblica ./build con gh-pages',
    '```',
  ].join('\n');
}

function buildDevDependenciesTable() {
  const devDependencies = Object.keys(packageJson.devDependencies || {}).sort((a, b) =>
    a.localeCompare(b)
  );
  const lines = [
    '| Pacchetto | Scopo | Usato da |',
    '|-----------|-------|----------|',
  ];

  for (const dependency of devDependencies) {
    const metadata = DEV_DEPENDENCY_METADATA[dependency] || {
      description: 'Dipendenza di supporto al toolchain',
      usage: 'Tooling del progetto',
    };
    lines.push(
      `| \`${dependency}\` | ${metadata.description} | ${metadata.usage} |`
    );
  }

  return lines.join('\n');
}

function main() {
  replaceManagedBlock(
    path.join(ROOT, 'README.md'),
    'AUTO:README_IT_COMMANDS',
    buildReadmeCommandBlock('it')
  );
  replaceManagedBlock(
    path.join(ROOT, 'README.md'),
    'AUTO:README_EN_COMMANDS',
    buildReadmeCommandBlock('en')
  );
  replaceManagedBlock(
    path.join(ROOT, 'docs', 'SCRIPTS-GUIDE.md'),
    'AUTO:SCRIPTS_GUIDE_TABLE',
    buildScriptsGuideTable()
  );
  replaceManagedBlock(
    path.join(ROOT, 'docs', 'SCRIPTS-GUIDE.md'),
    'AUTO:SCRIPTS_GUIDE_FLOW',
    buildDeployFlow()
  );
  replaceManagedBlock(
    path.join(ROOT, 'docs', 'SCRIPTS-GUIDE.md'),
    'AUTO:SCRIPTS_GUIDE_DEVDEPS',
    buildDevDependenciesTable()
  );

  console.log('Managed Markdown sections synchronized.');
}

main();
