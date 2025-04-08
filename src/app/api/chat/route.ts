import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { transformStream } from "@crayonai/stream";
import { storeStreamingMessage } from "./messageStore";
import { getMessageStore } from "./messageStore";

export async function POST(req: NextRequest) {
  const { prompt, threadId } = (await req.json()) as {
    prompt: OpenAI.Chat.ChatCompletionMessageParam;
    threadId: string;
  };
  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/embed/",
    apiKey: process.env.THESYS_API_KEY,
  });
  const messageStore = getMessageStore(threadId);
  messageStore.addMessage(prompt);

  const llmStream = await client.chat.completions.create({
    model: "c1-nightly",
    messages: messageStore.messageList,
    stream: true,
  });

  const responseStream = transformStream(llmStream, (chunk) => {
    return chunk.choices[0].delta.content;
  }) as ReadableStream<string>;

  const [responseStream1, responseStream2] = responseStream.tee();

  storeStreamingMessage(responseStream2, messageStore);

  return new NextResponse(responseStream1, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
