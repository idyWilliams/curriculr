import * as fs from 'fs';
import * as path from 'path';

/**
 * Parses a project's package.json to ensure the required dependency is present.
 */
function hasRequiredDependencyInPackageJson(projectPath: string, dependencyName: string): boolean {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found at ${packageJsonPath}`);
  }

  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  return !!dependencies[dependencyName];
}

/**
 * Recursively scans a directory for files to check if the dependency is actually imported
 * AND ensures that there are no obvious hardcoded secrets for that dependency.
 */
function scanSourceCode(dirPath: string, dependencyName: string, extensions: string[] = ['.js', '.ts', '.jsx', '.tsx']): { isImported: boolean, hasHardcodedSecrets: boolean } {
  let isImported = false;
  let hasHardcodedSecrets = false;

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    // Skip node_modules and hidden directories
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      const result = scanSourceCode(fullPath, dependencyName, extensions);
      if (result.isImported) isImported = true;
      if (result.hasHardcodedSecrets) hasHardcodedSecrets = true;
    } else if (stat.isFile() && extensions.includes(path.extname(fullPath))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Simple regex to check for import or require of the specific dependency
      const importRegex = new RegExp(`(import.*from\\s+['"]${dependencyName}['"]|require\\(['"]${dependencyName}['"]\\))`);
      if (importRegex.test(content)) {
        isImported = true;
      }

      // Check for hardcoded API keys (e.g., matching common patterns like pk_test_..., sk_live_...)
      // The assumption here is a candidate should be using process.env or a secure vault.
      const hardcodedSecretRegex = /['"](sk_(test|live)_[a-zA-Z0-9]+|pk_(test|live)_[a-zA-Z0-9]+)['"]/;
      if (hardcodedSecretRegex.test(content)) {
        hasHardcodedSecrets = true;
      }
    }
  }

  return { isImported, hasHardcodedSecrets };
}

/**
 * Fails the CI pipeline if the hard dependency requirement isn't met or if secrets are leaked.
 * Throws an error before LLM inference can begin.
 */
export function verifyDependencies(projectPath: string): void {
  const REQUIRED_LIB = '@use-africa-pay/core';

  console.log(`[Validation] Checking for required dependency: ${REQUIRED_LIB}`);

  const hasInPackageJson = hasRequiredDependencyInPackageJson(projectPath, REQUIRED_LIB);
  if (!hasInPackageJson) {
    throw new Error(`[CI FAILED] Missing hard dependency. ${REQUIRED_LIB} is not listed in package.json.`);
  }

  const { isImported, hasHardcodedSecrets } = scanSourceCode(projectPath, REQUIRED_LIB);
  
  if (!isImported) {
    throw new Error(`[CI FAILED] Dependency declared but never imported. You must integrate ${REQUIRED_LIB} into your codebase.`);
  }

  if (hasHardcodedSecrets) {
    throw new Error(`[CI FAILED] Security Violation: Hardcoded server-side secrets detected in source code. Use environment variables (process.env) instead.`);
  }

  console.log(`[Validation Passed] ${REQUIRED_LIB} is properly installed, integrated, and no hardcoded secrets detected.`);
}
