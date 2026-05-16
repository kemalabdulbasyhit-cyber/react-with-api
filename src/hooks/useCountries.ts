import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Country } from "../types";

const BASE_URL = "https://restcountries.com/v3.1";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllCountries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/all?fields=name,capital,region,population,flags,cca2`);
      const sorted = res.data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sorted);
    } catch {
      setError("Gagal memuat data negara");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCountryDetail = useCallback(async (cca2: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/alpha/${cca2}`);
      setSelectedCountry(res.data[0]);
    } catch {
      setError("Gagal memuat detail negara");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    countries,
    filteredCountries,
    selectedCountry,
    setSelectedCountry,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchCountryDetail,
  };
}
