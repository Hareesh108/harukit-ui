import chalk from 'chalk';
import ora from 'ora';
import { ConfigManager } from '../config/manager';
import { RegistryClient } from '../registry/client';

export async function info(component: string, options: any) {
  const spinner = ora('Getting information...').start();

  try {
    // Load configuration
    const configManager = new ConfigManager(process.cwd());
    const config = await configManager.load();

    if (!config) {
      spinner.fail('No Harukit configuration found. Run "npx harukit@latest init" first.');
      process.exit(1);
    }

    if (component) {
      // Show specific component info
      const availableComponents = [
        { name: 'accordion', description: 'Collapsible content sections', category: 'Layout' },
        { name: 'button', description: 'Versatile button with multiple variants', category: 'Form' },
        { name: 'card', description: 'Container for content with header, content, and footer', category: 'Layout' },
        { name: 'input', description: 'Form input field', category: 'Form' },
        { name: 'label', description: 'Form label with accessibility features', category: 'Form' },
        { name: 'tooltip', description: 'Hover tooltips', category: 'Feedback' },
      ];

      const componentInfo = availableComponents.find(c => c.name === component);
      
      if (componentInfo) {
        console.log(chalk.blue(`\nComponent: ${componentInfo.name}`));
        console.log(chalk.gray(`Category: ${componentInfo.category}`));
        console.log(chalk.gray(`Description: ${componentInfo.description}`));
        console.log();
        console.log(chalk.blue('Usage:'));
        console.log(chalk.green(`  npx harukit@latest add ${component}`));
      } else {
        console.log(chalk.red(`Component "${component}" not found`));
        console.log(chalk.blue('Available components:'));
        availableComponents.forEach(c => console.log(chalk.green(`  • ${c.name}`)));
      }
    } else {
      // Show general info
      console.log(chalk.blue('\nHarukit Information'));
      console.log(chalk.gray('─'.repeat(50)));
      console.log(chalk.green('Version: 0.1.0'));
      console.log(chalk.green('Framework: React + TypeScript'));
      console.log(chalk.green('Styling: Tailwind CSS'));
      console.log(chalk.green('Primitives: Radix UI'));
      console.log();
      console.log(chalk.blue('Available Commands:'));
      console.log(chalk.green('  init    - Initialize Harukit in your project'));
      console.log(chalk.green('  add     - Add components to your project'));
      console.log(chalk.green('  remove  - Remove components from your project'));
      console.log(chalk.green('  list    - List available components'));
      console.log(chalk.green('  update  - Check for updates'));
      console.log(chalk.green('  info    - Show information'));
    }

    spinner.succeed('Information retrieved successfully!');

  } catch (error) {
    spinner.fail('Failed to get information');
    console.error(error);
    process.exit(1);
  }
}

async function showComponentInfo(componentName: string, config: any): Promise<void> {
  try {
    const registryClient = new RegistryClient({
      url: config.registry.url,
      cache: config.registry.cache,
      ttl: config.registry.ttl,
      timeout: 30000,
    });
    await registryClient.init();

    const component = await registryClient.getComponent(componentName);
    
    console.log(chalk.green(`📦 ${component?.name}`));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(`Description: ${component?.description}`);
    console.log(`Version: ${chalk.cyan(component?.version)}`);
    console.log(`Category: ${component?.category}`);
    console.log(`Author: ${component?.author}`);
    console.log(`License: ${component?.license}`);
    
    if (component?.repository) {
      console.log(`Repository: ${chalk.blue(component?.repository)}`);
    }
    
    if (component?.documentation) {
      console.log(`Documentation: ${chalk.blue(component?.documentation)}`);
    }

    console.log(`\n${chalk.yellow('Dependencies:')}`);
    if (component?.dependencies && component?.dependencies?.length > 0) {
      component?.dependencies.forEach((dep: string) => {
        console.log(`  • ${dep}`);
      });
    } else {
      console.log('  • None');
    }

    console.log(`\n${chalk.yellow('Dev Dependencies:')}`);
    if (component?.devDependencies && component?.devDependencies?.length > 0) {
      component?.devDependencies.forEach((dep: string) => {
        console.log(`  • ${dep}`);
      });
    } else {
      console.log('  • None');
    }

    console.log(`\n${chalk.yellow('Tags:')}`);
    if (component?.tags && component?.tags?.length > 0) {
      console.log(`  ${component?.tags.join(', ')}`);
    } else {
      console.log('  • None');
    }

    console.log(`\n${chalk.yellow('Files:')}`);
    component?.files.forEach((file: any) => {
      console.log(`  • ${file.name} (${file.type})`);
    });

    const isInstalled = config.components.includes(componentName);
    console.log(`\n${chalk.yellow('Status:')} ${isInstalled ? chalk.green('Installed') : chalk.gray('Not installed')}`);

  } catch (error) {
    console.error(chalk.red(`Component "${componentName}" not found or failed to fetch`));
  }
}

async function showProjectInfo(config: any): Promise<void> {
  console.log(chalk.green('🏗️  Project Information'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(`Style: ${config.style}`);
  console.log(`TypeScript: ${config.typescript ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`Tailwind: ${config.tailwind.cssVariables ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`Components Path: ${config.aliases.components}`);
  console.log(`Utils Path: ${config.aliases.utils}`);
  console.log(`Registry URL: ${config.registry.url}`);

  console.log(`\n${chalk.yellow('Installed Components:')}`);
  if (config.components.length > 0) {
    config.components.forEach((component: string) => {
      console.log(`  • ${component}`);
    });
  } else {
    console.log('  • None');
  }

  console.log(`\n${chalk.yellow('Dependencies:')}`);
  if (config.dependencies.length > 0) {
    config.dependencies.forEach((dep: string) => {
      console.log(`  • ${dep}`);
    });
  } else {
    console.log('  • None');
  }

  console.log(`\n${chalk.yellow('Dev Dependencies:')}`);
  if (config.devDependencies.length > 0) {
    config.devDependencies.forEach((dep: string) => {
      console.log(`  • ${dep}`);
    });
  } else {
    console.log('  • None');
  }
} 