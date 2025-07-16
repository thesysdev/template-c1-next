import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import type { RunnableToolFunctionWithoutParse } from "openai/lib/RunnableFunction.mjs";
import { googleImageTool } from "./tools/googleImage";
import { weatherTool } from "./tools/weather";

/**
 * Collection of tools available to the AI agent.
 * Each tool is a function that the AI can use to perform specific tasks.
 *
 * Current tools:
 * - googleImageTool: Fetches image URLs based on text descriptions
 *
 * ADD MORE TOOLS HERE TO EXTEND THE AI'S CAPABILITIES
 */

export const tools: (
  | RunnableToolFunctionWithoutParse
  | RunnableToolFunctionWithParse<{ altText: string[] }>
  | RunnableToolFunctionWithParse<{ location: string }>
)[] = [googleImageTool, weatherTool];
