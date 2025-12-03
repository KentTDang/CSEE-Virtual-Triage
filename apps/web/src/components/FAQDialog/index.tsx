import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import FAQList from "../FAQList";
import { useFaqs } from "../../hooks/use-faqs";

export function FAQ() {
  const { faqs, loading, search, setSearch, sortOption, setSortOption } =
    useFaqs();

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="space-x-1 bg-transparent">
            <MessageCircleQuestion size={18} />
            <span>FAQs</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Frequently asked questions</DialogTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded flex-1"
              />

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target.value as "newest" | "oldest" | "asc" | "desc"
                  )
                }
                className="border p-2 rounded"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
              </select>
            </div>
          </DialogHeader>

          <div className="max-h-[300px] overflow-y-scroll pr-4">
            {loading ? <p>Loading FAQs...</p> : <FAQList faqs={faqs} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
