import { useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@workspace/ui/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageContent,
} from "@workspace/ui/components/ui/shadcn-io/ai/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputButton,
  PromptInputToolbar,
  PromptInputTools,
} from "@workspace/ui/components/ui/shadcn-io/ai/prompt-input";
import { Response } from "@workspace/ui/components/ui/shadcn-io/ai/response";
import { MicIcon, PaperclipIcon } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: { type: "text"; text: string }[];
};

export const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "submitting") return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: input }],
    };

    setMessages((prev) => [...prev, userMsg]);
    setStatus("submitting");

    try {
      const res = await fetch("http://localhost:8000/ask", {
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
    <div className="flex h-screen flex-col">
      <Conversation className="w-full flex-1">
        <div className="w-full max-w-3xl mx-auto">
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
        </div>
      </Conversation>

      <div className="p-8 w-full flex items-center justify-center">
        <PromptInput onSubmit={handleSubmit} className="w-3xl">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type your message..."
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton>
                <PaperclipIcon size={16} />
              </PromptInputButton>
              <PromptInputButton>
                <MicIcon size={16} />
                <span>Voice</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};
