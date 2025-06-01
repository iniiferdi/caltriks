'use client';

import { useState } from 'react';
import { Divide, Sigma, FunctionSquare, BarChart, Percent, Rows3 } from "lucide-react";

const icons = {
  Determinan: <FunctionSquare className="w-4 h-4 mr-2" />,
  Transpose: <Divide className="w-4 h-4 mr-2" />,
  Invers: <Sigma className="w-4 h-4 mr-2" />,
  Rank: <BarChart className="w-4 h-4 mr-2" />,
  "Echelon Form": <Rows3 className="w-4 h-4 mr-2" />,
  Scalar: <Percent className="w-4 h-4 mr-2" />,
};

export function DropdownOption({ label, value, onSelect }) {
  const [scalarInput, setScalarInput] = useState(2);

  if (label === 'Scalar') {
    return (
      <div className="flex justify-between items-center px-4 py-2 flex-row border-t border-[#1E1E20]">
        <div className="text-white flex  flex-row items-center">
          {icons[label]}
          <span className="font-medium">Scalar</span>
        </div>
        <div className="flex  items-center  text-white gap-2 ">
          <input
            type="text"
            value={scalarInput}
            onChange={(e) => setScalarInput(Number(e.target.value))}
            className="w-8 px-2 rounded text-center bg-white/10 border border-white/20 text-white text-sm
             focus:outline-none focus:ring-0 focus:border-white/40"
          />

          <button
            onClick={() => onSelect(value, scalarInput)}
            className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 text-center transition"
          >
            Apply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(value)}
      className="flex items-center px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors"
    >
      {icons[label] || null}
      <span>{label}</span>
    </div>
  );
}
