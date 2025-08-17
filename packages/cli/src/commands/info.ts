import chalk from 'chalk';
import ora from 'ora';
import { COMPONENTS } from '../utils/utils';

export async function info(component?: string) {
  const spinner = ora('Getting information...').start();

  try {
    if (component) {
      // Show single
      const c = COMPONENTS.find(c => c.name === component);
      if (c) {
        spinner.stop();
        console.log(chalk.blue(`\n📦 ${c.name}`));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(`${chalk.gray('Category:')} ${chalk.green(c.category)}`);
        console.log(`${chalk.gray('Description:')} ${c.description}`);
        console.log();
        console.log(chalk.blue('Usage:'));
        console.log(chalk.green(`  npx harukit@latest add ${c.name}\n`));
      } else {
        spinner.stop();
        console.log(chalk.red(`Component "${component}" not found.`));
        console.log(chalk.blue('\nAvailable components:'));
        COMPONENTS.forEach(c => {
          console.log(chalk.green(`  • ${c.name}`));
        });
      }
    } else {
      // Show all components
      spinner.stop();
      console.log(chalk.blue('\nAvailable Harukit Components'));
      console.log(chalk.gray('─'.repeat(50)));

      COMPONENTS.forEach(c => {
        console.log(chalk.green(`\n📦 ${c.name}`));
        console.log(chalk.gray(`Category: ${c.category}`));
        console.log(chalk.gray(`Description: ${c.description}`));
        console.log(chalk.blue(`Usage: npx harukit@latest add ${c.name}`));
      });

      console.log();
    }

    spinner.succeed('Information displayed successfully!');
  } catch (error) {
    spinner.fail('Failed to get information');
    console.error(error);
    process.exit(1);
  }
}
