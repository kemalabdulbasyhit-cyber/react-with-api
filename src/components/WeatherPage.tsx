import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wind, Droplets, Eye, Gauge, Sunrise, Sunset, MapPin, RefreshCw } from "lucide-react";
import { useWeather } from "../hooks/useWeather";

const defaultCities = [
  "Jakarta", "Surabaya", "Bandung", "Bali", "Tokyo",
  "London", "New York", "Paris", "Sydney", "Dubai",
];

export default function WeatherPage() {
  const [input, setInput] = useState("");
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather("Jakarta");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) fetchWeather(input.trim());
  };

  const getBgClass = (code: number) => {
    if (code === 0 || code === 1) return "from-amber-400/20 to-orange-500/10";
    if (code <= 3) return "from-slate-400/20 to-gray-500/10";
    if (code <= 55) return "from-gray-500/20 to-slate-600/10";
    return "from-blue-500/20 to-indigo-600/10";
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🌤️ Cuaca Real-time</h1>
          <p className="text-gray-400">Data cuaca akurat dari Open-Meteo API — tanpa API key!</p>
        </motion.div>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="flex gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cari kota... (contoh: Bandung, Tokyo, Paris)"
              className="w-full bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <Search size={18} />}
            Cari
          </motion.button>
        </motion.form>

        {/* Quick Cities */}
        <div className="flex flex-wrap gap-2 mb-8">
          {defaultCities.map((city) => (
            <motion.button
              key={city}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setInput(city); fetchWeather(city); }}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                weather?.city === city
                  ? "bg-sky-500 text-white border-sky-400"
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-sky-500/40 hover:text-white"
              }`}
            >
              {city}
            </motion.button>
          ))}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-center"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {loading && !weather && (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Weather Card */}
        <AnimatePresence mode="wait">
          {weather && (
            <motion.div
              key={weather.city}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Main Card */}
              <div className={`bg-gradient-to-br ${getBgClass(weather.weather_code)} bg-gray-800/60 border border-white/10 rounded-2xl p-6 md:p-8 mb-4 backdrop-blur-sm`}>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                      <MapPin size={16} />
                      <span className="text-lg">{weather.city}, {weather.country}</span>
                    </div>
                    <div className="text-8xl md:text-9xl font-black text-white leading-none">
                      {weather.temp}°
                    </div>
                    <div className="text-2xl text-gray-300 mt-2">{weather.description}</div>
                    <div className="text-gray-400 mt-1">Terasa seperti {weather.feels_like}°C</div>
                  </div>
                  <div className="text-center">
                    <div className="text-8xl">{weather.icon}</div>
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Kelembapan", value: `${weather.humidity}%`, icon: <Droplets size={20} />, color: "text-blue-400" },
                  { label: "Angin", value: `${weather.wind_speed} km/h`, icon: <Wind size={20} />, color: "text-teal-400" },
                  { label: "Tekanan", value: `${Math.round(weather.pressure)} hPa`, icon: <Gauge size={20} />, color: "text-purple-400" },
                  { label: "Jarak Pandang", value: `${weather.visibility.toFixed(1)} km`, icon: <Eye size={20} />, color: "text-yellow-400" },
                  { label: "Matahari Terbit", value: weather.sunrise, icon: <Sunrise size={20} />, color: "text-orange-400" },
                  { label: "Matahari Terbenam", value: weather.sunset, icon: <Sunset size={20} />, color: "text-rose-400" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -2 }}
                    className="bg-gray-800/60 border border-white/8 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className={`${item.color} shrink-0`}>{item.icon}</div>
                    <div>
                      <div className="text-gray-500 text-xs">{item.label}</div>
                      <div className="text-white font-semibold">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Attribution */}
              <p className="text-center text-gray-600 text-xs mt-4">
                Data dari <span className="text-gray-500">Open-Meteo API</span> & <span className="text-gray-500">Open-Meteo Geocoding API</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
