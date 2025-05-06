'use client';

import {
  Divide,
  Sigma,
  FunctionSquare,
  BarChart,
  Layers,
  Grid,
  LayoutGrid,
  Braces,
} from "lucide-react";

const icons = {
  Determinan: <FunctionSquare className="w-4 h-4 mr-2" />,
  Transpose: <Divide className="w-4 h-4 mr-2" />,
  Invers: <Sigma className="w-4 h-4 mr-2" />,
  Rank: <BarChart className="w-4 h-4 mr-2" />,
  "Eselon Baris": <Layers className="w-4 h-4 mr-2" />,
  Adjoin: <Grid className="w-4 h-4 mr-2" />,
  Cofactor: <LayoutGrid className="w-4 h-4 mr-2" />,
  Trace: <Braces className="w-4 h-4 mr-2" />,
};



export function DropdownOption({ label, value, onSelect }) {
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
