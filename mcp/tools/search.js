/**
 * search.js
 *
 * Purpose:
 * Provides codebase search capabilities for the MCP server.
 *
 * This is CRITICAL for real development workflows.
 *
 * Without search:
 * - Claude guesses file locations ❌
 * - Breaks dependencies ❌
 * - Misses cross-file relationships ❌
 *
 * With search:
 * - Finds where things are used ✅
 * - Traces frontend → backend connections ✅
 * - Understands impact before changes ✅
 *
 * Design:
 * - Scoped search (safe, preferred)
 * - Repo-wide search (powerful, optional)
 *
 * Implementation:
 * - Uses ripgrep (rg) if available (fast)
 * - Falls back to Node-based search if not
 *
 * Important:
 * - Always returns file paths + line numbers
 * - Keeps output readable for Claude
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { resolveScopePath } from "../utils/paths.js";
import { REPO_ROOT } from "../config/scopes.js";

export const searchTools = [
  {
    name: "search_in_scope",
    description: "Search for text inside a specific project scope",
    inputSchema: {
      type: "object",
      properties: {
        scope: { type: "string" },
        query: { type: "string" }
      },
      required: ["scope", "query"]
    }
  },
  {
    name: "search_repo",
    description: "Search for text across the entire repository",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" }
      },
      required: ["query"]
    }
  }
];

/**
 * Try ripgrep first, fallback if unavailable
 */
function runSearch(command, cwd) {
  try {
    return execSync(command, { cwd, encoding: "utf-8" });
  } catch {
    return null;
  }
}

/**
 * Fallback search (recursive)
 */
function fallbackSearch(dir, query, results = [], base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fallbackSearch(fullPath, query, results, base);
    } else {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const lines = content.split("\n");

        lines.forEach((line, i) => {
          if (line.includes(query)) {
            results.push(
              `${path.relative(base, fullPath)}:${i + 1}: ${line.trim()}`
            );
          }
        });
      } catch {
        // ignore binary / unreadable files
      }
    }
  }

  return results;
}

export async function handleSearchTool(name, args) {
  if (name === "search_in_scope") {
    const { scope, query } = args;

    const scopePath = resolveScopePath(scope);

    // Try ripgrep
    const rgResult = runSearch(`rg "${query}" --line-number`, scopePath);

    if (rgResult) {
      return {
        content: [{ type: "text", text: rgResult }]
      };
    }

    // Fallback
    const results = fallbackSearch(scopePath, query);

    return {
      content: [
        {
          type: "text",
          text: results.join("\n") || "No results found"
        }
      ]
    };
  }

  if (name === "search_repo") {
    const { query } = args;

    const rgResult = runSearch(`rg "${query}" --line-number`, REPO_ROOT);

    if (rgResult) {
      return {
        content: [{ type: "text", text: rgResult }]
      };
    }

    const results = fallbackSearch(REPO_ROOT, query);

    return {
      content: [
        {
          type: "text",
          text: results.join("\n") || "No results found"
        }
      ]
    };
  }

  return null;
}