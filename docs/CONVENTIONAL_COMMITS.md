# Conventional Commits Guide

[⬅️ Back to README](../README.md)

Guide to conventional commit format for maintaining clear and consistent git history.

## Table of Contents

- [Format](#format)
- [Commit Types](#commit-types)
- [Scopes](#scopes)
- [Breaking Changes](#breaking-changes)
- [Best Practices](#best-practices)
- [Tools](#tools)

## Format

```text
<type>[optional scope]: <description>

[optional body]
[optional footer(s)]
```

## Commit Types

| Type | Description | Example |
|------|-------------|---------|
| **feat** | New feature | `feat: add dark mode toggle` |
| **fix** | Bug fix | `fix: resolve mobile layout issues` |
| **docs** | Documentation only | `docs: update installation instructions` |
| **style** | Code formatting (no logic change) | `style: fix indentation in App.js` |
| **refactor** | Code refactoring | `refactor: simplify authentication logic` |
| **perf** | Performance improvements | `perf: lazy load images in gallery` |
| **test** | Adding or fixing tests | `test: add unit tests for utility functions` |
| **build** | Build system or dependencies | `build(deps): bump react to 18.0.0` |
| **ci** | CI configuration | `ci: add automated testing workflow` |
| **chore** | General maintenance | `chore: update dependencies` |
| **revert** | Revert previous commit | `revert: "feat: add experimental feature"` |

## Scopes

Optional scope provides additional context:

| Scope | Context |
|-------|---------|
| `(ui)` | User interface |
| `(api)` | API and backend |
| `(auth)` | Authentication |
| `(router)` | Routing and navigation |
| `(i18n)` | Internationalization |
| `(mobile)` | Mobile-specific |
| `(perf)` | Performance |
| `(a11y)` | Accessibility |
| `(seo)` | Search engine optimization |

## Breaking Changes

Add `!` after type or include `BREAKING CHANGE` in footer:

```text
feat!: change API response format

BREAKING CHANGE: API now returns different structure.
Previous: { user: { name: "John" } }
New: { userData: { fullName: "John" } }
```

## Best Practices

1. ✅ Use imperative mood: "add" not "added" or "adds"
2. ✅ Don't capitalize first letter
3. ✅ No period at the end
4. ✅ Be specific but concise
5. ✅ Body explains "what" and "why", not "how"
6. ✅ Reference issues in footer: `Closes #123`
7. ✅ One commit = one logical change

## Tools

- **Commitizen** - Interactive commit creation
- **Commitlint** - Commit format validation
- **Conventional Changelog** - Automatic changelog generation
- **Semantic Release** - Automated versioning based on commits
