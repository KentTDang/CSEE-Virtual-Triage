import { MessageCirclePlus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
interface Props {
  onSubmit: (q: string, a: string) => Promise<void> | void;
  submitting?: boolean;
}

export function FAQDialog({ onSubmit, submitting }: Props) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(question, answer);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="space-x-1">
            <span>Add FAQ</span> <MessageCirclePlus size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a FAQ</DialogTitle>
            <DialogDescription>
              All FAQs are visible to everyone on the CSEE Virtual Triage page.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mb-8 space-y-3">
            <input
              type="text"
              placeholder="Enter a question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Enter an answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border p-2 rounded h-24"
            />
            <DialogFooter>
                <Button type="submit"  disabled={submitting || !question.trim() || !answer.trim()}>
                    {submitting ? "Adding..." : "Add"}
                </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
