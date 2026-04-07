/**
 * tools/scopes.js
 *
 * Purpose:
 * Provides MCP tools for understanding repository scopes.
 *
 * This file allows Claude to:
 * - Inspect a specific scope
 * - Understand its purpose
 * - Follow its rules before reading or modifying files
 *
 * Mental model:
 * config/scopes.js → defines WHAT scopes exist
 * tools/scopes.js  → defines HOW Claude interacts with them
 *
 * Responsibilities:
 * - Validate scope names
 * - Format scope data into readable output
 * - Enforce that only valid scopes are used
 *
 * Tool behavior:
 * - describe_scope → full breakdown (path, description, rules)
 * - list_scope_rules → rules only (quick reference)
 *
 * Important rules:
 * - NEVER access filesystem here
 * - NEVER modify scopes (read-only)
 * - ALWAYS validate scope before using it
 *
 * Design goal:
 * Force Claude to understand the system BEFORE interacting with files
 *
 * Used by:
 * - server.js (tool routing)
 * - Claude reasoning workflow (scope-first thinking)
 */

import { SCOPES } from "../config/scopes.js";

export const scopeTools = [
  {
    name: "describe_scope",
    description: "Describe a project scope including its purpose and rules",
    inputSchema: {
      type: "object",
      properties: {
        scope: { type: "string" }
      },
      required: ["scope"]
    }
  },
  {
    name: "list_scope_rules",
    description: "List rules for a specific project scope",
    inputSchema: {
      type: "object",
      properties: {
        scope: { type: "string" }
      },
      required: ["scope"]
    }
  }
];

function getScope(scopeName) {
  const scope = SCOPES[scopeName];

  if (!scope) {
    throw new Error(`Invalid scope: ${scopeName}`);
  }

  return scope;
}

export async function handleScopeTool(name, args) {
  if (name === "describe_scope") {
    const { scope } = args;
    const data = getScope(scope);

    let text = `Scope: ${scope}\n`;
    text += `Path: ${data.path}\n`;
    text += `Description: ${data.description}\n\n`;
    text += `Rules:\n`;

    for (const rule of data.rules) {
      text += `- ${rule}\n`;
    }

    return {
      content: [{ type: "text", text }]
    };
  }

  if (name === "list_scope_rules") {
    const { scope } = args;
    const data = getScope(scope);

    return {
      content: [{ type: "text", text: data.rules.join("\n") }]
    };
  }

  return null;
}