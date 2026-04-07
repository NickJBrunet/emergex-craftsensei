/**
 * config/scopes.js
 *
 * Purpose:
 * Defines the structure of the entire repository.
 *
 * This file is the SINGLE SOURCE OF TRUTH for:
 * - The absolute repo root (REPO_ROOT)
 * - All valid scopes (SCOPES)
 * - What each scope represents
 * - Rules that enforce boundaries between systems
 *
 * Mental model:
 * This file answers:
 *   "What systems exist in this repo?"
 *
 * It does NOT answer:
 *   "How do we use them?" → that belongs in tools/*
 *
 * Contents:
 * - REPO_ROOT: absolute path to the repo
 * - SCOPES: map of scope name → { path, description, rules }
 *
 * Important rules:
 * - Scope keys must match what tools expect (e.g. "backend_server")
 * - `path` must match the actual folder name in the repo
 * - Keep descriptions concise and accurate
 * - Rules should prevent cross-system mistakes
 *
 * Strict constraints:
 * - NO file system access
 * - NO business logic
 * - NO imports from tools/*
 * - DATA ONLY
 *
 * Used by:
 * - utils/paths.js (path resolution)
 * - tools/repo.js (repo overview)
 * - tools/scopes.js (scope descriptions)
 * - tools/files.js (scoped file access)
 * - tools/search.js (scoped search)
 */

export const REPO_ROOT = "C:/Users/k9lil/Desktop/Github/emergex-crafty-chat-bot";

export const SCOPES = {
  backend_server: {
    path: "backend_server",
    description: "Django backend API (Python)",
    rules: [
      "Contains Django models, views, serializers, authentication",
      "Handles API logic and database access",
      "Do NOT include frontend code here"
    ]
  },

  craftsensei_website: {
    path: "craftsensei-website",
    description: "Next.js frontend (React)",
    rules: [
      "Contains UI components, pages, and API calls",
      "Communicates with backend_server",
      "Do NOT include backend logic here"
    ]
  },

  crafty_bot: {
    path: "crafty_bot",
    description: "Minecraft plugin (Java)",
    rules: [
      "Contains plugin logic for gameplay",
      "Separate from backend and frontend",
      "Do NOT mix web or API logic here"
    ]
  },

  server: {
    path: "server",
    description: "Minecraft server runtime files",
    rules: [
      "Contains configs, world data, runtime files",
      "Not application source code",
      "Be careful modifying files here"
    ]
  },

  mcp: {
    path: "mcp",
    description: "MCP server tooling (Node.js)",
    rules: [
      "Handles AI tooling only",
      "Should not affect application logic"
    ]
  }
};