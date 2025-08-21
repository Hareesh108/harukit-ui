import { spawn } from "child_process";
import { ProjectDetector } from "./project-detector";
import fs from "fs-extra";
import path from "path";

export type SupportedPackageManager = "npm" | "yarn" | "pnpm" | "bun";

export class PackageManager {
  private root: string;
  private manager: SupportedPackageManager;
  private initialized = false;

  constructor(root: string) {
    this.root = root;
    this.manager = "npm"; // Default, will be updated in init
  }

  async init(): Promise<void> {
    if (this.initialized) return; // Avoid re-initialization

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

    this.initialized = true;
  }

  private async detectCliPackageManager(): Promise<SupportedPackageManager | null> {
    try {
      // Check process.argv for package manager indicators
      const fullCommand = process.argv.join(" ");

      // Check for dlx/npx patterns
      if (fullCommand.includes("bunx")) return "bun";
      if (fullCommand.includes("pnpm dlx")) return "pnpm";
      if (fullCommand.includes("yarn dlx")) return "yarn";
      if (fullCommand.includes("npx")) return "npm";

      // Check the command that was used to run the CLI
      const command = process.argv[0];
      if (command.includes("bun")) return "bun";
      if (command.includes("pnpm")) return "pnpm";
      if (command.includes("yarn")) return "yarn";
      if (command.includes("npx") || command.includes("npm")) return "npm";

      // Check environment variables (most reliable method)
      if (process.env.npm_config_user_agent) {
        const userAgent = process.env.npm_config_user_agent.toLowerCase();
        if (userAgent.startsWith("bun/")) return "bun";
        if (userAgent.startsWith("pnpm/")) return "pnpm";
        if (userAgent.startsWith("yarn/")) return "yarn";
        if (userAgent.startsWith("npm/")) return "npm";
      }

      // Check npm_execpath
      if (process.env.npm_execpath) {
        const execPath = process.env.npm_execpath.toLowerCase();
        if (execPath.includes("bun")) return "bun";
        if (execPath.includes("pnpm")) return "pnpm";
        if (execPath.includes("yarn")) return "yarn";
        if (execPath.includes("npm") || execPath.includes("npx")) return "npm";
      }

      // Check for specific environment variables
      if (process.env.BUN_INSTALL) return "bun";
      if (process.env.PNPM_HOME) return "pnpm";
      if (process.env.YARN_WRAP_OUTPUT) return "yarn";

      // Check process title
      const processTitle = (process.title || "").toLowerCase();
      if (processTitle.includes("bun")) return "bun";
      if (processTitle.includes("pnpm")) return "pnpm";
      if (processTitle.includes("yarn")) return "yarn";
      if (processTitle.includes("npx") || processTitle.includes("npm"))
        return "npm";

      return null;
    } catch {
      return null;
    }
  }

