import fs from 'fs-extra';
import path from 'path';

export interface ProjectInfo {
  isValid: boolean;
  framework: string;
  hasTypeScript: boolean;
  hasTailwind: boolean;
  hasNextJs: boolean;
  hasReact: boolean;
  packageManager: string;
  root: string;
}

export class ProjectDetector {
  private root: string;

  constructor(root: string) {
    this.root = root;
  }

  async detect(): Promise<ProjectInfo> {
    const packageJsonPath = path.join(this.root, 'package.json');
    
    if (!(await fs.pathExists(packageJsonPath))) {
      return {
        isValid: false,
        framework: 'unknown',
        hasTypeScript: false,
        hasTailwind: false,
        hasNextJs: false,
        hasReact: false,
        packageManager: 'npm',
        root: this.root,
      };
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    const hasTypeScript = await this.hasTypeScript();
    const hasTailwind = await this.hasTailwind();
    const hasNextJs = 'next' in dependencies;
    const hasReact = 'react' in dependencies;
    const packageManager = await this.detectPackageManager();

    let framework = 'unknown';
    if (hasNextJs) {
      framework = 'Next.js';
    } else if (hasReact) {
      framework = 'React';
    } else if ('vue' in dependencies) {
      framework = 'Vue';
    } else if ('svelte' in dependencies) {
      framework = 'Svelte';
    }

    return {
      isValid: true,
      framework,
      hasTypeScript,
      hasTailwind,
      hasNextJs,
      hasReact,
      packageManager,
      root: this.root,
    };
  }

  private async hasTypeScript(): Promise<boolean> {
    const tsConfigPath = path.join(this.root, 'tsconfig.json');
    const hasTsConfig = await fs.pathExists(tsConfigPath);
    
    if (hasTsConfig) {
      return true;
    }

    // Check for TypeScript in package.json
    const packageJsonPath = path.join(this.root, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      return 'typescript' in dependencies;
    }

    return false;
  }

  private async hasTailwind(): Promise<boolean> {
    const tailwindConfigPath = path.join(this.root, 'tailwind.config.js');
    const tailwindConfigTsPath = path.join(this.root, 'tailwind.config.ts');
    
    if (await fs.pathExists(tailwindConfigPath) || await fs.pathExists(tailwindConfigTsPath)) {
      return true;
    }

    // Check for Tailwind in package.json
    const packageJsonPath = path.join(this.root, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      return 'tailwindcss' in dependencies;
    }

    return false;
  }

  private async detectPackageManager(): Promise<string> {
    const lockFiles = [
      { name: 'pnpm', file: 'pnpm-lock.yaml' },
      { name: 'yarn', file: 'yarn.lock' },
      { name: 'npm', file: 'package-lock.json' },
    ];

    for (const { name, file } of lockFiles) {
      if (await fs.pathExists(path.join(this.root, file))) {
        return name;
      }
    }

    return 'npm';
  }
} 