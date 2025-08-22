import { spawn } from "child_process";
import ora from "ora";
import path from "path";
import fs from "fs-extra";
import { log } from "./utils";

export async function ensureNextJsProject(
  cwd: string,
  detectedManager: string
): Promise<string> {
  const pkgPath = path.join(cwd, "package.json");
  if (await fs.pathExists(pkgPath)) {
    return cwd; // Already a project
  }

  const spinner = ora(
    "No project detected. Creating a new Next.js project..."
  ).start();

  const managerCommands: Record<string, string[]> = {
    bun: ["bunx", "create-next-app@latest"],
    pnpm: ["pnpm", "create", "next-app"],
    yarn: ["yarn", "create", "next-app"],
    npm: ["npx", "create-next-app@latest"],
    npx: ["npx", "create-next-app@latest"],
  };

  const command = managerCommands[detectedManager] ?? managerCommands["npx"];
  const bin = command[0];
  const args = command.slice(1);

  spinner.stop();

  let createdPath: string | null = null;

  try {
    await new Promise<void>((resolve, reject) => {
      const child = spawn(bin, args, {
        cwd,
        stdio: ["inherit", "pipe", "inherit"], // capture stdout only
        shell: process.platform === "win32",
      });

      child.stdout.on("data", (data: Buffer) => {
        const output = data.toString();
        process.stdout.write(output); // still show it live

        const match = output.match(/Success! Created .* at (.+)/);
        if (match) {
          createdPath = match[1].trim();
        }
      });

      child.on("close", (code) => {
        if (code !== 0) {
          return reject(
            new Error(`${command.join(" ")} failed with code ${code}`)
          );
        }
        resolve();
      });
    });

    if (!createdPath) {
      throw new Error("Could not determine created Next.js project path.");
    }

    log.info(
      `Next.js project created successfully in ${createdPath} using ${detectedManager}!`
    );

    // Switch process cwd to new project root
    process.chdir(createdPath);

    return createdPath;
  } catch (err) {
    log.error("Failed to create Next.js project");
    log.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
