import { z } from 'zod';

export const ConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.enum(['default', 'new-york']).default('default'),
  typescript: z.boolean().default(true),
  tailwind: z.object({
    config: z.string().default('tailwind.config.js'),
    css: z.string().default('src/index.css'),
    baseColor: z.string().default('slate'),
    cssVariables: z.boolean().default(true),
    prefix: z.string().default(''),
  }).default({}),
  aliases: z.object({
    components: z.string().default('@/components'),
    utils: z.string().default('@/lib/utils'),
  }).default({}),
  registry: z.object({
    url: z.string().default('https://registry.harukit.dev'),
    cache: z.boolean().default(true),
    ttl: z.number().default(3600), // 1 hour
  }).default({}),
  components: z.array(z.string()).default([]),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
});

export type Config = z.infer<typeof ConfigSchema>;

export const defaultConfig: Config = {
  style: 'default',
  typescript: true,
  tailwind: {
    config: 'tailwind.config.js',
    css: 'src/index.css',
    baseColor: 'slate',
    cssVariables: true,
    prefix: '',
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
  },
  registry: {
    url: 'https://registry.harukit.dev',
    cache: true,
    ttl: 3600,
  },
  components: [],
  dependencies: [],
  devDependencies: [],
}; 