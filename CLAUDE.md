# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Contextly** is a landing page for a macOS menu bar application that helps knowledge workers track and optimize their focus and attention management. The site is a single-page application built with React 19, TypeScript, Vite 7, and Tailwind CSS v4, designed for deployment to static hosting (GitHub Pages/Cloudflare Pages) with custom domain `ctxly.ai`.

## Core Commands

### Development
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

## Architecture & Key Patterns

### Tech Stack
- **Framework**: React 19 (function components only, react-jsx transform)
- **Build**: Vite 7 with TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS v4 via PostCSS (`@import "tailwindcss"` in src/index.css)
- **Animation**: Framer Motion for hero section and fade-in effects
- **Language**: TypeScript with strict mode enabled

### Project Structure
```
src/
  ├── main.tsx                      # Entry point
  ├── App.tsx                       # Root component (all application logic lives here)
  ├── index.css                     # Tailwind import + base styles
  └── components/ui/                # Reusable UI primitives
      ├── button.tsx                # Button component (variants: default/outline)
      ├── card.tsx                  # Card + CardContent components
      ├── support-modal.tsx         # Support/donation modal
      └── screenshot-carousel.tsx   # Auto-playing screenshot carousel
```

### Single-Component Architecture
**All business logic, state, and i18n live in `src/App.tsx`.** This is a deliberate design choice:
- Language detection (browser lang → localStorage → URL param)
- i18n messages object (`messages.en` and `messages.zh`)
- State management (`language`, `supportOpen`)
- All page sections (hero, features, footer) in one component

**Do not extract page sections into separate components unless explicitly requested.** Keep the single-component architecture intact.

### Internationalization (i18n)
Language switching is implemented inline in App.tsx:
- **Languages**: `'en' | 'zh'` (TypeScript literal union)
- **Persistence**: `localStorage.getItem('ctxly_lang')`
- **URL override**: `?lang=en` or `?lang=zh` takes precedence
- **Detection fallback**: Uses `navigator.language.startsWith('zh')` → 'zh', else 'en'
- **Usage**: All user-facing text lives in the `messages` object and is accessed via `t = useMemo(() => messages[language], [language])`

**When adding new user-facing text:**
1. Add to both `messages.en` and `messages.zh`
2. Use `messages[language].key` or `t.key` in JSX
3. Never hardcode strings in render logic

### UI Components
**Button** (`src/components/ui/button.tsx`):
- Props: `variant` ('default' | 'outline'), `size` ('sm' | 'md' | 'lg'), `asChild`
- `asChild={true}` → styles are applied to child element (for wrapping `<a>` tags)

**Card** (`src/components/ui/card.tsx`):
- Pattern: `<Card><CardContent>...</CardContent></Card>`
- Always compose with CardContent for consistent padding

**SupportModal**: Donation modal with Buy Me a Coffee + WeChat Pay QR code

**ScreenshotCarousel**: Auto-playing image carousel for app screenshots

### Styling Conventions
- **Tailwind v4**: All styles via utility classes (no custom CSS beyond base)
- **Responsive**: Use `md:`, `lg:` breakpoints for layout adjustments
- **Colors**: Black/white/gray palette (`text-gray-600`, `bg-white`, `border-gray-200`)
- **Spacing**: Follow existing patterns (`px-6 py-4`, `space-x-4`, etc.)
- **Never use inline `style` props** — always use Tailwind classes

### TypeScript Conventions
- **Strict mode enabled**: No `any` types
- **Export types for APIs**: Use explicit type annotations on exported functions/components
- **Naming**: Full words (no abbreviations), functions start with verbs (e.g., `handleClick`)
- **Early returns**: Prefer guard clauses over deep nesting
- **Browser APIs**: Wrap in try/catch (e.g., `localStorage`, `URLSearchParams`)

### React Patterns
- **Hooks at top level only**
- **Event handlers**: Name as `handleXxx`
- **Derived state**: Use `useMemo` (e.g., `t = useMemo(() => messages[language], [language])`)
- **List rendering**: Use stable, unique `key` (not array index unless static)
- **Conditional rendering**: Use short-circuit (`&&`) or ternary (`? :`)

### Accessibility
- Interactive elements must be focusable (use semantic `<button>`, `<a>`)
- External links: `target="_blank"` must have `rel="noopener noreferrer"`

### Static Assets
- **Location**: `public/` directory (CNAME, favicon.svg, screenshots/, wechat-qr-code.png)
- **Build**: Files in `public/` are copied to `dist/` root at build time
- **References**: Use absolute paths like `/screenshots/menubar-status.png`

### Deployment
- **Output**: `dist/` (created by `npm run build`)
- **Base path**: `base: '/'` (for custom domain `ctxly.ai`, configured in vite.config.ts)
- **CNAME**: `public/CNAME` contains `ctxly.ai` for GitHub Pages
- **Hosting**: Static hosting (GitHub Pages, Cloudflare Pages, etc.)

## Common Patterns

### Adding a New Feature Section
1. Add i18n keys to both `messages.en` and `messages.zh` in App.tsx
2. Add `<section>` inside `<main>` or after existing sections
3. Use existing Card/Button components for consistency
4. Follow responsive grid pattern: `grid md:grid-cols-3 gap-6`

### Adding a New UI Component
1. Create in `src/components/ui/[name].tsx`
2. Export as named export (e.g., `export function Button(...)`)
3. Use TypeScript for props interface
4. Style with Tailwind utility classes only
5. Accept `className` prop and merge with default styles

### Language Detection Order
```
URL param (?lang=en|zh)
  ↓ (if not present)
localStorage.getItem('ctxly_lang')
  ↓ (if not present)
navigator.language detection (zh → 'zh', else 'en')
```

### Modal/Overlay Pattern
See `SupportModal` for reference:
- Fixed positioning with backdrop
- Click backdrop to close
- ESC key handling
- Prevent scroll when open

## Configuration Files

- **vite.config.ts**: Vite + React plugin, `base: '/'` for root deployment
- **tsconfig.json**: Strict TypeScript, ES2020 target, Bundler module resolution
- **postcss.config.js**: Tailwind v4 PostCSS plugin + autoprefixer
- **package.json**: Scripts (dev/build/preview), dependencies

## Links & External Services
- **Repository**: https://github.com/yangwenmai/ctxly.ai
- **Download**: https://github.com/yangwenmai/ctxly.ai/releases/latest
- **Feedback**: https://github.com/yangwenmai/ctxly.ai/discussions
- **Issues**: https://github.com/yangwenmai/ctxly.ai/issues
- **Buy Me a Coffee**: https://www.buymeacoffee.com/maiyang (slug: maiyang)

## Important Constraints
- **No tests**: This project has no test suite or test commands
- **No linter/formatter commands**: No ESLint or Prettier scripts configured
- **Single-page app**: All routing happens via anchor links (`#features`) or external links
- **No build optimization beyond Vite defaults**: Keep builds fast and simple
