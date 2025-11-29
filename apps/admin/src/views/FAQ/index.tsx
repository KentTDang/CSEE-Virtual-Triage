import { Main } from "../../components/Main/index";
import { FAQDialog } from "../../components/FAQDialog";
import { useFaqs } from "../../hooks/use-faqs";
import FAQList from "../../components/FAQList/index";

const FAQboard = () => {
  const { faqs, loading, submitting, addFaq, updateFaq, deleteFaq, search, setSearch, sortOption, setSortOption } = useFaqs();

  return (
    <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Manage all FAQs displayed on the CSEE Virtual Triage page.
          </p>
        </div>
        <FAQDialog
          onSubmit={(q, a) => addFaq(q, a)}
          submitting={submitting}
        />
      </div>

      {/* Search + Sort */}
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
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      
      {loading ? (
        <p>Loading FAQs...</p>
      ) : (
        <FAQList faqs={faqs} onEdit={updateFaq} onDelete={deleteFaq} />
      )}
    </Main>
  );
};

export default FAQboard;
