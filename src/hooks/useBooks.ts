import { useState, useCallback } from "react";
import axios from "axios";
import { Book } from "../types";

const API_URL = "https://openlibrary.org/search.json";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");

  const searchBooks = useCallback(async (searchQuery: string, limit = 12) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    try {
      const res = await axios.get(API_URL, {
        params: {
          q: searchQuery,
          limit,
          fields:
            "key,title,author_name,first_publish_year,cover_i,number_of_pages_median,subject,language,ratings_average,ratings_count",
        },
      });
      setBooks(res.data.docs);
      setTotal(res.data.numFound);
    } catch {
      setError("Gagal mencari buku");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrending = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://openlibrary.org/search.json", {
        params: {
          q: "bestseller fiction",
          limit: 12,
          sort: "rating",
          fields:
            "key,title,author_name,first_publish_year,cover_i,number_of_pages_median,subject,language,ratings_average,ratings_count",
        },
      });
      setBooks(res.data.docs);
      setTotal(res.data.numFound);
      setQuery("Trending");
    } catch {
      setError("Gagal memuat buku trending");
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, total, query, searchBooks, fetchTrending };
}
