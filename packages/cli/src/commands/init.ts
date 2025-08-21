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
      try {
        // Configure prompts to handle terminal issues better
        prompts.override({});

        const answers = await prompts(
          [
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
              validate: (value: string) => {
                if (!value || value.trim().length === 0) {
                  return "Import alias cannot be empty";
                }
                if (
                  !value.startsWith("@/") &&
                  !value.startsWith("~/") &&
                  !value.startsWith("./")
                ) {
                  return "Import alias should start with @/, ~/, or ./";
                }
                return true;
              },
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
          ],
          {
            onCancel: () => {
              console.log(chalk.red("\nOperation cancelled"));
              process.exit(1);
            },
          }
        );

        // Check if user cancelled (Ctrl+C)
        if (!answers || Object.keys(answers).length === 0) {
          console.log(chalk.red("\nOperation cancelled"));
          process.exit(1);
        }

        preferences = { ...preferences, ...answers };
      } catch (error) {
        // Fallback for prompt failures
        console.log(
          chalk.yellow("\n⚠️ Interactive prompts failed. Using default values.")
        );
        console.log(
          chalk.blue(
            "You can modify these settings in harukit.json after initialization."
          )
        );

        // Use CLI options if provided, otherwise use defaults
        preferences = {
          ...preferences,
          ...Object.fromEntries(
            Object.entries(opts).filter(([_, value]) => value !== undefined)
          ),
        };
      }
    } else {
      preferences = { ...preferences, ...opts };
    }

    const spinner = ora("Initializing Harukit...").start();

    const cssPath = preferences.srcDir
      ? path.join(process.cwd(), "src/app/globals.css")
      : path.join(process.cwd(), "app/globals.css");

    spinner.text = "Creating global CSS...";
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
    spinner.text = "Creating configuration...";
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

    // Ensure baseDir is correct
    const baseDir = preferences.srcDir
      ? path.join(process.cwd(), "src")
      : process.cwd();

    // Create components + lib inside baseDir
    spinner.text = "Creating directory structure...";
    const componentsDir = path.join(baseDir, "components");
    const libDir = path.join(baseDir, "lib");
    await fs.ensureDir(componentsDir);
    await fs.ensureDir(libDir);

    // Add utils.ts
    const utilsFile = getRemoteUtilsFile();
    const utilsDest = path.join(libDir, "utils.ts");

    if (!(await fs.pathExists(utilsDest))) {
      try {
        spinner.text = "Downloading utils.ts...";
        const response = await fetch(utilsFile.path);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch utils.ts: ${response.status} ${response.statusText}`
          );
        }
        const content = await response.text();
        await fs.outputFile(utilsDest, content);
      } catch (err) {
        spinner.warn(
          "Failed to fetch utils.ts, you may need to add it manually"
        );
        console.error(chalk.red("❌ Failed to fetch utils.ts:"), err);
        // Don't throw here, continue with initialization
      }
    }

    spinner.succeed("Harukit initialized successfully!");

    // Show important notices
    console.log(
      chalk.yellow(
        "⚠️  Please check the globals.css file. It has been updated with Harukit styles."
      )
    );

    // Show configuration summary
    console.log(chalk.blue("\n📋 Configuration Summary:"));
    console.log(
      chalk.green(`  • TypeScript: ${preferences.typescript ? "Yes" : "No"}`)
    );
    console.log(
      chalk.green(
        `  • Source Directory: ${preferences.srcDir ? "Yes (src/)" : "No"}`
      )
    );
    console.log(chalk.green(`  • Import Alias: ${preferences.importAlias}`));
    console.log(chalk.green(`  • Base Color: ${preferences.baseColor}`));
    console.log(chalk.green(`  • Package Manager: ${detectedManager}`));

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

    console.log(chalk.blue("\n🚀 Next steps:"));
    console.log(chalk.green("1. Start building your UI!"));
    console.log(
      chalk.green(`2. Add components with: ${getRunCommand("add <component>")}`)
    );
    console.log(chalk.green("3. Check the documentation for usage examples"));

    if (detectedManager === "bun") {
      console.log(
        chalk.yellow(
          `\n💡 Tip: If you experience caching issues with Bun, run: ${chalk.cyan("bun pm cache rm")}`
        )
      );
    }
  } catch (error) {
    console.log(chalk.red("Failed to initialize Harukit"));
    console.error(error);
    process.exit(1);
  }
}
