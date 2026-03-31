# Project Setup Guide

This guide provides detailed instructions for setting up the ERP Company System development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended) - [Download](https://code.visualstudio.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/ERP-Company.git
cd ERP-Company
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Environment Configuration

Create a `.env.local` file in the root directory (if needed for your setup):

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=ERP Company
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- Source maps for debugging

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

This allows you to preview the production build locally before deployment.

### Code Quality Checks

```bash
npm run lint
```

This runs ESLint to check for code quality issues.

## Project Structure

```
ERP-Company/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn-ui components
│   │   ├── layout/          # Layout components (Header, Sidebar)
│   │   └── ...              # Feature-specific components
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── docs/                    # Documentation
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
└── README.md                # Project README
```

## Configuration Files

### vite.config.ts
Vite configuration for development and production builds.

### tailwind.config.ts
Tailwind CSS configuration for styling.

### tsconfig.json
TypeScript compiler options and settings.

### package.json
Project metadata and dependencies.

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, you can specify a different port:

```bash
npm run dev -- --port 3000
```

### Dependencies Installation Issues

If you encounter issues installing dependencies:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Build Errors

If you encounter build errors:

1. Check that all dependencies are installed: `npm install`
2. Clear the build cache: `rm -rf dist`
3. Try building again: `npm run build`

## IDE Setup

### VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **TypeScript Vue Plugin** - Vue.volar
- **ESLint** - dbaeumer.vscode-eslint
- **Prettier** - esbenp.prettier-vscode

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Next Steps

1. Read the [STRUCTURE](./STRUCTURE.md) guide to understand the project organization
2. Review [TECHNOLOGIES](./TECHNOLOGIES.md) for technology stack details
3. Check [CONTRIBUTING](./CONTRIBUTING.md) for contribution guidelines
4. Explore the [FEATURES](./FEATURES.md) documentation

## Support

For issues or questions, please visit [We3DS](https://we3ds.com/) or check the project's issue tracker.
