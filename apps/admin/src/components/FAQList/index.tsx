import FAQItem from "../FAQItem/index";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_by?: string;
}

interface Props {
  faqs: FAQ[];
  onEdit: (
    id: string,
    values: Pick<FAQ, "question" | "answer">,
  ) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

export default function FAQList({ faqs, onEdit, onDelete }: Props) {
  if (faqs.length === 0) return <p>No FAQs found.</p>;

  return (
    <div className="space-y-4">
      {faqs.map((f) => (
        <FAQItem key={f.id} faq={f} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
