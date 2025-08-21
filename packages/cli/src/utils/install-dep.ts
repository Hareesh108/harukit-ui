import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { PackageManager } from "./package-manager";
import ora from "ora";

function isPackageInstalled(pkgName: string): boolean {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  return (
    packageJson.dependencies?.[pkgName] !== undefined ||
    packageJson.devDependencies?.[pkgName] !== undefined
  );
}

export async function installDeps(
  options: {
    typescript: boolean;
    packageManager?: PackageManager;
  },
  spinner: ora.Ora
) {
  const { typescript, packageManager } = options;

  const dependencies = [
    "clsx",
    "lucide-react",
    "tailwind-merge",
    "class-variance-authority",
  ];

  const devDependencies = [
    "tailwindcss",
    "tw-animate-css",
    "@tailwindcss/postcss",
  ];

  if (typescript) {
    devDependencies.push("@types/node");
  }

  // filter out already installed ones
  const depsToInstall = dependencies.filter((dep) => !isPackageInstalled(dep));
  const devDepsToInstall = devDependencies.filter(
    (dep) => !isPackageInstalled(dep)
  );

  // Use provided package manager or create a new one
  const pm = packageManager || new PackageManager(process.cwd());

  // Initialize if we created a new package manager
  if (!packageManager) {
    await pm.init();
  }

  const manager = pm.getCurrentManager();

  console.log(
    chalk.cyan(`\nUsing ${chalk.green(manager)} for package management`)
  );

  console.log(chalk.cyan("\nInstalling dependencies:"));
  depsToInstall.forEach((dep) => console.log(chalk.cyan(`- ${dep}`)));
  if (depsToInstall.length === 0) {
    console.log(chalk.gray("All dependencies already installed ✅"));
  }

  console.log(chalk.cyan("\nInstalling devDependencies:"));
  devDepsToInstall.forEach((dep) => console.log(chalk.cyan(`- ${dep}`)));
  if (devDepsToInstall.length === 0) {
    console.log(chalk.gray("All devDependencies already installed ✅"));
  }

  spinner.text = `Installing dependencies with ${manager}...`;
  try {
    if (depsToInstall.length > 0) {
      await pm.addMultiple(depsToInstall, false);
    }
    if (devDepsToInstall.length > 0) {
      await pm.addMultiple(devDepsToInstall, true);
    }
    spinner.succeed(`All dependencies installed with ${manager}!`);
  } catch (err) {
    spinner.fail(`Failed to install dependencies with ${manager}.`);
    console.error(err);
    process.exit(1);
  }
}
