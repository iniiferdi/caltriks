'use client';
import React, { useState, useCallback  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownItem from './DropdownItem';
import DropdownToggle from './DropdownToggle';
import { List, Settings, Calculator } from 'lucide-react';

const iconMap = {
  "Solve by Gaussian elimination": <List size={16} className="mr-2" />,
  "Solve by Gauss–Jordan elimination": <Settings size={16} className="mr-2" />,
  "Solve by Cramer's rule": <Calculator size={16} className="mr-2" />,
};

export default function DropdownList({ items, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((open) => !open), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const DEFAULT_LABEL = "Select Method";
  const displayLabel = selected || DEFAULT_LABEL;

  return (
    <div className="relative w-full  text-sm ">
      <DropdownToggle label={displayLabel} onClick={toggleOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] border-2 border-[#1E1E20] rounded-xl shadow-md z-10"
          >
            {items.map((label) => (
              <DropdownItem
                key={label}
                label={
                  <span className="flex items-center">
                    {label in iconMap ? iconMap[label] : null}
                    {label}
                  </span>
                }
                onClick={() => {
                  onSelect(label);
                  closeDropdown();
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
