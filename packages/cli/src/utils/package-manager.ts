import { spawn } from 'child_process';
import { ProjectDetector } from './project-detector';

export class PackageManager {
  private root: string;
  private manager: string;

  constructor(root: string) {
    this.root = root;
    this.manager = 'npm'; // Default, will be updated in init
  }

  async init(): Promise<void> {
    const detector = new ProjectDetector(this.root);
    const projectInfo = await detector.detect();
    
    // First, try to detect the package manager used to install the CLI
    const cliPackageManager = await this.detectCliPackageManager();
    
    if (cliPackageManager) {
      // If we can detect the CLI's package manager, use it
      this.manager = cliPackageManager;
    } else {
      // Fallback to project's package manager or system preference
      const preferredManager = await this.getPreferredPackageManager();
      this.manager = preferredManager;
    }
  }

  private async detectCliPackageManager(): Promise<string | null> {
    try {
      // Check the command that was used to run the CLI
      const command = process.argv[0];
      if (command.includes('npx')) return 'npm';
      if (command.includes('yarn')) return 'yarn';
      if (command.includes('pnpm')) return 'pnpm';
      if (command.includes('bun')) return 'bun';
      
      // Check if we're running via npx (npm)
      if (process.env.npm_execpath && process.env.npm_execpath.includes('npx')) {
        return 'npm';
      }
      
      // Check if we're running via yarn dlx
      if (process.env.npm_execpath && process.env.npm_execpath.includes('yarn')) {
        return 'yarn';
      }
      
      // Check if we're running via pnpm dlx
      if (process.env.npm_execpath && process.env.npm_execpath.includes('pnpm')) {
        return 'pnpm';
      }
      
      // Check if we're running via bunx
      if (process.env.npm_execpath && process.env.npm_execpath.includes('bun')) {
        return 'bun';
      }
      
      // Check for package manager in environment variables
      if (process.env.npm_config_user_agent) {
        const userAgent = process.env.npm_config_user_agent;
        if (userAgent.includes('yarn')) return 'yarn';
        if (userAgent.includes('pnpm')) return 'pnpm';
        if (userAgent.includes('bun')) return 'bun';
        if (userAgent.includes('npm')) return 'npm';
      }
      
      // Additional checks for common patterns
      if (process.env.npm_execpath) {
        const execPath = process.env.npm_execpath;
        if (execPath.includes('yarn')) return 'yarn';
        if (execPath.includes('pnpm')) return 'pnpm';
        if (execPath.includes('bun')) return 'bun';
        if (execPath.includes('npm')) return 'npm';
      }
      
      // Check for npx in the process title or command line
      const processTitle = process.title || '';
      if (processTitle.includes('npx')) return 'npm';
      
      // Check if we're in a global npm installation
      if (process.env.npm_config_global === 'true') {
        return 'npm';
      }
      
      return null;
    } catch {
      return null;
    }
  }

  private async getPreferredPackageManager(): Promise<string> {
    // Check for lock files in current directory to determine preference
    const fs = require('fs');
    const path = require('path');
    
    const lockFiles = [
      { name: 'bun', file: 'bun.lockb' },
      { name: 'pnpm', file: 'pnpm-lock.yaml' },
      { name: 'yarn', file: 'yarn.lock' },
      { name: 'npm', file: 'package-lock.json' },
    ];

    for (const { name, file } of lockFiles) {
      if (fs.existsSync(path.join(this.root, file))) {
        return name;
      }
    }

    // If no lock files found, check if bun is available
    if (await this.hasBun()) {
      return 'bun';
    }

    // Default to npm
    return 'npm';
  }

  async hasBun(): Promise<boolean> {
    try {
      const bunLock = require('fs').existsSync(require('path').join(this.root, 'bun.lockb'));
      const bunBinary = require('child_process').spawnSync('bun', ['--version'], { stdio: 'ignore' }).status === 0;
      return bunLock || bunBinary;
    } catch {
      return false;
    }
  }

  getCurrentManager(): string {
    return this.manager;
  }

  async install(packages: string[], isDev = false): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const args = this.getInstallArgs(packages, isDev);
      
      console.log(`Installing with ${this.manager}: ${packages.join(' ')}`);
      
      const child = spawn(this.manager, args, {
        cwd: this.root,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${this.manager} install failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to run ${this.manager}: ${error.message}`));
      });
    });
  }

  async add(packageName: string, isDev = false): Promise<void> {
    return this.addMultiple([packageName], isDev);
  }

  async addMultiple(packageNames: string[], isDev = false): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const args = this.getAddArgs(packageNames, isDev);
      
      console.log(`Adding ${packageNames.join(', ')} with ${this.manager}...`);
      
      const child = spawn(this.manager, args, {
        cwd: this.root,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${this.manager} add failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to run ${this.manager}: ${error.message}`));
      });
    });
  }

  async remove(packageName: string): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const args = this.getRemoveArgs(packageName);
      
      console.log(`Removing ${packageName} with ${this.manager}...`);
      
      const child = spawn(this.manager, args, {
        cwd: this.root,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${this.manager} remove failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to run ${this.manager}: ${error.message}`));
      });
    });
  }

  private getInstallArgs(packages: string[], isDev: boolean): string[] {
    switch (this.manager) {
      case 'npm':
        return ['install', ...packages, ...(isDev ? ['--save-dev'] : [])];
      case 'yarn':
        return ['add', ...packages, ...(isDev ? ['--dev'] : [])];
      case 'pnpm':
        return ['add', ...packages, ...(isDev ? ['--save-dev'] : [])];
      case 'bun':
        return ['add', ...packages, ...(isDev ? ['--dev'] : [])];
      default:
        return ['install', ...packages, ...(isDev ? ['--save-dev'] : [])];
    }
  }

  private getAddArgs(packageNames: string[], isDev: boolean): string[] {
    switch (this.manager) {
      case 'npm':
        return ['install', ...packageNames, ...(isDev ? ['--save-dev'] : [])];
      case 'yarn':
        return ['add', ...packageNames, ...(isDev ? ['--dev'] : [])];
      case 'pnpm':
        return ['add', ...packageNames, ...(isDev ? ['--save-dev'] : [])];
      case 'bun':
        return ['add', ...packageNames, ...(isDev ? ['--dev'] : [])];
      default:
        return ['install', ...packageNames, ...(isDev ? ['--save-dev'] : [])];
    }
  }

  private getRemoveArgs(packageName: string): string[] {
    switch (this.manager) {
      case 'npm':
        return ['uninstall', packageName];
      case 'yarn':
        return ['remove', packageName];
      case 'pnpm':
        return ['remove', packageName];
      case 'bun':
        return ['remove', packageName];
      default:
        return ['uninstall', packageName];
    }
  }
} 