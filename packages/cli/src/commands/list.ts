import chalk from 'chalk';

export async function list(options: any) {
  const availableComponents = [
    { name: 'accordion', description: 'Collapsible content sections' },
    { name: 'button', description: 'Versatile button with multiple variants' },
    { name: 'card', description: 'Container for content with header, content, and footer' },
    { name: 'input', description: 'Form input field' },
    { name: 'label', description: 'Form label with accessibility features' },
    { name: 'tooltip', description: 'Hover tooltips' },
  ]

  console.log(chalk.blue('\nAvailable components:'))
  console.log()

  availableComponents.forEach((component) => {
    console.log(chalk.green(`  • ${component.name}`))
    console.log(chalk.gray(`    ${component.description}`))
    console.log()
  })

  console.log(chalk.blue('To add a component, run:'))
  console.log(chalk.green('  npx harukit@latest add <component-name>'))
  console.log()
  console.log(chalk.blue('Examples:'))
  console.log(chalk.green('  npx harukit@latest add button'))
  console.log(chalk.green('  npx harukit@latest add button card input'))
} 