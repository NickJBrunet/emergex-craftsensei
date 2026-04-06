/**
 * files.js
 *
 * Purpose:
 * Provides SAFE, scoped file system access for the MCP server.
 *
 * This file is responsible for:
 * - Listing files inside a scope
 * - Reading files inside a scope
 *
 * Why this matters:
 * Claude must NEVER:
 * - Access arbitrary system paths
 * - Mix backend/frontend/plugin directories
 * - Guess file locations
 *
 * All file operations MUST go through:
 * - A valid scope (defined in config/scopes.js)
 * - A safe path resolver (utils/paths.js)
 *
 * This ensures:
 * - Correct project boundaries
 * - Predictable file access
 * - No accidental cross-system edits
 *
 * Design goals:
 * - No raw path access
 * - All operations scoped
 * - Human-readable outputs for Claude
 * - Clear distinction between directories and files
 *
 * Important rules:
 * - Scope is REQUIRED for all operations
 * - Paths are always relative to the scope root
 * - Never bypass resolveScopePath
 *
 * Used by:
 * - server.js (tool routing)
 * - Claude file navigation workflow
 * - Future editing + search tools
 */

import fs from "fs";
import { resolveScopePath } from "../utils/paths.js";

export const fileTools = [
  {
    name: "list_files_in_scope",
    description: "List files and directories inside a project scope",
    inputSchema: {
      type: "object",
      properties: {
        scope: { type: "string" },
        path: { type: "string" }
      },
      required: ["scope"]
    }
  },
  {
    name: "read_file_in_scope",
    description: "Read the contents of a file inside a project scope",
    inputSchema: {
      type: "object",
      properties: {
        scope: { type: "string" },
        path: { type: "string" }
      },
      required: ["scope", "path"]
    }
  }
];

/**
 * Handles all file-related MCP tool calls.
 */
export async function handleFileTool(name, args) {
  if (name === "list_files_in_scope") {
    const { scope, path = "" } = args;

    const fullPath = resolveScopePath(scope, path);

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    const formatted = entries.map((entry) => {
      return entry.isDirectory()
        ? `[DIR] ${entry.name}`
        : entry.name;
    });

    return {
      content: [
        {
          type: "text",
          text: formatted.join("\n")
        }
      ]
    };
  }

  if (name === "read_file_in_scope") {
    const { scope, path } = args;

    const fullPath = resolveScopePath(scope, path);

    const content = fs.readFileSync(fullPath, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: content
        }
      ]
    };
  }

  return null;
}