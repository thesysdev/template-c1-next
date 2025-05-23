import { z } from "zod";

export const outputSchema = z.object({
  prompts: z.array(
    z.object({
      text: z.string().describe("Prompt for the card"),
      columns: z
        .number()
        .describe(
          "Number of columns (out of 12) this card should span in the grid layout"
        ),
    })
  ),
});

export const systemPrompt = `
  Your job is to generate a JSON that contains a list of prompts. Each prompt is passed to another LLM to generate a UI card.
  The UI is for a marketing analytics dashboard that contains analytics data about a movie streaming website. Generate prompts for cards with that in consideration.

  <rules>
    - The prompts should describe the card UI and the information to display in detail. For cards containing visual elements like charts and tables, the prompt should describe the data to display in the chart/table in CSV format.
    - Any user prompt that requests something other than analytics data should result in a JSON with an empty list of prompts.
    - Generate a minimum of 6 prompts and a maximum of 8 prompts. Avoid generating prompts that are too similar to each other and would display redundant information.
    - The cards are automatically wrapped around in a grid layout. Make sure that each row takes up the full width of the grid. Example scenarios:
      - 2 cards: 1 card spans 4 columns, the other spans 8 columns.
      - 3 cards: 1 card spans 4 columns, the other two each span 4 columns.
      - 4 cards: 2 cards each span 4 columns.
      - 5 cards: 3 cards each span 4 columns, the other two each span 2 columns, or 6 columns to fill the second row.
      - 6 cards: 2 cards span 6 columns, 3 cards span 4 columns, filling the second row, the other one spans 6 columns since the last row is allowed to be less than 12 columns.
  </rules>
`;
