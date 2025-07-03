import fs from 'fs-extra';
import path from 'path';
import { ComponentMeta } from '../registry/types';
import { ConfigManager } from '../config/manager';

export class ComponentInstaller {
  private root: string;
  private configManager: ConfigManager;

  constructor(root: string, configManager: ConfigManager) {
    this.root = root;
    this.configManager = configManager;
  }

  async installComponent(component: ComponentMeta, customPath?: string): Promise<void> {
    const config = this.configManager.get();

    for (const file of component.files) {
      await this.installFile(file, config, customPath);
    }
  }

  private async installFile(file: any, config: any, customPath?: string): Promise<void> {
    let targetPath: string;

    switch (file.type) {
      case 'component':
        targetPath = this.resolveComponentPath(file.name, config, customPath);
        break;
      case 'utility':
        targetPath = this.resolveUtilityPath(file.name, config);
        break;
      case 'style':
        targetPath = this.resolveStylePath(file.name, config);
        break;
      case 'config':
        targetPath = this.resolveConfigPath(file.name, config);
        break;
      default:
        targetPath = path.join(this.root, file.path);
    }

    // Ensure directory exists
    await fs.ensureDir(path.dirname(targetPath));

    // Transform content based on config
    const transformedContent = this.transformContent(file.content, config);

    // Write file
    await fs.writeFile(targetPath, transformedContent);

    console.log(`  📄 Created ${path.relative(this.root, targetPath)}`);
  }

  private resolveComponentPath(fileName: string, config: any, customPath?: string): string {
    const basePath = customPath || config.aliases.components.replace('@', 'src');
    return path.resolve(this.root, basePath, fileName);
  }

  private resolveUtilityPath(fileName: string, config: any): string {
    const basePath = config.aliases.utils.replace('@', 'src');
    return path.resolve(this.root, basePath, fileName);
  }

  private resolveStylePath(fileName: string, config: any): string {
    return path.resolve(this.root, 'src/styles', fileName);
  }

  private resolveConfigPath(fileName: string, config: any): string {
    return path.resolve(this.root, fileName);
  }

  private transformContent(content: string, config: any): string {
    let transformed = content;

    // Replace import aliases
    transformed = transformed.replace(/@\/components/g, config.aliases.components);
    transformed = transformed.replace(/@\/lib\/utils/g, config.aliases.utils);

    // Handle TypeScript/JavaScript conversion
    if (!config.typescript) {
      transformed = this.convertToJavaScript(transformed);
    }

    // Apply style variants
    if (config.style === 'new-york') {
      transformed = this.applyNewYorkStyle(transformed);
    }

    return transformed;
  }

  private convertToJavaScript(content: string): string {
    // Simple TypeScript to JavaScript conversion
    return content
      .replace(/\.tsx?$/g, '.js')
      .replace(/import type \{([^}]+)\} from ['"]([^'"]+)['"];?/g, '')
      .replace(/: ([A-Z][a-zA-Z]*)(<[^>]*>)?/g, '')
      .replace(/<([A-Z][a-zA-Z]*)(<[^>]*>)?>/g, '<$1>')
      .replace(/React\.FC<[^>]*>/g, 'React.FC')
      .replace(/React\.ComponentPropsWithoutRef<[^>]*>/g, 'any');
  }

  private applyNewYorkStyle(content: string): string {
    // Apply New York style modifications
    return content
      .replace(/rounded-md/g, 'rounded-lg')
      .replace(/rounded-lg/g, 'rounded-xl')
      .replace(/text-sm/g, 'text-base')
      .replace(/text-base/g, 'text-lg');
  }

  async removeComponent(componentName: string): Promise<void> {
    const config = this.configManager.get();
    const componentPath = this.resolveComponentPath(`${componentName}.tsx`, config);

    if (await fs.pathExists(componentPath)) {
      await fs.remove(componentPath);
      console.log(`  🗑️  Removed ${path.relative(this.root, componentPath)}`);
    }
  }

  async updateComponent(component: ComponentMeta): Promise<void> {
    const config = this.configManager.get();

    for (const file of component.files) {
      const targetPath = this.resolveComponentPath(file.name, config);
      
      if (await fs.pathExists(targetPath)) {
        const transformedContent = this.transformContent(file.content, config);
        await fs.writeFile(targetPath, transformedContent);
        console.log(`  🔄 Updated ${path.relative(this.root, targetPath)}`);
      }
    }
  }
} 