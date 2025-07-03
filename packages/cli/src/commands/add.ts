import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { ConfigManager } from '../config/manager'
import { getTemplatePath } from '../utils/template-resolver'
import { PackageManager } from '../utils/package-manager'
import { RegistryClient } from '../registry/client'

export async function add(components: string[], options: any) {
  const spinner = ora('Adding components...').start()

  try {
    // Load configuration
    const configManager = new ConfigManager(process.cwd())
    const config = await configManager.load()

    if (!config) {
      spinner.fail('No Harukit configuration found. Run "npx harukit@latest init" first.')
      process.exit(1)
    }

    // Get components to add
    let componentsToAdd = components

    if (componentsToAdd.length === 0) {
      spinner.fail('Please specify components to add. Example: npx harukit@latest add button card')
      process.exit(1)
    }

    // Initialize registry client and package manager
    const registryClient = new RegistryClient()
    const packageManager = new PackageManager(process.cwd())

    // Get component metadata and validate components
    const componentMetas: any[] = []
    const invalidComponents: string[] = []

    for (const componentName of componentsToAdd) {
      const componentMeta = await registryClient.getComponent(componentName)
      if (componentMeta) {
        componentMetas.push(componentMeta)
      } else {
        invalidComponents.push(componentName)
      }
    }

    if (invalidComponents.length > 0) {
      spinner.fail(`Invalid components: ${invalidComponents.join(', ')}`)
      console.log(chalk.blue('\nAvailable components:'))
      const allComponents = await registryClient.getAllComponents()
      allComponents.forEach((c) => console.log(chalk.green(`  • ${c.name}`)))
      process.exit(1)
    }

    // Get project structure
    const hasSrcDir = await fs.pathExists(path.join(process.cwd(), 'src'))
    const componentsDir = path.join(process.cwd(), hasSrcDir ? 'src' : '', 'components')
    const libDir = path.join(process.cwd(), hasSrcDir ? 'src' : '', 'lib')

    // Ensure directories exist
    await fs.ensureDir(componentsDir)
    await fs.ensureDir(libDir)

    // Collect all dependencies from components
    const allDependencies = new Set<string>()
    const allDevDependencies = new Set<string>()

    for (const componentMeta of componentMetas) {
      componentMeta.dependencies.forEach((dep: string) => allDependencies.add(dep))
      componentMeta.devDependencies.forEach((dep: string) => allDevDependencies.add(dep))
    }

    // Install dependencies if any
    if (allDependencies.size > 0 || allDevDependencies.size > 0) {
      spinner.text = 'Installing dependencies...'
      
      try {
        // Install regular dependencies
        if (allDependencies.size > 0) {
          const depsArray = Array.from(allDependencies)
          console.log(chalk.cyan(`→ Installing dependencies: ${depsArray.join(', ')}`))
          await packageManager.addMultiple(depsArray, false)
        }

        // Install dev dependencies
        if (allDevDependencies.size > 0) {
          const devDepsArray = Array.from(allDevDependencies)
          console.log(chalk.cyan(`→ Installing dev dependencies: ${devDepsArray.join(', ')}`))
          await packageManager.addMultiple(devDepsArray, true)
        }
      } catch (error) {
        spinner.fail('Failed to install dependencies')
        console.error(error)
        process.exit(1)
      }
    }

    // Copy components
    for (const componentMeta of componentMetas) {
      const templatePath = getTemplatePath(`components/${componentMeta.name}.tsx`)
      const destPath = path.join(componentsDir, `${componentMeta.name}.tsx`)

      if (await fs.pathExists(destPath) && !options.overwrite) {
        console.log(chalk.yellow(`⚠️  ${componentMeta.name}.tsx already exists. Use --overwrite to replace.`))
        continue
      }

      await fs.copy(templatePath, destPath)
      console.log(chalk.green(`✅ Added ${componentMeta.name}.tsx`))
      
      // Show dependencies for this component
      if (componentMeta.dependencies.length > 0) {
        console.log(chalk.blue(`   Dependencies: ${componentMeta.dependencies.join(', ')}`))
      }
    }

    // Ensure utils file exists
    const utilsTemplate = getTemplatePath('lib/utils.ts')
    const utilsDest = path.join(libDir, 'utils.ts')

    if (!(await fs.pathExists(utilsDest))) {
      await fs.copy(utilsTemplate, utilsDest)
      console.log(chalk.green('✅ Added utils.ts'))
    }

    spinner.succeed('Components added successfully!')

    console.log(chalk.blue('\nNext steps:'))
    console.log(chalk.green('1. Import and use your components'))
    console.log(chalk.green('2. Add more components with: npx harukit@latest add <component>'))
    console.log(chalk.green('3. Check the documentation for usage examples'))

  } catch (error) {
    spinner.fail('Failed to add components')
    console.error(error)
    process.exit(1)
  }
} 