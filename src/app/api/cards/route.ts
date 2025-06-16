import { NextRequest, NextResponse } from "next/server";
import { outputSchema, systemPrompt } from "./systemPrompt";
import { zodToJsonSchema } from "zod-to-json-schema";
import { FunctionCallingConfigMode, GoogleGenAI } from "@google/genai";
import { config } from "@/app/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash-preview-05-20";

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as {
    prompt: string;
  };

  const tools = await config.fetchTools?.();

  const llmResponse = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: systemPrompt,
      tools: [{ functionDeclarations: tools }],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.ANY,
        },
      },
    },
  });

  if (llmResponse.functionCalls && llmResponse.functionCalls.length > 0) {
    const toolCalls = llmResponse.functionCalls.map((call) => ({
      name: call.name,
      args: call.args,
    }));

    const toolCallResults = await config.processToolCalls?.(toolCalls);

    // Create conversation history for second LLM call
    const conversationHistory = [
      { role: "user" as const, parts: [{ text: prompt }] },
      llmResponse.candidates?.[0]?.content || {
        role: "model" as const,
        parts: [],
      },
    ];

    // Add function call results to the conversation
    if (toolCallResults) {
      toolCallResults.forEach((result: unknown, index: number) => {
        conversationHistory.push({
          role: "function" as const,
          parts: [
            {
              functionResponse: {
                name: llmResponse.functionCalls![index].name,
                response: result as Record<string, unknown>,
              },
            },
          ],
        });
      });
    }

    // Second LLM call with conversation history including tool results
    const llmResponse2 = await ai.models.generateContent({
      model,
      contents: conversationHistory,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(outputSchema),
      },
    });

    return new NextResponse(llmResponse2.text, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  return new NextResponse(llmResponse.text, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
