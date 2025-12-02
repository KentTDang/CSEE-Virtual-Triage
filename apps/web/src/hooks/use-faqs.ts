import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

export function useFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("FAQ fetch error:", error);
      }

      setFaqs(data ?? []);
      setFiltered(data ?? []);
      setLoading(false);
    }

    load();
  }, []);

  return { faqs, filtered, setFiltered, loading };
}
