import type { FunctionCall, FunctionDeclaration } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { connectToMCPServer } from "./helpers/mcp";

type Config = {
  minimumCards: number;
  maximumCards: number;
  fetchMcpClient?: () => Promise<Client | undefined>;
  fetchTools?: () => Promise<FunctionDeclaration[] | undefined>;
  processToolCalls?: (
    toolCalls: FunctionCall[]
  ) => Promise<Array<ToolCallResult | undefined>>;
};

type ToolCallResult = {
  content?: Array<{
    type: string;
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

export const config: Config = {
  minimumCards: 6, // The minimum number of cards that should be generated
  maximumCards: 8, // The maximum number of cards that should be generated

  fetchMcpClient: async () => {
    const mcpClient = await connectToMCPServer("uv", [
      "--directory",
      "/Users/<username>/Downloads/financial-datasets",
      "run",
      "server.py",
    ]);
    return mcpClient;
  },

  fetchTools: async () => {
    const mcpClient = await config.fetchMcpClient?.();
    const availableTools = await mcpClient?.listTools();
    return availableTools?.tools.map((tool) => ({
      name: tool.name,
      description: tool.description || "",
      parameters: tool.inputSchema as Record<string, object>,
    }));
  },

  processToolCalls: async (toolCalls) => {
    const mcpClient = await config.fetchMcpClient?.();

    // process all tool calls in parallel
    const toolCallResults = await Promise.all(
      toolCalls.map(async (toolCall) => {
        return await mcpClient?.callTool({
          name: toolCall.name || "",
          arguments: toolCall.args,
        });
      })
    );

    return toolCallResults;
  },
};
