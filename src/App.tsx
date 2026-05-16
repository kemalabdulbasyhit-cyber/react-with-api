import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar, { TabType } from "./components/Navbar";
import HomePage from "./components/HomePage";
import WeatherPage from "./components/WeatherPage";
import CountriesPage from "./components/CountriesPage";
import UsersPage from "./components/UsersPage";
import BooksPage from "./components/BooksPage";
import CatFactsPage from "./components/CatFactsPage";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onTabChange={setActiveTab} />;
      case "weather":
        return <WeatherPage />;
      case "countries":
        return <CountriesPage />;
      case "users":
        return <UsersPage />;
      case "books":
        return <BooksPage />;
      case "catfacts":
        return <CatFactsPage />;
      default:
        return <HomePage onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 font-[Inter,system-ui,sans-serif]">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
