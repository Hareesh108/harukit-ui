import fs from 'fs-extra';
import path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { Config, ConfigSchema, defaultConfig } from './schema';

export class ConfigManager {
  private configPath: string;
  private config: Config;

  constructor(projectRoot: string) {
    this.configPath = path.join(projectRoot, 'harukit.json');
    this.config = { ...defaultConfig };
  }

  async load(): Promise<Config> {
    try {
      // Try to find config using cosmiconfig
      const explorer = cosmiconfig('harukit');
      const result = await explorer.search();

      if (result) {
        const validated = ConfigSchema.parse(result.config);
        this.config = { ...defaultConfig, ...validated };
        return this.config;
      }

      // Fallback to harukit.json
      if (await fs.pathExists(this.configPath)) {
        const configData = await fs.readJson(this.configPath);
        const validated = ConfigSchema.parse(configData);
        this.config = { ...defaultConfig, ...validated };
        return this.config;
      }

      return this.config;
    } catch (error) {
      console.warn('Failed to load config, using defaults:', error);
      return this.config;
    }
  }

  async save(): Promise<void> {
    try {
      await fs.writeJson(this.configPath, this.config, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to save config: ${error}`);
    }
  }

  async update(updates: Partial<Config>): Promise<Config> {
    this.config = { ...this.config, ...updates };
    await this.save();
    return this.config;
  }

  get(): Config {
    return this.config;
  }

  async addComponent(component: string): Promise<void> {
    if (!this.config.components.includes(component)) {
      this.config.components.push(component);
      await this.save();
    }
  }

  async removeComponent(component: string): Promise<void> {
    this.config.components = this.config.components.filter(c => c !== component);
    await this.save();
  }

  async addDependency(dep: string, isDev = false): Promise<void> {
    const deps = isDev ? this.config.devDependencies : this.config.dependencies;
    if (!deps.includes(dep)) {
      deps.push(dep);
      await this.save();
    }
  }

  async removeDependency(dep: string, isDev = false): Promise<void> {
    const deps = isDev ? this.config.devDependencies : this.config.dependencies;
    const index = deps.indexOf(dep);
    if (index > -1) {
      deps.splice(index, 1);
      await this.save();
    }
  }
} 