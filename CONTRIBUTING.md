# Contributing to Harukit UI

Thank you for your interest in contributing to Harukit UI! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Here are the main ways you can contribute:

- 🐛 **Bug Reports**: Report bugs and issues
- 💡 **Feature Requests**: Suggest new features or improvements
- 📝 **Documentation**: Improve or add documentation
- 🔧 **Code Contributions**: Submit pull requests with code changes
- 🧪 **Testing**: Help test components and report issues
- 🌟 **Examples**: Create examples and demos

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm/yarn
- Git

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:

   ```bash
   git clone https://github.com/Hareesh108/harukit-ui.git
   cd harukit-ui
   ```

3. **Add the upstream remote**:

   ```bash
   git remote add upstream https://github.com/original-owner/harukit-ui.git
   ```

## 🔧 Development Setup

### Installation

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development servers**:

   ```bash
   # Start all applications
   pnpm dev
   
   # Or start specific apps
   pnpm docs:dev    # Documentation site
   pnpm web:dev     # Main web app
   ```

### Available Scripts

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm build                  # Build all packages and apps
pnpm lint                   # Lint all packages and apps
pnpm format                 # Format code with Prettier
pnpm format:check           # Check code formatting
pnpm check-types            # Type check all packages
pnpm test                   # Run tests
pnpm test:watch             # Run tests in watch mode
pnpm clean                  # Clean all build artifacts

# Specific package commands
pnpm docs:dev              # Start documentation site
pnpm docs:build            # Build documentation site
pnpm web:dev               # Start web app
pnpm web:build             # Build web app
pnpm cli:build             # Build CLI tool
pnpm cli:dev               # Develop CLI tool
pnpm ui:build              # Build UI package
pnpm ui:dev                # Develop UI package
```

## 🏗️ Project Structure

```
harukit-ui/
├── apps/
│   ├── docs/              # Documentation site (Next.js + Fumadocs)
│   └── web/               # Main web application (Next.js)
├── packages/
│   ├── cli/               # CLI tool for component generation
│   ├── eslint-config/     # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── ui/                # Core component library
├── .github/               # GitHub workflows and templates
├── turbo.json             # Turborepo configuration
├── package.json           # Root package.json
└── pnpm-workspace.yaml    # pnpm workspace configuration
```

## 📝 Coding Standards

### General Guidelines

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Conventional Commits**: Use conventional commit messages

### Code Style

- Use meaningful variable and function names
- Write self-documenting code with clear comments
- Keep functions small and focused
- Use proper TypeScript types
- Follow React best practices

### File Naming

- **Components**: PascalCase (e.g., `Button.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types**: PascalCase (e.g., `ButtonProps.ts`)

## 🧩 Component Guidelines

### Creating New Components

1. **Use the CLI tool** (recommended):

   ```bash
   pnpm cli:build
   pnpm --filter=@repo/cli generate component Button
   ```

2. **Manual creation**:
   - Create component in `packages/ui/src/components/`
   - Export from `packages/ui/src/index.ts`
   - Add examples to `apps/docs/`

### Component Structure

```typescript
// packages/ui/src/components/Button/Button.tsx
import React from 'react';
import { cn } from '../../utils/cn';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'button-base-styles',
          variant === 'outline' && 'button-outline-styles',
          size === 'sm' && 'button-sm-styles',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Component Requirements

- **Accessibility**: All components must be accessible (ARIA labels, keyboard navigation, etc.)
- **TypeScript**: Full TypeScript support with proper types
- **Props Interface**: Define clear prop interfaces
- **Forward Refs**: Use `React.forwardRef` for DOM elements
- **Display Name**: Set proper display names for debugging
- **Variants**: Support multiple variants and sizes
- **Customization**: Allow className overrides

## 🧪 Testing Guidelines

### Testing Requirements

- **Unit Tests**: Test individual component functionality
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Ensure components meet accessibility standards
- **Visual Regression Tests**: Catch visual changes (when implemented)

## 📚 Documentation Guidelines

### Component Documentation

Each component should include:

- **Description**: What the component does
- **Props**: All available props with types and descriptions
- **Examples**: Usage examples for different variants
- **Accessibility**: Accessibility considerations
- **Best Practices**: Usage guidelines

### Documentation Structure

```markdown
# Button

A versatile button component with multiple variants and sizes.

## Usage

```tsx
import { Button } from '@repo/ui';

<Button variant="primary" size="md">
  Click me
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | The visual style of the button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the button |

## Accessibility

- Supports keyboard navigation
- Includes proper ARIA labels
- Focus indicators are visible

```

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:

   ```bash
   pnpm lint
   pnpm format:check
   pnpm check-types
   ```

4. **Update documentation** if needed

5. **Commit your changes** using conventional commits:

   ```bash
   git commit -m "feat: add new Button component"
   ```

### Pull Request Guidelines

1. **Title**: Use conventional commit format
2. **Description**: Clearly describe the changes and why they're needed
3. **Checklist**: Complete the PR template checklist
4. **Screenshots**: Include screenshots for UI changes
5. **Tests**: Ensure all tests pass

### PR Template

```markdown
## Description

Brief description of the changes.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Accessibility tests pass
- [ ] Visual regression tests pass (if applicable)

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version** in all package.json files
2. **Update CHANGELOG.md** with release notes
3. **Create release branch**:

   ```bash
   git checkout -b release/v1.2.0
   ```

4. **Build and test**:

   ```bash
   pnpm clean
   pnpm install
   pnpm build
   ```

5. **Create pull request** for review
6. **Merge and tag** the release
7. **Publish packages** to npm (if applicable)

## 🆘 Getting Help

- **Documentation**: Check the [docs site](http://localhost:3001)
- **Issues**: Search existing [GitHub Issues](https://github.com/Hareesh108/harukit-ui/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/Hareesh108/harukit-ui/discussions)
- **Discord**: Join our community (if available)

## 🙏 Recognition

Contributors will be recognized in:

- The project's README.md
- Release notes
- GitHub contributors page
- Documentation acknowledgments

Thank you for contributing to Harukit UI! 🎉
