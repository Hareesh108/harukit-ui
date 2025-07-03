# Harukit CLI

A modern CLI tool for adding beautiful, accessible UI components to your React projects. Harukit works like shadcn/ui - components are copied to your project, giving you full control over their code and styling.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Getting Started](#getting-started)
- [Available Components](#available-components)
- [CLI Commands](#cli-commands)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Using Components](#using-components)
- [Package Manager Support](#package-manager-support)
- [Tailwind Configuration](#tailwind-configuration)
- [TypeScript Support](#typescript-support)
- [Next.js App Router](#nextjs-app-router)
- [Migration from shadcn/ui](#migration-from-shadcnui)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## Features

- 🚀 **Zero Runtime**: Components are copied to your project, no runtime dependencies
- 🎨 **Fully Customizable**: Edit components directly in your codebase
- ♿ **Accessible**: Built on top of Radix UI primitives
- 🎯 **TypeScript**: Full TypeScript support out of the box
- 🎨 **Tailwind CSS**: Styled with Tailwind CSS and CSS variables
- 📦 **Multiple Package Managers**: Support for npm, yarn, pnpm, and bun (auto-detected)

## Quick Start

### 1. Initialize Harukit

```bash
# Using npm
npx harukit@latest init

# Using pnpm
dlx harukit@latest init

# Using yarn
yarn dlx harukit@latest init

# Using bun
bunx harukit@latest init
```

This will:

- Create a `harukit.json` configuration file
- Set up the necessary directories (`components/`, `lib/`)
- Create the `utils.ts` file with the `cn` function
- Add global CSS with Tailwind variables
- **Automatically install all required dependencies** using your detected package manager (npm, yarn, pnpm, or bun)
- Show progress for each dependency as it installs

### 2. Add Components

```bash
# Add a single component
npx harukit@latest add button

# Add multiple components
npx harukit@latest add button card input

# Add all available components
npx harukit@latest add accordion button card input label tooltip
```

> **Note:** Component dependencies are automatically installed. For example, adding the `button` component will install `@radix-ui/react-slot` and `class-variance-authority`.

## Getting Started

### Step 1: Create a new project (if you don't have one)

```bash
# Create a new Next.js project
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
cd my-app
```

### Step 2: Initialize Harukit

```bash
# Choose your package manager
npx harukit@latest init    # npm
pnpm dlx harukit@latest init  # pnpm
yarn dlx harukit@latest init  # yarn
bunx harukit@latest init      # bun
```

> **Note:** Harukit will automatically detect your package manager (npm, yarn, pnpm, or bun) and install all required dependencies for you. You do not need to run a separate install command.

### Step 3: Add your first component

```bash
npx harukit@latest add button
```

### Step 4: Use the component

```tsx
import { Button } from "@/components/button"

export default function Page() {
  return (
    <div className="p-8">
      <Button>Hello Harukit!</Button>
    </div>
  )
}
```

## Available Components

| Component | Description | Category |
|-----------|-------------|----------|
| `accordion` | Collapsible content sections | Layout |
| `button` | Versatile button with multiple variants | Form |
| `card` | Container for content with header, content, and footer | Layout |
| `input` | Form input field | Form |
| `label` | Form label with accessibility features | Form |
| `tooltip` | Hover tooltips | Feedback |

## CLI Commands

### `init`

Initialize Harukit in your project.

```bash
npx harukit@latest init [options]
```

**Options:**

- `-y, --yes` - Skip prompts and use defaults
- `--typescript` - Use TypeScript
- `--tailwind` - Use Tailwind CSS
- `--eslint` - Use ESLint
- `--src-dir` - Use src directory
- `--import-alias <alias>` - Import alias for components

**Examples:**

```bash
# Interactive setup
npx harukit@latest init

# Skip prompts with defaults
npx harukit@latest init --yes

# Custom configuration
npx harukit@latest init --typescript --tailwind --src-dir
```

> **Note:** All required dependencies are installed automatically using your detected package manager (npm, yarn, pnpm, or bun). You do not need to run a separate install command.

### `add`

Add components to your project.

```bash
npx harukit@latest add <components...> [options]
```

**Options:**

- `-y, --yes` - Skip prompts and use defaults
- `--overwrite` - Overwrite existing components

**Examples:**

```bash
# Add single component
npx harukit@latest add button

# Add multiple components
npx harukit@latest add button card input

# Overwrite existing components
npx harukit@latest add button --overwrite
```

> **Note:** Component dependencies are automatically installed using your detected package manager. For example, adding the `button` component will automatically install `@radix-ui/react-slot` and `class-variance-authority`.

### `remove`

Remove components from your project.

```bash
npx harukit@latest remove <components...>
```

**Examples:**

```bash
# Remove single component
npx harukit@latest remove button

# Remove multiple components
npx harukit@latest remove button card
```

### `list`

List all available components.

```bash
npx harukit@latest list
```

### `update`

Check for updates and show update instructions.

```bash
npx harukit@latest update
```

### `info`

Show information about Harukit or specific components.

```bash
npx harukit@latest info [component]
```

**Examples:**

```bash
# Show general information
npx harukit@latest info

# Show specific component information
npx harukit@latest info button
```

## Project Structure

After initialization, your project will have this structure:

```
your-project/
├── harukit.json          # Configuration file
├── components/           # Your UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── lib/
│   └── utils.ts         # Utility functions
└── app/
    └── globals.css      # Global styles with CSS variables
```

## Configuration

The `harukit.json` file contains your project configuration:

```json
{
  "$schema": "https://harukit.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Using Components

### Button Component

```tsx
import { Button } from "@/components/button"

export default function MyPage() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
    </div>
  )
}
```

### Card Component

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"

export default function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}
```

### Accordion Component

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion"

export default function MyAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## Package Manager Support

Harukit automatically detects your package manager and installs dependencies accordingly. The detection follows this priority:

1. **CLI Package Manager**: Detects the package manager used to run the CLI (npx → npm, yarn dlx → yarn, etc.)
2. **Project Lock Files**: Falls back to the package manager indicated by lock files in your project
3. **System Preference**: Uses bun if available, otherwise defaults to npm

### Supported Package Managers

#### npm

```bash
# Initialize (automatically uses npm for dependencies)
npx harukit@latest init

# Add components
npx harukit@latest add button card
```

#### pnpm

```bash
# Initialize (automatically uses pnpm for dependencies)
pnpm dlx harukit@latest init

# Add components
pnpm dlx harukit@latest add button card
```

#### yarn

```bash
# Initialize (automatically uses yarn for dependencies)
yarn dlx harukit@latest init

# Add components
yarn dlx harukit@latest add button card
```

#### bun

```bash
# Initialize (automatically uses bun for dependencies)
bunx harukit@latest init

# Add components
bunx harukit@latest add button card
```

> **Note**: Dependencies are automatically installed using your detected package manager. You don't need to manually install `clsx`, `tailwind-merge`, `class-variance-authority`, or any other dependencies - Harukit handles this for you!

## Tailwind Configuration

Make sure your `tailwind.config.js` includes the necessary paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## TypeScript Support

All components are fully typed with TypeScript. Make sure your `tsconfig.json` includes the proper path mappings:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Next.js App Router

For Next.js App Router, make sure to import the global CSS in your `app/layout.tsx`:

```tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Migration from shadcn/ui

If you're migrating from shadcn/ui, the process is straightforward:

1. Initialize Harukit: `npx harukit@latest init`
2. Add the same components: `npx harukit@latest add button card input`
3. Update your imports from `@/components/ui/button` to `@/components/button`

The component APIs are compatible, so your existing code should work with minimal changes.

## Troubleshooting

### Common Issues

**"Component not found"**

- Make sure you're using the latest version: `npx harukit@latest`
- Check available components: `npx harukit@latest list`

**"Import error"**

- Ensure the component was added successfully
- Check that the import path matches your configuration

**"Styling issues"**

- Verify Tailwind CSS is properly configured
- Check that CSS variables are defined in your global styles

**"Package manager detection failed"**

- Make sure you have a `package.json` file in your project root
- Ensure you're using a supported package manager (npm, yarn, pnpm, or bun)
- The CLI will automatically detect your package manager and install dependencies

**"Dependencies not installed"**

- Harukit automatically installs all required dependencies during initialization
- If installation fails, try running the init command again
- Check that your package manager is working correctly

## Support

- **Documentation**: [https://harukit.com](https://harukit.com)
- **GitHub**: [https://github.com/your-username/harukit](https://github.com/your-username/harukit)
- **Issues**: [https://github.com/your-username/harukit/issues](https://github.com/your-username/harukit/issues)

## License

MIT © [Your Name]
