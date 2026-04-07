/**
 * tools/repo.js
 *
 * Purpose:
 * Provides high-level repository awareness tools for the MCP server.
 *
 * This file is responsible for giving Claude an initial understanding of:
 * - What systems exist in the repository
 * - The role of each system
 * - How systems relate to each other
 * - Global rules to avoid breaking cross-system behavior
 *
 * Mental model:
 * config/scopes.js → defines WHAT exists
 * tools/repo.js    → explains the ENTIRE system at a high level
 *
 * This is the FIRST layer of reasoning:
 * Claude should use this BEFORE:
 * - reading files
 * - searching code
 * - making changes
 *
 * Responsibilities:
 * - Aggregate scope data into a repo-wide view
 * - Provide system relationships (frontend ↔ backend ↔ plugin ↔ server)
 * - Establish global constraints across scopes
 *
 * Important rules:
 * - DO NOT access the filesystem here
 * - DO NOT perform scoped operations
 * - DO NOT modify any data
 * - READ-ONLY, descriptive layer only
 *
 * Design goal:
 * Force Claude to think in terms of SYSTEMS, not just files
 *
 * Used by:
 * - server.js (tool registration)
 * - Claude’s initial reasoning step before deeper operations
 */
import { SCOPES } from "../config/scopes.js";

export const repoTools = [
  {
    name: "describe_repo",
    description: "Explain the structure and purpose of the repository",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },

  {
    name: "list_scopes",
    description: "List all available project scopes",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleRepoTool(name) {
  if (name === "describe_repo") {
    let text = "Repository Overview:\n\n";

    for (const [key, scope] of Object.entries(SCOPES)) {
      text += `- ${key}: ${scope.description}\n`;
    }

    text += `\nSystem Relationships:\n`;
    text += `- Frontend (craftsensei_website) communicates with backend_server\n`;
    text += `- backend_server provides APIs and authentication\n`;
    text += `- crafty_bot handles Minecraft plugin logic\n`;
    text += `- server contains runtime/config for Minecraft\n`;
    text += `- mcp is the AI tooling layer\n`;

    text += `\nRules:\n`;
    text += `- Always identify the correct scope before making changes\n`;
    text += `- Do NOT mix frontend, backend, and plugin logic\n`;
    text += `- Be cautious when modifying server files\n`;

    return {
      content: [{ type: "text", text }]
    };
  }

  if (name === "list_scopes") {
    const scopes = Object.keys(SCOPES).join("\n");

    return {
      content: [{ type: "text", text: scopes }]
    };
  }

  return null;
}