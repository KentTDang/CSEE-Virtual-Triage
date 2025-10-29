import { useCallback, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

interface FAQ {
    id: string,
    question: string,
    answer: string,
    create_at: string,
    updated_by?: string
}

export const useFaqs = () => {

    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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

    const addFaq = async(question: string, answer: string) => {
        if(!question.trim() || !answer.trim()) {
            throw new Error("Failed to add FAQ. No content found.")
        }
        setSubmitting(true);

        const { data: auth} = await supabase.auth.getUser();
        const user = auth?.user;

        if(!user) throw new Error("Must be logged in.");

        const { data, error} = await supabase.from("faqs").insert([{question, answer, created_by: user.id, updated_by: user.id}])
        .select()
        .single();

        setSubmitting(false);

        if(error) throw new Error("Failed to add FAQ.");

        if(data) {
            setFaqs((prev) => [data as FAQ, ...prev]);
        }

    };

    const updateFaq = async(id: string, values: Pick<FAQ, "question" | "answer">) => {
        const {data: auth} = await supabase.auth.getUser();
        const user = auth?.user;

        if (!user) throw new Error("Must be logged in");

        const { error } = await supabase.from('faqs').update({ question: values.question, answer: values.answer})
        .eq('id', id)
        .select();
        

        if(error) {
            throw new Error("Failed to update FAQ.")
        }

        setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === id
            ? { ...faq, question: values.question, answer: values.answer }
            : faq
        )
      )
    };

    const deleteFaq = async(id: string) => {
        const { error } = await supabase.from('faqs').delete().eq('id', id);

        if(error) {
            throw error;
        }

        await getFaqs();
    };

    return { faqs, loading, submitting, addFaq, updateFaq, deleteFaq, refetch: getFaqs };
}