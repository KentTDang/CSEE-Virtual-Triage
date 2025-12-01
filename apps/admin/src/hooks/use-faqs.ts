import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_by?: string;
}

export const useFaqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "asc" | "desc">("newest");


  const getFaqs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faqs")
      .select("id, question, answer, created_at")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    setFaqs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    getFaqs();
  }, [getFaqs]);

  const addFaq = async (question: string, answer: string) => {
    if (!question.trim() || !answer.trim()) {
      throw new Error("Failed to add FAQ. No content found.");
    }
    setSubmitting(true);

    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;

    if (!user) throw new Error("Must be logged in.");

    const { data, error } = await supabase
      .from("faqs")
      .insert([{ question, answer, created_by: user.id, updated_by: user.id }])
      .select()
      .single();

    setSubmitting(false);

    if (error) throw new Error("Failed to add FAQ.");

    if (data) {
      setFaqs((prev) => [data as FAQ, ...prev]);
    }
  };

  const updateFaq = async (
    id: string,
    values: Pick<FAQ, "question" | "answer">,
  ) => {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;

    if (!user) throw new Error("Must be logged in");

    const { error } = await supabase
      .from("faqs")
      .update({ question: values.question, answer: values.answer })
      .eq("id", id)
      .select();

    if (error) {
      throw new Error("Failed to update FAQ.");
    }

    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id
          ? { ...faq, question: values.question, answer: values.answer }
          : faq,
      ),
    );
  };

  const deleteFaq = async (id: string) => {
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
      throw error;
    }

    await getFaqs();
  };

  const filteredAndSortedFaqs = faqs
    .filter(faq =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }

      if (sortOption === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortOption === 'asc') {
        return a.question.localeCompare(b.question);
      }
      if (sortOption === 'desc') {
        return b.question.localeCompare(a.question);
      }
      return 0;
    });




  return {
    faqs: filteredAndSortedFaqs,
    loading,
    submitting,
    addFaq,
    updateFaq,
    deleteFaq,
    refetch: getFaqs,
    search,
    setSearch,
    sortOption,
    setSortOption,
  };
};
