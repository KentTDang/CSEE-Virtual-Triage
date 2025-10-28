"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../../../packages/ui/src/components/ui/shadcn-io/ai/conversation";

import {
  Message,
  MessageContent,
} from "../../../packages/ui/src/components/ui/shadcn-io/ai/message";

import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "../../../packages/ui/src/components/ui/shadcn-io/ai/prompt-input";

import { Response } from "../../../packages/ui/src/components/ui/shadcn-io/ai/response";

export default function App() {
  const [input, setInput] = useState("");
  const { messages, append, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      append({ role: "user", content: input });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                <Response>{message.content}</Response>
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput onSubmit={handleSubmit} className="mt-4">
        <PromptInputTextarea
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <PromptInputSubmit status={status} disabled={!input.trim()} />
      </PromptInput>
    </div>
  );
}
