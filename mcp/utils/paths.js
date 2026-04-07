/**
 * paths.js
 *
 * Purpose:
 * Provides safe path resolution for all MCP tools.
 *
 * Ensures:
 * - All file operations stay inside the repo root
 * - Scoped access (backend, frontend, plugin, etc.)
 * - Prevents accidental or malicious path traversal
 *
 * Example:
 * resolveScopePath("backend_server", "manage.py")
 * → C:/.../backend_server/manage.py
 */

import path from "path";
import { REPO_ROOT, SCOPES } from "../config/scopes.js";

/**
 * Resolve absolute path to a scope root
 */
export function getScopeRoot(scopeName) {
  const scope = SCOPES[scopeName];

  if (!scope) {
    throw new Error(`Invalid scope: ${scopeName}`);
  }

  return path.resolve(REPO_ROOT, scope.path);
}

/**
 * Resolve a file path safely within a scope
 */
export function resolveScopePath(scopeName, relativePath = "") {
  const scopeRoot = getScopeRoot(scopeName);

  const fullPath = path.resolve(scopeRoot, relativePath);

  // 🚨 Prevent escaping the scope directory
  if (!fullPath.startsWith(scopeRoot)) {
    throw new Error("Path traversal detected: access denied");
  }

  return fullPath;
}