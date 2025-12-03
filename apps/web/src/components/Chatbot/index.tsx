import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessage, MessageRole } from "../ChatbotMessages";
import { ChatInput } from "../ChatbotInput";
import { TypingIndicator } from "../TypingIndicator";
import { WelcomeScreen } from "../WelcomeScreen";

type Source = {
  title: string;
  url: string;
  chunk_index: number;
};

type ChatMessageType = {
  id: string;
  role: MessageRole;
  content: string;
  sources?: Source[];
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (input: string) => {
    const userMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, top_k: 4 }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      const rawSources = data.sources;

      const assistantMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer || "I couldn't find an answer to that question.",
        sources: Array.isArray(rawSources) ? rawSources : [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "⚠️ Sorry, I'm having trouble connecting right now. Please try again.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSubmit(text);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-background">
      {/* Chat area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-32 scrollbar-thin">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
            ) : (
              <div className="flex flex-col gap-4 py-6">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    isLatest={index === messages.length - 1}
                    sources={message.sources}
                  />
                ))}
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-6 px-4">
        <ChatInput onSubmit={handleSubmit} disabled={isTyping} />
        <p className="text-center text-xs text-muted-foreground/60 mt-3">
          UMBC Assistant can make mistakes.
        </p>
      </div>
    </div>
  );
};
