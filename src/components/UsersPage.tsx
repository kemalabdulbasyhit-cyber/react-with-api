import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Mail, Phone, MapPin, Globe, Calendar, X, Hash } from "lucide-react";
import { useRandomUsers } from "../hooks/useRandomUsers";
import { RandomUser } from "../types";

const GENDER_FILTER = ["all", "male", "female"];

export default function UsersPage() {
  const { users, loading, error, fetchUsers } = useRandomUsers();
  const [selectedUser, setSelectedUser] = useState<RandomUser | null>(null);
  const [genderFilter, setGenderFilter] = useState("all");
  const [count, setCount] = useState(9);

  useEffect(() => {
    fetchUsers(count);
  }, []);

  const handleRefresh = () => fetchUsers(count, Math.random().toString(36));

  const filteredUsers = genderFilter === "all"
    ? users
    : users.filter((u) => u.gender === genderFilter);

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">👥 Profil Pengguna</h1>
          <p className="text-gray-400">Profil acak dari RandomUser.me API — klik kartu untuk detail</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {GENDER_FILTER.map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  genderFilter === g
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {g === "all" ? "Semua" : g === "male" ? "Pria" : "Wanita"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="bg-gray-800 border border-white/10 text-white rounded-lg px-3 py-2 text-sm"
            >
              {[6, 9, 12, 18].map((n) => (
                <option key={n} value={n}>{n} pengguna</option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Acak Ulang
            </motion.button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="bg-gray-800/60 rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-700/60 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700/50 rounded" />
                  <div className="h-3 bg-gray-700/50 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* User Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUsers.map((user, idx) => (
              <motion.div
                key={`${user.login.username}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedUser(user)}
                className="bg-gray-800/60 border border-white/8 rounded-2xl p-5 cursor-pointer hover:border-orange-500/40 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={user.picture.large}
                      alt={`${user.name.first} ${user.name.last}`}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-orange-500/40 transition-all"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      user.gender === "male" ? "bg-blue-500" : "bg-pink-500"
                    }`}>
                      {user.gender === "male" ? "♂" : "♀"}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">
                      {user.name.title} {user.name.first} {user.name.last}
                    </h3>
                    <p className="text-gray-400 text-sm">@{user.login.username}</p>
                    <p className="text-orange-400 text-xs">{user.nat} · {user.dob.age} tahun</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Mail size={13} className="text-orange-400 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={13} className="text-orange-400 shrink-0" />
                    <span className="truncate">{user.location.city}, {user.location.country}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* User Detail Modal */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedUser(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-6 border-b border-white/10">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="float-right bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50"
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedUser.picture.large}
                      alt="profile"
                      className="w-20 h-20 rounded-full ring-4 ring-orange-500/40"
                    />
                    <div>
                      <h2 className="text-white text-xl font-bold">
                        {selectedUser.name.title} {selectedUser.name.first} {selectedUser.name.last}
                      </h2>
                      <p className="text-orange-400">@{selectedUser.login.username}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedUser.gender === "male" ? "bg-blue-500/20 text-blue-300" : "bg-pink-500/20 text-pink-300"
                      }`}>
                        {selectedUser.gender === "male" ? "Pria" : "Wanita"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 grid grid-cols-1 gap-3">
                  {[
                    { icon: <Mail size={15} />, label: "Email", val: selectedUser.email },
                    { icon: <Phone size={15} />, label: "Telepon", val: selectedUser.phone },
                    { icon: <MapPin size={15} />, label: "Alamat", val: `${selectedUser.location.street.number} ${selectedUser.location.street.name}` },
                    { icon: <Globe size={15} />, label: "Kota", val: `${selectedUser.location.city}, ${selectedUser.location.country}` },
                    { icon: <Calendar size={15} />, label: "Usia", val: `${selectedUser.dob.age} tahun` },
                    { icon: <Hash size={15} />, label: "Kewarganegaraan", val: selectedUser.nat },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="text-orange-400 w-8 shrink-0 flex justify-center">{item.icon}</div>
                      <div>
                        <div className="text-gray-500 text-xs">{item.label}</div>
                        <div className="text-white text-sm">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
