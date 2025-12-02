"use client";

import { useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../../../../../packages/ui/src/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageContent,
} from "../../../../../packages/ui/src/components/ui/shadcn-io/ai/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "../../../../../packages/ui/src/components/ui/shadcn-io/ai/prompt-input";
import { Response } from "../../../../../packages/ui/src/components/ui/shadcn-io/ai/response";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: { type: "text"; text: string }[];
};

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  // ✅ Corrected base (no trailing /chat)
  const API_BASE = "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: input }],
    };

    setMessages((prev) => [...prev, userMsg]);
    setStatus("submitting");

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, top_k: 4 }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        parts: [{ type: "text", text: data.answer || "No answer returned." }],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        parts: [{ type: "text", text: "⚠️ Error fetching response." }],
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setStatus("idle");
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
                  {message.parts?.map((part, idx) =>
                    part.type === "text" ? (
                      <Response key={idx}>{part.text}</Response>
                    ) : null
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
          placeholder="Ask your question..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <PromptInputSubmit
          status={(status === "idle" ? "ready" : "in_progress") as any}
          disabled={!input.trim()}
        />
      </PromptInput>
    </div>
  );
}
