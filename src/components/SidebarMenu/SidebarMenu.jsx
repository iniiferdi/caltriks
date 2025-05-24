'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Animated Floating Burger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="burger"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-6 left-6 z-50"
          >
            <button
              onClick={toggleSidebar}
              className="p-3 rounded-full bg-[#111113] border border-[#2e2e30] hover:bg-[#1c1c1e] 
                shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Menu size={22} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar + Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-[280px] bg-[#0B0B0D] border-r border-[#1E1E20] p-6 shadow-[8px_0_24px_rgba(0,0,0,0.4)] z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white tracking-wide">Calltricks</h2>
                <button
                  onClick={toggleSidebar}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Sidebar Items */}
              <nav className="flex flex-col gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[rgba(255,255,255,0.02)] backdrop-blur-[120px] rounded-2xl p-5 w-full 
                    shadow-inner border border-[#1E1E20] transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-[#3E3E40] cursor-pointer text-white"
                  onClick={() => {
                    router.push('/linear-equations');
                    toggleSidebar();
                  }}
                >
                  <span className="text-sm font-medium">System of Equations Calculator</span>
                </motion.div>

                {/* Tambah lebih banyak item navigasi di sini */}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
