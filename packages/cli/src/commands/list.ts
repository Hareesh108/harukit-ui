import chalk from 'chalk';
import { COMPONENTS } from '../utils/utils';

export async function list() {
  console.log(chalk.blue.bold('\n📦 Harukit Components'));
  console.log(chalk.gray('─'.repeat(50)));

  COMPONENTS.forEach((component) => {
    console.log(
      `${chalk.green.bold('›')} ${chalk.cyan(component.name)} ${chalk.gray(
        `(${component.category})`
      )}`
    );
    console.log(`   ${chalk.gray(component.description)}\n`);
  });

  console.log(chalk.blue.bold('🚀 Usage'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.green('  npx harukit@latest add <component-name>\n'));

  console.log(chalk.blue.bold('✨ Examples'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.green('  npx harukit@latest add button'));
  console.log(chalk.green('  npx harukit@latest add button card input\n'));
}
