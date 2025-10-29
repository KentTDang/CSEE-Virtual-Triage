import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"
import { Input } from '@workspace/ui/components/input';
import { useState } from 'react';
interface Props {
  onSubmit: (q: string, a: string) => Promise<void> | void;
  submitting?: boolean;
}

export function FAQAddButton({ onSubmit, submitting }: Props) {

    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(question, answer);
        setQuestion("");
        setAnswer("");
    };

    return (
    <div className='flex gap-2'>
      <Dialog>
      <DialogTrigger asChild>
        <Button className='space-x-1'>
        <span>Add FAQ</span> <UserPlus size={18} />
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border p-2 rounded h-24"
      />
      <Button type="submit" disabled={!!submitting}>
        {submitting ? "Adding..." : "Add FAQ"}
      </Button>
    </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}