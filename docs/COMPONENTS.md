# Component Documentation

[⬅️ Back to README](../README.md)

Complete reference for all React components in the project.

## Table of Contents

- [Common Components](#common-components) - Shared UI components
- [Layout Components](#layout-components) - Page layout and structure
- [Page Components](#page-components) - Route-specific pages
- [Book System](#book-system-components) - Book reading system
- [Animation Components](#animation-components) - Animation utilities
- [Best Practices](#component-best-practices) - Component guidelines

## Common Components

### Header.js
Main site header with responsive navigation and mobile hamburger menu.
- Easter egg: "Stocazzato" page (10 rapid logo clicks)
- Hash routing integration
- Dark/light mode support

### Footer.js
Site footer with social links, copyright, and trophy system link.

### Navbar.js
Navigation bar with active page indicator and collapsible mobile menu.

**Props**: `isOpen` (boolean), `toggleMenu` (function)

### LanguageSwitcher.js
IT/EN language toggle with LocalStorage persistence and flag icons.

### ThemeSwitch.js
Dark/light mode toggle with system preference detection and smooth transitions.

Uses `ThemeContext` for global theme state.

### HashLink.js
Custom hash navigation link for SPA routing without page reload.

**Props**: `to` (string), `children`, `className` (string), `replace` (boolean)

### TrophySystem.js
Gamification system with 9 unlockable trophies across 5 rarity levels.

**Features**: LocalStorage persistence, animated pop-ups, progress tracking, multilingual support

**Components**: `TrophyProvider` (context), `TrophyPopup` (notifications)

**Hook**: `useTrophies()` - Returns `{ unlockTrophy, trophies }`

## Layout Components

### Hero.js
Homepage hero section with responsive design, call-to-action, HeroText animation, and AnimatedGrid background.

### HeroText.js
Animated typewriter text for hero section using Framer Motion and i18next for multilingual support.

### AnimatedGrid.js
Animated background grid with geometric patterns. Pure CSS, performance-optimized.

## Page Components

### About.js
Personal information page with timeline, real-time statistics, and skills showcase.

**Hooks**: `useStats()`, `useTranslation()`

### History.js
Project history with GitHub API integration, timeline, and milestone tracking.

### Projects.js
Projects showcase with grid layout, filtering, detail modals, and technology tags.

### CreationsPage.js
Creations gallery with books showcase, category filtering, and Lighthouse metrics.

### TrophiesPage.js
Trophy achievements page with grid display, progress bar, rarity indicators, and hidden descriptions for locked trophies.

**Hook**: `useTrophies()`

### LighthouseStats.js
Performance metrics visualization with Lighthouse scores, historical data, and optimization suggestions.

### WorkInProgress.js
Placeholder page for features under development with animated icons and back navigation.

### Stocazzato.js
Easter egg page (activated by 10 rapid logo clicks) with special effects and hidden content.

## Book System Components

### BooksHome.js
Books homepage with grid display, category filtering, and book cards with covers.

**Data Source**: `src/data/books.js`

### BooksRouter.js
Routing logic with dynamic route matching and parameter parsing.

**Routes**: 
- `/creations/books` - Listing
- `/creations/books/:type/:name/overview` - Book details
- `/creations/books/:type/:name/:chapter` - Chapter reader

### BookOverview.js
Book details page with description, chapter list, and metadata.

**Props**: `bookData` (object)

### BookChapter.js
Chapter reader with prev/next navigation and progress tracking.

**Props**: `chapter` (object), `bookSlug` (string)

**Hook**: `useHashNavigation()`

## Animation Components

### LazyMotion.js
Lazy loads Framer Motion features on-demand to reduce bundle size and improve performance.

**Props**: `children` (ReactNode)

## Component Best Practices

### File Organization
- One component per file
- Related components in subdirectories
- Index files for clean imports
- Keep components under 300 lines

### Naming & Props
- PascalCase for components, camelCase for props/variables
- Destructure props in function signature
- Default values when appropriate
- JSDoc for complex props

### State & Performance
- Local state with `useState`
- Global state with Context API
- Custom hooks for reusable logic
- Lazy load non-critical components
- Memoize expensive computations with `useMemo`/`useCallback`
- `React.memo` for expensive renderss

---

Last updated: October 2025
