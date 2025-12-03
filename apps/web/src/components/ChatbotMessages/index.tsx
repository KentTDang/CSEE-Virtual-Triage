import { motion } from "framer-motion";
import { ChatbotSources } from "../ChatbotSources";
import { User, Sparkles } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export type MessageRole = "user" | "assistant" | "system";

type Source = {
  title: string;
  url: string;
  chunk_index: number;
};

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  category: string;
  isLatest?: boolean;
  sources?: Source[];
}

export const ChatMessage = ({
  role,
  content,
  category,
  isLatest,
  sources = [],
}: ChatMessageProps) => {
  const isUser = role === "user";
  const isSystem = role === "system";

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center py-4"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{content}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>
      )}

      <div
        className={cn(
          "max-w-[80%] px-4 py-1 text-[15px] leading-relaxed",
          isUser ? "chat-bubble-user" : "chat-bubble-assistant"
        )}
      >
        {!isUser && <p className="whitespace-pre-wrap">{category}</p>}
        <p className="whitespace-pre-wrap">{content}</p>
        {!isUser && sources.length > 0 && <ChatbotSources sources={sources} />}
      </div>

      {isUser && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
        >
          <User className="w-4 h-4 text-primary" />
        </motion.div>
      )}
    </motion.div>
  );
};
