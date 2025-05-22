import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { outputSchema, systemPrompt } from "./systemPrompt";
import { zodTextFormat } from "openai/helpers/zod.mjs";

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as {
    prompt: string;
  };
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log("systemPrompt", systemPrompt);

  const llmResponse = await client.responses.parse({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    text: {
      format: zodTextFormat(outputSchema, "OutputSchema"),
    },
    stream: false,
  });

  console.log("llmStream: ", llmResponse);

  return new NextResponse(JSON.stringify(llmResponse.output_parsed), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
