'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronDown } from 'lucide-react';

const methodOptions = [
  { label: "Solve by Gaussian elimination", icon: <List size={16} className="mr-2" /> },
 
  
];

export default function MethodSelector({ selectedLabel, setSelectedLabel, onSolve }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = useCallback(() => setOpen(prev => !prev), []);
  const closeDropdown = useCallback(() => setOpen(false), []);
  const handleSelect = useCallback((label) => {
    setSelectedLabel(label);
    closeDropdown();
  }, [setSelectedLabel, closeDropdown]);

  return (
    <div className="w-full flex gap-3 items-center relative">
      <div className="relative w-full text-sm">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] flex justify-between items-center border-2 border-[#1E1E20] text-white font-semibold py-3 px-4 rounded-full cursor-pointer"
        >
          <span className="flex items-center">
            {methodOptions.find(opt => opt.label === selectedLabel)?.icon}
            {selectedLabel || "Select Method"}
          </span>
          <ChevronDown size={12} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute mt-2 w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] border-2 border-[#1E1E20] rounded-xl shadow-md z-10"
            >
              {methodOptions.map(({ label, icon }) => (
                <div
                  key={label}
                  onClick={() => handleSelect(label)}
                  className="flex items-center px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors"
                >
                  {icon} {label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onSolve}
        whileHover={{ scale: 1.08, backgroundColor: '#3F49D7' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-[#303995] cursor-pointer transition-all text-white font-semibold py-3 px-6 rounded-full text-sm"
      >
        Solve
      </motion.button>
    </div>
  );
}
