import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Cat, Lightbulb, Copy, Check } from "lucide-react";
import { useCatFacts } from "../hooks/useCatFacts";

const CAT_EMOJIS = ["🐱", "🐈", "😺", "😸", "🙀", "😻", "😹", "😼", "🐾", "🐈‍⬛"];

const catColors = [
  "from-yellow-500/10 to-orange-500/10 border-yellow-500/25",
  "from-purple-500/10 to-violet-600/10 border-purple-500/25",
  "from-teal-500/10 to-emerald-500/10 border-teal-500/25",
  "from-pink-500/10 to-rose-600/10 border-pink-500/25",
  "from-blue-500/10 to-indigo-600/10 border-blue-500/25",
  "from-amber-500/10 to-yellow-600/10 border-amber-500/25",
];

export default function CatFactsPage() {
  const { facts, loading, error, fetchFacts } = useCatFacts();
  const [count, setCount] = useState(6);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [favs, setFavs] = useState<number[]>([]);

  useEffect(() => {
    fetchFacts(count);
  }, []);

  const handleRefresh = () => fetchFacts(count);

  const copyFact = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const toggleFav = (idx: number) =>
    setFavs((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Fakta Unik Tentang Kucing</h1>
          <p className="text-gray-400">Fakta menarik dari CatFact.ninja API yang mungkin belum kamu tahu!</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label className="text-gray-400 text-sm">Jumlah Fakta:</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="bg-gray-800 border border-white/10 text-white rounded-lg px-3 py-2 text-sm"
            >
              {[3, 5, 6, 9, 12].map((n) => (
                <option key={n} value={n}>{n} fakta</option>
              ))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={loading}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 shadow-lg"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Muat Fakta Baru
          </motion.button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="bg-gray-800/60 rounded-2xl p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded" />
                    <div className="h-4 bg-gray-700 rounded w-4/5" />
                    <div className="h-4 bg-gray-700 rounded w-3/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Facts Grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={facts.map((f) => f.fact.slice(0, 10)).join("")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {facts.map((fact, idx) => {
                const emoji = CAT_EMOJIS[idx % CAT_EMOJIS.length];
                const colorClass = catColors[idx % catColors.length];
                const isFav = favs.includes(idx);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`bg-gradient-to-br ${colorClass} border rounded-2xl p-6 relative group`}
                  >
                    {/* Fact Number */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() => toggleFav(idx)}
                        className={`text-lg transition-transform hover:scale-125 ${isFav ? "" : "opacity-40 hover:opacity-100"}`}
                      >
                        {isFav ? "❤️" : "🤍"}
                      </button>
                      <button
                        onClick={() => copyFact(fact.fact, idx)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        {copiedIdx === idx ? (
                          <Check size={15} className="text-green-400" />
                        ) : (
                          <Copy size={15} />
                        )}
                      </button>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-medium mb-2">
                          <Lightbulb size={12} />
                          Fakta #{idx + 1}
                        </div>
                        <p className="text-gray-200 leading-relaxed text-sm">{fact.fact}</p>
                        <div className="mt-3 flex items-center gap-2 text-gray-500 text-xs">
                          <Cat size={11} />
                          <span>{fact.length} karakter</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Fun Footer */}
        {!loading && facts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-8 py-4">
              <div className="text-3xl mb-2">😺</div>
              <p className="text-yellow-300 font-medium">Suka fakta-fakta ini?</p>
              <p className="text-gray-400 text-sm mt-1">Klik "Muat Fakta Baru" untuk menemukan lebih banyak!</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-gray-500 text-xs">
                <span>❤️ {favs.length} fakta difavoritkan</span>
              </div>
            </div>
          </motion.div>
        )}

        <p className="text-center text-gray-600 text-xs mt-6">
          Data dari <span className="text-gray-500">CatFact.ninja API</span>
        </p>
      </div>
    </div>
  );
}
