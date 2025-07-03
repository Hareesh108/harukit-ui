import { ComponentMeta, RegistryResponse } from "./types";

// Local component data - no external registry needed
const localComponents: ComponentMeta[] = [
  {
    name: 'accordion',
    description: 'Collapsible content sections',
    category: 'Layout',
    version: '0.1.0',
    tags: ['layout', 'collapsible', 'accessible'],
    dependencies: ['@radix-ui/react-accordion'],
    devDependencies: [],
    files: [],
    author: 'Harukit Team',
    license: 'MIT',
  },
  {
    name: 'button',
    description: 'Versatile button with multiple variants',
    category: 'Form',
    version: '0.1.0',
    tags: ['form', 'interactive', 'accessible'],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    devDependencies: [],
    files: [],
    author: 'Harukit Team',
    license: 'MIT',
  },
  {
    name: 'card',
    description: 'Container for content with header, content, and footer',
    category: 'Layout',
    version: '0.1.0',
    tags: ['layout', 'container', 'content'],
    dependencies: [],
    devDependencies: [],
    files: [],
    author: 'Harukit Team',
    license: 'MIT',
  },
  {
    name: 'input',
    description: 'Form input field',
    category: 'Form',
    version: '0.1.0',
    tags: ['form', 'input', 'accessible'],
    dependencies: [],
    devDependencies: [],
    files: [],
    author: 'Harukit Team',
    license: 'MIT',
  },
  {
    name: 'label',
    description: 'Form label with accessibility features',
    category: 'Form',
    version: '0.1.0',
    tags: ['form', 'label', 'accessible'],
    dependencies: ['@radix-ui/react-label'],
    devDependencies: [],
    files: [],
    author: 'Harukit Team',
    license: 'MIT',
  },
  {
    name: 'tooltip',
    description: 'Hover tooltips',
    category: 'Feedback',
    version: '0.1.0',
    tags: ['feedback', 'tooltip', 'accessible'],
    dependencies: ['@radix-ui/react-tooltip'],
    devDependencies: [],
    files: [],
    author: 'Harukit Team',
    license: 'MIT',
  },
];

export class RegistryClient {
  private cache: Map<string, ComponentMeta> = new Map();

  constructor() {
    this.updateCache();
  }

  private updateCache(): void {
    this.cache.clear();
    localComponents.forEach((component) => {
      this.cache.set(component.name, component);
    });
  }

  async getComponent(name: string): Promise<ComponentMeta | null> {
    return this.cache.get(name) || null;
  }

  async getAllComponents(): Promise<ComponentMeta[]> {
    return Array.from(this.cache.values());
  }

  async searchComponents(query: string): Promise<ComponentMeta[]> {
    const components = Array.from(this.cache.values());
    const searchTerm = query.toLowerCase();
    
    return components.filter((component) => {
      return (
        component.name.toLowerCase().includes(searchTerm) ||
        component.description.toLowerCase().includes(searchTerm) ||
        component.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
        component.category.toLowerCase().includes(searchTerm)
      );
    });
  }

  async getComponentsByCategory(category: string): Promise<ComponentMeta[]> {
    const components = Array.from(this.cache.values());
    return components.filter((component) => component.category === category);
  }

  async getCategories(): Promise<string[]> {
    const components = Array.from(this.cache.values());
    const categories = new Set(components.map((component) => component.category));
    return Array.from(categories).sort();
  }

  async getRegistry(page: number = 1, limit: number = 20): Promise<RegistryResponse> {
    const components = Array.from(this.cache.values());
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedComponents = components.slice(start, end);

    return {
      components: paginatedComponents,
      total: components.length,
      page,
      limit,
    };
  }
} 