import * as readline from "readline";
import { z } from "zod";
export const initSchema = z.object({
  yes: z.boolean().optional(),
  typescript: z.boolean().optional(),
  tailwind: z.boolean().optional(),
  eslint: z.boolean().optional(),
  srcDir: z.boolean().optional(),
  importAlias: z.string().optional(),
  baseColor: z.enum(["default", "yellow", "rose"]).optional(),
});

export const getRunCommand = (command: string, detectedManager: string) => {
  switch (detectedManager) {
    case "npm":
      return `npx harukit@latest ${command}`;
    case "yarn":
      return `yarn dlx harukit@latest ${command}`;
    case "pnpm":
      return `pnpm dlx harukit@latest ${command}`;
    case "bun":
      return `bunx --bun harukit@latest ${command}`;
    default:
      return `npx harukit@latest ${command}`;
  }
};
