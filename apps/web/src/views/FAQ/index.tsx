import { useFaqs } from "../../hooks/use-faqs";
import { useState, useEffect } from "react";

export default function FAQPage() {
  const { faqs, loading } = useFaqs();
  const [filtered, setFiltered] = useState(faqs);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "az" | "za">("newest");

  useEffect(() => {
    let data = [...faqs];

    // Search
    if (search.trim()) {
      const term = search.toLowerCase();
      data = data.filter(
        (f) =>
          f.question.toLowerCase().includes(term) ||
          f.answer.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (sort) {
      case "newest":
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "az":
        data.sort((a, b) => a.question.localeCompare(b.question));
        break;
      case "za":
        data.sort((a, b) => b.question.localeCompare(a.question));
        break;
    }

    setFiltered(data);
  }, [faqs, search, sort]);

  if (loading) return <div>Loading FAQs...</div>;

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6">
      {/* <div className="p-6 max-w-3xl mx-auto"> */}
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              CSEE Virtual Triage FAQ page.
            </p>
          </div>
        </div>
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <input
            className="border p-2 rounded flex-1"
            value={search}
            placeholder="Search FAQs..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {filtered.map((f) => (
            <div key={f.id} className="border-b border-gray-500 pb-4">
              <p className="font-semibold mb-2">Q: {f.question}</p>
              <p className="text-gray-700 pl-4">A: {f.answer}</p>
            </div>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
}
