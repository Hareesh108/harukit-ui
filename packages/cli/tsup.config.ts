import { defineConfig } from 'tsup';
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  noExternal: ['chalk', 'ora'],
  external: [
    'commander',
    'prompts',
    'zod',
    'fs-extra',
    'glob',
    'node-fetch',
    'semver',
    'cosmiconfig',
    'prettier',
    'typescript'
  ],
}); 