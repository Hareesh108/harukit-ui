import path from 'path';
import fs from 'fs-extra';

export function getTemplatePath(templatePath: string): string {
  // Correct: When running from dist, templates are in ./templates
  const distPath = path.join(__dirname, 'templates', templatePath);
  if (fs.pathExistsSync(distPath)) {
    return distPath;
  }

  // Check if we're running in development (templates folder)
  const devPath = path.join(__dirname, '../../templates', templatePath);
  if (fs.pathExistsSync(devPath)) {
    return devPath;
  }

  // Check if we're running from the root of the package
  const rootPath = path.join(__dirname, '../../../templates', templatePath);
  if (fs.pathExistsSync(rootPath)) {
    return rootPath;
  }

  // Fallback: try relative to current working directory
  const cwdPath = path.join(process.cwd(), 'templates', templatePath);
  if (fs.pathExistsSync(cwdPath)) {
    return cwdPath;
  }

  // Debug information
  console.error('Template resolver debug info:');
  console.error('Looking for template:', templatePath);
  console.error('__dirname:', __dirname);
  console.error('Checked paths:');
  console.error('  - distPath:', distPath);
  console.error('  - devPath:', devPath);
  console.error('  - rootPath:', rootPath);
  console.error('  - cwdPath:', cwdPath);

  throw new Error(`Template not found: ${templatePath}. Please ensure the CLI is properly built and templates are included.`);
} 