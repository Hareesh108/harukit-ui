import { ComponentMeta, RegistryResponse, ComponentFile } from "./types";

function toRawGithubUrl(url: string) {
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
}

const githubBase =
  "https://github.com/Hareesh108/harukit-ui/blob/main/apps/web/components/ui";

  
  function makeFile(name: string, type: ComponentFile["type"]): ComponentFile {
    const blobUrl = `${githubBase}/${name}`;
    return {
      name,
      content: "", 
      path: toRawGithubUrl(blobUrl),
      type,
    };
}

const localComponents: ComponentMeta[] = [
  {
    name: "button",
    description: "Versatile button with multiple variants",
    category: "Form",
    version: "0.1.0",
    tags: ["form", "interactive", "accessible"],
    dependencies: ["class-variance-authority"],
    devDependencies: [],
    files: [makeFile("button.tsx", "component")],
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/Hareesh108/harukit-ui",
  },
  {
    name: "card",
    description: "Container for content with header, content, and footer",
    category: "Layout",
    version: "0.1.0",
    tags: ["layout", "container", "content"],
    dependencies: [],
    devDependencies: [],
    files: [makeFile("card.tsx", "component")],
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/Hareesh108/harukit-ui",
  },
  {
    name: "input",
    description: "Form input field",
    category: "Form",
    version: "0.1.0",
    tags: ["form", "input", "accessible"],
    dependencies: [],
    devDependencies: [],
    files: [makeFile("input.tsx", "component")],
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/Hareesh108/harukit-ui",
  },
  {
    name: "label",
    description: "Form label with accessibility features",
    category: "Form",
    version: "0.1.0",
    tags: ["form", "label", "accessible"],
    dependencies: ["@radix-ui/react-label"],
    devDependencies: [],
    files: [makeFile("label.tsx", "component")],
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/Hareesh108/harukit-ui",
  },
  {
    name: "tooltip",
    description: "Hover tooltips",
    category: "Feedback",
    version: "0.1.0",
    tags: ["feedback", "tooltip", "accessible"],
    dependencies: ["@radix-ui/react-tooltip"],
    devDependencies: [],
    files: [makeFile("tooltip.tsx", "component")],
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/Hareesh108/harukit-ui",
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
        component.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm)
        ) ||
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

  async getRegistry(
    page: number = 1,
    limit: number = 20
  ): Promise<RegistryResponse> {
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
