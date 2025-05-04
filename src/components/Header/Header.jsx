'use client';

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export function Header({ onReset }) {
  return (
    <motion.header
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] shadow-lg shadow-[rgba(0,0,0,0.25)] border-b border-[#1E1E20]  z-50"
    >
      <h1 className="text-white text-xl font-bold">
        🧮 Caltriks <span className="text-gray-400 text-sm">v1.0</span>
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="text-white hover:text-red-400 transition-colors text-sm"
        >
          Reset All
        </button>

        <a
          href="#how-to"
          className="text-white hover:text-blue-400 transition-colors text-sm"
        >
          How to Use
        </a>
      </div>
    </motion.header>
  );
}
