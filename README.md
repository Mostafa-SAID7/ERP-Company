# ERP Company System

A comprehensive Enterprise Resource Planning (ERP) system built with modern web technologies. Developed by [We3DS](https://we3ds.com/).

## Overview

This ERP system provides integrated solutions for managing business operations including finance, inventory, human resources, sales, purchasing, and administration. It's designed to streamline workflows and improve operational efficiency.

## Quick Start

To get started with this project, follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd ERP-Company

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Technologies Used

This project is built with:

- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **React 18** - Modern UI library
- **shadcn-ui** - High-quality, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Performant form state management
- **Zod** - TypeScript-first schema validation
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library
- **TanStack Query** - Powerful data synchronization

## Project Structure

```
ERP-Company/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn-ui components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── docs/                 # Documentation
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## Features

The ERP system includes the following modules:

### Finance
- Chart of Accounts management
- Journal Entries
- General Ledger
- Trial Balance
- Audit Logs

### Inventory
- Item management
- Warehouse management
- Stock movements tracking
- Low stock alerts

### Human Resources
- Employee management
- Department organization
- Leave management
- Payroll processing

### Sales & Purchasing
- Customer management
- Sales orders
- Invoice generation
- Vendor management

### Administration
- User and role management
- Company settings
- Localization
- Tax and currency configuration

## Documentation

For detailed documentation, please refer to the [docs](./docs) directory:

- [CHANGELOG](./docs/CHANGELOG.md) - Version history and updates
- [PROJECT_SETUP](./docs/PROJECT_SETUP.md) - Detailed setup instructions
- [STRUCTURE](./docs/STRUCTURE.md) - Project architecture and organization
- [TECHNOLOGIES](./docs/TECHNOLOGIES.md) - Technology stack details
- [FEATURES](./docs/FEATURES.md) - Detailed feature documentation
- [USE_CASES](./docs/USE_CASES.md) - Common use cases and workflows
- [DEPLOYMENT](./docs/DEPLOYMENT.md) - Deployment guide
- [STYLES](./docs/STYLES.md) - Styling guidelines
- [CODE_OF_CONDUCT](./docs/CODE_OF_CONDUCT.md) - Community guidelines
- [CONTRIBUTING](./docs/CONTRIBUTING.md) - Contribution guidelines
- [SECURITY](./docs/SECURITY.md) - Security best practices
- [ERD](./docs/ERD.md) - Entity Relationship Diagram

## Development

### Code Quality

This project uses ESLint for code quality checks. Run the linter with:

```sh
npm run lint
```

### Building

To create a production build:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

## Contributing

We welcome contributions! Please read our [CONTRIBUTING](./docs/CONTRIBUTING.md) guide for details on our code of conduct and the process for submitting pull requests.

## Security

For security concerns, please refer to our [SECURITY](./docs/SECURITY.md) policy.

## License

This project is proprietary software developed by [We3DS](https://we3ds.com/). All rights reserved.

## Support

For support and inquiries, please visit [We3DS](https://we3ds.com/) or contact our team.

## About We3DS

[We3DS](https://we3ds.com/) is a leading software development company specializing in enterprise solutions and digital transformation.
