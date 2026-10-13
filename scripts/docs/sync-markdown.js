#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
);

const SCRIPT_METADATA = {
  dev: {
    group: 'development',
    readmeIt: 'Avvia il dev server Next.js su `localhost:3000`',
    readmeEn: 'Start the Next.js dev server on `localhost:3000`',
    docsDescription: 'Avvia il dev server Next.js (Turbopack, hot reload)',
    docsWhen: 'Sviluppo quotidiano',
  },
  build: {
    group: 'build',
    readmeIt: 'Genera l\'export statico in `out/`',
    readmeEn: 'Generate the static export in `out/`',
    docsDescription: 'Esegue `next build` con `output: "export"` e scrive il sito statico in `out/`',
    docsWhen: 'Verifica locale e deploy',
  },
  lint: {
    group: 'quality',
    readmeIt: 'Controlla il codice con ESLint',
    readmeEn: 'Lint the code with ESLint',
    docsDescription: 'Esegue ESLint con la configurazione di Next.js',
    docsWhen: 'Prima di push e release',
  },
  test: {
    group: 'quality',
    readmeIt: 'Esegui i test con Vitest',
    readmeEn: 'Run the Vitest suite',
    docsDescription: 'Esegue la suite test con Vitest',
    docsWhen: 'Prima di push e release',
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
  'prepare:content': {
    group: 'automation',
    readmeIt: 'Sincronizza docs e statistiche generate',
    readmeEn: 'Sync generated docs and stats',
    docsDescription: 'Esegue `docs:sync` e `stats` nella sequenza corretta',
    docsWhen: 'Prima di build e deploy',
  },
  predeploy: {
    group: 'build',
    readmeIt: 'Prepara contenuti generati e crea la build finale',
    readmeEn: 'Prepare generated content and build the final artifact',
    docsDescription: 'Sincronizza contenuti generati e poi crea la build finale',
    docsWhen: 'Build completa pronta per il deploy automatico',
  },
};

const DEV_DEPENDENCY_METADATA = {
  '@tailwindcss/turbopack': {
    description: 'Loader Turbopack per Tailwind CSS v4',
    usage: 'next.config.ts',
  },
  '@types/node': {
    description: 'Tipi TypeScript per Node.js',
    usage: 'TypeScript',
  },
  '@types/react': {
    description: 'Tipi TypeScript per React',
    usage: 'TypeScript',
  },
  '@types/react-dom': {
    description: 'Tipi TypeScript per React DOM',
    usage: 'TypeScript',
  },
  'babel-plugin-react-compiler': {
    description: 'React Compiler (memoizzazione automatica)',
    usage: 'next.config.ts (`reactCompiler`)',
  },
  eslint: {
    description: 'Linting di TypeScript e JSX',
    usage: 'Script `lint`',
  },
  'eslint-config-next': {
    description: 'Regole ESLint ufficiali di Next.js',
    usage: 'eslint.config.mjs',
  },
  tailwindcss: {
    description: 'Framework CSS utility-first',
    usage: 'src/app/globals.css',
  },
  typescript: {
    description: 'Type checking',
    usage: 'tsconfig.json, `next build`',
  },
  vitest: {
    description: 'Test runner del progetto',
    usage: 'Script `test`',
  },
};

const SCRIPT_ORDER = [
  'dev',
  'build',
  'lint',
  'test',
  'docs:sync',
  'stats',
  'prepare:content',
  'predeploy',
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
    'git push origin dev  # Avvia validazione, merge automatico su main e deploy Pages',
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
