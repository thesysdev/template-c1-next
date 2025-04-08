import OpenAI from "openai";

const messagesStore: {
  [threadId: string]: OpenAI.Chat.ChatCompletionMessageParam[];
} = {};

type MessageStore = {
  addMessage: (message: OpenAI.Chat.ChatCompletionMessageParam) => void;
  messageList: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};

export const getMessageStore = (id: string) => {
  if (!messagesStore[id]) {
    messagesStore[id] = [];
  }
  const messageList = messagesStore[id];
  return {
    addMessage: (message: OpenAI.Chat.ChatCompletionMessageParam) => {
      messageList.push(message);
    },
    messageList,
  };
};

export const storeStreamingMessage = async (
  message: ReadableStream<string>,
  messageStore: MessageStore
) => {
  const reader = message.getReader();
  let messageContent = "";
  while (true) {
    const { done, value } = await reader.read();
    if (value) {
      messageContent += value;
    }
    if (done) {
      messageStore.addMessage({
        role: "assistant",
        content: messageContent,
      });
      break;
    }
  }
  return messageContent;
};
