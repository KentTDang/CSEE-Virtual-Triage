interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_by?: string;
}

interface Props {
  faq: FAQ;
}
export default function FAQItem({ faq }: Props) {
  const dateObject = new Date(faq.created_at);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
      <div className="">
        <div className="flex justify-between items-center p-2">
          <h4 className="font-semibold text-lg">{faq.question}</h4>
          <div className="flex gap-1"></div>
        </div>
        <p className="text-sm text-gray-500 whitespace-pre-wrap p-2">
          Created on: {formattedDate}
        </p>
        <p className="text-gray-700 whitespace-pre-wrap p-2">{faq.answer}</p>
      </div>
    </div>
  );
}
