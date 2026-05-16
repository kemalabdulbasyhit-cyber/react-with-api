
import { motion } from "framer-motion";
import { Cloud, Globe, Users, BookOpen, Cat, ArrowRight, Zap } from "lucide-react";
import { TabType } from "./Navbar";

interface HomePageProps {
  onTabChange: (tab: TabType) => void;
}

const features = [
  {
    id: "weather" as TabType,
    title: "Cuaca Real-time",
    description:
      "Cek kondisi cuaca terkini dari kota manapun di seluruh dunia menggunakan Open-Meteo API.",
    icon: <Cloud size={28} />,
    gradient: "from-sky-500 to-blue-600",
    bg: "from-sky-500/10 to-blue-600/10",
    border: "border-sky-500/30",
    api: "Open-Meteo API",
    badge: "🆓 Gratis",
  },
  {
    id: "countries" as TabType,
    title: "Eksplorasi Negara",
    description:
      "Jelajahi informasi lengkap 250+ negara: populasi, ibu kota, mata uang, hingga bendera.",
    icon: <Globe size={28} />,
    gradient: "from-emerald-500 to-green-600",
    bg: "from-emerald-500/10 to-green-600/10",
    border: "border-emerald-500/30",
    api: "REST Countries API",
    badge: "🆓 Gratis",
  },
  {
    id: "users" as TabType,
    title: "Profil Pengguna",
    description:
      "Generate profil pengguna acak lengkap dengan foto, nama, kontak, dan lokasi.",
    icon: <Users size={28} />,
    gradient: "from-orange-500 to-amber-600",
    bg: "from-orange-500/10 to-amber-600/10",
    border: "border-orange-500/30",
    api: "RandomUser.me API",
    badge: "🆓 Gratis",
  },
  {
    id: "books" as TabType,
    title: "Pencarian Buku",
    description:
      "Cari jutaan buku dari seluruh dunia dengan informasi lengkap menggunakan Open Library API.",
    icon: <BookOpen size={28} />,
    gradient: "from-rose-500 to-pink-600",
    bg: "from-rose-500/10 to-pink-600/10",
    border: "border-rose-500/30",
    api: "Open Library API",
    badge: "🆓 Gratis",
  },
  {
    id: "catfacts" as TabType,
    title: "Fakta Unik Kucing",
    description:
      "Temukan fakta-fakta menarik dan unik tentang kucing yang mungkin belum pernah kamu tahu!",
    icon: <Cat size={28} />,
    gradient: "from-yellow-500 to-orange-500",
    bg: "from-yellow-500/10 to-orange-500/10",
    border: "border-yellow-500/30",
    api: "CatFact.ninja API",
    badge: "🆓 Gratis",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage({ onTabChange }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-gray-950 to-blue-900/30" />
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/40 rounded-full px-4 py-2 text-violet-300 text-sm font-medium mb-6"
          >
            <Zap size={14} />
            Dashboard Serba Guna dengan 5 API Gratis
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Nusa
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Satu platform, banyak informasi. Jelajahi cuaca dunia, data negara, profil pengguna,
            koleksi buku, dan fakta unik tentang kucing — semua dalam satu aplikasi modern.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange("weather")}
              className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-violet-500/25"
            >
              Mulai Jelajahi <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange("countries")}
              className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/15 transition-colors"
            >
              Lihat Fitur
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900/80 border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Fitur Utama", value: "5" },
              { label: "API Gratis", value: "5" },
              { label: "Negara Tersedia", value: "250+" },
              { label: "Buku di Database", value: "20 Juta+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Semua Fitur dalam Satu Tempat
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Pilih fitur yang ingin kamu eksplorasi. Semua data diambil secara real-time dari API terpercaya.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              onClick={() => onTabChange(feature.id)}
              className={`bg-gradient-to-br ${feature.bg} border ${feature.border} rounded-2xl p-6 cursor-pointer group transition-all hover:shadow-xl`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {feature.icon}
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                  {feature.badge}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">{feature.api}</span>
                <span className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Buka <ArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>Built with ❤️ using React + Vite + Tailwind CSS</p>
        <p className="mt-1">Open-Meteo • REST Countries • RandomUser.me • Open Library • CatFact.ninja</p>
      </footer>
    </div>
  );
}
