# Technologies Used

This document provides an overview of the technologies and libraries used in the ERP Company System.

## Core Technologies

### Frontend Framework
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript for better development experience
- **Vite 5.4.19** - Next-generation frontend build tool with instant HMR

### Build & Development
- **Vite** - Lightning-fast build tool and dev server
- **@vitejs/plugin-react-swc** - SWC-based React plugin for faster builds
- **ESLint 9.32.0** - Code quality and style checking
- **TypeScript ESLint** - TypeScript support for ESLint

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformation tool
- **Autoprefixer 10.4.21** - Automatic vendor prefixes
- **tailwindcss-animate** - Animation utilities for Tailwind CSS
- **@tailwindcss/typography** - Typography plugin for Tailwind CSS

### UI Components
- **shadcn-ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible component primitives
  - @radix-ui/react-accordion
  - @radix-ui/react-alert-dialog
  - @radix-ui/react-avatar
  - @radix-ui/react-checkbox
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-label
  - @radix-ui/react-popover
  - @radix-ui/react-select
  - @radix-ui/react-tabs
  - @radix-ui/react-toast
  - And more...

### Routing
- **React Router DOM 6.30.1** - Client-side routing and navigation

### Form Management
- **React Hook Form 7.61.1** - Performant form state management
- **@hookform/resolvers 3.10.0** - Validation resolvers for React Hook Form
- **Zod 3.25.76** - TypeScript-first schema validation

### Data Management
- **@tanstack/react-query 5.83.0** - Powerful data synchronization and caching

### Data Visualization
- **Recharts 2.15.4** - Composable charting library built on React components

### UI Utilities
- **Lucide React 0.462.0** - Beautiful, consistent icon library
- **clsx 2.1.1** - Utility for constructing className strings
- **tailwind-merge 2.6.0** - Merge Tailwind CSS classes intelligently
- **class-variance-authority 0.7.1** - CSS class composition library
- **cmdk 1.1.1** - Command menu component
- **embla-carousel-react 8.6.0** - Carousel/slider component
- **input-otp 1.4.2** - OTP input component
- **react-day-picker 8.10.1** - Date picker component
- **react-resizable-panels 2.1.9** - Resizable panel component
- **vaul 0.9.9** - Drawer component
- **sonner 1.7.4** - Toast notification library
- **next-themes 0.3.0** - Theme management

### Date & Time
- **date-fns 3.6.0** - Modern date utility library

## Development Dependencies

### Type Definitions
- **@types/node 22.16.5** - Node.js type definitions
- **@types/react 18.3.23** - React type definitions
- **@types/react-dom 18.3.7** - React DOM type definitions

### Linting & Code Quality
- **eslint 9.32.0** - JavaScript linter
- **eslint-plugin-react-hooks 5.2.0** - ESLint rules for React hooks
- **eslint-plugin-react-refresh 0.4.20** - ESLint rules for React refresh
- **@eslint/js 9.32.0** - ESLint JavaScript rules
- **globals 15.15.0** - Global variable definitions
- **typescript-eslint 8.38.0** - TypeScript ESLint support

## Version Management

All dependencies are pinned to specific versions in `package.json` to ensure consistency across environments.

## Installation

All dependencies are installed via npm:

```bash
npm install
```

## Updating Dependencies

To check for outdated packages:

```bash
npm outdated
```

To update packages:

```bash
npm update
```

## Performance Considerations

- **Vite** provides fast HMR and optimized builds
- **React 18** includes concurrent features for better performance
- **React Query** handles efficient data fetching and caching
- **Tailwind CSS** generates only used styles for smaller bundle size
- **SWC** provides faster transpilation compared to Babel

## Browser Support

The project targets modern browsers with ES2020+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Documentation

- [PROJECT_SETUP](./PROJECT_SETUP.md) - Setup instructions
- [STRUCTURE](./STRUCTURE.md) - Project structure
- [DEPLOYMENT](./DEPLOYMENT.md) - Deployment guide
