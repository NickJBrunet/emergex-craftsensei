import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { repoTools, handleRepoTool } from "./tools/repo.js";
import { scopeTools, handleScopeTool } from "./tools/scopes.js";
import { fileTools, handleFileTool } from "./tools/files.js";
import { searchTools, handleSearchTool } from "./tools/search.js";

/**
 * server.js
 *
 * Purpose:
 * Main MCP server entry point.
 *
 * This file:
 * - Registers all tools
 * - Routes tool calls
 * - Defines execution order
 *
 * Tool execution order (IMPORTANT):
 * 1. repo tools     → high-level understanding
 * 2. scope tools    → subsystem rules
 * 3. search tools   → relationship discovery
 * 4. file tools     → actual file access
 *
 * This ensures Claude behaves like a real developer:
 * understand → scope → search → then read/edit
 */

const server = new Server(
  {
    name: "dev-helper",
    version: "2.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register all tools
const tools = [
  ...repoTools,
  ...scopeTools,
  ...searchTools,
  ...fileTools,
];

// LIST TOOLS
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// CALL TOOL
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // 1. Repo tools
    let result = await handleRepoTool(name);
    if (result) return result;

    // 2. Scope tools
    result = await handleScopeTool(name, args);
    if (result) return result;

    // 3. Search tools
    result = await handleSearchTool(name, args);
    if (result) return result;

    // 4. File tools
    result = await handleFileTool(name, args);
    if (result) return result;

    throw new Error(`Unknown tool: ${name}`);
  } catch (err) {
    console.error("TOOL ERROR:", err);

    return {
      content: [
        {
          type: "text",
          text: `Error: ${err.message}`,
        },
      ],
    };
  }
});

// START SERVER
const transport = new StdioServerTransport();
await server.connect(transport);