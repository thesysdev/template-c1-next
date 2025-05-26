import { NextRequest, NextResponse } from "next/server";
import { outputSchema, systemPrompt } from "./systemPrompt";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as {
    prompt: string;
  };

  const llmResponse = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents: prompt,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(outputSchema),
    },
  });

  return new NextResponse(llmResponse.text, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
