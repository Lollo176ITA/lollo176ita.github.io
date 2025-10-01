# Changelog

[⬅️ Back to README](../README.md)

All notable changes to this project. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Quick Navigation

| Version | Date | Highlights |
|---------|------|------------|
| [2.3.0](#230---2025-10-01) | 2025-10-01 | Documentation refactoring |
| [2.2.8](#228---2025-07-15) | 2025-07-15 | Trophy system, gamification |
| [2.2.7](#227---2025-06-26) | 2025-06-26 | Advanced commit categorization |
| [2.2.6](#226---2025-06-19) | 2025-06-19 | "Me in Pieces" component |
| [2.2.0](#220---2025-06-15) | 2025-06-15 | Real stats & hash routing |
| [2.1.0](#210---2025-06-01) | 2025-06-01 | Books system, PWA |
| [2.0.0](#200---2025-05-15) | 2025-05-15 | Major restructuring, i18n |
| [1.5.0](#150---2025-04-01) | 2025-04-01 | Core pages |
| [1.0.0](#100---2025-03-01) | 2025-03-01 | Initial release |

---

## [2.3.0] - 2025-10-01

### Added
- Documentation section in footer with direct link to README
- Comprehensive table of contents in all documentation files
- Quick navigation tables for better documentation accessibility

### Changed
- **Major documentation refactoring**
  - Streamlined all documentation files removing redundant sections
  - Converted verbose lists to compact tables
  - Reduced code examples to essential content only
  - ARCHITECTURE.md: Condensed best practices and removed repetitive code blocks
  - COMPONENTS.md: Simplified component descriptions with cleaner format
  - CONVENTIONAL_COMMITS.md: Converted commit types to table format
  - REAL-STATS.md: Consolidated hooks documentation and simplified troubleshooting
  - CHANGELOG.md: Added quick navigation table
- All documentation maintained in English for consistency
- Improved readability with better formatting and structure

### Fixed
- Documentation navigation and cross-references
- Markdown formatting consistency across all files

## [2.2.8] - 2025-07-15

### Added
- Complete trophy system with gamification features
  - 9 unlockable trophies with 5 rarity levels (Common, Uncommon, Rare, Epic, Legendary)
  - Persistent storage using localStorage
  - Animated pop-ups with Framer Motion
  - Trophy page with progress tracking
  - Multilingual support (Italian/English)
- Trophy triggers integrated throughout the site
  - First visitor detection
  - Grid game completion (normal and speed demon modes)
  - Page exploration tracking
  - Theme switching detection
  - Completionist achievement (5+ trophies)
- Footer link to trophies page
- Debug logging system for trophy troubleshooting

### Changed
- Improved trophy UI with rarity indicators
- Enhanced pop-up design with action buttons
- Hidden trophy descriptions until unlocked
- Optimized trophy unlock checks for performance

### Fixed
- Duplicate trophy unlock prevention
- Trophy persistence across sessions
- Mobile responsiveness for trophy page

## [2.2.7] - 2025-06-26

### Added
- Advanced commit categorization system with 11 categories
- New commit types: merge, test, security, performance, chore
- Extended color palette for commit visualization
- Complete translations for new commit categories

### Changed
- Improved History page component architecture
  - Split into modular components in `history-sections/`
  - Reduced main file from 730+ to 300 lines
  - Better maintainability and reusability
- Enhanced commit icon system with specific icons per category
- Updated commit matching logic for better categorization

### Fixed
- Missing English translations for History page
- Mobile layout overflow issues for statistics
- Repository name display on small screens
- Commit type label positioning

## [2.2.6] - 2025-06-19

### Added
- "Me in Pieces" interactive component
  - 12 anatomical organs with realistic colors
  - Modal system with detailed statistics
  - Hover effects and animations
  - Multilingual support

### Changed
- Complete redesign from journey visualization to anatomical grid
- Improved contrast for organ icons and text
- Better accessibility with dynamic text colors
- Responsive grid layout (2x6 mobile, 4x3 desktop)

### Fixed
- Text contrast on light-colored organs
- Icon visibility across all backgrounds
- Modal button translations

## [2.2.5] - 2025-06-19

### Added
- RandomStats carousel component for interactive statistics
- Animated transitions between stat categories
- Category-based statistics organization

## [2.2.0] - 2025-06-15

### Added
- Real statistics system
  - Automated code analysis scripts
  - Git statistics integration
  - GitHub API integration
  - Lighthouse metrics automation
- Custom hash routing system optimized for GitHub Pages
  - HashRouter utility class
  - HashLink component
  - useHashRouter and useNavigation hooks
  - Dynamic route parameter extraction

### Changed
- Migration from React Router to custom hash routing
- Statistics now use real data instead of mock values
- Improved performance with code splitting
- Bundle size optimization (495KB → 131KB, -73%)

### Fixed
- GitHub Pages routing issues
- Statistics accuracy and real-time updates
- Service Worker cache errors
- React lazy loading issues

## [2.1.0] - 2025-06-01

### Added
- Books system for publishing stories and novels
  - BooksHome component for listing
  - BookOverview for book details
  - BookChapter reader with navigation
  - BooksRouter for routing logic
- Service Worker for PWA features
  - Cache strategies for offline support
  - Retry logic for failed requests
  - Automatic cache updates

### Changed
- Improved mobile navigation
- Enhanced dark mode contrast
- Updated footer with additional links

### Fixed
- Service Worker installation failures
- Cache miss handling for chunks
- Mobile menu accessibility

## [2.0.0] - 2025-05-15

### Added
- Complete project restructuring
  - Organized components into common/, layout/, pages/, books/
  - Custom hooks for reusable logic
  - Centralized data management
- Internationalization system (i18next)
  - Full Italian and English support
  - Dynamic language switching
  - Persistent language preference
- Theme system
  - Light and dark modes
  - System preference detection
  - Smooth theme transitions
- Performance optimizations
  - Lazy loading for non-critical components
  - Code splitting strategy
  - Bundle optimization
  - Build time improvements

### Changed
- Migration to React 19
- Updated to Tailwind CSS 3.4
- Modernized build pipeline with CRACO
- Enhanced responsive design

### Removed
- Legacy component structure
- Hardcoded text (replaced with i18n)
- Unused dependencies

## [1.5.0] - 2025-04-01

### Added
- Projects showcase page
- History page with GitHub integration
- Creations gallery
- About page with personal timeline

### Changed
- Updated hero section design
- Improved navigation structure
- Enhanced mobile experience

## [1.0.0] - 2025-03-01

### Added
- Initial release
- Basic portfolio structure
- Homepage with hero section
- Navigation system
- Footer component
- Responsive design foundation

---

## Migration Notes

**2.2.x → 2.3.x**: No breaking changes. Documentation improvements only.

**2.1.x → 2.2.x**: No breaking changes. Trophy system is opt-in.

**2.0.x → 2.1.x**: No breaking changes. Books system and Service Worker are additive.

**1.x → 2.0.x**: ⚠️ **Breaking Changes**
- Component import paths changed
- Hardcoded text replaced with i18n keys
- Update custom components to new structure
- Add language preference handling if customized

## Deprecations

No deprecations in current version.

## Security Updates

All dependencies are regularly updated to address security vulnerabilities. Run `pnpm audit` for current status.

---

Last updated: October 1, 2025
