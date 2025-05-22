import { NextRequest } from "next/server";
import OpenAI from "openai";
import { systemPrompt } from "./systemPrompt";
import { transformStream } from "@crayonai/stream";

const client = new OpenAI({
  baseURL: "http://localhost:3102/v1/embed",
  apiKey: process.env.THESYS_API_KEY,
});

export async function POST(req: NextRequest) {
  if (!req.body) {
    return new Response("No body provided", { status: 400 });
  }

  const { prompt } = (await req.json()) as {
    prompt: string;
  };

  if (!prompt) {
    return new Response("No prompt provided", { status: 400 });
  }

  const llmStream = await client.chat.completions.create({
    model: "c1-nightly",
    messages: [
      {
        // Add the system prompt to provide appropriate instructions to the agent on how to generate the response and what UI constraints to consider.
        role: "system",
        content: systemPrompt,
      },

      { role: "user", content: prompt },
    ],
    stream: true,
  });

  const responseStream = transformStream(
    llmStream,
    (chunk) => chunk.choices[0].delta.content
  ) as ReadableStream<string>;

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
