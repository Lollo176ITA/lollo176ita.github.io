# Project Architecture and Best Practices

[⬅️ Back to README](../README.md)

Architectural principles, patterns, and development guidelines for the project.

## Table of Contents

- [Architectural Principles](#architectural-principles)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Best Practices](#best-practices)
- [Performance](#performance-considerations)
- [State Management](#state-management)
- [Routing](#routing-architecture)
- [Testing & Quality](#testing--quality)

## Architectural Principles

### Separation of Concerns
- **Components**: Presentation logic and UI rendering
- **Hooks**: Business logic and state management
- **Data**: Static data and configurations
- **Utils**: Utility functions and helpers
- **Context**: Global state management

### Component Composition
- Composition over inheritance
- Small, reusable components
- Minimize props drilling via Context API
- Children props for flexible layouts

### Performance First
- Code splitting and lazy loading
- Strategic memoization
- React.memo for expensive renders
- Bundle size optimization

## Technology Stack

| Category | Tools | Version |
|----------|-------|---------|
| **UI Framework** | React | 19.1.0 |
| **Routing** | Custom Hash Router | - |
| **Styling** | Tailwind CSS | 3.4.15 |
| **Animation** | Framer Motion | 12.19.1 |
| **i18n** | react-i18next | 15.5.3 |
| **Build** | CRACO + Webpack | 7.1.0 |
| **State** | Context API + Hooks | - |
| **Dev Tools** | ESLint, Lighthouse, Depcheck | - |

## Project Structure

```
src/
├── components/                    # React components
│   ├── common/                   # Shared components
│   │   ├── Header.js            # Main header with navigation
│   │   ├── Footer.js            # Site footer
│   │   ├── Navbar.js            # Navigation bar
│   │   ├── ThemeSwitch.js       # Dark/light theme toggle
│   │   ├── LanguageSwitcher.js  # Language selector
│   │   ├── HashLink.js          # Custom hash navigation link
│   │   └── TrophySystem.js      # Gamification system
│   │
│   ├── layout/                   # Layout components
│   │   ├── Hero.js              # Hero section
│   │   ├── HeroText.js          # Animated hero text
│   │   └── AnimatedGrid.js      # Background grid animation
│   │
│   ├── pages/                    # Page components
│   │   ├── About.js             # About page
│   │   ├── History.js           # Project history
│   │   ├── Projects.js          # Projects showcase
│   │   ├── CreationsPage.js     # Creations gallery
│   │   ├── TrophiesPage.js      # Trophy achievements
│   │   ├── LighthouseStats.js   # Performance metrics
│   │   └── WorkInProgress.js    # WIP pages
│   │
│   ├── books/                    # Book system
│   │   ├── BooksHome.js         # Books homepage
│   │   ├── BooksRouter.js       # Book routing logic
│   │   ├── BookOverview.js      # Book overview page
│   │   └── BookChapter.js       # Chapter reader
│   │
│   └── animations/               # Animation components
│       └── LazyMotion.js        # Framer Motion lazy loader
│
├── hooks/                        # Custom React hooks
│   ├── useHashRouter.js         # Hash routing hooks
│   ├── useNavigation.js         # Navigation utilities
│   └── useStats.js              # Statistics fetching
│
├── data/                         # Static data
│   ├── books.js                 # Books data
│   ├── trophies.js              # Trophy configurations
│   ├── history.it.json          # Italian timeline
│   ├── history.en.json          # English timeline
│   └── project-stats.json       # Generated statistics
│
├── locales/                      # i18n translations
│   ├── en/translation.json      # English translations
│   └── it/translation.json      # Italian translations
│
├── utils/                        # Utility functions
│   ├── hashRouter.js            # Hash routing system
│   ├── analytics.js             # Analytics utilities
│   ├── serviceWorker.js         # Service Worker management
│   └── RouteDebugger.js         # Routing debugger
│
├── pages/                        # Main pages
│   └── Homepage.js              # Homepage component
│
├── App.js                        # Root component
├── index.js                      # Application entry point
├── i18n.js                       # i18n configuration
└── ThemeContext.js               # Theme context provider
```

## Design System

### Color Palette

#### Light Mode

```css
Primary:      #3B82F6    /* Blue-500 */
Secondary:    #6B7280    /* Gray-500 */
Accent:       #10B981    /* Emerald-500 */
Background:   #FFFFFF    /* White */
Surface:      #F9FAFB    /* Gray-50 */
Text:         #111827    /* Gray-900 */
```

#### Dark Mode

```css
Primary:      #60A5FA    /* Blue-400 */
Secondary:    #9CA3AF    /* Gray-400 */
Accent:       #34D399    /* Emerald-400 */
Background:   #111827    /* Gray-900 */
Surface:      #1F2937    /* Gray-800 */
Text:         #F9FAFB    /* Gray-50 */
```

### Typography

```css
Font Family:
  - Sans: 'Inter', system-ui, sans-serif
  - Mono: 'JetBrains Mono', monospace

Font Scale:
  - xs:   0.75rem   (12px)
  - sm:   0.875rem  (14px)
  - base: 1rem      (16px)
  - lg:   1.125rem  (18px)
  - xl:   1.25rem   (20px)
  - 2xl:  1.5rem    (24px)
  - 3xl:  1.875rem  (30px)
  - 4xl:  2.25rem   (36px)
```

### Spacing

Based on Tailwind's spacing scale (0.25rem = 4px):

```
0:  0px
1:  4px
2:  8px
4:  16px
8:  32px
12: 48px
16: 64px
```

## Best Practices

### Component Guidelines

### Component Guidelines

- **Naming**: PascalCase for components, camelCase for props/variables
- **Props**: Destructure in function signature
- **Conditional Rendering**: Use `&&` for existence checks, ternary for alternatives
- **Event Handlers**: Inline for simple logic, separate functions for complex

### Custom Hooks

- Prefix with "use" (e.g., `useHashRouter`)
- Extract reusable logic from components
- Return objects for multiple values
- Keep focused and single-purpose

### File Organization & Style

- One component per file, max 300 lines
- Co-locate related components
- Index files for clean imports
- Functional components with hooks
- Prefer `const`, template literals, destructuring
- Optional chaining (`?.`) and nullish coalescing (`??`)

## Performance Considerations

### Code Splitting & Lazy Loading
- React.lazy() for non-critical components
- Suspense boundaries with fallbacks
- Route-based code splitting

### Memoization
- `React.memo()` for expensive component renders
- `useMemo()` for expensive calculations
- `useCallback()` for callback functions passed to child components

### Bundle Optimization
**Current Metrics**: ~131KB main bundle (73% reduction), 12 chunks, Brotli + Gzip compression

- Strategic chunk splitting via CRACO config
- Separate vendor bundles for large libraries
- Tree shaking for unused code elimination

## State Management

- **Local State**: `useState` for component-level state
- **Global State**: Context API for app-wide state (theme, language, trophies)
- **Complex State**: `useReducer` for complex state logic with actions

## Routing Architecture

### Hash-Based Routing

The project uses a custom hash-based routing system optimized for GitHub Pages:

```javascript
// Basic navigation
<HashLink to="/about">About</HashLink>

// Programmatic navigation
const { navigate } = useHashNavigation();
navigate('/projects');

// Route parameters
const params = useHashParams('books/:type/:slug');
```

### Supported Routes

```
/                                    Homepage
/about                              About page
/projects                           Projects showcase
/history                            Project history
/creations                          Creations overview
/creations/books                    Books listing
/creations/books/:type/:name/overview    Book overview
/creations/books/:type/:name/:chapter    Book chapter
/trophies                           Trophy achievements
/lighthouse-stats                   Performance metrics
/stocazzato                         Easter egg page
```

For detailed routing documentation, see [technical/HASH_ROUTING.md](./technical/HASH_ROUTING.md).

## Testing & Quality

### Testing
- Component testing with React Testing Library
- Hook testing with `renderHook`
- Unit tests for utility functions

### Accessibility
**Current Score**: 88/100 (Lighthouse)

- Semantic HTML elements
- Alt text for images
- Keyboard navigation support
- Sufficient color contrast
- ARIA attributes when needed

### Documentation
- Comments for complex logic
- JSDoc for function documentation
- Updated README and CHANGELOG
- Usage examples in component docs

### Version Control
- [Conventional Commits](./CONVENTIONAL_COMMITS.md) format
- Feature branches from main
- Descriptive, atomic commits
- Code review before merging

---

Last updated: October 2025
