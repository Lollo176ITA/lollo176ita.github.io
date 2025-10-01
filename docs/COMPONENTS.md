# Component Documentation

Complete documentation of React components used throughout the project.

## Table of Contents

- [Common Components](#common-components)
- [Layout Components](#layout-components)
- [Page Components](#page-components)
- [Book System Components](#book-system-components)
- [Animation Components](#animation-components)

## Common Components

Shared components used throughout the application for consistency and reusability.

### Header.js

**Purpose**: Main site header with navigation and interactive features.

**Location**: `src/components/common/Header.js`

**Features**:
- Responsive navigation menu
- Easter egg "Stocazzato" (10 rapid clicks on logo)
- Hash routing integration
- Dark/light mode support
- Mobile-friendly hamburger menu

**Props**: None

**State**:
- `isOpen`: Mobile menu open/closed state
- `clickCount`: Counter for easter egg activation
- `stocazzatoMode`: Easter egg mode active flag

**Usage**:
```jsx
import { Header } from './components/common';

<Header />
```

### Footer.js

**Purpose**: Site footer with copyright and useful links.

**Location**: `src/components/common/Footer.js`

**Features**:
- Social media links
- Copyright information
- Responsive design
- Trophy system link

**Props**: None

**Usage**:
```jsx
import { Footer } from './components/common';

<Footer />
```

### Navbar.js

**Purpose**: Main navigation bar component.

**Location**: `src/components/common/Navbar.js`

**Features**:
- Section navigation
- Active page indicator
- Collapsible mobile menu
- Smooth transitions

**Props**:
- `isOpen` (boolean): Controls mobile menu visibility
- `toggleMenu` (function): Toggle function for mobile menu

### LanguageSwitcher.js

**Purpose**: Language selector for Italian/English switching.

**Location**: `src/components/common/LanguageSwitcher.js`

**Features**:
- IT/EN language toggle
- LocalStorage persistence
- Transition animations
- Flag icons

**Props**: None

**Usage**:
```jsx
import { LanguageSwitcher } from './components/common';

<LanguageSwitcher />
```

### ThemeSwitch.js

**Purpose**: Light/dark mode toggle.

**Location**: `src/components/common/ThemeSwitch.js`

**Features**:
- Dark/light mode toggle
- System preference detection
- LocalStorage persistence
- Smooth theme transitions

**Props**: None

**State**:
- Uses `ThemeContext` for global theme state

**Usage**:
```jsx
import { ThemeSwitch } from './components/common';

<ThemeSwitch />
```

### HashLink.js

**Purpose**: Custom hash navigation link component.

**Location**: `src/components/common/HashLink.js`

**Features**:
- SPA navigation without reload
- Browser history management
- Smooth scrolling
- Active state tracking
- Accessibility support

**Props**:
- `to` (string): Target route path
- `children` (ReactNode): Link content
- `className` (string): Additional CSS classes
- `replace` (boolean): Replace history instead of push

**Usage**:
```jsx
import HashLink from './components/common/HashLink';

<HashLink to="/about" className="nav-link">
  About
</HashLink>
```

### TrophySystem.js

**Purpose**: Gamification system with unlockable achievements.

**Location**: `src/components/common/TrophySystem.js`

**Features**:
- 9 total trophies with 5 rarity levels
- LocalStorage persistence
- Animated pop-ups for unlocks
- Progress tracking
- Multilingual support

**Components**:
- `TrophyProvider`: Context provider
- `TrophyPopup`: Notification component
- Trophy unlock logic and triggers

**Usage**:
```jsx
import { TrophyProvider, useTrophies } from './components/common/TrophySystem';

// In App.js
<TrophyProvider>
  <App />
</TrophyProvider>

// In components
const { unlockTrophy, trophies } = useTrophies();
unlockTrophy('first-visitor');
```

## Layout Components

Components specific to page layout and visual structure.

### Hero.js

**Purpose**: Homepage hero section with introduction and call-to-action.

**Location**: `src/components/layout/Hero.js`

**Features**:
- Responsive design with images
- CSS animations
- Call-to-action button
- HeroText integration
- AnimatedGrid background

**Props**: None

**Usage**:
```jsx
import { Hero } from './components/layout';

<Hero />
```

### HeroText.js

**Purpose**: Animated text for hero section.

**Location**: `src/components/layout/HeroText.js`

**Features**:
- Typewriter animations
- Multilingual text
- Dynamic typing effects
- Framer Motion integration

**Props**: None

**Dependencies**:
- Framer Motion for animations
- i18next for translations

### AnimatedGrid.js

**Purpose**: Animated background grid for visual effects.

**Location**: `src/components/layout/AnimatedGrid.js`

**Features**:
- Pure CSS animations
- Geometric patterns
- Responsive design
- Performance optimized

**Props**: None

**Usage**:
```jsx
import { AnimatedGrid } from './components/layout';

<AnimatedGrid />
```

## Page Components

Main page components for different routes.

### About.js

**Purpose**: About page with personal information and statistics.

**Location**: `src/components/pages/About.js`

**Features**:
- Personal timeline
- Real-time statistics
- Skills showcase
- Responsive layout

**Props**: None

**Hooks Used**:
- `useStats()`: Fetch project statistics
- `useTranslation()`: i18n support

### History.js

**Purpose**: Project history page with GitHub integration.

**Location**: `src/components/pages/History.js`

**Features**:
- Project timeline
- GitHub API integration
- Milestone tracking
- Version history

**Props**: None

### Projects.js

**Purpose**: Projects showcase page.

**Location**: `src/components/pages/Projects.js`

**Features**:
- Project grid layout
- Filtering capabilities
- Project details modal
- Technology tags

**Props**: None

### CreationsPage.js

**Purpose**: Creations gallery and overview.

**Location**: `src/components/pages/CreationsPage.js`

**Features**:
- Books showcase
- Creative projects grid
- Category filtering
- Lighthouse metrics display

**Props**: None

### TrophiesPage.js

**Purpose**: Trophy achievements display page.

**Location**: `src/components/pages/TrophiesPage.js`

**Features**:
- Trophy grid display
- Progress bar
- Rarity indicators
- Unlock status
- Hidden trophy descriptions

**Props**: None

**Hooks Used**:
- `useTrophies()`: Access trophy system

### LighthouseStats.js

**Purpose**: Performance metrics display page.

**Location**: `src/components/pages/LighthouseStats.js`

**Features**:
- Lighthouse scores visualization
- Performance metrics
- Historical data
- Optimization suggestions

**Props**: None

### WorkInProgress.js

**Purpose**: Placeholder for pages under development.

**Location**: `src/components/pages/WorkInProgress.js`

**Features**:
- Construction message
- Animated icons
- Back navigation

**Props**: None

### Stocazzato.js

**Purpose**: Easter egg page activated by logo clicks.

**Location**: `src/components/pages/Stocazzato.js`

**Features**:
- Special effects
- Hidden content
- Exit button

**Props**: None

## Book System Components

Components for the book reading and management system.

### BooksHome.js

**Purpose**: Books homepage with listing and categories.

**Location**: `src/components/books/BooksHome.js`

**Features**:
- Book grid display
- Category filtering
- Book cards with covers
- Navigation to book pages

**Props**: None

**Data Source**: `src/data/books.js`

### BooksRouter.js

**Purpose**: Routing logic for book system.

**Location**: `src/components/books/BooksRouter.js`

**Features**:
- Dynamic route matching
- Book type and slug parsing
- Chapter navigation
- Overview/chapter switching

**Props**: None

**Routes**:
- `/creations/books` - Books listing
- `/creations/books/:type/:name/overview` - Book overview
- `/creations/books/:type/:name/:chapter` - Chapter reader

### BookOverview.js

**Purpose**: Book overview page with details and chapter listing.

**Location**: `src/components/books/BookOverview.js`

**Features**:
- Book description
- Chapter list
- Navigation to chapters
- Metadata display

**Props**:
- `bookData` (object): Book information

### BookChapter.js

**Purpose**: Chapter reader with navigation.

**Location**: `src/components/books/BookChapter.js`

**Features**:
- Chapter content display
- Previous/next navigation
- Progress tracking
- Responsive typography

**Props**:
- `chapter` (object): Chapter data
- `bookSlug` (string): Book identifier

**Hooks Used**:
- `useHashNavigation()`: Chapter navigation

## Animation Components

Components handling animations and lazy loading.

### LazyMotion.js

**Purpose**: Lazy load Framer Motion features to reduce bundle size.

**Location**: `src/components/animations/LazyMotion.js`

**Features**:
- On-demand feature loading
- Bundle size optimization
- Performance improvement

**Props**:
- `children` (ReactNode): Child components

**Usage**:
```jsx
import LazyMotion from './components/animations/LazyMotion';

<LazyMotion>
  <AnimatedComponent />
</LazyMotion>
```

## Component Best Practices

### File Organization

- One component per file
- Related components in subdirectories
- Index files for clean imports
- Keep components under 300 lines

### Naming Conventions

- PascalCase for component names
- camelCase for props and variables
- Descriptive, self-documenting names

### Props

- Destructure in function signature
- Provide default values when appropriate
- Document complex props with JSDoc

### State Management

- Use local state with useState
- Context for global state
- Custom hooks for reusable logic

### Performance

- Lazy load non-critical components
- Memoize expensive computations
- Use React.memo for expensive renders

## Related Documentation

- [Architecture](./ARCHITECTURE.md) - Overall architecture
- [Hash Routing](./technical/HASH_ROUTING.md) - Routing system
- [Real Stats](./REAL-STATS.md) - Statistics system

---

Last updated: October 2025
