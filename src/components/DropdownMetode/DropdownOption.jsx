'use client';

import {
  Calculator,
  Divide,
  Sigma,
  FunctionSquare,
} from "lucide-react";

const icons = {
  Determinan: <FunctionSquare className="w-4 h-4 mr-2" />,
  Transpose: <Divide className="w-4 h-4 mr-2" />,
  Invers: <Sigma className="w-4 h-4 mr-2" />,
};

export function DropdownOption({ label, value, onSelect }) {
  return (
    <div
      onClick={() => onSelect(value)} // kirim 'det', 'trans', atau 'inv'
      className="flex items-center px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors"
    >
      {icons[label] || null}
      <span>{label}</span>
    </div>
  );
}
