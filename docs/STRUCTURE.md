# Project Structure

This document describes the organization and structure of the ERP Company System codebase.

## Directory Layout

```
ERP-Company/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn-ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/                # Layout components
│   │   │   ├── AppSidebar.tsx     # Main sidebar navigation
│   │   │   ├── AppHeader.tsx      # Top header bar
│   │   │   └── AppLayout.tsx      # Main layout wrapper
│   │   └── ...                    # Feature-specific components
│   ├── pages/                     # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Finance/
│   │   ├── Inventory/
│   │   ├── HR/
│   │   ├── Sales/
│   │   └── Admin/
│   ├── types/                     # TypeScript type definitions
│   │   ├── erp.ts                 # Core ERP types
│   │   └── ...
│   ├── lib/                       # Utility functions
│   │   ├── utils.ts               # Common utilities
│   │   └── ...
│   ├── App.tsx                    # Main app component
│   ├── App.css                    # Global styles
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global CSS
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── robots.txt
├── docs/                          # Documentation
│   ├── CHANGELOG.md
│   ├── PROJECT_SETUP.md
│   ├── STRUCTURE.md
│   ├── TECHNOLOGIES.md
│   ├── FEATURES.md
│   ├── USE_CASES.md
│   ├── DEPLOYMENT.md
│   ├── STYLES.md
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   ├── ERD.md
│   └── CONTRIBUTORS.md
├── index.html                     # HTML template
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # TypeScript app configuration
├── tsconfig.node.json             # TypeScript node configuration
├── eslint.config.js               # ESLint configuration
├── postcss.config.js              # PostCSS configuration
├── components.json                # shadcn-ui configuration
├── package.json                   # Project dependencies
├── package-lock.json              # Dependency lock file
└── README.md                      # Project README

```

## Component Organization

### UI Components (`src/components/ui/`)

Reusable UI components from shadcn-ui library:
- Form components (Input, Select, Checkbox, etc.)
- Dialog and modal components
- Navigation components
- Data display components (Table, Card, etc.)

### Layout Components (`src/components/layout/`)

Application layout components:
- **AppSidebar.tsx** - Main navigation sidebar with collapsible menu
- **AppHeader.tsx** - Top header with user menu and notifications
- **AppLayout.tsx** - Main layout wrapper combining sidebar and header

### Feature Components

Components organized by feature/module:
- Finance components
- Inventory components
- HR components
- Sales components
- Admin components

## Pages Organization

Pages are organized by module:

```
pages/
├── Dashboard.tsx              # Main dashboard
├── Finance/
│   ├── Accounts.tsx
│   ├── JournalEntries.tsx
│   ├── Ledger.tsx
│   └── ...
├── Inventory/
│   ├── Items.tsx
│   ├── Warehouses.tsx
│   └── ...
├── HR/
│   ├── Employees.tsx
│   ├── Departments.tsx
│   └── ...
├── Sales/
│   ├── Customers.tsx
│   ├── Orders.tsx
│   └── ...
└── Admin/
    ├── Users.tsx
    ├── Settings.tsx
    └── ...
```

## Types Organization

TypeScript type definitions:

```
types/
├── erp.ts                 # Core ERP types (Tenant, User, etc.)
├── finance.ts             # Finance module types
├── inventory.ts           # Inventory module types
├── hr.ts                  # HR module types
├── sales.ts               # Sales module types
└── common.ts              # Common types
```

## Utilities Organization

Helper functions and utilities:

```
lib/
├── utils.ts               # Common utility functions
├── api.ts                 # API client setup
├── constants.ts           # Application constants
└── hooks.ts               # Custom React hooks
```

## Configuration Files

### vite.config.ts
- Vite build configuration
- Plugin setup (React, SWC)
- Path aliases
- Server configuration

### tailwind.config.ts
- Tailwind CSS theme customization
- Color palette
- Typography settings
- Plugin configuration

### tsconfig.json
- TypeScript compiler options
- Path aliases
- Module resolution

### eslint.config.js
- ESLint rules
- Code quality standards
- Plugin configuration

### components.json
- shadcn-ui component configuration
- Component aliases
- Theme settings

## Naming Conventions

### Files
- Components: PascalCase (e.g., `AppSidebar.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Types: camelCase (e.g., `erp.ts`)

### Components
- React components: PascalCase (e.g., `Dashboard`, `UserForm`)
- Props interfaces: ComponentNameProps (e.g., `DashboardProps`)

### Variables and Functions
- camelCase for variables and functions
- UPPER_SNAKE_CASE for constants

## Module Dependencies

```
App.tsx
├── AppLayout
│   ├── AppSidebar
│   └── AppHeader
├── Pages (routed)
│   ├── Dashboard
│   ├── Finance modules
│   ├── Inventory modules
│   ├── HR modules
│   ├── Sales modules
│   └── Admin modules
└── UI Components
```

## Asset Organization

### Public Assets (`public/`)
- Static images
- Icons
- Favicon
- Robots.txt

### Styles
- Global styles in `src/index.css`
- Component-specific styles in component files
- Tailwind CSS for utility classes

## Best Practices

1. **Keep components small and focused** - Each component should have a single responsibility
2. **Use TypeScript** - Define types for all props and state
3. **Organize by feature** - Group related components together
4. **Reuse components** - Use UI components from `components/ui/`
5. **Follow naming conventions** - Use consistent naming across the project
6. **Document complex logic** - Add comments for non-obvious code

## Related Documentation

- [TECHNOLOGIES](./TECHNOLOGIES.md) - Technology stack details
- [CONTRIBUTING](./CONTRIBUTING.md) - Contribution guidelines
- [STYLES](./STYLES.md) - Styling guidelines
