import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Trash2, SquarePen } from "lucide-react";
interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_by?: string;
}

interface Props {
  faq: FAQ;
  onEdit: (
    id: string,
    values: Pick<FAQ, "question" | "answer">,
  ) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

export default function FAQItem({ faq, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({
    question: faq.question,
    answer: faq.answer,
  });
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await onEdit(faq.id, values);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      setRemoving(true);
      await onDelete(faq.id);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
      {isEditing ? (
        <>
          <input
            type="text"
            value={values.question}
            onChange={(e) => setValues({ ...values, question: e.target.value })}
            className="w-full border p-2 rounded mb-2"
          />
          <textarea
            value={values.answer}
            onChange={(e) => setValues({ ...values, answer: e.target.value })}
            className="w-full border p-2 rounded h-24 mb-2"
          />
          <div className="flex gap-2 justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="">
          <div className="flex justify-between items-center p-2">
            <h4 className="font-semibold text-lg">{faq.question}</h4>
            <div className="flex gap-1">
            <Button onClick={() => setIsEditing(true)}><SquarePen size={16} /></Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={removing}
            >
              <Trash2 size={16} />
            </Button>
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap p-2">{faq.answer}</p>
          </div>
      )}
    </div>
  );
}
