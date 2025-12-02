import { useFaqs } from "../../hooks/use-faqs";
import { useState, useEffect } from "react";

export default function FAQPage() {
  const { faqs, filtered, setFiltered, loading } = useFaqs();
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">FAQs</h1>

      {/* Search + Sort */}
      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 rounded"
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
      <div className="space-y-4">
        {filtered.map((f) => (
          <div key={f.id} className="border p-4 rounded bg-white">
            <h2 className="font-semibold">{f.question}</h2>
            <p className="text-gray-600">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
