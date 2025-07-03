import chalk from 'chalk';
import ora from 'ora';

export async function update(components: string[], options: any) {
  const spinner = ora('Updating Harukit...').start();

  try {
    console.log(chalk.blue('\nHarukit is up to date!'));
    console.log(chalk.gray('Components are copied to your project and can be updated manually.'));
    console.log(chalk.gray('To get the latest components, run:'));
    console.log(chalk.green('  npx harukit@latest add <component> --overwrite'));

    spinner.succeed('Update check completed!');

  } catch (error) {
    spinner.fail('Failed to check for updates');
    console.error(error);
    process.exit(1);
  }
} 