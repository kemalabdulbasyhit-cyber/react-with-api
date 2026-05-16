import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, MapPin, Globe, DollarSign, Languages, X } from "lucide-react";
import { useCountries } from "../hooks/useCountries";


const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function CountriesPage() {
  const {
    filteredCountries,
    selectedCountry,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchCountryDetail,
    setSelectedCountry,
  } = useCountries();

  const [selectedRegion, setSelectedRegion] = useState("All");

  const displayCountries = selectedRegion === "All"
    ? filteredCountries
    : filteredCountries.filter((c) => c.region === selectedRegion);

  const formatPop = (n: number) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}M`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}Jt`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}Rb`;
    return n.toString();
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🌍 Eksplorasi Negara</h1>
          <p className="text-gray-400">Jelajahi 250+ negara di seluruh dunia — REST Countries API</p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari negara..."
              className="w-full bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-emerald-500/60 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedRegion === r
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-gray-500 text-sm mb-4">
            Menampilkan <span className="text-white font-semibold">{displayCountries.length}</span> negara
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-gray-800/60 rounded-xl p-4 animate-pulse">
                <div className="w-full h-24 bg-gray-700 rounded-lg mb-3" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700/60 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Country Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayCountries.slice(0, 100).map((country) => (
              <motion.div
                key={country.cca2}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => fetchCountryDetail(country.cca2)}
                className="bg-gray-800/60 border border-white/8 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500/40 transition-all group"
              >
                <div className="h-28 overflow-hidden bg-gray-700">
                  <img
                    src={country.flags?.png}
                    alt={country.name.common}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm truncate mb-1">
                    {country.name.common}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin size={11} />
                    <span className="truncate">{country.capital?.[0] ?? "—"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                    <Users size={11} />
                    <span>{formatPop(country.population)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Country Detail Modal */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCountry(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              >
                {/* Flag */}
                <div className="relative h-48">
                  <img
                    src={selectedCountry.flags?.svg || selectedCountry.flags?.png}
                    alt={selectedCountry.name.common}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-white text-2xl font-bold">{selectedCountry.name.common}</h2>
                    <p className="text-gray-300 text-sm">{selectedCountry.name.official}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 grid grid-cols-2 gap-4">
                  {[
                    { icon: <MapPin size={16} />, label: "Ibu Kota", value: selectedCountry.capital?.join(", ") ?? "—" },
                    { icon: <Globe size={16} />, label: "Region", value: `${selectedCountry.region} / ${selectedCountry.subregion ?? "—"}` },
                    {
                      icon: <Users size={16} />,
                      label: "Populasi",
                      value: selectedCountry.population?.toLocaleString("id-ID") ?? "—",
                    },
                    {
                      icon: <Globe size={16} />,
                      label: "Luas Wilayah",
                      value: selectedCountry.area ? `${selectedCountry.area.toLocaleString("id-ID")} km²` : "—",
                    },
                    {
                      icon: <DollarSign size={16} />,
                      label: "Mata Uang",
                      value: selectedCountry.currencies
                        ? Object.values(selectedCountry.currencies)
                            .map((c) => `${c.name} (${c.symbol})`)
                            .join(", ")
                        : "—",
                    },
                    {
                      icon: <Languages size={16} />,
                      label: "Bahasa",
                      value: selectedCountry.languages
                        ? Object.values(selectedCountry.languages).join(", ")
                        : "—",
                    },
                  ].map((item) => (
                    <div key={item.label} className="col-span-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-1">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <div className="text-white text-sm font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Timezones */}
                {selectedCountry.timezones && (
                  <div className="px-6 pb-6">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-2">
                      <Globe size={14} />
                      <span>Zona Waktu</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedCountry.timezones.slice(0, 5).map((tz) => (
                        <span key={tz} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-lg">
                          {tz}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
