'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquationInputRow from '../EquationInputRow/EquationInputRow';
import HeaderBar from '../HeaderBar/HeaderBar';

export default function EquationForm({ variableCount, inputs, onClear, onAdd, onRemove, onInputChange }) {
  return (
    <motion.div
      layout
      className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[100px] rounded-3xl p-6 w-full 
        shadow-lg shadow-black/25 border-2 border-[#1E1E20] 
        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/35 hover:border-[#3E3E40]"
    >
      <HeaderBar onClear={onClear} onAdd={onAdd} onRemove={onRemove} />
      
      <motion.div layout className="flex flex-col gap-4">
        <AnimatePresence>
          {inputs.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              layout
            >
              <EquationInputRow
                variableCount={variableCount}
                rowValues={row}
                rowIdx={rowIdx}
                onInputChange={onInputChange}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
