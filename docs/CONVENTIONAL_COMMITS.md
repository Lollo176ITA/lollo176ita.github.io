# Conventional Commits

Questa guida descrive il formato dei conventional commits utilizzati in questo progetto per mantenere un history chiaro e coerente.

## Formato

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Tipi di Commit

### **feat** - Nuove Funzionalità

Aggiunge una nuova funzionalità al progetto.

**Esempi:**

```text
feat: add dark mode toggle
feat(auth): implement user login
feat(ui): add responsive navigation menu
```

### **fix** - Correzioni di Bug

Corregge un bug esistente.

**Esempi:**

```text
fix: resolve mobile layout issues
fix(api): handle null response data
fix(router): prevent infinite redirect loop
```

### **docs** - Documentazione

Modifica solo la documentazione.

**Esempi:**

```text
docs: update installation instructions
docs(api): add endpoint documentation
docs: fix typos in README
```

### **style** - Formattazione

Cambiamenti che non influenzano il significato del codice (spazi, formattazione, punto e virgola mancanti, etc.).

**Esempi:**

```text
style: fix indentation in App.js
style: remove trailing whitespace
style(css): organize imports alphabetically
```

### **refactor** - Refactoring

Cambiamenti al codice che non correggono bug né aggiungono funzionalità.

**Esempi:**

```text
refactor: simplify authentication logic
refactor(components): extract common hooks
refactor: optimize rendering performance
```

### **perf** - Miglioramenti delle Prestazioni

Cambiamenti che migliorano le prestazioni.

**Esempi:**

```text
perf: lazy load images in gallery
perf(bundle): reduce JavaScript bundle size
perf: implement virtual scrolling
```

### **test** - Test

Aggiunta di test mancanti o correzione di test esistenti.

**Esempi:**

```text
test: add unit tests for utility functions
test(components): increase coverage for Header
test: fix flaky integration tests
```

### **build** - Sistema di Build

Cambiamenti che influenzano il sistema di build o dipendenze esterne.

**Esempi:**

```text
build: update webpack configuration
build(deps): bump react from 17.0.2 to 18.0.0
build: add production optimization
```

### **ci** - Continuous Integration

Cambiamenti ai file di configurazione CI e agli script.

**Esempi:**

```text
ci: add automated testing workflow
ci(github): update deployment action
ci: fix build pipeline errors
```

### **chore** - Manutenzione

Altri cambiamenti che non modificano src o test files.

**Esempi:**

```text
chore: update dependencies
chore(release): bump version to 2.3.0
chore: clean up temporary files
```

### **revert** - Revert

Reverte un commit precedente.

**Esempi:**

```text
revert: "feat: add experimental feature"
revert: restore previous navigation logic
```

## Scope Opzionali

Lo scope fornisce informazioni aggiuntive sul contesto del cambiamento:

- `(ui)` - Interfaccia utente
- `(api)` - API e backend
- `(auth)` - Autenticazione
- `(router)` - Routing e navigazione
- `(i18n)` - Internazionalizzazione
- `(mobile)` - Specifico per mobile
- `(desktop)` - Specifico per desktop
- `(perf)` - Performance
- `(a11y)` - Accessibilità
- `(seo)` - Search Engine Optimization

## Breaking Changes

Per cambiamenti che rompono la compatibilità, aggiungi `!` dopo il tipo o includi `BREAKING CHANGE` nel footer:

```text
feat!: change API response format

BREAKING CHANGE: The API now returns data in a different structure.
Previous: { user: { name: "John" } }
New: { userData: { fullName: "John" } }
```

## Esempi Completi

### Commit Semplice

```text
feat: add search functionality to projects page
```

### Commit con Scope

```text
fix(mobile): resolve touch navigation issues on iOS devices
```

### Commit con Body e Footer

```text
feat(i18n): add Italian language support

Add complete Italian translations for all components
and pages. Includes date formatting and number
localization for Italian locale.

Closes #123
```

### Breaking Change

```text
refactor!: restructure project configuration

BREAKING CHANGE: Configuration files have been moved
from /config to /src/config. Update import paths
accordingly.
```

## Best Practices

1. **Usa l'imperativo** presente ("add" non "added" o "adds")
2. **Non capitalizzare** la prima lettera della description
3. **Non usare il punto** alla fine della description
4. **Sii specifico** ma conciso nella description
5. **Usa il body** per spiegare "cosa" e "perché", non "come"
6. **Riferisci issue** nel footer quando applicabile
7. **Un commit = un cambiamento logico**

## Strumenti Utili

- **Commitizen**: Tool interattivo per creare commit conformi
- **Conventional Changelog**: Genera changelog automatici
- **Semantic Release**: Automatizza il versioning basato sui commit
- **Commitlint**: Valida il formato dei commit
