import { useState } from "react";
import { Button } from "@workspace/ui/components/button";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  create_at: string;
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
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <h4 className="font-semibold text-lg">{faq.question}</h4>
          <p className="text-gray-700 mt-1 whitespace-pre-wrap">{faq.answer}</p>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={removing}
            >
              {removing ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
