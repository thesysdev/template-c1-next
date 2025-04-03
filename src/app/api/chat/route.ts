import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { transformStream } from "@crayonai/stream";

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as {
    messages: OpenAI.Chat.ChatCompletionMessageParam[];
  };
  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/embed/",
    apiKey: process.env.THESYS_API_KEY,
  });
  const llmStream = await client.chat.completions.create({
    model: "c1-nightly",
    messages: messages,
    stream: true,
  });
  const responseStream = transformStream(llmStream, (chunk) => {
    return chunk.choices[0].delta.content;
  });
  // @ts-expect-error - there is some issue with the type inference
  return new NextResponse(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
