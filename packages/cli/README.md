# CLI Commands

Harukit provides a powerful command-line interface for managing your UI components. All commands support automatic package manager detection and dependency installation.

## Main Commands

### `init` - Initialize Harukit

Set up Harukit in your project with automatic dependency installation.

```bash
# Interactive setup
npx harukit@latest init

# Skip prompts and use defaults
npx harukit@latest init --yes
```

**What it does:**

- Creates `harukit.json` configuration file
- Sets up `components/` and `lib/` directories  
- Generates utility functions in `lib/utils.ts`
- Updates global CSS with Tailwind variables
- **Automatically installs all required dependencies** using your package manager

**Package Manager Support:**

```bash
npx harukit@latest init      # npm
pnpm dlx harukit@latest init # pnpm  
yarn dlx harukit@latest init # yarn
bunx --bun harukit@latest init # bun
```

### `add` - Add Components

Add one or more components to your project with automatic dependency resolution.

```bash
# Add single component
npx harukit@latest add button

# Add multiple components
npx harukit@latest add button card input

# Overwrite existing components
npx harukit@latest add button --overwrite
```

**Options:**

- `--yes` - Skip prompts and use defaults
- `--overwrite` - Replace existing component files

**What it does:**

- Downloads component files to your `components/` directory
- **Automatically installs component-specific dependencies**
- Resolves and installs peer dependencies
- Shows installation progress

### `remove` - Remove Components

Clean up components and unused dependencies from your project.

```bash
# Remove single component
npx harukit@latest remove button

# Remove multiple components  
npx harukit@latest remove button card input
```

**What it does:**

- Removes component files from `components/` directory
- Identifies unused dependencies
- Prompts to clean up orphaned packages
- Updates project configuration

### `list` - Show Available Components

Display all components you can add to your project.

```bash
npx harukit@latest list
```

**Output includes:**

- Component names
- Brief descriptions
- Categories (Form, Layout, Feedback, etc.)

### `info` - Get Component Information

Show detailed information about Harukit or specific components.

```bash
# General Harukit information
npx harukit@latest info

# Specific component details
npx harukit@latest info button

# Multiple component info
npx harukit@latest info button card
```

### `update` - Check for Updates

Check for newer versions and get update instructions.

```bash
npx harukit@latest update
```

## Quick Examples

**Complete Setup Flow:**

```bash
# 1. Initialize in existing project
npx harukit@latest init

# 2. See what's available
npx harukit@latest list

# 3. Add the components you need
npx harukit@latest add button card input tooltip

# 4. Start building!
```

**Package Manager Detection:**
Harukit automatically detects and uses your preferred package manager:

1. **CLI Detection**: Uses the package manager from your command (npx → npm, pnpm dlx → pnpm)
2. **Lock File Detection**: Falls back to package manager indicated by lock files
3. **System Default**: Uses bun if available, otherwise npm

**No Manual Dependency Management:**
All `init` and `add` commands automatically handle:

- Installing required peer dependencies
- Resolving version conflicts
- Using your project's package manager
- Showing installation progress

## Global Options

All commands support:

- `--help` - Show command help
- `--version` - Show Harukit version

## Need Help?

- **Documentation**: [https://harukit-ui-docs.vercel.app/](https://harukit-ui-docs.vercel.app)
- **GitHub**: [https://github.com/Hareesh108/harukit-ui](https://github.com/Hareesh108/harukit-ui)
- **Issues**: [Report bugs or request features](https://github.com/Hareesh108/harukit-ui/issues)
