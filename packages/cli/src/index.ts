import { Command } from 'commander';
import chalk from 'chalk';
import { init } from './commands/init';
import { add } from './commands/add';
import { remove } from './commands/remove';
import { list } from './commands/list';
import { update } from './commands/update';
import { info } from './commands/info';

const program = new Command();

program
  .name('harukit')
  .description('CLI tool for Harukit UI components')
  .version('0.1.0');

// Global options
program
  .option('-s, --silent', 'Suppress all output')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('--registry <url>', 'Custom registry URL');

// Init command
program
  .command('init')
  .description('Initialize Harukit in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--typescript', 'Use TypeScript')
  .option('--tailwind', 'Configure Tailwind CSS')
  .action(init);

// Add command
program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('--path <path>', 'Custom path for components')
  .action(add);

// Remove command
program
  .command('remove')
  .description('Remove components from your project')
  .argument('[components...]', 'Components to remove')
  .action(remove);

// List command
program
  .command('list')
  .description('List available components')
  .option('--installed', 'Show only installed components')
  .action(list);

// Update command
program
  .command('update')
  .description('Update components to latest version')
  .argument('[components...]', 'Components to update')
  .action(update);

// Info command
program
  .command('info')
  .description('Show information about components')
  .argument('[component]', 'Component name')
  .action(info);

// Error handling
program.exitOverride();

try {
  program.parse();
} catch (err) {
  if (err instanceof Error) {
    console.error(chalk.red('Error:'), err.message);
  }
  process.exit(1);
} 