import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Calendar,
  MapPin,
  GraduationCap,
} from "lucide-react";

const suggestions = [
  {
    icon: BookOpen,
    text: "Who is the Department Chair of the CSEE department?",
  },
  { icon: Calendar, text: "When is spring registration?" },
  { icon: MapPin, text: "How do I find research opportunities?" },
  { icon: GraduationCap, text: "Tell me about CS programs" },
];

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

export const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="relative mb-6"
      >
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[hsl(43_97%_54%)] via-amber-500 to-primary flex items-center justify-center glow-primary">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl sm:text-4xl font-bold text-center mb-2"
      >
        Welcome to <span className="gradient-text">UMBC Assistant</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-center mb-10 max-w-md"
      >
        Your AI-powered guide to University of Maryland, Baltimore County. Ask
        me anything about campus life, academics, or services.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"
      >
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all duration-200 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <suggestion.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
              {suggestion.text}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};
