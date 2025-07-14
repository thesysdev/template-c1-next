import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import GoogleImages from "google-images";
import type { JSONSchema } from "openai/lib/jsonschema.mjs";
import { createToolErrorMessage } from "./utils/toolErrorHandler";

const client = new GoogleImages(
  process.env.GOOGLE_CX_KEY!,
  process.env.GOOGLE_API_KEY!,
);

export const googleImageTool: RunnableToolFunctionWithParse<{
  altText: string[];
}> = {
  type: "function",
  function: {
    name: "imageSearch",
    description:
      "ONLY USE THIS TOOL IF YOU ARE LOOKING FOR IMAGES. DO NOT GENERATE IMAGE URLS ON YOUR OWN AND USE THIS TOOL." +
      "\n\n" +
      "Search for and retrieve image URLs based on an array of descriptive texts. " +
      "The function returns both a direct image URL (imageUrl) and a thumbnail URL (thumbnailUrl) for each description." +
      "\n\n" +
      "If you are using a LIST_COMPONENT, use the thumbnailUrl for displaying images in the list. In all other cases, use imageUrl by default." +
      "\n\n" +
      'Example: ["A photo of a cat", "A photo of a dog"]',
    parse: JSON.parse,
    parameters: zodToJsonSchema(
      z.object({
        altText: z
          .array(z.string())
          .describe("An array of alt texts for the images"),
      }),
    ) as JSONSchema,
    function: async ({ altText }: { altText: string[] }) => {
      try {
        const results = await Promise.all(
          altText.map(async (text) => {
            try {
              const searchResults = await client.search(text, {
                size: "medium",
              });

              if (!searchResults || searchResults.length === 0) {
                return { altText: text, imageUrl: null, thumbnailUrl: null };
              }

              const item = searchResults[0];
              const imageUrl = item?.url;
              const thumbnailUrl = item?.thumbnail?.url || null;

              return { altText: text, imageUrl, thumbnailUrl };
            } catch (searchError) {
              return {
                altText: text,
                imageUrl: null,
                thumbnailUrl: null,
                error: createToolErrorMessage(searchError, {
                  action: "searching for images",
                  userFriendlyContext: `for "${text}"`,
                  technicalDetails: true,
                  suggestion:
                    "Please try different search terms or try again later.",
                }),
              };
            }
          }),
        );
        return results;
      } catch (error) {
        return createToolErrorMessage(error, {
          action: "searching for images",
          userFriendlyContext: `with terms: ${altText.join(", ")}`,
          suggestion: "Please try different search terms or try again later.",
        });
      }
    },
    strict: true,
  },
};