  private async getPreferredPackageManager(): Promise<SupportedPackageManager> {
    // Check for lock files in current directory to determine preference
    const lockFiles = [
      { name: "bun" as const, file: "bun.lockb" },
      { name: "pnpm" as const, file: "pnpm-lock.yaml" },
      { name: "yarn" as const, file: "yarn.lock" },
      { name: "npm" as const, file: "package-lock.json" },
    ];

    for (const { name, file } of lockFiles) {
      if (await fs.pathExists(path.join(this.root, file))) {
        return name;
      }
    }

    // Check for packageManager field in package.json
    const packageJsonPath = path.join(this.root, "package.json");
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const packageJson = await fs.readJson(packageJsonPath);
        if (packageJson.packageManager) {
          const manager = packageJson.packageManager.split("@")[0];
          if (["npm", "yarn", "pnpm", "bun"].includes(manager)) {
            return manager as SupportedPackageManager;
          }
        }
      } catch {
        // Ignore errors reading package.json
      }
    }

    // Check if specific package managers are available
    const availableManagers = await this.getAvailablePackageManagers();

    // Prefer bun if available, then pnpm, then yarn, finally npm
    const preferenceOrder: SupportedPackageManager[] = [
      "bun",
      "pnpm",
      "yarn",
      "npm",
    ];

    for (const manager of preferenceOrder) {
      if (availableManagers.includes(manager)) {
        return manager;
      }
    }

    // Default to npm (should always be available)
    return "npm";
  }

  private async getAvailablePackageManagers(): Promise<
    SupportedPackageManager[]
  > {
    const managers: SupportedPackageManager[] = ["npm", "yarn", "pnpm", "bun"];
    const available: SupportedPackageManager[] = [];

    const checkPromises = managers.map(async (manager) => {
      try {
        const result = await this.executeCommand(manager, ["--version"], {
          stdio: "pipe",
          timeout: 5000,
        });
        if (result.code === 0) {
          available.push(manager);
        }
      } catch {
        // Manager not available
      }
    });

    await Promise.all(checkPromises);
    return available;
  }

  async hasBun(): Promise<boolean> {
    try {
      const bunLock = await fs.pathExists(path.join(this.root, "bun.lockb"));
      if (bunLock) return true;

      const result = await this.executeCommand("bun", ["--version"], {
        stdio: "pipe",
        timeout: 5000,
      });
      return result.code === 0;
    } catch {
      return false;
    }
  }

  getCurrentManager(): SupportedPackageManager {
    return this.manager;
  }

  async install(packages: string[], isDev = false): Promise<void> {
    if (!this.initialized) await this.init();

    const args = this.getInstallArgs(packages, isDev);

    console.log(`Installing with ${this.manager}: ${packages.join(" ")}`);

    const result = await this.executeCommand(this.manager, args);

    if (result.code !== 0) {
      throw new Error(
        `${this.manager} install failed with code ${result.code}`
      );
    }
  }

  async add(packageName: string, isDev = false): Promise<void> {
    return this.addMultiple([packageName], isDev);
  }

  async addMultiple(packageNames: string[], isDev = false): Promise<void> {
    if (!this.initialized) await this.init();

    const args = this.getAddArgs(packageNames, isDev);

    console.log(`Adding ${packageNames.join(", ")} with ${this.manager}...`);

    const result = await this.executeCommand(this.manager, args);

    if (result.code !== 0) {
      throw new Error(`${this.manager} add failed with code ${result.code}`);
    }
  }

  async remove(packageName: string): Promise<void> {
    if (!this.initialized) await this.init();

    const args = this.getRemoveArgs(packageName);

    console.log(`Removing ${packageName} with ${this.manager}...`);

    const result = await this.executeCommand(this.manager, args);

    if (result.code !== 0) {
      throw new Error(`${this.manager} remove failed with code ${result.code}`);
    }
  }

  private async executeCommand(
    command: string,
    args: string[],
    options: { stdio?: "inherit" | "pipe"; timeout?: number } = {}
  ): Promise<{ code: number }> {
    const { stdio = "inherit", timeout } = options;

    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        cwd: this.root,
        stdio,
        shell: process.platform === "win32", // Use shell on Windows for better compatibility
      });

      let timeoutId: NodeJS.Timeout | undefined;

      if (timeout) {
        timeoutId = setTimeout(() => {
          child.kill("SIGTERM");
          reject(new Error(`Command timed out after ${timeout}ms`));
        }, timeout);
      }

      child.on("close", (code) => {
        if (timeoutId) clearTimeout(timeoutId);
        resolve({ code: code ?? 1 });
      });

      child.on("error", (error) => {
        if (timeoutId) clearTimeout(timeoutId);
        reject(new Error(`Failed to run ${command}: ${error.message}`));
      });
    });
  }

  private getInstallArgs(packages: string[], isDev: boolean): string[] {
    switch (this.manager) {
      case "npm":
        return ["install", ...packages, ...(isDev ? ["--save-dev"] : [])];
      case "yarn":
        return ["add", ...packages, ...(isDev ? ["--dev"] : [])];
      case "pnpm":
        return ["add", ...packages, ...(isDev ? ["--save-dev"] : [])];
      case "bun":
        return ["add", ...packages, ...(isDev ? ["--dev"] : [])];
      default:
        return ["install", ...packages, ...(isDev ? ["--save-dev"] : [])];
    }
  }

  private getAddArgs(packageNames: string[], isDev: boolean): string[] {
    switch (this.manager) {
      case "npm":
        return ["install", ...packageNames, ...(isDev ? ["--save-dev"] : [])];
      case "yarn":
        return ["add", ...packageNames, ...(isDev ? ["--dev"] : [])];
      case "pnpm":
        return ["add", ...packageNames, ...(isDev ? ["--save-dev"] : [])];
      case "bun":
        return ["add", ...packageNames, ...(isDev ? ["--dev"] : [])];
      default:
        return ["install", ...packageNames, ...(isDev ? ["--save-dev"] : [])];
    }
  }

  private getRemoveArgs(packageName: string): string[] {
    switch (this.manager) {
      case "npm":
        return ["uninstall", packageName];
      case "yarn":
        return ["remove", packageName];
      case "pnpm":
        return ["remove", packageName];
      case "bun":
        return ["remove", packageName];
      default:
        return ["uninstall", packageName];
    }
  }

  // Utility method to get the correct CLI command for running harukit
  getCliCommand(command: string): string {
    switch (this.manager) {
      case "npm":
        return `npx harukit@latest ${command}`;
      case "yarn":
        return `yarn dlx harukit@latest ${command}`;
      case "pnpm":
        return `pnpm dlx harukit@latest ${command}`;
      case "bun":
        return `bunx --bun harukit@latest ${command}`;
      default:
        return `npx harukit@latest ${command}`;
    }
  }
}
