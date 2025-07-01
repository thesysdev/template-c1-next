import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { transformStream } from "@crayonai/stream";
import { DBMessage, getMessageStore } from "./messageStore";
import { SYSTEM_PROMPTS } from "./systemPrompts";

export async function POST(req: NextRequest) {
  const { prompt, threadId, responseId } = (await req.json()) as {
    prompt: DBMessage;
    threadId: string;
    responseId: string;
  };
  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/embed/",
    apiKey: process.env.THESYS_API_KEY,
  });
  const messageStore = getMessageStore(threadId);

  messageStore.addMessage(prompt);
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    ...((SYSTEM_PROMPTS
      ? [{ role: "system", content: SYSTEM_PROMPTS }]
      : []) as OpenAI.Chat.Completions.ChatCompletionMessageParam[]),
    ...messageStore.messageList,
  ].map((m) => ({
    ...m,
    id: undefined,
  }));

  const llmStream = await client.chat.completions.create({
    model: "c1-nightly",
    messages,
    stream: true,
  });

  const responseStream = transformStream(
    llmStream,
    (chunk) => {
      return chunk.choices[0].delta.content;
    },
    {
      onEnd: ({ accumulated }) => {
        const message = accumulated.filter((message) => message).join("");
        messageStore.addMessage({
          role: "assistant",
          content: message,
          id: responseId,
        });
      },
    }
  ) as ReadableStream<string>;

  return new NextResponse(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
