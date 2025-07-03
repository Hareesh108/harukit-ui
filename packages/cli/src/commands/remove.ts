import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { ConfigManager } from '../config/manager'

export async function remove(components: string[], options: any) {
  const spinner = ora('Removing components...').start()

  try {
    // Load configuration
    const configManager = new ConfigManager(process.cwd())
    const config = await configManager.load()

    if (!config) {
      spinner.fail('No Harukit configuration found. Run "npx harukit@latest init" first.')
      process.exit(1)
    }

    if (components.length === 0) {
      spinner.fail('Please specify components to remove. Example: npx harukit@latest remove button')
      process.exit(1)
    }

    // Get project structure
    const hasSrcDir = await fs.pathExists(path.join(process.cwd(), 'src'))
    const componentsDir = path.join(process.cwd(), hasSrcDir ? 'src' : '', 'components')

    // Remove components
    for (const component of components) {
      const componentPath = path.join(componentsDir, `${component}.tsx`)

      if (await fs.pathExists(componentPath)) {
        await fs.remove(componentPath)
        console.log(chalk.green(`✅ Removed ${component}.tsx`))
      } else {
        console.log(chalk.yellow(`⚠️  ${component}.tsx not found`))
      }
    }

    spinner.succeed('Components removed successfully!')

  } catch (error) {
    spinner.fail('Failed to remove components')
    console.error(error)
    process.exit(1)
  }
} 