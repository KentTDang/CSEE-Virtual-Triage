"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

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

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:8000/chat",
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <Conversation className="relative flex-1 w-full border rounded-lg p-4 overflow-hidden">
        <ConversationContent>
          {messages.length === 0 ? (
            <Message from="system">
              <MessageContent>Start the conversation below 👇</MessageContent>
            </Message>
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {/* Each message now contains a parts[] array in v5 */}
                  {message.parts && Array.isArray(message.parts) ? (
                    message.parts.map((part, idx) => {
                      if (part.type === "text") {
                        return <Response key={idx}>{part.text}</Response>;
                      }

                      return null;
                    })
                  ) : (
                    // Fallback for legacy data shape
                    <Response>{(message as any).content ?? ""}</Response>
                  )}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput
        onSubmit={handleSubmit}
        className="mt-4 border-t pt-4 flex flex-col gap-2"
      >
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
