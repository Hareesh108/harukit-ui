# Harukit UI

A modern, accessible, and customizable React component library built with TypeScript and Tailwind CSS. This monorepo contains the component library, documentation site, CLI tool, and development utilities.

## 🚀 Features

- **Modern React Components**: Built with React 19 and TypeScript
- **Tailwind CSS Integration**: Fully customizable with Tailwind CSS
- **Accessibility First**: All components follow WCAG guidelines
- **TypeScript Support**: Full type safety and IntelliSense
- **CLI Tool**: Generate components and manage your UI library
- **Comprehensive Documentation**: Interactive docs with examples
- **Monorepo Architecture**: Efficient development with Turborepo

## 📦 What's Inside

This Turborepo includes the following packages and applications:

### Apps

- **`docs`**: Documentation site built with Fumadocs and MDX

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5.8
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Documentation**: Fumadocs with MDX
- **Linting**: ESLint with Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd harukit-ui
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development**

   ```bash
   # Start all applications
   pnpm dev
   
   # Or start specific apps
   pnpm docs:dev    # Documentation site
   pnpm web:dev     # Main web app
   ```

## 📚 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm build                  # Build all packages and apps
pnpm lint                   # Lint all packages and apps
pnpm format                 # Format code with Prettier
pnpm check-types            # Type check all packages

# Specific App Commands
pnpm docs:dev              # Start documentation site
pnpm docs:build            # Build documentation site
pnpm cli:build             # Build CLI tool
```

### Individual Package Commands

```bash
# Build specific packages
pnpm --filter=docs build
pnpm --filter=@repo/cli build

# Development for specific packages
pnpm --filter=web dev
pnpm --filter=docs dev
```

## 🏗️ Project Structure

```
harukit-ui/
├── apps/
│   ├── docs/              # Documentation site
│   └── web/               # Main web application
├── packages/
│   ├── cli/               # CLI tool for component generation
│   ├── eslint-config/     # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── ui/                # Core component library
├── turbo.json             # Turborepo configuration
├── package.json           # Root package.json
└── pnpm-workspace.yaml    # pnpm workspace configuration
```

## 🔧 Development

### Adding New Components

1. **Using the CLI tool**:

   ```bash
   pnpm cli:build
   pnpm --filter=@repo/cli generate component Button
   ```

### Building for Production

```bash
# Build all packages and apps
pnpm build

# Build specific packages
pnpm --filter=@repo/ui build
pnpm --filter=docs build
```

## 📖 Documentation

- **Component Library**: Visit the docs site at `http://localhost:3001`
- **CLI Usage**: See `packages/cli/README.md` for CLI documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Set up your development environment
- Submit bug reports and feature requests
- Contribute code and documentation
- Follow our coding standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs site](https://harukit-ui-docs.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/Hareesh108/harukit-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Hareesh108/harukit-ui/discussions)

## 🔗 Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

Made with ❤️ by the Harukit UI team
