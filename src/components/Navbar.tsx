import React from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Globe,
  Users,
  BookOpen,
  Cat,
  LayoutDashboard,
} from "lucide-react";

export type TabType = "home" | "weather" | "countries" | "users" | "books" | "catfacts";

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navItems: { id: TabType; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "home", label: "Beranda", icon: <LayoutDashboard size={18} />, color: "from-violet-500 to-purple-600" },
  { id: "weather", label: "Cuaca", icon: <Cloud size={18} />, color: "from-sky-500 to-blue-600" },
  { id: "countries", label: "Negara", icon: <Globe size={18} />, color: "from-emerald-500 to-green-600" },
  { id: "users", label: "Pengguna", icon: <Users size={18} />, color: "from-orange-500 to-amber-600" },
  { id: "books", label: "Buku", icon: <BookOpen size={18} />, color: "from-rose-500 to-pink-600" },
  { id: "catfacts", label: "Fakta Kucing", icon: <Cat size={18} />, color: "from-yellow-500 to-orange-500" },
];

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">
              Nusa<span className="text-violet-400">Hub</span>
            </span>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.icon}
                <span className="hidden md:block">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
