export interface ComponentMeta {
  name: string;
  description: string;
  version: string;
  dependencies: string[];
  devDependencies: string[];
  files: ComponentFile[];
  tags: string[];
  category: string;
  author: string;
  license: string;
  repository?: string;
  documentation?: string;
}

export interface ComponentFile {
  name: string;
  content: string;
  path: string;
  type: 'component' | 'utility' | 'style' | 'config';
}

export interface RegistryResponse {
  components: ComponentMeta[];
  total: number;
  page: number;
  limit: number;
}

export interface RegistryError {
  error: string;
  message: string;
  code: number;
}

export interface RegistryConfig {
  url: string;
  cache: boolean;
  ttl: number;
  timeout: number;
}

export interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
} 