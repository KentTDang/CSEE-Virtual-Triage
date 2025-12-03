import { useEffect, useRef, useState } from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@workspace/ui/components/ui/shadcn-io/ai/prompt-input";
import { MicIcon, PaperclipIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSubmit, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <PromptInput
        onSubmit={handleSubmit}
        className="relative z-10 w-full rounded-3xl p-3 border border-gray-700 bg-(--color-bg-primary) border-['oklch(0.205 0 0)']"
      >
        <PromptInputTextarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Type your message..."
          className="bg-transparent resize-none outline-none border"
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputButton type="button">
              <PaperclipIcon size={16} />
            </PromptInputButton>
            <PromptInputButton type="button">
              <MicIcon size={16} />
              <span>Voice</span>
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit disabled={!input} />
        </PromptInputToolbar>
      </PromptInput>
    </motion.div>
  );
};
