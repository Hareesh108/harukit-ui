import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import { z } from "zod";
import chalk from "chalk";
import ora from "ora";
import { ProjectDetector } from "../utils/project-detector";
import { PackageManager } from "../utils/package-manager";
import { getRemoteUtilsFile } from "../utils/get-utils-path";
import { Preferences } from "../registry/types";
import { buildCssContent } from "../utils/build-css-content";
import { installDeps } from "../utils/install-dep";

const initSchema = z.object({
  yes: z.boolean().optional(),
  typescript: z.boolean().optional(),
  tailwind: z.boolean().optional(),
  eslint: z.boolean().optional(),
  srcDir: z.boolean().optional(),
  importAlias: z.string().optional(),
});

export async function init(options: any) {
  try {
    // Check if configuration already exists
    const existingConfigPath = path.join(process.cwd(), "harukit.json");
    if (await fs.pathExists(existingConfigPath)) {
      console.log(chalk.red("Harukit is already initialized in this project."));
      console.log(chalk.blue("\nConfiguration file found:"));
      console.log(chalk.green(`  ${existingConfigPath}`));

      // Initialize package manager to get the correct command
      const packageManager = new PackageManager(process.cwd());
      await packageManager.init();
      const manager = packageManager.getCurrentManager();

      // Show commands with detected package manager
      const getRunCommand = (command: string) => {
        switch (manager) {
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
      };

      console.log(chalk.blue("\nYou can:"));
      console.log(
        chalk.green(
          `  • Add components with: ${getRunCommand("add <component>")}`
        )
      );
      console.log(
        chalk.green(
          `  • Remove components with: ${getRunCommand("remove <component>")}`
        )
      );
      console.log(
        chalk.green(
          `  • List available components with: ${getRunCommand("list")}`
        )
      );
      console.log(
        chalk.green(`  • Update components with: ${getRunCommand("update")}`)
      );
      console.log(chalk.yellow("  • Delete harukit.json to reinitialize"));
      process.exit(0);
    }

    // Initialize package manager early to detect which one was used
    const packageManager = new PackageManager(process.cwd());
    await packageManager.init();
    const detectedManager = packageManager.getCurrentManager();

    console.log(
      chalk.blue(`Detected package manager: ${chalk.green(detectedManager)}`)
    );

    // Detect project type
    const detector = new ProjectDetector(process.cwd());
    const projectInfo = await detector.detect();

    if (!projectInfo.isValid) {
      console.log(
        chalk.red(
          "Could not detect project type. Please run this command in a supported project."
        )
      );
      process.exit(1);
    }

    // Parse options
    const opts = initSchema.parse(options);

    // Default preferences
    let preferences: Preferences = {
      typescript: true,
      srcDir: true,
      importAlias: "@/components",
      baseColor: "default",
    };

    // Ask user if not running with --yes
    if (!opts.yes) {
      const answers = await prompts([
        {
          type: "confirm",
          name: "srcDir",
          message: "Would you like to use a src directory?",
          initial: false,
        },
        {
          type: "text",
          name: "importAlias",
          message: "What import alias would you like to use?",
          initial: "@/components",
        },
        {
          type: "select",
          name: "baseColor",
          message: "Choose a base color theme",
          choices: [
            { title: "Default", value: "default" },
            { title: "Rose", value: "rose" },
            { title: "Yellow", value: "yellow" },
          ],
          initial: 0,
        },
      ]);

      preferences = { ...preferences, ...answers };
    } else {
      preferences = { ...preferences, ...opts };
    }

    const spinner = ora("Initializing Harukit...").start();

    const cssPath = preferences.srcDir
      ? path.join(process.cwd(), "src/app/globals.css")
      : path.join(process.cwd(), "app/globals.css");

    const cssContent = buildCssContent(preferences.baseColor);
    await fs.outputFile(cssPath, cssContent);

    await installDeps(
      {
        typescript: preferences.typescript,
        packageManager: packageManager,
      },
      spinner
    );

    // Create configuration
    const config = {
      $schema: "https://harukit.com/schema.json",
      style: "default",
      rsc: projectInfo.hasNextJs,
      tsx: preferences.typescript,
      tailwind: {
        config: "tailwind.config.js",
        css: preferences.srcDir ? "src/app/globals.css" : "app/globals.css",
        baseColor: preferences.baseColor,
        cssVariables: true,
        prefix: "",
      },
      aliases: {
        components: preferences.importAlias,
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
      iconLibrary: "lucide",
      packageManager: detectedManager,
    };

    // Write config file
    const configPath = path.join(process.cwd(), "harukit.json");
    await fs.writeJson(configPath, config, { spaces: 2 });
    spinner.succeed("Created harukit.json");

    // Ensure baseDir is correct
    const baseDir = preferences.srcDir
      ? path.join(process.cwd(), "src")
      : process.cwd();

    // Create components + lib inside baseDir
    const componentsDir = path.join(baseDir, "components");
    const libDir = path.join(baseDir, "lib");
    await fs.ensureDir(componentsDir);
    await fs.ensureDir(libDir);

    // Add utils.ts
    const utilsFile = getRemoteUtilsFile();
    const utilsDest = path.join(libDir, "utils.ts");

    if (!(await fs.pathExists(utilsDest))) {
      try {
        const response = await fetch(utilsFile.path);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch utils.ts: ${response.status} ${response.statusText}`
          );
        }
        const content = await response.text();
        await fs.outputFile(utilsDest, content);
        console.log(chalk.green("✅ Added utils.ts from GitHub"));
      } catch (err) {
        console.error(chalk.red("❌ Failed to fetch utils.ts:"), err);
        throw err;
      }
    }

    spinner.succeed("Harukit initialized successfully!");
    spinner.succeed("Please check the global.css file. It got overwritten.");

    // Show next steps with the detected package manager
    const getRunCommand = (command: string) => {
      switch (detectedManager) {
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
    };

    console.log(chalk.blue("\nNext steps:"));
    console.log(chalk.green("1. Start building your UI!"));
    console.log(
      chalk.green(`2. Add components with: ${getRunCommand("add <component>")}`)
    );
    console.log(chalk.green("3. Check the documentation for usage examples"));
    console.log(
      chalk.blue(
        `\n💡 Using ${chalk.green(detectedManager)} for package management`
      )
    );
  } catch (error) {
    console.log(chalk.red("Failed to initialize Harukit"));
    console.error(error);
    process.exit(1);
  }
}
