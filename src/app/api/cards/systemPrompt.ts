import { config } from "@/app/config";
import { z } from "zod";

export const outputSchema = z.object({
  prompts: z.array(
    z.object({
      text: z.string().describe("Prompt for the card"),
    })
  ),
});

export const systemPrompt = `
  Your job is to generate a JSON that contains a list of prompts. Each prompt is passed to another LLM to generate a UI card.
  The UI is for a analytics dashboard that contains analytics data about a stock market. Generate prompts for cards with that in consideration.

  The current time is: ${new Date().toISOString()}

  <rules>
    - The prompts should describe the card UI and the information to display in detail. For cards containing visual elements like charts and tables, the prompt should describe the data to display in the chart/table in CSV format.
    - Any user prompt that requests something other than analytics data or is off-topic should result in a JSON with an empty list of prompts.
    - Generate a minimum of ${config.minimumCards} prompts (except in error cases) and a maximum of ${config.maximumCards} prompts. Avoid generating prompts that are too similar to each other and would display redundant information.
  </rules>
`;
