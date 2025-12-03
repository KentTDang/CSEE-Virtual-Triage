import FAQItem from "../FAQItem";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_by?: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQList({ faqs }: Props) {
  if (faqs.length === 0) return <p>No FAQs found.</p>;

  return (
    <div className="space-y-4">
      {faqs.map((f) => (
        <FAQItem key={f.id} faq={f} />
      ))}
    </div>
  );
}
