import { useState, useCallback } from "react";
import axios from "axios";
import { RandomUser } from "../types";

const API_URL = "https://randomuser.me/api/";

export function useRandomUsers() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async (count = 9, seed?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL, {
        params: {
          results: count,
          seed: seed ?? "nusahub",
          page,
          inc: "name,email,phone,location,picture,login,dob,gender,nat",
        },
      });
      setUsers(res.data.results);
    } catch {
      setError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  }, [page]);

  const loadMore = () => setPage((p) => p + 1);

  return { users, loading, error, fetchUsers, loadMore, page };
}
