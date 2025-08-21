import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { ProjectDetector } from "../utils/project-detector";
import { PackageManager } from "../utils/package-manager";
import { Preferences } from "../registry/types";
import { buildCssContent } from "../utils/build-css-content";
import { installDeps } from "../utils/install-dep";
import { initSchema } from "../utils/init-utils";
import { log, makeFile } from "../utils/utils";
import { getErrorMessage } from "../utils/error-utils";

export async function init(options: typeof initSchema) {
  try {
    // 01: Check if configuration already exists
    const existingConfigPath = path.join(process.cwd(), "harukit.json");
    if (await fs.pathExists(existingConfigPath)) {
      log.error("Harukit is already initialized in this project.");
      log.info(
        `Configuration file found at: ${chalk.green(existingConfigPath)}`
      );
      log.warn("Delete harukit.json if you want to reinitialize.");
      process.exit(1);
    }

    // 02: Initialize package manager early to detect which one was used
    const packageManager = new PackageManager(process.cwd());
    await packageManager.init();
    const detectedManager = packageManager.getCurrentManager();

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

    if (detectedManager === "bun") {
      log.warn(
        `Tip: If you experience issues with Bun, try using: ${chalk.cyan("npx harukit@latest init")}\n`
      );
    }

    const opts = initSchema.parse(options);

    // Default preferences with --yes
    let preferences: Preferences = {
      typescript: true,
      srcDir: true,
      importAlias: "@/components",
      baseColor: "default",
    };

    // Ask user if not running with --yes
    if (!opts.yes) {
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
            log.error("\n Harukit Initialization Cancelled");
            process.exit(1);
          },
        }
      );
      preferences = { ...preferences, ...answers };
    } else {
      preferences = { ...preferences, ...opts };
    }

    console.log();
    const spinner = ora("Initializing Harukit...").start();

    // 03: CSS config
    const cssPath = preferences.srcDir
      ? path.join(process.cwd(), "src/app/globals.css")
      : path.join(process.cwd(), "app/globals.css");
    const cssContent = buildCssContent(preferences.baseColor);
    await fs.outputFile(cssPath, cssContent);

    // 04: Install dependencies
    await installDeps(
      {
        typescript: preferences.typescript,
        packageManager: packageManager,
      },
      spinner
    );

    // 05: Create configuration
    const config = {
      $schema: "https://harukit.com/schema.json",
      rsc: projectInfo.hasNextJs,
      tsx: preferences.typescript,
      tailwind: {
        css: preferences.srcDir ? "src/app/globals.css" : "app/globals.css",
        baseColor: preferences.baseColor,
        cssVariables: true,
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

    // 06:Write config file
    const configPath = path.join(process.cwd(), "harukit.json");
    await fs.writeJson(configPath, config, { spaces: 2 });

    // 07: Ensure baseDir is correct
    console.log();
    const baseDir = preferences.srcDir
      ? path.resolve(
          process.cwd(),
          preferences.srcDir === true ? "src" : preferences.srcDir
        )
      : process.cwd();

    const componentsDir = path.join(baseDir, "components");
    const libDir = path.join(baseDir, "lib");

    try {
      if (await fs.pathExists(componentsDir)) {
        log.warn(`Directory already exists: ${componentsDir}`);
      } else {
        await fs.ensureDir(componentsDir);
      }

      if (await fs.pathExists(libDir)) {
        log.warn(`Directory already exists: ${libDir}`);
      } else {
        await fs.ensureDir(libDir);
      }
    } catch (e) {
      log.error(`Failed to create directory structure: ${getErrorMessage(e)}`);
      process.exit(1);
    }

    // 08: Add utils.ts
    console.log();
    const utilsFile = makeFile("lib", "utils.ts", "utility");
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
      } catch (err) {
        spinner.warn(
          "Failed to fetch utils.ts, you may need to add it manually"
        );
        log.error(`Failed to fetch utils.ts: ${getErrorMessage(err)}`);
      }
    }

    // 09: Setup completed!!
    console.log();
    spinner.succeed("Harukit initialized successfully!");
    log.warn(
      "Please check the globals.css file. It has been updated with Harukit styles.\n"
    );
    log.info("Next steps:");
    log.info("1. Start building your UI!");
    log.info("3. Check the documentation for usage examples\n");
  } catch (error) {
    log.error("Failed to initialize Harukit");
    log.error(getErrorMessage(error));
    process.exit(1);
  }
}
