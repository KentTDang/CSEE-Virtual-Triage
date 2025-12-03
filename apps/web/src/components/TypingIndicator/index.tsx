import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex gap-3 w-full justify-start"
    >
      <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-primary" />
      </div>

      <div className="px-4 py-3 chat-bubble-assistant">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-muted-foreground/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
