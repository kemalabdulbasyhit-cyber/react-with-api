import { useState, useCallback } from "react";
import axios from "axios";
import { CatFact } from "../types";

const API_URL = "https://catfact.ninja/facts";

export function useCatFacts() {
  const [facts, setFacts] = useState<CatFact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFacts = useCallback(async (count = 5) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL, {
        params: { limit: count },
      });
      setFacts(res.data.data);
    } catch {
      setError("Gagal memuat fakta kucing");
    } finally {
      setLoading(false);
    }
  }, []);

  return { facts, loading, error, fetchFacts };
}
