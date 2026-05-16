import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Star, Calendar, FileText, Globe, X, TrendingUp } from "lucide-react";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../types";

export default function BooksPage() {
  const { books, loading, error, total, query, searchBooks, fetchTrending } = useBooks();
  const [input, setInput] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) searchBooks(input.trim());
  };

  const getCoverUrl = (coverId?: number) =>
    coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;

  const popularSearches = ["Harry Potter", "The Lord of the Rings", "1984", "Dune", "Psychology", "Science", "History", "Philosophy"];

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">📚 Pencarian Buku</h1>
          <p className="text-gray-400">Temukan jutaan buku dari Open Library API</p>
        </motion.div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cari judul buku, penulis, atau topik..."
              className="w-full bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-rose-500/60 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <Search size={18} />
            Cari
          </motion.button>
        </form>

        {/* Quick searches */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-gray-500 text-sm self-center">Populer:</span>
          {popularSearches.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setInput(s); searchBooks(s); }}
              className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:text-white hover:border-rose-500/40 transition-all"
            >
              {s}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => { setInput(""); fetchTrending(); }}
            className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-sm flex items-center gap-1 hover:bg-rose-500/20 transition-all"
          >
            <TrendingUp size={13} /> Trending
          </motion.button>
        </div>

        {/* Meta */}
        {query && !loading && (
          <p className="text-gray-500 text-sm mb-4">
            {total > 0 ? (
              <>Menampilkan <span className="text-white font-semibold">{books.length}</span> dari <span className="text-white font-semibold">{total.toLocaleString("id-ID")}</span> hasil untuk "<span className="text-rose-400">{query}</span>"</>
            ) : (
              <>Tidak ada hasil untuk "<span className="text-rose-400">{query}</span>"</>
            )}
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-center">⚠️ {error}</div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-gray-800/60 rounded-xl overflow-hidden animate-pulse">
                <div className="w-full aspect-[2/3] bg-gray-700" />
                <div className="p-3">
                  <div className="h-3 bg-gray-700 rounded mb-2" />
                  <div className="h-2 bg-gray-700/60 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Book Grid */}
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {books.map((book, idx) => {
              const cover = getCoverUrl(book.cover_i);
              return (
                <motion.div
                  key={`${book.key}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedBook(book)}
                  className="bg-gray-800/60 border border-white/8 rounded-xl overflow-hidden cursor-pointer hover:border-rose-500/40 transition-all group"
                >
                  <div className="relative aspect-[2/3] bg-gray-700/50 overflow-hidden">
                    {cover ? (
                      <img
                        src={cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML = `<div class="flex items-center justify-center h-full text-4xl">📖</div>`;
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl">📖</div>
                    )}
                    {book.ratings_average && (
                      <div className="absolute top-2 right-2 bg-black/60 text-yellow-400 text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <Star size={10} fill="currentColor" />
                        {book.ratings_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-white text-xs font-semibold line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-gray-500 text-xs truncate">
                      {book.author_name?.[0] ?? "Penulis Tidak Diketahui"}
                    </p>
                    {book.first_publish_year && (
                      <p className="text-gray-600 text-xs mt-0.5">{book.first_publish_year}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Book Detail Modal */}
        <AnimatePresence>
          {selectedBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBook(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex gap-5 p-6">
                  <div className="shrink-0 w-28">
                    {getCoverUrl(selectedBook.cover_i) ? (
                      <img
                        src={getCoverUrl(selectedBook.cover_i)!}
                        alt={selectedBook.title}
                        className="w-full rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-gray-800 rounded-xl flex items-center justify-center text-4xl">📖</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => setSelectedBook(null)}
                      className="float-right bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50"
                    >
                      <X size={16} />
                    </button>
                    <h2 className="text-white font-bold text-lg leading-snug mb-1 pr-8">{selectedBook.title}</h2>
                    <p className="text-rose-400 text-sm mb-4">
                      {selectedBook.author_name?.join(", ") ?? "Penulis Tidak Diketahui"}
                    </p>

                    <div className="space-y-2">
                      {selectedBook.first_publish_year && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={14} className="text-rose-400" />
                          Terbit: {selectedBook.first_publish_year}
                        </div>
                      )}
                      {selectedBook.number_of_pages_median && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <FileText size={14} className="text-rose-400" />
                          {selectedBook.number_of_pages_median} halaman
                        </div>
                      )}
                      {selectedBook.ratings_average && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Star size={14} className="text-yellow-400" fill="currentColor" />
                          {selectedBook.ratings_average.toFixed(2)} / 5
                          {selectedBook.ratings_count && (
                            <span className="text-gray-600">({selectedBook.ratings_count.toLocaleString()} ulasan)</span>
                          )}
                        </div>
                      )}
                      {selectedBook.language && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Globe size={14} className="text-rose-400" />
                          {selectedBook.language.slice(0, 5).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedBook.subject && selectedBook.subject.length > 0 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                      <BookOpen size={12} /> Topik
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBook.subject.slice(0, 10).map((s) => (
                        <span key={s} className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs px-2 py-0.5 rounded-full">
                          {s}
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
