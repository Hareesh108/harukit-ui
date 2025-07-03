import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { z } from 'zod';
import chalk from 'chalk';
import ora from 'ora';
import { ProjectDetector } from '../utils/project-detector';
import { ConfigManager } from '../config/manager';
import { getTemplatePath } from '../utils/template-resolver';
import { PackageManager } from '../utils/package-manager';

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
    const existingConfigPath = path.join(process.cwd(), 'harukit.json');
    if (await fs.pathExists(existingConfigPath)) {
      console.log(chalk.red('Harukit is already initialized in this project.'));
      console.log(chalk.blue('\nConfiguration file found:'));
      console.log(chalk.green(`  ${existingConfigPath}`));
      console.log(chalk.blue('\nYou can:'));
      console.log(chalk.green('  • Add components with: npx harukit@latest add <component>'));
      console.log(chalk.green('  • Remove components with: npx harukit@latest remove <component>'));
      console.log(chalk.green('  • List available components with: npx harukit@latest list'));
      console.log(chalk.green('  • Update components with: npx harukit@latest update'));
      console.log(chalk.yellow('  • Delete harukit.json to reinitialize'));
      process.exit(0);
    }

    // Detect project type
    const detector = new ProjectDetector(process.cwd());
    const projectInfo = await detector.detect();
    
    if (!projectInfo.isValid) {
      console.log(chalk.red('Could not detect project type. Please run this command in a supported project.'));
      process.exit(1);
    }

    // Parse options
    const opts = initSchema.parse(options);

    // Get user preferences
    let preferences = {
      typescript: true,
      tailwind: true,
      eslint: true,
      srcDir: false,
      importAlias: '@/components',
    };

    if (!opts.yes) {
      const answers = await prompts([
        {
          type: 'confirm',
          name: 'typescript',
          message: 'Would you like to use TypeScript?',
          initial: true,
        },
        {
          type: 'confirm',
          name: 'tailwind',
          message: 'Would you like to use Tailwind CSS?',
          initial: true,
        },
        {
          type: 'confirm',
          name: 'eslint',
          message: 'Would you like to use ESLint?',
          initial: true,
        },
        {
          type: 'confirm',
          name: 'srcDir',
          message: 'Would you like to use a src directory?',
          initial: false,
        },
        {
          type: 'text',
          name: 'importAlias',
          message: 'What import alias would you like to use?',
          initial: '@/components',
        },
      ]);

      preferences = { ...preferences, ...answers };
    } else {
      preferences = { ...preferences, ...opts };
    }

    // Start spinner only after prompts are done
    const spinner = ora('Initializing Harukit...').start();

    // Install dependencies before writing config
    const dependencies = [
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'lucide-react',
    ];
    if (preferences.typescript) {
      dependencies.push('@types/node');
    }

    spinner.text = 'Installing dependencies...';
    const pm = new PackageManager(process.cwd());
    try {
      console.log(chalk.cyan(`→ Installing dependencies: ${dependencies.join(', ')}`));
      await pm.addMultiple(dependencies, false);
      spinner.succeed('All dependencies installed!');
    } catch (err) {
      spinner.fail('Failed to install dependencies.');
      console.error(err);
      process.exit(1);
    }

    // Create configuration
    const config = {
      $schema: 'https://harukit.com/schema.json',
      style: 'default',
      rsc: projectInfo.hasNextJs,
      tsx: preferences.typescript,
      tailwind: {
        config: 'tailwind.config.js',
        css: preferences.srcDir ? 'src/app/globals.css' : 'app/globals.css',
        baseColor: 'slate',
        cssVariables: true,
        prefix: '',
      },
      aliases: {
        components: preferences.importAlias,
        utils: '@/lib/utils',
      },
    };

    // Write configuration file
    const configPath = path.join(process.cwd(), 'harukit.json');
    await fs.writeJson(configPath, config, { spaces: 2 });
    spinner.succeed('Created harukit.json');

    // Create directories
    const componentsDir = path.join(process.cwd(), preferences.srcDir ? 'src' : '', 'components');
    const libDir = path.join(process.cwd(), preferences.srcDir ? 'src' : '', 'lib');
    await fs.ensureDir(componentsDir);
    await fs.ensureDir(libDir);

    // Copy utils file
    const utilsTemplate = getTemplatePath('lib/utils.ts');
    const utilsDest = path.join(libDir, 'utils.ts');
    await fs.copy(utilsTemplate, utilsDest);

    // Copy global CSS if Tailwind is enabled
    if (preferences.tailwind) {
      const cssTemplate = getTemplatePath('globals.css');
      const cssDest = path.join(process.cwd(), preferences.srcDir ? 'src' : '', 'app/globals.css');
      await fs.ensureDir(path.dirname(cssDest));
      await fs.copy(cssTemplate, cssDest);
    }

    spinner.succeed('Harukit initialized successfully!');
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.green('1. Start building your UI!'));
    console.log(chalk.green('2. Add components with: npx harukit@latest add <component>'));
    console.log(chalk.green('3. Check the documentation for usage examples'));

  } catch (error) {
    console.log(chalk.red('Failed to initialize Harukit'));
    console.error(error);
    process.exit(1);
  }
} 